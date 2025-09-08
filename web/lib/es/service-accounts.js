import { j as e, T as he } from "./vendor.js";
import { useState as m, useEffect as H, useCallback as Ve } from "react";
import { Form as x, message as d, Modal as Z, Input as te, Space as w, Button as u, Tooltip as O, Badge as D, Tag as G, Popconfirm as le, Card as U, Row as ce, Col as W, Table as fe, Typography as pe, Switch as ge, DatePicker as Se, Alert as be, Skeleton as _e, Empty as X, Select as ye, Spin as re, Tabs as me, Descriptions as I } from "antd";
import { CheckCircleOutlined as se, CloseCircleOutlined as ke, EyeOutlined as we, EditOutlined as Y, LockOutlined as ee, DeleteOutlined as ie, SearchOutlined as Ce, FilterOutlined as Ee, ReloadOutlined as ne, PlusOutlined as xe, KeyOutlined as ae, SyncOutlined as ve, CopyOutlined as ze, ExclamationCircleOutlined as Fe, RollbackOutlined as Te, UserOutlined as De } from "@ant-design/icons";
import { useNavigate as Ae, Link as Ke, useLocation as Pe, useParams as Ie } from "react-router-dom";
import { f as F } from "./components.js";
import { a as V } from "./index.js";
import { P as q, f as R } from "./base.js";
import { useTranslation as T } from "react-i18next";
import Re from "./not_found.js";
import { useRequest as L } from "ahooks";
import Ne from "dayjs";
import { a as Oe } from "./contexts.js";
import { createStyles as Ue } from "antd-style";
const je = ({
  serviceAccountID: c,
  onClose: t,
  open: j = !1,
  onSuccess: C
}) => {
  const { t: r } = T("authorization"), { t: a } = T("common"), [n] = x.useForm(), [y, p] = m(!1), { run: g, loading: o } = L((S) => c ? V.authorization.updateServiceAccount({ id: c }, S) : V.authorization.createServiceAccount(S), {
    onSuccess: () => {
      d.success(r("serviceAccount.saveSuccess", { defaultValue: "Service account saved successfully." })), t(), C == null || C();
    },
    onError: () => {
      d.error(r("serviceAccount.saveError", { defaultValue: "Failed to save service account." }));
    },
    manual: !0
  });
  return H(() => {
    const S = async (v) => {
      p(!0);
      try {
        const b = await V.authorization.getServiceAccountById({ id: v });
        n.setFieldsValue({
          name: b.name,
          description: b.description
        });
      } catch {
        d.error(r("serviceAccount.loadError", { defaultValue: "Failed to load service account." }));
      } finally {
        p(!1);
      }
    };
    j && (n.resetFields(), c && S(c));
  }, [c, j]), /* @__PURE__ */ e.jsx(
    Z,
    {
      title: c ? r("serviceAccount.edit", { defaultValue: "Edit Service Account" }) : r("serviceAccount.create", { defaultValue: "Create Service Account" }),
      width: 500,
      onClose: () => {
        n.resetFields(), t();
      },
      open: j,
      footer: /* @__PURE__ */ e.jsxs(w, { children: [
        /* @__PURE__ */ e.jsx(u, { onClick: t, children: a("cancel", { defaultValue: "Cancel" }) }),
        /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            onClick: n.submit,
            loading: o || y,
            children: a("save", { defaultValue: "Save" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(
        x,
        {
          form: n,
          layout: "vertical",
          onFinish: g,
          children: [
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                label: r("serviceAccount.name", { defaultValue: "Name" }),
                name: "name",
                rules: [{ required: !0, message: r("serviceAccount.nameRequired", { defaultValue: "Please enter a name for the service account." }) }],
                children: /* @__PURE__ */ e.jsx(te, { placeholder: r("serviceAccount.namePlaceholder", { defaultValue: "Enter service account name" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                label: r("serviceAccount.description", { defaultValue: "Description" }),
                name: "description",
                children: /* @__PURE__ */ e.jsx(he, { rows: 4, placeholder: r("serviceAccount.descriptionPlaceholder", { defaultValue: "Enter service account description (optional)" }) })
              }
            )
          ]
        }
      )
    }
  );
}, Le = () => {
  const { t: c } = T("authorization"), { t } = T("common"), j = Ae(), [C] = x.useForm(), [r] = x.useForm(), [a, n] = m(!1), [y, p] = m([]), [g, o] = m(0), [S, v] = m(!1), [b, _] = m(null), [k, i] = m({
    current: q.DEFAULT_CURRENT,
    page_size: q.DEFAULT_PAGE_SIZE,
    search: void 0
  }), h = Ve(async () => {
    try {
      n(!0);
      const s = await V.authorization.getServiceAccounts(k);
      p(s.data || []), o(s.total || 0);
    } catch (s) {
      console.error(c("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }), s), d.error(c("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }));
    } finally {
      n(!1);
    }
  }, [k, c]);
  H(() => {
    h();
  }, [h]);
  const E = (s) => {
    i({
      ...k,
      current: q.DEFAULT_CURRENT,
      // Reset to the first page
      search: s.search
    });
  }, K = () => {
    C.resetFields(), i({
      current: q.DEFAULT_CURRENT,
      page_size: q.DEFAULT_PAGE_SIZE,
      search: void 0
    });
  }, P = (s, f) => {
    i((N) => ({
      ...N,
      current: s,
      page_size: f
    }));
  }, M = () => {
    _(null), v(!0);
  }, B = (s) => {
    _(s.id), v(!0);
  }, $ = () => {
    v(!1), r.resetFields();
  }, A = async (s) => {
    try {
      await V.authorization.deleteServiceAccount({ id: s }), d.success(c("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully" })), h();
    } catch (f) {
      console.error(c("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }), f), d.error(c("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }));
    }
  }, z = async (s) => {
    const f = s.status === "active" ? "disabled" : "active";
    try {
      await V.authorization.updateServiceAccountStatus({ id: s.id }, { status: f }), d.success(c("serviceAccount.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), h();
    } catch (N) {
      console.error(c("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" }), N), d.error(c("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" }));
    }
  }, l = [
    {
      title: c("serviceAccount.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (s, f) => /* @__PURE__ */ e.jsx(F, { permission: "authorization:service_account:view", fallback: s, children: /* @__PURE__ */ e.jsx(Ke, { to: `/authorization/service-accounts/${f.id}`, children: s }) })
    },
    {
      title: c("serviceAccount.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description",
      render: (s) => /* @__PURE__ */ e.jsx(O, { title: s, children: /* @__PURE__ */ e.jsx("span", { children: (s == null ? void 0 : s.length) > 30 ? `${s.substring(0, 30)}...` : s }) })
    },
    {
      title: c("serviceAccount.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (s) => s === "active" ? /* @__PURE__ */ e.jsx(D, { status: "success", text: c("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(D, { status: "error", text: c("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: c("serviceAccount.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (s, f) => {
        var N;
        return /* @__PURE__ */ e.jsxs(w, { size: [0, 4], wrap: !0, children: [
          (N = f.roles) == null ? void 0 : N.map((oe) => /* @__PURE__ */ e.jsx(G, { color: "blue", children: oe.name }, oe.id)),
          (!f.roles || f.roles.length === 0) && /* @__PURE__ */ e.jsx(G, { children: c("serviceAccount.noRoles", { defaultValue: "No Roles" }) })
        ] });
      }
    },
    {
      title: c("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }),
      key: "policy",
      render: (s, f) => f.policy_document && f.policy_document.Statement && f.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(G, { color: "green", icon: /* @__PURE__ */ e.jsx(se, {}), children: c("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }) }) : /* @__PURE__ */ e.jsx(G, { color: "default", icon: /* @__PURE__ */ e.jsx(ke, {}), children: c("serviceAccount.noPolicy", { defaultValue: "No Policy" }) })
    },
    {
      title: c("serviceAccount.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (s) => R(s)
    },
    {
      title: c("serviceAccount.lastAccess", { defaultValue: "Last Access" }),
      dataIndex: "last_access",
      key: "last_access",
      render: (s) => s ? R(s) : c("serviceAccount.neverAccessed", { defaultValue: "Never Accessed" })
    },
    {
      title: t("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (s, f) => /* @__PURE__ */ e.jsxs(w, { size: "small", children: [
        /* @__PURE__ */ e.jsx(F, { permission: "authorization:service_account:view", children: /* @__PURE__ */ e.jsx(O, { title: c("serviceAccount.viewDetail", { defaultValue: "View Detail" }), children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(we, {}),
            onClick: () => j(`/authorization/service-accounts/${f.id}`)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(F, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(O, { title: c("serviceAccount.edit", { defaultValue: "Edit" }), children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(Y, {}),
            onClick: () => B(f)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(F, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(O, { title: f.status === "active" ? t("disable", { defaultValue: "Disable" }) : t("enable", { defaultValue: "Enable" }), children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "text",
            size: "small",
            icon: f.status === "active" ? /* @__PURE__ */ e.jsx(ee, {}) : /* @__PURE__ */ e.jsx(se, {}),
            onClick: () => z(f)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(F, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(O, { title: c("serviceAccount.delete", { defaultValue: "Delete" }), children: /* @__PURE__ */ e.jsx(
          le,
          {
            title: c("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: () => A(f.id),
            okText: t("confirm", { defaultValue: "Confirm" }),
            cancelText: t("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              u,
              {
                type: "text",
                size: "small",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(ie, {})
              }
            )
          }
        ) }) })
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(U, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      x,
      {
        form: C,
        layout: "horizontal",
        onFinish: E,
        initialValues: {
          search: k.search
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(ce, { gutter: 16, children: [
          /* @__PURE__ */ e.jsx(W, { xs: 24, sm: 12, md: 8, lg: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "search", label: t("keyword", { defaultValue: "Keyword" }), children: /* @__PURE__ */ e.jsx(
            te,
            {
              placeholder: c("serviceAccount.searchPlaceholder", { defaultValue: "Search by name or description" }),
              allowClear: !0,
              prefix: /* @__PURE__ */ e.jsx(Ce, {})
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(W, { xs: 24, sm: 12, md: 8, lg: 6, style: { display: "flex", alignItems: "flex-end" }, children: /* @__PURE__ */ e.jsx(x.Item, { children: /* @__PURE__ */ e.jsxs(w, { children: [
            /* @__PURE__ */ e.jsx(u, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Ee, {}), children: t("filter", { defaultValue: "Filter" }) }),
            /* @__PURE__ */ e.jsx(u, { onClick: K, icon: /* @__PURE__ */ e.jsx(ne, {}), children: t("reset", { defaultValue: "Reset" }) })
          ] }) }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(U, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ce, { justify: "space-between", align: "middle", children: [
        /* @__PURE__ */ e.jsx(W, { children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            onClick: K,
            icon: /* @__PURE__ */ e.jsx(ne, {}),
            children: t("refresh", { defaultValue: "Refresh" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(W, { children: /* @__PURE__ */ e.jsx(F, { permission: "authorization:service_account:create", children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(xe, {}),
            onClick: M,
            children: c("serviceAccount.create", { defaultValue: "Create Service Account" })
          }
        ) }) })
      ] }) }),
      /* @__PURE__ */ e.jsx(
        fe,
        {
          rowKey: "id",
          dataSource: y,
          columns: l,
          loading: a,
          pagination: {
            current: k.current,
            pageSize: k.page_size,
            total: g,
            onChange: P,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (s) => t("totalItems", { defaultValue: `Total ${s} items`, total: s })
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(
      je,
      {
        serviceAccountID: b,
        onClose: $,
        open: S,
        onSuccess: () => {
          h();
        }
      }
    )
  ] });
}, rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Le
}, Symbol.toStringTag, { value: "Module" })), { Text: J, Paragraph: ue } = pe, { TextArea: Me } = te, Be = ({ serviceAccountID: c }) => {
  const { t } = T("authorization"), { t: j } = T("common"), [C, r] = m([]), [a, n] = m(!1), [y, p] = m(!1), [g] = x.useForm(), [o, S] = m(null), [v, b] = m(null), [_, k] = m(!1), i = async () => {
    if (c) {
      n(!0);
      try {
        const l = await V.authorization.getServiceAccountAccessKeys({ id: c });
        r(l);
      } catch (l) {
        console.error("Failed to load access keys:", l), d.error(t("serviceAccount.loadKeysError", { defaultValue: "Failed to load access keys." }));
      } finally {
        n(!1);
      }
    }
  };
  H(() => {
    i();
  }, [c]);
  const h = (l) => {
    navigator.clipboard.writeText(l).then(
      () => {
        d.success(t("serviceAccount.copyKeySuccess", { defaultValue: "Copied to clipboard!" }));
      },
      (s) => {
        console.error("Could not copy text: ", s);
      }
    );
  }, E = () => {
    S(null), g.resetFields(), p(!0);
  }, K = (l) => {
    S(l), g.setFieldsValue({
      name: l.name,
      description: l.description,
      status: l.status === "active",
      expires_at: l.expires_at ? Ne(l.expires_at) : void 0
    }), p(!0);
  }, P = () => {
    p(!1), g.resetFields();
  }, { run: M, loading: B } = L(
    async () => {
      const l = await g.validateFields();
      if (o) {
        const s = await V.authorization.updateServiceAccountAccessKey({ id: c, keyId: o.id }, {
          name: l.name,
          description: l.description,
          status: l.status ? "active" : "disabled",
          expires_at: l.expires_at ? l.expires_at.toISOString() : void 0
        });
        return p(!1), s;
      } else {
        const s = await V.authorization.createServiceAccountAccessKey({ id: c }, {
          name: l.name,
          description: l.description,
          expires_at: l.expires_at ? l.expires_at.toISOString() : void 0
        });
        b(s), p(!1), k(!0);
      }
    },
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("serviceAccount.updateKeySuccess", { defaultValue: "Access key updated successfully." })), i();
      },
      onError: () => {
        d.error(t("serviceAccount.updateKeyError", { defaultValue: "Failed to update access key." }));
      }
    }
  ), $ = async (l) => {
    try {
      await V.authorization.deleteServiceAccountAccessKey({ id: c, keyId: l }), d.success(t("serviceAccount.deleteKeySuccess", { defaultValue: "Access key deleted successfully." })), i();
    } catch (s) {
      console.error("Failed to delete key:", s), d.error(t("serviceAccount.deleteKeyError", { defaultValue: "Failed to delete access key." }));
    }
  }, A = () => {
    k(!1), b(null);
  }, z = [
    {
      title: t("serviceAccount.keyName", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
      dataIndex: "access_key_id",
      key: "access_key_id",
      render: (l) => /* @__PURE__ */ e.jsxs(w, { children: [
        /* @__PURE__ */ e.jsx(ae, {}),
        /* @__PURE__ */ e.jsx(J, { copyable: !0, children: l })
      ] })
    },
    {
      title: t("serviceAccount.keyDescription", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: t("serviceAccount.keyStatus", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (l) => l === "active" ? /* @__PURE__ */ e.jsx(D, { status: "success", text: t("serviceAccount.keyActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(D, { status: "error", text: t("serviceAccount.keyDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: t("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
      dataIndex: "expires_at",
      key: "expires_at",
      render: (l) => l ? R(l) : /* @__PURE__ */ e.jsx(J, { type: "secondary", children: t("serviceAccount.neverExpires", { defaultValue: "Never" }) })
    },
    {
      title: t("serviceAccount.keyLastUsed", { defaultValue: "Last Used" }),
      dataIndex: "last_used",
      key: "last_used",
      render: (l) => l ? R(l) : /* @__PURE__ */ e.jsx(J, { type: "secondary", children: t("serviceAccount.keyNeverUsed", { defaultValue: "Never" }) })
    },
    {
      title: j("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (l, s) => /* @__PURE__ */ e.jsxs(w, { size: "small", children: [
        /* @__PURE__ */ e.jsx(O, { title: t("serviceAccount.updateKey", { defaultValue: "Update Key" }), children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(Y, {}),
            onClick: () => K(s)
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          le,
          {
            title: t("serviceAccount.deleteKeyConfirm", { defaultValue: "Are you sure you want to delete this access key?" }),
            onConfirm: () => $(s.id),
            okText: j("confirm", { defaultValue: "Confirm" }),
            cancelText: j("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              u,
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
      U,
      {
        title: /* @__PURE__ */ e.jsxs(w, { children: [
          /* @__PURE__ */ e.jsx(ae, {}),
          t("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
        ] }),
        extra: /* @__PURE__ */ e.jsxs(w, { children: [
          /* @__PURE__ */ e.jsx(
            u,
            {
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              onClick: i,
              loading: a,
              children: j("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            u,
            {
              type: "primary",
              icon: /* @__PURE__ */ e.jsx(xe, {}),
              onClick: E,
              children: t("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" })
            }
          )
        ] }),
        children: /* @__PURE__ */ e.jsx(
          fe,
          {
            columns: z,
            dataSource: C,
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
        title: o ? t("serviceAccount.updateKey", { defaultValue: "Update Access Key" }) : t("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" }),
        open: y,
        onOk: M,
        confirmLoading: B,
        onCancel: P,
        children: /* @__PURE__ */ e.jsxs(
          x,
          {
            form: g,
            layout: "vertical",
            children: [
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "name",
                  label: t("serviceAccount.keyName", { defaultValue: "Key Name" }),
                  rules: [{ required: !0, message: t("serviceAccount.keyNameRequired", { defaultValue: "Please enter a name for the access key." }) }],
                  children: /* @__PURE__ */ e.jsx(te, { placeholder: t("serviceAccount.keyNamePlaceholder", { defaultValue: "Enter key name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "description",
                  label: t("serviceAccount.keyDescription", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Me,
                    {
                      rows: 3,
                      placeholder: t("serviceAccount.keyDescriptionPlaceholder", { defaultValue: "Enter key description (optional)" })
                    }
                  )
                }
              ),
              o && /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "status",
                  label: t("serviceAccount.keyStatus", { defaultValue: "Status" }),
                  valuePropName: "checked",
                  children: /* @__PURE__ */ e.jsx(
                    ge,
                    {
                      checkedChildren: t("serviceAccount.keyActive", { defaultValue: "Active" }),
                      unCheckedChildren: t("serviceAccount.keyDisabled", { defaultValue: "Disabled" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "expires_at",
                  label: t("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
                  children: /* @__PURE__ */ e.jsx(
                    Se,
                    {
                      showTime: !0,
                      placeholder: t("serviceAccount.selectExpireDate", { defaultValue: "Select expiry date (optional)" }),
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
        title: /* @__PURE__ */ e.jsxs(w, { children: [
          /* @__PURE__ */ e.jsx(Fe, { style: { color: "#faad14" } }),
          t("serviceAccount.secretNoticeTitle", { defaultValue: "Access Key Created - Important!" })
        ] }),
        open: _,
        footer: [
          /* @__PURE__ */ e.jsx(u, { onClick: A, children: j("confirm", { defaultValue: "I have copied the secret key. Close" }) }, "close")
        ],
        closable: !1,
        children: [
          /* @__PURE__ */ e.jsx(
            be,
            {
              message: t("serviceAccount.secretNoticeMessage", { defaultValue: "Your new Secret Access Key is displayed below. This is the only time you will be able to see this secret. Please copy it and store it securely." }),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          v && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs(J, { strong: !0, children: [
                t("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(ue, { copyable: { text: v.access_key_id }, children: v.access_key_id })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs(J, { strong: !0, children: [
                t("serviceAccount.secretKey", { defaultValue: "Secret Access Key" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(ue, { copyable: { text: v.secret_access_key || "" }, children: v.secret_access_key })
            ] }),
            /* @__PURE__ */ e.jsx(
              u,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(ze, {}),
                onClick: () => {
                  const l = `Access Key: ${v.access_key_id}
Secret Key: ${v.secret_access_key}`;
                  h(l);
                },
                block: !0,
                children: t("serviceAccount.copyToClipboard", { defaultValue: "Copy Keys to Clipboard" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}, { Text: de } = pe, $e = ({ serviceAccount: c, onRefresh: t, loading: j }) => {
  const { id: C } = c || {}, { t: r } = T("authorization"), { t: a } = T("common"), [n, y] = m([]), [p, g] = m([]);
  H(() => {
    g((c == null ? void 0 : c.roles) || []);
  }, [c]);
  const [o, S] = m(void 0), { loading: v } = L(async () => V.authorization.listRoles({ current: 1, page_size: 20, search: o }), {
    onSuccess: (i) => {
      const h = i.data;
      p.forEach((E) => {
        h.find((P) => P.id === E.id) || h.push(E);
      }), y(h);
    },
    onError: (i) => {
      console.error("Failed to load roles:", i), d.error(r("serviceAccount.loadRolesError", { defaultValue: "Failed to load roles." }));
    },
    debounceWait: 300,
    refreshDeps: [o]
  }), { run: b, loading: _ } = L(async () => {
    if (C)
      return V.authorization.assignServiceAccountRoles({ id: C }, { role_ids: p.map((i) => i.id) });
  }, {
    onSuccess: () => {
      d.success(r("serviceAccount.assignRolesSuccess", { defaultValue: "Roles assigned successfully." })), t();
    },
    onError: (i) => {
      console.error("Failed to assign roles:", i), d.error(r("serviceAccount.assignRolesError", { defaultValue: "Failed to assign roles." }));
    },
    manual: !0
  }), k = (i) => {
    g(i.map((h) => n.find((E) => E.id === h) || { id: h, name: h, description: h }));
  };
  return /* @__PURE__ */ e.jsx(
    U,
    {
      title: /* @__PURE__ */ e.jsxs(w, { children: [
        /* @__PURE__ */ e.jsx(ee, {}),
        r("serviceAccount.authorization", { defaultValue: "Authorization" })
      ] }),
      extra: /* @__PURE__ */ e.jsx(
        u,
        {
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          onClick: () => {
            t();
          },
          disabled: j || _,
          loading: _,
          children: a("refresh", { defaultValue: "Refresh" })
        }
      ),
      children: _ ? /* @__PURE__ */ e.jsx(_e, { active: !0, paragraph: { rows: 4 } }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(de, { children: r("serviceAccount.roles", { defaultValue: "Roles" }) }),
          /* @__PURE__ */ e.jsx("div", { style: { marginTop: 8 }, children: p.length > 0 ? n.filter((i) => p.some((h) => h.id === i.id)).map((i) => /* @__PURE__ */ e.jsx(G, { color: "blue", children: i.name }, i.id)) : /* @__PURE__ */ e.jsx(
            X,
            {
              image: X.PRESENTED_IMAGE_SIMPLE,
              description: r("serviceAccount.noRoles", { defaultValue: "No roles assigned." }),
              style: { margin: "10px 0" }
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(de, { children: r("serviceAccount.assignRoles", { defaultValue: "Assign Roles" }) }),
          /* @__PURE__ */ e.jsx(
            ye,
            {
              mode: "multiple",
              style: { width: "100%", marginTop: 8 },
              placeholder: r("serviceAccount.selectRoles", { defaultValue: "Select roles to assign" }),
              value: p.map((i) => i.id),
              onSearch: (i) => {
                S(i);
              },
              onDropdownVisibleChange: (i) => {
                i && S(void 0);
              },
              onChange: k,
              loading: j || v,
              optionFilterProp: "label",
              options: n.map((i) => ({
                label: i.name,
                value: i.id,
                title: i.description
              }))
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            onClick: b,
            loading: _,
            disabled: j,
            children: r("serviceAccount.assignRoles", { defaultValue: "Assign Roles" })
          }
        ) })
      ] })
    }
  );
}, { TabPane: Q } = me, qe = {
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
}, Je = Ue(({ css: c }) => ({
  rolePolicy: c`
       .ant-collapse-content>.ant-collapse-content-box{
        padding: 2px;
      }
      .ant-form-item-additional>#policy_document_extra{
        min-height: 0;
      }
    `,
  rolePermissionExtra: c`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
  rolePolicyExtra: c`
      position: absolute;
      right: 20px;
      top: 5px;
    `
})), Ge = () => {
  const { styles: c } = Je(), r = Pe().hash.replace("#", "") || "basic", { t: a } = T("authorization"), { t: n } = T("common"), { id: y } = Ie(), p = Ae(), { hasPermission: g } = Oe(), [o, S] = m(null), [v, b] = m(!1), [_] = x.useForm(), [k, i] = m(!1);
  if (!y)
    return /* @__PURE__ */ e.jsx(Re, {});
  const { run: h, loading: E } = L(async () => {
    if (y)
      return V.authorization.getServiceAccountById({ id: y });
  }, {
    onSuccess: (A) => {
      S(A || null);
    }
  });
  H(() => {
    h();
  }, [y]);
  const K = (A) => {
    p(`#${A}`);
  }, P = async () => {
    if (y)
      try {
        await V.authorization.deleteServiceAccount({ id: y }), d.success(a("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully." })), p("/authorization/service-accounts");
      } catch (A) {
        console.error(a("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }), A), d.error(a("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }));
      }
  }, { run: M, loading: B } = L(async () => {
    if (o)
      return V.authorization.updateServiceAccountStatus({ id: y }, { status: o.status === "active" ? "disabled" : "active" });
  }, {
    onSuccess: (A) => {
      S(A || null), d.success(a("serviceAccount.statusUpdateSuccess", { defaultValue: "Service account status updated successfully." }));
    },
    onError: (A) => {
      console.error(a("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }), A), d.error(a("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }));
    },
    manual: !0
  }), $ = async (A) => {
    if (y)
      try {
        let z;
        try {
          z = JSON.parse(A.policy_document);
        } catch {
          d.error(a("serviceAccount.policyInvalidJson", { defaultValue: "Invalid JSON format for policy document." }));
          return;
        }
        await V.authorization.setServiceAccountPolicy({ id: y }, { policy_document: z }), d.success(a("serviceAccount.policyUpdateSuccess", { defaultValue: "Policy document updated successfully." })), b(!1), h();
      } catch (z) {
        console.error(a("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }), z), d.error(a("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }));
      }
  };
  return E ? /* @__PURE__ */ e.jsx(re, { size: "large", style: { display: "flex", justifyContent: "center", padding: "50px" } }) : o ? /* @__PURE__ */ e.jsxs(
    U,
    {
      title: /* @__PURE__ */ e.jsxs(w, { children: [
        /* @__PURE__ */ e.jsx(De, {}),
        o.name,
        o.status === "active" ? /* @__PURE__ */ e.jsx(D, { status: "success", text: a("serviceAccount.status.active", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(D, { status: "error", text: a("serviceAccount.status.disabled", { defaultValue: "Disabled" }) })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(w, { children: [
        /* @__PURE__ */ e.jsx(F, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Y, {}),
            onClick: () => i(!0),
            disabled: k,
            children: n("edit", { defaultValue: "Edit" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(F, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          u,
          {
            icon: o.status === "active" ? /* @__PURE__ */ e.jsx(ee, {}) : /* @__PURE__ */ e.jsx(se, {}),
            onClick: M,
            loading: B,
            children: o.status === "active" ? n("disable", { defaultValue: "Disable" }) : n("enable", { defaultValue: "Enable" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(F, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(
          le,
          {
            title: a("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: P,
            okText: n("confirm", { defaultValue: "Confirm" }),
            cancelText: n("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(u, { danger: !0, icon: /* @__PURE__ */ e.jsx(ie, {}), children: n("delete", { defaultValue: "Delete" }) })
          }
        ) }),
        /* @__PURE__ */ e.jsx(u, { icon: /* @__PURE__ */ e.jsx(Te, {}), onClick: () => p("/authorization/service-accounts"), children: n("back", { defaultValue: "Back" }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(me, { defaultActiveKey: r, onChange: K, children: [
          /* @__PURE__ */ e.jsx(Q, { tab: a("serviceAccount.tabs.basic", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(I, { bordered: !0, column: 2, children: [
            /* @__PURE__ */ e.jsx(I.Item, { label: a("serviceAccount.name", { defaultValue: "Name" }), span: 2, children: o.name }),
            /* @__PURE__ */ e.jsx(I.Item, { label: a("serviceAccount.description", { defaultValue: "Description" }), span: 2, children: o.description || a("serviceAccount.noDescription", { defaultValue: "N/A" }) }),
            /* @__PURE__ */ e.jsx(I.Item, { label: a("serviceAccount.status", { defaultValue: "Status" }), children: o.status === "active" ? /* @__PURE__ */ e.jsx(D, { status: "success", text: a("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(D, { status: "error", text: a("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) }) }),
            /* @__PURE__ */ e.jsx(I.Item, { label: a("serviceAccount.lastAccess", { defaultValue: "Last Access" }), children: o.last_access ? R(o.last_access) : a("serviceAccount.neverAccessed", { defaultValue: "Never" }) }),
            /* @__PURE__ */ e.jsx(I.Item, { label: a("serviceAccount.createdAt", { defaultValue: "Created At" }), children: R(o.created_at) }),
            /* @__PURE__ */ e.jsx(I.Item, { label: a("serviceAccount.updatedAt", { defaultValue: "Updated At" }), children: R(o.updated_at) })
          ] }) }, "basic"),
          /* @__PURE__ */ e.jsx(
            Q,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(ae, {}),
                a("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
              ] }),
              disabled: !g("authorization:service_account:access_key:list"),
              children: /* @__PURE__ */ e.jsx(Be, { serviceAccountID: y })
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
              disabled: !g("authorization:service_account:role:list"),
              children: /* @__PURE__ */ e.jsx(
                $e,
                {
                  serviceAccount: o,
                  onRefresh: h
                }
              )
            },
            "authorization"
          ),
          /* @__PURE__ */ e.jsxs(Q, { tab: a("serviceAccount.tabs.policy", { defaultValue: "Policy Document" }), children: [
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(ce, { justify: "end", children: /* @__PURE__ */ e.jsx(W, { children: /* @__PURE__ */ e.jsx(F, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
              u,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Y, {}),
                onClick: () => {
                  b(!0), _.setFieldsValue({
                    policy_document: JSON.stringify(o.policy_document, null, 2)
                  });
                },
                children: a("serviceAccount.editPolicy", { defaultValue: "Edit Policy" })
              }
            ) }) }) }) }),
            /* @__PURE__ */ e.jsx(re, { spinning: E, children: o.policy_document && o.policy_document.Statement && o.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(U, { children: /* @__PURE__ */ e.jsx("pre", { style: { whiteSpace: "pre-wrap", overflowX: "auto" }, children: JSON.stringify(o.policy_document, null, 2) }) }) : /* @__PURE__ */ e.jsx(X, { description: a("serviceAccount.noPolicy", { defaultValue: "No policy document defined for this service account." }) }) })
          ] }, "policy")
        ] }),
        /* @__PURE__ */ e.jsx(
          Z,
          {
            title: a("serviceAccount.editPolicy", { defaultValue: "Edit Policy" }),
            open: v,
            onCancel: () => {
              b(!1), _.resetFields();
            },
            footer: null,
            width: 700,
            children: /* @__PURE__ */ e.jsxs(x, { form: _, layout: "vertical", onFinish: $, children: [
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "policy_document",
                  extra: /* @__PURE__ */ e.jsx("span", { className: c.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                    ye,
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
                      onChange: (A) => {
                        const z = qe[A];
                        z && _.setFieldValue("policy_document", JSON.stringify(z, null, 2));
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
              /* @__PURE__ */ e.jsx(x.Item, { children: /* @__PURE__ */ e.jsxs(w, { children: [
                /* @__PURE__ */ e.jsx(u, { type: "primary", htmlType: "submit", children: n("save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(u, { onClick: () => b(!1), children: n("cancel", { defaultValue: "Cancel" }) })
              ] }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          je,
          {
            serviceAccountID: y,
            onClose: () => i(!1),
            open: k
          }
        )
      ]
    }
  ) : /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px 0" }, children: /* @__PURE__ */ e.jsx(X, { description: a("serviceAccount.notFound", { defaultValue: "Service account not found." }) }) });
}, nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ge
}, Symbol.toStringTag, { value: "Module" }));
export {
  rt as S,
  nt as a
};
