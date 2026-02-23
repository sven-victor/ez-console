import { j as a } from "./vendor.js";
import { useRef as S, useState as D } from "react";
import { Tag as I, Space as u, Button as i, Tooltip as h, Card as R, Input as b, message as n } from "antd";
import { EyeOutlined as A, StopOutlined as F, RedoOutlined as E, DownloadOutlined as O, DeleteOutlined as v, SearchOutlined as p, ReloadOutlined as L } from "@ant-design/icons";
import { useTranslation as x } from "react-i18next";
import { a as c } from "./index.js";
import { f as d, b as m, i as P } from "./components.js";
import { P as k } from "./base.js";
import { useNavigate as z } from "react-router-dom";
const $ = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, M = () => {
  const { t: s } = x("task"), { t: o } = x("common"), r = S(null), [f, y] = D(""), j = z(), g = async (t) => {
    var e, l;
    try {
      await c.tasks.cancelTask({ id: t }), n.success(s("cancelSuccess", { defaultValue: "Task cancelled." })), (l = (e = r.current) == null ? void 0 : e.reload) == null || l.call(e);
    } catch {
      n.error(s("cancelFailed", { defaultValue: "Failed to cancel task." }));
    }
  }, w = async (t) => {
    var e, l;
    try {
      await c.tasks.retryTask({ id: t }), n.success(s("retrySuccess", { defaultValue: "Task retry requested." })), (l = (e = r.current) == null ? void 0 : e.reload) == null || l.call(e);
    } catch {
      n.error(s("retryFailed", { defaultValue: "Failed to retry task." }));
    }
  }, V = async (t) => {
    var e, l;
    try {
      await c.tasks.deleteTask({ id: t }), n.success(s("deleteSuccess", { defaultValue: "Task deleted." })), (l = (e = r.current) == null ? void 0 : e.reload) == null || l.call(e);
    } catch {
      n.error(s("deleteFailed", { defaultValue: "Failed to delete task." }));
    }
  }, C = async (t) => {
    const e = await c.base.downloadFile({ fileKey: t }, { params: { method: "sign" } }), l = `/api/files/${t}?signature=${e.signature}&expires=${e.expires}`;
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
      render: (t) => /* @__PURE__ */ a.jsx(I, { color: $[t] || "default", children: s(`status.${t}`, { defaultValue: t }) })
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
          j(`/tasks/${e.id}`);
        } }),
        (e.status === "running" || e.status === "pending") && /* @__PURE__ */ a.jsx(d, { permission: "task:cancel", children: /* @__PURE__ */ a.jsx(
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
        (e.status === "failed" || e.status === "cancelled") && /* @__PURE__ */ a.jsx(d, { permission: "task:retry", children: /* @__PURE__ */ a.jsx(h, { title: s("retry", { defaultValue: "Retry" }), children: /* @__PURE__ */ a.jsx(
          i,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ a.jsx(E, {}),
            onClick: () => w(e.id)
          }
        ) }) }),
        e.artifact_file_key && /* @__PURE__ */ a.jsx(d, { permission: "task:view", children: /* @__PURE__ */ a.jsx(h, { title: s("download", { defaultValue: "Download" }), children: /* @__PURE__ */ a.jsx(
          i,
          {
            type: "text",
            size: "small",
            icon: /* @__PURE__ */ a.jsx(O, {}),
            onClick: () => C(e.artifact_file_key)
          }
        ) }) }),
        /* @__PURE__ */ a.jsx(d, { permission: "task:delete", children: /* @__PURE__ */ a.jsx(
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
  ], _ = (t) => c.tasks.listTasks({
    current: t.current ?? k.DEFAULT_CURRENT,
    page_size: t.page_size ?? k.DEFAULT_PAGE_SIZE,
    search: f || void 0
  });
  return /* @__PURE__ */ a.jsx(R, { title: s("listTitle", { defaultValue: "Task List" }), children: /* @__PURE__ */ a.jsxs(u, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
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
      /* @__PURE__ */ a.jsx(i, { icon: /* @__PURE__ */ a.jsx(p, {}), onClick: () => {
        var t, e;
        console.log(r.current), (e = (t = r.current) == null ? void 0 : t.reload) == null || e.call(t);
      }, children: o("search", { defaultValue: "Search" }) }),
      /* @__PURE__ */ a.jsx(i, { icon: /* @__PURE__ */ a.jsx(L, {}), onClick: () => {
        var t, e;
        return (e = (t = r.current) == null ? void 0 : t.reload) == null ? void 0 : e.call(t);
      }, children: o("refresh", { defaultValue: "Refresh" }) })
    ] }),
    /* @__PURE__ */ a.jsx(
      P,
      {
        actionRef: r,
        request: _,
        columns: T,
        rowKey: "id",
        scroll: { x: 900 }
      }
    )
  ] }) });
};
export {
  M as default
};
