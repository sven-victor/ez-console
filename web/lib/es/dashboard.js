import { j as r } from "./vendor.js";
import { message as m, Skeleton as d, Row as p, Col as u, Card as i, Statistic as c } from "antd";
import { u as f } from "./contexts.js";
import { useTranslation as b } from "react-i18next";
import { Chart as g, CategoryScale as x, LinearScale as j, BarElement as h, Title as C, Tooltip as S, Legend as v } from "chart.js";
import { Bar as E } from "react-chartjs-2";
import { D as y } from "./components.js";
import { useRequest as R } from "ahooks";
import { a as T } from "./index.js";
import { t as w } from "./base.js";
g.register(
  x,
  j,
  h,
  C,
  S,
  v
);
const N = () => {
  const { user: t } = f(), { t: s } = b(), { data: a = [], loading: l } = R(T.base.getStatistics, {
    onError: (e) => {
      m.error(s("dashboard.fetchStatisticsError", { defaultValue: "Error fetching statistics: {{error}}", error: e.message }));
    }
  }), n = (e) => "value" in e ? /* @__PURE__ */ r.jsx(i, { children: /* @__PURE__ */ r.jsx(
    c,
    {
      title: e.title,
      value: e.value,
      prefix: /* @__PURE__ */ r.jsx(y, { iconName: e.icon }),
      valueStyle: { color: e.color }
    }
  ) }) : /* @__PURE__ */ r.jsx(i, { children: /* @__PURE__ */ r.jsx(E, { data: {
    labels: e.labels,
    datasets: e.datasets.map((o) => ({
      label: o.label,
      data: o.data,
      borderColor: o.color,
      backgroundColor: w(o.color, 0.5),
      borderRadius: 5,
      borderWidth: 2
    }))
  }, options: {
    responsive: !0,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  } }) });
  return /* @__PURE__ */ r.jsxs(d, { active: !0, loading: l, children: [
    /* @__PURE__ */ r.jsx("p", { children: s("dashboard.welcome", { defaultValue: "Welcome, {{name}}!", name: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }) }),
    a == null ? void 0 : a.map((e) => /* @__PURE__ */ r.jsx(p, { gutter: 16, style: { marginTop: 20 }, children: e.map((o) => /* @__PURE__ */ r.jsx(u, { span: o.width, children: n(o) })) }))
  ] });
};
export {
  N as default
};
