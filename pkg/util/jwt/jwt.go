/*
 Copyright © 2025 Sven Victor.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

package jwt

import (
	"crypto"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"fmt"
	"strconv"
	"strings"

	jwt "github.com/golang-jwt/jwt/v5"
	w "github.com/sven-victor/ez-utils/wrapper"
)

type Issuer interface {
	SignedString(claims jwt.Claims) (string, error)
	ParseWithClaims(tokenString string, claims jwt.Claims) (*jwt.Token, error)
	GetPublicKey() crypto.PublicKey
}

type Config struct {
	PrivateKey any
	PublicKey  crypto.PublicKey
	Algorithm  jwt.SigningMethod
	KeyID      string
}

func (j *Config) GetPublicKey() crypto.PublicKey {
	return j.PublicKey
}

func (j *Config) ParseWithClaims(tokenString string, claims jwt.Claims) (*jwt.Token, error) {
	return jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		switch token.Method.(type) {
		case *jwt.SigningMethodRSA, *jwt.SigningMethodECDSA:
			if j.PublicKey == nil {
				return nil, fmt.Errorf("public key is nil")
			}

			return j.PublicKey, nil
		case *jwt.SigningMethodHMAC:
			return j.PrivateKey, nil
		default:
			return "", fmt.Errorf("invalid algorithm: %s", j.Algorithm)
		}
	})
}

func (j *Config) SignedString(claims jwt.Claims) (string, error) {
	token := jwt.NewWithClaims(j.Algorithm, claims)
	if j.KeyID != "" {
		token.Header["kid"] = j.KeyID
	}
	return token.SignedString(j.PrivateKey)
}

func (j *Config) UnmarshalJSON(bytes []byte) (err error) {
	type plain struct {
		Secret     string `json:"secret"`
		PrivateKey string `json:"private_key"`
		Algorithm  string `json:"algorithm"`
	}
	var c plain
	if err = json.Unmarshal(bytes, &c); err != nil {
		return err
	}
	if c.Algorithm == "" {
		if c.PrivateKey != "" {
			block, _ := pem.Decode([]byte(c.PrivateKey))
			if _, err := x509.ParsePKCS1PrivateKey(block.Bytes); err == nil {
				c.Algorithm = "RS256"
			} else if _, err := x509.ParseECPrivateKey(block.Bytes); err == nil {
				c.Algorithm = "ES256"
			} else if privKey, err := x509.ParsePKCS8PrivateKey(block.Bytes); err == nil {
				switch privKey.(type) {
				case *ecdsa.PrivateKey:
					c.Algorithm = "ES256"
				case *rsa.PrivateKey:
					c.Algorithm = "RS256"
				default:
					return fmt.Errorf("unsupported private key type: %T", privKey)
				}
			}
		} else if c.Secret != "" {
			c.Algorithm = "HS256"
		}
	}
	issuer, err := NewConfig(c.Algorithm, w.DefaultString(c.PrivateKey, c.Secret))
	if err != nil {
		return err
	}
	*j = *issuer
	return nil
}

func NewRandomKey(method string) (string, error) {
	switch method {
	case "HS256", "HS384", "HS512":
		bits, err := strconv.Atoi(strings.TrimPrefix(method, "HS"))
		if err != nil {
			return "", fmt.Errorf("failed to convert algorithm to bits: %w", err)
		}
		priv := make([]byte, bits/8)
		_, err = rand.Read(priv)
		if err != nil {
			return "", err
		}
		return base64.StdEncoding.EncodeToString(priv), nil
	case "RS256", "RS384", "RS512":
		bits, err := strconv.Atoi(strings.TrimPrefix(method, "RS"))
		if err != nil {
			return "", fmt.Errorf("failed to convert algorithm to bits: %w", err)
		}
		// Generate a new RSA private key
		pk, err := rsa.GenerateKey(rand.Reader, bits*8)
		if err != nil {
			return "", fmt.Errorf("failed to generate RSA private key: %w", err)
		}
		// PKCS8 encode the private key
		block, err := x509.MarshalPKCS8PrivateKey(pk)
		if err != nil {
			return "", fmt.Errorf("failed to marshal RSA private key: %w", err)
		}
		return string(pem.EncodeToMemory(&pem.Block{
			Type:  "PRIVATE KEY",
			Bytes: block,
		})), nil

	case "ES256", "ES384", "ES512":
		var pk *ecdsa.PrivateKey
		var err error
		switch method {
		case "ES256":
			pk, err = ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
		case "ES384":
			pk, err = ecdsa.GenerateKey(elliptic.P384(), rand.Reader)
		case "ES512":
			pk, err = ecdsa.GenerateKey(elliptic.P521(), rand.Reader)
		default:
			return "", fmt.Errorf("invalid algorithm: %s", method)
		}
		if err != nil {
			return "", err
		}
		privBytes, err := x509.MarshalPKCS8PrivateKey(pk)
		if err != nil {
			return "", fmt.Errorf("unable to marshal private key: %v", err)
		}
		return string(pem.EncodeToMemory(&pem.Block{Type: "PRIVATE KEY", Bytes: privBytes})), nil
	default:
		return "", fmt.Errorf("invalid algorithm: %s", method)
	}
}

func NewRandomRSAJWTConfig() (*Config, error) {
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		return nil, err
	}
	return &Config{
		PrivateKey: privateKey,
		PublicKey:  &privateKey.PublicKey,
		Algorithm:  jwt.SigningMethodRS256,
	}, nil
}

func NewConfigBySecret(secret string) (*Config, error) {
	return &Config{PrivateKey: []byte(secret), Algorithm: jwt.SigningMethodHS256}, nil
}

var tokenAlgorithmMap = map[string]jwt.SigningMethod{
	"HS256": jwt.SigningMethodHS256,
	"HS384": jwt.SigningMethodHS384,
	"HS512": jwt.SigningMethodHS512,
	"RS256": jwt.SigningMethodRS256,
	"RS384": jwt.SigningMethodRS384,
	"RS512": jwt.SigningMethodRS512,
	"ES256": jwt.SigningMethodES256,
	"ES384": jwt.SigningMethodES384,
	"ES512": jwt.SigningMethodES512,
}

func NewConfig(method, privateKey string) (*Config, error) {
	var jwtConfig Config
	if alg, ok := tokenAlgorithmMap[method]; ok {
		jwtConfig.Algorithm = alg
	} else {
		return nil, fmt.Errorf("invalid algorithm: %s", method)
	}
	switch method {
	case "HS256", "HS384", "HS512":
		jwtConfig.PrivateKey = []byte(privateKey)
	case "RS256", "RS384", "RS512":
		privk, err := jwt.ParseRSAPrivateKeyFromPEM([]byte(privateKey))
		if err != nil {
			return nil, fmt.Errorf("failed to load rsa private key: %s", err)
		}
		//pubk, err := jwt.ParseRSAPublicKeyFromPEM([]byte(publicKey))
		//if err != nil {
		//	return nil, fmt.Errorf("failed to load rsa public key: %s", err)
		//}
		//if pubk.N.Cmp(privk.N) != 0 || pubk.E != privk.E {
		//	return nil, fmt.Errorf("public key does not match private key")
		//}
		jwtConfig.PublicKey = privk.Public()
		jwtConfig.PrivateKey = privk
	case "ES256", "ES384", "ES512":
		privk, err := jwt.ParseECPrivateKeyFromPEM([]byte(privateKey))
		if err != nil {
			return nil, fmt.Errorf("failed to load ecdsa private key: %s", err)
		}
		//pubk, err := jwt.ParseECPublicKeyFromPEM([]byte(publicKey))
		//if err != nil {
		//	return nil, fmt.Errorf("failed to load ecdsa public key: %s", err)
		//}
		//if pubk.X.Cmp(privk.X) != 0 || pubk.Y.Cmp(privk.Y) != 0 {
		//	return nil, fmt.Errorf("public key does not match private key")
		//}
		jwtConfig.PublicKey = privk.Public()
		jwtConfig.PrivateKey = privk
		switch privk.Curve.Params().BitSize {
		case 256:
			jwtConfig.Algorithm = jwt.SigningMethodES256
		case 384:
			jwtConfig.Algorithm = jwt.SigningMethodES384
		case 512:
			jwtConfig.Algorithm = jwt.SigningMethodES512
		default:
			return nil, fmt.Errorf("invalid ecdsa curve size: %d", privk.Curve.Params().BitSize)
		}
	}
	return &jwtConfig, nil
}

func NewIssuer(method, privateKey string) (Issuer, error) {
	return NewConfig(method, privateKey)
}

func ParseWithClaims(tokenString string, claims jwt.Claims, issuerFunc func(token *jwt.Token) (Issuer, error)) (*jwt.Token, error) {
	token, parts, err := new(jwt.Parser).ParseUnverified(tokenString, claims)
	if err != nil {
		return nil, err
	}
	if len(parts) < 3 {
		return nil, fmt.Errorf("invalid token")
	}
	issuer, err := issuerFunc(token)
	if err != nil {
		return nil, err
	}
	return issuer.ParseWithClaims(tokenString, claims)
}
