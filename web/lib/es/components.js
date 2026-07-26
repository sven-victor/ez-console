import { j as e } from "./vendor.js";
import { Navigate as je, useNavigate as $e } from "react-router-dom";
import { u as Ie, a as ue, b as Te, c as Ue, d as qe } from "./contexts.js";
import { g as Ye, i as Xe, f as We } from "./base.js";
import { Spin as me, Result as ie, Dropdown as Ae, Avatar as Ke, Upload as Ge, Modal as J, Popover as Je, List as G, Image as Qe, Divider as Le, Skeleton as Ze, Progress as et, Typography as pe, Button as v, Tag as q, Tooltip as oe, Popconfirm as le, Space as L, Input as C, Table as fe, App as Y, Form as w, Alert as te, Segmented as we, Steps as tt, QRCode as st, Empty as Fe, Card as ce, Row as nt, Col as $, Select as de, DatePicker as rt } from "antd";
import { useTranslation as k } from "react-i18next";
import { createStyles as Q } from "antd-style";
import * as at from "@ant-design/icons";
import { UploadOutlined as it, CheckOutlined as ot, TeamOutlined as lt, UnorderedListOutlined as ct, DownloadOutlined as dt, MoreOutlined as ut, PlusOutlined as mt, ClockCircleFilled as pt, MailOutlined as ft, EyeOutlined as Pe, EyeInvisibleOutlined as ht, LaptopOutlined as gt, EnvironmentOutlined as xt, GlobalOutlined as yt, ClockCircleOutlined as jt, SearchOutlined as wt } from "@ant-design/icons";
import vt, { useState as g, useEffect as _, useCallback as U, useRef as se, Suspense as bt, forwardRef as St, useImperativeHandle as kt } from "react";
import E from "classnames";
import { a as S } from "./index.js";
import { useRequest as F } from "ahooks";
import { createPortal as Ct } from "react-dom";
import { b as ne, A as It } from "./client.js";
import Tt from "antd-img-crop";
import At from "react-infinite-scroll-component";
import { isString as Lt } from "lodash-es";
const ve = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(me, { size: "large" }) }), fs = ({
  element: t,
  requiredPermission: s,
  requiredPermissions: a
}) => {
  const { t: n } = k(), { user: r, loading: o, error: i } = Ie(), { hasPermission: d, hasAllPermissions: h } = ue();
  return o ? /* @__PURE__ */ e.jsx(ve, {}) : i ? i.code === "E4011" ? /* @__PURE__ */ e.jsx(ve, {}) : /* @__PURE__ */ e.jsx(
    ie,
    {
      status: "500",
      title: "500",
      subTitle: n("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (i == null ? void 0 : i.message) || i })
    }
  ) : r ? s && !d(s) ? /* @__PURE__ */ e.jsx(je, { to: "/forbidden", replace: !0 }) : a && !h(a) ? /* @__PURE__ */ e.jsx(je, { to: "/forbidden", replace: !0 }) : t : (window.location.href = Ye("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Ft = Q(({ token: t, css: s }) => ({
  container: s`
      ${s`
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
})), he = ({
  overlayClassName: t,
  overlay: s,
  hidden: a,
  children: n,
  ...r
}) => {
  const { styles: o } = Ft();
  return a ? /* @__PURE__ */ e.jsx(e.Fragment, {}) : /* @__PURE__ */ e.jsx(
    Ae,
    {
      popupRender: s,
      overlayClassName: E(o.container, t),
      ...r,
      children: /* @__PURE__ */ e.jsx("span", { className: o.iconStyle, children: n })
    }
  );
}, Pt = () => /* @__PURE__ */ e.jsxs(
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
), zt = Q(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), Et = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], hs = ({
  transformLangConfig: t = (a) => a,
  className: s
}) => {
  const { i18n: a } = k(), { styles: n } = zt(), r = (i) => {
    a.changeLanguage(i);
  }, o = {
    selectedKeys: [a.language],
    onClick: (i) => {
      r(i.key);
    },
    items: t(Et).map((i) => ({
      key: i.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (i == null ? void 0 : i.label) || "en-US", className: n.menuItemIconStyle, children: (i == null ? void 0 : i.icon) || "🌐" }),
        (i == null ? void 0 : i.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    he,
    {
      className: s,
      menu: o,
      children: /* @__PURE__ */ e.jsx(Pt, {})
    }
  );
}, Mt = Q(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), ge = (t) => Lt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? ne.endsWith("/") ? ne + `files/${t}` : ne + `/files/${t}` : t, gs = ({ src: t, fallback: s, ...a }) => /* @__PURE__ */ e.jsx(Ke, { src: ge(t), icon: s, ...a }), Dt = ({ onChange: t, shape: s = "square" }) => {
  const [a, n] = g([]), { styles: r } = Mt(), [o, i] = g(!1), [d, h] = g(!0), [u, m] = g(0), { run: p, loading: l } = F(() => S.base.listFiles({ current: u + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: y }) => {
      console.log(y), n([...a, ...y]), h(y.length === 40), m(u + 1);
    }
  }), c = () => {
    h(!0), m(0), n([]);
  };
  return /* @__PURE__ */ e.jsx(
    Je,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (y) => {
        i(y), y ? p() : c();
      },
      open: o,
      content: /* @__PURE__ */ e.jsx("div", { style: { width: 360, height: 200 }, children: /* @__PURE__ */ e.jsx(
        "div",
        {
          id: "iconsScrollableDiv",
          style: {
            height: "100%",
            overflow: "auto"
          },
          children: /* @__PURE__ */ e.jsx(
            At,
            {
              dataLength: a.length,
              next: () => {
                p();
              },
              hasMore: d,
              loader: /* @__PURE__ */ e.jsx(Ze, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(Le, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                G,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: a,
                  style: { margin: "0 8px" },
                  loading: l,
                  renderItem: ({ id: y }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: r.avatarItem,
                      onClick: (z) => {
                        z.stopPropagation(), t == null || t(y), i(!1), c();
                      },
                      children: /* @__PURE__ */ e.jsx(Qe, { src: ge(y), placeholder: /* @__PURE__ */ e.jsx(me, { size: "default" }), preview: !1 })
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
        it,
        {
          shape: s,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, _t = ({ value: t, onChange: s, shape: a, ...n }) => {
  const [r, o] = g(void 0), [i, d] = g(!1), [h, u] = g(void 0), m = async (p) => {
    d(!0), u(p.url ?? p.preview);
  };
  return _(() => {
    o(t ? {
      uid: t,
      name: t,
      url: ge(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Tt,
      {
        beforeCrop: async (p) => {
          if (p.type === "image/svg+xml") {
            const l = await S.base.uploadFile({ type: "avatar" }, p);
            return l.length > 0 && (s == null || s(l[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          Ge,
          {
            customRequest: async (p) => {
              var c, y;
              const l = await S.base.uploadFile({ type: "avatar", access: "public" }, p.file);
              l.length > 0 ? ((c = p.onSuccess) == null || c.call(p, l[0].id), s == null || s(l[0].id)) : (y = p.onError) == null || y.call(p, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: m,
            maxCount: 1,
            onChange: ({ file: p }) => {
              switch (p.status) {
                case "removed":
                  s == null || s(void 0);
                  break;
                case "done":
                  break;
                default:
                  o(p);
                  break;
              }
            },
            fileList: r ? [r] : [],
            ...n,
            children: r ? void 0 : /* @__PURE__ */ e.jsx(Dt, { shape: a, onChange: s })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(J, { open: i, footer: null, onCancel: () => d(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: h }) })
  ] });
}, xs = ({ className: t }) => {
  const { t: s } = k("common"), { user: a } = Ie(), { currentOrgId: n, setCurrentOrgId: r } = Te(), o = (a == null ? void 0 : a.organizations) || [], i = (m) => {
    r(m), window.location.reload();
  };
  if (o.length === 0)
    return null;
  const d = o.find((m) => m.id === n), h = d ? d.name : s("organization.global", { defaultValue: "Global" }), u = [
    ...o.map((m) => ({
      key: m.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: m.name }),
        n === m.id && /* @__PURE__ */ e.jsx(ot, {})
      ] }),
      onClick: () => i(m.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    he,
    {
      className: t,
      menu: {
        items: u,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(lt, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: h })
      ]
    }
  );
}, Vt = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, ys = ({ className: t }) => {
  const { t: s } = k("task"), a = $e(), { user: n } = Ue(), { tasksDropdownOpen: r, setTasksDropdownOpen: o, tasks: i, setTasks: d } = Te(), { runAsync: h, loading: u } = F(async () => S.tasks.listUserTasks({}), {
    onSuccess: (l) => {
      Xe(i, l, (c, y) => c.id === y.id && c.status === y.status && c.progress === y.progress) || d(l);
    },
    pollingInterval: r ? 3e3 : 6e4,
    ready: !!n,
    refreshDeps: [n]
  });
  _(() => {
    r && h();
  }, [r]);
  const m = async (l) => {
    const c = await S.base.downloadFile({ fileKey: l }, { params: { method: "sign" } }), y = `/api/files/${l}?signature=${c.signature}&expires=${c.expires}`;
    window.open(y, "_blank");
  }, p = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      G,
      {
        size: "small",
        dataSource: i,
        loading: u,
        renderItem: (l) => /* @__PURE__ */ e.jsx(
          G.Item,
          {
            extra: /* @__PURE__ */ e.jsx(q, { color: Vt[l.status], style: { marginLeft: 6 }, children: s(`status.${l.status}`, { defaultValue: l.status }) }),
            actions: [
              l.artifact_file_key && /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx(dt, {}),
                  onClick: () => m(l.artifact_file_key)
                }
              )
            ].filter(Boolean),
            children: /* @__PURE__ */ e.jsx(
              G.Item.Meta,
              {
                title: /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13 }, children: /* @__PURE__ */ e.jsxs(pe.Text, { ellipsis: { tooltip: !0 }, children: [
                  s(`type.${l.type}`, { defaultValue: l.type }),
                  " ",
                  l.artifact_file_name && `- ${l.artifact_file_name}`
                ] }) }),
                description: (l.status === "running" || l.status === "pending") && /* @__PURE__ */ e.jsx(et, { percent: l.progress ?? 0, size: "small", style: { marginTop: 4 } })
              }
            )
          },
          l.id
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(v, { type: "link", size: "small", onClick: () => a("/tasks"), children: s("more", { defaultValue: "More" }) }) })
  ] });
  return !i || i.length === 0 ? null : /* @__PURE__ */ e.jsxs(he, { className: t, overlay: p, placement: "bottomRight", open: r, onOpenChange: o, children: [
    /* @__PURE__ */ e.jsx(ct, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: s("tasks", { defaultValue: "Tasks" }) })
  ] });
}, js = ({
  onResize: t,
  minWidth: s = 300,
  maxWidth: a = window.innerWidth * 0.5
}) => {
  const [n, r] = g(!1), [o, i] = g(!1), d = U((m) => {
    m.preventDefault(), r(!0);
  }, []), h = U(
    (m) => {
      if (!n) return;
      const p = window.innerWidth - m.clientX, l = Math.max(s, Math.min(a, p));
      t(l);
    },
    [n, s, a, t]
  ), u = U(() => {
    r(!1);
  }, []);
  return _(() => {
    if (n)
      return document.addEventListener("mousemove", h), document.addEventListener("mouseup", u), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", u), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [n, h, u]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: d,
      onMouseEnter: () => i(!0),
      onMouseLeave: () => i(!1),
      style: {
        width: "8px",
        height: "100vh",
        cursor: "col-resize",
        position: "relative",
        flexShrink: 0,
        transition: n ? "none" : "background-color 0.2s ease",
        backgroundColor: n ? "#1890ff" : o ? "#bfbfbf" : "#e8e8e8",
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
            backgroundColor: n || o ? "#fff" : "#999",
            opacity: n || o ? 1 : 0.5,
            transition: "opacity 0.2s ease",
            pointerEvents: "none"
          }
        }
      )
    }
  );
}, B = 40, Rt = 28, Bt = 6, ze = "ai-chat-float-pos", Ot = Q(({ token: t, css: s }) => ({
  root: s`
    position: fixed;
    z-index: 1050;
    width: ${B}px;
    height: ${B}px;
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
  dragging: s`
    transition: none;
    cursor: grabbing;
    z-index: 1100;
  `,
  docked: s`
    &:hover,
    &:focus-visible {
      transform: translate(0, 0) rotate(0deg) !important;
    }
  `,
  dockLeft: s`
    transform: translateX(calc(-30% - 2px)) rotate(32deg);
  `,
  dockRight: s`
    transform: translateX(calc(30% + 2px)) rotate(-32deg);
  `,
  dockTop: s`
    transform: translateY(calc(-40% - 2px)) rotate(180deg);
  `,
  dockBottom: s`
    transform: translateY(calc(30% + 2px)) rotate(0deg);
  `,
  body: s`
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
  robot: s`
    width: 32px;
    height: 32px;
    display: block;
    padding-bottom: 5px;
    overflow: visible;
  `,
  eye: s`
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
function A(t, s, a) {
  return Math.min(Math.max(t, s), a);
}
function M() {
  return Math.max(0, window.innerWidth - B);
}
function D() {
  return Math.max(0, window.innerHeight - B);
}
function re() {
  const t = M(), s = D();
  return {
    rx: t > 0 ? A((t - 24) / t, 0, 1) : 1,
    ry: s > 0 ? A((s - 24) / s, 0, 1) : 1,
    edge: null
  };
}
function Ee(t, s, a) {
  let n = A(t, 0, M()), r = A(s, 0, D());
  return a === "left" && (n = 0), a === "right" && (n = M()), a === "top" && (r = 0), a === "bottom" && (r = D()), { x: n, y: r, edge: a };
}
function Me(t) {
  const s = M(), a = D();
  return {
    rx: s > 0 ? A(t.x / s, 0, 1) : 0,
    ry: a > 0 ? A(t.y / a, 0, 1) : 0,
    edge: t.edge
  };
}
function be(t) {
  return Ee(t.rx * M(), t.ry * D(), t.edge);
}
function Nt() {
  try {
    const t = localStorage.getItem(ze);
    if (!t) return re();
    const s = JSON.parse(t);
    return typeof s.rx == "number" && typeof s.ry == "number" ? {
      rx: A(s.rx, 0, 1),
      ry: A(s.ry, 0, 1),
      edge: s.edge ?? null
    } : typeof s.x == "number" && typeof s.y == "number" ? Me({
      x: A(s.x, 0, M()),
      y: A(s.y, 0, D()),
      edge: s.edge ?? null
    }) : re();
  } catch {
    return re();
  }
}
function Se(t) {
  localStorage.setItem(ze, JSON.stringify(t));
}
function Ht(t, s) {
  const a = t, n = window.innerWidth - (t + B), r = s, o = window.innerHeight - (s + B), i = Math.min(a, n, r, o);
  return i > Rt ? null : i === a ? "left" : i === n ? "right" : i === r ? "top" : "bottom";
}
const $t = ({
  className: t,
  eyeClassName: s
}) => /* @__PURE__ */ e.jsxs("svg", { className: t, viewBox: "0 0 64 64", "aria-hidden": !0, children: [
  /* @__PURE__ */ e.jsx("circle", { cx: "32", cy: "12", r: "3.2", fill: "rgba(255,255,255,0.9)" }),
  /* @__PURE__ */ e.jsx("rect", { x: "30.4", y: "14", width: "3.2", height: "7", rx: "1.4", fill: "rgba(255,255,255,0.85)" }),
  /* @__PURE__ */ e.jsx("rect", { x: "10", y: "22", width: "44", height: "34", rx: "14", fill: "rgba(255,255,255,0.95)" }),
  /* @__PURE__ */ e.jsx("rect", { x: "16", y: "28", width: "32", height: "18", rx: "9", fill: "rgba(0,0,0,0.12)" }),
  /* @__PURE__ */ e.jsx("ellipse", { className: s, cx: "25", cy: "37", rx: "4.2", ry: "5", fill: "#1f2937" }),
  /* @__PURE__ */ e.jsx("ellipse", { className: s, cx: "39", cy: "37", rx: "4.2", ry: "5", fill: "#1f2937" }),
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
] }), ws = () => {
  const { styles: t } = Ot(), { setVisible: s, visible: a } = qe(), { t: n } = k("ai"), r = se(
    typeof window > "u" ? { rx: 1, ry: 1, edge: null } : Nt()
  ), [o, i] = g(
    () => typeof window > "u" ? { x: 0, y: 0, edge: null } : be(r.current)
  ), [d, h] = g(!1), u = se(null), m = se(o);
  m.current = o;
  const p = !d && o.edge === "left" ? t.dockLeft : !d && o.edge === "right" ? t.dockRight : !d && o.edge === "top" ? t.dockTop : !d && o.edge === "bottom" ? t.dockBottom : void 0, l = U((x) => {
    const f = Me(x);
    r.current = f, Se(f), i(x);
  }, []), c = U(() => {
    u.current || i(be(r.current));
  }, []);
  _(() => (Se(r.current), window.addEventListener("resize", c), () => window.removeEventListener("resize", c)), [c]);
  const y = (x) => {
    x.button === 0 && (x.currentTarget.setPointerCapture(x.pointerId), u.current = {
      pointerId: x.pointerId,
      startX: x.clientX,
      startY: x.clientY,
      originX: m.current.x,
      originY: m.current.y,
      moved: !1
    }, h(!0));
  }, z = (x) => {
    const f = u.current;
    if (!f || f.pointerId !== x.pointerId) return;
    const b = x.clientX - f.startX, I = x.clientY - f.startY;
    !f.moved && Math.hypot(b, I) > Bt && (f.moved = !0), i({
      x: A(f.originX + b, 0, M()),
      y: A(f.originY + I, 0, D()),
      edge: null
    });
  }, P = (x) => {
    const f = u.current;
    if (!f || f.pointerId !== x.pointerId) return;
    try {
      x.currentTarget.releasePointerCapture(x.pointerId);
    } catch {
    }
    const b = !f.moved;
    if (u.current = null, h(!1), b) {
      s(!0);
      return;
    }
    const I = Ht(m.current.x, m.current.y);
    l(Ee(m.current.x, m.current.y, I));
  };
  return a ? null : Ct(
    /* @__PURE__ */ e.jsx(
      oe,
      {
        title: n("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
        placement: "left",
        mouseEnterDelay: 0.4,
        open: d ? !1 : void 0,
        children: /* @__PURE__ */ e.jsx(
          "button",
          {
            type: "button",
            "aria-label": n("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
            className: E(
              "ai-chat-float-button",
              t.root,
              d && t.dragging,
              !d && o.edge && t.docked,
              p
            ),
            style: { left: o.x, top: o.y },
            onPointerDown: y,
            onPointerMove: z,
            onPointerUp: P,
            onPointerCancel: P,
            children: /* @__PURE__ */ e.jsx("span", { className: t.body, children: /* @__PURE__ */ e.jsx($t, { className: t.robot, eyeClassName: t.eye }) })
          }
        )
      }
    ),
    document.body
  );
}, De = ({
  permission: t,
  permissions: s = [],
  checkAll: a = !1,
  fallback: n = null,
  children: r
}) => {
  const { hasPermission: o, hasAnyPermission: i, hasAllPermissions: d, isAdmin: h, loading: u } = ue();
  return u ? null : h ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : t ? o(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : s.length > 0 ? (a ? d(s) : i(s)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: r });
}, vs = ({
  fallback: t = null,
  children: s
}) => {
  const { isAdmin: a, loading: n } = ue();
  return n ? null : a ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, ke = (t) => {
  const [s, a] = g(!1), { permission: n, icon: r, tooltip: o, onClick: i, confirm: d, label: h, ...u } = t, m = !!u.disabled, p = i ? async () => {
    a(!0);
    try {
      await i();
    } finally {
      a(!1);
    }
  } : void 0;
  let l = /* @__PURE__ */ e.jsx(
    v,
    {
      type: "link",
      size: "small",
      loading: s,
      icon: r,
      onClick: d && !m ? void 0 : p,
      ...u,
      children: h && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: h })
    }
  );
  if (d && !m) {
    const c = async () => {
      d.onConfirm ? await d.onConfirm() : p && await p();
    };
    l = /* @__PURE__ */ e.jsx(
      le,
      {
        title: d.title,
        description: d.description,
        onConfirm: c,
        okText: d.okText,
        cancelText: d.cancelText,
        children: l
      }
    );
  }
  return o && (l = m ? /* @__PURE__ */ e.jsx(oe, { title: o, children: /* @__PURE__ */ e.jsx("span", { style: { display: "inline-block", cursor: "not-allowed" }, children: l }) }) : /* @__PURE__ */ e.jsx(oe, { title: o, children: l })), n && (l = /* @__PURE__ */ e.jsx(De, { permission: n, children: l })), l;
}, bs = ({ actions: t, maxVisibleItems: s }) => {
  const a = t.filter((i) => !i.hidden);
  if (!s || a.length <= s)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: a.map(({ key: i, ...d }) => /* @__PURE__ */ e.jsx(ke, { ...d }, i)) });
  const n = a.slice(0, s - 1), o = a.slice(s - 1).map((i) => {
    const { key: d, label: h, icon: u, permission: m, onClick: p, confirm: l, disabled: c, tooltip: y } = i, P = {
      key: d,
      label: h,
      icon: u,
      disabled: c,
      onClick: async () => {
        l ? J.confirm({
          title: l.title,
          content: l.description,
          onOk: l.onConfirm || p,
          okText: l.okText,
          cancelText: l.cancelText
        }) : p && await p();
      }
    };
    return m ? {
      ...P,
      label: /* @__PURE__ */ e.jsx(De, { permission: m, children: /* @__PURE__ */ e.jsx("span", { children: h ?? y }) })
    } : P;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    n.map(({ key: i, ...d }) => /* @__PURE__ */ e.jsx(ke, { ...d }, i)),
    /* @__PURE__ */ e.jsx(Ae, { menu: { items: o }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(v, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(ut, {}) }) })
  ] });
}, Ut = at, qt = (t) => Ut[t], Ss = ({ iconName: t }) => {
  if (!t)
    return null;
  const s = qt(t);
  return s ? /* @__PURE__ */ e.jsx(bt, { fallback: null, children: /* @__PURE__ */ e.jsx(s, {}) }) : null;
}, ks = ({ onChange: t }) => {
  const [s, a] = g(""), [n, r] = g("");
  return /* @__PURE__ */ e.jsxs(L.Compact, { children: [
    /* @__PURE__ */ e.jsx(C, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (o) => a(o.target.value) }),
    /* @__PURE__ */ e.jsx(C, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(C, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (o) => r(o.target.value) }),
    /* @__PURE__ */ e.jsx(v, { type: "primary", icon: /* @__PURE__ */ e.jsx(mt, {}), onClick: () => {
      t(s, n);
    } })
  ] });
}, Yt = ({ request: t, tableRef: s, ...a }, n) => {
  const [r, o] = g({
    current: 1,
    pageSize: 10
  }), [i, d] = g(0), { data: h, loading: u, refresh: m } = F(async () => {
    const p = await t({
      current: r.current,
      page_size: r.pageSize
    });
    return d(p.total), p.data;
  }, {
    refreshDeps: [r]
  });
  return kt(n, () => ({
    reload: () => {
      m();
    }
  })), /* @__PURE__ */ e.jsx(
    fe,
    {
      rowKey: "id",
      loading: u,
      dataSource: h ?? [],
      pagination: {
        ...r,
        total: i,
        onChange: (p, l) => {
          o({ current: p, pageSize: l });
        }
      },
      ...a,
      ref: s
    }
  );
}, Cs = ({ actionRef: t, ...s }) => {
  const [a, n] = g();
  return _(() => {
    n(St(Yt));
  }, []), a ? /* @__PURE__ */ e.jsx(a, { ...s, ref: t }) : null;
}, Is = ({ className: t, onSuccess: s, token: a }) => {
  const { message: n } = Y.useApp(), { t: r } = k("authorization"), { t: o } = k("common"), [i] = w.useForm(), { run: d, loading: h } = F(async (u) => S.authorization.changePassword(u, a ? { headers: { Authorization: `Bearer ${a}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      n.success(r("user.passwordChanged")), i.resetFields(), s == null || s();
    },
    onError: (u) => {
      if (u instanceof It) {
        const m = u.code ?? "normal";
        n.error(r(`user.passwordChangeFailed.${m}`, { error: u.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        n.error(r("user.passwordChangeFailed.normal", { error: u.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", u);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    w,
    {
      form: i,
      layout: "vertical",
      onFinish: d,
      style: { maxWidth: 500, margin: "0 auto" },
      className: E("profile-password", t),
      children: [
        /* @__PURE__ */ e.jsx(
          w.Item,
          {
            name: "old_password",
            label: r("user.oldPassword"),
            rules: [{ required: !0, message: r("validation.oldPasswordRequired") }],
            className: E("profile-password-item", "profile-password-item-old-password"),
            children: /* @__PURE__ */ e.jsx(C.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          w.Item,
          {
            name: "new_password",
            label: r("user.newPassword"),
            rules: [
              { required: !0, message: r("validation.newPasswordRequired") },
              { min: 8, message: r("validation.passwordMinLength") }
            ],
            className: E("profile-password-item", "profile-password-item-new-password"),
            children: /* @__PURE__ */ e.jsx(C.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          w.Item,
          {
            name: "confirm_password",
            label: r("user.confirmPassword"),
            className: E("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: r("validation.confirmPasswordRequired") },
              ({ getFieldValue: u }) => ({
                validator(m, p) {
                  return !p || u("new_password") === p ? Promise.resolve() : Promise.reject(new Error(r("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(C.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(w.Item, { className: E("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: h, children: o("save") }) })
      ]
    }
  );
}, Ts = ({ user: t, onSuccess: s }) => {
  const { message: a } = Y.useApp(), { t: n } = k("authorization"), { t: r } = k("common"), [o] = w.useForm(), [i, d] = g(!1);
  vt.useEffect(() => {
    t && o.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, o]);
  const h = async (u) => {
    try {
      d(!0), await S.authorization.updateCurrentUser(u), a.success(r("updateSuccess")), s();
    } catch (m) {
      a.error(r("updateFailed")), console.error("Failed to update user information:", m);
    } finally {
      d(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }),
      (t == null ? void 0 : t.roles) && t.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        n("user.roles"),
        ": ",
        t.roles.map((u) => u.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      w,
      {
        form: o,
        layout: "vertical",
        onFinish: h,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            w.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(_t, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            w.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(C, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w.Item,
            {
              name: "email",
              label: n("user.email"),
              rules: [
                { required: !0, message: n("validation.emailRequired") },
                { type: "email", message: n("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(C, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            w.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(C, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            w.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(C, {})
            }
          ),
          /* @__PURE__ */ e.jsx(w.Item, { children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: i, children: r("save") }) })
        ]
      }
    )
  ] });
}, As = ({ user: t, onSuccess: s }) => {
  const { message: a } = Y.useApp(), { t: n } = k("authorization"), { t: r } = k("common"), [o, i] = g(0), [d, h] = g(!1), [u, m] = g(!0), [p, l] = g(""), [c, y] = g("totp"), [z, P] = g(!1), [x, f] = g("password"), [b, I] = g(""), [V, O] = g(""), [Z, X] = g(""), [xe, ee] = g(""), [N, W] = g(0);
  _(() => {
    if (N <= 0) return;
    const j = setTimeout(() => W((T) => T - 1), 1e3);
    return () => clearTimeout(j);
  }, [N]);
  const { run: _e, data: H = { secret: "", qr_code: "", token: void 0 } } = F(
    () => S.authorization.enableMfa({ mfa_type: c }),
    {
      manual: !0,
      onSuccess: () => {
        i(1);
      },
      onBefore: () => {
        h(!0);
      },
      onFinally: () => {
        h(!1);
      }
    }
  ), Ve = async () => {
    if (!p) {
      a.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const j = {
      code: p,
      mfa_type: c
    };
    "token" in H && (j.token = H.token);
    try {
      h(!0), await S.authorization.verifyAndActivateMfa(j), a.success(n("mfa.enableSuccess")), i(2), s();
    } catch (T) {
      a.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", T);
    } finally {
      h(!1);
    }
  }, ye = () => {
    P(!1), f("password"), I(""), O(""), X(""), ee(""), W(0);
  }, { runAsync: Re, loading: Be } = F(
    () => S.authorization.sendDisableMfaCode(),
    { manual: !0 }
  ), Oe = async () => {
    try {
      const j = await Re();
      ee((j == null ? void 0 : j.token) ?? ""), X(""), W(60), a.success(n("mfa.codeSent", { defaultValue: "Verification code has been sent to your email" }));
    } catch (j) {
      a.error(j instanceof Error ? j.message : r("operationFailed")), console.error("Failed to send disable-MFA code:", j);
    }
  }, K = async () => {
    if (x === "email") {
      if (!xe) {
        a.warning(n("mfa.sendCodeFirst", { defaultValue: "Please send the verification code first" }));
        return;
      }
      if (!Z) {
        a.warning(n("mfa.enterVerificationCode"));
        return;
      }
    } else if (x === "totp") {
      if (!V) {
        a.warning(n("mfa.enterVerificationCode"));
        return;
      }
    } else if (!b) {
      a.warning(n("mfa.enterPassword", { defaultValue: "Enter your password" }));
      return;
    }
    const j = { password: "", mfa_code: "", email_code: "", email_token: "" };
    x === "email" ? (j.email_code = Z, j.email_token = xe) : x === "totp" ? j.mfa_code = V : j.password = b;
    try {
      h(!0), await S.authorization.disableMfa(j), a.success(n("mfa.disableSuccess")), ye(), s();
    } catch (T) {
      a.error(T instanceof Error ? T.message : r("operationFailed")), console.error("Failed to disable MFA:", T), x === "email" && (ee(""), X(""), W(0));
    } finally {
      h(!1);
    }
  }, Ne = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        ie,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(v, { danger: !0, onClick: () => P(!0), children: n("mfa.disable") })
        }
      );
    const j = () => {
      var T;
      switch (o) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              te,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: n("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: n(c === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
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
                onClick: _e,
                loading: d,
                children: n("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              te,
              {
                message: n("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: c === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: c === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(st, { value: H.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: c === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: c === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: u ? "*".repeat(((T = H.secret) == null ? void 0 : T.length) ?? 0) : H.secret }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "link",
                  onClick: () => m(!u),
                  icon: u ? /* @__PURE__ */ e.jsx(Pe, {}) : /* @__PURE__ */ e.jsx(ht, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              C,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: p,
                onChange: (He) => l(He.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(L, { children: [
              /* @__PURE__ */ e.jsx(v, { onClick: () => i(0), children: r("previous") }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "primary",
                  onClick: Ve,
                  loading: d,
                  children: r("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            ie,
            {
              status: "success",
              title: n("mfa.setupSuccess"),
              subTitle: n("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(v, { type: "primary", onClick: () => i(0), children: r("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: o === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          we,
          {
            defaultValue: "totp",
            onChange: (T) => {
              y(T), i(0);
            },
            value: c,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(pt, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(ft, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(Le, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        tt,
        {
          current: o,
          items: [
            { title: n(c === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(c === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(c === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(c === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(c === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(c === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      j()
    ] });
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 8 }, children: [
    Ne(),
    /* @__PURE__ */ e.jsxs(
      J,
      {
        title: n("mfa.confirmDisable"),
        open: z,
        onOk: K,
        okText: n("mfa.disable"),
        okButtonProps: { danger: !0, loading: d },
        onCancel: ye,
        destroyOnHidden: !0,
        children: [
          /* @__PURE__ */ e.jsx(
            te,
            {
              message: n("mfa.disableWarning"),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          /* @__PURE__ */ e.jsx("p", { children: n("mfa.disableVerifyDescription", { defaultValue: "For security reasons, please verify your identity with your password or a verification code." }) }),
          /* @__PURE__ */ e.jsx(
            we,
            {
              block: !0,
              value: x,
              onChange: (j) => f(j),
              options: [
                { value: "password", label: n("mfa.methodPassword", { defaultValue: "Password" }) },
                ...(t == null ? void 0 : t.mfa_type) === "totp" ? [{ value: "totp", label: n("mfa.totp", { defaultValue: "TOTP" }) }] : [],
                { value: "email", label: n("mfa.methodEmailCode", { defaultValue: "Email code" }) }
              ],
              style: { marginBottom: 16 }
            }
          ),
          x === "password" && /* @__PURE__ */ e.jsx(
            C.Password,
            {
              placeholder: n("mfa.enterPassword", { defaultValue: "Enter your password" }),
              autoComplete: "current-password",
              value: b,
              onChange: (j) => I(j.target.value),
              onPressEnter: K
            }
          ),
          x === "totp" && /* @__PURE__ */ e.jsx(
            C,
            {
              placeholder: n("mfa.enterTotpCode", { defaultValue: "Enter the 6-digit code from your authenticator app" }),
              maxLength: 6,
              value: V,
              onChange: (j) => O(j.target.value),
              onPressEnter: K
            }
          ),
          x === "email" && /* @__PURE__ */ e.jsxs(L.Compact, { style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(
              C,
              {
                placeholder: n("mfa.enterEmailCode", { defaultValue: "Enter the 6-digit code sent to your email" }),
                maxLength: 6,
                value: Z,
                onChange: (j) => X(j.target.value),
                onPressEnter: K
              }
            ),
            /* @__PURE__ */ e.jsx(
              v,
              {
                onClick: Oe,
                loading: Be,
                disabled: N > 0,
                children: N > 0 ? n("mfa.resendIn", { defaultValue: "Resend ({{seconds}}s)", seconds: N }) : n("mfa.sendCode", { defaultValue: "Send code" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}, { Text: ae } = pe, Ls = () => {
  const { message: t } = Y.useApp(), { t: s } = k("authorization"), { t: a } = k("common"), [n, r] = g(null), [o, i] = g(!1), { data: d = [], loading: h, run: u } = F(() => S.authorization.getUserSessions({}), {
    onError: (c) => {
      t.error(s("session.getSessionsFailed", { error: c, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: m } = F((c) => S.authorization.terminateSession({ id: c }), {
    onSuccess: () => {
      t.success(s("session.terminateSuccess", { defaultValue: "Session terminated successfully" })), u();
    },
    onError: (c) => {
      t.error(s("session.terminateFailed", { error: c, defaultValue: "Failed to terminate session: {{error}}" }));
    },
    onFinally: () => {
      r(null);
    },
    onBefore: ([c]) => {
      r(c);
    },
    manual: !0
  }), { run: p } = F(() => S.authorization.terminateOtherSessions(), {
    onSuccess: () => {
      t.success(s("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" })), u();
    },
    onError: (c) => {
      t.error(s("session.terminateAllFailed", { error: c, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    },
    onFinally: () => {
      i(!1);
    },
    onBefore: () => {
      i(!0);
    },
    manual: !0
  }), l = [
    {
      title: s("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (c, y) => /* @__PURE__ */ e.jsxs(L, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(gt, {}),
          /* @__PURE__ */ e.jsx(ae, { strong: !0, children: c })
        ] }),
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(xt, {}),
          /* @__PURE__ */ e.jsx(ae, { type: "secondary", children: y.location })
        ] })
      ] })
    },
    {
      title: s("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (c) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(yt, {}),
        /* @__PURE__ */ e.jsx("span", { children: c })
      ] })
    },
    {
      title: s("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (c) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(jt, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(c).toLocaleString() })
      ] })
    },
    {
      title: s("session.status"),
      key: "status",
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(q, { color: "green", children: s("session.current") }) : /* @__PURE__ */ e.jsx(q, { color: "blue", children: s("session.active") })
    },
    {
      title: a("actions"),
      key: "action",
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(ae, { type: "secondary", children: s("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        le,
        {
          title: s("session.confirmTerminate"),
          onConfirm: () => m(c.id),
          okText: a("confirm"),
          cancelText: a("cancel"),
          children: /* @__PURE__ */ e.jsx(
            v,
            {
              type: "link",
              danger: !0,
              loading: n === c.id,
              children: s("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(L, { direction: "vertical", style: { padding: 8, width: "100%" }, children: [
    /* @__PURE__ */ e.jsxs(L, { direction: "horizontal", style: { float: "right" }, children: [
      d.length > 1 && /* @__PURE__ */ e.jsx(
        le,
        {
          title: s("session.confirmTerminateAll"),
          onConfirm: p,
          okText: a("confirm"),
          cancelText: a("cancel"),
          children: /* @__PURE__ */ e.jsx(
            v,
            {
              danger: !0,
              loading: o,
              children: s("session.terminateOthers")
            }
          )
        }
      ),
      /* @__PURE__ */ e.jsx(v, { onClick: () => u(), loading: h, children: a("refresh") })
    ] }),
    !h && d.length === 0 ? /* @__PURE__ */ e.jsx(Fe, { description: s("session.noSessions") }) : /* @__PURE__ */ e.jsx(
      fe,
      {
        columns: l,
        dataSource: d,
        rowKey: "id",
        loading: h,
        pagination: !1
      }
    )
  ] });
}, { RangePicker: Xt } = rt, { Option: R } = de, Wt = (t) => t || "N/A", Kt = (t, s) => t === "success" ? /* @__PURE__ */ e.jsx(q, { color: "success", children: s("statuses.success") }) : /* @__PURE__ */ e.jsx(q, { color: "error", children: s("statuses.failed") }), Fs = ({
  userId: t,
  request: s = (n) => t ? S.authorization.getUserLogs({ id: t, ...n }) : S.authorization.getCurrentUserLogs(n),
  columnsFilter: a = (n) => n
}) => {
  const { message: n } = Y.useApp(), { t: r } = k("authorization"), { t: o } = k("common"), [i, d] = g({
    current: 1,
    pageSize: 10,
    total: 0
  }), [h, u] = g({}), [m] = w.useForm(), { loading: p, run: l, data: { data: c } = {} } = F(async (f = h, b = 1, I = 10) => s({
    ...f,
    current: b ?? 1,
    page_size: I ?? 10
  }), {
    onError(f) {
      n.error(r("auditLog.fetchFailed", { error: f }));
    },
    onSuccess({ total: f }) {
      d({
        ...i,
        total: f
      });
    }
  });
  _(() => {
    l(h, 1, i.pageSize);
  }, []);
  const y = (f) => {
    d({
      ...i,
      current: f.current || 1,
      pageSize: f.pageSize || 10
    }), l({}, f.current, f.pageSize);
  }, z = (f) => {
    var b, I, V, O;
    l({
      ...f,
      start_time: (I = (b = f.dateRange) == null ? void 0 : b[0]) == null ? void 0 : I.toISOString(),
      end_time: (O = (V = f.dateRange) == null ? void 0 : V[1]) == null ? void 0 : O.toISOString()
    }, 1, i.pageSize);
  }, P = () => {
    m.resetFields(), u({}), d({ ...i, current: 1 }), l({}, 1, i.pageSize);
  }, x = [
    {
      title: r("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (f) => We(f)
    },
    {
      title: r("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (f, b) => f ? r(`action.${f.replace(/:/g, ".")}`, { defaultValue: r(`permission.title.${f.replace(/:/g, ".")}`, { defaultValue: b.action_name }) }) : b.action_name ?? b.action
    },
    {
      title: r("auditLog.user_agent"),
      dataIndex: "user_agent",
      key: "user_agent"
    },
    {
      title: r("auditLog.ip"),
      dataIndex: "ip",
      key: "ip",
      render: (f) => Wt(f)
    },
    {
      title: r("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (f) => Kt(f, r)
    },
    {
      title: r("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (f) => /* @__PURE__ */ e.jsx(v, { type: "link", icon: /* @__PURE__ */ e.jsx(Pe, {}), onClick: () => {
        J.info({
          title: r("auditLog.details"),
          content: JSON.stringify(f)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ce, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      w,
      {
        form: m,
        layout: "horizontal",
        onFinish: z,
        initialValues: h,
        children: /* @__PURE__ */ e.jsxs(nt, { gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx($, { xxl: 6, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(w.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(C, { placeholder: r("auditLog.searchPlaceholder") }) }) }),
          /* @__PURE__ */ e.jsx($, { xxl: 4, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(w.Item, { name: "action", noStyle: !0, children: /* @__PURE__ */ e.jsxs(de, { allowClear: !0, placeholder: r("auditLog.selectAction"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(R, { value: "login", children: r("actions.login") }),
            /* @__PURE__ */ e.jsx(R, { value: "logout", children: r("actions.logout") }),
            /* @__PURE__ */ e.jsx(R, { value: "password_reset", children: r("actions.passwordReset") }),
            /* @__PURE__ */ e.jsx(R, { value: "mfa_change", children: r("actions.mfaChange") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx($, { xxl: 3, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(w.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(de, { allowClear: !0, placeholder: r("auditLog.selectStatus"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(R, { value: "success", children: r("statuses.success") }),
            /* @__PURE__ */ e.jsx(R, { value: "failed", children: r("statuses.failed") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx($, { xxl: 6, xl: 6, lg: 10, md: 12, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(w.Item, { name: "dateRange", noStyle: !0, children: /* @__PURE__ */ e.jsx(Xt, { style: { width: "100%" } }) }) }),
          /* @__PURE__ */ e.jsx($, { xxl: 5, xl: 24, lg: 14, md: 24, sm: 24, xs: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(L, { children: [
            /* @__PURE__ */ e.jsx(v, { onClick: P, children: o("reset") }),
            /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(wt, {}), children: o("search") })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsx(
      fe,
      {
        rowKey: "id",
        columns: a(x),
        dataSource: c,
        pagination: {
          ...i,
          showSizeChanger: !0,
          showTotal: (f) => o("totalItems", { total: f })
        },
        loading: p,
        onChange: y,
        scroll: { x: "max-content" }
      }
    ) })
  ] });
}, { Text: Ce } = pe, Gt = {
  debug: "default",
  info: "processing",
  warn: "warning",
  error: "error"
}, Ps = ({ taskId: t, poll: s }) => {
  const { t: a } = k("task"), { data: n = [], loading: r } = F(
    () => t ? S.tasks.getTaskLogs({ id: t }) : Promise.reject(new Error("No task id")),
    {
      refreshDeps: [t],
      ready: !!t,
      pollingInterval: s ? 2e3 : 0
    }
  );
  return /* @__PURE__ */ e.jsx(
    ce,
    {
      title: a("logsTitle", { defaultValue: "Task logs" }),
      size: "small",
      style: { marginTop: 16 },
      children: r && !n.length ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 24 }, children: /* @__PURE__ */ e.jsx(me, {}) }) : n.length ? /* @__PURE__ */ e.jsx(
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
          children: n.map((o) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 4 }, children: [
            /* @__PURE__ */ e.jsx(Ce, { type: "secondary", style: { fontSize: 11 }, children: o.created_at }),
            o.level && /* @__PURE__ */ e.jsxs(Ce, { type: Gt[o.level], style: { marginLeft: 8, fontSize: 11 }, children: [
              "[",
              o.level,
              "]"
            ] }),
            /* @__PURE__ */ e.jsx("div", { style: { display: "inline", marginLeft: 8 }, children: o.message })
          ] }, o.id))
        }
      ) : /* @__PURE__ */ e.jsx(Fe, { description: a("noLogs", { defaultValue: "No logs yet." }) })
    }
  );
};
export {
  gs as A,
  Ss as D,
  he as H,
  ve as L,
  xs as O,
  fs as P,
  js as R,
  ys as T,
  Fs as U,
  hs as a,
  bs as b,
  vs as c,
  Et as d,
  _t as e,
  ks as f,
  De as g,
  Cs as h,
  qt as i,
  ws as j,
  Is as k,
  Ts as l,
  As as m,
  Ls as n,
  Ps as o
};
