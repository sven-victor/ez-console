import { j as e } from "./vendor.js";
import { useRef as ie, useState as f, useEffect as O, useCallback as k, useMemo as Se } from "react";
import { Space as P, Tag as J, Tooltip as Z, Button as b, Popconfirm as Ae, Card as $, Row as Re, Col as ee, message as j, Form as x, Tabs as Pe, Input as re, Radio as U, Select as C, Tree as we, Spin as Te, Checkbox as le, Empty as R } from "antd";
import { UserOutlined as Ie, TeamOutlined as Oe, LockOutlined as ke, EditOutlined as Ce, DeleteOutlined as De, ReloadOutlined as Fe, PlusOutlined as Ne, DownOutlined as Le, UpOutlined as qe } from "@ant-design/icons";
import { h as B, T as Ge } from "./components.js";
import { a as v } from "./index.js";
import { useTranslation as D } from "react-i18next";
import { b as ne, u as Me } from "./contexts.js";
import { useNavigate as se, useParams as Je } from "react-router-dom";
import te from "lodash";
import { createStyles as Ue } from "antd-style";
const Be = () => {
  const { t: n } = D("authorization"), { t: o } = D("common"), { siteConfig: m } = ne(), V = se(), p = ie(null), h = (r) => {
    V(`/authorization/roles/${r}/edit`);
  }, d = async (r) => {
    var i, c;
    try {
      await v.authorization.deleteRole({ id: r }), j.success(n("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), (c = (i = p.current) == null ? void 0 : i.reload) == null || c.call(i);
    } catch (z) {
      j.error(n("role.deleteError", { defaultValue: "Failed to delete role: {{error}}", error: z }));
    }
  }, w = [
    {
      title: n("role.name", { defaultValue: "Role Name" }),
      dataIndex: "name",
      key: "name",
      render: (r) => /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(Ie, {}),
        r
      ] })
    },
    {
      title: n("role.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: n("role.organization", { defaultValue: "Organization" }),
      key: "organization",
      hidden: !(m != null && m.enable_multi_org),
      render: (r, i) => {
        var c;
        return i.organization_id ? /* @__PURE__ */ e.jsx(J, { icon: /* @__PURE__ */ e.jsx(Oe, {}), color: "blue", children: ((c = i.organization) == null ? void 0 : c.name) || i.organization_id }) : /* @__PURE__ */ e.jsx(J, { color: "default", children: n("role.global", { defaultValue: "Global" }) });
      }
    },
    {
      title: n("role.permissionCount", { defaultValue: "Permissions" }),
      key: "permission_count",
      render: (r, i) => {
        var c;
        return /* @__PURE__ */ e.jsxs(J, { color: "blue", children: [
          /* @__PURE__ */ e.jsx(ke, {}),
          " ",
          ((c = i.permissions) == null ? void 0 : c.length) || 0
        ] });
      }
    },
    {
      title: n("role.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (r) => new Date(r).toLocaleString()
    },
    {
      title: o("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (r, i) => /* @__PURE__ */ e.jsxs(P, { size: "small", children: [
        /* @__PURE__ */ e.jsx(B, { permission: "authorization:role:update", children: /* @__PURE__ */ e.jsx(Z, { title: n("role.edit", { defaultValue: "Edit Role" }), children: /* @__PURE__ */ e.jsx(
          b,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(Ce, {}),
            onClick: () => h(i.id)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(B, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(Z, { title: n("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
          Ae,
          {
            title: n("role.deleteConfirm", { defaultValue: "Are you sure you want to delete this role?" }),
            onConfirm: () => d(i.id),
            okText: o("confirm", { defaultValue: "Confirm" }),
            cancelText: o("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              b,
              {
                type: "text",
                size: "small",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(De, {})
              }
            )
          }
        ) }) })
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs($, { style: { marginBottom: 16 }, children: [
    /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Re, { justify: "space-between", align: "middle", gutter: 16, children: [
      /* @__PURE__ */ e.jsx(ee, { children: /* @__PURE__ */ e.jsx(P, { children: /* @__PURE__ */ e.jsx(
        b,
        {
          type: "primary",
          onClick: () => {
            var r, i;
            (i = (r = p.current) == null ? void 0 : r.reload) == null || i.call(r);
          },
          icon: /* @__PURE__ */ e.jsx(Fe, {}),
          children: o("refresh", { defaultValue: "Refresh" })
        }
      ) }) }),
      /* @__PURE__ */ e.jsx(ee, { children: /* @__PURE__ */ e.jsx(B, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(
        b,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          onClick: () => V("/authorization/roles/create"),
          children: n("role.create", { defaultValue: "Create Role" })
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(
      Ge,
      {
        request: async ({ page_size: r, current: i }) => v.authorization.listRoles({
          current: i,
          page_size: r
        }),
        columns: w,
        actionRef: p
      }
    )
  ] }) });
}, rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Be
}, Symbol.toStringTag, { value: "Module" })), { TextArea: oe } = re, $e = Ue(({ css: n }) => ({
  rolePermissionExtra: n`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
  rolePolicyExtra: n`
      position: absolute;
      right: 5px;
      top: 5px;
    `
})), We = {
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
}, ae = JSON.stringify({ Statement: [] }, null, 2), He = () => {
  const { styles: n } = $e(), { t: o } = D("authorization"), { t: m } = D("common"), V = se(), { id: p } = Je(), h = !!p, { siteConfig: d } = ne(), { user: w } = Me(), r = (w == null ? void 0 : w.organizations) || [], [i] = x.useForm(), [c, z] = f([]), [T, de] = f([]), [ce, F] = f([]), [ue, N] = f(!0), [W, _] = f([]), [I, y] = f({}), L = ie({}), [me, H] = f(!1), [g, q] = f("global"), [G, fe] = f(void 0), [pe, K] = f(!1), [he, X] = f(!1);
  O(() => {
    L.current = I;
  }, [I]), O(() => {
    fe(localStorage.getItem("orgID") || void 0);
  }, []);
  const Y = k(async () => {
    try {
      const t = await v.authorization.listPermissions();
      de(
        t.map((l, a) => {
          const s = (l.permissions || []).map((u) => ({
            key: u.id,
            code: u.code.replace(/:/g, "."),
            title: u.name,
            orgPermission: u.org_permission || !1
          }));
          return {
            key: `[group]-${a}`,
            title: l.name,
            code: l.name.replace(/ /g, "_"),
            children: s
          };
        })
      );
    } catch {
      j.error(o("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }, [o]);
  O(() => {
    Y();
  }, [Y]);
  const S = k(
    async (t, l) => {
      if (!t) {
        _([]), y(l || {});
        return;
      }
      H(!0);
      try {
        const s = ((await v.system.listToolSets(
          { page_size: 1e3, include_tools: !0 },
          { headers: { "X-Scope-OrgID": t } }
        )).data || []).filter((E) => E.status === "enabled");
        _(s);
        const u = l || L.current || {}, A = {};
        s.forEach((E) => {
          const M = u[E.id] || [];
          A[E.id] = M.filter(
            (Ee) => (E.tools || []).some((ve) => ve.name === Ee)
          );
        }), y(A);
      } catch {
        j.error(o("role.loadAiToolsetsError", { defaultValue: "Failed to load AI toolsets." })), _([]), y(l || {});
      } finally {
        H(!1);
      }
    },
    [o]
  ), ge = (t) => t ? t.reduce((l, a) => (!a.toolset_id || !a.tool_name || (l[a.toolset_id] || (l[a.toolset_id] = []), l[a.toolset_id].includes(a.tool_name) || l[a.toolset_id].push(a.tool_name)), l), {}) : {}, Q = k(
    async (t) => {
      var l;
      K(!0);
      try {
        const a = await v.authorization.getRole({ id: t }), s = ((l = a.permissions) == null ? void 0 : l.map((M) => M.id)) || [];
        z(s), i.setFieldsValue({ permissions: s });
        const u = a.organization_id || "", A = u ? "organization" : "global";
        q(A);
        const E = ge(a.ai_tool_permissions);
        A === "organization" && u ? await S(u, E) : (_([]), y({})), i.setFieldsValue({
          name: a.name,
          description: a.description,
          role_type: A,
          organization_id: u || void 0,
          policy_document: JSON.stringify(a.policy_document || { Statement: [] }, null, 2)
        });
      } catch {
        j.error(o("role.detailLoadError", { defaultValue: "Failed to load role details" })), V("/authorization/roles");
      } finally {
        K(!1);
      }
    },
    [S, i, V, o]
  );
  O(() => {
    if (h && p) {
      Q(p);
      return;
    }
    const t = G || (r.length > 0 ? r[0].id : ""), l = d != null && d.enable_multi_org && t ? "organization" : "global";
    q(l), i.setFieldsValue({
      role_type: l,
      organization_id: l === "organization" ? t : void 0,
      policy_document: ae,
      permissions: []
    }), z([]), y({}), l === "organization" && t ? S(t, {}) : _([]);
  }, [
    S,
    i,
    p,
    h,
    r,
    G,
    d == null ? void 0 : d.enable_multi_org,
    Q
  ]);
  const ye = Se(() => g === "global" ? T : T.map((l) => {
    const a = (l.children || []).filter(
      (s) => s.orgPermission === !0
    );
    return {
      ...l,
      children: a
    };
  }).filter((l) => l.children && l.children.length > 0), [T, g]), xe = (t) => {
    F(t), N(!1);
  }, _e = () => {
    const t = T.map((l) => l.key);
    F(t), N(!0);
  }, je = () => {
    F([]), N(!1);
  }, be = k((t, l) => {
    y((a) => ({
      ...a,
      [t]: l
    }));
  }, []), Ve = (t, l) => {
    if (g === "organization")
      return Promise.resolve();
    if (!l || l.trim() === "" || l === "{}" || l === '{"Statement":[]}')
      return c.length === 0 ? Promise.reject(
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
  }, ze = async (t) => {
    const l = { ...t };
    try {
      g === "global" ? l.policy_document = JSON.parse(t.policy_document ?? "{}") : l.policy_document = { Statement: [] }, l.role_type === "organization" ? l.organization_id = l.organization_id || void 0 : l.organization_id = void 0, delete l.role_type;
      const a = g === "organization" ? Object.entries(I).map(([s, u]) => ({
        toolset_id: s,
        tools: Array.from(new Set(u))
      })).filter((s) => s.tools.length > 0) : [];
      l.ai_tool_permissions = a, l.permissions = c.filter((s) => !s.startsWith("[group]-")), X(!0), h && p ? (await v.authorization.updateRole({ id: p }, l), j.success(o("role.updateSuccess", { defaultValue: "Role updated successfully." }))) : (await v.authorization.createRole(l), j.success(o("role.createSuccess", { defaultValue: "Role created successfully." }))), V("/authorization/roles");
    } catch {
      j.error(
        o("role.saveError", {
          defaultValue: "Failed to save role.",
          action: h ? m("update", { defaultValue: "Update" }) : m("create", { defaultValue: "Create" })
        })
      );
    } finally {
      X(!1);
    }
  };
  return /* @__PURE__ */ e.jsx(
    $,
    {
      title: h ? o("role.editTitle", { defaultValue: "Edit Role" }) : o("role.createTitle", { defaultValue: "Create Role" }),
      loading: pe,
      children: /* @__PURE__ */ e.jsxs(
        x,
        {
          form: i,
          layout: "vertical",
          initialValues: {
            policy_document: ae,
            permissions: []
          },
          onFinish: ze,
          children: [
            /* @__PURE__ */ e.jsx(
              Pe,
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
                          children: /* @__PURE__ */ e.jsx(re, { placeholder: o("role.namePlaceholder", { defaultValue: "Enter role name" }) })
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
                          hidden: !(d != null && d.enable_multi_org),
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
                            U.Group,
                            {
                              disabled: h,
                              onChange: (t) => {
                                const l = t.target.value;
                                if (q(l), l === "global")
                                  i.setFieldsValue({ organization_id: void 0 }), _([]), y({});
                                else {
                                  const a = G || (r.length > 0 ? r[0].id : "");
                                  i.setFieldsValue({ organization_id: a }), a ? S(a, L.current) : (_([]), y({}));
                                }
                                z([]), i.setFieldsValue({ permissions: [] });
                              },
                              children: [
                                /* @__PURE__ */ e.jsx(U, { value: "global", children: o("role.globalRole", { defaultValue: "Global Role" }) }),
                                /* @__PURE__ */ e.jsx(U, { value: "organization", children: o("role.organizationRole", { defaultValue: "Organization Role" }) })
                              ]
                            }
                          )
                        }
                      ),
                      g === "organization" && /* @__PURE__ */ e.jsx(
                        x.Item,
                        {
                          hidden: !(d != null && d.enable_multi_org),
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
                          extra: r.length > 0 ? o("role.organizationHelp", {
                            defaultValue: "Select the organization this role belongs to"
                          }) : o("role.noOrganizationsAvailable", {
                            defaultValue: "No organizations available. Please contact your administrator."
                          }),
                          children: r.length > 0 ? /* @__PURE__ */ e.jsx(
                            C,
                            {
                              placeholder: o("role.selectOrganization", {
                                defaultValue: "Select Organization"
                              }),
                              onChange: (t) => {
                                z([]), i.setFieldsValue({ permissions: [] });
                                const l = t || "";
                                l ? S(l, {}) : (_([]), y({}));
                              },
                              children: r.map((t) => /* @__PURE__ */ e.jsx(C.Option, { value: t.id, children: t.name }, t.id))
                            }
                          ) : /* @__PURE__ */ e.jsx(
                            C,
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
                              if (c.length === 0)
                                if (g === "global") {
                                  const t = i.getFieldValue("policy_document");
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
                              /* @__PURE__ */ e.jsxs("span", { className: n.rolePermissionExtra, children: [
                                /* @__PURE__ */ e.jsx(b, { type: "link", onClick: _e, icon: /* @__PURE__ */ e.jsx(Le, {}), children: m("expandAll", { defaultValue: "Expand All" }) }),
                                /* @__PURE__ */ e.jsx(b, { type: "link", onClick: je, icon: /* @__PURE__ */ e.jsx(qe, {}), children: m("collapseAll", { defaultValue: "Collapse All" }) })
                              ] }),
                              /* @__PURE__ */ e.jsx(
                                we,
                                {
                                  treeData: ye,
                                  titleRender: (t) => {
                                    const l = t, a = typeof l.title == "string" ? l.title : String(l.title ?? "");
                                    return /* @__PURE__ */ e.jsx("span", { children: o(`permission.title.${l.code}`, { defaultValue: a }) });
                                  },
                                  checkable: !0,
                                  expandedKeys: ce,
                                  autoExpandParent: ue,
                                  onExpand: xe,
                                  checkedKeys: c,
                                  onCheck: (t) => {
                                    let l = [];
                                    te.isArray(t) ? l = t : te.has(t, "checked") && (l = t.checked), z(l), i.setFieldsValue({ permissions: l });
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
                    disabled: g === "global",
                    children: /* @__PURE__ */ e.jsx(Te, { spinning: me, children: g === "organization" ? W.length > 0 ? /* @__PURE__ */ e.jsx(P, { direction: "vertical", size: "middle", style: { width: "100%" }, children: W.map((t) => /* @__PURE__ */ e.jsx(
                      $,
                      {
                        size: "small",
                        title: t.name,
                        extra: t.description ? /* @__PURE__ */ e.jsx("span", { children: t.description }) : void 0,
                        children: (t.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(
                          le.Group,
                          {
                            style: { width: "100%" },
                            value: I[t.id] || [],
                            onChange: (l) => be(t.id, l),
                            children: /* @__PURE__ */ e.jsx(P, { direction: "vertical", style: { width: "100%" }, children: (t.tools || []).map((l) => /* @__PURE__ */ e.jsx(le, { value: l.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                              /* @__PURE__ */ e.jsx("div", { children: l.name }),
                              l.description && /* @__PURE__ */ e.jsx(
                                "div",
                                {
                                  style: {
                                    color: "rgba(0,0,0,0.45)",
                                    fontSize: 12
                                  },
                                  children: l.description
                                }
                              )
                            ] }) }, l.name)) })
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
                    )) }) : /* @__PURE__ */ e.jsx(
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
                    disabled: g === "organization",
                    children: /* @__PURE__ */ e.jsx(
                      x.Item,
                      {
                        name: "policy_document",
                        rules: [
                          {
                            validator: Ve
                          }
                        ],
                        extra: /* @__PURE__ */ e.jsx("span", { className: n.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                          C,
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
                                const l = We[t];
                                l && i.setFieldValue("policy_document", JSON.stringify(l, null, 2));
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
                b,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: he,
                  children: h ? m("update", { defaultValue: "Update" }) : m("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                b,
                {
                  onClick: () => V("/authorization/roles"),
                  children: m("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: He
}, Symbol.toStringTag, { value: "Module" }));
export {
  rl as R,
  nl as a
};
