import { j as t } from "./vendor.js";
import { useState as z, useRef as L } from "react";
import { Switch as b, Space as h, Tooltip as f, Button as i, Tag as A, Card as g, Table as E, message as u } from "antd";
import { HistoryOutlined as D, PlayCircleOutlined as N, EyeOutlined as F, DownloadOutlined as P, ReloadOutlined as $ } from "@ant-design/icons";
import { useTranslation as y } from "react-i18next";
import { a as r } from "./index.js";
import { f as m, i as O } from "./components.js";
import { P as k } from "./base.js";
import { useRequest as H } from "ahooks";
import { useNavigate as U } from "react-router-dom";
const q = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, Y = () => {
  const { t: a } = y("task"), { t: n } = y("common"), w = U(), [o, c] = z(null), p = L(null), { data: d, loading: T, refresh: x } = H(
    () => r.taskSchedules.listTaskSchedules()
  ), j = Array.isArray(d) ? d : (d == null ? void 0 : d.data) ?? [], V = async (e, s) => {
    try {
      await r.taskSchedules.toggleTaskSchedule({ id: e }, { enabled: s }), u.success(a("scheduleUpdated", { defaultValue: "Schedule updated." })), x();
    } catch {
      u.error(a("scheduleUpdateFailed", { defaultValue: "Failed to update schedule." }));
    }
  }, S = async (e) => {
    var s, l;
    try {
      await r.taskSchedules.triggerTaskSchedule({ id: e }), u.success(a("scheduleTriggered", { defaultValue: "Task triggered." })), c(e), (l = (s = p.current) == null ? void 0 : s.reload) == null || l.call(s);
    } catch {
      u.error(a("scheduleTriggerFailed", { defaultValue: "Failed to trigger schedule." }));
    }
  }, _ = [
    { title: a("scheduleName", { defaultValue: "Name" }), dataIndex: "name", key: "name", width: 160 },
    { title: a("scheduleSpec", { defaultValue: "Cron" }), dataIndex: "spec", key: "spec", width: 120 },
    { title: a("scheduleDescription", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: a("scheduleTaskType", { defaultValue: "Task Type" }), dataIndex: "task_type", key: "task_type", width: 120 },
    {
      title: a("scheduleEnabled", { defaultValue: "Enabled" }),
      dataIndex: "enabled",
      key: "enabled",
      width: 90,
      render: (e, s) => /* @__PURE__ */ t.jsx(m, { permission: "task:schedule:update", children: /* @__PURE__ */ t.jsx(b, { checked: e, onChange: (l) => V(s.id, l), size: "small" }) })
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
      title: n("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 200,
      fixed: "right",
      render: (e, s) => /* @__PURE__ */ t.jsxs(h, { size: "small", children: [
        /* @__PURE__ */ t.jsx(f, { title: a("viewHistory", { defaultValue: "View history" }), children: /* @__PURE__ */ t.jsx(
          i,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ t.jsx(D, {}),
            onClick: () => c(s.id)
          }
        ) }),
        /* @__PURE__ */ t.jsx(m, { permission: "task:schedule:update", children: /* @__PURE__ */ t.jsx(f, { title: a("triggerNow", { defaultValue: "Trigger now" }), children: /* @__PURE__ */ t.jsx(
          i,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ t.jsx(N, {}),
            onClick: () => S(s.id)
          }
        ) }) })
      ] })
    }
  ], C = (e) => o ? r.taskSchedules.getTaskScheduleHistory({
    id: o,
    current: e.current ?? k.DEFAULT_CURRENT,
    page_size: e.page_size ?? k.DEFAULT_PAGE_SIZE
  }) : Promise.resolve({
    code: "0",
    data: [],
    total: 0,
    current: 1,
    page_size: 10,
    trace_id: ""
  }), I = async (e) => {
    const s = await r.base.downloadFile({ fileKey: e }, { params: { method: "sign" } }), l = `/api/files/${e}?signature=${s.signature}&expires=${s.expires}`;
    window.open(l, "_blank");
  }, R = [
    { title: a("typeLabel", { defaultValue: "Type" }), dataIndex: "type", key: "type", width: 120 },
    {
      title: a("statusLabel", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (e) => /* @__PURE__ */ t.jsx(A, { color: q[e] || "default", children: a(`status.${e}`, { defaultValue: e }) })
    },
    {
      title: a("progress", { defaultValue: "Progress" }),
      dataIndex: "progress",
      key: "progress",
      width: 100,
      render: (e, s) => s.status === "running" || s.status === "pending" ? `${e}%` : "-"
    },
    { title: a("creatorId", { defaultValue: "Creator" }), dataIndex: "creator_id", key: "creator_id", width: 120, ellipsis: !0 },
    {
      title: a("createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 170,
      render: (e) => e ? new Date(e).toLocaleString() : "-"
    },
    {
      title: n("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 140,
      render: (e, s) => /* @__PURE__ */ t.jsxs(h, { size: "small", children: [
        /* @__PURE__ */ t.jsx(i, { type: "text", size: "small", icon: /* @__PURE__ */ t.jsx(F, {}), onClick: () => w(`/tasks/${s.id}`) }),
        s.artifact_file_key && /* @__PURE__ */ t.jsx(i, { type: "text", size: "small", icon: /* @__PURE__ */ t.jsx(P, {}), onClick: () => I(s.artifact_file_key) })
      ] })
    }
  ];
  return /* @__PURE__ */ t.jsxs(h, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
    /* @__PURE__ */ t.jsx(
      g,
      {
        title: a("scheduledTasks", { defaultValue: "Scheduled Tasks" }),
        extra: /* @__PURE__ */ t.jsx(i, { icon: /* @__PURE__ */ t.jsx($, {}), onClick: () => x(), children: n("refresh", { defaultValue: "Refresh" }) }),
        children: /* @__PURE__ */ t.jsx(
          E,
          {
            rowKey: "id",
            columns: _,
            dataSource: j,
            loading: T,
            pagination: !1,
            scroll: { x: 900 }
          }
        )
      }
    ),
    o && /* @__PURE__ */ t.jsx(
      g,
      {
        title: a("executionHistory", { defaultValue: "Execution History" }),
        extra: /* @__PURE__ */ t.jsx(i, { type: "text", size: "small", onClick: () => c(null), children: n("close", { defaultValue: "Close" }) }),
        children: /* @__PURE__ */ t.jsx(
          O,
          {
            actionRef: p,
            request: C,
            columns: R,
            rowKey: "id",
            scroll: { x: 800 }
          }
        )
      }
    )
  ] });
};
export {
  Y as default
};
