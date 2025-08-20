declare namespace API {
  type AccessType = "public" | "private" | "owner";

  type assignPermissionsParams = {
    /** Role ID */
    id: string;
  };

  type AssignPermissionsRequest = {
    permission_ids: string[];
  };

  type assignRolesParams = {
    /** User ID */
    id: string;
  };

  type AssignRolesRequest = {
    role_ids: string[];
  };

  type assignServiceAccountRolesParams = {
    /** Service account ID */
    id: string;
  };

  type AssignServiceAccountRolesRequest = {
    role_ids: string[];
  };

  type AuditLog = {
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
  };

  type AuditLogDetail = {
    new_data: any;
    old_data: any;
    request: any;
  };

  type ChangePasswordRequest = {
    new_password: string;
    old_password: string;
  };

  type Chart = {
    color: string;
    datasets: Dataset[];
    icon: string;
    labels: string[];
    title: string;
    value: number;
    width: number;
  };

  type CheckPasswordComplexityRequest = {
    password: string;
  };

  type CheckPasswordComplexityResponse = {
    is_valid: boolean;
  };

  type Condition = true;

  type CreateRoleRequest = {
    description: string;
    name: string;
    permissions: string[];
    policy_document: PolicyDocument;
  };

  type createServiceAccountAccessKeyParams = {
    /** Service account ID */
    id: string;
  };

  type CreateServiceAccountAccessKeyRequest = {
    description: string;
    expires_at: string;
    name: string;
  };

  type CreateServiceAccountAccessKeyResponse = {
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
  };

  type CreateServiceAccountRequest = {
    description: string;
    name: string;
  };

  type CreateUserRequest = {
    avatar?: string;
    email: string;
    full_name: string;
    mfa_enforced: boolean;
    password: string;
    phone?: string;
    role_ids: string[];
    username: string;
  };

  type Dataset = {
    color: string;
    data: number[];
    label: string;
  };

  type deleteRoleParams = {
    /** Role ID */
    id: string;
  };

  type deleteServiceAccountAccessKeyParams = {
    /** Service account ID */
    id: string;
    /** Access key ID */
    keyId: string;
  };

  type deleteServiceAccountParams = {
    /** Service account ID */
    id: string;
  };

  type deleteUserParams = {
    /** User ID */
    id: string;
  };

  type downloadFileParams = {
    /** File key */
    fileKey: string;
  };

  type Duration =
    | -9223372036854776000
    | 9223372036854776000
    | 1
    | 1000
    | 1000000
    | 1000000000
    | 60000000000
    | 3600000000000;

  type EnableMFAResponse = {
    qr_code: string;
    secret: string;
    token: string;
  };

  type ErrorResponse = {
    code: string;
    err: any;
    message: string;
  };

  type File = {
    access: AccessType;
    created_at: string;
    id: string;
    name: string;
    size: number;
    type: FileType;
    updated_at: string;
  };

  type FileType = "image";

  type getAuditLogsParams = {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
  };

  type getCurrentUserLogsParams = {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
  };

  type getLdapUsersParams = {
    /** Skip existing users */
    skip_existing?: boolean;
  };

  type getLoginUrlParams = {
    /** Provider */
    provider: string;
  };

  type getRoleParams = {
    /** Role ID */
    id: string;
  };

  type getRolePolicyParams = {
    /** Role ID */
    id: string;
  };

  type getServiceAccountAccessKeysParams = {
    /** Service account ID */
    id: string;
  };

  type getServiceAccountByIdParams = {
    /** Service account ID */
    id: string;
  };

  type getServiceAccountPolicyParams = {
    /** Service account ID */
    id: string;
  };

  type getServiceAccountRolesParams = {
    /** Service account ID */
    id: string;
  };

  type getServiceAccountsParams = {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
    /** Search keyword */
    search?: string;
  };

  type getUserLogsParams = {
    /** User ID */
    id: string;
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
  };

  type getUserParams = {
    /** User ID */
    id: string;
  };

  type getUserSessionsParams = {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
  };

  type handleCallbackParams = {
    /** Code */
    code: string;
    /** State */
    state: string;
    /** Provider */
    provider: string;
  };

  type HealthResult = {
    message: string;
    reason: string;
    status: string;
  };

  type ImportLDAPUsersRequest = {
    user_dn?: string[];
  };

  type LDAPSettings = {
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
  };

  type LDAPTestMessage = {
    message: string;
    success: boolean;
  };

  type LDAPTestRequest = {
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
  };

  type LDAPTestResponse = {
    message: LDAPTestMessage[];
    success: boolean;
    user: User;
  };

  type listFilesParams = {
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
  };

  type listRolesParams = {
    /** Current page */
    current?: number;
    /** Page size */
    page_size?: number;
    /** Search */
    search?: string;
  };

  type listUsersParams = {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
    /** Keywords for searching */
    keywords?: string;
    /** Status of the user */
    status?: string;
  };

  type LoginRequest = {
    mfa_code: string;
    mfa_token: string;
    password: string;
    username: string;
  };

  type LoginResponse = {
    expires_at: string;
    mfa_token: string;
    mfa_type: string;
    needs_mfa: boolean;
    password_expired: boolean;
    token: string;
    user: User;
  };

  type MenuConfig = {
    hide: boolean;
    icon: string;
    name: string;
    path: string;
  };

  type MessageData = {
    message: string;
  };

  type Navigation = {
    name: string;
    path: string;
  };

  type OAuthLoginURLResponse = {
    state: string;
    url: string;
  };

  type OAuthProvider = {
    display_name: string;
    icon_url: string;
    name: string;
  };

  type OAuthProviderType =
    | "github"
    | "google"
    | "dingtalk"
    | "wechat"
    | "custom"
    | "autoDiscover";

  type OAuthSettings = {
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
  };

  type PaginationResponseModelAuditLog = {
    code: string;
    current: number;
    data: AuditLog[];
    page_size: number;
    total: number;
  };

  type PaginationResponseModelFile = {
    code: string;
    current: number;
    data: File[];
    page_size: number;
    total: number;
  };

  type PaginationResponseModelRole = {
    code: string;
    current: number;
    data: Role[];
    page_size: number;
    total: number;
  };

  type PaginationResponseModelServiceAccount = {
    code: string;
    current: number;
    data: ServiceAccount[];
    page_size: number;
    total: number;
  };

  type PaginationResponseModelUser = {
    code: string;
    current: number;
    data: User[];
    page_size: number;
    total: number;
  };

  type PasswordComplexity = "low" | "medium" | "high" | "very_high";

  type Permission = {
    code: string;
    created_at: string;
    description: string;
    id: string;
    name: string;
    updated_at: string;
  };

  type PermissionGroup = {
    description: string;
    name: string;
    permissions: Permission[];
  };

  type PolicyDocument = {
    Statement: StatementEntry[];
  };

  type resetUserPasswordParams = {
    /** User ID */
    id: string;
  };

  type ResetUserPasswordRequest = {
    password: string;
  };

  type ResetUserPasswordResponse = {
    new_password: string;
  };

  type ResponseArrayAuthorizationapiOAuthProvider = {
    code: string;
    data: OAuthProvider[];
    err: string;
  };

  type ResponseArrayModelFile = {
    code: string;
    data: File[];
    err: string;
  };

  type ResponseArrayModelPermissionGroup = {
    code: string;
    data: PermissionGroup[];
    err: string;
  };

  type ResponseArrayModelServiceAccountAccessKey = {
    code: string;
    data: ServiceAccountAccessKey[];
    err: string;
  };

  type ResponseArrayModelUser = {
    code: string;
    data: User[];
    err: string;
  };

  type ResponseArrayServiceSessionInfo = {
    code: string;
    data: SessionInfo[];
    err: string;
  };

  type ResponseAuthorizationapiCreateServiceAccountAccessKeyResponse = {
    code: string;
    data: CreateServiceAccountAccessKeyResponse;
    err: string;
  };

  type ResponseAuthorizationapiResetUserPasswordResponse = {
    code: string;
    data: ResetUserPasswordResponse;
    err: string;
  };

  type ResponseAuthorizationapiTokenResponse = {
    code: string;
    data: TokenResponse;
    err: string;
  };

  type ResponseModelLDAPTestResponse = {
    code: string;
    data: LDAPTestResponse;
    err: string;
  };

  type ResponseModelOAuthSettings = {
    code: string;
    data: OAuthSettings;
    err: string;
  };

  type ResponseModelPolicyDocument = {
    code: string;
    data: PolicyDocument;
    err: string;
  };

  type ResponseModelRole = {
    code: string;
    data: Role;
    err: string;
  };

  type ResponseModelSecuritySettings = {
    code: string;
    data: SecuritySettings;
    err: string;
  };

  type ResponseModelServiceAccount = {
    code: string;
    data: ServiceAccount;
    err: string;
  };

  type ResponseModelServiceAccountAccessKey = {
    code: string;
    data: ServiceAccountAccessKey;
    err: string;
  };

  type ResponseModelSMTPSettings = {
    code: string;
    data: SMTPSettings;
    err: string;
  };

  type ResponseModelSystemSettings = {
    code: string;
    data: SystemSettings;
    err: string;
  };

  type ResponseModelUser = {
    code: string;
    data: User;
    err: string;
  };

  type ResponseServiceCharts = {
    code: string;
    data: Chart[][];
    err: string;
  };

  type ResponseServiceEnableMFAResponse = {
    code: string;
    data: EnableMFAResponse;
    err: string;
  };

  type ResponseServiceHealthResult = {
    code: string;
    data: HealthResult;
    err: string;
  };

  type ResponseServiceLoginResponse = {
    code: string;
    data: LoginResponse;
    err: string;
  };

  type ResponseServiceOAuthLoginURLResponse = {
    code: string;
    data: OAuthLoginURLResponse;
    err: string;
  };

  type ResponseServiceSiteConfig = {
    code: string;
    data: SiteConfig;
    err: string;
  };

  type ResponseServiceSystemInfo = {
    code: string;
    data: SystemInfo;
    err: string;
  };

  type ResponseServiceTestOAuthCallbackResponse = {
    code: string;
    data: TestOAuthCallbackResponse;
    err: string;
  };

  type ResponseString = {
    code: string;
    data: string;
    err: string;
  };

  type ResponseSystemapiCheckPasswordComplexityResponse = {
    code: string;
    data: CheckPasswordComplexityResponse;
    err: string;
  };

  type ResponseSystemapiLDAPSettings = {
    code: string;
    data: LDAPSettings;
    err: string;
  };

  type ResponseSystemapiSMTPTestResponse = {
    code: string;
    data: SMTPTestResponse;
    err: string;
  };

  type ResponseUtilMessageData = {
    code: string;
    data: MessageData;
    err: string;
  };

  type restoreUserParams = {
    /** User ID */
    id: string;
  };

  type Role = {
    created_at: string;
    description: string;
    id: string;
    name: string;
    permissions: Permission[];
    /** Permission configuration based on IAM-style policies, stored in JSON format */
    policy_document: PolicyDocument;
    updated_at: string;
  };

  type SecuritySettings = {
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
  };

  type ServiceAccount = {
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
  };

  type ServiceAccountAccessKey = {
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
  };

  type SessionInfo = {
    created_at: string;
    id: string;
    ip_address: string;
    is_current: boolean;
    last_active_at: string;
    location: string;
    user_agent: string;
  };

  type setRolePolicyParams = {
    /** Role ID */
    id: string;
  };

  type setServiceAccountPolicyParams = {
    /** Service account ID */
    id: string;
  };

  type SetServiceAccountPolicyRequest = {
    policy_document: PolicyDocument;
  };

  type SiteConfig = {
    disable_local_user_login: boolean;
    home_page: string;
    logo: string;
    menu: MenuConfig[];
    name: string;
    name_i18n: Record<string, any>;
    navigation: Navigation[];
  };

  type SMTPSettings = {
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
  };

  type SMTPTestRequest = {
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
  };

  type SMTPTestResponse = {
    message: string;
    success: boolean;
  };

  type StatementEntry = {
    /** List of actions, can contain wildcards "*" */
    Action: string[];
    /** Conditions */
    Condition: Record<string, any>;
    /** "Allow" or "Deny" */
    Effect: string;
    /** List of resources, can contain wildcards "*" */
    Resource: string[];
  };

  type SystemInfo = {
    cpu_cores: number;
    go_routines: number;
    go_version: string;
    heap_objects: number;
    mem_usage: number;
    role_count: number;
    total_mem: number;
    uptime: number;
    user_count: number;
  };

  type SystemSettings = {
    disable_local_user_login: boolean;
    home_page: string;
    logo: string;
    name: string;
    name_i18n: Record<string, any>;
  };

  type terminateSessionParams = {
    /** Session ID */
    id: string;
  };

  type TestOAuthCallbackResponse = {
    user: User;
    user_info: Record<string, any>;
  };

  type TokenResponse = {
    token: string;
  };

  type unlockUserParams = {
    /** User ID */
    id: string;
  };

  type UpdateCurrentUserRequest = {
    avatar: string;
    email: string;
    full_name: string;
    phone: string;
  };

  type UpdateLDAPSettingsRequest = {
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
  };

  type UpdateOAuthSettingsRequest = {
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
  };

  type updateRoleParams = {
    /** Role ID */
    id: string;
  };

  type UpdateRoleRequest = {
    description: string;
    name: string;
    permissions: string[];
    policy_document: PolicyDocument;
  };

  type updateServiceAccountAccessKeyParams = {
    /** Service account ID */
    id: string;
    /** Access key ID */
    keyId: string;
  };

  type UpdateServiceAccountAccessKeyRequest = {
    description: string;
    expires_at: string;
    name: string;
    status: "active" | "disabled";
  };

  type updateServiceAccountParams = {
    /** Service account ID */
    id: string;
  };

  type UpdateServiceAccountRequest = {
    description: string;
    name: string;
  };

  type updateServiceAccountStatusParams = {
    /** Service account ID */
    id: string;
  };

  type UpdateServiceAccountStatusRequest = {
    status: "active" | "disabled";
  };

  type updateUserParams = {
    /** User ID */
    id: string;
  };

  type UpdateUserRequest = {
    avatar?: string;
    email?: string;
    full_name?: string;
    ldap_dn?: string;
    mfa_enforced?: boolean;
    phone?: string;
    role_ids?: string[];
    source?: string;
    status?: string;
  };

  type updateUserStatusParams = {
    /** User ID */
    id: string;
  };

  type UpdateUserStatusRequest = {
    status: string;
  };

  type User = {
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
  };

  type UserSource = "local" | "ldap" | "oauth";

  type VerifyAndActivateMFARequest = {
    code: string;
    mfa_type: string;
    token?: string;
  };
}
