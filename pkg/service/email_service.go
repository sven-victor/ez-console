// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/safe"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/trace"
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

func (s *EmailService) SendEmail(ctx context.Context, smtpSettings *model.SMTPSettings, to []string, subject, body string) (err error) {
	logger := log.GetContextLogger(ctx)
	ctx, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(
		ctx, "SEND Email",
		trace.WithSpanKind(trace.SpanKindClient),
		trace.WithAttributes(
			attribute.String("messaging.system", "smtp"),
			attribute.String("messaging.operation", "send"),
			attribute.Bool("smtp.encrypted", smtpSettings.Encryption == "SSL/TLS" || smtpSettings.Encryption == "STARTTLS"),
			attribute.String("peer.service", "smtp"),
			attribute.String("net.peer.name", smtpSettings.Host),
			attribute.Int("net.peer.port", smtpSettings.Port),
		),
	)
	defer span.End()

	defer func() {
		if r := recover(); r != nil {
			if err != nil {
				level.Warn(logger).Log("msg", "Recover from panic", "error", err, "panic", fmt.Sprintf("%v", r))
			} else {
				err = errors.New(fmt.Sprintf("%v", r))
			}
		}
		if err != nil {
			span.RecordError(err)
			span.SetStatus(codes.Error, err.Error())
		}
	}()
	var auth smtp.Auth
	password, err := smtpSettings.Password.UnsafeString()
	if err != nil {
		return err
	}
	if smtpSettings.Username != "" && password != "" {
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
		defer conn.Close()
		span.SetAttributes(attribute.String("net.peer.ip", conn.RemoteAddr().String()))
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
	span.SetStatus(codes.Ok, "Email sent successfully")
	return nil
}

// TestSMTPConnection tests the SMTP connection by sending an email
func (s *EmailService) TestSMTPConnection(ctx context.Context, testReq *model.SMTPTestRequest) error {
	systemName, err := s.settingService.GetStringSetting(ctx, model.SettingSystemName, "EZ-Console")
	if err != nil {
		return err
	}
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

	subject := fmt.Sprintf("%s SMTP Test", systemName)
	msg := fmt.Sprintf("This is a test email from %s to verify SMTP settings.", systemName)

	return s.SendEmail(ctx, smtpSettings, []string{testReq.To}, subject, msg)
}
