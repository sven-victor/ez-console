import { j as e } from "./vendor.js";
import { Navigate as ue, useNavigate as ze } from "react-router-dom";
import { b as xe, c as se, u as ye, d as Pe } from "./contexts.js";
import { g as _e, i as De, f as Ee } from "./base.js";
import { Spin as ne, Result as Z, Dropdown as je, Avatar as Me, Upload as Ve, Modal as q, Popover as Re, List as H, Image as Be, Divider as ve, Skeleton as Oe, Progress as Ne, Typography as ae, Button as w, Tag as O, Popconfirm as Y, Tooltip as me, Space as F, Input as S, Table as re, Form as v, message as j, Alert as G, Segmented as pe, Steps as $e, QRCode as Ue, Empty as we, Card as ee, Row as He, Col as B, Select as te, DatePicker as qe } from "antd";
import { useTranslation as k } from "react-i18next";
import { createStyles as ie } from "antd-style";
import * as We from "@ant-design/icons";
import { UploadOutlined as Ke, CheckOutlined as Ge, TeamOutlined as Qe, UnorderedListOutlined as Xe, DownloadOutlined as Je, MoreOutlined as Ze, PlusOutlined as Ye, ClockCircleFilled as et, MailOutlined as tt, EyeOutlined as be, EyeInvisibleOutlined as st, LaptopOutlined as nt, EnvironmentOutlined as at, GlobalOutlined as rt, ClockCircleOutlined as it, SearchOutlined as ot } from "@ant-design/icons";
import lt, { useState as f, useEffect as E, useCallback as Q, Suspense as ct, forwardRef as dt, useImperativeHandle as ut } from "react";
import D from "classnames";
import { a as b } from "./index.js";
import { useRequest as L } from "ahooks";
import { b as X, A as mt } from "./client.js";
import pt from "antd-img-crop";
import ft from "react-infinite-scroll-component";
import { isString as ht } from "lodash-es";
const fe = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(ne, { size: "large" }) }), Kt = ({
  element: t,
  requiredPermission: r,
  requiredPermissions: s
}) => {
  const { t: n } = k(), { user: l, loading: o, error: i } = xe(), { hasPermission: c, hasAllPermissions: d } = se();
  return o ? /* @__PURE__ */ e.jsx(fe, {}) : i ? i.code === "E4011" ? /* @__PURE__ */ e.jsx(fe, {}) : /* @__PURE__ */ e.jsx(
    Z,
    {
      status: "500",
      title: "500",
      subTitle: n("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (i == null ? void 0 : i.message) || i })
    }
  ) : l ? r && !c(r) ? /* @__PURE__ */ e.jsx(ue, { to: "/forbidden", replace: !0 }) : s && !d(s) ? /* @__PURE__ */ e.jsx(ue, { to: "/forbidden", replace: !0 }) : t : (window.location.href = _e("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, gt = ie(({ token: t, css: r }) => ({
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
})), oe = ({
  overlayClassName: t,
  overlay: r,
  hidden: s,
  children: n,
  ...l
}) => {
  if (s)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: o } = gt();
  return /* @__PURE__ */ e.jsx(
    je,
    {
      dropdownRender: r,
      overlayClassName: D(o.container, t),
      ...l,
      children: /* @__PURE__ */ e.jsx("span", { className: o.iconStyle, children: n })
    }
  );
}, xt = () => /* @__PURE__ */ e.jsxs(
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
), yt = ie(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), jt = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], Gt = ({
  transformLangConfig: t = (s) => s,
  className: r
}) => {
  const { i18n: s } = k(), { styles: n } = yt(), l = (i) => {
    s.changeLanguage(i);
  }, o = {
    selectedKeys: [s.language],
    onClick: (i) => {
      l(i.key);
    },
    items: t(jt).map((i) => ({
      key: i.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (i == null ? void 0 : i.label) || "en-US", className: n.menuItemIconStyle, children: (i == null ? void 0 : i.icon) || "🌐" }),
        (i == null ? void 0 : i.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    oe,
    {
      className: r,
      menu: o,
      children: /* @__PURE__ */ e.jsx(xt, {})
    }
  );
}, vt = ie(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), le = (t) => ht(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? X.endsWith("/") ? X + `files/${t}` : X + `/files/${t}` : t, Qt = ({ src: t, fallback: r, ...s }) => /* @__PURE__ */ e.jsx(Me, { src: le(t), icon: r, ...s }), wt = ({ onChange: t, shape: r = "square" }) => {
  const [s, n] = f([]), { styles: l } = vt(), [o, i] = f(!1), [c, d] = f(!0), [p, m] = f(0), { run: u, loading: a } = L(() => b.base.listFiles({ current: p + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: x }) => {
      console.log(x), n([...s, ...x]), d(x.length === 40), m(p + 1);
    }
  }), y = () => {
    d(!0), m(0), n([]);
  };
  return /* @__PURE__ */ e.jsx(
    Re,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (x) => {
        i(x), x ? u() : y();
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
            ft,
            {
              dataLength: s.length,
              next: () => {
                u();
              },
              hasMore: c,
              loader: /* @__PURE__ */ e.jsx(Oe, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(ve, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                H,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: s,
                  style: { margin: "0 8px" },
                  loading: a,
                  renderItem: ({ id: x }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: l.avatarItem,
                      onClick: (A) => {
                        A.stopPropagation(), t == null || t(x), i(!1), y();
                      },
                      children: /* @__PURE__ */ e.jsx(Be, { src: le(x), placeholder: /* @__PURE__ */ e.jsx(ne, { size: "default" }), preview: !1 })
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
        Ke,
        {
          shape: r,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, bt = ({ value: t, onChange: r, shape: s, ...n }) => {
  const [l, o] = f(void 0), [i, c] = f(!1), [d, p] = f(void 0), m = async (u) => {
    c(!0), p(u.url ?? u.preview);
  };
  return E(() => {
    o(t ? {
      uid: t,
      name: t,
      url: le(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      pt,
      {
        beforeCrop: async (u) => {
          if (u.type === "image/svg+xml") {
            const a = await b.base.uploadFile({ type: "avatar" }, u);
            return a.length > 0 && (r == null || r(a[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          Ve,
          {
            customRequest: async (u) => {
              var y, x;
              const a = await b.base.uploadFile({ type: "avatar", access: "public" }, u.file);
              a.length > 0 ? ((y = u.onSuccess) == null || y.call(u, a[0].id), r == null || r(a[0].id)) : (x = u.onError) == null || x.call(u, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: m,
            maxCount: 1,
            onChange: ({ file: u }) => {
              switch (u.status) {
                case "removed":
                  r == null || r(void 0);
                  break;
                case "done":
                  break;
                default:
                  o(u);
                  break;
              }
            },
            fileList: l ? [l] : [],
            ...n,
            children: l ? void 0 : /* @__PURE__ */ e.jsx(wt, { shape: s, onChange: r })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(q, { open: i, footer: null, onCancel: () => c(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: d }) })
  ] });
}, Xt = ({ className: t }) => {
  const { t: r } = k("common"), { user: s } = xe(), { currentOrgId: n, setCurrentOrgId: l } = ye(), o = (s == null ? void 0 : s.organizations) || [], i = (m) => {
    l(m), window.location.reload();
  };
  if (o.length === 0)
    return null;
  const c = o.find((m) => m.id === n), d = c ? c.name : r("organization.global", { defaultValue: "Global" }), p = [
    ...o.map((m) => ({
      key: m.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: m.name }),
        n === m.id && /* @__PURE__ */ e.jsx(Ge, {})
      ] }),
      onClick: () => i(m.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    oe,
    {
      className: t,
      menu: {
        items: p,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(Qe, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: d })
      ]
    }
  );
}, St = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Jt = ({ className: t }) => {
  const { t: r } = k("task"), s = ze(), { user: n } = Pe(), { tasksDropdownOpen: l, setTasksDropdownOpen: o, tasks: i, setTasks: c } = ye(), { runAsync: d, loading: p } = L(async () => b.tasks.listUserTasks({}), {
    onSuccess: (a) => {
      De(i, a, (y, x) => y.id === x.id && y.status === x.status && y.progress === x.progress) || c(a);
    },
    pollingInterval: l ? 3e3 : 6e4,
    ready: !!n,
    refreshDeps: [n]
  });
  E(() => {
    l && d();
  }, [l]);
  const m = async (a) => {
    const y = await b.base.downloadFile({ fileKey: a }, { params: { method: "sign" } }), x = `/api/files/${a}?signature=${y.signature}&expires=${y.expires}`;
    window.open(x, "_blank");
  }, u = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      H,
      {
        size: "small",
        dataSource: i,
        loading: p,
        renderItem: (a) => /* @__PURE__ */ e.jsx(
          H.Item,
          {
            extra: /* @__PURE__ */ e.jsx(O, { color: St[a.status], style: { marginLeft: 6 }, children: r(`status.${a.status}`, { defaultValue: a.status }) }),
            actions: [
              a.artifact_file_key && /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx(Je, {}),
                  onClick: () => m(a.artifact_file_key)
                }
              )
            ].filter(Boolean),
            children: /* @__PURE__ */ e.jsx(
              H.Item.Meta,
              {
                title: /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13 }, children: /* @__PURE__ */ e.jsxs(ae.Text, { ellipsis: { tooltip: !0 }, children: [
                  r(`type.${a.type}`, { defaultValue: a.type }),
                  " ",
                  a.artifact_file_name && `- ${a.artifact_file_name}`
                ] }) }),
                description: (a.status === "running" || a.status === "pending") && /* @__PURE__ */ e.jsx(Ne, { percent: a.progress ?? 0, size: "small", style: { marginTop: 4 } })
              }
            )
          },
          a.id
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", onClick: () => s("/tasks"), children: r("more", { defaultValue: "More" }) }) })
  ] });
  return !i || i.length === 0 ? null : /* @__PURE__ */ e.jsxs(oe, { className: t, overlay: u, placement: "bottomRight", open: l, onOpenChange: o, children: [
    /* @__PURE__ */ e.jsx(Xe, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: r("tasks", { defaultValue: "Tasks" }) })
  ] });
}, Zt = ({
  onResize: t,
  minWidth: r = 300,
  maxWidth: s = window.innerWidth * 0.5
}) => {
  const [n, l] = f(!1), [o, i] = f(!1), c = Q((m) => {
    m.preventDefault(), l(!0);
  }, []), d = Q(
    (m) => {
      if (!n) return;
      const u = window.innerWidth - m.clientX, a = Math.max(r, Math.min(s, u));
      t(a);
    },
    [n, r, s, t]
  ), p = Q(() => {
    l(!1);
  }, []);
  return E(() => {
    if (n)
      return document.addEventListener("mousemove", d), document.addEventListener("mouseup", p), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", d), document.removeEventListener("mouseup", p), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [n, d, p]), /* @__PURE__ */ e.jsx(
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
}, Se = ({
  permission: t,
  permissions: r = [],
  checkAll: s = !1,
  fallback: n = null,
  children: l
}) => {
  const { hasPermission: o, hasAnyPermission: i, hasAllPermissions: c, isAdmin: d, loading: p } = se();
  return p ? null : d ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : t ? o(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : r.length > 0 ? (s ? c(r) : i(r)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: l });
}, Yt = ({
  fallback: t = null,
  children: r
}) => {
  const { isAdmin: s, loading: n } = se();
  return n ? null : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, he = (t) => {
  const [r, s] = f(!1), { permission: n, icon: l, tooltip: o, onClick: i, confirm: c, label: d, ...p } = t, m = !!p.disabled, u = i ? async () => {
    s(!0);
    try {
      await i();
    } finally {
      s(!1);
    }
  } : void 0;
  let a = /* @__PURE__ */ e.jsx(
    w,
    {
      type: "link",
      size: "small",
      loading: r,
      icon: l,
      onClick: c && !m ? void 0 : u,
      ...p,
      children: d && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: d })
    }
  );
  if (c && !m) {
    const y = async () => {
      c.onConfirm ? await c.onConfirm() : u && await u();
    };
    a = /* @__PURE__ */ e.jsx(
      Y,
      {
        title: c.title,
        description: c.description,
        onConfirm: y,
        okText: c.okText,
        cancelText: c.cancelText,
        children: a
      }
    );
  }
  return o && (a = m ? /* @__PURE__ */ e.jsx(me, { title: o, children: /* @__PURE__ */ e.jsx("span", { style: { display: "inline-block", cursor: "not-allowed" }, children: a }) }) : /* @__PURE__ */ e.jsx(me, { title: o, children: a })), n && (a = /* @__PURE__ */ e.jsx(Se, { permission: n, children: a })), a;
}, es = ({ actions: t, maxVisibleItems: r }) => {
  const s = t.filter((i) => !i.hidden);
  if (!r || s.length <= r)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: s.map(({ key: i, ...c }) => /* @__PURE__ */ e.jsx(he, { ...c }, i)) });
  const n = s.slice(0, r - 1), o = s.slice(r - 1).map((i) => {
    const { key: c, label: d, icon: p, permission: m, onClick: u, confirm: a, disabled: y, tooltip: x } = i, C = {
      key: c,
      label: d,
      icon: p,
      disabled: y,
      onClick: async () => {
        a ? q.confirm({
          title: a.title,
          content: a.description,
          onOk: a.onConfirm || u,
          okText: a.okText,
          cancelText: a.cancelText
        }) : u && await u();
      }
    };
    return m ? {
      ...C,
      label: /* @__PURE__ */ e.jsx(Se, { permission: m, children: /* @__PURE__ */ e.jsx("span", { children: d ?? x }) })
    } : C;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    n.map(({ key: i, ...c }) => /* @__PURE__ */ e.jsx(he, { ...c }, i)),
    /* @__PURE__ */ e.jsx(je, { menu: { items: o }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(w, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(Ze, {}) }) })
  ] });
}, kt = We, Ct = (t) => kt[t], ts = ({ iconName: t }) => {
  if (!t)
    return null;
  const r = Ct(t);
  return r ? /* @__PURE__ */ e.jsx(ct, { fallback: null, children: /* @__PURE__ */ e.jsx(r, {}) }) : null;
}, ss = ({ onChange: t }) => {
  const [r, s] = f(""), [n, l] = f("");
  return /* @__PURE__ */ e.jsxs(F.Compact, { children: [
    /* @__PURE__ */ e.jsx(S, { style: { width: "calc(100% - 80px)" }, value: r, onChange: (o) => s(o.target.value) }),
    /* @__PURE__ */ e.jsx(S, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(S, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (o) => l(o.target.value) }),
    /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ye, {}), onClick: () => {
      t(r, n);
    } })
  ] });
}, Tt = ({ request: t, tableRef: r, ...s }, n) => {
  const [l, o] = f({
    current: 1,
    pageSize: 10
  }), [i, c] = f(0), { data: d, loading: p, refresh: m } = L(async () => {
    const u = await t({
      current: l.current,
      page_size: l.pageSize
    });
    return c(u.total), u.data;
  }, {
    refreshDeps: [l]
  });
  return ut(n, () => ({
    reload: () => {
      m();
    }
  })), /* @__PURE__ */ e.jsx(
    re,
    {
      rowKey: "id",
      loading: p,
      dataSource: d ?? [],
      pagination: {
        ...l,
        total: i,
        onChange: (u, a) => {
          o({ current: u, pageSize: a });
        }
      },
      ...s,
      ref: r
    }
  );
}, ns = ({ actionRef: t, ...r }) => {
  const [s, n] = f();
  return E(() => {
    n(dt(Tt));
  }, []), s ? /* @__PURE__ */ e.jsx(s, { ...r, ref: t }) : null;
}, as = ({ className: t, onSuccess: r, token: s }) => {
  const { t: n } = k("authorization"), { t: l } = k("common"), [o] = v.useForm(), { run: i, loading: c } = L(async (d) => b.authorization.changePassword(d, s ? { headers: { Authorization: `Bearer ${s}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      j.success(n("user.passwordChanged")), o.resetFields(), r == null || r();
    },
    onError: (d) => {
      if (d instanceof mt) {
        const p = d.code ?? "normal";
        j.error(n(`user.passwordChangeFailed.${p}`, { error: d.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        j.error(n("user.passwordChangeFailed.normal", { error: d.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", d);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    v,
    {
      form: o,
      layout: "vertical",
      onFinish: i,
      style: { maxWidth: 500, margin: "0 auto" },
      className: D("profile-password", t),
      children: [
        /* @__PURE__ */ e.jsx(
          v.Item,
          {
            name: "old_password",
            label: n("user.oldPassword"),
            rules: [{ required: !0, message: n("validation.oldPasswordRequired") }],
            className: D("profile-password-item", "profile-password-item-old-password"),
            children: /* @__PURE__ */ e.jsx(S.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          v.Item,
          {
            name: "new_password",
            label: n("user.newPassword"),
            rules: [
              { required: !0, message: n("validation.newPasswordRequired") },
              { min: 8, message: n("validation.passwordMinLength") }
            ],
            className: D("profile-password-item", "profile-password-item-new-password"),
            children: /* @__PURE__ */ e.jsx(S.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          v.Item,
          {
            name: "confirm_password",
            label: n("user.confirmPassword"),
            className: D("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: n("validation.confirmPasswordRequired") },
              ({ getFieldValue: d }) => ({
                validator(p, m) {
                  return !m || d("new_password") === m ? Promise.resolve() : Promise.reject(new Error(n("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(S.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(v.Item, { className: D("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: c, children: l("save") }) })
      ]
    }
  );
}, rs = ({ user: t, onSuccess: r }) => {
  const { t: s } = k("authorization"), { t: n } = k("common"), [l] = v.useForm(), [o, i] = f(!1);
  lt.useEffect(() => {
    t && l.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, l]);
  const c = async (d) => {
    try {
      i(!0), await b.authorization.updateCurrentUser(d), j.success(n("updateSuccess")), r();
    } catch (p) {
      j.error(n("updateFailed")), console.error("Failed to update user information:", p);
    } finally {
      i(!1);
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
      v,
      {
        form: l,
        layout: "vertical",
        onFinish: c,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            v.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(bt, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            v.Item,
            {
              name: "username",
              label: s("user.username"),
              children: /* @__PURE__ */ e.jsx(S, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            v.Item,
            {
              name: "email",
              label: s("user.email"),
              rules: [
                { required: !0, message: s("validation.emailRequired") },
                { type: "email", message: s("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(S, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            v.Item,
            {
              name: "full_name",
              label: s("user.fullName"),
              rules: [{ required: !0, message: s("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(S, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            v.Item,
            {
              name: "phone",
              label: s("user.phone"),
              children: /* @__PURE__ */ e.jsx(S, {})
            }
          ),
          /* @__PURE__ */ e.jsx(v.Item, { children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: o, children: n("save") }) })
        ]
      }
    )
  ] });
}, is = ({ user: t, onSuccess: r }) => {
  const { t: s } = k("authorization"), { t: n } = k("common"), [l, o] = f(0), [i, c] = f(!1), [d, p] = f(!0), [m, u] = f(""), [a, y] = f("totp"), [x, A] = f(!1), [C, h] = f("password"), [T, z] = f(""), [P, M] = f(""), [W, N] = f(""), [ce, K] = f(""), [V, $] = f(0);
  E(() => {
    if (V <= 0) return;
    const g = setTimeout(() => $((I) => I - 1), 1e3);
    return () => clearTimeout(g);
  }, [V]);
  const { run: ke, data: R = { secret: "", qr_code: "", token: void 0 } } = L(
    () => b.authorization.enableMfa({ mfa_type: a }),
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
  ), Ce = async () => {
    if (!m) {
      j.warning(s("mfa.enterVerificationCode"));
      return;
    }
    const g = {
      code: m,
      mfa_type: a
    };
    "token" in R && (g.token = R.token);
    try {
      c(!0), await b.authorization.verifyAndActivateMfa(g), j.success(s("mfa.enableSuccess")), o(2), r();
    } catch (I) {
      j.error(s("mfa.verificationFailed")), console.error("Failed to verify MFA:", I);
    } finally {
      c(!1);
    }
  }, de = () => {
    A(!1), h("password"), z(""), M(""), N(""), K(""), $(0);
  }, { runAsync: Te, loading: Ie } = L(
    () => b.authorization.sendDisableMfaCode(),
    { manual: !0 }
  ), Fe = async () => {
    try {
      const g = await Te();
      K((g == null ? void 0 : g.token) ?? ""), N(""), $(60), j.success(s("mfa.codeSent", { defaultValue: "Verification code has been sent to your email" }));
    } catch (g) {
      j.error(g instanceof Error ? g.message : n("operationFailed")), console.error("Failed to send disable-MFA code:", g);
    }
  }, U = async () => {
    if (C === "email") {
      if (!ce) {
        j.warning(s("mfa.sendCodeFirst", { defaultValue: "Please send the verification code first" }));
        return;
      }
      if (!W) {
        j.warning(s("mfa.enterVerificationCode"));
        return;
      }
    } else if (C === "totp") {
      if (!P) {
        j.warning(s("mfa.enterVerificationCode"));
        return;
      }
    } else if (!T) {
      j.warning(s("mfa.enterPassword", { defaultValue: "Enter your password" }));
      return;
    }
    const g = { password: "", mfa_code: "", email_code: "", email_token: "" };
    C === "email" ? (g.email_code = W, g.email_token = ce) : C === "totp" ? g.mfa_code = P : g.password = T;
    try {
      c(!0), await b.authorization.disableMfa(g), j.success(s("mfa.disableSuccess")), de(), r();
    } catch (I) {
      j.error(I instanceof Error ? I.message : n("operationFailed")), console.error("Failed to disable MFA:", I), C === "email" && (K(""), N(""), $(0));
    } finally {
      c(!1);
    }
  }, Le = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        Z,
        {
          status: "success",
          title: s("mfa.enabled"),
          subTitle: s("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(w, { danger: !0, onClick: () => A(!0), children: s("mfa.disable") })
        }
      );
    const g = () => {
      var I;
      switch (l) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              G,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: s("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: s(a === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
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
                onClick: ke,
                loading: i,
                children: s("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              G,
              {
                message: s("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: a === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: a === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(Ue, { value: R.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: a === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: a === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: d ? "*".repeat(((I = R.secret) == null ? void 0 : I.length) ?? 0) : R.secret }),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "link",
                  onClick: () => p(!d),
                  icon: d ? /* @__PURE__ */ e.jsx(be, {}) : /* @__PURE__ */ e.jsx(st, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              S,
              {
                placeholder: s("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: m,
                onChange: (Ae) => u(Ae.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(F, { children: [
              /* @__PURE__ */ e.jsx(w, { onClick: () => o(0), children: n("previous") }),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "primary",
                  onClick: Ce,
                  loading: i,
                  children: n("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            Z,
            {
              status: "success",
              title: s("mfa.setupSuccess"),
              subTitle: s("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(w, { type: "primary", onClick: () => o(0), children: n("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: l === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          pe,
          {
            defaultValue: "totp",
            onChange: (I) => {
              y(I), o(0);
            },
            value: a,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(et, {}), label: s("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(tt, {}), label: s("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(ve, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        $e,
        {
          current: l,
          items: [
            { title: s(a === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: s(a === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: s(a === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: s(a === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: s(a === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: s(a === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      g()
    ] });
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 8 }, children: [
    Le(),
    /* @__PURE__ */ e.jsxs(
      q,
      {
        title: s("mfa.confirmDisable"),
        open: x,
        onOk: U,
        okText: s("mfa.disable"),
        okButtonProps: { danger: !0, loading: i },
        onCancel: de,
        destroyOnHidden: !0,
        children: [
          /* @__PURE__ */ e.jsx(
            G,
            {
              message: s("mfa.disableWarning"),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          /* @__PURE__ */ e.jsx("p", { children: s("mfa.disableVerifyDescription", { defaultValue: "For security reasons, please verify your identity with your password or a verification code." }) }),
          /* @__PURE__ */ e.jsx(
            pe,
            {
              block: !0,
              value: C,
              onChange: (g) => h(g),
              options: [
                { value: "password", label: s("mfa.methodPassword", { defaultValue: "Password" }) },
                ...(t == null ? void 0 : t.mfa_type) === "totp" ? [{ value: "totp", label: s("mfa.totp", { defaultValue: "TOTP" }) }] : [],
                { value: "email", label: s("mfa.methodEmailCode", { defaultValue: "Email code" }) }
              ],
              style: { marginBottom: 16 }
            }
          ),
          C === "password" && /* @__PURE__ */ e.jsx(
            S.Password,
            {
              placeholder: s("mfa.enterPassword", { defaultValue: "Enter your password" }),
              autoComplete: "current-password",
              value: T,
              onChange: (g) => z(g.target.value),
              onPressEnter: U
            }
          ),
          C === "totp" && /* @__PURE__ */ e.jsx(
            S,
            {
              placeholder: s("mfa.enterTotpCode", { defaultValue: "Enter the 6-digit code from your authenticator app" }),
              maxLength: 6,
              value: P,
              onChange: (g) => M(g.target.value),
              onPressEnter: U
            }
          ),
          C === "email" && /* @__PURE__ */ e.jsxs(F.Compact, { style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(
              S,
              {
                placeholder: s("mfa.enterEmailCode", { defaultValue: "Enter the 6-digit code sent to your email" }),
                maxLength: 6,
                value: W,
                onChange: (g) => N(g.target.value),
                onPressEnter: U
              }
            ),
            /* @__PURE__ */ e.jsx(
              w,
              {
                onClick: Fe,
                loading: Ie,
                disabled: V > 0,
                children: V > 0 ? s("mfa.resendIn", { defaultValue: "Resend ({{seconds}}s)", seconds: V }) : s("mfa.sendCode", { defaultValue: "Send code" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}, { Text: J } = ae, os = () => {
  const { t } = k("authorization"), { t: r } = k("common"), [s, n] = f(null), [l, o] = f(!1), { data: i = [], loading: c, run: d } = L(() => b.authorization.getUserSessions({}), {
    onError: (a) => {
      j.error(t("session.getSessionsFailed", { error: a, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: p } = L((a) => b.authorization.terminateSession({ id: a }), {
    onSuccess: () => {
      j.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" })), d();
    },
    onError: (a) => {
      j.error(t("session.terminateFailed", { error: a, defaultValue: "Failed to terminate session: {{error}}" }));
    },
    onFinally: () => {
      n(null);
    },
    onBefore: ([a]) => {
      n(a);
    },
    manual: !0
  }), { run: m } = L(() => b.authorization.terminateOtherSessions(), {
    onSuccess: () => {
      j.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" })), d();
    },
    onError: (a) => {
      j.error(t("session.terminateAllFailed", { error: a, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
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
      render: (a, y) => /* @__PURE__ */ e.jsxs(F, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(F, { children: [
          /* @__PURE__ */ e.jsx(nt, {}),
          /* @__PURE__ */ e.jsx(J, { strong: !0, children: a })
        ] }),
        /* @__PURE__ */ e.jsxs(F, { children: [
          /* @__PURE__ */ e.jsx(at, {}),
          /* @__PURE__ */ e.jsx(J, { type: "secondary", children: y.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (a) => /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(rt, {}),
        /* @__PURE__ */ e.jsx("span", { children: a })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (a) => /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(it, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(a).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (a) => a.is_current ? /* @__PURE__ */ e.jsx(O, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(O, { color: "blue", children: t("session.active") })
    },
    {
      title: r("actions"),
      key: "action",
      render: (a) => a.is_current ? /* @__PURE__ */ e.jsx(J, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        Y,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => p(a.id),
          okText: r("confirm"),
          cancelText: r("cancel"),
          children: /* @__PURE__ */ e.jsx(
            w,
            {
              type: "link",
              danger: !0,
              loading: s === a.id,
              children: t("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(F, { direction: "vertical", style: { padding: 8, width: "100%" }, children: [
    /* @__PURE__ */ e.jsxs(F, { direction: "horizontal", style: { float: "right" }, children: [
      i.length > 1 && /* @__PURE__ */ e.jsx(
        Y,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: m,
          okText: r("confirm"),
          cancelText: r("cancel"),
          children: /* @__PURE__ */ e.jsx(
            w,
            {
              danger: !0,
              loading: l,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      /* @__PURE__ */ e.jsx(w, { onClick: () => d(), loading: c, children: r("refresh") })
    ] }),
    !c && i.length === 0 ? /* @__PURE__ */ e.jsx(we, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
      re,
      {
        columns: u,
        dataSource: i,
        rowKey: "id",
        loading: c,
        pagination: !1
      }
    )
  ] });
}, { RangePicker: It } = qe, { Option: _ } = te, Ft = (t) => t || "N/A", Lt = (t, r) => t === "success" ? /* @__PURE__ */ e.jsx(O, { color: "success", children: r("statuses.success") }) : /* @__PURE__ */ e.jsx(O, { color: "error", children: r("statuses.failed") }), ls = ({
  userId: t,
  request: r = (n) => t ? b.authorization.getUserLogs({ id: t, ...n }) : b.authorization.getCurrentUserLogs(n),
  columnsFilter: s = (n) => n
}) => {
  const { t: n } = k("authorization"), { t: l } = k("common"), [o, i] = f({
    current: 1,
    pageSize: 10,
    total: 0
  }), [c, d] = f({}), [p] = v.useForm(), { loading: m, run: u, data: { data: a } = {} } = L(async (h = c, T = 1, z = 10) => r({
    ...h,
    current: T ?? 1,
    page_size: z ?? 10
  }), {
    onError(h) {
      j.error(n("auditLog.fetchFailed", { error: h }));
    },
    onSuccess({ total: h }) {
      i({
        ...o,
        total: h
      });
    }
  });
  E(() => {
    u(c, 1, o.pageSize);
  }, []);
  const y = (h) => {
    i({
      ...o,
      current: h.current,
      pageSize: h.pageSize
    }), u({}, h.current, h.pageSize);
  }, x = (h) => {
    var T, z, P, M;
    u({
      ...h,
      start_time: (z = (T = h.dateRange) == null ? void 0 : T[0]) == null ? void 0 : z.toISOString(),
      end_time: (M = (P = h.dateRange) == null ? void 0 : P[1]) == null ? void 0 : M.toISOString()
    }, 1, o.pageSize);
  }, A = () => {
    p.resetFields(), d({}), i({ ...o, current: 1 }), u({}, 1, o.pageSize);
  }, C = [
    {
      title: n("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (h) => Ee(h)
    },
    {
      title: n("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (h, T) => h ? n(`action.${h.replace(/:/g, ".")}`, { defaultValue: n(`permission.title.${h.replace(/:/g, ".")}`, { defaultValue: T.action_name }) }) : T.action_name ?? T.action
    },
    {
      title: n("auditLog.user_agent"),
      dataIndex: "user_agent",
      key: "user_agent"
    },
    {
      title: n("auditLog.ip"),
      dataIndex: "ip",
      key: "ip",
      render: (h) => Ft(h)
    },
    {
      title: n("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (h) => Lt(h, n)
    },
    {
      title: n("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (h) => /* @__PURE__ */ e.jsx(w, { type: "link", icon: /* @__PURE__ */ e.jsx(be, {}), onClick: () => {
        q.info({
          title: n("auditLog.details"),
          content: JSON.stringify(h)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ee, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      v,
      {
        form: p,
        layout: "horizontal",
        onFinish: x,
        initialValues: c,
        children: /* @__PURE__ */ e.jsxs(He, { gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(B, { xxl: 6, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(v.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(S, { placeholder: n("auditLog.searchPlaceholder") }) }) }),
          /* @__PURE__ */ e.jsx(B, { xxl: 4, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(v.Item, { name: "action", noStyle: !0, children: /* @__PURE__ */ e.jsxs(te, { allowClear: !0, placeholder: n("auditLog.selectAction"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(_, { value: "login", children: n("actions.login") }),
            /* @__PURE__ */ e.jsx(_, { value: "logout", children: n("actions.logout") }),
            /* @__PURE__ */ e.jsx(_, { value: "password_reset", children: n("actions.passwordReset") }),
            /* @__PURE__ */ e.jsx(_, { value: "mfa_change", children: n("actions.mfaChange") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(B, { xxl: 3, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(v.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(te, { allowClear: !0, placeholder: n("auditLog.selectStatus"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(_, { value: "success", children: n("statuses.success") }),
            /* @__PURE__ */ e.jsx(_, { value: "failed", children: n("statuses.failed") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(B, { xxl: 6, xl: 6, lg: 10, md: 12, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(v.Item, { name: "dateRange", noStyle: !0, children: /* @__PURE__ */ e.jsx(It, { style: { width: "100%" } }) }) }),
          /* @__PURE__ */ e.jsx(B, { xxl: 5, xl: 24, lg: 14, md: 24, sm: 24, xs: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(F, { children: [
            /* @__PURE__ */ e.jsx(w, { onClick: A, children: l("reset") }),
            /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(ot, {}), children: l("search") })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(ee, { children: /* @__PURE__ */ e.jsx(
      re,
      {
        rowKey: "id",
        columns: s(C),
        dataSource: a,
        pagination: {
          ...o,
          showSizeChanger: !0,
          showTotal: (h) => l("totalItems", { total: h })
        },
        loading: m,
        onChange: y,
        scroll: { x: "max-content" }
      }
    ) })
  ] });
}, { Text: ge } = ae, At = {
  debug: "default",
  info: "processing",
  warn: "warning",
  error: "error"
}, cs = ({ taskId: t, poll: r }) => {
  const { t: s } = k("task"), { data: n = [], loading: l } = L(
    () => t ? b.tasks.getTaskLogs({ id: t }) : Promise.reject(new Error("No task id")),
    {
      refreshDeps: [t],
      ready: !!t,
      pollingInterval: r ? 2e3 : 0
    }
  );
  return /* @__PURE__ */ e.jsx(
    ee,
    {
      title: s("logsTitle", { defaultValue: "Task logs" }),
      size: "small",
      style: { marginTop: 16 },
      children: l && !n.length ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 24 }, children: /* @__PURE__ */ e.jsx(ne, {}) }) : n.length ? /* @__PURE__ */ e.jsx(
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
            /* @__PURE__ */ e.jsx(ge, { type: "secondary", style: { fontSize: 11 }, children: o.created_at }),
            o.level && /* @__PURE__ */ e.jsxs(ge, { type: At[o.level], style: { marginLeft: 8, fontSize: 11 }, children: [
              "[",
              o.level,
              "]"
            ] }),
            /* @__PURE__ */ e.jsx("div", { style: { display: "inline", marginLeft: 8 }, children: o.message })
          ] }, o.id))
        }
      ) : /* @__PURE__ */ e.jsx(we, { description: s("noLogs", { defaultValue: "No logs yet." }) })
    }
  );
};
export {
  Qt as A,
  ts as D,
  oe as H,
  fe as L,
  Xt as O,
  Kt as P,
  Zt as R,
  Jt as T,
  ls as U,
  Gt as a,
  es as b,
  bt as c,
  ss as d,
  jt as e,
  Se as f,
  Ct as g,
  Yt as h,
  ns as i,
  as as j,
  rs as k,
  is as l,
  os as m,
  cs as n
};
