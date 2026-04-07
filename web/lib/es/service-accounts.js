import { j as e, T as de } from "./vendor.js";
import { useState as y, useEffect as J, useCallback as _e } from "react";
import { Form as m, message as f, Modal as H, Radio as te, Select as Z, Input as ee, Space as P, Button as A, Tooltip as he, Tag as L, Badge as N, Card as q, Row as fe, Col as ce, Table as pe, Typography as ye, Popconfirm as ve, Switch as ke, DatePicker as ze, Alert as we, Skeleton as Ce, Empty as Q, Spin as ne, Tabs as me, Descriptions as U } from "antd";
import { TeamOutlined as Ee, CheckCircleOutlined as se, CloseCircleOutlined as Fe, EyeOutlined as Ie, EditOutlined as X, LockOutlined as Y, DeleteOutlined as oe, ReloadOutlined as Te, PlusOutlined as xe, KeyOutlined as ie, SyncOutlined as Ae, CopyOutlined as Pe, ExclamationCircleOutlined as De, RollbackOutlined as Ke, UserOutlined as Re } from "@ant-design/icons";
import { useNavigate as je, Link as Oe, useLocation as Ne, useParams as Ue } from "react-router-dom";
import { f as B, b as Le } from "./components.js";
import { a as w } from "./index.js";
import { P as ae, f as M } from "./base.js";
import { useTranslation as R } from "react-i18next";
import { b as ge, c as Ve, a as Me } from "./contexts.js";
import Be from "./not_found.js";
import { useRequest as G } from "ahooks";
import qe from "dayjs";
import { createStyles as Ge } from "antd-style";
const Se = ({
  serviceAccountID: t,
  onClose: c,
  open: _ = !1,
  onSuccess: F,
  enableMultiOrg: p = !1,
  organizations: a = []
}) => {
  const { hasGlobalPermission: v } = ge(), { t: l } = R("authorization"), { t: x } = R("common"), { currentOrgId: j } = Ve(), [o] = m.useForm(), [I, g] = y(!1), [C, E] = y("global"), [V, k] = y(void 0), [n, u] = y(null), { run: T, loading: D } = G((h) => {
    if (t) {
      const { organization_id: z, ...r } = h;
      return w.authorization.updateServiceAccount({ id: t }, r);
    }
    const S = {
      name: h.name,
      description: h.description
    };
    return C === "organization" && V && (S.organization_id = V), w.authorization.createServiceAccount(S);
  }, {
    onSuccess: () => {
      f.success(l("serviceAccount.saveSuccess", { defaultValue: "Service account saved successfully." })), c(), F == null || F();
    },
    onError: () => {
      f.error(l("serviceAccount.saveError", { defaultValue: "Failed to save service account." }));
    },
    manual: !0
  });
  return J(() => {
    const h = async (S) => {
      var z;
      g(!0);
      try {
        const r = await w.authorization.getServiceAccountById({ id: S }), b = r.organization_id || "";
        E(b ? "organization" : "global"), k(b || void 0), u(b ? ((z = r.organization) == null ? void 0 : z.name) ?? b : null), o.setFieldsValue({
          name: r.name,
          description: r.description,
          organization_id: b || void 0
        });
      } catch {
        f.error(l("serviceAccount.loadError", { defaultValue: "Failed to load service account." }));
      } finally {
        g(!1);
      }
    };
    if (_) {
      o.resetFields();
      const S = j || (a.length > 0 ? a[0].id : ""), z = p && S ? "organization" : "global";
      E(z), k(z === "organization" ? S : void 0), t ? h(t) : (u(null), o.setFieldsValue({
        organization_id: z === "organization" ? S : void 0
      }));
    }
  }, [t, _, p, a, j]), /* @__PURE__ */ e.jsx(
    H,
    {
      title: t ? l("serviceAccount.edit", { defaultValue: "Edit Service Account" }) : l("serviceAccount.create", { defaultValue: "Create Service Account" }),
      width: 500,
      loading: I,
      afterOpenChange: (h) => {
        h || (o.resetFields(), c());
      },
      onCancel: () => {
        o.resetFields(), c();
      },
      open: _,
      footer: /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(A, { onClick: c, children: x("cancel", { defaultValue: "Cancel" }) }),
        /* @__PURE__ */ e.jsx(
          A,
          {
            type: "primary",
            onClick: o.submit,
            loading: D || I,
            children: x("save", { defaultValue: "Save" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(
        m,
        {
          form: o,
          layout: "vertical",
          onFinish: T,
          children: [
            p && !t && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(m.Item, { label: l("serviceAccount.scope", { defaultValue: "Scope" }), children: /* @__PURE__ */ e.jsxs(
                te.Group,
                {
                  value: C,
                  onChange: (h) => {
                    var r;
                    const S = h.target.value;
                    E(S);
                    const z = S === "organization" ? j || ((r = a[0]) == null ? void 0 : r.id) : void 0;
                    k(z), o.setFieldsValue({ organization_id: z });
                  },
                  disabled: !v("authorization:service_account:create"),
                  children: [
                    /* @__PURE__ */ e.jsx(te, { value: "global", children: l("serviceAccount.global", { defaultValue: "Global" }) }),
                    /* @__PURE__ */ e.jsx(te, { value: "organization", children: l("serviceAccount.organizationScoped", { defaultValue: "Organization" }) })
                  ]
                }
              ) }),
              C === "organization" && /* @__PURE__ */ e.jsx(
                m.Item,
                {
                  name: "organization_id",
                  label: l("serviceAccount.organization", { defaultValue: "Organization" }),
                  rules: [{ required: !0, message: l("serviceAccount.organizationRequired", { defaultValue: "Please select an organization." }) }],
                  children: /* @__PURE__ */ e.jsx(
                    Z,
                    {
                      placeholder: l("serviceAccount.selectOrganization", { defaultValue: "Select organization" }),
                      options: a.map((h) => ({ value: h.id, label: h.name })),
                      value: V,
                      onChange: (h) => k(h)
                    }
                  )
                }
              )
            ] }),
            p && t && /* @__PURE__ */ e.jsx(m.Item, { label: l("serviceAccount.organization", { defaultValue: "Organization" }), children: /* @__PURE__ */ e.jsx("span", { children: n ?? l("serviceAccount.global", { defaultValue: "Global" }) }) }),
            /* @__PURE__ */ e.jsx(
              m.Item,
              {
                label: l("serviceAccount.name", { defaultValue: "Name" }),
                name: "name",
                rules: [{ required: !0, message: l("serviceAccount.nameRequired", { defaultValue: "Please enter a name for the service account." }) }],
                children: /* @__PURE__ */ e.jsx(ee, { placeholder: l("serviceAccount.namePlaceholder", { defaultValue: "Enter service account name" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              m.Item,
              {
                label: l("serviceAccount.description", { defaultValue: "Description" }),
                name: "description",
                children: /* @__PURE__ */ e.jsx(de, { rows: 4, placeholder: l("serviceAccount.descriptionPlaceholder", { defaultValue: "Enter service account description (optional)" }) })
              }
            )
          ]
        }
      )
    }
  );
}, $e = () => {
  const { t } = R("authorization"), { t: c } = R("common"), _ = je(), [F] = m.useForm(), { siteConfig: p } = Ve(), { user: a } = Me(), v = (a == null ? void 0 : a.organizations) || [], l = (p == null ? void 0 : p.enable_multi_org) ?? !1, [x, j] = y(!1), [o, I] = y([]), [g, C] = y(0), [E, V] = y(!1), [k, n] = y(null), [u, T] = y({
    current: ae.DEFAULT_CURRENT,
    page_size: ae.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), D = _e(async () => {
    try {
      j(!0);
      const s = await w.authorization.getServiceAccounts(u);
      I(s.data || []), C(s.total || 0);
    } catch (s) {
      console.error(t("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }), s), f.error(t("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }));
    } finally {
      j(!1);
    }
  }, [u, t]);
  J(() => {
    D();
  }, [D]);
  const h = (s) => {
    T({
      ...u,
      current: ae.DEFAULT_CURRENT,
      search: s.search,
      organization_id: s.organization_id || void 0
    });
  }, S = (s, d) => {
    T((O) => ({
      ...O,
      current: s,
      page_size: d
    }));
  }, z = () => {
    n(null), V(!0);
  }, r = (s) => {
    n(s.id), V(!0);
  }, b = () => {
    V(!1);
  }, i = async (s) => {
    try {
      await w.authorization.deleteServiceAccount({ id: s }), f.success(t("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully" })), D();
    } catch (d) {
      console.error(t("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }), d), f.error(t("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }));
    }
  }, K = async (s) => {
    const d = s.status === "active" ? "disabled" : "active";
    try {
      await w.authorization.updateServiceAccountStatus({ id: s.id }, { status: d }), f.success(t("serviceAccount.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), D();
    } catch (O) {
      console.error(t("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" }), O), f.error(t("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" }));
    }
  }, be = [
    {
      title: t("serviceAccount.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (s, d) => /* @__PURE__ */ e.jsx(B, { permission: "authorization:service_account:view", fallback: s, children: /* @__PURE__ */ e.jsx(Oe, { to: `/authorization/service-accounts/${d.id}`, children: s }) })
    },
    {
      title: t("serviceAccount.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description",
      render: (s) => /* @__PURE__ */ e.jsx(he, { title: s, children: /* @__PURE__ */ e.jsx("span", { children: (s == null ? void 0 : s.length) > 30 ? `${s.substring(0, 30)}...` : s }) })
    },
    ...l ? [
      {
        title: t("serviceAccount.organization", { defaultValue: "Organization" }),
        key: "organization",
        render: (s, d) => {
          var O;
          return d.organization_id ? /* @__PURE__ */ e.jsx(L, { icon: /* @__PURE__ */ e.jsx(Ee, {}), color: "blue", children: ((O = d.organization) == null ? void 0 : O.name) || d.organization_id }) : /* @__PURE__ */ e.jsx(L, { color: "default", children: t("serviceAccount.global", { defaultValue: "Global" }) });
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
      render: (s, d) => {
        var O;
        return /* @__PURE__ */ e.jsxs(P, { size: [0, 4], wrap: !0, children: [
          (O = d.roles) == null ? void 0 : O.map((le) => /* @__PURE__ */ e.jsx(L, { color: "blue", children: le.name }, le.id)),
          (!d.roles || d.roles.length === 0) && /* @__PURE__ */ e.jsx(L, { children: t("serviceAccount.noRoles", { defaultValue: "No Roles" }) })
        ] });
      }
    },
    {
      title: t("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }),
      key: "policy",
      render: (s, d) => d.policy_document && d.policy_document.Statement && d.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(L, { color: "green", icon: /* @__PURE__ */ e.jsx(se, {}), children: t("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }) }) : /* @__PURE__ */ e.jsx(L, { color: "default", icon: /* @__PURE__ */ e.jsx(Fe, {}), children: t("serviceAccount.noPolicy", { defaultValue: "No Policy" }) })
    },
    {
      title: t("serviceAccount.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (s) => M(s)
    },
    {
      title: t("serviceAccount.lastAccess", { defaultValue: "Last Access" }),
      dataIndex: "last_access",
      key: "last_access",
      render: (s) => s ? M(s) : t("serviceAccount.neverAccessed", { defaultValue: "Never Accessed" })
    },
    {
      title: c("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (s, d) => /* @__PURE__ */ e.jsx(
        Le,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              tooltip: t("serviceAccount.viewDetail", { defaultValue: "View Service Account Details" }),
              onClick: async () => _(`/authorization/service-accounts/${d.id}`),
              permission: "authorization:service_account:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(X, {}),
              tooltip: t("serviceAccount.edit", { defaultValue: "Edit Service Account" }),
              onClick: async () => r(d),
              permission: "authorization:service_account:update"
            },
            {
              key: "toggleStatus",
              icon: d.status === "active" ? /* @__PURE__ */ e.jsx(Y, {}) : /* @__PURE__ */ e.jsx(se, {}),
              tooltip: d.status === "active" ? t("serviceAccount.actionTooltipDisable", { defaultValue: "Disable this service account" }) : t("serviceAccount.actionTooltipEnable", { defaultValue: "Enable this service account" }),
              onClick: async () => K(d),
              permission: "authorization:service_account:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(oe, {}),
              danger: !0,
              tooltip: t("serviceAccount.delete", { defaultValue: "Delete Service Account" }),
              confirm: {
                title: t("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
                onConfirm: async () => i(d.id),
                okText: c("confirm", { defaultValue: "Confirm" }),
                cancelText: c("cancel", { defaultValue: "Cancel" })
              },
              permission: "authorization:service_account:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(q, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      m,
      {
        form: F,
        layout: "vertical",
        onFinish: h,
        name: "serviceAccountSearchForm",
        initialValues: {
          search: u.search,
          organization_id: u.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(fe, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(P, { children: [
            /* @__PURE__ */ e.jsx(m.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              ee.Search,
              {
                placeholder: t("serviceAccount.searchPlaceholder", { defaultValue: "Search by name or description" }),
                allowClear: !0,
                onSearch: () => {
                  h(F.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            !l && /* @__PURE__ */ e.jsx(m.Item, { name: "organization_id", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              Z,
              {
                placeholder: t("serviceAccount.filterByOrg", { defaultValue: "All organizations" }),
                allowClear: !0,
                style: { minWidth: 160 },
                options: [
                  { value: "", label: t("serviceAccount.global", { defaultValue: "Global" }) },
                  ...v.map((s) => ({ value: s.id, label: s.name }))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(P, { children: [
            /* @__PURE__ */ e.jsx(
              A,
              {
                onClick: () => {
                  h(F.getFieldsValue());
                },
                icon: /* @__PURE__ */ e.jsx(Te, {}),
                children: c("refresh", { defaultValue: "Refresh" })
              }
            ),
            /* @__PURE__ */ e.jsx(B, { permission: "authorization:service_account:create", children: /* @__PURE__ */ e.jsx(
              A,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(xe, {}),
                onClick: z,
                children: t("serviceAccount.create", { defaultValue: "Create Service Account" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(q, { children: /* @__PURE__ */ e.jsx(
      pe,
      {
        rowKey: "id",
        dataSource: o,
        columns: be,
        loading: x,
        pagination: {
          current: u.current,
          pageSize: u.page_size,
          total: g,
          onChange: S,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (s) => c("totalItems", { defaultValue: `Total ${s} items`, total: s })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Se,
      {
        serviceAccountID: k,
        onClose: b,
        open: E,
        enableMultiOrg: l,
        organizations: v,
        onSuccess: () => {
          D();
        }
      }
    )
  ] });
}, ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $e
}, Symbol.toStringTag, { value: "Module" })), { Text: $, Paragraph: re } = ye, { TextArea: Je } = ee, We = ({ serviceAccountID: t }) => {
  const { t: c } = R("authorization"), { t: _ } = R("common"), [F, p] = y([]), [a, v] = y(!1), [l, x] = y(!1), [j] = m.useForm(), [o, I] = y(null), [g, C] = y(null), [E, V] = y(!1), k = async () => {
    if (t) {
      v(!0);
      try {
        const i = await w.authorization.getServiceAccountAccessKeys({ id: t });
        p(i);
      } catch (i) {
        console.error("Failed to load access keys:", i), f.error(c("serviceAccount.loadKeysError", { defaultValue: "Failed to load access keys." }));
      } finally {
        v(!1);
      }
    }
  };
  J(() => {
    k();
  }, [t]);
  const n = (i) => {
    navigator.clipboard.writeText(i).then(
      () => {
        f.success(c("serviceAccount.copyKeySuccess", { defaultValue: "Copied to clipboard!" }));
      },
      (K) => {
        console.error("Could not copy text: ", K);
      }
    );
  }, u = () => {
    I(null), j.resetFields(), x(!0);
  }, T = (i) => {
    I(i), j.setFieldsValue({
      name: i.name,
      description: i.description,
      status: i.status === "active",
      expires_at: i.expires_at ? qe(i.expires_at) : void 0
    }), x(!0);
  }, D = () => {
    x(!1), j.resetFields();
  }, { run: h, loading: S } = G(
    async () => {
      const i = await j.validateFields();
      if (o) {
        const K = await w.authorization.updateServiceAccountAccessKey({ id: t, keyId: o.id }, {
          name: i.name,
          description: i.description,
          status: i.status ? "active" : "disabled",
          expires_at: i.expires_at ? i.expires_at.toISOString() : void 0
        });
        return x(!1), K;
      } else {
        const K = await w.authorization.createServiceAccountAccessKey({ id: t }, {
          name: i.name,
          description: i.description,
          expires_at: i.expires_at ? i.expires_at.toISOString() : void 0
        });
        C(K), x(!1), V(!0);
      }
    },
    {
      manual: !0,
      onSuccess: () => {
        f.success(c("serviceAccount.updateKeySuccess", { defaultValue: "Access key updated successfully." })), k();
      },
      onError: () => {
        f.error(c("serviceAccount.updateKeyError", { defaultValue: "Failed to update access key." }));
      }
    }
  ), z = async (i) => {
    try {
      await w.authorization.deleteServiceAccountAccessKey({ id: t, keyId: i }), f.success(c("serviceAccount.deleteKeySuccess", { defaultValue: "Access key deleted successfully." })), k();
    } catch (K) {
      console.error("Failed to delete key:", K), f.error(c("serviceAccount.deleteKeyError", { defaultValue: "Failed to delete access key." }));
    }
  }, r = () => {
    V(!1), C(null);
  }, b = [
    {
      title: c("serviceAccount.keyName", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: c("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
      dataIndex: "access_key_id",
      key: "access_key_id",
      render: (i) => /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(ie, {}),
        /* @__PURE__ */ e.jsx($, { copyable: !0, children: i })
      ] })
    },
    {
      title: c("serviceAccount.keyDescription", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: c("serviceAccount.keyStatus", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (i) => i === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: c("serviceAccount.keyActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: c("serviceAccount.keyDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: c("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
      dataIndex: "expires_at",
      key: "expires_at",
      render: (i) => i ? M(i) : /* @__PURE__ */ e.jsx($, { type: "secondary", children: c("serviceAccount.neverExpires", { defaultValue: "Never" }) })
    },
    {
      title: c("serviceAccount.keyLastUsed", { defaultValue: "Last Used" }),
      dataIndex: "last_used",
      key: "last_used",
      render: (i) => i ? M(i) : /* @__PURE__ */ e.jsx($, { type: "secondary", children: c("serviceAccount.keyNeverUsed", { defaultValue: "Never" }) })
    },
    {
      title: _("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (i, K) => /* @__PURE__ */ e.jsxs(P, { size: "small", children: [
        /* @__PURE__ */ e.jsx(he, { title: c("serviceAccount.updateKey", { defaultValue: "Update Key" }), children: /* @__PURE__ */ e.jsx(
          A,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(X, {}),
            onClick: () => T(K)
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          ve,
          {
            title: c("serviceAccount.deleteKeyConfirm", { defaultValue: "Are you sure you want to delete this access key?" }),
            onConfirm: () => z(K.id),
            okText: _("confirm", { defaultValue: "Confirm" }),
            cancelText: _("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              A,
              {
                type: "text",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(oe, {})
              }
            )
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      q,
      {
        title: /* @__PURE__ */ e.jsxs(P, { children: [
          /* @__PURE__ */ e.jsx(ie, {}),
          c("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
        ] }),
        extra: /* @__PURE__ */ e.jsxs(P, { children: [
          /* @__PURE__ */ e.jsx(
            A,
            {
              icon: /* @__PURE__ */ e.jsx(Ae, {}),
              onClick: k,
              loading: a,
              children: _("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            A,
            {
              type: "primary",
              icon: /* @__PURE__ */ e.jsx(xe, {}),
              onClick: u,
              children: c("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" })
            }
          )
        ] }),
        children: /* @__PURE__ */ e.jsx(
          pe,
          {
            columns: b,
            dataSource: F,
            rowKey: "id",
            loading: a,
            pagination: !1
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      H,
      {
        title: o ? c("serviceAccount.updateKey", { defaultValue: "Update Access Key" }) : c("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" }),
        open: l,
        onOk: h,
        confirmLoading: S,
        onCancel: D,
        children: /* @__PURE__ */ e.jsxs(
          m,
          {
            form: j,
            layout: "vertical",
            children: [
              /* @__PURE__ */ e.jsx(
                m.Item,
                {
                  name: "name",
                  label: c("serviceAccount.keyName", { defaultValue: "Key Name" }),
                  rules: [{ required: !0, message: c("serviceAccount.keyNameRequired", { defaultValue: "Please enter a name for the access key." }) }],
                  children: /* @__PURE__ */ e.jsx(ee, { placeholder: c("serviceAccount.keyNamePlaceholder", { defaultValue: "Enter key name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                m.Item,
                {
                  name: "description",
                  label: c("serviceAccount.keyDescription", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Je,
                    {
                      rows: 3,
                      placeholder: c("serviceAccount.keyDescriptionPlaceholder", { defaultValue: "Enter key description (optional)" })
                    }
                  )
                }
              ),
              o && /* @__PURE__ */ e.jsx(
                m.Item,
                {
                  name: "status",
                  label: c("serviceAccount.keyStatus", { defaultValue: "Status" }),
                  valuePropName: "checked",
                  children: /* @__PURE__ */ e.jsx(
                    ke,
                    {
                      checkedChildren: c("serviceAccount.keyActive", { defaultValue: "Active" }),
                      unCheckedChildren: c("serviceAccount.keyDisabled", { defaultValue: "Disabled" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                m.Item,
                {
                  name: "expires_at",
                  label: c("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
                  children: /* @__PURE__ */ e.jsx(
                    ze,
                    {
                      showTime: !0,
                      placeholder: c("serviceAccount.selectExpireDate", { defaultValue: "Select expiry date (optional)" }),
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
      H,
      {
        title: /* @__PURE__ */ e.jsxs(P, { children: [
          /* @__PURE__ */ e.jsx(De, { style: { color: "#faad14" } }),
          c("serviceAccount.secretNoticeTitle", { defaultValue: "Access Key Created - Important!" })
        ] }),
        open: E,
        footer: [
          /* @__PURE__ */ e.jsx(A, { onClick: r, children: _("confirm", { defaultValue: "I have copied the secret key. Close" }) }, "close")
        ],
        closable: !1,
        children: [
          /* @__PURE__ */ e.jsx(
            we,
            {
              message: c("serviceAccount.secretNoticeMessage", { defaultValue: "Your new Secret Access Key is displayed below. This is the only time you will be able to see this secret. Please copy it and store it securely." }),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          g && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs($, { strong: !0, children: [
                c("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(re, { copyable: { text: g.access_key_id }, children: g.access_key_id })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs($, { strong: !0, children: [
                c("serviceAccount.secretKey", { defaultValue: "Secret Access Key" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(re, { copyable: { text: g.secret_access_key || "" }, children: g.secret_access_key })
            ] }),
            /* @__PURE__ */ e.jsx(
              A,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Pe, {}),
                onClick: () => {
                  const i = `Access Key: ${g.access_key_id}
Secret Key: ${g.secret_access_key}`;
                  n(i);
                },
                block: !0,
                children: c("serviceAccount.copyToClipboard", { defaultValue: "Copy Keys to Clipboard" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}, { Text: ue } = ye, He = ({ serviceAccount: t, onRefresh: c, loading: _ }) => {
  const { id: F } = t || {}, { t: p } = R("authorization"), { t: a } = R("common"), [v, l] = y([]), [x, j] = y([]);
  J(() => {
    j((t == null ? void 0 : t.roles) || []);
  }, [t]);
  const [o, I] = y(void 0), g = t == null ? void 0 : t.organization_id, { loading: C } = G(async () => w.authorization.listRoles({
    current: 1,
    page_size: 20,
    search: o,
    ...g ? { organization_id: g } : {}
  }), {
    onSuccess: (n) => {
      const u = n.data;
      x.forEach((T) => {
        u.find((h) => h.id === T.id) || u.push(T);
      }), l(u);
    },
    onError: (n) => {
      console.error("Failed to load roles:", n), f.error(p("serviceAccount.loadRolesError", { defaultValue: "Failed to load roles." }));
    },
    debounceWait: 300,
    refreshDeps: [o, g]
  }), { run: E, loading: V } = G(async () => {
    if (F)
      return w.authorization.assignServiceAccountRoles({ id: F }, { role_ids: x.map((n) => n.id) });
  }, {
    onSuccess: () => {
      f.success(p("serviceAccount.assignRolesSuccess", { defaultValue: "Roles assigned successfully." })), c();
    },
    onError: (n) => {
      console.error("Failed to assign roles:", n), f.error(p("serviceAccount.assignRolesError", { defaultValue: "Failed to assign roles." }));
    },
    manual: !0
  }), k = (n) => {
    j(n.map((u) => v.find((T) => T.id === u) || {
      id: u,
      name: u,
      description: u
    }));
  };
  return /* @__PURE__ */ e.jsx(
    q,
    {
      title: /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(Y, {}),
        p("serviceAccount.authorization", { defaultValue: "Authorization" })
      ] }),
      extra: /* @__PURE__ */ e.jsx(
        A,
        {
          icon: /* @__PURE__ */ e.jsx(Ae, {}),
          onClick: () => {
            c();
          },
          disabled: _ || V,
          loading: V,
          children: a("refresh", { defaultValue: "Refresh" })
        }
      ),
      children: V ? /* @__PURE__ */ e.jsx(Ce, { active: !0, paragraph: { rows: 4 } }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(ue, { children: p("serviceAccount.roles", { defaultValue: "Roles" }) }),
          /* @__PURE__ */ e.jsx("div", { style: { marginTop: 8 }, children: x.length > 0 ? v.filter((n) => x.some((u) => u.id === n.id)).map((n) => /* @__PURE__ */ e.jsx(L, { color: "blue", children: n.name }, n.id)) : /* @__PURE__ */ e.jsx(
            Q,
            {
              image: Q.PRESENTED_IMAGE_SIMPLE,
              description: p("serviceAccount.noRoles", { defaultValue: "No roles assigned." }),
              style: { margin: "10px 0" }
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(ue, { children: p("serviceAccount.assignRoles", { defaultValue: "Assign Roles" }) }),
          /* @__PURE__ */ e.jsx(
            Z,
            {
              mode: "multiple",
              style: { width: "100%", marginTop: 8 },
              placeholder: p("serviceAccount.selectRoles", { defaultValue: "Select roles to assign" }),
              value: x.map((n) => n.id),
              onSearch: (n) => {
                I(n);
              },
              onDropdownVisibleChange: (n) => {
                n && I(void 0);
              },
              onChange: k,
              loading: _ || C,
              optionFilterProp: "label",
              options: v.map((n) => ({
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
            onClick: E,
            loading: V,
            disabled: _,
            children: p("serviceAccount.assignRoles", { defaultValue: "Assign Roles" })
          }
        ) })
      ] })
    }
  );
}, { TabPane: W } = me, Qe = {
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
  const { styles: t } = Xe(), p = Ne().hash.replace("#", "") || "basic", { t: a } = R("authorization"), { t: v } = R("common"), { id: l } = Ue(), x = je(), { hasPermission: j } = ge(), [o, I] = y(null), [g, C] = y(!1), [E] = m.useForm(), [V, k] = y(!1);
  if (!l)
    return /* @__PURE__ */ e.jsx(Be, {});
  const { run: n, loading: u } = G(async () => {
    if (l)
      return w.authorization.getServiceAccountById({ id: l });
  }, {
    onSuccess: (r) => {
      I(r || null);
    }
  });
  J(() => {
    n();
  }, [l]);
  const T = (r) => {
    x(`#${r}`);
  }, D = async () => {
    if (l)
      try {
        await w.authorization.deleteServiceAccount({ id: l }), f.success(a("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully." })), x("/authorization/service-accounts");
      } catch (r) {
        console.error(a("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }), r), f.error(a("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }));
      }
  }, { run: h, loading: S } = G(async () => {
    if (o)
      return w.authorization.updateServiceAccountStatus({ id: l }, { status: o.status === "active" ? "disabled" : "active" });
  }, {
    onSuccess: (r) => {
      I(r || null), f.success(a("serviceAccount.statusUpdateSuccess", { defaultValue: "Service account status updated successfully." }));
    },
    onError: (r) => {
      console.error(a("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }), r), f.error(a("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }));
    },
    manual: !0
  }), z = async (r) => {
    if (l)
      try {
        let b;
        try {
          b = JSON.parse(r.policy_document);
        } catch {
          f.error(a("serviceAccount.policyInvalidJson", { defaultValue: "Invalid JSON format for policy document." }));
          return;
        }
        await w.authorization.setServiceAccountPolicy({ id: l }, { policy_document: b }), f.success(a("serviceAccount.policyUpdateSuccess", { defaultValue: "Policy document updated successfully." })), C(!1), n();
      } catch (b) {
        console.error(a("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }), b), f.error(a("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }));
      }
  };
  return u ? /* @__PURE__ */ e.jsx(ne, { size: "large", style: { display: "flex", justifyContent: "center", padding: "50px" } }) : o ? /* @__PURE__ */ e.jsxs(
    q,
    {
      title: /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(Re, {}),
        o.name,
        o.status === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: a("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: a("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(B, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          A,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(X, {}),
            onClick: () => k(!0),
            disabled: V,
            children: v("edit", { defaultValue: "Edit" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(B, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          A,
          {
            icon: o.status === "active" ? /* @__PURE__ */ e.jsx(Y, {}) : /* @__PURE__ */ e.jsx(se, {}),
            onClick: h,
            loading: S,
            children: o.status === "active" ? v("disable", { defaultValue: "Disable" }) : v("enable", { defaultValue: "Enable" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(B, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(
          ve,
          {
            title: a("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: D,
            okText: v("confirm", { defaultValue: "Confirm" }),
            cancelText: v("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(A, { danger: !0, icon: /* @__PURE__ */ e.jsx(oe, {}), children: v("delete", { defaultValue: "Delete" }) })
          }
        ) }),
        /* @__PURE__ */ e.jsx(A, { icon: /* @__PURE__ */ e.jsx(Ke, {}), onClick: () => x("/authorization/service-accounts"), children: v("back", { defaultValue: "Back" }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(me, { defaultActiveKey: p, onChange: T, children: [
          /* @__PURE__ */ e.jsx(W, { tab: a("serviceAccount.tabs.basic", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(U, { bordered: !0, column: 2, children: [
            /* @__PURE__ */ e.jsx(U.Item, { label: a("serviceAccount.name", { defaultValue: "Name" }), span: 2, children: o.name }),
            /* @__PURE__ */ e.jsx(U.Item, { label: a("serviceAccount.description", { defaultValue: "Description" }), span: 2, children: o.description || a("serviceAccount.noDescription", { defaultValue: "N/A" }) }),
            /* @__PURE__ */ e.jsx(U.Item, { label: a("serviceAccount.status", { defaultValue: "Status" }), children: o.status === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: a("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: a("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) }) }),
            /* @__PURE__ */ e.jsx(U.Item, { label: a("serviceAccount.lastAccess", { defaultValue: "Last Access" }), children: o.last_access ? M(o.last_access) : a("serviceAccount.neverAccessed", { defaultValue: "Never" }) }),
            /* @__PURE__ */ e.jsx(U.Item, { label: a("serviceAccount.createdAt", { defaultValue: "Created At" }), children: M(o.created_at) }),
            /* @__PURE__ */ e.jsx(U.Item, { label: a("serviceAccount.updatedAt", { defaultValue: "Updated At" }), children: M(o.updated_at) })
          ] }) }, "basic"),
          /* @__PURE__ */ e.jsx(
            W,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(ie, {}),
                a("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
              ] }),
              disabled: !j("authorization:service_account:access_key:list"),
              children: /* @__PURE__ */ e.jsx(We, { serviceAccountID: l })
            },
            "access-keys"
          ),
          /* @__PURE__ */ e.jsx(
            W,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(Y, {}),
                a("serviceAccount.authorization", { defaultValue: "Authorization" })
              ] }),
              disabled: !j("authorization:service_account:role:list"),
              children: /* @__PURE__ */ e.jsx(
                He,
                {
                  serviceAccount: o,
                  onRefresh: n
                }
              )
            },
            "authorization"
          ),
          /* @__PURE__ */ e.jsxs(W, { tab: a("serviceAccount.tabs.policy", { defaultValue: "Policy Document" }), children: [
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(fe, { justify: "end", children: /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsx(B, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
              A,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(X, {}),
                onClick: () => {
                  C(!0), E.setFieldsValue({
                    policy_document: JSON.stringify(o.policy_document, null, 2)
                  });
                },
                children: a("serviceAccount.editPolicy", { defaultValue: "Edit Policy" })
              }
            ) }) }) }) }),
            /* @__PURE__ */ e.jsx(ne, { spinning: u, children: o.policy_document && o.policy_document.Statement && o.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(q, { children: /* @__PURE__ */ e.jsx("pre", { style: { whiteSpace: "pre-wrap", overflowX: "auto" }, children: JSON.stringify(o.policy_document, null, 2) }) }) : /* @__PURE__ */ e.jsx(Q, { description: a("serviceAccount.noPolicy", { defaultValue: "No policy document defined for this service account." }) }) })
          ] }, "policy")
        ] }),
        /* @__PURE__ */ e.jsx(
          H,
          {
            title: a("serviceAccount.editPolicy", { defaultValue: "Edit Policy" }),
            open: g,
            onCancel: () => {
              C(!1), E.resetFields();
            },
            footer: null,
            width: 700,
            children: /* @__PURE__ */ e.jsxs(m, { form: E, layout: "vertical", onFinish: z, children: [
              /* @__PURE__ */ e.jsx(
                m.Item,
                {
                  name: "policy_document",
                  extra: /* @__PURE__ */ e.jsx("span", { className: t.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                    Z,
                    {
                      style: { width: 120 },
                      placeholder: a("serviceAccount.insertTemplate", { defaultValue: "Insert Template" }),
                      value: a("serviceAccount.insertTemplate", { defaultValue: "Insert Template" }),
                      options: [
                        { label: a("serviceAccount.allowAll", { defaultValue: "Allow All" }), value: "allow_all" },
                        { label: a("serviceAccount.denyAll", { defaultValue: "Deny All" }), value: "deny_all" },
                        { label: a("serviceAccount.allowWithAction", { defaultValue: "Allow with Action" }), value: "allow_with_action" },
                        { label: a("serviceAccount.denyWithCondition", { defaultValue: "Allow with Condition" }), value: "allow_with_condition" },
                        { label: a("serviceAccount.allowWithUri", { defaultValue: "Allow with URI" }), value: "allow_with_uri" }
                      ],
                      onChange: (r) => {
                        const b = Qe[r];
                        b && E.setFieldValue("policy_document", JSON.stringify(b, null, 2));
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
              /* @__PURE__ */ e.jsx(m.Item, { children: /* @__PURE__ */ e.jsxs(P, { children: [
                /* @__PURE__ */ e.jsx(A, { type: "primary", htmlType: "submit", children: v("save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(A, { onClick: () => C(!1), children: v("cancel", { defaultValue: "Cancel" }) })
              ] }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          Se,
          {
            serviceAccountID: l,
            onClose: () => k(!1),
            open: V
          }
        )
      ]
    }
  ) : /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px 0" }, children: /* @__PURE__ */ e.jsx(Q, { description: a("serviceAccount.notFound", { defaultValue: "Service account not found." }) }) });
}, pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ye
}, Symbol.toStringTag, { value: "Module" }));
export {
  ft as S,
  pt as a
};
