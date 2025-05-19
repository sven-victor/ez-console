import { apiGet, apiPost, apiPut } from './client';


const baseUrl = '/system';

// Get security settings
export const getSecuritySettings = (): Promise<API.SecuritySettings> => {
  return apiGet<API.SecuritySettings>(`${baseUrl}/security-settings`);
};

// Update security settings
export const updateSecuritySettings = (settings: API.SecuritySettings): Promise<void> => {
  return apiPut<void>(`${baseUrl}/security-settings`, settings);
};

// Get base settings
export const getSystemBaseSettings = (): Promise<API.SystemBaseSettings> => {
  return apiGet<API.SystemBaseSettings>(`${baseUrl}/base-settings`);
};

// Update base settings
export const updateSystemBaseSettings = (settings: API.SystemBaseSettings): Promise<void> => {
  return apiPut<void>(`${baseUrl}/base-settings`, settings);
};

// Get OAuth settings
export const getOAuthSettings = (): Promise<API.OAuthSettings> => {
  return apiGet<API.OAuthSettings>(`${baseUrl}/oauth-settings`);
};

// Update OAuth settings
export const updateOAuthSettings = (settings: API.OAuthSettings): Promise<void> => {
  return apiPut<void>(`${baseUrl}/oauth-settings`, settings);
};

// Test OAuth connection
export const testOAuthConnection = (settings: API.OAuthSettings): Promise<API.OAuthLoginURLResponse> => {
  return apiPost<API.OAuthLoginURLResponse>(`${baseUrl}/oauth-settings/test`, settings);
};

// Test OAuth callback
export const testOAuthCallback = (settings: API.OAuthCallbackRequest): Promise<API.TestOAuthCallbackResponse> => {
  return apiPost<API.TestOAuthCallbackResponse>(`${baseUrl}/oauth-settings/test-callback`, settings);
};

// Check password complexity
export const checkPasswordComplexity = (password: string): Promise<{ is_valid: boolean }> => {
  return apiPost<{ is_valid: boolean }>(`${baseUrl}/security-settings/check-password`, { password });
};

// Get all audit logs (for administrators)
export const getAllAuditLogs = async (params?: API.PaginationRequest & API.AuditLogFilters): Promise<API.PaginationResponse<API.AuditLog>> => {
  return apiGet<API.PaginationResponse<API.AuditLog>>(`${baseUrl}/audit-logs`, { params });
};



// Get site config
export const getSiteConfig = async (): Promise<API.SiteConfig> => {
  return apiGet<API.SiteConfig>(`${baseUrl}/site`);
};

// LDAP settings related interfaces
export const getLDAPSettings = () => {
  return apiGet<API.LDAPSettings>(`${baseUrl}/ldap-settings`);
};

export const updateLDAPSettings = (data: API.LDAPSettings) => {
  return apiPut<void>(`${baseUrl}/ldap-settings`, data);
};

export const testLDAPConnection = (data: API.LDAPTestRequest) => {
  return apiPost<API.LDAPTestResponse>(`${baseUrl}/ldap-settings/test`, data);
};

export const importLDAPUsers = (data: API.ImportLDAPUsersRequest = {}) => {
  return apiPost<API.ImportLDAPUsersResponse[]>(`${baseUrl}/ldap-settings/import`, data);
};

// SMTP settings
export const getSMTPSettings = (): Promise<API.SMTPSettings> => {
  return apiGet<API.SMTPSettings>(`${baseUrl}/smtp-settings`);
};

export const updateSMTPSettings = (settings: API.SMTPSettings): Promise<void> => {
  return apiPut<void>(`${baseUrl}/smtp-settings`, settings);
};

export const testSMTPConnection = (data: API.SMTPTestRequest): Promise<API.SMTPTestResponse> => {
  return apiPost<API.SMTPTestResponse>(`${baseUrl}/smtp-settings/test`, data);
};
