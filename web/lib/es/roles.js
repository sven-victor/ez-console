import { c as H, u as S, r as d, j as e, o as b, ac as X, V as Z, ay as Q, T as v, m as u, aB as ee, k as le, aC as te, C as ae, X as oe, Y as k, a0 as re, q as ie, M as se, p as z, aD as A, aE as ne, aF as ce, aG as de, ai as I, Z as ue, s as p } from "./vendor.js";
import { useState as s, useRef as me, useEffect as pe } from "react";
import { f as E, T as fe } from "./components.js";
import { a as f } from "./index.js";
const { TextArea: T } = z, he = H(({ css: i }) => ({
  rolePolicy: i`
       .ant-collapse-content>.ant-collapse-content-box{
        padding: 2px;
      }
      .ant-form-item-additional>#policy_document_extra{
        min-height: 0;
      }
      .ant-tree .ant-tree-node-content-wrapper{
        flex: none;
      }
    `,
  rolePermissionExtra: i`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
  rolePolicyExtra: i`
      position: absolute;
      right: 5px;
      top: 5px;
    `
})), Ve = () => {
  const { styles: i } = he(), { t } = S("authorization"), { t: n } = S("common"), [c] = d.useForm(), [D, g] = s(!1), [F, h] = s(!1), [j, _] = s(null), [m, x] = s([]), y = me(null), [P, N] = s([]), [q, w] = s([]), [O, V] = s(!0), $ = (l) => {
    w(l), V(!1);
  }, J = () => {
    const l = P.map((a) => a.key);
    w(l), V(!0);
  }, M = () => {
    w([]), V(!1);
  }, W = () => {
    _(null), x([]), c.resetFields(), h(!0);
  }, B = (l) => {
    var a, o;
    _(l), x(((a = l.permissions) == null ? void 0 : a.map((r) => r.id)) || []), c.setFieldsValue({
      name: l.name,
      description: l.description,
      permissions: ((o = l.permissions) == null ? void 0 : o.map((r) => r.id)) || [],
      policy_document: JSON.stringify(l.policy_document, null, 2)
    }), h(!0);
  }, L = async (l) => {
    var a, o;
    try {
      await f.authorization.deleteRole({ id: l }), p.success(t("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), (o = (a = y.current) == null ? void 0 : a.reload) == null || o.call(a);
    } catch (r) {
      p.error(t("role.deleteError", { defaultValue: "Failed to delete role: {{error}}", error: r }));
    }
  }, G = (l, a) => {
    if (!a)
      return m.length === 0 ? Promise.reject(new Error(t("role.permissionOrPolicyRequired", { defaultValue: "Please select at least one permission or provide a policy document." }))) : Promise.resolve();
    try {
      return JSON.parse(a), Promise.resolve();
    } catch {
      return Promise.reject(new Error(t("role.invalidJsonFormat", { defaultValue: "Invalid JSON format." })));
    }
  }, K = async (l) => {
    var a, o;
    try {
      l.policy_document = JSON.parse(l.policy_document ?? {}), g(!0), j ? (await f.authorization.updateRole({ id: j.id }, {
        ...l,
        permissions: m.filter((r) => !r.startsWith("[group]-"))
      }), p.success(t("role.updateSuccess", { defaultValue: "Role updated successfully." }))) : (await f.authorization.createRole({
        ...l,
        permissions: m.filter((r) => !r.startsWith("[group]-"))
      }), p.success(t("role.createSuccess", { defaultValue: "Role created successfully." }))), h(!1), (o = (a = y.current) == null ? void 0 : a.reload) == null || o.call(a);
    } catch (r) {
      console.error(t("role.saveError", { defaultValue: "Failed to save role." }), r), p.error(t("role.saveError", { defaultValue: "Failed to save role." }));
    } finally {
      g(!1);
    }
  }, U = [
    {
      title: t("role.name", { defaultValue: "Role Name" }),
      dataIndex: "name",
      key: "name",
      render: (l) => /* @__PURE__ */ e.jsxs(b, { children: [
        /* @__PURE__ */ e.jsx(X, {}),
        l
      ] })
    },
    {
      title: t("role.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: t("role.permissionCount", { defaultValue: "Permissions" }),
      key: "permission_count",
      render: (l, a) => {
        var o;
        return /* @__PURE__ */ e.jsxs(Z, { color: "blue", children: [
          /* @__PURE__ */ e.jsx(Q, {}),
          " ",
          ((o = a.permissions) == null ? void 0 : o.length) || 0
        ] });
      }
    },
    {
      title: t("role.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (l) => new Date(l).toLocaleString()
    },
    {
      title: n("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (l, a) => /* @__PURE__ */ e.jsxs(b, { size: "small", children: [
        /* @__PURE__ */ e.jsx(E, { permission: "authorization:role:update", children: /* @__PURE__ */ e.jsx(v, { title: t("role.edit", { defaultValue: "Edit Role" }), children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(ee, {}),
            onClick: () => B(a)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(E, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(v, { title: t("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
          le,
          {
            title: t("role.deleteConfirm", { defaultValue: "Are you sure you want to delete this role?" }),
            onConfirm: () => L(a.id),
            okText: n("confirm", { defaultValue: "Confirm" }),
            cancelText: n("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              u,
              {
                type: "text",
                size: "small",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(te, {})
              }
            )
          }
        ) }) })
      ] })
    }
  ], Y = {
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
  }, C = async () => {
    f.authorization.listPermissions().then((l) => {
      N(l.map((a, o) => {
        var r;
        return {
          key: `[group]-${o}`,
          title: a.name,
          code: a.name.replace(/ /g, "_"),
          children: (r = a.permissions) == null ? void 0 : r.map((R) => ({
            key: R.id,
            code: R.code.replace(/:/g, "."),
            title: R.name
          }))
        };
      }));
    });
  };
  return pe(() => {
    C();
  }, []), /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsxs(ae, { style: { marginBottom: 16 }, children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(oe, { justify: "space-between", align: "middle", children: [
        /* @__PURE__ */ e.jsx(k, { children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            onClick: () => {
              var l, a;
              (a = (l = y.current) == null ? void 0 : l.reload) == null || a.call(l), C();
            },
            icon: /* @__PURE__ */ e.jsx(re, {}),
            children: n("refresh", { defaultValue: "Refresh" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(k, { children: /* @__PURE__ */ e.jsx(E, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ie, {}),
            onClick: W,
            children: t("role.create", { defaultValue: "Create Role" })
          }
        ) }) })
      ] }) }),
      /* @__PURE__ */ e.jsx(
        fe,
        {
          request: async ({ page_size: l, current: a }) => f.authorization.listRoles({ current: a, page_size: l }),
          columns: U,
          actionRef: y
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(
      se,
      {
        title: j ? t("role.editTitle", { defaultValue: "Edit Role" }) : t("role.createTitle", { defaultValue: "Create Role" }),
        open: F,
        onOk: c.submit,
        onCancel: () => h(!1),
        confirmLoading: D,
        children: /* @__PURE__ */ e.jsxs(
          d,
          {
            form: c,
            layout: "vertical",
            onFinish: K,
            children: [
              /* @__PURE__ */ e.jsx(
                d.Item,
                {
                  label: t("role.name", { defaultValue: "Role Name" }),
                  name: "name",
                  rules: [{ required: !0, message: t("role.nameRequired", { defaultValue: "Please enter the role name." }) }],
                  children: /* @__PURE__ */ e.jsx(z, { placeholder: t("role.namePlaceholder", { defaultValue: "Enter role name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                d.Item,
                {
                  label: t("role.description", { defaultValue: "Description" }),
                  name: "description",
                  children: /* @__PURE__ */ e.jsx(T, { rows: 4, placeholder: t("role.descriptionPlaceholder", { defaultValue: "Enter role description" }) })
                }
              ),
              /* @__PURE__ */ e.jsxs(A, { accordion: !0, bordered: !1, className: i.rolePolicy, children: [
                /* @__PURE__ */ e.jsx(A.Panel, { forceRender: !0, header: t("role.permissions", { defaultValue: "Permissions" }), style: { padding: 0 }, children: /* @__PURE__ */ e.jsx(
                  d.Item,
                  {
                    name: "permissions",
                    rules: [{
                      validator() {
                        return m.length === 0 && !c.getFieldValue("policy_document") ? Promise.reject(new Error(t("role.permissionOrPolicyRequired", { defaultValue: "Please select at least one permission or provide a policy document." }))) : Promise.resolve();
                      }
                    }],
                    children: /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "400px", overflowY: "auto", border: "1px solid #d9d9d9", borderRadius: "4px" }, children: [
                      /* @__PURE__ */ e.jsxs("span", { className: i.rolePermissionExtra, children: [
                        /* @__PURE__ */ e.jsx(u, { type: "link", onClick: J, icon: /* @__PURE__ */ e.jsx(ne, {}), children: n("expandAll", { defaultValue: "Expand All" }) }),
                        /* @__PURE__ */ e.jsx(u, { type: "link", onClick: M, icon: /* @__PURE__ */ e.jsx(ce, {}), children: n("collapseAll", { defaultValue: "Collapse All" }) })
                      ] }),
                      /* @__PURE__ */ e.jsx(
                        de,
                        {
                          treeData: P,
                          titleRender: (l) => /* @__PURE__ */ e.jsx("span", { children: t(`permission.title.${l.code}`, { defaultValue: l.title }) }),
                          checkable: !0,
                          expandedKeys: q,
                          autoExpandParent: O,
                          onExpand: $,
                          checkedKeys: m,
                          onCheck: (l) => {
                            I.isArray(l) ? x(l) : I.has(l, "checked") && x(l.checked);
                          }
                        }
                      )
                    ] }) })
                  }
                ) }, "permissions"),
                /* @__PURE__ */ e.jsx(A.Panel, { forceRender: !0, header: t("role.policyDocument", { defaultValue: "Policy Document (JSON)" }), children: /* @__PURE__ */ e.jsx(
                  d.Item,
                  {
                    name: "policy_document",
                    rules: [
                      { validator: G }
                    ],
                    extra: /* @__PURE__ */ e.jsx("span", { className: i.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                      ue,
                      {
                        style: { width: 120 },
                        placeholder: t("role.insertTemplate", { defaultValue: "Insert Template" }),
                        value: t("role.insertTemplate", { defaultValue: "Insert Template" }),
                        options: [
                          { label: t("role.allowAll", { defaultValue: "Allow All" }), value: "allow_all" },
                          { label: t("role.denyAll", { defaultValue: "Deny All" }), value: "deny_all" },
                          { label: t("role.allowWithAction", { defaultValue: "Allow with Action" }), value: "allow_with_action" },
                          { label: t("role.denyWithCondition", { defaultValue: "Allow with Condition" }), value: "allow_with_condition" },
                          { label: t("role.allowWithUri", { defaultValue: "Allow with URI" }), value: "allow_with_uri" }
                        ],
                        onChange: (l) => {
                          const a = Y[l];
                          a && c.setFieldValue("policy_document", JSON.stringify(a, null, 2));
                        }
                      }
                    ) }),
                    children: /* @__PURE__ */ e.jsx(
                      T,
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
                ) }, "policy_document")
              ] })
            ]
          }
        )
      }
    )
  ] });
};
export {
  Ve as default
};
