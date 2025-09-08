import { j as e } from "./vendor.js";
import { useState as E, useEffect as K } from "react";
import { Form as p, message as c, Tag as _, Tooltip as le, Badge as j, Card as R, Row as q, Col as L, Input as S, Select as z, Space as O, Button as w, Table as ue, Modal as D, Typography as Q, Spin as oe, Tabs as W, Descriptions as g, Switch as ie } from "antd";
import { UserOutlined as Z, EyeOutlined as ne, EditOutlined as J, UnlockOutlined as de, KeyOutlined as ce, ToolOutlined as fe, UndoOutlined as me, DeleteOutlined as he, SearchOutlined as $, ReloadOutlined as M, UserAddOutlined as pe, ArrowLeftOutlined as xe } from "@ant-design/icons";
import { useNavigate as N, Link as je, useParams as H } from "react-router-dom";
import { A as X, b as Ve, f as we, U as ye, c as ge } from "./components.js";
import { a as V } from "./index.js";
import { P as F, f as I } from "./base.js";
import { useTranslation as v } from "react-i18next";
import { useRequest as P } from "ahooks";
import { A as be } from "./client.js";
import { a as Ue } from "./contexts.js";
const { Option: T } = z, _e = ({ user: l, onClose: s, onSuccess: a }) => {
  const { t: f } = v("authorization"), [h, i] = E(null), [o, b] = E(null), { run: k, loading: y } = P(V.authorization.updateUser, {
    onSuccess: () => {
      c.success(f("user.updateUserSuccess", { defaultValue: "User updated successfully" })), a();
    },
    onError: (d) => {
      c.error(f("user.updateUserError", { defaultValue: "Failed to update user", error: d.message }));
    },
    manual: !0
  }), { data: m, loading: x } = P(async () => h === "bind" ? V.authorization.getLdapUsers({ skip_existing: !0 }).then((d) => {
    const u = [], n = [];
    for (const U of d)
      U.username === (l == null ? void 0 : l.username) || U.email === (l == null ? void 0 : l.email) || U.full_name === (l == null ? void 0 : l.full_name) ? u.push({ recommend: !0, ...U }) : n.push({ recommend: !1, ...U });
    return [...u, ...n];
  }) : Promise.resolve([]), {
    refreshDeps: [l == null ? void 0 : l.id, h]
  });
  return K(() => {
    l && (i(null), b(null));
  }, [l]), /* @__PURE__ */ e.jsx(
    D,
    {
      open: l !== null,
      onCancel: s,
      onOk: () => {
        if (l) {
          if (h === "local")
            return k({ id: l.id }, { source: "local" });
          if (h === "bind") {
            if (!o) {
              c.error(f("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return k({ id: l.id }, { source: "ldap", ldap_dn: o });
          } else {
            c.error(f("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        c.error(f("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: f("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs(O, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(w, { loading: y, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: h === "local" ? "primary" : "default", onClick: () => i("local"), children: f("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(w, { loading: y, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: h === "bind" ? "primary" : "default", onClick: () => i("bind"), children: f("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          z,
          {
            loading: x,
            style: { display: h === "bind" ? "block" : "none" },
            onSelect: (d) => b(d),
            options: m == null ? void 0 : m.map((d) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(_, { color: d.recommend ? "blue" : "default", children: d.full_name }),
              " ",
              d.username,
              " - ",
              d.email,
              " - ",
              d.ldap_dn
            ] }), value: d.ldap_dn })),
            showSearch: !0
          }
        )
      ] })
    }
  );
}, ke = () => {
  const l = N(), { t: s } = v("authorization"), { t: a } = v("common"), [f] = p.useForm(), [h, i] = E([]), [o, b] = E(0), [k, y] = E(null), [m, x] = E({
    current: F.DEFAULT_CURRENT,
    page_size: F.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  }), { run: d, loading: u } = P(() => {
    const t = {
      status: m.status,
      keywords: m.keywords
    };
    return V.authorization.listUsers({
      current: m.current,
      page_size: m.page_size,
      ...t
    });
  }, {
    onSuccess: (t) => {
      i(t.data || []), b(t.total || 0);
    },
    onError: (t) => {
      c.error(s("user.loadError", { defaultValue: "Failed to load users", error: t.message }));
    },
    refreshDeps: [m]
  }), n = (t) => {
    x({
      ...m,
      current: F.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: t.keywords,
      status: t.status
    });
  }, U = () => {
    f.resetFields(), x({
      current: F.DEFAULT_CURRENT,
      page_size: F.DEFAULT_PAGE_SIZE,
      keywords: void 0,
      status: void 0
    });
  }, Y = (t, r) => {
    x((A) => ({
      ...A,
      current: t,
      page_size: r
    }));
  }, { run: ee } = P(V.authorization.restoreUser, {
    onSuccess: () => {
      c.success(s("user.restoreSuccess", { defaultValue: "User restored successfully" })), d();
    },
    onError: (t) => {
      c.error(s("user.restoreError", { defaultValue: "Failed to restore user", error: t.message }));
    },
    manual: !0
  }), { run: se } = P(V.authorization.deleteUser, {
    onSuccess: () => {
      c.success(s("user.deleteSuccess", { defaultValue: "User deleted successfully" })), d();
    },
    onError: (t) => {
      c.error(s("user.deleteError", { defaultValue: "Failed to delete user", error: t.message }));
    },
    manual: !0
  }), ae = (t, r, A) => {
    D.confirm({
      title: s("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: s("user.resetPasswordConfirm", { defaultValue: `Are you sure you want to reset the password for ${r}?`, username: r }),
      okText: a("confirm", { defaultValue: "Confirm" }),
      cancelText: a("cancel", { defaultValue: "Cancel" }),
      onOk: async () => {
        try {
          const C = await V.authorization.resetUserPassword({ id: t }, { password: "" });
          c.success(s("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), C.new_password ? D.info({
            title: s("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
            content: /* @__PURE__ */ e.jsx(Q.Text, { copyable: { text: C.new_password }, children: s("user.resetPasswordSuccessContent", { defaultValue: `New password: ${C.new_password}`, password: C.new_password }) })
          }) : D.info({
            title: s("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
            content: s("user.resetPasswordSuccessSendByEmail", { defaultValue: "The new password has been sent to the user email: {{email}}", email: A })
          });
        } catch (C) {
          console.error("Reset password error:", C), c.error(s("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
        }
      }
    });
  }, te = (t) => {
    D.confirm({
      title: s("user.unlockTitle", { defaultValue: "Unlock User" }),
      content: s("user.unlockConfirm", { defaultValue: "Are you sure you want to unlock this user?" }),
      onOk: async () => {
        try {
          await V.authorization.unlockUser({ id: t }), c.success(s("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), d();
        } catch (r) {
          c.error(s("user.unlockError", { defaultValue: "Failed to unlock user: {{error}}", error: r.message ?? String(r) }));
        }
      }
    });
  }, re = [
    {
      title: s("user.username", { defaultValue: "Username" }),
      key: "user",
      render: (t, r) => /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          X,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(Z, {}),
            src: r.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(je, { to: `/authorization/users/${r.id}`, children: r.username })
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
      render: (t, r) => {
        switch (t) {
          case "ldap":
            return r.ldap_dn ? /* @__PURE__ */ e.jsx(_, { color: "blue", children: s("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(le, { title: s("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(_, { color: "red", children: s("user.sourceLdap", { defaultValue: "LDAP" }) }) });
          case "oauth2":
            return /* @__PURE__ */ e.jsx(_, { color: "green", children: s("user.sourceOauth2", { defaultValue: "OAuth2" }) });
          default:
            return /* @__PURE__ */ e.jsx(_, { color: "default", children: s("user.sourceLocal", { defaultValue: "Local" }) });
        }
      }
    },
    {
      title: s("user.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (t) => {
        switch (t) {
          case "disabled":
            return /* @__PURE__ */ e.jsx(j, { status: "default", text: s("user.statusEnum.disabled", { defaultValue: "Disabled" }) });
          case "password_expired":
            return /* @__PURE__ */ e.jsx(j, { status: "warning", text: s("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) });
          case "active":
            return /* @__PURE__ */ e.jsx(j, { status: "success", text: s("user.statusEnum.active", { defaultValue: "Active" }) });
          case "locked":
            return /* @__PURE__ */ e.jsx(j, { status: "warning", text: s("user.statusEnum.locked", { defaultValue: "Locked" }) });
          case "deleted":
            return /* @__PURE__ */ e.jsx(j, { status: "error", text: s("user.statusEnum.deleted", { defaultValue: "Deleted" }) });
          default:
            return /* @__PURE__ */ e.jsx(j, { status: "default", text: s(`user.statusEnum.${t}`, { defaultValue: t.charAt(0).toUpperCase() + t.slice(1) }) });
        }
      }
    },
    {
      title: s("user.roles", { defaultValue: "Roles" }),
      dataIndex: "roles",
      key: "roles",
      render: (t) => /* @__PURE__ */ e.jsx("span", { children: t && t.length > 0 ? t.map((r) => /* @__PURE__ */ e.jsx(_, { color: "blue", children: r.name }, r.id)) : /* @__PURE__ */ e.jsx(_, { children: s("user.noRole", { defaultValue: "No Role" }) }) })
    },
    {
      title: s("user.mfa", { defaultValue: "MFA" }),
      dataIndex: "mfa_enabled",
      key: "mfa_enabled",
      render: (t) => t ? /* @__PURE__ */ e.jsx(j, { status: "success", text: s("user.mfaEnabled", { defaultValue: "Enabled" }) }) : /* @__PURE__ */ e.jsx(j, { status: "default", text: s("user.mfaDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("user.lastLogin", { defaultValue: "Last Login" }),
      dataIndex: "last_login",
      key: "last_login",
      render: (t) => t ? I(t) : s("user.neverLogin", { defaultValue: "Never" })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (t, r) => {
        const A = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(ne, {}),
          tooltip: s("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: () => l(`/authorization/users/${r.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(J, {}),
          tooltip: s("user.edit", { defaultValue: "Edit" }),
          hidden: r.status === "locked" || r.status === "deleted",
          onClick: () => l(`/authorization/users/${r.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(de, {}),
          tooltip: s("user.unlock", { defaultValue: "Unlock" }),
          hidden: r.status !== "locked",
          onClick: () => te(r.id)
        }, {
          key: "resetPassword",
          permission: "authorization:user:resetPassword",
          icon: /* @__PURE__ */ e.jsx(ce, {}),
          disabled: r.disable_change_password,
          tooltip: r.disable_change_password ? s("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : s("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((r.source === "local" || r.source === "ldap" && r.ldap_dn) && r.status !== "deleted"),
          onClick: () => ae(r.id, r.username, r.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(fe, {}),
          tooltip: s("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(r.source === "ldap" && !r.ldap_dn && r.status !== "deleted"),
          onClick: () => y(r)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(me, {}),
          tooltip: s("user.restore", { defaultValue: "Restore" }),
          hidden: r.status !== "deleted",
          confirm: {
            title: s("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: () => ee({ id: r.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(he, {}),
          tooltip: s("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: s("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => se({ id: r.id }),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(Ve, { actions: A }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(R, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      p,
      {
        form: f,
        layout: "inline",
        onFinish: n,
        style: { marginBottom: 16 },
        children: /* @__PURE__ */ e.jsxs(q, { gutter: 16, style: { width: "100%" }, children: [
          /* @__PURE__ */ e.jsx(L, { span: 6, children: /* @__PURE__ */ e.jsx(p.Item, { name: "keywords", children: /* @__PURE__ */ e.jsx(
            S,
            {
              prefix: /* @__PURE__ */ e.jsx($, {}),
              placeholder: s("user.keywords", { defaultValue: "Search by username, full name, or email" }),
              allowClear: !0
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(L, { span: 6, children: /* @__PURE__ */ e.jsx(p.Item, { name: "status", children: /* @__PURE__ */ e.jsxs(
            z,
            {
              placeholder: s("user.status", { defaultValue: "Status" }),
              allowClear: !0,
              style: { width: "100%" },
              children: [
                /* @__PURE__ */ e.jsx(T, { value: "active", children: s("user.statusEnum.active", { defaultValue: "Active" }) }),
                /* @__PURE__ */ e.jsx(T, { value: "disabled", children: s("user.statusEnum.disabled", { defaultValue: "Disabled" }) }),
                /* @__PURE__ */ e.jsx(T, { value: "deleted", children: s("user.statusEnum.deleted", { defaultValue: "Deleted" }) }),
                /* @__PURE__ */ e.jsx(T, { value: "locked", children: s("user.statusEnum.locked", { defaultValue: "Locked" }) }),
                /* @__PURE__ */ e.jsx(T, { value: "password_expired", children: s("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(L, { span: 6, children: /* @__PURE__ */ e.jsxs(O, { children: [
            /* @__PURE__ */ e.jsx(
              w,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx($, {}),
                htmlType: "submit",
                children: a("search", { defaultValue: "Search" })
              }
            ),
            /* @__PURE__ */ e.jsx(
              w,
              {
                icon: /* @__PURE__ */ e.jsx(M, {}),
                onClick: U,
                children: a("reset", { defaultValue: "Reset" })
              }
            )
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(R, { children: [
      /* @__PURE__ */ e.jsxs(q, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx(L, { children: /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(M, {}), onClick: d, children: a("refresh", { defaultValue: "Refresh" }) }) }),
        /* @__PURE__ */ e.jsx(L, { children: /* @__PURE__ */ e.jsx(we, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(pe, {}),
            style: { marginBottom: 16 },
            onClick: () => l("/authorization/users/create"),
            children: s("user.create", { defaultValue: "Create User" })
          }
        ) }) })
      ] }),
      /* @__PURE__ */ e.jsx(
        ue,
        {
          columns: re,
          dataSource: h,
          rowKey: "id",
          loading: u,
          pagination: {
            current: m.current,
            pageSize: m.page_size,
            total: o,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (t) => a("totalItems", { defaultValue: `Total ${t} items`, total: t }),
            onChange: Y
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(_e, { user: k, onClose: () => y(null), onSuccess: () => {
      y(null), d();
    } })
  ] });
}, qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ke
}, Symbol.toStringTag, { value: "Module" })), { Title: Ee } = Q, { TabPane: B } = W, Pe = () => {
  const { id: l } = H(), s = N(), { t: a } = v("authorization"), { t: f } = v("common"), [h, i] = E(!1), [o, b] = E(null), { hasPermission: k } = Ue();
  if (K(() => {
    (async () => {
      if (l) {
        i(!0);
        try {
          const x = await V.authorization.getUser({ id: l });
          b(x);
        } catch (x) {
          x instanceof be && x.code === "E4041" || (console.error("Failed to get user details:", x), c.error(a("user.detailLoadError", { defaultValue: "Failed to load user details" })));
        } finally {
          i(!1);
        }
      }
    })();
  }, [l, a]), h)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(oe, { size: "large" }) });
  if (!o)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(Ee, { level: 4, children: a("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(w, { type: "primary", onClick: () => s("/authorization/users"), children: a("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const y = () => o.mfa_enabled ? /* @__PURE__ */ e.jsx(j, { status: "success", text: a("user.mfaEnabled", { defaultValue: "Enabled" }) }) : o.mfa_enforced ? /* @__PURE__ */ e.jsx(j, { status: "warning", text: a("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(j, { status: "default", text: a("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    R,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          X,
          {
            size: 64,
            icon: /* @__PURE__ */ e.jsx(Z, {}),
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
          w,
          {
            icon: /* @__PURE__ */ e.jsx(xe, {}),
            onClick: () => s("/authorization/users"),
            children: f("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(J, {}),
            onClick: () => s(`/authorization/users/${l}/edit`),
            children: f("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(W, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(B, { tab: a("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(g, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.username", { defaultValue: "Username" }), children: o.username }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.fullName", { defaultValue: "Full Name" }), children: o.full_name }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.email", { defaultValue: "Email" }), children: o.email }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.status", { defaultValue: "Status" }), children: o.status === "active" ? /* @__PURE__ */ e.jsx(j, { status: "success", text: a("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(j, { status: "error", text: a(`user.statusEnum.${o.status}`, { defaultValue: o.status.charAt(0).toUpperCase() + o.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.roles", { defaultValue: "Roles" }), span: 2, children: o.roles && o.roles.length > 0 ? o.roles.map((m) => /* @__PURE__ */ e.jsx(_, { color: "blue", children: m.name }, m.id)) : /* @__PURE__ */ e.jsx(_, { children: a("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.mfa", { defaultValue: "MFA" }), children: y() }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.lastLogin", { defaultValue: "Last Login" }), children: o.last_login ? I(o.last_login) : a("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.createdAt", { defaultValue: "Created At" }), children: I(o.created_at) }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.updatedAt", { defaultValue: "Updated At" }), children: I(o.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(B, { disabled: !k("authorization:user:view_audit_logs"), tab: a("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(ye, { userId: l || "" }) }, "logs")
      ] })
    }
  );
}, $e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pe
}, Symbol.toStringTag, { value: "Module" })), { Option: G } = z, ve = () => {
  const { id: l = "" } = H(), s = N(), { t: a } = v("authorization"), { t: f } = v("common"), [h] = p.useForm(), i = !!l, { data: o, loading: b } = P(async () => (await V.authorization.listRoles({})).data.map((n) => ({
    ...n,
    label: n.name,
    value: n.id
  }))), { loading: k } = P(async () => {
    if (!(!i || !h))
      try {
        const u = await V.authorization.getUser({ id: l });
        return h.setFieldsValue({
          username: u.username,
          email: u.email,
          full_name: u.full_name,
          status: u.status,
          role_ids: u.roles ? u.roles.map((n) => n.id) : [],
          mfa_enforced: u.mfa_enforced
        }), u;
      } catch {
        c.error(a("user.loadError", { defaultValue: "Failed to load user data" }));
      }
  }, { refreshDeps: [l, h] }), { run: y, loading: m } = P(async (u) => {
    try {
      if (i)
        await V.authorization.updateUser({ id: l }, {
          email: u.email,
          avatar: u.avatar,
          full_name: u.full_name,
          status: u.status,
          mfa_enforced: u.mfa_enforced,
          role_ids: u.role_ids
        }), c.success(a("user.updateSuccess", { defaultValue: "User updated successfully" })), s(`/authorization/users/${l}`);
      else {
        const n = {
          username: u.username,
          avatar: u.avatar,
          password: u.password,
          email: u.email,
          full_name: u.full_name,
          mfa_enforced: u.mfa_enforced,
          role_ids: u.role_ids
        }, U = await V.authorization.createUser(n);
        c.success(a("user.createSuccess", { defaultValue: "User created successfully" })), s(`/authorization/users/${U.id}`);
      }
    } catch (n) {
      c.error(i ? a("user.updateError", { defaultValue: "Failed to update user", error: n }) : a("user.createError", { defaultValue: "Failed to create user", error: n }));
    }
  }, { manual: !0 }), x = (u, n) => i ? Promise.resolve() : n ? n.length < 8 ? Promise.reject(new Error(a("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve() : Promise.reject(new Error(a("user.passwordRequired", { defaultValue: "Password is required" }))), d = (u, n) => i ? Promise.resolve() : n ? n !== h.getFieldValue("password") ? Promise.reject(new Error(a("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(a("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" })));
  return /* @__PURE__ */ e.jsx(
    R,
    {
      title: i ? a("user.editTitle", { defaultValue: "Edit User" }) : a("user.createTitle", { defaultValue: "Create User" }),
      loading: k || b,
      children: /* @__PURE__ */ e.jsxs(
        p,
        {
          form: h,
          layout: "horizontal",
          onFinish: y,
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
                label: a("user.avatar", { defaultValue: "Avatar" }),
                children: /* @__PURE__ */ e.jsx(ge, {})
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "username",
                label: a("user.username", { defaultValue: "Username" }),
                rules: [
                  { required: !i, message: a("user.usernameRequired", { defaultValue: "Username is required" }) }
                ],
                children: /* @__PURE__ */ e.jsx(S, { disabled: i, placeholder: a("user.usernamePlaceholder", { defaultValue: "Enter username" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "email",
                label: a("user.email", { defaultValue: "Email" }),
                rules: [
                  { required: !0, message: a("user.emailRequired", { defaultValue: "Email is required" }) },
                  { type: "email", message: a("user.emailInvalid", { defaultValue: "Invalid email format" }) }
                ],
                children: /* @__PURE__ */ e.jsx(S, { placeholder: a("user.emailPlaceholder", { defaultValue: "Enter email address" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "full_name",
                label: a("user.fullName", { defaultValue: "Full Name" }),
                rules: [{ required: !0, message: a("user.fullNameRequired", { defaultValue: "Full name is required" }) }],
                children: /* @__PURE__ */ e.jsx(S, { placeholder: a("user.fullNamePlaceholder", { defaultValue: "Enter full name" }) })
              }
            ),
            i && /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "status",
                label: a("user.status", { defaultValue: "Status" }),
                rules: [{ required: !0, message: a("user.statusRequired", { defaultValue: "Status is required" }) }],
                children: /* @__PURE__ */ e.jsxs(z, { placeholder: a("user.statusPlaceholder", { defaultValue: "Select status" }), children: [
                  /* @__PURE__ */ e.jsx(G, { value: "active", children: a("user.statusActive", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(G, { value: "disabled", children: a("user.statusDisabled", { defaultValue: "Disabled" }) })
                ] })
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "mfa_enforced",
                label: a("user.mfaEnforced", { defaultValue: "MFA Enforced" }),
                children: /* @__PURE__ */ e.jsx(ie, {})
              }
            ),
            !i && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                p.Item,
                {
                  name: "password",
                  label: a("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: x }],
                  children: /* @__PURE__ */ e.jsx(S.Password, { visibilityToggle: !1, placeholder: a("user.passwordPlaceholder", { defaultValue: "Enter password" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                p.Item,
                {
                  name: "confirm_password",
                  label: a("user.confirmPassword", { defaultValue: "Confirm Password" }),
                  rules: [{ validator: d }],
                  dependencies: ["password"],
                  children: /* @__PURE__ */ e.jsx(S.Password, { placeholder: a("user.confirmPasswordPlaceholder", { defaultValue: "Confirm password" }) })
                }
              )
            ] }),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "role_ids",
                label: a("user.roles", { defaultValue: "Roles" }),
                children: /* @__PURE__ */ e.jsx(
                  z,
                  {
                    mode: "multiple",
                    placeholder: a("user.selectRoles", { defaultValue: "Select roles" }),
                    options: o,
                    optionFilterProp: "label",
                    loading: b
                  }
                )
              }
            ),
            /* @__PURE__ */ e.jsx(p.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs(O, { children: [
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: m,
                  children: i ? f("update", { defaultValue: "Update" }) : f("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  onClick: () => s(i ? `/authorization/users/${l}` : "/authorization/users"),
                  children: f("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ve
}, Symbol.toStringTag, { value: "Module" }));
export {
  qe as U,
  $e as a,
  Me as b
};
