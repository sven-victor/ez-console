import { j as r } from "./vendor.js";
import { useRef as i, useState as w, useEffect as m } from "react";
import { App as U, Typography as v, Tag as b, Card as C, Space as h, Select as M, Button as y } from "antd";
import { CheckOutlined as E, ReloadOutlined as O } from "@ant-design/icons";
import { useTranslation as k } from "react-i18next";
import { a as s } from "./index.js";
import { b as S, h as L } from "./components.js";
import { c as D, a as d, b as z, P as R } from "./base.js";
import { b as F } from "./contexts.js";
const Q = () => {
  const { message: u } = U.useApp(), { t } = k("inbox"), { t: n } = k("common"), l = i(null), [o, j] = w(!1), c = i(!0), f = i(!0), { inboxRevision: A, setInboxUnreadCount: I, bumpInboxRevision: x } = F();
  m(() => {
    var e, a;
    if (c.current) {
      c.current = !1;
      return;
    }
    (a = (e = l.current) == null ? void 0 : e.reload) == null || a.call(e);
  }, [o]), m(() => {
    var e, a;
    if (f.current) {
      f.current = !1;
      return;
    }
    (a = (e = l.current) == null ? void 0 : e.reload) == null || a.call(e);
  }, [A]);
  const V = async (e) => {
    var a, p;
    try {
      await s.inbox.markInboxMessageRead({ id: e }), x(), (p = (a = l.current) == null ? void 0 : a.reload) == null || p.call(a);
    } catch {
      u.error(n("error", { defaultValue: "Operation failed" }));
    }
  }, g = async () => {
    var e, a;
    try {
      await s.inbox.markAllInboxMessagesRead(), I(0), x(), (a = (e = l.current) == null ? void 0 : e.reload) == null || a.call(e);
    } catch {
      u.error(n("error", { defaultValue: "Operation failed" }));
    }
  }, _ = [
    {
      title: t("typeLabel", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      width: 240,
      render: (e, a) => /* @__PURE__ */ r.jsx(v.Text, { strong: d(a), children: D(t, a) })
    },
    {
      title: t("title", { defaultValue: "Inbox" }),
      key: "payload",
      ellipsis: !0,
      render: (e, a) => z(t, a)
    },
    {
      title: t("unread", { defaultValue: "Unread" }),
      dataIndex: "read_at",
      key: "read_at",
      width: 120,
      render: (e, a) => d(a) ? /* @__PURE__ */ r.jsx(b, { color: "blue", children: t("unread", { defaultValue: "Unread" }) }) : /* @__PURE__ */ r.jsx(b, { children: t("read", { defaultValue: "Read" }) })
    },
    {
      title: t("createdAt", { defaultValue: "Time" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 180,
      render: (e) => e ? new Date(e).toLocaleString() : "-"
    },
    {
      title: n("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 80,
      fixed: "right",
      render: (e, a) => /* @__PURE__ */ r.jsx(
        S,
        {
          actions: [
            {
              key: "read",
              icon: /* @__PURE__ */ r.jsx(E, {}),
              tooltip: t("markRead", { defaultValue: "Mark as read" }),
              hidden: !d(a),
              onClick: () => V(a.id)
            }
          ]
        }
      )
    }
  ], T = (e) => s.inbox.listInboxMessages({
    current: e.current ?? R.DEFAULT_CURRENT,
    page_size: e.page_size ?? R.DEFAULT_PAGE_SIZE,
    unread: o || void 0
  });
  return /* @__PURE__ */ r.jsx(
    C,
    {
      title: t("title", { defaultValue: "Inbox" }),
      extra: /* @__PURE__ */ r.jsx(y, { type: "link", onClick: () => void g(), children: t("markAllRead", { defaultValue: "Mark all as read" }) }),
      children: /* @__PURE__ */ r.jsxs(h, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
        /* @__PURE__ */ r.jsxs(h, { wrap: !0, children: [
          /* @__PURE__ */ r.jsx(
            M,
            {
              value: o,
              onChange: (e) => j(e),
              options: [
                { value: !1, label: t("filterAll", { defaultValue: "All" }) },
                { value: !0, label: t("filterUnread", { defaultValue: "Unread only" }) }
              ],
              style: { width: 200 }
            }
          ),
          /* @__PURE__ */ r.jsx(y, { icon: /* @__PURE__ */ r.jsx(O, {}), onClick: () => {
            var e, a;
            return (a = (e = l.current) == null ? void 0 : e.reload) == null ? void 0 : a.call(e);
          }, children: n("refresh", { defaultValue: "Refresh" }) })
        ] }),
        /* @__PURE__ */ r.jsx(
          L,
          {
            actionRef: l,
            request: T,
            columns: _,
            rowKey: "id",
            scroll: { x: 800 }
          }
        )
      ] })
    }
  );
};
export {
  Q as default
};
