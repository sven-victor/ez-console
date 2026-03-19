import { j as e, T as fe } from "./vendor.js";
import { useState as m, useEffect as H, useCallback as we } from "react";
import { Form as y, message as h, Modal as Z, Radio as ce, Select as te, Input as ae, Space as D, Button as x, Tooltip as ye, Tag as L, Badge as N, Card as q, Row as se, Col as B, Table as me, Typography as ve, Popconfirm as xe, Switch as Ce, DatePicker as Ee, Alert as Fe, Skeleton as Ie, Empty as X, Spin as re, Tabs as Ae, Descriptions as U } from "antd";
import { TeamOutlined as Te, CheckCircleOutlined as ie, CloseCircleOutlined as Pe, EyeOutlined as Ke, EditOutlined as Y, LockOutlined as ee, DeleteOutlined as le, SearchOutlined as ue, ReloadOutlined as de, PlusOutlined as je, KeyOutlined as oe, SyncOutlined as ge, CopyOutlined as De, ExclamationCircleOutlined as Re, RollbackOutlined as Oe, UserOutlined as Ne } from "@ant-design/icons";
import { useNavigate as Ve, Link as Ue, useLocation as Le, useParams as Me } from "react-router-dom";
import { f as G, b as Be } from "./components.js";
import { a as w } from "./index.js";
import { P as J, f as M } from "./base.js";
import { useTranslation as R } from "react-i18next";
import { b as Se, c as _e, a as Ge } from "./contexts.js";
import qe from "./not_found.js";
import { useRequest as $ } from "ahooks";
import $e from "dayjs";
import { createStyles as Je } from "antd-style";
const be = ({
  serviceAccountID: t,
  onClose: c,
  open: b = !1,
  onSuccess: T,
  enableMultiOrg: p = !1,
  organizations: a = []
}) => {
  const { hasGlobalPermission: v } = Se(), { t: l } = R("authorization"), { t: A } = R("common"), { currentOrgId: j } = _e(), [o] = y.useForm(), [I, g] = m(!1), [C, E] = m("global"), [V, z] = m(void 0), [n, u] = m(null), { run: F, loading: P } = $((f) => {
    if (t) {
      const { organization_id: k, ...r } = f;
      return w.authorization.updateServiceAccount({ id: t }, r);
    }
    const S = {
      name: f.name,
      description: f.description
    };
    return C === "organization" && V && (S.organization_id = V), w.authorization.createServiceAccount(S);
  }, {
    onSuccess: () => {
      h.success(l("serviceAccount.saveSuccess", { defaultValue: "Service account saved successfully." })), c(), T == null || T();
    },
    onError: () => {
      h.error(l("serviceAccount.saveError", { defaultValue: "Failed to save service account." }));
    },
    manual: !0
  });
  return H(() => {
    const f = async (S) => {
      var k;
      g(!0);
      try {
        const r = await w.authorization.getServiceAccountById({ id: S }), _ = r.organization_id || "";
        E(_ ? "organization" : "global"), z(_ || void 0), u(_ ? ((k = r.organization) == null ? void 0 : k.name) ?? _ : null), o.setFieldsValue({
          name: r.name,
          description: r.description,
          organization_id: _ || void 0
        });
      } catch {
        h.error(l("serviceAccount.loadError", { defaultValue: "Failed to load service account." }));
      } finally {
        g(!1);
      }
    };
    if (b) {
      o.resetFields();
      const S = j || (a.length > 0 ? a[0].id : ""), k = p && S ? "organization" : "global";
      E(k), z(k === "organization" ? S : void 0), t ? f(t) : (u(null), o.setFieldsValue({
        organization_id: k === "organization" ? S : void 0
      }));
    }
  }, [t, b, p, a, j]), /* @__PURE__ */ e.jsx(
    Z,
    {
      title: t ? l("serviceAccount.edit", { defaultValue: "Edit Service Account" }) : l("serviceAccount.create", { defaultValue: "Create Service Account" }),
      width: 500,
      loading: I,
      afterOpenChange: (f) => {
        f || (o.resetFields(), c());
      },
      onCancel: () => {
        o.resetFields(), c();
      },
      open: b,
      footer: /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(x, { onClick: c, children: A("cancel", { defaultValue: "Cancel" }) }),
        /* @__PURE__ */ e.jsx(
          x,
          {
            type: "primary",
            onClick: o.submit,
            loading: P || I,
            children: A("save", { defaultValue: "Save" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(
        y,
        {
          form: o,
          layout: "vertical",
          onFinish: F,
          children: [
            p && !t && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(y.Item, { label: l("serviceAccount.scope", { defaultValue: "Scope" }), children: /* @__PURE__ */ e.jsxs(
                ce.Group,
                {
                  value: C,
                  onChange: (f) => {
                    var r;
                    const S = f.target.value;
                    E(S);
                    const k = S === "organization" ? j || ((r = a[0]) == null ? void 0 : r.id) : void 0;
                    z(k), o.setFieldsValue({ organization_id: k });
                  },
                  disabled: !v("authorization:service_account:create"),
                  children: [
                    /* @__PURE__ */ e.jsx(ce, { value: "global", children: l("serviceAccount.global", { defaultValue: "Global" }) }),
                    /* @__PURE__ */ e.jsx(ce, { value: "organization", children: l("serviceAccount.organizationScoped", { defaultValue: "Organization" }) })
                  ]
                }
              ) }),
              C === "organization" && /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "organization_id",
                  label: l("serviceAccount.organization", { defaultValue: "Organization" }),
                  rules: [{ required: !0, message: l("serviceAccount.organizationRequired", { defaultValue: "Please select an organization." }) }],
                  children: /* @__PURE__ */ e.jsx(
                    te,
                    {
                      placeholder: l("serviceAccount.selectOrganization", { defaultValue: "Select organization" }),
                      options: a.map((f) => ({ value: f.id, label: f.name })),
                      value: V,
                      onChange: (f) => z(f)
                    }
                  )
                }
              )
            ] }),
            p && t && /* @__PURE__ */ e.jsx(y.Item, { label: l("serviceAccount.organization", { defaultValue: "Organization" }), children: /* @__PURE__ */ e.jsx("span", { children: n ?? l("serviceAccount.global", { defaultValue: "Global" }) }) }),
            /* @__PURE__ */ e.jsx(
              y.Item,
              {
                label: l("serviceAccount.name", { defaultValue: "Name" }),
                name: "name",
                rules: [{ required: !0, message: l("serviceAccount.nameRequired", { defaultValue: "Please enter a name for the service account." }) }],
                children: /* @__PURE__ */ e.jsx(ae, { placeholder: l("serviceAccount.namePlaceholder", { defaultValue: "Enter service account name" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              y.Item,
              {
                label: l("serviceAccount.description", { defaultValue: "Description" }),
                name: "description",
                children: /* @__PURE__ */ e.jsx(fe, { rows: 4, placeholder: l("serviceAccount.descriptionPlaceholder", { defaultValue: "Enter service account description (optional)" }) })
              }
            )
          ]
        }
      )
    }
  );
}, We = () => {
  const { t } = R("authorization"), { t: c } = R("common"), b = Ve(), [T] = y.useForm(), { siteConfig: p } = _e(), { user: a } = Ge(), v = (a == null ? void 0 : a.organizations) || [], l = (p == null ? void 0 : p.enable_multi_org) ?? !1, [A, j] = m(!1), [o, I] = m([]), [g, C] = m(0), [E, V] = m(!1), [z, n] = m(null), [u, F] = m({
    current: J.DEFAULT_CURRENT,
    page_size: J.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), P = we(async () => {
    try {
      j(!0);
      const s = await w.authorization.getServiceAccounts(u);
      I(s.data || []), C(s.total || 0);
    } catch (s) {
      console.error(t("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }), s), h.error(t("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }));
    } finally {
      j(!1);
    }
  }, [u, t]);
  H(() => {
    P();
  }, [P]);
  const f = (s) => {
    F({
      ...u,
      current: J.DEFAULT_CURRENT,
      search: s.search,
      organization_id: s.organization_id || void 0
    });
  }, S = () => {
    T.resetFields(), F({
      current: J.DEFAULT_CURRENT,
      page_size: J.DEFAULT_PAGE_SIZE,
      search: void 0,
      organization_id: void 0
    });
  }, k = (s, d) => {
    F((O) => ({
      ...O,
      current: s,
      page_size: d
    }));
  }, r = () => {
    n(null), V(!0);
  }, _ = (s) => {
    n(s.id), V(!0);
  }, i = () => {
    V(!1);
  }, K = async (s) => {
    try {
      await w.authorization.deleteServiceAccount({ id: s }), h.success(t("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully" })), P();
    } catch (d) {
      console.error(t("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }), d), h.error(t("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }));
    }
  }, ze = async (s) => {
    const d = s.status === "active" ? "disabled" : "active";
    try {
      await w.authorization.updateServiceAccountStatus({ id: s.id }, { status: d }), h.success(t("serviceAccount.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), P();
    } catch (O) {
      console.error(t("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" }), O), h.error(t("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" }));
    }
  }, ke = [
    {
      title: t("serviceAccount.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (s, d) => /* @__PURE__ */ e.jsx(G, { permission: "authorization:service_account:view", fallback: s, children: /* @__PURE__ */ e.jsx(Ue, { to: `/authorization/service-accounts/${d.id}`, children: s }) })
    },
    {
      title: t("serviceAccount.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description",
      render: (s) => /* @__PURE__ */ e.jsx(ye, { title: s, children: /* @__PURE__ */ e.jsx("span", { children: (s == null ? void 0 : s.length) > 30 ? `${s.substring(0, 30)}...` : s }) })
    },
    ...l ? [
      {
        title: t("serviceAccount.organization", { defaultValue: "Organization" }),
        key: "organization",
        render: (s, d) => {
          var O;
          return d.organization_id ? /* @__PURE__ */ e.jsx(L, { icon: /* @__PURE__ */ e.jsx(Te, {}), color: "blue", children: ((O = d.organization) == null ? void 0 : O.name) || d.organization_id }) : /* @__PURE__ */ e.jsx(L, { color: "default", children: t("serviceAccount.global", { defaultValue: "Global" }) });
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
        return /* @__PURE__ */ e.jsxs(D, { size: [0, 4], wrap: !0, children: [
          (O = d.roles) == null ? void 0 : O.map((ne) => /* @__PURE__ */ e.jsx(L, { color: "blue", children: ne.name }, ne.id)),
          (!d.roles || d.roles.length === 0) && /* @__PURE__ */ e.jsx(L, { children: t("serviceAccount.noRoles", { defaultValue: "No Roles" }) })
        ] });
      }
    },
    {
      title: t("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }),
      key: "policy",
      render: (s, d) => d.policy_document && d.policy_document.Statement && d.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(L, { color: "green", icon: /* @__PURE__ */ e.jsx(ie, {}), children: t("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }) }) : /* @__PURE__ */ e.jsx(L, { color: "default", icon: /* @__PURE__ */ e.jsx(Pe, {}), children: t("serviceAccount.noPolicy", { defaultValue: "No Policy" }) })
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
        Be,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Ke, {}),
              onClick: async () => b(`/authorization/service-accounts/${d.id}`),
              permission: "authorization:service_account:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Y, {}),
              onClick: async () => _(d),
              permission: "authorization:service_account:update"
            },
            {
              key: "toggleStatus",
              icon: d.status === "active" ? /* @__PURE__ */ e.jsx(ee, {}) : /* @__PURE__ */ e.jsx(ie, {}),
              onClick: async () => ze(d),
              permission: "authorization:service_account:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(le, {}),
              danger: !0,
              confirm: {
                title: t("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
                onConfirm: async () => K(d.id)
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
      y,
      {
        form: T,
        layout: "inline",
        onFinish: f,
        initialValues: {
          search: u.search,
          organization_id: u.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(se, { gutter: 16, style: { width: "100%" }, children: [
          /* @__PURE__ */ e.jsx(B, { xs: 24, sm: 12, md: 8, lg: 6, children: /* @__PURE__ */ e.jsx(y.Item, { name: "search", children: /* @__PURE__ */ e.jsx(
            ae,
            {
              placeholder: t("serviceAccount.searchPlaceholder", { defaultValue: "Search by name or description" }),
              allowClear: !0,
              prefix: /* @__PURE__ */ e.jsx(ue, {})
            }
          ) }) }),
          l && /* @__PURE__ */ e.jsx(B, { xs: 24, sm: 12, md: 8, lg: 6, children: /* @__PURE__ */ e.jsx(y.Item, { name: "organization_id", children: /* @__PURE__ */ e.jsx(
            te,
            {
              placeholder: t("serviceAccount.filterByOrg", { defaultValue: "All organizations" }),
              allowClear: !0,
              style: { minWidth: 160 },
              options: [
                { value: "", label: t("serviceAccount.global", { defaultValue: "Global" }) },
                ...v.map((s) => ({ value: s.id, label: s.name }))
              ]
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(B, { xs: 24, sm: 12, md: 8, lg: 6, style: { display: "flex", alignItems: "flex-end" }, children: /* @__PURE__ */ e.jsx(y.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
            /* @__PURE__ */ e.jsx(x, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(ue, {}), children: c("search", { defaultValue: "Search" }) }),
            /* @__PURE__ */ e.jsx(x, { onClick: S, icon: /* @__PURE__ */ e.jsx(de, {}), children: c("reset", { defaultValue: "Reset" }) })
          ] }) }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(q, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(se, { justify: "space-between", align: "middle", children: [
        /* @__PURE__ */ e.jsx(B, { children: /* @__PURE__ */ e.jsx(
          x,
          {
            type: "primary",
            onClick: S,
            icon: /* @__PURE__ */ e.jsx(de, {}),
            children: c("refresh", { defaultValue: "Refresh" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(B, { children: /* @__PURE__ */ e.jsx(G, { permission: "authorization:service_account:create", children: /* @__PURE__ */ e.jsx(
          x,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(je, {}),
            onClick: r,
            children: t("serviceAccount.create", { defaultValue: "Create Service Account" })
          }
        ) }) })
      ] }) }),
      /* @__PURE__ */ e.jsx(
        me,
        {
          rowKey: "id",
          dataSource: o,
          columns: ke,
          loading: A,
          pagination: {
            current: u.current,
            pageSize: u.page_size,
            total: g,
            onChange: k,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (s) => c("totalItems", { defaultValue: `Total ${s} items`, total: s })
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(
      be,
      {
        serviceAccountID: z,
        onClose: i,
        open: E,
        enableMultiOrg: l,
        organizations: v,
        onSuccess: () => {
          P();
        }
      }
    )
  ] });
}, yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: We
}, Symbol.toStringTag, { value: "Module" })), { Text: W, Paragraph: he } = ve, { TextArea: He } = ae, Qe = ({ serviceAccountID: t }) => {
  const { t: c } = R("authorization"), { t: b } = R("common"), [T, p] = m([]), [a, v] = m(!1), [l, A] = m(!1), [j] = y.useForm(), [o, I] = m(null), [g, C] = m(null), [E, V] = m(!1), z = async () => {
    if (t) {
      v(!0);
      try {
        const i = await w.authorization.getServiceAccountAccessKeys({ id: t });
        p(i);
      } catch (i) {
        console.error("Failed to load access keys:", i), h.error(c("serviceAccount.loadKeysError", { defaultValue: "Failed to load access keys." }));
      } finally {
        v(!1);
      }
    }
  };
  H(() => {
    z();
  }, [t]);
  const n = (i) => {
    navigator.clipboard.writeText(i).then(
      () => {
        h.success(c("serviceAccount.copyKeySuccess", { defaultValue: "Copied to clipboard!" }));
      },
      (K) => {
        console.error("Could not copy text: ", K);
      }
    );
  }, u = () => {
    I(null), j.resetFields(), A(!0);
  }, F = (i) => {
    I(i), j.setFieldsValue({
      name: i.name,
      description: i.description,
      status: i.status === "active",
      expires_at: i.expires_at ? $e(i.expires_at) : void 0
    }), A(!0);
  }, P = () => {
    A(!1), j.resetFields();
  }, { run: f, loading: S } = $(
    async () => {
      const i = await j.validateFields();
      if (o) {
        const K = await w.authorization.updateServiceAccountAccessKey({ id: t, keyId: o.id }, {
          name: i.name,
          description: i.description,
          status: i.status ? "active" : "disabled",
          expires_at: i.expires_at ? i.expires_at.toISOString() : void 0
        });
        return A(!1), K;
      } else {
        const K = await w.authorization.createServiceAccountAccessKey({ id: t }, {
          name: i.name,
          description: i.description,
          expires_at: i.expires_at ? i.expires_at.toISOString() : void 0
        });
        C(K), A(!1), V(!0);
      }
    },
    {
      manual: !0,
      onSuccess: () => {
        h.success(c("serviceAccount.updateKeySuccess", { defaultValue: "Access key updated successfully." })), z();
      },
      onError: () => {
        h.error(c("serviceAccount.updateKeyError", { defaultValue: "Failed to update access key." }));
      }
    }
  ), k = async (i) => {
    try {
      await w.authorization.deleteServiceAccountAccessKey({ id: t, keyId: i }), h.success(c("serviceAccount.deleteKeySuccess", { defaultValue: "Access key deleted successfully." })), z();
    } catch (K) {
      console.error("Failed to delete key:", K), h.error(c("serviceAccount.deleteKeyError", { defaultValue: "Failed to delete access key." }));
    }
  }, r = () => {
    V(!1), C(null);
  }, _ = [
    {
      title: c("serviceAccount.keyName", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: c("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
      dataIndex: "access_key_id",
      key: "access_key_id",
      render: (i) => /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(oe, {}),
        /* @__PURE__ */ e.jsx(W, { copyable: !0, children: i })
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
      render: (i) => i ? M(i) : /* @__PURE__ */ e.jsx(W, { type: "secondary", children: c("serviceAccount.neverExpires", { defaultValue: "Never" }) })
    },
    {
      title: c("serviceAccount.keyLastUsed", { defaultValue: "Last Used" }),
      dataIndex: "last_used",
      key: "last_used",
      render: (i) => i ? M(i) : /* @__PURE__ */ e.jsx(W, { type: "secondary", children: c("serviceAccount.keyNeverUsed", { defaultValue: "Never" }) })
    },
    {
      title: b("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (i, K) => /* @__PURE__ */ e.jsxs(D, { size: "small", children: [
        /* @__PURE__ */ e.jsx(ye, { title: c("serviceAccount.updateKey", { defaultValue: "Update Key" }), children: /* @__PURE__ */ e.jsx(
          x,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(Y, {}),
            onClick: () => F(K)
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          xe,
          {
            title: c("serviceAccount.deleteKeyConfirm", { defaultValue: "Are you sure you want to delete this access key?" }),
            onConfirm: () => k(K.id),
            okText: b("confirm", { defaultValue: "Confirm" }),
            cancelText: b("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              x,
              {
                type: "text",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(le, {})
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
        title: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(oe, {}),
          c("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
        ] }),
        extra: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(
            x,
            {
              icon: /* @__PURE__ */ e.jsx(ge, {}),
              onClick: z,
              loading: a,
              children: b("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            x,
            {
              type: "primary",
              icon: /* @__PURE__ */ e.jsx(je, {}),
              onClick: u,
              children: c("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" })
            }
          )
        ] }),
        children: /* @__PURE__ */ e.jsx(
          me,
          {
            columns: _,
            dataSource: T,
            rowKey: "id",
            loading: a,
            pagination: !1
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      Z,
      {
        title: o ? c("serviceAccount.updateKey", { defaultValue: "Update Access Key" }) : c("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" }),
        open: l,
        onOk: f,
        confirmLoading: S,
        onCancel: P,
        children: /* @__PURE__ */ e.jsxs(
          y,
          {
            form: j,
            layout: "vertical",
            children: [
              /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "name",
                  label: c("serviceAccount.keyName", { defaultValue: "Key Name" }),
                  rules: [{ required: !0, message: c("serviceAccount.keyNameRequired", { defaultValue: "Please enter a name for the access key." }) }],
                  children: /* @__PURE__ */ e.jsx(ae, { placeholder: c("serviceAccount.keyNamePlaceholder", { defaultValue: "Enter key name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "description",
                  label: c("serviceAccount.keyDescription", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    He,
                    {
                      rows: 3,
                      placeholder: c("serviceAccount.keyDescriptionPlaceholder", { defaultValue: "Enter key description (optional)" })
                    }
                  )
                }
              ),
              o && /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "status",
                  label: c("serviceAccount.keyStatus", { defaultValue: "Status" }),
                  valuePropName: "checked",
                  children: /* @__PURE__ */ e.jsx(
                    Ce,
                    {
                      checkedChildren: c("serviceAccount.keyActive", { defaultValue: "Active" }),
                      unCheckedChildren: c("serviceAccount.keyDisabled", { defaultValue: "Disabled" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "expires_at",
                  label: c("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
                  children: /* @__PURE__ */ e.jsx(
                    Ee,
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
      Z,
      {
        title: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(Re, { style: { color: "#faad14" } }),
          c("serviceAccount.secretNoticeTitle", { defaultValue: "Access Key Created - Important!" })
        ] }),
        open: E,
        footer: [
          /* @__PURE__ */ e.jsx(x, { onClick: r, children: b("confirm", { defaultValue: "I have copied the secret key. Close" }) }, "close")
        ],
        closable: !1,
        children: [
          /* @__PURE__ */ e.jsx(
            Fe,
            {
              message: c("serviceAccount.secretNoticeMessage", { defaultValue: "Your new Secret Access Key is displayed below. This is the only time you will be able to see this secret. Please copy it and store it securely." }),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          g && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs(W, { strong: !0, children: [
                c("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(he, { copyable: { text: g.access_key_id }, children: g.access_key_id })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs(W, { strong: !0, children: [
                c("serviceAccount.secretKey", { defaultValue: "Secret Access Key" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(he, { copyable: { text: g.secret_access_key || "" }, children: g.secret_access_key })
            ] }),
            /* @__PURE__ */ e.jsx(
              x,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(De, {}),
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
}, { Text: pe } = ve, Ze = ({ serviceAccount: t, onRefresh: c, loading: b }) => {
  const { id: T } = t || {}, { t: p } = R("authorization"), { t: a } = R("common"), [v, l] = m([]), [A, j] = m([]);
  H(() => {
    j((t == null ? void 0 : t.roles) || []);
  }, [t]);
  const [o, I] = m(void 0), g = t == null ? void 0 : t.organization_id, { loading: C } = $(async () => w.authorization.listRoles({
    current: 1,
    page_size: 20,
    search: o,
    ...g ? { organization_id: g } : {}
  }), {
    onSuccess: (n) => {
      const u = n.data;
      A.forEach((F) => {
        u.find((f) => f.id === F.id) || u.push(F);
      }), l(u);
    },
    onError: (n) => {
      console.error("Failed to load roles:", n), h.error(p("serviceAccount.loadRolesError", { defaultValue: "Failed to load roles." }));
    },
    debounceWait: 300,
    refreshDeps: [o, g]
  }), { run: E, loading: V } = $(async () => {
    if (T)
      return w.authorization.assignServiceAccountRoles({ id: T }, { role_ids: A.map((n) => n.id) });
  }, {
    onSuccess: () => {
      h.success(p("serviceAccount.assignRolesSuccess", { defaultValue: "Roles assigned successfully." })), c();
    },
    onError: (n) => {
      console.error("Failed to assign roles:", n), h.error(p("serviceAccount.assignRolesError", { defaultValue: "Failed to assign roles." }));
    },
    manual: !0
  }), z = (n) => {
    j(n.map((u) => v.find((F) => F.id === u) || {
      id: u,
      name: u,
      description: u
    }));
  };
  return /* @__PURE__ */ e.jsx(
    q,
    {
      title: /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(ee, {}),
        p("serviceAccount.authorization", { defaultValue: "Authorization" })
      ] }),
      extra: /* @__PURE__ */ e.jsx(
        x,
        {
          icon: /* @__PURE__ */ e.jsx(ge, {}),
          onClick: () => {
            c();
          },
          disabled: b || V,
          loading: V,
          children: a("refresh", { defaultValue: "Refresh" })
        }
      ),
      children: V ? /* @__PURE__ */ e.jsx(Ie, { active: !0, paragraph: { rows: 4 } }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(pe, { children: p("serviceAccount.roles", { defaultValue: "Roles" }) }),
          /* @__PURE__ */ e.jsx("div", { style: { marginTop: 8 }, children: A.length > 0 ? v.filter((n) => A.some((u) => u.id === n.id)).map((n) => /* @__PURE__ */ e.jsx(L, { color: "blue", children: n.name }, n.id)) : /* @__PURE__ */ e.jsx(
            X,
            {
              image: X.PRESENTED_IMAGE_SIMPLE,
              description: p("serviceAccount.noRoles", { defaultValue: "No roles assigned." }),
              style: { margin: "10px 0" }
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(pe, { children: p("serviceAccount.assignRoles", { defaultValue: "Assign Roles" }) }),
          /* @__PURE__ */ e.jsx(
            te,
            {
              mode: "multiple",
              style: { width: "100%", marginTop: 8 },
              placeholder: p("serviceAccount.selectRoles", { defaultValue: "Select roles to assign" }),
              value: A.map((n) => n.id),
              onSearch: (n) => {
                I(n);
              },
              onDropdownVisibleChange: (n) => {
                n && I(void 0);
              },
              onChange: z,
              loading: b || C,
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
          x,
          {
            type: "primary",
            onClick: E,
            loading: V,
            disabled: b,
            children: p("serviceAccount.assignRoles", { defaultValue: "Assign Roles" })
          }
        ) })
      ] })
    }
  );
}, { TabPane: Q } = Ae, Xe = {
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
}, Ye = Je(({ css: t }) => ({
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
})), et = () => {
  const { styles: t } = Ye(), p = Le().hash.replace("#", "") || "basic", { t: a } = R("authorization"), { t: v } = R("common"), { id: l } = Me(), A = Ve(), { hasPermission: j } = Se(), [o, I] = m(null), [g, C] = m(!1), [E] = y.useForm(), [V, z] = m(!1);
  if (!l)
    return /* @__PURE__ */ e.jsx(qe, {});
  const { run: n, loading: u } = $(async () => {
    if (l)
      return w.authorization.getServiceAccountById({ id: l });
  }, {
    onSuccess: (r) => {
      I(r || null);
    }
  });
  H(() => {
    n();
  }, [l]);
  const F = (r) => {
    A(`#${r}`);
  }, P = async () => {
    if (l)
      try {
        await w.authorization.deleteServiceAccount({ id: l }), h.success(a("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully." })), A("/authorization/service-accounts");
      } catch (r) {
        console.error(a("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }), r), h.error(a("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }));
      }
  }, { run: f, loading: S } = $(async () => {
    if (o)
      return w.authorization.updateServiceAccountStatus({ id: l }, { status: o.status === "active" ? "disabled" : "active" });
  }, {
    onSuccess: (r) => {
      I(r || null), h.success(a("serviceAccount.statusUpdateSuccess", { defaultValue: "Service account status updated successfully." }));
    },
    onError: (r) => {
      console.error(a("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }), r), h.error(a("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }));
    },
    manual: !0
  }), k = async (r) => {
    if (l)
      try {
        let _;
        try {
          _ = JSON.parse(r.policy_document);
        } catch {
          h.error(a("serviceAccount.policyInvalidJson", { defaultValue: "Invalid JSON format for policy document." }));
          return;
        }
        await w.authorization.setServiceAccountPolicy({ id: l }, { policy_document: _ }), h.success(a("serviceAccount.policyUpdateSuccess", { defaultValue: "Policy document updated successfully." })), C(!1), n();
      } catch (_) {
        console.error(a("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }), _), h.error(a("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }));
      }
  };
  return u ? /* @__PURE__ */ e.jsx(re, { size: "large", style: { display: "flex", justifyContent: "center", padding: "50px" } }) : o ? /* @__PURE__ */ e.jsxs(
    q,
    {
      title: /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(Ne, {}),
        o.name,
        o.status === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: a("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: a("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(G, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          x,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Y, {}),
            onClick: () => z(!0),
            disabled: V,
            children: v("edit", { defaultValue: "Edit" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(G, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          x,
          {
            icon: o.status === "active" ? /* @__PURE__ */ e.jsx(ee, {}) : /* @__PURE__ */ e.jsx(ie, {}),
            onClick: f,
            loading: S,
            children: o.status === "active" ? v("disable", { defaultValue: "Disable" }) : v("enable", { defaultValue: "Enable" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(G, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(
          xe,
          {
            title: a("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: P,
            okText: v("confirm", { defaultValue: "Confirm" }),
            cancelText: v("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(x, { danger: !0, icon: /* @__PURE__ */ e.jsx(le, {}), children: v("delete", { defaultValue: "Delete" }) })
          }
        ) }),
        /* @__PURE__ */ e.jsx(x, { icon: /* @__PURE__ */ e.jsx(Oe, {}), onClick: () => A("/authorization/service-accounts"), children: v("back", { defaultValue: "Back" }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(Ae, { defaultActiveKey: p, onChange: F, children: [
          /* @__PURE__ */ e.jsx(Q, { tab: a("serviceAccount.tabs.basic", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(U, { bordered: !0, column: 2, children: [
            /* @__PURE__ */ e.jsx(U.Item, { label: a("serviceAccount.name", { defaultValue: "Name" }), span: 2, children: o.name }),
            /* @__PURE__ */ e.jsx(U.Item, { label: a("serviceAccount.description", { defaultValue: "Description" }), span: 2, children: o.description || a("serviceAccount.noDescription", { defaultValue: "N/A" }) }),
            /* @__PURE__ */ e.jsx(U.Item, { label: a("serviceAccount.status", { defaultValue: "Status" }), children: o.status === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: a("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: a("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) }) }),
            /* @__PURE__ */ e.jsx(U.Item, { label: a("serviceAccount.lastAccess", { defaultValue: "Last Access" }), children: o.last_access ? M(o.last_access) : a("serviceAccount.neverAccessed", { defaultValue: "Never" }) }),
            /* @__PURE__ */ e.jsx(U.Item, { label: a("serviceAccount.createdAt", { defaultValue: "Created At" }), children: M(o.created_at) }),
            /* @__PURE__ */ e.jsx(U.Item, { label: a("serviceAccount.updatedAt", { defaultValue: "Updated At" }), children: M(o.updated_at) })
          ] }) }, "basic"),
          /* @__PURE__ */ e.jsx(
            Q,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(oe, {}),
                a("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
              ] }),
              disabled: !j("authorization:service_account:access_key:list"),
              children: /* @__PURE__ */ e.jsx(Qe, { serviceAccountID: l })
            },
            "access-keys"
          ),
          /* @__PURE__ */ e.jsx(
            Q,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(ee, {}),
                a("serviceAccount.authorization", { defaultValue: "Authorization" })
              ] }),
              disabled: !j("authorization:service_account:role:list"),
              children: /* @__PURE__ */ e.jsx(
                Ze,
                {
                  serviceAccount: o,
                  onRefresh: n
                }
              )
            },
            "authorization"
          ),
          /* @__PURE__ */ e.jsxs(Q, { tab: a("serviceAccount.tabs.policy", { defaultValue: "Policy Document" }), children: [
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(se, { justify: "end", children: /* @__PURE__ */ e.jsx(B, { children: /* @__PURE__ */ e.jsx(G, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
              x,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Y, {}),
                onClick: () => {
                  C(!0), E.setFieldsValue({
                    policy_document: JSON.stringify(o.policy_document, null, 2)
                  });
                },
                children: a("serviceAccount.editPolicy", { defaultValue: "Edit Policy" })
              }
            ) }) }) }) }),
            /* @__PURE__ */ e.jsx(re, { spinning: u, children: o.policy_document && o.policy_document.Statement && o.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(q, { children: /* @__PURE__ */ e.jsx("pre", { style: { whiteSpace: "pre-wrap", overflowX: "auto" }, children: JSON.stringify(o.policy_document, null, 2) }) }) : /* @__PURE__ */ e.jsx(X, { description: a("serviceAccount.noPolicy", { defaultValue: "No policy document defined for this service account." }) }) })
          ] }, "policy")
        ] }),
        /* @__PURE__ */ e.jsx(
          Z,
          {
            title: a("serviceAccount.editPolicy", { defaultValue: "Edit Policy" }),
            open: g,
            onCancel: () => {
              C(!1), E.resetFields();
            },
            footer: null,
            width: 700,
            children: /* @__PURE__ */ e.jsxs(y, { form: E, layout: "vertical", onFinish: k, children: [
              /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "policy_document",
                  extra: /* @__PURE__ */ e.jsx("span", { className: t.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                    te,
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
                        const _ = Xe[r];
                        _ && E.setFieldValue("policy_document", JSON.stringify(_, null, 2));
                      }
                    }
                  ) }),
                  children: /* @__PURE__ */ e.jsx(
                    fe,
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
              /* @__PURE__ */ e.jsx(y.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
                /* @__PURE__ */ e.jsx(x, { type: "primary", htmlType: "submit", children: v("save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(x, { onClick: () => C(!1), children: v("cancel", { defaultValue: "Cancel" }) })
              ] }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          be,
          {
            serviceAccountID: l,
            onClose: () => z(!1),
            open: V
          }
        )
      ]
    }
  ) : /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px 0" }, children: /* @__PURE__ */ e.jsx(X, { description: a("serviceAccount.notFound", { defaultValue: "Service account not found." }) }) });
}, mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: et
}, Symbol.toStringTag, { value: "Module" }));
export {
  yt as S,
  mt as a
};
