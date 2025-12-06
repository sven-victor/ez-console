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

package ldap

import (
	"fmt"
	"time"

	ldap "github.com/go-ldap/ldap/v3"
	"github.com/sven-victor/ez-utils/safe"
)

// Options LDAP settings
type Options struct {
	Enabled         bool         `json:"enabled"`
	ServerURL       string       `json:"server_url"`
	StartTLS        bool         `json:"start_tls"`
	BindDN          string       `json:"bind_dn"`
	BindPassword    *safe.String `json:"bind_password"`
	BaseDN          string       `json:"base_dn"`
	UserFilter      string       `json:"user_filter"`
	UserAttr        string       `json:"user_attr"`
	EmailAttr       string       `json:"email_attr"`
	DisplayNameAttr string       `json:"display_name_attr"`
	DefaultRole     string       `json:"default_role"`
	CACert          string       `json:"ca_cert"`
	ClientCert      string       `json:"client_cert"`
	ClientKey       *safe.String `json:"client_key,omitempty"`
	Insecure        bool         `json:"insecure"`

	Timeout time.Duration `json:"timeout"`
}

func (s *Options) BuildUserFilter(username string) string {
	return fmt.Sprintf("(&(|(%s=%s)(%s=%s))%s)", s.UserAttr, ldap.EscapeFilter(username), s.EmailAttr, ldap.EscapeFilter(username), s.UserFilter)
}
