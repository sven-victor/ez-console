import { j as e } from "./vendor.js";
import { Navigate as te, useNavigate as ye } from "react-router-dom";
import { a as ce, b as X, c as de } from "./contexts.js";
import { g as ve, f as we } from "./base.js";
import { Spin as ue, Result as J, Dropdown as me, Avatar as be, Upload as Se, Modal as B, Popover as ke, List as $, Divider as pe, Skeleton as Ce, Progress as Ie, Typography as Q, Button as v, Tag as P, Popconfirm as K, Tooltip as Te, Space as L, Input as T, Table as Z, theme as Fe, Form as j, Select as D, message as S, Card as R, Segmented as Le, Steps as _e, Alert as se, QRCode as ze, Empty as fe, Row as ne, Col as O, DatePicker as Ae } from "antd";
import { useTranslation as C } from "react-i18next";
import { createStyles as U } from "antd-style";
import * as Me from "@ant-design/icons";
import { UploadOutlined as Ee, CheckOutlined as Oe, TeamOutlined as Pe, UnorderedListOutlined as De, DownloadOutlined as Re, MoreOutlined as Ne, PlusOutlined as $e, ClockCircleFilled as Ve, MailOutlined as Be, EyeOutlined as he, EyeInvisibleOutlined as Ue, LaptopOutlined as He, EnvironmentOutlined as qe, GlobalOutlined as We, ClockCircleOutlined as Je, SearchOutlined as Ke, ReloadOutlined as Ge } from "@ant-design/icons";
import z from "classnames";
import { a as k } from "./index.js";
import V, { useState as h, useEffect as N, useCallback as E, Suspense as Xe, forwardRef as Qe, useImperativeHandle as ge, useRef as G } from "react";
import { useRequest as F } from "ahooks";
import { XMarkdown as Ze } from "@ant-design/x-markdown";
import { Mermaid as Ye, CodeHighlighter as et } from "@ant-design/x";
/* empty css             */
import tt from "@rjsf/antd";
import re from "@rjsf/validator-ajv8";
import { b as H, r as st, A as nt } from "./client.js";
import rt from "axios";
import it from "@uiw/react-codemirror";
import { json as at } from "@codemirror/lang-json";
import ot from "antd-img-crop";
import lt from "react-infinite-scroll-component";
import { isString as ct } from "lodash-es";
const ie = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(ue, { size: "large" }) }), rs = ({
  element: t,
  requiredPermission: i,
  requiredPermissions: n
}) => {
  const { t: s } = C(), { user: r, loading: o, error: a } = ce(), { hasPermission: c, hasAllPermissions: l } = X();
  return o ? /* @__PURE__ */ e.jsx(ie, {}) : a ? a.code === "E4011" ? /* @__PURE__ */ e.jsx(ie, {}) : /* @__PURE__ */ e.jsx(
    J,
    {
      status: "500",
      title: "500",
      subTitle: s("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (a == null ? void 0 : a.message) || a })
    }
  ) : r ? i && !c(i) ? /* @__PURE__ */ e.jsx(te, { to: "/forbidden", replace: !0 }) : n && !l(n) ? /* @__PURE__ */ e.jsx(te, { to: "/forbidden", replace: !0 }) : t : (window.location.href = ve("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, dt = U(({ token: t, css: i }) => ({
  container: i`
      ${i`
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
})), Y = ({
  overlayClassName: t,
  overlay: i,
  hidden: n,
  children: s,
  ...r
}) => {
  if (n)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: o } = dt();
  return /* @__PURE__ */ e.jsx(
    me,
    {
      dropdownRender: i,
      overlayClassName: z(o.container, t),
      ...r,
      children: /* @__PURE__ */ e.jsx("span", { className: o.iconStyle, children: s })
    }
  );
}, ut = () => /* @__PURE__ */ e.jsxs(
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
), mt = U(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), pt = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], is = ({
  transformLangConfig: t = (n) => n,
  className: i
}) => {
  const { i18n: n } = C(), { styles: s } = mt(), r = (a) => {
    n.changeLanguage(a);
  }, o = {
    selectedKeys: [n.language],
    onClick: (a) => {
      r(a.key);
    },
    items: t(pt).map((a) => ({
      key: a.lang,
      className: s.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (a == null ? void 0 : a.label) || "en-US", className: s.menuItemIconStyle, children: (a == null ? void 0 : a.icon) || "🌐" }),
        (a == null ? void 0 : a.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    Y,
    {
      className: i,
      menu: o,
      children: /* @__PURE__ */ e.jsx(ut, {})
    }
  );
}, ft = U(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), xe = (t) => ct(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? H.endsWith("/") ? H + `files/${t}` : H + `/files/${t}` : t, ht = ({ src: t, fallback: i, ...n }) => /* @__PURE__ */ e.jsx(be, { src: xe(t), icon: i, ...n }), gt = ({ onChange: t, shape: i = "square" }) => {
  const [n, s] = h([]), { styles: r } = ft(), [o, a] = h(!1), [c, l] = h(!0), [p, m] = h(0), { run: u, loading: d } = F(() => k.base.listFiles({ current: p + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: y }) => {
      s([...n, ...y]), l(y.length === 40), m(p + 1);
    }
  }), w = () => {
    l(!0), m(0), s([]);
  };
  return /* @__PURE__ */ e.jsx(
    ke,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (y) => {
        a(y), y ? u() : w();
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
            lt,
            {
              dataLength: n.length,
              next: () => {
                u();
              },
              hasMore: c,
              loader: /* @__PURE__ */ e.jsx(Ce, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(pe, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                $,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: d,
                  renderItem: ({ id: y }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: r.avatarItem,
                      onClick: (b) => {
                        b.stopPropagation(), t == null || t(y), a(!1), w();
                      },
                      children: /* @__PURE__ */ e.jsx(ht, { shape: i, src: y })
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
        Ee,
        {
          shape: i,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, xt = ({ value: t, onChange: i, shape: n, ...s }) => {
  const [r, o] = h(void 0), [a, c] = h(!1), [l, p] = h(void 0), m = async (u) => {
    c(!0), p(u.url ?? u.preview);
  };
  return N(() => {
    o(t ? {
      uid: t,
      name: t,
      url: xe(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      ot,
      {
        beforeCrop: async (u) => {
          if (u.type === "image/svg+xml") {
            const d = await k.base.uploadFile({ type: "avatar" }, u);
            return d.length > 0 && (i == null || i(d[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          Se,
          {
            customRequest: async (u) => {
              var w, y;
              const d = await k.base.uploadFile({ type: "avatar", access: "public" }, u.file);
              d.length > 0 ? ((w = u.onSuccess) == null || w.call(u, d[0].id), i == null || i(d[0].id)) : (y = u.onError) == null || y.call(u, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: m,
            maxCount: 1,
            onChange: ({ file: u }) => {
              switch (u.status) {
                case "removed":
                  i == null || i(void 0);
                  break;
                case "done":
                  break;
                default:
                  o(u);
                  break;
              }
            },
            fileList: r ? [r] : [],
            ...s,
            children: r ? void 0 : /* @__PURE__ */ e.jsx(gt, { shape: n, onChange: i })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(B, { open: a, footer: null, onCancel: () => c(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: l }) })
  ] });
}, as = ({ className: t }) => {
  const { t: i } = C("common"), { user: n } = ce(), { currentOrgId: s, setCurrentOrgId: r } = de(), o = (n == null ? void 0 : n.organizations) || [], a = (m) => {
    r(m), window.location.reload();
  };
  if (o.length === 0)
    return null;
  const c = o.find((m) => m.id === s), l = c ? c.name : i("organization.global", { defaultValue: "Global" }), p = [
    ...o.map((m) => ({
      key: m.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: m.name }),
        s === m.id && /* @__PURE__ */ e.jsx(Oe, {})
      ] }),
      onClick: () => a(m.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    Y,
    {
      className: t,
      menu: {
        items: p,
        selectedKeys: s ? [s] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(Pe, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: l })
      ]
    }
  );
}, ee = ({
  permission: t,
  permissions: i = [],
  checkAll: n = !1,
  fallback: s = null,
  children: r
}) => {
  const { hasPermission: o, hasAnyPermission: a, hasAllPermissions: c, isAdmin: l, loading: p } = X();
  return p ? null : l ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : t ? o(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : i.length > 0 ? (n ? c(i) : a(i)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: r });
}, os = ({
  fallback: t = null,
  children: i
}) => {
  const { isAdmin: n, loading: s } = X();
  return s ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, jt = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, ls = ({ className: t }) => {
  const { t: i } = C("task"), n = ye(), { tasks: s, tasksDropdownOpen: r, setTasksDropdownOpen: o } = de(), a = async (l) => {
    const p = await k.base.downloadFile({ fileKey: l }, { params: { method: "sign" } }), m = `/api/files/${l}?signature=${p.signature}&expires=${p.expires}`;
    window.open(m, "_blank");
  }, c = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      $,
      {
        size: "small",
        dataSource: s,
        renderItem: (l) => /* @__PURE__ */ e.jsx(
          $.Item,
          {
            extra: /* @__PURE__ */ e.jsx(P, { color: jt[l.status], style: { marginLeft: 6 }, children: i(`status.${l.status}`, { defaultValue: l.status }) }),
            actions: [
              l.artifact_file_key && /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx(Re, {}),
                  onClick: () => a(l.artifact_file_key)
                }
              )
            ].filter(Boolean),
            children: /* @__PURE__ */ e.jsx(
              $.Item.Meta,
              {
                title: /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13 }, children: /* @__PURE__ */ e.jsxs(Q.Text, { ellipsis: { tooltip: !0 }, children: [
                  i(`type.${l.type}`, { defaultValue: l.type }),
                  " ",
                  l.artifact_file_name && `- ${l.artifact_file_name}`
                ] }) }),
                description: (l.status === "running" || l.status === "pending") && /* @__PURE__ */ e.jsx(Ie, { percent: l.progress ?? 0, size: "small", style: { marginTop: 4 } })
              }
            )
          },
          l.id
        )
      }
    ),
    /* @__PURE__ */ e.jsx(ee, { permission: "task:view", children: /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(v, { type: "link", size: "small", onClick: () => n("/tasks"), children: i("more", { defaultValue: "More" }) }) }) })
  ] });
  return !s || s.length === 0 ? null : /* @__PURE__ */ e.jsxs(Y, { className: t, overlay: c, placement: "bottomRight", open: r, onOpenChange: o, children: [
    /* @__PURE__ */ e.jsx(De, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: i("tasks", { defaultValue: "Tasks" }) })
  ] });
}, cs = ({
  onResize: t,
  minWidth: i = 300,
  maxWidth: n = window.innerWidth * 0.5
}) => {
  const [s, r] = h(!1), [o, a] = h(!1), c = E((m) => {
    m.preventDefault(), r(!0);
  }, []), l = E(
    (m) => {
      if (!s) return;
      const u = window.innerWidth - m.clientX, d = Math.max(i, Math.min(n, u));
      t(d);
    },
    [s, i, n, t]
  ), p = E(() => {
    r(!1);
  }, []);
  return N(() => {
    if (s)
      return document.addEventListener("mousemove", l), document.addEventListener("mouseup", p), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", p), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [s, l, p]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: c,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      style: {
        width: "8px",
        height: "100vh",
        cursor: "col-resize",
        position: "relative",
        flexShrink: 0,
        transition: s ? "none" : "background-color 0.2s ease",
        backgroundColor: s ? "#1890ff" : o ? "#bfbfbf" : "#e8e8e8",
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
            backgroundColor: s || o ? "#fff" : "#999",
            opacity: s || o ? 1 : 0.5,
            transition: "opacity 0.2s ease",
            pointerEvents: "none"
          }
        }
      )
    }
  );
}, ae = (t) => {
  const [i, n] = h(!1), { permission: s, icon: r, tooltip: o, onClick: a, confirm: c, label: l, ...p } = t, m = a ? async () => {
    n(!0);
    try {
      await a();
    } finally {
      n(!1);
    }
  } : void 0;
  let u = /* @__PURE__ */ e.jsx(
    v,
    {
      type: "text",
      size: "small",
      loading: i,
      icon: r,
      onClick: c ? void 0 : m,
      ...p,
      children: l && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: l })
    }
  );
  if (o && (u = /* @__PURE__ */ e.jsx(Te, { title: o, children: u })), c) {
    const d = async () => {
      c.onConfirm ? c.onConfirm() : m && await m();
    };
    u = /* @__PURE__ */ e.jsx(
      K,
      {
        title: c.title,
        description: c.description,
        onConfirm: d,
        okText: c.okText,
        cancelText: c.cancelText,
        children: u
      }
    );
  }
  return s && (u = /* @__PURE__ */ e.jsx(ee, { permission: s, children: u })), u;
}, ds = ({ actions: t, maxVisibleItems: i }) => {
  const n = t.filter((a) => !a.hidden);
  if (!i || n.length <= i)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: n.map(({ key: a, ...c }) => /* @__PURE__ */ e.jsx(ae, { ...c }, a)) });
  const s = n.slice(0, i - 1), o = n.slice(i - 1).map((a) => {
    const { key: c, label: l, icon: p, permission: m, onClick: u, confirm: d, disabled: w, tooltip: y } = a, _ = {
      key: c,
      label: l,
      icon: p,
      disabled: w,
      onClick: async () => {
        d ? B.confirm({
          title: d.title,
          content: d.description,
          onOk: d.onConfirm,
          okText: d.okText,
          cancelText: d.cancelText
        }) : u && await u();
      }
    };
    return m ? {
      ..._,
      label: /* @__PURE__ */ e.jsx(ee, { permission: m, children: /* @__PURE__ */ e.jsx("span", { children: l ?? y }) })
    } : _;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    s.map(({ key: a, ...c }) => /* @__PURE__ */ e.jsx(ae, { ...c }, a)),
    /* @__PURE__ */ e.jsx(me, { menu: { items: o }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(v, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(Ne, {}) }) })
  ] });
}, yt = Me, vt = (t) => yt[t], us = ({ iconName: t }) => {
  if (!t)
    return null;
  const i = vt(t);
  return i ? /* @__PURE__ */ e.jsx(Xe, { fallback: null, children: /* @__PURE__ */ e.jsx(i, {}) }) : null;
}, ms = ({ onChange: t }) => {
  const [i, n] = h(""), [s, r] = h("");
  return /* @__PURE__ */ e.jsxs(L.Compact, { children: [
    /* @__PURE__ */ e.jsx(T, { style: { width: "calc(100% - 80px)" }, value: i, onChange: (o) => n(o.target.value) }),
    /* @__PURE__ */ e.jsx(T, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(T, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (o) => r(o.target.value) }),
    /* @__PURE__ */ e.jsx(v, { type: "primary", icon: /* @__PURE__ */ e.jsx($e, {}), onClick: () => {
      t(i, s);
    } })
  ] });
}, wt = ({ request: t, tableRef: i, ...n }, s) => {
  const [r, o] = h({
    current: 1,
    pageSize: 10
  }), [a, c] = h(0), { data: l, loading: p, refresh: m } = F(async () => {
    const u = await t({
      current: r.current,
      page_size: r.pageSize
    });
    return c(u.total), u.data;
  }, {
    refreshDeps: [r]
  });
  return ge(s, () => ({
    reload: () => {
      m();
    }
  })), /* @__PURE__ */ e.jsx(
    Z,
    {
      rowKey: "id",
      loading: p,
      dataSource: l ?? [],
      pagination: {
        ...r,
        total: a,
        onChange: (u, d) => {
          o({ current: u, pageSize: d });
        }
      },
      ...n,
      ref: i
    }
  );
}, ps = ({ actionRef: t, ...i }) => {
  const [n, s] = h();
  return N(() => {
    s(Qe(wt));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...i, ref: t }) : null;
}, bt = (t) => {
  var r;
  const { className: i, children: n } = t, s = ((r = i == null ? void 0 : i.match(/language-(\w+)/)) == null ? void 0 : r[1]) || "";
  return typeof n != "string" ? null : s === "mermaid" ? /* @__PURE__ */ e.jsx(Ye, { children: n }) : /* @__PURE__ */ e.jsx(et, { lang: s, children: n });
}, St = () => {
  const t = Fe.useToken(), i = V.useMemo(() => {
    var s;
    return ((s = t == null ? void 0 : t.theme) == null ? void 0 : s.id) === 0;
  }, [t]);
  return [V.useMemo(() => i ? "x-markdown-light" : "x-markdown-dark", [i])];
}, fs = ({
  content: t,
  className: i,
  style: n,
  paragraphTag: s = "div",
  rootClassName: r,
  components: o = { code: bt }
}) => {
  const [a] = St();
  return /* @__PURE__ */ e.jsx(
    Ze,
    {
      content: t,
      className: z(i, a),
      style: n,
      components: o,
      paragraphTag: s,
      rootClassName: r
    }
  );
}, kt = 2, Ct = U(({ css: t }) => ({
  jsonSchemaForm: t`
      .ant-form-item-control-input-content>#root {
        border-width: 0;
        padding: 0px;
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
        margin-bottom: 0px;
      }
      .ant-form-item-additional{
        height: 24px;
      }
      .ant-form-item-additional:has(>.ant-form-item-explain){
        >.ant-form-item-extra{
          display: none;
        }
      }
    `
})), It = (t) => /* @__PURE__ */ e.jsx(je, { ...t });
function q(t) {
  if (t == null)
    return "";
  try {
    return JSON.stringify(t, null, kt);
  } catch {
    return "";
  }
}
function oe(t) {
  const i = t.trim();
  if (i !== "")
    try {
      return JSON.parse(i);
    } catch {
      return;
    }
}
function Tt(t) {
  const { formData: i, schema: n, onChange: s, disabled: r, id: o, required: a, name: c, fieldPathId: l } = t, p = Array.isArray(n.examples) ? n.examples : [], m = G(void 0), u = G(!1), [d, w] = h(() => q(i)), [y, b] = h(null);
  N(() => {
    if (u.current) {
      u.current = !1;
      return;
    }
    m.current !== i && (m.current = i, w(q(i)), b(null));
  }, [i]);
  const _ = E(
    (g) => {
      w(g);
      const x = oe(g);
      if (x === void 0 && g.trim() !== "") {
        b("Invalid JSON");
        return;
      }
      b(null), m.current = x, u.current = !0, s(x, l.path);
    },
    [s, l]
  ), f = E(
    (g) => {
      const x = p[g];
      if (x === void 0) return;
      const I = typeof x == "string" ? oe(x) : x, A = q(I);
      w(A), b(null), m.current = I, u.current = !0, s(I, l.path);
    },
    [s, p, l]
  );
  return /* @__PURE__ */ e.jsxs("div", { id: o, style: { position: "relative" }, children: [
    p.length > 0 && /* @__PURE__ */ e.jsx(
      "div",
      {
        style: {
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10
        },
        children: /* @__PURE__ */ e.jsx(
          D,
          {
            placeholder: "Load example…",
            allowClear: !0,
            style: { minWidth: 160 },
            disabled: r,
            options: p.map((g, x) => ({
              label: typeof g == "object" && g !== null && "title" in g ? String(g.title) : `Example ${x + 1}`,
              value: x
            })),
            onChange: (g) => g != null && f(g)
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-label", children: /* @__PURE__ */ e.jsx("label", { className: a ? "ant-form-item-required" : "ant-form-item-optional", children: c }) }),
    /* @__PURE__ */ e.jsx(
      it,
      {
        value: d,
        height: "200px",
        extensions: [at()],
        onChange: _,
        editable: !r,
        basicSetup: { lineNumbers: !0, foldGutter: !0 }
      }
    ),
    y && /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-additional", children: /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-explain ant-form-item-explain-connected", children: /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-explain-error", children: /* @__PURE__ */ e.jsx("div", { id: "root_args__error", children: /* @__PURE__ */ e.jsx("div", { children: y }) }) }) }) })
  ] });
}
const je = (t) => {
  const { schema: i, value: n, onChange: s } = t, r = i["x-data-source"], { data: o, loading: a } = F(async () => {
    switch (r.type) {
      case "toolsets":
        return (await k.system.listToolSets({
          current: 1,
          page_size: 1e3
        })).data.map((c) => ({ label: c[r.label_key], value: c[r.value_key] }));
      case "api":
        return r.url.startsWith("/") ? (await st(r.url, {
          method: r.method,
          params: r.params
        })).data.map((c) => ({ label: c[r.label_key], value: c[r.value_key] })) : (await rt(r.url, {
          params: r.params,
          method: r.method
        })).data.map((c) => ({ label: c[r.label_key], value: c[r.value_key] }));
      default:
        return [];
    }
  }, {
    cacheKey: `${r.type}:${r.method}:${r.url}:${JSON.stringify(r.params)}`,
    cacheTime: r.cache_ttl * 1e3,
    staleTime: r.cache_ttl * 1e3
  });
  return /* @__PURE__ */ e.jsx(
    D,
    {
      options: o,
      value: n,
      loading: a,
      onChange: (c) => s == null ? void 0 : s(c),
      style: { width: "100%" }
    }
  );
};
function Ft(t) {
  const i = t.$defs || t.definitions || {};
  function n(r) {
    if (!r.startsWith("#/$defs/") && !r.startsWith("#/definitions/"))
      return null;
    const o = r.split("/").pop();
    return o ? i[o] : null;
  }
  function s(r) {
    if (!r) return {};
    if (r.$ref) {
      const a = n(r.$ref);
      return s(a);
    }
    const o = {};
    if (Object.keys(r).forEach((a) => {
      a.startsWith("x-ui-") && (o[`ui:${a.slice(5)}`] = r[a]);
    }), r["x-hidden"] && (o["ui:widget"] = "hidden"), r["x-disabled"] && (o["ui:disabled"] = !0), r.type === "object") {
      if (r.properties)
        for (const [a, c] of Object.entries(r.properties)) {
          const l = s(c);
          Object.keys(l).length > 0 && (o[a] = l);
        }
      r.dependencies && Object.keys(r.dependencies).forEach((a) => {
        const c = r.dependencies[a];
        c.properties ? Object.keys(c.properties).forEach((l) => {
          const p = s(c.properties[l]);
          Object.keys(p).length > 0 && (o[a] = p);
        }) : c.oneOf && c.oneOf.forEach((l) => {
          l.properties && Object.keys(l.properties).forEach((p) => {
            const m = s(l.properties[p]);
            o[p] = m;
          });
        });
      });
    }
    return r.type === "array" && r.items && (o.items = s(r.items)), r.oneOf && (o["ui:options"] = {
      ...o["ui:options"] || {},
      oneOf: r.oneOf.map((a) => s(a))
    }), r.anyOf && (o["ui:options"] = {
      ...o["ui:options"] || {},
      anyOf: r.anyOf.map((a) => s(a))
    }), r.allOf && (o["ui:options"] = {
      ...o["ui:options"] || {},
      allOf: r.allOf.map((a) => s(a))
    }), o;
  }
  if (t.$ref) {
    const r = n(t.$ref);
    return s(r);
  }
  return s(t);
}
const Lt = ({
  schema: t,
  value: i,
  onChange: n,
  uiSchema: s,
  disabled: r = !1,
  formRef: o
}) => {
  const { styles: a } = Ct(), c = i ?? {};
  ge(o, () => ({
    validate: (m) => {
      const u = re.validateFormData(m, t, void 0, void 0, p);
      return u.errors.filter((d) => d.message !== "must NOT have additional properties").length > 0 ? Promise.reject(u.errors[0].message) : Promise.resolve();
    }
  }));
  const l = E(
    ({ formData: m }) => {
      n == null || n(m ?? {});
    },
    [n]
  ), p = V.useMemo(() => t ? {
    ...Ft(t) || {},
    ...s || {}
  } : {}, [t, s]);
  return /* @__PURE__ */ e.jsx(
    tt,
    {
      className: z(a.jsonSchemaForm, "json-schema-config-form"),
      schema: t || {},
      formData: c,
      onChange: l,
      validator: re,
      uiSchema: p || {},
      disabled: r,
      showErrorList: !1,
      liveValidate: "onChange",
      fields: {
        objectEditor: Tt
      },
      transformErrors: (m) => m.filter((u) => u.message !== "must NOT have additional properties"),
      widgets: {
        remoteSelect: je,
        toolsetsSelect: It
      }
    }
  );
}, hs = ({ schema: t, uiSchema: i, ...n }) => {
  const s = G(null);
  return /* @__PURE__ */ e.jsx(
    j.Item,
    {
      noStyle: !0,
      ...n,
      rules: [{
        validator: (r, o) => {
          var a;
          return (a = s.current) == null ? void 0 : a.validate(o);
        },
        message: ""
      }],
      children: /* @__PURE__ */ e.jsx(Lt, { schema: t, formRef: s, uiSchema: i })
    }
  );
}, gs = ({ className: t, onSuccess: i, token: n }) => {
  const { t: s } = C("authorization"), { t: r } = C("common"), [o] = j.useForm(), { run: a, loading: c } = F(async (l) => k.authorization.changePassword(l, n ? { headers: { Authorization: `Bearer ${n}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      S.success(s("user.passwordChanged")), o.resetFields(), i == null || i();
    },
    onError: (l) => {
      if (l instanceof nt) {
        const p = l.code ?? "normal";
        S.error(s(`user.passwordChangeFailed.${p}`, { error: l.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        S.error(s("user.passwordChangeFailed.normal", { error: l.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", l);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    j,
    {
      form: o,
      layout: "vertical",
      onFinish: a,
      style: { maxWidth: 500, margin: "0 auto" },
      className: z("profile-password", t),
      children: [
        /* @__PURE__ */ e.jsx(
          j.Item,
          {
            name: "old_password",
            label: s("user.oldPassword"),
            rules: [{ required: !0, message: s("validation.oldPasswordRequired") }],
            className: z("profile-password-item", "profile-password-item-old-password"),
            children: /* @__PURE__ */ e.jsx(T.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          j.Item,
          {
            name: "new_password",
            label: s("user.newPassword"),
            rules: [
              { required: !0, message: s("validation.newPasswordRequired") },
              { min: 8, message: s("validation.passwordMinLength") }
            ],
            className: z("profile-password-item", "profile-password-item-new-password"),
            children: /* @__PURE__ */ e.jsx(T.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          j.Item,
          {
            name: "confirm_password",
            label: s("user.confirmPassword"),
            className: z("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: s("validation.confirmPasswordRequired") },
              ({ getFieldValue: l }) => ({
                validator(p, m) {
                  return !m || l("new_password") === m ? Promise.resolve() : Promise.reject(new Error(s("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(T.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(j.Item, { className: z("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: c, children: r("save") }) })
      ]
    }
  );
}, xs = ({ user: t, onSuccess: i }) => {
  const { t: n } = C("authorization"), { t: s } = C("common"), [r] = j.useForm(), [o, a] = h(!1);
  V.useEffect(() => {
    t && r.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, r]);
  const c = async (l) => {
    try {
      a(!0), await k.authorization.updateCurrentUser(l), S.success(s("updateSuccess")), i();
    } catch (p) {
      S.error(s("updateFailed")), console.error("Failed to update user information:", p);
    } finally {
      a(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }),
      (t == null ? void 0 : t.roles) && t.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        n("user.roles"),
        ": ",
        t.roles.map((l) => l.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      j,
      {
        form: r,
        layout: "vertical",
        onFinish: c,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(xt, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(T, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
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
            j.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(T, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(T, {})
            }
          ),
          /* @__PURE__ */ e.jsx(j.Item, { children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: o, children: s("save") }) })
        ]
      }
    )
  ] });
}, js = ({ user: t, onSuccess: i }) => {
  const { t: n } = C("authorization"), { t: s } = C("common"), [r, o] = h(0), [a, c] = h(!1), [l, p] = h(!0), [m, u] = h(""), [d, w] = h("totp"), { run: y, data: b = { secret: "", qr_code: "", token: void 0 } } = F(
    () => k.authorization.enableMfa(d),
    {
      manual: !0,
      onSuccess: () => {
        o(1);
      },
      onBefore: () => {
        c(!0);
      },
      onFinally: () => {
        c(!1);
      }
    }
  ), _ = async () => {
    if (!m) {
      S.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const x = {
      code: m,
      mfa_type: d
    };
    "token" in b && (x.token = b.token);
    try {
      c(!0), await k.authorization.verifyAndActivateMfa(x), S.success(n("mfa.enableSuccess")), o(2), i();
    } catch (I) {
      S.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", I);
    } finally {
      c(!1);
    }
  }, f = async () => {
    try {
      c(!0), await k.authorization.disableMfa(), S.success(n("mfa.disableSuccess")), i();
    } catch (x) {
      S.error(s("operationFailed")), console.error("Failed to disable MFA:", x);
    } finally {
      c(!1);
    }
  }, g = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        J,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            v,
            {
              danger: !0,
              onClick: () => {
                B.confirm({
                  title: n("mfa.confirmDisable"),
                  content: n("mfa.disableWarning"),
                  onOk: f,
                  okButtonProps: { danger: !0 }
                });
              },
              children: n("mfa.disable")
            }
          )
        }
      );
    const x = () => {
      var I;
      switch (r) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              se,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: n("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: n(d === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
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
                onClick: y,
                loading: a,
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
                style: { marginBottom: 20, display: d === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: d === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(ze, { value: b.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: d === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: d === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: l ? "*".repeat(((I = b.secret) == null ? void 0 : I.length) ?? 0) : b.secret }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "link",
                  onClick: () => p(!l),
                  icon: l ? /* @__PURE__ */ e.jsx(he, {}) : /* @__PURE__ */ e.jsx(Ue, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              T,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: m,
                onChange: (A) => u(A.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(L, { children: [
              /* @__PURE__ */ e.jsx(v, { onClick: () => o(0), children: s("previous") }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "primary",
                  onClick: _,
                  loading: a,
                  children: s("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            J,
            {
              status: "success",
              title: n("mfa.setupSuccess"),
              subTitle: n("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(v, { type: "primary", onClick: () => o(0), children: s("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: r === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          Le,
          {
            defaultValue: "totp",
            onChange: (I) => {
              w(I), o(0);
            },
            value: d,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Ve, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Be, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(pe, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        _e,
        {
          current: r,
          items: [
            { title: n(d === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(d === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(d === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(d === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(d === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(d === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      x()
    ] });
  };
  return /* @__PURE__ */ e.jsx(R, { title: n("mfa.title"), children: g() });
}, { Text: W } = Q, ys = () => {
  const { t } = C("authorization"), { t: i } = C("common"), [n, s] = h(null), [r, o] = h(!1), { data: a = [], loading: c, run: l } = F(() => k.authorization.getUserSessions({}), {
    onError: (d) => {
      S.error(t("session.getSessionsFailed", { error: d, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: p } = F((d) => k.authorization.terminateSession({ id: d }), {
    onSuccess: () => {
      S.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" })), l();
    },
    onError: (d) => {
      S.error(t("session.terminateFailed", { error: d, defaultValue: "Failed to terminate session: {{error}}" }));
    },
    onFinally: () => {
      s(null);
    },
    onBefore: ([d]) => {
      s(d);
    },
    manual: !0
  }), { run: m } = F(() => k.authorization.terminateOtherSessions(), {
    onSuccess: () => {
      S.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" })), l();
    },
    onError: (d) => {
      S.error(t("session.terminateAllFailed", { error: d, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    },
    onFinally: () => {
      o(!1);
    },
    onBefore: () => {
      o(!0);
    },
    manual: !0
  }), u = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (d, w) => /* @__PURE__ */ e.jsxs(L, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(He, {}),
          /* @__PURE__ */ e.jsx(W, { strong: !0, children: d })
        ] }),
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(qe, {}),
          /* @__PURE__ */ e.jsx(W, { type: "secondary", children: w.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (d) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(We, {}),
        /* @__PURE__ */ e.jsx("span", { children: d })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (d) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(Je, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(d).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (d) => d.is_current ? /* @__PURE__ */ e.jsx(P, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(P, { color: "blue", children: t("session.active") })
    },
    {
      title: i("actions"),
      key: "action",
      render: (d) => d.is_current ? /* @__PURE__ */ e.jsx(W, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        K,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => p(d.id),
          okText: i("confirm"),
          cancelText: i("cancel"),
          children: /* @__PURE__ */ e.jsx(
            v,
            {
              type: "link",
              danger: !0,
              loading: n === d.id,
              children: t("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsx(
    R,
    {
      title: t("session.title"),
      loading: c,
      extra: /* @__PURE__ */ e.jsxs(L, { children: [
        a.length > 1 && /* @__PURE__ */ e.jsx(
          K,
          {
            title: t("session.confirmTerminateAll"),
            onConfirm: m,
            okText: i("confirm"),
            cancelText: i("cancel"),
            children: /* @__PURE__ */ e.jsx(
              v,
              {
                danger: !0,
                loading: r,
                children: t("session.terminateOthers")
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(v, { onClick: () => l(), loading: c, children: i("refresh") })
      ] }),
      children: !c && a.length === 0 ? /* @__PURE__ */ e.jsx(fe, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        Z,
        {
          columns: u,
          dataSource: a,
          rowKey: "id",
          loading: c,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: _t } = Ae, { Option: M } = D, zt = (t) => t || "N/A", At = (t, i) => t === "success" ? /* @__PURE__ */ e.jsx(P, { color: "success", children: i("statuses.success") }) : /* @__PURE__ */ e.jsx(P, { color: "error", children: i("statuses.failed") }), vs = ({
  userId: t,
  request: i = (s) => t ? k.authorization.getUserLogs({ id: t, ...s }) : k.authorization.getCurrentUserLogs(s),
  columnsFilter: n = (s) => s
}) => {
  const { t: s } = C("authorization"), { t: r } = C("common"), [o, a] = h({
    current: 1,
    pageSize: 10,
    total: 0
  }), [c, l] = h({}), [p] = j.useForm(), { loading: m, run: u, data: { data: d } = {} } = F(async (f = c, g = 1, x = 10) => i({
    ...f,
    current: g ?? 1,
    page_size: x ?? 10
  }), {
    onError(f) {
      S.error(s("auditLog.fetchFailed", { error: f }));
    },
    onSuccess({ total: f }) {
      a({
        ...o,
        total: f
      });
    }
  });
  N(() => {
    u(c, 1, o.pageSize);
  }, []);
  const w = (f) => {
    a({
      ...o,
      current: f.current,
      pageSize: f.pageSize
    }), u({}, f.current, f.pageSize);
  }, y = (f) => {
    var g, x, I, A;
    u({
      ...f,
      start_time: (x = (g = f.dateRange) == null ? void 0 : g[0]) == null ? void 0 : x.toISOString(),
      end_time: (A = (I = f.dateRange) == null ? void 0 : I[1]) == null ? void 0 : A.toISOString()
    }, 1, o.pageSize);
  }, b = () => {
    p.resetFields(), l({}), a({ ...o, current: 1 }), u({}, 1, o.pageSize);
  }, _ = [
    {
      title: s("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (f) => we(f)
    },
    {
      title: s("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (f, g) => f ? s(`action.${f.replace(":", ".")}`, { defaultValue: g.action_name }) : g.action_name ?? g.action
    },
    {
      title: s("auditLog.user_agent"),
      dataIndex: "user_agent",
      key: "user_agent"
    },
    {
      title: s("auditLog.ip"),
      dataIndex: "ip",
      key: "ip",
      render: (f) => zt(f)
    },
    {
      title: s("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (f) => At(f, s)
    },
    {
      title: s("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (f) => /* @__PURE__ */ e.jsx(v, { type: "link", icon: /* @__PURE__ */ e.jsx(he, {}), onClick: () => {
        B.info({
          title: s("auditLog.details"),
          content: JSON.stringify(f)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(R, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      j,
      {
        form: p,
        layout: "horizontal",
        onFinish: y,
        initialValues: c,
        children: [
          /* @__PURE__ */ e.jsxs(ne, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(O, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "search", label: s("auditLog.search"), children: /* @__PURE__ */ e.jsx(T, { placeholder: s("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(O, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "action", label: s("auditLog.action"), children: /* @__PURE__ */ e.jsxs(D, { allowClear: !0, placeholder: s("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(M, { value: "login", children: s("actions.login") }),
              /* @__PURE__ */ e.jsx(M, { value: "logout", children: s("actions.logout") }),
              /* @__PURE__ */ e.jsx(M, { value: "password_reset", children: s("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(M, { value: "mfa_change", children: s("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(O, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "status", label: s("auditLog.status"), children: /* @__PURE__ */ e.jsxs(D, { allowClear: !0, placeholder: s("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(M, { value: "success", children: s("statuses.success") }),
              /* @__PURE__ */ e.jsx(M, { value: "failed", children: s("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(O, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "dateRange", label: s("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(_t, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(ne, { children: /* @__PURE__ */ e.jsx(O, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(L, { children: [
            /* @__PURE__ */ e.jsx(v, { onClick: b, children: r("reset") }),
            /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Ke, {}), children: r("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(R, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        v,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Ge, {}),
          onClick: b,
          style: { marginRight: 8 },
          children: r("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        Z,
        {
          rowKey: "id",
          columns: n(_),
          dataSource: d,
          pagination: {
            ...o,
            showSizeChanger: !0,
            showTotal: (f) => r("totalItems", { total: f })
          },
          loading: m,
          onChange: w,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, { Text: le } = Q, Mt = {
  debug: "default",
  info: "processing",
  warn: "warning",
  error: "error"
}, ws = ({ taskId: t, poll: i }) => {
  const { t: n } = C("task"), { data: s = [], loading: r } = F(
    () => t ? k.tasks.getTaskLogs({ id: t }) : Promise.reject(new Error("No task id")),
    {
      refreshDeps: [t],
      ready: !!t,
      pollingInterval: i ? 2e3 : 0
    }
  );
  return /* @__PURE__ */ e.jsx(
    R,
    {
      title: n("logsTitle", { defaultValue: "Task logs" }),
      size: "small",
      style: { marginTop: 16 },
      children: r && !s.length ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 24 }, children: /* @__PURE__ */ e.jsx(ue, {}) }) : s.length ? /* @__PURE__ */ e.jsx(
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
          children: s.map((o) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 4 }, children: [
            /* @__PURE__ */ e.jsx(le, { type: "secondary", style: { fontSize: 11 }, children: o.created_at }),
            o.level && /* @__PURE__ */ e.jsxs(le, { type: Mt[o.level], style: { marginLeft: 8, fontSize: 11 }, children: [
              "[",
              o.level,
              "]"
            ] }),
            /* @__PURE__ */ e.jsx("div", { style: { display: "inline", marginLeft: 8 }, children: o.message })
          ] }, o.id))
        }
      ) : /* @__PURE__ */ e.jsx(fe, { description: n("noLogs", { defaultValue: "No logs yet." }) })
    }
  );
};
export {
  ht as A,
  bt as C,
  us as D,
  Y as H,
  Lt as J,
  ie as L,
  fs as M,
  as as O,
  rs as P,
  cs as R,
  ls as T,
  vs as U,
  is as a,
  ds as b,
  xt as c,
  ms as d,
  pt as e,
  ee as f,
  vt as g,
  os as h,
  ps as i,
  hs as j,
  gs as k,
  xs as l,
  js as m,
  ys as n,
  ws as o
};
