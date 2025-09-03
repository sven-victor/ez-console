import { u as a, j as t, t as s, m as o } from "./vendor.js";
import { useNavigate as i } from "react-router-dom";
const l = () => {
  const r = i(), { t: e } = a();
  return /* @__PURE__ */ t.jsx("div", { style: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, children: /* @__PURE__ */ t.jsx(
    s,
    {
      status: "403",
      title: "403",
      subTitle: e("error.forbidden", { defaultValue: "Sorry, you are not authorized to access this page." }),
      extra: /* @__PURE__ */ t.jsx(o, { type: "primary", onClick: () => r("/"), children: e("error.backHome", { defaultValue: "Back Home" }) })
    }
  ) });
};
export {
  l as default
};
