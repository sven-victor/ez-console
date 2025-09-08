import { j as r } from "./vendor.js";
import { message as p, Skeleton as u, Row as c, Col as f, Card as l, Statistic as b } from "antd";
import { u as g } from "./contexts.js";
import { useTranslation as x } from "react-i18next";
import { Chart as j, CategoryScale as h, LinearScale as C, BarElement as S, Title as v, Tooltip as E, Legend as y } from "chart.js";
import { Bar as R } from "react-chartjs-2";
import { D as T } from "./components.js";
import { useRequest as w } from "ahooks";
import { a as D } from "./index.js";
import { t as k } from "./base.js";
j.register(
  h,
  C,
  S,
  v,
  E,
  y
);
const F = () => {
  const { user: o } = g(), { t: s } = x(), { data: a = [], loading: n } = w(D.base.getStatistics, {
    onError: (e) => {
      p.error(s("dashboard.fetchStatisticsError", { defaultValue: "Error fetching statistics: {{error}}", error: e.message }));
    }
  }), m = (e) => "value" in e ? /* @__PURE__ */ r.jsx(l, { children: /* @__PURE__ */ r.jsx(
    b,
    {
      title: e.title,
      value: e.value,
      prefix: /* @__PURE__ */ r.jsx(T, { iconName: e.icon }),
      valueStyle: { color: e.color }
    }
  ) }) : /* @__PURE__ */ r.jsx(l, { children: /* @__PURE__ */ r.jsx(R, { data: {
    labels: e.labels,
    datasets: e.datasets.map((t) => ({
      label: t.label,
      data: t.data,
      borderColor: t.color,
      backgroundColor: k(t.color, 0.5),
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
  return /* @__PURE__ */ r.jsxs(u, { active: !0, loading: n, children: [
    /* @__PURE__ */ r.jsx("p", { children: s("dashboard.welcome", { defaultValue: "Welcome, {{name}}!", name: (o == null ? void 0 : o.full_name) || (o == null ? void 0 : o.username) }) }),
    a == null ? void 0 : a.map((e, t) => /* @__PURE__ */ r.jsx(c, { gutter: 16, style: { marginTop: 20 }, children: e.map((i, d) => /* @__PURE__ */ r.jsx(f, { span: i.width, children: m(i) }, d)) }, t))
  ] });
};
export {
  F as default
};
