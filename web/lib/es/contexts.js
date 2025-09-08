import { useContext as y, createContext as C, useState as w, useEffect as F, useCallback as b } from "react";
import { j as z } from "./vendor.js";
import { message as E } from "antd";
import { a as h } from "./index.js";
import { c as T } from "./client.js";
import { useRequest as I } from "ahooks";
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
}), R = () => y(k), p = (t, i = !0) => {
  t ? (i && localStorage.setItem("token", t), T.defaults.headers.common.Authorization = `Bearer ${t}`) : (i && localStorage.removeItem("token"), delete T.defaults.headers.common.Authorization);
}, $ = ({ children: t }) => {
  const [i, r] = w(null), [x, d] = w(localStorage.getItem("token")), [s, a] = w(!0), { run: g } = I(async () => {
    const o = localStorage.getItem("token");
    return o ? (p(o, !1), h.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
    },
    onSuccess: (o) => {
      r(o);
    },
    onError: (o) => {
      console.error("Failed to get current user:", o), _();
    },
    onFinally: () => {
      a(!1);
    }
  });
  F(() => {
    g();
  }, []);
  const P = async (o) => {
    try {
      const e = await h.authorization.login(o), { token: u, user: n, needs_mfa: c, password_expired: l, mfa_token: m, mfa_type: f } = e;
      if (c)
        throw { needsMFA: !0, mfaToken: m, mfaType: f, user: n };
      if (l)
        throw { password_expired: !0, user: n, token: u };
      return p(u), d(u), r(n), n;
    } catch (e) {
      throw e && e.needsMFA || e && e.password_expired || E.error("Login failed, please check your username and password"), e;
    }
  }, U = b(async (o) => {
    try {
      const e = await h.oauth.handleCallback(o);
      let u = "", n = null;
      if (e && typeof e == "object")
        if ("code" in e && e.code === "0" && "data" in e) {
          const { token: c, user: l, needs_mfa: m, mfa_token: f, mfa_type: A } = e.data;
          if (m)
            throw { needsMFA: !0, mfaToken: f, mfaType: A, user: l };
          u = c, n = l;
        } else {
          const { token: c, user: l, needs_mfa: m, mfa_token: f, mfa_type: A } = e;
          if (m)
            throw { needsMFA: !0, mfaToken: f, mfaType: A, user: l };
          u = c, n = l;
        }
      return p(u), d(u), r(n), n;
    } catch (e) {
      throw e && e.needsMFA || e && e.passwordExpired, e;
    }
  }, []), _ = () => {
    h.authorization.logout(), p(null), d(null), r(null);
  }, v = (o) => {
    r(o);
  };
  return /* @__PURE__ */ z.jsx(
    k.Provider,
    {
      value: {
        user: i,
        token: x,
        loading: s,
        login: P,
        oauthLogin: U,
        logout: _,
        updateUser: v
      },
      children: t
    }
  );
}, q = () => {
  const t = y(k);
  if (t === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return t;
}, G = () => {
  const { user: t } = y(k), i = () => !t || !t.roles ? !1 : t.roles.some((s) => s.name === "admin"), r = (s) => !t || !t.roles ? !1 : i() ? !0 : t.roles.some((a) => a.permissions ? a.permissions.some((g) => g.code === s) : !1);
  return {
    hasPermission: r,
    hasAllPermissions: (s) => s.every((a) => r(a)),
    hasAnyPermission: (s) => s.some((a) => r(a)),
    isAdmin: i(),
    loading: !t
  };
};
export {
  $ as A,
  G as a,
  R as b,
  q as u
};
