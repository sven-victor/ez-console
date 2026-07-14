import { j as s } from "./vendor.js";
import { useRef as C, useState as _ } from "react";
import { Tag as f, Progress as S, Card as D, Space as k, Input as I, Button as o, message as n } from "antd";
import { EyeOutlined as b, StopOutlined as R, RedoOutlined as A, DownloadOutlined as F, DeleteOutlined as O, SearchOutlined as h, ReloadOutlined as E, CalendarOutlined as L } from "@ant-design/icons";
import { useTranslation as p } from "react-i18next";
import { a as i } from "./index.js";
import { b as P, h as v, g as $ } from "./components.js";
import { P as y } from "./base.js";
import { useNavigate as N } from "react-router-dom";
const z = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Q = () => {
  const { t: a } = p("task"), { t: d } = p("common"), r = C(null), [c, m] = _(""), u = N(), x = async (e) => {
    var t, l;
    try {
      await i.tasks.cancelTask({ id: e }), n.success(a("cancelSuccess", { defaultValue: "Task cancelled." })), (l = (t = r.current) == null ? void 0 : t.reload) == null || l.call(t);
    } catch {
      n.error(a("cancelFailed", { defaultValue: "Failed to cancel task." }));
    }
  }, w = async (e) => {
    var t, l;
    try {
      await i.tasks.retryTask({ id: e }), n.success(a("retrySuccess", { defaultValue: "Task retry requested." })), (l = (t = r.current) == null ? void 0 : t.reload) == null || l.call(t);
    } catch {
      n.error(a("retryFailed", { defaultValue: "Failed to retry task." }));
    }
  }, g = async (e) => {
    var t, l;
    try {
      await i.tasks.deleteTask({ id: e }), n.success(a("deleteSuccess", { defaultValue: "Task deleted." })), (l = (t = r.current) == null ? void 0 : t.reload) == null || l.call(t);
    } catch {
      n.error(a("deleteFailed", { defaultValue: "Failed to delete task." }));
    }
  }, V = async (e) => {
    const t = await i.base.downloadFile({ fileKey: e }, { params: { method: "sign" } }), l = `/api/files/${e}?signature=${t.signature}&expires=${t.expires}`;
    window.open(l, "_blank");
  }, j = [
    {
      title: a("scheduleTaskType", { defaultValue: "Task Type" }),
      dataIndex: "type",
      key: "task_type",
      width: 300,
      render: (e) => {
        const t = a(`type.${e}`, { defaultValue: e });
        return /* @__PURE__ */ s.jsx(f, { color: "blue", children: t });
      }
    },
    {
      title: a("statusLabel", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (e) => /* @__PURE__ */ s.jsx(f, { color: z[e] || "default", children: a(`status.${e}`, { defaultValue: e }) })
    },
    {
      title: a("progress", { defaultValue: "Progress" }),
      dataIndex: "progress",
      key: "progress",
      width: 100,
      render: (e, t) => t.status === "running" || t.status === "success" || t.status === "pending" ? /* @__PURE__ */ s.jsx(S, { percent: e, size: "small" }) : "-"
    },
    {
      title: a("creatorId", { defaultValue: "Creator" }),
      dataIndex: "creator_id",
      key: "creator_id",
      width: 120,
      ellipsis: !0
    },
    {
      title: a("notBefore", { defaultValue: "Not Before" }),
      dataIndex: "not_before",
      key: "not_before",
      width: 170,
      render: (e) => e ? new Date(e).toLocaleString() : "-"
    },
    {
      title: a("createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 170,
      render: (e) => e ? new Date(e).toLocaleString() : "-"
    },
    {
      title: d("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 100,
      fixed: "right",
      render: (e, t) => /* @__PURE__ */ s.jsx(
        P,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ s.jsx(b, {}),
              tooltip: a("view", { defaultValue: "View" }),
              onClick: async () => {
                u(`/tasks/${t.id}`);
              }
            },
            {
              key: "cancel",
              icon: /* @__PURE__ */ s.jsx(R, {}),
              tooltip: a("cancel", { defaultValue: "Cancel" }),
              hidden: t.status !== "running" && t.status !== "pending",
              permission: "task:cancel",
              confirm: {
                title: a("cancelConfirm", { defaultValue: "Cancel this task?" }),
                onConfirm: () => x(t.id)
              }
            },
            {
              key: "retry",
              icon: /* @__PURE__ */ s.jsx(A, {}),
              tooltip: a("retry", { defaultValue: "Retry" }),
              hidden: t.status !== "failed" && t.status !== "cancelled",
              permission: "task:retry",
              onClick: () => w(t.id)
            },
            {
              key: "download",
              icon: /* @__PURE__ */ s.jsx(F, {}),
              tooltip: a("download", { defaultValue: "Download" }),
              hidden: !t.artifact_file_key,
              onClick: () => V(t.artifact_file_key)
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ s.jsx(O, {}),
              tooltip: a("delete", { defaultValue: "Delete" }),
              danger: !0,
              permission: "task:delete",
              confirm: {
                title: a("deleteConfirm", { defaultValue: "Delete this task?" }),
                onConfirm: () => g(t.id)
              }
            }
          ]
        }
      )
    }
  ], T = (e) => i.tasks.listTasks({
    current: e.current ?? y.DEFAULT_CURRENT,
    page_size: e.page_size ?? y.DEFAULT_PAGE_SIZE,
    search: c || void 0
  });
  return /* @__PURE__ */ s.jsx(
    D,
    {
      title: a("listTitle", { defaultValue: "Task List" }),
      extra: /* @__PURE__ */ s.jsx($, { permission: "task:schedule:list", children: /* @__PURE__ */ s.jsx(o, { type: "link", icon: /* @__PURE__ */ s.jsx(L, {}), onClick: () => u("/tasks/schedules"), children: a("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) }),
      children: /* @__PURE__ */ s.jsxs(k, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
        /* @__PURE__ */ s.jsxs(k, { wrap: !0, children: [
          /* @__PURE__ */ s.jsx(
            I,
            {
              placeholder: a("searchPlaceholder", { defaultValue: "Search by type or ID" }),
              prefix: /* @__PURE__ */ s.jsx(h, {}),
              value: c,
              onChange: (e) => m(e.target.value),
              onPressEnter: () => {
                var e, t;
                return (t = (e = r.current) == null ? void 0 : e.reload) == null ? void 0 : t.call(e);
              },
              style: { width: 520 },
              allowClear: !0
            }
          ),
          /* @__PURE__ */ s.jsx(o, { icon: /* @__PURE__ */ s.jsx(h, {}), onClick: () => {
            var e, t;
            (t = (e = r.current) == null ? void 0 : e.reload) == null || t.call(e);
          }, children: d("search", { defaultValue: "Search" }) }),
          /* @__PURE__ */ s.jsx(o, { icon: /* @__PURE__ */ s.jsx(E, {}), onClick: () => {
            var e, t;
            return (t = (e = r.current) == null ? void 0 : e.reload) == null ? void 0 : t.call(e);
          }, children: d("refresh", { defaultValue: "Refresh" }) })
        ] }),
        /* @__PURE__ */ s.jsx(
          v,
          {
            actionRef: r,
            request: T,
            columns: j,
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
