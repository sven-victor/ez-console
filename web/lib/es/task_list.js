import { j as a } from "./vendor.js";
import { useRef as _, useState as S } from "react";
import { Tag as D, Space as u, Tooltip as h, Button as d, Card as I, Input as b, message as n } from "antd";
import { StopOutlined as R, RedoOutlined as A, DownloadOutlined as F, DeleteOutlined as E, SearchOutlined as p, ReloadOutlined as L } from "@ant-design/icons";
import { useTranslation as x } from "react-i18next";
import { a as i } from "./index.js";
import { f as c, b as m, i as O } from "./components.js";
import { P as k } from "./base.js";
const P = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Z = () => {
  const { t: s } = x("task"), { t: o } = x("common"), r = _(null), [f, y] = S(""), j = async (t) => {
    var e, l;
    try {
      await i.tasks.cancelTask({ id: t }), n.success(s("cancelSuccess", { defaultValue: "Task cancelled." })), (l = (e = r.current) == null ? void 0 : e.reload) == null || l.call(e);
    } catch {
      n.error(s("cancelFailed", { defaultValue: "Failed to cancel task." }));
    }
  }, w = async (t) => {
    var e, l;
    try {
      await i.tasks.retryTask({ id: t }), n.success(s("retrySuccess", { defaultValue: "Task retry requested." })), (l = (e = r.current) == null ? void 0 : e.reload) == null || l.call(e);
    } catch {
      n.error(s("retryFailed", { defaultValue: "Failed to retry task." }));
    }
  }, g = async (t) => {
    var e, l;
    try {
      await i.tasks.deleteTask({ id: t }), n.success(s("deleteSuccess", { defaultValue: "Task deleted." })), (l = (e = r.current) == null ? void 0 : e.reload) == null || l.call(e);
    } catch {
      n.error(s("deleteFailed", { defaultValue: "Failed to delete task." }));
    }
  }, V = async (t) => {
    const e = await i.base.downloadFile({ fileKey: t }, { params: { method: "sign" } }), l = `/api/files/${t}?signature=${e.signature}&expires=${e.expires}`;
    window.open(l, "_blank");
  }, C = [
    {
      title: s("typeLabel", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      width: 120
    },
    {
      title: s("statusLabel", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (t) => /* @__PURE__ */ a.jsx(D, { color: P[t] || "default", children: s(`status.${t}`, { defaultValue: t }) })
    },
    {
      title: s("progress", { defaultValue: "Progress" }),
      dataIndex: "progress",
      key: "progress",
      width: 100,
      render: (t, e) => e.status === "running" || e.status === "pending" ? `${t}%` : "-"
    },
    {
      title: s("creatorId", { defaultValue: "Creator" }),
      dataIndex: "creator_id",
      key: "creator_id",
      width: 120,
      ellipsis: !0
    },
    {
      title: s("createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 170,
      render: (t) => t ? new Date(t).toLocaleString() : "-"
    },
    {
      title: o("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 220,
      fixed: "right",
      render: (t, e) => /* @__PURE__ */ a.jsxs(u, { size: "small", children: [
        (e.status === "running" || e.status === "pending") && /* @__PURE__ */ a.jsx(c, { permission: "task:cancel", children: /* @__PURE__ */ a.jsx(
          m,
          {
            actions: [
              {
                key: "cancel",
                label: s("cancel", { defaultValue: "Cancel" }),
                icon: /* @__PURE__ */ a.jsx(R, {}),
                confirm: {
                  title: s("cancelConfirm", { defaultValue: "Cancel this task?" }),
                  onConfirm: () => j(e.id)
                }
              }
            ]
          }
        ) }),
        (e.status === "failed" || e.status === "cancelled") && /* @__PURE__ */ a.jsx(c, { permission: "task:retry", children: /* @__PURE__ */ a.jsx(h, { title: s("retry", { defaultValue: "Retry" }), children: /* @__PURE__ */ a.jsx(
          d,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ a.jsx(A, {}),
            onClick: () => w(e.id)
          }
        ) }) }),
        e.artifact_file_key && /* @__PURE__ */ a.jsx(c, { permission: "task:view", children: /* @__PURE__ */ a.jsx(h, { title: s("download", { defaultValue: "Download" }), children: /* @__PURE__ */ a.jsx(
          d,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ a.jsx(F, {}),
            onClick: () => V(e.artifact_file_key)
          }
        ) }) }),
        /* @__PURE__ */ a.jsx(c, { permission: "task:delete", children: /* @__PURE__ */ a.jsx(
          m,
          {
            actions: [
              {
                key: "delete",
                label: s("delete", { defaultValue: "Delete" }),
                icon: /* @__PURE__ */ a.jsx(E, {}),
                danger: !0,
                confirm: {
                  title: s("deleteConfirm", { defaultValue: "Delete this task?" }),
                  onConfirm: () => g(e.id)
                }
              }
            ]
          }
        ) })
      ] })
    }
  ], T = (t) => i.tasks.listTasks({
    current: t.current ?? k.DEFAULT_CURRENT,
    page_size: t.page_size ?? k.DEFAULT_PAGE_SIZE,
    search: f || void 0
  });
  return /* @__PURE__ */ a.jsx(I, { title: s("listTitle", { defaultValue: "Task List" }), children: /* @__PURE__ */ a.jsxs(u, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
    /* @__PURE__ */ a.jsxs(u, { wrap: !0, children: [
      /* @__PURE__ */ a.jsx(
        b,
        {
          placeholder: s("searchPlaceholder", { defaultValue: "Search by type or ID" }),
          prefix: /* @__PURE__ */ a.jsx(p, {}),
          value: f,
          onChange: (t) => y(t.target.value),
          onPressEnter: () => {
            var t, e;
            return (e = (t = r.current) == null ? void 0 : t.reload) == null ? void 0 : e.call(t);
          },
          style: { width: 220 },
          allowClear: !0
        }
      ),
      /* @__PURE__ */ a.jsx(d, { icon: /* @__PURE__ */ a.jsx(p, {}), onClick: () => {
        var t, e;
        return (e = (t = r.current) == null ? void 0 : t.reload) == null ? void 0 : e.call(t);
      }, children: o("search", { defaultValue: "Search" }) }),
      /* @__PURE__ */ a.jsx(d, { icon: /* @__PURE__ */ a.jsx(L, {}), onClick: () => {
        var t, e;
        return (e = (t = r.current) == null ? void 0 : t.reload) == null ? void 0 : e.call(t);
      }, children: o("refresh", { defaultValue: "Refresh" }) })
    ] }),
    /* @__PURE__ */ a.jsx(
      O,
      {
        ref: r,
        request: T,
        columns: C,
        rowKey: "id",
        scroll: { x: 900 }
      }
    )
  ] }) });
};
export {
  Z as default
};
