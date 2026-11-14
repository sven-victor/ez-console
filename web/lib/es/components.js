import { j as e } from "./vendor.js";
import { Navigate as Pe, useNavigate as Xe } from "react-router-dom";
import { u as Te, a as Ae, b as Le, c as yt, d as bt } from "./contexts.js";
import { g as jt, i as vt, a as wt, b as St, c as Ct, f as kt } from "./base.js";
import { Spin as Ie, Result as Se, Dropdown as Ge, Avatar as Tt, Upload as At, Modal as Qe, Popover as Lt, List as W, Image as It, Divider as Ze, Skeleton as Ft, Progress as Vt, Typography as z, Button as A, Tag as Z, Badge as _t, Space as E, Tooltip as ae, App as X, Popconfirm as me, Input as V, Table as Fe, Form as C, Alert as ue, Segmented as Oe, Steps as Et, QRCode as Pt, Empty as et, Card as Ce, Row as Ot, Col as se, Select as ee, DatePicker as zt, InputNumber as he, Switch as Dt, Flex as ze, Collapse as Mt, TreeSelect as De } from "antd";
import { useTranslation as L } from "react-i18next";
import { createStyles as H, useThemeMode as Rt, useTheme as Nt } from "antd-style";
import * as $t from "@ant-design/icons";
import { UploadOutlined as Bt, CheckOutlined as Ht, TeamOutlined as Ut, UnorderedListOutlined as qt, DownloadOutlined as Wt, BellOutlined as Yt, SunOutlined as Me, MoonOutlined as Re, MoreOutlined as Jt, PlusOutlined as Kt, ClockCircleFilled as Xt, MailOutlined as Gt, EyeOutlined as tt, EyeInvisibleOutlined as Qt, LaptopOutlined as Zt, EnvironmentOutlined as en, GlobalOutlined as tn, ClockCircleOutlined as nn, SearchOutlined as rn, UndoOutlined as sn } from "@ant-design/icons";
import nt, { useState as b, useEffect as R, useCallback as B, useRef as Y, Suspense as an, forwardRef as on, useImperativeHandle as rt, useMemo as te } from "react";
import { a as T } from "./index.js";
import { useRequest as _ } from "ahooks";
import D from "classnames";
import { createPortal as ln } from "react-dom";
import { b as ge, A as cn, r as dn } from "./client.js";
import un from "antd-img-crop";
import mn from "react-infinite-scroll-component";
import { isString as st, isNumber as pn } from "lodash-es";
import fn, { Templates as hn } from "@rjsf/antd";
import { customizeValidator as gn } from "@rjsf/validator-ajv8";
import xn from "axios";
import yn from "@uiw/react-codemirror";
import { json as bn } from "@codemirror/lang-json";
import Ne from "ajv-i18n";
import { getOptionValueFormat as jn, enumOptionSelectedValue as vn, enumOptionValueEncoder as wn, ariaDescribedByIds as Ve, enumOptionValueDecoder as xe, getInputProps as Sn } from "@rjsf/utils";
const $e = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(Ie, { size: "large" }) }), qr = ({
  element: t,
  requiredPermission: n,
  requiredPermissions: a
}) => {
  const { t: r } = L(), { user: s, loading: i, error: o } = Te(), { hasPermission: l, hasAllPermissions: d } = Ae();
  return i ? /* @__PURE__ */ e.jsx($e, {}) : o ? o.code === "E4011" ? /* @__PURE__ */ e.jsx($e, {}) : /* @__PURE__ */ e.jsx(
    Se,
    {
      status: "500",
      title: "500",
      subTitle: r("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (o == null ? void 0 : o.message) || o })
    }
  ) : s ? n && !l(n) ? /* @__PURE__ */ e.jsx(Pe, { to: "/forbidden", replace: !0 }) : a && !d(a) ? /* @__PURE__ */ e.jsx(Pe, { to: "/forbidden", replace: !0 }) : t : (window.location.href = jt("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Cn = H(({ token: t, css: n }) => ({
  container: n`
      ${n`
        @media screen and (max-width: ${t.screenXS}px) {
          width: 100% !important;
          > * {
            border-radius: 0 !important;
          }
        }
      `}
    > *{
      background-color: ${t.colorBgElevated};
      border-radius: 4px;
      box-shadow: ${t.boxShadowTertiary};
    }
    `,
  iconStyle: {
    cursor: "pointer",
    padding: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    verticalAlign: "middle",
    "&:hover": {
      color: t.colorPrimaryTextHover
    }
  }
})), ie = ({
  overlayClassName: t,
  overlay: n,
  hidden: a,
  children: r,
  ...s
}) => {
  const { styles: i } = Cn();
  return a ? /* @__PURE__ */ e.jsx(e.Fragment, {}) : /* @__PURE__ */ e.jsx(
    Ge,
    {
      popupRender: n,
      overlayClassName: D(i.container, t),
      ...s,
      children: /* @__PURE__ */ e.jsx("span", { className: i.iconStyle, children: r })
    }
  );
}, kn = () => /* @__PURE__ */ e.jsxs(
  "svg",
  {
    viewBox: "0 0 24 24",
    focusable: "false",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ e.jsx("path", { d: "M0 0h24v24H0z", fill: "none" }),
      /* @__PURE__ */ e.jsx(
        "path",
        {
          d: "M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ",
          className: "css-c4d79v"
        }
      )
    ]
  }
), Tn = H(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), An = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], Wr = ({
  transformLangConfig: t = (a) => a,
  className: n
}) => {
  const { i18n: a } = L(), { styles: r } = Tn(), s = (o) => {
    a.changeLanguage(o);
  }, i = {
    selectedKeys: [a.language],
    onClick: (o) => {
      s(o.key);
    },
    items: t(An).map((o) => ({
      key: o.lang,
      className: r.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (o == null ? void 0 : o.label) || "en-US", className: r.menuItemIconStyle, children: (o == null ? void 0 : o.icon) || "🌐" }),
        (o == null ? void 0 : o.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    ie,
    {
      className: n,
      menu: i,
      children: /* @__PURE__ */ e.jsx(kn, {})
    }
  );
}, Ln = H(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), _e = (t) => st(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? ge.endsWith("/") ? ge + `files/${t}` : ge + `/files/${t}` : t, Yr = ({ src: t, fallback: n, ...a }) => /* @__PURE__ */ e.jsx(Tt, { src: _e(t), icon: n, ...a }), In = ({ onChange: t, shape: n = "square" }) => {
  const [a, r] = b([]), { styles: s } = Ln(), [i, o] = b(!1), [l, d] = b(!0), [c, p] = b(0), { run: m, loading: f } = _(() => T.base.listFiles({ current: c + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: h }) => {
      console.log(h), r([...a, ...h]), d(h.length === 40), p(c + 1);
    }
  }), u = () => {
    d(!0), p(0), r([]);
  };
  return /* @__PURE__ */ e.jsx(
    Lt,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (h) => {
        o(h), h ? m() : u();
      },
      open: i,
      content: /* @__PURE__ */ e.jsx("div", { style: { width: 360, height: 200 }, children: /* @__PURE__ */ e.jsx(
        "div",
        {
          id: "iconsScrollableDiv",
          style: {
            height: "100%",
            overflow: "auto"
          },
          children: /* @__PURE__ */ e.jsx(
            mn,
            {
              dataLength: a.length,
              next: () => {
                m();
              },
              hasMore: l,
              loader: /* @__PURE__ */ e.jsx(Ft, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(Ze, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                W,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: a,
                  style: { margin: "0 8px" },
                  loading: f,
                  renderItem: ({ id: h }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: s.avatarItem,
                      onClick: (v) => {
                        v.stopPropagation(), t == null || t(h), o(!1), u();
                      },
                      children: /* @__PURE__ */ e.jsx(It, { src: _e(h), placeholder: /* @__PURE__ */ e.jsx(Ie, { size: "default" }), preview: !1 })
                    }
                  )
                }
              )
            }
          )
        }
      ) }),
      placement: "bottom",
      trigger: "hover",
      children: /* @__PURE__ */ e.jsx(
        Bt,
        {
          shape: n,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, Fn = ({ value: t, onChange: n, shape: a, ...r }) => {
  const [s, i] = b(void 0), [o, l] = b(!1), [d, c] = b(void 0), p = async (m) => {
    l(!0), c(m.url ?? m.preview);
  };
  return R(() => {
    i(t ? {
      uid: t,
      name: t,
      url: _e(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      un,
      {
        beforeCrop: async (m) => {
          if (m.type === "image/svg+xml") {
            const f = await T.base.uploadFile({ type: "avatar" }, m);
            return f.length > 0 && (n == null || n(f[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          At,
          {
            customRequest: async (m) => {
              var u, h;
              const f = await T.base.uploadFile({ type: "avatar", access: "public" }, m.file);
              f.length > 0 ? ((u = m.onSuccess) == null || u.call(m, f[0].id), n == null || n(f[0].id)) : (h = m.onError) == null || h.call(m, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: p,
            maxCount: 1,
            onChange: ({ file: m }) => {
              switch (m.status) {
                case "removed":
                  n == null || n(void 0);
                  break;
                case "done":
                  break;
                default:
                  i(m);
                  break;
              }
            },
            fileList: s ? [s] : [],
            ...r,
            children: s ? void 0 : /* @__PURE__ */ e.jsx(In, { shape: a, onChange: n })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(Qe, { open: o, footer: null, onCancel: () => l(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: d }) })
  ] });
}, Jr = ({ className: t }) => {
  const { t: n } = L("common"), { user: a } = Te(), { currentOrgId: r, setCurrentOrgId: s } = Le(), i = (a == null ? void 0 : a.organizations) || [], o = (p) => {
    s(p), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const l = i.find((p) => p.id === r), d = l ? l.name : n("organization.global", { defaultValue: "Global" }), c = [
    ...i.map((p) => ({
      key: p.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: p.name }),
        r === p.id && /* @__PURE__ */ e.jsx(Ht, {})
      ] }),
      onClick: () => o(p.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    ie,
    {
      className: t,
      menu: {
        items: c,
        selectedKeys: r ? [r] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(Ut, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: d })
      ]
    }
  );
}, Vn = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Kr = ({ className: t }) => {
  const { t: n } = L("task"), a = Xe(), { user: r } = yt(), { tasksDropdownOpen: s, setTasksDropdownOpen: i, tasks: o, setTasks: l } = Le(), { runAsync: d, loading: c } = _(async () => T.tasks.listUserTasks({}), {
    onSuccess: (f) => {
      vt(o, f, (u, h) => u.id === h.id && u.status === h.status && u.progress === h.progress) || l(f);
    },
    pollingInterval: s ? 3e3 : 6e4,
    ready: !!r,
    refreshDeps: [r]
  });
  R(() => {
    s && d();
  }, [s]);
  const p = async (f) => {
    const u = await T.base.downloadFile({ fileKey: f }, { params: { method: "sign" } }), h = `/api/files/${f}?signature=${u.signature}&expires=${u.expires}`;
    window.open(h, "_blank");
  }, m = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      W,
      {
        size: "small",
        dataSource: o,
        loading: c,
        renderItem: (f) => /* @__PURE__ */ e.jsx(
          W.Item,
          {
            extra: /* @__PURE__ */ e.jsx(Z, { color: Vn[f.status], style: { marginLeft: 6 }, children: n(`status.${f.status}`, { defaultValue: f.status }) }),
            actions: [
              f.artifact_file_key && /* @__PURE__ */ e.jsx(
                A,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx(Wt, {}),
                  onClick: () => p(f.artifact_file_key)
                }
              )
            ].filter(Boolean),
            children: /* @__PURE__ */ e.jsx(
              W.Item.Meta,
              {
                title: /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13 }, children: /* @__PURE__ */ e.jsxs(z.Text, { ellipsis: { tooltip: !0 }, children: [
                  n(`type.${f.type}`, { defaultValue: f.type }),
                  " ",
                  f.artifact_file_name && `- ${f.artifact_file_name}`
                ] }) }),
                description: (f.status === "running" || f.status === "pending") && /* @__PURE__ */ e.jsx(Vt, { percent: f.progress ?? 0, size: "small", style: { marginTop: 4 } })
              }
            )
          },
          f.id
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(A, { type: "link", size: "small", onClick: () => a("/tasks"), children: n("more", { defaultValue: "More" }) }) })
  ] });
  return !o || o.length === 0 ? null : /* @__PURE__ */ e.jsxs(ie, { className: t, overlay: m, placement: "bottomRight", open: s, onOpenChange: i, children: [
    /* @__PURE__ */ e.jsx(qt, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: n("tasks", { defaultValue: "Tasks" }) })
  ] });
}, _n = 20, Xr = ({ className: t }) => {
  const { t: n } = L("inbox"), a = Xe(), { user: r } = Te(), { inboxUnreadCount: s, inboxRevision: i, setInboxUnreadCount: o, bumpInboxRevision: l } = Le(), [d, c] = b(!1), { data: p = [], loading: m, run: f } = _(
    async () => (await T.inbox.listInboxMessages({
      current: 1,
      page_size: _n
    })).data ?? [],
    {
      ready: !!r,
      refreshDeps: [r == null ? void 0 : r.id, i]
    }
  ), u = async (S) => {
    await T.inbox.markInboxMessageRead({ id: S }), l(), f();
  }, h = async () => {
    await T.inbox.markAllInboxMessagesRead(), o(0), l(), f();
  }, v = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 420, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      W,
      {
        size: "small",
        dataSource: p,
        loading: m,
        locale: { emptyText: n("empty", { defaultValue: "No messages" }) },
        renderItem: (S) => {
          const j = wt(S);
          return /* @__PURE__ */ e.jsx(
            W.Item,
            {
              style: { cursor: j ? "pointer" : "default" },
              onClick: () => {
                j && u(S.id);
              },
              children: /* @__PURE__ */ e.jsx(
                W.Item.Meta,
                {
                  title: /* @__PURE__ */ e.jsx(z.Text, { strong: j, ellipsis: { tooltip: !0 }, children: Ct(n, S) }),
                  description: /* @__PURE__ */ e.jsxs(E, { direction: "vertical", size: 0, style: { width: "100%" }, children: [
                    /* @__PURE__ */ e.jsx(z.Text, { type: "secondary", ellipsis: { tooltip: !0 }, children: St(n, S) }),
                    /* @__PURE__ */ e.jsx(z.Text, { type: "secondary", style: { fontSize: 12 }, children: S.created_at ? new Date(S.created_at).toLocaleString() : "" })
                  ] })
                }
              )
            },
            S.id
          );
        }
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, display: "flex", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ e.jsx(A, { type: "link", size: "small", disabled: s <= 0, onClick: () => void h(), children: n("markAllRead", { defaultValue: "Mark all as read" }) }),
      /* @__PURE__ */ e.jsx(
        A,
        {
          type: "link",
          size: "small",
          onClick: () => {
            c(!1), a("/inbox");
          },
          children: n("viewAll", { defaultValue: "View all" })
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ e.jsx(ie, { className: t, overlay: v, placement: "bottomRight", open: d, onOpenChange: c, children: /* @__PURE__ */ e.jsx(_t, { count: s, size: "small", overflowCount: 99, children: /* @__PURE__ */ e.jsx(Yt, { style: { marginRight: 4, height: 18, width: 18, fontSize: 18 } }) }) });
}, En = H(({ token: t, css: n }) => ({
  root: n`
    width: 8px;
    align-self: stretch;
    cursor: col-resize;
    position: relative;
    flex-shrink: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${t.colorBorder};
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${t.colorFill};
    }
  `,
  dragging: n`
    background-color: ${t.colorPrimary};
    transition: none;

    &:hover {
      background-color: ${t.colorPrimary};
    }
  `,
  grip: n`
    width: 3px;
    height: 40px;
    border-radius: 2px;
    background-color: ${t.colorTextQuaternary};
    opacity: 0.85;
    transition: opacity 0.2s ease, background-color 0.2s ease;
    pointer-events: none;
  `,
  gripHover: n`
    background-color: ${t.colorBgContainer};
    opacity: 1;
  `,
  gripDragging: n`
    background-color: ${t.colorTextLightSolid};
    opacity: 1;
  `
})), Gr = ({
  onResize: t,
  minWidth: n = 300,
  maxWidth: a = window.innerWidth * 0.5
}) => {
  const { styles: r } = En(), [s, i] = b(!1), [o, l] = b(!1), d = B((m) => {
    m.preventDefault(), i(!0);
  }, []), c = B(
    (m) => {
      if (!s) return;
      const f = window.innerWidth - m.clientX, u = Math.max(n, Math.min(a, f));
      t(u);
    },
    [s, n, a, t]
  ), p = B(() => {
    i(!1);
  }, []);
  return R(() => {
    if (s)
      return document.addEventListener("mousemove", c), document.addEventListener("mouseup", p), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", p), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [s, c, p]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: d,
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1),
      className: D(r.root, s && r.dragging),
      children: /* @__PURE__ */ e.jsx(
        "div",
        {
          className: D(
            r.grip,
            o && r.gripHover,
            s && r.gripDragging
          )
        }
      )
    }
  );
}, ne = 40, Pn = 28, On = 6, at = "ai-chat-float-pos", zn = H(({ token: t, css: n }) => ({
  root: n`
    position: fixed;
    z-index: 1050;
    width: ${ne}px;
    height: ${ne}px;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    appearance: none;
    -webkit-appearance: none;
    touch-action: none;
    user-select: none;
    cursor: grab;
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;

    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      background: transparent;
      outline: none;
      box-shadow: none;
    }

    &:active {
      cursor: grabbing;
    }
  `,
  dragging: n`
    transition: none;
    cursor: grabbing;
    z-index: 1100;
  `,
  docked: n`
    &:hover,
    &:focus-visible {
      transform: translate(0, 0) rotate(0deg) !important;
    }
  `,
  dockLeft: n`
    transform: translateX(calc(-30% - 2px)) rotate(32deg);
  `,
  dockRight: n`
    transform: translateX(calc(30% + 2px)) rotate(-32deg);
  `,
  dockTop: n`
    transform: translateY(calc(-40% - 2px)) rotate(180deg);
  `,
  dockBottom: n`
    transform: translateY(calc(30% + 2px)) rotate(0deg);
  `,
  body: n`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(145deg, ${t.colorPrimaryHover}, ${t.colorPrimary});
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.35);
    overflow: visible;

    &:hover {
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.22), 0 3px 8px rgba(0, 0, 0, 0.12);
    }
  `,
  robot: n`
    width: 32px;
    height: 32px;
    display: block;
    padding-bottom: 5px;
    overflow: visible;
  `,
  eye: n`
    transform-box: fill-box;
    transform-origin: center;
    animation: ai-robot-blink 4.2s infinite;

    &:nth-of-type(2) {
      animation-delay: 0.12s;
    }

    @keyframes ai-robot-blink {
      0%,
      42%,
      48%,
      100% {
        transform: scaleY(1);
      }
      45% {
        transform: scaleY(0.08);
      }
    }
  `
}));
function O(t, n, a) {
  return Math.min(Math.max(t, n), a);
}
function J() {
  return Math.max(0, window.innerWidth - ne);
}
function K() {
  return Math.max(0, window.innerHeight - ne);
}
function ye() {
  const t = J(), n = K();
  return {
    rx: t > 0 ? O((t - 24) / t, 0, 1) : 1,
    ry: n > 0 ? O((n - 24) / n, 0, 1) : 1,
    edge: null
  };
}
function it(t, n, a) {
  let r = O(t, 0, J()), s = O(n, 0, K());
  return a === "left" && (r = 0), a === "right" && (r = J()), a === "top" && (s = 0), a === "bottom" && (s = K()), { x: r, y: s, edge: a };
}
function ot(t) {
  const n = J(), a = K();
  return {
    rx: n > 0 ? O(t.x / n, 0, 1) : 0,
    ry: a > 0 ? O(t.y / a, 0, 1) : 0,
    edge: t.edge
  };
}
function Be(t) {
  return it(t.rx * J(), t.ry * K(), t.edge);
}
function Dn() {
  try {
    const t = localStorage.getItem(at);
    if (!t) return ye();
    const n = JSON.parse(t);
    return typeof n.rx == "number" && typeof n.ry == "number" ? {
      rx: O(n.rx, 0, 1),
      ry: O(n.ry, 0, 1),
      edge: n.edge ?? null
    } : typeof n.x == "number" && typeof n.y == "number" ? ot({
      x: O(n.x, 0, J()),
      y: O(n.y, 0, K()),
      edge: n.edge ?? null
    }) : ye();
  } catch {
    return ye();
  }
}
function He(t) {
  localStorage.setItem(at, JSON.stringify(t));
}
function Mn(t, n) {
  const a = t, r = window.innerWidth - (t + ne), s = n, i = window.innerHeight - (n + ne), o = Math.min(a, r, s, i);
  return o > Pn ? null : o === a ? "left" : o === r ? "right" : o === s ? "top" : "bottom";
}
const Rn = ({
  className: t,
  eyeClassName: n
}) => /* @__PURE__ */ e.jsxs("svg", { className: t, viewBox: "0 0 64 64", "aria-hidden": !0, children: [
  /* @__PURE__ */ e.jsx("circle", { cx: "32", cy: "12", r: "3.2", fill: "rgba(255,255,255,0.9)" }),
  /* @__PURE__ */ e.jsx("rect", { x: "30.4", y: "14", width: "3.2", height: "7", rx: "1.4", fill: "rgba(255,255,255,0.85)" }),
  /* @__PURE__ */ e.jsx("rect", { x: "10", y: "22", width: "44", height: "34", rx: "14", fill: "rgba(255,255,255,0.95)" }),
  /* @__PURE__ */ e.jsx("rect", { x: "16", y: "28", width: "32", height: "18", rx: "9", fill: "rgba(0,0,0,0.12)" }),
  /* @__PURE__ */ e.jsx("ellipse", { className: n, cx: "25", cy: "37", rx: "4.2", ry: "5", fill: "#1f2937" }),
  /* @__PURE__ */ e.jsx("ellipse", { className: n, cx: "39", cy: "37", rx: "4.2", ry: "5", fill: "#1f2937" }),
  /* @__PURE__ */ e.jsx("circle", { cx: "26.2", cy: "35.5", r: "1.2", fill: "#fff" }),
  /* @__PURE__ */ e.jsx("circle", { cx: "40.2", cy: "35.5", r: "1.2", fill: "#fff" }),
  /* @__PURE__ */ e.jsx(
    "path",
    {
      d: "M26 48c2.2 2.4 9.8 2.4 12 0",
      stroke: "#1f2937",
      strokeWidth: "2.2",
      strokeLinecap: "round",
      fill: "none"
    }
  ),
  /* @__PURE__ */ e.jsx("rect", { x: "4", y: "34", width: "7", height: "10", rx: "3.5", fill: "rgba(255,255,255,0.9)" }),
  /* @__PURE__ */ e.jsx("rect", { x: "53", y: "34", width: "7", height: "10", rx: "3.5", fill: "rgba(255,255,255,0.9)" })
] }), Qr = ({ icon: t }) => {
  const { styles: n } = zn(), { setVisible: a, visible: r } = bt(), { t: s } = L("ai"), i = Y(
    typeof window > "u" ? { rx: 1, ry: 1, edge: null } : Dn()
  ), [o, l] = b(
    () => typeof window > "u" ? { x: 0, y: 0, edge: null } : Be(i.current)
  ), [d, c] = b(!1), p = Y(null), m = Y(o);
  m.current = o;
  const f = !d && o.edge === "left" ? n.dockLeft : !d && o.edge === "right" ? n.dockRight : !d && o.edge === "top" ? n.dockTop : !d && o.edge === "bottom" ? n.dockBottom : void 0, u = B((x) => {
    const g = ot(x);
    i.current = g, He(g), l(x);
  }, []), h = B(() => {
    p.current || l(Be(i.current));
  }, []);
  R(() => (He(i.current), window.addEventListener("resize", h), () => window.removeEventListener("resize", h)), [h]);
  const v = (x) => {
    x.button === 0 && (x.currentTarget.setPointerCapture(x.pointerId), p.current = {
      pointerId: x.pointerId,
      startX: x.clientX,
      startY: x.clientY,
      originX: m.current.x,
      originY: m.current.y,
      moved: !1
    }, c(!0));
  }, S = (x) => {
    const g = p.current;
    if (!g || g.pointerId !== x.pointerId) return;
    const w = x.clientX - g.startX, y = x.clientY - g.startY;
    !g.moved && Math.hypot(w, y) > On && (g.moved = !0), l({
      x: O(g.originX + w, 0, J()),
      y: O(g.originY + y, 0, K()),
      edge: null
    });
  }, j = (x) => {
    const g = p.current;
    if (!g || g.pointerId !== x.pointerId) return;
    try {
      x.currentTarget.releasePointerCapture(x.pointerId);
    } catch {
    }
    const w = !g.moved;
    if (p.current = null, c(!1), w) {
      a(!0);
      return;
    }
    const y = Mn(m.current.x, m.current.y);
    u(it(m.current.x, m.current.y, y));
  };
  return r ? null : ln(
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: s("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
        placement: "left",
        mouseEnterDelay: 0.4,
        open: d ? !1 : void 0,
        children: /* @__PURE__ */ e.jsx(
          "button",
          {
            type: "button",
            "aria-label": s("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
            className: D(
              "ai-chat-float-button",
              n.root,
              d && n.dragging,
              !d && o.edge && n.docked,
              f
            ),
            style: { left: o.x, top: o.y },
            onPointerDown: v,
            onPointerMove: S,
            onPointerUp: j,
            onPointerCancel: j,
            children: t ?? /* @__PURE__ */ e.jsx("span", { className: n.body, children: /* @__PURE__ */ e.jsx(Rn, { className: n.robot, eyeClassName: n.eye }) })
          }
        )
      }
    ),
    document.body
  );
}, Zr = ({
  className: t
}) => {
  const { t: n } = L("common"), { themeMode: a, setThemeMode: r } = Rt();
  return /* @__PURE__ */ e.jsx(
    ie,
    {
      className: t,
      menu: {
        items: [
          { key: "light", label: /* @__PURE__ */ e.jsxs("span", { children: [
            /* @__PURE__ */ e.jsx(Me, {}),
            " ",
            n("light", { defaultValue: "Light Mode" })
          ] }) },
          { key: "dark", label: /* @__PURE__ */ e.jsxs("span", { children: [
            /* @__PURE__ */ e.jsx(Re, {}),
            " ",
            n("dark", { defaultValue: "Dark Mode" })
          ] }) }
        ],
        onClick: ({ key: s }) => {
          r(s);
        },
        selectedKeys: [a]
      },
      children: a === "light" ? /* @__PURE__ */ e.jsx(Me, {}) : /* @__PURE__ */ e.jsx(Re, {})
    },
    "theme-switch"
  );
}, lt = ({
  permission: t,
  permissions: n = [],
  checkAll: a = !1,
  fallback: r = null,
  children: s
}) => {
  const { hasPermission: i, hasAnyPermission: o, hasAllPermissions: l, isAdmin: d, loading: c } = Ae();
  return c ? null : d ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : t ? i(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : n.length > 0 ? (a ? l(n) : o(n)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s });
}, es = ({
  fallback: t = null,
  children: n
}) => {
  const { isAdmin: a, loading: r } = Ae();
  return r ? null : a ? /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, Ue = (t) => {
  const [n, a] = b(!1), { permission: r, icon: s, tooltip: i, onClick: o, confirm: l, label: d, ...c } = t, p = !!c.disabled, [m, f] = b(!1), u = o ? async () => {
    a(!0);
    try {
      await o();
    } finally {
      a(!1), f(!1);
    }
  } : void 0;
  let h = /* @__PURE__ */ e.jsx(
    A,
    {
      type: "link",
      size: "small",
      loading: n,
      icon: s,
      onClick: l && !p ? void 0 : u,
      ...c,
      children: d && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: d })
    }
  );
  if (l && !p) {
    const v = async () => {
      l.onConfirm ? await l.onConfirm() : u && await u();
    };
    h = /* @__PURE__ */ e.jsx(
      me,
      {
        title: l.title,
        description: l.description,
        onConfirm: v,
        okText: l.okText,
        cancelText: l.cancelText,
        children: h
      }
    );
  }
  return i && (h = p ? /* @__PURE__ */ e.jsx(ae, { title: i, open: m, onOpenChange: f, children: /* @__PURE__ */ e.jsx("span", { style: { display: "inline-block", cursor: "not-allowed" }, children: h }) }) : /* @__PURE__ */ e.jsx(ae, { title: i, open: m, onOpenChange: f, children: h })), r && (h = /* @__PURE__ */ e.jsx(lt, { permission: r, children: h })), h;
}, ts = ({ actions: t, maxVisibleItems: n }) => {
  const { modal: a } = X.useApp(), r = t.filter((l) => !l.hidden);
  if (!n || r.length <= n)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: r.map(({ key: l, ...d }) => /* @__PURE__ */ e.jsx(Ue, { ...d }, l)) });
  const s = r.slice(0, n - 1), o = r.slice(n - 1).map((l) => {
    const { key: d, label: c, icon: p, permission: m, onClick: f, confirm: u, disabled: h, tooltip: v } = l, j = {
      key: d,
      label: c,
      icon: p,
      disabled: h,
      onClick: async () => {
        u ? a.confirm({
          title: u.title,
          content: u.description,
          onOk: u.onConfirm || f,
          okText: u.okText,
          cancelText: u.cancelText
        }) : f && await f();
      }
    };
    return m ? {
      ...j,
      label: /* @__PURE__ */ e.jsx(lt, { permission: m, children: /* @__PURE__ */ e.jsx("span", { children: c ?? v }) })
    } : j;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    s.map(({ key: l, ...d }) => /* @__PURE__ */ e.jsx(Ue, { ...d }, l)),
    /* @__PURE__ */ e.jsx(Ge, { menu: { items: o }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(A, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(Jt, {}) }) })
  ] });
}, Nn = $t, $n = (t) => Nn[t], ns = ({ iconName: t }) => {
  if (!t)
    return null;
  const n = $n(t);
  return n ? /* @__PURE__ */ e.jsx(an, { fallback: null, children: /* @__PURE__ */ e.jsx(n, {}) }) : null;
}, rs = ({ onChange: t }) => {
  const [n, a] = b(""), [r, s] = b("");
  return /* @__PURE__ */ e.jsxs(E.Compact, { children: [
    /* @__PURE__ */ e.jsx(V, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (i) => a(i.target.value) }),
    /* @__PURE__ */ e.jsx(V, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(V, { style: { width: "calc(100% - 80px)" }, value: r, onChange: (i) => s(i.target.value) }),
    /* @__PURE__ */ e.jsx(A, { type: "primary", icon: /* @__PURE__ */ e.jsx(Kt, {}), onClick: () => {
      t(n, r);
    } })
  ] });
}, Bn = ({ request: t, tableRef: n, ...a }, r) => {
  const [s, i] = b({
    current: 1,
    pageSize: 10
  }), [o, l] = b(0), { data: d, loading: c, refresh: p } = _(async () => {
    const m = await t({
      current: s.current,
      page_size: s.pageSize
    });
    return l(m.total), m.data;
  }, {
    refreshDeps: [s]
  });
  return rt(r, () => ({
    reload: () => {
      p();
    }
  })), /* @__PURE__ */ e.jsx(
    Fe,
    {
      rowKey: "id",
      loading: c,
      dataSource: d ?? [],
      pagination: {
        ...s,
        total: o,
        onChange: (m, f) => {
          i({ current: m, pageSize: f });
        }
      },
      ...a,
      ref: n
    }
  );
}, ss = ({ actionRef: t, ...n }) => {
  const [a, r] = b();
  return R(() => {
    r(on(Bn));
  }, []), a ? /* @__PURE__ */ e.jsx(a, { ...n, ref: t }) : null;
}, as = ({ className: t, onSuccess: n, token: a }) => {
  const { message: r } = X.useApp(), { t: s } = L("authorization"), { t: i } = L("common"), [o] = C.useForm(), { run: l, loading: d } = _(async (c) => T.authorization.changePassword(c, a ? { headers: { Authorization: `Bearer ${a}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      r.success(s("user.passwordChanged")), o.resetFields(), n == null || n();
    },
    onError: (c) => {
      if (c instanceof cn) {
        const p = c.code ?? "normal";
        r.error(s(`user.passwordChangeFailed.${p}`, { error: c.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        r.error(s("user.passwordChangeFailed.normal", { error: c.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", c);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    C,
    {
      form: o,
      layout: "vertical",
      onFinish: l,
      style: { maxWidth: 500, margin: "0 auto" },
      className: D("profile-password", t),
      children: [
        /* @__PURE__ */ e.jsx(
          C.Item,
          {
            name: "old_password",
            label: s("user.oldPassword"),
            rules: [{ required: !0, message: s("validation.oldPasswordRequired") }],
            className: D("profile-password-item", "profile-password-item-old-password"),
            children: /* @__PURE__ */ e.jsx(V.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          C.Item,
          {
            name: "new_password",
            label: s("user.newPassword"),
            rules: [
              { required: !0, message: s("validation.newPasswordRequired") },
              { min: 8, message: s("validation.passwordMinLength") }
            ],
            className: D("profile-password-item", "profile-password-item-new-password"),
            children: /* @__PURE__ */ e.jsx(V.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          C.Item,
          {
            name: "confirm_password",
            label: s("user.confirmPassword"),
            className: D("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: s("validation.confirmPasswordRequired") },
              ({ getFieldValue: c }) => ({
                validator(p, m) {
                  return !m || c("new_password") === m ? Promise.resolve() : Promise.reject(new Error(s("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(V.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(C.Item, { className: D("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(A, { type: "primary", htmlType: "submit", loading: d, children: i("save") }) })
      ]
    }
  );
}, is = ({ user: t, onSuccess: n }) => {
  const { message: a } = X.useApp(), { t: r } = L("authorization"), { t: s } = L("common"), [i] = C.useForm(), [o, l] = b(!1);
  nt.useEffect(() => {
    t && i.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, i]);
  const d = async (c) => {
    try {
      l(!0), await T.authorization.updateCurrentUser(c), a.success(s("updateSuccess")), n();
    } catch (p) {
      a.error(s("updateFailed")), console.error("Failed to update user information:", p);
    } finally {
      l(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }),
      (t == null ? void 0 : t.roles) && t.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        r("user.roles"),
        ": ",
        t.roles.map((c) => c.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      C,
      {
        form: i,
        layout: "vertical",
        onFinish: d,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            C.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(Fn, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            C.Item,
            {
              name: "username",
              label: r("user.username"),
              children: /* @__PURE__ */ e.jsx(V, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            C.Item,
            {
              name: "email",
              label: r("user.email"),
              rules: [
                { required: !0, message: r("validation.emailRequired") },
                { type: "email", message: r("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(V, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            C.Item,
            {
              name: "full_name",
              label: r("user.fullName"),
              rules: [{ required: !0, message: r("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(V, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            C.Item,
            {
              name: "phone",
              label: r("user.phone"),
              children: /* @__PURE__ */ e.jsx(V, {})
            }
          ),
          /* @__PURE__ */ e.jsx(C.Item, { children: /* @__PURE__ */ e.jsx(A, { type: "primary", htmlType: "submit", loading: o, children: s("save") }) })
        ]
      }
    )
  ] });
}, os = ({ user: t, onSuccess: n }) => {
  const { message: a } = X.useApp(), { t: r } = L("authorization"), { t: s } = L("common"), [i, o] = b(0), [l, d] = b(!1), [c, p] = b(!0), [m, f] = b(""), [u, h] = b("totp"), [v, S] = b(!1), [j, x] = b("password"), [g, w] = b(""), [y, I] = b(""), [F, N] = b(""), [oe, re] = b(""), [U, G] = b(0);
  R(() => {
    if (U <= 0) return;
    const k = setTimeout(() => G((P) => P - 1), 1e3);
    return () => clearTimeout(k);
  }, [U]);
  const { run: le, data: q = { secret: "", qr_code: "", token: void 0 } } = _(
    () => T.authorization.enableMfa({ mfa_type: u }),
    {
      manual: !0,
      onSuccess: () => {
        o(1);
      },
      onBefore: () => {
        d(!0);
      },
      onFinally: () => {
        d(!1);
      }
    }
  ), $ = async () => {
    if (!m) {
      a.warning(r("mfa.enterVerificationCode"));
      return;
    }
    const k = {
      code: m,
      mfa_type: u
    };
    "token" in q && (k.token = q.token);
    try {
      d(!0), await T.authorization.verifyAndActivateMfa(k), a.success(r("mfa.enableSuccess")), o(2), n();
    } catch (P) {
      a.error(r("mfa.verificationFailed")), console.error("Failed to verify MFA:", P);
    } finally {
      d(!1);
    }
  }, M = () => {
    S(!1), x("password"), w(""), I(""), N(""), re(""), G(0);
  }, { runAsync: fe, loading: ce } = _(
    () => T.authorization.sendDisableMfaCode(),
    { manual: !0 }
  ), ht = async () => {
    try {
      const k = await fe();
      re((k == null ? void 0 : k.token) ?? ""), N(""), G(60), a.success(r("mfa.codeSent", { defaultValue: "Verification code has been sent to your email" }));
    } catch (k) {
      a.error(k instanceof Error ? k.message : s("operationFailed")), console.error("Failed to send disable-MFA code:", k);
    }
  }, de = async () => {
    if (j === "email") {
      if (!oe) {
        a.warning(r("mfa.sendCodeFirst", { defaultValue: "Please send the verification code first" }));
        return;
      }
      if (!F) {
        a.warning(r("mfa.enterVerificationCode"));
        return;
      }
    } else if (j === "totp") {
      if (!y) {
        a.warning(r("mfa.enterVerificationCode"));
        return;
      }
    } else if (!g) {
      a.warning(r("mfa.enterPassword", { defaultValue: "Enter your password" }));
      return;
    }
    const k = { password: "", mfa_code: "", email_code: "", email_token: "" };
    j === "email" ? (k.email_code = F, k.email_token = oe) : j === "totp" ? k.mfa_code = y : k.password = g;
    try {
      d(!0), await T.authorization.disableMfa(k), a.success(r("mfa.disableSuccess")), M(), n();
    } catch (P) {
      a.error(P instanceof Error ? P.message : s("operationFailed")), console.error("Failed to disable MFA:", P), j === "email" && (re(""), N(""), G(0));
    } finally {
      d(!1);
    }
  }, gt = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        Se,
        {
          status: "success",
          title: r("mfa.enabled"),
          subTitle: r("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(A, { danger: !0, onClick: () => S(!0), children: r("mfa.disable") })
        }
      );
    const k = () => {
      var P;
      switch (i) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              ue,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: r("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: r(u === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
                ] }),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20 }
              }
            ),
            /* @__PURE__ */ e.jsx(
              A,
              {
                type: "primary",
                onClick: le,
                loading: l,
                children: r("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              ue,
              {
                message: r("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: u === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: u === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(Pt, { value: q.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: u === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              r("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: u === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              r("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: c ? "*".repeat(((P = q.secret) == null ? void 0 : P.length) ?? 0) : q.secret }),
              /* @__PURE__ */ e.jsx(
                A,
                {
                  type: "link",
                  onClick: () => p(!c),
                  icon: c ? /* @__PURE__ */ e.jsx(tt, {}) : /* @__PURE__ */ e.jsx(Qt, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              V,
              {
                placeholder: r("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: m,
                onChange: (xt) => f(xt.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(E, { children: [
              /* @__PURE__ */ e.jsx(A, { onClick: () => o(0), children: s("previous") }),
              /* @__PURE__ */ e.jsx(
                A,
                {
                  type: "primary",
                  onClick: $,
                  loading: l,
                  children: s("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            Se,
            {
              status: "success",
              title: r("mfa.setupSuccess"),
              subTitle: r("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(A, { type: "primary", onClick: () => o(0), children: s("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: i === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          Oe,
          {
            defaultValue: "totp",
            onChange: (P) => {
              h(P), o(0);
            },
            value: u,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Xt, {}), label: r("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Gt, {}), label: r("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(Ze, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Et,
        {
          current: i,
          items: [
            { title: r(u === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: r(u === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: r(u === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: r(u === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: r(u === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: r(u === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      k()
    ] });
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 8 }, children: [
    gt(),
    /* @__PURE__ */ e.jsxs(
      Qe,
      {
        title: r("mfa.confirmDisable"),
        open: v,
        onOk: de,
        okText: r("mfa.disable"),
        okButtonProps: { danger: !0, loading: l },
        onCancel: M,
        destroyOnHidden: !0,
        children: [
          /* @__PURE__ */ e.jsx(
            ue,
            {
              message: r("mfa.disableWarning"),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          /* @__PURE__ */ e.jsx("p", { children: r("mfa.disableVerifyDescription", { defaultValue: "For security reasons, please verify your identity with your password or a verification code." }) }),
          /* @__PURE__ */ e.jsx(
            Oe,
            {
              block: !0,
              value: j,
              onChange: (k) => x(k),
              options: [
                { value: "password", label: r("mfa.methodPassword", { defaultValue: "Password" }) },
                ...(t == null ? void 0 : t.mfa_type) === "totp" ? [{ value: "totp", label: r("mfa.totp", { defaultValue: "TOTP" }) }] : [],
                { value: "email", label: r("mfa.methodEmailCode", { defaultValue: "Email code" }) }
              ],
              style: { marginBottom: 16 }
            }
          ),
          j === "password" && /* @__PURE__ */ e.jsx(
            V.Password,
            {
              placeholder: r("mfa.enterPassword", { defaultValue: "Enter your password" }),
              autoComplete: "current-password",
              value: g,
              onChange: (k) => w(k.target.value),
              onPressEnter: de
            }
          ),
          j === "totp" && /* @__PURE__ */ e.jsx(
            V,
            {
              placeholder: r("mfa.enterTotpCode", { defaultValue: "Enter the 6-digit code from your authenticator app" }),
              maxLength: 6,
              value: y,
              onChange: (k) => I(k.target.value),
              onPressEnter: de
            }
          ),
          j === "email" && /* @__PURE__ */ e.jsxs(E.Compact, { style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(
              V,
              {
                placeholder: r("mfa.enterEmailCode", { defaultValue: "Enter the 6-digit code sent to your email" }),
                maxLength: 6,
                value: F,
                onChange: (k) => N(k.target.value),
                onPressEnter: de
              }
            ),
            /* @__PURE__ */ e.jsx(
              A,
              {
                onClick: ht,
                loading: ce,
                disabled: U > 0,
                children: U > 0 ? r("mfa.resendIn", { defaultValue: "Resend ({{seconds}}s)", seconds: U }) : r("mfa.sendCode", { defaultValue: "Send code" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}, { Text: be } = z, ls = () => {
  const { message: t } = X.useApp(), { t: n } = L("authorization"), { t: a } = L("common"), [r, s] = b(null), [i, o] = b(!1), { data: l = [], loading: d, run: c } = _(() => T.authorization.getUserSessions({}), {
    onError: (u) => {
      t.error(n("session.getSessionsFailed", { error: u, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: p } = _((u) => T.authorization.terminateSession({ id: u }), {
    onSuccess: () => {
      t.success(n("session.terminateSuccess", { defaultValue: "Session terminated successfully" })), c();
    },
    onError: (u) => {
      t.error(n("session.terminateFailed", { error: u, defaultValue: "Failed to terminate session: {{error}}" }));
    },
    onFinally: () => {
      s(null);
    },
    onBefore: ([u]) => {
      s(u);
    },
    manual: !0
  }), { run: m } = _(() => T.authorization.terminateOtherSessions(), {
    onSuccess: () => {
      t.success(n("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" })), c();
    },
    onError: (u) => {
      t.error(n("session.terminateAllFailed", { error: u, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    },
    onFinally: () => {
      o(!1);
    },
    onBefore: () => {
      o(!0);
    },
    manual: !0
  }), f = [
    {
      title: n("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (u, h) => /* @__PURE__ */ e.jsxs(E, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(E, { children: [
          /* @__PURE__ */ e.jsx(Zt, {}),
          /* @__PURE__ */ e.jsx(be, { strong: !0, children: u })
        ] }),
        /* @__PURE__ */ e.jsxs(E, { children: [
          /* @__PURE__ */ e.jsx(en, {}),
          /* @__PURE__ */ e.jsx(be, { type: "secondary", children: h.location })
        ] })
      ] })
    },
    {
      title: n("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (u) => /* @__PURE__ */ e.jsxs(E, { children: [
        /* @__PURE__ */ e.jsx(tn, {}),
        /* @__PURE__ */ e.jsx("span", { children: u })
      ] })
    },
    {
      title: n("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (u) => /* @__PURE__ */ e.jsxs(E, { children: [
        /* @__PURE__ */ e.jsx(nn, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(u).toLocaleString() })
      ] })
    },
    {
      title: n("session.status"),
      key: "status",
      render: (u) => u.is_current ? /* @__PURE__ */ e.jsx(Z, { color: "green", children: n("session.current") }) : /* @__PURE__ */ e.jsx(Z, { color: "blue", children: n("session.active") })
    },
    {
      title: a("actions"),
      key: "action",
      render: (u) => u.is_current ? /* @__PURE__ */ e.jsx(be, { type: "secondary", children: n("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        me,
        {
          title: n("session.confirmTerminate"),
          onConfirm: () => p(u.id),
          okText: a("confirm"),
          cancelText: a("cancel"),
          children: /* @__PURE__ */ e.jsx(
            A,
            {
              type: "link",
              danger: !0,
              loading: r === u.id,
              children: n("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(E, { direction: "vertical", style: { padding: 8, width: "100%" }, children: [
    /* @__PURE__ */ e.jsxs(E, { direction: "horizontal", style: { float: "right" }, children: [
      l.length > 1 && /* @__PURE__ */ e.jsx(
        me,
        {
          title: n("session.confirmTerminateAll"),
          onConfirm: m,
          okText: a("confirm"),
          cancelText: a("cancel"),
          children: /* @__PURE__ */ e.jsx(
            A,
            {
              danger: !0,
              loading: i,
              children: n("session.terminateOthers")
            }
          )
        }
      ),
      /* @__PURE__ */ e.jsx(A, { onClick: () => c(), loading: d, children: a("refresh") })
    ] }),
    !d && l.length === 0 ? /* @__PURE__ */ e.jsx(et, { description: n("session.noSessions") }) : /* @__PURE__ */ e.jsx(
      Fe,
      {
        columns: f,
        dataSource: l,
        rowKey: "id",
        loading: d,
        pagination: !1
      }
    )
  ] });
}, { RangePicker: Hn } = zt, { Option: Q } = ee, Un = (t) => t || "N/A", qn = (t, n) => t === "success" ? /* @__PURE__ */ e.jsx(Z, { color: "success", children: n("statuses.success") }) : /* @__PURE__ */ e.jsx(Z, { color: "error", children: n("statuses.failed") }), cs = ({
  userId: t,
  request: n = (r) => t ? T.authorization.getUserLogs({ id: t, ...r }) : T.authorization.getCurrentUserLogs(r),
  columnsFilter: a = (r) => r
}) => {
  const { message: r, modal: s } = X.useApp(), { t: i } = L("authorization"), { t: o } = L("common"), [l, d] = b({
    current: 1,
    pageSize: 10,
    total: 0
  }), [c, p] = b({}), [m] = C.useForm(), { loading: f, run: u, data: { data: h } = {} } = _(async (g = c, w = 1, y = 10) => n({
    ...g,
    current: w ?? 1,
    page_size: y ?? 10
  }), {
    onError(g) {
      r.error(i("auditLog.fetchFailed", { error: g }));
    },
    onSuccess({ total: g }) {
      d({
        ...l,
        total: g
      });
    }
  });
  R(() => {
    u(c, 1, l.pageSize);
  }, []);
  const v = (g) => {
    d({
      ...l,
      current: g.current || 1,
      pageSize: g.pageSize || 10
    }), u({}, g.current, g.pageSize);
  }, S = (g) => {
    var w, y, I, F;
    u({
      ...g,
      start_time: (y = (w = g.dateRange) == null ? void 0 : w[0]) == null ? void 0 : y.toISOString(),
      end_time: (F = (I = g.dateRange) == null ? void 0 : I[1]) == null ? void 0 : F.toISOString()
    }, 1, l.pageSize);
  }, j = () => {
    m.resetFields(), p({}), d({ ...l, current: 1 }), u({}, 1, l.pageSize);
  }, x = [
    {
      title: i("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (g) => kt(g)
    },
    {
      title: i("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (g, w) => g ? i(`action.${g.replace(/:/g, ".")}`, { defaultValue: i(`permission.title.${g.replace(/:/g, ".")}`, { defaultValue: w.action_name }) }) : w.action_name ?? w.action
    },
    {
      title: i("auditLog.user_agent"),
      dataIndex: "user_agent",
      key: "user_agent"
    },
    {
      title: i("auditLog.ip"),
      dataIndex: "ip",
      key: "ip",
      render: (g) => Un(g)
    },
    {
      title: i("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (g) => qn(g, i)
    },
    {
      title: i("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (g) => /* @__PURE__ */ e.jsx(A, { type: "link", icon: /* @__PURE__ */ e.jsx(tt, {}), onClick: () => {
        s.info({
          title: i("auditLog.details"),
          content: JSON.stringify(g)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(Ce, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      C,
      {
        form: m,
        layout: "horizontal",
        onFinish: S,
        initialValues: c,
        children: /* @__PURE__ */ e.jsxs(Ot, { gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(se, { xxl: 6, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(C.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(V, { placeholder: i("auditLog.searchPlaceholder") }) }) }),
          /* @__PURE__ */ e.jsx(se, { xxl: 4, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(C.Item, { name: "action", noStyle: !0, children: /* @__PURE__ */ e.jsxs(ee, { allowClear: !0, placeholder: i("auditLog.selectAction"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(Q, { value: "login", children: i("actions.login") }),
            /* @__PURE__ */ e.jsx(Q, { value: "logout", children: i("actions.logout") }),
            /* @__PURE__ */ e.jsx(Q, { value: "password_reset", children: i("actions.passwordReset") }),
            /* @__PURE__ */ e.jsx(Q, { value: "mfa_change", children: i("actions.mfaChange") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(se, { xxl: 3, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(C.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(ee, { allowClear: !0, placeholder: i("auditLog.selectStatus"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(Q, { value: "success", children: i("statuses.success") }),
            /* @__PURE__ */ e.jsx(Q, { value: "failed", children: i("statuses.failed") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(se, { xxl: 6, xl: 6, lg: 10, md: 12, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(C.Item, { name: "dateRange", noStyle: !0, children: /* @__PURE__ */ e.jsx(Hn, { style: { width: "100%" } }) }) }),
          /* @__PURE__ */ e.jsx(se, { xxl: 5, xl: 24, lg: 14, md: 24, sm: 24, xs: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(E, { children: [
            /* @__PURE__ */ e.jsx(A, { onClick: j, children: o("reset") }),
            /* @__PURE__ */ e.jsx(A, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(rn, {}), children: o("search") })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(Ce, { children: /* @__PURE__ */ e.jsx(
      Fe,
      {
        rowKey: "id",
        columns: a(x),
        dataSource: h,
        pagination: {
          ...l,
          showSizeChanger: !0,
          showTotal: (g) => o("totalItems", { total: g })
        },
        loading: f,
        onChange: v,
        scroll: { x: "max-content" }
      }
    ) })
  ] });
}, { Text: Wn } = z, ds = ({ kind: t, subjectId: n, readOnly: a }) => {
  const { message: r } = X.useApp(), { t: s } = L("authorization"), { t: i } = L("common"), [o] = C.useForm(), l = t === "user" ? T.authorization.getUserRateLimit : T.authorization.getServiceAccountRateLimit, d = t === "user" ? T.authorization.updateUserRateLimit : T.authorization.updateServiceAccountRateLimit, { data: c, loading: p, refresh: m } = _(() => l({ id: n }), {
    ready: !!n,
    refreshDeps: [n, t],
    onSuccess: (x) => {
      o.setFieldsValue({
        rate: x.rate,
        period: x.period || "1m",
        burst: x.burst,
        quota: x.quota,
        quota_period: x.quota_period || "1d",
        enabled: x.enabled !== !1
      });
    }
  }), { run: f, loading: u } = _(
    async (x) => d({ id: n }, {
      ...x,
      clear: !1,
      inherited: !1,
      enabled: x.enabled !== !1
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("rateLimit.saveSuccess", { defaultValue: "Rate limit override saved" })), m();
      },
      onError: (x) => {
        r.error(x.message || s("rateLimit.saveFailed", { defaultValue: "Failed to save override" }));
      }
    }
  ), { run: h, loading: v } = _(
    async () => d({ id: n }, {
      clear: !0,
      rate: 0,
      burst: 0,
      quota: 0,
      period: "",
      quota_period: "",
      enabled: !1,
      inherited: !0
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("rateLimit.resetSuccess", { defaultValue: "Override cleared; type default restored" })), m();
      },
      onError: (x) => {
        r.error(x.message);
      }
    }
  ), { run: S, loading: j } = _(
    async () => t === "user" ? T.authorization.resetUserRateLimit({ id: n }) : T.authorization.resetServiceAccountRateLimit({ id: n }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("rateLimit.resetCountersSuccess", { defaultValue: "Counters reset" }));
      },
      onError: (x) => {
        r.error(x.message);
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(C, { form: o, layout: "vertical", onFinish: f, disabled: a || p, style: { maxWidth: 480, marginTop: 16 }, children: [
    (c == null ? void 0 : c.inherited) && /* @__PURE__ */ e.jsx(
      ue,
      {
        type: "info",
        showIcon: !0,
        style: { marginBottom: 16 },
        message: s("rateLimit.inherited", { defaultValue: "Using the type default. Save to create a subject-specific override." })
      }
    ),
    /* @__PURE__ */ e.jsx(C.Item, { name: "rate", label: s("rateLimit.rate", { defaultValue: "Rate" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(he, { min: 1, style: { width: "100%" } }) }),
    /* @__PURE__ */ e.jsx(C.Item, { name: "period", label: s("rateLimit.period", { defaultValue: "Period" }), extra: s("rateLimit.periodHint", { defaultValue: "Examples: 1s, 1m, 1h" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: "1m" }) }),
    /* @__PURE__ */ e.jsx(C.Item, { name: "burst", label: s("rateLimit.burst", { defaultValue: "Burst" }), children: /* @__PURE__ */ e.jsx(he, { min: 1, style: { width: "100%" } }) }),
    /* @__PURE__ */ e.jsx(C.Item, { name: "quota", label: s("rateLimit.quota", { defaultValue: "Daily quota (0 = none)" }), children: /* @__PURE__ */ e.jsx(he, { min: 0, style: { width: "100%" } }) }),
    /* @__PURE__ */ e.jsx(C.Item, { name: "quota_period", label: s("rateLimit.quotaPeriod", { defaultValue: "Quota period" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: "1d" }) }),
    /* @__PURE__ */ e.jsx(
      C.Item,
      {
        name: "enabled",
        label: s("rateLimit.enabled", { defaultValue: "Enabled" }),
        valuePropName: "checked",
        extra: s("rateLimit.enabledHint", { defaultValue: "Off: this override is ignored and the type default applies. Use Reset to default to delete the override." }),
        children: /* @__PURE__ */ e.jsx(Dt, {})
      }
    ),
    !a && /* @__PURE__ */ e.jsxs(E, { children: [
      /* @__PURE__ */ e.jsx(A, { type: "primary", htmlType: "submit", loading: u, children: i("save", { defaultValue: "Save" }) }),
      /* @__PURE__ */ e.jsx(
        me,
        {
          title: s("rateLimit.resetCountersConfirm", { defaultValue: "Reset rate-limit and quota counters for this subject? They will be able to send requests immediately." }),
          onConfirm: () => S(),
          children: /* @__PURE__ */ e.jsx(A, { htmlType: "button", icon: /* @__PURE__ */ e.jsx(sn, {}), loading: j, children: s("rateLimit.resetCounters", { defaultValue: "Reset counters" }) })
        }
      ),
      !(c != null && c.inherited) && /* @__PURE__ */ e.jsx(A, { onClick: () => h(), loading: v, children: s("rateLimit.resetToDefault", { defaultValue: "Reset to default" }) })
    ] }),
    (c == null ? void 0 : c.inherited) && /* @__PURE__ */ e.jsx(Wn, { type: "secondary", children: s("rateLimit.sourceHint", { defaultValue: "Values shown are inherited." }) })
  ] });
}, { Text: qe } = z, Yn = {
  debug: "default",
  info: "processing",
  warn: "warning",
  error: "error"
}, us = ({ taskId: t, poll: n }) => {
  const { t: a } = L("task"), { data: r = [], loading: s } = _(
    () => t ? T.tasks.getTaskLogs({ id: t }) : Promise.reject(new Error("No task id")),
    {
      refreshDeps: [t],
      ready: !!t,
      pollingInterval: n ? 2e3 : 0
    }
  );
  return /* @__PURE__ */ e.jsx(
    Ce,
    {
      title: a("logsTitle", { defaultValue: "Task logs" }),
      size: "small",
      style: { marginTop: 16 },
      children: s && !r.length ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 24 }, children: /* @__PURE__ */ e.jsx(Ie, {}) }) : r.length ? /* @__PURE__ */ e.jsx(
        "pre",
        {
          style: {
            margin: 0,
            padding: 12,
            maxHeight: 320,
            overflow: "auto",
            fontSize: 12,
            background: "var(--ant-colorFillTertiary)",
            borderRadius: 6,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all"
          },
          children: r.map((i) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 4 }, children: [
            /* @__PURE__ */ e.jsx(qe, { type: "secondary", style: { fontSize: 11 }, children: i.created_at }),
            i.level && /* @__PURE__ */ e.jsxs(qe, { type: Yn[i.level], style: { marginLeft: 8, fontSize: 11 }, children: [
              "[",
              i.level,
              "]"
            ] }),
            /* @__PURE__ */ e.jsx("div", { style: { display: "inline", marginLeft: 8 }, children: i.message })
          ] }, i.id))
        }
      ) : /* @__PURE__ */ e.jsx(et, { description: a("noLogs", { defaultValue: "No logs yet." }) })
    }
  );
}, Jn = H(({ token: t, css: n }) => ({
  wrap: n`
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 1px solid ${t.colorBorderSecondary};
    border-radius: ${t.borderRadiusLG}px;
    background: ${t.colorFillAlter};
  `,
  header: n`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px 8px;
    min-width: 0;
    margin-bottom: 4px;
  `,
  title: n`
    font-weight: 600;
    line-height: 1.4;
    word-break: break-word;
  `,
  description: n`
    font-size: 13px;
    line-height: 1.45;
    color: ${t.colorTextSecondary};
    word-break: break-word;
  `,
  toolName: n`
    font-size: 12px;
    font-weight: 400;
    word-break: break-all;
  `,
  arguments: n`
    .ant-collapse-header {
      padding-inline: 0 !important;
      padding-block: 4px !important;
    }
    .ant-collapse-content-box {
      padding-inline: 0 !important;
      padding-block: 4px 0 !important;
    }
  `,
  argsPre: n`
    margin: 0;
    max-height: 160px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 12px;
    line-height: 1.45;
  `,
  actions: n`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `,
  action: n`
    height: auto;
    min-height: 32px;
    padding-block: 4px;
    padding-inline: 12px;
    white-space: normal;
    text-align: left;
  `
}));
function Kn(t) {
  const n = t.trim();
  if (!n)
    return "";
  try {
    return JSON.stringify(JSON.parse(n), null, 2);
  } catch {
    return n;
  }
}
function Xn(t) {
  const n = t.description;
  if (typeof n == "string" && n.trim())
    return n.trim();
  try {
    const a = JSON.parse(t.arguments || "{}");
    return typeof a.description == "string" ? a.description.trim() : "";
  } catch {
    return "";
  }
}
function ct(t, n) {
  return t ? t.id === "approve" ? n("chat.hitlExecute", { defaultValue: t.label || "Execute" }) : t.id === "reject" ? n("chat.hitlDontExecute", { defaultValue: t.label || "Don't execute" }) : t.label : "";
}
function Gn(t, n, a) {
  var s;
  const r = (s = t.options) == null ? void 0 : s.find((i) => i.id === n);
  return ct(r, a) || n || "…";
}
const ms = ({
  card: t,
  submitting: n = !1,
  onSelect: a
}) => {
  var S, j;
  const { t: r } = L("ai"), { styles: s } = Jn(), i = Kn(t.arguments || ""), [o, l] = b(t.selected_option_id || "");
  R(() => {
    l(t.selected_option_id || "");
  }, [t.selected_option_id, t.tool_call_id]);
  const d = o || t.selected_option_id || "", c = ((S = t.title) == null ? void 0 : S.trim()) || t.tool_name, p = !!((j = t.title) != null && j.trim() && t.tool_name && t.title.trim() !== t.tool_name && t.tool_name !== "ui_choose"), m = t.kind === "choice" || t.tool_name === "ui_choose", f = Xn(t), u = !m && !!i, h = t.status === "abandoned" || t.status === "decided";
  let v;
  return t.status === "abandoned" ? v = /* @__PURE__ */ e.jsx(z.Text, { type: "secondary", children: r("chat.hitlAbandoned", { defaultValue: "You continued without choosing." }) }) : h && d ? v = /* @__PURE__ */ e.jsx(z.Text, { children: r("chat.hitlChose", {
    defaultValue: "You chose {{label}}.",
    label: Gn(t, d, r)
  }) }) : h ? v = /* @__PURE__ */ e.jsx(z.Text, { children: r("chat.hitlChose", {
    defaultValue: "You chose {{label}}.",
    label: "…"
  }) }) : v = /* @__PURE__ */ e.jsx("div", { className: s.actions, children: (t.options ?? []).map((x) => {
    const g = d === x.id;
    return /* @__PURE__ */ e.jsx(
      A,
      {
        className: s.action,
        type: g ? "primary" : "default",
        loading: n && g,
        disabled: n,
        onClick: () => {
          l(x.id), a == null || a(x.id);
        },
        children: /* @__PURE__ */ e.jsxs(ze, { vertical: !0, align: "flex-start", children: [
          /* @__PURE__ */ e.jsx("span", { children: ct(x, r) }),
          x.description ? /* @__PURE__ */ e.jsx("span", { style: { fontSize: 12, fontWeight: 400, opacity: 0.85 }, children: x.description }) : null
        ] })
      },
      x.id
    );
  }) }), /* @__PURE__ */ e.jsxs("div", { className: s.wrap, children: [
    /* @__PURE__ */ e.jsxs("div", { className: s.header, children: [
      /* @__PURE__ */ e.jsx("span", { className: s.title, children: c }),
      p ? /* @__PURE__ */ e.jsx(z.Text, { className: s.toolName, type: "secondary", code: !0, children: t.tool_name }) : null
    ] }),
    /* @__PURE__ */ e.jsxs(ze, { vertical: !0, gap: 8, children: [
      f ? /* @__PURE__ */ e.jsx("div", { className: s.description, children: f }) : null,
      u ? /* @__PURE__ */ e.jsx(
        Mt,
        {
          className: s.arguments,
          ghost: !0,
          size: "small",
          items: [{
            key: "arguments",
            label: r("chat.hitlArguments", { defaultValue: "Arguments" }),
            children: /* @__PURE__ */ e.jsx("pre", { className: s.argsPre, children: i })
          }]
        }
      ) : null,
      v
    ] })
  ] });
};
function Qn(t) {
  try {
    return JSON.stringify(JSON.parse(t), null, 2);
  } catch {
    return t;
  }
}
const pe = H(({ token: t, css: n }) => ({
  root: n`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    width: 100%;
    margin-top: 2px;
  `,
  rootEnd: n`
    align-items: flex-end;
  `,
  actions: n`
    display: flex;
    align-items: center;
    gap: 2px;
    width: fit-content;
  `,
  action: n`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: ${t.colorTextSecondary};
    cursor: pointer;
    &:hover {
      background: ${t.colorPrimaryBg};
      color: ${t.colorText};
    }
  `,
  chevron: n`
    transform: rotate(0deg);
    transition: transform 0.15s ease;
  `,
  chevronOpen: n`
    transform: rotate(90deg);
  `,
  rows: n`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
    &[hidden] {
      display: none;
    }
  `,
  run: n`
    width: 100%;
    margin: 0;
    color: ${t.colorTextSecondary};
    font-size: 12px;
  `,
  summary: n`
    display: flex;
    align-items: baseline;
    gap: 8px;
    min-width: 0;
    max-width: 100%;
    cursor: pointer;
  `,
  line: n`
    display: flex;
    align-items: baseline;
    gap: 8px;
    min-width: 0;
    max-width: 100%;
    margin: 0;
  `,
  name: n`
    flex: 0 0 auto;
    color: ${t.colorTextSecondary};
    font-family: ${t.fontFamilyCode};
    font-size: 11px;
  `,
  title: n`
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    color: ${t.colorText};
    font-weight: 650;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  status: n`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 6px;
    color: ${t.colorTextSecondary};
    font-size: 11px;
    &::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: ${t.colorPrimary};
    }
  `,
  statusRunning: n`
    color: ${t.colorPrimary};
    &::before {
      animation: chat-tool-pulse 1s ease-in-out infinite;
    }
    @keyframes chat-tool-pulse {
      50% { opacity: 0.35; }
    }
    @media (prefers-reduced-motion: reduce) {
      &::before { animation: none; }
    }
  `,
  statusFailed: n`
    color: ${t.colorError};
    &::before {
      background: ${t.colorError};
    }
  `,
  pre: n`
    margin: 4px 0 0;
    white-space: pre-wrap;
    color: ${t.colorText};
    font-size: 12px;
    font-family: ${t.fontFamilyCode};
  `
}));
function Zn({ open: t }) {
  const { styles: n, cx: a } = pe();
  return /* @__PURE__ */ e.jsx("svg", { className: a(n.chevron, t && n.chevronOpen), width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ e.jsx("path", { d: "M6 4.5 10 8 6 11.5", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function er() {
  return /* @__PURE__ */ e.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: [
    /* @__PURE__ */ e.jsx("rect", { x: "6", y: "6", width: "7", height: "7", rx: "1.4", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ e.jsx("path", { d: "M10 6V4.2A1.2 1.2 0 0 0 8.8 3H4.2A1.2 1.2 0 0 0 3 4.2v4.6A1.2 1.2 0 0 0 4.2 10H6", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function tr() {
  return /* @__PURE__ */ e.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ e.jsx("path", { d: "M3.5 8.2 6.4 11 12.5 5", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function We({ call: t }) {
  var d;
  const { styles: n, cx: a } = pe(), { t: r } = L("ai"), s = t.status === "running" || t.status === "pending", i = t.status === "failed", o = i ? r("chat.toolFailed", { defaultValue: "Failed" }) : s ? r("chat.toolRunning", { defaultValue: "Running" }) : r("chat.toolDone", { defaultValue: "Done" }), l = (d = t.title) == null ? void 0 : d.trim();
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx("code", { className: n.name, children: t.name }),
    l ? /* @__PURE__ */ e.jsx("span", { className: n.title, title: l, children: l }) : null,
    /* @__PURE__ */ e.jsx("span", { className: a(n.status, s && n.statusRunning, i && n.statusFailed), children: o })
  ] });
}
function nr({ call: t }) {
  const { styles: n } = pe(), a = t.status === "running" || t.status === "pending";
  return t.arguments ? /* @__PURE__ */ e.jsx("section", { className: n.run, "aria-busy": a, children: /* @__PURE__ */ e.jsxs("details", { className: n.run, children: [
    /* @__PURE__ */ e.jsx("summary", { className: n.summary, children: /* @__PURE__ */ e.jsx(We, { call: t }) }),
    /* @__PURE__ */ e.jsx("pre", { className: n.pre, children: Qn(t.arguments) })
  ] }) }) : /* @__PURE__ */ e.jsx("section", { className: n.run, "aria-busy": a, children: /* @__PURE__ */ e.jsx("p", { className: n.line, children: /* @__PURE__ */ e.jsx(We, { call: t }) }) });
}
function ps({
  text: t,
  tools: n = [],
  live: a = !1,
  align: r = "start"
}) {
  const { styles: s, cx: i } = pe(), { t: o } = L("ai"), [l, d] = b(a), [c, p] = b(!1), m = c ? o("chat.copied", { defaultValue: "Copied" }) : o("chat.copyMessage", { defaultValue: "Copy message" }), f = l ? o("chat.hideToolCalls", { defaultValue: "Hide tool calls" }) : o("chat.showToolCalls", { defaultValue: "Show tool calls" });
  async function u() {
    try {
      await navigator.clipboard.writeText(t), p(!0), window.setTimeout(() => p(!1), 1200);
    } catch {
      p(!1);
    }
  }
  return !t && n.length === 0 ? null : /* @__PURE__ */ e.jsxs("div", { className: i("chat-message-actions", s.root, r === "end" && s.rootEnd, l && n.length > 0 && "has-tools"), children: [
    /* @__PURE__ */ e.jsxs("div", { className: s.actions, children: [
      t ? /* @__PURE__ */ e.jsx(ae, { title: m, placement: "bottom", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: s.action, "aria-label": m, onClick: () => void u(), children: c ? /* @__PURE__ */ e.jsx(tr, {}) : /* @__PURE__ */ e.jsx(er, {}) }) }) : null,
      n.length > 0 ? /* @__PURE__ */ e.jsx(ae, { title: f, placement: "bottom", children: /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: s.action,
          "aria-expanded": l,
          "aria-label": f,
          onClick: () => d((h) => !h),
          children: /* @__PURE__ */ e.jsx(Zn, { open: l })
        }
      ) }) : null
    ] }),
    n.length > 0 ? /* @__PURE__ */ e.jsx("div", { className: i("chat-tool-log", s.rows), hidden: !l, children: n.map((h) => /* @__PURE__ */ e.jsx(nr, { call: h }, h.id)) }) : null
  ] });
}
const rr = {
  width: "100%"
};
function Ee({
  autofocus: t,
  disabled: n,
  registry: a,
  id: r,
  htmlName: s,
  multiple: i,
  onBlur: o,
  onChange: l,
  onFocus: d,
  options: c,
  placeholder: p,
  readonly: m,
  value: f,
  schema: u
}) {
  const [h, v] = b(!1), { formContext: S } = a, { readonlyAsDisabled: j = !0 } = S, { enumOptions: x, enumDisabled: g, emptyValue: w } = c, y = jn(c), I = ($) => l(xe($, x, y, w)), F = () => o(r, xe(f, x, y, w)), N = () => d(r, xe(f, x, y, w)), oe = ($, M) => M && st(M.label) ? M.label.toLowerCase().includes($.toLowerCase()) : !1, re = Ee.getPopupContainerCallback(), U = vn(f, x, !!i, y, w), G = {
    name: s || r
  }, le = !i && u.default === void 0, q = te(() => {
    if (Array.isArray(x)) {
      const $ = x.map(
        ({ value: M, label: fe }, ce) => ({
          disabled: Array.isArray(g) && g.includes(M),
          key: String(ce),
          value: wn(M, ce, y),
          label: fe
        })
      );
      return le && $.unshift({ value: "", label: p || "" }), $;
    }
  }, [g, x, p, le, y]);
  return /* @__PURE__ */ e.jsx(
    ee,
    {
      open: h,
      autoFocus: t,
      disabled: n || j && m,
      getPopupContainer: re,
      id: r,
      mode: i ? "multiple" : void 0,
      onBlur: m ? void 0 : F,
      onChange: m ? void 0 : I,
      onFocus: m ? void 0 : N,
      placeholder: p,
      style: rr,
      value: U,
      maxTagCount: i ? "responsive" : void 0,
      ...G,
      onOpenChange: v,
      filterOption: oe,
      "aria-describedby": Ve(r),
      options: q
    }
  );
}
Ee.getPopupContainerCallback = () => (t) => (t == null ? void 0 : t.parentElement) ?? document.body;
const sr = {
  width: "100%"
};
function dt(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
}
function ut(t, n) {
  if (!Array.isArray(t))
    return [];
  const a = [];
  for (const r of t) {
    if (!dt(r) || r.value == null || r.value === "")
      continue;
    const s = ut(r.children, n), i = String(r.value);
    a.push({
      value: i,
      title: r.label == null || r.label === "" ? i : String(r.label),
      disabled: r.disabled === !0 || n && s.length > 0,
      children: s.length > 0 ? s : void 0
    });
  }
  return a;
}
function ar(t) {
  const n = /* @__PURE__ */ new Map(), a = (r) => {
    const s = String(r.value ?? ""), i = r.children ?? [], o = i.length === 0 ? r.disabled || s === "" ? [] : [s] : i.flatMap((l) => a(l));
    return s !== "" && n.set(s, o), o;
  };
  return t.forEach(a), n;
}
function Ye(t, n) {
  const a = /* @__PURE__ */ new Set(), r = [], s = (o) => {
    const l = n.get(o), d = l === void 0 ? [o] : l;
    for (const c of d)
      c !== "" && !a.has(c) && (a.add(c), r.push(c));
  }, i = (o) => {
    if (Array.isArray(o)) {
      o.forEach(i);
      return;
    }
    if (!(o == null || o === "")) {
      if (dt(o)) {
        if (o.halfChecked === !0)
          return;
        "value" in o && i(o.value);
        return;
      }
      s(String(o));
    }
  };
  return i(t), r;
}
const ir = (t, n) => {
  const a = n.title;
  return typeof a == "string" && a.toLowerCase().includes(t.toLowerCase());
}, or = (t) => t.parentElement ?? document.body;
function lr({
  autofocus: t,
  disabled: n,
  registry: a,
  id: r,
  multiple: s,
  onBlur: i,
  onChange: o,
  onFocus: l,
  placeholder: d,
  readonly: c,
  value: p,
  schema: m
}) {
  const { formContext: f } = a, { readonlyAsDisabled: u = !0 } = f, h = !!s || m.type === "array", v = te(
    () => ut(m["x-tree-options"], !h),
    [m, h]
  ), S = te(() => ar(v), [v]), j = Ye(p, S), x = h ? j : j[0], g = (w) => {
    const y = Ye(w, S);
    o(h ? y : y[0]);
  };
  return /* @__PURE__ */ e.jsx(
    De,
    {
      id: r,
      autoFocus: t,
      allowClear: !0,
      disabled: n || u && c,
      getPopupContainer: or,
      placeholder: d,
      showSearch: !0,
      style: sr,
      treeData: v,
      treeDefaultExpandAll: !0,
      treeCheckable: h || void 0,
      showCheckedStrategy: h ? De.SHOW_CHILD : void 0,
      maxTagCount: h ? "responsive" : void 0,
      value: x,
      filterTreeNode: ir,
      onBlur: c ? void 0 : () => i(r, p),
      onChange: c ? void 0 : g,
      onFocus: c ? void 0 : () => l(r, p),
      "aria-describedby": Ve(r)
    }
  );
}
function cr(t) {
  const { disabled: n, registry: a, id: r, onBlur: s, onChange: i, onFocus: o, options: l, placeholder: d, readonly: c, value: p } = t, { formContext: m } = a, { readonlyAsDisabled: f = !0 } = m, { type: u, ...h } = Sn(t.schema, "password", l, !1), v = l.emptyValue || "", S = ({ target: g }) => i(g.value === "" ? v : g.value), j = ({ target: g }) => s(r, g.value), x = ({ target: g }) => o(r, g.value);
  return /* @__PURE__ */ e.jsx(
    V.Password,
    {
      ...h,
      disabled: n || f && c,
      id: r,
      name: r,
      onBlur: c ? void 0 : j,
      onChange: c ? void 0 : S,
      onFocus: c ? void 0 : x,
      placeholder: d,
      value: p || "",
      "aria-describedby": Ve(r)
    }
  );
}
const { FieldTemplate: je } = hn, dr = 2, ur = H(({ css: t }) => ({
  jsonSchemaForm: t`
      .ant-form-item-control-input-content>#root {
        border-width: 0;
        padding: 0px;
        display: contents;
      }
      >.ant-btn-submit{
        display: none;
      }
      >.field-object>.ant-form-item{
        margin-bottom: 0px;
      }
      .ant-col:empty{
        display: none; 
      }
      .ant-form-item{
        >.ant-form-item-with-help,.ant-form-item-has-feedback.ant-form-item-has-error{
          margin-bottom: 0px;
        }
      }
      .ant-form-item-additional{
        height: 24px;
        overflow: hidden;
      }
      .ant-form-item-additional:has(>.ant-form-item-explain){
        >.ant-form-item-extra{
          display: none;
        }
      }
    `
})), mr = (t) => {
  var n;
  return /* @__PURE__ */ e.jsx(
    mt,
    {
      ...t,
      schema: {
        ...t.schema || {},
        "x-data-source": {
          ...((n = t.schema) == null ? void 0 : n["x-data-source"]) || {},
          type: "toolsets"
        }
      }
    }
  );
};
function ve(t) {
  if (t == null)
    return "";
  try {
    return JSON.stringify(t, null, dr);
  } catch {
    return "";
  }
}
function Je(t) {
  const n = t.trim();
  if (n !== "")
    try {
      return JSON.parse(n);
    } catch {
      return;
    }
}
function pr({ t, ...n }) {
  const { isDarkMode: a } = Nt(), { formData: r, schema: s, onChange: i, disabled: o, id: l, required: d, name: c, fieldPathId: p } = n, m = Array.isArray(s.examples) ? s.examples : [], f = Y(void 0), u = Y(!1), [h, v] = b(() => ve(r)), [S, j] = b(null), x = ft(n.fieldPathId.path);
  R(() => {
    if (u.current) {
      u.current = !1;
      return;
    }
    f.current !== r && (f.current = r, v(ve(r)), j(null));
  }, [r]);
  const g = B(
    (y) => {
      v(y);
      const I = Je(y);
      if (I === void 0 && y.trim() !== "") {
        j("Invalid JSON");
        return;
      }
      j(null), f.current = I, u.current = !0, i(I, p.path);
    },
    [i, p]
  ), w = B(
    (y) => {
      const I = m[y];
      if (I === void 0) return;
      let F = typeof I == "string" ? Je(I) : I;
      F && typeof F == "object" && !Array.isArray(F) && "value" in F && F.value !== void 0 && (F = F.value);
      const N = ve(F);
      v(N), j(null), f.current = F, u.current = !0, i(F, p.path);
    },
    [i, m, p]
  );
  return /* @__PURE__ */ e.jsxs("div", { id: l, style: { position: "relative" }, children: [
    m.length > 0 && /* @__PURE__ */ e.jsx(
      "div",
      {
        style: {
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10
        },
        children: /* @__PURE__ */ e.jsx(
          ee,
          {
            placeholder: "Load example…",
            allowClear: !0,
            style: { minWidth: 160 },
            disabled: o,
            options: m.map((y, I) => ({
              label: typeof y == "object" && y !== null && "title" in y ? String(y.title) : `Example ${I + 1}`,
              value: I
            })),
            onChange: (y) => y != null && w(y)
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-label", children: /* @__PURE__ */ e.jsx("label", { className: d ? "ant-form-item-required" : "ant-form-item-optional", children: x ? t == null ? void 0 : t(`${x}.label`, { defaultValue: s.title || c }) : s.title || c }) }),
    /* @__PURE__ */ e.jsx(
      yn,
      {
        value: h,
        height: "200px",
        theme: a ? "dark" : "light",
        extensions: [bn()],
        onChange: g,
        editable: !o,
        basicSetup: { lineNumbers: !0, foldGutter: !0 }
      }
    ),
    S && /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-additional", children: /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-explain ant-form-item-explain-connected", children: /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-explain-error", children: /* @__PURE__ */ e.jsx("div", { id: "root_args__error", children: /* @__PURE__ */ e.jsx("div", { children: S }) }) }) }) })
  ] });
}
const fr = (t) => (n) => /* @__PURE__ */ e.jsx(pr, { ...n, t });
function hr(t) {
  return Array.isArray(t) ? t : t && typeof t == "object" && Array.isArray(t.data) ? t.data : [];
}
function Ke(t, n, a = "", r = "", s) {
  const i = n.label_key ? t[n.label_key] : void 0, o = n.value_key ? t[n.value_key] : void 0, l = o != null && String(o) !== "" ? String(o) : r, d = i != null && String(i) !== "" ? String(i) : a || l;
  return { label: s ? s(d, t) : d, value: l };
}
function gr(t, n) {
  const a = t.search_key || "search";
  return {
    current: 1,
    page_size: 20,
    ...t.params || {},
    ...t.filter || {},
    ...n ? { [a]: n } : {}
  };
}
function we(t, n) {
  return n ? (Array.isArray(t) ? t : t == null || t === "" ? [] : [t]).filter((r) => r != null && r !== "").map((r) => String(r)) : t == null || t === "" ? [] : [String(t)];
}
async function xr(t, n) {
  switch (t.type) {
    case "toolsets":
      return ((await T.system.listToolSets(n)).data ?? []).map((r) => Ke(
        r,
        t,
        r.name,
        r.id,
        (s, i) => n.type ? s : /* @__PURE__ */ e.jsxs("span", { children: [
          /* @__PURE__ */ e.jsx(Z, { color: "blue", style: { marginInlineEnd: 0 }, children: i.type }),
          " ",
          s
        ] })
      )).filter((r) => r.value !== "");
    case "api": {
      if (!t.url)
        return [];
      const a = t.url.startsWith("/") ? await dn(t.url, {
        method: t.method,
        params: n
      }) : (await xn(t.url, { params: n, method: t.method })).data;
      return hr(a).map((r) => Ke(r, t)).filter((r) => r.value !== "");
    }
    default:
      return [];
  }
}
const mt = (t) => {
  const { schema: n, value: a, onChange: r, disabled: s, readonly: i, multiple: o, placeholder: l } = t, d = (n == null ? void 0 : n["x-data-source"]) || {}, c = !!o || (n == null ? void 0 : n.type) === "array", [p, m] = b(""), f = Y(/* @__PURE__ */ new Map()), u = te(() => gr(d, p), [d, p]), h = `${d.type ?? ""}:${d.method ?? ""}:${d.url ?? ""}:${JSON.stringify(u)}`, v = typeof d.cache_ttl == "number" ? d.cache_ttl * 1e3 : 0, { data: S, loading: j } = _(
    () => xr(d, u),
    {
      ready: d.type === "toolsets" || d.type === "api",
      refreshDeps: [h],
      debounceWait: 300,
      cacheKey: h,
      cacheTime: v,
      staleTime: v
    }
  ), x = te(() => {
    const w = /* @__PURE__ */ new Map();
    for (const y of S ?? [])
      f.current.set(y.value, y.label || y.value), w.set(y.value, y);
    for (const y of we(a, c))
      w.has(y) || w.set(y, { label: f.current.get(y) || y, value: y });
    return Array.from(w.values());
  }, [S, a, c]), g = c ? we(a, !0) : we(a, !1)[0];
  return /* @__PURE__ */ e.jsx(
    ee,
    {
      mode: c ? "multiple" : void 0,
      maxTagCount: c ? "responsive" : void 0,
      maxTagPlaceholder: (w) => `+${w.length}`,
      showSearch: !0,
      filterOption: !1,
      onSearch: m,
      onOpenChange: (w) => {
        w || m("");
      },
      options: x,
      value: g,
      loading: j,
      disabled: s || i,
      placeholder: l,
      allowClear: !0,
      onChange: (w) => r == null ? void 0 : r(c ? Array.isArray(w) ? w : [] : w),
      style: { width: "100%" }
    }
  );
};
function pt(t) {
  const n = t.$defs || t.definitions || {};
  function a(s) {
    if (!s.startsWith("#/$defs/") && !s.startsWith("#/definitions/"))
      return null;
    const i = s.split("/").pop();
    return i ? n[i] : null;
  }
  function r(s) {
    if (!s) return {};
    if (s.$ref) {
      const o = a(s.$ref);
      return r(o);
    }
    const i = {};
    if (Object.keys(s).forEach((o) => {
      o.startsWith("x-ui-") && (i[`ui:${o.slice(5)}`] = s[o]);
    }), s["x-hidden"] && (i["ui:widget"] = "hidden"), s["x-disabled"] && (i["ui:disabled"] = !0), s.type === "object") {
      if (s.properties)
        for (const [o, l] of Object.entries(s.properties)) {
          const d = r(l);
          Object.keys(d).length > 0 && (i[o] = d);
        }
      s.dependencies && Object.keys(s.dependencies).forEach((o) => {
        const l = s.dependencies[o];
        l.properties ? Object.keys(l.properties).forEach((d) => {
          const c = r(l.properties[d]);
          Object.keys(c).length > 0 && (i[o] = c);
        }) : l.oneOf && l.oneOf.forEach((d) => {
          d.properties && Object.keys(d.properties).forEach((c) => {
            const p = r(d.properties[c]);
            i[c] = p;
          });
        });
      });
    }
    return s.type === "array" && s.items && (i.items = r(s.items)), s.oneOf && (i["ui:options"] = {
      ...i["ui:options"] || {},
      oneOf: s.oneOf.map((o) => r(o))
    }), s.anyOf && (i["ui:options"] = {
      ...i["ui:options"] || {},
      anyOf: s.anyOf.map((o) => r(o))
    }), s.allOf && (i["ui:options"] = {
      ...i["ui:options"] || {},
      allOf: s.allOf.map((o) => r(o))
    }), i;
  }
  if (t.$ref) {
    const s = a(t.$ref);
    return r(s);
  }
  return r(t);
}
const ft = (t) => t.filter((n) => !pn(n)).join("."), yr = (t) => ({ uiSchema: n, label: a, ...r }) => {
  if (!je) return null;
  const s = ft(r.fieldPathId.path);
  if (!t || !s) return /* @__PURE__ */ e.jsx(je, { ...r, label: a, uiSchema: n });
  const i = n == null ? void 0 : n["ui:placeholder"], o = () => {
    var l, d, c, p;
    if ((l = r.description) != null && l.props)
      return /* @__PURE__ */ e.jsx(
        r.registry.templates.DescriptionFieldTemplate,
        {
          ...(d = r.description) == null ? void 0 : d.props,
          description: t == null ? void 0 : t(`${s}.description`, { defaultValue: (p = (c = r.description) == null ? void 0 : c.props) == null ? void 0 : p.description })
        }
      );
  };
  return /* @__PURE__ */ e.jsx(
    je,
    {
      ...r,
      label: t == null ? void 0 : t(`${s}.label`, { defaultValue: a }),
      description: o(),
      uiSchema: {
        ...n,
        ...i ? { "ui:placeholder": t == null ? void 0 : t(`${s}.placeholder`, { defaultValue: i }) } : {}
      }
    }
  );
}, br = (t) => {
  const n = t.split("-")[0];
  return Ne[t] || Ne[n];
}, ke = ({
  schema: t,
  value: n,
  onChange: a,
  uiSchema: r,
  disabled: s = !1,
  formRef: i,
  t: o
}) => {
  const { styles: l } = ur(), d = n ?? {}, { i18n: c } = L(), p = te(() => gn({}, br(c.language)), [c.language]);
  rt(i, () => ({
    validate: (u) => {
      const h = p.validateFormData(u, t, void 0, void 0, f);
      return h.errors.filter((v) => v.name !== "additionalProperties").length > 0 ? (console.error(h.errors), Promise.reject(h.errors[0].message)) : Promise.resolve();
    }
  }));
  const m = B(
    ({ formData: u }) => {
      a == null || a(u ?? {});
    },
    [a]
  ), f = nt.useMemo(() => t ? {
    ...pt(t) || {},
    ...r || {}
  } : {}, [t, r]);
  return /* @__PURE__ */ e.jsx(
    fn,
    {
      tagName: "div",
      className: D(l.jsonSchemaForm, "json-schema-config-form"),
      schema: t || {},
      formData: d,
      onChange: m,
      validator: p,
      uiSchema: f || {},
      disabled: s,
      showErrorList: !1,
      liveValidate: "onChange",
      autoComplete: "off",
      fields: {
        objectEditor: fr(o)
      },
      widgets: {
        remoteSelect: mt,
        toolsetsSelect: mr,
        select: Ee,
        treeSelect: lr,
        password: cr
      },
      templates: {
        FieldTemplate: yr(o)
      },
      formContext: {
        descriptionLocation: "tooltip"
      }
    }
  );
}, jr = ({ schema: t, uiSchema: n, t: a, ...r }) => {
  const s = Y(null);
  return /* @__PURE__ */ e.jsx(
    C.Item,
    {
      noStyle: !0,
      ...r,
      rules: [{
        validator: (i, o) => {
          var l;
          return (l = s.current) == null ? void 0 : l.validate(o);
        },
        message: ""
      }],
      children: /* @__PURE__ */ e.jsx(ke, { schema: t, formRef: s, uiSchema: n, t: a })
    }
  );
}, fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  JsonSchemaConfigForm: ke,
  JsonSchemaConfigFormItem: jr,
  buildUiSchema: pt,
  default: ke
}, Symbol.toStringTag, { value: "Module" }));
export {
  Yr as A,
  ps as C,
  ns as D,
  ie as H,
  Xr as I,
  $e as L,
  Jr as O,
  qr as P,
  Gr as R,
  Kr as T,
  cs as U,
  Wr as a,
  Zr as b,
  ts as c,
  es as d,
  An as e,
  Fn as f,
  rs as g,
  lt as h,
  ss as i,
  $n as j,
  Qr as k,
  as as l,
  is as m,
  os as n,
  ls as o,
  ds as p,
  us as q,
  ms as r,
  fs as s
};
