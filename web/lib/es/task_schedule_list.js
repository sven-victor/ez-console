import { j as s } from "./vendor.js";
import { useState as R, useRef as E, useEffect as A } from "react";
import { message as u, Tag as p, Switch as D, Space as h, Tooltip as y, Button as l, Progress as F, Card as m, Table as N } from "antd";
import { HistoryOutlined as $, PlayCircleOutlined as P, EyeOutlined as O, DownloadOutlined as H, ReloadOutlined as g } from "@ant-design/icons";
import { useTranslation as k } from "react-i18next";
import { a as o } from "./index.js";
import { f as j, i as U } from "./components.js";
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
  const { t: a } = k("task"), { t: d } = k("common"), T = v(), [r, f] = R(null), c = E(null), { data: n, loading: V, refresh: x } = q(
    () => o.tasks.listTaskSchedules(),
    {
      onError: (e) => {
        u.error(a("scheduleListFailed", { defaultValue: "Failed to list schedules: {{error}}", error: e }));
      }
    }
  ), _ = Array.isArray(n) ? n : (n == null ? void 0 : n.data) ?? [], S = async (e, t) => {
    try {
      await o.tasks.toggleTaskSchedule({ id: e }, { enabled: t }), u.success(a("scheduleUpdated", { defaultValue: "Schedule updated." })), x();
    } catch {
      u.error(a("scheduleUpdateFailed", { defaultValue: "Failed to update schedule." }));
    }
  };
  A(() => {
    var e, t;
    r && ((t = (e = c.current) == null ? void 0 : e.reload) == null || t.call(e));
  }, [r]);
  const C = async (e) => {
    var t, i;
    try {
      await o.tasks.triggerTaskSchedule({ id: e }), u.success(a("scheduleTriggered", { defaultValue: "Task triggered." })), f(e), e === r && ((i = (t = c.current) == null ? void 0 : t.reload) == null || i.call(t));
    } catch {
      u.error(a("scheduleTriggerFailed", { defaultValue: "Failed to trigger schedule." }));
    }
  }, I = [
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
        return /* @__PURE__ */ s.jsx(p, { color: "blue", children: t });
      }
    },
    {
      title: a("scheduleEnabled", { defaultValue: "Enabled" }),
      dataIndex: "enabled",
      key: "enabled",
      width: 90,
      render: (e, t) => /* @__PURE__ */ s.jsx(j, { permission: "task:schedule:update", children: /* @__PURE__ */ s.jsx(D, { checked: e, onChange: (i) => S(t.id, i), size: "small" }) })
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
      title: d("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 200,
      fixed: "right",
      render: (e, t) => /* @__PURE__ */ s.jsxs(h, { size: "small", children: [
        /* @__PURE__ */ s.jsx(y, { title: a("viewHistory", { defaultValue: "View history" }), children: /* @__PURE__ */ s.jsx(
          l,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ s.jsx($, {}),
            onClick: () => {
              f(t.id);
            }
          }
        ) }),
        /* @__PURE__ */ s.jsx(j, { permission: "task:schedule:update", children: /* @__PURE__ */ s.jsx(y, { title: a("triggerNow", { defaultValue: "Trigger now" }), children: /* @__PURE__ */ s.jsx(
          l,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ s.jsx(P, {}),
            onClick: () => C(t.id)
          }
        ) }) })
      ] })
    }
  ], z = (e) => r ? o.tasks.getTaskScheduleHistory({
    id: r,
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
    const t = await o.base.downloadFile({ fileKey: e }, { params: { method: "sign" } }), i = `/api/files/${e}?signature=${t.signature}&expires=${t.expires}`;
    window.open(i, "_blank");
  }, L = [
    {
      title: a("scheduleTaskType", { defaultValue: "Task Type" }),
      dataIndex: "type",
      key: "task_type",
      width: 300,
      render: (e) => {
        const t = a(`type.${e}`, { defaultValue: e });
        return /* @__PURE__ */ s.jsx(p, { color: "blue", children: t });
      }
    },
    {
      title: a("statusLabel", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (e) => /* @__PURE__ */ s.jsx(p, { color: G[e] || "default", children: a(`status.${e}`, { defaultValue: e }) })
    },
    {
      title: a("progress", { defaultValue: "Progress" }),
      dataIndex: "progress",
      key: "progress",
      width: 100,
      render: (e, t) => t.status === "running" || t.status === "success" || t.status === "pending" ? /* @__PURE__ */ s.jsx(F, { percent: e, size: "small" }) : "-"
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
      title: d("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 140,
      render: (e, t) => /* @__PURE__ */ s.jsxs(h, { size: "small", children: [
        /* @__PURE__ */ s.jsx(l, { type: "text", size: "small", icon: /* @__PURE__ */ s.jsx(O, {}), onClick: () => T(`/tasks/${t.id}`) }),
        t.artifact_file_key && /* @__PURE__ */ s.jsx(l, { type: "text", size: "small", icon: /* @__PURE__ */ s.jsx(H, {}), onClick: () => b(t.artifact_file_key) })
      ] })
    }
  ];
  return /* @__PURE__ */ s.jsxs(h, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
    /* @__PURE__ */ s.jsx(
      m,
      {
        title: a("scheduledTasks", { defaultValue: "Scheduled Tasks" }),
        extra: /* @__PURE__ */ s.jsx(l, { icon: /* @__PURE__ */ s.jsx(g, {}), onClick: () => x(), children: d("refresh", { defaultValue: "Refresh" }) }),
        children: /* @__PURE__ */ s.jsx(
          N,
          {
            rowKey: "id",
            columns: I,
            dataSource: _,
            loading: V,
            pagination: !1,
            scroll: { x: 900 }
          }
        )
      }
    ),
    r && /* @__PURE__ */ s.jsx(
      m,
      {
        title: a("executionHistory", { defaultValue: "Execution History" }),
        extra: /* @__PURE__ */ s.jsxs(h, { size: "small", children: [
          /* @__PURE__ */ s.jsx(l, { type: "text", size: "small", icon: /* @__PURE__ */ s.jsx(g, {}), onClick: () => {
            var e, t;
            return (t = (e = c.current) == null ? void 0 : e.reload) == null ? void 0 : t.call(e);
          }, children: d("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ s.jsx(l, { type: "text", size: "small", onClick: () => f(null), children: d("close", { defaultValue: "Close" }) })
        ] }),
        children: /* @__PURE__ */ s.jsx(
          U,
          {
            actionRef: c,
            request: z,
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
