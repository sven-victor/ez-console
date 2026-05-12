import { j as e } from "./vendor.js";
import { useState as T, useEffect as X, useCallback as J } from "react";
import { Form as p, message as o, Spin as M, Modal as F, Typography as Q, Tag as z, Tooltip as je, Badge as V, Card as q, Row as H, Col as N, Space as O, Input as L, Select as I, Button as v, Table as Ve, Tabs as ee, Descriptions as k, Switch as we } from "antd";
import { UserOutlined as ae, EyeOutlined as ye, EditOutlined as se, UnlockOutlined as be, MailOutlined as _e, KeyOutlined as Ee, ToolOutlined as ke, UndoOutlined as ve, DeleteOutlined as Ue, ReloadOutlined as ze, ExportOutlined as Pe, UserAddOutlined as Se, ArrowLeftOutlined as Ae } from "@ant-design/icons";
import { useNavigate as W, Link as Ce, useParams as te } from "react-router-dom";
import { A as re, b as Fe, f as Y, U as Le, c as Te } from "./components.js";
import { a as h } from "./index.js";
import { P as K, f as $ } from "./base.js";
import { useTranslation as A } from "react-i18next";
import { useRequest as x } from "ahooks";
import { a as Ie, u as B, c as Re } from "./contexts.js";
import { A as Oe } from "./client.js";
const { Option: C } = I, De = ({ user: n, onClose: w, onSuccess: t }) => {
  const { t: a } = A("authorization"), [m, d] = T(null), [g, y] = T(null), { run: U, loading: i } = x(h.authorization.updateUser, {
    onSuccess: () => {
      o.success(a("user.updateUserSuccess", { defaultValue: "User updated successfully" })), t();
    },
    onError: (u) => {
      o.error(a("user.updateUserError", { defaultValue: "Failed to update user", error: u.message }));
    },
    manual: !0
  }), { data: b, loading: P } = x(async () => m === "bind" ? h.authorization.getLdapUsers({ skip_existing: !0 }).then((u) => {
    const f = [], _ = [];
    for (const j of u)
      j.username === (n == null ? void 0 : n.username) || j.email === (n == null ? void 0 : n.email) || j.full_name === (n == null ? void 0 : n.full_name) ? f.push({ recommend: !0, ...j }) : _.push({ recommend: !1, ...j });
    return [...f, ..._];
  }) : Promise.resolve([]), {
    refreshDeps: [n == null ? void 0 : n.id, m]
  });
  return X(() => {
    n && (d(null), y(null));
  }, [n]), /* @__PURE__ */ e.jsx(
    F,
    {
      open: n !== null,
      onCancel: w,
      onOk: () => {
        if (n) {
          if (m === "local")
            return U({ id: n.id }, { source: "local" });
          if (m === "bind") {
            if (!g) {
              o.error(a("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return U({ id: n.id }, { source: "ldap", ldap_dn: g });
          } else {
            o.error(a("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        o.error(a("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: a("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs(O, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(v, { loading: i, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: m === "local" ? "primary" : "default", onClick: () => d("local"), children: a("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(v, { loading: i, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: m === "bind" ? "primary" : "default", onClick: () => d("bind"), children: a("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          I,
          {
            loading: P,
            style: { display: m === "bind" ? "block" : "none" },
            onSelect: (u) => y(u),
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
}, Ne = () => {
  const { registerPageAI: n } = Ie(), { addTask: w } = B(), t = W(), { t: a } = A("authorization"), { t: m } = A("common"), [d] = p.useForm(), [g, y] = T([]), [U, i] = T(0), { enableMultiOrg: b } = B(), [P, u] = T(null), [f, _] = T({
    current: K.DEFAULT_CURRENT,
    page_size: K.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  });
  X(() => {
    g && (n == null || n({
      pageData: () => g,
      pageDataDescription: "Returns the current user list as a JSON object."
    }));
  }, [n, g]);
  const { data: j, loading: D } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [b],
    onError: (s) => {
      o.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: s.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), l = J((s, r) => {
    if (D)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        r.name
      ] });
    const E = j == null ? void 0 : j.find((ge) => ge.id === s);
    return E ? `${E.name}:${r.name}` : r.name;
  }, [j, D]), { run: c, loading: S } = x(() => {
    const s = {
      status: f.status,
      keywords: f.keywords
    };
    return h.authorization.listUsers({
      current: f.current,
      page_size: f.page_size,
      ...s
    });
  }, {
    onSuccess: (s) => {
      y(s.data || []), i(s.total || 0);
    },
    onError: (s) => {
      o.error(a("user.loadError", { defaultValue: "Failed to load users", error: s.message }));
    },
    refreshDeps: [f]
  }), R = (s) => {
    _({
      ...f,
      current: K.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: s.keywords,
      status: s.status
    });
  }, le = (s, r) => {
    _((E) => ({
      ...E,
      current: s,
      page_size: r
    }));
  }, { run: ne } = x(h.authorization.restoreUser, {
    onSuccess: () => {
      o.success(a("user.restoreSuccess", { defaultValue: "User restored successfully" })), c();
    },
    onError: (s) => {
      o.error(a("user.restoreError", { defaultValue: "Failed to restore user", error: s.message }));
    },
    manual: !0
  }), { run: ue } = x(h.authorization.deleteUser, {
    onSuccess: () => {
      o.success(a("user.deleteSuccess", { defaultValue: "User deleted successfully" })), c();
    },
    onError: (s) => {
      o.error(a("user.deleteError", { defaultValue: "Failed to delete user", error: s.message }));
    },
    manual: !0
  }), { runAsync: ie } = x(
    (s) => h.authorization.resetUserPassword({ id: s.id }, { password: "" }),
    {
      manual: !0,
      onSuccess: (s, r) => {
        const E = r[0];
        o.success(a("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), s.new_password ? F.info({
          title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: /* @__PURE__ */ e.jsx(Q.Text, { copyable: { text: s.new_password }, children: a("user.resetPasswordSuccessContent", {
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
  ), oe = (s, r, E) => {
    F.confirm({
      title: a("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: a("user.resetPasswordConfirm", {
        defaultValue: `Are you sure you want to reset the password for ${r}?`,
        username: r
      }),
      okText: m("confirm", { defaultValue: "Confirm" }),
      cancelText: m("cancel", { defaultValue: "Cancel" }),
      onOk: () => ie({ id: s, email: E })
    });
  }, { run: de, loading: ce } = x(
    () => h.authorization.createUserExportTask({
      keywords: f.keywords,
      status: f.status
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
        o.success(a("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), c();
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
      render: (s, r) => /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          re,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(ae, {}),
            src: r.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(Ce, { to: `/authorization/users/${r.id}`, children: r.username })
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
            return r.ldap_dn ? /* @__PURE__ */ e.jsx(z, { color: "blue", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(je, { title: a("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(z, { color: "red", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) });
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
      render: (s) => /* @__PURE__ */ e.jsx("span", { children: s && s.length > 0 ? s.map((r) => /* @__PURE__ */ e.jsx(z, { color: "blue", children: r.organization_id ? l(r.organization_id, r) : r.name }, r.id)) : /* @__PURE__ */ e.jsx(z, { children: a("user.noRole", { defaultValue: "No Role" }) }) })
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
      title: m("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 150,
      render: (s, r) => {
        const E = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(ye, {}),
          tooltip: a("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: async () => t(`/authorization/users/${r.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(se, {}),
          tooltip: a("user.edit", { defaultValue: "Edit" }),
          hidden: r.status === "locked" || r.status === "deleted",
          onClick: async () => t(`/authorization/users/${r.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(be, {}),
          tooltip: a("user.unlock", { defaultValue: "Unlock" }),
          hidden: r.status !== "locked",
          onClick: async () => fe(r)
        }, {
          key: "resendActivation",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(_e, {}),
          tooltip: a("user.resendActivation", { defaultValue: "Resend Activation Email" }),
          hidden: r.status !== "pending_activation" || !r.email,
          onClick: async () => pe(r)
        }, {
          key: "resetPassword",
          permission: "authorization:user:resetPassword",
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          disabled: r.disable_change_password,
          tooltip: r.disable_change_password ? a("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : a("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((r.source === "local" || r.source === "ldap" && r.ldap_dn) && r.status !== "deleted" && r.status !== "pending_activation"),
          onClick: async () => oe(r.id, r.username, r.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ke, {}),
          tooltip: a("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(r.source === "ldap" && !r.ldap_dn && r.status !== "deleted"),
          onClick: async () => u(r)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          tooltip: a("user.restore", { defaultValue: "Restore" }),
          hidden: r.status !== "deleted",
          confirm: {
            title: a("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => ne({ id: r.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(Ue, {}),
          tooltip: a("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: a("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => ue({ id: r.id }),
            okText: m("confirm", { defaultValue: "Confirm" }),
            cancelText: m("cancel", { defaultValue: "Cancel" })
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
        onFinish: R,
        name: "userSearchForm",
        children: /* @__PURE__ */ e.jsxs(H, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(N, { children: /* @__PURE__ */ e.jsxs(O, { children: [
            /* @__PURE__ */ e.jsx(p.Item, { name: "keywords", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              L.Search,
              {
                placeholder: a("user.keywords", { defaultValue: "Search by username, full name, or email" }),
                allowClear: !0,
                onSearch: () => {
                  R(d.getFieldsValue());
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
                  R(d.getFieldsValue());
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
          /* @__PURE__ */ e.jsx(N, { children: /* @__PURE__ */ e.jsxs(O, { children: [
            /* @__PURE__ */ e.jsx(v, { icon: /* @__PURE__ */ e.jsx(ze, {}), onClick: c, children: m("refresh", { defaultValue: "Refresh" }) }),
            /* @__PURE__ */ e.jsx(Y, { permission: "authorization:user:export", children: /* @__PURE__ */ e.jsx(
              v,
              {
                icon: /* @__PURE__ */ e.jsx(Pe, {}),
                loading: ce,
                onClick: () => de(),
                children: a("user.export", { defaultValue: "Export" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(Y, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
              v,
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
      /* @__PURE__ */ e.jsxs(H, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx(N, {}),
        /* @__PURE__ */ e.jsx(N, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Ve,
        {
          columns: xe,
          dataSource: g,
          rowKey: "id",
          loading: S,
          pagination: {
            current: f.current,
            pageSize: f.page_size,
            total: U,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (s) => m("totalItems", { defaultValue: `Total ${s} items`, total: s }),
            onChange: le
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(De, { user: P, onClose: () => u(null), onSuccess: () => {
      u(null), c();
    } })
  ] });
}, sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ne
}, Symbol.toStringTag, { value: "Module" })), { Title: $e } = Q, { TabPane: Z } = ee, Me = () => {
  const { id: n } = te(), w = W(), { t } = A("authorization"), { t: a } = A("common"), { hasPermission: m } = Re(), { enableMultiOrg: d } = B(), { data: g, loading: y } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [d],
    onError: (u) => {
      o.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: u.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), U = J((u, f) => {
    if (y)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        f.name
      ] });
    const _ = g == null ? void 0 : g.find((j) => j.id === u);
    return _ ? `${_.name}:${f.name}` : f.name;
  }, [g, y]), { data: i, loading: b } = x(() => h.authorization.getUser({ id: n }), {
    ready: !!n,
    refreshDeps: [n],
    onError: (u) => {
      u instanceof Oe && u.code === "E4041" || (console.error("Failed to get user details:", u), o.error(t("user.detailLoadError", { defaultValue: "Failed to load user details" })));
    }
  });
  if (b)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(M, { size: "large" }) });
  if (!i)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx($e, { level: 4, children: t("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(v, { type: "primary", onClick: () => w("/authorization/users"), children: t("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const P = () => i.mfa_enabled ? /* @__PURE__ */ e.jsx(V, { status: "success", text: t("user.mfaEnabled", { defaultValue: "Enabled" }) }) : i.mfa_enforced ? /* @__PURE__ */ e.jsx(V, { status: "warning", text: t("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(V, { status: "default", text: t("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    q,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          re,
          {
            size: 64,
            icon: /* @__PURE__ */ e.jsx(ae, {}),
            src: i.avatar,
            style: { marginRight: 16 }
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 20, fontWeight: "bold" }, children: i.username }),
          /* @__PURE__ */ e.jsx("div", { style: { color: "#888" }, children: i.email })
        ] })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(O, { children: [
        /* @__PURE__ */ e.jsx(
          v,
          {
            icon: /* @__PURE__ */ e.jsx(Ae, {}),
            onClick: () => w("/authorization/users"),
            children: a("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          v,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(se, {}),
            onClick: () => w(`/authorization/users/${n}/edit`),
            children: a("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(ee, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(Z, { tab: t("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(k, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.username", { defaultValue: "Username" }), children: i.username }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.fullName", { defaultValue: "Full Name" }), children: i.full_name }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.email", { defaultValue: "Email" }), children: i.email }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.status", { defaultValue: "Status" }), children: i.status === "active" ? /* @__PURE__ */ e.jsx(V, { status: "success", text: t("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(V, { status: "error", text: t(`user.statusEnum.${i.status}`, { defaultValue: i.status.charAt(0).toUpperCase() + i.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.roles", { defaultValue: "Roles" }), span: 2, children: i.roles && i.roles.length > 0 ? i.roles.map((u) => /* @__PURE__ */ e.jsx(z, { color: "blue", children: d ? U(u.organization_id, u) : u.name }, u.id)) : /* @__PURE__ */ e.jsx(z, { children: t("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.mfa", { defaultValue: "MFA" }), children: P() }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.lastLogin", { defaultValue: "Last Login" }), children: i.last_login ? $(i.last_login) : t("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.createdAt", { defaultValue: "Created At" }), children: $(i.created_at) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: t("user.updatedAt", { defaultValue: "Updated At" }), children: $(i.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(Z, { disabled: !m("authorization:user:view_audit_logs"), tab: t("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(Le, { userId: n || "" }) }, "logs")
      ] })
    }
  );
}, ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), { Option: G } = I, qe = () => {
  const { id: n = "" } = te(), w = W(), { t } = A("authorization"), { t: a } = A("common"), [m] = p.useForm(), d = !!n, { enableMultiOrg: g } = B(), { data: y, loading: U } = x(async () => (await h.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [g],
    onError: (l) => {
      o.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: l.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), i = J((l, c) => {
    if (U)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        c.name
      ] });
    const S = y == null ? void 0 : y.find((R) => R.id === l);
    return S ? `${S.name}:${c.name}` : c.name;
  }, [y, U]), { data: b, loading: P } = x(async () => (await h.authorization.listRoles({})).data.map((c) => ({
    ...c,
    label: c.name,
    value: c.id
  }))), { loading: u } = x(
    async () => h.authorization.getUser({ id: n }),
    {
      ready: d && !!n,
      refreshDeps: [n, d],
      onSuccess: (l) => {
        m.setFieldsValue({
          username: l.username,
          email: l.email,
          full_name: l.full_name,
          status: l.status,
          role_ids: l.roles ? l.roles.map((c) => c.id) : [],
          mfa_enforced: l.mfa_enforced
        });
      },
      onError: () => {
        o.error(t("user.loadError", { defaultValue: "Failed to load user data" }));
      }
    }
  ), { run: f, loading: _ } = x(
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
      const c = {
        username: l.username,
        avatar: l.avatar,
        password: l.password,
        email: l.email,
        full_name: l.full_name,
        mfa_enforced: l.mfa_enforced,
        role_ids: l.role_ids
      };
      return { mode: "create", newUser: await h.authorization.createUser(c) };
    },
    {
      manual: !0,
      onSuccess: (l) => {
        l && (l.mode === "update" ? (o.success(t("user.updateSuccess", { defaultValue: "User updated successfully" })), w(`/authorization/users/${n}`)) : (o.success(t("user.createSuccess", { defaultValue: "User created successfully" })), w(`/authorization/users/${l.newUser.id}`)));
      },
      onError: (l) => {
        o.error(
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
  ), j = (l, c) => d || !c ? Promise.resolve() : c.length < 8 ? Promise.reject(new Error(t("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve(), D = (l, c) => {
    if (d) return Promise.resolve();
    const S = m.getFieldValue("password");
    return S ? c ? c !== S ? Promise.reject(new Error(t("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(t("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" }))) : Promise.resolve();
  };
  return /* @__PURE__ */ e.jsx(
    q,
    {
      title: d ? t("user.editTitle", { defaultValue: "Edit User" }) : t("user.createTitle", { defaultValue: "Create User" }),
      loading: u || P,
      children: /* @__PURE__ */ e.jsxs(
        p,
        {
          form: m,
          layout: "horizontal",
          onFinish: f,
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
                  /* @__PURE__ */ e.jsx(G, { value: "active", children: t("user.statusActive", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(G, { value: "disabled", children: t("user.statusDisabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(G, { value: "password_expired", children: t("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) })
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
                  rules: [{ validator: j }],
                  extra: /* @__PURE__ */ e.jsx(Q.Text, { type: "secondary", style: { fontSize: 12 }, children: t("user.passwordHint", { defaultValue: "Leave blank to send an activation email to the user." }) }),
                  children: /* @__PURE__ */ e.jsx(L.Password, { autoComplete: "new-password", placeholder: t("user.passwordPlaceholder", { defaultValue: "Enter password (optional)" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                p.Item,
                {
                  name: "confirm_password",
                  label: t("user.confirmPassword", { defaultValue: "Confirm Password" }),
                  rules: [{ validator: D }],
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
                    options: b == null ? void 0 : b.map((l) => ({
                      ...l,
                      label: g ? i(l.organization_id, l) : l.name
                    })),
                    optionFilterProp: "label",
                    loading: P
                  }
                )
              }
            ),
            /* @__PURE__ */ e.jsx(p.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs(O, { children: [
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: _,
                  children: d ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                v,
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
