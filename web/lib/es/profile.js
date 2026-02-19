import { j as e } from "./vendor.js";
import { useState as h, useEffect as p } from "react";
import { Card as b, Tabs as g, message as j } from "antd";
import { useTranslation as l } from "react-i18next";
import { k as x, j as y, l as P, m as V, U as k } from "./components.js";
import { f as w } from "./contexts.js";
import { a as A } from "./index.js";
import { useNavigate as L, useLocation as S } from "react-router-dom";
const _ = () => {
  const { t: a } = l("authorization"), { t: n } = l("common"), { user: s, updateUser: c } = w(), [f, r] = h(!1), u = L(), i = S(), d = i.hash.replace("#", "") || "basic", o = async () => {
    try {
      r(!0);
      const t = await A.authorization.getCurrentUser();
      c(t);
    } catch (t) {
      j.error(n("fetchFailed", { defaultValue: "Failed to fetch data" })), console.error("Failed to fetch user profile:", t);
    } finally {
      r(!1);
    }
  };
  p(() => {
    o();
  }, []);
  const m = [
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
      children: /* @__PURE__ */ e.jsx(V, {})
    },
    {
      key: "auditLogs",
      label: a("profile.auditLogs", { defaultValue: "Audit Logs" }),
      children: /* @__PURE__ */ e.jsx(k, {})
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
