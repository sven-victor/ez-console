import { j as r } from "./vendor.js";
import { message as p, Skeleton as u, Row as c, Col as f, Card as i, Statistic as g } from "antd";
import { a as b } from "./contexts.js";
import { useTranslation as x } from "react-i18next";
import { B as j, C as h, a as C, L as S, b as v, p as E, c as y, d as R } from "./chartjs.js";
import { D as _ } from "./components.js";
import { useRequest as w } from "ahooks";
import { a as B } from "./index.js";
import { t as D } from "./base.js";
h.register(
  C,
  S,
  v,
  E,
  y,
  R
);
const N = () => {
  const { user: o } = b(), { t: s } = x(), { data: t = [], loading: n } = w(B.base.getStatistics, {
    onError: (e) => {
      p.error(s("dashboard.fetchStatisticsError", { defaultValue: "Error fetching statistics: {{error}}", error: e.message }));
    }
  }), m = (e) => "value" in e ? /* @__PURE__ */ r.jsx(i, { children: /* @__PURE__ */ r.jsx(
    g,
    {
      title: e.title,
      value: e.value,
      prefix: /* @__PURE__ */ r.jsx(_, { iconName: e.icon }),
      valueStyle: { color: e.color }
    }
  ) }) : /* @__PURE__ */ r.jsx(i, { children: /* @__PURE__ */ r.jsx(j, { data: {
    labels: e.labels,
    datasets: e.datasets.map((a) => ({
      label: a.label,
      data: a.data,
      borderColor: a.color,
      backgroundColor: D(a.color, 0.5),
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
    t == null ? void 0 : t.map((e, a) => /* @__PURE__ */ r.jsx(c, { gutter: 16, style: { marginTop: 20 }, children: e.map((l, d) => /* @__PURE__ */ r.jsx(f, { span: l.width, children: m(l) }, d)) }, a))
  ] });
};
export {
  N as default
};
