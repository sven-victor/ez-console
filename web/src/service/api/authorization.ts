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

// @ts-ignore
/* eslint-disable */
import { request } from "@/service/client";

/** User login User login POST /api/authorization/auth/login */
export async function login(
  body: API.LoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseServiceLoginResponse>(
    "/api/authorization/auth/login",
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

/** User logout User logout POST /api/authorization/auth/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.ResponseString>("/api/authorization/auth/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** Get LDAP users Get LDAP users GET /api/authorization/ldap/users */
export async function getLdapUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLdapUsersParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseArrayModelUser>("/api/authorization/ldap/users", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Disable MFA Disable MFA POST /api/authorization/mfa/disable */
export async function disableMfa(options?: { [key: string]: any }) {
  return request<API.ResponseUtilMessageData>(
    "/api/authorization/mfa/disable",
    {
      method: "POST",
      ...(options || {}),
    }
  );
}

/** Enable MFA Enable MFA POST /api/authorization/mfa/enable */
export async function enableMfa(
  body: string,
  options?: { [key: string]: any }
) {
  return request<API.ResponseServiceEnableMFAResponse>(
    "/api/authorization/mfa/enable",
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

/** Verify and activate MFA Verify and activate MFA POST /api/authorization/mfa/verify */
export async function verifyAndActivateMfa(
  body: API.VerifyAndActivateMFARequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseUtilMessageData>("/api/authorization/mfa/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get a list of permissions Get a list of permissions GET /api/authorization/permissions */
export async function listPermissions(options?: { [key: string]: any }) {
  return request<API.ResponseArrayModelPermissionGroup>(
    "/api/authorization/permissions",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Get current user's information Get current user's information GET /api/authorization/profile */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.ResponseModelUser>("/api/authorization/profile", {
    method: "GET",
    ...(options || {}),
  });
}

/** Update current user's information Update current user's information PUT /api/authorization/profile */
export async function updateCurrentUser(
  body: API.UpdateCurrentUserRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelUser>("/api/authorization/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get current user's audit logs Get current user's audit logs GET /api/authorization/profile/audit-logs */
export async function getCurrentUserLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentUserLogsParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelAuditLog>(
    "/api/authorization/profile/audit-logs",
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

/** Change user password Change user password PUT /api/authorization/profile/password */
export async function changePassword(
  body: API.ChangePasswordRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseUtilMessageData>(
    "/api/authorization/profile/password",
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

/** Get all sessions for the user Get all sessions for the user GET /api/authorization/profile/sessions */
export async function getUserSessions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserSessionsParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseArrayServiceSessionInfo>(
    "/api/authorization/profile/sessions",
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

/** Terminate the specified session Terminate the specified session DELETE /api/authorization/profile/sessions/${param0} */
export async function terminateSession(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.terminateSessionParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/authorization/profile/sessions/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Terminate all sessions except the current one Terminate all sessions except the current one POST /api/authorization/profile/sessions/terminate-others */
export async function terminateOtherSessions(options?: { [key: string]: any }) {
  return request<API.ResponseUtilMessageData>(
    "/api/authorization/profile/sessions/terminate-others",
    {
      method: "POST",
      ...(options || {}),
    }
  );
}

/** Refresh user's JWT token Refresh user's JWT token POST /api/authorization/refresh */
export async function refreshToken(options?: { [key: string]: any }) {
  return request<API.ResponseAuthorizationapiTokenResponse>(
    "/api/authorization/refresh",
    {
      method: "POST",
      ...(options || {}),
    }
  );
}

/** Get a list of roles Get a list of roles GET /api/authorization/roles */
export async function listRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listRolesParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelRole>("/api/authorization/roles", {
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

/** Create a new role Create a new role POST /api/authorization/roles */
export async function createRole(
  body: API.CreateRoleRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelRole>("/api/authorization/roles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get a role by ID Get a role by ID GET /api/authorization/roles/${param0} */
export async function getRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelRole>(`/api/authorization/roles/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update a role Update a role PUT /api/authorization/roles/${param0} */
export async function updateRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateRoleParams,
  body: API.UpdateRoleRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelRole>(`/api/authorization/roles/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete a role Delete a role DELETE /api/authorization/roles/${param0} */
export async function deleteRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRoleParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/authorization/roles/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Assign permissions to a role Assign permissions to a role PUT /api/authorization/roles/${param0}/permissions */
export async function assignPermissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.assignPermissionsParams,
  body: API.AssignPermissionsRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/authorization/roles/${param0}/permissions`,
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

/** Get the policy document for a role Get the policy document for a role GET /api/authorization/roles/${param0}/policy */
export async function getRolePolicy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRolePolicyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelPolicyDocument>(
    `/api/authorization/roles/${param0}/policy`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Set the policy for a role Set the policy for a role PUT /api/authorization/roles/${param0}/policy */
export async function setRolePolicy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setRolePolicyParams,
  body: API.PolicyDocument,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelRole>(
    `/api/authorization/roles/${param0}/policy`,
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

/** Get service account list Get service account list GET /api/authorization/service-accounts */
export async function getServiceAccounts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getServiceAccountsParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelServiceAccount>(
    "/api/authorization/service-accounts",
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

/** Create service account Create service account POST /api/authorization/service-accounts */
export async function createServiceAccount(
  body: API.CreateServiceAccountRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelServiceAccount>(
    "/api/authorization/service-accounts",
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

/** Get service account by ID Get service account by ID GET /api/authorization/service-accounts/${param0} */
export async function getServiceAccountById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getServiceAccountByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelServiceAccount>(
    `/api/authorization/service-accounts/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Update service account Update service account PUT /api/authorization/service-accounts/${param0} */
export async function updateServiceAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateServiceAccountParams,
  body: API.UpdateServiceAccountRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelServiceAccount>(
    `/api/authorization/service-accounts/${param0}`,
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

/** Delete service account Delete service account DELETE /api/authorization/service-accounts/${param0} */
export async function deleteServiceAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteServiceAccountParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/authorization/service-accounts/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Get service account access keys Get service account access keys GET /api/authorization/service-accounts/${param0}/access-keys */
export async function getServiceAccountAccessKeys(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getServiceAccountAccessKeysParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseArrayModelServiceAccountAccessKey>(
    `/api/authorization/service-accounts/${param0}/access-keys`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Create service account access key Create service account access key POST /api/authorization/service-accounts/${param0}/access-keys */
export async function createServiceAccountAccessKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createServiceAccountAccessKeyParams,
  body: API.CreateServiceAccountAccessKeyRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseAuthorizationapiCreateServiceAccountAccessKeyResponse>(
    `/api/authorization/service-accounts/${param0}/access-keys`,
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

/** Update service account access key Update service account access key PUT /api/authorization/service-accounts/${param0}/access-keys/${param1} */
export async function updateServiceAccountAccessKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateServiceAccountAccessKeyParams,
  body: API.UpdateServiceAccountAccessKeyRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, keyId: param1, ...queryParams } = params;
  return request<API.ResponseModelServiceAccountAccessKey>(
    `/api/authorization/service-accounts/${param0}/access-keys/${param1}`,
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

/** Delete service account access key Delete service account access key DELETE /api/authorization/service-accounts/${param0}/access-keys/${param1} */
export async function deleteServiceAccountAccessKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteServiceAccountAccessKeyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, keyId: param1, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/authorization/service-accounts/${param0}/access-keys/${param1}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Get service account policy Get service account policy GET /api/authorization/service-accounts/${param0}/policy */
export async function getServiceAccountPolicy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getServiceAccountPolicyParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelPolicyDocument>(
    `/api/authorization/service-accounts/${param0}/policy`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Set service account policy Set service account policy PUT /api/authorization/service-accounts/${param0}/policy */
export async function setServiceAccountPolicy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setServiceAccountPolicyParams,
  body: API.SetServiceAccountPolicyRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelServiceAccount>(
    `/api/authorization/service-accounts/${param0}/policy`,
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

/** Get service account roles Get service account roles GET /api/authorization/service-accounts/${param0}/roles */
export async function getServiceAccountRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getServiceAccountRolesParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PaginationResponseModelRole>(
    `/api/authorization/service-accounts/${param0}/roles`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Assign roles to service account Assign roles to service account POST /api/authorization/service-accounts/${param0}/roles */
export async function assignServiceAccountRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.assignServiceAccountRolesParams,
  body: API.AssignServiceAccountRolesRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PaginationResponseModelRole>(
    `/api/authorization/service-accounts/${param0}/roles`,
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

/** Update service account status Update service account status PUT /api/authorization/service-accounts/${param0}/status */
export async function updateServiceAccountStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateServiceAccountStatusParams,
  body: API.UpdateServiceAccountStatusRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelServiceAccount>(
    `/api/authorization/service-accounts/${param0}/status`,
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

/** Get user list Get a list of users with optional filtering GET /api/authorization/users */
export async function listUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUsersParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelUser>("/api/authorization/users", {
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

/** Create a new user Create a new user POST /api/authorization/users */
export async function createUser(
  body: API.CreateUserRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelUser>("/api/authorization/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get user by ID Get a user by ID GET /api/authorization/users/${param0} */
export async function getUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelUser>(`/api/authorization/users/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update a user Update a user PUT /api/authorization/users/${param0} */
export async function updateUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserParams,
  body: API.UpdateUserRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelUser>(`/api/authorization/users/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete a user Delete a user DELETE /api/authorization/users/${param0} */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/authorization/users/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Get user's audit logs Get user's audit logs GET /api/authorization/users/${param0}/audit-logs */
export async function getUserLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserLogsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PaginationResponseModelAuditLog>(
    `/api/authorization/users/${param0}/audit-logs`,
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

/** Reset a user's password Reset a user's password PUT /api/authorization/users/${param0}/password */
export async function resetUserPassword(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resetUserPasswordParams,
  body: API.ResetUserPasswordRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseAuthorizationapiResetUserPasswordResponse>(
    `/api/authorization/users/${param0}/password`,
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

/** Restore a user Restore a user POST /api/authorization/users/${param0}/restore */
export async function restoreUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.restoreUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseString>(
    `/api/authorization/users/${param0}/restore`,
    {
      method: "POST",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Assign roles to a user Assign roles to a user POST /api/authorization/users/${param0}/roles */
export async function assignRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.assignRolesParams,
  body: API.AssignRolesRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/authorization/users/${param0}/roles`,
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

/** Update a user's status Update a user's status PUT /api/authorization/users/${param0}/status */
export async function updateUserStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserStatusParams,
  body: API.UpdateUserStatusRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelUser>(
    `/api/authorization/users/${param0}/status`,
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

/** Unlock a user Unlock a user POST /api/authorization/users/${param0}/unlock */
export async function unlockUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unlockUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/authorization/users/${param0}/unlock`,
    {
      method: "POST",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
