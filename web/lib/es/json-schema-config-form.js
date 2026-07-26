import { j as n } from "./vendor.js";
import F, { useImperativeHandle as C, useCallback as j, useRef as g, useState as S, useEffect as I } from "react";
import J from "@rjsf/antd";
import N from "@rjsf/validator-ajv8";
import { createStyles as T } from "antd-style";
import { useRequest as D } from "ahooks";
import { a as W } from "./index.js";
import { r as q } from "./client.js";
import { Form as A, Select as _ } from "antd";
import P from "axios";
import U from "@uiw/react-codemirror";
import { json as L } from "@codemirror/lang-json";
import V from "classnames";
const z = 2, M = T(({ css: t }) => ({
  jsonSchemaForm: t`
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
        margin-bottom: 0px;
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
})), G = (t) => {
  var s;
  return /* @__PURE__ */ n.jsx(
    k,
    {
      ...t,
      schema: {
        ...t.schema || {},
        "x-data-source": {
          ...((s = t.schema) == null ? void 0 : s["x-data-source"]) || {},
          type: "toolsets"
        }
      }
    }
  );
};
function b(t) {
  if (t == null)
    return "";
  try {
    return JSON.stringify(t, null, z);
  } catch {
    return "";
  }
}
function E(t) {
  const s = t.trim();
  if (s !== "")
    try {
      return JSON.parse(s);
    } catch {
      return;
    }
}
function H(t) {
  const { formData: s, schema: l, onChange: r, disabled: e, id: i, required: a, name: o, fieldPathId: c } = t, u = Array.isArray(l.examples) ? l.examples : [], f = g(void 0), h = g(!1), [v, x] = S(() => b(s)), [O, y] = S(null);
  I(() => {
    if (h.current) {
      h.current = !1;
      return;
    }
    f.current !== s && (f.current = s, x(b(s)), y(null));
  }, [s]);
  const $ = j(
    (m) => {
      x(m);
      const d = E(m);
      if (d === void 0 && m.trim() !== "") {
        y("Invalid JSON");
        return;
      }
      y(null), f.current = d, h.current = !0, r(d, c.path);
    },
    [r, c]
  ), w = j(
    (m) => {
      const d = u[m];
      if (d === void 0) return;
      let p = typeof d == "string" ? E(d) : d;
      p && typeof p == "object" && !Array.isArray(p) && "value" in p && p.value !== void 0 && (p = p.value);
      const R = b(p);
      x(R), y(null), f.current = p, h.current = !0, r(p, c.path);
    },
    [r, u, c]
  );
  return /* @__PURE__ */ n.jsxs("div", { id: i, style: { position: "relative" }, children: [
    u.length > 0 && /* @__PURE__ */ n.jsx(
      "div",
      {
        style: {
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10
        },
        children: /* @__PURE__ */ n.jsx(
          _,
          {
            placeholder: "Load example…",
            allowClear: !0,
            style: { minWidth: 160 },
            disabled: e,
            options: u.map((m, d) => ({
              label: typeof m == "object" && m !== null && "title" in m ? String(m.title) : `Example ${d + 1}`,
              value: d
            })),
            onChange: (m) => m != null && w(m)
          }
        )
      }
    ),
    /* @__PURE__ */ n.jsx("div", { className: "ant-form-item-label", children: /* @__PURE__ */ n.jsx("label", { className: a ? "ant-form-item-required" : "ant-form-item-optional", children: l.title || o }) }),
    /* @__PURE__ */ n.jsx(
      U,
      {
        value: v,
        height: "200px",
        extensions: [L()],
        onChange: $,
        editable: !e,
        basicSetup: { lineNumbers: !0, foldGutter: !0 }
      }
    ),
    O && /* @__PURE__ */ n.jsx("div", { className: "ant-form-item-additional", children: /* @__PURE__ */ n.jsx("div", { className: "ant-form-item-explain ant-form-item-explain-connected", children: /* @__PURE__ */ n.jsx("div", { className: "ant-form-item-explain-error", children: /* @__PURE__ */ n.jsx("div", { id: "root_args__error", children: /* @__PURE__ */ n.jsx("div", { children: O }) }) }) }) })
  ] });
}
const k = (t) => {
  const { schema: s, value: l, onChange: r } = t, e = s["x-data-source"], { data: i, loading: a } = D(async () => {
    switch (e.type) {
      case "toolsets":
        return (await W.system.listToolSets({
          current: 1,
          page_size: 1e3
        })).data.map((o) => ({ label: o[e.label_key] || o.name, value: o[e.value_key] || o.id }));
      case "api":
        return e.url.startsWith("/") ? (await q(e.url, {
          method: e.method,
          params: e.params
        })).data.map((o) => ({ label: o[e.label_key], value: o[e.value_key] })) : (await P(e.url, {
          params: e.params,
          method: e.method
        })).data.map((o) => ({ label: o[e.label_key], value: o[e.value_key] }));
      default:
        return [];
    }
  }, {
    cacheKey: `${e.type}:${e.method}:${e.url}:${JSON.stringify(e.params)}`,
    cacheTime: e.cache_ttl * 1e3,
    staleTime: e.cache_ttl * 1e3
  });
  return /* @__PURE__ */ n.jsx(
    _,
    {
      options: i,
      value: l,
      loading: a,
      onChange: (o) => r == null ? void 0 : r(o),
      style: { width: "100%" }
    }
  );
};
function B(t) {
  const s = t.$defs || t.definitions || {};
  function l(e) {
    if (!e.startsWith("#/$defs/") && !e.startsWith("#/definitions/"))
      return null;
    const i = e.split("/").pop();
    return i ? s[i] : null;
  }
  function r(e) {
    if (!e) return {};
    if (e.$ref) {
      const a = l(e.$ref);
      return r(a);
    }
    const i = {};
    if (Object.keys(e).forEach((a) => {
      a.startsWith("x-ui-") && (i[`ui:${a.slice(5)}`] = e[a]);
    }), e["x-hidden"] && (i["ui:widget"] = "hidden"), e["x-disabled"] && (i["ui:disabled"] = !0), e.type === "object") {
      if (e.properties)
        for (const [a, o] of Object.entries(e.properties)) {
          const c = r(o);
          Object.keys(c).length > 0 && (i[a] = c);
        }
      e.dependencies && Object.keys(e.dependencies).forEach((a) => {
        const o = e.dependencies[a];
        o.properties ? Object.keys(o.properties).forEach((c) => {
          const u = r(o.properties[c]);
          Object.keys(u).length > 0 && (i[a] = u);
        }) : o.oneOf && o.oneOf.forEach((c) => {
          c.properties && Object.keys(c.properties).forEach((u) => {
            const f = r(c.properties[u]);
            i[u] = f;
          });
        });
      });
    }
    return e.type === "array" && e.items && (i.items = r(e.items)), e.oneOf && (i["ui:options"] = {
      ...i["ui:options"] || {},
      oneOf: e.oneOf.map((a) => r(a))
    }), e.anyOf && (i["ui:options"] = {
      ...i["ui:options"] || {},
      anyOf: e.anyOf.map((a) => r(a))
    }), e.allOf && (i["ui:options"] = {
      ...i["ui:options"] || {},
      allOf: e.allOf.map((a) => r(a))
    }), i;
  }
  if (t.$ref) {
    const e = l(t.$ref);
    return r(e);
  }
  return r(t);
}
const K = ({
  schema: t,
  value: s,
  onChange: l,
  uiSchema: r,
  disabled: e = !1,
  formRef: i
}) => {
  const { styles: a } = M(), o = s ?? {};
  C(i, () => ({
    validate: (f) => {
      const h = N.validateFormData(f, t, void 0, void 0, u);
      return h.errors.filter((v) => v.message !== "must NOT have additional properties").length > 0 ? Promise.reject(h.errors[0].message) : Promise.resolve();
    }
  }));
  const c = j(
    ({ formData: f }) => {
      l == null || l(f ?? {});
    },
    [l]
  ), u = F.useMemo(() => t ? {
    ...B(t) || {},
    ...r || {}
  } : {}, [t, r]);
  return /* @__PURE__ */ n.jsx(
    J,
    {
      tagName: "div",
      className: V(a.jsonSchemaForm, "json-schema-config-form"),
      schema: t || {},
      formData: o,
      onChange: c,
      validator: N,
      uiSchema: u || {},
      disabled: e,
      showErrorList: !1,
      liveValidate: "onChange",
      autoComplete: "off",
      fields: {
        objectEditor: H
      },
      transformErrors: (f) => f.filter((h) => h.message !== "must NOT have additional properties"),
      widgets: {
        remoteSelect: k,
        toolsetsSelect: G
      }
    }
  );
}, ce = ({ schema: t, uiSchema: s, ...l }) => {
  const r = g(null);
  return /* @__PURE__ */ n.jsx(
    A.Item,
    {
      noStyle: !0,
      ...l,
      rules: [{
        validator: (e, i) => {
          var a;
          return (a = r.current) == null ? void 0 : a.validate(i);
        },
        message: ""
      }],
      children: /* @__PURE__ */ n.jsx(K, { schema: t, formRef: r, uiSchema: s })
    }
  );
};
export {
  K as JsonSchemaConfigForm,
  ce as JsonSchemaConfigFormItem,
  B as buildUiSchema,
  K as default
};
