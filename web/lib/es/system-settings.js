import { j as e, g as _t, h as wt } from "./vendor.js";
import { App as ce, Form as o, Spin as be, Switch as de, Select as q, Input as k, Alert as nt, Divider as dt, Space as G, Button as E, InputNumber as me, Modal as fe, Skeleton as Gt, Descriptions as oe, Steps as Zt, Tag as ne, Table as Me, Radio as qe, Tabs as Ct, Popconfirm as Xt, Tooltip as et, Card as le, Row as $e, Col as _e, Checkbox as lt, Empty as Re, AutoComplete as pt, Upload as Qt, Tree as Yt, Menu as es, Collapse as ts, Typography as Tt, Timeline as ss, Segmented as tt, Drawer as ls, Result as as } from "antd";
import { useTranslation as X } from "react-i18next";
import { useState as y, useEffect as Fe, useMemo as je, Suspense as We, lazy as He, useCallback as xe, useRef as is } from "react";
import { useRequest as A } from "ahooks";
import { SaveOutlined as Ke, ReloadOutlined as we, LoadingOutlined as ns, CheckCircleTwoTone as os, ClearOutlined as rs, StarFilled as ds, CheckCircleOutlined as us, StarOutlined as cs, EditOutlined as Ne, CopyOutlined as Ft, DeleteOutlined as ze, BugOutlined as It, PlusOutlined as Le, ThunderboltOutlined as ms, ToolOutlined as ot, SettingOutlined as ps, FileTextOutlined as Xe, EyeOutlined as At, UploadOutlined as ft, UnorderedListOutlined as Et, CalendarOutlined as fs, ArrowLeftOutlined as ut, FolderOutlined as zt, FileOutlined as Ot, FileAddOutlined as gs, FolderAddOutlined as hs, SearchOutlined as xs, DownloadOutlined as ys, ApartmentOutlined as js, WarningOutlined as bs, DashboardOutlined as Vs, MessageOutlined as ks, SendOutlined as vs, CloseCircleOutlined as Pt, AlignLeftOutlined as Rt, CodeOutlined as Mt, PlayCircleOutlined as Ss } from "@ant-design/icons";
import { a as F } from "./index.js";
import { g as gt, h as Nt, j as Be } from "./base.js";
import { g as pe, d as _s, b as Ge, L as De } from "./components.js";
import Lt from "react-quill-new";
import { b as ct, u as ws, a as Cs } from "./contexts.js";
import { useNavigate as ve, useLocation as Ts, useParams as st, useSearchParams as Dt } from "react-router-dom";
import { l as Fs, c as Is, u as As, d as Es, g as zs, b as Os, e as Ps, f as Rs, r as Ms } from "./system.js";
import { l as Ns, b as Ls } from "./authorization.js";
import { createStyles as mt } from "antd-style";
import Ds from "classnames";
import Qe from "@uiw/react-json-view";
import Us from "@uiw/react-codemirror";
import { json as qs } from "@codemirror/lang-json";
const Oe = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, $s = {
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
}, Bs = ({ initialData: l, onRefresh: t }) => {
  const { message: a } = ce.useApp(), { t: s } = X("system"), { t: n } = X("common"), [i] = o.useForm(), [d, m] = y((l == null ? void 0 : l.provider) || "custom"), [r, u] = y((l == null ? void 0 : l.provider) === "custom" || (l == null ? void 0 : l.provider) === "autoDiscover"), [p, b] = y((l == null ? void 0 : l.enabled) || !1), [g, O] = y((l == null ? void 0 : l.auto_create_user) || !1), { loading: _, data: R, refresh: V } = A(F.system.getOauthSettings, {
    manual: !!l,
    onSuccess: (w) => {
      i.setFieldsValue(w), m(w.provider), u(w.provider === "custom" || w.provider === "autoDiscover"), b(w.enabled), O(w.auto_create_user);
    },
    onError: (w) => {
      a.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", w);
    }
  });
  Fe(() => {
    l && (i.setFieldsValue(l), m(l.provider), u(l.provider === "custom" || l.provider === "autoDiscover"), b(l.enabled), O(l.auto_create_user));
  }, [l, i]);
  const M = (w) => {
    m(w), u(w === "custom" || w === "autoDiscover");
    const z = $s[w];
    z && i.setFieldsValue({
      auth_endpoint: z.endpoints.auth_endpoint,
      token_endpoint: z.endpoints.token_endpoint,
      userinfo_endpoint: z.endpoints.userinfo_endpoint,
      scope: z.scope,
      // Set field mappings
      email_field: z.email_field,
      username_field: z.username_field,
      full_name_field: z.full_name_field,
      avatar_field: z.avatar_field,
      role_field: z.role_field,
      // Set display configuration
      icon_url: z.icon_url,
      display_name: z.display_name
    });
  }, v = (w) => {
    b(w);
  }, L = (w) => {
    O(w);
  }, { loading: f, run: B } = A(F.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      a.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), t ? t() : V();
    },
    onError: (w) => {
      a.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", w);
    }
  }), ee = (w) => {
    B(w);
  }, H = () => {
    t ? t() : V();
  }, { loading: ae, run: K } = A(async ({ redirect_uri: w, ...z }) => {
    let $;
    return w ? $ = new URL(w) : $ = new URL(window.location.origin), $.pathname = gt("/system/settings/oauth/test-callback"), $.searchParams.set("provider", d), F.system.testOauthConnection({ redirect_uri: $.toString(), ...z });
  }, {
    manual: !0,
    onSuccess: ({ url: w }) => {
      window.open(w, "_blank");
    },
    onError: (w) => {
      a.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: w.message })), console.error("Failed to test OAuth connection", w);
    }
  }), J = () => d === "custom";
  return /* @__PURE__ */ e.jsx(be, { spinning: _, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: i,
      layout: "vertical",
      onFinish: ee,
      initialValues: l || R,
      children: [
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: v })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "provider",
            label: s("settings.oauth.provider.label", { defaultValue: "OAuth Provider" }),
            tooltip: s("settings.oauth.provider.tooltip", { defaultValue: "Select an OAuth provider or configure a custom one." }),
            rules: [
              {
                required: p,
                message: s("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs(q, { onChange: M, disabled: !p, children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "github", children: s("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "google", children: s("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "dingtalk", children: s("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "wechat", children: s("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "autoDiscover", children: s("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "custom", children: s("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "display_name",
            label: s("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: s("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              k,
              {
                disabled: !p,
                placeholder: d !== "custom" ? s(`settings.oauth.provider.options.${d}`, { defaultValue: d }) : ""
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "icon_url",
            label: s("settings.oauth.iconUrl.label", { defaultValue: "Icon URL" }),
            tooltip: s("settings.oauth.iconUrl.tooltip", { defaultValue: "URL of the icon for this provider. Displayed on the login button." }),
            rules: [
              {
                pattern: Oe,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !p, placeholder: "https://example.com/icon.png" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "client_id",
            label: s("settings.oauth.clientId.label", { defaultValue: "Client ID" }),
            tooltip: s("settings.oauth.clientId.tooltip", { defaultValue: "The Client ID provided by the OAuth provider." }),
            rules: [
              {
                required: p,
                message: s("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "client_secret",
            label: s("settings.oauth.clientSecret.label", { defaultValue: "Client Secret" }),
            tooltip: s("settings.oauth.clientSecret.tooltip", { defaultValue: "The Client Secret provided by the OAuth provider. This will be stored encrypted." }),
            rules: [
              {
                required: p,
                message: s("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k.Password, { disabled: !p, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        J() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: p && d === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: Oe,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "wellknown_endpoint",
            hidden: d !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: Oe,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: p && d === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !p })
          }
        ),
        J() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: p && d === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: Oe,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !p })
          }
        ),
        J() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: p && d === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: Oe,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "scope",
            label: s("settings.oauth.scope.label", { defaultValue: "Authorization Scope" }),
            tooltip: s("settings.oauth.scope.tooltip", { defaultValue: "The scopes to request from the OAuth provider, separated by spaces." }),
            rules: [
              {
                required: p,
                message: s("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(w) => w.getFieldValue("redirect_uri") !== "" ? {
              pattern: Oe,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !p, placeholder: `http://${window.location.host}${gt(`/login?provider=settings.${d}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: L, disabled: !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "default_role",
            label: s("settings.oauth.defaultRole.label", { defaultValue: "Default Role" }),
            tooltip: s("settings.oauth.defaultRole.tooltip", { defaultValue: "The default role to assign to new users created via OAuth. Enter role ID." }),
            rules: [
              {
                required: p && g,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !p || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "new_user_only",
            children: /* @__PURE__ */ e.jsxs(q, { disabled: !p, children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "new_user_only", children: s("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "temporary", children: s("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          nt,
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
                  s("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }),
                  ":"
                ] }),
                " ",
                s("settings.oauth.roleMappingMode.options.new_user_only.description", { defaultValue: "Uses OAuth2 roles only for newly created users. Existing users keep their current roles." })
              ] }),
              /* @__PURE__ */ e.jsxs("p", { children: [
                /* @__PURE__ */ e.jsxs("strong", { children: [
                  s("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }),
                  ":"
                ] }),
                " ",
                s("settings.oauth.roleMappingMode.options.temporary.description", { defaultValue: "Applies OAuth2 roles for the current session only without persisting them. Other login methods still use database roles." })
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
          o.Item,
          {
            name: "mfa_enabled",
            label: s("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(de, { disabled: !p })
          }
        ),
        /* @__PURE__ */ e.jsx(dt, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          nt,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: r ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "email", disabled: !p || !r })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "login", autoComplete: "off", disabled: !p || !r })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "name", disabled: !p || !r })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "avatar_url", disabled: !p || !r })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "role", disabled: !p || !r })
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: f,
              icon: /* @__PURE__ */ e.jsx(Ke, {}),
              children: n("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              loading: ae,
              onClick: async () => {
                const w = i.getFieldsValue();
                K(w);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: H,
              icon: /* @__PURE__ */ e.jsx(we, {}),
              children: n("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Js = () => {
  const { message: l } = ce.useApp(), { t } = X("system"), { t: a } = X("common"), [s] = o.useForm(), { loading: n, data: i, refresh: d } = A(F.system.getSecuritySettings, {
    onSuccess: (p) => {
      s.setFieldsValue(p);
    },
    onError: (p) => {
      l.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", p);
    }
  }), { loading: m, run: r } = A(F.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      l.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), d();
    },
    onError: (p) => {
      l.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", p);
    }
  }), u = (p) => {
    r(p);
  };
  return /* @__PURE__ */ e.jsx(be, { spinning: n, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: s,
      layout: "vertical",
      onFinish: u,
      initialValues: i,
      children: [
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_complexity",
            label: t("settings.security.passwordComplexity.label", { defaultValue: "Password Complexity" }),
            tooltip: t("settings.security.passwordComplexity.tooltip", { defaultValue: "Define the complexity requirements for user passwords." }),
            children: /* @__PURE__ */ e.jsxs(q, { children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_min_length",
            label: t("settings.security.passwordMinLength.label", { defaultValue: "Minimum Password Length" }),
            tooltip: t("settings.security.passwordMinLength.tooltip", { defaultValue: "The minimum number of characters required for a password." }),
            rules: [{ type: "number", min: 6, max: 32 }],
            children: /* @__PURE__ */ e.jsx(me, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_expiry_notify_days",
            label: t("settings.security.passwordExpiryNotify.label", { defaultValue: "Password Expiry Notification (Days Before Expiry)" }),
            tooltip: t("settings.security.passwordExpiryNotify.tooltip", { defaultValue: "Notify users by email this many days before password expiry. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            noStyle: !0,
            shouldUpdate: (p, b) => p.login_failure_lock !== b.login_failure_lock,
            children: ({ getFieldValue: p }) => p("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              o.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(me, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            noStyle: !0,
            shouldUpdate: (p, b) => p.login_failure_lock !== b.login_failure_lock,
            children: ({ getFieldValue: p }) => p("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              o.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(me, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "history_password_check",
            label: t("settings.security.historyPasswordCheck.label", { defaultValue: "Enforce Password History Policy" }),
            valuePropName: "checked",
            tooltip: t("settings.security.historyPasswordCheck.tooltip", { defaultValue: "Prevent users from reusing recent passwords." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            noStyle: !0,
            shouldUpdate: (p, b) => p.history_password_check !== b.history_password_check,
            children: ({ getFieldValue: p }) => p("history_password_check") ? /* @__PURE__ */ e.jsx(
              o.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(me, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "user_inactive_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: m,
              icon: /* @__PURE__ */ e.jsx(Ke, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => d(),
              icon: /* @__PURE__ */ e.jsx(we, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Ws = ({ fetchItems: l, importItems: t, columns: a, ...s }) => {
  const { message: n } = ce.useApp(), { t: i } = X("system"), [d, m] = y([]), [r, u] = y([]), { run: p, loading: b } = A(l, {
    onError: (_) => {
      n.error(i("settings.ldap.importError", { error: `${_.message}` }));
    },
    onSuccess: (_) => {
      m(_);
    },
    manual: !0
  }), { run: g, loading: O } = A(async () => {
    for (const _ of r.filter((R) => {
      const V = d.find((M) => M.ldap_dn === R);
      return !(!V || V.status === "imported");
    })) {
      const R = await t([_]);
      m((V) => [...V].map((v) => {
        for (const L of R)
          if (v.ldap_dn === L.ldap_dn)
            return { ...L, status: "imported" };
        return v;
      }));
    }
  }, {
    manual: !0
  });
  return Fe(() => {
    s.visible && (m([]), p(), u([]));
  }, [s.visible]), /* @__PURE__ */ e.jsx(
    fe,
    {
      title: i("settings.ldap.importTitle"),
      ...s,
      onOk: () => {
        g();
      },
      width: 900,
      confirmLoading: O,
      loading: b,
      children: /* @__PURE__ */ e.jsx(
        Me,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (_) => {
              u(_);
            },
            getCheckboxProps: (_) => ({
              disabled: _.status === "imported"
            })
          },
          columns: a.map(({ render: _, ...R }) => _ ? {
            ...R,
            render: (V, M, v) => {
              const L = r.includes(M.ldap_dn) && O && M.status !== "imported";
              return _(V, M, v, L);
            }
          } : R),
          dataSource: d,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, Hs = () => {
  var M, v, L;
  const { message: l } = ce.useApp(), { t } = X("system"), [a] = o.useForm(), [s, n] = y(!1), [i, d] = y(null), [m, r] = y(!1), [u, p] = y(!1), [b] = o.useForm(), [g, O] = y(!1);
  A(F.system.getLdapSettings, {
    onSuccess: (f) => {
      a.setFieldsValue(f), O(f.enabled);
    },
    onError: (f) => {
      l.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${f.message}` }));
    }
  }), Fe(() => {
    d(null);
  }, [m]);
  const _ = async (f) => {
    n(!0);
    try {
      await F.system.updateLdapSettings(f), l.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      l.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      n(!1);
    }
  }, { run: R, loading: V } = A(async (f) => {
    const B = await a.validateFields();
    return await F.system.testLdapConnection({
      ...f,
      ...B
    });
  }, {
    onSuccess: (f) => {
      d(f);
    },
    onError: (f) => {
      l.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${f.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      o,
      {
        form: a,
        layout: "vertical",
        onFinish: _,
        initialValues: {
          user_attr: "uid",
          email_attr: "mail",
          display_name_attr: "displayName",
          default_role: "user"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { onChange: (f) => O(f) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: g, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !g, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: g, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !g, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: g, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(k.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: g, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !g, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(k, { disabled: !g, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: g, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: g, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: g, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: g, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(k, { type: "number", defaultValue: 15, disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(dt, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(k.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(k.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(k.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsxs(o.Item, { children: [
            /* @__PURE__ */ e.jsx(pe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(pe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !g,
                style: { marginLeft: 8 },
                onClick: () => r(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(pe, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !g,
                style: { marginLeft: 8 },
                onClick: () => {
                  p(!0);
                },
                children: t("settings.ldap.import", { defaultValue: "Import Users" })
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs(
      fe,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: m,
        onCancel: () => r(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            o,
            {
              form: b,
              layout: "vertical",
              onFinish: R,
              children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(k, { disabled: !g })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(k.Password, { disabled: !g })
                  }
                ),
                /* @__PURE__ */ e.jsxs(o.Item, { children: [
                  /* @__PURE__ */ e.jsx(pe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { disabled: !g, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    E,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => r(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(be, { spinning: V, children: /* @__PURE__ */ e.jsx(Gt, { active: V, loading: V, children: i && (i.user ? /* @__PURE__ */ e.jsxs(oe, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(oe.Item, { label: "Username", span: 3, children: i.user.username }),
            /* @__PURE__ */ e.jsx(oe.Item, { label: "Email", span: 3, children: i.user.email }),
            /* @__PURE__ */ e.jsx(oe.Item, { label: "FullName", span: 3, children: i.user.full_name }),
            /* @__PURE__ */ e.jsx(oe.Item, { label: "CreatedAt", span: 3, children: i.user.created_at }),
            /* @__PURE__ */ e.jsx(oe.Item, { label: "UpdatedAt", span: 3, children: i.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            Zt,
            {
              direction: "vertical",
              current: (M = i.message) == null ? void 0 : M.findIndex((f) => !f.success),
              status: (v = i.message) != null && v.find((f) => !f.success) ? "error" : "finish",
              items: (L = i.message) == null ? void 0 : L.map((f) => ({
                status: f.success ? "finish" : "error",
                title: f.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      Ws,
      {
        visible: u,
        onCancel: () => p(!1),
        fetchItems: () => F.system.importLdapUsers({}),
        importItems: (f) => F.system.importLdapUsers({ user_dn: f }),
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
          render: (f, B, ee, H) => H ? /* @__PURE__ */ e.jsx(be, { indicator: /* @__PURE__ */ e.jsx(ns, { spin: !0 }) }) : f ? /* @__PURE__ */ e.jsx(os, { twoToneColor: "#52c41a" }) : B.id ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(ne, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, Ks = () => {
  const { message: l } = ce.useApp(), { t } = X("system"), { t: a } = X("common"), [s] = o.useForm(), [n, i] = y(null), [d, m] = y(!1), [r] = o.useForm(), [u, p] = y(!1), { data: b } = A(F.system.getSmtpSettingFields), { loading: g } = A(F.system.getSmtpSettings, {
    onSuccess: (v) => {
      s.setFieldsValue(v), p(v.enabled);
    },
    onError: (v) => {
      l.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${v.message}` }));
    }
  });
  Fe(() => {
    i(null);
  }, [d]);
  const { run: O, loading: _ } = A(({ port: v, ...L }) => F.system.updateSmtpSettings({ ...L, port: Number(v) }), {
    manual: !0,
    onSuccess: () => {
      l.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (v) => {
      l.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${v.message}` }));
    }
  }), { run: R, loading: V } = A(async (v) => {
    const { port: L, ...f } = await s.validateFields();
    return await F.system.testSmtpConnection({
      ...v,
      ...f,
      port: Number(L)
    });
  }, {
    onSuccess: (v) => {
      i(v);
    },
    onError: (v) => {
      l.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${v.message}` }));
    },
    manual: !0
  }), M = (v) => {
    switch (v.value_type) {
      case "number":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, disabled: !u, min: v.min, max: v.max, step: v.step });
      case "percentage":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, disabled: !u, min: 0, max: 100, step: v.step || 0.01, addonAfter: "%" });
      case "string_list":
        return /* @__PURE__ */ e.jsx(q, { mode: "tags", tokenSeparators: [","], disabled: !u });
      case "enum":
        return /* @__PURE__ */ e.jsx(q, { disabled: !u, options: v.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(Lt, { theme: "snow", readOnly: !u });
      case "string":
      default:
        return /* @__PURE__ */ e.jsx(k, { disabled: !u });
    }
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(be, { spinning: g, children: /* @__PURE__ */ e.jsxs(
      o,
      {
        form: s,
        layout: "vertical",
        onFinish: O,
        initialValues: {
          port: 587,
          encryption: "STARTTLS"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.enabled", { defaultValue: "Enable SMTP" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { onChange: (v) => p(v) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: u, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !u, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: u, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { type: "number", disabled: !u, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: u, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !u, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(k.Password, { disabled: !u, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: u, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(qe.Group, { disabled: !u, children: [
                /* @__PURE__ */ e.jsx(qe.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(qe.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(qe.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: u, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !u, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(k, { disabled: !u, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.adminEmails", { defaultValue: "Admin Emails" }),
              name: "admin_emails",
              tooltip: t("settings.smtp.adminEmailsTooltip", { defaultValue: "Email addresses that receive admin notifications." }),
              children: /* @__PURE__ */ e.jsx(
                q,
                {
                  mode: "tags",
                  tokenSeparators: [","],
                  disabled: !u,
                  placeholder: t("settings.smtp.adminEmailsPlaceholder", { defaultValue: "Enter email addresses" })
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(dt, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          (b || []).map((v) => /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t(v.label_key || `settings.smtp.${v.key}`, { defaultValue: v.key }),
              name: v.key,
              tooltip: v.tooltip_key ? t(v.tooltip_key, { defaultValue: "" }) : void 0,
              children: M(v)
            },
            v.key
          )),
          /* @__PURE__ */ e.jsxs(o.Item, { children: [
            /* @__PURE__ */ e.jsx(pe, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: _, style: { marginRight: 8 }, children: a("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              E,
              {
                onClick: () => m(!0),
                disabled: !u || V,
                loading: V,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: d,
        onCancel: () => m(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => m(!1), children: a("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(E, { type: "primary", loading: V, onClick: () => r.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: r,
            layout: "vertical",
            onFinish: (v) => R(v),
            children: [
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  label: t("settings.smtp.testEmailRecipient", { defaultValue: "Recipient Email Address" }),
                  name: "to",
                  rules: [
                    { required: !0, message: t("settings.smtp.testEmailRecipientRequired", { defaultValue: "Recipient email address is required." }) },
                    { type: "email", message: t("settings.smtp.testEmailRecipientInvalid", { defaultValue: "Invalid email address." }) }
                  ],
                  children: /* @__PURE__ */ e.jsx(k, { placeholder: "test@example.com" })
                }
              ),
              n && /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: n.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: n.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, Gs = () => {
  const { message: l } = ce.useApp(), { t, i18n: a } = X("system"), { t: s } = X("common"), [n] = o.useForm(), { fetchSiteConfig: i, currentOrgId: d } = ct(), { user: m } = ws(), r = o.useWatch("enable_multi_org", n), u = o.useWatch("default_organization_id", n), p = je(() => {
    var B;
    const f = (B = m == null ? void 0 : m.organizations) == null ? void 0 : B.find((ee) => ee.id === d);
    return f != null && f.name ? `${f.name} (${d})` : d || "";
  }, [m == null ? void 0 : m.organizations, d]), b = je(() => {
    var B;
    const f = (B = m == null ? void 0 : m.organizations) == null ? void 0 : B.find((ee) => ee.id === u);
    return f != null && f.name ? `${f.name} (${u})` : u || "";
  }, [m == null ? void 0 : m.organizations, u]), { loading: g, data: O, refresh: _ } = A(F.system.getSystemBaseSettings, {
    onSuccess: (f) => {
      n.setFieldsValue(f);
    },
    onError: (f) => {
      l.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", f);
    }
  }), { loading: R, run: V } = A(F.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: async () => {
      l.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), _(), await i();
    },
    onError: (f) => {
      l.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", f);
    }
  }), { loading: M, run: v } = A(F.system.clearSiteCache, {
    manual: !0,
    onSuccess: () => {
      l.success(
        t("settings.base.clearSiteCacheSuccess", { defaultValue: "Site cache cleared successfully" })
      );
    },
    onError: (f) => {
      l.error(t("settings.base.clearSiteCacheFailed", { defaultValue: "Failed to clear site cache" })), console.error("Failed to clear site cache", f);
    }
  }), L = (f) => {
    V(f);
  };
  return /* @__PURE__ */ e.jsx(be, { spinning: g, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: n,
      layout: "vertical",
      onFinish: L,
      initialValues: O,
      children: [
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Ct, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", children: /* @__PURE__ */ e.jsx(k, {}) }) })
        }, ..._s.map((f) => ({
          key: f.lang,
          label: a.language !== f.lang ? s(`language.${f.lang}`, { defaultValue: f.label, lang: f.label }) : f.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: ["name_i18n", f.lang], children: /* @__PURE__ */ e.jsx(k, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(k, {}) }),
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(k, {}) }),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", {
              defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab. When disabled, the current organization becomes the default organization."
            }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { name: "default_organization_id", hidden: !0, children: /* @__PURE__ */ e.jsx(k, {}) }),
        !r && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.defaultOrganization", { defaultValue: "Default Organization" }),
            tooltip: t("settings.base.defaultOrganizationTooltip", {
              defaultValue: "Used when multi-organization is disabled. Switching multi-organization off sets this to the currently selected organization."
            }),
            children: /* @__PURE__ */ e.jsx(k, { value: b, disabled: !0 })
          }
        ),
        r && p && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.currentOrganization", { defaultValue: "Current Organization" }),
            tooltip: t("settings.base.currentOrganizationTooltip", {
              defaultValue: "If you disable multi-organization, this organization will become the default organization."
            }),
            children: /* @__PURE__ */ e.jsx(k, { value: p, disabled: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.enableSkillToolBinding", { defaultValue: "Link AI tools to skills" }),
            name: "enable_skill_tool_binding",
            tooltip: t("settings.base.enableSkillToolBindingTooltip", {
              defaultValue: "When enabled, AI chat narrows tools by skill bindings when skills are in scope (still within role AI tool permissions)."
            }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: R,
              icon: /* @__PURE__ */ e.jsx(Ke, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => _(),
              icon: /* @__PURE__ */ e.jsx(we, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(pe, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(
            Xt,
            {
              title: t("settings.base.clearSiteCacheConfirm", {
                defaultValue: "Clear all server-side application caches? Active sessions may need to sign in again."
              }),
              okText: s("ok", { defaultValue: "OK" }),
              cancelText: s("cancel", { defaultValue: "Cancel" }),
              onConfirm: () => v(),
              children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(rs, {}), loading: M, children: t("settings.base.clearSiteCache", { defaultValue: "Clear site cache" }) })
            }
          ) })
        ] }) })
      ]
    }
  ) });
}, Zs = He(() => import("./json-schema-config-form.js").then((l) => ({
  default: l.JsonSchemaConfigFormItem
}))), { TextArea: ht } = k, Xs = () => {
  var x;
  const { message: l } = ce.useApp(), { t } = X("ai"), { t: a } = X("common"), s = ve(), [n] = o.useForm(), [i, d] = y(!1), [m, r] = y(null), [u, p] = y(""), [b, g] = y(""), { loading: O, data: _ } = A(
    () => F.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (c) => {
        l.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", c);
      }
    }
  ), R = je(() => _ == null ? void 0 : _.find((c) => c.provider === b), [_, b]), { loading: V, data: M, refresh: v } = A(
    () => F.ai.listAiModels({ current: 1, page_size: 100, search: u }),
    {
      refreshDeps: [u],
      onError: (c) => {
        l.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", c);
      }
    }
  ), { loading: L, run: f } = A(
    ({ config: c, ...C }) => F.ai.createAiModel({ config: c ?? {}, ...C }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), d(!1), n.resetFields(), v();
      },
      onError: (c) => {
        l.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", c);
      }
    }
  ), { loading: B, run: ee } = A(
    ({ id: c, data: C }) => F.ai.updateAiModel({ id: c }, C),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), d(!1), n.resetFields(), r(null), v();
      },
      onError: (c) => {
        l.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", c);
      }
    }
  ), { runAsync: H } = A(
    (c) => F.ai.deleteAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), v();
      },
      onError: (c) => {
        l.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", c);
      }
    }
  ), { runAsync: ae } = A(
    (c) => F.ai.testAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (c) => {
        l.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", c);
      }
    }
  ), { runAsync: K } = A(
    (c) => F.ai.setDefaultAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), v();
      },
      onError: (c) => {
        l.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", c);
      }
    }
  ), J = () => {
    r(null), g(""), n.resetFields(), d(!0);
  }, w = (c) => {
    r(c), g(c.provider);
    const C = c.config || {}, D = {
      name: c.name,
      description: c.description,
      provider: c.provider,
      is_default: c.is_default,
      config: C,
      // Spread config fields to form
      status: c.status,
      system_prompt: c.system_prompt ?? "",
      max_chat_tokens: c.max_chat_tokens ?? 0,
      max_chat_iterations: c.max_chat_iterations ?? 0
    };
    n.setFieldsValue(D), d(!0);
  }, z = async (c) => {
    r(null), g(c.provider), n.resetFields();
    try {
      const C = await F.ai.getAiModel({ id: c.id }), D = { ...C.config || {} };
      "api_key" in D && (D.api_key = ""), n.setFieldsValue({
        name: `${C.name} (copy)`,
        description: C.description,
        provider: C.provider,
        config: D,
        is_default: !1,
        status: "enabled",
        system_prompt: C.system_prompt ?? "",
        max_chat_tokens: C.max_chat_tokens ?? 0,
        max_chat_iterations: C.max_chat_iterations ?? 0
      }), d(!0);
    } catch {
      l.error(t("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, $ = (c) => {
    g(c), n.setFieldValue("config", void 0);
  }, Q = (c) => {
    const C = c.config ?? {}, D = {
      name: c.name,
      description: c.description,
      provider: c.provider,
      config: C,
      is_default: c.is_default,
      status: c.status,
      system_prompt: c.system_prompt ?? "",
      max_chat_tokens: c.max_chat_tokens ?? 0,
      max_chat_iterations: c.max_chat_iterations ?? 0
    };
    m ? ee({ id: m.id, data: D }) : f(D);
  }, S = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (c, C) => /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx("span", { children: c }),
        C.is_default && /* @__PURE__ */ e.jsx(et, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(ds, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (c) => /* @__PURE__ */ e.jsx(ne, { color: "blue", children: c.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (c) => /* @__PURE__ */ e.jsx(ne, { color: c === "enabled" ? "green" : "red", children: c === "enabled" ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (c, C) => /* @__PURE__ */ e.jsx(Ge, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(us, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => ae(C.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(cs, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => K(C.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => w(C)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(Ft, {}),
          tooltip: t("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => z(C)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(ze, {}),
          tooltip: t("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => H(C.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs($e, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsx(
        k.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          onSearch: (c) => p(c),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(pe, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(It, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(we, {}),
            onClick: v,
            loading: V,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(pe, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Le, {}),
            onClick: J,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx(
      Me,
      {
        columns: S,
        dataSource: (M == null ? void 0 : M.data) || [],
        loading: V,
        rowKey: "id",
        pagination: {
          total: (M == null ? void 0 : M.total) || 0,
          current: (M == null ? void 0 : M.current) || 1,
          pageSize: (M == null ? void 0 : M.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (c, C) => a("pagination.total", {
            defaultValue: `${C[0]}-${C[1]} of ${c} items`,
            start: C[0],
            end: C[1],
            total: c
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: m ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: i,
        onCancel: () => {
          d(!1), n.resetFields(), r(null);
        },
        footer: null,
        width: ((x = R == null ? void 0 : R.ui_schema) == null ? void 0 : x["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: n,
            layout: "vertical",
            onFinish: Q,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "name",
                    label: t("models.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                    children: /* @__PURE__ */ e.jsx(k, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "description",
                    label: t("models.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      ht,
                      {
                        rows: 3,
                        placeholder: t("models.descriptionPlaceholder", { defaultValue: "Enter model description" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "provider",
                    label: t("models.provider", { defaultValue: "Provider" }),
                    rules: [{ required: !0, message: t("models.providerRequired", { defaultValue: "Please select provider" }) }],
                    children: /* @__PURE__ */ e.jsx(
                      q,
                      {
                        loading: O,
                        placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                        onChange: $,
                        value: b,
                        options: _ == null ? void 0 : _.map((c) => ({
                          label: c.name,
                          value: c.provider
                        }))
                      }
                    )
                  }
                ),
                R && /* @__PURE__ */ e.jsx(o.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(We, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(
                  Zs,
                  {
                    name: "config",
                    schema: R.config_schema,
                    uiSchema: R.ui_schema
                  }
                ) }) }),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "system_prompt",
                    label: t("models.systemPrompt", { defaultValue: "System Prompt" }),
                    tooltip: t("models.systemPromptHelp", {
                      defaultValue: "Optional system prompt prepended to every conversation for this model."
                    }),
                    children: /* @__PURE__ */ e.jsx(
                      ht,
                      {
                        rows: 4,
                        placeholder: t("models.systemPromptPlaceholder", {
                          defaultValue: "Enter system prompt (optional)"
                        })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsxs($e, { gutter: 16, children: [
                  /* @__PURE__ */ e.jsx(_e, { span: 12, children: /* @__PURE__ */ e.jsx(
                    o.Item,
                    {
                      name: "max_chat_tokens",
                      label: t("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                      tooltip: t("models.maxChatTokensHelp", {
                        defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) }),
                  /* @__PURE__ */ e.jsx(_e, { span: 12, children: /* @__PURE__ */ e.jsx(
                    o.Item,
                    {
                      name: "max_chat_iterations",
                      label: t("models.maxChatIterations", { defaultValue: "Max chat iterations (tool rounds)" }),
                      tooltip: t("models.maxChatIterationsHelp", {
                        defaultValue: "0 uses default. Positive value caps tool-call iterations for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "is_default",
                    valuePropName: "checked",
                    label: t("models.setAsDefault", { defaultValue: "Set as default model" }),
                    children: /* @__PURE__ */ e.jsx(de, {})
                  }
                ),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(k, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: L || B,
                    children: m ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    onClick: () => {
                      d(!1), n.resetFields(), r(null), g("");
                    },
                    children: a("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    )
  ] });
}, Qs = He(() => import("./json-schema-config-form.js").then((l) => ({
  default: l.JsonSchemaConfigFormItem
}))), { TextArea: Ys } = k, el = () => {
  var ye;
  const { message: l } = ce.useApp(), { t } = X("system"), { t: a } = X("common"), s = ve(), [n] = o.useForm(), [i, d] = y(!1), [m, r] = y(null), [u, p] = y(""), [b, g] = y(!1), [O, _] = y(null), [R, V] = y(""), [M, v] = y(!1), [L, f] = y([]), [B, ee] = y(), [H, ae] = y(null), { loading: K, data: J, refresh: w } = A(
    () => F.system.listToolSets({ current: 1, page_size: 100, search: u, type: B }),
    {
      refreshDeps: [u, B],
      onError: (j) => {
        l.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", j);
      }
    }
  ), { loading: z, data: $ } = A(
    () => F.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (j) => {
        l.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", j);
      }
    }
  ), Q = je(() => $ == null ? void 0 : $.find((j) => j.tool_set_type === R), [$, R]), { loading: S, run: x } = A(
    (j) => F.system.createToolSet({
      ...j,
      type: j.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), d(!1), n.resetFields(), w();
      },
      onError: (j) => {
        l.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", j);
      }
    }
  ), { loading: c, run: C } = A(
    ({ id: j, data: U }) => F.system.updateToolSet({ id: j }, {
      ...U,
      type: U.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), d(!1), n.resetFields(), r(null), w();
      },
      onError: (j) => {
        l.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", j);
      }
    }
  ), { run: D } = A(
    (j) => F.system.deleteToolSet({ id: j }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), w();
      },
      onError: (j) => {
        l.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", j);
      }
    }
  ), { runAsync: Z } = A(
    (j) => F.system.testToolSet({ id: j }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (j) => {
        l.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", j);
      }
    }
  ), { loading: ue, runAsync: Ve } = A(
    (j) => F.system.getToolSetTools({ id: j }),
    {
      manual: !0,
      onSuccess: (j) => {
        f(j || []), v(!0);
      },
      onError: (j) => {
        l.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", j);
      }
    }
  ), Ie = xe(
    async (j, U) => {
      ae(j.id);
      try {
        await F.system.updateToolSetStatus(
          { id: j.id },
          { status: U ? "enabled" : "disabled" }
        ), l.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), w();
      } catch (I) {
        l.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", I);
      } finally {
        ae(null);
      }
    },
    [t, w]
  ), Ae = () => {
    r(null), n.resetFields(), V(""), d(!0);
  }, Ee = (j) => {
    r(j), V(j.type);
    const U = { ...j };
    n.setFieldsValue(U), d(!0);
  }, Te = (j) => {
    V(j), n.setFieldValue("config", {});
  }, Se = (j) => {
    m ? C({ id: m.id, data: j }) : x(j);
  }, Ce = (j) => {
    D(j);
  }, T = (j) => {
    _(j), g(!0);
  }, ie = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (j, U) => /* @__PURE__ */ e.jsxs(G, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: j }),
        U.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (j) => /* @__PURE__ */ e.jsx(ne, { color: "blue", children: j.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      key: "status",
      width: 120,
      render: (j, U) => {
        const I = U.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          pe,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: I ? "green" : "red", children: I ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              et,
              {
                title: I ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: I,
                    loading: H === U.id,
                    onChange: (P) => void Ie(U, P)
                  }
                ) })
              }
            )
          }
        );
      }
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (j, U) => /* @__PURE__ */ e.jsx(Ge, { actions: [
        {
          key: "debug",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.debug", { defaultValue: "Debug Tool" }),
          icon: /* @__PURE__ */ e.jsx(It, {}),
          disabled: U.status !== "enabled",
          onClick: async () => s(`/system/settings/toolsets/${U.id}/debug`)
        },
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(ms, {}),
          disabled: U.status !== "enabled",
          onClick: async () => Z(U.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(ot, {}),
          permission: "system:toolsets:view",
          disabled: U.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => Ve(U.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(ps, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => T(U.config),
          disabled: !U.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: U.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          onClick: async () => Ee(U),
          disabled: !!U.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(ze, {}),
          permission: "system:toolsets:delete",
          tooltip: U.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : a("delete", { defaultValue: "Delete" }),
          onClick: async () => Ce(U.id),
          danger: !0,
          disabled: !!U.is_preset,
          confirm: U.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => Ce(U.id),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs($e, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(
          k.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            onSearch: (j) => p(j),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          q,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: B,
            onChange: (j) => ee(j),
            options: $ == null ? void 0 : $.map((j) => ({
              label: j.name,
              value: j.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "", children: "All" }),
              $ == null ? void 0 : $.map((j) => /* @__PURE__ */ e.jsx(q.Option, { value: j.tool_set_type, children: j.name }, j.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(we, {}),
            onClick: w,
            loading: K,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Le, {}),
            onClick: Ae,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx(
      Me,
      {
        columns: ie,
        dataSource: (J == null ? void 0 : J.data) || [],
        loading: K,
        rowKey: "id",
        pagination: {
          total: (J == null ? void 0 : J.total) || 0,
          current: (J == null ? void 0 : J.current) || 1,
          pageSize: (J == null ? void 0 : J.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (j, U) => a("pagination.total", {
            defaultValue: `${U[0]}-${U[1]} of ${j} items`,
            start: U[0],
            end: U[1],
            total: j
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: m ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: i,
        onCancel: () => {
          d(!1), n.resetFields(), r(null), V("");
        },
        footer: null,
        width: ((ye = Q == null ? void 0 : Q.ui_schema) == null ? void 0 : ye["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: n,
            layout: "vertical",
            onFinish: Se,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "name",
                    label: t("settings.toolsets.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                    children: /* @__PURE__ */ e.jsx(k, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "description",
                    label: t("settings.toolsets.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      Ys,
                      {
                        rows: 3,
                        placeholder: t("settings.toolsets.descriptionPlaceholder", { defaultValue: "Enter toolset description" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "type",
                    label: t("settings.toolsets.type", { defaultValue: "Type" }),
                    rules: [{ required: !0, message: t("settings.toolsets.typeRequired", { defaultValue: "Please select type" }) }],
                    children: /* @__PURE__ */ e.jsx(
                      q,
                      {
                        loading: z,
                        placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                        onChange: Te,
                        value: R,
                        options: $ == null ? void 0 : $.map((j) => ({
                          label: j.name,
                          value: j.tool_set_type
                        }))
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(We, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(
                  Qs,
                  {
                    name: "config",
                    schema: Q == null ? void 0 : Q.config_schema,
                    uiSchema: Q == null ? void 0 : Q.ui_schema
                  }
                ) }),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(k, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: S || c,
                    children: m ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    onClick: () => {
                      d(!1), n.resetFields(), r(null), V("");
                    },
                    children: a("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: b,
        onCancel: () => g(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => g(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(O, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: M,
        onCancel: () => v(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => v(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: ue ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(we, { style: { fontSize: 24 }, spin: !0 }) }) : L.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : L.map((j, U) => {
          var I, P, te;
          return /* @__PURE__ */ e.jsx(
            le,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(G, { children: [
                /* @__PURE__ */ e.jsx(ot, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((I = j.function) == null ? void 0 : I.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs($e, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(_e, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((P = j.function) == null ? void 0 : P.description) || "-" })
                ] }),
                ((te = j.function) == null ? void 0 : te.parameters) && /* @__PURE__ */ e.jsxs(_e, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(j.function.parameters, null, 2) })
                ] })
              ] })
            },
            U
          );
        }) })
      }
    )
  ] });
}, { TextArea: xt } = k;
function tl(l, t) {
  const a = {}, s = [], n = new Map(t.map((i) => [i.id, i]));
  for (const i of l) {
    if (i.toolset_id === "*") {
      s.push({ toolset_id: i.toolset_id, tool_name: i.tool_name });
      continue;
    }
    const d = n.get(i.toolset_id);
    if (!d) {
      s.push({ toolset_id: i.toolset_id, tool_name: i.tool_name });
      continue;
    }
    const m = (d.tools || []).map((r) => r.name);
    if (i.tool_name === "*") {
      a[i.toolset_id] = [...m];
      continue;
    }
    m.includes(i.tool_name) ? (a[i.toolset_id] || (a[i.toolset_id] = []), a[i.toolset_id].includes(i.tool_name) || a[i.toolset_id].push(i.tool_name)) : s.push({ toolset_id: i.toolset_id, tool_name: i.tool_name });
  }
  return { selections: a, extraPatterns: s };
}
function sl(l, t) {
  const a = [], s = /* @__PURE__ */ new Set();
  for (const [n, i] of Object.entries(l))
    for (const d of i) {
      const m = `${n}|${d}`;
      s.has(m) || (s.add(m), a.push({ toolset_id: n, tool_name: d }));
    }
  for (const n of t) {
    const i = n.toolset_id.trim(), d = n.tool_name.trim();
    if (!i || !d)
      continue;
    const m = `${i}|${d}`;
    s.has(m) || (s.add(m), a.push({ toolset_id: i, tool_name: d }));
  }
  return a;
}
function Ut(l, t) {
  const a = t.trim();
  return !a || l.some((s) => s.value === a) ? l : [...l, { value: a, label: a }];
}
function ll(l, t, a, s) {
  const i = [{ value: "*", label: s }], d = /* @__PURE__ */ new Set(["*"]), m = (r, u) => {
    d.has(r) || (d.add(r), i.push({
      value: r,
      label: u ? `${r} — ${u}` : r
    }));
  };
  if (t && t !== "*") {
    const r = l.find((u) => u.id === t);
    for (const u of (r == null ? void 0 : r.tools) || [])
      m(u.name, u.description);
  } else
    for (const r of l)
      for (const u of r.tools || [])
        m(u.name, u.description);
  return Ut(i, a);
}
const al = () => {
  const { message: l } = ce.useApp(), { t } = X("system"), { t: a } = X("common"), s = ve(), { enableSkillToolBinding: n } = ct(), [i] = o.useForm(), [d, m] = y(""), [r, u] = y(), [p, b] = y("user"), [g, O] = y(!1), [_, R] = y(null), [V, M] = y(null), [v, L] = y(!1), [f] = o.useForm(), [B, ee] = y(!1), [H, ae] = y(null), [K, J] = y([]), [w, z] = y({}), [$, Q] = y([]), [S, x] = y(!1), c = je(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...K.map((h) => ({
      value: h.id,
      label: `${h.name} (${h.id})`
    }))
  ], [K, t]), C = xe(() => {
    J([]), z({}), Q([]);
  }, []), { loading: D, data: Z, refresh: ue } = A(
    () => F.system.listSkills({
      current: 1,
      page_size: 100,
      search: d || void 0,
      domain: r,
      is_preset: p === "user" ? !1 : void 0
    }),
    {
      refreshDeps: [d, r, p],
      onError: () => {
        l.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: Ve = [] } = A(() => F.system.listSkillDomains()), Ie = (Z == null ? void 0 : Z.data) || [], Ae = (Z == null ? void 0 : Z.total) || 0, { run: Ee } = A(
    (h) => F.system.deleteSkill({ id: h }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), ue();
      },
      onError: () => {
        l.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), Te = xe(
    async (h, N) => {
      ae(h.id);
      try {
        await F.system.updateSkillStatus({ id: h.id }, { status: N ? "enabled" : "disabled" }), l.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), ue();
      } catch {
        l.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        ae(null);
      }
    },
    [t, ue]
  ), { loading: Se, run: Ce } = A(
    (h) => F.system.uploadSkill(h.body, h.file),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), L(!1), f.resetFields(), ue();
      },
      onError: () => {
        l.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), T = xe(
    async (h) => {
      var N;
      x(!0);
      try {
        const [W, re] = await Promise.all([
          F.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          F.system.listSkillAiToolBindings(
            { id: h, current: 1, page_size: 1e3 }
          )
        ]), Y = ((N = W.data) == null ? void 0 : N.filter((Kt) => Kt.status === "enabled")) || [];
        J(Y);
        const { selections: se, extraPatterns: Ue } = tl(re.data || [], Y);
        z(se), Q(Ue);
      } catch {
        l.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), C();
      } finally {
        x(!1);
      }
    },
    [C, t]
  );
  Fe(() => {
    !g || !(_ != null && _.id) || !n || T(_.id);
  }, [g, _ == null ? void 0 : _.id, n, T]);
  const ie = (h, N) => {
    z((W) => ({ ...W, [h]: N }));
  }, ye = (h, N, W) => {
    z((re) => ({
      ...re,
      [h]: W ? [...N] : []
    }));
  }, j = () => {
    R(null), M(null), i.resetFields(), C(), O(!0);
  }, U = (h) => {
    R(h), M(null), i.setFieldsValue({
      name: h.name,
      description: h.description,
      category: h.category,
      domain: h.domain
    }), C(), O(!0);
  }, I = (h) => {
    R(null), M(h), i.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: h.name, defaultValue: "{{name}} (copy)" }),
      description: h.description,
      category: h.category,
      domain: h.domain
    }), C(), O(!0);
  }, P = () => {
    i.validateFields().then(async (h) => {
      ee(!0);
      try {
        if (_) {
          const N = {
            name: h.name,
            description: h.description ?? "",
            category: h.category ?? "",
            domain: h.domain ?? ""
          };
          if (await F.system.updateSkill({ id: _.id }, N), n) {
            const W = sl(w, $);
            await F.system.replaceSkillAiToolBindings(
              { id: _.id },
              { bindings: W }
            );
          }
          l.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (V) {
          const N = {
            source_id: V.id,
            name: h.name,
            description: h.description ?? "",
            category: h.category ?? "",
            domain: h.domain ?? ""
          }, { id: W } = await F.system.cloneSkill(N);
          l.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), O(!1), M(null), i.resetFields(), C(), ue(), W && s(`/system/settings/skills/${W}/edit`);
          return;
        } else {
          const N = {
            name: h.name,
            description: h.description ?? "",
            category: h.category ?? "",
            domain: h.domain ?? "",
            content: h.content ?? ""
          };
          await F.system.createSkill(N), l.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        O(!1), R(null), M(null), i.resetFields(), C(), ue();
      } catch {
        l.error(
          _ ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : V ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        ee(!1);
      }
    });
  }, te = () => {
    var Y, se;
    const h = (Y = f.getFieldValue("file")) == null ? void 0 : Y.fileList, N = ((se = h == null ? void 0 : h[0]) == null ? void 0 : se.originFileObj) ?? (h == null ? void 0 : h[0]);
    if (!N) {
      l.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const W = f.getFieldValue("category"), re = f.getFieldValue("domain");
    Ce({ body: { category: W, domain: re }, file: N });
  }, ge = n && _, Ze = ge ? 720 : 560, Wt = !_ && !V, Ht = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (h, N) => /* @__PURE__ */ e.jsxs(G, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: h }),
        N.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (h) => h ? /* @__PURE__ */ e.jsx(ne, { children: h }) : "-", width: 180 },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (h) => h ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: h }) : "-", width: 180 },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (h, N) => {
        const W = N.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          pe,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: W ? "green" : "red", children: W ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              et,
              {
                title: W ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: W,
                    loading: H === N.id,
                    onChange: (re) => void Te(N, re)
                  }
                ) })
              }
            )
          }
        );
      }
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 220,
      render: (h, N) => /* @__PURE__ */ e.jsx(
        Ge,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(Xe, {}),
              tooltip: N.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => s(`/system/settings/skills/${N.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!N.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(At, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => s(`/system/settings/skills/${N.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              tooltip: N.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => U(N),
              permission: "system:skills:update",
              disabled: !!N.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(Ft, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => I(N),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(ze, {}),
              tooltip: N.is_preset ? t("settings.skills.presetDisabledDelete", {
                defaultValue: "Built-in skills cannot be deleted."
              }) : t("settings.skills.actionDelete", { defaultValue: "Delete" }),
              danger: !0,
              disabled: !!N.is_preset,
              confirm: N.is_preset ? void 0 : {
                title: t("settings.skills.deleteSkillConfirm", { defaultValue: "Delete this skill?" }),
                description: t("settings.skills.deleteSkillConfirmDescription", {
                  defaultValue: "The skill and all its files will be removed. This cannot be undone."
                }),
                okText: a("confirm", { defaultValue: "Confirm" }),
                cancelText: a("cancel", { defaultValue: "Cancel" }),
                onConfirm: async () => Ee(N.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs($e, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(
          k.Search,
          {
            placeholder: a("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: m,
            style: { width: 300 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          q,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: r,
            onChange: u,
            options: Ve.map((h) => ({ value: h, label: h }))
          }
        ),
        /* @__PURE__ */ e.jsx(
          qe.Group,
          {
            optionType: "button",
            value: p,
            onChange: (h) => b(h.target.value),
            options: [
              { value: "user", label: t("settings.skills.scopeUser", { defaultValue: "User skills" }) },
              { value: "all", label: t("settings.skills.scopeAll", { defaultValue: "All skills" }) }
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(we, {}), onClick: () => ue(), children: a("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Le, {}), onClick: j, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ft, {}), onClick: () => L(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(le, { children: [
      /* @__PURE__ */ e.jsx(
        Me,
        {
          rowKey: "id",
          loading: D,
          columns: Ht,
          dataSource: Ie,
          pagination: { total: Ae, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        fe,
        {
          title: _ ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : V ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: g,
          onOk: P,
          onCancel: () => {
            O(!1), R(null), M(null), C();
          },
          confirmLoading: B,
          width: Ze,
          children: /* @__PURE__ */ e.jsxs(o, { form: i, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(k, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(xt, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(k, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(q, { allowClear: !0, placeholder: a("optional", { defaultValue: "Optional" }), options: Ve.map((h) => ({ value: h, label: h })) }) }),
            Wt && /* @__PURE__ */ e.jsx(o.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(xt, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            ge && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(be, { spinning: S, children: K.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(G, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: K.map((h) => {
                const N = (h.tools || []).map((se) => se.name), W = w[h.id] || [], re = N.length > 0 && W.length === N.length, Y = W.length > 0 && W.length < N.length;
                return /* @__PURE__ */ e.jsx(
                  le,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        lt,
                        {
                          checked: re,
                          indeterminate: Y,
                          onChange: (se) => ye(h.id, N, se.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: h.name })
                    ] }),
                    extra: h.description ? /* @__PURE__ */ e.jsx("span", { children: h.description }) : void 0,
                    children: (h.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(lt.Group, { style: { width: "100%" }, value: W, onChange: (se) => ie(h.id, se), children: /* @__PURE__ */ e.jsx(G, { direction: "vertical", style: { width: "100%" }, children: (h.tools || []).map((se) => /* @__PURE__ */ e.jsx(lt, { value: se.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("div", { children: se.name }),
                      se.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: se.description })
                    ] }) }, se.name)) }) }) : /* @__PURE__ */ e.jsx(
                      Re,
                      {
                        image: Re.PRESENTED_IMAGE_SIMPLE,
                        description: t("settings.skills.aiToolsetNoTools", { defaultValue: "No tools available in this toolset." })
                      }
                    )
                  },
                  h.id
                );
              }) }),
              /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 12 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: t("settings.skills.wildcardPatterns", { defaultValue: "Wildcard patterns (optional)" }) }),
                /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12, marginBottom: 8 }, children: t("settings.skills.wildcardPatternsHelp", {
                  defaultValue: "Use * for toolset_id or tool_name (e.g. *:sleep for all toolsets, uuid:* for all tools in one toolset)."
                }) }),
                /* @__PURE__ */ e.jsxs(G, { direction: "vertical", style: { width: "100%" }, children: [
                  $.map((h, N) => /* @__PURE__ */ e.jsxs(
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
                          pt,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                            value: h.toolset_id,
                            options: Ut(c, h.toolset_id),
                            filterOption: (W, re) => {
                              const Y = re;
                              return `${(Y == null ? void 0 : Y.value) ?? ""} ${(Y == null ? void 0 : Y.label) ?? ""}`.toLowerCase().includes(W.toLowerCase());
                            },
                            onChange: (W) => {
                              const re = typeof W == "string" ? W : "";
                              Q(
                                (Y) => Y.map((se, Ue) => Ue === N ? { ...se, toolset_id: re } : se)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          pt,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                            value: h.tool_name,
                            options: ll(
                              K,
                              h.toolset_id,
                              h.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: (W, re) => {
                              const Y = re;
                              return `${(Y == null ? void 0 : Y.value) ?? ""} ${(Y == null ? void 0 : Y.label) ?? ""}`.toLowerCase().includes(W.toLowerCase());
                            },
                            onChange: (W) => {
                              const re = typeof W == "string" ? W : "";
                              Q(
                                (Y) => Y.map((se, Ue) => Ue === N ? { ...se, tool_name: re } : se)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          E,
                          {
                            type: "default",
                            danger: !0,
                            style: { flexShrink: 0 },
                            onClick: () => Q((W) => W.filter((re, Y) => Y !== N)),
                            children: a("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    N
                  )),
                  /* @__PURE__ */ e.jsx(E, { type: "dashed", onClick: () => Q((h) => [...h, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
                ] })
              ] })
            ] }) : /* @__PURE__ */ e.jsx(
              Re,
              {
                image: Re.PRESENTED_IMAGE_SIMPLE,
                description: t("settings.skills.aiToolsetsEmpty", { defaultValue: "No AI toolsets available for this organization." })
              }
            ) }) })
          ] })
        }
      ),
      /* @__PURE__ */ e.jsx(
        fe,
        {
          title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
          open: v,
          onOk: te,
          onCancel: () => L(!1),
          confirmLoading: Se,
          children: /* @__PURE__ */ e.jsxs(o, { form: f, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(Qt, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ft, {}), children: a("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(k, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(q, { allowClear: !0, placeholder: a("optional", { defaultValue: "Optional" }), options: Ve.map((h) => ({ value: h, label: h })) }) })
          ] })
        }
      )
    ] })
  ] });
}, il = () => {
  const { message: l } = ce.useApp(), t = ve(), { t: a } = X("system"), { t: s } = X("task"), { t: n } = X("common"), [i] = o.useForm(), { data: d } = A(F.system.listLogStorageBackends), { data: m } = A(F.system.getTaskSettingFields), r = (d ?? []).map((V) => ({
    value: V.id,
    label: a(`settings.task.logStorage.${V.id}`, { defaultValue: V.name })
  })), { loading: u, refresh: p } = A(F.system.getTaskSettings, {
    onSuccess: (V) => {
      V && i.setFieldsValue(V);
    },
    onError: () => {
      l.error(a("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: b, run: g } = A(F.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      l.success(a("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), p();
    },
    onError: () => {
      l.error(a("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), O = (V) => {
    g(V);
  }, _ = (V) => {
    switch (V.value_type) {
      case "int":
      case "number":
        return /* @__PURE__ */ e.jsx(
          me,
          {
            style: { width: "100%" },
            addonAfter: V.key.includes("retention_days") ? a("settings.days", { defaultValue: "Days" }) : void 0
          }
        );
      case "percentage":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, min: 0, max: 100, step: 0.01, addonAfter: "%" });
      case "bool":
        return /* @__PURE__ */ e.jsx(de, {});
      case "string_list":
        return /* @__PURE__ */ e.jsx(q, { mode: "tags", tokenSeparators: [","] });
      case "enum":
        return /* @__PURE__ */ e.jsx(q, { options: V.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(Lt, { theme: "snow" });
      default:
        return /* @__PURE__ */ e.jsx(k, {});
    }
  }, R = (V) => V.value_type === "int" || V.value_type === "number" || V.value_type === "percentage" ? [{ type: "number" }] : [];
  return /* @__PURE__ */ e.jsx(be, { spinning: u, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: i,
      layout: "vertical",
      onFinish: O,
      children: [
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "log_storage_backend",
            label: a("settings.task.logStorageBackend", { defaultValue: "Log storage" }),
            tooltip: a("settings.task.logStorageBackendTooltip", {
              defaultValue: "Where task execution logs are stored. Database stores logs in the application database."
            }),
            children: /* @__PURE__ */ e.jsx(
              q,
              {
                options: r,
                placeholder: a("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: d === void 0
              }
            )
          }
        ),
        (m ?? []).map((V) => /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: V.key,
            label: a(`settings.task.fields.${V.key}`, { defaultValue: V.key }),
            rules: R(V),
            valuePropName: V.value_type === "bool" ? "checked" : "value",
            children: _(V)
          },
          V.key
        )),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: b, icon: /* @__PURE__ */ e.jsx(Ke, {}), children: n("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(E, { onClick: () => p(), icon: /* @__PURE__ */ e.jsx(we, {}), children: n("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Et, {}), onClick: () => t("/tasks"), children: s("listTitle", { defaultValue: "Task List" }) }),
          /* @__PURE__ */ e.jsx(pe, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(fs, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: nl } = k, ol = /^[-_a-zA-Z0-9.]+$/, rl = () => {
  const { message: l, modal: t } = ce.useApp(), a = ve(), { t: s, i18n: n } = X("system"), { t: i } = X("common"), d = (S) => {
    if (!S) return "-";
    const x = new Date(S);
    return Number.isNaN(x.getTime()) ? "-" : x.toLocaleString(n.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [m] = o.useForm(), [r, u] = y(!1), [p, b] = y(null), [g, O] = y(""), [_, R] = y(1), [V, M] = y(10), { loading: v, data: L, refresh: f } = A(
    () => Fs({ current: _, page_size: V, search: g }),
    {
      refreshDeps: [_, V, g],
      onError: (S) => {
        l.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", S);
      }
    }
  ), { loading: B, run: ee } = A(
    (S) => Is(S),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), u(!1), m.resetFields(), b(null), f();
      },
      onError: (S) => {
        l.error((S == null ? void 0 : S.err) || s("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: H, run: ae } = A(
    ({ id: S, ...x }) => As({ id: S }, x),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), u(!1), m.resetFields(), b(null), f();
      },
      onError: (S) => {
        l.error((S == null ? void 0 : S.err) || s("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: K } = A(
    (S) => Es({ id: S }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), f();
      },
      onError: (S) => {
        l.error((S == null ? void 0 : S.err) || s("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), J = () => {
    b(null), m.resetFields(), m.setFieldsValue({ status: "active" }), u(!0);
  }, w = (S) => {
    b(S), m.setFieldsValue({
      name: S.name,
      slug: S.slug,
      description: S.description,
      status: S.status
    }), u(!0);
  }, z = (S) => {
    t.confirm({
      title: s("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: s("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${S.name}"? This action cannot be undone.`
      }),
      onOk: () => K(S.id)
    });
  }, $ = () => {
    m.validateFields().then((S) => {
      p ? ae({ id: p.id, ...S }) : ee(S);
    });
  }, Q = [
    {
      title: s("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: s("settings.organizations.slug", { defaultValue: "Slug" }),
      dataIndex: "slug",
      key: "slug",
      render: (S) => S || "-"
    },
    {
      title: s("settings.organizations.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: s("settings.organizations.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (S) => /* @__PURE__ */ e.jsx(ne, { color: S === "active" ? "green" : "default", children: S === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("settings.organizations.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (S) => d(S)
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (S, x) => /* @__PURE__ */ e.jsx(
        Ge,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(At, {}),
              onClick: async () => a(`/system/settings/organizations/${x.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              onClick: async () => w(x),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(ze, {}),
              danger: !0,
              onClick: async () => z(x),
              permission: "system:organization:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    le,
    {
      title: s("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(we, {}), onClick: f, children: i("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Le, {}), onClick: J, children: s("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(G, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            k.Search,
            {
              placeholder: s("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (S) => {
                O(S), R(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Me,
            {
              columns: Q,
              dataSource: (L == null ? void 0 : L.data) || [],
              loading: v,
              rowKey: "id",
              pagination: {
                current: _,
                pageSize: V,
                total: (L == null ? void 0 : L.total) || 0,
                showSizeChanger: !0,
                showTotal: (S, x) => i("pagination.total", {
                  defaultValue: `${x[0]}-${x[1]} of ${S} items`,
                  start: x[0],
                  end: x[1],
                  total: S
                }),
                onChange: (S, x) => {
                  R(S), M(x);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          fe,
          {
            title: p ? s("settings.organizations.edit", { defaultValue: "Edit Organization" }) : s("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: r,
            onOk: $,
            onCancel: () => {
              u(!1), m.resetFields(), b(null);
            },
            confirmLoading: B || H,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(o, { form: m, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "name",
                  label: s("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: s("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(k, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "slug",
                  label: s("settings.organizations.slug", { defaultValue: "Slug" }),
                  tooltip: s("settings.organizations.slugTooltip", { defaultValue: "Optional unique identifier. Only letters, digits, hyphens, underscores, and dots are allowed." }),
                  rules: [{
                    pattern: ol,
                    message: s("settings.organizations.slugInvalid", { defaultValue: "Slug may only contain letters, digits, hyphens, underscores, and dots" })
                  }],
                  children: /* @__PURE__ */ e.jsx(k, { placeholder: "my-org" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "description",
                  label: s("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(nl, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "status",
                  label: s("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs(q, { children: [
                    /* @__PURE__ */ e.jsx(q.Option, { value: "active", children: s("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(q.Option, { value: "disabled", children: s("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, dl = ({
  transformItems: l = (t) => t
}) => {
  const { t } = X("system"), a = ve(), s = Ts(), d = s.hash.replace("#", "") || "base", { enableMultiOrg: m } = ct(), { hasPermission: r } = Cs(), u = [
    {
      key: "base",
      label: t("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(Gs, {}),
      hidden: !r("system:settings:update")
    },
    {
      key: "security",
      label: t("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(Js, {}),
      hidden: !r("system:security:update")
    },
    {
      key: "oauth",
      label: t("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Bs, {}),
      hidden: !r("system:settings:update")
    },
    {
      key: "ldap",
      label: t("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Hs, {}),
      hidden: !r("system:settings:update")
    },
    {
      key: "smtp",
      label: t("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(Ks, {}),
      hidden: !r("system:settings:update")
    },
    {
      key: "ai-models",
      label: t("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(Xs, {}),
      hidden: !r("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: t("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(el, {}),
      hidden: !r("system:toolsets:view")
    },
    {
      key: "skills",
      label: t("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(al, {}),
      hidden: !r("system:skills:view")
    },
    {
      key: "task",
      label: t("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(il, {}),
      hidden: !r("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...m ? [{
      key: "organizations",
      label: t("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(rl, {}),
      hidden: !r("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(le, { title: t("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    Ct,
    {
      defaultActiveKey: d,
      onChange: (p) => {
        a(`${s.pathname}#${p}`);
      },
      items: l(u.filter((p) => !p.hidden), t)
    }
  ) });
}, ea = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dl
}, Symbol.toStringTag, { value: "Module" })), ul = () => {
  var Te, Se, Ce;
  const { message: l, modal: t } = ce.useApp(), a = ve(), { id: s } = st(), { t: n } = X("system"), { t: i } = X("common"), [d] = o.useForm(), [m] = o.useForm(), [r, u] = y(!1), [p, b] = y(!1), [g, O] = y(null), [_, R] = y(""), [V, M] = y(1), [v, L] = y(10), { data: f, loading: B, refresh: ee } = A(
    () => zs({ id: s }),
    {
      ready: !!s,
      onError: (T) => {
        l.error(n("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", T);
      }
    }
  ), { data: H, loading: ae, refresh: K } = A(
    () => Os({ id: s, current: V, page_size: v, search: _ }),
    {
      ready: !!s,
      refreshDeps: [s, V, v, _],
      onError: (T) => {
        l.error(n("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", T);
      }
    }
  ), { data: J, loading: w } = A(
    () => Ns({ current: 1, page_size: 1e3 }),
    {
      ready: r
    }
  ), { data: z, loading: $ } = A(
    () => Ls({ organization_id: s, current: 1, page_size: 1e3 }),
    {
      ready: !!s
    }
  ), { loading: Q, run: S } = A(
    (T) => Ps({ id: s }, T),
    {
      manual: !0,
      onSuccess: () => {
        l.success(n("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), u(!1), d.resetFields(), K();
      },
      onError: (T) => {
        l.error((T == null ? void 0 : T.err) || n("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: x, run: c } = A(
    (T) => Rs({ id: s, user_id: g.id }, T),
    {
      manual: !0,
      onSuccess: () => {
        l.success(n("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), b(!1), m.resetFields(), O(null), K();
      },
      onError: (T) => {
        l.error((T == null ? void 0 : T.err) || n("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: C } = A(
    (T) => Ms({ id: s, user_id: T }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(n("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), K();
      },
      onError: (T) => {
        l.error((T == null ? void 0 : T.err) || n("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), D = () => {
    u(!0), d.resetFields();
  }, Z = (T) => {
    var ie;
    O(T), m.setFieldsValue({
      role_ids: ((ie = T.organization_roles) == null ? void 0 : ie.map((ye) => ye.id)) || []
    }), b(!0);
  }, ue = (T) => {
    t.confirm({
      title: n("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: n("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${T.full_name || T.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => C(T.id)
    });
  }, Ve = () => {
    d.validateFields().then((T) => {
      S(T);
    });
  }, Ie = () => {
    m.validateFields().then((T) => {
      c(T);
    });
  }, Ae = ((Te = J == null ? void 0 : J.data) == null ? void 0 : Te.filter((T) => {
    var ie;
    return !((ie = H == null ? void 0 : H.data) != null && ie.some((ye) => ye.id === T.id));
  })) || [], Ee = [
    {
      title: n("settings.organizations.users.username", { defaultValue: "Username" }),
      dataIndex: "username",
      key: "username"
    },
    {
      title: n("settings.organizations.users.email", { defaultValue: "Email" }),
      dataIndex: "email",
      key: "email"
    },
    {
      title: n("settings.organizations.users.fullName", { defaultValue: "Full Name" }),
      dataIndex: "full_name",
      key: "full_name"
    },
    {
      title: n("settings.organizations.users.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (T) => /* @__PURE__ */ e.jsx(ne, { color: T === "active" ? "green" : "default", children: T === "active" ? n("settings.organizations.active", { defaultValue: "Active" }) : T })
    },
    {
      title: n("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (T, ie) => {
        var ye;
        return /* @__PURE__ */ e.jsx(G, { wrap: !0, children: ((ye = ie.organization_roles) == null ? void 0 : ye.map((j) => /* @__PURE__ */ e.jsx(ne, { children: j.name }, j.id))) || /* @__PURE__ */ e.jsx(ne, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (T, ie) => /* @__PURE__ */ e.jsx(
        Ge,
        {
          actions: [
            {
              key: "edit",
              label: n("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              onClick: async () => Z(ie)
            },
            {
              key: "delete",
              label: n("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(ze, {}),
              danger: !0,
              onClick: async () => ue(ie)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      le,
      {
        title: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              icon: /* @__PURE__ */ e.jsx(ut, {}),
              onClick: () => a("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            n("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            f == null ? void 0 : f.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(we, {}), onClick: () => {
          ee(), K();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: B,
        children: /* @__PURE__ */ e.jsxs(oe, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(oe.Item, { label: n("settings.organizations.name", { defaultValue: "Name" }), children: f == null ? void 0 : f.name }),
          /* @__PURE__ */ e.jsx(oe.Item, { label: n("settings.organizations.slug", { defaultValue: "Slug" }), children: (f == null ? void 0 : f.slug) || "-" }),
          /* @__PURE__ */ e.jsx(oe.Item, { label: n("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: (f == null ? void 0 : f.status) === "active" ? "green" : "default", children: (f == null ? void 0 : f.status) === "active" ? n("settings.organizations.active", { defaultValue: "Active" }) : n("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(oe.Item, { label: n("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (f == null ? void 0 : f.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      le,
      {
        title: n("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Le, {}), onClick: D, children: n("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(G, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            k.Search,
            {
              placeholder: n("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (T) => {
                R(T), M(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Me,
            {
              columns: Ee,
              dataSource: (H == null ? void 0 : H.data) || [],
              loading: ae,
              rowKey: "id",
              pagination: {
                current: V,
                pageSize: v,
                total: (H == null ? void 0 : H.total) || 0,
                showSizeChanger: !0,
                showTotal: (T) => i("pagination.total", { defaultValue: `Total ${T} items` }),
                onChange: (T, ie) => {
                  M(T), L(ie);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: n("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: r,
        onOk: Ve,
        onCancel: () => {
          u(!1), d.resetFields();
        },
        confirmLoading: Q,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: d, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "user_id",
              label: n("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: n("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                q,
                {
                  showSearch: !0,
                  placeholder: n("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: w,
                  filterOption: (T, ie) => ((ie == null ? void 0 : ie.label) ?? "").toLowerCase().includes(T.toLowerCase()),
                  options: Ae.map((T) => ({
                    label: `${T.full_name || T.username} (${T.email})`,
                    value: T.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "role_ids",
              label: n("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                q,
                {
                  mode: "multiple",
                  placeholder: n("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: $,
                  options: ((Se = z == null ? void 0 : z.data) == null ? void 0 : Se.map((T) => ({
                    label: T.name,
                    value: T.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: n("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: p,
        onOk: Ie,
        onCancel: () => {
          b(!1), m.resetFields(), O(null);
        },
        confirmLoading: x,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: m, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: n("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                k,
                {
                  value: (g == null ? void 0 : g.full_name) || (g == null ? void 0 : g.username),
                  disabled: !0
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "role_ids",
              label: n("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                q,
                {
                  mode: "multiple",
                  placeholder: n("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: $,
                  options: ((Ce = z == null ? void 0 : z.data) == null ? void 0 : Ce.map((T) => ({
                    label: T.name,
                    value: T.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ul
}, Symbol.toStringTag, { value: "Module" })), cl = He(() => import("./markdown-viewer.js")), ml = mt(({ css: l }) => ({
  fileTree: l`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `,
  editorSpin: l`
    flex: 1;
    display: flex;
    min-height: 0;
    min-width: 0;
    .ant-spin-container{
      display: flex;
      flex: 1;
      min-height: 0;
      min-width: 0;
    }
    `
})), { TextArea: yt } = k, pl = (l) => l.toLowerCase().endsWith(".md");
function qt(l) {
  return l.map((t) => {
    var a;
    return {
      key: t.path,
      title: t.name,
      isLeaf: !t.is_dir,
      icon: t.is_dir ? /* @__PURE__ */ e.jsx(zt, {}) : /* @__PURE__ */ e.jsx(Ot, {}),
      children: (a = t.children) != null && a.length ? qt(t.children) : void 0
    };
  });
}
function at(l) {
  return l.includes("/") ? l.replace(/\/[^/]+$/, "") : "";
}
const fl = () => {
  const { message: l, modal: t } = ce.useApp(), { styles: a } = ml(), { id: s } = st(), n = ve(), { t: i } = X("system"), [d, m] = y(null), [r, u] = y(null), [p, b] = y(!1), [g, O] = y(""), [_, R] = y(!1), [V, M] = y([]), [v, L] = y(!1), [f, B] = y(!1), [ee, H] = y(""), [ae] = o.useForm(), [K, J] = y(null), [w, z] = y(null), [$, Q] = y(""), [S] = o.useForm(), { data: x } = A(
    () => s ? F.system.getSkill({ id: s }) : Promise.reject(new Error("No id")),
    { refreshDeps: [s], ready: !!s }
  ), { data: c, loading: C, refresh: D } = A(
    () => s ? F.system.listSkillFilesTree({ id: s }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [s],
      ready: !!s,
      onSuccess: (I) => {
        if (!d) {
          for (const P of I)
            if (!P.is_dir && P.name === "SKILL.md") {
              u(P.path), m(P.path), b(!1);
              return;
            }
          for (const P of I)
            if (!P.is_dir && P.name === "SKILLS.md") {
              u(P.path), m(P.path), b(!1);
              return;
            }
        }
      }
    }
  ), Z = !!(x != null && x.is_preset), ue = je(() => qt(c || []), [c]), Ve = p && r ? r : d ? at(d) : "", { loading: Ie } = A(() => !s || !d ? Promise.reject(new Error("No id or selected file")) : F.system.getSkillFile({ id: s, path: d || "" }), {
    refreshDeps: [s, d],
    ready: !!s && !!d,
    onSuccess: (I) => {
      O(I.data);
    },
    onBefore: () => {
      O("");
    },
    onError: () => l.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))
  }), Ae = () => {
    !s || !d || Z || F.system.putSkillFile({ id: s, path: d }, g).then(() => {
      l.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), R(!1);
    }).catch(() => l.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, Ee = (I, P) => {
    const te = String(P.node.key), ge = !P.node.isLeaf;
    u(te), b(ge), P.node.isLeaf ? m(te) : m(null);
  }, Te = (I) => {
    I.event.preventDefault(), J({
      path: String(I.node.key),
      isDir: !I.node.isLeaf,
      x: I.event.clientX,
      y: I.event.clientY
    });
  }, Se = xe(() => J(null), []), Ce = xe(
    (I) => {
      if (!s || !K || Z) return;
      const { path: P, isDir: te } = K;
      switch (Se(), I) {
        case "open":
          m(P), u(P), b(!1);
          break;
        case "rename": {
          const ge = P.includes("/") ? P.split("/").pop() : P;
          z({ path: P, isDir: te }), Q(ge), setTimeout(() => S.setFieldsValue({ name: ge }), 0);
          break;
        }
        case "delete":
          t.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: te ? i("settings.skills.editor.deleteConfirmContentDir", { path: P, defaultValue: `Delete ${P}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: P, defaultValue: `Delete ${P}?` }),
            onOk: () => F.system.deleteSkillPath({ id: s, path: P }).then(() => {
              l.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === P && (m(null), O("")), r === P && (u(null), b(!1)), D();
            }).catch(() => l.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          u(P), b(te), L(!0);
          break;
        case "newDir":
          u(P), b(te), B(!0);
          break;
      }
    },
    [s, K, Se, D, d, r, S, i, Z]
  ), T = () => {
    if (!s || !w || Z) return;
    const I = (S.getFieldValue("name") ?? $).trim();
    if (!I) {
      l.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!w.isDir && !/\.(md|txt)$/i.test(I)) {
      l.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const P = at(w.path), te = P ? `${P}/${I}` : I;
    if (te === w.path) {
      z(null);
      return;
    }
    F.system.moveSkillPath({ id: s }, { from_path: w.path, to_path: te }).then(() => {
      l.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), d === w.path && m(te), r === w.path && u(te), z(null), D();
    }).catch(() => l.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, ie = (I) => {
    if (!s || Z) return;
    const P = String(I.dragNode.key), te = String(I.dragNode.title);
    let ge;
    if (I.dropToGap) {
      const Ze = at(String(I.node.key));
      ge = Ze ? `${Ze}/${te}` : te;
    } else
      ge = `${I.node.key}/${te}`;
    ge !== P && F.system.moveSkillPath({ id: s }, { from_path: P, to_path: ge }).then(() => {
      l.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), d === P && m(ge), r === P && u(ge), D();
    }).catch(() => l.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, ye = () => {
    const I = ee.trim();
    if (!I || !s || Z) return;
    const P = Ve ? `${Ve}/${I}` : I;
    if (!/\.(md|txt)$/i.test(I)) {
      l.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    F.system.putSkillFile({ id: s, path: P }, "").then(() => {
      l.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), L(!1), H(""), D(), m(P), O("");
    }).catch(() => l.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, j = () => {
    var te;
    const I = (te = ae.getFieldValue("name")) == null ? void 0 : te.trim();
    if (!I || !s || Z) return;
    const P = Ve ? `${Ve}/${I}` : I;
    F.system.createSkillDir({ id: s }, { path: P }).then(() => {
      l.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), B(!1), ae.resetFields(), D();
    }).catch(() => l.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, U = () => {
    const I = r || d;
    !s || !I || Z || t.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: I, defaultValue: `Delete ${I}?` }),
      onOk: () => F.system.deleteSkillPath({ id: s, path: I }).then(() => {
        l.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === I && (m(null), O("")), r === I && (u(null), b(!1)), D();
      }).catch(() => l.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return s ? /* @__PURE__ */ e.jsxs(
    le,
    {
      title: (x == null ? void 0 : x.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => n("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        Z ? /* @__PURE__ */ e.jsx(
          nt,
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
            /* @__PURE__ */ e.jsxs(G, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(Le, {}), disabled: Z, onClick: () => L(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(zt, {}), disabled: Z, onClick: () => B(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            C ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              Yt,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !Z,
                expandedKeys: V,
                onExpand: (I) => M(I),
                selectedKeys: r ? [r] : [],
                onSelect: Ee,
                onRightClick: Z ? void 0 : Te,
                onDrop: ie,
                className: a.fileTree,
                treeData: ue
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(G, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: d }),
                /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ke, {}), disabled: Z || !_, onClick: Ae, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(E, { danger: !0, icon: /* @__PURE__ */ e.jsx(ze, {}), disabled: Z, onClick: U, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              /* @__PURE__ */ e.jsx(be, { spinning: Ie, wrapperClassName: Ds(a.editorSpin, "ez-editor-spin"), children: pl(d) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  yt,
                  {
                    value: g,
                    readOnly: Z,
                    onChange: (I) => {
                      O(I.target.value), R(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(We, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(cl, { content: Nt(g) }) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                yt,
                {
                  value: g,
                  readOnly: Z,
                  onChange: (I) => {
                    O(I.target.value), R(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              ) })
            ] }),
            !d && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        K && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: Se,
              onContextMenu: (I) => I.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: K.x, top: K.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            es,
            {
              selectable: !1,
              items: [
                ...K.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(Ot, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Ne, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(ze, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(gs, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(hs, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: I }) => Ce(I)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(fe, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: v, onOk: ye, onCancel: () => {
          L(!1), H("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(k, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: ee, onChange: (I) => H(I.target.value) }) }),
        /* @__PURE__ */ e.jsx(fe, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: f, onOk: () => ae.validateFields().then(j), onCancel: () => B(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(o, { form: ae, layout: "vertical", children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(k, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          fe,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!w,
            onOk: T,
            onCancel: () => z(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(o, { form: S, layout: "vertical", onValuesChange: (I, P) => Q(P.name ?? ""), children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: w != null && w.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              k,
              {
                placeholder: w != null && w.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => T()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fl
}, Symbol.toStringTag, { value: "Module" })), gl = He(() => import("./markdown-viewer.js")), hl = () => {
  const { message: l } = ce.useApp(), { id: t } = st(), a = ve(), { t: s } = X("system"), { data: n, loading: i } = A(
    () => t ? F.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: d, loading: m, mutate: r } = A(
    () => t ? F.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => l.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => r()
    }
  ), u = je(() => d == null ? void 0 : d.map((b) => ({
    key: b.file_name,
    label: b.file_name,
    children: /* @__PURE__ */ e.jsx(We, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(gl, { content: Nt(b.content) }) })
  })), [d]);
  if (!t) return null;
  const p = i || m;
  return /* @__PURE__ */ e.jsx(be, { spinning: p, children: /* @__PURE__ */ e.jsx(
    le,
    {
      title: (n == null ? void 0 : n.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => a("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: u
    }
  ) });
}, la = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hl
}, Symbol.toStringTag, { value: "Module" })), { Text: he, Title: xl } = Tt, rt = ["agent", "llm", "tool"], jt = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(vs, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(ks, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Vs, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(ot, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(Xe, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(bs, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(Xe, {}) }
}, bt = {
  agent: "#1677ff",
  llm: "#52c41a",
  tool: "#fa8c16"
}, yl = {
  llm_request: "#1677ff",
  llm_response: "#52c41a",
  tool_call: "#fa8c16",
  tool_result: "#13c2c2",
  token_usage: "#722ed1",
  error: "#ff4d4f",
  summary: "#2f54eb"
}, $t = mt(({ css: l }) => ({
  rawToggleWrap: l`
  position: relative;
  .json-block-mode-toggle{
    right: 90px !important;
  }
`,
  rawToggleHeader: l`
    position: absolute;
    top: 6px;
    right: 20px;
    z-index: 2;
  `
})), jl = mt(({ token: l, css: t }) => ({
  sequenceWrap: t`
    overflow-x: auto;
    padding: 8px 4px 16px;
  `,
  sequenceInner: t`
    min-width: 560px;
    position: relative;
  `,
  actorHeader: t`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    margin-bottom: 8px;
  `,
  actorBox: t`
    text-align: center;
    padding: 8px 12px;
    margin: 0 24px;
    border: 2px solid ${l.colorBorder};
    border-radius: ${l.borderRadius}px;
    background: ${l.colorBgContainer};
    font-weight: 600;
    font-size: 13px;
  `,
  messageList: t`
    position: relative;
  `,
  lifelineBg: t`
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    pointer-events: none;
    z-index: 0;
  `,
  lifeline: t`
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 0;
      border-left: 2px dashed ${l.colorBorderSecondary};
      transform: translateX(-50%);
    }
  `,
  messageRow: t`
    position: relative;
    z-index: 1;
    min-height: 52px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    cursor: pointer;
    border-radius: ${l.borderRadius}px;
    transition: background 0.15s;

    &:hover {
      background: ${l.colorFillTertiary};
    }
  `,
  messageRowActive: t`
    background: ${l.colorPrimaryBg} !important;
    outline: 1px solid ${l.colorPrimaryBorder};
  `,
  arrowTrack: t`
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 0;
    pointer-events: none;
  `,
  arrowLine: t`
    position: absolute;
    top: 0;
    height: 0;
    border-top-width: 2px;
    border-top-style: solid;
  `,
  arrowHead: t`
    position: absolute;
    top: -5px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  `,
  arrowLabel: t`
    position: absolute;
    top: -22px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 12px;
    line-height: 1.2;
    padding: 1px 8px;
    border-radius: 10px;
    background: ${l.colorBgElevated};
    border: 1px solid ${l.colorBorderSecondary};
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  `,
  arrowLabelFailed: t`
    background: ${l.colorErrorBg};
    border-color: ${l.colorErrorBorder};
    color: ${l.colorError} !important;
    font-weight: 600;
  `,
  noteBox: t`
    grid-column: 1 / -1;
    justify-self: center;
    max-width: 70%;
    padding: 6px 12px;
    border-radius: ${l.borderRadius}px;
    border: 1px dashed ${l.colorBorder};
    background: ${l.colorFillQuaternary};
    font-size: 12px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  `,
  noteBoxFailed: t`
    background: ${l.colorErrorBg};
    border-style: solid;
    border-color: ${l.colorErrorBorder};
    color: ${l.colorError};
    font-weight: 600;
  `,
  failIcon: t`
    font-size: 12px;
    flex-shrink: 0;
  `,
  stepMeta: t`
    position: absolute;
    left: 4px;
    top: 4px;
    font-size: 11px;
    color: ${l.colorTextSecondary};
    z-index: 2;
  `
}));
function Bt(l) {
  const { parsed: t, isJSON: a } = Be(l);
  return a && typeof t == "object" && t !== null ? { text: l, value: t } : { text: l };
}
function Vt(l) {
  if (typeof l == "string") return { text: l };
  const t = JSON.stringify(l, null, 2);
  return typeof l == "object" && l !== null ? { text: t, value: l } : { text: t };
}
function bl(l) {
  const t = l.map((s) => {
    const { parsed: n, isJSON: i } = Be(s.content);
    return {
      event: s,
      isJSON: i,
      parsed: n,
      display: {
        text: s.content,
        value: i && typeof n == "object" && n !== null ? n : void 0
      }
    };
  });
  let a = null;
  for (const s of t) {
    const n = s.event.event_type;
    if (n === "llm_request") {
      a = s;
      continue;
    }
    if (n !== "llm_response") continue;
    const i = s.display.value;
    if (i && ("raw_request" in i || "raw_response" in i)) {
      const { raw_request: d, raw_response: m, ...r } = i;
      s.display = { text: JSON.stringify(r, null, 2), value: r }, d !== void 0 && a && (a.rawRequest = Vt(d)), m !== void 0 && (s.rawResponse = Vt(m));
    }
    a = null;
  }
  return t;
}
const Je = ({ children: l, fallback: t }) => {
  const [a, s] = y(!1);
  return Fe(() => {
    let n = 0;
    const i = window.requestAnimationFrame(() => {
      n = window.requestAnimationFrame(() => s(!0));
    });
    return () => {
      window.cancelAnimationFrame(i), window.cancelAnimationFrame(n);
    };
  }, []), a ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t ?? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "16px 0" }, children: /* @__PURE__ */ e.jsx(be, { size: "small" }) }) });
}, ke = ({
  payload: l,
  maxHeight: t
}) => {
  const [a, s] = y("raw"), n = /* @__PURE__ */ e.jsx(
    "pre",
    {
      style: {
        background: "var(--ant-color-bg-container)",
        border: "1px solid var(--ant-color-border)",
        borderRadius: 6,
        padding: 12,
        maxHeight: t,
        overflow: "auto",
        fontSize: 12,
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        margin: 0
      },
      children: l.text
    }
  );
  return l.value ? /* @__PURE__ */ e.jsxs("div", { style: { position: "relative" }, children: [
    /* @__PURE__ */ e.jsx("div", { className: "json-block-mode-toggle", style: { position: "absolute", top: 6, right: 6, zIndex: 2 }, children: /* @__PURE__ */ e.jsx(
      tt,
      {
        size: "small",
        value: a,
        onChange: (i) => s(i),
        options: [
          { value: "raw", icon: /* @__PURE__ */ e.jsx(Rt, {}), title: "Raw" },
          { value: "json", icon: /* @__PURE__ */ e.jsx(Mt, {}), title: "JSON" }
        ]
      }
    ) }),
    a === "json" ? /* @__PURE__ */ e.jsx(Je, { children: /* @__PURE__ */ e.jsx(
      Qe,
      {
        style: {
          background: "var(--ant-color-bg-container)",
          border: "1px solid var(--ant-color-border)",
          borderRadius: 6,
          padding: 12,
          maxHeight: t,
          overflow: "auto",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          margin: 0
        },
        value: l.value
      }
    ) }) : n
  ] }) : n;
}, it = "#ff4d4f";
function Jt(l, t) {
  if (!t || !l) return !1;
  if (typeof l.ok == "boolean") return !l.ok;
  const a = (l.result || "").trim();
  return a ? !!(a === "tool call failed" || /^unknown tool:/i.test(a) || /^tool .+ failed:/i.test(a)) : !1;
}
const Vl = ({
  entry: l,
  t,
  maxHeight: a
}) => {
  if (!l.isJSON)
    return /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
  const s = l.parsed;
  return /* @__PURE__ */ e.jsxs(oe, { size: "small", column: 2, bordered: !0, style: { maxHeight: a, overflow: "auto" }, children: [
    s.prompt_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      oe.Item,
      {
        label: t("trace.promptTokens", { defaultValue: "Prompt Tokens" }),
        children: s.prompt_tokens
      }
    ),
    s.completion_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      oe.Item,
      {
        label: t("trace.completionTokens", {
          defaultValue: "Completion Tokens"
        }),
        children: s.completion_tokens
      }
    ),
    s.total_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      oe.Item,
      {
        label: t("trace.totalTokens", { defaultValue: "Total Tokens" }),
        children: s.total_tokens
      }
    ),
    s.active_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      oe.Item,
      {
        label: t("trace.activeTokens", { defaultValue: "Active Tokens" }),
        children: s.active_tokens
      }
    )
  ] });
}, kl = ({
  entry: l,
  t,
  maxHeight: a
}) => {
  const s = l.isJSON ? l.parsed : null, n = je(
    () => s != null && s.arguments ? Bt(s.arguments) : null,
    [s]
  );
  return s ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: a, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(he, { code: !0, children: s.tool_call_id })
    ] }),
    s.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: a, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(ne, { color: "blue", children: s.tool })
    ] }),
    n && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.arguments", { defaultValue: "Arguments" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(ke, { payload: n, maxHeight: a })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
}, vl = ({
  entry: l,
  t,
  maxHeight: a
}) => {
  const s = l.isJSON ? l.parsed : null, n = je(
    () => s != null && s.result ? Bt(s.result) : null,
    [s]
  );
  if (!s)
    return /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
  const i = Jt(s, !0);
  return /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: a, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(he, { code: !0, children: s.tool_call_id })
    ] }),
    (typeof s.ok == "boolean" || i) && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.status", { defaultValue: "Status" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(ne, { color: i ? "error" : "success", children: i ? t("trace.failed", { defaultValue: "Failed" }) : t("trace.succeeded", { defaultValue: "Succeeded" }) })
    ] }),
    n && /* @__PURE__ */ e.jsxs("div", { style: { overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.result", { defaultValue: "Result" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(ke, { payload: n, maxHeight: a })
    ] })
  ] });
}, Ye = { verticalAlign: "-2px" }, Sl = ({ entry: l, t, maxHeight: a }) => {
  const [s, n] = y("request"), { styles: i } = $t({ isRaw: s === "raw" });
  return l.rawRequest ? /* @__PURE__ */ e.jsxs("div", { className: i.rawToggleWrap, children: [
    /* @__PURE__ */ e.jsx("div", { className: i.rawToggleHeader, children: /* @__PURE__ */ e.jsx(
      tt,
      {
        size: "small",
        value: s,
        onChange: (d) => n(d),
        options: [
          {
            value: "request",
            icon: /* @__PURE__ */ e.jsx(_t, { style: Ye }),
            title: t("trace.request", { defaultValue: "Request" })
          },
          {
            value: "raw",
            icon: /* @__PURE__ */ e.jsx(wt, { style: Ye }),
            title: t("trace.rawRequest", { defaultValue: "Raw Request" })
          }
        ]
      }
    ) }),
    s === "raw" ? /* @__PURE__ */ e.jsx(Je, { children: /* @__PURE__ */ e.jsx(ke, { payload: l.rawRequest, maxHeight: a }) }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a })
  ] }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
}, _l = ({ entry: l, t, maxHeight: a }) => {
  const [s, n] = y("response"), { styles: i } = $t({ isRaw: s === "raw" });
  return l.rawResponse ? /* @__PURE__ */ e.jsxs("div", { className: i.rawToggleWrap, children: [
    /* @__PURE__ */ e.jsx("div", { className: i.rawToggleHeader, children: /* @__PURE__ */ e.jsx(
      tt,
      {
        size: "small",
        value: s,
        onChange: (d) => n(d),
        options: [
          {
            value: "response",
            icon: /* @__PURE__ */ e.jsx(_t, { style: Ye }),
            title: t("trace.response", { defaultValue: "Response" })
          },
          {
            value: "raw",
            icon: /* @__PURE__ */ e.jsx(wt, { style: Ye }),
            title: t("trace.rawResponse", { defaultValue: "Raw Response" })
          }
        ]
      }
    ) }),
    s === "raw" ? /* @__PURE__ */ e.jsx(Je, { children: /* @__PURE__ */ e.jsx(ke, { payload: l.rawResponse, maxHeight: a }) }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a })
  ] }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
}, kt = ({ entry: l, t, maxHeight: a }) => {
  const { event: s } = l;
  switch (s.event_type) {
    case "llm_request":
      return /* @__PURE__ */ e.jsx(Sl, { entry: l, t, maxHeight: a });
    case "llm_response":
      return /* @__PURE__ */ e.jsx(_l, { entry: l, t, maxHeight: a });
    case "token_usage":
      return /* @__PURE__ */ e.jsx(Vl, { entry: l, t, maxHeight: a });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(kl, { entry: l, t, maxHeight: a });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(vl, { entry: l, t, maxHeight: a });
    case "error":
      return /* @__PURE__ */ e.jsx(
        "pre",
        {
          style: {
            background: "var(--ant-color-error-bg)",
            border: "1px solid var(--ant-color-error-border)",
            borderRadius: 6,
            padding: 12,
            maxHeight: a,
            overflow: "auto",
            fontSize: 12,
            color: "var(--ant-color-error)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            margin: 0
          },
          children: s.content
        }
      );
    default:
      return /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
  }
};
function vt(l) {
  return rt.indexOf(l);
}
function St(l, t) {
  return l > 0 ? ` (${t("trace.durationMs", {
    ms: l,
    defaultValue: `${l}ms`
  })})` : "";
}
function wl(l, t) {
  const a = /* @__PURE__ */ new Map();
  for (const n of l) {
    if (n.event.event_type !== "tool_call" || !n.isJSON) continue;
    const i = n.parsed;
    i.tool_call_id && i.tool && a.set(i.tool_call_id, i.tool);
  }
  const s = t("trace.failed", { defaultValue: "Failed" });
  return l.map((n, i) => {
    const { event: d } = n, m = t(`trace.eventTypes.${d.event_type}`, {
      defaultValue: d.event_type
    }), r = yl[d.event_type] || "#8c8c8c";
    switch (d.event_type) {
      case "llm_request":
        return {
          id: d.id,
          entry: n,
          from: "agent",
          to: "llm",
          label: m,
          kind: "call",
          color: r
        };
      case "llm_response":
        return {
          id: d.id,
          entry: n,
          from: "llm",
          to: "agent",
          label: `${m}${St(d.duration_ms, t)}`,
          kind: "return",
          color: r
        };
      case "tool_call": {
        const u = n.isJSON ? n.parsed : null, p = (u == null ? void 0 : u.tool) || m;
        return {
          id: d.id,
          entry: n,
          from: "agent",
          to: "tool",
          label: p,
          kind: "call",
          color: r
        };
      }
      case "tool_result": {
        const u = n.isJSON ? n.parsed : null, p = Jt(u, n.isJSON), b = (u == null ? void 0 : u.tool_call_id) && a.get(u.tool_call_id) || "", g = b ? `${m}: ${b}` : m;
        return {
          id: d.id,
          entry: n,
          from: "tool",
          to: "agent",
          label: p ? `${g} · ${s}` : g,
          kind: "return",
          color: p ? it : r,
          failed: p
        };
      }
      case "summary":
        return {
          id: d.id,
          entry: n,
          from: "agent",
          to: "llm",
          label: m,
          kind: "call",
          color: r
        };
      case "token_usage": {
        const u = n.isJSON ? n.parsed : null, p = (u == null ? void 0 : u.total_tokens) != null ? ` · ${u.total_tokens}` : "";
        return {
          id: d.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: `${m}${p}`,
          kind: "note",
          color: r
        };
      }
      case "error": {
        const u = i > 0 ? l[i - 1].event : void 0, p = (u == null ? void 0 : u.event_type) === "llm_request", b = `${m}${St(d.duration_ms, t)} · ${s}`;
        return p ? {
          id: d.id,
          entry: n,
          from: "llm",
          to: "agent",
          label: b,
          kind: "return",
          color: it,
          failed: !0
        } : {
          id: d.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: b,
          kind: "note",
          color: it,
          failed: !0
        };
      }
      default:
        return {
          id: d.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: m,
          kind: "note",
          color: r
        };
    }
  });
}
const Cl = ({ from: l, to: t, label: a, color: s, kind: n, failed: i, styles: d, cx: m }) => {
  const r = vt(l), u = vt(t), p = (Math.min(r, u) + 0.5) * (100 / 3), b = (Math.max(r, u) + 0.5) * (100 / 3), g = b - p, O = u > r, _ = n === "return";
  return /* @__PURE__ */ e.jsxs("div", { className: d.arrowTrack, children: [
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: d.arrowLine,
        style: {
          left: `${p}%`,
          width: `${g}%`,
          borderTopColor: s,
          borderTopStyle: _ ? "dashed" : "solid"
        }
      }
    ),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: d.arrowHead,
        style: O ? {
          left: `calc(${b}% - 2px)`,
          borderLeft: `8px solid ${s}`
        } : {
          left: `calc(${p}% - 6px)`,
          borderRight: `8px solid ${s}`
        }
      }
    ),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: m(d.arrowLabel, i && d.arrowLabelFailed),
        style: { color: s, borderColor: s },
        title: a,
        children: [
          i && /* @__PURE__ */ e.jsx(Pt, { className: d.failIcon }),
          /* @__PURE__ */ e.jsx("span", { children: a })
        ]
      }
    )
  ] });
}, Tl = ({ entries: l, t, selectedId: a, onSelect: s }) => {
  const { styles: n, cx: i } = jl(), d = je(
    () => wl(l, t),
    [l, t]
  ), m = (r) => t(`trace.actors.${r}`, {
    defaultValue: r === "agent" ? "Agent" : r === "llm" ? "LLM" : "Tool"
  });
  return d.length === 0 ? /* @__PURE__ */ e.jsx(
    Re,
    {
      description: t("trace.noEvents", {
        defaultValue: "No trace events found for this trace ID"
      })
    }
  ) : /* @__PURE__ */ e.jsx("div", { className: n.sequenceWrap, children: /* @__PURE__ */ e.jsxs("div", { className: n.sequenceInner, children: [
    /* @__PURE__ */ e.jsx("div", { className: n.actorHeader, children: rt.map((r) => /* @__PURE__ */ e.jsx(
      "div",
      {
        className: n.actorBox,
        style: { borderColor: bt[r], color: bt[r] },
        children: m(r)
      },
      r
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: n.messageList, children: [
      /* @__PURE__ */ e.jsx("div", { className: n.lifelineBg, children: rt.map((r) => /* @__PURE__ */ e.jsx("div", { className: n.lifeline }, r)) }),
      d.map((r) => /* @__PURE__ */ e.jsxs(
        "div",
        {
          role: "button",
          tabIndex: 0,
          className: i(
            n.messageRow,
            a === r.id && n.messageRowActive
          ),
          onClick: () => s(r.entry),
          onKeyDown: (u) => {
            (u.key === "Enter" || u.key === " ") && (u.preventDefault(), s(r.entry));
          },
          children: [
            /* @__PURE__ */ e.jsxs("span", { className: n.stepMeta, children: [
              "#",
              r.entry.event.step_order
            ] }),
            r.kind === "note" ? /* @__PURE__ */ e.jsxs(
              "div",
              {
                className: i(
                  n.noteBox,
                  r.failed && n.noteBoxFailed
                ),
                style: { borderColor: r.color, color: r.color },
                title: r.label,
                children: [
                  r.failed && /* @__PURE__ */ e.jsx(Pt, { className: n.failIcon }),
                  /* @__PURE__ */ e.jsx("span", { children: r.label })
                ]
              }
            ) : /* @__PURE__ */ e.jsx(
              Cl,
              {
                from: r.from,
                to: r.to,
                label: r.label,
                color: r.color,
                kind: r.kind,
                failed: r.failed,
                styles: n,
                cx: i
              }
            )
          ]
        },
        r.id
      ))
    ] })
  ] }) });
}, Fl = () => {
  const { message: l, modal: t } = ce.useApp(), { t: a } = X("ai"), s = ve(), [n, i] = Dt(), [d, m] = y(""), [r, u] = y(""), [p, b] = y("sequence"), [g, O] = y(
    null
  ), {
    data: _,
    loading: R,
    refresh: V
  } = A(() => F.ai.getAiTraceStatus(), {
    onError: () => {
      l.error(
        a("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), M = (_ == null ? void 0 : _.enabled) ?? !1, { loading: v, run: L } = A(
    (x) => F.ai.toggleAiTrace({ enabled: x }),
    {
      manual: !0,
      onSuccess: (x, [c]) => {
        l.success(
          c ? a("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : a("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), V(), c || u("");
      },
      onError: () => {
        l.error(
          a("trace.toggleFailed", {
            defaultValue: "Failed to toggle AI debug tracing"
          })
        );
      }
    }
  ), {
    data: f,
    loading: B,
    run: ee
  } = A(
    (x) => F.ai.getAiTraceEvents({ trace_id: x }),
    {
      manual: !0,
      onError: () => {
        l.error(
          a("trace.fetchFailed", {
            defaultValue: "Failed to fetch trace events"
          })
        );
      }
    }
  ), H = xe(
    (x) => {
      u(x), O(null), ee(x);
    },
    [ee]
  ), ae = is(!1);
  Fe(() => {
    var C, D;
    if (ae.current) return;
    ae.current = !0;
    const x = (C = n.get("trace_id")) == null ? void 0 : C.trim();
    x && (m(x), H(x));
    const c = (D = n.get("view")) == null ? void 0 : D.trim();
    c && b(c);
  }, [n, H, b]);
  const K = xe(() => {
    const x = d.trim();
    x && (i(
      (c) => {
        const C = new URLSearchParams(c);
        return C.set("trace_id", x), C;
      },
      { replace: !0 }
    ), H(x));
  }, [d, H, i]), J = xe(
    (x) => {
      const c = x ? a("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : a("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      t.confirm({
        title: x ? a("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : a("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: c,
        onOk: () => L(x)
      });
    },
    [a, L, t]
  ), w = xe(async () => {
    if (r)
      try {
        const x = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(r)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!x.ok) throw new Error("download failed");
        const c = await x.blob(), C = window.URL.createObjectURL(c), D = document.createElement("a");
        D.href = C, D.download = `ai-trace-${r}.json`, document.body.appendChild(D), D.click(), window.URL.revokeObjectURL(C), document.body.removeChild(D);
      } catch {
        l.error(
          a("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [r, a]), z = je(() => f ?? [], [f]), $ = je(() => bl(z), [z]);
  Fe(() => {
    O(null);
  }, [r, p]);
  const Q = je(
    () => $.map((x) => {
      const { event: c } = x, C = jt[c.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(Xe, {})
      }, D = a(`trace.eventTypes.${c.event_type}`, {
        defaultValue: c.event_type
      });
      return {
        key: c.id,
        dot: C.icon,
        color: C.color,
        children: /* @__PURE__ */ e.jsx(
          ts,
          {
            size: "small",
            defaultActiveKey: [c.id],
            items: [
              {
                key: c.id,
                label: /* @__PURE__ */ e.jsxs(G, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(ne, { color: C.color, children: D }),
                  /* @__PURE__ */ e.jsxs(he, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    c.step_order
                  ] }),
                  c.duration_ms > 0 && /* @__PURE__ */ e.jsxs(he, { type: "secondary", style: { fontSize: 12 }, children: [
                    a("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    c.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(he, { type: "secondary", style: { fontSize: 12 }, children: new Date(c.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(Je, { children: /* @__PURE__ */ e.jsx(kt, { entry: x, t: a, maxHeight: 400 }) })
              }
            ]
          }
        )
      };
    }),
    [$, a]
  ), S = g ? jt[g.event.event_type] : null;
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [
          /* @__PURE__ */ e.jsxs(G, { children: [
            /* @__PURE__ */ e.jsx(
              E,
              {
                icon: /* @__PURE__ */ e.jsx(ut, {}),
                onClick: () => s("/system/settings#ai-models"),
                children: a("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(xl, { level: 4, style: { margin: 0 }, children: a("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(G, { children: [
            /* @__PURE__ */ e.jsx(he, { children: M ? a("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : a("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              de,
              {
                checked: M,
                loading: R || v,
                onChange: J
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(G.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        k,
        {
          placeholder: a("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: d,
          onChange: (x) => m(x.target.value),
          onPressEnter: K,
          prefix: /* @__PURE__ */ e.jsx(xs, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(E, { type: "primary", onClick: K, loading: B, children: a("trace.search", { defaultValue: "Search" }) }),
      r && z.length > 0 && /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ys, {}), onClick: w, children: a("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    B ? /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(be, { size: "large" }) }) }) : r && z.length === 0 ? /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx(
      Re,
      {
        description: a("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : z.length > 0 ? /* @__PURE__ */ e.jsx(
      le,
      {
        title: /* @__PURE__ */ e.jsx(
          tt,
          {
            value: p,
            onChange: (x) => {
              b(x), i(
                (c) => {
                  const C = new URLSearchParams(c);
                  return C.set("view", x), C;
                },
                { replace: !0 }
              );
            },
            options: [
              {
                label: a("trace.viewSequence", {
                  defaultValue: "Sequence"
                }),
                value: "sequence",
                icon: /* @__PURE__ */ e.jsx(js, {})
              },
              {
                label: a("trace.viewTimeline", {
                  defaultValue: "Timeline"
                }),
                value: "timeline",
                icon: /* @__PURE__ */ e.jsx(Et, {})
              }
            ]
          }
        ),
        children: p === "sequence" ? /* @__PURE__ */ e.jsx(
          Tl,
          {
            entries: $,
            t: a,
            selectedId: g == null ? void 0 : g.event.id,
            onSelect: O
          }
        ) : /* @__PURE__ */ e.jsx(ss, { items: Q })
      }
    ) : null,
    /* @__PURE__ */ e.jsx(
      ls,
      {
        title: g ? /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(ne, { color: (S == null ? void 0 : S.color) || "default", children: a(`trace.eventTypes.${g.event.event_type}`, {
            defaultValue: g.event.event_type
          }) }),
          /* @__PURE__ */ e.jsxs(he, { type: "secondary", children: [
            "#",
            g.event.step_order
          ] }),
          g.event.duration_ms > 0 && /* @__PURE__ */ e.jsxs(he, { type: "secondary", children: [
            a("trace.duration", { defaultValue: "Duration" }),
            ":",
            " ",
            g.event.duration_ms,
            "ms"
          ] })
        ] }) : null,
        open: p === "sequence" && !!g,
        onClose: () => O(null),
        width: 560,
        children: g && /* @__PURE__ */ e.jsx(Je, { children: /* @__PURE__ */ e.jsx(kt, { entry: g, t: a }) }, g.event.id)
      }
    )
  ] });
}, aa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fl
}, Symbol.toStringTag, { value: "Module" })), Il = He(() => import("./json-schema-config-form.js")), { Text: Pe, Title: Al } = Tt, El = ({
  content: l,
  maxHeight: t = 400
}) => {
  const { parsed: a, isJSON: s } = Be(l);
  return s ? /* @__PURE__ */ e.jsx(
    Qe,
    {
      style: {
        background: "var(--ant-color-bg-container)",
        border: "1px solid var(--ant-color-border)",
        borderRadius: 6,
        padding: 12,
        maxHeight: t,
        overflow: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        margin: 0
      },
      value: a
    }
  ) : /* @__PURE__ */ e.jsx(
    "pre",
    {
      style: {
        background: "var(--ant-color-bg-container)",
        border: "1px solid var(--ant-color-border)",
        borderRadius: 6,
        padding: 12,
        maxHeight: t,
        overflow: "auto",
        fontSize: 12,
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        margin: 0
      },
      children: l
    }
  );
}, zl = () => {
  var S;
  const { message: l } = ce.useApp(), { t } = X("system"), { t: a } = X("common"), s = ve(), { id: n } = st(), [i, d] = y(void 0), [m, r] = y("schema"), [u, p] = y({}), [b, g] = y("{}"), [O, _] = y(null), [R, V] = y(null), { loading: M, data: v } = A(
    () => F.system.getToolSet({ id: n }),
    {
      ready: !!n,
      onError: () => {
        l.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolset" }));
      }
    }
  ), { loading: L, data: f } = A(
    () => F.system.getToolSetTools({ id: n }),
    {
      ready: !!n,
      onError: () => {
        l.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" }));
      }
    }
  ), B = f == null ? void 0 : f.find(
    (x) => {
      var c;
      return ((c = x.function) == null ? void 0 : c.name) === i;
    }
  ), { loading: ee, run: H } = A(
    (x, c) => F.system.callTool({ id: n }, { name: x, parameters: c }),
    {
      manual: !0,
      onSuccess: (x) => {
        _((x == null ? void 0 : x.result) ?? "");
      },
      onError: (x) => {
        var C, D;
        const c = ((D = (C = x.response) == null ? void 0 : C.data) == null ? void 0 : D.message) || x.message || t("settings.toolsets.callToolFailed", { defaultValue: "Tool call failed" });
        l.error(c), _(null);
      }
    }
  ), ae = xe((x) => {
    d(x), p({}), g("{}"), _(null), V(null);
  }, []), K = xe(() => {
    if (m === "schema")
      g(JSON.stringify(u, null, 2)), r("code");
    else {
      const { parsed: x, isJSON: c } = Be(b);
      c && (p(x), V(null)), r("schema");
    }
  }, [m, u, b]), J = xe((x) => {
    g(x);
    const { parsed: c, isJSON: C } = Be(x);
    C ? (p(c), V(null)) : V(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
  }, [t]), w = xe(() => {
    if (!i) {
      l.warning(t("settings.toolsets.selectToolFirst", { defaultValue: "Please select a tool first" }));
      return;
    }
    let x;
    if (m === "code") {
      if (R) {
        l.error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
        return;
      }
      x = b;
    } else
      x = JSON.stringify(u);
    _(null), H(i, x);
  }, [i, m, u, b, R, H, t]), z = v, $ = (z == null ? void 0 : z.status) === "enabled" ? "green" : "red", Q = (z == null ? void 0 : z.status) === "enabled" ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" });
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ e.jsxs(G, { children: [
      /* @__PURE__ */ e.jsx(
        E,
        {
          icon: /* @__PURE__ */ e.jsx(ut, {}),
          onClick: () => s("/system/settings#ai-toolsets"),
          children: t("settings.toolsets.backToList", { defaultValue: "Back" })
        }
      ),
      /* @__PURE__ */ e.jsx(Al, { level: 4, style: { margin: 0 }, children: t("settings.toolsets.debugTitle", { defaultValue: "Tool Debug" }) })
    ] }) }) }),
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, loading: M, children: z && /* @__PURE__ */ e.jsxs(oe, { column: 2, size: "small", children: [
      /* @__PURE__ */ e.jsx(oe.Item, { label: t("settings.toolsets.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Pe, { strong: !0, children: z.name }) }),
      /* @__PURE__ */ e.jsx(oe.Item, { label: t("settings.toolsets.type", { defaultValue: "Type" }), children: /* @__PURE__ */ e.jsx(ne, { color: "blue", children: String(z.type).toUpperCase() }) }),
      /* @__PURE__ */ e.jsx(oe.Item, { label: t("settings.toolsets.description", { defaultValue: "Description" }), span: 2, children: z.description || "-" }),
      /* @__PURE__ */ e.jsx(oe.Item, { label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: $, children: Q }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(le, { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Pe, { strong: !0, children: t("settings.toolsets.selectTool", { defaultValue: "Select Tool" }) }) }),
        L ? /* @__PURE__ */ e.jsx(be, { size: "small" }) : /* @__PURE__ */ e.jsx(
          q,
          {
            style: { width: "100%" },
            placeholder: t("settings.toolsets.selectToolPlaceholder", { defaultValue: "Select a tool to debug" }),
            value: i,
            onChange: ae,
            optionLabelProp: "label",
            children: (f ?? []).map((x) => {
              var Z, ue;
              const c = ((Z = x.function) == null ? void 0 : Z.name) ?? "", C = ((ue = x.function) == null ? void 0 : ue.description) ?? "", D = C ? `${c} - ${C}` : c;
              return /* @__PURE__ */ e.jsx(q.Option, { value: c, label: D, children: /* @__PURE__ */ e.jsx(
                "div",
                {
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  title: D,
                  children: D
                }
              ) }, c);
            })
          }
        )
      ] }),
      B && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }, children: [
          /* @__PURE__ */ e.jsx(Pe, { strong: !0, children: t("settings.toolsets.parameters", { defaultValue: "Parameters" }) }),
          /* @__PURE__ */ e.jsx(
            et,
            {
              title: m === "schema" ? t("settings.toolsets.switchToCodeEditor", { defaultValue: "Switch to JSON editor" }) : t("settings.toolsets.switchToFormEditor", { defaultValue: "Switch to form editor" }),
              children: /* @__PURE__ */ e.jsx(
                E,
                {
                  size: "small",
                  icon: m === "schema" ? /* @__PURE__ */ e.jsx(Mt, {}) : /* @__PURE__ */ e.jsx(Rt, {}),
                  onClick: K
                }
              )
            }
          )
        ] }),
        m === "schema" ? (S = B.function) != null && S.parameters ? /* @__PURE__ */ e.jsx(We, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(
          Il,
          {
            schema: B.function.parameters,
            value: u,
            onChange: p
          }
        ) }) : /* @__PURE__ */ e.jsx(Pe, { type: "secondary", children: t("settings.toolsets.noParameters", { defaultValue: "This tool has no parameters" }) }) : /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            Us,
            {
              value: b,
              height: "200px",
              extensions: [qs()],
              onChange: J,
              basicSetup: { lineNumbers: !0, foldGutter: !0 }
            }
          ),
          R && /* @__PURE__ */ e.jsx(Pe, { type: "danger", style: { fontSize: 12, marginTop: 4, display: "block" }, children: R })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: O !== null ? 16 : 0 }, children: /* @__PURE__ */ e.jsx(
        E,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Ss, {}),
          loading: ee,
          disabled: !i,
          onClick: w,
          children: t("settings.toolsets.callTool", { defaultValue: "Run" })
        }
      ) }),
      O !== null && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Pe, { strong: !0, children: t("settings.toolsets.result", { defaultValue: "Result" }) }) }),
        /* @__PURE__ */ e.jsx(El, { content: O, maxHeight: 300 })
      ] })
    ] })
  ] });
}, ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zl
}, Symbol.toStringTag, { value: "Module" })), Ol = () => {
  const { t: l } = X("system"), [t] = Dt(), a = t.get("provider"), s = t.get("code"), n = t.get("state"), [i, d] = y(null), [m, r] = y(null), [u, p] = y(null);
  return A(async () => {
    if (!s || !n || !a)
      throw new Error(l("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const b = await F.system.testOauthCallback({ code: s, state: n, provider: a });
    if (!b.user_info)
      throw new Error(l("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!b.user)
      throw new Error(l("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    d(b.user), r(b.user_info);
  }, {
    onSuccess: () => {
      p({
        status: "success",
        message: l("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (b) => {
      p({
        status: "error",
        message: l("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: b.message
      });
    }
  }), u ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    as,
    {
      status: u.status,
      title: u.message,
      subTitle: u.error,
      extra: /* @__PURE__ */ e.jsxs(G, { style: { display: !m || !i ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(le, { title: l("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Qe, { value: m || {} }) }),
        /* @__PURE__ */ e.jsx(le, { title: l("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Qe, { value: i || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(De, {});
}, na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ol
}, Symbol.toStringTag, { value: "Module" }));
export {
  aa as A,
  ta as O,
  sa as S,
  ia as T,
  la as a,
  na as b,
  ea as i
};
