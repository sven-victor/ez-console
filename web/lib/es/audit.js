import { j as s } from "./vendor.js";
import { useTranslation as r } from "react-i18next";
import { U as a } from "./components.js";
import { a as o } from "./index.js";
const d = () => {
  const { t } = r("system");
  return /* @__PURE__ */ s.jsx(a, { request: o.system.getAuditLogs, columnsFilter: (e) => [
    {
      title: t("audit.columns.username", { defaultValue: "Username" }),
      dataIndex: "username",
      key: "username"
    },
    ...e
  ] });
};
export {
  d as default
};
