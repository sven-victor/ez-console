import { j as e, T as he } from "./vendor.js";
import { useState as V, useEffect as pe } from "react";
import { useRequest as E } from "ahooks";
import { App as J, Form as y, Modal as H, Radio as te, Select as Z, Input as ee, Space as I, Button as g, Tooltip as fe, Tag as B, Badge as N, Card as G, Row as me, Col as ae, Table as ve, Typography as ye, Popconfirm as Ae, Switch as ke, DatePicker as Ce, Alert as Ee, Skeleton as we, Empty as Q, Spin as re, Tabs as xe, Descriptions as L } from "antd";
import { TeamOutlined as Fe, CheckCircleOutlined as se, CloseCircleOutlined as Ie, EyeOutlined as Pe, EditOutlined as X, LockOutlined as Y, DeleteOutlined as oe, ReloadOutlined as Te, PlusOutlined as je, KeyOutlined as ie, SyncOutlined as ge, CopyOutlined as De, ExclamationCircleOutlined as Ke, RollbackOutlined as Re, UserOutlined as Oe } from "@ant-design/icons";
import { useNavigate as Ve, Link as Ne, useLocation as Ue, useParams as Me } from "react-router-dom";
import { g as R, b as Le } from "./components.js";
import { a as b } from "./index.js";
import { P as ce, f as q } from "./base.js";
import { useTranslation as O } from "react-i18next";
import { a as le, b as Se, u as Be } from "./contexts.js";
import qe from "./not_found.js";
import Ge from "dayjs";
import { createStyles as $e } from "antd-style";
const _e = ({
  serviceAccountID: i,
  onClose: a,
  open: c = !1,
  onSuccess: _,
  enableMultiOrg: k = !1,
  organizations: d = []
}) => {
  const { message: t } = J.useApp(), { hasGlobalPermission: f } = le(), { t: o } = O("authorization"), { t: m } = O("common"), { currentOrgId: z } = Se(), [n] = y.useForm(), [C, P] = V("global"), [x, S] = V(void 0), [D, A] = V(null), { run: K, loading: r } = E((u) => {
    if (i) {
      const F = {
        name: u.name,
        description: u.description ?? ""
      };
      return b.authorization.updateServiceAccount({ id: i }, F);
    }
    const h = {
      name: u.name,
      description: u.description || ""
    };
    return C === "organization" && x && (h.organization_id = x), b.authorization.createServiceAccount(h);
  }, {
    onSuccess: () => {
      t.success(o("serviceAccount.saveSuccess", { defaultValue: "Service account saved successfully." })), a(), _ == null || _();
    },
    onError: () => {
      t.error(o("serviceAccount.saveError", { defaultValue: "Failed to save service account." }));
    },
    manual: !0
  }), { run: v, loading: w } = E(
    (u) => b.authorization.getServiceAccountById({ id: u }),
    {
      manual: !0,
      onSuccess: (u) => {
        var F;
        const h = u.organization_id || "";
        P(h ? "organization" : "global"), S(h || void 0), A(h ? ((F = u.organization) == null ? void 0 : F.name) ?? h : null), n.setFieldsValue({
          name: u.name,
          description: u.description,
          organization_id: h || void 0
        });
      },
      onError: () => {
        t.error(o("serviceAccount.loadError", { defaultValue: "Failed to load service account." }));
      }
    }
  );
  return pe(() => {
    if (c) {
      n.resetFields();
      const u = z || (d.length > 0 ? d[0].id : ""), h = k && u ? "organization" : "global";
      P(h), S(h === "organization" ? u : void 0), i ? v(i) : (A(null), n.setFieldsValue({
        organization_id: h === "organization" ? u : void 0
      }));
    }
  }, [i, c, k, d, z, n, v, o]), /* @__PURE__ */ e.jsx(
    H,
    {
      title: i ? o("serviceAccount.edit", { defaultValue: "Edit Service Account" }) : o("serviceAccount.create", { defaultValue: "Create Service Account" }),
      width: 500,
      loading: w,
      afterOpenChange: (u) => {
        u || (n.resetFields(), a());
      },
      onCancel: () => {
        n.resetFields(), a();
      },
      open: c,
      footer: /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(g, { onClick: a, children: m("cancel", { defaultValue: "Cancel" }) }),
        /* @__PURE__ */ e.jsx(
          g,
          {
            type: "primary",
            onClick: n.submit,
            loading: r || w,
            children: m("save", { defaultValue: "Save" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(
        y,
        {
          form: n,
          layout: "vertical",
          onFinish: K,
          children: [
            k && !i && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(y.Item, { label: o("serviceAccount.scope", { defaultValue: "Scope" }), children: /* @__PURE__ */ e.jsxs(
                te.Group,
                {
                  value: C,
                  onChange: (u) => {
                    var l;
                    const h = u.target.value;
                    P(h);
                    const F = h === "organization" ? z || ((l = d[0]) == null ? void 0 : l.id) : void 0;
                    S(F), n.setFieldsValue({ organization_id: F });
                  },
                  disabled: !f("authorization:service_account:create"),
                  children: [
                    /* @__PURE__ */ e.jsx(te, { value: "global", children: o("serviceAccount.global", { defaultValue: "Global" }) }),
                    /* @__PURE__ */ e.jsx(te, { value: "organization", children: o("serviceAccount.organizationScoped", { defaultValue: "Organization" }) })
                  ]
                }
              ) }),
              C === "organization" && /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "organization_id",
                  label: o("serviceAccount.organization", { defaultValue: "Organization" }),
                  rules: [{ required: !0, message: o("serviceAccount.organizationRequired", { defaultValue: "Please select an organization." }) }],
                  children: /* @__PURE__ */ e.jsx(
                    Z,
                    {
                      placeholder: o("serviceAccount.selectOrganization", { defaultValue: "Select organization" }),
                      options: d.map((u) => ({ value: u.id, label: u.name })),
                      value: x,
                      onChange: (u) => S(u)
                    }
                  )
                }
              )
            ] }),
            k && i && /* @__PURE__ */ e.jsx(y.Item, { label: o("serviceAccount.organization", { defaultValue: "Organization" }), children: /* @__PURE__ */ e.jsx("span", { children: D ?? o("serviceAccount.global", { defaultValue: "Global" }) }) }),
            /* @__PURE__ */ e.jsx(
              y.Item,
              {
                label: o("serviceAccount.name", { defaultValue: "Name" }),
                name: "name",
                rules: [{ required: !0, message: o("serviceAccount.nameRequired", { defaultValue: "Please enter a name for the service account." }) }],
                children: /* @__PURE__ */ e.jsx(ee, { placeholder: o("serviceAccount.namePlaceholder", { defaultValue: "Enter service account name" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              y.Item,
              {
                label: o("serviceAccount.description", { defaultValue: "Description" }),
                name: "description",
                children: /* @__PURE__ */ e.jsx(he, { rows: 4, placeholder: o("serviceAccount.descriptionPlaceholder", { defaultValue: "Enter service account description (optional)" }) })
              }
            )
          ]
        }
      )
    }
  );
}, Je = () => {
  const { message: i } = J.useApp(), { t: a } = O("authorization"), { t: c } = O("common"), _ = Ve(), [k] = y.useForm(), { siteConfig: d } = Se(), { user: t } = Be(), f = (t == null ? void 0 : t.organizations) || [], o = (d == null ? void 0 : d.enable_multi_org) ?? !1, [m, z] = V([]), [n, C] = V(0), [P, x] = V(!1), [S, D] = V(null), [A, K] = V({
    current: ce.DEFAULT_CURRENT,
    page_size: ce.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), { loading: r, refresh: v } = E(
    () => b.authorization.getServiceAccounts(A),
    {
      refreshDeps: [A],
      debounceWait: 300,
      onSuccess: (s) => {
        z(s.data || []), C(s.total || 0);
      },
      onError: () => {
        i.error(a("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }));
      }
    }
  ), { run: w } = E(
    async ({ id: s }) => b.authorization.deleteServiceAccount({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        i.success(
          a("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully" })
        ), v();
      },
      onError: () => {
        i.error(a("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }));
      }
    }
  ), { run: u } = E(
    async (s) => b.authorization.updateServiceAccountStatus(
      { id: s.id },
      { status: s.status }
    ),
    {
      manual: !0,
      onSuccess: () => {
        i.success(
          a("serviceAccount.statusUpdateSuccess", { defaultValue: "Status updated successfully" })
        ), v();
      },
      onError: () => {
        i.error(
          a("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" })
        );
      }
    }
  ), h = (s) => {
    K({
      ...A,
      current: ce.DEFAULT_CURRENT,
      search: s.search,
      organization_id: s.organization_id || void 0
    });
  }, F = (s, p) => {
    K((M) => ({
      ...M,
      current: s,
      page_size: p
    }));
  }, l = () => {
    D(null), x(!0);
  }, T = (s) => {
    D(s.id), x(!0);
  }, j = () => {
    x(!1);
  }, U = (s) => {
    w({ id: s });
  }, be = (s) => {
    const p = s.status === "active" ? "disabled" : "active";
    u({ id: s.id, status: p });
  }, ze = [
    {
      title: a("serviceAccount.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (s, p) => /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:view", fallback: s, children: /* @__PURE__ */ e.jsx(Ne, { to: `/authorization/service-accounts/${p.id}`, children: s }) })
    },
    {
      title: a("serviceAccount.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description",
      render: (s) => /* @__PURE__ */ e.jsx(fe, { title: s, children: /* @__PURE__ */ e.jsx("span", { children: (s == null ? void 0 : s.length) > 30 ? `${s.substring(0, 30)}...` : s }) })
    },
    ...o ? [
      {
        title: a("serviceAccount.organization", { defaultValue: "Organization" }),
        key: "organization",
        render: (s, p) => {
          var M;
          return p.organization_id ? /* @__PURE__ */ e.jsx(B, { icon: /* @__PURE__ */ e.jsx(Fe, {}), color: "blue", children: ((M = p.organization) == null ? void 0 : M.name) || p.organization_id }) : /* @__PURE__ */ e.jsx(B, { color: "default", children: a("serviceAccount.global", { defaultValue: "Global" }) });
        }
      }
    ] : [],
    {
      title: a("serviceAccount.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (s) => s === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: a("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: a("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("serviceAccount.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (s, p) => {
        var M;
        return /* @__PURE__ */ e.jsxs(I, { size: [0, 4], wrap: !0, children: [
          (M = p.roles) == null ? void 0 : M.map((ne) => /* @__PURE__ */ e.jsx(B, { color: "blue", children: ne.name }, ne.id)),
          (!p.roles || p.roles.length === 0) && /* @__PURE__ */ e.jsx(B, { children: a("serviceAccount.noRoles", { defaultValue: "No Roles" }) })
        ] });
      }
    },
    {
      title: a("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }),
      key: "policy",
      render: (s, p) => p.policy_document && p.policy_document.Statement && p.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(B, { color: "green", icon: /* @__PURE__ */ e.jsx(se, {}), children: a("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }) }) : /* @__PURE__ */ e.jsx(B, { color: "default", icon: /* @__PURE__ */ e.jsx(Ie, {}), children: a("serviceAccount.noPolicy", { defaultValue: "No Policy" }) })
    },
    {
      title: a("serviceAccount.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (s) => q(s)
    },
    {
      title: a("serviceAccount.lastAccess", { defaultValue: "Last Access" }),
      dataIndex: "last_access",
      key: "last_access",
      render: (s) => s ? q(s) : a("serviceAccount.neverAccessed", { defaultValue: "Never Accessed" })
    },
    {
      title: c("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (s, p) => /* @__PURE__ */ e.jsx(
        Le,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Pe, {}),
              tooltip: a("serviceAccount.viewDetail", { defaultValue: "View Service Account Details" }),
              onClick: async () => _(`/authorization/service-accounts/${p.id}`),
              permission: "authorization:service_account:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(X, {}),
              tooltip: a("serviceAccount.edit", { defaultValue: "Edit Service Account" }),
              onClick: async () => T(p),
              permission: "authorization:service_account:update"
            },
            {
              key: "toggleStatus",
              icon: p.status === "active" ? /* @__PURE__ */ e.jsx(Y, {}) : /* @__PURE__ */ e.jsx(se, {}),
              tooltip: p.status === "active" ? a("serviceAccount.actionTooltipDisable", { defaultValue: "Disable this service account" }) : a("serviceAccount.actionTooltipEnable", { defaultValue: "Enable this service account" }),
              onClick: async () => be(p),
              permission: "authorization:service_account:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(oe, {}),
              danger: !0,
              tooltip: a("serviceAccount.delete", { defaultValue: "Delete Service Account" }),
              confirm: {
                title: a("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
                onConfirm: async () => U(p.id),
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
    /* @__PURE__ */ e.jsx(G, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      y,
      {
        form: k,
        layout: "vertical",
        onFinish: h,
        name: "serviceAccountSearchForm",
        initialValues: {
          search: A.search,
          organization_id: A.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(me, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsxs(I, { children: [
            /* @__PURE__ */ e.jsx(y.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              ee.Search,
              {
                placeholder: a("serviceAccount.searchPlaceholder", { defaultValue: "Search by name or description" }),
                allowClear: !0,
                onSearch: () => {
                  h(k.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            !o && /* @__PURE__ */ e.jsx(y.Item, { name: "organization_id", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              Z,
              {
                placeholder: a("serviceAccount.filterByOrg", { defaultValue: "All organizations" }),
                allowClear: !0,
                style: { minWidth: 160 },
                options: [
                  { value: "", label: a("serviceAccount.global", { defaultValue: "Global" }) },
                  ...f.map((s) => ({ value: s.id, label: s.name }))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsxs(I, { children: [
            /* @__PURE__ */ e.jsx(
              g,
              {
                onClick: () => {
                  h(k.getFieldsValue());
                },
                icon: /* @__PURE__ */ e.jsx(Te, {}),
                children: c("refresh", { defaultValue: "Refresh" })
              }
            ),
            /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:create", children: /* @__PURE__ */ e.jsx(
              g,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(je, {}),
                onClick: l,
                children: a("serviceAccount.create", { defaultValue: "Create Service Account" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx(
      ve,
      {
        rowKey: "id",
        dataSource: m,
        columns: ze,
        loading: r,
        pagination: {
          current: A.current,
          pageSize: A.page_size,
          total: n,
          onChange: F,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (s) => c("totalItems", { defaultValue: `Total ${s} items`, total: s })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      _e,
      {
        serviceAccountID: S,
        onClose: j,
        open: P,
        enableMultiOrg: o,
        organizations: f,
        onSuccess: () => {
          v();
        }
      }
    )
  ] });
}, ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Je
}, Symbol.toStringTag, { value: "Module" })), { Text: $, Paragraph: ue } = ye, { TextArea: We } = ee, He = ({ serviceAccountID: i }) => {
  const { message: a } = J.useApp(), { t: c } = O("authorization"), { t: _ } = O("common"), [k, d] = V(!1), [t] = y.useForm(), [f, o] = V(null), [m, z] = V(null), [n, C] = V(!1), {
    data: P = [],
    loading: x,
    refresh: S
  } = E(
    () => b.authorization.getServiceAccountAccessKeys({ id: i }),
    {
      ready: !!i,
      refreshDeps: [i],
      onError: () => {
        a.error(c("serviceAccount.loadKeysError", { defaultValue: "Failed to load access keys." }));
      }
    }
  ), { run: D } = E(
    (l) => b.authorization.deleteServiceAccountAccessKey({ id: i, keyId: l }),
    {
      manual: !0,
      onSuccess: () => {
        a.success(
          c("serviceAccount.deleteKeySuccess", { defaultValue: "Access key deleted successfully." })
        ), S();
      },
      onError: () => {
        a.error(c("serviceAccount.deleteKeyError", { defaultValue: "Failed to delete access key." }));
      }
    }
  ), A = (l) => {
    navigator.clipboard.writeText(l).then(
      () => {
        a.success(c("serviceAccount.copyKeySuccess", { defaultValue: "Copied to clipboard!" }));
      },
      (T) => {
        console.error("Could not copy text: ", T);
      }
    );
  }, K = () => {
    o(null), t.resetFields(), d(!0);
  }, r = (l) => {
    o(l), t.setFieldsValue({
      name: l.name,
      description: l.description,
      status: l.status === "active",
      expires_at: l.expires_at ? Ge(l.expires_at) : void 0
    }), d(!0);
  }, v = () => {
    d(!1), t.resetFields();
  }, { run: w, loading: u } = E(
    async () => {
      const l = await t.validateFields();
      if (f) {
        const T = await b.authorization.updateServiceAccountAccessKey({ id: i, keyId: f.id }, {
          name: l.name,
          description: l.description,
          status: l.status ? "active" : "disabled",
          expires_at: l.expires_at ? l.expires_at.toISOString() : void 0
        });
        return d(!1), T;
      } else {
        const T = await b.authorization.createServiceAccountAccessKey({ id: i }, {
          name: l.name,
          description: l.description,
          expires_at: l.expires_at ? l.expires_at.toISOString() : void 0
        });
        z(T), d(!1), C(!0);
      }
    },
    {
      manual: !0,
      onSuccess: () => {
        a.success(c("serviceAccount.updateKeySuccess", { defaultValue: "Access key updated successfully." })), S();
      },
      onError: () => {
        a.error(c("serviceAccount.updateKeyError", { defaultValue: "Failed to update access key." }));
      }
    }
  ), h = () => {
    C(!1), z(null);
  }, F = [
    {
      title: c("serviceAccount.keyName", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: c("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
      dataIndex: "access_key_id",
      key: "access_key_id",
      render: (l) => /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(ie, {}),
        /* @__PURE__ */ e.jsx($, { copyable: !0, children: l })
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
      render: (l) => l === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: c("serviceAccount.keyActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: c("serviceAccount.keyDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: c("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
      dataIndex: "expires_at",
      key: "expires_at",
      render: (l) => l ? q(l) : /* @__PURE__ */ e.jsx($, { type: "secondary", children: c("serviceAccount.neverExpires", { defaultValue: "Never" }) })
    },
    {
      title: c("serviceAccount.keyLastUsed", { defaultValue: "Last Used" }),
      dataIndex: "last_used",
      key: "last_used",
      render: (l) => l ? q(l) : /* @__PURE__ */ e.jsx($, { type: "secondary", children: c("serviceAccount.keyNeverUsed", { defaultValue: "Never" }) })
    },
    {
      title: _("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (l, T) => /* @__PURE__ */ e.jsxs(I, { size: "small", children: [
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:access_key:update", children: /* @__PURE__ */ e.jsx(fe, { title: c("serviceAccount.updateKey", { defaultValue: "Update Key" }), children: /* @__PURE__ */ e.jsx(
          g,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(X, {}),
            onClick: () => r(T)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:access_key:delete", children: /* @__PURE__ */ e.jsx(
          Ae,
          {
            title: c("serviceAccount.deleteKeyConfirm", { defaultValue: "Are you sure you want to delete this access key?" }),
            onConfirm: () => D(T.id),
            okText: _("confirm", { defaultValue: "Confirm" }),
            cancelText: _("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              g,
              {
                type: "text",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(oe, {})
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
          /* @__PURE__ */ e.jsx(ie, {}),
          c("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
        ] }),
        extra: /* @__PURE__ */ e.jsxs(I, { children: [
          /* @__PURE__ */ e.jsx(
            g,
            {
              icon: /* @__PURE__ */ e.jsx(ge, {}),
              onClick: S,
              loading: x,
              children: _("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:access_key:create", children: /* @__PURE__ */ e.jsx(
            g,
            {
              type: "primary",
              icon: /* @__PURE__ */ e.jsx(je, {}),
              onClick: K,
              children: c("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" })
            }
          ) })
        ] }),
        children: /* @__PURE__ */ e.jsx(
          ve,
          {
            columns: F,
            dataSource: P,
            rowKey: "id",
            loading: x,
            pagination: !1
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      H,
      {
        title: f ? c("serviceAccount.updateKey", { defaultValue: "Update Access Key" }) : c("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" }),
        open: k,
        onOk: w,
        confirmLoading: u,
        onCancel: v,
        children: /* @__PURE__ */ e.jsxs(
          y,
          {
            form: t,
            layout: "vertical",
            children: [
              /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "name",
                  label: c("serviceAccount.keyName", { defaultValue: "Key Name" }),
                  rules: [{ required: !0, message: c("serviceAccount.keyNameRequired", { defaultValue: "Please enter a name for the access key." }) }],
                  children: /* @__PURE__ */ e.jsx(ee, { placeholder: c("serviceAccount.keyNamePlaceholder", { defaultValue: "Enter key name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "description",
                  label: c("serviceAccount.keyDescription", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    We,
                    {
                      rows: 3,
                      placeholder: c("serviceAccount.keyDescriptionPlaceholder", { defaultValue: "Enter key description (optional)" })
                    }
                  )
                }
              ),
              f && /* @__PURE__ */ e.jsx(
                y.Item,
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
                y.Item,
                {
                  name: "expires_at",
                  label: c("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
                  children: /* @__PURE__ */ e.jsx(
                    Ce,
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
        title: /* @__PURE__ */ e.jsxs(I, { children: [
          /* @__PURE__ */ e.jsx(Ke, { style: { color: "#faad14" } }),
          c("serviceAccount.secretNoticeTitle", { defaultValue: "Access Key Created - Important!" })
        ] }),
        open: n,
        footer: [
          /* @__PURE__ */ e.jsx(g, { onClick: h, children: _("confirm", { defaultValue: "I have copied the secret key. Close" }) }, "close")
        ],
        closable: !1,
        children: [
          /* @__PURE__ */ e.jsx(
            Ee,
            {
              message: c("serviceAccount.secretNoticeMessage", { defaultValue: "Your new Secret Access Key is displayed below. This is the only time you will be able to see this secret. Please copy it and store it securely." }),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          m && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs($, { strong: !0, children: [
                c("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(ue, { copyable: { text: m.access_key_id }, children: m.access_key_id })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs($, { strong: !0, children: [
                c("serviceAccount.secretKey", { defaultValue: "Secret Access Key" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(ue, { copyable: { text: m.secret_access_key || "" }, children: m.secret_access_key })
            ] }),
            /* @__PURE__ */ e.jsx(
              g,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(De, {}),
                onClick: () => {
                  const l = `Access Key: ${m.access_key_id}
Secret Key: ${m.secret_access_key}`;
                  A(l);
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
}, { Text: de } = ye, Qe = ({ serviceAccount: i, onRefresh: a, loading: c }) => {
  const { message: _ } = J.useApp(), { id: k } = i || {}, { t: d } = O("authorization"), { t } = O("common"), [f, o] = V([]), [m, z] = V([]), { hasPermission: n } = le();
  pe(() => {
    z((i == null ? void 0 : i.roles) || []);
  }, [i]);
  const [C, P] = V(void 0), x = i == null ? void 0 : i.organization_id, { loading: S } = E(async () => b.authorization.listRoles({
    current: 1,
    page_size: 20,
    search: C,
    ...x ? { organization_id: x } : {}
  }), {
    onSuccess: (r) => {
      const v = r.data;
      m.forEach((w) => {
        v.find((h) => h.id === w.id) || v.push(w);
      }), o(v);
    },
    onError: (r) => {
      console.error("Failed to load roles:", r), _.error(d("serviceAccount.loadRolesError", { defaultValue: "Failed to load roles." }));
    },
    debounceWait: 300,
    refreshDeps: [C, x]
  }), { run: D, loading: A } = E(async () => {
    if (k)
      return b.authorization.assignServiceAccountRoles({ id: k }, { role_ids: m.map((r) => r.id) });
  }, {
    onSuccess: () => {
      _.success(d("serviceAccount.assignRolesSuccess", { defaultValue: "Roles assigned successfully." })), a();
    },
    onError: (r) => {
      console.error("Failed to assign roles:", r), _.error(d("serviceAccount.assignRolesError", { defaultValue: "Failed to assign roles." }));
    },
    manual: !0
  }), K = (r) => {
    z(r.map((v) => f.find((w) => w.id === v) || {
      id: v,
      name: v,
      description: v
    }));
  };
  return /* @__PURE__ */ e.jsx(
    G,
    {
      title: /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(Y, {}),
        d("serviceAccount.authorization", { defaultValue: "Authorization" })
      ] }),
      extra: /* @__PURE__ */ e.jsx(
        g,
        {
          icon: /* @__PURE__ */ e.jsx(ge, {}),
          onClick: () => {
            a();
          },
          disabled: c || A,
          loading: A,
          children: t("refresh", { defaultValue: "Refresh" })
        }
      ),
      children: A ? /* @__PURE__ */ e.jsx(we, { active: !0, paragraph: { rows: 4 } }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(de, { children: d("serviceAccount.roles", { defaultValue: "Roles" }) }),
          /* @__PURE__ */ e.jsx("div", { style: { marginTop: 8 }, children: m.length > 0 ? f.filter((r) => m.some((v) => v.id === r.id)).map((r) => /* @__PURE__ */ e.jsx(B, { color: "blue", children: r.name }, r.id)) : /* @__PURE__ */ e.jsx(
            Q,
            {
              image: Q.PRESENTED_IMAGE_SIMPLE,
              description: d("serviceAccount.noRoles", { defaultValue: "No roles assigned." }),
              style: { margin: "10px 0" }
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(de, { children: d("serviceAccount.assignRoles", { defaultValue: "Assign Roles" }) }),
          /* @__PURE__ */ e.jsx(
            Z,
            {
              mode: "multiple",
              style: { width: "100%", marginTop: 8 },
              placeholder: d("serviceAccount.selectRoles", { defaultValue: "Select roles to assign" }),
              value: m.map((r) => r.id),
              onSearch: (r) => {
                P(r);
              },
              onOpenChange: (r) => {
                r && P(void 0);
              },
              disabled: !n("authorization:service_account:role:assign"),
              onChange: K,
              loading: c || S,
              optionFilterProp: "label",
              options: f.map((r) => ({
                label: r.name,
                value: r.id,
                title: r.description
              }))
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:role:assign", children: /* @__PURE__ */ e.jsx(
          g,
          {
            type: "primary",
            onClick: D,
            loading: A,
            disabled: c,
            children: d("serviceAccount.assignRoles", { defaultValue: "Assign Roles" })
          }
        ) }) })
      ] })
    }
  );
}, { TabPane: W } = xe, Xe = {
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
}, Ye = $e(({ css: i }) => ({
  rolePolicy: i`
       .ant-collapse-content>.ant-collapse-content-box{
        padding: 2px;
      }
      .ant-form-item-additional>#policy_document_extra{
        min-height: 0;
      }
    `,
  rolePermissionExtra: i`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
  rolePolicyExtra: i`
      position: absolute;
      right: 20px;
      top: 5px;
    `
})), Ze = () => {
  const { message: i } = J.useApp(), { styles: a } = Ye(), d = Ue().hash.replace("#", "") || "basic", { t } = O("authorization"), { t: f } = O("common"), { id: o } = Me(), m = Ve(), { hasPermission: z } = le(), [n, C] = V(null), [P, x] = V(!1), [S] = y.useForm(), [D, A] = V(!1), { loading: K, refresh: r } = E(
    () => b.authorization.getServiceAccountById({ id: o }),
    {
      refreshDeps: [o],
      ready: !!o,
      onSuccess: (j) => {
        C(j || null);
      },
      onError: () => {
        i.error(t("serviceAccount.loadError", { defaultValue: "Failed to load service account." }));
      }
    }
  ), v = (j) => {
    m(`#${j}`);
  }, { run: w } = E(
    () => b.authorization.deleteServiceAccount({ id: o }),
    {
      manual: !0,
      onSuccess: () => {
        i.success(
          t("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully." })
        ), m("/authorization/service-accounts");
      },
      onError: (j) => {
        console.error(
          t("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }),
          j
        ), i.error(t("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }));
      }
    }
  ), u = () => {
    o && w();
  }, { run: h, loading: F } = E(async () => {
    if (n)
      return b.authorization.updateServiceAccountStatus({ id: o }, {
        status: n.status === "active" ? "disabled" : "active"
      });
  }, {
    onSuccess: (j) => {
      C(j || null), i.success(t("serviceAccount.statusUpdateSuccess", { defaultValue: "Service account status updated successfully." }));
    },
    onError: (j) => {
      console.error(t("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }), j), i.error(t("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }));
    },
    manual: !0
  }), { run: l } = E(
    (j) => b.authorization.setServiceAccountPolicy({ id: o }, { policy_document: j }),
    {
      manual: !0,
      onSuccess: () => {
        i.success(
          t("serviceAccount.policyUpdateSuccess", { defaultValue: "Policy document updated successfully." })
        ), x(!1), r();
      },
      onError: (j) => {
        console.error(
          t("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }),
          j
        ), i.error(t("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }));
      }
    }
  ), T = (j) => {
    if (!o) return;
    let U;
    try {
      U = JSON.parse(j.policy_document);
    } catch {
      i.error(t("serviceAccount.policyInvalidJson", { defaultValue: "Invalid JSON format for policy document." }));
      return;
    }
    l(U);
  };
  return o ? K ? /* @__PURE__ */ e.jsx(re, { size: "large", style: { display: "flex", justifyContent: "center", padding: "50px" } }) : n ? /* @__PURE__ */ e.jsxs(
    G,
    {
      title: /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(Oe, {}),
        n.name,
        n.status === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: t("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: t("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(I, { children: [
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          g,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(X, {}),
            onClick: () => A(!0),
            disabled: D,
            children: f("edit", { defaultValue: "Edit" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          g,
          {
            icon: n.status === "active" ? /* @__PURE__ */ e.jsx(Y, {}) : /* @__PURE__ */ e.jsx(se, {}),
            onClick: h,
            loading: F,
            children: n.status === "active" ? f("disable", { defaultValue: "Disable" }) : f("enable", { defaultValue: "Enable" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(
          Ae,
          {
            title: t("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: u,
            okText: f("confirm", { defaultValue: "Confirm" }),
            cancelText: f("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(g, { danger: !0, icon: /* @__PURE__ */ e.jsx(oe, {}), children: f("delete", { defaultValue: "Delete" }) })
          }
        ) }),
        /* @__PURE__ */ e.jsx(g, { icon: /* @__PURE__ */ e.jsx(Re, {}), onClick: () => m("/authorization/service-accounts"), children: f("back", { defaultValue: "Back" }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(xe, { defaultActiveKey: d, onChange: v, children: [
          /* @__PURE__ */ e.jsx(W, { tab: t("serviceAccount.tabs.basic", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(L, { bordered: !0, column: 2, children: [
            /* @__PURE__ */ e.jsx(L.Item, { label: t("serviceAccount.name", { defaultValue: "Name" }), span: 2, children: n.name }),
            /* @__PURE__ */ e.jsx(L.Item, { label: t("serviceAccount.description", { defaultValue: "Description" }), span: 2, children: n.description || t("serviceAccount.noDescription", { defaultValue: "N/A" }) }),
            /* @__PURE__ */ e.jsx(L.Item, { label: t("serviceAccount.status", { defaultValue: "Status" }), children: n.status === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: t("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: t("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) }) }),
            /* @__PURE__ */ e.jsx(L.Item, { label: t("serviceAccount.lastAccess", { defaultValue: "Last Access" }), children: n.last_access ? q(n.last_access) : t("serviceAccount.neverAccessed", { defaultValue: "Never" }) }),
            /* @__PURE__ */ e.jsx(L.Item, { label: t("serviceAccount.createdAt", { defaultValue: "Created At" }), children: q(n.created_at) }),
            /* @__PURE__ */ e.jsx(L.Item, { label: t("serviceAccount.updatedAt", { defaultValue: "Updated At" }), children: q(n.updated_at) })
          ] }) }, "basic"),
          /* @__PURE__ */ e.jsx(
            W,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(ie, {}),
                t("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
              ] }),
              disabled: !z("authorization:service_account:access_key:list"),
              children: /* @__PURE__ */ e.jsx(He, { serviceAccountID: o })
            },
            "access-keys"
          ),
          /* @__PURE__ */ e.jsx(
            W,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(Y, {}),
                t("serviceAccount.authorization", { defaultValue: "Authorization" })
              ] }),
              disabled: !z("authorization:service_account:role:list"),
              children: /* @__PURE__ */ e.jsx(
                Qe,
                {
                  serviceAccount: n,
                  onRefresh: r
                }
              )
            },
            "authorization"
          ),
          /* @__PURE__ */ e.jsxs(
            W,
            {
              tab: t("serviceAccount.tabs.policy", { defaultValue: "Policy Document" }),
              disabled: !z("authorization:service_account:policy:view"),
              children: [
                /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(me, { justify: "end", children: /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(R, { permission: "authorization:service_account:policy:update", children: /* @__PURE__ */ e.jsx(
                  g,
                  {
                    type: "primary",
                    icon: /* @__PURE__ */ e.jsx(X, {}),
                    onClick: () => {
                      x(!0), S.setFieldsValue({
                        policy_document: JSON.stringify(n.policy_document, null, 2)
                      });
                    },
                    children: t("serviceAccount.editPolicy", { defaultValue: "Edit Policy" })
                  }
                ) }) }) }) }),
                /* @__PURE__ */ e.jsx(re, { spinning: K, children: n.policy_document && n.policy_document.Statement && n.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx("pre", { style: { whiteSpace: "pre-wrap", overflowX: "auto" }, children: JSON.stringify(n.policy_document, null, 2) }) }) : /* @__PURE__ */ e.jsx(Q, { description: t("serviceAccount.noPolicy", { defaultValue: "No policy document defined for this service account." }) }) })
              ]
            },
            "policy"
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          H,
          {
            title: t("serviceAccount.editPolicy", { defaultValue: "Edit Policy" }),
            open: P,
            onCancel: () => {
              x(!1), S.resetFields();
            },
            footer: null,
            width: 700,
            children: /* @__PURE__ */ e.jsxs(y, { form: S, layout: "vertical", onFinish: T, children: [
              /* @__PURE__ */ e.jsx(
                y.Item,
                {
                  name: "policy_document",
                  extra: /* @__PURE__ */ e.jsx("span", { className: a.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                    Z,
                    {
                      style: { width: 120 },
                      placeholder: t("serviceAccount.insertTemplate", { defaultValue: "Insert Template" }),
                      value: t("serviceAccount.insertTemplate", { defaultValue: "Insert Template" }),
                      options: [
                        { label: t("serviceAccount.allowAll", { defaultValue: "Allow All" }), value: "allow_all" },
                        { label: t("serviceAccount.denyAll", { defaultValue: "Deny All" }), value: "deny_all" },
                        { label: t("serviceAccount.allowWithAction", { defaultValue: "Allow with Action" }), value: "allow_with_action" },
                        { label: t("serviceAccount.denyWithCondition", { defaultValue: "Allow with Condition" }), value: "allow_with_condition" },
                        { label: t("serviceAccount.allowWithUri", { defaultValue: "Allow with URI" }), value: "allow_with_uri" }
                      ],
                      onChange: (j) => {
                        const U = Xe[j];
                        U && S.setFieldValue("policy_document", JSON.stringify(U, null, 2));
                      }
                    }
                  ) }),
                  children: /* @__PURE__ */ e.jsx(
                    he,
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
                /* @__PURE__ */ e.jsx(g, { onClick: () => x(!1), children: f("cancel", { defaultValue: "Cancel" }) })
              ] }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          _e,
          {
            serviceAccountID: o,
            onClose: () => A(!1),
            open: D
          }
        )
      ]
    }
  ) : /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px 0" }, children: /* @__PURE__ */ e.jsx(Q, { description: t("serviceAccount.notFound", { defaultValue: "Service account not found." }) }) }) : /* @__PURE__ */ e.jsx(qe, {});
}, mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ze
}, Symbol.toStringTag, { value: "Module" }));
export {
  ft as S,
  mt as a
};
