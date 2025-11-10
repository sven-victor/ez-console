import { j as e } from "./vendor.js";
import { useRef as re, useState as m, useEffect as C, useCallback as I, useMemo as Re } from "react";
import { Space as P, Tag as U, Tooltip as ee, Button as _, Popconfirm as Se, Card as W, Row as Pe, Col as le, message as j, Form as y, Tabs as we, Input as ne, Radio as B, Select as k, Tree as Te, Spin as Oe, Checkbox as te, Empty as S } from "antd";
import { UserOutlined as Ce, TeamOutlined as Ie, LockOutlined as ke, EditOutlined as Fe, DeleteOutlined as De, ReloadOutlined as Ne, PlusOutlined as Le, DownOutlined as qe, UpOutlined as Ge } from "@ant-design/icons";
import { h as $, T as Me } from "./components.js";
import { a as z } from "./index.js";
import { useTranslation as F } from "react-i18next";
import { b as se, u as Je } from "./contexts.js";
import { useNavigate as de, useParams as Ue } from "react-router-dom";
import oe from "lodash";
import { createStyles as Be } from "antd-style";
const $e = () => {
  const { t: s } = F("authorization"), { t: o } = F("common"), { siteConfig: u } = se(), b = de(), f = re(null), p = (n) => {
    b(`/authorization/roles/${n}/edit`);
  }, E = async (n) => {
    var a, r;
    try {
      await z.authorization.deleteRole({ id: n }), j.success(s("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), (r = (a = f.current) == null ? void 0 : a.reload) == null || r.call(a);
    } catch (v) {
      j.error(s("role.deleteError", { defaultValue: "Failed to delete role: {{error}}", error: v }));
    }
  }, D = [
    {
      title: s("role.name", { defaultValue: "Role Name" }),
      dataIndex: "name",
      key: "name",
      render: (n) => /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(Ce, {}),
        n
      ] })
    },
    {
      title: s("role.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: s("role.organization", { defaultValue: "Organization" }),
      key: "organization",
      hidden: !(u != null && u.enable_multi_org),
      render: (n, a) => {
        var r;
        return a.organization_id ? /* @__PURE__ */ e.jsx(U, { icon: /* @__PURE__ */ e.jsx(Ie, {}), color: "blue", children: ((r = a.organization) == null ? void 0 : r.name) || a.organization_id }) : /* @__PURE__ */ e.jsx(U, { color: "default", children: s("role.global", { defaultValue: "Global" }) });
      }
    },
    {
      title: s("role.permissionCount", { defaultValue: "Permissions" }),
      key: "permission_count",
      render: (n, a) => {
        var r;
        return /* @__PURE__ */ e.jsxs(U, { color: "blue", children: [
          /* @__PURE__ */ e.jsx(ke, {}),
          " ",
          ((r = a.permissions) == null ? void 0 : r.length) || 0
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
      title: o("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (n, a) => /* @__PURE__ */ e.jsxs(P, { size: "small", children: [
        /* @__PURE__ */ e.jsx($, { permission: "authorization:role:update", children: /* @__PURE__ */ e.jsx(ee, { title: s("role.edit", { defaultValue: "Edit Role" }), children: /* @__PURE__ */ e.jsx(
          _,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(Fe, {}),
            onClick: () => p(a.id)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx($, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(ee, { title: s("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
          Se,
          {
            title: s("role.deleteConfirm", { defaultValue: "Are you sure you want to delete this role?" }),
            onConfirm: () => E(a.id),
            okText: o("confirm", { defaultValue: "Confirm" }),
            cancelText: o("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              _,
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
  return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(W, { style: { marginBottom: 16 }, children: [
    /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Pe, { justify: "space-between", align: "middle", gutter: 16, children: [
      /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx(P, { children: /* @__PURE__ */ e.jsx(
        _,
        {
          type: "primary",
          onClick: () => {
            var n, a;
            (a = (n = f.current) == null ? void 0 : n.reload) == null || a.call(n);
          },
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          children: o("refresh", { defaultValue: "Refresh" })
        }
      ) }) }),
      /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx($, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(
        _,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Le, {}),
          onClick: () => b("/authorization/roles/create"),
          children: s("role.create", { defaultValue: "Create Role" })
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(
      Me,
      {
        request: async ({ page_size: n, current: a }) => z.authorization.listRoles({
          current: a,
          page_size: n
        }),
        columns: D,
        actionRef: f
      }
    )
  ] }) });
}, nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $e
}, Symbol.toStringTag, { value: "Module" })), { TextArea: ie } = ne, We = Be(({ css: s }) => ({
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
})), He = {
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
}, ae = JSON.stringify({ Statement: [] }, null, 2), Ke = () => {
  const { styles: s } = We(), { t: o } = F("authorization"), { t: u } = F("common"), b = de(), { id: f } = Ue(), p = !!f, { enableMultiOrg: E, currentOrgId: D } = se(), { user: n } = Je(), a = (n == null ? void 0 : n.organizations) || [], [r] = y.useForm(), [v, w] = m([]), [T, ce] = m([]), [ue, N] = m([]), [me, L] = m(!0), [H, x] = m([]), [O, g] = m({}), q = re({}), [fe, K] = m(!1), [h, G] = m("global"), [M, pe] = m(void 0), [he, X] = m(!1), [ge, Y] = m(!1);
  C(() => {
    q.current = O;
  }, [O]), C(() => {
    pe(D || void 0);
  }, []);
  const Q = I(async () => {
    try {
      const t = await z.authorization.listPermissions();
      ce(
        t.map((l, i) => {
          const d = (l.permissions || []).map((c) => ({
            key: c.id,
            code: c.code.replace(/:/g, "."),
            title: c.name,
            orgPermission: c.org_permission || !1
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
      j.error(o("role.loadError", { defaultValue: "Failed to load role list" }));
    }
  }, [o]);
  C(() => {
    Q();
  }, [Q]);
  const A = I(
    async (t, l) => {
      if (!t) {
        x([]), g(l || {});
        return;
      }
      K(!0);
      try {
        const d = ((await z.system.listToolSets(
          { page_size: 1e3, include_tools: !0 },
          { headers: { "X-Scope-OrgID": t } }
        )).data || []).filter((V) => V.status === "enabled");
        x(d);
        const c = l || q.current || {}, R = {};
        d.forEach((V) => {
          const J = c[V.id] || [];
          R[V.id] = J.filter(
            (ve) => (V.tools || []).some((Ae) => Ae.name === ve)
          );
        }), g(R);
      } catch {
        j.error(o("role.loadAiToolsetsError", { defaultValue: "Failed to load AI toolsets." })), x([]), g(l || {});
      } finally {
        K(!1);
      }
    },
    [o]
  ), ye = (t) => t ? t.reduce((l, i) => (!i.toolset_id || !i.tool_name || (l[i.toolset_id] || (l[i.toolset_id] = []), l[i.toolset_id].includes(i.tool_name) || l[i.toolset_id].push(i.tool_name)), l), {}) : {}, Z = I(
    async (t) => {
      var l;
      X(!0);
      try {
        const i = await z.authorization.getRole({ id: t }), d = ((l = i.permissions) == null ? void 0 : l.map((J) => J.id)) || [];
        w(d), r.setFieldsValue({ permissions: d });
        const c = i.organization_id || "", R = c ? "organization" : "global";
        G(R);
        const V = ye(i.ai_tool_permissions);
        R === "organization" && c ? await A(c, V) : (x([]), g({})), r.setFieldsValue({
          name: i.name,
          description: i.description,
          role_type: R,
          organization_id: c || void 0,
          policy_document: JSON.stringify(i.policy_document || { Statement: [] }, null, 2)
        });
      } catch {
        j.error(o("role.detailLoadError", { defaultValue: "Failed to load role details" })), b("/authorization/roles");
      } finally {
        X(!1);
      }
    },
    [A, r, b, o]
  );
  C(() => {
    if (p && f) {
      Z(f);
      return;
    }
    const t = M || (a.length > 0 ? a[0].id : ""), l = E && t ? "organization" : "global";
    G(l), r.setFieldsValue({
      role_type: l,
      organization_id: l === "organization" ? t : void 0,
      policy_document: ae,
      permissions: []
    }), w([]), g({}), l === "organization" && t ? A(t, {}) : x([]);
  }, [
    A,
    r,
    f,
    p,
    a,
    M,
    E,
    Z
  ]);
  const xe = Re(() => h === "global" ? T : T.map((l) => {
    const i = (l.children || []).filter(
      (d) => d.orgPermission === !0
    );
    return {
      ...l,
      children: i
    };
  }).filter((l) => l.children && l.children.length > 0), [T, h]), je = (t) => {
    N(t), L(!1);
  }, _e = () => {
    const t = T.map((l) => l.key);
    N(t), L(!0);
  }, be = () => {
    N([]), L(!1);
  }, Ve = I((t, l) => {
    g((i) => ({
      ...i,
      [t]: l
    }));
  }, []), ze = (t, l) => {
    if (h === "organization")
      return Promise.resolve();
    if (!l || l.trim() === "" || l === "{}" || l === '{"Statement":[]}')
      return v.length === 0 ? Promise.reject(
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
  }, Ee = async (t) => {
    const l = { ...t };
    try {
      h === "global" ? l.policy_document = JSON.parse(t.policy_document ?? "{}") : l.policy_document = { Statement: [] }, l.role_type === "organization" ? l.organization_id = l.organization_id || void 0 : l.organization_id = void 0, delete l.role_type;
      const i = h === "organization" ? Object.entries(O).map(([d, c]) => ({
        toolset_id: d,
        tools: Array.from(new Set(c))
      })).filter((d) => d.tools.length > 0) : [];
      l.ai_tool_permissions = i, l.permissions = v.filter((d) => !d.startsWith("[group]-")), Y(!0), p && f ? (await z.authorization.updateRole({ id: f }, l), j.success(o("role.updateSuccess", { defaultValue: "Role updated successfully." }))) : (await z.authorization.createRole(l), j.success(o("role.createSuccess", { defaultValue: "Role created successfully." }))), b("/authorization/roles");
    } catch {
      j.error(
        o("role.saveError", {
          defaultValue: "Failed to save role.",
          action: p ? u("update", { defaultValue: "Update" }) : u("create", { defaultValue: "Create" })
        })
      );
    } finally {
      Y(!1);
    }
  };
  return /* @__PURE__ */ e.jsx(
    W,
    {
      title: p ? o("role.editTitle", { defaultValue: "Edit Role" }) : o("role.createTitle", { defaultValue: "Create Role" }),
      loading: he,
      children: /* @__PURE__ */ e.jsxs(
        y,
        {
          form: r,
          layout: "vertical",
          initialValues: {
            policy_document: ae,
            permissions: []
          },
          onFinish: Ee,
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
                        y.Item,
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
                        y.Item,
                        {
                          label: o("role.description", { defaultValue: "Description" }),
                          name: "description",
                          children: /* @__PURE__ */ e.jsx(
                            ie,
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
                        y.Item,
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
                            B.Group,
                            {
                              disabled: p,
                              onChange: (t) => {
                                const l = t.target.value;
                                if (G(l), l === "global")
                                  r.setFieldsValue({ organization_id: void 0 }), x([]), g({});
                                else {
                                  const i = M || (a.length > 0 ? a[0].id : "");
                                  r.setFieldsValue({ organization_id: i }), i ? A(i, q.current) : (x([]), g({}));
                                }
                                w([]), r.setFieldsValue({ permissions: [] });
                              },
                              children: [
                                /* @__PURE__ */ e.jsx(B, { value: "global", children: o("role.globalRole", { defaultValue: "Global Role" }) }),
                                /* @__PURE__ */ e.jsx(B, { value: "organization", children: o("role.organizationRole", { defaultValue: "Organization Role" }) })
                              ]
                            }
                          )
                        }
                      ),
                      h === "organization" && /* @__PURE__ */ e.jsx(
                        y.Item,
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
                          extra: a.length > 0 ? o("role.organizationHelp", {
                            defaultValue: "Select the organization this role belongs to"
                          }) : o("role.noOrganizationsAvailable", {
                            defaultValue: "No organizations available. Please contact your administrator."
                          }),
                          children: a.length > 0 ? /* @__PURE__ */ e.jsx(
                            k,
                            {
                              placeholder: o("role.selectOrganization", {
                                defaultValue: "Select Organization"
                              }),
                              onChange: (t) => {
                                w([]), r.setFieldsValue({ permissions: [] });
                                const l = t || "";
                                l ? A(l, {}) : (x([]), g({}));
                              },
                              children: a.map((t) => /* @__PURE__ */ e.jsx(k.Option, { value: t.id, children: t.name }, t.id))
                            }
                          ) : /* @__PURE__ */ e.jsx(
                            k,
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
                      y.Item,
                      {
                        name: "permissions",
                        rules: [
                          {
                            validator() {
                              if (v.length === 0)
                                if (h === "global") {
                                  const t = r.getFieldValue("policy_document");
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
                                /* @__PURE__ */ e.jsx(_, { type: "link", onClick: _e, icon: /* @__PURE__ */ e.jsx(qe, {}), children: u("expandAll", { defaultValue: "Expand All" }) }),
                                /* @__PURE__ */ e.jsx(_, { type: "link", onClick: be, icon: /* @__PURE__ */ e.jsx(Ge, {}), children: u("collapseAll", { defaultValue: "Collapse All" }) })
                              ] }),
                              /* @__PURE__ */ e.jsx(
                                Te,
                                {
                                  treeData: xe,
                                  titleRender: (t) => {
                                    const l = t, i = typeof l.title == "string" ? l.title : String(l.title ?? "");
                                    return /* @__PURE__ */ e.jsx("span", { children: o(`permission.title.${l.code}`, { defaultValue: i }) });
                                  },
                                  checkable: !0,
                                  expandedKeys: ue,
                                  autoExpandParent: me,
                                  onExpand: je,
                                  checkedKeys: v,
                                  onCheck: (t) => {
                                    let l = [];
                                    oe.isArray(t) ? l = t : oe.has(t, "checked") && (l = t.checked), w(l), r.setFieldsValue({ permissions: l });
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
                    disabled: h === "global",
                    children: /* @__PURE__ */ e.jsx(Oe, { spinning: fe, children: h === "organization" ? H.length > 0 ? /* @__PURE__ */ e.jsx(P, { direction: "vertical", size: "middle", style: { width: "100%" }, children: H.map((t) => /* @__PURE__ */ e.jsx(
                      W,
                      {
                        size: "small",
                        title: t.name,
                        extra: t.description ? /* @__PURE__ */ e.jsx("span", { children: t.description }) : void 0,
                        children: (t.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(
                          te.Group,
                          {
                            style: { width: "100%" },
                            value: O[t.id] || [],
                            onChange: (l) => Ve(t.id, l),
                            children: /* @__PURE__ */ e.jsx(P, { direction: "vertical", style: { width: "100%" }, children: (t.tools || []).map((l) => /* @__PURE__ */ e.jsx(te, { value: l.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
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
                          S,
                          {
                            image: S.PRESENTED_IMAGE_SIMPLE,
                            description: o("role.aiToolsetNoTools", {
                              defaultValue: "No tools available in this toolset."
                            })
                          }
                        )
                      },
                      t.id
                    )) }) : /* @__PURE__ */ e.jsx(
                      S,
                      {
                        image: S.PRESENTED_IMAGE_SIMPLE,
                        description: o("role.aiToolsetsEmpty", {
                          defaultValue: "No AI toolsets available for this organization."
                        })
                      }
                    ) : /* @__PURE__ */ e.jsx(
                      S,
                      {
                        image: S.PRESENTED_IMAGE_SIMPLE,
                        description: o("role.aiPermissionsGlobalInfo", {
                          defaultValue: "AI tool permissions are only available for organization roles."
                        })
                      }
                    ) })
                  },
                  {
                    key: "policy",
                    label: o("role.policyDocument", { defaultValue: "Policy Document" }),
                    disabled: h === "organization",
                    children: /* @__PURE__ */ e.jsx(
                      y.Item,
                      {
                        name: "policy_document",
                        rules: [
                          {
                            validator: ze
                          }
                        ],
                        extra: /* @__PURE__ */ e.jsx("span", { className: s.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                          k,
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
                                const l = He[t];
                                l && r.setFieldValue("policy_document", JSON.stringify(l, null, 2));
                              }
                            }
                          }
                        ) }),
                        children: /* @__PURE__ */ e.jsx(
                          ie,
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
            /* @__PURE__ */ e.jsx(y.Item, { children: /* @__PURE__ */ e.jsxs(P, { children: [
              /* @__PURE__ */ e.jsx(
                _,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: ge,
                  children: p ? u("update", { defaultValue: "Update" }) : u("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                _,
                {
                  onClick: () => b("/authorization/roles"),
                  children: u("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ke
}, Symbol.toStringTag, { value: "Module" }));
export {
  nl as R,
  sl as a
};
