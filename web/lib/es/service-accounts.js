import { j as e, T as de } from "./vendor.js";
import { useState as p, useEffect as W, useCallback as je } from "react";
import { Form as x, message as d, Modal as Q, Input as ee, Space as _, Button as u, Tooltip as N, Badge as T, Tag as J, Popconfirm as ae, Card as O, Row as te, Col as G, Table as he, Typography as fe, Switch as Ve, DatePicker as ge, Alert as Se, Skeleton as be, Empty as Z, Select as pe, Spin as oe, Tabs as ye, Descriptions as K } from "antd";
import { CheckCircleOutlined as ce, CloseCircleOutlined as _e, EyeOutlined as ke, EditOutlined as X, LockOutlined as Y, DeleteOutlined as le, SearchOutlined as we, FilterOutlined as Ce, ReloadOutlined as re, PlusOutlined as me, KeyOutlined as se, SyncOutlined as xe, CopyOutlined as Ee, ExclamationCircleOutlined as ze, RollbackOutlined as Fe, UserOutlined as Te } from "@ant-design/icons";
import { useNavigate as ve, Link as De, useLocation as Ke, useParams as Pe } from "react-router-dom";
import { j as z } from "./components.js";
import { a as g } from "./index.js";
import { P as $, f as P } from "./base.js";
import { useTranslation as F } from "react-i18next";
import Ie from "./not_found.js";
import { useRequest as U } from "ahooks";
import Re from "dayjs";
import { a as Ne } from "./contexts.js";
import { createStyles as Oe } from "antd-style";
const Ae = ({
  serviceAccountID: s,
  onClose: c,
  open: j = !1,
  onSuccess: k
}) => {
  const { t: r } = F("authorization"), { t: a } = F("common"), [n] = x.useForm(), [f, h] = p(!1), { run: S, loading: o } = U((v) => s ? g.authorization.updateServiceAccount({ id: s }, v) : g.authorization.createServiceAccount(v), {
    onSuccess: () => {
      d.success(r("serviceAccount.saveSuccess", { defaultValue: "Service account saved successfully." })), c(), k == null || k();
    },
    onError: () => {
      d.error(r("serviceAccount.saveError", { defaultValue: "Failed to save service account." }));
    },
    manual: !0
  });
  return W(() => {
    const v = async (b) => {
      h(!0);
      try {
        const V = await g.authorization.getServiceAccountById({ id: b });
        n.setFieldsValue({
          name: V.name,
          description: V.description
        });
      } catch {
        d.error(r("serviceAccount.loadError", { defaultValue: "Failed to load service account." }));
      } finally {
        h(!1);
      }
    };
    j && (n.resetFields(), s && v(s));
  }, [s, j]), /* @__PURE__ */ e.jsx(
    Q,
    {
      title: s ? r("serviceAccount.edit", { defaultValue: "Edit Service Account" }) : r("serviceAccount.create", { defaultValue: "Create Service Account" }),
      width: 500,
      onClose: () => {
        n.resetFields(), c();
      },
      onCancel: () => {
        n.resetFields(), c();
      },
      open: j,
      footer: /* @__PURE__ */ e.jsxs(_, { children: [
        /* @__PURE__ */ e.jsx(u, { onClick: c, children: a("cancel", { defaultValue: "Cancel" }) }),
        /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            onClick: n.submit,
            loading: o || f,
            children: a("save", { defaultValue: "Save" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(
        x,
        {
          form: n,
          layout: "vertical",
          onFinish: S,
          children: [
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                label: r("serviceAccount.name", { defaultValue: "Name" }),
                name: "name",
                rules: [{ required: !0, message: r("serviceAccount.nameRequired", { defaultValue: "Please enter a name for the service account." }) }],
                children: /* @__PURE__ */ e.jsx(ee, { placeholder: r("serviceAccount.namePlaceholder", { defaultValue: "Enter service account name" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                label: r("serviceAccount.description", { defaultValue: "Description" }),
                name: "description",
                children: /* @__PURE__ */ e.jsx(de, { rows: 4, placeholder: r("serviceAccount.descriptionPlaceholder", { defaultValue: "Enter service account description (optional)" }) })
              }
            )
          ]
        }
      )
    }
  );
}, Ue = () => {
  const { t: s } = F("authorization"), { t: c } = F("common"), j = ve(), [k] = x.useForm(), [r, a] = p(!1), [n, f] = p([]), [h, S] = p(0), [o, v] = p(!1), [b, V] = p(null), [y, C] = p({
    current: $.DEFAULT_CURRENT,
    page_size: $.DEFAULT_PAGE_SIZE,
    search: void 0
  }), l = je(async () => {
    try {
      a(!0);
      const t = await g.authorization.getServiceAccounts(y);
      f(t.data || []), S(t.total || 0);
    } catch (t) {
      console.error(s("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }), t), d.error(s("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }));
    } finally {
      a(!1);
    }
  }, [y, s]);
  W(() => {
    l();
  }, [l]);
  const m = (t) => {
    C({
      ...y,
      current: $.DEFAULT_CURRENT,
      // Reset to the first page
      search: t.search
    });
  }, w = () => {
    k.resetFields(), C({
      current: $.DEFAULT_CURRENT,
      page_size: $.DEFAULT_PAGE_SIZE,
      search: void 0
    });
  }, I = (t, i) => {
    C((R) => ({
      ...R,
      current: t,
      page_size: i
    }));
  }, D = () => {
    V(null), v(!0);
  }, L = (t) => {
    V(t.id), v(!0);
  }, M = () => {
    v(!1);
  }, B = async (t) => {
    try {
      await g.authorization.deleteServiceAccount({ id: t }), d.success(s("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully" })), l();
    } catch (i) {
      console.error(s("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }), i), d.error(s("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }));
    }
  }, A = async (t) => {
    const i = t.status === "active" ? "disabled" : "active";
    try {
      await g.authorization.updateServiceAccountStatus({ id: t.id }, { status: i }), d.success(s("serviceAccount.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), l();
    } catch (R) {
      console.error(s("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" }), R), d.error(s("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" }));
    }
  }, E = [
    {
      title: s("serviceAccount.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (t, i) => /* @__PURE__ */ e.jsx(z, { permission: "authorization:service_account:view", fallback: t, children: /* @__PURE__ */ e.jsx(De, { to: `/authorization/service-accounts/${i.id}`, children: t }) })
    },
    {
      title: s("serviceAccount.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description",
      render: (t) => /* @__PURE__ */ e.jsx(N, { title: t, children: /* @__PURE__ */ e.jsx("span", { children: (t == null ? void 0 : t.length) > 30 ? `${t.substring(0, 30)}...` : t }) })
    },
    {
      title: s("serviceAccount.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (t) => t === "active" ? /* @__PURE__ */ e.jsx(T, { status: "success", text: s("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(T, { status: "error", text: s("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("serviceAccount.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (t, i) => {
        var R;
        return /* @__PURE__ */ e.jsxs(_, { size: [0, 4], wrap: !0, children: [
          (R = i.roles) == null ? void 0 : R.map((ie) => /* @__PURE__ */ e.jsx(J, { color: "blue", children: ie.name }, ie.id)),
          (!i.roles || i.roles.length === 0) && /* @__PURE__ */ e.jsx(J, { children: s("serviceAccount.noRoles", { defaultValue: "No Roles" }) })
        ] });
      }
    },
    {
      title: s("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }),
      key: "policy",
      render: (t, i) => i.policy_document && i.policy_document.Statement && i.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(J, { color: "green", icon: /* @__PURE__ */ e.jsx(ce, {}), children: s("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }) }) : /* @__PURE__ */ e.jsx(J, { color: "default", icon: /* @__PURE__ */ e.jsx(_e, {}), children: s("serviceAccount.noPolicy", { defaultValue: "No Policy" }) })
    },
    {
      title: s("serviceAccount.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (t) => P(t)
    },
    {
      title: s("serviceAccount.lastAccess", { defaultValue: "Last Access" }),
      dataIndex: "last_access",
      key: "last_access",
      render: (t) => t ? P(t) : s("serviceAccount.neverAccessed", { defaultValue: "Never Accessed" })
    },
    {
      title: c("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (t, i) => /* @__PURE__ */ e.jsxs(_, { size: "small", children: [
        /* @__PURE__ */ e.jsx(z, { permission: "authorization:service_account:view", children: /* @__PURE__ */ e.jsx(N, { title: s("serviceAccount.viewDetail", { defaultValue: "View Detail" }), children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(ke, {}),
            onClick: () => j(`/authorization/service-accounts/${i.id}`)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(z, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(N, { title: s("serviceAccount.edit", { defaultValue: "Edit" }), children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(X, {}),
            onClick: () => L(i)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(z, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(N, { title: i.status === "active" ? c("disable", { defaultValue: "Disable" }) : c("enable", { defaultValue: "Enable" }), children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "text",
            size: "small",
            icon: i.status === "active" ? /* @__PURE__ */ e.jsx(Y, {}) : /* @__PURE__ */ e.jsx(ce, {}),
            onClick: () => A(i)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(z, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(N, { title: s("serviceAccount.delete", { defaultValue: "Delete" }), children: /* @__PURE__ */ e.jsx(
          ae,
          {
            title: s("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: () => B(i.id),
            okText: c("confirm", { defaultValue: "Confirm" }),
            cancelText: c("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              u,
              {
                type: "text",
                size: "small",
                danger: !0,
                icon: /* @__PURE__ */ e.jsx(le, {})
              }
            )
          }
        ) }) })
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(O, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      x,
      {
        form: k,
        layout: "horizontal",
        onFinish: m,
        initialValues: {
          search: y.search
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(te, { gutter: 16, children: [
          /* @__PURE__ */ e.jsx(G, { xs: 24, sm: 12, md: 8, lg: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "search", label: c("keyword", { defaultValue: "Keyword" }), children: /* @__PURE__ */ e.jsx(
            ee,
            {
              placeholder: s("serviceAccount.searchPlaceholder", { defaultValue: "Search by name or description" }),
              allowClear: !0,
              prefix: /* @__PURE__ */ e.jsx(we, {})
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(G, { xs: 24, sm: 12, md: 8, lg: 6, style: { display: "flex", alignItems: "flex-end" }, children: /* @__PURE__ */ e.jsx(x.Item, { children: /* @__PURE__ */ e.jsxs(_, { children: [
            /* @__PURE__ */ e.jsx(u, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Ce, {}), children: c("filter", { defaultValue: "Filter" }) }),
            /* @__PURE__ */ e.jsx(u, { onClick: w, icon: /* @__PURE__ */ e.jsx(re, {}), children: c("reset", { defaultValue: "Reset" }) })
          ] }) }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(O, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(te, { justify: "space-between", align: "middle", children: [
        /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            onClick: w,
            icon: /* @__PURE__ */ e.jsx(re, {}),
            children: c("refresh", { defaultValue: "Refresh" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx(z, { permission: "authorization:service_account:create", children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(me, {}),
            onClick: D,
            children: s("serviceAccount.create", { defaultValue: "Create Service Account" })
          }
        ) }) })
      ] }) }),
      /* @__PURE__ */ e.jsx(
        he,
        {
          rowKey: "id",
          dataSource: n,
          columns: E,
          loading: r,
          pagination: {
            current: y.current,
            pageSize: y.page_size,
            total: h,
            onChange: I,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (t) => c("totalItems", { defaultValue: `Total ${t} items`, total: t })
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(
      Ae,
      {
        serviceAccountID: b,
        onClose: M,
        open: o,
        onSuccess: () => {
          l();
        }
      }
    )
  ] });
}, ot = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ue
}, Symbol.toStringTag, { value: "Module" })), { Text: q, Paragraph: ne } = fe, { TextArea: Le } = ee, Me = ({ serviceAccountID: s }) => {
  const { t: c } = F("authorization"), { t: j } = F("common"), [k, r] = p([]), [a, n] = p(!1), [f, h] = p(!1), [S] = x.useForm(), [o, v] = p(null), [b, V] = p(null), [y, C] = p(!1), l = async () => {
    if (s) {
      n(!0);
      try {
        const t = await g.authorization.getServiceAccountAccessKeys({ id: s });
        r(t);
      } catch (t) {
        console.error("Failed to load access keys:", t), d.error(c("serviceAccount.loadKeysError", { defaultValue: "Failed to load access keys." }));
      } finally {
        n(!1);
      }
    }
  };
  W(() => {
    l();
  }, [s]);
  const m = (t) => {
    navigator.clipboard.writeText(t).then(
      () => {
        d.success(c("serviceAccount.copyKeySuccess", { defaultValue: "Copied to clipboard!" }));
      },
      (i) => {
        console.error("Could not copy text: ", i);
      }
    );
  }, w = () => {
    v(null), S.resetFields(), h(!0);
  }, I = (t) => {
    v(t), S.setFieldsValue({
      name: t.name,
      description: t.description,
      status: t.status === "active",
      expires_at: t.expires_at ? Re(t.expires_at) : void 0
    }), h(!0);
  }, D = () => {
    h(!1), S.resetFields();
  }, { run: L, loading: M } = U(
    async () => {
      const t = await S.validateFields();
      if (o) {
        const i = await g.authorization.updateServiceAccountAccessKey({ id: s, keyId: o.id }, {
          name: t.name,
          description: t.description,
          status: t.status ? "active" : "disabled",
          expires_at: t.expires_at ? t.expires_at.toISOString() : void 0
        });
        return h(!1), i;
      } else {
        const i = await g.authorization.createServiceAccountAccessKey({ id: s }, {
          name: t.name,
          description: t.description,
          expires_at: t.expires_at ? t.expires_at.toISOString() : void 0
        });
        V(i), h(!1), C(!0);
      }
    },
    {
      manual: !0,
      onSuccess: () => {
        d.success(c("serviceAccount.updateKeySuccess", { defaultValue: "Access key updated successfully." })), l();
      },
      onError: () => {
        d.error(c("serviceAccount.updateKeyError", { defaultValue: "Failed to update access key." }));
      }
    }
  ), B = async (t) => {
    try {
      await g.authorization.deleteServiceAccountAccessKey({ id: s, keyId: t }), d.success(c("serviceAccount.deleteKeySuccess", { defaultValue: "Access key deleted successfully." })), l();
    } catch (i) {
      console.error("Failed to delete key:", i), d.error(c("serviceAccount.deleteKeyError", { defaultValue: "Failed to delete access key." }));
    }
  }, A = () => {
    C(!1), V(null);
  }, E = [
    {
      title: c("serviceAccount.keyName", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: c("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
      dataIndex: "access_key_id",
      key: "access_key_id",
      render: (t) => /* @__PURE__ */ e.jsxs(_, { children: [
        /* @__PURE__ */ e.jsx(se, {}),
        /* @__PURE__ */ e.jsx(q, { copyable: !0, children: t })
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
      render: (t) => t === "active" ? /* @__PURE__ */ e.jsx(T, { status: "success", text: c("serviceAccount.keyActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(T, { status: "error", text: c("serviceAccount.keyDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: c("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
      dataIndex: "expires_at",
      key: "expires_at",
      render: (t) => t ? P(t) : /* @__PURE__ */ e.jsx(q, { type: "secondary", children: c("serviceAccount.neverExpires", { defaultValue: "Never" }) })
    },
    {
      title: c("serviceAccount.keyLastUsed", { defaultValue: "Last Used" }),
      dataIndex: "last_used",
      key: "last_used",
      render: (t) => t ? P(t) : /* @__PURE__ */ e.jsx(q, { type: "secondary", children: c("serviceAccount.keyNeverUsed", { defaultValue: "Never" }) })
    },
    {
      title: j("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (t, i) => /* @__PURE__ */ e.jsxs(_, { size: "small", children: [
        /* @__PURE__ */ e.jsx(N, { title: c("serviceAccount.updateKey", { defaultValue: "Update Key" }), children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(X, {}),
            onClick: () => I(i)
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          ae,
          {
            title: c("serviceAccount.deleteKeyConfirm", { defaultValue: "Are you sure you want to delete this access key?" }),
            onConfirm: () => B(i.id),
            okText: j("confirm", { defaultValue: "Confirm" }),
            cancelText: j("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              u,
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
      O,
      {
        title: /* @__PURE__ */ e.jsxs(_, { children: [
          /* @__PURE__ */ e.jsx(se, {}),
          c("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
        ] }),
        extra: /* @__PURE__ */ e.jsxs(_, { children: [
          /* @__PURE__ */ e.jsx(
            u,
            {
              icon: /* @__PURE__ */ e.jsx(xe, {}),
              onClick: l,
              loading: a,
              children: j("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            u,
            {
              type: "primary",
              icon: /* @__PURE__ */ e.jsx(me, {}),
              onClick: w,
              children: c("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" })
            }
          )
        ] }),
        children: /* @__PURE__ */ e.jsx(
          he,
          {
            columns: E,
            dataSource: k,
            rowKey: "id",
            loading: a,
            pagination: !1
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: o ? c("serviceAccount.updateKey", { defaultValue: "Update Access Key" }) : c("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" }),
        open: f,
        onOk: L,
        confirmLoading: M,
        onCancel: D,
        children: /* @__PURE__ */ e.jsxs(
          x,
          {
            form: S,
            layout: "vertical",
            children: [
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "name",
                  label: c("serviceAccount.keyName", { defaultValue: "Key Name" }),
                  rules: [{ required: !0, message: c("serviceAccount.keyNameRequired", { defaultValue: "Please enter a name for the access key." }) }],
                  children: /* @__PURE__ */ e.jsx(ee, { placeholder: c("serviceAccount.keyNamePlaceholder", { defaultValue: "Enter key name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "description",
                  label: c("serviceAccount.keyDescription", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Le,
                    {
                      rows: 3,
                      placeholder: c("serviceAccount.keyDescriptionPlaceholder", { defaultValue: "Enter key description (optional)" })
                    }
                  )
                }
              ),
              o && /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "status",
                  label: c("serviceAccount.keyStatus", { defaultValue: "Status" }),
                  valuePropName: "checked",
                  children: /* @__PURE__ */ e.jsx(
                    Ve,
                    {
                      checkedChildren: c("serviceAccount.keyActive", { defaultValue: "Active" }),
                      unCheckedChildren: c("serviceAccount.keyDisabled", { defaultValue: "Disabled" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "expires_at",
                  label: c("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
                  children: /* @__PURE__ */ e.jsx(
                    ge,
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
      Q,
      {
        title: /* @__PURE__ */ e.jsxs(_, { children: [
          /* @__PURE__ */ e.jsx(ze, { style: { color: "#faad14" } }),
          c("serviceAccount.secretNoticeTitle", { defaultValue: "Access Key Created - Important!" })
        ] }),
        open: y,
        footer: [
          /* @__PURE__ */ e.jsx(u, { onClick: A, children: j("confirm", { defaultValue: "I have copied the secret key. Close" }) }, "close")
        ],
        closable: !1,
        children: [
          /* @__PURE__ */ e.jsx(
            Se,
            {
              message: c("serviceAccount.secretNoticeMessage", { defaultValue: "Your new Secret Access Key is displayed below. This is the only time you will be able to see this secret. Please copy it and store it securely." }),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          b && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs(q, { strong: !0, children: [
                c("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(ne, { copyable: { text: b.access_key_id }, children: b.access_key_id })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs(q, { strong: !0, children: [
                c("serviceAccount.secretKey", { defaultValue: "Secret Access Key" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(ne, { copyable: { text: b.secret_access_key || "" }, children: b.secret_access_key })
            ] }),
            /* @__PURE__ */ e.jsx(
              u,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Ee, {}),
                onClick: () => {
                  const t = `Access Key: ${b.access_key_id}
Secret Key: ${b.secret_access_key}`;
                  m(t);
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
}, { Text: ue } = fe, Be = ({ serviceAccount: s, onRefresh: c, loading: j }) => {
  const { id: k } = s || {}, { t: r } = F("authorization"), { t: a } = F("common"), [n, f] = p([]), [h, S] = p([]);
  W(() => {
    S((s == null ? void 0 : s.roles) || []);
  }, [s]);
  const [o, v] = p(void 0), { loading: b } = U(async () => g.authorization.listRoles({ current: 1, page_size: 20, search: o }), {
    onSuccess: (l) => {
      const m = l.data;
      h.forEach((w) => {
        m.find((D) => D.id === w.id) || m.push(w);
      }), f(m);
    },
    onError: (l) => {
      console.error("Failed to load roles:", l), d.error(r("serviceAccount.loadRolesError", { defaultValue: "Failed to load roles." }));
    },
    debounceWait: 300,
    refreshDeps: [o]
  }), { run: V, loading: y } = U(async () => {
    if (k)
      return g.authorization.assignServiceAccountRoles({ id: k }, { role_ids: h.map((l) => l.id) });
  }, {
    onSuccess: () => {
      d.success(r("serviceAccount.assignRolesSuccess", { defaultValue: "Roles assigned successfully." })), c();
    },
    onError: (l) => {
      console.error("Failed to assign roles:", l), d.error(r("serviceAccount.assignRolesError", { defaultValue: "Failed to assign roles." }));
    },
    manual: !0
  }), C = (l) => {
    S(l.map((m) => n.find((w) => w.id === m) || {
      id: m,
      name: m,
      description: m
    }));
  };
  return /* @__PURE__ */ e.jsx(
    O,
    {
      title: /* @__PURE__ */ e.jsxs(_, { children: [
        /* @__PURE__ */ e.jsx(Y, {}),
        r("serviceAccount.authorization", { defaultValue: "Authorization" })
      ] }),
      extra: /* @__PURE__ */ e.jsx(
        u,
        {
          icon: /* @__PURE__ */ e.jsx(xe, {}),
          onClick: () => {
            c();
          },
          disabled: j || y,
          loading: y,
          children: a("refresh", { defaultValue: "Refresh" })
        }
      ),
      children: y ? /* @__PURE__ */ e.jsx(be, { active: !0, paragraph: { rows: 4 } }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(ue, { children: r("serviceAccount.roles", { defaultValue: "Roles" }) }),
          /* @__PURE__ */ e.jsx("div", { style: { marginTop: 8 }, children: h.length > 0 ? n.filter((l) => h.some((m) => m.id === l.id)).map((l) => /* @__PURE__ */ e.jsx(J, { color: "blue", children: l.name }, l.id)) : /* @__PURE__ */ e.jsx(
            Z,
            {
              image: Z.PRESENTED_IMAGE_SIMPLE,
              description: r("serviceAccount.noRoles", { defaultValue: "No roles assigned." }),
              style: { margin: "10px 0" }
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(ue, { children: r("serviceAccount.assignRoles", { defaultValue: "Assign Roles" }) }),
          /* @__PURE__ */ e.jsx(
            pe,
            {
              mode: "multiple",
              style: { width: "100%", marginTop: 8 },
              placeholder: r("serviceAccount.selectRoles", { defaultValue: "Select roles to assign" }),
              value: h.map((l) => l.id),
              onSearch: (l) => {
                v(l);
              },
              onDropdownVisibleChange: (l) => {
                l && v(void 0);
              },
              onChange: C,
              loading: j || b,
              optionFilterProp: "label",
              options: n.map((l) => ({
                label: l.name,
                value: l.id,
                title: l.description
              }))
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            onClick: V,
            loading: y,
            disabled: j,
            children: r("serviceAccount.assignRoles", { defaultValue: "Assign Roles" })
          }
        ) })
      ] })
    }
  );
}, { TabPane: H } = ye, $e = {
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
}, qe = Oe(({ css: s }) => ({
  rolePolicy: s`
       .ant-collapse-content>.ant-collapse-content-box{
        padding: 2px;
      }
      .ant-form-item-additional>#policy_document_extra{
        min-height: 0;
      }
    `,
  rolePermissionExtra: s`
      float: right;
      z-index: 1001;
      position: sticky;
    `,
  rolePolicyExtra: s`
      position: absolute;
      right: 20px;
      top: 5px;
    `
})), Je = () => {
  const { styles: s } = qe(), r = Ke().hash.replace("#", "") || "basic", { t: a } = F("authorization"), { t: n } = F("common"), { id: f } = Pe(), h = ve(), { hasPermission: S } = Ne(), [o, v] = p(null), [b, V] = p(!1), [y] = x.useForm(), [C, l] = p(!1);
  if (!f)
    return /* @__PURE__ */ e.jsx(Ie, {});
  const { run: m, loading: w } = U(async () => {
    if (f)
      return g.authorization.getServiceAccountById({ id: f });
  }, {
    onSuccess: (A) => {
      v(A || null);
    }
  });
  W(() => {
    m();
  }, [f]);
  const I = (A) => {
    h(`#${A}`);
  }, D = async () => {
    if (f)
      try {
        await g.authorization.deleteServiceAccount({ id: f }), d.success(a("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully." })), h("/authorization/service-accounts");
      } catch (A) {
        console.error(a("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }), A), d.error(a("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }));
      }
  }, { run: L, loading: M } = U(async () => {
    if (o)
      return g.authorization.updateServiceAccountStatus({ id: f }, { status: o.status === "active" ? "disabled" : "active" });
  }, {
    onSuccess: (A) => {
      v(A || null), d.success(a("serviceAccount.statusUpdateSuccess", { defaultValue: "Service account status updated successfully." }));
    },
    onError: (A) => {
      console.error(a("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }), A), d.error(a("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }));
    },
    manual: !0
  }), B = async (A) => {
    if (f)
      try {
        let E;
        try {
          E = JSON.parse(A.policy_document);
        } catch {
          d.error(a("serviceAccount.policyInvalidJson", { defaultValue: "Invalid JSON format for policy document." }));
          return;
        }
        await g.authorization.setServiceAccountPolicy({ id: f }, { policy_document: E }), d.success(a("serviceAccount.policyUpdateSuccess", { defaultValue: "Policy document updated successfully." })), V(!1), m();
      } catch (E) {
        console.error(a("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }), E), d.error(a("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }));
      }
  };
  return w ? /* @__PURE__ */ e.jsx(oe, { size: "large", style: { display: "flex", justifyContent: "center", padding: "50px" } }) : o ? /* @__PURE__ */ e.jsxs(
    O,
    {
      title: /* @__PURE__ */ e.jsxs(_, { children: [
        /* @__PURE__ */ e.jsx(Te, {}),
        o.name,
        o.status === "active" ? /* @__PURE__ */ e.jsx(T, { status: "success", text: a("serviceAccount.status.active", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(T, { status: "error", text: a("serviceAccount.status.disabled", { defaultValue: "Disabled" }) })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(_, { children: [
        /* @__PURE__ */ e.jsx(z, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(X, {}),
            onClick: () => l(!0),
            disabled: C,
            children: n("edit", { defaultValue: "Edit" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(z, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          u,
          {
            icon: o.status === "active" ? /* @__PURE__ */ e.jsx(Y, {}) : /* @__PURE__ */ e.jsx(ce, {}),
            onClick: L,
            loading: M,
            children: o.status === "active" ? n("disable", { defaultValue: "Disable" }) : n("enable", { defaultValue: "Enable" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(z, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(
          ae,
          {
            title: a("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: D,
            okText: n("confirm", { defaultValue: "Confirm" }),
            cancelText: n("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(u, { danger: !0, icon: /* @__PURE__ */ e.jsx(le, {}), children: n("delete", { defaultValue: "Delete" }) })
          }
        ) }),
        /* @__PURE__ */ e.jsx(u, { icon: /* @__PURE__ */ e.jsx(Fe, {}), onClick: () => h("/authorization/service-accounts"), children: n("back", { defaultValue: "Back" }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(ye, { defaultActiveKey: r, onChange: I, children: [
          /* @__PURE__ */ e.jsx(H, { tab: a("serviceAccount.tabs.basic", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(K, { bordered: !0, column: 2, children: [
            /* @__PURE__ */ e.jsx(K.Item, { label: a("serviceAccount.name", { defaultValue: "Name" }), span: 2, children: o.name }),
            /* @__PURE__ */ e.jsx(K.Item, { label: a("serviceAccount.description", { defaultValue: "Description" }), span: 2, children: o.description || a("serviceAccount.noDescription", { defaultValue: "N/A" }) }),
            /* @__PURE__ */ e.jsx(K.Item, { label: a("serviceAccount.status", { defaultValue: "Status" }), children: o.status === "active" ? /* @__PURE__ */ e.jsx(T, { status: "success", text: a("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(T, { status: "error", text: a("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) }) }),
            /* @__PURE__ */ e.jsx(K.Item, { label: a("serviceAccount.lastAccess", { defaultValue: "Last Access" }), children: o.last_access ? P(o.last_access) : a("serviceAccount.neverAccessed", { defaultValue: "Never" }) }),
            /* @__PURE__ */ e.jsx(K.Item, { label: a("serviceAccount.createdAt", { defaultValue: "Created At" }), children: P(o.created_at) }),
            /* @__PURE__ */ e.jsx(K.Item, { label: a("serviceAccount.updatedAt", { defaultValue: "Updated At" }), children: P(o.updated_at) })
          ] }) }, "basic"),
          /* @__PURE__ */ e.jsx(
            H,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(se, {}),
                a("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
              ] }),
              disabled: !S("authorization:service_account:access_key:list"),
              children: /* @__PURE__ */ e.jsx(Me, { serviceAccountID: f })
            },
            "access-keys"
          ),
          /* @__PURE__ */ e.jsx(
            H,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(Y, {}),
                a("serviceAccount.authorization", { defaultValue: "Authorization" })
              ] }),
              disabled: !S("authorization:service_account:role:list"),
              children: /* @__PURE__ */ e.jsx(
                Be,
                {
                  serviceAccount: o,
                  onRefresh: m
                }
              )
            },
            "authorization"
          ),
          /* @__PURE__ */ e.jsxs(H, { tab: a("serviceAccount.tabs.policy", { defaultValue: "Policy Document" }), children: [
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(te, { justify: "end", children: /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx(z, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
              u,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(X, {}),
                onClick: () => {
                  V(!0), y.setFieldsValue({
                    policy_document: JSON.stringify(o.policy_document, null, 2)
                  });
                },
                children: a("serviceAccount.editPolicy", { defaultValue: "Edit Policy" })
              }
            ) }) }) }) }),
            /* @__PURE__ */ e.jsx(oe, { spinning: w, children: o.policy_document && o.policy_document.Statement && o.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(O, { children: /* @__PURE__ */ e.jsx("pre", { style: { whiteSpace: "pre-wrap", overflowX: "auto" }, children: JSON.stringify(o.policy_document, null, 2) }) }) : /* @__PURE__ */ e.jsx(Z, { description: a("serviceAccount.noPolicy", { defaultValue: "No policy document defined for this service account." }) }) })
          ] }, "policy")
        ] }),
        /* @__PURE__ */ e.jsx(
          Q,
          {
            title: a("serviceAccount.editPolicy", { defaultValue: "Edit Policy" }),
            open: b,
            onCancel: () => {
              V(!1), y.resetFields();
            },
            footer: null,
            width: 700,
            children: /* @__PURE__ */ e.jsxs(x, { form: y, layout: "vertical", onFinish: B, children: [
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "policy_document",
                  extra: /* @__PURE__ */ e.jsx("span", { className: s.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                    pe,
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
                        const E = $e[A];
                        E && y.setFieldValue("policy_document", JSON.stringify(E, null, 2));
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
              /* @__PURE__ */ e.jsx(x.Item, { children: /* @__PURE__ */ e.jsxs(_, { children: [
                /* @__PURE__ */ e.jsx(u, { type: "primary", htmlType: "submit", children: n("save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(u, { onClick: () => V(!1), children: n("cancel", { defaultValue: "Cancel" }) })
              ] }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          Ae,
          {
            serviceAccountID: f,
            onClose: () => l(!1),
            open: C
          }
        )
      ]
    }
  ) : /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px 0" }, children: /* @__PURE__ */ e.jsx(Z, { description: a("serviceAccount.notFound", { defaultValue: "Service account not found." }) }) });
}, rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Je
}, Symbol.toStringTag, { value: "Module" }));
export {
  ot as S,
  rt as a
};
