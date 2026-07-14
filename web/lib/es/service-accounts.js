import { j as e, T as de } from "./vendor.js";
import { useState as V, useEffect as he } from "react";
import { useRequest as C } from "ahooks";
import { Form as y, message as h, Modal as W, Radio as ee, Select as Y, Input as Z, Space as I, Button as g, Tooltip as pe, Tag as B, Badge as N, Card as G, Row as fe, Col as ce, Table as me, Typography as ve, Popconfirm as ye, Switch as ze, DatePicker as ke, Alert as Ce, Skeleton as Ee, Empty as H, Spin as ne, Tabs as xe, Descriptions as L } from "antd";
import { TeamOutlined as we, CheckCircleOutlined as ae, CloseCircleOutlined as Fe, EyeOutlined as Ie, EditOutlined as Q, LockOutlined as X, DeleteOutlined as ie, ReloadOutlined as Pe, PlusOutlined as Ae, KeyOutlined as se, SyncOutlined as je, CopyOutlined as Te, ExclamationCircleOutlined as De, RollbackOutlined as Ke, UserOutlined as Re } from "@ant-design/icons";
import { useNavigate as ge, Link as Oe, useLocation as Ne, useParams as Ue } from "react-router-dom";
import { g as R, b as Me } from "./components.js";
import { a as b } from "./index.js";
import { P as te, f as q } from "./base.js";
import { useTranslation as O } from "react-i18next";
import { a as oe, b as Ve, u as Le } from "./contexts.js";
import Be from "./not_found.js";
import qe from "dayjs";
import { createStyles as Ge } from "antd-style";
const Se = ({
  serviceAccountID: t,
  onClose: a,
  open: _ = !1,
  onSuccess: E,
  enableMultiOrg: u = !1,
  organizations: c = []
}) => {
  const { hasGlobalPermission: f } = oe(), { t: i } = O("authorization"), { t: m } = O("common"), { currentOrgId: z } = Ve(), [l] = y.useForm(), [k, P] = V("global"), [A, S] = V(void 0), [D, x] = V(null), { run: K, loading: n } = C((r) => {
    if (t) {
      const F = {
        name: r.name,
        description: r.description ?? ""
      };
      return b.authorization.updateServiceAccount({ id: t }, F);
    }
    const d = {
      name: r.name,
      description: r.description || ""
    };
    return k === "organization" && A && (d.organization_id = A), b.authorization.createServiceAccount(d);
  }, {
    onSuccess: () => {
      h.success(i("serviceAccount.saveSuccess", { defaultValue: "Service account saved successfully." })), a(), E == null || E();
    },
    onError: () => {
      h.error(i("serviceAccount.saveError", { defaultValue: "Failed to save service account." }));
    },
    manual: !0
  }), { run: v, loading: w } = C(
    (r) => b.authorization.getServiceAccountById({ id: r }),
    {
      manual: !0,
      onSuccess: (r) => {
        var F;
        const d = r.organization_id || "";
        P(d ? "organization" : "global"), S(d || void 0), x(d ? ((F = r.organization) == null ? void 0 : F.name) ?? d : null), l.setFieldsValue({
          name: r.name,
          description: r.description,
          organization_id: d || void 0
        });
      },
      onError: () => {
        h.error(i("serviceAccount.loadError", { defaultValue: "Failed to load service account." }));
      }
    }
  );
  return he(() => {
    if (_) {
      l.resetFields();
      const r = z || (c.length > 0 ? c[0].id : ""), d = u && r ? "organization" : "global";
      P(d), S(d === "organization" ? r : void 0), t ? v(t) : (x(null), l.setFieldsValue({
        organization_id: d === "organization" ? r : void 0
      }));
    }
  }, [t, _, u, c, z, l, v, i]), /* @__PURE__ */ e.jsx(
    W,
    {
      title: t ? i("serviceAccount.edit", { defaultValue: "Edit Service Account" }) : i("serviceAccount.create", { defaultValue: "Create Service Account" }),
      width: 500,
      loading: w,
      afterOpenChange: (r) => {
        r || (l.resetFields(), a());
      },
      onCancel: () => {
        l.resetFields(), a();
      },
      open: _,
      footer: /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(g, { onClick: a, children: m("cancel", { defaultValue: "Cancel" }) }),
        /* @__PURE__ */ e.jsx(
          g,
          {
            type: "primary",
            onClick: l.submit,
            loading: n || w,
            children: m("save", { defaultValue: "Save" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(
        y,
        {
          form: l,
          layout: "vertical",
          onFinish: K,
          children: [
            u && !t && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(y.Item, { label: i("serviceAccount.scope", { defaultValue: "Scope" }), children: /* @__PURE__ */ e.jsxs(
                ee.Group,
                {
                  value: k,
                  onChange: (r) => {
                    var o;
                    const d = r.target.value;
                    P(d);
                    const F = d === "organization" ? z || ((o = c[0]) == null ? void 0 : o.id) : void 0;
                    S(F), l.setFieldsValue({ organization_id: F });
                  },
                  disabled: !f("authorization:service_account:create"),
                  children: [
                    /* @__PURE__ */ e.jsx(ee, { value: "global", children: i("serviceAccount.global", { defaultValue: "Global" }) }),
                    /* @__PURE__ */ e.jsx(ee, { value: "organization", children: i("serviceAccount.organizationScoped", { defaultValue: "Organization" }) })
                  ]
                }
              ) }),
              k === "organization" && /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "organization_id",
                  label: i("serviceAccount.organization", { defaultValue: "Organization" }),
                  rules: [{ required: !0, message: i("serviceAccount.organizationRequired", { defaultValue: "Please select an organization." }) }],
                  children: /* @__PURE__ */ e.jsx(
                    Y,
                    {
                      placeholder: i("serviceAccount.selectOrganization", { defaultValue: "Select organization" }),
                      options: c.map((r) => ({ value: r.id, label: r.name })),
                      value: A,
                      onChange: (r) => S(r)
                    }
                  )
                }
              )
            ] }),
            u && t && /* @__PURE__ */ e.jsx(y.Item, { label: i("serviceAccount.organization", { defaultValue: "Organization" }), children: /* @__PURE__ */ e.jsx("span", { children: D ?? i("serviceAccount.global", { defaultValue: "Global" }) }) }),
            /* @__PURE__ */ e.jsx(
              y.Item,
              {
                label: i("serviceAccount.name", { defaultValue: "Name" }),
                name: "name",
                rules: [{ required: !0, message: i("serviceAccount.nameRequired", { defaultValue: "Please enter a name for the service account." }) }],
                children: /* @__PURE__ */ e.jsx(Z, { placeholder: i("serviceAccount.namePlaceholder", { defaultValue: "Enter service account name" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              y.Item,
              {
                label: i("serviceAccount.description", { defaultValue: "Description" }),
                name: "description",
                children: /* @__PURE__ */ e.jsx(de, { rows: 4, placeholder: i("serviceAccount.descriptionPlaceholder", { defaultValue: "Enter service account description (optional)" }) })
              }
            )
          ]
        }
      )
    }
  );
}, $e = () => {
  const { t } = O("authorization"), { t: a } = O("common"), _ = ge(), [E] = y.useForm(), { siteConfig: u } = Ve(), { user: c } = Le(), f = (c == null ? void 0 : c.organizations) || [], i = (u == null ? void 0 : u.enable_multi_org) ?? !1, [m, z] = V([]), [l, k] = V(0), [P, A] = V(!1), [S, D] = V(null), [x, K] = V({
    current: te.DEFAULT_CURRENT,
    page_size: te.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), { loading: n, refresh: v } = C(
    () => b.authorization.getServiceAccounts(x),
    {
      refreshDeps: [x],
      debounceWait: 300,
      onSuccess: (s) => {
        z(s.data || []), k(s.total || 0);
      },
      onError: () => {
        h.error(t("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }));
      }
    }
  ), { run: w } = C(
    async ({ id: s }) => b.authorization.deleteServiceAccount({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        h.success(
          t("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully" })
        ), v();
      },
      onError: () => {
        h.error(t("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }));
      }
    }
  ), { run: r } = C(
    async (s) => b.authorization.updateServiceAccountStatus(
      { id: s.id },
      { status: s.status }
    ),
    {
      manual: !0,
      onSuccess: () => {
        h.success(
          t("serviceAccount.statusUpdateSuccess", { defaultValue: "Status updated successfully" })
        ), v();
      },
      onError: () => {
        h.error(
          t("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" })
        );
      }
    }
  ), d = (s) => {
    K({
      ...x,
      current: te.DEFAULT_CURRENT,
      search: s.search,
      organization_id: s.organization_id || void 0
    });
  }, F = (s, p) => {
    K((M) => ({
      ...M,
      current: s,
      page_size: p
    }));
  }, o = () => {
    D(null), A(!0);
  }, T = (s) => {
    D(s.id), A(!0);
  }, j = () => {
    A(!1);
  }, U = (s) => {
    w({ id: s });
  }, _e = (s) => {
    const p = s.status === "active" ? "disabled" : "active";
    r({ id: s.id, status: p });
  }, be = [
    {
      title: t("serviceAccount.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (s, p) => /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:view", fallback: s, children: /* @__PURE__ */ e.jsx(Oe, { to: `/authorization/service-accounts/${p.id}`, children: s }) })
    },
    {
      title: t("serviceAccount.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description",
      render: (s) => /* @__PURE__ */ e.jsx(pe, { title: s, children: /* @__PURE__ */ e.jsx("span", { children: (s == null ? void 0 : s.length) > 30 ? `${s.substring(0, 30)}...` : s }) })
    },
    ...i ? [
      {
        title: t("serviceAccount.organization", { defaultValue: "Organization" }),
        key: "organization",
        render: (s, p) => {
          var M;
          return p.organization_id ? /* @__PURE__ */ e.jsx(B, { icon: /* @__PURE__ */ e.jsx(we, {}), color: "blue", children: ((M = p.organization) == null ? void 0 : M.name) || p.organization_id }) : /* @__PURE__ */ e.jsx(B, { color: "default", children: t("serviceAccount.global", { defaultValue: "Global" }) });
        }
      }
    ] : [],
    {
      title: t("serviceAccount.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (s) => s === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: t("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: t("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: t("serviceAccount.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (s, p) => {
        var M;
        return /* @__PURE__ */ e.jsxs(I, { size: [0, 4], wrap: !0, children: [
          (M = p.roles) == null ? void 0 : M.map((le) => /* @__PURE__ */ e.jsx(B, { color: "blue", children: le.name }, le.id)),
          (!p.roles || p.roles.length === 0) && /* @__PURE__ */ e.jsx(B, { children: t("serviceAccount.noRoles", { defaultValue: "No Roles" }) })
        ] });
      }
    },
    {
      title: t("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }),
      key: "policy",
      render: (s, p) => p.policy_document && p.policy_document.Statement && p.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(B, { color: "green", icon: /* @__PURE__ */ e.jsx(ae, {}), children: t("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }) }) : /* @__PURE__ */ e.jsx(B, { color: "default", icon: /* @__PURE__ */ e.jsx(Fe, {}), children: t("serviceAccount.noPolicy", { defaultValue: "No Policy" }) })
    },
    {
      title: t("serviceAccount.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (s) => q(s)
    },
    {
      title: t("serviceAccount.lastAccess", { defaultValue: "Last Access" }),
      dataIndex: "last_access",
      key: "last_access",
      render: (s) => s ? q(s) : t("serviceAccount.neverAccessed", { defaultValue: "Never Accessed" })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (s, p) => /* @__PURE__ */ e.jsx(
        Me,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              tooltip: t("serviceAccount.viewDetail", { defaultValue: "View Service Account Details" }),
              onClick: async () => _(`/authorization/service-accounts/${p.id}`),
              permission: "authorization:service_account:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Q, {}),
              tooltip: t("serviceAccount.edit", { defaultValue: "Edit Service Account" }),
              onClick: async () => T(p),
              permission: "authorization:service_account:update"
            },
            {
              key: "toggleStatus",
              icon: p.status === "active" ? /* @__PURE__ */ e.jsx(X, {}) : /* @__PURE__ */ e.jsx(ae, {}),
              tooltip: p.status === "active" ? t("serviceAccount.actionTooltipDisable", { defaultValue: "Disable this service account" }) : t("serviceAccount.actionTooltipEnable", { defaultValue: "Enable this service account" }),
              onClick: async () => _e(p),
              permission: "authorization:service_account:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(ie, {}),
              danger: !0,
              tooltip: t("serviceAccount.delete", { defaultValue: "Delete Service Account" }),
              confirm: {
                title: t("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
                onConfirm: async () => U(p.id),
                okText: a("confirm", { defaultValue: "Confirm" }),
                cancelText: a("cancel", { defaultValue: "Cancel" })
              },
              permission: "authorization:service_account:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(G, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      y,
      {
        form: E,
        layout: "vertical",
        onFinish: d,
        name: "serviceAccountSearchForm",
        initialValues: {
          search: x.search,
          organization_id: x.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(fe, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(I, { children: [
            /* @__PURE__ */ e.jsx(y.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              Z.Search,
              {
                placeholder: t("serviceAccount.searchPlaceholder", { defaultValue: "Search by name or description" }),
                allowClear: !0,
                onSearch: () => {
                  d(E.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            !i && /* @__PURE__ */ e.jsx(y.Item, { name: "organization_id", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              Y,
              {
                placeholder: t("serviceAccount.filterByOrg", { defaultValue: "All organizations" }),
                allowClear: !0,
                style: { minWidth: 160 },
                options: [
                  { value: "", label: t("serviceAccount.global", { defaultValue: "Global" }) },
                  ...f.map((s) => ({ value: s.id, label: s.name }))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(I, { children: [
            /* @__PURE__ */ e.jsx(
              g,
              {
                onClick: () => {
                  d(E.getFieldsValue());
                },
                icon: /* @__PURE__ */ e.jsx(Pe, {}),
                children: a("refresh", { defaultValue: "Refresh" })
              }
            ),
            /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:create", children: /* @__PURE__ */ e.jsx(
              g,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Ae, {}),
                onClick: o,
                children: t("serviceAccount.create", { defaultValue: "Create Service Account" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx(
      me,
      {
        rowKey: "id",
        dataSource: m,
        columns: be,
        loading: n,
        pagination: {
          current: x.current,
          pageSize: x.page_size,
          total: l,
          onChange: F,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (s) => a("totalItems", { defaultValue: `Total ${s} items`, total: s })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Se,
      {
        serviceAccountID: S,
        onClose: j,
        open: P,
        enableMultiOrg: i,
        organizations: f,
        onSuccess: () => {
          v();
        }
      }
    )
  ] });
}, pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $e
}, Symbol.toStringTag, { value: "Module" })), { Text: $, Paragraph: re } = ve, { TextArea: Je } = Z, We = ({ serviceAccountID: t }) => {
  const { t: a } = O("authorization"), { t: _ } = O("common"), [E, u] = V(!1), [c] = y.useForm(), [f, i] = V(null), [m, z] = V(null), [l, k] = V(!1), {
    data: P = [],
    loading: A,
    refresh: S
  } = C(
    () => b.authorization.getServiceAccountAccessKeys({ id: t }),
    {
      ready: !!t,
      refreshDeps: [t],
      onError: () => {
        h.error(a("serviceAccount.loadKeysError", { defaultValue: "Failed to load access keys." }));
      }
    }
  ), { run: D } = C(
    (o) => b.authorization.deleteServiceAccountAccessKey({ id: t, keyId: o }),
    {
      manual: !0,
      onSuccess: () => {
        h.success(
          a("serviceAccount.deleteKeySuccess", { defaultValue: "Access key deleted successfully." })
        ), S();
      },
      onError: () => {
        h.error(a("serviceAccount.deleteKeyError", { defaultValue: "Failed to delete access key." }));
      }
    }
  ), x = (o) => {
    navigator.clipboard.writeText(o).then(
      () => {
        h.success(a("serviceAccount.copyKeySuccess", { defaultValue: "Copied to clipboard!" }));
      },
      (T) => {
        console.error("Could not copy text: ", T);
      }
    );
  }, K = () => {
    i(null), c.resetFields(), u(!0);
  }, n = (o) => {
    i(o), c.setFieldsValue({
      name: o.name,
      description: o.description,
      status: o.status === "active",
      expires_at: o.expires_at ? qe(o.expires_at) : void 0
    }), u(!0);
  }, v = () => {
    u(!1), c.resetFields();
  }, { run: w, loading: r } = C(
    async () => {
      const o = await c.validateFields();
      if (f) {
        const T = await b.authorization.updateServiceAccountAccessKey({ id: t, keyId: f.id }, {
          name: o.name,
          description: o.description,
          status: o.status ? "active" : "disabled",
          expires_at: o.expires_at ? o.expires_at.toISOString() : void 0
        });
        return u(!1), T;
      } else {
        const T = await b.authorization.createServiceAccountAccessKey({ id: t }, {
          name: o.name,
          description: o.description,
          expires_at: o.expires_at ? o.expires_at.toISOString() : void 0
        });
        z(T), u(!1), k(!0);
      }
    },
    {
      manual: !0,
      onSuccess: () => {
        h.success(a("serviceAccount.updateKeySuccess", { defaultValue: "Access key updated successfully." })), S();
      },
      onError: () => {
        h.error(a("serviceAccount.updateKeyError", { defaultValue: "Failed to update access key." }));
      }
    }
  ), d = () => {
    k(!1), z(null);
  }, F = [
    {
      title: a("serviceAccount.keyName", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: a("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
      dataIndex: "access_key_id",
      key: "access_key_id",
      render: (o) => /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(se, {}),
        /* @__PURE__ */ e.jsx($, { copyable: !0, children: o })
      ] })
    },
    {
      title: a("serviceAccount.keyDescription", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: a("serviceAccount.keyStatus", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (o) => o === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: a("serviceAccount.keyActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: a("serviceAccount.keyDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
      dataIndex: "expires_at",
      key: "expires_at",
      render: (o) => o ? q(o) : /* @__PURE__ */ e.jsx($, { type: "secondary", children: a("serviceAccount.neverExpires", { defaultValue: "Never" }) })
    },
    {
      title: a("serviceAccount.keyLastUsed", { defaultValue: "Last Used" }),
      dataIndex: "last_used",
      key: "last_used",
      render: (o) => o ? q(o) : /* @__PURE__ */ e.jsx($, { type: "secondary", children: a("serviceAccount.keyNeverUsed", { defaultValue: "Never" }) })
    },
    {
      title: _("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (o, T) => /* @__PURE__ */ e.jsxs(I, { size: "small", children: [
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:access_key:update", children: /* @__PURE__ */ e.jsx(pe, { title: a("serviceAccount.updateKey", { defaultValue: "Update Key" }), children: /* @__PURE__ */ e.jsx(
          g,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(Q, {}),
            onClick: () => n(T)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:access_key:delete", children: /* @__PURE__ */ e.jsx(
          ye,
          {
            title: a("serviceAccount.deleteKeyConfirm", { defaultValue: "Are you sure you want to delete this access key?" }),
            onConfirm: () => D(T.id),
            okText: _("confirm", { defaultValue: "Confirm" }),
            cancelText: _("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              g,
              {
                type: "text",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(ie, {})
              }
            )
          }
        ) })
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      G,
      {
        title: /* @__PURE__ */ e.jsxs(I, { children: [
          /* @__PURE__ */ e.jsx(se, {}),
          a("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
        ] }),
        extra: /* @__PURE__ */ e.jsxs(I, { children: [
          /* @__PURE__ */ e.jsx(
            g,
            {
              icon: /* @__PURE__ */ e.jsx(je, {}),
              onClick: S,
              loading: A,
              children: _("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:access_key:create", children: /* @__PURE__ */ e.jsx(
            g,
            {
              type: "primary",
              icon: /* @__PURE__ */ e.jsx(Ae, {}),
              onClick: K,
              children: a("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" })
            }
          ) })
        ] }),
        children: /* @__PURE__ */ e.jsx(
          me,
          {
            columns: F,
            dataSource: P,
            rowKey: "id",
            loading: A,
            pagination: !1
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: f ? a("serviceAccount.updateKey", { defaultValue: "Update Access Key" }) : a("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" }),
        open: E,
        onOk: w,
        confirmLoading: r,
        onCancel: v,
        children: /* @__PURE__ */ e.jsxs(
          y,
          {
            form: c,
            layout: "vertical",
            children: [
              /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "name",
                  label: a("serviceAccount.keyName", { defaultValue: "Key Name" }),
                  rules: [{ required: !0, message: a("serviceAccount.keyNameRequired", { defaultValue: "Please enter a name for the access key." }) }],
                  children: /* @__PURE__ */ e.jsx(Z, { placeholder: a("serviceAccount.keyNamePlaceholder", { defaultValue: "Enter key name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "description",
                  label: a("serviceAccount.keyDescription", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Je,
                    {
                      rows: 3,
                      placeholder: a("serviceAccount.keyDescriptionPlaceholder", { defaultValue: "Enter key description (optional)" })
                    }
                  )
                }
              ),
              f && /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "status",
                  label: a("serviceAccount.keyStatus", { defaultValue: "Status" }),
                  valuePropName: "checked",
                  children: /* @__PURE__ */ e.jsx(
                    ze,
                    {
                      checkedChildren: a("serviceAccount.keyActive", { defaultValue: "Active" }),
                      unCheckedChildren: a("serviceAccount.keyDisabled", { defaultValue: "Disabled" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "expires_at",
                  label: a("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
                  children: /* @__PURE__ */ e.jsx(
                    ke,
                    {
                      showTime: !0,
                      placeholder: a("serviceAccount.selectExpireDate", { defaultValue: "Select expiry date (optional)" }),
                      style: { width: "100%" }
                    }
                  )
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsxs(
      W,
      {
        title: /* @__PURE__ */ e.jsxs(I, { children: [
          /* @__PURE__ */ e.jsx(De, { style: { color: "#faad14" } }),
          a("serviceAccount.secretNoticeTitle", { defaultValue: "Access Key Created - Important!" })
        ] }),
        open: l,
        footer: [
          /* @__PURE__ */ e.jsx(g, { onClick: d, children: _("confirm", { defaultValue: "I have copied the secret key. Close" }) }, "close")
        ],
        closable: !1,
        children: [
          /* @__PURE__ */ e.jsx(
            Ce,
            {
              message: a("serviceAccount.secretNoticeMessage", { defaultValue: "Your new Secret Access Key is displayed below. This is the only time you will be able to see this secret. Please copy it and store it securely." }),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          m && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs($, { strong: !0, children: [
                a("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(re, { copyable: { text: m.access_key_id }, children: m.access_key_id })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs($, { strong: !0, children: [
                a("serviceAccount.secretKey", { defaultValue: "Secret Access Key" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(re, { copyable: { text: m.secret_access_key || "" }, children: m.secret_access_key })
            ] }),
            /* @__PURE__ */ e.jsx(
              g,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Te, {}),
                onClick: () => {
                  const o = `Access Key: ${m.access_key_id}
Secret Key: ${m.secret_access_key}`;
                  x(o);
                },
                block: !0,
                children: a("serviceAccount.copyToClipboard", { defaultValue: "Copy Keys to Clipboard" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}, { Text: ue } = ve, He = ({ serviceAccount: t, onRefresh: a, loading: _ }) => {
  const { id: E } = t || {}, { t: u } = O("authorization"), { t: c } = O("common"), [f, i] = V([]), [m, z] = V([]), { hasPermission: l } = oe();
  he(() => {
    z((t == null ? void 0 : t.roles) || []);
  }, [t]);
  const [k, P] = V(void 0), A = t == null ? void 0 : t.organization_id, { loading: S } = C(async () => b.authorization.listRoles({
    current: 1,
    page_size: 20,
    search: k,
    ...A ? { organization_id: A } : {}
  }), {
    onSuccess: (n) => {
      const v = n.data;
      m.forEach((w) => {
        v.find((d) => d.id === w.id) || v.push(w);
      }), i(v);
    },
    onError: (n) => {
      console.error("Failed to load roles:", n), h.error(u("serviceAccount.loadRolesError", { defaultValue: "Failed to load roles." }));
    },
    debounceWait: 300,
    refreshDeps: [k, A]
  }), { run: D, loading: x } = C(async () => {
    if (E)
      return b.authorization.assignServiceAccountRoles({ id: E }, { role_ids: m.map((n) => n.id) });
  }, {
    onSuccess: () => {
      h.success(u("serviceAccount.assignRolesSuccess", { defaultValue: "Roles assigned successfully." })), a();
    },
    onError: (n) => {
      console.error("Failed to assign roles:", n), h.error(u("serviceAccount.assignRolesError", { defaultValue: "Failed to assign roles." }));
    },
    manual: !0
  }), K = (n) => {
    z(n.map((v) => f.find((w) => w.id === v) || {
      id: v,
      name: v,
      description: v
    }));
  };
  return /* @__PURE__ */ e.jsx(
    G,
    {
      title: /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(X, {}),
        u("serviceAccount.authorization", { defaultValue: "Authorization" })
      ] }),
      extra: /* @__PURE__ */ e.jsx(
        g,
        {
          icon: /* @__PURE__ */ e.jsx(je, {}),
          onClick: () => {
            a();
          },
          disabled: _ || x,
          loading: x,
          children: c("refresh", { defaultValue: "Refresh" })
        }
      ),
      children: x ? /* @__PURE__ */ e.jsx(Ee, { active: !0, paragraph: { rows: 4 } }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(ue, { children: u("serviceAccount.roles", { defaultValue: "Roles" }) }),
          /* @__PURE__ */ e.jsx("div", { style: { marginTop: 8 }, children: m.length > 0 ? f.filter((n) => m.some((v) => v.id === n.id)).map((n) => /* @__PURE__ */ e.jsx(B, { color: "blue", children: n.name }, n.id)) : /* @__PURE__ */ e.jsx(
            H,
            {
              image: H.PRESENTED_IMAGE_SIMPLE,
              description: u("serviceAccount.noRoles", { defaultValue: "No roles assigned." }),
              style: { margin: "10px 0" }
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(ue, { children: u("serviceAccount.assignRoles", { defaultValue: "Assign Roles" }) }),
          /* @__PURE__ */ e.jsx(
            Y,
            {
              mode: "multiple",
              style: { width: "100%", marginTop: 8 },
              placeholder: u("serviceAccount.selectRoles", { defaultValue: "Select roles to assign" }),
              value: m.map((n) => n.id),
              onSearch: (n) => {
                P(n);
              },
              onOpenChange: (n) => {
                n && P(void 0);
              },
              disabled: !l("authorization:service_account:role:assign"),
              onChange: K,
              loading: _ || S,
              optionFilterProp: "label",
              options: f.map((n) => ({
                label: n.name,
                value: n.id,
                title: n.description
              }))
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:role:assign", children: /* @__PURE__ */ e.jsx(
          g,
          {
            type: "primary",
            onClick: D,
            loading: x,
            disabled: _,
            children: u("serviceAccount.assignRoles", { defaultValue: "Assign Roles" })
          }
        ) }) })
      ] })
    }
  );
}, { TabPane: J } = xe, Qe = {
  allow_all: {
    Statement: [
      {
        Effect: "Allow",
        Action: ["*"]
      }
    ]
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
}, Xe = Ge(({ css: t }) => ({
  rolePolicy: t`
       .ant-collapse-content>.ant-collapse-content-box{
        padding: 2px;
      }
      .ant-form-item-additional>#policy_document_extra{
        min-height: 0;
      }
    `,
  rolePermissionExtra: t`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
  rolePolicyExtra: t`
      position: absolute;
      right: 20px;
      top: 5px;
    `
})), Ye = () => {
  const { styles: t } = Xe(), u = Ne().hash.replace("#", "") || "basic", { t: c } = O("authorization"), { t: f } = O("common"), { id: i } = Ue(), m = ge(), { hasPermission: z } = oe(), [l, k] = V(null), [P, A] = V(!1), [S] = y.useForm(), [D, x] = V(!1), { loading: K, refresh: n } = C(
    () => b.authorization.getServiceAccountById({ id: i }),
    {
      refreshDeps: [i],
      ready: !!i,
      onSuccess: (j) => {
        k(j || null);
      },
      onError: () => {
        h.error(c("serviceAccount.loadError", { defaultValue: "Failed to load service account." }));
      }
    }
  ), v = (j) => {
    m(`#${j}`);
  }, { run: w } = C(
    () => b.authorization.deleteServiceAccount({ id: i }),
    {
      manual: !0,
      onSuccess: () => {
        h.success(
          c("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully." })
        ), m("/authorization/service-accounts");
      },
      onError: (j) => {
        console.error(
          c("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }),
          j
        ), h.error(c("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }));
      }
    }
  ), r = () => {
    i && w();
  }, { run: d, loading: F } = C(async () => {
    if (l)
      return b.authorization.updateServiceAccountStatus({ id: i }, {
        status: l.status === "active" ? "disabled" : "active"
      });
  }, {
    onSuccess: (j) => {
      k(j || null), h.success(c("serviceAccount.statusUpdateSuccess", { defaultValue: "Service account status updated successfully." }));
    },
    onError: (j) => {
      console.error(c("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }), j), h.error(c("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }));
    },
    manual: !0
  }), { run: o } = C(
    (j) => b.authorization.setServiceAccountPolicy({ id: i }, { policy_document: j }),
    {
      manual: !0,
      onSuccess: () => {
        h.success(
          c("serviceAccount.policyUpdateSuccess", { defaultValue: "Policy document updated successfully." })
        ), A(!1), n();
      },
      onError: (j) => {
        console.error(
          c("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }),
          j
        ), h.error(c("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }));
      }
    }
  ), T = (j) => {
    if (!i) return;
    let U;
    try {
      U = JSON.parse(j.policy_document);
    } catch {
      h.error(c("serviceAccount.policyInvalidJson", { defaultValue: "Invalid JSON format for policy document." }));
      return;
    }
    o(U);
  };
  return i ? K ? /* @__PURE__ */ e.jsx(ne, { size: "large", style: { display: "flex", justifyContent: "center", padding: "50px" } }) : l ? /* @__PURE__ */ e.jsxs(
    G,
    {
      title: /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(Re, {}),
        l.name,
        l.status === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: c("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: c("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          g,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Q, {}),
            onClick: () => x(!0),
            disabled: D,
            children: f("edit", { defaultValue: "Edit" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          g,
          {
            icon: l.status === "active" ? /* @__PURE__ */ e.jsx(X, {}) : /* @__PURE__ */ e.jsx(ae, {}),
            onClick: d,
            loading: F,
            children: l.status === "active" ? f("disable", { defaultValue: "Disable" }) : f("enable", { defaultValue: "Enable" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(
          ye,
          {
            title: c("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: r,
            okText: f("confirm", { defaultValue: "Confirm" }),
            cancelText: f("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(g, { danger: !0, icon: /* @__PURE__ */ e.jsx(ie, {}), children: f("delete", { defaultValue: "Delete" }) })
          }
        ) }),
        /* @__PURE__ */ e.jsx(g, { icon: /* @__PURE__ */ e.jsx(Ke, {}), onClick: () => m("/authorization/service-accounts"), children: f("back", { defaultValue: "Back" }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(xe, { defaultActiveKey: u, onChange: v, children: [
          /* @__PURE__ */ e.jsx(J, { tab: c("serviceAccount.tabs.basic", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(L, { bordered: !0, column: 2, children: [
            /* @__PURE__ */ e.jsx(L.Item, { label: c("serviceAccount.name", { defaultValue: "Name" }), span: 2, children: l.name }),
            /* @__PURE__ */ e.jsx(L.Item, { label: c("serviceAccount.description", { defaultValue: "Description" }), span: 2, children: l.description || c("serviceAccount.noDescription", { defaultValue: "N/A" }) }),
            /* @__PURE__ */ e.jsx(L.Item, { label: c("serviceAccount.status", { defaultValue: "Status" }), children: l.status === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: c("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: c("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) }) }),
            /* @__PURE__ */ e.jsx(L.Item, { label: c("serviceAccount.lastAccess", { defaultValue: "Last Access" }), children: l.last_access ? q(l.last_access) : c("serviceAccount.neverAccessed", { defaultValue: "Never" }) }),
            /* @__PURE__ */ e.jsx(L.Item, { label: c("serviceAccount.createdAt", { defaultValue: "Created At" }), children: q(l.created_at) }),
            /* @__PURE__ */ e.jsx(L.Item, { label: c("serviceAccount.updatedAt", { defaultValue: "Updated At" }), children: q(l.updated_at) })
          ] }) }, "basic"),
          /* @__PURE__ */ e.jsx(
            J,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(se, {}),
                c("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
              ] }),
              disabled: !z("authorization:service_account:access_key:list"),
              children: /* @__PURE__ */ e.jsx(We, { serviceAccountID: i })
            },
            "access-keys"
          ),
          /* @__PURE__ */ e.jsx(
            J,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(X, {}),
                c("serviceAccount.authorization", { defaultValue: "Authorization" })
              ] }),
              disabled: !z("authorization:service_account:role:list"),
              children: /* @__PURE__ */ e.jsx(
                He,
                {
                  serviceAccount: l,
                  onRefresh: n
                }
              )
            },
            "authorization"
          ),
          /* @__PURE__ */ e.jsxs(
            J,
            {
              tab: c("serviceAccount.tabs.policy", { defaultValue: "Policy Document" }),
              disabled: !z("authorization:service_account:policy:view"),
              children: [
                /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(fe, { justify: "end", children: /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:policy:update", children: /* @__PURE__ */ e.jsx(
                  g,
                  {
                    type: "primary",
                    icon: /* @__PURE__ */ e.jsx(Q, {}),
                    onClick: () => {
                      A(!0), S.setFieldsValue({
                        policy_document: JSON.stringify(l.policy_document, null, 2)
                      });
                    },
                    children: c("serviceAccount.editPolicy", { defaultValue: "Edit Policy" })
                  }
                ) }) }) }) }),
                /* @__PURE__ */ e.jsx(ne, { spinning: K, children: l.policy_document && l.policy_document.Statement && l.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx("pre", { style: { whiteSpace: "pre-wrap", overflowX: "auto" }, children: JSON.stringify(l.policy_document, null, 2) }) }) : /* @__PURE__ */ e.jsx(H, { description: c("serviceAccount.noPolicy", { defaultValue: "No policy document defined for this service account." }) }) })
              ]
            },
            "policy"
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: c("serviceAccount.editPolicy", { defaultValue: "Edit Policy" }),
            open: P,
            onCancel: () => {
              A(!1), S.resetFields();
            },
            footer: null,
            width: 700,
            children: /* @__PURE__ */ e.jsxs(y, { form: S, layout: "vertical", onFinish: T, children: [
              /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "policy_document",
                  extra: /* @__PURE__ */ e.jsx("span", { className: t.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                    Y,
                    {
                      style: { width: 120 },
                      placeholder: c("serviceAccount.insertTemplate", { defaultValue: "Insert Template" }),
                      value: c("serviceAccount.insertTemplate", { defaultValue: "Insert Template" }),
                      options: [
                        { label: c("serviceAccount.allowAll", { defaultValue: "Allow All" }), value: "allow_all" },
                        { label: c("serviceAccount.denyAll", { defaultValue: "Deny All" }), value: "deny_all" },
                        { label: c("serviceAccount.allowWithAction", { defaultValue: "Allow with Action" }), value: "allow_with_action" },
                        { label: c("serviceAccount.denyWithCondition", { defaultValue: "Allow with Condition" }), value: "allow_with_condition" },
                        { label: c("serviceAccount.allowWithUri", { defaultValue: "Allow with URI" }), value: "allow_with_uri" }
                      ],
                      onChange: (j) => {
                        const U = Qe[j];
                        U && S.setFieldValue("policy_document", JSON.stringify(U, null, 2));
                      }
                    }
                  ) }),
                  children: /* @__PURE__ */ e.jsx(
                    de,
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
              ),
              /* @__PURE__ */ e.jsx(y.Item, { children: /* @__PURE__ */ e.jsxs(I, { children: [
                /* @__PURE__ */ e.jsx(g, { type: "primary", htmlType: "submit", children: f("save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(g, { onClick: () => A(!1), children: f("cancel", { defaultValue: "Cancel" }) })
              ] }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          Se,
          {
            serviceAccountID: i,
            onClose: () => x(!1),
            open: D
          }
        )
      ]
    }
  ) : /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px 0" }, children: /* @__PURE__ */ e.jsx(H, { description: c("serviceAccount.notFound", { defaultValue: "Service account not found." }) }) }) : /* @__PURE__ */ e.jsx(Be, {});
}, ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ye
}, Symbol.toStringTag, { value: "Module" }));
export {
  pt as S,
  ft as a
};
