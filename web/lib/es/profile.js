import { j as e } from "./vendor.js";
import { useState as p, useEffect as h } from "react";
import { Card as b, Tabs as g, message as x } from "antd";
import { useTranslation as l } from "react-i18next";
import { n as y, m as P, o as j, p as V, U as w } from "./components.js";
import { f as A } from "./contexts.js";
import { a as L } from "./index.js";
import { useNavigate as S, useLocation as k } from "react-router-dom";
const _ = () => {
  const { t: a } = l("authorization"), { t: n } = l("common"), { user: s, updateUser: c } = A(), [f, r] = p(!1), u = S(), i = k(), d = i.hash.replace("#", "") || "basic", o = async () => {
    try {
      r(!0);
      const t = await L.authorization.getCurrentUser();
      c(t);
    } catch (t) {
      x.error(n("fetchFailed", { defaultValue: "Failed to fetch data" })), console.error("Failed to fetch user profile:", t);
    } finally {
      r(!1);
    }
  };
  h(() => {
    o();
  }, []);
  const m = [
    {
      key: "basic",
      label: a("profile.basic", { defaultValue: "Basic Information" }),
      children: /* @__PURE__ */ e.jsx(y, { user: s, onSuccess: o })
    },
    {
      key: "password",
      label: a("profile.password", { defaultValue: "Password" }),
      disabled: s == null ? void 0 : s.disable_change_password,
      children: /* @__PURE__ */ e.jsx(P, {})
    },
    {
      key: "mfa",
      label: a("profile.mfa", { defaultValue: "Multi-Factor Authentication" }),
      children: /* @__PURE__ */ e.jsx(j, { user: s, onSuccess: o })
    },
    {
      key: "sessions",
      label: a("profile.sessions", { defaultValue: "Sessions" }),
      children: /* @__PURE__ */ e.jsx(V, {})
    },
    {
      key: "auditLogs",
      label: a("profile.auditLogs", { defaultValue: "Audit Logs" }),
      children: /* @__PURE__ */ e.jsx(w, {})
    }
  ];
  return /* @__PURE__ */ e.jsx(
    b,
    {
      title: a("profile.title", { defaultValue: "Profile Settings" }),
      loading: f,
      children: /* @__PURE__ */ e.jsx(
        g,
        {
          defaultActiveKey: d,
          onChange: (t) => {
            u(`${i.pathname}#${t}`);
          },
          items: m,
          destroyInactiveTabPane: !0
        }
      )
    }
  );
};
export {
  _ as default
};
