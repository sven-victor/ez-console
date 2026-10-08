import { j as e } from "./vendor.js";
import { Navigate as ve, useNavigate as Le } from "react-router-dom";
import { u as pe, a as fe, b as he, c as $e, d as Ye } from "./contexts.js";
import { g as We, i as Xe, a as Ke, b as Ge, c as Je, f as Qe } from "./base.js";
import { Spin as xe, Result as ce, Dropdown as Ae, Avatar as Ze, Upload as et, Modal as ze, Popover as tt, List as M, Image as st, Divider as Fe, Skeleton as nt, Progress as rt, Typography as R, Button as w, Tag as K, Badge as at, Space as F, Tooltip as de, App as O, Popconfirm as ee, Input as I, Table as ge, Form as b, Alert as Z, Segmented as we, Steps as it, QRCode as ot, Empty as Pe, Card as ue, Row as lt, Col as W, Select as me, DatePicker as ct, InputNumber as re, Switch as dt } from "antd";
import { useTranslation as C } from "react-i18next";
import { createStyles as te } from "antd-style";
import * as ut from "@ant-design/icons";
import { UploadOutlined as mt, CheckOutlined as pt, TeamOutlined as ft, UnorderedListOutlined as ht, DownloadOutlined as xt, BellOutlined as gt, MoreOutlined as yt, PlusOutlined as jt, ClockCircleFilled as bt, MailOutlined as vt, EyeOutlined as Ve, EyeInvisibleOutlined as wt, LaptopOutlined as St, EnvironmentOutlined as kt, GlobalOutlined as Ct, ClockCircleOutlined as It, SearchOutlined as Tt, UndoOutlined as Lt } from "@ant-design/icons";
import At, { useState as g, useEffect as B, useCallback as X, useRef as ae, Suspense as zt, forwardRef as Ft, useImperativeHandle as Pt } from "react";
import { a as v } from "./index.js";
import { useRequest as L } from "ahooks";
import E from "classnames";
import { createPortal as Vt } from "react-dom";
import { b as ie, A as Et } from "./client.js";
import Mt from "antd-img-crop";
import Rt from "react-infinite-scroll-component";
import { isString as Dt } from "lodash-es";
const Se = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(xe, { size: "large" }) }), ks = ({
  element: n,
  requiredPermission: t,
  requiredPermissions: a
}) => {
  const { t: s } = C(), { user: r, loading: i, error: o } = pe(), { hasPermission: d, hasAllPermissions: m } = fe();
  return i ? /* @__PURE__ */ e.jsx(Se, {}) : o ? o.code === "E4011" ? /* @__PURE__ */ e.jsx(Se, {}) : /* @__PURE__ */ e.jsx(
    ce,
    {
      status: "500",
      title: "500",
      subTitle: s("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (o == null ? void 0 : o.message) || o })
    }
  ) : r ? t && !d(t) ? /* @__PURE__ */ e.jsx(ve, { to: "/forbidden", replace: !0 }) : a && !m(a) ? /* @__PURE__ */ e.jsx(ve, { to: "/forbidden", replace: !0 }) : n : (window.location.href = We("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, _t = te(({ token: n, css: t }) => ({
  container: t`
      ${t`
        @media screen and (max-width: ${n.screenXS}px) {
          width: 100% !important;
          > * {
            border-radius: 0 !important;
          }
        }
      `}
    > *{
      background-color: ${n.colorBgElevated};
      border-radius: 4px;
      box-shadow: ${n.boxShadowTertiary};
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
      color: n.colorPrimaryTextHover
    }
  }
})), se = ({
  overlayClassName: n,
  overlay: t,
  hidden: a,
  children: s,
  ...r
}) => {
  const { styles: i } = _t();
  return a ? /* @__PURE__ */ e.jsx(e.Fragment, {}) : /* @__PURE__ */ e.jsx(
    Ae,
    {
      popupRender: t,
      overlayClassName: E(i.container, n),
      ...r,
      children: /* @__PURE__ */ e.jsx("span", { className: i.iconStyle, children: s })
    }
  );
}, Ot = () => /* @__PURE__ */ e.jsxs(
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
), Bt = te(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), Nt = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], Cs = ({
  transformLangConfig: n = (a) => a,
  className: t
}) => {
  const { i18n: a } = C(), { styles: s } = Bt(), r = (o) => {
    a.changeLanguage(o);
  }, i = {
    selectedKeys: [a.language],
    onClick: (o) => {
      r(o.key);
    },
    items: n(Nt).map((o) => ({
      key: o.lang,
      className: s.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (o == null ? void 0 : o.label) || "en-US", className: s.menuItemIconStyle, children: (o == null ? void 0 : o.icon) || "🌐" }),
        (o == null ? void 0 : o.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    se,
    {
      className: t,
      menu: i,
      children: /* @__PURE__ */ e.jsx(Ot, {})
    }
  );
}, Ht = te(({ css: n }) => ({
  avatarItem: n`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), ye = (n) => Dt(n) && n.match(/^[-_a-zA-Z0-9]+$/) ? ie.endsWith("/") ? ie + `files/${n}` : ie + `/files/${n}` : n, Is = ({ src: n, fallback: t, ...a }) => /* @__PURE__ */ e.jsx(Ze, { src: ye(n), icon: t, ...a }), Ut = ({ onChange: n, shape: t = "square" }) => {
  const [a, s] = g([]), { styles: r } = Ht(), [i, o] = g(!1), [d, m] = g(!0), [c, f] = g(0), { run: u, loading: p } = L(() => v.base.listFiles({ current: c + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: y }) => {
      console.log(y), s([...a, ...y]), m(y.length === 40), f(c + 1);
    }
  }), l = () => {
    m(!0), f(0), s([]);
  };
  return /* @__PURE__ */ e.jsx(
    tt,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (y) => {
        o(y), y ? u() : l();
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
            Rt,
            {
              dataLength: a.length,
              next: () => {
                u();
              },
              hasMore: d,
              loader: /* @__PURE__ */ e.jsx(nt, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(Fe, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                M,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: a,
                  style: { margin: "0 8px" },
                  loading: p,
                  renderItem: ({ id: y }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: r.avatarItem,
                      onClick: (A) => {
                        A.stopPropagation(), n == null || n(y), o(!1), l();
                      },
                      children: /* @__PURE__ */ e.jsx(st, { src: ye(y), placeholder: /* @__PURE__ */ e.jsx(xe, { size: "default" }), preview: !1 })
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
        mt,
        {
          shape: t,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, qt = ({ value: n, onChange: t, shape: a, ...s }) => {
  const [r, i] = g(void 0), [o, d] = g(!1), [m, c] = g(void 0), f = async (u) => {
    d(!0), c(u.url ?? u.preview);
  };
  return B(() => {
    i(n ? {
      uid: n,
      name: n,
      url: ye(n)
    } : void 0);
  }, [n]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Mt,
      {
        beforeCrop: async (u) => {
          if (u.type === "image/svg+xml") {
            const p = await v.base.uploadFile({ type: "avatar" }, u);
            return p.length > 0 && (t == null || t(p[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          et,
          {
            customRequest: async (u) => {
              var l, y;
              const p = await v.base.uploadFile({ type: "avatar", access: "public" }, u.file);
              p.length > 0 ? ((l = u.onSuccess) == null || l.call(u, p[0].id), t == null || t(p[0].id)) : (y = u.onError) == null || y.call(u, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: f,
            maxCount: 1,
            onChange: ({ file: u }) => {
              switch (u.status) {
                case "removed":
                  t == null || t(void 0);
                  break;
                case "done":
                  break;
                default:
                  i(u);
                  break;
              }
            },
            fileList: r ? [r] : [],
            ...s,
            children: r ? void 0 : /* @__PURE__ */ e.jsx(Ut, { shape: a, onChange: t })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(ze, { open: o, footer: null, onCancel: () => d(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: m }) })
  ] });
}, Ts = ({ className: n }) => {
  const { t } = C("common"), { user: a } = pe(), { currentOrgId: s, setCurrentOrgId: r } = he(), i = (a == null ? void 0 : a.organizations) || [], o = (f) => {
    r(f), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const d = i.find((f) => f.id === s), m = d ? d.name : t("organization.global", { defaultValue: "Global" }), c = [
    ...i.map((f) => ({
      key: f.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: f.name }),
        s === f.id && /* @__PURE__ */ e.jsx(pt, {})
      ] }),
      onClick: () => o(f.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    se,
    {
      className: n,
      menu: {
        items: c,
        selectedKeys: s ? [s] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(ft, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: m })
      ]
    }
  );
}, $t = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Ls = ({ className: n }) => {
  const { t } = C("task"), a = Le(), { user: s } = $e(), { tasksDropdownOpen: r, setTasksDropdownOpen: i, tasks: o, setTasks: d } = he(), { runAsync: m, loading: c } = L(async () => v.tasks.listUserTasks({}), {
    onSuccess: (p) => {
      Xe(o, p, (l, y) => l.id === y.id && l.status === y.status && l.progress === y.progress) || d(p);
    },
    pollingInterval: r ? 3e3 : 6e4,
    ready: !!s,
    refreshDeps: [s]
  });
  B(() => {
    r && m();
  }, [r]);
  const f = async (p) => {
    const l = await v.base.downloadFile({ fileKey: p }, { params: { method: "sign" } }), y = `/api/files/${p}?signature=${l.signature}&expires=${l.expires}`;
    window.open(y, "_blank");
  }, u = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      M,
      {
        size: "small",
        dataSource: o,
        loading: c,
        renderItem: (p) => /* @__PURE__ */ e.jsx(
          M.Item,
          {
            extra: /* @__PURE__ */ e.jsx(K, { color: $t[p.status], style: { marginLeft: 6 }, children: t(`status.${p.status}`, { defaultValue: p.status }) }),
            actions: [
              p.artifact_file_key && /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx(xt, {}),
                  onClick: () => f(p.artifact_file_key)
                }
              )
            ].filter(Boolean),
            children: /* @__PURE__ */ e.jsx(
              M.Item.Meta,
              {
                title: /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13 }, children: /* @__PURE__ */ e.jsxs(R.Text, { ellipsis: { tooltip: !0 }, children: [
                  t(`type.${p.type}`, { defaultValue: p.type }),
                  " ",
                  p.artifact_file_name && `- ${p.artifact_file_name}`
                ] }) }),
                description: (p.status === "running" || p.status === "pending") && /* @__PURE__ */ e.jsx(rt, { percent: p.progress ?? 0, size: "small", style: { marginTop: 4 } })
              }
            )
          },
          p.id
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", onClick: () => a("/tasks"), children: t("more", { defaultValue: "More" }) }) })
  ] });
  return !o || o.length === 0 ? null : /* @__PURE__ */ e.jsxs(se, { className: n, overlay: u, placement: "bottomRight", open: r, onOpenChange: i, children: [
    /* @__PURE__ */ e.jsx(ht, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: t("tasks", { defaultValue: "Tasks" }) })
  ] });
}, Yt = 20, As = ({ className: n }) => {
  const { t } = C("inbox"), a = Le(), { user: s } = pe(), { inboxUnreadCount: r, inboxRevision: i, setInboxUnreadCount: o, bumpInboxRevision: d } = he(), [m, c] = g(!1), { data: f = [], loading: u, run: p } = L(
    async () => (await v.inbox.listInboxMessages({
      current: 1,
      page_size: Yt
    })).data ?? [],
    {
      ready: !!s,
      refreshDeps: [s == null ? void 0 : s.id, i]
    }
  ), l = async (k) => {
    await v.inbox.markInboxMessageRead({ id: k }), d(), p();
  }, y = async () => {
    await v.inbox.markAllInboxMessagesRead(), o(0), d(), p();
  }, A = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 420, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      M,
      {
        size: "small",
        dataSource: f,
        loading: u,
        locale: { emptyText: t("empty", { defaultValue: "No messages" }) },
        renderItem: (k) => {
          const S = Ke(k);
          return /* @__PURE__ */ e.jsx(
            M.Item,
            {
              style: { cursor: S ? "pointer" : "default" },
              onClick: () => {
                S && l(k.id);
              },
              children: /* @__PURE__ */ e.jsx(
                M.Item.Meta,
                {
                  title: /* @__PURE__ */ e.jsx(R.Text, { strong: S, ellipsis: { tooltip: !0 }, children: Je(t, k) }),
                  description: /* @__PURE__ */ e.jsxs(F, { direction: "vertical", size: 0, style: { width: "100%" }, children: [
                    /* @__PURE__ */ e.jsx(R.Text, { type: "secondary", ellipsis: { tooltip: !0 }, children: Ge(t, k) }),
                    /* @__PURE__ */ e.jsx(R.Text, { type: "secondary", style: { fontSize: 12 }, children: k.created_at ? new Date(k.created_at).toLocaleString() : "" })
                  ] })
                }
              )
            },
            k.id
          );
        }
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, display: "flex", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", disabled: r <= 0, onClick: () => void y(), children: t("markAllRead", { defaultValue: "Mark all as read" }) }),
      /* @__PURE__ */ e.jsx(
        w,
        {
          type: "link",
          size: "small",
          onClick: () => {
            c(!1), a("/inbox");
          },
          children: t("viewAll", { defaultValue: "View all" })
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ e.jsx(se, { className: n, overlay: A, placement: "bottomRight", open: m, onOpenChange: c, children: /* @__PURE__ */ e.jsx(at, { count: r, size: "small", overflowCount: 99, children: /* @__PURE__ */ e.jsx(gt, { style: { marginRight: 4, height: 18, width: 18, fontSize: 18 } }) }) });
}, zs = ({
  onResize: n,
  minWidth: t = 300,
  maxWidth: a = window.innerWidth * 0.5
}) => {
  const [s, r] = g(!1), [i, o] = g(!1), d = X((f) => {
    f.preventDefault(), r(!0);
  }, []), m = X(
    (f) => {
      if (!s) return;
      const u = window.innerWidth - f.clientX, p = Math.max(t, Math.min(a, u));
      n(p);
    },
    [s, t, a, n]
  ), c = X(() => {
    r(!1);
  }, []);
  return B(() => {
    if (s)
      return document.addEventListener("mousemove", m), document.addEventListener("mouseup", c), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", c), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [s, m, c]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: d,
      onMouseEnter: () => o(!0),
      onMouseLeave: () => o(!1),
      style: {
        width: "8px",
        height: "100vh",
        cursor: "col-resize",
        position: "relative",
        flexShrink: 0,
        transition: s ? "none" : "background-color 0.2s ease",
        backgroundColor: s ? "#1890ff" : i ? "#bfbfbf" : "#e8e8e8",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */ e.jsx(
        "div",
        {
          style: {
            width: "3px",
            height: "40px",
            borderRadius: "2px",
            backgroundColor: s || i ? "#fff" : "#999",
            opacity: s || i ? 1 : 0.5,
            transition: "opacity 0.2s ease",
            pointerEvents: "none"
          }
        }
      )
    }
  );
}, U = 40, Wt = 28, Xt = 6, Ee = "ai-chat-float-pos", Kt = te(({ token: n, css: t }) => ({
  root: t`
    position: fixed;
    z-index: 1050;
    width: ${U}px;
    height: ${U}px;
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
  dragging: t`
    transition: none;
    cursor: grabbing;
    z-index: 1100;
  `,
  docked: t`
    &:hover,
    &:focus-visible {
      transform: translate(0, 0) rotate(0deg) !important;
    }
  `,
  dockLeft: t`
    transform: translateX(calc(-30% - 2px)) rotate(32deg);
  `,
  dockRight: t`
    transform: translateX(calc(30% + 2px)) rotate(-32deg);
  `,
  dockTop: t`
    transform: translateY(calc(-40% - 2px)) rotate(180deg);
  `,
  dockBottom: t`
    transform: translateY(calc(30% + 2px)) rotate(0deg);
  `,
  body: t`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(145deg, ${n.colorPrimaryHover}, ${n.colorPrimary});
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
  robot: t`
    width: 32px;
    height: 32px;
    display: block;
    padding-bottom: 5px;
    overflow: visible;
  `,
  eye: t`
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
function V(n, t, a) {
  return Math.min(Math.max(n, t), a);
}
function D() {
  return Math.max(0, window.innerWidth - U);
}
function _() {
  return Math.max(0, window.innerHeight - U);
}
function oe() {
  const n = D(), t = _();
  return {
    rx: n > 0 ? V((n - 24) / n, 0, 1) : 1,
    ry: t > 0 ? V((t - 24) / t, 0, 1) : 1,
    edge: null
  };
}
function Me(n, t, a) {
  let s = V(n, 0, D()), r = V(t, 0, _());
  return a === "left" && (s = 0), a === "right" && (s = D()), a === "top" && (r = 0), a === "bottom" && (r = _()), { x: s, y: r, edge: a };
}
function Re(n) {
  const t = D(), a = _();
  return {
    rx: t > 0 ? V(n.x / t, 0, 1) : 0,
    ry: a > 0 ? V(n.y / a, 0, 1) : 0,
    edge: n.edge
  };
}
function ke(n) {
  return Me(n.rx * D(), n.ry * _(), n.edge);
}
function Gt() {
  try {
    const n = localStorage.getItem(Ee);
    if (!n) return oe();
    const t = JSON.parse(n);
    return typeof t.rx == "number" && typeof t.ry == "number" ? {
      rx: V(t.rx, 0, 1),
      ry: V(t.ry, 0, 1),
      edge: t.edge ?? null
    } : typeof t.x == "number" && typeof t.y == "number" ? Re({
      x: V(t.x, 0, D()),
      y: V(t.y, 0, _()),
      edge: t.edge ?? null
    }) : oe();
  } catch {
    return oe();
  }
}
function Ce(n) {
  localStorage.setItem(Ee, JSON.stringify(n));
}
function Jt(n, t) {
  const a = n, s = window.innerWidth - (n + U), r = t, i = window.innerHeight - (t + U), o = Math.min(a, s, r, i);
  return o > Wt ? null : o === a ? "left" : o === s ? "right" : o === r ? "top" : "bottom";
}
const Qt = ({
  className: n,
  eyeClassName: t
}) => /* @__PURE__ */ e.jsxs("svg", { className: n, viewBox: "0 0 64 64", "aria-hidden": !0, children: [
  /* @__PURE__ */ e.jsx("circle", { cx: "32", cy: "12", r: "3.2", fill: "rgba(255,255,255,0.9)" }),
  /* @__PURE__ */ e.jsx("rect", { x: "30.4", y: "14", width: "3.2", height: "7", rx: "1.4", fill: "rgba(255,255,255,0.85)" }),
  /* @__PURE__ */ e.jsx("rect", { x: "10", y: "22", width: "44", height: "34", rx: "14", fill: "rgba(255,255,255,0.95)" }),
  /* @__PURE__ */ e.jsx("rect", { x: "16", y: "28", width: "32", height: "18", rx: "9", fill: "rgba(0,0,0,0.12)" }),
  /* @__PURE__ */ e.jsx("ellipse", { className: t, cx: "25", cy: "37", rx: "4.2", ry: "5", fill: "#1f2937" }),
  /* @__PURE__ */ e.jsx("ellipse", { className: t, cx: "39", cy: "37", rx: "4.2", ry: "5", fill: "#1f2937" }),
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
] }), Fs = ({ icon: n }) => {
  const { styles: t } = Kt(), { setVisible: a, visible: s } = Ye(), { t: r } = C("ai"), i = ae(
    typeof window > "u" ? { rx: 1, ry: 1, edge: null } : Gt()
  ), [o, d] = g(
    () => typeof window > "u" ? { x: 0, y: 0, edge: null } : ke(i.current)
  ), [m, c] = g(!1), f = ae(null), u = ae(o);
  u.current = o;
  const p = !m && o.edge === "left" ? t.dockLeft : !m && o.edge === "right" ? t.dockRight : !m && o.edge === "top" ? t.dockTop : !m && o.edge === "bottom" ? t.dockBottom : void 0, l = X((x) => {
    const h = Re(x);
    i.current = h, Ce(h), d(x);
  }, []), y = X(() => {
    f.current || d(ke(i.current));
  }, []);
  B(() => (Ce(i.current), window.addEventListener("resize", y), () => window.removeEventListener("resize", y)), [y]);
  const A = (x) => {
    x.button === 0 && (x.currentTarget.setPointerCapture(x.pointerId), f.current = {
      pointerId: x.pointerId,
      startX: x.clientX,
      startY: x.clientY,
      originX: u.current.x,
      originY: u.current.y,
      moved: !1
    }, c(!0));
  }, k = (x) => {
    const h = f.current;
    if (!h || h.pointerId !== x.pointerId) return;
    const T = x.clientX - h.startX, z = x.clientY - h.startY;
    !h.moved && Math.hypot(T, z) > Xt && (h.moved = !0), d({
      x: V(h.originX + T, 0, D()),
      y: V(h.originY + z, 0, _()),
      edge: null
    });
  }, S = (x) => {
    const h = f.current;
    if (!h || h.pointerId !== x.pointerId) return;
    try {
      x.currentTarget.releasePointerCapture(x.pointerId);
    } catch {
    }
    const T = !h.moved;
    if (f.current = null, c(!1), T) {
      a(!0);
      return;
    }
    const z = Jt(u.current.x, u.current.y);
    l(Me(u.current.x, u.current.y, z));
  };
  return s ? null : Vt(
    /* @__PURE__ */ e.jsx(
      de,
      {
        title: r("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
        placement: "left",
        mouseEnterDelay: 0.4,
        open: m ? !1 : void 0,
        children: /* @__PURE__ */ e.jsx(
          "button",
          {
            type: "button",
            "aria-label": r("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
            className: E(
              "ai-chat-float-button",
              t.root,
              m && t.dragging,
              !m && o.edge && t.docked,
              p
            ),
            style: { left: o.x, top: o.y },
            onPointerDown: A,
            onPointerMove: k,
            onPointerUp: S,
            onPointerCancel: S,
            children: n ?? /* @__PURE__ */ e.jsx("span", { className: t.body, children: /* @__PURE__ */ e.jsx(Qt, { className: t.robot, eyeClassName: t.eye }) })
          }
        )
      }
    ),
    document.body
  );
}, De = ({
  permission: n,
  permissions: t = [],
  checkAll: a = !1,
  fallback: s = null,
  children: r
}) => {
  const { hasPermission: i, hasAnyPermission: o, hasAllPermissions: d, isAdmin: m, loading: c } = fe();
  return c ? null : m ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : n ? i(n) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : t.length > 0 ? (a ? d(t) : o(t)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: r });
}, Ps = ({
  fallback: n = null,
  children: t
}) => {
  const { isAdmin: a, loading: s } = fe();
  return s ? null : a ? /* @__PURE__ */ e.jsx(e.Fragment, { children: t }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n });
}, Ie = (n) => {
  const [t, a] = g(!1), { permission: s, icon: r, tooltip: i, onClick: o, confirm: d, label: m, ...c } = n, f = !!c.disabled, u = o ? async () => {
    a(!0);
    try {
      await o();
    } finally {
      a(!1);
    }
  } : void 0;
  let p = /* @__PURE__ */ e.jsx(
    w,
    {
      type: "link",
      size: "small",
      loading: t,
      icon: r,
      onClick: d && !f ? void 0 : u,
      ...c,
      children: m && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: m })
    }
  );
  if (d && !f) {
    const l = async () => {
      d.onConfirm ? await d.onConfirm() : u && await u();
    };
    p = /* @__PURE__ */ e.jsx(
      ee,
      {
        title: d.title,
        description: d.description,
        onConfirm: l,
        okText: d.okText,
        cancelText: d.cancelText,
        children: p
      }
    );
  }
  return i && (p = f ? /* @__PURE__ */ e.jsx(de, { title: i, children: /* @__PURE__ */ e.jsx("span", { style: { display: "inline-block", cursor: "not-allowed" }, children: p }) }) : /* @__PURE__ */ e.jsx(de, { title: i, children: p })), s && (p = /* @__PURE__ */ e.jsx(De, { permission: s, children: p })), p;
}, Vs = ({ actions: n, maxVisibleItems: t }) => {
  const { modal: a } = O.useApp(), s = n.filter((d) => !d.hidden);
  if (!t || s.length <= t)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: s.map(({ key: d, ...m }) => /* @__PURE__ */ e.jsx(Ie, { ...m }, d)) });
  const r = s.slice(0, t - 1), o = s.slice(t - 1).map((d) => {
    const { key: m, label: c, icon: f, permission: u, onClick: p, confirm: l, disabled: y, tooltip: A } = d, S = {
      key: m,
      label: c,
      icon: f,
      disabled: y,
      onClick: async () => {
        l ? a.confirm({
          title: l.title,
          content: l.description,
          onOk: l.onConfirm || p,
          okText: l.okText,
          cancelText: l.cancelText
        }) : p && await p();
      }
    };
    return u ? {
      ...S,
      label: /* @__PURE__ */ e.jsx(De, { permission: u, children: /* @__PURE__ */ e.jsx("span", { children: c ?? A }) })
    } : S;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    r.map(({ key: d, ...m }) => /* @__PURE__ */ e.jsx(Ie, { ...m }, d)),
    /* @__PURE__ */ e.jsx(Ae, { menu: { items: o }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(w, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(yt, {}) }) })
  ] });
}, Zt = ut, es = (n) => Zt[n], Es = ({ iconName: n }) => {
  if (!n)
    return null;
  const t = es(n);
  return t ? /* @__PURE__ */ e.jsx(zt, { fallback: null, children: /* @__PURE__ */ e.jsx(t, {}) }) : null;
}, Ms = ({ onChange: n }) => {
  const [t, a] = g(""), [s, r] = g("");
  return /* @__PURE__ */ e.jsxs(F.Compact, { children: [
    /* @__PURE__ */ e.jsx(I, { style: { width: "calc(100% - 80px)" }, value: t, onChange: (i) => a(i.target.value) }),
    /* @__PURE__ */ e.jsx(I, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(I, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (i) => r(i.target.value) }),
    /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(jt, {}), onClick: () => {
      n(t, s);
    } })
  ] });
}, ts = ({ request: n, tableRef: t, ...a }, s) => {
  const [r, i] = g({
    current: 1,
    pageSize: 10
  }), [o, d] = g(0), { data: m, loading: c, refresh: f } = L(async () => {
    const u = await n({
      current: r.current,
      page_size: r.pageSize
    });
    return d(u.total), u.data;
  }, {
    refreshDeps: [r]
  });
  return Pt(s, () => ({
    reload: () => {
      f();
    }
  })), /* @__PURE__ */ e.jsx(
    ge,
    {
      rowKey: "id",
      loading: c,
      dataSource: m ?? [],
      pagination: {
        ...r,
        total: o,
        onChange: (u, p) => {
          i({ current: u, pageSize: p });
        }
      },
      ...a,
      ref: t
    }
  );
}, Rs = ({ actionRef: n, ...t }) => {
  const [a, s] = g();
  return B(() => {
    s(Ft(ts));
  }, []), a ? /* @__PURE__ */ e.jsx(a, { ...t, ref: n }) : null;
}, Ds = ({ className: n, onSuccess: t, token: a }) => {
  const { message: s } = O.useApp(), { t: r } = C("authorization"), { t: i } = C("common"), [o] = b.useForm(), { run: d, loading: m } = L(async (c) => v.authorization.changePassword(c, a ? { headers: { Authorization: `Bearer ${a}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      s.success(r("user.passwordChanged")), o.resetFields(), t == null || t();
    },
    onError: (c) => {
      if (c instanceof Et) {
        const f = c.code ?? "normal";
        s.error(r(`user.passwordChangeFailed.${f}`, { error: c.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        s.error(r("user.passwordChangeFailed.normal", { error: c.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", c);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    b,
    {
      form: o,
      layout: "vertical",
      onFinish: d,
      style: { maxWidth: 500, margin: "0 auto" },
      className: E("profile-password", n),
      children: [
        /* @__PURE__ */ e.jsx(
          b.Item,
          {
            name: "old_password",
            label: r("user.oldPassword"),
            rules: [{ required: !0, message: r("validation.oldPasswordRequired") }],
            className: E("profile-password-item", "profile-password-item-old-password"),
            children: /* @__PURE__ */ e.jsx(I.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          b.Item,
          {
            name: "new_password",
            label: r("user.newPassword"),
            rules: [
              { required: !0, message: r("validation.newPasswordRequired") },
              { min: 8, message: r("validation.passwordMinLength") }
            ],
            className: E("profile-password-item", "profile-password-item-new-password"),
            children: /* @__PURE__ */ e.jsx(I.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          b.Item,
          {
            name: "confirm_password",
            label: r("user.confirmPassword"),
            className: E("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: r("validation.confirmPasswordRequired") },
              ({ getFieldValue: c }) => ({
                validator(f, u) {
                  return !u || c("new_password") === u ? Promise.resolve() : Promise.reject(new Error(r("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(I.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(b.Item, { className: E("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: m, children: i("save") }) })
      ]
    }
  );
}, _s = ({ user: n, onSuccess: t }) => {
  const { message: a } = O.useApp(), { t: s } = C("authorization"), { t: r } = C("common"), [i] = b.useForm(), [o, d] = g(!1);
  At.useEffect(() => {
    n && i.setFieldsValue({
      username: n.username,
      email: n.email,
      full_name: n.full_name,
      phone: n.phone || "",
      avatar: n.avatar
    });
  }, [n, i]);
  const m = async (c) => {
    try {
      d(!0), await v.authorization.updateCurrentUser(c), a.success(r("updateSuccess")), t();
    } catch (f) {
      a.error(r("updateFailed")), console.error("Failed to update user information:", f);
    } finally {
      d(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (n == null ? void 0 : n.full_name) || (n == null ? void 0 : n.username) }),
      (n == null ? void 0 : n.roles) && n.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        s("user.roles"),
        ": ",
        n.roles.map((c) => c.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      b,
      {
        form: i,
        layout: "vertical",
        onFinish: m,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(qt, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              name: "username",
              label: s("user.username"),
              children: /* @__PURE__ */ e.jsx(I, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              name: "email",
              label: s("user.email"),
              rules: [
                { required: !0, message: s("validation.emailRequired") },
                { type: "email", message: s("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(I, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              name: "full_name",
              label: s("user.fullName"),
              rules: [{ required: !0, message: s("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(I, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              name: "phone",
              label: s("user.phone"),
              children: /* @__PURE__ */ e.jsx(I, {})
            }
          ),
          /* @__PURE__ */ e.jsx(b.Item, { children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: o, children: r("save") }) })
        ]
      }
    )
  ] });
}, Os = ({ user: n, onSuccess: t }) => {
  const { message: a } = O.useApp(), { t: s } = C("authorization"), { t: r } = C("common"), [i, o] = g(0), [d, m] = g(!1), [c, f] = g(!0), [u, p] = g(""), [l, y] = g("totp"), [A, k] = g(!1), [S, x] = g("password"), [h, T] = g(""), [z, q] = g(""), [N, G] = g(""), [je, ne] = g(""), [$, J] = g(0);
  B(() => {
    if ($ <= 0) return;
    const j = setTimeout(() => J((P) => P - 1), 1e3);
    return () => clearTimeout(j);
  }, [$]);
  const { run: _e, data: Y = { secret: "", qr_code: "", token: void 0 } } = L(
    () => v.authorization.enableMfa({ mfa_type: l }),
    {
      manual: !0,
      onSuccess: () => {
        o(1);
      },
      onBefore: () => {
        m(!0);
      },
      onFinally: () => {
        m(!1);
      }
    }
  ), Oe = async () => {
    if (!u) {
      a.warning(s("mfa.enterVerificationCode"));
      return;
    }
    const j = {
      code: u,
      mfa_type: l
    };
    "token" in Y && (j.token = Y.token);
    try {
      m(!0), await v.authorization.verifyAndActivateMfa(j), a.success(s("mfa.enableSuccess")), o(2), t();
    } catch (P) {
      a.error(s("mfa.verificationFailed")), console.error("Failed to verify MFA:", P);
    } finally {
      m(!1);
    }
  }, be = () => {
    k(!1), x("password"), T(""), q(""), G(""), ne(""), J(0);
  }, { runAsync: Be, loading: Ne } = L(
    () => v.authorization.sendDisableMfaCode(),
    { manual: !0 }
  ), He = async () => {
    try {
      const j = await Be();
      ne((j == null ? void 0 : j.token) ?? ""), G(""), J(60), a.success(s("mfa.codeSent", { defaultValue: "Verification code has been sent to your email" }));
    } catch (j) {
      a.error(j instanceof Error ? j.message : r("operationFailed")), console.error("Failed to send disable-MFA code:", j);
    }
  }, Q = async () => {
    if (S === "email") {
      if (!je) {
        a.warning(s("mfa.sendCodeFirst", { defaultValue: "Please send the verification code first" }));
        return;
      }
      if (!N) {
        a.warning(s("mfa.enterVerificationCode"));
        return;
      }
    } else if (S === "totp") {
      if (!z) {
        a.warning(s("mfa.enterVerificationCode"));
        return;
      }
    } else if (!h) {
      a.warning(s("mfa.enterPassword", { defaultValue: "Enter your password" }));
      return;
    }
    const j = { password: "", mfa_code: "", email_code: "", email_token: "" };
    S === "email" ? (j.email_code = N, j.email_token = je) : S === "totp" ? j.mfa_code = z : j.password = h;
    try {
      m(!0), await v.authorization.disableMfa(j), a.success(s("mfa.disableSuccess")), be(), t();
    } catch (P) {
      a.error(P instanceof Error ? P.message : r("operationFailed")), console.error("Failed to disable MFA:", P), S === "email" && (ne(""), G(""), J(0));
    } finally {
      m(!1);
    }
  }, Ue = () => {
    if (!n) return null;
    if (n.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        ce,
        {
          status: "success",
          title: s("mfa.enabled"),
          subTitle: s("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(w, { danger: !0, onClick: () => k(!0), children: s("mfa.disable") })
        }
      );
    const j = () => {
      var P;
      switch (i) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              Z,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: s("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: s(l === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
                ] }),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20 }
              }
            ),
            /* @__PURE__ */ e.jsx(
              w,
              {
                type: "primary",
                onClick: _e,
                loading: d,
                children: s("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              Z,
              {
                message: s("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: l === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: l === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(ot, { value: Y.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: l === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: n == null ? void 0 : n.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: l === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: c ? "*".repeat(((P = Y.secret) == null ? void 0 : P.length) ?? 0) : Y.secret }),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "link",
                  onClick: () => f(!c),
                  icon: c ? /* @__PURE__ */ e.jsx(Ve, {}) : /* @__PURE__ */ e.jsx(wt, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              I,
              {
                placeholder: s("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: u,
                onChange: (qe) => p(qe.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(F, { children: [
              /* @__PURE__ */ e.jsx(w, { onClick: () => o(0), children: r("previous") }),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "primary",
                  onClick: Oe,
                  loading: d,
                  children: r("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            ce,
            {
              status: "success",
              title: s("mfa.setupSuccess"),
              subTitle: s("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(w, { type: "primary", onClick: () => o(0), children: r("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: i === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          we,
          {
            defaultValue: "totp",
            onChange: (P) => {
              y(P), o(0);
            },
            value: l,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(bt, {}), label: s("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(vt, {}), label: s("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(Fe, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        it,
        {
          current: i,
          items: [
            { title: s(l === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: s(l === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: s(l === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: s(l === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: s(l === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: s(l === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      j()
    ] });
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 8 }, children: [
    Ue(),
    /* @__PURE__ */ e.jsxs(
      ze,
      {
        title: s("mfa.confirmDisable"),
        open: A,
        onOk: Q,
        okText: s("mfa.disable"),
        okButtonProps: { danger: !0, loading: d },
        onCancel: be,
        destroyOnHidden: !0,
        children: [
          /* @__PURE__ */ e.jsx(
            Z,
            {
              message: s("mfa.disableWarning"),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          /* @__PURE__ */ e.jsx("p", { children: s("mfa.disableVerifyDescription", { defaultValue: "For security reasons, please verify your identity with your password or a verification code." }) }),
          /* @__PURE__ */ e.jsx(
            we,
            {
              block: !0,
              value: S,
              onChange: (j) => x(j),
              options: [
                { value: "password", label: s("mfa.methodPassword", { defaultValue: "Password" }) },
                ...(n == null ? void 0 : n.mfa_type) === "totp" ? [{ value: "totp", label: s("mfa.totp", { defaultValue: "TOTP" }) }] : [],
                { value: "email", label: s("mfa.methodEmailCode", { defaultValue: "Email code" }) }
              ],
              style: { marginBottom: 16 }
            }
          ),
          S === "password" && /* @__PURE__ */ e.jsx(
            I.Password,
            {
              placeholder: s("mfa.enterPassword", { defaultValue: "Enter your password" }),
              autoComplete: "current-password",
              value: h,
              onChange: (j) => T(j.target.value),
              onPressEnter: Q
            }
          ),
          S === "totp" && /* @__PURE__ */ e.jsx(
            I,
            {
              placeholder: s("mfa.enterTotpCode", { defaultValue: "Enter the 6-digit code from your authenticator app" }),
              maxLength: 6,
              value: z,
              onChange: (j) => q(j.target.value),
              onPressEnter: Q
            }
          ),
          S === "email" && /* @__PURE__ */ e.jsxs(F.Compact, { style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(
              I,
              {
                placeholder: s("mfa.enterEmailCode", { defaultValue: "Enter the 6-digit code sent to your email" }),
                maxLength: 6,
                value: N,
                onChange: (j) => G(j.target.value),
                onPressEnter: Q
              }
            ),
            /* @__PURE__ */ e.jsx(
              w,
              {
                onClick: He,
                loading: Ne,
                disabled: $ > 0,
                children: $ > 0 ? s("mfa.resendIn", { defaultValue: "Resend ({{seconds}}s)", seconds: $ }) : s("mfa.sendCode", { defaultValue: "Send code" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}, { Text: le } = R, Bs = () => {
  const { message: n } = O.useApp(), { t } = C("authorization"), { t: a } = C("common"), [s, r] = g(null), [i, o] = g(!1), { data: d = [], loading: m, run: c } = L(() => v.authorization.getUserSessions({}), {
    onError: (l) => {
      n.error(t("session.getSessionsFailed", { error: l, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: f } = L((l) => v.authorization.terminateSession({ id: l }), {
    onSuccess: () => {
      n.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" })), c();
    },
    onError: (l) => {
      n.error(t("session.terminateFailed", { error: l, defaultValue: "Failed to terminate session: {{error}}" }));
    },
    onFinally: () => {
      r(null);
    },
    onBefore: ([l]) => {
      r(l);
    },
    manual: !0
  }), { run: u } = L(() => v.authorization.terminateOtherSessions(), {
    onSuccess: () => {
      n.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" })), c();
    },
    onError: (l) => {
      n.error(t("session.terminateAllFailed", { error: l, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
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
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (l, y) => /* @__PURE__ */ e.jsxs(F, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(F, { children: [
          /* @__PURE__ */ e.jsx(St, {}),
          /* @__PURE__ */ e.jsx(le, { strong: !0, children: l })
        ] }),
        /* @__PURE__ */ e.jsxs(F, { children: [
          /* @__PURE__ */ e.jsx(kt, {}),
          /* @__PURE__ */ e.jsx(le, { type: "secondary", children: y.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (l) => /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(Ct, {}),
        /* @__PURE__ */ e.jsx("span", { children: l })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (l) => /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(It, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(l).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (l) => l.is_current ? /* @__PURE__ */ e.jsx(K, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(K, { color: "blue", children: t("session.active") })
    },
    {
      title: a("actions"),
      key: "action",
      render: (l) => l.is_current ? /* @__PURE__ */ e.jsx(le, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        ee,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => f(l.id),
          okText: a("confirm"),
          cancelText: a("cancel"),
          children: /* @__PURE__ */ e.jsx(
            w,
            {
              type: "link",
              danger: !0,
              loading: s === l.id,
              children: t("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(F, { direction: "vertical", style: { padding: 8, width: "100%" }, children: [
    /* @__PURE__ */ e.jsxs(F, { direction: "horizontal", style: { float: "right" }, children: [
      d.length > 1 && /* @__PURE__ */ e.jsx(
        ee,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: u,
          okText: a("confirm"),
          cancelText: a("cancel"),
          children: /* @__PURE__ */ e.jsx(
            w,
            {
              danger: !0,
              loading: i,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      /* @__PURE__ */ e.jsx(w, { onClick: () => c(), loading: m, children: a("refresh") })
    ] }),
    !m && d.length === 0 ? /* @__PURE__ */ e.jsx(Pe, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
      ge,
      {
        columns: p,
        dataSource: d,
        rowKey: "id",
        loading: m,
        pagination: !1
      }
    )
  ] });
}, { RangePicker: ss } = ct, { Option: H } = me, ns = (n) => n || "N/A", rs = (n, t) => n === "success" ? /* @__PURE__ */ e.jsx(K, { color: "success", children: t("statuses.success") }) : /* @__PURE__ */ e.jsx(K, { color: "error", children: t("statuses.failed") }), Ns = ({
  userId: n,
  request: t = (s) => n ? v.authorization.getUserLogs({ id: n, ...s }) : v.authorization.getCurrentUserLogs(s),
  columnsFilter: a = (s) => s
}) => {
  const { message: s, modal: r } = O.useApp(), { t: i } = C("authorization"), { t: o } = C("common"), [d, m] = g({
    current: 1,
    pageSize: 10,
    total: 0
  }), [c, f] = g({}), [u] = b.useForm(), { loading: p, run: l, data: { data: y } = {} } = L(async (h = c, T = 1, z = 10) => t({
    ...h,
    current: T ?? 1,
    page_size: z ?? 10
  }), {
    onError(h) {
      s.error(i("auditLog.fetchFailed", { error: h }));
    },
    onSuccess({ total: h }) {
      m({
        ...d,
        total: h
      });
    }
  });
  B(() => {
    l(c, 1, d.pageSize);
  }, []);
  const A = (h) => {
    m({
      ...d,
      current: h.current || 1,
      pageSize: h.pageSize || 10
    }), l({}, h.current, h.pageSize);
  }, k = (h) => {
    var T, z, q, N;
    l({
      ...h,
      start_time: (z = (T = h.dateRange) == null ? void 0 : T[0]) == null ? void 0 : z.toISOString(),
      end_time: (N = (q = h.dateRange) == null ? void 0 : q[1]) == null ? void 0 : N.toISOString()
    }, 1, d.pageSize);
  }, S = () => {
    u.resetFields(), f({}), m({ ...d, current: 1 }), l({}, 1, d.pageSize);
  }, x = [
    {
      title: i("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (h) => Qe(h)
    },
    {
      title: i("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (h, T) => h ? i(`action.${h.replace(/:/g, ".")}`, { defaultValue: i(`permission.title.${h.replace(/:/g, ".")}`, { defaultValue: T.action_name }) }) : T.action_name ?? T.action
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
      render: (h) => ns(h)
    },
    {
      title: i("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (h) => rs(h, i)
    },
    {
      title: i("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (h) => /* @__PURE__ */ e.jsx(w, { type: "link", icon: /* @__PURE__ */ e.jsx(Ve, {}), onClick: () => {
        r.info({
          title: i("auditLog.details"),
          content: JSON.stringify(h)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ue, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      b,
      {
        form: u,
        layout: "horizontal",
        onFinish: k,
        initialValues: c,
        children: /* @__PURE__ */ e.jsxs(lt, { gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(W, { xxl: 6, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(b.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(I, { placeholder: i("auditLog.searchPlaceholder") }) }) }),
          /* @__PURE__ */ e.jsx(W, { xxl: 4, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(b.Item, { name: "action", noStyle: !0, children: /* @__PURE__ */ e.jsxs(me, { allowClear: !0, placeholder: i("auditLog.selectAction"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(H, { value: "login", children: i("actions.login") }),
            /* @__PURE__ */ e.jsx(H, { value: "logout", children: i("actions.logout") }),
            /* @__PURE__ */ e.jsx(H, { value: "password_reset", children: i("actions.passwordReset") }),
            /* @__PURE__ */ e.jsx(H, { value: "mfa_change", children: i("actions.mfaChange") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(W, { xxl: 3, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(b.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(me, { allowClear: !0, placeholder: i("auditLog.selectStatus"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(H, { value: "success", children: i("statuses.success") }),
            /* @__PURE__ */ e.jsx(H, { value: "failed", children: i("statuses.failed") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(W, { xxl: 6, xl: 6, lg: 10, md: 12, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(b.Item, { name: "dateRange", noStyle: !0, children: /* @__PURE__ */ e.jsx(ss, { style: { width: "100%" } }) }) }),
          /* @__PURE__ */ e.jsx(W, { xxl: 5, xl: 24, lg: 14, md: 24, sm: 24, xs: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(F, { children: [
            /* @__PURE__ */ e.jsx(w, { onClick: S, children: o("reset") }),
            /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Tt, {}), children: o("search") })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(ue, { children: /* @__PURE__ */ e.jsx(
      ge,
      {
        rowKey: "id",
        columns: a(x),
        dataSource: y,
        pagination: {
          ...d,
          showSizeChanger: !0,
          showTotal: (h) => o("totalItems", { total: h })
        },
        loading: p,
        onChange: A,
        scroll: { x: "max-content" }
      }
    ) })
  ] });
}, { Text: as } = R, Hs = ({ kind: n, subjectId: t, readOnly: a }) => {
  const { message: s } = O.useApp(), { t: r } = C("authorization"), { t: i } = C("common"), [o] = b.useForm(), d = n === "user" ? v.authorization.getUserRateLimit : v.authorization.getServiceAccountRateLimit, m = n === "user" ? v.authorization.updateUserRateLimit : v.authorization.updateServiceAccountRateLimit, { data: c, loading: f, refresh: u } = L(() => d({ id: t }), {
    ready: !!t,
    refreshDeps: [t, n],
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
  }), { run: p, loading: l } = L(
    async (x) => m({ id: t }, {
      ...x,
      clear: !1,
      inherited: !1,
      enabled: x.enabled !== !1
    }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(r("rateLimit.saveSuccess", { defaultValue: "Rate limit override saved" })), u();
      },
      onError: (x) => {
        s.error(x.message || r("rateLimit.saveFailed", { defaultValue: "Failed to save override" }));
      }
    }
  ), { run: y, loading: A } = L(
    async () => m({ id: t }, {
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
        s.success(r("rateLimit.resetSuccess", { defaultValue: "Override cleared; type default restored" })), u();
      },
      onError: (x) => {
        s.error(x.message);
      }
    }
  ), { run: k, loading: S } = L(
    async () => n === "user" ? v.authorization.resetUserRateLimit({ id: t }) : v.authorization.resetServiceAccountRateLimit({ id: t }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(r("rateLimit.resetCountersSuccess", { defaultValue: "Counters reset" }));
      },
      onError: (x) => {
        s.error(x.message);
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(b, { form: o, layout: "vertical", onFinish: p, disabled: a || f, style: { maxWidth: 480, marginTop: 16 }, children: [
    (c == null ? void 0 : c.inherited) && /* @__PURE__ */ e.jsx(
      Z,
      {
        type: "info",
        showIcon: !0,
        style: { marginBottom: 16 },
        message: r("rateLimit.inherited", { defaultValue: "Using the type default. Save to create a subject-specific override." })
      }
    ),
    /* @__PURE__ */ e.jsx(b.Item, { name: "rate", label: r("rateLimit.rate", { defaultValue: "Rate" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(re, { min: 1, style: { width: "100%" } }) }),
    /* @__PURE__ */ e.jsx(b.Item, { name: "period", label: r("rateLimit.period", { defaultValue: "Period" }), extra: r("rateLimit.periodHint", { defaultValue: "Examples: 1s, 1m, 1h" }), children: /* @__PURE__ */ e.jsx(I, { placeholder: "1m" }) }),
    /* @__PURE__ */ e.jsx(b.Item, { name: "burst", label: r("rateLimit.burst", { defaultValue: "Burst" }), children: /* @__PURE__ */ e.jsx(re, { min: 1, style: { width: "100%" } }) }),
    /* @__PURE__ */ e.jsx(b.Item, { name: "quota", label: r("rateLimit.quota", { defaultValue: "Daily quota (0 = none)" }), children: /* @__PURE__ */ e.jsx(re, { min: 0, style: { width: "100%" } }) }),
    /* @__PURE__ */ e.jsx(b.Item, { name: "quota_period", label: r("rateLimit.quotaPeriod", { defaultValue: "Quota period" }), children: /* @__PURE__ */ e.jsx(I, { placeholder: "1d" }) }),
    /* @__PURE__ */ e.jsx(
      b.Item,
      {
        name: "enabled",
        label: r("rateLimit.enabled", { defaultValue: "Enabled" }),
        valuePropName: "checked",
        extra: r("rateLimit.enabledHint", { defaultValue: "Off: this override is ignored and the type default applies. Use Reset to default to delete the override." }),
        children: /* @__PURE__ */ e.jsx(dt, {})
      }
    ),
    !a && /* @__PURE__ */ e.jsxs(F, { children: [
      /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: l, children: i("save", { defaultValue: "Save" }) }),
      /* @__PURE__ */ e.jsx(
        ee,
        {
          title: r("rateLimit.resetCountersConfirm", { defaultValue: "Reset rate-limit and quota counters for this subject? They will be able to send requests immediately." }),
          onConfirm: () => k(),
          children: /* @__PURE__ */ e.jsx(w, { htmlType: "button", icon: /* @__PURE__ */ e.jsx(Lt, {}), loading: S, children: r("rateLimit.resetCounters", { defaultValue: "Reset counters" }) })
        }
      ),
      !(c != null && c.inherited) && /* @__PURE__ */ e.jsx(w, { onClick: () => y(), loading: A, children: r("rateLimit.resetToDefault", { defaultValue: "Reset to default" }) })
    ] }),
    (c == null ? void 0 : c.inherited) && /* @__PURE__ */ e.jsx(as, { type: "secondary", children: r("rateLimit.sourceHint", { defaultValue: "Values shown are inherited." }) })
  ] });
}, { Text: Te } = R, is = {
  debug: "default",
  info: "processing",
  warn: "warning",
  error: "error"
}, Us = ({ taskId: n, poll: t }) => {
  const { t: a } = C("task"), { data: s = [], loading: r } = L(
    () => n ? v.tasks.getTaskLogs({ id: n }) : Promise.reject(new Error("No task id")),
    {
      refreshDeps: [n],
      ready: !!n,
      pollingInterval: t ? 2e3 : 0
    }
  );
  return /* @__PURE__ */ e.jsx(
    ue,
    {
      title: a("logsTitle", { defaultValue: "Task logs" }),
      size: "small",
      style: { marginTop: 16 },
      children: r && !s.length ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 24 }, children: /* @__PURE__ */ e.jsx(xe, {}) }) : s.length ? /* @__PURE__ */ e.jsx(
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
          children: s.map((i) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 4 }, children: [
            /* @__PURE__ */ e.jsx(Te, { type: "secondary", style: { fontSize: 11 }, children: i.created_at }),
            i.level && /* @__PURE__ */ e.jsxs(Te, { type: is[i.level], style: { marginLeft: 8, fontSize: 11 }, children: [
              "[",
              i.level,
              "]"
            ] }),
            /* @__PURE__ */ e.jsx("div", { style: { display: "inline", marginLeft: 8 }, children: i.message })
          ] }, i.id))
        }
      ) : /* @__PURE__ */ e.jsx(Pe, { description: a("noLogs", { defaultValue: "No logs yet." }) })
    }
  );
};
export {
  Is as A,
  Es as D,
  se as H,
  As as I,
  Se as L,
  Ts as O,
  ks as P,
  zs as R,
  Ls as T,
  Ns as U,
  Cs as a,
  Vs as b,
  Ps as c,
  Nt as d,
  qt as e,
  Ms as f,
  De as g,
  Rs as h,
  es as i,
  Fs as j,
  Ds as k,
  _s as l,
  Os as m,
  Bs as n,
  Hs as o,
  Us as p
};
