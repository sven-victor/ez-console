import { j as e } from "./vendor.js";
import { useState as S, useEffect as Q, useCallback as W } from "react";
import { Form as x, message as d, Spin as M, Tag as P, Tooltip as je, Badge as V, Card as B, Row as Y, Col as I, Input as T, Select as D, Space as $, Button as y, Table as ge, Modal as N, Typography as se, Tabs as te, Descriptions as k, Switch as Ve } from "antd";
import { UserOutlined as re, EyeOutlined as we, EditOutlined as le, UnlockOutlined as ye, KeyOutlined as be, ToolOutlined as _e, UndoOutlined as ke, DeleteOutlined as Ue, SearchOutlined as H, ReloadOutlined as X, ExportOutlined as Ee, UserAddOutlined as ze, ArrowLeftOutlined as Pe } from "@ant-design/icons";
import { useNavigate as Z, Link as ve, useParams as ue } from "react-router-dom";
import { A as ne, b as Ce, f as ee, U as Se, c as Ae } from "./components.js";
import { a as j } from "./index.js";
import { P as R, f as q } from "./base.js";
import { useTranslation as F } from "react-i18next";
import { useRequest as b } from "ahooks";
import { u as Fe, c as K, b as Le } from "./contexts.js";
import { A as Te } from "./client.js";
const { Option: O } = D, De = ({ user: u, onClose: w, onSuccess: s }) => {
  const { t: a } = F("authorization"), [i, c] = S(null), [n, _] = S(null), { run: U, loading: E } = b(j.authorization.updateUser, {
    onSuccess: () => {
      d.success(a("user.updateUserSuccess", { defaultValue: "User updated successfully" })), s();
    },
    onError: (f) => {
      d.error(a("user.updateUserError", { defaultValue: "Failed to update user", error: f.message }));
    },
    manual: !0
  }), { data: g, loading: z } = b(async () => i === "bind" ? j.authorization.getLdapUsers({ skip_existing: !0 }).then((f) => {
    const p = [], h = [];
    for (const m of f)
      m.username === (u == null ? void 0 : u.username) || m.email === (u == null ? void 0 : u.email) || m.full_name === (u == null ? void 0 : u.full_name) ? p.push({ recommend: !0, ...m }) : h.push({ recommend: !1, ...m });
    return [...p, ...h];
  }) : Promise.resolve([]), {
    refreshDeps: [u == null ? void 0 : u.id, i]
  });
  return Q(() => {
    u && (c(null), _(null));
  }, [u]), /* @__PURE__ */ e.jsx(
    N,
    {
      open: u !== null,
      onCancel: w,
      onOk: () => {
        if (u) {
          if (i === "local")
            return U({ id: u.id }, { source: "local" });
          if (i === "bind") {
            if (!n) {
              d.error(a("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return U({ id: u.id }, { source: "ldap", ldap_dn: n });
          } else {
            d.error(a("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        d.error(a("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: a("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs($, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(y, { loading: E, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: i === "local" ? "primary" : "default", onClick: () => c("local"), children: a("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(y, { loading: E, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: i === "bind" ? "primary" : "default", onClick: () => c("bind"), children: a("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          D,
          {
            loading: z,
            style: { display: i === "bind" ? "block" : "none" },
            onSelect: (f) => _(f),
            options: g == null ? void 0 : g.map((f) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(P, { color: f.recommend ? "blue" : "default", children: f.full_name }),
              " ",
              f.username,
              " - ",
              f.email,
              " - ",
              f.ldap_dn
            ] }), value: f.ldap_dn })),
            showSearch: !0
          }
        )
      ] })
    }
  );
}, Ie = () => {
  const { registerPageAI: u } = Fe(), { addTask: w } = K(), s = Z(), { t: a } = F("authorization"), { t: i } = F("common"), [c] = x.useForm(), [n, _] = S([]), [U, E] = S(0), { enableMultiOrg: g } = K(), [z, f] = S(null), [p, h] = S({
    current: R.DEFAULT_CURRENT,
    page_size: R.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  });
  Q(() => {
    n && (u == null || u({
      pageData: () => n,
      pageDataDescription: "Returns the current user list as a JSON object."
    }));
  }, [u, n]);
  const { data: m, loading: A } = b(async () => (await j.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [g],
    onError: (t) => {
      d.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: t.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), l = W((t, r) => {
    if (A)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        r.name
      ] });
    const v = m == null ? void 0 : m.find((C) => C.id === t);
    return v ? `${v.name}:${r.name}` : r.name;
  }, [m, A]), { run: o, loading: L } = b(() => {
    const t = {
      status: p.status,
      keywords: p.keywords
    };
    return j.authorization.listUsers({
      current: p.current,
      page_size: p.page_size,
      ...t
    });
  }, {
    onSuccess: (t) => {
      _(t.data || []), E(t.total || 0);
    },
    onError: (t) => {
      d.error(a("user.loadError", { defaultValue: "Failed to load users", error: t.message }));
    },
    refreshDeps: [p]
  }), G = (t) => {
    h({
      ...p,
      current: R.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: t.keywords,
      status: t.status
    });
  }, oe = () => {
    c.resetFields(), h({
      current: R.DEFAULT_CURRENT,
      page_size: R.DEFAULT_PAGE_SIZE,
      keywords: void 0,
      status: void 0
    });
  }, ie = (t, r) => {
    h((v) => ({
      ...v,
      current: t,
      page_size: r
    }));
  }, { run: de } = b(j.authorization.restoreUser, {
    onSuccess: () => {
      d.success(a("user.restoreSuccess", { defaultValue: "User restored successfully" })), o();
    },
    onError: (t) => {
      d.error(a("user.restoreError", { defaultValue: "Failed to restore user", error: t.message }));
    },
    manual: !0
  }), { run: ce } = b(j.authorization.deleteUser, {
    onSuccess: () => {
      d.success(a("user.deleteSuccess", { defaultValue: "User deleted successfully" })), o();
    },
    onError: (t) => {
      d.error(a("user.deleteError", { defaultValue: "Failed to delete user", error: t.message }));
    },
    manual: !0
  }), me = (t, r, v) => {
    N.confirm({
      title: a("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: a("user.resetPasswordConfirm", { defaultValue: `Are you sure you want to reset the password for ${r}?`, username: r }),
      okText: i("confirm", { defaultValue: "Confirm" }),
      cancelText: i("cancel", { defaultValue: "Cancel" }),
      onOk: async () => {
        try {
          const C = await j.authorization.resetUserPassword({ id: t }, { password: "" });
          d.success(a("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), C.new_password ? N.info({
            title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
            content: /* @__PURE__ */ e.jsx(se.Text, { copyable: { text: C.new_password }, children: a("user.resetPasswordSuccessContent", { defaultValue: `New password: ${C.new_password}`, password: C.new_password }) })
          }) : N.info({
            title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
            content: a("user.resetPasswordSuccessSendByEmail", { defaultValue: "The new password has been sent to the user email: {{email}}", email: v })
          });
        } catch (C) {
          console.error("Reset password error:", C), d.error(a("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
        }
      }
    });
  }, { run: fe, loading: he } = b(
    () => j.authorization.createUserExportTask({
      keywords: p.keywords,
      status: p.status
    }),
    {
      onSuccess: (t) => {
        t.id ? d.success(
          a("user.exportTaskCreated", {
            defaultValue: "Export task created. You can view progress and download the file from the task list."
          })
        ) : d.success(a("user.exportTaskCreatedShort", { defaultValue: "Export task created." })), w(t);
      },
      onError: (t) => {
        d.error(
          a("user.exportError", {
            defaultValue: "Failed to create export task",
            error: (t == null ? void 0 : t.message) ?? String(t)
          })
        );
      },
      manual: !0
    }
  ), pe = (t) => {
    N.confirm({
      title: a("user.unlockTitle", { defaultValue: "Unlock User" }),
      content: a("user.unlockConfirm", { defaultValue: "Are you sure you want to unlock this user?", username: t.username }),
      onOk: async () => {
        try {
          await j.authorization.unlockUser({ id: t.id }), d.success(a("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), o();
        } catch (r) {
          d.error(a("user.unlockError", { defaultValue: "Failed to unlock user: {{error}}", error: r.message ?? String(r) }));
        }
      }
    });
  }, xe = [
    {
      title: a("user.username", { defaultValue: "Username" }),
      key: "user",
      render: (t, r) => /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          ne,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(re, {}),
            src: r.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(ve, { to: `/authorization/users/${r.id}`, children: r.username })
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
      render: (t, r) => {
        switch (t) {
          case "ldap":
            return r.ldap_dn ? /* @__PURE__ */ e.jsx(P, { color: "blue", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(je, { title: a("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(P, { color: "red", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) });
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
      render: (t) => {
        switch (t) {
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
          default:
            return /* @__PURE__ */ e.jsx(V, { status: "default", text: a(`user.statusEnum.${t}`, { defaultValue: t.charAt(0).toUpperCase() + t.slice(1) }) });
        }
      }
    },
    {
      title: a("user.roles", { defaultValue: "Roles" }),
      dataIndex: "roles",
      key: "roles",
      render: (t) => /* @__PURE__ */ e.jsx("span", { children: t && t.length > 0 ? t.map((r) => /* @__PURE__ */ e.jsx(P, { color: "blue", children: r.organization_id ? l(r.organization_id, r) : r.name }, r.id)) : /* @__PURE__ */ e.jsx(P, { children: a("user.noRole", { defaultValue: "No Role" }) }) })
    },
    {
      title: a("user.mfa", { defaultValue: "MFA" }),
      dataIndex: "mfa_enabled",
      key: "mfa_enabled",
      render: (t) => t ? /* @__PURE__ */ e.jsx(V, { status: "success", text: a("user.mfaEnabled", { defaultValue: "Enabled" }) }) : /* @__PURE__ */ e.jsx(V, { status: "default", text: a("user.mfaDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("user.lastLogin", { defaultValue: "Last Login" }),
      dataIndex: "last_login",
      key: "last_login",
      render: (t) => t ? q(t) : a("user.neverLogin", { defaultValue: "Never" })
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 150,
      render: (t, r) => {
        const v = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(we, {}),
          tooltip: a("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: async () => s(`/authorization/users/${r.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(le, {}),
          tooltip: a("user.edit", { defaultValue: "Edit" }),
          hidden: r.status === "locked" || r.status === "deleted",
          onClick: async () => s(`/authorization/users/${r.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ye, {}),
          tooltip: a("user.unlock", { defaultValue: "Unlock" }),
          hidden: r.status !== "locked",
          onClick: async () => pe(r)
        }, {
          key: "resetPassword",
          permission: "authorization:user:resetPassword",
          icon: /* @__PURE__ */ e.jsx(be, {}),
          disabled: r.disable_change_password,
          tooltip: r.disable_change_password ? a("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : a("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((r.source === "local" || r.source === "ldap" && r.ldap_dn) && r.status !== "deleted"),
          onClick: async () => me(r.id, r.username, r.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(_e, {}),
          tooltip: a("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(r.source === "ldap" && !r.ldap_dn && r.status !== "deleted"),
          onClick: async () => f(r)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ke, {}),
          tooltip: a("user.restore", { defaultValue: "Restore" }),
          hidden: r.status !== "deleted",
          confirm: {
            title: a("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => de({ id: r.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(Ue, {}),
          tooltip: a("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: a("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => ce({ id: r.id }),
            okText: i("confirm", { defaultValue: "Confirm" }),
            cancelText: i("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(Ce, { actions: v }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(B, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      x,
      {
        form: c,
        layout: "inline",
        onFinish: G,
        children: /* @__PURE__ */ e.jsxs(Y, { gutter: 16, style: { width: "100%" }, children: [
          /* @__PURE__ */ e.jsx(I, { span: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "keywords", children: /* @__PURE__ */ e.jsx(
            T,
            {
              prefix: /* @__PURE__ */ e.jsx(H, {}),
              placeholder: a("user.keywords", { defaultValue: "Search by username, full name, or email" }),
              allowClear: !0
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(I, { span: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "status", children: /* @__PURE__ */ e.jsxs(
            D,
            {
              placeholder: a("user.status", { defaultValue: "Status" }),
              allowClear: !0,
              style: { width: "100%" },
              children: [
                /* @__PURE__ */ e.jsx(O, { value: "active", children: a("user.statusEnum.active", { defaultValue: "Active" }) }),
                /* @__PURE__ */ e.jsx(O, { value: "disabled", children: a("user.statusEnum.disabled", { defaultValue: "Disabled" }) }),
                /* @__PURE__ */ e.jsx(O, { value: "deleted", children: a("user.statusEnum.deleted", { defaultValue: "Deleted" }) }),
                /* @__PURE__ */ e.jsx(O, { value: "locked", children: a("user.statusEnum.locked", { defaultValue: "Locked" }) }),
                /* @__PURE__ */ e.jsx(O, { value: "password_expired", children: a("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ e.jsx(I, { span: 6, children: /* @__PURE__ */ e.jsxs($, { children: [
            /* @__PURE__ */ e.jsx(
              y,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(H, {}),
                htmlType: "submit",
                children: i("search", { defaultValue: "Search" })
              }
            ),
            /* @__PURE__ */ e.jsx(
              y,
              {
                icon: /* @__PURE__ */ e.jsx(X, {}),
                onClick: oe,
                children: i("reset", { defaultValue: "Reset" })
              }
            )
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(B, { children: [
      /* @__PURE__ */ e.jsxs(Y, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx(I, { children: /* @__PURE__ */ e.jsx(y, { type: "primary", icon: /* @__PURE__ */ e.jsx(X, {}), onClick: o, children: i("refresh", { defaultValue: "Refresh" }) }) }),
        /* @__PURE__ */ e.jsx(I, { children: /* @__PURE__ */ e.jsxs($, { children: [
          /* @__PURE__ */ e.jsx(ee, { permission: "authorization:user:export", children: /* @__PURE__ */ e.jsx(
            y,
            {
              icon: /* @__PURE__ */ e.jsx(Ee, {}),
              loading: he,
              style: { marginBottom: 16 },
              onClick: () => fe(),
              children: a("user.export", { defaultValue: "Export" })
            }
          ) }),
          /* @__PURE__ */ e.jsx(ee, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
            y,
            {
              type: "primary",
              icon: /* @__PURE__ */ e.jsx(ze, {}),
              style: { marginBottom: 16 },
              onClick: () => s("/authorization/users/create"),
              children: a("user.create", { defaultValue: "Create User" })
            }
          ) })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsx(
        ge,
        {
          columns: xe,
          dataSource: n,
          rowKey: "id",
          loading: L,
          pagination: {
            current: p.current,
            pageSize: p.page_size,
            total: U,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (t) => i("totalItems", { defaultValue: `Total ${t} items`, total: t }),
            onChange: ie
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(De, { user: z, onClose: () => f(null), onSuccess: () => {
      f(null), o();
    } })
  ] });
}, Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ie
}, Symbol.toStringTag, { value: "Module" })), { Title: Re } = se, { TabPane: ae } = te, Oe = () => {
  const { id: u } = ue(), w = Z(), { t: s } = F("authorization"), { t: a } = F("common"), [i, c] = S(!1), [n, _] = S(null), { hasPermission: U } = Le(), { enableMultiOrg: E } = K(), { data: g, loading: z } = b(async () => (await j.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [E],
    onError: (h) => {
      d.error(s("organizations.loadError", { defaultValue: "Failed to load organizations", error: h.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), f = W((h, m) => {
    if (z)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        m.name
      ] });
    const A = g == null ? void 0 : g.find((l) => l.id === h);
    return A ? `${A.name}:${m.name}` : m.name;
  }, [g, z]);
  if (Q(() => {
    (async () => {
      if (u) {
        c(!0);
        try {
          const m = await j.authorization.getUser({ id: u });
          _(m);
        } catch (m) {
          m instanceof Te && m.code === "E4041" || (console.error("Failed to get user details:", m), d.error(s("user.detailLoadError", { defaultValue: "Failed to load user details" })));
        } finally {
          c(!1);
        }
      }
    })();
  }, [u, s]), i)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(M, { size: "large" }) });
  if (!n)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(Re, { level: 4, children: s("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(y, { type: "primary", onClick: () => w("/authorization/users"), children: s("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const p = () => n.mfa_enabled ? /* @__PURE__ */ e.jsx(V, { status: "success", text: s("user.mfaEnabled", { defaultValue: "Enabled" }) }) : n.mfa_enforced ? /* @__PURE__ */ e.jsx(V, { status: "warning", text: s("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(V, { status: "default", text: s("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    B,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          ne,
          {
            size: 64,
            icon: /* @__PURE__ */ e.jsx(re, {}),
            src: n.avatar,
            style: { marginRight: 16 }
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 20, fontWeight: "bold" }, children: n.username }),
          /* @__PURE__ */ e.jsx("div", { style: { color: "#888" }, children: n.email })
        ] })
      ] }),
      extra: /* @__PURE__ */ e.jsxs($, { children: [
        /* @__PURE__ */ e.jsx(
          y,
          {
            icon: /* @__PURE__ */ e.jsx(Pe, {}),
            onClick: () => w("/authorization/users"),
            children: a("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          y,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(le, {}),
            onClick: () => w(`/authorization/users/${u}/edit`),
            children: a("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(te, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(ae, { tab: s("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(k, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(k.Item, { label: s("user.username", { defaultValue: "Username" }), children: n.username }),
          /* @__PURE__ */ e.jsx(k.Item, { label: s("user.fullName", { defaultValue: "Full Name" }), children: n.full_name }),
          /* @__PURE__ */ e.jsx(k.Item, { label: s("user.email", { defaultValue: "Email" }), children: n.email }),
          /* @__PURE__ */ e.jsx(k.Item, { label: s("user.status", { defaultValue: "Status" }), children: n.status === "active" ? /* @__PURE__ */ e.jsx(V, { status: "success", text: s("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(V, { status: "error", text: s(`user.statusEnum.${n.status}`, { defaultValue: n.status.charAt(0).toUpperCase() + n.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: s("user.roles", { defaultValue: "Roles" }), span: 2, children: n.roles && n.roles.length > 0 ? n.roles.map((h) => /* @__PURE__ */ e.jsx(P, { color: "blue", children: E ? f(h.organization_id, h) : h.name }, h.id)) : /* @__PURE__ */ e.jsx(P, { children: s("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: s("user.mfa", { defaultValue: "MFA" }), children: p() }),
          /* @__PURE__ */ e.jsx(k.Item, { label: s("user.lastLogin", { defaultValue: "Last Login" }), children: n.last_login ? q(n.last_login) : s("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: s("user.createdAt", { defaultValue: "Created At" }), children: q(n.created_at) }),
          /* @__PURE__ */ e.jsx(k.Item, { label: s("user.updatedAt", { defaultValue: "Updated At" }), children: q(n.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(ae, { disabled: !U("authorization:user:view_audit_logs"), tab: s("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(Se, { userId: u || "" }) }, "logs")
      ] })
    }
  );
}, ea = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oe
}, Symbol.toStringTag, { value: "Module" })), { Option: J } = D, Ne = () => {
  const { id: u = "" } = ue(), w = Z(), { t: s } = F("authorization"), { t: a } = F("common"), [i] = x.useForm(), c = !!u, { enableMultiOrg: n } = K(), { data: _, loading: U } = b(async () => (await j.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [n],
    onError: (l) => {
      d.error(s("organizations.loadError", { defaultValue: "Failed to load organizations", error: l.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), E = W((l, o) => {
    if (U)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        o.name
      ] });
    const L = _ == null ? void 0 : _.find((G) => G.id === l);
    return L ? `${L.name}:${o.name}` : o.name;
  }, [_, U]), { data: g, loading: z } = b(async () => (await j.authorization.listRoles({})).data.map((o) => ({
    ...o,
    label: o.name,
    value: o.id
  }))), { loading: f } = b(async () => {
    if (!(!c || !i))
      try {
        const l = await j.authorization.getUser({ id: u });
        return i.setFieldsValue({
          username: l.username,
          email: l.email,
          full_name: l.full_name,
          status: l.status,
          role_ids: l.roles ? l.roles.map((o) => o.id) : [],
          mfa_enforced: l.mfa_enforced
        }), l;
      } catch {
        d.error(s("user.loadError", { defaultValue: "Failed to load user data" }));
      }
  }, { refreshDeps: [u, i] }), { run: p, loading: h } = b(async (l) => {
    try {
      if (c)
        await j.authorization.updateUser({ id: u }, {
          email: l.email,
          avatar: l.avatar,
          full_name: l.full_name,
          status: l.status,
          mfa_enforced: l.mfa_enforced,
          role_ids: l.role_ids
        }), d.success(s("user.updateSuccess", { defaultValue: "User updated successfully" })), w(`/authorization/users/${u}`);
      else {
        const o = {
          username: l.username,
          avatar: l.avatar,
          password: l.password,
          email: l.email,
          full_name: l.full_name,
          mfa_enforced: l.mfa_enforced,
          role_ids: l.role_ids
        }, L = await j.authorization.createUser(o);
        d.success(s("user.createSuccess", { defaultValue: "User created successfully" })), w(`/authorization/users/${L.id}`);
      }
    } catch (o) {
      d.error(c ? s("user.updateError", { defaultValue: "Failed to update user", error: o }) : s("user.createError", { defaultValue: "Failed to create user", error: o }));
    }
  }, { manual: !0 }), m = (l, o) => c ? Promise.resolve() : o ? o.length < 8 ? Promise.reject(new Error(s("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve() : Promise.reject(new Error(s("user.passwordRequired", { defaultValue: "Password is required" }))), A = (l, o) => c ? Promise.resolve() : o ? o !== i.getFieldValue("password") ? Promise.reject(new Error(s("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(s("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" })));
  return /* @__PURE__ */ e.jsx(
    B,
    {
      title: c ? s("user.editTitle", { defaultValue: "Edit User" }) : s("user.createTitle", { defaultValue: "Create User" }),
      loading: f || z,
      children: /* @__PURE__ */ e.jsxs(
        x,
        {
          form: i,
          layout: "horizontal",
          onFinish: p,
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
                label: s("user.avatar", { defaultValue: "Avatar" }),
                children: /* @__PURE__ */ e.jsx(Ae, {})
              }
            ),
            /* @__PURE__ */ e.jsx(
              x.Item,
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
              x.Item,
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
              x.Item,
              {
                name: "full_name",
                label: s("user.fullName", { defaultValue: "Full Name" }),
                rules: [{ required: !0, message: s("user.fullNameRequired", { defaultValue: "Full name is required" }) }],
                children: /* @__PURE__ */ e.jsx(T, { placeholder: s("user.fullNamePlaceholder", { defaultValue: "Enter full name" }) })
              }
            ),
            c && /* @__PURE__ */ e.jsx(
              x.Item,
              {
                name: "status",
                label: s("user.status", { defaultValue: "Status" }),
                rules: [{ required: !0, message: s("user.statusRequired", { defaultValue: "Status is required" }) }],
                children: /* @__PURE__ */ e.jsxs(D, { placeholder: s("user.statusPlaceholder", { defaultValue: "Select status" }), children: [
                  /* @__PURE__ */ e.jsx(J, { value: "active", children: s("user.statusActive", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(J, { value: "disabled", children: s("user.statusDisabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(J, { value: "password_expired", children: s("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) })
                ] })
              }
            ),
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                name: "mfa_enforced",
                label: s("user.mfaEnforced", { defaultValue: "MFA Enforced" }),
                children: /* @__PURE__ */ e.jsx(Ve, {})
              }
            ),
            !c && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "password",
                  label: s("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: m }],
                  children: /* @__PURE__ */ e.jsx(T.Password, { autoComplete: "new-password", placeholder: s("user.passwordPlaceholder", { defaultValue: "Enter password" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "confirm_password",
                  label: s("user.confirmPassword", { defaultValue: "Confirm Password" }),
                  rules: [{ validator: A }],
                  dependencies: ["password"],
                  children: /* @__PURE__ */ e.jsx(T.Password, { autoComplete: "new-password", placeholder: s("user.confirmPasswordPlaceholder", { defaultValue: "Confirm password" }) })
                }
              )
            ] }),
            /* @__PURE__ */ e.jsx(
              x.Item,
              {
                name: "role_ids",
                label: s("user.roles", { defaultValue: "Roles" }),
                children: /* @__PURE__ */ e.jsx(
                  D,
                  {
                    mode: "multiple",
                    placeholder: s("user.selectRoles", { defaultValue: "Select roles" }),
                    options: g == null ? void 0 : g.map((l) => ({
                      ...l,
                      label: n ? E(l.organization_id, l) : l.name
                    })),
                    optionFilterProp: "label",
                    loading: z
                  }
                )
              }
            ),
            /* @__PURE__ */ e.jsx(x.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs($, { children: [
              /* @__PURE__ */ e.jsx(
                y,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: h,
                  children: c ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                y,
                {
                  onClick: () => w(c ? `/authorization/users/${u}` : "/authorization/users"),
                  children: a("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, aa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ne
}, Symbol.toStringTag, { value: "Module" }));
export {
  Xe as U,
  ea as a,
  aa as b
};
