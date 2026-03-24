import { j as e } from "./vendor.js";
import { useRef as pe, useState as f, useEffect as $, useCallback as k, useMemo as se } from "react";
import { Space as A, Tag as F, Tooltip as N, Button as g, Popconfirm as Ne, Card as oe, Row as De, Col as de, message as R, Form as V, Alert as Le, Tabs as Me, Input as he, Radio as le, Select as B, Tree as qe, Spin as Ge, Checkbox as te, Empty as P } from "antd";
import { UserOutlined as Ue, TeamOutlined as Je, LockOutlined as ce, EditOutlined as $e, CopyOutlined as ue, DeleteOutlined as Be, ReloadOutlined as We, PlusOutlined as He, DownOutlined as Ke, UpOutlined as Xe } from "@ant-design/icons";
import { f as D, i as Ye } from "./components.js";
import { a as v } from "./index.js";
import { useTranslation as W } from "react-i18next";
import { c as ge, b as Qe, a as Ze } from "./contexts.js";
import { useNavigate as ye, useParams as el, useSearchParams as ll } from "react-router-dom";
import { isArray as tl, has as ol } from "lodash-es";
import { createStyles as il } from "antd-style";
const al = () => {
  const { t: s } = W("authorization"), { t: w } = W("common"), { siteConfig: o } = ge(), p = ye(), b = pe(null), z = (r) => {
    p(`/authorization/roles/${r}/edit`);
  }, L = (r) => {
    p(`/authorization/roles/create?cloneFrom=${encodeURIComponent(r)}`);
  }, T = async (r) => {
    var n, u;
    try {
      await v.authorization.deleteRole({ id: r }), R.success(s("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), (u = (n = b.current) == null ? void 0 : n.reload) == null || u.call(n);
    } catch (y) {
      R.error(s("role.deleteError", { defaultValue: "Failed to delete role: {{error}}", error: y }));
    }
  }, h = [
    {
      title: s("role.name", { defaultValue: "Role Name" }),
      dataIndex: "name",
      key: "name",
      render: (r) => /* @__PURE__ */ e.jsxs(A, { children: [
        /* @__PURE__ */ e.jsx(Ue, {}),
        r
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
      render: (r, n) => n.role_type === "system" ? /* @__PURE__ */ e.jsx(F, { color: "orange", children: s("role.typeSystem", { defaultValue: "System" }) }) : /* @__PURE__ */ e.jsx(F, { color: "default", children: s("role.typeUser", { defaultValue: "User" }) })
    },
    {
      title: s("role.organization", { defaultValue: "Organization" }),
      key: "organization",
      hidden: !(o != null && o.enable_multi_org),
      render: (r, n) => {
        var u;
        return n.organization_id ? /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(Je, {}), color: "blue", children: ((u = n.organization) == null ? void 0 : u.name) || n.organization_id }) : /* @__PURE__ */ e.jsx(F, { color: "default", children: s("role.global", { defaultValue: "Global" }) });
      }
    },
    {
      title: s("role.permissionCount", { defaultValue: "Permissions" }),
      key: "permission_count",
      render: (r, n) => {
        var u;
        return /* @__PURE__ */ e.jsxs(F, { color: "blue", children: [
          /* @__PURE__ */ e.jsx(ce, {}),
          " ",
          ((u = n.permissions) == null ? void 0 : u.length) || 0
        ] });
      }
    },
    {
      title: s("role.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (r) => new Date(r).toLocaleString()
    },
    {
      title: w("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (r, n) => {
        const u = n.role_type === "system";
        return /* @__PURE__ */ e.jsxs(A, { size: "small", children: [
          !u && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(D, { permission: "authorization:role:update", children: /* @__PURE__ */ e.jsx(N, { title: s("role.edit", { defaultValue: "Edit Role" }), children: /* @__PURE__ */ e.jsx(
              g,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx($e, {}),
                onClick: () => z(n.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(D, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(N, { title: s("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              g,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(ue, {}),
                onClick: () => L(n.id)
              }
            ) }) }),
            /* @__PURE__ */ e.jsx(D, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(N, { title: s("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
              Ne,
              {
                title: s("role.deleteConfirm", { defaultValue: "Are you sure you want to delete this role?" }),
                onConfirm: () => T(n.id),
                okText: w("confirm", { defaultValue: "Confirm" }),
                cancelText: w("cancel", { defaultValue: "Cancel" }),
                children: /* @__PURE__ */ e.jsx(
                  g,
                  {
                    type: "text",
                    size: "small",
                    danger: !0,
                    icon: /* @__PURE__ */ e.jsx(Be, {})
                  }
                )
              }
            ) }) })
          ] }),
          u && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(N, { title: s("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }), children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(g, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(ce, {}), disabled: !0 }) }) }),
            /* @__PURE__ */ e.jsx(D, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(N, { title: s("role.cloneTooltip", { defaultValue: "Clone role to create page with prefilled form" }), children: /* @__PURE__ */ e.jsx(
              g,
              {
                type: "text",
                size: "small",
                icon: /* @__PURE__ */ e.jsx(ue, {}),
                onClick: () => L(n.id)
              }
            ) }) })
          ] })
        ] });
      }
    }
  ];
  return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(oe, { style: { marginBottom: 16 }, children: [
    /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(De, { justify: "space-between", align: "middle", gutter: 16, children: [
      /* @__PURE__ */ e.jsx(de, { children: /* @__PURE__ */ e.jsx(A, { children: /* @__PURE__ */ e.jsx(
        g,
        {
          type: "primary",
          onClick: () => {
            var r, n;
            (n = (r = b.current) == null ? void 0 : r.reload) == null || n.call(r);
          },
          icon: /* @__PURE__ */ e.jsx(We, {}),
          children: w("refresh", { defaultValue: "Refresh" })
        }
      ) }) }),
      /* @__PURE__ */ e.jsx(de, { children: /* @__PURE__ */ e.jsx(D, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(
        g,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(He, {}),
          onClick: () => p("/authorization/roles/create"),
          children: s("role.create", { defaultValue: "Create Role" })
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(
      Ye,
      {
        request: async ({ page_size: r, current: n }) => v.authorization.listRoles({
          current: n,
          page_size: r
        }),
        columns: h,
        actionRef: b
      }
    )
  ] }) });
}, _l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: al
}, Symbol.toStringTag, { value: "Module" })), { TextArea: me } = he, rl = il(({ css: s }) => ({
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
})), nl = {
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
}, fe = JSON.stringify({ Statement: [] }, null, 2), sl = () => {
  const { styles: s } = rl(), { hasGlobalPermission: w } = Qe(), { t: o } = W("authorization"), { t: p } = W("common"), b = ye(), { id: z } = el(), [L] = ll(), T = L.get("cloneFrom") || void 0, h = !!z, { enableMultiOrg: r, currentOrgId: n } = ge(), { user: u } = Ze(), y = (u == null ? void 0 : u.organizations) || [], [m] = V.useForm(), [M, C] = f([]), [q, xe] = f([]), [je, H] = f([]), [_e, K] = f(!0), [G, S] = f([]), [O, x] = f({}), X = pe({}), [Ve, ie] = f(!1), [j, Y] = f("global"), [Q, be] = f(void 0), [ze, ae] = f(!1), [Se, re] = f(!1), [Re, ve] = f(!1);
  $(() => {
    X.current = O;
  }, [O]), $(() => {
    be(n || void 0);
  }, []);
  const ne = k(async () => {
    try {
      const t = await v.authorization.listPermissions();
      xe(
        t.map((l, i) => {
          const d = (l.permissions || []).map((a) => ({
            key: a.id,
            code: a.code.replace(/:/g, "."),
            title: a.name,
            orgPermission: a.org_permission || !1
          }));
          return {
            key: `[group]-${i}`,
            title: l.name,
            code: l.name.replace(/ /g, "_"),
            children: d
          };
        })
      );
    } catch {
      R.error(o("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }, [o]);
  $(() => {
    ne();
  }, [ne]);
  const E = k(
    async (t, l) => {
      if (!t) {
        S([]), x(l || {});
        return;
      }
      ie(!0);
      try {
        const d = ((await v.system.listToolSets(
          { page_size: 1e3, include_tools: !0 },
          { headers: { "X-Scope-OrgID": t } }
        )).data || []).filter((_) => _.status === "enabled");
        S(d);
        const a = l || X.current || {}, c = {};
        d.forEach((_) => {
          const I = a[_.id] || [];
          c[_.id] = I.filter(
            (J) => (_.tools || []).some((ee) => ee.name === J)
          );
        }), x(c);
      } catch {
        R.error(o("role.loadAiToolsetsError", { defaultValue: "Failed to load AI toolsets." })), S([]), x(l || {});
      } finally {
        ie(!1);
      }
    },
    [o]
  ), we = (t) => t ? t.reduce((l, i) => (!i.toolset_id || !i.tool_name || (l[i.toolset_id] || (l[i.toolset_id] = []), l[i.toolset_id].includes(i.tool_name) || l[i.toolset_id].push(i.tool_name)), l), {}) : {}, Z = k(
    async (t, l) => {
      var d;
      ae(!0);
      const i = (l == null ? void 0 : l.clone) === !0;
      try {
        const a = await v.authorization.getRole({ id: t });
        ve(!i && a.role_type === "system");
        const c = ((d = a.permissions) == null ? void 0 : d.map((ee) => ee.id)) || [];
        C(c), m.setFieldsValue({ permissions: c });
        const _ = a.organization_id || "", I = _ ? "organization" : "global";
        Y(I);
        const J = we(a.ai_tool_permissions || []);
        I === "organization" && _ ? await E(_, J) : (S([]), x(i ? J : {})), m.setFieldsValue({
          name: i ? `${a.name} (copy)` : a.name,
          description: a.description,
          role_type: I,
          organization_id: _ || void 0,
          policy_document: JSON.stringify(a.policy_document || { Statement: [] }, null, 2)
        });
      } catch {
        R.error(o("role.detailLoadError", { defaultValue: "Failed to load role details" })), b("/authorization/roles");
      } finally {
        ae(!1);
      }
    },
    [E, m, b, o]
  );
  $(() => {
    if (h && z) {
      Z(z);
      return;
    }
    if (T) {
      Z(T, { clone: !0 });
      return;
    }
    const t = Q || (y.length > 0 ? y[0].id : ""), l = r && t ? "organization" : "global";
    Y(l), m.setFieldsValue({
      role_type: l,
      organization_id: l === "organization" ? t : void 0,
      policy_document: fe,
      permissions: []
    }), C([]), x({}), l === "organization" && t ? E(t, {}) : S([]);
  }, [
    T,
    E,
    m,
    z,
    h,
    y,
    Q,
    r,
    Z
  ]);
  const Ee = se(() => j === "global" ? q : q.map((l) => {
    const i = (l.children || []).filter(
      (d) => d.orgPermission === !0
    );
    return {
      ...l,
      children: i
    };
  }).filter((l) => l.children && l.children.length > 0), [q, j]), Pe = (t) => {
    H(t), K(!1);
  }, Ae = () => {
    const t = q.map((l) => l.key);
    H(t), K(!0);
  }, Te = () => {
    H([]), K(!1);
  }, Ce = k((t, l) => {
    x((i) => ({
      ...i,
      [t]: l
    }));
  }, []), Oe = k((t, l) => {
    const i = G.find((a) => a.id === t);
    if (!i)
      return;
    const d = (i.tools || []).map((a) => a.name);
    x((a) => ({
      ...a,
      [t]: l ? d : []
    }));
  }, [G]), Ie = (t, l) => {
    if (j === "organization")
      return Promise.resolve();
    if (!l || l.trim() === "" || l === "{}" || l === '{"Statement":[]}')
      return M.length === 0 ? Promise.reject(
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
  }, ke = se(() => ({
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
  }), [o]), Fe = async (t) => {
    const l = { ...t };
    try {
      j === "global" ? l.policy_document = JSON.parse(t.policy_document ?? "{}") : l.policy_document = { Statement: [] }, l.role_type === "organization" ? l.organization_id = l.organization_id || void 0 : l.organization_id = void 0, delete l.role_type;
      const i = j === "organization" ? Object.entries(O).map(([d, a]) => ({
        toolset_id: d,
        tools: Array.from(new Set(a))
      })).filter((d) => d.tools.length > 0) : [];
      l.ai_tool_permissions = i, l.permissions = M.filter((d) => !d.startsWith("[group]-")), re(!0), h && z ? (await v.authorization.updateRole({ id: z }, l), R.success(o("role.updateSuccess", { defaultValue: "Role updated successfully." }))) : (await v.authorization.createRole(l), R.success(o("role.createSuccess", { defaultValue: "Role created successfully." }))), b("/authorization/roles");
    } catch (i) {
      R.error(
        o("role.saveError", {
          error: i instanceof Error ? i.message : "Unknown error",
          defaultValue: "Failed to save role.",
          action: h ? p("update", { defaultValue: "Update" }) : p("create", { defaultValue: "Create" })
        })
      );
    } finally {
      re(!1);
    }
  }, U = h && Re;
  return /* @__PURE__ */ e.jsxs(
    oe,
    {
      title: U ? o("role.viewTitle", { defaultValue: "View Role" }) : h ? o("role.editTitle", { defaultValue: "Edit Role" }) : o("role.createTitle", { defaultValue: "Create Role" }),
      loading: ze,
      children: [
        U && /* @__PURE__ */ e.jsx(
          Le,
          {
            type: "info",
            message: o("role.systemRoleCannotModify", { defaultValue: "System roles cannot be modified." }),
            style: { marginBottom: 16 },
            showIcon: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          V,
          {
            form: m,
            layout: "vertical",
            disabled: U,
            initialValues: {
              policy_document: fe,
              permissions: []
            },
            onFinish: Fe,
            children: [
              /* @__PURE__ */ e.jsx(
                Me,
                {
                  items: [
                    {
                      key: "basic",
                      label: o("role.basicInfo", { defaultValue: "Basic Information" }),
                      children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                        /* @__PURE__ */ e.jsx(
                          V.Item,
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
                          V.Item,
                          {
                            label: o("role.description", { defaultValue: "Description" }),
                            name: "description",
                            children: /* @__PURE__ */ e.jsx(
                              me,
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
                          V.Item,
                          {
                            label: o("role.roleType", { defaultValue: "Role Type" }),
                            name: "role_type",
                            hidden: !r,
                            rules: [
                              {
                                required: !0,
                                message: o("role.roleTypeRequired", {
                                  defaultValue: "Please select role type."
                                })
                              }
                            ],
                            extra: h ? o("role.roleTypeCannotChange", {
                              defaultValue: "Role type cannot be changed after creation."
                            }) : "",
                            children: /* @__PURE__ */ e.jsxs(
                              le.Group,
                              {
                                disabled: h || !w("authorization:role:create"),
                                onChange: (t) => {
                                  const l = t.target.value;
                                  if (Y(l), l === "global")
                                    m.setFieldsValue({ organization_id: void 0 }), S([]), x({});
                                  else {
                                    const i = Q || (y.length > 0 ? y[0].id : "");
                                    m.setFieldsValue({ organization_id: i }), i ? E(i, X.current) : (S([]), x({}));
                                  }
                                  C([]), m.setFieldsValue({ permissions: [] });
                                },
                                children: [
                                  /* @__PURE__ */ e.jsx(le, { value: "global", children: o("role.globalRole", { defaultValue: "Global Role" }) }),
                                  /* @__PURE__ */ e.jsx(le, { value: "organization", children: o("role.organizationRole", { defaultValue: "Organization Role" }) })
                                ]
                              }
                            )
                          }
                        ),
                        j === "organization" && /* @__PURE__ */ e.jsx(
                          V.Item,
                          {
                            hidden: !r,
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
                            extra: y.length > 0 ? o("role.organizationHelp", {
                              defaultValue: "Select the organization this role belongs to"
                            }) : o("role.noOrganizationsAvailable", {
                              defaultValue: "No organizations available. Please contact your administrator."
                            }),
                            children: y.length > 0 ? /* @__PURE__ */ e.jsx(
                              B,
                              {
                                placeholder: o("role.selectOrganization", {
                                  defaultValue: "Select Organization"
                                }),
                                onChange: (t) => {
                                  C([]), m.setFieldsValue({ permissions: [] });
                                  const l = t || "";
                                  l ? E(l, {}) : (S([]), x({}));
                                },
                                children: y.map((t) => /* @__PURE__ */ e.jsx(B.Option, { value: t.id, children: t.name }, t.id))
                              }
                            ) : /* @__PURE__ */ e.jsx(
                              B,
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
                        V.Item,
                        {
                          name: "permissions",
                          rules: [
                            {
                              validator() {
                                if (M.length === 0)
                                  if (j === "global") {
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
                                /* @__PURE__ */ e.jsxs("span", { className: s.rolePermissionExtra, children: [
                                  /* @__PURE__ */ e.jsx(g, { type: "link", onClick: Ae, icon: /* @__PURE__ */ e.jsx(Ke, {}), children: p("expandAll", { defaultValue: "Expand All" }) }),
                                  /* @__PURE__ */ e.jsx(g, { type: "link", onClick: Te, icon: /* @__PURE__ */ e.jsx(Xe, {}), children: p("collapseAll", { defaultValue: "Collapse All" }) })
                                ] }),
                                /* @__PURE__ */ e.jsx(
                                  qe,
                                  {
                                    treeData: Ee,
                                    titleRender: (t) => {
                                      const l = t, i = typeof l.title == "string" ? l.title : String(l.title ?? "");
                                      return /* @__PURE__ */ e.jsx("span", { children: o(`permission.title.${l.code}`, { defaultValue: i }) });
                                    },
                                    checkable: !0,
                                    disabled: U,
                                    expandedKeys: je,
                                    autoExpandParent: _e,
                                    onExpand: Pe,
                                    checkedKeys: M,
                                    onCheck: (t) => {
                                      let l = [];
                                      tl(t) ? l = t : ol(t, "checked") && (l = t.checked), C(l), m.setFieldsValue({ permissions: l });
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
                      disabled: j === "global",
                      children: /* @__PURE__ */ e.jsx(Ge, { spinning: Ve, children: j === "organization" ? G.length > 0 ? /* @__PURE__ */ e.jsx(A, { direction: "vertical", size: "middle", style: { width: "100%" }, children: G.map((t) => {
                        const l = (t.tools || []).map((c) => c.name), i = O[t.id] || [], d = l.length > 0 && i.length === l.length, a = i.length > 0 && i.length < l.length;
                        return /* @__PURE__ */ e.jsx(
                          oe,
                          {
                            size: "small",
                            title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                              /* @__PURE__ */ e.jsx(
                                te,
                                {
                                  checked: d,
                                  indeterminate: a,
                                  onChange: (c) => Oe(t.id, c.target.checked)
                                }
                              ),
                              /* @__PURE__ */ e.jsx("span", { children: t.name })
                            ] }),
                            extra: t.description ? /* @__PURE__ */ e.jsx("span", { children: t.description }) : void 0,
                            children: (t.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(
                              te.Group,
                              {
                                style: { width: "100%" },
                                value: O[t.id] || [],
                                onChange: (c) => Ce(t.id, c),
                                children: /* @__PURE__ */ e.jsx(A, { direction: "vertical", style: { width: "100%" }, children: (t.tools || []).map((c) => /* @__PURE__ */ e.jsx(te, { value: c.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                                  /* @__PURE__ */ e.jsx("div", { children: c.name }),
                                  c.description && /* @__PURE__ */ e.jsx(
                                    "div",
                                    {
                                      style: {
                                        color: "rgba(0,0,0,0.45)",
                                        fontSize: 12
                                      },
                                      children: c.description
                                    }
                                  )
                                ] }) }, c.name)) })
                              }
                            ) : /* @__PURE__ */ e.jsx(
                              P,
                              {
                                image: P.PRESENTED_IMAGE_SIMPLE,
                                description: o("role.aiToolsetNoTools", {
                                  defaultValue: "No tools available in this toolset."
                                })
                              }
                            )
                          },
                          t.id
                        );
                      }) }) : /* @__PURE__ */ e.jsx(
                        P,
                        {
                          image: P.PRESENTED_IMAGE_SIMPLE,
                          description: o("role.aiToolsetsEmpty", {
                            defaultValue: "No AI toolsets available for this organization."
                          })
                        }
                      ) : /* @__PURE__ */ e.jsx(
                        P,
                        {
                          image: P.PRESENTED_IMAGE_SIMPLE,
                          description: o("role.aiPermissionsGlobalInfo", {
                            defaultValue: "AI tool permissions are only available for organization roles."
                          })
                        }
                      ) })
                    },
                    {
                      key: "policy",
                      label: o("role.policyDocument", { defaultValue: "Policy Document" }),
                      disabled: j === "organization",
                      children: /* @__PURE__ */ e.jsx(
                        V.Item,
                        {
                          name: "policy_document",
                          rules: [
                            {
                              validator: Ie
                            }
                          ],
                          extra: /* @__PURE__ */ e.jsx("span", { className: s.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                            B,
                            {
                              style: { width: 160 },
                              ...ke,
                              onChange: (t) => {
                                if (typeof t == "string") {
                                  const l = nl[t];
                                  l && m.setFieldValue("policy_document", JSON.stringify(l, null, 2));
                                }
                              }
                            }
                          ) }),
                          children: /* @__PURE__ */ e.jsx(
                            me,
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
              /* @__PURE__ */ e.jsx(V.Item, { children: /* @__PURE__ */ e.jsxs(A, { children: [
                /* @__PURE__ */ e.jsx(
                  g,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: Se,
                    children: h ? p("update", { defaultValue: "Update" }) : p("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  g,
                  {
                    onClick: () => b("/authorization/roles"),
                    children: p("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      ]
    }
  );
}, Vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sl
}, Symbol.toStringTag, { value: "Module" }));
export {
  _l as R,
  Vl as a
};
