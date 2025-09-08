import { j as e } from "./vendor.js";
import { Card as r } from "antd";
import { useTranslation as a } from "react-i18next";
import { U as o } from "./components.js";
import { a as u } from "./index.js";
const f = () => {
  const { t } = a("system");
  return /* @__PURE__ */ e.jsx(r, { title: t("audit.title", { defaultValue: "Audit Logs" }), children: /* @__PURE__ */ e.jsx(o, { request: u.system.getAuditLogs, columnsFilter: (s) => [
    {
      title: t("audit.columns.username", { defaultValue: "Username" }),
      dataIndex: "username",
      key: "username"
    },
    ...s
  ] }) });
};
export {
  f as default
};
