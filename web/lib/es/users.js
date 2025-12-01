import { j as e } from "./vendor.js";
import { useState as A, useCallback as Q, useEffect as ee } from "react";
import { Form as g, message as i, Spin as q, Tag as v, Tooltip as me, Badge as w, Card as M, Row as J, Col as I, Input as T, Select as D, Space as B, Button as _, Table as fe, Modal as N, Typography as ae, Tabs as se, Descriptions as E, Switch as he } from "antd";
import { UserOutlined as te, EyeOutlined as pe, EditOutlined as re, UnlockOutlined as xe, KeyOutlined as je, ToolOutlined as ge, UndoOutlined as Ve, DeleteOutlined as we, SearchOutlined as H, ReloadOutlined as X, UserAddOutlined as ye, ArrowLeftOutlined as be } from "@ant-design/icons";
import { useNavigate as W, Link as _e, useParams as le } from "react-router-dom";
import { A as ue, e as Ue, j as ze, U as Ee, f as ke } from "./components.js";
import { a as V } from "./index.js";
import { P as R, f as $ } from "./base.js";
import { useTranslation as F } from "react-i18next";
import { useRequest as U } from "ahooks";
import { b as Z, a as Pe } from "./contexts.js";
import { A as ve } from "./client.js";
const { Option: O } = D, Ce = ({ user: u, onClose: s, onSuccess: a }) => {
  const { t: f } = F("authorization"), [h, d] = A(null), [n, y] = A(null), { run: k, loading: P } = U(V.authorization.updateUser, {
    onSuccess: () => {
      i.success(f("user.updateUserSuccess", { defaultValue: "User updated successfully" })), a();
    },
    onError: (c) => {
      i.error(f("user.updateUserError", { defaultValue: "Failed to update user", error: c.message }));
    },
    manual: !0
  }), { data: x, loading: j } = U(async () => h === "bind" ? V.authorization.getLdapUsers({ skip_existing: !0 }).then((c) => {
    const b = [], p = [];
    for (const m of c)
      m.username === (u == null ? void 0 : u.username) || m.email === (u == null ? void 0 : u.email) || m.full_name === (u == null ? void 0 : u.full_name) ? b.push({ recommend: !0, ...m }) : p.push({ recommend: !1, ...m });
    return [...b, ...p];
  }) : Promise.resolve([]), {
    refreshDeps: [u == null ? void 0 : u.id, h]
  });
  return ee(() => {
    u && (d(null), y(null));
  }, [u]), /* @__PURE__ */ e.jsx(
    N,
    {
      open: u !== null,
      onCancel: s,
      onOk: () => {
        if (u) {
          if (h === "local")
            return k({ id: u.id }, { source: "local" });
          if (h === "bind") {
            if (!n) {
              i.error(f("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return k({ id: u.id }, { source: "ldap", ldap_dn: n });
          } else {
            i.error(f("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        i.error(f("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: f("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs(B, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(_, { loading: P, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: h === "local" ? "primary" : "default", onClick: () => d("local"), children: f("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(_, { loading: P, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: h === "bind" ? "primary" : "default", onClick: () => d("bind"), children: f("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          D,
          {
            loading: j,
            style: { display: h === "bind" ? "block" : "none" },
            onSelect: (c) => y(c),
            options: x == null ? void 0 : x.map((c) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(v, { color: c.recommend ? "blue" : "default", children: c.full_name }),
              " ",
              c.username,
              " - ",
              c.email,
              " - ",
              c.ldap_dn
            ] }), value: c.ldap_dn })),
            showSearch: !0
          }
        )
      ] })
    }
  );
}, Se = () => {
  const u = W(), { t: s } = F("authorization"), { t: a } = F("common"), [f] = g.useForm(), [h, d] = A([]), [n, y] = A(0), { enableMultiOrg: k } = Z(), [P, x] = A(null), [j, c] = A({
    current: R.DEFAULT_CURRENT,
    page_size: R.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  }), { data: b, loading: p } = U(async () => (await V.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [k],
    onError: (r) => {
      i.error(s("organizations.loadError", { defaultValue: "Failed to load organizations", error: r.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), m = Q((r, t) => {
    if (p)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(q, { size: "small" }),
        ":",
        t.name
      ] });
    const C = b == null ? void 0 : b.find((S) => S.id === r);
    return C ? `${C.name}:${t.name}` : t.name;
  }, [b, p]), { run: z, loading: l } = U(() => {
    const r = {
      status: j.status,
      keywords: j.keywords
    };
    return V.authorization.listUsers({
      current: j.current,
      page_size: j.page_size,
      ...r
    });
  }, {
    onSuccess: (r) => {
      d(r.data || []), y(r.total || 0);
    },
    onError: (r) => {
      i.error(s("user.loadError", { defaultValue: "Failed to load users", error: r.message }));
    },
    refreshDeps: [j]
  }), o = (r) => {
    c({
      ...j,
      current: R.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: r.keywords,
      status: r.status
    });
  }, L = () => {
    f.resetFields(), c({
      current: R.DEFAULT_CURRENT,
      page_size: R.DEFAULT_PAGE_SIZE,
      keywords: void 0,
      status: void 0
    });
  }, K = (r, t) => {
    c((C) => ({
      ...C,
      current: r,
      page_size: t
    }));
  }, { run: ne } = U(V.authorization.restoreUser, {
    onSuccess: () => {
      i.success(s("user.restoreSuccess", { defaultValue: "User restored successfully" })), z();
    },
    onError: (r) => {
      i.error(s("user.restoreError", { defaultValue: "Failed to restore user", error: r.message }));
    },
    manual: !0
  }), { run: oe } = U(V.authorization.deleteUser, {
    onSuccess: () => {
      i.success(s("user.deleteSuccess", { defaultValue: "User deleted successfully" })), z();
    },
    onError: (r) => {
      i.error(s("user.deleteError", { defaultValue: "Failed to delete user", error: r.message }));
    },
    manual: !0
  }), ie = (r, t, C) => {
    N.confirm({
      title: s("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: s("user.resetPasswordConfirm", { defaultValue: `Are you sure you want to reset the password for ${t}?`, username: t }),
      okText: a("confirm", { defaultValue: "Confirm" }),
      cancelText: a("cancel", { defaultValue: "Cancel" }),
      onOk: async () => {
        try {
          const S = await V.authorization.resetUserPassword({ id: r }, { password: "" });
          i.success(s("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), S.new_password ? N.info({
            title: s("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
            content: /* @__PURE__ */ e.jsx(ae.Text, { copyable: { text: S.new_password }, children: s("user.resetPasswordSuccessContent", { defaultValue: `New password: ${S.new_password}`, password: S.new_password }) })
          }) : N.info({
            title: s("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
            content: s("user.resetPasswordSuccessSendByEmail", { defaultValue: "The new password has been sent to the user email: {{email}}", email: C })
          });
        } catch (S) {
          console.error("Reset password error:", S), i.error(s("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
        }
      }
    });
  }, de = (r) => {
    N.confirm({
      title: s("user.unlockTitle", { defaultValue: "Unlock User" }),
      content: s("user.unlockConfirm", { defaultValue: "Are you sure you want to unlock this user?" }),
      onOk: async () => {
        try {
          await V.authorization.unlockUser({ id: r }), i.success(s("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), z();
        } catch (t) {
          i.error(s("user.unlockError", { defaultValue: "Failed to unlock user: {{error}}", error: t.message ?? String(t) }));
        }
      }
    });
  }, ce = [
    {
      title: s("user.username", { defaultValue: "Username" }),
      key: "user",
      render: (r, t) => /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          ue,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(te, {}),
            src: t.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(_e, { to: `/authorization/users/${t.id}`, children: t.username })
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
      render: (r, t) => {
        switch (r) {
          case "ldap":
            return t.ldap_dn ? /* @__PURE__ */ e.jsx(v, { color: "blue", children: s("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(me, { title: s("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(v, { color: "red", children: s("user.sourceLdap", { defaultValue: "LDAP" }) }) });
          case "oauth2":
            return /* @__PURE__ */ e.jsx(v, { color: "green", children: s("user.sourceOauth2", { defaultValue: "OAuth2" }) });
          default:
            return /* @__PURE__ */ e.jsx(v, { color: "default", children: s("user.sourceLocal", { defaultValue: "Local" }) });
        }
      }
    },
    {
      title: s("user.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (r) => {
        switch (r) {
          case "disabled":
            return /* @__PURE__ */ e.jsx(w, { status: "default", text: s("user.statusEnum.disabled", { defaultValue: "Disabled" }) });
          case "password_expired":
            return /* @__PURE__ */ e.jsx(w, { status: "warning", text: s("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) });
          case "active":
            return /* @__PURE__ */ e.jsx(w, { status: "success", text: s("user.statusEnum.active", { defaultValue: "Active" }) });
          case "locked":
            return /* @__PURE__ */ e.jsx(w, { status: "warning", text: s("user.statusEnum.locked", { defaultValue: "Locked" }) });
          case "deleted":
            return /* @__PURE__ */ e.jsx(w, { status: "error", text: s("user.statusEnum.deleted", { defaultValue: "Deleted" }) });
          default:
            return /* @__PURE__ */ e.jsx(w, { status: "default", text: s(`user.statusEnum.${r}`, { defaultValue: r.charAt(0).toUpperCase() + r.slice(1) }) });
        }
      }
    },
    {
      title: s("user.roles", { defaultValue: "Roles" }),
      dataIndex: "roles",
      key: "roles",
      render: (r) => /* @__PURE__ */ e.jsx("span", { children: r && r.length > 0 ? r.map((t) => /* @__PURE__ */ e.jsx(v, { color: "blue", children: t.organization_id ? m(t.organization_id, t) : t.name }, t.id)) : /* @__PURE__ */ e.jsx(v, { children: s("user.noRole", { defaultValue: "No Role" }) }) })
    },
    {
      title: s("user.mfa", { defaultValue: "MFA" }),
      dataIndex: "mfa_enabled",
      key: "mfa_enabled",
      render: (r) => r ? /* @__PURE__ */ e.jsx(w, { status: "success", text: s("user.mfaEnabled", { defaultValue: "Enabled" }) }) : /* @__PURE__ */ e.jsx(w, { status: "default", text: s("user.mfaDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("user.lastLogin", { defaultValue: "Last Login" }),
      dataIndex: "last_login",
      key: "last_login",
      render: (r) => r ? $(r) : s("user.neverLogin", { defaultValue: "Never" })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 150,
      render: (r, t) => {
        const C = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(pe, {}),
          tooltip: s("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: async () => u(`/authorization/users/${t.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(re, {}),
          tooltip: s("user.edit", { defaultValue: "Edit" }),
          hidden: t.status === "locked" || t.status === "deleted",
          onClick: async () => u(`/authorization/users/${t.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(xe, {}),
          tooltip: s("user.unlock", { defaultValue: "Unlock" }),
          hidden: t.status !== "locked",
          onClick: async () => de(t.id)
        }, {
          key: "resetPassword",
          permission: "authorization:user:resetPassword",
          icon: /* @__PURE__ */ e.jsx(je, {}),
          disabled: t.disable_change_password,
          tooltip: t.disable_change_password ? s("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : s("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((t.source === "local" || t.source === "ldap" && t.ldap_dn) && t.status !== "deleted"),
          onClick: async () => ie(t.id, t.username, t.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ge, {}),
          tooltip: s("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(t.source === "ldap" && !t.ldap_dn && t.status !== "deleted"),
          onClick: async () => x(t)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ve, {}),
          tooltip: s("user.restore", { defaultValue: "Restore" }),
          hidden: t.status !== "deleted",
          confirm: {
            title: s("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => ne({ id: t.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(we, {}),
          tooltip: s("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: s("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => oe({ id: t.id }),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(Ue, { actions: C }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(M, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      g,
      {
        form: f,
        layout: "inline",
        onFinish: o,
        style: { marginBottom: 16 },
        children: /* @__PURE__ */ e.jsxs(J, { gutter: 16, style: { width: "100%" }, children: [
          /* @__PURE__ */ e.jsx(I, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "keywords", children: /* @__PURE__ */ e.jsx(
            T,
            {
              prefix: /* @__PURE__ */ e.jsx(H, {}),
              placeholder: s("user.keywords", { defaultValue: "Search by username, full name, or email" }),
              allowClear: !0
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(I, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "status", children: /* @__PURE__ */ e.jsxs(
            D,
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
          /* @__PURE__ */ e.jsx(I, { span: 6, children: /* @__PURE__ */ e.jsxs(B, { children: [
            /* @__PURE__ */ e.jsx(
              _,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(H, {}),
                htmlType: "submit",
                children: a("search", { defaultValue: "Search" })
              }
            ),
            /* @__PURE__ */ e.jsx(
              _,
              {
                icon: /* @__PURE__ */ e.jsx(X, {}),
                onClick: L,
                children: a("reset", { defaultValue: "Reset" })
              }
            )
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(M, { children: [
      /* @__PURE__ */ e.jsxs(J, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx(I, { children: /* @__PURE__ */ e.jsx(_, { type: "primary", icon: /* @__PURE__ */ e.jsx(X, {}), onClick: z, children: a("refresh", { defaultValue: "Refresh" }) }) }),
        /* @__PURE__ */ e.jsx(I, { children: /* @__PURE__ */ e.jsx(ze, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
          _,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ye, {}),
            style: { marginBottom: 16 },
            onClick: () => u("/authorization/users/create"),
            children: s("user.create", { defaultValue: "Create User" })
          }
        ) }) })
      ] }),
      /* @__PURE__ */ e.jsx(
        fe,
        {
          columns: ce,
          dataSource: h,
          rowKey: "id",
          loading: l,
          pagination: {
            current: j.current,
            pageSize: j.page_size,
            total: n,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (r) => a("totalItems", { defaultValue: `Total ${r} items`, total: r }),
            onChange: K
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(Ce, { user: P, onClose: () => x(null), onSuccess: () => {
      x(null), z();
    } })
  ] });
}, Qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Se
}, Symbol.toStringTag, { value: "Module" })), { Title: Ae } = ae, { TabPane: Y } = se, Fe = () => {
  const { id: u } = le(), s = W(), { t: a } = F("authorization"), { t: f } = F("common"), [h, d] = A(!1), [n, y] = A(null), { hasPermission: k } = Pe(), { enableMultiOrg: P } = Z(), { data: x, loading: j } = U(async () => (await V.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [P],
    onError: (p) => {
      i.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: p.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), c = Q((p, m) => {
    if (j)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(q, { size: "small" }),
        ":",
        m.name
      ] });
    const z = x == null ? void 0 : x.find((l) => l.id === p);
    return z ? `${z.name}:${m.name}` : m.name;
  }, [x, j]);
  if (ee(() => {
    (async () => {
      if (u) {
        d(!0);
        try {
          const m = await V.authorization.getUser({ id: u });
          y(m);
        } catch (m) {
          m instanceof ve && m.code === "E4041" || (console.error("Failed to get user details:", m), i.error(a("user.detailLoadError", { defaultValue: "Failed to load user details" })));
        } finally {
          d(!1);
        }
      }
    })();
  }, [u, a]), h)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(q, { size: "large" }) });
  if (!n)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(Ae, { level: 4, children: a("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(_, { type: "primary", onClick: () => s("/authorization/users"), children: a("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const b = () => n.mfa_enabled ? /* @__PURE__ */ e.jsx(w, { status: "success", text: a("user.mfaEnabled", { defaultValue: "Enabled" }) }) : n.mfa_enforced ? /* @__PURE__ */ e.jsx(w, { status: "warning", text: a("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(w, { status: "default", text: a("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    M,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          ue,
          {
            size: 64,
            icon: /* @__PURE__ */ e.jsx(te, {}),
            src: n.avatar,
            style: { marginRight: 16 }
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 20, fontWeight: "bold" }, children: n.username }),
          /* @__PURE__ */ e.jsx("div", { style: { color: "#888" }, children: n.email })
        ] })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(B, { children: [
        /* @__PURE__ */ e.jsx(
          _,
          {
            icon: /* @__PURE__ */ e.jsx(be, {}),
            onClick: () => s("/authorization/users"),
            children: f("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          _,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(re, {}),
            onClick: () => s(`/authorization/users/${u}/edit`),
            children: f("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(se, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(Y, { tab: a("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(E, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(E.Item, { label: a("user.username", { defaultValue: "Username" }), children: n.username }),
          /* @__PURE__ */ e.jsx(E.Item, { label: a("user.fullName", { defaultValue: "Full Name" }), children: n.full_name }),
          /* @__PURE__ */ e.jsx(E.Item, { label: a("user.email", { defaultValue: "Email" }), children: n.email }),
          /* @__PURE__ */ e.jsx(E.Item, { label: a("user.status", { defaultValue: "Status" }), children: n.status === "active" ? /* @__PURE__ */ e.jsx(w, { status: "success", text: a("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(w, { status: "error", text: a(`user.statusEnum.${n.status}`, { defaultValue: n.status.charAt(0).toUpperCase() + n.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(E.Item, { label: a("user.roles", { defaultValue: "Roles" }), span: 2, children: n.roles && n.roles.length > 0 ? n.roles.map((p) => /* @__PURE__ */ e.jsx(v, { color: "blue", children: P ? c(p.organization_id, p) : p.name }, p.id)) : /* @__PURE__ */ e.jsx(v, { children: a("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(E.Item, { label: a("user.mfa", { defaultValue: "MFA" }), children: b() }),
          /* @__PURE__ */ e.jsx(E.Item, { label: a("user.lastLogin", { defaultValue: "Last Login" }), children: n.last_login ? $(n.last_login) : a("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(E.Item, { label: a("user.createdAt", { defaultValue: "Created At" }), children: $(n.created_at) }),
          /* @__PURE__ */ e.jsx(E.Item, { label: a("user.updatedAt", { defaultValue: "Updated At" }), children: $(n.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(Y, { disabled: !k("authorization:user:view_audit_logs"), tab: a("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(Ee, { userId: u || "" }) }, "logs")
      ] })
    }
  );
}, We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fe
}, Symbol.toStringTag, { value: "Module" })), { Option: G } = D, Le = () => {
  const { id: u = "" } = le(), s = W(), { t: a } = F("authorization"), { t: f } = F("common"), [h] = g.useForm(), d = !!u, { enableMultiOrg: n } = Z(), { data: y, loading: k } = U(async () => (await V.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [n],
    onError: (l) => {
      i.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: l.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), P = Q((l, o) => {
    if (k)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(q, { size: "small" }),
        ":",
        o.name
      ] });
    const L = y == null ? void 0 : y.find((K) => K.id === l);
    return L ? `${L.name}:${o.name}` : o.name;
  }, [y, k]), { data: x, loading: j } = U(async () => (await V.authorization.listRoles({})).data.map((o) => ({
    ...o,
    label: o.name,
    value: o.id
  }))), { loading: c } = U(async () => {
    if (!(!d || !h))
      try {
        const l = await V.authorization.getUser({ id: u });
        return h.setFieldsValue({
          username: l.username,
          email: l.email,
          full_name: l.full_name,
          status: l.status,
          role_ids: l.roles ? l.roles.map((o) => o.id) : [],
          mfa_enforced: l.mfa_enforced
        }), l;
      } catch {
        i.error(a("user.loadError", { defaultValue: "Failed to load user data" }));
      }
  }, { refreshDeps: [u, h] }), { run: b, loading: p } = U(async (l) => {
    try {
      if (d)
        await V.authorization.updateUser({ id: u }, {
          email: l.email,
          avatar: l.avatar,
          full_name: l.full_name,
          status: l.status,
          mfa_enforced: l.mfa_enforced,
          role_ids: l.role_ids
        }), i.success(a("user.updateSuccess", { defaultValue: "User updated successfully" })), s(`/authorization/users/${u}`);
      else {
        const o = {
          username: l.username,
          avatar: l.avatar,
          password: l.password,
          email: l.email,
          full_name: l.full_name,
          mfa_enforced: l.mfa_enforced,
          role_ids: l.role_ids
        }, L = await V.authorization.createUser(o);
        i.success(a("user.createSuccess", { defaultValue: "User created successfully" })), s(`/authorization/users/${L.id}`);
      }
    } catch (o) {
      i.error(d ? a("user.updateError", { defaultValue: "Failed to update user", error: o }) : a("user.createError", { defaultValue: "Failed to create user", error: o }));
    }
  }, { manual: !0 }), m = (l, o) => d ? Promise.resolve() : o ? o.length < 8 ? Promise.reject(new Error(a("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve() : Promise.reject(new Error(a("user.passwordRequired", { defaultValue: "Password is required" }))), z = (l, o) => d ? Promise.resolve() : o ? o !== h.getFieldValue("password") ? Promise.reject(new Error(a("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(a("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" })));
  return /* @__PURE__ */ e.jsx(
    M,
    {
      title: d ? a("user.editTitle", { defaultValue: "Edit User" }) : a("user.createTitle", { defaultValue: "Create User" }),
      loading: c || j,
      children: /* @__PURE__ */ e.jsxs(
        g,
        {
          form: h,
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
              g.Item,
              {
                name: "avatar",
                label: a("user.avatar", { defaultValue: "Avatar" }),
                children: /* @__PURE__ */ e.jsx(ke, {})
              }
            ),
            /* @__PURE__ */ e.jsx(
              g.Item,
              {
                name: "username",
                label: a("user.username", { defaultValue: "Username" }),
                rules: [
                  { required: !d, message: a("user.usernameRequired", { defaultValue: "Username is required" }) }
                ],
                children: /* @__PURE__ */ e.jsx(T, { disabled: d, placeholder: a("user.usernamePlaceholder", { defaultValue: "Enter username" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              g.Item,
              {
                name: "email",
                label: a("user.email", { defaultValue: "Email" }),
                rules: [
                  { required: !0, message: a("user.emailRequired", { defaultValue: "Email is required" }) },
                  { type: "email", message: a("user.emailInvalid", { defaultValue: "Invalid email format" }) }
                ],
                children: /* @__PURE__ */ e.jsx(T, { placeholder: a("user.emailPlaceholder", { defaultValue: "Enter email address" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              g.Item,
              {
                name: "full_name",
                label: a("user.fullName", { defaultValue: "Full Name" }),
                rules: [{ required: !0, message: a("user.fullNameRequired", { defaultValue: "Full name is required" }) }],
                children: /* @__PURE__ */ e.jsx(T, { placeholder: a("user.fullNamePlaceholder", { defaultValue: "Enter full name" }) })
              }
            ),
            d && /* @__PURE__ */ e.jsx(
              g.Item,
              {
                name: "status",
                label: a("user.status", { defaultValue: "Status" }),
                rules: [{ required: !0, message: a("user.statusRequired", { defaultValue: "Status is required" }) }],
                children: /* @__PURE__ */ e.jsxs(D, { placeholder: a("user.statusPlaceholder", { defaultValue: "Select status" }), children: [
                  /* @__PURE__ */ e.jsx(G, { value: "active", children: a("user.statusActive", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(G, { value: "disabled", children: a("user.statusDisabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(G, { value: "password_expired", children: a("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) })
                ] })
              }
            ),
            /* @__PURE__ */ e.jsx(
              g.Item,
              {
                name: "mfa_enforced",
                label: a("user.mfaEnforced", { defaultValue: "MFA Enforced" }),
                children: /* @__PURE__ */ e.jsx(he, {})
              }
            ),
            !d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "password",
                  label: a("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: m }],
                  children: /* @__PURE__ */ e.jsx(T.Password, { visibilityToggle: !1, autoComplete: "new-password", placeholder: a("user.passwordPlaceholder", { defaultValue: "Enter password" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                g.Item,
                {
                  name: "confirm_password",
                  label: a("user.confirmPassword", { defaultValue: "Confirm Password" }),
                  rules: [{ validator: z }],
                  dependencies: ["password"],
                  children: /* @__PURE__ */ e.jsx(T.Password, { placeholder: a("user.confirmPasswordPlaceholder", { defaultValue: "Confirm password" }) })
                }
              )
            ] }),
            /* @__PURE__ */ e.jsx(
              g.Item,
              {
                name: "role_ids",
                label: a("user.roles", { defaultValue: "Roles" }),
                children: /* @__PURE__ */ e.jsx(
                  D,
                  {
                    mode: "multiple",
                    placeholder: a("user.selectRoles", { defaultValue: "Select roles" }),
                    options: x == null ? void 0 : x.map((l) => ({
                      ...l,
                      label: n ? P(l.organization_id, l) : l.name
                    })),
                    optionFilterProp: "label",
                    loading: j
                  }
                )
              }
            ),
            /* @__PURE__ */ e.jsx(g.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs(B, { children: [
              /* @__PURE__ */ e.jsx(
                _,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: p,
                  children: d ? f("update", { defaultValue: "Update" }) : f("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                _,
                {
                  onClick: () => s(d ? `/authorization/users/${u}` : "/authorization/users"),
                  children: f("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, Ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Le
}, Symbol.toStringTag, { value: "Module" }));
export {
  Qe as U,
  We as a,
  Ze as b
};
