import { j as r } from "./vendor.js";
import { App as u, Skeleton as c, Row as f, Col as b, Card as l, Statistic as g } from "antd";
import { u as x } from "./contexts.js";
import { useTranslation as j } from "react-i18next";
import { Chart as h, CategoryScale as C, LinearScale as S, BarElement as v, Title as E, Tooltip as y, Legend as R } from "chart.js";
import { Bar as T } from "react-chartjs-2";
import { D as w } from "./components.js";
import { useRequest as A } from "ahooks";
import { a as D } from "./index.js";
import { e as k } from "./base.js";
h.register(
  C,
  S,
  v,
  E,
  y,
  R
);
const G = () => {
  const { message: n } = u.useApp(), { user: o } = x(), { t: s } = j(), { data: a = [], loading: m } = A(D.base.getStatistics, {
    onError: (e) => {
      n.error(s("dashboard.fetchStatisticsError", { defaultValue: "Error fetching statistics: {{error}}", error: e.message }));
    }
  }), p = (e) => "value" in e ? /* @__PURE__ */ r.jsx(l, { children: /* @__PURE__ */ r.jsx(
    g,
    {
      title: e.title,
      value: e.value,
      prefix: /* @__PURE__ */ r.jsx(w, { iconName: e.icon }),
      valueStyle: { color: e.color }
    }
  ) }) : /* @__PURE__ */ r.jsx(l, { children: /* @__PURE__ */ r.jsx(T, { data: {
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
  return /* @__PURE__ */ r.jsxs(c, { active: !0, loading: m, children: [
    /* @__PURE__ */ r.jsx("p", { children: s("dashboard.welcome", { defaultValue: "Welcome, {{name}}!", name: (o == null ? void 0 : o.full_name) || (o == null ? void 0 : o.username) }) }),
    a == null ? void 0 : a.map((e, t) => /* @__PURE__ */ r.jsx(f, { gutter: 16, style: { marginTop: 20 }, children: e.map((i, d) => /* @__PURE__ */ r.jsx(b, { span: i.width, children: p(i) }, d)) }, t))
  ] });
};
export {
  G as default
};
