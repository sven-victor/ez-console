import { j as e } from "./vendor.js";
import { useState as S, useCallback as W, useEffect as se } from "react";
import { Form as p, message as i, Spin as M, Tag as P, Tooltip as xe, Badge as V, Card as B, Row as J, Col as D, Input as T, Select as I, Space as $, Button as w, Table as ge, Modal as N, Typography as ae, Tabs as te, Descriptions as U, Switch as je } from "antd";
import { UserOutlined as re, EyeOutlined as Ve, EditOutlined as le, UnlockOutlined as we, KeyOutlined as ye, ToolOutlined as be, UndoOutlined as _e, DeleteOutlined as ke, SearchOutlined as Y, ReloadOutlined as H, ExportOutlined as Ue, UserAddOutlined as Ee, ArrowLeftOutlined as ze } from "@ant-design/icons";
import { useNavigate as Z, Link as Pe, useParams as ue } from "react-router-dom";
import { A as ne, b as ve, f as X, U as Ce, c as Se } from "./components.js";
import { a as x } from "./index.js";
import { P as R, f as q } from "./base.js";
import { useTranslation as A } from "react-i18next";
import { useRequest as y } from "ahooks";
import { c as K, b as Ae } from "./contexts.js";
import { A as Fe } from "./client.js";
const { Option: O } = I, Le = ({ user: l, onClose: g, onSuccess: s }) => {
  const { t: o } = A("authorization"), [h, c] = S(null), [u, b] = S(null), { run: E, loading: z } = y(x.authorization.updateUser, {
    onSuccess: () => {
      i.success(o("user.updateUserSuccess", { defaultValue: "User updated successfully" })), s();
    },
    onError: (n) => {
      i.error(o("user.updateUserError", { defaultValue: "Failed to update user", error: n.message }));
    },
    manual: !0
  }), { data: j, loading: _ } = y(async () => h === "bind" ? x.authorization.getLdapUsers({ skip_existing: !0 }).then((n) => {
    const k = [], f = [];
    for (const m of n)
      m.username === (l == null ? void 0 : l.username) || m.email === (l == null ? void 0 : l.email) || m.full_name === (l == null ? void 0 : l.full_name) ? k.push({ recommend: !0, ...m }) : f.push({ recommend: !1, ...m });
    return [...k, ...f];
  }) : Promise.resolve([]), {
    refreshDeps: [l == null ? void 0 : l.id, h]
  });
  return se(() => {
    l && (c(null), b(null));
  }, [l]), /* @__PURE__ */ e.jsx(
    N,
    {
      open: l !== null,
      onCancel: g,
      onOk: () => {
        if (l) {
          if (h === "local")
            return E({ id: l.id }, { source: "local" });
          if (h === "bind") {
            if (!u) {
              i.error(o("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return E({ id: l.id }, { source: "ldap", ldap_dn: u });
          } else {
            i.error(o("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        i.error(o("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: o("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs($, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(w, { loading: z, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: h === "local" ? "primary" : "default", onClick: () => c("local"), children: o("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(w, { loading: z, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: h === "bind" ? "primary" : "default", onClick: () => c("bind"), children: o("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          I,
          {
            loading: _,
            style: { display: h === "bind" ? "block" : "none" },
            onSelect: (n) => b(n),
            options: j == null ? void 0 : j.map((n) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
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
}, Te = () => {
  const { addTask: l } = K(), g = Z(), { t: s } = A("authorization"), { t: o } = A("common"), [h] = p.useForm(), [c, u] = S([]), [b, E] = S(0), { enableMultiOrg: z } = K(), [j, _] = S(null), [n, k] = S({
    current: R.DEFAULT_CURRENT,
    page_size: R.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  }), { data: f, loading: m } = y(async () => (await x.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [z],
    onError: (a) => {
      i.error(s("organizations.loadError", { defaultValue: "Failed to load organizations", error: a.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), F = W((a, t) => {
    if (m)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        t.name
      ] });
    const v = f == null ? void 0 : f.find((C) => C.id === a);
    return v ? `${v.name}:${t.name}` : t.name;
  }, [f, m]), { run: r, loading: d } = y(() => {
    const a = {
      status: n.status,
      keywords: n.keywords
    };
    return x.authorization.listUsers({
      current: n.current,
      page_size: n.page_size,
      ...a
    });
  }, {
    onSuccess: (a) => {
      u(a.data || []), E(a.total || 0);
    },
    onError: (a) => {
      i.error(s("user.loadError", { defaultValue: "Failed to load users", error: a.message }));
    },
    refreshDeps: [n]
  }), L = (a) => {
    k({
      ...n,
      current: R.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: a.keywords,
      status: a.status
    });
  }, G = () => {
    h.resetFields(), k({
      current: R.DEFAULT_CURRENT,
      page_size: R.DEFAULT_PAGE_SIZE,
      keywords: void 0,
      status: void 0
    });
  }, oe = (a, t) => {
    k((v) => ({
      ...v,
      current: a,
      page_size: t
    }));
  }, { run: ie } = y(x.authorization.restoreUser, {
    onSuccess: () => {
      i.success(s("user.restoreSuccess", { defaultValue: "User restored successfully" })), r();
    },
    onError: (a) => {
      i.error(s("user.restoreError", { defaultValue: "Failed to restore user", error: a.message }));
    },
    manual: !0
  }), { run: de } = y(x.authorization.deleteUser, {
    onSuccess: () => {
      i.success(s("user.deleteSuccess", { defaultValue: "User deleted successfully" })), r();
    },
    onError: (a) => {
      i.error(s("user.deleteError", { defaultValue: "Failed to delete user", error: a.message }));
    },
    manual: !0
  }), ce = (a, t, v) => {
    N.confirm({
      title: s("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: s("user.resetPasswordConfirm", { defaultValue: `Are you sure you want to reset the password for ${t}?`, username: t }),
      okText: o("confirm", { defaultValue: "Confirm" }),
      cancelText: o("cancel", { defaultValue: "Cancel" }),
      onOk: async () => {
        try {
          const C = await x.authorization.resetUserPassword({ id: a }, { password: "" });
          i.success(s("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), C.new_password ? N.info({
            title: s("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
            content: /* @__PURE__ */ e.jsx(ae.Text, { copyable: { text: C.new_password }, children: s("user.resetPasswordSuccessContent", { defaultValue: `New password: ${C.new_password}`, password: C.new_password }) })
          }) : N.info({
            title: s("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
            content: s("user.resetPasswordSuccessSendByEmail", { defaultValue: "The new password has been sent to the user email: {{email}}", email: v })
          });
        } catch (C) {
          console.error("Reset password error:", C), i.error(s("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
        }
      }
    });
  }, { run: me, loading: fe } = y(
    () => x.authorization.createUserExportTask({
      keywords: n.keywords,
      status: n.status
    }),
    {
      onSuccess: (a) => {
        a.id ? i.success(
          s("user.exportTaskCreated", {
            defaultValue: "Export task created. You can view progress and download the file from the task list."
          })
        ) : i.success(s("user.exportTaskCreatedShort", { defaultValue: "Export task created." })), l(a);
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
  ), he = (a) => {
    N.confirm({
      title: s("user.unlockTitle", { defaultValue: "Unlock User" }),
      content: s("user.unlockConfirm", { defaultValue: "Are you sure you want to unlock this user?", username: a.username }),
      onOk: async () => {
        try {
          await x.authorization.unlockUser({ id: a.id }), i.success(s("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), r();
        } catch (t) {
          i.error(s("user.unlockError", { defaultValue: "Failed to unlock user: {{error}}", error: t.message ?? String(t) }));
        }
      }
    });
  }, pe = [
    {
      title: s("user.username", { defaultValue: "Username" }),
      key: "user",
      render: (a, t) => /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          ne,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(re, {}),
            src: t.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(Pe, { to: `/authorization/users/${t.id}`, children: t.username })
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
      render: (a, t) => {
        switch (a) {
          case "ldap":
            return t.ldap_dn ? /* @__PURE__ */ e.jsx(P, { color: "blue", children: s("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(xe, { title: s("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(P, { color: "red", children: s("user.sourceLdap", { defaultValue: "LDAP" }) }) });
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
      render: (a) => /* @__PURE__ */ e.jsx("span", { children: a && a.length > 0 ? a.map((t) => /* @__PURE__ */ e.jsx(P, { color: "blue", children: t.organization_id ? F(t.organization_id, t) : t.name }, t.id)) : /* @__PURE__ */ e.jsx(P, { children: s("user.noRole", { defaultValue: "No Role" }) }) })
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
      render: (a) => a ? q(a) : s("user.neverLogin", { defaultValue: "Never" })
    },
    {
      title: o("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 150,
      render: (a, t) => {
        const v = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(Ve, {}),
          tooltip: s("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: async () => g(`/authorization/users/${t.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(le, {}),
          tooltip: s("user.edit", { defaultValue: "Edit" }),
          hidden: t.status === "locked" || t.status === "deleted",
          onClick: async () => g(`/authorization/users/${t.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(we, {}),
          tooltip: s("user.unlock", { defaultValue: "Unlock" }),
          hidden: t.status !== "locked",
          onClick: async () => he(t)
        }, {
          key: "resetPassword",
          permission: "authorization:user:resetPassword",
          icon: /* @__PURE__ */ e.jsx(ye, {}),
          disabled: t.disable_change_password,
          tooltip: t.disable_change_password ? s("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : s("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((t.source === "local" || t.source === "ldap" && t.ldap_dn) && t.status !== "deleted"),
          onClick: async () => ce(t.id, t.username, t.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(be, {}),
          tooltip: s("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(t.source === "ldap" && !t.ldap_dn && t.status !== "deleted"),
          onClick: async () => _(t)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(_e, {}),
          tooltip: s("user.restore", { defaultValue: "Restore" }),
          hidden: t.status !== "deleted",
          confirm: {
            title: s("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => ie({ id: t.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(ke, {}),
          tooltip: s("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: s("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => de({ id: t.id }),
            okText: o("confirm", { defaultValue: "Confirm" }),
            cancelText: o("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(ve, { actions: v }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(B, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      p,
      {
        form: h,
        layout: "inline",
        onFinish: L,
        children: /* @__PURE__ */ e.jsxs(J, { gutter: 16, style: { width: "100%" }, children: [
          /* @__PURE__ */ e.jsx(D, { span: 6, children: /* @__PURE__ */ e.jsx(p.Item, { name: "keywords", children: /* @__PURE__ */ e.jsx(
            T,
            {
              prefix: /* @__PURE__ */ e.jsx(Y, {}),
              placeholder: s("user.keywords", { defaultValue: "Search by username, full name, or email" }),
              allowClear: !0
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(D, { span: 6, children: /* @__PURE__ */ e.jsx(p.Item, { name: "status", children: /* @__PURE__ */ e.jsxs(
            I,
            {
              placeholder: s("user.status", { defaultValue: "Status" }),
              allowClear: !0,
              style: { width: "100%" },
              children: [
                /* @__PURE__ */ e.jsx(O, { value: "active", children: s("user.statusEnum.active", { defaultValue: "Active" }) }),
                /* @__PURE__ */ e.jsx(O, { value: "disabled", children: s("user.statusEnum.disabled", { defaultValue: "Disabled" }) }),
                /* @__PURE__ */ e.jsx(O, { value: "deleted", children: s("user.statusEnum.deleted", { defaultValue: "Deleted" }) }),
                /* @__PURE__ */ e.jsx(O, { value: "locked", children: s("user.statusEnum.locked", { defaultValue: "Locked" }) }),
                /* @__PURE__ */ e.jsx(O, { value: "password_expired", children: s("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(D, { span: 6, children: /* @__PURE__ */ e.jsxs($, { children: [
            /* @__PURE__ */ e.jsx(
              w,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Y, {}),
                htmlType: "submit",
                children: o("search", { defaultValue: "Search" })
              }
            ),
            /* @__PURE__ */ e.jsx(
              w,
              {
                icon: /* @__PURE__ */ e.jsx(H, {}),
                onClick: G,
                children: o("reset", { defaultValue: "Reset" })
              }
            )
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(B, { children: [
      /* @__PURE__ */ e.jsxs(J, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx(D, { children: /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(H, {}), onClick: r, children: o("refresh", { defaultValue: "Refresh" }) }) }),
        /* @__PURE__ */ e.jsx(D, { children: /* @__PURE__ */ e.jsxs($, { children: [
          /* @__PURE__ */ e.jsx(X, { permission: "authorization:user:export", children: /* @__PURE__ */ e.jsx(
            w,
            {
              icon: /* @__PURE__ */ e.jsx(Ue, {}),
              loading: fe,
              style: { marginBottom: 16 },
              onClick: () => me(),
              children: s("user.export", { defaultValue: "Export" })
            }
          ) }),
          /* @__PURE__ */ e.jsx(X, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
            w,
            {
              type: "primary",
              icon: /* @__PURE__ */ e.jsx(Ee, {}),
              style: { marginBottom: 16 },
              onClick: () => g("/authorization/users/create"),
              children: s("user.create", { defaultValue: "Create User" })
            }
          ) })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsx(
        ge,
        {
          columns: pe,
          dataSource: c,
          rowKey: "id",
          loading: d,
          pagination: {
            current: n.current,
            pageSize: n.page_size,
            total: b,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (a) => o("totalItems", { defaultValue: `Total ${a} items`, total: a }),
            onChange: oe
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(Le, { user: j, onClose: () => _(null), onSuccess: () => {
      _(null), r();
    } })
  ] });
}, Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Te
}, Symbol.toStringTag, { value: "Module" })), { Title: Ie } = ae, { TabPane: ee } = te, De = () => {
  const { id: l } = ue(), g = Z(), { t: s } = A("authorization"), { t: o } = A("common"), [h, c] = S(!1), [u, b] = S(null), { hasPermission: E } = Ae(), { enableMultiOrg: z } = K(), { data: j, loading: _ } = y(async () => (await x.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [z],
    onError: (f) => {
      i.error(s("organizations.loadError", { defaultValue: "Failed to load organizations", error: f.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), n = W((f, m) => {
    if (_)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        m.name
      ] });
    const F = j == null ? void 0 : j.find((r) => r.id === f);
    return F ? `${F.name}:${m.name}` : m.name;
  }, [j, _]);
  if (se(() => {
    (async () => {
      if (l) {
        c(!0);
        try {
          const m = await x.authorization.getUser({ id: l });
          b(m);
        } catch (m) {
          m instanceof Fe && m.code === "E4041" || (console.error("Failed to get user details:", m), i.error(s("user.detailLoadError", { defaultValue: "Failed to load user details" })));
        } finally {
          c(!1);
        }
      }
    })();
  }, [l, s]), h)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(M, { size: "large" }) });
  if (!u)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(Ie, { level: 4, children: s("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(w, { type: "primary", onClick: () => g("/authorization/users"), children: s("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const k = () => u.mfa_enabled ? /* @__PURE__ */ e.jsx(V, { status: "success", text: s("user.mfaEnabled", { defaultValue: "Enabled" }) }) : u.mfa_enforced ? /* @__PURE__ */ e.jsx(V, { status: "warning", text: s("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(V, { status: "default", text: s("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    B,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          ne,
          {
            size: 64,
            icon: /* @__PURE__ */ e.jsx(re, {}),
            src: u.avatar,
            style: { marginRight: 16 }
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 20, fontWeight: "bold" }, children: u.username }),
          /* @__PURE__ */ e.jsx("div", { style: { color: "#888" }, children: u.email })
        ] })
      ] }),
      extra: /* @__PURE__ */ e.jsxs($, { children: [
        /* @__PURE__ */ e.jsx(
          w,
          {
            icon: /* @__PURE__ */ e.jsx(ze, {}),
            onClick: () => g("/authorization/users"),
            children: o("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(le, {}),
            onClick: () => g(`/authorization/users/${l}/edit`),
            children: o("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(te, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(ee, { tab: s("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(U, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(U.Item, { label: s("user.username", { defaultValue: "Username" }), children: u.username }),
          /* @__PURE__ */ e.jsx(U.Item, { label: s("user.fullName", { defaultValue: "Full Name" }), children: u.full_name }),
          /* @__PURE__ */ e.jsx(U.Item, { label: s("user.email", { defaultValue: "Email" }), children: u.email }),
          /* @__PURE__ */ e.jsx(U.Item, { label: s("user.status", { defaultValue: "Status" }), children: u.status === "active" ? /* @__PURE__ */ e.jsx(V, { status: "success", text: s("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(V, { status: "error", text: s(`user.statusEnum.${u.status}`, { defaultValue: u.status.charAt(0).toUpperCase() + u.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(U.Item, { label: s("user.roles", { defaultValue: "Roles" }), span: 2, children: u.roles && u.roles.length > 0 ? u.roles.map((f) => /* @__PURE__ */ e.jsx(P, { color: "blue", children: z ? n(f.organization_id, f) : f.name }, f.id)) : /* @__PURE__ */ e.jsx(P, { children: s("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(U.Item, { label: s("user.mfa", { defaultValue: "MFA" }), children: k() }),
          /* @__PURE__ */ e.jsx(U.Item, { label: s("user.lastLogin", { defaultValue: "Last Login" }), children: u.last_login ? q(u.last_login) : s("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(U.Item, { label: s("user.createdAt", { defaultValue: "Created At" }), children: q(u.created_at) }),
          /* @__PURE__ */ e.jsx(U.Item, { label: s("user.updatedAt", { defaultValue: "Updated At" }), children: q(u.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(ee, { disabled: !E("authorization:user:view_audit_logs"), tab: s("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(Ce, { userId: l || "" }) }, "logs")
      ] })
    }
  );
}, He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: De
}, Symbol.toStringTag, { value: "Module" })), { Option: Q } = I, Re = () => {
  const { id: l = "" } = ue(), g = Z(), { t: s } = A("authorization"), { t: o } = A("common"), [h] = p.useForm(), c = !!l, { enableMultiOrg: u } = K(), { data: b, loading: E } = y(async () => (await x.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [u],
    onError: (r) => {
      i.error(s("organizations.loadError", { defaultValue: "Failed to load organizations", error: r.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), z = W((r, d) => {
    if (E)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        d.name
      ] });
    const L = b == null ? void 0 : b.find((G) => G.id === r);
    return L ? `${L.name}:${d.name}` : d.name;
  }, [b, E]), { data: j, loading: _ } = y(async () => (await x.authorization.listRoles({})).data.map((d) => ({
    ...d,
    label: d.name,
    value: d.id
  }))), { loading: n } = y(async () => {
    if (!(!c || !h))
      try {
        const r = await x.authorization.getUser({ id: l });
        return h.setFieldsValue({
          username: r.username,
          email: r.email,
          full_name: r.full_name,
          status: r.status,
          role_ids: r.roles ? r.roles.map((d) => d.id) : [],
          mfa_enforced: r.mfa_enforced
        }), r;
      } catch {
        i.error(s("user.loadError", { defaultValue: "Failed to load user data" }));
      }
  }, { refreshDeps: [l, h] }), { run: k, loading: f } = y(async (r) => {
    try {
      if (c)
        await x.authorization.updateUser({ id: l }, {
          email: r.email,
          avatar: r.avatar,
          full_name: r.full_name,
          status: r.status,
          mfa_enforced: r.mfa_enforced,
          role_ids: r.role_ids
        }), i.success(s("user.updateSuccess", { defaultValue: "User updated successfully" })), g(`/authorization/users/${l}`);
      else {
        const d = {
          username: r.username,
          avatar: r.avatar,
          password: r.password,
          email: r.email,
          full_name: r.full_name,
          mfa_enforced: r.mfa_enforced,
          role_ids: r.role_ids
        }, L = await x.authorization.createUser(d);
        i.success(s("user.createSuccess", { defaultValue: "User created successfully" })), g(`/authorization/users/${L.id}`);
      }
    } catch (d) {
      i.error(c ? s("user.updateError", { defaultValue: "Failed to update user", error: d }) : s("user.createError", { defaultValue: "Failed to create user", error: d }));
    }
  }, { manual: !0 }), m = (r, d) => c ? Promise.resolve() : d ? d.length < 8 ? Promise.reject(new Error(s("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve() : Promise.reject(new Error(s("user.passwordRequired", { defaultValue: "Password is required" }))), F = (r, d) => c ? Promise.resolve() : d ? d !== h.getFieldValue("password") ? Promise.reject(new Error(s("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(s("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" })));
  return /* @__PURE__ */ e.jsx(
    B,
    {
      title: c ? s("user.editTitle", { defaultValue: "Edit User" }) : s("user.createTitle", { defaultValue: "Create User" }),
      loading: n || _,
      children: /* @__PURE__ */ e.jsxs(
        p,
        {
          form: h,
          layout: "horizontal",
          onFinish: k,
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
                label: s("user.avatar", { defaultValue: "Avatar" }),
                children: /* @__PURE__ */ e.jsx(Se, {})
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "username",
                label: s("user.username", { defaultValue: "Username" }),
                rules: [
                  { required: !c, message: s("user.usernameRequired", { defaultValue: "Username is required" }) }
                ],
                children: /* @__PURE__ */ e.jsx(T, { disabled: c, placeholder: s("user.usernamePlaceholder", { defaultValue: "Enter username" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "email",
                label: s("user.email", { defaultValue: "Email" }),
                rules: [
                  { required: !0, message: s("user.emailRequired", { defaultValue: "Email is required" }) },
                  { type: "email", message: s("user.emailInvalid", { defaultValue: "Invalid email format" }) }
                ],
                children: /* @__PURE__ */ e.jsx(T, { placeholder: s("user.emailPlaceholder", { defaultValue: "Enter email address" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "full_name",
                label: s("user.fullName", { defaultValue: "Full Name" }),
                rules: [{ required: !0, message: s("user.fullNameRequired", { defaultValue: "Full name is required" }) }],
                children: /* @__PURE__ */ e.jsx(T, { placeholder: s("user.fullNamePlaceholder", { defaultValue: "Enter full name" }) })
              }
            ),
            c && /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "status",
                label: s("user.status", { defaultValue: "Status" }),
                rules: [{ required: !0, message: s("user.statusRequired", { defaultValue: "Status is required" }) }],
                children: /* @__PURE__ */ e.jsxs(I, { placeholder: s("user.statusPlaceholder", { defaultValue: "Select status" }), children: [
                  /* @__PURE__ */ e.jsx(Q, { value: "active", children: s("user.statusActive", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(Q, { value: "disabled", children: s("user.statusDisabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(Q, { value: "password_expired", children: s("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) })
                ] })
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "mfa_enforced",
                label: s("user.mfaEnforced", { defaultValue: "MFA Enforced" }),
                children: /* @__PURE__ */ e.jsx(je, {})
              }
            ),
            !c && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                p.Item,
                {
                  name: "password",
                  label: s("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: m }],
                  children: /* @__PURE__ */ e.jsx(T.Password, { autoComplete: "new-password", placeholder: s("user.passwordPlaceholder", { defaultValue: "Enter password" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                p.Item,
                {
                  name: "confirm_password",
                  label: s("user.confirmPassword", { defaultValue: "Confirm Password" }),
                  rules: [{ validator: F }],
                  dependencies: ["password"],
                  children: /* @__PURE__ */ e.jsx(T.Password, { autoComplete: "new-password", placeholder: s("user.confirmPasswordPlaceholder", { defaultValue: "Confirm password" }) })
                }
              )
            ] }),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "role_ids",
                label: s("user.roles", { defaultValue: "Roles" }),
                children: /* @__PURE__ */ e.jsx(
                  I,
                  {
                    mode: "multiple",
                    placeholder: s("user.selectRoles", { defaultValue: "Select roles" }),
                    options: j == null ? void 0 : j.map((r) => ({
                      ...r,
                      label: u ? z(r.organization_id, r) : r.name
                    })),
                    optionFilterProp: "label",
                    loading: _
                  }
                )
              }
            ),
            /* @__PURE__ */ e.jsx(p.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs($, { children: [
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: f,
                  children: c ? o("update", { defaultValue: "Update" }) : o("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  onClick: () => g(c ? `/authorization/users/${l}` : "/authorization/users"),
                  children: o("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Re
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ye as U,
  He as a,
  Xe as b
};
