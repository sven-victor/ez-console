export type AccessType = "public" | "private" | "owner";

export interface addUserToOrganizationParams {
  /** Organization ID */
  id: string;
}

export interface AddUserToOrganizationRequest {
  role_ids: string[];
  user_id: string;
}

export interface AIChatMessage {
  /** Message content */
  content: string;
  created_at: string;
  id: string;
  /** Message timestamp */
  message_time: string;
  /** Additional metadata */
  metadata: AIChatMessageMetadata;
  /** Organization ID */
  organization_id: string;
  /** Message role */
  role: AIChatMessageRole;
  /** Session ID */
  session_id: string;
  /** Message status */
  status: AIChatMessageStatus;
  /** Tokens used for this message */
  tokens_used: number;
  /** Tool call ID (for tool messages) */
  tool_call_id: string;
  /** Tool calls (for assistant messages) */
  tool_calls: AIToolCall[];
  updated_at: string;
  /** User ID */
  user_id: string;
}

export type AIChatMessageMetadata = true;

export type AIChatMessageRole = "user" | "assistant" | "system" | "tool";

export type AIChatMessageStatus = "pending" | "streaming" | "completed" | "failed";

export interface AIChatSession {
  created_at: string;
  /** Session end time */
  end_time: string;
  id: string;
  /** Messages */
  messages: AIChatMessage[];
  /** AI model ID used */
  model_id: string;
  /** Organization ID */
  organization_id: string;
  /** Session start time */
  start_time: string;
  /** Session title */
  title: string;
  updated_at: string;
  /** User ID */
  user_id: string;
}

export interface AIFunctionCall {
  arguments: string;
  name: string;
}

export interface AIModel {
  /** Additional configuration`          // Configuration (includes api_key, model_id, base_url, etc.) */
  config: Record<string, any>;
  created_at: string;
  /** Creator user ID */
  created_by: string;
  /** Model description */
  description: string;
  id: string;
  /** Whether this is the default model */
  is_default: boolean;
  /** Model name */
  name: string;
  /** Organization ID */
  organization_id: string;
  /** Provider (openai, etc.) */
  provider: AIModelProvider;
  /** Status */
  status: AIModelStatus;
  updated_at: string;
  /** Last updater user ID */
  updated_by: string;
}

export type AIModelProvider = "openai";

export type AIModelStatus = "enabled" | "disabled";

export interface AIToolCall {
  function: AIFunctionCall;
  id: string;
  index: number;
  type: string;
}

export interface AITypeDefinition {
  config_fields: ConfigField[];
  description: string;
  name: string;
  provider: AIModelProvider;
}

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

export interface ChatStreamEvent {
  content: string;
  event_type: EventType;
  message_id: string;
  role: AIChatMessageRole;
  tool_calls: ToolCall[];
}

export interface CheckPasswordComplexityRequest {
  password: string;
}

export interface CheckPasswordComplexityResponse {
  is_valid: boolean;
}

export type Condition = true;

export interface ConfigField {
  /** Dynamic data source configuration */
  data_source: DataSource;
  default: string;
  description: string;
  display_name: string;
  name: string;
  /** Static options (used when DataSource is nil or type=static) */
  options: ConfigFieldOptions[];
  placeholder: string;
  required: boolean;
  type: FieldType;
  /** Condition for field visibility */
  visible_when: VisibleCondition;
}

export interface ConfigFieldOptions {
  label: string;
  value: string;
}

export interface CreateAIModelRequest {
  config: Record<string, any>;
  description?: string;
  is_default?: boolean;
  name: string;
  provider: AIModelProvider;
}

export interface CreateChatSessionRequest {
  messages: SimpleChatMessage[];
  model_id: string;
  title: string;
}

export interface CreateOrganizationRequest {
  description?: string;
  name: string;
  status: string;
}

export interface CreateRoleRequest {
  ai_tool_permissions: RoleAIToolPermissionRequest[];
  description: string;
  name: string;
  organization_id: string;
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

export interface CreateToolSetRequest {
  config?: Record<string, any>;
  description?: string;
  name: string;
  type: ToolSetType;
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

export interface DataSource {
  /** Cache control */
  cache: boolean;
  /** Cache TTL in seconds (0 = no expiration) */
  cache_ttl: number;
  /** DependsOn specifies field dependencies (field names that this field depends on)
When dependent fields change, this field's options should be reloaded */
  depends_on: string[];
  /** Filter conditions (flexible filtering for different source types)
For toolsets: {"type": "webhook"} to filter by toolset type
For internal: {"status": "active"} to filter by status, etc. */
  filter: Record<string, any>;
  /** Response mapping fields (for API and other sources) */
  label_key: string;
  /** HTTP method (GET, POST, etc.) */
  method: string;
  /** Parameters for API requests (query params or request body) */
  params: Record<string, any>;
  /** Type specifies the data source type */
  type: DataSourceType;
  /** API-specific fields (when Type = "api") */
  url: string;
  /** JSON key for option value */
  value_key: string;
}

export type DataSourceType = "static" | "api" | "toolsets" | "internal";

export interface deleteAIModelParams {
  /** AI model ID */
  id: string;
}

export interface deleteChatSessionParams {
  /** Chat session ID */
  sessionId: string;
}

export interface deleteOrganizationParams {
  /** Organization ID */
  id: string;
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

export interface deleteToolSetParams {
  /** Toolset ID */
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
  trace_id: string;
}

export type EventType = "content" | "tool_call" | "error";

export type FieldType =
  | "text"
  | "string"
  | "password"
  | "number"
  | "boolean"
  | "array"
  | "object"
  | "select";

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

export interface FunctionCall {
  /** call function with arguments in JSON format */
  arguments: string;
  name: string;
}

export interface FunctionDefinition {
  description: string;
  name: string;
  parameters: any;
  strict: boolean;
}

export interface generateChatSessionTitleParams {
  /** Chat session ID */
  sessionId: string;
}

export interface GenerateChatSessionTitleRequest {
  /** Optional: if provided, use this title; otherwise generate automatically */
  title: string;
}

export interface getAIModelParams {
  /** AI model ID */
  id: string;
}

export interface getAuditLogsParams {
  /** Current page number */
  current?: number;
  /** Number of items per page */
  page_size?: number;
}

export interface getChatSessionParams {
  /** Chat session ID */
  sessionId: string;
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

export interface getOrganizationParams {
  /** Organization ID */
  id: string;
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

export interface getToolSetParams {
  /** Toolset ID */
  id: string;
}

export interface getToolSetToolsParams {
  /** Toolset ID */
  id: string;
}

export interface getUserLogsParams {
  /** User ID */
  id: string;
  /** Current page number */
  current?: number;
  /** Number of items per page */
  page_size?: number;
}

export interface getUserOrganizationsParams {
  /** User ID */
  user_id: string;
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

export interface listAIModelsParams {
  /** Current page number */
  current?: number;
  /** Page size */
  page_size?: number;
  /** Search keyword */
  search?: string;
}

export interface listChatSessionsParams {
  /** Current page number */
  current?: number;
  /** Page size */
  page_size?: number;
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

export interface listOrganizationsParams {
  /** Current page */
  current?: number;
  /** Page size */
  page_size?: number;
  /** Search */
  search?: string;
}

export interface listOrganizationUsersParams {
  /** Organization ID */
  id: string;
  /** Current page */
  current?: number;
  /** Page size */
  page_size?: number;
  /** Search */
  search?: string;
}

export interface listRolesParams {
  /** Current page */
  current?: number;
  /** Page size */
  page_size?: number;
  /** Search */
  search?: string;
  /** Filter by organization ID (empty for global roles) */
  organization_id?: string;
}

export interface listToolSetsParams {
  /** Current page number */
  current?: number;
  /** Page size */
  page_size?: number;
  /** Search keyword */
  search?: string;
  /** Include tool definitions in response */
  include_tools?: boolean;
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

export interface Organization {
  created_at: string;
  description: string;
  id: string;
  name: string;
  /** active, disabled */
  status: string;
  updated_at: string;
}

export interface OrganizationUser {
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
  organization_roles: Role[];
  organizations: Organization[];
  password_changed_at: string;
  phone: string;
  roles: Role[];
  source: UserSource;
  status: string;
  updated_at: string;
  username: string;
}

export interface PaginationResponseModelAIChatSession {
  code: string;
  current: number;
  data: AIChatSession[];
  page_size: number;
  total: number;
  trace_id: string;
}

export interface PaginationResponseModelAIModel {
  code: string;
  current: number;
  data: AIModel[];
  page_size: number;
  total: number;
  trace_id: string;
}

export interface PaginationResponseModelAuditLog {
  code: string;
  current: number;
  data: AuditLog[];
  page_size: number;
  total: number;
  trace_id: string;
}

export interface PaginationResponseModelFile {
  code: string;
  current: number;
  data: File[];
  page_size: number;
  total: number;
  trace_id: string;
}

export interface PaginationResponseModelOrganization {
  code: string;
  current: number;
  data: Organization[];
  page_size: number;
  total: number;
  trace_id: string;
}

export interface PaginationResponseModelRole {
  code: string;
  current: number;
  data: Role[];
  page_size: number;
  total: number;
  trace_id: string;
}

export interface PaginationResponseModelServiceAccount {
  code: string;
  current: number;
  data: ServiceAccount[];
  page_size: number;
  total: number;
  trace_id: string;
}

export interface PaginationResponseModelToolSet {
  code: string;
  current: number;
  data: ToolSet[];
  page_size: number;
  total: number;
  trace_id: string;
}

export interface PaginationResponseModelUser {
  code: string;
  current: number;
  data: User[];
  page_size: number;
  total: number;
  trace_id: string;
}

export interface PaginationResponseServiceOrganizationUser {
  code: string;
  current: number;
  data: OrganizationUser[];
  page_size: number;
  total: number;
  trace_id: string;
}

export type PasswordComplexity = "low" | "medium" | "high" | "very_high";

export interface Permission {
  code: string;
  created_at: string;
  description: string;
  id: string;
  name: string;
  /** OrgPermission indicates if this permission is organization-scoped */
  org_permission: boolean;
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

export interface removeUserFromOrganizationParams {
  /** Organization ID */
  id: string;
  /** User ID */
  user_id: string;
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
  trace_id: string;
}

export interface ResponseArrayModelFile {
  code: string;
  data: File[];
  err: string;
  trace_id: string;
}

export interface ResponseArrayModelOrganization {
  code: string;
  data: Organization[];
  err: string;
  trace_id: string;
}

export interface ResponseArrayModelPermissionGroup {
  code: string;
  data: PermissionGroup[];
  err: string;
  trace_id: string;
}

export interface ResponseArrayModelServiceAccountAccessKey {
  code: string;
  data: ServiceAccountAccessKey[];
  err: string;
  trace_id: string;
}

export interface ResponseArrayModelUser {
  code: string;
  data: User[];
  err: string;
  trace_id: string;
}

export interface ResponseArrayServiceAITypeDefinition {
  code: string;
  data: AITypeDefinition[];
  err: string;
  trace_id: string;
}

export interface ResponseArrayServiceSessionInfo {
  code: string;
  data: SessionInfo[];
  err: string;
  trace_id: string;
}

export interface ResponseArrayServiceToolSetTypeDefinition {
  code: string;
  data: ToolSetTypeDefinition[];
  err: string;
  trace_id: string;
}

export interface ResponseArraySystemapiTool {
  code: string;
  data: Tool[];
  err: string;
  trace_id: string;
}

export interface ResponseAuthorizationapiCreateServiceAccountAccessKeyResponse {
  code: string;
  data: CreateServiceAccountAccessKeyResponse;
  err: string;
  trace_id: string;
}

export interface ResponseAuthorizationapiResetUserPasswordResponse {
  code: string;
  data: ResetUserPasswordResponse;
  err: string;
  trace_id: string;
}

export interface ResponseAuthorizationapiTokenResponse {
  code: string;
  data: TokenResponse;
  err: string;
  trace_id: string;
}

export interface ResponseModelAIChatSession {
  code: string;
  data: AIChatSession;
  err: string;
  trace_id: string;
}

export interface ResponseModelAIModel {
  code: string;
  data: AIModel;
  err: string;
  trace_id: string;
}

export interface ResponseModelLDAPTestResponse {
  code: string;
  data: LDAPTestResponse;
  err: string;
  trace_id: string;
}

export interface ResponseModelOAuthSettings {
  code: string;
  data: OAuthSettings;
  err: string;
  trace_id: string;
}

export interface ResponseModelOrganization {
  code: string;
  data: Organization;
  err: string;
  trace_id: string;
}

export interface ResponseModelPolicyDocument {
  code: string;
  data: PolicyDocument;
  err: string;
  trace_id: string;
}

export interface ResponseModelRole {
  code: string;
  data: Role;
  err: string;
  trace_id: string;
}

export interface ResponseModelSecuritySettings {
  code: string;
  data: SecuritySettings;
  err: string;
  trace_id: string;
}

export interface ResponseModelServiceAccount {
  code: string;
  data: ServiceAccount;
  err: string;
  trace_id: string;
}

export interface ResponseModelServiceAccountAccessKey {
  code: string;
  data: ServiceAccountAccessKey;
  err: string;
  trace_id: string;
}

export interface ResponseModelSMTPSettings {
  code: string;
  data: SMTPSettings;
  err: string;
  trace_id: string;
}

export interface ResponseModelSystemSettings {
  code: string;
  data: SystemSettings;
  err: string;
  trace_id: string;
}

export interface ResponseModelToolSet {
  code: string;
  data: ToolSet;
  err: string;
  trace_id: string;
}

export interface ResponseModelUser {
  code: string;
  data: User;
  err: string;
  trace_id: string;
}

export interface ResponseServiceCharts {
  code: string;
  data: Chart[][];
  err: string;
  trace_id: string;
}

export interface ResponseServiceEnableMFAResponse {
  code: string;
  data: EnableMFAResponse;
  err: string;
  trace_id: string;
}

export interface ResponseServiceHealthResult {
  code: string;
  data: HealthResult;
  err: string;
  trace_id: string;
}

export interface ResponseServiceLoginResponse {
  code: string;
  data: LoginResponse;
  err: string;
  trace_id: string;
}

export interface ResponseServiceOAuthLoginURLResponse {
  code: string;
  data: OAuthLoginURLResponse;
  err: string;
  trace_id: string;
}

export interface ResponseServiceSiteConfig {
  code: string;
  data: SiteConfig;
  err: string;
  trace_id: string;
}

export interface ResponseServiceSystemInfo {
  code: string;
  data: SystemInfo;
  err: string;
  trace_id: string;
}

export interface ResponseServiceTestOAuthCallbackResponse {
  code: string;
  data: TestOAuthCallbackResponse;
  err: string;
  trace_id: string;
}

export interface ResponseString {
  code: string;
  data: string;
  err: string;
  trace_id: string;
}

export interface ResponseSystemapiCheckPasswordComplexityResponse {
  code: string;
  data: CheckPasswordComplexityResponse;
  err: string;
  trace_id: string;
}

export interface ResponseSystemapiLDAPSettings {
  code: string;
  data: LDAPSettings;
  err: string;
  trace_id: string;
}

export interface ResponseSystemapiSMTPTestResponse {
  code: string;
  data: SMTPTestResponse;
  err: string;
  trace_id: string;
}

export interface ResponseUtilMessageData {
  code: string;
  data: MessageData;
  err: string;
  trace_id: string;
}

export interface restoreUserParams {
  /** User ID */
  id: string;
}

export interface Role {
  /** AIToolPermissions stores the AI tool permissions assigned to the role. */
  ai_tool_permissions: RoleAIToolPermission[];
  created_at: string;
  description: string;
  id: string;
  name: string;
  organization: Organization;
  /** OrganizationID is the organization this role belongs to. If empty, the role is global.
Role names must be unique within the same organization (or among global roles if OrganizationID is nil) */
  organization_id: string;
  permissions: Permission[];
  /** Permission configuration based on IAM-style policies, stored in JSON format */
  policy_document: PolicyDocument;
  updated_at: string;
}

export interface RoleAIToolPermission {
  created_at: string;
  id: string;
  organization_id: string;
  role_id: string;
  tool_name: string;
  toolset: ToolSet;
  toolset_id: string;
  updated_at: string;
}

export interface RoleAIToolPermissionRequest {
  tools: string[];
  toolset_id: string;
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

export interface SendMessageRequest {
  content: string;
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

export interface setDefaultAIModelParams {
  /** AI model ID */
  id: string;
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

export interface SimpleChatMessage {
  content: string;
  role: AIChatMessageRole;
}

export interface SiteConfig {
  attrs: Record<string, any>;
  disable_local_user_login: boolean;
  enable_multi_org: boolean;
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
  enable_multi_org: boolean;
  home_page: string;
  logo: string;
  name: string;
  name_i18n: Record<string, any>;
}

export interface terminateSessionParams {
  /** Session ID */
  id: string;
}

export interface testAIModelParams {
  /** AI model ID */
  id: string;
}

export interface TestOAuthCallbackResponse {
  user: User;
  user_info: Record<string, any>;
}

export interface testToolSetParams {
  /** Toolset ID */
  id: string;
}

export interface TokenResponse {
  token: string;
}

export interface Tool {
  function: FunctionDefinition;
  type: string;
}

export interface ToolCall {
  function: FunctionCall;
  id: string;
  /** Index is not nil only in chat completion chunk object */
  index: number;
  start_time: string;
  status: ToolCallStatus;
  type: ToolType;
}

export type ToolCallStatus = "pending" | "running" | "completed" | "failed";

export interface ToolDefinition {
  description: string;
  name: string;
  parameters: any;
  strict: boolean;
  type: string;
}

export interface ToolSet {
  /** Additional configuration */
  config: Record<string, any>;
  created_at: string;
  /** Creator user ID */
  created_by: string;
  /** Toolset description */
  description: string;
  id: string;
  /** Toolset name */
  name: string;
  /** Organization ID */
  organization_id: string;
  /** Status */
  status: ToolSetStatus;
  /** Available tools (runtime only) */
  tools: ToolDefinition[];
  /** Toolset type (mcp, etc.) */
  type: ToolSetType;
  updated_at: string;
  /** Last updater user ID */
  updated_by: string;
}

export type ToolSetStatus = "enabled" | "disabled";

export type ToolSetType = "utils";

export interface ToolSetTypeDefinition {
  config_fields: ConfigField[];
  description: string;
  name: string;
  tool_set_type: ToolSetType;
}

export type ToolType = "function";

export interface unlockUserParams {
  /** User ID */
  id: string;
}

export interface updateAIModelParams {
  /** AI model ID */
  id: string;
}

export interface UpdateAIModelRequest {
  config?: Record<string, any>;
  description?: string;
  is_default?: boolean;
  name: string;
  provider: AIModelProvider;
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

export interface updateOrganizationParams {
  /** Organization ID */
  id: string;
}

export interface UpdateOrganizationRequest {
  description?: string;
  name: string;
  status: string;
}

export interface updateRoleParams {
  /** Role ID */
  id: string;
}

export interface UpdateRoleRequest {
  ai_tool_permissions: RoleAIToolPermissionRequest[];
  description: string;
  name: string;
  organization_id: string;
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

export interface updateToolSetParams {
  /** Toolset ID */
  id: string;
}

export interface UpdateToolSetRequest {
  config?: Record<string, any>;
  description?: string;
  name: string;
  status?: ToolSetStatus;
  type: ToolSetType;
}

export interface updateToolSetStatusParams {
  /** Toolset ID */
  id: string;
}

export interface UpdateToolSetStatusRequest {
  status: ToolSetStatus;
}

export interface updateUserOrganizationRolesParams {
  /** Organization ID */
  id: string;
  /** User ID */
  user_id: string;
}

export interface UpdateUserOrganizationRolesRequest {
  role_ids: string[];
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
  organizations: Organization[];
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

export interface VisibleCondition {
  /** Field is the name of the field to check */
  field: string;
  /** Operator is the comparison operator (eq, ne, in, not_in, contains) */
  operator: VisibleConditionOperator;
  /** Value is the value to compare against (can be a single value or array for in/not_in) */
  value: any;
}

export type VisibleConditionOperator = "eq" | "ne" | "in" | "not_in" | "contains";
