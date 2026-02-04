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
export async function testOauthConnection(
  body: API.UpdateOAuthSettingsRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseServiceOAuthLoginURLResponse>(
    "/api/system/oauth-settings/test",
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

/** List skills Get a paginated list of skills with optional search and filters GET /api/system/skills */
export async function listSkills(
  params: API.listSkillsParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelSkill>("/api/system/skills", {
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

/** Create skill Create a new skill with optional initial content POST /api/system/skills */
export async function createSkill(
  body: API.CreateSkillRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelSkill>("/api/system/skills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get skill Get a skill by ID GET /api/system/skills/${param0} */
export async function getSkill(
  params: API.getSkillParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelSkill>(`/api/system/skills/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update skill Update skill name, description, category, and domain PUT /api/system/skills/${param0} */
export async function updateSkill(
  params: API.updateSkillParams,
  body: API.UpdateSkillRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelSkill>(`/api/system/skills/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete skill Delete a skill and its files DELETE /api/system/skills/${param0} */
export async function deleteSkill(
  params: API.deleteSkillParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(`/api/system/skills/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Create skill directory Create a subdirectory at the given path POST /api/system/skills/${param0}/dirs */
export async function createSkillDir(
  params: API.createSkillDirParams,
  body: API.CreateSkillDirRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/system/skills/${param0}/dirs`,
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

/** List skill file tree Get the full file tree (directories and .md/.txt files) for a skill GET /api/system/skills/${param0}/files */
export async function listSkillFilesTree(
  params: API.listSkillFilesTreeParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseArrayServiceSkillTreeNode>(
    `/api/system/skills/${param0}/files`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Get skill file content Get the content of a file under the skill (.md or .txt) GET /api/system/skills/${param0}/files/${param1} */
export async function getSkillFile(
  params: API.getSkillFileParams,
  options?: { [key: string]: any }
) {
  const { id: param0, path: param1, ...queryParams } = params;
  return request(`/api/system/skills/${param0}/files/${param1}`, {
    method: "GET",
    params: { ...queryParams },
    responseType: "text",
    ...(options || {}),
  }) as Promise<any>;
}

/** Put skill file Create or update a file under the skill (body: raw file content) PUT /api/system/skills/${param0}/files/${param1} */
export async function putSkillFile(
  params: API.putSkillFileParams,
  body: string,
  options?: { [key: string]: any }
) {
  const { id: param0, path: param1, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/system/skills/${param0}/files/${param1}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** Delete skill path Delete a file or directory; directories are removed recursively DELETE /api/system/skills/${param0}/files/${param1} */
export async function deleteSkillPath(
  params: API.deleteSkillPathParams,
  options?: { [key: string]: any }
) {
  const { id: param0, path: param1, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/system/skills/${param0}/files/${param1}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Move skill path Move or rename a file or directory (target must not exist) PUT /api/system/skills/${param0}/move-path */
export async function moveSkillPath(
  params: API.moveSkillPathParams,
  body: API.MoveSkillPathRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/system/skills/${param0}/move-path`,
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

/** Preview skill Get concatenated skill content (SKILL.md and other .md files) for preview GET /api/system/skills/${param0}/preview */
export async function previewSkill(
  params: API.previewSkillParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseSystemapiPreviewSkillResponse>(
    `/api/system/skills/${param0}/preview`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** List skill domains Get the list of registered skill domains GET /api/system/skills/domains */
export async function listSkillDomains(options?: { [key: string]: any }) {
  return request<API.ResponseArrayString>("/api/system/skills/domains", {
    method: "GET",
    ...(options || {}),
  });
}

/** Upload skill Create a skill from an uploaded .md or .zip file (parses SKILL.md frontmatter) POST /api/system/skills/upload */
export async function uploadSkill(
  body: {
    /** Category */
    category?: string;
    /** Domain */
    domain?: string;
  },
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.ResponseModelSkill>("/api/system/skills/upload", {
    method: "POST",
    data: formData,
    requestType: "form",
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
