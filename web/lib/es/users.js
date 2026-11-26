import { j as e } from "./vendor.js";
import { useState as M, useRef as Y, useCallback as se, useEffect as pe, useMemo as Oe } from "react";
import { App as ne, Form as b, Spin as te, Typography as de, Tag as T, Tooltip as Re, Badge as E, Card as ae, Row as me, Col as X, Space as Z, Input as G, Select as K, Button as C, Table as Ie, Modal as De, Tabs as he, Descriptions as F, Switch as Me } from "antd";
import { UserOutlined as ge, EyeOutlined as Ne, EditOutlined as xe, UnlockOutlined as $e, SafetyOutlined as qe, MailOutlined as Je, KeyOutlined as Be, ToolOutlined as Ge, UndoOutlined as Ke, DeleteOutlined as We, ReloadOutlined as Qe, ExportOutlined as Ze, UserAddOutlined as He, ArrowLeftOutlined as Ye } from "@ant-design/icons";
import { useNavigate as ce, Link as Xe, useParams as ye } from "react-router-dom";
import { A as _e, c as es, i as fe, U as ss, q as ts, f as as } from "./components.js";
import { a as _ } from "./index.js";
import { P as D, f as ee } from "./base.js";
import { useTranslation as N } from "react-i18next";
import { useRequest as j } from "ahooks";
import { d as rs, b as re, a as ns } from "./contexts.js";
import { A as ls } from "./client.js";
const { Option: B } = K, ie = ["active", "disabled", "deleted", "locked", "password_expired", "pending_activation"], ue = (n) => n.map((d) => ({
  id: d.id,
  username: d.username,
  full_name: d.full_name,
  email: d.email,
  status: d.status
})), is = ({ user: n, onClose: d, onSuccess: z }) => {
  const { message: a } = ne.useApp(), { t: p } = N("authorization"), [t, c] = M(null), [V, A] = M(null), { run: S, loading: o } = j(_.authorization.updateUser, {
    onSuccess: () => {
      a.success(p("user.updateUserSuccess", { defaultValue: "User updated successfully" })), z();
    },
    onError: (u) => {
      a.error(p("user.updateUserError", { defaultValue: "Failed to update user", error: u.message }));
    },
    manual: !0
  }), { data: P, loading: L } = j(async () => t === "bind" ? _.authorization.getLdapUsers({ skip_existing: !0 }).then((u) => {
    const U = [], g = [];
    for (const f of u)
      f.username === (n == null ? void 0 : n.username) || f.email === (n == null ? void 0 : n.email) || f.full_name === (n == null ? void 0 : n.full_name) ? U.push({ recommend: !0, ...f }) : g.push({ recommend: !1, ...f });
    return [...U, ...g];
  }) : Promise.resolve([]), {
    refreshDeps: [n == null ? void 0 : n.id, t]
  });
  return pe(() => {
    n && (c(null), A(null));
  }, [n]), /* @__PURE__ */ e.jsx(
    De,
    {
      getContainer: ".site-layout",
      open: n !== null,
      onCancel: d,
      onOk: () => {
        if (n) {
          if (t === "local")
            return S({ id: n.id }, { source: "local" });
          if (t === "bind") {
            if (!V) {
              a.error(p("user.ldapUserDNRequired", { defaultValue: "LDAP User DN is required" }));
              return;
            }
            return S({ id: n.id }, { source: "ldap", ldap_dn: V });
          } else {
            a.error(p("user.unknownFixMethod", { defaultValue: "Unknown fix method" }));
            return;
          }
        }
        a.error(p("user.unknownUserId", { defaultValue: "Unknown user id" }));
      },
      title: p("user.fixUserTitle", { defaultValue: "Fix User" }),
      children: /* @__PURE__ */ e.jsxs(Z, { direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ e.jsx(C, { loading: o, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: t === "local" ? "primary" : "default", onClick: () => c("local"), children: p("user.fixUserConvertToLocal", { defaultValue: "Convert to Local" }) }),
        /* @__PURE__ */ e.jsx(C, { loading: o, style: { width: "100%", height: 40 }, type: "default", variant: "outlined", color: t === "bind" ? "primary" : "default", onClick: () => c("bind"), children: p("user.fixUserBindLDAPUser", { defaultValue: "Bind LDAP User" }) }),
        /* @__PURE__ */ e.jsx(
          K,
          {
            loading: L,
            style: { display: t === "bind" ? "block" : "none" },
            onSelect: (u) => A(u),
            options: P == null ? void 0 : P.map((u) => ({ label: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(T, { color: u.recommend ? "blue" : "default", children: u.full_name }),
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
}, us = () => {
  const { message: n, modal: d } = ne.useApp(), { registerPageAI: z } = rs(), { addTask: a } = re(), p = ce(), { t } = N("authorization"), { t: c } = N("common"), [V] = b.useForm(), [A, S] = M([]), [o, P] = M(0), { enableMultiOrg: L } = re(), [u, U] = M(null), [g, f] = M({
    current: D.DEFAULT_CURRENT,
    page_size: D.DEFAULT_PAGE_SIZE,
    keywords: void 0,
    status: void 0
  }), $ = Y(A);
  $.current = A;
  const q = Y(o);
  q.current = o;
  const O = Y(g);
  O.current = g;
  const R = Y([]), H = (s) => {
    const r = R.current;
    R.current = [], r.forEach((h) => h(s));
  }, l = se((s = 1e4) => new Promise((r) => {
    let h = !1;
    const I = (i) => {
      h || (h = !0, clearTimeout(x), r(i));
    }, x = setTimeout(() => {
      R.current = R.current.filter((i) => i !== I), I(!1);
    }, s);
    R.current.push(I);
  }), []), { data: m, loading: w } = j(async () => (await _.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [L],
    onError: (s) => {
      n.error(t("organizations.loadError", { defaultValue: "Failed to load organizations", error: s.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), W = se((s, r) => {
    if (w)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(te, { size: "small" }),
        ":",
        r.name
      ] });
    const h = m == null ? void 0 : m.find((I) => I.id === s);
    return h ? `${h.name}:${r.name}` : r.name;
  }, [m, w]), { run: J, loading: we } = j(() => {
    const s = {
      status: g.status,
      keywords: g.keywords
    };
    return _.authorization.listUsers({
      current: g.current,
      page_size: g.page_size,
      ...s
    });
  }, {
    onSuccess: (s) => {
      const r = s.data || [], h = s.total || 0;
      $.current = r, q.current = h, S(r), P(h), H(!0);
    },
    onError: (s) => {
      n.error(t("user.loadError", { defaultValue: "Failed to load users", error: s.message })), H(!1);
    },
    refreshDeps: [g]
  }), le = (s) => {
    f({
      ...g,
      current: D.DEFAULT_CURRENT,
      // Reset to the first page
      keywords: s.keywords,
      status: s.status
    });
  }, je = (s, r) => {
    f((h) => ({
      ...h,
      current: s,
      page_size: r
    }));
  };
  pe(() => {
    const s = () => {
      const x = O.current, i = x.page_size || D.DEFAULT_PAGE_SIZE, v = x.current || D.DEFAULT_CURRENT, y = q.current, k = Math.max(1, Math.ceil(y / i) || 1);
      return {
        query: {
          current: v,
          page_size: i,
          keywords: x.keywords ?? null,
          status: x.status ?? null
        },
        total: y,
        page_count: k,
        has_more: v * i < y,
        users: ue($.current)
      };
    }, r = (x, i) => x.current === i.current && x.page_size === i.page_size && (x.keywords || void 0) === (i.keywords || void 0) && (x.status || void 0) === (i.status || void 0), h = async (x) => {
      const i = { ...O.current, ...x };
      if (r(O.current, i))
        return JSON.stringify({ ok: !0, already_current: !0, ...s() });
      O.current = i;
      const v = l();
      f(i);
      const y = await v;
      return JSON.stringify({ ok: y, ...y ? {} : { warning: "List did not finish loading; data may be stale" }, ...s() });
    }, I = [
      {
        name: "ui_search_users",
        description: "Filter the user list by keyword (matches username, full name, or email) and/or status, then return the first page of results. The result includes total, page_count, and has_more. If has_more is false, do not call ui_set_users_page. Omit a field to clear that filter.",
        parameters: {
          type: "object",
          properties: {
            keywords: { type: "string", description: "Search keyword; empty or omitted clears the keyword filter." },
            status: {
              type: "string",
              enum: [...ie],
              description: "Status filter; omitted clears the status filter."
            }
          },
          required: []
        },
        handler: async (x) => {
          var k;
          const i = JSON.parse(x || "{}"), v = ((k = i.keywords) == null ? void 0 : k.trim()) || void 0, y = i.status && ie.includes(i.status) ? i.status : void 0;
          return i.status && !y ? JSON.stringify({ error: `Invalid status "${i.status}"`, allowed: ie }) : (V.setFieldsValue({ keywords: v, status: y }), h({ current: D.DEFAULT_CURRENT, keywords: v, status: y }));
        }
      },
      {
        name: "ui_set_users_page",
        description: "Go to another page of the current filtered list, or change the page size. Only call this when the last result has has_more=true, or when you are changing page_size. Do not call it to look for more rows when has_more is false — that reloads the same page.",
        parameters: {
          type: "object",
          properties: {
            page: { type: "integer", minimum: 1, description: "1-based page number. Must be <= page_count from the last result." },
            page_size: { type: "integer", minimum: 1, maximum: 200, description: "Rows per page; omitted keeps the current size." }
          },
          required: []
        },
        handler: async (x) => {
          const i = JSON.parse(x || "{}"), v = O.current, y = i.page_size && i.page_size > 0 ? Math.min(i.page_size, 200) : v.page_size || D.DEFAULT_PAGE_SIZE, k = Math.max(1, Math.ceil(q.current / y) || 1);
          if (i.page != null && i.page > k)
            return JSON.stringify({
              ok: !1,
              error: `Page ${i.page} is out of range. There ${k === 1 ? "is only 1 page" : `are only ${k} pages`}.`,
              requested_page: i.page,
              ...s()
            });
          const Le = Math.max(i.page ?? v.current ?? 1, 1);
          return h({ current: Le, page_size: y });
        }
      },
      {
        name: "ui_open_user",
        description: "Open the detail page of a user from the current list, by user id or username. Navigates away from the list; the detail page has its own tools, if any.",
        parameters: {
          type: "object",
          properties: {
            user_id: { type: "string", description: "User id (UUID). Preferred when known." },
            username: { type: "string", description: "Username, resolved against the currently loaded page of users." }
          },
          required: []
        },
        handler: (x) => {
          const i = JSON.parse(x || "{}"), v = $.current, y = i.user_id ? v.find((k) => k.id === i.user_id) : i.username ? v.find((k) => k.username === i.username) : void 0;
          return y ? (p(`/authorization/users/${y.id}`), JSON.stringify({ ok: !0, path: `/authorization/users/${y.id}`, user: ue([y])[0] })) : i.user_id ? (p(`/authorization/users/${i.user_id}`), JSON.stringify({ ok: !0, path: `/authorization/users/${i.user_id}`, note: "User id not found in the loaded page; opened by id." })) : JSON.stringify({
            error: "User not found in the currently loaded page. Provide user_id or search first with ui_search_users.",
            loaded_users: ue(v).map((k) => ({ id: k.id, username: k.username }))
          });
        }
      }
    ];
    return z({
      ephemeralSystemPrompts: [
        "The user is on the User Management list page. Use ui_get_page_data to read the loaded users and current filters, ui_search_users to filter, ui_set_users_page only when has_more is true or you need a different page_size, and ui_open_user to open a user. Tool results include total, page_count, and has_more; do not paginate when has_more is false. Prefer these tools over describing manual steps."
      ],
      pageData: s,
      pageDataDescription: "Returns the current query (page, page size, keywords, status), total, page_count, has_more, and the loaded users (id, username, full_name, email, status).",
      tools: I
    });
  }, [z, p, V, l]);
  const { run: Ve } = j(_.authorization.restoreUser, {
    onSuccess: () => {
      n.success(t("user.restoreSuccess", { defaultValue: "User restored successfully" })), J();
    },
    onError: (s) => {
      n.error(t("user.restoreError", { defaultValue: "Failed to restore user", error: s.message }));
    },
    manual: !0
  }), { run: be } = j(_.authorization.deleteUser, {
    onSuccess: () => {
      n.success(t("user.deleteSuccess", { defaultValue: "User deleted successfully" })), J();
    },
    onError: (s) => {
      n.error(t("user.deleteError", { defaultValue: "Failed to delete user", error: s.message }));
    },
    manual: !0
  }), { runAsync: ke } = j(
    (s) => _.authorization.resetUserPassword({ id: s.id }, { password: "" }),
    {
      manual: !0,
      onSuccess: (s, r) => {
        const h = r[0];
        n.success(t("user.resetPasswordSuccess", { defaultValue: "Password reset successfully" })), s.new_password ? d.info({
          title: t("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: /* @__PURE__ */ e.jsx(de.Text, { copyable: { text: s.new_password }, children: t("user.resetPasswordSuccessContent", {
            defaultValue: `New password: ${s.new_password}`,
            password: s.new_password
          }) })
        }) : d.info({
          title: t("user.resetPasswordSuccess", { defaultValue: "Password Reset Successfully" }),
          content: t("user.resetPasswordSuccessSendByEmail", {
            defaultValue: "The new password has been sent to the user email: {{email}}",
            email: h.email
          })
        });
      },
      onError: () => {
        n.error(t("user.resetPasswordError", { defaultValue: "Failed to reset password" }));
      }
    }
  ), ve = (s, r, h) => {
    d.confirm({
      title: t("user.resetPasswordTitle", { defaultValue: "Reset Password" }),
      content: t("user.resetPasswordConfirm", {
        defaultValue: `Are you sure you want to reset the password for ${r}?`,
        username: r
      }),
      okText: c("confirm", { defaultValue: "Confirm" }),
      cancelText: c("cancel", { defaultValue: "Cancel" }),
      onOk: () => ke({ id: s, email: h })
    });
  }, { run: Ee, loading: ze } = j(
    () => _.authorization.createUserExportTask({
      keywords: g.keywords,
      status: g.status
    }),
    {
      onSuccess: (s) => {
        s.id ? n.success(
          t("user.exportTaskCreated", {
            defaultValue: "Export task created. You can view progress and download the file from the task list."
          })
        ) : n.success(t("user.exportTaskCreatedShort", { defaultValue: "Export task created." })), a(s);
      },
      onError: (s) => {
        n.error(
          t("user.exportError", {
            defaultValue: "Failed to create export task",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      },
      manual: !0
    }
  ), { runAsync: Ue } = j(
    (s) => _.authorization.unlockUser({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        n.success(t("user.unlockSuccess", { defaultValue: "User unlocked successfully" })), J();
      },
      onError: (s) => {
        n.error(
          t("user.unlockError", {
            defaultValue: "Failed to unlock user: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), Ae = (s) => {
    d.confirm({
      title: t("user.unlockTitle", { defaultValue: "Unlock User" }),
      content: t("user.unlockConfirm", {
        defaultValue: "Are you sure you want to unlock this user?",
        username: s.username
      }),
      onOk: () => Ue(s.id)
    });
  }, { runAsync: Se } = j(
    (s) => _.authorization.adminDisableUserMfa({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        n.success(t("user.adminDisableMFASuccess", { defaultValue: "MFA disabled successfully" })), J();
      },
      onError: (s) => {
        n.error(
          t("user.adminDisableMFAError", {
            defaultValue: "Failed to disable MFA: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), Pe = (s) => {
    d.confirm({
      title: t("user.adminDisableMFATitle", { defaultValue: "Disable MFA" }),
      content: t("user.adminDisableMFAConfirm", {
        defaultValue: "Are you sure you want to disable MFA for this user? They will be logged out of all sessions.",
        username: s.username
      }),
      okType: "danger",
      onOk: () => Se(s.id)
    });
  }, { runAsync: Fe } = j(
    (s) => _.authorization.resendActivationEmail({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        n.success(t("user.resendActivationSuccess", { defaultValue: "Activation email resent successfully" }));
      },
      onError: (s) => {
        n.error(
          t("user.resendActivationError", {
            defaultValue: "Failed to resend activation email: {{error}}",
            error: s instanceof Error ? s.message : String(s)
          })
        );
      }
    }
  ), Ce = (s) => {
    d.confirm({
      title: t("user.resendActivationTitle", { defaultValue: "Resend Activation Email" }),
      content: t("user.resendActivationConfirm", {
        defaultValue: "Resend activation email to {{email}}?",
        email: s.email
      }),
      onOk: () => Fe(s.id)
    });
  }, Te = [
    {
      title: t("user.username", { defaultValue: "Username" }),
      key: "user",
      render: (s, r) => /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          _e,
          {
            size: "small",
            icon: /* @__PURE__ */ e.jsx(ge, {}),
            src: r.avatar,
            style: { marginRight: 8 }
          }
        ),
        /* @__PURE__ */ e.jsx(Xe, { to: `/authorization/users/${r.id}`, children: r.username })
      ] })
    },
    {
      title: t("user.fullName", { defaultValue: "Full Name" }),
      dataIndex: "full_name",
      key: "full_name"
    },
    {
      title: t("user.email", { defaultValue: "Email" }),
      dataIndex: "email",
      key: "email"
    },
    {
      title: t("user.source", { defaultValue: "Source" }),
      dataIndex: "source",
      key: "source",
      render: (s, r) => {
        switch (s) {
          case "ldap":
            return r.ldap_dn ? /* @__PURE__ */ e.jsx(T, { color: "blue", children: t("user.sourceLdap", { defaultValue: "LDAP" }) }) : /* @__PURE__ */ e.jsx(Re, { title: t("user.ldapUserNotBound", { defaultValue: "LDAP User is not bound to any local user, please bind it." }), children: /* @__PURE__ */ e.jsx(T, { color: "red", children: t("user.sourceLdap", { defaultValue: "LDAP" }) }) });
          case "oauth2":
            return /* @__PURE__ */ e.jsx(T, { color: "green", children: t("user.sourceOauth2", { defaultValue: "OAuth2" }) });
          default:
            return /* @__PURE__ */ e.jsx(T, { color: "default", children: t("user.sourceLocal", { defaultValue: "Local" }) });
        }
      }
    },
    {
      title: t("user.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (s) => {
        switch (s) {
          case "disabled":
            return /* @__PURE__ */ e.jsx(E, { status: "default", text: t("user.statusEnum.disabled", { defaultValue: "Disabled" }) });
          case "password_expired":
            return /* @__PURE__ */ e.jsx(E, { status: "warning", text: t("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) });
          case "active":
            return /* @__PURE__ */ e.jsx(E, { status: "success", text: t("user.statusEnum.active", { defaultValue: "Active" }) });
          case "locked":
            return /* @__PURE__ */ e.jsx(E, { status: "warning", text: t("user.statusEnum.locked", { defaultValue: "Locked" }) });
          case "deleted":
            return /* @__PURE__ */ e.jsx(E, { status: "error", text: t("user.statusEnum.deleted", { defaultValue: "Deleted" }) });
          case "pending_activation":
            return /* @__PURE__ */ e.jsx(E, { status: "processing", text: t("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) });
          default:
            return /* @__PURE__ */ e.jsx(E, { status: "default", text: t(`user.statusEnum.${s}`, { defaultValue: s.charAt(0).toUpperCase() + s.slice(1) }) });
        }
      }
    },
    {
      title: t("user.roles", { defaultValue: "Roles" }),
      dataIndex: "roles",
      key: "roles",
      render: (s) => /* @__PURE__ */ e.jsx("span", { children: s && s.length > 0 ? s.map((r) => /* @__PURE__ */ e.jsx(T, { color: "blue", children: r.organization_id ? W(r.organization_id, r) : r.name }, r.id)) : /* @__PURE__ */ e.jsx(T, { children: t("user.noRole", { defaultValue: "No Role" }) }) })
    },
    {
      title: t("user.mfa", { defaultValue: "MFA" }),
      dataIndex: "mfa_enabled",
      key: "mfa_enabled",
      render: (s) => s ? /* @__PURE__ */ e.jsx(E, { status: "success", text: t("user.mfaEnabled", { defaultValue: "Enabled" }) }) : /* @__PURE__ */ e.jsx(E, { status: "default", text: t("user.mfaDisabled", { defaultValue: "Disabled" }) })
    },
    {
      title: t("user.lastLogin", { defaultValue: "Last Login" }),
      dataIndex: "last_login",
      key: "last_login",
      render: (s) => s ? ee(s) : t("user.neverLogin", { defaultValue: "Never" })
    },
    {
      title: c("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 160,
      render: (s, r) => {
        const h = [{
          key: "view",
          permission: "authorization:user:view",
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          tooltip: t("user.viewDetail", { defaultValue: "View Detail" }),
          onClick: async () => p(`/authorization/users/${r.id}`)
        }, {
          key: "edit",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(xe, {}),
          tooltip: t("user.edit", { defaultValue: "Edit" }),
          hidden: r.status === "locked" || r.status === "deleted",
          onClick: async () => p(`/authorization/users/${r.id}/edit`)
        }, {
          key: "unlock",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx($e, {}),
          tooltip: t("user.unlock", { defaultValue: "Unlock" }),
          hidden: r.status !== "locked",
          onClick: async () => Ae(r)
        }, {
          key: "disableMFA",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(qe, {}),
          tooltip: t("user.adminDisableMFA", { defaultValue: "Disable MFA" }),
          hidden: !r.mfa_enabled || r.status === "deleted",
          danger: !0,
          onClick: async () => Pe(r)
        }, {
          key: "resendActivation",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Je, {}),
          tooltip: t("user.resendActivation", { defaultValue: "Resend Activation Email" }),
          hidden: r.status !== "pending_activation" || !r.email,
          onClick: async () => Ce(r)
        }, {
          key: "resetPassword",
          permission: "authorization:user:reset_password",
          icon: /* @__PURE__ */ e.jsx(Be, {}),
          disabled: r.disable_change_password,
          tooltip: r.disable_change_password ? t("user.resetPasswordDisabled", { defaultValue: "The current system prohibits modifying the password of this user." }) : t("user.resetPassword", { defaultValue: "Reset Password" }),
          hidden: !((r.source === "local" || r.source === "ldap" && r.ldap_dn) && r.status !== "deleted" && r.status !== "pending_activation"),
          onClick: async () => ve(r.id, r.username, r.email)
        }, {
          key: "fixUser",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ge, {}),
          tooltip: t("user.fixUser", { defaultValue: "Fix User" }),
          hidden: !(r.source === "ldap" && !r.ldap_dn && r.status !== "deleted"),
          onClick: async () => U(r)
        }, {
          key: "restore",
          permission: "authorization:user:update",
          icon: /* @__PURE__ */ e.jsx(Ke, {}),
          tooltip: t("user.restore", { defaultValue: "Restore" }),
          hidden: r.status !== "deleted",
          confirm: {
            title: t("user.restoreConfirm", { defaultValue: "Are you sure you want to restore this user?" }),
            onConfirm: async () => Ve({ id: r.id })
          }
        }, {
          key: "delete",
          permission: "authorization:user:delete",
          icon: /* @__PURE__ */ e.jsx(We, {}),
          tooltip: t("user.delete", { defaultValue: "Delete" }),
          danger: !0,
          confirm: {
            title: t("user.deleteConfirm", { defaultValue: "Are you sure you want to delete this user?" }),
            onConfirm: () => be({ id: r.id }),
            okText: c("confirm", { defaultValue: "Confirm" }),
            cancelText: c("cancel", { defaultValue: "Cancel" })
          }
        }];
        return /* @__PURE__ */ e.jsx(es, { actions: h }, "actions");
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
      b,
      {
        form: V,
        layout: "vertical",
        onFinish: le,
        name: "userSearchForm",
        children: /* @__PURE__ */ e.jsxs(me, { justify: "space-between", align: "middle", gutter: [16, 16], children: [
          /* @__PURE__ */ e.jsx(X, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
            /* @__PURE__ */ e.jsx(b.Item, { name: "keywords", noStyle: !0, children: /* @__PURE__ */ e.jsx(
              G.Search,
              {
                placeholder: t("user.keywords", { defaultValue: "Search by username, full name, or email" }),
                allowClear: !0,
                onSearch: () => {
                  le(V.getFieldsValue());
                },
                style: { width: 300 }
              }
            ) }),
            /* @__PURE__ */ e.jsx(b.Item, { name: "status", noStyle: !0, children: /* @__PURE__ */ e.jsxs(
              K,
              {
                placeholder: t("user.status", { defaultValue: "Status" }),
                allowClear: !0,
                onChange: () => {
                  le(V.getFieldsValue());
                },
                style: { width: 220 },
                children: [
                  /* @__PURE__ */ e.jsx(B, { value: "active", children: t("user.statusEnum.active", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(B, { value: "disabled", children: t("user.statusEnum.disabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(B, { value: "deleted", children: t("user.statusEnum.deleted", { defaultValue: "Deleted" }) }),
                  /* @__PURE__ */ e.jsx(B, { value: "locked", children: t("user.statusEnum.locked", { defaultValue: "Locked" }) }),
                  /* @__PURE__ */ e.jsx(B, { value: "password_expired", children: t("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) }),
                  /* @__PURE__ */ e.jsx(B, { value: "pending_activation", children: t("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) })
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ e.jsx(X, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
            /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(Qe, {}), onClick: J, children: c("refresh", { defaultValue: "Refresh" }) }),
            /* @__PURE__ */ e.jsx(fe, { permission: "authorization:user:export", children: /* @__PURE__ */ e.jsx(
              C,
              {
                icon: /* @__PURE__ */ e.jsx(Ze, {}),
                loading: ze,
                onClick: () => Ee(),
                children: t("user.export", { defaultValue: "Export" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(fe, { permission: "authorization:user:create", children: /* @__PURE__ */ e.jsx(
              C,
              {
                type: "primary",
                icon: /* @__PURE__ */ e.jsx(He, {}),
                onClick: () => p("/authorization/users/create"),
                children: t("user.create", { defaultValue: "Create User" })
              }
            ) })
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ e.jsxs(ae, { children: [
      /* @__PURE__ */ e.jsxs(me, { justify: "space-between", align: "middle", gutter: [0, 16], children: [
        /* @__PURE__ */ e.jsx(X, {}),
        /* @__PURE__ */ e.jsx(X, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Ie,
        {
          columns: Te,
          dataSource: A,
          rowKey: "id",
          loading: we,
          pagination: {
            current: g.current,
            pageSize: g.page_size,
            total: o,
            showSizeChanger: !0,
            showQuickJumper: !0,
            showTotal: (s) => c("totalItems", { defaultValue: `Total ${s} items`, total: s }),
            onChange: je
          }
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(is, { user: u, onClose: () => U(null), onSuccess: () => {
      U(null), J();
    } })
  ] });
}, ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: us
}, Symbol.toStringTag, { value: "Module" })), { Title: os } = de, { TabPane: oe } = he, ds = () => {
  const { message: n } = ne.useApp(), { id: d } = ye(), z = ce(), { t: a } = N("authorization"), { t: p } = N("common"), { hasPermission: t } = ns(), { enableMultiOrg: c } = re(), { data: V, loading: A } = j(async () => (await _.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [c],
    onError: (u) => {
      n.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: u.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), S = se((u, U) => {
    if (A)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(te, { size: "small" }),
        ":",
        U.name
      ] });
    const g = V == null ? void 0 : V.find((f) => f.id === u);
    return g ? `${g.name}:${U.name}` : U.name;
  }, [V, A]), { data: o, loading: P } = j(() => _.authorization.getUser({ id: d }), {
    ready: !!d,
    refreshDeps: [d],
    onError: (u) => {
      u instanceof ls && u.code === "E4041" || (console.error("Failed to get user details:", u), n.error(a("user.detailLoadError", { defaultValue: "Failed to load user details" })));
    }
  });
  if (P)
    return /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ e.jsx(te, { size: "large" }) });
  if (!o)
    return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", padding: "50px" }, children: [
      /* @__PURE__ */ e.jsx(os, { level: 4, children: a("user.notFound", { defaultValue: "User not found" }) }),
      /* @__PURE__ */ e.jsx(C, { type: "primary", onClick: () => z("/authorization/users"), children: a("user.backToList", { defaultValue: "Back to User List" }) })
    ] });
  const L = () => o.mfa_enabled ? /* @__PURE__ */ e.jsx(E, { status: "success", text: a("user.mfaEnabled", { defaultValue: "Enabled" }) }) : o.mfa_enforced ? /* @__PURE__ */ e.jsx(E, { status: "warning", text: a("user.mfaEnforced", { defaultValue: "Enforced" }) }) : /* @__PURE__ */ e.jsx(E, { status: "default", text: a("user.mfaDisabled", { defaultValue: "Disabled" }) });
  return /* @__PURE__ */ e.jsx(
    ae,
    {
      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx(
          _e,
          {
            size: 48,
            icon: /* @__PURE__ */ e.jsx(ge, {}),
            src: o.avatar,
            style: { marginRight: 16 }
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 20, fontWeight: "bold" }, children: o.username }),
          /* @__PURE__ */ e.jsx("div", { style: { color: "#888" }, children: o.email })
        ] })
      ] }),
      extra: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(
          C,
          {
            icon: /* @__PURE__ */ e.jsx(Ye, {}),
            onClick: () => z("/authorization/users"),
            children: p("back", { defaultValue: "Back" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          C,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(xe, {}),
            onClick: () => z(`/authorization/users/${d}/edit`),
            children: p("edit", { defaultValue: "Edit" })
          }
        )
      ] }),
      children: /* @__PURE__ */ e.jsxs(he, { defaultActiveKey: "basic", children: [
        /* @__PURE__ */ e.jsx(oe, { tab: a("user.basicInfo", { defaultValue: "Basic Information" }), children: /* @__PURE__ */ e.jsxs(F, { bordered: !0, column: 2, style: { marginTop: 16 }, children: [
          /* @__PURE__ */ e.jsx(F.Item, { label: a("user.username", { defaultValue: "Username" }), children: o.username }),
          /* @__PURE__ */ e.jsx(F.Item, { label: a("user.fullName", { defaultValue: "Full Name" }), children: o.full_name }),
          /* @__PURE__ */ e.jsx(F.Item, { label: a("user.email", { defaultValue: "Email" }), children: o.email }),
          /* @__PURE__ */ e.jsx(F.Item, { label: a("user.status", { defaultValue: "Status" }), children: o.status === "active" ? /* @__PURE__ */ e.jsx(E, { status: "success", text: a("user.statusActive", { defaultValue: "Active" }) }) : /* @__PURE__ */ e.jsx(E, { status: "error", text: a(`user.statusEnum.${o.status}`, { defaultValue: o.status.charAt(0).toUpperCase() + o.status.slice(1) }) }) }),
          /* @__PURE__ */ e.jsx(F.Item, { label: a("user.roles", { defaultValue: "Roles" }), span: 2, children: o.roles && o.roles.length > 0 ? o.roles.map((u) => /* @__PURE__ */ e.jsx(T, { color: "blue", children: c ? S(u.organization_id, u) : u.name }, u.id)) : /* @__PURE__ */ e.jsx(T, { children: a("user.noRole", { defaultValue: "No Role" }) }) }),
          /* @__PURE__ */ e.jsx(F.Item, { label: a("user.mfa", { defaultValue: "MFA" }), children: L() }),
          /* @__PURE__ */ e.jsx(F.Item, { label: a("user.lastLogin", { defaultValue: "Last Login" }), children: o.last_login ? ee(o.last_login) : a("user.neverLogin", { defaultValue: "Never" }) }),
          /* @__PURE__ */ e.jsx(F.Item, { label: a("user.createdAt", { defaultValue: "Created At" }), children: ee(o.created_at) }),
          /* @__PURE__ */ e.jsx(F.Item, { label: a("user.updatedAt", { defaultValue: "Updated At" }), children: ee(o.updated_at) })
        ] }) }, "basic"),
        /* @__PURE__ */ e.jsx(oe, { tab: a("user.auditLogs", { defaultValue: "Audit Logs" }), disabled: !t("authorization:user:view_audit_logs"), children: /* @__PURE__ */ e.jsx(ss, { userId: d || "" }) }, "logs"),
        /* @__PURE__ */ e.jsx(oe, { tab: a("rateLimit.title", { defaultValue: "Rate Limit" }), children: /* @__PURE__ */ e.jsx(ts, { kind: "user", subjectId: d || "", readOnly: !t("authorization:user:update") }) }, "rate-limit")
      ] })
    }
  );
}, vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ds
}, Symbol.toStringTag, { value: "Module" })), { Option: Q } = K, cs = () => {
  const { message: n } = ne.useApp(), { id: d = "" } = ye(), z = ce(), { t: a } = N("authorization"), { t: p } = N("common"), [t] = b.useForm(), c = !!d, [V, A] = M(""), { enableMultiOrg: S } = re(), { data: o, loading: P } = j(async () => (await _.system.listOrganizations({ current: 1, page_size: 1e3 })).data || [], {
    refreshDeps: [S],
    onError: (l) => {
      n.error(a("organizations.loadError", { defaultValue: "Failed to load organizations", error: l.message }));
    },
    cacheKey: "fetchAllOrganizations",
    cacheTime: 1e3 * 60 * 10
  }), L = se((l, m) => {
    if (P)
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(te, { size: "small" }),
        ":",
        m.name
      ] });
    const w = o == null ? void 0 : o.find((W) => W.id === l);
    return w ? `${w.name}:${m.name}` : m.name;
  }, [o, P]), { data: u, loading: U } = j(async () => (await _.authorization.listRoles({ search: V || void 0 })).data.map((m) => ({
    ...m,
    label: m.name,
    value: m.id
  })), {
    refreshDeps: [V]
  }), { loading: g, data: f } = j(
    async () => _.authorization.getUser({ id: d }),
    {
      ready: c && !!d,
      refreshDeps: [d, c],
      onSuccess: (l) => {
        t.setFieldsValue({
          username: l.username,
          email: l.email,
          avatar: l.avatar,
          full_name: l.full_name,
          status: l.status,
          role_ids: l.roles ? l.roles.map((m) => m.id) : [],
          mfa_enforced: l.mfa_enforced
        });
      },
      onError: () => {
        n.error(a("user.loadError", { defaultValue: "Failed to load user data" }));
      }
    }
  ), $ = Oe(() => {
    var m;
    return [...((m = f == null ? void 0 : f.roles) == null ? void 0 : m.filter((w) => !(u != null && u.some((W) => W.id === w.id)))) || [], ...u || []].map((w) => ({
      ...w,
      label: S ? L(w.organization_id, w) : w.name || "",
      value: w.id
    }));
  }, [u, S, L, f == null ? void 0 : f.roles]), { run: q, loading: O } = j(
    async (l) => {
      if (c)
        return await _.authorization.updateUser(
          { id: d },
          {
            email: l.email,
            avatar: l.avatar,
            full_name: l.full_name,
            status: l.status,
            mfa_enforced: l.mfa_enforced,
            role_ids: l.role_ids
          }
        ), { mode: "update" };
      const m = {
        username: l.username,
        avatar: l.avatar,
        password: l.password,
        email: l.email,
        full_name: l.full_name,
        mfa_enforced: l.mfa_enforced,
        role_ids: l.role_ids
      };
      return { mode: "create", newUser: await _.authorization.createUser(m) };
    },
    {
      manual: !0,
      onSuccess: (l) => {
        l && (l.mode === "update" ? (n.success(a("user.updateSuccess", { defaultValue: "User updated successfully" })), z(`/authorization/users/${d}`)) : (n.success(a("user.createSuccess", { defaultValue: "User created successfully" })), z(`/authorization/users/${l.newUser.id}`)));
      },
      onError: (l) => {
        n.error(
          c ? a("user.updateError", {
            defaultValue: "Failed to update user",
            error: l instanceof Error ? l.message : String(l)
          }) : a("user.createError", {
            defaultValue: "Failed to create user",
            error: l instanceof Error ? l.message : String(l)
          })
        );
      }
    }
  ), R = (l, m) => c || !m ? Promise.resolve() : m.length < 8 ? Promise.reject(new Error(a("user.passwordTooShort", { defaultValue: "Password must be at least 8 characters long" }))) : Promise.resolve(), H = (l, m) => {
    if (c) return Promise.resolve();
    const w = t.getFieldValue("password");
    return w ? m ? m !== w ? Promise.reject(new Error(a("user.passwordMismatch", { defaultValue: "Passwords do not match" }))) : Promise.resolve() : Promise.reject(new Error(a("user.confirmPasswordRequired", { defaultValue: "Please confirm your password" }))) : Promise.resolve();
  };
  return /* @__PURE__ */ e.jsx(
    ae,
    {
      title: c ? a("user.editTitle", { defaultValue: "Edit User" }) : a("user.createTitle", { defaultValue: "Create User" }),
      loading: g,
      children: /* @__PURE__ */ e.jsxs(
        b,
        {
          form: t,
          layout: "horizontal",
          onFinish: q,
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
              b.Item,
              {
                name: "avatar",
                label: a("user.avatar", { defaultValue: "Avatar" }),
                children: /* @__PURE__ */ e.jsx(as, {})
              }
            ),
            /* @__PURE__ */ e.jsx(
              b.Item,
              {
                name: "username",
                label: a("user.username", { defaultValue: "Username" }),
                rules: [
                  { required: !c, message: a("user.usernameRequired", { defaultValue: "Username is required" }) }
                ],
                children: /* @__PURE__ */ e.jsx(G, { disabled: c, placeholder: a("user.usernamePlaceholder", { defaultValue: "Enter username" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              b.Item,
              {
                name: "email",
                label: a("user.email", { defaultValue: "Email" }),
                rules: [
                  { required: !0, message: a("user.emailRequired", { defaultValue: "Email is required" }) },
                  { type: "email", message: a("user.emailInvalid", { defaultValue: "Invalid email format" }) }
                ],
                children: /* @__PURE__ */ e.jsx(G, { placeholder: a("user.emailPlaceholder", { defaultValue: "Enter email address" }) })
              }
            ),
            /* @__PURE__ */ e.jsx(
              b.Item,
              {
                name: "full_name",
                label: a("user.fullName", { defaultValue: "Full Name" }),
                rules: [{ required: !0, message: a("user.fullNameRequired", { defaultValue: "Full name is required" }) }],
                children: /* @__PURE__ */ e.jsx(G, { placeholder: a("user.fullNamePlaceholder", { defaultValue: "Enter full name" }) })
              }
            ),
            c && /* @__PURE__ */ e.jsx(
              b.Item,
              {
                name: "status",
                label: a("user.status", { defaultValue: "Status" }),
                rules: [{ required: !0, message: a("user.statusRequired", { defaultValue: "Status is required" }) }],
                children: /* @__PURE__ */ e.jsxs(K, { placeholder: a("user.statusPlaceholder", { defaultValue: "Select status" }), children: [
                  /* @__PURE__ */ e.jsx(Q, { value: "active", children: a("user.statusActive", { defaultValue: "Active" }) }),
                  /* @__PURE__ */ e.jsx(Q, { value: "disabled", children: a("user.statusDisabled", { defaultValue: "Disabled" }) }),
                  /* @__PURE__ */ e.jsx(Q, { value: "password_expired", children: a("user.statusEnum.password_expired", { defaultValue: "Password Expired" }) }),
                  (f == null ? void 0 : f.status) === "pending_activation" && /* @__PURE__ */ e.jsx(Q, { value: "pending_activation", children: a("user.statusEnum.pending_activation", { defaultValue: "Pending Activation" }) }),
                  (f == null ? void 0 : f.status) === "locked" && /* @__PURE__ */ e.jsx(Q, { value: "locked", children: a("user.statusEnum.locked", { defaultValue: "Locked" }) })
                ] })
              }
            ),
            /* @__PURE__ */ e.jsx(
              b.Item,
              {
                name: "mfa_enforced",
                label: a("user.mfaEnforced", { defaultValue: "MFA Enforced" }),
                children: /* @__PURE__ */ e.jsx(Me, {})
              }
            ),
            !c && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                b.Item,
                {
                  name: "password",
                  label: a("user.password", { defaultValue: "Password" }),
                  rules: [{ validator: R }],
                  extra: /* @__PURE__ */ e.jsx(de.Text, { type: "secondary", style: { fontSize: 12 }, children: a("user.passwordHint", { defaultValue: "Leave blank to send an activation email to the user." }) }),
                  children: /* @__PURE__ */ e.jsx(G.Password, { autoComplete: "new-password", placeholder: a("user.passwordPlaceholder", { defaultValue: "Enter password (optional)" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                b.Item,
                {
                  name: "confirm_password",
                  label: a("user.confirmPassword", { defaultValue: "Confirm Password" }),
                  rules: [{ validator: H }],
                  dependencies: ["password"],
                  children: /* @__PURE__ */ e.jsx(G.Password, { autoComplete: "new-password", placeholder: a("user.confirmPasswordPlaceholder", { defaultValue: "Confirm password" }) })
                }
              )
            ] }),
            /* @__PURE__ */ e.jsx(
              b.Item,
              {
                name: "role_ids",
                label: a("user.roles", { defaultValue: "Roles" }),
                children: /* @__PURE__ */ e.jsx(
                  K,
                  {
                    mode: "multiple",
                    onSearch: (l) => A(l),
                    placeholder: a("user.selectRoles", { defaultValue: "Select roles" }),
                    options: $,
                    optionFilterProp: "label",
                    loading: U
                  }
                )
              }
            ),
            /* @__PURE__ */ e.jsx(b.Item, { wrapperCol: { offset: 9 }, children: /* @__PURE__ */ e.jsxs(Z, { children: [
              /* @__PURE__ */ e.jsx(
                C,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: O,
                  children: c ? p("update", { defaultValue: "Update" }) : p("create", { defaultValue: "Create" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                C,
                {
                  onClick: () => z(c ? `/authorization/users/${d}` : "/authorization/users"),
                  children: p("cancel", { defaultValue: "Cancel" })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}, Es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cs
}, Symbol.toStringTag, { value: "Module" }));
export {
  ks as U,
  vs as a,
  Es as b
};
