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

package model

import "github.com/sven-victor/ez-console/pkg/clients/ldap"

// LDAP setting key constants
const (
	// LDAP related settings
	SettingLDAPEnabled         SettingKey = "ldap_enabled"           // Whether to enable LDAP authentication
	SettingLDAPServerURL       SettingKey = "ldap_server_url"        // LDAP server URL
	SettingLDAPBindDN          SettingKey = "ldap_bind_dn"           // LDAP bind DN
	SettingLDAPBindPassword    SettingKey = "ldap_bind_password"     // LDAP bind password
	SettingLDAPBaseDN          SettingKey = "ldap_base_dn"           // LDAP base DN
	SettingLDAPUserFilter      SettingKey = "ldap_user_filter"       // LDAP user filter condition
	SettingLDAPUserAttr        SettingKey = "ldap_user_attr"         // LDAP user attribute
	SettingLDAPEmailAttr       SettingKey = "ldap_email_attr"        // LDAP email attribute
	SettingLDAPDisplayNameAttr SettingKey = "ldap_display_name_attr" // LDAP display name attribute
	SettingLDAPDefaultRole     SettingKey = "ldap_default_role"      // LDAP user default role
	SettingLDAPStartTLS        SettingKey = "ldap_start_tls"         // Whether to enable StartTLS
	SettingLDAPCACert          SettingKey = "ldap_ca_cert"           // LDAP CA certificate
	SettingLDAPClientCert      SettingKey = "ldap_client_cert"       // LDAP client certificate
	SettingLDAPClientKey       SettingKey = "ldap_client_key"        // LDAP client key
	SettingLDAPInsecure        SettingKey = "ldap_insecure"          // Whether to ignore certificates
	SettingLDAPTimeout         SettingKey = "ldap_timeout"           // LDAP timeout

	SettingLDAPAllowManageUserPassword SettingKey = "ldap_allow_manage_user_password" // Whether to allow manage user password
)

var LDAPSettingKeys = []SettingKey{
	SettingLDAPEnabled,
	SettingLDAPServerURL,
	SettingLDAPBindDN,
	SettingLDAPBindPassword,
	SettingLDAPBaseDN,
	SettingLDAPUserFilter,
	SettingLDAPUserAttr,
	SettingLDAPEmailAttr,
	SettingLDAPDisplayNameAttr,
	SettingLDAPDefaultRole,
	SettingLDAPStartTLS,
	SettingLDAPCACert,
	SettingLDAPClientCert,
	SettingLDAPClientKey,
	SettingLDAPInsecure,
	SettingLDAPTimeout,
}

func init() {
	RegisterSettingKeys("ldap", ldap.Options{}, LDAPSettingKeys...)
}

type LDAPTestMessage struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

// LDAPTestResponse LDAP test response structure
type LDAPTestResponse struct {
	Success bool              `json:"success"`
	Message []LDAPTestMessage `json:"message"`
	User    *User             `json:"user,omitempty"`
}
