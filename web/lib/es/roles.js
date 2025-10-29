import { j as e } from "./vendor.js";
import { useState as n, useRef as Y, useEffect as Q } from "react";
import { Form as d, Space as S, Tag as X, Tooltip as b, Button as u, Popconfirm as Z, Card as ee, Row as le, Col as v, Modal as te, Input as D, Collapse as E, Tree as oe, Select as ae, message as p } from "antd";
import { UserOutlined as re, LockOutlined as ie, EditOutlined as ne, DeleteOutlined as se, ReloadOutlined as ce, PlusOutlined as de, DownOutlined as ue, UpOutlined as me } from "@ant-design/icons";
import { h as g, T as pe } from "./components.js";
import { a as f } from "./index.js";
import { useTranslation as k } from "react-i18next";
import O from "lodash";
import { createStyles as fe } from "antd-style";
const { TextArea: z } = D, he = fe(({ css: i }) => ({
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
})), Re = () => {
  const { styles: i } = he(), { t } = k("authorization"), { t: s } = k("common"), [c] = d.useForm(), [T, P] = n(!1), [F, h] = n(!1), [j, R] = n(null), [m, x] = n([]), y = Y(null), [_, I] = n([]), [N, w] = n([]), [q, V] = n(!0), J = (l) => {
    w(l), V(!1);
  }, L = () => {
    const l = _.map((o) => o.key);
    w(l), V(!0);
  }, W = () => {
    w([]), V(!1);
  }, M = () => {
    R(null), x([]), c.resetFields(), h(!0);
  }, U = (l) => {
    var o, a;
    R(l), x(((o = l.permissions) == null ? void 0 : o.map((r) => r.id)) || []), c.setFieldsValue({
      name: l.name,
      description: l.description,
      permissions: ((a = l.permissions) == null ? void 0 : a.map((r) => r.id)) || [],
      policy_document: JSON.stringify(l.policy_document, null, 2)
    }), h(!0);
  }, B = async (l) => {
    var o, a;
    try {
      await f.authorization.deleteRole({ id: l }), p.success(t("role.deleteSuccess", { defaultValue: "Role deleted successfully." })), (a = (o = y.current) == null ? void 0 : o.reload) == null || a.call(o);
    } catch (r) {
      p.error(t("role.deleteError", { defaultValue: "Failed to delete role: {{error}}", error: r }));
    }
  }, G = (l, o) => {
    if (!o)
      return m.length === 0 ? Promise.reject(new Error(t("role.permissionOrPolicyRequired", { defaultValue: "Please select at least one permission or provide a policy document." }))) : Promise.resolve();
    try {
      return JSON.parse(o), Promise.resolve();
    } catch {
      return Promise.reject(new Error(t("role.invalidJsonFormat", { defaultValue: "Invalid JSON format." })));
    }
  }, K = async (l) => {
    var o, a;
    try {
      l.policy_document = JSON.parse(l.policy_document ?? {}), P(!0), j ? (await f.authorization.updateRole({ id: j.id }, {
        ...l,
        permissions: m.filter((r) => !r.startsWith("[group]-"))
      }), p.success(t("role.updateSuccess", { defaultValue: "Role updated successfully." }))) : (await f.authorization.createRole({
        ...l,
        permissions: m.filter((r) => !r.startsWith("[group]-"))
      }), p.success(t("role.createSuccess", { defaultValue: "Role created successfully." }))), h(!1), (a = (o = y.current) == null ? void 0 : o.reload) == null || a.call(o);
    } catch (r) {
      console.error(t("role.saveError", { defaultValue: "Failed to save role." }), r), p.error(t("role.saveError", { defaultValue: "Failed to save role." }));
    } finally {
      P(!1);
    }
  }, $ = [
    {
      title: t("role.name", { defaultValue: "Role Name" }),
      dataIndex: "name",
      key: "name",
      render: (l) => /* @__PURE__ */ e.jsxs(S, { children: [
        /* @__PURE__ */ e.jsx(re, {}),
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
      render: (l, o) => {
        var a;
        return /* @__PURE__ */ e.jsxs(X, { color: "blue", children: [
          /* @__PURE__ */ e.jsx(ie, {}),
          " ",
          ((a = o.permissions) == null ? void 0 : a.length) || 0
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
      title: s("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (l, o) => /* @__PURE__ */ e.jsxs(S, { size: "small", children: [
        /* @__PURE__ */ e.jsx(g, { permission: "authorization:role:update", children: /* @__PURE__ */ e.jsx(b, { title: t("role.edit", { defaultValue: "Edit Role" }), children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(ne, {}),
            onClick: () => U(o)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(g, { permission: "authorization:role:delete", children: /* @__PURE__ */ e.jsx(b, { title: t("role.delete", { defaultValue: "Delete Role" }), children: /* @__PURE__ */ e.jsx(
          Z,
          {
            title: t("role.deleteConfirm", { defaultValue: "Are you sure you want to delete this role?" }),
            onConfirm: () => B(o.id),
            okText: s("confirm", { defaultValue: "Confirm" }),
            cancelText: s("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              u,
              {
                type: "text",
                size: "small",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(se, {})
              }
            )
          }
        ) }) })
      ] })
    }
  ], H = {
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
      I(l.map((o, a) => {
        var r;
        return {
          key: `[group]-${a}`,
          title: o.name,
          code: o.name.replace(/ /g, "_"),
          children: (r = o.permissions) == null ? void 0 : r.map((A) => ({
            key: A.id,
            code: A.code.replace(/:/g, "."),
            title: A.name
          }))
        };
      }));
    });
  };
  return Q(() => {
    C();
  }, []), /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsxs(ee, { style: { marginBottom: 16 }, children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(le, { justify: "space-between", align: "middle", children: [
        /* @__PURE__ */ e.jsx(v, { children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            onClick: () => {
              var l, o;
              (o = (l = y.current) == null ? void 0 : l.reload) == null || o.call(l), C();
            },
            icon: /* @__PURE__ */ e.jsx(ce, {}),
            children: s("refresh", { defaultValue: "Refresh" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(v, { children: /* @__PURE__ */ e.jsx(g, { permission: "authorization:role:create", children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(de, {}),
            onClick: M,
            children: t("role.create", { defaultValue: "Create Role" })
          }
        ) }) })
      ] }) }),
      /* @__PURE__ */ e.jsx(
        pe,
        {
          request: async ({ page_size: l, current: o }) => f.authorization.listRoles({ current: o, page_size: l }),
          columns: $,
          actionRef: y
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(
      te,
      {
        title: j ? t("role.editTitle", { defaultValue: "Edit Role" }) : t("role.createTitle", { defaultValue: "Create Role" }),
        open: F,
        onOk: c.submit,
        onCancel: () => h(!1),
        confirmLoading: T,
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
                  children: /* @__PURE__ */ e.jsx(D, { placeholder: t("role.namePlaceholder", { defaultValue: "Enter role name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                d.Item,
                {
                  label: t("role.description", { defaultValue: "Description" }),
                  name: "description",
                  children: /* @__PURE__ */ e.jsx(z, { rows: 4, placeholder: t("role.descriptionPlaceholder", { defaultValue: "Enter role description" }) })
                }
              ),
              /* @__PURE__ */ e.jsxs(E, { accordion: !0, bordered: !1, className: i.rolePolicy, children: [
                /* @__PURE__ */ e.jsx(E.Panel, { forceRender: !0, header: t("role.permissions", { defaultValue: "Permissions" }), style: { padding: 0 }, children: /* @__PURE__ */ e.jsx(
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
                        /* @__PURE__ */ e.jsx(u, { type: "link", onClick: L, icon: /* @__PURE__ */ e.jsx(ue, {}), children: s("expandAll", { defaultValue: "Expand All" }) }),
                        /* @__PURE__ */ e.jsx(u, { type: "link", onClick: W, icon: /* @__PURE__ */ e.jsx(me, {}), children: s("collapseAll", { defaultValue: "Collapse All" }) })
                      ] }),
                      /* @__PURE__ */ e.jsx(
                        oe,
                        {
                          treeData: _,
                          titleRender: (l) => /* @__PURE__ */ e.jsx("span", { children: t(`permission.title.${l.code}`, { defaultValue: l.title }) }),
                          checkable: !0,
                          expandedKeys: N,
                          autoExpandParent: q,
                          onExpand: J,
                          checkedKeys: m,
                          onCheck: (l) => {
                            O.isArray(l) ? x(l) : O.has(l, "checked") && x(l.checked);
                          }
                        }
                      )
                    ] }) })
                  }
                ) }, "permissions"),
                /* @__PURE__ */ e.jsx(E.Panel, { forceRender: !0, header: t("role.policyDocument", { defaultValue: "Policy Document (JSON)" }), children: /* @__PURE__ */ e.jsx(
                  d.Item,
                  {
                    name: "policy_document",
                    rules: [
                      { validator: G }
                    ],
                    extra: /* @__PURE__ */ e.jsx("span", { className: i.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                      ae,
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
                          const o = H[l];
                          o && c.setFieldValue("policy_document", JSON.stringify(o, null, 2));
                        }
                      }
                    ) }),
                    children: /* @__PURE__ */ e.jsx(
                      z,
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
  Re as default
};
