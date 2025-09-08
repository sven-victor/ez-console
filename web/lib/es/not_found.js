import { j as t } from "./vendor.js";
import { Result as r, Button as s } from "antd";
import { useNavigate as i } from "react-router-dom";
import { useTranslation as a } from "react-i18next";
const d = () => {
  const o = i(), { t: e } = a();
  return /* @__PURE__ */ t.jsx("div", { style: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, children: /* @__PURE__ */ t.jsx(
    r,
    {
      status: "404",
      title: "404",
      subTitle: e("error.notFound", { defaultValue: "Sorry, the page you visited does not exist." }),
      extra: /* @__PURE__ */ t.jsx(s, { type: "primary", onClick: () => o("/"), children: e("error.backHome", { defaultValue: "Back Home" }) })
    }
  ) });
};
export {
  d as default
};
