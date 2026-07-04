import { j as e } from "./vendor.js";
import { useState as L, useEffect as ee, useCallback as Q } from "react";
import { Form as x, message as i, Spin as $, Modal as P, Typography as W, Tag as A, Tooltip as ye, Badge as j, Card as q, Row as Y, Col as R, Space as O, Input as T, Select as D, Button as U, Table as we, Tabs as ae, Descriptions as k, Switch as be } from "antd";
import { UserOutlined as se, EyeOutlined as _e, EditOutlined as te, UnlockOutlined as Ee, SafetyOutlined as ve, MailOutlined as ke, KeyOutlined as Ue, ToolOutlined as ze, UndoOutlined as Ae, DeleteOutlined as Se, ReloadOutlined as Pe, ExportOutlined as Fe, UserAddOutlined as Ce, ArrowLeftOutlined as Te } from "@ant-design/icons";
import { useNavigate as H, Link as Le, useParams as re } from "react-router-dom";
import { A as le, b as De, f as Z, U as Oe, c as Ie } from "./components.js";
import { a as h } from "./index.js";
import { P as J, f as N } from "./base.js";
import { useTranslation as F } from "react-i18next";
import { useRequest as p } from "ahooks";
import { a as Re, u as B, c as Me } from "./contexts.js";
import { A as Ne } from "./client.js";
const { Option: C } = D, $e = ({ user: n, onClose: y, onSuccess: t }) => {
  const { t: a } = F("authorization"), [c, d] = L(null), [g, w] = L(null), { run: z, loading: o } = p(h.authorization.updateUser, {
    onSuccess: () => {
      i.success(a("user.updateUserSuccess", { defaultValue: "User updated successfully" })), t();
    },
    onError: (u) => {
      i.error(a("user.updateUserError", { defaultValue: "Failed to update user", error: u.message }));
    },
    manual: !0
  }), { data: b, loading: S } = p(async () => c === "bind" ? h.authorization.getLdapUsers({ skip_existing: !0 }).then((u) => {
    const m = [], _ = [];
    for (const V of u)
      V.username === (n == null ? void 0 : n.username) || V.email === (n == null ? void 0 : n.email) || V.full_name === (n == null ? void 0 : n.full_name) ? m.push({ recommend: !0, ...V }) : _.push({ recommend: !1, ...V });
    return [...m, ..._];
  }) : Promise.resolve([]), {
    refreshDeps: [n == null ? void 0 : n.id, c]
  });
  return ee(() => {
    n && (d(null), w(null));
  }, [n]), /* @__PURE__ */ e.jsx(
    P,
    {
      open: n !== null,
      onCancel: y,
      onOk: () => {
        if (n) {
          if (c === "local")
            return z({ id: n.id }, { source: "local" });
          if (c === "bind") {
            if (!g) {
              i.error(a("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return z({ id: n.id }, { source: "ldap", ldap_dn: g });
          } else {
            i.error(a("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        i.error(a("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: a("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs(O, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(U, { loading: o, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: c === "local" ? "primary" : "default", onClick: () => d("local"), children: a("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(U, { loading: o, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: c === "bind" ? "primary" : "default", onClick: () => d("bind"), children: a("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          D,
          {
            loading: S,
            style: { display: c === "bind" ? "block" : "none" },
            onSelect: (u) => w(u),
            options: b == null ? void 0 : b.map((u) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(A, { color: u.recommend ? "blue" : "default", children: u.full_name }),
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
}, qe = () => {
  const { registerPageAI: n } = Re(), { addTask: y } = B(), t = H(), { t: a } = F("authorization"), { t: c } = F("common"), [d] = x.useForm(), [g, w] = L([]), [z, o] = L(0), { enableMultiOrg: b } = B(), [S, u] = L(null), [m, _] = L({
    current: J.DEFAULT_CURRENT,
    page_size: J.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  });
  ee(() => {
    g && (n == null || n({
      pageData: () => g,
      pageDataDescription: "Returns the current user list as a JSON object."
    }));
  }, [n, g]);
  const { data: V, loading: I } = p(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [b],
    onError: (s) => {
      i.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: s.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), K = Q((s, r) => {
    if (I)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx($, { size: "small" }),
        ":",
        r.name
      ] });
    const v = V == null ? void 0 : V.find((je) => je.id === s);
    return v ? `${v.name}:${r.name}` : r.name;
  }, [V, I]), { run: l, loading: f } = p(() => {
    const s = {
      status: m.status,
      keywords: m.keywords
    };
    return h.authorization.listUsers({
      current: m.current,
      page_size: m.page_size,
      ...s
    });
  }, {
    onSuccess: (s) => {
      w(s.data || []), o(s.total || 0);
    },
    onError: (s) => {
      i.error(a("user.loadError", { defaultValue: "Failed to load users", error: s.message }));
    },
    refreshDeps: [m]
  }), E = (s) => {
    _({
      ...m,
      current: J.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: s.keywords,
      status: s.status
    });
  }, G = (s, r) => {
    _((v) => ({
      ...v,
      current: s,
      page_size: r
    }));
  }, { run: ne } = p(h.authorization.restoreUser, {
    onSuccess: () => {
      i.success(a("user.restoreSuccess", { defaultValue: "User restored successfully" })), l();
    },
    onError: (s) => {
      i.error(a("user.restoreError", { defaultValue: "Failed to restore user", error: s.message }));
    },
    manual: !0
  }), { run: ue } = p(h.authorization.deleteUser, {
    onSuccess: () => {
      i.success(a("user.deleteSuccess", { defaultValue: "User deleted successfully" })), l();
    },
    onError: (s) => {
      i.error(a("user.deleteError", { defaultValue: "Failed to delete user", error: s.message }));
    },
    manual: !0
  }), { runAsync: ie } = p(
    (s) => h.authorization.resetUserPassword({ id: s.id }, { password: "" }),
    {
      manual: !0,
      onSuccess: (s, r) => {
        const v = r[0];
        i.success(a("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), s.new_password ? P.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: /* @__PURE__ */ e.jsx(W.Text, { copyable: { text: s.new_password }, children: a("user.resetPasswordSuccessContent", {
            defaultValue: `New password: ${s.new_password}`,
            password: s.new_password
          }) })
        }) : P.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: a("user.resetPasswordSuccessSendByEmail", {
            defaultValue: "The new password has been sent to the user email: {{email}}",
            email: v.email
          })
        });
      },
      onError: () => {
        i.error(a("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
      }
    }
  ), oe = (s, r, v) => {
    P.confirm({
      title: a("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: a("user.resetPasswordConfirm", {
        defaultValue: `Are you sure you want to reset the password for ${r}?`,
        username: r
      }),
      okText: c("confirm", { defaultValue: "Confirm" }),
      cancelText: c("cancel", { defaultValue: "Cancel" }),
      onOk: () => ie({ id: s, email: v })
    });
  }, { run: de, loading: ce } = p(
    () => h.authorization.createUserExportTask({
      keywords: m.keywords,
      status: m.status
    }),
    {
      onSuccess: (s) => {
        s.id ? i.success(
          a("user.exportTaskCreated", {
            defaultValue: "Export task created. You can view progress and download the file from the task list."
          })
        ) : i.success(a("user.exportTaskCreatedShort", { defaultValue: "Export task created." })), y(s);
      },
      onError: (s) => {
        i.error(
          a("user.exportError", {
            defaultValue: "Failed to create export task",
            error: (s == null ? void 0 : s.message) ?? String(s)
          })
        );
      },
      manual: !0
    }
  ), { runAsync: me } = p(
    (s) => h.authorization.unlockUser({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        i.success(a("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), l();
      },
      onError: (s) => {
        i.error(
          a("user.unlockError", {
            defaultValue: "Failed to unlock user: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), fe = (s) => {
    P.confirm({
      title: a("user.unlockTitle", { defaultValue: "Unlock User" }),
      content: a("user.unlockConfirm", {
        defaultValue: "Are you sure you want to unlock this user?",
        username: s.username
      }),
      onOk: () => me(s.id)
    });
  }, { runAsync: he } = p(
    (s) => h.authorization.adminDisableUserMfa({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        i.success(a("user.adminDisableMFASuccess", { defaultValue: "MFA disabled successfully" })), l();
      },
      onError: (s) => {
        i.error(
          a("user.adminDisableMFAError", {
            defaultValue: "Failed to disable MFA: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), pe = (s) => {
    P.confirm({
      title: a("user.adminDisableMFATitle", { defaultValue: "Disable MFA" }),
      content: a("user.adminDisableMFAConfirm", {
        defaultValue: "Are you sure you want to disable MFA for this user? They will be logged out of all sessions.",
        username: s.username
      }),
      okType: "danger",
      onOk: () => he(s.id)
    });
  }, { runAsync: xe } = p(
    (s) => h.authorization.resendActivationEmail({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        i.success(a("user.resendActivationSuccess", { defaultValue: "Activation email resent successfully" }));
      },
      onError: (s) => {
        i.error(
          a("user.resendActivationError", {
            defaultValue: "Failed to resend activation email: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), ge = (s) => {
    P.confirm({
      title: a("user.resendActivationTitle", { defaultValue: "Resend Activation Email" }),
      content: a("user.resendActivationConfirm", {
        defaultValue: "Resend activation email to {{email}}?",
        email: s.email
      }),
      onOk: () => xe(s.id)
    });
  }, Ve = [
    {
      title: a("user.username", { defaultValue: "Username" }),
      key: "user",
      render: (s, r) => /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          le,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(se, {}),
            src: r.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(Le, { to: `/authorization/users/${r.id}`, children: r.username })
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
            return r.ldap_dn ? /* @__PURE__ */ e.jsx(A, { color: "blue", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(ye, { title: a("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(A, { color: "red", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) });
          case "oauth2":
            return /* @__PURE__ */ e.jsx(A, { color: "green", children: a("user.sourceOauth2", { defaultValue: "OAuth2" }) });
          default:
            return /* @__PURE__ */ e.jsx(A, { color: "default", children: a("user.sourceLocal", { defaultValue: "Local" }) });
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
      render: (s) => /* @__PURE__ */ e.jsx("span", { children: s && s.length > 0 ? s.map((r) => /* @__PURE__ */ e.jsx(A, { color: "blue", children: r.organization_id ? K(r.organization_id, r) : r.name }, r.id)) : /* @__PURE__ */ e.jsx(A, { children: a("user.noRole", { defaultValue: "No Role" }) }) })
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
      render: (s) => s ? N(s) : a("user.neverLogin", { defaultValue: "Never" })
    },
    {
      title: c("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 150,
      render: (s, r) => {
        const v = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(_e, {}),
          tooltip: a("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: async () => t(`/authorization/users/${r.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(te, {}),
          tooltip: a("user.edit", { defaultValue: "Edit" }),
          hidden: r.status === "locked" || r.status === "deleted",
          onClick: async () => t(`/authorization/users/${r.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          tooltip: a("user.unlock", { defaultValue: "Unlock" }),
          hidden: r.status !== "locked",
          onClick: async () => fe(r)
        }, {
          key: "disableMFA",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          tooltip: a("user.adminDisableMFA", { defaultValue: "Disable MFA" }),
          hidden: !r.mfa_enabled || r.status === "deleted",
          danger: !0,
          onClick: async () => pe(r)
        }, {
          key: "resendActivation",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ke, {}),
          tooltip: a("user.resendActivation", { defaultValue: "Resend Activation Email" }),
          hidden: r.status !== "pending_activation" || !r.email,
          onClick: async () => ge(r)
        }, {
          key: "resetPassword",
          permission: "authorization:user:reset_password",
          icon: /* @__PURE__ */ e.jsx(Ue, {}),
          disabled: r.disable_change_password,
          tooltip: r.disable_change_password ? a("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : a("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((r.source === "local" || r.source === "ldap" && r.ldap_dn) && r.status !== "deleted" && r.status !== "pending_activation"),
          onClick: async () => oe(r.id, r.username, r.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ze, {}),
          tooltip: a("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(r.source === "ldap" && !r.ldap_dn && r.status !== "deleted"),
          onClick: async () => u(r)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ae, {}),
          tooltip: a("user.restore", { defaultValue: "Restore" }),
          hidden: r.status !== "deleted",
          confirm: {
            title: a("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => ne({ id: r.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(Se, {}),
          tooltip: a("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: a("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => ue({ id: r.id }),
            okText: c("confirm", { defaultValue: "Confirm" }),
            cancelText: c("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(De, { actions: v }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(q, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      x,
      {
        form: d,
        layout: "vertical",
        onFinish: E,
        name: "userSearchForm",
        children: /* @__PURE__ */ e.jsxs(Y, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(R, { children: /* @__PURE__ */ e.jsxs(O, { children: [
            /* @__PURE__ */ e.jsx(x.Item, { name: "keywords", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              T.Search,
              {
                placeholder: a("user.keywords", { defaultValue: "Search by username, full name, or email" }),
                allowClear: !0,
                onSearch: () => {
                  E(d.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            /* @__PURE__ */ e.jsx(x.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(
              D,
              {
                placeholder: a("user.status", { defaultValue: "Status" }),
                allowClear: !0,
                onChange: () => {
                  E(d.getFieldsValue());
                },
                style: { width: 220 },
                children: [
                  /* @__PURE__ */ e.jsx(C, { value: "active", children: a("user.statusEnum.active", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(C, { value: "disabled", children: a("user.statusEnum.disabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(C, { value: "deleted", children: a("user.statusEnum.deleted", { defaultValue: "Deleted" }) }),
                  /* @__PURE__ */ e.jsx(C, { value: "locked", children: a("user.statusEnum.locked", { defaultValue: "Locked" }) }),
                  /* @__PURE__ */ e.jsx(C, { value: "password_expired", children: a("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) }),
                  /* @__PURE__ */ e.jsx(C, { value: "pending_activation", children: a("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) })
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(R, { children: /* @__PURE__ */ e.jsxs(O, { children: [
            /* @__PURE__ */ e.jsx(U, { icon: /* @__PURE__ */ e.jsx(Pe, {}), onClick: l, children: c("refresh", { defaultValue: "Refresh" }) }),
            /* @__PURE__ */ e.jsx(Z, { permission: "authorization:user:export", children: /* @__PURE__ */ e.jsx(
              U,
              {
                icon: /* @__PURE__ */ e.jsx(Fe, {}),
                loading: ce,
                onClick: () => de(),
                children: a("user.export", { defaultValue: "Export" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(Z, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
              U,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Ce, {}),
                onClick: () => t("/authorization/users/create"),
                children: a("user.create", { defaultValue: "Create User" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(q, { children: [
      /* @__PURE__ */ e.jsxs(Y, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx(R, {}),
        /* @__PURE__ */ e.jsx(R, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        we,
        {
          columns: Ve,
          dataSource: g,
          rowKey: "id",
          loading: f,
          pagination: {
            current: m.current,
            pageSize: m.page_size,
            total: z,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (s) => c("totalItems", { defaultValue: `Total ${s} items`, total: s }),
            onChange: G
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx($e, { user: S, onClose: () => u(null), onSuccess: () => {
      u(null), l();
    } })
  ] });
}, la = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qe
}, Symbol.toStringTag, { value: "Module" })), { Title: Be } = W, { TabPane: X } = ae, Ke = () => {
  const { id: n } = re(), y = H(), { t } = F("authorization"), { t: a } = F("common"), { hasPermission: c } = Me(), { enableMultiOrg: d } = B(), { data: g, loading: w } = p(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [d],
    onError: (u) => {
      i.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: u.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), z = Q((u, m) => {
    if (w)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx($, { size: "small" }),
        ":",
        m.name
      ] });
    const _ = g == null ? void 0 : g.find((V) => V.id === u);
    return _ ? `${_.name}:${m.name}` : m.name;
  }, [g, w]), { data: o, loading: b } = p(() => h.authorization.getUser({ id: n }), {
    ready: !!n,
    refreshDeps: [n],
    onError: (u) => {
      u instanceof Ne && u.code === "E4041" || (console.error("Failed to get user details:", u), i.error(t("user.detailLoadError", { defaultValue: "Failed to load user details" })));
    }
  });
  if (b)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx($, { size: "large" }) });
  if (!o)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(Be, { level: 4, children: t("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(U, { type: "primary", onClick: () => y("/authorization/users"), children: t("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const S = () => o.mfa_enabled ? /* @__PURE__ */ e.jsx(j, { status: "success", text: t("user.mfaEnabled", { defaultValue: "Enabled" }) }) : o.mfa_enforced ? /* @__PURE__ */ e.jsx(j, { status: "warning", text: t("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(j, { status: "default", text: t("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    q,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          le,
          {
            size: 48,
            icon: /* @__PURE__ */ e.jsx(se, {}),
            src: o.avatar,
            style: { marginRight: 16 }
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 20, fontWeight: "bold" }, children: o.username }),
          /* @__PURE__ */ e.jsx("div", { style: { color: "#888" }, children: o.email })
        ] })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(O, { children: [
        /* @__PURE__ */ e.jsx(
          U,
          {
            icon: /* @__PURE__ */ e.jsx(Te, {}),
            onClick: () => y("/authorization/users"),
            children: a("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          U,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(te, {}),
            onClick: () => y(`/authorization/users/${n}/edit`),
            children: a("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(ae, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(X, { tab: t("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(k, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.username", { defaultValue: "Username" }), children: o.username }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.fullName", { defaultValue: "Full Name" }), children: o.full_name }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.email", { defaultValue: "Email" }), children: o.email }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.status", { defaultValue: "Status" }), children: o.status === "active" ? /* @__PURE__ */ e.jsx(j, { status: "success", text: t("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(j, { status: "error", text: t(`user.statusEnum.${o.status}`, { defaultValue: o.status.charAt(0).toUpperCase() + o.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.roles", { defaultValue: "Roles" }), span: 2, children: o.roles && o.roles.length > 0 ? o.roles.map((u) => /* @__PURE__ */ e.jsx(A, { color: "blue", children: d ? z(u.organization_id, u) : u.name }, u.id)) : /* @__PURE__ */ e.jsx(A, { children: t("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.mfa", { defaultValue: "MFA" }), children: S() }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.lastLogin", { defaultValue: "Last Login" }), children: o.last_login ? N(o.last_login) : t("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.createdAt", { defaultValue: "Created At" }), children: N(o.created_at) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.updatedAt", { defaultValue: "Updated At" }), children: N(o.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(X, { disabled: !c("authorization:user:view_audit_logs"), tab: t("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(Oe, { userId: n || "" }) }, "logs")
      ] })
    }
  );
}, na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ke
}, Symbol.toStringTag, { value: "Module" })), { Option: M } = D, Ge = () => {
  const { id: n = "" } = re(), y = H(), { t } = F("authorization"), { t: a } = F("common"), [c] = x.useForm(), d = !!n, { enableMultiOrg: g } = B(), { data: w, loading: z } = p(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [g],
    onError: (l) => {
      i.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: l.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), o = Q((l, f) => {
    if (z)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx($, { size: "small" }),
        ":",
        f.name
      ] });
    const E = w == null ? void 0 : w.find((G) => G.id === l);
    return E ? `${E.name}:${f.name}` : f.name;
  }, [w, z]), { data: b, loading: S } = p(async () => (await h.authorization.listRoles({})).data.map((f) => ({
    ...f,
    label: f.name,
    value: f.id
  }))), { loading: u, data: m } = p(
    async () => h.authorization.getUser({ id: n }),
    {
      ready: d && !!n,
      refreshDeps: [n, d],
      onSuccess: (l) => {
        c.setFieldsValue({
          username: l.username,
          email: l.email,
          avatar: l.avatar,
          full_name: l.full_name,
          status: l.status,
          role_ids: l.roles ? l.roles.map((f) => f.id) : [],
          mfa_enforced: l.mfa_enforced
        });
      },
      onError: () => {
        i.error(t("user.loadError", { defaultValue: "Failed to load user data" }));
      }
    }
  ), { run: _, loading: V } = p(
    async (l) => {
      if (d)
        return await h.authorization.updateUser(
          { id: n },
          {
            email: l.email,
            avatar: l.avatar,
            full_name: l.full_name,
            status: l.status,
            mfa_enforced: l.mfa_enforced,
            role_ids: l.role_ids
          }
        ), { mode: "update" };
      const f = {
        username: l.username,
        avatar: l.avatar,
        password: l.password,
        email: l.email,
        full_name: l.full_name,
        mfa_enforced: l.mfa_enforced,
        role_ids: l.role_ids
      };
      return { mode: "create", newUser: await h.authorization.createUser(f) };
    },
    {
      manual: !0,
      onSuccess: (l) => {
        l && (l.mode === "update" ? (i.success(t("user.updateSuccess", { defaultValue: "User updated successfully" })), y(`/authorization/users/${n}`)) : (i.success(t("user.createSuccess", { defaultValue: "User created successfully" })), y(`/authorization/users/${l.newUser.id}`)));
      },
      onError: (l) => {
        i.error(
          d ? t("user.updateError", {
            defaultValue: "Failed to update user",
            error: l instanceof Error ? l.message : String(l)
          }) : t("user.createError", {
            defaultValue: "Failed to create user",
            error: l instanceof Error ? l.message : String(l)
          })
        );
      }
    }
  ), I = (l, f) => d || !f ? Promise.resolve() : f.length < 8 ? Promise.reject(new Error(t("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve(), K = (l, f) => {
    if (d) return Promise.resolve();
    const E = c.getFieldValue("password");
    return E ? f ? f !== E ? Promise.reject(new Error(t("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(t("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" }))) : Promise.resolve();
  };
  return /* @__PURE__ */ e.jsx(
    q,
    {
      title: d ? t("user.editTitle", { defaultValue: "Edit User" }) : t("user.createTitle", { defaultValue: "Create User" }),
      loading: u || S,
      children: /* @__PURE__ */ e.jsxs(
        x,
        {
          form: c,
          layout: "horizontal",
          onFinish: _,
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
              x.Item,
              {
                name: "avatar",
                label: t("user.avatar", { defaultValue: "Avatar" }),
                children: /* @__PURE__ */ e.jsx(Ie, {})
              }
            ),
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                name: "username",
                label: t("user.username", { defaultValue: "Username" }),
                rules: [
                  { required: !d, message: t("user.usernameRequired", { defaultValue: "Username is required" }) }
                ],
                children: /* @__PURE__ */ e.jsx(T, { disabled: d, placeholder: t("user.usernamePlaceholder", { defaultValue: "Enter username" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                name: "email",
                label: t("user.email", { defaultValue: "Email" }),
                rules: [
                  { required: !0, message: t("user.emailRequired", { defaultValue: "Email is required" }) },
                  { type: "email", message: t("user.emailInvalid", { defaultValue: "Invalid email format" }) }
                ],
                children: /* @__PURE__ */ e.jsx(T, { placeholder: t("user.emailPlaceholder", { defaultValue: "Enter email address" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                name: "full_name",
                label: t("user.fullName", { defaultValue: "Full Name" }),
                rules: [{ required: !0, message: t("user.fullNameRequired", { defaultValue: "Full name is required" }) }],
                children: /* @__PURE__ */ e.jsx(T, { placeholder: t("user.fullNamePlaceholder", { defaultValue: "Enter full name" }) })
              }
            ),
            d && /* @__PURE__ */ e.jsx(
              x.Item,
              {
                name: "status",
                label: t("user.status", { defaultValue: "Status" }),
                rules: [{ required: !0, message: t("user.statusRequired", { defaultValue: "Status is required" }) }],
                children: /* @__PURE__ */ e.jsxs(D, { placeholder: t("user.statusPlaceholder", { defaultValue: "Select status" }), children: [
                  /* @__PURE__ */ e.jsx(M, { value: "active", children: t("user.statusActive", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(M, { value: "disabled", children: t("user.statusDisabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(M, { value: "password_expired", children: t("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) }),
                  (m == null ? void 0 : m.status) === "pending_activation" && /* @__PURE__ */ e.jsx(M, { value: "pending_activation", children: t("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) })
                ] })
              }
            ),
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                name: "mfa_enforced",
                label: t("user.mfaEnforced", { defaultValue: "MFA Enforced" }),
                children: /* @__PURE__ */ e.jsx(be, {})
              }
            ),
            !d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "password",
                  label: t("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: I }],
                  extra: /* @__PURE__ */ e.jsx(W.Text, { type: "secondary", style: { fontSize: 12 }, children: t("user.passwordHint", { defaultValue: "Leave blank to send an activation email to the user." }) }),
                  children: /* @__PURE__ */ e.jsx(T.Password, { autoComplete: "new-password", placeholder: t("user.passwordPlaceholder", { defaultValue: "Enter password (optional)" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "confirm_password",
                  label: t("user.confirmPassword", { defaultValue: "Confirm Password" }),
                  rules: [{ validator: K }],
                  dependencies: ["password"],
                  children: /* @__PURE__ */ e.jsx(T.Password, { autoComplete: "new-password", placeholder: t("user.confirmPasswordPlaceholder", { defaultValue: "Confirm password" }) })
                }
              )
            ] }),
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                name: "role_ids",
                label: t("user.roles", { defaultValue: "Roles" }),
                children: /* @__PURE__ */ e.jsx(
                  D,
                  {
                    mode: "multiple",
                    placeholder: t("user.selectRoles", { defaultValue: "Select roles" }),
                    options: b == null ? void 0 : b.map((l) => ({
                      ...l,
                      label: g ? o(l.organization_id, l) : l.name
                    })),
                    optionFilterProp: "label",
                    loading: S
                  }
                )
              }
            ),
            /* @__PURE__ */ e.jsx(x.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs(O, { children: [
              /* @__PURE__ */ e.jsx(
                U,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: V,
                  children: d ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                U,
                {
                  onClick: () => y(d ? `/authorization/users/${n}` : "/authorization/users"),
                  children: a("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, ua = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ge
}, Symbol.toStringTag, { value: "Module" }));
export {
  la as U,
  na as a,
  ua as b
};
