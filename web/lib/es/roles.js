import { j as e } from "./vendor.js";
import { useMemo as H, useState as O, useRef as $e, useEffect as ye, useCallback as xe } from "react";
import { App as me, Empty as $, Spin as ce, Typography as je, Tag as v, Descriptions as W, Card as K, Space as L, Drawer as Be, Form as w, Tooltip as Y, Button as I, Popconfirm as qe, Row as Je, Col as _e, Input as pe, Select as Z, Table as We, Alert as He, Tabs as Ke, Radio as re, Tree as Ye, Checkbox as se } from "antd";
import { TeamOutlined as Se, LockOutlined as ue, ToolOutlined as Qe, UserOutlined as Ze, EditOutlined as Xe, CopyOutlined as be, DeleteOutlined as et, ReloadOutlined as tt, PlusOutlined as lt, DownOutlined as ot, UpOutlined as it } from "@ant-design/icons";
import { i as Q } from "./components.js";
import { a as N } from "./index.js";
import { useTranslation as X } from "react-i18next";
import { b as he, u as Re, a as Te } from "./contexts.js";
import { useNavigate as we, useParams as at, useSearchParams as nt } from "react-router-dom";
import { P as de } from "./base.js";
import { useRequest as B } from "ahooks";
import { isArray as rt, has as st } from "lodash-es";
import { createStyles as dt } from "antd-style";
const ct = ({ roleId: g, open: s, onClose: k }) => {
  const { message: o } = me.useApp(), { t: c } = X("authorization"), { siteConfig: P } = he(), T = (P == null ? void 0 : P.enable_multi_org) ?? !1, { data: i, loading: G, mutate: y } = B(async () => g ? N.authorization.getRole({ id: g }) : null, {
    refreshDeps: [g, s],
    ready: !!g && s,
    onBefore: () => {
      y();
    },
    onError: () => {
      o.error(c("role.loadDetailError", { defaultValue: "Failed to load role details" }));
    }
  }), {
    data: b,
    loading: U,
    error: M
  } = B(async () => N.authorization.listPermissions(), {
    refreshDeps: [s],
    ready: s
  }), x = b ?? [], z = H(() => {
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
      return /* @__PURE__ */ e.jsx($, { description: c("role.noPermissions", { defaultValue: "No permissions assigned" }) });
    const m = {
      maxHeight: 420,
      overflowY: "auto",
      border: "1px solid var(--ant-color-border)",
      borderRadius: 6,
      padding: "12px 12px 4px"
    };
    if (U && x.length === 0 && !M)
      return /* @__PURE__ */ e.jsx("div", { style: { ...m, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }, children: /* @__PURE__ */ e.jsx(ce, {}) });
    const V = [], R = new Set(i.permissions.map((d) => d.id));
    if (x.length > 0) {
      const d = /* @__PURE__ */ new Set();
      for (const j of x)
        for (const _ of j.permissions || [])
          d.add(_.id);
      x.forEach((j, _) => {
        const n = (j.permissions || []).filter((h) => R.has(h.id));
        n.length && V.push({
          key: `catalog-${_}`,
          groupTitleKey: `permission.title.${j.name.replace(/ /g, "_")}`,
          groupTitleDefault: j.name,
          permissions: n
        });
      });
      const r = i.permissions.filter((j) => !d.has(j.id));
      r.length && V.push({
        key: "orphans",
        groupTitleKey: "role.otherPermissions",
        groupTitleDefault: "Other permissions",
        permissions: r
      });
    } else
      Object.entries(z).forEach(([d, r], j) => {
        V.push({
          key: `fallback-${j}`,
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
          children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 }, children: d.permissions.map((r) => /* @__PURE__ */ e.jsx(v, { title: r.code, children: c(`permission.title.${r.code.replace(/:/g, ".")}`, { defaultValue: r.name }) }, r.id)) })
        }
      )
    ] }, d.key)) });
  }, [i, x, U, M, z, c]), C = H(() => {
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
        /* @__PURE__ */ e.jsx(W.Item, { label: c("role.roleType", { defaultValue: "Role Type" }), children: i.role_type === "system" ? /* @__PURE__ */ e.jsx(v, { color: "orange", children: c("role.typeSystem", { defaultValue: "System" }) }) : /* @__PURE__ */ e.jsx(v, { color: "default", children: c("role.typeUser", { defaultValue: "User" }) }) }),
        T && /* @__PURE__ */ e.jsx(W.Item, { label: c("role.organization", { defaultValue: "Organization" }), children: i.organization_id ? /* @__PURE__ */ e.jsx(v, { icon: /* @__PURE__ */ e.jsx(Se, {}), color: "blue", children: ((V = i.organization) == null ? void 0 : V.name) || i.organization_id }) : /* @__PURE__ */ e.jsx(v, { color: "default", children: c("role.global", { defaultValue: "Global" }) }) }),
        /* @__PURE__ */ e.jsx(W.Item, { label: c("role.createdAt", { defaultValue: "Created At" }), children: new Date(i.created_at).toLocaleString() }),
        /* @__PURE__ */ e.jsx(W.Item, { label: c("role.updatedAt", { defaultValue: "Updated At" }), children: new Date(i.updated_at).toLocaleString() })
      ] }) : null,
      /* @__PURE__ */ e.jsx(K, { title: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(ue, { style: { marginRight: 4 } }),
        c("role.permissions", { defaultValue: "Permissions" }),
        (R = i == null ? void 0 : i.permissions) != null && R.length ? ` (${i.permissions.length})` : ""
      ] }), children: F })
    ];
    if (C && m.push(
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
        /* @__PURE__ */ e.jsx(Qe, { style: { marginRight: 4 } }),
        c("role.aiPermissions", { defaultValue: "AI Tool Permissions" })
      ] }), children: Object.entries(p).map(([d, { toolset: r, tools: j }]) => /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 12 }, children: [
        /* @__PURE__ */ e.jsxs(L, { size: 8, style: { marginBottom: 4 }, children: [
          /* @__PURE__ */ e.jsx(je.Text, { strong: !0, children: (r == null ? void 0 : r.name) || d }),
          r != null && r.type ? /* @__PURE__ */ e.jsx(v, { color: "blue", children: String(r.type).toUpperCase() }) : null
        ] }),
        /* @__PURE__ */ e.jsx("div", { children: j.map((_) => /* @__PURE__ */ e.jsx(v, { color: "blue", style: { marginBottom: 4 }, children: _ }, _)) })
      ] }, d)) }));
    }
    return m;
  }, [i, F, C, A, T, c]);
  return /* @__PURE__ */ e.jsx(
    Be,
    {
      title: c("role.viewTitle", { defaultValue: "View Role" }),
      open: s,
      onClose: k,
      width: 800,
      destroyOnHidden: !0,
      getContainer: ".site-layout",
      styles: {
        body: { paddingRight: 0 },
        wrapper: { maxWidth: "100%" }
      },
      children: /* @__PURE__ */ e.jsx(ce, { spinning: G, children: /* @__PURE__ */ e.jsx(L, { direction: "vertical", style: { width: "100%" }, children: i ? q : !G && /* @__PURE__ */ e.jsx($, {}) }) })
    }
  );
}, ut = () => {
  const { message: g } = me.useApp(), { t: s } = X("authorization"), { t: k } = X("common"), { siteConfig: o } = he(), c = (o == null ? void 0 : o.enable_multi_org) ?? !1, P = we(), { user: T } = Re(), { hasGlobalPermission: i } = Te(), G = (T == null ? void 0 : T.organizations) || [], [y] = w.useForm(), [b, U] = O({
    current: de.DEFAULT_CURRENT,
    page_size: de.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), [M, x] = O(!1), [z, F] = O(null), { run: C, data: A, loading: q } = B(async () => N.authorization.listRoles(b), {
    debounceWait: 300,
    refreshDeps: [b],
    onError: () => {
      g.error(s("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }), m = (n) => {
    U({
      ...b,
      current: de.DEFAULT_CURRENT,
      search: n.search,
      organization_id: n.organization_id || void 0
    });
  }, V = (n, h) => {
    U((E) => ({
      ...E,
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
        g.success(s("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), C();
      },
      onError: (n) => {
        g.error(
          s("role.deleteError", {
            defaultValue: "Failed to delete role: {{error}}",
            error: n instanceof Error ? n.message : String(n)
          })
        );
      }
    }
  ), r = (n) => {
    F(n), x(!0);
  }, j = c && i("authorization:role:view"), _ = [
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
      render: (n, h) => h.role_type === "system" ? /* @__PURE__ */ e.jsx(v, { color: "orange", children: s("role.typeSystem", { defaultValue: "System" }) }) : /* @__PURE__ */ e.jsx(v, { color: "default", children: s("role.typeUser", { defaultValue: "User" }) })
    },
    {
      title: s("role.organization", { defaultValue: "Organization" }),
      key: "organization",
      hidden: !c,
      render: (n, h) => {
        var E;
        return h.organization_id ? /* @__PURE__ */ e.jsx(v, { icon: /* @__PURE__ */ e.jsx(Se, {}), color: "blue", children: ((E = h.organization) == null ? void 0 : E.name) || h.organization_id }) : /* @__PURE__ */ e.jsx(v, { color: "default", children: s("role.global", { defaultValue: "Global" }) });
      }
    },
    {
      title: s("role.permissionCount", { defaultValue: "Permissions" }),
      key: "permission_count",
      render: (n, h) => {
        var E;
        return /* @__PURE__ */ e.jsxs(v, { color: "blue", children: [
          /* @__PURE__ */ e.jsx(ue, {}),
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
      title: k("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (n, h) => {
        const E = h.role_type === "system";
        return /* @__PURE__ */ e.jsxs(L, { size: "small", children: [
          !E && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(Q, { permission: "authorization:role:update", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.edit", { defaultValue: "Edit Role" }), children: /* @__PURE__ */ e.jsx(
              I,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(Xe, {}),
                onClick: () => R(h.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(Q, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              I,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(be, {}),
                onClick: () => p(h.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(Q, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
              qe,
              {
                title: s("role.deleteConfirm", { defaultValue: "Are you sure you want to delete this role?" }),
                onConfirm: () => d({ id: h.id }),
                okText: k("confirm", { defaultValue: "Confirm" }),
                cancelText: k("cancel", { defaultValue: "Cancel" }),
                children: /* @__PURE__ */ e.jsx(
                  I,
                  {
                    type: "text",
                    size: "small",
                    danger: !0,
                    icon: /* @__PURE__ */ e.jsx(et, {})
                  }
                )
              }
            ) }) })
          ] }),
          E && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(Y, { title: s("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }), children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(I, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(ue, {}), disabled: !0 }) }) }),
            /* @__PURE__ */ e.jsx(Q, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(Y, { title: s("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              I,
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
      w,
      {
        form: y,
        layout: "vertical",
        onFinish: m,
        name: "roleSearchForm",
        initialValues: {
          search: b.search,
          organization_id: b.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(Je, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(L, { children: [
            /* @__PURE__ */ e.jsx(w.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              pe.Search,
              {
                placeholder: s("role.searchPlaceholder", { defaultValue: "Role name/description" }),
                allowClear: !0,
                onSearch: () => {
                  m(y.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            j && /* @__PURE__ */ e.jsx(w.Item, { name: "organization_id", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              Z,
              {
                placeholder: s("role.allOrganizations", { defaultValue: "All Organizations" }),
                allowClear: !0,
                onChange: () => {
                  m(y.getFieldsValue());
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
              I,
              {
                onClick: () => {
                  m(y.getFieldsValue());
                },
                icon: /* @__PURE__ */ e.jsx(tt, {}),
                children: k("refresh", { defaultValue: "Refresh" })
              }
            ),
            /* @__PURE__ */ e.jsx(Q, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(
              I,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(lt, {}),
                onClick: () => P("/authorization/roles/create"),
                children: s("role.create", { defaultValue: "Create Role" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(K, { children: /* @__PURE__ */ e.jsx(
      We,
      {
        rowKey: "id",
        loading: q,
        dataSource: (A == null ? void 0 : A.data) ?? [],
        columns: _,
        pagination: {
          current: b.current,
          pageSize: b.page_size,
          total: (A == null ? void 0 : A.total) ?? 0,
          onChange: V,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (n) => k("totalItems", { defaultValue: `Total ${n} items`, total: n })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ct,
      {
        roleId: z,
        open: M,
        onClose: () => x(!1)
      }
    )
  ] });
}, vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ut
}, Symbol.toStringTag, { value: "Module" })), { TextArea: ze } = pe, mt = dt(({ css: g }) => ({
  rolePermissionExtra: g`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
  rolePolicyExtra: g`
      position: absolute;
      right: 5px;
      top: 5px;
    `
})), pt = {
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
}, Ve = JSON.stringify({ Statement: [] }, null, 2), ht = [], ft = () => {
  const { message: g } = me.useApp(), { styles: s } = mt(), { hasGlobalPermission: k } = Te(), { t: o } = X("authorization"), { t: c } = X("common"), P = we(), { id: T } = at(), [i] = nt(), G = i.get("cloneFrom") || void 0, y = !!T, { enableMultiOrg: b, currentOrgId: U } = he(), { user: M } = Re(), x = (M == null ? void 0 : M.organizations) ?? ht, [z] = w.useForm(), [F, C] = O([]), [A, q] = O([]), [m, V] = O(!0), [R, p] = O([]), [d, r] = O({}), j = $e({}), [_, n] = O("global"), h = U || void 0, [E, Ee] = O(!1), ne = !b || _ === "organization";
  ye(() => {
    j.current = d;
  }, [d]);
  const { data: ee = [] } = B(async () => N.authorization.listPermissions().then((l) => l.map((t, a) => {
    const f = (t.permissions || []).map((u) => ({
      key: u.id,
      code: u.code.replace(/:/g, "."),
      title: u.name,
      orgPermission: u.org_permission || !1
    }));
    return {
      key: `[group]-${a}`,
      title: t.name,
      code: t.name.replace(/ /g, "_"),
      children: f
    };
  })), {
    onError: () => {
      g.error(o("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }), ve = (l) => l ? l.reduce((t, a) => (!a.toolset_id || !a.tool_name || (t[a.toolset_id] || (t[a.toolset_id] = []), t[a.toolset_id].includes(a.tool_name) || t[a.toolset_id].push(a.tool_name)), t), {}) : {}, { run: te, loading: Pe } = B(
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
      const S = a || j.current || {}, J = {};
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
        g.error(o("role.loadAiToolsetsError", { defaultValue: "Failed to load AI toolsets." })), p([]);
        const a = t == null ? void 0 : t[0];
        r((a == null ? void 0 : a.initialSelection) || {});
      }
    }
  ), { run: fe, loading: Ae } = B(
    async (l) => {
      var ae, ge;
      const { roleId: t, clone: a } = l, f = a === !0, u = await N.authorization.getRole({ id: t });
      Ee(!f && u.role_type === "system");
      const S = ((ae = u.permissions) == null ? void 0 : ae.map((Me) => Me.id)) || [];
      C(S), z.setFieldsValue({ permissions: S });
      const J = u.organization_id || "", D = J ? "organization" : "global";
      n(D);
      const oe = ve(u.ai_tool_permissions || []), ie = D === "organization" && J ? J : b ? "" : U || ((ge = x[0]) == null ? void 0 : ge.id) || "";
      ie ? await te({ organizationId: ie, initialSelection: oe }) : (p([]), r(f ? oe : {})), z.setFieldsValue({
        name: f ? `${u.name} (copy)` : u.name,
        description: u.description,
        role_type: D,
        organization_id: J || void 0,
        policy_document: JSON.stringify(u.policy_document || { Statement: [] }, null, 2)
      });
    },
    {
      manual: !0,
      onError: () => {
        g.error(o("role.detailLoadError", { defaultValue: "Failed to load role details" })), P("/authorization/roles");
      }
    }
  );
  ye(() => {
    if (y && T) {
      fe({ roleId: T });
      return;
    }
    if (G) {
      fe({ roleId: G, clone: !0 });
      return;
    }
    const l = h || (x.length > 0 ? x[0].id : ""), t = b && l ? "organization" : "global";
    n(t), z.setFieldsValue({
      role_type: t,
      organization_id: t === "organization" ? l : void 0,
      policy_document: Ve,
      permissions: []
    }), C([]), r({});
    const a = t === "organization" && l ? l : b ? "" : l;
    a ? te({ organizationId: a, initialSelection: {} }) : p([]);
  }, [G, T, y]);
  const Ie = H(() => _ === "global" ? ee : ee.map((t) => {
    const a = (t.children || []).filter(
      (f) => f.orgPermission === !0
    );
    return {
      ...t,
      children: a
    };
  }).filter((t) => t.children && t.children.length > 0), [ee, _]), Ce = (l) => {
    q(l), V(!1);
  }, Oe = () => {
    const l = ee.map((t) => t.key);
    q(l), V(!0);
  }, ke = () => {
    q([]), V(!1);
  }, Fe = xe((l, t) => {
    r((a) => ({
      ...a,
      [l]: t
    }));
  }, []), De = xe((l, t) => {
    const a = R.find((u) => u.id === l);
    if (!a)
      return;
    const f = (a.tools || []).map((u) => u.name);
    r((u) => ({
      ...u,
      [l]: t ? f : []
    }));
  }, [R]), Ne = (l, t) => {
    if (_ === "organization")
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
  }, Le = H(() => ({
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
  }), [o]), { run: Ge, loading: Ue } = B(
    async (l) => {
      const t = { ...l };
      _ === "global" ? t.policy_document = JSON.parse(l.policy_document ?? "{}") : t.policy_document = { Statement: [] }, t.role_type === "organization" ? t.organization_id = t.organization_id || void 0 : t.organization_id = void 0, delete t.role_type;
      const a = ne ? Object.entries(d).map(([f, u]) => ({
        toolset_id: f,
        tools: Array.from(new Set(u))
      })).filter((f) => f.tools.length > 0) : [];
      t.ai_tool_permissions = a, t.permissions = F.filter((f) => !f.startsWith("[group]-")), y && T ? await N.authorization.updateRole({ id: T }, t) : await N.authorization.createRole(t);
    },
    {
      manual: !0,
      onSuccess: () => {
        g.success(
          y ? o("role.updateSuccess", { defaultValue: "Role updated successfully." }) : o("role.createSuccess", { defaultValue: "Role created successfully." })
        ), P("/authorization/roles");
      },
      onError: (l) => {
        g.error(
          o("role.saveError", {
            error: l instanceof Error ? l.message : `${l}`,
            defaultValue: "Failed to save role.",
            action: y ? c("update", { defaultValue: "Update" }) : c("create", { defaultValue: "Create" })
          })
        );
      }
    }
  ), le = y && E;
  return /* @__PURE__ */ e.jsxs(
    K,
    {
      title: le ? o("role.viewTitle", { defaultValue: "View Role" }) : y ? o("role.editTitle", { defaultValue: "Edit Role" }) : o("role.createTitle", { defaultValue: "Create Role" }),
      loading: Ae,
      children: [
        le && /* @__PURE__ */ e.jsx(
          He,
          {
            type: "info",
            message: o("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }),
            style: { marginBottom: 16 },
            showIcon: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          w,
          {
            form: z,
            layout: "vertical",
            disabled: le,
            initialValues: {
              policy_document: Ve,
              permissions: []
            },
            onFinish: Ge,
            children: [
              /* @__PURE__ */ e.jsx(
                Ke,
                {
                  items: [
                    {
                      key: "basic",
                      label: o("role.basicInfo", { defaultValue: "Basic Information" }),
                      children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                        /* @__PURE__ */ e.jsx(
                          w.Item,
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
                          w.Item,
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
                          w.Item,
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
                              re.Group,
                              {
                                disabled: y || !k("authorization:role:create"),
                                onChange: (l) => {
                                  const t = l.target.value;
                                  if (n(t), t === "global")
                                    z.setFieldsValue({ organization_id: void 0 }), p([]), r({});
                                  else {
                                    const a = h || (x.length > 0 ? x[0].id : "");
                                    z.setFieldsValue({ organization_id: a }), a ? te({
                                      organizationId: a,
                                      initialSelection: j.current
                                    }) : (p([]), r({}));
                                  }
                                  C([]), z.setFieldsValue({ permissions: [] });
                                },
                                children: [
                                  /* @__PURE__ */ e.jsx(re, { value: "global", children: o("role.globalRole", { defaultValue: "Global Role" }) }),
                                  /* @__PURE__ */ e.jsx(re, { value: "organization", children: o("role.organizationRole", { defaultValue: "Organization Role" }) })
                                ]
                              }
                            )
                          }
                        ),
                        _ === "organization" && /* @__PURE__ */ e.jsx(
                          w.Item,
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
                            extra: x.length > 0 ? o("role.organizationHelp", {
                              defaultValue: "Select the organization this role belongs to"
                            }) : o("role.noOrganizationsAvailable", {
                              defaultValue: "No organizations available. Please contact your administrator."
                            }),
                            children: x.length > 0 ? /* @__PURE__ */ e.jsx(
                              Z,
                              {
                                placeholder: o("role.selectOrganization", {
                                  defaultValue: "Select Organization"
                                }),
                                onChange: (l) => {
                                  C([]), z.setFieldsValue({ permissions: [] });
                                  const t = l || "";
                                  t ? te({ organizationId: t, initialSelection: {} }) : (p([]), r({}));
                                },
                                children: x.map((l) => /* @__PURE__ */ e.jsx(Z.Option, { value: l.id, children: l.name }, l.id))
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
                        w.Item,
                        {
                          name: "permissions",
                          rules: [
                            {
                              validator() {
                                if (F.length === 0)
                                  if (_ === "global") {
                                    const l = z.getFieldValue("policy_document");
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
                                  /* @__PURE__ */ e.jsx(I, { type: "link", onClick: Oe, icon: /* @__PURE__ */ e.jsx(ot, {}), children: c("expandAll", { defaultValue: "Expand All" }) }),
                                  /* @__PURE__ */ e.jsx(I, { type: "link", onClick: ke, icon: /* @__PURE__ */ e.jsx(it, {}), children: c("collapseAll", { defaultValue: "Collapse All" }) })
                                ] }),
                                /* @__PURE__ */ e.jsx(
                                  Ye,
                                  {
                                    treeData: Ie,
                                    titleRender: (l) => {
                                      const t = l, a = typeof t.title == "string" ? t.title : String(t.title ?? "");
                                      return /* @__PURE__ */ e.jsx("span", { children: o(`permission.title.${t.code}`, { defaultValue: a }) });
                                    },
                                    checkable: !0,
                                    disabled: le,
                                    expandedKeys: A,
                                    autoExpandParent: m,
                                    onExpand: Ce,
                                    checkedKeys: F,
                                    onCheck: (l) => {
                                      let t = [];
                                      rt(l) ? t = l : st(l, "checked") && (t = l.checked), C(t), z.setFieldsValue({ permissions: t });
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
                      children: /* @__PURE__ */ e.jsx("div", { style: { marginBottom: "24px" }, children: /* @__PURE__ */ e.jsx(ce, { spinning: Pe, children: ne ? R.length > 0 ? /* @__PURE__ */ e.jsx(L, { direction: "vertical", size: "middle", style: { width: "100%" }, children: R.map((l) => {
                        const t = (l.tools || []).map((S) => S.name), a = d[l.id] || [], f = t.length > 0 && a.length === t.length, u = a.length > 0 && a.length < t.length;
                        return /* @__PURE__ */ e.jsx(
                          K,
                          {
                            size: "small",
                            title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                              /* @__PURE__ */ e.jsx(
                                se,
                                {
                                  checked: f,
                                  indeterminate: u,
                                  onChange: (S) => De(l.id, S.target.checked)
                                }
                              ),
                              /* @__PURE__ */ e.jsx("span", { children: l.name })
                            ] }),
                            extra: l.description ? /* @__PURE__ */ e.jsx("span", { children: l.description }) : void 0,
                            children: (l.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(
                              se.Group,
                              {
                                style: { width: "100%" },
                                value: d[l.id] || [],
                                onChange: (S) => Fe(l.id, S),
                                children: /* @__PURE__ */ e.jsx(L, { direction: "vertical", style: { width: "100%" }, children: (l.tools || []).map((S) => /* @__PURE__ */ e.jsx(se, { value: S.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
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
                            defaultValue: "AI tool permissions are only available for organization roles when multi-organization is enabled."
                          })
                        }
                      ) }) })
                    },
                    {
                      key: "policy",
                      label: o("role.policyDocument", { defaultValue: "Policy Document" }),
                      disabled: _ === "organization",
                      forceRender: !0,
                      children: /* @__PURE__ */ e.jsx(
                        w.Item,
                        {
                          name: "policy_document",
                          rules: [
                            {
                              validator: Ne
                            }
                          ],
                          extra: /* @__PURE__ */ e.jsx("span", { className: s.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                            Z,
                            {
                              style: { width: 160 },
                              ...Le,
                              onChange: (l) => {
                                if (typeof l == "string") {
                                  const t = pt[l];
                                  t && z.setFieldValue("policy_document", JSON.stringify(t, null, 2));
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
              /* @__PURE__ */ e.jsx(w.Item, { children: /* @__PURE__ */ e.jsxs(L, { children: [
                /* @__PURE__ */ e.jsx(
                  I,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: Ue,
                    children: y ? c("update", { defaultValue: "Update" }) : c("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  I,
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
  vt as R,
  Pt as a
};
