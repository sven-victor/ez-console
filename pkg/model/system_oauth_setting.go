package model

import "github.com/sven-victor/ez-utils/safe"

// Add OAuth setting key constants
const (
	// OAuth related settings
	SettingOAuthEnabled          SettingKey = "oauth_enabled"           // Whether to enable OAuth authentication
	SettingOAuthProvider         SettingKey = "oauth_provider"          // OAuth provider type
	SettingOAuthClientID         SettingKey = "oauth_client_id"         // OAuth client ID
	SettingOAuthClientSecret     SettingKey = "oauth_client_secret"     // OAuth client secret
	SettingOAuthAuthEndpoint     SettingKey = "oauth_auth_endpoint"     // OAuth authentication endpoint
	SettingOAuthTokenEndpoint    SettingKey = "oauth_token_endpoint"    // OAuth token endpoint
	SettingOAuthUserInfoEndpoint SettingKey = "oauth_userinfo_endpoint" // OAuth user info endpoint
	SettingOAuthScope            SettingKey = "oauth_scope"             // OAuth authorization scope
	SettingOAuthRedirectURI      SettingKey = "oauth_redirect_uri"      // OAuth redirect URI
	SettingOAuthAutoCreateUser   SettingKey = "oauth_auto_create_user"  // Whether to automatically create users
	SettingOAuthDefaultRole      SettingKey = "oauth_default_role"      // OAuth user default role
	SettingOAuthEmailField       SettingKey = "oauth_email_field"       // OAuth email field
	SettingOAuthUsernameField    SettingKey = "oauth_username_field"    // OAuth username field
	SettingOAuthFullNameField    SettingKey = "oauth_full_name_field"   // OAuth full name field
	SettingOAuthAvatarField      SettingKey = "oauth_avatar_field"      // OAuth avatar field
	SettingOAuthRoleField        SettingKey = "oauth_role_field"        // OAuth role field
	SettingOAuthIconURL          SettingKey = "oauth_icon_url"          // OAuth icon URL
	SettingOAuthDisplayName      SettingKey = "oauth_display_name"      // OAuth display name
	SettingOAuthMFAEnabled       SettingKey = "oauth_mfa_enabled"       // Whether to enable MFA for OAuth authentication

	SettingOAuthWellknownEndpoint SettingKey = "oauth_wellknown_endpoint" // OAuth wellknown endpoint
	SettingOAuthJWKsURI           SettingKey = "oauth_jwks_uri"           // OAuth JWKs URL
	SettingOAuthIssuer            SettingKey = "oauth_issuer"             // OAuth issuer
	SettingOAuthVerifyToken       SettingKey = "oauth_verify_token"       // Whether to verify token
	SettingOAuthVerifyNonce       SettingKey = "oauth_verify_nonce"       // Whether to verify nonce
	SettingOAuthCodeVerifier      SettingKey = "oauth_code_verifier"      // Whether to verify PKCE
)

var OAuthSettingKeys = []SettingKey{
	SettingOAuthEnabled,
	SettingOAuthProvider,
	SettingOAuthClientID,
	SettingOAuthClientSecret,
	SettingOAuthAuthEndpoint,
	SettingOAuthTokenEndpoint,
	SettingOAuthUserInfoEndpoint,
	SettingOAuthScope,
	SettingOAuthRedirectURI,
	SettingOAuthAutoCreateUser,
	SettingOAuthDefaultRole,
	SettingOAuthIconURL,
	SettingOAuthDisplayName,
	SettingOAuthEmailField,
	SettingOAuthUsernameField,
	SettingOAuthFullNameField,
	SettingOAuthAvatarField,
	SettingOAuthRoleField,
	SettingOAuthMFAEnabled,
	SettingOAuthWellknownEndpoint,
	SettingOAuthJWKsURI,
	SettingOAuthIssuer,
}

func init() {
	RegisterSettingKeys("oauth", OAuthSettings{}, OAuthSettingKeys...)
}

// OAuthProvider OAuth provider type
type OAuthProviderType string

const (
	OAuthProviderGitHub   OAuthProviderType = "github"   // GitHub
	OAuthProviderGoogle   OAuthProviderType = "google"   // Google
	OAuthProviderDingtalk OAuthProviderType = "dingtalk" // DingTalk
	OAuthProviderWeChat   OAuthProviderType = "wechat"   // WeChat
	OAuthProviderCustom   OAuthProviderType = "custom"   // Custom

	OAuthProviderAutoDiscover OAuthProviderType = "autoDiscover" // Auto Discover
)

// OAuthSettings OAuth settings request and response structure
type OAuthSettings struct {
	Enabled          bool              `json:"enabled"`
	Provider         OAuthProviderType `json:"provider"`
	ClientID         string            `json:"client_id"`
	ClientSecret     *safe.String      `json:"client_secret"`
	AuthEndpoint     string            `json:"auth_endpoint"`
	TokenEndpoint    string            `json:"token_endpoint"`
	UserInfoEndpoint string            `json:"userinfo_endpoint"`
	Scope            string            `json:"scope"`
	RedirectURI      string            `json:"redirect_uri"`
	AutoCreateUser   bool              `json:"auto_create_user"`
	DefaultRole      string            `json:"default_role"`
	EmailField       string            `json:"email_field"`
	UsernameField    string            `json:"username_field"`
	FullNameField    string            `json:"full_name_field"`
	AvatarField      string            `json:"avatar_field"`
	RoleField        string            `json:"role_field"`
	IconURL          string            `json:"icon_url"`     // Provider icon URL
	DisplayName      string            `json:"display_name"` // Provider display name
	MFAEnabled       bool              `json:"mfa_enabled"`

	WellknownEndpoint string `json:"wellknown_endpoint"`
	JWKsURI           string `json:"jwks_uri"`
	Issuer            string `json:"issuer"`
}
