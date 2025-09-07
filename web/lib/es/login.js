import { u as Z, r as d, j as e, C as ee, J as te, z as B, p as g, ax as ae, ac as oe, ay as re, m as O, g as se, o as ne, A as ie, s as le, az as de } from "./vendor.js";
import { useState as n, useRef as ce, useEffect as b } from "react";
import { useNavigate as ue, useLocation as me, useSearchParams as fe } from "react-router-dom";
import { u as ge } from "./contexts.js";
import { a as V } from "./index.js";
import { A as $ } from "./client.js";
import { L as he, a as pe, i as xe } from "./components.js";
import { m as we, g as je } from "./base.js";
const { Title: ye } = te, Pe = () => {
  const f = ue(), q = me(), [i] = fe(), { login: L, oauthLogin: I, user: k } = ge(), { t: o, i18n: x } = Z(), [A, l] = n(null), [w, T] = n({}), [c, h] = n("login"), [U, M] = n(null), [j, z] = n(null), [u, D] = n(null), [p] = d.useForm(), P = ce(!1), [N, v] = n(!1), [F, J] = n([]), [y, _] = n(0), [W, S] = n("Loading..."), [r, X] = n(null), R = async (a) => {
    const s = async (t) => "username" in t ? await L({ username: t.username, password: t.password }) : "mfa_token" in t ? await L({ mfa_token: t.mfa_token, mfa_code: t.mfa_code }) : await I({ code: t.code, state: t.state, provider: t.provider });
    try {
      v(!0);
      const t = await s(a);
      if (await new Promise((m) => setTimeout(m, 100)), t && t.mfa_enforced && !t.mfa_enabled && q.pathname !== "/profile")
        f("/profile#mfa");
      else {
        const m = i.get("redirect");
        m ? window.location.href = m : r != null && r.home_page ? window.location.href = r.home_page : f("/");
      }
    } catch (t) {
      if (t.password_expired)
        h("password_expired"), M(t.token), l(null);
      else if (t.needsMFA)
        l(null), h("mfa"), f("/login", { replace: !0 }), z(t.mfaType), D(t.user), p.setFieldValue("mfa_token", t.mfaToken);
      else if ("username" in a || "mfa_token" in a)
        if (t instanceof $ ? l(o("login.error", { defaultValue: "Login failed: {{error}}", error: o(`login.${t}`, { defaultValue: t.message }) })) : l(typeof t == "string" ? t : o("login.error", { defaultValue: "Login failed" })), "mfa_token" in a) {
          _(30);
          const m = setInterval(() => {
            _((C) => C >= 1 ? C - 1 : 0);
          }, 1e3);
          setTimeout(() => {
            clearInterval(m), _(0);
          }, 3e4);
        } else "username" in a && h("login");
      else
        t instanceof $ ? l(o("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: o(`login.${t.code}`, { defaultValue: t.message }) })) : l(typeof t == "string" ? t : o("login.oauthError", { defaultValue: "OAuth login failed: {{error}}", error: t })), f("/login", { replace: !0 }), E();
    } finally {
      v(!1);
    }
  }, E = async () => {
    J(await V.oauth.getProviders() || []);
  };
  b(() => {
    if (!P.current) {
      P.current = !0;
      const a = i.get("code"), s = i.get("state"), t = i.get("provider");
      a && s && t ? R({ code: a, state: s, provider: t }) : E();
    }
  }, [i, I]), b(() => {
    x.language && S((r == null ? void 0 : r.name_i18n[x.language]) || (r == null ? void 0 : r.name) || "");
  }, [r, x.language]);
  const Y = async (a) => {
    try {
      T({ ...w, [a]: !0 });
      const { url: s } = await V.oauth.getLoginUrl({ provider: a }, { headers: { "X-Base-Path": je() } });
      window.location.href = s;
    } catch (s) {
      le.error(o("login.oauthError", { defaultValue: "OAuth login failed" })), console.error("OAuth login error:", s);
    } finally {
      T({ ...w, [a]: !1 });
    }
  }, G = (a) => {
    switch (a.toLowerCase()) {
      case "github":
        return /* @__PURE__ */ e.jsx(de, {});
      default:
        return null;
    }
  }, H = i.get("code"), K = i.get("state"), Q = i.get("provider");
  if (b(() => {
    (async () => {
      var t;
      const s = await V.system.getSiteConfig();
      S(s.name), X(s), window.document.title = s.name, (t = document.getElementById("site-icon")) == null || t.setAttribute("href", s.logo);
    })();
  }, []), H && K && Q || !r)
    return /* @__PURE__ */ e.jsx(he, {});
  if (k && k.status === "active") {
    const a = i.get("redirect");
    a ? window.location.href = a : r != null && r.home_page ? window.location.href = r.home_page : f("/");
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
        /* @__PURE__ */ e.jsx(ye, { level: 2, children: W }),
        /* @__PURE__ */ e.jsx("p", { children: o("login.subtitle", { defaultValue: "Enter your credentials to continue" }) })
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
          message: o(`login.mfaTips.${j}`, { defaultValue: "You have enabled MFA based on ${mfaType}, please enter the corresponding one-time password." }),
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
          onFinish: R,
          size: "large",
          form: p,
          hidden: c === "password_expired",
          children: [
            c === "mfa" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(d.Item, { hidden: !(u != null && u.email) || j !== "email", children: /* @__PURE__ */ e.jsx(g, { value: we(u == null ? void 0 : u.email) }) }),
              /* @__PURE__ */ e.jsx(d.Item, { name: "mfa_token", hidden: !0, children: /* @__PURE__ */ e.jsx(g, {}) }),
              /* @__PURE__ */ e.jsx(d.Item, { name: "mfa_code", hidden: c !== "mfa", children: /* @__PURE__ */ e.jsx(g, { placeholder: o("login.mfa-code", { defaultValue: "MFA Code" }), prefix: /* @__PURE__ */ e.jsx(ae, {}) }) })
            ] }),
            c === "login" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                d.Item,
                {
                  name: "username",
                  rules: [{ required: !0, message: o("login.usernameRequired", { defaultValue: "Username is required" }) }],
                  children: /* @__PURE__ */ e.jsx(g, { prefix: /* @__PURE__ */ e.jsx(oe, {}), placeholder: o("login.username", { defaultValue: "Username" }), autoComplete: "username" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                d.Item,
                {
                  name: "password",
                  rules: [{ required: !0, message: o("login.passwordRequired", { defaultValue: "Password is required" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    g.Password,
                    {
                      prefix: /* @__PURE__ */ e.jsx(re, {}),
                      placeholder: o("login.password", { defaultValue: "Password" }),
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
                ] }) : o("login.login", { defaultValue: "Login" })
              }
            ) })
          ]
        }
      ),
      F.length > 0 && c !== "password_expired" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(se, { children: o("login.or", { defaultValue: "Or" }) }),
        /* @__PURE__ */ e.jsx(ne, { direction: "vertical", style: { width: "100%" }, children: F.map((a) => /* @__PURE__ */ e.jsx(
          O,
          {
            icon: G(a.name),
            onClick: () => Y(a.name),
            loading: w[a.name],
            block: !0,
            children: a.icon_url ? /* @__PURE__ */ e.jsx(ie, { src: a.icon_url }) : o("login.continueWith", { defaultValue: "Continue with {{provider}}", provider: a.display_name })
          },
          a.name
        )) })
      ] }),
      c === "password_expired" && /* @__PURE__ */ e.jsx(xe, { onSuccess: () => {
        h("login"), p.setFieldValue("password", ""), p.setFieldValue("mfa_code", "");
      }, token: U || void 0 })
    ] }) })
  ] });
};
export {
  Pe as default
};
