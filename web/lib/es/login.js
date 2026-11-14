import { j as e } from "./vendor.js";
import { useState as s, useRef as ie, useEffect as k } from "react";
import { App as ne, Form as c, Result as se, Card as le, Typography as de, Alert as B, Input as x, Button as $, Divider as ge, Space as me, Avatar as ce } from "antd";
import { KeyOutlined as ue, UserOutlined as fe, LockOutlined as pe, GithubOutlined as he } from "@ant-design/icons";
import { useNavigate as xe, useLocation as we, useSearchParams as je } from "react-router-dom";
import { u as ye, b as be } from "./contexts.js";
import { useTranslation as Pe } from "react-i18next";
import { a as D } from "./index.js";
import { A as z } from "./client.js";
import { L as G, a as _e, b as Ne, l as Ve } from "./components.js";
import { m as Le, g as ke } from "./base.js";
import { clearCache as ve } from "ahooks";
import i from "classnames";
import { createStyles as Ae } from "antd-style";
const { Title: Te } = de, Se = Ae(({ css: n, isDarkMode: w }) => ({
  loginPageContainer: n`
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      ${w ? n`
        background: #424242;
      ` : n`
        background: #f0f2f5;
      `}
    `,
  loginPageCard: n`
      width: 400px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `,
  languageSwitch: n`
      position: absolute;
      top: 0;
      right: 30px;
    `,
  themeSwitch: n`
      position: absolute;
      top: 0;
      right: 0;
    `,
  loginPageTitle: n`
      text-align: center;
      margin-bottom: 20px;
    `,
  loginPageError: n`
      margin-bottom: 20px;
    `,
  loginPageMfaAlert: n`
      margin-bottom: 20px;
    `,
  loginPageProviders: n`
      width: 100%;
    `
})), Ke = ({ transformLangConfig: n }) => {
  const { message: w } = ne.useApp(), { styles: d } = Se(), h = xe(), K = we(), [l] = je(), { login: v, oauthLogin: A, user: T } = ye(), { t, i18n: P } = Pe(), [S, g] = s(null), [_, F] = s({}), [u, j] = s("login"), [W, X] = s(null), [N, Y] = s(null), [f, H] = s(null), [y] = c.useForm(), I = ie(!1), [J, E] = s(!1), [O, C] = s([]), [V, L] = s(0), { siteConfig: o, loading: Q, error: b } = be(), [Z, R] = s("Loading..."), U = async (r) => {
    const m = async (a) => "username" in a ? await v({ username: a.username, password: a.password }) : "mfa_token" in a ? await v({ mfa_token: a.mfa_token, mfa_code: a.mfa_code }) : await A({ code: a.code, state: a.state, provider: a.provider });
    try {
      E(!0);
      const a = await m(r);
      if (ve(), await new Promise((p) => setTimeout(p, 100)), a && a.mfa_enforced && !a.mfa_enabled && K.pathname !== "/profile")
        h("/profile#mfa");
      else {
        const p = l.get("redirect");
        p ? window.location.href = p : o != null && o.home_page ? window.location.href = o.home_page : h("/");
      }
    } catch (a) {
      if (a.password_expired)
        j("password_expired"), X(a.token || null), g(null);
      else if (a.needsMFA)
        g(null), j("mfa"), h("/login", { replace: !0 }), Y(a.mfaType), H(a.user || null), y.setFieldValue("mfa_token", a.mfaToken);
      else if ("username" in r || "mfa_token" in r)
        if (a instanceof z ? g(t("login.error", { defaultValue: "Login failed: {{error}}", error: t(`login.${a}`, { defaultValue: a.message }) })) : g(typeof a == "string" ? a : t("login.error", { defaultValue: "Login failed" })), "mfa_token" in r) {
          L(30);
          const p = setInterval(() => {
            L((M) => M >= 1 ? M - 1 : 0);
          }, 1e3);
          setTimeout(() => {
            clearInterval(p), L(0);
          }, 3e4);
        } else "username" in r && j("login");
      else
        a instanceof z ? g(t("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: t(`login.${a.code}`, { defaultValue: a.message }) })) : g(typeof a == "string" ? a : t("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: a })), h("/login", { replace: !0 }), q();
    } finally {
      E(!1);
    }
  }, q = async () => {
    try {
      C(await D.oauth.getProviders() || []);
    } catch (r) {
      w.error(t("login.fetchOAuthProvidersError", {
        defaultValue: "Failed to fetch OAuth providers: {{error}}",
        error: r.message || r.toString() || String(r)
      })), C([]);
    }
  };
  k(() => {
    if (!I.current) {
      I.current = !0;
      const r = l.get("code"), m = l.get("state"), a = l.get("provider");
      r && m && a ? U({ code: r, state: m, provider: a }) : q();
    }
  }, [l, A]), k(() => {
    P.language && R((o == null ? void 0 : o.name_i18n[P.language]) || (o == null ? void 0 : o.name) || "");
  }, [o, P.language]);
  const ee = async (r) => {
    try {
      F({ ..._, [r]: !0 });
      const { url: m } = await D.oauth.getLoginUrl({ provider: r }, { headers: { "X-Base-Path": ke() } });
      window.location.href = m;
    } catch (m) {
      w.error(t("login.oauthError", { defaultValue: "OAuth login failed" })), console.error("OAuth login error:", m);
    } finally {
      F({ ..._, [r]: !1 });
    }
  }, ae = (r) => {
    switch (r.toLowerCase()) {
      case "github":
        return /* @__PURE__ */ e.jsx(he, {});
      default:
        return null;
    }
  }, re = l.get("code"), oe = l.get("state"), te = l.get("provider");
  if (k(() => {
    var r;
    o && (R(o.name), window.document.title = o.name, (r = document.getElementById("site-icon")) == null || r.setAttribute("href", o.logo || ""));
  }, [o]), Q)
    return /* @__PURE__ */ e.jsx(G, {});
  if (!o)
    return /* @__PURE__ */ e.jsx(
      se,
      {
        status: "500",
        title: "500",
        subTitle: t("login.fetchSiteConfigError", { defaultValue: "Failed to fetch site config: {{error}}", error: (b == null ? void 0 : b.message) || b })
      }
    );
  if (re && oe && te)
    return /* @__PURE__ */ e.jsx(G, {});
  if (T && T.status === "active") {
    const r = l.get("redirect");
    r ? window.location.href = r : o != null && o.home_page ? window.location.href = o.home_page : h("/");
  }
  return /* @__PURE__ */ e.jsx("div", { className: "login-page", children: /* @__PURE__ */ e.jsx("div", { className: i(d.loginPageContainer, "login-page-container"), children: /* @__PURE__ */ e.jsxs(le, { className: i(d.loginPageCard, "login-page-card"), children: [
    /* @__PURE__ */ e.jsx("div", { className: i(d.languageSwitch, "language-switch"), children: /* @__PURE__ */ e.jsx(_e, { transformLangConfig: n }) }),
    /* @__PURE__ */ e.jsx("div", { className: i(d.themeSwitch, "theme-switch"), children: /* @__PURE__ */ e.jsx(Ne, {}) }),
    /* @__PURE__ */ e.jsxs("div", { className: i(d.loginPageTitle, "login-page-title"), children: [
      /* @__PURE__ */ e.jsx(Te, { className: "login-page-title-text", level: 2, children: Z }),
      /* @__PURE__ */ e.jsx("p", { className: "login-page-subtitle-text", children: t("login.subtitle", { defaultValue: "Enter your credentials to continue" }) })
    ] }),
    S && /* @__PURE__ */ e.jsx(
      B,
      {
        className: i(d.loginPageError, "login-page-error"),
        message: S,
        type: "error",
        showIcon: !0
      }
    ),
    u === "mfa" && N && /* @__PURE__ */ e.jsx(
      B,
      {
        message: t(`login.mfaTips.${N}`, { defaultValue: "You have enabled MFA based on ${mfaType}, please enter the corresponding one-time password." }),
        type: "info",
        showIcon: !0,
        className: i(d.loginPageMfaAlert, "login-page-mfa-alert")
      }
    ),
    /* @__PURE__ */ e.jsxs(
      c,
      {
        name: "login",
        initialValues: { remember: !0 },
        onFinish: U,
        size: "large",
        form: y,
        hidden: u === "password_expired",
        className: "login-page-form",
        children: [
          u === "mfa" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(c.Item, { hidden: !(f != null && f.email) || N !== "email", className: i("login-page-form-item", "login-page-form-email"), children: /* @__PURE__ */ e.jsx(x, { value: Le(f == null ? void 0 : f.email) }) }),
            /* @__PURE__ */ e.jsx(c.Item, { name: "mfa_token", hidden: !0, className: i("login-page-form-item", "login-page-form-mfa-token"), children: /* @__PURE__ */ e.jsx(x, {}) }),
            /* @__PURE__ */ e.jsx(c.Item, { name: "mfa_code", hidden: u !== "mfa", className: i("login-page-form-item", "login-page-form-mfa-code"), children: /* @__PURE__ */ e.jsx(x, { placeholder: t("login.mfa-code", { defaultValue: "MFA Code" }), prefix: /* @__PURE__ */ e.jsx(ue, {}) }) })
          ] }),
          u === "login" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(
              c.Item,
              {
                name: "username",
                rules: [{ required: !0, message: t("login.usernameRequired", { defaultValue: "Username is required" }) }],
                className: i("login-page-form-item", "login-page-form-username"),
                children: /* @__PURE__ */ e.jsx(x, { prefix: /* @__PURE__ */ e.jsx(fe, {}), placeholder: t("login.username", { defaultValue: "Username" }), autoComplete: "username" })
              }
            ),
            /* @__PURE__ */ e.jsx(
              c.Item,
              {
                name: "password",
                rules: [{ required: !0, message: t("login.passwordRequired", { defaultValue: "Password is required" }) }],
                className: i("login-page-form-item", "login-page-form-password"),
                children: /* @__PURE__ */ e.jsx(
                  x.Password,
                  {
                    prefix: /* @__PURE__ */ e.jsx(pe, {}),
                    placeholder: t("login.password", { defaultValue: "Password" }),
                    autoComplete: "current-password"
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ e.jsx(c.Item, { className: i("login-page-form-item", "login-page-form-submit"), children: /* @__PURE__ */ e.jsx(
            $,
            {
              disabled: V > 0,
              type: "primary",
              htmlType: "submit",
              loading: J,
              block: !0,
              children: V > 0 ? /* @__PURE__ */ e.jsxs("span", { style: { marginLeft: 8 }, children: [
                V,
                "s"
              ] }) : t("login.login", { defaultValue: "Login" })
            }
          ) })
        ]
      }
    ),
    O.length > 0 && u !== "password_expired" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(ge, { className: i("login-page-divider", "login-page-divider-or"), children: t("login.or", { defaultValue: "Or" }) }),
      /* @__PURE__ */ e.jsx(me, { direction: "vertical", className: i(d.loginPageProviders, "login-page-providers"), children: O.map((r) => /* @__PURE__ */ e.jsx(
        $,
        {
          icon: ae(r.name),
          onClick: () => ee(r.name),
          loading: _[r.name],
          block: !0,
          children: r.icon_url ? /* @__PURE__ */ e.jsx(ce, { src: r.icon_url }) : t("login.continueWith", { defaultValue: "Continue with {{provider}}", provider: r.display_name })
        },
        r.name
      )) })
    ] }),
    u === "password_expired" && /* @__PURE__ */ e.jsx(Ve, { className: "login-page-password-expired", onSuccess: () => {
      j("login"), y.setFieldValue("password", ""), y.setFieldValue("mfa_code", "");
    }, token: W || void 0 })
  ] }) }) });
};
export {
  Ke as default
};
