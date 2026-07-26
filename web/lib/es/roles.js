import { j as e } from "./vendor.js";
import { useMemo as H, useState as I, useRef as Ue, useEffect as re, useCallback as ge } from "react";
import { App as pe, Empty as $, Spin as ue, Typography as ye, Tag as O, Descriptions as W, Card as K, Drawer as $e, Space as M, Form as T, Tooltip as Y, Button as C, Popconfirm as Me, Row as qe, Col as xe, Input as he, Select as Z, Table as Be, Alert as Je, Tabs as We, Radio as se, Tree as He, Checkbox as de } from "antd";
import { TeamOutlined as Ve, LockOutlined as me, ToolOutlined as Ke, UserOutlined as Qe, EditOutlined as Ye, CopyOutlined as je, DeleteOutlined as Xe, ReloadOutlined as Ze, PlusOutlined as et, DownOutlined as tt, UpOutlined as lt } from "@ant-design/icons";
import { g as X } from "./components.js";
import { a as G } from "./index.js";
import { useTranslation as ee } from "react-i18next";
import { b as fe, u as ze, a as Se } from "./contexts.js";
import { useNavigate as Re, useParams as ot, useSearchParams as it } from "react-router-dom";
import { P as ce } from "./base.js";
import { useRequest as q } from "ahooks";
import { isArray as at, has as nt } from "lodash-es";
import { createStyles as rt } from "antd-style";
const st = ({ roleId: y, open: s, onClose: D }) => {
  const { message: o } = pe.useApp(), { t: d } = ee("authorization"), { siteConfig: P } = fe(), R = (P == null ? void 0 : P.enable_multi_org) ?? !1, { data: i, loading: U } = q(async () => y ? G.authorization.getRole({ id: y }) : null, {
    refreshDeps: [y, s],
    ready: !!y && s,
    onError: () => {
      o.error(d("role.loadDetailError", { defaultValue: "Failed to load role details" }));
    }
  }), {
    data: x,
    loading: V,
    error: B
  } = q(async () => G.authorization.listPermissions(), {
    refreshDeps: [s],
    ready: s
  }), A = x ?? [], S = H(() => {
    var _;
    if (!((_ = i == null ? void 0 : i.permissions) != null && _.length)) return {};
    const p = {};
    for (const v of i.permissions) {
      const f = v.code.split(":"), r = f.length >= 2 ? `${f[0]}:${f[1]}` : f[0];
      p[r] || (p[r] = []), p[r].push(v);
    }
    return p;
  }, [i == null ? void 0 : i.permissions]), j = H(() => {
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
    if (V && A.length === 0 && !B)
      return /* @__PURE__ */ e.jsx("div", { style: { ...p, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }, children: /* @__PURE__ */ e.jsx(ue, {}) });
    const _ = [], v = new Set(i.permissions.map((r) => r.id));
    if (A.length > 0) {
      const r = /* @__PURE__ */ new Set();
      for (const m of A)
        for (const w of m.permissions || [])
          r.add(w.id);
      A.forEach((m, w) => {
        const z = (m.permissions || []).filter((n) => v.has(n.id));
        z.length && _.push({
          key: `catalog-${w}`,
          groupTitleKey: `permission.title.${m.name.replace(/ /g, "_")}`,
          groupTitleDefault: m.name,
          permissions: z
        });
      });
      const u = i.permissions.filter((m) => !r.has(m.id));
      u.length && _.push({
        key: "orphans",
        groupTitleKey: "role.otherPermissions",
        groupTitleDefault: "Other permissions",
        permissions: u
      });
    } else
      Object.entries(S).forEach(([r, u], m) => {
        _.push({
          key: `fallback-${m}`,
          groupTitleKey: `permission.title.${r.replace(/:/g, ".")}`,
          groupTitleDefault: r,
          permissions: u
        });
      });
    return /* @__PURE__ */ e.jsx("div", { style: p, children: _.map((r) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 12 }, children: [
      /* @__PURE__ */ e.jsx(ye.Text, { strong: !0, style: { display: "block", marginBottom: 8 }, children: d(r.groupTitleKey, { defaultValue: r.groupTitleDefault }) }),
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
  }, [i, A, V, B, S, d]), N = H(() => {
    var p;
    return i != null && i.policy_document ? ((p = i.policy_document.Statement) == null ? void 0 : p.length) > 0 : !1;
  }, [i == null ? void 0 : i.policy_document]), k = H(() => {
    var p;
    return (((p = i == null ? void 0 : i.ai_tool_permissions) == null ? void 0 : p.length) || 0) > 0;
  }, [i == null ? void 0 : i.ai_tool_permissions]), F = H(() => {
    var _, v;
    const p = [
      i ? /* @__PURE__ */ e.jsxs(W, { column: 1, bordered: !0, size: "small", children: [
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.name", { defaultValue: "Role Name" }), children: i.name }),
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.description", { defaultValue: "Description" }), children: i.description || "-" }),
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.roleType", { defaultValue: "Role Type" }), children: i.role_type === "system" ? /* @__PURE__ */ e.jsx(O, { color: "orange", children: d("role.typeSystem", { defaultValue: "System" }) }) : /* @__PURE__ */ e.jsx(O, { color: "default", children: d("role.typeUser", { defaultValue: "User" }) }) }),
        R && /* @__PURE__ */ e.jsx(W.Item, { label: d("role.organization", { defaultValue: "Organization" }), children: i.organization_id ? /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(Ve, {}), color: "blue", children: ((_ = i.organization) == null ? void 0 : _.name) || i.organization_id }) : /* @__PURE__ */ e.jsx(O, { color: "default", children: d("role.global", { defaultValue: "Global" }) }) }),
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.createdAt", { defaultValue: "Created At" }), children: new Date(i.created_at).toLocaleString() }),
        /* @__PURE__ */ e.jsx(W.Item, { label: d("role.updatedAt", { defaultValue: "Updated At" }), children: new Date(i.updated_at).toLocaleString() })
      ] }) : null,
      /* @__PURE__ */ e.jsx(K, { title: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(me, { style: { marginRight: 4 } }),
        d("role.permissions", { defaultValue: "Permissions" }),
        (v = i == null ? void 0 : i.permissions) != null && v.length ? ` (${i.permissions.length})` : ""
      ] }), children: j })
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
        /* @__PURE__ */ e.jsx(Ke, { style: { marginRight: 4 } }),
        d("role.aiPermissions", { defaultValue: "AI Tool Permissions" })
      ] }), children: Object.entries(f).map(([r, { toolset: u, tools: m }]) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 12 }, children: [
        /* @__PURE__ */ e.jsx(ye.Text, { strong: !0, style: { display: "block", marginBottom: 4 }, children: (u == null ? void 0 : u.name) || r }),
        /* @__PURE__ */ e.jsx("div", { children: m.map((w) => /* @__PURE__ */ e.jsx(O, { color: "blue", style: { marginBottom: 4 }, children: w }, w)) })
      ] }, r)) }));
    }
    return p;
  }, [i, j, N, k, R, d]);
  return /* @__PURE__ */ e.jsx(
    $e,
    {
      title: d("role.viewTitle", { defaultValue: "View Role" }),
      open: s,
      onClose: D,
      width: 800,
      destroyOnHidden: !0,
      children: /* @__PURE__ */ e.jsx(ue, { spinning: U, children: /* @__PURE__ */ e.jsx(M, { direction: "vertical", children: i ? F : !U && /* @__PURE__ */ e.jsx($, {}) }) })
    }
  );
}, dt = () => {
  const { message: y } = pe.useApp(), { t: s } = ee("authorization"), { t: D } = ee("common"), { siteConfig: o } = fe(), d = (o == null ? void 0 : o.enable_multi_org) ?? !1, P = Re(), { user: R } = ze(), { hasGlobalPermission: i } = Se(), U = (R == null ? void 0 : R.organizations) || [], [x] = T.useForm(), [V, B] = I({
    current: ce.DEFAULT_CURRENT,
    page_size: ce.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), [A, S] = I(!1), [j, N] = I(null), { run: k, data: F, loading: p } = q(async () => G.authorization.listRoles(V), {
    debounceWait: 300,
    refreshDeps: [V],
    onError: () => {
      y.error(s("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }), _ = (n) => {
    B({
      ...V,
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
        y.success(s("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), k();
      },
      onError: (n) => {
        y.error(
          s("role.deleteError", {
            defaultValue: "Failed to delete role: {{error}}",
            error: n instanceof Error ? n.message : String(n)
          })
        );
      }
    }
  ), m = (n) => {
    N(n), S(!0);
  }, w = d && i("authorization:role:view"), z = [
    {
      title: s("role.name", { defaultValue: "Role Name" }),
      dataIndex: "name",
      key: "name",
      render: (n, h) => /* @__PURE__ */ e.jsxs(M, { children: [
        /* @__PURE__ */ e.jsx(Qe, {}),
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
        return h.organization_id ? /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(Ve, {}), color: "blue", children: ((E = h.organization) == null ? void 0 : E.name) || h.organization_id }) : /* @__PURE__ */ e.jsx(O, { color: "default", children: s("role.global", { defaultValue: "Global" }) });
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
      title: D("actions", { defaultValue: "Actions" }),
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
                icon: /* @__PURE__ */ e.jsx(Ye, {}),
                onClick: () => f(h.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(je, {}),
                onClick: () => r(h.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
              Me,
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
                    icon: /* @__PURE__ */ e.jsx(Xe, {})
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
                icon: /* @__PURE__ */ e.jsx(je, {}),
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
        form: x,
        layout: "vertical",
        onFinish: _,
        name: "roleSearchForm",
        initialValues: {
          search: V.search,
          organization_id: V.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(qe, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(xe, { children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(T.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              he.Search,
              {
                placeholder: s("role.searchPlaceholder", { defaultValue: "Role name/description" }),
                allowClear: !0,
                onSearch: () => {
                  _(x.getFieldsValue());
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
                  _(x.getFieldsValue());
                },
                style: { minWidth: 180 },
                options: [
                  { value: "", label: s("role.global", { defaultValue: "Global" }) },
                  ...U.map((n) => ({ value: n.id, label: n.name }))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(xe, { children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(
              C,
              {
                onClick: () => {
                  _(x.getFieldsValue());
                },
                icon: /* @__PURE__ */ e.jsx(Ze, {}),
                children: D("refresh", { defaultValue: "Refresh" })
              }
            ),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(et, {}),
                onClick: () => P("/authorization/roles/create"),
                children: s("role.create", { defaultValue: "Create Role" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(K, { children: /* @__PURE__ */ e.jsx(
      Be,
      {
        rowKey: "id",
        loading: p,
        dataSource: (F == null ? void 0 : F.data) ?? [],
        columns: z,
        pagination: {
          current: V.current,
          pageSize: V.page_size,
          total: (F == null ? void 0 : F.total) ?? 0,
          onChange: v,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (n) => D("totalItems", { defaultValue: `Total ${n} items`, total: n })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      st,
      {
        roleId: j,
        open: A,
        onClose: () => S(!1)
      }
    )
  ] });
}, vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dt
}, Symbol.toStringTag, { value: "Module" })), { TextArea: _e } = he, ct = rt(({ css: y }) => ({
  rolePermissionExtra: y`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
  rolePolicyExtra: y`
      position: absolute;
      right: 5px;
      top: 5px;
    `
})), ut = {
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
}, be = JSON.stringify({ Statement: [] }, null, 2), mt = () => {
  const { message: y } = pe.useApp(), { styles: s } = ct(), { hasGlobalPermission: D } = Se(), { t: o } = ee("authorization"), { t: d } = ee("common"), P = Re(), { id: R } = ot(), [i] = it(), U = i.get("cloneFrom") || void 0, x = !!R, { enableMultiOrg: V, currentOrgId: B } = fe(), { user: A } = ze(), S = (A == null ? void 0 : A.organizations) || [], [j] = T.useForm(), [N, k] = I([]), [F, p] = I([]), [_, v] = I(!0), [f, r] = I([]), [u, m] = I({}), w = Ue({}), [z, n] = I("global"), [h, E] = I(void 0), [ve, Te] = I(!1);
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
      y.error(o("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }), we = (l) => l ? l.reduce((t, a) => (!a.toolset_id || !a.tool_name || (t[a.toolset_id] || (t[a.toolset_id] = []), t[a.toolset_id].includes(a.tool_name) || t[a.toolset_id].push(a.tool_name)), t), {}) : {}, { run: Q, loading: Ee } = q(
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
      const b = a || w.current || {}, J = {};
      c.forEach((L) => {
        const oe = b[L.id] || [];
        J[L.id] = oe.filter(
          (ie) => (L.tools || []).some((ne) => ne.name === ie)
        );
      }), m(J);
    },
    {
      manual: !0,
      onError: (l, t) => {
        y.error(o("role.loadAiToolsetsError", { defaultValue: "Failed to load AI toolsets." })), r([]);
        const a = t == null ? void 0 : t[0];
        m((a == null ? void 0 : a.initialSelection) || {});
      }
    }
  ), { run: ae, loading: Pe } = q(
    async (l) => {
      var ie;
      const { roleId: t, clone: a } = l, g = a === !0, c = await G.authorization.getRole({ id: t });
      Te(!g && c.role_type === "system");
      const b = ((ie = c.permissions) == null ? void 0 : ie.map((ne) => ne.id)) || [];
      k(b), j.setFieldsValue({ permissions: b });
      const J = c.organization_id || "", L = J ? "organization" : "global";
      n(L);
      const oe = we(c.ai_tool_permissions || []);
      L === "organization" && J ? await Q({ organizationId: J, initialSelection: oe }) : (r([]), m(g ? oe : {})), j.setFieldsValue({
        name: g ? `${c.name} (copy)` : c.name,
        description: c.description,
        role_type: L,
        organization_id: J || void 0,
        policy_document: JSON.stringify(c.policy_document || { Statement: [] }, null, 2)
      });
    },
    {
      manual: !0,
      onError: () => {
        y.error(o("role.detailLoadError", { defaultValue: "Failed to load role details" })), P("/authorization/roles");
      }
    }
  );
  re(() => {
    if (x && R) {
      ae({ roleId: R });
      return;
    }
    if (U) {
      ae({ roleId: U, clone: !0 });
      return;
    }
    const l = h || (S.length > 0 ? S[0].id : ""), t = V && l ? "organization" : "global";
    n(t), j.setFieldsValue({
      role_type: t,
      organization_id: t === "organization" ? l : void 0,
      policy_document: be,
      permissions: []
    }), k([]), m({}), t === "organization" && l ? Q({ organizationId: l, initialSelection: {} }) : r([]);
  }, [
    U,
    Q,
    j,
    R,
    x,
    S,
    h,
    V,
    ae
  ]);
  const Ae = H(() => z === "global" ? te : te.map((t) => {
    const a = (t.children || []).filter(
      (g) => g.orgPermission === !0
    );
    return {
      ...t,
      children: a
    };
  }).filter((t) => t.children && t.children.length > 0), [te, z]), Ie = (l) => {
    p(l), v(!1);
  }, Ce = () => {
    const l = te.map((t) => t.key);
    p(l), v(!0);
  }, Oe = () => {
    p([]), v(!1);
  }, ke = ge((l, t) => {
    m((a) => ({
      ...a,
      [l]: t
    }));
  }, []), Fe = ge((l, t) => {
    const a = f.find((c) => c.id === l);
    if (!a)
      return;
    const g = (a.tools || []).map((c) => c.name);
    m((c) => ({
      ...c,
      [l]: t ? g : []
    }));
  }, [f]), De = (l, t) => {
    if (z === "organization")
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
  }, Ne = H(() => ({
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
  }), [o]), { run: Le, loading: Ge } = q(
    async (l) => {
      const t = { ...l };
      z === "global" ? t.policy_document = JSON.parse(l.policy_document ?? "{}") : t.policy_document = { Statement: [] }, t.role_type === "organization" ? t.organization_id = t.organization_id || void 0 : t.organization_id = void 0, delete t.role_type;
      const a = z === "organization" ? Object.entries(u).map(([g, c]) => ({
        toolset_id: g,
        tools: Array.from(new Set(c))
      })).filter((g) => g.tools.length > 0) : [];
      t.ai_tool_permissions = a, t.permissions = N.filter((g) => !g.startsWith("[group]-")), x && R ? await G.authorization.updateRole({ id: R }, t) : await G.authorization.createRole(t);
    },
    {
      manual: !0,
      onSuccess: () => {
        y.success(
          x ? o("role.updateSuccess", { defaultValue: "Role updated successfully." }) : o("role.createSuccess", { defaultValue: "Role created successfully." })
        ), P("/authorization/roles");
      },
      onError: (l) => {
        y.error(
          o("role.saveError", {
            error: l instanceof Error ? l.message : `${l}`,
            defaultValue: "Failed to save role.",
            action: x ? d("update", { defaultValue: "Update" }) : d("create", { defaultValue: "Create" })
          })
        );
      }
    }
  ), le = x && ve;
  return /* @__PURE__ */ e.jsxs(
    K,
    {
      title: le ? o("role.viewTitle", { defaultValue: "View Role" }) : x ? o("role.editTitle", { defaultValue: "Edit Role" }) : o("role.createTitle", { defaultValue: "Create Role" }),
      loading: Pe,
      children: [
        le && /* @__PURE__ */ e.jsx(
          Je,
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
            form: j,
            layout: "vertical",
            disabled: le,
            initialValues: {
              policy_document: be,
              permissions: []
            },
            onFinish: Le,
            children: [
              /* @__PURE__ */ e.jsx(
                We,
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
                            children: /* @__PURE__ */ e.jsx(he, { placeholder: o("role.namePlaceholder", { defaultValue: "Enter role name" }) })
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          T.Item,
                          {
                            label: o("role.description", { defaultValue: "Description" }),
                            name: "description",
                            children: /* @__PURE__ */ e.jsx(
                              _e,
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
                            hidden: !V,
                            rules: [
                              {
                                required: !0,
                                message: o("role.roleTypeRequired", {
                                  defaultValue: "Please select role type."
                                })
                              }
                            ],
                            extra: x ? o("role.roleTypeCannotChange", {
                              defaultValue: "Role type cannot be changed after creation."
                            }) : "",
                            children: /* @__PURE__ */ e.jsxs(
                              se.Group,
                              {
                                disabled: x || !D("authorization:role:create"),
                                onChange: (l) => {
                                  const t = l.target.value;
                                  if (n(t), t === "global")
                                    j.setFieldsValue({ organization_id: void 0 }), r([]), m({});
                                  else {
                                    const a = h || (S.length > 0 ? S[0].id : "");
                                    j.setFieldsValue({ organization_id: a }), a ? Q({
                                      organizationId: a,
                                      initialSelection: w.current
                                    }) : (r([]), m({}));
                                  }
                                  k([]), j.setFieldsValue({ permissions: [] });
                                },
                                children: [
                                  /* @__PURE__ */ e.jsx(se, { value: "global", children: o("role.globalRole", { defaultValue: "Global Role" }) }),
                                  /* @__PURE__ */ e.jsx(se, { value: "organization", children: o("role.organizationRole", { defaultValue: "Organization Role" }) })
                                ]
                              }
                            )
                          }
                        ),
                        z === "organization" && /* @__PURE__ */ e.jsx(
                          T.Item,
                          {
                            hidden: !V,
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
                              Z,
                              {
                                placeholder: o("role.selectOrganization", {
                                  defaultValue: "Select Organization"
                                }),
                                onChange: (l) => {
                                  k([]), j.setFieldsValue({ permissions: [] });
                                  const t = l || "";
                                  t ? Q({ organizationId: t, initialSelection: {} }) : (r([]), m({}));
                                },
                                children: S.map((l) => /* @__PURE__ */ e.jsx(Z.Option, { value: l.id, children: l.name }, l.id))
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
                                if (N.length === 0)
                                  if (z === "global") {
                                    const l = j.getFieldValue("policy_document");
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
                                  /* @__PURE__ */ e.jsx(C, { type: "link", onClick: Ce, icon: /* @__PURE__ */ e.jsx(tt, {}), children: d("expandAll", { defaultValue: "Expand All" }) }),
                                  /* @__PURE__ */ e.jsx(C, { type: "link", onClick: Oe, icon: /* @__PURE__ */ e.jsx(lt, {}), children: d("collapseAll", { defaultValue: "Collapse All" }) })
                                ] }),
                                /* @__PURE__ */ e.jsx(
                                  He,
                                  {
                                    treeData: Ae,
                                    titleRender: (l) => {
                                      const t = l, a = typeof t.title == "string" ? t.title : String(t.title ?? "");
                                      return /* @__PURE__ */ e.jsx("span", { children: o(`permission.title.${t.code}`, { defaultValue: a }) });
                                    },
                                    checkable: !0,
                                    disabled: le,
                                    expandedKeys: F,
                                    autoExpandParent: _,
                                    onExpand: Ie,
                                    checkedKeys: N,
                                    onCheck: (l) => {
                                      let t = [];
                                      at(l) ? t = l : nt(l, "checked") && (t = l.checked), k(t), j.setFieldsValue({ permissions: t });
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
                      disabled: z === "global",
                      children: /* @__PURE__ */ e.jsx("div", { style: { marginBottom: "24px" }, children: /* @__PURE__ */ e.jsx(ue, { spinning: Ee, children: z === "organization" ? f.length > 0 ? /* @__PURE__ */ e.jsx(M, { direction: "vertical", size: "middle", style: { width: "100%" }, children: f.map((l) => {
                        const t = (l.tools || []).map((b) => b.name), a = u[l.id] || [], g = t.length > 0 && a.length === t.length, c = a.length > 0 && a.length < t.length;
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
                                  onChange: (b) => Fe(l.id, b.target.checked)
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
                                onChange: (b) => ke(l.id, b),
                                children: /* @__PURE__ */ e.jsx(M, { direction: "vertical", style: { width: "100%" }, children: (l.tools || []).map((b) => /* @__PURE__ */ e.jsx(de, { value: b.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                                  /* @__PURE__ */ e.jsx("div", { children: b.name }),
                                  b.description && /* @__PURE__ */ e.jsx(
                                    "div",
                                    {
                                      style: {
                                        color: "rgba(0,0,0,0.45)",
                                        fontSize: 12
                                      },
                                      children: b.description
                                    }
                                  )
                                ] }) }, b.name)) })
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
                      disabled: z === "organization",
                      forceRender: !0,
                      children: /* @__PURE__ */ e.jsx(
                        T.Item,
                        {
                          name: "policy_document",
                          rules: [
                            {
                              validator: De
                            }
                          ],
                          extra: /* @__PURE__ */ e.jsx("span", { className: s.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                            Z,
                            {
                              style: { width: 160 },
                              ...Ne,
                              onChange: (l) => {
                                if (typeof l == "string") {
                                  const t = ut[l];
                                  t && j.setFieldValue("policy_document", JSON.stringify(t, null, 2));
                                }
                              }
                            }
                          ) }),
                          children: /* @__PURE__ */ e.jsx(
                            _e,
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
                    loading: Ge,
                    children: x ? d("update", { defaultValue: "Update" }) : d("create", { defaultValue: "Create" })
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
}, Tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mt
}, Symbol.toStringTag, { value: "Module" }));
export {
  vt as R,
  Tt as a
};
