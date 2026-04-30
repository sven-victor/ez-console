import { j as n } from "./vendor.js";
import F, { useImperativeHandle as C, useCallback as v, useRef as g, useState as S, useEffect as I } from "react";
import J from "@rjsf/antd";
import E from "@rjsf/validator-ajv8";
import { createStyles as T } from "antd-style";
import { useRequest as D } from "ahooks";
import { a as W } from "./index.js";
import { r as q } from "./client.js";
import { Form as P, Select as _ } from "antd";
import U from "axios";
import L from "@uiw/react-codemirror";
import { json as V } from "@codemirror/lang-json";
import z from "classnames";
const A = 2, M = T(({ css: t }) => ({
  jsonSchemaForm: t`
      .ant-form-item-control-input-content>#root {
        border-width: 0;
        padding: 0px;
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
      }
      .ant-form-item-additional:has(>.ant-form-item-explain){
        >.ant-form-item-extra{
          display: none;
        }
      }
    `
})), G = (t) => {
  var o;
  return /* @__PURE__ */ n.jsx(
    k,
    {
      ...t,
      schema: {
        ...t.schema || {},
        "x-data-source": {
          ...((o = t.schema) == null ? void 0 : o["x-data-source"]) || {},
          type: "toolsets"
        }
      }
    }
  );
};
function j(t) {
  if (t == null)
    return "";
  try {
    return JSON.stringify(t, null, A);
  } catch {
    return "";
  }
}
function N(t) {
  const o = t.trim();
  if (o !== "")
    try {
      return JSON.parse(o);
    } catch {
      return;
    }
}
function H(t) {
  const { formData: o, schema: c, onChange: r, disabled: e, id: i, required: a, name: s, fieldPathId: l } = t, u = Array.isArray(c.examples) ? c.examples : [], f = g(void 0), p = g(!1), [y, x] = S(() => j(o)), [O, h] = S(null);
  I(() => {
    if (p.current) {
      p.current = !1;
      return;
    }
    f.current !== o && (f.current = o, x(j(o)), h(null));
  }, [o]);
  const $ = v(
    (m) => {
      x(m);
      const d = N(m);
      if (d === void 0 && m.trim() !== "") {
        h("Invalid JSON");
        return;
      }
      h(null), f.current = d, p.current = !0, r(d, l.path);
    },
    [r, l]
  ), w = v(
    (m) => {
      const d = u[m];
      if (d === void 0) return;
      const b = typeof d == "string" ? N(d) : d, R = j(b);
      x(R), h(null), f.current = b, p.current = !0, r(b, l.path);
    },
    [r, u, l]
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
    /* @__PURE__ */ n.jsx("div", { className: "ant-form-item-label", children: /* @__PURE__ */ n.jsx("label", { className: a ? "ant-form-item-required" : "ant-form-item-optional", children: s }) }),
    /* @__PURE__ */ n.jsx(
      L,
      {
        value: y,
        height: "200px",
        extensions: [V()],
        onChange: $,
        editable: !e,
        basicSetup: { lineNumbers: !0, foldGutter: !0 }
      }
    ),
    O && /* @__PURE__ */ n.jsx("div", { className: "ant-form-item-additional", children: /* @__PURE__ */ n.jsx("div", { className: "ant-form-item-explain ant-form-item-explain-connected", children: /* @__PURE__ */ n.jsx("div", { className: "ant-form-item-explain-error", children: /* @__PURE__ */ n.jsx("div", { id: "root_args__error", children: /* @__PURE__ */ n.jsx("div", { children: O }) }) }) }) })
  ] });
}
const k = (t) => {
  const { schema: o, value: c, onChange: r } = t, e = o["x-data-source"], { data: i, loading: a } = D(async () => {
    switch (e.type) {
      case "toolsets":
        return (await W.system.listToolSets({
          current: 1,
          page_size: 1e3
        })).data.map((s) => ({ label: s[e.label_key || "name"], value: s[e.value_key || "id"] }));
      case "api":
        return e.url.startsWith("/") ? (await q(e.url, {
          method: e.method,
          params: e.params
        })).data.map((s) => ({ label: s[e.label_key], value: s[e.value_key] })) : (await U(e.url, {
          params: e.params,
          method: e.method
        })).data.map((s) => ({ label: s[e.label_key], value: s[e.value_key] }));
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
      value: c,
      loading: a,
      onChange: (s) => r == null ? void 0 : r(s),
      style: { width: "100%" }
    }
  );
};
function B(t) {
  const o = t.$defs || t.definitions || {};
  function c(e) {
    if (!e.startsWith("#/$defs/") && !e.startsWith("#/definitions/"))
      return null;
    const i = e.split("/").pop();
    return i ? o[i] : null;
  }
  function r(e) {
    if (!e) return {};
    if (e.$ref) {
      const a = c(e.$ref);
      return r(a);
    }
    const i = {};
    if (Object.keys(e).forEach((a) => {
      a.startsWith("x-ui-") && (i[`ui:${a.slice(5)}`] = e[a]);
    }), e["x-hidden"] && (i["ui:widget"] = "hidden"), e["x-disabled"] && (i["ui:disabled"] = !0), e.type === "object") {
      if (e.properties)
        for (const [a, s] of Object.entries(e.properties)) {
          const l = r(s);
          Object.keys(l).length > 0 && (i[a] = l);
        }
      e.dependencies && Object.keys(e.dependencies).forEach((a) => {
        const s = e.dependencies[a];
        s.properties ? Object.keys(s.properties).forEach((l) => {
          const u = r(s.properties[l]);
          Object.keys(u).length > 0 && (i[a] = u);
        }) : s.oneOf && s.oneOf.forEach((l) => {
          l.properties && Object.keys(l.properties).forEach((u) => {
            const f = r(l.properties[u]);
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
    const e = c(t.$ref);
    return r(e);
  }
  return r(t);
}
const K = ({
  schema: t,
  value: o,
  onChange: c,
  uiSchema: r,
  disabled: e = !1,
  formRef: i
}) => {
  const { styles: a } = M(), s = o ?? {};
  C(i, () => ({
    validate: (f) => {
      const p = E.validateFormData(f, t, void 0, void 0, u);
      return p.errors.filter((y) => y.message !== "must NOT have additional properties").length > 0 ? Promise.reject(p.errors[0].message) : Promise.resolve();
    }
  }));
  const l = v(
    ({ formData: f }) => {
      c == null || c(f ?? {});
    },
    [c]
  ), u = F.useMemo(() => t ? {
    ...B(t) || {},
    ...r || {}
  } : {}, [t, r]);
  return /* @__PURE__ */ n.jsx(
    J,
    {
      className: z(a.jsonSchemaForm, "json-schema-config-form"),
      schema: t || {},
      formData: s,
      onChange: l,
      validator: E,
      uiSchema: u || {},
      disabled: e,
      showErrorList: !1,
      liveValidate: "onChange",
      autoComplete: "off",
      fields: {
        objectEditor: H
      },
      transformErrors: (f) => f.filter((p) => p.message !== "must NOT have additional properties"),
      widgets: {
        remoteSelect: k,
        toolsetsSelect: G
      }
    }
  );
}, ce = ({ schema: t, uiSchema: o, ...c }) => {
  const r = g(null);
  return /* @__PURE__ */ n.jsx(
    P.Item,
    {
      noStyle: !0,
      ...c,
      rules: [{
        validator: (e, i) => {
          var a;
          return (a = r.current) == null ? void 0 : a.validate(i);
        },
        message: ""
      }],
      children: /* @__PURE__ */ n.jsx(K, { schema: t, formRef: r, uiSchema: o })
    }
  );
};
export {
  K as JsonSchemaConfigForm,
  ce as JsonSchemaConfigFormItem,
  B as buildUiSchema,
  K as default
};
