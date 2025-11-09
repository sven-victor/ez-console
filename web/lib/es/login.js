import { j as e } from "./vendor.js";
import { useState as n, useRef as Z, useEffect as b } from "react";
import { Form as d, Card as ee, Typography as te, Alert as B, Input as g, Button as R, Divider as re, Space as oe, Avatar as ae, message as ne } from "antd";
import { KeyOutlined as se, UserOutlined as ie, LockOutlined as le, GithubOutlined as de } from "@ant-design/icons";
import { useNavigate as ce, useLocation as ue, useSearchParams as me } from "react-router-dom";
import { u as fe, b as ge } from "./contexts.js";
import { useTranslation as he } from "react-i18next";
import { a as U } from "./index.js";
import { A as q } from "./client.js";
import { L as pe, a as xe, j as we } from "./components.js";
import { m as je, g as ye } from "./base.js";
import { clearCache as _e } from "ahooks";
const { Title: be } = te, Be = ({ transformLangConfig: C }) => {
  const f = ce(), M = ue(), [s] = me(), { login: L, oauthLogin: V, user: k } = fe(), { t: a, i18n: x } = he(), [A, i] = n(null), [w, I] = n({}), [c, h] = n("login"), [$, D] = n(null), [j, N] = n(null), [u, z] = n(null), [p] = d.useForm(), T = Z(!1), [G, P] = n(!1), [v, K] = n([]), [y, _] = n(0), { siteConfig: o } = ge(), [W, F] = n("Loading..."), O = async (r) => {
    const l = async (t) => "username" in t ? await L({ username: t.username, password: t.password }) : "mfa_token" in t ? await L({ mfa_token: t.mfa_token, mfa_code: t.mfa_code }) : await V({ code: t.code, state: t.state, provider: t.provider });
    try {
      P(!0);
      const t = await l(r);
      if (_e(), await new Promise((m) => setTimeout(m, 100)), t && t.mfa_enforced && !t.mfa_enabled && M.pathname !== "/profile")
        f("/profile#mfa");
      else {
        const m = s.get("redirect");
        m ? window.location.href = m : o != null && o.home_page ? window.location.href = o.home_page : f("/");
      }
    } catch (t) {
      if (t.password_expired)
        h("password_expired"), D(t.token), i(null);
      else if (t.needsMFA)
        i(null), h("mfa"), f("/login", { replace: !0 }), N(t.mfaType), z(t.user), p.setFieldValue("mfa_token", t.mfaToken);
      else if ("username" in r || "mfa_token" in r)
        if (t instanceof q ? i(a("login.error", { defaultValue: "Login failed: {{error}}", error: a(`login.${t}`, { defaultValue: t.message }) })) : i(typeof t == "string" ? t : a("login.error", { defaultValue: "Login failed" })), "mfa_token" in r) {
          _(30);
          const m = setInterval(() => {
            _((S) => S >= 1 ? S - 1 : 0);
          }, 1e3);
          setTimeout(() => {
            clearInterval(m), _(0);
          }, 3e4);
        } else "username" in r && h("login");
      else
        t instanceof q ? i(a("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: a(`login.${t.code}`, { defaultValue: t.message }) })) : i(typeof t == "string" ? t : a("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: t })), f("/login", { replace: !0 }), E();
    } finally {
      P(!1);
    }
  }, E = async () => {
    K(await U.oauth.getProviders() || []);
  };
  b(() => {
    if (!T.current) {
      T.current = !0;
      const r = s.get("code"), l = s.get("state"), t = s.get("provider");
      r && l && t ? O({ code: r, state: l, provider: t }) : E();
    }
  }, [s, V]), b(() => {
    x.language && F((o == null ? void 0 : o.name_i18n[x.language]) || (o == null ? void 0 : o.name) || "");
  }, [o, x.language]);
  const X = async (r) => {
    try {
      I({ ...w, [r]: !0 });
      const { url: l } = await U.oauth.getLoginUrl({ provider: r }, { headers: { "X-Base-Path": ye() } });
      window.location.href = l;
    } catch (l) {
      ne.error(a("login.oauthError", { defaultValue: "OAuth login failed" })), console.error("OAuth login error:", l);
    } finally {
      I({ ...w, [r]: !1 });
    }
  }, Y = (r) => {
    switch (r.toLowerCase()) {
      case "github":
        return /* @__PURE__ */ e.jsx(de, {});
      default:
        return null;
    }
  }, H = s.get("code"), J = s.get("state"), Q = s.get("provider");
  if (b(() => {
    var r;
    o && (F(o.name), window.document.title = o.name, (r = document.getElementById("site-icon")) == null || r.setAttribute("href", o.logo || ""));
  }, [o]), H && J && Q || !o)
    return /* @__PURE__ */ e.jsx(pe, {});
  if (k && k.status === "active") {
    const r = s.get("redirect");
    r ? window.location.href = r : o != null && o.home_page ? window.location.href = o.home_page : f("/");
  }
  return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx("div", { style: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5"
  }, children: /* @__PURE__ */ e.jsxs(ee, { style: { width: 400, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }, children: [
    /* @__PURE__ */ e.jsx("div", { style: {
      position: "absolute",
      top: 0,
      right: 0
    }, children: /* @__PURE__ */ e.jsx(xe, { transformLangConfig: C }) }),
    /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginBottom: 20 }, children: [
      /* @__PURE__ */ e.jsx(be, { level: 2, children: W }),
      /* @__PURE__ */ e.jsx("p", { children: a("login.subtitle", { defaultValue: "Enter your credentials to continue" }) })
    ] }),
    A && /* @__PURE__ */ e.jsx(
      B,
      {
        message: A,
        type: "error",
        showIcon: !0,
        style: { marginBottom: 20 }
      }
    ),
    j && /* @__PURE__ */ e.jsx(
      B,
      {
        message: a(`login.mfaTips.${j}`, { defaultValue: "You have enabled MFA based on ${mfaType}, please enter the corresponding one-time password." }),
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
            /* @__PURE__ */ e.jsx(d.Item, { name: "mfa_code", hidden: c !== "mfa", children: /* @__PURE__ */ e.jsx(g, { placeholder: a("login.mfa-code", { defaultValue: "MFA Code" }), prefix: /* @__PURE__ */ e.jsx(se, {}) }) })
          ] }),
          c === "login" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(
              d.Item,
              {
                name: "username",
                rules: [{ required: !0, message: a("login.usernameRequired", { defaultValue: "Username is required" }) }],
                children: /* @__PURE__ */ e.jsx(g, { prefix: /* @__PURE__ */ e.jsx(ie, {}), placeholder: a("login.username", { defaultValue: "Username" }), autoComplete: "username" })
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
                    prefix: /* @__PURE__ */ e.jsx(le, {}),
                    placeholder: a("login.password", { defaultValue: "Password" }),
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
              ] }) : a("login.login", { defaultValue: "Login" })
            }
          ) })
        ]
      }
    ),
    v.length > 0 && c !== "password_expired" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(re, { children: a("login.or", { defaultValue: "Or" }) }),
      /* @__PURE__ */ e.jsx(oe, { direction: "vertical", style: { width: "100%" }, children: v.map((r) => /* @__PURE__ */ e.jsx(
        R,
        {
          icon: Y(r.name),
          onClick: () => X(r.name),
          loading: w[r.name],
          block: !0,
          children: r.icon_url ? /* @__PURE__ */ e.jsx(ae, { src: r.icon_url }) : a("login.continueWith", { defaultValue: "Continue with {{provider}}", provider: r.display_name })
        },
        r.name
      )) })
    ] }),
    c === "password_expired" && /* @__PURE__ */ e.jsx(we, { onSuccess: () => {
      h("login"), p.setFieldValue("password", ""), p.setFieldValue("mfa_code", "");
    }, token: $ || void 0 })
  ] }) }) });
};
export {
  Be as default
};
