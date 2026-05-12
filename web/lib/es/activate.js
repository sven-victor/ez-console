import { j as e } from "./vendor.js";
import { useState as n, useEffect as L } from "react";
import { Result as h, Card as C, Typography as b, Alert as E, Button as w, Form as d, Input as j } from "antd";
import { LockOutlined as y } from "@ant-design/icons";
import { useSearchParams as q, useNavigate as B } from "react-router-dom";
import { useTranslation as R } from "react-i18next";
import { a as F } from "./index.js";
import { A as _ } from "./client.js";
import { L as z, a as Y } from "./components.js";
import { u as G } from "./contexts.js";
import { createStyles as M } from "antd-style";
import c from "classnames";
const { Title: O } = b, U = M(({ css: a }) => ({
  container: a`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0f2f5;
  `,
  card: a`
    width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `,
  languageSwitch: a`
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
})), re = ({ transformLangConfig: a }) => {
  const { styles: o } = U(), [p] = q(), { t, i18n: f } = R(), V = B(), { siteConfig: r, loading: A, error: l } = G(), [m] = n(p.get("token")), [P, g] = n(!1), [v, u] = n(
    p.get("token") ? null : t("activate.invalidToken", { defaultValue: "Invalid or expired activation link" })
  ), [k, N] = n(!1), [S, T] = n("");
  L(() => {
    var s, i;
    r && (T(((s = r.name_i18n) == null ? void 0 : s[f.language]) || r.name || ""), window.document.title = r.name, (i = document.getElementById("site-icon")) == null || i.setAttribute("href", r.logo || ""));
  }, [r, f.language]);
  const I = async (s) => {
    if (!m) {
      u(t("activate.invalidToken", { defaultValue: "Invalid or expired activation link" }));
      return;
    }
    try {
      g(!0), u(null), await F.authorization.activateUser({ token: m, password: s.password }), N(!0);
    } catch (i) {
      i instanceof _ ? u(t("activate.error", { defaultValue: "Activation failed: {{error}}", error: i.message })) : u(t("activate.error", { defaultValue: "Activation failed" }));
    } finally {
      g(!1);
    }
  };
  return A ? /* @__PURE__ */ e.jsx(z, {}) : r ? /* @__PURE__ */ e.jsx("div", { className: "activate-page", children: /* @__PURE__ */ e.jsx("div", { className: c(o.container, "activate-page-container"), children: /* @__PURE__ */ e.jsxs(C, { className: c(o.card, "activate-page-card"), children: [
    /* @__PURE__ */ e.jsx("div", { className: c(o.languageSwitch, "language-switch"), children: /* @__PURE__ */ e.jsx(Y, { transformLangConfig: a }) }),
    /* @__PURE__ */ e.jsxs("div", { className: c(o.titleArea, "activate-page-title"), children: [
      /* @__PURE__ */ e.jsx(O, { level: 2, children: S }),
      /* @__PURE__ */ e.jsx("p", { children: t("activate.subtitle", { defaultValue: "Activate your account" }) })
    ] }),
    v && /* @__PURE__ */ e.jsx(
      E,
      {
        className: c(o.errorAlert, "activate-page-error"),
        message: v,
        type: "error",
        showIcon: !0
      }
    ),
    k ? /* @__PURE__ */ e.jsx(
      h,
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
            ({ getFieldValue: s }) => ({
              validator(i, x) {
                return !x || s("password") === x ? Promise.resolve() : Promise.reject(new Error(t("activate.passwordMismatch", { defaultValue: "Passwords do not match" })));
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
    h,
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
  re as default
};
