import { u as C, r as l, e as I, j as e, S as U, aN as k, Z as T, p as i, g as G, z as le, o as D, m as V, aT as K, a0 as W, s as x, aU as L, M as X, h as ae, aR as q, y as ie, aV as ne, aW as oe, V as Y, F as re, aX as O, aY as H, aA as ee, C as Z, t as de, aZ as J } from "./vendor.js";
import { useState as j, useEffect as B } from "react";
import { a as _ } from "./index.js";
import { f as N, e as ue, L as ce } from "./components.js";
import { useNavigate as me, useLocation as pe, useSearchParams as he } from "react-router-dom";
const R = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, ge = {
  github: {
    email_field: "email",
    username_field: "login",
    full_name_field: "name",
    avatar_field: "avatar_url",
    role_field: "",
    icon_url: "https://github.githubassets.com/favicons/favicon.svg",
    display_name: "GitHub",
    endpoints: {
      auth_endpoint: "https://github.com/login/oauth/authorize",
      token_endpoint: "https://github.com/login/oauth/access_token",
      userinfo_endpoint: "https://api.github.com/user"
    },
    scope: "user:email"
  },
  google: {
    email_field: "email",
    username_field: "email",
    full_name_field: "name",
    avatar_field: "picture",
    role_field: "",
    icon_url: "https://www.google.com/favicon.ico",
    display_name: "Google",
    endpoints: {
      auth_endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      token_endpoint: "https://oauth2.googleapis.com/token",
      userinfo_endpoint: "https://openidconnect.googleapis.com/v1/userinfo"
    },
    scope: "profile email"
  },
  dingtalk: {
    email_field: "email",
    username_field: "nick",
    full_name_field: "name",
    avatar_field: "avatar",
    role_field: "",
    icon_url: "https://img.alicdn.com/tfs/TB1pTD.XQT2gK0jSZFkXXcIQFXa-160-160.png",
    display_name: "DingTalk",
    endpoints: {
      auth_endpoint: "https://oapi.dingtalk.com/connect/qrconnect",
      token_endpoint: "https://oapi.dingtalk.com/gettoken",
      userinfo_endpoint: "https://oapi.dingtalk.com/topapi/user/get"
    },
    scope: "snsapi_login"
  },
  wechat: {
    email_field: "",
    username_field: "openid",
    full_name_field: "nickname",
    avatar_field: "headimgurl",
    role_field: "",
    icon_url: "https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico",
    display_name: "WeChat",
    endpoints: {
      auth_endpoint: "https://open.weixin.qq.com/connect/qrconnect",
      token_endpoint: "https://api.weixin.qq.com/sns/oauth2/access_token",
      userinfo_endpoint: "https://api.weixin.qq.com/sns/userinfo"
    },
    scope: "snsapi_login"
  },
  custom: {
    email_field: "",
    username_field: "",
    full_name_field: "",
    avatar_field: "",
    role_field: "",
    icon_url: "",
    display_name: "",
    endpoints: {
      auth_endpoint: "",
      token_endpoint: "",
      userinfo_endpoint: ""
    },
    scope: ""
  }
}, fe = ({ initialData: t, onRefresh: g }) => {
  const { t: s } = C("system"), { t: b } = C("common"), [u] = l.useForm(), [c, f] = j((t == null ? void 0 : t.provider) || "custom"), [h, m] = j((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [a, o] = j((t == null ? void 0 : t.enabled) || !1), [n, A] = j((t == null ? void 0 : t.auto_create_user) || !1), { loading: y, data: S, refresh: d } = I(_.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (r) => {
      u.setFieldsValue(r), f(r.provider), m(r.provider === "custom" || r.provider === "autoDiscover"), o(r.enabled), A(r.auto_create_user);
    },
    onError: (r) => {
      x.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", r);
    }
  });
  B(() => {
    t && (u.setFieldsValue(t), f(t.provider), m(t.provider === "custom" || t.provider === "autoDiscover"), o(t.enabled), A(t.auto_create_user));
  }, [t, u]);
  const v = (r) => {
    f(r), m(r === "custom" || r === "autoDiscover");
    const w = ge[r];
    w && u.setFieldsValue({
      auth_endpoint: w.endpoints.auth_endpoint,
      token_endpoint: w.endpoints.token_endpoint,
      userinfo_endpoint: w.endpoints.userinfo_endpoint,
      scope: w.scope,
      // Set field mappings
      email_field: w.email_field,
      username_field: w.username_field,
      full_name_field: w.full_name_field,
      avatar_field: w.avatar_field,
      role_field: w.role_field,
      // Set display configuration
      icon_url: w.icon_url,
      display_name: w.display_name
    });
  }, F = (r) => {
    o(r);
  }, E = (r) => {
    A(r);
  }, { loading: p, run: P } = I(_.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      x.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), g ? g() : d();
    },
    onError: (r) => {
      x.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", r);
    }
  }), Q = (r) => {
    P(r);
  }, z = () => {
    g ? g() : d();
  }, { loading: te, run: se } = I(async ({ redirect_uri: r, ...w }) => {
    let M;
    return r ? M = new URL(r) : M = new URL(window.location.origin), M.pathname = "/console/system/settings/oauth/test-callback", M.searchParams.set("provider", c), _.system.testOauthConnection({ redirect_uri: M.toString(), ...w });
  }, {
    manual: !0,
    onSuccess: ({ url: r }) => {
      window.open(r, "_blank");
    },
    onError: (r) => {
      x.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: r.message })), console.error("Failed to test OAuth connection", r);
    }
  }), $ = () => c === "custom";
  return /* @__PURE__ */ e.jsx(U, { spinning: y, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: u,
      layout: "vertical",
      onFinish: Q,
      initialValues: t || S,
      children: [
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(k, { onChange: F })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "provider",
            label: s("settings.oauth.provider.label", { defaultValue: "OAuth Provider" }),
            tooltip: s("settings.oauth.provider.tooltip", { defaultValue: "Select an OAuth provider or configure a custom one." }),
            rules: [
              {
                required: a,
                message: s("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs(T, { onChange: v, disabled: !a, children: [
              /* @__PURE__ */ e.jsx(T.Option, { value: "github", children: s("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx(T.Option, { value: "google", children: s("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx(T.Option, { value: "dingtalk", children: s("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx(T.Option, { value: "wechat", children: s("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx(T.Option, { value: "autoDiscover", children: s("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx(T.Option, { value: "custom", children: s("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "display_name",
            label: s("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: s("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              i,
              {
                disabled: !a,
                placeholder: c !== "custom" ? s(`settings.oauth.provider.options.${c}`, { defaultValue: c }) : ""
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "icon_url",
            label: s("settings.oauth.iconUrl.label", { defaultValue: "Icon URL" }),
            tooltip: s("settings.oauth.iconUrl.tooltip", { defaultValue: "URL of the icon for this provider. Displayed on the login button." }),
            rules: [
              {
                pattern: R,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !a, placeholder: "https://example.com/icon.png" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "client_id",
            label: s("settings.oauth.clientId.label", { defaultValue: "Client ID" }),
            tooltip: s("settings.oauth.clientId.tooltip", { defaultValue: "The Client ID provided by the OAuth provider." }),
            rules: [
              {
                required: a,
                message: s("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !a })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "client_secret",
            label: s("settings.oauth.clientSecret.label", { defaultValue: "Client Secret" }),
            tooltip: s("settings.oauth.clientSecret.tooltip", { defaultValue: "The Client Secret provided by the OAuth provider. This will be stored encrypted." }),
            rules: [
              {
                required: a,
                message: s("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i.Password, { disabled: !a, autoComplete: "off", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        $() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: a && c === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: R,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !a })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "wellknown_endpoint",
            hidden: c !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: R,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: a && c === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !a })
          }
        ),
        $() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: a && c === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: R,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !a })
          }
        ),
        $() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: a && c === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: R,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !a })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "scope",
            label: s("settings.oauth.scope.label", { defaultValue: "Authorization Scope" }),
            tooltip: s("settings.oauth.scope.tooltip", { defaultValue: "The scopes to request from the OAuth provider, separated by spaces." }),
            rules: [
              {
                required: a,
                message: s("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !a })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(r) => r.getFieldValue("redirect_uri") !== "" ? {
              pattern: R,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !a, placeholder: `http://${window.location.host}/console/login?provider=settings.${c}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(k, { onChange: E, disabled: !a })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "default_role",
            label: s("settings.oauth.defaultRole.label", { defaultValue: "Default Role" }),
            tooltip: s("settings.oauth.defaultRole.tooltip", { defaultValue: "The default role to assign to new users created via OAuth. Enter role ID." }),
            rules: [
              {
                required: a && n,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !a || !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "mfa_enabled",
            label: s("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(k, { disabled: !a })
          }
        ),
        /* @__PURE__ */ e.jsx(G, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          le,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: h ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "email", disabled: !a || !h })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "login", autoComplete: "off", disabled: !a || !h })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "name", disabled: !a || !h })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "avatar_url", disabled: !a || !h })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "role", disabled: !a || !h })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(
            V,
            {
              type: "primary",
              htmlType: "submit",
              loading: p,
              icon: /* @__PURE__ */ e.jsx(K, {}),
              children: b("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            V,
            {
              loading: te,
              onClick: async () => {
                const r = u.getFieldsValue();
                se(r);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            V,
            {
              onClick: z,
              icon: /* @__PURE__ */ e.jsx(W, {}),
              children: b("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, be = () => {
  const { t } = C("system"), { t: g } = C("common"), [s] = l.useForm(), { loading: b, data: u, refresh: c } = I(_.system.getSecuritySettings, {
    onSuccess: (a) => {
      s.setFieldsValue(a);
    },
    onError: (a) => {
      x.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", a);
    }
  }), { loading: f, run: h } = I(_.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      x.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), c();
    },
    onError: (a) => {
      x.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", a);
    }
  }), m = (a) => {
    h(a);
  };
  return /* @__PURE__ */ e.jsx(U, { spinning: b, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: s,
      layout: "vertical",
      onFinish: m,
      initialValues: u,
      children: [
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(k, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "password_complexity",
            label: t("settings.security.passwordComplexity.label", { defaultValue: "Password Complexity" }),
            tooltip: t("settings.security.passwordComplexity.tooltip", { defaultValue: "Define the complexity requirements for user passwords." }),
            children: /* @__PURE__ */ e.jsxs(T, { children: [
              /* @__PURE__ */ e.jsx(T.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(T.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(T.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(T.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "password_min_length",
            label: t("settings.security.passwordMinLength.label", { defaultValue: "Minimum Password Length" }),
            tooltip: t("settings.security.passwordMinLength.tooltip", { defaultValue: "The minimum number of characters required for a password." }),
            rules: [{ type: "number", min: 6, max: 32 }],
            children: /* @__PURE__ */ e.jsx(L, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(L, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(k, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (a, o) => a.login_failure_lock !== o.login_failure_lock,
            children: ({ getFieldValue: a }) => a("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(L, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (a, o) => a.login_failure_lock !== o.login_failure_lock,
            children: ({ getFieldValue: a }) => a("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(L, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "history_password_check",
            label: t("settings.security.historyPasswordCheck.label", { defaultValue: "Enforce Password History Policy" }),
            valuePropName: "checked",
            tooltip: t("settings.security.historyPasswordCheck.tooltip", { defaultValue: "Prevent users from reusing recent passwords." }),
            children: /* @__PURE__ */ e.jsx(k, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (a, o) => a.history_password_check !== o.history_password_check,
            children: ({ getFieldValue: a }) => a("history_password_check") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(L, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "inactive_account_lock_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(L, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(L, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(L, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(
            V,
            {
              type: "primary",
              htmlType: "submit",
              loading: f,
              icon: /* @__PURE__ */ e.jsx(K, {}),
              children: g("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            V,
            {
              onClick: () => c(),
              icon: /* @__PURE__ */ e.jsx(W, {}),
              children: g("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, xe = ({ fetchItems: t, importItems: g, columns: s, ...b }) => {
  const { t: u } = C("system"), [c, f] = j([]), [h, m] = j([]), { run: a, loading: o } = I(t, {
    onError: (y) => {
      x.error(u("settings.ldap.importError", { error: `${y.message}` }));
    },
    onSuccess: (y) => {
      f(y);
    },
    manual: !0
  }), { run: n, loading: A } = I(async () => {
    for (const y of h.filter((S) => {
      const d = c.find((v) => v.ldap_dn === S);
      return !(!d || d.status === "imported");
    })) {
      const S = await g([y]);
      f((d) => [...d].map((F) => {
        for (const E of S)
          if (F.ldap_dn === E.ldap_dn)
            return { ...E, status: "imported" };
        return F;
      }));
    }
  }, {
    manual: !0
  });
  return B(() => {
    b.visible && (f([]), a(), m([]));
  }, [b.visible]), /* @__PURE__ */ e.jsx(
    X,
    {
      title: u("settings.ldap.importTitle"),
      ...b,
      onOk: () => {
        n();
      },
      width: 900,
      confirmLoading: A,
      loading: o,
      children: /* @__PURE__ */ e.jsx(
        re,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (y) => {
              m(y);
            },
            getCheckboxProps: (y) => ({
              disabled: y.status === "imported"
            })
          },
          columns: s.map(({ render: y, ...S }) => y ? {
            ...S,
            render: (d, v, F) => {
              const E = h.includes(v.ldap_dn) && A && v.status !== "imported";
              return y(d, v, F, E);
            }
          } : S),
          dataSource: c,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, ye = () => {
  var v, F, E;
  const { t } = C("system"), [g] = l.useForm(), [s, b] = j(!1), [u, c] = j(null), [f, h] = j(!1), [m, a] = j(!1), [o] = l.useForm(), [n, A] = j(!1);
  I(_.system.getLdapSettings, {
    onSuccess: (p) => {
      g.setFieldsValue(p), A(p.enabled);
    },
    onError: (p) => {
      x.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${p.message}` }));
    }
  }), B(() => {
    c(null);
  }, [f]);
  const y = async (p) => {
    b(!0);
    try {
      await _.system.updateLdapSettings(p), x.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      x.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      b(!1);
    }
  }, { run: S, loading: d } = I(async (p) => {
    const P = await g.validateFields();
    return await _.system.testLdapConnection({
      ...p,
      ...P
    });
  }, {
    onSuccess: (p) => {
      c(p);
    },
    onError: (p) => {
      x.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${p.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      l,
      {
        form: g,
        layout: "vertical",
        onFinish: y,
        initialValues: {
          user_attr: "uid",
          email_attr: "mail",
          display_name_attr: "displayName",
          default_role: "user"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(k, { onChange: (p) => A(p) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: n, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !n, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: n, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !n, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: n, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(i.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: n, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !n, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(i, { disabled: !n, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: n, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !n })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: n, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !n })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: n, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !n })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: n, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !n })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(i, { type: "number", defaultValue: 15, disabled: !n })
            }
          ),
          /* @__PURE__ */ e.jsx(G, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(k, { disabled: !n })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(k, { disabled: !n })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(i.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !n })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(i.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !n })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(i.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !n })
            }
          ),
          /* @__PURE__ */ e.jsxs(l.Item, { children: [
            /* @__PURE__ */ e.jsx(N, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(V, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(N, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              V,
              {
                disabled: !n,
                style: { marginLeft: 8 },
                onClick: () => h(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(N, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              V,
              {
                disabled: !n,
                style: { marginLeft: 8 },
                onClick: () => {
                  a(!0);
                },
                children: t("settings.ldap.import", { defaultValue: "Import Users" })
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs(
      X,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: f,
        onCancel: () => h(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            l,
            {
              form: o,
              layout: "vertical",
              onFinish: S,
              children: [
                /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(i, { disabled: !n })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(i.Password, { disabled: !n })
                  }
                ),
                /* @__PURE__ */ e.jsxs(l.Item, { children: [
                  /* @__PURE__ */ e.jsx(N, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(V, { disabled: !n, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    V,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => h(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(U, { spinning: d, children: /* @__PURE__ */ e.jsx(ae, { active: d, loading: d, children: u && (u.user ? /* @__PURE__ */ e.jsxs(q, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(q.Item, { label: "Username", span: 3, children: u.user.username }),
            /* @__PURE__ */ e.jsx(q.Item, { label: "Email", span: 3, children: u.user.email }),
            /* @__PURE__ */ e.jsx(q.Item, { label: "FullName", span: 3, children: u.user.full_name }),
            /* @__PURE__ */ e.jsx(q.Item, { label: "CreatedAt", span: 3, children: u.user.created_at }),
            /* @__PURE__ */ e.jsx(q.Item, { label: "UpdatedAt", span: 3, children: u.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            ie,
            {
              direction: "vertical",
              current: (v = u.message) == null ? void 0 : v.findIndex((p) => !p.success),
              status: (F = u.message) != null && F.find((p) => !p.success) ? "error" : "finish",
              items: (E = u.message) == null ? void 0 : E.map((p) => ({
                status: p.success ? "finish" : "error",
                title: p.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      xe,
      {
        visible: m,
        onCancel: () => a(!1),
        fetchItems: () => _.system.importLdapUsers({}),
        importItems: (p) => _.system.importLdapUsers({ user_dn: p }),
        columns: [{
          title: t("settings.ldap.username", { defaultValue: "Username" }),
          dataIndex: "username"
        }, {
          title: t("settings.ldap.email", { defaultValue: "Email" }),
          dataIndex: "email"
        }, {
          title: t("settings.ldap.fullName", { defaultValue: "Full Name" }),
          dataIndex: "full_name"
        }, {
          title: t("settings.ldap.importStatus", { defaultValue: "Import Status" }),
          dataIndex: "imported",
          fixed: "right",
          render: (p, P, Q, z) => z ? /* @__PURE__ */ e.jsx(U, { indicator: /* @__PURE__ */ e.jsx(ne, { spin: !0 }) }) : p ? /* @__PURE__ */ e.jsx(oe, { twoToneColor: "#52c41a" }) : P.id ? /* @__PURE__ */ e.jsx(Y, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(Y, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, je = () => {
  const { t } = C("system"), { t: g } = C("common"), [s] = l.useForm(), [b, u] = j(null), [c, f] = j(!1), [h] = l.useForm(), [m, a] = j(!1), { loading: o } = I(_.system.getSmtpSettings, {
    onSuccess: (d) => {
      s.setFieldsValue(d), a(d.enabled);
    },
    onError: (d) => {
      x.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${d.message}` }));
    }
  });
  B(() => {
    u(null);
  }, [c]);
  const { run: n, loading: A } = I(({ port: d, ...v }) => _.system.updateSmtpSettings({ ...v, port: Number(d) }), {
    manual: !0,
    onSuccess: () => {
      x.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (d) => {
      x.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${d.message}` }));
    }
  }), { run: y, loading: S } = I(async (d) => {
    const { port: v, ...F } = await s.validateFields();
    return await _.system.testSmtpConnection({
      ...d,
      ...F,
      port: Number(v)
    });
  }, {
    onSuccess: (d) => {
      u(d);
    },
    onError: (d) => {
      x.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${d.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(U, { spinning: o, children: /* @__PURE__ */ e.jsxs(
      l,
      {
        form: s,
        layout: "vertical",
        onFinish: n,
        initialValues: {
          port: 587,
          encryption: "STARTTLS"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.enabled", { defaultValue: "Enable SMTP" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(k, { onChange: (d) => a(d) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: m, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !m, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: m, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { type: "number", disabled: !m, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: m, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !m, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(i.Password, { disabled: !m, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: m, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(O.Group, { disabled: !m, children: [
                /* @__PURE__ */ e.jsx(O.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(O.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(O.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: m, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !m, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(i, { disabled: !m, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(G, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(H, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(H, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(H, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(l.Item, { children: [
            /* @__PURE__ */ e.jsx(N, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(V, { type: "primary", htmlType: "submit", loading: A, style: { marginRight: 8 }, children: g("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              V,
              {
                onClick: () => f(!0),
                disabled: !m || S,
                loading: S,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      X,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: c,
        onCancel: () => f(!1),
        footer: [
          /* @__PURE__ */ e.jsx(V, { onClick: () => f(!1), children: g("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(V, { type: "primary", loading: S, onClick: () => h.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: h,
            layout: "vertical",
            onFinish: (d) => y(d),
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  label: t("settings.smtp.testEmailRecipient", { defaultValue: "Recipient Email Address" }),
                  name: "to",
                  rules: [
                    { required: !0, message: t("settings.smtp.testEmailRecipientRequired", { defaultValue: "Recipient email address is required." }) },
                    { type: "email", message: t("settings.smtp.testEmailRecipientInvalid", { defaultValue: "Invalid email address." }) }
                  ],
                  children: /* @__PURE__ */ e.jsx(i, { placeholder: "test@example.com" })
                }
              ),
              b && /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: b.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: b.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, Ve = () => {
  const { t, i18n: g } = C("system"), { t: s } = C("common"), [b] = l.useForm(), { loading: u, data: c, refresh: f } = I(_.system.getSystemBaseSettings, {
    onSuccess: (o) => {
      b.setFieldsValue(o);
    },
    onError: (o) => {
      x.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", o);
    }
  }), { loading: h, run: m } = I(_.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      x.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), f();
    },
    onError: (o) => {
      x.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", o);
    }
  }), a = (o) => {
    m(o);
  };
  return /* @__PURE__ */ e.jsx(U, { spinning: u, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: b,
      layout: "vertical",
      onFinish: a,
      initialValues: c,
      children: [
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(ee, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: "name", children: /* @__PURE__ */ e.jsx(i, {}) }) })
        }, ...ue.map((o) => ({
          key: o.lang,
          label: g.language !== o.lang ? s(`language.${o.lang}`, { defaultValue: o.label, lang: o.label }) : o.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: ["name_i18n", o.lang], children: /* @__PURE__ */ e.jsx(i, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(i, {}) }),
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(i, {}) }),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(k, {})
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(
            V,
            {
              type: "primary",
              htmlType: "submit",
              loading: h,
              icon: /* @__PURE__ */ e.jsx(K, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            V,
            {
              onClick: () => f(),
              icon: /* @__PURE__ */ e.jsx(W, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, _e = () => {
  const { t } = C("system"), g = me(), s = pe(), c = s.hash.replace("#", "") || "base", f = [
    {
      key: "base",
      label: t("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(Ve, {})
    },
    {
      key: "security",
      label: t("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(be, {})
    },
    {
      key: "oauth",
      label: t("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(fe, {})
    },
    {
      key: "ldap",
      label: t("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(ye, {})
    },
    {
      key: "smtp",
      label: t("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(je, {})
    }
  ];
  return /* @__PURE__ */ e.jsx(Z, { title: t("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    ee,
    {
      defaultActiveKey: c,
      onChange: (h) => {
        g(`${s.pathname}#${h}`);
      },
      items: f
    }
  ) });
}, Ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _e
}, Symbol.toStringTag, { value: "Module" })), ve = () => {
  const { t } = C("system"), [g] = he(), s = g.get("provider"), b = g.get("code"), u = g.get("state"), [c, f] = j(null), [h, m] = j(null), [a, o] = j(null);
  return I(async () => {
    if (!b || !u || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const n = await _.system.testOauthCallback({ code: b, state: u, provider: s });
    if (!n.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!n.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    f(n.user), m(n.user_info);
  }, {
    onSuccess: () => {
      o({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (n) => {
      o({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: n.message
      });
    }
  }), a ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    de,
    {
      status: a.status,
      title: a.message,
      subTitle: a.error,
      extra: /* @__PURE__ */ e.jsxs(D, { style: { display: !h || !c ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(Z, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(J, { src: h || {} }) }),
        /* @__PURE__ */ e.jsx(Z, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(J, { src: c || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(ce, {});
}, Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ve
}, Symbol.toStringTag, { value: "Module" }));
export {
  Fe as O,
  Ae as i
};
