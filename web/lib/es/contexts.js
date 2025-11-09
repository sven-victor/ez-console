import { useContext as A, createContext as v, useState as x, useEffect as z, useCallback as I } from "react";
import { j as T } from "./vendor.js";
import { a as g } from "./index.js";
import { useRequest as b } from "ahooks";
import { message as M } from "antd";
import { c as P } from "./client.js";
const w = v({
  user: null,
  token: null,
  loading: !1,
  login: async () => {
  },
  oauthLogin: async () => {
  },
  logout: () => {
  },
  updateUser: () => {
  }
}), j = () => A(w), y = (t, i = !0) => {
  t ? (i && localStorage.setItem("token", t), P.defaults.headers.common.Authorization = `Bearer ${t}`) : (i && localStorage.removeItem("token"), delete P.defaults.headers.common.Authorization);
}, $ = ({ children: t }) => {
  const [i, o] = x(null), [f, s] = x(localStorage.getItem("token")), [S, C] = x(!0), { run: p } = b(async () => {
    const r = localStorage.getItem("token");
    return r ? (y(r, !1), g.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
    },
    onSuccess: (r) => {
      o(r);
    },
    onError: (r) => {
      console.error("Failed to get current user:", r), k();
    },
    onFinally: () => {
      C(!1);
    }
  });
  z(() => {
    p();
  }, []);
  const n = async (r) => {
    try {
      const e = await g.authorization.login(r), { token: l, user: a, needs_mfa: m, password_expired: c, mfa_token: d, mfa_type: h } = e;
      if (m)
        throw { needsMFA: !0, mfaToken: d, mfaType: h, user: a };
      if (c)
        throw { password_expired: !0, user: a, token: l };
      return y(l), s(l), o(a), a;
    } catch (e) {
      throw e && e.needsMFA || e && e.password_expired || M.error("Login failed, please check your username and password"), e;
    }
  }, u = I(async (r) => {
    try {
      const e = await g.oauth.handleCallback(r);
      let l = "", a = null;
      if (e && typeof e == "object")
        if ("code" in e && e.code === "0" && "data" in e) {
          const { token: m, user: c, needs_mfa: d, mfa_token: h, mfa_type: _ } = e.data;
          if (d)
            throw { needsMFA: !0, mfaToken: h, mfaType: _, user: c };
          l = m, a = c;
        } else {
          const { token: m, user: c, needs_mfa: d, mfa_token: h, mfa_type: _ } = e;
          if (d)
            throw { needsMFA: !0, mfaToken: h, mfaType: _, user: c };
          l = m, a = c;
        }
      return y(l), s(l), o(a), a;
    } catch (e) {
      throw e && e.needsMFA || e && e.passwordExpired, e;
    }
  }, []), k = () => {
    g.authorization.logout(), y(null), s(null), o(null);
  }, F = (r) => {
    o(r);
  };
  return /* @__PURE__ */ T.jsx(
    w.Provider,
    {
      value: {
        user: i,
        token: f,
        loading: S,
        login: n,
        oauthLogin: u,
        logout: k,
        updateUser: F
      },
      children: t
    }
  );
}, q = () => {
  const t = A(w);
  if (t === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return t;
}, G = () => {
  var p;
  const { user: t } = A(w), i = localStorage.getItem("organization_id"), o = (p = t == null ? void 0 : t.roles) == null ? void 0 : p.filter((n) => !n.organization_id || n.organization_id === i), f = () => o ? o.some((n) => n.name === "admin" && !n.organization_id) : !1, s = (n) => o ? f() ? !0 : o.some((u) => u.permissions ? u.permissions.some((k) => k.code === n) : !1) : !1;
  return {
    hasPermission: s,
    hasAllPermissions: (n) => n.every((u) => s(u)),
    hasAnyPermission: (n) => n.some((u) => s(u)),
    isAdmin: f(),
    loading: !t
  };
}, U = v({
  siteConfig: null,
  enableMultiOrg: !1,
  loading: !1,
  fetchSiteConfig: async () => null
}), H = () => A(U), J = ({ children: t }) => {
  const { user: i } = j(), { data: o = null, loading: f, runAsync: s } = b(async () => g.system.getSiteConfig(), { manual: !0 });
  return z(() => {
    s();
  }, [i]), /* @__PURE__ */ T.jsx(
    U.Provider,
    {
      value: {
        siteConfig: o,
        loading: f,
        enableMultiOrg: (o == null ? void 0 : o.enable_multi_org) ?? !1,
        fetchSiteConfig: s
      },
      children: t
    }
  );
};
export {
  $ as A,
  J as S,
  G as a,
  H as b,
  j as c,
  q as u
};
