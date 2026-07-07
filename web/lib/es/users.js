import { j as e } from "./vendor.js";
import { useState as C, useEffect as te, useCallback as Y, useMemo as ye } from "react";
import { Form as g, message as o, Spin as B, Modal as F, Typography as Z, Tag as A, Tooltip as we, Badge as j, Card as K, Row as ee, Col as $, Space as M, Input as R, Select as O, Button as U, Table as be, Tabs as re, Descriptions as E, Switch as _e } from "antd";
import { UserOutlined as le, EyeOutlined as ke, EditOutlined as ne, UnlockOutlined as ve, SafetyOutlined as Ee, MailOutlined as Ue, KeyOutlined as ze, ToolOutlined as Ae, UndoOutlined as Se, DeleteOutlined as Pe, ReloadOutlined as Fe, ExportOutlined as Ce, UserAddOutlined as Te, ArrowLeftOutlined as Le } from "@ant-design/icons";
import { useNavigate as X, Link as Re, useParams as ue } from "react-router-dom";
import { A as ie, b as Oe, f as ae, U as Ie, c as De } from "./components.js";
import { a as p } from "./index.js";
import { P as H, f as q } from "./base.js";
import { useTranslation as T } from "react-i18next";
import { useRequest as x } from "ahooks";
import { a as Me, u as G, c as Ne } from "./contexts.js";
import { A as $e } from "./client.js";
const { Option: L } = O, qe = ({ user: n, onClose: y, onSuccess: t }) => {
  const { t: a } = T("authorization"), [f, m] = C(null), [V, z] = C(null), { run: w, loading: i } = x(p.authorization.updateUser, {
    onSuccess: () => {
      o.success(a("user.updateUserSuccess", { defaultValue: "User updated successfully" })), t();
    },
    onError: (u) => {
      o.error(a("user.updateUserError", { defaultValue: "Failed to update user", error: u.message }));
    },
    manual: !0
  }), { data: b, loading: S } = x(async () => f === "bind" ? p.authorization.getLdapUsers({ skip_existing: !0 }).then((u) => {
    const h = [], _ = [];
    for (const c of u)
      c.username === (n == null ? void 0 : n.username) || c.email === (n == null ? void 0 : n.email) || c.full_name === (n == null ? void 0 : n.full_name) ? h.push({ recommend: !0, ...c }) : _.push({ recommend: !1, ...c });
    return [...h, ..._];
  }) : Promise.resolve([]), {
    refreshDeps: [n == null ? void 0 : n.id, f]
  });
  return te(() => {
    n && (m(null), z(null));
  }, [n]), /* @__PURE__ */ e.jsx(
    F,
    {
      open: n !== null,
      onCancel: y,
      onOk: () => {
        if (n) {
          if (f === "local")
            return w({ id: n.id }, { source: "local" });
          if (f === "bind") {
            if (!V) {
              o.error(a("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return w({ id: n.id }, { source: "ldap", ldap_dn: V });
          } else {
            o.error(a("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        o.error(a("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: a("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs(M, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(U, { loading: i, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: f === "local" ? "primary" : "default", onClick: () => m("local"), children: a("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(U, { loading: i, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: f === "bind" ? "primary" : "default", onClick: () => m("bind"), children: a("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          O,
          {
            loading: S,
            style: { display: f === "bind" ? "block" : "none" },
            onSelect: (u) => z(u),
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
}, Be = () => {
  const { registerPageAI: n } = Me(), { addTask: y } = G(), t = X(), { t: a } = T("authorization"), { t: f } = T("common"), [m] = g.useForm(), [V, z] = C([]), [w, i] = C(0), { enableMultiOrg: b } = G(), [S, u] = C(null), [h, _] = C({
    current: H.DEFAULT_CURRENT,
    page_size: H.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  });
  te(() => {
    V && (n == null || n({
      pageData: () => V,
      pageDataDescription: "Returns the current user list as a JSON object."
    }));
  }, [n, V]);
  const { data: c, loading: N } = x(async () => (await p.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [b],
    onError: (s) => {
      o.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: s.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), J = Y((s, r) => {
    if (N)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(B, { size: "small" }),
        ":",
        r.name
      ] });
    const v = c == null ? void 0 : c.find((je) => je.id === s);
    return v ? `${v.name}:${r.name}` : r.name;
  }, [c, N]), { run: P, loading: Q } = x(() => {
    const s = {
      status: h.status,
      keywords: h.keywords
    };
    return p.authorization.listUsers({
      current: h.current,
      page_size: h.page_size,
      ...s
    });
  }, {
    onSuccess: (s) => {
      z(s.data || []), i(s.total || 0);
    },
    onError: (s) => {
      o.error(a("user.loadError", { defaultValue: "Failed to load users", error: s.message }));
    },
    refreshDeps: [h]
  }), I = (s) => {
    _({
      ...h,
      current: H.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: s.keywords,
      status: s.status
    });
  }, l = (s, r) => {
    _((v) => ({
      ...v,
      current: s,
      page_size: r
    }));
  }, { run: d } = x(p.authorization.restoreUser, {
    onSuccess: () => {
      o.success(a("user.restoreSuccess", { defaultValue: "User restored successfully" })), P();
    },
    onError: (s) => {
      o.error(a("user.restoreError", { defaultValue: "Failed to restore user", error: s.message }));
    },
    manual: !0
  }), { run: k } = x(p.authorization.deleteUser, {
    onSuccess: () => {
      o.success(a("user.deleteSuccess", { defaultValue: "User deleted successfully" })), P();
    },
    onError: (s) => {
      o.error(a("user.deleteError", { defaultValue: "Failed to delete user", error: s.message }));
    },
    manual: !0
  }), { runAsync: W } = x(
    (s) => p.authorization.resetUserPassword({ id: s.id }, { password: "" }),
    {
      manual: !0,
      onSuccess: (s, r) => {
        const v = r[0];
        o.success(a("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), s.new_password ? F.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: /* @__PURE__ */ e.jsx(Z.Text, { copyable: { text: s.new_password }, children: a("user.resetPasswordSuccessContent", {
            defaultValue: `New password: ${s.new_password}`,
            password: s.new_password
          }) })
        }) : F.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: a("user.resetPasswordSuccessSendByEmail", {
            defaultValue: "The new password has been sent to the user email: {{email}}",
            email: v.email
          })
        });
      },
      onError: () => {
        o.error(a("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
      }
    }
  ), oe = (s, r, v) => {
    F.confirm({
      title: a("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: a("user.resetPasswordConfirm", {
        defaultValue: `Are you sure you want to reset the password for ${r}?`,
        username: r
      }),
      okText: f("confirm", { defaultValue: "Confirm" }),
      cancelText: f("cancel", { defaultValue: "Cancel" }),
      onOk: () => W({ id: s, email: v })
    });
  }, { run: de, loading: ce } = x(
    () => p.authorization.createUserExportTask({
      keywords: h.keywords,
      status: h.status
    }),
    {
      onSuccess: (s) => {
        s.id ? o.success(
          a("user.exportTaskCreated", {
            defaultValue: "Export task created. You can view progress and download the file from the task list."
          })
        ) : o.success(a("user.exportTaskCreatedShort", { defaultValue: "Export task created." })), y(s);
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
    (s) => p.authorization.unlockUser({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(a("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), P();
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
    (s) => p.authorization.adminDisableUserMfa({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(a("user.adminDisableMFASuccess", { defaultValue: "MFA disabled successfully" })), P();
      },
      onError: (s) => {
        o.error(
          a("user.adminDisableMFAError", {
            defaultValue: "Failed to disable MFA: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), pe = (s) => {
    F.confirm({
      title: a("user.adminDisableMFATitle", { defaultValue: "Disable MFA" }),
      content: a("user.adminDisableMFAConfirm", {
        defaultValue: "Are you sure you want to disable MFA for this user? They will be logged out of all sessions.",
        username: s.username
      }),
      okType: "danger",
      onOk: () => he(s.id)
    });
  }, { runAsync: xe } = x(
    (s) => p.authorization.resendActivationEmail({ id: s }),
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
  ), ge = (s) => {
    F.confirm({
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
          ie,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(le, {}),
            src: r.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(Re, { to: `/authorization/users/${r.id}`, children: r.username })
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
            return r.ldap_dn ? /* @__PURE__ */ e.jsx(A, { color: "blue", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(we, { title: a("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(A, { color: "red", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) });
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
      render: (s) => /* @__PURE__ */ e.jsx("span", { children: s && s.length > 0 ? s.map((r) => /* @__PURE__ */ e.jsx(A, { color: "blue", children: r.organization_id ? J(r.organization_id, r) : r.name }, r.id)) : /* @__PURE__ */ e.jsx(A, { children: a("user.noRole", { defaultValue: "No Role" }) }) })
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
      title: f("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 150,
      render: (s, r) => {
        const v = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(ke, {}),
          tooltip: a("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: async () => t(`/authorization/users/${r.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ne, {}),
          tooltip: a("user.edit", { defaultValue: "Edit" }),
          hidden: r.status === "locked" || r.status === "deleted",
          onClick: async () => t(`/authorization/users/${r.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          tooltip: a("user.unlock", { defaultValue: "Unlock" }),
          hidden: r.status !== "locked",
          onClick: async () => fe(r)
        }, {
          key: "disableMFA",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          tooltip: a("user.adminDisableMFA", { defaultValue: "Disable MFA" }),
          hidden: !r.mfa_enabled || r.status === "deleted",
          danger: !0,
          onClick: async () => pe(r)
        }, {
          key: "resendActivation",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ue, {}),
          tooltip: a("user.resendActivation", { defaultValue: "Resend Activation Email" }),
          hidden: r.status !== "pending_activation" || !r.email,
          onClick: async () => ge(r)
        }, {
          key: "resetPassword",
          permission: "authorization:user:reset_password",
          icon: /* @__PURE__ */ e.jsx(ze, {}),
          disabled: r.disable_change_password,
          tooltip: r.disable_change_password ? a("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : a("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((r.source === "local" || r.source === "ldap" && r.ldap_dn) && r.status !== "deleted" && r.status !== "pending_activation"),
          onClick: async () => oe(r.id, r.username, r.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ae, {}),
          tooltip: a("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(r.source === "ldap" && !r.ldap_dn && r.status !== "deleted"),
          onClick: async () => u(r)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Se, {}),
          tooltip: a("user.restore", { defaultValue: "Restore" }),
          hidden: r.status !== "deleted",
          confirm: {
            title: a("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => d({ id: r.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(Pe, {}),
          tooltip: a("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: a("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => k({ id: r.id }),
            okText: f("confirm", { defaultValue: "Confirm" }),
            cancelText: f("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(Oe, { actions: v }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(K, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      g,
      {
        form: m,
        layout: "vertical",
        onFinish: I,
        name: "userSearchForm",
        children: /* @__PURE__ */ e.jsxs(ee, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx($, { children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(g.Item, { name: "keywords", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              R.Search,
              {
                placeholder: a("user.keywords", { defaultValue: "Search by username, full name, or email" }),
                allowClear: !0,
                onSearch: () => {
                  I(m.getFieldsValue());
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
                  I(m.getFieldsValue());
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
            /* @__PURE__ */ e.jsx(U, { icon: /* @__PURE__ */ e.jsx(Fe, {}), onClick: P, children: f("refresh", { defaultValue: "Refresh" }) }),
            /* @__PURE__ */ e.jsx(ae, { permission: "authorization:user:export", children: /* @__PURE__ */ e.jsx(
              U,
              {
                icon: /* @__PURE__ */ e.jsx(Ce, {}),
                loading: ce,
                onClick: () => de(),
                children: a("user.export", { defaultValue: "Export" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ae, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
              U,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Te, {}),
                onClick: () => t("/authorization/users/create"),
                children: a("user.create", { defaultValue: "Create User" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(K, { children: [
      /* @__PURE__ */ e.jsxs(ee, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx($, {}),
        /* @__PURE__ */ e.jsx($, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        be,
        {
          columns: Ve,
          dataSource: V,
          rowKey: "id",
          loading: Q,
          pagination: {
            current: h.current,
            pageSize: h.page_size,
            total: w,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (s) => f("totalItems", { defaultValue: `Total ${s} items`, total: s }),
            onChange: l
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(qe, { user: S, onClose: () => u(null), onSuccess: () => {
      u(null), P();
    } })
  ] });
}, na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Be
}, Symbol.toStringTag, { value: "Module" })), { Title: Ke } = Z, { TabPane: se } = re, Ge = () => {
  const { id: n } = ue(), y = X(), { t } = T("authorization"), { t: a } = T("common"), { hasPermission: f } = Ne(), { enableMultiOrg: m } = G(), { data: V, loading: z } = x(async () => (await p.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [m],
    onError: (u) => {
      o.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: u.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), w = Y((u, h) => {
    if (z)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(B, { size: "small" }),
        ":",
        h.name
      ] });
    const _ = V == null ? void 0 : V.find((c) => c.id === u);
    return _ ? `${_.name}:${h.name}` : h.name;
  }, [V, z]), { data: i, loading: b } = x(() => p.authorization.getUser({ id: n }), {
    ready: !!n,
    refreshDeps: [n],
    onError: (u) => {
      u instanceof $e && u.code === "E4041" || (console.error("Failed to get user details:", u), o.error(t("user.detailLoadError", { defaultValue: "Failed to load user details" })));
    }
  });
  if (b)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(B, { size: "large" }) });
  if (!i)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(Ke, { level: 4, children: t("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(U, { type: "primary", onClick: () => y("/authorization/users"), children: t("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const S = () => i.mfa_enabled ? /* @__PURE__ */ e.jsx(j, { status: "success", text: t("user.mfaEnabled", { defaultValue: "Enabled" }) }) : i.mfa_enforced ? /* @__PURE__ */ e.jsx(j, { status: "warning", text: t("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(j, { status: "default", text: t("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    K,
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
            icon: /* @__PURE__ */ e.jsx(Le, {}),
            onClick: () => y("/authorization/users"),
            children: a("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          U,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ne, {}),
            onClick: () => y(`/authorization/users/${n}/edit`),
            children: a("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(re, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(se, { tab: t("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(E, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.username", { defaultValue: "Username" }), children: i.username }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.fullName", { defaultValue: "Full Name" }), children: i.full_name }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.email", { defaultValue: "Email" }), children: i.email }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.status", { defaultValue: "Status" }), children: i.status === "active" ? /* @__PURE__ */ e.jsx(j, { status: "success", text: t("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(j, { status: "error", text: t(`user.statusEnum.${i.status}`, { defaultValue: i.status.charAt(0).toUpperCase() + i.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.roles", { defaultValue: "Roles" }), span: 2, children: i.roles && i.roles.length > 0 ? i.roles.map((u) => /* @__PURE__ */ e.jsx(A, { color: "blue", children: m ? w(u.organization_id, u) : u.name }, u.id)) : /* @__PURE__ */ e.jsx(A, { children: t("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.mfa", { defaultValue: "MFA" }), children: S() }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.lastLogin", { defaultValue: "Last Login" }), children: i.last_login ? q(i.last_login) : t("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.createdAt", { defaultValue: "Created At" }), children: q(i.created_at) }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.updatedAt", { defaultValue: "Updated At" }), children: q(i.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(se, { disabled: !f("authorization:user:view_audit_logs"), tab: t("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(Ie, { userId: n || "" }) }, "logs")
      ] })
    }
  );
}, ua = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ge
}, Symbol.toStringTag, { value: "Module" })), { Option: D } = O, Je = () => {
  const { id: n = "" } = ue(), y = X(), { t } = T("authorization"), { t: a } = T("common"), [f] = g.useForm(), m = !!n, [V, z] = C(""), { enableMultiOrg: w } = G(), { data: i, loading: b } = x(async () => (await p.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [w],
    onError: (l) => {
      o.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: l.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), S = Y((l, d) => {
    if (b)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(B, { size: "small" }),
        ":",
        d.name
      ] });
    const k = i == null ? void 0 : i.find((W) => W.id === l);
    return k ? `${k.name}:${d.name}` : d.name;
  }, [i, b]), { data: u, loading: h } = x(async () => (await p.authorization.listRoles({ search: V || void 0 })).data.map((d) => ({
    ...d,
    label: d.name,
    value: d.id
  })), {
    refreshDeps: [V]
  }), { loading: _, data: c } = x(
    async () => p.authorization.getUser({ id: n }),
    {
      ready: m && !!n,
      refreshDeps: [n, m],
      onSuccess: (l) => {
        f.setFieldsValue({
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
        o.error(t("user.loadError", { defaultValue: "Failed to load user data" }));
      }
    }
  ), N = ye(() => [...(c == null ? void 0 : c.roles.filter((d) => !(u != null && u.some((k) => k.id === d.id)))) || [], ...u || []].map((d) => ({
    ...d,
    label: w ? S(d.organization_id, d) : d.name || "",
    value: d.id
  })), [u, w, S, c == null ? void 0 : c.roles]), { run: J, loading: P } = x(
    async (l) => {
      if (m)
        return await p.authorization.updateUser(
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
      const d = {
        username: l.username,
        avatar: l.avatar,
        password: l.password,
        email: l.email,
        full_name: l.full_name,
        mfa_enforced: l.mfa_enforced,
        role_ids: l.role_ids
      };
      return { mode: "create", newUser: await p.authorization.createUser(d) };
    },
    {
      manual: !0,
      onSuccess: (l) => {
        l && (l.mode === "update" ? (o.success(t("user.updateSuccess", { defaultValue: "User updated successfully" })), y(`/authorization/users/${n}`)) : (o.success(t("user.createSuccess", { defaultValue: "User created successfully" })), y(`/authorization/users/${l.newUser.id}`)));
      },
      onError: (l) => {
        o.error(
          m ? t("user.updateError", {
            defaultValue: "Failed to update user",
            error: l instanceof Error ? l.message : String(l)
          }) : t("user.createError", {
            defaultValue: "Failed to create user",
            error: l instanceof Error ? l.message : String(l)
          })
        );
      }
    }
  ), Q = (l, d) => m || !d ? Promise.resolve() : d.length < 8 ? Promise.reject(new Error(t("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve(), I = (l, d) => {
    if (m) return Promise.resolve();
    const k = f.getFieldValue("password");
    return k ? d ? d !== k ? Promise.reject(new Error(t("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(t("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" }))) : Promise.resolve();
  };
  return /* @__PURE__ */ e.jsx(
    K,
    {
      title: m ? t("user.editTitle", { defaultValue: "Edit User" }) : t("user.createTitle", { defaultValue: "Create User" }),
      loading: _,
      children: /* @__PURE__ */ e.jsxs(
        g,
        {
          form: f,
          layout: "horizontal",
          onFinish: J,
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
                children: /* @__PURE__ */ e.jsx(De, {})
              }
            ),
            /* @__PURE__ */ e.jsx(
              g.Item,
              {
                name: "username",
                label: t("user.username", { defaultValue: "Username" }),
                rules: [
                  { required: !m, message: t("user.usernameRequired", { defaultValue: "Username is required" }) }
                ],
                children: /* @__PURE__ */ e.jsx(R, { disabled: m, placeholder: t("user.usernamePlaceholder", { defaultValue: "Enter username" }) })
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
            m && /* @__PURE__ */ e.jsx(
              g.Item,
              {
                name: "status",
                label: t("user.status", { defaultValue: "Status" }),
                rules: [{ required: !0, message: t("user.statusRequired", { defaultValue: "Status is required" }) }],
                children: /* @__PURE__ */ e.jsxs(O, { placeholder: t("user.statusPlaceholder", { defaultValue: "Select status" }), children: [
                  /* @__PURE__ */ e.jsx(D, { value: "active", children: t("user.statusActive", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(D, { value: "disabled", children: t("user.statusDisabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(D, { value: "password_expired", children: t("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) }),
                  (c == null ? void 0 : c.status) === "pending_activation" && /* @__PURE__ */ e.jsx(D, { value: "pending_activation", children: t("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) }),
                  (c == null ? void 0 : c.status) === "locked" && /* @__PURE__ */ e.jsx(D, { value: "locked", children: t("user.statusEnum.locked", { defaultValue: "Locked" }) })
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
            !m && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "password",
                  label: t("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: Q }],
                  extra: /* @__PURE__ */ e.jsx(Z.Text, { type: "secondary", style: { fontSize: 12 }, children: t("user.passwordHint", { defaultValue: "Leave blank to send an activation email to the user." }) }),
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
                    onSearch: (l) => z(l),
                    placeholder: t("user.selectRoles", { defaultValue: "Select roles" }),
                    options: N,
                    optionFilterProp: "label",
                    loading: h
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
                  loading: P,
                  children: m ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                U,
                {
                  onClick: () => y(m ? `/authorization/users/${n}` : "/authorization/users"),
                  children: a("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Je
}, Symbol.toStringTag, { value: "Module" }));
export {
  na as U,
  ua as a,
  ia as b
};
