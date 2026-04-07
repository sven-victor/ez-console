import { j as e } from "./vendor.js";
import { Navigate as te, useNavigate as je } from "react-router-dom";
import { a as ce, b as X, c as de, d as ve } from "./contexts.js";
import { g as we, i as be, f as Se } from "./base.js";
import { Spin as ue, Result as J, Dropdown as me, Avatar as ke, Upload as Ce, Modal as U, Popover as Ie, List as $, Divider as pe, Skeleton as Te, Progress as Fe, Typography as Q, Button as w, Tag as O, Popconfirm as K, Tooltip as se, Space as L, Input as T, Table as Z, theme as Le, Form as v, Select as N, message as S, Card as R, Segmented as Ae, Steps as _e, Alert as ne, QRCode as ze, Empty as fe, Row as Me, Col as P, DatePicker as Ee } from "antd";
import { useTranslation as C } from "react-i18next";
import { createStyles as B } from "antd-style";
import * as De from "@ant-design/icons";
import { UploadOutlined as Pe, CheckOutlined as Oe, TeamOutlined as Ne, UnorderedListOutlined as Re, DownloadOutlined as $e, MoreOutlined as Ve, PlusOutlined as Ue, ClockCircleFilled as Be, MailOutlined as He, EyeOutlined as he, EyeInvisibleOutlined as qe, LaptopOutlined as We, EnvironmentOutlined as Je, GlobalOutlined as Ke, ClockCircleOutlined as Ge, SearchOutlined as Xe } from "@ant-design/icons";
import V, { useState as h, useEffect as D, useCallback as E, Suspense as Qe, forwardRef as Ze, useImperativeHandle as xe, useRef as G } from "react";
import _ from "classnames";
import { a as b } from "./index.js";
import { useRequest as F } from "ahooks";
import { XMarkdown as Ye } from "@ant-design/x-markdown";
import { Mermaid as et, CodeHighlighter as tt } from "@ant-design/x";
/* empty css             */
import st from "@rjsf/antd";
import re from "@rjsf/validator-ajv8";
import { b as H, r as nt, A as rt } from "./client.js";
import it from "axios";
import at from "@uiw/react-codemirror";
import { json as ot } from "@codemirror/lang-json";
import lt from "antd-img-crop";
import ct from "react-infinite-scroll-component";
import { isString as dt } from "lodash-es";
const ie = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(ue, { size: "large" }) }), is = ({
  element: t,
  requiredPermission: i,
  requiredPermissions: n
}) => {
  const { t: s } = C(), { user: r, loading: o, error: a } = ce(), { hasPermission: c, hasAllPermissions: d } = X();
  return o ? /* @__PURE__ */ e.jsx(ie, {}) : a ? a.code === "E4011" ? /* @__PURE__ */ e.jsx(ie, {}) : /* @__PURE__ */ e.jsx(
    J,
    {
      status: "500",
      title: "500",
      subTitle: s("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (a == null ? void 0 : a.message) || a })
    }
  ) : r ? i && !c(i) ? /* @__PURE__ */ e.jsx(te, { to: "/forbidden", replace: !0 }) : n && !d(n) ? /* @__PURE__ */ e.jsx(te, { to: "/forbidden", replace: !0 }) : t : (window.location.href = we("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, ut = B(({ token: t, css: i }) => ({
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
  const { styles: o } = ut();
  return /* @__PURE__ */ e.jsx(
    me,
    {
      dropdownRender: i,
      overlayClassName: _(o.container, t),
      ...r,
      children: /* @__PURE__ */ e.jsx("span", { className: o.iconStyle, children: s })
    }
  );
}, mt = () => /* @__PURE__ */ e.jsxs(
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
), pt = B(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), ft = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], as = ({
  transformLangConfig: t = (n) => n,
  className: i
}) => {
  const { i18n: n } = C(), { styles: s } = pt(), r = (a) => {
    n.changeLanguage(a);
  }, o = {
    selectedKeys: [n.language],
    onClick: (a) => {
      r(a.key);
    },
    items: t(ft).map((a) => ({
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
      children: /* @__PURE__ */ e.jsx(mt, {})
    }
  );
}, ht = B(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), ge = (t) => dt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? H.endsWith("/") ? H + `files/${t}` : H + `/files/${t}` : t, xt = ({ src: t, fallback: i, ...n }) => /* @__PURE__ */ e.jsx(ke, { src: ge(t), icon: i, ...n }), gt = ({ onChange: t, shape: i = "square" }) => {
  const [n, s] = h([]), { styles: r } = ht(), [o, a] = h(!1), [c, d] = h(!0), [p, u] = h(0), { run: m, loading: l } = F(() => b.base.listFiles({ current: p + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: g }) => {
      s([...n, ...g]), d(g.length === 40), u(p + 1);
    }
  }), x = () => {
    d(!0), u(0), s([]);
  };
  return /* @__PURE__ */ e.jsx(
    Ie,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (g) => {
        a(g), g ? m() : x();
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
            ct,
            {
              dataLength: n.length,
              next: () => {
                m();
              },
              hasMore: c,
              loader: /* @__PURE__ */ e.jsx(Te, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(pe, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                $,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: l,
                  renderItem: ({ id: g }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: r.avatarItem,
                      onClick: (k) => {
                        k.stopPropagation(), t == null || t(g), a(!1), x();
                      },
                      children: /* @__PURE__ */ e.jsx(xt, { shape: i, src: g })
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
        Pe,
        {
          shape: i,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, yt = ({ value: t, onChange: i, shape: n, ...s }) => {
  const [r, o] = h(void 0), [a, c] = h(!1), [d, p] = h(void 0), u = async (m) => {
    c(!0), p(m.url ?? m.preview);
  };
  return D(() => {
    o(t ? {
      uid: t,
      name: t,
      url: ge(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      lt,
      {
        beforeCrop: async (m) => {
          if (m.type === "image/svg+xml") {
            const l = await b.base.uploadFile({ type: "avatar" }, m);
            return l.length > 0 && (i == null || i(l[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          Ce,
          {
            customRequest: async (m) => {
              var x, g;
              const l = await b.base.uploadFile({ type: "avatar", access: "public" }, m.file);
              l.length > 0 ? ((x = m.onSuccess) == null || x.call(m, l[0].id), i == null || i(l[0].id)) : (g = m.onError) == null || g.call(m, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: u,
            maxCount: 1,
            onChange: ({ file: m }) => {
              switch (m.status) {
                case "removed":
                  i == null || i(void 0);
                  break;
                case "done":
                  break;
                default:
                  o(m);
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
    /* @__PURE__ */ e.jsx(U, { open: a, footer: null, onCancel: () => c(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: d }) })
  ] });
}, os = ({ className: t }) => {
  const { t: i } = C("common"), { user: n } = ce(), { currentOrgId: s, setCurrentOrgId: r } = de(), o = (n == null ? void 0 : n.organizations) || [], a = (u) => {
    r(u), window.location.reload();
  };
  if (o.length === 0)
    return null;
  const c = o.find((u) => u.id === s), d = c ? c.name : i("organization.global", { defaultValue: "Global" }), p = [
    ...o.map((u) => ({
      key: u.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: u.name }),
        s === u.id && /* @__PURE__ */ e.jsx(Oe, {})
      ] }),
      onClick: () => a(u.id)
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
        /* @__PURE__ */ e.jsx(Ne, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: d })
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
  const { hasPermission: o, hasAnyPermission: a, hasAllPermissions: c, isAdmin: d, loading: p } = X();
  return p ? null : d ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : t ? o(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : i.length > 0 ? (n ? c(i) : a(i)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: r });
}, ls = ({
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
}, cs = ({ className: t }) => {
  const { t: i } = C("task"), n = je(), { user: s } = ve(), { tasksDropdownOpen: r, setTasksDropdownOpen: o, tasks: a, setTasks: c } = de(), { runAsync: d, loading: p } = F(async () => b.tasks.listUserTasks({}), {
    onSuccess: (l) => {
      be(a, l, (x, g) => x.id === g.id && x.status === g.status && x.progress === g.progress) || c(l);
    },
    pollingInterval: r ? 3e3 : 6e4,
    ready: !!s,
    refreshDeps: [s]
  });
  D(() => {
    r && d();
  }, [r]);
  const u = async (l) => {
    const x = await b.base.downloadFile({ fileKey: l }, { params: { method: "sign" } }), g = `/api/files/${l}?signature=${x.signature}&expires=${x.expires}`;
    window.open(g, "_blank");
  }, m = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      $,
      {
        size: "small",
        dataSource: a,
        loading: p,
        renderItem: (l) => /* @__PURE__ */ e.jsx(
          $.Item,
          {
            extra: /* @__PURE__ */ e.jsx(O, { color: jt[l.status], style: { marginLeft: 6 }, children: i(`status.${l.status}`, { defaultValue: l.status }) }),
            actions: [
              l.artifact_file_key && /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx($e, {}),
                  onClick: () => u(l.artifact_file_key)
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
                description: (l.status === "running" || l.status === "pending") && /* @__PURE__ */ e.jsx(Fe, { percent: l.progress ?? 0, size: "small", style: { marginTop: 4 } })
              }
            )
          },
          l.id
        )
      }
    ),
    /* @__PURE__ */ e.jsx(ee, { permission: "task:view", children: /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", onClick: () => n("/tasks"), children: i("more", { defaultValue: "More" }) }) }) })
  ] });
  return !a || a.length === 0 ? null : /* @__PURE__ */ e.jsxs(Y, { className: t, overlay: m, placement: "bottomRight", open: r, onOpenChange: o, children: [
    /* @__PURE__ */ e.jsx(Re, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: i("tasks", { defaultValue: "Tasks" }) })
  ] });
}, ds = ({
  onResize: t,
  minWidth: i = 300,
  maxWidth: n = window.innerWidth * 0.5
}) => {
  const [s, r] = h(!1), [o, a] = h(!1), c = E((u) => {
    u.preventDefault(), r(!0);
  }, []), d = E(
    (u) => {
      if (!s) return;
      const m = window.innerWidth - u.clientX, l = Math.max(i, Math.min(n, m));
      t(l);
    },
    [s, i, n, t]
  ), p = E(() => {
    r(!1);
  }, []);
  return D(() => {
    if (s)
      return document.addEventListener("mousemove", d), document.addEventListener("mouseup", p), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", d), document.removeEventListener("mouseup", p), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [s, d, p]), /* @__PURE__ */ e.jsx(
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
  const [i, n] = h(!1), { permission: s, icon: r, tooltip: o, onClick: a, confirm: c, label: d, ...p } = t, u = !!p.disabled, m = a ? async () => {
    n(!0);
    try {
      await a();
    } finally {
      n(!1);
    }
  } : void 0;
  let l = /* @__PURE__ */ e.jsx(
    w,
    {
      type: "link",
      size: "small",
      loading: i,
      icon: r,
      onClick: c && !u ? void 0 : m,
      ...p,
      children: d && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: d })
    }
  );
  if (c && !u) {
    const x = async () => {
      c.onConfirm ? c.onConfirm() : m && await m();
    };
    l = /* @__PURE__ */ e.jsx(
      K,
      {
        title: c.title,
        description: c.description,
        onConfirm: x,
        okText: c.okText,
        cancelText: c.cancelText,
        children: l
      }
    );
  }
  return o && (l = u ? /* @__PURE__ */ e.jsx(se, { title: o, children: /* @__PURE__ */ e.jsx("span", { style: { display: "inline-block", cursor: "not-allowed" }, children: l }) }) : /* @__PURE__ */ e.jsx(se, { title: o, children: l })), s && (l = /* @__PURE__ */ e.jsx(ee, { permission: s, children: l })), l;
}, us = ({ actions: t, maxVisibleItems: i }) => {
  const n = t.filter((a) => !a.hidden);
  if (!i || n.length <= i)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: n.map(({ key: a, ...c }) => /* @__PURE__ */ e.jsx(ae, { ...c }, a)) });
  const s = n.slice(0, i - 1), o = n.slice(i - 1).map((a) => {
    const { key: c, label: d, icon: p, permission: u, onClick: m, confirm: l, disabled: x, tooltip: g } = a, A = {
      key: c,
      label: d,
      icon: p,
      disabled: x,
      onClick: async () => {
        l ? U.confirm({
          title: l.title,
          content: l.description,
          onOk: l.onConfirm,
          okText: l.okText,
          cancelText: l.cancelText
        }) : m && await m();
      }
    };
    return u ? {
      ...A,
      label: /* @__PURE__ */ e.jsx(ee, { permission: u, children: /* @__PURE__ */ e.jsx("span", { children: d ?? g }) })
    } : A;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    s.map(({ key: a, ...c }) => /* @__PURE__ */ e.jsx(ae, { ...c }, a)),
    /* @__PURE__ */ e.jsx(me, { menu: { items: o }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(w, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(Ve, {}) }) })
  ] });
}, vt = De, wt = (t) => vt[t], ms = ({ iconName: t }) => {
  if (!t)
    return null;
  const i = wt(t);
  return i ? /* @__PURE__ */ e.jsx(Qe, { fallback: null, children: /* @__PURE__ */ e.jsx(i, {}) }) : null;
}, ps = ({ onChange: t }) => {
  const [i, n] = h(""), [s, r] = h("");
  return /* @__PURE__ */ e.jsxs(L.Compact, { children: [
    /* @__PURE__ */ e.jsx(T, { style: { width: "calc(100% - 80px)" }, value: i, onChange: (o) => n(o.target.value) }),
    /* @__PURE__ */ e.jsx(T, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(T, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (o) => r(o.target.value) }),
    /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ue, {}), onClick: () => {
      t(i, s);
    } })
  ] });
}, bt = ({ request: t, tableRef: i, ...n }, s) => {
  const [r, o] = h({
    current: 1,
    pageSize: 10
  }), [a, c] = h(0), { data: d, loading: p, refresh: u } = F(async () => {
    const m = await t({
      current: r.current,
      page_size: r.pageSize
    });
    return c(m.total), m.data;
  }, {
    refreshDeps: [r]
  });
  return xe(s, () => ({
    reload: () => {
      u();
    }
  })), /* @__PURE__ */ e.jsx(
    Z,
    {
      rowKey: "id",
      loading: p,
      dataSource: d ?? [],
      pagination: {
        ...r,
        total: a,
        onChange: (m, l) => {
          o({ current: m, pageSize: l });
        }
      },
      ...n,
      ref: i
    }
  );
}, fs = ({ actionRef: t, ...i }) => {
  const [n, s] = h();
  return D(() => {
    s(Ze(bt));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...i, ref: t }) : null;
}, St = (t) => {
  var r;
  const { className: i, children: n } = t, s = ((r = i == null ? void 0 : i.match(/language-(\w+)/)) == null ? void 0 : r[1]) || "";
  return typeof n != "string" ? null : s === "mermaid" ? /* @__PURE__ */ e.jsx(et, { children: n }) : /* @__PURE__ */ e.jsx(tt, { lang: s, children: n });
}, kt = () => {
  const t = Le.useToken(), i = V.useMemo(() => {
    var s;
    return ((s = t == null ? void 0 : t.theme) == null ? void 0 : s.id) === 0;
  }, [t]);
  return [V.useMemo(() => i ? "x-markdown-light" : "x-markdown-dark", [i])];
}, hs = ({
  content: t,
  className: i,
  style: n,
  paragraphTag: s = "div",
  rootClassName: r,
  components: o = { code: St }
}) => {
  const [a] = kt();
  return /* @__PURE__ */ e.jsx(
    Ye,
    {
      content: t,
      className: _(i, a),
      style: n,
      components: o,
      paragraphTag: s,
      rootClassName: r
    }
  );
}, Ct = 2, It = B(({ css: t }) => ({
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
})), Tt = (t) => {
  var i;
  return /* @__PURE__ */ e.jsx(
    ye,
    {
      ...t,
      schema: {
        ...t.schema || {},
        "x-data-source": {
          ...((i = t.schema) == null ? void 0 : i["x-data-source"]) || {},
          type: "toolsets"
        }
      }
    }
  );
};
function q(t) {
  if (t == null)
    return "";
  try {
    return JSON.stringify(t, null, Ct);
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
function Ft(t) {
  const { formData: i, schema: n, onChange: s, disabled: r, id: o, required: a, name: c, fieldPathId: d } = t, p = Array.isArray(n.examples) ? n.examples : [], u = G(void 0), m = G(!1), [l, x] = h(() => q(i)), [g, k] = h(null);
  D(() => {
    if (m.current) {
      m.current = !1;
      return;
    }
    u.current !== i && (u.current = i, x(q(i)), k(null));
  }, [i]);
  const A = E(
    (y) => {
      x(y);
      const j = oe(y);
      if (j === void 0 && y.trim() !== "") {
        k("Invalid JSON");
        return;
      }
      k(null), u.current = j, m.current = !0, s(j, d.path);
    },
    [s, d]
  ), f = E(
    (y) => {
      const j = p[y];
      if (j === void 0) return;
      const I = typeof j == "string" ? oe(j) : j, z = q(I);
      x(z), k(null), u.current = I, m.current = !0, s(I, d.path);
    },
    [s, p, d]
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
          N,
          {
            placeholder: "Load example…",
            allowClear: !0,
            style: { minWidth: 160 },
            disabled: r,
            options: p.map((y, j) => ({
              label: typeof y == "object" && y !== null && "title" in y ? String(y.title) : `Example ${j + 1}`,
              value: j
            })),
            onChange: (y) => y != null && f(y)
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-label", children: /* @__PURE__ */ e.jsx("label", { className: a ? "ant-form-item-required" : "ant-form-item-optional", children: c }) }),
    /* @__PURE__ */ e.jsx(
      at,
      {
        value: l,
        height: "200px",
        extensions: [ot()],
        onChange: A,
        editable: !r,
        basicSetup: { lineNumbers: !0, foldGutter: !0 }
      }
    ),
    g && /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-additional", children: /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-explain ant-form-item-explain-connected", children: /* @__PURE__ */ e.jsx("div", { className: "ant-form-item-explain-error", children: /* @__PURE__ */ e.jsx("div", { id: "root_args__error", children: /* @__PURE__ */ e.jsx("div", { children: g }) }) }) }) })
  ] });
}
const ye = (t) => {
  const { schema: i, value: n, onChange: s } = t, r = i["x-data-source"], { data: o, loading: a } = F(async () => {
    switch (r.type) {
      case "toolsets":
        return (await b.system.listToolSets({
          current: 1,
          page_size: 1e3
        })).data.map((c) => ({ label: c[r.label_key || "name"], value: c[r.value_key || "id"] }));
      case "api":
        return r.url.startsWith("/") ? (await nt(r.url, {
          method: r.method,
          params: r.params
        })).data.map((c) => ({ label: c[r.label_key], value: c[r.value_key] })) : (await it(r.url, {
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
    N,
    {
      options: o,
      value: n,
      loading: a,
      onChange: (c) => s == null ? void 0 : s(c),
      style: { width: "100%" }
    }
  );
};
function Lt(t) {
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
          const d = s(c);
          Object.keys(d).length > 0 && (o[a] = d);
        }
      r.dependencies && Object.keys(r.dependencies).forEach((a) => {
        const c = r.dependencies[a];
        c.properties ? Object.keys(c.properties).forEach((d) => {
          const p = s(c.properties[d]);
          Object.keys(p).length > 0 && (o[a] = p);
        }) : c.oneOf && c.oneOf.forEach((d) => {
          d.properties && Object.keys(d.properties).forEach((p) => {
            const u = s(d.properties[p]);
            o[p] = u;
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
const At = ({
  schema: t,
  value: i,
  onChange: n,
  uiSchema: s,
  disabled: r = !1,
  formRef: o
}) => {
  const { styles: a } = It(), c = i ?? {};
  xe(o, () => ({
    validate: (u) => {
      const m = re.validateFormData(u, t, void 0, void 0, p);
      return m.errors.filter((l) => l.message !== "must NOT have additional properties").length > 0 ? Promise.reject(m.errors[0].message) : Promise.resolve();
    }
  }));
  const d = E(
    ({ formData: u }) => {
      n == null || n(u ?? {});
    },
    [n]
  ), p = V.useMemo(() => t ? {
    ...Lt(t) || {},
    ...s || {}
  } : {}, [t, s]);
  return /* @__PURE__ */ e.jsx(
    st,
    {
      className: _(a.jsonSchemaForm, "json-schema-config-form"),
      schema: t || {},
      formData: c,
      onChange: d,
      validator: re,
      uiSchema: p || {},
      disabled: r,
      showErrorList: !1,
      liveValidate: "onChange",
      autoComplete: "off",
      fields: {
        objectEditor: Ft
      },
      transformErrors: (u) => u.filter((m) => m.message !== "must NOT have additional properties"),
      widgets: {
        remoteSelect: ye,
        toolsetsSelect: Tt
      }
    }
  );
}, xs = ({ schema: t, uiSchema: i, ...n }) => {
  const s = G(null);
  return /* @__PURE__ */ e.jsx(
    v.Item,
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
      children: /* @__PURE__ */ e.jsx(At, { schema: t, formRef: s, uiSchema: i })
    }
  );
}, gs = ({ className: t, onSuccess: i, token: n }) => {
  const { t: s } = C("authorization"), { t: r } = C("common"), [o] = v.useForm(), { run: a, loading: c } = F(async (d) => b.authorization.changePassword(d, n ? { headers: { Authorization: `Bearer ${n}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      S.success(s("user.passwordChanged")), o.resetFields(), i == null || i();
    },
    onError: (d) => {
      if (d instanceof rt) {
        const p = d.code ?? "normal";
        S.error(s(`user.passwordChangeFailed.${p}`, { error: d.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        S.error(s("user.passwordChangeFailed.normal", { error: d.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", d);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    v,
    {
      form: o,
      layout: "vertical",
      onFinish: a,
      style: { maxWidth: 500, margin: "0 auto" },
      className: _("profile-password", t),
      children: [
        /* @__PURE__ */ e.jsx(
          v.Item,
          {
            name: "old_password",
            label: s("user.oldPassword"),
            rules: [{ required: !0, message: s("validation.oldPasswordRequired") }],
            className: _("profile-password-item", "profile-password-item-old-password"),
            children: /* @__PURE__ */ e.jsx(T.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          v.Item,
          {
            name: "new_password",
            label: s("user.newPassword"),
            rules: [
              { required: !0, message: s("validation.newPasswordRequired") },
              { min: 8, message: s("validation.passwordMinLength") }
            ],
            className: _("profile-password-item", "profile-password-item-new-password"),
            children: /* @__PURE__ */ e.jsx(T.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          v.Item,
          {
            name: "confirm_password",
            label: s("user.confirmPassword"),
            className: _("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: s("validation.confirmPasswordRequired") },
              ({ getFieldValue: d }) => ({
                validator(p, u) {
                  return !u || d("new_password") === u ? Promise.resolve() : Promise.reject(new Error(s("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(T.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(v.Item, { className: _("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: c, children: r("save") }) })
      ]
    }
  );
}, ys = ({ user: t, onSuccess: i }) => {
  const { t: n } = C("authorization"), { t: s } = C("common"), [r] = v.useForm(), [o, a] = h(!1);
  V.useEffect(() => {
    t && r.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, r]);
  const c = async (d) => {
    try {
      a(!0), await b.authorization.updateCurrentUser(d), S.success(s("updateSuccess")), i();
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
        t.roles.map((d) => d.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      v,
      {
        form: r,
        layout: "vertical",
        onFinish: c,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            v.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(yt, {})
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
          /* @__PURE__ */ e.jsx(v.Item, { children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: o, children: s("save") }) })
        ]
      }
    )
  ] });
}, js = ({ user: t, onSuccess: i }) => {
  const { t: n } = C("authorization"), { t: s } = C("common"), [r, o] = h(0), [a, c] = h(!1), [d, p] = h(!0), [u, m] = h(""), [l, x] = h("totp"), { run: g, data: k = { secret: "", qr_code: "", token: void 0 } } = F(
    () => b.authorization.enableMfa(l),
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
  ), A = async () => {
    if (!u) {
      S.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const j = {
      code: u,
      mfa_type: l
    };
    "token" in k && (j.token = k.token);
    try {
      c(!0), await b.authorization.verifyAndActivateMfa(j), S.success(n("mfa.enableSuccess")), o(2), i();
    } catch (I) {
      S.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", I);
    } finally {
      c(!1);
    }
  }, f = async () => {
    try {
      c(!0), await b.authorization.disableMfa(), S.success(n("mfa.disableSuccess")), i();
    } catch (j) {
      S.error(s("operationFailed")), console.error("Failed to disable MFA:", j);
    } finally {
      c(!1);
    }
  }, y = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        J,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            w,
            {
              danger: !0,
              onClick: () => {
                U.confirm({
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
    const j = () => {
      var I;
      switch (r) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              ne,
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
                onClick: g,
                loading: a,
                children: n("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              ne,
              {
                message: n("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: l === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: l === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(ze, { value: k.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: l === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: l === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: d ? "*".repeat(((I = k.secret) == null ? void 0 : I.length) ?? 0) : k.secret }),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "link",
                  onClick: () => p(!d),
                  icon: d ? /* @__PURE__ */ e.jsx(he, {}) : /* @__PURE__ */ e.jsx(qe, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              T,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: u,
                onChange: (z) => m(z.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(L, { children: [
              /* @__PURE__ */ e.jsx(w, { onClick: () => o(0), children: s("previous") }),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "primary",
                  onClick: A,
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
              extra: /* @__PURE__ */ e.jsx(w, { type: "primary", onClick: () => o(0), children: s("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: r === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          Ae,
          {
            defaultValue: "totp",
            onChange: (I) => {
              x(I), o(0);
            },
            value: l,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Be, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(He, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
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
            { title: n(l === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(l === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(l === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(l === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(l === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(l === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      j()
    ] });
  };
  return /* @__PURE__ */ e.jsx(R, { title: n("mfa.title"), children: y() });
}, { Text: W } = Q, vs = () => {
  const { t } = C("authorization"), { t: i } = C("common"), [n, s] = h(null), [r, o] = h(!1), { data: a = [], loading: c, run: d } = F(() => b.authorization.getUserSessions({}), {
    onError: (l) => {
      S.error(t("session.getSessionsFailed", { error: l, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: p } = F((l) => b.authorization.terminateSession({ id: l }), {
    onSuccess: () => {
      S.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" })), d();
    },
    onError: (l) => {
      S.error(t("session.terminateFailed", { error: l, defaultValue: "Failed to terminate session: {{error}}" }));
    },
    onFinally: () => {
      s(null);
    },
    onBefore: ([l]) => {
      s(l);
    },
    manual: !0
  }), { run: u } = F(() => b.authorization.terminateOtherSessions(), {
    onSuccess: () => {
      S.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" })), d();
    },
    onError: (l) => {
      S.error(t("session.terminateAllFailed", { error: l, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    },
    onFinally: () => {
      o(!1);
    },
    onBefore: () => {
      o(!0);
    },
    manual: !0
  }), m = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (l, x) => /* @__PURE__ */ e.jsxs(L, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(We, {}),
          /* @__PURE__ */ e.jsx(W, { strong: !0, children: l })
        ] }),
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(Je, {}),
          /* @__PURE__ */ e.jsx(W, { type: "secondary", children: x.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (l) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(Ke, {}),
        /* @__PURE__ */ e.jsx("span", { children: l })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (l) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(Ge, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(l).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (l) => l.is_current ? /* @__PURE__ */ e.jsx(O, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(O, { color: "blue", children: t("session.active") })
    },
    {
      title: i("actions"),
      key: "action",
      render: (l) => l.is_current ? /* @__PURE__ */ e.jsx(W, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        K,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => p(l.id),
          okText: i("confirm"),
          cancelText: i("cancel"),
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
            onConfirm: u,
            okText: i("confirm"),
            cancelText: i("cancel"),
            children: /* @__PURE__ */ e.jsx(
              w,
              {
                danger: !0,
                loading: r,
                children: t("session.terminateOthers")
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(w, { onClick: () => d(), loading: c, children: i("refresh") })
      ] }),
      children: !c && a.length === 0 ? /* @__PURE__ */ e.jsx(fe, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        Z,
        {
          columns: m,
          dataSource: a,
          rowKey: "id",
          loading: c,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: _t } = Ee, { Option: M } = N, zt = (t) => t || "N/A", Mt = (t, i) => t === "success" ? /* @__PURE__ */ e.jsx(O, { color: "success", children: i("statuses.success") }) : /* @__PURE__ */ e.jsx(O, { color: "error", children: i("statuses.failed") }), ws = ({
  userId: t,
  request: i = (s) => t ? b.authorization.getUserLogs({ id: t, ...s }) : b.authorization.getCurrentUserLogs(s),
  columnsFilter: n = (s) => s
}) => {
  const { t: s } = C("authorization"), { t: r } = C("common"), [o, a] = h({
    current: 1,
    pageSize: 10,
    total: 0
  }), [c, d] = h({}), [p] = v.useForm(), { loading: u, run: m, data: { data: l } = {} } = F(async (f = c, y = 1, j = 10) => i({
    ...f,
    current: y ?? 1,
    page_size: j ?? 10
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
  D(() => {
    m(c, 1, o.pageSize);
  }, []);
  const x = (f) => {
    a({
      ...o,
      current: f.current,
      pageSize: f.pageSize
    }), m({}, f.current, f.pageSize);
  }, g = (f) => {
    var y, j, I, z;
    m({
      ...f,
      start_time: (j = (y = f.dateRange) == null ? void 0 : y[0]) == null ? void 0 : j.toISOString(),
      end_time: (z = (I = f.dateRange) == null ? void 0 : I[1]) == null ? void 0 : z.toISOString()
    }, 1, o.pageSize);
  }, k = () => {
    p.resetFields(), d({}), a({ ...o, current: 1 }), m({}, 1, o.pageSize);
  }, A = [
    {
      title: s("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (f) => Se(f)
    },
    {
      title: s("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (f, y) => f ? s(`action.${f.replace(":", ".")}`, { defaultValue: y.action_name }) : y.action_name ?? y.action
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
      render: (f) => Mt(f, s)
    },
    {
      title: s("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (f) => /* @__PURE__ */ e.jsx(w, { type: "link", icon: /* @__PURE__ */ e.jsx(he, {}), onClick: () => {
        U.info({
          title: s("auditLog.details"),
          content: JSON.stringify(f)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(R, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      v,
      {
        form: p,
        layout: "horizontal",
        onFinish: g,
        initialValues: c,
        children: /* @__PURE__ */ e.jsxs(Me, { gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(P, { xxl: 6, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(v.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(T, { placeholder: s("auditLog.searchPlaceholder") }) }) }),
          /* @__PURE__ */ e.jsx(P, { xxl: 4, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(v.Item, { name: "action", noStyle: !0, children: /* @__PURE__ */ e.jsxs(N, { allowClear: !0, placeholder: s("auditLog.selectAction"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(M, { value: "login", children: s("actions.login") }),
            /* @__PURE__ */ e.jsx(M, { value: "logout", children: s("actions.logout") }),
            /* @__PURE__ */ e.jsx(M, { value: "password_reset", children: s("actions.passwordReset") }),
            /* @__PURE__ */ e.jsx(M, { value: "mfa_change", children: s("actions.mfaChange") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(P, { xxl: 3, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(v.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(N, { allowClear: !0, placeholder: s("auditLog.selectStatus"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(M, { value: "success", children: s("statuses.success") }),
            /* @__PURE__ */ e.jsx(M, { value: "failed", children: s("statuses.failed") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(P, { xxl: 6, xl: 6, lg: 10, md: 12, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(v.Item, { name: "dateRange", noStyle: !0, children: /* @__PURE__ */ e.jsx(_t, { style: { width: "100%" } }) }) }),
          /* @__PURE__ */ e.jsx(P, { xxl: 5, xl: 24, lg: 14, md: 24, sm: 24, xs: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(L, { children: [
            /* @__PURE__ */ e.jsx(w, { onClick: k, children: r("reset") }),
            /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Xe, {}), children: r("search") })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(R, { children: /* @__PURE__ */ e.jsx(
      Z,
      {
        rowKey: "id",
        columns: n(A),
        dataSource: l,
        pagination: {
          ...o,
          showSizeChanger: !0,
          showTotal: (f) => r("totalItems", { total: f })
        },
        loading: u,
        onChange: x,
        scroll: { x: "max-content" }
      }
    ) })
  ] });
}, { Text: le } = Q, Et = {
  debug: "default",
  info: "processing",
  warn: "warning",
  error: "error"
}, bs = ({ taskId: t, poll: i }) => {
  const { t: n } = C("task"), { data: s = [], loading: r } = F(
    () => t ? b.tasks.getTaskLogs({ id: t }) : Promise.reject(new Error("No task id")),
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
            o.level && /* @__PURE__ */ e.jsxs(le, { type: Et[o.level], style: { marginLeft: 8, fontSize: 11 }, children: [
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
  xt as A,
  St as C,
  ms as D,
  Y as H,
  At as J,
  ie as L,
  hs as M,
  os as O,
  is as P,
  ds as R,
  cs as T,
  ws as U,
  as as a,
  us as b,
  yt as c,
  ps as d,
  ft as e,
  ee as f,
  wt as g,
  ls as h,
  fs as i,
  xs as j,
  gs as k,
  ys as l,
  js as m,
  vs as n,
  bs as o
};
