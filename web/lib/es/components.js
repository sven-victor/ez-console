import { j as e } from "./vendor.js";
import { Navigate as ve, useNavigate as Fe } from "react-router-dom";
import { u as he, a as fe, b as xe, c as Ge, d as Je } from "./contexts.js";
import { g as Ke, i as Qe, a as Ze, b as et, c as tt, f as nt } from "./base.js";
import { Spin as ge, Result as ue, Dropdown as Ve, Avatar as st, Upload as rt, Modal as _e, Popover as at, List as R, Image as it, Divider as Pe, Skeleton as ot, Progress as lt, Typography as P, Button as v, Tag as J, Badge as ct, Space as F, Tooltip as K, App as O, Popconfirm as ne, Input as I, Table as ye, Form as b, Alert as te, Segmented as Se, Steps as dt, QRCode as ut, Empty as Ee, Card as me, Row as mt, Col as X, Select as pe, DatePicker as pt, InputNumber as ie, Switch as ht, Flex as ke, Collapse as ft } from "antd";
import { useTranslation as C } from "react-i18next";
import { createStyles as U } from "antd-style";
import * as xt from "@ant-design/icons";
import { UploadOutlined as gt, CheckOutlined as yt, TeamOutlined as jt, UnorderedListOutlined as bt, DownloadOutlined as wt, BellOutlined as vt, MoreOutlined as St, PlusOutlined as kt, ClockCircleFilled as Ct, MailOutlined as Tt, EyeOutlined as Me, EyeInvisibleOutlined as It, LaptopOutlined as Lt, EnvironmentOutlined as At, GlobalOutlined as zt, ClockCircleOutlined as Ft, SearchOutlined as Vt, UndoOutlined as _t } from "@ant-design/icons";
import Pt, { useState as y, useEffect as E, useCallback as G, useRef as oe, Suspense as Et, forwardRef as Mt, useImperativeHandle as Rt } from "react";
import { a as S } from "./index.js";
import { useRequest as A } from "ahooks";
import M from "classnames";
import { createPortal as Dt } from "react-dom";
import { b as le, A as Nt } from "./client.js";
import Ot from "antd-img-crop";
import $t from "react-infinite-scroll-component";
import { isString as Bt } from "lodash-es";
const Ce = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(ge, { size: "large" }) }), Nn = ({
  element: t,
  requiredPermission: n,
  requiredPermissions: a
}) => {
  const { t: s } = C(), { user: r, loading: i, error: o } = he(), { hasPermission: l, hasAllPermissions: u } = fe();
  return i ? /* @__PURE__ */ e.jsx(Ce, {}) : o ? o.code === "E4011" ? /* @__PURE__ */ e.jsx(Ce, {}) : /* @__PURE__ */ e.jsx(
    ue,
    {
      status: "500",
      title: "500",
      subTitle: s("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (o == null ? void 0 : o.message) || o })
    }
  ) : r ? n && !l(n) ? /* @__PURE__ */ e.jsx(ve, { to: "/forbidden", replace: !0 }) : a && !u(a) ? /* @__PURE__ */ e.jsx(ve, { to: "/forbidden", replace: !0 }) : t : (window.location.href = Ke("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Ht = U(({ token: t, css: n }) => ({
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
})), se = ({
  overlayClassName: t,
  overlay: n,
  hidden: a,
  children: s,
  ...r
}) => {
  const { styles: i } = Ht();
  return a ? /* @__PURE__ */ e.jsx(e.Fragment, {}) : /* @__PURE__ */ e.jsx(
    Ve,
    {
      popupRender: n,
      overlayClassName: M(i.container, t),
      ...r,
      children: /* @__PURE__ */ e.jsx("span", { className: i.iconStyle, children: s })
    }
  );
}, Ut = () => /* @__PURE__ */ e.jsxs(
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
), qt = U(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), Wt = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], On = ({
  transformLangConfig: t = (a) => a,
  className: n
}) => {
  const { i18n: a } = C(), { styles: s } = qt(), r = (o) => {
    a.changeLanguage(o);
  }, i = {
    selectedKeys: [a.language],
    onClick: (o) => {
      r(o.key);
    },
    items: t(Wt).map((o) => ({
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
      className: n,
      menu: i,
      children: /* @__PURE__ */ e.jsx(Ut, {})
    }
  );
}, Yt = U(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), je = (t) => Bt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? le.endsWith("/") ? le + `files/${t}` : le + `/files/${t}` : t, $n = ({ src: t, fallback: n, ...a }) => /* @__PURE__ */ e.jsx(st, { src: je(t), icon: n, ...a }), Xt = ({ onChange: t, shape: n = "square" }) => {
  const [a, s] = y([]), { styles: r } = Yt(), [i, o] = y(!1), [l, u] = y(!0), [d, h] = y(0), { run: m, loading: p } = A(() => S.base.listFiles({ current: d + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: g }) => {
      console.log(g), s([...a, ...g]), u(g.length === 40), h(d + 1);
    }
  }), c = () => {
    u(!0), h(0), s([]);
  };
  return /* @__PURE__ */ e.jsx(
    at,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (g) => {
        o(g), g ? m() : c();
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
            $t,
            {
              dataLength: a.length,
              next: () => {
                m();
              },
              hasMore: l,
              loader: /* @__PURE__ */ e.jsx(ot, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(Pe, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                R,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: a,
                  style: { margin: "0 8px" },
                  loading: p,
                  renderItem: ({ id: g }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: r.avatarItem,
                      onClick: (T) => {
                        T.stopPropagation(), t == null || t(g), o(!1), c();
                      },
                      children: /* @__PURE__ */ e.jsx(it, { src: je(g), placeholder: /* @__PURE__ */ e.jsx(ge, { size: "default" }), preview: !1 })
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
        gt,
        {
          shape: n,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, Gt = ({ value: t, onChange: n, shape: a, ...s }) => {
  const [r, i] = y(void 0), [o, l] = y(!1), [u, d] = y(void 0), h = async (m) => {
    l(!0), d(m.url ?? m.preview);
  };
  return E(() => {
    i(t ? {
      uid: t,
      name: t,
      url: je(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Ot,
      {
        beforeCrop: async (m) => {
          if (m.type === "image/svg+xml") {
            const p = await S.base.uploadFile({ type: "avatar" }, m);
            return p.length > 0 && (n == null || n(p[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          rt,
          {
            customRequest: async (m) => {
              var c, g;
              const p = await S.base.uploadFile({ type: "avatar", access: "public" }, m.file);
              p.length > 0 ? ((c = m.onSuccess) == null || c.call(m, p[0].id), n == null || n(p[0].id)) : (g = m.onError) == null || g.call(m, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: h,
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
            fileList: r ? [r] : [],
            ...s,
            children: r ? void 0 : /* @__PURE__ */ e.jsx(Xt, { shape: a, onChange: n })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(_e, { open: o, footer: null, onCancel: () => l(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: u }) })
  ] });
}, Bn = ({ className: t }) => {
  const { t: n } = C("common"), { user: a } = he(), { currentOrgId: s, setCurrentOrgId: r } = xe(), i = (a == null ? void 0 : a.organizations) || [], o = (h) => {
    r(h), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const l = i.find((h) => h.id === s), u = l ? l.name : n("organization.global", { defaultValue: "Global" }), d = [
    ...i.map((h) => ({
      key: h.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: h.name }),
        s === h.id && /* @__PURE__ */ e.jsx(yt, {})
      ] }),
      onClick: () => o(h.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    se,
    {
      className: t,
      menu: {
        items: d,
        selectedKeys: s ? [s] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(jt, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: u })
      ]
    }
  );
}, Jt = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Hn = ({ className: t }) => {
  const { t: n } = C("task"), a = Fe(), { user: s } = Ge(), { tasksDropdownOpen: r, setTasksDropdownOpen: i, tasks: o, setTasks: l } = xe(), { runAsync: u, loading: d } = A(async () => S.tasks.listUserTasks({}), {
    onSuccess: (p) => {
      Qe(o, p, (c, g) => c.id === g.id && c.status === g.status && c.progress === g.progress) || l(p);
    },
    pollingInterval: r ? 3e3 : 6e4,
    ready: !!s,
    refreshDeps: [s]
  });
  E(() => {
    r && u();
  }, [r]);
  const h = async (p) => {
    const c = await S.base.downloadFile({ fileKey: p }, { params: { method: "sign" } }), g = `/api/files/${p}?signature=${c.signature}&expires=${c.expires}`;
    window.open(g, "_blank");
  }, m = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      R,
      {
        size: "small",
        dataSource: o,
        loading: d,
        renderItem: (p) => /* @__PURE__ */ e.jsx(
          R.Item,
          {
            extra: /* @__PURE__ */ e.jsx(J, { color: Jt[p.status], style: { marginLeft: 6 }, children: n(`status.${p.status}`, { defaultValue: p.status }) }),
            actions: [
              p.artifact_file_key && /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx(wt, {}),
                  onClick: () => h(p.artifact_file_key)
                }
              )
            ].filter(Boolean),
            children: /* @__PURE__ */ e.jsx(
              R.Item.Meta,
              {
                title: /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13 }, children: /* @__PURE__ */ e.jsxs(P.Text, { ellipsis: { tooltip: !0 }, children: [
                  n(`type.${p.type}`, { defaultValue: p.type }),
                  " ",
                  p.artifact_file_name && `- ${p.artifact_file_name}`
                ] }) }),
                description: (p.status === "running" || p.status === "pending") && /* @__PURE__ */ e.jsx(lt, { percent: p.progress ?? 0, size: "small", style: { marginTop: 4 } })
              }
            )
          },
          p.id
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(v, { type: "link", size: "small", onClick: () => a("/tasks"), children: n("more", { defaultValue: "More" }) }) })
  ] });
  return !o || o.length === 0 ? null : /* @__PURE__ */ e.jsxs(se, { className: t, overlay: m, placement: "bottomRight", open: r, onOpenChange: i, children: [
    /* @__PURE__ */ e.jsx(bt, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: n("tasks", { defaultValue: "Tasks" }) })
  ] });
}, Kt = 20, Un = ({ className: t }) => {
  const { t: n } = C("inbox"), a = Fe(), { user: s } = he(), { inboxUnreadCount: r, inboxRevision: i, setInboxUnreadCount: o, bumpInboxRevision: l } = xe(), [u, d] = y(!1), { data: h = [], loading: m, run: p } = A(
    async () => (await S.inbox.listInboxMessages({
      current: 1,
      page_size: Kt
    })).data ?? [],
    {
      ready: !!s,
      refreshDeps: [s == null ? void 0 : s.id, i]
    }
  ), c = async (k) => {
    await S.inbox.markInboxMessageRead({ id: k }), l(), p();
  }, g = async () => {
    await S.inbox.markAllInboxMessagesRead(), o(0), l(), p();
  }, T = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 420, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      R,
      {
        size: "small",
        dataSource: h,
        loading: m,
        locale: { emptyText: n("empty", { defaultValue: "No messages" }) },
        renderItem: (k) => {
          const w = Ze(k);
          return /* @__PURE__ */ e.jsx(
            R.Item,
            {
              style: { cursor: w ? "pointer" : "default" },
              onClick: () => {
                w && c(k.id);
              },
              children: /* @__PURE__ */ e.jsx(
                R.Item.Meta,
                {
                  title: /* @__PURE__ */ e.jsx(P.Text, { strong: w, ellipsis: { tooltip: !0 }, children: tt(n, k) }),
                  description: /* @__PURE__ */ e.jsxs(F, { direction: "vertical", size: 0, style: { width: "100%" }, children: [
                    /* @__PURE__ */ e.jsx(P.Text, { type: "secondary", ellipsis: { tooltip: !0 }, children: et(n, k) }),
                    /* @__PURE__ */ e.jsx(P.Text, { type: "secondary", style: { fontSize: 12 }, children: k.created_at ? new Date(k.created_at).toLocaleString() : "" })
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
      /* @__PURE__ */ e.jsx(v, { type: "link", size: "small", disabled: r <= 0, onClick: () => void g(), children: n("markAllRead", { defaultValue: "Mark all as read" }) }),
      /* @__PURE__ */ e.jsx(
        v,
        {
          type: "link",
          size: "small",
          onClick: () => {
            d(!1), a("/inbox");
          },
          children: n("viewAll", { defaultValue: "View all" })
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ e.jsx(se, { className: t, overlay: T, placement: "bottomRight", open: u, onOpenChange: d, children: /* @__PURE__ */ e.jsx(ct, { count: r, size: "small", overflowCount: 99, children: /* @__PURE__ */ e.jsx(vt, { style: { marginRight: 4, height: 18, width: 18, fontSize: 18 } }) }) });
}, qn = ({
  onResize: t,
  minWidth: n = 300,
  maxWidth: a = window.innerWidth * 0.5
}) => {
  const [s, r] = y(!1), [i, o] = y(!1), l = G((h) => {
    h.preventDefault(), r(!0);
  }, []), u = G(
    (h) => {
      if (!s) return;
      const m = window.innerWidth - h.clientX, p = Math.max(n, Math.min(a, m));
      t(p);
    },
    [s, n, a, t]
  ), d = G(() => {
    r(!1);
  }, []);
  return E(() => {
    if (s)
      return document.addEventListener("mousemove", u), document.addEventListener("mouseup", d), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", d), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [s, u, d]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: l,
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
}, H = 40, Qt = 28, Zt = 6, Re = "ai-chat-float-pos", en = U(({ token: t, css: n }) => ({
  root: n`
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
function _(t, n, a) {
  return Math.min(Math.max(t, n), a);
}
function D() {
  return Math.max(0, window.innerWidth - H);
}
function N() {
  return Math.max(0, window.innerHeight - H);
}
function ce() {
  const t = D(), n = N();
  return {
    rx: t > 0 ? _((t - 24) / t, 0, 1) : 1,
    ry: n > 0 ? _((n - 24) / n, 0, 1) : 1,
    edge: null
  };
}
function De(t, n, a) {
  let s = _(t, 0, D()), r = _(n, 0, N());
  return a === "left" && (s = 0), a === "right" && (s = D()), a === "top" && (r = 0), a === "bottom" && (r = N()), { x: s, y: r, edge: a };
}
function Ne(t) {
  const n = D(), a = N();
  return {
    rx: n > 0 ? _(t.x / n, 0, 1) : 0,
    ry: a > 0 ? _(t.y / a, 0, 1) : 0,
    edge: t.edge
  };
}
function Te(t) {
  return De(t.rx * D(), t.ry * N(), t.edge);
}
function tn() {
  try {
    const t = localStorage.getItem(Re);
    if (!t) return ce();
    const n = JSON.parse(t);
    return typeof n.rx == "number" && typeof n.ry == "number" ? {
      rx: _(n.rx, 0, 1),
      ry: _(n.ry, 0, 1),
      edge: n.edge ?? null
    } : typeof n.x == "number" && typeof n.y == "number" ? Ne({
      x: _(n.x, 0, D()),
      y: _(n.y, 0, N()),
      edge: n.edge ?? null
    }) : ce();
  } catch {
    return ce();
  }
}
function Ie(t) {
  localStorage.setItem(Re, JSON.stringify(t));
}
function nn(t, n) {
  const a = t, s = window.innerWidth - (t + H), r = n, i = window.innerHeight - (n + H), o = Math.min(a, s, r, i);
  return o > Qt ? null : o === a ? "left" : o === s ? "right" : o === r ? "top" : "bottom";
}
const sn = ({
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
] }), Wn = ({ icon: t }) => {
  const { styles: n } = en(), { setVisible: a, visible: s } = Je(), { t: r } = C("ai"), i = oe(
    typeof window > "u" ? { rx: 1, ry: 1, edge: null } : tn()
  ), [o, l] = y(
    () => typeof window > "u" ? { x: 0, y: 0, edge: null } : Te(i.current)
  ), [u, d] = y(!1), h = oe(null), m = oe(o);
  m.current = o;
  const p = !u && o.edge === "left" ? n.dockLeft : !u && o.edge === "right" ? n.dockRight : !u && o.edge === "top" ? n.dockTop : !u && o.edge === "bottom" ? n.dockBottom : void 0, c = G((x) => {
    const f = Ne(x);
    i.current = f, Ie(f), l(x);
  }, []), g = G(() => {
    h.current || l(Te(i.current));
  }, []);
  E(() => (Ie(i.current), window.addEventListener("resize", g), () => window.removeEventListener("resize", g)), [g]);
  const T = (x) => {
    x.button === 0 && (x.currentTarget.setPointerCapture(x.pointerId), h.current = {
      pointerId: x.pointerId,
      startX: x.clientX,
      startY: x.clientY,
      originX: m.current.x,
      originY: m.current.y,
      moved: !1
    }, d(!0));
  }, k = (x) => {
    const f = h.current;
    if (!f || f.pointerId !== x.pointerId) return;
    const L = x.clientX - f.startX, z = x.clientY - f.startY;
    !f.moved && Math.hypot(L, z) > Zt && (f.moved = !0), l({
      x: _(f.originX + L, 0, D()),
      y: _(f.originY + z, 0, N()),
      edge: null
    });
  }, w = (x) => {
    const f = h.current;
    if (!f || f.pointerId !== x.pointerId) return;
    try {
      x.currentTarget.releasePointerCapture(x.pointerId);
    } catch {
    }
    const L = !f.moved;
    if (h.current = null, d(!1), L) {
      a(!0);
      return;
    }
    const z = nn(m.current.x, m.current.y);
    c(De(m.current.x, m.current.y, z));
  };
  return s ? null : Dt(
    /* @__PURE__ */ e.jsx(
      K,
      {
        title: r("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
        placement: "left",
        mouseEnterDelay: 0.4,
        open: u ? !1 : void 0,
        children: /* @__PURE__ */ e.jsx(
          "button",
          {
            type: "button",
            "aria-label": r("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
            className: M(
              "ai-chat-float-button",
              n.root,
              u && n.dragging,
              !u && o.edge && n.docked,
              p
            ),
            style: { left: o.x, top: o.y },
            onPointerDown: T,
            onPointerMove: k,
            onPointerUp: w,
            onPointerCancel: w,
            children: t ?? /* @__PURE__ */ e.jsx("span", { className: n.body, children: /* @__PURE__ */ e.jsx(sn, { className: n.robot, eyeClassName: n.eye }) })
          }
        )
      }
    ),
    document.body
  );
}, Oe = ({
  permission: t,
  permissions: n = [],
  checkAll: a = !1,
  fallback: s = null,
  children: r
}) => {
  const { hasPermission: i, hasAnyPermission: o, hasAllPermissions: l, isAdmin: u, loading: d } = fe();
  return d ? null : u ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : t ? i(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : n.length > 0 ? (a ? l(n) : o(n)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: r });
}, Yn = ({
  fallback: t = null,
  children: n
}) => {
  const { isAdmin: a, loading: s } = fe();
  return s ? null : a ? /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, Le = (t) => {
  const [n, a] = y(!1), { permission: s, icon: r, tooltip: i, onClick: o, confirm: l, label: u, ...d } = t, h = !!d.disabled, m = o ? async () => {
    a(!0);
    try {
      await o();
    } finally {
      a(!1);
    }
  } : void 0;
  let p = /* @__PURE__ */ e.jsx(
    v,
    {
      type: "link",
      size: "small",
      loading: n,
      icon: r,
      onClick: l && !h ? void 0 : m,
      ...d,
      children: u && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: u })
    }
  );
  if (l && !h) {
    const c = async () => {
      l.onConfirm ? await l.onConfirm() : m && await m();
    };
    p = /* @__PURE__ */ e.jsx(
      ne,
      {
        title: l.title,
        description: l.description,
        onConfirm: c,
        okText: l.okText,
        cancelText: l.cancelText,
        children: p
      }
    );
  }
  return i && (p = h ? /* @__PURE__ */ e.jsx(K, { title: i, children: /* @__PURE__ */ e.jsx("span", { style: { display: "inline-block", cursor: "not-allowed" }, children: p }) }) : /* @__PURE__ */ e.jsx(K, { title: i, children: p })), s && (p = /* @__PURE__ */ e.jsx(Oe, { permission: s, children: p })), p;
}, Xn = ({ actions: t, maxVisibleItems: n }) => {
  const { modal: a } = O.useApp(), s = t.filter((l) => !l.hidden);
  if (!n || s.length <= n)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: s.map(({ key: l, ...u }) => /* @__PURE__ */ e.jsx(Le, { ...u }, l)) });
  const r = s.slice(0, n - 1), o = s.slice(n - 1).map((l) => {
    const { key: u, label: d, icon: h, permission: m, onClick: p, confirm: c, disabled: g, tooltip: T } = l, w = {
      key: u,
      label: d,
      icon: h,
      disabled: g,
      onClick: async () => {
        c ? a.confirm({
          title: c.title,
          content: c.description,
          onOk: c.onConfirm || p,
          okText: c.okText,
          cancelText: c.cancelText
        }) : p && await p();
      }
    };
    return m ? {
      ...w,
      label: /* @__PURE__ */ e.jsx(Oe, { permission: m, children: /* @__PURE__ */ e.jsx("span", { children: d ?? T }) })
    } : w;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    r.map(({ key: l, ...u }) => /* @__PURE__ */ e.jsx(Le, { ...u }, l)),
    /* @__PURE__ */ e.jsx(Ve, { menu: { items: o }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(v, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(St, {}) }) })
  ] });
}, rn = xt, an = (t) => rn[t], Gn = ({ iconName: t }) => {
  if (!t)
    return null;
  const n = an(t);
  return n ? /* @__PURE__ */ e.jsx(Et, { fallback: null, children: /* @__PURE__ */ e.jsx(n, {}) }) : null;
}, Jn = ({ onChange: t }) => {
  const [n, a] = y(""), [s, r] = y("");
  return /* @__PURE__ */ e.jsxs(F.Compact, { children: [
    /* @__PURE__ */ e.jsx(I, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (i) => a(i.target.value) }),
    /* @__PURE__ */ e.jsx(I, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(I, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (i) => r(i.target.value) }),
    /* @__PURE__ */ e.jsx(v, { type: "primary", icon: /* @__PURE__ */ e.jsx(kt, {}), onClick: () => {
      t(n, s);
    } })
  ] });
}, on = ({ request: t, tableRef: n, ...a }, s) => {
  const [r, i] = y({
    current: 1,
    pageSize: 10
  }), [o, l] = y(0), { data: u, loading: d, refresh: h } = A(async () => {
    const m = await t({
      current: r.current,
      page_size: r.pageSize
    });
    return l(m.total), m.data;
  }, {
    refreshDeps: [r]
  });
  return Rt(s, () => ({
    reload: () => {
      h();
    }
  })), /* @__PURE__ */ e.jsx(
    ye,
    {
      rowKey: "id",
      loading: d,
      dataSource: u ?? [],
      pagination: {
        ...r,
        total: o,
        onChange: (m, p) => {
          i({ current: m, pageSize: p });
        }
      },
      ...a,
      ref: n
    }
  );
}, Kn = ({ actionRef: t, ...n }) => {
  const [a, s] = y();
  return E(() => {
    s(Mt(on));
  }, []), a ? /* @__PURE__ */ e.jsx(a, { ...n, ref: t }) : null;
}, Qn = ({ className: t, onSuccess: n, token: a }) => {
  const { message: s } = O.useApp(), { t: r } = C("authorization"), { t: i } = C("common"), [o] = b.useForm(), { run: l, loading: u } = A(async (d) => S.authorization.changePassword(d, a ? { headers: { Authorization: `Bearer ${a}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      s.success(r("user.passwordChanged")), o.resetFields(), n == null || n();
    },
    onError: (d) => {
      if (d instanceof Nt) {
        const h = d.code ?? "normal";
        s.error(r(`user.passwordChangeFailed.${h}`, { error: d.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        s.error(r("user.passwordChangeFailed.normal", { error: d.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", d);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    b,
    {
      form: o,
      layout: "vertical",
      onFinish: l,
      style: { maxWidth: 500, margin: "0 auto" },
      className: M("profile-password", t),
      children: [
        /* @__PURE__ */ e.jsx(
          b.Item,
          {
            name: "old_password",
            label: r("user.oldPassword"),
            rules: [{ required: !0, message: r("validation.oldPasswordRequired") }],
            className: M("profile-password-item", "profile-password-item-old-password"),
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
            className: M("profile-password-item", "profile-password-item-new-password"),
            children: /* @__PURE__ */ e.jsx(I.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          b.Item,
          {
            name: "confirm_password",
            label: r("user.confirmPassword"),
            className: M("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: r("validation.confirmPasswordRequired") },
              ({ getFieldValue: d }) => ({
                validator(h, m) {
                  return !m || d("new_password") === m ? Promise.resolve() : Promise.reject(new Error(r("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(I.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(b.Item, { className: M("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: u, children: i("save") }) })
      ]
    }
  );
}, Zn = ({ user: t, onSuccess: n }) => {
  const { message: a } = O.useApp(), { t: s } = C("authorization"), { t: r } = C("common"), [i] = b.useForm(), [o, l] = y(!1);
  Pt.useEffect(() => {
    t && i.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, i]);
  const u = async (d) => {
    try {
      l(!0), await S.authorization.updateCurrentUser(d), a.success(r("updateSuccess")), n();
    } catch (h) {
      a.error(r("updateFailed")), console.error("Failed to update user information:", h);
    } finally {
      l(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }),
      (t == null ? void 0 : t.roles) && t.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        s("user.roles"),
        ": ",
        t.roles.map((d) => d.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      b,
      {
        form: i,
        layout: "vertical",
        onFinish: u,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(Gt, {})
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
          /* @__PURE__ */ e.jsx(b.Item, { children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: o, children: r("save") }) })
        ]
      }
    )
  ] });
}, es = ({ user: t, onSuccess: n }) => {
  const { message: a } = O.useApp(), { t: s } = C("authorization"), { t: r } = C("common"), [i, o] = y(0), [l, u] = y(!1), [d, h] = y(!0), [m, p] = y(""), [c, g] = y("totp"), [T, k] = y(!1), [w, x] = y("password"), [f, L] = y(""), [z, q] = y(""), [$, Q] = y(""), [be, ae] = y(""), [W, Z] = y(0);
  E(() => {
    if (W <= 0) return;
    const j = setTimeout(() => Z((V) => V - 1), 1e3);
    return () => clearTimeout(j);
  }, [W]);
  const { run: Be, data: Y = { secret: "", qr_code: "", token: void 0 } } = A(
    () => S.authorization.enableMfa({ mfa_type: c }),
    {
      manual: !0,
      onSuccess: () => {
        o(1);
      },
      onBefore: () => {
        u(!0);
      },
      onFinally: () => {
        u(!1);
      }
    }
  ), He = async () => {
    if (!m) {
      a.warning(s("mfa.enterVerificationCode"));
      return;
    }
    const j = {
      code: m,
      mfa_type: c
    };
    "token" in Y && (j.token = Y.token);
    try {
      u(!0), await S.authorization.verifyAndActivateMfa(j), a.success(s("mfa.enableSuccess")), o(2), n();
    } catch (V) {
      a.error(s("mfa.verificationFailed")), console.error("Failed to verify MFA:", V);
    } finally {
      u(!1);
    }
  }, we = () => {
    k(!1), x("password"), L(""), q(""), Q(""), ae(""), Z(0);
  }, { runAsync: Ue, loading: qe } = A(
    () => S.authorization.sendDisableMfaCode(),
    { manual: !0 }
  ), We = async () => {
    try {
      const j = await Ue();
      ae((j == null ? void 0 : j.token) ?? ""), Q(""), Z(60), a.success(s("mfa.codeSent", { defaultValue: "Verification code has been sent to your email" }));
    } catch (j) {
      a.error(j instanceof Error ? j.message : r("operationFailed")), console.error("Failed to send disable-MFA code:", j);
    }
  }, ee = async () => {
    if (w === "email") {
      if (!be) {
        a.warning(s("mfa.sendCodeFirst", { defaultValue: "Please send the verification code first" }));
        return;
      }
      if (!$) {
        a.warning(s("mfa.enterVerificationCode"));
        return;
      }
    } else if (w === "totp") {
      if (!z) {
        a.warning(s("mfa.enterVerificationCode"));
        return;
      }
    } else if (!f) {
      a.warning(s("mfa.enterPassword", { defaultValue: "Enter your password" }));
      return;
    }
    const j = { password: "", mfa_code: "", email_code: "", email_token: "" };
    w === "email" ? (j.email_code = $, j.email_token = be) : w === "totp" ? j.mfa_code = z : j.password = f;
    try {
      u(!0), await S.authorization.disableMfa(j), a.success(s("mfa.disableSuccess")), we(), n();
    } catch (V) {
      a.error(V instanceof Error ? V.message : r("operationFailed")), console.error("Failed to disable MFA:", V), w === "email" && (ae(""), Q(""), Z(0));
    } finally {
      u(!1);
    }
  }, Ye = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        ue,
        {
          status: "success",
          title: s("mfa.enabled"),
          subTitle: s("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(v, { danger: !0, onClick: () => k(!0), children: s("mfa.disable") })
        }
      );
    const j = () => {
      var V;
      switch (i) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              te,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: s("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: s(c === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
                ] }),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20 }
              }
            ),
            /* @__PURE__ */ e.jsx(
              v,
              {
                type: "primary",
                onClick: Be,
                loading: l,
                children: s("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              te,
              {
                message: s("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: c === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: c === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(ut, { value: Y.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: c === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: c === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: d ? "*".repeat(((V = Y.secret) == null ? void 0 : V.length) ?? 0) : Y.secret }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "link",
                  onClick: () => h(!d),
                  icon: d ? /* @__PURE__ */ e.jsx(Me, {}) : /* @__PURE__ */ e.jsx(It, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              I,
              {
                placeholder: s("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: m,
                onChange: (Xe) => p(Xe.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(F, { children: [
              /* @__PURE__ */ e.jsx(v, { onClick: () => o(0), children: r("previous") }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "primary",
                  onClick: He,
                  loading: l,
                  children: r("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            ue,
            {
              status: "success",
              title: s("mfa.setupSuccess"),
              subTitle: s("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(v, { type: "primary", onClick: () => o(0), children: r("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: i === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          Se,
          {
            defaultValue: "totp",
            onChange: (V) => {
              g(V), o(0);
            },
            value: c,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Ct, {}), label: s("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Tt, {}), label: s("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(Pe, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        dt,
        {
          current: i,
          items: [
            { title: s(c === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: s(c === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: s(c === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: s(c === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: s(c === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: s(c === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      j()
    ] });
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 8 }, children: [
    Ye(),
    /* @__PURE__ */ e.jsxs(
      _e,
      {
        title: s("mfa.confirmDisable"),
        open: T,
        onOk: ee,
        okText: s("mfa.disable"),
        okButtonProps: { danger: !0, loading: l },
        onCancel: we,
        destroyOnHidden: !0,
        children: [
          /* @__PURE__ */ e.jsx(
            te,
            {
              message: s("mfa.disableWarning"),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          /* @__PURE__ */ e.jsx("p", { children: s("mfa.disableVerifyDescription", { defaultValue: "For security reasons, please verify your identity with your password or a verification code." }) }),
          /* @__PURE__ */ e.jsx(
            Se,
            {
              block: !0,
              value: w,
              onChange: (j) => x(j),
              options: [
                { value: "password", label: s("mfa.methodPassword", { defaultValue: "Password" }) },
                ...(t == null ? void 0 : t.mfa_type) === "totp" ? [{ value: "totp", label: s("mfa.totp", { defaultValue: "TOTP" }) }] : [],
                { value: "email", label: s("mfa.methodEmailCode", { defaultValue: "Email code" }) }
              ],
              style: { marginBottom: 16 }
            }
          ),
          w === "password" && /* @__PURE__ */ e.jsx(
            I.Password,
            {
              placeholder: s("mfa.enterPassword", { defaultValue: "Enter your password" }),
              autoComplete: "current-password",
              value: f,
              onChange: (j) => L(j.target.value),
              onPressEnter: ee
            }
          ),
          w === "totp" && /* @__PURE__ */ e.jsx(
            I,
            {
              placeholder: s("mfa.enterTotpCode", { defaultValue: "Enter the 6-digit code from your authenticator app" }),
              maxLength: 6,
              value: z,
              onChange: (j) => q(j.target.value),
              onPressEnter: ee
            }
          ),
          w === "email" && /* @__PURE__ */ e.jsxs(F.Compact, { style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(
              I,
              {
                placeholder: s("mfa.enterEmailCode", { defaultValue: "Enter the 6-digit code sent to your email" }),
                maxLength: 6,
                value: $,
                onChange: (j) => Q(j.target.value),
                onPressEnter: ee
              }
            ),
            /* @__PURE__ */ e.jsx(
              v,
              {
                onClick: We,
                loading: qe,
                disabled: W > 0,
                children: W > 0 ? s("mfa.resendIn", { defaultValue: "Resend ({{seconds}}s)", seconds: W }) : s("mfa.sendCode", { defaultValue: "Send code" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}, { Text: de } = P, ts = () => {
  const { message: t } = O.useApp(), { t: n } = C("authorization"), { t: a } = C("common"), [s, r] = y(null), [i, o] = y(!1), { data: l = [], loading: u, run: d } = A(() => S.authorization.getUserSessions({}), {
    onError: (c) => {
      t.error(n("session.getSessionsFailed", { error: c, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: h } = A((c) => S.authorization.terminateSession({ id: c }), {
    onSuccess: () => {
      t.success(n("session.terminateSuccess", { defaultValue: "Session terminated successfully" })), d();
    },
    onError: (c) => {
      t.error(n("session.terminateFailed", { error: c, defaultValue: "Failed to terminate session: {{error}}" }));
    },
    onFinally: () => {
      r(null);
    },
    onBefore: ([c]) => {
      r(c);
    },
    manual: !0
  }), { run: m } = A(() => S.authorization.terminateOtherSessions(), {
    onSuccess: () => {
      t.success(n("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" })), d();
    },
    onError: (c) => {
      t.error(n("session.terminateAllFailed", { error: c, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
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
      render: (c, g) => /* @__PURE__ */ e.jsxs(F, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(F, { children: [
          /* @__PURE__ */ e.jsx(Lt, {}),
          /* @__PURE__ */ e.jsx(de, { strong: !0, children: c })
        ] }),
        /* @__PURE__ */ e.jsxs(F, { children: [
          /* @__PURE__ */ e.jsx(At, {}),
          /* @__PURE__ */ e.jsx(de, { type: "secondary", children: g.location })
        ] })
      ] })
    },
    {
      title: n("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (c) => /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(zt, {}),
        /* @__PURE__ */ e.jsx("span", { children: c })
      ] })
    },
    {
      title: n("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (c) => /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(Ft, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(c).toLocaleString() })
      ] })
    },
    {
      title: n("session.status"),
      key: "status",
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(J, { color: "green", children: n("session.current") }) : /* @__PURE__ */ e.jsx(J, { color: "blue", children: n("session.active") })
    },
    {
      title: a("actions"),
      key: "action",
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(de, { type: "secondary", children: n("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        ne,
        {
          title: n("session.confirmTerminate"),
          onConfirm: () => h(c.id),
          okText: a("confirm"),
          cancelText: a("cancel"),
          children: /* @__PURE__ */ e.jsx(
            v,
            {
              type: "link",
              danger: !0,
              loading: s === c.id,
              children: n("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(F, { direction: "vertical", style: { padding: 8, width: "100%" }, children: [
    /* @__PURE__ */ e.jsxs(F, { direction: "horizontal", style: { float: "right" }, children: [
      l.length > 1 && /* @__PURE__ */ e.jsx(
        ne,
        {
          title: n("session.confirmTerminateAll"),
          onConfirm: m,
          okText: a("confirm"),
          cancelText: a("cancel"),
          children: /* @__PURE__ */ e.jsx(
            v,
            {
              danger: !0,
              loading: i,
              children: n("session.terminateOthers")
            }
          )
        }
      ),
      /* @__PURE__ */ e.jsx(v, { onClick: () => d(), loading: u, children: a("refresh") })
    ] }),
    !u && l.length === 0 ? /* @__PURE__ */ e.jsx(Ee, { description: n("session.noSessions") }) : /* @__PURE__ */ e.jsx(
      ye,
      {
        columns: p,
        dataSource: l,
        rowKey: "id",
        loading: u,
        pagination: !1
      }
    )
  ] });
}, { RangePicker: ln } = pt, { Option: B } = pe, cn = (t) => t || "N/A", dn = (t, n) => t === "success" ? /* @__PURE__ */ e.jsx(J, { color: "success", children: n("statuses.success") }) : /* @__PURE__ */ e.jsx(J, { color: "error", children: n("statuses.failed") }), ns = ({
  userId: t,
  request: n = (s) => t ? S.authorization.getUserLogs({ id: t, ...s }) : S.authorization.getCurrentUserLogs(s),
  columnsFilter: a = (s) => s
}) => {
  const { message: s, modal: r } = O.useApp(), { t: i } = C("authorization"), { t: o } = C("common"), [l, u] = y({
    current: 1,
    pageSize: 10,
    total: 0
  }), [d, h] = y({}), [m] = b.useForm(), { loading: p, run: c, data: { data: g } = {} } = A(async (f = d, L = 1, z = 10) => n({
    ...f,
    current: L ?? 1,
    page_size: z ?? 10
  }), {
    onError(f) {
      s.error(i("auditLog.fetchFailed", { error: f }));
    },
    onSuccess({ total: f }) {
      u({
        ...l,
        total: f
      });
    }
  });
  E(() => {
    c(d, 1, l.pageSize);
  }, []);
  const T = (f) => {
    u({
      ...l,
      current: f.current || 1,
      pageSize: f.pageSize || 10
    }), c({}, f.current, f.pageSize);
  }, k = (f) => {
    var L, z, q, $;
    c({
      ...f,
      start_time: (z = (L = f.dateRange) == null ? void 0 : L[0]) == null ? void 0 : z.toISOString(),
      end_time: ($ = (q = f.dateRange) == null ? void 0 : q[1]) == null ? void 0 : $.toISOString()
    }, 1, l.pageSize);
  }, w = () => {
    m.resetFields(), h({}), u({ ...l, current: 1 }), c({}, 1, l.pageSize);
  }, x = [
    {
      title: i("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (f) => nt(f)
    },
    {
      title: i("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (f, L) => f ? i(`action.${f.replace(/:/g, ".")}`, { defaultValue: i(`permission.title.${f.replace(/:/g, ".")}`, { defaultValue: L.action_name }) }) : L.action_name ?? L.action
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
      render: (f) => cn(f)
    },
    {
      title: i("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (f) => dn(f, i)
    },
    {
      title: i("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (f) => /* @__PURE__ */ e.jsx(v, { type: "link", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: () => {
        r.info({
          title: i("auditLog.details"),
          content: JSON.stringify(f)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(me, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      b,
      {
        form: m,
        layout: "horizontal",
        onFinish: k,
        initialValues: d,
        children: /* @__PURE__ */ e.jsxs(mt, { gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(X, { xxl: 6, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(b.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(I, { placeholder: i("auditLog.searchPlaceholder") }) }) }),
          /* @__PURE__ */ e.jsx(X, { xxl: 4, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(b.Item, { name: "action", noStyle: !0, children: /* @__PURE__ */ e.jsxs(pe, { allowClear: !0, placeholder: i("auditLog.selectAction"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(B, { value: "login", children: i("actions.login") }),
            /* @__PURE__ */ e.jsx(B, { value: "logout", children: i("actions.logout") }),
            /* @__PURE__ */ e.jsx(B, { value: "password_reset", children: i("actions.passwordReset") }),
            /* @__PURE__ */ e.jsx(B, { value: "mfa_change", children: i("actions.mfaChange") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(X, { xxl: 3, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(b.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(pe, { allowClear: !0, placeholder: i("auditLog.selectStatus"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(B, { value: "success", children: i("statuses.success") }),
            /* @__PURE__ */ e.jsx(B, { value: "failed", children: i("statuses.failed") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(X, { xxl: 6, xl: 6, lg: 10, md: 12, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(b.Item, { name: "dateRange", noStyle: !0, children: /* @__PURE__ */ e.jsx(ln, { style: { width: "100%" } }) }) }),
          /* @__PURE__ */ e.jsx(X, { xxl: 5, xl: 24, lg: 14, md: 24, sm: 24, xs: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(F, { children: [
            /* @__PURE__ */ e.jsx(v, { onClick: w, children: o("reset") }),
            /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Vt, {}), children: o("search") })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(me, { children: /* @__PURE__ */ e.jsx(
      ye,
      {
        rowKey: "id",
        columns: a(x),
        dataSource: g,
        pagination: {
          ...l,
          showSizeChanger: !0,
          showTotal: (f) => o("totalItems", { total: f })
        },
        loading: p,
        onChange: T,
        scroll: { x: "max-content" }
      }
    ) })
  ] });
}, { Text: un } = P, ss = ({ kind: t, subjectId: n, readOnly: a }) => {
  const { message: s } = O.useApp(), { t: r } = C("authorization"), { t: i } = C("common"), [o] = b.useForm(), l = t === "user" ? S.authorization.getUserRateLimit : S.authorization.getServiceAccountRateLimit, u = t === "user" ? S.authorization.updateUserRateLimit : S.authorization.updateServiceAccountRateLimit, { data: d, loading: h, refresh: m } = A(() => l({ id: n }), {
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
  }), { run: p, loading: c } = A(
    async (x) => u({ id: n }, {
      ...x,
      clear: !1,
      inherited: !1,
      enabled: x.enabled !== !1
    }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(r("rateLimit.saveSuccess", { defaultValue: "Rate limit override saved" })), m();
      },
      onError: (x) => {
        s.error(x.message || r("rateLimit.saveFailed", { defaultValue: "Failed to save override" }));
      }
    }
  ), { run: g, loading: T } = A(
    async () => u({ id: n }, {
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
        s.success(r("rateLimit.resetSuccess", { defaultValue: "Override cleared; type default restored" })), m();
      },
      onError: (x) => {
        s.error(x.message);
      }
    }
  ), { run: k, loading: w } = A(
    async () => t === "user" ? S.authorization.resetUserRateLimit({ id: n }) : S.authorization.resetServiceAccountRateLimit({ id: n }),
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
  return /* @__PURE__ */ e.jsxs(b, { form: o, layout: "vertical", onFinish: p, disabled: a || h, style: { maxWidth: 480, marginTop: 16 }, children: [
    (d == null ? void 0 : d.inherited) && /* @__PURE__ */ e.jsx(
      te,
      {
        type: "info",
        showIcon: !0,
        style: { marginBottom: 16 },
        message: r("rateLimit.inherited", { defaultValue: "Using the type default. Save to create a subject-specific override." })
      }
    ),
    /* @__PURE__ */ e.jsx(b.Item, { name: "rate", label: r("rateLimit.rate", { defaultValue: "Rate" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(ie, { min: 1, style: { width: "100%" } }) }),
    /* @__PURE__ */ e.jsx(b.Item, { name: "period", label: r("rateLimit.period", { defaultValue: "Period" }), extra: r("rateLimit.periodHint", { defaultValue: "Examples: 1s, 1m, 1h" }), children: /* @__PURE__ */ e.jsx(I, { placeholder: "1m" }) }),
    /* @__PURE__ */ e.jsx(b.Item, { name: "burst", label: r("rateLimit.burst", { defaultValue: "Burst" }), children: /* @__PURE__ */ e.jsx(ie, { min: 1, style: { width: "100%" } }) }),
    /* @__PURE__ */ e.jsx(b.Item, { name: "quota", label: r("rateLimit.quota", { defaultValue: "Daily quota (0 = none)" }), children: /* @__PURE__ */ e.jsx(ie, { min: 0, style: { width: "100%" } }) }),
    /* @__PURE__ */ e.jsx(b.Item, { name: "quota_period", label: r("rateLimit.quotaPeriod", { defaultValue: "Quota period" }), children: /* @__PURE__ */ e.jsx(I, { placeholder: "1d" }) }),
    /* @__PURE__ */ e.jsx(
      b.Item,
      {
        name: "enabled",
        label: r("rateLimit.enabled", { defaultValue: "Enabled" }),
        valuePropName: "checked",
        extra: r("rateLimit.enabledHint", { defaultValue: "Off: this override is ignored and the type default applies. Use Reset to default to delete the override." }),
        children: /* @__PURE__ */ e.jsx(ht, {})
      }
    ),
    !a && /* @__PURE__ */ e.jsxs(F, { children: [
      /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: c, children: i("save", { defaultValue: "Save" }) }),
      /* @__PURE__ */ e.jsx(
        ne,
        {
          title: r("rateLimit.resetCountersConfirm", { defaultValue: "Reset rate-limit and quota counters for this subject? They will be able to send requests immediately." }),
          onConfirm: () => k(),
          children: /* @__PURE__ */ e.jsx(v, { htmlType: "button", icon: /* @__PURE__ */ e.jsx(_t, {}), loading: w, children: r("rateLimit.resetCounters", { defaultValue: "Reset counters" }) })
        }
      ),
      !(d != null && d.inherited) && /* @__PURE__ */ e.jsx(v, { onClick: () => g(), loading: T, children: r("rateLimit.resetToDefault", { defaultValue: "Reset to default" }) })
    ] }),
    (d == null ? void 0 : d.inherited) && /* @__PURE__ */ e.jsx(un, { type: "secondary", children: r("rateLimit.sourceHint", { defaultValue: "Values shown are inherited." }) })
  ] });
}, { Text: Ae } = P, mn = {
  debug: "default",
  info: "processing",
  warn: "warning",
  error: "error"
}, rs = ({ taskId: t, poll: n }) => {
  const { t: a } = C("task"), { data: s = [], loading: r } = A(
    () => t ? S.tasks.getTaskLogs({ id: t }) : Promise.reject(new Error("No task id")),
    {
      refreshDeps: [t],
      ready: !!t,
      pollingInterval: n ? 2e3 : 0
    }
  );
  return /* @__PURE__ */ e.jsx(
    me,
    {
      title: a("logsTitle", { defaultValue: "Task logs" }),
      size: "small",
      style: { marginTop: 16 },
      children: r && !s.length ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 24 }, children: /* @__PURE__ */ e.jsx(ge, {}) }) : s.length ? /* @__PURE__ */ e.jsx(
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
            /* @__PURE__ */ e.jsx(Ae, { type: "secondary", style: { fontSize: 11 }, children: i.created_at }),
            i.level && /* @__PURE__ */ e.jsxs(Ae, { type: mn[i.level], style: { marginLeft: 8, fontSize: 11 }, children: [
              "[",
              i.level,
              "]"
            ] }),
            /* @__PURE__ */ e.jsx("div", { style: { display: "inline", marginLeft: 8 }, children: i.message })
          ] }, i.id))
        }
      ) : /* @__PURE__ */ e.jsx(Ee, { description: a("noLogs", { defaultValue: "No logs yet." }) })
    }
  );
}, pn = U(({ token: t, css: n }) => ({
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
function hn(t) {
  const n = t.trim();
  if (!n)
    return "";
  try {
    return JSON.stringify(JSON.parse(n), null, 2);
  } catch {
    return n;
  }
}
function fn(t) {
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
function $e(t, n) {
  return t ? t.id === "approve" ? n("chat.hitlExecute", { defaultValue: t.label || "Execute" }) : t.id === "reject" ? n("chat.hitlDontExecute", { defaultValue: t.label || "Don't execute" }) : t.label : "";
}
function xn(t, n, a) {
  var r;
  const s = (r = t.options) == null ? void 0 : r.find((i) => i.id === n);
  return $e(s, a) || n || "…";
}
const as = ({
  card: t,
  submitting: n = !1,
  onSelect: a
}) => {
  var k, w;
  const { t: s } = C("ai"), { styles: r } = pn(), i = hn(t.arguments || ""), [o, l] = y(t.selected_option_id || "");
  E(() => {
    l(t.selected_option_id || "");
  }, [t.selected_option_id, t.tool_call_id]);
  const u = o || t.selected_option_id || "", d = ((k = t.title) == null ? void 0 : k.trim()) || t.tool_name, h = !!((w = t.title) != null && w.trim() && t.tool_name && t.title.trim() !== t.tool_name && t.tool_name !== "ui_choose"), m = t.kind === "choice" || t.tool_name === "ui_choose", p = fn(t), c = !m && !!i, g = t.status === "abandoned" || t.status === "decided";
  let T;
  return t.status === "abandoned" ? T = /* @__PURE__ */ e.jsx(P.Text, { type: "secondary", children: s("chat.hitlAbandoned", { defaultValue: "You continued without choosing." }) }) : g && u ? T = /* @__PURE__ */ e.jsx(P.Text, { children: s("chat.hitlChose", {
    defaultValue: "You chose {{label}}.",
    label: xn(t, u, s)
  }) }) : g ? T = /* @__PURE__ */ e.jsx(P.Text, { children: s("chat.hitlChose", {
    defaultValue: "You chose {{label}}.",
    label: "…"
  }) }) : T = /* @__PURE__ */ e.jsx("div", { className: r.actions, children: (t.options ?? []).map((x) => {
    const f = u === x.id;
    return /* @__PURE__ */ e.jsx(
      v,
      {
        className: r.action,
        type: f ? "primary" : "default",
        loading: n && f,
        disabled: n,
        onClick: () => {
          l(x.id), a == null || a(x.id);
        },
        children: /* @__PURE__ */ e.jsxs(ke, { vertical: !0, align: "flex-start", children: [
          /* @__PURE__ */ e.jsx("span", { children: $e(x, s) }),
          x.description ? /* @__PURE__ */ e.jsx("span", { style: { fontSize: 12, fontWeight: 400, opacity: 0.85 }, children: x.description }) : null
        ] })
      },
      x.id
    );
  }) }), /* @__PURE__ */ e.jsxs("div", { className: r.wrap, children: [
    /* @__PURE__ */ e.jsxs("div", { className: r.header, children: [
      /* @__PURE__ */ e.jsx("span", { className: r.title, children: d }),
      h ? /* @__PURE__ */ e.jsx(P.Text, { className: r.toolName, type: "secondary", code: !0, children: t.tool_name }) : null
    ] }),
    /* @__PURE__ */ e.jsxs(ke, { vertical: !0, gap: 8, children: [
      p ? /* @__PURE__ */ e.jsx("div", { className: r.description, children: p }) : null,
      c ? /* @__PURE__ */ e.jsx(
        ft,
        {
          className: r.arguments,
          ghost: !0,
          size: "small",
          items: [{
            key: "arguments",
            label: s("chat.hitlArguments", { defaultValue: "Arguments" }),
            children: /* @__PURE__ */ e.jsx("pre", { className: r.argsPre, children: i })
          }]
        }
      ) : null,
      T
    ] })
  ] });
};
function gn(t) {
  try {
    return JSON.stringify(JSON.parse(t), null, 2);
  } catch {
    return t;
  }
}
const re = U(({ token: t, css: n }) => ({
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
function yn({ open: t }) {
  const { styles: n, cx: a } = re();
  return /* @__PURE__ */ e.jsx("svg", { className: a(n.chevron, t && n.chevronOpen), width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ e.jsx("path", { d: "M6 4.5 10 8 6 11.5", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function jn() {
  return /* @__PURE__ */ e.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: [
    /* @__PURE__ */ e.jsx("rect", { x: "6", y: "6", width: "7", height: "7", rx: "1.4", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ e.jsx("path", { d: "M10 6V4.2A1.2 1.2 0 0 0 8.8 3H4.2A1.2 1.2 0 0 0 3 4.2v4.6A1.2 1.2 0 0 0 4.2 10H6", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function bn() {
  return /* @__PURE__ */ e.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ e.jsx("path", { d: "M3.5 8.2 6.4 11 12.5 5", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ze({ call: t }) {
  var u;
  const { styles: n, cx: a } = re(), { t: s } = C("ai"), r = t.status === "running" || t.status === "pending", i = t.status === "failed", o = i ? s("chat.toolFailed", { defaultValue: "Failed" }) : r ? s("chat.toolRunning", { defaultValue: "Running" }) : s("chat.toolDone", { defaultValue: "Done" }), l = (u = t.title) == null ? void 0 : u.trim();
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx("code", { className: n.name, children: t.name }),
    l ? /* @__PURE__ */ e.jsx("span", { className: n.title, title: l, children: l }) : null,
    /* @__PURE__ */ e.jsx("span", { className: a(n.status, r && n.statusRunning, i && n.statusFailed), children: o })
  ] });
}
function wn({ call: t }) {
  const { styles: n } = re(), a = t.status === "running" || t.status === "pending";
  return t.arguments ? /* @__PURE__ */ e.jsx("section", { className: n.run, "aria-busy": a, children: /* @__PURE__ */ e.jsxs("details", { className: n.run, children: [
    /* @__PURE__ */ e.jsx("summary", { className: n.summary, children: /* @__PURE__ */ e.jsx(ze, { call: t }) }),
    /* @__PURE__ */ e.jsx("pre", { className: n.pre, children: gn(t.arguments) })
  ] }) }) : /* @__PURE__ */ e.jsx("section", { className: n.run, "aria-busy": a, children: /* @__PURE__ */ e.jsx("p", { className: n.line, children: /* @__PURE__ */ e.jsx(ze, { call: t }) }) });
}
function is({
  text: t,
  tools: n = [],
  live: a = !1,
  align: s = "start"
}) {
  const { styles: r, cx: i } = re(), { t: o } = C("ai"), [l, u] = y(a), [d, h] = y(!1), m = d ? o("chat.copied", { defaultValue: "Copied" }) : o("chat.copyMessage", { defaultValue: "Copy message" }), p = l ? o("chat.hideToolCalls", { defaultValue: "Hide tool calls" }) : o("chat.showToolCalls", { defaultValue: "Show tool calls" });
  async function c() {
    try {
      await navigator.clipboard.writeText(t), h(!0), window.setTimeout(() => h(!1), 1200);
    } catch {
      h(!1);
    }
  }
  return !t && n.length === 0 ? null : /* @__PURE__ */ e.jsxs("div", { className: i("chat-message-actions", r.root, s === "end" && r.rootEnd, l && n.length > 0 && "has-tools"), children: [
    /* @__PURE__ */ e.jsxs("div", { className: r.actions, children: [
      t ? /* @__PURE__ */ e.jsx(K, { title: m, placement: "bottom", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: r.action, "aria-label": m, onClick: () => void c(), children: d ? /* @__PURE__ */ e.jsx(bn, {}) : /* @__PURE__ */ e.jsx(jn, {}) }) }) : null,
      n.length > 0 ? /* @__PURE__ */ e.jsx(K, { title: p, placement: "bottom", children: /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: r.action,
          "aria-expanded": l,
          "aria-label": p,
          onClick: () => u((g) => !g),
          children: /* @__PURE__ */ e.jsx(yn, { open: l })
        }
      ) }) : null
    ] }),
    n.length > 0 ? /* @__PURE__ */ e.jsx("div", { className: i("chat-tool-log", r.rows), hidden: !l, children: n.map((g) => /* @__PURE__ */ e.jsx(wn, { call: g }, g.id)) }) : null
  ] });
}
export {
  $n as A,
  is as C,
  Gn as D,
  se as H,
  Un as I,
  Ce as L,
  Bn as O,
  Nn as P,
  qn as R,
  Hn as T,
  ns as U,
  On as a,
  Xn as b,
  Yn as c,
  Wt as d,
  Gt as e,
  Jn as f,
  Oe as g,
  Kn as h,
  an as i,
  Wn as j,
  Qn as k,
  Zn as l,
  es as m,
  ts as n,
  ss as o,
  rs as p,
  as as q
};
