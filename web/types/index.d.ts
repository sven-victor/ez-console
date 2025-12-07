import { AvatarProps as AvatarProps_2 } from 'antd';
import { AxiosInstance } from 'axios';
import { AxiosRequestConfig } from 'axios';
import { ButtonProps } from 'antd';
import { ComponentType } from 'react';
import { default as default_2 } from 'react';
import { DropDownProps } from 'antd/es/dropdown';
import { default as i18n } from 'i18next';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { TableProps as TableProps_2 } from 'antd';
import { TabsProps } from 'antd';
import { UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';

/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare type AccessType = "public" | "private" | "owner";

declare interface Action extends ButtonProps {
    key: string;
    label?: string;
    permission?: string;
    icon?: React.ReactNode;
    tooltip?: string;
    onClick?: () => Promise<any>;
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

export declare interface addUserToOrganizationParams {
    /** Organization ID */
    id: string;
}

export declare interface AddUserToOrganizationRequest {
    role_ids: string[];
    user_id: string;
}

/**
 * Admin guard component - only admin can view content
 */
export declare const AdminGuard: default_2.FC<Omit<PermissionGuardProps, 'permission' | 'permissions' | 'checkAll'>>;

export declare const AIChat: default_2.FC;

export declare const AIChatButton: default_2.FC;

export declare interface AIChatMessage {
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

export declare type AIChatMessageMetadata = true;

export declare type AIChatMessageRole = "user" | "assistant" | "system" | "tool";

export declare type AIChatMessageStatus = "pending" | "streaming" | "completed" | "failed";

export declare const AIChatModal: default_2.FC;

export declare interface AIChatSession {
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

export declare const AIChatSider: default_2.FC;

declare interface AIContextType {
    layout: 'classic' | 'sidebar' | 'float-sidebar';
    setLayout: (layout: 'classic' | 'sidebar' | 'float-sidebar') => void;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    callAI: (message: string, messages?: API.SimpleChatMessage[]) => void;
    onCallAI: (callback: (message: string, messages?: API.SimpleChatMessage[]) => void) => void;
    loaded: boolean;
    setLoaded: (loaded: boolean) => void;
    fetchConversations: () => Promise<API.AIChatSession[]>;
    fetchConversationsLoading: boolean;
    conversations: API.AIChatSession[] | undefined;
    activeConversationKey: string | undefined;
    setActiveConversationKey: (key: string) => void;
}

export declare interface AIFunctionCall {
    arguments: string;
    name: string;
}

export declare interface AIModel {
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

export declare type AIModelProvider = "openai";

export declare type AIModelStatus = "enabled" | "disabled";

export declare interface AIToolCall {
    function: AIFunctionCall;
    id: string;
    index: number;
    type: string;
}

export declare interface AITypeDefinition {
    config_fields: ConfigField[];
    description: string;
    name: string;
    provider: AIModelProvider;
}

export declare const AllLangUIConfig: LanguageConfig[];

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
    listOrganizations(params: API.listOrganizationsParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelOrganization>;
    createOrganization(body: API.CreateOrganizationRequest, options?: {
        [key: string]: any;
    }): Promise<API.Organization>;
    getOrganization(params: API.getOrganizationParams, options?: {
        [key: string]: any;
    }): Promise<API.Organization>;
    updateOrganization(params: API.updateOrganizationParams, body: API.UpdateOrganizationRequest, options?: {
        [key: string]: any;
    }): Promise<API.Organization>;
    deleteOrganization(params: API.deleteOrganizationParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    listOrganizationUsers(params: API.listOrganizationUsersParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseServiceOrganizationUser>;
    addUserToOrganization(params: API.addUserToOrganizationParams, body: API.AddUserToOrganizationRequest, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    removeUserFromOrganization(params: API.removeUserFromOrganizationParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    updateUserOrganizationRoles(params: API.updateUserOrganizationRolesParams, body: API.UpdateUserOrganizationRolesRequest, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    getUserOrganizations(params: API.getUserOrganizationsParams, options?: {
        [key: string]: any;
    }): Promise<API.Organization[]>;
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
    listToolSets(params: API.listToolSetsParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelToolSet>;
    createToolSet(body: API.CreateToolSetRequest, options?: {
        [key: string]: any;
    }): Promise<API.ToolSet>;
    getToolSet(params: API.getToolSetParams, options?: {
        [key: string]: any;
    }): Promise<API.ToolSet>;
    updateToolSet(params: API.updateToolSetParams, body: API.UpdateToolSetRequest, options?: {
        [key: string]: any;
    }): Promise<API.ToolSet>;
    deleteToolSet(params: API.deleteToolSetParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    updateToolSetStatus(params: API.updateToolSetStatusParams, body: API.UpdateToolSetStatusRequest, options?: {
        [key: string]: any;
    }): Promise<API.ToolSet>;
    testToolSet(params: API.testToolSetParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    getToolSetTools(params: API.getToolSetToolsParams, options?: {
        [key: string]: any;
    }): Promise<API.Tool[]>;
    getToolSetTypeDefinitions(options?: {
        [key: string]: any;
    }): Promise<API.ToolSetTypeDefinition[]>;
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
    transformLangConfig?: (langs: LanguageConfig[]) => LanguageConfig[];
    menuStyle?: 'dark' | 'light';
    transformHeaderItems?: (items: default_2.ReactNode[]) => default_2.ReactNode[];
    renderLayout?: (siteIconUrl: string | null, menuItems: default_2.ReactNode[], headerItems: default_2.ReactNode[], breadcrumbs: ItemType[], content: default_2.ReactNode) => default_2.ReactNode;
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

declare interface AuthContextType {
    user: API.User | null | undefined;
    token: string | null;
    loading: boolean;
    login: (data: Partial<API.LoginRequest>) => Promise<API.User | void>;
    oauthLogin: (data: API.handleCallbackParams) => Promise<API.User | void>;
    logout: () => void;
    updateUser: (user: API.User) => void;
    error?: Error;
}

export declare const Avatar: ({ src, fallback, ...props }: AvatarProps) => JSX_2.Element;

export declare interface AvatarProps extends AvatarProps_2 {
    fallback?: default_2.ReactNode;
}

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

export declare interface ChatStreamEvent {
    content: string;
    event_type: EventType;
    message_id: string;
    role: AIChatMessageRole;
    tool_calls: ToolCall[];
}

export declare interface CheckPasswordComplexityRequest {
    password: string;
}

export declare interface CheckPasswordComplexityResponse {
    is_valid: boolean;
}

export declare const client: AxiosInstance;

export declare type Condition = true;

export declare interface ConfigField {
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

export declare interface ConfigFieldOptions {
    label: string;
    value: string;
}

export declare interface CreateAIModelRequest {
    config: Record<string, any>;
    description?: string;
    is_default?: boolean;
    name: string;
    provider: AIModelProvider;
}

export declare interface CreateChatSessionRequest {
    messages: SimpleChatMessage[];
    model_id: string;
    title: string;
}

export declare interface CreateOrganizationRequest {
    description?: string;
    name: string;
    status: string;
}

export declare interface CreateRoleRequest {
    ai_tool_permissions: RoleAIToolPermissionRequest[];
    description: string;
    name: string;
    organization_id: string;
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

export declare interface CreateToolSetRequest {
    config?: Record<string, any>;
    description?: string;
    name: string;
    type: ToolSetType;
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

export declare interface DataSource {
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

export declare type DataSourceType = "static" | "api" | "toolsets" | "internal";

export declare interface deleteAIModelParams {
    /** AI model ID */
    id: string;
}

export declare interface deleteChatSessionParams {
    /** Chat session ID */
    sessionId: string;
}

export declare interface deleteOrganizationParams {
    /** Organization ID */
    id: string;
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

export declare interface deleteToolSetParams {
    /** Toolset ID */
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
    trace_id: string;
}

export declare type EventType = "content" | "tool_call" | "error";

export declare function EZApp({ transformRouter, transformSettingTabs, transformLangConfig, extraPrivateRoutes, extraPublicRoutes, menuStyle, transformHeaderItems, renderLayout, }: EZAppProps): JSX_2.Element;

export declare interface EZAppProps {
    basePath?: string;
    transformRouter?: (routes: IRoute[]) => IRoute[];
    transformSettingTabs?: (items: TabsProps['items']) => TabsProps['items'];
    transformLangConfig?: (langs: LanguageConfig[]) => LanguageConfig[];
    extraPrivateRoutes?: IRoute[];
    extraPublicRoutes?: IRoute[];
    menuStyle?: 'dark' | 'light';
    transformHeaderItems?: (items: React.ReactNode[]) => React.ReactNode[];
    renderLayout?: (siteIconUrl: string | null, menuItems: React.ReactNode[], headerItems: React.ReactNode[], breadcrumbs: ItemType[], content: React.ReactNode) => React.ReactNode;
}

export declare function fetchSSE(url: string, config?: SSEConfig): Promise<ReadableStream<Uint8Array<ArrayBuffer>>>;

export declare type FieldType = "text" | "string" | "password" | "number" | "boolean" | "array" | "object" | "select";

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

export declare interface FunctionCall {
    /** call function with arguments in JSON format */
    arguments: string;
    name: string;
}

export declare interface FunctionDefinition {
    description: string;
    name: string;
    parameters: any;
    strict: boolean;
}

export declare interface generateChatSessionTitleParams {
    /** Chat session ID */
    sessionId: string;
}

export declare interface GenerateChatSessionTitleRequest {
    /** Optional: if provided, use this title; otherwise generate automatically */
    title: string;
}

export declare interface getAIModelParams {
    /** AI model ID */
    id: string;
}

export declare interface getAuditLogsParams {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
}

export declare interface getChatSessionParams {
    /** Chat session ID */
    sessionId: string;
}

export declare interface getCurrentUserLogsParams {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
}

/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare const getIconByName: (name: string) => ComponentType<    {}>;

export declare interface getLdapUsersParams {
    /** Skip existing users */
    skip_existing?: boolean;
}

export declare interface getLoginUrlParams {
    /** Provider */
    provider: string;
}

export declare interface getOrganizationParams {
    /** Organization ID */
    id: string;
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

export declare interface getToolSetParams {
    /** Toolset ID */
    id: string;
}

export declare interface getToolSetToolsParams {
    /** Toolset ID */
    id: string;
}

export declare interface getUserLogsParams {
    /** User ID */
    id: string;
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
}

export declare interface getUserOrganizationsParams {
    /** User ID */
    user_id: string;
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

/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare interface LabelCreaterProps {
    onChange: (name: string, value: string) => void;
}

declare interface LanguageConfig {
    lang: string;
    label: string;
    icon: string;
}

export declare const LanguageSwitch: default_2.FC<LanguageSwitchProps>;

export declare interface LanguageSwitchProps {
    transformLangConfig?: (langs: LanguageConfig[]) => LanguageConfig[];
}

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

export declare interface listAIModelsParams {
    /** Current page number */
    current?: number;
    /** Page size */
    page_size?: number;
    /** Search keyword */
    search?: string;
}

export declare interface listChatSessionsParams {
    /** Current page number */
    current?: number;
    /** Page size */
    page_size?: number;
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

export declare interface listOrganizationsParams {
    /** Current page */
    current?: number;
    /** Page size */
    page_size?: number;
    /** Search */
    search?: string;
}

export declare interface listOrganizationUsersParams {
    /** Organization ID */
    id: string;
    /** Current page */
    current?: number;
    /** Page size */
    page_size?: number;
    /** Search */
    search?: string;
}

declare type ListResult = {
    data: any;
    current: number;
    total: number;
    page_size: number;
};

export declare interface listRolesParams {
    /** Current page */
    current?: number;
    /** Page size */
    page_size?: number;
    /** Search */
    search?: string;
    /** Filter by organization ID (empty for global roles) */
    organization_id?: string;
}

export declare interface listToolSetsParams {
    /** Current page number */
    current?: number;
    /** Page size */
    page_size?: number;
    /** Toolset type */
    type?: string;
    /** Search keyword */
    search?: string;
    /** Include tool definitions in response */
    include_tools?: boolean;
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

export declare interface Organization {
    created_at: string;
    description: string;
    id: string;
    name: string;
    /** active, disabled */
    status: string;
    updated_at: string;
}

export declare interface OrganizationUser {
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

export declare interface PaginationResponseModelAIChatSession {
    code: string;
    current: number;
    data: AIChatSession[];
    page_size: number;
    total: number;
    trace_id: string;
}

export declare interface PaginationResponseModelAIModel {
    code: string;
    current: number;
    data: AIModel[];
    page_size: number;
    total: number;
    trace_id: string;
}

export declare interface PaginationResponseModelAuditLog {
    code: string;
    current: number;
    data: AuditLog[];
    page_size: number;
    total: number;
    trace_id: string;
}

export declare interface PaginationResponseModelFile {
    code: string;
    current: number;
    data: File_2[];
    page_size: number;
    total: number;
    trace_id: string;
}

export declare interface PaginationResponseModelOrganization {
    code: string;
    current: number;
    data: Organization[];
    page_size: number;
    total: number;
    trace_id: string;
}

export declare interface PaginationResponseModelRole {
    code: string;
    current: number;
    data: Role[];
    page_size: number;
    total: number;
    trace_id: string;
}

export declare interface PaginationResponseModelServiceAccount {
    code: string;
    current: number;
    data: ServiceAccount[];
    page_size: number;
    total: number;
    trace_id: string;
}

export declare interface PaginationResponseModelToolSet {
    code: string;
    current: number;
    data: ToolSet[];
    page_size: number;
    total: number;
    trace_id: string;
}

export declare interface PaginationResponseModelUser {
    code: string;
    current: number;
    data: User[];
    page_size: number;
    total: number;
    trace_id: string;
}

export declare interface PaginationResponseServiceOrganizationUser {
    code: string;
    current: number;
    data: OrganizationUser[];
    page_size: number;
    total: number;
    trace_id: string;
}

export declare type PasswordComplexity = "low" | "medium" | "high" | "very_high";

export declare interface Permission {
    code: string;
    created_at: string;
    description: string;
    id: string;
    name: string;
    /** OrgPermission indicates if this permission is organization-scoped */
    org_permission: boolean;
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

export declare interface removeUserFromOrganizationParams {
    /** Organization ID */
    id: string;
    /** User ID */
    user_id: string;
}

export declare function request<T extends any>(url: string, config: SSERequestConfig): Promise<ReadableStream<Uint8Array<ArrayBuffer>>>;

export declare function request<T extends {
    data: any;
    current?: number;
    total?: number;
    page_size?: number;
}>(url: string, config?: RequestConfig): Promise<Result<T>>;

declare interface RequestConfig extends AxiosRequestConfig {
    requestType?: 'form';
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
    trace_id: string;
}

export declare interface ResponseArrayModelFile {
    code: string;
    data: File_2[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayModelOrganization {
    code: string;
    data: Organization[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayModelPermissionGroup {
    code: string;
    data: PermissionGroup[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayModelServiceAccountAccessKey {
    code: string;
    data: ServiceAccountAccessKey[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayModelUser {
    code: string;
    data: User[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayServiceAITypeDefinition {
    code: string;
    data: AITypeDefinition[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayServiceSessionInfo {
    code: string;
    data: SessionInfo[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayServiceToolSetTypeDefinition {
    code: string;
    data: ToolSetTypeDefinition[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArraySystemapiTool {
    code: string;
    data: Tool[];
    err: string;
    trace_id: string;
}

export declare interface ResponseAuthorizationapiCreateServiceAccountAccessKeyResponse {
    code: string;
    data: CreateServiceAccountAccessKeyResponse;
    err: string;
    trace_id: string;
}

export declare interface ResponseAuthorizationapiResetUserPasswordResponse {
    code: string;
    data: ResetUserPasswordResponse;
    err: string;
    trace_id: string;
}

export declare interface ResponseAuthorizationapiTokenResponse {
    code: string;
    data: TokenResponse;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelAIChatSession {
    code: string;
    data: AIChatSession;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelAIModel {
    code: string;
    data: AIModel;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelLDAPTestResponse {
    code: string;
    data: LDAPTestResponse;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelOAuthSettings {
    code: string;
    data: OAuthSettings;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelOrganization {
    code: string;
    data: Organization;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelPolicyDocument {
    code: string;
    data: PolicyDocument;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelRole {
    code: string;
    data: Role;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelSecuritySettings {
    code: string;
    data: SecuritySettings;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelServiceAccount {
    code: string;
    data: ServiceAccount;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelServiceAccountAccessKey {
    code: string;
    data: ServiceAccountAccessKey;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelSMTPSettings {
    code: string;
    data: SMTPSettings;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelSystemSettings {
    code: string;
    data: SystemSettings;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelToolSet {
    code: string;
    data: ToolSet;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelUser {
    code: string;
    data: User;
    err: string;
    trace_id: string;
}

export declare interface ResponseServiceCharts {
    code: string;
    data: Chart[][];
    err: string;
    trace_id: string;
}

export declare interface ResponseServiceEnableMFAResponse {
    code: string;
    data: EnableMFAResponse;
    err: string;
    trace_id: string;
}

export declare interface ResponseServiceHealthResult {
    code: string;
    data: HealthResult;
    err: string;
    trace_id: string;
}

export declare interface ResponseServiceLoginResponse {
    code: string;
    data: LoginResponse;
    err: string;
    trace_id: string;
}

export declare interface ResponseServiceOAuthLoginURLResponse {
    code: string;
    data: OAuthLoginURLResponse;
    err: string;
    trace_id: string;
}

export declare interface ResponseServiceSiteConfig {
    code: string;
    data: SiteConfig;
    err: string;
    trace_id: string;
}

export declare interface ResponseServiceSystemInfo {
    code: string;
    data: SystemInfo;
    err: string;
    trace_id: string;
}

export declare interface ResponseServiceTestOAuthCallbackResponse {
    code: string;
    data: TestOAuthCallbackResponse;
    err: string;
    trace_id: string;
}

export declare interface ResponseString {
    code: string;
    data: string;
    err: string;
    trace_id: string;
}

export declare interface ResponseSystemapiCheckPasswordComplexityResponse {
    code: string;
    data: CheckPasswordComplexityResponse;
    err: string;
    trace_id: string;
}

export declare interface ResponseSystemapiLDAPSettings {
    code: string;
    data: LDAPSettings;
    err: string;
    trace_id: string;
}

export declare interface ResponseSystemapiSMTPTestResponse {
    code: string;
    data: SMTPTestResponse;
    err: string;
    trace_id: string;
}

export declare interface ResponseUtilMessageData {
    code: string;
    data: MessageData;
    err: string;
    trace_id: string;
}

export declare interface restoreUserParams {
    /** User ID */
    id: string;
}

declare type Result<T extends {
    data: any;
}> = T extends ListResult ? T : T["data"];

export declare interface Role {
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

export declare interface RoleAIToolPermission {
    created_at: string;
    id: string;
    organization_id: string;
    role_id: string;
    tool_name: string;
    toolset: ToolSet;
    toolset_id: string;
    updated_at: string;
}

export declare interface RoleAIToolPermissionRequest {
    tools: string[];
    toolset_id: string;
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

export declare interface SendMessageRequest {
    content: string;
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

export declare interface setDefaultAIModelParams {
    /** AI model ID */
    id: string;
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

export declare interface SimpleChatMessage {
    content: string;
    role: AIChatMessageRole;
}

export declare interface SiteConfig {
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

declare interface SiteContextType {
    siteConfig: API.SiteConfig | null;
    enableMultiOrg: boolean;
    loading: boolean;
    fetchSiteConfig: () => Promise<API.SiteConfig | null>;
    currentOrgId: string | null;
    setCurrentOrgId: (orgId: string) => void;
    clearCurrentOrgId: () => void;
    error?: Error;
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

declare interface SSEConfig extends RequestInit {
    signal?: AbortSignal;
}

declare interface SSERequestConfig extends Omit<RequestConfig, 'requestType' | 'signal'> {
    requestType: 'sse';
    signal?: AbortSignal;
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
    enable_multi_org: boolean;
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

export declare interface testAIModelParams {
    /** AI model ID */
    id: string;
}

export declare interface TestOAuthCallbackResponse {
    user: User;
    user_info: Record<string, any>;
}

export declare interface testToolSetParams {
    /** Toolset ID */
    id: string;
}

export declare interface TokenResponse {
    token: string;
}

export declare interface Tool {
    function: FunctionDefinition;
    type: string;
}

export declare interface ToolCall {
    function: FunctionCall;
    id: string;
    /** Index is not nil only in chat completion chunk object */
    index: number;
    start_time: string;
    status: ToolCallStatus;
    type: ToolType;
}

export declare type ToolCallStatus = "pending" | "running" | "completed" | "failed";

export declare interface ToolDefinition {
    description: string;
    name: string;
    parameters: any;
    strict: boolean;
    type: string;
}

export declare interface ToolSet {
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

export declare type ToolSetStatus = "enabled" | "disabled";

export declare type ToolSetType = "utils";

export declare interface ToolSetTypeDefinition {
    config_fields: ConfigField[];
    description: string;
    name: string;
    tool_set_type: ToolSetType;
}

export declare type ToolType = "function";

export declare interface unlockUserParams {
    /** User ID */
    id: string;
}

export declare interface updateAIModelParams {
    /** AI model ID */
    id: string;
}

export declare interface UpdateAIModelRequest {
    config?: Record<string, any>;
    description?: string;
    is_default?: boolean;
    name: string;
    provider: AIModelProvider;
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

export declare interface updateOrganizationParams {
    /** Organization ID */
    id: string;
}

export declare interface UpdateOrganizationRequest {
    description?: string;
    name: string;
    status: string;
}

export declare interface updateRoleParams {
    /** Role ID */
    id: string;
}

export declare interface UpdateRoleRequest {
    ai_tool_permissions: RoleAIToolPermissionRequest[];
    description: string;
    name: string;
    organization_id: string;
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

export declare interface updateToolSetParams {
    /** Toolset ID */
    id: string;
}

export declare interface UpdateToolSetRequest {
    config?: Record<string, any>;
    description?: string;
    name: string;
    status?: ToolSetStatus;
    type: ToolSetType;
}

export declare interface updateToolSetStatusParams {
    /** Toolset ID */
    id: string;
}

export declare interface UpdateToolSetStatusRequest {
    status: ToolSetStatus;
}

export declare interface updateUserOrganizationRolesParams {
    /** Organization ID */
    id: string;
    /** User ID */
    user_id: string;
}

export declare interface UpdateUserOrganizationRolesRequest {
    role_ids: string[];
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

export declare const useAI: () => AIContextType;

/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare const useAuth: () => AuthContextType;

/**
 * Permission Hook, used to check if the user has specific permissions
 *
 * Usage example:
 * const { hasPermission, hasAllPermissions, hasAnyPermission } = usePermission();
 *
 * if (hasPermission('authorization:user:create')) {
 *   // User has permission to create users
 * }
 */
export declare const usePermission: () => {
    hasPermission: (permission: string) => boolean;
    hasAllPermissions: (permissions: string[]) => boolean;
    hasAnyPermission: (permissions: string[]) => boolean;
    isAdmin: boolean;
    loading: boolean;
};

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
    organizations: Organization[];
    password_changed_at: string;
    phone: string;
    roles: Role[];
    source: UserSource;
    status: string;
    updated_at: string;
    username: string;
}

export declare type UserSource = "local" | "ldap" | "oauth";

export declare const useSite: () => SiteContextType;

export { useTranslation }

export declare interface VerifyAndActivateMFARequest {
    code: string;
    mfa_type: string;
    token?: string;
}

export declare interface VisibleCondition {
    /** Field is the name of the field to check */
    field: string;
    /** Operator is the comparison operator (eq, ne, in, not_in, contains) */
    operator: VisibleConditionOperator;
    /** Value is the value to compare against (can be a single value or array for in/not_in) */
    value: any;
}

export declare type VisibleConditionOperator = "eq" | "ne" | "in" | "not_in" | "contains";

export declare function withSuspense<T extends default_2.ComponentType<any>>(Component: default_2.LazyExoticComponent<T>, props?: default_2.ComponentProps<T>): JSX_2.Element;

export { }



declare module 'axios' {
  export interface AxiosRequestConfig {
    withoutAuth?: boolean;
  }
}