import { u as l, j as e, C as m, aA as p, s as b } from "./vendor.js";
import { useState as g, useEffect as j } from "react";
import { j as x, i as y, k as P, l as A, U as V } from "./components.js";
import { b as k } from "./contexts.js";
import { a as w } from "./index.js";
import { useNavigate as L, useLocation as S } from "react-router-dom";
const E = () => {
  const { t: a } = l("authorization"), { t: n } = l("common"), { user: s, updateUser: c } = k(), [f, i] = g(!1), u = L(), r = S(), d = r.hash.replace("#", "") || "basic", o = async () => {
    try {
      i(!0);
      const t = await w.authorization.getCurrentUser();
      c(t);
    } catch (t) {
      b.error(n("fetchFailed", { defaultValue: "Failed to fetch data" })), console.error("Failed to fetch user profile:", t);
    } finally {
      i(!1);
    }
  };
  j(() => {
    o();
  }, []);
  const h = [
    {
      key: "basic",
      label: a("profile.basic", { defaultValue: "Basic Information" }),
      children: /* @__PURE__ */ e.jsx(x, { user: s, onSuccess: o })
    },
    {
      key: "password",
      label: a("profile.password", { defaultValue: "Password" }),
      disabled: s == null ? void 0 : s.disable_change_password,
      children: /* @__PURE__ */ e.jsx(y, {})
    },
    {
      key: "mfa",
      label: a("profile.mfa", { defaultValue: "Multi-Factor Authentication" }),
      children: /* @__PURE__ */ e.jsx(P, { user: s, onSuccess: o })
    },
    {
      key: "sessions",
      label: a("profile.sessions", { defaultValue: "Sessions" }),
      children: /* @__PURE__ */ e.jsx(A, {})
    },
    {
      key: "auditLogs",
      label: a("profile.auditLogs", { defaultValue: "Audit Logs" }),
      children: /* @__PURE__ */ e.jsx(V, {})
    }
  ];
  return /* @__PURE__ */ e.jsx(
    m,
    {
      title: a("profile.title", { defaultValue: "Profile Settings" }),
      loading: f,
      children: /* @__PURE__ */ e.jsx(
        p,
        {
          defaultActiveKey: d,
          onChange: (t) => {
            u(`${r.pathname}#${t}`);
          },
          items: h,
          destroyInactiveTabPane: !0
        }
      )
    }
  );
};
export {
  E as default
};
