import { j as e } from "./vendor.js";
import { useState as A, useEffect as H, useCallback as J } from "react";
import { Form as h, message as i, Spin as q, Modal as O, Typography as X, Tag as P, Tooltip as xe, Badge as V, Card as M, Row as W, Col as N, Space as R, Input as C, Select as F, Button as U, Table as ge, Tabs as ee, Descriptions as E, Switch as je } from "antd";
import { UserOutlined as se, EyeOutlined as Ve, EditOutlined as ae, UnlockOutlined as we, KeyOutlined as ye, ToolOutlined as be, UndoOutlined as _e, DeleteOutlined as ke, ReloadOutlined as Ee, ExportOutlined as Ue, UserAddOutlined as ze, ArrowLeftOutlined as Pe } from "@ant-design/icons";
import { useNavigate as Q, Link as Se, useParams as te } from "react-router-dom";
import { A as re, b as ve, f as Y, U as Ce, c as Ae } from "./components.js";
import { a as p } from "./index.js";
import { P as K, f as $ } from "./base.js";
import { useTranslation as v } from "react-i18next";
import { useRequest as g } from "ahooks";
import { u as Fe, c as B, b as Le } from "./contexts.js";
import { A as Te } from "./client.js";
const { Option: I } = F, Ie = ({ user: u, onClose: w, onSuccess: t }) => {
  const { t: s } = v("authorization"), [m, d] = A(null), [x, y] = A(null), { run: z, loading: o } = g(p.authorization.updateUser, {
    onSuccess: () => {
      i.success(s("user.updateUserSuccess", { defaultValue: "User updated successfully" })), t();
    },
    onError: (n) => {
      i.error(s("user.updateUserError", { defaultValue: "Failed to update user", error: n.message }));
    },
    manual: !0
  }), { data: b, loading: S } = g(async () => m === "bind" ? p.authorization.getLdapUsers({ skip_existing: !0 }).then((n) => {
    const f = [], _ = [];
    for (const j of n)
      j.username === (u == null ? void 0 : u.username) || j.email === (u == null ? void 0 : u.email) || j.full_name === (u == null ? void 0 : u.full_name) ? f.push({ recommend: !0, ...j }) : _.push({ recommend: !1, ...j });
    return [...f, ..._];
  }) : Promise.resolve([]), {
    refreshDeps: [u == null ? void 0 : u.id, m]
  });
  return H(() => {
    u && (d(null), y(null));
  }, [u]), /* @__PURE__ */ e.jsx(
    O,
    {
      open: u !== null,
      onCancel: w,
      onOk: () => {
        if (u) {
          if (m === "local")
            return z({ id: u.id }, { source: "local" });
          if (m === "bind") {
            if (!x) {
              i.error(s("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return z({ id: u.id }, { source: "ldap", ldap_dn: x });
          } else {
            i.error(s("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        i.error(s("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: s("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs(R, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(U, { loading: o, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: m === "local" ? "primary" : "default", onClick: () => d("local"), children: s("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(U, { loading: o, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: m === "bind" ? "primary" : "default", onClick: () => d("bind"), children: s("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          F,
          {
            loading: S,
            style: { display: m === "bind" ? "block" : "none" },
            onSelect: (n) => y(n),
            options: b == null ? void 0 : b.map((n) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(P, { color: n.recommend ? "blue" : "default", children: n.full_name }),
              " ",
              n.username,
              " - ",
              n.email,
              " - ",
              n.ldap_dn
            ] }), value: n.ldap_dn })),
            showSearch: !0
          }
        )
      ] })
    }
  );
}, Oe = () => {
  const { registerPageAI: u } = Fe(), { addTask: w } = B(), t = Q(), { t: s } = v("authorization"), { t: m } = v("common"), [d] = h.useForm(), [x, y] = A([]), [z, o] = A(0), { enableMultiOrg: b } = B(), [S, n] = A(null), [f, _] = A({
    current: K.DEFAULT_CURRENT,
    page_size: K.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  });
  H(() => {
    x && (u == null || u({
      pageData: () => x,
      pageDataDescription: "Returns the current user list as a JSON object."
    }));
  }, [u, x]);
  const { data: j, loading: D } = g(async () => (await p.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [b],
    onError: (a) => {
      i.error(s("organizations.loadError", { defaultValue: "Failed to load organizations", error: a.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), r = J((a, l) => {
    if (D)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(q, { size: "small" }),
        ":",
        l.name
      ] });
    const k = j == null ? void 0 : j.find((pe) => pe.id === a);
    return k ? `${k.name}:${l.name}` : l.name;
  }, [j, D]), { run: c, loading: L } = g(() => {
    const a = {
      status: f.status,
      keywords: f.keywords
    };
    return p.authorization.listUsers({
      current: f.current,
      page_size: f.page_size,
      ...a
    });
  }, {
    onSuccess: (a) => {
      y(a.data || []), o(a.total || 0);
    },
    onError: (a) => {
      i.error(s("user.loadError", { defaultValue: "Failed to load users", error: a.message }));
    },
    refreshDeps: [f]
  }), T = (a) => {
    _({
      ...f,
      current: K.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: a.keywords,
      status: a.status
    });
  }, le = (a, l) => {
    _((k) => ({
      ...k,
      current: a,
      page_size: l
    }));
  }, { run: ue } = g(p.authorization.restoreUser, {
    onSuccess: () => {
      i.success(s("user.restoreSuccess", { defaultValue: "User restored successfully" })), c();
    },
    onError: (a) => {
      i.error(s("user.restoreError", { defaultValue: "Failed to restore user", error: a.message }));
    },
    manual: !0
  }), { run: ne } = g(p.authorization.deleteUser, {
    onSuccess: () => {
      i.success(s("user.deleteSuccess", { defaultValue: "User deleted successfully" })), c();
    },
    onError: (a) => {
      i.error(s("user.deleteError", { defaultValue: "Failed to delete user", error: a.message }));
    },
    manual: !0
  }), { runAsync: oe } = g(
    (a) => p.authorization.resetUserPassword({ id: a.id }, { password: "" }),
    {
      manual: !0,
      onSuccess: (a, l) => {
        const k = l[0];
        i.success(s("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), a.new_password ? O.info({
          title: s("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: /* @__PURE__ */ e.jsx(X.Text, { copyable: { text: a.new_password }, children: s("user.resetPasswordSuccessContent", {
            defaultValue: `New password: ${a.new_password}`,
            password: a.new_password
          }) })
        }) : O.info({
          title: s("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: s("user.resetPasswordSuccessSendByEmail", {
            defaultValue: "The new password has been sent to the user email: {{email}}",
            email: k.email
          })
        });
      },
      onError: () => {
        i.error(s("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
      }
    }
  ), ie = (a, l, k) => {
    O.confirm({
      title: s("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: s("user.resetPasswordConfirm", {
        defaultValue: `Are you sure you want to reset the password for ${l}?`,
        username: l
      }),
      okText: m("confirm", { defaultValue: "Confirm" }),
      cancelText: m("cancel", { defaultValue: "Cancel" }),
      onOk: () => oe({ id: a, email: k })
    });
  }, { run: de, loading: ce } = g(
    () => p.authorization.createUserExportTask({
      keywords: f.keywords,
      status: f.status
    }),
    {
      onSuccess: (a) => {
        a.id ? i.success(
          s("user.exportTaskCreated", {
            defaultValue: "Export task created. You can view progress and download the file from the task list."
          })
        ) : i.success(s("user.exportTaskCreatedShort", { defaultValue: "Export task created." })), w(a);
      },
      onError: (a) => {
        i.error(
          s("user.exportError", {
            defaultValue: "Failed to create export task",
            error: (a == null ? void 0 : a.message) ?? String(a)
          })
        );
      },
      manual: !0
    }
  ), { runAsync: me } = g(
    (a) => p.authorization.unlockUser({ id: a }),
    {
      manual: !0,
      onSuccess: () => {
        i.success(s("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), c();
      },
      onError: (a) => {
        i.error(
          s("user.unlockError", {
            defaultValue: "Failed to unlock user: {{error}}",
            error: a instanceof Error ? a.message : String(a)
          })
        );
      }
    }
  ), fe = (a) => {
    O.confirm({
      title: s("user.unlockTitle", { defaultValue: "Unlock User" }),
      content: s("user.unlockConfirm", {
        defaultValue: "Are you sure you want to unlock this user?",
        username: a.username
      }),
      onOk: () => me(a.id)
    });
  }, he = [
    {
      title: s("user.username", { defaultValue: "Username" }),
      key: "user",
      render: (a, l) => /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          re,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(se, {}),
            src: l.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(Se, { to: `/authorization/users/${l.id}`, children: l.username })
      ] })
    },
    {
      title: s("user.fullName", { defaultValue: "Full Name" }),
      dataIndex: "full_name",
      key: "full_name"
    },
    {
      title: s("user.email", { defaultValue: "Email" }),
      dataIndex: "email",
      key: "email"
    },
    {
      title: s("user.source", { defaultValue: "Source" }),
      dataIndex: "source",
      key: "source",
      render: (a, l) => {
        switch (a) {
          case "ldap":
            return l.ldap_dn ? /* @__PURE__ */ e.jsx(P, { color: "blue", children: s("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(xe, { title: s("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(P, { color: "red", children: s("user.sourceLdap", { defaultValue: "LDAP" }) }) });
          case "oauth2":
            return /* @__PURE__ */ e.jsx(P, { color: "green", children: s("user.sourceOauth2", { defaultValue: "OAuth2" }) });
          default:
            return /* @__PURE__ */ e.jsx(P, { color: "default", children: s("user.sourceLocal", { defaultValue: "Local" }) });
        }
      }
    },
    {
      title: s("user.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (a) => {
        switch (a) {
          case "disabled":
            return /* @__PURE__ */ e.jsx(V, { status: "default", text: s("user.statusEnum.disabled", { defaultValue: "Disabled" }) });
          case "password_expired":
            return /* @__PURE__ */ e.jsx(V, { status: "warning", text: s("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) });
          case "active":
            return /* @__PURE__ */ e.jsx(V, { status: "success", text: s("user.statusEnum.active", { defaultValue: "Active" }) });
          case "locked":
            return /* @__PURE__ */ e.jsx(V, { status: "warning", text: s("user.statusEnum.locked", { defaultValue: "Locked" }) });
          case "deleted":
            return /* @__PURE__ */ e.jsx(V, { status: "error", text: s("user.statusEnum.deleted", { defaultValue: "Deleted" }) });
          default:
            return /* @__PURE__ */ e.jsx(V, { status: "default", text: s(`user.statusEnum.${a}`, { defaultValue: a.charAt(0).toUpperCase() + a.slice(1) }) });
        }
      }
    },
    {
      title: s("user.roles", { defaultValue: "Roles" }),
      dataIndex: "roles",
      key: "roles",
      render: (a) => /* @__PURE__ */ e.jsx("span", { children: a && a.length > 0 ? a.map((l) => /* @__PURE__ */ e.jsx(P, { color: "blue", children: l.organization_id ? r(l.organization_id, l) : l.name }, l.id)) : /* @__PURE__ */ e.jsx(P, { children: s("user.noRole", { defaultValue: "No Role" }) }) })
    },
    {
      title: s("user.mfa", { defaultValue: "MFA" }),
      dataIndex: "mfa_enabled",
      key: "mfa_enabled",
      render: (a) => a ? /* @__PURE__ */ e.jsx(V, { status: "success", text: s("user.mfaEnabled", { defaultValue: "Enabled" }) }) : /* @__PURE__ */ e.jsx(V, { status: "default", text: s("user.mfaDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("user.lastLogin", { defaultValue: "Last Login" }),
      dataIndex: "last_login",
      key: "last_login",
      render: (a) => a ? $(a) : s("user.neverLogin", { defaultValue: "Never" })
    },
    {
      title: m("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 150,
      render: (a, l) => {
        const k = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(Ve, {}),
          tooltip: s("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: async () => t(`/authorization/users/${l.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ae, {}),
          tooltip: s("user.edit", { defaultValue: "Edit" }),
          hidden: l.status === "locked" || l.status === "deleted",
          onClick: async () => t(`/authorization/users/${l.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(we, {}),
          tooltip: s("user.unlock", { defaultValue: "Unlock" }),
          hidden: l.status !== "locked",
          onClick: async () => fe(l)
        }, {
          key: "resetPassword",
          permission: "authorization:user:resetPassword",
          icon: /* @__PURE__ */ e.jsx(ye, {}),
          disabled: l.disable_change_password,
          tooltip: l.disable_change_password ? s("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : s("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((l.source === "local" || l.source === "ldap" && l.ldap_dn) && l.status !== "deleted"),
          onClick: async () => ie(l.id, l.username, l.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(be, {}),
          tooltip: s("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(l.source === "ldap" && !l.ldap_dn && l.status !== "deleted"),
          onClick: async () => n(l)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(_e, {}),
          tooltip: s("user.restore", { defaultValue: "Restore" }),
          hidden: l.status !== "deleted",
          confirm: {
            title: s("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => ue({ id: l.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(ke, {}),
          tooltip: s("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: s("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => ne({ id: l.id }),
            okText: m("confirm", { defaultValue: "Confirm" }),
            cancelText: m("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(ve, { actions: k }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(M, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      h,
      {
        form: d,
        layout: "vertical",
        onFinish: T,
        name: "userSearchForm",
        children: /* @__PURE__ */ e.jsxs(W, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(N, { children: /* @__PURE__ */ e.jsxs(R, { children: [
            /* @__PURE__ */ e.jsx(h.Item, { name: "keywords", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              C.Search,
              {
                placeholder: s("user.keywords", { defaultValue: "Search by username, full name, or email" }),
                allowClear: !0,
                onSearch: () => {
                  T(d.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            /* @__PURE__ */ e.jsx(h.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(
              F,
              {
                placeholder: s("user.status", { defaultValue: "Status" }),
                allowClear: !0,
                onChange: () => {
                  T(d.getFieldsValue());
                },
                style: { width: 220 },
                children: [
                  /* @__PURE__ */ e.jsx(I, { value: "active", children: s("user.statusEnum.active", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(I, { value: "disabled", children: s("user.statusEnum.disabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(I, { value: "deleted", children: s("user.statusEnum.deleted", { defaultValue: "Deleted" }) }),
                  /* @__PURE__ */ e.jsx(I, { value: "locked", children: s("user.statusEnum.locked", { defaultValue: "Locked" }) }),
                  /* @__PURE__ */ e.jsx(I, { value: "password_expired", children: s("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) })
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(N, { children: /* @__PURE__ */ e.jsxs(R, { children: [
            /* @__PURE__ */ e.jsx(U, { icon: /* @__PURE__ */ e.jsx(Ee, {}), onClick: c, children: m("refresh", { defaultValue: "Refresh" }) }),
            /* @__PURE__ */ e.jsx(Y, { permission: "authorization:user:export", children: /* @__PURE__ */ e.jsx(
              U,
              {
                icon: /* @__PURE__ */ e.jsx(Ue, {}),
                loading: ce,
                onClick: () => de(),
                children: s("user.export", { defaultValue: "Export" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(Y, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
              U,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(ze, {}),
                onClick: () => t("/authorization/users/create"),
                children: s("user.create", { defaultValue: "Create User" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(M, { children: [
      /* @__PURE__ */ e.jsxs(W, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx(N, {}),
        /* @__PURE__ */ e.jsx(N, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        ge,
        {
          columns: he,
          dataSource: x,
          rowKey: "id",
          loading: L,
          pagination: {
            current: f.current,
            pageSize: f.page_size,
            total: z,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (a) => m("totalItems", { defaultValue: `Total ${a} items`, total: a }),
            onChange: le
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(Ie, { user: S, onClose: () => n(null), onSuccess: () => {
      n(null), c();
    } })
  ] });
}, Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oe
}, Symbol.toStringTag, { value: "Module" })), { Title: Re } = X, { TabPane: Z } = ee, De = () => {
  const { id: u } = te(), w = Q(), { t } = v("authorization"), { t: s } = v("common"), { hasPermission: m } = Le(), { enableMultiOrg: d } = B(), { data: x, loading: y } = g(async () => (await p.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [d],
    onError: (n) => {
      i.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: n.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), z = J((n, f) => {
    if (y)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(q, { size: "small" }),
        ":",
        f.name
      ] });
    const _ = x == null ? void 0 : x.find((j) => j.id === n);
    return _ ? `${_.name}:${f.name}` : f.name;
  }, [x, y]), { data: o, loading: b } = g(() => p.authorization.getUser({ id: u }), {
    ready: !!u,
    refreshDeps: [u],
    onError: (n) => {
      n instanceof Te && n.code === "E4041" || (console.error("Failed to get user details:", n), i.error(t("user.detailLoadError", { defaultValue: "Failed to load user details" })));
    }
  });
  if (b)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(q, { size: "large" }) });
  if (!o)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(Re, { level: 4, children: t("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(U, { type: "primary", onClick: () => w("/authorization/users"), children: t("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const S = () => o.mfa_enabled ? /* @__PURE__ */ e.jsx(V, { status: "success", text: t("user.mfaEnabled", { defaultValue: "Enabled" }) }) : o.mfa_enforced ? /* @__PURE__ */ e.jsx(V, { status: "warning", text: t("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(V, { status: "default", text: t("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    M,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          re,
          {
            size: 64,
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
      extra: /* @__PURE__ */ e.jsxs(R, { children: [
        /* @__PURE__ */ e.jsx(
          U,
          {
            icon: /* @__PURE__ */ e.jsx(Pe, {}),
            onClick: () => w("/authorization/users"),
            children: s("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          U,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ae, {}),
            onClick: () => w(`/authorization/users/${u}/edit`),
            children: s("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(ee, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(Z, { tab: t("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(E, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.username", { defaultValue: "Username" }), children: o.username }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.fullName", { defaultValue: "Full Name" }), children: o.full_name }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.email", { defaultValue: "Email" }), children: o.email }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.status", { defaultValue: "Status" }), children: o.status === "active" ? /* @__PURE__ */ e.jsx(V, { status: "success", text: t("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(V, { status: "error", text: t(`user.statusEnum.${o.status}`, { defaultValue: o.status.charAt(0).toUpperCase() + o.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.roles", { defaultValue: "Roles" }), span: 2, children: o.roles && o.roles.length > 0 ? o.roles.map((n) => /* @__PURE__ */ e.jsx(P, { color: "blue", children: d ? z(n.organization_id, n) : n.name }, n.id)) : /* @__PURE__ */ e.jsx(P, { children: t("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.mfa", { defaultValue: "MFA" }), children: S() }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.lastLogin", { defaultValue: "Last Login" }), children: o.last_login ? $(o.last_login) : t("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.createdAt", { defaultValue: "Created At" }), children: $(o.created_at) }),
          /* @__PURE__ */ e.jsx(E.Item, { label: t("user.updatedAt", { defaultValue: "Updated At" }), children: $(o.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(Z, { disabled: !m("authorization:user:view_audit_logs"), tab: t("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(Ce, { userId: u || "" }) }, "logs")
      ] })
    }
  );
}, es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: De
}, Symbol.toStringTag, { value: "Module" })), { Option: G } = F, Ne = () => {
  const { id: u = "" } = te(), w = Q(), { t } = v("authorization"), { t: s } = v("common"), [m] = h.useForm(), d = !!u, { enableMultiOrg: x } = B(), { data: y, loading: z } = g(async () => (await p.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [x],
    onError: (r) => {
      i.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: r.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), o = J((r, c) => {
    if (z)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(q, { size: "small" }),
        ":",
        c.name
      ] });
    const L = y == null ? void 0 : y.find((T) => T.id === r);
    return L ? `${L.name}:${c.name}` : c.name;
  }, [y, z]), { data: b, loading: S } = g(async () => (await p.authorization.listRoles({})).data.map((c) => ({
    ...c,
    label: c.name,
    value: c.id
  }))), { loading: n } = g(
    async () => p.authorization.getUser({ id: u }),
    {
      ready: d && !!u,
      refreshDeps: [u, d],
      onSuccess: (r) => {
        m.setFieldsValue({
          username: r.username,
          email: r.email,
          full_name: r.full_name,
          status: r.status,
          role_ids: r.roles ? r.roles.map((c) => c.id) : [],
          mfa_enforced: r.mfa_enforced
        });
      },
      onError: () => {
        i.error(t("user.loadError", { defaultValue: "Failed to load user data" }));
      }
    }
  ), { run: f, loading: _ } = g(
    async (r) => {
      if (d)
        return await p.authorization.updateUser(
          { id: u },
          {
            email: r.email,
            avatar: r.avatar,
            full_name: r.full_name,
            status: r.status,
            mfa_enforced: r.mfa_enforced,
            role_ids: r.role_ids
          }
        ), { mode: "update" };
      const c = {
        username: r.username,
        avatar: r.avatar,
        password: r.password,
        email: r.email,
        full_name: r.full_name,
        mfa_enforced: r.mfa_enforced,
        role_ids: r.role_ids
      };
      return { mode: "create", newUser: await p.authorization.createUser(c) };
    },
    {
      manual: !0,
      onSuccess: (r) => {
        r && (r.mode === "update" ? (i.success(t("user.updateSuccess", { defaultValue: "User updated successfully" })), w(`/authorization/users/${u}`)) : (i.success(t("user.createSuccess", { defaultValue: "User created successfully" })), w(`/authorization/users/${r.newUser.id}`)));
      },
      onError: (r) => {
        i.error(
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
  ), j = (r, c) => d ? Promise.resolve() : c ? c.length < 8 ? Promise.reject(new Error(t("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve() : Promise.reject(new Error(t("user.passwordRequired", { defaultValue: "Password is required" }))), D = (r, c) => d ? Promise.resolve() : c ? c !== m.getFieldValue("password") ? Promise.reject(new Error(t("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(t("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" })));
  return /* @__PURE__ */ e.jsx(
    M,
    {
      title: d ? t("user.editTitle", { defaultValue: "Edit User" }) : t("user.createTitle", { defaultValue: "Create User" }),
      loading: n || S,
      children: /* @__PURE__ */ e.jsxs(
        h,
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
              h.Item,
              {
                name: "avatar",
                label: t("user.avatar", { defaultValue: "Avatar" }),
                children: /* @__PURE__ */ e.jsx(Ae, {})
              }
            ),
            /* @__PURE__ */ e.jsx(
              h.Item,
              {
                name: "username",
                label: t("user.username", { defaultValue: "Username" }),
                rules: [
                  { required: !d, message: t("user.usernameRequired", { defaultValue: "Username is required" }) }
                ],
                children: /* @__PURE__ */ e.jsx(C, { disabled: d, placeholder: t("user.usernamePlaceholder", { defaultValue: "Enter username" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              h.Item,
              {
                name: "email",
                label: t("user.email", { defaultValue: "Email" }),
                rules: [
                  { required: !0, message: t("user.emailRequired", { defaultValue: "Email is required" }) },
                  { type: "email", message: t("user.emailInvalid", { defaultValue: "Invalid email format" }) }
                ],
                children: /* @__PURE__ */ e.jsx(C, { placeholder: t("user.emailPlaceholder", { defaultValue: "Enter email address" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              h.Item,
              {
                name: "full_name",
                label: t("user.fullName", { defaultValue: "Full Name" }),
                rules: [{ required: !0, message: t("user.fullNameRequired", { defaultValue: "Full name is required" }) }],
                children: /* @__PURE__ */ e.jsx(C, { placeholder: t("user.fullNamePlaceholder", { defaultValue: "Enter full name" }) })
              }
            ),
            d && /* @__PURE__ */ e.jsx(
              h.Item,
              {
                name: "status",
                label: t("user.status", { defaultValue: "Status" }),
                rules: [{ required: !0, message: t("user.statusRequired", { defaultValue: "Status is required" }) }],
                children: /* @__PURE__ */ e.jsxs(F, { placeholder: t("user.statusPlaceholder", { defaultValue: "Select status" }), children: [
                  /* @__PURE__ */ e.jsx(G, { value: "active", children: t("user.statusActive", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(G, { value: "disabled", children: t("user.statusDisabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(G, { value: "password_expired", children: t("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) })
                ] })
              }
            ),
            /* @__PURE__ */ e.jsx(
              h.Item,
              {
                name: "mfa_enforced",
                label: t("user.mfaEnforced", { defaultValue: "MFA Enforced" }),
                children: /* @__PURE__ */ e.jsx(je, {})
              }
            ),
            !d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                h.Item,
                {
                  name: "password",
                  label: t("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: j }],
                  children: /* @__PURE__ */ e.jsx(C.Password, { autoComplete: "new-password", placeholder: t("user.passwordPlaceholder", { defaultValue: "Enter password" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                h.Item,
                {
                  name: "confirm_password",
                  label: t("user.confirmPassword", { defaultValue: "Confirm Password" }),
                  rules: [{ validator: D }],
                  dependencies: ["password"],
                  children: /* @__PURE__ */ e.jsx(C.Password, { autoComplete: "new-password", placeholder: t("user.confirmPasswordPlaceholder", { defaultValue: "Confirm password" }) })
                }
              )
            ] }),
            /* @__PURE__ */ e.jsx(
              h.Item,
              {
                name: "role_ids",
                label: t("user.roles", { defaultValue: "Roles" }),
                children: /* @__PURE__ */ e.jsx(
                  F,
                  {
                    mode: "multiple",
                    placeholder: t("user.selectRoles", { defaultValue: "Select roles" }),
                    options: b == null ? void 0 : b.map((r) => ({
                      ...r,
                      label: x ? o(r.organization_id, r) : r.name
                    })),
                    optionFilterProp: "label",
                    loading: S
                  }
                )
              }
            ),
            /* @__PURE__ */ e.jsx(h.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs(R, { children: [
              /* @__PURE__ */ e.jsx(
                U,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: _,
                  children: d ? s("update", { defaultValue: "Update" }) : s("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                U,
                {
                  onClick: () => w(d ? `/authorization/users/${u}` : "/authorization/users"),
                  children: s("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ne
}, Symbol.toStringTag, { value: "Module" }));
export {
  Xe as U,
  es as a,
  ss as b
};
