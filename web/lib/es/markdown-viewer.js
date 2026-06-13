import { j as i } from "./vendor.js";
import { XMarkdown as a } from "@ant-design/x-markdown";
import { Mermaid as d, CodeHighlighter as c } from "@ant-design/x";
/* empty css             */
import f from "classnames";
import { useThemeMode as l } from "antd-style";
const p = (m) => {
  var t;
  const { className: r, children: o } = m, e = ((t = r == null ? void 0 : r.match(/language-(\w+)/)) == null ? void 0 : t[1]) || "";
  return typeof o != "string" ? null : e === "mermaid" ? /* @__PURE__ */ i.jsx(d, { children: o }) : /* @__PURE__ */ i.jsx(c, { lang: e, children: o });
}, j = ({
  content: m,
  className: r,
  style: o,
  paragraphTag: e = "div",
  rootClassName: t,
  components: n = { code: p }
}) => {
  const { isDarkMode: s } = l();
  return /* @__PURE__ */ i.jsx(
    a,
    {
      content: m,
      className: f(r, s ? "x-markdown-dark" : "x-markdown-light"),
      style: o,
      components: n,
      paragraphTag: e,
      rootClassName: t
    }
  );
};
export {
  p as Code,
  j as default
};
