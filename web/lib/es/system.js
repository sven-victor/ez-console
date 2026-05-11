import { r as s } from "./client.js";
async function p(t, a) {
  return s("/api/ldap-settings/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function m(t, a) {
  return s(
    "/api/system/audit-logs",
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...t
      },
      ...a || {}
    }
  );
}
async function c(t) {
  return s("/api/system/base-settings", {
    method: "GET",
    ...t || {}
  });
}
async function u(t, a) {
  return s("/api/system/base-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function d(t) {
  return s(
    "/api/system/base-settings/clear-cache",
    {
      method: "POST",
      ...t || {}
    }
  );
}
async function y(t) {
  return s("/api/system/health", {
    method: "GET",
    ...t || {}
  });
}
async function l(t) {
  return s("/api/system/info", {
    method: "GET",
    ...t || {}
  });
}
async function h(t) {
  return s(
    "/api/system/ldap-settings",
    {
      method: "GET",
      ...t || {}
    }
  );
}
async function T(t, a) {
  return s("/api/system/ldap-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function g(t, a) {
  return s(
    "/api/system/ldap-settings/import",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: t,
      ...a || {}
    }
  );
}
async function f(t) {
  return s("/api/system/oauth-settings", {
    method: "GET",
    ...t || {}
  });
}
async function S(t, a) {
  return s("/api/system/oauth-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function P(t, a) {
  return s(
    "/api/system/oauth-settings/test",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: t,
      ...a || {}
    }
  );
}
async function k(t, a) {
  return s(
    "/api/system/oauth-settings/test-callback",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: t,
      ...a || {}
    }
  );
}
async function E(t, a) {
  return s(
    "/api/system/organizations",
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...t
      },
      ...a || {}
    }
  );
}
async function C(t, a) {
  return s("/api/system/organizations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function O(t, a) {
  const { id: n, ...e } = t;
  return s(
    `/api/system/organizations/${n}`,
    {
      method: "GET",
      params: { ...e },
      ...a || {}
    }
  );
}
async function $(t, a, n) {
  const { id: e, ...i } = t;
  return s(
    `/api/system/organizations/${e}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      params: { ...i },
      data: a,
      ...n || {}
    }
  );
}
async function j(t, a) {
  const { id: n, ...e } = t;
  return s(
    `/api/system/organizations/${n}`,
    {
      method: "DELETE",
      params: { ...e },
      ...a || {}
    }
  );
}
async function q(t, a) {
  const { id: n, ...e } = t;
  return s(
    `/api/system/organizations/${n}/users`,
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...e
      },
      ...a || {}
    }
  );
}
async function z(t, a, n) {
  const { id: e, ...i } = t;
  return s(
    `/api/system/organizations/${e}/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      params: { ...i },
      data: a,
      ...n || {}
    }
  );
}
async function G(t, a) {
  const { id: n, user_id: e, ...i } = t;
  return s(
    `/api/system/organizations/${n}/users/${e}`,
    {
      method: "DELETE",
      params: { ...i },
      ...a || {}
    }
  );
}
async function U(t, a, n) {
  const { id: e, user_id: i, ...o } = t;
  return s(
    `/api/system/organizations/${e}/users/${i}/roles`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      params: { ...o },
      data: a,
      ...n || {}
    }
  );
}
async function b(t, a) {
  const { user_id: n, ...e } = t;
  return s(
    `/api/system/organizations/user/${n}`,
    {
      method: "GET",
      params: { ...e },
      ...a || {}
    }
  );
}
async function _(t) {
  return s(
    "/api/system/security-settings",
    {
      method: "GET",
      ...t || {}
    }
  );
}
async function L(t, a) {
  return s(
    "/api/system/security-settings",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      data: t,
      ...a || {}
    }
  );
}
async function D(t, a) {
  return s(
    "/api/system/security-settings/check-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: t,
      ...a || {}
    }
  );
}
async function v(t) {
  return s("/api/system/site", {
    method: "GET",
    ...t || {}
  });
}
async function F(t, a) {
  return s("/api/system/skills", {
    method: "GET",
    params: {
      // current has a default value: 1
      current: "1",
      // page_size has a default value: 10
      page_size: "10",
      ...t
    },
    ...a || {}
  });
}
async function w(t, a) {
  return s("/api/system/skills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function B(t, a) {
  const { id: n, ...e } = t;
  return s(`/api/system/skills/${n}`, {
    method: "GET",
    params: { ...e },
    ...a || {}
  });
}
async function A(t, a, n) {
  const { id: e, ...i } = t;
  return s(`/api/system/skills/${e}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    params: { ...i },
    data: a,
    ...n || {}
  });
}
async function x(t, a) {
  const { id: n, ...e } = t;
  return s(`/api/system/skills/${n}`, {
    method: "DELETE",
    params: { ...e },
    ...a || {}
  });
}
async function I(t, a) {
  const { id: n, ...e } = t;
  return s(
    `/api/system/skills/${n}/ai-tool-bindings`,
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...e
      },
      ...a || {}
    }
  );
}
async function J(t, a, n) {
  const { id: e, ...i } = t;
  return s(
    `/api/system/skills/${e}/ai-tool-bindings`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      params: { ...i },
      data: a,
      ...n || {}
    }
  );
}
async function M(t, a, n) {
  const { id: e, ...i } = t;
  return s(
    `/api/system/skills/${e}/dirs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      params: { ...i },
      data: a,
      ...n || {}
    }
  );
}
async function N(t, a) {
  const { id: n, ...e } = t;
  return s(
    `/api/system/skills/${n}/files`,
    {
      method: "GET",
      params: { ...e },
      ...a || {}
    }
  );
}
async function R(t, a) {
  const { id: n, path: e, ...i } = t;
  return s(`/api/system/skills/${n}/files/${e}`, {
    method: "GET",
    params: { ...i },
    responseType: "text",
    ...a || {}
  });
}
async function H(t, a, n) {
  const { id: e, path: i, ...o } = t;
  return s(
    `/api/system/skills/${e}/files/${i}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream"
      },
      params: { ...o },
      data: a,
      ...n || {}
    }
  );
}
async function K(t, a) {
  const { id: n, path: e, ...i } = t;
  return s(
    `/api/system/skills/${n}/files/${e}`,
    {
      method: "DELETE",
      params: { ...i },
      ...a || {}
    }
  );
}
async function Q(t, a, n) {
  const { id: e, ...i } = t;
  return s(
    `/api/system/skills/${e}/move-path`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      params: { ...i },
      data: a,
      ...n || {}
    }
  );
}
async function V(t, a) {
  const { id: n, ...e } = t;
  return s(
    `/api/system/skills/${n}/preview`,
    {
      method: "GET",
      params: { ...e },
      ...a || {}
    }
  );
}
async function W(t, a, n) {
  const { id: e, ...i } = t;
  return s(
    `/api/system/skills/${e}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      params: { ...i },
      data: a,
      ...n || {}
    }
  );
}
async function X(t, a) {
  return s("/api/system/skills/clone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function Y(t) {
  return s("/api/system/skills/domains", {
    method: "GET",
    ...t || {}
  });
}
async function Z(t, a, n) {
  const e = new FormData();
  return a && e.append("file", a), Object.keys(t).forEach((i) => {
    const o = t[i];
    o != null && (typeof o == "object" && !(o instanceof File) ? o instanceof Array ? o.forEach((r) => e.append(i, r || "")) : e.append(i, JSON.stringify(o)) : e.append(i, o));
  }), s("/api/system/skills/upload", {
    method: "POST",
    data: e,
    requestType: "form",
    ...n || {}
  });
}
async function tt(t) {
  return s("/api/system/smtp-settings", {
    method: "GET",
    ...t || {}
  });
}
async function at(t, a) {
  return s("/api/system/smtp-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function st(t, a) {
  return s(
    "/api/system/smtp-settings/test",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: t,
      ...a || {}
    }
  );
}
async function et(t) {
  return s("/api/system/task-settings", {
    method: "GET",
    ...t || {}
  });
}
async function nt(t, a) {
  return s("/api/system/task-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function it(t) {
  return s(
    "/api/system/task-settings/fields",
    {
      method: "GET",
      ...t || {}
    }
  );
}
async function ot(t) {
  return s(
    "/api/system/task-settings/log-storage-backends",
    {
      method: "GET",
      ...t || {}
    }
  );
}
async function rt(t, a) {
  return s("/api/system/toolsets", {
    method: "GET",
    params: {
      // current has a default value: 1
      current: "1",
      // page_size has a default value: 10
      page_size: "10",
      ...t
    },
    ...a || {}
  });
}
async function pt(t, a) {
  return s("/api/system/toolsets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function mt(t, a) {
  const { id: n, ...e } = t;
  return s(`/api/system/toolsets/${n}`, {
    method: "GET",
    params: { ...e },
    ...a || {}
  });
}
async function ct(t, a, n) {
  const { id: e, ...i } = t;
  return s(`/api/system/toolsets/${e}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    params: { ...i },
    data: a,
    ...n || {}
  });
}
async function ut(t, a) {
  const { id: n, ...e } = t;
  return s(
    `/api/system/toolsets/${n}`,
    {
      method: "DELETE",
      params: { ...e },
      ...a || {}
    }
  );
}
async function dt(t, a, n) {
  const { id: e, ...i } = t;
  return s(
    `/api/system/toolsets/${e}/call`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      params: { ...i },
      data: a,
      ...n || {}
    }
  );
}
async function yt(t, a, n) {
  const { id: e, ...i } = t;
  return s(
    `/api/system/toolsets/${e}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      params: { ...i },
      data: a,
      ...n || {}
    }
  );
}
async function lt(t, a) {
  const { id: n, ...e } = t;
  return s(
    `/api/system/toolsets/${n}/test`,
    {
      method: "POST",
      params: { ...e },
      ...a || {}
    }
  );
}
async function ht(t, a) {
  const { id: n, ...e } = t;
  return s(
    `/api/system/toolsets/${n}/tools`,
    {
      method: "GET",
      params: { ...e },
      ...a || {}
    }
  );
}
async function Tt(t) {
  return s(
    "/api/system/toolsets/types",
    {
      method: "GET",
      ...t || {}
    }
  );
}
const ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addUserToOrganization: z,
  callTool: dt,
  checkPasswordComplexity: D,
  clearSiteCache: d,
  cloneSkill: X,
  createOrganization: C,
  createSkill: w,
  createSkillDir: M,
  createToolSet: pt,
  deleteOrganization: j,
  deleteSkill: x,
  deleteSkillPath: K,
  deleteToolSet: ut,
  getAuditLogs: m,
  getLdapSettings: h,
  getOauthSettings: f,
  getOrganization: O,
  getSecuritySettings: _,
  getSiteConfig: v,
  getSkill: B,
  getSkillFile: R,
  getSmtpSettings: tt,
  getSystemBaseSettings: c,
  getSystemInfo: l,
  getTaskSettingFields: it,
  getTaskSettings: et,
  getToolSet: mt,
  getToolSetTools: ht,
  getToolSetTypeDefinitions: Tt,
  getUserOrganizations: b,
  healthCheck: y,
  importLdapUsers: g,
  listLogStorageBackends: ot,
  listOrganizationUsers: q,
  listOrganizations: E,
  listSkillAiToolBindings: I,
  listSkillDomains: Y,
  listSkillFilesTree: N,
  listSkills: F,
  listToolSets: rt,
  moveSkillPath: Q,
  previewSkill: V,
  putSkillFile: H,
  removeUserFromOrganization: G,
  replaceSkillAiToolBindings: J,
  testLdapConnection: p,
  testOauthCallback: k,
  testOauthConnection: P,
  testSmtpConnection: st,
  testToolSet: lt,
  updateLdapSettings: T,
  updateOauthSettings: S,
  updateOrganization: $,
  updateSecuritySettings: L,
  updateSkill: A,
  updateSkillStatus: W,
  updateSmtpSettings: at,
  updateSystemBaseSettings: u,
  updateTaskSettings: nt,
  updateToolSet: ct,
  updateToolSetStatus: yt,
  updateUserOrganizationRoles: U,
  uploadSkill: Z
}, Symbol.toStringTag, { value: "Module" }));
export {
  ft as a,
  q as b,
  C as c,
  j as d,
  z as e,
  U as f,
  O as g,
  E as l,
  G as r,
  $ as u
};
