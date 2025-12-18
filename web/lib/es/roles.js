import { j as e } from "./vendor.js";
import { useRef as ae, useState as f, useEffect as k, useCallback as O, useMemo as Ae } from "react";
import { Space as P, Tag as B, Tooltip as le, Button as V, Popconfirm as Re, Card as K, Row as Pe, Col as te, message as _, Form as x, Tabs as we, Input as ne, Radio as $, Select as N, Tree as Te, Spin as Oe, Checkbox as W, Empty as R } from "antd";
import { UserOutlined as Ce, TeamOutlined as Ie, LockOutlined as ke, EditOutlined as Ne, DeleteOutlined as Fe, ReloadOutlined as De, PlusOutlined as Le, DownOutlined as qe, UpOutlined as Ge } from "@ant-design/icons";
import { f as H, T as Me } from "./components.js";
import { a as S } from "./index.js";
import { useTranslation as F } from "react-i18next";
import { c as re, a as Je } from "./contexts.js";
import { useNavigate as se, useParams as Ue } from "react-router-dom";
import { isArray as Be, has as $e } from "lodash-es";
import { createStyles as We } from "antd-style";
const He = () => {
  const { t: c } = F("authorization"), { t: o } = F("common"), { siteConfig: m } = re(), b = se(), p = ae(null), h = (r) => {
    b(`/authorization/roles/${r}/edit`);
  }, v = async (r) => {
    var a, n;
    try {
      await S.authorization.deleteRole({ id: r }), _.success(c("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), (n = (a = p.current) == null ? void 0 : a.reload) == null || n.call(a);
    } catch (E) {
      _.error(c("role.deleteError", { defaultValue: "Failed to delete role: {{error}}", error: E }));
    }
  }, D = [
    {
      title: c("role.name", { defaultValue: "Role Name" }),
      dataIndex: "name",
      key: "name",
      render: (r) => /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(Ce, {}),
        r
      ] })
    },
    {
      title: c("role.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: c("role.organization", { defaultValue: "Organization" }),
      key: "organization",
      hidden: !(m != null && m.enable_multi_org),
      render: (r, a) => {
        var n;
        return a.organization_id ? /* @__PURE__ */ e.jsx(B, { icon: /* @__PURE__ */ e.jsx(Ie, {}), color: "blue", children: ((n = a.organization) == null ? void 0 : n.name) || a.organization_id }) : /* @__PURE__ */ e.jsx(B, { color: "default", children: c("role.global", { defaultValue: "Global" }) });
      }
    },
    {
      title: c("role.permissionCount", { defaultValue: "Permissions" }),
      key: "permission_count",
      render: (r, a) => {
        var n;
        return /* @__PURE__ */ e.jsxs(B, { color: "blue", children: [
          /* @__PURE__ */ e.jsx(ke, {}),
          " ",
          ((n = a.permissions) == null ? void 0 : n.length) || 0
        ] });
      }
    },
    {
      title: c("role.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (r) => new Date(r).toLocaleString()
    },
    {
      title: o("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (r, a) => /* @__PURE__ */ e.jsxs(P, { size: "small", children: [
        /* @__PURE__ */ e.jsx(H, { permission: "authorization:role:update", children: /* @__PURE__ */ e.jsx(le, { title: c("role.edit", { defaultValue: "Edit Role" }), children: /* @__PURE__ */ e.jsx(
          V,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(Ne, {}),
            onClick: () => h(a.id)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(H, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(le, { title: c("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
          Re,
          {
            title: c("role.deleteConfirm", { defaultValue: "Are you sure you want to delete this role?" }),
            onConfirm: () => v(a.id),
            okText: o("confirm", { defaultValue: "Confirm" }),
            cancelText: o("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              V,
              {
                type: "text",
                size: "small",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(Fe, {})
              }
            )
          }
        ) }) })
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(K, { style: { marginBottom: 16 }, children: [
    /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Pe, { justify: "space-between", align: "middle", gutter: 16, children: [
      /* @__PURE__ */ e.jsx(te, { children: /* @__PURE__ */ e.jsx(P, { children: /* @__PURE__ */ e.jsx(
        V,
        {
          type: "primary",
          onClick: () => {
            var r, a;
            (a = (r = p.current) == null ? void 0 : r.reload) == null || a.call(r);
          },
          icon: /* @__PURE__ */ e.jsx(De, {}),
          children: o("refresh", { defaultValue: "Refresh" })
        }
      ) }) }),
      /* @__PURE__ */ e.jsx(te, { children: /* @__PURE__ */ e.jsx(H, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(
        V,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Le, {}),
          onClick: () => b("/authorization/roles/create"),
          children: c("role.create", { defaultValue: "Create Role" })
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(
      Me,
      {
        request: async ({ page_size: r, current: a }) => S.authorization.listRoles({
          current: a,
          page_size: r
        }),
        columns: D,
        actionRef: p
      }
    )
  ] }) });
}, dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: He
}, Symbol.toStringTag, { value: "Module" })), { TextArea: oe } = ne, Ke = We(({ css: c }) => ({
  rolePermissionExtra: c`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
  rolePolicyExtra: c`
      position: absolute;
      right: 5px;
      top: 5px;
    `
})), Xe = {
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
}, ie = JSON.stringify({ Statement: [] }, null, 2), Ye = () => {
  const { styles: c } = Ke(), { t: o } = F("authorization"), { t: m } = F("common"), b = se(), { id: p } = Ue(), h = !!p, { enableMultiOrg: v, currentOrgId: D } = re(), { user: r } = Je(), a = (r == null ? void 0 : r.organizations) || [], [n] = x.useForm(), [E, w] = f([]), [C, de] = f([]), [ce, L] = f([]), [ue, q] = f(!0), [I, j] = f([]), [T, g] = f({}), G = ae({}), [me, X] = f(!1), [y, M] = f("global"), [J, fe] = f(void 0), [pe, Y] = f(!1), [he, Q] = f(!1);
  k(() => {
    G.current = T;
  }, [T]), k(() => {
    fe(D || void 0);
  }, []);
  const Z = O(async () => {
    try {
      const t = await S.authorization.listPermissions();
      de(
        t.map((l, i) => {
          const d = (l.permissions || []).map((s) => ({
            key: s.id,
            code: s.code.replace(/:/g, "."),
            title: s.name,
            orgPermission: s.org_permission || !1
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
      _.error(o("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }, [o]);
  k(() => {
    Z();
  }, [Z]);
  const A = O(
    async (t, l) => {
      if (!t) {
        j([]), g(l || {});
        return;
      }
      X(!0);
      try {
        const d = ((await S.system.listToolSets(
          { page_size: 1e3, include_tools: !0 },
          { headers: { "X-Scope-OrgID": t } }
        )).data || []).filter((z) => z.status === "enabled");
        j(d);
        const s = l || G.current || {}, u = {};
        d.forEach((z) => {
          const U = s[z.id] || [];
          u[z.id] = U.filter(
            (ve) => (z.tools || []).some((Ee) => Ee.name === ve)
          );
        }), g(u);
      } catch {
        _.error(o("role.loadAiToolsetsError", { defaultValue: "Failed to load AI toolsets." })), j([]), g(l || {});
      } finally {
        X(!1);
      }
    },
    [o]
  ), ge = (t) => t ? t.reduce((l, i) => (!i.toolset_id || !i.tool_name || (l[i.toolset_id] || (l[i.toolset_id] = []), l[i.toolset_id].includes(i.tool_name) || l[i.toolset_id].push(i.tool_name)), l), {}) : {}, ee = O(
    async (t) => {
      var l;
      Y(!0);
      try {
        const i = await S.authorization.getRole({ id: t }), d = ((l = i.permissions) == null ? void 0 : l.map((U) => U.id)) || [];
        w(d), n.setFieldsValue({ permissions: d });
        const s = i.organization_id || "", u = s ? "organization" : "global";
        M(u);
        const z = ge(i.ai_tool_permissions);
        u === "organization" && s ? await A(s, z) : (j([]), g({})), n.setFieldsValue({
          name: i.name,
          description: i.description,
          role_type: u,
          organization_id: s || void 0,
          policy_document: JSON.stringify(i.policy_document || { Statement: [] }, null, 2)
        });
      } catch {
        _.error(o("role.detailLoadError", { defaultValue: "Failed to load role details" })), b("/authorization/roles");
      } finally {
        Y(!1);
      }
    },
    [A, n, b, o]
  );
  k(() => {
    if (h && p) {
      ee(p);
      return;
    }
    const t = J || (a.length > 0 ? a[0].id : ""), l = v && t ? "organization" : "global";
    M(l), n.setFieldsValue({
      role_type: l,
      organization_id: l === "organization" ? t : void 0,
      policy_document: ie,
      permissions: []
    }), w([]), g({}), l === "organization" && t ? A(t, {}) : j([]);
  }, [
    A,
    n,
    p,
    h,
    a,
    J,
    v,
    ee
  ]);
  const ye = Ae(() => y === "global" ? C : C.map((l) => {
    const i = (l.children || []).filter(
      (d) => d.orgPermission === !0
    );
    return {
      ...l,
      children: i
    };
  }).filter((l) => l.children && l.children.length > 0), [C, y]), xe = (t) => {
    L(t), q(!1);
  }, je = () => {
    const t = C.map((l) => l.key);
    L(t), q(!0);
  }, _e = () => {
    L([]), q(!1);
  }, Ve = O((t, l) => {
    g((i) => ({
      ...i,
      [t]: l
    }));
  }, []), be = O((t, l) => {
    const i = I.find((s) => s.id === t);
    if (!i)
      return;
    const d = (i.tools || []).map((s) => s.name);
    g((s) => ({
      ...s,
      [t]: l ? d : []
    }));
  }, [I]), ze = (t, l) => {
    if (y === "organization")
      return Promise.resolve();
    if (!l || l.trim() === "" || l === "{}" || l === '{"Statement":[]}')
      return E.length === 0 ? Promise.reject(
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
  }, Se = async (t) => {
    const l = { ...t };
    try {
      y === "global" ? l.policy_document = JSON.parse(t.policy_document ?? "{}") : l.policy_document = { Statement: [] }, l.role_type === "organization" ? l.organization_id = l.organization_id || void 0 : l.organization_id = void 0, delete l.role_type;
      const i = y === "organization" ? Object.entries(T).map(([d, s]) => ({
        toolset_id: d,
        tools: Array.from(new Set(s))
      })).filter((d) => d.tools.length > 0) : [];
      l.ai_tool_permissions = i, l.permissions = E.filter((d) => !d.startsWith("[group]-")), Q(!0), h && p ? (await S.authorization.updateRole({ id: p }, l), _.success(o("role.updateSuccess", { defaultValue: "Role updated successfully." }))) : (await S.authorization.createRole(l), _.success(o("role.createSuccess", { defaultValue: "Role created successfully." }))), b("/authorization/roles");
    } catch {
      _.error(
        o("role.saveError", {
          defaultValue: "Failed to save role.",
          action: h ? m("update", { defaultValue: "Update" }) : m("create", { defaultValue: "Create" })
        })
      );
    } finally {
      Q(!1);
    }
  };
  return /* @__PURE__ */ e.jsx(
    K,
    {
      title: h ? o("role.editTitle", { defaultValue: "Edit Role" }) : o("role.createTitle", { defaultValue: "Create Role" }),
      loading: pe,
      children: /* @__PURE__ */ e.jsxs(
        x,
        {
          form: n,
          layout: "vertical",
          initialValues: {
            policy_document: ie,
            permissions: []
          },
          onFinish: Se,
          children: [
            /* @__PURE__ */ e.jsx(
              we,
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
                          children: /* @__PURE__ */ e.jsx(ne, { placeholder: o("role.namePlaceholder", { defaultValue: "Enter role name" }) })
                        }
                      ),
                      /* @__PURE__ */ e.jsx(
                        x.Item,
                        {
                          label: o("role.description", { defaultValue: "Description" }),
                          name: "description",
                          children: /* @__PURE__ */ e.jsx(
                            oe,
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
                          hidden: !v,
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
                            $.Group,
                            {
                              disabled: h,
                              onChange: (t) => {
                                const l = t.target.value;
                                if (M(l), l === "global")
                                  n.setFieldsValue({ organization_id: void 0 }), j([]), g({});
                                else {
                                  const i = J || (a.length > 0 ? a[0].id : "");
                                  n.setFieldsValue({ organization_id: i }), i ? A(i, G.current) : (j([]), g({}));
                                }
                                w([]), n.setFieldsValue({ permissions: [] });
                              },
                              children: [
                                /* @__PURE__ */ e.jsx($, { value: "global", children: o("role.globalRole", { defaultValue: "Global Role" }) }),
                                /* @__PURE__ */ e.jsx($, { value: "organization", children: o("role.organizationRole", { defaultValue: "Organization Role" }) })
                              ]
                            }
                          )
                        }
                      ),
                      y === "organization" && /* @__PURE__ */ e.jsx(
                        x.Item,
                        {
                          hidden: !v,
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
                          extra: a.length > 0 ? o("role.organizationHelp", {
                            defaultValue: "Select the organization this role belongs to"
                          }) : o("role.noOrganizationsAvailable", {
                            defaultValue: "No organizations available. Please contact your administrator."
                          }),
                          children: a.length > 0 ? /* @__PURE__ */ e.jsx(
                            N,
                            {
                              placeholder: o("role.selectOrganization", {
                                defaultValue: "Select Organization"
                              }),
                              onChange: (t) => {
                                w([]), n.setFieldsValue({ permissions: [] });
                                const l = t || "";
                                l ? A(l, {}) : (j([]), g({}));
                              },
                              children: a.map((t) => /* @__PURE__ */ e.jsx(N.Option, { value: t.id, children: t.name }, t.id))
                            }
                          ) : /* @__PURE__ */ e.jsx(
                            N,
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
                              if (E.length === 0)
                                if (y === "global") {
                                  const t = n.getFieldValue("policy_document");
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
                              /* @__PURE__ */ e.jsxs("span", { className: c.rolePermissionExtra, children: [
                                /* @__PURE__ */ e.jsx(V, { type: "link", onClick: je, icon: /* @__PURE__ */ e.jsx(qe, {}), children: m("expandAll", { defaultValue: "Expand All" }) }),
                                /* @__PURE__ */ e.jsx(V, { type: "link", onClick: _e, icon: /* @__PURE__ */ e.jsx(Ge, {}), children: m("collapseAll", { defaultValue: "Collapse All" }) })
                              ] }),
                              /* @__PURE__ */ e.jsx(
                                Te,
                                {
                                  treeData: ye,
                                  titleRender: (t) => {
                                    const l = t, i = typeof l.title == "string" ? l.title : String(l.title ?? "");
                                    return /* @__PURE__ */ e.jsx("span", { children: o(`permission.title.${l.code}`, { defaultValue: i }) });
                                  },
                                  checkable: !0,
                                  expandedKeys: ce,
                                  autoExpandParent: ue,
                                  onExpand: xe,
                                  checkedKeys: E,
                                  onCheck: (t) => {
                                    let l = [];
                                    Be(t) ? l = t : $e(t, "checked") && (l = t.checked), w(l), n.setFieldsValue({ permissions: l });
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
                    children: /* @__PURE__ */ e.jsx(Oe, { spinning: me, children: y === "organization" ? I.length > 0 ? /* @__PURE__ */ e.jsx(P, { direction: "vertical", size: "middle", style: { width: "100%" }, children: I.map((t) => {
                      const l = (t.tools || []).map((u) => u.name), i = T[t.id] || [], d = l.length > 0 && i.length === l.length, s = i.length > 0 && i.length < l.length;
                      return /* @__PURE__ */ e.jsx(
                        K,
                        {
                          size: "small",
                          title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                            /* @__PURE__ */ e.jsx(
                              W,
                              {
                                checked: d,
                                indeterminate: s,
                                onChange: (u) => be(t.id, u.target.checked)
                              }
                            ),
                            /* @__PURE__ */ e.jsx("span", { children: t.name })
                          ] }),
                          extra: t.description ? /* @__PURE__ */ e.jsx("span", { children: t.description }) : void 0,
                          children: (t.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(
                            W.Group,
                            {
                              style: { width: "100%" },
                              value: T[t.id] || [],
                              onChange: (u) => Ve(t.id, u),
                              children: /* @__PURE__ */ e.jsx(P, { direction: "vertical", style: { width: "100%" }, children: (t.tools || []).map((u) => /* @__PURE__ */ e.jsx(W, { value: u.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
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
                            R,
                            {
                              image: R.PRESENTED_IMAGE_SIMPLE,
                              description: o("role.aiToolsetNoTools", {
                                defaultValue: "No tools available in this toolset."
                              })
                            }
                          )
                        },
                        t.id
                      );
                    }) }) : /* @__PURE__ */ e.jsx(
                      R,
                      {
                        image: R.PRESENTED_IMAGE_SIMPLE,
                        description: o("role.aiToolsetsEmpty", {
                          defaultValue: "No AI toolsets available for this organization."
                        })
                      }
                    ) : /* @__PURE__ */ e.jsx(
                      R,
                      {
                        image: R.PRESENTED_IMAGE_SIMPLE,
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
                            validator: ze
                          }
                        ],
                        extra: /* @__PURE__ */ e.jsx("span", { className: c.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                          N,
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
                                const l = Xe[t];
                                l && n.setFieldValue("policy_document", JSON.stringify(l, null, 2));
                              }
                            }
                          }
                        ) }),
                        children: /* @__PURE__ */ e.jsx(
                          oe,
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
                V,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: he,
                  children: h ? m("update", { defaultValue: "Update" }) : m("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                V,
                {
                  onClick: () => b("/authorization/roles"),
                  children: m("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, cl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ye
}, Symbol.toStringTag, { value: "Module" }));
export {
  dl as R,
  cl as a
};
