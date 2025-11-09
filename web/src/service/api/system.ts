// @ts-ignore
/* eslint-disable */
import { request } from "@/service/client";

/** Test LDAP connection Test LDAP connection POST /api/ldap-settings/test */
export async function testLdapConnection(
  body: API.LDAPTestRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelLDAPTestResponse>("/api/ldap-settings/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get audit logs Get all audit logs, supports multiple filtering conditions GET /api/system/audit-logs */
export async function getAuditLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuditLogsParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelAuditLog>(
    "/api/system/audit-logs",
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Get all system settings Get all system settings GET /api/system/base-settings */
export async function getSystemBaseSettings(options?: { [key: string]: any }) {
  return request<API.ResponseModelSystemSettings>("/api/system/base-settings", {
    method: "GET",
    ...(options || {}),
  });
}

/** Batch update system settings Batch update system settings PUT /api/system/base-settings */
export async function updateSystemBaseSettings(
  body: API.SystemSettings,
  options?: { [key: string]: any }
) {
  return request<API.ResponseUtilMessageData>("/api/system/base-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Health check Check the health of the system GET /api/system/health */
export async function healthCheck(options?: { [key: string]: any }) {
  return request<API.ResponseServiceHealthResult>("/api/system/health", {
    method: "GET",
    ...(options || {}),
  });
}

/** Get system information Get system information GET /api/system/info */
export async function getSystemInfo(options?: { [key: string]: any }) {
  return request<API.ResponseServiceSystemInfo>("/api/system/info", {
    method: "GET",
    ...(options || {}),
  });
}

/** Get LDAP settings Get LDAP settings GET /api/system/ldap-settings */
export async function getLdapSettings(options?: { [key: string]: any }) {
  return request<API.ResponseSystemapiLDAPSettings>(
    "/api/system/ldap-settings",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Update LDAP settings Update LDAP settings PUT /api/system/ldap-settings */
export async function updateLdapSettings(
  body: API.UpdateLDAPSettingsRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseUtilMessageData>("/api/system/ldap-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Import LDAP users Import LDAP users POST /api/system/ldap-settings/import */
export async function importLdapUsers(
  body: API.ImportLDAPUsersRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseArrayModelUser>(
    "/api/system/ldap-settings/import",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Get OAuth settings Get OAuth settings GET /api/system/oauth-settings */
export async function getOauthSettings(options?: { [key: string]: any }) {
  return request<API.ResponseModelOAuthSettings>("/api/system/oauth-settings", {
    method: "GET",
    ...(options || {}),
  });
}

/** Update OAuth settings Update OAuth settings PUT /api/system/oauth-settings */
export async function updateOauthSettings(
  body: API.UpdateOAuthSettingsRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelOAuthSettings>("/api/system/oauth-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Test OAuth connection Test OAuth connection POST /api/system/oauth-settings/test */
export async function testOauthConnection(options?: { [key: string]: any }) {
  return request<API.ResponseServiceOAuthLoginURLResponse>(
    "/api/system/oauth-settings/test",
    {
      method: "POST",
      ...(options || {}),
    }
  );
}

/** Test OAuth callback Test OAuth callback POST /api/system/oauth-settings/test-callback */
export async function testOauthCallback(options?: { [key: string]: any }) {
  return request<API.ResponseServiceTestOAuthCallbackResponse>(
    "/api/system/oauth-settings/test-callback",
    {
      method: "POST",
      ...(options || {}),
    }
  );
}

/** Get a list of organizations Get a list of organizations GET /api/system/organizations */
export async function listOrganizations(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listOrganizationsParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelOrganization>(
    "/api/system/organizations",
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Create a new organization Create a new organization POST /api/system/organizations */
export async function createOrganization(
  body: API.CreateOrganizationRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelOrganization>("/api/system/organizations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get an organization by ID Get an organization by ID GET /api/system/organizations/${param0} */
export async function getOrganization(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrganizationParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelOrganization>(
    `/api/system/organizations/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Update an organization Update an organization PUT /api/system/organizations/${param0} */
export async function updateOrganization(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateOrganizationParams,
  body: API.UpdateOrganizationRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelOrganization>(
    `/api/system/organizations/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** Delete an organization Delete an organization DELETE /api/system/organizations/${param0} */
export async function deleteOrganization(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteOrganizationParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/system/organizations/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** List organization users List users in an organization with their roles GET /api/system/organizations/${param0}/users */
export async function listOrganizationUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listOrganizationUsersParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PaginationResponseServiceOrganizationUser>(
    `/api/system/organizations/${param0}/users`,
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** Add user to organization Add a user to an organization with specified roles POST /api/system/organizations/${param0}/users */
export async function addUserToOrganization(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addUserToOrganizationParams,
  body: API.AddUserToOrganizationRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/system/organizations/${param0}/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** Remove user from organization Remove a user from an organization and remove their roles in that organization DELETE /api/system/organizations/${param0}/users/${param1} */
export async function removeUserFromOrganization(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeUserFromOrganizationParams,
  options?: { [key: string]: any }
) {
  const { id: param0, user_id: param1, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/system/organizations/${param0}/users/${param1}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Update user organization roles Update a user's roles in an organization PUT /api/system/organizations/${param0}/users/${param1}/roles */
export async function updateUserOrganizationRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserOrganizationRolesParams,
  body: API.UpdateUserOrganizationRolesRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, user_id: param1, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/system/organizations/${param0}/users/${param1}/roles`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** Get user organizations Get all organizations a user belongs to GET /api/system/organizations/user/${param0} */
export async function getUserOrganizations(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserOrganizationsParams,
  options?: { [key: string]: any }
) {
  const { user_id: param0, ...queryParams } = params;
  return request<API.ResponseArrayModelOrganization>(
    `/api/system/organizations/user/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Get security settings Get security settings GET /api/system/security-settings */
export async function getSecuritySettings(options?: { [key: string]: any }) {
  return request<API.ResponseModelSecuritySettings>(
    "/api/system/security-settings",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Update security settings Update security settings PUT /api/system/security-settings */
export async function updateSecuritySettings(
  body: API.SecuritySettings,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelSecuritySettings>(
    "/api/system/security-settings",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Check password complexity Check password complexity POST /api/system/security-settings/check-password */
export async function checkPasswordComplexity(
  body: API.CheckPasswordComplexityRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseSystemapiCheckPasswordComplexityResponse>(
    "/api/system/security-settings/check-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Get site config Get site config GET /api/system/site */
export async function getSiteConfig(options?: { [key: string]: any }) {
  return request<API.ResponseServiceSiteConfig>("/api/system/site", {
    method: "GET",
    ...(options || {}),
  });
}

/** Get SMTP settings Retrieves the current SMTP settings. GET /api/system/smtp-settings */
export async function getSmtpSettings(options?: { [key: string]: any }) {
  return request<API.ResponseModelSMTPSettings>("/api/system/smtp-settings", {
    method: "GET",
    ...(options || {}),
  });
}

/** Update SMTP settings Updates the SMTP settings. PUT /api/system/smtp-settings */
export async function updateSmtpSettings(
  body: API.SMTPSettings,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelSMTPSettings>("/api/system/smtp-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Test SMTP connection Sends a test email to the specified recipient using the provided or saved SMTP settings. POST /api/system/smtp-settings/test */
export async function testSmtpConnection(
  body: API.SMTPTestRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseSystemapiSMTPTestResponse>(
    "/api/system/smtp-settings/test",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** List toolsets List toolsets with pagination and search GET /api/system/toolsets */
export async function listToolSets(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listToolSetsParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelToolSet>("/api/system/toolsets", {
    method: "GET",
    params: {
      // current has a default value: 1
      current: "1",
      // page_size has a default value: 10
      page_size: "10",

      ...params,
    },
    ...(options || {}),
  });
}

/** Create toolset Create a new toolset POST /api/system/toolsets */
export async function createToolSet(
  body: API.CreateToolSetRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelToolSet>("/api/system/toolsets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get toolset Get a toolset by ID GET /api/system/toolsets/${param0} */
export async function getToolSet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getToolSetParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelToolSet>(`/api/system/toolsets/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update toolset Update a toolset PUT /api/system/toolsets/${param0} */
export async function updateToolSet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateToolSetParams,
  body: API.UpdateToolSetRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelToolSet>(`/api/system/toolsets/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete toolset Delete a toolset DELETE /api/system/toolsets/${param0} */
export async function deleteToolSet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteToolSetParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/system/toolsets/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Update toolset status Update a toolset's status PUT /api/system/toolsets/${param0}/status */
export async function updateToolSetStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateToolSetStatusParams,
  body: API.UpdateToolSetStatusRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelToolSet>(
    `/api/system/toolsets/${param0}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** Test toolset Test a toolset connection POST /api/system/toolsets/${param0}/test */
export async function testToolSet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testToolSetParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/system/toolsets/${param0}/test`,
    {
      method: "POST",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Get toolset tools Get tools from a toolset GET /api/system/toolsets/${param0}/tools */
export async function getToolSetTools(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getToolSetToolsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseArraySystemapiTool>(
    `/api/system/toolsets/${param0}/tools`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Get toolset type definitions Get the type definitions for toolsets GET /api/system/toolsets/types */
export async function getToolSetTypeDefinitions(options?: {
  [key: string]: any;
}) {
  return request<API.ResponseArrayServiceToolSetTypeDefinition>(
    "/api/system/toolsets/types",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
