import { j as a } from "./vendor.js";
import { useRef as S, useState as D } from "react";
import { Tag as I, Space as u, Button as i, Tooltip as p, Card as R, Input as b, message as n } from "antd";
import { EyeOutlined as A, StopOutlined as F, RedoOutlined as O, DownloadOutlined as E, DeleteOutlined as v, SearchOutlined as x, ReloadOutlined as L, CalendarOutlined as P } from "@ant-design/icons";
import { useTranslation as k } from "react-i18next";
import { a as d } from "./index.js";
import { f as c, b as m, i as z } from "./components.js";
import { P as y } from "./base.js";
import { useNavigate as $ } from "react-router-dom";
const N = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Q = () => {
  const { t: s } = k("task"), { t: o } = k("common"), r = S(null), [f, j] = D(""), h = $(), g = async (t) => {
    var e, l;
    try {
      await d.tasks.cancelTask({ id: t }), n.success(s("cancelSuccess", { defaultValue: "Task cancelled." })), (l = (e = r.current) == null ? void 0 : e.reload) == null || l.call(e);
    } catch {
      n.error(s("cancelFailed", { defaultValue: "Failed to cancel task." }));
    }
  }, w = async (t) => {
    var e, l;
    try {
      await d.tasks.retryTask({ id: t }), n.success(s("retrySuccess", { defaultValue: "Task retry requested." })), (l = (e = r.current) == null ? void 0 : e.reload) == null || l.call(e);
    } catch {
      n.error(s("retryFailed", { defaultValue: "Failed to retry task." }));
    }
  }, V = async (t) => {
    var e, l;
    try {
      await d.tasks.deleteTask({ id: t }), n.success(s("deleteSuccess", { defaultValue: "Task deleted." })), (l = (e = r.current) == null ? void 0 : e.reload) == null || l.call(e);
    } catch {
      n.error(s("deleteFailed", { defaultValue: "Failed to delete task." }));
    }
  }, C = async (t) => {
    const e = await d.base.downloadFile({ fileKey: t }, { params: { method: "sign" } }), l = `/api/files/${t}?signature=${e.signature}&expires=${e.expires}`;
    window.open(l, "_blank");
  }, T = [
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
      render: (t) => /* @__PURE__ */ a.jsx(I, { color: N[t] || "default", children: s(`status.${t}`, { defaultValue: t }) })
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
        /* @__PURE__ */ a.jsx(i, { type: "text", icon: /* @__PURE__ */ a.jsx(A, {}), onClick: () => {
          h(`/tasks/${e.id}`);
        } }),
        (e.status === "running" || e.status === "pending") && /* @__PURE__ */ a.jsx(c, { permission: "task:cancel", children: /* @__PURE__ */ a.jsx(
          m,
          {
            actions: [
              {
                key: "cancel",
                label: s("cancel", { defaultValue: "Cancel" }),
                icon: /* @__PURE__ */ a.jsx(F, {}),
                confirm: {
                  title: s("cancelConfirm", { defaultValue: "Cancel this task?" }),
                  onConfirm: () => g(e.id)
                }
              }
            ]
          }
        ) }),
        (e.status === "failed" || e.status === "cancelled") && /* @__PURE__ */ a.jsx(c, { permission: "task:retry", children: /* @__PURE__ */ a.jsx(p, { title: s("retry", { defaultValue: "Retry" }), children: /* @__PURE__ */ a.jsx(
          i,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ a.jsx(O, {}),
            onClick: () => w(e.id)
          }
        ) }) }),
        e.artifact_file_key && /* @__PURE__ */ a.jsx(c, { permission: "task:view", children: /* @__PURE__ */ a.jsx(p, { title: s("download", { defaultValue: "Download" }), children: /* @__PURE__ */ a.jsx(
          i,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ a.jsx(E, {}),
            onClick: () => C(e.artifact_file_key)
          }
        ) }) }),
        /* @__PURE__ */ a.jsx(c, { permission: "task:delete", children: /* @__PURE__ */ a.jsx(
          m,
          {
            actions: [
              {
                key: "delete",
                label: s("delete", { defaultValue: "Delete" }),
                icon: /* @__PURE__ */ a.jsx(v, {}),
                danger: !0,
                confirm: {
                  title: s("deleteConfirm", { defaultValue: "Delete this task?" }),
                  onConfirm: () => V(e.id)
                }
              }
            ]
          }
        ) })
      ] })
    }
  ], _ = (t) => d.tasks.listTasks({
    current: t.current ?? y.DEFAULT_CURRENT,
    page_size: t.page_size ?? y.DEFAULT_PAGE_SIZE,
    search: f || void 0
  });
  return /* @__PURE__ */ a.jsx(
    R,
    {
      title: s("listTitle", { defaultValue: "Task List" }),
      extra: /* @__PURE__ */ a.jsx(c, { permission: "task:schedule:list", children: /* @__PURE__ */ a.jsx(i, { type: "link", icon: /* @__PURE__ */ a.jsx(P, {}), onClick: () => h("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) }),
      children: /* @__PURE__ */ a.jsxs(u, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
        /* @__PURE__ */ a.jsxs(u, { wrap: !0, children: [
          /* @__PURE__ */ a.jsx(
            b,
            {
              placeholder: s("searchPlaceholder", { defaultValue: "Search by type or ID" }),
              prefix: /* @__PURE__ */ a.jsx(x, {}),
              value: f,
              onChange: (t) => j(t.target.value),
              onPressEnter: () => {
                var t, e;
                return (e = (t = r.current) == null ? void 0 : t.reload) == null ? void 0 : e.call(t);
              },
              style: { width: 220 },
              allowClear: !0
            }
          ),
          /* @__PURE__ */ a.jsx(i, { icon: /* @__PURE__ */ a.jsx(x, {}), onClick: () => {
            var t, e;
            console.log(r.current), (e = (t = r.current) == null ? void 0 : t.reload) == null || e.call(t);
          }, children: o("search", { defaultValue: "Search" }) }),
          /* @__PURE__ */ a.jsx(i, { icon: /* @__PURE__ */ a.jsx(L, {}), onClick: () => {
            var t, e;
            return (e = (t = r.current) == null ? void 0 : t.reload) == null ? void 0 : e.call(t);
          }, children: o("refresh", { defaultValue: "Refresh" }) })
        ] }),
        /* @__PURE__ */ a.jsx(
          z,
          {
            actionRef: r,
            request: _,
            columns: T,
            rowKey: "id",
            scroll: { x: 900 }
          }
        )
      ] })
    }
  );
};
export {
  Q as default
};
