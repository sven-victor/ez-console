import { j as e } from "./vendor.js";
import { useState as T, useEffect as ee, useCallback as Q } from "react";
import { Form as p, message as o, Spin as M, Modal as F, Typography as W, Tag as P, Tooltip as je, Badge as V, Card as q, Row as Y, Col as D, Space as R, Input as L, Select as I, Button as U, Table as Ve, Tabs as ae, Descriptions as k, Switch as we } from "antd";
import { UserOutlined as se, EyeOutlined as ye, EditOutlined as te, UnlockOutlined as _e, MailOutlined as be, KeyOutlined as ve, ToolOutlined as Ee, UndoOutlined as ke, DeleteOutlined as Ue, ReloadOutlined as ze, ExportOutlined as Pe, UserAddOutlined as Se, ArrowLeftOutlined as Ae } from "@ant-design/icons";
import { useNavigate as H, Link as Ce, useParams as re } from "react-router-dom";
import { A as le, b as Fe, f as Z, U as Le, c as Te } from "./components.js";
import { a as h } from "./index.js";
import { P as J, f as $ } from "./base.js";
import { useTranslation as A } from "react-i18next";
import { useRequest as x } from "ahooks";
import { a as Ie, u as B, c as Re } from "./contexts.js";
import { A as Oe } from "./client.js";
const { Option: C } = I, De = ({ user: n, onClose: w, onSuccess: t }) => {
  const { t: a } = A("authorization"), [c, d] = T(null), [g, y] = T(null), { run: z, loading: i } = x(h.authorization.updateUser, {
    onSuccess: () => {
      o.success(a("user.updateUserSuccess", { defaultValue: "User updated successfully" })), t();
    },
    onError: (u) => {
      o.error(a("user.updateUserError", { defaultValue: "Failed to update user", error: u.message }));
    },
    manual: !0
  }), { data: _, loading: S } = x(async () => c === "bind" ? h.authorization.getLdapUsers({ skip_existing: !0 }).then((u) => {
    const m = [], b = [];
    for (const j of u)
      j.username === (n == null ? void 0 : n.username) || j.email === (n == null ? void 0 : n.email) || j.full_name === (n == null ? void 0 : n.full_name) ? m.push({ recommend: !0, ...j }) : b.push({ recommend: !1, ...j });
    return [...m, ...b];
  }) : Promise.resolve([]), {
    refreshDeps: [n == null ? void 0 : n.id, c]
  });
  return ee(() => {
    n && (d(null), y(null));
  }, [n]), /* @__PURE__ */ e.jsx(
    F,
    {
      open: n !== null,
      onCancel: w,
      onOk: () => {
        if (n) {
          if (c === "local")
            return z({ id: n.id }, { source: "local" });
          if (c === "bind") {
            if (!g) {
              o.error(a("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return z({ id: n.id }, { source: "ldap", ldap_dn: g });
          } else {
            o.error(a("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        o.error(a("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: a("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs(R, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(U, { loading: i, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: c === "local" ? "primary" : "default", onClick: () => d("local"), children: a("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(U, { loading: i, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: c === "bind" ? "primary" : "default", onClick: () => d("bind"), children: a("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          I,
          {
            loading: S,
            style: { display: c === "bind" ? "block" : "none" },
            onSelect: (u) => y(u),
            options: _ == null ? void 0 : _.map((u) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(P, { color: u.recommend ? "blue" : "default", children: u.full_name }),
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
}, Ne = () => {
  const { registerPageAI: n } = Ie(), { addTask: w } = B(), t = H(), { t: a } = A("authorization"), { t: c } = A("common"), [d] = p.useForm(), [g, y] = T([]), [z, i] = T(0), { enableMultiOrg: _ } = B(), [S, u] = T(null), [m, b] = T({
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
  const { data: j, loading: O } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [_],
    onError: (s) => {
      o.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: s.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), K = Q((s, l) => {
    if (O)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        l.name
      ] });
    const E = j == null ? void 0 : j.find((ge) => ge.id === s);
    return E ? `${E.name}:${l.name}` : l.name;
  }, [j, O]), { run: r, loading: f } = x(() => {
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
      y(s.data || []), i(s.total || 0);
    },
    onError: (s) => {
      o.error(a("user.loadError", { defaultValue: "Failed to load users", error: s.message }));
    },
    refreshDeps: [m]
  }), v = (s) => {
    b({
      ...m,
      current: J.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: s.keywords,
      status: s.status
    });
  }, G = (s, l) => {
    b((E) => ({
      ...E,
      current: s,
      page_size: l
    }));
  }, { run: ne } = x(h.authorization.restoreUser, {
    onSuccess: () => {
      o.success(a("user.restoreSuccess", { defaultValue: "User restored successfully" })), r();
    },
    onError: (s) => {
      o.error(a("user.restoreError", { defaultValue: "Failed to restore user", error: s.message }));
    },
    manual: !0
  }), { run: ue } = x(h.authorization.deleteUser, {
    onSuccess: () => {
      o.success(a("user.deleteSuccess", { defaultValue: "User deleted successfully" })), r();
    },
    onError: (s) => {
      o.error(a("user.deleteError", { defaultValue: "Failed to delete user", error: s.message }));
    },
    manual: !0
  }), { runAsync: ie } = x(
    (s) => h.authorization.resetUserPassword({ id: s.id }, { password: "" }),
    {
      manual: !0,
      onSuccess: (s, l) => {
        const E = l[0];
        o.success(a("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), s.new_password ? F.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: /* @__PURE__ */ e.jsx(W.Text, { copyable: { text: s.new_password }, children: a("user.resetPasswordSuccessContent", {
            defaultValue: `New password: ${s.new_password}`,
            password: s.new_password
          }) })
        }) : F.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: a("user.resetPasswordSuccessSendByEmail", {
            defaultValue: "The new password has been sent to the user email: {{email}}",
            email: E.email
          })
        });
      },
      onError: () => {
        o.error(a("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
      }
    }
  ), oe = (s, l, E) => {
    F.confirm({
      title: a("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: a("user.resetPasswordConfirm", {
        defaultValue: `Are you sure you want to reset the password for ${l}?`,
        username: l
      }),
      okText: c("confirm", { defaultValue: "Confirm" }),
      cancelText: c("cancel", { defaultValue: "Cancel" }),
      onOk: () => ie({ id: s, email: E })
    });
  }, { run: de, loading: ce } = x(
    () => h.authorization.createUserExportTask({
      keywords: m.keywords,
      status: m.status
    }),
    {
      onSuccess: (s) => {
        s.id ? o.success(
          a("user.exportTaskCreated", {
            defaultValue: "Export task created. You can view progress and download the file from the task list."
          })
        ) : o.success(a("user.exportTaskCreatedShort", { defaultValue: "Export task created." })), w(s);
      },
      onError: (s) => {
        o.error(
          a("user.exportError", {
            defaultValue: "Failed to create export task",
            error: (s == null ? void 0 : s.message) ?? String(s)
          })
        );
      },
      manual: !0
    }
  ), { runAsync: me } = x(
    (s) => h.authorization.unlockUser({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(a("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), r();
      },
      onError: (s) => {
        o.error(
          a("user.unlockError", {
            defaultValue: "Failed to unlock user: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), fe = (s) => {
    F.confirm({
      title: a("user.unlockTitle", { defaultValue: "Unlock User" }),
      content: a("user.unlockConfirm", {
        defaultValue: "Are you sure you want to unlock this user?",
        username: s.username
      }),
      onOk: () => me(s.id)
    });
  }, { runAsync: he } = x(
    (s) => h.authorization.resendActivationEmail({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(a("user.resendActivationSuccess", { defaultValue: "Activation email resent successfully" }));
      },
      onError: (s) => {
        o.error(
          a("user.resendActivationError", {
            defaultValue: "Failed to resend activation email: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), pe = (s) => {
    F.confirm({
      title: a("user.resendActivationTitle", { defaultValue: "Resend Activation Email" }),
      content: a("user.resendActivationConfirm", {
        defaultValue: "Resend activation email to {{email}}?",
        email: s.email
      }),
      onOk: () => he(s.id)
    });
  }, xe = [
    {
      title: a("user.username", { defaultValue: "Username" }),
      key: "user",
      render: (s, l) => /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          le,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(se, {}),
            src: l.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(Ce, { to: `/authorization/users/${l.id}`, children: l.username })
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
      render: (s, l) => {
        switch (s) {
          case "ldap":
            return l.ldap_dn ? /* @__PURE__ */ e.jsx(P, { color: "blue", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(je, { title: a("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(P, { color: "red", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) });
          case "oauth2":
            return /* @__PURE__ */ e.jsx(P, { color: "green", children: a("user.sourceOauth2", { defaultValue: "OAuth2" }) });
          default:
            return /* @__PURE__ */ e.jsx(P, { color: "default", children: a("user.sourceLocal", { defaultValue: "Local" }) });
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
            return /* @__PURE__ */ e.jsx(V, { status: "default", text: a("user.statusEnum.disabled", { defaultValue: "Disabled" }) });
          case "password_expired":
            return /* @__PURE__ */ e.jsx(V, { status: "warning", text: a("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) });
          case "active":
            return /* @__PURE__ */ e.jsx(V, { status: "success", text: a("user.statusEnum.active", { defaultValue: "Active" }) });
          case "locked":
            return /* @__PURE__ */ e.jsx(V, { status: "warning", text: a("user.statusEnum.locked", { defaultValue: "Locked" }) });
          case "deleted":
            return /* @__PURE__ */ e.jsx(V, { status: "error", text: a("user.statusEnum.deleted", { defaultValue: "Deleted" }) });
          case "pending_activation":
            return /* @__PURE__ */ e.jsx(V, { status: "processing", text: a("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) });
          default:
            return /* @__PURE__ */ e.jsx(V, { status: "default", text: a(`user.statusEnum.${s}`, { defaultValue: s.charAt(0).toUpperCase() + s.slice(1) }) });
        }
      }
    },
    {
      title: a("user.roles", { defaultValue: "Roles" }),
      dataIndex: "roles",
      key: "roles",
      render: (s) => /* @__PURE__ */ e.jsx("span", { children: s && s.length > 0 ? s.map((l) => /* @__PURE__ */ e.jsx(P, { color: "blue", children: l.organization_id ? K(l.organization_id, l) : l.name }, l.id)) : /* @__PURE__ */ e.jsx(P, { children: a("user.noRole", { defaultValue: "No Role" }) }) })
    },
    {
      title: a("user.mfa", { defaultValue: "MFA" }),
      dataIndex: "mfa_enabled",
      key: "mfa_enabled",
      render: (s) => s ? /* @__PURE__ */ e.jsx(V, { status: "success", text: a("user.mfaEnabled", { defaultValue: "Enabled" }) }) : /* @__PURE__ */ e.jsx(V, { status: "default", text: a("user.mfaDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("user.lastLogin", { defaultValue: "Last Login" }),
      dataIndex: "last_login",
      key: "last_login",
      render: (s) => s ? $(s) : a("user.neverLogin", { defaultValue: "Never" })
    },
    {
      title: c("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 150,
      render: (s, l) => {
        const E = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(ye, {}),
          tooltip: a("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: async () => t(`/authorization/users/${l.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(te, {}),
          tooltip: a("user.edit", { defaultValue: "Edit" }),
          hidden: l.status === "locked" || l.status === "deleted",
          onClick: async () => t(`/authorization/users/${l.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(_e, {}),
          tooltip: a("user.unlock", { defaultValue: "Unlock" }),
          hidden: l.status !== "locked",
          onClick: async () => fe(l)
        }, {
          key: "resendActivation",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(be, {}),
          tooltip: a("user.resendActivation", { defaultValue: "Resend Activation Email" }),
          hidden: l.status !== "pending_activation" || !l.email,
          onClick: async () => pe(l)
        }, {
          key: "resetPassword",
          permission: "authorization:user:reset_password",
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          disabled: l.disable_change_password,
          tooltip: l.disable_change_password ? a("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : a("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((l.source === "local" || l.source === "ldap" && l.ldap_dn) && l.status !== "deleted" && l.status !== "pending_activation"),
          onClick: async () => oe(l.id, l.username, l.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          tooltip: a("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(l.source === "ldap" && !l.ldap_dn && l.status !== "deleted"),
          onClick: async () => u(l)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ke, {}),
          tooltip: a("user.restore", { defaultValue: "Restore" }),
          hidden: l.status !== "deleted",
          confirm: {
            title: a("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => ne({ id: l.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(Ue, {}),
          tooltip: a("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: a("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => ue({ id: l.id }),
            okText: c("confirm", { defaultValue: "Confirm" }),
            cancelText: c("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(Fe, { actions: E }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(q, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      p,
      {
        form: d,
        layout: "vertical",
        onFinish: v,
        name: "userSearchForm",
        children: /* @__PURE__ */ e.jsxs(Y, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(D, { children: /* @__PURE__ */ e.jsxs(R, { children: [
            /* @__PURE__ */ e.jsx(p.Item, { name: "keywords", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              L.Search,
              {
                placeholder: a("user.keywords", { defaultValue: "Search by username, full name, or email" }),
                allowClear: !0,
                onSearch: () => {
                  v(d.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            /* @__PURE__ */ e.jsx(p.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(
              I,
              {
                placeholder: a("user.status", { defaultValue: "Status" }),
                allowClear: !0,
                onChange: () => {
                  v(d.getFieldsValue());
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
          /* @__PURE__ */ e.jsx(D, { children: /* @__PURE__ */ e.jsxs(R, { children: [
            /* @__PURE__ */ e.jsx(U, { icon: /* @__PURE__ */ e.jsx(ze, {}), onClick: r, children: c("refresh", { defaultValue: "Refresh" }) }),
            /* @__PURE__ */ e.jsx(Z, { permission: "authorization:user:export", children: /* @__PURE__ */ e.jsx(
              U,
              {
                icon: /* @__PURE__ */ e.jsx(Pe, {}),
                loading: ce,
                onClick: () => de(),
                children: a("user.export", { defaultValue: "Export" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(Z, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
              U,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Se, {}),
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
        /* @__PURE__ */ e.jsx(D, {}),
        /* @__PURE__ */ e.jsx(D, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Ve,
        {
          columns: xe,
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
    /* @__PURE__ */ e.jsx(De, { user: S, onClose: () => u(null), onSuccess: () => {
      u(null), r();
    } })
  ] });
}, sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ne
}, Symbol.toStringTag, { value: "Module" })), { Title: $e } = W, { TabPane: X } = ae, Me = () => {
  const { id: n } = re(), w = H(), { t } = A("authorization"), { t: a } = A("common"), { hasPermission: c } = Re(), { enableMultiOrg: d } = B(), { data: g, loading: y } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [d],
    onError: (u) => {
      o.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: u.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), z = Q((u, m) => {
    if (y)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        m.name
      ] });
    const b = g == null ? void 0 : g.find((j) => j.id === u);
    return b ? `${b.name}:${m.name}` : m.name;
  }, [g, y]), { data: i, loading: _ } = x(() => h.authorization.getUser({ id: n }), {
    ready: !!n,
    refreshDeps: [n],
    onError: (u) => {
      u instanceof Oe && u.code === "E4041" || (console.error("Failed to get user details:", u), o.error(t("user.detailLoadError", { defaultValue: "Failed to load user details" })));
    }
  });
  if (_)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(M, { size: "large" }) });
  if (!i)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx($e, { level: 4, children: t("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(U, { type: "primary", onClick: () => w("/authorization/users"), children: t("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const S = () => i.mfa_enabled ? /* @__PURE__ */ e.jsx(V, { status: "success", text: t("user.mfaEnabled", { defaultValue: "Enabled" }) }) : i.mfa_enforced ? /* @__PURE__ */ e.jsx(V, { status: "warning", text: t("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(V, { status: "default", text: t("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    q,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          le,
          {
            size: 48,
            icon: /* @__PURE__ */ e.jsx(se, {}),
            src: i.avatar,
            style: { marginRight: 16 }
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 20, fontWeight: "bold" }, children: i.username }),
          /* @__PURE__ */ e.jsx("div", { style: { color: "#888" }, children: i.email })
        ] })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(R, { children: [
        /* @__PURE__ */ e.jsx(
          U,
          {
            icon: /* @__PURE__ */ e.jsx(Ae, {}),
            onClick: () => w("/authorization/users"),
            children: a("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          U,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(te, {}),
            onClick: () => w(`/authorization/users/${n}/edit`),
            children: a("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(ae, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(X, { tab: t("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(k, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.username", { defaultValue: "Username" }), children: i.username }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.fullName", { defaultValue: "Full Name" }), children: i.full_name }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.email", { defaultValue: "Email" }), children: i.email }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.status", { defaultValue: "Status" }), children: i.status === "active" ? /* @__PURE__ */ e.jsx(V, { status: "success", text: t("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(V, { status: "error", text: t(`user.statusEnum.${i.status}`, { defaultValue: i.status.charAt(0).toUpperCase() + i.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.roles", { defaultValue: "Roles" }), span: 2, children: i.roles && i.roles.length > 0 ? i.roles.map((u) => /* @__PURE__ */ e.jsx(P, { color: "blue", children: d ? z(u.organization_id, u) : u.name }, u.id)) : /* @__PURE__ */ e.jsx(P, { children: t("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.mfa", { defaultValue: "MFA" }), children: S() }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.lastLogin", { defaultValue: "Last Login" }), children: i.last_login ? $(i.last_login) : t("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.createdAt", { defaultValue: "Created At" }), children: $(i.created_at) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.updatedAt", { defaultValue: "Updated At" }), children: $(i.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(X, { disabled: !c("authorization:user:view_audit_logs"), tab: t("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(Le, { userId: n || "" }) }, "logs")
      ] })
    }
  );
}, ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), { Option: N } = I, qe = () => {
  const { id: n = "" } = re(), w = H(), { t } = A("authorization"), { t: a } = A("common"), [c] = p.useForm(), d = !!n, { enableMultiOrg: g } = B(), { data: y, loading: z } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [g],
    onError: (r) => {
      o.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: r.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), i = Q((r, f) => {
    if (z)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        f.name
      ] });
    const v = y == null ? void 0 : y.find((G) => G.id === r);
    return v ? `${v.name}:${f.name}` : f.name;
  }, [y, z]), { data: _, loading: S } = x(async () => (await h.authorization.listRoles({})).data.map((f) => ({
    ...f,
    label: f.name,
    value: f.id
  }))), { loading: u, data: m } = x(
    async () => h.authorization.getUser({ id: n }),
    {
      ready: d && !!n,
      refreshDeps: [n, d],
      onSuccess: (r) => {
        c.setFieldsValue({
          username: r.username,
          email: r.email,
          avatar: r.avatar,
          full_name: r.full_name,
          status: r.status,
          role_ids: r.roles ? r.roles.map((f) => f.id) : [],
          mfa_enforced: r.mfa_enforced
        });
      },
      onError: () => {
        o.error(t("user.loadError", { defaultValue: "Failed to load user data" }));
      }
    }
  ), { run: b, loading: j } = x(
    async (r) => {
      if (d)
        return await h.authorization.updateUser(
          { id: n },
          {
            email: r.email,
            avatar: r.avatar,
            full_name: r.full_name,
            status: r.status,
            mfa_enforced: r.mfa_enforced,
            role_ids: r.role_ids
          }
        ), { mode: "update" };
      const f = {
        username: r.username,
        avatar: r.avatar,
        password: r.password,
        email: r.email,
        full_name: r.full_name,
        mfa_enforced: r.mfa_enforced,
        role_ids: r.role_ids
      };
      return { mode: "create", newUser: await h.authorization.createUser(f) };
    },
    {
      manual: !0,
      onSuccess: (r) => {
        r && (r.mode === "update" ? (o.success(t("user.updateSuccess", { defaultValue: "User updated successfully" })), w(`/authorization/users/${n}`)) : (o.success(t("user.createSuccess", { defaultValue: "User created successfully" })), w(`/authorization/users/${r.newUser.id}`)));
      },
      onError: (r) => {
        o.error(
          d ? t("user.updateError", {
            defaultValue: "Failed to update user",
            error: r instanceof Error ? r.message : String(r)
          }) : t("user.createError", {
            defaultValue: "Failed to create user",
            error: r instanceof Error ? r.message : String(r)
          })
        );
      }
    }
  ), O = (r, f) => d || !f ? Promise.resolve() : f.length < 8 ? Promise.reject(new Error(t("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve(), K = (r, f) => {
    if (d) return Promise.resolve();
    const v = c.getFieldValue("password");
    return v ? f ? f !== v ? Promise.reject(new Error(t("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(t("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" }))) : Promise.resolve();
  };
  return /* @__PURE__ */ e.jsx(
    q,
    {
      title: d ? t("user.editTitle", { defaultValue: "Edit User" }) : t("user.createTitle", { defaultValue: "Create User" }),
      loading: u || S,
      children: /* @__PURE__ */ e.jsxs(
        p,
        {
          form: c,
          layout: "horizontal",
          onFinish: b,
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
              p.Item,
              {
                name: "avatar",
                label: t("user.avatar", { defaultValue: "Avatar" }),
                children: /* @__PURE__ */ e.jsx(Te, {})
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "username",
                label: t("user.username", { defaultValue: "Username" }),
                rules: [
                  { required: !d, message: t("user.usernameRequired", { defaultValue: "Username is required" }) }
                ],
                children: /* @__PURE__ */ e.jsx(L, { disabled: d, placeholder: t("user.usernamePlaceholder", { defaultValue: "Enter username" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "email",
                label: t("user.email", { defaultValue: "Email" }),
                rules: [
                  { required: !0, message: t("user.emailRequired", { defaultValue: "Email is required" }) },
                  { type: "email", message: t("user.emailInvalid", { defaultValue: "Invalid email format" }) }
                ],
                children: /* @__PURE__ */ e.jsx(L, { placeholder: t("user.emailPlaceholder", { defaultValue: "Enter email address" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "full_name",
                label: t("user.fullName", { defaultValue: "Full Name" }),
                rules: [{ required: !0, message: t("user.fullNameRequired", { defaultValue: "Full name is required" }) }],
                children: /* @__PURE__ */ e.jsx(L, { placeholder: t("user.fullNamePlaceholder", { defaultValue: "Enter full name" }) })
              }
            ),
            d && /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "status",
                label: t("user.status", { defaultValue: "Status" }),
                rules: [{ required: !0, message: t("user.statusRequired", { defaultValue: "Status is required" }) }],
                children: /* @__PURE__ */ e.jsxs(I, { placeholder: t("user.statusPlaceholder", { defaultValue: "Select status" }), children: [
                  /* @__PURE__ */ e.jsx(N, { value: "active", children: t("user.statusActive", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(N, { value: "disabled", children: t("user.statusDisabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(N, { value: "password_expired", children: t("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) }),
                  (m == null ? void 0 : m.status) === "pending_activation" && /* @__PURE__ */ e.jsx(N, { value: "pending_activation", children: t("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) })
                ] })
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "mfa_enforced",
                label: t("user.mfaEnforced", { defaultValue: "MFA Enforced" }),
                children: /* @__PURE__ */ e.jsx(we, {})
              }
            ),
            !d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                p.Item,
                {
                  name: "password",
                  label: t("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: O }],
                  extra: /* @__PURE__ */ e.jsx(W.Text, { type: "secondary", style: { fontSize: 12 }, children: t("user.passwordHint", { defaultValue: "Leave blank to send an activation email to the user." }) }),
                  children: /* @__PURE__ */ e.jsx(L.Password, { autoComplete: "new-password", placeholder: t("user.passwordPlaceholder", { defaultValue: "Enter password (optional)" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                p.Item,
                {
                  name: "confirm_password",
                  label: t("user.confirmPassword", { defaultValue: "Confirm Password" }),
                  rules: [{ validator: K }],
                  dependencies: ["password"],
                  children: /* @__PURE__ */ e.jsx(L.Password, { autoComplete: "new-password", placeholder: t("user.confirmPasswordPlaceholder", { defaultValue: "Confirm password" }) })
                }
              )
            ] }),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "role_ids",
                label: t("user.roles", { defaultValue: "Roles" }),
                children: /* @__PURE__ */ e.jsx(
                  I,
                  {
                    mode: "multiple",
                    placeholder: t("user.selectRoles", { defaultValue: "Select roles" }),
                    options: _ == null ? void 0 : _.map((r) => ({
                      ...r,
                      label: g ? i(r.organization_id, r) : r.name
                    })),
                    optionFilterProp: "label",
                    loading: S
                  }
                )
              }
            ),
            /* @__PURE__ */ e.jsx(p.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs(R, { children: [
              /* @__PURE__ */ e.jsx(
                U,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: j,
                  children: d ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                U,
                {
                  onClick: () => w(d ? `/authorization/users/${n}` : "/authorization/users"),
                  children: a("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qe
}, Symbol.toStringTag, { value: "Module" }));
export {
  sa as U,
  ta as a,
  ra as b
};
