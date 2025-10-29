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
