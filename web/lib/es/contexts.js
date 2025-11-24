import { useContext as S, createContext as O, useState as _, useEffect as C, useCallback as U } from "react";
import { j as P } from "./vendor.js";
import { message as F } from "antd";
import { a as A } from "./index.js";
import { c as z } from "./client.js";
import { useRequest as T } from "ahooks";
const v = O({
  user: void 0,
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
}), M = () => S(v), w = (n, t = !0) => {
  n ? (t && localStorage.setItem("token", n), z.defaults.headers.common.Authorization = `Bearer ${n}`) : (t && localStorage.removeItem("token"), delete z.defaults.headers.common.Authorization);
}, q = ({ children: n }) => {
  const [t, r] = _(void 0), [h, i] = _(localStorage.getItem("token")), [d, f] = _(!0), { run: u } = T(async () => {
    const s = localStorage.getItem("token");
    return s ? (w(s, !1), A.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
    },
    onSuccess: (s) => {
      r(s);
    },
    onError: (s) => {
      console.error("Failed to get current user:", s), m();
    },
    onFinally: () => {
      f(!1);
    }
  });
  C(() => {
    u();
  }, []);
  const o = async (s) => {
    try {
      const e = await A.authorization.login(s), { token: c, user: l, needs_mfa: p, password_expired: g, mfa_token: k, mfa_type: y } = e;
      if (p)
        throw { needsMFA: !0, mfaToken: k, mfaType: y, user: l };
      if (g)
        throw { password_expired: !0, user: l, token: c };
      return w(c), i(c), r(l), l;
    } catch (e) {
      throw e && e.needsMFA || e && e.password_expired || F.error("Login failed, please check your username and password"), e;
    }
  }, a = U(async (s) => {
    try {
      const e = await A.oauth.handleCallback(s);
      let c = "", l = null;
      if (e && typeof e == "object")
        if ("code" in e && e.code === "0" && "data" in e) {
          const { token: p, user: g, needs_mfa: k, mfa_token: y, mfa_type: x } = e.data;
          if (k)
            throw { needsMFA: !0, mfaToken: y, mfaType: x, user: g };
          c = p, l = g;
        } else {
          const { token: p, user: g, needs_mfa: k, mfa_token: y, mfa_type: x } = e;
          if (k)
            throw { needsMFA: !0, mfaToken: y, mfaType: x, user: g };
          c = p, l = g;
        }
      return w(c), i(c), r(l), l;
    } catch (e) {
      throw e && e.needsMFA || e && e.passwordExpired, e;
    }
  }, []), m = () => {
    A.authorization.logout(), w(null), i(null), r(null);
  }, I = (s) => {
    r(s);
  };
  return /* @__PURE__ */ P.jsx(
    v.Provider,
    {
      value: {
        user: t,
        token: h,
        loading: d,
        login: o,
        oauthLogin: a,
        logout: m,
        updateUser: I
      },
      children: n
    }
  );
}, G = () => {
  const n = S(v);
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
}), j = () => S(b), H = ({ children: n }) => {
  const { user: t } = M(), { data: r = null, loading: h, runAsync: i } = T(async () => A.system.getSiteConfig(), { manual: !0 });
  C(() => {
    t !== void 0 && i();
  }, [t]);
  const [d, f] = _(null);
  return C(() => {
    d ? localStorage.setItem("orgID", d) : localStorage.removeItem("orgID");
  }, [d]), C(() => {
    var o, a, m;
    let u = localStorage.getItem("orgID");
    if (u) {
      const I = (o = t == null ? void 0 : t.organizations) == null ? void 0 : o.find((s) => s.id === u);
      if (I) {
        f(I.id);
        return;
      }
    }
    f(((m = (a = t == null ? void 0 : t.organizations) == null ? void 0 : a[0]) == null ? void 0 : m.id) ?? null);
  }, [r, t == null ? void 0 : t.organizations]), /* @__PURE__ */ P.jsx(
    b.Provider,
    {
      value: {
        siteConfig: r,
        loading: h,
        enableMultiOrg: (r == null ? void 0 : r.enable_multi_org) ?? !1,
        fetchSiteConfig: i,
        currentOrgId: d,
        setCurrentOrgId: (u) => {
          f(u);
        },
        clearCurrentOrgId: () => {
          f(null);
        }
      },
      children: n
    }
  );
}, J = () => {
  var u;
  const { user: n } = S(v), { currentOrgId: t } = j(), r = (u = n == null ? void 0 : n.roles) == null ? void 0 : u.filter((o) => !o.organization_id || o.organization_id === t), h = () => r ? r.some((o) => o.name === "admin" && !o.organization_id) : !1, i = (o) => r ? h() ? !0 : r.some((a) => a.permissions ? a.permissions.some((m) => m.code === o) : !1) : !1;
  return {
    hasPermission: i,
    hasAllPermissions: (o) => o.every((a) => i(a)),
    hasAnyPermission: (o) => o.some((a) => i(a)),
    isAdmin: h(),
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
