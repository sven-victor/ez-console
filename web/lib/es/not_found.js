import { u as o, j as t, t as a, m as r } from "./vendor.js";
import { useNavigate as n } from "react-router-dom";
const l = () => {
  const s = n(), { t: e } = o();
  return /* @__PURE__ */ t.jsx("div", { style: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, children: /* @__PURE__ */ t.jsx(
    a,
    {
      status: "404",
      title: "404",
      subTitle: e("error.notFound", { defaultValue: "Sorry, the page you visited does not exist." }),
      extra: /* @__PURE__ */ t.jsx(r, { type: "primary", onClick: () => s("/"), children: e("error.backHome", { defaultValue: "Back Home" }) })
    }
  ) });
};
export {
  l as default
};
