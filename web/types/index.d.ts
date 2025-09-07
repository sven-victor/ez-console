import { AvatarProps } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { ButtonProps } from 'antd';
import { ComponentType } from 'react';
import { default as default_2 } from 'react';
import { DropDownProps } from 'antd/es/dropdown';
import { default as i18n } from 'i18next';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { TableProps as TableProps_2 } from 'antd';
import { UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';

export declare type AccessType = "public" | "private" | "owner";

declare interface Action extends ButtonProps {
    key: string;
    permission?: string;
    icon?: React.ReactNode;
    tooltip?: string;
    onClick?: () => void;
    hidden?: boolean;
    confirm?: {
        title: string;
        onConfirm: () => void;
        okText?: string;
        cancelText?: string;
    };
}

export declare const Actions: ({ actions }: {
    actions: Action[];
}) => JSX_2.Element[];

/**
 * Admin guard component - only admin can view content
 */
export declare const AdminGuard: default_2.FC<Omit<PermissionGuardProps, 'permission' | 'permissions' | 'checkAll'>>;

export declare const AllLangUIConfig: {
    lang: string;
    label: string;
    icon: string;
}[];

export declare const api: {
    testLdapConnection(body: API.LDAPTestRequest, options?: {
        [key: string]: any;
    }): Promise<API.LDAPTestResponse>;
    getAuditLogs(params: API.getAuditLogsParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelAuditLog>;
    getSystemBaseSettings(options?: {
        [key: string]: any;
    }): Promise<API.SystemSettings>;
    updateSystemBaseSettings(body: API.SystemSettings, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    healthCheck(options?: {
        [key: string]: any;
    }): Promise<API.HealthResult>;
    getSystemInfo(options?: {
        [key: string]: any;
    }): Promise<API.SystemInfo>;
    getLdapSettings(options?: {
        [key: string]: any;
    }): Promise<API.LDAPSettings>;
    updateLdapSettings(body: API.UpdateLDAPSettingsRequest, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    importLdapUsers(body: API.ImportLDAPUsersRequest, options?: {
        [key: string]: any;
    }): Promise<API.User[]>;
    getOauthSettings(options?: {
        [key: string]: any;
    }): Promise<API.OAuthSettings>;
    updateOauthSettings(body: API.UpdateOAuthSettingsRequest, options?: {
        [key: string]: any;
    }): Promise<API.OAuthSettings>;
    testOauthConnection(options?: {
        [key: string]: any;
    }): Promise<API.OAuthLoginURLResponse>;
    testOauthCallback(options?: {
        [key: string]: any;
    }): Promise<API.TestOAuthCallbackResponse>;
    getSecuritySettings(options?: {
        [key: string]: any;
    }): Promise<API.SecuritySettings>;
    updateSecuritySettings(body: API.SecuritySettings, options?: {
        [key: string]: any;
    }): Promise<API.SecuritySettings>;
    checkPasswordComplexity(body: API.CheckPasswordComplexityRequest, options?: {
        [key: string]: any;
    }): Promise<API.CheckPasswordComplexityResponse>;
    getSiteConfig(options?: {
        [key: string]: any;
    }): Promise<API.SiteConfig>;
    getSmtpSettings(options?: {
        [key: string]: any;
    }): Promise<API.SMTPSettings>;
    updateSmtpSettings(body: API.SMTPSettings, options?: {
        [key: string]: any;
    }): Promise<API.SMTPSettings>;
    testSmtpConnection(body: API.SMTPTestRequest, options?: {
        [key: string]: any;
    }): Promise<API.SMTPTestResponse>;
    handleCallback(params: API.handleCallbackParams, options?: {
        [key: string]: any;
    }): Promise<API.LoginResponse>;
    getLoginUrl(params: API.getLoginUrlParams, options?: {
        [key: string]: any;
    }): Promise<API.OAuthLoginURLResponse>;
    getProviders(options?: {
        [key: string]: any;
    }): Promise<API.OAuthProvider[]>;
    listFiles(params: API.listFilesParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelFile>;
    uploadFile(body: {
        access?: string;
        type?: string;
    }, file?: File, options?: {
        [key: string]: any;
    }): Promise<API.File[]>;
    downloadFile(params: API.downloadFileParams, options?: {
        [key: string]: any;
    }): Promise<any>;
    getStatistics(options?: {
        [key: string]: any;
    }): Promise<API.Chart[][]>;
    login(body: API.LoginRequest, options?: {
        [key: string]: any;
    }): Promise<API.LoginResponse>;
    logout(options?: {
        [key: string]: any;
    }): Promise<string>;
    getLdapUsers(params: API.getLdapUsersParams, options?: {
        [key: string]: any;
    }): Promise<API.User[]>;
    disableMfa(options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    enableMfa(body: string, options?: {
        [key: string]: any;
    }): Promise<API.EnableMFAResponse>;
    verifyAndActivateMfa(body: API.VerifyAndActivateMFARequest, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    listPermissions(options?: {
        [key: string]: any;
    }): Promise<API.PermissionGroup[]>;
    getCurrentUser(options?: {
        [key: string]: any;
    }): Promise<API.User>;
    updateCurrentUser(body: API.UpdateCurrentUserRequest, options?: {
        [key: string]: any;
    }): Promise<API.User>;
    getCurrentUserLogs(params: API.getCurrentUserLogsParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelAuditLog>;
    changePassword(body: API.ChangePasswordRequest, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    getUserSessions(params: API.getUserSessionsParams, options?: {
        [key: string]: any;
    }): Promise<API.SessionInfo[]>;
    terminateSession(params: API.terminateSessionParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    terminateOtherSessions(options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    refreshToken(options?: {
        [key: string]: any;
    }): Promise<API.TokenResponse>;
    listRoles(params: API.listRolesParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelRole>;
    createRole(body: API.CreateRoleRequest, options?: {
        [key: string]: any;
    }): Promise<API.Role>;
    getRole(params: API.getRoleParams, options?: {
        [key: string]: any;
    }): Promise<API.Role>;
    updateRole(params: API.updateRoleParams, body: API.UpdateRoleRequest, options?: {
        [key: string]: any;
    }): Promise<API.Role>;
    deleteRole(params: API.deleteRoleParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    assignPermissions(params: API.assignPermissionsParams, body: API.AssignPermissionsRequest, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    getRolePolicy(params: API.getRolePolicyParams, options?: {
        [key: string]: any;
    }): Promise<API.PolicyDocument>;
    setRolePolicy(params: API.setRolePolicyParams, body: API.PolicyDocument, options?: {
        [key: string]: any;
    }): Promise<API.Role>;
    getServiceAccounts(params: API.getServiceAccountsParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelServiceAccount>;
    createServiceAccount(body: API.CreateServiceAccountRequest, options?: {
        [key: string]: any;
    }): Promise<API.ServiceAccount>;
    getServiceAccountById(params: API.getServiceAccountByIdParams, options?: {
        [key: string]: any;
    }): Promise<API.ServiceAccount>;
    updateServiceAccount(params: API.updateServiceAccountParams, body: API.UpdateServiceAccountRequest, options?: {
        [key: string]: any;
    }): Promise<API.ServiceAccount>;
    deleteServiceAccount(params: API.deleteServiceAccountParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    getServiceAccountAccessKeys(params: API.getServiceAccountAccessKeysParams, options?: {
        [key: string]: any;
    }): Promise<API.ServiceAccountAccessKey[]>;
    createServiceAccountAccessKey(params: API.createServiceAccountAccessKeyParams, body: API.CreateServiceAccountAccessKeyRequest, options?: {
        [key: string]: any;
    }): Promise<API.CreateServiceAccountAccessKeyResponse>;
    updateServiceAccountAccessKey(params: API.updateServiceAccountAccessKeyParams, body: API.UpdateServiceAccountAccessKeyRequest, options?: {
        [key: string]: any;
    }): Promise<API.ServiceAccountAccessKey>;
    deleteServiceAccountAccessKey(params: API.deleteServiceAccountAccessKeyParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    getServiceAccountPolicy(params: API.getServiceAccountPolicyParams, options?: {
        [key: string]: any;
    }): Promise<API.PolicyDocument>;
    setServiceAccountPolicy(params: API.setServiceAccountPolicyParams, body: API.SetServiceAccountPolicyRequest, options?: {
        [key: string]: any;
    }): Promise<API.ServiceAccount>;
    getServiceAccountRoles(params: API.getServiceAccountRolesParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelRole>;
    assignServiceAccountRoles(params: API.assignServiceAccountRolesParams, body: API.AssignServiceAccountRolesRequest, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelRole>;
    updateServiceAccountStatus(params: API.updateServiceAccountStatusParams, body: API.UpdateServiceAccountStatusRequest, options?: {
        [key: string]: any;
    }): Promise<API.ServiceAccount>;
    listUsers(params: API.listUsersParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelUser>;
    createUser(body: API.CreateUserRequest, options?: {
        [key: string]: any;
    }): Promise<API.User>;
    getUser(params: API.getUserParams, options?: {
        [key: string]: any;
    }): Promise<API.User>;
    updateUser(params: API.updateUserParams, body: API.UpdateUserRequest, options?: {
        [key: string]: any;
    }): Promise<API.User>;
    deleteUser(params: API.deleteUserParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    getUserLogs(params: API.getUserLogsParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelAuditLog>;
    resetUserPassword(params: API.resetUserPasswordParams, body: API.ResetUserPasswordRequest, options?: {
        [key: string]: any;
    }): Promise<API.ResetUserPasswordResponse>;
    restoreUser(params: API.restoreUserParams, options?: {
        [key: string]: any;
    }): Promise<string>;
    assignRoles(params: API.assignRolesParams, body: API.AssignRolesRequest, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    updateUserStatus(params: API.updateUserStatusParams, body: API.UpdateUserStatusRequest, options?: {
        [key: string]: any;
    }): Promise<API.User>;
    unlockUser(params: API.unlockUserParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
};

export declare const apiDelete: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;

export declare class ApiError extends Error {
    code: string;
    constructor(code: string, message: string);
}

export declare const apiGet: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;

export declare const apiPost: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;

export declare const apiPut: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;

export declare const AppLayout: default_2.FC<AppLayoutProps>;

export declare interface AppLayoutProps {
    routes: IRoute[];
    element?: default_2.ReactNode | null;
}

export declare interface assignPermissionsParams {
    /** Role ID */
    id: string;
}

export declare interface AssignPermissionsRequest {
    permission_ids: string[];
}

export declare interface assignRolesParams {
    /** User ID */
    id: string;
}

export declare interface AssignRolesRequest {
    role_ids: string[];
}

export declare interface assignServiceAccountRolesParams {
    /** Service account ID */
    id: string;
}

export declare interface AssignServiceAccountRolesRequest {
    role_ids: string[];
}

export declare interface AuditLog {
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

export declare interface AuditLogDetail {
    new_data: any;
    old_data: any;
    request: any;
}

export declare const Avatar: ({ src, ...props }: AvatarProps) => JSX_2.Element;

export { AvatarProps }

export declare const AvatarUpload: ({ value, onChange, shape, ...props }: AvatarUploadProps) => JSX_2.Element;

export declare interface AvatarUploadProps extends Omit<UploadProps, 'onChange'> {
    value?: string;
    onChange?: (value?: string) => void;
    shape?: 'circle' | 'square';
}

export declare interface ChangePasswordRequest {
    new_password: string;
    old_password: string;
}

export declare interface Chart {
    color: string;
    datasets: Dataset[];
    icon: string;
    labels: string[];
    title: string;
    value: number;
    width: number;
}

export declare interface CheckPasswordComplexityRequest {
    password: string;
}

export declare interface CheckPasswordComplexityResponse {
    is_valid: boolean;
}

export declare type Condition = true;

export declare interface CreateRoleRequest {
    description: string;
    name: string;
    permissions: string[];
    policy_document: PolicyDocument;
}

export declare interface createServiceAccountAccessKeyParams {
    /** Service account ID */
    id: string;
}

export declare interface CreateServiceAccountAccessKeyRequest {
    description: string;
    expires_at: string;
    name: string;
}

export declare interface CreateServiceAccountAccessKeyResponse {
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

export declare interface CreateServiceAccountRequest {
    description: string;
    name: string;
}

export declare interface CreateUserRequest {
    avatar?: string;
    email: string;
    full_name: string;
    mfa_enforced: boolean;
    password: string;
    phone?: string;
    role_ids: string[];
    username: string;
}

export declare interface Dataset {
    color: string;
    data: number[];
    label: string;
}

export declare interface deleteRoleParams {
    /** Role ID */
    id: string;
}

export declare interface deleteServiceAccountAccessKeyParams {
    /** Service account ID */
    id: string;
    /** Access key ID */
    keyId: string;
}

export declare interface deleteServiceAccountParams {
    /** Service account ID */
    id: string;
}

export declare interface deleteUserParams {
    /** User ID */
    id: string;
}

export declare interface downloadFileParams {
    /** File key */
    fileKey: string;
}

export declare type Duration = -9223372036854776000 | 9223372036854776000 | 1 | 1000 | 1000000 | 1000000000 | 60000000000 | 3600000000000;

export declare const DynamicIcon: ({ iconName }: DynamicIconProps) => JSX_2.Element | null;

export declare interface DynamicIconProps {
    iconName: string;
}

export declare interface EnableMFAResponse {
    qr_code: string;
    secret: string;
    token: string;
}

export declare interface ErrorResponse {
    code: string;
    err: any;
    message: string;
}

export declare function EZApp({ onRouteRender, }: EZAppProps): JSX_2.Element;

export declare interface EZAppProps {
    basePath?: string;
    onRouteRender?: (routes: IRoute[]) => IRoute[];
}

declare interface File_2 {
    access: AccessType;
    created_at: string;
    id: string;
    name: string;
    size: number;
    type: FileType;
    updated_at: string;
}
export { File_2 as File }

export declare type FileType = "image";

export declare const Forbidden: default_2.FC;

export declare interface getAuditLogsParams {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
}

export declare interface getCurrentUserLogsParams {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
}

export declare const getIconByName: (name: string) => ComponentType<    {}>;

export declare interface getLdapUsersParams {
    /** Skip existing users */
    skip_existing?: boolean;
}

export declare interface getLoginUrlParams {
    /** Provider */
    provider: string;
}

export declare interface getRoleParams {
    /** Role ID */
    id: string;
}

export declare interface getRolePolicyParams {
    /** Role ID */
    id: string;
}

export declare interface getServiceAccountAccessKeysParams {
    /** Service account ID */
    id: string;
}

export declare interface getServiceAccountByIdParams {
    /** Service account ID */
    id: string;
}

export declare interface getServiceAccountPolicyParams {
    /** Service account ID */
    id: string;
}

export declare interface getServiceAccountRolesParams {
    /** Service account ID */
    id: string;
}

export declare interface getServiceAccountsParams {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
    /** Search keyword */
    search?: string;
}

export declare interface getUserLogsParams {
    /** User ID */
    id: string;
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
}

export declare interface getUserParams {
    /** User ID */
    id: string;
}

export declare interface getUserSessionsParams {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
}

export declare interface handleCallbackParams {
    /** Code */
    code: string;
    /** State */
    state: string;
    /** Provider */
    provider: string;
}

export declare const HeaderDropdown: default_2.FC<HeaderDropdownProps>;

export declare type HeaderDropdownProps = {
    overlayClassName?: string;
    hidden?: boolean;
    overlay?: default_2.ReactNode | (() => default_2.ReactNode) | any;
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

export declare interface HealthResult {
    message: string;
    reason: string;
    status: string;
}

export { i18n }

export declare interface ImportLDAPUsersRequest {
    user_dn?: string[];
}

export declare type IRoute = IRouteItem | IRouteGroup;

export declare interface IRouteGroup {
    path?: string;
    element?: default_2.ReactNode;
    children: IRoute[];
    name?: string;
    icon?: default_2.ReactNode;
    is_private?: boolean;
    index?: false;
    permissions?: string[];
}

export declare interface IRouteItem {
    path?: string;
    element: default_2.ReactNode;
    name?: string;
    icon?: default_2.ReactNode;
    children?: undefined;
    is_private?: boolean;
    index: true;
    permissions?: string[];
}

export declare const LabelCreater: React.FC<LabelCreaterProps>;

export declare interface LabelCreaterProps {
    onChange: (name: string, value: string) => void;
}

export declare const LanguageSwitch: default_2.FC;

export declare interface LDAPSettings {
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

export declare interface LDAPTestMessage {
    message: string;
    success: boolean;
}

export declare interface LDAPTestRequest {
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

export declare interface LDAPTestResponse {
    message: LDAPTestMessage[];
    success: boolean;
    user: User;
}

export declare interface listFilesParams {
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

export declare interface listRolesParams {
    /** Current page */
    current?: number;
    /** Page size */
    page_size?: number;
    /** Search */
    search?: string;
}

export declare interface listUsersParams {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
    /** Keywords for searching */
    keywords?: string;
    /** Status of the user */
    status?: string;
}

export declare const Loading: default_2.FC;

export declare interface LoginRequest {
    mfa_code: string;
    mfa_token: string;
    password: string;
    username: string;
}

export declare interface LoginResponse {
    expires_at: string;
    mfa_token: string;
    mfa_type: string;
    needs_mfa: boolean;
    password_expired: boolean;
    token: string;
    user: User;
}

export declare interface MenuConfig {
    hide: boolean;
    icon: string;
    name: string;
    path: string;
}

export declare interface MessageData {
    message: string;
}

export declare interface Navigation {
    name: string;
    path: string;
}

export declare const NotFound: default_2.FC;

export declare interface OAuthLoginURLResponse {
    state: string;
    url: string;
}

export declare interface OAuthProvider {
    display_name: string;
    icon_url: string;
    name: string;
}

export declare type OAuthProviderType = "github" | "google" | "dingtalk" | "wechat" | "custom" | "autoDiscover";

export declare interface OAuthSettings {
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

export declare interface PaginationResponseModelAuditLog {
    code: string;
    current: number;
    data: AuditLog[];
    page_size: number;
    total: number;
}

export declare interface PaginationResponseModelFile {
    code: string;
    current: number;
    data: File_2[];
    page_size: number;
    total: number;
}

export declare interface PaginationResponseModelRole {
    code: string;
    current: number;
    data: Role[];
    page_size: number;
    total: number;
}

export declare interface PaginationResponseModelServiceAccount {
    code: string;
    current: number;
    data: ServiceAccount[];
    page_size: number;
    total: number;
}

export declare interface PaginationResponseModelUser {
    code: string;
    current: number;
    data: User[];
    page_size: number;
    total: number;
}

export declare type PasswordComplexity = "low" | "medium" | "high" | "very_high";

export declare interface Permission {
    code: string;
    created_at: string;
    description: string;
    id: string;
    name: string;
    updated_at: string;
}

export declare interface PermissionGroup {
    description: string;
    name: string;
    permissions: Permission[];
}

/**
 * Permission guard component - control the display of content based on user permissions
 *
 * @param permission single required permission code
 * @param permissions multiple required permission codes array
 * @param checkAll when providing multiple permissions, check all permissions (true) or any one permission (false, default)
 * @param fallback content to display when there is no permission
 * @param children content to display when there is permission
 */
export declare const PermissionGuard: default_2.FC<PermissionGuardProps>;

export declare interface PermissionGuardProps {
    permission?: string;
    permissions?: string[];
    checkAll?: boolean;
    fallback?: ReactNode;
    children: ReactNode;
}

export declare interface PolicyDocument {
    Statement: StatementEntry[];
}

/**
 * Private route component - protect routes that need authentication
 *
 * Usage example:
 * <PrivateRoute element={<ProtectedComponent />} />
 *
 * With permission control:
 * <PrivateRoute element={<UserListComponent />} requiredPermission="user:view" />
 */
export declare const PrivateRoute: default_2.FC<PrivateRouteProps>;

export declare interface PrivateRouteProps {
    element: default_2.ReactElement;
    requiredPermission?: string;
    requiredPermissions?: string[];
}

export declare interface resetUserPasswordParams {
    /** User ID */
    id: string;
}

export declare interface ResetUserPasswordRequest {
    password: string;
}

export declare interface ResetUserPasswordResponse {
    new_password: string;
}

export declare interface ResponseArrayAuthorizationapiOAuthProvider {
    code: string;
    data: OAuthProvider[];
    err: string;
}

export declare interface ResponseArrayModelFile {
    code: string;
    data: File_2[];
    err: string;
}

export declare interface ResponseArrayModelPermissionGroup {
    code: string;
    data: PermissionGroup[];
    err: string;
}

export declare interface ResponseArrayModelServiceAccountAccessKey {
    code: string;
    data: ServiceAccountAccessKey[];
    err: string;
}

export declare interface ResponseArrayModelUser {
    code: string;
    data: User[];
    err: string;
}

export declare interface ResponseArrayServiceSessionInfo {
    code: string;
    data: SessionInfo[];
    err: string;
}

export declare interface ResponseAuthorizationapiCreateServiceAccountAccessKeyResponse {
    code: string;
    data: CreateServiceAccountAccessKeyResponse;
    err: string;
}

export declare interface ResponseAuthorizationapiResetUserPasswordResponse {
    code: string;
    data: ResetUserPasswordResponse;
    err: string;
}

export declare interface ResponseAuthorizationapiTokenResponse {
    code: string;
    data: TokenResponse;
    err: string;
}

export declare interface ResponseModelLDAPTestResponse {
    code: string;
    data: LDAPTestResponse;
    err: string;
}

export declare interface ResponseModelOAuthSettings {
    code: string;
    data: OAuthSettings;
    err: string;
}

export declare interface ResponseModelPolicyDocument {
    code: string;
    data: PolicyDocument;
    err: string;
}

export declare interface ResponseModelRole {
    code: string;
    data: Role;
    err: string;
}

export declare interface ResponseModelSecuritySettings {
    code: string;
    data: SecuritySettings;
    err: string;
}

export declare interface ResponseModelServiceAccount {
    code: string;
    data: ServiceAccount;
    err: string;
}

export declare interface ResponseModelServiceAccountAccessKey {
    code: string;
    data: ServiceAccountAccessKey;
    err: string;
}

export declare interface ResponseModelSMTPSettings {
    code: string;
    data: SMTPSettings;
    err: string;
}

export declare interface ResponseModelSystemSettings {
    code: string;
    data: SystemSettings;
    err: string;
}

export declare interface ResponseModelUser {
    code: string;
    data: User;
    err: string;
}

export declare interface ResponseServiceCharts {
    code: string;
    data: Chart[][];
    err: string;
}

export declare interface ResponseServiceEnableMFAResponse {
    code: string;
    data: EnableMFAResponse;
    err: string;
}

export declare interface ResponseServiceHealthResult {
    code: string;
    data: HealthResult;
    err: string;
}

export declare interface ResponseServiceLoginResponse {
    code: string;
    data: LoginResponse;
    err: string;
}

export declare interface ResponseServiceOAuthLoginURLResponse {
    code: string;
    data: OAuthLoginURLResponse;
    err: string;
}

export declare interface ResponseServiceSiteConfig {
    code: string;
    data: SiteConfig;
    err: string;
}

export declare interface ResponseServiceSystemInfo {
    code: string;
    data: SystemInfo;
    err: string;
}

export declare interface ResponseServiceTestOAuthCallbackResponse {
    code: string;
    data: TestOAuthCallbackResponse;
    err: string;
}

export declare interface ResponseString {
    code: string;
    data: string;
    err: string;
}

export declare interface ResponseSystemapiCheckPasswordComplexityResponse {
    code: string;
    data: CheckPasswordComplexityResponse;
    err: string;
}

export declare interface ResponseSystemapiLDAPSettings {
    code: string;
    data: LDAPSettings;
    err: string;
}

export declare interface ResponseSystemapiSMTPTestResponse {
    code: string;
    data: SMTPTestResponse;
    err: string;
}

export declare interface ResponseUtilMessageData {
    code: string;
    data: MessageData;
    err: string;
}

export declare interface restoreUserParams {
    /** User ID */
    id: string;
}

export declare interface Role {
    created_at: string;
    description: string;
    id: string;
    name: string;
    permissions: Permission[];
    /** Permission configuration based on IAM-style policies, stored in JSON format */
    policy_document: PolicyDocument;
    updated_at: string;
}

export declare interface SecuritySettings {
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

export declare interface ServiceAccount {
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

export declare interface ServiceAccountAccessKey {
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

export declare interface SessionInfo {
    created_at: string;
    id: string;
    ip_address: string;
    is_current: boolean;
    last_active_at: string;
    location: string;
    user_agent: string;
}

export declare interface setRolePolicyParams {
    /** Role ID */
    id: string;
}

export declare interface setServiceAccountPolicyParams {
    /** Service account ID */
    id: string;
}

export declare interface SetServiceAccountPolicyRequest {
    policy_document: PolicyDocument;
}

export declare interface SiteConfig {
    disable_local_user_login: boolean;
    home_page: string;
    logo: string;
    menu: MenuConfig[];
    name: string;
    name_i18n: Record<string, any>;
    navigation: Navigation[];
}

export declare interface SMTPSettings {
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

export declare interface SMTPTestRequest {
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

export declare interface SMTPTestResponse {
    message: string;
    success: boolean;
}

export declare interface StatementEntry {
    /** List of actions, can contain wildcards "*" */
    Action: string[];
    /** Conditions */
    Condition: Record<string, any>;
    /** "Allow" or "Deny" */
    Effect: string;
    /** List of resources, can contain wildcards "*" */
    Resource: string[];
}

export declare interface SystemInfo {
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

export declare interface SystemSettings {
    disable_local_user_login: boolean;
    home_page: string;
    logo: string;
    name: string;
    name_i18n: Record<string, any>;
}

export declare const Table: <T extends API.Entity>({ actionRef, ...props }: TableActionRefProps<T>) => JSX_2.Element | null;

export declare interface TableActionRefProps<T extends API.Entity> extends TableProps<T> {
    actionRef?: default_2.LegacyRef<TableRef<T>>;
}

export declare interface TableProps<T extends API.Entity> extends TableProps_2<T> {
    request: (params: API.PaginationRequest) => Promise<API.PaginationResponse<T>>;
    tableRef?: default_2.LegacyRef<{
        nativeElement: HTMLDivElement;
        scrollTo: (config: {
            index?: number;
            key?: default_2.Key;
            top?: number;
        }) => void;
    }>;
    ref?: default_2.LegacyRef<TableRef<T>>;
}

declare interface TableRef<T extends API.Entity> extends TableProps_2<T> {
    reload: () => void;
}

export declare interface TableRefProps<T extends API.Entity> extends TableProps<T> {
    ref?: default_2.LegacyRef<TableRef<T>>;
}

export declare interface terminateSessionParams {
    /** Session ID */
    id: string;
}

export declare interface TestOAuthCallbackResponse {
    user: User;
    user_info: Record<string, any>;
}

export declare interface TokenResponse {
    token: string;
}

export declare interface unlockUserParams {
    /** User ID */
    id: string;
}

export declare interface UpdateCurrentUserRequest {
    avatar: string;
    email: string;
    full_name: string;
    phone: string;
}

export declare interface UpdateLDAPSettingsRequest {
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

export declare interface UpdateOAuthSettingsRequest {
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

export declare interface updateRoleParams {
    /** Role ID */
    id: string;
}

export declare interface UpdateRoleRequest {
    description: string;
    name: string;
    permissions: string[];
    policy_document: PolicyDocument;
}

export declare interface updateServiceAccountAccessKeyParams {
    /** Service account ID */
    id: string;
    /** Access key ID */
    keyId: string;
}

export declare interface UpdateServiceAccountAccessKeyRequest {
    description: string;
    expires_at: string;
    name: string;
    status: "active" | "disabled";
}

export declare interface updateServiceAccountParams {
    /** Service account ID */
    id: string;
}

export declare interface UpdateServiceAccountRequest {
    description: string;
    name: string;
}

export declare interface updateServiceAccountStatusParams {
    /** Service account ID */
    id: string;
}

export declare interface UpdateServiceAccountStatusRequest {
    status: "active" | "disabled";
}

export declare interface updateUserParams {
    /** User ID */
    id: string;
}

export declare interface UpdateUserRequest {
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

export declare interface updateUserStatusParams {
    /** User ID */
    id: string;
}

export declare interface UpdateUserStatusRequest {
    status: string;
}

export declare interface User {
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

export declare type UserSource = "local" | "ldap" | "oauth";

export { useTranslation }

export declare interface VerifyAndActivateMFARequest {
    code: string;
    mfa_type: string;
    token?: string;
}

export declare const withSuspense: (Component: default_2.LazyExoticComponent<default_2.ComponentClass<any> | default_2.FC<any>>) => JSX_2.Element;

export { }



declare module 'axios' {
  export interface AxiosRequestConfig {
    withoutAuth?: boolean;
  }
}