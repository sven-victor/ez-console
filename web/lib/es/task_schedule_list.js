import { j as s } from "./vendor.js";
import { useState as A, useRef as R, useEffect as E } from "react";
import { App as D, Tag as h, Switch as N, Progress as z, Space as y, Card as g, Table as F, Button as f } from "antd";
import { HistoryOutlined as $, PlayCircleOutlined as P, EyeOutlined as O, DownloadOutlined as H, ReloadOutlined as k } from "@ant-design/icons";
import { useTranslation as x } from "react-i18next";
import { a as o } from "./index.js";
import { g as U, b as m, h as v } from "./components.js";
import { P as w } from "./base.js";
import { useRequest as q } from "ahooks";
import { useNavigate as B } from "react-router-dom";
const G = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, ae = () => {
  const { message: d } = D.useApp(), { t: a } = x("task"), { t: i } = x("common"), V = B(), [l, c] = A(null), u = R(null), { data: n, loading: T, refresh: p } = q(
    () => o.tasks.listTaskSchedules(),
    {
      onError: (e) => {
        d.error(a("scheduleListFailed", { defaultValue: "Failed to list schedules: {{error}}", error: e }));
      }
    }
  ), _ = Array.isArray(n) ? n : (n == null ? void 0 : n.data) ?? [], j = async (e, t) => {
    try {
      await o.tasks.toggleTaskSchedule({ id: e }, { enabled: t }), d.success(a("scheduleUpdated", { defaultValue: "Schedule updated." })), p();
    } catch {
      d.error(a("scheduleUpdateFailed", { defaultValue: "Failed to update schedule." }));
    }
  };
  E(() => {
    var e, t;
    l && ((t = (e = u.current) == null ? void 0 : e.reload) == null || t.call(e));
  }, [l]);
  const S = async (e) => {
    var t, r;
    try {
      await o.tasks.triggerTaskSchedule({ id: e }), d.success(a("scheduleTriggered", { defaultValue: "Task triggered." })), c(e), e === l && ((r = (t = u.current) == null ? void 0 : t.reload) == null || r.call(t));
    } catch {
      d.error(a("scheduleTriggerFailed", { defaultValue: "Failed to trigger schedule." }));
    }
  }, C = [
    { title: a("scheduleName", { defaultValue: "Name" }), dataIndex: "name", key: "name", width: 260 },
    { title: a("scheduleSpec", { defaultValue: "Cron" }), dataIndex: "spec", key: "spec", width: 120 },
    {
      title: a("scheduleDescription", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description",
      ellipsis: !0,
      render: (e, t) => a(`description.${t.task_type}`, { defaultValue: e })
    },
    {
      title: a("scheduleTaskType", { defaultValue: "Task Type" }),
      dataIndex: "task_type",
      key: "task_type",
      width: 300,
      render: (e) => {
        const t = a(`type.${e}`, { defaultValue: e });
        return /* @__PURE__ */ s.jsx(h, { color: "blue", children: t });
      }
    },
    {
      title: a("scheduleEnabled", { defaultValue: "Enabled" }),
      dataIndex: "enabled",
      key: "enabled",
      width: 90,
      render: (e, t) => /* @__PURE__ */ s.jsx(U, { permission: "task:schedule:update", children: /* @__PURE__ */ s.jsx(N, { checked: e, onChange: (r) => j(t.id, r), size: "small" }) })
    },
    {
      title: a("scheduleNextRun", { defaultValue: "Next Run" }),
      dataIndex: "next_run",
      key: "next_run",
      width: 170,
      render: (e) => e ? new Date(e).toLocaleString() : "-"
    },
    {
      title: a("scheduleLastRun", { defaultValue: "Last Run" }),
      dataIndex: "last_run",
      key: "last_run",
      width: 170,
      render: (e) => e ? new Date(e).toLocaleString() : "-"
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 120,
      fixed: "right",
      render: (e, t) => /* @__PURE__ */ s.jsx(
        m,
        {
          actions: [
            {
              key: "history",
              icon: /* @__PURE__ */ s.jsx($, {}),
              tooltip: a("viewHistory", { defaultValue: "View history" }),
              onClick: async () => {
                c(t.id);
              }
            },
            {
              key: "trigger",
              icon: /* @__PURE__ */ s.jsx(P, {}),
              tooltip: a("triggerNow", { defaultValue: "Trigger now" }),
              permission: "task:schedule:update",
              onClick: () => S(t.id)
            }
          ]
        }
      )
    }
  ], I = (e) => l ? o.tasks.getTaskScheduleHistory({
    id: l,
    current: e.current ?? w.DEFAULT_CURRENT,
    page_size: e.page_size ?? w.DEFAULT_PAGE_SIZE
  }) : Promise.resolve({
    code: "0",
    data: [],
    total: 0,
    current: 1,
    page_size: 10,
    trace_id: ""
  }), b = async (e) => {
    const t = await o.base.downloadFile({ fileKey: e }, { params: { method: "sign" } }), r = `/api/files/${e}?signature=${t.signature}&expires=${t.expires}`;
    window.open(r, "_blank");
  }, L = [
    {
      title: a("scheduleTaskType", { defaultValue: "Task Type" }),
      dataIndex: "type",
      key: "task_type",
      width: 300,
      render: (e) => {
        const t = a(`type.${e}`, { defaultValue: e });
        return /* @__PURE__ */ s.jsx(h, { color: "blue", children: t });
      }
    },
    {
      title: a("statusLabel", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (e) => /* @__PURE__ */ s.jsx(h, { color: G[e] || "default", children: a(`status.${e}`, { defaultValue: e }) })
    },
    {
      title: a("progress", { defaultValue: "Progress" }),
      dataIndex: "progress",
      key: "progress",
      width: 100,
      render: (e, t) => t.status === "running" || t.status === "success" || t.status === "pending" ? /* @__PURE__ */ s.jsx(z, { percent: e, size: "small" }) : "-"
    },
    {
      title: a("creatorId", { defaultValue: "Creator" }),
      dataIndex: "creator",
      key: "creator",
      width: 120,
      ellipsis: !0,
      render: (e) => e || "-"
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
      title: i("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 100,
      render: (e, t) => /* @__PURE__ */ s.jsx(
        m,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ s.jsx(O, {}),
              tooltip: a("view", { defaultValue: "View" }),
              onClick: async () => {
                V(`/tasks/${t.id}`);
              }
            },
            {
              key: "download",
              icon: /* @__PURE__ */ s.jsx(H, {}),
              tooltip: a("download", { defaultValue: "Download" }),
              hidden: !t.artifact_file_key,
              onClick: () => b(t.artifact_file_key)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ s.jsxs(y, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
    /* @__PURE__ */ s.jsx(
      g,
      {
        title: a("scheduledTasks", { defaultValue: "Scheduled Tasks" }),
        extra: /* @__PURE__ */ s.jsx(f, { icon: /* @__PURE__ */ s.jsx(k, {}), onClick: () => p(), children: i("refresh", { defaultValue: "Refresh" }) }),
        children: /* @__PURE__ */ s.jsx(
          F,
          {
            rowKey: "id",
            columns: C,
            dataSource: _,
            loading: T,
            pagination: !1,
            scroll: { x: 900 }
          }
        )
      }
    ),
    l && /* @__PURE__ */ s.jsx(
      g,
      {
        title: a("executionHistory", { defaultValue: "Execution History" }),
        extra: /* @__PURE__ */ s.jsxs(y, { size: "small", children: [
          /* @__PURE__ */ s.jsx(f, { type: "text", size: "small", icon: /* @__PURE__ */ s.jsx(k, {}), onClick: () => {
            var e, t;
            return (t = (e = u.current) == null ? void 0 : e.reload) == null ? void 0 : t.call(e);
          }, children: i("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ s.jsx(f, { type: "text", size: "small", onClick: () => c(null), children: i("close", { defaultValue: "Close" }) })
        ] }),
        children: /* @__PURE__ */ s.jsx(
          v,
          {
            actionRef: u,
            request: I,
            columns: L,
            rowKey: "id",
            scroll: { x: 800 }
          }
        )
      }
    )
  ] });
};
export {
  ae as default
};
