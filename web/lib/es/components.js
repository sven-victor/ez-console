import { j as e, I as xe, a as fe } from "./vendor.js";
import { Navigate as Y, useNavigate as je } from "react-router-dom";
import { a as le, b as K, c as ce, d as ye } from "./contexts.js";
import { g as ve, f as we, c as be } from "./base.js";
import { Spin as de, Result as q, Dropdown as ue, Avatar as Se, Upload as ke, Modal as O, Popover as Ce, List as V, Divider as me, Skeleton as Ie, Progress as Fe, Typography as G, Button as v, Tag as D, Popconfirm as W, Tooltip as Le, Space as L, Input as S, Table as J, Form as g, message as b, Card as R, Segmented as Te, Steps as Ae, Alert as ee, QRCode as ze, Empty as pe, Row as te, Col as M, Select as z, DatePicker as _e, Checkbox as se, Switch as Pe, InputNumber as Me } from "antd";
import { useTranslation as w } from "react-i18next";
import { createStyles as X } from "antd-style";
import * as De from "@ant-design/icons";
import { UploadOutlined as Re, CheckOutlined as Ee, TeamOutlined as Ve, UnorderedListOutlined as Oe, DownloadOutlined as $e, MoreOutlined as Ne, PlusOutlined as Be, ClockCircleFilled as He, MailOutlined as Ue, EyeOutlined as he, EyeInvisibleOutlined as qe, LaptopOutlined as We, EnvironmentOutlined as Ke, GlobalOutlined as Ge, ClockCircleOutlined as Je, SearchOutlined as Xe, ReloadOutlined as Qe } from "@ant-design/icons";
import P from "classnames";
import { a as k } from "./index.js";
import Ze, { useState as j, useEffect as $, useCallback as N, Suspense as Ye, forwardRef as et, useImperativeHandle as tt, useMemo as ne } from "react";
import { useRequest as A } from "ahooks";
import { XMarkdown as st } from "@ant-design/x-markdown";
import { Mermaid as nt, CodeHighlighter as rt } from "@ant-design/x";
import { b as B, A as at } from "./client.js";
import { isString as it } from "lodash-es";
const re = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(de, { size: "large" }) }), $t = ({
  element: t,
  requiredPermission: r,
  requiredPermissions: n
}) => {
  const { t: s } = w(), { user: c, loading: i, error: o } = le(), { hasPermission: u, hasAllPermissions: l } = K();
  return i ? /* @__PURE__ */ e.jsx(re, {}) : o ? o.code === "E4011" ? /* @__PURE__ */ e.jsx(re, {}) : /* @__PURE__ */ e.jsx(
    q,
    {
      status: "500",
      title: "500",
      subTitle: s("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (o == null ? void 0 : o.message) || o })
    }
  ) : c ? r && !u(r) ? /* @__PURE__ */ e.jsx(Y, { to: "/forbidden", replace: !0 }) : n && !l(n) ? /* @__PURE__ */ e.jsx(Y, { to: "/forbidden", replace: !0 }) : t : (window.location.href = ve("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, ot = X(({ token: t, css: r }) => ({
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
})), Q = ({
  overlayClassName: t,
  overlay: r,
  hidden: n,
  children: s,
  ...c
}) => {
  if (n)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: i } = ot();
  return /* @__PURE__ */ e.jsx(
    ue,
    {
      dropdownRender: r,
      overlayClassName: P(i.container, t),
      ...c,
      children: /* @__PURE__ */ e.jsx("span", { className: i.iconStyle, children: s })
    }
  );
}, lt = () => /* @__PURE__ */ e.jsxs(
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
), ct = X(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), dt = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], Nt = ({
  transformLangConfig: t = (n) => n,
  className: r
}) => {
  const { i18n: n } = w(), { styles: s } = ct(), c = (o) => {
    n.changeLanguage(o);
  }, i = {
    selectedKeys: [n.language],
    onClick: (o) => {
      c(o.key);
    },
    items: t(dt).map((o) => ({
      key: o.lang,
      className: s.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (o == null ? void 0 : o.label) || "en-US", className: s.menuItemIconStyle, children: (o == null ? void 0 : o.icon) || "🌐" }),
        (o == null ? void 0 : o.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    Q,
    {
      className: r,
      menu: i,
      children: /* @__PURE__ */ e.jsx(lt, {})
    }
  );
}, ut = X(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), ge = (t) => it(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? B.endsWith("/") ? B + `files/${t}` : B + `/files/${t}` : t, mt = ({ src: t, fallback: r, ...n }) => /* @__PURE__ */ e.jsx(Se, { src: ge(t), icon: r, ...n }), pt = ({ onChange: t, shape: r = "square" }) => {
  const [n, s] = j([]), { styles: c } = ut(), [i, o] = j(!1), [u, l] = j(!0), [p, m] = j(0), { run: d, loading: a } = A(() => k.base.listFiles({ current: p + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: f }) => {
      s([...n, ...f]), l(f.length === 40), m(p + 1);
    }
  }), y = () => {
    l(!0), m(0), s([]);
  };
  return /* @__PURE__ */ e.jsx(
    Ce,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (f) => {
        o(f), f ? d() : y();
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
            fe,
            {
              dataLength: n.length,
              next: () => {
                d();
              },
              hasMore: u,
              loader: /* @__PURE__ */ e.jsx(Ie, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(me, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                V,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: a,
                  renderItem: ({ id: f }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: c.avatarItem,
                      onClick: (x) => {
                        x.stopPropagation(), t == null || t(f), o(!1), y();
                      },
                      children: /* @__PURE__ */ e.jsx(mt, { shape: r, src: f })
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
        Re,
        {
          shape: r,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, ht = ({ value: t, onChange: r, shape: n, ...s }) => {
  const [c, i] = j(void 0), [o, u] = j(!1), [l, p] = j(void 0), m = async (d) => {
    u(!0), p(d.url ?? d.preview);
  };
  return $(() => {
    i(t ? {
      uid: t,
      name: t,
      url: ge(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      xe,
      {
        beforeCrop: async (d) => {
          if (d.type === "image/svg+xml") {
            const a = await k.base.uploadFile({ type: "avatar" }, d);
            return a.length > 0 && (r == null || r(a[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          ke,
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
                  i(d);
                  break;
              }
            },
            fileList: c ? [c] : [],
            ...s,
            children: c ? void 0 : /* @__PURE__ */ e.jsx(pt, { shape: n, onChange: r })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(O, { open: o, footer: null, onCancel: () => u(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: l }) })
  ] });
}, Bt = ({ className: t }) => {
  const { t: r } = w("common"), { user: n } = le(), { currentOrgId: s, setCurrentOrgId: c } = ce(), i = (n == null ? void 0 : n.organizations) || [], o = (m) => {
    c(m), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const u = i.find((m) => m.id === s), l = u ? u.name : r("organization.global", { defaultValue: "Global" }), p = [
    ...i.map((m) => ({
      key: m.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: m.name }),
        s === m.id && /* @__PURE__ */ e.jsx(Ee, {})
      ] }),
      onClick: () => o(m.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    Q,
    {
      className: t,
      menu: {
        items: p,
        selectedKeys: s ? [s] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(Ve, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: l })
      ]
    }
  );
}, Z = ({
  permission: t,
  permissions: r = [],
  checkAll: n = !1,
  fallback: s = null,
  children: c
}) => {
  const { hasPermission: i, hasAnyPermission: o, hasAllPermissions: u, isAdmin: l, loading: p } = K();
  return p ? null : l ? /* @__PURE__ */ e.jsx(e.Fragment, { children: c }) : t ? i(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: c }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : r.length > 0 ? (n ? u(r) : o(r)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: c }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: c });
}, Ht = ({
  fallback: t = null,
  children: r
}) => {
  const { isAdmin: n, loading: s } = K();
  return s ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, gt = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Ut = ({ className: t }) => {
  const { t: r } = w("task"), n = je(), { tasks: s, tasksDropdownOpen: c, setTasksDropdownOpen: i } = ce(), o = async (l) => {
    const p = await k.base.downloadFile({ fileKey: l }, { params: { method: "sign" } }), m = `/api/files/${l}?signature=${p.signature}&expires=${p.expires}`;
    window.open(m, "_blank");
  }, u = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      V,
      {
        size: "small",
        dataSource: s,
        renderItem: (l) => /* @__PURE__ */ e.jsx(
          V.Item,
          {
            extra: /* @__PURE__ */ e.jsx(D, { color: gt[l.status], style: { marginLeft: 6 }, children: r(`status.${l.status}`, { defaultValue: l.status }) }),
            actions: [
              l.artifact_file_key && /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx($e, {}),
                  onClick: () => o(l.artifact_file_key)
                }
              )
            ].filter(Boolean),
            children: /* @__PURE__ */ e.jsx(
              V.Item.Meta,
              {
                title: /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13 }, children: /* @__PURE__ */ e.jsxs(G.Text, { ellipsis: { tooltip: !0 }, children: [
                  r(`type.${l.type}`, { defaultValue: l.type }),
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
    /* @__PURE__ */ e.jsx(Z, { permission: "task:view", children: /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(v, { type: "link", size: "small", onClick: () => n("/tasks"), children: r("more", { defaultValue: "More" }) }) }) })
  ] });
  return !s || s.length === 0 ? null : /* @__PURE__ */ e.jsxs(Q, { className: t, overlay: u, placement: "bottomRight", open: c, onOpenChange: i, children: [
    /* @__PURE__ */ e.jsx(Oe, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: r("tasks", { defaultValue: "Tasks" }) })
  ] });
}, qt = ({
  onResize: t,
  minWidth: r = 300,
  maxWidth: n = window.innerWidth * 0.5
}) => {
  const [s, c] = j(!1), [i, o] = j(!1), u = N((m) => {
    m.preventDefault(), c(!0);
  }, []), l = N(
    (m) => {
      if (!s) return;
      const d = window.innerWidth - m.clientX, a = Math.max(r, Math.min(n, d));
      t(a);
    },
    [s, r, n, t]
  ), p = N(() => {
    c(!1);
  }, []);
  return $(() => {
    if (s)
      return document.addEventListener("mousemove", l), document.addEventListener("mouseup", p), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", p), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [s, l, p]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: u,
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
}, ae = (t) => {
  const [r, n] = j(!1), { permission: s, icon: c, tooltip: i, onClick: o, confirm: u, label: l, ...p } = t, m = o ? async () => {
    n(!0);
    try {
      await o();
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
      icon: c,
      onClick: u ? void 0 : m,
      ...p,
      children: l && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: l })
    }
  );
  if (i && (d = /* @__PURE__ */ e.jsx(Le, { title: i, children: d })), u) {
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
  return s && (d = /* @__PURE__ */ e.jsx(Z, { permission: s, children: d })), d;
}, Wt = ({ actions: t, maxVisibleItems: r }) => {
  const n = t.filter((o) => !o.hidden);
  if (!r || n.length <= r)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: n.map(({ key: o, ...u }) => /* @__PURE__ */ e.jsx(ae, { ...u }, o)) });
  const s = n.slice(0, r - 1), i = n.slice(r - 1).map((o) => {
    const { key: u, label: l, icon: p, permission: m, onClick: d, confirm: a, disabled: y, tooltip: f } = o, C = {
      key: u,
      label: l,
      icon: p,
      disabled: y,
      onClick: async () => {
        a ? O.confirm({
          title: a.title,
          content: a.description,
          onOk: a.onConfirm,
          okText: a.okText,
          cancelText: a.cancelText
        }) : d && await d();
      }
    };
    return m ? {
      ...C,
      label: /* @__PURE__ */ e.jsx(Z, { permission: m, children: /* @__PURE__ */ e.jsx("span", { children: l ?? f }) })
    } : C;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    s.map(({ key: o, ...u }) => /* @__PURE__ */ e.jsx(ae, { ...u }, o)),
    /* @__PURE__ */ e.jsx(ue, { menu: { items: i }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(v, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(Ne, {}) }) })
  ] });
}, xt = De, ft = (t) => xt[t], Kt = ({ iconName: t }) => {
  if (!t)
    return null;
  const r = ft(t);
  return r ? /* @__PURE__ */ e.jsx(Ye, { fallback: null, children: /* @__PURE__ */ e.jsx(r, {}) }) : null;
}, Gt = ({ onChange: t }) => {
  const [r, n] = j(""), [s, c] = j("");
  return /* @__PURE__ */ e.jsxs(L.Compact, { children: [
    /* @__PURE__ */ e.jsx(S, { style: { width: "calc(100% - 80px)" }, value: r, onChange: (i) => n(i.target.value) }),
    /* @__PURE__ */ e.jsx(S, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(S, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (i) => c(i.target.value) }),
    /* @__PURE__ */ e.jsx(v, { type: "primary", icon: /* @__PURE__ */ e.jsx(Be, {}), onClick: () => {
      t(r, s);
    } })
  ] });
}, jt = ({ request: t, tableRef: r, ...n }, s) => {
  const [c, i] = j({
    current: 1,
    pageSize: 10
  }), [o, u] = j(0), { data: l, loading: p, refresh: m } = A(async () => {
    const d = await t({
      current: c.current,
      page_size: c.pageSize
    });
    return u(d.total), d.data;
  }, {
    refreshDeps: [c]
  });
  return tt(s, () => ({
    reload: () => {
      m();
    }
  })), /* @__PURE__ */ e.jsx(
    J,
    {
      rowKey: "id",
      loading: p,
      dataSource: l ?? [],
      pagination: {
        ...c,
        total: o,
        onChange: (d, a) => {
          i({ current: d, pageSize: a });
        }
      },
      ...n,
      ref: r
    }
  );
}, Jt = ({ actionRef: t, ...r }) => {
  const [n, s] = j();
  return $(() => {
    s(et(jt));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...r, ref: t }) : null;
}, yt = (t) => {
  var c;
  const { className: r, children: n } = t, s = ((c = r == null ? void 0 : r.match(/language-(\w+)/)) == null ? void 0 : c[1]) || "";
  return typeof n != "string" ? null : s === "mermaid" ? /* @__PURE__ */ e.jsx(nt, { children: n }) : /* @__PURE__ */ e.jsx(rt, { lang: s, children: n });
}, Xt = ({
  content: t,
  className: r,
  style: n,
  paragraphTag: s = "div",
  rootClassName: c,
  components: i = { code: yt }
}) => /* @__PURE__ */ e.jsx(
  st,
  {
    content: t,
    className: r,
    style: n,
    components: i,
    paragraphTag: s,
    rootClassName: c
  }
), Qt = ({ className: t, onSuccess: r, token: n }) => {
  const { t: s } = w("authorization"), { t: c } = w("common"), [i] = g.useForm(), { run: o, loading: u } = A(async (l) => k.authorization.changePassword(l, n ? { headers: { Authorization: `Bearer ${n}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      b.success(s("user.passwordChanged")), i.resetFields(), r == null || r();
    },
    onError: (l) => {
      if (l instanceof at) {
        const p = l.code ?? "normal";
        b.error(s(`user.passwordChangeFailed.${p}`, { error: l.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        b.error(s("user.passwordChangeFailed.normal", { error: l.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", l);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    g,
    {
      form: i,
      layout: "vertical",
      onFinish: o,
      style: { maxWidth: 500, margin: "0 auto" },
      className: P("profile-password", t),
      children: [
        /* @__PURE__ */ e.jsx(
          g.Item,
          {
            name: "old_password",
            label: s("user.oldPassword"),
            rules: [{ required: !0, message: s("validation.oldPasswordRequired") }],
            className: P("profile-password-item", "profile-password-item-old-password"),
            children: /* @__PURE__ */ e.jsx(S.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          g.Item,
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
          g.Item,
          {
            name: "confirm_password",
            label: s("user.confirmPassword"),
            className: P("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: s("validation.confirmPasswordRequired") },
              ({ getFieldValue: l }) => ({
                validator(p, m) {
                  return !m || l("new_password") === m ? Promise.resolve() : Promise.reject(new Error(s("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(S.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(g.Item, { className: P("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: u, children: c("save") }) })
      ]
    }
  );
}, Zt = ({ user: t, onSuccess: r }) => {
  const { t: n } = w("authorization"), { t: s } = w("common"), [c] = g.useForm(), [i, o] = j(!1);
  Ze.useEffect(() => {
    t && c.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, c]);
  const u = async (l) => {
    try {
      o(!0), await k.authorization.updateCurrentUser(l), b.success(s("updateSuccess")), r();
    } catch (p) {
      b.error(s("updateFailed")), console.error("Failed to update user information:", p);
    } finally {
      o(!1);
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
      g,
      {
        form: c,
        layout: "vertical",
        onFinish: u,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            g.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(ht, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            g.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(S, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            g.Item,
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
            g.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(S, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            g.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(S, {})
            }
          ),
          /* @__PURE__ */ e.jsx(g.Item, { children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: i, children: s("save") }) })
        ]
      }
    )
  ] });
}, Yt = ({ user: t, onSuccess: r }) => {
  const { t: n } = w("authorization"), { t: s } = w("common"), [c, i] = j(0), [o, u] = j(!1), [l, p] = j(!0), [m, d] = j(""), [a, y] = j("totp"), { run: f, data: x = { secret: "", qr_code: "", token: void 0 } } = A(
    () => k.authorization.enableMfa(a),
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
  ), C = async () => {
    if (!m) {
      b.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const I = {
      code: m,
      mfa_type: a
    };
    "token" in x && (I.token = x.token);
    try {
      u(!0), await k.authorization.verifyAndActivateMfa(I), b.success(n("mfa.enableSuccess")), i(2), r();
    } catch (T) {
      b.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", T);
    } finally {
      u(!1);
    }
  }, h = async () => {
    try {
      u(!0), await k.authorization.disableMfa(), b.success(n("mfa.disableSuccess")), r();
    } catch (I) {
      b.error(s("operationFailed")), console.error("Failed to disable MFA:", I);
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
                O.confirm({
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
    const I = () => {
      var T;
      switch (c) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              ee,
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
                loading: o,
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
                style: { marginBottom: 20, display: a === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: a === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(ze, { value: x.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: a === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: a === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: l ? "*".repeat(((T = x.secret) == null ? void 0 : T.length) ?? 0) : x.secret }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "link",
                  onClick: () => p(!l),
                  icon: l ? /* @__PURE__ */ e.jsx(he, {}) : /* @__PURE__ */ e.jsx(qe, {})
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
                onChange: (E) => d(E.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(L, { children: [
              /* @__PURE__ */ e.jsx(v, { onClick: () => i(0), children: s("previous") }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "primary",
                  onClick: C,
                  loading: o,
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
              extra: /* @__PURE__ */ e.jsx(v, { type: "primary", onClick: () => i(0), children: s("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: c === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          Te,
          {
            defaultValue: "totp",
            onChange: (T) => {
              y(T), i(0);
            },
            value: a,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(He, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Ue, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(me, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Ae,
        {
          current: c,
          items: [
            { title: n(a === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(a === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(a === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(a === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(a === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(a === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      I()
    ] });
  };
  return /* @__PURE__ */ e.jsx(R, { title: n("mfa.title"), children: F() });
}, { Text: H } = G, es = () => {
  const { t } = w("authorization"), { t: r } = w("common"), [n, s] = j(null), [c, i] = j(!1), { data: o = [], loading: u, run: l } = A(() => k.authorization.getUserSessions({}), {
    onError: (a) => {
      b.error(t("session.getSessionsFailed", { error: a, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: p } = A((a) => k.authorization.terminateSession({ id: a }), {
    onSuccess: () => {
      b.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" })), l();
    },
    onError: (a) => {
      b.error(t("session.terminateFailed", { error: a, defaultValue: "Failed to terminate session: {{error}}" }));
    },
    onFinally: () => {
      s(null);
    },
    onBefore: ([a]) => {
      s(a);
    },
    manual: !0
  }), { run: m } = A(() => k.authorization.terminateOtherSessions(), {
    onSuccess: () => {
      b.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" })), l();
    },
    onError: (a) => {
      b.error(t("session.terminateAllFailed", { error: a, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    },
    onFinally: () => {
      i(!1);
    },
    onBefore: () => {
      i(!0);
    },
    manual: !0
  }), d = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (a, y) => /* @__PURE__ */ e.jsxs(L, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(We, {}),
          /* @__PURE__ */ e.jsx(H, { strong: !0, children: a })
        ] }),
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(Ke, {}),
          /* @__PURE__ */ e.jsx(H, { type: "secondary", children: y.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (a) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(Ge, {}),
        /* @__PURE__ */ e.jsx("span", { children: a })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (a) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(Je, {}),
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
    R,
    {
      title: t("session.title"),
      loading: u,
      extra: /* @__PURE__ */ e.jsxs(L, { children: [
        o.length > 1 && /* @__PURE__ */ e.jsx(
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
                loading: c,
                children: t("session.terminateOthers")
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(v, { onClick: () => l(), loading: u, children: r("refresh") })
      ] }),
      children: !u && o.length === 0 ? /* @__PURE__ */ e.jsx(pe, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        J,
        {
          columns: d,
          dataSource: o,
          rowKey: "id",
          loading: u,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: vt } = _e, { Option: _ } = z, wt = (t) => t || "N/A", bt = (t, r) => t === "success" ? /* @__PURE__ */ e.jsx(D, { color: "success", children: r("statuses.success") }) : /* @__PURE__ */ e.jsx(D, { color: "error", children: r("statuses.failed") }), ts = ({
  userId: t,
  request: r = (s) => t ? k.authorization.getUserLogs({ id: t, ...s }) : k.authorization.getCurrentUserLogs(s),
  columnsFilter: n = (s) => s
}) => {
  const { t: s } = w("authorization"), { t: c } = w("common"), [i, o] = j({
    current: 1,
    pageSize: 10,
    total: 0
  }), [u, l] = j({}), [p] = g.useForm(), { loading: m, run: d, data: { data: a } = {} } = A(async (h = u, F = 1, I = 10) => r({
    ...h,
    current: F ?? 1,
    page_size: I ?? 10
  }), {
    onError(h) {
      b.error(s("auditLog.fetchFailed", { error: h }));
    },
    onSuccess({ total: h }) {
      o({
        ...i,
        total: h
      });
    }
  });
  $(() => {
    d(u, 1, i.pageSize);
  }, []);
  const y = (h) => {
    o({
      ...i,
      current: h.current,
      pageSize: h.pageSize
    }), d({}, h.current, h.pageSize);
  }, f = (h) => {
    var F, I, T, E;
    d({
      ...h,
      start_time: (I = (F = h.dateRange) == null ? void 0 : F[0]) == null ? void 0 : I.toISOString(),
      end_time: (E = (T = h.dateRange) == null ? void 0 : T[1]) == null ? void 0 : E.toISOString()
    }, 1, i.pageSize);
  }, x = () => {
    p.resetFields(), l({}), o({ ...i, current: 1 }), d({}, 1, i.pageSize);
  }, C = [
    {
      title: s("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (h) => we(h)
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
      render: (h) => wt(h)
    },
    {
      title: s("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (h) => bt(h, s)
    },
    {
      title: s("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (h) => /* @__PURE__ */ e.jsx(v, { type: "link", icon: /* @__PURE__ */ e.jsx(he, {}), onClick: () => {
        O.info({
          title: s("auditLog.details"),
          content: JSON.stringify(h)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(R, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      g,
      {
        form: p,
        layout: "horizontal",
        onFinish: f,
        initialValues: u,
        children: [
          /* @__PURE__ */ e.jsxs(te, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(M, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "search", label: s("auditLog.search"), children: /* @__PURE__ */ e.jsx(S, { placeholder: s("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(M, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "action", label: s("auditLog.action"), children: /* @__PURE__ */ e.jsxs(z, { allowClear: !0, placeholder: s("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(_, { value: "login", children: s("actions.login") }),
              /* @__PURE__ */ e.jsx(_, { value: "logout", children: s("actions.logout") }),
              /* @__PURE__ */ e.jsx(_, { value: "password_reset", children: s("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(_, { value: "mfa_change", children: s("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(M, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "status", label: s("auditLog.status"), children: /* @__PURE__ */ e.jsxs(z, { allowClear: !0, placeholder: s("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(_, { value: "success", children: s("statuses.success") }),
              /* @__PURE__ */ e.jsx(_, { value: "failed", children: s("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(M, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "dateRange", label: s("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(vt, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(te, { children: /* @__PURE__ */ e.jsx(M, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(L, { children: [
            /* @__PURE__ */ e.jsx(v, { onClick: x, children: c("reset") }),
            /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Xe, {}), children: c("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(R, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        v,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Qe, {}),
          onClick: x,
          style: { marginRight: 8 },
          children: c("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        J,
        {
          rowKey: "id",
          columns: n(C),
          dataSource: a,
          pagination: {
            ...i,
            showSizeChanger: !0,
            showTotal: (h) => c("totalItems", { total: h })
          },
          loading: m,
          onChange: y,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, { TextArea: ie } = S, { Option: U } = z, ss = ({
  field: t,
  selectedType: r,
  dependentValues: n,
  formValues: s = {}
}) => {
  const { t: c } = w("system"), { t: i } = w("common"), o = ne(() => be(t.visible_when, s), [t.visible_when, s]), { options: u, loading: l } = ye(
    t.data_source,
    t.options,
    n
  ), p = ne(() => t.data_source && t.data_source.type !== "static" ? u : t.options || [], [t.data_source, t.options, u]), m = p && p.length > 0;
  if (!o)
    return null;
  const d = [
    {
      required: t.required,
      message: c("settings.toolsets.fieldRequired", {
        defaultValue: `Please enter ${t.name}`,
        field: t.name
      })
    }
  ], a = () => c(`settings.toolsets.${r}.${t.name}`, {
    defaultValue: t.display_name || t.name
  }), y = () => c(`settings.toolsets.${r}.${t.name}Placeholder`, {
    defaultValue: t.placeholder || `${i("enter", { defaultValue: "Enter" })} ${t.name}`
  }), f = () => {
    if (t.description)
      return c(`settings.toolsets.${r}.${t.name}Tooltip`, {
        defaultValue: t.description
      });
  };
  if (!o)
    return null;
  if (t.type === "select" || t.data_source)
    return /* @__PURE__ */ e.jsx(
      g.Item,
      {
        name: ["config", t.name],
        label: a(),
        rules: d,
        tooltip: f(),
        children: /* @__PURE__ */ e.jsx(
          z,
          {
            loading: l,
            allowClear: !0,
            placeholder: y(),
            showSearch: !0,
            filterOption: (x, C) => {
              var h;
              return (h = C == null ? void 0 : C.children) == null ? void 0 : h.toLowerCase().includes(x.toLowerCase());
            },
            children: p.map((x) => /* @__PURE__ */ e.jsx(U, { value: x.value, children: x.label }, x.value))
          }
        )
      },
      t.name
    );
  switch (t.type) {
    case "text":
      return /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          children: /* @__PURE__ */ e.jsx(ie, { placeholder: y(), rows: 4 })
        },
        t.name
      );
    case "string":
      return m ? /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(z, { allowClear: !0, placeholder: y(), children: p.map((x) => /* @__PURE__ */ e.jsx(U, { value: x.value, children: x.label }, x.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        g.Item,
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
        g.Item,
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
        g.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(z, { allowClear: !0, placeholder: y(), children: p.map((x) => /* @__PURE__ */ e.jsx(U, { value: x.value, children: x.label }, x.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(Me, { style: { width: "100%" }, placeholder: y() })
        },
        t.name
      );
    case "boolean":
      return /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: a(),
          valuePropName: "checked",
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(Pe, {})
        },
        t.name
      );
    case "array":
      return m ? /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(se.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(L, { direction: "vertical", children: p.map((x) => /* @__PURE__ */ e.jsx(se, { value: x.value, children: x.label }, x.value)) }) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: d,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(
            z,
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
        g.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: [
            ...d,
            {
              validator: (x, C) => {
                if (!C) return Promise.resolve();
                try {
                  return JSON.parse(C), Promise.resolve();
                } catch {
                  return Promise.reject(
                    new Error(
                      c("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON format" })
                    )
                  );
                }
              }
            }
          ],
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(
            ie,
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
}, { Text: oe } = G, St = {
  debug: "default",
  info: "processing",
  warn: "warning",
  error: "error"
}, ns = ({ taskId: t, poll: r }) => {
  const { t: n } = w("task"), { data: s = [], loading: c } = A(
    () => t ? k.tasks.getTaskLogs({ id: t }) : Promise.reject(new Error("No task id")),
    {
      refreshDeps: [t],
      ready: !!t,
      pollingInterval: r ? 2e3 : 0
    }
  );
  return /* @__PURE__ */ e.jsx(
    R,
    {
      title: n("logsTitle", { defaultValue: "Task logs" }),
      size: "small",
      style: { marginTop: 16 },
      children: c && !s.length ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 24 }, children: /* @__PURE__ */ e.jsx(de, {}) }) : s.length ? /* @__PURE__ */ e.jsx(
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
            /* @__PURE__ */ e.jsx(oe, { type: "secondary", style: { fontSize: 11 }, children: i.created_at }),
            i.level && /* @__PURE__ */ e.jsxs(oe, { type: St[i.level], style: { marginLeft: 8, fontSize: 11 }, children: [
              "[",
              i.level,
              "]"
            ] }),
            /* @__PURE__ */ e.jsx("div", { style: { display: "inline", marginLeft: 8 }, children: i.message })
          ] }, i.id))
        }
      ) : /* @__PURE__ */ e.jsx(pe, { description: n("noLogs", { defaultValue: "No logs yet." }) })
    }
  );
};
export {
  mt as A,
  yt as C,
  Kt as D,
  Q as H,
  re as L,
  Xt as M,
  Bt as O,
  $t as P,
  qt as R,
  Ut as T,
  ts as U,
  Nt as a,
  Wt as b,
  ht as c,
  Gt as d,
  dt as e,
  Z as f,
  ft as g,
  Ht as h,
  Jt as i,
  Qt as j,
  Zt as k,
  Yt as l,
  es as m,
  ss as n,
  ns as o
};
