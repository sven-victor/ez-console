import { j as e, T as me } from "./vendor.js";
import { useState as y, useEffect as Q, useCallback as ke } from "react";
import { Form as m, message as f, Modal as X, Radio as se, Select as ae, Input as ce, Space as I, Button as h, Tooltip as G, Tag as M, Badge as U, Popconfirm as ne, Card as $, Row as ie, Col as q, Table as ye, Typography as ve, Switch as Ce, DatePicker as we, Alert as Ee, Skeleton as Fe, Empty as Y, Spin as de, Tabs as xe, Descriptions as L } from "antd";
import { TeamOutlined as Ie, CheckCircleOutlined as le, CloseCircleOutlined as Te, EyeOutlined as Pe, EditOutlined as ee, LockOutlined as te, DeleteOutlined as re, SearchOutlined as De, FilterOutlined as Ke, ReloadOutlined as he, PlusOutlined as Ae, KeyOutlined as oe, SyncOutlined as je, CopyOutlined as Re, ExclamationCircleOutlined as Oe, RollbackOutlined as Ne, UserOutlined as Ue } from "@ant-design/icons";
import { useNavigate as ge, Link as Le, useLocation as Me, useParams as Be } from "react-router-dom";
import { f as R } from "./components.js";
import { a as C } from "./index.js";
import { P as W, f as B } from "./base.js";
import { useTranslation as O } from "react-i18next";
import { b as Ve, c as Se, a as Ge } from "./contexts.js";
import qe from "./not_found.js";
import { useRequest as J } from "ahooks";
import $e from "dayjs";
import { createStyles as Je } from "antd-style";
const be = ({
  serviceAccountID: t,
  onClose: a,
  open: _ = !1,
  onSuccess: T,
  enableMultiOrg: p = !1,
  organizations: c = []
}) => {
  const { hasGlobalPermission: v } = Ve(), { t: o } = O("authorization"), { t: x } = O("common"), { currentOrgId: j } = Se(), [l] = m.useForm(), [P, g] = y(!1), [w, E] = y("global"), [V, z] = y(void 0), [n, u] = y(null), { run: F, loading: D } = J((A) => {
    if (t) {
      const { organization_id: k, ...r } = A;
      return C.authorization.updateServiceAccount({ id: t }, r);
    }
    const S = {
      name: A.name,
      description: A.description
    };
    return w === "organization" && V && (S.organization_id = V), C.authorization.createServiceAccount(S);
  }, {
    onSuccess: () => {
      f.success(o("serviceAccount.saveSuccess", { defaultValue: "Service account saved successfully." })), a(), T == null || T();
    },
    onError: () => {
      f.error(o("serviceAccount.saveError", { defaultValue: "Failed to save service account." }));
    },
    manual: !0
  });
  return Q(() => {
    const A = async (S) => {
      var k;
      g(!0);
      try {
        const r = await C.authorization.getServiceAccountById({ id: S }), b = r.organization_id || "";
        E(b ? "organization" : "global"), z(b || void 0), u(b ? ((k = r.organization) == null ? void 0 : k.name) ?? b : null), l.setFieldsValue({
          name: r.name,
          description: r.description,
          organization_id: b || void 0
        });
      } catch {
        f.error(o("serviceAccount.loadError", { defaultValue: "Failed to load service account." }));
      } finally {
        g(!1);
      }
    };
    if (_) {
      l.resetFields();
      const S = j || (c.length > 0 ? c[0].id : ""), k = p && S ? "organization" : "global";
      E(k), z(k === "organization" ? S : void 0), t ? A(t) : (u(null), l.setFieldsValue({
        organization_id: k === "organization" ? S : void 0
      }));
    }
  }, [t, _, p, c, j]), /* @__PURE__ */ e.jsx(
    X,
    {
      title: t ? o("serviceAccount.edit", { defaultValue: "Edit Service Account" }) : o("serviceAccount.create", { defaultValue: "Create Service Account" }),
      width: 500,
      onClose: () => {
        l.resetFields(), a();
      },
      onCancel: () => {
        l.resetFields(), a();
      },
      open: _,
      footer: /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(h, { onClick: a, children: x("cancel", { defaultValue: "Cancel" }) }),
        /* @__PURE__ */ e.jsx(
          h,
          {
            type: "primary",
            onClick: l.submit,
            loading: D || P,
            children: x("save", { defaultValue: "Save" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(
        m,
        {
          form: l,
          layout: "vertical",
          onFinish: F,
          children: [
            p && !t && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(m.Item, { label: o("serviceAccount.scope", { defaultValue: "Scope" }), children: /* @__PURE__ */ e.jsxs(
                se.Group,
                {
                  value: w,
                  onChange: (A) => {
                    var r;
                    const S = A.target.value;
                    E(S);
                    const k = S === "organization" ? j || ((r = c[0]) == null ? void 0 : r.id) : void 0;
                    z(k), l.setFieldsValue({ organization_id: k });
                  },
                  disabled: !v("authorization:service_account:create"),
                  children: [
                    /* @__PURE__ */ e.jsx(se, { value: "global", children: o("serviceAccount.global", { defaultValue: "Global" }) }),
                    /* @__PURE__ */ e.jsx(se, { value: "organization", children: o("serviceAccount.organizationScoped", { defaultValue: "Organization" }) })
                  ]
                }
              ) }),
              w === "organization" && /* @__PURE__ */ e.jsx(
                m.Item,
                {
                  name: "organization_id",
                  label: o("serviceAccount.organization", { defaultValue: "Organization" }),
                  rules: [{ required: !0, message: o("serviceAccount.organizationRequired", { defaultValue: "Please select an organization." }) }],
                  children: /* @__PURE__ */ e.jsx(
                    ae,
                    {
                      placeholder: o("serviceAccount.selectOrganization", { defaultValue: "Select organization" }),
                      options: c.map((A) => ({ value: A.id, label: A.name })),
                      value: V,
                      onChange: (A) => z(A)
                    }
                  )
                }
              )
            ] }),
            p && t && /* @__PURE__ */ e.jsx(m.Item, { label: o("serviceAccount.organization", { defaultValue: "Organization" }), children: /* @__PURE__ */ e.jsx("span", { children: n ?? o("serviceAccount.global", { defaultValue: "Global" }) }) }),
            /* @__PURE__ */ e.jsx(
              m.Item,
              {
                label: o("serviceAccount.name", { defaultValue: "Name" }),
                name: "name",
                rules: [{ required: !0, message: o("serviceAccount.nameRequired", { defaultValue: "Please enter a name for the service account." }) }],
                children: /* @__PURE__ */ e.jsx(ce, { placeholder: o("serviceAccount.namePlaceholder", { defaultValue: "Enter service account name" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              m.Item,
              {
                label: o("serviceAccount.description", { defaultValue: "Description" }),
                name: "description",
                children: /* @__PURE__ */ e.jsx(me, { rows: 4, placeholder: o("serviceAccount.descriptionPlaceholder", { defaultValue: "Enter service account description (optional)" }) })
              }
            )
          ]
        }
      )
    }
  );
}, We = () => {
  const { t } = O("authorization"), { t: a } = O("common"), _ = ge(), [T] = m.useForm(), { siteConfig: p } = Se(), { user: c } = Ge(), v = (c == null ? void 0 : c.organizations) || [], o = (p == null ? void 0 : p.enable_multi_org) ?? !1, [x, j] = y(!1), [l, P] = y([]), [g, w] = y(0), [E, V] = y(!1), [z, n] = y(null), [u, F] = y({
    current: W.DEFAULT_CURRENT,
    page_size: W.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), D = ke(async () => {
    try {
      j(!0);
      const s = await C.authorization.getServiceAccounts(u);
      P(s.data || []), w(s.total || 0);
    } catch (s) {
      console.error(t("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }), s), f.error(t("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }));
    } finally {
      j(!1);
    }
  }, [u, t]);
  Q(() => {
    D();
  }, [D]);
  const A = (s) => {
    F({
      ...u,
      current: W.DEFAULT_CURRENT,
      search: s.search,
      organization_id: s.organization_id || void 0
    });
  }, S = () => {
    T.resetFields(), F({
      current: W.DEFAULT_CURRENT,
      page_size: W.DEFAULT_PAGE_SIZE,
      search: void 0,
      organization_id: void 0
    });
  }, k = (s, d) => {
    F((N) => ({
      ...N,
      current: s,
      page_size: d
    }));
  }, r = () => {
    n(null), V(!0);
  }, b = (s) => {
    n(s.id), V(!0);
  }, i = () => {
    V(!1);
  }, K = async (s) => {
    try {
      await C.authorization.deleteServiceAccount({ id: s }), f.success(t("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully" })), D();
    } catch (d) {
      console.error(t("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }), d), f.error(t("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }));
    }
  }, _e = async (s) => {
    const d = s.status === "active" ? "disabled" : "active";
    try {
      await C.authorization.updateServiceAccountStatus({ id: s.id }, { status: d }), f.success(t("serviceAccount.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), D();
    } catch (N) {
      console.error(t("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" }), N), f.error(t("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" }));
    }
  }, ze = [
    {
      title: t("serviceAccount.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (s, d) => /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:view", fallback: s, children: /* @__PURE__ */ e.jsx(Le, { to: `/authorization/service-accounts/${d.id}`, children: s }) })
    },
    {
      title: t("serviceAccount.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description",
      render: (s) => /* @__PURE__ */ e.jsx(G, { title: s, children: /* @__PURE__ */ e.jsx("span", { children: (s == null ? void 0 : s.length) > 30 ? `${s.substring(0, 30)}...` : s }) })
    },
    ...o ? [
      {
        title: t("serviceAccount.organization", { defaultValue: "Organization" }),
        key: "organization",
        render: (s, d) => {
          var N;
          return d.organization_id ? /* @__PURE__ */ e.jsx(M, { icon: /* @__PURE__ */ e.jsx(Ie, {}), color: "blue", children: ((N = d.organization) == null ? void 0 : N.name) || d.organization_id }) : /* @__PURE__ */ e.jsx(M, { color: "default", children: t("serviceAccount.global", { defaultValue: "Global" }) });
        }
      }
    ] : [],
    {
      title: t("serviceAccount.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (s) => s === "active" ? /* @__PURE__ */ e.jsx(U, { status: "success", text: t("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(U, { status: "error", text: t("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: t("serviceAccount.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (s, d) => {
        var N;
        return /* @__PURE__ */ e.jsxs(I, { size: [0, 4], wrap: !0, children: [
          (N = d.roles) == null ? void 0 : N.map((ue) => /* @__PURE__ */ e.jsx(M, { color: "blue", children: ue.name }, ue.id)),
          (!d.roles || d.roles.length === 0) && /* @__PURE__ */ e.jsx(M, { children: t("serviceAccount.noRoles", { defaultValue: "No Roles" }) })
        ] });
      }
    },
    {
      title: t("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }),
      key: "policy",
      render: (s, d) => d.policy_document && d.policy_document.Statement && d.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(M, { color: "green", icon: /* @__PURE__ */ e.jsx(le, {}), children: t("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }) }) : /* @__PURE__ */ e.jsx(M, { color: "default", icon: /* @__PURE__ */ e.jsx(Te, {}), children: t("serviceAccount.noPolicy", { defaultValue: "No Policy" }) })
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
      render: (s, d) => /* @__PURE__ */ e.jsxs(I, { size: "small", children: [
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:view", children: /* @__PURE__ */ e.jsx(G, { title: t("serviceAccount.viewDetail", { defaultValue: "View Detail" }), children: /* @__PURE__ */ e.jsx(
          h,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(Pe, {}),
            onClick: () => _(`/authorization/service-accounts/${d.id}`)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(G, { title: t("serviceAccount.edit", { defaultValue: "Edit" }), children: /* @__PURE__ */ e.jsx(
          h,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(ee, {}),
            onClick: () => b(d)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(G, { title: d.status === "active" ? a("disable", { defaultValue: "Disable" }) : a("enable", { defaultValue: "Enable" }), children: /* @__PURE__ */ e.jsx(
          h,
          {
            type: "text",
            size: "small",
            icon: d.status === "active" ? /* @__PURE__ */ e.jsx(te, {}) : /* @__PURE__ */ e.jsx(le, {}),
            onClick: () => _e(d)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(G, { title: t("serviceAccount.delete", { defaultValue: "Delete" }), children: /* @__PURE__ */ e.jsx(
          ne,
          {
            title: t("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: () => K(d.id),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              h,
              {
                type: "text",
                size: "small",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(re, {})
              }
            )
          }
        ) }) })
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx($, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      m,
      {
        form: T,
        layout: "inline",
        onFinish: A,
        initialValues: {
          search: u.search,
          organization_id: u.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(ie, { gutter: 16, style: { width: "100%" }, children: [
          /* @__PURE__ */ e.jsx(q, { xs: 24, sm: 12, md: 8, lg: 6, children: /* @__PURE__ */ e.jsx(m.Item, { name: "search", children: /* @__PURE__ */ e.jsx(
            ce,
            {
              placeholder: t("serviceAccount.searchPlaceholder", { defaultValue: "Search by name or description" }),
              allowClear: !0,
              prefix: /* @__PURE__ */ e.jsx(De, {})
            }
          ) }) }),
          o && /* @__PURE__ */ e.jsx(q, { xs: 24, sm: 12, md: 8, lg: 6, children: /* @__PURE__ */ e.jsx(m.Item, { name: "organization_id", children: /* @__PURE__ */ e.jsx(
            ae,
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
          /* @__PURE__ */ e.jsx(q, { xs: 24, sm: 12, md: 8, lg: 6, style: { display: "flex", alignItems: "flex-end" }, children: /* @__PURE__ */ e.jsx(m.Item, { children: /* @__PURE__ */ e.jsxs(I, { children: [
            /* @__PURE__ */ e.jsx(h, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Ke, {}), children: a("filter", { defaultValue: "Filter" }) }),
            /* @__PURE__ */ e.jsx(h, { onClick: S, icon: /* @__PURE__ */ e.jsx(he, {}), children: a("reset", { defaultValue: "Reset" }) })
          ] }) }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs($, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ie, { justify: "space-between", align: "middle", children: [
        /* @__PURE__ */ e.jsx(q, { children: /* @__PURE__ */ e.jsx(
          h,
          {
            type: "primary",
            onClick: S,
            icon: /* @__PURE__ */ e.jsx(he, {}),
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(q, { children: /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:create", children: /* @__PURE__ */ e.jsx(
          h,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ae, {}),
            onClick: r,
            children: t("serviceAccount.create", { defaultValue: "Create Service Account" })
          }
        ) }) })
      ] }) }),
      /* @__PURE__ */ e.jsx(
        ye,
        {
          rowKey: "id",
          dataSource: l,
          columns: ze,
          loading: x,
          pagination: {
            current: u.current,
            pageSize: u.page_size,
            total: g,
            onChange: k,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (s) => a("totalItems", { defaultValue: `Total ${s} items`, total: s })
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
        enableMultiOrg: o,
        organizations: v,
        onSuccess: () => {
          D();
        }
      }
    )
  ] });
}, mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: We
}, Symbol.toStringTag, { value: "Module" })), { Text: H, Paragraph: fe } = ve, { TextArea: He } = ce, Qe = ({ serviceAccountID: t }) => {
  const { t: a } = O("authorization"), { t: _ } = O("common"), [T, p] = y([]), [c, v] = y(!1), [o, x] = y(!1), [j] = m.useForm(), [l, P] = y(null), [g, w] = y(null), [E, V] = y(!1), z = async () => {
    if (t) {
      v(!0);
      try {
        const i = await C.authorization.getServiceAccountAccessKeys({ id: t });
        p(i);
      } catch (i) {
        console.error("Failed to load access keys:", i), f.error(a("serviceAccount.loadKeysError", { defaultValue: "Failed to load access keys." }));
      } finally {
        v(!1);
      }
    }
  };
  Q(() => {
    z();
  }, [t]);
  const n = (i) => {
    navigator.clipboard.writeText(i).then(
      () => {
        f.success(a("serviceAccount.copyKeySuccess", { defaultValue: "Copied to clipboard!" }));
      },
      (K) => {
        console.error("Could not copy text: ", K);
      }
    );
  }, u = () => {
    P(null), j.resetFields(), x(!0);
  }, F = (i) => {
    P(i), j.setFieldsValue({
      name: i.name,
      description: i.description,
      status: i.status === "active",
      expires_at: i.expires_at ? $e(i.expires_at) : void 0
    }), x(!0);
  }, D = () => {
    x(!1), j.resetFields();
  }, { run: A, loading: S } = J(
    async () => {
      const i = await j.validateFields();
      if (l) {
        const K = await C.authorization.updateServiceAccountAccessKey({ id: t, keyId: l.id }, {
          name: i.name,
          description: i.description,
          status: i.status ? "active" : "disabled",
          expires_at: i.expires_at ? i.expires_at.toISOString() : void 0
        });
        return x(!1), K;
      } else {
        const K = await C.authorization.createServiceAccountAccessKey({ id: t }, {
          name: i.name,
          description: i.description,
          expires_at: i.expires_at ? i.expires_at.toISOString() : void 0
        });
        w(K), x(!1), V(!0);
      }
    },
    {
      manual: !0,
      onSuccess: () => {
        f.success(a("serviceAccount.updateKeySuccess", { defaultValue: "Access key updated successfully." })), z();
      },
      onError: () => {
        f.error(a("serviceAccount.updateKeyError", { defaultValue: "Failed to update access key." }));
      }
    }
  ), k = async (i) => {
    try {
      await C.authorization.deleteServiceAccountAccessKey({ id: t, keyId: i }), f.success(a("serviceAccount.deleteKeySuccess", { defaultValue: "Access key deleted successfully." })), z();
    } catch (K) {
      console.error("Failed to delete key:", K), f.error(a("serviceAccount.deleteKeyError", { defaultValue: "Failed to delete access key." }));
    }
  }, r = () => {
    V(!1), w(null);
  }, b = [
    {
      title: a("serviceAccount.keyName", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: a("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
      dataIndex: "access_key_id",
      key: "access_key_id",
      render: (i) => /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(oe, {}),
        /* @__PURE__ */ e.jsx(H, { copyable: !0, children: i })
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
      render: (i) => i === "active" ? /* @__PURE__ */ e.jsx(U, { status: "success", text: a("serviceAccount.keyActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(U, { status: "error", text: a("serviceAccount.keyDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
      dataIndex: "expires_at",
      key: "expires_at",
      render: (i) => i ? B(i) : /* @__PURE__ */ e.jsx(H, { type: "secondary", children: a("serviceAccount.neverExpires", { defaultValue: "Never" }) })
    },
    {
      title: a("serviceAccount.keyLastUsed", { defaultValue: "Last Used" }),
      dataIndex: "last_used",
      key: "last_used",
      render: (i) => i ? B(i) : /* @__PURE__ */ e.jsx(H, { type: "secondary", children: a("serviceAccount.keyNeverUsed", { defaultValue: "Never" }) })
    },
    {
      title: _("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (i, K) => /* @__PURE__ */ e.jsxs(I, { size: "small", children: [
        /* @__PURE__ */ e.jsx(G, { title: a("serviceAccount.updateKey", { defaultValue: "Update Key" }), children: /* @__PURE__ */ e.jsx(
          h,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(ee, {}),
            onClick: () => F(K)
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          ne,
          {
            title: a("serviceAccount.deleteKeyConfirm", { defaultValue: "Are you sure you want to delete this access key?" }),
            onConfirm: () => k(K.id),
            okText: _("confirm", { defaultValue: "Confirm" }),
            cancelText: _("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              h,
              {
                type: "text",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(re, {})
              }
            )
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      $,
      {
        title: /* @__PURE__ */ e.jsxs(I, { children: [
          /* @__PURE__ */ e.jsx(oe, {}),
          a("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
        ] }),
        extra: /* @__PURE__ */ e.jsxs(I, { children: [
          /* @__PURE__ */ e.jsx(
            h,
            {
              icon: /* @__PURE__ */ e.jsx(je, {}),
              onClick: z,
              loading: c,
              children: _("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            h,
            {
              type: "primary",
              icon: /* @__PURE__ */ e.jsx(Ae, {}),
              onClick: u,
              children: a("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" })
            }
          )
        ] }),
        children: /* @__PURE__ */ e.jsx(
          ye,
          {
            columns: b,
            dataSource: T,
            rowKey: "id",
            loading: c,
            pagination: !1
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      X,
      {
        title: l ? a("serviceAccount.updateKey", { defaultValue: "Update Access Key" }) : a("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" }),
        open: o,
        onOk: A,
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
                  label: a("serviceAccount.keyName", { defaultValue: "Key Name" }),
                  rules: [{ required: !0, message: a("serviceAccount.keyNameRequired", { defaultValue: "Please enter a name for the access key." }) }],
                  children: /* @__PURE__ */ e.jsx(ce, { placeholder: a("serviceAccount.keyNamePlaceholder", { defaultValue: "Enter key name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                m.Item,
                {
                  name: "description",
                  label: a("serviceAccount.keyDescription", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    He,
                    {
                      rows: 3,
                      placeholder: a("serviceAccount.keyDescriptionPlaceholder", { defaultValue: "Enter key description (optional)" })
                    }
                  )
                }
              ),
              l && /* @__PURE__ */ e.jsx(
                m.Item,
                {
                  name: "status",
                  label: a("serviceAccount.keyStatus", { defaultValue: "Status" }),
                  valuePropName: "checked",
                  children: /* @__PURE__ */ e.jsx(
                    Ce,
                    {
                      checkedChildren: a("serviceAccount.keyActive", { defaultValue: "Active" }),
                      unCheckedChildren: a("serviceAccount.keyDisabled", { defaultValue: "Disabled" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                m.Item,
                {
                  name: "expires_at",
                  label: a("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
                  children: /* @__PURE__ */ e.jsx(
                    we,
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
      X,
      {
        title: /* @__PURE__ */ e.jsxs(I, { children: [
          /* @__PURE__ */ e.jsx(Oe, { style: { color: "#faad14" } }),
          a("serviceAccount.secretNoticeTitle", { defaultValue: "Access Key Created - Important!" })
        ] }),
        open: E,
        footer: [
          /* @__PURE__ */ e.jsx(h, { onClick: r, children: _("confirm", { defaultValue: "I have copied the secret key. Close" }) }, "close")
        ],
        closable: !1,
        children: [
          /* @__PURE__ */ e.jsx(
            Ee,
            {
              message: a("serviceAccount.secretNoticeMessage", { defaultValue: "Your new Secret Access Key is displayed below. This is the only time you will be able to see this secret. Please copy it and store it securely." }),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          g && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs(H, { strong: !0, children: [
                a("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(fe, { copyable: { text: g.access_key_id }, children: g.access_key_id })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs(H, { strong: !0, children: [
                a("serviceAccount.secretKey", { defaultValue: "Secret Access Key" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(fe, { copyable: { text: g.secret_access_key || "" }, children: g.secret_access_key })
            ] }),
            /* @__PURE__ */ e.jsx(
              h,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Re, {}),
                onClick: () => {
                  const i = `Access Key: ${g.access_key_id}
Secret Key: ${g.secret_access_key}`;
                  n(i);
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
}, { Text: pe } = ve, Ze = ({ serviceAccount: t, onRefresh: a, loading: _ }) => {
  const { id: T } = t || {}, { t: p } = O("authorization"), { t: c } = O("common"), [v, o] = y([]), [x, j] = y([]);
  Q(() => {
    j((t == null ? void 0 : t.roles) || []);
  }, [t]);
  const [l, P] = y(void 0), g = t == null ? void 0 : t.organization_id, { loading: w } = J(async () => C.authorization.listRoles({
    current: 1,
    page_size: 20,
    search: l,
    ...g ? { organization_id: g } : {}
  }), {
    onSuccess: (n) => {
      const u = n.data;
      x.forEach((F) => {
        u.find((A) => A.id === F.id) || u.push(F);
      }), o(u);
    },
    onError: (n) => {
      console.error("Failed to load roles:", n), f.error(p("serviceAccount.loadRolesError", { defaultValue: "Failed to load roles." }));
    },
    debounceWait: 300,
    refreshDeps: [l, g]
  }), { run: E, loading: V } = J(async () => {
    if (T)
      return C.authorization.assignServiceAccountRoles({ id: T }, { role_ids: x.map((n) => n.id) });
  }, {
    onSuccess: () => {
      f.success(p("serviceAccount.assignRolesSuccess", { defaultValue: "Roles assigned successfully." })), a();
    },
    onError: (n) => {
      console.error("Failed to assign roles:", n), f.error(p("serviceAccount.assignRolesError", { defaultValue: "Failed to assign roles." }));
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
    $,
    {
      title: /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(te, {}),
        p("serviceAccount.authorization", { defaultValue: "Authorization" })
      ] }),
      extra: /* @__PURE__ */ e.jsx(
        h,
        {
          icon: /* @__PURE__ */ e.jsx(je, {}),
          onClick: () => {
            a();
          },
          disabled: _ || V,
          loading: V,
          children: c("refresh", { defaultValue: "Refresh" })
        }
      ),
      children: V ? /* @__PURE__ */ e.jsx(Fe, { active: !0, paragraph: { rows: 4 } }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(pe, { children: p("serviceAccount.roles", { defaultValue: "Roles" }) }),
          /* @__PURE__ */ e.jsx("div", { style: { marginTop: 8 }, children: x.length > 0 ? v.filter((n) => x.some((u) => u.id === n.id)).map((n) => /* @__PURE__ */ e.jsx(M, { color: "blue", children: n.name }, n.id)) : /* @__PURE__ */ e.jsx(
            Y,
            {
              image: Y.PRESENTED_IMAGE_SIMPLE,
              description: p("serviceAccount.noRoles", { defaultValue: "No roles assigned." }),
              style: { margin: "10px 0" }
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(pe, { children: p("serviceAccount.assignRoles", { defaultValue: "Assign Roles" }) }),
          /* @__PURE__ */ e.jsx(
            ae,
            {
              mode: "multiple",
              style: { width: "100%", marginTop: 8 },
              placeholder: p("serviceAccount.selectRoles", { defaultValue: "Select roles to assign" }),
              value: x.map((n) => n.id),
              onSearch: (n) => {
                P(n);
              },
              onDropdownVisibleChange: (n) => {
                n && P(void 0);
              },
              onChange: z,
              loading: _ || w,
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
          h,
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
}, { TabPane: Z } = xe, Xe = {
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
  const { styles: t } = Ye(), p = Me().hash.replace("#", "") || "basic", { t: c } = O("authorization"), { t: v } = O("common"), { id: o } = Be(), x = ge(), { hasPermission: j } = Ve(), [l, P] = y(null), [g, w] = y(!1), [E] = m.useForm(), [V, z] = y(!1);
  if (!o)
    return /* @__PURE__ */ e.jsx(qe, {});
  const { run: n, loading: u } = J(async () => {
    if (o)
      return C.authorization.getServiceAccountById({ id: o });
  }, {
    onSuccess: (r) => {
      P(r || null);
    }
  });
  Q(() => {
    n();
  }, [o]);
  const F = (r) => {
    x(`#${r}`);
  }, D = async () => {
    if (o)
      try {
        await C.authorization.deleteServiceAccount({ id: o }), f.success(c("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully." })), x("/authorization/service-accounts");
      } catch (r) {
        console.error(c("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }), r), f.error(c("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }));
      }
  }, { run: A, loading: S } = J(async () => {
    if (l)
      return C.authorization.updateServiceAccountStatus({ id: o }, { status: l.status === "active" ? "disabled" : "active" });
  }, {
    onSuccess: (r) => {
      P(r || null), f.success(c("serviceAccount.statusUpdateSuccess", { defaultValue: "Service account status updated successfully." }));
    },
    onError: (r) => {
      console.error(c("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }), r), f.error(c("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }));
    },
    manual: !0
  }), k = async (r) => {
    if (o)
      try {
        let b;
        try {
          b = JSON.parse(r.policy_document);
        } catch {
          f.error(c("serviceAccount.policyInvalidJson", { defaultValue: "Invalid JSON format for policy document." }));
          return;
        }
        await C.authorization.setServiceAccountPolicy({ id: o }, { policy_document: b }), f.success(c("serviceAccount.policyUpdateSuccess", { defaultValue: "Policy document updated successfully." })), w(!1), n();
      } catch (b) {
        console.error(c("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }), b), f.error(c("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }));
      }
  };
  return u ? /* @__PURE__ */ e.jsx(de, { size: "large", style: { display: "flex", justifyContent: "center", padding: "50px" } }) : l ? /* @__PURE__ */ e.jsxs(
    $,
    {
      title: /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(Ue, {}),
        l.name,
        l.status === "active" ? /* @__PURE__ */ e.jsx(U, { status: "success", text: c("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(U, { status: "error", text: c("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          h,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ee, {}),
            onClick: () => z(!0),
            disabled: V,
            children: v("edit", { defaultValue: "Edit" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          h,
          {
            icon: l.status === "active" ? /* @__PURE__ */ e.jsx(te, {}) : /* @__PURE__ */ e.jsx(le, {}),
            onClick: A,
            loading: S,
            children: l.status === "active" ? v("disable", { defaultValue: "Disable" }) : v("enable", { defaultValue: "Enable" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(
          ne,
          {
            title: c("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: D,
            okText: v("confirm", { defaultValue: "Confirm" }),
            cancelText: v("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(h, { danger: !0, icon: /* @__PURE__ */ e.jsx(re, {}), children: v("delete", { defaultValue: "Delete" }) })
          }
        ) }),
        /* @__PURE__ */ e.jsx(h, { icon: /* @__PURE__ */ e.jsx(Ne, {}), onClick: () => x("/authorization/service-accounts"), children: v("back", { defaultValue: "Back" }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(xe, { defaultActiveKey: p, onChange: F, children: [
          /* @__PURE__ */ e.jsx(Z, { tab: c("serviceAccount.tabs.basic", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(L, { bordered: !0, column: 2, children: [
            /* @__PURE__ */ e.jsx(L.Item, { label: c("serviceAccount.name", { defaultValue: "Name" }), span: 2, children: l.name }),
            /* @__PURE__ */ e.jsx(L.Item, { label: c("serviceAccount.description", { defaultValue: "Description" }), span: 2, children: l.description || c("serviceAccount.noDescription", { defaultValue: "N/A" }) }),
            /* @__PURE__ */ e.jsx(L.Item, { label: c("serviceAccount.status", { defaultValue: "Status" }), children: l.status === "active" ? /* @__PURE__ */ e.jsx(U, { status: "success", text: c("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(U, { status: "error", text: c("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) }) }),
            /* @__PURE__ */ e.jsx(L.Item, { label: c("serviceAccount.lastAccess", { defaultValue: "Last Access" }), children: l.last_access ? B(l.last_access) : c("serviceAccount.neverAccessed", { defaultValue: "Never" }) }),
            /* @__PURE__ */ e.jsx(L.Item, { label: c("serviceAccount.createdAt", { defaultValue: "Created At" }), children: B(l.created_at) }),
            /* @__PURE__ */ e.jsx(L.Item, { label: c("serviceAccount.updatedAt", { defaultValue: "Updated At" }), children: B(l.updated_at) })
          ] }) }, "basic"),
          /* @__PURE__ */ e.jsx(
            Z,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(oe, {}),
                c("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
              ] }),
              disabled: !j("authorization:service_account:access_key:list"),
              children: /* @__PURE__ */ e.jsx(Qe, { serviceAccountID: o })
            },
            "access-keys"
          ),
          /* @__PURE__ */ e.jsx(
            Z,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(te, {}),
                c("serviceAccount.authorization", { defaultValue: "Authorization" })
              ] }),
              disabled: !j("authorization:service_account:role:list"),
              children: /* @__PURE__ */ e.jsx(
                Ze,
                {
                  serviceAccount: l,
                  onRefresh: n
                }
              )
            },
            "authorization"
          ),
          /* @__PURE__ */ e.jsxs(Z, { tab: c("serviceAccount.tabs.policy", { defaultValue: "Policy Document" }), children: [
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(ie, { justify: "end", children: /* @__PURE__ */ e.jsx(q, { children: /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
              h,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(ee, {}),
                onClick: () => {
                  w(!0), E.setFieldsValue({
                    policy_document: JSON.stringify(l.policy_document, null, 2)
                  });
                },
                children: c("serviceAccount.editPolicy", { defaultValue: "Edit Policy" })
              }
            ) }) }) }) }),
            /* @__PURE__ */ e.jsx(de, { spinning: u, children: l.policy_document && l.policy_document.Statement && l.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx($, { children: /* @__PURE__ */ e.jsx("pre", { style: { whiteSpace: "pre-wrap", overflowX: "auto" }, children: JSON.stringify(l.policy_document, null, 2) }) }) : /* @__PURE__ */ e.jsx(Y, { description: c("serviceAccount.noPolicy", { defaultValue: "No policy document defined for this service account." }) }) })
          ] }, "policy")
        ] }),
        /* @__PURE__ */ e.jsx(
          X,
          {
            title: c("serviceAccount.editPolicy", { defaultValue: "Edit Policy" }),
            open: g,
            onCancel: () => {
              w(!1), E.resetFields();
            },
            footer: null,
            width: 700,
            children: /* @__PURE__ */ e.jsxs(m, { form: E, layout: "vertical", onFinish: k, children: [
              /* @__PURE__ */ e.jsx(
                m.Item,
                {
                  name: "policy_document",
                  extra: /* @__PURE__ */ e.jsx("span", { className: t.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                    ae,
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
                      onChange: (r) => {
                        const b = Xe[r];
                        b && E.setFieldValue("policy_document", JSON.stringify(b, null, 2));
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
              ),
              /* @__PURE__ */ e.jsx(m.Item, { children: /* @__PURE__ */ e.jsxs(I, { children: [
                /* @__PURE__ */ e.jsx(h, { type: "primary", htmlType: "submit", children: v("save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(h, { onClick: () => w(!1), children: v("cancel", { defaultValue: "Cancel" }) })
              ] }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          be,
          {
            serviceAccountID: o,
            onClose: () => z(!1),
            open: V
          }
        )
      ]
    }
  ) : /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px 0" }, children: /* @__PURE__ */ e.jsx(Y, { description: c("serviceAccount.notFound", { defaultValue: "Service account not found." }) }) });
}, yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: et
}, Symbol.toStringTag, { value: "Module" }));
export {
  mt as S,
  yt as a
};
