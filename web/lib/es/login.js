import { j as e } from "./vendor.js";
import { useState as i, useRef as ne, useEffect as L } from "react";
import { App as ie, Form as m, Result as se, Card as le, Typography as de, Alert as B, Input as x, Button as $, Divider as ge, Space as me, Avatar as ce } from "antd";
import { KeyOutlined as ue, UserOutlined as fe, LockOutlined as pe, GithubOutlined as he } from "@ant-design/icons";
import { useNavigate as xe, useLocation as we, useSearchParams as je } from "react-router-dom";
import { u as ye, b as be } from "./contexts.js";
import { useTranslation as Pe } from "react-i18next";
import { a as D } from "./index.js";
import { A as z } from "./client.js";
import { L as G, a as _e, k as Ne } from "./components.js";
import { m as Ve, g as Le } from "./base.js";
import { clearCache as ke } from "ahooks";
import n from "classnames";
import { createStyles as Ae } from "antd-style";
const { Title: ve } = de, Te = Ae(({ css: s }) => ({
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
})), Ge = ({ transformLangConfig: s }) => {
  const { message: k } = ie.useApp(), { styles: c } = Te(), h = xe(), K = we(), [l] = je(), { login: A, oauthLogin: v, user: T } = ye(), { t, i18n: b } = Pe(), [F, d] = i(null), [P, I] = i({}), [u, w] = i("login"), [W, X] = i(null), [_, Y] = i(null), [f, H] = i(null), [j] = m.useForm(), S = ne(!1), [J, E] = i(!1), [O, C] = i([]), [N, V] = i(0), { siteConfig: o, loading: Q, error: y } = be(), [Z, R] = i("Loading..."), U = async (r) => {
    const g = async (a) => "username" in a ? await A({ username: a.username, password: a.password }) : "mfa_token" in a ? await A({ mfa_token: a.mfa_token, mfa_code: a.mfa_code }) : await v({ code: a.code, state: a.state, provider: a.provider });
    try {
      E(!0);
      const a = await g(r);
      if (ke(), await new Promise((p) => setTimeout(p, 100)), a && a.mfa_enforced && !a.mfa_enabled && K.pathname !== "/profile")
        h("/profile#mfa");
      else {
        const p = l.get("redirect");
        p ? window.location.href = p : o != null && o.home_page ? window.location.href = o.home_page : h("/");
      }
    } catch (a) {
      if (a.password_expired)
        w("password_expired"), X(a.token || null), d(null);
      else if (a.needsMFA)
        d(null), w("mfa"), h("/login", { replace: !0 }), Y(a.mfaType), H(a.user || null), j.setFieldValue("mfa_token", a.mfaToken);
      else if ("username" in r || "mfa_token" in r)
        if (a instanceof z ? d(t("login.error", { defaultValue: "Login failed: {{error}}", error: t(`login.${a}`, { defaultValue: a.message }) })) : d(typeof a == "string" ? a : t("login.error", { defaultValue: "Login failed" })), "mfa_token" in r) {
          V(30);
          const p = setInterval(() => {
            V((M) => M >= 1 ? M - 1 : 0);
          }, 1e3);
          setTimeout(() => {
            clearInterval(p), V(0);
          }, 3e4);
        } else "username" in r && w("login");
      else
        a instanceof z ? d(t("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: t(`login.${a.code}`, { defaultValue: a.message }) })) : d(typeof a == "string" ? a : t("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: a })), h("/login", { replace: !0 }), q();
    } finally {
      E(!1);
    }
  }, q = async () => {
    try {
      C(await D.oauth.getProviders() || []);
    } catch (r) {
      k.error(t("login.fetchOAuthProvidersError", {
        defaultValue: "Failed to fetch OAuth providers: {{error}}",
        error: r.message || r.toString() || String(r)
      })), C([]);
    }
  };
  L(() => {
    if (!S.current) {
      S.current = !0;
      const r = l.get("code"), g = l.get("state"), a = l.get("provider");
      r && g && a ? U({ code: r, state: g, provider: a }) : q();
    }
  }, [l, v]), L(() => {
    b.language && R((o == null ? void 0 : o.name_i18n[b.language]) || (o == null ? void 0 : o.name) || "");
  }, [o, b.language]);
  const ee = async (r) => {
    try {
      I({ ...P, [r]: !0 });
      const { url: g } = await D.oauth.getLoginUrl({ provider: r }, { headers: { "X-Base-Path": Le() } });
      window.location.href = g;
    } catch (g) {
      k.error(t("login.oauthError", { defaultValue: "OAuth login failed" })), console.error("OAuth login error:", g);
    } finally {
      I({ ...P, [r]: !1 });
    }
  }, ae = (r) => {
    switch (r.toLowerCase()) {
      case "github":
        return /* @__PURE__ */ e.jsx(he, {});
      default:
        return null;
    }
  }, re = l.get("code"), oe = l.get("state"), te = l.get("provider");
  if (L(() => {
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
        subTitle: t("login.fetchSiteConfigError", { defaultValue: "Failed to fetch site config: {{error}}", error: (y == null ? void 0 : y.message) || y })
      }
    );
  if (re && oe && te)
    return /* @__PURE__ */ e.jsx(G, {});
  if (T && T.status === "active") {
    const r = l.get("redirect");
    r ? window.location.href = r : o != null && o.home_page ? window.location.href = o.home_page : h("/");
  }
  return /* @__PURE__ */ e.jsx("div", { className: "login-page", children: /* @__PURE__ */ e.jsx("div", { className: n(c.loginPageContainer, "login-page-container"), children: /* @__PURE__ */ e.jsxs(le, { className: n(c.loginPageCard, "login-page-card"), children: [
    /* @__PURE__ */ e.jsx("div", { className: n(c.languageSwitch, "language-switch"), children: /* @__PURE__ */ e.jsx(_e, { transformLangConfig: s }) }),
    /* @__PURE__ */ e.jsxs("div", { className: n(c.loginPageTitle, "login-page-title"), children: [
      /* @__PURE__ */ e.jsx(ve, { className: "login-page-title-text", level: 2, children: Z }),
      /* @__PURE__ */ e.jsx("p", { className: "login-page-subtitle-text", children: t("login.subtitle", { defaultValue: "Enter your credentials to continue" }) })
    ] }),
    F && /* @__PURE__ */ e.jsx(
      B,
      {
        className: n(c.loginPageError, "login-page-error"),
        message: F,
        type: "error",
        showIcon: !0
      }
    ),
    u === "mfa" && _ && /* @__PURE__ */ e.jsx(
      B,
      {
        message: t(`login.mfaTips.${_}`, { defaultValue: "You have enabled MFA based on ${mfaType}, please enter the corresponding one-time password." }),
        type: "info",
        showIcon: !0,
        className: n(c.loginPageMfaAlert, "login-page-mfa-alert")
      }
    ),
    /* @__PURE__ */ e.jsxs(
      m,
      {
        name: "login",
        initialValues: { remember: !0 },
        onFinish: U,
        size: "large",
        form: j,
        hidden: u === "password_expired",
        className: "login-page-form",
        children: [
          u === "mfa" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(m.Item, { hidden: !(f != null && f.email) || _ !== "email", className: n("login-page-form-item", "login-page-form-email"), children: /* @__PURE__ */ e.jsx(x, { value: Ve(f == null ? void 0 : f.email) }) }),
            /* @__PURE__ */ e.jsx(m.Item, { name: "mfa_token", hidden: !0, className: n("login-page-form-item", "login-page-form-mfa-token"), children: /* @__PURE__ */ e.jsx(x, {}) }),
            /* @__PURE__ */ e.jsx(m.Item, { name: "mfa_code", hidden: u !== "mfa", className: n("login-page-form-item", "login-page-form-mfa-code"), children: /* @__PURE__ */ e.jsx(x, { placeholder: t("login.mfa-code", { defaultValue: "MFA Code" }), prefix: /* @__PURE__ */ e.jsx(ue, {}) }) })
          ] }),
          u === "login" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(
              m.Item,
              {
                name: "username",
                rules: [{ required: !0, message: t("login.usernameRequired", { defaultValue: "Username is required" }) }],
                className: n("login-page-form-item", "login-page-form-username"),
                children: /* @__PURE__ */ e.jsx(x, { prefix: /* @__PURE__ */ e.jsx(fe, {}), placeholder: t("login.username", { defaultValue: "Username" }), autoComplete: "username" })
              }
            ),
            /* @__PURE__ */ e.jsx(
              m.Item,
              {
                name: "password",
                rules: [{ required: !0, message: t("login.passwordRequired", { defaultValue: "Password is required" }) }],
                className: n("login-page-form-item", "login-page-form-password"),
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
          /* @__PURE__ */ e.jsx(m.Item, { className: n("login-page-form-item", "login-page-form-submit"), children: /* @__PURE__ */ e.jsx(
            $,
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
      /* @__PURE__ */ e.jsx(ge, { className: n("login-page-divider", "login-page-divider-or"), children: t("login.or", { defaultValue: "Or" }) }),
      /* @__PURE__ */ e.jsx(me, { direction: "vertical", className: n(c.loginPageProviders, "login-page-providers"), children: O.map((r) => /* @__PURE__ */ e.jsx(
        $,
        {
          icon: ae(r.name),
          onClick: () => ee(r.name),
          loading: P[r.name],
          block: !0,
          children: r.icon_url ? /* @__PURE__ */ e.jsx(ce, { src: r.icon_url }) : t("login.continueWith", { defaultValue: "Continue with {{provider}}", provider: r.display_name })
        },
        r.name
      )) })
    ] }),
    u === "password_expired" && /* @__PURE__ */ e.jsx(Ne, { className: "login-page-password-expired", onSuccess: () => {
      w("login"), j.setFieldValue("password", ""), j.setFieldValue("mfa_code", "");
    }, token: W || void 0 })
  ] }) }) });
};
export {
  Ge as default
};
