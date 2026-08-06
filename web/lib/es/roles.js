import { j as e } from "./vendor.js";
import { useMemo as H, useState as I, useRef as qe, useEffect as se, useCallback as xe } from "react";
import { App as he, Empty as M, Spin as me, Typography as je, Tag as O, Descriptions as W, Card as K, Drawer as Be, Space as q, Form as v, Tooltip as Y, Button as C, Popconfirm as Je, Row as We, Col as _e, Input as fe, Select as Z, Table as He, Alert as Ke, Tabs as Qe, Radio as de, Tree as Ye, Checkbox as ce } from "antd";
import { TeamOutlined as Se, LockOutlined as pe, ToolOutlined as Xe, UserOutlined as Ze, EditOutlined as et, CopyOutlined as be, DeleteOutlined as tt, ReloadOutlined as lt, PlusOutlined as ot, DownOutlined as it, UpOutlined as at } from "@ant-design/icons";
import { g as X } from "./components.js";
import { a as G } from "./index.js";
import { useTranslation as ee } from "react-i18next";
import { b as ge, u as Re, a as Te } from "./contexts.js";
import { useNavigate as ve, useParams as nt, useSearchParams as rt } from "react-router-dom";
import { P as ue } from "./base.js";
import { useRequest as B } from "ahooks";
import { isArray as st, has as dt } from "lodash-es";
import { createStyles as ct } from "antd-style";
const ut = ({ roleId: x, open: s, onClose: D }) => {
  const { message: o } = he.useApp(), { t: d } = ee("authorization"), { siteConfig: P } = ge(), S = (P == null ? void 0 : P.enable_multi_org) ?? !1, { data: i, loading: U } = B(async () => x ? G.authorization.getRole({ id: x }) : null, {
    refreshDeps: [x, s],
    ready: !!x && s,
    onError: () => {
      o.error(d("role.loadDetailError", { defaultValue: "Failed to load role details" }));
    }
  }), {
    data: j,
    loading: g,
    error: $
  } = B(async () => G.authorization.listPermissions(), {
    refreshDeps: [s],
    ready: s
  }), A = j ?? [], z = H(() => {
    var b;
    if (!((b = i == null ? void 0 : i.permissions) != null && b.length)) return {};
    const p = {};
    for (const R of i.permissions) {
      const f = R.code.split(":"), r = f.length >= 2 ? `${f[0]}:${f[1]}` : f[0];
      p[r] || (p[r] = []), p[r].push(R);
    }
    return p;
  }, [i == null ? void 0 : i.permissions]), _ = H(() => {
    var f;
    if (!((f = i == null ? void 0 : i.permissions) != null && f.length))
      return /* @__PURE__ */ e.jsx(M, { description: d("role.noPermissions", { defaultValue: "No permissions assigned" }) });
    const p = {
      maxHeight: 420,
      overflowY: "auto",
      border: "1px solid var(--ant-color-border)",
      borderRadius: 6,
      padding: "12px 12px 4px"
    };
    if (g && A.length === 0 && !$)
      return /* @__PURE__ */ e.jsx("div", { style: { ...p, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }, children: /* @__PURE__ */ e.jsx(me, {}) });
    const b = [], R = new Set(i.permissions.map((r) => r.id));
    if (A.length > 0) {
      const r = /* @__PURE__ */ new Set();
      for (const m of A)
        for (const w of m.permissions || [])
          r.add(w.id);
      A.forEach((m, w) => {
        const T = (m.permissions || []).filter((n) => R.has(n.id));
        T.length && b.push({
          key: `catalog-${w}`,
          groupTitleKey: `permission.title.${m.name.replace(/ /g, "_")}`,
          groupTitleDefault: m.name,
          permissions: T
        });
      });
      const u = i.permissions.filter((m) => !r.has(m.id));
      u.length && b.push({
        key: "orphans",
        groupTitleKey: "role.otherPermissions",
        groupTitleDefault: "Other permissions",
        permissions: u
      });
    } else
      Object.entries(z).forEach(([r, u], m) => {
        b.push({
          key: `fallback-${m}`,
          groupTitleKey: `permission.title.${r.replace(/:/g, ".")}`,
          groupTitleDefault: r,
          permissions: u
        });
      });
    return /* @__PURE__ */ e.jsx("div", { style: p, children: b.map((r) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 12 }, children: [
      /* @__PURE__ */ e.jsx(je.Text, { strong: !0, style: { display: "block", marginBottom: 8 }, children: d(r.groupTitleKey, { defaultValue: r.groupTitleDefault }) }),
      /* @__PURE__ */ e.jsx(
        "div",
        {
          style: {
            marginLeft: 4,
            paddingLeft: 12,
            borderLeft: "2px solid var(--ant-color-split)"
          },
          children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 }, children: r.permissions.map((u) => /* @__PURE__ */ e.jsx(O, { title: u.code, children: d(`permission.title.${u.code.replace(/:/g, ".")}`, { defaultValue: u.name }) }, u.id)) })
        }
      )
    ] }, r.key)) });
  }, [i, A, g, $, z, d]), N = H(() => {
    var p;
    return i != null && i.policy_document ? ((p = i.policy_document.Statement) == null ? void 0 : p.length) > 0 : !1;
  }, [i == null ? void 0 : i.policy_document]), k = H(() => {
    var p;
    return (((p = i == null ? void 0 : i.ai_tool_permissions) == null ? void 0 : p.length) || 0) > 0;
  }, [i == null ? void 0 : i.ai_tool_permissions]), F = H(() => {
    var b, R;
    const p = [
      i ? /* @__PURE__ */ e.jsxs(W, { column: 1, bordered: !0, size: "small", children: [
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.name", { defaultValue: "Role Name" }), children: i.name }),
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.description", { defaultValue: "Description" }), children: i.description || "-" }),
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.roleType", { defaultValue: "Role Type" }), children: i.role_type === "system" ? /* @__PURE__ */ e.jsx(O, { color: "orange", children: d("role.typeSystem", { defaultValue: "System" }) }) : /* @__PURE__ */ e.jsx(O, { color: "default", children: d("role.typeUser", { defaultValue: "User" }) }) }),
        S && /* @__PURE__ */ e.jsx(W.Item, { label: d("role.organization", { defaultValue: "Organization" }), children: i.organization_id ? /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(Se, {}), color: "blue", children: ((b = i.organization) == null ? void 0 : b.name) || i.organization_id }) : /* @__PURE__ */ e.jsx(O, { color: "default", children: d("role.global", { defaultValue: "Global" }) }) }),
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.createdAt", { defaultValue: "Created At" }), children: new Date(i.created_at).toLocaleString() }),
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.updatedAt", { defaultValue: "Updated At" }), children: new Date(i.updated_at).toLocaleString() })
      ] }) : null,
      /* @__PURE__ */ e.jsx(K, { title: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(pe, { style: { marginRight: 4 } }),
        d("role.permissions", { defaultValue: "Permissions" }),
        (R = i == null ? void 0 : i.permissions) != null && R.length ? ` (${i.permissions.length})` : ""
      ] }), children: _ })
    ];
    if (N && p.push(
      /* @__PURE__ */ e.jsx(
        K,
        {
          title: d("role.policyDocument", { defaultValue: "Policy Document" }),
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
    ), k) {
      const f = {};
      for (const r of i.ai_tool_permissions) {
        const u = r.toolset_id;
        f[u] || (f[u] = { toolset: r.toolset, tools: [] }), f[u].tools.push(r.tool_name);
      }
      p.push(/* @__PURE__ */ e.jsx(K, { title: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(Xe, { style: { marginRight: 4 } }),
        d("role.aiPermissions", { defaultValue: "AI Tool Permissions" })
      ] }), children: Object.entries(f).map(([r, { toolset: u, tools: m }]) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 12 }, children: [
        /* @__PURE__ */ e.jsx(je.Text, { strong: !0, style: { display: "block", marginBottom: 4 }, children: (u == null ? void 0 : u.name) || r }),
        /* @__PURE__ */ e.jsx("div", { children: m.map((w) => /* @__PURE__ */ e.jsx(O, { color: "blue", style: { marginBottom: 4 }, children: w }, w)) })
      ] }, r)) }));
    }
    return p;
  }, [i, _, N, k, S, d]);
  return /* @__PURE__ */ e.jsx(
    Be,
    {
      title: d("role.viewTitle", { defaultValue: "View Role" }),
      open: s,
      onClose: D,
      width: 800,
      destroyOnHidden: !0,
      children: /* @__PURE__ */ e.jsx(me, { spinning: U, children: /* @__PURE__ */ e.jsx(q, { direction: "vertical", children: i ? F : !U && /* @__PURE__ */ e.jsx(M, {}) }) })
    }
  );
}, mt = () => {
  const { message: x } = he.useApp(), { t: s } = ee("authorization"), { t: D } = ee("common"), { siteConfig: o } = ge(), d = (o == null ? void 0 : o.enable_multi_org) ?? !1, P = ve(), { user: S } = Re(), { hasGlobalPermission: i } = Te(), U = (S == null ? void 0 : S.organizations) || [], [j] = v.useForm(), [g, $] = I({
    current: ue.DEFAULT_CURRENT,
    page_size: ue.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), [A, z] = I(!1), [_, N] = I(null), { run: k, data: F, loading: p } = B(async () => G.authorization.listRoles(g), {
    debounceWait: 300,
    refreshDeps: [g],
    onError: () => {
      x.error(s("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }), b = (n) => {
    $({
      ...g,
      current: ue.DEFAULT_CURRENT,
      search: n.search,
      organization_id: n.organization_id || void 0
    });
  }, R = (n, h) => {
    $((E) => ({
      ...E,
      current: n,
      page_size: h
    }));
  }, f = (n) => {
    P(`/authorization/roles/${n}/edit`);
  }, r = (n) => {
    P(`/authorization/roles/create?cloneFrom=${encodeURIComponent(n)}`);
  }, { run: u } = B(
    async ({ id: n }) => G.authorization.deleteRole({ id: n }),
    {
      manual: !0,
      onSuccess: () => {
        x.success(s("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), k();
      },
      onError: (n) => {
        x.error(
          s("role.deleteError", {
            defaultValue: "Failed to delete role: {{error}}",
            error: n instanceof Error ? n.message : String(n)
          })
        );
      }
    }
  ), m = (n) => {
    N(n), z(!0);
  }, w = d && i("authorization:role:view"), T = [
    {
      title: s("role.name", { defaultValue: "Role Name" }),
      dataIndex: "name",
      key: "name",
      render: (n, h) => /* @__PURE__ */ e.jsxs(q, { children: [
        /* @__PURE__ */ e.jsx(Ze, {}),
        /* @__PURE__ */ e.jsx("a", { onClick: () => m(h.id), children: n })
      ] })
    },
    {
      title: s("role.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: s("role.roleType", { defaultValue: "Role Type" }),
      key: "role_type",
      render: (n, h) => h.role_type === "system" ? /* @__PURE__ */ e.jsx(O, { color: "orange", children: s("role.typeSystem", { defaultValue: "System" }) }) : /* @__PURE__ */ e.jsx(O, { color: "default", children: s("role.typeUser", { defaultValue: "User" }) })
    },
    {
      title: s("role.organization", { defaultValue: "Organization" }),
      key: "organization",
      hidden: !d,
      render: (n, h) => {
        var E;
        return h.organization_id ? /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(Se, {}), color: "blue", children: ((E = h.organization) == null ? void 0 : E.name) || h.organization_id }) : /* @__PURE__ */ e.jsx(O, { color: "default", children: s("role.global", { defaultValue: "Global" }) });
      }
    },
    {
      title: s("role.permissionCount", { defaultValue: "Permissions" }),
      key: "permission_count",
      render: (n, h) => {
        var E;
        return /* @__PURE__ */ e.jsxs(O, { color: "blue", children: [
          /* @__PURE__ */ e.jsx(pe, {}),
          " ",
          ((E = h.permissions) == null ? void 0 : E.length) || 0
        ] });
      }
    },
    {
      title: s("role.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (n) => new Date(n).toLocaleString()
    },
    {
      title: D("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (n, h) => {
        const E = h.role_type === "system";
        return /* @__PURE__ */ e.jsxs(q, { size: "small", children: [
          !E && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:update", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.edit", { defaultValue: "Edit Role" }), children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(et, {}),
                onClick: () => f(h.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(be, {}),
                onClick: () => r(h.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
              Je,
              {
                title: s("role.deleteConfirm", { defaultValue: "Are you sure you want to delete this role?" }),
                onConfirm: () => u({ id: h.id }),
                okText: D("confirm", { defaultValue: "Confirm" }),
                cancelText: D("cancel", { defaultValue: "Cancel" }),
                children: /* @__PURE__ */ e.jsx(
                  C,
                  {
                    type: "text",
                    size: "small",
                    danger: !0,
                    icon: /* @__PURE__ */ e.jsx(tt, {})
                  }
                )
              }
            ) }) })
          ] }),
          E && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(Y, { title: s("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }), children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(C, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(pe, {}), disabled: !0 }) }) }),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(be, {}),
                onClick: () => r(h.id)
              }
            ) }) })
          ] })
        ] });
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(K, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      v,
      {
        form: j,
        layout: "vertical",
        onFinish: b,
        name: "roleSearchForm",
        initialValues: {
          search: g.search,
          organization_id: g.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(We, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(q, { children: [
            /* @__PURE__ */ e.jsx(v.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              fe.Search,
              {
                placeholder: s("role.searchPlaceholder", { defaultValue: "Role name/description" }),
                allowClear: !0,
                onSearch: () => {
                  b(j.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            w && /* @__PURE__ */ e.jsx(v.Item, { name: "organization_id", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              Z,
              {
                placeholder: s("role.allOrganizations", { defaultValue: "All Organizations" }),
                allowClear: !0,
                onChange: () => {
                  b(j.getFieldsValue());
                },
                style: { minWidth: 180 },
                options: [
                  { value: "", label: s("role.global", { defaultValue: "Global" }) },
                  ...U.map((n) => ({ value: n.id, label: n.name }))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(q, { children: [
            /* @__PURE__ */ e.jsx(
              C,
              {
                onClick: () => {
                  b(j.getFieldsValue());
                },
                icon: /* @__PURE__ */ e.jsx(lt, {}),
                children: D("refresh", { defaultValue: "Refresh" })
              }
            ),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(ot, {}),
                onClick: () => P("/authorization/roles/create"),
                children: s("role.create", { defaultValue: "Create Role" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(K, { children: /* @__PURE__ */ e.jsx(
      He,
      {
        rowKey: "id",
        loading: p,
        dataSource: (F == null ? void 0 : F.data) ?? [],
        columns: T,
        pagination: {
          current: g.current,
          pageSize: g.page_size,
          total: (F == null ? void 0 : F.total) ?? 0,
          onChange: R,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (n) => D("totalItems", { defaultValue: `Total ${n} items`, total: n })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ut,
      {
        roleId: _,
        open: A,
        onClose: () => z(!1)
      }
    )
  ] });
}, Et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mt
}, Symbol.toStringTag, { value: "Module" })), { TextArea: Ve } = fe, pt = ct(({ css: x }) => ({
  rolePermissionExtra: x`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
  rolePolicyExtra: x`
      position: absolute;
      right: 5px;
      top: 5px;
    `
})), ht = {
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
}, ze = JSON.stringify({ Statement: [] }, null, 2), ft = () => {
  const { message: x } = he.useApp(), { styles: s } = pt(), { hasGlobalPermission: D } = Te(), { t: o } = ee("authorization"), { t: d } = ee("common"), P = ve(), { id: S } = nt(), [i] = rt(), U = i.get("cloneFrom") || void 0, j = !!S, { enableMultiOrg: g, currentOrgId: $ } = ge(), { user: A } = Re(), z = (A == null ? void 0 : A.organizations) || [], [_] = v.useForm(), [N, k] = I([]), [F, p] = I([]), [b, R] = I(!0), [f, r] = I([]), [u, m] = I({}), w = qe({}), [T, n] = I("global"), [h, E] = I(void 0), [we, Ee] = I(!1), ne = !g || T === "organization";
  se(() => {
    w.current = u;
  }, [u]), se(() => {
    E($ || void 0);
  }, []);
  const { data: te = [] } = B(async () => G.authorization.listPermissions().then((l) => l.map((t, a) => {
    const y = (t.permissions || []).map((c) => ({
      key: c.id,
      code: c.code.replace(/:/g, "."),
      title: c.name,
      orgPermission: c.org_permission || !1
    }));
    return {
      key: `[group]-${a}`,
      title: t.name,
      code: t.name.replace(/ /g, "_"),
      children: y
    };
  })), {
    onError: () => {
      x.error(o("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }), Pe = (l) => l ? l.reduce((t, a) => (!a.toolset_id || !a.tool_name || (t[a.toolset_id] || (t[a.toolset_id] = []), t[a.toolset_id].includes(a.tool_name) || t[a.toolset_id].push(a.tool_name)), t), {}) : {}, { run: Q, loading: Ae } = B(
    async (l) => {
      const { organizationId: t, initialSelection: a } = l;
      if (!t) {
        r([]), m(a || {});
        return;
      }
      const c = ((await G.system.listToolSets(
        { page_size: 1e3, include_tools: !0 },
        { headers: { "X-Scope-OrgID": t } }
      )).data || []).filter((L) => L.status === "enabled");
      r(c);
      const V = a || w.current || {}, J = {};
      c.forEach((L) => {
        const oe = V[L.id] || [];
        J[L.id] = oe.filter(
          (ie) => (L.tools || []).some((ae) => ae.name === ie)
        );
      }), m(J);
    },
    {
      manual: !0,
      onError: (l, t) => {
        x.error(o("role.loadAiToolsetsError", { defaultValue: "Failed to load AI toolsets." })), r([]);
        const a = t == null ? void 0 : t[0];
        m((a == null ? void 0 : a.initialSelection) || {});
      }
    }
  ), { run: re, loading: Ie } = B(
    async (l) => {
      var ae, ye;
      const { roleId: t, clone: a } = l, y = a === !0, c = await G.authorization.getRole({ id: t });
      Ee(!y && c.role_type === "system");
      const V = ((ae = c.permissions) == null ? void 0 : ae.map((Me) => Me.id)) || [];
      k(V), _.setFieldsValue({ permissions: V });
      const J = c.organization_id || "", L = J ? "organization" : "global";
      n(L);
      const oe = Pe(c.ai_tool_permissions || []), ie = L === "organization" && J ? J : g ? "" : $ || ((ye = z[0]) == null ? void 0 : ye.id) || "";
      ie ? await Q({ organizationId: ie, initialSelection: oe }) : (r([]), m(y ? oe : {})), _.setFieldsValue({
        name: y ? `${c.name} (copy)` : c.name,
        description: c.description,
        role_type: L,
        organization_id: J || void 0,
        policy_document: JSON.stringify(c.policy_document || { Statement: [] }, null, 2)
      });
    },
    {
      manual: !0,
      onError: () => {
        x.error(o("role.detailLoadError", { defaultValue: "Failed to load role details" })), P("/authorization/roles");
      }
    }
  );
  se(() => {
    if (j && S) {
      re({ roleId: S });
      return;
    }
    if (U) {
      re({ roleId: U, clone: !0 });
      return;
    }
    const l = h || (z.length > 0 ? z[0].id : ""), t = g && l ? "organization" : "global";
    n(t), _.setFieldsValue({
      role_type: t,
      organization_id: t === "organization" ? l : void 0,
      policy_document: ze,
      permissions: []
    }), k([]), m({});
    const a = t === "organization" && l ? l : g ? "" : l;
    a ? Q({ organizationId: a, initialSelection: {} }) : r([]);
  }, [
    U,
    Q,
    _,
    S,
    j,
    z,
    h,
    g,
    re
  ]);
  const Ce = H(() => T === "global" ? te : te.map((t) => {
    const a = (t.children || []).filter(
      (y) => y.orgPermission === !0
    );
    return {
      ...t,
      children: a
    };
  }).filter((t) => t.children && t.children.length > 0), [te, T]), Oe = (l) => {
    p(l), R(!1);
  }, ke = () => {
    const l = te.map((t) => t.key);
    p(l), R(!0);
  }, Fe = () => {
    p([]), R(!1);
  }, De = xe((l, t) => {
    m((a) => ({
      ...a,
      [l]: t
    }));
  }, []), Ne = xe((l, t) => {
    const a = f.find((c) => c.id === l);
    if (!a)
      return;
    const y = (a.tools || []).map((c) => c.name);
    m((c) => ({
      ...c,
      [l]: t ? y : []
    }));
  }, [f]), Le = (l, t) => {
    if (T === "organization")
      return Promise.resolve();
    if (!t || t.trim() === "" || t === "{}" || t === '{"Statement":[]}')
      return N.length === 0 ? Promise.reject(
        new Error(
          o("role.permissionOrPolicyRequired", {
            defaultValue: "Please select at least one permission or provide a policy document."
          })
        )
      ) : Promise.resolve();
    try {
      return JSON.parse(t), Promise.resolve();
    } catch {
      return Promise.reject(
        new Error(o("role.invalidJsonFormat", { defaultValue: "Invalid JSON format." }))
      );
    }
  }, Ge = H(() => ({
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
  }), [o]), { run: Ue, loading: $e } = B(
    async (l) => {
      const t = { ...l };
      T === "global" ? t.policy_document = JSON.parse(l.policy_document ?? "{}") : t.policy_document = { Statement: [] }, t.role_type === "organization" ? t.organization_id = t.organization_id || void 0 : t.organization_id = void 0, delete t.role_type;
      const a = ne ? Object.entries(u).map(([y, c]) => ({
        toolset_id: y,
        tools: Array.from(new Set(c))
      })).filter((y) => y.tools.length > 0) : [];
      t.ai_tool_permissions = a, t.permissions = N.filter((y) => !y.startsWith("[group]-")), j && S ? await G.authorization.updateRole({ id: S }, t) : await G.authorization.createRole(t);
    },
    {
      manual: !0,
      onSuccess: () => {
        x.success(
          j ? o("role.updateSuccess", { defaultValue: "Role updated successfully." }) : o("role.createSuccess", { defaultValue: "Role created successfully." })
        ), P("/authorization/roles");
      },
      onError: (l) => {
        x.error(
          o("role.saveError", {
            error: l instanceof Error ? l.message : `${l}`,
            defaultValue: "Failed to save role.",
            action: j ? d("update", { defaultValue: "Update" }) : d("create", { defaultValue: "Create" })
          })
        );
      }
    }
  ), le = j && we;
  return /* @__PURE__ */ e.jsxs(
    K,
    {
      title: le ? o("role.viewTitle", { defaultValue: "View Role" }) : j ? o("role.editTitle", { defaultValue: "Edit Role" }) : o("role.createTitle", { defaultValue: "Create Role" }),
      loading: Ie,
      children: [
        le && /* @__PURE__ */ e.jsx(
          Ke,
          {
            type: "info",
            message: o("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }),
            style: { marginBottom: 16 },
            showIcon: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          v,
          {
            form: _,
            layout: "vertical",
            disabled: le,
            initialValues: {
              policy_document: ze,
              permissions: []
            },
            onFinish: Ue,
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
                          v.Item,
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
                          v.Item,
                          {
                            label: o("role.description", { defaultValue: "Description" }),
                            name: "description",
                            children: /* @__PURE__ */ e.jsx(
                              Ve,
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
                          v.Item,
                          {
                            label: o("role.roleType", { defaultValue: "Role Type" }),
                            name: "role_type",
                            hidden: !g,
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
                                disabled: j || !D("authorization:role:create"),
                                onChange: (l) => {
                                  const t = l.target.value;
                                  if (n(t), t === "global")
                                    _.setFieldsValue({ organization_id: void 0 }), r([]), m({});
                                  else {
                                    const a = h || (z.length > 0 ? z[0].id : "");
                                    _.setFieldsValue({ organization_id: a }), a ? Q({
                                      organizationId: a,
                                      initialSelection: w.current
                                    }) : (r([]), m({}));
                                  }
                                  k([]), _.setFieldsValue({ permissions: [] });
                                },
                                children: [
                                  /* @__PURE__ */ e.jsx(de, { value: "global", children: o("role.globalRole", { defaultValue: "Global Role" }) }),
                                  /* @__PURE__ */ e.jsx(de, { value: "organization", children: o("role.organizationRole", { defaultValue: "Organization Role" }) })
                                ]
                              }
                            )
                          }
                        ),
                        T === "organization" && /* @__PURE__ */ e.jsx(
                          v.Item,
                          {
                            hidden: !g,
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
                            extra: z.length > 0 ? o("role.organizationHelp", {
                              defaultValue: "Select the organization this role belongs to"
                            }) : o("role.noOrganizationsAvailable", {
                              defaultValue: "No organizations available. Please contact your administrator."
                            }),
                            children: z.length > 0 ? /* @__PURE__ */ e.jsx(
                              Z,
                              {
                                placeholder: o("role.selectOrganization", {
                                  defaultValue: "Select Organization"
                                }),
                                onChange: (l) => {
                                  k([]), _.setFieldsValue({ permissions: [] });
                                  const t = l || "";
                                  t ? Q({ organizationId: t, initialSelection: {} }) : (r([]), m({}));
                                },
                                children: z.map((l) => /* @__PURE__ */ e.jsx(Z.Option, { value: l.id, children: l.name }, l.id))
                              }
                            ) : /* @__PURE__ */ e.jsx(
                              Z,
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
                        v.Item,
                        {
                          name: "permissions",
                          rules: [
                            {
                              validator() {
                                if (N.length === 0)
                                  if (T === "global") {
                                    const l = _.getFieldValue("policy_document");
                                    if (!l || l.trim() === "" || l === "{}" || l === '{"Statement":[]}')
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
                                /* @__PURE__ */ e.jsxs("span", { className: s.rolePermissionExtra, children: [
                                  /* @__PURE__ */ e.jsx(C, { type: "link", onClick: ke, icon: /* @__PURE__ */ e.jsx(it, {}), children: d("expandAll", { defaultValue: "Expand All" }) }),
                                  /* @__PURE__ */ e.jsx(C, { type: "link", onClick: Fe, icon: /* @__PURE__ */ e.jsx(at, {}), children: d("collapseAll", { defaultValue: "Collapse All" }) })
                                ] }),
                                /* @__PURE__ */ e.jsx(
                                  Ye,
                                  {
                                    treeData: Ce,
                                    titleRender: (l) => {
                                      const t = l, a = typeof t.title == "string" ? t.title : String(t.title ?? "");
                                      return /* @__PURE__ */ e.jsx("span", { children: o(`permission.title.${t.code}`, { defaultValue: a }) });
                                    },
                                    checkable: !0,
                                    disabled: le,
                                    expandedKeys: F,
                                    autoExpandParent: b,
                                    onExpand: Oe,
                                    checkedKeys: N,
                                    onCheck: (l) => {
                                      let t = [];
                                      st(l) ? t = l : dt(l, "checked") && (t = l.checked), k(t), _.setFieldsValue({ permissions: t });
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
                      disabled: !ne,
                      children: /* @__PURE__ */ e.jsx("div", { style: { marginBottom: "24px" }, children: /* @__PURE__ */ e.jsx(me, { spinning: Ae, children: ne ? f.length > 0 ? /* @__PURE__ */ e.jsx(q, { direction: "vertical", size: "middle", style: { width: "100%" }, children: f.map((l) => {
                        const t = (l.tools || []).map((V) => V.name), a = u[l.id] || [], y = t.length > 0 && a.length === t.length, c = a.length > 0 && a.length < t.length;
                        return /* @__PURE__ */ e.jsx(
                          K,
                          {
                            size: "small",
                            title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                              /* @__PURE__ */ e.jsx(
                                ce,
                                {
                                  checked: y,
                                  indeterminate: c,
                                  onChange: (V) => Ne(l.id, V.target.checked)
                                }
                              ),
                              /* @__PURE__ */ e.jsx("span", { children: l.name })
                            ] }),
                            extra: l.description ? /* @__PURE__ */ e.jsx("span", { children: l.description }) : void 0,
                            children: (l.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(
                              ce.Group,
                              {
                                style: { width: "100%" },
                                value: u[l.id] || [],
                                onChange: (V) => De(l.id, V),
                                children: /* @__PURE__ */ e.jsx(q, { direction: "vertical", style: { width: "100%" }, children: (l.tools || []).map((V) => /* @__PURE__ */ e.jsx(ce, { value: V.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                                  /* @__PURE__ */ e.jsx("div", { children: V.name }),
                                  V.description && /* @__PURE__ */ e.jsx(
                                    "div",
                                    {
                                      style: {
                                        color: "rgba(0,0,0,0.45)",
                                        fontSize: 12
                                      },
                                      children: V.description
                                    }
                                  )
                                ] }) }, V.name)) })
                              }
                            ) : /* @__PURE__ */ e.jsx(
                              M,
                              {
                                image: M.PRESENTED_IMAGE_SIMPLE,
                                description: o("role.aiToolsetNoTools", {
                                  defaultValue: "No tools available in this toolset."
                                })
                              }
                            )
                          },
                          l.id
                        );
                      }) }) : /* @__PURE__ */ e.jsx(
                        M,
                        {
                          image: M.PRESENTED_IMAGE_SIMPLE,
                          description: o("role.aiToolsetsEmpty", {
                            defaultValue: "No AI toolsets available for this organization."
                          })
                        }
                      ) : /* @__PURE__ */ e.jsx(
                        M,
                        {
                          image: M.PRESENTED_IMAGE_SIMPLE,
                          description: o("role.aiPermissionsGlobalInfo", {
                            defaultValue: "AI tool permissions are only available for organization roles when multi-organization is enabled."
                          })
                        }
                      ) }) })
                    },
                    {
                      key: "policy",
                      label: o("role.policyDocument", { defaultValue: "Policy Document" }),
                      disabled: T === "organization",
                      forceRender: !0,
                      children: /* @__PURE__ */ e.jsx(
                        v.Item,
                        {
                          name: "policy_document",
                          rules: [
                            {
                              validator: Le
                            }
                          ],
                          extra: /* @__PURE__ */ e.jsx("span", { className: s.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                            Z,
                            {
                              style: { width: 160 },
                              ...Ge,
                              onChange: (l) => {
                                if (typeof l == "string") {
                                  const t = ht[l];
                                  t && _.setFieldValue("policy_document", JSON.stringify(t, null, 2));
                                }
                              }
                            }
                          ) }),
                          children: /* @__PURE__ */ e.jsx(
                            Ve,
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
              /* @__PURE__ */ e.jsx(v.Item, { children: /* @__PURE__ */ e.jsxs(q, { children: [
                /* @__PURE__ */ e.jsx(
                  C,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: $e,
                    children: j ? d("update", { defaultValue: "Update" }) : d("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  C,
                  {
                    onClick: () => P("/authorization/roles"),
                    children: d("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      ]
    }
  );
}, Pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ft
}, Symbol.toStringTag, { value: "Module" }));
export {
  Et as R,
  Pt as a
};
