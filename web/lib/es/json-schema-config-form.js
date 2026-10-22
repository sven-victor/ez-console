import { j as m } from "./vendor.js";
import D, { useMemo as N, useImperativeHandle as J, useCallback as k, useRef as O, useState as T, useEffect as W } from "react";
import z, { Templates as L } from "@rjsf/antd";
import { customizeValidator as M } from "@rjsf/validator-ajv8";
import { createStyles as K } from "antd-style";
import { useRequest as U } from "ahooks";
import { a as q } from "./index.js";
import { r as B } from "./client.js";
import { Form as G, Select as C, Tag as H } from "antd";
import Q from "axios";
import X from "@uiw/react-codemirror";
import { json as Y } from "@codemirror/lang-json";
import Z from "classnames";
import { isNumber as ee } from "lodash-es";
import { useTranslation as te } from "react-i18next";
import _ from "ajv-i18n";
const { FieldTemplate: $ } = L, re = 2, ie = K(({ css: e }) => ({
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
})), ne = (e) => {
  var i;
  return /* @__PURE__ */ m.jsx(
    I,
    {
      ...e,
      schema: {
        ...e.schema || {},
        "x-data-source": {
          ...((i = e.schema) == null ? void 0 : i["x-data-source"]) || {},
          type: "toolsets"
        }
      }
    }
  );
};
function E(e) {
  if (e == null)
    return "";
  try {
    return JSON.stringify(e, null, re);
  } catch {
    return "";
  }
}
function R(e) {
  const i = e.trim();
  if (i !== "")
    try {
      return JSON.parse(i);
    } catch {
      return;
    }
}
function oe({ t: e, ...i }) {
  const { formData: o, schema: r, onChange: t, disabled: n, id: a, required: u, name: s, fieldPathId: c } = i, d = Array.isArray(r.examples) ? r.examples : [], y = O(void 0), p = O(!1), [g, x] = T(() => E(o)), [b, j] = T(null), v = P(i.fieldPathId.path);
  W(() => {
    if (p.current) {
      p.current = !1;
      return;
    }
    y.current !== o && (y.current = o, x(E(o)), j(null));
  }, [o]);
  const S = k(
    (l) => {
      x(l);
      const f = R(l);
      if (f === void 0 && l.trim() !== "") {
        j("Invalid JSON");
        return;
      }
      j(null), y.current = f, p.current = !0, t(f, c.path);
    },
    [t, c]
  ), w = k(
    (l) => {
      const f = d[l];
      if (f === void 0) return;
      let h = typeof f == "string" ? R(f) : f;
      h && typeof h == "object" && !Array.isArray(h) && "value" in h && h.value !== void 0 && (h = h.value);
      const V = E(h);
      x(V), j(null), y.current = h, p.current = !0, t(h, c.path);
    },
    [t, d, c]
  );
  return /* @__PURE__ */ m.jsxs("div", { id: a, style: { position: "relative" }, children: [
    d.length > 0 && /* @__PURE__ */ m.jsx(
      "div",
      {
        style: {
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10
        },
        children: /* @__PURE__ */ m.jsx(
          C,
          {
            placeholder: "Load example…",
            allowClear: !0,
            style: { minWidth: 160 },
            disabled: n,
            options: d.map((l, f) => ({
              label: typeof l == "object" && l !== null && "title" in l ? String(l.title) : `Example ${f + 1}`,
              value: f
            })),
            onChange: (l) => l != null && w(l)
          }
        )
      }
    ),
    /* @__PURE__ */ m.jsx("div", { className: "ant-form-item-label", children: /* @__PURE__ */ m.jsx("label", { className: u ? "ant-form-item-required" : "ant-form-item-optional", children: v ? e == null ? void 0 : e(`${v}.label`, { defaultValue: r.title || s }) : r.title || s }) }),
    /* @__PURE__ */ m.jsx(
      X,
      {
        value: g,
        height: "200px",
        extensions: [Y()],
        onChange: S,
        editable: !n,
        basicSetup: { lineNumbers: !0, foldGutter: !0 }
      }
    ),
    b && /* @__PURE__ */ m.jsx("div", { className: "ant-form-item-additional", children: /* @__PURE__ */ m.jsx("div", { className: "ant-form-item-explain ant-form-item-explain-connected", children: /* @__PURE__ */ m.jsx("div", { className: "ant-form-item-explain-error", children: /* @__PURE__ */ m.jsx("div", { id: "root_args__error", children: /* @__PURE__ */ m.jsx("div", { children: b }) }) }) }) })
  ] });
}
const ae = (e) => (i) => /* @__PURE__ */ m.jsx(oe, { ...i, t: e });
function se(e) {
  return Array.isArray(e) ? e : e && typeof e == "object" && Array.isArray(e.data) ? e.data : [];
}
function A(e, i, o = "", r = "", t) {
  const n = i.label_key ? e[i.label_key] : void 0, a = i.value_key ? e[i.value_key] : void 0, u = a != null && String(a) !== "" ? String(a) : r, s = n != null && String(n) !== "" ? String(n) : o || u;
  return { label: t ? t(s, e) : s, value: u };
}
function le(e, i) {
  const o = e.search_key || "search";
  return {
    current: 1,
    page_size: 20,
    ...e.params || {},
    ...e.filter || {},
    ...i ? { [o]: i } : {}
  };
}
function F(e, i) {
  return i ? (Array.isArray(e) ? e : e == null || e === "" ? [] : [e]).filter((r) => r != null && r !== "").map((r) => String(r)) : e == null || e === "" ? [] : [String(e)];
}
async function ce(e, i) {
  switch (e.type) {
    case "toolsets":
      return ((await q.system.listToolSets(i)).data ?? []).map((r) => A(
        r,
        e,
        r.name,
        r.id,
        (t, n) => i.type ? t : /* @__PURE__ */ m.jsxs("span", { children: [
          /* @__PURE__ */ m.jsx(H, { color: "blue", style: { marginInlineEnd: 0 }, children: n.type }),
          " ",
          t
        ] })
      )).filter((r) => r.value !== "");
    case "api": {
      if (!e.url)
        return [];
      const o = e.url.startsWith("/") ? await B(e.url, {
        method: e.method,
        params: i
      }) : (await Q(e.url, { params: i, method: e.method })).data;
      return se(o).map((r) => A(r, e)).filter((r) => r.value !== "");
    }
    default:
      return [];
  }
}
const I = (e) => {
  const { schema: i, value: o, onChange: r, disabled: t, readonly: n, multiple: a, placeholder: u } = e, s = (i == null ? void 0 : i["x-data-source"]) || {}, c = !!a || (i == null ? void 0 : i.type) === "array", [d, y] = T(""), p = O(/* @__PURE__ */ new Map()), g = N(() => le(s, d), [s, d]), x = `${s.type ?? ""}:${s.method ?? ""}:${s.url ?? ""}:${JSON.stringify(g)}`, b = typeof s.cache_ttl == "number" ? s.cache_ttl * 1e3 : 0, { data: j, loading: v } = U(
    () => ce(s, g),
    {
      ready: s.type === "toolsets" || s.type === "api",
      refreshDeps: [x],
      debounceWait: 300,
      cacheKey: x,
      cacheTime: b,
      staleTime: b
    }
  ), S = N(() => {
    const l = /* @__PURE__ */ new Map();
    for (const f of j ?? [])
      p.current.set(f.value, f.label || f.value), l.set(f.value, f);
    for (const f of F(o, c))
      l.has(f) || l.set(f, { label: p.current.get(f) || f, value: f });
    return Array.from(l.values());
  }, [j, o, c]), w = c ? F(o, !0) : F(o, !1)[0];
  return /* @__PURE__ */ m.jsx(
    C,
    {
      mode: c ? "multiple" : void 0,
      maxTagCount: c ? "responsive" : void 0,
      maxTagPlaceholder: (l) => `+${l.length}`,
      showSearch: !0,
      filterOption: !1,
      onSearch: y,
      onOpenChange: (l) => {
        l || y("");
      },
      options: S,
      value: w,
      loading: v,
      disabled: t || n,
      placeholder: u,
      allowClear: !0,
      onChange: (l) => r == null ? void 0 : r(c ? Array.isArray(l) ? l : [] : l),
      style: { width: "100%" }
    }
  );
};
function fe(e) {
  const i = e.$defs || e.definitions || {};
  function o(t) {
    if (!t.startsWith("#/$defs/") && !t.startsWith("#/definitions/"))
      return null;
    const n = t.split("/").pop();
    return n ? i[n] : null;
  }
  function r(t) {
    if (!t) return {};
    if (t.$ref) {
      const a = o(t.$ref);
      return r(a);
    }
    const n = {};
    if (Object.keys(t).forEach((a) => {
      a.startsWith("x-ui-") && (n[`ui:${a.slice(5)}`] = t[a]);
    }), t["x-hidden"] && (n["ui:widget"] = "hidden"), t["x-disabled"] && (n["ui:disabled"] = !0), t.type === "object") {
      if (t.properties)
        for (const [a, u] of Object.entries(t.properties)) {
          const s = r(u);
          Object.keys(s).length > 0 && (n[a] = s);
        }
      t.dependencies && Object.keys(t.dependencies).forEach((a) => {
        const u = t.dependencies[a];
        u.properties ? Object.keys(u.properties).forEach((s) => {
          const c = r(u.properties[s]);
          Object.keys(c).length > 0 && (n[a] = c);
        }) : u.oneOf && u.oneOf.forEach((s) => {
          s.properties && Object.keys(s.properties).forEach((c) => {
            const d = r(s.properties[c]);
            n[c] = d;
          });
        });
      });
    }
    return t.type === "array" && t.items && (n.items = r(t.items)), t.oneOf && (n["ui:options"] = {
      ...n["ui:options"] || {},
      oneOf: t.oneOf.map((a) => r(a))
    }), t.anyOf && (n["ui:options"] = {
      ...n["ui:options"] || {},
      anyOf: t.anyOf.map((a) => r(a))
    }), t.allOf && (n["ui:options"] = {
      ...n["ui:options"] || {},
      allOf: t.allOf.map((a) => r(a))
    }), n;
  }
  if (e.$ref) {
    const t = o(e.$ref);
    return r(t);
  }
  return r(e);
}
const P = (e) => e.filter((i) => !ee(i)).join("."), ue = (e) => ({ uiSchema: i, label: o, ...r }) => {
  if (!$) return null;
  const t = P(r.fieldPathId.path);
  if (!e || !t) return /* @__PURE__ */ m.jsx($, { ...r, label: o, uiSchema: i });
  const n = i == null ? void 0 : i["ui:placeholder"], a = () => {
    var u, s, c, d;
    if ((u = r.description) != null && u.props)
      return /* @__PURE__ */ m.jsx(
        r.registry.templates.DescriptionFieldTemplate,
        {
          ...(s = r.description) == null ? void 0 : s.props,
          description: e == null ? void 0 : e(`${t}.description`, { defaultValue: (d = (c = r.description) == null ? void 0 : c.props) == null ? void 0 : d.description })
        }
      );
  };
  return /* @__PURE__ */ m.jsx(
    $,
    {
      ...r,
      label: e == null ? void 0 : e(`${t}.label`, { defaultValue: o }),
      description: a(),
      uiSchema: {
        ...i,
        ...n ? { "ui:placeholder": e == null ? void 0 : e(`${t}.placeholder`, { defaultValue: n }) } : {}
      }
    }
  );
}, me = (e) => {
  const i = e.split("-")[0];
  return _[e] || _[i];
}, de = ({
  schema: e,
  value: i,
  onChange: o,
  uiSchema: r,
  disabled: t = !1,
  formRef: n,
  t: a
}) => {
  const { styles: u } = ie(), s = i ?? {}, { i18n: c } = te(), d = N(() => M({}, me(c.language)), [c.language]);
  J(n, () => ({
    validate: (g) => {
      const x = d.validateFormData(g, e, void 0, void 0, p);
      return x.errors.filter((b) => b.name !== "additionalProperties").length > 0 ? Promise.reject(x.errors[0].message) : Promise.resolve();
    }
  }));
  const y = k(
    ({ formData: g }) => {
      o == null || o(g ?? {});
    },
    [o]
  ), p = D.useMemo(() => e ? {
    ...fe(e) || {},
    ...r || {}
  } : {}, [e, r]);
  return /* @__PURE__ */ m.jsx(
    z,
    {
      tagName: "div",
      className: Z(u.jsonSchemaForm, "json-schema-config-form"),
      schema: e || {},
      formData: s,
      onChange: y,
      validator: d,
      uiSchema: p || {},
      disabled: t,
      showErrorList: !1,
      liveValidate: "onChange",
      autoComplete: "off",
      fields: {
        objectEditor: ae(a)
      },
      widgets: {
        remoteSelect: I,
        toolsetsSelect: ne
      },
      templates: {
        FieldTemplate: ue(a)
      },
      formContext: {
        descriptionLocation: "tooltip"
      }
    }
  );
}, Te = ({ schema: e, uiSchema: i, t: o, ...r }) => {
  const t = O(null);
  return /* @__PURE__ */ m.jsx(
    G.Item,
    {
      noStyle: !0,
      ...r,
      rules: [{
        validator: (n, a) => {
          var u;
          return (u = t.current) == null ? void 0 : u.validate(a);
        },
        message: ""
      }],
      children: /* @__PURE__ */ m.jsx(de, { schema: e, formRef: t, uiSchema: i, t: o })
    }
  );
};
export {
  de as JsonSchemaConfigForm,
  Te as JsonSchemaConfigFormItem,
  fe as buildUiSchema,
  de as default
};
