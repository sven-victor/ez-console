import { u as a, j as e, C as r } from "./vendor.js";
import { U as u } from "./components.js";
import { a as i } from "./index.js";
const d = () => {
  const { t } = a("system");
  return /* @__PURE__ */ e.jsx(r, { title: t("audit.title", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(u, { request: i.system.getAuditLogs, columnsFilter: (s) => [
    {
      title: t("audit.columns.username", { defaultValue: "Username" }),
      dataIndex: "username",
      key: "username"
    },
    ...s
  ] }) });
};
export {
  d as default
};
