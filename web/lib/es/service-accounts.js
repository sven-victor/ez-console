import { u as F, r as x, e as $, j as e, M as Z, p as te, aH as he, o as _, m as r, s as d, T as U, aI as R, V as G, aJ as se, aK as Ve, E as ge, aB as X, ay as Y, k as le, aC as ie, C as M, X as ce, Y as W, $ as Se, aL as be, a0 as ne, q as fe, F as pe, ax as ae, J as ye, aM as me, aN as _e, _ as ke, z as we, aO as Ce, aP as Ee, aQ as ze, h as Ie, W as ee, Z as xe, c as Fe, S as re, aA as ve, aR as K, aS as Re, ac as Te } from "./vendor.js";
import { useEffect as H, useState as v, useCallback as De } from "react";
import { useNavigate as Ae, Link as Ke, useLocation as Pe, useParams as Ne } from "react-router-dom";
import { f as I } from "./components.js";
import { a as V } from "./index.js";
import { P as q, f as P } from "./base.js";
import Ue from "./not_found.js";
import { a as $e } from "./contexts.js";
const je = ({
  serviceAccountID: s,
  onClose: t,
  open: j = !1,
  onSuccess: k
}) => {
  const { t: n } = F("authorization"), { t: a } = F("common"), [u] = x.useForm(), { run: p, loading: y } = $((m) => s ? V.authorization.updateServiceAccount({ id: s }, m) : V.authorization.createServiceAccount(m), {
    onSuccess: () => {
      d.success(n("serviceAccount.saveSuccess", { defaultValue: "Service account saved successfully." })), t(), k == null || k();
    },
    onError: () => {
      d.error(n("serviceAccount.saveError", { defaultValue: "Failed to save service account." }));
    },
    manual: !0
  });
  return H(() => {
    j && s ? V.authorization.getServiceAccountById({ id: s }).then((m) => {
      u.setFieldsValue({
        name: m.name,
        description: m.description
      });
    }) : u.resetFields();
  }, [s, j]), /* @__PURE__ */ e.jsx(
    Z,
    {
      title: s ? n("serviceAccount.edit", { defaultValue: "Edit Service Account" }) : n("serviceAccount.create", { defaultValue: "Create Service Account" }),
      width: 500,
      onClose: t,
      open: j,
      footer: /* @__PURE__ */ e.jsxs(_, { children: [
        /* @__PURE__ */ e.jsx(r, { onClick: t, children: a("cancel", { defaultValue: "Cancel" }) }),
        /* @__PURE__ */ e.jsx(
          r,
          {
            type: "primary",
            onClick: u.submit,
            loading: y,
            children: a("save", { defaultValue: "Save" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(
        x,
        {
          form: u,
          layout: "vertical",
          onFinish: p,
          children: [
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                label: n("serviceAccount.name", { defaultValue: "Name" }),
                name: "name",
                rules: [{ required: !0, message: n("serviceAccount.nameRequired", { defaultValue: "Please enter a name for the service account." }) }],
                children: /* @__PURE__ */ e.jsx(te, { placeholder: n("serviceAccount.namePlaceholder", { defaultValue: "Enter service account name" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                label: n("serviceAccount.description", { defaultValue: "Description" }),
                name: "description",
                children: /* @__PURE__ */ e.jsx(he, { rows: 4, placeholder: n("serviceAccount.descriptionPlaceholder", { defaultValue: "Enter service account description (optional)" }) })
              }
            )
          ]
        }
      )
    }
  );
}, Me = () => {
  const { t: s } = F("authorization"), { t } = F("common"), j = Ae(), [k] = x.useForm(), [n] = x.useForm(), [a, u] = v(!1), [p, y] = v([]), [m, o] = v(0), [z, g] = v(!1), [w, S] = v(null), [b, i] = v({
    current: q.DEFAULT_CURRENT,
    page_size: q.DEFAULT_PAGE_SIZE,
    search: void 0
  }), h = De(async () => {
    try {
      u(!0);
      const c = await V.authorization.getServiceAccounts(b);
      y(c.data || []), o(c.total || 0);
    } catch (c) {
      console.error(s("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }), c), d.error(s("serviceAccount.loadError", { defaultValue: "Failed to load service accounts" }));
    } finally {
      u(!1);
    }
  }, [b, s]);
  H(() => {
    h();
  }, [h]);
  const C = (c) => {
    i({
      ...b,
      current: q.DEFAULT_CURRENT,
      // Reset to the first page
      search: c.search
    });
  }, T = () => {
    k.resetFields(), i({
      current: q.DEFAULT_CURRENT,
      page_size: q.DEFAULT_PAGE_SIZE,
      search: void 0
    });
  }, D = (c, f) => {
    i((N) => ({
      ...N,
      current: c,
      page_size: f
    }));
  }, L = () => {
    S(null), g(!0);
  }, B = (c) => {
    S(c.id), g(!0);
  }, O = () => {
    g(!1), n.resetFields();
  }, A = async (c) => {
    try {
      await V.authorization.deleteServiceAccount({ id: c }), d.success(s("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully" })), h();
    } catch (f) {
      console.error(s("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }), f), d.error(s("serviceAccount.deleteError", { defaultValue: "Failed to delete service account" }));
    }
  }, E = async (c) => {
    const f = c.status === "active" ? "disabled" : "active";
    try {
      await V.authorization.updateServiceAccountStatus({ id: c.id }, { status: f }), d.success(s("serviceAccount.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), h();
    } catch (N) {
      console.error(s("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" }), N), d.error(s("serviceAccount.statusUpdateError", { defaultValue: "Failed to update status" }));
    }
  }, l = [
    {
      title: s("serviceAccount.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (c, f) => /* @__PURE__ */ e.jsx(I, { permission: "authorization:service_account:view", fallback: c, children: /* @__PURE__ */ e.jsx(Ke, { to: `/authorization/service-accounts/${f.id}`, children: c }) })
    },
    {
      title: s("serviceAccount.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description",
      render: (c) => /* @__PURE__ */ e.jsx(U, { title: c, children: /* @__PURE__ */ e.jsx("span", { children: (c == null ? void 0 : c.length) > 30 ? `${c.substring(0, 30)}...` : c }) })
    },
    {
      title: s("serviceAccount.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (c) => c === "active" ? /* @__PURE__ */ e.jsx(R, { status: "success", text: s("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(R, { status: "error", text: s("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("serviceAccount.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (c, f) => {
        var N;
        return /* @__PURE__ */ e.jsxs(_, { size: [0, 4], wrap: !0, children: [
          (N = f.roles) == null ? void 0 : N.map((oe) => /* @__PURE__ */ e.jsx(G, { color: "blue", children: oe.name }, oe.id)),
          (!f.roles || f.roles.length === 0) && /* @__PURE__ */ e.jsx(G, { children: s("serviceAccount.noRoles", { defaultValue: "No Roles" }) })
        ] });
      }
    },
    {
      title: s("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }),
      key: "policy",
      render: (c, f) => f.policy_document && f.policy_document.Statement && f.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(G, { color: "green", icon: /* @__PURE__ */ e.jsx(se, {}), children: s("serviceAccount.hasPolicy", { defaultValue: "Has Policy" }) }) : /* @__PURE__ */ e.jsx(G, { color: "default", icon: /* @__PURE__ */ e.jsx(Ve, {}), children: s("serviceAccount.noPolicy", { defaultValue: "No Policy" }) })
    },
    {
      title: s("serviceAccount.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      render: (c) => P(c)
    },
    {
      title: s("serviceAccount.lastAccess", { defaultValue: "Last Access" }),
      dataIndex: "last_access",
      key: "last_access",
      render: (c) => c ? P(c) : s("serviceAccount.neverAccessed", { defaultValue: "Never Accessed" })
    },
    {
      title: t("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (c, f) => /* @__PURE__ */ e.jsxs(_, { size: "small", children: [
        /* @__PURE__ */ e.jsx(I, { permission: "authorization:service_account:view", children: /* @__PURE__ */ e.jsx(U, { title: s("serviceAccount.viewDetail", { defaultValue: "View Detail" }), children: /* @__PURE__ */ e.jsx(
          r,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(ge, {}),
            onClick: () => j(`/authorization/service-accounts/${f.id}`)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(I, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(U, { title: s("serviceAccount.edit", { defaultValue: "Edit" }), children: /* @__PURE__ */ e.jsx(
          r,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ e.jsx(X, {}),
            onClick: () => B(f)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(I, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(U, { title: f.status === "active" ? t("disable", { defaultValue: "Disable" }) : t("enable", { defaultValue: "Enable" }), children: /* @__PURE__ */ e.jsx(
          r,
          {
            type: "text",
            size: "small",
            icon: f.status === "active" ? /* @__PURE__ */ e.jsx(Y, {}) : /* @__PURE__ */ e.jsx(se, {}),
            onClick: () => E(f)
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(I, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(U, { title: s("serviceAccount.delete", { defaultValue: "Delete" }), children: /* @__PURE__ */ e.jsx(
          le,
          {
            title: s("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: () => A(f.id),
            okText: t("confirm", { defaultValue: "Confirm" }),
            cancelText: t("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              r,
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
    /* @__PURE__ */ e.jsx(M, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      x,
      {
        form: k,
        layout: "horizontal",
        onFinish: C,
        initialValues: {
          search: b.search
        },
        style: { marginBottom: 0 },
        children: /* @__PURE__ */ e.jsxs(ce, { gutter: 16, children: [
          /* @__PURE__ */ e.jsx(W, { xs: 24, sm: 12, md: 8, lg: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "search", label: t("keyword", { defaultValue: "Keyword" }), children: /* @__PURE__ */ e.jsx(
            te,
            {
              placeholder: s("serviceAccount.searchPlaceholder", { defaultValue: "Search by name or description" }),
              allowClear: !0,
              prefix: /* @__PURE__ */ e.jsx(Se, {})
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(W, { xs: 24, sm: 12, md: 8, lg: 6, style: { display: "flex", alignItems: "flex-end" }, children: /* @__PURE__ */ e.jsx(x.Item, { children: /* @__PURE__ */ e.jsxs(_, { children: [
            /* @__PURE__ */ e.jsx(r, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(be, {}), children: t("filter", { defaultValue: "Filter" }) }),
            /* @__PURE__ */ e.jsx(r, { onClick: T, icon: /* @__PURE__ */ e.jsx(ne, {}), children: t("reset", { defaultValue: "Reset" }) })
          ] }) }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(M, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ce, { justify: "space-between", align: "middle", children: [
        /* @__PURE__ */ e.jsx(W, { children: /* @__PURE__ */ e.jsx(
          r,
          {
            type: "primary",
            onClick: T,
            icon: /* @__PURE__ */ e.jsx(ne, {}),
            children: t("refresh", { defaultValue: "Refresh" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(W, { children: /* @__PURE__ */ e.jsx(I, { permission: "authorization:service_account:create", children: /* @__PURE__ */ e.jsx(
          r,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(fe, {}),
            onClick: L,
            children: s("serviceAccount.create", { defaultValue: "Create Service Account" })
          }
        ) }) })
      ] }) }),
      /* @__PURE__ */ e.jsx(
        pe,
        {
          rowKey: "id",
          dataSource: p,
          columns: l,
          loading: a,
          pagination: {
            current: b.current,
            pageSize: b.page_size,
            total: m,
            onChange: D,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (c) => t("totalItems", { defaultValue: `Total ${c} items`, total: c })
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(
      je,
      {
        serviceAccountID: w,
        onClose: O,
        open: z,
        onSuccess: () => {
          h();
        }
      }
    )
  ] });
}, st = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), { Text: J, Paragraph: ue } = ye, { TextArea: Le } = te, Be = ({ serviceAccountID: s }) => {
  const { t } = F("authorization"), { t: j } = F("common"), [k, n] = v([]), [a, u] = v(!1), [p, y] = v(!1), [m] = x.useForm(), [o, z] = v(null), [g, w] = v(null), [S, b] = v(!1), i = async () => {
    if (s) {
      u(!0);
      try {
        const l = await V.authorization.getServiceAccountAccessKeys({ id: s });
        n(l);
      } catch (l) {
        console.error("Failed to load access keys:", l), d.error(t("serviceAccount.loadKeysError", { defaultValue: "Failed to load access keys." }));
      } finally {
        u(!1);
      }
    }
  };
  H(() => {
    i();
  }, [s]);
  const h = (l) => {
    navigator.clipboard.writeText(l).then(
      () => {
        d.success(t("serviceAccount.copyKeySuccess", { defaultValue: "Copied to clipboard!" }));
      },
      (c) => {
        console.error("Could not copy text: ", c);
      }
    );
  }, C = () => {
    z(null), m.resetFields(), y(!0);
  }, T = (l) => {
    z(l), m.setFieldsValue({
      name: l.name,
      description: l.description,
      status: l.status === "active",
      expires_at: l.expires_at ? ze(l.expires_at) : void 0
    }), y(!0);
  }, D = () => {
    y(!1), m.resetFields();
  }, { run: L, loading: B } = $(
    async () => {
      const l = await m.validateFields();
      if (o) {
        const c = await V.authorization.updateServiceAccountAccessKey({ id: s, keyId: o.id }, {
          name: l.name,
          description: l.description,
          status: l.status ? "active" : "disabled",
          expires_at: l.expires_at ? l.expires_at.toISOString() : void 0
        });
        return y(!1), c;
      } else {
        const c = await V.authorization.createServiceAccountAccessKey({ id: s }, {
          name: l.name,
          description: l.description,
          expires_at: l.expires_at ? l.expires_at.toISOString() : void 0
        });
        w(c), y(!1), b(!0);
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
  ), O = async (l) => {
    try {
      await V.authorization.deleteServiceAccountAccessKey({ id: s, keyId: l }), d.success(t("serviceAccount.deleteKeySuccess", { defaultValue: "Access key deleted successfully." })), i();
    } catch (c) {
      console.error("Failed to delete key:", c), d.error(t("serviceAccount.deleteKeyError", { defaultValue: "Failed to delete access key." }));
    }
  }, A = () => {
    b(!1), w(null);
  }, E = [
    {
      title: t("serviceAccount.keyName", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
      dataIndex: "access_key_id",
      key: "access_key_id",
      render: (l) => /* @__PURE__ */ e.jsxs(_, { children: [
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
      render: (l) => l === "active" ? /* @__PURE__ */ e.jsx(R, { status: "success", text: t("serviceAccount.keyActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(R, { status: "error", text: t("serviceAccount.keyDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: t("serviceAccount.keyExpires", { defaultValue: "Expires At" }),
      dataIndex: "expires_at",
      key: "expires_at",
      render: (l) => l ? P(l) : /* @__PURE__ */ e.jsx(J, { type: "secondary", children: t("serviceAccount.neverExpires", { defaultValue: "Never" }) })
    },
    {
      title: t("serviceAccount.keyLastUsed", { defaultValue: "Last Used" }),
      dataIndex: "last_used",
      key: "last_used",
      render: (l) => l ? P(l) : /* @__PURE__ */ e.jsx(J, { type: "secondary", children: t("serviceAccount.keyNeverUsed", { defaultValue: "Never" }) })
    },
    {
      title: j("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (l, c) => /* @__PURE__ */ e.jsxs(_, { size: "small", children: [
        /* @__PURE__ */ e.jsx(U, { title: t("serviceAccount.updateKey", { defaultValue: "Update Key" }), children: /* @__PURE__ */ e.jsx(
          r,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(X, {}),
            onClick: () => T(c)
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          le,
          {
            title: t("serviceAccount.deleteKeyConfirm", { defaultValue: "Are you sure you want to delete this access key?" }),
            onConfirm: () => O(c.id),
            okText: j("confirm", { defaultValue: "Confirm" }),
            cancelText: j("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(
              r,
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
      M,
      {
        title: /* @__PURE__ */ e.jsxs(_, { children: [
          /* @__PURE__ */ e.jsx(ae, {}),
          t("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
        ] }),
        extra: /* @__PURE__ */ e.jsxs(_, { children: [
          /* @__PURE__ */ e.jsx(
            r,
            {
              icon: /* @__PURE__ */ e.jsx(me, {}),
              onClick: i,
              loading: a,
              children: j("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            r,
            {
              type: "primary",
              icon: /* @__PURE__ */ e.jsx(fe, {}),
              onClick: C,
              children: t("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" })
            }
          )
        ] }),
        children: /* @__PURE__ */ e.jsx(
          pe,
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
      Z,
      {
        title: o ? t("serviceAccount.updateKey", { defaultValue: "Update Access Key" }) : t("serviceAccount.createAccessKey", { defaultValue: "Create Access Key" }),
        open: p,
        onOk: L,
        confirmLoading: B,
        onCancel: D,
        children: /* @__PURE__ */ e.jsxs(
          x,
          {
            form: m,
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
                    Le,
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
                    _e,
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
                    ke,
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
        title: /* @__PURE__ */ e.jsxs(_, { children: [
          /* @__PURE__ */ e.jsx(Ee, { style: { color: "#faad14" } }),
          t("serviceAccount.secretNoticeTitle", { defaultValue: "Access Key Created - Important!" })
        ] }),
        open: S,
        footer: [
          /* @__PURE__ */ e.jsx(r, { onClick: A, children: j("confirm", { defaultValue: "I have copied the secret key. Close" }) }, "close")
        ],
        closable: !1,
        children: [
          /* @__PURE__ */ e.jsx(
            we,
            {
              message: t("serviceAccount.secretNoticeMessage", { defaultValue: "Your new Secret Access Key is displayed below. This is the only time you will be able to see this secret. Please copy it and store it securely." }),
              type: "warning",
              showIcon: !0,
              style: { marginBottom: 16 }
            }
          ),
          g && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs(J, { strong: !0, children: [
                t("serviceAccount.accessKey", { defaultValue: "Access Key ID" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(ue, { copyable: { text: g.access_key_id }, children: g.access_key_id })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ e.jsxs(J, { strong: !0, children: [
                t("serviceAccount.secretKey", { defaultValue: "Secret Access Key" }),
                ":"
              ] }),
              /* @__PURE__ */ e.jsx(ue, { copyable: { text: g.secret_access_key || "" }, children: g.secret_access_key })
            ] }),
            /* @__PURE__ */ e.jsx(
              r,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Ce, {}),
                onClick: () => {
                  const l = `Access Key: ${g.access_key_id}
Secret Key: ${g.secret_access_key}`;
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
}, { Text: de } = ye, Oe = ({ serviceAccount: s, onRefresh: t, loading: j }) => {
  const { id: k } = s || {}, { t: n } = F("authorization"), { t: a } = F("common"), [u, p] = v([]), [y, m] = v([]);
  H(() => {
    m((s == null ? void 0 : s.roles) || []);
  }, [s]);
  const [o, z] = v(void 0), { loading: g } = $(async () => V.authorization.listRoles({ current: 1, page_size: 20, search: o }), {
    onSuccess: (i) => {
      const h = i.data;
      y.forEach((C) => {
        h.find((D) => D.id === C.id) || h.push(C);
      }), p(h);
    },
    onError: (i) => {
      console.error("Failed to load roles:", i), d.error(n("serviceAccount.loadRolesError", { defaultValue: "Failed to load roles." }));
    },
    debounceWait: 300,
    refreshDeps: [o]
  }), { run: w, loading: S } = $(async () => {
    if (k)
      return V.authorization.assignServiceAccountRoles({ id: k }, { role_ids: y.map((i) => i.id) });
  }, {
    onSuccess: () => {
      d.success(n("serviceAccount.assignRolesSuccess", { defaultValue: "Roles assigned successfully." })), t();
    },
    onError: (i) => {
      console.error("Failed to assign roles:", i), d.error(n("serviceAccount.assignRolesError", { defaultValue: "Failed to assign roles." }));
    },
    manual: !0
  }), b = (i) => {
    m(i.map((h) => u.find((C) => C.id === h) || { id: h, name: h, description: h }));
  };
  return /* @__PURE__ */ e.jsx(
    M,
    {
      title: /* @__PURE__ */ e.jsxs(_, { children: [
        /* @__PURE__ */ e.jsx(Y, {}),
        n("serviceAccount.authorization", { defaultValue: "Authorization" })
      ] }),
      extra: /* @__PURE__ */ e.jsx(
        r,
        {
          icon: /* @__PURE__ */ e.jsx(me, {}),
          onClick: () => {
            t();
          },
          disabled: j || S,
          loading: S,
          children: a("refresh", { defaultValue: "Refresh" })
        }
      ),
      children: S ? /* @__PURE__ */ e.jsx(Ie, { active: !0, paragraph: { rows: 4 } }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(de, { children: n("serviceAccount.roles", { defaultValue: "Roles" }) }),
          /* @__PURE__ */ e.jsx("div", { style: { marginTop: 8 }, children: y.length > 0 ? u.filter((i) => y.some((h) => h.id === i.id)).map((i) => /* @__PURE__ */ e.jsx(G, { color: "blue", children: i.name }, i.id)) : /* @__PURE__ */ e.jsx(
            ee,
            {
              image: ee.PRESENTED_IMAGE_SIMPLE,
              description: n("serviceAccount.noRoles", { defaultValue: "No roles assigned." }),
              style: { margin: "10px 0" }
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ e.jsx(de, { children: n("serviceAccount.assignRoles", { defaultValue: "Assign Roles" }) }),
          /* @__PURE__ */ e.jsx(
            xe,
            {
              mode: "multiple",
              style: { width: "100%", marginTop: 8 },
              placeholder: n("serviceAccount.selectRoles", { defaultValue: "Select roles to assign" }),
              value: y.map((i) => i.id),
              onSearch: (i) => {
                z(i);
              },
              onDropdownVisibleChange: (i) => {
                i && z(void 0);
              },
              onChange: b,
              loading: j || g,
              optionFilterProp: "label",
              options: u.map((i) => ({
                label: i.name,
                value: i.id,
                title: i.description
              }))
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(
          r,
          {
            type: "primary",
            onClick: w,
            loading: S,
            disabled: j,
            children: n("serviceAccount.assignRoles", { defaultValue: "Assign Roles" })
          }
        ) })
      ] })
    }
  );
}, { TabPane: Q } = ve, qe = {
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
}, Je = Fe(({ css: s }) => ({
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
})), Ge = () => {
  const { styles: s } = Je(), n = Pe().hash.replace("#", "") || "basic", { t: a } = F("authorization"), { t: u } = F("common"), { id: p } = Ne(), y = Ae(), { hasPermission: m } = $e(), [o, z] = v(null), [g, w] = v(!1), [S] = x.useForm(), [b, i] = v(!1);
  if (!p)
    return /* @__PURE__ */ e.jsx(Ue, {});
  const { run: h, loading: C } = $(async () => {
    if (p)
      return V.authorization.getServiceAccountById({ id: p });
  }, {
    onSuccess: (A) => {
      z(A || null);
    }
  });
  H(() => {
    h();
  }, [p]);
  const T = (A) => {
    y(`#${A}`);
  }, D = async () => {
    if (p)
      try {
        await V.authorization.deleteServiceAccount({ id: p }), d.success(a("serviceAccount.deleteSuccess", { defaultValue: "Service account deleted successfully." })), y("/authorization/service-accounts");
      } catch (A) {
        console.error(a("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }), A), d.error(a("serviceAccount.deleteError", { defaultValue: "Failed to delete service account." }));
      }
  }, { run: L, loading: B } = $(async () => {
    if (o)
      return V.authorization.updateServiceAccountStatus({ id: p }, { status: o.status === "active" ? "disabled" : "active" });
  }, {
    onSuccess: (A) => {
      z(A || null), d.success(a("serviceAccount.statusUpdateSuccess", { defaultValue: "Service account status updated successfully." }));
    },
    onError: (A) => {
      console.error(a("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }), A), d.error(a("serviceAccount.statusUpdateError", { defaultValue: "Failed to update service account status." }));
    },
    manual: !0
  }), O = async (A) => {
    if (p)
      try {
        let E;
        try {
          E = JSON.parse(A.policy_document);
        } catch {
          d.error(a("serviceAccount.policyInvalidJson", { defaultValue: "Invalid JSON format for policy document." }));
          return;
        }
        await V.authorization.setServiceAccountPolicy({ id: p }, { policy_document: E }), d.success(a("serviceAccount.policyUpdateSuccess", { defaultValue: "Policy document updated successfully." })), w(!1), h();
      } catch (E) {
        console.error(a("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }), E), d.error(a("serviceAccount.policyUpdateError", { defaultValue: "Failed to update policy document." }));
      }
  };
  return C ? /* @__PURE__ */ e.jsx(re, { size: "large", style: { display: "flex", justifyContent: "center", padding: "50px" } }) : o ? /* @__PURE__ */ e.jsxs(
    M,
    {
      title: /* @__PURE__ */ e.jsxs(_, { children: [
        /* @__PURE__ */ e.jsx(Te, {}),
        o.name,
        o.status === "active" ? /* @__PURE__ */ e.jsx(R, { status: "success", text: a("serviceAccount.status.active", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(R, { status: "error", text: a("serviceAccount.status.disabled", { defaultValue: "Disabled" }) })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(_, { children: [
        /* @__PURE__ */ e.jsx(I, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          r,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(X, {}),
            onClick: () => i(!0),
            disabled: b,
            children: u("edit", { defaultValue: "Edit" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(I, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
          r,
          {
            icon: o.status === "active" ? /* @__PURE__ */ e.jsx(Y, {}) : /* @__PURE__ */ e.jsx(se, {}),
            onClick: L,
            loading: B,
            children: o.status === "active" ? u("disable", { defaultValue: "Disable" }) : u("enable", { defaultValue: "Enable" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(I, { permission: "authorization:service_account:delete", children: /* @__PURE__ */ e.jsx(
          le,
          {
            title: a("serviceAccount.deleteConfirm", { defaultValue: "Are you sure you want to delete this service account?" }),
            onConfirm: D,
            okText: u("confirm", { defaultValue: "Confirm" }),
            cancelText: u("cancel", { defaultValue: "Cancel" }),
            children: /* @__PURE__ */ e.jsx(r, { danger: !0, icon: /* @__PURE__ */ e.jsx(ie, {}), children: u("delete", { defaultValue: "Delete" }) })
          }
        ) }),
        /* @__PURE__ */ e.jsx(r, { icon: /* @__PURE__ */ e.jsx(Re, {}), onClick: () => y("/authorization/service-accounts"), children: u("back", { defaultValue: "Back" }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(ve, { defaultActiveKey: n, onChange: T, children: [
          /* @__PURE__ */ e.jsx(Q, { tab: a("serviceAccount.tabs.basic", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(K, { bordered: !0, column: 2, children: [
            /* @__PURE__ */ e.jsx(K.Item, { label: a("serviceAccount.name", { defaultValue: "Name" }), span: 2, children: o.name }),
            /* @__PURE__ */ e.jsx(K.Item, { label: a("serviceAccount.description", { defaultValue: "Description" }), span: 2, children: o.description || a("serviceAccount.noDescription", { defaultValue: "N/A" }) }),
            /* @__PURE__ */ e.jsx(K.Item, { label: a("serviceAccount.status", { defaultValue: "Status" }), children: o.status === "active" ? /* @__PURE__ */ e.jsx(R, { status: "success", text: a("serviceAccount.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(R, { status: "error", text: a("serviceAccount.statusDisabled", { defaultValue: "Disabled" }) }) }),
            /* @__PURE__ */ e.jsx(K.Item, { label: a("serviceAccount.lastAccess", { defaultValue: "Last Access" }), children: o.last_access ? P(o.last_access) : a("serviceAccount.neverAccessed", { defaultValue: "Never" }) }),
            /* @__PURE__ */ e.jsx(K.Item, { label: a("serviceAccount.createdAt", { defaultValue: "Created At" }), children: P(o.created_at) }),
            /* @__PURE__ */ e.jsx(K.Item, { label: a("serviceAccount.updatedAt", { defaultValue: "Updated At" }), children: P(o.updated_at) })
          ] }) }, "basic"),
          /* @__PURE__ */ e.jsx(
            Q,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(ae, {}),
                a("serviceAccount.accessKeys", { defaultValue: "Access Keys" })
              ] }),
              disabled: !m("authorization:service_account:access_key:list"),
              children: /* @__PURE__ */ e.jsx(Be, { serviceAccountID: p })
            },
            "access-keys"
          ),
          /* @__PURE__ */ e.jsx(
            Q,
            {
              tab: /* @__PURE__ */ e.jsxs("span", { children: [
                /* @__PURE__ */ e.jsx(Y, {}),
                a("serviceAccount.authorization", { defaultValue: "Authorization" })
              ] }),
              disabled: !m("authorization:service_account:role:list"),
              children: /* @__PURE__ */ e.jsx(
                Oe,
                {
                  serviceAccount: o,
                  onRefresh: h
                }
              )
            },
            "authorization"
          ),
          /* @__PURE__ */ e.jsxs(Q, { tab: a("serviceAccount.tabs.policy", { defaultValue: "Policy Document" }), children: [
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(ce, { justify: "end", children: /* @__PURE__ */ e.jsx(W, { children: /* @__PURE__ */ e.jsx(I, { permission: "authorization:service_account:update", children: /* @__PURE__ */ e.jsx(
              r,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(X, {}),
                onClick: () => {
                  w(!0), S.setFieldsValue({
                    policy_document: JSON.stringify(o.policy_document, null, 2)
                  });
                },
                children: a("serviceAccount.editPolicy", { defaultValue: "Edit Policy" })
              }
            ) }) }) }) }),
            /* @__PURE__ */ e.jsx(re, { spinning: C, children: o.policy_document && o.policy_document.Statement && o.policy_document.Statement.length > 0 ? /* @__PURE__ */ e.jsx(M, { children: /* @__PURE__ */ e.jsx("pre", { style: { whiteSpace: "pre-wrap", overflowX: "auto" }, children: JSON.stringify(o.policy_document, null, 2) }) }) : /* @__PURE__ */ e.jsx(ee, { description: a("serviceAccount.noPolicy", { defaultValue: "No policy document defined for this service account." }) }) })
          ] }, "policy")
        ] }),
        /* @__PURE__ */ e.jsx(
          Z,
          {
            title: a("serviceAccount.editPolicy", { defaultValue: "Edit Policy" }),
            open: g,
            onCancel: () => {
              w(!1), S.resetFields();
            },
            footer: null,
            width: 700,
            children: /* @__PURE__ */ e.jsxs(x, { form: S, layout: "vertical", onFinish: O, children: [
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "policy_document",
                  extra: /* @__PURE__ */ e.jsx("span", { className: s.rolePolicyExtra, children: /* @__PURE__ */ e.jsx(
                    xe,
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
                        const E = qe[A];
                        E && S.setFieldValue("policy_document", JSON.stringify(E, null, 2));
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
              /* @__PURE__ */ e.jsx(x.Item, { children: /* @__PURE__ */ e.jsxs(_, { children: [
                /* @__PURE__ */ e.jsx(r, { type: "primary", htmlType: "submit", children: u("save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(r, { onClick: () => w(!1), children: u("cancel", { defaultValue: "Cancel" }) })
              ] }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          je,
          {
            serviceAccountID: p,
            onClose: () => i(!1),
            open: b
          }
        )
      ]
    }
  ) : /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px 0" }, children: /* @__PURE__ */ e.jsx(ee, { description: a("serviceAccount.notFound", { defaultValue: "Service account not found." }) }) });
}, ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ge
}, Symbol.toStringTag, { value: "Module" }));
export {
  st as S,
  ct as a
};
