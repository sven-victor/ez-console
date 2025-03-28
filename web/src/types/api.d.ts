namespace API {
  export interface Entity {
    id: string;
    created_at: string;
    updated_at: string;
  }

  export interface BaseResponse<T> {
    code: string;
    data: T;
    err?: string;
  }

  export interface PaginationResponse<T extends Entity> extends BaseResponse<T[]> {
    total: number;
    current: number;
    page_size: number;
  }

  export interface PaginationRequest {
    current: number;
    page_size: number;
  }

  type ChartRow = Chart[];
  export type Charts = ChartRow[];
  export interface Statistic {
    title: string;
    value: number;
    color: string;
    icon: string;
  }
  export type Chart = { width: number; } & (Statistic | { labels: string[]; datasets: Dataset[]; })
  export interface Dataset {
    label: string;
    data: number[];
    color: string;
  }
  export interface FileItem {
    id: string;
    name: string;
    size: number;
    created_at: string;
    updated_at: string;
  }


  export interface ApiResponse<T> {
    code: string;
    data: T;
    err?: string;
    total?: number;
    current?: number;
    pageSize?: number;
  }

  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    current: number;
    pageSize: number;
  }


  // Security settings interface type
  export interface SecuritySettings {
    mfa_enforced: boolean;
    password_complexity: 'low' | 'medium' | 'high' | 'very_high';
    password_min_length: number;
    password_expiry_days: number;
    login_failure_lock: boolean;
    login_failure_attempts: number;
    history_password_check: boolean;
    history_password_count: number;
    inactive_account_lock_days: number;
    session_timeout_minutes: number;
  }

  // OAuth settings interface type
  export interface OAuthSettings {
    enabled: boolean;
    provider: string;
    client_id: string;
    client_secret: string;
    auth_endpoint: string;
    token_endpoint: string;
    userinfo_endpoint: string;
    scope: string;
    redirect_uri: string;
    auto_create_user: boolean;
    default_role: string;
  }

  // LDAP settings related interfaces
  export interface LDAPSettings {
    enabled: boolean;
    server_url: string;
    bind_dn: string;
    bind_password: string;
    base_dn: string;
    user_filter: string;
    user_attr: string;
    email_attr: string;
    display_name_attr: string;
    auto_create_user: boolean;
    default_role: string;
    ca_cert: string;
    client_cert: string;
    client_key: string;
    insecure: boolean;
  }

  export interface SystemBaseSettings {
    name: string;
    name_i18n: Record<string, string>;
    logo: string;
  }

  export interface SiteConfig {
    logo: string;
    name: string;
    name_i18n: Record<string, string>;
    navigation: Navigation[];
    menu: MenuConfig[];
  }

  export interface MenuConfig {
    name: string;
    path: string;
    icon: string;
    hidden: boolean;
  }

  export interface Navigation {
    name: string;
    path: string;
  }

  export interface User {
    id: string;
    username: string;
    email: string;
    full_name: string;
    phone?: string;
    avatar?: string;
    status: string;
    last_login?: string;
    created_at: string;
    updated_at: string;
    roles?: Role[];
    permissions?: string[];
    mfa_enabled: boolean;
    mfa_enforced: boolean;
    oauth_provider?: string;
    oauth_id?: string;
    source?: string;
    ldap_dn?: string;
  }

  export interface PolicyDocument {
    Statement: {
      Effect: string;
      Action: string[];
      Resource: string[];
      Condition?: Record<string, any>;
    }[];
  }

  export interface Role {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    permissions?: Permission[];
    policy_document?: PolicyDocument;
  }

  export type LoginRequest = {
    username: string;
    password: string;
  } | {
    mfa_code: string;
    mfa_token: string;
  }

  export interface LoginResponse {
    token: string;
    user: User;
    needs_mfa?: boolean;
    mfa_type?: string;
    password_expired?: boolean;
    expires_at: string;
    mfa_token?: string;
  }

  export interface CreateUserRequest {
    username: string;
    password: string;
    avatar?: string;
    email: string;
    full_name: string;
    role_ids: string[];
    mfa_enforced: boolean;
  }

  export interface UpdateUserRequest {
    email?: string;
    full_name?: string;
    avatar?: string;
    status?: 'active' | 'disabled';
    role_ids?: string[];
    mfa_enforced?: boolean;
    source?: string;
    ldap_dn?: string;
  }

  export interface ChangePasswordRequest {
    old_password: string;
    new_password: string;
  }

  export interface UserQueryParams {
    keywords?: string;
    status?: 'active' | 'inactive';
    current?: number;
    page_size?: number;
  }

  export interface PermissionGroup {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
  }

  export interface Permission {
    id: string;
    code: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  }

  export interface CreateRoleRequest {
    name: string;
    description: string;
    permissions: string[];
  }

  export interface UpdateRoleRequest {
    name?: string;
    description?: string;
    permissions?: string[];
  }

  export interface OAuthProvider {
    name: string;
    display_name: string;
    icon_url: string;
  }

  export interface OAuthConfigResponse {
    enabled: boolean;
    allow_registration: boolean;
    providers: OAuthProviderResponse[];
  }

  export interface OAuthProviderResponse {
    name: string;
    display_name: string;
    enabled: boolean;
    client_id: string;
  }

  export interface OAuthLoginURLResponse {
    url: string;
  }

  export interface OAuthCallbackRequest {
    provider: string;
    code: string;
    state?: string;
  }

  export interface MFAVerifyRequest {
    code: string;
    mfa_type: string;
    token?: string;
  }

  export interface AuditLog {
    id: string;
    user_id: string;
    username: string;
    action: string;
    action_name: string;
    ref_id: string;
    details: string;
    ip: string;
    user_agent: string;
    status: string;
    timestamp: string;
    created_at: string;
    updated_at: string;
  }
  export interface AuditLogFilters {
    user_id?: string;
    username?: string;
    action?: string;
    resource?: string;
    resource_id?: string;
    status?: string;
    start_time?: string;
    end_time?: string;
    search?: string;
  }


  // Service account related type definitions
  export interface ServiceAccount {
    id: string;
    name: string;
    description: string;
    status: string; // 'active' | 'disabled'
    last_access: string;
    created_at: string;
    updated_at: string;
    policy_document?: PolicyDocument;
    roles?: Role[];
  }

  export interface ServiceAccountAccessKey {
    id: string;
    name: string;
    service_account_id: string;
    access_key_id: string;
    secret_access_key?: string;
    status: string; // 'active' | 'inactive'
    description: string;
    last_used: string;
    expires_at: string;
    created_at: string;
    updated_at: string;
  }

  export interface CreateServiceAccountRequest {
    name: string;
    description: string;
    role_ids?: string[];
    policy_document?: PolicyDocument;
  }

  export interface UpdateServiceAccountRequest {
    name: string;
    description: string;
    status?: string;
  }

  export interface CreateServiceAccountAccessKeyRequest {
    name: string;
    description?: string;
    expires_at?: number;
  }

  export interface UpdateServiceAccountAccessKeyRequest {
    name: string;
    status: 'active' | 'disabled';
    description?: string;
    expires_at?: string;
  }

  export interface ServiceAccountRoleAssignmentRequest {
    role_ids: string[];
  }

  export interface ServiceAccountPolicyRequest {
    policy_document: PolicyDocument;
  }

  export interface ServiceRoleAssignmentRequest {
    role_ids: string[];
  }
  export interface LDAPSettings {
    enabled: boolean;
    server_url: string;
    bind_dn: string;
    bind_password: string;
    base_dn: string;
    user_filter: string;
    user_attr: string;
    email_attr: string;
    display_name_attr: string;
    auto_create_user: boolean;
    default_role: string;
    start_tls: boolean;
    insecure: boolean;
    ca_cert: string;
    client_cert: string;
    client_key: string;
  }

  export interface LDAPTestRequest extends LDAPSettings {
    username: string;
    password: string;
  }

  export interface LDAPTestResponse {
    success: boolean;
    message?: {
      success: boolean;
      message: string;
    }[];
    user?: API.User;
  }

  export interface ImportLDAPUsersRequest {
    user_dn?: string[];
  }

  export interface ImportLDAPUsersResponse {
    username: string;
    email: string;
    full_name: string;
    id: string;
    create_time: string;
    modify_time: string;
    ldap_dn: string;
    imported: boolean;
  }
  export interface SMTPSettings {
    enabled: boolean;
    host: string;
    port: number;
    username: string;
    password?: string;
    encryption: 'None' | 'SSL/TLS' | 'STARTTLS';
    from_address: string;
    from_name?: string;
  }

  export interface SMTPTestRequest extends SMTPSettings {
    to: string;
  }

  export interface SMTPTestResponse {
    message: string;
    success: boolean;
  }
}
