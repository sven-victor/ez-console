declare global {
  namespace API {
    type AccessType = "public" | "private" | "owner";
  
    interface addUserToOrganizationParams {
      /** Organization ID */
      id: string;
    }
  
    interface AddUserToOrganizationRequest {
      role_ids: string[];
      user_id: string;
    }
  
    interface AIChatMessage {
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
  
    type AIChatMessageMetadata = true;
  
    type AIChatMessageRole = "user" | "assistant" | "system" | "tool" | "prompt";
  
    type AIChatMessageStatus = "pending" | "streaming" | "completed" | "failed";
  
    interface AIChatSession {
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
      updated_at: string;
      /** User ID */
      user_id: string;
    }
  
    interface AIFunctionCall {
      arguments: string;
      name: string;
    }
  
    interface AIModel {
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
  
    type AIModelProvider = "openai";
  
    type AIModelStatus = "enabled" | "disabled";
  
    interface AIToolCall {
      function: AIFunctionCall;
      id: string;
      index: number;
      type: string;
    }
  
    interface AITypeDefinition {
      config_schema: Schema;
      description: string;
      name: string;
      provider: AIModelProvider;
      ui_schema: Record<string, any>;
    }
  
    interface assignPermissionsParams {
      /** Role ID */
      id: string;
    }
  
    interface AssignPermissionsRequest {
      permission_ids: string[];
    }
  
    interface assignRolesParams {
      /** User ID */
      id: string;
    }
  
    interface AssignRolesRequest {
      role_ids: string[];
    }
  
    interface assignServiceAccountRolesParams {
      /** Service account ID */
      id: string;
    }
  
    interface AssignServiceAccountRolesRequest {
      role_ids: string[];
    }
  
    interface AuditLog {
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
  
    interface AuditLogDetail {
      new_data: any;
      old_data: any;
      request: any;
    }
  
    interface cancelTaskParams {
      /** Task ID (UUID) */
      id: string;
    }
  
    interface ChangePasswordRequest {
      new_password: string;
      old_password: string;
    }
  
    interface Chart {
      color: string;
      datasets: Dataset[];
      icon: string;
      labels: string[];
      title: string;
      value: number;
      width: number;
    }
  
    interface ChatStreamEvent {
      client_tool_calls: ClientToolPendingCall[];
      content: string;
      event_type: EventType;
      message_id: string;
      role: AIChatMessageRole;
      tool_calls: ToolCall[];
    }
  
    interface CheckPasswordComplexityRequest {
      password: string;
    }
  
    interface CheckPasswordComplexityResponse {
      is_valid: boolean;
    }
  
    interface ClientToolDefinition {
      description: string;
      name: string;
      parameters: any;
    }
  
    interface ClientToolPendingCall {
      arguments: string;
      id: string;
      name: string;
    }
  
    interface ClientToolResult {
      content: string;
      tool_call_id: string;
    }
  
    type Condition = true;
  
    interface CreateAIModelRequest {
      config: Record<string, any>;
      description?: string;
      is_default?: boolean;
      name: string;
      provider: AIModelProvider;
    }
  
    interface CreateChatSessionRequest {
      anonymous: boolean;
      messages: SimpleChatMessage[];
      model_id: string;
      title: string;
    }
  
    interface CreateOrganizationRequest {
      description?: string;
      name: string;
      status: string;
    }
  
    interface CreateRoleRequest {
      ai_tool_permissions: RoleAIToolPermissionRequest[];
      description: string;
      name: string;
      organization_id: string;
      permissions: string[];
      policy_document: PolicyDocument;
    }
  
    interface createServiceAccountAccessKeyParams {
      /** Service account ID */
      id: string;
    }
  
    interface CreateServiceAccountAccessKeyRequest {
      description: string;
      expires_at: string;
      name: string;
    }
  
    interface CreateServiceAccountAccessKeyResponse {
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
  
    interface CreateServiceAccountRequest {
      description: string;
      name: string;
      organization_id?: string;
    }
  
    interface createSkillDirParams {
      /** Skill ID */
      id: string;
    }
  
    interface CreateSkillDirRequest {
      path: string;
    }
  
    interface CreateSkillRequest {
      category: string;
      /** optional initial SKILL.md content */
      content: string;
      description: string;
      domain: string;
      name: string;
    }
  
    interface CreateToolSetRequest {
      config?: Record<string, any>;
      description?: string;
      name: string;
      type: ToolSetType;
    }
  
    interface CreateUserExportTaskRequest {
      keywords?: string;
      status?: string;
    }
  
    interface CreateUserRequest {
      avatar?: string;
      email: string;
      full_name: string;
      mfa_enforced: boolean;
      password: string;
      phone?: string;
      role_ids: string[];
      username: string;
    }
  
    interface Dataset {
      color: string;
      data: number[];
      label: string;
    }
  
    type Definitions = true;
  
    interface deleteAIModelParams {
      /** AI model ID */
      id: string;
    }
  
    interface deleteChatSessionParams {
      /** Chat session ID */
      sessionId: string;
    }
  
    interface deleteOrganizationParams {
      /** Organization ID */
      id: string;
    }
  
    interface deleteRoleParams {
      /** Role ID */
      id: string;
    }
  
    interface deleteServiceAccountAccessKeyParams {
      /** Service account ID */
      id: string;
      /** Access key ID */
      keyId: string;
    }
  
    interface deleteServiceAccountParams {
      /** Service account ID */
      id: string;
    }
  
    interface deleteSkillParams {
      /** Skill ID */
      id: string;
    }
  
    interface deleteSkillPathParams {
      /** Skill ID */
      id: string;
      /** File or directory path */
      path: string;
    }
  
    interface deleteTaskParams {
      /** Task ID (UUID) */
      id: string;
    }
  
    interface deleteToolSetParams {
      /** Toolset ID */
      id: string;
    }
  
    interface deleteUserParams {
      /** User ID */
      id: string;
    }
  
    interface downloadFileParams {
      /** File key */
      fileKey: string;
    }
  
    type Duration =
      | -9223372036854776000
      | 9223372036854776000
      | 1
      | 1000
      | 1000000
      | 1000000000
      | 60000000000
      | 3600000000000;
  
    interface EnableMFAResponse {
      qr_code: string;
      secret: string;
      token: string;
    }
  
    interface ErrorResponse {
      code: string;
      err: any;
      message: string;
      trace_id: string;
    }
  
    type EventType = "content" | "tool_call" | "error" | "client_tool_pending";
  
    interface File {
      access: AccessType;
      created_at: string;
      id: string;
      name: string;
      size: number;
      type: FileType;
      updated_at: string;
    }
  
    type FileType = "image" | "export";
  
    interface FunctionCall {
      /** call function with arguments in JSON format */
      arguments: string;
      name: string;
    }
  
    interface FunctionDefinition {
      description: string;
      name: string;
      parameters: any;
      strict: boolean;
    }
  
    interface generateChatSessionTitleParams {
      /** Chat session ID */
      sessionId: string;
    }
  
    interface GenerateChatSessionTitleRequest {
      /** Optional: if provided, use this title; otherwise generate automatically */
      title: string;
    }
  
    interface getAIModelParams {
      /** AI model ID */
      id: string;
    }
  
    interface getAuditLogsParams {
      /** Current page number */
      current?: number;
      /** Number of items per page */
      page_size?: number;
    }
  
    interface getChatSessionParams {
      /** Chat session ID */
      sessionId: string;
    }
  
    interface getCurrentUserLogsParams {
      /** Current page number */
      current?: number;
      /** Number of items per page */
      page_size?: number;
    }
  
    interface getLdapUsersParams {
      /** Skip existing users */
      skip_existing?: boolean;
    }
  
    interface getLoginUrlParams {
      /** Provider */
      provider: string;
    }
  
    interface getOrganizationParams {
      /** Organization ID */
      id: string;
    }
  
    interface getRoleParams {
      /** Role ID */
      id: string;
    }
  
    interface getRolePolicyParams {
      /** Role ID */
      id: string;
    }
  
    interface getServiceAccountAccessKeysParams {
      /** Service account ID */
      id: string;
    }
  
    interface getServiceAccountByIdParams {
      /** Service account ID */
      id: string;
    }
  
    interface getServiceAccountPolicyParams {
      /** Service account ID */
      id: string;
    }
  
    interface getServiceAccountRolesParams {
      /** Service account ID */
      id: string;
    }
  
    interface getServiceAccountsParams {
      /** Current page number */
      current?: number;
      /** Number of items per page */
      page_size?: number;
      /** Search keyword */
      search?: string;
      /** Filter by organization ID (empty for global service accounts) */
      organization_id?: string;
    }
  
    interface getSkillFileParams {
      /** Skill ID */
      id: string;
      /** File path (e.g. SKILL.md or docs/readme.md) */
      path: string;
    }
  
    interface getSkillParams {
      /** Skill ID */
      id: string;
    }
  
    interface getTaskLogsParams {
      /** Task ID (UUID) */
      id: string;
    }
  
    interface getTaskParams {
      /** Task ID (UUID) */
      id: string;
    }
  
    interface getTaskScheduleHistoryParams {
      /** Schedule ID */
      id: string;
      /** Page number */
      current?: number;
      /** Page size */
      page_size?: number;
    }
  
    interface getToolSetParams {
      /** Toolset ID */
      id: string;
    }
  
    interface getToolSetToolsParams {
      /** Toolset ID */
      id: string;
    }
  
    interface getUserLogsParams {
      /** User ID */
      id: string;
      /** Current page number */
      current?: number;
      /** Number of items per page */
      page_size?: number;
    }
  
    interface getUserOrganizationsParams {
      /** User ID */
      user_id: string;
    }
  
    interface getUserParams {
      /** User ID */
      id: string;
    }
  
    interface getUserSessionsParams {
      /** Current page number */
      current?: number;
      /** Number of items per page */
      page_size?: number;
    }
  
    interface HealthResult {
      message: string;
      reason: string;
      status: string;
    }
  
    type ID = "";
  
    interface ImportLDAPUsersRequest {
      user_dn?: string[];
    }
  
    interface LDAPSettings {
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
  
    interface LDAPTestMessage {
      message: string;
      success: boolean;
    }
  
    interface LDAPTestRequest {
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
  
    interface LDAPTestResponse {
      message: LDAPTestMessage[];
      success: boolean;
      user: User;
    }
  
    interface listAIModelsParams {
      /** Current page number */
      current?: number;
      /** Page size */
      page_size?: number;
      /** Search keyword */
      search?: string;
    }
  
    interface listChatSessionsParams {
      /** Current page number */
      current?: number;
      /** Page size */
      page_size?: number;
    }
  
    interface listFilesParams {
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
  
    interface listOrganizationsParams {
      /** Current page */
      current?: number;
      /** Page size */
      page_size?: number;
      /** Search */
      search?: string;
    }
  
    interface listOrganizationUsersParams {
      /** Organization ID */
      id: string;
      /** Current page */
      current?: number;
      /** Page size */
      page_size?: number;
      /** Search */
      search?: string;
    }
  
    interface listRolesParams {
      /** Current page */
      current?: number;
      /** Page size */
      page_size?: number;
      /** Search */
      search?: string;
      /** Filter by organization ID (empty for global roles) */
      organization_id?: string;
    }
  
    interface listSkillFilesTreeParams {
      /** Skill ID */
      id: string;
    }
  
    interface listSkillsParams {
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
  
    interface listTasksParams {
      /** Current page number */
      current?: number;
      /** Number of items per page */
      page_size?: number;
      /** Search keyword */
      search?: string;
    }
  
    interface listToolSetsParams {
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
  
    interface listUsersParams {
      /** Current page number */
      current?: number;
      /** Number of items per page */
      page_size?: number;
      /** Keywords for searching */
      keywords?: string;
      /** Status of the user */
      status?: string;
    }
  
    interface LoginRequest {
      mfa_code: string;
      mfa_token: string;
      password: string;
      username: string;
    }
  
    interface LoginResponse {
      expires_at: string;
      mfa_token: string;
      mfa_type: string;
      needs_mfa: boolean;
      password_expired: boolean;
      token: string;
      user: User;
    }
  
    interface LogStorageBackendOption {
      /** Backend name (e.g. "database") */
      id: string;
      /** Display name for UI */
      name: string;
    }
  
    interface MenuConfig {
      hide: boolean;
      icon: string;
      name: string;
      path: string;
    }
  
    interface MessageData {
      message: string;
    }
  
    interface moveSkillPathParams {
      /** Skill ID */
      id: string;
    }
  
    interface MoveSkillPathRequest {
      from_path: string;
      to_path: string;
    }
  
    interface Navigation {
      name: string;
      path: string;
    }
  
    interface OAuthCallbackRequest {
      code: string;
      provider: string;
      state: string;
    }
  
    interface OAuthLoginURLResponse {
      state: string;
      url: string;
    }
  
    interface OAuthProvider {
      display_name: string;
      icon_url: string;
      name: string;
    }
  
    type OAuthProviderType =
      | "github"
      | "google"
      | "dingtalk"
      | "wechat"
      | "custom"
      | "autoDiscover";
  
    interface OAuthSettings {
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
  
    type OrderedMapStringGithubComInvopopJsonschemaSchema = true;
  
    interface Organization {
      created_at: string;
      description: string;
      id: string;
      name: string;
      /** active, disabled */
      status: string;
      updated_at: string;
    }
  
    interface OrganizationUser {
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
  
    interface PaginationResponseModelAIChatSession {
      code: string;
      current: number;
      data: AIChatSession[];
      page_size: number;
      total: number;
      trace_id: string;
    }
  
    interface PaginationResponseModelAIModel {
      code: string;
      current: number;
      data: AIModel[];
      page_size: number;
      total: number;
      trace_id: string;
    }
  
    interface PaginationResponseModelAuditLog {
      code: string;
      current: number;
      data: AuditLog[];
      page_size: number;
      total: number;
      trace_id: string;
    }
  
    interface PaginationResponseModelFile {
      code: string;
      current: number;
      data: File[];
      page_size: number;
      total: number;
      trace_id: string;
    }
  
    interface PaginationResponseModelOrganization {
      code: string;
      current: number;
      data: Organization[];
      page_size: number;
      total: number;
      trace_id: string;
    }
  
    interface PaginationResponseModelRole {
      code: string;
      current: number;
      data: Role[];
      page_size: number;
      total: number;
      trace_id: string;
    }
  
    interface PaginationResponseModelServiceAccount {
      code: string;
      current: number;
      data: ServiceAccount[];
      page_size: number;
      total: number;
      trace_id: string;
    }
  
    interface PaginationResponseModelSkill {
      code: string;
      current: number;
      data: Skill[];
      page_size: number;
      total: number;
      trace_id: string;
    }
  
    interface PaginationResponseModelTask {
      code: string;
      current: number;
      data: Task[];
      page_size: number;
      total: number;
      trace_id: string;
    }
  
    interface PaginationResponseModelToolSet {
      code: string;
      current: number;
      data: ToolSet[];
      page_size: number;
      total: number;
      trace_id: string;
    }
  
    interface PaginationResponseModelUser {
      code: string;
      current: number;
      data: User[];
      page_size: number;
      total: number;
      trace_id: string;
    }
  
    interface PaginationResponseServiceOrganizationUser {
      code: string;
      current: number;
      data: OrganizationUser[];
      page_size: number;
      total: number;
      trace_id: string;
    }
  
    type PasswordComplexity = "low" | "medium" | "high" | "very_high";
  
    interface Permission {
      code: string;
      created_at: string;
      description: string;
      id: string;
      name: string;
      /** OrgPermission indicates if this permission is organization-scoped */
      org_permission: boolean;
      updated_at: string;
    }
  
    interface PermissionGroup {
      description: string;
      name: string;
      permissions: Permission[];
    }
  
    interface PolicyDocument {
      Statement: StatementEntry[];
    }
  
    interface previewSkillParams {
      /** Skill ID */
      id: string;
    }
  
    interface PreviewSkillResponse {
      content: string;
    }
  
    interface putSkillFileParams {
      /** Skill ID */
      id: string;
      /** File path */
      path: string;
    }
  
    interface removeUserFromOrganizationParams {
      /** Organization ID */
      id: string;
      /** User ID */
      user_id: string;
    }
  
    interface resetUserPasswordParams {
      /** User ID */
      id: string;
    }
  
    interface ResetUserPasswordRequest {
      password: string;
    }
  
    interface ResetUserPasswordResponse {
      new_password: string;
    }
  
    interface ResponseArrayAuthorizationapiOAuthProvider {
      code: string;
      data: OAuthProvider[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayModelFile {
      code: string;
      data: File[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayModelLogStorageBackendOption {
      code: string;
      data: LogStorageBackendOption[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayModelOrganization {
      code: string;
      data: Organization[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayModelPermissionGroup {
      code: string;
      data: PermissionGroup[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayModelServiceAccountAccessKey {
      code: string;
      data: ServiceAccountAccessKey[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayModelTask {
      code: string;
      data: Task[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayModelTaskLog {
      code: string;
      data: TaskLog[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayModelUser {
      code: string;
      data: User[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayServiceAITypeDefinition {
      code: string;
      data: AITypeDefinition[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayServiceScheduledJobState {
      code: string;
      data: ScheduledJobState[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayServiceSessionInfo {
      code: string;
      data: SessionInfo[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayServiceSkillTreeNode {
      code: string;
      data: SkillTreeNode[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayServiceToolSetTypeDefinition {
      code: string;
      data: ToolSetTypeDefinition[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArrayString {
      code: string;
      data: string[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseArraySystemapiTool {
      code: string;
      data: Tool[];
      err: string;
      trace_id: string;
    }
  
    interface ResponseAuthorizationapiCreateServiceAccountAccessKeyResponse {
      code: string;
      data: CreateServiceAccountAccessKeyResponse;
      err: string;
      trace_id: string;
    }
  
    interface ResponseAuthorizationapiResetUserPasswordResponse {
      code: string;
      data: ResetUserPasswordResponse;
      err: string;
      trace_id: string;
    }
  
    interface ResponseAuthorizationapiTokenResponse {
      code: string;
      data: TokenResponse;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelAIChatSession {
      code: string;
      data: AIChatSession;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelAIModel {
      code: string;
      data: AIModel;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelLDAPTestResponse {
      code: string;
      data: LDAPTestResponse;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelOAuthSettings {
      code: string;
      data: OAuthSettings;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelOrganization {
      code: string;
      data: Organization;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelPolicyDocument {
      code: string;
      data: PolicyDocument;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelRole {
      code: string;
      data: Role;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelSecuritySettings {
      code: string;
      data: SecuritySettings;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelServiceAccount {
      code: string;
      data: ServiceAccount;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelServiceAccountAccessKey {
      code: string;
      data: ServiceAccountAccessKey;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelSkill {
      code: string;
      data: Skill;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelSMTPSettings {
      code: string;
      data: SMTPSettings;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelSystemSettings {
      code: string;
      data: SystemSettings;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelTask {
      code: string;
      data: Task;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelTaskSettings {
      code: string;
      data: TaskSettings;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelToolSet {
      code: string;
      data: ToolSet;
      err: string;
      trace_id: string;
    }
  
    interface ResponseModelUser {
      code: string;
      data: User;
      err: string;
      trace_id: string;
    }
  
    interface ResponseServiceCharts {
      code: string;
      data: Chart[][];
      err: string;
      trace_id: string;
    }
  
    interface ResponseServiceEnableMFAResponse {
      code: string;
      data: EnableMFAResponse;
      err: string;
      trace_id: string;
    }
  
    interface ResponseServiceHealthResult {
      code: string;
      data: HealthResult;
      err: string;
      trace_id: string;
    }
  
    interface ResponseServiceLoginResponse {
      code: string;
      data: LoginResponse;
      err: string;
      trace_id: string;
    }
  
    interface ResponseServiceOAuthLoginURLResponse {
      code: string;
      data: OAuthLoginURLResponse;
      err: string;
      trace_id: string;
    }
  
    interface ResponseServiceSiteConfig {
      code: string;
      data: SiteConfig;
      err: string;
      trace_id: string;
    }
  
    interface ResponseServiceSystemInfo {
      code: string;
      data: SystemInfo;
      err: string;
      trace_id: string;
    }
  
    interface ResponseServiceTestOAuthCallbackResponse {
      code: string;
      data: TestOAuthCallbackResponse;
      err: string;
      trace_id: string;
    }
  
    interface ResponseString {
      code: string;
      data: string;
      err: string;
      trace_id: string;
    }
  
    interface ResponseSystemapiCheckPasswordComplexityResponse {
      code: string;
      data: CheckPasswordComplexityResponse;
      err: string;
      trace_id: string;
    }
  
    interface ResponseSystemapiLDAPSettings {
      code: string;
      data: LDAPSettings;
      err: string;
      trace_id: string;
    }
  
    interface ResponseSystemapiPreviewSkillResponse {
      code: string;
      data: PreviewSkillResponse;
      err: string;
      trace_id: string;
    }
  
    interface ResponseSystemapiSMTPTestResponse {
      code: string;
      data: SMTPTestResponse;
      err: string;
      trace_id: string;
    }
  
    interface ResponseUtilMessageData {
      code: string;
      data: MessageData;
      err: string;
      trace_id: string;
    }
  
    interface restoreUserParams {
      /** User ID */
      id: string;
    }
  
    interface retryTaskParams {
      /** Task ID (UUID) */
      id: string;
    }
  
    interface Role {
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
  
    interface RoleAIToolPermission {
      created_at: string;
      id: string;
      organization_id: string;
      role_id: string;
      tool_name: string;
      toolset: ToolSet;
      toolset_id: string;
      updated_at: string;
    }
  
    interface RoleAIToolPermissionRequest {
      tools: string[];
      toolset_id: string;
    }
  
    type RoleMappingMode = "disabled" | "auto" | "enforce";
  
    interface ScheduledJobState {
      description: string;
      enabled: boolean;
      id: string;
      last_run: string;
      name: string;
      next_run: string;
      spec: string;
      task_type: string;
    }
  
    interface Schema {
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
  
    interface SecuritySettings {
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
  
    interface SendMessageRequest {
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
  
    interface ServiceAccount {
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
  
    interface ServiceAccountAccessKey {
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
  
    interface SessionInfo {
      created_at: string;
      id: string;
      ip_address: string;
      is_current: boolean;
      last_active_at: string;
      location: string;
      user_agent: string;
    }
  
    interface setDefaultAIModelParams {
      /** AI model ID */
      id: string;
    }
  
    interface setRolePolicyParams {
      /** Role ID */
      id: string;
    }
  
    interface setServiceAccountPolicyParams {
      /** Service account ID */
      id: string;
    }
  
    interface SetServiceAccountPolicyRequest {
      policy_document: PolicyDocument;
    }
  
    interface SimpleChatMessage {
      content: string;
      role: AIChatMessageRole;
    }
  
    interface SiteConfig {
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
  
    interface Skill {
      category: string;
      created_at: string;
      description: string;
      domain: string;
      id: string;
      name: string;
      updated_at: string;
    }
  
    interface SkillTreeNode {
      children: SkillTreeNode[];
      is_dir: boolean;
      name: string;
      path: string;
    }
  
    interface SMTPSettings {
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
  
    interface SMTPTestRequest {
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
  
    interface SMTPTestResponse {
      message: string;
      success: boolean;
    }
  
    interface StatementEntry {
      /** List of actions, can contain wildcards "*" */
      Action: string[];
      /** Conditions */
      Condition: Record<string, any>;
      /** "Allow" or "Deny" */
      Effect: string;
      /** List of resources, can contain wildcards "*" */
      Resource: string[];
    }
  
    interface SystemInfo {
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
  
    interface SystemSettings {
      disable_local_user_login: boolean;
      enable_multi_org: boolean;
      home_page: string;
      logo: string;
      name: string;
      name_i18n: Record<string, any>;
    }
  
    interface Task {
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
  
    type TaskCategory = "user" | "system";
  
    interface TaskLog {
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
  
    interface TaskSettings {
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
  
    type TaskStatus = "pending" | "running" | "success" | "failed" | "cancelled";
  
    interface terminateSessionParams {
      /** Session ID */
      id: string;
    }
  
    interface testAIModelParams {
      /** AI model ID */
      id: string;
    }
  
    interface TestOAuthCallbackResponse {
      user: User;
      user_info: Record<string, any>;
    }
  
    interface testToolSetParams {
      /** Toolset ID */
      id: string;
    }
  
    interface toggleTaskScheduleParams {
      /** Schedule ID */
      id: string;
    }
  
    interface TokenResponse {
      token: string;
    }
  
    interface Tool {
      function: FunctionDefinition;
      type: string;
    }
  
    interface ToolCall {
      function: FunctionCall;
      id: string;
      /** Index is not nil only in chat completion chunk object */
      index: number;
      start_time: string;
      status: ToolCallStatus;
      type: ToolType;
    }
  
    type ToolCallStatus = "pending" | "running" | "completed" | "failed";
  
    interface ToolDefinition {
      description: string;
      name: string;
      parameters: any;
      strict: boolean;
      type: string;
    }
  
    interface ToolSet {
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
  
    type ToolSetStatus = "enabled" | "disabled";
  
    type ToolSetType = "utils";
  
    interface ToolSetTypeDefinition {
      config_schema: Schema;
      description: string;
      name: string;
      tool_set_type: ToolSetType;
      ui_schema: Record<string, any>;
    }
  
    type ToolType = "function";
  
    interface triggerTaskScheduleParams {
      /** Schedule ID */
      id: string;
    }
  
    interface unlockUserParams {
      /** User ID */
      id: string;
    }
  
    interface updateAIModelParams {
      /** AI model ID */
      id: string;
    }
  
    interface UpdateAIModelRequest {
      config?: Record<string, any>;
      description?: string;
      is_default?: boolean;
      name: string;
      provider: AIModelProvider;
      status?: AIModelStatus;
    }
  
    interface UpdateCurrentUserRequest {
      avatar: string;
      email: string;
      full_name: string;
      phone: string;
    }
  
    interface UpdateLDAPSettingsRequest {
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
  
    interface UpdateOAuthSettingsRequest {
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
  
    interface updateOrganizationParams {
      /** Organization ID */
      id: string;
    }
  
    interface UpdateOrganizationRequest {
      description?: string;
      name: string;
      status: string;
    }
  
    interface updateRoleParams {
      /** Role ID */
      id: string;
    }
  
    interface UpdateRoleRequest {
      ai_tool_permissions: RoleAIToolPermissionRequest[];
      description: string;
      name: string;
      organization_id: string;
      permissions: string[];
      policy_document: PolicyDocument;
    }
  
    interface updateServiceAccountAccessKeyParams {
      /** Service account ID */
      id: string;
      /** Access key ID */
      keyId: string;
    }
  
    interface UpdateServiceAccountAccessKeyRequest {
      description: string;
      expires_at: string;
      name: string;
      status: "active" | "disabled";
    }
  
    interface updateServiceAccountParams {
      /** Service account ID */
      id: string;
    }
  
    interface UpdateServiceAccountRequest {
      description: string;
      name: string;
    }
  
    interface updateServiceAccountStatusParams {
      /** Service account ID */
      id: string;
    }
  
    interface UpdateServiceAccountStatusRequest {
      status: "active" | "disabled";
    }
  
    interface updateSkillParams {
      /** Skill ID */
      id: string;
    }
  
    interface UpdateSkillRequest {
      category: string;
      description: string;
      domain: string;
      name: string;
    }
  
    interface updateToolSetParams {
      /** Toolset ID */
      id: string;
    }
  
    interface UpdateToolSetRequest {
      config?: Record<string, any>;
      description?: string;
      name: string;
      status?: ToolSetStatus;
      type: ToolSetType;
    }
  
    interface updateToolSetStatusParams {
      /** Toolset ID */
      id: string;
    }
  
    interface UpdateToolSetStatusRequest {
      status: ToolSetStatus;
    }
  
    interface updateUserOrganizationRolesParams {
      /** Organization ID */
      id: string;
      /** User ID */
      user_id: string;
    }
  
    interface UpdateUserOrganizationRolesRequest {
      role_ids: string[];
    }
  
    interface updateUserParams {
      /** User ID */
      id: string;
    }
  
    interface UpdateUserRequest {
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
  
    interface updateUserStatusParams {
      /** User ID */
      id: string;
    }
  
    interface UpdateUserStatusRequest {
      status: string;
    }
  
    interface User {
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
  
    type UserSource = "local" | "ldap" | "oauth";
  
    interface VerifyAndActivateMFARequest {
      code: string;
      mfa_type: string;
      token?: string;
    }
  }
  
}

export {};
