import { u as Z, r as d, j as e, C as ee, J as te, z as B, p as g, ax as oe, ac as ae, ay as re, m as O, g as ne, o as se, A as ie, s as le, az as de } from "./vendor.js";
import { useState as s, useRef as ce, useEffect as b } from "react";
import { useNavigate as ue, useLocation as me, useSearchParams as fe } from "react-router-dom";
import { u as ge } from "./contexts.js";
import { a as V } from "./index.js";
import { A as $ } from "./client.js";
import { L as he, a as pe, i as xe } from "./components.js";
import { m as we } from "./base.js";
const { Title: je } = te, Te = () => {
  const f = ue(), q = me(), [i] = fe(), { login: I, oauthLogin: L, user: k } = ge(), { t: a, i18n: x } = Z(), [A, l] = s(null), [w, T] = s({}), [c, h] = s("login"), [M, U] = s(null), [j, z] = s(null), [u, D] = s(null), [p] = d.useForm(), v = ce(!1), [N, P] = s(!1), [F, J] = s([]), [y, _] = s(0), [W, S] = s("Loading..."), [r, Y] = s(null), E = async (o) => {
    const n = async (t) => "username" in t ? await I({ username: t.username, password: t.password }) : "mfa_token" in t ? await I({ mfa_token: t.mfa_token, mfa_code: t.mfa_code }) : await L({ code: t.code, state: t.state, provider: t.provider });
    try {
      P(!0);
      const t = await n(o);
      if (await new Promise((m) => setTimeout(m, 100)), t && t.mfa_enforced && !t.mfa_enabled && q.pathname !== "/profile")
        f("/profile#mfa");
      else {
        const m = i.get("redirect");
        m ? window.location.href = m : r != null && r.home_page ? window.location.href = r.home_page : f("/");
      }
    } catch (t) {
      if (t.password_expired)
        h("password_expired"), U(t.token), l(null);
      else if (t.needsMFA)
        l(null), h("mfa"), f("/login", { replace: !0 }), z(t.mfaType), D(t.user), p.setFieldValue("mfa_token", t.mfaToken);
      else if ("username" in o || "mfa_token" in o)
        if (t instanceof $ ? l(a("login.error", { defaultValue: "Login failed: {{error}}", error: a(`login.${t}`, { defaultValue: t.message }) })) : l(typeof t == "string" ? t : a("login.error", { defaultValue: "Login failed" })), "mfa_token" in o) {
          _(30);
          const m = setInterval(() => {
            _((C) => C >= 1 ? C - 1 : 0);
          }, 1e3);
          setTimeout(() => {
            clearInterval(m), _(0);
          }, 3e4);
        } else "username" in o && h("login");
      else
        t instanceof $ ? l(a("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: a(`login.${t.code}`, { defaultValue: t.message }) })) : l(typeof t == "string" ? t : a("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: t })), f("/login", { replace: !0 }), R();
    } finally {
      P(!1);
    }
  }, R = async () => {
    J(await V.oauth.getProviders() || []);
  };
  b(() => {
    if (!v.current) {
      v.current = !0;
      const o = i.get("code"), n = i.get("state"), t = i.get("provider");
      o && n && t ? E({ code: o, state: n, provider: t }) : R();
    }
  }, [i, L]), b(() => {
    x.language && S((r == null ? void 0 : r.name_i18n[x.language]) || (r == null ? void 0 : r.name) || "");
  }, [r, x.language]);
  const G = async (o) => {
    try {
      T({ ...w, [o]: !0 });
      const { url: n } = await V.oauth.getLoginUrl({ provider: o });
      window.location.href = n;
    } catch (n) {
      le.error(a("login.oauthError", { defaultValue: "OAuth login failed" })), console.error("OAuth login error:", n);
    } finally {
      T({ ...w, [o]: !1 });
    }
  }, H = (o) => {
    switch (o.toLowerCase()) {
      case "github":
        return /* @__PURE__ */ e.jsx(de, {});
      default:
        return null;
    }
  }, K = i.get("code"), Q = i.get("state"), X = i.get("provider");
  if (b(() => {
    (async () => {
      var t;
      const n = await V.system.getSiteConfig();
      S(n.name), Y(n), window.document.title = n.name, (t = document.getElementById("site-icon")) == null || t.setAttribute("href", n.logo);
    })();
  }, []), K && Q && X || !r)
    return /* @__PURE__ */ e.jsx(he, {});
  if (k && k.status === "active") {
    const o = i.get("redirect");
    o ? window.location.href = o : r != null && r.home_page ? window.location.href = r.home_page : f("/");
  }
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx("div", { style: {
      position: "absolute",
      top: 0,
      right: 0
    }, children: /* @__PURE__ */ e.jsx(pe, {}) }),
    /* @__PURE__ */ e.jsx("div", { style: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f0f2f5"
    }, children: /* @__PURE__ */ e.jsxs(ee, { style: { width: 400, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }, children: [
      /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginBottom: 20 }, children: [
        /* @__PURE__ */ e.jsx(je, { level: 2, children: W }),
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
          onFinish: E,
          size: "large",
          form: p,
          hidden: c === "password_expired",
          children: [
            c === "mfa" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(d.Item, { hidden: !(u != null && u.email) || j !== "email", children: /* @__PURE__ */ e.jsx(g, { value: we(u == null ? void 0 : u.email) }) }),
              /* @__PURE__ */ e.jsx(d.Item, { name: "mfa_token", hidden: !0, children: /* @__PURE__ */ e.jsx(g, {}) }),
              /* @__PURE__ */ e.jsx(d.Item, { name: "mfa_code", hidden: c !== "mfa", children: /* @__PURE__ */ e.jsx(g, { placeholder: a("login.mfa-code", { defaultValue: "MFA Code" }), prefix: /* @__PURE__ */ e.jsx(oe, {}) }) })
            ] }),
            c === "login" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                d.Item,
                {
                  name: "username",
                  rules: [{ required: !0, message: a("login.usernameRequired", { defaultValue: "Username is required" }) }],
                  children: /* @__PURE__ */ e.jsx(g, { prefix: /* @__PURE__ */ e.jsx(ae, {}), placeholder: a("login.username", { defaultValue: "Username" }), autoComplete: "username" })
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
                      prefix: /* @__PURE__ */ e.jsx(re, {}),
                      placeholder: a("login.password", { defaultValue: "Password" }),
                      autoComplete: "current-password"
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ e.jsx(d.Item, { children: /* @__PURE__ */ e.jsx(
              O,
              {
                disabled: y > 0,
                type: "primary",
                htmlType: "submit",
                loading: N,
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
      F.length > 0 && c !== "password_expired" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(ne, { children: a("login.or", { defaultValue: "Or" }) }),
        /* @__PURE__ */ e.jsx(se, { direction: "vertical", style: { width: "100%" }, children: F.map((o) => /* @__PURE__ */ e.jsx(
          O,
          {
            icon: H(o.name),
            onClick: () => G(o.name),
            loading: w[o.name],
            block: !0,
            children: o.icon_url ? /* @__PURE__ */ e.jsx(ie, { src: o.icon_url }) : a("login.continueWith", { defaultValue: "Continue with {{provider}}", provider: o.display_name })
          },
          o.name
        )) })
      ] }),
      c === "password_expired" && /* @__PURE__ */ e.jsx(xe, { onSuccess: () => {
        h("login"), p.setFieldValue("password", ""), p.setFieldValue("mfa_code", "");
      }, token: M || void 0 })
    ] }) })
  ] });
};
export {
  Te as default
};
