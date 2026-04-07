import { j as e } from "./vendor.js";
import { useState as C, useEffect as Q, useCallback as W } from "react";
import { Form as x, message as i, Spin as M, Tag as P, Tooltip as he, Badge as V, Card as B, Row as Z, Col as $, Space as N, Input as T, Select as D, Button as k, Table as pe, Modal as R, Typography as ee, Tabs as ae, Descriptions as _, Switch as xe } from "antd";
import { UserOutlined as se, EyeOutlined as ge, EditOutlined as te, UnlockOutlined as je, KeyOutlined as Ve, ToolOutlined as we, UndoOutlined as ye, DeleteOutlined as be, ReloadOutlined as _e, ExportOutlined as ke, UserAddOutlined as Ue, ArrowLeftOutlined as ze } from "@ant-design/icons";
import { useNavigate as Y, Link as Ee, useParams as re } from "react-router-dom";
import { A as le, b as Pe, f as H, U as ve, c as Se } from "./components.js";
import { a as g } from "./index.js";
import { P as G, f as q } from "./base.js";
import { useTranslation as F } from "react-i18next";
import { useRequest as y } from "ahooks";
import { u as Ce, c as K, b as Ae } from "./contexts.js";
import { A as Fe } from "./client.js";
const { Option: O } = D, Le = ({ user: u, onClose: w, onSuccess: s }) => {
  const { t: a } = F("authorization"), [d, c] = C(null), [n, b] = C(null), { run: U, loading: z } = y(g.authorization.updateUser, {
    onSuccess: () => {
      i.success(a("user.updateUserSuccess", { defaultValue: "User updated successfully" })), s();
    },
    onError: (m) => {
      i.error(a("user.updateUserError", { defaultValue: "Failed to update user", error: m.message }));
    },
    manual: !0
  }), { data: j, loading: E } = y(async () => d === "bind" ? g.authorization.getLdapUsers({ skip_existing: !0 }).then((m) => {
    const h = [], p = [];
    for (const f of m)
      f.username === (u == null ? void 0 : u.username) || f.email === (u == null ? void 0 : u.email) || f.full_name === (u == null ? void 0 : u.full_name) ? h.push({ recommend: !0, ...f }) : p.push({ recommend: !1, ...f });
    return [...h, ...p];
  }) : Promise.resolve([]), {
    refreshDeps: [u == null ? void 0 : u.id, d]
  });
  return Q(() => {
    u && (c(null), b(null));
  }, [u]), /* @__PURE__ */ e.jsx(
    R,
    {
      open: u !== null,
      onCancel: w,
      onOk: () => {
        if (u) {
          if (d === "local")
            return U({ id: u.id }, { source: "local" });
          if (d === "bind") {
            if (!n) {
              i.error(a("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return U({ id: u.id }, { source: "ldap", ldap_dn: n });
          } else {
            i.error(a("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        i.error(a("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: a("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs(N, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(k, { loading: z, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: d === "local" ? "primary" : "default", onClick: () => c("local"), children: a("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(k, { loading: z, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: d === "bind" ? "primary" : "default", onClick: () => c("bind"), children: a("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          D,
          {
            loading: E,
            style: { display: d === "bind" ? "block" : "none" },
            onSelect: (m) => b(m),
            options: j == null ? void 0 : j.map((m) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(P, { color: m.recommend ? "blue" : "default", children: m.full_name }),
              " ",
              m.username,
              " - ",
              m.email,
              " - ",
              m.ldap_dn
            ] }), value: m.ldap_dn })),
            showSearch: !0
          }
        )
      ] })
    }
  );
}, Te = () => {
  const { registerPageAI: u } = Ce(), { addTask: w } = K(), s = Y(), { t: a } = F("authorization"), { t: d } = F("common"), [c] = x.useForm(), [n, b] = C([]), [U, z] = C(0), { enableMultiOrg: j } = K(), [E, m] = C(null), [h, p] = C({
    current: G.DEFAULT_CURRENT,
    page_size: G.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  });
  Q(() => {
    n && (u == null || u({
      pageData: () => n,
      pageDataDescription: "Returns the current user list as a JSON object."
    }));
  }, [u, n]);
  const { data: f, loading: A } = y(async () => (await g.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [j],
    onError: (t) => {
      i.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: t.message }));
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
    const v = f == null ? void 0 : f.find((S) => S.id === t);
    return v ? `${v.name}:${r.name}` : r.name;
  }, [f, A]), { run: o, loading: L } = y(() => {
    const t = {
      status: h.status,
      keywords: h.keywords
    };
    return g.authorization.listUsers({
      current: h.current,
      page_size: h.page_size,
      ...t
    });
  }, {
    onSuccess: (t) => {
      b(t.data || []), z(t.total || 0);
    },
    onError: (t) => {
      i.error(a("user.loadError", { defaultValue: "Failed to load users", error: t.message }));
    },
    refreshDeps: [h]
  }), I = (t) => {
    p({
      ...h,
      current: G.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: t.keywords,
      status: t.status
    });
  }, ue = (t, r) => {
    p((v) => ({
      ...v,
      current: t,
      page_size: r
    }));
  }, { run: ne } = y(g.authorization.restoreUser, {
    onSuccess: () => {
      i.success(a("user.restoreSuccess", { defaultValue: "User restored successfully" })), o();
    },
    onError: (t) => {
      i.error(a("user.restoreError", { defaultValue: "Failed to restore user", error: t.message }));
    },
    manual: !0
  }), { run: oe } = y(g.authorization.deleteUser, {
    onSuccess: () => {
      i.success(a("user.deleteSuccess", { defaultValue: "User deleted successfully" })), o();
    },
    onError: (t) => {
      i.error(a("user.deleteError", { defaultValue: "Failed to delete user", error: t.message }));
    },
    manual: !0
  }), ie = (t, r, v) => {
    R.confirm({
      title: a("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: a("user.resetPasswordConfirm", { defaultValue: `Are you sure you want to reset the password for ${r}?`, username: r }),
      okText: d("confirm", { defaultValue: "Confirm" }),
      cancelText: d("cancel", { defaultValue: "Cancel" }),
      onOk: async () => {
        try {
          const S = await g.authorization.resetUserPassword({ id: t }, { password: "" });
          i.success(a("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), S.new_password ? R.info({
            title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
            content: /* @__PURE__ */ e.jsx(ee.Text, { copyable: { text: S.new_password }, children: a("user.resetPasswordSuccessContent", { defaultValue: `New password: ${S.new_password}`, password: S.new_password }) })
          }) : R.info({
            title: a("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
            content: a("user.resetPasswordSuccessSendByEmail", { defaultValue: "The new password has been sent to the user email: {{email}}", email: v })
          });
        } catch (S) {
          console.error("Reset password error:", S), i.error(a("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
        }
      }
    });
  }, { run: de, loading: ce } = y(
    () => g.authorization.createUserExportTask({
      keywords: h.keywords,
      status: h.status
    }),
    {
      onSuccess: (t) => {
        t.id ? i.success(
          a("user.exportTaskCreated", {
            defaultValue: "Export task created. You can view progress and download the file from the task list."
          })
        ) : i.success(a("user.exportTaskCreatedShort", { defaultValue: "Export task created." })), w(t);
      },
      onError: (t) => {
        i.error(
          a("user.exportError", {
            defaultValue: "Failed to create export task",
            error: (t == null ? void 0 : t.message) ?? String(t)
          })
        );
      },
      manual: !0
    }
  ), fe = (t) => {
    R.confirm({
      title: a("user.unlockTitle", { defaultValue: "Unlock User" }),
      content: a("user.unlockConfirm", { defaultValue: "Are you sure you want to unlock this user?", username: t.username }),
      onOk: async () => {
        try {
          await g.authorization.unlockUser({ id: t.id }), i.success(a("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), o();
        } catch (r) {
          i.error(a("user.unlockError", { defaultValue: "Failed to unlock user: {{error}}", error: r.message ?? String(r) }));
        }
      }
    });
  }, me = [
    {
      title: a("user.username", { defaultValue: "Username" }),
      key: "user",
      render: (t, r) => /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          le,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(se, {}),
            src: r.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(Ee, { to: `/authorization/users/${r.id}`, children: r.username })
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
            return r.ldap_dn ? /* @__PURE__ */ e.jsx(P, { color: "blue", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(he, { title: a("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(P, { color: "red", children: a("user.sourceLdap", { defaultValue: "LDAP" }) }) });
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
      title: d("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 150,
      render: (t, r) => {
        const v = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(ge, {}),
          tooltip: a("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: async () => s(`/authorization/users/${r.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(te, {}),
          tooltip: a("user.edit", { defaultValue: "Edit" }),
          hidden: r.status === "locked" || r.status === "deleted",
          onClick: async () => s(`/authorization/users/${r.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(je, {}),
          tooltip: a("user.unlock", { defaultValue: "Unlock" }),
          hidden: r.status !== "locked",
          onClick: async () => fe(r)
        }, {
          key: "resetPassword",
          permission: "authorization:user:resetPassword",
          icon: /* @__PURE__ */ e.jsx(Ve, {}),
          disabled: r.disable_change_password,
          tooltip: r.disable_change_password ? a("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : a("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((r.source === "local" || r.source === "ldap" && r.ldap_dn) && r.status !== "deleted"),
          onClick: async () => ie(r.id, r.username, r.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(we, {}),
          tooltip: a("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(r.source === "ldap" && !r.ldap_dn && r.status !== "deleted"),
          onClick: async () => m(r)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(ye, {}),
          tooltip: a("user.restore", { defaultValue: "Restore" }),
          hidden: r.status !== "deleted",
          confirm: {
            title: a("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => ne({ id: r.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(be, {}),
          tooltip: a("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: a("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => oe({ id: r.id }),
            okText: d("confirm", { defaultValue: "Confirm" }),
            cancelText: d("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(Pe, { actions: v }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(B, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      x,
      {
        form: c,
        layout: "vertical",
        onFinish: I,
        name: "userSearchForm",
        children: /* @__PURE__ */ e.jsxs(Z, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx($, { children: /* @__PURE__ */ e.jsxs(N, { children: [
            /* @__PURE__ */ e.jsx(x.Item, { name: "keywords", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              T.Search,
              {
                placeholder: a("user.keywords", { defaultValue: "Search by username, full name, or email" }),
                allowClear: !0,
                onSearch: () => {
                  I(c.getFieldsValue());
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
                  I(c.getFieldsValue());
                },
                style: { width: 220 },
                children: [
                  /* @__PURE__ */ e.jsx(O, { value: "active", children: a("user.statusEnum.active", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(O, { value: "disabled", children: a("user.statusEnum.disabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(O, { value: "deleted", children: a("user.statusEnum.deleted", { defaultValue: "Deleted" }) }),
                  /* @__PURE__ */ e.jsx(O, { value: "locked", children: a("user.statusEnum.locked", { defaultValue: "Locked" }) }),
                  /* @__PURE__ */ e.jsx(O, { value: "password_expired", children: a("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) })
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx($, { children: /* @__PURE__ */ e.jsxs(N, { children: [
            /* @__PURE__ */ e.jsx(k, { icon: /* @__PURE__ */ e.jsx(_e, {}), onClick: o, children: d("refresh", { defaultValue: "Refresh" }) }),
            /* @__PURE__ */ e.jsx(H, { permission: "authorization:user:export", children: /* @__PURE__ */ e.jsx(
              k,
              {
                icon: /* @__PURE__ */ e.jsx(ke, {}),
                loading: ce,
                onClick: () => de(),
                children: a("user.export", { defaultValue: "Export" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(H, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
              k,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(Ue, {}),
                onClick: () => s("/authorization/users/create"),
                children: a("user.create", { defaultValue: "Create User" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(B, { children: [
      /* @__PURE__ */ e.jsxs(Z, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx($, {}),
        /* @__PURE__ */ e.jsx($, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        pe,
        {
          columns: me,
          dataSource: n,
          rowKey: "id",
          loading: L,
          pagination: {
            current: h.current,
            pageSize: h.page_size,
            total: U,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (t) => d("totalItems", { defaultValue: `Total ${t} items`, total: t }),
            onChange: ue
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(Le, { user: E, onClose: () => m(null), onSuccess: () => {
      m(null), o();
    } })
  ] });
}, Ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Te
}, Symbol.toStringTag, { value: "Module" })), { Title: De } = ee, { TabPane: X } = ae, Ie = () => {
  const { id: u } = re(), w = Y(), { t: s } = F("authorization"), { t: a } = F("common"), [d, c] = C(!1), [n, b] = C(null), { hasPermission: U } = Ae(), { enableMultiOrg: z } = K(), { data: j, loading: E } = y(async () => (await g.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [z],
    onError: (p) => {
      i.error(s("organizations.loadError", { defaultValue: "Failed to load organizations", error: p.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), m = W((p, f) => {
    if (E)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        f.name
      ] });
    const A = j == null ? void 0 : j.find((l) => l.id === p);
    return A ? `${A.name}:${f.name}` : f.name;
  }, [j, E]);
  if (Q(() => {
    (async () => {
      if (u) {
        c(!0);
        try {
          const f = await g.authorization.getUser({ id: u });
          b(f);
        } catch (f) {
          f instanceof Fe && f.code === "E4041" || (console.error("Failed to get user details:", f), i.error(s("user.detailLoadError", { defaultValue: "Failed to load user details" })));
        } finally {
          c(!1);
        }
      }
    })();
  }, [u, s]), d)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(M, { size: "large" }) });
  if (!n)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(De, { level: 4, children: s("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(k, { type: "primary", onClick: () => w("/authorization/users"), children: s("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const h = () => n.mfa_enabled ? /* @__PURE__ */ e.jsx(V, { status: "success", text: s("user.mfaEnabled", { defaultValue: "Enabled" }) }) : n.mfa_enforced ? /* @__PURE__ */ e.jsx(V, { status: "warning", text: s("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(V, { status: "default", text: s("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    B,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          le,
          {
            size: 64,
            icon: /* @__PURE__ */ e.jsx(se, {}),
            src: n.avatar,
            style: { marginRight: 16 }
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 20, fontWeight: "bold" }, children: n.username }),
          /* @__PURE__ */ e.jsx("div", { style: { color: "#888" }, children: n.email })
        ] })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(N, { children: [
        /* @__PURE__ */ e.jsx(
          k,
          {
            icon: /* @__PURE__ */ e.jsx(ze, {}),
            onClick: () => w("/authorization/users"),
            children: a("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          k,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(te, {}),
            onClick: () => w(`/authorization/users/${u}/edit`),
            children: a("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(ae, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(X, { tab: s("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(_, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(_.Item, { label: s("user.username", { defaultValue: "Username" }), children: n.username }),
          /* @__PURE__ */ e.jsx(_.Item, { label: s("user.fullName", { defaultValue: "Full Name" }), children: n.full_name }),
          /* @__PURE__ */ e.jsx(_.Item, { label: s("user.email", { defaultValue: "Email" }), children: n.email }),
          /* @__PURE__ */ e.jsx(_.Item, { label: s("user.status", { defaultValue: "Status" }), children: n.status === "active" ? /* @__PURE__ */ e.jsx(V, { status: "success", text: s("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(V, { status: "error", text: s(`user.statusEnum.${n.status}`, { defaultValue: n.status.charAt(0).toUpperCase() + n.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(_.Item, { label: s("user.roles", { defaultValue: "Roles" }), span: 2, children: n.roles && n.roles.length > 0 ? n.roles.map((p) => /* @__PURE__ */ e.jsx(P, { color: "blue", children: z ? m(p.organization_id, p) : p.name }, p.id)) : /* @__PURE__ */ e.jsx(P, { children: s("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(_.Item, { label: s("user.mfa", { defaultValue: "MFA" }), children: h() }),
          /* @__PURE__ */ e.jsx(_.Item, { label: s("user.lastLogin", { defaultValue: "Last Login" }), children: n.last_login ? q(n.last_login) : s("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(_.Item, { label: s("user.createdAt", { defaultValue: "Created At" }), children: q(n.created_at) }),
          /* @__PURE__ */ e.jsx(_.Item, { label: s("user.updatedAt", { defaultValue: "Updated At" }), children: q(n.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(X, { disabled: !U("authorization:user:view_audit_logs"), tab: s("user.auditLogs", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(ve, { userId: u || "" }) }, "logs")
      ] })
    }
  );
}, He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ie
}, Symbol.toStringTag, { value: "Module" })), { Option: J } = D, Oe = () => {
  const { id: u = "" } = re(), w = Y(), { t: s } = F("authorization"), { t: a } = F("common"), [d] = x.useForm(), c = !!u, { enableMultiOrg: n } = K(), { data: b, loading: U } = y(async () => (await g.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [n],
    onError: (l) => {
      i.error(s("organizations.loadError", { defaultValue: "Failed to load organizations", error: l.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), z = W((l, o) => {
    if (U)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(M, { size: "small" }),
        ":",
        o.name
      ] });
    const L = b == null ? void 0 : b.find((I) => I.id === l);
    return L ? `${L.name}:${o.name}` : o.name;
  }, [b, U]), { data: j, loading: E } = y(async () => (await g.authorization.listRoles({})).data.map((o) => ({
    ...o,
    label: o.name,
    value: o.id
  }))), { loading: m } = y(async () => {
    if (!(!c || !d))
      try {
        const l = await g.authorization.getUser({ id: u });
        return d.setFieldsValue({
          username: l.username,
          email: l.email,
          full_name: l.full_name,
          status: l.status,
          role_ids: l.roles ? l.roles.map((o) => o.id) : [],
          mfa_enforced: l.mfa_enforced
        }), l;
      } catch {
        i.error(s("user.loadError", { defaultValue: "Failed to load user data" }));
      }
  }, { refreshDeps: [u, d] }), { run: h, loading: p } = y(async (l) => {
    try {
      if (c)
        await g.authorization.updateUser({ id: u }, {
          email: l.email,
          avatar: l.avatar,
          full_name: l.full_name,
          status: l.status,
          mfa_enforced: l.mfa_enforced,
          role_ids: l.role_ids
        }), i.success(s("user.updateSuccess", { defaultValue: "User updated successfully" })), w(`/authorization/users/${u}`);
      else {
        const o = {
          username: l.username,
          avatar: l.avatar,
          password: l.password,
          email: l.email,
          full_name: l.full_name,
          mfa_enforced: l.mfa_enforced,
          role_ids: l.role_ids
        }, L = await g.authorization.createUser(o);
        i.success(s("user.createSuccess", { defaultValue: "User created successfully" })), w(`/authorization/users/${L.id}`);
      }
    } catch (o) {
      i.error(c ? s("user.updateError", { defaultValue: "Failed to update user", error: o }) : s("user.createError", { defaultValue: "Failed to create user", error: o }));
    }
  }, { manual: !0 }), f = (l, o) => c ? Promise.resolve() : o ? o.length < 8 ? Promise.reject(new Error(s("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve() : Promise.reject(new Error(s("user.passwordRequired", { defaultValue: "Password is required" }))), A = (l, o) => c ? Promise.resolve() : o ? o !== d.getFieldValue("password") ? Promise.reject(new Error(s("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(s("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" })));
  return /* @__PURE__ */ e.jsx(
    B,
    {
      title: c ? s("user.editTitle", { defaultValue: "Edit User" }) : s("user.createTitle", { defaultValue: "Create User" }),
      loading: m || E,
      children: /* @__PURE__ */ e.jsxs(
        x,
        {
          form: d,
          layout: "horizontal",
          onFinish: h,
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
                children: /* @__PURE__ */ e.jsx(Se, {})
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
                children: /* @__PURE__ */ e.jsx(xe, {})
              }
            ),
            !c && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                x.Item,
                {
                  name: "password",
                  label: s("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: f }],
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
                    options: j == null ? void 0 : j.map((l) => ({
                      ...l,
                      label: n ? z(l.organization_id, l) : l.name
                    })),
                    optionFilterProp: "label",
                    loading: E
                  }
                )
              }
            ),
            /* @__PURE__ */ e.jsx(x.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs(N, { children: [
              /* @__PURE__ */ e.jsx(
                k,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: p,
                  children: c ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                k,
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
}, Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oe
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ze as U,
  He as a,
  Xe as b
};
