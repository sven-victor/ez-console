import { AvatarProps as AvatarProps_2 } from 'antd';
import { AxiosInstance } from 'axios';
import { AxiosRequestConfig } from 'axios';
import { AxiosResponse } from 'axios';
import { ButtonProps } from 'antd';
import { ComponentProps } from '@ant-design/x-markdown';
import { ComponentType } from 'react';
import { default as default_2 } from 'react';
import { DropDownProps } from 'antd/es/dropdown';
import { FormItemProps } from 'antd';
import { default as i18n } from 'i18next';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { MessageInfo } from '@ant-design/x-sdk';
import { MessageStatus } from '@ant-design/x-sdk/es/x-chat';
import { Popconfirm } from 'antd';
import { ReactNode } from 'react';
import { RJSFSchema } from '@rjsf/utils/lib';
import { StrictRJSFSchema } from '@rjsf/utils';
import { TableProps as TableProps_2 } from 'antd';
import { TabsProps } from 'antd';
import { UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { XMarkdown } from '@ant-design/x-markdown';
import { XMarkdownProps } from '@ant-design/x-markdown';

export declare type AccessType = "public" | "private" | "owner";

export declare interface ActionProps extends ButtonProps {
    key: string;
    label?: React.ReactNode;
    permission?: string;
    icon?: React.ReactNode;
    tooltip?: React.ReactNode;
    onClick?: () => Promise<any>;
    hidden?: boolean;
    confirm?: {
        title: React.ReactNode;
        description?: React.ReactNode;
        onConfirm: () => void;
        okText?: React.ComponentProps<typeof Popconfirm>['okText'];
        cancelText?: React.ComponentProps<typeof Popconfirm>['cancelText'];
    };
}

export declare const Actions: React.FC<ActionsProps>;

declare interface ActionsProps {
    actions: ActionProps[];
    maxVisibleItems?: number;
}

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

export declare const AIChat: default_2.FC<AIChatProps>;

export declare const AIChatButton: default_2.FC;

export declare interface AIChatMessage {
    /** Message content */
    content: string;
    created_at: string;
    id: string;
    /** Generated summary message; hidden from frontend display */
    is_summary: boolean;
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
    /** Superseded by a summary; excluded from future AI conversations */
    summarized: boolean;
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

export declare type AIChatMessageRole = "user" | "assistant" | "system" | "tool" | "prompt";

export declare type AIChatMessageStatus = "pending" | "streaming" | "completed" | "failed";

export declare const AIChatModal: default_2.FC<AIChatProps>;

export declare interface AIChatProps {
    bubble?: {
        contentRender?: (content: string) => default_2.ReactNode;
        footerRender?: (message: MessageInfo<ChatStreamMessage>) => default_2.ReactNode;
        components?: XMarkdownProps['components'];
    };
}

export declare interface AIChatSession {
    /** Estimated tokens for unsummarized messages (next LLM input) */
    active_tokens: number;
    /** Whether the session is anonymous */
    anonymous: boolean;
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
    /** Cumulative completion tokens across all API calls */
    total_completion_tokens: number;
    /** Cumulative prompt tokens across all API calls */
    total_prompt_tokens: number;
    updated_at: string;
    /** User ID */
    user_id: string;
}

export declare const AIChatSider: default_2.FC<AIChatProps>;

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
    ephemeralSystemPrompts: string[];
    clientTools: RegisteredClientTool[];
    registerPageAI: (opts: PageAIOptions) => () => void;
    resetPageAIContext: () => void;
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
    /** Max tool-call iterations; 0 uses client default */
    max_chat_iterations: number;
    /** Context window for auto-summarization; 0 uses config fallback only */
    max_chat_tokens: number;
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

export declare interface AITraceEvent {
    content: string;
    created_at: string;
    duration_ms: number;
    event_type: AITraceEventType;
    id: string;
    step_order: number;
    trace_id: string;
    updated_at: string;
}

export declare type AITraceEventType = "llm_request" | "llm_response" | "token_usage" | "tool_call" | "tool_result" | "error" | "summary";

export declare interface AITypeDefinition {
    config_schema: Schema;
    description: string;
    name: string;
    provider: AIModelProvider;
    ui_schema: Record<string, any>;
}

export declare const AllLangUIConfig: LanguageConfig[];

export declare const api: {
    listTaskSchedules(options?: {
        [key: string]: any;
    }): Promise<API.ScheduledJobState[]>;
    getTaskScheduleHistory(params: API.getTaskScheduleHistoryParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelTask>;
    toggleTaskSchedule(params: API.toggleTaskScheduleParams, body: Record<string, any>, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    triggerTaskSchedule(params: API.triggerTaskScheduleParams, options?: {
        [key: string]: any;
    }): Promise<API.Task>;
    listTasks(params: API.listTasksParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelTask>;
    getTask(params: API.getTaskParams, options?: {
        [key: string]: any;
    }): Promise<API.Task>;
    deleteTask(params: API.deleteTaskParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    cancelTask(params: API.cancelTaskParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    getTaskLogs(params: API.getTaskLogsParams, options?: {
        [key: string]: any;
    }): Promise<API.TaskLog[]>;
    retryTask(params: API.retryTaskParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    listUserTasks(options?: {
        [key: string]: any;
    }): Promise<API.Task[]>;
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
    testOauthConnection(body: API.UpdateOAuthSettingsRequest, options?: {
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
    listSkills(params: API.listSkillsParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelSkill>;
    createSkill(body: API.CreateSkillRequest, options?: {
        [key: string]: any;
    }): Promise<API.Skill>;
    getSkill(params: API.getSkillParams, options?: {
        [key: string]: any;
    }): Promise<API.Skill>;
    updateSkill(params: API.updateSkillParams, body: API.UpdateSkillRequest, options?: {
        [key: string]: any;
    }): Promise<API.Skill>;
    deleteSkill(params: API.deleteSkillParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    listSkillAiToolBindings(params: API.listSkillAIToolBindingsParams, options?: {
        [key: string]: any;
    }): Promise<API.PaginationResponseModelSkillAIToolBinding>;
    replaceSkillAiToolBindings(params: API.replaceSkillAIToolBindingsParams, body: API.ReplaceSkillAIToolBindingsRequest, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    createSkillDir(params: API.createSkillDirParams, body: API.CreateSkillDirRequest, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    listSkillFilesTree(params: API.listSkillFilesTreeParams, options?: {
        [key: string]: any;
    }): Promise<API.SkillTreeNode[]>;
    getSkillFile(params: API.getSkillFileParams, options?: {
        [key: string]: any;
    }): Promise<any>;
    putSkillFile(params: API.putSkillFileParams, body: string, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    deleteSkillPath(params: API.deleteSkillPathParams, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    moveSkillPath(params: API.moveSkillPathParams, body: API.MoveSkillPathRequest, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    previewSkill(params: API.previewSkillParams, options?: {
        [key: string]: any;
    }): Promise<API.SkillFilePreview[]>;
    updateSkillStatus(params: API.updateSkillStatusParams, body: API.UpdateSkillStatusRequest, options?: {
        [key: string]: any;
    }): Promise<API.Skill>;
    cloneSkill(body: API.CloneSkillRequest, options?: {
        [key: string]: any;
    }): Promise<API.Skill>;
    listSkillDomains(options?: {
        [key: string]: any;
    }): Promise<string[]>;
    uploadSkill(body: {
        category?: string;
        domain?: string;
    }, file?: File, options?: {
        [key: string]: any;
    }): Promise<API.Skill>;
    getSmtpSettings(options?: {
        [key: string]: any;
    }): Promise<API.SMTPSettings>;
    updateSmtpSettings(body: API.SMTPSettings, options?: {
        [key: string]: any;
    }): Promise<API.SMTPSettings>;
    testSmtpConnection(body: API.SMTPTestRequest, options?: {
        [key: string]: any;
    }): Promise<API.SMTPTestResponse>;
    getTaskSettings(options?: {
        [key: string]: any;
    }): Promise<API.TaskSettings>;
    updateTaskSettings(body: API.TaskSettings, options?: {
        [key: string]: any;
    }): Promise<API.MessageData>;
    listLogStorageBackends(options?: {
        [key: string]: any;
    }): Promise<API.LogStorageBackendOption[]>;
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
    handleCallback(body: API.OAuthCallbackRequest, options?: {
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
    createUserExportTask(body: API.CreateUserExportTaskRequest, options?: {
        [key: string]: any;
    }): Promise<API.Task>;
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
    siderWidth?: number;
    routes: IRoute[];
    element?: default_2.ReactNode | null;
    transformLangConfig?: (langs: LanguageConfig[]) => LanguageConfig[];
    menuStyle?: 'dark' | 'light';
    transformHeaderItems?: (items: default_2.ReactNode[]) => default_2.ReactNode[];
    renderLayout?: (siteIconUrl: string | null, menuItems: default_2.ReactNode[], headerItems: default_2.ReactNode[], breadcrumbs: ItemType[], content: default_2.ReactNode) => default_2.ReactNode;
    aiChatProps?: AIChatProps;
}

declare interface ArrayBufferRequestConfig extends Omit<RequestConfig, 'responseType'> {
    responseType: 'arraybuffer';
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
    loading: boolean;
    login: (data: Partial<API.LoginRequest>) => Promise<API.User | void>;
    oauthLogin: (data: API.OAuthCallbackRequest) => Promise<API.User | void>;
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

declare interface BlobRequestConfig extends Omit<RequestConfig, 'responseType'> {
    responseType: 'blob';
}

export declare interface cancelTaskParams {
    /** Task ID (UUID) */
    id: string;
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
    client_tool_calls: ClientToolPendingCall[];
    content: string;
    event_type: EventType;
    message_id: string;
    role: AIChatMessageRole;
    tool_calls: ToolCall[];
    usage: TokenUsage;
}

declare interface ChatStreamMessage extends Pick<API.ChatStreamEvent, 'content' | 'role'> {
    error?: string;
    pendingClientToolCalls?: ClientToolPendingCall_2[];
    messageId?: string;
    status?: MessageStatus;
}

export declare interface CheckPasswordComplexityRequest {
    password: string;
}

export declare interface CheckPasswordComplexityResponse {
    is_valid: boolean;
}

export declare const client: AxiosInstance;

export declare interface ClientToolDefinition {
    description: string;
    name: string;
    parameters: any;
}

export declare type ClientToolHandler = (argsJson: string) => Promise<string> | string;

export declare interface ClientToolPendingCall {
    arguments: string;
    id: string;
    name: string;
}

declare interface ClientToolPendingCall_2 {
    id: string;
    name: string;
    arguments: string;
}

export declare interface ClientToolResult {
    content: string;
    tool_call_id: string;
}

export declare interface CloneSkillRequest {
    category: string;
    description: string;
    domain: string;
    name: string;
    source_id: string;
}

export declare type Condition = true;

export declare interface CreateAIModelRequest {
    config: Record<string, any>;
    description?: string;
    is_default?: boolean;
    max_chat_iterations?: number;
    max_chat_tokens?: number;
    name: string;
    provider: AIModelProvider;
}

export declare interface CreateChatSessionRequest {
    anonymous: boolean;
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
    organization_id?: string;
}

export declare interface createSkillDirParams {
    /** Skill ID */
    id: string;
}

export declare interface CreateSkillDirRequest {
    path: string;
}

export declare interface CreateSkillRequest {
    category: string;
    /** optional initial SKILL.md content */
    content: string;
    description: string;
    domain: string;
    name: string;
}

export declare interface CreateToolSetRequest {
    config?: Record<string, any>;
    description?: string;
    name: string;
    type: ToolSetType;
}

export declare interface CreateUserExportTaskRequest {
    keywords?: string;
    status?: string;
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

export declare type Definitions = true;

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

export declare interface deleteSkillParams {
    /** Skill ID */
    id: string;
}

export declare interface deleteSkillPathParams {
    /** Skill ID */
    id: string;
    /** File or directory path */
    path: string;
}

export declare interface deleteTaskParams {
    /** Task ID (UUID) */
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

export declare interface downloadAITraceEventsParams {
    /** Trace ID */
    trace_id: string;
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

export declare type EventType = "content" | "tool_call" | "error" | "client_tool_pending";

export declare function EZApp({ transformRouter, transformSettingTabs, transformLangConfig, extraPrivateRoutes, extraPublicRoutes, menuStyle, transformHeaderItems, renderLayout, aiChatProps, }: EZAppProps): JSX_2.Element;

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
    aiChatProps?: AIChatProps;
}

export declare function fetchSSE(url: string, config?: SSEConfig): Promise<ReadableStream<Uint8Array<ArrayBuffer>>>;

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

export declare type FileType = "image" | "export";

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

export declare interface getAITraceEventsParams {
    /** Trace ID */
    trace_id: string;
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
    /** Filter by organization ID (empty for global service accounts) */
    organization_id?: string;
}

export declare interface getSkillFileParams {
    /** Skill ID */
    id: string;
    /** File path (e.g. SKILL.md or docs/readme.md) */
    path: string;
}

export declare interface getSkillParams {
    /** Skill ID */
    id: string;
}

export declare interface getTaskLogsParams {
    /** Task ID (UUID) */
    id: string;
}

export declare interface getTaskParams {
    /** Task ID (UUID) */
    id: string;
}

export declare interface getTaskScheduleHistoryParams {
    /** Schedule ID */
    id: string;
    /** Page number */
    current?: number;
    /** Page size */
    page_size?: number;
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

export declare type ID = "";

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
    hideInMenu?: boolean;
}

export declare interface IRouteItem {
    path?: string;
    element: default_2.ReactNode;
    name?: string;
    icon?: default_2.ReactNode;
    is_private?: boolean;
    index: boolean;
    permissions?: string[];
    hideInMenu?: boolean;
}

/**
 * Renders a form from a JSON Schema. Use inside Ant Design Form with
 * Form.Item name={['config']} so value/onChange are provided by the parent form.
 */
export declare const JsonSchemaConfigForm: default_2.FC<JsonSchemaConfigFormProps>;

export declare const JsonSchemaConfigFormItem: ({ schema, uiSchema, ...props }: JsonSchemaConfigFormItemProps) => JSX_2.Element;

declare interface JsonSchemaConfigFormItemProps extends FormItemProps {
    schema: RJSFSchema;
    uiSchema?: Record<string, unknown>;
}

declare interface JsonSchemaConfigFormProps {
    /** JSON Schema for the config object (type: object with properties) */
    schema: RJSFSchema;
    /** Current config values */
    value?: Record<string, unknown>;
    /** Called when config changes */
    onChange?: (config: Record<string, unknown>) => void;
    /** Optional UI schema for layout hints */
    uiSchema?: Record<string, unknown>;
    disabled?: boolean;
    formRef?: default_2.Ref<JsonSchemaConfigFormRef>;
}

declare interface JsonSchemaConfigFormRef {
    validate: (value: Record<string, unknown>) => Promise<void>;
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
    className?: string;
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

export declare interface listSkillAIToolBindingsParams {
    /** Skill ID */
    id: string;
    /** Page number */
    current?: number;
    /** Page size */
    page_size?: number;
    /** Search keyword */
    search?: string;
}

export declare interface listSkillFilesTreeParams {
    /** Skill ID */
    id: string;
}

export declare interface listSkillsParams {
    /** Page number */
    current?: number;
    /** Page size */
    page_size?: number;
    /** Search keyword */
    search?: string;
    /** Filter by category */
    category?: string;
    /** Filter by domain */
    domain?: string;
}

export declare interface listTasksParams {
    /** Current page number */
    current?: number;
    /** Number of items per page */
    page_size?: number;
    /** Search keyword */
    search?: string;
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

export declare interface LogStorageBackendOption {
    /** Backend name (e.g. "database") */
    id: string;
    /** Display name for UI */
    name: string;
}

export declare const MarkdownCode: default_2.FC<ComponentProps>;

export declare const MarkdownViewer: default_2.FC<MarkdownViewerProps>;

export declare interface MarkdownViewerProps {
    content: string;
    className?: string;
    style?: default_2.CSSProperties;
    components?: default_2.ComponentProps<typeof XMarkdown>['components'];
    paragraphTag?: keyof JSX.IntrinsicElements;
    rootClassName?: string;
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

export declare interface moveSkillPathParams {
    /** Skill ID */
    id: string;
}

export declare interface MoveSkillPathRequest {
    from_path: string;
    to_path: string;
}

export declare interface Navigation {
    name: string;
    path: string;
}

export declare const NotFound: default_2.FC;

export declare interface OAuthCallbackRequest {
    code: string;
    provider: string;
    state: string;
}

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
    /** Role mapping mode */
    role_mapping_mode: RoleMappingMode;
    scope: string;
    token_endpoint: string;
    userinfo_endpoint: string;
    username_field: string;
    wellknown_endpoint: string;
}

export declare type OrderedMapStringGithubComInvopopJsonschemaSchema = true;

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

export declare interface PageAIOptions {
    ephemeralSystemPrompts?: string[];
    tools?: RegisteredClientTool[];
    /** Register a getter for the current page data.  When provided, a built-in
     *  `ui_get_page_data` client tool is automatically created so the AI model
     *  can retrieve the page data on demand. */
    pageData?: any | PageDataGetter;
    /** Human-readable description of what `pageData` returns – becomes the
     *  tool's `description` field visible to the model. */
    pageDataDescription?: string;
}

/** Getter that returns the current page data snapshot (called lazily by the built-in tool). */
export declare type PageDataGetter = () => any;

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

export declare interface PaginationResponseModelSkill {
    code: string;
    current: number;
    data: Skill[];
    page_size: number;
    total: number;
    trace_id: string;
}

export declare interface PaginationResponseModelSkillAIToolBinding {
    code: string;
    current: number;
    data: SkillAIToolBinding[];
    page_size: number;
    total: number;
    trace_id: string;
}

export declare interface PaginationResponseModelTask {
    code: string;
    current: number;
    data: Task[];
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

export declare interface previewSkillParams {
    /** Skill ID */
    id: string;
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

export declare interface putSkillFileParams {
    /** Skill ID */
    id: string;
    /** File path */
    path: string;
}

export declare interface RegisteredClientTool {
    /** Must start with "ui_" prefix */
    name: string;
    description: string;
    /** OpenAI-compatible function parameters JSON Schema */
    parameters: StrictRJSFSchema;
    handler: ClientToolHandler;
}

export declare interface removeUserFromOrganizationParams {
    /** Organization ID */
    id: string;
    /** User ID */
    user_id: string;
}

export declare interface replaceSkillAIToolBindingsParams {
    /** Skill ID */
    id: string;
}

export declare interface ReplaceSkillAIToolBindingsRequest {
    bindings: SkillAIToolBindingItem[];
}

export declare function request(url: string, config: ArrayBufferRequestConfig): Promise<AxiosResponse<ArrayBuffer>>;

export declare function request(url: string, config: BlobRequestConfig): Promise<AxiosResponse<Blob>>;

export declare function request(url: string, config: TextRequestConfig): Promise<AxiosResponse<string>>;

export declare function request(url: string, config: SSERequestConfig): Promise<ReadableStream<Uint8Array<ArrayBuffer>>>;

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

export declare interface ResponseAiapiTraceStatusResponse {
    code: string;
    data: TraceStatusResponse;
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayAuthorizationapiOAuthProvider {
    code: string;
    data: OAuthProvider[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayModelAITraceEvent {
    code: string;
    data: AITraceEvent[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayModelFile {
    code: string;
    data: File_2[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayModelLogStorageBackendOption {
    code: string;
    data: LogStorageBackendOption[];
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

export declare interface ResponseArrayModelTask {
    code: string;
    data: Task[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayModelTaskLog {
    code: string;
    data: TaskLog[];
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

export declare interface ResponseArrayServiceScheduledJobState {
    code: string;
    data: ScheduledJobState[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayServiceSessionInfo {
    code: string;
    data: SessionInfo[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayServiceSkillFilePreview {
    code: string;
    data: SkillFilePreview[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayServiceSkillTreeNode {
    code: string;
    data: SkillTreeNode[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayServiceToolSetTypeDefinition {
    code: string;
    data: ToolSetTypeDefinition[];
    err: string;
    trace_id: string;
}

export declare interface ResponseArrayString {
    code: string;
    data: string[];
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

export declare interface ResponseModelSkill {
    code: string;
    data: Skill;
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

export declare interface ResponseModelTask {
    code: string;
    data: Task;
    err: string;
    trace_id: string;
}

export declare interface ResponseModelTaskSettings {
    code: string;
    data: TaskSettings;
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

export declare interface retryTaskParams {
    /** Task ID (UUID) */
    id: string;
}

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
    /** RoleType: "system" = created by seed/default-role assignment, not user-manageable; "user" = user-created */
    role_type: string;
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

export declare type RoleMappingMode = "disabled" | "auto" | "enforce";

export declare interface ScheduledJobState {
    description: string;
    enabled: boolean;
    id: string;
    last_run: string;
    name: string;
    next_run: string;
    spec: string;
    task_type: string;
}

export declare interface Schema {
    /** section 8.2.2 */
    $anchor: string;
    /** section 8.3 */
    $comment: string;
    /** section 8.2.4 */
    $defs: Definitions;
    /** section 8.2.3.2 */
    $dynamicRef: string;
    /** section 8.2.1 */
    $id: ID;
    /** section 8.2.3.1 */
    $ref: string;
    /** RFC draft-bhutton-json-schema-00 */
    $schema: string;
    /** section 10.3.2.3 */
    additionalProperties: Schema;
    /** RFC draft-bhutton-json-schema-00 section 10.2.1 (Sub-schemas with logic) */
    allOf: Schema[];
    /** section 10.2.1.2 */
    anyOf: Schema[];
    /** section 6.1.3 */
    const: any;
    /** section 10.3.1.3 */
    contains: Schema;
    /** RFC draft-bhutton-json-schema-validation-00, section 8 */
    contentEncoding: string;
    /** section 8.4 */
    contentMediaType: string;
    /** section 8.5 */
    contentSchema: Schema;
    /** section 9.2 */
    default: any;
    /** section 6.5.4 */
    dependentRequired: Record<string, any>;
    /** section 10.2.2.4 */
    dependentSchemas: Record<string, any>;
    /** section 9.3 */
    deprecated: boolean;
    /** section 9.1 */
    description: string;
    /** section 10.2.2.3 */
    else: Schema;
    /** section 6.1.2 */
    enum: any[];
    /** section 9.5 */
    examples: any[];
    /** section 6.2.3 */
    exclusiveMaximum: string;
    /** section 6.2.5 */
    exclusiveMinimum: string;
    /** RFC draft-bhutton-json-schema-validation-00, section 7 */
    format: string;
    /** RFC draft-bhutton-json-schema-00 section 10.2.2 (Apply sub-schemas conditionally) */
    if: Schema;
    /** section 10.3.1.2  (replaces additionalItems) */
    items: Schema;
    /** section 6.4.4 */
    maxContains: number;
    /** section 6.4.1 */
    maxItems: number;
    /** section 6.3.1 */
    maxLength: number;
    /** section 6.5.1 */
    maxProperties: number;
    /** section 6.2.2 */
    maximum: string;
    /** section 6.4.5 */
    minContains: number;
    /** section 6.4.2 */
    minItems: number;
    /** section 6.3.2 */
    minLength: number;
    /** section 6.5.2 */
    minProperties: number;
    /** section 6.2.4 */
    minimum: string;
    /** section 6.2.1 */
    multipleOf: string;
    /** section 10.2.1.4 */
    not: Schema;
    /** section 10.2.1.3 */
    oneOf: Schema[];
    /** section 6.3.3 */
    pattern: string;
    /** section 10.3.2.2 */
    patternProperties: Record<string, any>;
    /** RFC draft-bhutton-json-schema-00 section 10.3.1 (arrays) */
    prefixItems: Schema[];
    /** RFC draft-bhutton-json-schema-00 section 10.3.2 (sub-schemas) */
    properties: OrderedMapStringGithubComInvopopJsonschemaSchema;
    /** section 10.3.2.4 */
    propertyNames: Schema;
    /** section 9.4 */
    readOnly: boolean;
    /** section 6.5.3 */
    required: string[];
    /** section 10.2.2.2 */
    then: Schema;
    /** RFC draft-bhutton-json-schema-validation-00, section 9 */
    title: string;
    /** RFC draft-bhutton-json-schema-validation-00, section 6 */
    type: string;
    /** section 6.4.3 */
    uniqueItems: boolean;
    /** section 9.4 */
    writeOnly: boolean;
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
    /** results from client-side tool execution */
    client_tool_results: ClientToolResult[];
    /** client-side tool definitions (JSON Schema) */
    client_tools: ClientToolDefinition[];
    content: string;
    /** optional: load skills for these domains (plus core) as system context */
    domains: string[];
    /** page-level system prompts, memory-only (not persisted) */
    ephemeral_system_prompts: string[];
    /** optional: load these specific skills by id */
    skill_ids: string[];
}

export declare interface ServiceAccount {
    access_keys: ServiceAccountAccessKey[];
    created_at: string;
    description: string;
    id: string;
    last_access: string;
    name: string;
    organization: Organization;
    /** OrganizationID is the organization this service account belongs to. If empty, the service account is global. */
    organization_id: string;
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
    enable_skill_tool_binding: boolean;
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
    enableSkillToolBinding: boolean;
    loading: boolean;
    fetchSiteConfig: () => Promise<API.SiteConfig | null>;
    currentOrgId: string | null;
    setCurrentOrgId: (orgId: string) => void;
    clearCurrentOrgId: () => void;
    error?: Error;
    tasks?: API.Task[];
    setTasks: (tasks: API.Task[]) => void;
    addTask: (task: API.Task) => void;
    tasksDropdownOpen: boolean;
    setTasksDropdownOpen: (open: boolean) => void;
}

export declare interface Skill {
    category: string;
    created_at: string;
    description: string;
    domain: string;
    id: string;
    is_preset: boolean;
    name: string;
    organization_id: string;
    preset_key: string;
    status: SkillStatus;
    tools: SkillTool[];
    updated_at: string;
}

export declare interface SkillAIToolBinding {
    created_at: string;
    id: string;
    organization_id: string;
    skill_id: string;
    tool_name: string;
    toolset_id: string;
    updated_at: string;
}

export declare interface SkillAIToolBindingItem {
    tool_name: string;
    toolset_id: string;
}

export declare interface SkillFilePreview {
    content: string;
    file_name: string;
}

export declare type SkillStatus = "enabled" | "disabled";

export declare interface SkillTool {
    tool_name: string;
    toolset_id: string;
}

export declare interface SkillTreeNode {
    children: SkillTreeNode[];
    is_dir: boolean;
    name: string;
    path: string;
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
    enable_skill_tool_binding: boolean;
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

export declare interface Task {
    artifact_file_key: string;
    artifact_file_name: string;
    auto_retry_count: number;
    /** user or system */
    category: TaskCategory;
    created_at: string;
    creator_id: string;
    /** set when task was created by a scheduled job */
    cron_schedule_id: string;
    error: string;
    finished_at: string;
    id: string;
    max_retries: number;
    /** optional JSON payload for task input */
    payload: string;
    /** 0-100 */
    progress: number;
    result: string;
    retry_count: number;
    started_at: string;
    status: TaskStatus;
    type: string;
    updated_at: string;
}

export declare type TaskCategory = "user" | "system";

export declare interface TaskLog {
    created_at: string;
    id: string;
    /** Log level (info, debug, error, etc.) */
    level: string;
    /** Formatted log line (e.g. logfmt) */
    message: string;
    /** Task ID */
    task_id: string;
    updated_at: string;
}

export declare interface TaskSettings {
    /** Retention days for AI chat sessions/messages */
    ai_chat_retention_days: number;
    /** Retention days for audit logs */
    audit_log_retention_days: number;
    /** Retention days for task logs and task run records */
    log_retention_days: number;
    /** Backend name for task log storage (e.g. "database"), empty for default */
    log_storage_backend: string;
    max_concurrent: number;
}

export declare type TaskStatus = "pending" | "running" | "success" | "failed" | "cancelled";

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

declare interface TextRequestConfig extends Omit<RequestConfig, 'responseType'> {
    responseType: 'text';
}

export declare interface toggleTaskScheduleParams {
    /** Schedule ID */
    id: string;
}

export declare interface ToggleTraceRequest {
    enabled: boolean;
}

export declare interface TokenResponse {
    token: string;
}

export declare interface TokenUsage {
    completion_tokens: number;
    prompt_tokens: number;
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
    /** Created/managed by preset sync (immutable metadata) */
    is_preset: boolean;
    /** Toolset name */
    name: string;
    /** Organization ID */
    organization_id: string;
    /** Stable key within an org (e.g. utils) */
    preset_key: string;
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
    config_schema: Schema;
    description: string;
    name: string;
    tool_set_type: ToolSetType;
    ui_schema: Record<string, any>;
}

export declare type ToolType = "function";

export declare interface TraceStatusResponse {
    enabled: boolean;
}

export declare interface triggerTaskScheduleParams {
    /** Schedule ID */
    id: string;
}

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
    max_chat_iterations?: number;
    max_chat_tokens?: number;
    name: string;
    provider: AIModelProvider;
    status?: AIModelStatus;
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
    /** Role mapping mode */
    role_mapping_mode: RoleMappingMode;
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

export declare interface updateSkillParams {
    /** Skill ID */
    id: string;
}

export declare interface UpdateSkillRequest {
    category: string;
    description: string;
    domain: string;
    name: string;
}

export declare interface updateSkillStatusParams {
    /** Skill ID */
    id: string;
}

export declare interface UpdateSkillStatusRequest {
    status: SkillStatus;
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
 * const { hasPermission, hasAllPermissions, hasAnyPermission,hasGlobalPermission } = usePermission();
 *
 * if (hasPermission('authorization:user:create')) {
 *   // User has permission to create users
 * }
 */
export declare const usePermission: () => {
    hasPermission: (permission: string) => boolean;
    hasAllPermissions: (permissions: string[]) => boolean;
    hasAnyPermission: (permissions: string[]) => boolean;
    hasGlobalPermission: (permission: string) => boolean;
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

export declare function withSuspense<T extends default_2.ComponentType<any>>(Component: default_2.LazyExoticComponent<T>, props?: default_2.ComponentProps<T>): JSX_2.Element;

export { }



declare module 'axios' {
  export interface AxiosRequestConfig {
    withoutAuth?: boolean;
  }
}