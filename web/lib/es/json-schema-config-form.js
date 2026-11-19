import { j as f } from "./vendor.js";
import he, { useState as _, useMemo as V, useRef as E, useCallback as k, useEffect as N, useSyncExternalStore as ye, useImperativeHandle as ge } from "react";
import be, { Templates as ae } from "@rjsf/antd";
import { getDefaultRegistry as ve } from "@rjsf/core";
import { customizeValidator as xe } from "@rjsf/validator-ajv8";
import { createStyles as je, useTheme as Oe } from "antd-style";
import { Select as H, TreeSelect as ee, Input as le, Tag as Se, Form as we, Spin as Te } from "antd";
import Fe from "@uiw/react-codemirror";
import { json as Ce } from "@codemirror/lang-json";
import Ee from "classnames";
import { isString as Ae, isNumber as Ve } from "lodash-es";
import { useTranslation as _e } from "react-i18next";
import te from "ajv-i18n";
import { getOptionValueFormat as De, enumOptionSelectedValue as Re, enumOptionValueEncoder as Le, ariaDescribedByIds as $, enumOptionValueDecoder as G, getInputProps as ke } from "@rjsf/utils";
import { flushSync as Pe } from "react-dom";
import { useRequest as Ie } from "ahooks";
import { a as Be } from "./index.js";
import { r as Me } from "./client.js";
import Ne from "axios";
const $e = {
  width: "100%"
};
function q({
  autofocus: e,
  disabled: t,
  registry: o,
  id: r,
  htmlName: n,
  multiple: i,
  onBlur: s,
  onChange: l,
  onFocus: c,
  options: a,
  placeholder: u,
  readonly: b,
  value: m,
  schema: O
}) {
  const [p, h] = _(!1), { formContext: y } = o, { readonlyAsDisabled: A = !0 } = y, { enumOptions: S, enumDisabled: v, emptyValue: x } = a, T = De(a), w = (R) => l(G(R, S, T, x)), j = () => s(r, G(m, S, T, x)), C = () => c(r, G(m, S, T, x)), P = (R, L) => L && Ae(L.label) ? L.label.toLowerCase().includes(R.toLowerCase()) : !1, I = q.getPopupContainerCallback(), F = Re(m, S, !!i, T, x), g = {
    name: n || r
  }, d = !i && O.default === void 0, D = V(() => {
    if (Array.isArray(S)) {
      const R = S.map(
        ({ value: L, label: W }, Z) => ({
          disabled: Array.isArray(v) && v.includes(L),
          key: String(Z),
          value: Le(L, Z, T),
          label: W
        })
      );
      return d && R.unshift({ value: "", label: u || "" }), R;
    }
  }, [v, S, u, d, T]);
  return /* @__PURE__ */ f.jsx(
    H,
    {
      open: p,
      autoFocus: e,
      disabled: t || A && b,
      getPopupContainer: I,
      id: r,
      mode: i ? "multiple" : void 0,
      onBlur: b ? void 0 : j,
      onChange: b ? void 0 : w,
      onFocus: b ? void 0 : C,
      placeholder: u,
      style: $e,
      value: F,
      maxTagCount: i ? "responsive" : void 0,
      ...g,
      onOpenChange: h,
      filterOption: P,
      "aria-describedby": $(r),
      options: D
    }
  );
}
q.getPopupContainerCallback = () => (e) => (e == null ? void 0 : e.parentElement) ?? document.body;
const We = {
  width: "100%"
};
function ce(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function ue(e, t) {
  if (!Array.isArray(e))
    return [];
  const o = [];
  for (const r of e) {
    if (!ce(r) || r.value == null || r.value === "")
      continue;
    const n = ue(r.children, t), i = String(r.value);
    o.push({
      value: i,
      title: r.label == null || r.label === "" ? i : String(r.label),
      disabled: r.disabled === !0 || t && n.length > 0,
      children: n.length > 0 ? n : void 0
    });
  }
  return o;
}
function Ge(e) {
  const t = /* @__PURE__ */ new Map(), o = (r) => {
    const n = String(r.value ?? ""), i = r.children ?? [], s = i.length === 0 ? r.disabled || n === "" ? [] : [n] : i.flatMap((l) => o(l));
    return n !== "" && t.set(n, s), s;
  };
  return e.forEach(o), t;
}
function re(e, t) {
  const o = /* @__PURE__ */ new Set(), r = [], n = (s) => {
    const l = t.get(s), c = l === void 0 ? [s] : l;
    for (const a of c)
      a !== "" && !o.has(a) && (o.add(a), r.push(a));
  }, i = (s) => {
    if (Array.isArray(s)) {
      s.forEach(i);
      return;
    }
    if (!(s == null || s === "")) {
      if (ce(s)) {
        if (s.halfChecked === !0)
          return;
        "value" in s && i(s.value);
        return;
      }
      n(String(s));
    }
  };
  return i(e), r;
}
const Ue = (e, t) => {
  const o = t.title;
  return typeof o == "string" && o.toLowerCase().includes(e.toLowerCase());
}, Je = (e) => e.parentElement ?? document.body;
function Ye({
  autofocus: e,
  disabled: t,
  registry: o,
  id: r,
  multiple: n,
  onBlur: i,
  onChange: s,
  onFocus: l,
  placeholder: c,
  readonly: a,
  value: u,
  schema: b
}) {
  const { formContext: m } = o, { readonlyAsDisabled: O = !0 } = m, p = !!n || b.type === "array", h = V(
    () => ue(b["x-tree-options"], !p),
    [b, p]
  ), y = V(() => Ge(h), [h]), A = re(u, y), S = p ? A : A[0], v = (x) => {
    const T = re(x, y);
    s(p ? T : T[0]);
  };
  return /* @__PURE__ */ f.jsx(
    ee,
    {
      id: r,
      autoFocus: e,
      allowClear: !0,
      disabled: t || O && a,
      getPopupContainer: Je,
      placeholder: c,
      showSearch: !0,
      style: We,
      treeData: h,
      treeDefaultExpandAll: !0,
      treeCheckable: p || void 0,
      showCheckedStrategy: p ? ee.SHOW_CHILD : void 0,
      maxTagCount: p ? "responsive" : void 0,
      value: S,
      filterTreeNode: Ue,
      onBlur: a ? void 0 : () => i(r, u),
      onChange: a ? void 0 : v,
      onFocus: a ? void 0 : () => l(r, u),
      "aria-describedby": $(r)
    }
  );
}
function Q(e) {
  const [t, o] = _(e), [r, n] = _(e), i = E(e), s = E(e), l = E(!1);
  !l.current && e !== r && (n(e), o(e), i.current = e, s.current = e);
  const c = k((m) => {
    i.current = m, o(m);
  }, []), a = k((m, O) => {
    i.current = m, o(m), !Object.is(m, s.current) && (s.current = m, Pe(() => O(m)));
  }, []), u = k((m) => {
    a(i.current, m);
  }, [a]), b = k((m) => {
    l.current = m;
  }, []);
  return { draft: t, updateDraft: c, flush: a, flushDraft: u, markFocused: b };
}
function ze(e) {
  const { disabled: t, registry: o, id: r, onBlur: n, onChange: i, onFocus: s, options: l, placeholder: c, readonly: a, value: u } = e, { formContext: b } = o, { readonlyAsDisabled: m = !0 } = b, { type: O, ...p } = ke(e.schema, "password", l, !1), h = l.emptyValue || "", { draft: y, updateDraft: A, flush: S, markFocused: v } = Q(u || ""), x = ({ target: j }) => A(j.value === "" ? h : j.value), T = ({ target: j }) => {
    v(!1);
    const C = j.value === "" ? h : j.value;
    S(C, i), n(r, C);
  }, w = ({ target: j }) => {
    v(!0), s(r, j.value);
  };
  return /* @__PURE__ */ f.jsx(
    le.Password,
    {
      ...p,
      disabled: t || m && a,
      id: r,
      name: r,
      onBlur: a ? void 0 : T,
      onChange: a ? void 0 : x,
      onFocus: a ? void 0 : w,
      placeholder: c,
      value: typeof y == "string" ? y : "",
      "aria-describedby": $(r)
    }
  );
}
function Ke(e) {
  return e == null || typeof e == "string" && e.trim() === "";
}
function He(e, t) {
  return !t || t.length === 0 ? !0 : t.every((o) => !Ke(e[o]));
}
function qe(e, t, o) {
  const r = (e.method || "GET").toUpperCase(), n = e.depends_on ?? [];
  if (!(r !== "GET" && r !== "HEAD" && n.length > 0))
    return { params: Ze(e, o), localFilter: !1 };
  const s = {};
  for (const l of n)
    Object.prototype.hasOwnProperty.call(t, l) && (s[l] = t[l]);
  return {
    data: {
      ...e.params || {},
      ...e.filter || {},
      [e.body_key || "config"]: s
    },
    localFilter: !0
  };
}
function Qe(e) {
  return e ? e instanceof Error ? e.message : typeof e == "object" && e && "err" in e ? String(e.err ?? "") : String(e) : "";
}
function Xe(e) {
  return Array.isArray(e) ? e : e && typeof e == "object" && Array.isArray(e.data) ? e.data : [];
}
function ne(e, t, o = "", r = "", n) {
  const i = t.label_key ? e[t.label_key] : void 0, s = t.value_key ? e[t.value_key] : void 0, l = s != null && String(s) !== "" ? String(s) : r, c = i != null && String(i) !== "" ? String(i) : o || l, a = typeof e.description == "string" ? e.description : "";
  return { label: n ? n(c, e) : c, value: l, title: a || void 0 };
}
function Ze(e, t) {
  const o = e.search_key || "search";
  return {
    current: 1,
    page_size: 20,
    ...e.params || {},
    ...e.filter || {},
    ...t ? { [o]: t } : {}
  };
}
function M(e) {
  if (typeof e == "boolean")
    return e;
  if (e === "true")
    return !0;
  if (e === "false")
    return !1;
}
function et(e, t) {
  var s, l;
  const o = M((s = e.options) == null ? void 0 : s.loadOnOpen);
  if (o !== void 0)
    return o;
  const r = e.uiSchema, n = M((r == null ? void 0 : r["ui:loadOnOpen"]) ?? (r == null ? void 0 : r["ui:load-on-open"]));
  if (n !== void 0)
    return n;
  const i = M((l = e.schema) == null ? void 0 : l["x-ui-load-on-open"]);
  return i !== void 0 ? i : M(t.load_on_open) ?? !1;
}
function U(e, t) {
  return t ? (Array.isArray(e) ? e : e == null || e === "" ? [] : [e]).filter((r) => r != null && r !== "").map((r) => String(r)) : e == null || e === "" ? [] : [String(e)];
}
async function tt(e, t) {
  switch (e.type) {
    case "toolsets": {
      const o = t.params || {};
      return ((await Be.system.listToolSets(o)).data ?? []).map((n) => ne(
        n,
        e,
        n.name,
        n.id,
        (i, s) => o.type ? i : /* @__PURE__ */ f.jsxs("span", { children: [
          /* @__PURE__ */ f.jsx(Se, { color: "blue", style: { marginInlineEnd: 0 }, children: s.type }),
          " ",
          i
        ] })
      )).filter((n) => n.value !== "");
    }
    case "api": {
      if (!e.url)
        return [];
      const o = e.url.startsWith("/") ? await Me(e.url, {
        method: e.method,
        params: t.params,
        data: t.data
      }) : (await Ne(e.url, {
        params: t.params,
        data: t.data,
        method: e.method
      })).data;
      return Xe(o).map((r) => ne(r, e)).filter((r) => r.value !== "");
    }
    default:
      return [];
  }
}
const J = {};
function oe() {
  return () => {
  };
}
function rt(e) {
  const t = e == null ? void 0 : e["x-data-source"];
  return t ? [...t.depends_on ?? [], ...t.ready_on ?? []] : [];
}
function nt(e, t) {
  const o = {};
  for (const r of t)
    Object.prototype.hasOwnProperty.call(e, r) && (o[r] = e[r]);
  return o;
}
function ot(e, t, o) {
  return o.every((r) => Object.is(e[r], t[r]) && Object.prototype.hasOwnProperty.call(e, r) === Object.prototype.hasOwnProperty.call(t, r));
}
function st(e) {
  var l;
  const t = (l = e.registry) == null ? void 0 : l.formContext, o = rt(e.schema), r = o.join("\0"), n = E(J), i = () => {
    var u;
    if (e.formValues)
      return e.formValues;
    if (!r)
      return J;
    const c = ((u = t == null ? void 0 : t.getFormValues) == null ? void 0 : u.call(t)) ?? J, a = nt(c, o);
    return ot(n.current, a, o) ? n.current : (n.current = a, a);
  }, s = e.formValues || !r ? oe : (t == null ? void 0 : t.subscribeFormValues) ?? oe;
  return ye(s, i, i);
}
const X = (e) => {
  const { schema: t, value: o, onChange: r, disabled: n, readonly: i, multiple: s, placeholder: l } = e, c = st(e), a = (t == null ? void 0 : t["x-data-source"]) || {}, u = !!s || (t == null ? void 0 : t.type) === "array", [b, m] = _(""), O = E(/* @__PURE__ */ new Map()), p = E(!1), h = V(
    () => qe(a, c, b),
    [a, c, b]
  ), y = `${a.type ?? ""}:${a.method ?? ""}:${a.url ?? ""}:${JSON.stringify(h.data ?? h.params)}`, A = typeof a.cache_ttl == "number" ? a.cache_ttl * 1e3 : 0, S = A > 0 ? A : -1, v = (a.type === "toolsets" || a.type === "api") && He(c, a.ready_on), x = et(e, a), { data: T, loading: w, error: j, run: C } = Ie(
    () => tt(a, h),
    {
      manual: x,
      ready: v,
      refreshDeps: [y],
      debounceWait: 300,
      cacheKey: y,
      cacheTime: S,
      staleTime: S
    }
  );
  N(() => {
    !x || !p.current || C();
  }, [x, y, v, C]);
  const P = V(() => {
    const g = /* @__PURE__ */ new Map();
    for (const d of T ?? [])
      O.current.set(d.value, d.label || d.value), g.set(d.value, d);
    for (const d of U(o, u))
      g.has(d) || g.set(d, { label: O.current.get(d) || d, value: d });
    return Array.from(g.values());
  }, [T, o, u]), I = u ? U(o, !0) : U(o, !1)[0], F = v ? Qe(j) : "";
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsx(
      H,
      {
        mode: u ? "multiple" : void 0,
        maxTagCount: u ? "responsive" : void 0,
        maxTagPlaceholder: (g) => `+${g.length}`,
        showSearch: !0,
        filterOption: h.localFilter ? (g, d) => {
          const D = g.trim().toLowerCase();
          if (!D)
            return !0;
          const R = String((d == null ? void 0 : d.value) ?? "").toLowerCase(), L = typeof (d == null ? void 0 : d.label) == "string" ? d.label.toLowerCase() : "", W = String((d == null ? void 0 : d.title) ?? "").toLowerCase();
          return R.includes(D) || L.includes(D) || W.includes(D);
        } : !1,
        onSearch: h.localFilter ? void 0 : m,
        onOpenChange: (g) => {
          if (p.current = g, !g) {
            m("");
            return;
          }
          x && !w && C();
        },
        options: P,
        value: I,
        loading: w,
        disabled: n || i,
        placeholder: l,
        allowClear: !0,
        onChange: (g) => r == null ? void 0 : r(u ? Array.isArray(g) ? g : [] : g),
        style: { width: "100%" }
      }
    ),
    F ? /* @__PURE__ */ f.jsx("div", { style: { color: "#ff4d4f", marginTop: 4 }, children: F }) : null
  ] });
};
X.displayName = "RemoteSelectWidget";
const de = (e) => {
  var t;
  return /* @__PURE__ */ f.jsx(
    X,
    {
      ...e,
      schema: {
        ...e.schema || {},
        "x-data-source": {
          ...((t = e.schema) == null ? void 0 : t["x-data-source"]) || {},
          type: "toolsets"
        }
      }
    }
  );
};
de.displayName = "ToolsetsSelectWidget";
const { BaseInputTemplate: it } = ae, at = { width: "100%" };
function K(e, t) {
  return e === "" ? t : e;
}
function lt(e) {
  const { value: t, onChange: o, onBlur: r, onFocus: n, options: i } = e, { draft: s, updateDraft: l, flushDraft: c, markFocused: a } = Q(t), u = ({ target: p }) => {
    l(K(p.value, i.emptyValue));
  }, b = (p, h) => {
    a(!1), c(o), r(p, h);
  }, m = (p, h) => {
    a(!0), n(p, h);
  }, O = it;
  return O ? /* @__PURE__ */ f.jsx(
    O,
    {
      ...e,
      value: s,
      onChangeOverride: u,
      onChange: (p) => l(p),
      onBlur: b,
      onFocus: m
    }
  ) : null;
}
function ct({
  disabled: e,
  registry: t,
  id: o,
  htmlName: r,
  onBlur: n,
  onChange: i,
  onFocus: s,
  options: l,
  placeholder: c,
  readonly: a,
  value: u
}) {
  const { readonlyAsDisabled: b = !0 } = t.formContext, { draft: m, updateDraft: O, flush: p, markFocused: h } = Q(u ?? ""), y = ({ target: v }) => {
    O(K(v.value, l.emptyValue));
  }, A = ({ target: v }) => {
    h(!1);
    const x = K(v.value, l.emptyValue);
    p(x, i), n(o, x);
  }, S = ({ target: v }) => {
    h(!0), s(o, v.value);
  };
  return /* @__PURE__ */ f.jsx(
    le.TextArea,
    {
      disabled: e || b && a,
      id: o,
      name: r || o,
      onBlur: a ? void 0 : A,
      onChange: a ? void 0 : y,
      onFocus: a ? void 0 : S,
      placeholder: c,
      rows: l.rows || 4,
      style: at,
      value: typeof m == "string" ? m : "",
      "aria-describedby": $(o)
    }
  );
}
const { FieldTemplate: Y } = ae, B = 4, fe = ve().fields.LayoutGridField;
function me(e) {
  var r;
  const t = e == null ? void 0 : e["ui:layoutGrid"], o = (r = t == null ? void 0 : t["ui:row"]) == null ? void 0 : r.children;
  return Array.isArray(o) ? o : null;
}
function ut(e, t) {
  const o = e ?? {}, r = o["ui:layoutGrid"] ?? {}, n = r["ui:row"] ?? {};
  return {
    ...o,
    "ui:layoutGrid": {
      ...r,
      "ui:row": {
        ...n,
        children: t
      }
    }
  };
}
function dt({ total: e, ...t }) {
  const [o, r] = _(() => Math.min(B, e)), [n, i] = _(e);
  n !== e && (i(e), r(Math.min(B, e)));
  const s = n === e ? o : Math.min(B, e);
  N(() => {
    if (s >= e)
      return;
    const c = window.setTimeout(() => {
      r((a) => Math.min(a + B, e));
    }, 0);
    return () => window.clearTimeout(c);
  }, [s, e]);
  const l = V(
    () => ut(t.uiSchema, (me(t.uiSchema) ?? []).slice(0, s)),
    [t.uiSchema, s]
  );
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsx(fe, { ...t, uiSchema: l }),
    s < e ? /* @__PURE__ */ f.jsx("div", { style: { textAlign: "center", padding: 8 }, children: /* @__PURE__ */ f.jsx(Te, { size: "small" }) }) : null
  ] });
}
function ft(e) {
  const t = me(e.uiSchema);
  return !t || t.length <= B ? /* @__PURE__ */ f.jsx(fe, { ...e }) : /* @__PURE__ */ f.jsx(dt, { ...e, total: t.length });
}
const mt = 2, pt = 300, ht = je(({ css: e }) => ({
  jsonSchemaForm: e`
      .ant-form-item-control-input-content>#root {
        border-width: 0;
        padding: 0px;
        display: contents;
      }
      >.ant-btn-submit{
        display: none;
      }
      >.field-object>.ant-form-item{
        margin-bottom: 0px;
      }
      .ant-col:empty{
        display: none; 
      }
      .ant-form-item{
        >.ant-form-item-with-help,.ant-form-item-has-feedback.ant-form-item-has-error{
          margin-bottom: 0px;
        }
      }
      .ant-form-item-additional{
        height: 24px;
        overflow: hidden;
      }
      .ant-form-item-additional:has(>.ant-form-item-explain){
        >.ant-form-item-extra{
          display: none;
        }
      }
    `
}));
function z(e) {
  if (e == null)
    return "";
  try {
    return JSON.stringify(e, null, mt);
  } catch {
    return "";
  }
}
function se(e) {
  const t = e.trim();
  if (t !== "")
    try {
      return JSON.parse(t);
    } catch {
      return;
    }
}
function yt({ t: e, ...t }) {
  const { isDarkMode: o } = Oe(), { formData: r, schema: n, onChange: i, disabled: s, id: l, required: c, name: a, fieldPathId: u } = t, b = Array.isArray(n.examples) ? n.examples : [], m = E(void 0), O = E(!1), p = E(void 0), h = E(!1), y = E(void 0), A = E(i), S = E(u.path);
  A.current = i, S.current = u.path;
  const [v, x] = _(() => z(r)), [T, w] = _(null), j = pe(t.fieldPathId.path), C = k(() => {
    y.current && (clearTimeout(y.current), y.current = void 0), h.current && (h.current = !1, O.current = !0, m.current = p.current, A.current(p.current, S.current));
  }, []);
  N(() => () => C(), [C]), N(() => {
    if (O.current) {
      O.current = !1;
      return;
    }
    m.current !== r && (m.current = r, x(z(r)), w(null));
  }, [r]);
  const P = k(
    (F) => {
      x(F);
      const g = se(F);
      if (g === void 0 && F.trim() !== "") {
        w("Invalid JSON"), h.current = !1, y.current && (clearTimeout(y.current), y.current = void 0);
        return;
      }
      w(null), p.current = g, h.current = !0, y.current && clearTimeout(y.current), y.current = setTimeout(C, pt);
    },
    [C]
  ), I = k(
    (F) => {
      const g = b[F];
      if (g === void 0) return;
      let d = typeof g == "string" ? se(g) : g;
      d && typeof d == "object" && !Array.isArray(d) && "value" in d && d.value !== void 0 && (d = d.value);
      const D = z(d);
      x(D), w(null), y.current && (clearTimeout(y.current), y.current = void 0), h.current = !1, m.current = d, O.current = !0, i(d, u.path);
    },
    [i, b, u]
  );
  return /* @__PURE__ */ f.jsxs("div", { id: l, style: { position: "relative" }, children: [
    b.length > 0 && /* @__PURE__ */ f.jsx(
      "div",
      {
        style: {
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10
        },
        children: /* @__PURE__ */ f.jsx(
          H,
          {
            placeholder: "Load example…",
            allowClear: !0,
            style: { minWidth: 160 },
            disabled: s,
            options: b.map((F, g) => ({
              label: typeof F == "object" && F !== null && "title" in F ? String(F.title) : `Example ${g + 1}`,
              value: g
            })),
            onChange: (F) => F != null && I(F)
          }
        )
      }
    ),
    /* @__PURE__ */ f.jsx("div", { className: "ant-form-item-label", children: /* @__PURE__ */ f.jsx("label", { className: c ? "ant-form-item-required" : "ant-form-item-optional", children: j ? e == null ? void 0 : e(`${j}.label`, { defaultValue: n.title || a }) : n.title || a }) }),
    /* @__PURE__ */ f.jsx(
      Fe,
      {
        value: v,
        height: "200px",
        theme: o ? "dark" : "light",
        extensions: [Ce()],
        onChange: P,
        onBlur: C,
        editable: !s,
        basicSetup: { lineNumbers: !0, foldGutter: !0 }
      }
    ),
    T && /* @__PURE__ */ f.jsx("div", { className: "ant-form-item-additional", children: /* @__PURE__ */ f.jsx("div", { className: "ant-form-item-explain ant-form-item-explain-connected", children: /* @__PURE__ */ f.jsx("div", { className: "ant-form-item-explain-error", children: /* @__PURE__ */ f.jsx("div", { id: "root_args__error", children: /* @__PURE__ */ f.jsx("div", { children: T }) }) }) }) })
  ] });
}
const gt = (e) => (t) => /* @__PURE__ */ f.jsx(yt, { ...t, t: e });
function bt(e) {
  const t = e.$defs || e.definitions || {};
  function o(n) {
    if (!n.startsWith("#/$defs/") && !n.startsWith("#/definitions/"))
      return null;
    const i = n.split("/").pop();
    return i ? t[i] : null;
  }
  function r(n) {
    if (!n) return {};
    if (n.$ref) {
      const s = o(n.$ref);
      return r(s);
    }
    const i = {};
    if (Object.keys(n).forEach((s) => {
      s.startsWith("x-ui-") && (i[`ui:${s.slice(5)}`] = n[s]);
    }), n["x-hidden"] && (i["ui:widget"] = "hidden"), n["x-disabled"] && (i["ui:disabled"] = !0), n.type === "object") {
      if (n.properties)
        for (const [s, l] of Object.entries(n.properties)) {
          const c = r(l);
          Object.keys(c).length > 0 && (i[s] = c);
        }
      n.dependencies && Object.keys(n.dependencies).forEach((s) => {
        const l = n.dependencies[s];
        l.properties ? Object.keys(l.properties).forEach((c) => {
          const a = r(l.properties[c]);
          Object.keys(a).length > 0 && (i[s] = a);
        }) : l.oneOf && l.oneOf.forEach((c) => {
          c.properties && Object.keys(c.properties).forEach((a) => {
            const u = r(c.properties[a]);
            i[a] = u;
          });
        });
      });
    }
    return n.type === "array" && n.items && (i.items = r(n.items)), n.oneOf && (i["ui:options"] = {
      ...i["ui:options"] || {},
      oneOf: n.oneOf.map((s) => r(s))
    }), n.anyOf && (i["ui:options"] = {
      ...i["ui:options"] || {},
      anyOf: n.anyOf.map((s) => r(s))
    }), n.allOf && (i["ui:options"] = {
      ...i["ui:options"] || {},
      allOf: n.allOf.map((s) => r(s))
    }), i;
  }
  if (e.$ref) {
    const n = o(e.$ref);
    return r(n);
  }
  return r(e);
}
const pe = (e) => e.filter((t) => !Ve(t)).join("."), vt = (e) => ({ uiSchema: t, label: o, ...r }) => {
  if (!Y) return null;
  const n = pe(r.fieldPathId.path);
  if (!e || !n) return /* @__PURE__ */ f.jsx(Y, { ...r, label: o, uiSchema: t });
  const i = t == null ? void 0 : t["ui:placeholder"], s = () => {
    var l, c, a, u;
    if ((l = r.description) != null && l.props)
      return /* @__PURE__ */ f.jsx(
        r.registry.templates.DescriptionFieldTemplate,
        {
          ...(c = r.description) == null ? void 0 : c.props,
          description: e == null ? void 0 : e(`${n}.description`, { defaultValue: (u = (a = r.description) == null ? void 0 : a.props) == null ? void 0 : u.description })
        }
      );
  };
  return /* @__PURE__ */ f.jsx(
    Y,
    {
      ...r,
      label: e == null ? void 0 : e(`${n}.label`, { defaultValue: o }),
      description: s(),
      uiSchema: {
        ...t,
        ...i ? { "ui:placeholder": e == null ? void 0 : e(`${n}.placeholder`, { defaultValue: i }) } : {}
      }
    }
  );
}, xt = {}, ie = {}, jt = {
  remoteSelect: X,
  toolsetsSelect: de,
  select: q,
  treeSelect: Ye,
  password: ze,
  TextareaWidget: ct
}, Ot = (e) => {
  const t = e.split("-")[0];
  return te[e] || te[t];
}, St = ({
  schema: e,
  value: t,
  onChange: o,
  uiSchema: r,
  disabled: n = !1,
  formRef: i,
  t: s
}) => {
  const { styles: l } = ht(), c = E(t ?? ie), a = E(/* @__PURE__ */ new Set()), u = E(t), [b, m] = _(t), [O, p] = _(0);
  t !== u.current && (u.current = t, c.current = t ?? ie, m(t), p((w) => w + 1));
  const { i18n: h } = _e(), y = V(() => xe({}, Ot(h.language)), [h.language]);
  ge(i, () => ({
    validate: (w) => {
      const j = y.validateFormData(w, e, void 0, void 0, v);
      return j.errors.filter((C) => C.name !== "additionalProperties").length > 0 ? (console.error(j.errors), Promise.reject(j.errors[0].message)) : Promise.resolve();
    }
  }));
  const A = k(
    ({ formData: w }) => {
      const j = w ?? {};
      u.current = j, c.current = j, a.current.forEach((C) => C()), o == null || o(j);
    },
    [o]
  ), S = V(() => ({
    descriptionLocation: "tooltip",
    getFormValues: () => c.current,
    subscribeFormValues: (w) => (a.current.add(w), () => {
      a.current.delete(w);
    })
  }), []), v = he.useMemo(() => e ? {
    ...bt(e) || {},
    ...r || {}
  } : {}, [e, r]), x = V(() => ({
    objectEditor: gt(s),
    LayoutGridField: ft
  }), [s]), T = V(() => ({
    FieldTemplate: vt(s),
    BaseInputTemplate: lt
  }), [s]);
  return /* @__PURE__ */ f.jsx(
    be,
    {
      tagName: "div",
      className: Ee(l.jsonSchemaForm, "json-schema-config-form"),
      schema: e || xt,
      initialFormData: b,
      onChange: A,
      validator: y,
      uiSchema: v || {},
      disabled: n,
      showErrorList: !1,
      liveValidate: "onBlur",
      liveOmit: "onBlur",
      autoComplete: "off",
      fields: x,
      widgets: jt,
      templates: T,
      formContext: S
    },
    O
  );
}, Gt = ({ schema: e, uiSchema: t, t: o, ...r }) => {
  const n = E(null);
  return /* @__PURE__ */ f.jsx(
    we.Item,
    {
      noStyle: !0,
      ...r,
      rules: [{
        validator: (i, s) => {
          var l;
          return (l = n.current) == null ? void 0 : l.validate(s);
        },
        message: ""
      }],
      children: /* @__PURE__ */ f.jsx(St, { schema: e, formRef: n, uiSchema: t, t: o })
    }
  );
};
export {
  St as JsonSchemaConfigForm,
  Gt as JsonSchemaConfigFormItem,
  bt as buildUiSchema
};
