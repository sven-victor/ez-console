import { j as t } from "./vendor.js";
import b from "react";
import { App as T, Card as o, Spin as C, Button as n, Space as u, Descriptions as r, Tag as _, Progress as D } from "antd";
import { DownloadOutlined as S, StopOutlined as I, RedoOutlined as A, DeleteOutlined as F, ArrowLeftOutlined as L } from "@ant-design/icons";
import { useParams as R, useNavigate as v } from "react-router-dom";
import { useTranslation as m } from "react-i18next";
import { useRequest as O } from "ahooks";
import { a as c } from "./index.js";
import { o as P, g as f, b as E } from "./components.js";
const $ = {
  pending: "default",
  running: "processing",
  success: "success",
  failed: "error",
  cancelled: "default"
}, K = () => {
  const { message: l } = T.useApp(), { id: s } = R(), d = v(), { t: a } = m("task"), { t: h } = m("common"), { data: e, loading: x, refresh: i } = O(
    () => s ? c.tasks.getTask({ id: s }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [s],
      ready: !!s
    }
  );
  b.useEffect(() => {
    if (!s || !e || e.status !== "running" && e.status !== "pending") return;
    const p = setInterval(i, 2e3);
    return () => clearInterval(p);
  }, [s, e == null ? void 0 : e.status, i]);
  const j = async () => {
    if (s)
      try {
        await c.tasks.cancelTask({ id: s }), l.success(a("cancelSuccess", { defaultValue: "Task cancelled." })), i();
      } catch {
        l.error(a("cancelFailed", { defaultValue: "Failed to cancel task." }));
      }
  }, k = async () => {
    if (s)
      try {
        await c.tasks.retryTask({ id: s }), l.success(a("retrySuccess", { defaultValue: "Task retry requested." })), i();
      } catch {
        l.error(a("retryFailed", { defaultValue: "Failed to retry task." }));
      }
  }, y = async () => {
    if (s)
      try {
        await c.tasks.deleteTask({ id: s }), l.success(a("deleteSuccess", { defaultValue: "Task deleted." })), d("/tasks");
      } catch {
        l.error(a("deleteFailed", { defaultValue: "Failed to delete task." }));
      }
  }, g = () => {
    if (!(e != null && e.artifact_file_key)) return;
    window.open(`/api/files/${e.artifact_file_key}`, "_blank");
  };
  if (x && !e)
    return /* @__PURE__ */ t.jsx(o, { children: /* @__PURE__ */ t.jsx(C, { spinning: !0 }) });
  if (!e)
    return /* @__PURE__ */ t.jsxs(o, { children: [
      /* @__PURE__ */ t.jsx("p", { children: a("notFound", { defaultValue: "Task not found." }) }),
      /* @__PURE__ */ t.jsx(n, { type: "primary", onClick: () => d("/tasks"), children: a("backToList", { defaultValue: "Back to list" }) })
    ] });
  const V = e.status === "running" || e.status === "pending", w = e.status === "failed" || e.status === "cancelled";
  return /* @__PURE__ */ t.jsx(
    o,
    {
      title: a("detailTitle", { defaultValue: "Task Detail" }),
      extra: /* @__PURE__ */ t.jsx(n, { type: "text", icon: /* @__PURE__ */ t.jsx(L, {}), onClick: () => d("/tasks"), children: h("back", { defaultValue: "Back" }) }),
      children: /* @__PURE__ */ t.jsxs(u, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
        /* @__PURE__ */ t.jsxs(r, { bordered: !0, column: 1, size: "small", labelStyle: { minWidth: 150 }, children: [
          /* @__PURE__ */ t.jsx(r.Item, { label: a("typeLabel", { defaultValue: "Type" }), children: a(`type.${e.type}`, { defaultValue: e.type }) }),
          /* @__PURE__ */ t.jsx(r.Item, { label: a("statusLabel", { defaultValue: "Status" }), children: /* @__PURE__ */ t.jsx(_, { color: $[e.status] || "default", children: a(`status.${e.status}`, { defaultValue: e.status }) }) }),
          /* @__PURE__ */ t.jsxs(r.Item, { label: a("progress", { defaultValue: "Progress" }), children: [
            (e.status === "running" || e.status === "pending") && /* @__PURE__ */ t.jsx(D, { percent: e.progress ?? 0, size: "small", style: { maxWidth: 200 } }),
            e.status !== "running" && e.status !== "pending" && "-"
          ] }),
          /* @__PURE__ */ t.jsx(r.Item, { label: a("creatorId", { defaultValue: "Creator" }), children: e.creator || "-" }),
          /* @__PURE__ */ t.jsx(r.Item, { label: a("createdAt", { defaultValue: "Created At" }), children: e.created_at ? new Date(e.created_at).toLocaleString() : "-" }),
          /* @__PURE__ */ t.jsx(r.Item, { label: a("startedAt", { defaultValue: "Started At" }), children: e.started_at ? new Date(e.started_at).toLocaleString() : "-" }),
          /* @__PURE__ */ t.jsx(r.Item, { label: a("finishedAt", { defaultValue: "Finished At" }), children: e.finished_at ? new Date(e.finished_at).toLocaleString() : "-" }),
          e.error && /* @__PURE__ */ t.jsx(r.Item, { label: a("error", { defaultValue: "Error" }), children: /* @__PURE__ */ t.jsx("pre", { style: { margin: 0, whiteSpace: "pre-wrap", color: "var(--ant-color-error)" }, children: e.error }) }),
          e.result && /* @__PURE__ */ t.jsx(r.Item, { label: a("result", { defaultValue: "Result" }), children: /* @__PURE__ */ t.jsx("pre", { style: { margin: 0, whiteSpace: "pre-wrap", maxHeight: 200, overflow: "auto" }, children: e.result }) })
        ] }),
        s && /* @__PURE__ */ t.jsx(
          P,
          {
            taskId: s,
            poll: e.status === "running" || e.status === "pending"
          }
        ),
        e.artifact_file_key && /* @__PURE__ */ t.jsx(u, { children: /* @__PURE__ */ t.jsx(n, { type: "primary", icon: /* @__PURE__ */ t.jsx(S, {}), onClick: g, children: a("downloadArtifact", { defaultValue: "Download artifact" }) }) }),
        /* @__PURE__ */ t.jsxs(u, { wrap: !0, children: [
          V && /* @__PURE__ */ t.jsx(f, { permission: "task:cancel", children: /* @__PURE__ */ t.jsx(n, { icon: /* @__PURE__ */ t.jsx(I, {}), onClick: j, children: a("cancel", { defaultValue: "Cancel" }) }) }),
          w && /* @__PURE__ */ t.jsx(f, { permission: "task:retry", children: /* @__PURE__ */ t.jsx(n, { icon: /* @__PURE__ */ t.jsx(A, {}), onClick: k, children: a("retry", { defaultValue: "Retry" }) }) }),
          /* @__PURE__ */ t.jsx(f, { permission: "task:delete", children: /* @__PURE__ */ t.jsx(
            E,
            {
              actions: [
                {
                  key: "delete",
                  label: a("delete", { defaultValue: "Delete" }),
                  icon: /* @__PURE__ */ t.jsx(F, {}),
                  danger: !0,
                  confirm: {
                    title: a("deleteConfirm", { defaultValue: "Delete this task?" }),
                    onConfirm: y
                  }
                }
              ]
            }
          ) })
        ] })
      ] })
    }
  );
};
export {
  K as default
};
