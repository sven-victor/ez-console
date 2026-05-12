import { j as e } from "./vendor.js";
import { useMemo as H, useState as I, useRef as Ge, useEffect as re, useCallback as fe } from "react";
import { message as L, Empty as $, Spin as ue, Typography as ge, Tag as O, Descriptions as W, Card as K, Drawer as Ue, Space as M, Form as T, Tooltip as Y, Button as C, Popconfirm as $e, Row as Me, Col as ye, Input as pe, Select as Z, Table as qe, Alert as Be, Tabs as Je, Radio as se, Tree as We, Checkbox as de } from "antd";
import { TeamOutlined as be, LockOutlined as me, ToolOutlined as He, UserOutlined as Ke, EditOutlined as Qe, CopyOutlined as xe, DeleteOutlined as Ye, ReloadOutlined as Xe, PlusOutlined as Ze, DownOutlined as et, UpOutlined as tt } from "@ant-design/icons";
import { f as X } from "./components.js";
import { a as G } from "./index.js";
import { useTranslation as ee } from "react-i18next";
import { u as he, b as Ve, c as ze } from "./contexts.js";
import { useNavigate as Se, useParams as lt, useSearchParams as ot } from "react-router-dom";
import { P as ce } from "./base.js";
import { useRequest as q } from "ahooks";
import { isArray as it, has as at } from "lodash-es";
import { createStyles as nt } from "antd-style";
const rt = ({ roleId: s, open: S, onClose: o }) => {
  const { t: d } = ee("authorization"), { siteConfig: P } = he(), R = (P == null ? void 0 : P.enable_multi_org) ?? !1, { data: i, loading: U } = q(async () => s ? G.authorization.getRole({ id: s }) : null, {
    refreshDeps: [s, S],
    ready: !!s && S,
    onError: () => {
      L.error(d("role.loadDetailError", { defaultValue: "Failed to load role details" }));
    }
  }), {
    data: y,
    loading: b,
    error: B
  } = q(async () => G.authorization.listPermissions(), {
    refreshDeps: [S],
    ready: S
  }), A = y ?? [], z = H(() => {
    var j;
    if (!((j = i == null ? void 0 : i.permissions) != null && j.length)) return {};
    const p = {};
    for (const v of i.permissions) {
      const f = v.code.split(":"), r = f.length >= 2 ? `${f[0]}:${f[1]}` : f[0];
      p[r] || (p[r] = []), p[r].push(v);
    }
    return p;
  }, [i == null ? void 0 : i.permissions]), x = H(() => {
    var f;
    if (!((f = i == null ? void 0 : i.permissions) != null && f.length))
      return /* @__PURE__ */ e.jsx($, { description: d("role.noPermissions", { defaultValue: "No permissions assigned" }) });
    const p = {
      maxHeight: 420,
      overflowY: "auto",
      border: "1px solid var(--ant-color-border)",
      borderRadius: 6,
      padding: "12px 12px 4px"
    };
    if (b && A.length === 0 && !B)
      return /* @__PURE__ */ e.jsx("div", { style: { ...p, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }, children: /* @__PURE__ */ e.jsx(ue, {}) });
    const j = [], v = new Set(i.permissions.map((r) => r.id));
    if (A.length > 0) {
      const r = /* @__PURE__ */ new Set();
      for (const m of A)
        for (const w of m.permissions || [])
          r.add(w.id);
      A.forEach((m, w) => {
        const V = (m.permissions || []).filter((n) => v.has(n.id));
        V.length && j.push({
          key: `catalog-${w}`,
          groupTitleKey: `permission.title.${m.name.replace(/ /g, "_")}`,
          groupTitleDefault: m.name,
          permissions: V
        });
      });
      const u = i.permissions.filter((m) => !r.has(m.id));
      u.length && j.push({
        key: "orphans",
        groupTitleKey: "role.otherPermissions",
        groupTitleDefault: "Other permissions",
        permissions: u
      });
    } else
      Object.entries(z).forEach(([r, u], m) => {
        j.push({
          key: `fallback-${m}`,
          groupTitleKey: `permission.title.${r.replace(/:/g, ".")}`,
          groupTitleDefault: r,
          permissions: u
        });
      });
    return /* @__PURE__ */ e.jsx("div", { style: p, children: j.map((r) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 12 }, children: [
      /* @__PURE__ */ e.jsx(ge.Text, { strong: !0, style: { display: "block", marginBottom: 8 }, children: d(r.groupTitleKey, { defaultValue: r.groupTitleDefault }) }),
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
  }, [i, A, b, B, z, d]), D = H(() => {
    var p;
    return i != null && i.policy_document ? ((p = i.policy_document.Statement) == null ? void 0 : p.length) > 0 : !1;
  }, [i == null ? void 0 : i.policy_document]), k = H(() => {
    var p;
    return (((p = i == null ? void 0 : i.ai_tool_permissions) == null ? void 0 : p.length) || 0) > 0;
  }, [i == null ? void 0 : i.ai_tool_permissions]), F = H(() => {
    var j, v;
    const p = [
      i ? /* @__PURE__ */ e.jsxs(W, { column: 1, bordered: !0, size: "small", children: [
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.name", { defaultValue: "Role Name" }), children: i.name }),
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.description", { defaultValue: "Description" }), children: i.description || "-" }),
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.roleType", { defaultValue: "Role Type" }), children: i.role_type === "system" ? /* @__PURE__ */ e.jsx(O, { color: "orange", children: d("role.typeSystem", { defaultValue: "System" }) }) : /* @__PURE__ */ e.jsx(O, { color: "default", children: d("role.typeUser", { defaultValue: "User" }) }) }),
        R && /* @__PURE__ */ e.jsx(W.Item, { label: d("role.organization", { defaultValue: "Organization" }), children: i.organization_id ? /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(be, {}), color: "blue", children: ((j = i.organization) == null ? void 0 : j.name) || i.organization_id }) : /* @__PURE__ */ e.jsx(O, { color: "default", children: d("role.global", { defaultValue: "Global" }) }) }),
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.createdAt", { defaultValue: "Created At" }), children: new Date(i.created_at).toLocaleString() }),
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.updatedAt", { defaultValue: "Updated At" }), children: new Date(i.updated_at).toLocaleString() })
      ] }) : null,
      ,
      /* @__PURE__ */ e.jsx(K, { title: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(me, { style: { marginRight: 4 } }),
        d("role.permissions", { defaultValue: "Permissions" }),
        (v = i == null ? void 0 : i.permissions) != null && v.length ? ` (${i.permissions.length})` : ""
      ] }), children: x })
    ];
    if (D && p.push(
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
        /* @__PURE__ */ e.jsx(He, { style: { marginRight: 4 } }),
        d("role.aiPermissions", { defaultValue: "AI Tool Permissions" })
      ] }), children: Object.entries(f).map(([r, { toolset: u, tools: m }]) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 12 }, children: [
        /* @__PURE__ */ e.jsx(ge.Text, { strong: !0, style: { display: "block", marginBottom: 4 }, children: (u == null ? void 0 : u.name) || r }),
        /* @__PURE__ */ e.jsx("div", { children: m.map((w) => /* @__PURE__ */ e.jsx(O, { color: "blue", style: { marginBottom: 4 }, children: w }, w)) })
      ] }, r)) }));
    }
    return p;
  }, [i, x, D, k, R, d]);
  return /* @__PURE__ */ e.jsx(
    Ue,
    {
      title: d("role.viewTitle", { defaultValue: "View Role" }),
      open: S,
      onClose: o,
      width: 800,
      destroyOnHidden: !0,
      children: /* @__PURE__ */ e.jsx(ue, { spinning: U, children: /* @__PURE__ */ e.jsx(M, { direction: "vertical", children: i ? F : !U && /* @__PURE__ */ e.jsx($, {}) }) })
    }
  );
}, st = () => {
  const { t: s } = ee("authorization"), { t: S } = ee("common"), { siteConfig: o } = he(), d = (o == null ? void 0 : o.enable_multi_org) ?? !1, P = Se(), { user: R } = Ve(), { hasGlobalPermission: i } = ze(), U = (R == null ? void 0 : R.organizations) || [], [y] = T.useForm(), [b, B] = I({
    current: ce.DEFAULT_CURRENT,
    page_size: ce.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), [A, z] = I(!1), [x, D] = I(null), { run: k, data: F, loading: p } = q(async () => G.authorization.listRoles(b), {
    debounceWait: 300,
    refreshDeps: [b],
    onError: () => {
      L.error(s("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }), j = (n) => {
    B({
      ...b,
      current: ce.DEFAULT_CURRENT,
      search: n.search,
      organization_id: n.organization_id || void 0
    });
  }, v = (n, h) => {
    B((E) => ({
      ...E,
      current: n,
      page_size: h
    }));
  }, f = (n) => {
    P(`/authorization/roles/${n}/edit`);
  }, r = (n) => {
    P(`/authorization/roles/create?cloneFrom=${encodeURIComponent(n)}`);
  }, { run: u } = q(
    async ({ id: n }) => G.authorization.deleteRole({ id: n }),
    {
      manual: !0,
      onSuccess: () => {
        L.success(s("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), k();
      },
      onError: (n) => {
        L.error(
          s("role.deleteError", {
            defaultValue: "Failed to delete role: {{error}}",
            error: n instanceof Error ? n.message : String(n)
          })
        );
      }
    }
  ), m = (n) => {
    D(n), z(!0);
  }, w = d && i("authorization:role:view"), V = [
    {
      title: s("role.name", { defaultValue: "Role Name" }),
      dataIndex: "name",
      key: "name",
      render: (n, h) => /* @__PURE__ */ e.jsxs(M, { children: [
        /* @__PURE__ */ e.jsx(Ke, {}),
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
        return h.organization_id ? /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(be, {}), color: "blue", children: ((E = h.organization) == null ? void 0 : E.name) || h.organization_id }) : /* @__PURE__ */ e.jsx(O, { color: "default", children: s("role.global", { defaultValue: "Global" }) });
      }
    },
    {
      title: s("role.permissionCount", { defaultValue: "Permissions" }),
      key: "permission_count",
      render: (n, h) => {
        var E;
        return /* @__PURE__ */ e.jsxs(O, { color: "blue", children: [
          /* @__PURE__ */ e.jsx(me, {}),
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
      title: S("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (n, h) => {
        const E = h.role_type === "system";
        return /* @__PURE__ */ e.jsxs(M, { size: "small", children: [
          !E && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:update", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.edit", { defaultValue: "Edit Role" }), children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(Qe, {}),
                onClick: () => f(h.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(xe, {}),
                onClick: () => r(h.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
              $e,
              {
                title: s("role.deleteConfirm", { defaultValue: "Are you sure you want to delete this role?" }),
                onConfirm: () => u({ id: h.id }),
                okText: S("confirm", { defaultValue: "Confirm" }),
                cancelText: S("cancel", { defaultValue: "Cancel" }),
                children: /* @__PURE__ */ e.jsx(
                  C,
                  {
                    type: "text",
                    size: "small",
                    danger: !0,
                    icon: /* @__PURE__ */ e.jsx(Ye, {})
                  }
                )
              }
            ) }) })
          ] }),
          E && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(Y, { title: s("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }), children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(C, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(me, {}), disabled: !0 }) }) }),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(xe, {}),
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
      T,
      {
        form: y,
        layout: "vertical",
        onFinish: j,
        name: "roleSearchForm",
        initialValues: {
          search: b.search,
          organization_id: b.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(Me, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(T.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              pe.Search,
              {
                placeholder: s("role.searchPlaceholder", { defaultValue: "Role name/description" }),
                allowClear: !0,
                onSearch: () => {
                  j(y.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            w && /* @__PURE__ */ e.jsx(T.Item, { name: "organization_id", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              Z,
              {
                placeholder: s("role.allOrganizations", { defaultValue: "All Organizations" }),
                allowClear: !0,
                onChange: () => {
                  j(y.getFieldsValue());
                },
                style: { minWidth: 180 },
                options: [
                  { value: "", label: s("role.global", { defaultValue: "Global" }) },
                  ...U.map((n) => ({ value: n.id, label: n.name }))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(
              C,
              {
                onClick: () => {
                  j(y.getFieldsValue());
                },
                icon: /* @__PURE__ */ e.jsx(Xe, {}),
                children: S("refresh", { defaultValue: "Refresh" })
              }
            ),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Ze, {}),
                onClick: () => P("/authorization/roles/create"),
                children: s("role.create", { defaultValue: "Create Role" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(K, { children: /* @__PURE__ */ e.jsx(
      qe,
      {
        rowKey: "id",
        loading: p,
        dataSource: (F == null ? void 0 : F.data) ?? [],
        columns: V,
        pagination: {
          current: b.current,
          pageSize: b.page_size,
          total: (F == null ? void 0 : F.total) ?? 0,
          onChange: v,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (n) => S("totalItems", { defaultValue: `Total ${n} items`, total: n })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      rt,
      {
        roleId: x,
        open: A,
        onClose: () => z(!1)
      }
    )
  ] });
}, Rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: st
}, Symbol.toStringTag, { value: "Module" })), { TextArea: je } = pe, dt = nt(({ css: s }) => ({
  rolePermissionExtra: s`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
  rolePolicyExtra: s`
      position: absolute;
      right: 5px;
      top: 5px;
    `
})), ct = {
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
}, _e = JSON.stringify({ Statement: [] }, null, 2), ut = () => {
  const { styles: s } = dt(), { hasGlobalPermission: S } = ze(), { t: o } = ee("authorization"), { t: d } = ee("common"), P = Se(), { id: R } = lt(), [i] = ot(), U = i.get("cloneFrom") || void 0, y = !!R, { enableMultiOrg: b, currentOrgId: B } = he(), { user: A } = Ve(), z = (A == null ? void 0 : A.organizations) || [], [x] = T.useForm(), [D, k] = I([]), [F, p] = I([]), [j, v] = I(!0), [f, r] = I([]), [u, m] = I({}), w = Ge({}), [V, n] = I("global"), [h, E] = I(void 0), [Re, ve] = I(!1);
  re(() => {
    w.current = u;
  }, [u]), re(() => {
    E(B || void 0);
  }, []);
  const { data: te = [] } = q(async () => G.authorization.listPermissions().then((l) => l.map((t, a) => {
    const g = (t.permissions || []).map((c) => ({
      key: c.id,
      code: c.code.replace(/:/g, "."),
      title: c.name,
      orgPermission: c.org_permission || !1
    }));
    return {
      key: `[group]-${a}`,
      title: t.name,
      code: t.name.replace(/ /g, "_"),
      children: g
    };
  })), {
    onError: () => {
      L.error(o("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }), Te = (l) => l ? l.reduce((t, a) => (!a.toolset_id || !a.tool_name || (t[a.toolset_id] || (t[a.toolset_id] = []), t[a.toolset_id].includes(a.tool_name) || t[a.toolset_id].push(a.tool_name)), t), {}) : {}, { run: Q, loading: we } = q(
    async (l) => {
      const { organizationId: t, initialSelection: a } = l;
      if (!t) {
        r([]), m(a || {});
        return;
      }
      const c = ((await G.system.listToolSets(
        { page_size: 1e3, include_tools: !0 },
        { headers: { "X-Scope-OrgID": t } }
      )).data || []).filter((N) => N.status === "enabled");
      r(c);
      const _ = a || w.current || {}, J = {};
      c.forEach((N) => {
        const oe = _[N.id] || [];
        J[N.id] = oe.filter(
          (ie) => (N.tools || []).some((ne) => ne.name === ie)
        );
      }), m(J);
    },
    {
      manual: !0,
      onError: (l, t) => {
        L.error(o("role.loadAiToolsetsError", { defaultValue: "Failed to load AI toolsets." })), r([]);
        const a = t == null ? void 0 : t[0];
        m((a == null ? void 0 : a.initialSelection) || {});
      }
    }
  ), { run: ae, loading: Ee } = q(
    async (l) => {
      var ie;
      const { roleId: t, clone: a } = l, g = a === !0, c = await G.authorization.getRole({ id: t });
      ve(!g && c.role_type === "system");
      const _ = ((ie = c.permissions) == null ? void 0 : ie.map((ne) => ne.id)) || [];
      k(_), x.setFieldsValue({ permissions: _ });
      const J = c.organization_id || "", N = J ? "organization" : "global";
      n(N);
      const oe = Te(c.ai_tool_permissions || []);
      N === "organization" && J ? await Q({ organizationId: J, initialSelection: oe }) : (r([]), m(g ? oe : {})), x.setFieldsValue({
        name: g ? `${c.name} (copy)` : c.name,
        description: c.description,
        role_type: N,
        organization_id: J || void 0,
        policy_document: JSON.stringify(c.policy_document || { Statement: [] }, null, 2)
      });
    },
    {
      manual: !0,
      onError: () => {
        L.error(o("role.detailLoadError", { defaultValue: "Failed to load role details" })), P("/authorization/roles");
      }
    }
  );
  re(() => {
    if (y && R) {
      ae({ roleId: R });
      return;
    }
    if (U) {
      ae({ roleId: U, clone: !0 });
      return;
    }
    const l = h || (z.length > 0 ? z[0].id : ""), t = b && l ? "organization" : "global";
    n(t), x.setFieldsValue({
      role_type: t,
      organization_id: t === "organization" ? l : void 0,
      policy_document: _e,
      permissions: []
    }), k([]), m({}), t === "organization" && l ? Q({ organizationId: l, initialSelection: {} }) : r([]);
  }, [
    U,
    Q,
    x,
    R,
    y,
    z,
    h,
    b,
    ae
  ]);
  const Pe = H(() => V === "global" ? te : te.map((t) => {
    const a = (t.children || []).filter(
      (g) => g.orgPermission === !0
    );
    return {
      ...t,
      children: a
    };
  }).filter((t) => t.children && t.children.length > 0), [te, V]), Ae = (l) => {
    p(l), v(!1);
  }, Ie = () => {
    const l = te.map((t) => t.key);
    p(l), v(!0);
  }, Ce = () => {
    p([]), v(!1);
  }, Oe = fe((l, t) => {
    m((a) => ({
      ...a,
      [l]: t
    }));
  }, []), ke = fe((l, t) => {
    const a = f.find((c) => c.id === l);
    if (!a)
      return;
    const g = (a.tools || []).map((c) => c.name);
    m((c) => ({
      ...c,
      [l]: t ? g : []
    }));
  }, [f]), Fe = (l, t) => {
    if (V === "organization")
      return Promise.resolve();
    if (!t || t.trim() === "" || t === "{}" || t === '{"Statement":[]}')
      return D.length === 0 ? Promise.reject(
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
  }, De = H(() => ({
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
  }), [o]), { run: Ne, loading: Le } = q(
    async (l) => {
      const t = { ...l };
      V === "global" ? t.policy_document = JSON.parse(l.policy_document ?? "{}") : t.policy_document = { Statement: [] }, t.role_type === "organization" ? t.organization_id = t.organization_id || void 0 : t.organization_id = void 0, delete t.role_type;
      const a = V === "organization" ? Object.entries(u).map(([g, c]) => ({
        toolset_id: g,
        tools: Array.from(new Set(c))
      })).filter((g) => g.tools.length > 0) : [];
      t.ai_tool_permissions = a, t.permissions = D.filter((g) => !g.startsWith("[group]-")), y && R ? await G.authorization.updateRole({ id: R }, t) : await G.authorization.createRole(t);
    },
    {
      manual: !0,
      onSuccess: () => {
        L.success(
          y ? o("role.updateSuccess", { defaultValue: "Role updated successfully." }) : o("role.createSuccess", { defaultValue: "Role created successfully." })
        ), P("/authorization/roles");
      },
      onError: (l) => {
        L.error(
          o("role.saveError", {
            error: l instanceof Error ? l.message : `${l}`,
            defaultValue: "Failed to save role.",
            action: y ? d("update", { defaultValue: "Update" }) : d("create", { defaultValue: "Create" })
          })
        );
      }
    }
  ), le = y && Re;
  return /* @__PURE__ */ e.jsxs(
    K,
    {
      title: le ? o("role.viewTitle", { defaultValue: "View Role" }) : y ? o("role.editTitle", { defaultValue: "Edit Role" }) : o("role.createTitle", { defaultValue: "Create Role" }),
      loading: Ee,
      children: [
        le && /* @__PURE__ */ e.jsx(
          Be,
          {
            type: "info",
            message: o("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }),
            style: { marginBottom: 16 },
            showIcon: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          T,
          {
            form: x,
            layout: "vertical",
            disabled: le,
            initialValues: {
              policy_document: _e,
              permissions: []
            },
            onFinish: Ne,
            children: [
              /* @__PURE__ */ e.jsx(
                Je,
                {
                  items: [
                    {
                      key: "basic",
                      label: o("role.basicInfo", { defaultValue: "Basic Information" }),
                      children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                        /* @__PURE__ */ e.jsx(
                          T.Item,
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
                            children: /* @__PURE__ */ e.jsx(pe, { placeholder: o("role.namePlaceholder", { defaultValue: "Enter role name" }) })
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          T.Item,
                          {
                            label: o("role.description", { defaultValue: "Description" }),
                            name: "description",
                            children: /* @__PURE__ */ e.jsx(
                              je,
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
                          T.Item,
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
                            extra: y ? o("role.roleTypeCannotChange", {
                              defaultValue: "Role type cannot be changed after creation."
                            }) : "",
                            children: /* @__PURE__ */ e.jsxs(
                              se.Group,
                              {
                                disabled: y || !S("authorization:role:create"),
                                onChange: (l) => {
                                  const t = l.target.value;
                                  if (n(t), t === "global")
                                    x.setFieldsValue({ organization_id: void 0 }), r([]), m({});
                                  else {
                                    const a = h || (z.length > 0 ? z[0].id : "");
                                    x.setFieldsValue({ organization_id: a }), a ? Q({
                                      organizationId: a,
                                      initialSelection: w.current
                                    }) : (r([]), m({}));
                                  }
                                  k([]), x.setFieldsValue({ permissions: [] });
                                },
                                children: [
                                  /* @__PURE__ */ e.jsx(se, { value: "global", children: o("role.globalRole", { defaultValue: "Global Role" }) }),
                                  /* @__PURE__ */ e.jsx(se, { value: "organization", children: o("role.organizationRole", { defaultValue: "Organization Role" }) })
                                ]
                              }
                            )
                          }
                        ),
                        V === "organization" && /* @__PURE__ */ e.jsx(
                          T.Item,
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
                                  k([]), x.setFieldsValue({ permissions: [] });
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
                        T.Item,
                        {
                          name: "permissions",
                          rules: [
                            {
                              validator() {
                                if (D.length === 0)
                                  if (V === "global") {
                                    const l = x.getFieldValue("policy_document");
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
                                  /* @__PURE__ */ e.jsx(C, { type: "link", onClick: Ie, icon: /* @__PURE__ */ e.jsx(et, {}), children: d("expandAll", { defaultValue: "Expand All" }) }),
                                  /* @__PURE__ */ e.jsx(C, { type: "link", onClick: Ce, icon: /* @__PURE__ */ e.jsx(tt, {}), children: d("collapseAll", { defaultValue: "Collapse All" }) })
                                ] }),
                                /* @__PURE__ */ e.jsx(
                                  We,
                                  {
                                    treeData: Pe,
                                    titleRender: (l) => {
                                      const t = l, a = typeof t.title == "string" ? t.title : String(t.title ?? "");
                                      return /* @__PURE__ */ e.jsx("span", { children: o(`permission.title.${t.code}`, { defaultValue: a }) });
                                    },
                                    checkable: !0,
                                    disabled: le,
                                    expandedKeys: F,
                                    autoExpandParent: j,
                                    onExpand: Ae,
                                    checkedKeys: D,
                                    onCheck: (l) => {
                                      let t = [];
                                      it(l) ? t = l : at(l, "checked") && (t = l.checked), k(t), x.setFieldsValue({ permissions: t });
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
                      disabled: V === "global",
                      children: /* @__PURE__ */ e.jsx("div", { style: { marginBottom: "24px" }, children: /* @__PURE__ */ e.jsx(ue, { spinning: we, children: V === "organization" ? f.length > 0 ? /* @__PURE__ */ e.jsx(M, { direction: "vertical", size: "middle", style: { width: "100%" }, children: f.map((l) => {
                        const t = (l.tools || []).map((_) => _.name), a = u[l.id] || [], g = t.length > 0 && a.length === t.length, c = a.length > 0 && a.length < t.length;
                        return /* @__PURE__ */ e.jsx(
                          K,
                          {
                            size: "small",
                            title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                              /* @__PURE__ */ e.jsx(
                                de,
                                {
                                  checked: g,
                                  indeterminate: c,
                                  onChange: (_) => ke(l.id, _.target.checked)
                                }
                              ),
                              /* @__PURE__ */ e.jsx("span", { children: l.name })
                            ] }),
                            extra: l.description ? /* @__PURE__ */ e.jsx("span", { children: l.description }) : void 0,
                            children: (l.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(
                              de.Group,
                              {
                                style: { width: "100%" },
                                value: u[l.id] || [],
                                onChange: (_) => Oe(l.id, _),
                                children: /* @__PURE__ */ e.jsx(M, { direction: "vertical", style: { width: "100%" }, children: (l.tools || []).map((_) => /* @__PURE__ */ e.jsx(de, { value: _.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                                  /* @__PURE__ */ e.jsx("div", { children: _.name }),
                                  _.description && /* @__PURE__ */ e.jsx(
                                    "div",
                                    {
                                      style: {
                                        color: "rgba(0,0,0,0.45)",
                                        fontSize: 12
                                      },
                                      children: _.description
                                    }
                                  )
                                ] }) }, _.name)) })
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
                          l.id
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
                      ) }) })
                    },
                    {
                      key: "policy",
                      label: o("role.policyDocument", { defaultValue: "Policy Document" }),
                      disabled: V === "organization",
                      forceRender: !0,
                      children: /* @__PURE__ */ e.jsx(
                        T.Item,
                        {
                          name: "policy_document",
                          rules: [
                            {
                              validator: Fe
                            }
                          ],
                          extra: /* @__PURE__ */ e.jsx("span", { className: s.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                            Z,
                            {
                              style: { width: 160 },
                              ...De,
                              onChange: (l) => {
                                if (typeof l == "string") {
                                  const t = ct[l];
                                  t && x.setFieldValue("policy_document", JSON.stringify(t, null, 2));
                                }
                              }
                            }
                          ) }),
                          children: /* @__PURE__ */ e.jsx(
                            je,
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
              /* @__PURE__ */ e.jsx(T.Item, { children: /* @__PURE__ */ e.jsxs(M, { children: [
                /* @__PURE__ */ e.jsx(
                  C,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: Le,
                    children: y ? d("update", { defaultValue: "Update" }) : d("create", { defaultValue: "Create" })
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
}, vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ut
}, Symbol.toStringTag, { value: "Module" }));
export {
  Rt as R,
  vt as a
};
