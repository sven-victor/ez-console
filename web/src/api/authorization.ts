import { apiGet, apiPost, apiPut, apiDelete } from './client';

const baseUrl = '/authorization';
const oauthUrl = '/oauth';

// Get permission list
export const getPermissions = (current: number = 1, pageSize: number = 1000): Promise<API.PermissionGroup[]> => {
  return apiGet<API.PermissionGroup[]>(`${baseUrl}/permissions`, { params: { current, page_size: pageSize } });
};

// Get role list
export const getRoles = (current: number = 1, pageSize: number = 10, keywords?: string): Promise<API.PaginationResponse<API.Role>> => {
  return apiGet<API.PaginationResponse<API.Role>>(`${baseUrl}/roles`, { params: { current, page_size: pageSize, search: keywords } });
};

// Get role details
export const getRoleById = (id: string): Promise<API.Role> => {
  return apiGet<API.Role>(`${baseUrl}/roles/${id}`);
};

// Create role
export const createRole = (data: { name: string, description?: string, permissions?: string[], policy_document?: string }): Promise<API.Role> => {
  return apiPost<API.Role>(`${baseUrl}/roles`, data);
};

// Update role
export const updateRole = (id: string, data: { name?: string, description?: string, permissions?: string[], policy_document?: string }): Promise<API.Role> => {
  return apiPut<API.Role>(`${baseUrl}/roles/${id}`, data);
};

// Delete role
export const deleteRole = (id: string): Promise<{ message: string }> => {
  return apiDelete<{ message: string }>(`${baseUrl}/roles/${id}`);
};

// Get role permissions
export const getRolePermissions = (id: string): Promise<{ data: API.Permission[] }> => {
  return apiGet<{ data: API.Permission[] }>(`${baseUrl}/roles/${id}/permissions`);
};

// Assign role permissions
export const assignRolePermissions = (id: string, permissionIds: string[]): Promise<{ message: string }> => {
  return apiPost<{ message: string }>(`${baseUrl}/roles/${id}/permissions`, { permission_ids: permissionIds });
};

// Remove role permission
export const removeRolePermission = (roleId: string, permissionId: string): Promise<{ message: string }> => {
  return apiDelete<{ message: string }>(`${baseUrl}/roles/${roleId}/permissions/${permissionId}`);
};

// Get current user permissions
export const getCurrentUserPermissions = (): Promise<{ data: API.Permission[] }> => {
  return apiGet<{ data: API.Permission[] }>(`${baseUrl}/users/me/permissions`);
};


// Get user list
export const getUsers = async (current: number = 1, page_size: number = 10, filters?: Partial<API.UserQueryParams>): Promise<API.PaginationResponse<API.User>> => {
  const params = {
    current,
    page_size,
    ...filters
  };
  return apiGet<API.PaginationResponse<API.User>>(`${baseUrl}/users`, { params });
};

// Get single user details
export const getUser = async (id: string): Promise<API.User> => {
  return apiGet<API.User>(`${baseUrl}/users/${id}`);
};

// Create user
export const createUser = async (data: API.CreateUserRequest): Promise<API.User> => {
  return apiPost<API.User>(`${baseUrl}/users`, data);
};

// Update user
export const updateUser = async (id: string, data: API.UpdateUserRequest): Promise<API.User> => {
  return apiPut<API.User>(`${baseUrl}/users/${id}`, data);
};

// Delete user
export const deleteUser = async (id: string): Promise<void> => {
  return apiDelete<void>(`${baseUrl}/users/${id}`);
};

// Restore user
export const restoreUser = async (id: string): Promise<void> => {
  return apiPost<void>(`${baseUrl}/users/${id}/restore`, {});
};

// Modify user status
export const updateUserStatus = async (id: string, status: 'active' | 'inactive'): Promise<void> => {
  return apiPut<void>(`${baseUrl}/users/${id}/status`, { status });
};

// Assign roles
export const assignRoles = async (userId: string, roleIds: string[]): Promise<void> => {
  return apiPut<void>(`${baseUrl}/users/${userId}/roles`, { role_ids: roleIds });
};

// Reset password
export const resetPassword = async (userId: string, newPassword: string): Promise<{ new_password: string }> => {
  return apiPut<{ new_password: string }>(`${baseUrl}/users/${userId}/password`, { password: newPassword });
};

// Unlock user
export const unlockUser = async (userId: string): Promise<void> => {
  return apiPost<void>(`${baseUrl}/users/${userId}/unlock`, {});
};

// User login
export const login = async (data: API.LoginRequest): Promise<API.LoginResponse> => {
  return apiPost<API.LoginResponse>(`${baseUrl}/auth/login`, data);
};

// User logout
export const logout = async (): Promise<void> => {
  return apiPost<void>(`${baseUrl}/auth/logout`);
};


// Get current user information
export const getCurrentUser = async (): Promise<API.User> => {
  return apiGet<API.User>(`${baseUrl}/profile`);
};

// Update current user information
export const updateCurrentUser = async (data: API.UpdateUserRequest): Promise<API.User> => {
  return apiPut<API.User>(`${baseUrl}/profile`, data);
};

// Modify current user password
export const changePassword = async (data: API.ChangePasswordRequest, token?: string): Promise<void> => {
  return apiPut<void>(`${baseUrl}/profile/password`, data, { headers: { Authorization: `Bearer ${token}` } });
};


// OAuth related interfaces
// Get list of available OAuth providers
export const getOAuthProviders = async (): Promise<API.OAuthProvider[]> => {
  return apiGet<API.OAuthProvider[]>(`${oauthUrl}/providers`);
};

// Get enabled OAuth settings for login page
export const getEnabledOAuthSettings = async (): Promise<{
  enabled: boolean;
  provider: string;
  client_id: string;
  redirect_uri: string;
}> => {
  return apiGet<{
    enabled: boolean;
    provider: string;
    client_id: string;
    redirect_uri: string;
  }>(`${oauthUrl}/enabled-settings`);
};

// Get OAuth login URL
export const getOAuthLoginURL = async (provider: string): Promise<API.OAuthLoginURLResponse> => {
  return apiGet<API.OAuthLoginURLResponse>(`${oauthUrl}/login/${provider}`);
};

// Handle OAuth callback
export const handleOAuthCallback = async (data: API.OAuthCallbackRequest): Promise<API.LoginResponse> => {
  return apiPost<API.LoginResponse>(`${oauthUrl}/callback`, data, { withoutAuth: true });
};

// MFA related interfaces

// Get MFA configuration
export const enableMFA = async (mfaType: 'totp' | 'email'): Promise<{ secret?: string, qr_code?: string, token?: string }> => {
  return apiPost<{ secret?: string, qr_code?: string, token?: string }>(`${baseUrl}/profile/mfa/enable`, { mfa_type: mfaType });
};

// Verify and activate MFA
export const verifyAndActivateMFA = async (data: API.MFAVerifyRequest): Promise<void> => {
  return apiPost<void>(`${baseUrl}/profile/mfa/verify`, data);
};

// Disable MFA
export const disableMFA = async (): Promise<void> => {
  return apiPost<void>(`${baseUrl}/profile/mfa/disable`, {});
};

// Session management related interfaces

// Get current user's session list
export const getUserSessions = async (): Promise<any[]> => {
  return apiGet<any[]>(`${baseUrl}/profile/sessions`);
};

// Terminate specified session
export const terminateSession = async (sessionId: string): Promise<void> => {
  return apiDelete<void>(`${baseUrl}/profile/sessions/${sessionId}`);
};

// Terminate all sessions except current session
export const terminateOtherSessions = async (): Promise<void> => {
  return apiPost<void>(`${baseUrl}/profile/sessions/terminate-others`, {});
};

// Get current user's audit logs
export const getUserAuditLogs = async (params?: API.AuditLogFilters & API.PaginationRequest): Promise<API.PaginationResponse<API.AuditLog>> => {
  return apiGet<API.PaginationResponse<API.AuditLog>>(`${baseUrl}/profile/audit-logs`, { params });
};

// Get audit logs for specified user
export const getUserAuditLogsByID = async (userId: string, params?: API.AuditLogFilters & API.PaginationRequest): Promise<API.PaginationResponse<API.AuditLog>> => {
  return apiGet<API.PaginationResponse<API.AuditLog>>(`${baseUrl}/users/${userId}/audit-logs`, { params });
};


// Get role policy document
export const getRolePolicy = (roleId: string): Promise<{ policy_document: string }> => {
  return apiGet<{ policy_document: string }>(`${baseUrl}/roles/${roleId}/policy`);
};

// Set role policy document
export const setRolePolicy = (roleId: string, policyDocument: string): Promise<API.Role> => {
  return apiPut<API.Role>(`${baseUrl}/roles/${roleId}/policy`, { policy_document: policyDocument });
};


/**
 * Get service account list
 */
export const getServiceAccounts = (params?: any): Promise<API.PaginatedResponse<API.ServiceAccount>> => {
  return apiGet<API.PaginatedResponse<API.ServiceAccount>>(`${baseUrl}/service-accounts`, { params });
};

/**
 * Get service account details
 */
export const getServiceAccountById = (id: string): Promise<API.ServiceAccount> => {
  return apiGet<API.ServiceAccount>(`${baseUrl}/service-accounts/${id}`);
};

/**
 * Create service account
 */
export const createServiceAccount = (data: API.CreateServiceAccountRequest): Promise<API.ServiceAccount> => {
  return apiPost<API.ServiceAccount>(`${baseUrl}/service-accounts`, data);
};

/**
 * Update service account
 */
export const updateServiceAccount = (id: string, data: API.UpdateServiceAccountRequest): Promise<API.ServiceAccount> => {
  return apiPut<API.ServiceAccount>(`${baseUrl}/service-accounts/${id}`, data);
};

/**
 * Update service account status
 */
export const updateServiceAccountStatus = (id: string, status: string): Promise<API.ServiceAccount> => {
  return apiPut<API.ServiceAccount>(`${baseUrl}/service-accounts/${id}/status`, { status });
};

/**
 * Delete service account
 */
export const deleteServiceAccount = (id: string): Promise<void> => {
  return apiDelete(`${baseUrl}/service-accounts/${id}`);
};

/**
 * Get service account access key list
 */
export const getServiceAccountAccessKeys = (serviceAccountId: string): Promise<API.ServiceAccountAccessKey[]> => {
  return apiGet<API.ServiceAccountAccessKey[]>(`${baseUrl}/service-accounts/${serviceAccountId}/access-keys`);
};

/**
 * Create service account access key
 */
export const createServiceAccountAccessKey = (serviceAccountId: string, data: API.CreateServiceAccountAccessKeyRequest): Promise<API.ServiceAccountAccessKey> => {
  return apiPost<API.ServiceAccountAccessKey>(`${baseUrl}/service-accounts/${serviceAccountId}/access-keys`, data);
};

/**
 * Update service account access key
 */
export const updateServiceAccountAccessKey = (serviceAccountId: string, keyId: string, data: API.UpdateServiceAccountAccessKeyRequest): Promise<API.ServiceAccountAccessKey> => {
  return apiPut<API.ServiceAccountAccessKey>(`${baseUrl}/service-accounts/${serviceAccountId}/access-keys/${keyId}`, data);
};

/**
 * Delete service account access key
 */
export const deleteServiceAccountAccessKey = (serviceAccountId: string, keyId: string): Promise<void> => {
  return apiDelete(`${baseUrl}/service-accounts/${serviceAccountId}/access-keys/${keyId}`);
};

/**
 * Get service account role list
 */
export const getServiceAccountRoles = (serviceAccountId: string): Promise<API.Role[]> => {
  return apiGet<API.Role[]>(`${baseUrl}/service-accounts/${serviceAccountId}/roles`);
};

/**
 * Assign roles to service account
 */
export const assignServiceAccountRoles = (serviceAccountId: string, data: API.ServiceAccountRoleAssignmentRequest): Promise<any> => {
  return apiPost<any>(`${baseUrl}/service-accounts/${serviceAccountId}/roles`, data);
};

/**
 * Get service account policy document
 */
export const getServiceAccountPolicy = (serviceAccountId: string): Promise<any> => {
  return apiGet<any>(`${baseUrl}/service-accounts/${serviceAccountId}/policy`);
};

/**
 * Set service account policy document
 */
export const setServiceAccountPolicy = (serviceAccountId: string, data: API.ServiceAccountPolicyRequest): Promise<API.ServiceAccount> => {
  return apiPut<API.ServiceAccount>(`${baseUrl}/service-accounts/${serviceAccountId}/policy`, data);
};

export const getLdapUsers = async (skipExisting: boolean = false): Promise<API.User[]> => {
  return apiGet<API.User[]>(`${baseUrl}/users/ldap-users`, { params: { skip_existing: skipExisting } });
};
