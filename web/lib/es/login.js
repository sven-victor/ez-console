import { j as e } from "./vendor.js";
import { useState as s, useRef as ee, useEffect as b } from "react";
import { Form as d, Card as te, Typography as oe, Alert as C, Input as g, Button as R, Divider as re, Space as ne, Avatar as ae, message as se } from "antd";
import { KeyOutlined as ie, UserOutlined as le, LockOutlined as de, GithubOutlined as ce } from "@ant-design/icons";
import { useNavigate as ue, useLocation as me, useSearchParams as fe } from "react-router-dom";
import { u as ge } from "./contexts.js";
import { useTranslation as he } from "react-i18next";
import { a as L } from "./index.js";
import { A as U } from "./client.js";
import { L as pe, a as xe, j as we } from "./components.js";
import { m as je, g as ye } from "./base.js";
const { Title: _e } = oe, Oe = ({ transformLangConfig: q }) => {
  const f = ue(), M = me(), [i] = fe(), { login: V, oauthLogin: k, user: A } = ge(), { t: r, i18n: x } = he(), [I, l] = s(null), [w, T] = s({}), [c, h] = s("login"), [$, D] = s(null), [j, N] = s(null), [u, z] = s(null), [p] = d.useForm(), P = ee(!1), [G, v] = s(!1), [F, K] = s([]), [y, _] = s(0), [W, S] = s("Loading..."), [n, X] = s(null), O = async (o) => {
    const a = async (t) => "username" in t ? await V({ username: t.username, password: t.password }) : "mfa_token" in t ? await V({ mfa_token: t.mfa_token, mfa_code: t.mfa_code }) : await k({ code: t.code, state: t.state, provider: t.provider });
    try {
      v(!0);
      const t = await a(o);
      if (await new Promise((m) => setTimeout(m, 100)), t && t.mfa_enforced && !t.mfa_enabled && M.pathname !== "/profile")
        f("/profile#mfa");
      else {
        const m = i.get("redirect");
        m ? window.location.href = m : n != null && n.home_page ? window.location.href = n.home_page : f("/");
      }
    } catch (t) {
      if (t.password_expired)
        h("password_expired"), D(t.token), l(null);
      else if (t.needsMFA)
        l(null), h("mfa"), f("/login", { replace: !0 }), N(t.mfaType), z(t.user), p.setFieldValue("mfa_token", t.mfaToken);
      else if ("username" in o || "mfa_token" in o)
        if (t instanceof U ? l(r("login.error", { defaultValue: "Login failed: {{error}}", error: r(`login.${t}`, { defaultValue: t.message }) })) : l(typeof t == "string" ? t : r("login.error", { defaultValue: "Login failed" })), "mfa_token" in o) {
          _(30);
          const m = setInterval(() => {
            _((B) => B >= 1 ? B - 1 : 0);
          }, 1e3);
          setTimeout(() => {
            clearInterval(m), _(0);
          }, 3e4);
        } else "username" in o && h("login");
      else
        t instanceof U ? l(r("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: r(`login.${t.code}`, { defaultValue: t.message }) })) : l(typeof t == "string" ? t : r("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: t })), f("/login", { replace: !0 }), E();
    } finally {
      v(!1);
    }
  }, E = async () => {
    K(await L.oauth.getProviders() || []);
  };
  b(() => {
    if (!P.current) {
      P.current = !0;
      const o = i.get("code"), a = i.get("state"), t = i.get("provider");
      o && a && t ? O({ code: o, state: a, provider: t }) : E();
    }
  }, [i, k]), b(() => {
    x.language && S((n == null ? void 0 : n.name_i18n[x.language]) || (n == null ? void 0 : n.name) || "");
  }, [n, x.language]);
  const Y = async (o) => {
    try {
      T({ ...w, [o]: !0 });
      const { url: a } = await L.oauth.getLoginUrl({ provider: o }, { headers: { "X-Base-Path": ye() } });
      window.location.href = a;
    } catch (a) {
      se.error(r("login.oauthError", { defaultValue: "OAuth login failed" })), console.error("OAuth login error:", a);
    } finally {
      T({ ...w, [o]: !1 });
    }
  }, H = (o) => {
    switch (o.toLowerCase()) {
      case "github":
        return /* @__PURE__ */ e.jsx(ce, {});
      default:
        return null;
    }
  }, J = i.get("code"), Q = i.get("state"), Z = i.get("provider");
  if (b(() => {
    (async () => {
      var t;
      const a = await L.system.getSiteConfig();
      S(a.name), X(a), window.document.title = a.name, (t = document.getElementById("site-icon")) == null || t.setAttribute("href", a.logo);
    })();
  }, []), J && Q && Z || !n)
    return /* @__PURE__ */ e.jsx(pe, {});
  if (A && A.status === "active") {
    const o = i.get("redirect");
    o ? window.location.href = o : n != null && n.home_page ? window.location.href = n.home_page : f("/");
  }
  return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx("div", { style: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5"
  }, children: /* @__PURE__ */ e.jsxs(te, { style: { width: 400, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }, children: [
    /* @__PURE__ */ e.jsx("div", { style: {
      position: "absolute",
      top: 0,
      right: 0
    }, children: /* @__PURE__ */ e.jsx(xe, { transformLangConfig: q }) }),
    /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginBottom: 20 }, children: [
      /* @__PURE__ */ e.jsx(_e, { level: 2, children: W }),
      /* @__PURE__ */ e.jsx("p", { children: r("login.subtitle", { defaultValue: "Enter your credentials to continue" }) })
    ] }),
    I && /* @__PURE__ */ e.jsx(
      C,
      {
        message: I,
        type: "error",
        showIcon: !0,
        style: { marginBottom: 20 }
      }
    ),
    j && /* @__PURE__ */ e.jsx(
      C,
      {
        message: r(`login.mfaTips.${j}`, { defaultValue: "You have enabled MFA based on ${mfaType}, please enter the corresponding one-time password." }),
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
        onFinish: O,
        size: "large",
        form: p,
        hidden: c === "password_expired",
        children: [
          c === "mfa" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(d.Item, { hidden: !(u != null && u.email) || j !== "email", children: /* @__PURE__ */ e.jsx(g, { value: je(u == null ? void 0 : u.email) }) }),
            /* @__PURE__ */ e.jsx(d.Item, { name: "mfa_token", hidden: !0, children: /* @__PURE__ */ e.jsx(g, {}) }),
            /* @__PURE__ */ e.jsx(d.Item, { name: "mfa_code", hidden: c !== "mfa", children: /* @__PURE__ */ e.jsx(g, { placeholder: r("login.mfa-code", { defaultValue: "MFA Code" }), prefix: /* @__PURE__ */ e.jsx(ie, {}) }) })
          ] }),
          c === "login" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(
              d.Item,
              {
                name: "username",
                rules: [{ required: !0, message: r("login.usernameRequired", { defaultValue: "Username is required" }) }],
                children: /* @__PURE__ */ e.jsx(g, { prefix: /* @__PURE__ */ e.jsx(le, {}), placeholder: r("login.username", { defaultValue: "Username" }), autoComplete: "username" })
              }
            ),
            /* @__PURE__ */ e.jsx(
              d.Item,
              {
                name: "password",
                rules: [{ required: !0, message: r("login.passwordRequired", { defaultValue: "Password is required" }) }],
                children: /* @__PURE__ */ e.jsx(
                  g.Password,
                  {
                    prefix: /* @__PURE__ */ e.jsx(de, {}),
                    placeholder: r("login.password", { defaultValue: "Password" }),
                    autoComplete: "current-password"
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ e.jsx(d.Item, { children: /* @__PURE__ */ e.jsx(
            R,
            {
              disabled: y > 0,
              type: "primary",
              htmlType: "submit",
              loading: G,
              block: !0,
              children: y > 0 ? /* @__PURE__ */ e.jsxs("span", { style: { marginLeft: 8 }, children: [
                y,
                "s"
              ] }) : r("login.login", { defaultValue: "Login" })
            }
          ) })
        ]
      }
    ),
    F.length > 0 && c !== "password_expired" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(re, { children: r("login.or", { defaultValue: "Or" }) }),
      /* @__PURE__ */ e.jsx(ne, { direction: "vertical", style: { width: "100%" }, children: F.map((o) => /* @__PURE__ */ e.jsx(
        R,
        {
          icon: H(o.name),
          onClick: () => Y(o.name),
          loading: w[o.name],
          block: !0,
          children: o.icon_url ? /* @__PURE__ */ e.jsx(ae, { src: o.icon_url }) : r("login.continueWith", { defaultValue: "Continue with {{provider}}", provider: o.display_name })
        },
        o.name
      )) })
    ] }),
    c === "password_expired" && /* @__PURE__ */ e.jsx(we, { onSuccess: () => {
      h("login"), p.setFieldValue("password", ""), p.setFieldValue("mfa_code", "");
    }, token: $ || void 0 })
  ] }) }) });
};
export {
  Oe as default
};
