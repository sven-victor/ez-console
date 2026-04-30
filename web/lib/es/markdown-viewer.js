import { j as s } from "./vendor.js";
import n from "react";
import { XMarkdown as d } from "@ant-design/x-markdown";
import { Mermaid as c, CodeHighlighter as u } from "@ant-design/x";
import { theme as l } from "antd";
/* empty css             */
import f from "classnames";
const h = (e) => {
  var m;
  const { className: r, children: t } = e, o = ((m = r == null ? void 0 : r.match(/language-(\w+)/)) == null ? void 0 : m[1]) || "";
  return typeof t != "string" ? null : o === "mermaid" ? /* @__PURE__ */ s.jsx(c, { children: t }) : /* @__PURE__ */ s.jsx(u, { lang: o, children: t });
}, p = () => {
  const e = l.useToken(), r = n.useMemo(() => {
    var o;
    return ((o = e == null ? void 0 : e.theme) == null ? void 0 : o.id) === 0;
  }, [e]);
  return [n.useMemo(() => r ? "x-markdown-light" : "x-markdown-dark", [r])];
}, C = ({
  content: e,
  className: r,
  style: t,
  paragraphTag: o = "div",
  rootClassName: m,
  components: a = { code: h }
}) => {
  const [i] = p();
  return /* @__PURE__ */ s.jsx(
    d,
    {
      content: e,
      className: f(r, i),
      style: t,
      components: a,
      paragraphTag: o,
      rootClassName: m
    }
  );
};
export {
  h as Code,
  C as default,
  p as useMarkdownTheme
};
