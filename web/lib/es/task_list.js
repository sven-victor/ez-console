import { j as s } from "./vendor.js";
import { useRef as h, useState as k, useMemo as O, useEffect as R } from "react";
import { App as A, Tag as y, Progress as F, Card as v, Space as m, Select as E, Input as P, Button as c } from "antd";
import { EyeOutlined as L, StopOutlined as $, RedoOutlined as N, DownloadOutlined as z, DeleteOutlined as B, SearchOutlined as x, ReloadOutlined as G, CalendarOutlined as U } from "@ant-design/icons";
import { useTranslation as w } from "react-i18next";
import { a as i } from "./index.js";
import { b as q, h as M, g as Z } from "./components.js";
import { P as g } from "./base.js";
import { useNavigate as H } from "react-router-dom";
const J = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, le = () => {
  const { message: n } = A.useApp(), { t: a } = w("task"), { t: o } = w("common"), r = h(null), [u, V] = k(""), [d, j] = k(), f = h(!0), p = H(), T = O(() => {
    const e = a("type", { returnObjects: !0 });
    return !e || typeof e != "object" ? [] : Object.entries(e).map(([t, l]) => ({
      value: t,
      label: l
    }));
  }, [a]);
  R(() => {
    var e, t;
    if (f.current) {
      f.current = !1;
      return;
    }
    (t = (e = r.current) == null ? void 0 : e.reload) == null || t.call(e);
  }, [d]);
  const C = async (e) => {
    var t, l;
    try {
      await i.tasks.cancelTask({ id: e }), n.success(a("cancelSuccess", { defaultValue: "Task cancelled." })), (l = (t = r.current) == null ? void 0 : t.reload) == null || l.call(t);
    } catch {
      n.error(a("cancelFailed", { defaultValue: "Failed to cancel task." }));
    }
  }, S = async (e) => {
    var t, l;
    try {
      await i.tasks.retryTask({ id: e }), n.success(a("retrySuccess", { defaultValue: "Task retry requested." })), (l = (t = r.current) == null ? void 0 : t.reload) == null || l.call(t);
    } catch {
      n.error(a("retryFailed", { defaultValue: "Failed to retry task." }));
    }
  }, _ = async (e) => {
    var t, l;
    try {
      await i.tasks.deleteTask({ id: e }), n.success(a("deleteSuccess", { defaultValue: "Task deleted." })), (l = (t = r.current) == null ? void 0 : t.reload) == null || l.call(t);
    } catch {
      n.error(a("deleteFailed", { defaultValue: "Failed to delete task." }));
    }
  }, b = async (e) => {
    const t = await i.base.downloadFile({ fileKey: e }, { params: { method: "sign" } }), l = `/api/files/${e}?signature=${t.signature}&expires=${t.expires}`;
    window.open(l, "_blank");
  }, D = [
    {
      title: a("scheduleTaskType", { defaultValue: "Task Type" }),
      dataIndex: "type",
      key: "task_type",
      width: 300,
      render: (e) => {
        const t = a(`type.${e}`, { defaultValue: e });
        return /* @__PURE__ */ s.jsx(y, { color: "blue", children: t });
      }
    },
    {
      title: a("statusLabel", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (e) => /* @__PURE__ */ s.jsx(y, { color: J[e] || "default", children: a(`status.${e}`, { defaultValue: e }) })
    },
    {
      title: a("progress", { defaultValue: "Progress" }),
      dataIndex: "progress",
      key: "progress",
      width: 100,
      render: (e, t) => t.status === "running" || t.status === "success" || t.status === "pending" ? /* @__PURE__ */ s.jsx(F, { percent: e, size: "small" }) : "-"
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
      title: o("actions", { defaultValue: "Actions" }),
      key: "action",
      width: 100,
      fixed: "right",
      render: (e, t) => /* @__PURE__ */ s.jsx(
        q,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ s.jsx(L, {}),
              tooltip: a("view", { defaultValue: "View" }),
              onClick: async () => {
                p(`/tasks/${t.id}`);
              }
            },
            {
              key: "cancel",
              icon: /* @__PURE__ */ s.jsx($, {}),
              tooltip: a("cancel", { defaultValue: "Cancel" }),
              hidden: t.status !== "running" && t.status !== "pending",
              permission: "task:cancel",
              confirm: {
                title: a("cancelConfirm", { defaultValue: "Cancel this task?" }),
                onConfirm: () => C(t.id)
              }
            },
            {
              key: "retry",
              icon: /* @__PURE__ */ s.jsx(N, {}),
              tooltip: a("retry", { defaultValue: "Retry" }),
              hidden: t.status !== "failed" && t.status !== "cancelled",
              permission: "task:retry",
              onClick: () => S(t.id)
            },
            {
              key: "download",
              icon: /* @__PURE__ */ s.jsx(z, {}),
              tooltip: a("download", { defaultValue: "Download" }),
              hidden: !t.artifact_file_key,
              onClick: () => b(t.artifact_file_key)
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ s.jsx(B, {}),
              tooltip: a("delete", { defaultValue: "Delete" }),
              danger: !0,
              permission: "task:delete",
              confirm: {
                title: a("deleteConfirm", { defaultValue: "Delete this task?" }),
                onConfirm: () => _(t.id)
              }
            }
          ]
        }
      )
    }
  ], I = (e) => i.tasks.listTasks({
    current: e.current ?? g.DEFAULT_CURRENT,
    page_size: e.page_size ?? g.DEFAULT_PAGE_SIZE,
    search: u || void 0,
    type: d || void 0
  });
  return /* @__PURE__ */ s.jsx(
    v,
    {
      title: a("listTitle", { defaultValue: "Task List" }),
      extra: /* @__PURE__ */ s.jsx(Z, { permission: "task:schedule:list", children: /* @__PURE__ */ s.jsx(c, { type: "link", icon: /* @__PURE__ */ s.jsx(U, {}), onClick: () => p("/tasks/schedules"), children: a("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) }),
      children: /* @__PURE__ */ s.jsxs(m, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
        /* @__PURE__ */ s.jsxs(m, { wrap: !0, children: [
          /* @__PURE__ */ s.jsx(
            E,
            {
              placeholder: a("typeFilterPlaceholder", { defaultValue: "Filter by type" }),
              value: d,
              onChange: (e) => j(e),
              options: T,
              allowClear: !0,
              style: { width: 240 }
            }
          ),
          /* @__PURE__ */ s.jsx(
            P,
            {
              placeholder: a("searchPlaceholder", { defaultValue: "Search by type or ID" }),
              prefix: /* @__PURE__ */ s.jsx(x, {}),
              value: u,
              onChange: (e) => V(e.target.value),
              onPressEnter: () => {
                var e, t;
                return (t = (e = r.current) == null ? void 0 : e.reload) == null ? void 0 : t.call(e);
              },
              style: { width: 320 },
              allowClear: !0
            }
          ),
          /* @__PURE__ */ s.jsx(c, { icon: /* @__PURE__ */ s.jsx(x, {}), onClick: () => {
            var e, t;
            (t = (e = r.current) == null ? void 0 : e.reload) == null || t.call(e);
          }, children: o("search", { defaultValue: "Search" }) }),
          /* @__PURE__ */ s.jsx(c, { icon: /* @__PURE__ */ s.jsx(G, {}), onClick: () => {
            var e, t;
            return (t = (e = r.current) == null ? void 0 : e.reload) == null ? void 0 : t.call(e);
          }, children: o("refresh", { defaultValue: "Refresh" }) })
        ] }),
        /* @__PURE__ */ s.jsx(
          M,
          {
            actionRef: r,
            request: I,
            columns: D,
            rowKey: "id",
            scroll: { x: 900 }
          }
        )
      ] })
    }
  );
};
export {
  le as default
};
