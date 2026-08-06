import { j as e } from "./vendor.js";
import { Navigate as ye, useNavigate as $e } from "react-router-dom";
import { u as Ce, a as de, b as Ie, c as Ue, d as qe } from "./contexts.js";
import { g as Ye, i as Xe, f as We } from "./base.js";
import { Spin as ue, Result as ae, Dropdown as Te, Avatar as Ke, Upload as Ge, Modal as Ae, Popover as Je, List as J, Image as Qe, Divider as Le, Skeleton as Ze, Progress as et, Typography as me, Button as v, Tag as X, Tooltip as ie, App as N, Popconfirm as oe, Space as F, Input as I, Table as pe, Form as w, Alert as ee, Segmented as je, Steps as tt, QRCode as st, Empty as Fe, Card as le, Row as nt, Col as q, Select as ce, DatePicker as rt } from "antd";
import { useTranslation as C } from "react-i18next";
import { createStyles as Q } from "antd-style";
import * as at from "@ant-design/icons";
import { UploadOutlined as it, CheckOutlined as ot, TeamOutlined as lt, UnorderedListOutlined as ct, DownloadOutlined as dt, MoreOutlined as ut, PlusOutlined as mt, ClockCircleFilled as pt, MailOutlined as ft, EyeOutlined as Pe, EyeInvisibleOutlined as ht, LaptopOutlined as gt, EnvironmentOutlined as xt, GlobalOutlined as yt, ClockCircleOutlined as jt, SearchOutlined as wt } from "@ant-design/icons";
import vt, { useState as g, useEffect as V, useCallback as Y, useRef as te, Suspense as bt, forwardRef as St, useImperativeHandle as kt } from "react";
import M from "classnames";
import { a as S } from "./index.js";
import { useRequest as P } from "ahooks";
import { createPortal as Ct } from "react-dom";
import { b as se, A as It } from "./client.js";
import Tt from "antd-img-crop";
import At from "react-infinite-scroll-component";
import { isString as Lt } from "lodash-es";
const we = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(ue, { size: "large" }) }), fs = ({
  element: s,
  requiredPermission: t,
  requiredPermissions: r
}) => {
  const { t: n } = C(), { user: o, loading: a, error: i } = Ce(), { hasPermission: c, hasAllPermissions: u } = de();
  return a ? /* @__PURE__ */ e.jsx(we, {}) : i ? i.code === "E4011" ? /* @__PURE__ */ e.jsx(we, {}) : /* @__PURE__ */ e.jsx(
    ae,
    {
      status: "500",
      title: "500",
      subTitle: n("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (i == null ? void 0 : i.message) || i })
    }
  ) : o ? t && !c(t) ? /* @__PURE__ */ e.jsx(ye, { to: "/forbidden", replace: !0 }) : r && !u(r) ? /* @__PURE__ */ e.jsx(ye, { to: "/forbidden", replace: !0 }) : s : (window.location.href = Ye("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Ft = Q(({ token: s, css: t }) => ({
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
})), fe = ({
  overlayClassName: s,
  overlay: t,
  hidden: r,
  children: n,
  ...o
}) => {
  const { styles: a } = Ft();
  return r ? /* @__PURE__ */ e.jsx(e.Fragment, {}) : /* @__PURE__ */ e.jsx(
    Te,
    {
      popupRender: t,
      overlayClassName: M(a.container, s),
      ...o,
      children: /* @__PURE__ */ e.jsx("span", { className: a.iconStyle, children: n })
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
  transformLangConfig: s = (r) => r,
  className: t
}) => {
  const { i18n: r } = C(), { styles: n } = zt(), o = (i) => {
    r.changeLanguage(i);
  }, a = {
    selectedKeys: [r.language],
    onClick: (i) => {
      o(i.key);
    },
    items: s(Et).map((i) => ({
      key: i.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (i == null ? void 0 : i.label) || "en-US", className: n.menuItemIconStyle, children: (i == null ? void 0 : i.icon) || "🌐" }),
        (i == null ? void 0 : i.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    fe,
    {
      className: t,
      menu: a,
      children: /* @__PURE__ */ e.jsx(Pt, {})
    }
  );
}, Mt = Q(({ css: s }) => ({
  avatarItem: s`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), he = (s) => Lt(s) && s.match(/^[-_a-zA-Z0-9]+$/) ? se.endsWith("/") ? se + `files/${s}` : se + `/files/${s}` : s, gs = ({ src: s, fallback: t, ...r }) => /* @__PURE__ */ e.jsx(Ke, { src: he(s), icon: t, ...r }), Dt = ({ onChange: s, shape: t = "square" }) => {
  const [r, n] = g([]), { styles: o } = Mt(), [a, i] = g(!1), [c, u] = g(!0), [p, h] = g(0), { run: d, loading: m } = P(() => S.base.listFiles({ current: p + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: x }) => {
      console.log(x), n([...r, ...x]), u(x.length === 40), h(p + 1);
    }
  }), l = () => {
    u(!0), h(0), n([]);
  };
  return /* @__PURE__ */ e.jsx(
    Je,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (x) => {
        i(x), x ? d() : l();
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
            At,
            {
              dataLength: r.length,
              next: () => {
                d();
              },
              hasMore: c,
              loader: /* @__PURE__ */ e.jsx(Ze, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(Le, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                J,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: r,
                  style: { margin: "0 8px" },
                  loading: m,
                  renderItem: ({ id: x }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: o.avatarItem,
                      onClick: (z) => {
                        z.stopPropagation(), s == null || s(x), i(!1), l();
                      },
                      children: /* @__PURE__ */ e.jsx(Qe, { src: he(x), placeholder: /* @__PURE__ */ e.jsx(ue, { size: "default" }), preview: !1 })
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
          shape: t,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, _t = ({ value: s, onChange: t, shape: r, ...n }) => {
  const [o, a] = g(void 0), [i, c] = g(!1), [u, p] = g(void 0), h = async (d) => {
    c(!0), p(d.url ?? d.preview);
  };
  return V(() => {
    a(s ? {
      uid: s,
      name: s,
      url: he(s)
    } : void 0);
  }, [s]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Tt,
      {
        beforeCrop: async (d) => {
          if (d.type === "image/svg+xml") {
            const m = await S.base.uploadFile({ type: "avatar" }, d);
            return m.length > 0 && (t == null || t(m[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          Ge,
          {
            customRequest: async (d) => {
              var l, x;
              const m = await S.base.uploadFile({ type: "avatar", access: "public" }, d.file);
              m.length > 0 ? ((l = d.onSuccess) == null || l.call(d, m[0].id), t == null || t(m[0].id)) : (x = d.onError) == null || x.call(d, new Error("Upload file failed"));
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
            children: o ? void 0 : /* @__PURE__ */ e.jsx(Dt, { shape: r, onChange: t })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(Ae, { open: i, footer: null, onCancel: () => c(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: u }) })
  ] });
}, xs = ({ className: s }) => {
  const { t } = C("common"), { user: r } = Ce(), { currentOrgId: n, setCurrentOrgId: o } = Ie(), a = (r == null ? void 0 : r.organizations) || [], i = (h) => {
    o(h), window.location.reload();
  };
  if (a.length === 0)
    return null;
  const c = a.find((h) => h.id === n), u = c ? c.name : t("organization.global", { defaultValue: "Global" }), p = [
    ...a.map((h) => ({
      key: h.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: h.name }),
        n === h.id && /* @__PURE__ */ e.jsx(ot, {})
      ] }),
      onClick: () => i(h.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    fe,
    {
      className: s,
      menu: {
        items: p,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(lt, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: u })
      ]
    }
  );
}, Vt = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, ys = ({ className: s }) => {
  const { t } = C("task"), r = $e(), { user: n } = Ue(), { tasksDropdownOpen: o, setTasksDropdownOpen: a, tasks: i, setTasks: c } = Ie(), { runAsync: u, loading: p } = P(async () => S.tasks.listUserTasks({}), {
    onSuccess: (m) => {
      Xe(i, m, (l, x) => l.id === x.id && l.status === x.status && l.progress === x.progress) || c(m);
    },
    pollingInterval: o ? 3e3 : 6e4,
    ready: !!n,
    refreshDeps: [n]
  });
  V(() => {
    o && u();
  }, [o]);
  const h = async (m) => {
    const l = await S.base.downloadFile({ fileKey: m }, { params: { method: "sign" } }), x = `/api/files/${m}?signature=${l.signature}&expires=${l.expires}`;
    window.open(x, "_blank");
  }, d = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      J,
      {
        size: "small",
        dataSource: i,
        loading: p,
        renderItem: (m) => /* @__PURE__ */ e.jsx(
          J.Item,
          {
            extra: /* @__PURE__ */ e.jsx(X, { color: Vt[m.status], style: { marginLeft: 6 }, children: t(`status.${m.status}`, { defaultValue: m.status }) }),
            actions: [
              m.artifact_file_key && /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx(dt, {}),
                  onClick: () => h(m.artifact_file_key)
                }
              )
            ].filter(Boolean),
            children: /* @__PURE__ */ e.jsx(
              J.Item.Meta,
              {
                title: /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13 }, children: /* @__PURE__ */ e.jsxs(me.Text, { ellipsis: { tooltip: !0 }, children: [
                  t(`type.${m.type}`, { defaultValue: m.type }),
                  " ",
                  m.artifact_file_name && `- ${m.artifact_file_name}`
                ] }) }),
                description: (m.status === "running" || m.status === "pending") && /* @__PURE__ */ e.jsx(et, { percent: m.progress ?? 0, size: "small", style: { marginTop: 4 } })
              }
            )
          },
          m.id
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(v, { type: "link", size: "small", onClick: () => r("/tasks"), children: t("more", { defaultValue: "More" }) }) })
  ] });
  return !i || i.length === 0 ? null : /* @__PURE__ */ e.jsxs(fe, { className: s, overlay: d, placement: "bottomRight", open: o, onOpenChange: a, children: [
    /* @__PURE__ */ e.jsx(ct, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: t("tasks", { defaultValue: "Tasks" }) })
  ] });
}, js = ({
  onResize: s,
  minWidth: t = 300,
  maxWidth: r = window.innerWidth * 0.5
}) => {
  const [n, o] = g(!1), [a, i] = g(!1), c = Y((h) => {
    h.preventDefault(), o(!0);
  }, []), u = Y(
    (h) => {
      if (!n) return;
      const d = window.innerWidth - h.clientX, m = Math.max(t, Math.min(r, d));
      s(m);
    },
    [n, t, r, s]
  ), p = Y(() => {
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
}, O = 40, Rt = 28, Bt = 6, ze = "ai-chat-float-pos", Ot = Q(({ token: s, css: t }) => ({
  root: t`
    position: fixed;
    z-index: 1050;
    width: ${O}px;
    height: ${O}px;
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
function L(s, t, r) {
  return Math.min(Math.max(s, t), r);
}
function D() {
  return Math.max(0, window.innerWidth - O);
}
function _() {
  return Math.max(0, window.innerHeight - O);
}
function ne() {
  const s = D(), t = _();
  return {
    rx: s > 0 ? L((s - 24) / s, 0, 1) : 1,
    ry: t > 0 ? L((t - 24) / t, 0, 1) : 1,
    edge: null
  };
}
function Ee(s, t, r) {
  let n = L(s, 0, D()), o = L(t, 0, _());
  return r === "left" && (n = 0), r === "right" && (n = D()), r === "top" && (o = 0), r === "bottom" && (o = _()), { x: n, y: o, edge: r };
}
function Me(s) {
  const t = D(), r = _();
  return {
    rx: t > 0 ? L(s.x / t, 0, 1) : 0,
    ry: r > 0 ? L(s.y / r, 0, 1) : 0,
    edge: s.edge
  };
}
function ve(s) {
  return Ee(s.rx * D(), s.ry * _(), s.edge);
}
function Nt() {
  try {
    const s = localStorage.getItem(ze);
    if (!s) return ne();
    const t = JSON.parse(s);
    return typeof t.rx == "number" && typeof t.ry == "number" ? {
      rx: L(t.rx, 0, 1),
      ry: L(t.ry, 0, 1),
      edge: t.edge ?? null
    } : typeof t.x == "number" && typeof t.y == "number" ? Me({
      x: L(t.x, 0, D()),
      y: L(t.y, 0, _()),
      edge: t.edge ?? null
    }) : ne();
  } catch {
    return ne();
  }
}
function be(s) {
  localStorage.setItem(ze, JSON.stringify(s));
}
function Ht(s, t) {
  const r = s, n = window.innerWidth - (s + O), o = t, a = window.innerHeight - (t + O), i = Math.min(r, n, o, a);
  return i > Rt ? null : i === r ? "left" : i === n ? "right" : i === o ? "top" : "bottom";
}
const $t = ({
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
] }), ws = ({ icon: s }) => {
  const { styles: t } = Ot(), { setVisible: r, visible: n } = qe(), { t: o } = C("ai"), a = te(
    typeof window > "u" ? { rx: 1, ry: 1, edge: null } : Nt()
  ), [i, c] = g(
    () => typeof window > "u" ? { x: 0, y: 0, edge: null } : ve(a.current)
  ), [u, p] = g(!1), h = te(null), d = te(i);
  d.current = i;
  const m = !u && i.edge === "left" ? t.dockLeft : !u && i.edge === "right" ? t.dockRight : !u && i.edge === "top" ? t.dockTop : !u && i.edge === "bottom" ? t.dockBottom : void 0, l = Y((j) => {
    const f = Me(j);
    a.current = f, be(f), c(j);
  }, []), x = Y(() => {
    h.current || c(ve(a.current));
  }, []);
  V(() => (be(a.current), window.addEventListener("resize", x), () => window.removeEventListener("resize", x)), [x]);
  const z = (j) => {
    j.button === 0 && (j.currentTarget.setPointerCapture(j.pointerId), h.current = {
      pointerId: j.pointerId,
      startX: j.clientX,
      startY: j.clientY,
      originX: d.current.x,
      originY: d.current.y,
      moved: !1
    }, p(!0));
  }, E = (j) => {
    const f = h.current;
    if (!f || f.pointerId !== j.pointerId) return;
    const k = j.clientX - f.startX, T = j.clientY - f.startY;
    !f.moved && Math.hypot(k, T) > Bt && (f.moved = !0), c({
      x: L(f.originX + k, 0, D()),
      y: L(f.originY + T, 0, _()),
      edge: null
    });
  }, b = (j) => {
    const f = h.current;
    if (!f || f.pointerId !== j.pointerId) return;
    try {
      j.currentTarget.releasePointerCapture(j.pointerId);
    } catch {
    }
    const k = !f.moved;
    if (h.current = null, p(!1), k) {
      r(!0);
      return;
    }
    const T = Ht(d.current.x, d.current.y);
    l(Ee(d.current.x, d.current.y, T));
  };
  return n ? null : Ct(
    /* @__PURE__ */ e.jsx(
      ie,
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
            className: M(
              "ai-chat-float-button",
              t.root,
              u && t.dragging,
              !u && i.edge && t.docked,
              m
            ),
            style: { left: i.x, top: i.y },
            onPointerDown: z,
            onPointerMove: E,
            onPointerUp: b,
            onPointerCancel: b,
            children: s ?? /* @__PURE__ */ e.jsx("span", { className: t.body, children: /* @__PURE__ */ e.jsx($t, { className: t.robot, eyeClassName: t.eye }) })
          }
        )
      }
    ),
    document.body
  );
}, De = ({
  permission: s,
  permissions: t = [],
  checkAll: r = !1,
  fallback: n = null,
  children: o
}) => {
  const { hasPermission: a, hasAnyPermission: i, hasAllPermissions: c, isAdmin: u, loading: p } = de();
  return p ? null : u ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : s ? a(s) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : t.length > 0 ? (r ? c(t) : i(t)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: o });
}, vs = ({
  fallback: s = null,
  children: t
}) => {
  const { isAdmin: r, loading: n } = de();
  return n ? null : r ? /* @__PURE__ */ e.jsx(e.Fragment, { children: t }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s });
}, Se = (s) => {
  const [t, r] = g(!1), { permission: n, icon: o, tooltip: a, onClick: i, confirm: c, label: u, ...p } = s, h = !!p.disabled, d = i ? async () => {
    r(!0);
    try {
      await i();
    } finally {
      r(!1);
    }
  } : void 0;
  let m = /* @__PURE__ */ e.jsx(
    v,
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
      oe,
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
  return a && (m = h ? /* @__PURE__ */ e.jsx(ie, { title: a, children: /* @__PURE__ */ e.jsx("span", { style: { display: "inline-block", cursor: "not-allowed" }, children: m }) }) : /* @__PURE__ */ e.jsx(ie, { title: a, children: m })), n && (m = /* @__PURE__ */ e.jsx(De, { permission: n, children: m })), m;
}, bs = ({ actions: s, maxVisibleItems: t }) => {
  const { modal: r } = N.useApp(), n = s.filter((c) => !c.hidden);
  if (!t || n.length <= t)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: n.map(({ key: c, ...u }) => /* @__PURE__ */ e.jsx(Se, { ...u }, c)) });
  const o = n.slice(0, t - 1), i = n.slice(t - 1).map((c) => {
    const { key: u, label: p, icon: h, permission: d, onClick: m, confirm: l, disabled: x, tooltip: z } = c, b = {
      key: u,
      label: p,
      icon: h,
      disabled: x,
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
      label: /* @__PURE__ */ e.jsx(De, { permission: d, children: /* @__PURE__ */ e.jsx("span", { children: p ?? z }) })
    } : b;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    o.map(({ key: c, ...u }) => /* @__PURE__ */ e.jsx(Se, { ...u }, c)),
    /* @__PURE__ */ e.jsx(Te, { menu: { items: i }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(v, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(ut, {}) }) })
  ] });
}, Ut = at, qt = (s) => Ut[s], Ss = ({ iconName: s }) => {
  if (!s)
    return null;
  const t = qt(s);
  return t ? /* @__PURE__ */ e.jsx(bt, { fallback: null, children: /* @__PURE__ */ e.jsx(t, {}) }) : null;
}, ks = ({ onChange: s }) => {
  const [t, r] = g(""), [n, o] = g("");
  return /* @__PURE__ */ e.jsxs(F.Compact, { children: [
    /* @__PURE__ */ e.jsx(I, { style: { width: "calc(100% - 80px)" }, value: t, onChange: (a) => r(a.target.value) }),
    /* @__PURE__ */ e.jsx(I, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(I, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (a) => o(a.target.value) }),
    /* @__PURE__ */ e.jsx(v, { type: "primary", icon: /* @__PURE__ */ e.jsx(mt, {}), onClick: () => {
      s(t, n);
    } })
  ] });
}, Yt = ({ request: s, tableRef: t, ...r }, n) => {
  const [o, a] = g({
    current: 1,
    pageSize: 10
  }), [i, c] = g(0), { data: u, loading: p, refresh: h } = P(async () => {
    const d = await s({
      current: o.current,
      page_size: o.pageSize
    });
    return c(d.total), d.data;
  }, {
    refreshDeps: [o]
  });
  return kt(n, () => ({
    reload: () => {
      h();
    }
  })), /* @__PURE__ */ e.jsx(
    pe,
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
}, Cs = ({ actionRef: s, ...t }) => {
  const [r, n] = g();
  return V(() => {
    n(St(Yt));
  }, []), r ? /* @__PURE__ */ e.jsx(r, { ...t, ref: s }) : null;
}, Is = ({ className: s, onSuccess: t, token: r }) => {
  const { message: n } = N.useApp(), { t: o } = C("authorization"), { t: a } = C("common"), [i] = w.useForm(), { run: c, loading: u } = P(async (p) => S.authorization.changePassword(p, r ? { headers: { Authorization: `Bearer ${r}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      n.success(o("user.passwordChanged")), i.resetFields(), t == null || t();
    },
    onError: (p) => {
      if (p instanceof It) {
        const h = p.code ?? "normal";
        n.error(o(`user.passwordChangeFailed.${h}`, { error: p.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        n.error(o("user.passwordChangeFailed.normal", { error: p.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", p);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    w,
    {
      form: i,
      layout: "vertical",
      onFinish: c,
      style: { maxWidth: 500, margin: "0 auto" },
      className: M("profile-password", s),
      children: [
        /* @__PURE__ */ e.jsx(
          w.Item,
          {
            name: "old_password",
            label: o("user.oldPassword"),
            rules: [{ required: !0, message: o("validation.oldPasswordRequired") }],
            className: M("profile-password-item", "profile-password-item-old-password"),
            children: /* @__PURE__ */ e.jsx(I.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          w.Item,
          {
            name: "new_password",
            label: o("user.newPassword"),
            rules: [
              { required: !0, message: o("validation.newPasswordRequired") },
              { min: 8, message: o("validation.passwordMinLength") }
            ],
            className: M("profile-password-item", "profile-password-item-new-password"),
            children: /* @__PURE__ */ e.jsx(I.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          w.Item,
          {
            name: "confirm_password",
            label: o("user.confirmPassword"),
            className: M("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: o("validation.confirmPasswordRequired") },
              ({ getFieldValue: p }) => ({
                validator(h, d) {
                  return !d || p("new_password") === d ? Promise.resolve() : Promise.reject(new Error(o("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(I.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(w.Item, { className: M("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: u, children: a("save") }) })
      ]
    }
  );
}, Ts = ({ user: s, onSuccess: t }) => {
  const { message: r } = N.useApp(), { t: n } = C("authorization"), { t: o } = C("common"), [a] = w.useForm(), [i, c] = g(!1);
  vt.useEffect(() => {
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
      c(!0), await S.authorization.updateCurrentUser(p), r.success(o("updateSuccess")), t();
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
      w,
      {
        form: a,
        layout: "vertical",
        onFinish: u,
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
              children: /* @__PURE__ */ e.jsx(I, { disabled: !0 })
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
              children: /* @__PURE__ */ e.jsx(I, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            w.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(I, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            w.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(I, {})
            }
          ),
          /* @__PURE__ */ e.jsx(w.Item, { children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: i, children: o("save") }) })
        ]
      }
    )
  ] });
}, As = ({ user: s, onSuccess: t }) => {
  const { message: r } = N.useApp(), { t: n } = C("authorization"), { t: o } = C("common"), [a, i] = g(0), [c, u] = g(!1), [p, h] = g(!0), [d, m] = g(""), [l, x] = g("totp"), [z, E] = g(!1), [b, j] = g("password"), [f, k] = g(""), [T, H] = g(""), [R, W] = g(""), [ge, Z] = g(""), [$, K] = g(0);
  V(() => {
    if ($ <= 0) return;
    const y = setTimeout(() => K((A) => A - 1), 1e3);
    return () => clearTimeout(y);
  }, [$]);
  const { run: _e, data: U = { secret: "", qr_code: "", token: void 0 } } = P(
    () => S.authorization.enableMfa({ mfa_type: l }),
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
    "token" in U && (y.token = U.token);
    try {
      u(!0), await S.authorization.verifyAndActivateMfa(y), r.success(n("mfa.enableSuccess")), i(2), t();
    } catch (A) {
      r.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", A);
    } finally {
      u(!1);
    }
  }, xe = () => {
    E(!1), j("password"), k(""), H(""), W(""), Z(""), K(0);
  }, { runAsync: Re, loading: Be } = P(
    () => S.authorization.sendDisableMfaCode(),
    { manual: !0 }
  ), Oe = async () => {
    try {
      const y = await Re();
      Z((y == null ? void 0 : y.token) ?? ""), W(""), K(60), r.success(n("mfa.codeSent", { defaultValue: "Verification code has been sent to your email" }));
    } catch (y) {
      r.error(y instanceof Error ? y.message : o("operationFailed")), console.error("Failed to send disable-MFA code:", y);
    }
  }, G = async () => {
    if (b === "email") {
      if (!ge) {
        r.warning(n("mfa.sendCodeFirst", { defaultValue: "Please send the verification code first" }));
        return;
      }
      if (!R) {
        r.warning(n("mfa.enterVerificationCode"));
        return;
      }
    } else if (b === "totp") {
      if (!T) {
        r.warning(n("mfa.enterVerificationCode"));
        return;
      }
    } else if (!f) {
      r.warning(n("mfa.enterPassword", { defaultValue: "Enter your password" }));
      return;
    }
    const y = { password: "", mfa_code: "", email_code: "", email_token: "" };
    b === "email" ? (y.email_code = R, y.email_token = ge) : b === "totp" ? y.mfa_code = T : y.password = f;
    try {
      u(!0), await S.authorization.disableMfa(y), r.success(n("mfa.disableSuccess")), xe(), t();
    } catch (A) {
      r.error(A instanceof Error ? A.message : o("operationFailed")), console.error("Failed to disable MFA:", A), b === "email" && (Z(""), W(""), K(0));
    } finally {
      u(!1);
    }
  }, Ne = () => {
    if (!s) return null;
    if (s.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        ae,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(v, { danger: !0, onClick: () => E(!0), children: n("mfa.disable") })
        }
      );
    const y = () => {
      var A;
      switch (a) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              ee,
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
              v,
              {
                type: "primary",
                onClick: _e,
                loading: c,
                children: n("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              ee,
              {
                message: n("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: l === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: l === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(st, { value: U.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: l === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: s == null ? void 0 : s.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: l === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: p ? "*".repeat(((A = U.secret) == null ? void 0 : A.length) ?? 0) : U.secret }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "link",
                  onClick: () => h(!p),
                  icon: p ? /* @__PURE__ */ e.jsx(Pe, {}) : /* @__PURE__ */ e.jsx(ht, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              I,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: d,
                onChange: (He) => m(He.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(F, { children: [
              /* @__PURE__ */ e.jsx(v, { onClick: () => i(0), children: o("previous") }),
              /* @__PURE__ */ e.jsx(
                v,
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
            ae,
            {
              status: "success",
              title: n("mfa.setupSuccess"),
              subTitle: n("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(v, { type: "primary", onClick: () => i(0), children: o("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: a === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          je,
          {
            defaultValue: "totp",
            onChange: (A) => {
              x(A), i(0);
            },
            value: l,
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
    Ne(),
    /* @__PURE__ */ e.jsxs(
      Ae,
      {
        title: n("mfa.confirmDisable"),
        open: z,
        onOk: G,
        okText: n("mfa.disable"),
        okButtonProps: { danger: !0, loading: c },
        onCancel: xe,
        destroyOnHidden: !0,
        children: [
          /* @__PURE__ */ e.jsx(
            ee,
            {
              message: n("mfa.disableWarning"),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          /* @__PURE__ */ e.jsx("p", { children: n("mfa.disableVerifyDescription", { defaultValue: "For security reasons, please verify your identity with your password or a verification code." }) }),
          /* @__PURE__ */ e.jsx(
            je,
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
            I.Password,
            {
              placeholder: n("mfa.enterPassword", { defaultValue: "Enter your password" }),
              autoComplete: "current-password",
              value: f,
              onChange: (y) => k(y.target.value),
              onPressEnter: G
            }
          ),
          b === "totp" && /* @__PURE__ */ e.jsx(
            I,
            {
              placeholder: n("mfa.enterTotpCode", { defaultValue: "Enter the 6-digit code from your authenticator app" }),
              maxLength: 6,
              value: T,
              onChange: (y) => H(y.target.value),
              onPressEnter: G
            }
          ),
          b === "email" && /* @__PURE__ */ e.jsxs(F.Compact, { style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(
              I,
              {
                placeholder: n("mfa.enterEmailCode", { defaultValue: "Enter the 6-digit code sent to your email" }),
                maxLength: 6,
                value: R,
                onChange: (y) => W(y.target.value),
                onPressEnter: G
              }
            ),
            /* @__PURE__ */ e.jsx(
              v,
              {
                onClick: Oe,
                loading: Be,
                disabled: $ > 0,
                children: $ > 0 ? n("mfa.resendIn", { defaultValue: "Resend ({{seconds}}s)", seconds: $ }) : n("mfa.sendCode", { defaultValue: "Send code" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}, { Text: re } = me, Ls = () => {
  const { message: s } = N.useApp(), { t } = C("authorization"), { t: r } = C("common"), [n, o] = g(null), [a, i] = g(!1), { data: c = [], loading: u, run: p } = P(() => S.authorization.getUserSessions({}), {
    onError: (l) => {
      s.error(t("session.getSessionsFailed", { error: l, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: h } = P((l) => S.authorization.terminateSession({ id: l }), {
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
  }), { run: d } = P(() => S.authorization.terminateOtherSessions(), {
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
      render: (l, x) => /* @__PURE__ */ e.jsxs(F, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(F, { children: [
          /* @__PURE__ */ e.jsx(gt, {}),
          /* @__PURE__ */ e.jsx(re, { strong: !0, children: l })
        ] }),
        /* @__PURE__ */ e.jsxs(F, { children: [
          /* @__PURE__ */ e.jsx(xt, {}),
          /* @__PURE__ */ e.jsx(re, { type: "secondary", children: x.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (l) => /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(yt, {}),
        /* @__PURE__ */ e.jsx("span", { children: l })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (l) => /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(jt, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(l).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (l) => l.is_current ? /* @__PURE__ */ e.jsx(X, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(X, { color: "blue", children: t("session.active") })
    },
    {
      title: r("actions"),
      key: "action",
      render: (l) => l.is_current ? /* @__PURE__ */ e.jsx(re, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        oe,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => h(l.id),
          okText: r("confirm"),
          cancelText: r("cancel"),
          children: /* @__PURE__ */ e.jsx(
            v,
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
  return /* @__PURE__ */ e.jsxs(F, { direction: "vertical", style: { padding: 8, width: "100%" }, children: [
    /* @__PURE__ */ e.jsxs(F, { direction: "horizontal", style: { float: "right" }, children: [
      c.length > 1 && /* @__PURE__ */ e.jsx(
        oe,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: d,
          okText: r("confirm"),
          cancelText: r("cancel"),
          children: /* @__PURE__ */ e.jsx(
            v,
            {
              danger: !0,
              loading: a,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      /* @__PURE__ */ e.jsx(v, { onClick: () => p(), loading: u, children: r("refresh") })
    ] }),
    !u && c.length === 0 ? /* @__PURE__ */ e.jsx(Fe, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
      pe,
      {
        columns: m,
        dataSource: c,
        rowKey: "id",
        loading: u,
        pagination: !1
      }
    )
  ] });
}, { RangePicker: Xt } = rt, { Option: B } = ce, Wt = (s) => s || "N/A", Kt = (s, t) => s === "success" ? /* @__PURE__ */ e.jsx(X, { color: "success", children: t("statuses.success") }) : /* @__PURE__ */ e.jsx(X, { color: "error", children: t("statuses.failed") }), Fs = ({
  userId: s,
  request: t = (n) => s ? S.authorization.getUserLogs({ id: s, ...n }) : S.authorization.getCurrentUserLogs(n),
  columnsFilter: r = (n) => n
}) => {
  const { message: n, modal: o } = N.useApp(), { t: a } = C("authorization"), { t: i } = C("common"), [c, u] = g({
    current: 1,
    pageSize: 10,
    total: 0
  }), [p, h] = g({}), [d] = w.useForm(), { loading: m, run: l, data: { data: x } = {} } = P(async (f = p, k = 1, T = 10) => t({
    ...f,
    current: k ?? 1,
    page_size: T ?? 10
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
  const z = (f) => {
    u({
      ...c,
      current: f.current || 1,
      pageSize: f.pageSize || 10
    }), l({}, f.current, f.pageSize);
  }, E = (f) => {
    var k, T, H, R;
    l({
      ...f,
      start_time: (T = (k = f.dateRange) == null ? void 0 : k[0]) == null ? void 0 : T.toISOString(),
      end_time: (R = (H = f.dateRange) == null ? void 0 : H[1]) == null ? void 0 : R.toISOString()
    }, 1, c.pageSize);
  }, b = () => {
    d.resetFields(), h({}), u({ ...c, current: 1 }), l({}, 1, c.pageSize);
  }, j = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (f) => We(f)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (f, k) => f ? a(`action.${f.replace(/:/g, ".")}`, { defaultValue: a(`permission.title.${f.replace(/:/g, ".")}`, { defaultValue: k.action_name }) }) : k.action_name ?? k.action
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
      render: (f) => Wt(f)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (f) => Kt(f, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (f) => /* @__PURE__ */ e.jsx(v, { type: "link", icon: /* @__PURE__ */ e.jsx(Pe, {}), onClick: () => {
        o.info({
          title: a("auditLog.details"),
          content: JSON.stringify(f)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      w,
      {
        form: d,
        layout: "horizontal",
        onFinish: E,
        initialValues: p,
        children: /* @__PURE__ */ e.jsxs(nt, { gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(q, { xxl: 6, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(w.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(I, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
          /* @__PURE__ */ e.jsx(q, { xxl: 4, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(w.Item, { name: "action", noStyle: !0, children: /* @__PURE__ */ e.jsxs(ce, { allowClear: !0, placeholder: a("auditLog.selectAction"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(B, { value: "login", children: a("actions.login") }),
            /* @__PURE__ */ e.jsx(B, { value: "logout", children: a("actions.logout") }),
            /* @__PURE__ */ e.jsx(B, { value: "password_reset", children: a("actions.passwordReset") }),
            /* @__PURE__ */ e.jsx(B, { value: "mfa_change", children: a("actions.mfaChange") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(q, { xxl: 3, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(w.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(ce, { allowClear: !0, placeholder: a("auditLog.selectStatus"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(B, { value: "success", children: a("statuses.success") }),
            /* @__PURE__ */ e.jsx(B, { value: "failed", children: a("statuses.failed") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(q, { xxl: 6, xl: 6, lg: 10, md: 12, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(w.Item, { name: "dateRange", noStyle: !0, children: /* @__PURE__ */ e.jsx(Xt, { style: { width: "100%" } }) }) }),
          /* @__PURE__ */ e.jsx(q, { xxl: 5, xl: 24, lg: 14, md: 24, sm: 24, xs: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(F, { children: [
            /* @__PURE__ */ e.jsx(v, { onClick: b, children: i("reset") }),
            /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(wt, {}), children: i("search") })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx(
      pe,
      {
        rowKey: "id",
        columns: r(j),
        dataSource: x,
        pagination: {
          ...c,
          showSizeChanger: !0,
          showTotal: (f) => i("totalItems", { total: f })
        },
        loading: m,
        onChange: z,
        scroll: { x: "max-content" }
      }
    ) })
  ] });
}, { Text: ke } = me, Gt = {
  debug: "default",
  info: "processing",
  warn: "warning",
  error: "error"
}, Ps = ({ taskId: s, poll: t }) => {
  const { t: r } = C("task"), { data: n = [], loading: o } = P(
    () => s ? S.tasks.getTaskLogs({ id: s }) : Promise.reject(new Error("No task id")),
    {
      refreshDeps: [s],
      ready: !!s,
      pollingInterval: t ? 2e3 : 0
    }
  );
  return /* @__PURE__ */ e.jsx(
    le,
    {
      title: r("logsTitle", { defaultValue: "Task logs" }),
      size: "small",
      style: { marginTop: 16 },
      children: o && !n.length ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 24 }, children: /* @__PURE__ */ e.jsx(ue, {}) }) : n.length ? /* @__PURE__ */ e.jsx(
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
            /* @__PURE__ */ e.jsx(ke, { type: "secondary", style: { fontSize: 11 }, children: a.created_at }),
            a.level && /* @__PURE__ */ e.jsxs(ke, { type: Gt[a.level], style: { marginLeft: 8, fontSize: 11 }, children: [
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
  gs as A,
  Ss as D,
  fe as H,
  we as L,
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
