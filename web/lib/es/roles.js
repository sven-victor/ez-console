import { j as e } from "./vendor.js";
import { useRef as se, useState as f, useEffect as L, useCallback as C, useMemo as Oe } from "react";
import { Space as P, Tag as I, Tooltip as H, Button as j, Popconfirm as Ce, Card as Q, Row as Ie, Col as ie, message as z, Form as x, Alert as ke, Tabs as Fe, Input as de, Radio as K, Select as M, Tree as Ne, Spin as De, Checkbox as X, Empty as w } from "antd";
import { UserOutlined as Le, TeamOutlined as Me, LockOutlined as ae, EditOutlined as qe, DeleteOutlined as Ge, ReloadOutlined as Ue, PlusOutlined as Je, DownOutlined as Be, UpOutlined as $e } from "@ant-design/icons";
import { f as Y, i as We } from "./components.js";
import { a as R } from "./index.js";
import { useTranslation as q } from "react-i18next";
import { c as ce, b as He, a as Ke } from "./contexts.js";
import { useNavigate as ue, useParams as Xe } from "react-router-dom";
import { isArray as Ye, has as Qe } from "lodash-es";
import { createStyles as Ze } from "antd-style";
const el = () => {
  const { t: r } = q("authorization"), { t: v } = q("common"), { siteConfig: o } = ce(), h = ue(), _ = se(null), V = (s) => {
    h(`/authorization/roles/${s}/edit`);
  }, p = async (s) => {
    var a, d;
    try {
      await R.authorization.deleteRole({ id: s }), z.success(r("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), (d = (a = _.current) == null ? void 0 : a.reload) == null || d.call(a);
    } catch (m) {
      z.error(r("role.deleteError", { defaultValue: "Failed to delete role: {{error}}", error: m }));
    }
  }, E = [
    {
      title: r("role.name", { defaultValue: "Role Name" }),
      dataIndex: "name",
      key: "name",
      render: (s) => /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(Le, {}),
        s
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
      render: (s, a) => a.role_type === "system" ? /* @__PURE__ */ e.jsx(I, { color: "orange", children: r("role.typeSystem", { defaultValue: "System" }) }) : /* @__PURE__ */ e.jsx(I, { color: "default", children: r("role.typeUser", { defaultValue: "User" }) })
    },
    {
      title: r("role.organization", { defaultValue: "Organization" }),
      key: "organization",
      hidden: !(o != null && o.enable_multi_org),
      render: (s, a) => {
        var d;
        return a.organization_id ? /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(Me, {}), color: "blue", children: ((d = a.organization) == null ? void 0 : d.name) || a.organization_id }) : /* @__PURE__ */ e.jsx(I, { color: "default", children: r("role.global", { defaultValue: "Global" }) });
      }
    },
    {
      title: r("role.permissionCount", { defaultValue: "Permissions" }),
      key: "permission_count",
      render: (s, a) => {
        var d;
        return /* @__PURE__ */ e.jsxs(I, { color: "blue", children: [
          /* @__PURE__ */ e.jsx(ae, {}),
          " ",
          ((d = a.permissions) == null ? void 0 : d.length) || 0
        ] });
      }
    },
    {
      title: r("role.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (s) => new Date(s).toLocaleString()
    },
    {
      title: v("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (s, a) => {
        const d = a.role_type === "system";
        return /* @__PURE__ */ e.jsxs(P, { size: "small", children: [
          !d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(Y, { permission: "authorization:role:update", children: /* @__PURE__ */ e.jsx(H, { title: r("role.edit", { defaultValue: "Edit Role" }), children: /* @__PURE__ */ e.jsx(
              j,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(qe, {}),
                onClick: () => V(a.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(Y, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(H, { title: r("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
              Ce,
              {
                title: r("role.deleteConfirm", { defaultValue: "Are you sure you want to delete this role?" }),
                onConfirm: () => p(a.id),
                okText: v("confirm", { defaultValue: "Confirm" }),
                cancelText: v("cancel", { defaultValue: "Cancel" }),
                children: /* @__PURE__ */ e.jsx(
                  j,
                  {
                    type: "text",
                    size: "small",
                    danger: !0,
                    icon: /* @__PURE__ */ e.jsx(Ge, {})
                  }
                )
              }
            ) }) })
          ] }),
          d && /* @__PURE__ */ e.jsx(H, { title: r("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }), children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(j, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(ae, {}), disabled: !0 }) }) })
        ] });
      }
    }
  ];
  return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(Q, { style: { marginBottom: 16 }, children: [
    /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Ie, { justify: "space-between", align: "middle", gutter: 16, children: [
      /* @__PURE__ */ e.jsx(ie, { children: /* @__PURE__ */ e.jsx(P, { children: /* @__PURE__ */ e.jsx(
        j,
        {
          type: "primary",
          onClick: () => {
            var s, a;
            (a = (s = _.current) == null ? void 0 : s.reload) == null || a.call(s);
          },
          icon: /* @__PURE__ */ e.jsx(Ue, {}),
          children: v("refresh", { defaultValue: "Refresh" })
        }
      ) }) }),
      /* @__PURE__ */ e.jsx(ie, { children: /* @__PURE__ */ e.jsx(Y, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(
        j,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Je, {}),
          onClick: () => h("/authorization/roles/create"),
          children: r("role.create", { defaultValue: "Create Role" })
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(
      We,
      {
        request: async ({ page_size: s, current: a }) => R.authorization.listRoles({
          current: a,
          page_size: s
        }),
        columns: E,
        actionRef: _
      }
    )
  ] }) });
}, hl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: el
}, Symbol.toStringTag, { value: "Module" })), { TextArea: re } = de, ll = Ze(({ css: r }) => ({
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
})), tl = {
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
}, ne = JSON.stringify({ Statement: [] }, null, 2), ol = () => {
  const { styles: r } = ll(), { hasGlobalPermission: v } = He(), { t: o } = q("authorization"), { t: h } = q("common"), _ = ue(), { id: V } = Xe(), p = !!V, { enableMultiOrg: E, currentOrgId: s } = ce(), { user: a } = Ke(), d = (a == null ? void 0 : a.organizations) || [], [m] = x.useForm(), [k, T] = f([]), [F, me] = f([]), [fe, G] = f([]), [pe, U] = f(!0), [N, b] = f([]), [O, g] = f({}), J = se({}), [he, Z] = f(!1), [y, B] = f("global"), [$, ge] = f(void 0), [ye, ee] = f(!1), [xe, le] = f(!1), [je, _e] = f(!1);
  L(() => {
    J.current = O;
  }, [O]), L(() => {
    ge(s || void 0);
  }, []);
  const te = C(async () => {
    try {
      const t = await R.authorization.listPermissions();
      me(
        t.map((l, i) => {
          const c = (l.permissions || []).map((n) => ({
            key: n.id,
            code: n.code.replace(/:/g, "."),
            title: n.name,
            orgPermission: n.org_permission || !1
          }));
          return {
            key: `[group]-${i}`,
            title: l.name,
            code: l.name.replace(/ /g, "_"),
            children: c
          };
        })
      );
    } catch {
      z.error(o("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }, [o]);
  L(() => {
    te();
  }, [te]);
  const A = C(
    async (t, l) => {
      if (!t) {
        b([]), g(l || {});
        return;
      }
      Z(!0);
      try {
        const c = ((await R.system.listToolSets(
          { page_size: 1e3, include_tools: !0 },
          { headers: { "X-Scope-OrgID": t } }
        )).data || []).filter((S) => S.status === "enabled");
        b(c);
        const n = l || J.current || {}, u = {};
        c.forEach((S) => {
          const W = n[S.id] || [];
          u[S.id] = W.filter(
            (Pe) => (S.tools || []).some((Te) => Te.name === Pe)
          );
        }), g(u);
      } catch {
        z.error(o("role.loadAiToolsetsError", { defaultValue: "Failed to load AI toolsets." })), b([]), g(l || {});
      } finally {
        Z(!1);
      }
    },
    [o]
  ), Ve = (t) => t ? t.reduce((l, i) => (!i.toolset_id || !i.tool_name || (l[i.toolset_id] || (l[i.toolset_id] = []), l[i.toolset_id].includes(i.tool_name) || l[i.toolset_id].push(i.tool_name)), l), {}) : {}, oe = C(
    async (t) => {
      var l;
      ee(!0);
      try {
        const i = await R.authorization.getRole({ id: t });
        _e(i.role_type === "system");
        const c = ((l = i.permissions) == null ? void 0 : l.map((W) => W.id)) || [];
        T(c), m.setFieldsValue({ permissions: c });
        const n = i.organization_id || "", u = n ? "organization" : "global";
        B(u);
        const S = Ve(i.ai_tool_permissions);
        u === "organization" && n ? await A(n, S) : (b([]), g({})), m.setFieldsValue({
          name: i.name,
          description: i.description,
          role_type: u,
          organization_id: n || void 0,
          policy_document: JSON.stringify(i.policy_document || { Statement: [] }, null, 2)
        });
      } catch {
        z.error(o("role.detailLoadError", { defaultValue: "Failed to load role details" })), _("/authorization/roles");
      } finally {
        ee(!1);
      }
    },
    [A, m, _, o]
  );
  L(() => {
    if (p && V) {
      oe(V);
      return;
    }
    const t = $ || (d.length > 0 ? d[0].id : ""), l = E && t ? "organization" : "global";
    B(l), m.setFieldsValue({
      role_type: l,
      organization_id: l === "organization" ? t : void 0,
      policy_document: ne,
      permissions: []
    }), T([]), g({}), l === "organization" && t ? A(t, {}) : b([]);
  }, [
    A,
    m,
    V,
    p,
    d,
    $,
    E,
    oe
  ]);
  const be = Oe(() => y === "global" ? F : F.map((l) => {
    const i = (l.children || []).filter(
      (c) => c.orgPermission === !0
    );
    return {
      ...l,
      children: i
    };
  }).filter((l) => l.children && l.children.length > 0), [F, y]), ze = (t) => {
    G(t), U(!1);
  }, Se = () => {
    const t = F.map((l) => l.key);
    G(t), U(!0);
  }, Re = () => {
    G([]), U(!1);
  }, ve = C((t, l) => {
    g((i) => ({
      ...i,
      [t]: l
    }));
  }, []), Ee = C((t, l) => {
    const i = N.find((n) => n.id === t);
    if (!i)
      return;
    const c = (i.tools || []).map((n) => n.name);
    g((n) => ({
      ...n,
      [t]: l ? c : []
    }));
  }, [N]), Ae = (t, l) => {
    if (y === "organization")
      return Promise.resolve();
    if (!l || l.trim() === "" || l === "{}" || l === '{"Statement":[]}')
      return k.length === 0 ? Promise.reject(
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
  }, we = async (t) => {
    const l = { ...t };
    try {
      y === "global" ? l.policy_document = JSON.parse(t.policy_document ?? "{}") : l.policy_document = { Statement: [] }, l.role_type === "organization" ? l.organization_id = l.organization_id || void 0 : l.organization_id = void 0, delete l.role_type;
      const i = y === "organization" ? Object.entries(O).map(([c, n]) => ({
        toolset_id: c,
        tools: Array.from(new Set(n))
      })).filter((c) => c.tools.length > 0) : [];
      l.ai_tool_permissions = i, l.permissions = k.filter((c) => !c.startsWith("[group]-")), le(!0), p && V ? (await R.authorization.updateRole({ id: V }, l), z.success(o("role.updateSuccess", { defaultValue: "Role updated successfully." }))) : (await R.authorization.createRole(l), z.success(o("role.createSuccess", { defaultValue: "Role created successfully." }))), _("/authorization/roles");
    } catch (i) {
      z.error(
        o("role.saveError", {
          error: i instanceof Error ? i.message : "Unknown error",
          defaultValue: "Failed to save role.",
          action: p ? h("update", { defaultValue: "Update" }) : h("create", { defaultValue: "Create" })
        })
      );
    } finally {
      le(!1);
    }
  }, D = p && je;
  return /* @__PURE__ */ e.jsxs(
    Q,
    {
      title: D ? o("role.viewTitle", { defaultValue: "View Role" }) : p ? o("role.editTitle", { defaultValue: "Edit Role" }) : o("role.createTitle", { defaultValue: "Create Role" }),
      loading: ye,
      children: [
        D && /* @__PURE__ */ e.jsx(
          ke,
          {
            type: "info",
            message: o("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }),
            style: { marginBottom: 16 },
            showIcon: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          x,
          {
            form: m,
            layout: "vertical",
            disabled: D,
            initialValues: {
              policy_document: ne,
              permissions: []
            },
            onFinish: we,
            children: [
              /* @__PURE__ */ e.jsx(
                Fe,
                {
                  items: [
                    {
                      key: "basic",
                      label: o("role.basicInfo", { defaultValue: "Basic Information" }),
                      children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                        /* @__PURE__ */ e.jsx(
                          x.Item,
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
                            children: /* @__PURE__ */ e.jsx(de, { placeholder: o("role.namePlaceholder", { defaultValue: "Enter role name" }) })
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          x.Item,
                          {
                            label: o("role.description", { defaultValue: "Description" }),
                            name: "description",
                            children: /* @__PURE__ */ e.jsx(
                              re,
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
                          x.Item,
                          {
                            label: o("role.roleType", { defaultValue: "Role Type" }),
                            name: "role_type",
                            hidden: !E,
                            rules: [
                              {
                                required: !0,
                                message: o("role.roleTypeRequired", {
                                  defaultValue: "Please select role type."
                                })
                              }
                            ],
                            extra: p ? o("role.roleTypeCannotChange", {
                              defaultValue: "Role type cannot be changed after creation."
                            }) : "",
                            children: /* @__PURE__ */ e.jsxs(
                              K.Group,
                              {
                                disabled: p || !v("authorization:role:create"),
                                onChange: (t) => {
                                  const l = t.target.value;
                                  if (B(l), l === "global")
                                    m.setFieldsValue({ organization_id: void 0 }), b([]), g({});
                                  else {
                                    const i = $ || (d.length > 0 ? d[0].id : "");
                                    m.setFieldsValue({ organization_id: i }), i ? A(i, J.current) : (b([]), g({}));
                                  }
                                  T([]), m.setFieldsValue({ permissions: [] });
                                },
                                children: [
                                  /* @__PURE__ */ e.jsx(K, { value: "global", children: o("role.globalRole", { defaultValue: "Global Role" }) }),
                                  /* @__PURE__ */ e.jsx(K, { value: "organization", children: o("role.organizationRole", { defaultValue: "Organization Role" }) })
                                ]
                              }
                            )
                          }
                        ),
                        y === "organization" && /* @__PURE__ */ e.jsx(
                          x.Item,
                          {
                            hidden: !E,
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
                            extra: d.length > 0 ? o("role.organizationHelp", {
                              defaultValue: "Select the organization this role belongs to"
                            }) : o("role.noOrganizationsAvailable", {
                              defaultValue: "No organizations available. Please contact your administrator."
                            }),
                            children: d.length > 0 ? /* @__PURE__ */ e.jsx(
                              M,
                              {
                                placeholder: o("role.selectOrganization", {
                                  defaultValue: "Select Organization"
                                }),
                                onChange: (t) => {
                                  T([]), m.setFieldsValue({ permissions: [] });
                                  const l = t || "";
                                  l ? A(l, {}) : (b([]), g({}));
                                },
                                children: d.map((t) => /* @__PURE__ */ e.jsx(M.Option, { value: t.id, children: t.name }, t.id))
                              }
                            ) : /* @__PURE__ */ e.jsx(
                              M,
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
                        x.Item,
                        {
                          name: "permissions",
                          rules: [
                            {
                              validator() {
                                if (k.length === 0)
                                  if (y === "global") {
                                    const t = m.getFieldValue("policy_document");
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
                                  /* @__PURE__ */ e.jsx(j, { type: "link", onClick: Se, icon: /* @__PURE__ */ e.jsx(Be, {}), children: h("expandAll", { defaultValue: "Expand All" }) }),
                                  /* @__PURE__ */ e.jsx(j, { type: "link", onClick: Re, icon: /* @__PURE__ */ e.jsx($e, {}), children: h("collapseAll", { defaultValue: "Collapse All" }) })
                                ] }),
                                /* @__PURE__ */ e.jsx(
                                  Ne,
                                  {
                                    treeData: be,
                                    titleRender: (t) => {
                                      const l = t, i = typeof l.title == "string" ? l.title : String(l.title ?? "");
                                      return /* @__PURE__ */ e.jsx("span", { children: o(`permission.title.${l.code}`, { defaultValue: i }) });
                                    },
                                    checkable: !0,
                                    disabled: D,
                                    expandedKeys: fe,
                                    autoExpandParent: pe,
                                    onExpand: ze,
                                    checkedKeys: k,
                                    onCheck: (t) => {
                                      let l = [];
                                      Ye(t) ? l = t : Qe(t, "checked") && (l = t.checked), T(l), m.setFieldsValue({ permissions: l });
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
                      disabled: y === "global",
                      children: /* @__PURE__ */ e.jsx(De, { spinning: he, children: y === "organization" ? N.length > 0 ? /* @__PURE__ */ e.jsx(P, { direction: "vertical", size: "middle", style: { width: "100%" }, children: N.map((t) => {
                        const l = (t.tools || []).map((u) => u.name), i = O[t.id] || [], c = l.length > 0 && i.length === l.length, n = i.length > 0 && i.length < l.length;
                        return /* @__PURE__ */ e.jsx(
                          Q,
                          {
                            size: "small",
                            title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                              /* @__PURE__ */ e.jsx(
                                X,
                                {
                                  checked: c,
                                  indeterminate: n,
                                  onChange: (u) => Ee(t.id, u.target.checked)
                                }
                              ),
                              /* @__PURE__ */ e.jsx("span", { children: t.name })
                            ] }),
                            extra: t.description ? /* @__PURE__ */ e.jsx("span", { children: t.description }) : void 0,
                            children: (t.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(
                              X.Group,
                              {
                                style: { width: "100%" },
                                value: O[t.id] || [],
                                onChange: (u) => ve(t.id, u),
                                children: /* @__PURE__ */ e.jsx(P, { direction: "vertical", style: { width: "100%" }, children: (t.tools || []).map((u) => /* @__PURE__ */ e.jsx(X, { value: u.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                                  /* @__PURE__ */ e.jsx("div", { children: u.name }),
                                  u.description && /* @__PURE__ */ e.jsx(
                                    "div",
                                    {
                                      style: {
                                        color: "rgba(0,0,0,0.45)",
                                        fontSize: 12
                                      },
                                      children: u.description
                                    }
                                  )
                                ] }) }, u.name)) })
                              }
                            ) : /* @__PURE__ */ e.jsx(
                              w,
                              {
                                image: w.PRESENTED_IMAGE_SIMPLE,
                                description: o("role.aiToolsetNoTools", {
                                  defaultValue: "No tools available in this toolset."
                                })
                              }
                            )
                          },
                          t.id
                        );
                      }) }) : /* @__PURE__ */ e.jsx(
                        w,
                        {
                          image: w.PRESENTED_IMAGE_SIMPLE,
                          description: o("role.aiToolsetsEmpty", {
                            defaultValue: "No AI toolsets available for this organization."
                          })
                        }
                      ) : /* @__PURE__ */ e.jsx(
                        w,
                        {
                          image: w.PRESENTED_IMAGE_SIMPLE,
                          description: o("role.aiPermissionsGlobalInfo", {
                            defaultValue: "AI tool permissions are only available for organization roles."
                          })
                        }
                      ) })
                    },
                    {
                      key: "policy",
                      label: o("role.policyDocument", { defaultValue: "Policy Document" }),
                      disabled: y === "organization",
                      children: /* @__PURE__ */ e.jsx(
                        x.Item,
                        {
                          name: "policy_document",
                          rules: [
                            {
                              validator: Ae
                            }
                          ],
                          extra: /* @__PURE__ */ e.jsx("span", { className: r.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                            M,
                            {
                              style: { width: 160 },
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
                              ],
                              onChange: (t) => {
                                if (typeof t == "string") {
                                  const l = tl[t];
                                  l && m.setFieldValue("policy_document", JSON.stringify(l, null, 2));
                                }
                              }
                            }
                          ) }),
                          children: /* @__PURE__ */ e.jsx(
                            re,
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
              /* @__PURE__ */ e.jsx(x.Item, { children: /* @__PURE__ */ e.jsxs(P, { children: [
                /* @__PURE__ */ e.jsx(
                  j,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: xe,
                    children: p ? h("update", { defaultValue: "Update" }) : h("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  j,
                  {
                    onClick: () => _("/authorization/roles"),
                    children: h("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      ]
    }
  );
}, gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ol
}, Symbol.toStringTag, { value: "Module" }));
export {
  hl as R,
  gl as a
};
