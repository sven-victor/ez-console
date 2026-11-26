import { j as e, T as pe } from "./vendor.js";
import { useState as V, useEffect as fe } from "react";
import { useRequest as k } from "ahooks";
import { App as W, Form as v, Modal as H, Radio as te, Select as X, Input as ee, Space as F, Button as g, Tooltip as me, Tag as B, Badge as N, Card as G, Row as ve, Col as ce, Table as ye, Typography as Ae, Popconfirm as se, Switch as Ce, DatePicker as ke, Alert as we, Skeleton as Ee, Empty as Q, Spin as ue, Tabs as xe, Descriptions as M } from "antd";
import { TeamOutlined as Te, CheckCircleOutlined as ie, CloseCircleOutlined as Fe, EyeOutlined as Ie, EditOutlined as Y, LockOutlined as Z, DeleteOutlined as le, ReloadOutlined as Pe, PlusOutlined as je, KeyOutlined as oe, SyncOutlined as ge, CopyOutlined as De, ExclamationCircleOutlined as Ke, RollbackOutlined as Oe, UserOutlined as Re } from "@ant-design/icons";
import { useNavigate as Ve, Link as Ne, useLocation as Ue, useParams as Le } from "react-router-dom";
import { i as O, c as Me, q as Be } from "./components.js";
import { a as z } from "./index.js";
import { P as ae, f as q, d as qe } from "./base.js";
import { useTranslation as R } from "react-i18next";
import { a as ne, b as Se, u as Ge } from "./contexts.js";
import $e from "./not_found.js";
import Je from "dayjs";
import { createStyles as We } from "antd-style";
const He = [], be = ({
  serviceAccountID: i,
  onClose: c,
  open: a = !1,
  onSuccess: b,
  enableMultiOrg: w = !1,
  organizations: d = He
}) => {
  const { message: t } = W.useApp(), { hasGlobalPermission: h } = ne(), { t: o } = R("authorization"), { t: m } = R("common"), { currentOrgId: _ } = Se(), [n] = v.useForm(), [C, I] = V("global"), [x, S] = V(void 0), [D, y] = V(null), { run: K, loading: r } = k((u) => {
    if (i) {
      const T = {
        name: u.name,
        description: u.description ?? ""
      };
      return z.authorization.updateServiceAccount({ id: i }, T);
    }
    const p = {
      name: u.name,
      description: u.description || ""
    };
    return C === "organization" && x && (p.organization_id = x), z.authorization.createServiceAccount(p);
  }, {
    onSuccess: () => {
      t.success(o("serviceAccount.saveSuccess", { defaultValue: "Service account saved successfully." })), c(), b == null || b();
    },
    onError: () => {
      t.error(o("serviceAccount.saveError", { defaultValue: "Failed to save service account." }));
    },
    manual: !0
  }), { run: A, loading: E } = k(
    (u) => z.authorization.getServiceAccountById({ id: u }),
    {
      manual: !0,
      onSuccess: (u) => {
        var T;
        const p = u.organization_id || "";
        I(p ? "organization" : "global"), S(p || void 0), y(p ? ((T = u.organization) == null ? void 0 : T.name) ?? p : null), n.setFieldsValue({
          name: u.name,
          description: u.description,
          organization_id: p || void 0
        });
      },
      onError: () => {
        t.error(o("serviceAccount.loadError", { defaultValue: "Failed to load service account." }));
      }
    }
  );
  return fe(() => {
    if (!a)
      return;
    n.resetFields();
    const u = _ || (d.length > 0 ? d[0].id : ""), p = w && u ? "organization" : "global";
    I(p), S(p === "organization" ? u : void 0), i ? A(i) : (y(null), n.setFieldsValue({
      organization_id: p === "organization" ? u : void 0
    }));
  }, [i, a]), /* @__PURE__ */ e.jsx(
    H,
    {
      title: i ? o("serviceAccount.edit", { defaultValue: "Edit Service Account" }) : o("serviceAccount.create", { defaultValue: "Create Service Account" }),
      width: 500,
      loading: E,
      afterOpenChange: (u) => {
        u || (n.resetFields(), c());
      },
      onCancel: () => {
        n.resetFields(), c();
      },
      open: a,
      footer: /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(g, { onClick: c, children: m("cancel", { defaultValue: "Cancel" }) }),
        /* @__PURE__ */ e.jsx(
          g,
          {
            type: "primary",
            onClick: n.submit,
            loading: r || E,
            children: m("save", { defaultValue: "Save" })
          }
        )
      ] }),
      getContainer: ".site-layout",
      children: /* @__PURE__ */ e.jsxs(
        v,
        {
          form: n,
          layout: "vertical",
          onFinish: K,
          children: [
            w && !i && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(v.Item, { label: o("serviceAccount.scope", { defaultValue: "Scope" }), children: /* @__PURE__ */ e.jsxs(
                te.Group,
                {
                  value: C,
                  onChange: (u) => {
                    var l;
                    const p = u.target.value;
                    I(p);
                    const T = p === "organization" ? _ || ((l = d[0]) == null ? void 0 : l.id) : void 0;
                    S(T), n.setFieldsValue({ organization_id: T });
                  },
                  disabled: !h("authorization:service_account:create"),
                  children: [
                    /* @__PURE__ */ e.jsx(te, { value: "global", children: o("serviceAccount.global", { defaultValue: "Global" }) }),
                    /* @__PURE__ */ e.jsx(te, { value: "organization", children: o("serviceAccount.organizationScoped", { defaultValue: "Organization" }) })
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
                    X,
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
            w && i && /* @__PURE__ */ e.jsx(v.Item, { label: o("serviceAccount.organization", { defaultValue: "Organization" }), children: /* @__PURE__ */ e.jsx("span", { children: D ?? o("serviceAccount.global", { defaultValue: "Global" }) }) }),
            /* @__PURE__ */ e.jsx(
              v.Item,
              {
                label: o("serviceAccount.name", { defaultValue: "Name" }),
                name: "name",
                rules: [{ required: !0, message: o("serviceAccount.nameRequired", { defaultValue: "Please enter a name for the service account." }) }],
                children: /* @__PURE__ */ e.jsx(ee, { placeholder: o("serviceAccount.namePlaceholder", { defaultValue: "Enter service account name" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              v.Item,
              {
                label: o("serviceAccount.description", { defaultValue: "Description" }),
                name: "description",
                children: /* @__PURE__ */ e.jsx(pe, { rows: 4, placeholder: o("serviceAccount.descriptionPlaceholder", { defaultValue: "Enter service account description (optional)" }) })
              }
            )
          ]
        }
      )
    }
  );
}, Qe = () => {
  const { message: i } = W.useApp(), { t: c } = R("authorization"), { t: a } = R("common"), b = Ve(), [w] = v.useForm(), { siteConfig: d } = Se(), { user: t } = Ge(), h = (t == null ? void 0 : t.organizations) || [], o = (d == null ? void 0 : d.enable_multi_org) ?? !1, [m, _] = V([]), [n, C] = V(0), [I, x] = V(!1), [S, D] = V(null), [y, K] = V({
    current: ae.DEFAULT_CURRENT,
    page_size: ae.DEFAULT_PAGE_SIZE,
    search: void 0,
    organization_id: void 0
  }), { loading: r, refresh: A } = k(
    () => z.authorization.getServiceAccounts(y),
    {
      refreshDeps: [y],
      debounceWait: 300,
      onSuccess: (s) => {
        _(s.data || []), C(s.total || 0);
      },
      onError: () => {
        i.error(c("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }));
      }
    }
  ), { run: E } = k(
    async ({ id: s }) => z.authorization.deleteServiceAccount({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        i.success(
          c("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully" })
        ), A();
      },
      onError: () => {
        i.error(c("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }));
      }
    }
  ), { run: u } = k(
    async (s) => z.authorization.updateServiceAccountStatus(
      { id: s.id },
      { status: s.status }
    ),
    {
      manual: !0,
      onSuccess: () => {
        i.success(
          c("serviceAccount.statusUpdateSuccess", { defaultValue: "Status updated successfully" })
        ), A();
      },
      onError: () => {
        i.error(
          c("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" })
        );
      }
    }
  ), p = (s) => {
    K({
      ...y,
      current: ae.DEFAULT_CURRENT,
      search: s.search,
      organization_id: s.organization_id || void 0
    });
  }, T = (s, f) => {
    K((L) => ({
      ...L,
      current: s,
      page_size: f
    }));
  }, l = () => {
    D(null), x(!0);
  }, P = (s) => {
    D(s.id), x(!0);
  }, j = () => {
    x(!1);
  }, U = (s) => {
    E({ id: s });
  }, _e = (s) => {
    const f = s.status === "active" ? "disabled" : "active";
    u({ id: s.id, status: f });
  }, ze = [
    {
      title: c("serviceAccount.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (s, f) => /* @__PURE__ */ e.jsx(O, { permission: "authorization:service_account:view", fallback: s, children: /* @__PURE__ */ e.jsx(Ne, { to: `/authorization/service-accounts/${f.id}`, children: s }) })
    },
    {
      title: c("serviceAccount.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description",
      render: (s) => /* @__PURE__ */ e.jsx(me, { title: s, children: /* @__PURE__ */ e.jsx("span", { children: (s == null ? void 0 : s.length) > 30 ? `${s.substring(0, 30)}...` : s }) })
    },
    ...o ? [
      {
        title: c("serviceAccount.organization", { defaultValue: "Organization" }),
        key: "organization",
        render: (s, f) => {
          var L;
          return f.organization_id ? /* @__PURE__ */ e.jsx(B, { icon: /* @__PURE__ */ e.jsx(Te, {}), color: "blue", children: ((L = f.organization) == null ? void 0 : L.name) || f.organization_id }) : /* @__PURE__ */ e.jsx(B, { color: "default", children: c("serviceAccount.global", { defaultValue: "Global" }) });
        }
      }
    ] : [],
    {
      title: c("serviceAccount.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (s) => s === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: c("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: c("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: c("serviceAccount.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (s, f) => {
        var L;
        return /* @__PURE__ */ e.jsxs(F, { size: [0, 4], wrap: !0, children: [
          (L = f.roles) == null ? void 0 : L.map((re) => /* @__PURE__ */ e.jsx(B, { color: "blue", children: re.name }, re.id)),
          (!f.roles || f.roles.length === 0) && /* @__PURE__ */ e.jsx(B, { children: c("serviceAccount.noRoles", { defaultValue: "No Roles" }) })
        ] });
      }
    },
    {
      title: c("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }),
      key: "policy",
      render: (s, f) => f.policy_document && f.policy_document.Statement && f.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(B, { color: "green", icon: /* @__PURE__ */ e.jsx(ie, {}), children: c("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }) }) : /* @__PURE__ */ e.jsx(B, { color: "default", icon: /* @__PURE__ */ e.jsx(Fe, {}), children: c("serviceAccount.noPolicy", { defaultValue: "No Policy" }) })
    },
    {
      title: c("serviceAccount.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (s) => q(s)
    },
    {
      title: c("serviceAccount.lastAccess", { defaultValue: "Last Access" }),
      dataIndex: "last_access",
      key: "last_access",
      render: (s) => s ? q(s) : c("serviceAccount.neverAccessed", { defaultValue: "Never Accessed" })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (s, f) => /* @__PURE__ */ e.jsx(
        Me,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              tooltip: c("serviceAccount.viewDetail", { defaultValue: "View Service Account Details" }),
              onClick: async () => b(`/authorization/service-accounts/${f.id}`),
              permission: "authorization:service_account:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Y, {}),
              tooltip: c("serviceAccount.edit", { defaultValue: "Edit Service Account" }),
              onClick: async () => P(f),
              permission: "authorization:service_account:update"
            },
            {
              key: "toggleStatus",
              icon: f.status === "active" ? /* @__PURE__ */ e.jsx(Z, {}) : /* @__PURE__ */ e.jsx(ie, {}),
              tooltip: f.status === "active" ? c("serviceAccount.actionTooltipDisable", { defaultValue: "Disable this service account" }) : c("serviceAccount.actionTooltipEnable", { defaultValue: "Enable this service account" }),
              confirm: {
                title: f.status === "active" ? c("serviceAccount.disableConfirm", {
                  defaultValue: "Are you sure you want to disable this service account?"
                }) : c("serviceAccount.enableConfirm", {
                  defaultValue: "Are you sure you want to enable this service account?"
                }),
                onConfirm: async () => _e(f),
                okText: a("confirm", { defaultValue: "Confirm" }),
                cancelText: a("cancel", { defaultValue: "Cancel" })
              },
              permission: "authorization:service_account:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(le, {}),
              danger: !0,
              tooltip: c("serviceAccount.delete", { defaultValue: "Delete Service Account" }),
              confirm: {
                title: c("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
                onConfirm: async () => U(f.id),
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
        form: w,
        layout: "vertical",
        onFinish: p,
        name: "serviceAccountSearchForm",
        initialValues: {
          search: y.search,
          organization_id: y.organization_id
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(ve, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(F, { children: [
            /* @__PURE__ */ e.jsx(v.Item, { name: "search", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              ee.Search,
              {
                placeholder: c("serviceAccount.searchPlaceholder", { defaultValue: "Search by name or description" }),
                allowClear: !0,
                onSearch: () => {
                  p(w.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            o && /* @__PURE__ */ e.jsx(v.Item, { name: "organization_id", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              X,
              {
                placeholder: c("serviceAccount.filterByOrg", { defaultValue: "All organizations" }),
                allowClear: !0,
                style: { minWidth: 200 },
                options: [
                  { value: "", label: c("serviceAccount.global", { defaultValue: "Global" }) },
                  ...h.map((s) => ({ value: s.id, label: s.name }))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(F, { children: [
            /* @__PURE__ */ e.jsx(
              g,
              {
                onClick: () => {
                  p(w.getFieldsValue());
                },
                icon: /* @__PURE__ */ e.jsx(Pe, {}),
                children: a("refresh", { defaultValue: "Refresh" })
              }
            ),
            /* @__PURE__ */ e.jsx(O, { permission: "authorization:service_account:create", children: /* @__PURE__ */ e.jsx(
              g,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(je, {}),
                onClick: l,
                children: c("serviceAccount.create", { defaultValue: "Create Service Account" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx(
      ye,
      {
        rowKey: "id",
        dataSource: m,
        columns: ze,
        loading: r,
        pagination: {
          current: y.current,
          pageSize: y.page_size,
          total: n,
          onChange: T,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (s) => a("totalItems", { defaultValue: `Total ${s} items`, total: s })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      be,
      {
        serviceAccountID: S,
        onClose: j,
        open: I,
        enableMultiOrg: o,
        organizations: h,
        onSuccess: () => {
          A();
        }
      }
    )
  ] });
}, yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qe
}, Symbol.toStringTag, { value: "Module" })), { Text: $, Paragraph: de } = Ae, { TextArea: Ye } = ee, Ze = ({ serviceAccountID: i }) => {
  const { message: c } = W.useApp(), { t: a } = R("authorization"), { t: b } = R("common"), [w, d] = V(!1), [t] = v.useForm(), [h, o] = V(null), [m, _] = V(null), [n, C] = V(!1), {
    data: I = [],
    loading: x,
    refresh: S
  } = k(
    () => z.authorization.getServiceAccountAccessKeys({ id: i }),
    {
      ready: !!i,
      refreshDeps: [i],
      onError: () => {
        c.error(a("serviceAccount.loadKeysError", { defaultValue: "Failed to load access keys." }));
      }
    }
  ), { run: D } = k(
    (l) => z.authorization.deleteServiceAccountAccessKey({ id: i, keyId: l }),
    {
      manual: !0,
      onSuccess: () => {
        c.success(
          a("serviceAccount.deleteKeySuccess", { defaultValue: "Access key deleted successfully." })
        ), S();
      },
      onError: () => {
        c.error(a("serviceAccount.deleteKeyError", { defaultValue: "Failed to delete access key." }));
      }
    }
  ), y = async (l) => {
    try {
      await qe(l), c.success(a("serviceAccount.copyKeySuccess", { defaultValue: "Copied to clipboard!" }));
    } catch (P) {
      console.error("Could not copy text: ", P);
    }
  }, K = () => {
    o(null), t.resetFields(), d(!0);
  }, r = (l) => {
    o(l), t.setFieldsValue({
      name: l.name,
      description: l.description,
      status: l.status === "active",
      expires_at: l.expires_at ? Je(l.expires_at) : void 0
    }), d(!0);
  }, A = () => {
    d(!1), t.resetFields();
  }, { run: E, loading: u } = k(
    async () => {
      const l = await t.validateFields();
      if (h) {
        const P = await z.authorization.updateServiceAccountAccessKey({ id: i, keyId: h.id }, {
          name: l.name,
          description: l.description,
          status: l.status ? "active" : "disabled",
          expires_at: l.expires_at ? l.expires_at.toISOString() : void 0
        });
        return d(!1), P;
      } else {
        const P = await z.authorization.createServiceAccountAccessKey({ id: i }, {
          name: l.name,
          description: l.description,
          expires_at: l.expires_at ? l.expires_at.toISOString() : void 0
        });
        _(P), d(!1), C(!0);
      }
    },
    {
      manual: !0,
      onSuccess: () => {
        c.success(a("serviceAccount.updateKeySuccess", { defaultValue: "Access key updated successfully." })), S();
      },
      onError: () => {
        c.error(a("serviceAccount.updateKeyError", { defaultValue: "Failed to update access key." }));
      }
    }
  ), p = () => {
    C(!1), _(null);
  }, T = [
    {
      title: a("serviceAccount.keyName", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: a("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
      dataIndex: "access_key_id",
      key: "access_key_id",
      render: (l) => /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(oe, {}),
        /* @__PURE__ */ e.jsx($, { copyable: !0, children: l })
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
      render: (l) => l === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: a("serviceAccount.keyActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: a("serviceAccount.keyDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
      dataIndex: "expires_at",
      key: "expires_at",
      render: (l) => l ? q(l) : /* @__PURE__ */ e.jsx($, { type: "secondary", children: a("serviceAccount.neverExpires", { defaultValue: "Never" }) })
    },
    {
      title: a("serviceAccount.keyLastUsed", { defaultValue: "Last Used" }),
      dataIndex: "last_used",
      key: "last_used",
      render: (l) => l ? q(l) : /* @__PURE__ */ e.jsx($, { type: "secondary", children: a("serviceAccount.keyNeverUsed", { defaultValue: "Never" }) })
    },
    {
      title: b("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (l, P) => /* @__PURE__ */ e.jsxs(F, { size: "small", children: [
        /* @__PURE__ */ e.jsx(O, { permission: "authorization:service_account:access_key:update", children: /* @__PURE__ */ e.jsx(me, { title: a("serviceAccount.updateKey", { defaultValue: "Update Key" }), children: /* @__PURE__ */ e.jsx(
          g,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(Y, {}),
            onClick: () => r(P)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(O, { permission: "authorization:service_account:access_key:delete", children: /* @__PURE__ */ e.jsx(
          se,
          {
            title: a("serviceAccount.deleteKeyConfirm", { defaultValue: "Are you sure you want to delete this access key?" }),
            onConfirm: () => D(P.id),
            okText: b("confirm", { defaultValue: "Confirm" }),
            cancelText: b("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              g,
              {
                type: "text",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(le, {})
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
        title: /* @__PURE__ */ e.jsxs(F, { children: [
          /* @__PURE__ */ e.jsx(oe, {}),
          a("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
        ] }),
        extra: /* @__PURE__ */ e.jsxs(F, { children: [
          /* @__PURE__ */ e.jsx(
            g,
            {
              icon: /* @__PURE__ */ e.jsx(ge, {}),
              onClick: S,
              loading: x,
              children: b("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(O, { permission: "authorization:service_account:access_key:create", children: /* @__PURE__ */ e.jsx(
            g,
            {
              type: "primary",
              icon: /* @__PURE__ */ e.jsx(je, {}),
              onClick: K,
              children: a("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" })
            }
          ) })
        ] }),
        children: /* @__PURE__ */ e.jsx(
          ye,
          {
            columns: T,
            dataSource: I,
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
        title: h ? a("serviceAccount.updateKey", { defaultValue: "Update Access Key" }) : a("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" }),
        open: w,
        onOk: E,
        confirmLoading: u,
        onCancel: A,
        getContainer: ".site-layout",
        children: /* @__PURE__ */ e.jsxs(
          v,
          {
            form: t,
            layout: "vertical",
            children: [
              /* @__PURE__ */ e.jsx(
                v.Item,
                {
                  name: "name",
                  label: a("serviceAccount.keyName", { defaultValue: "Key Name" }),
                  rules: [{ required: !0, message: a("serviceAccount.keyNameRequired", { defaultValue: "Please enter a name for the access key." }) }],
                  children: /* @__PURE__ */ e.jsx(ee, { placeholder: a("serviceAccount.keyNamePlaceholder", { defaultValue: "Enter key name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                v.Item,
                {
                  name: "description",
                  label: a("serviceAccount.keyDescription", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Ye,
                    {
                      rows: 3,
                      placeholder: a("serviceAccount.keyDescriptionPlaceholder", { defaultValue: "Enter key description (optional)" })
                    }
                  )
                }
              ),
              h && /* @__PURE__ */ e.jsx(
                v.Item,
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
      H,
      {
        getContainer: ".site-layout",
        title: /* @__PURE__ */ e.jsxs(F, { children: [
          /* @__PURE__ */ e.jsx(Ke, { style: { color: "#faad14" } }),
          a("serviceAccount.secretNoticeTitle", { defaultValue: "Access Key Created - Important!" })
        ] }),
        open: n,
        footer: [
          /* @__PURE__ */ e.jsx(g, { onClick: p, children: b("confirm", { defaultValue: "I have copied the secret key. Close" }) }, "close")
        ],
        closable: !1,
        children: [
          /* @__PURE__ */ e.jsx(
            we,
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
              /* @__PURE__ */ e.jsx(de, { copyable: { text: m.access_key_id }, children: m.access_key_id })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs($, { strong: !0, children: [
                a("serviceAccount.secretKey", { defaultValue: "Secret Access Key" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(de, { copyable: { text: m.secret_access_key || "" }, children: m.secret_access_key })
            ] }),
            /* @__PURE__ */ e.jsx(
              g,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(De, {}),
                onClick: () => {
                  const l = `Access Key: ${m.access_key_id}
Secret Key: ${m.secret_access_key}`;
                  y(l);
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
}, { Text: he } = Ae, Xe = ({ serviceAccount: i, onRefresh: c, loading: a }) => {
  const { message: b } = W.useApp(), { id: w } = i || {}, { t: d } = R("authorization"), { t } = R("common"), [h, o] = V([]), [m, _] = V([]), { hasPermission: n } = ne();
  fe(() => {
    _((i == null ? void 0 : i.roles) || []);
  }, [i]);
  const [C, I] = V(void 0), x = i == null ? void 0 : i.organization_id, { loading: S } = k(async () => z.authorization.listRoles({
    current: 1,
    page_size: 20,
    search: C,
    ...x ? { organization_id: x } : {}
  }), {
    onSuccess: (r) => {
      const A = r.data;
      m.forEach((E) => {
        A.find((p) => p.id === E.id) || A.push(E);
      }), o(A);
    },
    onError: (r) => {
      console.error("Failed to load roles:", r), b.error(d("serviceAccount.loadRolesError", { defaultValue: "Failed to load roles." }));
    },
    debounceWait: 300,
    refreshDeps: [C, x]
  }), { run: D, loading: y } = k(async () => {
    if (w)
      return z.authorization.assignServiceAccountRoles({ id: w }, { role_ids: m.map((r) => r.id) });
  }, {
    onSuccess: () => {
      b.success(d("serviceAccount.assignRolesSuccess", { defaultValue: "Roles assigned successfully." })), c();
    },
    onError: (r) => {
      console.error("Failed to assign roles:", r), b.error(d("serviceAccount.assignRolesError", { defaultValue: "Failed to assign roles." }));
    },
    manual: !0
  }), K = (r) => {
    _(r.map((A) => h.find((E) => E.id === A) || {
      id: A,
      name: A,
      description: A
    }));
  };
  return /* @__PURE__ */ e.jsx(
    G,
    {
      title: /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(Z, {}),
        d("serviceAccount.authorization", { defaultValue: "Authorization" })
      ] }),
      extra: /* @__PURE__ */ e.jsx(
        g,
        {
          icon: /* @__PURE__ */ e.jsx(ge, {}),
          onClick: () => {
            c();
          },
          disabled: a || y,
          loading: y,
          children: t("refresh", { defaultValue: "Refresh" })
        }
      ),
      children: y ? /* @__PURE__ */ e.jsx(Ee, { active: !0, paragraph: { rows: 4 } }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(he, { children: d("serviceAccount.roles", { defaultValue: "Roles" }) }),
          /* @__PURE__ */ e.jsx("div", { style: { marginTop: 8 }, children: m.length > 0 ? h.filter((r) => m.some((A) => A.id === r.id)).map((r) => /* @__PURE__ */ e.jsx(B, { color: "blue", children: r.name }, r.id)) : /* @__PURE__ */ e.jsx(
            Q,
            {
              image: Q.PRESENTED_IMAGE_SIMPLE,
              description: d("serviceAccount.noRoles", { defaultValue: "No roles assigned." }),
              style: { margin: "10px 0" }
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(he, { children: d("serviceAccount.assignRoles", { defaultValue: "Assign Roles" }) }),
          /* @__PURE__ */ e.jsx(
            X,
            {
              mode: "multiple",
              style: { width: "100%", marginTop: 8 },
              placeholder: d("serviceAccount.selectRoles", { defaultValue: "Select roles to assign" }),
              value: m.map((r) => r.id),
              onSearch: (r) => {
                I(r);
              },
              onOpenChange: (r) => {
                r && I(void 0);
              },
              disabled: !n("authorization:service_account:role:assign"),
              onChange: K,
              loading: a || S,
              optionFilterProp: "label",
              options: h.map((r) => ({
                label: r.name,
                value: r.id,
                title: r.description
              }))
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(O, { permission: "authorization:service_account:role:assign", children: /* @__PURE__ */ e.jsx(
          g,
          {
            type: "primary",
            onClick: D,
            loading: y,
            disabled: a,
            children: d("serviceAccount.assignRoles", { defaultValue: "Assign Roles" })
          }
        ) }) })
      ] })
    }
  );
}, { TabPane: J } = xe, et = {
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
}, tt = We(({ css: i }) => ({
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
})), at = () => {
  const { message: i } = W.useApp(), { styles: c } = tt(), d = Ue().hash.replace("#", "") || "basic", { t } = R("authorization"), { t: h } = R("common"), { id: o } = Le(), m = Ve(), { hasPermission: _ } = ne(), [n, C] = V(null), [I, x] = V(!1), [S] = v.useForm(), [D, y] = V(!1), { loading: K, refresh: r } = k(
    () => z.authorization.getServiceAccountById({ id: o }),
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
  ), A = (j) => {
    m(`#${j}`);
  }, { run: E } = k(
    () => z.authorization.deleteServiceAccount({ id: o }),
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
    o && E();
  }, { run: p, loading: T } = k(async () => {
    if (n)
      return z.authorization.updateServiceAccountStatus({ id: o }, {
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
  }), { run: l } = k(
    (j) => z.authorization.setServiceAccountPolicy({ id: o }, { policy_document: j }),
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
  ), P = (j) => {
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
  return o ? K ? /* @__PURE__ */ e.jsx(ue, { size: "large", style: { display: "flex", justifyContent: "center", padding: "50px" } }) : n ? /* @__PURE__ */ e.jsxs(
    G,
    {
      title: /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(Re, {}),
        n.name,
        n.status === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: t("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: t("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(F, { children: [
        /* @__PURE__ */ e.jsx(O, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          g,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Y, {}),
            onClick: () => y(!0),
            disabled: D,
            children: h("edit", { defaultValue: "Edit" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(O, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          se,
          {
            title: n.status === "active" ? t("serviceAccount.disableConfirm", {
              defaultValue: "Are you sure you want to disable this service account?"
            }) : t("serviceAccount.enableConfirm", {
              defaultValue: "Are you sure you want to enable this service account?"
            }),
            onConfirm: p,
            okText: h("confirm", { defaultValue: "Confirm" }),
            cancelText: h("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              g,
              {
                icon: n.status === "active" ? /* @__PURE__ */ e.jsx(Z, {}) : /* @__PURE__ */ e.jsx(ie, {}),
                loading: T,
                children: n.status === "active" ? h("disable", { defaultValue: "Disable" }) : h("enable", { defaultValue: "Enable" })
              }
            )
          }
        ) }),
        /* @__PURE__ */ e.jsx(O, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(
          se,
          {
            title: t("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: u,
            okText: h("confirm", { defaultValue: "Confirm" }),
            cancelText: h("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(g, { danger: !0, icon: /* @__PURE__ */ e.jsx(le, {}), children: h("delete", { defaultValue: "Delete" }) })
          }
        ) }),
        /* @__PURE__ */ e.jsx(g, { icon: /* @__PURE__ */ e.jsx(Oe, {}), onClick: () => m("/authorization/service-accounts"), children: h("back", { defaultValue: "Back" }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(xe, { defaultActiveKey: d, onChange: A, children: [
          /* @__PURE__ */ e.jsx(J, { tab: t("serviceAccount.tabs.basic", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(M, { bordered: !0, column: 2, children: [
            /* @__PURE__ */ e.jsx(M.Item, { label: t("serviceAccount.name", { defaultValue: "Name" }), span: 2, children: n.name }),
            /* @__PURE__ */ e.jsx(M.Item, { label: t("serviceAccount.description", { defaultValue: "Description" }), span: 2, children: n.description || t("serviceAccount.noDescription", { defaultValue: "N/A" }) }),
            /* @__PURE__ */ e.jsx(M.Item, { label: t("serviceAccount.status", { defaultValue: "Status" }), children: n.status === "active" ? /* @__PURE__ */ e.jsx(N, { status: "success", text: t("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(N, { status: "error", text: t("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) }) }),
            /* @__PURE__ */ e.jsx(M.Item, { label: t("serviceAccount.lastAccess", { defaultValue: "Last Access" }), children: n.last_access ? q(n.last_access) : t("serviceAccount.neverAccessed", { defaultValue: "Never" }) }),
            /* @__PURE__ */ e.jsx(M.Item, { label: t("serviceAccount.createdAt", { defaultValue: "Created At" }), children: q(n.created_at) }),
            /* @__PURE__ */ e.jsx(M.Item, { label: t("serviceAccount.updatedAt", { defaultValue: "Updated At" }), children: q(n.updated_at) })
          ] }) }, "basic"),
          /* @__PURE__ */ e.jsx(
            J,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(oe, {}),
                t("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
              ] }),
              disabled: !_("authorization:service_account:access_key:list"),
              children: /* @__PURE__ */ e.jsx(Ze, { serviceAccountID: o })
            },
            "access-keys"
          ),
          /* @__PURE__ */ e.jsx(
            J,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(Z, {}),
                t("serviceAccount.authorization", { defaultValue: "Authorization" })
              ] }),
              disabled: !_("authorization:service_account:role:list"),
              children: /* @__PURE__ */ e.jsx(
                Xe,
                {
                  serviceAccount: n,
                  onRefresh: r
                }
              )
            },
            "authorization"
          ),
          /* @__PURE__ */ e.jsx(
            J,
            {
              tab: t("rateLimit.title", { defaultValue: "Rate Limit" }),
              disabled: !_("authorization:service_account:view"),
              children: /* @__PURE__ */ e.jsx(
                Be,
                {
                  kind: "service_account",
                  subjectId: o || "",
                  readOnly: !_("authorization:service_account:update")
                }
              )
            },
            "rate-limit"
          ),
          /* @__PURE__ */ e.jsxs(
            J,
            {
              tab: t("serviceAccount.tabs.policy", { defaultValue: "Policy Document" }),
              disabled: !_("authorization:service_account:policy:view"),
              children: [
                /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(ve, { justify: "end", children: /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsx(O, { permission: "authorization:service_account:policy:update", children: /* @__PURE__ */ e.jsx(
                  g,
                  {
                    type: "primary",
                    icon: /* @__PURE__ */ e.jsx(Y, {}),
                    onClick: () => {
                      x(!0), S.setFieldsValue({
                        policy_document: JSON.stringify(n.policy_document, null, 2)
                      });
                    },
                    children: t("serviceAccount.editPolicy", { defaultValue: "Edit Policy" })
                  }
                ) }) }) }) }),
                /* @__PURE__ */ e.jsx(ue, { spinning: K, children: n.policy_document && n.policy_document.Statement && n.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx("pre", { style: { whiteSpace: "pre-wrap", overflowX: "auto" }, children: JSON.stringify(n.policy_document, null, 2) }) }) : /* @__PURE__ */ e.jsx(Q, { description: t("serviceAccount.noPolicy", { defaultValue: "No policy document defined for this service account." }) }) })
              ]
            },
            "policy"
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          H,
          {
            title: t("serviceAccount.editPolicy", { defaultValue: "Edit Policy" }),
            open: I,
            onCancel: () => {
              x(!1), S.resetFields();
            },
            footer: null,
            width: 700,
            getContainer: ".site-layout",
            children: /* @__PURE__ */ e.jsxs(v, { form: S, layout: "vertical", onFinish: P, children: [
              /* @__PURE__ */ e.jsx(
                v.Item,
                {
                  name: "policy_document",
                  extra: /* @__PURE__ */ e.jsx("span", { className: c.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                    X,
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
                        const U = et[j];
                        U && S.setFieldValue("policy_document", JSON.stringify(U, null, 2));
                      }
                    }
                  ) }),
                  children: /* @__PURE__ */ e.jsx(
                    pe,
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
              /* @__PURE__ */ e.jsx(v.Item, { children: /* @__PURE__ */ e.jsxs(F, { children: [
                /* @__PURE__ */ e.jsx(g, { type: "primary", htmlType: "submit", children: h("save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(g, { onClick: () => x(!1), children: h("cancel", { defaultValue: "Cancel" }) })
              ] }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          be,
          {
            serviceAccountID: o,
            onClose: () => y(!1),
            open: D
          }
        )
      ]
    }
  ) : /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px 0" }, children: /* @__PURE__ */ e.jsx(Q, { description: t("serviceAccount.notFound", { defaultValue: "Service account not found." }) }) }) : /* @__PURE__ */ e.jsx($e, {});
}, At = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: at
}, Symbol.toStringTag, { value: "Module" }));
export {
  yt as S,
  At as a
};
