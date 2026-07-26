import { j as e } from "./vendor.js";
import { useState as C, useEffect as re, useCallback as Z, useMemo as we } from "react";
import { App as J, Form as g, Spin as B, Modal as F, Typography as X, Tag as z, Tooltip as be, Badge as j, Card as K, Row as ae, Col as $, Space as M, Input as R, Select as O, Button as A, Table as Ee, Tabs as le, Descriptions as v, Switch as _e } from "antd";
import { UserOutlined as ne, EyeOutlined as ke, EditOutlined as ue, UnlockOutlined as ve, SafetyOutlined as Ae, MailOutlined as Ue, KeyOutlined as ze, ToolOutlined as Se, UndoOutlined as Pe, DeleteOutlined as Fe, ReloadOutlined as Ce, ExportOutlined as Te, UserAddOutlined as Le, ArrowLeftOutlined as Re } from "@ant-design/icons";
import { useNavigate as ee, Link as Oe, useParams as ie } from "react-router-dom";
import { A as oe, b as Ie, g as se, U as De, e as Me } from "./components.js";
import { a as h } from "./index.js";
import { P as Y, f as q } from "./base.js";
import { useTranslation as T } from "react-i18next";
import { useRequest as x } from "ahooks";
import { d as Ne, b as G, a as $e } from "./contexts.js";
import { A as qe } from "./client.js";
const { Option: L } = O, Be = ({ user: l, onClose: f, onSuccess: y }) => {
  const { message: t } = J.useApp(), { t: a } = T("authorization"), [m, c] = C(null), [V, U] = C(null), { run: w, loading: i } = x(h.authorization.updateUser, {
    onSuccess: () => {
      t.success(a("user.updateUserSuccess", { defaultValue: "User updated successfully" })), y();
    },
    onError: (u) => {
      t.error(a("user.updateUserError", { defaultValue: "Failed to update user", error: u.message }));
    },
    manual: !0
  }), { data: b, loading: S } = x(async () => m === "bind" ? h.authorization.getLdapUsers({ skip_existing: !0 }).then((u) => {
    const p = [], E = [];
    for (const d of u)
      d.username === (l == null ? void 0 : l.username) || d.email === (l == null ? void 0 : l.email) || d.full_name === (l == null ? void 0 : l.full_name) ? p.push({ recommend: !0, ...d }) : E.push({ recommend: !1, ...d });
    return [...p, ...E];
  }) : Promise.resolve([]), {
    refreshDeps: [l == null ? void 0 : l.id, m]
  });
  return re(() => {
    l && (c(null), U(null));
  }, [l]), /* @__PURE__ */ e.jsx(
    F,
    {
      open: l !== null,
      onCancel: f,
      onOk: () => {
        if (l) {
          if (m === "local")
            return w({ id: l.id }, { source: "local" });
          if (m === "bind") {
            if (!V) {
              t.error(a("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return w({ id: l.id }, { source: "ldap", ldap_dn: V });
          } else {
            t.error(a("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        t.error(a("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: a("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs(M, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(A, { loading: i, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: m === "local" ? "primary" : "default", onClick: () => c("local"), children: a("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(A, { loading: i, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: m === "bind" ? "primary" : "default", onClick: () => c("bind"), children: a("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          O,
          {
            loading: S,
            style: { display: m === "bind" ? "block" : "none" },
            onSelect: (u) => U(u),
            options: b == null ? void 0 : b.map((u) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
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
}, Ke = () => {
  const { message: l } = J.useApp(), { registerPageAI: f } = Ne(), { addTask: y } = G(), t = ee(), { t: a } = T("authorization"), { t: m } = T("common"), [c] = g.useForm(), [V, U] = C([]), [w, i] = C(0), { enableMultiOrg: b } = G(), [S, u] = C(null), [p, E] = C({
    current: Y.DEFAULT_CURRENT,
    page_size: Y.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  });
  re(() => {
    V && (f == null || f({
      pageData: () => V,
      pageDataDescription: "Returns the current user list as a JSON object."
    }));
  }, [f, V]);
  const { data: d, loading: N } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [b],
    onError: (s) => {
      l.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: s.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), Q = Z((s, r) => {
    if (N)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(B, { size: "small" }),
        ":",
        r.name
      ] });
    const k = d == null ? void 0 : d.find((ye) => ye.id === s);
    return k ? `${k.name}:${r.name}` : r.name;
  }, [d, N]), { run: P, loading: W } = x(() => {
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
      U(s.data || []), i(s.total || 0);
    },
    onError: (s) => {
      l.error(a("user.loadError", { defaultValue: "Failed to load users", error: s.message }));
    },
    refreshDeps: [p]
  }), I = (s) => {
    E({
      ...p,
      current: Y.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: s.keywords,
      status: s.status
    });
  }, n = (s, r) => {
    E((k) => ({
      ...k,
      current: s,
      page_size: r
    }));
  }, { run: o } = x(h.authorization.restoreUser, {
    onSuccess: () => {
      l.success(a("user.restoreSuccess", { defaultValue: "User restored successfully" })), P();
    },
    onError: (s) => {
      l.error(a("user.restoreError", { defaultValue: "Failed to restore user", error: s.message }));
    },
    manual: !0
  }), { run: _ } = x(h.authorization.deleteUser, {
    onSuccess: () => {
      l.success(a("user.deleteSuccess", { defaultValue: "User deleted successfully" })), P();
    },
    onError: (s) => {
      l.error(a("user.deleteError", { defaultValue: "Failed to delete user", error: s.message }));
    },
    manual: !0
  }), { runAsync: H } = x(
    (s) => h.authorization.resetUserPassword({ id: s.id }, { password: "" }),
    {
      manual: !0,
      onSuccess: (s, r) => {
        const k = r[0];
        l.success(a("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), s.new_password ? F.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: /* @__PURE__ */ e.jsx(X.Text, { copyable: { text: s.new_password }, children: a("user.resetPasswordSuccessContent", {
            defaultValue: `New password: ${s.new_password}`,
            password: s.new_password
          }) })
        }) : F.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: a("user.resetPasswordSuccessSendByEmail", {
            defaultValue: "The new password has been sent to the user email: {{email}}",
            email: k.email
          })
        });
      },
      onError: () => {
        l.error(a("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
      }
    }
  ), de = (s, r, k) => {
    F.confirm({
      title: a("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: a("user.resetPasswordConfirm", {
        defaultValue: `Are you sure you want to reset the password for ${r}?`,
        username: r
      }),
      okText: m("confirm", { defaultValue: "Confirm" }),
      cancelText: m("cancel", { defaultValue: "Cancel" }),
      onOk: () => H({ id: s, email: k })
    });
  }, { run: ce, loading: me } = x(
    () => h.authorization.createUserExportTask({
      keywords: p.keywords,
      status: p.status
    }),
    {
      onSuccess: (s) => {
        s.id ? l.success(
          a("user.exportTaskCreated", {
            defaultValue: "Export task created. You can view progress and download the file from the task list."
          })
        ) : l.success(a("user.exportTaskCreatedShort", { defaultValue: "Export task created." })), y(s);
      },
      onError: (s) => {
        l.error(
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
        l.success(a("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), P();
      },
      onError: (s) => {
        l.error(
          a("user.unlockError", {
            defaultValue: "Failed to unlock user: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), pe = (s) => {
    F.confirm({
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
        l.success(a("user.adminDisableMFASuccess", { defaultValue: "MFA disabled successfully" })), P();
      },
      onError: (s) => {
        l.error(
          a("user.adminDisableMFAError", {
            defaultValue: "Failed to disable MFA: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), xe = (s) => {
    F.confirm({
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
        l.success(a("user.resendActivationSuccess", { defaultValue: "Activation email resent successfully" }));
      },
      onError: (s) => {
        l.error(
          a("user.resendActivationError", {
            defaultValue: "Failed to resend activation email: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), Ve = (s) => {
    F.confirm({
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
          oe,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(ne, {}),
            src: r.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(Oe, { to: `/authorization/users/${r.id}`, children: r.username })
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
            return /* @__PURE__ */ e.jsx(j, { status: "default", text: a("user.statusEnum.disabled", { defaultValue: "Disabled" }) });
          case "password_expired":
            return /* @__PURE__ */ e.jsx(j, { status: "warning", text: a("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) });
          case "active":
            return /* @__PURE__ */ e.jsx(j, { status: "success", text: a("user.statusEnum.active", { defaultValue: "Active" }) });
          case "locked":
            return /* @__PURE__ */ e.jsx(j, { status: "warning", text: a("user.statusEnum.locked", { defaultValue: "Locked" }) });
          case "deleted":
            return /* @__PURE__ */ e.jsx(j, { status: "error", text: a("user.statusEnum.deleted", { defaultValue: "Deleted" }) });
          case "pending_activation":
            return /* @__PURE__ */ e.jsx(j, { status: "processing", text: a("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) });
          default:
            return /* @__PURE__ */ e.jsx(j, { status: "default", text: a(`user.statusEnum.${s}`, { defaultValue: s.charAt(0).toUpperCase() + s.slice(1) }) });
        }
      }
    },
    {
      title: a("user.roles", { defaultValue: "Roles" }),
      dataIndex: "roles",
      key: "roles",
      render: (s) => /* @__PURE__ */ e.jsx("span", { children: s && s.length > 0 ? s.map((r) => /* @__PURE__ */ e.jsx(z, { color: "blue", children: r.organization_id ? Q(r.organization_id, r) : r.name }, r.id)) : /* @__PURE__ */ e.jsx(z, { children: a("user.noRole", { defaultValue: "No Role" }) }) })
    },
    {
      title: a("user.mfa", { defaultValue: "MFA" }),
      dataIndex: "mfa_enabled",
      key: "mfa_enabled",
      render: (s) => s ? /* @__PURE__ */ e.jsx(j, { status: "success", text: a("user.mfaEnabled", { defaultValue: "Enabled" }) }) : /* @__PURE__ */ e.jsx(j, { status: "default", text: a("user.mfaDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("user.lastLogin", { defaultValue: "Last Login" }),
      dataIndex: "last_login",
      key: "last_login",
      render: (s) => s ? q(s) : a("user.neverLogin", { defaultValue: "Never" })
    },
    {
      title: m("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 160,
      render: (s, r) => {
        const k = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(ke, {}),
          tooltip: a("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: async () => t(`/authorization/users/${r.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ue, {}),
          tooltip: a("user.edit", { defaultValue: "Edit" }),
          hidden: r.status === "locked" || r.status === "deleted",
          onClick: async () => t(`/authorization/users/${r.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          tooltip: a("user.unlock", { defaultValue: "Unlock" }),
          hidden: r.status !== "locked",
          onClick: async () => pe(r)
        }, {
          key: "disableMFA",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ae, {}),
          tooltip: a("user.adminDisableMFA", { defaultValue: "Disable MFA" }),
          hidden: !r.mfa_enabled || r.status === "deleted",
          danger: !0,
          onClick: async () => xe(r)
        }, {
          key: "resendActivation",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ue, {}),
          tooltip: a("user.resendActivation", { defaultValue: "Resend Activation Email" }),
          hidden: r.status !== "pending_activation" || !r.email,
          onClick: async () => Ve(r)
        }, {
          key: "resetPassword",
          permission: "authorization:user:reset_password",
          icon: /* @__PURE__ */ e.jsx(ze, {}),
          disabled: r.disable_change_password,
          tooltip: r.disable_change_password ? a("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : a("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((r.source === "local" || r.source === "ldap" && r.ldap_dn) && r.status !== "deleted" && r.status !== "pending_activation"),
          onClick: async () => de(r.id, r.username, r.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Se, {}),
          tooltip: a("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(r.source === "ldap" && !r.ldap_dn && r.status !== "deleted"),
          onClick: async () => u(r)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Pe, {}),
          tooltip: a("user.restore", { defaultValue: "Restore" }),
          hidden: r.status !== "deleted",
          confirm: {
            title: a("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => o({ id: r.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(Fe, {}),
          tooltip: a("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: a("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => _({ id: r.id }),
            okText: m("confirm", { defaultValue: "Confirm" }),
            cancelText: m("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(Ie, { actions: k }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(K, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      g,
      {
        form: c,
        layout: "vertical",
        onFinish: I,
        name: "userSearchForm",
        children: /* @__PURE__ */ e.jsxs(ae, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx($, { children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(g.Item, { name: "keywords", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              R.Search,
              {
                placeholder: a("user.keywords", { defaultValue: "Search by username, full name, or email" }),
                allowClear: !0,
                onSearch: () => {
                  I(c.getFieldsValue());
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
                  I(c.getFieldsValue());
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
          /* @__PURE__ */ e.jsx($, { children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(A, { icon: /* @__PURE__ */ e.jsx(Ce, {}), onClick: P, children: m("refresh", { defaultValue: "Refresh" }) }),
            /* @__PURE__ */ e.jsx(se, { permission: "authorization:user:export", children: /* @__PURE__ */ e.jsx(
              A,
              {
                icon: /* @__PURE__ */ e.jsx(Te, {}),
                loading: me,
                onClick: () => ce(),
                children: a("user.export", { defaultValue: "Export" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(se, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
              A,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Le, {}),
                onClick: () => t("/authorization/users/create"),
                children: a("user.create", { defaultValue: "Create User" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(K, { children: [
      /* @__PURE__ */ e.jsxs(ae, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx($, {}),
        /* @__PURE__ */ e.jsx($, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Ee,
        {
          columns: je,
          dataSource: V,
          rowKey: "id",
          loading: W,
          pagination: {
            current: p.current,
            pageSize: p.page_size,
            total: w,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (s) => m("totalItems", { defaultValue: `Total ${s} items`, total: s }),
            onChange: n
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(Be, { user: S, onClose: () => u(null), onSuccess: () => {
      u(null), P();
    } })
  ] });
}, ua = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ke
}, Symbol.toStringTag, { value: "Module" })), { Title: Ge } = X, { TabPane: te } = le, Je = () => {
  const { message: l } = J.useApp(), { id: f } = ie(), y = ee(), { t } = T("authorization"), { t: a } = T("common"), { hasPermission: m } = $e(), { enableMultiOrg: c } = G(), { data: V, loading: U } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [c],
    onError: (u) => {
      l.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: u.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), w = Z((u, p) => {
    if (U)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(B, { size: "small" }),
        ":",
        p.name
      ] });
    const E = V == null ? void 0 : V.find((d) => d.id === u);
    return E ? `${E.name}:${p.name}` : p.name;
  }, [V, U]), { data: i, loading: b } = x(() => h.authorization.getUser({ id: f }), {
    ready: !!f,
    refreshDeps: [f],
    onError: (u) => {
      u instanceof qe && u.code === "E4041" || (console.error("Failed to get user details:", u), l.error(t("user.detailLoadError", { defaultValue: "Failed to load user details" })));
    }
  });
  if (b)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(B, { size: "large" }) });
  if (!i)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(Ge, { level: 4, children: t("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(A, { type: "primary", onClick: () => y("/authorization/users"), children: t("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const S = () => i.mfa_enabled ? /* @__PURE__ */ e.jsx(j, { status: "success", text: t("user.mfaEnabled", { defaultValue: "Enabled" }) }) : i.mfa_enforced ? /* @__PURE__ */ e.jsx(j, { status: "warning", text: t("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(j, { status: "default", text: t("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    K,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          oe,
          {
            size: 48,
            icon: /* @__PURE__ */ e.jsx(ne, {}),
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
          A,
          {
            icon: /* @__PURE__ */ e.jsx(Re, {}),
            onClick: () => y("/authorization/users"),
            children: a("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          A,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ue, {}),
            onClick: () => y(`/authorization/users/${f}/edit`),
            children: a("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(le, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(te, { tab: t("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(v, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(v.Item, { label: t("user.username", { defaultValue: "Username" }), children: i.username }),
          /* @__PURE__ */ e.jsx(v.Item, { label: t("user.fullName", { defaultValue: "Full Name" }), children: i.full_name }),
          /* @__PURE__ */ e.jsx(v.Item, { label: t("user.email", { defaultValue: "Email" }), children: i.email }),
          /* @__PURE__ */ e.jsx(v.Item, { label: t("user.status", { defaultValue: "Status" }), children: i.status === "active" ? /* @__PURE__ */ e.jsx(j, { status: "success", text: t("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(j, { status: "error", text: t(`user.statusEnum.${i.status}`, { defaultValue: i.status.charAt(0).toUpperCase() + i.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(v.Item, { label: t("user.roles", { defaultValue: "Roles" }), span: 2, children: i.roles && i.roles.length > 0 ? i.roles.map((u) => /* @__PURE__ */ e.jsx(z, { color: "blue", children: c ? w(u.organization_id, u) : u.name }, u.id)) : /* @__PURE__ */ e.jsx(z, { children: t("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(v.Item, { label: t("user.mfa", { defaultValue: "MFA" }), children: S() }),
          /* @__PURE__ */ e.jsx(v.Item, { label: t("user.lastLogin", { defaultValue: "Last Login" }), children: i.last_login ? q(i.last_login) : t("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(v.Item, { label: t("user.createdAt", { defaultValue: "Created At" }), children: q(i.created_at) }),
          /* @__PURE__ */ e.jsx(v.Item, { label: t("user.updatedAt", { defaultValue: "Updated At" }), children: q(i.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(te, { disabled: !m("authorization:user:view_audit_logs"), tab: t("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(De, { userId: f || "" }) }, "logs")
      ] })
    }
  );
}, ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Je
}, Symbol.toStringTag, { value: "Module" })), { Option: D } = O, Qe = () => {
  const { message: l } = J.useApp(), { id: f = "" } = ie(), y = ee(), { t } = T("authorization"), { t: a } = T("common"), [m] = g.useForm(), c = !!f, [V, U] = C(""), { enableMultiOrg: w } = G(), { data: i, loading: b } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [w],
    onError: (n) => {
      l.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: n.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), S = Z((n, o) => {
    if (b)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(B, { size: "small" }),
        ":",
        o.name
      ] });
    const _ = i == null ? void 0 : i.find((H) => H.id === n);
    return _ ? `${_.name}:${o.name}` : o.name;
  }, [i, b]), { data: u, loading: p } = x(async () => (await h.authorization.listRoles({ search: V || void 0 })).data.map((o) => ({
    ...o,
    label: o.name,
    value: o.id
  })), {
    refreshDeps: [V]
  }), { loading: E, data: d } = x(
    async () => h.authorization.getUser({ id: f }),
    {
      ready: c && !!f,
      refreshDeps: [f, c],
      onSuccess: (n) => {
        m.setFieldsValue({
          username: n.username,
          email: n.email,
          avatar: n.avatar,
          full_name: n.full_name,
          status: n.status,
          role_ids: n.roles ? n.roles.map((o) => o.id) : [],
          mfa_enforced: n.mfa_enforced
        });
      },
      onError: () => {
        l.error(t("user.loadError", { defaultValue: "Failed to load user data" }));
      }
    }
  ), N = we(() => [...(d == null ? void 0 : d.roles.filter((o) => !(u != null && u.some((_) => _.id === o.id)))) || [], ...u || []].map((o) => ({
    ...o,
    label: w ? S(o.organization_id, o) : o.name || "",
    value: o.id
  })), [u, w, S, d == null ? void 0 : d.roles]), { run: Q, loading: P } = x(
    async (n) => {
      if (c)
        return await h.authorization.updateUser(
          { id: f },
          {
            email: n.email,
            avatar: n.avatar,
            full_name: n.full_name,
            status: n.status,
            mfa_enforced: n.mfa_enforced,
            role_ids: n.role_ids
          }
        ), { mode: "update" };
      const o = {
        username: n.username,
        avatar: n.avatar,
        password: n.password,
        email: n.email,
        full_name: n.full_name,
        mfa_enforced: n.mfa_enforced,
        role_ids: n.role_ids
      };
      return { mode: "create", newUser: await h.authorization.createUser(o) };
    },
    {
      manual: !0,
      onSuccess: (n) => {
        n && (n.mode === "update" ? (l.success(t("user.updateSuccess", { defaultValue: "User updated successfully" })), y(`/authorization/users/${f}`)) : (l.success(t("user.createSuccess", { defaultValue: "User created successfully" })), y(`/authorization/users/${n.newUser.id}`)));
      },
      onError: (n) => {
        l.error(
          c ? t("user.updateError", {
            defaultValue: "Failed to update user",
            error: n instanceof Error ? n.message : String(n)
          }) : t("user.createError", {
            defaultValue: "Failed to create user",
            error: n instanceof Error ? n.message : String(n)
          })
        );
      }
    }
  ), W = (n, o) => c || !o ? Promise.resolve() : o.length < 8 ? Promise.reject(new Error(t("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve(), I = (n, o) => {
    if (c) return Promise.resolve();
    const _ = m.getFieldValue("password");
    return _ ? o ? o !== _ ? Promise.reject(new Error(t("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(t("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" }))) : Promise.resolve();
  };
  return /* @__PURE__ */ e.jsx(
    K,
    {
      title: c ? t("user.editTitle", { defaultValue: "Edit User" }) : t("user.createTitle", { defaultValue: "Create User" }),
      loading: E,
      children: /* @__PURE__ */ e.jsxs(
        g,
        {
          form: m,
          layout: "horizontal",
          onFinish: Q,
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
                children: /* @__PURE__ */ e.jsx(Me, {})
              }
            ),
            /* @__PURE__ */ e.jsx(
              g.Item,
              {
                name: "username",
                label: t("user.username", { defaultValue: "Username" }),
                rules: [
                  { required: !c, message: t("user.usernameRequired", { defaultValue: "Username is required" }) }
                ],
                children: /* @__PURE__ */ e.jsx(R, { disabled: c, placeholder: t("user.usernamePlaceholder", { defaultValue: "Enter username" }) })
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
            c && /* @__PURE__ */ e.jsx(
              g.Item,
              {
                name: "status",
                label: t("user.status", { defaultValue: "Status" }),
                rules: [{ required: !0, message: t("user.statusRequired", { defaultValue: "Status is required" }) }],
                children: /* @__PURE__ */ e.jsxs(O, { placeholder: t("user.statusPlaceholder", { defaultValue: "Select status" }), children: [
                  /* @__PURE__ */ e.jsx(D, { value: "active", children: t("user.statusActive", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(D, { value: "disabled", children: t("user.statusDisabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(D, { value: "password_expired", children: t("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) }),
                  (d == null ? void 0 : d.status) === "pending_activation" && /* @__PURE__ */ e.jsx(D, { value: "pending_activation", children: t("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) }),
                  (d == null ? void 0 : d.status) === "locked" && /* @__PURE__ */ e.jsx(D, { value: "locked", children: t("user.statusEnum.locked", { defaultValue: "Locked" }) })
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
            !c && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "password",
                  label: t("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: W }],
                  extra: /* @__PURE__ */ e.jsx(X.Text, { type: "secondary", style: { fontSize: 12 }, children: t("user.passwordHint", { defaultValue: "Leave blank to send an activation email to the user." }) }),
                  children: /* @__PURE__ */ e.jsx(R.Password, { autoComplete: "new-password", placeholder: t("user.passwordPlaceholder", { defaultValue: "Enter password (optional)" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "confirm_password",
                  label: t("user.confirmPassword", { defaultValue: "Confirm Password" }),
                  rules: [{ validator: I }],
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
                    onSearch: (n) => U(n),
                    placeholder: t("user.selectRoles", { defaultValue: "Select roles" }),
                    options: N,
                    optionFilterProp: "label",
                    loading: p
                  }
                )
              }
            ),
            /* @__PURE__ */ e.jsx(g.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs(M, { children: [
              /* @__PURE__ */ e.jsx(
                A,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: P,
                  children: c ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                A,
                {
                  onClick: () => y(c ? `/authorization/users/${f}` : "/authorization/users"),
                  children: a("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qe
}, Symbol.toStringTag, { value: "Module" }));
export {
  ua as U,
  ia as a,
  oa as b
};
