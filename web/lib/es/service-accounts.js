import { j as e, T as ue } from "./vendor.js";
import { useState as j, useEffect as de } from "react";
import { useRequest as w } from "ahooks";
import { Form as v, message as d, Modal as W, Radio as ee, Select as Y, Input as Z, Space as T, Button as A, Tooltip as he, Tag as L, Badge as O, Card as G, Row as pe, Col as ce, Table as fe, Typography as me, Popconfirm as ve, Switch as ze, DatePicker as ke, Alert as Ce, Skeleton as Ee, Empty as H, Spin as le, Tabs as ye, Descriptions as M } from "antd";
import { TeamOutlined as we, CheckCircleOutlined as ae, CloseCircleOutlined as Fe, EyeOutlined as Ie, EditOutlined as Q, LockOutlined as X, DeleteOutlined as ie, ReloadOutlined as Te, PlusOutlined as xe, KeyOutlined as se, SyncOutlined as Ae, CopyOutlined as Pe, ExclamationCircleOutlined as De, RollbackOutlined as Ke, UserOutlined as Re } from "@ant-design/icons";
import { useNavigate as je, Link as Oe, useLocation as Ne, useParams as Ue } from "react-router-dom";
import { f as q, b as Me } from "./components.js";
import { a as _ } from "./index.js";
import { P as te, f as B } from "./base.js";
import { useTranslation as K } from "react-i18next";
import { c as ge, u as Ve, b as Le } from "./contexts.js";
import Be from "./not_found.js";
import qe from "dayjs";
import { createStyles as Ge } from "antd-style";
const Se = ({
  serviceAccountID: t,
  onClose: a,
  open: b = !1,
  onSuccess: F,
  enableMultiOrg: u = !1,
  organizations: c = []
}) => {
  const { hasGlobalPermission: p } = ge(), { t: o } = K("authorization"), { t: m } = K("common"), { currentOrgId: k } = Ve(), [l] = v.useForm(), [C, I] = j("global"), [g, V] = j(void 0), [E, S] = j(null), { run: n, loading: y } = w((r) => {
    if (t) {
      const { organization_id: P, ...i } = r;
      return _.authorization.updateServiceAccount({ id: t }, i);
    }
    const f = {
      name: r.name,
      description: r.description
    };
    return C === "organization" && g && (f.organization_id = g), _.authorization.createServiceAccount(f);
  }, {
    onSuccess: () => {
      d.success(o("serviceAccount.saveSuccess", { defaultValue: "Service account saved successfully." })), a(), F == null || F();
    },
    onError: () => {
      d.error(o("serviceAccount.saveError", { defaultValue: "Failed to save service account." }));
    },
    manual: !0
  }), { run: z, loading: R } = w(
    (r) => _.authorization.getServiceAccountById({ id: r }),
    {
      manual: !0,
      onSuccess: (r) => {
        var P;
        const f = r.organization_id || "";
        I(f ? "organization" : "global"), V(f || void 0), S(f ? ((P = r.organization) == null ? void 0 : P.name) ?? f : null), l.setFieldsValue({
          name: r.name,
          description: r.description,
          organization_id: f || void 0
        });
      },
      onError: () => {
        d.error(o("serviceAccount.loadError", { defaultValue: "Failed to load service account." }));
      }
    }
  );
  return de(() => {
    if (b) {
      l.resetFields();
      const r = k || (c.length > 0 ? c[0].id : ""), f = u && r ? "organization" : "global";
      I(f), V(f === "organization" ? r : void 0), t ? z(t) : (S(null), l.setFieldsValue({
        organization_id: f === "organization" ? r : void 0
      }));
    }
  }, [t, b, u, c, k, l, z, o]), /* @__PURE__ */ e.jsx(
    W,
    {
      title: t ? o("serviceAccount.edit", { defaultValue: "Edit Service Account" }) : o("serviceAccount.create", { defaultValue: "Create Service Account" }),
      width: 500,
      loading: R,
      afterOpenChange: (r) => {
        r || (l.resetFields(), a());
      },
      onCancel: () => {
        l.resetFields(), a();
      },
      open: b,
      footer: /* @__PURE__ */ e.jsxs(T, { children: [
        /* @__PURE__ */ e.jsx(A, { onClick: a, children: m("cancel", { defaultValue: "Cancel" }) }),
        /* @__PURE__ */ e.jsx(
          A,
          {
            type: "primary",
            onClick: l.submit,
            loading: y || R,
            children: m("save", { defaultValue: "Save" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(
        v,
        {
          form: l,
          layout: "vertical",
          onFinish: n,
          children: [
            u && !t && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(v.Item, { label: o("serviceAccount.scope", { defaultValue: "Scope" }), children: /* @__PURE__ */ e.jsxs(
                ee.Group,
                {
                  value: C,
                  onChange: (r) => {
                    var i;
                    const f = r.target.value;
                    I(f);
                    const P = f === "organization" ? k || ((i = c[0]) == null ? void 0 : i.id) : void 0;
                    V(P), l.setFieldsValue({ organization_id: P });
                  },
                  disabled: !p("authorization:service_account:create"),
                  children: [
                    /* @__PURE__ */ e.jsx(ee, { value: "global", children: o("serviceAccount.global", { defaultValue: "Global" }) }),
                    /* @__PURE__ */ e.jsx(ee, { value: "organization", children: o("serviceAccount.organizationScoped", { defaultValue: "Organization" }) })
                  ]
                }
              ) }),
              C === "organization" && /* @__PURE__ */ e.jsx(
                v.Item,
                {
                  name: "organization_id",
                  label: o("serviceAccount.organization", { defaultValue: "Organization" }),
                  rules: [{ required: !0, message: o("serviceAccount.organizationRequired", { defaultValue: "Please select an organization." }) }],
                  children: /* @__PURE__ */ e.jsx(
                    Y,
                    {
                      placeholder: o("serviceAccount.selectOrganization", { defaultValue: "Select organization" }),
                      options: c.map((r) => ({ value: r.id, label: r.name })),
                      value: g,
                      onChange: (r) => V(r)
                    }
                  )
                }
              )
            ] }),
            u && t && /* @__PURE__ */ e.jsx(v.Item, { label: o("serviceAccount.organization", { defaultValue: "Organization" }), children: /* @__PURE__ */ e.jsx("span", { children: E ?? o("serviceAccount.global", { defaultValue: "Global" }) }) }),
            /* @__PURE__ */ e.jsx(
              v.Item,
              {
                label: o("serviceAccount.name", { defaultValue: "Name" }),
                name: "name",
                rules: [{ required: !0, message: o("serviceAccount.nameRequired", { defaultValue: "Please enter a name for the service account." }) }],
                children: /* @__PURE__ */ e.jsx(Z, { placeholder: o("serviceAccount.namePlaceholder", { defaultValue: "Enter service account name" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              v.Item,
              {
                label: o("serviceAccount.description", { defaultValue: "Description" }),
                name: "description",
                children: /* @__PURE__ */ e.jsx(ue, { rows: 4, placeholder: o("serviceAccount.descriptionPlaceholder", { defaultValue: "Enter service account description (optional)" }) })
              }
            )
          ]
        }
      )
    }
  );
}, $e = () => {
  const { t } = K("authorization"), { t: a } = K("common"), b = je(), [F] = v.useForm(), { siteConfig: u } = Ve(), { user: c } = Le(), p = (c == null ? void 0 : c.organizations) || [], o = (u == null ? void 0 : u.enable_multi_org) ?? !1, [m, k] = j([]), [l, C] = j(0), [I, g] = j(!1), [V, E] = j(null), [S, n] = j({
    current: te.DEFAULT_CURRENT,
    page_size: te.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), { loading: y, refresh: z } = w(
    () => _.authorization.getServiceAccounts(S),
    {
      refreshDeps: [S],
      debounceWait: 300,
      onSuccess: (s) => {
        k(s.data || []), C(s.total || 0);
      },
      onError: () => {
        d.error(t("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }));
      }
    }
  ), { run: R } = w(
    async ({ id: s }) => _.authorization.deleteServiceAccount({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(
          t("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully" })
        ), z();
      },
      onError: () => {
        d.error(t("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }));
      }
    }
  ), { run: r } = w(
    async (s) => _.authorization.updateServiceAccountStatus(
      { id: s.id },
      { status: s.status }
    ),
    {
      manual: !0,
      onSuccess: () => {
        d.success(
          t("serviceAccount.statusUpdateSuccess", { defaultValue: "Status updated successfully" })
        ), z();
      },
      onError: () => {
        d.error(
          t("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" })
        );
      }
    }
  ), f = (s) => {
    n({
      ...S,
      current: te.DEFAULT_CURRENT,
      search: s.search,
      organization_id: s.organization_id || void 0
    });
  }, P = (s, h) => {
    n((U) => ({
      ...U,
      current: s,
      page_size: h
    }));
  }, i = () => {
    E(null), g(!0);
  }, D = (s) => {
    E(s.id), g(!0);
  }, x = () => {
    g(!1);
  }, N = (s) => {
    R({ id: s });
  }, be = (s) => {
    const h = s.status === "active" ? "disabled" : "active";
    r({ id: s.id, status: h });
  }, _e = [
    {
      title: t("serviceAccount.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (s, h) => /* @__PURE__ */ e.jsx(q, { permission: "authorization:service_account:view", fallback: s, children: /* @__PURE__ */ e.jsx(Oe, { to: `/authorization/service-accounts/${h.id}`, children: s }) })
    },
    {
      title: t("serviceAccount.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description",
      render: (s) => /* @__PURE__ */ e.jsx(he, { title: s, children: /* @__PURE__ */ e.jsx("span", { children: (s == null ? void 0 : s.length) > 30 ? `${s.substring(0, 30)}...` : s }) })
    },
    ...o ? [
      {
        title: t("serviceAccount.organization", { defaultValue: "Organization" }),
        key: "organization",
        render: (s, h) => {
          var U;
          return h.organization_id ? /* @__PURE__ */ e.jsx(L, { icon: /* @__PURE__ */ e.jsx(we, {}), color: "blue", children: ((U = h.organization) == null ? void 0 : U.name) || h.organization_id }) : /* @__PURE__ */ e.jsx(L, { color: "default", children: t("serviceAccount.global", { defaultValue: "Global" }) });
        }
      }
    ] : [],
    {
      title: t("serviceAccount.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (s) => s === "active" ? /* @__PURE__ */ e.jsx(O, { status: "success", text: t("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(O, { status: "error", text: t("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: t("serviceAccount.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (s, h) => {
        var U;
        return /* @__PURE__ */ e.jsxs(T, { size: [0, 4], wrap: !0, children: [
          (U = h.roles) == null ? void 0 : U.map((oe) => /* @__PURE__ */ e.jsx(L, { color: "blue", children: oe.name }, oe.id)),
          (!h.roles || h.roles.length === 0) && /* @__PURE__ */ e.jsx(L, { children: t("serviceAccount.noRoles", { defaultValue: "No Roles" }) })
        ] });
      }
    },
    {
      title: t("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }),
      key: "policy",
      render: (s, h) => h.policy_document && h.policy_document.Statement && h.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(L, { color: "green", icon: /* @__PURE__ */ e.jsx(ae, {}), children: t("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }) }) : /* @__PURE__ */ e.jsx(L, { color: "default", icon: /* @__PURE__ */ e.jsx(Fe, {}), children: t("serviceAccount.noPolicy", { defaultValue: "No Policy" }) })
    },
    {
      title: t("serviceAccount.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (s) => B(s)
    },
    {
      title: t("serviceAccount.lastAccess", { defaultValue: "Last Access" }),
      dataIndex: "last_access",
      key: "last_access",
      render: (s) => s ? B(s) : t("serviceAccount.neverAccessed", { defaultValue: "Never Accessed" })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (s, h) => /* @__PURE__ */ e.jsx(
        Me,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              tooltip: t("serviceAccount.viewDetail", { defaultValue: "View Service Account Details" }),
              onClick: async () => b(`/authorization/service-accounts/${h.id}`),
              permission: "authorization:service_account:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Q, {}),
              tooltip: t("serviceAccount.edit", { defaultValue: "Edit Service Account" }),
              onClick: async () => D(h),
              permission: "authorization:service_account:update"
            },
            {
              key: "toggleStatus",
              icon: h.status === "active" ? /* @__PURE__ */ e.jsx(X, {}) : /* @__PURE__ */ e.jsx(ae, {}),
              tooltip: h.status === "active" ? t("serviceAccount.actionTooltipDisable", { defaultValue: "Disable this service account" }) : t("serviceAccount.actionTooltipEnable", { defaultValue: "Enable this service account" }),
              onClick: async () => be(h),
              permission: "authorization:service_account:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(ie, {}),
              danger: !0,
              tooltip: t("serviceAccount.delete", { defaultValue: "Delete Service Account" }),
              confirm: {
                title: t("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
                onConfirm: async () => N(h.id),
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
      v,
      {
        form: F,
        layout: "vertical",
        onFinish: f,
        name: "serviceAccountSearchForm",
        initialValues: {
          search: S.search,
          organization_id: S.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(pe, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(T, { children: [
            /* @__PURE__ */ e.jsx(v.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              Z.Search,
              {
                placeholder: t("serviceAccount.searchPlaceholder", { defaultValue: "Search by name or description" }),
                allowClear: !0,
                onSearch: () => {
                  f(F.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            !o && /* @__PURE__ */ e.jsx(v.Item, { name: "organization_id", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              Y,
              {
                placeholder: t("serviceAccount.filterByOrg", { defaultValue: "All organizations" }),
                allowClear: !0,
                style: { minWidth: 160 },
                options: [
                  { value: "", label: t("serviceAccount.global", { defaultValue: "Global" }) },
                  ...p.map((s) => ({ value: s.id, label: s.name }))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(T, { children: [
            /* @__PURE__ */ e.jsx(
              A,
              {
                onClick: () => {
                  f(F.getFieldsValue());
                },
                icon: /* @__PURE__ */ e.jsx(Te, {}),
                children: a("refresh", { defaultValue: "Refresh" })
              }
            ),
            /* @__PURE__ */ e.jsx(q, { permission: "authorization:service_account:create", children: /* @__PURE__ */ e.jsx(
              A,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(xe, {}),
                onClick: i,
                children: t("serviceAccount.create", { defaultValue: "Create Service Account" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx(
      fe,
      {
        rowKey: "id",
        dataSource: m,
        columns: _e,
        loading: y,
        pagination: {
          current: S.current,
          pageSize: S.page_size,
          total: l,
          onChange: P,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (s) => a("totalItems", { defaultValue: `Total ${s} items`, total: s })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Se,
      {
        serviceAccountID: V,
        onClose: x,
        open: I,
        enableMultiOrg: o,
        organizations: p,
        onSuccess: () => {
          z();
        }
      }
    )
  ] });
}, pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $e
}, Symbol.toStringTag, { value: "Module" })), { Text: $, Paragraph: ne } = me, { TextArea: Je } = Z, We = ({ serviceAccountID: t }) => {
  const { t: a } = K("authorization"), { t: b } = K("common"), [F, u] = j(!1), [c] = v.useForm(), [p, o] = j(null), [m, k] = j(null), [l, C] = j(!1), {
    data: I = [],
    loading: g,
    refresh: V
  } = w(
    () => _.authorization.getServiceAccountAccessKeys({ id: t }),
    {
      ready: !!t,
      refreshDeps: [t],
      onError: () => {
        d.error(a("serviceAccount.loadKeysError", { defaultValue: "Failed to load access keys." }));
      }
    }
  ), { run: E } = w(
    (i) => _.authorization.deleteServiceAccountAccessKey({ id: t, keyId: i }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(
          a("serviceAccount.deleteKeySuccess", { defaultValue: "Access key deleted successfully." })
        ), V();
      },
      onError: () => {
        d.error(a("serviceAccount.deleteKeyError", { defaultValue: "Failed to delete access key." }));
      }
    }
  ), S = (i) => {
    navigator.clipboard.writeText(i).then(
      () => {
        d.success(a("serviceAccount.copyKeySuccess", { defaultValue: "Copied to clipboard!" }));
      },
      (D) => {
        console.error("Could not copy text: ", D);
      }
    );
  }, n = () => {
    o(null), c.resetFields(), u(!0);
  }, y = (i) => {
    o(i), c.setFieldsValue({
      name: i.name,
      description: i.description,
      status: i.status === "active",
      expires_at: i.expires_at ? qe(i.expires_at) : void 0
    }), u(!0);
  }, z = () => {
    u(!1), c.resetFields();
  }, { run: R, loading: r } = w(
    async () => {
      const i = await c.validateFields();
      if (p) {
        const D = await _.authorization.updateServiceAccountAccessKey({ id: t, keyId: p.id }, {
          name: i.name,
          description: i.description,
          status: i.status ? "active" : "disabled",
          expires_at: i.expires_at ? i.expires_at.toISOString() : void 0
        });
        return u(!1), D;
      } else {
        const D = await _.authorization.createServiceAccountAccessKey({ id: t }, {
          name: i.name,
          description: i.description,
          expires_at: i.expires_at ? i.expires_at.toISOString() : void 0
        });
        k(D), u(!1), C(!0);
      }
    },
    {
      manual: !0,
      onSuccess: () => {
        d.success(a("serviceAccount.updateKeySuccess", { defaultValue: "Access key updated successfully." })), V();
      },
      onError: () => {
        d.error(a("serviceAccount.updateKeyError", { defaultValue: "Failed to update access key." }));
      }
    }
  ), f = () => {
    C(!1), k(null);
  }, P = [
    {
      title: a("serviceAccount.keyName", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: a("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
      dataIndex: "access_key_id",
      key: "access_key_id",
      render: (i) => /* @__PURE__ */ e.jsxs(T, { children: [
        /* @__PURE__ */ e.jsx(se, {}),
        /* @__PURE__ */ e.jsx($, { copyable: !0, children: i })
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
      render: (i) => i === "active" ? /* @__PURE__ */ e.jsx(O, { status: "success", text: a("serviceAccount.keyActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(O, { status: "error", text: a("serviceAccount.keyDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
      dataIndex: "expires_at",
      key: "expires_at",
      render: (i) => i ? B(i) : /* @__PURE__ */ e.jsx($, { type: "secondary", children: a("serviceAccount.neverExpires", { defaultValue: "Never" }) })
    },
    {
      title: a("serviceAccount.keyLastUsed", { defaultValue: "Last Used" }),
      dataIndex: "last_used",
      key: "last_used",
      render: (i) => i ? B(i) : /* @__PURE__ */ e.jsx($, { type: "secondary", children: a("serviceAccount.keyNeverUsed", { defaultValue: "Never" }) })
    },
    {
      title: b("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (i, D) => /* @__PURE__ */ e.jsxs(T, { size: "small", children: [
        /* @__PURE__ */ e.jsx(he, { title: a("serviceAccount.updateKey", { defaultValue: "Update Key" }), children: /* @__PURE__ */ e.jsx(
          A,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(Q, {}),
            onClick: () => y(D)
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          ve,
          {
            title: a("serviceAccount.deleteKeyConfirm", { defaultValue: "Are you sure you want to delete this access key?" }),
            onConfirm: () => E(D.id),
            okText: b("confirm", { defaultValue: "Confirm" }),
            cancelText: b("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              A,
              {
                type: "text",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(ie, {})
              }
            )
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      G,
      {
        title: /* @__PURE__ */ e.jsxs(T, { children: [
          /* @__PURE__ */ e.jsx(se, {}),
          a("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
        ] }),
        extra: /* @__PURE__ */ e.jsxs(T, { children: [
          /* @__PURE__ */ e.jsx(
            A,
            {
              icon: /* @__PURE__ */ e.jsx(Ae, {}),
              onClick: V,
              loading: g,
              children: b("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            A,
            {
              type: "primary",
              icon: /* @__PURE__ */ e.jsx(xe, {}),
              onClick: n,
              children: a("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" })
            }
          )
        ] }),
        children: /* @__PURE__ */ e.jsx(
          fe,
          {
            columns: P,
            dataSource: I,
            rowKey: "id",
            loading: g,
            pagination: !1
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: p ? a("serviceAccount.updateKey", { defaultValue: "Update Access Key" }) : a("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" }),
        open: F,
        onOk: R,
        confirmLoading: r,
        onCancel: z,
        children: /* @__PURE__ */ e.jsxs(
          v,
          {
            form: c,
            layout: "vertical",
            children: [
              /* @__PURE__ */ e.jsx(
                v.Item,
                {
                  name: "name",
                  label: a("serviceAccount.keyName", { defaultValue: "Key Name" }),
                  rules: [{ required: !0, message: a("serviceAccount.keyNameRequired", { defaultValue: "Please enter a name for the access key." }) }],
                  children: /* @__PURE__ */ e.jsx(Z, { placeholder: a("serviceAccount.keyNamePlaceholder", { defaultValue: "Enter key name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                v.Item,
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
              p && /* @__PURE__ */ e.jsx(
                v.Item,
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
                v.Item,
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
        title: /* @__PURE__ */ e.jsxs(T, { children: [
          /* @__PURE__ */ e.jsx(De, { style: { color: "#faad14" } }),
          a("serviceAccount.secretNoticeTitle", { defaultValue: "Access Key Created - Important!" })
        ] }),
        open: l,
        footer: [
          /* @__PURE__ */ e.jsx(A, { onClick: f, children: b("confirm", { defaultValue: "I have copied the secret key. Close" }) }, "close")
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
              /* @__PURE__ */ e.jsx(ne, { copyable: { text: m.access_key_id }, children: m.access_key_id })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs($, { strong: !0, children: [
                a("serviceAccount.secretKey", { defaultValue: "Secret Access Key" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(ne, { copyable: { text: m.secret_access_key || "" }, children: m.secret_access_key })
            ] }),
            /* @__PURE__ */ e.jsx(
              A,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Pe, {}),
                onClick: () => {
                  const i = `Access Key: ${m.access_key_id}
Secret Key: ${m.secret_access_key}`;
                  S(i);
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
}, { Text: re } = me, He = ({ serviceAccount: t, onRefresh: a, loading: b }) => {
  const { id: F } = t || {}, { t: u } = K("authorization"), { t: c } = K("common"), [p, o] = j([]), [m, k] = j([]);
  de(() => {
    k((t == null ? void 0 : t.roles) || []);
  }, [t]);
  const [l, C] = j(void 0), I = t == null ? void 0 : t.organization_id, { loading: g } = w(async () => _.authorization.listRoles({
    current: 1,
    page_size: 20,
    search: l,
    ...I ? { organization_id: I } : {}
  }), {
    onSuccess: (n) => {
      const y = n.data;
      m.forEach((z) => {
        y.find((r) => r.id === z.id) || y.push(z);
      }), o(y);
    },
    onError: (n) => {
      console.error("Failed to load roles:", n), d.error(u("serviceAccount.loadRolesError", { defaultValue: "Failed to load roles." }));
    },
    debounceWait: 300,
    refreshDeps: [l, I]
  }), { run: V, loading: E } = w(async () => {
    if (F)
      return _.authorization.assignServiceAccountRoles({ id: F }, { role_ids: m.map((n) => n.id) });
  }, {
    onSuccess: () => {
      d.success(u("serviceAccount.assignRolesSuccess", { defaultValue: "Roles assigned successfully." })), a();
    },
    onError: (n) => {
      console.error("Failed to assign roles:", n), d.error(u("serviceAccount.assignRolesError", { defaultValue: "Failed to assign roles." }));
    },
    manual: !0
  }), S = (n) => {
    k(n.map((y) => p.find((z) => z.id === y) || {
      id: y,
      name: y,
      description: y
    }));
  };
  return /* @__PURE__ */ e.jsx(
    G,
    {
      title: /* @__PURE__ */ e.jsxs(T, { children: [
        /* @__PURE__ */ e.jsx(X, {}),
        u("serviceAccount.authorization", { defaultValue: "Authorization" })
      ] }),
      extra: /* @__PURE__ */ e.jsx(
        A,
        {
          icon: /* @__PURE__ */ e.jsx(Ae, {}),
          onClick: () => {
            a();
          },
          disabled: b || E,
          loading: E,
          children: c("refresh", { defaultValue: "Refresh" })
        }
      ),
      children: E ? /* @__PURE__ */ e.jsx(Ee, { active: !0, paragraph: { rows: 4 } }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(re, { children: u("serviceAccount.roles", { defaultValue: "Roles" }) }),
          /* @__PURE__ */ e.jsx("div", { style: { marginTop: 8 }, children: m.length > 0 ? p.filter((n) => m.some((y) => y.id === n.id)).map((n) => /* @__PURE__ */ e.jsx(L, { color: "blue", children: n.name }, n.id)) : /* @__PURE__ */ e.jsx(
            H,
            {
              image: H.PRESENTED_IMAGE_SIMPLE,
              description: u("serviceAccount.noRoles", { defaultValue: "No roles assigned." }),
              style: { margin: "10px 0" }
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(re, { children: u("serviceAccount.assignRoles", { defaultValue: "Assign Roles" }) }),
          /* @__PURE__ */ e.jsx(
            Y,
            {
              mode: "multiple",
              style: { width: "100%", marginTop: 8 },
              placeholder: u("serviceAccount.selectRoles", { defaultValue: "Select roles to assign" }),
              value: m.map((n) => n.id),
              onSearch: (n) => {
                C(n);
              },
              onDropdownVisibleChange: (n) => {
                n && C(void 0);
              },
              onChange: S,
              loading: b || g,
              optionFilterProp: "label",
              options: p.map((n) => ({
                label: n.name,
                value: n.id,
                title: n.description
              }))
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(
          A,
          {
            type: "primary",
            onClick: V,
            loading: E,
            disabled: b,
            children: u("serviceAccount.assignRoles", { defaultValue: "Assign Roles" })
          }
        ) })
      ] })
    }
  );
}, { TabPane: J } = ye, Qe = {
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
  const { styles: t } = Xe(), u = Ne().hash.replace("#", "") || "basic", { t: c } = K("authorization"), { t: p } = K("common"), { id: o } = Ue(), m = je(), { hasPermission: k } = ge(), [l, C] = j(null), [I, g] = j(!1), [V] = v.useForm(), [E, S] = j(!1), { loading: n, refresh: y } = w(
    () => _.authorization.getServiceAccountById({ id: o }),
    {
      refreshDeps: [o],
      ready: !!o,
      onSuccess: (x) => {
        C(x || null);
      },
      onError: () => {
        d.error(c("serviceAccount.loadError", { defaultValue: "Failed to load service account." }));
      }
    }
  ), z = (x) => {
    m(`#${x}`);
  }, { run: R } = w(
    () => _.authorization.deleteServiceAccount({ id: o }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(
          c("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully." })
        ), m("/authorization/service-accounts");
      },
      onError: (x) => {
        console.error(
          c("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }),
          x
        ), d.error(c("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }));
      }
    }
  ), r = () => {
    o && R();
  }, { run: f, loading: P } = w(async () => {
    if (l)
      return _.authorization.updateServiceAccountStatus({ id: o }, {
        status: l.status === "active" ? "disabled" : "active"
      });
  }, {
    onSuccess: (x) => {
      C(x || null), d.success(c("serviceAccount.statusUpdateSuccess", { defaultValue: "Service account status updated successfully." }));
    },
    onError: (x) => {
      console.error(c("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }), x), d.error(c("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }));
    },
    manual: !0
  }), { run: i } = w(
    (x) => _.authorization.setServiceAccountPolicy({ id: o }, { policy_document: x }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(
          c("serviceAccount.policyUpdateSuccess", { defaultValue: "Policy document updated successfully." })
        ), g(!1), y();
      },
      onError: (x) => {
        console.error(
          c("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }),
          x
        ), d.error(c("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }));
      }
    }
  ), D = (x) => {
    if (!o) return;
    let N;
    try {
      N = JSON.parse(x.policy_document);
    } catch {
      d.error(c("serviceAccount.policyInvalidJson", { defaultValue: "Invalid JSON format for policy document." }));
      return;
    }
    i(N);
  };
  return o ? n ? /* @__PURE__ */ e.jsx(le, { size: "large", style: { display: "flex", justifyContent: "center", padding: "50px" } }) : l ? /* @__PURE__ */ e.jsxs(
    G,
    {
      title: /* @__PURE__ */ e.jsxs(T, { children: [
        /* @__PURE__ */ e.jsx(Re, {}),
        l.name,
        l.status === "active" ? /* @__PURE__ */ e.jsx(O, { status: "success", text: c("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(O, { status: "error", text: c("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(T, { children: [
        /* @__PURE__ */ e.jsx(q, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          A,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Q, {}),
            onClick: () => S(!0),
            disabled: E,
            children: p("edit", { defaultValue: "Edit" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(q, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          A,
          {
            icon: l.status === "active" ? /* @__PURE__ */ e.jsx(X, {}) : /* @__PURE__ */ e.jsx(ae, {}),
            onClick: f,
            loading: P,
            children: l.status === "active" ? p("disable", { defaultValue: "Disable" }) : p("enable", { defaultValue: "Enable" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(q, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(
          ve,
          {
            title: c("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: r,
            okText: p("confirm", { defaultValue: "Confirm" }),
            cancelText: p("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(A, { danger: !0, icon: /* @__PURE__ */ e.jsx(ie, {}), children: p("delete", { defaultValue: "Delete" }) })
          }
        ) }),
        /* @__PURE__ */ e.jsx(A, { icon: /* @__PURE__ */ e.jsx(Ke, {}), onClick: () => m("/authorization/service-accounts"), children: p("back", { defaultValue: "Back" }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(ye, { defaultActiveKey: u, onChange: z, children: [
          /* @__PURE__ */ e.jsx(J, { tab: c("serviceAccount.tabs.basic", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(M, { bordered: !0, column: 2, children: [
            /* @__PURE__ */ e.jsx(M.Item, { label: c("serviceAccount.name", { defaultValue: "Name" }), span: 2, children: l.name }),
            /* @__PURE__ */ e.jsx(M.Item, { label: c("serviceAccount.description", { defaultValue: "Description" }), span: 2, children: l.description || c("serviceAccount.noDescription", { defaultValue: "N/A" }) }),
            /* @__PURE__ */ e.jsx(M.Item, { label: c("serviceAccount.status", { defaultValue: "Status" }), children: l.status === "active" ? /* @__PURE__ */ e.jsx(O, { status: "success", text: c("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(O, { status: "error", text: c("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) }) }),
            /* @__PURE__ */ e.jsx(M.Item, { label: c("serviceAccount.lastAccess", { defaultValue: "Last Access" }), children: l.last_access ? B(l.last_access) : c("serviceAccount.neverAccessed", { defaultValue: "Never" }) }),
            /* @__PURE__ */ e.jsx(M.Item, { label: c("serviceAccount.createdAt", { defaultValue: "Created At" }), children: B(l.created_at) }),
            /* @__PURE__ */ e.jsx(M.Item, { label: c("serviceAccount.updatedAt", { defaultValue: "Updated At" }), children: B(l.updated_at) })
          ] }) }, "basic"),
          /* @__PURE__ */ e.jsx(
            J,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(se, {}),
                c("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
              ] }),
              disabled: !k("authorization:service_account:access_key:list"),
              children: /* @__PURE__ */ e.jsx(We, { serviceAccountID: o })
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
              disabled: !k("authorization:service_account:role:list"),
              children: /* @__PURE__ */ e.jsx(
                He,
                {
                  serviceAccount: l,
                  onRefresh: y
                }
              )
            },
            "authorization"
          ),
          /* @__PURE__ */ e.jsxs(J, { tab: c("serviceAccount.tabs.policy", { defaultValue: "Policy Document" }), children: [
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(pe, { justify: "end", children: /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsx(q, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
              A,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Q, {}),
                onClick: () => {
                  g(!0), V.setFieldsValue({
                    policy_document: JSON.stringify(l.policy_document, null, 2)
                  });
                },
                children: c("serviceAccount.editPolicy", { defaultValue: "Edit Policy" })
              }
            ) }) }) }) }),
            /* @__PURE__ */ e.jsx(le, { spinning: n, children: l.policy_document && l.policy_document.Statement && l.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx("pre", { style: { whiteSpace: "pre-wrap", overflowX: "auto" }, children: JSON.stringify(l.policy_document, null, 2) }) }) : /* @__PURE__ */ e.jsx(H, { description: c("serviceAccount.noPolicy", { defaultValue: "No policy document defined for this service account." }) }) })
          ] }, "policy")
        ] }),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: c("serviceAccount.editPolicy", { defaultValue: "Edit Policy" }),
            open: I,
            onCancel: () => {
              g(!1), V.resetFields();
            },
            footer: null,
            width: 700,
            children: /* @__PURE__ */ e.jsxs(v, { form: V, layout: "vertical", onFinish: D, children: [
              /* @__PURE__ */ e.jsx(
                v.Item,
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
                      onChange: (x) => {
                        const N = Qe[x];
                        N && V.setFieldValue("policy_document", JSON.stringify(N, null, 2));
                      }
                    }
                  ) }),
                  children: /* @__PURE__ */ e.jsx(
                    ue,
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
              /* @__PURE__ */ e.jsx(v.Item, { children: /* @__PURE__ */ e.jsxs(T, { children: [
                /* @__PURE__ */ e.jsx(A, { type: "primary", htmlType: "submit", children: p("save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(A, { onClick: () => g(!1), children: p("cancel", { defaultValue: "Cancel" }) })
              ] }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          Se,
          {
            serviceAccountID: o,
            onClose: () => S(!1),
            open: E
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
