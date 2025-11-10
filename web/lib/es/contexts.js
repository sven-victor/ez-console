import { useContext as C, createContext as O, useState as _, useEffect as z, useCallback as U } from "react";
import { j as P } from "./vendor.js";
import { message as F } from "antd";
import { a as y } from "./index.js";
import { c as v } from "./client.js";
import { useRequest as T } from "ahooks";
const S = O({
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
}), M = () => C(S), I = (n, t = !0) => {
  n ? (t && localStorage.setItem("token", n), v.defaults.headers.common.Authorization = `Bearer ${n}`) : (t && localStorage.removeItem("token"), delete v.defaults.headers.common.Authorization);
}, q = ({ children: n }) => {
  const [t, r] = _(null), [g, i] = _(localStorage.getItem("token")), [A, d] = _(!0), { run: u } = T(async () => {
    const s = localStorage.getItem("token");
    return s ? (I(s, !1), y.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
    },
    onSuccess: (s) => {
      r(s);
    },
    onError: (s) => {
      console.error("Failed to get current user:", s), f();
    },
    onFinally: () => {
      d(!1);
    }
  });
  z(() => {
    u();
  }, []);
  const o = async (s) => {
    try {
      const e = await y.authorization.login(s), { token: c, user: l, needs_mfa: h, password_expired: m, mfa_token: p, mfa_type: k } = e;
      if (h)
        throw { needsMFA: !0, mfaToken: p, mfaType: k, user: l };
      if (m)
        throw { password_expired: !0, user: l, token: c };
      return I(c), i(c), r(l), l;
    } catch (e) {
      throw e && e.needsMFA || e && e.password_expired || F.error("Login failed, please check your username and password"), e;
    }
  }, a = U(async (s) => {
    try {
      const e = await y.oauth.handleCallback(s);
      let c = "", l = null;
      if (e && typeof e == "object")
        if ("code" in e && e.code === "0" && "data" in e) {
          const { token: h, user: m, needs_mfa: p, mfa_token: k, mfa_type: x } = e.data;
          if (p)
            throw { needsMFA: !0, mfaToken: k, mfaType: x, user: m };
          c = h, l = m;
        } else {
          const { token: h, user: m, needs_mfa: p, mfa_token: k, mfa_type: x } = e;
          if (p)
            throw { needsMFA: !0, mfaToken: k, mfaType: x, user: m };
          c = h, l = m;
        }
      return I(c), i(c), r(l), l;
    } catch (e) {
      throw e && e.needsMFA || e && e.passwordExpired, e;
    }
  }, []), f = () => {
    y.authorization.logout(), I(null), i(null), r(null);
  }, w = (s) => {
    r(s);
  };
  return /* @__PURE__ */ P.jsx(
    S.Provider,
    {
      value: {
        user: t,
        token: g,
        loading: A,
        login: o,
        oauthLogin: a,
        logout: f,
        updateUser: w
      },
      children: n
    }
  );
}, G = () => {
  const n = C(S);
  if (n === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return n;
}, b = O({
  siteConfig: null,
  enableMultiOrg: !1,
  loading: !1,
  fetchSiteConfig: async () => null,
  currentOrgId: null,
  setCurrentOrgId: () => {
  },
  clearCurrentOrgId: () => {
  }
}), j = () => C(b), H = ({ children: n }) => {
  const { user: t } = M(), { data: r = null, loading: g, runAsync: i } = T(async () => y.system.getSiteConfig(), { manual: !0 });
  z(() => {
    i();
  }, [t]);
  const [A, d] = _(null);
  return z(() => {
    var o, a, f;
    let u = localStorage.getItem("orgID");
    if (u) {
      const w = (o = t == null ? void 0 : t.organizations) == null ? void 0 : o.find((s) => s.id === u);
      if (w) {
        d(w.id);
        return;
      }
    }
    d(((f = (a = t == null ? void 0 : t.organizations) == null ? void 0 : a[0]) == null ? void 0 : f.id) ?? null);
  }, [r, t == null ? void 0 : t.organizations]), /* @__PURE__ */ P.jsx(
    b.Provider,
    {
      value: {
        siteConfig: r,
        loading: g,
        enableMultiOrg: (r == null ? void 0 : r.enable_multi_org) ?? !1,
        fetchSiteConfig: i,
        currentOrgId: A,
        setCurrentOrgId: (u) => {
          d(u), localStorage.setItem("orgID", u);
        },
        clearCurrentOrgId: () => {
          d(null), localStorage.removeItem("orgID");
        }
      },
      children: n
    }
  );
}, J = () => {
  var u;
  const { user: n } = C(S), { currentOrgId: t } = j(), r = (u = n == null ? void 0 : n.roles) == null ? void 0 : u.filter((o) => !o.organization_id || o.organization_id === t), g = () => r ? r.some((o) => o.name === "admin" && !o.organization_id) : !1, i = (o) => r ? g() ? !0 : r.some((a) => a.permissions ? a.permissions.some((f) => f.code === o) : !1) : !1;
  return {
    hasPermission: i,
    hasAllPermissions: (o) => o.every((a) => i(a)),
    hasAnyPermission: (o) => o.some((a) => i(a)),
    isAdmin: g(),
    loading: !n
  };
};
export {
  q as A,
  H as S,
  J as a,
  j as b,
  M as c,
  G as u
};
