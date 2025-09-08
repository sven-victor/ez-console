import { j as t } from "./vendor.js";
import { Result as o, Button as a } from "antd";
import { useNavigate as s } from "react-router-dom";
import { useTranslation as i } from "react-i18next";
const c = () => {
  const r = s(), { t: e } = i();
  return /* @__PURE__ */ t.jsx("div", { style: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, children: /* @__PURE__ */ t.jsx(
    o,
    {
      status: "403",
      title: "403",
      subTitle: e("error.forbidden", { defaultValue: "Sorry, you are not authorized to access this page." }),
      extra: /* @__PURE__ */ t.jsx(a, { type: "primary", onClick: () => r("/"), children: e("error.backHome", { defaultValue: "Back Home" }) })
    }
  ) });
};
export {
  c as default
};
