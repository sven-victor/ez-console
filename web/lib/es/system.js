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
async function y(t) {
  return s("/api/system/health", {
    method: "GET",
    ...t || {}
  });
}
async function d(t) {
  return s("/api/system/info", {
    method: "GET",
    ...t || {}
  });
}
async function l(t) {
  return s(
    "/api/system/ldap-settings",
    {
      method: "GET",
      ...t || {}
    }
  );
}
async function h(t, a) {
  return s("/api/system/ldap-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function T(t, a) {
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
async function g(t, a) {
  return s("/api/system/oauth-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function S(t, a) {
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
async function P(t) {
  return s(
    "/api/system/oauth-settings/test-callback",
    {
      method: "POST",
      ...t || {}
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
async function k(t, a) {
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
async function C(t, a, n) {
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
async function $(t, a) {
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
async function j(t, a) {
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
async function q(t, a, n) {
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
async function z(t, a) {
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
async function G(t, a, n) {
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
async function U(t, a) {
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
async function D(t, a) {
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
async function L(t, a) {
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
async function b(t) {
  return s("/api/system/site", {
    method: "GET",
    ...t || {}
  });
}
async function v(t, a) {
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
async function F(t, a) {
  return s("/api/system/skills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function w(t, a) {
  const { id: n, ...e } = t;
  return s(`/api/system/skills/${n}`, {
    method: "GET",
    params: { ...e },
    ...a || {}
  });
}
async function x(t, a, n) {
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
async function A(t, a) {
  const { id: n, ...e } = t;
  return s(`/api/system/skills/${n}`, {
    method: "DELETE",
    params: { ...e },
    ...a || {}
  });
}
async function B(t, a, n) {
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
async function I(t, a) {
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
async function J(t, a) {
  const { id: n, path: e, ...i } = t;
  return s(`/api/system/skills/${n}/files/${e}`, {
    method: "GET",
    params: { ...i },
    responseType: "text",
    ...a || {}
  });
}
async function M(t, a, n) {
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
async function N(t, a) {
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
async function R(t, a, n) {
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
async function H(t, a) {
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
async function K(t) {
  return s("/api/system/skills/domains", {
    method: "GET",
    ...t || {}
  });
}
async function Q(t, a, n) {
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
async function V(t) {
  return s("/api/system/smtp-settings", {
    method: "GET",
    ...t || {}
  });
}
async function W(t, a) {
  return s("/api/system/smtp-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function X(t, a) {
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
async function Y(t) {
  return s("/api/system/task-settings", {
    method: "GET",
    ...t || {}
  });
}
async function Z(t, a) {
  return s("/api/system/task-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function tt(t, a) {
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
async function at(t, a) {
  return s("/api/system/toolsets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...a || {}
  });
}
async function st(t, a) {
  const { id: n, ...e } = t;
  return s(`/api/system/toolsets/${n}`, {
    method: "GET",
    params: { ...e },
    ...a || {}
  });
}
async function et(t, a, n) {
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
async function nt(t, a) {
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
async function it(t, a, n) {
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
async function ot(t, a) {
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
async function rt(t, a) {
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
async function pt(t) {
  return s(
    "/api/system/toolsets/types",
    {
      method: "GET",
      ...t || {}
    }
  );
}
const ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addUserToOrganization: q,
  checkPasswordComplexity: L,
  createOrganization: k,
  createSkill: F,
  createSkillDir: B,
  createToolSet: at,
  deleteOrganization: $,
  deleteSkill: A,
  deleteSkillPath: N,
  deleteToolSet: nt,
  getAuditLogs: m,
  getLdapSettings: l,
  getOauthSettings: f,
  getOrganization: O,
  getSecuritySettings: _,
  getSiteConfig: b,
  getSkill: w,
  getSkillFile: J,
  getSmtpSettings: V,
  getSystemBaseSettings: c,
  getSystemInfo: d,
  getTaskSettings: Y,
  getToolSet: st,
  getToolSetTools: rt,
  getToolSetTypeDefinitions: pt,
  getUserOrganizations: U,
  healthCheck: y,
  importLdapUsers: T,
  listOrganizationUsers: j,
  listOrganizations: E,
  listSkillDomains: K,
  listSkillFilesTree: I,
  listSkills: v,
  listToolSets: tt,
  moveSkillPath: R,
  previewSkill: H,
  putSkillFile: M,
  removeUserFromOrganization: z,
  testLdapConnection: p,
  testOauthCallback: P,
  testOauthConnection: S,
  testSmtpConnection: X,
  testToolSet: ot,
  updateLdapSettings: h,
  updateOauthSettings: g,
  updateOrganization: C,
  updateSecuritySettings: D,
  updateSkill: x,
  updateSmtpSettings: W,
  updateSystemBaseSettings: u,
  updateTaskSettings: Z,
  updateToolSet: et,
  updateToolSetStatus: it,
  updateUserOrganizationRoles: G,
  uploadSkill: Q
}, Symbol.toStringTag, { value: "Module" }));
export {
  ct as a,
  j as b,
  k as c,
  $ as d,
  q as e,
  G as f,
  O as g,
  E as l,
  z as r,
  C as u
};
