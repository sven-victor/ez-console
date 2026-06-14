import { j as e } from "./vendor.js";
import { Navigate as ee, useNavigate as me } from "react-router-dom";
import { b as ae, c as W, u as oe, d as pe } from "./contexts.js";
import { g as he, i as xe, f as fe } from "./base.js";
import { Spin as K, Result as $, Dropdown as le, Avatar as ge, Upload as ye, Modal as V, Popover as je, List as R, Image as ve, Divider as ce, Skeleton as we, Progress as Se, Typography as G, Button as j, Tag as M, Popconfirm as U, Tooltip as te, Space as T, Input as b, Table as Q, Form as y, message as v, Segmented as be, Steps as ke, Alert as se, QRCode as Ie, Empty as de, Card as H, Row as Ce, Col as P, Select as q, DatePicker as Te } from "antd";
import { useTranslation as S } from "react-i18next";
import { createStyles as X } from "antd-style";
import * as Fe from "@ant-design/icons";
import { UploadOutlined as Le, CheckOutlined as ze, TeamOutlined as Ae, UnorderedListOutlined as _e, DownloadOutlined as Pe, MoreOutlined as Me, PlusOutlined as De, ClockCircleFilled as Ee, MailOutlined as Re, EyeOutlined as ue, EyeInvisibleOutlined as Ve, LaptopOutlined as Be, EnvironmentOutlined as Ne, GlobalOutlined as Oe, ClockCircleOutlined as $e, SearchOutlined as Ue } from "@ant-design/icons";
import He, { useState as x, useEffect as D, useCallback as B, Suspense as qe, forwardRef as We, useImperativeHandle as Ke } from "react";
import _ from "classnames";
import { a as w } from "./index.js";
import { useRequest as F } from "ahooks";
import { b as N, A as Ge } from "./client.js";
import Qe from "antd-img-crop";
import Xe from "react-infinite-scroll-component";
import { isString as Je } from "lodash-es";
const ne = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(K, { size: "large" }) }), Lt = ({
  element: t,
  requiredPermission: i,
  requiredPermissions: s
}) => {
  const { t: n } = S(), { user: l, loading: o, error: a } = ae(), { hasPermission: c, hasAllPermissions: d } = W();
  return o ? /* @__PURE__ */ e.jsx(ne, {}) : a ? a.code === "E4011" ? /* @__PURE__ */ e.jsx(ne, {}) : /* @__PURE__ */ e.jsx(
    $,
    {
      status: "500",
      title: "500",
      subTitle: n("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (a == null ? void 0 : a.message) || a })
    }
  ) : l ? i && !c(i) ? /* @__PURE__ */ e.jsx(ee, { to: "/forbidden", replace: !0 }) : s && !d(s) ? /* @__PURE__ */ e.jsx(ee, { to: "/forbidden", replace: !0 }) : t : (window.location.href = he("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Ze = X(({ token: t, css: i }) => ({
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
})), J = ({
  overlayClassName: t,
  overlay: i,
  hidden: s,
  children: n,
  ...l
}) => {
  if (s)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: o } = Ze();
  return /* @__PURE__ */ e.jsx(
    le,
    {
      dropdownRender: i,
      overlayClassName: _(o.container, t),
      ...l,
      children: /* @__PURE__ */ e.jsx("span", { className: o.iconStyle, children: n })
    }
  );
}, Ye = () => /* @__PURE__ */ e.jsxs(
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
), et = X(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), tt = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], zt = ({
  transformLangConfig: t = (s) => s,
  className: i
}) => {
  const { i18n: s } = S(), { styles: n } = et(), l = (a) => {
    s.changeLanguage(a);
  }, o = {
    selectedKeys: [s.language],
    onClick: (a) => {
      l(a.key);
    },
    items: t(tt).map((a) => ({
      key: a.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (a == null ? void 0 : a.label) || "en-US", className: n.menuItemIconStyle, children: (a == null ? void 0 : a.icon) || "🌐" }),
        (a == null ? void 0 : a.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    J,
    {
      className: i,
      menu: o,
      children: /* @__PURE__ */ e.jsx(Ye, {})
    }
  );
}, st = X(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), Z = (t) => Je(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? N.endsWith("/") ? N + `files/${t}` : N + `/files/${t}` : t, At = ({ src: t, fallback: i, ...s }) => /* @__PURE__ */ e.jsx(ge, { src: Z(t), icon: i, ...s }), nt = ({ onChange: t, shape: i = "square" }) => {
  const [s, n] = x([]), { styles: l } = st(), [o, a] = x(!1), [c, d] = x(!0), [p, m] = x(0), { run: u, loading: r } = F(() => w.base.listFiles({ current: p + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: f }) => {
      console.log(f), n([...s, ...f]), d(f.length === 40), m(p + 1);
    }
  }), g = () => {
    d(!0), m(0), n([]);
  };
  return /* @__PURE__ */ e.jsx(
    je,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (f) => {
        a(f), f ? u() : g();
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
            Xe,
            {
              dataLength: s.length,
              next: () => {
                u();
              },
              hasMore: c,
              loader: /* @__PURE__ */ e.jsx(we, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(ce, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                R,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: s,
                  style: { margin: "0 8px" },
                  loading: r,
                  renderItem: ({ id: f }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: l.avatarItem,
                      onClick: (I) => {
                        I.stopPropagation(), t == null || t(f), a(!1), g();
                      },
                      children: /* @__PURE__ */ e.jsx(ve, { src: Z(f), placeholder: /* @__PURE__ */ e.jsx(K, { size: "default" }), preview: !1 })
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
        Le,
        {
          shape: i,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, rt = ({ value: t, onChange: i, shape: s, ...n }) => {
  const [l, o] = x(void 0), [a, c] = x(!1), [d, p] = x(void 0), m = async (u) => {
    c(!0), p(u.url ?? u.preview);
  };
  return D(() => {
    o(t ? {
      uid: t,
      name: t,
      url: Z(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Qe,
      {
        beforeCrop: async (u) => {
          if (u.type === "image/svg+xml") {
            const r = await w.base.uploadFile({ type: "avatar" }, u);
            return r.length > 0 && (i == null || i(r[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          ye,
          {
            customRequest: async (u) => {
              var g, f;
              const r = await w.base.uploadFile({ type: "avatar", access: "public" }, u.file);
              r.length > 0 ? ((g = u.onSuccess) == null || g.call(u, r[0].id), i == null || i(r[0].id)) : (f = u.onError) == null || f.call(u, new Error("Upload file failed"));
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
            fileList: l ? [l] : [],
            ...n,
            children: l ? void 0 : /* @__PURE__ */ e.jsx(nt, { shape: s, onChange: i })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(V, { open: a, footer: null, onCancel: () => c(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: d }) })
  ] });
}, _t = ({ className: t }) => {
  const { t: i } = S("common"), { user: s } = ae(), { currentOrgId: n, setCurrentOrgId: l } = oe(), o = (s == null ? void 0 : s.organizations) || [], a = (m) => {
    l(m), window.location.reload();
  };
  if (o.length === 0)
    return null;
  const c = o.find((m) => m.id === n), d = c ? c.name : i("organization.global", { defaultValue: "Global" }), p = [
    ...o.map((m) => ({
      key: m.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: m.name }),
        n === m.id && /* @__PURE__ */ e.jsx(ze, {})
      ] }),
      onClick: () => a(m.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    J,
    {
      className: t,
      menu: {
        items: p,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(Ae, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: d })
      ]
    }
  );
}, Y = ({
  permission: t,
  permissions: i = [],
  checkAll: s = !1,
  fallback: n = null,
  children: l
}) => {
  const { hasPermission: o, hasAnyPermission: a, hasAllPermissions: c, isAdmin: d, loading: p } = W();
  return p ? null : d ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : t ? o(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : i.length > 0 ? (s ? c(i) : a(i)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: l });
}, Pt = ({
  fallback: t = null,
  children: i
}) => {
  const { isAdmin: s, loading: n } = W();
  return n ? null : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, it = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Mt = ({ className: t }) => {
  const { t: i } = S("task"), s = me(), { user: n } = pe(), { tasksDropdownOpen: l, setTasksDropdownOpen: o, tasks: a, setTasks: c } = oe(), { runAsync: d, loading: p } = F(async () => w.tasks.listUserTasks({}), {
    onSuccess: (r) => {
      xe(a, r, (g, f) => g.id === f.id && g.status === f.status && g.progress === f.progress) || c(r);
    },
    pollingInterval: l ? 3e3 : 6e4,
    ready: !!n,
    refreshDeps: [n]
  });
  D(() => {
    l && d();
  }, [l]);
  const m = async (r) => {
    const g = await w.base.downloadFile({ fileKey: r }, { params: { method: "sign" } }), f = `/api/files/${r}?signature=${g.signature}&expires=${g.expires}`;
    window.open(f, "_blank");
  }, u = () => /* @__PURE__ */ e.jsxs("div", { style: { width: 520, maxHeight: 500, overflow: "auto", padding: 8 }, children: [
    /* @__PURE__ */ e.jsx(
      R,
      {
        size: "small",
        dataSource: a,
        loading: p,
        renderItem: (r) => /* @__PURE__ */ e.jsx(
          R.Item,
          {
            extra: /* @__PURE__ */ e.jsx(M, { color: it[r.status], style: { marginLeft: 6 }, children: i(`status.${r.status}`, { defaultValue: r.status }) }),
            actions: [
              r.artifact_file_key && /* @__PURE__ */ e.jsx(
                j,
                {
                  type: "text",
                  size: "small",
                  icon: /* @__PURE__ */ e.jsx(Pe, {}),
                  onClick: () => m(r.artifact_file_key)
                }
              )
            ].filter(Boolean),
            children: /* @__PURE__ */ e.jsx(
              R.Item.Meta,
              {
                title: /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13 }, children: /* @__PURE__ */ e.jsxs(G.Text, { ellipsis: { tooltip: !0 }, children: [
                  i(`type.${r.type}`, { defaultValue: r.type }),
                  " ",
                  r.artifact_file_name && `- ${r.artifact_file_name}`
                ] }) }),
                description: (r.status === "running" || r.status === "pending") && /* @__PURE__ */ e.jsx(Se, { percent: r.progress ?? 0, size: "small", style: { marginTop: 4 } })
              }
            )
          },
          r.id
        )
      }
    ),
    /* @__PURE__ */ e.jsx(Y, { permission: "task:view", children: /* @__PURE__ */ e.jsx("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 8, textAlign: "center" }, children: /* @__PURE__ */ e.jsx(j, { type: "link", size: "small", onClick: () => s("/tasks"), children: i("more", { defaultValue: "More" }) }) }) })
  ] });
  return !a || a.length === 0 ? null : /* @__PURE__ */ e.jsxs(J, { className: t, overlay: u, placement: "bottomRight", open: l, onOpenChange: o, children: [
    /* @__PURE__ */ e.jsx(_e, { style: { marginRight: 4 } }),
    /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: 2 }, children: i("tasks", { defaultValue: "Tasks" }) })
  ] });
}, Dt = ({
  onResize: t,
  minWidth: i = 300,
  maxWidth: s = window.innerWidth * 0.5
}) => {
  const [n, l] = x(!1), [o, a] = x(!1), c = B((m) => {
    m.preventDefault(), l(!0);
  }, []), d = B(
    (m) => {
      if (!n) return;
      const u = window.innerWidth - m.clientX, r = Math.max(i, Math.min(s, u));
      t(r);
    },
    [n, i, s, t]
  ), p = B(() => {
    l(!1);
  }, []);
  return D(() => {
    if (n)
      return document.addEventListener("mousemove", d), document.addEventListener("mouseup", p), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", d), document.removeEventListener("mouseup", p), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [n, d, p]), /* @__PURE__ */ e.jsx(
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
}, re = (t) => {
  const [i, s] = x(!1), { permission: n, icon: l, tooltip: o, onClick: a, confirm: c, label: d, ...p } = t, m = !!p.disabled, u = a ? async () => {
    s(!0);
    try {
      await a();
    } finally {
      s(!1);
    }
  } : void 0;
  let r = /* @__PURE__ */ e.jsx(
    j,
    {
      type: "link",
      size: "small",
      loading: i,
      icon: l,
      onClick: c && !m ? void 0 : u,
      ...p,
      children: d && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: d })
    }
  );
  if (c && !m) {
    const g = async () => {
      c.onConfirm ? await c.onConfirm() : u && await u();
    };
    r = /* @__PURE__ */ e.jsx(
      U,
      {
        title: c.title,
        description: c.description,
        onConfirm: g,
        okText: c.okText,
        cancelText: c.cancelText,
        children: r
      }
    );
  }
  return o && (r = m ? /* @__PURE__ */ e.jsx(te, { title: o, children: /* @__PURE__ */ e.jsx("span", { style: { display: "inline-block", cursor: "not-allowed" }, children: r }) }) : /* @__PURE__ */ e.jsx(te, { title: o, children: r })), n && (r = /* @__PURE__ */ e.jsx(Y, { permission: n, children: r })), r;
}, Et = ({ actions: t, maxVisibleItems: i }) => {
  const s = t.filter((a) => !a.hidden);
  if (!i || s.length <= i)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: s.map(({ key: a, ...c }) => /* @__PURE__ */ e.jsx(re, { ...c }, a)) });
  const n = s.slice(0, i - 1), o = s.slice(i - 1).map((a) => {
    const { key: c, label: d, icon: p, permission: m, onClick: u, confirm: r, disabled: g, tooltip: f } = a, z = {
      key: c,
      label: d,
      icon: p,
      disabled: g,
      onClick: async () => {
        r ? V.confirm({
          title: r.title,
          content: r.description,
          onOk: r.onConfirm || u,
          okText: r.okText,
          cancelText: r.cancelText
        }) : u && await u();
      }
    };
    return m ? {
      ...z,
      label: /* @__PURE__ */ e.jsx(Y, { permission: m, children: /* @__PURE__ */ e.jsx("span", { children: d ?? f }) })
    } : z;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    n.map(({ key: a, ...c }) => /* @__PURE__ */ e.jsx(re, { ...c }, a)),
    /* @__PURE__ */ e.jsx(le, { menu: { items: o }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(j, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(Me, {}) }) })
  ] });
}, at = Fe, ot = (t) => at[t], Rt = ({ iconName: t }) => {
  if (!t)
    return null;
  const i = ot(t);
  return i ? /* @__PURE__ */ e.jsx(qe, { fallback: null, children: /* @__PURE__ */ e.jsx(i, {}) }) : null;
}, Vt = ({ onChange: t }) => {
  const [i, s] = x(""), [n, l] = x("");
  return /* @__PURE__ */ e.jsxs(T.Compact, { children: [
    /* @__PURE__ */ e.jsx(b, { style: { width: "calc(100% - 80px)" }, value: i, onChange: (o) => s(o.target.value) }),
    /* @__PURE__ */ e.jsx(b, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(b, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (o) => l(o.target.value) }),
    /* @__PURE__ */ e.jsx(j, { type: "primary", icon: /* @__PURE__ */ e.jsx(De, {}), onClick: () => {
      t(i, n);
    } })
  ] });
}, lt = ({ request: t, tableRef: i, ...s }, n) => {
  const [l, o] = x({
    current: 1,
    pageSize: 10
  }), [a, c] = x(0), { data: d, loading: p, refresh: m } = F(async () => {
    const u = await t({
      current: l.current,
      page_size: l.pageSize
    });
    return c(u.total), u.data;
  }, {
    refreshDeps: [l]
  });
  return Ke(n, () => ({
    reload: () => {
      m();
    }
  })), /* @__PURE__ */ e.jsx(
    Q,
    {
      rowKey: "id",
      loading: p,
      dataSource: d ?? [],
      pagination: {
        ...l,
        total: a,
        onChange: (u, r) => {
          o({ current: u, pageSize: r });
        }
      },
      ...s,
      ref: i
    }
  );
}, Bt = ({ actionRef: t, ...i }) => {
  const [s, n] = x();
  return D(() => {
    n(We(lt));
  }, []), s ? /* @__PURE__ */ e.jsx(s, { ...i, ref: t }) : null;
}, Nt = ({ className: t, onSuccess: i, token: s }) => {
  const { t: n } = S("authorization"), { t: l } = S("common"), [o] = y.useForm(), { run: a, loading: c } = F(async (d) => w.authorization.changePassword(d, s ? { headers: { Authorization: `Bearer ${s}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      v.success(n("user.passwordChanged")), o.resetFields(), i == null || i();
    },
    onError: (d) => {
      if (d instanceof Ge) {
        const p = d.code ?? "normal";
        v.error(n(`user.passwordChangeFailed.${p}`, { error: d.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        v.error(n("user.passwordChangeFailed.normal", { error: d.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", d);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    y,
    {
      form: o,
      layout: "vertical",
      onFinish: a,
      style: { maxWidth: 500, margin: "0 auto" },
      className: _("profile-password", t),
      children: [
        /* @__PURE__ */ e.jsx(
          y.Item,
          {
            name: "old_password",
            label: n("user.oldPassword"),
            rules: [{ required: !0, message: n("validation.oldPasswordRequired") }],
            className: _("profile-password-item", "profile-password-item-old-password"),
            children: /* @__PURE__ */ e.jsx(b.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          y.Item,
          {
            name: "new_password",
            label: n("user.newPassword"),
            rules: [
              { required: !0, message: n("validation.newPasswordRequired") },
              { min: 8, message: n("validation.passwordMinLength") }
            ],
            className: _("profile-password-item", "profile-password-item-new-password"),
            children: /* @__PURE__ */ e.jsx(b.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          y.Item,
          {
            name: "confirm_password",
            label: n("user.confirmPassword"),
            className: _("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: n("validation.confirmPasswordRequired") },
              ({ getFieldValue: d }) => ({
                validator(p, m) {
                  return !m || d("new_password") === m ? Promise.resolve() : Promise.reject(new Error(n("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(b.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(y.Item, { className: _("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(j, { type: "primary", htmlType: "submit", loading: c, children: l("save") }) })
      ]
    }
  );
}, Ot = ({ user: t, onSuccess: i }) => {
  const { t: s } = S("authorization"), { t: n } = S("common"), [l] = y.useForm(), [o, a] = x(!1);
  He.useEffect(() => {
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
      a(!0), await w.authorization.updateCurrentUser(d), v.success(n("updateSuccess")), i();
    } catch (p) {
      v.error(n("updateFailed")), console.error("Failed to update user information:", p);
    } finally {
      a(!1);
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
      y,
      {
        form: l,
        layout: "vertical",
        onFinish: c,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            y.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(rt, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            y.Item,
            {
              name: "username",
              label: s("user.username"),
              children: /* @__PURE__ */ e.jsx(b, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            y.Item,
            {
              name: "email",
              label: s("user.email"),
              rules: [
                { required: !0, message: s("validation.emailRequired") },
                { type: "email", message: s("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(b, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            y.Item,
            {
              name: "full_name",
              label: s("user.fullName"),
              rules: [{ required: !0, message: s("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(b, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            y.Item,
            {
              name: "phone",
              label: s("user.phone"),
              children: /* @__PURE__ */ e.jsx(b, {})
            }
          ),
          /* @__PURE__ */ e.jsx(y.Item, { children: /* @__PURE__ */ e.jsx(j, { type: "primary", htmlType: "submit", loading: o, children: n("save") }) })
        ]
      }
    )
  ] });
}, $t = ({ user: t, onSuccess: i }) => {
  const { t: s } = S("authorization"), { t: n } = S("common"), [l, o] = x(0), [a, c] = x(!1), [d, p] = x(!0), [m, u] = x(""), [r, g] = x("totp"), { run: f, data: I = { secret: "", qr_code: "", token: void 0 } } = F(
    () => w.authorization.enableMfa({ mfa_type: r }),
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
  ), z = async () => {
    if (!m) {
      v.warning(s("mfa.enterVerificationCode"));
      return;
    }
    const k = {
      code: m,
      mfa_type: r
    };
    "token" in I && (k.token = I.token);
    try {
      c(!0), await w.authorization.verifyAndActivateMfa(k), v.success(s("mfa.enableSuccess")), o(2), i();
    } catch (L) {
      v.error(s("mfa.verificationFailed")), console.error("Failed to verify MFA:", L);
    } finally {
      c(!1);
    }
  }, h = async () => {
    try {
      c(!0), await w.authorization.disableMfa(), v.success(s("mfa.disableSuccess")), i();
    } catch (k) {
      v.error(n("operationFailed")), console.error("Failed to disable MFA:", k);
    } finally {
      c(!1);
    }
  }, C = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        $,
        {
          status: "success",
          title: s("mfa.enabled"),
          subTitle: s("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            j,
            {
              danger: !0,
              onClick: () => {
                V.confirm({
                  title: s("mfa.confirmDisable"),
                  content: s("mfa.disableWarning"),
                  onOk: h,
                  okButtonProps: { danger: !0 }
                });
              },
              children: s("mfa.disable")
            }
          )
        }
      );
    const k = () => {
      var L;
      switch (l) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              se,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: s("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: s(r === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
                ] }),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20 }
              }
            ),
            /* @__PURE__ */ e.jsx(
              j,
              {
                type: "primary",
                onClick: f,
                loading: a,
                children: s("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              se,
              {
                message: s("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: r === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: r === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(Ie, { value: I.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: r === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: r === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: d ? "*".repeat(((L = I.secret) == null ? void 0 : L.length) ?? 0) : I.secret }),
              /* @__PURE__ */ e.jsx(
                j,
                {
                  type: "link",
                  onClick: () => p(!d),
                  icon: d ? /* @__PURE__ */ e.jsx(ue, {}) : /* @__PURE__ */ e.jsx(Ve, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              b,
              {
                placeholder: s("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: m,
                onChange: (E) => u(E.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(T, { children: [
              /* @__PURE__ */ e.jsx(j, { onClick: () => o(0), children: n("previous") }),
              /* @__PURE__ */ e.jsx(
                j,
                {
                  type: "primary",
                  onClick: z,
                  loading: a,
                  children: n("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            $,
            {
              status: "success",
              title: s("mfa.setupSuccess"),
              subTitle: s("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(j, { type: "primary", onClick: () => o(0), children: n("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: l === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          be,
          {
            defaultValue: "totp",
            onChange: (L) => {
              g(L), o(0);
            },
            value: r,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Ee, {}), label: s("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Re, {}), label: s("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(ce, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        ke,
        {
          current: l,
          items: [
            { title: s(r === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: s(r === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: s(r === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: s(r === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: s(r === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: s(r === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      k()
    ] });
  };
  return /* @__PURE__ */ e.jsx("div", { style: { padding: 8 }, children: C() });
}, { Text: O } = G, Ut = () => {
  const { t } = S("authorization"), { t: i } = S("common"), [s, n] = x(null), [l, o] = x(!1), { data: a = [], loading: c, run: d } = F(() => w.authorization.getUserSessions({}), {
    onError: (r) => {
      v.error(t("session.getSessionsFailed", { error: r, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: p } = F((r) => w.authorization.terminateSession({ id: r }), {
    onSuccess: () => {
      v.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" })), d();
    },
    onError: (r) => {
      v.error(t("session.terminateFailed", { error: r, defaultValue: "Failed to terminate session: {{error}}" }));
    },
    onFinally: () => {
      n(null);
    },
    onBefore: ([r]) => {
      n(r);
    },
    manual: !0
  }), { run: m } = F(() => w.authorization.terminateOtherSessions(), {
    onSuccess: () => {
      v.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" })), d();
    },
    onError: (r) => {
      v.error(t("session.terminateAllFailed", { error: r, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
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
      render: (r, g) => /* @__PURE__ */ e.jsxs(T, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(T, { children: [
          /* @__PURE__ */ e.jsx(Be, {}),
          /* @__PURE__ */ e.jsx(O, { strong: !0, children: r })
        ] }),
        /* @__PURE__ */ e.jsxs(T, { children: [
          /* @__PURE__ */ e.jsx(Ne, {}),
          /* @__PURE__ */ e.jsx(O, { type: "secondary", children: g.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (r) => /* @__PURE__ */ e.jsxs(T, { children: [
        /* @__PURE__ */ e.jsx(Oe, {}),
        /* @__PURE__ */ e.jsx("span", { children: r })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (r) => /* @__PURE__ */ e.jsxs(T, { children: [
        /* @__PURE__ */ e.jsx($e, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(r).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (r) => r.is_current ? /* @__PURE__ */ e.jsx(M, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(M, { color: "blue", children: t("session.active") })
    },
    {
      title: i("actions"),
      key: "action",
      render: (r) => r.is_current ? /* @__PURE__ */ e.jsx(O, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        U,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => p(r.id),
          okText: i("confirm"),
          cancelText: i("cancel"),
          children: /* @__PURE__ */ e.jsx(
            j,
            {
              type: "link",
              danger: !0,
              loading: s === r.id,
              children: t("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(T, { direction: "vertical", style: { padding: 8, width: "100%" }, children: [
    /* @__PURE__ */ e.jsxs(T, { direction: "horizontal", style: { float: "right" }, children: [
      a.length > 1 && /* @__PURE__ */ e.jsx(
        U,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: m,
          okText: i("confirm"),
          cancelText: i("cancel"),
          children: /* @__PURE__ */ e.jsx(
            j,
            {
              danger: !0,
              loading: l,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      /* @__PURE__ */ e.jsx(j, { onClick: () => d(), loading: c, children: i("refresh") })
    ] }),
    !c && a.length === 0 ? /* @__PURE__ */ e.jsx(de, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
      Q,
      {
        columns: u,
        dataSource: a,
        rowKey: "id",
        loading: c,
        pagination: !1
      }
    )
  ] });
}, { RangePicker: ct } = Te, { Option: A } = q, dt = (t) => t || "N/A", ut = (t, i) => t === "success" ? /* @__PURE__ */ e.jsx(M, { color: "success", children: i("statuses.success") }) : /* @__PURE__ */ e.jsx(M, { color: "error", children: i("statuses.failed") }), Ht = ({
  userId: t,
  request: i = (n) => t ? w.authorization.getUserLogs({ id: t, ...n }) : w.authorization.getCurrentUserLogs(n),
  columnsFilter: s = (n) => n
}) => {
  const { t: n } = S("authorization"), { t: l } = S("common"), [o, a] = x({
    current: 1,
    pageSize: 10,
    total: 0
  }), [c, d] = x({}), [p] = y.useForm(), { loading: m, run: u, data: { data: r } = {} } = F(async (h = c, C = 1, k = 10) => i({
    ...h,
    current: C ?? 1,
    page_size: k ?? 10
  }), {
    onError(h) {
      v.error(n("auditLog.fetchFailed", { error: h }));
    },
    onSuccess({ total: h }) {
      a({
        ...o,
        total: h
      });
    }
  });
  D(() => {
    u(c, 1, o.pageSize);
  }, []);
  const g = (h) => {
    a({
      ...o,
      current: h.current,
      pageSize: h.pageSize
    }), u({}, h.current, h.pageSize);
  }, f = (h) => {
    var C, k, L, E;
    u({
      ...h,
      start_time: (k = (C = h.dateRange) == null ? void 0 : C[0]) == null ? void 0 : k.toISOString(),
      end_time: (E = (L = h.dateRange) == null ? void 0 : L[1]) == null ? void 0 : E.toISOString()
    }, 1, o.pageSize);
  }, I = () => {
    p.resetFields(), d({}), a({ ...o, current: 1 }), u({}, 1, o.pageSize);
  }, z = [
    {
      title: n("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (h) => fe(h)
    },
    {
      title: n("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (h, C) => h ? n(`action.${h.replace(/:/g, ".")}`, { defaultValue: C.action_name }) : C.action_name ?? C.action
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
      render: (h) => dt(h)
    },
    {
      title: n("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (h) => ut(h, n)
    },
    {
      title: n("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (h) => /* @__PURE__ */ e.jsx(j, { type: "link", icon: /* @__PURE__ */ e.jsx(ue, {}), onClick: () => {
        V.info({
          title: n("auditLog.details"),
          content: JSON.stringify(h)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(H, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      y,
      {
        form: p,
        layout: "horizontal",
        onFinish: f,
        initialValues: c,
        children: /* @__PURE__ */ e.jsxs(Ce, { gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(P, { xxl: 6, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(y.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(b, { placeholder: n("auditLog.searchPlaceholder") }) }) }),
          /* @__PURE__ */ e.jsx(P, { xxl: 4, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(y.Item, { name: "action", noStyle: !0, children: /* @__PURE__ */ e.jsxs(q, { allowClear: !0, placeholder: n("auditLog.selectAction"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(A, { value: "login", children: n("actions.login") }),
            /* @__PURE__ */ e.jsx(A, { value: "logout", children: n("actions.logout") }),
            /* @__PURE__ */ e.jsx(A, { value: "password_reset", children: n("actions.passwordReset") }),
            /* @__PURE__ */ e.jsx(A, { value: "mfa_change", children: n("actions.mfaChange") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(P, { xxl: 3, xl: 6, lg: 8, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(y.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(q, { allowClear: !0, placeholder: n("auditLog.selectStatus"), style: { width: "100%" }, children: [
            /* @__PURE__ */ e.jsx(A, { value: "success", children: n("statuses.success") }),
            /* @__PURE__ */ e.jsx(A, { value: "failed", children: n("statuses.failed") })
          ] }) }) }),
          /* @__PURE__ */ e.jsx(P, { xxl: 6, xl: 6, lg: 10, md: 12, sm: 12, xs: 24, children: /* @__PURE__ */ e.jsx(y.Item, { name: "dateRange", noStyle: !0, children: /* @__PURE__ */ e.jsx(ct, { style: { width: "100%" } }) }) }),
          /* @__PURE__ */ e.jsx(P, { xxl: 5, xl: 24, lg: 14, md: 24, sm: 24, xs: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(T, { children: [
            /* @__PURE__ */ e.jsx(j, { onClick: I, children: l("reset") }),
            /* @__PURE__ */ e.jsx(j, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Ue, {}), children: l("search") })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(H, { children: /* @__PURE__ */ e.jsx(
      Q,
      {
        rowKey: "id",
        columns: s(z),
        dataSource: r,
        pagination: {
          ...o,
          showSizeChanger: !0,
          showTotal: (h) => l("totalItems", { total: h })
        },
        loading: m,
        onChange: g,
        scroll: { x: "max-content" }
      }
    ) })
  ] });
}, { Text: ie } = G, mt = {
  debug: "default",
  info: "processing",
  warn: "warning",
  error: "error"
}, qt = ({ taskId: t, poll: i }) => {
  const { t: s } = S("task"), { data: n = [], loading: l } = F(
    () => t ? w.tasks.getTaskLogs({ id: t }) : Promise.reject(new Error("No task id")),
    {
      refreshDeps: [t],
      ready: !!t,
      pollingInterval: i ? 2e3 : 0
    }
  );
  return /* @__PURE__ */ e.jsx(
    H,
    {
      title: s("logsTitle", { defaultValue: "Task logs" }),
      size: "small",
      style: { marginTop: 16 },
      children: l && !n.length ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 24 }, children: /* @__PURE__ */ e.jsx(K, {}) }) : n.length ? /* @__PURE__ */ e.jsx(
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
            /* @__PURE__ */ e.jsx(ie, { type: "secondary", style: { fontSize: 11 }, children: o.created_at }),
            o.level && /* @__PURE__ */ e.jsxs(ie, { type: mt[o.level], style: { marginLeft: 8, fontSize: 11 }, children: [
              "[",
              o.level,
              "]"
            ] }),
            /* @__PURE__ */ e.jsx("div", { style: { display: "inline", marginLeft: 8 }, children: o.message })
          ] }, o.id))
        }
      ) : /* @__PURE__ */ e.jsx(de, { description: s("noLogs", { defaultValue: "No logs yet." }) })
    }
  );
};
export {
  At as A,
  Rt as D,
  J as H,
  ne as L,
  _t as O,
  Lt as P,
  Dt as R,
  Mt as T,
  Ht as U,
  zt as a,
  Et as b,
  rt as c,
  Vt as d,
  tt as e,
  Y as f,
  ot as g,
  Pt as h,
  Bt as i,
  Nt as j,
  Ot as k,
  $t as l,
  Ut as m,
  qt as n
};
