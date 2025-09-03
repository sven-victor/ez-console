import { u as d, e as u, j as e, h as m, X as c, Y as p, C as l, a1 as g, a2 as b, a3 as f, a4 as x, a5 as h, a6 as j, a7 as C, a8 as S, a9 as v, s as E } from "./vendor.js";
import { u as y } from "./contexts.js";
import { D as R } from "./components.js";
import { a as _ } from "./index.js";
import { t as w } from "./base.js";
f.register(
  x,
  h,
  j,
  C,
  S,
  v
);
const W = () => {
  const { user: r } = y(), { t } = d(), { data: o = [], loading: i } = u(_.base.getStatistics, {
    onError: (a) => {
      E.error(t("dashboard.fetchStatisticsError", { defaultValue: "Error fetching statistics: {{error}}", error: a.message }));
    }
  }), n = (a) => "value" in a ? /* @__PURE__ */ e.jsx(l, { children: /* @__PURE__ */ e.jsx(
    g,
    {
      title: a.title,
      value: a.value,
      prefix: /* @__PURE__ */ e.jsx(R, { iconName: a.icon }),
      valueStyle: { color: a.color }
    }
  ) }) : /* @__PURE__ */ e.jsx(l, { children: /* @__PURE__ */ e.jsx(b, { data: {
    labels: a.labels,
    datasets: a.datasets.map((s) => ({
      label: s.label,
      data: s.data,
      borderColor: s.color,
      backgroundColor: w(s.color, 0.5),
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
  return /* @__PURE__ */ e.jsxs(m, { active: !0, loading: i, children: [
    /* @__PURE__ */ e.jsx("p", { children: t("dashboard.welcome", { defaultValue: "Welcome, {{name}}!", name: (r == null ? void 0 : r.full_name) || (r == null ? void 0 : r.username) }) }),
    o == null ? void 0 : o.map((a) => /* @__PURE__ */ e.jsx(c, { gutter: 16, style: { marginTop: 20 }, children: a.map((s) => /* @__PURE__ */ e.jsx(p, { span: s.width, children: n(s) })) }))
  ] });
};
export {
  W as default
};
