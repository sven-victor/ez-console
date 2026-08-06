import { j as e } from "./vendor.js";
import { useState as F, useEffect as te, useCallback as Y, useMemo as we } from "react";
import { App as G, Form as g, Spin as q, Typography as Z, Tag as z, Tooltip as be, Badge as y, Card as B, Row as ee, Col as N, Space as D, Input as R, Select as O, Button as U, Table as Ee, Modal as _e, Tabs as re, Descriptions as A, Switch as ke } from "antd";
import { UserOutlined as le, EyeOutlined as ve, EditOutlined as ne, UnlockOutlined as Ae, SafetyOutlined as Ue, MailOutlined as ze, KeyOutlined as Se, ToolOutlined as Pe, UndoOutlined as Fe, DeleteOutlined as Ce, ReloadOutlined as Te, ExportOutlined as Le, UserAddOutlined as Re, ArrowLeftOutlined as Oe } from "@ant-design/icons";
import { useNavigate as X, Link as Ie, useParams as ue } from "react-router-dom";
import { A as ie, b as De, g as ae, U as Me, e as Ne } from "./components.js";
import { a as h } from "./index.js";
import { P as H, f as $ } from "./base.js";
import { useTranslation as C } from "react-i18next";
import { useRequest as x } from "ahooks";
import { d as $e, b as K, a as qe } from "./contexts.js";
import { A as Be } from "./client.js";
const { Option: L } = O, Ke = ({ user: n, onClose: m, onSuccess: V }) => {
  const { message: t } = G.useApp(), { t: f } = C("authorization"), [a, o] = F(null), [j, w] = F(null), { run: E, loading: i } = x(h.authorization.updateUser, {
    onSuccess: () => {
      t.success(f("user.updateUserSuccess", { defaultValue: "User updated successfully" })), V();
    },
    onError: (u) => {
      t.error(f("user.updateUserError", { defaultValue: "Failed to update user", error: u.message }));
    },
    manual: !0
  }), { data: _, loading: S } = x(async () => a === "bind" ? h.authorization.getLdapUsers({ skip_existing: !0 }).then((u) => {
    const b = [], p = [];
    for (const c of u)
      c.username === (n == null ? void 0 : n.username) || c.email === (n == null ? void 0 : n.email) || c.full_name === (n == null ? void 0 : n.full_name) ? b.push({ recommend: !0, ...c }) : p.push({ recommend: !1, ...c });
    return [...b, ...p];
  }) : Promise.resolve([]), {
    refreshDeps: [n == null ? void 0 : n.id, a]
  });
  return te(() => {
    n && (o(null), w(null));
  }, [n]), /* @__PURE__ */ e.jsx(
    _e,
    {
      open: n !== null,
      onCancel: m,
      onOk: () => {
        if (n) {
          if (a === "local")
            return E({ id: n.id }, { source: "local" });
          if (a === "bind") {
            if (!j) {
              t.error(f("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return E({ id: n.id }, { source: "ldap", ldap_dn: j });
          } else {
            t.error(f("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        t.error(f("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: f("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs(D, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(U, { loading: i, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: a === "local" ? "primary" : "default", onClick: () => o("local"), children: f("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(U, { loading: i, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: a === "bind" ? "primary" : "default", onClick: () => o("bind"), children: f("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          O,
          {
            loading: S,
            style: { display: a === "bind" ? "block" : "none" },
            onSelect: (u) => w(u),
            options: _ == null ? void 0 : _.map((u) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
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
}, Ge = () => {
  const { message: n, modal: m } = G.useApp(), { registerPageAI: V } = $e(), { addTask: t } = K(), f = X(), { t: a } = C("authorization"), { t: o } = C("common"), [j] = g.useForm(), [w, E] = F([]), [i, _] = F(0), { enableMultiOrg: S } = K(), [u, b] = F(null), [p, c] = F({
    current: H.DEFAULT_CURRENT,
    page_size: H.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  });
  te(() => {
    w && (V == null || V({
      pageData: () => w,
      pageDataDescription: "Returns the current user list as a JSON object."
    }));
  }, [V, w]);
  const { data: T, loading: M } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [S],
    onError: (s) => {
      n.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: s.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), J = Y((s, r) => {
    if (M)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(q, { size: "small" }),
        ":",
        r.name
      ] });
    const v = T == null ? void 0 : T.find((ye) => ye.id === s);
    return v ? `${v.name}:${r.name}` : r.name;
  }, [T, M]), { run: P, loading: Q } = x(() => {
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
      E(s.data || []), _(s.total || 0);
    },
    onError: (s) => {
      n.error(a("user.loadError", { defaultValue: "Failed to load users", error: s.message }));
    },
    refreshDeps: [p]
  }), l = (s) => {
    c({
      ...p,
      current: H.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: s.keywords,
      status: s.status
    });
  }, d = (s, r) => {
    c((v) => ({
      ...v,
      current: s,
      page_size: r
    }));
  }, { run: k } = x(h.authorization.restoreUser, {
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
  }), { runAsync: oe } = x(
    (s) => h.authorization.resetUserPassword({ id: s.id }, { password: "" }),
    {
      manual: !0,
      onSuccess: (s, r) => {
        const v = r[0];
        n.success(a("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), s.new_password ? m.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: /* @__PURE__ */ e.jsx(Z.Text, { copyable: { text: s.new_password }, children: a("user.resetPasswordSuccessContent", {
            defaultValue: `New password: ${s.new_password}`,
            password: s.new_password
          }) })
        }) : m.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: a("user.resetPasswordSuccessSendByEmail", {
            defaultValue: "The new password has been sent to the user email: {{email}}",
            email: v.email
          })
        });
      },
      onError: () => {
        n.error(a("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
      }
    }
  ), de = (s, r, v) => {
    m.confirm({
      title: a("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: a("user.resetPasswordConfirm", {
        defaultValue: `Are you sure you want to reset the password for ${r}?`,
        username: r
      }),
      okText: o("confirm", { defaultValue: "Confirm" }),
      cancelText: o("cancel", { defaultValue: "Cancel" }),
      onOk: () => oe({ id: s, email: v })
    });
  }, { run: ce, loading: me } = x(
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
  ), { runAsync: fe } = x(
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
  ), pe = (s) => {
    m.confirm({
      title: a("user.unlockTitle", { defaultValue: "Unlock User" }),
      content: a("user.unlockConfirm", {
        defaultValue: "Are you sure you want to unlock this user?",
        username: s.username
      }),
      onOk: () => fe(s.id)
    });
  }, { runAsync: he } = x(
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
  ), xe = (s) => {
    m.confirm({
      title: a("user.adminDisableMFATitle", { defaultValue: "Disable MFA" }),
      content: a("user.adminDisableMFAConfirm", {
        defaultValue: "Are you sure you want to disable MFA for this user? They will be logged out of all sessions.",
        username: s.username
      }),
      okType: "danger",
      onOk: () => he(s.id)
    });
  }, { runAsync: ge } = x(
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
    m.confirm({
      title: a("user.resendActivationTitle", { defaultValue: "Resend Activation Email" }),
      content: a("user.resendActivationConfirm", {
        defaultValue: "Resend activation email to {{email}}?",
        email: s.email
      }),
      onOk: () => ge(s.id)
    });
  }, je = [
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
        /* @__PURE__ */ e.jsx(Ie, { to: `/authorization/users/${r.id}`, children: r.username })
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
            return r.ldap_dn ? /* @__PURE__ */ e.jsx(z, { color: "blue", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(be, { title: a("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(z, { color: "red", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) });
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
      render: (s) => s ? $(s) : a("user.neverLogin", { defaultValue: "Never" })
    },
    {
      title: o("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 160,
      render: (s, r) => {
        const v = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(ve, {}),
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
          icon: /* @__PURE__ */ e.jsx(Ae, {}),
          tooltip: a("user.unlock", { defaultValue: "Unlock" }),
          hidden: r.status !== "locked",
          onClick: async () => pe(r)
        }, {
          key: "disableMFA",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ue, {}),
          tooltip: a("user.adminDisableMFA", { defaultValue: "Disable MFA" }),
          hidden: !r.mfa_enabled || r.status === "deleted",
          danger: !0,
          onClick: async () => xe(r)
        }, {
          key: "resendActivation",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ze, {}),
          tooltip: a("user.resendActivation", { defaultValue: "Resend Activation Email" }),
          hidden: r.status !== "pending_activation" || !r.email,
          onClick: async () => Ve(r)
        }, {
          key: "resetPassword",
          permission: "authorization:user:reset_password",
          icon: /* @__PURE__ */ e.jsx(Se, {}),
          disabled: r.disable_change_password,
          tooltip: r.disable_change_password ? a("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : a("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((r.source === "local" || r.source === "ldap" && r.ldap_dn) && r.status !== "deleted" && r.status !== "pending_activation"),
          onClick: async () => de(r.id, r.username, r.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Pe, {}),
          tooltip: a("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(r.source === "ldap" && !r.ldap_dn && r.status !== "deleted"),
          onClick: async () => b(r)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Fe, {}),
          tooltip: a("user.restore", { defaultValue: "Restore" }),
          hidden: r.status !== "deleted",
          confirm: {
            title: a("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => k({ id: r.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(Ce, {}),
          tooltip: a("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: a("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => W({ id: r.id }),
            okText: o("confirm", { defaultValue: "Confirm" }),
            cancelText: o("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(De, { actions: v }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(B, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      g,
      {
        form: j,
        layout: "vertical",
        onFinish: l,
        name: "userSearchForm",
        children: /* @__PURE__ */ e.jsxs(ee, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(N, { children: /* @__PURE__ */ e.jsxs(D, { children: [
            /* @__PURE__ */ e.jsx(g.Item, { name: "keywords", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              R.Search,
              {
                placeholder: a("user.keywords", { defaultValue: "Search by username, full name, or email" }),
                allowClear: !0,
                onSearch: () => {
                  l(j.getFieldsValue());
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
                  l(j.getFieldsValue());
                },
                style: { width: 220 },
                children: [
                  /* @__PURE__ */ e.jsx(L, { value: "active", children: a("user.statusEnum.active", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(L, { value: "disabled", children: a("user.statusEnum.disabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(L, { value: "deleted", children: a("user.statusEnum.deleted", { defaultValue: "Deleted" }) }),
                  /* @__PURE__ */ e.jsx(L, { value: "locked", children: a("user.statusEnum.locked", { defaultValue: "Locked" }) }),
                  /* @__PURE__ */ e.jsx(L, { value: "password_expired", children: a("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) }),
                  /* @__PURE__ */ e.jsx(L, { value: "pending_activation", children: a("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) })
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(N, { children: /* @__PURE__ */ e.jsxs(D, { children: [
            /* @__PURE__ */ e.jsx(U, { icon: /* @__PURE__ */ e.jsx(Te, {}), onClick: P, children: o("refresh", { defaultValue: "Refresh" }) }),
            /* @__PURE__ */ e.jsx(ae, { permission: "authorization:user:export", children: /* @__PURE__ */ e.jsx(
              U,
              {
                icon: /* @__PURE__ */ e.jsx(Le, {}),
                loading: me,
                onClick: () => ce(),
                children: a("user.export", { defaultValue: "Export" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ae, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
              U,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Re, {}),
                onClick: () => f("/authorization/users/create"),
                children: a("user.create", { defaultValue: "Create User" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(B, { children: [
      /* @__PURE__ */ e.jsxs(ee, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx(N, {}),
        /* @__PURE__ */ e.jsx(N, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Ee,
        {
          columns: je,
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
    /* @__PURE__ */ e.jsx(Ke, { user: u, onClose: () => b(null), onSuccess: () => {
      b(null), P();
    } })
  ] });
}, ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ge
}, Symbol.toStringTag, { value: "Module" })), { Title: Je } = Z, { TabPane: se } = re, Qe = () => {
  const { message: n } = G.useApp(), { id: m } = ue(), V = X(), { t } = C("authorization"), { t: f } = C("common"), { hasPermission: a } = qe(), { enableMultiOrg: o } = K(), { data: j, loading: w } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [o],
    onError: (u) => {
      n.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: u.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), E = Y((u, b) => {
    if (w)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(q, { size: "small" }),
        ":",
        b.name
      ] });
    const p = j == null ? void 0 : j.find((c) => c.id === u);
    return p ? `${p.name}:${b.name}` : b.name;
  }, [j, w]), { data: i, loading: _ } = x(() => h.authorization.getUser({ id: m }), {
    ready: !!m,
    refreshDeps: [m],
    onError: (u) => {
      u instanceof Be && u.code === "E4041" || (console.error("Failed to get user details:", u), n.error(t("user.detailLoadError", { defaultValue: "Failed to load user details" })));
    }
  });
  if (_)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(q, { size: "large" }) });
  if (!i)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(Je, { level: 4, children: t("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(U, { type: "primary", onClick: () => V("/authorization/users"), children: t("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const S = () => i.mfa_enabled ? /* @__PURE__ */ e.jsx(y, { status: "success", text: t("user.mfaEnabled", { defaultValue: "Enabled" }) }) : i.mfa_enforced ? /* @__PURE__ */ e.jsx(y, { status: "warning", text: t("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(y, { status: "default", text: t("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    B,
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
      extra: /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(
          U,
          {
            icon: /* @__PURE__ */ e.jsx(Oe, {}),
            onClick: () => V("/authorization/users"),
            children: f("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          U,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ne, {}),
            onClick: () => V(`/authorization/users/${m}/edit`),
            children: f("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(re, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(se, { tab: t("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(A, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.username", { defaultValue: "Username" }), children: i.username }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.fullName", { defaultValue: "Full Name" }), children: i.full_name }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.email", { defaultValue: "Email" }), children: i.email }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.status", { defaultValue: "Status" }), children: i.status === "active" ? /* @__PURE__ */ e.jsx(y, { status: "success", text: t("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(y, { status: "error", text: t(`user.statusEnum.${i.status}`, { defaultValue: i.status.charAt(0).toUpperCase() + i.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.roles", { defaultValue: "Roles" }), span: 2, children: i.roles && i.roles.length > 0 ? i.roles.map((u) => /* @__PURE__ */ e.jsx(z, { color: "blue", children: o ? E(u.organization_id, u) : u.name }, u.id)) : /* @__PURE__ */ e.jsx(z, { children: t("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.mfa", { defaultValue: "MFA" }), children: S() }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.lastLogin", { defaultValue: "Last Login" }), children: i.last_login ? $(i.last_login) : t("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.createdAt", { defaultValue: "Created At" }), children: $(i.created_at) }),
          /* @__PURE__ */ e.jsx(A.Item, { label: t("user.updatedAt", { defaultValue: "Updated At" }), children: $(i.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(se, { disabled: !a("authorization:user:view_audit_logs"), tab: t("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(Me, { userId: m || "" }) }, "logs")
      ] })
    }
  );
}, oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qe
}, Symbol.toStringTag, { value: "Module" })), { Option: I } = O, We = () => {
  const { message: n } = G.useApp(), { id: m = "" } = ue(), V = X(), { t } = C("authorization"), { t: f } = C("common"), [a] = g.useForm(), o = !!m, [j, w] = F(""), { enableMultiOrg: E } = K(), { data: i, loading: _ } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [E],
    onError: (l) => {
      n.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: l.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), S = Y((l, d) => {
    if (_)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(q, { size: "small" }),
        ":",
        d.name
      ] });
    const k = i == null ? void 0 : i.find((W) => W.id === l);
    return k ? `${k.name}:${d.name}` : d.name;
  }, [i, _]), { data: u, loading: b } = x(async () => (await h.authorization.listRoles({ search: j || void 0 })).data.map((d) => ({
    ...d,
    label: d.name,
    value: d.id
  })), {
    refreshDeps: [j]
  }), { loading: p, data: c } = x(
    async () => h.authorization.getUser({ id: m }),
    {
      ready: o && !!m,
      refreshDeps: [m, o],
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
  ), T = we(() => [...(c == null ? void 0 : c.roles.filter((d) => !(u != null && u.some((k) => k.id === d.id)))) || [], ...u || []].map((d) => ({
    ...d,
    label: E ? S(d.organization_id, d) : d.name || "",
    value: d.id
  })), [u, E, S, c == null ? void 0 : c.roles]), { run: M, loading: J } = x(
    async (l) => {
      if (o)
        return await h.authorization.updateUser(
          { id: m },
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
        l && (l.mode === "update" ? (n.success(t("user.updateSuccess", { defaultValue: "User updated successfully" })), V(`/authorization/users/${m}`)) : (n.success(t("user.createSuccess", { defaultValue: "User created successfully" })), V(`/authorization/users/${l.newUser.id}`)));
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
    const k = a.getFieldValue("password");
    return k ? d ? d !== k ? Promise.reject(new Error(t("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(t("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" }))) : Promise.resolve();
  };
  return /* @__PURE__ */ e.jsx(
    B,
    {
      title: o ? t("user.editTitle", { defaultValue: "Edit User" }) : t("user.createTitle", { defaultValue: "Create User" }),
      loading: p,
      children: /* @__PURE__ */ e.jsxs(
        g,
        {
          form: a,
          layout: "horizontal",
          onFinish: M,
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
                children: /* @__PURE__ */ e.jsx(Ne, {})
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
                  (c == null ? void 0 : c.status) === "pending_activation" && /* @__PURE__ */ e.jsx(I, { value: "pending_activation", children: t("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) }),
                  (c == null ? void 0 : c.status) === "locked" && /* @__PURE__ */ e.jsx(I, { value: "locked", children: t("user.statusEnum.locked", { defaultValue: "Locked" }) })
                ] })
              }
            ),
            /* @__PURE__ */ e.jsx(
              g.Item,
              {
                name: "mfa_enforced",
                label: t("user.mfaEnforced", { defaultValue: "MFA Enforced" }),
                children: /* @__PURE__ */ e.jsx(ke, {})
              }
            ),
            !o && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "password",
                  label: t("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: P }],
                  extra: /* @__PURE__ */ e.jsx(Z.Text, { type: "secondary", style: { fontSize: 12 }, children: t("user.passwordHint", { defaultValue: "Leave blank to send an activation email to the user." }) }),
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
                    options: T,
                    optionFilterProp: "label",
                    loading: b
                  }
                )
              }
            ),
            /* @__PURE__ */ e.jsx(g.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs(D, { children: [
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
                  onClick: () => V(o ? `/authorization/users/${m}` : "/authorization/users"),
                  children: f("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, da = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: We
}, Symbol.toStringTag, { value: "Module" }));
export {
  ia as U,
  oa as a,
  da as b
};
