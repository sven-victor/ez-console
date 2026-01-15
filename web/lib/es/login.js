import { j as e } from "./vendor.js";
import { useState as n, useRef as oe, useEffect as V } from "react";
import { Form as d, Result as ae, Card as ne, Typography as se, Alert as U, Input as g, Button as q, Divider as ie, Space as le, Avatar as de, message as C } from "antd";
import { KeyOutlined as ue, UserOutlined as ce, LockOutlined as me, GithubOutlined as fe } from "@ant-design/icons";
import { useNavigate as ge, useLocation as he, useSearchParams as pe } from "react-router-dom";
import { a as xe, c as we } from "./contexts.js";
import { useTranslation as je } from "react-i18next";
import { a as M } from "./index.js";
import { A as $ } from "./client.js";
import { L as D, a as ye, i as _e } from "./components.js";
import { m as be, g as Ve } from "./base.js";
import { clearCache as Le } from "ahooks";
const { Title: ke } = se, qe = ({ transformLangConfig: N }) => {
  const f = ge(), z = he(), [s] = pe(), { login: L, oauthLogin: k, user: A } = xe(), { t: a, i18n: w } = je(), [T, i] = n(null), [j, v] = n({}), [u, h] = n("login"), [G, K] = n(null), [y, W] = n(null), [c, X] = n(null), [p] = d.useForm(), I = oe(!1), [Y, P] = n(!1), [F, O] = n([]), [_, b] = n(0), { siteConfig: o, loading: H, error: x } = we(), [J, E] = n("Loading..."), S = async (t) => {
    const l = async (r) => "username" in r ? await L({ username: r.username, password: r.password }) : "mfa_token" in r ? await L({ mfa_token: r.mfa_token, mfa_code: r.mfa_code }) : await k({ code: r.code, state: r.state, provider: r.provider });
    try {
      P(!0);
      const r = await l(t);
      if (Le(), await new Promise((m) => setTimeout(m, 100)), r && r.mfa_enforced && !r.mfa_enabled && z.pathname !== "/profile")
        f("/profile#mfa");
      else {
        const m = s.get("redirect");
        m ? window.location.href = m : o != null && o.home_page ? window.location.href = o.home_page : f("/");
      }
    } catch (r) {
      if (r.password_expired)
        h("password_expired"), K(r.token), i(null);
      else if (r.needsMFA)
        i(null), h("mfa"), f("/login", { replace: !0 }), W(r.mfaType), X(r.user), p.setFieldValue("mfa_token", r.mfaToken);
      else if ("username" in t || "mfa_token" in t)
        if (r instanceof $ ? i(a("login.error", { defaultValue: "Login failed: {{error}}", error: a(`login.${r}`, { defaultValue: r.message }) })) : i(typeof r == "string" ? r : a("login.error", { defaultValue: "Login failed" })), "mfa_token" in t) {
          b(30);
          const m = setInterval(() => {
            b((R) => R >= 1 ? R - 1 : 0);
          }, 1e3);
          setTimeout(() => {
            clearInterval(m), b(0);
          }, 3e4);
        } else "username" in t && h("login");
      else
        r instanceof $ ? i(a("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: a(`login.${r.code}`, { defaultValue: r.message }) })) : i(typeof r == "string" ? r : a("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: r })), f("/login", { replace: !0 }), B();
    } finally {
      P(!1);
    }
  }, B = async () => {
    try {
      O(await M.oauth.getProviders() || []);
    } catch (t) {
      C.error(a("login.fetchOAuthProvidersError", { defaultValue: "Failed to fetch OAuth providers: {{error}}", error: t.message || t.toString() })), O([]);
    }
  };
  V(() => {
    if (!I.current) {
      I.current = !0;
      const t = s.get("code"), l = s.get("state"), r = s.get("provider");
      t && l && r ? S({ code: t, state: l, provider: r }) : B();
    }
  }, [s, k]), V(() => {
    w.language && E((o == null ? void 0 : o.name_i18n[w.language]) || (o == null ? void 0 : o.name) || "");
  }, [o, w.language]);
  const Q = async (t) => {
    try {
      v({ ...j, [t]: !0 });
      const { url: l } = await M.oauth.getLoginUrl({ provider: t }, { headers: { "X-Base-Path": Ve() } });
      window.location.href = l;
    } catch (l) {
      C.error(a("login.oauthError", { defaultValue: "OAuth login failed" })), console.error("OAuth login error:", l);
    } finally {
      v({ ...j, [t]: !1 });
    }
  }, Z = (t) => {
    switch (t.toLowerCase()) {
      case "github":
        return /* @__PURE__ */ e.jsx(fe, {});
      default:
        return null;
    }
  }, ee = s.get("code"), re = s.get("state"), te = s.get("provider");
  if (V(() => {
    var t;
    o && (E(o.name), window.document.title = o.name, (t = document.getElementById("site-icon")) == null || t.setAttribute("href", o.logo || ""));
  }, [o]), H)
    return /* @__PURE__ */ e.jsx(D, {});
  if (!o)
    return /* @__PURE__ */ e.jsx(
      ae,
      {
        status: "500",
        title: "500",
        subTitle: a("login.fetchSiteConfigError", { defaultValue: "Failed to fetch site config: {{error}}", error: (x == null ? void 0 : x.message) || x })
      }
    );
  if (ee && re && te)
    return /* @__PURE__ */ e.jsx(D, {});
  if (A && A.status === "active") {
    const t = s.get("redirect");
    t ? window.location.href = t : o != null && o.home_page ? window.location.href = o.home_page : f("/");
  }
  return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx("div", { style: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5"
  }, children: /* @__PURE__ */ e.jsxs(ne, { style: { width: 400, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }, children: [
    /* @__PURE__ */ e.jsx("div", { style: {
      position: "absolute",
      top: 0,
      right: 0
    }, children: /* @__PURE__ */ e.jsx(ye, { transformLangConfig: N }) }),
    /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginBottom: 20 }, children: [
      /* @__PURE__ */ e.jsx(ke, { level: 2, children: J }),
      /* @__PURE__ */ e.jsx("p", { children: a("login.subtitle", { defaultValue: "Enter your credentials to continue" }) })
    ] }),
    T && /* @__PURE__ */ e.jsx(
      U,
      {
        message: T,
        type: "error",
        showIcon: !0,
        style: { marginBottom: 20 }
      }
    ),
    u === "mfa" && y && /* @__PURE__ */ e.jsx(
      U,
      {
        message: a(`login.mfaTips.${y}`, { defaultValue: "You have enabled MFA based on ${mfaType}, please enter the corresponding one-time password." }),
        type: "info",
        showIcon: !0,
        style: { marginBottom: 20 }
      }
    ),
    /* @__PURE__ */ e.jsxs(
      d,
      {
        name: "login",
        initialValues: { remember: !0 },
        onFinish: S,
        size: "large",
        form: p,
        hidden: u === "password_expired",
        children: [
          u === "mfa" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(d.Item, { hidden: !(c != null && c.email) || y !== "email", children: /* @__PURE__ */ e.jsx(g, { value: be(c == null ? void 0 : c.email) }) }),
            /* @__PURE__ */ e.jsx(d.Item, { name: "mfa_token", hidden: !0, children: /* @__PURE__ */ e.jsx(g, {}) }),
            /* @__PURE__ */ e.jsx(d.Item, { name: "mfa_code", hidden: u !== "mfa", children: /* @__PURE__ */ e.jsx(g, { placeholder: a("login.mfa-code", { defaultValue: "MFA Code" }), prefix: /* @__PURE__ */ e.jsx(ue, {}) }) })
          ] }),
          u === "login" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(
              d.Item,
              {
                name: "username",
                rules: [{ required: !0, message: a("login.usernameRequired", { defaultValue: "Username is required" }) }],
                children: /* @__PURE__ */ e.jsx(g, { prefix: /* @__PURE__ */ e.jsx(ce, {}), placeholder: a("login.username", { defaultValue: "Username" }), autoComplete: "username" })
              }
            ),
            /* @__PURE__ */ e.jsx(
              d.Item,
              {
                name: "password",
                rules: [{ required: !0, message: a("login.passwordRequired", { defaultValue: "Password is required" }) }],
                children: /* @__PURE__ */ e.jsx(
                  g.Password,
                  {
                    prefix: /* @__PURE__ */ e.jsx(me, {}),
                    placeholder: a("login.password", { defaultValue: "Password" }),
                    autoComplete: "current-password"
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ e.jsx(d.Item, { children: /* @__PURE__ */ e.jsx(
            q,
            {
              disabled: _ > 0,
              type: "primary",
              htmlType: "submit",
              loading: Y,
              block: !0,
              children: _ > 0 ? /* @__PURE__ */ e.jsxs("span", { style: { marginLeft: 8 }, children: [
                _,
                "s"
              ] }) : a("login.login", { defaultValue: "Login" })
            }
          ) })
        ]
      }
    ),
    F.length > 0 && u !== "password_expired" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(ie, { children: a("login.or", { defaultValue: "Or" }) }),
      /* @__PURE__ */ e.jsx(le, { direction: "vertical", style: { width: "100%" }, children: F.map((t) => /* @__PURE__ */ e.jsx(
        q,
        {
          icon: Z(t.name),
          onClick: () => Q(t.name),
          loading: j[t.name],
          block: !0,
          children: t.icon_url ? /* @__PURE__ */ e.jsx(de, { src: t.icon_url }) : a("login.continueWith", { defaultValue: "Continue with {{provider}}", provider: t.display_name })
        },
        t.name
      )) })
    ] }),
    u === "password_expired" && /* @__PURE__ */ e.jsx(_e, { onSuccess: () => {
      h("login"), p.setFieldValue("password", ""), p.setFieldValue("mfa_code", "");
    }, token: G || void 0 })
  ] }) }) });
};
export {
  qe as default
};
