import { j as e } from "./vendor.js";
import { useMemo as H, useState as I, useRef as Be, useEffect as se, useCallback as xe } from "react";
import { App as he, Empty as M, Spin as me, Typography as je, Tag as E, Descriptions as W, Card as K, Space as L, Drawer as qe, Form as T, Tooltip as Y, Button as C, Popconfirm as Je, Row as We, Col as _e, Input as fe, Select as Z, Table as He, Alert as Ke, Tabs as Qe, Radio as de, Tree as Ye, Checkbox as ce } from "antd";
import { TeamOutlined as Se, LockOutlined as pe, ToolOutlined as Xe, UserOutlined as Ze, EditOutlined as et, CopyOutlined as be, DeleteOutlined as tt, ReloadOutlined as lt, PlusOutlined as ot, DownOutlined as it, UpOutlined as at } from "@ant-design/icons";
import { i as X } from "./components.js";
import { a as N } from "./index.js";
import { useTranslation as ee } from "react-i18next";
import { b as ge, u as Re, a as we } from "./contexts.js";
import { useNavigate as Te, useParams as nt, useSearchParams as rt } from "react-router-dom";
import { P as ue } from "./base.js";
import { useRequest as B } from "ahooks";
import { isArray as st, has as dt } from "lodash-es";
import { createStyles as ct } from "antd-style";
const ut = ({ roleId: y, open: s, onClose: k }) => {
  const { message: o } = he.useApp(), { t: c } = ee("authorization"), { siteConfig: P } = ge(), w = (P == null ? void 0 : P.enable_multi_org) ?? !1, { data: i, loading: G, mutate: x } = B(async () => y ? N.authorization.getRole({ id: y }) : null, {
    refreshDeps: [y, s],
    ready: !!y && s,
    onBefore: () => {
      x();
    },
    onError: () => {
      o.error(c("role.loadDetailError", { defaultValue: "Failed to load role details" }));
    }
  }), {
    data: j,
    loading: U,
    error: $
  } = B(async () => N.authorization.listPermissions(), {
    refreshDeps: [s],
    ready: s
  }), f = j ?? [], _ = H(() => {
    var V;
    if (!((V = i == null ? void 0 : i.permissions) != null && V.length)) return {};
    const m = {};
    for (const R of i.permissions) {
      const p = R.code.split(":"), d = p.length >= 2 ? `${p[0]}:${p[1]}` : p[0];
      m[d] || (m[d] = []), m[d].push(R);
    }
    return m;
  }, [i == null ? void 0 : i.permissions]), F = H(() => {
    var p;
    if (!((p = i == null ? void 0 : i.permissions) != null && p.length))
      return /* @__PURE__ */ e.jsx(M, { description: c("role.noPermissions", { defaultValue: "No permissions assigned" }) });
    const m = {
      maxHeight: 420,
      overflowY: "auto",
      border: "1px solid var(--ant-color-border)",
      borderRadius: 6,
      padding: "12px 12px 4px"
    };
    if (U && f.length === 0 && !$)
      return /* @__PURE__ */ e.jsx("div", { style: { ...m, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }, children: /* @__PURE__ */ e.jsx(me, {}) });
    const V = [], R = new Set(i.permissions.map((d) => d.id));
    if (f.length > 0) {
      const d = /* @__PURE__ */ new Set();
      for (const b of f)
        for (const z of b.permissions || [])
          d.add(z.id);
      f.forEach((b, z) => {
        const n = (b.permissions || []).filter((h) => R.has(h.id));
        n.length && V.push({
          key: `catalog-${z}`,
          groupTitleKey: `permission.title.${b.name.replace(/ /g, "_")}`,
          groupTitleDefault: b.name,
          permissions: n
        });
      });
      const r = i.permissions.filter((b) => !d.has(b.id));
      r.length && V.push({
        key: "orphans",
        groupTitleKey: "role.otherPermissions",
        groupTitleDefault: "Other permissions",
        permissions: r
      });
    } else
      Object.entries(_).forEach(([d, r], b) => {
        V.push({
          key: `fallback-${b}`,
          groupTitleKey: `permission.title.${d.replace(/:/g, ".")}`,
          groupTitleDefault: d,
          permissions: r
        });
      });
    return /* @__PURE__ */ e.jsx("div", { style: m, children: V.map((d) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 12 }, children: [
      /* @__PURE__ */ e.jsx(je.Text, { strong: !0, style: { display: "block", marginBottom: 8 }, children: c(d.groupTitleKey, { defaultValue: d.groupTitleDefault }) }),
      /* @__PURE__ */ e.jsx(
        "div",
        {
          style: {
            marginLeft: 4,
            paddingLeft: 12,
            borderLeft: "2px solid var(--ant-color-split)"
          },
          children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 }, children: d.permissions.map((r) => /* @__PURE__ */ e.jsx(E, { title: r.code, children: c(`permission.title.${r.code.replace(/:/g, ".")}`, { defaultValue: r.name }) }, r.id)) })
        }
      )
    ] }, d.key)) });
  }, [i, f, U, $, _, c]), O = H(() => {
    var m;
    return i != null && i.policy_document ? ((m = i.policy_document.Statement) == null ? void 0 : m.length) > 0 : !1;
  }, [i == null ? void 0 : i.policy_document]), A = H(() => {
    var m;
    return (((m = i == null ? void 0 : i.ai_tool_permissions) == null ? void 0 : m.length) || 0) > 0;
  }, [i == null ? void 0 : i.ai_tool_permissions]), q = H(() => {
    var V, R;
    const m = [
      i ? /* @__PURE__ */ e.jsxs(W, { column: 1, bordered: !0, size: "small", children: [
        /* @__PURE__ */ e.jsx(W.Item, { label: c("role.name", { defaultValue: "Role Name" }), children: i.name }),
        /* @__PURE__ */ e.jsx(W.Item, { label: c("role.description", { defaultValue: "Description" }), children: i.description || "-" }),
        /* @__PURE__ */ e.jsx(W.Item, { label: c("role.roleType", { defaultValue: "Role Type" }), children: i.role_type === "system" ? /* @__PURE__ */ e.jsx(E, { color: "orange", children: c("role.typeSystem", { defaultValue: "System" }) }) : /* @__PURE__ */ e.jsx(E, { color: "default", children: c("role.typeUser", { defaultValue: "User" }) }) }),
        w && /* @__PURE__ */ e.jsx(W.Item, { label: c("role.organization", { defaultValue: "Organization" }), children: i.organization_id ? /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Se, {}), color: "blue", children: ((V = i.organization) == null ? void 0 : V.name) || i.organization_id }) : /* @__PURE__ */ e.jsx(E, { color: "default", children: c("role.global", { defaultValue: "Global" }) }) }),
        /* @__PURE__ */ e.jsx(W.Item, { label: c("role.createdAt", { defaultValue: "Created At" }), children: new Date(i.created_at).toLocaleString() }),
        /* @__PURE__ */ e.jsx(W.Item, { label: c("role.updatedAt", { defaultValue: "Updated At" }), children: new Date(i.updated_at).toLocaleString() })
      ] }) : null,
      /* @__PURE__ */ e.jsx(K, { title: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(pe, { style: { marginRight: 4 } }),
        c("role.permissions", { defaultValue: "Permissions" }),
        (R = i == null ? void 0 : i.permissions) != null && R.length ? ` (${i.permissions.length})` : ""
      ] }), children: F })
    ];
    if (O && m.push(
      /* @__PURE__ */ e.jsx(
        K,
        {
          title: c("role.policyDocument", { defaultValue: "Policy Document" }),
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
    ), A) {
      const p = {};
      for (const d of i.ai_tool_permissions) {
        const r = d.toolset_id;
        p[r] || (p[r] = { toolset: d.toolset, tools: [] }), p[r].tools.push(d.tool_name);
      }
      m.push(/* @__PURE__ */ e.jsx(K, { title: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(Xe, { style: { marginRight: 4 } }),
        c("role.aiPermissions", { defaultValue: "AI Tool Permissions" })
      ] }), children: Object.entries(p).map(([d, { toolset: r, tools: b }]) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 12 }, children: [
        /* @__PURE__ */ e.jsxs(L, { size: 8, style: { marginBottom: 4 }, children: [
          /* @__PURE__ */ e.jsx(je.Text, { strong: !0, children: (r == null ? void 0 : r.name) || d }),
          r != null && r.type ? /* @__PURE__ */ e.jsx(E, { color: "blue", children: String(r.type).toUpperCase() }) : null
        ] }),
        /* @__PURE__ */ e.jsx("div", { children: b.map((z) => /* @__PURE__ */ e.jsx(E, { color: "blue", style: { marginBottom: 4 }, children: z }, z)) })
      ] }, d)) }));
    }
    return m;
  }, [i, F, O, A, w, c]);
  return /* @__PURE__ */ e.jsx(
    qe,
    {
      title: c("role.viewTitle", { defaultValue: "View Role" }),
      open: s,
      onClose: k,
      width: 800,
      destroyOnHidden: !0,
      getContainer: ".site-layout",
      rootStyle: { position: "absolute" },
      styles: {
        body: { paddingRight: 0 },
        wrapper: { maxWidth: "100%" }
      },
      children: /* @__PURE__ */ e.jsx(me, { spinning: G, children: /* @__PURE__ */ e.jsx(L, { direction: "vertical", style: { width: "100%" }, children: i ? q : !G && /* @__PURE__ */ e.jsx(M, {}) }) })
    }
  );
}, mt = () => {
  const { message: y } = he.useApp(), { t: s } = ee("authorization"), { t: k } = ee("common"), { siteConfig: o } = ge(), c = (o == null ? void 0 : o.enable_multi_org) ?? !1, P = Te(), { user: w } = Re(), { hasGlobalPermission: i } = we(), G = (w == null ? void 0 : w.organizations) || [], [x] = T.useForm(), [j, U] = I({
    current: ue.DEFAULT_CURRENT,
    page_size: ue.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), [$, f] = I(!1), [_, F] = I(null), { run: O, data: A, loading: q } = B(async () => N.authorization.listRoles(j), {
    debounceWait: 300,
    refreshDeps: [j],
    onError: () => {
      y.error(s("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }), m = (n) => {
    U({
      ...j,
      current: ue.DEFAULT_CURRENT,
      search: n.search,
      organization_id: n.organization_id || void 0
    });
  }, V = (n, h) => {
    U((v) => ({
      ...v,
      current: n,
      page_size: h
    }));
  }, R = (n) => {
    P(`/authorization/roles/${n}/edit`);
  }, p = (n) => {
    P(`/authorization/roles/create?cloneFrom=${encodeURIComponent(n)}`);
  }, { run: d } = B(
    async ({ id: n }) => N.authorization.deleteRole({ id: n }),
    {
      manual: !0,
      onSuccess: () => {
        y.success(s("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), O();
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
  ), r = (n) => {
    F(n), f(!0);
  }, b = c && i("authorization:role:view"), z = [
    {
      title: s("role.name", { defaultValue: "Role Name" }),
      dataIndex: "name",
      key: "name",
      render: (n, h) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(Ze, {}),
        /* @__PURE__ */ e.jsx("a", { onClick: () => r(h.id), children: n })
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
      render: (n, h) => h.role_type === "system" ? /* @__PURE__ */ e.jsx(E, { color: "orange", children: s("role.typeSystem", { defaultValue: "System" }) }) : /* @__PURE__ */ e.jsx(E, { color: "default", children: s("role.typeUser", { defaultValue: "User" }) })
    },
    {
      title: s("role.organization", { defaultValue: "Organization" }),
      key: "organization",
      hidden: !c,
      render: (n, h) => {
        var v;
        return h.organization_id ? /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Se, {}), color: "blue", children: ((v = h.organization) == null ? void 0 : v.name) || h.organization_id }) : /* @__PURE__ */ e.jsx(E, { color: "default", children: s("role.global", { defaultValue: "Global" }) });
      }
    },
    {
      title: s("role.permissionCount", { defaultValue: "Permissions" }),
      key: "permission_count",
      render: (n, h) => {
        var v;
        return /* @__PURE__ */ e.jsxs(E, { color: "blue", children: [
          /* @__PURE__ */ e.jsx(pe, {}),
          " ",
          ((v = h.permissions) == null ? void 0 : v.length) || 0
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
      title: k("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (n, h) => {
        const v = h.role_type === "system";
        return /* @__PURE__ */ e.jsxs(L, { size: "small", children: [
          !v && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:update", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.edit", { defaultValue: "Edit Role" }), children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(et, {}),
                onClick: () => R(h.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(be, {}),
                onClick: () => p(h.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
              Je,
              {
                title: s("role.deleteConfirm", { defaultValue: "Are you sure you want to delete this role?" }),
                onConfirm: () => d({ id: h.id }),
                okText: k("confirm", { defaultValue: "Confirm" }),
                cancelText: k("cancel", { defaultValue: "Cancel" }),
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
          v && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(Y, { title: s("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }), children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(C, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(pe, {}), disabled: !0 }) }) }),
            /* @__PURE__ */ e.jsx(X, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(be, {}),
                onClick: () => p(h.id)
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
        onFinish: m,
        name: "roleSearchForm",
        initialValues: {
          search: j.search,
          organization_id: j.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(We, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(L, { children: [
            /* @__PURE__ */ e.jsx(T.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              fe.Search,
              {
                placeholder: s("role.searchPlaceholder", { defaultValue: "Role name/description" }),
                allowClear: !0,
                onSearch: () => {
                  m(x.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            b && /* @__PURE__ */ e.jsx(T.Item, { name: "organization_id", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              Z,
              {
                placeholder: s("role.allOrganizations", { defaultValue: "All Organizations" }),
                allowClear: !0,
                onChange: () => {
                  m(x.getFieldsValue());
                },
                style: { minWidth: 200 },
                options: [
                  { value: "", label: s("role.global", { defaultValue: "Global" }) },
                  ...G.map((n) => ({ value: n.id, label: n.name }))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(L, { children: [
            /* @__PURE__ */ e.jsx(
              C,
              {
                onClick: () => {
                  m(x.getFieldsValue());
                },
                icon: /* @__PURE__ */ e.jsx(lt, {}),
                children: k("refresh", { defaultValue: "Refresh" })
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
        loading: q,
        dataSource: (A == null ? void 0 : A.data) ?? [],
        columns: z,
        pagination: {
          current: j.current,
          pageSize: j.page_size,
          total: (A == null ? void 0 : A.total) ?? 0,
          onChange: V,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (n) => k("totalItems", { defaultValue: `Total ${n} items`, total: n })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ut,
      {
        roleId: _,
        open: $,
        onClose: () => f(!1)
      }
    )
  ] });
}, Et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mt
}, Symbol.toStringTag, { value: "Module" })), { TextArea: ze } = fe, pt = ct(({ css: y }) => ({
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
}, Ve = JSON.stringify({ Statement: [] }, null, 2), ft = () => {
  const { message: y } = he.useApp(), { styles: s } = pt(), { hasGlobalPermission: k } = we(), { t: o } = ee("authorization"), { t: c } = ee("common"), P = Te(), { id: w } = nt(), [i] = rt(), G = i.get("cloneFrom") || void 0, x = !!w, { enableMultiOrg: j, currentOrgId: U } = ge(), { user: $ } = Re(), f = ($ == null ? void 0 : $.organizations) || [], [_] = T.useForm(), [F, O] = I([]), [A, q] = I([]), [m, V] = I(!0), [R, p] = I([]), [d, r] = I({}), b = Be({}), [z, n] = I("global"), [h, v] = I(void 0), [ve, Ee] = I(!1), ne = !j || z === "organization";
  se(() => {
    b.current = d;
  }, [d]), se(() => {
    v(U || void 0);
  }, []);
  const { data: te = [] } = B(async () => N.authorization.listPermissions().then((l) => l.map((t, a) => {
    const g = (t.permissions || []).map((u) => ({
      key: u.id,
      code: u.code.replace(/:/g, "."),
      title: u.name,
      orgPermission: u.org_permission || !1
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
  }), Pe = (l) => l ? l.reduce((t, a) => (!a.toolset_id || !a.tool_name || (t[a.toolset_id] || (t[a.toolset_id] = []), t[a.toolset_id].includes(a.tool_name) || t[a.toolset_id].push(a.tool_name)), t), {}) : {}, { run: Q, loading: Ae } = B(
    async (l) => {
      const { organizationId: t, initialSelection: a } = l;
      if (!t) {
        p([]), r(a || {});
        return;
      }
      const u = ((await N.system.listToolSets(
        { page_size: 1e3, include_tools: !0 },
        { headers: { "X-Scope-OrgID": t } }
      )).data || []).filter((D) => D.status === "enabled");
      p(u);
      const S = a || b.current || {}, J = {};
      u.forEach((D) => {
        const oe = S[D.id] || [];
        J[D.id] = oe.filter(
          (ie) => (D.tools || []).some((ae) => ae.name === ie)
        );
      }), r(J);
    },
    {
      manual: !0,
      onError: (l, t) => {
        y.error(o("role.loadAiToolsetsError", { defaultValue: "Failed to load AI toolsets." })), p([]);
        const a = t == null ? void 0 : t[0];
        r((a == null ? void 0 : a.initialSelection) || {});
      }
    }
  ), { run: re, loading: Ie } = B(
    async (l) => {
      var ae, ye;
      const { roleId: t, clone: a } = l, g = a === !0, u = await N.authorization.getRole({ id: t });
      Ee(!g && u.role_type === "system");
      const S = ((ae = u.permissions) == null ? void 0 : ae.map((Me) => Me.id)) || [];
      O(S), _.setFieldsValue({ permissions: S });
      const J = u.organization_id || "", D = J ? "organization" : "global";
      n(D);
      const oe = Pe(u.ai_tool_permissions || []), ie = D === "organization" && J ? J : j ? "" : U || ((ye = f[0]) == null ? void 0 : ye.id) || "";
      ie ? await Q({ organizationId: ie, initialSelection: oe }) : (p([]), r(g ? oe : {})), _.setFieldsValue({
        name: g ? `${u.name} (copy)` : u.name,
        description: u.description,
        role_type: D,
        organization_id: J || void 0,
        policy_document: JSON.stringify(u.policy_document || { Statement: [] }, null, 2)
      });
    },
    {
      manual: !0,
      onError: () => {
        y.error(o("role.detailLoadError", { defaultValue: "Failed to load role details" })), P("/authorization/roles");
      }
    }
  );
  se(() => {
    if (x && w) {
      re({ roleId: w });
      return;
    }
    if (G) {
      re({ roleId: G, clone: !0 });
      return;
    }
    const l = h || (f.length > 0 ? f[0].id : ""), t = j && l ? "organization" : "global";
    n(t), _.setFieldsValue({
      role_type: t,
      organization_id: t === "organization" ? l : void 0,
      policy_document: Ve,
      permissions: []
    }), O([]), r({});
    const a = t === "organization" && l ? l : j ? "" : l;
    a ? Q({ organizationId: a, initialSelection: {} }) : p([]);
  }, [
    G,
    Q,
    _,
    w,
    x,
    f,
    h,
    j,
    re
  ]);
  const Ce = H(() => z === "global" ? te : te.map((t) => {
    const a = (t.children || []).filter(
      (g) => g.orgPermission === !0
    );
    return {
      ...t,
      children: a
    };
  }).filter((t) => t.children && t.children.length > 0), [te, z]), Oe = (l) => {
    q(l), V(!1);
  }, ke = () => {
    const l = te.map((t) => t.key);
    q(l), V(!0);
  }, Fe = () => {
    q([]), V(!1);
  }, De = xe((l, t) => {
    r((a) => ({
      ...a,
      [l]: t
    }));
  }, []), Ne = xe((l, t) => {
    const a = R.find((u) => u.id === l);
    if (!a)
      return;
    const g = (a.tools || []).map((u) => u.name);
    r((u) => ({
      ...u,
      [l]: t ? g : []
    }));
  }, [R]), Le = (l, t) => {
    if (z === "organization")
      return Promise.resolve();
    if (!t || t.trim() === "" || t === "{}" || t === '{"Statement":[]}')
      return F.length === 0 ? Promise.reject(
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
      z === "global" ? t.policy_document = JSON.parse(l.policy_document ?? "{}") : t.policy_document = { Statement: [] }, t.role_type === "organization" ? t.organization_id = t.organization_id || void 0 : t.organization_id = void 0, delete t.role_type;
      const a = ne ? Object.entries(d).map(([g, u]) => ({
        toolset_id: g,
        tools: Array.from(new Set(u))
      })).filter((g) => g.tools.length > 0) : [];
      t.ai_tool_permissions = a, t.permissions = F.filter((g) => !g.startsWith("[group]-")), x && w ? await N.authorization.updateRole({ id: w }, t) : await N.authorization.createRole(t);
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
            action: x ? c("update", { defaultValue: "Update" }) : c("create", { defaultValue: "Create" })
          })
        );
      }
    }
  ), le = x && ve;
  return /* @__PURE__ */ e.jsxs(
    K,
    {
      title: le ? o("role.viewTitle", { defaultValue: "View Role" }) : x ? o("role.editTitle", { defaultValue: "Edit Role" }) : o("role.createTitle", { defaultValue: "Create Role" }),
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
          T,
          {
            form: _,
            layout: "vertical",
            disabled: le,
            initialValues: {
              policy_document: Ve,
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
                            children: /* @__PURE__ */ e.jsx(fe, { placeholder: o("role.namePlaceholder", { defaultValue: "Enter role name" }) })
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          T.Item,
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
                          T.Item,
                          {
                            label: o("role.roleType", { defaultValue: "Role Type" }),
                            name: "role_type",
                            hidden: !j,
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
                              de.Group,
                              {
                                disabled: x || !k("authorization:role:create"),
                                onChange: (l) => {
                                  const t = l.target.value;
                                  if (n(t), t === "global")
                                    _.setFieldsValue({ organization_id: void 0 }), p([]), r({});
                                  else {
                                    const a = h || (f.length > 0 ? f[0].id : "");
                                    _.setFieldsValue({ organization_id: a }), a ? Q({
                                      organizationId: a,
                                      initialSelection: b.current
                                    }) : (p([]), r({}));
                                  }
                                  O([]), _.setFieldsValue({ permissions: [] });
                                },
                                children: [
                                  /* @__PURE__ */ e.jsx(de, { value: "global", children: o("role.globalRole", { defaultValue: "Global Role" }) }),
                                  /* @__PURE__ */ e.jsx(de, { value: "organization", children: o("role.organizationRole", { defaultValue: "Organization Role" }) })
                                ]
                              }
                            )
                          }
                        ),
                        z === "organization" && /* @__PURE__ */ e.jsx(
                          T.Item,
                          {
                            hidden: !j,
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
                            extra: f.length > 0 ? o("role.organizationHelp", {
                              defaultValue: "Select the organization this role belongs to"
                            }) : o("role.noOrganizationsAvailable", {
                              defaultValue: "No organizations available. Please contact your administrator."
                            }),
                            children: f.length > 0 ? /* @__PURE__ */ e.jsx(
                              Z,
                              {
                                placeholder: o("role.selectOrganization", {
                                  defaultValue: "Select Organization"
                                }),
                                onChange: (l) => {
                                  O([]), _.setFieldsValue({ permissions: [] });
                                  const t = l || "";
                                  t ? Q({ organizationId: t, initialSelection: {} }) : (p([]), r({}));
                                },
                                children: f.map((l) => /* @__PURE__ */ e.jsx(Z.Option, { value: l.id, children: l.name }, l.id))
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
                                if (F.length === 0)
                                  if (z === "global") {
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
                                  /* @__PURE__ */ e.jsx(C, { type: "link", onClick: ke, icon: /* @__PURE__ */ e.jsx(it, {}), children: c("expandAll", { defaultValue: "Expand All" }) }),
                                  /* @__PURE__ */ e.jsx(C, { type: "link", onClick: Fe, icon: /* @__PURE__ */ e.jsx(at, {}), children: c("collapseAll", { defaultValue: "Collapse All" }) })
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
                                    expandedKeys: A,
                                    autoExpandParent: m,
                                    onExpand: Oe,
                                    checkedKeys: F,
                                    onCheck: (l) => {
                                      let t = [];
                                      st(l) ? t = l : dt(l, "checked") && (t = l.checked), O(t), _.setFieldsValue({ permissions: t });
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
                      children: /* @__PURE__ */ e.jsx("div", { style: { marginBottom: "24px" }, children: /* @__PURE__ */ e.jsx(me, { spinning: Ae, children: ne ? R.length > 0 ? /* @__PURE__ */ e.jsx(L, { direction: "vertical", size: "middle", style: { width: "100%" }, children: R.map((l) => {
                        const t = (l.tools || []).map((S) => S.name), a = d[l.id] || [], g = t.length > 0 && a.length === t.length, u = a.length > 0 && a.length < t.length;
                        return /* @__PURE__ */ e.jsx(
                          K,
                          {
                            size: "small",
                            title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                              /* @__PURE__ */ e.jsx(
                                ce,
                                {
                                  checked: g,
                                  indeterminate: u,
                                  onChange: (S) => Ne(l.id, S.target.checked)
                                }
                              ),
                              /* @__PURE__ */ e.jsx("span", { children: l.name })
                            ] }),
                            extra: l.description ? /* @__PURE__ */ e.jsx("span", { children: l.description }) : void 0,
                            children: (l.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(
                              ce.Group,
                              {
                                style: { width: "100%" },
                                value: d[l.id] || [],
                                onChange: (S) => De(l.id, S),
                                children: /* @__PURE__ */ e.jsx(L, { direction: "vertical", style: { width: "100%" }, children: (l.tools || []).map((S) => /* @__PURE__ */ e.jsx(ce, { value: S.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                                  /* @__PURE__ */ e.jsx("div", { children: S.name }),
                                  S.description && /* @__PURE__ */ e.jsx(
                                    "div",
                                    {
                                      style: {
                                        color: "rgba(0,0,0,0.45)",
                                        fontSize: 12
                                      },
                                      children: S.description
                                    }
                                  )
                                ] }) }, S.name)) })
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
                      disabled: z === "organization",
                      forceRender: !0,
                      children: /* @__PURE__ */ e.jsx(
                        T.Item,
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
              /* @__PURE__ */ e.jsx(T.Item, { children: /* @__PURE__ */ e.jsxs(L, { children: [
                /* @__PURE__ */ e.jsx(
                  C,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: $e,
                    children: x ? c("update", { defaultValue: "Update" }) : c("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  C,
                  {
                    onClick: () => P("/authorization/roles"),
                    children: c("cancel", { defaultValue: "Cancel" })
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
