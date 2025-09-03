export type AccessType = "public" | "private" | "owner";

export interface assignPermissionsParams {
  /** Role ID */
  id: string;
}

export interface AssignPermissionsRequest {
  permission_ids: string[];
}

export interface assignRolesParams {
  /** User ID */
  id: string;
}

export interface AssignRolesRequest {
  role_ids: string[];
}

export interface assignServiceAccountRolesParams {
  /** Service account ID */
  id: string;
}

export interface AssignServiceAccountRolesRequest {
  role_ids: string[];
}

export interface AuditLog {
  /** Operation type */
  action: string;
  /** Operation name */
  action_name: string;
  created_at: string;
  /** Operation details, in JSON format */
  details: AuditLogDetail;
  id: string;
  /** IP address of the operation */
  ip: string;
  /** Associated resource ID */
  ref_id: string;
  /** Operation status: success, failed */
  status: string;
  /** Timestamp of the operation */
  timestamp: string;
  updated_at: string;
  /** User agent information */
  user_agent: string;
  /** User ID of the operator */
  user_id: string;
  /** Username of the operator */
  username: string;
}

export interface AuditLogDetail {
  new_data: any;
  old_data: any;
  request: any;
}

export interface ChangePasswordRequest {
  new_password: string;
  old_password: string;
}

export interface Chart {
  color: string;
  datasets: Dataset[];
  icon: string;
  labels: string[];
  title: string;
  value: number;
  width: number;
}

export interface CheckPasswordComplexityRequest {
  password: string;
}

export interface CheckPasswordComplexityResponse {
  is_valid: boolean;
}

export type Condition = true;

export interface CreateRoleRequest {
  description: string;
  name: string;
  permissions: string[];
  policy_document: PolicyDocument;
}

export interface createServiceAccountAccessKeyParams {
  /** Service account ID */
  id: string;
}

export interface CreateServiceAccountAccessKeyRequest {
  description: string;
  expires_at: string;
  name: string;
}

export interface CreateServiceAccountAccessKeyResponse {
  access_key_id: string;
  created_at: string;
  description: string;
  expires_at: string;
  id: string;
  last_used: string;
  name: string;
  secret_access_key: string;
  service_account_id: string;
  status: string;
  updated_at: string;
}

export interface CreateServiceAccountRequest {
  description: string;
  name: string;
}

export interface CreateUserRequest {
  avatar?: string;
  email: string;
  full_name: string;
  mfa_enforced: boolean;
  password: string;
  phone?: string;
  role_ids: string[];
  username: string;
}

export interface Dataset {
  color: string;
  data: number[];
  label: string;
}

export interface deleteRoleParams {
  /** Role ID */
  id: string;
}

export interface deleteServiceAccountAccessKeyParams {
  /** Service account ID */
  id: string;
  /** Access key ID */
  keyId: string;
}

export interface deleteServiceAccountParams {
  /** Service account ID */
  id: string;
}

export interface deleteUserParams {
  /** User ID */
  id: string;
}

export interface downloadFileParams {
  /** File key */
  fileKey: string;
}

export type Duration =
  | -9223372036854776000
  | 9223372036854776000
  | 1
  | 1000
  | 1000000
  | 1000000000
  | 60000000000
  | 3600000000000;

export interface EnableMFAResponse {
  qr_code: string;
  secret: string;
  token: string;
}

export interface ErrorResponse {
  code: string;
  err: any;
  message: string;
}

export interface File {
  access: AccessType;
  created_at: string;
  id: string;
  name: string;
  size: number;
  type: FileType;
  updated_at: string;
}

export type FileType = "image";

export interface getAuditLogsParams {
  /** Current page number */
  current?: number;
  /** Number of items per page */
  page_size?: number;
}

export interface getCurrentUserLogsParams {
  /** Current page number */
  current?: number;
  /** Number of items per page */
  page_size?: number;
}

export interface getLdapUsersParams {
  /** Skip existing users */
  skip_existing?: boolean;
}

export interface getLoginUrlParams {
  /** Provider */
  provider: string;
}

export interface getRoleParams {
  /** Role ID */
  id: string;
}

export interface getRolePolicyParams {
  /** Role ID */
  id: string;
}

export interface getServiceAccountAccessKeysParams {
  /** Service account ID */
  id: string;
}

export interface getServiceAccountByIdParams {
  /** Service account ID */
  id: string;
}

export interface getServiceAccountPolicyParams {
  /** Service account ID */
  id: string;
}

export interface getServiceAccountRolesParams {
  /** Service account ID */
  id: string;
}

export interface getServiceAccountsParams {
  /** Current page number */
  current?: number;
  /** Number of items per page */
  page_size?: number;
  /** Search keyword */
  search?: string;
}

export interface getUserLogsParams {
  /** User ID */
  id: string;
  /** Current page number */
  current?: number;
  /** Number of items per page */
  page_size?: number;
}

export interface getUserParams {
  /** User ID */
  id: string;
}

export interface getUserSessionsParams {
  /** Current page number */
  current?: number;
  /** Number of items per page */
  page_size?: number;
}

export interface handleCallbackParams {
  /** Code */
  code: string;
  /** State */
  state: string;
  /** Provider */
  provider: string;
}

export interface HealthResult {
  message: string;
  reason: string;
  status: string;
}

export interface ImportLDAPUsersRequest {
  user_dn?: string[];
}

export interface LDAPSettings {
  base_dn: string;
  bind_dn: string;
  bind_password: string;
  ca_cert: string;
  client_cert: string;
  client_key: string;
  default_role: string;
  display_name_attr: string;
  email_attr: string;
  enabled: boolean;
  insecure: boolean;
  server_url: string;
  start_tls: boolean;
  timeout: number;
  user_attr: string;
  user_filter: string;
}

export interface LDAPTestMessage {
  message: string;
  success: boolean;
}

export interface LDAPTestRequest {
  base_dn: string;
  bind_dn: string;
  bind_password: string;
  ca_cert: string;
  client_cert: string;
  client_key: string;
  default_role: string;
  display_name_attr: string;
  email_attr: string;
  enabled: boolean;
  insecure: boolean;
  password: string;
  server_url: string;
  start_tls: boolean;
  timeout: Duration;
  user_attr: string;
  user_filter: string;
  username: string;
}

export interface LDAPTestResponse {
  message: LDAPTestMessage[];
  success: boolean;
  user: User;
}

export interface listFilesParams {
  /** Current page */
  current?: number;
  /** Page size */
  page_size?: number;
  /** Search */
  search?: string;
  /** File type */
  file_type?: string;
  /** Access Type */
  access?: string;
}

export interface listRolesParams {
  /** Current page */
  current?: number;
  /** Page size */
  page_size?: number;
  /** Search */
  search?: string;
}

export interface listUsersParams {
  /** Current page number */
  current?: number;
  /** Number of items per page */
  page_size?: number;
  /** Keywords for searching */
  keywords?: string;
  /** Status of the user */
  status?: string;
}

export interface LoginRequest {
  mfa_code: string;
  mfa_token: string;
  password: string;
  username: string;
}

export interface LoginResponse {
  expires_at: string;
  mfa_token: string;
  mfa_type: string;
  needs_mfa: boolean;
  password_expired: boolean;
  token: string;
  user: User;
}

export interface MenuConfig {
  hide: boolean;
  icon: string;
  name: string;
  path: string;
}

export interface MessageData {
  message: string;
}

export interface Navigation {
  name: string;
  path: string;
}

export interface OAuthLoginURLResponse {
  state: string;
  url: string;
}

export interface OAuthProvider {
  display_name: string;
  icon_url: string;
  name: string;
}

export type OAuthProviderType =
  | "github"
  | "google"
  | "dingtalk"
  | "wechat"
  | "custom"
  | "autoDiscover";

export interface OAuthSettings {
  auth_endpoint: string;
  auto_create_user: boolean;
  avatar_field: string;
  client_id: string;
  client_secret: string;
  default_role: string;
  /** Provider display name */
  display_name: string;
  email_field: string;
  enabled: boolean;
  full_name_field: string;
  /** Provider icon URL */
  icon_url: string;
  issuer: string;
  jwks_uri: string;
  mfa_enabled: boolean;
  provider: OAuthProviderType;
  redirect_uri: string;
  role_field: string;
  scope: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  username_field: string;
  wellknown_endpoint: string;
}

export interface PaginationResponseModelAuditLog {
  code: string;
  current: number;
  data: AuditLog[];
  page_size: number;
  total: number;
}

export interface PaginationResponseModelFile {
  code: string;
  current: number;
  data: File[];
  page_size: number;
  total: number;
}

export interface PaginationResponseModelRole {
  code: string;
  current: number;
  data: Role[];
  page_size: number;
  total: number;
}

export interface PaginationResponseModelServiceAccount {
  code: string;
  current: number;
  data: ServiceAccount[];
  page_size: number;
  total: number;
}

export interface PaginationResponseModelUser {
  code: string;
  current: number;
  data: User[];
  page_size: number;
  total: number;
}

export type PasswordComplexity = "low" | "medium" | "high" | "very_high";

export interface Permission {
  code: string;
  created_at: string;
  description: string;
  id: string;
  name: string;
  updated_at: string;
}

export interface PermissionGroup {
  description: string;
  name: string;
  permissions: Permission[];
}

export interface PolicyDocument {
  Statement: StatementEntry[];
}

export interface resetUserPasswordParams {
  /** User ID */
  id: string;
}

export interface ResetUserPasswordRequest {
  password: string;
}

export interface ResetUserPasswordResponse {
  new_password: string;
}

export interface ResponseArrayAuthorizationapiOAuthProvider {
  code: string;
  data: OAuthProvider[];
  err: string;
}

export interface ResponseArrayModelFile {
  code: string;
  data: File[];
  err: string;
}

export interface ResponseArrayModelPermissionGroup {
  code: string;
  data: PermissionGroup[];
  err: string;
}

export interface ResponseArrayModelServiceAccountAccessKey {
  code: string;
  data: ServiceAccountAccessKey[];
  err: string;
}

export interface ResponseArrayModelUser {
  code: string;
  data: User[];
  err: string;
}

export interface ResponseArrayServiceSessionInfo {
  code: string;
  data: SessionInfo[];
  err: string;
}

export interface ResponseAuthorizationapiCreateServiceAccountAccessKeyResponse {
  code: string;
  data: CreateServiceAccountAccessKeyResponse;
  err: string;
}

export interface ResponseAuthorizationapiResetUserPasswordResponse {
  code: string;
  data: ResetUserPasswordResponse;
  err: string;
}

export interface ResponseAuthorizationapiTokenResponse {
  code: string;
  data: TokenResponse;
  err: string;
}

export interface ResponseModelLDAPTestResponse {
  code: string;
  data: LDAPTestResponse;
  err: string;
}

export interface ResponseModelOAuthSettings {
  code: string;
  data: OAuthSettings;
  err: string;
}

export interface ResponseModelPolicyDocument {
  code: string;
  data: PolicyDocument;
  err: string;
}

export interface ResponseModelRole {
  code: string;
  data: Role;
  err: string;
}

export interface ResponseModelSecuritySettings {
  code: string;
  data: SecuritySettings;
  err: string;
}

export interface ResponseModelServiceAccount {
  code: string;
  data: ServiceAccount;
  err: string;
}

export interface ResponseModelServiceAccountAccessKey {
  code: string;
  data: ServiceAccountAccessKey;
  err: string;
}

export interface ResponseModelSMTPSettings {
  code: string;
  data: SMTPSettings;
  err: string;
}

export interface ResponseModelSystemSettings {
  code: string;
  data: SystemSettings;
  err: string;
}

export interface ResponseModelUser {
  code: string;
  data: User;
  err: string;
}

export interface ResponseServiceCharts {
  code: string;
  data: Chart[][];
  err: string;
}

export interface ResponseServiceEnableMFAResponse {
  code: string;
  data: EnableMFAResponse;
  err: string;
}

export interface ResponseServiceHealthResult {
  code: string;
  data: HealthResult;
  err: string;
}

export interface ResponseServiceLoginResponse {
  code: string;
  data: LoginResponse;
  err: string;
}

export interface ResponseServiceOAuthLoginURLResponse {
  code: string;
  data: OAuthLoginURLResponse;
  err: string;
}

export interface ResponseServiceSiteConfig {
  code: string;
  data: SiteConfig;
  err: string;
}

export interface ResponseServiceSystemInfo {
  code: string;
  data: SystemInfo;
  err: string;
}

export interface ResponseServiceTestOAuthCallbackResponse {
  code: string;
  data: TestOAuthCallbackResponse;
  err: string;
}

export interface ResponseString {
  code: string;
  data: string;
  err: string;
}

export interface ResponseSystemapiCheckPasswordComplexityResponse {
  code: string;
  data: CheckPasswordComplexityResponse;
  err: string;
}

export interface ResponseSystemapiLDAPSettings {
  code: string;
  data: LDAPSettings;
  err: string;
}

export interface ResponseSystemapiSMTPTestResponse {
  code: string;
  data: SMTPTestResponse;
  err: string;
}

export interface ResponseUtilMessageData {
  code: string;
  data: MessageData;
  err: string;
}

export interface restoreUserParams {
  /** User ID */
  id: string;
}

export interface Role {
  created_at: string;
  description: string;
  id: string;
  name: string;
  permissions: Permission[];
  /** Permission configuration based on IAM-style policies, stored in JSON format */
  policy_document: PolicyDocument;
  updated_at: string;
}

export interface SecuritySettings {
  history_password_check: boolean;
  history_password_count: number;
  login_failure_attempts: number;
  login_failure_lock: boolean;
  login_failure_lockout_minutes: number;
  mfa_enforced: boolean;
  password_complexity: PasswordComplexity;
  password_expiry_days: number;
  password_min_length: number;
  session_idle_timeout_minutes: number;
  session_timeout_minutes: number;
  user_inactive_days: number;
}

export interface ServiceAccount {
  access_keys: ServiceAccountAccessKey[];
  created_at: string;
  description: string;
  id: string;
  last_access: string;
  name: string;
  policy_document: PolicyDocument;
  /** Associations */
  roles: Role[];
  status: string;
  updated_at: string;
}

export interface ServiceAccountAccessKey {
  access_key_id: string;
  created_at: string;
  description: string;
  expires_at: string;
  id: string;
  last_used: string;
  name: string;
  service_account_id: string;
  status: string;
  updated_at: string;
}

export interface SessionInfo {
  created_at: string;
  id: string;
  ip_address: string;
  is_current: boolean;
  last_active_at: string;
  location: string;
  user_agent: string;
}

export interface setRolePolicyParams {
  /** Role ID */
  id: string;
}

export interface setServiceAccountPolicyParams {
  /** Service account ID */
  id: string;
}

export interface SetServiceAccountPolicyRequest {
  policy_document: PolicyDocument;
}

export interface SiteConfig {
  disable_local_user_login: boolean;
  home_page: string;
  logo: string;
  menu: MenuConfig[];
  name: string;
  name_i18n: Record<string, any>;
  navigation: Navigation[];
}

export interface SMTPSettings {
  enabled: boolean;
  /** None, SSL/TLS, STARTTLS */
  encryption: string;
  from_address: string;
  from_name: string;
  host: string;
  mfa_code_template: string;
  password: string;
  port: number;
  reset_password_template: string;
  user_locked_template: string;
  username: string;
}

export interface SMTPTestRequest {
  enabled: boolean;
  /** None, SSL/TLS, STARTTLS */
  encryption: string;
  from_address: string;
  from_name: string;
  host: string;
  mfa_code_template: string;
  password: string;
  port: number;
  reset_password_template: string;
  to: string;
  user_locked_template: string;
  username: string;
}

export interface SMTPTestResponse {
  message: string;
  success: boolean;
}

export interface StatementEntry {
  /** List of actions, can contain wildcards "*" */
  Action: string[];
  /** Conditions */
  Condition: Record<string, any>;
  /** "Allow" or "Deny" */
  Effect: string;
  /** List of resources, can contain wildcards "*" */
  Resource: string[];
}

export interface SystemInfo {
  cpu_cores: number;
  go_routines: number;
  go_version: string;
  heap_objects: number;
  mem_usage: number;
  role_count: number;
  total_mem: number;
  uptime: number;
  user_count: number;
}

export interface SystemSettings {
  disable_local_user_login: boolean;
  home_page: string;
  logo: string;
  name: string;
  name_i18n: Record<string, any>;
}

export interface terminateSessionParams {
  /** Session ID */
  id: string;
}

export interface TestOAuthCallbackResponse {
  user: User;
  user_info: Record<string, any>;
}

export interface TokenResponse {
  token: string;
}

export interface unlockUserParams {
  /** User ID */
  id: string;
}

export interface UpdateCurrentUserRequest {
  avatar: string;
  email: string;
  full_name: string;
  phone: string;
}

export interface UpdateLDAPSettingsRequest {
  base_dn: string;
  bind_dn: string;
  bind_password: string;
  ca_cert: string;
  client_cert: string;
  client_key: string;
  default_role: string;
  display_name_attr: string;
  email_attr: string;
  enabled: boolean;
  insecure: boolean;
  server_url: string;
  start_tls: boolean;
  timeout: number;
  user_attr: string;
  user_filter: string;
}

export interface UpdateOAuthSettingsRequest {
  auth_endpoint: string;
  auto_create_user: boolean;
  avatar_field: string;
  client_id: string;
  client_secret: string;
  default_role: string;
  /** Provider display name */
  display_name: string;
  email_field: string;
  enabled: boolean;
  full_name_field: string;
  /** Provider icon URL */
  icon_url: string;
  issuer: string;
  jwks_uri: string;
  mfa_enabled: boolean;
  provider: OAuthProviderType;
  redirect_uri: string;
  role_field: string;
  scope: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  username_field: string;
  wellknown_endpoint: string;
}

export interface updateRoleParams {
  /** Role ID */
  id: string;
}

export interface UpdateRoleRequest {
  description: string;
  name: string;
  permissions: string[];
  policy_document: PolicyDocument;
}

export interface updateServiceAccountAccessKeyParams {
  /** Service account ID */
  id: string;
  /** Access key ID */
  keyId: string;
}

export interface UpdateServiceAccountAccessKeyRequest {
  description: string;
  expires_at: string;
  name: string;
  status: "active" | "disabled";
}

export interface updateServiceAccountParams {
  /** Service account ID */
  id: string;
}

export interface UpdateServiceAccountRequest {
  description: string;
  name: string;
}

export interface updateServiceAccountStatusParams {
  /** Service account ID */
  id: string;
}

export interface UpdateServiceAccountStatusRequest {
  status: "active" | "disabled";
}

export interface updateUserParams {
  /** User ID */
  id: string;
}

export interface UpdateUserRequest {
  avatar?: string;
  email?: string;
  full_name?: string;
  ldap_dn?: string;
  mfa_enforced?: boolean;
  phone?: string;
  role_ids?: string[];
  source?: string;
  status?: string;
}

export interface updateUserStatusParams {
  /** User ID */
  id: string;
}

export interface UpdateUserStatusRequest {
  status: string;
}

export interface User {
  avatar: string;
  created_at: string;
  disable_change_password: boolean;
  email: string;
  full_name: string;
  id: string;
  last_login: string;
  ldap_dn: string;
  mfa_enabled: boolean;
  mfa_enforced: boolean;
  oauth_id: string;
  oauth_provider: string;
  password_changed_at: string;
  phone: string;
  roles: Role[];
  source: UserSource;
  status: string;
  updated_at: string;
  username: string;
}

export type UserSource = "local" | "ldap" | "oauth";

export interface VerifyAndActivateMFARequest {
  code: string;
  mfa_type: string;
  token?: string;
}
