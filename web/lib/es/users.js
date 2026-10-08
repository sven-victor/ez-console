import { j as e } from "./vendor.js";
import { useState as F, useEffect as te, useCallback as Z, useMemo as be } from "react";
import { App as G, Form as g, Spin as B, Typography as X, Tag as z, Tooltip as ke, Badge as y, Card as D, Row as ae, Col as $, Space as M, Input as R, Select as O, Button as U, Table as ve, Modal as Ee, Tabs as re, Descriptions as A, Switch as _e } from "antd";
import { UserOutlined as le, EyeOutlined as Ae, EditOutlined as ne, UnlockOutlined as Ue, SafetyOutlined as ze, MailOutlined as Se, KeyOutlined as Pe, ToolOutlined as Fe, UndoOutlined as Ce, DeleteOutlined as Le, ReloadOutlined as Te, ExportOutlined as Re, UserAddOutlined as Oe, ArrowLeftOutlined as Ie } from "@ant-design/icons";
import { useNavigate as ee, Link as De, useParams as ue } from "react-router-dom";
import { A as ie, b as Me, g as se, U as Ne, o as oe, e as $e } from "./components.js";
import { a as h } from "./index.js";
import { P as H, f as q } from "./base.js";
import { useTranslation as C } from "react-i18next";
import { useRequest as x } from "ahooks";
import { d as qe, b as K, a as Be } from "./contexts.js";
import { A as Ke } from "./client.js";
const { Option: T } = O, Ge = ({ user: n, onClose: c, onSuccess: j }) => {
  const { message: t } = G.useApp(), { t: f } = C("authorization"), [a, o] = F(null), [V, w] = F(null), { run: k, loading: i } = x(h.authorization.updateUser, {
    onSuccess: () => {
      t.success(f("user.updateUserSuccess", { defaultValue: "User updated successfully" })), j();
    },
    onError: (u) => {
      t.error(f("user.updateUserError", { defaultValue: "Failed to update user", error: u.message }));
    },
    manual: !0
  }), { data: v, loading: S } = x(async () => a === "bind" ? h.authorization.getLdapUsers({ skip_existing: !0 }).then((u) => {
    const b = [], p = [];
    for (const m of u)
      m.username === (n == null ? void 0 : n.username) || m.email === (n == null ? void 0 : n.email) || m.full_name === (n == null ? void 0 : n.full_name) ? b.push({ recommend: !0, ...m }) : p.push({ recommend: !1, ...m });
    return [...b, ...p];
  }) : Promise.resolve([]), {
    refreshDeps: [n == null ? void 0 : n.id, a]
  });
  return te(() => {
    n && (o(null), w(null));
  }, [n]), /* @__PURE__ */ e.jsx(
    Ee,
    {
      open: n !== null,
      onCancel: c,
      onOk: () => {
        if (n) {
          if (a === "local")
            return k({ id: n.id }, { source: "local" });
          if (a === "bind") {
            if (!V) {
              t.error(f("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return k({ id: n.id }, { source: "ldap", ldap_dn: V });
          } else {
            t.error(f("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        t.error(f("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: f("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs(M, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(U, { loading: i, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: a === "local" ? "primary" : "default", onClick: () => o("local"), children: f("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(U, { loading: i, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: a === "bind" ? "primary" : "default", onClick: () => o("bind"), children: f("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          O,
          {
            loading: S,
            style: { display: a === "bind" ? "block" : "none" },
            onSelect: (u) => w(u),
            options: v == null ? void 0 : v.map((u) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(z, { color: u.recommend ? "blue" : "default", children: u.full_name }),
              " ",
              u.username,
              " - ",
              u.email,
              " - ",
              u.ldap_dn
            ] }), value: u.ldap_dn })),
            showSearch: !0
          }
        )
      ] })
    }
  );
}, Je = () => {
  const { message: n, modal: c } = G.useApp(), { registerPageAI: j } = qe(), { addTask: t } = K(), f = ee(), { t: a } = C("authorization"), { t: o } = C("common"), [V] = g.useForm(), [w, k] = F([]), [i, v] = F(0), { enableMultiOrg: S } = K(), [u, b] = F(null), [p, m] = F({
    current: H.DEFAULT_CURRENT,
    page_size: H.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  });
  te(() => {
    w && (j == null || j({
      pageData: () => w,
      pageDataDescription: "Returns the current user list as a JSON object."
    }));
  }, [j, w]);
  const { data: L, loading: N } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [S],
    onError: (s) => {
      n.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: s.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), J = Z((s, r) => {
    if (N)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(B, { size: "small" }),
        ":",
        r.name
      ] });
    const _ = L == null ? void 0 : L.find((we) => we.id === s);
    return _ ? `${_.name}:${r.name}` : r.name;
  }, [L, N]), { run: P, loading: Q } = x(() => {
    const s = {
      status: p.status,
      keywords: p.keywords
    };
    return h.authorization.listUsers({
      current: p.current,
      page_size: p.page_size,
      ...s
    });
  }, {
    onSuccess: (s) => {
      k(s.data || []), v(s.total || 0);
    },
    onError: (s) => {
      n.error(a("user.loadError", { defaultValue: "Failed to load users", error: s.message }));
    },
    refreshDeps: [p]
  }), l = (s) => {
    m({
      ...p,
      current: H.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: s.keywords,
      status: s.status
    });
  }, d = (s, r) => {
    m((_) => ({
      ..._,
      current: s,
      page_size: r
    }));
  }, { run: E } = x(h.authorization.restoreUser, {
    onSuccess: () => {
      n.success(a("user.restoreSuccess", { defaultValue: "User restored successfully" })), P();
    },
    onError: (s) => {
      n.error(a("user.restoreError", { defaultValue: "Failed to restore user", error: s.message }));
    },
    manual: !0
  }), { run: W } = x(h.authorization.deleteUser, {
    onSuccess: () => {
      n.success(a("user.deleteSuccess", { defaultValue: "User deleted successfully" })), P();
    },
    onError: (s) => {
      n.error(a("user.deleteError", { defaultValue: "Failed to delete user", error: s.message }));
    },
    manual: !0
  }), { runAsync: de } = x(
    (s) => h.authorization.resetUserPassword({ id: s.id }, { password: "" }),
    {
      manual: !0,
      onSuccess: (s, r) => {
        const _ = r[0];
        n.success(a("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), s.new_password ? c.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: /* @__PURE__ */ e.jsx(X.Text, { copyable: { text: s.new_password }, children: a("user.resetPasswordSuccessContent", {
            defaultValue: `New password: ${s.new_password}`,
            password: s.new_password
          }) })
        }) : c.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: a("user.resetPasswordSuccessSendByEmail", {
            defaultValue: "The new password has been sent to the user email: {{email}}",
            email: _.email
          })
        });
      },
      onError: () => {
        n.error(a("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
      }
    }
  ), ce = (s, r, _) => {
    c.confirm({
      title: a("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: a("user.resetPasswordConfirm", {
        defaultValue: `Are you sure you want to reset the password for ${r}?`,
        username: r
      }),
      okText: o("confirm", { defaultValue: "Confirm" }),
      cancelText: o("cancel", { defaultValue: "Cancel" }),
      onOk: () => de({ id: s, email: _ })
    });
  }, { run: me, loading: fe } = x(
    () => h.authorization.createUserExportTask({
      keywords: p.keywords,
      status: p.status
    }),
    {
      onSuccess: (s) => {
        s.id ? n.success(
          a("user.exportTaskCreated", {
            defaultValue: "Export task created. You can view progress and download the file from the task list."
          })
        ) : n.success(a("user.exportTaskCreatedShort", { defaultValue: "Export task created." })), t(s);
      },
      onError: (s) => {
        n.error(
          a("user.exportError", {
            defaultValue: "Failed to create export task",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      },
      manual: !0
    }
  ), { runAsync: pe } = x(
    (s) => h.authorization.unlockUser({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        n.success(a("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), P();
      },
      onError: (s) => {
        n.error(
          a("user.unlockError", {
            defaultValue: "Failed to unlock user: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), he = (s) => {
    c.confirm({
      title: a("user.unlockTitle", { defaultValue: "Unlock User" }),
      content: a("user.unlockConfirm", {
        defaultValue: "Are you sure you want to unlock this user?",
        username: s.username
      }),
      onOk: () => pe(s.id)
    });
  }, { runAsync: xe } = x(
    (s) => h.authorization.adminDisableUserMfa({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        n.success(a("user.adminDisableMFASuccess", { defaultValue: "MFA disabled successfully" })), P();
      },
      onError: (s) => {
        n.error(
          a("user.adminDisableMFAError", {
            defaultValue: "Failed to disable MFA: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), ge = (s) => {
    c.confirm({
      title: a("user.adminDisableMFATitle", { defaultValue: "Disable MFA" }),
      content: a("user.adminDisableMFAConfirm", {
        defaultValue: "Are you sure you want to disable MFA for this user? They will be logged out of all sessions.",
        username: s.username
      }),
      okType: "danger",
      onOk: () => xe(s.id)
    });
  }, { runAsync: je } = x(
    (s) => h.authorization.resendActivationEmail({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        n.success(a("user.resendActivationSuccess", { defaultValue: "Activation email resent successfully" }));
      },
      onError: (s) => {
        n.error(
          a("user.resendActivationError", {
            defaultValue: "Failed to resend activation email: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), Ve = (s) => {
    c.confirm({
      title: a("user.resendActivationTitle", { defaultValue: "Resend Activation Email" }),
      content: a("user.resendActivationConfirm", {
        defaultValue: "Resend activation email to {{email}}?",
        email: s.email
      }),
      onOk: () => je(s.id)
    });
  }, ye = [
    {
      title: a("user.username", { defaultValue: "Username" }),
      key: "user",
      render: (s, r) => /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          ie,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(le, {}),
            src: r.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(De, { to: `/authorization/users/${r.id}`, children: r.username })
      ] })
    },
    {
      title: a("user.fullName", { defaultValue: "Full Name" }),
      dataIndex: "full_name",
      key: "full_name"
    },
    {
      title: a("user.email", { defaultValue: "Email" }),
      dataIndex: "email",
      key: "email"
    },
    {
      title: a("user.source", { defaultValue: "Source" }),
      dataIndex: "source",
      key: "source",
      render: (s, r) => {
        switch (s) {
          case "ldap":
            return r.ldap_dn ? /* @__PURE__ */ e.jsx(z, { color: "blue", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(ke, { title: a("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(z, { color: "red", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) });
          case "oauth2":
            return /* @__PURE__ */ e.jsx(z, { color: "green", children: a("user.sourceOauth2", { defaultValue: "OAuth2" }) });
          default:
            return /* @__PURE__ */ e.jsx(z, { color: "default", children: a("user.sourceLocal", { defaultValue: "Local" }) });
        }
      }
    },
    {
      title: a("user.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (s) => {
        switch (s) {
          case "disabled":
            return /* @__PURE__ */ e.jsx(y, { status: "default", text: a("user.statusEnum.disabled", { defaultValue: "Disabled" }) });
          case "password_expired":
            return /* @__PURE__ */ e.jsx(y, { status: "warning", text: a("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) });
          case "active":
            return /* @__PURE__ */ e.jsx(y, { status: "success", text: a("user.statusEnum.active", { defaultValue: "Active" }) });
          case "locked":
            return /* @__PURE__ */ e.jsx(y, { status: "warning", text: a("user.statusEnum.locked", { defaultValue: "Locked" }) });
          case "deleted":
            return /* @__PURE__ */ e.jsx(y, { status: "error", text: a("user.statusEnum.deleted", { defaultValue: "Deleted" }) });
          case "pending_activation":
            return /* @__PURE__ */ e.jsx(y, { status: "processing", text: a("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) });
          default:
            return /* @__PURE__ */ e.jsx(y, { status: "default", text: a(`user.statusEnum.${s}`, { defaultValue: s.charAt(0).toUpperCase() + s.slice(1) }) });
        }
      }
    },
    {
      title: a("user.roles", { defaultValue: "Roles" }),
      dataIndex: "roles",
      key: "roles",
      render: (s) => /* @__PURE__ */ e.jsx("span", { children: s && s.length > 0 ? s.map((r) => /* @__PURE__ */ e.jsx(z, { color: "blue", children: r.organization_id ? J(r.organization_id, r) : r.name }, r.id)) : /* @__PURE__ */ e.jsx(z, { children: a("user.noRole", { defaultValue: "No Role" }) }) })
    },
    {
      title: a("user.mfa", { defaultValue: "MFA" }),
      dataIndex: "mfa_enabled",
      key: "mfa_enabled",
      render: (s) => s ? /* @__PURE__ */ e.jsx(y, { status: "success", text: a("user.mfaEnabled", { defaultValue: "Enabled" }) }) : /* @__PURE__ */ e.jsx(y, { status: "default", text: a("user.mfaDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("user.lastLogin", { defaultValue: "Last Login" }),
      dataIndex: "last_login",
      key: "last_login",
      render: (s) => s ? q(s) : a("user.neverLogin", { defaultValue: "Never" })
    },
    {
      title: o("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 160,
      render: (s, r) => {
        const _ = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(Ae, {}),
          tooltip: a("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: async () => f(`/authorization/users/${r.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ne, {}),
          tooltip: a("user.edit", { defaultValue: "Edit" }),
          hidden: r.status === "locked" || r.status === "deleted",
          onClick: async () => f(`/authorization/users/${r.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ue, {}),
          tooltip: a("user.unlock", { defaultValue: "Unlock" }),
          hidden: r.status !== "locked",
          onClick: async () => he(r)
        }, {
          key: "disableMFA",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ze, {}),
          tooltip: a("user.adminDisableMFA", { defaultValue: "Disable MFA" }),
          hidden: !r.mfa_enabled || r.status === "deleted",
          danger: !0,
          onClick: async () => ge(r)
        }, {
          key: "resendActivation",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Se, {}),
          tooltip: a("user.resendActivation", { defaultValue: "Resend Activation Email" }),
          hidden: r.status !== "pending_activation" || !r.email,
          onClick: async () => Ve(r)
        }, {
          key: "resetPassword",
          permission: "authorization:user:reset_password",
          icon: /* @__PURE__ */ e.jsx(Pe, {}),
          disabled: r.disable_change_password,
          tooltip: r.disable_change_password ? a("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : a("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((r.source === "local" || r.source === "ldap" && r.ldap_dn) && r.status !== "deleted" && r.status !== "pending_activation"),
          onClick: async () => ce(r.id, r.username, r.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Fe, {}),
          tooltip: a("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(r.source === "ldap" && !r.ldap_dn && r.status !== "deleted"),
          onClick: async () => b(r)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ce, {}),
          tooltip: a("user.restore", { defaultValue: "Restore" }),
          hidden: r.status !== "deleted",
          confirm: {
            title: a("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => E({ id: r.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(Le, {}),
          tooltip: a("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: a("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => W({ id: r.id }),
            okText: o("confirm", { defaultValue: "Confirm" }),
            cancelText: o("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(Me, { actions: _ }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(D, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      g,
      {
        form: V,
        layout: "vertical",
        onFinish: l,
        name: "userSearchForm",
        children: /* @__PURE__ */ e.jsxs(ae, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx($, { children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(g.Item, { name: "keywords", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              R.Search,
              {
                placeholder: a("user.keywords", { defaultValue: "Search by username, full name, or email" }),
                allowClear: !0,
                onSearch: () => {
                  l(V.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            /* @__PURE__ */ e.jsx(g.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(
              O,
              {
                placeholder: a("user.status", { defaultValue: "Status" }),
                allowClear: !0,
                onChange: () => {
                  l(V.getFieldsValue());
                },
                style: { width: 220 },
                children: [
                  /* @__PURE__ */ e.jsx(T, { value: "active", children: a("user.statusEnum.active", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(T, { value: "disabled", children: a("user.statusEnum.disabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(T, { value: "deleted", children: a("user.statusEnum.deleted", { defaultValue: "Deleted" }) }),
                  /* @__PURE__ */ e.jsx(T, { value: "locked", children: a("user.statusEnum.locked", { defaultValue: "Locked" }) }),
                  /* @__PURE__ */ e.jsx(T, { value: "password_expired", children: a("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) }),
                  /* @__PURE__ */ e.jsx(T, { value: "pending_activation", children: a("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) })
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx($, { children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(U, { icon: /* @__PURE__ */ e.jsx(Te, {}), onClick: P, children: o("refresh", { defaultValue: "Refresh" }) }),
            /* @__PURE__ */ e.jsx(se, { permission: "authorization:user:export", children: /* @__PURE__ */ e.jsx(
              U,
              {
                icon: /* @__PURE__ */ e.jsx(Re, {}),
                loading: fe,
                onClick: () => me(),
                children: a("user.export", { defaultValue: "Export" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(se, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
              U,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Oe, {}),
                onClick: () => f("/authorization/users/create"),
                children: a("user.create", { defaultValue: "Create User" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(D, { children: [
      /* @__PURE__ */ e.jsxs(ae, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx($, {}),
        /* @__PURE__ */ e.jsx($, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        ve,
        {
          columns: ye,
          dataSource: w,
          rowKey: "id",
          loading: Q,
          pagination: {
            current: p.current,
            pageSize: p.page_size,
            total: i,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (s) => o("totalItems", { defaultValue: `Total ${s} items`, total: s }),
            onChange: d
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(Ge, { user: u, onClose: () => b(null), onSuccess: () => {
      b(null), P();
    } })
  ] });
}, oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Je
}, Symbol.toStringTag, { value: "Module" })), { Title: Qe } = X, { TabPane: Y } = re, We = () => {
  const { message: n } = G.useApp(), { id: c } = ue(), j = ee(), { t } = C("authorization"), { t: f } = C("common"), { hasPermission: a } = Be(), { enableMultiOrg: o } = K(), { data: V, loading: w } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [o],
    onError: (u) => {
      n.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: u.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), k = Z((u, b) => {
    if (w)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(B, { size: "small" }),
        ":",
        b.name
      ] });
    const p = V == null ? void 0 : V.find((m) => m.id === u);
    return p ? `${p.name}:${b.name}` : b.name;
  }, [V, w]), { data: i, loading: v } = x(() => h.authorization.getUser({ id: c }), {
    ready: !!c,
    refreshDeps: [c],
    onError: (u) => {
      u instanceof Ke && u.code === "E4041" || (console.error("Failed to get user details:", u), n.error(t("user.detailLoadError", { defaultValue: "Failed to load user details" })));
    }
  });
  if (v)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(B, { size: "large" }) });
  if (!i)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(Qe, { level: 4, children: t("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(U, { type: "primary", onClick: () => j("/authorization/users"), children: t("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const S = () => i.mfa_enabled ? /* @__PURE__ */ e.jsx(y, { status: "success", text: t("user.mfaEnabled", { defaultValue: "Enabled" }) }) : i.mfa_enforced ? /* @__PURE__ */ e.jsx(y, { status: "warning", text: t("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(y, { status: "default", text: t("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    D,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          ie,
          {
            size: 48,
            icon: /* @__PURE__ */ e.jsx(le, {}),
            src: i.avatar,
            style: { marginRight: 16 }
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 20, fontWeight: "bold" }, children: i.username }),
          /* @__PURE__ */ e.jsx("div", { style: { color: "#888" }, children: i.email })
        ] })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(M, { children: [
        /* @__PURE__ */ e.jsx(
          U,
          {
            icon: /* @__PURE__ */ e.jsx(Ie, {}),
            onClick: () => j("/authorization/users"),
            children: f("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          U,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ne, {}),
            onClick: () => j(`/authorization/users/${c}/edit`),
            children: f("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(re, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(Y, { tab: t("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(A, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.username", { defaultValue: "Username" }), children: i.username }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.fullName", { defaultValue: "Full Name" }), children: i.full_name }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.email", { defaultValue: "Email" }), children: i.email }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.status", { defaultValue: "Status" }), children: i.status === "active" ? /* @__PURE__ */ e.jsx(y, { status: "success", text: t("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(y, { status: "error", text: t(`user.statusEnum.${i.status}`, { defaultValue: i.status.charAt(0).toUpperCase() + i.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.roles", { defaultValue: "Roles" }), span: 2, children: i.roles && i.roles.length > 0 ? i.roles.map((u) => /* @__PURE__ */ e.jsx(z, { color: "blue", children: o ? k(u.organization_id, u) : u.name }, u.id)) : /* @__PURE__ */ e.jsx(z, { children: t("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.mfa", { defaultValue: "MFA" }), children: S() }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.lastLogin", { defaultValue: "Last Login" }), children: i.last_login ? q(i.last_login) : t("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.createdAt", { defaultValue: "Created At" }), children: q(i.created_at) }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.updatedAt", { defaultValue: "Updated At" }), children: q(i.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(Y, { tab: t("user.auditLogs", { defaultValue: "Audit Logs" }), disabled: !a("authorization:user:view_audit_logs"), children: /* @__PURE__ */ e.jsx(Ne, { userId: c || "" }) }, "logs"),
        /* @__PURE__ */ e.jsx(Y, { tab: t("rateLimit.title", { defaultValue: "Rate Limit" }), children: /* @__PURE__ */ e.jsx(oe, { kind: "user", subjectId: c || "", readOnly: !a("authorization:user:update") }) }, "rate-limit")
      ] })
    }
  );
}, da = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: We
}, Symbol.toStringTag, { value: "Module" })), { Option: I } = O, He = () => {
  const { message: n } = G.useApp(), { id: c = "" } = ue(), j = ee(), { t } = C("authorization"), { t: f } = C("common"), [a] = g.useForm(), o = !!c, [V, w] = F(""), { enableMultiOrg: k } = K(), { data: i, loading: v } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [k],
    onError: (l) => {
      n.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: l.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), S = Z((l, d) => {
    if (v)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(B, { size: "small" }),
        ":",
        d.name
      ] });
    const E = i == null ? void 0 : i.find((W) => W.id === l);
    return E ? `${E.name}:${d.name}` : d.name;
  }, [i, v]), { data: u, loading: b } = x(async () => (await h.authorization.listRoles({ search: V || void 0 })).data.map((d) => ({
    ...d,
    label: d.name,
    value: d.id
  })), {
    refreshDeps: [V]
  }), { loading: p, data: m } = x(
    async () => h.authorization.getUser({ id: c }),
    {
      ready: o && !!c,
      refreshDeps: [c, o],
      onSuccess: (l) => {
        a.setFieldsValue({
          username: l.username,
          email: l.email,
          avatar: l.avatar,
          full_name: l.full_name,
          status: l.status,
          role_ids: l.roles ? l.roles.map((d) => d.id) : [],
          mfa_enforced: l.mfa_enforced
        });
      },
      onError: () => {
        n.error(t("user.loadError", { defaultValue: "Failed to load user data" }));
      }
    }
  ), L = be(() => [...(m == null ? void 0 : m.roles.filter((d) => !(u != null && u.some((E) => E.id === d.id)))) || [], ...u || []].map((d) => ({
    ...d,
    label: k ? S(d.organization_id, d) : d.name || "",
    value: d.id
  })), [u, k, S, m == null ? void 0 : m.roles]), { run: N, loading: J } = x(
    async (l) => {
      if (o)
        return await h.authorization.updateUser(
          { id: c },
          {
            email: l.email,
            avatar: l.avatar,
            full_name: l.full_name,
            status: l.status,
            mfa_enforced: l.mfa_enforced,
            role_ids: l.role_ids
          }
        ), { mode: "update" };
      const d = {
        username: l.username,
        avatar: l.avatar,
        password: l.password,
        email: l.email,
        full_name: l.full_name,
        mfa_enforced: l.mfa_enforced,
        role_ids: l.role_ids
      };
      return { mode: "create", newUser: await h.authorization.createUser(d) };
    },
    {
      manual: !0,
      onSuccess: (l) => {
        l && (l.mode === "update" ? (n.success(t("user.updateSuccess", { defaultValue: "User updated successfully" })), j(`/authorization/users/${c}`)) : (n.success(t("user.createSuccess", { defaultValue: "User created successfully" })), j(`/authorization/users/${l.newUser.id}`)));
      },
      onError: (l) => {
        n.error(
          o ? t("user.updateError", {
            defaultValue: "Failed to update user",
            error: l instanceof Error ? l.message : String(l)
          }) : t("user.createError", {
            defaultValue: "Failed to create user",
            error: l instanceof Error ? l.message : String(l)
          })
        );
      }
    }
  ), P = (l, d) => o || !d ? Promise.resolve() : d.length < 8 ? Promise.reject(new Error(t("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve(), Q = (l, d) => {
    if (o) return Promise.resolve();
    const E = a.getFieldValue("password");
    return E ? d ? d !== E ? Promise.reject(new Error(t("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(t("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" }))) : Promise.resolve();
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      D,
      {
        title: o ? t("user.editTitle", { defaultValue: "Edit User" }) : t("user.createTitle", { defaultValue: "Create User" }),
        loading: p,
        children: /* @__PURE__ */ e.jsxs(
          g,
          {
            form: a,
            layout: "horizontal",
            onFinish: N,
            labelCol: {
              sm: { span: 24 },
              md: { span: 6 }
            },
            wrapperCol: {
              sm: { span: 24 },
              md: { span: 18 }
            },
            size: "middle",
            style: { maxWidth: "500px", margin: "0 auto" },
            initialValues: {
              status: "active",
              role_ids: []
            },
            children: [
              /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "avatar",
                  label: t("user.avatar", { defaultValue: "Avatar" }),
                  children: /* @__PURE__ */ e.jsx($e, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "username",
                  label: t("user.username", { defaultValue: "Username" }),
                  rules: [
                    { required: !o, message: t("user.usernameRequired", { defaultValue: "Username is required" }) }
                  ],
                  children: /* @__PURE__ */ e.jsx(R, { disabled: o, placeholder: t("user.usernamePlaceholder", { defaultValue: "Enter username" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "email",
                  label: t("user.email", { defaultValue: "Email" }),
                  rules: [
                    { required: !0, message: t("user.emailRequired", { defaultValue: "Email is required" }) },
                    { type: "email", message: t("user.emailInvalid", { defaultValue: "Invalid email format" }) }
                  ],
                  children: /* @__PURE__ */ e.jsx(R, { placeholder: t("user.emailPlaceholder", { defaultValue: "Enter email address" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "full_name",
                  label: t("user.fullName", { defaultValue: "Full Name" }),
                  rules: [{ required: !0, message: t("user.fullNameRequired", { defaultValue: "Full name is required" }) }],
                  children: /* @__PURE__ */ e.jsx(R, { placeholder: t("user.fullNamePlaceholder", { defaultValue: "Enter full name" }) })
                }
              ),
              o && /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "status",
                  label: t("user.status", { defaultValue: "Status" }),
                  rules: [{ required: !0, message: t("user.statusRequired", { defaultValue: "Status is required" }) }],
                  children: /* @__PURE__ */ e.jsxs(O, { placeholder: t("user.statusPlaceholder", { defaultValue: "Select status" }), children: [
                    /* @__PURE__ */ e.jsx(I, { value: "active", children: t("user.statusActive", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(I, { value: "disabled", children: t("user.statusDisabled", { defaultValue: "Disabled" }) }),
                    /* @__PURE__ */ e.jsx(I, { value: "password_expired", children: t("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) }),
                    (m == null ? void 0 : m.status) === "pending_activation" && /* @__PURE__ */ e.jsx(I, { value: "pending_activation", children: t("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) }),
                    (m == null ? void 0 : m.status) === "locked" && /* @__PURE__ */ e.jsx(I, { value: "locked", children: t("user.statusEnum.locked", { defaultValue: "Locked" }) })
                  ] })
                }
              ),
              /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "mfa_enforced",
                  label: t("user.mfaEnforced", { defaultValue: "MFA Enforced" }),
                  children: /* @__PURE__ */ e.jsx(_e, {})
                }
              ),
              !o && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(
                  g.Item,
                  {
                    name: "password",
                    label: t("user.password", { defaultValue: "Password" }),
                    rules: [{ validator: P }],
                    extra: /* @__PURE__ */ e.jsx(X.Text, { type: "secondary", style: { fontSize: 12 }, children: t("user.passwordHint", { defaultValue: "Leave blank to send an activation email to the user." }) }),
                    children: /* @__PURE__ */ e.jsx(R.Password, { autoComplete: "new-password", placeholder: t("user.passwordPlaceholder", { defaultValue: "Enter password (optional)" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  g.Item,
                  {
                    name: "confirm_password",
                    label: t("user.confirmPassword", { defaultValue: "Confirm Password" }),
                    rules: [{ validator: Q }],
                    dependencies: ["password"],
                    children: /* @__PURE__ */ e.jsx(R.Password, { autoComplete: "new-password", placeholder: t("user.confirmPasswordPlaceholder", { defaultValue: "Confirm password" }) })
                  }
                )
              ] }),
              /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "role_ids",
                  label: t("user.roles", { defaultValue: "Roles" }),
                  children: /* @__PURE__ */ e.jsx(
                    O,
                    {
                      mode: "multiple",
                      onSearch: (l) => w(l),
                      placeholder: t("user.selectRoles", { defaultValue: "Select roles" }),
                      options: L,
                      optionFilterProp: "label",
                      loading: b
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(g.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs(M, { children: [
                /* @__PURE__ */ e.jsx(
                  U,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: J,
                    children: o ? f("update", { defaultValue: "Update" }) : f("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  U,
                  {
                    onClick: () => j(o ? `/authorization/users/${c}` : "/authorization/users"),
                    children: f("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    ),
    o && c && /* @__PURE__ */ e.jsx(D, { title: t("rateLimit.title", { defaultValue: "Rate limit override" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(oe, { kind: "user", subjectId: c }) })
  ] });
}, ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: He
}, Symbol.toStringTag, { value: "Module" }));
export {
  oa as U,
  da as a,
  ca as b
};
