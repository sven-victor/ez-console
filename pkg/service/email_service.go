package service

import (
	"bytes"
	"context"
	"crypto/tls"
	"encoding/base64"
	"errors"
	"fmt"
	"html/template"
	"net/smtp"
	"os"
	"strconv"
	"strings"

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/safe"
)

// formatAddress format the name and address to RFC 2047
func formatAddress(name, address string) string {
	return fmt.Sprintf("%s <%s>", encodeRFC2047(name), address)
}

// encodeRFC2047 encode the string to RFC 2047
func encodeRFC2047(str string) string {
	if isASCII(str) {
		return str
	}
	encoded := base64.StdEncoding.EncodeToString([]byte(str))
	return fmt.Sprintf("=?UTF-8?B?%s?=", encoded)
}

// isASCII check if the string is ASCII
func isASCII(s string) bool {
	for i := 0; i < len(s); i++ {
		if s[i] > 127 {
			return false
		}
	}
	return true
}

func encodeToRFC5322(fromName, fromAddress string, to []string, subject, body string) string {
	headers := map[string]string{
		"From":                      formatAddress(fromName, fromAddress),
		"To":                        strings.Join(to, ", "),
		"Subject":                   encodeRFC2047(subject),
		"MIME-Version":              "1.0",
		"Content-Type":              `text/html; charset="UTF-8"`,
		"Content-Transfer-Encoding": "base64",
	}

	var msg strings.Builder
	for k, v := range headers {
		fmt.Fprintf(&msg, "%s: %s\r\n", k, v)
	}
	msg.WriteString("\r\n")
	msg.WriteString(base64.StdEncoding.EncodeToString([]byte(body)))
	return msg.String()
}

type EmailService struct {
	settingService *SettingService
}

func (s *EmailService) SendEmailFromTemplate(ctx context.Context, to []string, subject string, bodyTemplate model.SettingKey, data map[string]any) error {
	smtpSettings, err := s.settingService.GetSMTPSettings(ctx)
	if err != nil {
		return err
	}
	if !smtpSettings.Enabled {
		return errors.New("SMTP is not enabled")
	}
	var tmpl *template.Template
	switch bodyTemplate {
	case model.SettingSMTPMFACodeTemplate:
		tmpl, err = template.New("email").Parse(smtpSettings.MFACodeTemplate)
		if err != nil {
			return err
		}
	case model.SettingSMTPResetPasswordTemplate:
		tmpl, err = template.New("email").Parse(smtpSettings.ResetPasswordTemplate)
		if err != nil {
			return err
		}
	case model.SettingSMTPUserLockedTemplate:
		tmpl, err = template.New("email").Parse(smtpSettings.UserLockedTemplate)
		if err != nil {
			return err
		}
	}

	var buf bytes.Buffer
	if err := tmpl.Execute(&buf, data); err != nil {
		return err
	}
	return s.SendEmail(ctx, smtpSettings, to, subject, buf.String())
}

func (s *EmailService) SendEmail(ctx context.Context, smtpSettings *model.SMTPSettings, to []string, subject, body string) error {
	logger := log.GetContextLogger(ctx)
	var auth smtp.Auth
	password, err := smtpSettings.Password.UnsafeString()
	if err != nil {
		return err
	}
	if smtpSettings.Username != "" || password != "" {
		auth = smtp.PlainAuth("", smtpSettings.Username, password, smtpSettings.Host)
	}

	addr := smtpSettings.Host + ":" + strconv.Itoa(smtpSettings.Port)
	var client *smtp.Client
	switch smtpSettings.Encryption {
	case "SSL/TLS":
		level.Info(logger).Log("msg", "Dialing smtp server with TLS", "addr", addr)
		tlsconfig := &tls.Config{
			InsecureSkipVerify: false,
			ServerName:         smtpSettings.Host,
		}
		conn, errDial := tls.Dial("tcp", addr, tlsconfig)
		if errDial != nil {
			return errors.New("Failed to dial TLS: " + errDial.Error())
		}
		level.Debug(logger).Log("msg", "Creating SMTP client", "addr", addr)
		client, err = smtp.NewClient(conn, smtpSettings.Host)
		if err != nil {
			return errors.New("Failed to create SMTP client (SSL/TLS): " + err.Error())
		}
		defer client.Quit()
	case "STARTTLS":
		level.Info(logger).Log("msg", "Dialing smtp server with STARTTLS", "addr", addr)
		client, err = smtp.Dial(addr)
		if err != nil {
			return errors.New("Failed to dial SMTP server (STARTTLS): " + err.Error())
		}
		defer client.Quit()

		if ok, _ := client.Extension("STARTTLS"); ok {
			tlsconfig := &tls.Config{
				InsecureSkipVerify: false,
				ServerName:         smtpSettings.Host,
			}
			if errStartTLS := client.StartTLS(tlsconfig); errStartTLS != nil {
				return errors.New("STARTTLS failed: " + errStartTLS.Error())
			}
		} else {
			level.Info(logger).Log("msg", "SMTP server does not support STARTTLS, back to normal connection")
		}
	default:
		level.Info(logger).Log("msg", "Dialing smtp server", "addr", addr)
		client, err = smtp.Dial(addr)
		if err != nil {
			return errors.New("Failed to dial SMTP server: " + err.Error())
		}
		defer client.Quit()
	}
	if auth != nil {
		level.Debug(logger).Log("msg", "Auth with username and password", "username", smtpSettings.Username)
		if errAuth := client.Auth(auth); errAuth != nil {
			return errors.New("SMTP Auth failed: " + errAuth.Error())
		}
	}
	level.Info(logger).Log("msg", "Send email", "from", smtpSettings.FromAddress, "to", strings.Join(to, ","))
	if errMail := client.Mail(smtpSettings.FromAddress); errMail != nil {
		return errors.New("SMTP Mail From failed: " + errMail.Error())
	}
	for _, toEmail := range to {
		if errRcpt := client.Rcpt(toEmail); errRcpt != nil {
			return errors.New("SMTP Rcpt To failed: " + errRcpt.Error())
		}
	}
	w, errData := client.Data()
	if errData != nil {
		return errors.New("SMTP Data command failed: " + errData.Error())
	}
	_, errWrite := w.Write([]byte(encodeToRFC5322(smtpSettings.FromName, smtpSettings.FromAddress, to, subject, body)))
	if errWrite != nil {
		return errors.New("Failed to write email body: " + errWrite.Error())
	}

	errClose := w.Close()
	if errClose != nil {
		return errors.New("Failed to close data writer: " + errClose.Error())
	}

	return nil
}

// TestSMTPConnection tests the SMTP connection by sending an email
func (s *EmailService) TestSMTPConnection(ctx context.Context, testReq *model.SMTPTestRequest) error {
	smtpSettings := &testReq.SMTPSettings

	if !smtpSettings.Enabled {
		return errors.New("SMTP is not enabled")
	}

	// Consolidate fetching missing fields if not provided in testReq, after enabled check
	dbSettings, err := s.settingService.GetSMTPSettings(ctx)
	if err != nil {
		return err
	}
	if len(testReq.Password) == 0 {
		smtpSettings.Password = dbSettings.Password
	} else {
		smtpSettings.Password = safe.NewEncryptedString(testReq.Password, os.Getenv(safe.SecretEnvName))
	}

	fromName := smtpSettings.FromName
	if fromName == "" {
		fromName = "EZ-Console Test"
	}

	subject := "EZ-Console SMTP Test"
	msg := "This is a test email from EZ-Console to verify SMTP settings."

	return s.SendEmail(ctx, smtpSettings, []string{testReq.To}, subject, msg)
}
