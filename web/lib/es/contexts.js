import { useContext as y, createContext as C, useState as w, useEffect as F, useCallback as M } from "react";
import { e as b, j as z, s as E } from "./vendor.js";
import { a as h } from "./index.js";
import { c as T } from "./client.js";
const k = C({
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
}), B = () => y(k), p = (t, i = !0) => {
  t ? (i && localStorage.setItem("token", t), T.defaults.headers.common.Authorization = `Bearer ${t}`) : (i && localStorage.removeItem("token"), delete T.defaults.headers.common.Authorization);
}, D = ({ children: t }) => {
  const [i, o] = w(null), [x, d] = w(localStorage.getItem("token")), [r, a] = w(!0), { run: g } = b(async () => {
    const s = localStorage.getItem("token");
    return s ? (p(s, !1), h.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
    },
    onSuccess: (s) => {
      o(s);
    },
    onError: (s) => {
      console.error("Failed to get current user:", s), _();
    },
    onFinally: () => {
      a(!1);
    }
  });
  F(() => {
    g();
  }, []);
  const P = async (s) => {
    try {
      const e = await h.authorization.login(s), { token: u, user: n, needs_mfa: c, password_expired: l, mfa_token: f, mfa_type: m } = e;
      if (c)
        throw { needsMFA: !0, mfaToken: f, mfaType: m, user: n };
      if (l)
        throw { password_expired: !0, user: n, token: u };
      return p(u), d(u), o(n), n;
    } catch (e) {
      throw e && e.needsMFA || e && e.password_expired || E.error("Login failed, please check your username and password"), e;
    }
  }, U = M(async (s) => {
    try {
      const e = await h.oauth.handleCallback(s);
      let u = "", n = null;
      if (e && typeof e == "object")
        if ("code" in e && e.code === "0" && "data" in e) {
          const { token: c, user: l, needs_mfa: f, mfa_token: m, mfa_type: A } = e.data;
          if (f)
            throw { needsMFA: !0, mfaToken: m, mfaType: A, user: l };
          u = c, n = l;
        } else {
          const { token: c, user: l, needs_mfa: f, mfa_token: m, mfa_type: A } = e;
          if (f)
            throw { needsMFA: !0, mfaToken: m, mfaType: A, user: l };
          u = c, n = l;
        }
      return p(u), d(u), o(n), n;
    } catch (e) {
      throw e && e.needsMFA || e && e.passwordExpired, e;
    }
  }, []), _ = () => {
    h.authorization.logout(), p(null), d(null), o(null);
  }, v = (s) => {
    o(s);
  };
  return /* @__PURE__ */ z.jsx(
    k.Provider,
    {
      value: {
        user: i,
        token: x,
        loading: r,
        login: P,
        oauthLogin: U,
        logout: _,
        updateUser: v
      },
      children: t
    }
  );
}, R = () => {
  const t = y(k);
  if (t === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return t;
}, $ = () => {
  const { user: t } = y(k), i = () => !t || !t.roles ? !1 : t.roles.some((r) => r.name === "admin"), o = (r) => !t || !t.roles ? !1 : i() ? !0 : t.roles.some((a) => a.permissions ? a.permissions.some((g) => g.code === r) : !1);
  return {
    hasPermission: o,
    hasAllPermissions: (r) => r.every((a) => o(a)),
    hasAnyPermission: (r) => r.some((a) => o(a)),
    isAdmin: i(),
    loading: !t
  };
};
export {
  D as A,
  $ as a,
  B as b,
  R as u
};
