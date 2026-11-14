import { j as e } from "./vendor.js";
import { useState as h, useEffect as b } from "react";
import { App as g, Card as x, Tabs as y } from "antd";
import { useTranslation as l } from "react-i18next";
import { m as P, l as j, n as A, o as V, U as w } from "./components.js";
import { c as L } from "./contexts.js";
import { a as S } from "./index.js";
import { useNavigate as k, useLocation as F } from "react-router-dom";
const $ = () => {
  const { message: n } = g.useApp(), { t: s } = l("authorization"), { t: c } = l("common"), { user: a, updateUser: f } = L(), [u, r] = h(!1), d = k(), i = F(), m = i.hash.replace("#", "") || "basic", o = async () => {
    try {
      r(!0);
      const t = await S.authorization.getCurrentUser();
      f(t);
    } catch (t) {
      n.error(c("fetchFailed", { defaultValue: "Failed to fetch data" })), console.error("Failed to fetch user profile:", t);
    } finally {
      r(!1);
    }
  };
  b(() => {
    o();
  }, []);
  const p = [
    {
      key: "basic",
      label: s("profile.basic", { defaultValue: "Basic Information" }),
      children: /* @__PURE__ */ e.jsx(P, { user: a, onSuccess: o })
    },
    {
      key: "password",
      label: s("profile.password", { defaultValue: "Password" }),
      disabled: a == null ? void 0 : a.disable_change_password,
      children: /* @__PURE__ */ e.jsx(j, {})
    },
    {
      key: "mfa",
      label: s("profile.mfa", { defaultValue: "Multi-Factor Authentication" }),
      children: /* @__PURE__ */ e.jsx(A, { user: a, onSuccess: o })
    },
    {
      key: "sessions",
      label: s("profile.sessions", { defaultValue: "Sessions" }),
      children: /* @__PURE__ */ e.jsx(V, {})
    },
    {
      key: "auditLogs",
      label: s("profile.auditLogs", { defaultValue: "Audit Logs" }),
      children: /* @__PURE__ */ e.jsx(w, {})
    }
  ];
  return /* @__PURE__ */ e.jsx(
    x,
    {
      title: s("profile.title", { defaultValue: "Profile Settings" }),
      loading: u,
      children: /* @__PURE__ */ e.jsx(
        y,
        {
          defaultActiveKey: m,
          onChange: (t) => {
            d(`${i.pathname}#${t}`);
          },
          items: p,
          destroyInactiveTabPane: !0
        }
      )
    }
  );
};
export {
  $ as default
};
