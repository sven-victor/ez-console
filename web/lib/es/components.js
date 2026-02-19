import { j as e, I as pe, a as he } from "./vendor.js";
import { Navigate as Q, useNavigate as xe } from "react-router-dom";
import { a as ae, b as K, c as ie, d as ge } from "./contexts.js";
import { g as fe, f as je, c as ye } from "./base.js";
import { Spin as ve, Result as q, Dropdown as oe, Avatar as we, Upload as be, Modal as V, Popover as Se, List as E, Divider as le, Skeleton as ke, Progress as Ie, Typography as ce, Button as v, Tag as D, Popconfirm as W, Tooltip as Ce, Space as L, Input as S, Table as G, Form as x, message as w, Card as O, Segmented as Fe, Steps as Le, Alert as Z, QRCode as Te, Empty as Ae, Row as Y, Col as M, Select as A, DatePicker as ze, Checkbox as ee, Switch as _e, InputNumber as Pe } from "antd";
import { useTranslation as b } from "react-i18next";
import { createStyles as J } from "antd-style";
import * as Me from "@ant-design/icons";
import { UploadOutlined as De, CheckOutlined as Re, TeamOutlined as Ee, UnorderedListOutlined as Oe, DownloadOutlined as Ve, MoreOutlined as $e, PlusOutlined as Ne, ClockCircleFilled as Be, MailOutlined as He, EyeOutlined as de, EyeInvisibleOutlined as Ue, LaptopOutlined as qe, EnvironmentOutlined as We, GlobalOutlined as Ke, ClockCircleOutlined as Ge, SearchOutlined as Je, ReloadOutlined as Xe } from "@ant-design/icons";
import P from "classnames";
import { a as k } from "./index.js";
import Qe, { useState as j, useEffect as $, useCallback as N, Suspense as Ze, forwardRef as Ye, useImperativeHandle as et, useMemo as te } from "react";
import { useRequest as z } from "ahooks";
import { XMarkdown as tt } from "@ant-design/x-markdown";
import { Mermaid as st, CodeHighlighter as nt } from "@ant-design/x";
import { b as B, A as rt } from "./client.js";
import { isString as at } from "lodash-es";
const se = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(ve, { size: "large" }) }), Ot = ({
  element: t,
  requiredPermission: r,
  requiredPermissions: n
}) => {
  const { t: s } = b(), { user: l, loading: c, error: i } = ae(), { hasPermission: u, hasAllPermissions: o } = K();
  return c ? /* @__PURE__ */ e.jsx(se, {}) : i ? i.code === "E4011" ? /* @__PURE__ */ e.jsx(se, {}) : /* @__PURE__ */ e.jsx(
    q,
    {
      status: "500",
      title: "500",
      subTitle: s("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (i == null ? void 0 : i.message) || i })
    }
  ) : l ? r && !u(r) ? /* @__PURE__ */ e.jsx(Q, { to: "/forbidden", replace: !0 }) : n && !o(n) ? /* @__PURE__ */ e.jsx(Q, { to: "/forbidden", replace: !0 }) : t : (window.location.href = fe("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, it = J(({ token: t, css: r }) => ({
  container: r`
      ${r`
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
})), X = ({
  overlayClassName: t,
  overlay: r,
  hidden: n,
  children: s,
  ...l
}) => {
  if (n)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: c } = it();
  return /* @__PURE__ */ e.jsx(
    oe,
    {
      dropdownRender: r,
      overlayClassName: P(c.container, t),
      ...l,
      children: /* @__PURE__ */ e.jsx("span", { className: c.iconStyle, children: s })
    }
  );
}, ot = () => /* @__PURE__ */ e.jsxs(
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
), lt = J(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), ct = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], Vt = ({
  transformLangConfig: t = (n) => n,
  className: r
}) => {
  const { i18n: n } = b(), { styles: s } = lt(), l = (i) => {
    n.changeLanguage(i);
  }, c = {
    selectedKeys: [n.language],
    onClick: (i) => {
      l(i.key);
    },
    items: t(ct).map((i) => ({
      key: i.lang,
      className: s.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (i == null ? void 0 : i.label) || "en-US", className: s.menuItemIconStyle, children: (i == null ? void 0 : i.icon) || "🌐" }),
        (i == null ? void 0 : i.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    X,
    {
      className: r,
      menu: c,
      children: /* @__PURE__ */ e.jsx(ot, {})
    }
  );
}, dt = J(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), ue = (t) => at(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? B.endsWith("/") ? B + `files/${t}` : B + `/files/${t}` : t, ut = ({ src: t, fallback: r, ...n }) => /* @__PURE__ */ e.jsx(we, { src: ue(t), icon: r, ...n }), mt = ({ onChange: t, shape: r = "square" }) => {
  const [n, s] = j([]), { styles: l } = dt(), [c, i] = j(!1), [u, o] = j(!0), [p, m] = j(0), { run: d, loading: a } = z(() => k.base.listFiles({ current: p + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: f }) => {
      s([...n, ...f]), o(f.length === 40), m(p + 1);
    }
  }), y = () => {
    o(!0), m(0), s([]);
  };
  return /* @__PURE__ */ e.jsx(
    Se,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (f) => {
        i(f), f ? d() : y();
      },
      open: c,
      content: /* @__PURE__ */ e.jsx("div", { style: { width: 360, height: 200 }, children: /* @__PURE__ */ e.jsx(
        "div",
        {
          id: "iconsScrollableDiv",
          style: {
            height: "100%",
            overflow: "auto"
          },
          children: /* @__PURE__ */ e.jsx(
            he,
            {
              dataLength: n.length,
              next: () => {
                d();
              },
              hasMore: u,
              loader: /* @__PURE__ */ e.jsx(ke, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(le, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                E,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: a,
                  renderItem: ({ id: f }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: l.avatarItem,
                      onClick: (g) => {
                        g.stopPropagation(), t == null || t(f), i(!1), y();
                      },
                      children: /* @__PURE__ */ e.jsx(ut, { shape: r, src: f })
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
        De,
        {
          shape: r,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, pt = ({ value: t, onChange: r, shape: n, ...s }) => {
  const [l, c] = j(void 0), [i, u] = j(!1), [o, p] = j(void 0), m = async (d) => {
    u(!0), p(d.url ?? d.preview);
  };
  return $(() => {
    c(t ? {
      uid: t,
      name: t,
      url: ue(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      pe,
      {
        beforeCrop: async (d) => {
          if (d.type === "image/svg+xml") {
            const a = await k.base.uploadFile({ type: "avatar" }, d);
            return a.length > 0 && (r == null || r(a[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          be,
          {
            customRequest: async (d) => {
              var y, f;
              const a = await k.base.uploadFile({ type: "avatar", access: "public" }, d.file);
              a.length > 0 ? ((y = d.onSuccess) == null || y.call(d, a[0].id), r == null || r(a[0].id)) : (f = d.onError) == null || f.call(d, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: m,
            maxCount: 1,
            onChange: ({ file: d }) => {
              switch (d.status) {
                case "removed":
                  r == null || r(void 0);
                  break;
                case "done":
                  break;
                default:
                  c(d);
                  break;
              }
            },
            fileList: l ? [l] : [],
            ...s,
            children: l ? void 0 : /* @__PURE__ */ e.jsx(mt, { shape: n, onChange: r })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(V, { open: i, footer: null, onCancel: () => u(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: o }) })
  ] });
}, $t = ({ className: t }) => {
  const { t: r } = b("common"), { user: n } = ae(), { currentOrgId: s, setCurrentOrgId: l } = ie(), c = (n == null ? void 0 : n.organizations) || [], i = (m) => {
    l(m), window.location.reload();
  };
  if (c.length === 0)
    return null;
  const u = c.find((m) => m.id === s), o = u ? u.name : r("organization.global", { defaultValue: "Global" }), p = [
    ...c.map((m) => ({
      key: m.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: m.name }),
        s === m.id && /* @__PURE__ */ e.jsx(Re, {})
      ] }),
      onClick: () => i(m.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    X,
    {
      className: t,
      menu: {
        items: p,
        selectedKeys: s ? [s] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(Ee, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: o })
      ]
    }
  );
}, ht = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Nt = ({ className: t }) => {
  const { t: r } = b("task"), n = xe(), { tasks: s, tasksDropdownOpen: l, setTasksDropdownOpen: c } = ie(), i = async (o) => {
    const p = await k.base.downloadFile({ fileKey: o }, { params: { method: "sign" } }), m = `/api/files/${o}?signature=${p.signature}&expires=${p.expires}`;
    window.open(m, "_blank");
  }, u = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      E,
      {
        size: "small",
        dataSource: s,
        renderItem: (o) => /* @__PURE__ */ e.jsx(
          E.Item,
          {
            extra: /* @__PURE__ */ e.jsx(D, { color: ht[o.status], style: { marginLeft: 6 }, children: r(`status.${o.status}`, { defaultValue: o.status }) }),
            actions: [
              o.artifact_file_key && /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx(Ve, {}),
                  onClick: () => i(o.artifact_file_key)
                }
              )
            ].filter(Boolean),
            children: /* @__PURE__ */ e.jsx(
              E.Item.Meta,
              {
                title: /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13 }, children: /* @__PURE__ */ e.jsxs(ce.Text, { ellipsis: { tooltip: !0 }, children: [
                  r(`type.${o.type}`, { defaultValue: o.type }),
                  " ",
                  o.artifact_file_name && `- ${o.artifact_file_name}`
                ] }) }),
                description: (o.status === "running" || o.status === "pending") && /* @__PURE__ */ e.jsx(Ie, { percent: o.progress ?? 0, size: "small", style: { marginTop: 4 } })
              }
            )
          },
          o.id
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(v, { type: "link", size: "small", onClick: () => n("/tasks"), children: r("more", { defaultValue: "More" }) }) })
  ] });
  return !s || s.length === 0 ? null : /* @__PURE__ */ e.jsxs(X, { className: t, overlay: u, placement: "bottomRight", open: l, onOpenChange: c, children: [
    /* @__PURE__ */ e.jsx(Oe, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: r("tasks", { defaultValue: "Tasks" }) })
  ] });
}, Bt = ({
  onResize: t,
  minWidth: r = 300,
  maxWidth: n = window.innerWidth * 0.5
}) => {
  const [s, l] = j(!1), [c, i] = j(!1), u = N((m) => {
    m.preventDefault(), l(!0);
  }, []), o = N(
    (m) => {
      if (!s) return;
      const d = window.innerWidth - m.clientX, a = Math.max(r, Math.min(n, d));
      t(a);
    },
    [s, r, n, t]
  ), p = N(() => {
    l(!1);
  }, []);
  return $(() => {
    if (s)
      return document.addEventListener("mousemove", o), document.addEventListener("mouseup", p), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", o), document.removeEventListener("mouseup", p), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [s, o, p]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: u,
      onMouseEnter: () => i(!0),
      onMouseLeave: () => i(!1),
      style: {
        width: "8px",
        height: "100vh",
        cursor: "col-resize",
        position: "relative",
        flexShrink: 0,
        transition: s ? "none" : "background-color 0.2s ease",
        backgroundColor: s ? "#1890ff" : c ? "#bfbfbf" : "#e8e8e8",
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
            backgroundColor: s || c ? "#fff" : "#999",
            opacity: s || c ? 1 : 0.5,
            transition: "opacity 0.2s ease",
            pointerEvents: "none"
          }
        }
      )
    }
  );
}, me = ({
  permission: t,
  permissions: r = [],
  checkAll: n = !1,
  fallback: s = null,
  children: l
}) => {
  const { hasPermission: c, hasAnyPermission: i, hasAllPermissions: u, isAdmin: o, loading: p } = K();
  return p ? null : o ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : t ? c(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : r.length > 0 ? (n ? u(r) : i(r)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: l });
}, Ht = ({
  fallback: t = null,
  children: r
}) => {
  const { isAdmin: n, loading: s } = K();
  return s ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, ne = (t) => {
  const [r, n] = j(!1), { permission: s, icon: l, tooltip: c, onClick: i, confirm: u, label: o, ...p } = t, m = i ? async () => {
    n(!0);
    try {
      await i();
    } finally {
      n(!1);
    }
  } : void 0;
  let d = /* @__PURE__ */ e.jsx(
    v,
    {
      type: "text",
      size: "small",
      loading: r,
      icon: l,
      onClick: u ? void 0 : m,
      ...p,
      children: o && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: o })
    }
  );
  if (c && (d = /* @__PURE__ */ e.jsx(Ce, { title: c, children: d })), u) {
    const a = async () => {
      u.onConfirm ? u.onConfirm() : m && await m();
    };
    d = /* @__PURE__ */ e.jsx(
      W,
      {
        title: u.title,
        description: u.description,
        onConfirm: a,
        okText: u.okText,
        cancelText: u.cancelText,
        children: d
      }
    );
  }
  return s && (d = /* @__PURE__ */ e.jsx(me, { permission: s, children: d })), d;
}, Ut = ({ actions: t, maxVisibleItems: r }) => {
  const n = t.filter((i) => !i.hidden);
  if (!r || n.length <= r)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: n.map(({ key: i, ...u }) => /* @__PURE__ */ e.jsx(ne, { ...u }, i)) });
  const s = n.slice(0, r - 1), c = n.slice(r - 1).map((i) => {
    const { key: u, label: o, icon: p, permission: m, onClick: d, confirm: a, disabled: y, tooltip: f } = i, I = {
      key: u,
      label: o,
      icon: p,
      disabled: y,
      onClick: async () => {
        a ? V.confirm({
          title: a.title,
          content: a.description,
          onOk: a.onConfirm,
          okText: a.okText,
          cancelText: a.cancelText
        }) : d && await d();
      }
    };
    return m ? {
      ...I,
      label: /* @__PURE__ */ e.jsx(me, { permission: m, children: /* @__PURE__ */ e.jsx("span", { children: o ?? f }) })
    } : I;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    s.map(({ key: i, ...u }) => /* @__PURE__ */ e.jsx(ne, { ...u }, i)),
    /* @__PURE__ */ e.jsx(oe, { menu: { items: c }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(v, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx($e, {}) }) })
  ] });
}, xt = Me, gt = (t) => xt[t], qt = ({ iconName: t }) => {
  if (!t)
    return null;
  const r = gt(t);
  return r ? /* @__PURE__ */ e.jsx(Ze, { fallback: null, children: /* @__PURE__ */ e.jsx(r, {}) }) : null;
}, Wt = ({ onChange: t }) => {
  const [r, n] = j(""), [s, l] = j("");
  return /* @__PURE__ */ e.jsxs(L.Compact, { children: [
    /* @__PURE__ */ e.jsx(S, { style: { width: "calc(100% - 80px)" }, value: r, onChange: (c) => n(c.target.value) }),
    /* @__PURE__ */ e.jsx(S, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(S, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (c) => l(c.target.value) }),
    /* @__PURE__ */ e.jsx(v, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ne, {}), onClick: () => {
      t(r, s);
    } })
  ] });
}, ft = ({ request: t, tableRef: r, ...n }, s) => {
  const [l, c] = j({
    current: 1,
    pageSize: 10
  }), [i, u] = j(0), { data: o, loading: p, refresh: m } = z(async () => {
    const d = await t({
      current: l.current,
      page_size: l.pageSize
    });
    return u(d.total), d.data;
  }, {
    refreshDeps: [l]
  });
  return et(s, () => ({
    reload: () => {
      m();
    }
  })), /* @__PURE__ */ e.jsx(
    G,
    {
      rowKey: "id",
      loading: p,
      dataSource: o ?? [],
      pagination: {
        ...l,
        total: i,
        onChange: (d, a) => {
          c({ current: d, pageSize: a });
        }
      },
      ...n,
      ref: r
    }
  );
}, Kt = ({ actionRef: t, ...r }) => {
  const [n, s] = j();
  return $(() => {
    s(Ye(ft));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...r, ref: t }) : null;
}, jt = (t) => {
  var l;
  const { className: r, children: n } = t, s = ((l = r == null ? void 0 : r.match(/language-(\w+)/)) == null ? void 0 : l[1]) || "";
  return typeof n != "string" ? null : s === "mermaid" ? /* @__PURE__ */ e.jsx(st, { children: n }) : /* @__PURE__ */ e.jsx(nt, { lang: s, children: n });
}, Gt = ({
  content: t,
  className: r,
  style: n,
  paragraphTag: s = "div",
  rootClassName: l,
  components: c = { code: jt }
}) => /* @__PURE__ */ e.jsx(
  tt,
  {
    content: t,
    className: r,
    style: n,
    components: c,
    paragraphTag: s,
    rootClassName: l
  }
), Jt = ({ className: t, onSuccess: r, token: n }) => {
  const { t: s } = b("authorization"), { t: l } = b("common"), [c] = x.useForm(), { run: i, loading: u } = z(async (o) => k.authorization.changePassword(o, n ? { headers: { Authorization: `Bearer ${n}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      w.success(s("user.passwordChanged")), c.resetFields(), r == null || r();
    },
    onError: (o) => {
      if (o instanceof rt) {
        const p = o.code ?? "normal";
        w.error(s(`user.passwordChangeFailed.${p}`, { error: o.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        w.error(s("user.passwordChangeFailed.normal", { error: o.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", o);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    x,
    {
      form: c,
      layout: "vertical",
      onFinish: i,
      style: { maxWidth: 500, margin: "0 auto" },
      className: P("profile-password", t),
      children: [
        /* @__PURE__ */ e.jsx(
          x.Item,
          {
            name: "old_password",
            label: s("user.oldPassword"),
            rules: [{ required: !0, message: s("validation.oldPasswordRequired") }],
            className: P("profile-password-item", "profile-password-item-old-password"),
            children: /* @__PURE__ */ e.jsx(S.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          x.Item,
          {
            name: "new_password",
            label: s("user.newPassword"),
            rules: [
              { required: !0, message: s("validation.newPasswordRequired") },
              { min: 8, message: s("validation.passwordMinLength") }
            ],
            className: P("profile-password-item", "profile-password-item-new-password"),
            children: /* @__PURE__ */ e.jsx(S.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          x.Item,
          {
            name: "confirm_password",
            label: s("user.confirmPassword"),
            className: P("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: s("validation.confirmPasswordRequired") },
              ({ getFieldValue: o }) => ({
                validator(p, m) {
                  return !m || o("new_password") === m ? Promise.resolve() : Promise.reject(new Error(s("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(S.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(x.Item, { className: P("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: u, children: l("save") }) })
      ]
    }
  );
}, Xt = ({ user: t, onSuccess: r }) => {
  const { t: n } = b("authorization"), { t: s } = b("common"), [l] = x.useForm(), [c, i] = j(!1);
  Qe.useEffect(() => {
    t && l.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, l]);
  const u = async (o) => {
    try {
      i(!0), await k.authorization.updateCurrentUser(o), w.success(s("updateSuccess")), r();
    } catch (p) {
      w.error(s("updateFailed")), console.error("Failed to update user information:", p);
    } finally {
      i(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }),
      (t == null ? void 0 : t.roles) && t.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        n("user.roles"),
        ": ",
        t.roles.map((o) => o.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      x,
      {
        form: l,
        layout: "vertical",
        onFinish: u,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            x.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(pt, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            x.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(S, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            x.Item,
            {
              name: "email",
              label: n("user.email"),
              rules: [
                { required: !0, message: n("validation.emailRequired") },
                { type: "email", message: n("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(S, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            x.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(S, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            x.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(S, {})
            }
          ),
          /* @__PURE__ */ e.jsx(x.Item, { children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: c, children: s("save") }) })
        ]
      }
    )
  ] });
}, Qt = ({ user: t, onSuccess: r }) => {
  const { t: n } = b("authorization"), { t: s } = b("common"), [l, c] = j(0), [i, u] = j(!1), [o, p] = j(!0), [m, d] = j(""), [a, y] = j("totp"), { run: f, data: g = { secret: "", qr_code: "", token: void 0 } } = z(
    () => k.authorization.enableMfa(a),
    {
      manual: !0,
      onSuccess: () => {
        c(1);
      },
      onBefore: () => {
        u(!0);
      },
      onFinally: () => {
        u(!1);
      }
    }
  ), I = async () => {
    if (!m) {
      w.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const C = {
      code: m,
      mfa_type: a
    };
    "token" in g && (C.token = g.token);
    try {
      u(!0), await k.authorization.verifyAndActivateMfa(C), w.success(n("mfa.enableSuccess")), c(2), r();
    } catch (T) {
      w.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", T);
    } finally {
      u(!1);
    }
  }, h = async () => {
    try {
      u(!0), await k.authorization.disableMfa(), w.success(n("mfa.disableSuccess")), r();
    } catch (C) {
      w.error(s("operationFailed")), console.error("Failed to disable MFA:", C);
    } finally {
      u(!1);
    }
  }, F = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        q,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            v,
            {
              danger: !0,
              onClick: () => {
                V.confirm({
                  title: n("mfa.confirmDisable"),
                  content: n("mfa.disableWarning"),
                  onOk: h,
                  okButtonProps: { danger: !0 }
                });
              },
              children: n("mfa.disable")
            }
          )
        }
      );
    const C = () => {
      var T;
      switch (l) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              Z,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: n("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: n(a === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
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
                onClick: f,
                loading: i,
                children: n("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              Z,
              {
                message: n("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: a === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: a === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(Te, { value: g.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: a === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: a === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: o ? "*".repeat(((T = g.secret) == null ? void 0 : T.length) ?? 0) : g.secret }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "link",
                  onClick: () => p(!o),
                  icon: o ? /* @__PURE__ */ e.jsx(de, {}) : /* @__PURE__ */ e.jsx(Ue, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              S,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: m,
                onChange: (R) => d(R.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(L, { children: [
              /* @__PURE__ */ e.jsx(v, { onClick: () => c(0), children: s("previous") }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "primary",
                  onClick: I,
                  loading: i,
                  children: s("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            q,
            {
              status: "success",
              title: n("mfa.setupSuccess"),
              subTitle: n("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(v, { type: "primary", onClick: () => c(0), children: s("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: l === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          Fe,
          {
            defaultValue: "totp",
            onChange: (T) => {
              y(T), c(0);
            },
            value: a,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Be, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(He, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(le, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Le,
        {
          current: l,
          items: [
            { title: n(a === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(a === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(a === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(a === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(a === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(a === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      C()
    ] });
  };
  return /* @__PURE__ */ e.jsx(O, { title: n("mfa.title"), children: F() });
}, { Text: H } = ce, Zt = () => {
  const { t } = b("authorization"), { t: r } = b("common"), [n, s] = j(null), [l, c] = j(!1), { data: i = [], loading: u, run: o } = z(() => k.authorization.getUserSessions({}), {
    onError: (a) => {
      w.error(t("session.getSessionsFailed", { error: a, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: p } = z((a) => k.authorization.terminateSession({ id: a }), {
    onSuccess: () => {
      w.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" })), o();
    },
    onError: (a) => {
      w.error(t("session.terminateFailed", { error: a, defaultValue: "Failed to terminate session: {{error}}" }));
    },
    onFinally: () => {
      s(null);
    },
    onBefore: ([a]) => {
      s(a);
    },
    manual: !0
  }), { run: m } = z(() => k.authorization.terminateOtherSessions(), {
    onSuccess: () => {
      w.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" })), o();
    },
    onError: (a) => {
      w.error(t("session.terminateAllFailed", { error: a, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    },
    onFinally: () => {
      c(!1);
    },
    onBefore: () => {
      c(!0);
    },
    manual: !0
  }), d = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (a, y) => /* @__PURE__ */ e.jsxs(L, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(qe, {}),
          /* @__PURE__ */ e.jsx(H, { strong: !0, children: a })
        ] }),
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(We, {}),
          /* @__PURE__ */ e.jsx(H, { type: "secondary", children: y.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (a) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(Ke, {}),
        /* @__PURE__ */ e.jsx("span", { children: a })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (a) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(Ge, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(a).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (a) => a.is_current ? /* @__PURE__ */ e.jsx(D, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(D, { color: "blue", children: t("session.active") })
    },
    {
      title: r("actions"),
      key: "action",
      render: (a) => a.is_current ? /* @__PURE__ */ e.jsx(H, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        W,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => p(a.id),
          okText: r("confirm"),
          cancelText: r("cancel"),
          children: /* @__PURE__ */ e.jsx(
            v,
            {
              type: "link",
              danger: !0,
              loading: n === a.id,
              children: t("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsx(
    O,
    {
      title: t("session.title"),
      loading: u,
      extra: /* @__PURE__ */ e.jsxs(L, { children: [
        i.length > 1 && /* @__PURE__ */ e.jsx(
          W,
          {
            title: t("session.confirmTerminateAll"),
            onConfirm: m,
            okText: r("confirm"),
            cancelText: r("cancel"),
            children: /* @__PURE__ */ e.jsx(
              v,
              {
                danger: !0,
                loading: l,
                children: t("session.terminateOthers")
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(v, { onClick: () => o(), loading: u, children: r("refresh") })
      ] }),
      children: !u && i.length === 0 ? /* @__PURE__ */ e.jsx(Ae, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        G,
        {
          columns: d,
          dataSource: i,
          rowKey: "id",
          loading: u,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: yt } = ze, { Option: _ } = A, vt = (t) => t || "N/A", wt = (t, r) => t === "success" ? /* @__PURE__ */ e.jsx(D, { color: "success", children: r("statuses.success") }) : /* @__PURE__ */ e.jsx(D, { color: "error", children: r("statuses.failed") }), Yt = ({
  userId: t,
  request: r = (s) => t ? k.authorization.getUserLogs({ id: t, ...s }) : k.authorization.getCurrentUserLogs(s),
  columnsFilter: n = (s) => s
}) => {
  const { t: s } = b("authorization"), { t: l } = b("common"), [c, i] = j({
    current: 1,
    pageSize: 10,
    total: 0
  }), [u, o] = j({}), [p] = x.useForm(), { loading: m, run: d, data: { data: a } = {} } = z(async (h = u, F = 1, C = 10) => r({
    ...h,
    current: F ?? 1,
    page_size: C ?? 10
  }), {
    onError(h) {
      w.error(s("auditLog.fetchFailed", { error: h }));
    },
    onSuccess({ total: h }) {
      i({
        ...c,
        total: h
      });
    }
  });
  $(() => {
    d(u, 1, c.pageSize);
  }, []);
  const y = (h) => {
    i({
      ...c,
      current: h.current,
      pageSize: h.pageSize
    }), d({}, h.current, h.pageSize);
  }, f = (h) => {
    var F, C, T, R;
    d({
      ...h,
      start_time: (C = (F = h.dateRange) == null ? void 0 : F[0]) == null ? void 0 : C.toISOString(),
      end_time: (R = (T = h.dateRange) == null ? void 0 : T[1]) == null ? void 0 : R.toISOString()
    }, 1, c.pageSize);
  }, g = () => {
    p.resetFields(), o({}), i({ ...c, current: 1 }), d({}, 1, c.pageSize);
  }, I = [
    {
      title: s("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (h) => je(h)
    },
    {
      title: s("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (h, F) => h ? s(`action.${h.replace(":", ".")}`, { defaultValue: F.action_name }) : F.action_name ?? F.action
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
      render: (h) => vt(h)
    },
    {
      title: s("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (h) => wt(h, s)
    },
    {
      title: s("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (h) => /* @__PURE__ */ e.jsx(v, { type: "link", icon: /* @__PURE__ */ e.jsx(de, {}), onClick: () => {
        V.info({
          title: s("auditLog.details"),
          content: JSON.stringify(h)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(O, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      x,
      {
        form: p,
        layout: "horizontal",
        onFinish: f,
        initialValues: u,
        children: [
          /* @__PURE__ */ e.jsxs(Y, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(M, { span: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "search", label: s("auditLog.search"), children: /* @__PURE__ */ e.jsx(S, { placeholder: s("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(M, { span: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "action", label: s("auditLog.action"), children: /* @__PURE__ */ e.jsxs(A, { allowClear: !0, placeholder: s("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(_, { value: "login", children: s("actions.login") }),
              /* @__PURE__ */ e.jsx(_, { value: "logout", children: s("actions.logout") }),
              /* @__PURE__ */ e.jsx(_, { value: "password_reset", children: s("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(_, { value: "mfa_change", children: s("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(M, { span: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "status", label: s("auditLog.status"), children: /* @__PURE__ */ e.jsxs(A, { allowClear: !0, placeholder: s("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(_, { value: "success", children: s("statuses.success") }),
              /* @__PURE__ */ e.jsx(_, { value: "failed", children: s("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(M, { span: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "dateRange", label: s("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(yt, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(Y, { children: /* @__PURE__ */ e.jsx(M, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(L, { children: [
            /* @__PURE__ */ e.jsx(v, { onClick: g, children: l("reset") }),
            /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Je, {}), children: l("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(O, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        v,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Xe, {}),
          onClick: g,
          style: { marginRight: 8 },
          children: l("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        G,
        {
          rowKey: "id",
          columns: n(I),
          dataSource: a,
          pagination: {
            ...c,
            showSizeChanger: !0,
            showTotal: (h) => l("totalItems", { total: h })
          },
          loading: m,
          onChange: y,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, { TextArea: re } = S, { Option: U } = A, es = ({
  field: t,
  selectedType: r,
  dependentValues: n,
  formValues: s = {}
}) => {
  const { t: l } = b("system"), { t: c } = b("common"), i = te(() => ye(t.visible_when, s), [t.visible_when, s]), { options: u, loading: o } = ge(
    t.data_source,
    t.options,
    n
  ), p = te(() => t.data_source && t.data_source.type !== "static" ? u : t.options || [], [t.data_source, t.options, u]), m = p && p.length > 0;
  if (!i)
    return null;
  const d = [
    {
      required: t.required,
      message: l("settings.toolsets.fieldRequired", {
        defaultValue: `Please enter ${t.name}`,
        field: t.name
      })
    }
  ], a = () => l(`settings.toolsets.${r}.${t.name}`, {
    defaultValue: t.display_name || t.name
  }), y = () => l(`settings.toolsets.${r}.${t.name}Placeholder`, {
    defaultValue: t.placeholder || `${c("enter", { defaultValue: "Enter" })} ${t.name}`
  }), f = () => {
    if (t.description)
      return l(`settings.toolsets.${r}.${t.name}Tooltip`, {
        defaultValue: t.description
      });
  };
  if (!i)
    return null;
  if (t.type === "select" || t.data_source)
    return /* @__PURE__ */ e.jsx(
      x.Item,
      {
        name: ["config", t.name],
        label: a(),
        rules: d,
        tooltip: f(),
        children: /* @__PURE__ */ e.jsx(
          A,
          {
            loading: o,
            allowClear: !0,
            placeholder: y(),
            showSearch: !0,
            filterOption: (g, I) => {
              var h;
              return (h = I == null ? void 0 : I.children) == null ? void 0 : h.toLowerCase().includes(g.toLowerCase());
            },
            children: p.map((g) => /* @__PURE__ */ e.jsx(U, { value: g.value, children: g.label }, g.value))
          }
        )
      },
      t.name
    );
  switch (t.type) {
    case "text":
      return /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          children: /* @__PURE__ */ e.jsx(re, { placeholder: y(), rows: 4 })
        },
        t.name
      );
    case "string":
      return m ? /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(A, { allowClear: !0, placeholder: y(), children: p.map((g) => /* @__PURE__ */ e.jsx(U, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(S, { placeholder: y() })
        },
        t.name
      );
    case "password":
      return /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(S.Password, { placeholder: y(), autoComplete: "new-password" })
        },
        t.name
      );
    case "number":
      return m ? /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(A, { allowClear: !0, placeholder: y(), children: p.map((g) => /* @__PURE__ */ e.jsx(U, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(Pe, { style: { width: "100%" }, placeholder: y() })
        },
        t.name
      );
    case "boolean":
      return /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          valuePropName: "checked",
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(_e, {})
        },
        t.name
      );
    case "array":
      return m ? /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(ee.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(L, { direction: "vertical", children: p.map((g) => /* @__PURE__ */ e.jsx(ee, { value: g.value, children: g.label }, g.value)) }) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(
            A,
            {
              mode: "tags",
              style: { width: "100%" },
              placeholder: y(),
              tokenSeparators: [","]
            }
          )
        },
        t.name
      );
    case "object":
      return /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: [
            ...d,
            {
              validator: (g, I) => {
                if (!I) return Promise.resolve();
                try {
                  return JSON.parse(I), Promise.resolve();
                } catch {
                  return Promise.reject(
                    new Error(
                      l("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON format" })
                    )
                  );
                }
              }
            }
          ],
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(
            re,
            {
              rows: 4,
              placeholder: y()
            }
          )
        },
        t.name
      );
    default:
      return null;
  }
};
export {
  ut as A,
  jt as C,
  qt as D,
  X as H,
  se as L,
  Gt as M,
  $t as O,
  Ot as P,
  Bt as R,
  Nt as T,
  Yt as U,
  Vt as a,
  Ut as b,
  pt as c,
  Wt as d,
  ct as e,
  me as f,
  gt as g,
  Ht as h,
  Kt as i,
  Jt as j,
  Xt as k,
  Qt as l,
  Zt as m,
  es as n
};
