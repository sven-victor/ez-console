import { j as e } from "./vendor.js";
import { Navigate as Ee, useNavigate as Ye } from "react-router-dom";
import { u as Te, a as Ae, b as Le, c as gt, d as xt } from "./contexts.js";
import { g as yt, i as bt, a as jt, b as vt, c as wt, f as St } from "./base.js";
import { Spin as Ie, Result as Se, Dropdown as Je, Avatar as Ct, Upload as kt, Modal as Ke, Popover as Tt, List as W, Image as At, Divider as Xe, Skeleton as Lt, Progress as It, Typography as O, Button as A, Tag as Z, Badge as Ft, Space as E, Tooltip as ae, App as X, Popconfirm as ue, Input as _, Table as Fe, Form as C, Alert as de, Segmented as ze, Steps as _t, QRCode as Vt, Empty as Ge, Card as Ce, Row as Et, Col as se, Select as ee, DatePicker as zt, InputNumber as he, Switch as Pt, Flex as Pe, Collapse as Ot, TreeSelect as Oe } from "antd";
import { useTranslation as L } from "react-i18next";
import { createStyles as H, useTheme as Dt } from "antd-style";
import * as Rt from "@ant-design/icons";
import { UploadOutlined as Mt, CheckOutlined as Nt, TeamOutlined as $t, UnorderedListOutlined as Bt, DownloadOutlined as Ht, BellOutlined as Ut, MoreOutlined as qt, PlusOutlined as Wt, ClockCircleFilled as Yt, MailOutlined as Jt, EyeOutlined as Qe, EyeInvisibleOutlined as Kt, LaptopOutlined as Xt, EnvironmentOutlined as Gt, GlobalOutlined as Qt, ClockCircleOutlined as Zt, SearchOutlined as en, UndoOutlined as tn } from "@ant-design/icons";
import Ze, { useState as b, useEffect as M, useCallback as B, useRef as Y, Suspense as nn, forwardRef as rn, useImperativeHandle as et, useMemo as te } from "react";
import { a as T } from "./index.js";
import { useRequest as V } from "ahooks";
import D from "classnames";
import { createPortal as sn } from "react-dom";
import { b as ge, A as an, r as on } from "./client.js";
import ln from "antd-img-crop";
import cn from "react-infinite-scroll-component";
import { isString as tt, isNumber as dn } from "lodash-es";
import un, { Templates as mn } from "@rjsf/antd";
import { customizeValidator as pn } from "@rjsf/validator-ajv8";
import fn from "axios";
import hn from "@uiw/react-codemirror";
import { json as gn } from "@codemirror/lang-json";
import De from "ajv-i18n";
import { getOptionValueFormat as xn, enumOptionSelectedValue as yn, enumOptionValueEncoder as bn, ariaDescribedByIds as nt, enumOptionValueDecoder as xe } from "@rjsf/utils";
const Re = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(Ie, { size: "large" }) }), Nr = ({
  element: t,
  requiredPermission: n,
  requiredPermissions: a
}) => {
  const { t: r } = L(), { user: s, loading: i, error: o } = Te(), { hasPermission: l, hasAllPermissions: d } = Ae();
  return i ? /* @__PURE__ */ e.jsx(Re, {}) : o ? o.code === "E4011" ? /* @__PURE__ */ e.jsx(Re, {}) : /* @__PURE__ */ e.jsx(
    Se,
    {
      status: "500",
      title: "500",
      subTitle: r("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (o == null ? void 0 : o.message) || o })
    }
  ) : s ? n && !l(n) ? /* @__PURE__ */ e.jsx(Ee, { to: "/forbidden", replace: !0 }) : a && !d(a) ? /* @__PURE__ */ e.jsx(Ee, { to: "/forbidden", replace: !0 }) : t : (window.location.href = yt("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, jn = H(({ token: t, css: n }) => ({
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
})), me = ({
  overlayClassName: t,
  overlay: n,
  hidden: a,
  children: r,
  ...s
}) => {
  const { styles: i } = jn();
  return a ? /* @__PURE__ */ e.jsx(e.Fragment, {}) : /* @__PURE__ */ e.jsx(
    Je,
    {
      popupRender: n,
      overlayClassName: D(i.container, t),
      ...s,
      children: /* @__PURE__ */ e.jsx("span", { className: i.iconStyle, children: r })
    }
  );
}, vn = () => /* @__PURE__ */ e.jsxs(
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
), wn = H(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), Sn = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], $r = ({
  transformLangConfig: t = (a) => a,
  className: n
}) => {
  const { i18n: a } = L(), { styles: r } = wn(), s = (o) => {
    a.changeLanguage(o);
  }, i = {
    selectedKeys: [a.language],
    onClick: (o) => {
      s(o.key);
    },
    items: t(Sn).map((o) => ({
      key: o.lang,
      className: r.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (o == null ? void 0 : o.label) || "en-US", className: r.menuItemIconStyle, children: (o == null ? void 0 : o.icon) || "🌐" }),
        (o == null ? void 0 : o.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    me,
    {
      className: n,
      menu: i,
      children: /* @__PURE__ */ e.jsx(vn, {})
    }
  );
}, Cn = H(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), _e = (t) => tt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? ge.endsWith("/") ? ge + `files/${t}` : ge + `/files/${t}` : t, Br = ({ src: t, fallback: n, ...a }) => /* @__PURE__ */ e.jsx(Ct, { src: _e(t), icon: n, ...a }), kn = ({ onChange: t, shape: n = "square" }) => {
  const [a, r] = b([]), { styles: s } = Cn(), [i, o] = b(!1), [l, d] = b(!0), [c, f] = b(0), { run: m, loading: p } = V(() => T.base.listFiles({ current: c + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: x }) => {
      console.log(x), r([...a, ...x]), d(x.length === 40), f(c + 1);
    }
  }), u = () => {
    d(!0), f(0), r([]);
  };
  return /* @__PURE__ */ e.jsx(
    Tt,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (x) => {
        o(x), x ? m() : u();
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
            cn,
            {
              dataLength: a.length,
              next: () => {
                m();
              },
              hasMore: l,
              loader: /* @__PURE__ */ e.jsx(Lt, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(Xe, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                W,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: a,
                  style: { margin: "0 8px" },
                  loading: p,
                  renderItem: ({ id: x }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: s.avatarItem,
                      onClick: (w) => {
                        w.stopPropagation(), t == null || t(x), o(!1), u();
                      },
                      children: /* @__PURE__ */ e.jsx(At, { src: _e(x), placeholder: /* @__PURE__ */ e.jsx(Ie, { size: "default" }), preview: !1 })
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
        Mt,
        {
          shape: n,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, Tn = ({ value: t, onChange: n, shape: a, ...r }) => {
  const [s, i] = b(void 0), [o, l] = b(!1), [d, c] = b(void 0), f = async (m) => {
    l(!0), c(m.url ?? m.preview);
  };
  return M(() => {
    i(t ? {
      uid: t,
      name: t,
      url: _e(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      ln,
      {
        beforeCrop: async (m) => {
          if (m.type === "image/svg+xml") {
            const p = await T.base.uploadFile({ type: "avatar" }, m);
            return p.length > 0 && (n == null || n(p[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          kt,
          {
            customRequest: async (m) => {
              var u, x;
              const p = await T.base.uploadFile({ type: "avatar", access: "public" }, m.file);
              p.length > 0 ? ((u = m.onSuccess) == null || u.call(m, p[0].id), n == null || n(p[0].id)) : (x = m.onError) == null || x.call(m, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: f,
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
            children: s ? void 0 : /* @__PURE__ */ e.jsx(kn, { shape: a, onChange: n })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(Ke, { open: o, footer: null, onCancel: () => l(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: d }) })
  ] });
}, Hr = ({ className: t }) => {
  const { t: n } = L("common"), { user: a } = Te(), { currentOrgId: r, setCurrentOrgId: s } = Le(), i = (a == null ? void 0 : a.organizations) || [], o = (f) => {
    s(f), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const l = i.find((f) => f.id === r), d = l ? l.name : n("organization.global", { defaultValue: "Global" }), c = [
    ...i.map((f) => ({
      key: f.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: f.name }),
        r === f.id && /* @__PURE__ */ e.jsx(Nt, {})
      ] }),
      onClick: () => o(f.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    me,
    {
      className: t,
      menu: {
        items: c,
        selectedKeys: r ? [r] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx($t, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: d })
      ]
    }
  );
}, An = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Ur = ({ className: t }) => {
  const { t: n } = L("task"), a = Ye(), { user: r } = gt(), { tasksDropdownOpen: s, setTasksDropdownOpen: i, tasks: o, setTasks: l } = Le(), { runAsync: d, loading: c } = V(async () => T.tasks.listUserTasks({}), {
    onSuccess: (p) => {
      bt(o, p, (u, x) => u.id === x.id && u.status === x.status && u.progress === x.progress) || l(p);
    },
    pollingInterval: s ? 3e3 : 6e4,
    ready: !!r,
    refreshDeps: [r]
  });
  M(() => {
    s && d();
  }, [s]);
  const f = async (p) => {
    const u = await T.base.downloadFile({ fileKey: p }, { params: { method: "sign" } }), x = `/api/files/${p}?signature=${u.signature}&expires=${u.expires}`;
    window.open(x, "_blank");
  }, m = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      W,
      {
        size: "small",
        dataSource: o,
        loading: c,
        renderItem: (p) => /* @__PURE__ */ e.jsx(
          W.Item,
          {
            extra: /* @__PURE__ */ e.jsx(Z, { color: An[p.status], style: { marginLeft: 6 }, children: n(`status.${p.status}`, { defaultValue: p.status }) }),
            actions: [
              p.artifact_file_key && /* @__PURE__ */ e.jsx(
                A,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx(Ht, {}),
                  onClick: () => f(p.artifact_file_key)
                }
              )
            ].filter(Boolean),
            children: /* @__PURE__ */ e.jsx(
              W.Item.Meta,
              {
                title: /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13 }, children: /* @__PURE__ */ e.jsxs(O.Text, { ellipsis: { tooltip: !0 }, children: [
                  n(`type.${p.type}`, { defaultValue: p.type }),
                  " ",
                  p.artifact_file_name && `- ${p.artifact_file_name}`
                ] }) }),
                description: (p.status === "running" || p.status === "pending") && /* @__PURE__ */ e.jsx(It, { percent: p.progress ?? 0, size: "small", style: { marginTop: 4 } })
              }
            )
          },
          p.id
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(A, { type: "link", size: "small", onClick: () => a("/tasks"), children: n("more", { defaultValue: "More" }) }) })
  ] });
  return !o || o.length === 0 ? null : /* @__PURE__ */ e.jsxs(me, { className: t, overlay: m, placement: "bottomRight", open: s, onOpenChange: i, children: [
    /* @__PURE__ */ e.jsx(Bt, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: n("tasks", { defaultValue: "Tasks" }) })
  ] });
}, Ln = 20, qr = ({ className: t }) => {
  const { t: n } = L("inbox"), a = Ye(), { user: r } = Te(), { inboxUnreadCount: s, inboxRevision: i, setInboxUnreadCount: o, bumpInboxRevision: l } = Le(), [d, c] = b(!1), { data: f = [], loading: m, run: p } = V(
    async () => (await T.inbox.listInboxMessages({
      current: 1,
      page_size: Ln
    })).data ?? [],
    {
      ready: !!r,
      refreshDeps: [r == null ? void 0 : r.id, i]
    }
  ), u = async (S) => {
    await T.inbox.markInboxMessageRead({ id: S }), l(), p();
  }, x = async () => {
    await T.inbox.markAllInboxMessagesRead(), o(0), l(), p();
  }, w = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 420, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      W,
      {
        size: "small",
        dataSource: f,
        loading: m,
        locale: { emptyText: n("empty", { defaultValue: "No messages" }) },
        renderItem: (S) => {
          const j = jt(S);
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
                  title: /* @__PURE__ */ e.jsx(O.Text, { strong: j, ellipsis: { tooltip: !0 }, children: wt(n, S) }),
                  description: /* @__PURE__ */ e.jsxs(E, { direction: "vertical", size: 0, style: { width: "100%" }, children: [
                    /* @__PURE__ */ e.jsx(O.Text, { type: "secondary", ellipsis: { tooltip: !0 }, children: vt(n, S) }),
                    /* @__PURE__ */ e.jsx(O.Text, { type: "secondary", style: { fontSize: 12 }, children: S.created_at ? new Date(S.created_at).toLocaleString() : "" })
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
      /* @__PURE__ */ e.jsx(A, { type: "link", size: "small", disabled: s <= 0, onClick: () => void x(), children: n("markAllRead", { defaultValue: "Mark all as read" }) }),
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
  return /* @__PURE__ */ e.jsx(me, { className: t, overlay: w, placement: "bottomRight", open: d, onOpenChange: c, children: /* @__PURE__ */ e.jsx(Ft, { count: s, size: "small", overflowCount: 99, children: /* @__PURE__ */ e.jsx(Ut, { style: { marginRight: 4, height: 18, width: 18, fontSize: 18 } }) }) });
}, In = H(({ token: t, css: n }) => ({
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
})), Wr = ({
  onResize: t,
  minWidth: n = 300,
  maxWidth: a = window.innerWidth * 0.5
}) => {
  const { styles: r } = In(), [s, i] = b(!1), [o, l] = b(!1), d = B((m) => {
    m.preventDefault(), i(!0);
  }, []), c = B(
    (m) => {
      if (!s) return;
      const p = window.innerWidth - m.clientX, u = Math.max(n, Math.min(a, p));
      t(u);
    },
    [s, n, a, t]
  ), f = B(() => {
    i(!1);
  }, []);
  return M(() => {
    if (s)
      return document.addEventListener("mousemove", c), document.addEventListener("mouseup", f), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", f), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [s, c, f]), /* @__PURE__ */ e.jsx(
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
}, ne = 40, Fn = 28, _n = 6, rt = "ai-chat-float-pos", Vn = H(({ token: t, css: n }) => ({
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
function P(t, n, a) {
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
    rx: t > 0 ? P((t - 24) / t, 0, 1) : 1,
    ry: n > 0 ? P((n - 24) / n, 0, 1) : 1,
    edge: null
  };
}
function st(t, n, a) {
  let r = P(t, 0, J()), s = P(n, 0, K());
  return a === "left" && (r = 0), a === "right" && (r = J()), a === "top" && (s = 0), a === "bottom" && (s = K()), { x: r, y: s, edge: a };
}
function at(t) {
  const n = J(), a = K();
  return {
    rx: n > 0 ? P(t.x / n, 0, 1) : 0,
    ry: a > 0 ? P(t.y / a, 0, 1) : 0,
    edge: t.edge
  };
}
function Me(t) {
  return st(t.rx * J(), t.ry * K(), t.edge);
}
function En() {
  try {
    const t = localStorage.getItem(rt);
    if (!t) return ye();
    const n = JSON.parse(t);
    return typeof n.rx == "number" && typeof n.ry == "number" ? {
      rx: P(n.rx, 0, 1),
      ry: P(n.ry, 0, 1),
      edge: n.edge ?? null
    } : typeof n.x == "number" && typeof n.y == "number" ? at({
      x: P(n.x, 0, J()),
      y: P(n.y, 0, K()),
      edge: n.edge ?? null
    }) : ye();
  } catch {
    return ye();
  }
}
function Ne(t) {
  localStorage.setItem(rt, JSON.stringify(t));
}
function zn(t, n) {
  const a = t, r = window.innerWidth - (t + ne), s = n, i = window.innerHeight - (n + ne), o = Math.min(a, r, s, i);
  return o > Fn ? null : o === a ? "left" : o === r ? "right" : o === s ? "top" : "bottom";
}
const Pn = ({
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
] }), Yr = ({ icon: t }) => {
  const { styles: n } = Vn(), { setVisible: a, visible: r } = xt(), { t: s } = L("ai"), i = Y(
    typeof window > "u" ? { rx: 1, ry: 1, edge: null } : En()
  ), [o, l] = b(
    () => typeof window > "u" ? { x: 0, y: 0, edge: null } : Me(i.current)
  ), [d, c] = b(!1), f = Y(null), m = Y(o);
  m.current = o;
  const p = !d && o.edge === "left" ? n.dockLeft : !d && o.edge === "right" ? n.dockRight : !d && o.edge === "top" ? n.dockTop : !d && o.edge === "bottom" ? n.dockBottom : void 0, u = B((h) => {
    const g = at(h);
    i.current = g, Ne(g), l(h);
  }, []), x = B(() => {
    f.current || l(Me(i.current));
  }, []);
  M(() => (Ne(i.current), window.addEventListener("resize", x), () => window.removeEventListener("resize", x)), [x]);
  const w = (h) => {
    h.button === 0 && (h.currentTarget.setPointerCapture(h.pointerId), f.current = {
      pointerId: h.pointerId,
      startX: h.clientX,
      startY: h.clientY,
      originX: m.current.x,
      originY: m.current.y,
      moved: !1
    }, c(!0));
  }, S = (h) => {
    const g = f.current;
    if (!g || g.pointerId !== h.pointerId) return;
    const v = h.clientX - g.startX, y = h.clientY - g.startY;
    !g.moved && Math.hypot(v, y) > _n && (g.moved = !0), l({
      x: P(g.originX + v, 0, J()),
      y: P(g.originY + y, 0, K()),
      edge: null
    });
  }, j = (h) => {
    const g = f.current;
    if (!g || g.pointerId !== h.pointerId) return;
    try {
      h.currentTarget.releasePointerCapture(h.pointerId);
    } catch {
    }
    const v = !g.moved;
    if (f.current = null, c(!1), v) {
      a(!0);
      return;
    }
    const y = zn(m.current.x, m.current.y);
    u(st(m.current.x, m.current.y, y));
  };
  return r ? null : sn(
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
              p
            ),
            style: { left: o.x, top: o.y },
            onPointerDown: w,
            onPointerMove: S,
            onPointerUp: j,
            onPointerCancel: j,
            children: t ?? /* @__PURE__ */ e.jsx("span", { className: n.body, children: /* @__PURE__ */ e.jsx(Pn, { className: n.robot, eyeClassName: n.eye }) })
          }
        )
      }
    ),
    document.body
  );
}, it = ({
  permission: t,
  permissions: n = [],
  checkAll: a = !1,
  fallback: r = null,
  children: s
}) => {
  const { hasPermission: i, hasAnyPermission: o, hasAllPermissions: l, isAdmin: d, loading: c } = Ae();
  return c ? null : d ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : t ? i(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : n.length > 0 ? (a ? l(n) : o(n)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s });
}, Jr = ({
  fallback: t = null,
  children: n
}) => {
  const { isAdmin: a, loading: r } = Ae();
  return r ? null : a ? /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, $e = (t) => {
  const [n, a] = b(!1), { permission: r, icon: s, tooltip: i, onClick: o, confirm: l, label: d, ...c } = t, f = !!c.disabled, m = o ? async () => {
    a(!0);
    try {
      await o();
    } finally {
      a(!1);
    }
  } : void 0;
  let p = /* @__PURE__ */ e.jsx(
    A,
    {
      type: "link",
      size: "small",
      loading: n,
      icon: s,
      onClick: l && !f ? void 0 : m,
      ...c,
      children: d && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: d })
    }
  );
  if (l && !f) {
    const u = async () => {
      l.onConfirm ? await l.onConfirm() : m && await m();
    };
    p = /* @__PURE__ */ e.jsx(
      ue,
      {
        title: l.title,
        description: l.description,
        onConfirm: u,
        okText: l.okText,
        cancelText: l.cancelText,
        children: p
      }
    );
  }
  return i && (p = f ? /* @__PURE__ */ e.jsx(ae, { title: i, children: /* @__PURE__ */ e.jsx("span", { style: { display: "inline-block", cursor: "not-allowed" }, children: p }) }) : /* @__PURE__ */ e.jsx(ae, { title: i, children: p })), r && (p = /* @__PURE__ */ e.jsx(it, { permission: r, children: p })), p;
}, Kr = ({ actions: t, maxVisibleItems: n }) => {
  const { modal: a } = X.useApp(), r = t.filter((l) => !l.hidden);
  if (!n || r.length <= n)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: r.map(({ key: l, ...d }) => /* @__PURE__ */ e.jsx($e, { ...d }, l)) });
  const s = r.slice(0, n - 1), o = r.slice(n - 1).map((l) => {
    const { key: d, label: c, icon: f, permission: m, onClick: p, confirm: u, disabled: x, tooltip: w } = l, j = {
      key: d,
      label: c,
      icon: f,
      disabled: x,
      onClick: async () => {
        u ? a.confirm({
          title: u.title,
          content: u.description,
          onOk: u.onConfirm || p,
          okText: u.okText,
          cancelText: u.cancelText
        }) : p && await p();
      }
    };
    return m ? {
      ...j,
      label: /* @__PURE__ */ e.jsx(it, { permission: m, children: /* @__PURE__ */ e.jsx("span", { children: c ?? w }) })
    } : j;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    s.map(({ key: l, ...d }) => /* @__PURE__ */ e.jsx($e, { ...d }, l)),
    /* @__PURE__ */ e.jsx(Je, { menu: { items: o }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(A, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(qt, {}) }) })
  ] });
}, On = Rt, Dn = (t) => On[t], Xr = ({ iconName: t }) => {
  if (!t)
    return null;
  const n = Dn(t);
  return n ? /* @__PURE__ */ e.jsx(nn, { fallback: null, children: /* @__PURE__ */ e.jsx(n, {}) }) : null;
}, Gr = ({ onChange: t }) => {
  const [n, a] = b(""), [r, s] = b("");
  return /* @__PURE__ */ e.jsxs(E.Compact, { children: [
    /* @__PURE__ */ e.jsx(_, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (i) => a(i.target.value) }),
    /* @__PURE__ */ e.jsx(_, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(_, { style: { width: "calc(100% - 80px)" }, value: r, onChange: (i) => s(i.target.value) }),
    /* @__PURE__ */ e.jsx(A, { type: "primary", icon: /* @__PURE__ */ e.jsx(Wt, {}), onClick: () => {
      t(n, r);
    } })
  ] });
}, Rn = ({ request: t, tableRef: n, ...a }, r) => {
  const [s, i] = b({
    current: 1,
    pageSize: 10
  }), [o, l] = b(0), { data: d, loading: c, refresh: f } = V(async () => {
    const m = await t({
      current: s.current,
      page_size: s.pageSize
    });
    return l(m.total), m.data;
  }, {
    refreshDeps: [s]
  });
  return et(r, () => ({
    reload: () => {
      f();
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
        onChange: (m, p) => {
          i({ current: m, pageSize: p });
        }
      },
      ...a,
      ref: n
    }
  );
}, Qr = ({ actionRef: t, ...n }) => {
  const [a, r] = b();
  return M(() => {
    r(rn(Rn));
  }, []), a ? /* @__PURE__ */ e.jsx(a, { ...n, ref: t }) : null;
}, Zr = ({ className: t, onSuccess: n, token: a }) => {
  const { message: r } = X.useApp(), { t: s } = L("authorization"), { t: i } = L("common"), [o] = C.useForm(), { run: l, loading: d } = V(async (c) => T.authorization.changePassword(c, a ? { headers: { Authorization: `Bearer ${a}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      r.success(s("user.passwordChanged")), o.resetFields(), n == null || n();
    },
    onError: (c) => {
      if (c instanceof an) {
        const f = c.code ?? "normal";
        r.error(s(`user.passwordChangeFailed.${f}`, { error: c.message, defaultValue: "Password change failed: {{error}}" }));
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
            children: /* @__PURE__ */ e.jsx(_.Password, {})
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
            children: /* @__PURE__ */ e.jsx(_.Password, {})
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
                validator(f, m) {
                  return !m || c("new_password") === m ? Promise.resolve() : Promise.reject(new Error(s("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(_.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(C.Item, { className: D("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(A, { type: "primary", htmlType: "submit", loading: d, children: i("save") }) })
      ]
    }
  );
}, es = ({ user: t, onSuccess: n }) => {
  const { message: a } = X.useApp(), { t: r } = L("authorization"), { t: s } = L("common"), [i] = C.useForm(), [o, l] = b(!1);
  Ze.useEffect(() => {
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
    } catch (f) {
      a.error(s("updateFailed")), console.error("Failed to update user information:", f);
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
              children: /* @__PURE__ */ e.jsx(Tn, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            C.Item,
            {
              name: "username",
              label: r("user.username"),
              children: /* @__PURE__ */ e.jsx(_, { disabled: !0 })
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
              children: /* @__PURE__ */ e.jsx(_, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            C.Item,
            {
              name: "full_name",
              label: r("user.fullName"),
              rules: [{ required: !0, message: r("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(_, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            C.Item,
            {
              name: "phone",
              label: r("user.phone"),
              children: /* @__PURE__ */ e.jsx(_, {})
            }
          ),
          /* @__PURE__ */ e.jsx(C.Item, { children: /* @__PURE__ */ e.jsx(A, { type: "primary", htmlType: "submit", loading: o, children: s("save") }) })
        ]
      }
    )
  ] });
}, ts = ({ user: t, onSuccess: n }) => {
  const { message: a } = X.useApp(), { t: r } = L("authorization"), { t: s } = L("common"), [i, o] = b(0), [l, d] = b(!1), [c, f] = b(!0), [m, p] = b(""), [u, x] = b("totp"), [w, S] = b(!1), [j, h] = b("password"), [g, v] = b(""), [y, I] = b(""), [F, N] = b(""), [ie, re] = b(""), [U, G] = b(0);
  M(() => {
    if (U <= 0) return;
    const k = setTimeout(() => G((z) => z - 1), 1e3);
    return () => clearTimeout(k);
  }, [U]);
  const { run: oe, data: q = { secret: "", qr_code: "", token: void 0 } } = V(
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
    } catch (z) {
      a.error(r("mfa.verificationFailed")), console.error("Failed to verify MFA:", z);
    } finally {
      d(!1);
    }
  }, R = () => {
    S(!1), h("password"), v(""), I(""), N(""), re(""), G(0);
  }, { runAsync: fe, loading: le } = V(
    () => T.authorization.sendDisableMfaCode(),
    { manual: !0 }
  ), pt = async () => {
    try {
      const k = await fe();
      re((k == null ? void 0 : k.token) ?? ""), N(""), G(60), a.success(r("mfa.codeSent", { defaultValue: "Verification code has been sent to your email" }));
    } catch (k) {
      a.error(k instanceof Error ? k.message : s("operationFailed")), console.error("Failed to send disable-MFA code:", k);
    }
  }, ce = async () => {
    if (j === "email") {
      if (!ie) {
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
    j === "email" ? (k.email_code = F, k.email_token = ie) : j === "totp" ? k.mfa_code = y : k.password = g;
    try {
      d(!0), await T.authorization.disableMfa(k), a.success(r("mfa.disableSuccess")), R(), n();
    } catch (z) {
      a.error(z instanceof Error ? z.message : s("operationFailed")), console.error("Failed to disable MFA:", z), j === "email" && (re(""), N(""), G(0));
    } finally {
      d(!1);
    }
  }, ft = () => {
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
      var z;
      switch (i) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              de,
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
                onClick: oe,
                loading: l,
                children: r("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              de,
              {
                message: r("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: u === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: u === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(Vt, { value: q.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: u === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              r("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: u === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              r("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: c ? "*".repeat(((z = q.secret) == null ? void 0 : z.length) ?? 0) : q.secret }),
              /* @__PURE__ */ e.jsx(
                A,
                {
                  type: "link",
                  onClick: () => f(!c),
                  icon: c ? /* @__PURE__ */ e.jsx(Qe, {}) : /* @__PURE__ */ e.jsx(Kt, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              _,
              {
                placeholder: r("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: m,
                onChange: (ht) => p(ht.target.value)
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
          ze,
          {
            defaultValue: "totp",
            onChange: (z) => {
              x(z), o(0);
            },
            value: u,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Yt, {}), label: r("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Jt, {}), label: r("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(Xe, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        _t,
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
    ft(),
    /* @__PURE__ */ e.jsxs(
      Ke,
      {
        title: r("mfa.confirmDisable"),
        open: w,
        onOk: ce,
        okText: r("mfa.disable"),
        okButtonProps: { danger: !0, loading: l },
        onCancel: R,
        destroyOnHidden: !0,
        children: [
          /* @__PURE__ */ e.jsx(
            de,
            {
              message: r("mfa.disableWarning"),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          /* @__PURE__ */ e.jsx("p", { children: r("mfa.disableVerifyDescription", { defaultValue: "For security reasons, please verify your identity with your password or a verification code." }) }),
          /* @__PURE__ */ e.jsx(
            ze,
            {
              block: !0,
              value: j,
              onChange: (k) => h(k),
              options: [
                { value: "password", label: r("mfa.methodPassword", { defaultValue: "Password" }) },
                ...(t == null ? void 0 : t.mfa_type) === "totp" ? [{ value: "totp", label: r("mfa.totp", { defaultValue: "TOTP" }) }] : [],
                { value: "email", label: r("mfa.methodEmailCode", { defaultValue: "Email code" }) }
              ],
              style: { marginBottom: 16 }
            }
          ),
          j === "password" && /* @__PURE__ */ e.jsx(
            _.Password,
            {
              placeholder: r("mfa.enterPassword", { defaultValue: "Enter your password" }),
              autoComplete: "current-password",
              value: g,
              onChange: (k) => v(k.target.value),
              onPressEnter: ce
            }
          ),
          j === "totp" && /* @__PURE__ */ e.jsx(
            _,
            {
              placeholder: r("mfa.enterTotpCode", { defaultValue: "Enter the 6-digit code from your authenticator app" }),
              maxLength: 6,
              value: y,
              onChange: (k) => I(k.target.value),
              onPressEnter: ce
            }
          ),
          j === "email" && /* @__PURE__ */ e.jsxs(E.Compact, { style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(
              _,
              {
                placeholder: r("mfa.enterEmailCode", { defaultValue: "Enter the 6-digit code sent to your email" }),
                maxLength: 6,
                value: F,
                onChange: (k) => N(k.target.value),
                onPressEnter: ce
              }
            ),
            /* @__PURE__ */ e.jsx(
              A,
              {
                onClick: pt,
                loading: le,
                disabled: U > 0,
                children: U > 0 ? r("mfa.resendIn", { defaultValue: "Resend ({{seconds}}s)", seconds: U }) : r("mfa.sendCode", { defaultValue: "Send code" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}, { Text: be } = O, ns = () => {
  const { message: t } = X.useApp(), { t: n } = L("authorization"), { t: a } = L("common"), [r, s] = b(null), [i, o] = b(!1), { data: l = [], loading: d, run: c } = V(() => T.authorization.getUserSessions({}), {
    onError: (u) => {
      t.error(n("session.getSessionsFailed", { error: u, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: f } = V((u) => T.authorization.terminateSession({ id: u }), {
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
  }), { run: m } = V(() => T.authorization.terminateOtherSessions(), {
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
  }), p = [
    {
      title: n("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (u, x) => /* @__PURE__ */ e.jsxs(E, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(E, { children: [
          /* @__PURE__ */ e.jsx(Xt, {}),
          /* @__PURE__ */ e.jsx(be, { strong: !0, children: u })
        ] }),
        /* @__PURE__ */ e.jsxs(E, { children: [
          /* @__PURE__ */ e.jsx(Gt, {}),
          /* @__PURE__ */ e.jsx(be, { type: "secondary", children: x.location })
        ] })
      ] })
    },
    {
      title: n("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (u) => /* @__PURE__ */ e.jsxs(E, { children: [
        /* @__PURE__ */ e.jsx(Qt, {}),
        /* @__PURE__ */ e.jsx("span", { children: u })
      ] })
    },
    {
      title: n("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (u) => /* @__PURE__ */ e.jsxs(E, { children: [
        /* @__PURE__ */ e.jsx(Zt, {}),
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
        ue,
        {
          title: n("session.confirmTerminate"),
          onConfirm: () => f(u.id),
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
        ue,
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
    !d && l.length === 0 ? /* @__PURE__ */ e.jsx(Ge, { description: n("session.noSessions") }) : /* @__PURE__ */ e.jsx(
      Fe,
      {
        columns: p,
        dataSource: l,
        rowKey: "id",
        loading: d,
        pagination: !1
      }
    )
  ] });
}, { RangePicker: Mn } = zt, { Option: Q } = ee, Nn = (t) => t || "N/A", $n = (t, n) => t === "success" ? /* @__PURE__ */ e.jsx(Z, { color: "success", children: n("statuses.success") }) : /* @__PURE__ */ e.jsx(Z, { color: "error", children: n("statuses.failed") }), rs = ({
  userId: t,
  request: n = (r) => t ? T.authorization.getUserLogs({ id: t, ...r }) : T.authorization.getCurrentUserLogs(r),
  columnsFilter: a = (r) => r
}) => {
  const { message: r, modal: s } = X.useApp(), { t: i } = L("authorization"), { t: o } = L("common"), [l, d] = b({
    current: 1,
    pageSize: 10,
    total: 0
  }), [c, f] = b({}), [m] = C.useForm(), { loading: p, run: u, data: { data: x } = {} } = V(async (g = c, v = 1, y = 10) => n({
    ...g,
    current: v ?? 1,
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
  M(() => {
    u(c, 1, l.pageSize);
  }, []);
  const w = (g) => {
    d({
      ...l,
      current: g.current || 1,
      pageSize: g.pageSize || 10
    }), u({}, g.current, g.pageSize);
  }, S = (g) => {
    var v, y, I, F;
    u({
      ...g,
      start_time: (y = (v = g.dateRange) == null ? void 0 : v[0]) == null ? void 0 : y.toISOString(),
      end_time: (F = (I = g.dateRange) == null ? void 0 : I[1]) == null ? void 0 : F.toISOString()
    }, 1, l.pageSize);
  }, j = () => {
    m.resetFields(), f({}), d({ ...l, current: 1 }), u({}, 1, l.pageSize);
  }, h = [
    {
      title: i("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (g) => St(g)
    },
    {
      title: i("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (g, v) => g ? i(`action.${g.replace(/:/g, ".")}`, { defaultValue: i(`permission.title.${g.replace(/:/g, ".")}`, { defaultValue: v.action_name }) }) : v.action_name ?? v.action
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
      render: (g) => Nn(g)
    },
    {
      title: i("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (g) => $n(g, i)
    },
    {
      title: i("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (g) => /* @__PURE__ */ e.jsx(A, { type: "link", icon: /* @__PURE__ */ e.jsx(Qe, {}), onClick: () => {
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
        children: /* @__PURE__ */ e.jsxs(Et, { gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(se, { xxl: 6, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(C.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(_, { placeholder: i("auditLog.searchPlaceholder") }) }) }),
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
          /* @__PURE__ */ e.jsx(se, { xxl: 6, xl: 6, lg: 10, md: 12, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(C.Item, { name: "dateRange", noStyle: !0, children: /* @__PURE__ */ e.jsx(Mn, { style: { width: "100%" } }) }) }),
          /* @__PURE__ */ e.jsx(se, { xxl: 5, xl: 24, lg: 14, md: 24, sm: 24, xs: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(E, { children: [
            /* @__PURE__ */ e.jsx(A, { onClick: j, children: o("reset") }),
            /* @__PURE__ */ e.jsx(A, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(en, {}), children: o("search") })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(Ce, { children: /* @__PURE__ */ e.jsx(
      Fe,
      {
        rowKey: "id",
        columns: a(h),
        dataSource: x,
        pagination: {
          ...l,
          showSizeChanger: !0,
          showTotal: (g) => o("totalItems", { total: g })
        },
        loading: p,
        onChange: w,
        scroll: { x: "max-content" }
      }
    ) })
  ] });
}, { Text: Bn } = O, ss = ({ kind: t, subjectId: n, readOnly: a }) => {
  const { message: r } = X.useApp(), { t: s } = L("authorization"), { t: i } = L("common"), [o] = C.useForm(), l = t === "user" ? T.authorization.getUserRateLimit : T.authorization.getServiceAccountRateLimit, d = t === "user" ? T.authorization.updateUserRateLimit : T.authorization.updateServiceAccountRateLimit, { data: c, loading: f, refresh: m } = V(() => l({ id: n }), {
    ready: !!n,
    refreshDeps: [n, t],
    onSuccess: (h) => {
      o.setFieldsValue({
        rate: h.rate,
        period: h.period || "1m",
        burst: h.burst,
        quota: h.quota,
        quota_period: h.quota_period || "1d",
        enabled: h.enabled !== !1
      });
    }
  }), { run: p, loading: u } = V(
    async (h) => d({ id: n }, {
      ...h,
      clear: !1,
      inherited: !1,
      enabled: h.enabled !== !1
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("rateLimit.saveSuccess", { defaultValue: "Rate limit override saved" })), m();
      },
      onError: (h) => {
        r.error(h.message || s("rateLimit.saveFailed", { defaultValue: "Failed to save override" }));
      }
    }
  ), { run: x, loading: w } = V(
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
      onError: (h) => {
        r.error(h.message);
      }
    }
  ), { run: S, loading: j } = V(
    async () => t === "user" ? T.authorization.resetUserRateLimit({ id: n }) : T.authorization.resetServiceAccountRateLimit({ id: n }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("rateLimit.resetCountersSuccess", { defaultValue: "Counters reset" }));
      },
      onError: (h) => {
        r.error(h.message);
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(C, { form: o, layout: "vertical", onFinish: p, disabled: a || f, style: { maxWidth: 480, marginTop: 16 }, children: [
    (c == null ? void 0 : c.inherited) && /* @__PURE__ */ e.jsx(
      de,
      {
        type: "info",
        showIcon: !0,
        style: { marginBottom: 16 },
        message: s("rateLimit.inherited", { defaultValue: "Using the type default. Save to create a subject-specific override." })
      }
    ),
    /* @__PURE__ */ e.jsx(C.Item, { name: "rate", label: s("rateLimit.rate", { defaultValue: "Rate" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(he, { min: 1, style: { width: "100%" } }) }),
    /* @__PURE__ */ e.jsx(C.Item, { name: "period", label: s("rateLimit.period", { defaultValue: "Period" }), extra: s("rateLimit.periodHint", { defaultValue: "Examples: 1s, 1m, 1h" }), children: /* @__PURE__ */ e.jsx(_, { placeholder: "1m" }) }),
    /* @__PURE__ */ e.jsx(C.Item, { name: "burst", label: s("rateLimit.burst", { defaultValue: "Burst" }), children: /* @__PURE__ */ e.jsx(he, { min: 1, style: { width: "100%" } }) }),
    /* @__PURE__ */ e.jsx(C.Item, { name: "quota", label: s("rateLimit.quota", { defaultValue: "Daily quota (0 = none)" }), children: /* @__PURE__ */ e.jsx(he, { min: 0, style: { width: "100%" } }) }),
    /* @__PURE__ */ e.jsx(C.Item, { name: "quota_period", label: s("rateLimit.quotaPeriod", { defaultValue: "Quota period" }), children: /* @__PURE__ */ e.jsx(_, { placeholder: "1d" }) }),
    /* @__PURE__ */ e.jsx(
      C.Item,
      {
        name: "enabled",
        label: s("rateLimit.enabled", { defaultValue: "Enabled" }),
        valuePropName: "checked",
        extra: s("rateLimit.enabledHint", { defaultValue: "Off: this override is ignored and the type default applies. Use Reset to default to delete the override." }),
        children: /* @__PURE__ */ e.jsx(Pt, {})
      }
    ),
    !a && /* @__PURE__ */ e.jsxs(E, { children: [
      /* @__PURE__ */ e.jsx(A, { type: "primary", htmlType: "submit", loading: u, children: i("save", { defaultValue: "Save" }) }),
      /* @__PURE__ */ e.jsx(
        ue,
        {
          title: s("rateLimit.resetCountersConfirm", { defaultValue: "Reset rate-limit and quota counters for this subject? They will be able to send requests immediately." }),
          onConfirm: () => S(),
          children: /* @__PURE__ */ e.jsx(A, { htmlType: "button", icon: /* @__PURE__ */ e.jsx(tn, {}), loading: j, children: s("rateLimit.resetCounters", { defaultValue: "Reset counters" }) })
        }
      ),
      !(c != null && c.inherited) && /* @__PURE__ */ e.jsx(A, { onClick: () => x(), loading: w, children: s("rateLimit.resetToDefault", { defaultValue: "Reset to default" }) })
    ] }),
    (c == null ? void 0 : c.inherited) && /* @__PURE__ */ e.jsx(Bn, { type: "secondary", children: s("rateLimit.sourceHint", { defaultValue: "Values shown are inherited." }) })
  ] });
}, { Text: Be } = O, Hn = {
  debug: "default",
  info: "processing",
  warn: "warning",
  error: "error"
}, as = ({ taskId: t, poll: n }) => {
  const { t: a } = L("task"), { data: r = [], loading: s } = V(
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
            /* @__PURE__ */ e.jsx(Be, { type: "secondary", style: { fontSize: 11 }, children: i.created_at }),
            i.level && /* @__PURE__ */ e.jsxs(Be, { type: Hn[i.level], style: { marginLeft: 8, fontSize: 11 }, children: [
              "[",
              i.level,
              "]"
            ] }),
            /* @__PURE__ */ e.jsx("div", { style: { display: "inline", marginLeft: 8 }, children: i.message })
          ] }, i.id))
        }
      ) : /* @__PURE__ */ e.jsx(Ge, { description: a("noLogs", { defaultValue: "No logs yet." }) })
    }
  );
}, Un = H(({ token: t, css: n }) => ({
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
function qn(t) {
  const n = t.trim();
  if (!n)
    return "";
  try {
    return JSON.stringify(JSON.parse(n), null, 2);
  } catch {
    return n;
  }
}
function Wn(t) {
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
function ot(t, n) {
  return t ? t.id === "approve" ? n("chat.hitlExecute", { defaultValue: t.label || "Execute" }) : t.id === "reject" ? n("chat.hitlDontExecute", { defaultValue: t.label || "Don't execute" }) : t.label : "";
}
function Yn(t, n, a) {
  var s;
  const r = (s = t.options) == null ? void 0 : s.find((i) => i.id === n);
  return ot(r, a) || n || "…";
}
const is = ({
  card: t,
  submitting: n = !1,
  onSelect: a
}) => {
  var S, j;
  const { t: r } = L("ai"), { styles: s } = Un(), i = qn(t.arguments || ""), [o, l] = b(t.selected_option_id || "");
  M(() => {
    l(t.selected_option_id || "");
  }, [t.selected_option_id, t.tool_call_id]);
  const d = o || t.selected_option_id || "", c = ((S = t.title) == null ? void 0 : S.trim()) || t.tool_name, f = !!((j = t.title) != null && j.trim() && t.tool_name && t.title.trim() !== t.tool_name && t.tool_name !== "ui_choose"), m = t.kind === "choice" || t.tool_name === "ui_choose", p = Wn(t), u = !m && !!i, x = t.status === "abandoned" || t.status === "decided";
  let w;
  return t.status === "abandoned" ? w = /* @__PURE__ */ e.jsx(O.Text, { type: "secondary", children: r("chat.hitlAbandoned", { defaultValue: "You continued without choosing." }) }) : x && d ? w = /* @__PURE__ */ e.jsx(O.Text, { children: r("chat.hitlChose", {
    defaultValue: "You chose {{label}}.",
    label: Yn(t, d, r)
  }) }) : x ? w = /* @__PURE__ */ e.jsx(O.Text, { children: r("chat.hitlChose", {
    defaultValue: "You chose {{label}}.",
    label: "…"
  }) }) : w = /* @__PURE__ */ e.jsx("div", { className: s.actions, children: (t.options ?? []).map((h) => {
    const g = d === h.id;
    return /* @__PURE__ */ e.jsx(
      A,
      {
        className: s.action,
        type: g ? "primary" : "default",
        loading: n && g,
        disabled: n,
        onClick: () => {
          l(h.id), a == null || a(h.id);
        },
        children: /* @__PURE__ */ e.jsxs(Pe, { vertical: !0, align: "flex-start", children: [
          /* @__PURE__ */ e.jsx("span", { children: ot(h, r) }),
          h.description ? /* @__PURE__ */ e.jsx("span", { style: { fontSize: 12, fontWeight: 400, opacity: 0.85 }, children: h.description }) : null
        ] })
      },
      h.id
    );
  }) }), /* @__PURE__ */ e.jsxs("div", { className: s.wrap, children: [
    /* @__PURE__ */ e.jsxs("div", { className: s.header, children: [
      /* @__PURE__ */ e.jsx("span", { className: s.title, children: c }),
      f ? /* @__PURE__ */ e.jsx(O.Text, { className: s.toolName, type: "secondary", code: !0, children: t.tool_name }) : null
    ] }),
    /* @__PURE__ */ e.jsxs(Pe, { vertical: !0, gap: 8, children: [
      p ? /* @__PURE__ */ e.jsx("div", { className: s.description, children: p }) : null,
      u ? /* @__PURE__ */ e.jsx(
        Ot,
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
      w
    ] })
  ] });
};
function Jn(t) {
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
function Kn({ open: t }) {
  const { styles: n, cx: a } = pe();
  return /* @__PURE__ */ e.jsx("svg", { className: a(n.chevron, t && n.chevronOpen), width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ e.jsx("path", { d: "M6 4.5 10 8 6 11.5", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Xn() {
  return /* @__PURE__ */ e.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: [
    /* @__PURE__ */ e.jsx("rect", { x: "6", y: "6", width: "7", height: "7", rx: "1.4", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ e.jsx("path", { d: "M10 6V4.2A1.2 1.2 0 0 0 8.8 3H4.2A1.2 1.2 0 0 0 3 4.2v4.6A1.2 1.2 0 0 0 4.2 10H6", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function Gn() {
  return /* @__PURE__ */ e.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ e.jsx("path", { d: "M3.5 8.2 6.4 11 12.5 5", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function He({ call: t }) {
  var d;
  const { styles: n, cx: a } = pe(), { t: r } = L("ai"), s = t.status === "running" || t.status === "pending", i = t.status === "failed", o = i ? r("chat.toolFailed", { defaultValue: "Failed" }) : s ? r("chat.toolRunning", { defaultValue: "Running" }) : r("chat.toolDone", { defaultValue: "Done" }), l = (d = t.title) == null ? void 0 : d.trim();
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx("code", { className: n.name, children: t.name }),
    l ? /* @__PURE__ */ e.jsx("span", { className: n.title, title: l, children: l }) : null,
    /* @__PURE__ */ e.jsx("span", { className: a(n.status, s && n.statusRunning, i && n.statusFailed), children: o })
  ] });
}
function Qn({ call: t }) {
  const { styles: n } = pe(), a = t.status === "running" || t.status === "pending";
  return t.arguments ? /* @__PURE__ */ e.jsx("section", { className: n.run, "aria-busy": a, children: /* @__PURE__ */ e.jsxs("details", { className: n.run, children: [
    /* @__PURE__ */ e.jsx("summary", { className: n.summary, children: /* @__PURE__ */ e.jsx(He, { call: t }) }),
    /* @__PURE__ */ e.jsx("pre", { className: n.pre, children: Jn(t.arguments) })
  ] }) }) : /* @__PURE__ */ e.jsx("section", { className: n.run, "aria-busy": a, children: /* @__PURE__ */ e.jsx("p", { className: n.line, children: /* @__PURE__ */ e.jsx(He, { call: t }) }) });
}
function os({
  text: t,
  tools: n = [],
  live: a = !1,
  align: r = "start"
}) {
  const { styles: s, cx: i } = pe(), { t: o } = L("ai"), [l, d] = b(a), [c, f] = b(!1), m = c ? o("chat.copied", { defaultValue: "Copied" }) : o("chat.copyMessage", { defaultValue: "Copy message" }), p = l ? o("chat.hideToolCalls", { defaultValue: "Hide tool calls" }) : o("chat.showToolCalls", { defaultValue: "Show tool calls" });
  async function u() {
    try {
      await navigator.clipboard.writeText(t), f(!0), window.setTimeout(() => f(!1), 1200);
    } catch {
      f(!1);
    }
  }
  return !t && n.length === 0 ? null : /* @__PURE__ */ e.jsxs("div", { className: i("chat-message-actions", s.root, r === "end" && s.rootEnd, l && n.length > 0 && "has-tools"), children: [
    /* @__PURE__ */ e.jsxs("div", { className: s.actions, children: [
      t ? /* @__PURE__ */ e.jsx(ae, { title: m, placement: "bottom", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: s.action, "aria-label": m, onClick: () => void u(), children: c ? /* @__PURE__ */ e.jsx(Gn, {}) : /* @__PURE__ */ e.jsx(Xn, {}) }) }) : null,
      n.length > 0 ? /* @__PURE__ */ e.jsx(ae, { title: p, placement: "bottom", children: /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: s.action,
          "aria-expanded": l,
          "aria-label": p,
          onClick: () => d((x) => !x),
          children: /* @__PURE__ */ e.jsx(Kn, { open: l })
        }
      ) }) : null
    ] }),
    n.length > 0 ? /* @__PURE__ */ e.jsx("div", { className: i("chat-tool-log", s.rows), hidden: !l, children: n.map((x) => /* @__PURE__ */ e.jsx(Qn, { call: x }, x.id)) }) : null
  ] });
}
const Zn = {
  width: "100%"
};
function Ve({
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
  placeholder: f,
  readonly: m,
  value: p,
  schema: u
}) {
  const [x, w] = b(!1), { formContext: S } = a, { readonlyAsDisabled: j = !0 } = S, { enumOptions: h, enumDisabled: g, emptyValue: v } = c, y = xn(c), I = ($) => l(xe($, h, y, v)), F = () => o(r, xe(p, h, y, v)), N = () => d(r, xe(p, h, y, v)), ie = ($, R) => R && tt(R.label) ? R.label.toLowerCase().includes($.toLowerCase()) : !1, re = Ve.getPopupContainerCallback(), U = yn(p, h, !!i, y, v), G = {
    name: s || r
  }, oe = !i && u.default === void 0, q = te(() => {
    if (Array.isArray(h)) {
      const $ = h.map(
        ({ value: R, label: fe }, le) => ({
          disabled: Array.isArray(g) && g.includes(R),
          key: String(le),
          value: bn(R, le, y),
          label: fe
        })
      );
      return oe && $.unshift({ value: "", label: f || "" }), $;
    }
  }, [g, h, f, oe, y]);
  return /* @__PURE__ */ e.jsx(
    ee,
    {
      open: x,
      autoFocus: t,
      disabled: n || j && m,
      getPopupContainer: re,
      id: r,
      mode: i ? "multiple" : void 0,
      onBlur: m ? void 0 : F,
      onChange: m ? void 0 : I,
      onFocus: m ? void 0 : N,
      placeholder: f,
      style: Zn,
      value: U,
      maxTagCount: i ? "responsive" : void 0,
      ...G,
      onOpenChange: w,
      filterOption: ie,
      "aria-describedby": nt(r),
      options: q
    }
  );
}
Ve.getPopupContainerCallback = () => (t) => (t == null ? void 0 : t.parentElement) ?? document.body;
const er = {
  width: "100%"
};
function lt(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
}
function ct(t, n) {
  if (!Array.isArray(t))
    return [];
  const a = [];
  for (const r of t) {
    if (!lt(r) || r.value == null || r.value === "")
      continue;
    const s = ct(r.children, n), i = String(r.value);
    a.push({
      value: i,
      title: r.label == null || r.label === "" ? i : String(r.label),
      disabled: r.disabled === !0 || n && s.length > 0,
      children: s.length > 0 ? s : void 0
    });
  }
  return a;
}
function tr(t) {
  const n = /* @__PURE__ */ new Map(), a = (r) => {
    const s = String(r.value ?? ""), i = r.children ?? [], o = i.length === 0 ? r.disabled || s === "" ? [] : [s] : i.flatMap((l) => a(l));
    return s !== "" && n.set(s, o), o;
  };
  return t.forEach(a), n;
}
function Ue(t, n) {
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
      if (lt(o)) {
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
const nr = (t, n) => {
  const a = n.title;
  return typeof a == "string" && a.toLowerCase().includes(t.toLowerCase());
}, rr = (t) => t.parentElement ?? document.body;
function sr({
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
  value: f,
  schema: m
}) {
  const { formContext: p } = a, { readonlyAsDisabled: u = !0 } = p, x = !!s || m.type === "array", w = te(
    () => ct(m["x-tree-options"], !x),
    [m, x]
  ), S = te(() => tr(w), [w]), j = Ue(f, S), h = x ? j : j[0], g = (v) => {
    const y = Ue(v, S);
    o(x ? y : y[0]);
  };
  return /* @__PURE__ */ e.jsx(
    Oe,
    {
      id: r,
      autoFocus: t,
      allowClear: !0,
      disabled: n || u && c,
      getPopupContainer: rr,
      placeholder: d,
      showSearch: !0,
      style: er,
      treeData: w,
      treeDefaultExpandAll: !0,
      treeCheckable: x || void 0,
      showCheckedStrategy: x ? Oe.SHOW_CHILD : void 0,
      maxTagCount: x ? "responsive" : void 0,
      value: h,
      filterTreeNode: nr,
      onBlur: c ? void 0 : () => i(r, f),
      onChange: c ? void 0 : g,
      onFocus: c ? void 0 : () => l(r, f),
      "aria-describedby": nt(r)
    }
  );
}
const { FieldTemplate: je } = mn, ar = 2, ir = H(({ css: t }) => ({
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
})), or = (t) => {
  var n;
  return /* @__PURE__ */ e.jsx(
    dt,
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
    return JSON.stringify(t, null, ar);
  } catch {
    return "";
  }
}
function qe(t) {
  const n = t.trim();
  if (n !== "")
    try {
      return JSON.parse(n);
    } catch {
      return;
    }
}
function lr({ t, ...n }) {
  const { isDarkMode: a } = Dt(), { formData: r, schema: s, onChange: i, disabled: o, id: l, required: d, name: c, fieldPathId: f } = n, m = Array.isArray(s.examples) ? s.examples : [], p = Y(void 0), u = Y(!1), [x, w] = b(() => ve(r)), [S, j] = b(null), h = mt(n.fieldPathId.path);
  M(() => {
    if (u.current) {
      u.current = !1;
      return;
    }
    p.current !== r && (p.current = r, w(ve(r)), j(null));
  }, [r]);
  const g = B(
    (y) => {
      w(y);
      const I = qe(y);
      if (I === void 0 && y.trim() !== "") {
        j("Invalid JSON");
        return;
      }
      j(null), p.current = I, u.current = !0, i(I, f.path);
    },
    [i, f]
  ), v = B(
    (y) => {
      const I = m[y];
      if (I === void 0) return;
      let F = typeof I == "string" ? qe(I) : I;
      F && typeof F == "object" && !Array.isArray(F) && "value" in F && F.value !== void 0 && (F = F.value);
      const N = ve(F);
      w(N), j(null), p.current = F, u.current = !0, i(F, f.path);
    },
    [i, m, f]
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
            onChange: (y) => y != null && v(y)
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-label", children: /* @__PURE__ */ e.jsx("label", { className: d ? "ant-form-item-required" : "ant-form-item-optional", children: h ? t == null ? void 0 : t(`${h}.label`, { defaultValue: s.title || c }) : s.title || c }) }),
    /* @__PURE__ */ e.jsx(
      hn,
      {
        value: x,
        height: "200px",
        theme: a ? "dark" : "light",
        extensions: [gn()],
        onChange: g,
        editable: !o,
        basicSetup: { lineNumbers: !0, foldGutter: !0 }
      }
    ),
    S && /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-additional", children: /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-explain ant-form-item-explain-connected", children: /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-explain-error", children: /* @__PURE__ */ e.jsx("div", { id: "root_args__error", children: /* @__PURE__ */ e.jsx("div", { children: S }) }) }) }) })
  ] });
}
const cr = (t) => (n) => /* @__PURE__ */ e.jsx(lr, { ...n, t });
function dr(t) {
  return Array.isArray(t) ? t : t && typeof t == "object" && Array.isArray(t.data) ? t.data : [];
}
function We(t, n, a = "", r = "", s) {
  const i = n.label_key ? t[n.label_key] : void 0, o = n.value_key ? t[n.value_key] : void 0, l = o != null && String(o) !== "" ? String(o) : r, d = i != null && String(i) !== "" ? String(i) : a || l;
  return { label: s ? s(d, t) : d, value: l };
}
function ur(t, n) {
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
async function mr(t, n) {
  switch (t.type) {
    case "toolsets":
      return ((await T.system.listToolSets(n)).data ?? []).map((r) => We(
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
      const a = t.url.startsWith("/") ? await on(t.url, {
        method: t.method,
        params: n
      }) : (await fn(t.url, { params: n, method: t.method })).data;
      return dr(a).map((r) => We(r, t)).filter((r) => r.value !== "");
    }
    default:
      return [];
  }
}
const dt = (t) => {
  const { schema: n, value: a, onChange: r, disabled: s, readonly: i, multiple: o, placeholder: l } = t, d = (n == null ? void 0 : n["x-data-source"]) || {}, c = !!o || (n == null ? void 0 : n.type) === "array", [f, m] = b(""), p = Y(/* @__PURE__ */ new Map()), u = te(() => ur(d, f), [d, f]), x = `${d.type ?? ""}:${d.method ?? ""}:${d.url ?? ""}:${JSON.stringify(u)}`, w = typeof d.cache_ttl == "number" ? d.cache_ttl * 1e3 : 0, { data: S, loading: j } = V(
    () => mr(d, u),
    {
      ready: d.type === "toolsets" || d.type === "api",
      refreshDeps: [x],
      debounceWait: 300,
      cacheKey: x,
      cacheTime: w,
      staleTime: w
    }
  ), h = te(() => {
    const v = /* @__PURE__ */ new Map();
    for (const y of S ?? [])
      p.current.set(y.value, y.label || y.value), v.set(y.value, y);
    for (const y of we(a, c))
      v.has(y) || v.set(y, { label: p.current.get(y) || y, value: y });
    return Array.from(v.values());
  }, [S, a, c]), g = c ? we(a, !0) : we(a, !1)[0];
  return /* @__PURE__ */ e.jsx(
    ee,
    {
      mode: c ? "multiple" : void 0,
      maxTagCount: c ? "responsive" : void 0,
      maxTagPlaceholder: (v) => `+${v.length}`,
      showSearch: !0,
      filterOption: !1,
      onSearch: m,
      onOpenChange: (v) => {
        v || m("");
      },
      options: h,
      value: g,
      loading: j,
      disabled: s || i,
      placeholder: l,
      allowClear: !0,
      onChange: (v) => r == null ? void 0 : r(c ? Array.isArray(v) ? v : [] : v),
      style: { width: "100%" }
    }
  );
};
function ut(t) {
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
            const f = r(d.properties[c]);
            i[c] = f;
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
const mt = (t) => t.filter((n) => !dn(n)).join("."), pr = (t) => ({ uiSchema: n, label: a, ...r }) => {
  if (!je) return null;
  const s = mt(r.fieldPathId.path);
  if (!t || !s) return /* @__PURE__ */ e.jsx(je, { ...r, label: a, uiSchema: n });
  const i = n == null ? void 0 : n["ui:placeholder"], o = () => {
    var l, d, c, f;
    if ((l = r.description) != null && l.props)
      return /* @__PURE__ */ e.jsx(
        r.registry.templates.DescriptionFieldTemplate,
        {
          ...(d = r.description) == null ? void 0 : d.props,
          description: t == null ? void 0 : t(`${s}.description`, { defaultValue: (f = (c = r.description) == null ? void 0 : c.props) == null ? void 0 : f.description })
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
}, fr = (t) => {
  const n = t.split("-")[0];
  return De[t] || De[n];
}, ke = ({
  schema: t,
  value: n,
  onChange: a,
  uiSchema: r,
  disabled: s = !1,
  formRef: i,
  t: o
}) => {
  const { styles: l } = ir(), d = n ?? {}, { i18n: c } = L(), f = te(() => pn({}, fr(c.language)), [c.language]);
  et(i, () => ({
    validate: (u) => {
      const x = f.validateFormData(u, t, void 0, void 0, p);
      return x.errors.filter((w) => w.name !== "additionalProperties").length > 0 ? Promise.reject(x.errors[0].message) : Promise.resolve();
    }
  }));
  const m = B(
    ({ formData: u }) => {
      a == null || a(u ?? {});
    },
    [a]
  ), p = Ze.useMemo(() => t ? {
    ...ut(t) || {},
    ...r || {}
  } : {}, [t, r]);
  return /* @__PURE__ */ e.jsx(
    un,
    {
      tagName: "div",
      className: D(l.jsonSchemaForm, "json-schema-config-form"),
      schema: t || {},
      formData: d,
      onChange: m,
      validator: f,
      uiSchema: p || {},
      disabled: s,
      showErrorList: !1,
      liveValidate: "onChange",
      autoComplete: "off",
      fields: {
        objectEditor: cr(o)
      },
      widgets: {
        remoteSelect: dt,
        toolsetsSelect: or,
        select: Ve,
        treeSelect: sr
      },
      templates: {
        FieldTemplate: pr(o)
      },
      formContext: {
        descriptionLocation: "tooltip"
      }
    }
  );
}, hr = ({ schema: t, uiSchema: n, t: a, ...r }) => {
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
}, ls = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  JsonSchemaConfigForm: ke,
  JsonSchemaConfigFormItem: hr,
  buildUiSchema: ut,
  default: ke
}, Symbol.toStringTag, { value: "Module" }));
export {
  Br as A,
  os as C,
  Xr as D,
  me as H,
  qr as I,
  Re as L,
  Hr as O,
  Nr as P,
  Wr as R,
  Ur as T,
  rs as U,
  $r as a,
  Kr as b,
  Jr as c,
  Sn as d,
  Tn as e,
  Gr as f,
  it as g,
  Qr as h,
  Dn as i,
  Yr as j,
  Zr as k,
  es as l,
  ts as m,
  ns as n,
  ss as o,
  as as p,
  is as q,
  ls as r
};
