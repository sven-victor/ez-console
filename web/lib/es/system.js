import { r as e } from "./client.js";
async function p(t, a) {
  return e("/api/ldap-settings/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function m(t, a) {
  return e(
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
  return e("/api/system/base-settings", {
    method: "GET",
    ...t || {}
  });
}
async function u(t, a) {
  return e("/api/system/base-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function y(t) {
  return e(
    "/api/system/base-settings/clear-cache",
    {
      method: "POST",
      ...t || {}
    }
  );
}
async function d(t) {
  return e("/api/system/health", {
    method: "GET",
    ...t || {}
  });
}
async function l(t) {
  return e("/api/system/info", {
    method: "GET",
    ...t || {}
  });
}
async function h(t) {
  return e(
    "/api/system/ldap-settings",
    {
      method: "GET",
      ...t || {}
    }
  );
}
async function T(t, a) {
  return e("/api/system/ldap-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function f(t, a) {
  return e(
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
async function g(t) {
  return e("/api/system/oauth-settings", {
    method: "GET",
    ...t || {}
  });
}
async function S(t, a) {
  return e("/api/system/oauth-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function P(t, a) {
  return e(
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
async function E(t, a) {
  return e(
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
async function k(t, a) {
  return e(
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
  return e("/api/system/organizations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function j(t, a) {
  const { id: n, ...s } = t;
  return e(
    `/api/system/organizations/${n}`,
    {
      method: "GET",
      params: { ...s },
      ...a || {}
    }
  );
}
async function O(t, a, n) {
  const { id: s, ...i } = t;
  return e(
    `/api/system/organizations/${s}`,
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
async function $(t, a) {
  const { id: n, ...s } = t;
  return e(
    `/api/system/organizations/${n}`,
    {
      method: "DELETE",
      params: { ...s },
      ...a || {}
    }
  );
}
async function q(t, a) {
  const { id: n, ...s } = t;
  return e(
    `/api/system/organizations/${n}/users`,
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...s
      },
      ...a || {}
    }
  );
}
async function G(t, a, n) {
  const { id: s, ...i } = t;
  return e(
    `/api/system/organizations/${s}/users`,
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
async function z(t, a) {
  const { id: n, user_id: s, ...i } = t;
  return e(
    `/api/system/organizations/${n}/users/${s}`,
    {
      method: "DELETE",
      params: { ...i },
      ...a || {}
    }
  );
}
async function U(t, a, n) {
  const { id: s, user_id: i, ...r } = t;
  return e(
    `/api/system/organizations/${s}/users/${i}/roles`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      params: { ...r },
      data: a,
      ...n || {}
    }
  );
}
async function L(t, a) {
  const { user_id: n, ...s } = t;
  return e(
    `/api/system/organizations/user/${n}`,
    {
      method: "GET",
      params: { ...s },
      ...a || {}
    }
  );
}
async function R(t, a) {
  return e(
    "/api/system/rate-limit-rules",
    {
      method: "GET",
      params: {
        ...t
      },
      ...a || {}
    }
  );
}
async function b(t, a) {
  return e(
    "/api/system/rate-limit-rules",
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
async function _(t, a) {
  const { id: n, ...s } = t;
  return e(
    `/api/system/rate-limit-rules/${n}`,
    {
      method: "GET",
      params: { ...s },
      ...a || {}
    }
  );
}
async function D(t, a, n) {
  const { id: s, ...i } = t;
  return e(
    `/api/system/rate-limit-rules/${s}`,
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
async function v(t, a) {
  const { id: n, ...s } = t;
  return e(
    `/api/system/rate-limit-rules/${n}`,
    {
      method: "DELETE",
      params: { ...s },
      ...a || {}
    }
  );
}
async function F(t) {
  return e(
    "/api/system/rate-limit-settings",
    {
      method: "GET",
      ...t || {}
    }
  );
}
async function w(t, a) {
  return e(
    "/api/system/rate-limit-settings",
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
async function B(t, a) {
  return e(
    "/api/system/rate-limit/effective",
    {
      method: "GET",
      params: {
        ...t
      },
      ...a || {}
    }
  );
}
async function A(t, a) {
  return e(
    "/api/system/rate-limit/reset",
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
async function x(t) {
  return e(
    "/api/system/security-settings",
    {
      method: "GET",
      ...t || {}
    }
  );
}
async function I(t, a) {
  return e(
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
async function J(t, a) {
  return e(
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
async function M(t) {
  return e("/api/system/site", {
    method: "GET",
    ...t || {}
  });
}
async function N(t, a) {
  return e("/api/system/skills", {
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
async function H(t, a) {
  return e("/api/system/skills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function K(t, a) {
  const { id: n, ...s } = t;
  return e(`/api/system/skills/${n}`, {
    method: "GET",
    params: { ...s },
    ...a || {}
  });
}
async function Q(t, a, n) {
  const { id: s, ...i } = t;
  return e(`/api/system/skills/${s}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    params: { ...i },
    data: a,
    ...n || {}
  });
}
async function V(t, a) {
  const { id: n, ...s } = t;
  return e(`/api/system/skills/${n}`, {
    method: "DELETE",
    params: { ...s },
    ...a || {}
  });
}
async function W(t, a) {
  const { id: n, ...s } = t;
  return e(
    `/api/system/skills/${n}/ai-tool-bindings`,
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...s
      },
      ...a || {}
    }
  );
}
async function X(t, a, n) {
  const { id: s, ...i } = t;
  return e(
    `/api/system/skills/${s}/ai-tool-bindings`,
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
async function Y(t, a, n) {
  const { id: s, ...i } = t;
  return e(
    `/api/system/skills/${s}/dirs`,
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
async function Z(t, a) {
  const { id: n, ...s } = t;
  return e(
    `/api/system/skills/${n}/files`,
    {
      method: "GET",
      params: { ...s },
      ...a || {}
    }
  );
}
async function tt(t, a) {
  const { id: n, path: s, ...i } = t;
  return e(`/api/system/skills/${n}/files/${s}`, {
    method: "GET",
    params: { ...i },
    responseType: "text",
    ...a || {}
  });
}
async function at(t, a, n) {
  const { id: s, path: i, ...r } = t;
  return e(
    `/api/system/skills/${s}/files/${i}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream"
      },
      params: { ...r },
      data: a,
      ...n || {}
    }
  );
}
async function et(t, a) {
  const { id: n, path: s, ...i } = t;
  return e(
    `/api/system/skills/${n}/files/${s}`,
    {
      method: "DELETE",
      params: { ...i },
      ...a || {}
    }
  );
}
async function st(t, a, n) {
  const { id: s, ...i } = t;
  return e(
    `/api/system/skills/${s}/move-path`,
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
async function nt(t, a) {
  const { id: n, ...s } = t;
  return e(
    `/api/system/skills/${n}/preview`,
    {
      method: "GET",
      params: { ...s },
      ...a || {}
    }
  );
}
async function it(t, a, n) {
  const { id: s, ...i } = t;
  return e(
    `/api/system/skills/${s}/status`,
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
async function rt(t, a) {
  return e("/api/system/skills/clone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function ot(t) {
  return e("/api/system/skills/domains", {
    method: "GET",
    ...t || {}
  });
}
async function pt(t, a, n) {
  const s = new FormData();
  return a && s.append("file", a), Object.keys(t).forEach((i) => {
    const r = t[i];
    r != null && (typeof r == "object" && !(r instanceof File) ? r instanceof Array ? r.forEach((o) => s.append(i, o || "")) : s.append(
      i,
      new Blob([JSON.stringify(r)], { type: "application/json" })
    ) : s.append(i, r));
  }), e("/api/system/skills/upload", {
    method: "POST",
    data: s,
    requestType: "form",
    ...n || {}
  });
}
async function mt(t) {
  return e("/api/system/smtp-settings", {
    method: "GET",
    ...t || {}
  });
}
async function ct(t, a) {
  return e("/api/system/smtp-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function ut(t) {
  return e(
    "/api/system/smtp-settings/fields",
    {
      method: "GET",
      ...t || {}
    }
  );
}
async function yt(t, a) {
  return e(
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
async function dt(t) {
  return e("/api/system/task-settings", {
    method: "GET",
    ...t || {}
  });
}
async function lt(t, a) {
  return e("/api/system/task-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function ht(t) {
  return e(
    "/api/system/task-settings/fields",
    {
      method: "GET",
      ...t || {}
    }
  );
}
async function Tt(t) {
  return e(
    "/api/system/task-settings/log-storage-backends",
    {
      method: "GET",
      ...t || {}
    }
  );
}
async function ft(t, a) {
  return e("/api/system/toolsets", {
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
async function gt(t, a) {
  return e("/api/system/toolsets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function St(t, a) {
  const { id: n, ...s } = t;
  return e(`/api/system/toolsets/${n}`, {
    method: "GET",
    params: { ...s },
    ...a || {}
  });
}
async function Pt(t, a, n) {
  const { id: s, ...i } = t;
  return e(`/api/system/toolsets/${s}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    params: { ...i },
    data: a,
    ...n || {}
  });
}
async function Et(t, a) {
  const { id: n, ...s } = t;
  return e(
    `/api/system/toolsets/${n}`,
    {
      method: "DELETE",
      params: { ...s },
      ...a || {}
    }
  );
}
async function kt(t, a, n) {
  const { id: s, ...i } = t;
  return e(
    `/api/system/toolsets/${s}/call`,
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
async function Ct(t, a, n) {
  const { id: s, ...i } = t;
  return e(
    `/api/system/toolsets/${s}/status`,
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
async function jt(t, a) {
  const { id: n, ...s } = t;
  return e(
    `/api/system/toolsets/${n}/test`,
    {
      method: "POST",
      params: { ...s },
      ...a || {}
    }
  );
}
async function Ot(t, a) {
  const { id: n, ...s } = t;
  return e(
    `/api/system/toolsets/${n}/tools`,
    {
      method: "GET",
      params: { ...s },
      ...a || {}
    }
  );
}
async function $t(t) {
  return e(
    "/api/system/toolsets/types",
    {
      method: "GET",
      ...t || {}
    }
  );
}
const Gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addUserToOrganization: G,
  callTool: kt,
  checkPasswordComplexity: J,
  clearSiteCache: y,
  cloneSkill: rt,
  createOrganization: C,
  createRateLimitRule: b,
  createSkill: H,
  createSkillDir: Y,
  createToolSet: gt,
  deleteOrganization: $,
  deleteRateLimitRule: v,
  deleteSkill: V,
  deleteSkillPath: et,
  deleteToolSet: Et,
  getAuditLogs: m,
  getLdapSettings: h,
  getOauthSettings: g,
  getOrganization: j,
  getRateLimitEffective: B,
  getRateLimitRule: _,
  getRateLimitSettings: F,
  getSecuritySettings: x,
  getSiteConfig: M,
  getSkill: K,
  getSkillFile: tt,
  getSmtpSettingFields: ut,
  getSmtpSettings: mt,
  getSystemBaseSettings: c,
  getSystemInfo: l,
  getTaskSettingFields: ht,
  getTaskSettings: dt,
  getToolSet: St,
  getToolSetTools: Ot,
  getToolSetTypeDefinitions: $t,
  getUserOrganizations: L,
  healthCheck: d,
  importLdapUsers: f,
  listLogStorageBackends: Tt,
  listOrganizationUsers: q,
  listOrganizations: k,
  listRateLimitRules: R,
  listSkillAiToolBindings: W,
  listSkillDomains: ot,
  listSkillFilesTree: Z,
  listSkills: N,
  listToolSets: ft,
  moveSkillPath: st,
  previewSkill: nt,
  putSkillFile: at,
  removeUserFromOrganization: z,
  replaceSkillAiToolBindings: X,
  resetRateLimitCounters: A,
  testLdapConnection: p,
  testOauthCallback: E,
  testOauthConnection: P,
  testSmtpConnection: yt,
  testToolSet: jt,
  updateLdapSettings: T,
  updateOauthSettings: S,
  updateOrganization: O,
  updateRateLimitRule: D,
  updateRateLimitSettings: w,
  updateSecuritySettings: I,
  updateSkill: Q,
  updateSkillStatus: it,
  updateSmtpSettings: ct,
  updateSystemBaseSettings: u,
  updateTaskSettings: lt,
  updateToolSet: Pt,
  updateToolSetStatus: Ct,
  updateUserOrganizationRoles: U,
  uploadSkill: pt
}, Symbol.toStringTag, { value: "Module" }));
export {
  Gt as a,
  q as b,
  C as c,
  $ as d,
  G as e,
  U as f,
  j as g,
  k as l,
  z as r,
  O as u
};
