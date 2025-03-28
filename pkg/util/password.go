package util

import (
	"crypto/md5"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"math/big"
	"regexp"
	"strings"

	"github.com/gofrs/uuid"
	w "github.com/sven-victor/ez-utils/wrapper"
	"github.com/tredoe/osutil/user/crypt/sha256_crypt"
	"golang.org/x/crypto/bcrypt"
)

// IsPasswordComplex checks if the password meets complexity requirements
func IsPasswordComplex(password string, minLength int) bool {
	if len(password) < minLength {
		return false
	}

	// Check if it contains uppercase letters
	hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(password)
	if !hasUpper {
		return false
	}

	// Check if it contains lowercase letters
	hasLower := regexp.MustCompile(`[a-z]`).MatchString(password)
	if !hasLower {
		return false
	}

	// Check if it contains digits
	hasDigit := regexp.MustCompile(`\d`).MatchString(password)
	if !hasDigit {
		return false
	}

	// Check if it contains special characters
	hasSpecial := regexp.MustCompile(`[^a-zA-Z0-9]`).MatchString(password)
	if !hasSpecial {
		return false
	}

	return true
}

// CheckPasswordHistory checks if the new password is the same as any historical passwords
func CheckPasswordHistory(newPassword string, passwordHistory []string) bool {
	for _, oldPassword := range passwordHistory {
		if strings.TrimSpace(newPassword) == strings.TrimSpace(oldPassword) {
			return true
		}
	}
	return false
}

// SanitizePassword removes password information from logs or error messages
func SanitizePassword(input string) string {
	// Replace password fields
	re := regexp.MustCompile(`(password|passwd|pwd)[\s]*[:=][\s]*['"]?[^\s,'"]+['"]?`)
	return re.ReplaceAllString(input, "$1=*****")
}

func GenerateRandomPassword(length int) string {
	if length < 4 {
		length = 4
	}

	// Character sets
	lowerChars := "abcdefghijklmnopqrstuvwxyz"
	upperChars := "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	digits := "0123456789"
	specialChars := "!@#$%^*()-_=+[]{}|;:,.?/"

	allChars := lowerChars + upperChars + digits + specialChars

	// Ensure the password contains at least one character of each type
	password := []byte{
		lowerChars[randInt(len(lowerChars))],
		upperChars[randInt(len(upperChars))],
		digits[randInt(len(digits))],
		specialChars[randInt(len(specialChars))],
	}

	// Randomly select the remaining part
	for i := 4; i < length; i++ {
		password = append(password, allChars[randInt(len(allChars))])
	}

	// Shuffle the order
	shuffle(password)

	return string(password)
}

// randInt returns a cryptographically secure random integer in [0, max)
func randInt(max int) int {
	nBig, err := rand.Int(rand.Reader, big.NewInt(int64(max)))
	if err != nil {
		panic(err) // Better error handling might be needed depending on the application
	}
	return int(nBig.Int64())
}

// Fisher–Yates shuffle algorithm
func shuffle(data []byte) {
	for i := len(data) - 1; i > 0; i-- {
		j := randInt(i + 1)
		data[i], data[j] = data[j], data[i]
	}
}

func Sha256CryptPassword(prefix string, password string) (string, error) {
	c := sha256_crypt.New()
	salt := base64.StdEncoding.EncodeToString(w.M(uuid.NewV4()).Bytes())
	hashedPassword, err := c.Generate([]byte(password), []byte("$5$"+salt))
	if err != nil {
		return "", err
	}
	return prefix + hashedPassword, nil
}

// GenerateRandomString generates a random string of the specified length
func GenerateRandomString(length int) string {
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, length)

	for i := range b {
		n, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		if err != nil {
			// Use a simple fallback mechanism in case of an error
			return fmt.Sprintf("%x", md5.Sum([]byte(fmt.Sprintf("%d", i))))[:length]
		}
		b[i] = charset[n.Int64()]
	}

	return string(b)
}

func BcryptPassword(password string) (salt string, hashedPassword string, err error) {
	salt = GenerateRandomString(16)
	hashedPasswordBytes, err := bcrypt.GenerateFromPassword([]byte(password+salt), bcrypt.DefaultCost)
	if err != nil {
		return "", "", err
	}

	return salt, string(hashedPasswordBytes), nil
}
