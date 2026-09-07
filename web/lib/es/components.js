import { j as e } from "./vendor.js";
import { Navigate as we, useNavigate as Te } from "react-router-dom";
import { u as me, a as pe, b as fe, c as Ue, d as qe } from "./contexts.js";
import { g as Ye, i as Xe, a as We, b as Ke, c as Ge, f as Je } from "./base.js";
import { Spin as he, Result as oe, Dropdown as Ae, Avatar as Ze, Upload as Qe, Modal as ze, Popover as et, List as D, Image as tt, Divider as Le, Skeleton as st, Progress as nt, Typography as N, Button as w, Tag as K, Badge as rt, Space as L, Tooltip as le, App as $, Popconfirm as ce, Input as T, Table as xe, Form as v, Alert as se, Segmented as be, Steps as at, QRCode as it, Empty as Fe, Card as de, Row as ot, Col as X, Select as ue, DatePicker as lt } from "antd";
import { useTranslation as C } from "react-i18next";
import { createStyles as Q } from "antd-style";
import * as ct from "@ant-design/icons";
import { UploadOutlined as dt, CheckOutlined as ut, TeamOutlined as mt, UnorderedListOutlined as pt, DownloadOutlined as ft, BellOutlined as ht, MoreOutlined as xt, PlusOutlined as gt, ClockCircleFilled as yt, MailOutlined as jt, EyeOutlined as Pe, EyeInvisibleOutlined as wt, LaptopOutlined as bt, EnvironmentOutlined as vt, GlobalOutlined as kt, ClockCircleOutlined as St, SearchOutlined as Ct } from "@ant-design/icons";
import It, { useState as x, useEffect as V, useCallback as W, useRef as ne, Suspense as Tt, forwardRef as At, useImperativeHandle as zt } from "react";
import { a as k } from "./index.js";
import { useRequest as P } from "ahooks";
import E from "classnames";
import { createPortal as Lt } from "react-dom";
import { b as re, A as Ft } from "./client.js";
import Pt from "antd-img-crop";
import Mt from "react-infinite-scroll-component";
import { isString as Et } from "lodash-es";
const ve = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(he, { size: "large" }) }), ws = ({
  element: s,
  requiredPermission: t,
  requiredPermissions: r
}) => {
  const { t: n } = C(), { user: o, loading: a, error: i } = me(), { hasPermission: c, hasAllPermissions: u } = pe();
  return a ? /* @__PURE__ */ e.jsx(ve, {}) : i ? i.code === "E4011" ? /* @__PURE__ */ e.jsx(ve, {}) : /* @__PURE__ */ e.jsx(
    oe,
    {
      status: "500",
      title: "500",
      subTitle: n("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (i == null ? void 0 : i.message) || i })
    }
  ) : o ? t && !c(t) ? /* @__PURE__ */ e.jsx(we, { to: "/forbidden", replace: !0 }) : r && !u(r) ? /* @__PURE__ */ e.jsx(we, { to: "/forbidden", replace: !0 }) : s : (window.location.href = Ye("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Dt = Q(({ token: s, css: t }) => ({
  container: t`
      ${t`
        @media screen and (max-width: ${s.screenXS}px) {
          width: 100% !important;
          > * {
            border-radius: 0 !important;
          }
        }
      `}
    > *{
      background-color: ${s.colorBgElevated};
      border-radius: 4px;
      box-shadow: ${s.boxShadowTertiary};
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
      color: s.colorPrimaryTextHover
    }
  }
})), ee = ({
  overlayClassName: s,
  overlay: t,
  hidden: r,
  children: n,
  ...o
}) => {
  const { styles: a } = Dt();
  return r ? /* @__PURE__ */ e.jsx(e.Fragment, {}) : /* @__PURE__ */ e.jsx(
    Ae,
    {
      popupRender: t,
      overlayClassName: E(a.container, s),
      ...o,
      children: /* @__PURE__ */ e.jsx("span", { className: a.iconStyle, children: n })
    }
  );
}, _t = () => /* @__PURE__ */ e.jsxs(
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
), Rt = Q(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), Vt = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], bs = ({
  transformLangConfig: s = (r) => r,
  className: t
}) => {
  const { i18n: r } = C(), { styles: n } = Rt(), o = (i) => {
    r.changeLanguage(i);
  }, a = {
    selectedKeys: [r.language],
    onClick: (i) => {
      o(i.key);
    },
    items: s(Vt).map((i) => ({
      key: i.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (i == null ? void 0 : i.label) || "en-US", className: n.menuItemIconStyle, children: (i == null ? void 0 : i.icon) || "🌐" }),
        (i == null ? void 0 : i.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    ee,
    {
      className: t,
      menu: a,
      children: /* @__PURE__ */ e.jsx(_t, {})
    }
  );
}, Ot = Q(({ css: s }) => ({
  avatarItem: s`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), ge = (s) => Et(s) && s.match(/^[-_a-zA-Z0-9]+$/) ? re.endsWith("/") ? re + `files/${s}` : re + `/files/${s}` : s, vs = ({ src: s, fallback: t, ...r }) => /* @__PURE__ */ e.jsx(Ze, { src: ge(s), icon: t, ...r }), Bt = ({ onChange: s, shape: t = "square" }) => {
  const [r, n] = x([]), { styles: o } = Ot(), [a, i] = x(!1), [c, u] = x(!0), [p, h] = x(0), { run: d, loading: m } = P(() => k.base.listFiles({ current: p + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: g }) => {
      console.log(g), n([...r, ...g]), u(g.length === 40), h(p + 1);
    }
  }), l = () => {
    u(!0), h(0), n([]);
  };
  return /* @__PURE__ */ e.jsx(
    et,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (g) => {
        i(g), g ? d() : l();
      },
      open: a,
      content: /* @__PURE__ */ e.jsx("div", { style: { width: 360, height: 200 }, children: /* @__PURE__ */ e.jsx(
        "div",
        {
          id: "iconsScrollableDiv",
          style: {
            height: "100%",
            overflow: "auto"
          },
          children: /* @__PURE__ */ e.jsx(
            Mt,
            {
              dataLength: r.length,
              next: () => {
                d();
              },
              hasMore: c,
              loader: /* @__PURE__ */ e.jsx(st, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(Le, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                D,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: r,
                  style: { margin: "0 8px" },
                  loading: m,
                  renderItem: ({ id: g }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: o.avatarItem,
                      onClick: (M) => {
                        M.stopPropagation(), s == null || s(g), i(!1), l();
                      },
                      children: /* @__PURE__ */ e.jsx(tt, { src: ge(g), placeholder: /* @__PURE__ */ e.jsx(he, { size: "default" }), preview: !1 })
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
        dt,
        {
          shape: t,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, Nt = ({ value: s, onChange: t, shape: r, ...n }) => {
  const [o, a] = x(void 0), [i, c] = x(!1), [u, p] = x(void 0), h = async (d) => {
    c(!0), p(d.url ?? d.preview);
  };
  return V(() => {
    a(s ? {
      uid: s,
      name: s,
      url: ge(s)
    } : void 0);
  }, [s]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Pt,
      {
        beforeCrop: async (d) => {
          if (d.type === "image/svg+xml") {
            const m = await k.base.uploadFile({ type: "avatar" }, d);
            return m.length > 0 && (t == null || t(m[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          Qe,
          {
            customRequest: async (d) => {
              var l, g;
              const m = await k.base.uploadFile({ type: "avatar", access: "public" }, d.file);
              m.length > 0 ? ((l = d.onSuccess) == null || l.call(d, m[0].id), t == null || t(m[0].id)) : (g = d.onError) == null || g.call(d, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: h,
            maxCount: 1,
            onChange: ({ file: d }) => {
              switch (d.status) {
                case "removed":
                  t == null || t(void 0);
                  break;
                case "done":
                  break;
                default:
                  a(d);
                  break;
              }
            },
            fileList: o ? [o] : [],
            ...n,
            children: o ? void 0 : /* @__PURE__ */ e.jsx(Bt, { shape: r, onChange: t })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(ze, { open: i, footer: null, onCancel: () => c(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: u }) })
  ] });
}, ks = ({ className: s }) => {
  const { t } = C("common"), { user: r } = me(), { currentOrgId: n, setCurrentOrgId: o } = fe(), a = (r == null ? void 0 : r.organizations) || [], i = (h) => {
    o(h), window.location.reload();
  };
  if (a.length === 0)
    return null;
  const c = a.find((h) => h.id === n), u = c ? c.name : t("organization.global", { defaultValue: "Global" }), p = [
    ...a.map((h) => ({
      key: h.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: h.name }),
        n === h.id && /* @__PURE__ */ e.jsx(ut, {})
      ] }),
      onClick: () => i(h.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    ee,
    {
      className: s,
      menu: {
        items: p,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(mt, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: u })
      ]
    }
  );
}, Ht = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Ss = ({ className: s }) => {
  const { t } = C("task"), r = Te(), { user: n } = Ue(), { tasksDropdownOpen: o, setTasksDropdownOpen: a, tasks: i, setTasks: c } = fe(), { runAsync: u, loading: p } = P(async () => k.tasks.listUserTasks({}), {
    onSuccess: (m) => {
      Xe(i, m, (l, g) => l.id === g.id && l.status === g.status && l.progress === g.progress) || c(m);
    },
    pollingInterval: o ? 3e3 : 6e4,
    ready: !!n,
    refreshDeps: [n]
  });
  V(() => {
    o && u();
  }, [o]);
  const h = async (m) => {
    const l = await k.base.downloadFile({ fileKey: m }, { params: { method: "sign" } }), g = `/api/files/${m}?signature=${l.signature}&expires=${l.expires}`;
    window.open(g, "_blank");
  }, d = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      D,
      {
        size: "small",
        dataSource: i,
        loading: p,
        renderItem: (m) => /* @__PURE__ */ e.jsx(
          D.Item,
          {
            extra: /* @__PURE__ */ e.jsx(K, { color: Ht[m.status], style: { marginLeft: 6 }, children: t(`status.${m.status}`, { defaultValue: m.status }) }),
            actions: [
              m.artifact_file_key && /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx(ft, {}),
                  onClick: () => h(m.artifact_file_key)
                }
              )
            ].filter(Boolean),
            children: /* @__PURE__ */ e.jsx(
              D.Item.Meta,
              {
                title: /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13 }, children: /* @__PURE__ */ e.jsxs(N.Text, { ellipsis: { tooltip: !0 }, children: [
                  t(`type.${m.type}`, { defaultValue: m.type }),
                  " ",
                  m.artifact_file_name && `- ${m.artifact_file_name}`
                ] }) }),
                description: (m.status === "running" || m.status === "pending") && /* @__PURE__ */ e.jsx(nt, { percent: m.progress ?? 0, size: "small", style: { marginTop: 4 } })
              }
            )
          },
          m.id
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", onClick: () => r("/tasks"), children: t("more", { defaultValue: "More" }) }) })
  ] });
  return !i || i.length === 0 ? null : /* @__PURE__ */ e.jsxs(ee, { className: s, overlay: d, placement: "bottomRight", open: o, onOpenChange: a, children: [
    /* @__PURE__ */ e.jsx(pt, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: t("tasks", { defaultValue: "Tasks" }) })
  ] });
}, $t = 20, Cs = ({ className: s }) => {
  const { t } = C("inbox"), r = Te(), { user: n } = me(), { inboxUnreadCount: o, inboxRevision: a, setInboxUnreadCount: i, bumpInboxRevision: c } = fe(), [u, p] = x(!1), { data: h = [], loading: d, run: m } = P(
    async () => (await k.inbox.listInboxMessages({
      current: 1,
      page_size: $t
    })).data ?? [],
    {
      ready: !!n,
      refreshDeps: [n == null ? void 0 : n.id, a]
    }
  ), l = async (S) => {
    await k.inbox.markInboxMessageRead({ id: S }), c(), m();
  }, g = async () => {
    await k.inbox.markAllInboxMessagesRead(), i(0), c(), m();
  }, M = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 420, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      D,
      {
        size: "small",
        dataSource: h,
        loading: d,
        locale: { emptyText: t("empty", { defaultValue: "No messages" }) },
        renderItem: (S) => {
          const b = We(S);
          return /* @__PURE__ */ e.jsx(
            D.Item,
            {
              style: { cursor: b ? "pointer" : "default" },
              onClick: () => {
                b && l(S.id);
              },
              children: /* @__PURE__ */ e.jsx(
                D.Item.Meta,
                {
                  title: /* @__PURE__ */ e.jsx(N.Text, { strong: b, ellipsis: { tooltip: !0 }, children: Ge(t, S) }),
                  description: /* @__PURE__ */ e.jsxs(L, { direction: "vertical", size: 0, style: { width: "100%" }, children: [
                    /* @__PURE__ */ e.jsx(N.Text, { type: "secondary", ellipsis: { tooltip: !0 }, children: Ke(t, S) }),
                    /* @__PURE__ */ e.jsx(N.Text, { type: "secondary", style: { fontSize: 12 }, children: S.created_at ? new Date(S.created_at).toLocaleString() : "" })
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
      /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", disabled: o <= 0, onClick: () => void g(), children: t("markAllRead", { defaultValue: "Mark all as read" }) }),
      /* @__PURE__ */ e.jsx(
        w,
        {
          type: "link",
          size: "small",
          onClick: () => {
            p(!1), r("/inbox");
          },
          children: t("viewAll", { defaultValue: "View all" })
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ e.jsx(ee, { className: s, overlay: M, placement: "bottomRight", open: u, onOpenChange: p, children: /* @__PURE__ */ e.jsx(rt, { count: o, size: "small", overflowCount: 99, children: /* @__PURE__ */ e.jsx(ht, { style: { marginRight: 4, height: 18, width: 18, fontSize: 18 } }) }) });
}, Is = ({
  onResize: s,
  minWidth: t = 300,
  maxWidth: r = window.innerWidth * 0.5
}) => {
  const [n, o] = x(!1), [a, i] = x(!1), c = W((h) => {
    h.preventDefault(), o(!0);
  }, []), u = W(
    (h) => {
      if (!n) return;
      const d = window.innerWidth - h.clientX, m = Math.max(t, Math.min(r, d));
      s(m);
    },
    [n, t, r, s]
  ), p = W(() => {
    o(!1);
  }, []);
  return V(() => {
    if (n)
      return document.addEventListener("mousemove", u), document.addEventListener("mouseup", p), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", p), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [n, u, p]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: c,
      onMouseEnter: () => i(!0),
      onMouseLeave: () => i(!1),
      style: {
        width: "8px",
        height: "100vh",
        cursor: "col-resize",
        position: "relative",
        flexShrink: 0,
        transition: n ? "none" : "background-color 0.2s ease",
        backgroundColor: n ? "#1890ff" : a ? "#bfbfbf" : "#e8e8e8",
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
            backgroundColor: n || a ? "#fff" : "#999",
            opacity: n || a ? 1 : 0.5,
            transition: "opacity 0.2s ease",
            pointerEvents: "none"
          }
        }
      )
    }
  );
}, H = 40, Ut = 28, qt = 6, Me = "ai-chat-float-pos", Yt = Q(({ token: s, css: t }) => ({
  root: t`
    position: fixed;
    z-index: 1050;
    width: ${H}px;
    height: ${H}px;
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
    background: linear-gradient(145deg, ${s.colorPrimaryHover}, ${s.colorPrimary});
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
function F(s, t, r) {
  return Math.min(Math.max(s, t), r);
}
function _() {
  return Math.max(0, window.innerWidth - H);
}
function R() {
  return Math.max(0, window.innerHeight - H);
}
function ae() {
  const s = _(), t = R();
  return {
    rx: s > 0 ? F((s - 24) / s, 0, 1) : 1,
    ry: t > 0 ? F((t - 24) / t, 0, 1) : 1,
    edge: null
  };
}
function Ee(s, t, r) {
  let n = F(s, 0, _()), o = F(t, 0, R());
  return r === "left" && (n = 0), r === "right" && (n = _()), r === "top" && (o = 0), r === "bottom" && (o = R()), { x: n, y: o, edge: r };
}
function De(s) {
  const t = _(), r = R();
  return {
    rx: t > 0 ? F(s.x / t, 0, 1) : 0,
    ry: r > 0 ? F(s.y / r, 0, 1) : 0,
    edge: s.edge
  };
}
function ke(s) {
  return Ee(s.rx * _(), s.ry * R(), s.edge);
}
function Xt() {
  try {
    const s = localStorage.getItem(Me);
    if (!s) return ae();
    const t = JSON.parse(s);
    return typeof t.rx == "number" && typeof t.ry == "number" ? {
      rx: F(t.rx, 0, 1),
      ry: F(t.ry, 0, 1),
      edge: t.edge ?? null
    } : typeof t.x == "number" && typeof t.y == "number" ? De({
      x: F(t.x, 0, _()),
      y: F(t.y, 0, R()),
      edge: t.edge ?? null
    }) : ae();
  } catch {
    return ae();
  }
}
function Se(s) {
  localStorage.setItem(Me, JSON.stringify(s));
}
function Wt(s, t) {
  const r = s, n = window.innerWidth - (s + H), o = t, a = window.innerHeight - (t + H), i = Math.min(r, n, o, a);
  return i > Ut ? null : i === r ? "left" : i === n ? "right" : i === o ? "top" : "bottom";
}
const Kt = ({
  className: s,
  eyeClassName: t
}) => /* @__PURE__ */ e.jsxs("svg", { className: s, viewBox: "0 0 64 64", "aria-hidden": !0, children: [
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
] }), Ts = ({ icon: s }) => {
  const { styles: t } = Yt(), { setVisible: r, visible: n } = qe(), { t: o } = C("ai"), a = ne(
    typeof window > "u" ? { rx: 1, ry: 1, edge: null } : Xt()
  ), [i, c] = x(
    () => typeof window > "u" ? { x: 0, y: 0, edge: null } : ke(a.current)
  ), [u, p] = x(!1), h = ne(null), d = ne(i);
  d.current = i;
  const m = !u && i.edge === "left" ? t.dockLeft : !u && i.edge === "right" ? t.dockRight : !u && i.edge === "top" ? t.dockTop : !u && i.edge === "bottom" ? t.dockBottom : void 0, l = W((j) => {
    const f = De(j);
    a.current = f, Se(f), c(j);
  }, []), g = W(() => {
    h.current || c(ke(a.current));
  }, []);
  V(() => (Se(a.current), window.addEventListener("resize", g), () => window.removeEventListener("resize", g)), [g]);
  const M = (j) => {
    j.button === 0 && (j.currentTarget.setPointerCapture(j.pointerId), h.current = {
      pointerId: j.pointerId,
      startX: j.clientX,
      startY: j.clientY,
      originX: d.current.x,
      originY: d.current.y,
      moved: !1
    }, p(!0));
  }, S = (j) => {
    const f = h.current;
    if (!f || f.pointerId !== j.pointerId) return;
    const I = j.clientX - f.startX, A = j.clientY - f.startY;
    !f.moved && Math.hypot(I, A) > qt && (f.moved = !0), c({
      x: F(f.originX + I, 0, _()),
      y: F(f.originY + A, 0, R()),
      edge: null
    });
  }, b = (j) => {
    const f = h.current;
    if (!f || f.pointerId !== j.pointerId) return;
    try {
      j.currentTarget.releasePointerCapture(j.pointerId);
    } catch {
    }
    const I = !f.moved;
    if (h.current = null, p(!1), I) {
      r(!0);
      return;
    }
    const A = Wt(d.current.x, d.current.y);
    l(Ee(d.current.x, d.current.y, A));
  };
  return n ? null : Lt(
    /* @__PURE__ */ e.jsx(
      le,
      {
        title: o("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
        placement: "left",
        mouseEnterDelay: 0.4,
        open: u ? !1 : void 0,
        children: /* @__PURE__ */ e.jsx(
          "button",
          {
            type: "button",
            "aria-label": o("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
            className: E(
              "ai-chat-float-button",
              t.root,
              u && t.dragging,
              !u && i.edge && t.docked,
              m
            ),
            style: { left: i.x, top: i.y },
            onPointerDown: M,
            onPointerMove: S,
            onPointerUp: b,
            onPointerCancel: b,
            children: s ?? /* @__PURE__ */ e.jsx("span", { className: t.body, children: /* @__PURE__ */ e.jsx(Kt, { className: t.robot, eyeClassName: t.eye }) })
          }
        )
      }
    ),
    document.body
  );
}, _e = ({
  permission: s,
  permissions: t = [],
  checkAll: r = !1,
  fallback: n = null,
  children: o
}) => {
  const { hasPermission: a, hasAnyPermission: i, hasAllPermissions: c, isAdmin: u, loading: p } = pe();
  return p ? null : u ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : s ? a(s) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : t.length > 0 ? (r ? c(t) : i(t)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: o });
}, As = ({
  fallback: s = null,
  children: t
}) => {
  const { isAdmin: r, loading: n } = pe();
  return n ? null : r ? /* @__PURE__ */ e.jsx(e.Fragment, { children: t }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s });
}, Ce = (s) => {
  const [t, r] = x(!1), { permission: n, icon: o, tooltip: a, onClick: i, confirm: c, label: u, ...p } = s, h = !!p.disabled, d = i ? async () => {
    r(!0);
    try {
      await i();
    } finally {
      r(!1);
    }
  } : void 0;
  let m = /* @__PURE__ */ e.jsx(
    w,
    {
      type: "link",
      size: "small",
      loading: t,
      icon: o,
      onClick: c && !h ? void 0 : d,
      ...p,
      children: u && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: u })
    }
  );
  if (c && !h) {
    const l = async () => {
      c.onConfirm ? await c.onConfirm() : d && await d();
    };
    m = /* @__PURE__ */ e.jsx(
      ce,
      {
        title: c.title,
        description: c.description,
        onConfirm: l,
        okText: c.okText,
        cancelText: c.cancelText,
        children: m
      }
    );
  }
  return a && (m = h ? /* @__PURE__ */ e.jsx(le, { title: a, children: /* @__PURE__ */ e.jsx("span", { style: { display: "inline-block", cursor: "not-allowed" }, children: m }) }) : /* @__PURE__ */ e.jsx(le, { title: a, children: m })), n && (m = /* @__PURE__ */ e.jsx(_e, { permission: n, children: m })), m;
}, zs = ({ actions: s, maxVisibleItems: t }) => {
  const { modal: r } = $.useApp(), n = s.filter((c) => !c.hidden);
  if (!t || n.length <= t)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: n.map(({ key: c, ...u }) => /* @__PURE__ */ e.jsx(Ce, { ...u }, c)) });
  const o = n.slice(0, t - 1), i = n.slice(t - 1).map((c) => {
    const { key: u, label: p, icon: h, permission: d, onClick: m, confirm: l, disabled: g, tooltip: M } = c, b = {
      key: u,
      label: p,
      icon: h,
      disabled: g,
      onClick: async () => {
        l ? r.confirm({
          title: l.title,
          content: l.description,
          onOk: l.onConfirm || m,
          okText: l.okText,
          cancelText: l.cancelText
        }) : m && await m();
      }
    };
    return d ? {
      ...b,
      label: /* @__PURE__ */ e.jsx(_e, { permission: d, children: /* @__PURE__ */ e.jsx("span", { children: p ?? M }) })
    } : b;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    o.map(({ key: c, ...u }) => /* @__PURE__ */ e.jsx(Ce, { ...u }, c)),
    /* @__PURE__ */ e.jsx(Ae, { menu: { items: i }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(w, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(xt, {}) }) })
  ] });
}, Gt = ct, Jt = (s) => Gt[s], Ls = ({ iconName: s }) => {
  if (!s)
    return null;
  const t = Jt(s);
  return t ? /* @__PURE__ */ e.jsx(Tt, { fallback: null, children: /* @__PURE__ */ e.jsx(t, {}) }) : null;
}, Fs = ({ onChange: s }) => {
  const [t, r] = x(""), [n, o] = x("");
  return /* @__PURE__ */ e.jsxs(L.Compact, { children: [
    /* @__PURE__ */ e.jsx(T, { style: { width: "calc(100% - 80px)" }, value: t, onChange: (a) => r(a.target.value) }),
    /* @__PURE__ */ e.jsx(T, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(T, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (a) => o(a.target.value) }),
    /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(gt, {}), onClick: () => {
      s(t, n);
    } })
  ] });
}, Zt = ({ request: s, tableRef: t, ...r }, n) => {
  const [o, a] = x({
    current: 1,
    pageSize: 10
  }), [i, c] = x(0), { data: u, loading: p, refresh: h } = P(async () => {
    const d = await s({
      current: o.current,
      page_size: o.pageSize
    });
    return c(d.total), d.data;
  }, {
    refreshDeps: [o]
  });
  return zt(n, () => ({
    reload: () => {
      h();
    }
  })), /* @__PURE__ */ e.jsx(
    xe,
    {
      rowKey: "id",
      loading: p,
      dataSource: u ?? [],
      pagination: {
        ...o,
        total: i,
        onChange: (d, m) => {
          a({ current: d, pageSize: m });
        }
      },
      ...r,
      ref: t
    }
  );
}, Ps = ({ actionRef: s, ...t }) => {
  const [r, n] = x();
  return V(() => {
    n(At(Zt));
  }, []), r ? /* @__PURE__ */ e.jsx(r, { ...t, ref: s }) : null;
}, Ms = ({ className: s, onSuccess: t, token: r }) => {
  const { message: n } = $.useApp(), { t: o } = C("authorization"), { t: a } = C("common"), [i] = v.useForm(), { run: c, loading: u } = P(async (p) => k.authorization.changePassword(p, r ? { headers: { Authorization: `Bearer ${r}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      n.success(o("user.passwordChanged")), i.resetFields(), t == null || t();
    },
    onError: (p) => {
      if (p instanceof Ft) {
        const h = p.code ?? "normal";
        n.error(o(`user.passwordChangeFailed.${h}`, { error: p.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        n.error(o("user.passwordChangeFailed.normal", { error: p.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", p);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    v,
    {
      form: i,
      layout: "vertical",
      onFinish: c,
      style: { maxWidth: 500, margin: "0 auto" },
      className: E("profile-password", s),
      children: [
        /* @__PURE__ */ e.jsx(
          v.Item,
          {
            name: "old_password",
            label: o("user.oldPassword"),
            rules: [{ required: !0, message: o("validation.oldPasswordRequired") }],
            className: E("profile-password-item", "profile-password-item-old-password"),
            children: /* @__PURE__ */ e.jsx(T.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          v.Item,
          {
            name: "new_password",
            label: o("user.newPassword"),
            rules: [
              { required: !0, message: o("validation.newPasswordRequired") },
              { min: 8, message: o("validation.passwordMinLength") }
            ],
            className: E("profile-password-item", "profile-password-item-new-password"),
            children: /* @__PURE__ */ e.jsx(T.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          v.Item,
          {
            name: "confirm_password",
            label: o("user.confirmPassword"),
            className: E("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: o("validation.confirmPasswordRequired") },
              ({ getFieldValue: p }) => ({
                validator(h, d) {
                  return !d || p("new_password") === d ? Promise.resolve() : Promise.reject(new Error(o("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(T.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(v.Item, { className: E("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: u, children: a("save") }) })
      ]
    }
  );
}, Es = ({ user: s, onSuccess: t }) => {
  const { message: r } = $.useApp(), { t: n } = C("authorization"), { t: o } = C("common"), [a] = v.useForm(), [i, c] = x(!1);
  It.useEffect(() => {
    s && a.setFieldsValue({
      username: s.username,
      email: s.email,
      full_name: s.full_name,
      phone: s.phone || "",
      avatar: s.avatar
    });
  }, [s, a]);
  const u = async (p) => {
    try {
      c(!0), await k.authorization.updateCurrentUser(p), r.success(o("updateSuccess")), t();
    } catch (h) {
      r.error(o("updateFailed")), console.error("Failed to update user information:", h);
    } finally {
      c(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (s == null ? void 0 : s.full_name) || (s == null ? void 0 : s.username) }),
      (s == null ? void 0 : s.roles) && s.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        n("user.roles"),
        ": ",
        s.roles.map((p) => p.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      v,
      {
        form: a,
        layout: "vertical",
        onFinish: u,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            v.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(Nt, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            v.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(T, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            v.Item,
            {
              name: "email",
              label: n("user.email"),
              rules: [
                { required: !0, message: n("validation.emailRequired") },
                { type: "email", message: n("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(T, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            v.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(T, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            v.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(T, {})
            }
          ),
          /* @__PURE__ */ e.jsx(v.Item, { children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: i, children: o("save") }) })
        ]
      }
    )
  ] });
}, Ds = ({ user: s, onSuccess: t }) => {
  const { message: r } = $.useApp(), { t: n } = C("authorization"), { t: o } = C("common"), [a, i] = x(0), [c, u] = x(!1), [p, h] = x(!0), [d, m] = x(""), [l, g] = x("totp"), [M, S] = x(!1), [b, j] = x("password"), [f, I] = x(""), [A, U] = x(""), [O, G] = x(""), [ye, te] = x(""), [q, J] = x(0);
  V(() => {
    if (q <= 0) return;
    const y = setTimeout(() => J((z) => z - 1), 1e3);
    return () => clearTimeout(y);
  }, [q]);
  const { run: Re, data: Y = { secret: "", qr_code: "", token: void 0 } } = P(
    () => k.authorization.enableMfa({ mfa_type: l }),
    {
      manual: !0,
      onSuccess: () => {
        i(1);
      },
      onBefore: () => {
        u(!0);
      },
      onFinally: () => {
        u(!1);
      }
    }
  ), Ve = async () => {
    if (!d) {
      r.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const y = {
      code: d,
      mfa_type: l
    };
    "token" in Y && (y.token = Y.token);
    try {
      u(!0), await k.authorization.verifyAndActivateMfa(y), r.success(n("mfa.enableSuccess")), i(2), t();
    } catch (z) {
      r.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", z);
    } finally {
      u(!1);
    }
  }, je = () => {
    S(!1), j("password"), I(""), U(""), G(""), te(""), J(0);
  }, { runAsync: Oe, loading: Be } = P(
    () => k.authorization.sendDisableMfaCode(),
    { manual: !0 }
  ), Ne = async () => {
    try {
      const y = await Oe();
      te((y == null ? void 0 : y.token) ?? ""), G(""), J(60), r.success(n("mfa.codeSent", { defaultValue: "Verification code has been sent to your email" }));
    } catch (y) {
      r.error(y instanceof Error ? y.message : o("operationFailed")), console.error("Failed to send disable-MFA code:", y);
    }
  }, Z = async () => {
    if (b === "email") {
      if (!ye) {
        r.warning(n("mfa.sendCodeFirst", { defaultValue: "Please send the verification code first" }));
        return;
      }
      if (!O) {
        r.warning(n("mfa.enterVerificationCode"));
        return;
      }
    } else if (b === "totp") {
      if (!A) {
        r.warning(n("mfa.enterVerificationCode"));
        return;
      }
    } else if (!f) {
      r.warning(n("mfa.enterPassword", { defaultValue: "Enter your password" }));
      return;
    }
    const y = { password: "", mfa_code: "", email_code: "", email_token: "" };
    b === "email" ? (y.email_code = O, y.email_token = ye) : b === "totp" ? y.mfa_code = A : y.password = f;
    try {
      u(!0), await k.authorization.disableMfa(y), r.success(n("mfa.disableSuccess")), je(), t();
    } catch (z) {
      r.error(z instanceof Error ? z.message : o("operationFailed")), console.error("Failed to disable MFA:", z), b === "email" && (te(""), G(""), J(0));
    } finally {
      u(!1);
    }
  }, He = () => {
    if (!s) return null;
    if (s.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        oe,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(w, { danger: !0, onClick: () => S(!0), children: n("mfa.disable") })
        }
      );
    const y = () => {
      var z;
      switch (a) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              se,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: n("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: n(l === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
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
                onClick: Re,
                loading: c,
                children: n("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              se,
              {
                message: n("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: l === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: l === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(it, { value: Y.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: l === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: s == null ? void 0 : s.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: l === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: p ? "*".repeat(((z = Y.secret) == null ? void 0 : z.length) ?? 0) : Y.secret }),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "link",
                  onClick: () => h(!p),
                  icon: p ? /* @__PURE__ */ e.jsx(Pe, {}) : /* @__PURE__ */ e.jsx(wt, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              T,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: d,
                onChange: ($e) => m($e.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(L, { children: [
              /* @__PURE__ */ e.jsx(w, { onClick: () => i(0), children: o("previous") }),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "primary",
                  onClick: Ve,
                  loading: c,
                  children: o("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            oe,
            {
              status: "success",
              title: n("mfa.setupSuccess"),
              subTitle: n("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(w, { type: "primary", onClick: () => i(0), children: o("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: a === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          be,
          {
            defaultValue: "totp",
            onChange: (z) => {
              g(z), i(0);
            },
            value: l,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(yt, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(jt, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(Le, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        at,
        {
          current: a,
          items: [
            { title: n(l === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(l === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(l === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(l === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(l === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(l === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      y()
    ] });
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 8 }, children: [
    He(),
    /* @__PURE__ */ e.jsxs(
      ze,
      {
        title: n("mfa.confirmDisable"),
        open: M,
        onOk: Z,
        okText: n("mfa.disable"),
        okButtonProps: { danger: !0, loading: c },
        onCancel: je,
        destroyOnHidden: !0,
        children: [
          /* @__PURE__ */ e.jsx(
            se,
            {
              message: n("mfa.disableWarning"),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          /* @__PURE__ */ e.jsx("p", { children: n("mfa.disableVerifyDescription", { defaultValue: "For security reasons, please verify your identity with your password or a verification code." }) }),
          /* @__PURE__ */ e.jsx(
            be,
            {
              block: !0,
              value: b,
              onChange: (y) => j(y),
              options: [
                { value: "password", label: n("mfa.methodPassword", { defaultValue: "Password" }) },
                ...(s == null ? void 0 : s.mfa_type) === "totp" ? [{ value: "totp", label: n("mfa.totp", { defaultValue: "TOTP" }) }] : [],
                { value: "email", label: n("mfa.methodEmailCode", { defaultValue: "Email code" }) }
              ],
              style: { marginBottom: 16 }
            }
          ),
          b === "password" && /* @__PURE__ */ e.jsx(
            T.Password,
            {
              placeholder: n("mfa.enterPassword", { defaultValue: "Enter your password" }),
              autoComplete: "current-password",
              value: f,
              onChange: (y) => I(y.target.value),
              onPressEnter: Z
            }
          ),
          b === "totp" && /* @__PURE__ */ e.jsx(
            T,
            {
              placeholder: n("mfa.enterTotpCode", { defaultValue: "Enter the 6-digit code from your authenticator app" }),
              maxLength: 6,
              value: A,
              onChange: (y) => U(y.target.value),
              onPressEnter: Z
            }
          ),
          b === "email" && /* @__PURE__ */ e.jsxs(L.Compact, { style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(
              T,
              {
                placeholder: n("mfa.enterEmailCode", { defaultValue: "Enter the 6-digit code sent to your email" }),
                maxLength: 6,
                value: O,
                onChange: (y) => G(y.target.value),
                onPressEnter: Z
              }
            ),
            /* @__PURE__ */ e.jsx(
              w,
              {
                onClick: Ne,
                loading: Be,
                disabled: q > 0,
                children: q > 0 ? n("mfa.resendIn", { defaultValue: "Resend ({{seconds}}s)", seconds: q }) : n("mfa.sendCode", { defaultValue: "Send code" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}, { Text: ie } = N, _s = () => {
  const { message: s } = $.useApp(), { t } = C("authorization"), { t: r } = C("common"), [n, o] = x(null), [a, i] = x(!1), { data: c = [], loading: u, run: p } = P(() => k.authorization.getUserSessions({}), {
    onError: (l) => {
      s.error(t("session.getSessionsFailed", { error: l, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: h } = P((l) => k.authorization.terminateSession({ id: l }), {
    onSuccess: () => {
      s.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" })), p();
    },
    onError: (l) => {
      s.error(t("session.terminateFailed", { error: l, defaultValue: "Failed to terminate session: {{error}}" }));
    },
    onFinally: () => {
      o(null);
    },
    onBefore: ([l]) => {
      o(l);
    },
    manual: !0
  }), { run: d } = P(() => k.authorization.terminateOtherSessions(), {
    onSuccess: () => {
      s.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" })), p();
    },
    onError: (l) => {
      s.error(t("session.terminateAllFailed", { error: l, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    },
    onFinally: () => {
      i(!1);
    },
    onBefore: () => {
      i(!0);
    },
    manual: !0
  }), m = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (l, g) => /* @__PURE__ */ e.jsxs(L, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(bt, {}),
          /* @__PURE__ */ e.jsx(ie, { strong: !0, children: l })
        ] }),
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(vt, {}),
          /* @__PURE__ */ e.jsx(ie, { type: "secondary", children: g.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (l) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(kt, {}),
        /* @__PURE__ */ e.jsx("span", { children: l })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (l) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(St, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(l).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (l) => l.is_current ? /* @__PURE__ */ e.jsx(K, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(K, { color: "blue", children: t("session.active") })
    },
    {
      title: r("actions"),
      key: "action",
      render: (l) => l.is_current ? /* @__PURE__ */ e.jsx(ie, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        ce,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => h(l.id),
          okText: r("confirm"),
          cancelText: r("cancel"),
          children: /* @__PURE__ */ e.jsx(
            w,
            {
              type: "link",
              danger: !0,
              loading: n === l.id,
              children: t("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(L, { direction: "vertical", style: { padding: 8, width: "100%" }, children: [
    /* @__PURE__ */ e.jsxs(L, { direction: "horizontal", style: { float: "right" }, children: [
      c.length > 1 && /* @__PURE__ */ e.jsx(
        ce,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: d,
          okText: r("confirm"),
          cancelText: r("cancel"),
          children: /* @__PURE__ */ e.jsx(
            w,
            {
              danger: !0,
              loading: a,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      /* @__PURE__ */ e.jsx(w, { onClick: () => p(), loading: u, children: r("refresh") })
    ] }),
    !u && c.length === 0 ? /* @__PURE__ */ e.jsx(Fe, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
      xe,
      {
        columns: m,
        dataSource: c,
        rowKey: "id",
        loading: u,
        pagination: !1
      }
    )
  ] });
}, { RangePicker: Qt } = lt, { Option: B } = ue, es = (s) => s || "N/A", ts = (s, t) => s === "success" ? /* @__PURE__ */ e.jsx(K, { color: "success", children: t("statuses.success") }) : /* @__PURE__ */ e.jsx(K, { color: "error", children: t("statuses.failed") }), Rs = ({
  userId: s,
  request: t = (n) => s ? k.authorization.getUserLogs({ id: s, ...n }) : k.authorization.getCurrentUserLogs(n),
  columnsFilter: r = (n) => n
}) => {
  const { message: n, modal: o } = $.useApp(), { t: a } = C("authorization"), { t: i } = C("common"), [c, u] = x({
    current: 1,
    pageSize: 10,
    total: 0
  }), [p, h] = x({}), [d] = v.useForm(), { loading: m, run: l, data: { data: g } = {} } = P(async (f = p, I = 1, A = 10) => t({
    ...f,
    current: I ?? 1,
    page_size: A ?? 10
  }), {
    onError(f) {
      n.error(a("auditLog.fetchFailed", { error: f }));
    },
    onSuccess({ total: f }) {
      u({
        ...c,
        total: f
      });
    }
  });
  V(() => {
    l(p, 1, c.pageSize);
  }, []);
  const M = (f) => {
    u({
      ...c,
      current: f.current || 1,
      pageSize: f.pageSize || 10
    }), l({}, f.current, f.pageSize);
  }, S = (f) => {
    var I, A, U, O;
    l({
      ...f,
      start_time: (A = (I = f.dateRange) == null ? void 0 : I[0]) == null ? void 0 : A.toISOString(),
      end_time: (O = (U = f.dateRange) == null ? void 0 : U[1]) == null ? void 0 : O.toISOString()
    }, 1, c.pageSize);
  }, b = () => {
    d.resetFields(), h({}), u({ ...c, current: 1 }), l({}, 1, c.pageSize);
  }, j = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (f) => Je(f)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (f, I) => f ? a(`action.${f.replace(/:/g, ".")}`, { defaultValue: a(`permission.title.${f.replace(/:/g, ".")}`, { defaultValue: I.action_name }) }) : I.action_name ?? I.action
    },
    {
      title: a("auditLog.user_agent"),
      dataIndex: "user_agent",
      key: "user_agent"
    },
    {
      title: a("auditLog.ip"),
      dataIndex: "ip",
      key: "ip",
      render: (f) => es(f)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (f) => ts(f, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (f) => /* @__PURE__ */ e.jsx(w, { type: "link", icon: /* @__PURE__ */ e.jsx(Pe, {}), onClick: () => {
        o.info({
          title: a("auditLog.details"),
          content: JSON.stringify(f)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(de, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      v,
      {
        form: d,
        layout: "horizontal",
        onFinish: S,
        initialValues: p,
        children: /* @__PURE__ */ e.jsxs(ot, { gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(X, { xxl: 6, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(v.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(T, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
          /* @__PURE__ */ e.jsx(X, { xxl: 4, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(v.Item, { name: "action", noStyle: !0, children: /* @__PURE__ */ e.jsxs(ue, { allowClear: !0, placeholder: a("auditLog.selectAction"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(B, { value: "login", children: a("actions.login") }),
            /* @__PURE__ */ e.jsx(B, { value: "logout", children: a("actions.logout") }),
            /* @__PURE__ */ e.jsx(B, { value: "password_reset", children: a("actions.passwordReset") }),
            /* @__PURE__ */ e.jsx(B, { value: "mfa_change", children: a("actions.mfaChange") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(X, { xxl: 3, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(v.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(ue, { allowClear: !0, placeholder: a("auditLog.selectStatus"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(B, { value: "success", children: a("statuses.success") }),
            /* @__PURE__ */ e.jsx(B, { value: "failed", children: a("statuses.failed") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(X, { xxl: 6, xl: 6, lg: 10, md: 12, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(v.Item, { name: "dateRange", noStyle: !0, children: /* @__PURE__ */ e.jsx(Qt, { style: { width: "100%" } }) }) }),
          /* @__PURE__ */ e.jsx(X, { xxl: 5, xl: 24, lg: 14, md: 24, sm: 24, xs: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(L, { children: [
            /* @__PURE__ */ e.jsx(w, { onClick: b, children: i("reset") }),
            /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Ct, {}), children: i("search") })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(de, { children: /* @__PURE__ */ e.jsx(
      xe,
      {
        rowKey: "id",
        columns: r(j),
        dataSource: g,
        pagination: {
          ...c,
          showSizeChanger: !0,
          showTotal: (f) => i("totalItems", { total: f })
        },
        loading: m,
        onChange: M,
        scroll: { x: "max-content" }
      }
    ) })
  ] });
}, { Text: Ie } = N, ss = {
  debug: "default",
  info: "processing",
  warn: "warning",
  error: "error"
}, Vs = ({ taskId: s, poll: t }) => {
  const { t: r } = C("task"), { data: n = [], loading: o } = P(
    () => s ? k.tasks.getTaskLogs({ id: s }) : Promise.reject(new Error("No task id")),
    {
      refreshDeps: [s],
      ready: !!s,
      pollingInterval: t ? 2e3 : 0
    }
  );
  return /* @__PURE__ */ e.jsx(
    de,
    {
      title: r("logsTitle", { defaultValue: "Task logs" }),
      size: "small",
      style: { marginTop: 16 },
      children: o && !n.length ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 24 }, children: /* @__PURE__ */ e.jsx(he, {}) }) : n.length ? /* @__PURE__ */ e.jsx(
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
          children: n.map((a) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 4 }, children: [
            /* @__PURE__ */ e.jsx(Ie, { type: "secondary", style: { fontSize: 11 }, children: a.created_at }),
            a.level && /* @__PURE__ */ e.jsxs(Ie, { type: ss[a.level], style: { marginLeft: 8, fontSize: 11 }, children: [
              "[",
              a.level,
              "]"
            ] }),
            /* @__PURE__ */ e.jsx("div", { style: { display: "inline", marginLeft: 8 }, children: a.message })
          ] }, a.id))
        }
      ) : /* @__PURE__ */ e.jsx(Fe, { description: r("noLogs", { defaultValue: "No logs yet." }) })
    }
  );
};
export {
  vs as A,
  Ls as D,
  ee as H,
  Cs as I,
  ve as L,
  ks as O,
  ws as P,
  Is as R,
  Ss as T,
  Rs as U,
  bs as a,
  zs as b,
  As as c,
  Vt as d,
  Nt as e,
  Fs as f,
  _e as g,
  Ps as h,
  Jt as i,
  Ts as j,
  Ms as k,
  Es as l,
  Ds as m,
  _s as n,
  Vs as o
};
