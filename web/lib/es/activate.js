import { j as e } from "./vendor.js";
import { useState as c, useEffect as L } from "react";
import { Result as x, Card as C, Typography as b, Alert as E, Button as w, Form as d, Input as j } from "antd";
import { LockOutlined as y } from "@ant-design/icons";
import { useSearchParams as q, useNavigate as B } from "react-router-dom";
import { useTranslation as R } from "react-i18next";
import { a as F } from "./index.js";
import { A as _ } from "./client.js";
import { L as z, a as Y, b as G } from "./components.js";
import { b as M } from "./contexts.js";
import { createStyles as O } from "antd-style";
import n from "classnames";
const { Title: U } = b, $ = O(({ css: a, isDarkMode: r }) => ({
  container: a`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    ${r ? a`
      background: #424242;
    ` : a`
      background: #f0f2f5;
    `}
  `,
  card: a`
    width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `,
  languageSwitch: a`
    position: absolute;
    top: 0;
    right: 30px;
  `,
  themeSwitch: a`
    position: absolute;
    top: 0;
    right: 0;
  `,
  titleArea: a`
    text-align: center;
    margin-bottom: 20px;
  `,
  errorAlert: a`
    margin-bottom: 20px;
  `
})), se = ({ transformLangConfig: a }) => {
  const { styles: r } = $(), [p] = q(), { t, i18n: f } = R(), V = B(), { siteConfig: s, loading: A, error: l } = M(), [m] = c(p.get("token")), [P, g] = c(!1), [h, u] = c(
    p.get("token") ? null : t("activate.invalidToken", { defaultValue: "Invalid or expired activation link" })
  ), [S, k] = c(!1), [N, T] = c("");
  L(() => {
    var i, o;
    s && (T(((i = s.name_i18n) == null ? void 0 : i[f.language]) || s.name || ""), window.document.title = s.name, (o = document.getElementById("site-icon")) == null || o.setAttribute("href", s.logo || ""));
  }, [s, f.language]);
  const I = async (i) => {
    if (!m) {
      u(t("activate.invalidToken", { defaultValue: "Invalid or expired activation link" }));
      return;
    }
    try {
      g(!0), u(null), await F.authorization.activateUser({ token: m, password: i.password }), k(!0);
    } catch (o) {
      o instanceof _ ? u(t("activate.error", { defaultValue: "Activation failed: {{error}}", error: o.message })) : u(t("activate.error", { defaultValue: "Activation failed" }));
    } finally {
      g(!1);
    }
  };
  return A ? /* @__PURE__ */ e.jsx(z, {}) : s ? /* @__PURE__ */ e.jsx("div", { className: "activate-page", children: /* @__PURE__ */ e.jsx("div", { className: n(r.container, "activate-page-container"), children: /* @__PURE__ */ e.jsxs(C, { className: n(r.card, "activate-page-card"), children: [
    /* @__PURE__ */ e.jsx("div", { className: n(r.languageSwitch, "language-switch"), children: /* @__PURE__ */ e.jsx(Y, { transformLangConfig: a }) }),
    /* @__PURE__ */ e.jsx("div", { className: n(r.themeSwitch, "theme-switch"), children: /* @__PURE__ */ e.jsx(G, {}) }),
    /* @__PURE__ */ e.jsxs("div", { className: n(r.titleArea, "activate-page-title"), children: [
      /* @__PURE__ */ e.jsx(U, { level: 2, children: N }),
      /* @__PURE__ */ e.jsx("p", { children: t("activate.subtitle", { defaultValue: "Activate your account" }) })
    ] }),
    h && /* @__PURE__ */ e.jsx(
      E,
      {
        className: n(r.errorAlert, "activate-page-error"),
        message: h,
        type: "error",
        showIcon: !0
      }
    ),
    S ? /* @__PURE__ */ e.jsx(
      x,
      {
        status: "success",
        title: t("activate.success", { defaultValue: "Account activated successfully" }),
        subTitle: t("activate.successSubtitle", {
          defaultValue: "Your account has been activated. You can now log in."
        }),
        extra: /* @__PURE__ */ e.jsx(w, { type: "primary", onClick: () => {
          V("/login");
        }, children: t("activate.goToLogin", { defaultValue: "Go to Login" }) })
      }
    ) : /* @__PURE__ */ e.jsxs(d, { name: "activate", onFinish: I, size: "large", className: "activate-page-form", children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(b.Text, { type: "secondary", children: t("activate.description", { defaultValue: "Please set a password to activate your account." }) }) }),
      /* @__PURE__ */ e.jsx(
        d.Item,
        {
          name: "password",
          rules: [{ required: !0, message: t("activate.passwordRequired", { defaultValue: "Password is required" }) }],
          children: /* @__PURE__ */ e.jsx(
            j.Password,
            {
              prefix: /* @__PURE__ */ e.jsx(y, {}),
              placeholder: t("activate.newPassword", { defaultValue: "New Password" }),
              autoComplete: "new-password"
            }
          )
        }
      ),
      /* @__PURE__ */ e.jsx(
        d.Item,
        {
          name: "confirm_password",
          dependencies: ["password"],
          rules: [
            { required: !0, message: t("activate.confirmPasswordRequired", { defaultValue: "Please confirm your password" }) },
            ({ getFieldValue: i }) => ({
              validator(o, v) {
                return !v || i("password") === v ? Promise.resolve() : Promise.reject(new Error(t("activate.passwordMismatch", { defaultValue: "Passwords do not match" })));
              }
            })
          ],
          children: /* @__PURE__ */ e.jsx(
            j.Password,
            {
              prefix: /* @__PURE__ */ e.jsx(y, {}),
              placeholder: t("activate.confirmPassword", { defaultValue: "Confirm Password" }),
              autoComplete: "new-password"
            }
          )
        }
      ),
      /* @__PURE__ */ e.jsx(d.Item, { children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: P, block: !0, disabled: !m, children: t("activate.activateButton", { defaultValue: "Activate Account" }) }) })
    ] })
  ] }) }) }) : /* @__PURE__ */ e.jsx(
    x,
    {
      status: "500",
      title: "500",
      subTitle: t("login.fetchSiteConfigError", {
        defaultValue: "Failed to fetch site config: {{error}}",
        error: (l == null ? void 0 : l.message) || l
      })
    }
  );
};
export {
  se as default
};
