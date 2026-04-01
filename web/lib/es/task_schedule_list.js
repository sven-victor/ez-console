import { j as t } from "./vendor.js";
import { useState as z, useRef as R, useEffect as E } from "react";
import { message as r, Tag as h, Switch as A, Space as f, Tooltip as y, Button as l, Progress as D, Card as g, Table as F } from "antd";
import { HistoryOutlined as N, PlayCircleOutlined as P, EyeOutlined as $, DownloadOutlined as O, ReloadOutlined as H } from "@ant-design/icons";
import { useTranslation as m } from "react-i18next";
import { a as n } from "./index.js";
import { f as k, i as U } from "./components.js";
import { P as w } from "./base.js";
import { useRequest as q } from "ahooks";
import { useNavigate as v } from "react-router-dom";
const G = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, te = () => {
  const { t: s } = m("task"), { t: u } = m("common"), T = v(), [i, o] = z(null), p = R(null), { data: d, loading: j, refresh: x } = q(
    () => n.tasks.listTaskSchedules(),
    {
      onError: (e) => {
        r.error(s("scheduleListFailed", { defaultValue: "Failed to list schedules: {{error}}", error: e }));
      }
    }
  ), V = Array.isArray(d) ? d : (d == null ? void 0 : d.data) ?? [], _ = async (e, a) => {
    try {
      await n.tasks.toggleTaskSchedule({ id: e }, { enabled: a }), r.success(s("scheduleUpdated", { defaultValue: "Schedule updated." })), x();
    } catch {
      r.error(s("scheduleUpdateFailed", { defaultValue: "Failed to update schedule." }));
    }
  };
  E(() => {
    var e, a;
    i && ((a = (e = p.current) == null ? void 0 : e.reload) == null || a.call(e));
  }, [i]);
  const S = async (e) => {
    try {
      await n.tasks.triggerTaskSchedule({ id: e }), r.success(s("scheduleTriggered", { defaultValue: "Task triggered." })), o(e);
    } catch {
      r.error(s("scheduleTriggerFailed", { defaultValue: "Failed to trigger schedule." }));
    }
  }, C = [
    { title: s("scheduleName", { defaultValue: "Name" }), dataIndex: "name", key: "name", width: 160 },
    { title: s("scheduleSpec", { defaultValue: "Cron" }), dataIndex: "spec", key: "spec", width: 120 },
    { title: s("scheduleDescription", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    {
      title: s("scheduleTaskType", { defaultValue: "Task Type" }),
      dataIndex: "task_type",
      key: "task_type",
      width: 300,
      render: (e) => {
        const a = s(`type.${e}`, { defaultValue: e });
        return /* @__PURE__ */ t.jsx(h, { color: "blue", children: a });
      }
    },
    {
      title: s("scheduleEnabled", { defaultValue: "Enabled" }),
      dataIndex: "enabled",
      key: "enabled",
      width: 90,
      render: (e, a) => /* @__PURE__ */ t.jsx(k, { permission: "task:schedule:update", children: /* @__PURE__ */ t.jsx(A, { checked: e, onChange: (c) => _(a.id, c), size: "small" }) })
    },
    {
      title: s("scheduleNextRun", { defaultValue: "Next Run" }),
      dataIndex: "next_run",
      key: "next_run",
      width: 170,
      render: (e) => e ? new Date(e).toLocaleString() : "-"
    },
    {
      title: s("scheduleLastRun", { defaultValue: "Last Run" }),
      dataIndex: "last_run",
      key: "last_run",
      width: 170,
      render: (e) => e ? new Date(e).toLocaleString() : "-"
    },
    {
      title: u("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 200,
      fixed: "right",
      render: (e, a) => /* @__PURE__ */ t.jsxs(f, { size: "small", children: [
        /* @__PURE__ */ t.jsx(y, { title: s("viewHistory", { defaultValue: "View history" }), children: /* @__PURE__ */ t.jsx(
          l,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ t.jsx(N, {}),
            onClick: () => {
              o(a.id);
            }
          }
        ) }),
        /* @__PURE__ */ t.jsx(k, { permission: "task:schedule:update", children: /* @__PURE__ */ t.jsx(y, { title: s("triggerNow", { defaultValue: "Trigger now" }), children: /* @__PURE__ */ t.jsx(
          l,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ t.jsx(P, {}),
            onClick: () => S(a.id)
          }
        ) }) })
      ] })
    }
  ], I = (e) => i ? n.tasks.getTaskScheduleHistory({
    id: i,
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
    const a = await n.base.downloadFile({ fileKey: e }, { params: { method: "sign" } }), c = `/api/files/${e}?signature=${a.signature}&expires=${a.expires}`;
    window.open(c, "_blank");
  }, L = [
    {
      title: s("scheduleTaskType", { defaultValue: "Task Type" }),
      dataIndex: "type",
      key: "task_type",
      width: 300,
      render: (e) => {
        const a = s(`type.${e}`, { defaultValue: e });
        return /* @__PURE__ */ t.jsx(h, { color: "blue", children: a });
      }
    },
    {
      title: s("statusLabel", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (e) => /* @__PURE__ */ t.jsx(h, { color: G[e] || "default", children: s(`status.${e}`, { defaultValue: e }) })
    },
    {
      title: s("progress", { defaultValue: "Progress" }),
      dataIndex: "progress",
      key: "progress",
      width: 100,
      render: (e, a) => a.status === "running" || a.status === "success" || a.status === "pending" ? /* @__PURE__ */ t.jsx(D, { percent: e, size: "small" }) : "-"
    },
    { title: s("creatorId", { defaultValue: "Creator" }), dataIndex: "creator_id", key: "creator_id", width: 120, ellipsis: !0 },
    {
      title: s("createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 170,
      render: (e) => e ? new Date(e).toLocaleString() : "-"
    },
    {
      title: u("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 140,
      render: (e, a) => /* @__PURE__ */ t.jsxs(f, { size: "small", children: [
        /* @__PURE__ */ t.jsx(l, { type: "text", size: "small", icon: /* @__PURE__ */ t.jsx($, {}), onClick: () => T(`/tasks/${a.id}`) }),
        a.artifact_file_key && /* @__PURE__ */ t.jsx(l, { type: "text", size: "small", icon: /* @__PURE__ */ t.jsx(O, {}), onClick: () => b(a.artifact_file_key) })
      ] })
    }
  ];
  return /* @__PURE__ */ t.jsxs(f, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
    /* @__PURE__ */ t.jsx(
      g,
      {
        title: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }),
        extra: /* @__PURE__ */ t.jsx(l, { icon: /* @__PURE__ */ t.jsx(H, {}), onClick: () => x(), children: u("refresh", { defaultValue: "Refresh" }) }),
        children: /* @__PURE__ */ t.jsx(
          F,
          {
            rowKey: "id",
            columns: C,
            dataSource: V,
            loading: j,
            pagination: !1,
            scroll: { x: 900 }
          }
        )
      }
    ),
    i && /* @__PURE__ */ t.jsx(
      g,
      {
        title: s("executionHistory", { defaultValue: "Execution History" }),
        extra: /* @__PURE__ */ t.jsx(l, { type: "text", size: "small", onClick: () => o(null), children: u("close", { defaultValue: "Close" }) }),
        children: /* @__PURE__ */ t.jsx(
          U,
          {
            actionRef: p,
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
  te as default
};
