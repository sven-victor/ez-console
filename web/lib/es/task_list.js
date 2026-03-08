import { j as a } from "./vendor.js";
import { useRef as b, useState as D } from "react";
import { Tag as k, Progress as I, Space as u, Button as n, Tooltip as p, Card as R, Input as A, message as i } from "antd";
import { EyeOutlined as F, StopOutlined as O, RedoOutlined as E, DownloadOutlined as P, DeleteOutlined as v, SearchOutlined as x, ReloadOutlined as z, CalendarOutlined as L } from "@ant-design/icons";
import { useTranslation as m } from "react-i18next";
import { a as d } from "./index.js";
import { f as c, b as y, i as $ } from "./components.js";
import { P as j } from "./base.js";
import { useNavigate as N } from "react-router-dom";
const G = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, W = () => {
  const { t: s } = m("task"), { t: o } = m("common"), r = b(null), [f, g] = D(""), h = N(), V = async (t) => {
    var e, l;
    try {
      await d.tasks.cancelTask({ id: t }), i.success(s("cancelSuccess", { defaultValue: "Task cancelled." })), (l = (e = r.current) == null ? void 0 : e.reload) == null || l.call(e);
    } catch {
      i.error(s("cancelFailed", { defaultValue: "Failed to cancel task." }));
    }
  }, w = async (t) => {
    var e, l;
    try {
      await d.tasks.retryTask({ id: t }), i.success(s("retrySuccess", { defaultValue: "Task retry requested." })), (l = (e = r.current) == null ? void 0 : e.reload) == null || l.call(e);
    } catch {
      i.error(s("retryFailed", { defaultValue: "Failed to retry task." }));
    }
  }, T = async (t) => {
    var e, l;
    try {
      await d.tasks.deleteTask({ id: t }), i.success(s("deleteSuccess", { defaultValue: "Task deleted." })), (l = (e = r.current) == null ? void 0 : e.reload) == null || l.call(e);
    } catch {
      i.error(s("deleteFailed", { defaultValue: "Failed to delete task." }));
    }
  }, C = async (t) => {
    const e = await d.base.downloadFile({ fileKey: t }, { params: { method: "sign" } }), l = `/api/files/${t}?signature=${e.signature}&expires=${e.expires}`;
    window.open(l, "_blank");
  }, _ = [
    {
      title: s("scheduleTaskType", { defaultValue: "Task Type" }),
      dataIndex: "type",
      key: "task_type",
      width: 300,
      render: (t) => {
        const e = s(`task.type.${t}`, { defaultValue: t });
        return /* @__PURE__ */ a.jsx(k, { color: "blue", children: e });
      }
    },
    {
      title: s("statusLabel", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (t) => /* @__PURE__ */ a.jsx(k, { color: G[t] || "default", children: s(`status.${t}`, { defaultValue: t }) })
    },
    {
      title: s("progress", { defaultValue: "Progress" }),
      dataIndex: "progress",
      key: "progress",
      width: 100,
      render: (t, e) => e.status === "running" || e.status === "success" || e.status === "pending" ? /* @__PURE__ */ a.jsx(I, { percent: t, size: "small" }) : "-"
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
        /* @__PURE__ */ a.jsx(n, { type: "text", icon: /* @__PURE__ */ a.jsx(F, {}), onClick: () => {
          h(`/tasks/${e.id}`);
        } }),
        (e.status === "running" || e.status === "pending") && /* @__PURE__ */ a.jsx(c, { permission: "task:cancel", children: /* @__PURE__ */ a.jsx(
          y,
          {
            actions: [
              {
                key: "cancel",
                label: s("cancel", { defaultValue: "Cancel" }),
                icon: /* @__PURE__ */ a.jsx(O, {}),
                confirm: {
                  title: s("cancelConfirm", { defaultValue: "Cancel this task?" }),
                  onConfirm: () => V(e.id)
                }
              }
            ]
          }
        ) }),
        (e.status === "failed" || e.status === "cancelled") && /* @__PURE__ */ a.jsx(c, { permission: "task:retry", children: /* @__PURE__ */ a.jsx(p, { title: s("retry", { defaultValue: "Retry" }), children: /* @__PURE__ */ a.jsx(
          n,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ a.jsx(E, {}),
            onClick: () => w(e.id)
          }
        ) }) }),
        e.artifact_file_key && /* @__PURE__ */ a.jsx(c, { permission: "task:view", children: /* @__PURE__ */ a.jsx(p, { title: s("download", { defaultValue: "Download" }), children: /* @__PURE__ */ a.jsx(
          n,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ a.jsx(P, {}),
            onClick: () => C(e.artifact_file_key)
          }
        ) }) }),
        /* @__PURE__ */ a.jsx(c, { permission: "task:delete", children: /* @__PURE__ */ a.jsx(
          y,
          {
            actions: [
              {
                key: "delete",
                label: s("delete", { defaultValue: "Delete" }),
                icon: /* @__PURE__ */ a.jsx(v, {}),
                danger: !0,
                confirm: {
                  title: s("deleteConfirm", { defaultValue: "Delete this task?" }),
                  onConfirm: () => T(e.id)
                }
              }
            ]
          }
        ) })
      ] })
    }
  ], S = (t) => d.tasks.listTasks({
    current: t.current ?? j.DEFAULT_CURRENT,
    page_size: t.page_size ?? j.DEFAULT_PAGE_SIZE,
    search: f || void 0
  });
  return /* @__PURE__ */ a.jsx(
    R,
    {
      title: s("listTitle", { defaultValue: "Task List" }),
      extra: /* @__PURE__ */ a.jsx(c, { permission: "task:schedule:list", children: /* @__PURE__ */ a.jsx(n, { type: "link", icon: /* @__PURE__ */ a.jsx(L, {}), onClick: () => h("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) }),
      children: /* @__PURE__ */ a.jsxs(u, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
        /* @__PURE__ */ a.jsxs(u, { wrap: !0, children: [
          /* @__PURE__ */ a.jsx(
            A,
            {
              placeholder: s("searchPlaceholder", { defaultValue: "Search by type or ID" }),
              prefix: /* @__PURE__ */ a.jsx(x, {}),
              value: f,
              onChange: (t) => g(t.target.value),
              onPressEnter: () => {
                var t, e;
                return (e = (t = r.current) == null ? void 0 : t.reload) == null ? void 0 : e.call(t);
              },
              style: { width: 220 },
              allowClear: !0
            }
          ),
          /* @__PURE__ */ a.jsx(n, { icon: /* @__PURE__ */ a.jsx(x, {}), onClick: () => {
            var t, e;
            (e = (t = r.current) == null ? void 0 : t.reload) == null || e.call(t);
          }, children: o("search", { defaultValue: "Search" }) }),
          /* @__PURE__ */ a.jsx(n, { icon: /* @__PURE__ */ a.jsx(z, {}), onClick: () => {
            var t, e;
            return (e = (t = r.current) == null ? void 0 : t.reload) == null ? void 0 : e.call(t);
          }, children: o("refresh", { defaultValue: "Refresh" }) })
        ] }),
        /* @__PURE__ */ a.jsx(
          $,
          {
            actionRef: r,
            request: S,
            columns: _,
            rowKey: "id",
            scroll: { x: 900 }
          }
        )
      ] })
    }
  );
};
export {
  W as default
};
