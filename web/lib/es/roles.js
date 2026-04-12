import { j as e } from "./vendor.js";
import { useMemo as W, useState as z, useRef as qe, useEffect as ie, useCallback as Y } from "react";
import { message as L, Empty as $, Spin as me, Typography as _e, Tag as k, Descriptions as J, Card as H, Drawer as Be, Space as q, Form as A, Tooltip as X, Button as O, Popconfirm as Je, Row as We, Col as be, Input as fe, Select as ee, Table as He, Alert as Ke, Tabs as Qe, Radio as de, Tree as Ye, Checkbox as ce } from "antd";
import { TeamOutlined as we, LockOutlined as pe, ToolOutlined as Xe, UserOutlined as Ze, EditOutlined as el, CopyOutlined as Ve, DeleteOutlined as ll, ReloadOutlined as tl, PlusOutlined as ol, DownOutlined as il, UpOutlined as al } from "@ant-design/icons";
import { f as Z } from "./components.js";
import { a as U } from "./index.js";
import { useTranslation as le } from "react-i18next";
import { c as ge, a as Te, b as ve } from "./contexts.js";
import { useNavigate as Re, useParams as rl, useSearchParams as nl } from "react-router-dom";
import { P as ue } from "./base.js";
import { useRequest as he } from "ahooks";
import { isArray as sl, has as dl } from "lodash-es";
import { createStyles as cl } from "antd-style";
const ul = ({ roleId: r, open: T, onClose: o }) => {
  const { t: s } = le("authorization"), { siteConfig: C } = ge(), v = (C == null ? void 0 : C.enable_multi_org) ?? !1, { data: i, loading: M } = he(async () => r ? U.authorization.getRole({ id: r }) : null, {
    refreshDeps: [r, T],
    ready: !!r && T,
    onError: () => {
      L.error(s("role.loadDetailError", { defaultValue: "Failed to load role details" }));
    }
  }), {
    data: j,
    loading: b,
    error: B
  } = he(async () => U.authorization.listPermissions(), {
    refreshDeps: [T],
    ready: T
  }), I = j ?? [], S = W(() => {
    var y;
    if (!((y = i == null ? void 0 : i.permissions) != null && y.length)) return {};
    const p = {};
    for (const P of i.permissions) {
      const _ = P.code.split(":"), d = _.length >= 2 ? `${_[0]}:${_[1]}` : _[0];
      p[d] || (p[d] = []), p[d].push(P);
    }
    return p;
  }, [i == null ? void 0 : i.permissions]), g = W(() => {
    var _;
    if (!((_ = i == null ? void 0 : i.permissions) != null && _.length))
      return /* @__PURE__ */ e.jsx($, { description: s("role.noPermissions", { defaultValue: "No permissions assigned" }) });
    const p = {
      maxHeight: 420,
      overflowY: "auto",
      border: "1px solid var(--ant-color-border)",
      borderRadius: 6,
      padding: "12px 12px 4px"
    };
    if (b && I.length === 0 && !B)
      return /* @__PURE__ */ e.jsx("div", { style: { ...p, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }, children: /* @__PURE__ */ e.jsx(me, {}) });
    const y = [], P = new Set(i.permissions.map((d) => d.id));
    if (I.length > 0) {
      const d = /* @__PURE__ */ new Set();
      for (const m of I)
        for (const w of m.permissions || [])
          d.add(w.id);
      I.forEach((m, w) => {
        const V = (m.permissions || []).filter((n) => P.has(n.id));
        V.length && y.push({
          key: `catalog-${w}`,
          groupTitleKey: `permission.title.${m.name.replace(/ /g, "_")}`,
          groupTitleDefault: m.name,
          permissions: V
        });
      });
      const u = i.permissions.filter((m) => !d.has(m.id));
      u.length && y.push({
        key: "orphans",
        groupTitleKey: "role.otherPermissions",
        groupTitleDefault: "Other permissions",
        permissions: u
      });
    } else
      Object.entries(S).forEach(([d, u], m) => {
        y.push({
          key: `fallback-${m}`,
          groupTitleKey: `permission.title.${d.replace(/:/g, ".")}`,
          groupTitleDefault: d,
          permissions: u
        });
      });
    return /* @__PURE__ */ e.jsx("div", { style: p, children: y.map((d) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 12 }, children: [
      /* @__PURE__ */ e.jsx(_e.Text, { strong: !0, style: { display: "block", marginBottom: 8 }, children: s(d.groupTitleKey, { defaultValue: d.groupTitleDefault }) }),
      /* @__PURE__ */ e.jsx(
        "div",
        {
          style: {
            marginLeft: 4,
            paddingLeft: 12,
            borderLeft: "2px solid var(--ant-color-split)"
          },
          children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 }, children: d.permissions.map((u) => /* @__PURE__ */ e.jsx(k, { title: u.code, children: s(`permission.title.${u.code.replace(/:/g, ".")}`, { defaultValue: u.name }) }, u.id)) })
        }
      )
    ] }, d.key)) });
  }, [i, I, b, B, S, s]), G = W(() => {
    var p;
    return i != null && i.policy_document ? ((p = i.policy_document.Statement) == null ? void 0 : p.length) > 0 : !1;
  }, [i == null ? void 0 : i.policy_document]), D = W(() => {
    var p;
    return (((p = i == null ? void 0 : i.ai_tool_permissions) == null ? void 0 : p.length) || 0) > 0;
  }, [i == null ? void 0 : i.ai_tool_permissions]), R = W(() => {
    var y, P;
    const p = [
      i ? /* @__PURE__ */ e.jsxs(J, { column: 1, bordered: !0, size: "small", children: [
        /* @__PURE__ */ e.jsx(J.Item, { label: s("role.name", { defaultValue: "Role Name" }), children: i.name }),
        /* @__PURE__ */ e.jsx(J.Item, { label: s("role.description", { defaultValue: "Description" }), children: i.description || "-" }),
        /* @__PURE__ */ e.jsx(J.Item, { label: s("role.roleType", { defaultValue: "Role Type" }), children: i.role_type === "system" ? /* @__PURE__ */ e.jsx(k, { color: "orange", children: s("role.typeSystem", { defaultValue: "System" }) }) : /* @__PURE__ */ e.jsx(k, { color: "default", children: s("role.typeUser", { defaultValue: "User" }) }) }),
        v && /* @__PURE__ */ e.jsx(J.Item, { label: s("role.organization", { defaultValue: "Organization" }), children: i.organization_id ? /* @__PURE__ */ e.jsx(k, { icon: /* @__PURE__ */ e.jsx(we, {}), color: "blue", children: ((y = i.organization) == null ? void 0 : y.name) || i.organization_id }) : /* @__PURE__ */ e.jsx(k, { color: "default", children: s("role.global", { defaultValue: "Global" }) }) }),
        /* @__PURE__ */ e.jsx(J.Item, { label: s("role.createdAt", { defaultValue: "Created At" }), children: new Date(i.created_at).toLocaleString() }),
        /* @__PURE__ */ e.jsx(J.Item, { label: s("role.updatedAt", { defaultValue: "Updated At" }), children: new Date(i.updated_at).toLocaleString() })
      ] }) : null,
      ,
      /* @__PURE__ */ e.jsx(H, { title: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(pe, { style: { marginRight: 4 } }),
        s("role.permissions", { defaultValue: "Permissions" }),
        (P = i == null ? void 0 : i.permissions) != null && P.length ? ` (${i.permissions.length})` : ""
      ] }), children: g })
    ];
    if (G && p.push(
      /* @__PURE__ */ e.jsx(
        H,
        {
          title: s("role.policyDocument", { defaultValue: "Policy Document" }),
          children: /* @__PURE__ */ e.jsx("pre", { style: {
            background: "var(--ant-color-fill-tertiary)",
            padding: 12,
            borderRadius: 6,
            overflow: "auto",
            maxHeight: 400,
            fontSize: 13
          }, children: JSON.stringify(i == null ? void 0 : i.policy_document, null, 2) })
        }
      )
    ), D) {
      const _ = {};
      for (const d of i.ai_tool_permissions) {
        const u = d.toolset_id;
        _[u] || (_[u] = { toolset: d.toolset, tools: [] }), _[u].tools.push(d.tool_name);
      }
      p.push(/* @__PURE__ */ e.jsx(H, { title: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(Xe, { style: { marginRight: 4 } }),
        s("role.aiPermissions", { defaultValue: "AI Tool Permissions" })
      ] }), children: Object.entries(_).map(([d, { toolset: u, tools: m }]) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 12 }, children: [
        /* @__PURE__ */ e.jsx(_e.Text, { strong: !0, style: { display: "block", marginBottom: 4 }, children: (u == null ? void 0 : u.name) || d }),
        /* @__PURE__ */ e.jsx("div", { children: m.map((w) => /* @__PURE__ */ e.jsx(k, { color: "blue", style: { marginBottom: 4 }, children: w }, w)) })
      ] }, d)) }));
    }
    return p;
  }, [i, g, G, D, v, s]);
  return /* @__PURE__ */ e.jsx(
    Be,
    {
      title: s("role.viewTitle", { defaultValue: "View Role" }),
      open: T,
      onClose: o,
      width: 800,
      destroyOnHidden: !0,
      children: /* @__PURE__ */ e.jsx(me, { spinning: M, children: /* @__PURE__ */ e.jsx(q, { direction: "vertical", children: i ? R : !M && /* @__PURE__ */ e.jsx($, {}) }) })
    }
  );
}, ml = () => {
  const { t: r } = le("authorization"), { t: T } = le("common"), { siteConfig: o } = ge(), s = (o == null ? void 0 : o.enable_multi_org) ?? !1, C = Re(), { user: v } = Te(), { hasGlobalPermission: i } = ve(), M = (v == null ? void 0 : v.organizations) || [], [j] = A.useForm(), [b, B] = z({
    current: ue.DEFAULT_CURRENT,
    page_size: ue.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), [I, S] = z(!1), [g, G] = z(null), { run: D, data: R, loading: p } = he(async () => U.authorization.listRoles(b), {
    debounceWait: 300,
    refreshDeps: [b],
    onError: () => {
      L.error(r("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }), y = (n) => {
    B({
      ...b,
      current: ue.DEFAULT_CURRENT,
      search: n.search,
      organization_id: n.organization_id || void 0
    });
  }, P = (n, h) => {
    B((E) => ({
      ...E,
      current: n,
      page_size: h
    }));
  }, _ = (n) => {
    C(`/authorization/roles/${n}/edit`);
  }, d = (n) => {
    C(`/authorization/roles/create?cloneFrom=${encodeURIComponent(n)}`);
  }, u = async (n) => {
    try {
      await U.authorization.deleteRole({ id: n }), L.success(r("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), D();
    } catch (h) {
      L.error(r("role.deleteError", { defaultValue: "Failed to delete role: {{error}}", error: h }));
    }
  }, m = (n) => {
    G(n), S(!0);
  }, w = s && i("authorization:role:view"), V = [
    {
      title: r("role.name", { defaultValue: "Role Name" }),
      dataIndex: "name",
      key: "name",
      render: (n, h) => /* @__PURE__ */ e.jsxs(q, { children: [
        /* @__PURE__ */ e.jsx(Ze, {}),
        /* @__PURE__ */ e.jsx("a", { onClick: () => m(h.id), children: n })
      ] })
    },
    {
      title: r("role.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: r("role.roleType", { defaultValue: "Role Type" }),
      key: "role_type",
      render: (n, h) => h.role_type === "system" ? /* @__PURE__ */ e.jsx(k, { color: "orange", children: r("role.typeSystem", { defaultValue: "System" }) }) : /* @__PURE__ */ e.jsx(k, { color: "default", children: r("role.typeUser", { defaultValue: "User" }) })
    },
    {
      title: r("role.organization", { defaultValue: "Organization" }),
      key: "organization",
      hidden: !s,
      render: (n, h) => {
        var E;
        return h.organization_id ? /* @__PURE__ */ e.jsx(k, { icon: /* @__PURE__ */ e.jsx(we, {}), color: "blue", children: ((E = h.organization) == null ? void 0 : E.name) || h.organization_id }) : /* @__PURE__ */ e.jsx(k, { color: "default", children: r("role.global", { defaultValue: "Global" }) });
      }
    },
    {
      title: r("role.permissionCount", { defaultValue: "Permissions" }),
      key: "permission_count",
      render: (n, h) => {
        var E;
        return /* @__PURE__ */ e.jsxs(k, { color: "blue", children: [
          /* @__PURE__ */ e.jsx(pe, {}),
          " ",
          ((E = h.permissions) == null ? void 0 : E.length) || 0
        ] });
      }
    },
    {
      title: r("role.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (n) => new Date(n).toLocaleString()
    },
    {
      title: T("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (n, h) => {
        const E = h.role_type === "system";
        return /* @__PURE__ */ e.jsxs(q, { size: "small", children: [
          !E && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(Z, { permission: "authorization:role:update", children: /* @__PURE__ */ e.jsx(X, { title: r("role.edit", { defaultValue: "Edit Role" }), children: /* @__PURE__ */ e.jsx(
              O,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(el, {}),
                onClick: () => _(h.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(Z, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(X, { title: r("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              O,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(Ve, {}),
                onClick: () => d(h.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(Z, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(X, { title: r("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
              Je,
              {
                title: r("role.deleteConfirm", { defaultValue: "Are you sure you want to delete this role?" }),
                onConfirm: () => u(h.id),
                okText: T("confirm", { defaultValue: "Confirm" }),
                cancelText: T("cancel", { defaultValue: "Cancel" }),
                children: /* @__PURE__ */ e.jsx(
                  O,
                  {
                    type: "text",
                    size: "small",
                    danger: !0,
                    icon: /* @__PURE__ */ e.jsx(ll, {})
                  }
                )
              }
            ) }) })
          ] }),
          E && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(X, { title: r("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }), children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(O, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(pe, {}), disabled: !0 }) }) }),
            /* @__PURE__ */ e.jsx(Z, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(X, { title: r("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              O,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(Ve, {}),
                onClick: () => d(h.id)
              }
            ) }) })
          ] })
        ] });
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(H, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      A,
      {
        form: j,
        layout: "vertical",
        onFinish: y,
        name: "roleSearchForm",
        initialValues: {
          search: b.search,
          organization_id: b.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(We, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(be, { children: /* @__PURE__ */ e.jsxs(q, { children: [
            /* @__PURE__ */ e.jsx(A.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              fe.Search,
              {
                placeholder: r("role.searchPlaceholder", { defaultValue: "Role name/description" }),
                allowClear: !0,
                onSearch: () => {
                  y(j.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            w && /* @__PURE__ */ e.jsx(A.Item, { name: "organization_id", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              ee,
              {
                placeholder: r("role.allOrganizations", { defaultValue: "All Organizations" }),
                allowClear: !0,
                onChange: () => {
                  y(j.getFieldsValue());
                },
                style: { minWidth: 180 },
                options: [
                  { value: "", label: r("role.global", { defaultValue: "Global" }) },
                  ...M.map((n) => ({ value: n.id, label: n.name }))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(be, { children: /* @__PURE__ */ e.jsxs(q, { children: [
            /* @__PURE__ */ e.jsx(
              O,
              {
                onClick: () => {
                  y(j.getFieldsValue());
                },
                icon: /* @__PURE__ */ e.jsx(tl, {}),
                children: T("refresh", { defaultValue: "Refresh" })
              }
            ),
            /* @__PURE__ */ e.jsx(Z, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(
              O,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(ol, {}),
                onClick: () => C("/authorization/roles/create"),
                children: r("role.create", { defaultValue: "Create Role" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(H, { children: /* @__PURE__ */ e.jsx(
      He,
      {
        rowKey: "id",
        loading: p,
        dataSource: (R == null ? void 0 : R.data) ?? [],
        columns: V,
        pagination: {
          current: b.current,
          pageSize: b.page_size,
          total: (R == null ? void 0 : R.total) ?? 0,
          onChange: P,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (n) => T("totalItems", { defaultValue: `Total ${n} items`, total: n })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ul,
      {
        roleId: g,
        open: I,
        onClose: () => S(!1)
      }
    )
  ] });
}, Pl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ml
}, Symbol.toStringTag, { value: "Module" })), { TextArea: ze } = fe, pl = cl(({ css: r }) => ({
  rolePermissionExtra: r`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
  rolePolicyExtra: r`
      position: absolute;
      right: 5px;
      top: 5px;
    `
})), hl = {
  allow_all: {
    policy: {
      Statement: [
        {
          Effect: "Allow",
          Action: ["*"]
        }
      ]
    }
  },
  deny_all: {
    Statement: [
      {
        Effect: "Deny",
        Action: ["*"]
      }
    ]
  },
  allow_with_action: {
    Statement: [
      {
        Effect: "Allow",
        Action: ["authorization:user:view"]
      }
    ]
  },
  allow_with_condition: {
    Statement: [
      {
        Effect: "Allow",
        Action: ["authorization:user:update"],
        Condition: {
          StringEquals: {
            "id:": "abcdef"
          }
        }
      },
      {
        Effect: "Deny",
        Action: ["*"]
      }
    ]
  },
  allow_with_uri: {
    Statement: [
      {
        Effect: "Allow",
        Action: ["authorization:user:view"],
        Condition: {
          StringEquals: {
            "http.uri": "/api/users/abcdef",
            "http.method": "GET"
          }
        }
      },
      {
        Effect: "Deny",
        Action: ["*"]
      }
    ]
  }
}, Se = JSON.stringify({ Statement: [] }, null, 2), fl = () => {
  const { styles: r } = pl(), { hasGlobalPermission: T } = ve(), { t: o } = le("authorization"), { t: s } = le("common"), C = Re(), { id: v } = rl(), [i] = nl(), M = i.get("cloneFrom") || void 0, j = !!v, { enableMultiOrg: b, currentOrgId: B } = ge(), { user: I } = Te(), S = (I == null ? void 0 : I.organizations) || [], [g] = A.useForm(), [G, D] = z([]), [R, p] = z([]), [y, P] = z([]), [_, d] = z(!0), [u, m] = z([]), [w, V] = z({}), n = qe({}), [h, E] = z(!1), [F, ae] = z("global"), [re, Pe] = z(void 0), [Ee, ye] = z(!1), [Ae, xe] = z(!1), [Ce, Ie] = z(!1);
  ie(() => {
    n.current = w;
  }, [w]), ie(() => {
    Pe(B || void 0);
  }, []);
  const je = Y(async () => {
    try {
      const t = await U.authorization.listPermissions();
      p(
        t.map((l, a) => {
          const f = (l.permissions || []).map((c) => ({
            key: c.id,
            code: c.code.replace(/:/g, "."),
            title: c.name,
            orgPermission: c.org_permission || !1
          }));
          return {
            key: `[group]-${a}`,
            title: l.name,
            code: l.name.replace(/ /g, "_"),
            children: f
          };
        })
      );
    } catch {
      L.error(o("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }, [o]);
  ie(() => {
    je();
  }, [je]);
  const K = Y(
    async (t, l) => {
      if (!t) {
        m([]), V(l || {});
        return;
      }
      E(!0);
      try {
        const f = ((await U.system.listToolSets(
          { page_size: 1e3, include_tools: !0 },
          { headers: { "X-Scope-OrgID": t } }
        )).data || []).filter((N) => N.status === "enabled");
        m(f);
        const c = l || n.current || {}, x = {};
        f.forEach((N) => {
          const Q = c[N.id] || [];
          x[N.id] = Q.filter(
            (oe) => (N.tools || []).some((se) => se.name === oe)
          );
        }), V(x);
      } catch {
        L.error(o("role.loadAiToolsetsError", { defaultValue: "Failed to load AI toolsets." })), m([]), V(l || {});
      } finally {
        E(!1);
      }
    },
    [o]
  ), Oe = (t) => t ? t.reduce((l, a) => (!a.toolset_id || !a.tool_name || (l[a.toolset_id] || (l[a.toolset_id] = []), l[a.toolset_id].includes(a.tool_name) || l[a.toolset_id].push(a.tool_name)), l), {}) : {}, ne = Y(
    async (t, l) => {
      var f;
      ye(!0);
      const a = (l == null ? void 0 : l.clone) === !0;
      try {
        const c = await U.authorization.getRole({ id: t });
        Ie(!a && c.role_type === "system");
        const x = ((f = c.permissions) == null ? void 0 : f.map((se) => se.id)) || [];
        D(x), g.setFieldsValue({ permissions: x });
        const N = c.organization_id || "", Q = N ? "organization" : "global";
        ae(Q);
        const oe = Oe(c.ai_tool_permissions || []);
        Q === "organization" && N ? await K(N, oe) : (m([]), V(a ? oe : {})), g.setFieldsValue({
          name: a ? `${c.name} (copy)` : c.name,
          description: c.description,
          role_type: Q,
          organization_id: N || void 0,
          policy_document: JSON.stringify(c.policy_document || { Statement: [] }, null, 2)
        });
      } catch {
        L.error(o("role.detailLoadError", { defaultValue: "Failed to load role details" })), C("/authorization/roles");
      } finally {
        ye(!1);
      }
    },
    [K, g, C, o]
  );
  ie(() => {
    if (j && v) {
      ne(v);
      return;
    }
    if (M) {
      ne(M, { clone: !0 });
      return;
    }
    const t = re || (S.length > 0 ? S[0].id : ""), l = b && t ? "organization" : "global";
    ae(l), g.setFieldsValue({
      role_type: l,
      organization_id: l === "organization" ? t : void 0,
      policy_document: Se,
      permissions: []
    }), D([]), V({}), l === "organization" && t ? K(t, {}) : m([]);
  }, [
    M,
    K,
    g,
    v,
    j,
    S,
    re,
    b,
    ne
  ]);
  const ke = W(() => F === "global" ? R : R.map((l) => {
    const a = (l.children || []).filter(
      (f) => f.orgPermission === !0
    );
    return {
      ...l,
      children: a
    };
  }).filter((l) => l.children && l.children.length > 0), [R, F]), De = (t) => {
    P(t), d(!1);
  }, Fe = () => {
    const t = R.map((l) => l.key);
    P(t), d(!0);
  }, Ne = () => {
    P([]), d(!1);
  }, Le = Y((t, l) => {
    V((a) => ({
      ...a,
      [t]: l
    }));
  }, []), Ge = Y((t, l) => {
    const a = u.find((c) => c.id === t);
    if (!a)
      return;
    const f = (a.tools || []).map((c) => c.name);
    V((c) => ({
      ...c,
      [t]: l ? f : []
    }));
  }, [u]), Ue = (t, l) => {
    if (F === "organization")
      return Promise.resolve();
    if (!l || l.trim() === "" || l === "{}" || l === '{"Statement":[]}')
      return G.length === 0 ? Promise.reject(
        new Error(
          o("role.permissionOrPolicyRequired", {
            defaultValue: "Please select at least one permission or provide a policy document."
          })
        )
      ) : Promise.resolve();
    try {
      return JSON.parse(l), Promise.resolve();
    } catch {
      return Promise.reject(
        new Error(o("role.invalidJsonFormat", { defaultValue: "Invalid JSON format." }))
      );
    }
  }, Me = W(() => ({
    placeholder: o("role.insertTemplate", { defaultValue: "Insert Template" }),
    options: [
      { label: o("role.allowAll", { defaultValue: "Allow All" }), value: "allow_all" },
      { label: o("role.denyAll", { defaultValue: "Deny All" }), value: "deny_all" },
      {
        label: o("role.allowWithAction", { defaultValue: "Allow with Action" }),
        value: "allow_with_action"
      },
      {
        label: o("role.denyWithCondition", { defaultValue: "Allow with Condition" }),
        value: "allow_with_condition"
      },
      {
        label: o("role.allowWithUri", { defaultValue: "Allow with URI" }),
        value: "allow_with_uri"
      }
    ]
  }), [o]), $e = async (t) => {
    const l = { ...t };
    try {
      F === "global" ? l.policy_document = JSON.parse(t.policy_document ?? "{}") : l.policy_document = { Statement: [] }, l.role_type === "organization" ? l.organization_id = l.organization_id || void 0 : l.organization_id = void 0, delete l.role_type;
      const a = F === "organization" ? Object.entries(w).map(([f, c]) => ({
        toolset_id: f,
        tools: Array.from(new Set(c))
      })).filter((f) => f.tools.length > 0) : [];
      l.ai_tool_permissions = a, l.permissions = G.filter((f) => !f.startsWith("[group]-")), xe(!0), j && v ? (await U.authorization.updateRole({ id: v }, l), L.success(o("role.updateSuccess", { defaultValue: "Role updated successfully." }))) : (await U.authorization.createRole(l), L.success(o("role.createSuccess", { defaultValue: "Role created successfully." }))), C("/authorization/roles");
    } catch (a) {
      L.error(
        o("role.saveError", {
          error: a instanceof Error ? a.message : "Unknown error",
          defaultValue: "Failed to save role.",
          action: j ? s("update", { defaultValue: "Update" }) : s("create", { defaultValue: "Create" })
        })
      );
    } finally {
      xe(!1);
    }
  }, te = j && Ce;
  return /* @__PURE__ */ e.jsxs(
    H,
    {
      title: te ? o("role.viewTitle", { defaultValue: "View Role" }) : j ? o("role.editTitle", { defaultValue: "Edit Role" }) : o("role.createTitle", { defaultValue: "Create Role" }),
      loading: Ee,
      children: [
        te && /* @__PURE__ */ e.jsx(
          Ke,
          {
            type: "info",
            message: o("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }),
            style: { marginBottom: 16 },
            showIcon: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          A,
          {
            form: g,
            layout: "vertical",
            disabled: te,
            initialValues: {
              policy_document: Se,
              permissions: []
            },
            onFinish: $e,
            children: [
              /* @__PURE__ */ e.jsx(
                Qe,
                {
                  items: [
                    {
                      key: "basic",
                      label: o("role.basicInfo", { defaultValue: "Basic Information" }),
                      children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                        /* @__PURE__ */ e.jsx(
                          A.Item,
                          {
                            label: o("role.name", { defaultValue: "Role Name" }),
                            name: "name",
                            rules: [
                              {
                                required: !0,
                                message: o("role.nameRequired", {
                                  defaultValue: "Please enter the role name."
                                })
                              }
                            ],
                            children: /* @__PURE__ */ e.jsx(fe, { placeholder: o("role.namePlaceholder", { defaultValue: "Enter role name" }) })
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          A.Item,
                          {
                            label: o("role.description", { defaultValue: "Description" }),
                            name: "description",
                            children: /* @__PURE__ */ e.jsx(
                              ze,
                              {
                                rows: 4,
                                placeholder: o("role.descriptionPlaceholder", {
                                  defaultValue: "Enter role description"
                                })
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          A.Item,
                          {
                            label: o("role.roleType", { defaultValue: "Role Type" }),
                            name: "role_type",
                            hidden: !b,
                            rules: [
                              {
                                required: !0,
                                message: o("role.roleTypeRequired", {
                                  defaultValue: "Please select role type."
                                })
                              }
                            ],
                            extra: j ? o("role.roleTypeCannotChange", {
                              defaultValue: "Role type cannot be changed after creation."
                            }) : "",
                            children: /* @__PURE__ */ e.jsxs(
                              de.Group,
                              {
                                disabled: j || !T("authorization:role:create"),
                                onChange: (t) => {
                                  const l = t.target.value;
                                  if (ae(l), l === "global")
                                    g.setFieldsValue({ organization_id: void 0 }), m([]), V({});
                                  else {
                                    const a = re || (S.length > 0 ? S[0].id : "");
                                    g.setFieldsValue({ organization_id: a }), a ? K(a, n.current) : (m([]), V({}));
                                  }
                                  D([]), g.setFieldsValue({ permissions: [] });
                                },
                                children: [
                                  /* @__PURE__ */ e.jsx(de, { value: "global", children: o("role.globalRole", { defaultValue: "Global Role" }) }),
                                  /* @__PURE__ */ e.jsx(de, { value: "organization", children: o("role.organizationRole", { defaultValue: "Organization Role" }) })
                                ]
                              }
                            )
                          }
                        ),
                        F === "organization" && /* @__PURE__ */ e.jsx(
                          A.Item,
                          {
                            hidden: !b,
                            label: o("role.organization", { defaultValue: "Organization" }),
                            name: "organization_id",
                            rules: [
                              {
                                required: !0,
                                message: o("role.organizationRequired", {
                                  defaultValue: "Please select an organization."
                                })
                              }
                            ],
                            extra: S.length > 0 ? o("role.organizationHelp", {
                              defaultValue: "Select the organization this role belongs to"
                            }) : o("role.noOrganizationsAvailable", {
                              defaultValue: "No organizations available. Please contact your administrator."
                            }),
                            children: S.length > 0 ? /* @__PURE__ */ e.jsx(
                              ee,
                              {
                                placeholder: o("role.selectOrganization", {
                                  defaultValue: "Select Organization"
                                }),
                                onChange: (t) => {
                                  D([]), g.setFieldsValue({ permissions: [] });
                                  const l = t || "";
                                  l ? K(l, {}) : (m([]), V({}));
                                },
                                children: S.map((t) => /* @__PURE__ */ e.jsx(ee.Option, { value: t.id, children: t.name }, t.id))
                              }
                            ) : /* @__PURE__ */ e.jsx(
                              ee,
                              {
                                disabled: !0,
                                placeholder: o("role.noOrganizationsAvailable", {
                                  defaultValue: "No organizations available"
                                })
                              }
                            )
                          }
                        )
                      ] })
                    },
                    {
                      key: "permissions",
                      label: o("role.permissions", { defaultValue: "Permissions" }),
                      children: /* @__PURE__ */ e.jsx(
                        A.Item,
                        {
                          name: "permissions",
                          rules: [
                            {
                              validator() {
                                if (G.length === 0)
                                  if (F === "global") {
                                    const t = g.getFieldValue("policy_document");
                                    if (!t || t.trim() === "" || t === "{}" || t === '{"Statement":[]}')
                                      return Promise.reject(
                                        new Error(
                                          o("role.permissionOrPolicyRequired", {
                                            defaultValue: "Please select at least one permission or provide a policy document."
                                          })
                                        )
                                      );
                                  } else
                                    return Promise.reject(
                                      new Error(
                                        o("role.permissionRequired", {
                                          defaultValue: "Please select at least one permission."
                                        })
                                      )
                                    );
                                return Promise.resolve();
                              }
                            }
                          ],
                          children: /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(
                            "div",
                            {
                              style: {
                                maxHeight: "400px",
                                overflowY: "auto",
                                border: "1px solid #d9d9d9",
                                borderRadius: "4px"
                              },
                              children: [
                                /* @__PURE__ */ e.jsxs("span", { className: r.rolePermissionExtra, children: [
                                  /* @__PURE__ */ e.jsx(O, { type: "link", onClick: Fe, icon: /* @__PURE__ */ e.jsx(il, {}), children: s("expandAll", { defaultValue: "Expand All" }) }),
                                  /* @__PURE__ */ e.jsx(O, { type: "link", onClick: Ne, icon: /* @__PURE__ */ e.jsx(al, {}), children: s("collapseAll", { defaultValue: "Collapse All" }) })
                                ] }),
                                /* @__PURE__ */ e.jsx(
                                  Ye,
                                  {
                                    treeData: ke,
                                    titleRender: (t) => {
                                      const l = t, a = typeof l.title == "string" ? l.title : String(l.title ?? "");
                                      return /* @__PURE__ */ e.jsx("span", { children: o(`permission.title.${l.code}`, { defaultValue: a }) });
                                    },
                                    checkable: !0,
                                    disabled: te,
                                    expandedKeys: y,
                                    autoExpandParent: _,
                                    onExpand: De,
                                    checkedKeys: G,
                                    onCheck: (t) => {
                                      let l = [];
                                      sl(t) ? l = t : dl(t, "checked") && (l = t.checked), D(l), g.setFieldsValue({ permissions: l });
                                    }
                                  }
                                )
                              ]
                            }
                          ) })
                        }
                      )
                    },
                    {
                      key: "ai-tools",
                      label: o("role.aiPermissions", { defaultValue: "AI Tool Permissions" }),
                      disabled: F === "global",
                      children: /* @__PURE__ */ e.jsx(me, { spinning: h, children: F === "organization" ? u.length > 0 ? /* @__PURE__ */ e.jsx(q, { direction: "vertical", size: "middle", style: { width: "100%" }, children: u.map((t) => {
                        const l = (t.tools || []).map((x) => x.name), a = w[t.id] || [], f = l.length > 0 && a.length === l.length, c = a.length > 0 && a.length < l.length;
                        return /* @__PURE__ */ e.jsx(
                          H,
                          {
                            size: "small",
                            title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                              /* @__PURE__ */ e.jsx(
                                ce,
                                {
                                  checked: f,
                                  indeterminate: c,
                                  onChange: (x) => Ge(t.id, x.target.checked)
                                }
                              ),
                              /* @__PURE__ */ e.jsx("span", { children: t.name })
                            ] }),
                            extra: t.description ? /* @__PURE__ */ e.jsx("span", { children: t.description }) : void 0,
                            children: (t.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(
                              ce.Group,
                              {
                                style: { width: "100%" },
                                value: w[t.id] || [],
                                onChange: (x) => Le(t.id, x),
                                children: /* @__PURE__ */ e.jsx(q, { direction: "vertical", style: { width: "100%" }, children: (t.tools || []).map((x) => /* @__PURE__ */ e.jsx(ce, { value: x.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                                  /* @__PURE__ */ e.jsx("div", { children: x.name }),
                                  x.description && /* @__PURE__ */ e.jsx(
                                    "div",
                                    {
                                      style: {
                                        color: "rgba(0,0,0,0.45)",
                                        fontSize: 12
                                      },
                                      children: x.description
                                    }
                                  )
                                ] }) }, x.name)) })
                              }
                            ) : /* @__PURE__ */ e.jsx(
                              $,
                              {
                                image: $.PRESENTED_IMAGE_SIMPLE,
                                description: o("role.aiToolsetNoTools", {
                                  defaultValue: "No tools available in this toolset."
                                })
                              }
                            )
                          },
                          t.id
                        );
                      }) }) : /* @__PURE__ */ e.jsx(
                        $,
                        {
                          image: $.PRESENTED_IMAGE_SIMPLE,
                          description: o("role.aiToolsetsEmpty", {
                            defaultValue: "No AI toolsets available for this organization."
                          })
                        }
                      ) : /* @__PURE__ */ e.jsx(
                        $,
                        {
                          image: $.PRESENTED_IMAGE_SIMPLE,
                          description: o("role.aiPermissionsGlobalInfo", {
                            defaultValue: "AI tool permissions are only available for organization roles."
                          })
                        }
                      ) })
                    },
                    {
                      key: "policy",
                      label: o("role.policyDocument", { defaultValue: "Policy Document" }),
                      disabled: F === "organization",
                      children: /* @__PURE__ */ e.jsx(
                        A.Item,
                        {
                          name: "policy_document",
                          rules: [
                            {
                              validator: Ue
                            }
                          ],
                          extra: /* @__PURE__ */ e.jsx("span", { className: r.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                            ee,
                            {
                              style: { width: 160 },
                              ...Me,
                              onChange: (t) => {
                                if (typeof t == "string") {
                                  const l = hl[t];
                                  l && g.setFieldValue("policy_document", JSON.stringify(l, null, 2));
                                }
                              }
                            }
                          ) }),
                          children: /* @__PURE__ */ e.jsx(
                            ze,
                            {
                              rows: 15,
                              style: { fontFamily: "monospace" },
                              placeholder: `{
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "account:EnableRegion",
                "account:DisableRegion"
            ],
            "Condition": {
                "StringEquals": {"id:": "abcdef"}
            }
        },
        {
            "Effect": "Allow",
            "Action": [
                "*"
            ]
        }
    ]
}`
                            }
                          )
                        }
                      )
                    }
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(A.Item, { children: /* @__PURE__ */ e.jsxs(q, { children: [
                /* @__PURE__ */ e.jsx(
                  O,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: Ae,
                    children: j ? s("update", { defaultValue: "Update" }) : s("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  O,
                  {
                    onClick: () => C("/authorization/roles"),
                    children: s("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      ]
    }
  );
}, El = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fl
}, Symbol.toStringTag, { value: "Module" }));
export {
  Pl as R,
  El as a
};
