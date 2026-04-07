import { j as e } from "./vendor.js";
import { Form as a, message as r, Spin as je, Switch as oe, Select as B, Input as V, Alert as Ge, Divider as Xe, Space as W, Button as F, InputNumber as de, Modal as ae, Skeleton as yt, Descriptions as re, Steps as jt, Tag as ne, Table as ze, Radio as $e, Tabs as nt, Tooltip as Qe, Card as se, Row as De, Col as ye, Checkbox as We, Empty as Le, AutoComplete as et, Upload as bt, Tree as Vt, Menu as kt, Collapse as _t, Typography as St, Timeline as vt, Result as wt } from "antd";
import { useTranslation as G } from "react-i18next";
import { useState as j, useEffect as Pe, useMemo as Te, useCallback as ke } from "react";
import { useRequest as w } from "ahooks";
import { SaveOutlined as Ue, ReloadOutlined as be, LoadingOutlined as Ct, CheckCircleTwoTone as Ft, StarFilled as Tt, CheckCircleOutlined as It, StarOutlined as At, EditOutlined as Oe, CopyOutlined as ot, DeleteOutlined as Ie, BugOutlined as Et, PlusOutlined as Me, ThunderboltOutlined as zt, ToolOutlined as Ze, SettingOutlined as Pt, FileTextOutlined as Be, EyeOutlined as rt, UploadOutlined as tt, CalendarOutlined as Ot, ArrowLeftOutlined as dt, FolderOutlined as ut, FileOutlined as ct, FileAddOutlined as Mt, FolderAddOutlined as Rt, SearchOutlined as Lt, DownloadOutlined as Dt, WarningOutlined as Ut, DashboardOutlined as Nt, MessageOutlined as qt, SendOutlined as $t } from "@ant-design/icons";
import { a as k } from "./index.js";
import { g as st, c as mt } from "./base.js";
import { f as ue, e as Bt, b as Ne, J as Ht, j as Wt, M as ft, L as Kt } from "./components.js";
import Ke from "react-quill";
import { useNavigate as _e, useLocation as Jt, useParams as Ye, useSearchParams as Gt } from "react-router-dom";
import { c as gt, b as Zt } from "./contexts.js";
import { l as Xt, c as Qt, u as Yt, d as es, g as ts, b as ss, e as ls, f as as, r as is } from "./system.js";
import { l as ns, b as os } from "./authorization.js";
import { createStyles as rs } from "antd-style";
import lt from "react-json-view";
const Ae = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, ds = {
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
}, us = ({ initialData: t, onRefresh: l }) => {
  const { t: s } = G("system"), { t: i } = G("common"), [d] = a.useForm(), [n, x] = j((t == null ? void 0 : t.provider) || "custom"), [g, h] = j((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [o, p] = j((t == null ? void 0 : t.enabled) || !1), [c, E] = j((t == null ? void 0 : t.auto_create_user) || !1), { loading: T, data: P, refresh: S } = w(k.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (v) => {
      d.setFieldsValue(v), x(v.provider), h(v.provider === "custom" || v.provider === "autoDiscover"), p(v.enabled), E(v.auto_create_user);
    },
    onError: (v) => {
      r.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", v);
    }
  });
  Pe(() => {
    t && (d.setFieldsValue(t), x(t.provider), h(t.provider === "custom" || t.provider === "autoDiscover"), p(t.enabled), E(t.auto_create_user));
  }, [t, d]);
  const I = (v) => {
    x(v), h(v === "custom" || v === "autoDiscover");
    const m = ds[v];
    m && d.setFieldsValue({
      auth_endpoint: m.endpoints.auth_endpoint,
      token_endpoint: m.endpoints.token_endpoint,
      userinfo_endpoint: m.endpoints.userinfo_endpoint,
      scope: m.scope,
      // Set field mappings
      email_field: m.email_field,
      username_field: m.username_field,
      full_name_field: m.full_name_field,
      avatar_field: m.avatar_field,
      role_field: m.role_field,
      // Set display configuration
      icon_url: m.icon_url,
      display_name: m.display_name
    });
  }, D = (v) => {
    p(v);
  }, R = (v) => {
    E(v);
  }, { loading: A, run: O } = w(k.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), l ? l() : S();
    },
    onError: (v) => {
      r.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", v);
    }
  }), N = (v) => {
    O(v);
  }, K = () => {
    l ? l() : S();
  }, { loading: H, run: J } = w(async ({ redirect_uri: v, ...m }) => {
    let U;
    return v ? U = new URL(v) : U = new URL(window.location.origin), U.pathname = st("/system/settings/oauth/test-callback"), U.searchParams.set("provider", n), k.system.testOauthConnection({ redirect_uri: U.toString(), ...m });
  }, {
    manual: !0,
    onSuccess: ({ url: v }) => {
      window.open(v, "_blank");
    },
    onError: (v) => {
      r.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: v.message })), console.error("Failed to test OAuth connection", v);
    }
  }), q = () => n === "custom";
  return /* @__PURE__ */ e.jsx(je, { spinning: T, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: N,
      initialValues: t || P,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(oe, { onChange: D })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "provider",
            label: s("settings.oauth.provider.label", { defaultValue: "OAuth Provider" }),
            tooltip: s("settings.oauth.provider.tooltip", { defaultValue: "Select an OAuth provider or configure a custom one." }),
            rules: [
              {
                required: o,
                message: s("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs(B, { onChange: I, disabled: !o, children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "github", children: s("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "google", children: s("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "dingtalk", children: s("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "wechat", children: s("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "autoDiscover", children: s("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "custom", children: s("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "display_name",
            label: s("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: s("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              V,
              {
                disabled: !o,
                placeholder: n !== "custom" ? s(`settings.oauth.provider.options.${n}`, { defaultValue: n }) : ""
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "icon_url",
            label: s("settings.oauth.iconUrl.label", { defaultValue: "Icon URL" }),
            tooltip: s("settings.oauth.iconUrl.tooltip", { defaultValue: "URL of the icon for this provider. Displayed on the login button." }),
            rules: [
              {
                pattern: Ae,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o, placeholder: "https://example.com/icon.png" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "client_id",
            label: s("settings.oauth.clientId.label", { defaultValue: "Client ID" }),
            tooltip: s("settings.oauth.clientId.tooltip", { defaultValue: "The Client ID provided by the OAuth provider." }),
            rules: [
              {
                required: o,
                message: s("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "client_secret",
            label: s("settings.oauth.clientSecret.label", { defaultValue: "Client Secret" }),
            tooltip: s("settings.oauth.clientSecret.tooltip", { defaultValue: "The Client Secret provided by the OAuth provider. This will be stored encrypted." }),
            rules: [
              {
                required: o,
                message: s("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !o, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        q() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && n === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: Ae,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "wellknown_endpoint",
            hidden: n !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: Ae,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: o && n === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o })
          }
        ),
        q() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && n === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: Ae,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o })
          }
        ),
        q() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && n === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: Ae,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "scope",
            label: s("settings.oauth.scope.label", { defaultValue: "Authorization Scope" }),
            tooltip: s("settings.oauth.scope.tooltip", { defaultValue: "The scopes to request from the OAuth provider, separated by spaces." }),
            rules: [
              {
                required: o,
                message: s("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(v) => v.getFieldValue("redirect_uri") !== "" ? {
              pattern: Ae,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o, placeholder: `http://${window.location.host}${st(`/login?provider=settings.${n}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(oe, { onChange: R, disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "default_role",
            label: s("settings.oauth.defaultRole.label", { defaultValue: "Default Role" }),
            tooltip: s("settings.oauth.defaultRole.tooltip", { defaultValue: "The default role to assign to new users created via OAuth. Enter role ID." }),
            rules: [
              {
                required: o && c,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o || !c })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "auto",
            children: /* @__PURE__ */ e.jsxs(B, { disabled: !o, children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "auto", children: s("settings.oauth.roleMappingMode.options.auto.label", { defaultValue: "Auto" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          Ge,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.roleMappingMode.infoTitle", { defaultValue: "Role Mapping Mode Information" }),
            description: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsxs("p", { children: [
                /* @__PURE__ */ e.jsxs("strong", { children: [
                  s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }),
                  ":"
                ] }),
                " ",
                s("settings.oauth.roleMappingMode.options.disabled.description", { defaultValue: "Ignores role information from OAuth2 provider. New users get the default role." })
              ] }),
              /* @__PURE__ */ e.jsxs("p", { children: [
                /* @__PURE__ */ e.jsxs("strong", { children: [
                  s("settings.oauth.roleMappingMode.options.auto.label", { defaultValue: "Auto" }),
                  ":"
                ] }),
                " ",
                s("settings.oauth.roleMappingMode.options.auto.description", { defaultValue: "Uses OAuth2 roles for new users or users without roles, but preserves existing role assignments." })
              ] }),
              /* @__PURE__ */ e.jsxs("p", { children: [
                /* @__PURE__ */ e.jsxs("strong", { children: [
                  s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }),
                  ":"
                ] }),
                " ",
                s("settings.oauth.roleMappingMode.options.enforce.description", { defaultValue: "Always overwrites user roles with OAuth2 roles when available." })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "mfa_enabled",
            label: s("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(oe, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(Xe, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Ge,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: g ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "email", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "login", autoComplete: "off", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "name", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "avatar_url", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "role", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            F,
            {
              type: "primary",
              htmlType: "submit",
              loading: A,
              icon: /* @__PURE__ */ e.jsx(Ue, {}),
              children: i("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            F,
            {
              loading: H,
              onClick: async () => {
                const v = d.getFieldsValue();
                J(v);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            F,
            {
              onClick: K,
              icon: /* @__PURE__ */ e.jsx(be, {}),
              children: i("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, cs = () => {
  const { t } = G("system"), { t: l } = G("common"), [s] = a.useForm(), { loading: i, data: d, refresh: n } = w(k.system.getSecuritySettings, {
    onSuccess: (o) => {
      s.setFieldsValue(o);
    },
    onError: (o) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", o);
    }
  }), { loading: x, run: g } = w(k.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), n();
    },
    onError: (o) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", o);
    }
  }), h = (o) => {
    g(o);
  };
  return /* @__PURE__ */ e.jsx(je, { spinning: i, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: s,
      layout: "vertical",
      onFinish: h,
      initialValues: d,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(oe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_complexity",
            label: t("settings.security.passwordComplexity.label", { defaultValue: "Password Complexity" }),
            tooltip: t("settings.security.passwordComplexity.tooltip", { defaultValue: "Define the complexity requirements for user passwords." }),
            children: /* @__PURE__ */ e.jsxs(B, { children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_min_length",
            label: t("settings.security.passwordMinLength.label", { defaultValue: "Minimum Password Length" }),
            tooltip: t("settings.security.passwordMinLength.tooltip", { defaultValue: "The minimum number of characters required for a password." }),
            rules: [{ type: "number", min: 6, max: 32 }],
            children: /* @__PURE__ */ e.jsx(de, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(de, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(oe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, p) => o.login_failure_lock !== p.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, p) => o.login_failure_lock !== p.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "history_password_check",
            label: t("settings.security.historyPasswordCheck.label", { defaultValue: "Enforce Password History Policy" }),
            valuePropName: "checked",
            tooltip: t("settings.security.historyPasswordCheck.tooltip", { defaultValue: "Prevent users from reusing recent passwords." }),
            children: /* @__PURE__ */ e.jsx(oe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, p) => o.history_password_check !== p.history_password_check,
            children: ({ getFieldValue: o }) => o("history_password_check") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "inactive_account_lock_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(de, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(de, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(de, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            F,
            {
              type: "primary",
              htmlType: "submit",
              loading: x,
              icon: /* @__PURE__ */ e.jsx(Ue, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            F,
            {
              onClick: () => n(),
              icon: /* @__PURE__ */ e.jsx(be, {}),
              children: l("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, ms = ({ fetchItems: t, importItems: l, columns: s, ...i }) => {
  const { t: d } = G("system"), [n, x] = j([]), [g, h] = j([]), { run: o, loading: p } = w(t, {
    onError: (T) => {
      r.error(d("settings.ldap.importError", { error: `${T.message}` }));
    },
    onSuccess: (T) => {
      x(T);
    },
    manual: !0
  }), { run: c, loading: E } = w(async () => {
    for (const T of g.filter((P) => {
      const S = n.find((I) => I.ldap_dn === P);
      return !(!S || S.status === "imported");
    })) {
      const P = await l([T]);
      x((S) => [...S].map((D) => {
        for (const R of P)
          if (D.ldap_dn === R.ldap_dn)
            return { ...R, status: "imported" };
        return D;
      }));
    }
  }, {
    manual: !0
  });
  return Pe(() => {
    i.visible && (x([]), o(), h([]));
  }, [i.visible]), /* @__PURE__ */ e.jsx(
    ae,
    {
      title: d("settings.ldap.importTitle"),
      ...i,
      onOk: () => {
        c();
      },
      width: 900,
      confirmLoading: E,
      loading: p,
      children: /* @__PURE__ */ e.jsx(
        ze,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (T) => {
              h(T);
            },
            getCheckboxProps: (T) => ({
              disabled: T.status === "imported"
            })
          },
          columns: s.map(({ render: T, ...P }) => T ? {
            ...P,
            render: (S, I, D) => {
              const R = g.includes(I.ldap_dn) && E && I.status !== "imported";
              return T(S, I, D, R);
            }
          } : P),
          dataSource: n,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, fs = () => {
  var I, D, R;
  const { t } = G("system"), [l] = a.useForm(), [s, i] = j(!1), [d, n] = j(null), [x, g] = j(!1), [h, o] = j(!1), [p] = a.useForm(), [c, E] = j(!1);
  w(k.system.getLdapSettings, {
    onSuccess: (A) => {
      l.setFieldsValue(A), E(A.enabled);
    },
    onError: (A) => {
      r.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${A.message}` }));
    }
  }), Pe(() => {
    n(null);
  }, [x]);
  const T = async (A) => {
    i(!0);
    try {
      await k.system.updateLdapSettings(A), r.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      r.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      i(!1);
    }
  }, { run: P, loading: S } = w(async (A) => {
    const O = await l.validateFields();
    return await k.system.testLdapConnection({
      ...A,
      ...O
    });
  }, {
    onSuccess: (A) => {
      n(A);
    },
    onError: (A) => {
      r.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${A.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      a,
      {
        form: l,
        layout: "vertical",
        onFinish: T,
        initialValues: {
          user_attr: "uid",
          email_attr: "mail",
          display_name_attr: "displayName",
          default_role: "user"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(oe, { onChange: (A) => E(A) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: c, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: c, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: c, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(V.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: c, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: c, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: c, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: c, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: c, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(V, { type: "number", defaultValue: 15, disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(Xe, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(oe, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(oe, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(ue, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(F, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(ue, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              F,
              {
                disabled: !c,
                style: { marginLeft: 8 },
                onClick: () => g(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ue, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              F,
              {
                disabled: !c,
                style: { marginLeft: 8 },
                onClick: () => {
                  o(!0);
                },
                children: t("settings.ldap.import", { defaultValue: "Import Users" })
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs(
      ae,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: x,
        onCancel: () => g(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            a,
            {
              form: p,
              layout: "vertical",
              onFinish: P,
              children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V, { disabled: !c })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !c })
                  }
                ),
                /* @__PURE__ */ e.jsxs(a.Item, { children: [
                  /* @__PURE__ */ e.jsx(ue, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(F, { disabled: !c, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    F,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => g(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(je, { spinning: S, children: /* @__PURE__ */ e.jsx(yt, { active: S, loading: S, children: d && (d.user ? /* @__PURE__ */ e.jsxs(re, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(re.Item, { label: "Username", span: 3, children: d.user.username }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "Email", span: 3, children: d.user.email }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "FullName", span: 3, children: d.user.full_name }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "CreatedAt", span: 3, children: d.user.created_at }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "UpdatedAt", span: 3, children: d.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            jt,
            {
              direction: "vertical",
              current: (I = d.message) == null ? void 0 : I.findIndex((A) => !A.success),
              status: (D = d.message) != null && D.find((A) => !A.success) ? "error" : "finish",
              items: (R = d.message) == null ? void 0 : R.map((A) => ({
                status: A.success ? "finish" : "error",
                title: A.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      ms,
      {
        visible: h,
        onCancel: () => o(!1),
        fetchItems: () => k.system.importLdapUsers({}),
        importItems: (A) => k.system.importLdapUsers({ user_dn: A }),
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
          render: (A, O, N, K) => K ? /* @__PURE__ */ e.jsx(je, { indicator: /* @__PURE__ */ e.jsx(Ct, { spin: !0 }) }) : A ? /* @__PURE__ */ e.jsx(Ft, { twoToneColor: "#52c41a" }) : O.id ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(ne, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, gs = () => {
  const { t } = G("system"), { t: l } = G("common"), [s] = a.useForm(), [i, d] = j(null), [n, x] = j(!1), [g] = a.useForm(), [h, o] = j(!1), { loading: p } = w(k.system.getSmtpSettings, {
    onSuccess: (S) => {
      s.setFieldsValue(S), o(S.enabled);
    },
    onError: (S) => {
      r.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${S.message}` }));
    }
  });
  Pe(() => {
    d(null);
  }, [n]);
  const { run: c, loading: E } = w(({ port: S, ...I }) => k.system.updateSmtpSettings({ ...I, port: Number(S) }), {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (S) => {
      r.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${S.message}` }));
    }
  }), { run: T, loading: P } = w(async (S) => {
    const { port: I, ...D } = await s.validateFields();
    return await k.system.testSmtpConnection({
      ...S,
      ...D,
      port: Number(I)
    });
  }, {
    onSuccess: (S) => {
      d(S);
    },
    onError: (S) => {
      r.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${S.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(je, { spinning: p, children: /* @__PURE__ */ e.jsxs(
      a,
      {
        form: s,
        layout: "vertical",
        onFinish: c,
        initialValues: {
          port: 587,
          encryption: "STARTTLS"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.enabled", { defaultValue: "Enable SMTP" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(oe, { onChange: (S) => o(S) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: h, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !h, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: h, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { type: "number", disabled: !h, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: h, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !h, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !h, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: h, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs($e.Group, { disabled: !h, children: [
                /* @__PURE__ */ e.jsx($e.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx($e.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx($e.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: h, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !h, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !h, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(Xe, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(Ke, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(Ke, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(Ke, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(ue, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(F, { type: "primary", htmlType: "submit", loading: E, style: { marginRight: 8 }, children: l("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              F,
              {
                onClick: () => x(!0),
                disabled: !h || P,
                loading: P,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: n,
        onCancel: () => x(!1),
        footer: [
          /* @__PURE__ */ e.jsx(F, { onClick: () => x(!1), children: l("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(F, { type: "primary", loading: P, onClick: () => g.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: g,
            layout: "vertical",
            onFinish: (S) => T(S),
            children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  label: t("settings.smtp.testEmailRecipient", { defaultValue: "Recipient Email Address" }),
                  name: "to",
                  rules: [
                    { required: !0, message: t("settings.smtp.testEmailRecipientRequired", { defaultValue: "Recipient email address is required." }) },
                    { type: "email", message: t("settings.smtp.testEmailRecipientInvalid", { defaultValue: "Invalid email address." }) }
                  ],
                  children: /* @__PURE__ */ e.jsx(V, { placeholder: "test@example.com" })
                }
              ),
              i && /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: i.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: i.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, ps = () => {
  const { t, i18n: l } = G("system"), { t: s } = G("common"), [i] = a.useForm(), { loading: d, data: n, refresh: x } = w(k.system.getSystemBaseSettings, {
    onSuccess: (p) => {
      i.setFieldsValue(p);
    },
    onError: (p) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", p);
    }
  }), { loading: g, run: h } = w(k.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), x();
    },
    onError: (p) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", p);
    }
  }), o = (p) => {
    h(p);
  };
  return /* @__PURE__ */ e.jsx(je, { spinning: d, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: i,
      layout: "vertical",
      onFinish: o,
      initialValues: n,
      children: [
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(nt, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", children: /* @__PURE__ */ e.jsx(V, {}) }) })
        }, ...Bt.map((p) => ({
          key: p.lang,
          label: l.language !== p.lang ? s(`language.${p.lang}`, { defaultValue: p.label, lang: p.label }) : p.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: ["name_i18n", p.lang], children: /* @__PURE__ */ e.jsx(V, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(V, {}) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(V, {}) }),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(oe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(oe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.enableSkillToolBinding", { defaultValue: "Link AI tools to skills" }),
            name: "enable_skill_tool_binding",
            tooltip: t("settings.base.enableSkillToolBindingTooltip", {
              defaultValue: "When enabled, AI chat narrows tools by skill bindings when skills are in scope (still within role AI tool permissions)."
            }),
            children: /* @__PURE__ */ e.jsx(oe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            F,
            {
              type: "primary",
              htmlType: "submit",
              loading: g,
              icon: /* @__PURE__ */ e.jsx(Ue, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            F,
            {
              onClick: () => x(),
              icon: /* @__PURE__ */ e.jsx(be, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: hs } = V, xs = () => {
  var le;
  const { t } = G("ai"), { t: l } = G("common"), s = _e(), [i] = a.useForm(), [d, n] = j(!1), [x, g] = j(null), [h, o] = j(""), [p, c] = j(""), { loading: E, data: T } = w(
    () => k.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (y) => {
        r.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", y);
      }
    }
  ), P = Te(() => T == null ? void 0 : T.find((y) => y.provider === p), [T, p]), { loading: S, data: I, refresh: D } = w(
    () => k.ai.listAiModels({ current: 1, page_size: 100, search: h }),
    {
      refreshDeps: [h],
      onError: (y) => {
        r.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", y);
      }
    }
  ), { loading: R, run: A } = w(
    ({ config: y, ...z }) => k.ai.createAiModel({ config: y ?? {}, ...z }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), n(!1), i.resetFields(), D();
      },
      onError: (y) => {
        r.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", y);
      }
    }
  ), { loading: O, run: N } = w(
    ({ id: y, data: z }) => k.ai.updateAiModel({ id: y }, z),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), n(!1), i.resetFields(), g(null), D();
      },
      onError: (y) => {
        r.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", y);
      }
    }
  ), { runAsync: K } = w(
    (y) => k.ai.deleteAiModel({ id: y }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), D();
      },
      onError: (y) => {
        r.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", y);
      }
    }
  ), { runAsync: H } = w(
    (y) => k.ai.testAiModel({ id: y }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (y) => {
        r.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", y);
      }
    }
  ), { runAsync: J } = w(
    (y) => k.ai.setDefaultAiModel({ id: y }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), D();
      },
      onError: (y) => {
        r.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", y);
      }
    }
  ), q = () => {
    g(null), c(""), i.resetFields(), n(!0);
  }, v = (y) => {
    g(y), c(y.provider);
    const z = y.config || {}, Z = {
      name: y.name,
      description: y.description,
      provider: y.provider,
      is_default: y.is_default,
      config: z,
      // Spread config fields to form
      status: y.status,
      max_chat_tokens: y.max_chat_tokens ?? 0,
      max_chat_iterations: y.max_chat_iterations ?? 0
    };
    i.setFieldsValue(Z), n(!0);
  }, m = async (y) => {
    g(null), c(y.provider), i.resetFields();
    try {
      const z = await k.ai.getAiModel({ id: y.id }), Z = { ...z.config || {} };
      "api_key" in Z && (Z.api_key = ""), i.setFieldsValue({
        name: `${z.name} (copy)`,
        description: z.description,
        provider: z.provider,
        config: Z,
        is_default: !1,
        status: "enabled",
        max_chat_tokens: z.max_chat_tokens ?? 0,
        max_chat_iterations: z.max_chat_iterations ?? 0
      }), n(!0);
    } catch {
      r.error(t("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, U = (y) => {
    c(y), i.setFieldValue("config", void 0);
  }, ce = (y) => {
    let z = y.config ?? {};
    const Z = {
      name: y.name,
      description: y.description,
      provider: y.provider,
      config: z,
      is_default: y.is_default,
      status: y.status,
      max_chat_tokens: y.max_chat_tokens ?? 0,
      max_chat_iterations: y.max_chat_iterations ?? 0
    };
    x ? N({ id: x.id, data: Z }) : A(Z);
  }, pe = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (y, z) => /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx("span", { children: y }),
        z.is_default && /* @__PURE__ */ e.jsx(Qe, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Tt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (y) => /* @__PURE__ */ e.jsx(ne, { color: "blue", children: y.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (y) => /* @__PURE__ */ e.jsx(ne, { color: y === "enabled" ? "green" : "red", children: y === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (y, z) => /* @__PURE__ */ e.jsx(Ne, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(It, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => H(z.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(At, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => J(z.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => v(z)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(ot, {}),
          tooltip: t("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => m(z)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          tooltip: t("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => K(z.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(De, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsx(
        V.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          onSearch: (y) => o(y),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(ue, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          F,
          {
            icon: /* @__PURE__ */ e.jsx(Et, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          F,
          {
            icon: /* @__PURE__ */ e.jsx(be, {}),
            onClick: D,
            loading: S,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ue, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          F,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Me, {}),
            onClick: q,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx(
      ze,
      {
        columns: pe,
        dataSource: (I == null ? void 0 : I.data) || [],
        loading: S,
        rowKey: "id",
        pagination: {
          total: (I == null ? void 0 : I.total) || 0,
          current: (I == null ? void 0 : I.current) || 1,
          pageSize: (I == null ? void 0 : I.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (y, z) => l("pagination.total", {
            defaultValue: `${z[0]}-${z[1]} of ${y} items`,
            start: z[0],
            end: z[1],
            total: y
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: x ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: d,
        onCancel: () => {
          n(!1), i.resetFields(), g(null);
        },
        footer: null,
        width: ((le = P == null ? void 0 : P.ui_schema) == null ? void 0 : le["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: i,
            layout: "vertical",
            onFinish: ce,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: t("models.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                  children: /* @__PURE__ */ e.jsx(V, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: t("models.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    hs,
                    {
                      rows: 3,
                      placeholder: t("models.descriptionPlaceholder", { defaultValue: "Enter model description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "provider",
                  label: t("models.provider", { defaultValue: "Provider" }),
                  rules: [{ required: !0, message: t("models.providerRequired", { defaultValue: "Please select provider" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    B,
                    {
                      loading: E,
                      placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                      onChange: U,
                      value: p,
                      options: T == null ? void 0 : T.map((y) => ({
                        label: y.name,
                        value: y.provider
                      }))
                    }
                  )
                }
              ),
              P && /* @__PURE__ */ e.jsx(a.Item, { name: ["config"], style: {
                minHeight: 300,
                maxHeight: "calc(100vh - 800px)",
                overflowY: "auto",
                overflowX: "hidden"
              }, children: /* @__PURE__ */ e.jsx(
                Ht,
                {
                  schema: P.config_schema,
                  uiSchema: P.ui_schema
                }
              ) }),
              /* @__PURE__ */ e.jsxs(De, { gutter: 16, children: [
                /* @__PURE__ */ e.jsx(ye, { span: 12, children: /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "max_chat_tokens",
                    label: t("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                    tooltip: t("models.maxChatTokensHelp", {
                      defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                    }),
                    children: /* @__PURE__ */ e.jsx(de, { min: 0, style: { width: "100%" }, placeholder: "0" })
                  }
                ) }),
                /* @__PURE__ */ e.jsx(ye, { span: 12, children: /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "max_chat_iterations",
                    label: t("models.maxChatIterations", { defaultValue: "Max chat iterations (tool rounds)" }),
                    tooltip: t("models.maxChatIterationsHelp", {
                      defaultValue: "0 uses default. Positive value caps tool-call iterations for this model."
                    }),
                    children: /* @__PURE__ */ e.jsx(de, { min: 0, style: { width: "100%" }, placeholder: "0" })
                  }
                ) })
              ] }),
              /* @__PURE__ */ e.jsxs(
                a.Item,
                {
                  name: "is_default",
                  valuePropName: "checked",
                  children: [
                    /* @__PURE__ */ e.jsx(oe, {}),
                    " ",
                    /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
                /* @__PURE__ */ e.jsx(
                  F,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: R || O,
                    children: x ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  F,
                  {
                    onClick: () => {
                      n(!1), i.resetFields(), g(null), c("");
                    },
                    children: l("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    )
  ] });
}, { TextArea: ys } = V, js = () => {
  var me;
  const { t } = G("system"), { t: l } = G("common"), [s] = a.useForm(), [i, d] = j(!1), [n, x] = j(null), [g, h] = j(""), [o, p] = j(!1), [c, E] = j(null), [T, P] = j(""), [S, I] = j(!1), [D, R] = j([]), [A, O] = j(), [N, K] = j(null), { loading: H, data: J, refresh: q } = w(
    () => k.system.listToolSets({ current: 1, page_size: 100, search: g, type: A }),
    {
      refreshDeps: [g, A],
      onError: (f) => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", f);
      }
    }
  ), { loading: v, data: m } = w(
    () => k.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (f) => {
        r.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", f);
      }
    }
  ), U = Te(() => m == null ? void 0 : m.find((f) => f.tool_set_type === T), [m, T]), { loading: ce, run: pe } = w(
    (f) => k.system.createToolSet({
      ...f,
      type: f.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), d(!1), s.resetFields(), q();
      },
      onError: (f) => {
        r.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", f);
      }
    }
  ), { loading: le, run: y } = w(
    ({ id: f, data: L }) => k.system.updateToolSet({ id: f }, {
      ...L,
      type: L.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), d(!1), s.resetFields(), x(null), q();
      },
      onError: (f) => {
        r.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", f);
      }
    }
  ), { run: z } = w(
    (f) => k.system.deleteToolSet({ id: f }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), q();
      },
      onError: (f) => {
        r.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", f);
      }
    }
  ), { runAsync: Z } = w(
    (f) => k.system.testToolSet({ id: f }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (f) => {
        r.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", f);
      }
    }
  ), { loading: Q, runAsync: Se } = w(
    (f) => k.system.getToolSetTools({ id: f }),
    {
      manual: !0,
      onSuccess: (f) => {
        R(f || []), I(!0);
      },
      onError: (f) => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", f);
      }
    }
  ), Ce = ke(
    async (f, L) => {
      K(f.id);
      try {
        await k.system.updateToolSetStatus(
          { id: f.id },
          { status: L ? "enabled" : "disabled" }
        ), r.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), q();
      } catch (fe) {
        r.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", fe);
      } finally {
        K(null);
      }
    },
    [t, q]
  ), xe = () => {
    x(null), s.resetFields(), P(""), d(!0);
  }, Fe = (f) => {
    x(f), P(f.type);
    const L = { ...f };
    s.setFieldsValue(L), d(!0);
  }, ve = (f) => {
    P(f), s.setFieldValue("config", {});
  }, we = (f) => {
    n ? y({ id: n.id, data: f }) : pe(f);
  }, he = (f) => {
    z(f);
  }, b = (f) => {
    E(f), p(!0);
  }, ee = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (f, L) => /* @__PURE__ */ e.jsxs(W, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: f }),
        L.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (f) => /* @__PURE__ */ e.jsx(ne, { color: "blue", children: f.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      key: "status",
      width: 120,
      render: (f, L) => {
        const fe = L.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          ue,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: fe ? "green" : "red", children: fe ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Qe,
              {
                title: fe ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  oe,
                  {
                    size: "small",
                    checked: fe,
                    loading: N === L.id,
                    onChange: (_) => void Ce(L, _)
                  }
                ) })
              }
            )
          }
        );
      }
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 168,
      render: (f, L) => /* @__PURE__ */ e.jsx(Ne, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(zt, {}),
          disabled: L.status !== "enabled",
          onClick: async () => Z(L.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(Ze, {}),
          permission: "system:toolsets:view",
          disabled: L.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => Se(L.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(Pt, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => b(L.config),
          disabled: !L.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: L.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          onClick: async () => Fe(L),
          disabled: !!L.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          permission: "system:toolsets:delete",
          tooltip: L.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : l("delete", { defaultValue: "Delete" }),
          onClick: async () => he(L.id),
          danger: !0,
          disabled: !!L.is_preset,
          confirm: L.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => he(L.id),
            okText: l("confirm", { defaultValue: "Confirm" }),
            cancelText: l("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(De, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(
          V.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            onSearch: (f) => h(f),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          B,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: A,
            onChange: (f) => O(f),
            options: m == null ? void 0 : m.map((f) => ({
              label: f.name,
              value: f.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "", children: "All" }),
              m == null ? void 0 : m.map((f) => /* @__PURE__ */ e.jsx(B.Option, { value: f.tool_set_type, children: f.name }, f.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(
          F,
          {
            icon: /* @__PURE__ */ e.jsx(be, {}),
            onClick: q,
            loading: H,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ue, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          F,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Me, {}),
            onClick: xe,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx(
      ze,
      {
        columns: ee,
        dataSource: (J == null ? void 0 : J.data) || [],
        loading: H,
        rowKey: "id",
        pagination: {
          total: (J == null ? void 0 : J.total) || 0,
          current: (J == null ? void 0 : J.current) || 1,
          pageSize: (J == null ? void 0 : J.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (f, L) => l("pagination.total", {
            defaultValue: `${L[0]}-${L[1]} of ${f} items`,
            start: L[0],
            end: L[1],
            total: f
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: n ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: i,
        onCancel: () => {
          d(!1), s.resetFields(), x(null), P("");
        },
        footer: null,
        width: ((me = U == null ? void 0 : U.ui_schema) == null ? void 0 : me["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: s,
            layout: "vertical",
            onFinish: we,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: t("settings.toolsets.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                  children: /* @__PURE__ */ e.jsx(V, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: t("settings.toolsets.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    ys,
                    {
                      rows: 3,
                      placeholder: t("settings.toolsets.descriptionPlaceholder", { defaultValue: "Enter toolset description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "type",
                  label: t("settings.toolsets.type", { defaultValue: "Type" }),
                  rules: [{ required: !0, message: t("settings.toolsets.typeRequired", { defaultValue: "Please select type" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    B,
                    {
                      loading: v,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: ve,
                      value: T,
                      options: m == null ? void 0 : m.map((f) => ({
                        label: f.name,
                        value: f.tool_set_type
                      }))
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                Wt,
                {
                  name: "config",
                  schema: U == null ? void 0 : U.config_schema,
                  uiSchema: U == null ? void 0 : U.ui_schema
                }
              ),
              /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
                /* @__PURE__ */ e.jsx(
                  F,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: ce || le,
                    children: n ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  F,
                  {
                    onClick: () => {
                      d(!1), s.resetFields(), x(null), P("");
                    },
                    children: l("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: o,
        onCancel: () => p(!1),
        footer: [
          /* @__PURE__ */ e.jsx(F, { onClick: () => p(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(c, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: S,
        onCancel: () => I(!1),
        footer: [
          /* @__PURE__ */ e.jsx(F, { onClick: () => I(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: Q ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(be, { style: { fontSize: 24 }, spin: !0 }) }) : D.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : D.map((f, L) => {
          var fe, _, C;
          return /* @__PURE__ */ e.jsx(
            se,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(W, { children: [
                /* @__PURE__ */ e.jsx(Ze, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((fe = f.function) == null ? void 0 : fe.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(De, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(ye, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((_ = f.function) == null ? void 0 : _.description) || "-" })
                ] }),
                ((C = f.function) == null ? void 0 : C.parameters) && /* @__PURE__ */ e.jsxs(ye, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(f.function.parameters, null, 2) })
                ] })
              ] })
            },
            L
          );
        }) })
      }
    )
  ] });
}, { TextArea: at } = V;
function bs(t, l) {
  const s = {}, i = [], d = new Map(l.map((n) => [n.id, n]));
  for (const n of t) {
    if (n.toolset_id === "*") {
      i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
      continue;
    }
    const x = d.get(n.toolset_id);
    if (!x) {
      i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
      continue;
    }
    const g = (x.tools || []).map((h) => h.name);
    if (n.tool_name === "*") {
      s[n.toolset_id] = [...g];
      continue;
    }
    g.includes(n.tool_name) ? (s[n.toolset_id] || (s[n.toolset_id] = []), s[n.toolset_id].includes(n.tool_name) || s[n.toolset_id].push(n.tool_name)) : i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
  }
  return { selections: s, extraPatterns: i };
}
function Vs(t, l) {
  const s = [], i = /* @__PURE__ */ new Set();
  for (const [d, n] of Object.entries(t))
    for (const x of n) {
      const g = `${d}|${x}`;
      i.has(g) || (i.add(g), s.push({ toolset_id: d, tool_name: x }));
    }
  for (const d of l) {
    const n = d.toolset_id.trim(), x = d.tool_name.trim();
    if (!n || !x)
      continue;
    const g = `${n}|${x}`;
    i.has(g) || (i.add(g), s.push({ toolset_id: n, tool_name: x }));
  }
  return s;
}
function pt(t, l) {
  const s = l.trim();
  return !s || t.some((i) => i.value === s) ? t : [...t, { value: s, label: s }];
}
function ks(t, l, s, i) {
  const n = [{ value: "*", label: i }], x = /* @__PURE__ */ new Set(["*"]), g = (h, o) => {
    x.has(h) || (x.add(h), n.push({
      value: h,
      label: o ? `${h} — ${o}` : h
    }));
  };
  if (l && l !== "*") {
    const h = t.find((o) => o.id === l);
    for (const o of (h == null ? void 0 : h.tools) || [])
      g(o.name, o.description);
  } else
    for (const h of t)
      for (const o of h.tools || [])
        g(o.name, o.description);
  return pt(n, s);
}
const _s = () => {
  const { t } = G("system"), { t: l } = G("common"), s = _e(), { enableSkillToolBinding: i } = gt(), [d] = a.useForm(), [n, x] = j(""), [g, h] = j(), [o, p] = j(!1), [c, E] = j(null), [T, P] = j(null), [S, I] = j(!1), [D] = a.useForm(), [R, A] = j(!1), [O, N] = j(null), [K, H] = j([]), [J, q] = j({}), [v, m] = j([]), [U, ce] = j(!1), pe = Te(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...K.map((u) => ({
      value: u.id,
      label: `${u.name} (${u.id})`
    }))
  ], [K, t]), le = ke(() => {
    H([]), q({}), m([]);
  }, []), { loading: y, data: z, refresh: Z } = w(
    () => k.system.listSkills({
      current: 1,
      page_size: 100,
      search: n || void 0,
      domain: g
    }),
    {
      refreshDeps: [n, g],
      onError: () => {
        r.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: Q = [] } = w(() => k.system.listSkillDomains()), Se = (z == null ? void 0 : z.data) ?? [], Ce = (z == null ? void 0 : z.total) ?? 0, { run: xe } = w(
    (u) => k.system.deleteSkill({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), Z();
      },
      onError: () => {
        r.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), Fe = ke(
    async (u, M) => {
      N(u.id);
      try {
        await k.system.updateSkillStatus({ id: u.id }, { status: M ? "enabled" : "disabled" }), r.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), Z();
      } catch {
        r.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        N(null);
      }
    },
    [t, Z]
  ), { loading: ve, run: we } = w(
    (u) => k.system.uploadSkill(u.body, u.file),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), I(!1), D.resetFields(), Z();
      },
      onError: () => {
        r.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), he = ke(
    async (u) => {
      ce(!0);
      try {
        const [M, $] = await Promise.all([
          k.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          k.system.listSkillAiToolBindings(
            { id: u, current: 1, page_size: 1e3 }
          )
        ]), ie = (M.data || []).filter((xt) => xt.status === "enabled");
        H(ie);
        const X = $.data || [], { selections: Y, extraPatterns: Re } = bs(X, ie);
        q(Y), m(Re);
      } catch {
        r.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), le();
      } finally {
        ce(!1);
      }
    },
    [le, t]
  );
  Pe(() => {
    !o || !c || !i || he(c.id);
  }, [o, c == null ? void 0 : c.id, i, he]);
  const b = (u, M) => {
    q(($) => ({ ...$, [u]: M }));
  }, ee = (u, M, $) => {
    q((ie) => ({
      ...ie,
      [u]: $ ? [...M] : []
    }));
  }, me = () => {
    E(null), P(null), d.resetFields(), le(), p(!0);
  }, f = (u) => {
    E(u), P(null), d.setFieldsValue({
      name: u.name,
      description: u.description,
      category: u.category,
      domain: u.domain
    }), le(), p(!0);
  }, L = (u) => {
    E(null), P(u), d.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: u.name, defaultValue: "{{name}} (copy)" }),
      description: u.description,
      category: u.category,
      domain: u.domain
    }), le(), p(!0);
  }, fe = () => {
    d.validateFields().then(async (u) => {
      A(!0);
      try {
        if (c) {
          const M = {
            name: u.name,
            description: u.description ?? "",
            category: u.category ?? "",
            domain: u.domain ?? ""
          };
          if (await k.system.updateSkill({ id: c.id }, M), i) {
            const $ = Vs(J, v);
            await k.system.replaceSkillAiToolBindings(
              { id: c.id },
              { bindings: $ }
            );
          }
          r.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (T) {
          const M = {
            source_id: T.id,
            name: u.name,
            description: u.description ?? "",
            category: u.category ?? "",
            domain: u.domain ?? ""
          }, { id: $ } = await k.system.cloneSkill(M);
          r.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), p(!1), P(null), d.resetFields(), le(), Z(), $ && s(`/system/settings/skills/${$}/edit`);
          return;
        } else {
          const M = {
            name: u.name,
            description: u.description ?? "",
            category: u.category ?? "",
            domain: u.domain ?? "",
            content: u.content ?? ""
          };
          await k.system.createSkill(M), r.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        p(!1), E(null), P(null), d.resetFields(), le(), Z();
      } catch {
        r.error(
          c ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : T ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        A(!1);
      }
    });
  }, _ = () => {
    var X, Y;
    const u = (X = D.getFieldValue("file")) == null ? void 0 : X.fileList, M = ((Y = u == null ? void 0 : u[0]) == null ? void 0 : Y.originFileObj) ?? (u == null ? void 0 : u[0]);
    if (!M) {
      r.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const $ = D.getFieldValue("category"), ie = D.getFieldValue("domain");
    we({ body: { category: $, domain: ie }, file: M });
  }, C = i && c, te = C ? 720 : 560, ge = !c && !T, qe = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (u, M) => /* @__PURE__ */ e.jsxs(W, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: u }),
        M.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (u) => u ? /* @__PURE__ */ e.jsx(ne, { children: u }) : "-" },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (u) => u ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: u }) : "-" },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (u, M) => {
        const $ = M.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          ue,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: $ ? "green" : "red", children: $ ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Qe,
              {
                title: $ ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  oe,
                  {
                    size: "small",
                    checked: $,
                    loading: O === M.id,
                    onChange: (ie) => void Fe(M, ie)
                  }
                ) })
              }
            )
          }
        );
      }
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 220,
      render: (u, M) => /* @__PURE__ */ e.jsx(
        Ne,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(Be, {}),
              tooltip: M.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => s(`/system/settings/skills/${M.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!M.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(rt, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => s(`/system/settings/skills/${M.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              tooltip: M.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => f(M),
              permission: "system:skills:update",
              disabled: !!M.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(ot, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => L(M),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              tooltip: M.is_preset ? t("settings.skills.presetDisabledDelete", {
                defaultValue: "Built-in skills cannot be deleted."
              }) : t("settings.skills.actionDelete", { defaultValue: "Delete" }),
              danger: !0,
              disabled: !!M.is_preset,
              confirm: M.is_preset ? void 0 : {
                title: t("settings.skills.deleteSkillConfirm", { defaultValue: "Delete this skill?" }),
                description: t("settings.skills.deleteSkillConfirmDescription", {
                  defaultValue: "The skill and all its files will be removed. This cannot be undone."
                }),
                okText: l("confirm", { defaultValue: "Confirm" }),
                cancelText: l("cancel", { defaultValue: "Cancel" }),
                onConfirm: async () => xe(M.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(De, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(
          V.Search,
          {
            placeholder: l("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: x,
            style: { width: 300 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          B,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: g,
            onChange: h,
            options: Q.map((u) => ({ value: u, label: u }))
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(be, {}), onClick: () => Z(), children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ue, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(F, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: me, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(ue, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(tt, {}), onClick: () => I(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(se, { children: [
      /* @__PURE__ */ e.jsx(
        ze,
        {
          rowKey: "id",
          loading: y,
          columns: qe,
          dataSource: Se,
          pagination: { total: Ce, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        ae,
        {
          title: c ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : T ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: o,
          onOk: fe,
          onCancel: () => {
            p(!1), E(null), P(null), le();
          },
          confirmLoading: R,
          width: te,
          children: /* @__PURE__ */ e.jsxs(a, { form: d, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(at, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(B, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: Q.map((u) => ({ value: u, label: u })) }) }),
            ge && /* @__PURE__ */ e.jsx(a.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(at, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            C && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(je, { spinning: U, children: K.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(W, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: K.map((u) => {
                const M = (u.tools || []).map((Y) => Y.name), $ = J[u.id] || [], ie = M.length > 0 && $.length === M.length, X = $.length > 0 && $.length < M.length;
                return /* @__PURE__ */ e.jsx(
                  se,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        We,
                        {
                          checked: ie,
                          indeterminate: X,
                          onChange: (Y) => ee(u.id, M, Y.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: u.name })
                    ] }),
                    extra: u.description ? /* @__PURE__ */ e.jsx("span", { children: u.description }) : void 0,
                    children: (u.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(We.Group, { style: { width: "100%" }, value: $, onChange: (Y) => b(u.id, Y), children: /* @__PURE__ */ e.jsx(W, { direction: "vertical", style: { width: "100%" }, children: (u.tools || []).map((Y) => /* @__PURE__ */ e.jsx(We, { value: Y.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("div", { children: Y.name }),
                      Y.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: Y.description })
                    ] }) }, Y.name)) }) }) : /* @__PURE__ */ e.jsx(
                      Le,
                      {
                        image: Le.PRESENTED_IMAGE_SIMPLE,
                        description: t("settings.skills.aiToolsetNoTools", { defaultValue: "No tools available in this toolset." })
                      }
                    )
                  },
                  u.id
                );
              }) }),
              /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 12 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: t("settings.skills.wildcardPatterns", { defaultValue: "Wildcard patterns (optional)" }) }),
                /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12, marginBottom: 8 }, children: t("settings.skills.wildcardPatternsHelp", {
                  defaultValue: "Use * for toolset_id or tool_name (e.g. *:sleep for all toolsets, uuid:* for all tools in one toolset)."
                }) }),
                /* @__PURE__ */ e.jsxs(W, { direction: "vertical", style: { width: "100%" }, children: [
                  v.map((u, M) => /* @__PURE__ */ e.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        width: "100%"
                      },
                      children: [
                        /* @__PURE__ */ e.jsx(
                          et,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                            value: u.toolset_id,
                            options: pt(pe, u.toolset_id),
                            filterOption: ($, ie) => {
                              const X = ie;
                              return `${(X == null ? void 0 : X.value) ?? ""} ${(X == null ? void 0 : X.label) ?? ""}`.toLowerCase().includes($.toLowerCase());
                            },
                            onChange: ($) => {
                              const ie = typeof $ == "string" ? $ : "";
                              m(
                                (X) => X.map((Y, Re) => Re === M ? { ...Y, toolset_id: ie } : Y)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          et,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                            value: u.tool_name,
                            options: ks(
                              K,
                              u.toolset_id,
                              u.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: ($, ie) => {
                              const X = ie;
                              return `${(X == null ? void 0 : X.value) ?? ""} ${(X == null ? void 0 : X.label) ?? ""}`.toLowerCase().includes($.toLowerCase());
                            },
                            onChange: ($) => {
                              const ie = typeof $ == "string" ? $ : "";
                              m(
                                (X) => X.map((Y, Re) => Re === M ? { ...Y, tool_name: ie } : Y)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          F,
                          {
                            type: "default",
                            danger: !0,
                            style: { flexShrink: 0 },
                            onClick: () => m(($) => $.filter((ie, X) => X !== M)),
                            children: l("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    M
                  )),
                  /* @__PURE__ */ e.jsx(F, { type: "dashed", onClick: () => m((u) => [...u, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
                ] })
              ] })
            ] }) : /* @__PURE__ */ e.jsx(
              Le,
              {
                image: Le.PRESENTED_IMAGE_SIMPLE,
                description: t("settings.skills.aiToolsetsEmpty", { defaultValue: "No AI toolsets available for this organization." })
              }
            ) }) })
          ] })
        }
      ),
      /* @__PURE__ */ e.jsx(
        ae,
        {
          title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
          open: S,
          onOk: _,
          onCancel: () => I(!1),
          confirmLoading: ve,
          children: /* @__PURE__ */ e.jsxs(a, { form: D, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(a.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(bt, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(tt, {}), children: l("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(B, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: Q.map((u) => ({ value: u, label: u })) }) })
          ] })
        }
      )
    ] })
  ] });
}, Ss = () => {
  const t = _e(), { t: l } = G("system"), { t: s } = G("task"), { t: i } = G("common"), [d] = a.useForm(), { data: n } = w(k.system.listLogStorageBackends), x = (n ?? []).map((E) => ({
    value: E.id,
    label: l(`settings.task.logStorage.${E.id}`, { defaultValue: E.name })
  })), { loading: g, refresh: h } = w(k.system.getTaskSettings, {
    onSuccess: (E) => {
      E && d.setFieldsValue({
        max_concurrent: E.max_concurrent,
        log_storage_backend: E.log_storage_backend ?? "database",
        ai_chat_retention_days: E.ai_chat_retention_days ?? 90,
        log_retention_days: E.log_retention_days ?? 30,
        audit_log_retention_days: E.audit_log_retention_days ?? 365
      });
    },
    onError: () => {
      r.error(l("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: o, run: p } = w(k.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), h();
    },
    onError: () => {
      r.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), c = (E) => {
    p(E);
  };
  return /* @__PURE__ */ e.jsx(je, { spinning: g, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: c,
      initialValues: {
        max_concurrent: 10,
        log_storage_backend: "database",
        ai_chat_retention_days: 90,
        task_log_retention_days: 30,
        audit_log_retention_days: 365
      },
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "log_storage_backend",
            label: l("settings.task.logStorageBackend", { defaultValue: "Log storage" }),
            tooltip: l("settings.task.logStorageBackendTooltip", {
              defaultValue: "Where task execution logs are stored. Database stores logs in the application database."
            }),
            children: /* @__PURE__ */ e.jsx(
              B,
              {
                options: x,
                placeholder: l("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: n === void 0
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "max_concurrent",
            label: l("settings.task.maxConcurrent", { defaultValue: "Max concurrent tasks" }),
            tooltip: l("settings.task.maxConcurrentTooltip", {
              defaultValue: "Maximum number of tasks that can run at the same time."
            }),
            rules: [{ type: "number", min: 1, max: 100 }],
            children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 100, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "ai_chat_retention_days",
            label: l("settings.task.aiChatRetentionDays", { defaultValue: "AI chat retention (days)" }),
            tooltip: l("settings.task.aiChatRetentionDaysTooltip", {
              defaultValue: "Retention period for AI chat sessions, based on the last conversation time."
            }),
            rules: [{ type: "number", min: 1, max: 3650 }],
            children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "task_log_retention_days",
            label: l("settings.task.taskLogRetentionDays", { defaultValue: "Task log retention (days)" }),
            tooltip: l("settings.task.taskLogRetentionDaysTooltip", {
              defaultValue: "Retention period for task execution logs and historical task run records."
            }),
            rules: [{ type: "number", min: 1, max: 3650 }],
            children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "audit_log_retention_days",
            label: l("settings.task.auditLogRetentionDays", { defaultValue: "Audit log retention (days)" }),
            tooltip: l("settings.task.auditLogRetentionDaysTooltip", {
              defaultValue: "Retention period for audit logs."
            }),
            rules: [{ type: "number", min: 1, max: 3650 }],
            children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(F, { type: "primary", htmlType: "submit", loading: o, icon: /* @__PURE__ */ e.jsx(Ue, {}), children: i("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(F, { onClick: () => h(), icon: /* @__PURE__ */ e.jsx(be, {}), children: i("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(ue, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(Ot, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: vs } = V, ws = () => {
  const t = _e(), { t: l } = G("system"), { t: s } = G("common"), [i] = a.useForm(), [d, n] = j(!1), [x, g] = j(null), [h, o] = j(""), [p, c] = j(1), [E, T] = j(10), { loading: P, data: S, refresh: I } = w(
    () => Xt({ current: p, page_size: E, search: h }),
    {
      refreshDeps: [p, E, h],
      onError: (m) => {
        r.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", m);
      }
    }
  ), { loading: D, run: R } = w(
    (m) => Qt(m),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), n(!1), i.resetFields(), g(null), I();
      },
      onError: (m) => {
        r.error((m == null ? void 0 : m.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: A, run: O } = w(
    ({ id: m, ...U }) => Yt({ id: m }, U),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), n(!1), i.resetFields(), g(null), I();
      },
      onError: (m) => {
        r.error((m == null ? void 0 : m.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: N } = w(
    (m) => es({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), I();
      },
      onError: (m) => {
        r.error((m == null ? void 0 : m.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), K = () => {
    g(null), i.resetFields(), i.setFieldsValue({ status: "active" }), n(!0);
  }, H = (m) => {
    g(m), i.setFieldsValue({
      name: m.name,
      description: m.description,
      status: m.status
    }), n(!0);
  }, J = (m) => {
    ae.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${m.name}"? This action cannot be undone.`
      }),
      onOk: () => N(m.id)
    });
  }, q = () => {
    i.validateFields().then((m) => {
      x ? O({ id: x.id, ...m }) : R(m);
    });
  }, v = [
    {
      title: l("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: l("settings.organizations.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: l("settings.organizations.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (m) => /* @__PURE__ */ e.jsx(ne, { color: m === "active" ? "green" : "default", children: m === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (m, U) => /* @__PURE__ */ e.jsx(
        Ne,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(rt, {}),
              onClick: async () => t(`/system/settings/organizations/${U.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              onClick: async () => H(U),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              danger: !0,
              onClick: async () => J(U),
              permission: "system:organization:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    se,
    {
      title: l("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(be, {}), onClick: I, children: s("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ue, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(F, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: K, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(W, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (m) => {
                o(m), c(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            ze,
            {
              columns: v,
              dataSource: (S == null ? void 0 : S.data) || [],
              loading: P,
              rowKey: "id",
              pagination: {
                current: p,
                pageSize: E,
                total: (S == null ? void 0 : S.total) || 0,
                showSizeChanger: !0,
                showTotal: (m, U) => s("pagination.total", {
                  defaultValue: `${U[0]}-${U[1]} of ${m} items`,
                  start: U[0],
                  end: U[1],
                  total: m
                }),
                onChange: (m, U) => {
                  c(m), T(U);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          ae,
          {
            title: x ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: d,
            onOk: q,
            onCancel: () => {
              n(!1), i.resetFields(), g(null);
            },
            confirmLoading: D || A,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(a, { form: i, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: l("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: l("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(V, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: l("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(vs, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "status",
                  label: l("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs(B, { children: [
                    /* @__PURE__ */ e.jsx(B.Option, { value: "active", children: l("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(B.Option, { value: "disabled", children: l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, Cs = ({
  transformItems: t = (l) => l
}) => {
  const { t: l } = G("system"), s = _e(), i = Jt(), x = i.hash.replace("#", "") || "base", { enableMultiOrg: g } = gt(), { hasPermission: h } = Zt(), o = [
    {
      key: "base",
      label: l("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(ps, {}),
      hidden: !h("system:settings:update")
    },
    {
      key: "security",
      label: l("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(cs, {}),
      hidden: !h("system:security:update")
    },
    {
      key: "oauth",
      label: l("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(us, {}),
      hidden: !h("system:settings:update")
    },
    {
      key: "ldap",
      label: l("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(fs, {}),
      hidden: !h("system:settings:update")
    },
    {
      key: "smtp",
      label: l("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(gs, {}),
      hidden: !h("system:settings:update")
    },
    {
      key: "ai-models",
      label: l("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(xs, {}),
      hidden: !h("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: l("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(js, {}),
      hidden: !h("system:toolsets:view")
    },
    {
      key: "skills",
      label: l("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(_s, {}),
      hidden: !h("system:skills:view")
    },
    {
      key: "task",
      label: l("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(Ss, {}),
      hidden: !h("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...g ? [{
      key: "organizations",
      label: l("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(ws, {}),
      hidden: !h("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(se, { title: l("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    nt,
    {
      defaultActiveKey: x,
      onChange: (p) => {
        s(`${i.pathname}#${p}`);
      },
      items: t(o.filter((p) => !p.hidden), l)
    }
  ) });
}, ll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cs
}, Symbol.toStringTag, { value: "Module" })), Fs = () => {
  var ve, we, he;
  const t = _e(), { id: l } = Ye(), { t: s } = G("system"), { t: i } = G("common"), [d] = a.useForm(), [n] = a.useForm(), [x, g] = j(!1), [h, o] = j(!1), [p, c] = j(null), [E, T] = j(""), [P, S] = j(1), [I, D] = j(10), { data: R, loading: A, refresh: O } = w(
    () => ts({ id: l }),
    {
      ready: !!l,
      onError: (b) => {
        r.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", b);
      }
    }
  ), { data: N, loading: K, refresh: H } = w(
    () => ss({ id: l, current: P, page_size: I, search: E }),
    {
      ready: !!l,
      refreshDeps: [l, P, I, E],
      onError: (b) => {
        r.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", b);
      }
    }
  ), { data: J, loading: q } = w(
    () => ns({ current: 1, page_size: 1e3 }),
    {
      ready: x
    }
  ), { data: v, loading: m } = w(
    () => os({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: U, run: ce } = w(
    (b) => ls({ id: l }, b),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), g(!1), d.resetFields(), H();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: pe, run: le } = w(
    (b) => as({ id: l, user_id: p == null ? void 0 : p.id }, b),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), o(!1), n.resetFields(), c(null), H();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: y } = w(
    (b) => is({ id: l, user_id: b }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), H();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), z = () => {
    g(!0), d.resetFields();
  }, Z = (b) => {
    var ee;
    c(b), n.setFieldsValue({
      role_ids: ((ee = b.organization_roles) == null ? void 0 : ee.map((me) => me.id)) || []
    }), o(!0);
  }, Q = (b) => {
    ae.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${b.full_name || b.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => y(b.id)
    });
  }, Se = () => {
    d.validateFields().then((b) => {
      ce(b);
    });
  }, Ce = () => {
    n.validateFields().then((b) => {
      le(b);
    });
  }, xe = ((ve = J == null ? void 0 : J.data) == null ? void 0 : ve.filter((b) => {
    var ee;
    return !((ee = N == null ? void 0 : N.data) != null && ee.some((me) => me.id === b.id));
  })) || [], Fe = [
    {
      title: s("settings.organizations.users.username", { defaultValue: "Username" }),
      dataIndex: "username",
      key: "username"
    },
    {
      title: s("settings.organizations.users.email", { defaultValue: "Email" }),
      dataIndex: "email",
      key: "email"
    },
    {
      title: s("settings.organizations.users.fullName", { defaultValue: "Full Name" }),
      dataIndex: "full_name",
      key: "full_name"
    },
    {
      title: s("settings.organizations.users.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (b) => /* @__PURE__ */ e.jsx(ne, { color: b === "active" ? "green" : "default", children: b === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : b })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (b, ee) => {
        var me;
        return /* @__PURE__ */ e.jsx(W, { wrap: !0, children: ((me = ee.organization_roles) == null ? void 0 : me.map((f) => /* @__PURE__ */ e.jsx(ne, { children: f.name }, f.id))) || /* @__PURE__ */ e.jsx(ne, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (b, ee) => /* @__PURE__ */ e.jsx(
        Ne,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              onClick: async () => Z(ee)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              danger: !0,
              onClick: async () => Q(ee)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      se,
      {
        title: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            F,
            {
              icon: /* @__PURE__ */ e.jsx(dt, {}),
              onClick: () => t("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            R == null ? void 0 : R.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(be, {}), onClick: () => {
          O(), H();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: A,
        children: /* @__PURE__ */ e.jsxs(re, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(re.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: R == null ? void 0 : R.name }),
          /* @__PURE__ */ e.jsx(re.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: (R == null ? void 0 : R.status) === "active" ? "green" : "default", children: (R == null ? void 0 : R.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(re.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (R == null ? void 0 : R.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      se,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(F, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: z, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(W, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (b) => {
                T(b), S(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            ze,
            {
              columns: Fe,
              dataSource: (N == null ? void 0 : N.data) || [],
              loading: K,
              rowKey: "id",
              pagination: {
                current: P,
                pageSize: I,
                total: (N == null ? void 0 : N.total) || 0,
                showSizeChanger: !0,
                showTotal: (b) => i("pagination.total", { defaultValue: `Total ${b} items` }),
                onChange: (b, ee) => {
                  S(b), D(ee);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: s("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: x,
        onOk: Se,
        onCancel: () => {
          g(!1), d.resetFields();
        },
        confirmLoading: U,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: d, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "user_id",
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: s("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                B,
                {
                  showSearch: !0,
                  placeholder: s("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: q,
                  filterOption: (b, ee) => ((ee == null ? void 0 : ee.label) ?? "").toLowerCase().includes(b.toLowerCase()),
                  options: xe.map((b) => ({
                    label: `${b.full_name || b.username} (${b.email})`,
                    value: b.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "role_ids",
              label: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                B,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: m,
                  options: ((we = v == null ? void 0 : v.data) == null ? void 0 : we.map((b) => ({
                    label: b.name,
                    value: b.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: h,
        onOk: Ce,
        onCancel: () => {
          o(!1), n.resetFields(), c(null);
        },
        confirmLoading: pe,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: n, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                V,
                {
                  value: (p == null ? void 0 : p.full_name) || (p == null ? void 0 : p.username),
                  disabled: !0
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "role_ids",
              label: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                B,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: m,
                  options: ((he = v == null ? void 0 : v.data) == null ? void 0 : he.map((b) => ({
                    label: b.name,
                    value: b.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fs
}, Symbol.toStringTag, { value: "Module" })), Ts = rs(({ css: t }) => ({
  fileTree: t`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `
})), { TextArea: it } = V, Is = (t) => t.toLowerCase().endsWith(".md");
function ht(t) {
  return t.map((l) => {
    var s;
    return {
      key: l.path,
      title: l.name,
      isLeaf: !l.is_dir,
      icon: l.is_dir ? /* @__PURE__ */ e.jsx(ut, {}) : /* @__PURE__ */ e.jsx(ct, {}),
      children: (s = l.children) != null && s.length ? ht(l.children) : void 0
    };
  });
}
function Je(t) {
  return t.includes("/") ? t.replace(/\/[^/]+$/, "") : "";
}
const As = () => {
  const { styles: t } = Ts(), { id: l } = Ye(), s = _e(), { t: i } = G("system"), [d, n] = j(null), [x, g] = j(null), [h, o] = j(!1), [p, c] = j(""), [E, T] = j(!1), [P, S] = j([]), [I, D] = j(!1), [R, A] = j(!1), [O, N] = j(""), [K] = a.useForm(), [H, J] = j(null), [q, v] = j(null), [m, U] = j(""), [ce] = a.useForm(), { data: pe } = w(
    () => l ? k.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: le, loading: y, refresh: z } = w(
    () => l ? k.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (_) => {
        if (!d) {
          for (const C of _)
            if (!C.is_dir && C.name === "SKILL.md") {
              g(C.path), n(C.path), o(!1);
              return;
            }
          for (const C of _)
            if (!C.is_dir && C.name === "SKILLS.md") {
              g(C.path), n(C.path), o(!1);
              return;
            }
        }
      }
    }
  ), Z = (pe == null ? void 0 : pe.data) ?? pe, Q = !!(Z != null && Z.is_preset), Se = (le == null ? void 0 : le.data) ?? le ?? [], Ce = Te(() => ht(Se), [Se]), xe = h && x ? x : d ? Je(d) : "";
  Pe(() => {
    d && l ? (k.system.getSkillFile({ id: l, path: d }).then((_) => {
      c(_.data);
    }).catch(() => r.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))), T(!1)) : (c(""), T(!1));
  }, [l, d, i]);
  const Fe = () => {
    !l || !d || Q || k.system.putSkillFile({ id: l, path: d }, p).then(() => {
      r.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), T(!1);
    }).catch(() => r.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, ve = (_, C) => {
    const te = String(C.node.key), ge = !C.node.isLeaf;
    g(te), o(ge), C.node.isLeaf ? n(te) : n(null);
  }, we = (_) => {
    _.event.preventDefault(), J({
      path: String(_.node.key),
      isDir: !_.node.isLeaf,
      x: _.event.clientX,
      y: _.event.clientY
    });
  }, he = ke(() => J(null), []), b = ke(
    (_) => {
      if (!l || !H || Q) return;
      const { path: C, isDir: te } = H;
      switch (he(), _) {
        case "open":
          n(C), g(C), o(!1);
          break;
        case "rename": {
          const ge = C.includes("/") ? C.split("/").pop() : C;
          v({ path: C, isDir: te }), U(ge), setTimeout(() => ce.setFieldsValue({ name: ge }), 0);
          break;
        }
        case "delete":
          ae.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: te ? i("settings.skills.editor.deleteConfirmContentDir", { path: C, defaultValue: `Delete ${C}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: C, defaultValue: `Delete ${C}?` }),
            onOk: () => k.system.deleteSkillPath({ id: l, path: C }).then(() => {
              r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === C && (n(null), c("")), x === C && (g(null), o(!1)), z();
            }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          g(C), o(te), D(!0);
          break;
        case "newDir":
          g(C), o(te), A(!0);
          break;
      }
    },
    [l, H, he, z, d, x, ce, i, Q]
  ), ee = () => {
    if (!l || !q || Q) return;
    const _ = (ce.getFieldValue("name") ?? m).trim();
    if (!_) {
      r.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!q.isDir && !/\.(md|txt)$/i.test(_)) {
      r.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const C = Je(q.path), te = C ? `${C}/${_}` : _;
    if (te === q.path) {
      v(null);
      return;
    }
    k.system.moveSkillPath({ id: l }, { from_path: q.path, to_path: te }).then(() => {
      r.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), d === q.path && n(te), x === q.path && g(te), v(null), z();
    }).catch(() => r.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, me = (_) => {
    if (!l || Q) return;
    const C = String(_.dragNode.key), te = String(_.dragNode.title);
    let ge;
    if (_.dropToGap) {
      const qe = Je(String(_.node.key));
      ge = qe ? `${qe}/${te}` : te;
    } else
      ge = `${_.node.key}/${te}`;
    ge !== C && k.system.moveSkillPath({ id: l }, { from_path: C, to_path: ge }).then(() => {
      r.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), d === C && n(ge), x === C && g(ge), z();
    }).catch(() => r.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, f = () => {
    const _ = O.trim();
    if (!_ || !l || Q) return;
    const C = xe ? `${xe}/${_}` : _;
    if (!/\.(md|txt)$/i.test(_)) {
      r.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    k.system.putSkillFile({ id: l, path: C }, "").then(() => {
      r.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), D(!1), N(""), z(), n(C), c("");
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, L = () => {
    var te;
    const _ = (te = K.getFieldValue("name")) == null ? void 0 : te.trim();
    if (!_ || !l || Q) return;
    const C = xe ? `${xe}/${_}` : _;
    k.system.createSkillDir({ id: l }, { path: C }).then(() => {
      r.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), A(!1), K.resetFields(), z();
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, fe = () => {
    const _ = x || d;
    !l || !_ || Q || ae.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: _, defaultValue: `Delete ${_}?` }),
      onOk: () => k.system.deleteSkillPath({ id: l, path: _ }).then(() => {
        r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === _ && (n(null), c("")), x === _ && (g(null), o(!1)), z();
      }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    se,
    {
      title: (Z == null ? void 0 : Z.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(F, { type: "link", onClick: () => s("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        Q ? /* @__PURE__ */ e.jsx(
          Ge,
          {
            type: "info",
            showIcon: !0,
            style: { marginBottom: 12 },
            message: i("settings.skills.editor.presetReadOnly", {
              defaultValue: "This is a built-in skill. Files are read-only; use Preview to view content."
            })
          }
        ) : null,
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 16, flex: 1, minHeight: 0 }, children: [
          /* @__PURE__ */ e.jsxs("div", { style: { width: 260, border: "1px solid #d9d9d9", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            /* @__PURE__ */ e.jsxs(W, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(F, { size: "small", icon: /* @__PURE__ */ e.jsx(Me, {}), disabled: Q, onClick: () => D(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(F, { size: "small", icon: /* @__PURE__ */ e.jsx(ut, {}), disabled: Q, onClick: () => A(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            y ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              Vt,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !Q,
                expandedKeys: P,
                onExpand: (_) => S(_),
                selectedKeys: x ? [x] : [],
                onSelect: ve,
                onRightClick: Q ? void 0 : we,
                onDrop: me,
                className: t.fileTree,
                treeData: Ce
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(W, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: d }),
                /* @__PURE__ */ e.jsx(F, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ue, {}), disabled: Q || !E, onClick: Fe, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(F, { danger: !0, icon: /* @__PURE__ */ e.jsx(Ie, {}), disabled: Q, onClick: fe, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              Is(d) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  it,
                  {
                    value: p,
                    readOnly: Q,
                    onChange: (_) => {
                      c(_.target.value), T(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(ft, { content: mt(p) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                it,
                {
                  value: p,
                  readOnly: Q,
                  onChange: (_) => {
                    c(_.target.value), T(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              )
            ] }),
            !d && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        H && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: he,
              onContextMenu: (_) => _.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: H.x, top: H.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            kt,
            {
              selectable: !1,
              items: [
                ...H.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(ct, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Oe, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Ie, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(Mt, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(Rt, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: _ }) => b(_)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(ae, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: I, onOk: f, onCancel: () => {
          D(!1), N("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: O, onChange: (_) => N(_.target.value) }) }),
        /* @__PURE__ */ e.jsx(ae, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: R, onOk: () => K.validateFields().then(L), onCancel: () => A(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(a, { form: K, layout: "vertical", children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          ae,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!q,
            onOk: ee,
            onCancel: () => v(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(a, { form: ce, layout: "vertical", onValuesChange: (_, C) => U(C.name ?? ""), children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: q != null && q.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              V,
              {
                placeholder: q != null && q.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => ee()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: As
}, Symbol.toStringTag, { value: "Module" })), Es = () => {
  const { id: t } = Ye(), l = _e(), { t: s } = G("system"), { data: i, loading: d } = w(
    () => t ? k.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: n, loading: x, mutate: g } = w(
    () => t ? k.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => r.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => g()
    }
  ), h = (i == null ? void 0 : i.data) ?? i, o = Te(() => n == null ? void 0 : n.map((c) => ({
    key: c.file_name,
    label: c.file_name,
    children: /* @__PURE__ */ e.jsx(ft, { content: mt(c.content) })
  })), [n]);
  if (!t) return null;
  const p = d || x;
  return /* @__PURE__ */ e.jsx(je, { spinning: p, children: /* @__PURE__ */ e.jsx(
    se,
    {
      title: (h == null ? void 0 : h.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(F, { type: "link", onClick: () => l("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: o
    }
  ) });
}, nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Es
}, Symbol.toStringTag, { value: "Module" })), { Text: Ve, Title: zs } = St, Ps = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx($t, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(qt, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Nt, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(Ze, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(Be, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(Ut, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(Be, {}) }
};
function He(t) {
  try {
    return { parsed: JSON.parse(t), isJSON: !0 };
  } catch {
    return { parsed: null, isJSON: !1 };
  }
}
const Ee = ({
  content: t,
  maxHeight: l = 400
}) => {
  const { parsed: s, isJSON: i } = He(t);
  return i ? /* @__PURE__ */ e.jsx(
    "pre",
    {
      style: {
        background: "var(--ant-color-bg-container)",
        border: "1px solid var(--ant-color-border)",
        borderRadius: 6,
        padding: 12,
        maxHeight: l,
        overflow: "auto",
        fontSize: 12,
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        margin: 0
      },
      children: JSON.stringify(s, null, 2)
    }
  ) : /* @__PURE__ */ e.jsx(
    "pre",
    {
      style: {
        background: "var(--ant-color-bg-container)",
        border: "1px solid var(--ant-color-border)",
        borderRadius: 6,
        padding: 12,
        maxHeight: l,
        overflow: "auto",
        fontSize: 12,
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        margin: 0
      },
      children: t
    }
  );
}, Os = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = He(t);
  return i ? /* @__PURE__ */ e.jsxs(re, { size: "small", column: 2, bordered: !0, children: [
    s.prompt_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      re.Item,
      {
        label: l("trace.promptTokens", { defaultValue: "Prompt Tokens" }),
        children: s.prompt_tokens
      }
    ),
    s.completion_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      re.Item,
      {
        label: l("trace.completionTokens", {
          defaultValue: "Completion Tokens"
        }),
        children: s.completion_tokens
      }
    ),
    s.total_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      re.Item,
      {
        label: l("trace.totalTokens", { defaultValue: "Total Tokens" }),
        children: s.total_tokens
      }
    ),
    s.active_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      re.Item,
      {
        label: l("trace.activeTokens", { defaultValue: "Active Tokens" }),
        children: s.active_tokens
      }
    )
  ] }) : /* @__PURE__ */ e.jsx(Ee, { content: t });
}, Ms = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = He(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(Ve, { strong: !0, children: [
        l("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(ne, { color: "blue", children: s.tool })
    ] }),
    s.arguments && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(Ve, { strong: !0, children: [
        l("trace.arguments", { defaultValue: "Arguments" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(Ee, { content: s.arguments, maxHeight: 200 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(Ee, { content: t });
}, Rs = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = He(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(Ve, { strong: !0, children: [
        l("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(Ve, { code: !0, children: s.tool_call_id })
    ] }),
    s.result && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(Ve, { strong: !0, children: [
        l("trace.result", { defaultValue: "Result" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(Ee, { content: s.result, maxHeight: 300 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(Ee, { content: t });
}, Ls = ({ event: t, t: l }) => {
  switch (t.event_type) {
    case "token_usage":
      return /* @__PURE__ */ e.jsx(Os, { content: t.content, t: l });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(Ms, { content: t.content, t: l });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(Rs, { content: t.content, t: l });
    case "error":
      return /* @__PURE__ */ e.jsx(
        "pre",
        {
          style: {
            background: "var(--ant-color-error-bg)",
            border: "1px solid var(--ant-color-error-border)",
            borderRadius: 6,
            padding: 12,
            maxHeight: 300,
            overflow: "auto",
            fontSize: 12,
            color: "var(--ant-color-error)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            margin: 0
          },
          children: t.content
        }
      );
    default:
      return /* @__PURE__ */ e.jsx(Ee, { content: t.content });
  }
}, Ds = () => {
  const { t } = G("ai"), l = _e(), [s, i] = j(""), [d, n] = j(""), {
    data: x,
    loading: g,
    refresh: h
  } = w(() => k.ai.getAiTraceStatus(), {
    onError: () => {
      r.error(
        t("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), o = (x == null ? void 0 : x.enabled) ?? !1, { loading: p, run: c } = w(
    (O) => k.ai.toggleAiTrace({ enabled: O }),
    {
      manual: !0,
      onSuccess: (O, [N]) => {
        r.success(
          N ? t("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : t("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), h(), N || n("");
      },
      onError: () => {
        r.error(
          t("trace.toggleFailed", {
            defaultValue: "Failed to toggle AI debug tracing"
          })
        );
      }
    }
  ), {
    data: E,
    loading: T,
    run: P
  } = w(
    (O) => k.ai.getAiTraceEvents({ trace_id: O }),
    {
      manual: !0,
      onError: () => {
        r.error(
          t("trace.fetchFailed", {
            defaultValue: "Failed to fetch trace events"
          })
        );
      }
    }
  ), S = ke(() => {
    s.trim() && (n(s.trim()), P(s.trim()));
  }, [s, P]), I = ke(
    (O) => {
      const N = O ? t("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : t("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      ae.confirm({
        title: O ? t("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : t("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: N,
        onOk: () => c(O)
      });
    },
    [t, c]
  ), D = ke(async () => {
    if (d)
      try {
        const O = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(d)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!O.ok) throw new Error("download failed");
        const N = await O.blob(), K = window.URL.createObjectURL(N), H = document.createElement("a");
        H.href = K, H.download = `ai-trace-${d}.json`, document.body.appendChild(H), H.click(), window.URL.revokeObjectURL(K), document.body.removeChild(H);
      } catch {
        r.error(
          t("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, t]), R = Te(() => E ?? [], [E]), A = Te(
    () => R.map((O) => {
      const N = Ps[O.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(Be, {})
      }, K = t(
        `trace.eventTypes.${O.event_type}`,
        { defaultValue: O.event_type }
      );
      return {
        key: O.id,
        dot: N.icon,
        color: N.color,
        children: /* @__PURE__ */ e.jsx(
          _t,
          {
            size: "small",
            defaultActiveKey: [O.id],
            items: [
              {
                key: O.id,
                label: /* @__PURE__ */ e.jsxs(W, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(ne, { color: N.color, children: K }),
                  /* @__PURE__ */ e.jsxs(Ve, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    O.step_order
                  ] }),
                  O.duration_ms > 0 && /* @__PURE__ */ e.jsxs(Ve, { type: "secondary", style: { fontSize: 12 }, children: [
                    t("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    O.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(Ve, { type: "secondary", style: { fontSize: 12 }, children: new Date(O.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(Ls, { event: O, t })
              }
            ]
          }
        )
      };
    }),
    [R, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [
          /* @__PURE__ */ e.jsxs(W, { children: [
            /* @__PURE__ */ e.jsx(
              F,
              {
                icon: /* @__PURE__ */ e.jsx(dt, {}),
                onClick: () => l("/system/settings#ai-models"),
                children: t("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(zs, { level: 4, style: { margin: 0 }, children: t("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(W, { children: [
            /* @__PURE__ */ e.jsx(Ve, { children: o ? t("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : t("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              oe,
              {
                checked: o,
                loading: g || p,
                onChange: I
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(W.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        V,
        {
          placeholder: t("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: s,
          onChange: (O) => i(O.target.value),
          onPressEnter: S,
          prefix: /* @__PURE__ */ e.jsx(Lt, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(F, { type: "primary", onClick: S, loading: T, children: t("trace.search", { defaultValue: "Search" }) }),
      d && R.length > 0 && /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(Dt, {}), onClick: D, children: t("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    T ? /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(je, { size: "large" }) }) }) : d && R.length === 0 ? /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx(
      Le,
      {
        description: t("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : R.length > 0 ? /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx(vt, { items: A }) }) : null
  ] });
}, ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ds
}, Symbol.toStringTag, { value: "Module" })), Us = () => {
  const { t } = G("system"), [l] = Gt(), s = l.get("provider"), i = l.get("code"), d = l.get("state"), [n, x] = j(null), [g, h] = j(null), [o, p] = j(null);
  return w(async () => {
    if (!i || !d || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const c = await k.system.testOauthCallback({ code: i, state: d, provider: s });
    if (!c.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!c.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    x(c.user), h(c.user_info);
  }, {
    onSuccess: () => {
      p({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (c) => {
      p({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: c.message
      });
    }
  }), o ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    wt,
    {
      status: o.status,
      title: o.message,
      subTitle: o.error,
      extra: /* @__PURE__ */ e.jsxs(W, { style: { display: !g || !n ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(se, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(lt, { src: g || {} }) }),
        /* @__PURE__ */ e.jsx(se, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(lt, { src: n || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(Kt, {});
}, rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Us
}, Symbol.toStringTag, { value: "Module" }));
export {
  ol as A,
  al as O,
  il as S,
  nl as a,
  rl as b,
  ll as i
};
