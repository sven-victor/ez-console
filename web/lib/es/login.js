import { j as e } from "./vendor.js";
import { useState as n, useRef as ie, useEffect as L } from "react";
import { Form as m, Result as ne, Card as se, Typography as le, Alert as M, Input as x, Button as B, Divider as de, Space as ge, Avatar as me, message as $ } from "antd";
import { KeyOutlined as ce, UserOutlined as ue, LockOutlined as fe, GithubOutlined as pe } from "@ant-design/icons";
import { useNavigate as he, useLocation as xe, useSearchParams as we } from "react-router-dom";
import { a as je, c as ye } from "./contexts.js";
import { useTranslation as Pe } from "react-i18next";
import { a as D } from "./index.js";
import { A as z } from "./client.js";
import { L as G, a as be, i as _e } from "./components.js";
import { m as Ne, g as Ve } from "./base.js";
import { clearCache as Le } from "ahooks";
import i from "classnames";
import { createStyles as ke } from "antd-style";
const { Title: ve } = le, Ae = ke(({ css: s }) => ({
  loginPageContainer: s`
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f0f2f5;
    `,
  loginPageCard: s`
      width: 400px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `,
  languageSwitch: s`
      position: absolute;
      top: 0;
      right: 0;
    `,
  loginPageTitle: s`
      text-align: center;
      margin-bottom: 20px;
    `,
  loginPageError: s`
      margin-bottom: 20px;
    `,
  loginPageMfaAlert: s`
      margin-bottom: 20px;
    `,
  loginPageProviders: s`
      width: 100%;
    `
})), ze = ({ transformLangConfig: s }) => {
  const { styles: c } = Ae(), h = he(), K = xe(), [l] = we(), { login: k, oauthLogin: v, user: A } = je(), { t, i18n: P } = Pe(), [T, d] = n(null), [b, F] = n({}), [u, w] = n("login"), [W, X] = n(null), [_, Y] = n(null), [f, H] = n(null), [j] = m.useForm(), I = ie(!1), [J, E] = n(!1), [O, S] = n([]), [N, V] = n(0), { siteConfig: o, loading: Q, error: y } = ye(), [Z, C] = n("Loading..."), R = async (r) => {
    const g = async (a) => "username" in a ? await k({ username: a.username, password: a.password }) : "mfa_token" in a ? await k({ mfa_token: a.mfa_token, mfa_code: a.mfa_code }) : await v({ code: a.code, state: a.state, provider: a.provider });
    try {
      E(!0);
      const a = await g(r);
      if (Le(), await new Promise((p) => setTimeout(p, 100)), a && a.mfa_enforced && !a.mfa_enabled && K.pathname !== "/profile")
        h("/profile#mfa");
      else {
        const p = l.get("redirect");
        p ? window.location.href = p : o != null && o.home_page ? window.location.href = o.home_page : h("/");
      }
    } catch (a) {
      if (a.password_expired)
        w("password_expired"), X(a.token), d(null);
      else if (a.needsMFA)
        d(null), w("mfa"), h("/login", { replace: !0 }), Y(a.mfaType), H(a.user), j.setFieldValue("mfa_token", a.mfaToken);
      else if ("username" in r || "mfa_token" in r)
        if (a instanceof z ? d(t("login.error", { defaultValue: "Login failed: {{error}}", error: t(`login.${a}`, { defaultValue: a.message }) })) : d(typeof a == "string" ? a : t("login.error", { defaultValue: "Login failed" })), "mfa_token" in r) {
          V(30);
          const p = setInterval(() => {
            V((q) => q >= 1 ? q - 1 : 0);
          }, 1e3);
          setTimeout(() => {
            clearInterval(p), V(0);
          }, 3e4);
        } else "username" in r && w("login");
      else
        a instanceof z ? d(t("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: t(`login.${a.code}`, { defaultValue: a.message }) })) : d(typeof a == "string" ? a : t("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: a })), h("/login", { replace: !0 }), U();
    } finally {
      E(!1);
    }
  }, U = async () => {
    try {
      S(await D.oauth.getProviders() || []);
    } catch (r) {
      $.error(t("login.fetchOAuthProvidersError", { defaultValue: "Failed to fetch OAuth providers: {{error}}", error: r.message || r.toString() })), S([]);
    }
  };
  L(() => {
    if (!I.current) {
      I.current = !0;
      const r = l.get("code"), g = l.get("state"), a = l.get("provider");
      r && g && a ? R({ code: r, state: g, provider: a }) : U();
    }
  }, [l, v]), L(() => {
    P.language && C((o == null ? void 0 : o.name_i18n[P.language]) || (o == null ? void 0 : o.name) || "");
  }, [o, P.language]);
  const ee = async (r) => {
    try {
      F({ ...b, [r]: !0 });
      const { url: g } = await D.oauth.getLoginUrl({ provider: r }, { headers: { "X-Base-Path": Ve() } });
      window.location.href = g;
    } catch (g) {
      $.error(t("login.oauthError", { defaultValue: "OAuth login failed" })), console.error("OAuth login error:", g);
    } finally {
      F({ ...b, [r]: !1 });
    }
  }, ae = (r) => {
    switch (r.toLowerCase()) {
      case "github":
        return /* @__PURE__ */ e.jsx(pe, {});
      default:
        return null;
    }
  }, re = l.get("code"), oe = l.get("state"), te = l.get("provider");
  if (L(() => {
    var r;
    o && (C(o.name), window.document.title = o.name, (r = document.getElementById("site-icon")) == null || r.setAttribute("href", o.logo || ""));
  }, [o]), Q)
    return /* @__PURE__ */ e.jsx(G, {});
  if (!o)
    return /* @__PURE__ */ e.jsx(
      ne,
      {
        status: "500",
        title: "500",
        subTitle: t("login.fetchSiteConfigError", { defaultValue: "Failed to fetch site config: {{error}}", error: (y == null ? void 0 : y.message) || y })
      }
    );
  if (re && oe && te)
    return /* @__PURE__ */ e.jsx(G, {});
  if (A && A.status === "active") {
    const r = l.get("redirect");
    r ? window.location.href = r : o != null && o.home_page ? window.location.href = o.home_page : h("/");
  }
  return /* @__PURE__ */ e.jsx("div", { className: "login-page", children: /* @__PURE__ */ e.jsx("div", { className: i(c.loginPageContainer, "login-page-container"), children: /* @__PURE__ */ e.jsxs(se, { className: i(c.loginPageCard, "login-page-card"), children: [
    /* @__PURE__ */ e.jsx("div", { className: i(c.languageSwitch, "language-switch"), children: /* @__PURE__ */ e.jsx(be, { transformLangConfig: s }) }),
    /* @__PURE__ */ e.jsxs("div", { className: i(c.loginPageTitle, "login-page-title"), children: [
      /* @__PURE__ */ e.jsx(ve, { className: "login-page-title-text", level: 2, children: Z }),
      /* @__PURE__ */ e.jsx("p", { className: "login-page-subtitle-text", children: t("login.subtitle", { defaultValue: "Enter your credentials to continue" }) })
    ] }),
    T && /* @__PURE__ */ e.jsx(
      M,
      {
        className: i(c.loginPageError, "login-page-error"),
        message: T,
        type: "error",
        showIcon: !0
      }
    ),
    u === "mfa" && _ && /* @__PURE__ */ e.jsx(
      M,
      {
        message: t(`login.mfaTips.${_}`, { defaultValue: "You have enabled MFA based on ${mfaType}, please enter the corresponding one-time password." }),
        type: "info",
        showIcon: !0,
        className: i(c.loginPageMfaAlert, "login-page-mfa-alert")
      }
    ),
    /* @__PURE__ */ e.jsxs(
      m,
      {
        name: "login",
        initialValues: { remember: !0 },
        onFinish: R,
        size: "large",
        form: j,
        hidden: u === "password_expired",
        className: "login-page-form",
        children: [
          u === "mfa" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(m.Item, { hidden: !(f != null && f.email) || _ !== "email", className: i("login-page-form-item", "login-page-form-email"), children: /* @__PURE__ */ e.jsx(x, { value: Ne(f == null ? void 0 : f.email) }) }),
            /* @__PURE__ */ e.jsx(m.Item, { name: "mfa_token", hidden: !0, className: i("login-page-form-item", "login-page-form-mfa-token"), children: /* @__PURE__ */ e.jsx(x, {}) }),
            /* @__PURE__ */ e.jsx(m.Item, { name: "mfa_code", hidden: u !== "mfa", className: i("login-page-form-item", "login-page-form-mfa-code"), children: /* @__PURE__ */ e.jsx(x, { placeholder: t("login.mfa-code", { defaultValue: "MFA Code" }), prefix: /* @__PURE__ */ e.jsx(ce, {}) }) })
          ] }),
          u === "login" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(
              m.Item,
              {
                name: "username",
                rules: [{ required: !0, message: t("login.usernameRequired", { defaultValue: "Username is required" }) }],
                className: i("login-page-form-item", "login-page-form-username"),
                children: /* @__PURE__ */ e.jsx(x, { prefix: /* @__PURE__ */ e.jsx(ue, {}), placeholder: t("login.username", { defaultValue: "Username" }), autoComplete: "username" })
              }
            ),
            /* @__PURE__ */ e.jsx(
              m.Item,
              {
                name: "password",
                rules: [{ required: !0, message: t("login.passwordRequired", { defaultValue: "Password is required" }) }],
                className: i("login-page-form-item", "login-page-form-password"),
                children: /* @__PURE__ */ e.jsx(
                  x.Password,
                  {
                    prefix: /* @__PURE__ */ e.jsx(fe, {}),
                    placeholder: t("login.password", { defaultValue: "Password" }),
                    autoComplete: "current-password"
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ e.jsx(m.Item, { className: i("login-page-form-item", "login-page-form-submit"), children: /* @__PURE__ */ e.jsx(
            B,
            {
              disabled: N > 0,
              type: "primary",
              htmlType: "submit",
              loading: J,
              block: !0,
              children: N > 0 ? /* @__PURE__ */ e.jsxs("span", { style: { marginLeft: 8 }, children: [
                N,
                "s"
              ] }) : t("login.login", { defaultValue: "Login" })
            }
          ) })
        ]
      }
    ),
    O.length > 0 && u !== "password_expired" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(de, { className: i("login-page-divider", "login-page-divider-or"), children: t("login.or", { defaultValue: "Or" }) }),
      /* @__PURE__ */ e.jsx(ge, { direction: "vertical", className: i(c.loginPageProviders, "login-page-providers"), children: O.map((r) => /* @__PURE__ */ e.jsx(
        B,
        {
          icon: ae(r.name),
          onClick: () => ee(r.name),
          loading: b[r.name],
          block: !0,
          children: r.icon_url ? /* @__PURE__ */ e.jsx(me, { src: r.icon_url }) : t("login.continueWith", { defaultValue: "Continue with {{provider}}", provider: r.display_name })
        },
        r.name
      )) })
    ] }),
    u === "password_expired" && /* @__PURE__ */ e.jsx(_e, { className: "login-page-password-expired", onSuccess: () => {
      w("login"), j.setFieldValue("password", ""), j.setFieldValue("mfa_code", "");
    }, token: W || void 0 })
  ] }) }) });
};
export {
  ze as default
};
