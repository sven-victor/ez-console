import { u as v, r as p, e as E, j as e, ac as Z, V as U, T as le, aI as j, E as ue, aB as J, a_ as oe, ax as ne, a$ as ie, b0 as de, aC as ce, C as D, X as q, Y as R, p as I, $ as M, Z as S, o as $, m as w, a0 as O, b1 as fe, F as me, M as L, s as c, J as K, S as he, aA as Q, aR as g, b2 as pe, aN as xe } from "./vendor.js";
import { useState as P, useEffect as W } from "react";
import { useNavigate as N, Link as je, useParams as X } from "react-router-dom";
import { A as Y, b as Ve, f as we, U as ye, c as ge } from "./components.js";
import { a as V } from "./index.js";
import { P as A, f as T } from "./base.js";
import { A as be } from "./client.js";
import { a as _e } from "./contexts.js";
const { Option: F } = S, Ue = ({ user: l, onClose: s, onSuccess: a }) => {
  const { t: f } = v("authorization"), [h, n] = P(null), [o, b] = P(null), { run: k, loading: y } = E(V.authorization.updateUser, {
    onSuccess: () => {
      c.success(f("user.updateUserSuccess", { defaultValue: "User updated successfully" })), a();
    },
    onError: (d) => {
      c.error(f("user.updateUserError", { defaultValue: "Failed to update user", error: d.message }));
    },
    manual: !0
  }), { data: m, loading: x } = E(async () => h === "bind" ? V.authorization.getLdapUsers({ skip_existing: !0 }).then((d) => {
    const u = [], i = [];
    for (const _ of d)
      _.username === (l == null ? void 0 : l.username) || _.email === (l == null ? void 0 : l.email) || _.full_name === (l == null ? void 0 : l.full_name) ? u.push({ recommend: !0, ..._ }) : i.push({ recommend: !1, ..._ });
    return [...u, ...i];
  }) : Promise.resolve([]), {
    refreshDeps: [l == null ? void 0 : l.id, h]
  });
  return W(() => {
    l && (n(null), b(null));
  }, [l]), /* @__PURE__ */ e.jsx(
    L,
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
      children: /* @__PURE__ */ e.jsxs($, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(w, { loading: y, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: h === "local" ? "primary" : "default", onClick: () => n("local"), children: f("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(w, { loading: y, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: h === "bind" ? "primary" : "default", onClick: () => n("bind"), children: f("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          S,
          {
            loading: x,
            style: { display: h === "bind" ? "block" : "none" },
            onSelect: (d) => b(d),
            options: m == null ? void 0 : m.map((d) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(U, { color: d.recommend ? "blue" : "default", children: d.full_name }),
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
  const l = N(), { t: s } = v("authorization"), { t: a } = v("common"), [f] = p.useForm(), [h, n] = P([]), [o, b] = P(0), [k, y] = P(null), [m, x] = P({
    current: A.DEFAULT_CURRENT,
    page_size: A.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  }), { run: d, loading: u } = E(() => {
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
      n(t.data || []), b(t.total || 0);
    },
    onError: (t) => {
      c.error(s("user.loadError", { defaultValue: "Failed to load users", error: t.message }));
    },
    refreshDeps: [m]
  }), i = (t) => {
    x({
      ...m,
      current: A.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: t.keywords,
      status: t.status
    });
  }, _ = () => {
    f.resetFields(), x({
      current: A.DEFAULT_CURRENT,
      page_size: A.DEFAULT_PAGE_SIZE,
      keywords: void 0,
      status: void 0
    });
  }, H = (t, r) => {
    x((z) => ({
      ...z,
      current: t,
      page_size: r
    }));
  }, { run: ee } = E(V.authorization.restoreUser, {
    onSuccess: () => {
      c.success(s("user.restoreSuccess", { defaultValue: "User restored successfully" })), d();
    },
    onError: (t) => {
      c.error(s("user.restoreError", { defaultValue: "Failed to restore user", error: t.message }));
    },
    manual: !0
  }), { run: se } = E(V.authorization.deleteUser, {
    onSuccess: () => {
      c.success(s("user.deleteSuccess", { defaultValue: "User deleted successfully" })), d();
    },
    onError: (t) => {
      c.error(s("user.deleteError", { defaultValue: "Failed to delete user", error: t.message }));
    },
    manual: !0
  }), ae = (t, r, z) => {
    L.confirm({
      title: s("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: s("user.resetPasswordConfirm", { defaultValue: `Are you sure you want to reset the password for ${r}?`, username: r }),
      okText: a("confirm", { defaultValue: "Confirm" }),
      cancelText: a("cancel", { defaultValue: "Cancel" }),
      onOk: async () => {
        try {
          const C = await V.authorization.resetUserPassword({ id: t }, { password: "" });
          c.success(s("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), C.new_password ? L.info({
            title: s("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
            content: /* @__PURE__ */ e.jsx(K.Text, { copyable: { text: C.new_password }, children: s("user.resetPasswordSuccessContent", { defaultValue: `New password: ${C.new_password}`, password: C.new_password }) })
          }) : L.info({
            title: s("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
            content: s("user.resetPasswordSuccessSendByEmail", { defaultValue: "The new password has been sent to the user email: {{email}}", email: z })
          });
        } catch (C) {
          console.error("Reset password error:", C), c.error(s("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
        }
      }
    });
  }, te = (t) => {
    L.confirm({
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
          Y,
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
            return r.ldap_dn ? /* @__PURE__ */ e.jsx(U, { color: "blue", children: s("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(le, { title: s("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(U, { color: "red", children: s("user.sourceLdap", { defaultValue: "LDAP" }) }) });
          case "oauth2":
            return /* @__PURE__ */ e.jsx(U, { color: "green", children: s("user.sourceOauth2", { defaultValue: "OAuth2" }) });
          default:
            return /* @__PURE__ */ e.jsx(U, { color: "default", children: s("user.sourceLocal", { defaultValue: "Local" }) });
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
      render: (t) => /* @__PURE__ */ e.jsx("span", { children: t && t.length > 0 ? t.map((r) => /* @__PURE__ */ e.jsx(U, { color: "blue", children: r.name }, r.id)) : /* @__PURE__ */ e.jsx(U, { children: s("user.noRole", { defaultValue: "No Role" }) }) })
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
      render: (t) => t ? T(t) : s("user.neverLogin", { defaultValue: "Never" })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "action",
      render: (t, r) => {
        const z = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(ue, {}),
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
          icon: /* @__PURE__ */ e.jsx(oe, {}),
          tooltip: s("user.unlock", { defaultValue: "Unlock" }),
          hidden: r.status !== "locked",
          onClick: () => te(r.id)
        }, {
          key: "resetPassword",
          permission: "authorization:user:resetPassword",
          icon: /* @__PURE__ */ e.jsx(ne, {}),
          disabled: r.disable_change_password,
          tooltip: r.disable_change_password ? s("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : s("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((r.source === "local" || r.source === "ldap" && r.ldap_dn) && r.status !== "deleted"),
          onClick: () => ae(r.id, r.username, r.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ie, {}),
          tooltip: s("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(r.source === "ldap" && !r.ldap_dn && r.status !== "deleted"),
          onClick: () => y(r)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(de, {}),
          tooltip: s("user.restore", { defaultValue: "Restore" }),
          hidden: r.status !== "deleted",
          confirm: {
            title: s("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: () => ee({ id: r.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(ce, {}),
          tooltip: s("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: s("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => se({ id: r.id }),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(Ve, { actions: z }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(D, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      p,
      {
        form: f,
        layout: "inline",
        onFinish: i,
        style: { marginBottom: 16 },
        children: /* @__PURE__ */ e.jsxs(q, { gutter: 16, style: { width: "100%" }, children: [
          /* @__PURE__ */ e.jsx(R, { span: 6, children: /* @__PURE__ */ e.jsx(p.Item, { name: "keywords", children: /* @__PURE__ */ e.jsx(
            I,
            {
              prefix: /* @__PURE__ */ e.jsx(M, {}),
              placeholder: s("user.keywords", { defaultValue: "Search by username, full name, or email" }),
              allowClear: !0
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(R, { span: 6, children: /* @__PURE__ */ e.jsx(p.Item, { name: "status", children: /* @__PURE__ */ e.jsxs(
            S,
            {
              placeholder: s("user.status", { defaultValue: "Status" }),
              allowClear: !0,
              style: { width: "100%" },
              children: [
                /* @__PURE__ */ e.jsx(F, { value: "active", children: s("user.statusEnum.active", { defaultValue: "Active" }) }),
                /* @__PURE__ */ e.jsx(F, { value: "disabled", children: s("user.statusEnum.disabled", { defaultValue: "Disabled" }) }),
                /* @__PURE__ */ e.jsx(F, { value: "deleted", children: s("user.statusEnum.deleted", { defaultValue: "Deleted" }) }),
                /* @__PURE__ */ e.jsx(F, { value: "locked", children: s("user.statusEnum.locked", { defaultValue: "Locked" }) }),
                /* @__PURE__ */ e.jsx(F, { value: "password_expired", children: s("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(R, { span: 6, children: /* @__PURE__ */ e.jsxs($, { children: [
            /* @__PURE__ */ e.jsx(
              w,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(M, {}),
                htmlType: "submit",
                children: a("search", { defaultValue: "Search" })
              }
            ),
            /* @__PURE__ */ e.jsx(
              w,
              {
                icon: /* @__PURE__ */ e.jsx(O, {}),
                onClick: _,
                children: a("reset", { defaultValue: "Reset" })
              }
            )
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(D, { children: [
      /* @__PURE__ */ e.jsxs(q, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx(R, { children: /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(O, {}), onClick: d, children: a("refresh", { defaultValue: "Refresh" }) }) }),
        /* @__PURE__ */ e.jsx(R, { children: /* @__PURE__ */ e.jsx(we, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(fe, {}),
            style: { marginBottom: 16 },
            onClick: () => l("/authorization/users/create"),
            children: s("user.create", { defaultValue: "Create User" })
          }
        ) }) })
      ] }),
      /* @__PURE__ */ e.jsx(
        me,
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
            onChange: H
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(Ue, { user: k, onClose: () => y(null), onSuccess: () => {
      y(null), d();
    } })
  ] });
}, Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ke
}, Symbol.toStringTag, { value: "Module" })), { Title: Pe } = K, { TabPane: B } = Q, Ee = () => {
  const { id: l } = X(), s = N(), { t: a } = v("authorization"), { t: f } = v("common"), [h, n] = P(!1), [o, b] = P(null), { hasPermission: k } = _e();
  if (W(() => {
    (async () => {
      if (l) {
        n(!0);
        try {
          const x = await V.authorization.getUser({ id: l });
          b(x);
        } catch (x) {
          x instanceof be && x.code === "E4041" || (console.error("Failed to get user details:", x), c.error(a("user.detailLoadError", { defaultValue: "Failed to load user details" })));
        } finally {
          n(!1);
        }
      }
    })();
  }, [l, a]), h)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(he, { size: "large" }) });
  if (!o)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(Pe, { level: 4, children: a("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(w, { type: "primary", onClick: () => s("/authorization/users"), children: a("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const y = () => o.mfa_enabled ? /* @__PURE__ */ e.jsx(j, { status: "success", text: a("user.mfaEnabled", { defaultValue: "Enabled" }) }) : o.mfa_enforced ? /* @__PURE__ */ e.jsx(j, { status: "warning", text: a("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(j, { status: "default", text: a("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    D,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          Y,
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
      extra: /* @__PURE__ */ e.jsxs($, { children: [
        /* @__PURE__ */ e.jsx(
          w,
          {
            icon: /* @__PURE__ */ e.jsx(pe, {}),
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
      children: /* @__PURE__ */ e.jsxs(Q, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(B, { tab: a("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(g, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.username", { defaultValue: "Username" }), children: o.username }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.fullName", { defaultValue: "Full Name" }), children: o.full_name }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.email", { defaultValue: "Email" }), children: o.email }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.status", { defaultValue: "Status" }), children: o.status === "active" ? /* @__PURE__ */ e.jsx(j, { status: "success", text: a("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(j, { status: "error", text: a(`user.statusEnum.${o.status}`, { defaultValue: o.status.charAt(0).toUpperCase() + o.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.roles", { defaultValue: "Roles" }), span: 2, children: o.roles && o.roles.length > 0 ? o.roles.map((m) => /* @__PURE__ */ e.jsx(U, { color: "blue", children: m.name }, m.id)) : /* @__PURE__ */ e.jsx(U, { children: a("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.mfa", { defaultValue: "MFA" }), children: y() }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.lastLogin", { defaultValue: "Last Login" }), children: o.last_login ? T(o.last_login) : a("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.createdAt", { defaultValue: "Created At" }), children: T(o.created_at) }),
          /* @__PURE__ */ e.jsx(g.Item, { label: a("user.updatedAt", { defaultValue: "Updated At" }), children: T(o.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(B, { disabled: !k("authorization:user:view_audit_logs"), tab: a("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(ye, { userId: l || "" }) }, "logs")
      ] })
    }
  );
}, De = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ee
}, Symbol.toStringTag, { value: "Module" })), { Option: G } = S, ve = () => {
  const { id: l = "" } = X(), s = N(), { t: a } = v("authorization"), { t: f } = v("common"), [h] = p.useForm(), n = !!l, { data: o, loading: b } = E(async () => (await V.authorization.listRoles({})).data.map((i) => ({
    ...i,
    label: i.name,
    value: i.id
  }))), { loading: k } = E(async () => {
    if (!(!n || !h))
      try {
        const u = await V.authorization.getUser({ id: l });
        return h.setFieldsValue({
          username: u.username,
          email: u.email,
          full_name: u.full_name,
          status: u.status,
          role_ids: u.roles ? u.roles.map((i) => i.id) : [],
          mfa_enforced: u.mfa_enforced
        }), u;
      } catch {
        c.error(a("user.loadError", { defaultValue: "Failed to load user data" }));
      }
  }, { refreshDeps: [l, h] }), { run: y, loading: m } = E(async (u) => {
    try {
      if (n)
        await V.authorization.updateUser({ id: l }, {
          email: u.email,
          avatar: u.avatar,
          full_name: u.full_name,
          status: u.status,
          mfa_enforced: u.mfa_enforced,
          role_ids: u.role_ids
        }), c.success(a("user.updateSuccess", { defaultValue: "User updated successfully" })), s(`/authorization/users/${l}`);
      else {
        const i = {
          username: u.username,
          avatar: u.avatar,
          password: u.password,
          email: u.email,
          full_name: u.full_name,
          mfa_enforced: u.mfa_enforced,
          role_ids: u.role_ids
        }, _ = await V.authorization.createUser(i);
        c.success(a("user.createSuccess", { defaultValue: "User created successfully" })), s(`/authorization/users/${_.id}`);
      }
    } catch (i) {
      c.error(n ? a("user.updateError", { defaultValue: "Failed to update user", error: i }) : a("user.createError", { defaultValue: "Failed to create user", error: i }));
    }
  }, { manual: !0 }), x = (u, i) => n ? Promise.resolve() : i ? i.length < 8 ? Promise.reject(new Error(a("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve() : Promise.reject(new Error(a("user.passwordRequired", { defaultValue: "Password is required" }))), d = (u, i) => n ? Promise.resolve() : i ? i !== h.getFieldValue("password") ? Promise.reject(new Error(a("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(a("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" })));
  return /* @__PURE__ */ e.jsx(
    D,
    {
      title: n ? a("user.editTitle", { defaultValue: "Edit User" }) : a("user.createTitle", { defaultValue: "Create User" }),
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
                  { required: !n, message: a("user.usernameRequired", { defaultValue: "Username is required" }) }
                ],
                children: /* @__PURE__ */ e.jsx(I, { disabled: n, placeholder: a("user.usernamePlaceholder", { defaultValue: "Enter username" }) })
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
                children: /* @__PURE__ */ e.jsx(I, { placeholder: a("user.emailPlaceholder", { defaultValue: "Enter email address" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "full_name",
                label: a("user.fullName", { defaultValue: "Full Name" }),
                rules: [{ required: !0, message: a("user.fullNameRequired", { defaultValue: "Full name is required" }) }],
                children: /* @__PURE__ */ e.jsx(I, { placeholder: a("user.fullNamePlaceholder", { defaultValue: "Enter full name" }) })
              }
            ),
            n && /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "status",
                label: a("user.status", { defaultValue: "Status" }),
                rules: [{ required: !0, message: a("user.statusRequired", { defaultValue: "Status is required" }) }],
                children: /* @__PURE__ */ e.jsxs(S, { placeholder: a("user.statusPlaceholder", { defaultValue: "Select status" }), children: [
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
                children: /* @__PURE__ */ e.jsx(xe, {})
              }
            ),
            !n && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                p.Item,
                {
                  name: "password",
                  label: a("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: x }],
                  children: /* @__PURE__ */ e.jsx(I.Password, { visibilityToggle: !1, placeholder: a("user.passwordPlaceholder", { defaultValue: "Enter password" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                p.Item,
                {
                  name: "confirm_password",
                  label: a("user.confirmPassword", { defaultValue: "Confirm Password" }),
                  rules: [{ validator: d }],
                  dependencies: ["password"],
                  children: /* @__PURE__ */ e.jsx(I.Password, { placeholder: a("user.confirmPasswordPlaceholder", { defaultValue: "Confirm password" }) })
                }
              )
            ] }),
            /* @__PURE__ */ e.jsx(
              p.Item,
              {
                name: "role_ids",
                label: a("user.roles", { defaultValue: "Roles" }),
                children: /* @__PURE__ */ e.jsx(
                  S,
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
            /* @__PURE__ */ e.jsx(p.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs($, { children: [
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: m,
                  children: n ? f("update", { defaultValue: "Update" }) : f("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  onClick: () => s(n ? `/authorization/users/${l}` : "/authorization/users"),
                  children: f("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, $e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ve
}, Symbol.toStringTag, { value: "Module" }));
export {
  Te as U,
  De as a,
  $e as b
};
