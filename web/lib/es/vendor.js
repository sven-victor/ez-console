var Af = Object.defineProperty;
var Df = (e, t, r) => t in e ? Af(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var vt = (e, t, r) => Df(e, typeof t != "symbol" ? t + "" : t, r);
import * as _ from "react";
import O, { Component as Tf, useRef as He, cloneElement as Rf, forwardRef as Yo, useState as Ya, useImperativeHandle as Go, useEffect as wt, isValidElement as Pf, version as Of, createContext as Ko, useContext as Bt, useMemo as Mf, useLayoutEffect as If, memo as Nf } from "react";
import ee from "classnames";
import { CloseOutlined as jf, ClearOutlined as Lf, ArrowUpOutlined as zf, AudioMutedOutlined as Bf, AudioOutlined as Vf, EllipsisOutlined as Hf } from "@ant-design/icons";
import { ConfigProvider as qf, theme as Ga, Button as kc, Input as Wf, Flex as Uf, Avatar as Yf, Typography as Ac, Dropdown as Gf } from "antd";
import Ii from "react-dom";
var Ka = { exports: {} }, Gr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ni;
function Kf() {
  if (Ni) return Gr;
  Ni = 1;
  var e = O, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, u = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(i, s, c) {
    var l, d = {}, f = null, v = null;
    c !== void 0 && (f = "" + c), s.key !== void 0 && (f = "" + s.key), s.ref !== void 0 && (v = s.ref);
    for (l in s) n.call(s, l) && !a.hasOwnProperty(l) && (d[l] = s[l]);
    if (i && i.defaultProps) for (l in s = i.defaultProps, s) d[l] === void 0 && (d[l] = s[l]);
    return { $$typeof: t, type: i, key: f, ref: v, props: d, _owner: u.current };
  }
  return Gr.Fragment = r, Gr.jsx = o, Gr.jsxs = o, Gr;
}
var Kr = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ji;
function Xf() {
  return ji || (ji = 1, process.env.NODE_ENV !== "production" && function() {
    var e = O, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), i = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), h = Symbol.iterator, g = "@@iterator";
    function p(x) {
      if (x === null || typeof x != "object")
        return null;
      var z = h && x[h] || x[g];
      return typeof z == "function" ? z : null;
    }
    var C = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function m(x) {
      {
        for (var z = arguments.length, W = new Array(z > 1 ? z - 1 : 0), Q = 1; Q < z; Q++)
          W[Q - 1] = arguments[Q];
        y("error", x, W);
      }
    }
    function y(x, z, W) {
      {
        var Q = C.ReactDebugCurrentFrame, be = Q.getStackAddendum();
        be !== "" && (z += "%s", W = W.concat([be]));
        var _e = W.map(function(de) {
          return String(de);
        });
        _e.unshift("Warning: " + z), Function.prototype.apply.call(console[x], console, _e);
      }
    }
    var E = !1, b = !1, w = !1, S = !1, R = !1, k;
    k = Symbol.for("react.module.reference");
    function T(x) {
      return !!(typeof x == "string" || typeof x == "function" || x === n || x === a || R || x === u || x === c || x === l || S || x === v || E || b || w || typeof x == "object" && x !== null && (x.$$typeof === f || x.$$typeof === d || x.$$typeof === o || x.$$typeof === i || x.$$typeof === s || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      x.$$typeof === k || x.getModuleId !== void 0));
    }
    function I(x, z, W) {
      var Q = x.displayName;
      if (Q)
        return Q;
      var be = z.displayName || z.name || "";
      return be !== "" ? W + "(" + be + ")" : W;
    }
    function j(x) {
      return x.displayName || "Context";
    }
    function P(x) {
      if (x == null)
        return null;
      if (typeof x.tag == "number" && m("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof x == "function")
        return x.displayName || x.name || null;
      if (typeof x == "string")
        return x;
      switch (x) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case a:
          return "Profiler";
        case u:
          return "StrictMode";
        case c:
          return "Suspense";
        case l:
          return "SuspenseList";
      }
      if (typeof x == "object")
        switch (x.$$typeof) {
          case i:
            var z = x;
            return j(z) + ".Consumer";
          case o:
            var W = x;
            return j(W._context) + ".Provider";
          case s:
            return I(x, x.render, "ForwardRef");
          case d:
            var Q = x.displayName || null;
            return Q !== null ? Q : P(x.type) || "Memo";
          case f: {
            var be = x, _e = be._payload, de = be._init;
            try {
              return P(de(_e));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var M = Object.assign, L = 0, $, A, D, B, V, H, q;
    function Y() {
    }
    Y.__reactDisabledLog = !0;
    function G() {
      {
        if (L === 0) {
          $ = console.log, A = console.info, D = console.warn, B = console.error, V = console.group, H = console.groupCollapsed, q = console.groupEnd;
          var x = {
            configurable: !0,
            enumerable: !0,
            value: Y,
            writable: !0
          };
          Object.defineProperties(console, {
            info: x,
            log: x,
            warn: x,
            error: x,
            group: x,
            groupCollapsed: x,
            groupEnd: x
          });
        }
        L++;
      }
    }
    function K() {
      {
        if (L--, L === 0) {
          var x = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: M({}, x, {
              value: $
            }),
            info: M({}, x, {
              value: A
            }),
            warn: M({}, x, {
              value: D
            }),
            error: M({}, x, {
              value: B
            }),
            group: M({}, x, {
              value: V
            }),
            groupCollapsed: M({}, x, {
              value: H
            }),
            groupEnd: M({}, x, {
              value: q
            })
          });
        }
        L < 0 && m("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var X = C.ReactCurrentDispatcher, te;
    function ue(x, z, W) {
      {
        if (te === void 0)
          try {
            throw Error();
          } catch (be) {
            var Q = be.stack.trim().match(/\n( *(at )?)/);
            te = Q && Q[1] || "";
          }
        return `
` + te + x;
      }
    }
    var pe = !1, le;
    {
      var ke = typeof WeakMap == "function" ? WeakMap : Map;
      le = new ke();
    }
    function Ae(x, z) {
      if (!x || pe)
        return "";
      {
        var W = le.get(x);
        if (W !== void 0)
          return W;
      }
      var Q;
      pe = !0;
      var be = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _e;
      _e = X.current, X.current = null, G();
      try {
        if (z) {
          var de = function() {
            throw Error();
          };
          if (Object.defineProperty(de.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(de, []);
            } catch (tt) {
              Q = tt;
            }
            Reflect.construct(x, [], de);
          } else {
            try {
              de.call();
            } catch (tt) {
              Q = tt;
            }
            x.call(de.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (tt) {
            Q = tt;
          }
          x();
        }
      } catch (tt) {
        if (tt && Q && typeof tt.stack == "string") {
          for (var se = tt.stack.split(`
`), Je = Q.stack.split(`
`), Me = se.length - 1, Le = Je.length - 1; Me >= 1 && Le >= 0 && se[Me] !== Je[Le]; )
            Le--;
          for (; Me >= 1 && Le >= 0; Me--, Le--)
            if (se[Me] !== Je[Le]) {
              if (Me !== 1 || Le !== 1)
                do
                  if (Me--, Le--, Le < 0 || se[Me] !== Je[Le]) {
                    var ze = `
` + se[Me].replace(" at new ", " at ");
                    return x.displayName && ze.includes("<anonymous>") && (ze = ze.replace("<anonymous>", x.displayName)), typeof x == "function" && le.set(x, ze), ze;
                  }
                while (Me >= 1 && Le >= 0);
              break;
            }
        }
      } finally {
        pe = !1, X.current = _e, K(), Error.prepareStackTrace = be;
      }
      var mr = x ? x.displayName || x.name : "", ur = mr ? ue(mr) : "";
      return typeof x == "function" && le.set(x, ur), ur;
    }
    function Ne(x, z, W) {
      return Ae(x, !1);
    }
    function U(x) {
      var z = x.prototype;
      return !!(z && z.isReactComponent);
    }
    function ye(x, z, W) {
      if (x == null)
        return "";
      if (typeof x == "function")
        return Ae(x, U(x));
      if (typeof x == "string")
        return ue(x);
      switch (x) {
        case c:
          return ue("Suspense");
        case l:
          return ue("SuspenseList");
      }
      if (typeof x == "object")
        switch (x.$$typeof) {
          case s:
            return Ne(x.render);
          case d:
            return ye(x.type, z, W);
          case f: {
            var Q = x, be = Q._payload, _e = Q._init;
            try {
              return ye(_e(be), z, W);
            } catch {
            }
          }
        }
      return "";
    }
    var J = Object.prototype.hasOwnProperty, ie = {}, Pe = C.ReactDebugCurrentFrame;
    function fe(x) {
      if (x) {
        var z = x._owner, W = ye(x.type, x._source, z ? z.type : null);
        Pe.setExtraStackFrame(W);
      } else
        Pe.setExtraStackFrame(null);
    }
    function Be(x, z, W, Q, be) {
      {
        var _e = Function.call.bind(J);
        for (var de in x)
          if (_e(x, de)) {
            var se = void 0;
            try {
              if (typeof x[de] != "function") {
                var Je = Error((Q || "React class") + ": " + W + " type `" + de + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof x[de] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Je.name = "Invariant Violation", Je;
              }
              se = x[de](z, de, Q, W, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Me) {
              se = Me;
            }
            se && !(se instanceof Error) && (fe(be), m("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Q || "React class", W, de, typeof se), fe(null)), se instanceof Error && !(se.message in ie) && (ie[se.message] = !0, fe(be), m("Failed %s type: %s", W, se.message), fe(null));
          }
      }
    }
    var Re = Array.isArray;
    function we(x) {
      return Re(x);
    }
    function ae(x) {
      {
        var z = typeof Symbol == "function" && Symbol.toStringTag, W = z && x[Symbol.toStringTag] || x.constructor.name || "Object";
        return W;
      }
    }
    function oe(x) {
      try {
        return ge(x), !1;
      } catch {
        return !0;
      }
    }
    function ge(x) {
      return "" + x;
    }
    function he(x) {
      if (oe(x))
        return m("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ae(x)), ge(x);
    }
    var xe = C.ReactCurrentOwner, Ue = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, mt, Tt;
    function Vr(x) {
      if (J.call(x, "ref")) {
        var z = Object.getOwnPropertyDescriptor(x, "ref").get;
        if (z && z.isReactWarning)
          return !1;
      }
      return x.ref !== void 0;
    }
    function Hr(x) {
      if (J.call(x, "key")) {
        var z = Object.getOwnPropertyDescriptor(x, "key").get;
        if (z && z.isReactWarning)
          return !1;
      }
      return x.key !== void 0;
    }
    function Oe(x, z) {
      typeof x.ref == "string" && xe.current;
    }
    function ve(x, z) {
      {
        var W = function() {
          mt || (mt = !0, m("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", z));
        };
        W.isReactWarning = !0, Object.defineProperty(x, "key", {
          get: W,
          configurable: !0
        });
      }
    }
    function gt(x, z) {
      {
        var W = function() {
          Tt || (Tt = !0, m("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", z));
        };
        W.isReactWarning = !0, Object.defineProperty(x, "ref", {
          get: W,
          configurable: !0
        });
      }
    }
    var qt = function(x, z, W, Q, be, _e, de) {
      var se = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: x,
        key: z,
        ref: W,
        props: de,
        // Record the component responsible for creating this element.
        _owner: _e
      };
      return se._store = {}, Object.defineProperty(se._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(se, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Q
      }), Object.defineProperty(se, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: be
      }), Object.freeze && (Object.freeze(se.props), Object.freeze(se)), se;
    };
    function ba(x, z, W, Q, be) {
      {
        var _e, de = {}, se = null, Je = null;
        W !== void 0 && (he(W), se = "" + W), Hr(z) && (he(z.key), se = "" + z.key), Vr(z) && (Je = z.ref, Oe(z, be));
        for (_e in z)
          J.call(z, _e) && !Ue.hasOwnProperty(_e) && (de[_e] = z[_e]);
        if (x && x.defaultProps) {
          var Me = x.defaultProps;
          for (_e in Me)
            de[_e] === void 0 && (de[_e] = Me[_e]);
        }
        if (se || Je) {
          var Le = typeof x == "function" ? x.displayName || x.name || "Unknown" : x;
          se && ve(de, Le), Je && gt(de, Le);
        }
        return qt(x, se, Je, be, Q, xe.current, de);
      }
    }
    var qr = C.ReactCurrentOwner, Hn = C.ReactDebugCurrentFrame;
    function Wt(x) {
      if (x) {
        var z = x._owner, W = ye(x.type, x._source, z ? z.type : null);
        Hn.setExtraStackFrame(W);
      } else
        Hn.setExtraStackFrame(null);
    }
    var Wr;
    Wr = !1;
    function Ur(x) {
      return typeof x == "object" && x !== null && x.$$typeof === t;
    }
    function qn() {
      {
        if (qr.current) {
          var x = P(qr.current.type);
          if (x)
            return `

Check the render method of \`` + x + "`.";
        }
        return "";
      }
    }
    function Wn(x) {
      return "";
    }
    var rr = {};
    function hr(x) {
      {
        var z = qn();
        if (!z) {
          var W = typeof x == "string" ? x : x.displayName || x.name;
          W && (z = `

Check the top-level render call using <` + W + ">.");
        }
        return z;
      }
    }
    function nr(x, z) {
      {
        if (!x._store || x._store.validated || x.key != null)
          return;
        x._store.validated = !0;
        var W = hr(z);
        if (rr[W])
          return;
        rr[W] = !0;
        var Q = "";
        x && x._owner && x._owner !== qr.current && (Q = " It was passed a child from " + P(x._owner.type) + "."), Wt(x), m('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', W, Q), Wt(null);
      }
    }
    function pr(x, z) {
      {
        if (typeof x != "object")
          return;
        if (we(x))
          for (var W = 0; W < x.length; W++) {
            var Q = x[W];
            Ur(Q) && nr(Q, z);
          }
        else if (Ur(x))
          x._store && (x._store.validated = !0);
        else if (x) {
          var be = p(x);
          if (typeof be == "function" && be !== x.entries)
            for (var _e = be.call(x), de; !(de = _e.next()).done; )
              Ur(de.value) && nr(de.value, z);
        }
      }
    }
    function Ut(x) {
      {
        var z = x.type;
        if (z == null || typeof z == "string")
          return;
        var W;
        if (typeof z == "function")
          W = z.propTypes;
        else if (typeof z == "object" && (z.$$typeof === s || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        z.$$typeof === d))
          W = z.propTypes;
        else
          return;
        if (W) {
          var Q = P(z);
          Be(W, x.props, "prop", Q, x);
        } else if (z.PropTypes !== void 0 && !Wr) {
          Wr = !0;
          var be = P(z);
          m("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", be || "Unknown");
        }
        typeof z.getDefaultProps == "function" && !z.getDefaultProps.isReactClassApproved && m("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Yt(x) {
      {
        for (var z = Object.keys(x.props), W = 0; W < z.length; W++) {
          var Q = z[W];
          if (Q !== "children" && Q !== "key") {
            Wt(x), m("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Q), Wt(null);
            break;
          }
        }
        x.ref !== null && (Wt(x), m("Invalid attribute `ref` supplied to `React.Fragment`."), Wt(null));
      }
    }
    var Yr = {};
    function Un(x, z, W, Q, be, _e) {
      {
        var de = T(x);
        if (!de) {
          var se = "";
          (x === void 0 || typeof x == "object" && x !== null && Object.keys(x).length === 0) && (se += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Je = Wn();
          Je ? se += Je : se += qn();
          var Me;
          x === null ? Me = "null" : we(x) ? Me = "array" : x !== void 0 && x.$$typeof === t ? (Me = "<" + (P(x.type) || "Unknown") + " />", se = " Did you accidentally export a JSX literal instead of a component?") : Me = typeof x, m("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Me, se);
        }
        var Le = ba(x, z, W, be, _e);
        if (Le == null)
          return Le;
        if (de) {
          var ze = z.children;
          if (ze !== void 0)
            if (Q)
              if (we(ze)) {
                for (var mr = 0; mr < ze.length; mr++)
                  pr(ze[mr], x);
                Object.freeze && Object.freeze(ze);
              } else
                m("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              pr(ze, x);
        }
        if (J.call(z, "key")) {
          var ur = P(x), tt = Object.keys(z).filter(function(kf) {
            return kf !== "key";
          }), xa = tt.length > 0 ? "{key: someKey, " + tt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Yr[ur + xa]) {
            var Ff = tt.length > 0 ? "{" + tt.join(": ..., ") + ": ...}" : "{}";
            m(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, xa, ur, Ff, ur), Yr[ur + xa] = !0;
          }
        }
        return x === n ? Yt(Le) : Ut(Le), Le;
      }
    }
    function Ye(x, z, W) {
      return Un(x, z, W, !0);
    }
    function Yn(x, z, W) {
      return Un(x, z, W, !1);
    }
    var ya = Yn, je = Ye;
    Kr.Fragment = n, Kr.jsx = ya, Kr.jsxs = je;
  }()), Kr;
}
process.env.NODE_ENV === "production" ? Ka.exports = Kf() : Ka.exports = Xf();
var E3 = Ka.exports, Xo = {}, Dc = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Dc);
var Fe = Dc.exports, ku = {};
Object.defineProperty(ku, "__esModule", {
  value: !0
});
ku.default = void 0;
var Zf = {
  // Options
  items_per_page: "条/页",
  jump_to: "跳至",
  jump_to_confirm: "确定",
  page: "页",
  // Pagination
  prev_page: "上一页",
  next_page: "下一页",
  prev_5: "向前 5 页",
  next_5: "向后 5 页",
  prev_3: "向前 3 页",
  next_3: "向后 3 页",
  page_size: "页码"
};
ku.default = Zf;
var Au = {}, Cn = {}, Du = {}, Tc = { exports: {} }, Rc = { exports: {} }, Pc = { exports: {} }, Oc = { exports: {} };
(function(e) {
  function t(r) {
    "@babel/helpers - typeof";
    return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
      return typeof n;
    } : function(n) {
      return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(r);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Oc);
var Mc = Oc.exports, Ic = { exports: {} };
(function(e) {
  var t = Mc.default;
  function r(n, u) {
    if (t(n) != "object" || !n) return n;
    var a = n[Symbol.toPrimitive];
    if (a !== void 0) {
      var o = a.call(n, u || "default");
      if (t(o) != "object") return o;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (u === "string" ? String : Number)(n);
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ic);
var Jf = Ic.exports;
(function(e) {
  var t = Mc.default, r = Jf;
  function n(u) {
    var a = r(u, "string");
    return t(a) == "symbol" ? a : a + "";
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Pc);
var Qf = Pc.exports;
(function(e) {
  var t = Qf;
  function r(n, u, a) {
    return (u = t(u)) in n ? Object.defineProperty(n, u, {
      value: a,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : n[u] = a, n;
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Rc);
var e0 = Rc.exports;
(function(e) {
  var t = e0;
  function r(u, a) {
    var o = Object.keys(u);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(u);
      a && (i = i.filter(function(s) {
        return Object.getOwnPropertyDescriptor(u, s).enumerable;
      })), o.push.apply(o, i);
    }
    return o;
  }
  function n(u) {
    for (var a = 1; a < arguments.length; a++) {
      var o = arguments[a] != null ? arguments[a] : {};
      a % 2 ? r(Object(o), !0).forEach(function(i) {
        t(u, i, o[i]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(o)) : r(Object(o)).forEach(function(i) {
        Object.defineProperty(u, i, Object.getOwnPropertyDescriptor(o, i));
      });
    }
    return u;
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Tc);
var lr = Tc.exports, Mt = {};
Object.defineProperty(Mt, "__esModule", {
  value: !0
});
Mt.commonLocale = void 0;
Mt.commonLocale = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: !0
};
var t0 = Fe.default;
Object.defineProperty(Du, "__esModule", {
  value: !0
});
Du.default = void 0;
var Li = t0(lr), r0 = Mt, n0 = (0, Li.default)((0, Li.default)({}, r0.commonLocale), {}, {
  locale: "zh_CN",
  today: "今天",
  now: "此刻",
  backToToday: "返回今天",
  ok: "确定",
  timeSelect: "选择时间",
  dateSelect: "选择日期",
  weekSelect: "选择周",
  clear: "清除",
  week: "周",
  month: "月",
  year: "年",
  previousMonth: "上个月 (翻页上键)",
  nextMonth: "下个月 (翻页下键)",
  monthSelect: "选择月份",
  yearSelect: "选择年份",
  decadeSelect: "选择年代",
  previousYear: "上一年 (Control键加左方向键)",
  nextYear: "下一年 (Control键加右方向键)",
  previousDecade: "上一年代",
  nextDecade: "下一年代",
  previousCentury: "上一世纪",
  nextCentury: "下一世纪",
  yearFormat: "YYYY年",
  cellDateFormat: "D",
  monthBeforeYear: !1
});
Du.default = n0;
var En = {};
Object.defineProperty(En, "__esModule", {
  value: !0
});
En.default = void 0;
const u0 = {
  placeholder: "请选择时间",
  rangePlaceholder: ["开始时间", "结束时间"]
};
En.default = u0;
var Nc = Fe.default;
Object.defineProperty(Cn, "__esModule", {
  value: !0
});
Cn.default = void 0;
var a0 = Nc(Du), o0 = Nc(En);
const jc = {
  lang: Object.assign({
    placeholder: "请选择日期",
    yearPlaceholder: "请选择年份",
    quarterPlaceholder: "请选择季度",
    monthPlaceholder: "请选择月份",
    weekPlaceholder: "请选择周",
    rangePlaceholder: ["开始日期", "结束日期"],
    rangeYearPlaceholder: ["开始年份", "结束年份"],
    rangeMonthPlaceholder: ["开始月份", "结束月份"],
    rangeQuarterPlaceholder: ["开始季度", "结束季度"],
    rangeWeekPlaceholder: ["开始周", "结束周"]
  }, a0.default),
  timePickerLocale: Object.assign({}, o0.default)
};
jc.lang.ok = "确定";
Cn.default = jc;
var i0 = Fe.default;
Object.defineProperty(Au, "__esModule", {
  value: !0
});
Au.default = void 0;
var s0 = i0(Cn);
Au.default = s0.default;
var Tu = Fe.default;
Object.defineProperty(Xo, "__esModule", {
  value: !0
});
var c0 = Xo.default = void 0, l0 = Tu(ku), d0 = Tu(Au), f0 = Tu(Cn), h0 = Tu(En);
const nt = "${label}不是一个有效的${type}", p0 = {
  locale: "zh-cn",
  Pagination: l0.default,
  DatePicker: f0.default,
  TimePicker: h0.default,
  Calendar: d0.default,
  // locales for all components
  global: {
    placeholder: "请选择"
  },
  Table: {
    filterTitle: "筛选",
    filterConfirm: "确定",
    filterReset: "重置",
    filterEmptyText: "无筛选项",
    filterCheckAll: "全选",
    filterSearchPlaceholder: "在筛选项中搜索",
    emptyText: "暂无数据",
    selectAll: "全选当页",
    selectInvert: "反选当页",
    selectNone: "清空所有",
    selectionAll: "全选所有",
    sortTitle: "排序",
    expand: "展开行",
    collapse: "关闭行",
    triggerDesc: "点击降序",
    triggerAsc: "点击升序",
    cancelSort: "取消排序"
  },
  Modal: {
    okText: "确定",
    cancelText: "取消",
    justOkText: "知道了"
  },
  Tour: {
    Next: "下一步",
    Previous: "上一步",
    Finish: "结束导览"
  },
  Popconfirm: {
    cancelText: "取消",
    okText: "确定"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "请输入搜索内容",
    itemUnit: "项",
    itemsUnit: "项",
    remove: "删除",
    selectCurrent: "全选当页",
    removeCurrent: "删除当页",
    selectAll: "全选所有",
    deselectAll: "取消全选",
    removeAll: "删除全部",
    selectInvert: "反选当页"
  },
  Upload: {
    uploading: "文件上传中",
    removeFile: "删除文件",
    uploadError: "上传错误",
    previewFile: "预览文件",
    downloadFile: "下载文件"
  },
  Empty: {
    description: "暂无数据"
  },
  Icon: {
    icon: "图标"
  },
  Text: {
    edit: "编辑",
    copy: "复制",
    copied: "复制成功",
    expand: "展开",
    collapse: "收起"
  },
  Form: {
    optional: "（可选）",
    defaultValidateMessages: {
      default: "字段验证错误${label}",
      required: "请输入${label}",
      enum: "${label}必须是其中一个[${enum}]",
      whitespace: "${label}不能为空字符",
      date: {
        format: "${label}日期格式无效",
        parse: "${label}不能转换为日期",
        invalid: "${label}是一个无效日期"
      },
      types: {
        string: nt,
        method: nt,
        array: nt,
        object: nt,
        number: nt,
        date: nt,
        boolean: nt,
        integer: nt,
        float: nt,
        regexp: nt,
        email: nt,
        url: nt,
        hex: nt
      },
      string: {
        len: "${label}须为${len}个字符",
        min: "${label}最少${min}个字符",
        max: "${label}最多${max}个字符",
        range: "${label}须在${min}-${max}字符之间"
      },
      number: {
        len: "${label}必须等于${len}",
        min: "${label}最小值为${min}",
        max: "${label}最大值为${max}",
        range: "${label}须在${min}-${max}之间"
      },
      array: {
        len: "须为${len}个${label}",
        min: "最少${min}个${label}",
        max: "最多${max}个${label}",
        range: "${label}数量须在${min}-${max}之间"
      },
      pattern: {
        mismatch: "${label}与模式不匹配${pattern}"
      }
    }
  },
  Image: {
    preview: "预览"
  },
  QRCode: {
    expired: "二维码过期",
    refresh: "点击刷新",
    scanned: "已扫描"
  },
  ColorPicker: {
    presetEmpty: "暂无",
    transparent: "无色",
    singleColor: "单色",
    gradientColor: "渐变色"
  }
};
c0 = Xo.default = p0;
var Zo = {}, Ru = {};
Object.defineProperty(Ru, "__esModule", {
  value: !0
});
Ru.default = void 0;
var m0 = {
  // Options
  items_per_page: "/ page",
  jump_to: "Go to",
  jump_to_confirm: "confirm",
  page: "Page",
  // Pagination
  prev_page: "Previous Page",
  next_page: "Next Page",
  prev_5: "Previous 5 Pages",
  next_5: "Next 5 Pages",
  prev_3: "Previous 3 Pages",
  next_3: "Next 3 Pages",
  page_size: "Page Size"
};
Ru.default = m0;
var Pu = {}, Sn = {}, Ou = {}, g0 = Fe.default;
Object.defineProperty(Ou, "__esModule", {
  value: !0
});
Ou.default = void 0;
var zi = g0(lr), v0 = Mt, b0 = (0, zi.default)((0, zi.default)({}, v0.commonLocale), {}, {
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "OK",
  clear: "Clear",
  week: "Week",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  dateFormat: "M/D/YYYY",
  dateTimeFormat: "M/D/YYYY HH:mm:ss",
  previousMonth: "Previous month (PageUp)",
  nextMonth: "Next month (PageDown)",
  previousYear: "Last year (Control + left)",
  nextYear: "Next year (Control + right)",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century"
});
Ou.default = b0;
var wn = {};
Object.defineProperty(wn, "__esModule", {
  value: !0
});
wn.default = void 0;
const y0 = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
wn.default = y0;
var Lc = Fe.default;
Object.defineProperty(Sn, "__esModule", {
  value: !0
});
Sn.default = void 0;
var x0 = Lc(Ou), _0 = Lc(wn);
const C0 = {
  lang: Object.assign({
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"]
  }, x0.default),
  timePickerLocale: Object.assign({}, _0.default)
};
Sn.default = C0;
var E0 = Fe.default;
Object.defineProperty(Pu, "__esModule", {
  value: !0
});
Pu.default = void 0;
var S0 = E0(Sn);
Pu.default = S0.default;
var Mu = Fe.default;
Object.defineProperty(Zo, "__esModule", {
  value: !0
});
var w0 = Zo.default = void 0, $0 = Mu(Ru), F0 = Mu(Pu), k0 = Mu(Sn), A0 = Mu(wn);
const ut = "${label} is not a valid ${type}", D0 = {
  locale: "en",
  Pagination: $0.default,
  DatePicker: k0.default,
  TimePicker: A0.default,
  Calendar: F0.default,
  global: {
    placeholder: "Please select"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filters",
    filterCheckAll: "Select all items",
    filterSearchPlaceholder: "Search in filters",
    emptyText: "No data",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    selectNone: "Clear all data",
    selectionAll: "Select all data",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row",
    triggerDesc: "Click to sort descending",
    triggerAsc: "Click to sort ascending",
    cancelSort: "Click to cancel sorting"
  },
  Tour: {
    Next: "Next",
    Previous: "Previous",
    Finish: "Finish"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all data",
    deselectAll: "Deselect all data",
    removeAll: "Remove all data",
    selectInvert: "Invert current page"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand",
    collapse: "Collapse"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: ut,
        method: ut,
        array: ut,
        object: ut,
        number: ut,
        date: ut,
        boolean: ut,
        integer: ut,
        float: ut,
        regexp: ut,
        email: ut,
        url: ut,
        hex: ut
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  Image: {
    preview: "Preview"
  },
  QRCode: {
    expired: "QR code expired",
    refresh: "Refresh",
    scanned: "Scanned"
  },
  ColorPicker: {
    presetEmpty: "Empty",
    transparent: "Transparent",
    singleColor: "Single",
    gradientColor: "Gradient"
  }
};
w0 = Zo.default = D0;
var Jo = {}, Iu = {};
Object.defineProperty(Iu, "__esModule", {
  value: !0
});
Iu.default = void 0;
var T0 = {
  // Options
  items_per_page: "/ Seite",
  jump_to: "Gehe zu",
  jump_to_confirm: "bestätigen",
  page: "Seite",
  // Pagination
  prev_page: "Vorherige Seite",
  next_page: "Nächste Seite",
  prev_5: "5 Seiten zurück",
  next_5: "5 Seiten vor",
  prev_3: "3 Seiten zurück",
  next_3: "3 Seiten vor",
  page_size: "Page Size"
};
Iu.default = T0;
var Nu = {}, $n = {}, ju = {}, R0 = Fe.default;
Object.defineProperty(ju, "__esModule", {
  value: !0
});
ju.default = void 0;
var Bi = R0(lr), P0 = Mt, O0 = (0, Bi.default)((0, Bi.default)({}, P0.commonLocale), {}, {
  locale: "de_DE",
  today: "Heute",
  now: "Jetzt",
  backToToday: "Zurück zu Heute",
  ok: "OK",
  clear: "Zurücksetzen",
  week: "Woche",
  month: "Monat",
  year: "Jahr",
  timeSelect: "Zeit wählen",
  dateSelect: "Datum wählen",
  monthSelect: "Wähle einen Monat",
  yearSelect: "Wähle ein Jahr",
  decadeSelect: "Wähle ein Jahrzehnt",
  dateFormat: "D.M.YYYY",
  dateTimeFormat: "D.M.YYYY HH:mm:ss",
  previousMonth: "Vorheriger Monat (PageUp)",
  nextMonth: "Nächster Monat (PageDown)",
  previousYear: "Vorheriges Jahr (Ctrl + left)",
  nextYear: "Nächstes Jahr (Ctrl + right)",
  previousDecade: "Vorheriges Jahrzehnt",
  nextDecade: "Nächstes Jahrzehnt",
  previousCentury: "Vorheriges Jahrhundert",
  nextCentury: "Nächstes Jahrhundert"
});
ju.default = O0;
var Fn = {};
Object.defineProperty(Fn, "__esModule", {
  value: !0
});
Fn.default = void 0;
const M0 = {
  placeholder: "Zeit auswählen",
  rangePlaceholder: ["Startzeit", "Endzeit"]
};
Fn.default = M0;
var zc = Fe.default;
Object.defineProperty($n, "__esModule", {
  value: !0
});
$n.default = void 0;
var I0 = zc(ju), N0 = zc(Fn);
const j0 = {
  lang: Object.assign({
    placeholder: "Datum auswählen",
    rangePlaceholder: ["Startdatum", "Enddatum"],
    shortWeekDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    shortMonths: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
  }, I0.default),
  timePickerLocale: Object.assign({}, N0.default)
};
$n.default = j0;
var L0 = Fe.default;
Object.defineProperty(Nu, "__esModule", {
  value: !0
});
Nu.default = void 0;
var z0 = L0($n);
Nu.default = z0.default;
var Lu = Fe.default;
Object.defineProperty(Jo, "__esModule", {
  value: !0
});
var B0 = Jo.default = void 0, V0 = Lu(Iu), H0 = Lu(Nu), q0 = Lu($n), W0 = Lu(Fn);
const at = "${label} ist nicht gültig. ${type} erwartet", U0 = {
  locale: "de",
  Pagination: V0.default,
  DatePicker: q0.default,
  TimePicker: W0.default,
  Calendar: H0.default,
  global: {
    placeholder: "Bitte auswählen"
  },
  Table: {
    filterTitle: "Filter-Menü",
    filterConfirm: "OK",
    filterReset: "Zurücksetzen",
    filterEmptyText: "Keine Filter",
    filterSearchPlaceholder: "Suche in Filtern",
    filterCheckAll: "Alle auswählen",
    selectAll: "Selektiere Alle",
    selectInvert: "Selektion Invertieren",
    selectionAll: "Wählen Sie alle Daten aus",
    sortTitle: "Sortieren",
    emptyText: "Keine Daten",
    expand: "Zeile erweitern",
    collapse: "Zeile reduzieren",
    triggerDesc: "Klicken zur absteigenden Sortierung",
    triggerAsc: "Klicken zur aufsteigenden Sortierung",
    cancelSort: "Klicken zum Abbrechen der Sortierung"
  },
  Tour: {
    Next: "Weiter",
    Previous: "Zurück",
    Finish: "Fertig"
  },
  Modal: {
    okText: "OK",
    cancelText: "Abbrechen",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Abbrechen"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Suchen",
    itemUnit: "Eintrag",
    itemsUnit: "Einträge",
    remove: "Entfernen",
    selectCurrent: "Alle auf aktueller Seite auswählen",
    removeCurrent: "Auswahl auf aktueller Seite aufheben",
    selectAll: "Alle auswählen",
    deselectAll: "Alle abwählen",
    removeAll: "Auswahl aufheben",
    selectInvert: "Auswahl umkehren"
  },
  Upload: {
    uploading: "Hochladen...",
    removeFile: "Datei entfernen",
    uploadError: "Fehler beim Hochladen",
    previewFile: "Dateivorschau",
    downloadFile: "Download-Datei"
  },
  Empty: {
    description: "Keine Daten"
  },
  Text: {
    edit: "Bearbeiten",
    copy: "Kopieren",
    copied: "Kopiert",
    expand: "Erweitern"
  },
  Form: {
    defaultValidateMessages: {
      default: "Feld-Validierungsfehler: ${label}",
      required: "Bitte geben Sie ${label} an",
      enum: "${label} muss eines der folgenden sein [${enum}]",
      whitespace: "${label} darf kein Leerzeichen sein",
      date: {
        format: "${label} ist ein ungültiges Datumsformat",
        parse: "${label} kann nicht in ein Datum umgewandelt werden",
        invalid: "${label} ist ein ungültiges Datum"
      },
      types: {
        string: at,
        method: at,
        array: at,
        object: at,
        number: at,
        date: at,
        boolean: at,
        integer: at,
        float: at,
        regexp: at,
        email: at,
        url: at,
        hex: at
      },
      string: {
        len: "${label} muss genau ${len} Zeichen lang sein",
        min: "${label} muss mindestens ${min} Zeichen lang sein",
        max: "${label} darf höchstens ${max} Zeichen lang sein",
        range: "${label} muss zwischen ${min} und ${max} Zeichen lang sein"
      },
      number: {
        len: "${label} muss gleich ${len} sein",
        min: "${label} muss mindestens ${min} sein",
        max: "${label} darf maximal ${max} sein",
        range: "${label} muss zwischen ${min} und ${max} liegen"
      },
      array: {
        len: "Es müssen ${len} ${label} sein",
        min: "Es müssen mindestens ${min} ${label} sein",
        max: "Es dürfen maximal ${max} ${label} sein",
        range: "Die Anzahl an ${label} muss zwischen ${min} und ${max} liegen"
      },
      pattern: {
        mismatch: "${label} entspricht nicht dem ${pattern} Muster"
      }
    }
  },
  Image: {
    preview: "Vorschau"
  },
  QRCode: {
    expired: "QR-Code abgelaufen",
    refresh: "Aktualisieren"
  }
};
B0 = Jo.default = U0;
var Qo = {}, zu = {};
Object.defineProperty(zu, "__esModule", {
  value: !0
});
zu.default = void 0;
var Y0 = {
  // Options
  items_per_page: "/ página",
  jump_to: "Ir a",
  jump_to_confirm: "confirmar",
  page: "Página",
  // Pagination
  prev_page: "Página anterior",
  next_page: "Página siguiente",
  prev_5: "5 páginas previas",
  next_5: "5 páginas siguientes",
  prev_3: "3 páginas previas",
  next_3: "3 páginas siguientes",
  page_size: "tamaño de página"
};
zu.default = Y0;
var Bu = {}, kn = {}, Vu = {}, G0 = Fe.default;
Object.defineProperty(Vu, "__esModule", {
  value: !0
});
Vu.default = void 0;
var Vi = G0(lr), K0 = Mt, X0 = (0, Vi.default)((0, Vi.default)({}, K0.commonLocale), {}, {
  locale: "es_ES",
  today: "Hoy",
  now: "Ahora",
  backToToday: "Volver a hoy",
  ok: "Aceptar",
  clear: "Limpiar",
  week: "Semana",
  month: "Mes",
  year: "Año",
  timeSelect: "Seleccionar hora",
  dateSelect: "Seleccionar fecha",
  monthSelect: "Elegir un mes",
  yearSelect: "Elegir un año",
  decadeSelect: "Elegir una década",
  dateFormat: "D/M/YYYY",
  dateTimeFormat: "D/M/YYYY HH:mm:ss",
  previousMonth: "Mes anterior (PageUp)",
  nextMonth: "Mes siguiente (PageDown)",
  previousYear: "Año anterior (Control + left)",
  nextYear: "Año siguiente (Control + right)",
  previousDecade: "Década anterior",
  nextDecade: "Década siguiente",
  previousCentury: "Siglo anterior",
  nextCentury: "Siglo siguiente"
});
Vu.default = X0;
var An = {};
Object.defineProperty(An, "__esModule", {
  value: !0
});
An.default = void 0;
const Z0 = {
  placeholder: "Seleccionar hora"
};
An.default = Z0;
var Bc = Fe.default;
Object.defineProperty(kn, "__esModule", {
  value: !0
});
kn.default = void 0;
var J0 = Bc(Vu), Q0 = Bc(An);
const eh = {
  lang: Object.assign({
    placeholder: "Seleccionar fecha",
    rangePlaceholder: ["Fecha inicial", "Fecha final"],
    shortWeekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    shortMonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  }, J0.default),
  timePickerLocale: Object.assign({}, Q0.default)
};
kn.default = eh;
var th = Fe.default;
Object.defineProperty(Bu, "__esModule", {
  value: !0
});
Bu.default = void 0;
var rh = th(kn);
Bu.default = rh.default;
var Hu = Fe.default;
Object.defineProperty(Qo, "__esModule", {
  value: !0
});
var nh = Qo.default = void 0, uh = Hu(zu), ah = Hu(Bu), oh = Hu(kn), ih = Hu(An);
const ot = "${label} no es un ${type} válido", sh = {
  locale: "es",
  Pagination: uh.default,
  DatePicker: oh.default,
  TimePicker: ih.default,
  Calendar: ah.default,
  global: {
    placeholder: "Seleccione"
  },
  Table: {
    filterTitle: "Filtrar menú",
    filterConfirm: "Aceptar",
    filterReset: "Reiniciar",
    filterEmptyText: "Sin filtros",
    filterCheckAll: "Seleccionar todo",
    filterSearchPlaceholder: "Buscar en filtros",
    emptyText: "Sin datos",
    selectAll: "Seleccionar todo",
    selectInvert: "Invertir selección",
    selectNone: "Vacíe todo",
    selectionAll: "Seleccionar todos los datos",
    sortTitle: "Ordenar",
    expand: "Expandir fila",
    collapse: "Colapsar fila",
    triggerDesc: "Click para ordenar en orden descendente",
    triggerAsc: "Click para ordenar en orden ascendente",
    cancelSort: "Click para cancelar ordenamiento"
  },
  Tour: {
    Next: "Siguiente",
    Previous: "Anterior",
    Finish: "Finalizar"
  },
  Modal: {
    okText: "Aceptar",
    cancelText: "Cancelar",
    justOkText: "Aceptar"
  },
  Popconfirm: {
    okText: "Aceptar",
    cancelText: "Cancelar"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Buscar aquí",
    itemUnit: "elemento",
    itemsUnit: "elementos",
    remove: "Eliminar",
    selectCurrent: "Seleccionar página actual",
    removeCurrent: "Eliminar página actual",
    selectAll: "Seleccionar todos los datos",
    removeAll: "Eliminar todos los datos",
    selectInvert: "Invertir página actual"
  },
  Upload: {
    uploading: "Subiendo...",
    removeFile: "Eliminar archivo",
    uploadError: "Error al subir el archivo",
    previewFile: "Vista previa",
    downloadFile: "Descargar archivo"
  },
  Empty: {
    description: "No hay datos"
  },
  Icon: {
    icon: "ícono"
  },
  Text: {
    edit: "Editar",
    copy: "Copiar",
    copied: "Copiado",
    expand: "Expandir"
  },
  Form: {
    optional: "(opcional)",
    defaultValidateMessages: {
      default: "Error de validación del campo ${label}",
      required: "Por favor, rellena ${label}",
      enum: "${label} debe ser uno de [${enum}]",
      whitespace: "${label} no puede ser un carácter en blanco",
      date: {
        format: "El formato de fecha de ${label} es inválido",
        parse: "${label} no se puede convertir a una fecha",
        invalid: "${label} es una fecha inválida"
      },
      types: {
        string: ot,
        method: ot,
        array: ot,
        object: ot,
        number: ot,
        date: ot,
        boolean: ot,
        integer: ot,
        float: ot,
        regexp: ot,
        email: ot,
        url: ot,
        hex: ot
      },
      string: {
        len: "${label} debe tener ${len} caracteres",
        min: "${label} debe tener al menos ${min} caracteres",
        max: "${label} debe tener hasta ${max} caracteres",
        range: "${label} debe tener entre ${min}-${max} caracteres"
      },
      number: {
        len: "${label} debe ser igual a ${len}",
        min: "${label} valor mínimo es ${min}",
        max: "${label} valor máximo es ${max}",
        range: "${label} debe ser entre ${min}-${max}"
      },
      array: {
        len: "Debe ser ${len} ${label}",
        min: "Al menos ${min} ${label}",
        max: "Como máximo ${max} ${label}",
        range: "El valor de ${label} debe estar entre ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} no coincide con el patrón ${pattern}"
      }
    }
  },
  Image: {
    preview: "Previsualización"
  }
};
nh = Qo.default = sh;
var ei = {}, qu = {};
Object.defineProperty(qu, "__esModule", {
  value: !0
});
qu.default = void 0;
var ch = {
  // Options
  items_per_page: "/ page",
  jump_to: "Aller à",
  jump_to_confirm: "confirmer",
  page: "Page",
  // Pagination
  prev_page: "Page précédente",
  next_page: "Page suivante",
  prev_5: "5 Pages précédentes",
  next_5: "5 Pages suivantes",
  prev_3: "3 Pages précédentes",
  next_3: "3 Pages suivantes",
  page_size: "taille de la page"
};
qu.default = ch;
var Wu = {}, Dn = {}, Uu = {}, lh = Fe.default;
Object.defineProperty(Uu, "__esModule", {
  value: !0
});
Uu.default = void 0;
var Hi = lh(lr), dh = Mt, fh = (0, Hi.default)((0, Hi.default)({}, dh.commonLocale), {}, {
  locale: "fr_FR",
  today: "Aujourd'hui",
  now: "Maintenant",
  backToToday: "Aujourd'hui",
  ok: "OK",
  clear: "Rétablir",
  week: "Semaine",
  month: "Mois",
  year: "Année",
  timeSelect: "Sélectionner l'heure",
  dateSelect: "Sélectionner la date",
  monthSelect: "Choisissez un mois",
  yearSelect: "Choisissez une année",
  decadeSelect: "Choisissez une décennie",
  dateFormat: "DD/MM/YYYY",
  dayFormat: "DD",
  dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
  previousMonth: "Mois précédent (PageUp)",
  nextMonth: "Mois suivant (PageDown)",
  previousYear: "Année précédente (Ctrl + gauche)",
  nextYear: "Année prochaine (Ctrl + droite)",
  previousDecade: "Décennie précédente",
  nextDecade: "Décennie suivante",
  previousCentury: "Siècle précédent",
  nextCentury: "Siècle suivant"
});
Uu.default = fh;
var Tn = {};
Object.defineProperty(Tn, "__esModule", {
  value: !0
});
Tn.default = void 0;
const hh = {
  placeholder: "Sélectionner l'heure",
  rangePlaceholder: ["Heure de début", "Heure de fin"]
};
Tn.default = hh;
var Vc = Fe.default;
Object.defineProperty(Dn, "__esModule", {
  value: !0
});
Dn.default = void 0;
var ph = Vc(Uu), mh = Vc(Tn);
const gh = {
  lang: Object.assign({
    placeholder: "Sélectionner une date",
    yearPlaceholder: "Sélectionner une année",
    quarterPlaceholder: "Sélectionner un trimestre",
    monthPlaceholder: "Sélectionner un mois",
    weekPlaceholder: "Sélectionner une semaine",
    rangePlaceholder: ["Date de début", "Date de fin"],
    rangeYearPlaceholder: ["Année de début", "Année de fin"],
    rangeMonthPlaceholder: ["Mois de début", "Mois de fin"],
    rangeWeekPlaceholder: ["Semaine de début", "Semaine de fin"]
  }, ph.default),
  timePickerLocale: Object.assign({}, mh.default)
};
Dn.default = gh;
var vh = Fe.default;
Object.defineProperty(Wu, "__esModule", {
  value: !0
});
Wu.default = void 0;
var bh = vh(Dn);
Wu.default = bh.default;
var Yu = Fe.default;
Object.defineProperty(ei, "__esModule", {
  value: !0
});
var yh = ei.default = void 0, xh = Yu(qu), _h = Yu(Wu), Ch = Yu(Dn), Eh = Yu(Tn);
const it = "La valeur du champ ${label} n'est pas valide pour le type ${type}", Sh = {
  locale: "fr",
  Pagination: xh.default,
  DatePicker: Ch.default,
  TimePicker: Eh.default,
  Calendar: _h.default,
  Table: {
    filterTitle: "Filtrer",
    filterConfirm: "OK",
    filterReset: "Réinitialiser",
    filterEmptyText: "Aucun filtre",
    filterCheckAll: "Tout sélectionner",
    filterSearchPlaceholder: "Chercher dans les filtres",
    emptyText: "Aucune donnée",
    selectAll: "Sélectionner la page actuelle",
    selectInvert: "Inverser la sélection de la page actuelle",
    selectNone: "Désélectionner toutes les données",
    selectionAll: "Sélectionner toutes les données",
    sortTitle: "Trier",
    expand: "Développer la ligne",
    collapse: "Réduire la ligne",
    triggerDesc: "Trier par ordre décroissant",
    triggerAsc: "Trier par ordre croissant",
    cancelSort: "Annuler le tri"
  },
  Tour: {
    Next: "Étape suivante",
    Previous: "Étape précédente",
    Finish: "Fin de la visite guidée"
  },
  Modal: {
    okText: "OK",
    cancelText: "Annuler",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Annuler"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Rechercher",
    itemUnit: "élément",
    itemsUnit: "éléments",
    remove: "Désélectionner",
    selectCurrent: "Sélectionner la page actuelle",
    removeCurrent: "Désélectionner la page actuelle",
    selectAll: "Sélectionner toutes les données",
    removeAll: "Désélectionner toutes les données",
    selectInvert: "Inverser la sélection de la page actuelle"
  },
  Upload: {
    uploading: "Téléchargement...",
    removeFile: "Effacer le fichier",
    uploadError: "Erreur de téléchargement",
    previewFile: "Fichier de prévisualisation",
    downloadFile: "Télécharger un fichier"
  },
  Empty: {
    description: "Aucune donnée"
  },
  Icon: {
    icon: "icône"
  },
  Text: {
    edit: "Éditer",
    copy: "Copier",
    copied: "Copie effectuée",
    expand: "Développer"
  },
  Form: {
    optional: "(optionnel)",
    defaultValidateMessages: {
      default: "Erreur de validation pour le champ ${label}",
      required: "Le champ ${label} est obligatoire",
      enum: "La valeur du champ ${label} doit être parmi [${enum}]",
      whitespace: "La valeur du champ ${label} ne peut pas être vide",
      date: {
        format: "La valeur du champ ${label} n'est pas au format date",
        parse: "La valeur du champ ${label} ne peut pas être convertie vers une date",
        invalid: "La valeur du champ ${label} n'est pas une date valide"
      },
      types: {
        string: it,
        method: it,
        array: it,
        object: it,
        number: it,
        date: it,
        boolean: it,
        integer: it,
        float: it,
        regexp: it,
        email: it,
        url: it,
        hex: it
      },
      string: {
        len: "La taille du champ ${label} doit être de ${len} caractères",
        min: "La taille du champ ${label} doit être au minimum de ${min} caractères",
        max: "La taille du champ ${label} doit être au maximum de ${max} caractères",
        range: "La taille du champ ${label} doit être entre ${min} et ${max} caractères"
      },
      number: {
        len: "La valeur du champ ${label} doit être égale à ${len}",
        min: "La valeur du champ ${label} doit être plus grande que ${min}",
        max: "La valeur du champ ${label} doit être plus petit que ${max}",
        range: "La valeur du champ ${label} doit être entre ${min} et ${max}"
      },
      array: {
        len: "La taille du tableau ${label} doit être de ${len}",
        min: "La taille du tableau ${label} doit être au minimum de ${min}",
        max: "La taille du tableau ${label} doit être au maximum de ${max}",
        range: "La taille du tableau ${label} doit être entre ${min}-${max}"
      },
      pattern: {
        mismatch: "La valeur du champ ${label} ne correspond pas au modèle ${pattern}"
      }
    }
  },
  Image: {
    preview: "Aperçu"
  }
};
yh = ei.default = Sh;
var ti = {}, Gu = {};
Object.defineProperty(Gu, "__esModule", {
  value: !0
});
Gu.default = void 0;
var wh = {
  // Options
  items_per_page: "/ الصفحة",
  jump_to: "الذهاب إلى",
  jump_to_confirm: "تأكيد",
  page: "الصفحة",
  // Pagination
  prev_page: "الصفحة السابقة",
  next_page: "الصفحة التالية",
  prev_5: "خمس صفحات سابقة",
  next_5: "خمس صفحات تالية",
  prev_3: "ثلاث صفحات سابقة",
  next_3: "ثلاث صفحات تالية",
  page_size: "مقاس الصفحه"
};
Gu.default = wh;
var Ku = {}, Rn = {}, Xu = {}, $h = Fe.default;
Object.defineProperty(Xu, "__esModule", {
  value: !0
});
Xu.default = void 0;
var qi = $h(lr), Fh = Mt, kh = (0, qi.default)((0, qi.default)({}, Fh.commonLocale), {}, {
  locale: "ar_EG",
  today: "اليوم",
  now: "الأن",
  backToToday: "العودة إلى اليوم",
  ok: "تأكيد",
  clear: "مسح",
  week: "الأسبوع",
  month: "الشهر",
  year: "السنة",
  timeSelect: "اختيار الوقت",
  dateSelect: "اختيار التاريخ",
  monthSelect: "اختيار الشهر",
  yearSelect: "اختيار السنة",
  decadeSelect: "اختيار العقد",
  dateFormat: "M/D/YYYY",
  dateTimeFormat: "M/D/YYYY HH:mm:ss",
  previousMonth: "الشهر السابق (PageUp)",
  nextMonth: "الشهر التالى(PageDown)",
  previousYear: "العام السابق (Control + left)",
  nextYear: "العام التالى (Control + right)",
  previousDecade: "العقد السابق",
  nextDecade: "العقد التالى",
  previousCentury: "القرن السابق",
  nextCentury: "القرن التالى"
});
Xu.default = kh;
var Pn = {};
Object.defineProperty(Pn, "__esModule", {
  value: !0
});
Pn.default = void 0;
const Ah = {
  placeholder: "اختيار الوقت"
};
Pn.default = Ah;
var Hc = Fe.default;
Object.defineProperty(Rn, "__esModule", {
  value: !0
});
Rn.default = void 0;
var Dh = Hc(Xu), Th = Hc(Pn);
const Rh = {
  lang: Object.assign({
    placeholder: "اختيار التاريخ",
    rangePlaceholder: ["البداية", "النهاية"],
    yearFormat: "YYYY",
    monthFormat: "MMMM",
    monthBeforeYear: !0,
    shortWeekDays: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    shortMonths: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
  }, Dh.default),
  timePickerLocale: Object.assign({}, Th.default)
};
Rn.default = Rh;
var Ph = Fe.default;
Object.defineProperty(Ku, "__esModule", {
  value: !0
});
Ku.default = void 0;
var Oh = Ph(Rn);
Ku.default = Oh.default;
var Zu = Fe.default;
Object.defineProperty(ti, "__esModule", {
  value: !0
});
var Mh = ti.default = void 0, Ih = Zu(Gu), Nh = Zu(Ku), jh = Zu(Rn), Lh = Zu(Pn);
const st = "ليس ${label} من نوع ${type} صالحًا", zh = {
  locale: "ar",
  Pagination: Ih.default,
  DatePicker: jh.default,
  TimePicker: Lh.default,
  Calendar: Nh.default,
  global: {
    placeholder: "يرجى التحديد"
  },
  Table: {
    filterTitle: "الفلاتر",
    filterConfirm: "تأكيد",
    filterReset: "إعادة ضبط",
    selectAll: "اختيار الكل",
    selectInvert: "إلغاء الاختيار",
    selectionAll: "حدد جميع البيانات",
    sortTitle: "رتب",
    expand: "توسيع الصف",
    collapse: "طي الصف",
    triggerDesc: "ترتيب تنازلي",
    triggerAsc: "ترتيب تصاعدي",
    cancelSort: "إلغاء الترتيب"
  },
  Tour: {
    Next: "التالي",
    Previous: "السابق",
    Finish: "إنهاء"
  },
  Modal: {
    okText: "تأكيد",
    cancelText: "إلغاء",
    justOkText: "تأكيد"
  },
  Popconfirm: {
    okText: "تأكيد",
    cancelText: "إلغاء"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "ابحث هنا",
    itemUnit: "عنصر",
    itemsUnit: "عناصر"
  },
  Upload: {
    uploading: "جاري الرفع...",
    removeFile: "احذف الملف",
    uploadError: "مشكلة فى الرفع",
    previewFile: "استعرض الملف",
    downloadFile: "تحميل الملف"
  },
  Empty: {
    description: "لا توجد بيانات"
  },
  Icon: {
    icon: "أيقونة"
  },
  Text: {
    edit: "تعديل",
    copy: "نسخ",
    copied: "نقل",
    expand: "وسع"
  },
  Form: {
    defaultValidateMessages: {
      default: "خطأ في حقل الإدخال ${label}",
      required: "يرجى إدخال ${label}",
      enum: "${label} يجب أن يكون واحدا من [${enum}]",
      whitespace: "${label} لا يمكن أن يكون حرفًا فارغًا",
      date: {
        format: "${label} تنسيق التاريخ غير صحيح",
        parse: "${label} لا يمكن تحويلها إلى تاريخ",
        invalid: "تاريخ ${label} غير صحيح"
      },
      types: {
        string: st,
        method: st,
        array: st,
        object: st,
        number: st,
        date: st,
        boolean: st,
        integer: st,
        float: st,
        regexp: st,
        email: st,
        url: st,
        hex: st
      },
      string: {
        len: "يجب ${label} ان يكون ${len} أحرف",
        min: "${label} على الأقل ${min} أحرف",
        max: "${label} يصل إلى ${max} أحرف",
        range: "يجب ${label} ان يكون مابين ${min}-${max} أحرف"
      },
      number: {
        len: "${len} ان يساوي ${label} يجب",
        min: "${min} الأدنى هو ${label} حد",
        max: "${max} الأقصى هو ${label} حد",
        range: "${max}-${min} ان يكون مابين ${label} يجب"
      },
      array: {
        len: "يجب أن يكون ${label} طوله ${len}",
        min: "يجب أن يكون ${label} طوله الأدنى ${min}",
        max: "يجب أن يكون ${label} طوله الأقصى ${max}",
        range: "يجب أن يكون ${label} طوله مابين ${min}-${max}"
      },
      pattern: {
        mismatch: "لا يتطابق ${label} مع ${pattern}"
      }
    }
  },
  Image: {
    preview: "معاينة"
  },
  QRCode: {
    expired: "انتهت صلاحية رمز الاستجابة السريعة",
    refresh: "انقر للتحديث",
    scanned: "تم المسح"
  },
  ColorPicker: {
    presetEmpty: "لا يوجد",
    transparent: "شفاف",
    singleColor: "لون واحد",
    gradientColor: "تدرج لوني"
  }
};
Mh = ti.default = zh;
var ri = {}, Ju = {};
Object.defineProperty(Ju, "__esModule", {
  value: !0
});
Ju.default = void 0;
var Bh = {
  // Options
  items_per_page: "/ sida",
  jump_to: "Gå till",
  jump_to_confirm: "bekräfta",
  page: "Sida",
  // Pagination
  prev_page: "Föreg sida",
  next_page: "Nästa sida",
  prev_5: "Föreg 5 sidor",
  next_5: "Nästa 5 sidor",
  prev_3: "Föreg 3 sidor",
  next_3: "Nästa 3 sidor",
  page_size: "sidstorlek"
};
Ju.default = Bh;
var Qu = {}, On = {}, ea = {}, Vh = Fe.default;
Object.defineProperty(ea, "__esModule", {
  value: !0
});
ea.default = void 0;
var Wi = Vh(lr), Hh = Mt, qh = (0, Wi.default)((0, Wi.default)({}, Hh.commonLocale), {}, {
  locale: "sv_SE",
  today: "I dag",
  now: "Nu",
  backToToday: "Till idag",
  ok: "OK",
  clear: "Avbryt",
  week: "Vecka",
  month: "Månad",
  year: "År",
  timeSelect: "Välj tidpunkt",
  dateSelect: "Välj datum",
  monthSelect: "Välj månad",
  yearSelect: "Välj år",
  decadeSelect: "Välj årtionde",
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD H:mm:ss",
  previousMonth: "Förra månaden (PageUp)",
  nextMonth: "Nästa månad (PageDown)",
  previousYear: "Föreg år (Control + left)",
  nextYear: "Nästa år (Control + right)",
  previousDecade: "Föreg årtionde",
  nextDecade: "Nästa årtionde",
  previousCentury: "Föreg århundrade",
  nextCentury: "Nästa århundrade"
});
ea.default = qh;
var Mn = {};
Object.defineProperty(Mn, "__esModule", {
  value: !0
});
Mn.default = void 0;
const Wh = {
  placeholder: "Välj tid"
};
Mn.default = Wh;
var qc = Fe.default;
Object.defineProperty(On, "__esModule", {
  value: !0
});
On.default = void 0;
var Uh = qc(ea), Yh = qc(Mn);
const Gh = {
  lang: Object.assign({
    placeholder: "Välj datum",
    yearPlaceholder: "Välj år",
    quarterPlaceholder: "Välj kvartal",
    monthPlaceholder: "Välj månad",
    weekPlaceholder: "Välj vecka",
    rangePlaceholder: ["Startdatum", "Slutdatum"],
    rangeYearPlaceholder: ["Startår", "Slutår"],
    rangeMonthPlaceholder: ["Startmånad", "Slutmånad"],
    rangeWeekPlaceholder: ["Startvecka", "Slutvecka"]
  }, Uh.default),
  timePickerLocale: Object.assign({}, Yh.default)
};
On.default = Gh;
var Kh = Fe.default;
Object.defineProperty(Qu, "__esModule", {
  value: !0
});
Qu.default = void 0;
var Xh = Kh(On);
Qu.default = Xh.default;
var ta = Fe.default;
Object.defineProperty(ri, "__esModule", {
  value: !0
});
var Zh = ri.default = void 0, Jh = ta(Ju), Qh = ta(Qu), ep = ta(On), tp = ta(Mn);
const ct = "${label} är inte en giltig ${type}", rp = {
  locale: "sv",
  Pagination: Jh.default,
  DatePicker: ep.default,
  TimePicker: tp.default,
  Calendar: Qh.default,
  global: {
    placeholder: "Vänligen välj"
  },
  Table: {
    filterTitle: "Filtermeny",
    filterConfirm: "OK",
    filterReset: "Återställ",
    filterEmptyText: "Inga filter",
    filterCheckAll: "Markera alla objekt",
    filterSearchPlaceholder: "Sök i filter",
    emptyText: "Ingen data",
    selectAll: "Markera nuvarande sida",
    selectInvert: "Invertera nuvarande sida",
    selectNone: "Avmarkera all data",
    selectionAll: "Markera all data",
    sortTitle: "Sortera",
    expand: "Expandera rad",
    collapse: "Komprimera rad",
    triggerDesc: "Klicka för att sortera i fallande ordning",
    triggerAsc: "Klicka för att sortera i stigande ordning",
    cancelSort: "Klicka för att avbryta sortering"
  },
  Tour: {
    Next: "Nästa",
    Previous: "Föregående",
    Finish: "Avsluta"
  },
  Modal: {
    okText: "OK",
    cancelText: "Avbryt",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Avbryt"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Sök här",
    itemUnit: "objekt",
    itemsUnit: "objekt",
    remove: "Ta bort",
    selectCurrent: "Markera nuvarande sida",
    removeCurrent: "Ta bort nuvarande sida",
    selectAll: "Markera all data",
    removeAll: "Ta bort all data",
    selectInvert: "Invertera nuvarande sida"
  },
  Upload: {
    uploading: "Laddar upp...",
    removeFile: "Ta bort fil",
    uploadError: "Uppladdningsfel",
    previewFile: "Förhandsgranska fil",
    downloadFile: "Ladda ned fil"
  },
  Empty: {
    description: "Ingen data"
  },
  Icon: {
    icon: "ikon"
  },
  Text: {
    edit: "Redigera",
    copy: "Kopiera",
    copied: "Kopierad",
    expand: "Expandera"
  },
  Form: {
    optional: "(valfritt)",
    defaultValidateMessages: {
      default: "Fältvalideringsfel för ${label}",
      required: "Vänligen fyll i ${label}",
      enum: "${label} måste vara en av [${enum}]",
      whitespace: "${label} kan inte vara ett tomt tecken",
      date: {
        format: "${label} datumformatet är ogiltigt",
        parse: "${label} kan inte konverteras till ett datum",
        invalid: "${label} är ett ogiltigt datum"
      },
      types: {
        string: ct,
        method: ct,
        array: ct,
        object: ct,
        number: ct,
        date: ct,
        boolean: ct,
        integer: ct,
        float: ct,
        regexp: ct,
        email: ct,
        url: ct,
        hex: ct
      },
      string: {
        len: "${label} måste vara ${len} tecken",
        min: "${label} måste vara minst ${min} tecken",
        max: "${label} måste vara högst ${max} tecken",
        range: "${label} måste vara mellan ${min}-${max} tecken"
      },
      number: {
        len: "${label} måste vara lika med ${len}",
        min: "${label} måste vara minst ${min}",
        max: "${label} måste vara högst ${max}",
        range: "${label} måste vara mellan ${min}-${max}"
      },
      array: {
        len: "Måste vara ${len} ${label}",
        min: "Minst ${min} ${label}",
        max: "Högst ${max} ${label}",
        range: "Antal ${label} måste vara mellan ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} stämmer inte överens med mönstret ${pattern}"
      }
    }
  },
  Image: {
    preview: "Förhandsgranska"
  },
  QRCode: {
    expired: "QR-koden har upphört att gälla",
    refresh: "Uppdatera"
  }
};
Zh = ri.default = rp;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Xa = function(e, t) {
  return Xa = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var u in n) n.hasOwnProperty(u) && (r[u] = n[u]);
  }, Xa(e, t);
};
function np(e, t) {
  Xa(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var rn = function() {
  return rn = Object.assign || function(t) {
    for (var r, n = 1, u = arguments.length; n < u; n++) {
      r = arguments[n];
      for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
  }, rn.apply(this, arguments);
};
function up(e, t, r, n) {
  var u, a = !1, o = 0;
  function i() {
    u && clearTimeout(u);
  }
  function s() {
    i(), a = !0;
  }
  typeof t != "boolean" && (n = r, r = t, t = void 0);
  function c() {
    var l = this, d = Date.now() - o, f = arguments;
    if (a)
      return;
    function v() {
      o = Date.now(), r.apply(l, f);
    }
    function h() {
      u = void 0;
    }
    n && !u && v(), i(), n === void 0 && d > e ? v() : t !== !0 && (u = setTimeout(n ? h : v, n === void 0 ? e - d : e));
  }
  return c.cancel = s, c;
}
var Er = {
  Pixel: "Pixel",
  Percent: "Percent"
}, Ui = {
  unit: Er.Percent,
  value: 0.8
};
function Yi(e) {
  return typeof e == "number" ? {
    unit: Er.Percent,
    value: e * 100
  } : typeof e == "string" ? e.match(/^(\d*(\.\d+)?)px$/) ? {
    unit: Er.Pixel,
    value: parseFloat(e)
  } : e.match(/^(\d*(\.\d+)?)%$/) ? {
    unit: Er.Percent,
    value: parseFloat(e)
  } : (console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'), Ui) : (console.warn("scrollThreshold should be string or number"), Ui);
}
var S3 = (
  /** @class */
  function(e) {
    np(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return n.lastScrollTop = 0, n.actionTriggered = !1, n.startY = 0, n.currentY = 0, n.dragging = !1, n.maxPullDownDistance = 0, n.getScrollableTarget = function() {
        return n.props.scrollableTarget instanceof HTMLElement ? n.props.scrollableTarget : typeof n.props.scrollableTarget == "string" ? document.getElementById(n.props.scrollableTarget) : (n.props.scrollableTarget === null && console.warn(`You are trying to pass scrollableTarget but it is null. This might
        happen because the element may not have been added to DOM yet.
        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.
      `), null);
      }, n.onStart = function(u) {
        n.lastScrollTop || (n.dragging = !0, u instanceof MouseEvent ? n.startY = u.pageY : u instanceof TouchEvent && (n.startY = u.touches[0].pageY), n.currentY = n.startY, n._infScroll && (n._infScroll.style.willChange = "transform", n._infScroll.style.transition = "transform 0.2s cubic-bezier(0,0,0.31,1)"));
      }, n.onMove = function(u) {
        n.dragging && (u instanceof MouseEvent ? n.currentY = u.pageY : u instanceof TouchEvent && (n.currentY = u.touches[0].pageY), !(n.currentY < n.startY) && (n.currentY - n.startY >= Number(n.props.pullDownToRefreshThreshold) && n.setState({
          pullToRefreshThresholdBreached: !0
        }), !(n.currentY - n.startY > n.maxPullDownDistance * 1.5) && n._infScroll && (n._infScroll.style.overflow = "visible", n._infScroll.style.transform = "translate3d(0px, " + (n.currentY - n.startY) + "px, 0px)")));
      }, n.onEnd = function() {
        n.startY = 0, n.currentY = 0, n.dragging = !1, n.state.pullToRefreshThresholdBreached && (n.props.refreshFunction && n.props.refreshFunction(), n.setState({
          pullToRefreshThresholdBreached: !1
        })), requestAnimationFrame(function() {
          n._infScroll && (n._infScroll.style.overflow = "auto", n._infScroll.style.transform = "none", n._infScroll.style.willChange = "unset");
        });
      }, n.onScrollListener = function(u) {
        typeof n.props.onScroll == "function" && setTimeout(function() {
          return n.props.onScroll && n.props.onScroll(u);
        }, 0);
        var a = n.props.height || n._scrollableNode ? u.target : document.documentElement.scrollTop ? document.documentElement : document.body;
        if (!n.actionTriggered) {
          var o = n.props.inverse ? n.isElementAtTop(a, n.props.scrollThreshold) : n.isElementAtBottom(a, n.props.scrollThreshold);
          o && n.props.hasMore && (n.actionTriggered = !0, n.setState({ showLoader: !0 }), n.props.next && n.props.next()), n.lastScrollTop = a.scrollTop;
        }
      }, n.state = {
        showLoader: !1,
        pullToRefreshThresholdBreached: !1,
        prevDataLength: r.dataLength
      }, n.throttledOnScrollListener = up(150, n.onScrollListener).bind(n), n.onStart = n.onStart.bind(n), n.onMove = n.onMove.bind(n), n.onEnd = n.onEnd.bind(n), n;
    }
    return t.prototype.componentDidMount = function() {
      if (typeof this.props.dataLength > "u")
        throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');
      if (this._scrollableNode = this.getScrollableTarget(), this.el = this.props.height ? this._infScroll : this._scrollableNode || window, this.el && this.el.addEventListener("scroll", this.throttledOnScrollListener), typeof this.props.initialScrollY == "number" && this.el && this.el instanceof HTMLElement && this.el.scrollHeight > this.props.initialScrollY && this.el.scrollTo(0, this.props.initialScrollY), this.props.pullDownToRefresh && this.el && (this.el.addEventListener("touchstart", this.onStart), this.el.addEventListener("touchmove", this.onMove), this.el.addEventListener("touchend", this.onEnd), this.el.addEventListener("mousedown", this.onStart), this.el.addEventListener("mousemove", this.onMove), this.el.addEventListener("mouseup", this.onEnd), this.maxPullDownDistance = this._pullDown && this._pullDown.firstChild && this._pullDown.firstChild.getBoundingClientRect().height || 0, this.forceUpdate(), typeof this.props.refreshFunction != "function"))
        throw new Error(`Mandatory prop "refreshFunction" missing.
          Pull Down To Refresh functionality will not work
          as expected. Check README.md for usage'`);
    }, t.prototype.componentWillUnmount = function() {
      this.el && (this.el.removeEventListener("scroll", this.throttledOnScrollListener), this.props.pullDownToRefresh && (this.el.removeEventListener("touchstart", this.onStart), this.el.removeEventListener("touchmove", this.onMove), this.el.removeEventListener("touchend", this.onEnd), this.el.removeEventListener("mousedown", this.onStart), this.el.removeEventListener("mousemove", this.onMove), this.el.removeEventListener("mouseup", this.onEnd)));
    }, t.prototype.componentDidUpdate = function(r) {
      this.props.dataLength !== r.dataLength && (this.actionTriggered = !1, this.setState({
        showLoader: !1
      }));
    }, t.getDerivedStateFromProps = function(r, n) {
      var u = r.dataLength !== n.prevDataLength;
      return u ? rn(rn({}, n), { prevDataLength: r.dataLength }) : null;
    }, t.prototype.isElementAtTop = function(r, n) {
      n === void 0 && (n = 0.8);
      var u = r === document.body || r === document.documentElement ? window.screen.availHeight : r.clientHeight, a = Yi(n);
      return a.unit === Er.Pixel ? r.scrollTop <= a.value + u - r.scrollHeight + 1 : r.scrollTop <= a.value / 100 + u - r.scrollHeight + 1;
    }, t.prototype.isElementAtBottom = function(r, n) {
      n === void 0 && (n = 0.8);
      var u = r === document.body || r === document.documentElement ? window.screen.availHeight : r.clientHeight, a = Yi(n);
      return a.unit === Er.Pixel ? r.scrollTop + u >= r.scrollHeight - a.value : r.scrollTop + u >= a.value / 100 * r.scrollHeight;
    }, t.prototype.render = function() {
      var r = this, n = rn({ height: this.props.height || "auto", overflow: "auto", WebkitOverflowScrolling: "touch" }, this.props.style), u = this.props.hasChildren || !!(this.props.children && this.props.children instanceof Array && this.props.children.length), a = this.props.pullDownToRefresh && this.props.height ? { overflow: "auto" } : {};
      return O.createElement(
        "div",
        { style: a, className: "infinite-scroll-component__outerdiv" },
        O.createElement(
          "div",
          { className: "infinite-scroll-component " + (this.props.className || ""), ref: function(o) {
            return r._infScroll = o;
          }, style: n },
          this.props.pullDownToRefresh && O.createElement(
            "div",
            { style: { position: "relative" }, ref: function(o) {
              return r._pullDown = o;
            } },
            O.createElement("div", { style: {
              position: "absolute",
              left: 0,
              right: 0,
              top: -1 * this.maxPullDownDistance
            } }, this.state.pullToRefreshThresholdBreached ? this.props.releaseToRefreshContent : this.props.pullDownToRefreshContent)
          ),
          this.props.children,
          !this.state.showLoader && !u && this.props.hasMore && this.props.loader,
          this.state.showLoader && this.props.hasMore && this.props.loader,
          !this.props.hasMore && this.props.endMessage
        )
      );
    }, t;
  }(Tf)
);
function De() {
  return De = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, De.apply(null, arguments);
}
function ne(e) {
  "@babel/helpers - typeof";
  return ne = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ne(e);
}
function ap(e, t) {
  if (ne(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ne(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Wc(e) {
  var t = ap(e, "string");
  return ne(t) == "symbol" ? t : t + "";
}
function F(e, t, r) {
  return (t = Wc(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function Gi(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(u) {
      return Object.getOwnPropertyDescriptor(e, u).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function N(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gi(Object(r), !0).forEach(function(n) {
      F(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gi(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Za(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function op(e) {
  if (Array.isArray(e)) return Za(e);
}
function Uc(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function ni(e, t) {
  if (e) {
    if (typeof e == "string") return Za(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Za(e, t) : void 0;
  }
}
function ip() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function re(e) {
  return op(e) || Uc(e) || ni(e) || ip();
}
function Yc(e) {
  if (Array.isArray(e)) return e;
}
function sp(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, u, a, o, i = [], s = !0, c = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1;
      } else for (; !(s = (n = a.call(r)).done) && (i.push(n.value), i.length !== t); s = !0) ;
    } catch (l) {
      c = !0, u = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw u;
      }
    }
    return i;
  }
}
function Gc() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Z(e, t) {
  return Yc(e) || sp(e, t) || ni(e, t) || Gc();
}
function cp(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function xt(e, t) {
  if (e == null) return {};
  var r, n, u = cp(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (u[r] = e[r]);
  }
  return u;
}
function lp(e) {
  return !!(e.addonBefore || e.addonAfter);
}
function dp(e) {
  return !!(e.prefix || e.suffix || e.allowClear);
}
function Ki(e, t, r) {
  var n = t.cloneNode(!0), u = Object.create(e, {
    target: {
      value: n
    },
    currentTarget: {
      value: n
    }
  });
  return n.value = r, typeof t.selectionStart == "number" && typeof t.selectionEnd == "number" && (n.selectionStart = t.selectionStart, n.selectionEnd = t.selectionEnd), n.setSelectionRange = function() {
    t.setSelectionRange.apply(t, arguments);
  }, u;
}
function gu(e, t, r, n) {
  if (r) {
    var u = t;
    if (t.type === "click") {
      u = Ki(t, e, ""), r(u);
      return;
    }
    if (e.type !== "file" && n !== void 0) {
      u = Ki(t, e, n), r(u);
      return;
    }
    r(u);
  }
}
function Kc(e, t) {
  if (e) {
    e.focus(t);
    var r = t || {}, n = r.cursor;
    if (n) {
      var u = e.value.length;
      switch (n) {
        case "start":
          e.setSelectionRange(0, 0);
          break;
        case "end":
          e.setSelectionRange(u, u);
          break;
        default:
          e.setSelectionRange(0, u);
      }
    }
  }
}
var Xc = /* @__PURE__ */ O.forwardRef(function(e, t) {
  var r, n, u, a = e.inputElement, o = e.children, i = e.prefixCls, s = e.prefix, c = e.suffix, l = e.addonBefore, d = e.addonAfter, f = e.className, v = e.style, h = e.disabled, g = e.readOnly, p = e.focused, C = e.triggerFocus, m = e.allowClear, y = e.value, E = e.handleReset, b = e.hidden, w = e.classes, S = e.classNames, R = e.dataAttrs, k = e.styles, T = e.components, I = e.onClear, j = o ?? a, P = (T == null ? void 0 : T.affixWrapper) || "span", M = (T == null ? void 0 : T.groupWrapper) || "span", L = (T == null ? void 0 : T.wrapper) || "span", $ = (T == null ? void 0 : T.groupAddon) || "span", A = He(null), D = function(ye) {
    var J;
    (J = A.current) !== null && J !== void 0 && J.contains(ye.target) && (C == null || C());
  }, B = dp(e), V = /* @__PURE__ */ Rf(j, {
    value: y,
    className: ee((r = j.props) === null || r === void 0 ? void 0 : r.className, !B && (S == null ? void 0 : S.variant)) || null
  }), H = He(null);
  if (O.useImperativeHandle(t, function() {
    return {
      nativeElement: H.current || A.current
    };
  }), B) {
    var q = null;
    if (m) {
      var Y = !h && !g && y, G = "".concat(i, "-clear-icon"), K = ne(m) === "object" && m !== null && m !== void 0 && m.clearIcon ? m.clearIcon : "✖";
      q = /* @__PURE__ */ O.createElement("button", {
        type: "button",
        tabIndex: -1,
        onClick: function(ye) {
          E == null || E(ye), I == null || I();
        },
        onMouseDown: function(ye) {
          return ye.preventDefault();
        },
        className: ee(G, F(F({}, "".concat(G, "-hidden"), !Y), "".concat(G, "-has-suffix"), !!c))
      }, K);
    }
    var X = "".concat(i, "-affix-wrapper"), te = ee(X, F(F(F(F(F({}, "".concat(i, "-disabled"), h), "".concat(X, "-disabled"), h), "".concat(X, "-focused"), p), "".concat(X, "-readonly"), g), "".concat(X, "-input-with-clear-btn"), c && m && y), w == null ? void 0 : w.affixWrapper, S == null ? void 0 : S.affixWrapper, S == null ? void 0 : S.variant), ue = (c || m) && /* @__PURE__ */ O.createElement("span", {
      className: ee("".concat(i, "-suffix"), S == null ? void 0 : S.suffix),
      style: k == null ? void 0 : k.suffix
    }, q, c);
    V = /* @__PURE__ */ O.createElement(P, De({
      className: te,
      style: k == null ? void 0 : k.affixWrapper,
      onClick: D
    }, R == null ? void 0 : R.affixWrapper, {
      ref: A
    }), s && /* @__PURE__ */ O.createElement("span", {
      className: ee("".concat(i, "-prefix"), S == null ? void 0 : S.prefix),
      style: k == null ? void 0 : k.prefix
    }, s), V, ue);
  }
  if (lp(e)) {
    var pe = "".concat(i, "-group"), le = "".concat(pe, "-addon"), ke = "".concat(pe, "-wrapper"), Ae = ee("".concat(i, "-wrapper"), pe, w == null ? void 0 : w.wrapper, S == null ? void 0 : S.wrapper), Ne = ee(ke, F({}, "".concat(ke, "-disabled"), h), w == null ? void 0 : w.group, S == null ? void 0 : S.groupWrapper);
    V = /* @__PURE__ */ O.createElement(M, {
      className: Ne,
      ref: H
    }, /* @__PURE__ */ O.createElement(L, {
      className: Ae
    }, l && /* @__PURE__ */ O.createElement($, {
      className: le
    }, l), V, d && /* @__PURE__ */ O.createElement($, {
      className: le
    }, d)));
  }
  return /* @__PURE__ */ O.cloneElement(V, {
    className: ee((n = V.props) === null || n === void 0 ? void 0 : n.className, f) || null,
    style: N(N({}, (u = V.props) === null || u === void 0 ? void 0 : u.style), v),
    hidden: b
  });
});
function Vt(e) {
  var t = _.useRef();
  t.current = e;
  var r = _.useCallback(function() {
    for (var n, u = arguments.length, a = new Array(u), o = 0; o < u; o++)
      a[o] = arguments[o];
    return (n = t.current) === null || n === void 0 ? void 0 : n.call.apply(n, [t].concat(a));
  }, []);
  return r;
}
function Ht() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var Xi = process.env.NODE_ENV !== "test" && Ht() ? _.useLayoutEffect : _.useEffect, on = function(t, r) {
  var n = _.useRef(!0);
  Xi(function() {
    return t(n.current);
  }, r), Xi(function() {
    return n.current = !1, function() {
      n.current = !0;
    };
  }, []);
}, Zi = function(t, r) {
  on(function(n) {
    if (!n)
      return t();
  }, r);
};
function sn(e) {
  var t = _.useRef(!1), r = _.useState(e), n = Z(r, 2), u = n[0], a = n[1];
  _.useEffect(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function o(i, s) {
    s && t.current || a(i);
  }
  return [u, o];
}
function _a(e) {
  return e !== void 0;
}
function Nr(e, t) {
  var r = t || {}, n = r.defaultValue, u = r.value, a = r.onChange, o = r.postState, i = sn(function() {
    return _a(u) ? u : _a(n) ? typeof n == "function" ? n() : n : typeof e == "function" ? e() : e;
  }), s = Z(i, 2), c = s[0], l = s[1], d = u !== void 0 ? u : c, f = o ? o(d) : d, v = Vt(a), h = sn([d]), g = Z(h, 2), p = g[0], C = g[1];
  Zi(function() {
    var y = p[0];
    c !== y && v(c, y);
  }, [p]), Zi(function() {
    _a(u) || l(u);
  }, [u]);
  var m = Vt(function(y, E) {
    l(y, E), C([d], E);
  });
  return [f, m];
}
function fp(e, t) {
  var r = Object.assign({}, e);
  return Array.isArray(t) && t.forEach(function(n) {
    delete r[n];
  }), r;
}
var hp = ["show"];
function Zc(e, t) {
  return _.useMemo(function() {
    var r = {};
    t && (r.show = ne(t) === "object" && t.formatter ? t.formatter : !!t), r = N(N({}, r), e);
    var n = r, u = n.show, a = xt(n, hp);
    return N(N({}, a), {}, {
      show: !!u,
      showFormatter: typeof u == "function" ? u : void 0,
      strategy: a.strategy || function(o) {
        return o.length;
      }
    });
  }, [e, t]);
}
var pp = ["autoComplete", "onChange", "onFocus", "onBlur", "onPressEnter", "onKeyDown", "onKeyUp", "prefixCls", "disabled", "htmlSize", "className", "maxLength", "suffix", "showCount", "count", "type", "classes", "classNames", "styles", "onCompositionStart", "onCompositionEnd"], mp = /* @__PURE__ */ Yo(function(e, t) {
  var r = e.autoComplete, n = e.onChange, u = e.onFocus, a = e.onBlur, o = e.onPressEnter, i = e.onKeyDown, s = e.onKeyUp, c = e.prefixCls, l = c === void 0 ? "rc-input" : c, d = e.disabled, f = e.htmlSize, v = e.className, h = e.maxLength, g = e.suffix, p = e.showCount, C = e.count, m = e.type, y = m === void 0 ? "text" : m, E = e.classes, b = e.classNames, w = e.styles, S = e.onCompositionStart, R = e.onCompositionEnd, k = xt(e, pp), T = Ya(!1), I = Z(T, 2), j = I[0], P = I[1], M = He(!1), L = He(!1), $ = He(null), A = He(null), D = function(oe) {
    $.current && Kc($.current, oe);
  }, B = Nr(e.defaultValue, {
    value: e.value
  }), V = Z(B, 2), H = V[0], q = V[1], Y = H == null ? "" : String(H), G = Ya(null), K = Z(G, 2), X = K[0], te = K[1], ue = Zc(C, p), pe = ue.max || h, le = ue.strategy(Y), ke = !!pe && le > pe;
  Go(t, function() {
    var ae;
    return {
      focus: D,
      blur: function() {
        var ge;
        (ge = $.current) === null || ge === void 0 || ge.blur();
      },
      setSelectionRange: function(ge, he, xe) {
        var Ue;
        (Ue = $.current) === null || Ue === void 0 || Ue.setSelectionRange(ge, he, xe);
      },
      select: function() {
        var ge;
        (ge = $.current) === null || ge === void 0 || ge.select();
      },
      input: $.current,
      nativeElement: ((ae = A.current) === null || ae === void 0 ? void 0 : ae.nativeElement) || $.current
    };
  }), wt(function() {
    L.current && (L.current = !1), P(function(ae) {
      return ae && d ? !1 : ae;
    });
  }, [d]);
  var Ae = function(oe, ge, he) {
    var xe = ge;
    if (!M.current && ue.exceedFormatter && ue.max && ue.strategy(ge) > ue.max) {
      if (xe = ue.exceedFormatter(ge, {
        max: ue.max
      }), ge !== xe) {
        var Ue, mt;
        te([((Ue = $.current) === null || Ue === void 0 ? void 0 : Ue.selectionStart) || 0, ((mt = $.current) === null || mt === void 0 ? void 0 : mt.selectionEnd) || 0]);
      }
    } else if (he.source === "compositionEnd")
      return;
    q(xe), $.current && gu($.current, oe, n, xe);
  };
  wt(function() {
    if (X) {
      var ae;
      (ae = $.current) === null || ae === void 0 || ae.setSelectionRange.apply(ae, re(X));
    }
  }, [X]);
  var Ne = function(oe) {
    Ae(oe, oe.target.value, {
      source: "change"
    });
  }, U = function(oe) {
    M.current = !1, Ae(oe, oe.currentTarget.value, {
      source: "compositionEnd"
    }), R == null || R(oe);
  }, ye = function(oe) {
    o && oe.key === "Enter" && !L.current && (L.current = !0, o(oe)), i == null || i(oe);
  }, J = function(oe) {
    oe.key === "Enter" && (L.current = !1), s == null || s(oe);
  }, ie = function(oe) {
    P(!0), u == null || u(oe);
  }, Pe = function(oe) {
    L.current && (L.current = !1), P(!1), a == null || a(oe);
  }, fe = function(oe) {
    q(""), D(), $.current && gu($.current, oe, n);
  }, Be = ke && "".concat(l, "-out-of-range"), Re = function() {
    var oe = fp(e, [
      "prefixCls",
      "onPressEnter",
      "addonBefore",
      "addonAfter",
      "prefix",
      "suffix",
      "allowClear",
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      "defaultValue",
      "showCount",
      "count",
      "classes",
      "htmlSize",
      "styles",
      "classNames",
      "onClear"
    ]);
    return /* @__PURE__ */ O.createElement("input", De({
      autoComplete: r
    }, oe, {
      onChange: Ne,
      onFocus: ie,
      onBlur: Pe,
      onKeyDown: ye,
      onKeyUp: J,
      className: ee(l, F({}, "".concat(l, "-disabled"), d), b == null ? void 0 : b.input),
      style: w == null ? void 0 : w.input,
      ref: $,
      size: f,
      type: y,
      onCompositionStart: function(he) {
        M.current = !0, S == null || S(he);
      },
      onCompositionEnd: U
    }));
  }, we = function() {
    var oe = Number(pe) > 0;
    if (g || ue.show) {
      var ge = ue.showFormatter ? ue.showFormatter({
        value: Y,
        count: le,
        maxLength: pe
      }) : "".concat(le).concat(oe ? " / ".concat(pe) : "");
      return /* @__PURE__ */ O.createElement(O.Fragment, null, ue.show && /* @__PURE__ */ O.createElement("span", {
        className: ee("".concat(l, "-show-count-suffix"), F({}, "".concat(l, "-show-count-has-suffix"), !!g), b == null ? void 0 : b.count),
        style: N({}, w == null ? void 0 : w.count)
      }, ge), g);
    }
    return null;
  };
  return /* @__PURE__ */ O.createElement(Xc, De({}, k, {
    prefixCls: l,
    className: ee(v, Be),
    handleReset: fe,
    value: Y,
    focused: j,
    triggerFocus: D,
    suffix: we(),
    disabled: d,
    classes: E,
    classNames: b,
    styles: w
  }), Re());
}), gp = Symbol.for("react.element"), vp = Symbol.for("react.transitional.element"), bp = Symbol.for("react.fragment");
function Jc(e) {
  return (
    // Base object type
    e && ne(e) === "object" && // React Element type
    (e.$$typeof === gp || e.$$typeof === vp) && // React Fragment type
    e.type === bp
  );
}
function vu(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [];
  return O.Children.forEach(e, function(n) {
    n == null && !t.keepEmpty || (Array.isArray(n) ? r = r.concat(vu(n)) : Jc(n) && n.props ? r = r.concat(vu(n.props.children, t)) : r.push(n));
  }), r;
}
var Ja = {}, ui = [], yp = function(t) {
  ui.push(t);
};
function cn(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = ui.reduce(function(n, u) {
      return u(n ?? "", "warning");
    }, t);
    r && console.error("Warning: ".concat(r));
  }
}
function xp(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = ui.reduce(function(n, u) {
      return u(n ?? "", "note");
    }, t);
    r && console.warn("Note: ".concat(r));
  }
}
function Qc() {
  Ja = {};
}
function el(e, t, r) {
  !t && !Ja[r] && (e(!1, r), Ja[r] = !0);
}
function Ie(e, t) {
  el(cn, e, t);
}
function _p(e, t) {
  el(xp, e, t);
}
Ie.preMessage = yp;
Ie.resetWarned = Qc;
Ie.noteOnce = _p;
function Ji(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}
function Cp(e) {
  return e && ne(e) === "object" && Ji(e.nativeElement) ? e.nativeElement : Ji(e) ? e : null;
}
function su(e) {
  var t = Cp(e);
  if (t)
    return t;
  if (e instanceof O.Component) {
    var r;
    return (r = Ii.findDOMNode) === null || r === void 0 ? void 0 : r.call(Ii, e);
  }
  return null;
}
var Qa = { exports: {} }, Ce = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qi;
function Ep() {
  if (Qi) return Ce;
  Qi = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), o = Symbol.for("react.context"), i = Symbol.for("react.server_context"), s = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function g(p) {
    if (typeof p == "object" && p !== null) {
      var C = p.$$typeof;
      switch (C) {
        case e:
          switch (p = p.type, p) {
            case r:
            case u:
            case n:
            case c:
            case l:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case i:
                case o:
                case s:
                case f:
                case d:
                case a:
                  return p;
                default:
                  return C;
              }
          }
        case t:
          return C;
      }
    }
  }
  return Ce.ContextConsumer = o, Ce.ContextProvider = a, Ce.Element = e, Ce.ForwardRef = s, Ce.Fragment = r, Ce.Lazy = f, Ce.Memo = d, Ce.Portal = t, Ce.Profiler = u, Ce.StrictMode = n, Ce.Suspense = c, Ce.SuspenseList = l, Ce.isAsyncMode = function() {
    return !1;
  }, Ce.isConcurrentMode = function() {
    return !1;
  }, Ce.isContextConsumer = function(p) {
    return g(p) === o;
  }, Ce.isContextProvider = function(p) {
    return g(p) === a;
  }, Ce.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === e;
  }, Ce.isForwardRef = function(p) {
    return g(p) === s;
  }, Ce.isFragment = function(p) {
    return g(p) === r;
  }, Ce.isLazy = function(p) {
    return g(p) === f;
  }, Ce.isMemo = function(p) {
    return g(p) === d;
  }, Ce.isPortal = function(p) {
    return g(p) === t;
  }, Ce.isProfiler = function(p) {
    return g(p) === u;
  }, Ce.isStrictMode = function(p) {
    return g(p) === n;
  }, Ce.isSuspense = function(p) {
    return g(p) === c;
  }, Ce.isSuspenseList = function(p) {
    return g(p) === l;
  }, Ce.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === r || p === u || p === n || p === c || p === l || p === v || typeof p == "object" && p !== null && (p.$$typeof === f || p.$$typeof === d || p.$$typeof === a || p.$$typeof === o || p.$$typeof === s || p.$$typeof === h || p.getModuleId !== void 0);
  }, Ce.typeOf = g, Ce;
}
var Ee = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var es;
function Sp() {
  return es || (es = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), o = Symbol.for("react.context"), i = Symbol.for("react.server_context"), s = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), h = !1, g = !1, p = !1, C = !1, m = !1, y;
    y = Symbol.for("react.module.reference");
    function E(U) {
      return !!(typeof U == "string" || typeof U == "function" || U === r || U === u || m || U === n || U === c || U === l || C || U === v || h || g || p || typeof U == "object" && U !== null && (U.$$typeof === f || U.$$typeof === d || U.$$typeof === a || U.$$typeof === o || U.$$typeof === s || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      U.$$typeof === y || U.getModuleId !== void 0));
    }
    function b(U) {
      if (typeof U == "object" && U !== null) {
        var ye = U.$$typeof;
        switch (ye) {
          case e:
            var J = U.type;
            switch (J) {
              case r:
              case u:
              case n:
              case c:
              case l:
                return J;
              default:
                var ie = J && J.$$typeof;
                switch (ie) {
                  case i:
                  case o:
                  case s:
                  case f:
                  case d:
                  case a:
                    return ie;
                  default:
                    return ye;
                }
            }
          case t:
            return ye;
        }
      }
    }
    var w = o, S = a, R = e, k = s, T = r, I = f, j = d, P = t, M = u, L = n, $ = c, A = l, D = !1, B = !1;
    function V(U) {
      return D || (D = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function H(U) {
      return B || (B = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function q(U) {
      return b(U) === o;
    }
    function Y(U) {
      return b(U) === a;
    }
    function G(U) {
      return typeof U == "object" && U !== null && U.$$typeof === e;
    }
    function K(U) {
      return b(U) === s;
    }
    function X(U) {
      return b(U) === r;
    }
    function te(U) {
      return b(U) === f;
    }
    function ue(U) {
      return b(U) === d;
    }
    function pe(U) {
      return b(U) === t;
    }
    function le(U) {
      return b(U) === u;
    }
    function ke(U) {
      return b(U) === n;
    }
    function Ae(U) {
      return b(U) === c;
    }
    function Ne(U) {
      return b(U) === l;
    }
    Ee.ContextConsumer = w, Ee.ContextProvider = S, Ee.Element = R, Ee.ForwardRef = k, Ee.Fragment = T, Ee.Lazy = I, Ee.Memo = j, Ee.Portal = P, Ee.Profiler = M, Ee.StrictMode = L, Ee.Suspense = $, Ee.SuspenseList = A, Ee.isAsyncMode = V, Ee.isConcurrentMode = H, Ee.isContextConsumer = q, Ee.isContextProvider = Y, Ee.isElement = G, Ee.isForwardRef = K, Ee.isFragment = X, Ee.isLazy = te, Ee.isMemo = ue, Ee.isPortal = pe, Ee.isProfiler = le, Ee.isStrictMode = ke, Ee.isSuspense = Ae, Ee.isSuspenseList = Ne, Ee.isValidElementType = E, Ee.typeOf = b;
  }()), Ee;
}
process.env.NODE_ENV === "production" ? Qa.exports = Ep() : Qa.exports = Sp();
var Ca = Qa.exports;
function ai(e, t, r) {
  var n = _.useRef({});
  return (!("value" in n.current) || r(n.current.condition, t)) && (n.current.value = e(), n.current.condition = t), n.current.value;
}
var wp = Number(Of.split(".")[0]), tl = function(t, r) {
  typeof t == "function" ? t(r) : ne(t) === "object" && t && "current" in t && (t.current = r);
}, rl = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var u = r.filter(Boolean);
  return u.length <= 1 ? u[0] : function(a) {
    r.forEach(function(o) {
      tl(o, a);
    });
  };
}, $p = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  return ai(function() {
    return rl.apply(void 0, r);
  }, r, function(u, a) {
    return u.length !== a.length || u.every(function(o, i) {
      return o !== a[i];
    });
  });
}, nl = function(t) {
  var r, n;
  if (!t)
    return !1;
  if (ul(t) && wp >= 19)
    return !0;
  var u = Ca.isMemo(t) ? t.type.type : t.type;
  return !(typeof u == "function" && !((r = u.prototype) !== null && r !== void 0 && r.render) && u.$$typeof !== Ca.ForwardRef || typeof t == "function" && !((n = t.prototype) !== null && n !== void 0 && n.render) && t.$$typeof !== Ca.ForwardRef);
};
function ul(e) {
  return /* @__PURE__ */ Pf(e) && !Jc(e);
}
var al = function(t) {
  if (t && ul(t)) {
    var r = t;
    return r.props.propertyIsEnumerable("ref") ? r.props.ref : r.ref;
  }
  return null;
}, eo = /* @__PURE__ */ _.createContext(null);
function Fp(e) {
  var t = e.children, r = e.onBatchResize, n = _.useRef(0), u = _.useRef([]), a = _.useContext(eo), o = _.useCallback(function(i, s, c) {
    n.current += 1;
    var l = n.current;
    u.current.push({
      size: i,
      element: s,
      data: c
    }), Promise.resolve().then(function() {
      l === n.current && (r == null || r(u.current), u.current = []);
    }), a == null || a(i, s, c);
  }, [r, a]);
  return /* @__PURE__ */ _.createElement(eo.Provider, {
    value: o
  }, t);
}
var ol = function() {
  if (typeof Map < "u")
    return Map;
  function e(t, r) {
    var n = -1;
    return t.some(function(u, a) {
      return u[0] === r ? (n = a, !0) : !1;
    }), n;
  }
  return (
    /** @class */
    function() {
      function t() {
        this.__entries__ = [];
      }
      return Object.defineProperty(t.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: !0,
        configurable: !0
      }), t.prototype.get = function(r) {
        var n = e(this.__entries__, r), u = this.__entries__[n];
        return u && u[1];
      }, t.prototype.set = function(r, n) {
        var u = e(this.__entries__, r);
        ~u ? this.__entries__[u][1] = n : this.__entries__.push([r, n]);
      }, t.prototype.delete = function(r) {
        var n = this.__entries__, u = e(n, r);
        ~u && n.splice(u, 1);
      }, t.prototype.has = function(r) {
        return !!~e(this.__entries__, r);
      }, t.prototype.clear = function() {
        this.__entries__.splice(0);
      }, t.prototype.forEach = function(r, n) {
        n === void 0 && (n = null);
        for (var u = 0, a = this.__entries__; u < a.length; u++) {
          var o = a[u];
          r.call(n, o[1], o[0]);
        }
      }, t;
    }()
  );
}(), to = typeof window < "u" && typeof document < "u" && window.document === document, bu = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), kp = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(bu) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), Ap = 2;
function Dp(e, t) {
  var r = !1, n = !1, u = 0;
  function a() {
    r && (r = !1, e()), n && i();
  }
  function o() {
    kp(a);
  }
  function i() {
    var s = Date.now();
    if (r) {
      if (s - u < Ap)
        return;
      n = !0;
    } else
      r = !0, n = !1, setTimeout(o, t);
    u = s;
  }
  return i;
}
var Tp = 20, Rp = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], Pp = typeof MutationObserver < "u", Op = (
  /** @class */
  function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = Dp(this.refresh.bind(this), Tp);
    }
    return e.prototype.addObserver = function(t) {
      ~this.observers_.indexOf(t) || this.observers_.push(t), this.connected_ || this.connect_();
    }, e.prototype.removeObserver = function(t) {
      var r = this.observers_, n = r.indexOf(t);
      ~n && r.splice(n, 1), !r.length && this.connected_ && this.disconnect_();
    }, e.prototype.refresh = function() {
      var t = this.updateObservers_();
      t && this.refresh();
    }, e.prototype.updateObservers_ = function() {
      var t = this.observers_.filter(function(r) {
        return r.gatherActive(), r.hasActive();
      });
      return t.forEach(function(r) {
        return r.broadcastActive();
      }), t.length > 0;
    }, e.prototype.connect_ = function() {
      !to || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), Pp ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !to || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var r = t.propertyName, n = r === void 0 ? "" : r, u = Rp.some(function(a) {
        return !!~n.indexOf(a);
      });
      u && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  }()
), il = function(e, t) {
  for (var r = 0, n = Object.keys(t); r < n.length; r++) {
    var u = n[r];
    Object.defineProperty(e, u, {
      value: t[u],
      enumerable: !1,
      writable: !1,
      configurable: !0
    });
  }
  return e;
}, Fr = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || bu;
}, sl = ra(0, 0, 0, 0);
function yu(e) {
  return parseFloat(e) || 0;
}
function ts(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return t.reduce(function(n, u) {
    var a = e["border-" + u + "-width"];
    return n + yu(a);
  }, 0);
}
function Mp(e) {
  for (var t = ["top", "right", "bottom", "left"], r = {}, n = 0, u = t; n < u.length; n++) {
    var a = u[n], o = e["padding-" + a];
    r[a] = yu(o);
  }
  return r;
}
function Ip(e) {
  var t = e.getBBox();
  return ra(0, 0, t.width, t.height);
}
function Np(e) {
  var t = e.clientWidth, r = e.clientHeight;
  if (!t && !r)
    return sl;
  var n = Fr(e).getComputedStyle(e), u = Mp(n), a = u.left + u.right, o = u.top + u.bottom, i = yu(n.width), s = yu(n.height);
  if (n.boxSizing === "border-box" && (Math.round(i + a) !== t && (i -= ts(n, "left", "right") + a), Math.round(s + o) !== r && (s -= ts(n, "top", "bottom") + o)), !Lp(e)) {
    var c = Math.round(i + a) - t, l = Math.round(s + o) - r;
    Math.abs(c) !== 1 && (i -= c), Math.abs(l) !== 1 && (s -= l);
  }
  return ra(u.left, u.top, i, s);
}
var jp = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof Fr(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof Fr(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function Lp(e) {
  return e === Fr(e).document.documentElement;
}
function zp(e) {
  return to ? jp(e) ? Ip(e) : Np(e) : sl;
}
function Bp(e) {
  var t = e.x, r = e.y, n = e.width, u = e.height, a = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(a.prototype);
  return il(o, {
    x: t,
    y: r,
    width: n,
    height: u,
    top: r,
    right: t + n,
    bottom: u + r,
    left: t
  }), o;
}
function ra(e, t, r, n) {
  return { x: e, y: t, width: r, height: n };
}
var Vp = (
  /** @class */
  function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = ra(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = zp(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  }()
), Hp = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, r) {
      var n = Bp(r);
      il(this, { target: t, contentRect: n });
    }
    return e;
  }()
), qp = (
  /** @class */
  function() {
    function e(t, r, n) {
      if (this.activeObservations_ = [], this.observations_ = new ol(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = r, this.callbackCtx_ = n;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof Fr(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var r = this.observations_;
        r.has(t) || (r.set(t, new Vp(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof Fr(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var r = this.observations_;
        r.has(t) && (r.delete(t), r.size || this.controller_.removeObserver(this));
      }
    }, e.prototype.disconnect = function() {
      this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
    }, e.prototype.gatherActive = function() {
      var t = this;
      this.clearActive(), this.observations_.forEach(function(r) {
        r.isActive() && t.activeObservations_.push(r);
      });
    }, e.prototype.broadcastActive = function() {
      if (this.hasActive()) {
        var t = this.callbackCtx_, r = this.activeObservations_.map(function(n) {
          return new Hp(n.target, n.broadcastRect());
        });
        this.callback_.call(t, r, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  }()
), cl = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new ol(), ll = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var r = Op.getInstance(), n = new qp(t, r, this);
      cl.set(this, n);
    }
    return e;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  ll.prototype[e] = function() {
    var t;
    return (t = cl.get(this))[e].apply(t, arguments);
  };
});
var Wp = function() {
  return typeof bu.ResizeObserver < "u" ? bu.ResizeObserver : ll;
}(), zt = /* @__PURE__ */ new Map();
function dl(e) {
  e.forEach(function(t) {
    var r, n = t.target;
    (r = zt.get(n)) === null || r === void 0 || r.forEach(function(u) {
      return u(n);
    });
  });
}
var fl = new Wp(dl);
process.env.NODE_ENV;
process.env.NODE_ENV;
function Up(e, t) {
  zt.has(e) || (zt.set(e, /* @__PURE__ */ new Set()), fl.observe(e)), zt.get(e).add(t);
}
function Yp(e, t) {
  zt.has(e) && (zt.get(e).delete(t), zt.get(e).size || (fl.unobserve(e), zt.delete(e)));
}
function Qe(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function rs(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Wc(n.key), n);
  }
}
function et(e, t, r) {
  return t && rs(e.prototype, t), r && rs(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function ln(e, t) {
  return ln = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, ln(e, t);
}
function dr(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && ln(e, t);
}
function dn(e) {
  return dn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, dn(e);
}
function oi() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (oi = function() {
    return !!e;
  })();
}
function ce(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Gp(e, t) {
  if (t && (ne(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return ce(e);
}
function fr(e) {
  var t = oi();
  return function() {
    var r, n = dn(e);
    if (t) {
      var u = dn(this).constructor;
      r = Reflect.construct(n, arguments, u);
    } else r = n.apply(this, arguments);
    return Gp(this, r);
  };
}
var Kp = /* @__PURE__ */ function(e) {
  dr(r, e);
  var t = fr(r);
  function r() {
    return Qe(this, r), t.apply(this, arguments);
  }
  return et(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
}(_.Component);
function Xp(e, t) {
  var r = e.children, n = e.disabled, u = _.useRef(null), a = _.useRef(null), o = _.useContext(eo), i = typeof r == "function", s = i ? r(u) : r, c = _.useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  }), l = !i && /* @__PURE__ */ _.isValidElement(s) && nl(s), d = l ? al(s) : null, f = $p(d, u), v = function() {
    var C;
    return su(u.current) || // Support `nativeElement` format
    (u.current && ne(u.current) === "object" ? su((C = u.current) === null || C === void 0 ? void 0 : C.nativeElement) : null) || su(a.current);
  };
  _.useImperativeHandle(t, function() {
    return v();
  });
  var h = _.useRef(e);
  h.current = e;
  var g = _.useCallback(function(p) {
    var C = h.current, m = C.onResize, y = C.data, E = p.getBoundingClientRect(), b = E.width, w = E.height, S = p.offsetWidth, R = p.offsetHeight, k = Math.floor(b), T = Math.floor(w);
    if (c.current.width !== k || c.current.height !== T || c.current.offsetWidth !== S || c.current.offsetHeight !== R) {
      var I = {
        width: k,
        height: T,
        offsetWidth: S,
        offsetHeight: R
      };
      c.current = I;
      var j = S === Math.round(b) ? b : S, P = R === Math.round(w) ? w : R, M = N(N({}, I), {}, {
        offsetWidth: j,
        offsetHeight: P
      });
      o == null || o(M, p, y), m && Promise.resolve().then(function() {
        m(M, p);
      });
    }
  }, []);
  return _.useEffect(function() {
    var p = v();
    return p && !n && Up(p, g), function() {
      return Yp(p, g);
    };
  }, [u.current, n]), /* @__PURE__ */ _.createElement(Kp, {
    ref: a
  }, l ? /* @__PURE__ */ _.cloneElement(s, {
    ref: f
  }) : s);
}
var hl = /* @__PURE__ */ _.forwardRef(Xp);
process.env.NODE_ENV !== "production" && (hl.displayName = "SingleObserver");
var Zp = "rc-observer-key";
function Jp(e, t) {
  var r = e.children, n = typeof r == "function" ? [r] : vu(r);
  return process.env.NODE_ENV !== "production" && (n.length > 1 ? cn(!1, "Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.") : n.length === 0 && cn(!1, "`children` of ResizeObserver is empty. Nothing is in observe.")), n.map(function(u, a) {
    var o = (u == null ? void 0 : u.key) || "".concat(Zp, "-").concat(a);
    return /* @__PURE__ */ _.createElement(hl, De({}, e, {
      key: o,
      ref: a === 0 ? t : void 0
    }), u);
  });
}
var ii = /* @__PURE__ */ _.forwardRef(Jp);
process.env.NODE_ENV !== "production" && (ii.displayName = "ResizeObserver");
ii.Collection = Fp;
var pl = function(t) {
  return +setTimeout(t, 16);
}, ml = function(t) {
  return clearTimeout(t);
};
typeof window < "u" && "requestAnimationFrame" in window && (pl = function(t) {
  return window.requestAnimationFrame(t);
}, ml = function(t) {
  return window.cancelAnimationFrame(t);
});
var ns = 0, na = /* @__PURE__ */ new Map();
function gl(e) {
  na.delete(e);
}
var kr = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  ns += 1;
  var n = ns;
  function u(a) {
    if (a === 0)
      gl(n), t();
    else {
      var o = pl(function() {
        u(a - 1);
      });
      na.set(n, o);
    }
  }
  return u(r), n;
};
kr.cancel = function(e) {
  var t = na.get(e);
  return gl(e), ml(t);
};
process.env.NODE_ENV !== "production" && (kr.ids = function() {
  return na;
});
var Qp = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
  pointer-events: none !important;
`, em = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "font-variant", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing", "word-break", "white-space"], Ea = {}, lt;
function tm(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = e.getAttribute("id") || e.getAttribute("data-reactid") || e.getAttribute("name");
  if (t && Ea[r])
    return Ea[r];
  var n = window.getComputedStyle(e), u = n.getPropertyValue("box-sizing") || n.getPropertyValue("-moz-box-sizing") || n.getPropertyValue("-webkit-box-sizing"), a = parseFloat(n.getPropertyValue("padding-bottom")) + parseFloat(n.getPropertyValue("padding-top")), o = parseFloat(n.getPropertyValue("border-bottom-width")) + parseFloat(n.getPropertyValue("border-top-width")), i = em.map(function(c) {
    return "".concat(c, ":").concat(n.getPropertyValue(c));
  }).join(";"), s = {
    sizingStyle: i,
    paddingSize: a,
    borderSize: o,
    boxSizing: u
  };
  return t && r && (Ea[r] = s), s;
}
function rm(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  lt || (lt = document.createElement("textarea"), lt.setAttribute("tab-index", "-1"), lt.setAttribute("aria-hidden", "true"), lt.setAttribute("name", "hiddenTextarea"), document.body.appendChild(lt)), e.getAttribute("wrap") ? lt.setAttribute("wrap", e.getAttribute("wrap")) : lt.removeAttribute("wrap");
  var u = tm(e, t), a = u.paddingSize, o = u.borderSize, i = u.boxSizing, s = u.sizingStyle;
  lt.setAttribute("style", "".concat(s, ";").concat(Qp)), lt.value = e.value || e.placeholder || "";
  var c = void 0, l = void 0, d, f = lt.scrollHeight;
  if (i === "border-box" ? f += o : i === "content-box" && (f -= a), r !== null || n !== null) {
    lt.value = " ";
    var v = lt.scrollHeight - a;
    r !== null && (c = v * r, i === "border-box" && (c = c + a + o), f = Math.max(c, f)), n !== null && (l = v * n, i === "border-box" && (l = l + a + o), d = f > l ? "" : "hidden", f = Math.min(l, f));
  }
  var h = {
    height: f,
    overflowY: d,
    resize: "none"
  };
  return c && (h.minHeight = c), l && (h.maxHeight = l), h;
}
var nm = ["prefixCls", "defaultValue", "value", "autoSize", "onResize", "className", "style", "disabled", "onChange", "onInternalAutoSize"], Sa = 0, wa = 1, $a = 2, um = /* @__PURE__ */ _.forwardRef(function(e, t) {
  var r = e, n = r.prefixCls, u = r.defaultValue, a = r.value, o = r.autoSize, i = r.onResize, s = r.className, c = r.style, l = r.disabled, d = r.onChange, f = r.onInternalAutoSize, v = xt(r, nm), h = Nr(u, {
    value: a,
    postState: function(K) {
      return K ?? "";
    }
  }), g = Z(h, 2), p = g[0], C = g[1], m = function(K) {
    C(K.target.value), d == null || d(K);
  }, y = _.useRef();
  _.useImperativeHandle(t, function() {
    return {
      textArea: y.current
    };
  });
  var E = _.useMemo(function() {
    return o && ne(o) === "object" ? [o.minRows, o.maxRows] : [];
  }, [o]), b = Z(E, 2), w = b[0], S = b[1], R = !!o, k = function() {
    try {
      if (document.activeElement === y.current) {
        var K = y.current, X = K.selectionStart, te = K.selectionEnd, ue = K.scrollTop;
        y.current.setSelectionRange(X, te), y.current.scrollTop = ue;
      }
    } catch {
    }
  }, T = _.useState($a), I = Z(T, 2), j = I[0], P = I[1], M = _.useState(), L = Z(M, 2), $ = L[0], A = L[1], D = function() {
    P(Sa), process.env.NODE_ENV === "test" && (f == null || f());
  };
  on(function() {
    R && D();
  }, [a, w, S, R]), on(function() {
    if (j === Sa)
      P(wa);
    else if (j === wa) {
      var G = rm(y.current, !1, w, S);
      P($a), A(G);
    } else
      k();
  }, [j]);
  var B = _.useRef(), V = function() {
    kr.cancel(B.current);
  }, H = function(K) {
    j === $a && (i == null || i(K), o && (V(), B.current = kr(function() {
      D();
    })));
  };
  _.useEffect(function() {
    return V;
  }, []);
  var q = R ? $ : null, Y = N(N({}, c), q);
  return (j === Sa || j === wa) && (Y.overflowY = "hidden", Y.overflowX = "hidden"), /* @__PURE__ */ _.createElement(ii, {
    onResize: H,
    disabled: !(o || i)
  }, /* @__PURE__ */ _.createElement("textarea", De({}, v, {
    ref: y,
    style: Y,
    className: ee(n, s, F({}, "".concat(n, "-disabled"), l)),
    disabled: l,
    value: p,
    onChange: m
  })));
}), am = ["defaultValue", "value", "onFocus", "onBlur", "onChange", "allowClear", "maxLength", "onCompositionStart", "onCompositionEnd", "suffix", "prefixCls", "showCount", "count", "className", "style", "disabled", "hidden", "classNames", "styles", "onResize", "onClear", "onPressEnter", "readOnly", "autoSize", "onKeyDown"], om = /* @__PURE__ */ O.forwardRef(function(e, t) {
  var r, n = e.defaultValue, u = e.value, a = e.onFocus, o = e.onBlur, i = e.onChange, s = e.allowClear, c = e.maxLength, l = e.onCompositionStart, d = e.onCompositionEnd, f = e.suffix, v = e.prefixCls, h = v === void 0 ? "rc-textarea" : v, g = e.showCount, p = e.count, C = e.className, m = e.style, y = e.disabled, E = e.hidden, b = e.classNames, w = e.styles, S = e.onResize, R = e.onClear, k = e.onPressEnter, T = e.readOnly, I = e.autoSize, j = e.onKeyDown, P = xt(e, am), M = Nr(n, {
    value: u,
    defaultValue: n
  }), L = Z(M, 2), $ = L[0], A = L[1], D = $ == null ? "" : String($), B = O.useState(!1), V = Z(B, 2), H = V[0], q = V[1], Y = O.useRef(!1), G = O.useState(null), K = Z(G, 2), X = K[0], te = K[1], ue = He(null), pe = He(null), le = function() {
    var ve;
    return (ve = pe.current) === null || ve === void 0 ? void 0 : ve.textArea;
  }, ke = function() {
    le().focus();
  };
  Go(t, function() {
    var Oe;
    return {
      resizableTextArea: pe.current,
      focus: ke,
      blur: function() {
        le().blur();
      },
      nativeElement: ((Oe = ue.current) === null || Oe === void 0 ? void 0 : Oe.nativeElement) || le()
    };
  }), wt(function() {
    q(function(Oe) {
      return !y && Oe;
    });
  }, [y]);
  var Ae = O.useState(null), Ne = Z(Ae, 2), U = Ne[0], ye = Ne[1];
  O.useEffect(function() {
    if (U) {
      var Oe;
      (Oe = le()).setSelectionRange.apply(Oe, re(U));
    }
  }, [U]);
  var J = Zc(p, g), ie = (r = J.max) !== null && r !== void 0 ? r : c, Pe = Number(ie) > 0, fe = J.strategy(D), Be = !!ie && fe > ie, Re = function(ve, gt) {
    var qt = gt;
    !Y.current && J.exceedFormatter && J.max && J.strategy(gt) > J.max && (qt = J.exceedFormatter(gt, {
      max: J.max
    }), gt !== qt && ye([le().selectionStart || 0, le().selectionEnd || 0])), A(qt), gu(ve.currentTarget, ve, i, qt);
  }, we = function(ve) {
    Y.current = !0, l == null || l(ve);
  }, ae = function(ve) {
    Y.current = !1, Re(ve, ve.currentTarget.value), d == null || d(ve);
  }, oe = function(ve) {
    Re(ve, ve.target.value);
  }, ge = function(ve) {
    ve.key === "Enter" && k && k(ve), j == null || j(ve);
  }, he = function(ve) {
    q(!0), a == null || a(ve);
  }, xe = function(ve) {
    q(!1), o == null || o(ve);
  }, Ue = function(ve) {
    A(""), ke(), gu(le(), ve, i);
  }, mt = f, Tt;
  J.show && (J.showFormatter ? Tt = J.showFormatter({
    value: D,
    count: fe,
    maxLength: ie
  }) : Tt = "".concat(fe).concat(Pe ? " / ".concat(ie) : ""), mt = /* @__PURE__ */ O.createElement(O.Fragment, null, mt, /* @__PURE__ */ O.createElement("span", {
    className: ee("".concat(h, "-data-count"), b == null ? void 0 : b.count),
    style: w == null ? void 0 : w.count
  }, Tt)));
  var Vr = function(ve) {
    var gt;
    S == null || S(ve), (gt = le()) !== null && gt !== void 0 && gt.style.height && te(!0);
  }, Hr = !I && !g && !s;
  return /* @__PURE__ */ O.createElement(Xc, {
    ref: ue,
    value: D,
    allowClear: s,
    handleReset: Ue,
    suffix: mt,
    prefixCls: h,
    classNames: N(N({}, b), {}, {
      affixWrapper: ee(b == null ? void 0 : b.affixWrapper, F(F({}, "".concat(h, "-show-count"), g), "".concat(h, "-textarea-allow-clear"), s))
    }),
    disabled: y,
    focused: H,
    className: ee(C, Be && "".concat(h, "-out-of-range")),
    style: N(N({}, m), X && !Hr ? {
      height: "auto"
    } : {}),
    dataAttrs: {
      affixWrapper: {
        "data-count": typeof Tt == "string" ? Tt : void 0
      }
    },
    hidden: E,
    readOnly: T,
    onClear: R
  }, /* @__PURE__ */ O.createElement(um, De({}, P, {
    autoSize: I,
    maxLength: c,
    onKeyDown: ge,
    onChange: oe,
    onFocus: he,
    onBlur: xe,
    onCompositionStart: we,
    onCompositionEnd: ae,
    className: ee(b == null ? void 0 : b.textarea),
    style: N(N({}, w == null ? void 0 : w.textarea), {}, {
      resize: m == null ? void 0 : m.resize
    }),
    disabled: y,
    prefixCls: h,
    onResize: Vr,
    ref: pe,
    readOnly: T
  })));
}), im = { icon: { tag: "svg", attrs: { "fill-rule": "evenodd", viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" } }] }, name: "close-circle", theme: "filled" };
const Ke = Math.round;
function Fa(e, t) {
  const r = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], n = r.map((u) => parseFloat(u));
  for (let u = 0; u < 3; u += 1)
    n[u] = t(n[u] || 0, r[u] || "", u);
  return r[3] ? n[3] = r[3].includes("%") ? n[3] / 100 : n[3] : n[3] = 1, n;
}
const us = (e, t, r) => r === 0 ? e : e / 100;
function Xr(e, t) {
  const r = t || 255;
  return e > r ? r : e < 0 ? 0 : e;
}
class qe {
  constructor(t) {
    F(this, "isValid", !0), F(this, "r", 0), F(this, "g", 0), F(this, "b", 0), F(this, "a", 1), F(this, "_h", void 0), F(this, "_s", void 0), F(this, "_l", void 0), F(this, "_v", void 0), F(this, "_max", void 0), F(this, "_min", void 0), F(this, "_brightness", void 0);
    function r(n) {
      return n[0] in t && n[1] in t && n[2] in t;
    }
    if (t) if (typeof t == "string") {
      let u = function(a) {
        return n.startsWith(a);
      };
      const n = t.trim();
      /^#?[A-F\d]{3,8}$/i.test(n) ? this.fromHexString(n) : u("rgb") ? this.fromRgbString(n) : u("hsl") ? this.fromHslString(n) : (u("hsv") || u("hsb")) && this.fromHsvString(n);
    } else if (t instanceof qe)
      this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this._h = t._h, this._s = t._s, this._l = t._l, this._v = t._v;
    else if (r("rgb"))
      this.r = Xr(t.r), this.g = Xr(t.g), this.b = Xr(t.b), this.a = typeof t.a == "number" ? Xr(t.a, 1) : 1;
    else if (r("hsl"))
      this.fromHsl(t);
    else if (r("hsv"))
      this.fromHsv(t);
    else
      throw new Error("@ant-design/fast-color: unsupported input " + JSON.stringify(t));
  }
  // ======================= Setter =======================
  setR(t) {
    return this._sc("r", t);
  }
  setG(t) {
    return this._sc("g", t);
  }
  setB(t) {
    return this._sc("b", t);
  }
  setA(t) {
    return this._sc("a", t, 1);
  }
  setHue(t) {
    const r = this.toHsv();
    return r.h = t, this._c(r);
  }
  // ======================= Getter =======================
  /**
   * Returns the perceived luminance of a color, from 0-1.
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  getLuminance() {
    function t(a) {
      const o = a / 255;
      return o <= 0.03928 ? o / 12.92 : Math.pow((o + 0.055) / 1.055, 2.4);
    }
    const r = t(this.r), n = t(this.g), u = t(this.b);
    return 0.2126 * r + 0.7152 * n + 0.0722 * u;
  }
  getHue() {
    if (typeof this._h > "u") {
      const t = this.getMax() - this.getMin();
      t === 0 ? this._h = 0 : this._h = Ke(60 * (this.r === this.getMax() ? (this.g - this.b) / t + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / t + 2 : (this.r - this.g) / t + 4));
    }
    return this._h;
  }
  getSaturation() {
    if (typeof this._s > "u") {
      const t = this.getMax() - this.getMin();
      t === 0 ? this._s = 0 : this._s = t / this.getMax();
    }
    return this._s;
  }
  getLightness() {
    return typeof this._l > "u" && (this._l = (this.getMax() + this.getMin()) / 510), this._l;
  }
  getValue() {
    return typeof this._v > "u" && (this._v = this.getMax() / 255), this._v;
  }
  /**
   * Returns the perceived brightness of the color, from 0-255.
   * Note: this is not the b of HSB
   * @see http://www.w3.org/TR/AERT#color-contrast
   */
  getBrightness() {
    return typeof this._brightness > "u" && (this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1e3), this._brightness;
  }
  // ======================== Func ========================
  darken(t = 10) {
    const r = this.getHue(), n = this.getSaturation();
    let u = this.getLightness() - t / 100;
    return u < 0 && (u = 0), this._c({
      h: r,
      s: n,
      l: u,
      a: this.a
    });
  }
  lighten(t = 10) {
    const r = this.getHue(), n = this.getSaturation();
    let u = this.getLightness() + t / 100;
    return u > 1 && (u = 1), this._c({
      h: r,
      s: n,
      l: u,
      a: this.a
    });
  }
  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */
  mix(t, r = 50) {
    const n = this._c(t), u = r / 100, a = (i) => (n[i] - this[i]) * u + this[i], o = {
      r: Ke(a("r")),
      g: Ke(a("g")),
      b: Ke(a("b")),
      a: Ke(a("a") * 100) / 100
    };
    return this._c(o);
  }
  /**
   * Mix the color with pure white, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return white.
   */
  tint(t = 10) {
    return this.mix({
      r: 255,
      g: 255,
      b: 255,
      a: 1
    }, t);
  }
  /**
   * Mix the color with pure black, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return black.
   */
  shade(t = 10) {
    return this.mix({
      r: 0,
      g: 0,
      b: 0,
      a: 1
    }, t);
  }
  onBackground(t) {
    const r = this._c(t), n = this.a + r.a * (1 - this.a), u = (a) => Ke((this[a] * this.a + r[a] * r.a * (1 - this.a)) / n);
    return this._c({
      r: u("r"),
      g: u("g"),
      b: u("b"),
      a: n
    });
  }
  // ======================= Status =======================
  isDark() {
    return this.getBrightness() < 128;
  }
  isLight() {
    return this.getBrightness() >= 128;
  }
  // ======================== MISC ========================
  equals(t) {
    return this.r === t.r && this.g === t.g && this.b === t.b && this.a === t.a;
  }
  clone() {
    return this._c(this);
  }
  // ======================= Format =======================
  toHexString() {
    let t = "#";
    const r = (this.r || 0).toString(16);
    t += r.length === 2 ? r : "0" + r;
    const n = (this.g || 0).toString(16);
    t += n.length === 2 ? n : "0" + n;
    const u = (this.b || 0).toString(16);
    if (t += u.length === 2 ? u : "0" + u, typeof this.a == "number" && this.a >= 0 && this.a < 1) {
      const a = Ke(this.a * 255).toString(16);
      t += a.length === 2 ? a : "0" + a;
    }
    return t;
  }
  /** CSS support color pattern */
  toHsl() {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      l: this.getLightness(),
      a: this.a
    };
  }
  /** CSS support color pattern */
  toHslString() {
    const t = this.getHue(), r = Ke(this.getSaturation() * 100), n = Ke(this.getLightness() * 100);
    return this.a !== 1 ? `hsla(${t},${r}%,${n}%,${this.a})` : `hsl(${t},${r}%,${n}%)`;
  }
  /** Same as toHsb */
  toHsv() {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      v: this.getValue(),
      a: this.a
    };
  }
  toRgb() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a
    };
  }
  toRgbString() {
    return this.a !== 1 ? `rgba(${this.r},${this.g},${this.b},${this.a})` : `rgb(${this.r},${this.g},${this.b})`;
  }
  toString() {
    return this.toRgbString();
  }
  // ====================== Privates ======================
  /** Return a new FastColor object with one channel changed */
  _sc(t, r, n) {
    const u = this.clone();
    return u[t] = Xr(r, n), u;
  }
  _c(t) {
    return new this.constructor(t);
  }
  getMax() {
    return typeof this._max > "u" && (this._max = Math.max(this.r, this.g, this.b)), this._max;
  }
  getMin() {
    return typeof this._min > "u" && (this._min = Math.min(this.r, this.g, this.b)), this._min;
  }
  fromHexString(t) {
    const r = t.replace("#", "");
    function n(u, a) {
      return parseInt(r[u] + r[a || u], 16);
    }
    r.length < 6 ? (this.r = n(0), this.g = n(1), this.b = n(2), this.a = r[3] ? n(3) / 255 : 1) : (this.r = n(0, 1), this.g = n(2, 3), this.b = n(4, 5), this.a = r[6] ? n(6, 7) / 255 : 1);
  }
  fromHsl({
    h: t,
    s: r,
    l: n,
    a: u
  }) {
    if (this._h = t % 360, this._s = r, this._l = n, this.a = typeof u == "number" ? u : 1, r <= 0) {
      const f = Ke(n * 255);
      this.r = f, this.g = f, this.b = f;
    }
    let a = 0, o = 0, i = 0;
    const s = t / 60, c = (1 - Math.abs(2 * n - 1)) * r, l = c * (1 - Math.abs(s % 2 - 1));
    s >= 0 && s < 1 ? (a = c, o = l) : s >= 1 && s < 2 ? (a = l, o = c) : s >= 2 && s < 3 ? (o = c, i = l) : s >= 3 && s < 4 ? (o = l, i = c) : s >= 4 && s < 5 ? (a = l, i = c) : s >= 5 && s < 6 && (a = c, i = l);
    const d = n - c / 2;
    this.r = Ke((a + d) * 255), this.g = Ke((o + d) * 255), this.b = Ke((i + d) * 255);
  }
  fromHsv({
    h: t,
    s: r,
    v: n,
    a: u
  }) {
    this._h = t % 360, this._s = r, this._v = n, this.a = typeof u == "number" ? u : 1;
    const a = Ke(n * 255);
    if (this.r = a, this.g = a, this.b = a, r <= 0)
      return;
    const o = t / 60, i = Math.floor(o), s = o - i, c = Ke(n * (1 - r) * 255), l = Ke(n * (1 - r * s) * 255), d = Ke(n * (1 - r * (1 - s)) * 255);
    switch (i) {
      case 0:
        this.g = d, this.b = c;
        break;
      case 1:
        this.r = l, this.b = c;
        break;
      case 2:
        this.r = c, this.b = d;
        break;
      case 3:
        this.r = c, this.g = l;
        break;
      case 4:
        this.r = d, this.g = c;
        break;
      case 5:
      default:
        this.g = c, this.b = l;
        break;
    }
  }
  fromHsvString(t) {
    const r = Fa(t, us);
    this.fromHsv({
      h: r[0],
      s: r[1],
      v: r[2],
      a: r[3]
    });
  }
  fromHslString(t) {
    const r = Fa(t, us);
    this.fromHsl({
      h: r[0],
      s: r[1],
      l: r[2],
      a: r[3]
    });
  }
  fromRgbString(t) {
    const r = Fa(t, (n, u) => (
      // Convert percentage to number. e.g. 50% -> 128
      u.includes("%") ? Ke(n / 100 * 255) : n
    ));
    this.r = r[0], this.g = r[1], this.b = r[2], this.a = r[3];
  }
}
var Gn = 2, as = 0.16, sm = 0.05, cm = 0.05, lm = 0.15, vl = 5, bl = 4, dm = [{
  index: 7,
  amount: 15
}, {
  index: 6,
  amount: 25
}, {
  index: 5,
  amount: 30
}, {
  index: 5,
  amount: 45
}, {
  index: 5,
  amount: 65
}, {
  index: 5,
  amount: 85
}, {
  index: 4,
  amount: 90
}, {
  index: 3,
  amount: 95
}, {
  index: 2,
  amount: 97
}, {
  index: 1,
  amount: 98
}];
function os(e, t, r) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = r ? Math.round(e.h) - Gn * t : Math.round(e.h) + Gn * t : n = r ? Math.round(e.h) + Gn * t : Math.round(e.h) - Gn * t, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function is(e, t, r) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return r ? n = e.s - as * t : t === bl ? n = e.s + as : n = e.s + sm * t, n > 1 && (n = 1), r && t === vl && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Math.round(n * 100) / 100;
}
function ss(e, t, r) {
  var n;
  return r ? n = e.v + cm * t : n = e.v - lm * t, n = Math.max(0, Math.min(1, n)), Math.round(n * 100) / 100;
}
function fn(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [], n = new qe(e), u = n.toHsv(), a = vl; a > 0; a -= 1) {
    var o = new qe({
      h: os(u, a, !0),
      s: is(u, a, !0),
      v: ss(u, a, !0)
    });
    r.push(o);
  }
  r.push(n);
  for (var i = 1; i <= bl; i += 1) {
    var s = new qe({
      h: os(u, i),
      s: is(u, i),
      v: ss(u, i)
    });
    r.push(s);
  }
  return t.theme === "dark" ? dm.map(function(c) {
    var l = c.index, d = c.amount;
    return new qe(t.backgroundColor || "#141414").mix(r[l], d).toHexString();
  }) : r.map(function(c) {
    return c.toHexString();
  });
}
var ka = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1677FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
}, ro = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
ro.primary = ro[5];
var no = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
no.primary = no[5];
var uo = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
uo.primary = uo[5];
var ao = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
ao.primary = ao[5];
var oo = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
oo.primary = oo[5];
var io = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
io.primary = io[5];
var so = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
so.primary = so[5];
var co = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
co.primary = co[5];
var xu = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
xu.primary = xu[5];
var lo = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
lo.primary = lo[5];
var fo = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
fo.primary = fo[5];
var ho = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
ho.primary = ho[5];
var po = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
po.primary = po[5];
var Aa = {
  red: ro,
  volcano: no,
  orange: uo,
  gold: ao,
  yellow: oo,
  lime: io,
  green: so,
  cyan: co,
  blue: xu,
  geekblue: lo,
  purple: fo,
  magenta: ho,
  grey: po
}, si = /* @__PURE__ */ Ko({});
function fm(e, t) {
  if (!e)
    return !1;
  if (e.contains)
    return e.contains(t);
  for (var r = t; r; ) {
    if (r === e)
      return !0;
    r = r.parentNode;
  }
  return !1;
}
var cs = "data-rc-order", ls = "data-rc-priority", hm = "rc-util-key", mo = /* @__PURE__ */ new Map();
function yl() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.mark;
  return t ? t.startsWith("data-") ? t : "data-".concat(t) : hm;
}
function ua(e) {
  if (e.attachTo)
    return e.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function pm(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function ci(e) {
  return Array.from((mo.get(e) || e).children).filter(function(t) {
    return t.tagName === "STYLE";
  });
}
function xl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Ht())
    return null;
  var r = t.csp, n = t.prepend, u = t.priority, a = u === void 0 ? 0 : u, o = pm(n), i = o === "prependQueue", s = document.createElement("style");
  s.setAttribute(cs, o), i && a && s.setAttribute(ls, "".concat(a)), r != null && r.nonce && (s.nonce = r == null ? void 0 : r.nonce), s.innerHTML = e;
  var c = ua(t), l = c.firstChild;
  if (n) {
    if (i) {
      var d = (t.styles || ci(c)).filter(function(f) {
        if (!["prepend", "prependQueue"].includes(f.getAttribute(cs)))
          return !1;
        var v = Number(f.getAttribute(ls) || 0);
        return a >= v;
      });
      if (d.length)
        return c.insertBefore(s, d[d.length - 1].nextSibling), s;
    }
    c.insertBefore(s, l);
  } else
    c.appendChild(s);
  return s;
}
function _l(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = ua(t);
  return (t.styles || ci(r)).find(function(n) {
    return n.getAttribute(yl(t)) === e;
  });
}
function Cl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = _l(e, t);
  if (r) {
    var n = ua(t);
    n.removeChild(r);
  }
}
function mm(e, t) {
  var r = mo.get(e);
  if (!r || !fm(document, r)) {
    var n = xl("", t), u = n.parentNode;
    mo.set(e, u), e.removeChild(n);
  }
}
function ir(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = ua(r), u = ci(n), a = N(N({}, r), {}, {
    styles: u
  });
  mm(n, a);
  var o = _l(t, a);
  if (o) {
    var i, s;
    if ((i = a.csp) !== null && i !== void 0 && i.nonce && o.nonce !== ((s = a.csp) === null || s === void 0 ? void 0 : s.nonce)) {
      var c;
      o.nonce = (c = a.csp) === null || c === void 0 ? void 0 : c.nonce;
    }
    return o.innerHTML !== e && (o.innerHTML = e), o;
  }
  var l = xl(e, a);
  return l.setAttribute(yl(a), t), l;
}
function El(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e);
}
function gm(e) {
  return El(e) instanceof ShadowRoot;
}
function vm(e) {
  return gm(e) ? El(e) : null;
}
function bm(e) {
  return e.replace(/-(.)/g, function(t, r) {
    return r.toUpperCase();
  });
}
function ym(e, t) {
  Ie(e, "[@ant-design/icons] ".concat(t));
}
function ds(e) {
  return ne(e) === "object" && typeof e.name == "string" && typeof e.theme == "string" && (ne(e.icon) === "object" || typeof e.icon == "function");
}
function fs() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(e).reduce(function(t, r) {
    var n = e[r];
    switch (r) {
      case "class":
        t.className = n, delete t.class;
        break;
      default:
        delete t[r], t[bm(r)] = n;
    }
    return t;
  }, {});
}
function go(e, t, r) {
  return r ? /* @__PURE__ */ O.createElement(e.tag, N(N({
    key: t
  }, fs(e.attrs)), r), (e.children || []).map(function(n, u) {
    return go(n, "".concat(t, "-").concat(e.tag, "-").concat(u));
  })) : /* @__PURE__ */ O.createElement(e.tag, N({
    key: t
  }, fs(e.attrs)), (e.children || []).map(function(n, u) {
    return go(n, "".concat(t, "-").concat(e.tag, "-").concat(u));
  }));
}
function Sl(e) {
  return fn(e)[0];
}
function wl(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
var xm = `
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`, _m = function(t) {
  var r = Bt(si), n = r.csp, u = r.prefixCls, a = r.layer, o = xm;
  u && (o = o.replace(/anticon/g, u)), a && (o = "@layer ".concat(a, ` {
`).concat(o, `
}`)), wt(function() {
    var i = t.current, s = vm(i);
    ir(o, "@ant-design-icons", {
      prepend: !a,
      csp: n,
      attachTo: s
    });
  }, []);
}, Cm = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"], nn = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function Em(e) {
  var t = e.primaryColor, r = e.secondaryColor;
  nn.primaryColor = t, nn.secondaryColor = r || Sl(t), nn.calculated = !!r;
}
function Sm() {
  return N({}, nn);
}
var jr = function(t) {
  var r = t.icon, n = t.className, u = t.onClick, a = t.style, o = t.primaryColor, i = t.secondaryColor, s = xt(t, Cm), c = _.useRef(), l = nn;
  if (o && (l = {
    primaryColor: o,
    secondaryColor: i || Sl(o)
  }), _m(c), ym(ds(r), "icon should be icon definiton, but got ".concat(r)), !ds(r))
    return null;
  var d = r;
  return d && typeof d.icon == "function" && (d = N(N({}, d), {}, {
    icon: d.icon(l.primaryColor, l.secondaryColor)
  })), go(d.icon, "svg-".concat(d.name), N(N({
    className: n,
    onClick: u,
    style: a,
    "data-icon": d.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }, s), {}, {
    ref: c
  }));
};
jr.displayName = "IconReact";
jr.getTwoToneColors = Sm;
jr.setTwoToneColors = Em;
function $l(e) {
  var t = wl(e), r = Z(t, 2), n = r[0], u = r[1];
  return jr.setTwoToneColors({
    primaryColor: n,
    secondaryColor: u
  });
}
function wm() {
  var e = jr.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var $m = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
$l(xu.primary);
var aa = /* @__PURE__ */ _.forwardRef(function(e, t) {
  var r = e.className, n = e.icon, u = e.spin, a = e.rotate, o = e.tabIndex, i = e.onClick, s = e.twoToneColor, c = xt(e, $m), l = _.useContext(si), d = l.prefixCls, f = d === void 0 ? "anticon" : d, v = l.rootClassName, h = ee(v, f, F(F({}, "".concat(f, "-").concat(n.name), !!n.name), "".concat(f, "-spin"), !!u || n.name === "loading"), r), g = o;
  g === void 0 && i && (g = -1);
  var p = a ? {
    msTransform: "rotate(".concat(a, "deg)"),
    transform: "rotate(".concat(a, "deg)")
  } : void 0, C = wl(s), m = Z(C, 2), y = m[0], E = m[1];
  return /* @__PURE__ */ _.createElement("span", De({
    role: "img",
    "aria-label": n.name
  }, c, {
    ref: t,
    tabIndex: g,
    onClick: i,
    className: h
  }), /* @__PURE__ */ _.createElement(jr, {
    icon: n,
    primaryColor: y,
    secondaryColor: E,
    style: p
  }));
});
aa.displayName = "AntdIcon";
aa.getTwoToneColor = wm;
aa.setTwoToneColor = $l;
var Fm = function(t, r) {
  return /* @__PURE__ */ _.createElement(aa, De({}, t, {
    ref: r,
    icon: im
  }));
}, Fl = /* @__PURE__ */ _.forwardRef(Fm);
process.env.NODE_ENV !== "production" && (Fl.displayName = "CloseCircleFilled");
const kl = (e) => {
  let t;
  return typeof e == "object" && (e != null && e.clearIcon) ? t = e : e && (t = {
    clearIcon: /* @__PURE__ */ O.createElement(Fl, null)
  }), t;
};
function vo(e, t, r) {
  return ee({
    [`${e}-status-success`]: t === "success",
    [`${e}-status-warning`]: t === "warning",
    [`${e}-status-error`]: t === "error",
    [`${e}-status-validating`]: t === "validating",
    [`${e}-has-feedback`]: r
  });
}
const Al = (e, t) => t || e;
function Dl() {
}
let Lt = null;
function km() {
  Lt = null, Qc();
}
let li = Dl;
process.env.NODE_ENV !== "production" && (li = (e, t, r) => {
  Ie(e, `[antd: ${t}] ${r}`), process.env.NODE_ENV === "test" && km();
});
const Tl = /* @__PURE__ */ _.createContext({}), cr = process.env.NODE_ENV !== "production" ? (e) => {
  const {
    strict: t
  } = _.useContext(Tl), r = (n, u, a) => {
    if (!n)
      if (t === !1 && u === "deprecated") {
        const o = Lt;
        Lt || (Lt = {}), Lt[e] = Lt[e] || [], Lt[e].includes(a || "") || Lt[e].push(a || ""), o || console.warn("[antd] There exists deprecated usage in your code:", Lt);
      } else
        process.env.NODE_ENV !== "production" && li(n, e, a);
  };
  return r.deprecated = (n, u, a, o) => {
    r(n, "deprecated", `\`${u}\` is deprecated. Please use \`${a}\` instead.${o ? ` ${o}` : ""}`);
  }, r;
} : () => {
  const e = () => {
  };
  return e.deprecated = Dl, e;
}, oa = li, bo = "ant", di = "anticon", Am = ["outlined", "borderless", "filled", "underlined"], Dm = (e, t) => t || (e ? `${bo}-${e}` : bo), er = /* @__PURE__ */ _.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: Dm,
  iconPrefixCls: di
}), {
  Consumer: w3
} = er, hs = {};
function Rl(e) {
  const t = _.useContext(er), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: u
  } = t, a = t[e];
  return Object.assign(Object.assign({
    classNames: hs,
    styles: hs
  }, a), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: u
  });
}
const hn = /* @__PURE__ */ _.createContext(!1), Tm = (e) => {
  let {
    children: t,
    disabled: r
  } = e;
  const n = _.useContext(hn);
  return /* @__PURE__ */ _.createElement(hn.Provider, {
    value: r ?? n
  }, t);
};
function pn(e) {
  for (var t = 0, r, n = 0, u = e.length; u >= 4; ++n, u -= 4)
    r = e.charCodeAt(n) & 255 | (e.charCodeAt(++n) & 255) << 8 | (e.charCodeAt(++n) & 255) << 16 | (e.charCodeAt(++n) & 255) << 24, r = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), r ^= /* k >>> r: */
    r >>> 24, t = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (u) {
    case 3:
      t ^= (e.charCodeAt(n + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(n + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(n) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
function yo(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = /* @__PURE__ */ new Set();
  function u(a, o) {
    var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, s = n.has(a);
    if (Ie(!s, "Warning: There may be circular references"), s)
      return !1;
    if (a === o)
      return !0;
    if (r && i > 1)
      return !1;
    n.add(a);
    var c = i + 1;
    if (Array.isArray(a)) {
      if (!Array.isArray(o) || a.length !== o.length)
        return !1;
      for (var l = 0; l < a.length; l++)
        if (!u(a[l], o[l], c))
          return !1;
      return !0;
    }
    if (a && o && ne(a) === "object" && ne(o) === "object") {
      var d = Object.keys(a);
      return d.length !== Object.keys(o).length ? !1 : d.every(function(f) {
        return u(a[f], o[f], c);
      });
    }
    return !1;
  }
  return u(e, t);
}
var Rm = "%";
function xo(e) {
  return e.join(Rm);
}
var Pm = /* @__PURE__ */ function() {
  function e(t) {
    Qe(this, e), F(this, "instanceId", void 0), F(this, "cache", /* @__PURE__ */ new Map()), this.instanceId = t;
  }
  return et(e, [{
    key: "get",
    value: function(r) {
      return this.opGet(xo(r));
    }
    /** A fast get cache with `get` concat. */
  }, {
    key: "opGet",
    value: function(r) {
      return this.cache.get(r) || null;
    }
  }, {
    key: "update",
    value: function(r, n) {
      return this.opUpdate(xo(r), n);
    }
    /** A fast get cache with `get` concat. */
  }, {
    key: "opUpdate",
    value: function(r, n) {
      var u = this.cache.get(r), a = n(u);
      a === null ? this.cache.delete(r) : this.cache.set(r, a);
    }
  }]), e;
}(), Ar = "data-token-hash", $t = "data-css-hash", Om = "data-cache-path", Zt = "__cssinjs_instance__";
function Mm() {
  var e = Math.random().toString(12).slice(2);
  if (typeof document < "u" && document.head && document.body) {
    var t = document.body.querySelectorAll("style[".concat($t, "]")) || [], r = document.head.firstChild;
    Array.from(t).forEach(function(u) {
      u[Zt] = u[Zt] || e, u[Zt] === e && document.head.insertBefore(u, r);
    });
    var n = {};
    Array.from(document.querySelectorAll("style[".concat($t, "]"))).forEach(function(u) {
      var a = u.getAttribute($t);
      if (n[a]) {
        if (u[Zt] === e) {
          var o;
          (o = u.parentNode) === null || o === void 0 || o.removeChild(u);
        }
      } else
        n[a] = !0;
    });
  }
  return new Pm(e);
}
var In = /* @__PURE__ */ _.createContext({
  hashPriority: "low",
  cache: Mm(),
  defaultCache: !0
});
function Im(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
var fi = /* @__PURE__ */ function() {
  function e() {
    Qe(this, e), F(this, "cache", void 0), F(this, "keys", void 0), F(this, "cacheCallTimes", void 0), this.cache = /* @__PURE__ */ new Map(), this.keys = [], this.cacheCallTimes = 0;
  }
  return et(e, [{
    key: "size",
    value: function() {
      return this.keys.length;
    }
  }, {
    key: "internalGet",
    value: function(r) {
      var n, u, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, o = {
        map: this.cache
      };
      return r.forEach(function(i) {
        if (!o)
          o = void 0;
        else {
          var s;
          o = (s = o) === null || s === void 0 || (s = s.map) === null || s === void 0 ? void 0 : s.get(i);
        }
      }), (n = o) !== null && n !== void 0 && n.value && a && (o.value[1] = this.cacheCallTimes++), (u = o) === null || u === void 0 ? void 0 : u.value;
    }
  }, {
    key: "get",
    value: function(r) {
      var n;
      return (n = this.internalGet(r, !0)) === null || n === void 0 ? void 0 : n[0];
    }
  }, {
    key: "has",
    value: function(r) {
      return !!this.internalGet(r);
    }
  }, {
    key: "set",
    value: function(r, n) {
      var u = this;
      if (!this.has(r)) {
        if (this.size() + 1 > e.MAX_CACHE_SIZE + e.MAX_CACHE_OFFSET) {
          var a = this.keys.reduce(function(c, l) {
            var d = Z(c, 2), f = d[1];
            return u.internalGet(l)[1] < f ? [l, u.internalGet(l)[1]] : c;
          }, [this.keys[0], this.cacheCallTimes]), o = Z(a, 1), i = o[0];
          this.delete(i);
        }
        this.keys.push(r);
      }
      var s = this.cache;
      r.forEach(function(c, l) {
        if (l === r.length - 1)
          s.set(c, {
            value: [n, u.cacheCallTimes++]
          });
        else {
          var d = s.get(c);
          d ? d.map || (d.map = /* @__PURE__ */ new Map()) : s.set(c, {
            map: /* @__PURE__ */ new Map()
          }), s = s.get(c).map;
        }
      });
    }
  }, {
    key: "deleteByPath",
    value: function(r, n) {
      var u = r.get(n[0]);
      if (n.length === 1) {
        var a;
        return u.map ? r.set(n[0], {
          map: u.map
        }) : r.delete(n[0]), (a = u.value) === null || a === void 0 ? void 0 : a[0];
      }
      var o = this.deleteByPath(u.map, n.slice(1));
      return (!u.map || u.map.size === 0) && !u.value && r.delete(n[0]), o;
    }
  }, {
    key: "delete",
    value: function(r) {
      if (this.has(r))
        return this.keys = this.keys.filter(function(n) {
          return !Im(n, r);
        }), this.deleteByPath(this.cache, r);
    }
  }]), e;
}();
F(fi, "MAX_CACHE_SIZE", 20);
F(fi, "MAX_CACHE_OFFSET", 5);
var ps = 0, Pl = /* @__PURE__ */ function() {
  function e(t) {
    Qe(this, e), F(this, "derivatives", void 0), F(this, "id", void 0), this.derivatives = Array.isArray(t) ? t : [t], this.id = ps, t.length === 0 && cn(t.length > 0, "[Ant Design CSS-in-JS] Theme should have at least one derivative function."), ps += 1;
  }
  return et(e, [{
    key: "getDerivativeToken",
    value: function(r) {
      return this.derivatives.reduce(function(n, u) {
        return u(r, n);
      }, void 0);
    }
  }]), e;
}(), Da = new fi();
function _u(e) {
  var t = Array.isArray(e) ? e : [e];
  return Da.has(t) || Da.set(t, new Pl(t)), Da.get(t);
}
var Nm = /* @__PURE__ */ new WeakMap(), Ta = {};
function jm(e, t) {
  for (var r = Nm, n = 0; n < t.length; n += 1) {
    var u = t[n];
    r.has(u) || r.set(u, /* @__PURE__ */ new WeakMap()), r = r.get(u);
  }
  return r.has(Ta) || r.set(Ta, e()), r.get(Ta);
}
var ms = /* @__PURE__ */ new WeakMap();
function un(e) {
  var t = ms.get(e) || "";
  return t || (Object.keys(e).forEach(function(r) {
    var n = e[r];
    t += r, n instanceof Pl ? t += n.id : n && ne(n) === "object" ? t += un(n) : t += n;
  }), t = pn(t), ms.set(e, t)), t;
}
function gs(e, t) {
  return pn("".concat(t, "_").concat(un(e)));
}
var _o = Ht();
function Se(e) {
  return typeof e == "number" ? "".concat(e, "px") : e;
}
function Cu(e, t, r) {
  var n, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
  if (a)
    return e;
  var o = N(N({}, u), {}, (n = {}, F(n, Ar, t), F(n, $t, r), n)), i = Object.keys(o).map(function(s) {
    var c = o[s];
    return c ? "".concat(s, '="').concat(c, '"') : null;
  }).filter(function(s) {
    return s;
  }).join(" ");
  return "<style ".concat(i, ">").concat(e, "</style>");
}
var cu = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return "--".concat(r ? "".concat(r, "-") : "").concat(t).replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
}, Lm = function(t, r, n) {
  return Object.keys(t).length ? ".".concat(r).concat(n != null && n.scope ? ".".concat(n.scope) : "", "{").concat(Object.entries(t).map(function(u) {
    var a = Z(u, 2), o = a[0], i = a[1];
    return "".concat(o, ":").concat(i, ";");
  }).join(""), "}") : "";
}, Ol = function(t, r, n) {
  var u = {}, a = {};
  return Object.entries(t).forEach(function(o) {
    var i, s, c = Z(o, 2), l = c[0], d = c[1];
    if (n != null && (i = n.preserve) !== null && i !== void 0 && i[l])
      a[l] = d;
    else if ((typeof d == "string" || typeof d == "number") && !(n != null && (s = n.ignore) !== null && s !== void 0 && s[l])) {
      var f, v = cu(l, n == null ? void 0 : n.prefix);
      u[v] = typeof d == "number" && !(n != null && (f = n.unitless) !== null && f !== void 0 && f[l]) ? "".concat(d, "px") : String(d), a[l] = "var(".concat(v, ")");
    }
  }), [a, Lm(u, r, {
    scope: n == null ? void 0 : n.scope
  })];
}, zm = N({}, _), vs = zm.useInsertionEffect, Bm = function(t, r, n) {
  _.useMemo(t, n), on(function() {
    return r(!0);
  }, n);
}, Vm = vs ? function(e, t, r) {
  return vs(function() {
    return e(), t();
  }, r);
} : Bm, Hm = N({}, _), qm = Hm.useInsertionEffect, Wm = function(t) {
  var r = [], n = !1;
  function u(a) {
    if (n) {
      process.env.NODE_ENV !== "production" && cn(!1, "[Ant Design CSS-in-JS] You are registering a cleanup function after unmount, which will not have any effect.");
      return;
    }
    r.push(a);
  }
  return _.useEffect(function() {
    return n = !1, function() {
      n = !0, r.length && r.forEach(function(a) {
        return a();
      });
    };
  }, t), u;
}, Um = function() {
  return function(t) {
    t();
  };
}, Ym = typeof qm < "u" ? Wm : Um;
function Gm() {
  return !1;
}
var Co = !1;
function Km() {
  return Co;
}
const Xm = process.env.NODE_ENV === "production" ? Gm : Km;
if (process.env.NODE_ENV !== "production" && typeof module < "u" && module && module.hot && typeof window < "u") {
  var Kn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : null;
  if (Kn && typeof Kn.webpackHotUpdate == "function") {
    var Zm = Kn.webpackHotUpdate;
    Kn.webpackHotUpdate = function() {
      return Co = !0, setTimeout(function() {
        Co = !1;
      }, 0), Zm.apply(void 0, arguments);
    };
  }
}
function hi(e, t, r, n, u) {
  var a = _.useContext(In), o = a.cache, i = [e].concat(re(t)), s = xo(i), c = Ym([s]), l = Xm(), d = function(g) {
    o.opUpdate(s, function(p) {
      var C = p || [void 0, void 0], m = Z(C, 2), y = m[0], E = y === void 0 ? 0 : y, b = m[1], w = b;
      process.env.NODE_ENV !== "production" && b && l && (n == null || n(w, l), w = null);
      var S = w || r(), R = [E, S];
      return g ? g(R) : R;
    });
  };
  _.useMemo(
    function() {
      d();
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [s]
    /* eslint-enable */
  );
  var f = o.opGet(s);
  process.env.NODE_ENV !== "production" && !f && (d(), f = o.opGet(s));
  var v = f[1];
  return Vm(function() {
    u == null || u(v);
  }, function(h) {
    return d(function(g) {
      var p = Z(g, 2), C = p[0], m = p[1];
      return h && C === 0 && (u == null || u(v)), [C + 1, m];
    }), function() {
      o.opUpdate(s, function(g) {
        var p = g || [], C = Z(p, 2), m = C[0], y = m === void 0 ? 0 : m, E = C[1], b = y - 1;
        return b === 0 ? (c(function() {
          (h || !o.opGet(s)) && (n == null || n(E, !1));
        }), null) : [y - 1, E];
      });
    };
  }, [s]), v;
}
var Jm = {}, Qm = process.env.NODE_ENV !== "production" ? "css-dev-only-do-not-override" : "css", ar = /* @__PURE__ */ new Map();
function e1(e) {
  ar.set(e, (ar.get(e) || 0) + 1);
}
function t1(e, t) {
  if (typeof document < "u") {
    var r = document.querySelectorAll("style[".concat(Ar, '="').concat(e, '"]'));
    r.forEach(function(n) {
      if (n[Zt] === t) {
        var u;
        (u = n.parentNode) === null || u === void 0 || u.removeChild(n);
      }
    });
  }
}
var r1 = 0;
function n1(e, t) {
  ar.set(e, (ar.get(e) || 0) - 1);
  var r = Array.from(ar.keys()), n = r.filter(function(u) {
    var a = ar.get(u) || 0;
    return a <= 0;
  });
  r.length - n.length > r1 && n.forEach(function(u) {
    t1(u, t), ar.delete(u);
  });
}
var u1 = function(t, r, n, u) {
  var a = n.getDerivativeToken(t), o = N(N({}, a), r);
  return u && (o = u(o)), o;
}, Ml = "token";
function Il(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = Bt(In), u = n.cache.instanceId, a = n.container, o = r.salt, i = o === void 0 ? "" : o, s = r.override, c = s === void 0 ? Jm : s, l = r.formatToken, d = r.getComputedToken, f = r.cssVar, v = jm(function() {
    return Object.assign.apply(Object, [{}].concat(re(t)));
  }, t), h = un(v), g = un(c), p = f ? un(f) : "", C = hi(Ml, [i, e.id, h, g, p], function() {
    var m, y = d ? d(v, c, e) : u1(v, c, e, l), E = N({}, y), b = "";
    if (f) {
      var w = Ol(y, f.key, {
        prefix: f.prefix,
        ignore: f.ignore,
        unitless: f.unitless,
        preserve: f.preserve
      }), S = Z(w, 2);
      y = S[0], b = S[1];
    }
    var R = gs(y, i);
    y._tokenKey = R, E._tokenKey = gs(E, i);
    var k = (m = f == null ? void 0 : f.key) !== null && m !== void 0 ? m : R;
    y._themeKey = k, e1(k);
    var T = "".concat(Qm, "-").concat(pn(R));
    return y._hashId = T, [y, T, E, b, (f == null ? void 0 : f.key) || ""];
  }, function(m) {
    n1(m[0]._themeKey, u);
  }, function(m) {
    var y = Z(m, 4), E = y[0], b = y[3];
    if (f && b) {
      var w = ir(b, pn("css-variables-".concat(E._themeKey)), {
        mark: $t,
        prepend: "queue",
        attachTo: a,
        priority: -999
      });
      w[Zt] = u, w.setAttribute(Ar, E._themeKey);
    }
  });
  return C;
}
var a1 = function(t, r, n) {
  var u = Z(t, 5), a = u[2], o = u[3], i = u[4], s = n || {}, c = s.plain;
  if (!o)
    return null;
  var l = a._tokenKey, d = -999, f = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(d)
  }, v = Cu(o, i, l, f, c);
  return [d, l, v];
}, o1 = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, Nl = "comm", jl = "rule", Ll = "decl", i1 = "@import", s1 = "@namespace", c1 = "@keyframes", l1 = "@layer", zl = Math.abs, pi = String.fromCharCode;
function Bl(e) {
  return e.trim();
}
function lu(e, t, r) {
  return e.replace(t, r);
}
function d1(e, t, r) {
  return e.indexOf(t, r);
}
function Sr(e, t) {
  return e.charCodeAt(t) | 0;
}
function Dr(e, t, r) {
  return e.slice(t, r);
}
function Rt(e) {
  return e.length;
}
function f1(e) {
  return e.length;
}
function Xn(e, t) {
  return t.push(e), e;
}
var ia = 1, Tr = 1, Vl = 0, _t = 0, We = 0, Lr = "";
function mi(e, t, r, n, u, a, o, i) {
  return { value: e, root: t, parent: r, type: n, props: u, children: a, line: ia, column: Tr, length: o, return: "", siblings: i };
}
function h1() {
  return We;
}
function p1() {
  return We = _t > 0 ? Sr(Lr, --_t) : 0, Tr--, We === 10 && (Tr = 1, ia--), We;
}
function Ft() {
  return We = _t < Vl ? Sr(Lr, _t++) : 0, Tr++, We === 10 && (Tr = 1, ia++), We;
}
function Jt() {
  return Sr(Lr, _t);
}
function du() {
  return _t;
}
function sa(e, t) {
  return Dr(Lr, e, t);
}
function mn(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function m1(e) {
  return ia = Tr = 1, Vl = Rt(Lr = e), _t = 0, [];
}
function g1(e) {
  return Lr = "", e;
}
function Ra(e) {
  return Bl(sa(_t - 1, Eo(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function v1(e) {
  for (; (We = Jt()) && We < 33; )
    Ft();
  return mn(e) > 2 || mn(We) > 3 ? "" : " ";
}
function b1(e, t) {
  for (; --t && Ft() && !(We < 48 || We > 102 || We > 57 && We < 65 || We > 70 && We < 97); )
    ;
  return sa(e, du() + (t < 6 && Jt() == 32 && Ft() == 32));
}
function Eo(e) {
  for (; Ft(); )
    switch (We) {
      case e:
        return _t;
      case 34:
      case 39:
        e !== 34 && e !== 39 && Eo(We);
        break;
      case 40:
        e === 41 && Eo(e);
        break;
      case 92:
        Ft();
        break;
    }
  return _t;
}
function y1(e, t) {
  for (; Ft() && e + We !== 57; )
    if (e + We === 84 && Jt() === 47)
      break;
  return "/*" + sa(t, _t - 1) + "*" + pi(e === 47 ? e : Ft());
}
function x1(e) {
  for (; !mn(Jt()); )
    Ft();
  return sa(e, _t);
}
function _1(e) {
  return g1(fu("", null, null, null, [""], e = m1(e), 0, [0], e));
}
function fu(e, t, r, n, u, a, o, i, s) {
  for (var c = 0, l = 0, d = o, f = 0, v = 0, h = 0, g = 1, p = 1, C = 1, m = 0, y = "", E = u, b = a, w = n, S = y; p; )
    switch (h = m, m = Ft()) {
      case 40:
        if (h != 108 && Sr(S, d - 1) == 58) {
          d1(S += lu(Ra(m), "&", "&\f"), "&\f", zl(c ? i[c - 1] : 0)) != -1 && (C = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        S += Ra(m);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        S += v1(h);
        break;
      case 92:
        S += b1(du() - 1, 7);
        continue;
      case 47:
        switch (Jt()) {
          case 42:
          case 47:
            Xn(C1(y1(Ft(), du()), t, r, s), s), (mn(h || 1) == 5 || mn(Jt() || 1) == 5) && Rt(S) && Dr(S, -1, void 0) !== " " && (S += " ");
            break;
          default:
            S += "/";
        }
        break;
      case 123 * g:
        i[c++] = Rt(S) * C;
      case 125 * g:
      case 59:
      case 0:
        switch (m) {
          case 0:
          case 125:
            p = 0;
          case 59 + l:
            C == -1 && (S = lu(S, /\f/g, "")), v > 0 && (Rt(S) - d || g === 0 && h === 47) && Xn(v > 32 ? ys(S + ";", n, r, d - 1, s) : ys(lu(S, " ", "") + ";", n, r, d - 2, s), s);
            break;
          case 59:
            S += ";";
          default:
            if (Xn(w = bs(S, t, r, c, l, u, i, y, E = [], b = [], d, a), a), m === 123)
              if (l === 0)
                fu(S, t, w, w, E, a, d, i, b);
              else {
                switch (f) {
                  case 99:
                    if (Sr(S, 3) === 110) break;
                  case 108:
                    if (Sr(S, 2) === 97) break;
                  default:
                    l = 0;
                  case 100:
                  case 109:
                  case 115:
                }
                l ? fu(e, w, w, n && Xn(bs(e, w, w, 0, 0, u, i, y, u, E = [], d, b), b), u, b, d, i, n ? E : b) : fu(S, w, w, w, [""], b, 0, i, b);
              }
        }
        c = l = v = 0, g = C = 1, y = S = "", d = o;
        break;
      case 58:
        d = 1 + Rt(S), v = h;
      default:
        if (g < 1) {
          if (m == 123)
            --g;
          else if (m == 125 && g++ == 0 && p1() == 125)
            continue;
        }
        switch (S += pi(m), m * g) {
          case 38:
            C = l > 0 ? 1 : (S += "\f", -1);
            break;
          case 44:
            i[c++] = (Rt(S) - 1) * C, C = 1;
            break;
          case 64:
            Jt() === 45 && (S += Ra(Ft())), f = Jt(), l = d = Rt(y = S += x1(du())), m++;
            break;
          case 45:
            h === 45 && Rt(S) == 2 && (g = 0);
        }
    }
  return a;
}
function bs(e, t, r, n, u, a, o, i, s, c, l, d) {
  for (var f = u - 1, v = u === 0 ? a : [""], h = f1(v), g = 0, p = 0, C = 0; g < n; ++g)
    for (var m = 0, y = Dr(e, f + 1, f = zl(p = o[g])), E = e; m < h; ++m)
      (E = Bl(p > 0 ? v[m] + " " + y : lu(y, /&\f/g, v[m]))) && (s[C++] = E);
  return mi(e, t, r, u === 0 ? jl : i, s, c, l, d);
}
function C1(e, t, r, n) {
  return mi(e, t, r, Nl, pi(h1()), Dr(e, 2, -2), 0, n);
}
function ys(e, t, r, n, u) {
  return mi(e, t, r, Ll, Dr(e, 0, n), Dr(e, n + 1, -1), n, u);
}
function So(e, t) {
  for (var r = "", n = 0; n < e.length; n++)
    r += t(e[n], n, e, t) || "";
  return r;
}
function E1(e, t, r, n) {
  switch (e.type) {
    case l1:
      if (e.children.length) break;
    case i1:
    case s1:
    case Ll:
      return e.return = e.return || e.value;
    case Nl:
      return "";
    case c1:
      return e.return = e.value + "{" + So(e.children, n) + "}";
    case jl:
      if (!Rt(e.value = e.props.join(","))) return "";
  }
  return Rt(r = So(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function Hl(e, t) {
  var r = t.path, n = t.parentSelectors;
  Ie(!1, "[Ant Design CSS-in-JS] ".concat(r ? "Error in ".concat(r, ": ") : "").concat(e).concat(n.length ? " Selector: ".concat(n.join(" | ")) : ""));
}
var S1 = function(t, r, n) {
  if (t === "content") {
    var u = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, a = ["normal", "none", "initial", "inherit", "unset"];
    (typeof r != "string" || a.indexOf(r) === -1 && !u.test(r) && (r.charAt(0) !== r.charAt(r.length - 1) || r.charAt(0) !== '"' && r.charAt(0) !== "'")) && Hl("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"".concat(r, "\"'`."), n);
  }
}, w1 = function(t, r, n) {
  t === "animation" && n.hashId && r !== "none" && Hl("You seem to be using hashed animation '".concat(r, "', in which case 'animationName' with Keyframe as value is recommended."), n);
}, xs = "data-ant-cssinjs-cache-path", ql = "_FILE_STYLE__", sr, Wl = !0;
function $1() {
  if (!sr && (sr = {}, Ht())) {
    var e = document.createElement("div");
    e.className = xs, e.style.position = "fixed", e.style.visibility = "hidden", e.style.top = "-9999px", document.body.appendChild(e);
    var t = getComputedStyle(e).content || "";
    t = t.replace(/^"/, "").replace(/"$/, ""), t.split(";").forEach(function(u) {
      var a = u.split(":"), o = Z(a, 2), i = o[0], s = o[1];
      sr[i] = s;
    });
    var r = document.querySelector("style[".concat(xs, "]"));
    if (r) {
      var n;
      Wl = !1, (n = r.parentNode) === null || n === void 0 || n.removeChild(r);
    }
    document.body.removeChild(e);
  }
}
function F1(e) {
  return $1(), !!sr[e];
}
function k1(e) {
  var t = sr[e], r = null;
  if (t && Ht())
    if (Wl)
      r = ql;
    else {
      var n = document.querySelector("style[".concat($t, '="').concat(sr[e], '"]'));
      n ? r = n.innerHTML : delete sr[e];
    }
  return [r, t];
}
var Ul = "_skip_check_", Yl = "_multi_value_";
function hu(e) {
  var t = So(_1(e), E1);
  return t.replace(/\{%%%\:[^;];}/g, ";");
}
function A1(e) {
  return ne(e) === "object" && e && (Ul in e || Yl in e);
}
function _s(e, t, r) {
  if (!t)
    return e;
  var n = ".".concat(t), u = r === "low" ? ":where(".concat(n, ")") : n, a = e.split(",").map(function(o) {
    var i, s = o.trim().split(/\s+/), c = s[0] || "", l = ((i = c.match(/^\w+/)) === null || i === void 0 ? void 0 : i[0]) || "";
    return c = "".concat(l).concat(u).concat(c.slice(l.length)), [c].concat(re(s.slice(1))).join(" ");
  });
  return a.join(",");
}
var D1 = function e(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    root: !0,
    parentSelectors: []
  }, u = n.root, a = n.injectHash, o = n.parentSelectors, i = r.hashId, s = r.layer, c = r.path, l = r.hashPriority, d = r.transformers, f = d === void 0 ? [] : d, v = r.linters, h = v === void 0 ? [] : v, g = "", p = {};
  function C(E) {
    var b = E.getName(i);
    if (!p[b]) {
      var w = e(E.style, r, {
        root: !1,
        parentSelectors: o
      }), S = Z(w, 1), R = S[0];
      p[b] = "@keyframes ".concat(E.getName(i)).concat(R);
    }
  }
  function m(E) {
    var b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    return E.forEach(function(w) {
      Array.isArray(w) ? m(w, b) : w && b.push(w);
    }), b;
  }
  var y = m(Array.isArray(t) ? t : [t]);
  return y.forEach(function(E) {
    var b = typeof E == "string" && !u ? {} : E;
    if (typeof b == "string")
      g += "".concat(b, `
`);
    else if (b._keyframe)
      C(b);
    else {
      var w = f.reduce(function(S, R) {
        var k;
        return (R == null || (k = R.visit) === null || k === void 0 ? void 0 : k.call(R, S)) || S;
      }, b);
      Object.keys(w).forEach(function(S) {
        var R = w[S];
        if (ne(R) === "object" && R && (S !== "animationName" || !R._keyframe) && !A1(R)) {
          var k = !1, T = S.trim(), I = !1;
          (u || a) && i ? T.startsWith("@") ? k = !0 : T === "&" ? T = _s("", i, l) : T = _s(S, i, l) : u && !i && (T === "&" || T === "") && (T = "", I = !0);
          var j = e(R, r, {
            root: I,
            injectHash: k,
            parentSelectors: [].concat(re(o), [T])
          }), P = Z(j, 2), M = P[0], L = P[1];
          p = N(N({}, p), L), g += "".concat(T).concat(M);
        } else {
          let D = function(B, V) {
            process.env.NODE_ENV !== "production" && (ne(R) !== "object" || !(R != null && R[Ul])) && [S1, w1].concat(re(h)).forEach(function(Y) {
              return Y(B, V, {
                path: c,
                hashId: i,
                parentSelectors: o
              });
            });
            var H = B.replace(/[A-Z]/g, function(Y) {
              return "-".concat(Y.toLowerCase());
            }), q = V;
            !o1[B] && typeof q == "number" && q !== 0 && (q = "".concat(q, "px")), B === "animationName" && V !== null && V !== void 0 && V._keyframe && (C(V), q = V.getName(i)), g += "".concat(H, ":").concat(q, ";");
          };
          var $, A = ($ = R == null ? void 0 : R.value) !== null && $ !== void 0 ? $ : R;
          ne(R) === "object" && R !== null && R !== void 0 && R[Yl] && Array.isArray(A) ? A.forEach(function(B) {
            D(S, B);
          }) : D(S, A);
        }
      });
    }
  }), u ? s && (g && (g = "@layer ".concat(s.name, " {").concat(g, "}")), s.dependencies && (p["@layer ".concat(s.name)] = s.dependencies.map(function(E) {
    return "@layer ".concat(E, ", ").concat(s.name, ";");
  }).join(`
`))) : g = "{".concat(g, "}"), [g, p];
};
function Gl(e, t) {
  return pn("".concat(e.join("%")).concat(t));
}
function T1() {
  return null;
}
var Kl = "style";
function wo(e, t) {
  var r = e.token, n = e.path, u = e.hashId, a = e.layer, o = e.nonce, i = e.clientOnly, s = e.order, c = s === void 0 ? 0 : s, l = _.useContext(In), d = l.autoClear, f = l.mock, v = l.defaultCache, h = l.hashPriority, g = l.container, p = l.ssrInline, C = l.transformers, m = l.linters, y = l.cache, E = l.layer, b = r._tokenKey, w = [b];
  E && w.push("layer"), w.push.apply(w, re(n));
  var S = _o;
  process.env.NODE_ENV !== "production" && f !== void 0 && (S = f === "client");
  var R = hi(
    Kl,
    w,
    // Create cache if needed
    function() {
      var P = w.join("|");
      if (F1(P)) {
        var M = k1(P), L = Z(M, 2), $ = L[0], A = L[1];
        if ($)
          return [$, b, A, {}, i, c];
      }
      var D = t(), B = D1(D, {
        hashId: u,
        hashPriority: h,
        layer: E ? a : void 0,
        path: n.join("-"),
        transformers: C,
        linters: m
      }), V = Z(B, 2), H = V[0], q = V[1], Y = hu(H), G = Gl(w, Y);
      return [Y, b, G, q, i, c];
    },
    // Remove cache if no need
    function(P, M) {
      var L = Z(P, 3), $ = L[2];
      (M || d) && _o && Cl($, {
        mark: $t
      });
    },
    // Effect: Inject style here
    function(P) {
      var M = Z(P, 4), L = M[0];
      M[1];
      var $ = M[2], A = M[3];
      if (S && L !== ql) {
        var D = {
          mark: $t,
          prepend: E ? !1 : "queue",
          attachTo: g,
          priority: c
        }, B = typeof o == "function" ? o() : o;
        B && (D.csp = {
          nonce: B
        });
        var V = [], H = [];
        Object.keys(A).forEach(function(Y) {
          Y.startsWith("@layer") ? V.push(Y) : H.push(Y);
        }), V.forEach(function(Y) {
          ir(hu(A[Y]), "_layer-".concat(Y), N(N({}, D), {}, {
            prepend: !0
          }));
        });
        var q = ir(L, $, D);
        q[Zt] = y.instanceId, q.setAttribute(Ar, b), process.env.NODE_ENV !== "production" && q.setAttribute(Om, w.join("|")), H.forEach(function(Y) {
          ir(hu(A[Y]), "_effect-".concat(Y), D);
        });
      }
    }
  ), k = Z(R, 3), T = k[0], I = k[1], j = k[2];
  return function(P) {
    var M;
    if (!p || S || !v)
      M = /* @__PURE__ */ _.createElement(T1, null);
    else {
      var L;
      M = /* @__PURE__ */ _.createElement("style", De({}, (L = {}, F(L, Ar, I), F(L, $t, j), L), {
        dangerouslySetInnerHTML: {
          __html: T
        }
      }));
    }
    return /* @__PURE__ */ _.createElement(_.Fragment, null, M, P);
  };
}
var R1 = function(t, r, n) {
  var u = Z(t, 6), a = u[0], o = u[1], i = u[2], s = u[3], c = u[4], l = u[5], d = n || {}, f = d.plain;
  if (c)
    return null;
  var v = a, h = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(l)
  };
  return v = Cu(a, o, i, h, f), s && Object.keys(s).forEach(function(g) {
    if (!r[g]) {
      r[g] = !0;
      var p = hu(s[g]), C = Cu(p, o, "_effect-".concat(g), h, f);
      g.startsWith("@layer") ? v = C + v : v += C;
    }
  }), [l, i, v];
}, Xl = "cssVar", P1 = function(t, r) {
  var n = t.key, u = t.prefix, a = t.unitless, o = t.ignore, i = t.token, s = t.scope, c = s === void 0 ? "" : s, l = Bt(In), d = l.cache.instanceId, f = l.container, v = i._tokenKey, h = [].concat(re(t.path), [n, c, v]), g = hi(Xl, h, function() {
    var p = r(), C = Ol(p, n, {
      prefix: u,
      unitless: a,
      ignore: o,
      scope: c
    }), m = Z(C, 2), y = m[0], E = m[1], b = Gl(h, E);
    return [y, E, b, n];
  }, function(p) {
    var C = Z(p, 3), m = C[2];
    _o && Cl(m, {
      mark: $t
    });
  }, function(p) {
    var C = Z(p, 3), m = C[1], y = C[2];
    if (m) {
      var E = ir(m, y, {
        mark: $t,
        prepend: "queue",
        attachTo: f,
        priority: -999
      });
      E[Zt] = d, E.setAttribute(Ar, n);
    }
  });
  return g;
}, O1 = function(t, r, n) {
  var u = Z(t, 4), a = u[1], o = u[2], i = u[3], s = n || {}, c = s.plain;
  if (!a)
    return null;
  var l = -999, d = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(l)
  }, f = Cu(a, i, o, d, c);
  return [l, o, f];
}, Zr;
Zr = {}, F(Zr, Kl, R1), F(Zr, Ml, a1), F(Zr, Xl, O1);
var Zl = /* @__PURE__ */ function() {
  function e(t, r) {
    Qe(this, e), F(this, "name", void 0), F(this, "style", void 0), F(this, "_keyframe", !0), this.name = t, this.style = r;
  }
  return et(e, [{
    key: "getName",
    value: function() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return r ? "".concat(r, "-").concat(this.name) : this.name;
    }
  }]), e;
}();
function gr(e) {
  return e.notSplit = !0, e;
}
gr(["borderTop", "borderBottom"]), gr(["borderTop"]), gr(["borderBottom"]), gr(["borderLeft", "borderRight"]), gr(["borderLeft"]), gr(["borderRight"]);
var Jl = /* @__PURE__ */ et(function e() {
  Qe(this, e);
}), Ql = "CALC_UNIT", M1 = new RegExp(Ql, "g");
function Pa(e) {
  return typeof e == "number" ? "".concat(e).concat(Ql) : e;
}
var I1 = /* @__PURE__ */ function(e) {
  dr(r, e);
  var t = fr(r);
  function r(n, u) {
    var a;
    Qe(this, r), a = t.call(this), F(ce(a), "result", ""), F(ce(a), "unitlessCssVar", void 0), F(ce(a), "lowPriority", void 0);
    var o = ne(n);
    return a.unitlessCssVar = u, n instanceof r ? a.result = "(".concat(n.result, ")") : o === "number" ? a.result = Pa(n) : o === "string" && (a.result = n), a;
  }
  return et(r, [{
    key: "add",
    value: function(u) {
      return u instanceof r ? this.result = "".concat(this.result, " + ").concat(u.getResult()) : (typeof u == "number" || typeof u == "string") && (this.result = "".concat(this.result, " + ").concat(Pa(u))), this.lowPriority = !0, this;
    }
  }, {
    key: "sub",
    value: function(u) {
      return u instanceof r ? this.result = "".concat(this.result, " - ").concat(u.getResult()) : (typeof u == "number" || typeof u == "string") && (this.result = "".concat(this.result, " - ").concat(Pa(u))), this.lowPriority = !0, this;
    }
  }, {
    key: "mul",
    value: function(u) {
      return this.lowPriority && (this.result = "(".concat(this.result, ")")), u instanceof r ? this.result = "".concat(this.result, " * ").concat(u.getResult(!0)) : (typeof u == "number" || typeof u == "string") && (this.result = "".concat(this.result, " * ").concat(u)), this.lowPriority = !1, this;
    }
  }, {
    key: "div",
    value: function(u) {
      return this.lowPriority && (this.result = "(".concat(this.result, ")")), u instanceof r ? this.result = "".concat(this.result, " / ").concat(u.getResult(!0)) : (typeof u == "number" || typeof u == "string") && (this.result = "".concat(this.result, " / ").concat(u)), this.lowPriority = !1, this;
    }
  }, {
    key: "getResult",
    value: function(u) {
      return this.lowPriority || u ? "(".concat(this.result, ")") : this.result;
    }
  }, {
    key: "equal",
    value: function(u) {
      var a = this, o = u || {}, i = o.unit, s = !0;
      return typeof i == "boolean" ? s = i : Array.from(this.unitlessCssVar).some(function(c) {
        return a.result.includes(c);
      }) && (s = !1), this.result = this.result.replace(M1, s ? "px" : ""), typeof this.lowPriority < "u" ? "calc(".concat(this.result, ")") : this.result;
    }
  }]), r;
}(Jl), N1 = /* @__PURE__ */ function(e) {
  dr(r, e);
  var t = fr(r);
  function r(n) {
    var u;
    return Qe(this, r), u = t.call(this), F(ce(u), "result", 0), n instanceof r ? u.result = n.result : typeof n == "number" && (u.result = n), u;
  }
  return et(r, [{
    key: "add",
    value: function(u) {
      return u instanceof r ? this.result += u.result : typeof u == "number" && (this.result += u), this;
    }
  }, {
    key: "sub",
    value: function(u) {
      return u instanceof r ? this.result -= u.result : typeof u == "number" && (this.result -= u), this;
    }
  }, {
    key: "mul",
    value: function(u) {
      return u instanceof r ? this.result *= u.result : typeof u == "number" && (this.result *= u), this;
    }
  }, {
    key: "div",
    value: function(u) {
      return u instanceof r ? this.result /= u.result : typeof u == "number" && (this.result /= u), this;
    }
  }, {
    key: "equal",
    value: function() {
      return this.result;
    }
  }]), r;
}(Jl), j1 = function(t, r) {
  var n = t === "css" ? I1 : N1;
  return function(u) {
    return new n(u, r);
  };
}, Cs = function(t, r) {
  return "".concat([r, t.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-"));
};
function St(e, t) {
  for (var r = e, n = 0; n < t.length; n += 1) {
    if (r == null)
      return;
    r = r[t[n]];
  }
  return r;
}
function L1(e) {
  return Yc(e) || Uc(e) || ni(e) || Gc();
}
function ed(e, t, r, n) {
  if (!t.length)
    return r;
  var u = L1(t), a = u[0], o = u.slice(1), i;
  return !e && typeof a == "number" ? i = [] : Array.isArray(e) ? i = re(e) : i = N({}, e), n && r === void 0 && o.length === 1 ? delete i[a][o[0]] : i[a] = ed(i[a], o, r, n), i;
}
function Ct(e, t, r) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && n && r === void 0 && !St(e, t.slice(0, -1)) ? e : ed(e, t, r, n);
}
function z1(e) {
  return ne(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function Es(e) {
  return Array.isArray(e) ? [] : {};
}
var B1 = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function xr() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = Es(t[0]);
  return t.forEach(function(u) {
    function a(o, i) {
      var s = new Set(i), c = St(u, o), l = Array.isArray(c);
      if (l || z1(c)) {
        if (!s.has(c)) {
          s.add(c);
          var d = St(n, o);
          l ? n = Ct(n, o, []) : (!d || ne(d) !== "object") && (n = Ct(n, o, Es(c))), B1(c).forEach(function(f) {
            a([].concat(re(o), [f]), s);
          });
        }
      } else
        n = Ct(n, o, c);
    }
    a([]);
  }), n;
}
function Ss(e, t, r, n) {
  var u = N({}, t[e]);
  if (n != null && n.deprecatedTokens) {
    var a = n.deprecatedTokens;
    a.forEach(function(i) {
      var s = Z(i, 2), c = s[0], l = s[1];
      if (process.env.NODE_ENV !== "production" && Ie(!(u != null && u[c]), "Component Token `".concat(String(c), "` of ").concat(String(e), " is deprecated. Please use `").concat(String(l), "` instead.")), u != null && u[c] || u != null && u[l]) {
        var d;
        (d = u[l]) !== null && d !== void 0 || (u[l] = u == null ? void 0 : u[c]);
      }
    });
  }
  var o = N(N({}, r), u);
  return Object.keys(o).forEach(function(i) {
    o[i] === t[i] && delete o[i];
  }), o;
}
var td = process.env.NODE_ENV !== "production" || typeof CSSINJS_STATISTIC < "u", $o = !0;
function It() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  if (!td)
    return Object.assign.apply(Object, [{}].concat(t));
  $o = !1;
  var n = {};
  return t.forEach(function(u) {
    if (ne(u) === "object") {
      var a = Object.keys(u);
      a.forEach(function(o) {
        Object.defineProperty(n, o, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return u[o];
          }
        });
      });
    }
  }), $o = !0, n;
}
var ws = {};
function V1() {
}
var H1 = function(t) {
  var r, n = t, u = V1;
  return td && typeof Proxy < "u" && (r = /* @__PURE__ */ new Set(), n = new Proxy(t, {
    get: function(o, i) {
      if ($o) {
        var s;
        (s = r) === null || s === void 0 || s.add(i);
      }
      return o[i];
    }
  }), u = function(o, i) {
    var s;
    ws[o] = {
      global: Array.from(r),
      component: N(N({}, (s = ws[o]) === null || s === void 0 ? void 0 : s.component), i)
    };
  }), {
    token: n,
    keys: r,
    flush: u
  };
};
function $s(e, t, r) {
  if (typeof r == "function") {
    var n;
    return r(It(t, (n = t[e]) !== null && n !== void 0 ? n : {}));
  }
  return r ?? {};
}
function q1(e) {
  return e === "js" ? {
    max: Math.max,
    min: Math.min
  } : {
    max: function() {
      for (var r = arguments.length, n = new Array(r), u = 0; u < r; u++)
        n[u] = arguments[u];
      return "max(".concat(n.map(function(a) {
        return Se(a);
      }).join(","), ")");
    },
    min: function() {
      for (var r = arguments.length, n = new Array(r), u = 0; u < r; u++)
        n[u] = arguments[u];
      return "min(".concat(n.map(function(a) {
        return Se(a);
      }).join(","), ")");
    }
  };
}
var W1 = 1e3 * 60 * 10, U1 = /* @__PURE__ */ function() {
  function e() {
    Qe(this, e), F(this, "map", /* @__PURE__ */ new Map()), F(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), F(this, "nextID", 0), F(this, "lastAccessBeat", /* @__PURE__ */ new Map()), F(this, "accessBeat", 0);
  }
  return et(e, [{
    key: "set",
    value: function(r, n) {
      this.clear();
      var u = this.getCompositeKey(r);
      this.map.set(u, n), this.lastAccessBeat.set(u, Date.now());
    }
  }, {
    key: "get",
    value: function(r) {
      var n = this.getCompositeKey(r), u = this.map.get(n);
      return this.lastAccessBeat.set(n, Date.now()), this.accessBeat += 1, u;
    }
  }, {
    key: "getCompositeKey",
    value: function(r) {
      var n = this, u = r.map(function(a) {
        return a && ne(a) === "object" ? "obj_".concat(n.getObjectID(a)) : "".concat(ne(a), "_").concat(a);
      });
      return u.join("|");
    }
  }, {
    key: "getObjectID",
    value: function(r) {
      if (this.objectIDMap.has(r))
        return this.objectIDMap.get(r);
      var n = this.nextID;
      return this.objectIDMap.set(r, n), this.nextID += 1, n;
    }
  }, {
    key: "clear",
    value: function() {
      var r = this;
      if (this.accessBeat > 1e4) {
        var n = Date.now();
        this.lastAccessBeat.forEach(function(u, a) {
          n - u > W1 && (r.map.delete(a), r.lastAccessBeat.delete(a));
        }), this.accessBeat = 0;
      }
    }
  }]), e;
}(), Fs = new U1();
function Y1(e, t) {
  return O.useMemo(function() {
    var r = Fs.get(t);
    if (r)
      return r;
    var n = e();
    return Fs.set(t, n), n;
  }, t);
}
var G1 = function() {
  return {};
};
function rd(e) {
  var t = e.useCSP, r = t === void 0 ? G1 : t, n = e.useToken, u = e.usePrefix, a = e.getResetStyles, o = e.getCommonStyle, i = e.getCompUnitless;
  function s(f, v, h, g) {
    var p = Array.isArray(f) ? f[0] : f;
    function C(R) {
      return "".concat(String(p)).concat(R.slice(0, 1).toUpperCase()).concat(R.slice(1));
    }
    var m = (g == null ? void 0 : g.unitless) || {}, y = typeof i == "function" ? i(f) : {}, E = N(N({}, y), {}, F({}, C("zIndexPopup"), !0));
    Object.keys(m).forEach(function(R) {
      E[C(R)] = m[R];
    });
    var b = N(N({}, g), {}, {
      unitless: E,
      prefixToken: C
    }), w = l(f, v, h, b), S = c(p, h, b);
    return function(R) {
      var k = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : R, T = w(R, k), I = Z(T, 2), j = I[1], P = S(k), M = Z(P, 2), L = M[0], $ = M[1];
      return [L, j, $];
    };
  }
  function c(f, v, h) {
    var g = h.unitless, p = h.injectStyle, C = p === void 0 ? !0 : p, m = h.prefixToken, y = h.ignore, E = function(S) {
      var R = S.rootCls, k = S.cssVar, T = k === void 0 ? {} : k, I = n(), j = I.realToken;
      return P1({
        path: [f],
        prefix: T.prefix,
        key: T.key,
        unitless: g,
        ignore: y,
        token: j,
        scope: R
      }, function() {
        var P = $s(f, j, v), M = Ss(f, j, P, {
          deprecatedTokens: h == null ? void 0 : h.deprecatedTokens
        });
        return Object.keys(P).forEach(function(L) {
          M[m(L)] = M[L], delete M[L];
        }), M;
      }), null;
    }, b = function(S) {
      var R = n(), k = R.cssVar;
      return [function(T) {
        return C && k ? /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement(E, {
          rootCls: S,
          cssVar: k,
          component: f
        }), T) : T;
      }, k == null ? void 0 : k.key];
    };
    return b;
  }
  function l(f, v, h) {
    var g = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, p = Array.isArray(f) ? f : [f, f], C = Z(p, 1), m = C[0], y = p.join("-"), E = e.layer || {
      name: "antd"
    };
    return function(b) {
      var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : b, S = n(), R = S.theme, k = S.realToken, T = S.hashId, I = S.token, j = S.cssVar, P = u(), M = P.rootPrefixCls, L = P.iconPrefixCls, $ = r(), A = j ? "css" : "js", D = Y1(function() {
        var G = /* @__PURE__ */ new Set();
        return j && Object.keys(g.unitless || {}).forEach(function(K) {
          G.add(cu(K, j.prefix)), G.add(cu(K, Cs(m, j.prefix)));
        }), j1(A, G);
      }, [A, m, j == null ? void 0 : j.prefix]), B = q1(A), V = B.max, H = B.min, q = {
        theme: R,
        token: I,
        hashId: T,
        nonce: function() {
          return $.nonce;
        },
        clientOnly: g.clientOnly,
        layer: E,
        // antd is always at top of styles
        order: g.order || -999
      };
      typeof a == "function" && wo(N(N({}, q), {}, {
        clientOnly: !1,
        path: ["Shared", M]
      }), function() {
        return a(I, {
          prefix: {
            rootPrefixCls: M,
            iconPrefixCls: L
          },
          csp: $
        });
      });
      var Y = wo(N(N({}, q), {}, {
        path: [y, b, L]
      }), function() {
        if (g.injectStyle === !1)
          return [];
        var G = H1(I), K = G.token, X = G.flush, te = $s(m, k, h), ue = ".".concat(b), pe = Ss(m, k, te, {
          deprecatedTokens: g.deprecatedTokens
        });
        j && te && ne(te) === "object" && Object.keys(te).forEach(function(Ne) {
          te[Ne] = "var(".concat(cu(Ne, Cs(m, j.prefix)), ")");
        });
        var le = It(K, {
          componentCls: ue,
          prefixCls: b,
          iconCls: ".".concat(L),
          antCls: ".".concat(M),
          calc: D,
          // @ts-ignore
          max: V,
          // @ts-ignore
          min: H
        }, j ? te : pe), ke = v(le, {
          hashId: T,
          prefixCls: b,
          rootPrefixCls: M,
          iconPrefixCls: L
        });
        X(m, pe);
        var Ae = typeof o == "function" ? o(le, b, w, g.resetFont) : null;
        return [g.resetStyle === !1 ? null : Ae, ke];
      });
      return [Y, T];
    };
  }
  function d(f, v, h) {
    var g = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, p = l(f, v, h, N({
      resetStyle: !1,
      // Sub Style should default after root one
      order: -998
    }, g)), C = function(y) {
      var E = y.prefixCls, b = y.rootCls, w = b === void 0 ? E : b;
      return p(E, w), null;
    };
    return process.env.NODE_ENV !== "production" && (C.displayName = "SubStyle_".concat(String(Array.isArray(f) ? f.join(".") : f))), C;
  }
  return {
    genStyleHooks: s,
    genSubStyleComponent: d,
    genComponentStyleHook: l
  };
}
function K1(e) {
  return (e + 8) / e;
}
function X1(e) {
  const t = Array.from({
    length: 10
  }).map((r, n) => {
    const u = n - 1, a = e * Math.pow(Math.E, u / 5), o = n > 1 ? Math.floor(a) : Math.ceil(a);
    return Math.floor(o / 2) * 2;
  });
  return t[1] = e, t.map((r) => ({
    size: r,
    lineHeight: K1(r)
  }));
}
const Z1 = "5.24.5", nd = {
  blue: "#1677FF",
  purple: "#722ED1",
  cyan: "#13C2C2",
  green: "#52C41A",
  magenta: "#EB2F96",
  /**
   * @deprecated Use magenta instead
   */
  pink: "#EB2F96",
  red: "#F5222D",
  orange: "#FA8C16",
  yellow: "#FADB14",
  volcano: "#FA541C",
  geekblue: "#2F54EB",
  gold: "#FAAD14",
  lime: "#A0D911"
}, gn = Object.assign(Object.assign({}, nd), {
  // Color
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff4d4f",
  colorInfo: "#1677ff",
  colorLink: "",
  colorTextBase: "",
  colorBgBase: "",
  // Font
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  fontSize: 14,
  // Line
  lineWidth: 1,
  lineType: "solid",
  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
  motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
  motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
  motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
  motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  // Radius
  borderRadius: 6,
  // Size
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,
  // Control Base
  controlHeight: 32,
  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1e3,
  // Image
  opacityImage: 1,
  // Wireframe
  wireframe: !1,
  // Motion
  motion: !0
});
function J1(e, t) {
  let {
    generateColorPalettes: r,
    generateNeutralColorPalettes: n
  } = t;
  const {
    colorSuccess: u,
    colorWarning: a,
    colorError: o,
    colorInfo: i,
    colorPrimary: s,
    colorBgBase: c,
    colorTextBase: l
  } = e, d = r(s), f = r(u), v = r(a), h = r(o), g = r(i), p = n(c, l), C = e.colorLink || e.colorInfo, m = r(C), y = new qe(h[1]).mix(new qe(h[3]), 50).toHexString();
  return Object.assign(Object.assign({}, p), {
    colorPrimaryBg: d[1],
    colorPrimaryBgHover: d[2],
    colorPrimaryBorder: d[3],
    colorPrimaryBorderHover: d[4],
    colorPrimaryHover: d[5],
    colorPrimary: d[6],
    colorPrimaryActive: d[7],
    colorPrimaryTextHover: d[8],
    colorPrimaryText: d[9],
    colorPrimaryTextActive: d[10],
    colorSuccessBg: f[1],
    colorSuccessBgHover: f[2],
    colorSuccessBorder: f[3],
    colorSuccessBorderHover: f[4],
    colorSuccessHover: f[4],
    colorSuccess: f[6],
    colorSuccessActive: f[7],
    colorSuccessTextHover: f[8],
    colorSuccessText: f[9],
    colorSuccessTextActive: f[10],
    colorErrorBg: h[1],
    colorErrorBgHover: h[2],
    colorErrorBgFilledHover: y,
    colorErrorBgActive: h[3],
    colorErrorBorder: h[3],
    colorErrorBorderHover: h[4],
    colorErrorHover: h[5],
    colorError: h[6],
    colorErrorActive: h[7],
    colorErrorTextHover: h[8],
    colorErrorText: h[9],
    colorErrorTextActive: h[10],
    colorWarningBg: v[1],
    colorWarningBgHover: v[2],
    colorWarningBorder: v[3],
    colorWarningBorderHover: v[4],
    colorWarningHover: v[4],
    colorWarning: v[6],
    colorWarningActive: v[7],
    colorWarningTextHover: v[8],
    colorWarningText: v[9],
    colorWarningTextActive: v[10],
    colorInfoBg: g[1],
    colorInfoBgHover: g[2],
    colorInfoBorder: g[3],
    colorInfoBorderHover: g[4],
    colorInfoHover: g[4],
    colorInfo: g[6],
    colorInfoActive: g[7],
    colorInfoTextHover: g[8],
    colorInfoText: g[9],
    colorInfoTextActive: g[10],
    colorLinkHover: m[4],
    colorLink: m[6],
    colorLinkActive: m[7],
    colorBgMask: new qe("#000").setA(0.45).toRgbString(),
    colorWhite: "#fff"
  });
}
const Q1 = (e) => {
  let t = e, r = e, n = e, u = e;
  return e < 6 && e >= 5 ? t = e + 1 : e < 16 && e >= 6 ? t = e + 2 : e >= 16 && (t = 16), e < 7 && e >= 5 ? r = 4 : e < 8 && e >= 7 ? r = 5 : e < 14 && e >= 8 ? r = 6 : e < 16 && e >= 14 ? r = 7 : e >= 16 && (r = 8), e < 6 && e >= 2 ? n = 1 : e >= 6 && (n = 2), e > 4 && e < 8 ? u = 4 : e >= 8 && (u = 6), {
    borderRadius: e,
    borderRadiusXS: n,
    borderRadiusSM: r,
    borderRadiusLG: t,
    borderRadiusOuter: u
  };
};
function eg(e) {
  const {
    motionUnit: t,
    motionBase: r,
    borderRadius: n,
    lineWidth: u
  } = e;
  return Object.assign({
    // motion
    motionDurationFast: `${(r + t).toFixed(1)}s`,
    motionDurationMid: `${(r + t * 2).toFixed(1)}s`,
    motionDurationSlow: `${(r + t * 3).toFixed(1)}s`,
    // line
    lineWidthBold: u + 1
  }, Q1(n));
}
const tg = (e) => {
  const {
    controlHeight: t
  } = e;
  return {
    controlHeightSM: t * 0.75,
    controlHeightXS: t * 0.5,
    controlHeightLG: t * 1.25
  };
}, rg = (e) => {
  const t = X1(e), r = t.map((l) => l.size), n = t.map((l) => l.lineHeight), u = r[1], a = r[0], o = r[2], i = n[1], s = n[0], c = n[2];
  return {
    fontSizeSM: a,
    fontSize: u,
    fontSizeLG: o,
    fontSizeXL: r[3],
    fontSizeHeading1: r[6],
    fontSizeHeading2: r[5],
    fontSizeHeading3: r[4],
    fontSizeHeading4: r[3],
    fontSizeHeading5: r[2],
    lineHeight: i,
    lineHeightLG: c,
    lineHeightSM: s,
    fontHeight: Math.round(i * u),
    fontHeightLG: Math.round(c * o),
    fontHeightSM: Math.round(s * a),
    lineHeightHeading1: n[6],
    lineHeightHeading2: n[5],
    lineHeightHeading3: n[4],
    lineHeightHeading4: n[3],
    lineHeightHeading5: n[2]
  };
};
function ng(e) {
  const {
    sizeUnit: t,
    sizeStep: r
  } = e;
  return {
    sizeXXL: t * (r + 8),
    // 48
    sizeXL: t * (r + 4),
    // 32
    sizeLG: t * (r + 2),
    // 24
    sizeMD: t * (r + 1),
    // 20
    sizeMS: t * r,
    // 16
    size: t * r,
    // 16
    sizeSM: t * (r - 1),
    // 12
    sizeXS: t * (r - 2),
    // 8
    sizeXXS: t * (r - 3)
    // 4
  };
}
const bt = (e, t) => new qe(e).setA(t).toRgbString(), Jr = (e, t) => new qe(e).darken(t).toHexString(), ug = (e) => {
  const t = fn(e);
  return {
    1: t[0],
    2: t[1],
    3: t[2],
    4: t[3],
    5: t[4],
    6: t[5],
    7: t[6],
    8: t[4],
    9: t[5],
    10: t[6]
    // 8: colors[7],
    // 9: colors[8],
    // 10: colors[9],
  };
}, ag = (e, t) => {
  const r = e || "#fff", n = t || "#000";
  return {
    colorBgBase: r,
    colorTextBase: n,
    colorText: bt(n, 0.88),
    colorTextSecondary: bt(n, 0.65),
    colorTextTertiary: bt(n, 0.45),
    colorTextQuaternary: bt(n, 0.25),
    colorFill: bt(n, 0.15),
    colorFillSecondary: bt(n, 0.06),
    colorFillTertiary: bt(n, 0.04),
    colorFillQuaternary: bt(n, 0.02),
    colorBgSolid: bt(n, 1),
    colorBgSolidHover: bt(n, 0.75),
    colorBgSolidActive: bt(n, 0.95),
    colorBgLayout: Jr(r, 4),
    colorBgContainer: Jr(r, 0),
    colorBgElevated: Jr(r, 0),
    colorBgSpotlight: bt(n, 0.85),
    colorBgBlur: "transparent",
    colorBorder: Jr(r, 15),
    colorBorderSecondary: Jr(r, 6)
  };
};
function og(e) {
  ka.pink = ka.magenta, Aa.pink = Aa.magenta;
  const t = Object.keys(nd).map((r) => {
    const n = e[r] === ka[r] ? Aa[r] : fn(e[r]);
    return Array.from({
      length: 10
    }, () => 1).reduce((u, a, o) => (u[`${r}-${o + 1}`] = n[o], u[`${r}${o + 1}`] = n[o], u), {});
  }).reduce((r, n) => (r = Object.assign(Object.assign({}, r), n), r), {});
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e), t), J1(e, {
    generateColorPalettes: ug,
    generateNeutralColorPalettes: ag
  })), rg(e.fontSize)), ng(e)), tg(e)), eg(e));
}
const ud = _u(og), Fo = {
  token: gn,
  override: {
    override: gn
  },
  hashed: !0
}, ad = /* @__PURE__ */ O.createContext(Fo);
function Oa(e) {
  return e >= 0 && e <= 255;
}
function Zn(e, t) {
  const {
    r,
    g: n,
    b: u,
    a
  } = new qe(e).toRgb();
  if (a < 1)
    return e;
  const {
    r: o,
    g: i,
    b: s
  } = new qe(t).toRgb();
  for (let c = 0.01; c <= 1; c += 0.01) {
    const l = Math.round((r - o * (1 - c)) / c), d = Math.round((n - i * (1 - c)) / c), f = Math.round((u - s * (1 - c)) / c);
    if (Oa(l) && Oa(d) && Oa(f))
      return new qe({
        r: l,
        g: d,
        b: f,
        a: Math.round(c * 100) / 100
      }).toRgbString();
  }
  return new qe({
    r,
    g: n,
    b: u,
    a: 1
  }).toRgbString();
}
var ig = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var u = 0, n = Object.getOwnPropertySymbols(e); u < n.length; u++)
    t.indexOf(n[u]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[u]) && (r[n[u]] = e[n[u]]);
  return r;
};
function gi(e) {
  const {
    override: t
  } = e, r = ig(e, ["override"]), n = Object.assign({}, t);
  Object.keys(gn).forEach((f) => {
    delete n[f];
  });
  const u = Object.assign(Object.assign({}, r), n), a = 480, o = 576, i = 768, s = 992, c = 1200, l = 1600;
  if (u.motion === !1) {
    const f = "0s";
    u.motionDurationFast = f, u.motionDurationMid = f, u.motionDurationSlow = f;
  }
  return Object.assign(Object.assign(Object.assign({}, u), {
    // ============== Background ============== //
    colorFillContent: u.colorFillSecondary,
    colorFillContentHover: u.colorFill,
    colorFillAlter: u.colorFillQuaternary,
    colorBgContainerDisabled: u.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: u.colorBgContainer,
    colorSplit: Zn(u.colorBorderSecondary, u.colorBgContainer),
    // ============== Text ============== //
    colorTextPlaceholder: u.colorTextQuaternary,
    colorTextDisabled: u.colorTextQuaternary,
    colorTextHeading: u.colorText,
    colorTextLabel: u.colorTextSecondary,
    colorTextDescription: u.colorTextTertiary,
    colorTextLightSolid: u.colorWhite,
    colorHighlight: u.colorError,
    colorBgTextHover: u.colorFillSecondary,
    colorBgTextActive: u.colorFill,
    colorIcon: u.colorTextTertiary,
    colorIconHover: u.colorText,
    colorErrorOutline: Zn(u.colorErrorBg, u.colorBgContainer),
    colorWarningOutline: Zn(u.colorWarningBg, u.colorBgContainer),
    // Font
    fontSizeIcon: u.fontSizeSM,
    // Line
    lineWidthFocus: u.lineWidth * 3,
    // Control
    lineWidth: u.lineWidth,
    controlOutlineWidth: u.lineWidth * 2,
    // Checkbox size and expand icon size
    controlInteractiveSize: u.controlHeight / 2,
    controlItemBgHover: u.colorFillTertiary,
    controlItemBgActive: u.colorPrimaryBg,
    controlItemBgActiveHover: u.colorPrimaryBgHover,
    controlItemBgActiveDisabled: u.colorFill,
    controlTmpOutline: u.colorFillQuaternary,
    controlOutline: Zn(u.colorPrimaryBg, u.colorBgContainer),
    lineType: u.lineType,
    borderRadius: u.borderRadius,
    borderRadiusXS: u.borderRadiusXS,
    borderRadiusSM: u.borderRadiusSM,
    borderRadiusLG: u.borderRadiusLG,
    fontWeightStrong: 600,
    opacityLoading: 0.65,
    linkDecoration: "none",
    linkHoverDecoration: "none",
    linkFocusDecoration: "none",
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    paddingXXS: u.sizeXXS,
    paddingXS: u.sizeXS,
    paddingSM: u.sizeSM,
    padding: u.size,
    paddingMD: u.sizeMD,
    paddingLG: u.sizeLG,
    paddingXL: u.sizeXL,
    paddingContentHorizontalLG: u.sizeLG,
    paddingContentVerticalLG: u.sizeMS,
    paddingContentHorizontal: u.sizeMS,
    paddingContentVertical: u.sizeSM,
    paddingContentHorizontalSM: u.size,
    paddingContentVerticalSM: u.sizeXS,
    marginXXS: u.sizeXXS,
    marginXS: u.sizeXS,
    marginSM: u.sizeSM,
    margin: u.size,
    marginMD: u.sizeMD,
    marginLG: u.sizeLG,
    marginXL: u.sizeXL,
    marginXXL: u.sizeXXL,
    boxShadow: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
    screenXS: a,
    screenXSMin: a,
    screenXSMax: o - 1,
    screenSM: o,
    screenSMMin: o,
    screenSMMax: i - 1,
    screenMD: i,
    screenMDMin: i,
    screenMDMax: s - 1,
    screenLG: s,
    screenLGMin: s,
    screenLGMax: c - 1,
    screenXL: c,
    screenXLMin: c,
    screenXLMax: l - 1,
    screenXXL: l,
    screenXXLMin: l,
    boxShadowPopoverArrow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
    boxShadowCard: `
      0 1px 2px -2px ${new qe("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new qe("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new qe("rgba(0, 0, 0, 0.09)").toRgbString()}
    `,
    boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)"
  }), n);
}
var ks = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var u = 0, n = Object.getOwnPropertySymbols(e); u < n.length; u++)
    t.indexOf(n[u]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[u]) && (r[n[u]] = e[n[u]]);
  return r;
};
const vi = {
  lineHeight: !0,
  lineHeightSM: !0,
  lineHeightLG: !0,
  lineHeightHeading1: !0,
  lineHeightHeading2: !0,
  lineHeightHeading3: !0,
  lineHeightHeading4: !0,
  lineHeightHeading5: !0,
  opacityLoading: !0,
  fontWeightStrong: !0,
  zIndexPopupBase: !0,
  zIndexBase: !0,
  opacityImage: !0
}, od = {
  size: !0,
  sizeSM: !0,
  sizeLG: !0,
  sizeMD: !0,
  sizeXS: !0,
  sizeXXS: !0,
  sizeMS: !0,
  sizeXL: !0,
  sizeXXL: !0,
  sizeUnit: !0,
  sizeStep: !0,
  motionBase: !0,
  motionUnit: !0
}, sg = {
  screenXS: !0,
  screenXSMin: !0,
  screenXSMax: !0,
  screenSM: !0,
  screenSMMin: !0,
  screenSMMax: !0,
  screenMD: !0,
  screenMDMin: !0,
  screenMDMax: !0,
  screenLG: !0,
  screenLGMin: !0,
  screenLGMax: !0,
  screenXL: !0,
  screenXLMin: !0,
  screenXLMax: !0,
  screenXXL: !0,
  screenXXLMin: !0
}, id = (e, t, r) => {
  const n = r.getDerivativeToken(e), {
    override: u
  } = t, a = ks(t, ["override"]);
  let o = Object.assign(Object.assign({}, n), {
    override: u
  });
  return o = gi(o), a && Object.entries(a).forEach((i) => {
    let [s, c] = i;
    const {
      theme: l
    } = c, d = ks(c, ["theme"]);
    let f = d;
    l && (f = id(Object.assign(Object.assign({}, o), d), {
      override: d
    }, l)), o[s] = f;
  }), o;
};
function ca() {
  const {
    token: e,
    hashed: t,
    theme: r,
    override: n,
    cssVar: u
  } = O.useContext(ad), a = `${Z1}-${t || ""}`, o = r || ud, [i, s, c] = Il(o, [gn, e], {
    salt: a,
    override: n,
    getComputedToken: id,
    // formatToken will not be consumed after 1.15.0 with getComputedToken.
    // But token will break if @ant-design/cssinjs is under 1.15.0 without it
    formatToken: gi,
    cssVar: u && {
      prefix: u.prefix,
      key: u.key,
      unitless: vi,
      ignore: od,
      preserve: sg
    }
  });
  return [o, c, t ? s : "", i, u];
}
const sd = function(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  return {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    color: e.colorText,
    fontSize: e.fontSize,
    // font-variant: @font-variant-base;
    lineHeight: e.lineHeight,
    listStyle: "none",
    // font-feature-settings: @font-feature-settings-base;
    fontFamily: t ? "inherit" : e.fontFamily
  };
}, cg = () => ({
  display: "inline-flex",
  alignItems: "center",
  color: "inherit",
  fontStyle: "normal",
  lineHeight: 0,
  textAlign: "center",
  textTransform: "none",
  // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
  verticalAlign: "-0.125em",
  textRendering: "optimizeLegibility",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
  "> *": {
    lineHeight: 1
  },
  svg: {
    display: "inline-block"
  }
}), lg = () => ({
  // https://github.com/ant-design/ant-design/issues/21301#issuecomment-583955229
  "&::before": {
    display: "table",
    content: '""'
  },
  "&::after": {
    // https://github.com/ant-design/ant-design/issues/21864
    display: "table",
    clear: "both",
    content: '""'
  }
}), dg = (e) => ({
  a: {
    color: e.colorLink,
    textDecoration: e.linkDecoration,
    backgroundColor: "transparent",
    // remove the gray background on active links in IE 10.
    outline: "none",
    cursor: "pointer",
    transition: `color ${e.motionDurationSlow}`,
    "-webkit-text-decoration-skip": "objects",
    // remove gaps in links underline in iOS 8+ and Safari 8+.
    "&:hover": {
      color: e.colorLinkHover
    },
    "&:active": {
      color: e.colorLinkActive
    },
    "&:active, &:hover": {
      textDecoration: e.linkHoverDecoration,
      outline: 0
    },
    // https://github.com/ant-design/ant-design/issues/22503
    "&:focus": {
      textDecoration: e.linkFocusDecoration,
      outline: 0
    },
    "&[disabled]": {
      color: e.colorTextDisabled,
      cursor: "not-allowed"
    }
  }
}), fg = (e, t, r, n) => {
  const u = `[class^="${t}"], [class*=" ${t}"]`, a = r ? `.${r}` : u, o = {
    boxSizing: "border-box",
    "&::before, &::after": {
      boxSizing: "border-box"
    }
  };
  let i = {};
  return n !== !1 && (i = {
    fontFamily: e.fontFamily,
    fontSize: e.fontSize
  }), {
    [a]: Object.assign(Object.assign(Object.assign({}, i), o), {
      [u]: o
    })
  };
}, cd = (e) => ({
  [`.${e}`]: Object.assign(Object.assign({}, cg()), {
    [`.${e} .${e}-icon`]: {
      display: "block"
    }
  })
}), {
  genStyleHooks: bi
} = rd({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: t
    } = Bt(er);
    return {
      rootPrefixCls: e(),
      iconPrefixCls: t
    };
  },
  useToken: () => {
    const [e, t, r, n, u] = ca();
    return {
      theme: e,
      realToken: t,
      hashId: r,
      token: n,
      cssVar: u
    };
  },
  useCSP: () => {
    const {
      csp: e
    } = Bt(er);
    return e ?? {};
  },
  getResetStyles: (e, t) => {
    var r;
    const n = dg(e);
    return [n, {
      "&": n
    }, cd((r = t == null ? void 0 : t.prefix.iconPrefixCls) !== null && r !== void 0 ? r : di)];
  },
  getCommonStyle: fg,
  getCompUnitless: () => vi
}), hg = (e, t) => {
  const [r, n] = ca();
  return wo({
    token: n,
    hashId: "",
    path: ["ant-design-icons", e],
    nonce: () => t == null ? void 0 : t.nonce,
    layer: {
      name: "antd"
    }
  }, () => [cd(e)]);
}, ld = (e) => {
  const [, , , , t] = ca();
  return t ? `${e}-css-var` : "";
}, Rr = /* @__PURE__ */ _.createContext(void 0), pg = (e) => {
  let {
    children: t,
    size: r
  } = e;
  const n = _.useContext(Rr);
  return /* @__PURE__ */ _.createElement(Rr.Provider, {
    value: r || n
  }, t);
}, dd = (e) => {
  const t = O.useContext(Rr);
  return O.useMemo(() => e ? typeof e == "string" ? e ?? t : typeof e == "function" ? e(t) : t : t, [e, t]);
};
function kt() {
  kt = function() {
    return t;
  };
  var e, t = {}, r = Object.prototype, n = r.hasOwnProperty, u = Object.defineProperty || function($, A, D) {
    $[A] = D.value;
  }, a = typeof Symbol == "function" ? Symbol : {}, o = a.iterator || "@@iterator", i = a.asyncIterator || "@@asyncIterator", s = a.toStringTag || "@@toStringTag";
  function c($, A, D) {
    return Object.defineProperty($, A, {
      value: D,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), $[A];
  }
  try {
    c({}, "");
  } catch {
    c = function(D, B, V) {
      return D[B] = V;
    };
  }
  function l($, A, D, B) {
    var V = A && A.prototype instanceof C ? A : C, H = Object.create(V.prototype), q = new M(B || []);
    return u(H, "_invoke", {
      value: T($, D, q)
    }), H;
  }
  function d($, A, D) {
    try {
      return {
        type: "normal",
        arg: $.call(A, D)
      };
    } catch (B) {
      return {
        type: "throw",
        arg: B
      };
    }
  }
  t.wrap = l;
  var f = "suspendedStart", v = "suspendedYield", h = "executing", g = "completed", p = {};
  function C() {
  }
  function m() {
  }
  function y() {
  }
  var E = {};
  c(E, o, function() {
    return this;
  });
  var b = Object.getPrototypeOf, w = b && b(b(L([])));
  w && w !== r && n.call(w, o) && (E = w);
  var S = y.prototype = C.prototype = Object.create(E);
  function R($) {
    ["next", "throw", "return"].forEach(function(A) {
      c($, A, function(D) {
        return this._invoke(A, D);
      });
    });
  }
  function k($, A) {
    function D(V, H, q, Y) {
      var G = d($[V], $, H);
      if (G.type !== "throw") {
        var K = G.arg, X = K.value;
        return X && ne(X) == "object" && n.call(X, "__await") ? A.resolve(X.__await).then(function(te) {
          D("next", te, q, Y);
        }, function(te) {
          D("throw", te, q, Y);
        }) : A.resolve(X).then(function(te) {
          K.value = te, q(K);
        }, function(te) {
          return D("throw", te, q, Y);
        });
      }
      Y(G.arg);
    }
    var B;
    u(this, "_invoke", {
      value: function(H, q) {
        function Y() {
          return new A(function(G, K) {
            D(H, q, G, K);
          });
        }
        return B = B ? B.then(Y, Y) : Y();
      }
    });
  }
  function T($, A, D) {
    var B = f;
    return function(V, H) {
      if (B === h) throw Error("Generator is already running");
      if (B === g) {
        if (V === "throw") throw H;
        return {
          value: e,
          done: !0
        };
      }
      for (D.method = V, D.arg = H; ; ) {
        var q = D.delegate;
        if (q) {
          var Y = I(q, D);
          if (Y) {
            if (Y === p) continue;
            return Y;
          }
        }
        if (D.method === "next") D.sent = D._sent = D.arg;
        else if (D.method === "throw") {
          if (B === f) throw B = g, D.arg;
          D.dispatchException(D.arg);
        } else D.method === "return" && D.abrupt("return", D.arg);
        B = h;
        var G = d($, A, D);
        if (G.type === "normal") {
          if (B = D.done ? g : v, G.arg === p) continue;
          return {
            value: G.arg,
            done: D.done
          };
        }
        G.type === "throw" && (B = g, D.method = "throw", D.arg = G.arg);
      }
    };
  }
  function I($, A) {
    var D = A.method, B = $.iterator[D];
    if (B === e) return A.delegate = null, D === "throw" && $.iterator.return && (A.method = "return", A.arg = e, I($, A), A.method === "throw") || D !== "return" && (A.method = "throw", A.arg = new TypeError("The iterator does not provide a '" + D + "' method")), p;
    var V = d(B, $.iterator, A.arg);
    if (V.type === "throw") return A.method = "throw", A.arg = V.arg, A.delegate = null, p;
    var H = V.arg;
    return H ? H.done ? (A[$.resultName] = H.value, A.next = $.nextLoc, A.method !== "return" && (A.method = "next", A.arg = e), A.delegate = null, p) : H : (A.method = "throw", A.arg = new TypeError("iterator result is not an object"), A.delegate = null, p);
  }
  function j($) {
    var A = {
      tryLoc: $[0]
    };
    1 in $ && (A.catchLoc = $[1]), 2 in $ && (A.finallyLoc = $[2], A.afterLoc = $[3]), this.tryEntries.push(A);
  }
  function P($) {
    var A = $.completion || {};
    A.type = "normal", delete A.arg, $.completion = A;
  }
  function M($) {
    this.tryEntries = [{
      tryLoc: "root"
    }], $.forEach(j, this), this.reset(!0);
  }
  function L($) {
    if ($ || $ === "") {
      var A = $[o];
      if (A) return A.call($);
      if (typeof $.next == "function") return $;
      if (!isNaN($.length)) {
        var D = -1, B = function V() {
          for (; ++D < $.length; ) if (n.call($, D)) return V.value = $[D], V.done = !1, V;
          return V.value = e, V.done = !0, V;
        };
        return B.next = B;
      }
    }
    throw new TypeError(ne($) + " is not iterable");
  }
  return m.prototype = y, u(S, "constructor", {
    value: y,
    configurable: !0
  }), u(y, "constructor", {
    value: m,
    configurable: !0
  }), m.displayName = c(y, s, "GeneratorFunction"), t.isGeneratorFunction = function($) {
    var A = typeof $ == "function" && $.constructor;
    return !!A && (A === m || (A.displayName || A.name) === "GeneratorFunction");
  }, t.mark = function($) {
    return Object.setPrototypeOf ? Object.setPrototypeOf($, y) : ($.__proto__ = y, c($, s, "GeneratorFunction")), $.prototype = Object.create(S), $;
  }, t.awrap = function($) {
    return {
      __await: $
    };
  }, R(k.prototype), c(k.prototype, i, function() {
    return this;
  }), t.AsyncIterator = k, t.async = function($, A, D, B, V) {
    V === void 0 && (V = Promise);
    var H = new k(l($, A, D, B), V);
    return t.isGeneratorFunction(A) ? H : H.next().then(function(q) {
      return q.done ? q.value : H.next();
    });
  }, R(S), c(S, s, "Generator"), c(S, o, function() {
    return this;
  }), c(S, "toString", function() {
    return "[object Generator]";
  }), t.keys = function($) {
    var A = Object($), D = [];
    for (var B in A) D.push(B);
    return D.reverse(), function V() {
      for (; D.length; ) {
        var H = D.pop();
        if (H in A) return V.value = H, V.done = !1, V;
      }
      return V.done = !0, V;
    };
  }, t.values = L, M.prototype = {
    constructor: M,
    reset: function(A) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(P), !A) for (var D in this) D.charAt(0) === "t" && n.call(this, D) && !isNaN(+D.slice(1)) && (this[D] = e);
    },
    stop: function() {
      this.done = !0;
      var A = this.tryEntries[0].completion;
      if (A.type === "throw") throw A.arg;
      return this.rval;
    },
    dispatchException: function(A) {
      if (this.done) throw A;
      var D = this;
      function B(K, X) {
        return q.type = "throw", q.arg = A, D.next = K, X && (D.method = "next", D.arg = e), !!X;
      }
      for (var V = this.tryEntries.length - 1; V >= 0; --V) {
        var H = this.tryEntries[V], q = H.completion;
        if (H.tryLoc === "root") return B("end");
        if (H.tryLoc <= this.prev) {
          var Y = n.call(H, "catchLoc"), G = n.call(H, "finallyLoc");
          if (Y && G) {
            if (this.prev < H.catchLoc) return B(H.catchLoc, !0);
            if (this.prev < H.finallyLoc) return B(H.finallyLoc);
          } else if (Y) {
            if (this.prev < H.catchLoc) return B(H.catchLoc, !0);
          } else {
            if (!G) throw Error("try statement without catch or finally");
            if (this.prev < H.finallyLoc) return B(H.finallyLoc);
          }
        }
      }
    },
    abrupt: function(A, D) {
      for (var B = this.tryEntries.length - 1; B >= 0; --B) {
        var V = this.tryEntries[B];
        if (V.tryLoc <= this.prev && n.call(V, "finallyLoc") && this.prev < V.finallyLoc) {
          var H = V;
          break;
        }
      }
      H && (A === "break" || A === "continue") && H.tryLoc <= D && D <= H.finallyLoc && (H = null);
      var q = H ? H.completion : {};
      return q.type = A, q.arg = D, H ? (this.method = "next", this.next = H.finallyLoc, p) : this.complete(q);
    },
    complete: function(A, D) {
      if (A.type === "throw") throw A.arg;
      return A.type === "break" || A.type === "continue" ? this.next = A.arg : A.type === "return" ? (this.rval = this.arg = A.arg, this.method = "return", this.next = "end") : A.type === "normal" && D && (this.next = D), p;
    },
    finish: function(A) {
      for (var D = this.tryEntries.length - 1; D >= 0; --D) {
        var B = this.tryEntries[D];
        if (B.finallyLoc === A) return this.complete(B.completion, B.afterLoc), P(B), p;
      }
    },
    catch: function(A) {
      for (var D = this.tryEntries.length - 1; D >= 0; --D) {
        var B = this.tryEntries[D];
        if (B.tryLoc === A) {
          var V = B.completion;
          if (V.type === "throw") {
            var H = V.arg;
            P(B);
          }
          return H;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function(A, D, B) {
      return this.delegate = {
        iterator: L(A),
        resultName: D,
        nextLoc: B
      }, this.method === "next" && (this.arg = e), p;
    }
  }, t;
}
function As(e, t, r, n, u, a, o) {
  try {
    var i = e[a](o), s = i.value;
  } catch (c) {
    return void r(c);
  }
  i.done ? t(s) : Promise.resolve(s).then(n, u);
}
function Nn(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(n, u) {
      var a = e.apply(t, r);
      function o(s) {
        As(a, n, u, o, i, "next", s);
      }
      function i(s) {
        As(a, n, u, o, i, "throw", s);
      }
      o(void 0);
    });
  };
}
var or = "RC_FORM_INTERNAL_HOOKS", $e = function() {
  Ie(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Pr = /* @__PURE__ */ _.createContext({
  getFieldValue: $e,
  getFieldsValue: $e,
  getFieldError: $e,
  getFieldWarning: $e,
  getFieldsError: $e,
  isFieldsTouched: $e,
  isFieldTouched: $e,
  isFieldValidating: $e,
  isFieldsValidating: $e,
  resetFields: $e,
  setFields: $e,
  setFieldValue: $e,
  setFieldsValue: $e,
  validateFields: $e,
  submit: $e,
  getInternalHooks: function() {
    return $e(), {
      dispatch: $e,
      initEntityValue: $e,
      registerField: $e,
      useSubscribe: $e,
      setInitialValues: $e,
      destroyForm: $e,
      setCallbacks: $e,
      registerWatch: $e,
      getFields: $e,
      setValidateMessages: $e,
      setPreserve: $e,
      getInitialValue: $e
    };
  }
}), Eu = /* @__PURE__ */ _.createContext(null);
function ko(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function mg(e) {
  return e && !!e._init;
}
function Ao() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var t = JSON.parse(JSON.stringify(this));
      return t.clone = this.clone, t;
    }
  };
}
var Do = Ao();
function gg(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
function vg(e, t, r) {
  if (oi()) return Reflect.construct.apply(null, arguments);
  var n = [null];
  n.push.apply(n, t);
  var u = new (e.bind.apply(e, n))();
  return r && ln(u, r.prototype), u;
}
function To(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return To = function(n) {
    if (n === null || !gg(n)) return n;
    if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
    if (t !== void 0) {
      if (t.has(n)) return t.get(n);
      t.set(n, u);
    }
    function u() {
      return vg(n, arguments, dn(this).constructor);
    }
    return u.prototype = Object.create(n.prototype, {
      constructor: {
        value: u,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), ln(u, n);
  }, To(e);
}
var bg = /%[sdj%]/g, fd = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (fd = function(t, r) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && r.every(function(n) {
    return typeof n == "string";
  }) && console.warn(t, r);
});
function Ro(e) {
  if (!e || !e.length) return null;
  var t = {};
  return e.forEach(function(r) {
    var n = r.field;
    t[n] = t[n] || [], t[n].push(r);
  }), t;
}
function ht(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  var u = 0, a = r.length;
  if (typeof e == "function")
    return e.apply(null, r);
  if (typeof e == "string") {
    var o = e.replace(bg, function(i) {
      if (i === "%%")
        return "%";
      if (u >= a)
        return i;
      switch (i) {
        case "%s":
          return String(r[u++]);
        case "%d":
          return Number(r[u++]);
        case "%j":
          try {
            return JSON.stringify(r[u++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return i;
      }
    });
    return o;
  }
  return e;
}
function yg(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function Ge(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || yg(t) && typeof e == "string" && !e);
}
function xg(e, t, r) {
  var n = [], u = 0, a = e.length;
  function o(i) {
    n.push.apply(n, re(i || [])), u++, u === a && r(n);
  }
  e.forEach(function(i) {
    t(i, o);
  });
}
function Ds(e, t, r) {
  var n = 0, u = e.length;
  function a(o) {
    if (o && o.length) {
      r(o);
      return;
    }
    var i = n;
    n = n + 1, i < u ? t(e[i], a) : r([]);
  }
  a([]);
}
function _g(e) {
  var t = [];
  return Object.keys(e).forEach(function(r) {
    t.push.apply(t, re(e[r] || []));
  }), t;
}
var Ts = /* @__PURE__ */ function(e) {
  dr(r, e);
  var t = fr(r);
  function r(n, u) {
    var a;
    return Qe(this, r), a = t.call(this, "Async Validation Error"), F(ce(a), "errors", void 0), F(ce(a), "fields", void 0), a.errors = n, a.fields = u, a;
  }
  return et(r);
}(/* @__PURE__ */ To(Error));
function Cg(e, t, r, n, u) {
  if (t.first) {
    var a = new Promise(function(f, v) {
      var h = function(C) {
        return n(C), C.length ? v(new Ts(C, Ro(C))) : f(u);
      }, g = _g(e);
      Ds(g, r, h);
    });
    return a.catch(function(f) {
      return f;
    }), a;
  }
  var o = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], i = Object.keys(e), s = i.length, c = 0, l = [], d = new Promise(function(f, v) {
    var h = function(p) {
      if (l.push.apply(l, p), c++, c === s)
        return n(l), l.length ? v(new Ts(l, Ro(l))) : f(u);
    };
    i.length || (n(l), f(u)), i.forEach(function(g) {
      var p = e[g];
      o.indexOf(g) !== -1 ? Ds(p, r, h) : xg(p, r, h);
    });
  });
  return d.catch(function(f) {
    return f;
  }), d;
}
function Eg(e) {
  return !!(e && e.message !== void 0);
}
function Sg(e, t) {
  for (var r = e, n = 0; n < t.length; n++) {
    if (r == null)
      return r;
    r = r[t[n]];
  }
  return r;
}
function Rs(e, t) {
  return function(r) {
    var n;
    return e.fullFields ? n = Sg(t, e.fullFields) : n = t[r.field || e.fullField], Eg(r) ? (r.field = r.field || e.fullField, r.fieldValue = n, r) : {
      message: typeof r == "function" ? r() : r,
      fieldValue: n,
      field: r.field || e.fullField
    };
  };
}
function Ps(e, t) {
  if (t) {
    for (var r in t)
      if (t.hasOwnProperty(r)) {
        var n = t[r];
        ne(n) === "object" && ne(e[r]) === "object" ? e[r] = N(N({}, e[r]), n) : e[r] = n;
      }
  }
  return e;
}
var vr = "enum", wg = function(t, r, n, u, a) {
  t[vr] = Array.isArray(t[vr]) ? t[vr] : [], t[vr].indexOf(r) === -1 && u.push(ht(a.messages[vr], t.fullField, t[vr].join(", ")));
}, $g = function(t, r, n, u, a) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(r) || u.push(ht(a.messages.pattern.mismatch, t.fullField, r, t.pattern));
    else if (typeof t.pattern == "string") {
      var o = new RegExp(t.pattern);
      o.test(r) || u.push(ht(a.messages.pattern.mismatch, t.fullField, r, t.pattern));
    }
  }
}, Fg = function(t, r, n, u, a) {
  var o = typeof t.len == "number", i = typeof t.min == "number", s = typeof t.max == "number", c = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, l = r, d = null, f = typeof r == "number", v = typeof r == "string", h = Array.isArray(r);
  if (f ? d = "number" : v ? d = "string" : h && (d = "array"), !d)
    return !1;
  h && (l = r.length), v && (l = r.replace(c, "_").length), o ? l !== t.len && u.push(ht(a.messages[d].len, t.fullField, t.len)) : i && !s && l < t.min ? u.push(ht(a.messages[d].min, t.fullField, t.min)) : s && !i && l > t.max ? u.push(ht(a.messages[d].max, t.fullField, t.max)) : i && s && (l < t.min || l > t.max) && u.push(ht(a.messages[d].range, t.fullField, t.min, t.max));
}, hd = function(t, r, n, u, a, o) {
  t.required && (!n.hasOwnProperty(t.field) || Ge(r, o || t.type)) && u.push(ht(a.messages.required, t.fullField));
}, Jn;
const kg = function() {
  if (Jn)
    return Jn;
  var e = "[a-fA-F\\d:]", t = function(w) {
    return w && w.includeBoundaries ? "(?:(?<=\\s|^)(?=".concat(e, ")|(?<=").concat(e, ")(?=\\s|$))") : "";
  }, r = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", n = "[a-fA-F\\d]{1,4}", u = [
    "(?:".concat(n, ":){7}(?:").concat(n, "|:)"),
    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
    "(?:".concat(n, ":){6}(?:").concat(r, "|:").concat(n, "|:)"),
    // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::
    "(?:".concat(n, ":){5}(?::").concat(r, "|(?::").concat(n, "){1,2}|:)"),
    // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::
    "(?:".concat(n, ":){4}(?:(?::").concat(n, "){0,1}:").concat(r, "|(?::").concat(n, "){1,3}|:)"),
    // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::
    "(?:".concat(n, ":){3}(?:(?::").concat(n, "){0,2}:").concat(r, "|(?::").concat(n, "){1,4}|:)"),
    // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::
    "(?:".concat(n, ":){2}(?:(?::").concat(n, "){0,3}:").concat(r, "|(?::").concat(n, "){1,5}|:)"),
    // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::
    "(?:".concat(n, ":){1}(?:(?::").concat(n, "){0,4}:").concat(r, "|(?::").concat(n, "){1,6}|:)"),
    // 1::              1::3:4:5:6:7:8   1::8            1::
    "(?::(?:(?::".concat(n, "){0,5}:").concat(r, "|(?::").concat(n, "){1,7}|:))")
    // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::
  ], a = "(?:%[0-9a-zA-Z]{1,})?", o = "(?:".concat(u.join("|"), ")").concat(a), i = new RegExp("(?:^".concat(r, "$)|(?:^").concat(o, "$)")), s = new RegExp("^".concat(r, "$")), c = new RegExp("^".concat(o, "$")), l = function(w) {
    return w && w.exact ? i : new RegExp("(?:".concat(t(w)).concat(r).concat(t(w), ")|(?:").concat(t(w)).concat(o).concat(t(w), ")"), "g");
  };
  l.v4 = function(b) {
    return b && b.exact ? s : new RegExp("".concat(t(b)).concat(r).concat(t(b)), "g");
  }, l.v6 = function(b) {
    return b && b.exact ? c : new RegExp("".concat(t(b)).concat(o).concat(t(b)), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", v = l.v4().source, h = l.v6().source, g = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", p = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", C = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", m = "(?::\\d{2,5})?", y = '(?:[/?#][^\\s"]*)?', E = "(?:".concat(d, "|www\\.)").concat(f, "(?:localhost|").concat(v, "|").concat(h, "|").concat(g).concat(p).concat(C, ")").concat(m).concat(y);
  return Jn = new RegExp("(?:^".concat(E, "$)"), "i"), Jn;
};
var Os = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, tn = {
  integer: function(t) {
    return tn.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return tn.number(t) && !tn.integer(t);
  },
  array: function(t) {
    return Array.isArray(t);
  },
  regexp: function(t) {
    if (t instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(t);
    } catch {
      return !1;
    }
  },
  date: function(t) {
    return typeof t.getTime == "function" && typeof t.getMonth == "function" && typeof t.getYear == "function" && !isNaN(t.getTime());
  },
  number: function(t) {
    return isNaN(t) ? !1 : typeof t == "number";
  },
  object: function(t) {
    return ne(t) === "object" && !tn.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(Os.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(kg());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(Os.hex);
  }
}, Ag = function(t, r, n, u, a) {
  if (t.required && r === void 0) {
    hd(t, r, n, u, a);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], i = t.type;
  o.indexOf(i) > -1 ? tn[i](r) || u.push(ht(a.messages.types[i], t.fullField, t.type)) : i && ne(r) !== t.type && u.push(ht(a.messages.types[i], t.fullField, t.type));
}, Dg = function(t, r, n, u, a) {
  (/^\s+$/.test(r) || r === "") && u.push(ht(a.messages.whitespace, t.fullField));
};
const me = {
  required: hd,
  whitespace: Dg,
  type: Ag,
  range: Fg,
  enum: wg,
  pattern: $g
};
var Tg = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (Ge(r) && !t.required)
      return n();
    me.required(t, r, u, o, a);
  }
  n(o);
}, Rg = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (r == null && !t.required)
      return n();
    me.required(t, r, u, o, a, "array"), r != null && (me.type(t, r, u, o, a), me.range(t, r, u, o, a));
  }
  n(o);
}, Pg = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (Ge(r) && !t.required)
      return n();
    me.required(t, r, u, o, a), r !== void 0 && me.type(t, r, u, o, a);
  }
  n(o);
}, Og = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (Ge(r, "date") && !t.required)
      return n();
    if (me.required(t, r, u, o, a), !Ge(r, "date")) {
      var s;
      r instanceof Date ? s = r : s = new Date(r), me.type(t, s, u, o, a), s && me.range(t, s.getTime(), u, o, a);
    }
  }
  n(o);
}, Mg = "enum", Ig = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (Ge(r) && !t.required)
      return n();
    me.required(t, r, u, o, a), r !== void 0 && me[Mg](t, r, u, o, a);
  }
  n(o);
}, Ng = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (Ge(r) && !t.required)
      return n();
    me.required(t, r, u, o, a), r !== void 0 && (me.type(t, r, u, o, a), me.range(t, r, u, o, a));
  }
  n(o);
}, jg = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (Ge(r) && !t.required)
      return n();
    me.required(t, r, u, o, a), r !== void 0 && (me.type(t, r, u, o, a), me.range(t, r, u, o, a));
  }
  n(o);
}, Lg = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (Ge(r) && !t.required)
      return n();
    me.required(t, r, u, o, a), r !== void 0 && me.type(t, r, u, o, a);
  }
  n(o);
}, zg = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (r === "" && (r = void 0), Ge(r) && !t.required)
      return n();
    me.required(t, r, u, o, a), r !== void 0 && (me.type(t, r, u, o, a), me.range(t, r, u, o, a));
  }
  n(o);
}, Bg = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (Ge(r) && !t.required)
      return n();
    me.required(t, r, u, o, a), r !== void 0 && me.type(t, r, u, o, a);
  }
  n(o);
}, Vg = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (Ge(r, "string") && !t.required)
      return n();
    me.required(t, r, u, o, a), Ge(r, "string") || me.pattern(t, r, u, o, a);
  }
  n(o);
}, Hg = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (Ge(r) && !t.required)
      return n();
    me.required(t, r, u, o, a), Ge(r) || me.type(t, r, u, o, a);
  }
  n(o);
}, qg = function(t, r, n, u, a) {
  var o = [], i = Array.isArray(r) ? "array" : ne(r);
  me.required(t, r, u, o, a, i), n(o);
}, Wg = function(t, r, n, u, a) {
  var o = [], i = t.required || !t.required && u.hasOwnProperty(t.field);
  if (i) {
    if (Ge(r, "string") && !t.required)
      return n();
    me.required(t, r, u, o, a, "string"), Ge(r, "string") || (me.type(t, r, u, o, a), me.range(t, r, u, o, a), me.pattern(t, r, u, o, a), t.whitespace === !0 && me.whitespace(t, r, u, o, a));
  }
  n(o);
}, Ma = function(t, r, n, u, a) {
  var o = t.type, i = [], s = t.required || !t.required && u.hasOwnProperty(t.field);
  if (s) {
    if (Ge(r, o) && !t.required)
      return n();
    me.required(t, r, u, i, a, o), Ge(r, o) || me.type(t, r, u, i, a);
  }
  n(i);
};
const an = {
  string: Wg,
  method: Lg,
  number: zg,
  boolean: Pg,
  regexp: Hg,
  integer: jg,
  float: Ng,
  array: Rg,
  object: Bg,
  enum: Ig,
  pattern: Vg,
  date: Og,
  url: Ma,
  hex: Ma,
  email: Ma,
  required: qg,
  any: Tg
};
var jn = /* @__PURE__ */ function() {
  function e(t) {
    Qe(this, e), F(this, "rules", null), F(this, "_messages", Do), this.define(t);
  }
  return et(e, [{
    key: "define",
    value: function(r) {
      var n = this;
      if (!r)
        throw new Error("Cannot configure a schema with no rules");
      if (ne(r) !== "object" || Array.isArray(r))
        throw new Error("Rules must be an object");
      this.rules = {}, Object.keys(r).forEach(function(u) {
        var a = r[u];
        n.rules[u] = Array.isArray(a) ? a : [a];
      });
    }
  }, {
    key: "messages",
    value: function(r) {
      return r && (this._messages = Ps(Ao(), r)), this._messages;
    }
  }, {
    key: "validate",
    value: function(r) {
      var n = this, u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
      }, o = r, i = u, s = a;
      if (typeof i == "function" && (s = i, i = {}), !this.rules || Object.keys(this.rules).length === 0)
        return s && s(null, o), Promise.resolve(o);
      function c(h) {
        var g = [], p = {};
        function C(y) {
          if (Array.isArray(y)) {
            var E;
            g = (E = g).concat.apply(E, re(y));
          } else
            g.push(y);
        }
        for (var m = 0; m < h.length; m++)
          C(h[m]);
        g.length ? (p = Ro(g), s(g, p)) : s(null, o);
      }
      if (i.messages) {
        var l = this.messages();
        l === Do && (l = Ao()), Ps(l, i.messages), i.messages = l;
      } else
        i.messages = this.messages();
      var d = {}, f = i.keys || Object.keys(this.rules);
      f.forEach(function(h) {
        var g = n.rules[h], p = o[h];
        g.forEach(function(C) {
          var m = C;
          typeof m.transform == "function" && (o === r && (o = N({}, o)), p = o[h] = m.transform(p), p != null && (m.type = m.type || (Array.isArray(p) ? "array" : ne(p)))), typeof m == "function" ? m = {
            validator: m
          } : m = N({}, m), m.validator = n.getValidationMethod(m), m.validator && (m.field = h, m.fullField = m.fullField || h, m.type = n.getType(m), d[h] = d[h] || [], d[h].push({
            rule: m,
            value: p,
            source: o,
            field: h
          }));
        });
      });
      var v = {};
      return Cg(d, i, function(h, g) {
        var p = h.rule, C = (p.type === "object" || p.type === "array") && (ne(p.fields) === "object" || ne(p.defaultField) === "object");
        C = C && (p.required || !p.required && h.value), p.field = h.field;
        function m(S, R) {
          return N(N({}, R), {}, {
            fullField: "".concat(p.fullField, ".").concat(S),
            fullFields: p.fullFields ? [].concat(re(p.fullFields), [S]) : [S]
          });
        }
        function y() {
          var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], R = Array.isArray(S) ? S : [S];
          !i.suppressWarning && R.length && e.warning("async-validator:", R), R.length && p.message !== void 0 && (R = [].concat(p.message));
          var k = R.map(Rs(p, o));
          if (i.first && k.length)
            return v[p.field] = 1, g(k);
          if (!C)
            g(k);
          else {
            if (p.required && !h.value)
              return p.message !== void 0 ? k = [].concat(p.message).map(Rs(p, o)) : i.error && (k = [i.error(p, ht(i.messages.required, p.field))]), g(k);
            var T = {};
            p.defaultField && Object.keys(h.value).map(function(P) {
              T[P] = p.defaultField;
            }), T = N(N({}, T), h.rule.fields);
            var I = {};
            Object.keys(T).forEach(function(P) {
              var M = T[P], L = Array.isArray(M) ? M : [M];
              I[P] = L.map(m.bind(null, P));
            });
            var j = new e(I);
            j.messages(i.messages), h.rule.options && (h.rule.options.messages = i.messages, h.rule.options.error = i.error), j.validate(h.value, h.rule.options || i, function(P) {
              var M = [];
              k && k.length && M.push.apply(M, re(k)), P && P.length && M.push.apply(M, re(P)), g(M.length ? M : null);
            });
          }
        }
        var E;
        if (p.asyncValidator)
          E = p.asyncValidator(p, h.value, y, h.source, i);
        else if (p.validator) {
          try {
            E = p.validator(p, h.value, y, h.source, i);
          } catch (S) {
            var b, w;
            (b = (w = console).error) === null || b === void 0 || b.call(w, S), i.suppressValidatorError || setTimeout(function() {
              throw S;
            }, 0), y(S.message);
          }
          E === !0 ? y() : E === !1 ? y(typeof p.message == "function" ? p.message(p.fullField || p.field) : p.message || "".concat(p.fullField || p.field, " fails")) : E instanceof Array ? y(E) : E instanceof Error && y(E.message);
        }
        E && E.then && E.then(function() {
          return y();
        }, function(S) {
          return y(S);
        });
      }, function(h) {
        c(h);
      }, o);
    }
  }, {
    key: "getType",
    value: function(r) {
      if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !an.hasOwnProperty(r.type))
        throw new Error(ht("Unknown rule type %s", r.type));
      return r.type || "string";
    }
  }, {
    key: "getValidationMethod",
    value: function(r) {
      if (typeof r.validator == "function")
        return r.validator;
      var n = Object.keys(r), u = n.indexOf("message");
      return u !== -1 && n.splice(u, 1), n.length === 1 && n[0] === "required" ? an.required : an[this.getType(r)] || void 0;
    }
  }]), e;
}();
F(jn, "register", function(t, r) {
  if (typeof r != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  an[t] = r;
});
F(jn, "warning", fd);
F(jn, "messages", Do);
F(jn, "validators", an);
var dt = "'${name}' is not a valid ${type}", pd = {
  default: "Validation error on field '${name}'",
  required: "'${name}' is required",
  enum: "'${name}' must be one of [${enum}]",
  whitespace: "'${name}' cannot be empty",
  date: {
    format: "'${name}' is invalid for format date",
    parse: "'${name}' could not be parsed as date",
    invalid: "'${name}' is invalid date"
  },
  types: {
    string: dt,
    method: dt,
    array: dt,
    object: dt,
    number: dt,
    date: dt,
    boolean: dt,
    integer: dt,
    float: dt,
    regexp: dt,
    email: dt,
    url: dt,
    hex: dt
  },
  string: {
    len: "'${name}' must be exactly ${len} characters",
    min: "'${name}' must be at least ${min} characters",
    max: "'${name}' cannot be longer than ${max} characters",
    range: "'${name}' must be between ${min} and ${max} characters"
  },
  number: {
    len: "'${name}' must equal ${len}",
    min: "'${name}' cannot be less than ${min}",
    max: "'${name}' cannot be greater than ${max}",
    range: "'${name}' must be between ${min} and ${max}"
  },
  array: {
    len: "'${name}' must be exactly ${len} in length",
    min: "'${name}' cannot be less than ${min} in length",
    max: "'${name}' cannot be greater than ${max} in length",
    range: "'${name}' must be between ${min} and ${max} in length"
  },
  pattern: {
    mismatch: "'${name}' does not match pattern ${pattern}"
  }
}, Ms = jn;
function Ug(e, t) {
  return e.replace(/\\?\$\{\w+\}/g, function(r) {
    if (r.startsWith("\\"))
      return r.slice(1);
    var n = r.slice(2, -1);
    return t[n];
  });
}
var Is = "CODE_LOGIC_ERROR";
function Po(e, t, r, n, u) {
  return Oo.apply(this, arguments);
}
function Oo() {
  return Oo = Nn(/* @__PURE__ */ kt().mark(function e(t, r, n, u, a) {
    var o, i, s, c, l, d, f, v, h;
    return kt().wrap(function(p) {
      for (; ; ) switch (p.prev = p.next) {
        case 0:
          return o = N({}, n), delete o.ruleIndex, Ms.warning = function() {
          }, o.validator && (i = o.validator, o.validator = function() {
            try {
              return i.apply(void 0, arguments);
            } catch (C) {
              return console.error(C), Promise.reject(Is);
            }
          }), s = null, o && o.type === "array" && o.defaultField && (s = o.defaultField, delete o.defaultField), c = new Ms(F({}, t, [o])), l = xr(pd, u.validateMessages), c.messages(l), d = [], p.prev = 10, p.next = 13, Promise.resolve(c.validate(F({}, t, r), N({}, u)));
        case 13:
          p.next = 18;
          break;
        case 15:
          p.prev = 15, p.t0 = p.catch(10), p.t0.errors && (d = p.t0.errors.map(function(C, m) {
            var y = C.message, E = y === Is ? l.default : y;
            return /* @__PURE__ */ _.isValidElement(E) ? (
              // Wrap ReactNode with `key`
              /* @__PURE__ */ _.cloneElement(E, {
                key: "error_".concat(m)
              })
            ) : E;
          }));
        case 18:
          if (!(!d.length && s)) {
            p.next = 23;
            break;
          }
          return p.next = 21, Promise.all(r.map(function(C, m) {
            return Po("".concat(t, ".").concat(m), C, s, u, a);
          }));
        case 21:
          return f = p.sent, p.abrupt("return", f.reduce(function(C, m) {
            return [].concat(re(C), re(m));
          }, []));
        case 23:
          return v = N(N({}, n), {}, {
            name: t,
            enum: (n.enum || []).join(", ")
          }, a), h = d.map(function(C) {
            return typeof C == "string" ? Ug(C, v) : C;
          }), p.abrupt("return", h);
        case 26:
        case "end":
          return p.stop();
      }
    }, e, null, [[10, 15]]);
  })), Oo.apply(this, arguments);
}
function Yg(e, t, r, n, u, a) {
  var o = e.join("."), i = r.map(function(l, d) {
    var f = l.validator, v = N(N({}, l), {}, {
      ruleIndex: d
    });
    return f && (v.validator = function(h, g, p) {
      var C = !1, m = function() {
        for (var b = arguments.length, w = new Array(b), S = 0; S < b; S++)
          w[S] = arguments[S];
        Promise.resolve().then(function() {
          Ie(!C, "Your validator function has already return a promise. `callback` will be ignored."), C || p.apply(void 0, w);
        });
      }, y = f(h, g, m);
      C = y && typeof y.then == "function" && typeof y.catch == "function", Ie(C, "`callback` is deprecated. Please return a promise instead."), C && y.then(function() {
        p();
      }).catch(function(E) {
        p(E || " ");
      });
    }), v;
  }).sort(function(l, d) {
    var f = l.warningOnly, v = l.ruleIndex, h = d.warningOnly, g = d.ruleIndex;
    return !!f == !!h ? v - g : f ? 1 : -1;
  }), s;
  if (u === !0)
    s = new Promise(/* @__PURE__ */ function() {
      var l = Nn(/* @__PURE__ */ kt().mark(function d(f, v) {
        var h, g, p;
        return kt().wrap(function(m) {
          for (; ; ) switch (m.prev = m.next) {
            case 0:
              h = 0;
            case 1:
              if (!(h < i.length)) {
                m.next = 12;
                break;
              }
              return g = i[h], m.next = 5, Po(o, t, g, n, a);
            case 5:
              if (p = m.sent, !p.length) {
                m.next = 9;
                break;
              }
              return v([{
                errors: p,
                rule: g
              }]), m.abrupt("return");
            case 9:
              h += 1, m.next = 1;
              break;
            case 12:
              f([]);
            case 13:
            case "end":
              return m.stop();
          }
        }, d);
      }));
      return function(d, f) {
        return l.apply(this, arguments);
      };
    }());
  else {
    var c = i.map(function(l) {
      return Po(o, t, l, n, a).then(function(d) {
        return {
          errors: d,
          rule: l
        };
      });
    });
    s = (u ? Kg(c) : Gg(c)).then(function(l) {
      return Promise.reject(l);
    });
  }
  return s.catch(function(l) {
    return l;
  }), s;
}
function Gg(e) {
  return Mo.apply(this, arguments);
}
function Mo() {
  return Mo = Nn(/* @__PURE__ */ kt().mark(function e(t) {
    return kt().wrap(function(n) {
      for (; ; ) switch (n.prev = n.next) {
        case 0:
          return n.abrupt("return", Promise.all(t).then(function(u) {
            var a, o = (a = []).concat.apply(a, re(u));
            return o;
          }));
        case 1:
        case "end":
          return n.stop();
      }
    }, e);
  })), Mo.apply(this, arguments);
}
function Kg(e) {
  return Io.apply(this, arguments);
}
function Io() {
  return Io = Nn(/* @__PURE__ */ kt().mark(function e(t) {
    var r;
    return kt().wrap(function(u) {
      for (; ; ) switch (u.prev = u.next) {
        case 0:
          return r = 0, u.abrupt("return", new Promise(function(a) {
            t.forEach(function(o) {
              o.then(function(i) {
                i.errors.length && a([i]), r += 1, r === t.length && a([]);
              });
            });
          }));
        case 2:
        case "end":
          return u.stop();
      }
    }, e);
  })), Io.apply(this, arguments);
}
function Ve(e) {
  return ko(e);
}
function Ns(e, t) {
  var r = {};
  return t.forEach(function(n) {
    var u = St(e, n);
    r = Ct(r, n, u);
  }), r;
}
function wr(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return e && e.some(function(n) {
    return md(t, n, r);
  });
}
function md(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return !e || !t || !r && e.length !== t.length ? !1 : t.every(function(n, u) {
    return e[u] === n;
  });
}
function Xg(e, t) {
  if (e === t)
    return !0;
  if (!e && t || e && !t || !e || !t || ne(e) !== "object" || ne(t) !== "object")
    return !1;
  var r = Object.keys(e), n = Object.keys(t), u = new Set([].concat(r, n));
  return re(u).every(function(a) {
    var o = e[a], i = t[a];
    return typeof o == "function" && typeof i == "function" ? !0 : o === i;
  });
}
function Zg(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && ne(t.target) === "object" && e in t.target ? t.target[e] : t;
}
function js(e, t, r) {
  var n = e.length;
  if (t < 0 || t >= n || r < 0 || r >= n)
    return e;
  var u = e[t], a = t - r;
  return a > 0 ? [].concat(re(e.slice(0, r)), [u], re(e.slice(r, t)), re(e.slice(t + 1, n))) : a < 0 ? [].concat(re(e.slice(0, t)), re(e.slice(t + 1, r + 1)), [u], re(e.slice(r + 1, n))) : e;
}
var Jg = ["name"], yt = [];
function Ia(e, t, r, n, u, a) {
  return typeof e == "function" ? e(t, r, "source" in a ? {
    source: a.source
  } : {}) : n !== u;
}
var yi = /* @__PURE__ */ function(e) {
  dr(r, e);
  var t = fr(r);
  function r(n) {
    var u;
    if (Qe(this, r), u = t.call(this, n), F(ce(u), "state", {
      resetCount: 0
    }), F(ce(u), "cancelRegisterFunc", null), F(ce(u), "mounted", !1), F(ce(u), "touched", !1), F(ce(u), "dirty", !1), F(ce(u), "validatePromise", void 0), F(ce(u), "prevValidating", void 0), F(ce(u), "errors", yt), F(ce(u), "warnings", yt), F(ce(u), "cancelRegister", function() {
      var s = u.props, c = s.preserve, l = s.isListField, d = s.name;
      u.cancelRegisterFunc && u.cancelRegisterFunc(l, c, Ve(d)), u.cancelRegisterFunc = null;
    }), F(ce(u), "getNamePath", function() {
      var s = u.props, c = s.name, l = s.fieldContext, d = l.prefixName, f = d === void 0 ? [] : d;
      return c !== void 0 ? [].concat(re(f), re(c)) : [];
    }), F(ce(u), "getRules", function() {
      var s = u.props, c = s.rules, l = c === void 0 ? [] : c, d = s.fieldContext;
      return l.map(function(f) {
        return typeof f == "function" ? f(d) : f;
      });
    }), F(ce(u), "refresh", function() {
      u.mounted && u.setState(function(s) {
        var c = s.resetCount;
        return {
          resetCount: c + 1
        };
      });
    }), F(ce(u), "metaCache", null), F(ce(u), "triggerMetaEvent", function(s) {
      var c = u.props.onMetaChange;
      if (c) {
        var l = N(N({}, u.getMeta()), {}, {
          destroy: s
        });
        yo(u.metaCache, l) || c(l), u.metaCache = l;
      } else
        u.metaCache = null;
    }), F(ce(u), "onStoreChange", function(s, c, l) {
      var d = u.props, f = d.shouldUpdate, v = d.dependencies, h = v === void 0 ? [] : v, g = d.onReset, p = l.store, C = u.getNamePath(), m = u.getValue(s), y = u.getValue(p), E = c && wr(c, C);
      switch (l.type === "valueUpdate" && l.source === "external" && !yo(m, y) && (u.touched = !0, u.dirty = !0, u.validatePromise = null, u.errors = yt, u.warnings = yt, u.triggerMetaEvent()), l.type) {
        case "reset":
          if (!c || E) {
            u.touched = !1, u.dirty = !1, u.validatePromise = void 0, u.errors = yt, u.warnings = yt, u.triggerMetaEvent(), g == null || g(), u.refresh();
            return;
          }
          break;
        case "remove": {
          if (f && Ia(f, s, p, m, y, l)) {
            u.reRender();
            return;
          }
          break;
        }
        case "setField": {
          var b = l.data;
          if (E) {
            "touched" in b && (u.touched = b.touched), "validating" in b && !("originRCField" in b) && (u.validatePromise = b.validating ? Promise.resolve([]) : null), "errors" in b && (u.errors = b.errors || yt), "warnings" in b && (u.warnings = b.warnings || yt), u.dirty = !0, u.triggerMetaEvent(), u.reRender();
            return;
          } else if ("value" in b && wr(c, C, !0)) {
            u.reRender();
            return;
          }
          if (f && !C.length && Ia(f, s, p, m, y, l)) {
            u.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var w = h.map(Ve);
          if (w.some(function(S) {
            return wr(l.relatedFields, S);
          })) {
            u.reRender();
            return;
          }
          break;
        }
        default:
          if (E || (!h.length || C.length || f) && Ia(f, s, p, m, y, l)) {
            u.reRender();
            return;
          }
          break;
      }
      f === !0 && u.reRender();
    }), F(ce(u), "validateRules", function(s) {
      var c = u.getNamePath(), l = u.getValue(), d = s || {}, f = d.triggerName, v = d.validateOnly, h = v === void 0 ? !1 : v, g = Promise.resolve().then(/* @__PURE__ */ Nn(/* @__PURE__ */ kt().mark(function p() {
        var C, m, y, E, b, w, S;
        return kt().wrap(function(k) {
          for (; ; ) switch (k.prev = k.next) {
            case 0:
              if (u.mounted) {
                k.next = 2;
                break;
              }
              return k.abrupt("return", []);
            case 2:
              if (C = u.props, m = C.validateFirst, y = m === void 0 ? !1 : m, E = C.messageVariables, b = C.validateDebounce, w = u.getRules(), f && (w = w.filter(function(T) {
                return T;
              }).filter(function(T) {
                var I = T.validateTrigger;
                if (!I)
                  return !0;
                var j = ko(I);
                return j.includes(f);
              })), !(b && f)) {
                k.next = 10;
                break;
              }
              return k.next = 8, new Promise(function(T) {
                setTimeout(T, b);
              });
            case 8:
              if (u.validatePromise === g) {
                k.next = 10;
                break;
              }
              return k.abrupt("return", []);
            case 10:
              return S = Yg(c, l, w, s, y, E), S.catch(function(T) {
                return T;
              }).then(function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : yt;
                if (u.validatePromise === g) {
                  var I;
                  u.validatePromise = null;
                  var j = [], P = [];
                  (I = T.forEach) === null || I === void 0 || I.call(T, function(M) {
                    var L = M.rule.warningOnly, $ = M.errors, A = $ === void 0 ? yt : $;
                    L ? P.push.apply(P, re(A)) : j.push.apply(j, re(A));
                  }), u.errors = j, u.warnings = P, u.triggerMetaEvent(), u.reRender();
                }
              }), k.abrupt("return", S);
            case 13:
            case "end":
              return k.stop();
          }
        }, p);
      })));
      return h || (u.validatePromise = g, u.dirty = !0, u.errors = yt, u.warnings = yt, u.triggerMetaEvent(), u.reRender()), g;
    }), F(ce(u), "isFieldValidating", function() {
      return !!u.validatePromise;
    }), F(ce(u), "isFieldTouched", function() {
      return u.touched;
    }), F(ce(u), "isFieldDirty", function() {
      if (u.dirty || u.props.initialValue !== void 0)
        return !0;
      var s = u.props.fieldContext, c = s.getInternalHooks(or), l = c.getInitialValue;
      return l(u.getNamePath()) !== void 0;
    }), F(ce(u), "getErrors", function() {
      return u.errors;
    }), F(ce(u), "getWarnings", function() {
      return u.warnings;
    }), F(ce(u), "isListField", function() {
      return u.props.isListField;
    }), F(ce(u), "isList", function() {
      return u.props.isList;
    }), F(ce(u), "isPreserve", function() {
      return u.props.preserve;
    }), F(ce(u), "getMeta", function() {
      u.prevValidating = u.isFieldValidating();
      var s = {
        touched: u.isFieldTouched(),
        validating: u.prevValidating,
        errors: u.errors,
        warnings: u.warnings,
        name: u.getNamePath(),
        validated: u.validatePromise === null
      };
      return s;
    }), F(ce(u), "getOnlyChild", function(s) {
      if (typeof s == "function") {
        var c = u.getMeta();
        return N(N({}, u.getOnlyChild(s(u.getControlled(), c, u.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var l = vu(s);
      return l.length !== 1 || !/* @__PURE__ */ _.isValidElement(l[0]) ? {
        child: l,
        isFunction: !1
      } : {
        child: l[0],
        isFunction: !1
      };
    }), F(ce(u), "getValue", function(s) {
      var c = u.props.fieldContext.getFieldsValue, l = u.getNamePath();
      return St(s || c(!0), l);
    }), F(ce(u), "getControlled", function() {
      var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, c = u.props, l = c.name, d = c.trigger, f = c.validateTrigger, v = c.getValueFromEvent, h = c.normalize, g = c.valuePropName, p = c.getValueProps, C = c.fieldContext, m = f !== void 0 ? f : C.validateTrigger, y = u.getNamePath(), E = C.getInternalHooks, b = C.getFieldsValue, w = E(or), S = w.dispatch, R = u.getValue(), k = p || function(M) {
        return F({}, g, M);
      }, T = s[d], I = l !== void 0 ? k(R) : {};
      process.env.NODE_ENV !== "production" && I && Object.keys(I).forEach(function(M) {
        Ie(typeof I[M] != "function", "It's not recommended to generate dynamic function prop by `getValueProps`. Please pass it to child component directly (prop: ".concat(M, ")"));
      });
      var j = N(N({}, s), I);
      j[d] = function() {
        u.touched = !0, u.dirty = !0, u.triggerMetaEvent();
        for (var M, L = arguments.length, $ = new Array(L), A = 0; A < L; A++)
          $[A] = arguments[A];
        v ? M = v.apply(void 0, $) : M = Zg.apply(void 0, [g].concat($)), h && (M = h(M, R, b(!0))), M !== R && S({
          type: "updateValue",
          namePath: y,
          value: M
        }), T && T.apply(void 0, $);
      };
      var P = ko(m || []);
      return P.forEach(function(M) {
        var L = j[M];
        j[M] = function() {
          L && L.apply(void 0, arguments);
          var $ = u.props.rules;
          $ && $.length && S({
            type: "validateField",
            namePath: y,
            triggerName: M
          });
        };
      }), j;
    }), n.fieldContext) {
      var a = n.fieldContext.getInternalHooks, o = a(or), i = o.initEntityValue;
      i(ce(u));
    }
    return u;
  }
  return et(r, [{
    key: "componentDidMount",
    value: function() {
      var u = this.props, a = u.shouldUpdate, o = u.fieldContext;
      if (this.mounted = !0, o) {
        var i = o.getInternalHooks, s = i(or), c = s.registerField;
        this.cancelRegisterFunc = c(this);
      }
      a === !0 && this.reRender();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.cancelRegister(), this.triggerMetaEvent(!0), this.mounted = !1;
    }
  }, {
    key: "reRender",
    value: function() {
      this.mounted && this.forceUpdate();
    }
  }, {
    key: "render",
    value: function() {
      var u = this.state.resetCount, a = this.props.children, o = this.getOnlyChild(a), i = o.child, s = o.isFunction, c;
      return s ? c = i : /* @__PURE__ */ _.isValidElement(i) ? c = /* @__PURE__ */ _.cloneElement(i, this.getControlled(i.props)) : (Ie(!i, "`children` of Field is not validate ReactElement."), c = i), /* @__PURE__ */ _.createElement(_.Fragment, {
        key: u
      }, c);
    }
  }]), r;
}(_.Component);
F(yi, "contextType", Pr);
F(yi, "defaultProps", {
  trigger: "onChange",
  valuePropName: "value"
});
function gd(e) {
  var t, r = e.name, n = xt(e, Jg), u = _.useContext(Pr), a = _.useContext(Eu), o = r !== void 0 ? Ve(r) : void 0, i = (t = n.isListField) !== null && t !== void 0 ? t : !!a, s = "keep";
  return i || (s = "_".concat((o || []).join("_"))), process.env.NODE_ENV !== "production" && n.preserve === !1 && i && o.length <= 1 && Ie(!1, "`preserve` should not apply on Form.List fields."), /* @__PURE__ */ _.createElement(yi, De({
    key: s,
    name: o,
    isListField: i
  }, n, {
    fieldContext: u
  }));
}
function Qg(e) {
  var t = e.name, r = e.initialValue, n = e.children, u = e.rules, a = e.validateTrigger, o = e.isListField, i = _.useContext(Pr), s = _.useContext(Eu), c = _.useRef({
    keys: [],
    id: 0
  }), l = c.current, d = _.useMemo(function() {
    var g = Ve(i.prefixName) || [];
    return [].concat(re(g), re(Ve(t)));
  }, [i.prefixName, t]), f = _.useMemo(function() {
    return N(N({}, i), {}, {
      prefixName: d
    });
  }, [i, d]), v = _.useMemo(function() {
    return {
      getKey: function(p) {
        var C = d.length, m = p[C];
        return [l.keys[m], p.slice(C + 1)];
      }
    };
  }, [d]);
  if (typeof n != "function")
    return Ie(!1, "Form.List only accepts function as children."), null;
  var h = function(p, C, m) {
    var y = m.source;
    return y === "internal" ? !1 : p !== C;
  };
  return /* @__PURE__ */ _.createElement(Eu.Provider, {
    value: v
  }, /* @__PURE__ */ _.createElement(Pr.Provider, {
    value: f
  }, /* @__PURE__ */ _.createElement(gd, {
    name: [],
    shouldUpdate: h,
    rules: u,
    validateTrigger: a,
    initialValue: r,
    isList: !0,
    isListField: o ?? !!s
  }, function(g, p) {
    var C = g.value, m = C === void 0 ? [] : C, y = g.onChange, E = i.getFieldValue, b = function() {
      var k = E(d || []);
      return k || [];
    }, w = {
      add: function(k, T) {
        var I = b();
        T >= 0 && T <= I.length ? (l.keys = [].concat(re(l.keys.slice(0, T)), [l.id], re(l.keys.slice(T))), y([].concat(re(I.slice(0, T)), [k], re(I.slice(T))))) : (process.env.NODE_ENV !== "production" && (T < 0 || T > I.length) && Ie(!1, "The second parameter of the add function should be a valid positive number."), l.keys = [].concat(re(l.keys), [l.id]), y([].concat(re(I), [k]))), l.id += 1;
      },
      remove: function(k) {
        var T = b(), I = new Set(Array.isArray(k) ? k : [k]);
        I.size <= 0 || (l.keys = l.keys.filter(function(j, P) {
          return !I.has(P);
        }), y(T.filter(function(j, P) {
          return !I.has(P);
        })));
      },
      move: function(k, T) {
        if (k !== T) {
          var I = b();
          k < 0 || k >= I.length || T < 0 || T >= I.length || (l.keys = js(l.keys, k, T), y(js(I, k, T)));
        }
      }
    }, S = m || [];
    return Array.isArray(S) || (S = [], process.env.NODE_ENV !== "production" && Ie(!1, "Current value of '".concat(d.join(" > "), "' is not an array type."))), n(S.map(function(R, k) {
      var T = l.keys[k];
      return T === void 0 && (l.keys[k] = l.id, T = l.keys[k], l.id += 1), {
        name: k,
        key: T,
        isListField: !0
      };
    }), w, p);
  })));
}
function ev(e) {
  var t = !1, r = e.length, n = [];
  return e.length ? new Promise(function(u, a) {
    e.forEach(function(o, i) {
      o.catch(function(s) {
        return t = !0, s;
      }).then(function(s) {
        r -= 1, n[i] = s, !(r > 0) && (t && a(n), u(n));
      });
    });
  }) : Promise.resolve([]);
}
var vd = "__@field_split__";
function Na(e) {
  return e.map(function(t) {
    return "".concat(ne(t), ":").concat(t);
  }).join(vd);
}
var br = /* @__PURE__ */ function() {
  function e() {
    Qe(this, e), F(this, "kvs", /* @__PURE__ */ new Map());
  }
  return et(e, [{
    key: "set",
    value: function(r, n) {
      this.kvs.set(Na(r), n);
    }
  }, {
    key: "get",
    value: function(r) {
      return this.kvs.get(Na(r));
    }
  }, {
    key: "update",
    value: function(r, n) {
      var u = this.get(r), a = n(u);
      a ? this.set(r, a) : this.delete(r);
    }
  }, {
    key: "delete",
    value: function(r) {
      this.kvs.delete(Na(r));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(r) {
      return re(this.kvs.entries()).map(function(n) {
        var u = Z(n, 2), a = u[0], o = u[1], i = a.split(vd);
        return r({
          key: i.map(function(s) {
            var c = s.match(/^([^:]*):(.*)$/), l = Z(c, 3), d = l[1], f = l[2];
            return d === "number" ? Number(f) : f;
          }),
          value: o
        });
      });
    }
  }, {
    key: "toJSON",
    value: function() {
      var r = {};
      return this.map(function(n) {
        var u = n.key, a = n.value;
        return r[u.join(".")] = a, null;
      }), r;
    }
  }]), e;
}(), tv = ["name"], rv = /* @__PURE__ */ et(function e(t) {
  var r = this;
  Qe(this, e), F(this, "formHooked", !1), F(this, "forceRootUpdate", void 0), F(this, "subscribable", !0), F(this, "store", {}), F(this, "fieldEntities", []), F(this, "initialValues", {}), F(this, "callbacks", {}), F(this, "validateMessages", null), F(this, "preserve", null), F(this, "lastValidatePromise", null), F(this, "getForm", function() {
    return {
      getFieldValue: r.getFieldValue,
      getFieldsValue: r.getFieldsValue,
      getFieldError: r.getFieldError,
      getFieldWarning: r.getFieldWarning,
      getFieldsError: r.getFieldsError,
      isFieldsTouched: r.isFieldsTouched,
      isFieldTouched: r.isFieldTouched,
      isFieldValidating: r.isFieldValidating,
      isFieldsValidating: r.isFieldsValidating,
      resetFields: r.resetFields,
      setFields: r.setFields,
      setFieldValue: r.setFieldValue,
      setFieldsValue: r.setFieldsValue,
      validateFields: r.validateFields,
      submit: r.submit,
      _init: !0,
      getInternalHooks: r.getInternalHooks
    };
  }), F(this, "getInternalHooks", function(n) {
    return n === or ? (r.formHooked = !0, {
      dispatch: r.dispatch,
      initEntityValue: r.initEntityValue,
      registerField: r.registerField,
      useSubscribe: r.useSubscribe,
      setInitialValues: r.setInitialValues,
      destroyForm: r.destroyForm,
      setCallbacks: r.setCallbacks,
      setValidateMessages: r.setValidateMessages,
      getFields: r.getFields,
      setPreserve: r.setPreserve,
      getInitialValue: r.getInitialValue,
      registerWatch: r.registerWatch
    }) : (Ie(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }), F(this, "useSubscribe", function(n) {
    r.subscribable = n;
  }), F(this, "prevWithoutPreserves", null), F(this, "setInitialValues", function(n, u) {
    if (r.initialValues = n || {}, u) {
      var a, o = xr(n, r.store);
      (a = r.prevWithoutPreserves) === null || a === void 0 || a.map(function(i) {
        var s = i.key;
        o = Ct(o, s, St(n, s));
      }), r.prevWithoutPreserves = null, r.updateStore(o);
    }
  }), F(this, "destroyForm", function(n) {
    if (n)
      r.updateStore({});
    else {
      var u = new br();
      r.getFieldEntities(!0).forEach(function(a) {
        r.isMergedPreserve(a.isPreserve()) || u.set(a.getNamePath(), !0);
      }), r.prevWithoutPreserves = u;
    }
  }), F(this, "getInitialValue", function(n) {
    var u = St(r.initialValues, n);
    return n.length ? xr(u) : u;
  }), F(this, "setCallbacks", function(n) {
    r.callbacks = n;
  }), F(this, "setValidateMessages", function(n) {
    r.validateMessages = n;
  }), F(this, "setPreserve", function(n) {
    r.preserve = n;
  }), F(this, "watchList", []), F(this, "registerWatch", function(n) {
    return r.watchList.push(n), function() {
      r.watchList = r.watchList.filter(function(u) {
        return u !== n;
      });
    };
  }), F(this, "notifyWatch", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (r.watchList.length) {
      var u = r.getFieldsValue(), a = r.getFieldsValue(!0);
      r.watchList.forEach(function(o) {
        o(u, a, n);
      });
    }
  }), F(this, "timeoutId", null), F(this, "warningUnhooked", function() {
    process.env.NODE_ENV !== "production" && !r.timeoutId && typeof window < "u" && (r.timeoutId = setTimeout(function() {
      r.timeoutId = null, r.formHooked || Ie(!1, "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?");
    }));
  }), F(this, "updateStore", function(n) {
    r.store = n;
  }), F(this, "getFieldEntities", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    return n ? r.fieldEntities.filter(function(u) {
      return u.getNamePath().length;
    }) : r.fieldEntities;
  }), F(this, "getFieldsMap", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, u = new br();
    return r.getFieldEntities(n).forEach(function(a) {
      var o = a.getNamePath();
      u.set(o, a);
    }), u;
  }), F(this, "getFieldEntitiesForNamePathList", function(n) {
    if (!n)
      return r.getFieldEntities(!0);
    var u = r.getFieldsMap(!0);
    return n.map(function(a) {
      var o = Ve(a);
      return u.get(o) || {
        INVALIDATE_NAME_PATH: Ve(a)
      };
    });
  }), F(this, "getFieldsValue", function(n, u) {
    r.warningUnhooked();
    var a, o, i;
    if (n === !0 || Array.isArray(n) ? (a = n, o = u) : n && ne(n) === "object" && (i = n.strict, o = n.filter), a === !0 && !o)
      return r.store;
    var s = r.getFieldEntitiesForNamePathList(Array.isArray(a) ? a : null), c = [];
    return s.forEach(function(l) {
      var d, f, v = "INVALIDATE_NAME_PATH" in l ? l.INVALIDATE_NAME_PATH : l.getNamePath();
      if (i) {
        var h, g;
        if ((h = (g = l).isList) !== null && h !== void 0 && h.call(g))
          return;
      } else if (!a && (d = (f = l).isListField) !== null && d !== void 0 && d.call(f))
        return;
      if (!o)
        c.push(v);
      else {
        var p = "getMeta" in l ? l.getMeta() : null;
        o(p) && c.push(v);
      }
    }), Ns(r.store, c.map(Ve));
  }), F(this, "getFieldValue", function(n) {
    r.warningUnhooked();
    var u = Ve(n);
    return St(r.store, u);
  }), F(this, "getFieldsError", function(n) {
    r.warningUnhooked();
    var u = r.getFieldEntitiesForNamePathList(n);
    return u.map(function(a, o) {
      return a && !("INVALIDATE_NAME_PATH" in a) ? {
        name: a.getNamePath(),
        errors: a.getErrors(),
        warnings: a.getWarnings()
      } : {
        name: Ve(n[o]),
        errors: [],
        warnings: []
      };
    });
  }), F(this, "getFieldError", function(n) {
    r.warningUnhooked();
    var u = Ve(n), a = r.getFieldsError([u])[0];
    return a.errors;
  }), F(this, "getFieldWarning", function(n) {
    r.warningUnhooked();
    var u = Ve(n), a = r.getFieldsError([u])[0];
    return a.warnings;
  }), F(this, "isFieldsTouched", function() {
    r.warningUnhooked();
    for (var n = arguments.length, u = new Array(n), a = 0; a < n; a++)
      u[a] = arguments[a];
    var o = u[0], i = u[1], s, c = !1;
    u.length === 0 ? s = null : u.length === 1 ? Array.isArray(o) ? (s = o.map(Ve), c = !1) : (s = null, c = o) : (s = o.map(Ve), c = i);
    var l = r.getFieldEntities(!0), d = function(p) {
      return p.isFieldTouched();
    };
    if (!s)
      return c ? l.every(function(g) {
        return d(g) || g.isList();
      }) : l.some(d);
    var f = new br();
    s.forEach(function(g) {
      f.set(g, []);
    }), l.forEach(function(g) {
      var p = g.getNamePath();
      s.forEach(function(C) {
        C.every(function(m, y) {
          return p[y] === m;
        }) && f.update(C, function(m) {
          return [].concat(re(m), [g]);
        });
      });
    });
    var v = function(p) {
      return p.some(d);
    }, h = f.map(function(g) {
      var p = g.value;
      return p;
    });
    return c ? h.every(v) : h.some(v);
  }), F(this, "isFieldTouched", function(n) {
    return r.warningUnhooked(), r.isFieldsTouched([n]);
  }), F(this, "isFieldsValidating", function(n) {
    r.warningUnhooked();
    var u = r.getFieldEntities();
    if (!n)
      return u.some(function(o) {
        return o.isFieldValidating();
      });
    var a = n.map(Ve);
    return u.some(function(o) {
      var i = o.getNamePath();
      return wr(a, i) && o.isFieldValidating();
    });
  }), F(this, "isFieldValidating", function(n) {
    return r.warningUnhooked(), r.isFieldsValidating([n]);
  }), F(this, "resetWithFieldInitialValue", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = new br(), a = r.getFieldEntities(!0);
    a.forEach(function(s) {
      var c = s.props.initialValue, l = s.getNamePath();
      if (c !== void 0) {
        var d = u.get(l) || /* @__PURE__ */ new Set();
        d.add({
          entity: s,
          value: c
        }), u.set(l, d);
      }
    });
    var o = function(c) {
      c.forEach(function(l) {
        var d = l.props.initialValue;
        if (d !== void 0) {
          var f = l.getNamePath(), v = r.getInitialValue(f);
          if (v !== void 0)
            Ie(!1, "Form already set 'initialValues' with path '".concat(f.join("."), "'. Field can not overwrite it."));
          else {
            var h = u.get(f);
            if (h && h.size > 1)
              Ie(!1, "Multiple Field with path '".concat(f.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (h) {
              var g = r.getFieldValue(f), p = l.isListField();
              !p && (!n.skipExist || g === void 0) && r.updateStore(Ct(r.store, f, re(h)[0].value));
            }
          }
        }
      });
    }, i;
    n.entities ? i = n.entities : n.namePathList ? (i = [], n.namePathList.forEach(function(s) {
      var c = u.get(s);
      if (c) {
        var l;
        (l = i).push.apply(l, re(re(c).map(function(d) {
          return d.entity;
        })));
      }
    })) : i = a, o(i);
  }), F(this, "resetFields", function(n) {
    r.warningUnhooked();
    var u = r.store;
    if (!n) {
      r.updateStore(xr(r.initialValues)), r.resetWithFieldInitialValue(), r.notifyObservers(u, null, {
        type: "reset"
      }), r.notifyWatch();
      return;
    }
    var a = n.map(Ve);
    a.forEach(function(o) {
      var i = r.getInitialValue(o);
      r.updateStore(Ct(r.store, o, i));
    }), r.resetWithFieldInitialValue({
      namePathList: a
    }), r.notifyObservers(u, a, {
      type: "reset"
    }), r.notifyWatch(a);
  }), F(this, "setFields", function(n) {
    r.warningUnhooked();
    var u = r.store, a = [];
    n.forEach(function(o) {
      var i = o.name, s = xt(o, tv), c = Ve(i);
      a.push(c), "value" in s && r.updateStore(Ct(r.store, c, s.value)), r.notifyObservers(u, [c], {
        type: "setField",
        data: o
      });
    }), r.notifyWatch(a);
  }), F(this, "getFields", function() {
    var n = r.getFieldEntities(!0), u = n.map(function(a) {
      var o = a.getNamePath(), i = a.getMeta(), s = N(N({}, i), {}, {
        name: o,
        value: r.getFieldValue(o)
      });
      return Object.defineProperty(s, "originRCField", {
        value: !0
      }), s;
    });
    return u;
  }), F(this, "initEntityValue", function(n) {
    var u = n.props.initialValue;
    if (u !== void 0) {
      var a = n.getNamePath(), o = St(r.store, a);
      o === void 0 && r.updateStore(Ct(r.store, a, u));
    }
  }), F(this, "isMergedPreserve", function(n) {
    var u = n !== void 0 ? n : r.preserve;
    return u ?? !0;
  }), F(this, "registerField", function(n) {
    r.fieldEntities.push(n);
    var u = n.getNamePath();
    if (r.notifyWatch([u]), n.props.initialValue !== void 0) {
      var a = r.store;
      r.resetWithFieldInitialValue({
        entities: [n],
        skipExist: !0
      }), r.notifyObservers(a, [n.getNamePath()], {
        type: "valueUpdate",
        source: "internal"
      });
    }
    return function(o, i) {
      var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      if (r.fieldEntities = r.fieldEntities.filter(function(d) {
        return d !== n;
      }), !r.isMergedPreserve(i) && (!o || s.length > 1)) {
        var c = o ? void 0 : r.getInitialValue(u);
        if (u.length && r.getFieldValue(u) !== c && r.fieldEntities.every(function(d) {
          return (
            // Only reset when no namePath exist
            !md(d.getNamePath(), u)
          );
        })) {
          var l = r.store;
          r.updateStore(Ct(l, u, c, !0)), r.notifyObservers(l, [u], {
            type: "remove"
          }), r.triggerDependenciesUpdate(l, u);
        }
      }
      r.notifyWatch([u]);
    };
  }), F(this, "dispatch", function(n) {
    switch (n.type) {
      case "updateValue": {
        var u = n.namePath, a = n.value;
        r.updateValue(u, a);
        break;
      }
      case "validateField": {
        var o = n.namePath, i = n.triggerName;
        r.validateFields([o], {
          triggerName: i
        });
        break;
      }
    }
  }), F(this, "notifyObservers", function(n, u, a) {
    if (r.subscribable) {
      var o = N(N({}, a), {}, {
        store: r.getFieldsValue(!0)
      });
      r.getFieldEntities().forEach(function(i) {
        var s = i.onStoreChange;
        s(n, u, o);
      });
    } else
      r.forceRootUpdate();
  }), F(this, "triggerDependenciesUpdate", function(n, u) {
    var a = r.getDependencyChildrenFields(u);
    return a.length && r.validateFields(a), r.notifyObservers(n, a, {
      type: "dependenciesUpdate",
      relatedFields: [u].concat(re(a))
    }), a;
  }), F(this, "updateValue", function(n, u) {
    var a = Ve(n), o = r.store;
    r.updateStore(Ct(r.store, a, u)), r.notifyObservers(o, [a], {
      type: "valueUpdate",
      source: "internal"
    }), r.notifyWatch([a]);
    var i = r.triggerDependenciesUpdate(o, a), s = r.callbacks.onValuesChange;
    if (s) {
      var c = Ns(r.store, [a]);
      s(c, r.getFieldsValue());
    }
    r.triggerOnFieldsChange([a].concat(re(i)));
  }), F(this, "setFieldsValue", function(n) {
    r.warningUnhooked();
    var u = r.store;
    if (n) {
      var a = xr(r.store, n);
      r.updateStore(a);
    }
    r.notifyObservers(u, null, {
      type: "valueUpdate",
      source: "external"
    }), r.notifyWatch();
  }), F(this, "setFieldValue", function(n, u) {
    r.setFields([{
      name: n,
      value: u,
      errors: [],
      warnings: []
    }]);
  }), F(this, "getDependencyChildrenFields", function(n) {
    var u = /* @__PURE__ */ new Set(), a = [], o = new br();
    r.getFieldEntities().forEach(function(s) {
      var c = s.props.dependencies;
      (c || []).forEach(function(l) {
        var d = Ve(l);
        o.update(d, function() {
          var f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          return f.add(s), f;
        });
      });
    });
    var i = function s(c) {
      var l = o.get(c) || /* @__PURE__ */ new Set();
      l.forEach(function(d) {
        if (!u.has(d)) {
          u.add(d);
          var f = d.getNamePath();
          d.isFieldDirty() && f.length && (a.push(f), s(f));
        }
      });
    };
    return i(n), a;
  }), F(this, "triggerOnFieldsChange", function(n, u) {
    var a = r.callbacks.onFieldsChange;
    if (a) {
      var o = r.getFields();
      if (u) {
        var i = new br();
        u.forEach(function(c) {
          var l = c.name, d = c.errors;
          i.set(l, d);
        }), o.forEach(function(c) {
          c.errors = i.get(c.name) || c.errors;
        });
      }
      var s = o.filter(function(c) {
        var l = c.name;
        return wr(n, l);
      });
      s.length && a(s, o);
    }
  }), F(this, "validateFields", function(n, u) {
    r.warningUnhooked();
    var a, o;
    Array.isArray(n) || typeof n == "string" || typeof u == "string" ? (a = n, o = u) : o = n;
    var i = !!a, s = i ? a.map(Ve) : [], c = [], l = String(Date.now()), d = /* @__PURE__ */ new Set(), f = o || {}, v = f.recursive, h = f.dirty;
    r.getFieldEntities(!0).forEach(function(m) {
      if (i || s.push(m.getNamePath()), !(!m.props.rules || !m.props.rules.length) && !(h && !m.isFieldDirty())) {
        var y = m.getNamePath();
        if (d.add(y.join(l)), !i || wr(s, y, v)) {
          var E = m.validateRules(N({
            validateMessages: N(N({}, pd), r.validateMessages)
          }, o));
          c.push(E.then(function() {
            return {
              name: y,
              errors: [],
              warnings: []
            };
          }).catch(function(b) {
            var w, S = [], R = [];
            return (w = b.forEach) === null || w === void 0 || w.call(b, function(k) {
              var T = k.rule.warningOnly, I = k.errors;
              T ? R.push.apply(R, re(I)) : S.push.apply(S, re(I));
            }), S.length ? Promise.reject({
              name: y,
              errors: S,
              warnings: R
            }) : {
              name: y,
              errors: S,
              warnings: R
            };
          }));
        }
      }
    });
    var g = ev(c);
    r.lastValidatePromise = g, g.catch(function(m) {
      return m;
    }).then(function(m) {
      var y = m.map(function(E) {
        var b = E.name;
        return b;
      });
      r.notifyObservers(r.store, y, {
        type: "validateFinish"
      }), r.triggerOnFieldsChange(y, m);
    });
    var p = g.then(function() {
      return r.lastValidatePromise === g ? Promise.resolve(r.getFieldsValue(s)) : Promise.reject([]);
    }).catch(function(m) {
      var y = m.filter(function(E) {
        return E && E.errors.length;
      });
      return Promise.reject({
        values: r.getFieldsValue(s),
        errorFields: y,
        outOfDate: r.lastValidatePromise !== g
      });
    });
    p.catch(function(m) {
      return m;
    });
    var C = s.filter(function(m) {
      return d.has(m.join(l));
    });
    return r.triggerOnFieldsChange(C), p;
  }), F(this, "submit", function() {
    r.warningUnhooked(), r.validateFields().then(function(n) {
      var u = r.callbacks.onFinish;
      if (u)
        try {
          u(n);
        } catch (a) {
          console.error(a);
        }
    }).catch(function(n) {
      var u = r.callbacks.onFinishFailed;
      u && u(n);
    });
  }), this.forceRootUpdate = t;
});
function bd(e) {
  var t = _.useRef(), r = _.useState({}), n = Z(r, 2), u = n[1];
  if (!t.current)
    if (e)
      t.current = e;
    else {
      var a = function() {
        u({});
      }, o = new rv(a);
      t.current = o.getForm();
    }
  return [t.current];
}
var No = /* @__PURE__ */ _.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), nv = function(t) {
  var r = t.validateMessages, n = t.onFormChange, u = t.onFormFinish, a = t.children, o = _.useContext(No), i = _.useRef({});
  return /* @__PURE__ */ _.createElement(No.Provider, {
    value: N(N({}, o), {}, {
      validateMessages: N(N({}, o.validateMessages), r),
      // =========================================================
      // =                  Global Form Control                  =
      // =========================================================
      triggerFormChange: function(c, l) {
        n && n(c, {
          changedFields: l,
          forms: i.current
        }), o.triggerFormChange(c, l);
      },
      triggerFormFinish: function(c, l) {
        u && u(c, {
          values: l,
          forms: i.current
        }), o.triggerFormFinish(c, l);
      },
      registerForm: function(c, l) {
        c && (i.current = N(N({}, i.current), {}, F({}, c, l))), o.registerForm(c, l);
      },
      unregisterForm: function(c) {
        var l = N({}, i.current);
        delete l[c], i.current = l, o.unregisterForm(c);
      }
    })
  }, a);
}, uv = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed", "clearOnDestroy"], av = function(t, r) {
  var n = t.name, u = t.initialValues, a = t.fields, o = t.form, i = t.preserve, s = t.children, c = t.component, l = c === void 0 ? "form" : c, d = t.validateMessages, f = t.validateTrigger, v = f === void 0 ? "onChange" : f, h = t.onValuesChange, g = t.onFieldsChange, p = t.onFinish, C = t.onFinishFailed, m = t.clearOnDestroy, y = xt(t, uv), E = _.useRef(null), b = _.useContext(No), w = bd(o), S = Z(w, 1), R = S[0], k = R.getInternalHooks(or), T = k.useSubscribe, I = k.setInitialValues, j = k.setCallbacks, P = k.setValidateMessages, M = k.setPreserve, L = k.destroyForm;
  _.useImperativeHandle(r, function() {
    return N(N({}, R), {}, {
      nativeElement: E.current
    });
  }), _.useEffect(function() {
    return b.registerForm(n, R), function() {
      b.unregisterForm(n);
    };
  }, [b, R, n]), P(N(N({}, b.validateMessages), d)), j({
    onValuesChange: h,
    onFieldsChange: function(G) {
      if (b.triggerFormChange(n, G), g) {
        for (var K = arguments.length, X = new Array(K > 1 ? K - 1 : 0), te = 1; te < K; te++)
          X[te - 1] = arguments[te];
        g.apply(void 0, [G].concat(X));
      }
    },
    onFinish: function(G) {
      b.triggerFormFinish(n, G), p && p(G);
    },
    onFinishFailed: C
  }), M(i);
  var $ = _.useRef(null);
  I(u, !$.current), $.current || ($.current = !0), _.useEffect(
    function() {
      return function() {
        return L(m);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var A, D = typeof s == "function";
  if (D) {
    var B = R.getFieldsValue(!0);
    A = s(B, R);
  } else
    A = s;
  T(!D);
  var V = _.useRef();
  _.useEffect(function() {
    Xg(V.current || [], a || []) || R.setFields(a || []), V.current = a;
  }, [a, R]);
  var H = _.useMemo(function() {
    return N(N({}, R), {}, {
      validateTrigger: v
    });
  }, [R, v]), q = /* @__PURE__ */ _.createElement(Eu.Provider, {
    value: null
  }, /* @__PURE__ */ _.createElement(Pr.Provider, {
    value: H
  }, A));
  return l === !1 ? q : /* @__PURE__ */ _.createElement(l, De({}, y, {
    ref: E,
    onSubmit: function(G) {
      G.preventDefault(), G.stopPropagation(), R.submit();
    },
    onReset: function(G) {
      var K;
      G.preventDefault(), R.resetFields(), (K = y.onReset) === null || K === void 0 || K.call(y, G);
    }
  }), q);
};
function Ls(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
var ov = process.env.NODE_ENV !== "production" ? function(e) {
  var t = e.join("__RC_FIELD_FORM_SPLIT__"), r = He(t);
  Ie(r.current === t, "`useWatch` is not support dynamic `namePath`. Please provide static instead.");
} : function() {
};
function iv() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = t[0], u = t[1], a = u === void 0 ? {} : u, o = mg(a) ? {
    form: a
  } : a, i = o.form, s = Ya(), c = Z(s, 2), l = c[0], d = c[1], f = Mf(function() {
    return Ls(l);
  }, [l]), v = He(f);
  v.current = f;
  var h = Bt(Pr), g = i || h, p = g && g._init;
  process.env.NODE_ENV !== "production" && Ie(t.length === 2 ? i ? p : !0 : p, "useWatch requires a form instance since it can not auto detect from context.");
  var C = Ve(n), m = He(C);
  return m.current = C, ov(C), wt(
    function() {
      if (p) {
        var y = g.getFieldsValue, E = g.getInternalHooks, b = E(or), w = b.registerWatch, S = function(I, j) {
          var P = o.preserve ? j : I;
          return typeof n == "function" ? n(P) : St(P, m.current);
        }, R = w(function(T, I) {
          var j = S(T, I), P = Ls(j);
          v.current !== P && (v.current = P, d(j));
        }), k = S(y(), y(!0));
        return l !== k && d(k), R;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [p]
  ), l;
}
var sv = /* @__PURE__ */ _.forwardRef(av), Ln = sv;
Ln.FormProvider = nv;
Ln.Field = gd;
Ln.List = Qg;
Ln.useForm = bd;
Ln.useWatch = iv;
const vn = /* @__PURE__ */ _.createContext({});
process.env.NODE_ENV !== "production" && (vn.displayName = "FormItemInputContext");
const cv = (e) => {
  let {
    children: t,
    status: r,
    override: n
  } = e;
  const u = _.useContext(vn), a = _.useMemo(() => {
    const o = Object.assign({}, u);
    return n && delete o.isFormItemInput, r && (delete o.status, delete o.hasFeedback, delete o.feedbackIcon), o;
  }, [r, n, u]);
  return /* @__PURE__ */ _.createElement(vn.Provider, {
    value: a
  }, t);
}, lv = /* @__PURE__ */ _.createContext(void 0), dv = /* @__PURE__ */ Ko(void 0);
var fv = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: !0
}, hv = N(N({}, fv), {}, {
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "OK",
  clear: "Clear",
  week: "Week",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  dateFormat: "M/D/YYYY",
  dateTimeFormat: "M/D/YYYY HH:mm:ss",
  previousMonth: "Previous month (PageUp)",
  nextMonth: "Next month (PageDown)",
  previousYear: "Last year (Control + left)",
  nextYear: "Next year (Control + right)",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century"
});
const pv = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
Object.assign({
  placeholder: "Select date",
  yearPlaceholder: "Select year",
  quarterPlaceholder: "Select quarter",
  monthPlaceholder: "Select month",
  weekPlaceholder: "Select week",
  rangePlaceholder: ["Start date", "End date"],
  rangeYearPlaceholder: ["Start year", "End year"],
  rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
  rangeMonthPlaceholder: ["Start month", "End month"],
  rangeWeekPlaceholder: ["Start week", "End week"]
}, hv), Object.assign({}, pv);
const ft = "${label} is not a valid ${type}", la = {
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: ft,
        method: ft,
        array: ft,
        object: ft,
        number: ft,
        date: ft,
        boolean: ft,
        integer: ft,
        float: ft,
        regexp: ft,
        email: ft,
        url: ft,
        hex: ft
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  }
};
Object.assign({}, la.Modal);
let pu = [];
const zs = () => pu.reduce((e, t) => Object.assign(Object.assign({}, e), t), la.Modal);
function mv(e) {
  if (e) {
    const t = Object.assign({}, e);
    return pu.push(t), zs(), () => {
      pu = pu.filter((r) => r !== t), zs();
    };
  }
  Object.assign({}, la.Modal);
}
const yd = /* @__PURE__ */ Ko(void 0), xd = "internalMark", _d = (e) => {
  const {
    locale: t = {},
    children: r,
    _ANT_MARK__: n
  } = e;
  if (process.env.NODE_ENV !== "production") {
    const a = cr("LocaleProvider");
    process.env.NODE_ENV !== "production" && a(n === xd, "deprecated", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale");
  }
  _.useEffect(() => mv(t == null ? void 0 : t.Modal), [t]);
  const u = _.useMemo(() => Object.assign(Object.assign({}, t), {
    exist: !0
  }), [t]);
  return /* @__PURE__ */ _.createElement(yd.Provider, {
    value: u
  }, r);
};
process.env.NODE_ENV !== "production" && (_d.displayName = "LocaleProvider");
const gv = `-ant-${Date.now()}-${Math.random()}`;
function vv(e, t) {
  const r = {}, n = (o, i) => {
    let s = o.clone();
    return s = (i == null ? void 0 : i(s)) || s, s.toRgbString();
  }, u = (o, i) => {
    const s = new qe(o), c = fn(s.toRgbString());
    r[`${i}-color`] = n(s), r[`${i}-color-disabled`] = c[1], r[`${i}-color-hover`] = c[4], r[`${i}-color-active`] = c[6], r[`${i}-color-outline`] = s.clone().setA(0.2).toRgbString(), r[`${i}-color-deprecated-bg`] = c[0], r[`${i}-color-deprecated-border`] = c[2];
  };
  if (t.primaryColor) {
    u(t.primaryColor, "primary");
    const o = new qe(t.primaryColor), i = fn(o.toRgbString());
    i.forEach((c, l) => {
      r[`primary-${l + 1}`] = c;
    }), r["primary-color-deprecated-l-35"] = n(o, (c) => c.lighten(35)), r["primary-color-deprecated-l-20"] = n(o, (c) => c.lighten(20)), r["primary-color-deprecated-t-20"] = n(o, (c) => c.tint(20)), r["primary-color-deprecated-t-50"] = n(o, (c) => c.tint(50)), r["primary-color-deprecated-f-12"] = n(o, (c) => c.setA(c.a * 0.12));
    const s = new qe(i[0]);
    r["primary-color-active-deprecated-f-30"] = n(s, (c) => c.setA(c.a * 0.3)), r["primary-color-active-deprecated-d-02"] = n(s, (c) => c.darken(2));
  }
  return t.successColor && u(t.successColor, "success"), t.warningColor && u(t.warningColor, "warning"), t.errorColor && u(t.errorColor, "error"), t.infoColor && u(t.infoColor, "info"), `
  :root {
    ${Object.keys(r).map((o) => `--${e}-${o}: ${r[o]};`).join(`
`)}
  }
  `.trim();
}
function bv(e, t) {
  const r = vv(e, t);
  Ht() ? ir(r, `${gv}-dynamic-theme`) : process.env.NODE_ENV !== "production" && oa(!1, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
}
function yv() {
  const e = Bt(hn), t = Bt(Rr);
  return {
    componentDisabled: e,
    componentSize: t
  };
}
const xv = Object.assign({}, _), {
  useId: Bs
} = xv, _v = () => "", Cv = typeof Bs > "u" ? _v : Bs;
function Ev(e, t, r) {
  var n, u;
  const a = cr("ConfigProvider"), o = e || {}, i = o.inherit === !1 || !t ? Object.assign(Object.assign({}, Fo), {
    hashed: (n = t == null ? void 0 : t.hashed) !== null && n !== void 0 ? n : Fo.hashed,
    cssVar: t == null ? void 0 : t.cssVar
  }) : t, s = Cv();
  if (process.env.NODE_ENV !== "production") {
    const c = o.cssVar || i.cssVar, l = !!(typeof o.cssVar == "object" && (!((u = o.cssVar) === null || u === void 0) && u.key) || s);
    process.env.NODE_ENV !== "production" && a(!c || l, "breaking", "Missing key in `cssVar` config. Please upgrade to React 18 or set `cssVar.key` manually in each ConfigProvider inside `cssVar` enabled ConfigProvider.");
  }
  return ai(() => {
    var c, l;
    if (!e)
      return t;
    const d = Object.assign({}, i.components);
    Object.keys(e.components || {}).forEach((h) => {
      d[h] = Object.assign(Object.assign({}, d[h]), e.components[h]);
    });
    const f = `css-var-${s.replace(/:/g, "")}`, v = ((c = o.cssVar) !== null && c !== void 0 ? c : i.cssVar) && Object.assign(Object.assign(Object.assign({
      prefix: r == null ? void 0 : r.prefixCls
    }, typeof i.cssVar == "object" ? i.cssVar : {}), typeof o.cssVar == "object" ? o.cssVar : {}), {
      key: typeof o.cssVar == "object" && ((l = o.cssVar) === null || l === void 0 ? void 0 : l.key) || f
    });
    return Object.assign(Object.assign(Object.assign({}, i), o), {
      token: Object.assign(Object.assign({}, i.token), o.token),
      components: d,
      cssVar: v
    });
  }, [o, i], (c, l) => c.some((d, f) => {
    const v = l[f];
    return !yo(d, v, !0);
  }));
}
var Sv = ["children"], Cd = /* @__PURE__ */ _.createContext({});
function wv(e) {
  var t = e.children, r = xt(e, Sv);
  return /* @__PURE__ */ _.createElement(Cd.Provider, {
    value: r
  }, t);
}
var $v = /* @__PURE__ */ function(e) {
  dr(r, e);
  var t = fr(r);
  function r() {
    return Qe(this, r), t.apply(this, arguments);
  }
  return et(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
}(_.Component);
function Fv(e) {
  var t = _.useReducer(function(i) {
    return i + 1;
  }, 0), r = Z(t, 2), n = r[1], u = _.useRef(e), a = Vt(function() {
    return u.current;
  }), o = Vt(function(i) {
    u.current = typeof i == "function" ? i(u.current) : i, n();
  });
  return [a, o];
}
var Gt = "none", Qn = "appear", eu = "enter", tu = "leave", Vs = "none", Et = "prepare", _r = "start", Cr = "active", xi = "end", Ed = "prepared";
function Hs(e, t) {
  var r = {};
  return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit".concat(e)] = "webkit".concat(t), r["Moz".concat(e)] = "moz".concat(t), r["ms".concat(e)] = "MS".concat(t), r["O".concat(e)] = "o".concat(t.toLowerCase()), r;
}
function kv(e, t) {
  var r = {
    animationend: Hs("Animation", "AnimationEnd"),
    transitionend: Hs("Transition", "TransitionEnd")
  };
  return e && ("AnimationEvent" in t || delete r.animationend.animation, "TransitionEvent" in t || delete r.transitionend.transition), r;
}
var Av = kv(Ht(), typeof window < "u" ? window : {}), Sd = {};
if (Ht()) {
  var Dv = document.createElement("div");
  Sd = Dv.style;
}
var ru = {};
function wd(e) {
  if (ru[e])
    return ru[e];
  var t = Av[e];
  if (t)
    for (var r = Object.keys(t), n = r.length, u = 0; u < n; u += 1) {
      var a = r[u];
      if (Object.prototype.hasOwnProperty.call(t, a) && a in Sd)
        return ru[e] = t[a], ru[e];
    }
  return "";
}
var $d = wd("animationend"), Fd = wd("transitionend"), kd = !!($d && Fd), qs = $d || "animationend", Ws = Fd || "transitionend";
function Us(e, t) {
  if (!e) return null;
  if (ne(e) === "object") {
    var r = t.replace(/-\w/g, function(n) {
      return n[1].toUpperCase();
    });
    return e[r];
  }
  return "".concat(e, "-").concat(t);
}
const Tv = function(e) {
  var t = He();
  function r(u) {
    u && (u.removeEventListener(Ws, e), u.removeEventListener(qs, e));
  }
  function n(u) {
    t.current && t.current !== u && r(t.current), u && u !== t.current && (u.addEventListener(Ws, e), u.addEventListener(qs, e), t.current = u);
  }
  return _.useEffect(function() {
    return function() {
      r(t.current);
    };
  }, []), [n, r];
};
var Ad = Ht() ? If : wt;
const Rv = function() {
  var e = _.useRef(null);
  function t() {
    kr.cancel(e.current);
  }
  function r(n) {
    var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    t();
    var a = kr(function() {
      u <= 1 ? n({
        isCanceled: function() {
          return a !== e.current;
        }
      }) : r(n, u - 1);
    });
    e.current = a;
  }
  return _.useEffect(function() {
    return function() {
      t();
    };
  }, []), [r, t];
};
var Pv = [Et, _r, Cr, xi], Ov = [Et, Ed], Dd = !1, Mv = !0;
function Td(e) {
  return e === Cr || e === xi;
}
const Iv = function(e, t, r) {
  var n = sn(Vs), u = Z(n, 2), a = u[0], o = u[1], i = Rv(), s = Z(i, 2), c = s[0], l = s[1];
  function d() {
    o(Et, !0);
  }
  var f = t ? Ov : Pv;
  return Ad(function() {
    if (a !== Vs && a !== xi) {
      var v = f.indexOf(a), h = f[v + 1], g = r(a);
      g === Dd ? o(h, !0) : h && c(function(p) {
        function C() {
          p.isCanceled() || o(h, !0);
        }
        g === !0 ? C() : Promise.resolve(g).then(C);
      });
    }
  }, [e, a]), _.useEffect(function() {
    return function() {
      l();
    };
  }, []), [d, a];
};
function Nv(e, t, r, n) {
  var u = n.motionEnter, a = u === void 0 ? !0 : u, o = n.motionAppear, i = o === void 0 ? !0 : o, s = n.motionLeave, c = s === void 0 ? !0 : s, l = n.motionDeadline, d = n.motionLeaveImmediately, f = n.onAppearPrepare, v = n.onEnterPrepare, h = n.onLeavePrepare, g = n.onAppearStart, p = n.onEnterStart, C = n.onLeaveStart, m = n.onAppearActive, y = n.onEnterActive, E = n.onLeaveActive, b = n.onAppearEnd, w = n.onEnterEnd, S = n.onLeaveEnd, R = n.onVisibleChanged, k = sn(), T = Z(k, 2), I = T[0], j = T[1], P = Fv(Gt), M = Z(P, 2), L = M[0], $ = M[1], A = sn(null), D = Z(A, 2), B = D[0], V = D[1], H = L(), q = He(!1), Y = He(null);
  function G() {
    return r();
  }
  var K = He(!1);
  function X() {
    $(Gt), V(null, !0);
  }
  var te = Vt(function(Re) {
    var we = L();
    if (we !== Gt) {
      var ae = G();
      if (!(Re && !Re.deadline && Re.target !== ae)) {
        var oe = K.current, ge;
        we === Qn && oe ? ge = b == null ? void 0 : b(ae, Re) : we === eu && oe ? ge = w == null ? void 0 : w(ae, Re) : we === tu && oe && (ge = S == null ? void 0 : S(ae, Re)), oe && ge !== !1 && X();
      }
    }
  }), ue = Tv(te), pe = Z(ue, 1), le = pe[0], ke = function(we) {
    switch (we) {
      case Qn:
        return F(F(F({}, Et, f), _r, g), Cr, m);
      case eu:
        return F(F(F({}, Et, v), _r, p), Cr, y);
      case tu:
        return F(F(F({}, Et, h), _r, C), Cr, E);
      default:
        return {};
    }
  }, Ae = _.useMemo(function() {
    return ke(H);
  }, [H]), Ne = Iv(H, !e, function(Re) {
    if (Re === Et) {
      var we = Ae[Et];
      return we ? we(G()) : Dd;
    }
    if (J in Ae) {
      var ae;
      V(((ae = Ae[J]) === null || ae === void 0 ? void 0 : ae.call(Ae, G(), null)) || null);
    }
    return J === Cr && H !== Gt && (le(G()), l > 0 && (clearTimeout(Y.current), Y.current = setTimeout(function() {
      te({
        deadline: !0
      });
    }, l))), J === Ed && X(), Mv;
  }), U = Z(Ne, 2), ye = U[0], J = U[1], ie = Td(J);
  K.current = ie;
  var Pe = He(null);
  Ad(function() {
    if (!(q.current && Pe.current === t)) {
      j(t);
      var Re = q.current;
      q.current = !0;
      var we;
      !Re && t && i && (we = Qn), Re && t && a && (we = eu), (Re && !t && c || !Re && d && !t && c) && (we = tu);
      var ae = ke(we);
      we && (e || ae[Et]) ? ($(we), ye()) : $(Gt), Pe.current = t;
    }
  }, [t]), wt(function() {
    // Cancel appear
    (H === Qn && !i || // Cancel enter
    H === eu && !a || // Cancel leave
    H === tu && !c) && $(Gt);
  }, [i, a, c]), wt(function() {
    return function() {
      q.current = !1, clearTimeout(Y.current);
    };
  }, []);
  var fe = _.useRef(!1);
  wt(function() {
    I && (fe.current = !0), I !== void 0 && H === Gt && ((fe.current || I) && (R == null || R(I)), fe.current = !0);
  }, [I, H]);
  var Be = B;
  return Ae[Et] && J === _r && (Be = N({
    transition: "none"
  }, Be)), [H, J, Be, I ?? t];
}
function jv(e) {
  var t = e;
  ne(e) === "object" && (t = e.transitionSupport);
  function r(u, a) {
    return !!(u.motionName && t && a !== !1);
  }
  var n = /* @__PURE__ */ _.forwardRef(function(u, a) {
    var o = u.visible, i = o === void 0 ? !0 : o, s = u.removeOnLeave, c = s === void 0 ? !0 : s, l = u.forceRender, d = u.children, f = u.motionName, v = u.leavedClassName, h = u.eventProps, g = _.useContext(Cd), p = g.motion, C = r(u, p), m = He(), y = He();
    function E() {
      try {
        return m.current instanceof HTMLElement ? m.current : su(y.current);
      } catch {
        return null;
      }
    }
    var b = Nv(C, i, E, u), w = Z(b, 4), S = w[0], R = w[1], k = w[2], T = w[3], I = _.useRef(T);
    T && (I.current = !0);
    var j = _.useCallback(function(D) {
      m.current = D, tl(a, D);
    }, [a]), P, M = N(N({}, h), {}, {
      visible: i
    });
    if (!d)
      P = null;
    else if (S === Gt)
      T ? P = d(N({}, M), j) : !c && I.current && v ? P = d(N(N({}, M), {}, {
        className: v
      }), j) : l || !c && !v ? P = d(N(N({}, M), {}, {
        style: {
          display: "none"
        }
      }), j) : P = null;
    else {
      var L;
      R === Et ? L = "prepare" : Td(R) ? L = "active" : R === _r && (L = "start");
      var $ = Us(f, "".concat(S, "-").concat(L));
      P = d(N(N({}, M), {}, {
        className: ee(Us(f, S), F(F({}, $, $ && L), f, typeof f == "string")),
        style: k
      }), j);
    }
    if (/* @__PURE__ */ _.isValidElement(P) && nl(P)) {
      var A = al(P);
      A || (P = /* @__PURE__ */ _.cloneElement(P, {
        ref: j
      }));
    }
    return /* @__PURE__ */ _.createElement($v, {
      ref: y
    }, P);
  });
  return n.displayName = "CSSMotion", n;
}
const Rd = jv(kd);
var jo = "add", Lo = "keep", zo = "remove", ja = "removed";
function Lv(e) {
  var t;
  return e && ne(e) === "object" && "key" in e ? t = e : t = {
    key: e
  }, N(N({}, t), {}, {
    key: String(t.key)
  });
}
function Bo() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  return e.map(Lv);
}
function zv() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = [], n = 0, u = t.length, a = Bo(e), o = Bo(t);
  a.forEach(function(c) {
    for (var l = !1, d = n; d < u; d += 1) {
      var f = o[d];
      if (f.key === c.key) {
        n < d && (r = r.concat(o.slice(n, d).map(function(v) {
          return N(N({}, v), {}, {
            status: jo
          });
        })), n = d), r.push(N(N({}, f), {}, {
          status: Lo
        })), n += 1, l = !0;
        break;
      }
    }
    l || r.push(N(N({}, c), {}, {
      status: zo
    }));
  }), n < u && (r = r.concat(o.slice(n).map(function(c) {
    return N(N({}, c), {}, {
      status: jo
    });
  })));
  var i = {};
  r.forEach(function(c) {
    var l = c.key;
    i[l] = (i[l] || 0) + 1;
  });
  var s = Object.keys(i).filter(function(c) {
    return i[c] > 1;
  });
  return s.forEach(function(c) {
    r = r.filter(function(l) {
      var d = l.key, f = l.status;
      return d !== c || f !== zo;
    }), r.forEach(function(l) {
      l.key === c && (l.status = Lo);
    });
  }), r;
}
var Bv = ["component", "children", "onVisibleChanged", "onAllRemoved"], Vv = ["status"], Hv = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearPrepare", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function qv(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Rd, r = /* @__PURE__ */ function(n) {
    dr(a, n);
    var u = fr(a);
    function a() {
      var o;
      Qe(this, a);
      for (var i = arguments.length, s = new Array(i), c = 0; c < i; c++)
        s[c] = arguments[c];
      return o = u.call.apply(u, [this].concat(s)), F(ce(o), "state", {
        keyEntities: []
      }), F(ce(o), "removeKey", function(l) {
        o.setState(function(d) {
          var f = d.keyEntities.map(function(v) {
            return v.key !== l ? v : N(N({}, v), {}, {
              status: ja
            });
          });
          return {
            keyEntities: f
          };
        }, function() {
          var d = o.state.keyEntities, f = d.filter(function(v) {
            var h = v.status;
            return h !== ja;
          }).length;
          f === 0 && o.props.onAllRemoved && o.props.onAllRemoved();
        });
      }), o;
    }
    return et(a, [{
      key: "render",
      value: function() {
        var i = this, s = this.state.keyEntities, c = this.props, l = c.component, d = c.children, f = c.onVisibleChanged;
        c.onAllRemoved;
        var v = xt(c, Bv), h = l || _.Fragment, g = {};
        return Hv.forEach(function(p) {
          g[p] = v[p], delete v[p];
        }), delete v.keys, /* @__PURE__ */ _.createElement(h, v, s.map(function(p, C) {
          var m = p.status, y = xt(p, Vv), E = m === jo || m === Lo;
          return /* @__PURE__ */ _.createElement(t, De({}, g, {
            key: y.key,
            visible: E,
            eventProps: y,
            onVisibleChanged: function(w) {
              f == null || f(w, {
                key: y.key
              }), w || i.removeKey(y.key);
            }
          }), function(b, w) {
            return d(N(N({}, b), {}, {
              index: C
            }), w);
          });
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function(i, s) {
        var c = i.keys, l = s.keyEntities, d = Bo(c), f = zv(l, d);
        return {
          keyEntities: f.filter(function(v) {
            var h = l.find(function(g) {
              var p = g.key;
              return v.key === p;
            });
            return !(h && h.status === ja && v.status === zo);
          })
        };
      }
    }]), a;
  }(_.Component);
  return F(r, "defaultProps", {
    component: "div"
  }), r;
}
qv(kd);
function Wv(e) {
  const {
    children: t
  } = e, [, r] = ca(), {
    motion: n
  } = r, u = _.useRef(!1);
  return u.current = u.current || n === !1, u.current ? /* @__PURE__ */ _.createElement(wv, {
    motion: n
  }, t) : t;
}
const Pd = /* @__PURE__ */ _.memo((e) => {
  let {
    dropdownMatchSelectWidth: t
  } = e;
  return cr("ConfigProvider").deprecated(t === void 0, "dropdownMatchSelectWidth", "popupMatchSelectWidth"), null;
});
process.env.NODE_ENV !== "production" && (Pd.displayName = "PropWarning");
const Uv = process.env.NODE_ENV !== "production" ? Pd : () => null;
var Yv = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var u = 0, n = Object.getOwnPropertySymbols(e); u < n.length; u++)
    t.indexOf(n[u]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[u]) && (r[n[u]] = e[n[u]]);
  return r;
};
let Vo = !1;
process.env.NODE_ENV;
const Gv = ["getTargetContainer", "getPopupContainer", "renderEmpty", "input", "pagination", "form", "select", "button"];
let Od;
function Kv() {
  return Od || bo;
}
function Xv(e) {
  return Object.keys(e).some((t) => t.endsWith("Color"));
}
const Zv = (e) => {
  const {
    prefixCls: t,
    iconPrefixCls: r,
    theme: n,
    holderRender: u
  } = e;
  t !== void 0 && (Od = t), n && Xv(n) && (process.env.NODE_ENV !== "production" && oa(!1, "ConfigProvider", "`config` of css variable theme is not work in v5. Please use new `theme` config instead."), bv(Kv(), n));
}, Jv = (e) => {
  const {
    children: t,
    csp: r,
    autoInsertSpaceInButton: n,
    alert: u,
    anchor: a,
    form: o,
    locale: i,
    componentSize: s,
    direction: c,
    space: l,
    splitter: d,
    virtual: f,
    dropdownMatchSelectWidth: v,
    popupMatchSelectWidth: h,
    popupOverflow: g,
    legacyLocale: p,
    parentContext: C,
    iconPrefixCls: m,
    theme: y,
    componentDisabled: E,
    segmented: b,
    statistic: w,
    spin: S,
    calendar: R,
    carousel: k,
    cascader: T,
    collapse: I,
    typography: j,
    checkbox: P,
    descriptions: M,
    divider: L,
    drawer: $,
    skeleton: A,
    steps: D,
    image: B,
    layout: V,
    list: H,
    mentions: q,
    modal: Y,
    progress: G,
    result: K,
    slider: X,
    breadcrumb: te,
    menu: ue,
    pagination: pe,
    input: le,
    textArea: ke,
    empty: Ae,
    badge: Ne,
    radio: U,
    rate: ye,
    switch: J,
    transfer: ie,
    avatar: Pe,
    message: fe,
    tag: Be,
    table: Re,
    card: we,
    tabs: ae,
    timeline: oe,
    timePicker: ge,
    upload: he,
    notification: xe,
    tree: Ue,
    colorPicker: mt,
    datePicker: Tt,
    rangePicker: Vr,
    flex: Hr,
    wave: Oe,
    dropdown: ve,
    warning: gt,
    tour: qt,
    tooltip: ba,
    popover: qr,
    popconfirm: Hn,
    floatButtonGroup: Wt,
    variant: Wr,
    inputNumber: Ur,
    treeSelect: qn
  } = e, Wn = _.useCallback((je, x) => {
    const {
      prefixCls: z
    } = e;
    if (x)
      return x;
    const W = z || C.getPrefixCls("");
    return je ? `${W}-${je}` : W;
  }, [C.getPrefixCls, e.prefixCls]), rr = m || C.iconPrefixCls || di, hr = r || C.csp;
  hg(rr, hr);
  const nr = Ev(y, C.theme, {
    prefixCls: Wn("")
  });
  process.env.NODE_ENV !== "production" && (Vo = Vo || !!nr);
  const pr = {
    csp: hr,
    autoInsertSpaceInButton: n,
    alert: u,
    anchor: a,
    locale: i || p,
    direction: c,
    space: l,
    splitter: d,
    virtual: f,
    popupMatchSelectWidth: h ?? v,
    popupOverflow: g,
    getPrefixCls: Wn,
    iconPrefixCls: rr,
    theme: nr,
    segmented: b,
    statistic: w,
    spin: S,
    calendar: R,
    carousel: k,
    cascader: T,
    collapse: I,
    typography: j,
    checkbox: P,
    descriptions: M,
    divider: L,
    drawer: $,
    skeleton: A,
    steps: D,
    image: B,
    input: le,
    textArea: ke,
    layout: V,
    list: H,
    mentions: q,
    modal: Y,
    progress: G,
    result: K,
    slider: X,
    breadcrumb: te,
    menu: ue,
    pagination: pe,
    empty: Ae,
    badge: Ne,
    radio: U,
    rate: ye,
    switch: J,
    transfer: ie,
    avatar: Pe,
    message: fe,
    tag: Be,
    table: Re,
    card: we,
    tabs: ae,
    timeline: oe,
    timePicker: ge,
    upload: he,
    notification: xe,
    tree: Ue,
    colorPicker: mt,
    datePicker: Tt,
    rangePicker: Vr,
    flex: Hr,
    wave: Oe,
    dropdown: ve,
    warning: gt,
    tour: qt,
    tooltip: ba,
    popover: qr,
    popconfirm: Hn,
    floatButtonGroup: Wt,
    variant: Wr,
    inputNumber: Ur,
    treeSelect: qn
  };
  process.env.NODE_ENV !== "production" && cr("ConfigProvider")(!("autoInsertSpaceInButton" in e), "deprecated", "`autoInsertSpaceInButton` is deprecated. Please use `{ button: { autoInsertSpace: boolean }}` instead.");
  const Ut = Object.assign({}, C);
  Object.keys(pr).forEach((je) => {
    pr[je] !== void 0 && (Ut[je] = pr[je]);
  }), Gv.forEach((je) => {
    const x = e[je];
    x && (Ut[je] = x);
  }), typeof n < "u" && (Ut.button = Object.assign({
    autoInsertSpace: n
  }, Ut.button));
  const Yt = ai(() => Ut, Ut, (je, x) => {
    const z = Object.keys(je), W = Object.keys(x);
    return z.length !== W.length || z.some((Q) => je[Q] !== x[Q]);
  }), {
    layer: Yr
  } = _.useContext(In), Un = _.useMemo(() => ({
    prefixCls: rr,
    csp: hr,
    layer: Yr ? "antd" : void 0
  }), [rr, hr, Yr]);
  let Ye = /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(Uv, {
    dropdownMatchSelectWidth: v
  }), t);
  const Yn = _.useMemo(() => {
    var je, x, z, W;
    return xr(((je = la.Form) === null || je === void 0 ? void 0 : je.defaultValidateMessages) || {}, ((z = (x = Yt.locale) === null || x === void 0 ? void 0 : x.Form) === null || z === void 0 ? void 0 : z.defaultValidateMessages) || {}, ((W = Yt.form) === null || W === void 0 ? void 0 : W.validateMessages) || {}, (o == null ? void 0 : o.validateMessages) || {});
  }, [Yt, o == null ? void 0 : o.validateMessages]);
  Object.keys(Yn).length > 0 && (Ye = /* @__PURE__ */ _.createElement(dv.Provider, {
    value: Yn
  }, Ye)), i && (Ye = /* @__PURE__ */ _.createElement(_d, {
    locale: i,
    _ANT_MARK__: xd
  }, Ye)), Ye = /* @__PURE__ */ _.createElement(si.Provider, {
    value: Un
  }, Ye), s && (Ye = /* @__PURE__ */ _.createElement(pg, {
    size: s
  }, Ye)), Ye = /* @__PURE__ */ _.createElement(Wv, null, Ye);
  const ya = _.useMemo(() => {
    const je = nr || {}, {
      algorithm: x,
      token: z,
      components: W,
      cssVar: Q
    } = je, be = Yv(je, ["algorithm", "token", "components", "cssVar"]), _e = x && (!Array.isArray(x) || x.length > 0) ? _u(x) : ud, de = {};
    Object.entries(W || {}).forEach((Je) => {
      let [Me, Le] = Je;
      const ze = Object.assign({}, Le);
      "algorithm" in ze && (ze.algorithm === !0 ? ze.theme = _e : (Array.isArray(ze.algorithm) || typeof ze.algorithm == "function") && (ze.theme = _u(ze.algorithm)), delete ze.algorithm), de[Me] = ze;
    });
    const se = Object.assign(Object.assign({}, gn), z);
    return Object.assign(Object.assign({}, be), {
      theme: _e,
      token: se,
      components: de,
      override: Object.assign({
        override: se
      }, de),
      cssVar: Q
    });
  }, [nr]);
  return y && (Ye = /* @__PURE__ */ _.createElement(ad.Provider, {
    value: ya
  }, Ye)), Yt.warning && (Ye = /* @__PURE__ */ _.createElement(Tl.Provider, {
    value: Yt.warning
  }, Ye)), E !== void 0 && (Ye = /* @__PURE__ */ _.createElement(Tm, {
    disabled: E
  }, Ye)), /* @__PURE__ */ _.createElement(er.Provider, {
    value: Yt
  }, Ye);
}, zr = (e) => {
  const t = _.useContext(er), r = _.useContext(yd);
  return /* @__PURE__ */ _.createElement(Jv, Object.assign({
    parentContext: t,
    legacyLocale: r
  }, e));
};
zr.ConfigContext = er;
zr.SizeContext = Rr;
zr.config = Zv;
zr.useConfig = yv;
Object.defineProperty(zr, "SizeContext", {
  get: () => (process.env.NODE_ENV !== "production" && oa(!1, "ConfigProvider", "ConfigProvider.SizeContext is deprecated. Please use `ConfigProvider.useConfig().componentSize` instead."), Rr)
});
process.env.NODE_ENV !== "production" && (zr.displayName = "ConfigProvider");
const Md = function(e, t) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
  var n, u;
  const {
    variant: a,
    [e]: o
  } = _.useContext(er), i = _.useContext(lv), s = o == null ? void 0 : o.variant;
  let c;
  typeof t < "u" ? c = t : r === !1 ? c = "borderless" : c = (u = (n = i ?? s) !== null && n !== void 0 ? n : a) !== null && u !== void 0 ? u : "outlined";
  const l = Am.includes(c);
  return [c, l];
}, Id = /* @__PURE__ */ _.createContext(null), Nd = (e, t) => {
  const r = _.useContext(Id), n = _.useMemo(() => {
    if (!r)
      return "";
    const {
      compactDirection: u,
      isFirstItem: a,
      isLastItem: o
    } = r, i = u === "vertical" ? "-vertical-" : "-";
    return ee(`${e}-compact${i}item`, {
      [`${e}-compact${i}first-item`]: a,
      [`${e}-compact${i}last-item`]: o,
      [`${e}-compact${i}item-rtl`]: t === "rtl"
    });
  }, [e, t, r]);
  return {
    compactSize: r == null ? void 0 : r.compactSize,
    compactDirection: r == null ? void 0 : r.compactDirection,
    compactItemClassnames: n
  };
}, Qv = (e) => {
  const {
    children: t
  } = e;
  return /* @__PURE__ */ _.createElement(Id.Provider, {
    value: null
  }, t);
}, Ys = (e) => {
  const {
    space: t,
    form: r,
    children: n
  } = e;
  if (n == null)
    return null;
  let u = n;
  return r && (u = /* @__PURE__ */ O.createElement(cv, {
    override: !0,
    status: !0
  }, u)), t && (u = /* @__PURE__ */ O.createElement(Qv, null, u)), u;
};
function eb(e, t) {
  const r = He([]), n = () => {
    r.current.push(setTimeout(() => {
      var u, a, o, i;
      !((u = e.current) === null || u === void 0) && u.input && ((a = e.current) === null || a === void 0 ? void 0 : a.input.getAttribute("type")) === "password" && (!((o = e.current) === null || o === void 0) && o.input.hasAttribute("value")) && ((i = e.current) === null || i === void 0 || i.input.removeAttribute("value"));
    }));
  };
  return wt(() => (n(), () => r.current.forEach((u) => {
    u && clearTimeout(u);
  })), []), n;
}
function tb(e, t, r) {
  const {
    focusElCls: n,
    focus: u,
    borderElCls: a
  } = r, o = a ? "> *" : "", i = ["hover", u ? "focus" : null, "active"].filter(Boolean).map((s) => `&:${s} ${o}`).join(",");
  return {
    [`&-item:not(${t}-last-item)`]: {
      marginInlineEnd: e.calc(e.lineWidth).mul(-1).equal()
    },
    "&-item": Object.assign(Object.assign({
      [i]: {
        zIndex: 2
      }
    }, n ? {
      [`&${n}`]: {
        zIndex: 2
      }
    } : {}), {
      [`&[disabled] ${o}`]: {
        zIndex: 0
      }
    })
  };
}
function rb(e, t, r) {
  const {
    borderElCls: n
  } = r, u = n ? `> ${n}` : "";
  return {
    [`&-item:not(${t}-first-item):not(${t}-last-item) ${u}`]: {
      borderRadius: 0
    },
    [`&-item:not(${t}-last-item)${t}-first-item`]: {
      [`& ${u}, &${e}-sm ${u}, &${e}-lg ${u}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`&-item:not(${t}-first-item)${t}-last-item`]: {
      [`& ${u}, &${e}-sm ${u}, &${e}-lg ${u}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    }
  };
}
function nb(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    focus: !0
  };
  const {
    componentCls: r
  } = e, n = `${r}-compact`;
  return {
    [n]: Object.assign(Object.assign({}, tb(e, n, t)), rb(r, n, t))
  };
}
function _i(e) {
  return It(e, {
    inputAffixPadding: e.paddingXXS
  });
}
const Ci = (e) => {
  const {
    controlHeight: t,
    fontSize: r,
    lineHeight: n,
    lineWidth: u,
    controlHeightSM: a,
    controlHeightLG: o,
    fontSizeLG: i,
    lineHeightLG: s,
    paddingSM: c,
    controlPaddingHorizontalSM: l,
    controlPaddingHorizontal: d,
    colorFillAlter: f,
    colorPrimaryHover: v,
    colorPrimary: h,
    controlOutlineWidth: g,
    controlOutline: p,
    colorErrorOutline: C,
    colorWarningOutline: m,
    colorBgContainer: y,
    inputFontSize: E,
    inputFontSizeLG: b,
    inputFontSizeSM: w
  } = e, S = E || r, R = w || S, k = b || i, T = Math.round((t - S * n) / 2 * 10) / 10 - u, I = Math.round((a - R * n) / 2 * 10) / 10 - u, j = Math.ceil((o - k * s) / 2 * 10) / 10 - u;
  return {
    paddingBlock: Math.max(T, 0),
    paddingBlockSM: Math.max(I, 0),
    paddingBlockLG: Math.max(j, 0),
    paddingInline: c - u,
    paddingInlineSM: l - u,
    paddingInlineLG: d - u,
    addonBg: f,
    activeBorderColor: h,
    hoverBorderColor: v,
    activeShadow: `0 0 0 ${g}px ${p}`,
    errorActiveShadow: `0 0 0 ${g}px ${C}`,
    warningActiveShadow: `0 0 0 ${g}px ${m}`,
    hoverBg: y,
    activeBg: y,
    inputFontSize: S,
    inputFontSizeLG: k,
    inputFontSizeSM: R
  };
}, ub = (e) => ({
  borderColor: e.hoverBorderColor,
  backgroundColor: e.hoverBg
}), Ei = (e) => ({
  color: e.colorTextDisabled,
  backgroundColor: e.colorBgContainerDisabled,
  borderColor: e.colorBorder,
  boxShadow: "none",
  cursor: "not-allowed",
  opacity: 1,
  "input[disabled], textarea[disabled]": {
    cursor: "not-allowed"
  },
  "&:hover:not([disabled])": Object.assign({}, ub(It(e, {
    hoverBorderColor: e.colorBorder,
    hoverBg: e.colorBgContainerDisabled
  })))
}), jd = (e, t) => ({
  background: e.colorBgContainer,
  borderWidth: e.lineWidth,
  borderStyle: e.lineType,
  borderColor: t.borderColor,
  "&:hover": {
    borderColor: t.hoverBorderColor,
    backgroundColor: e.hoverBg
  },
  "&:focus, &:focus-within": {
    borderColor: t.activeBorderColor,
    boxShadow: t.activeShadow,
    outline: 0,
    backgroundColor: e.activeBg
  }
}), Gs = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, jd(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  }),
  [`&${e.componentCls}-status-${t.status}${e.componentCls}-disabled`]: {
    borderColor: t.borderColor
  }
}), ab = (e, t) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, jd(e, {
    borderColor: e.colorBorder,
    hoverBorderColor: e.hoverBorderColor,
    activeBorderColor: e.activeBorderColor,
    activeShadow: e.activeShadow
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, Ei(e))
  }), Gs(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), Gs(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), t)
}), Ks = (e, t) => ({
  [`&${e.componentCls}-group-wrapper-status-${t.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      borderColor: t.addonBorderColor,
      color: t.addonColor
    }
  }
}), ob = (e) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group`]: {
      "&-addon": {
        background: e.addonBg,
        border: `${Se(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
      },
      "&-addon:first-child": {
        borderInlineEnd: 0
      },
      "&-addon:last-child": {
        borderInlineStart: 0
      }
    }
  }, Ks(e, {
    status: "error",
    addonBorderColor: e.colorError,
    addonColor: e.colorErrorText
  })), Ks(e, {
    status: "warning",
    addonBorderColor: e.colorWarning,
    addonColor: e.colorWarningText
  })), {
    [`&${e.componentCls}-group-wrapper-disabled`]: {
      [`${e.componentCls}-group-addon`]: Object.assign({}, Ei(e))
    }
  })
}), ib = (e, t) => {
  const {
    componentCls: r
  } = e;
  return {
    "&-borderless": Object.assign({
      background: "transparent",
      border: "none",
      "&:focus, &:focus-within": {
        outline: "none"
      },
      // >>>>> Disabled
      [`&${r}-disabled, &[disabled]`]: {
        color: e.colorTextDisabled,
        cursor: "not-allowed"
      },
      // >>>>> Status
      [`&${r}-status-error`]: {
        "&, & input, & textarea": {
          color: e.colorError
        }
      },
      [`&${r}-status-warning`]: {
        "&, & input, & textarea": {
          color: e.colorWarning
        }
      }
    }, t)
  };
}, Ld = (e, t) => {
  var r;
  return {
    background: t.bg,
    borderWidth: e.lineWidth,
    borderStyle: e.lineType,
    borderColor: "transparent",
    "input&, & input, textarea&, & textarea": {
      color: (r = t == null ? void 0 : t.inputColor) !== null && r !== void 0 ? r : "unset"
    },
    "&:hover": {
      background: t.hoverBg
    },
    "&:focus, &:focus-within": {
      outline: 0,
      borderColor: t.activeBorderColor,
      backgroundColor: e.activeBg
    }
  };
}, Xs = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, Ld(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  })
}), sb = (e, t) => ({
  "&-filled": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Ld(e, {
    bg: e.colorFillTertiary,
    hoverBg: e.colorFillSecondary,
    activeBorderColor: e.activeBorderColor
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, Ei(e))
  }), Xs(e, {
    status: "error",
    bg: e.colorErrorBg,
    hoverBg: e.colorErrorBgHover,
    activeBorderColor: e.colorError,
    inputColor: e.colorErrorText,
    affixColor: e.colorError
  })), Xs(e, {
    status: "warning",
    bg: e.colorWarningBg,
    hoverBg: e.colorWarningBgHover,
    activeBorderColor: e.colorWarning,
    inputColor: e.colorWarningText,
    affixColor: e.colorWarning
  })), t)
}), Zs = (e, t) => ({
  [`&${e.componentCls}-group-wrapper-status-${t.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      background: t.addonBg,
      color: t.addonColor
    }
  }
}), cb = (e) => ({
  "&-filled": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group`]: {
      "&-addon": {
        background: e.colorFillTertiary
      },
      [`${e.componentCls}-filled:not(:focus):not(:focus-within)`]: {
        "&:not(:first-child)": {
          borderInlineStart: `${Se(e.lineWidth)} ${e.lineType} ${e.colorSplit}`
        },
        "&:not(:last-child)": {
          borderInlineEnd: `${Se(e.lineWidth)} ${e.lineType} ${e.colorSplit}`
        }
      }
    }
  }, Zs(e, {
    status: "error",
    addonBg: e.colorErrorBg,
    addonColor: e.colorErrorText
  })), Zs(e, {
    status: "warning",
    addonBg: e.colorWarningBg,
    addonColor: e.colorWarningText
  })), {
    [`&${e.componentCls}-group-wrapper-disabled`]: {
      [`${e.componentCls}-group`]: {
        "&-addon": {
          background: e.colorFillTertiary,
          color: e.colorTextDisabled
        },
        "&-addon:first-child": {
          borderInlineStart: `${Se(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${Se(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${Se(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        },
        "&-addon:last-child": {
          borderInlineEnd: `${Se(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${Se(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${Se(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        }
      }
    }
  })
}), zd = (e, t) => ({
  background: e.colorBgContainer,
  borderWidth: `${Se(e.lineWidth)} 0`,
  borderStyle: `${e.lineType} none`,
  borderColor: `transparent transparent ${t.borderColor} transparent`,
  borderRadius: 0,
  "&:hover": {
    borderColor: `transparent transparent ${t.borderColor} transparent`,
    backgroundColor: e.hoverBg
  },
  "&:focus, &:focus-within": {
    borderColor: `transparent transparent ${t.borderColor} transparent`,
    outline: 0,
    backgroundColor: e.activeBg
  }
}), Js = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, zd(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  }),
  [`&${e.componentCls}-status-${t.status}${e.componentCls}-disabled`]: {
    borderColor: `transparent transparent ${t.borderColor} transparent`
  }
}), lb = (e, t) => ({
  "&-underlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, zd(e, {
    borderColor: e.colorBorder,
    hoverBorderColor: e.hoverBorderColor,
    activeBorderColor: e.activeBorderColor,
    activeShadow: e.activeShadow
  })), {
    // >>>>> Disabled
    [`&${e.componentCls}-disabled, &[disabled]`]: {
      color: e.colorTextDisabled,
      boxShadow: "none",
      cursor: "not-allowed",
      "&:hover": {
        borderColor: `transparent transparent ${e.colorBorder} transparent`
      }
    },
    "input[disabled], textarea[disabled]": {
      cursor: "not-allowed"
    }
  }), Js(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), Js(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), t)
}), db = (e) => ({
  // Firefox
  "&::-moz-placeholder": {
    opacity: 1
  },
  "&::placeholder": {
    color: e,
    userSelect: "none"
    // https://github.com/ant-design/ant-design/pull/32639
  },
  "&:placeholder-shown": {
    textOverflow: "ellipsis"
  }
}), Bd = (e) => {
  const {
    paddingBlockLG: t,
    lineHeightLG: r,
    borderRadiusLG: n,
    paddingInlineLG: u
  } = e;
  return {
    padding: `${Se(t)} ${Se(u)}`,
    fontSize: e.inputFontSizeLG,
    lineHeight: r,
    borderRadius: n
  };
}, Vd = (e) => ({
  padding: `${Se(e.paddingBlockSM)} ${Se(e.paddingInlineSM)}`,
  fontSize: e.inputFontSizeSM,
  borderRadius: e.borderRadiusSM
}), Hd = (e) => Object.assign(Object.assign({
  position: "relative",
  display: "inline-block",
  width: "100%",
  minWidth: 0,
  padding: `${Se(e.paddingBlock)} ${Se(e.paddingInline)}`,
  color: e.colorText,
  fontSize: e.inputFontSize,
  lineHeight: e.lineHeight,
  borderRadius: e.borderRadius,
  transition: `all ${e.motionDurationMid}`
}, db(e.colorTextPlaceholder)), {
  // Size
  "&-lg": Object.assign({}, Bd(e)),
  "&-sm": Object.assign({}, Vd(e)),
  // RTL
  "&-rtl, &-textarea-rtl": {
    direction: "rtl"
  }
}), fb = (e) => {
  const {
    componentCls: t,
    antCls: r
  } = e;
  return {
    position: "relative",
    display: "table",
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    // Undo padding and float of grid classes
    "&[class*='col-']": {
      paddingInlineEnd: e.paddingXS,
      "&:last-child": {
        paddingInlineEnd: 0
      }
    },
    // Sizing options
    [`&-lg ${t}, &-lg > ${t}-group-addon`]: Object.assign({}, Bd(e)),
    [`&-sm ${t}, &-sm > ${t}-group-addon`]: Object.assign({}, Vd(e)),
    // Fix https://github.com/ant-design/ant-design/issues/5754
    [`&-lg ${r}-select-single ${r}-select-selector`]: {
      height: e.controlHeightLG
    },
    [`&-sm ${r}-select-single ${r}-select-selector`]: {
      height: e.controlHeightSM
    },
    [`> ${t}`]: {
      display: "table-cell",
      "&:not(:first-child):not(:last-child)": {
        borderRadius: 0
      }
    },
    [`${t}-group`]: {
      "&-addon, &-wrap": {
        display: "table-cell",
        width: 1,
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        "&:not(:first-child):not(:last-child)": {
          borderRadius: 0
        }
      },
      "&-wrap > *": {
        display: "block !important"
      },
      "&-addon": {
        position: "relative",
        padding: `0 ${Se(e.paddingInline)}`,
        color: e.colorText,
        fontWeight: "normal",
        fontSize: e.inputFontSize,
        textAlign: "center",
        borderRadius: e.borderRadius,
        transition: `all ${e.motionDurationSlow}`,
        lineHeight: 1,
        // Reset Select's style in addon
        [`${r}-select`]: {
          margin: `${Se(e.calc(e.paddingBlock).add(1).mul(-1).equal())} ${Se(e.calc(e.paddingInline).mul(-1).equal())}`,
          [`&${r}-select-single:not(${r}-select-customize-input):not(${r}-pagination-size-changer)`]: {
            [`${r}-select-selector`]: {
              backgroundColor: "inherit",
              border: `${Se(e.lineWidth)} ${e.lineType} transparent`,
              boxShadow: "none"
            }
          }
        },
        // https://github.com/ant-design/ant-design/issues/31333
        [`${r}-cascader-picker`]: {
          margin: `-9px ${Se(e.calc(e.paddingInline).mul(-1).equal())}`,
          backgroundColor: "transparent",
          [`${r}-cascader-input`]: {
            textAlign: "start",
            border: 0,
            boxShadow: "none"
          }
        }
      }
    },
    [t]: {
      width: "100%",
      marginBottom: 0,
      textAlign: "inherit",
      "&:focus": {
        zIndex: 1,
        // Fix https://gw.alipayobjects.com/zos/rmsportal/DHNpoqfMXSfrSnlZvhsJ.png
        borderInlineEndWidth: 1
      },
      "&:hover": {
        zIndex: 1,
        borderInlineEndWidth: 1,
        [`${t}-search-with-button &`]: {
          zIndex: 0
        }
      }
    },
    // Reset rounded corners
    [`> ${t}:first-child, ${t}-group-addon:first-child`]: {
      borderStartEndRadius: 0,
      borderEndEndRadius: 0,
      // Reset Select's style in addon
      [`${r}-select ${r}-select-selector`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`> ${t}-affix-wrapper`]: {
      [`&:not(:first-child) ${t}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      },
      [`&:not(:last-child) ${t}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`> ${t}:last-child, ${t}-group-addon:last-child`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
      // Reset Select's style in addon
      [`${r}-select ${r}-select-selector`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`${t}-affix-wrapper`]: {
      "&:not(:last-child)": {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
        [`${t}-search &`]: {
          borderStartStartRadius: e.borderRadius,
          borderEndStartRadius: e.borderRadius
        }
      },
      [`&:not(:first-child), ${t}-search &:not(:first-child)`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`&${t}-group-compact`]: Object.assign(Object.assign({
      display: "block"
    }, lg()), {
      [`${t}-group-addon, ${t}-group-wrap, > ${t}`]: {
        "&:not(:first-child):not(:last-child)": {
          borderInlineEndWidth: e.lineWidth,
          "&:hover, &:focus": {
            zIndex: 1
          }
        }
      },
      "& > *": {
        display: "inline-flex",
        float: "none",
        verticalAlign: "top",
        // https://github.com/ant-design/ant-design-pro/issues/139
        borderRadius: 0
      },
      [`
        & > ${t}-affix-wrapper,
        & > ${t}-number-affix-wrapper,
        & > ${r}-picker-range
      `]: {
        display: "inline-flex"
      },
      "& > *:not(:last-child)": {
        marginInlineEnd: e.calc(e.lineWidth).mul(-1).equal(),
        borderInlineEndWidth: e.lineWidth
      },
      // Undo float for .ant-input-group .ant-input
      [t]: {
        float: "none"
      },
      // reset border for Select, DatePicker, AutoComplete, Cascader, Mention, TimePicker, Input
      [`& > ${r}-select > ${r}-select-selector,
      & > ${r}-select-auto-complete ${t},
      & > ${r}-cascader-picker ${t},
      & > ${t}-group-wrapper ${t}`]: {
        borderInlineEndWidth: e.lineWidth,
        borderRadius: 0,
        "&:hover, &:focus": {
          zIndex: 1
        }
      },
      [`& > ${r}-select-focused`]: {
        zIndex: 1
      },
      // update z-index for arrow icon
      [`& > ${r}-select > ${r}-select-arrow`]: {
        zIndex: 1
        // https://github.com/ant-design/ant-design/issues/20371
      },
      [`& > *:first-child,
      & > ${r}-select:first-child > ${r}-select-selector,
      & > ${r}-select-auto-complete:first-child ${t},
      & > ${r}-cascader-picker:first-child ${t}`]: {
        borderStartStartRadius: e.borderRadius,
        borderEndStartRadius: e.borderRadius
      },
      [`& > *:last-child,
      & > ${r}-select:last-child > ${r}-select-selector,
      & > ${r}-cascader-picker:last-child ${t},
      & > ${r}-cascader-picker-focused:last-child ${t}`]: {
        borderInlineEndWidth: e.lineWidth,
        borderStartEndRadius: e.borderRadius,
        borderEndEndRadius: e.borderRadius
      },
      // https://github.com/ant-design/ant-design/issues/12493
      [`& > ${r}-select-auto-complete ${t}`]: {
        verticalAlign: "top"
      },
      [`${t}-group-wrapper + ${t}-group-wrapper`]: {
        marginInlineStart: e.calc(e.lineWidth).mul(-1).equal(),
        [`${t}-affix-wrapper`]: {
          borderRadius: 0
        }
      },
      [`${t}-group-wrapper:not(:last-child)`]: {
        [`&${t}-search > ${t}-group`]: {
          [`& > ${t}-group-addon > ${t}-search-button`]: {
            borderRadius: 0
          },
          [`& > ${t}`]: {
            borderStartStartRadius: e.borderRadius,
            borderStartEndRadius: 0,
            borderEndEndRadius: 0,
            borderEndStartRadius: e.borderRadius
          }
        }
      }
    })
  };
}, hb = (e) => {
  const {
    componentCls: t,
    controlHeightSM: r,
    lineWidth: n,
    calc: u
  } = e, o = u(r).sub(u(n).mul(2)).sub(16).div(2).equal();
  return {
    [t]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, sd(e)), Hd(e)), ab(e)), sb(e)), ib(e)), lb(e)), {
      '&[type="color"]': {
        height: e.controlHeight,
        [`&${t}-lg`]: {
          height: e.controlHeightLG
        },
        [`&${t}-sm`]: {
          height: r,
          paddingTop: o,
          paddingBottom: o
        }
      },
      '&[type="search"]::-webkit-search-cancel-button, &[type="search"]::-webkit-search-decoration': {
        appearance: "none"
      }
    })
  };
}, pb = (e) => {
  const {
    componentCls: t
  } = e;
  return {
    // ========================= Input =========================
    [`${t}-clear-icon`]: {
      margin: 0,
      padding: 0,
      lineHeight: 0,
      color: e.colorTextQuaternary,
      fontSize: e.fontSizeIcon,
      verticalAlign: -1,
      // https://github.com/ant-design/ant-design/pull/18151
      // https://codesandbox.io/s/wizardly-sun-u10br
      cursor: "pointer",
      transition: `color ${e.motionDurationSlow}`,
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      "&:hover": {
        color: e.colorTextTertiary
      },
      "&:active": {
        color: e.colorText
      },
      "&-hidden": {
        visibility: "hidden"
      },
      "&-has-suffix": {
        margin: `0 ${Se(e.inputAffixPadding)}`
      }
    }
  };
}, mb = (e) => {
  const {
    componentCls: t,
    inputAffixPadding: r,
    colorTextDescription: n,
    motionDurationSlow: u,
    colorIcon: a,
    colorIconHover: o,
    iconCls: i
  } = e, s = `${t}-affix-wrapper`, c = `${t}-affix-wrapper-disabled`;
  return {
    [s]: Object.assign(Object.assign(Object.assign(Object.assign({}, Hd(e)), {
      display: "inline-flex",
      [`&:not(${t}-disabled):hover`]: {
        zIndex: 1,
        [`${t}-search-with-button &`]: {
          zIndex: 0
        }
      },
      "&-focused, &:focus": {
        zIndex: 1
      },
      [`> input${t}`]: {
        padding: 0
      },
      [`> input${t}, > textarea${t}`]: {
        fontSize: "inherit",
        border: "none",
        borderRadius: 0,
        outline: "none",
        background: "transparent",
        color: "inherit",
        "&::-ms-reveal": {
          display: "none"
        },
        "&:focus": {
          boxShadow: "none !important"
        }
      },
      "&::before": {
        display: "inline-block",
        width: 0,
        visibility: "hidden",
        content: '"\\a0"'
      },
      [t]: {
        "&-prefix, &-suffix": {
          display: "flex",
          flex: "none",
          alignItems: "center",
          "> *:not(:last-child)": {
            marginInlineEnd: e.paddingXS
          }
        },
        "&-show-count-suffix": {
          color: n
        },
        "&-show-count-has-suffix": {
          marginInlineEnd: e.paddingXXS
        },
        "&-prefix": {
          marginInlineEnd: r
        },
        "&-suffix": {
          marginInlineStart: r
        }
      }
    }), pb(e)), {
      // password
      [`${i}${t}-password-icon`]: {
        color: a,
        cursor: "pointer",
        transition: `all ${u}`,
        "&:hover": {
          color: o
        }
      }
    }),
    // 覆盖 affix-wrapper borderRadius！
    [`${t}-underlined`]: {
      borderRadius: 0
    },
    [c]: {
      // password disabled
      [`${i}${t}-password-icon`]: {
        color: a,
        cursor: "not-allowed",
        "&:hover": {
          color: a
        }
      }
    }
  };
}, gb = (e) => {
  const {
    componentCls: t,
    borderRadiusLG: r,
    borderRadiusSM: n
  } = e;
  return {
    [`${t}-group`]: Object.assign(Object.assign(Object.assign({}, sd(e)), fb(e)), {
      "&-rtl": {
        direction: "rtl"
      },
      "&-wrapper": Object.assign(Object.assign(Object.assign({
        display: "inline-block",
        width: "100%",
        textAlign: "start",
        verticalAlign: "top",
        "&-rtl": {
          direction: "rtl"
        },
        // Size
        "&-lg": {
          [`${t}-group-addon`]: {
            borderRadius: r,
            fontSize: e.inputFontSizeLG
          }
        },
        "&-sm": {
          [`${t}-group-addon`]: {
            borderRadius: n
          }
        }
      }, ob(e)), cb(e)), {
        // '&-disabled': {
        //   [`${componentCls}-group-addon`]: {
        //     ...genDisabledStyle(token),
        //   },
        // },
        // Fix the issue of using icons in Space Compact mode
        // https://github.com/ant-design/ant-design/issues/42122
        [`&:not(${t}-compact-first-item):not(${t}-compact-last-item)${t}-compact-item`]: {
          [`${t}, ${t}-group-addon`]: {
            borderRadius: 0
          }
        },
        [`&:not(${t}-compact-last-item)${t}-compact-first-item`]: {
          [`${t}, ${t}-group-addon`]: {
            borderStartEndRadius: 0,
            borderEndEndRadius: 0
          }
        },
        [`&:not(${t}-compact-first-item)${t}-compact-last-item`]: {
          [`${t}, ${t}-group-addon`]: {
            borderStartStartRadius: 0,
            borderEndStartRadius: 0
          }
        },
        // Fix the issue of input use show-count param in space compact mode
        // https://github.com/ant-design/ant-design/issues/46872
        [`&:not(${t}-compact-last-item)${t}-compact-item`]: {
          [`${t}-affix-wrapper`]: {
            borderStartEndRadius: 0,
            borderEndEndRadius: 0
          }
        },
        // Fix the issue of input use `addonAfter` param in space compact mode
        // https://github.com/ant-design/ant-design/issues/52483
        [`&:not(${t}-compact-first-item)${t}-compact-item`]: {
          [`${t}-affix-wrapper`]: {
            borderStartStartRadius: 0,
            borderEndStartRadius: 0
          }
        }
      })
    })
  };
}, vb = (e) => {
  const {
    componentCls: t,
    antCls: r
  } = e, n = `${t}-search`;
  return {
    [n]: {
      [t]: {
        "&:hover, &:focus": {
          [`+ ${t}-group-addon ${n}-button:not(${r}-btn-primary)`]: {
            borderInlineStartColor: e.colorPrimaryHover
          }
        }
      },
      [`${t}-affix-wrapper`]: {
        height: e.controlHeight,
        borderRadius: 0
      },
      // fix slight height diff in Firefox:
      // https://ant.design/components/auto-complete-cn/#auto-complete-demo-certain-category
      [`${t}-lg`]: {
        lineHeight: e.calc(e.lineHeightLG).sub(2e-4).equal()
      },
      [`> ${t}-group`]: {
        [`> ${t}-group-addon:last-child`]: {
          insetInlineStart: -1,
          padding: 0,
          border: 0,
          [`${n}-button`]: {
            // Fix https://github.com/ant-design/ant-design/issues/47150
            marginInlineEnd: -1,
            borderStartStartRadius: 0,
            borderEndStartRadius: 0,
            boxShadow: "none"
          },
          [`${n}-button:not(${r}-btn-primary)`]: {
            color: e.colorTextDescription,
            "&:hover": {
              color: e.colorPrimaryHover
            },
            "&:active": {
              color: e.colorPrimaryActive
            },
            [`&${r}-btn-loading::before`]: {
              insetInlineStart: 0,
              insetInlineEnd: 0,
              insetBlockStart: 0,
              insetBlockEnd: 0
            }
          }
        }
      },
      [`${n}-button`]: {
        height: e.controlHeight,
        "&:hover, &:focus": {
          zIndex: 1
        }
      },
      "&-large": {
        [`${t}-affix-wrapper, ${n}-button`]: {
          height: e.controlHeightLG
        }
      },
      "&-small": {
        [`${t}-affix-wrapper, ${n}-button`]: {
          height: e.controlHeightSM
        }
      },
      "&-rtl": {
        direction: "rtl"
      },
      // ===================== Compact Item Customized Styles =====================
      [`&${t}-compact-item`]: {
        [`&:not(${t}-compact-last-item)`]: {
          [`${t}-group-addon`]: {
            [`${t}-search-button`]: {
              marginInlineEnd: e.calc(e.lineWidth).mul(-1).equal(),
              borderRadius: 0
            }
          }
        },
        [`&:not(${t}-compact-first-item)`]: {
          [`${t},${t}-affix-wrapper`]: {
            borderRadius: 0
          }
        },
        [`> ${t}-group-addon ${t}-search-button,
        > ${t},
        ${t}-affix-wrapper`]: {
          "&:hover, &:focus, &:active": {
            zIndex: 2
          }
        },
        [`> ${t}-affix-wrapper-focused`]: {
          zIndex: 2
        }
      }
    }
  };
}, bb = (e) => {
  const {
    componentCls: t
  } = e;
  return {
    [`${t}-out-of-range`]: {
      [`&, & input, & textarea, ${t}-show-count-suffix, ${t}-data-count`]: {
        color: e.colorError
      }
    }
  };
}, qd = bi(["Input", "Shared"], (e) => {
  const t = It(e, _i(e));
  return [hb(t), mb(t)];
}, Ci, {
  resetFont: !1
}), yb = bi(["Input", "Component"], (e) => {
  const t = It(e, _i(e));
  return [
    gb(t),
    vb(t),
    bb(t),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    nb(t)
  ];
}, Ci, {
  resetFont: !1
});
function xb(e) {
  return !!(e.prefix || e.suffix || e.allowClear || e.showCount);
}
var _b = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var u = 0, n = Object.getOwnPropertySymbols(e); u < n.length; u++)
    t.indexOf(n[u]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[u]) && (r[n[u]] = e[n[u]]);
  return r;
};
const Cb = /* @__PURE__ */ Yo((e, t) => {
  const {
    prefixCls: r,
    bordered: n = !0,
    status: u,
    size: a,
    disabled: o,
    onBlur: i,
    onFocus: s,
    suffix: c,
    allowClear: l,
    addonAfter: d,
    addonBefore: f,
    className: v,
    style: h,
    styles: g,
    rootClassName: p,
    onChange: C,
    classNames: m,
    variant: y
  } = e, E = _b(e, ["prefixCls", "bordered", "status", "size", "disabled", "onBlur", "onFocus", "suffix", "allowClear", "addonAfter", "addonBefore", "className", "style", "styles", "rootClassName", "onChange", "classNames", "variant"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: fe
    } = cr("Input");
    fe(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: b,
    direction: w,
    allowClear: S,
    autoComplete: R,
    className: k,
    style: T,
    classNames: I,
    styles: j
  } = Rl("input"), P = b("input", r), M = He(null), L = ld(P), [$, A, D] = qd(P, p), [B] = yb(P, L), {
    compactSize: V,
    compactItemClassnames: H
  } = Nd(P, w), q = dd((fe) => {
    var Be;
    return (Be = a ?? V) !== null && Be !== void 0 ? Be : fe;
  }), Y = O.useContext(hn), G = o ?? Y, {
    status: K,
    hasFeedback: X,
    feedbackIcon: te
  } = Bt(vn), ue = Al(K, u), pe = xb(e) || !!X, le = He(pe);
  if (process.env.NODE_ENV !== "production") {
    const fe = cr("Input");
    wt(() => {
      var Be;
      pe && !le.current && process.env.NODE_ENV !== "production" && fe(document.activeElement === ((Be = M.current) === null || Be === void 0 ? void 0 : Be.input), "usage", "When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ"), le.current = pe;
    }, [pe]);
  }
  const ke = eb(M), Ae = (fe) => {
    ke(), i == null || i(fe);
  }, Ne = (fe) => {
    ke(), s == null || s(fe);
  }, U = (fe) => {
    ke(), C == null || C(fe);
  }, ye = (X || c) && /* @__PURE__ */ O.createElement(O.Fragment, null, c, X && te), J = kl(l ?? S), [ie, Pe] = Md("input", y, n);
  return $(B(/* @__PURE__ */ O.createElement(mp, Object.assign({
    ref: rl(t, M),
    prefixCls: P,
    autoComplete: R
  }, E, {
    disabled: G,
    onBlur: Ae,
    onFocus: Ne,
    style: Object.assign(Object.assign({}, T), h),
    styles: Object.assign(Object.assign({}, j), g),
    suffix: ye,
    allowClear: J,
    className: ee(v, p, D, L, H, k),
    onChange: U,
    addonBefore: f && /* @__PURE__ */ O.createElement(Ys, {
      form: !0,
      space: !0
    }, f),
    addonAfter: d && /* @__PURE__ */ O.createElement(Ys, {
      form: !0,
      space: !0
    }, d),
    classNames: Object.assign(Object.assign(Object.assign({}, m), I), {
      input: ee({
        [`${P}-sm`]: q === "small",
        [`${P}-lg`]: q === "large",
        [`${P}-rtl`]: w === "rtl"
      }, m == null ? void 0 : m.input, I.input, A),
      variant: ee({
        [`${P}-${ie}`]: Pe
      }, vo(P, ue)),
      affixWrapper: ee({
        [`${P}-affix-wrapper-sm`]: q === "small",
        [`${P}-affix-wrapper-lg`]: q === "large",
        [`${P}-affix-wrapper-rtl`]: w === "rtl"
      }, A),
      wrapper: ee({
        [`${P}-group-rtl`]: w === "rtl"
      }, A),
      groupWrapper: ee({
        [`${P}-group-wrapper-sm`]: q === "small",
        [`${P}-group-wrapper-lg`]: q === "large",
        [`${P}-group-wrapper-rtl`]: w === "rtl",
        [`${P}-group-wrapper-${ie}`]: Pe
      }, vo(`${P}-group-wrapper`, ue, X), A)
    })
  }))));
});
process.env.NODE_ENV !== "production" && (Cb.displayName = "Input");
const Eb = (e) => {
  const {
    componentCls: t,
    paddingLG: r
  } = e, n = `${t}-textarea`;
  return {
    // Raw Textarea
    [`textarea${t}`]: {
      maxWidth: "100%",
      // prevent textarea resize from coming out of its container
      height: "auto",
      minHeight: e.controlHeight,
      lineHeight: e.lineHeight,
      verticalAlign: "bottom",
      transition: `all ${e.motionDurationSlow}`,
      resize: "vertical",
      [`&${t}-mouse-active`]: {
        transition: `all ${e.motionDurationSlow}, height 0s, width 0s`
      }
    },
    // Wrapper for resize
    [`${t}-textarea-affix-wrapper-resize-dirty`]: {
      width: "auto"
    },
    [n]: {
      position: "relative",
      "&-show-count": {
        // https://github.com/ant-design/ant-design/issues/33049
        [`> ${t}`]: {
          height: "100%"
        },
        [`${t}-data-count`]: {
          position: "absolute",
          bottom: e.calc(e.fontSize).mul(e.lineHeight).mul(-1).equal(),
          insetInlineEnd: 0,
          color: e.colorTextDescription,
          whiteSpace: "nowrap",
          pointerEvents: "none"
        }
      },
      [`
        &-allow-clear > ${t},
        &-affix-wrapper${n}-has-feedback ${t}
      `]: {
        paddingInlineEnd: r
      },
      [`&-affix-wrapper${t}-affix-wrapper`]: {
        padding: 0,
        [`> textarea${t}`]: {
          fontSize: "inherit",
          border: "none",
          outline: "none",
          background: "transparent",
          minHeight: e.calc(e.controlHeight).sub(e.calc(e.lineWidth).mul(2)).equal(),
          "&:focus": {
            boxShadow: "none !important"
          }
        },
        [`${t}-suffix`]: {
          margin: 0,
          "> *:not(:last-child)": {
            marginInline: 0
          },
          // Clear Icon
          [`${t}-clear-icon`]: {
            position: "absolute",
            insetInlineEnd: e.paddingInline,
            insetBlockStart: e.paddingXS
          },
          // Feedback Icon
          [`${n}-suffix`]: {
            position: "absolute",
            top: 0,
            insetInlineEnd: e.paddingInline,
            bottom: 0,
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            margin: "auto",
            pointerEvents: "none"
          }
        }
      },
      [`&-affix-wrapper${t}-affix-wrapper-sm`]: {
        [`${t}-suffix`]: {
          [`${t}-clear-icon`]: {
            insetInlineEnd: e.paddingInlineSM
          }
        }
      }
    }
  };
}, Sb = bi(["Input", "TextArea"], (e) => {
  const t = It(e, _i(e));
  return [Eb(t)];
}, Ci, {
  resetFont: !1
});
var wb = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var u = 0, n = Object.getOwnPropertySymbols(e); u < n.length; u++)
    t.indexOf(n[u]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[u]) && (r[n[u]] = e[n[u]]);
  return r;
};
const $3 = /* @__PURE__ */ Yo((e, t) => {
  var r;
  const {
    prefixCls: n,
    bordered: u = !0,
    size: a,
    disabled: o,
    status: i,
    allowClear: s,
    classNames: c,
    rootClassName: l,
    className: d,
    style: f,
    styles: v,
    variant: h,
    showCount: g,
    onMouseDown: p,
    onResize: C
  } = e, m = wb(e, ["prefixCls", "bordered", "size", "disabled", "status", "allowClear", "classNames", "rootClassName", "className", "style", "styles", "variant", "showCount", "onMouseDown", "onResize"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: J
    } = cr("TextArea");
    J(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: y,
    direction: E,
    allowClear: b,
    autoComplete: w,
    className: S,
    style: R,
    classNames: k,
    styles: T
  } = Rl("textArea"), I = _.useContext(hn), j = o ?? I, {
    status: P,
    hasFeedback: M,
    feedbackIcon: L
  } = _.useContext(vn), $ = Al(P, i), A = _.useRef(null);
  _.useImperativeHandle(t, () => {
    var J;
    return {
      resizableTextArea: (J = A.current) === null || J === void 0 ? void 0 : J.resizableTextArea,
      focus: (ie) => {
        var Pe, fe;
        Kc((fe = (Pe = A.current) === null || Pe === void 0 ? void 0 : Pe.resizableTextArea) === null || fe === void 0 ? void 0 : fe.textArea, ie);
      },
      blur: () => {
        var ie;
        return (ie = A.current) === null || ie === void 0 ? void 0 : ie.blur();
      }
    };
  });
  const D = y("input", n), B = ld(D), [V, H, q] = qd(D, l), [Y] = Sb(D, B), {
    compactSize: G,
    compactItemClassnames: K
  } = Nd(D, E), X = dd((J) => {
    var ie;
    return (ie = a ?? G) !== null && ie !== void 0 ? ie : J;
  }), [te, ue] = Md("textArea", h, u), pe = kl(s ?? b), [le, ke] = _.useState(!1), [Ae, Ne] = _.useState(!1), U = (J) => {
    ke(!0), p == null || p(J);
    const ie = () => {
      ke(!1), document.removeEventListener("mouseup", ie);
    };
    document.addEventListener("mouseup", ie);
  }, ye = (J) => {
    var ie, Pe;
    if (C == null || C(J), le && typeof getComputedStyle == "function") {
      const fe = (Pe = (ie = A.current) === null || ie === void 0 ? void 0 : ie.nativeElement) === null || Pe === void 0 ? void 0 : Pe.querySelector("textarea");
      fe && getComputedStyle(fe).resize === "both" && Ne(!0);
    }
  };
  return V(Y(/* @__PURE__ */ _.createElement(om, Object.assign({
    autoComplete: w
  }, m, {
    style: Object.assign(Object.assign({}, R), f),
    styles: Object.assign(Object.assign({}, T), v),
    disabled: j,
    allowClear: pe,
    className: ee(
      q,
      B,
      d,
      l,
      K,
      S,
      // Only for wrapper
      Ae && `${D}-textarea-affix-wrapper-resize-dirty`
    ),
    classNames: Object.assign(Object.assign(Object.assign({}, c), k), {
      textarea: ee({
        [`${D}-sm`]: X === "small",
        [`${D}-lg`]: X === "large"
      }, H, c == null ? void 0 : c.textarea, k.textarea, le && `${D}-mouse-active`),
      variant: ee({
        [`${D}-${te}`]: ue
      }, vo(D, $)),
      affixWrapper: ee(`${D}-textarea-affix-wrapper`, {
        [`${D}-affix-wrapper-rtl`]: E === "rtl",
        [`${D}-affix-wrapper-sm`]: X === "small",
        [`${D}-affix-wrapper-lg`]: X === "large",
        [`${D}-textarea-show-count`]: g || ((r = e.count) === null || r === void 0 ? void 0 : r.show)
      }, H)
    }),
    prefixCls: D,
    suffix: M && /* @__PURE__ */ _.createElement("span", {
      className: `${D}-textarea-suffix`
    }, L),
    showCount: g,
    ref: A,
    onResize: ye,
    onMouseDown: U
  }))));
}), $b = "1.6.1";
var Fb = `accept acceptCharset accessKey action allowFullScreen allowTransparency
    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
    charSet checked classID className colSpan cols content contentEditable contextMenu
    controls coords crossOrigin data dateTime default defer dir disabled download draggable
    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder
    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity
    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media
    mediaGroup method min minLength multiple muted name noValidate nonce open
    optimum pattern placeholder poster preload radioGroup readOnly rel required
    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected
    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style
    summary tabIndex target title type useMap value width wmode wrap`, kb = `onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`, Ab = "".concat(Fb, " ").concat(kb).split(/[\s\n]+/), Db = "aria-", Tb = "data-";
function Qs(e, t) {
  return e.indexOf(t) === 0;
}
function da(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r;
  t === !1 ? r = {
    aria: !0,
    data: !0,
    attr: !0
  } : t === !0 ? r = {
    aria: !0
  } : r = N({}, t);
  var n = {};
  return Object.keys(e).forEach(function(u) {
    // Aria
    (r.aria && (u === "role" || Qs(u, Db)) || // Data
    r.data && Qs(u, Tb) || // Attr
    r.attr && Ab.includes(u)) && (n[u] = e[u]);
  }), n;
}
const Rb = /* @__PURE__ */ O.createContext({}), Pb = {
  classNames: {},
  styles: {},
  className: "",
  style: {}
}, Si = (e) => {
  const t = O.useContext(Rb);
  return O.useMemo(() => ({
    ...Pb,
    ...t[e]
  }), [t[e]]);
};
function Or() {
  const {
    getPrefixCls: e,
    direction: t,
    csp: r,
    iconPrefixCls: n,
    theme: u
  } = O.useContext(qf.ConfigContext);
  return {
    theme: u,
    getPrefixCls: e,
    direction: t,
    csp: r,
    iconPrefixCls: n
  };
}
process.env.NODE_ENV;
const Ob = _u(Ga.defaultAlgorithm), Mb = {
  screenXS: !0,
  screenXSMin: !0,
  screenXSMax: !0,
  screenSM: !0,
  screenSMMin: !0,
  screenSMMax: !0,
  screenMD: !0,
  screenMDMin: !0,
  screenMDMax: !0,
  screenLG: !0,
  screenLGMin: !0,
  screenLGMax: !0,
  screenXL: !0,
  screenXLMin: !0,
  screenXLMax: !0,
  screenXXL: !0,
  screenXXLMin: !0
}, Wd = (e, t, r) => {
  const n = r.getDerivativeToken(e), {
    override: u,
    ...a
  } = t;
  let o = {
    ...n,
    override: u
  };
  return o = gi(o), a && Object.entries(a).forEach(([i, s]) => {
    const {
      theme: c,
      ...l
    } = s;
    let d = l;
    c && (d = Wd({
      ...o,
      ...l
    }, {
      override: l
    }, c)), o[i] = d;
  }), o;
};
function Ib() {
  const {
    token: e,
    hashed: t,
    theme: r = Ob,
    override: n,
    cssVar: u
  } = O.useContext(Ga._internalContext), [a, o, i] = Il(r, [Ga.defaultSeed, e], {
    salt: `${$b}-${t || ""}`,
    override: n,
    getComputedToken: Wd,
    cssVar: u && {
      prefix: u.prefix,
      key: u.key,
      unitless: vi,
      ignore: od,
      preserve: Mb
    }
  });
  return [r, i, t ? o : "", a, u];
}
const {
  genStyleHooks: wi
} = rd({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: t
    } = Or();
    return {
      iconPrefixCls: t,
      rootPrefixCls: e()
    };
  },
  useToken: () => {
    const [e, t, r, n, u] = Ib();
    return {
      theme: e,
      realToken: t,
      hashId: r,
      token: n,
      cssVar: u
    };
  },
  useCSP: () => {
    const {
      csp: e
    } = Or();
    return e ?? {};
  },
  layer: {
    name: "antdx",
    dependencies: ["antd"]
  }
});
function Nb(e, t) {
  return Go(e, () => {
    const r = t(), {
      nativeElement: n
    } = r;
    return new Proxy(n, {
      get(u, a) {
        return r[a] ? r[a] : Reflect.get(u, a);
      }
    });
  });
}
const Ud = /* @__PURE__ */ _.createContext({}), ec = () => ({
  height: 0
}), tc = (e) => ({
  height: e.scrollHeight
});
function jb(e) {
  const {
    title: t,
    onOpenChange: r,
    open: n,
    children: u,
    className: a,
    style: o,
    classNames: i = {},
    styles: s = {},
    closable: c,
    forceRender: l
  } = e, {
    prefixCls: d
  } = _.useContext(Ud), f = `${d}-header`;
  return /* @__PURE__ */ _.createElement(Rd, {
    motionEnter: !0,
    motionLeave: !0,
    motionName: `${f}-motion`,
    leavedClassName: `${f}-motion-hidden`,
    onEnterStart: ec,
    onEnterActive: tc,
    onLeaveStart: tc,
    onLeaveActive: ec,
    visible: n,
    forceRender: l
  }, ({
    className: v,
    style: h
  }) => /* @__PURE__ */ _.createElement("div", {
    className: ee(f, v, a),
    style: {
      ...h,
      ...o
    }
  }, (c !== !1 || t) && /* @__PURE__ */ _.createElement("div", {
    className: (
      // We follow antd naming standard here.
      // So the header part is use `-header` suffix.
      // Though its little bit weird for double `-header`.
      ee(`${f}-header`, i.header)
    ),
    style: {
      ...s.header
    }
  }, /* @__PURE__ */ _.createElement("div", {
    className: `${f}-title`
  }, t), c !== !1 && /* @__PURE__ */ _.createElement("div", {
    className: `${f}-close`
  }, /* @__PURE__ */ _.createElement(kc, {
    type: "text",
    icon: /* @__PURE__ */ _.createElement(jf, null),
    size: "small",
    onClick: () => {
      r == null || r(!n);
    }
  }))), u && /* @__PURE__ */ _.createElement("div", {
    className: ee(`${f}-content`, i.content),
    style: {
      ...s.content
    }
  }, u)));
}
const fa = /* @__PURE__ */ _.createContext(null);
function Lb(e, t) {
  const {
    className: r,
    action: n,
    onClick: u,
    ...a
  } = e, o = _.useContext(fa), {
    prefixCls: i,
    disabled: s
  } = o, c = a.disabled ?? s ?? o[`${n}Disabled`];
  return /* @__PURE__ */ _.createElement(kc, De({
    type: "text"
  }, a, {
    ref: t,
    onClick: (l) => {
      var d;
      c || ((d = o[n]) == null || d.call(o), u == null || u(l));
    },
    className: ee(i, r, {
      [`${i}-disabled`]: c
    })
  }));
}
const ha = /* @__PURE__ */ _.forwardRef(Lb);
function zb(e, t) {
  return /* @__PURE__ */ _.createElement(ha, De({
    icon: /* @__PURE__ */ _.createElement(Lf, null)
  }, e, {
    action: "onClear",
    ref: t
  }));
}
const Bb = /* @__PURE__ */ _.forwardRef(zb), Vb = /* @__PURE__ */ Nf((e) => {
  const {
    className: t
  } = e;
  return /* @__PURE__ */ O.createElement("svg", {
    color: "currentColor",
    viewBox: "0 0 1000 1000",
    xmlns: "http://www.w3.org/2000/svg",
    className: t
  }, /* @__PURE__ */ O.createElement("title", null, "Stop Loading"), /* @__PURE__ */ O.createElement("rect", {
    fill: "currentColor",
    height: "250",
    rx: "24",
    ry: "24",
    width: "250",
    x: "375",
    y: "375"
  }), /* @__PURE__ */ O.createElement("circle", {
    cx: "500",
    cy: "500",
    fill: "none",
    r: "450",
    stroke: "currentColor",
    strokeWidth: "100",
    opacity: "0.45"
  }), /* @__PURE__ */ O.createElement("circle", {
    cx: "500",
    cy: "500",
    fill: "none",
    r: "450",
    stroke: "currentColor",
    strokeWidth: "100",
    strokeDasharray: "600 9999999"
  }, /* @__PURE__ */ O.createElement("animateTransform", {
    attributeName: "transform",
    dur: "1s",
    from: "0 500 500",
    repeatCount: "indefinite",
    to: "360 500 500",
    type: "rotate"
  })));
});
function Hb(e, t) {
  const {
    prefixCls: r
  } = _.useContext(fa), {
    className: n
  } = e;
  return /* @__PURE__ */ _.createElement(ha, De({
    icon: /* @__PURE__ */ _.createElement(Vb, {
      className: `${r}-loading-icon`
    }),
    color: "primary",
    variant: "text",
    shape: "circle"
  }, e, {
    className: ee(n, `${r}-loading-button`),
    action: "onCancel",
    ref: t
  }));
}
const Yd = /* @__PURE__ */ _.forwardRef(Hb);
function qb(e, t) {
  return /* @__PURE__ */ _.createElement(ha, De({
    icon: /* @__PURE__ */ _.createElement(zf, null),
    type: "primary",
    shape: "circle"
  }, e, {
    action: "onSend",
    ref: t
  }));
}
const Gd = /* @__PURE__ */ _.forwardRef(qb), Qr = 1e3, en = 4, mu = 140, rc = mu / 2, nu = 250, nc = 500, uu = 0.8;
function Wb({
  className: e
}) {
  return /* @__PURE__ */ O.createElement("svg", {
    color: "currentColor",
    viewBox: `0 0 ${Qr} ${Qr}`,
    xmlns: "http://www.w3.org/2000/svg",
    className: e
  }, /* @__PURE__ */ O.createElement("title", null, "Speech Recording"), Array.from({
    length: en
  }).map((t, r) => {
    const n = (Qr - mu * en) / (en - 1), u = r * (n + mu), a = Qr / 2 - nu / 2, o = Qr / 2 - nc / 2;
    return /* @__PURE__ */ O.createElement("rect", {
      fill: "currentColor",
      rx: rc,
      ry: rc,
      height: nu,
      width: mu,
      x: u,
      y: a,
      key: r
    }, /* @__PURE__ */ O.createElement("animate", {
      attributeName: "height",
      values: `${nu}; ${nc}; ${nu}`,
      keyTimes: "0; 0.5; 1",
      dur: `${uu}s`,
      begin: `${uu / en * r}s`,
      repeatCount: "indefinite"
    }), /* @__PURE__ */ O.createElement("animate", {
      attributeName: "y",
      values: `${a}; ${o}; ${a}`,
      keyTimes: "0; 0.5; 1",
      dur: `${uu}s`,
      begin: `${uu / en * r}s`,
      repeatCount: "indefinite"
    }));
  }));
}
function Ub(e, t) {
  const {
    speechRecording: r,
    onSpeechDisabled: n,
    prefixCls: u
  } = _.useContext(fa);
  let a = null;
  return r ? a = /* @__PURE__ */ _.createElement(Wb, {
    className: `${u}-recording-icon`
  }) : n ? a = /* @__PURE__ */ _.createElement(Bf, null) : a = /* @__PURE__ */ _.createElement(Vf, null), /* @__PURE__ */ _.createElement(ha, De({
    icon: a,
    color: "primary",
    variant: "text"
  }, e, {
    action: "onSpeech",
    ref: t
  }));
}
const Kd = /* @__PURE__ */ _.forwardRef(Ub), Yb = (e) => {
  const {
    componentCls: t,
    calc: r
  } = e, n = `${t}-header`;
  return {
    [t]: {
      [n]: {
        borderBottomWidth: e.lineWidth,
        borderBottomStyle: "solid",
        borderBottomColor: e.colorBorder,
        // ======================== Header ========================
        "&-header": {
          background: e.colorFillAlter,
          fontSize: e.fontSize,
          lineHeight: e.lineHeight,
          paddingBlock: r(e.paddingSM).sub(e.lineWidthBold).equal(),
          paddingInlineStart: e.padding,
          paddingInlineEnd: e.paddingXS,
          display: "flex",
          borderRadius: {
            _skip_check_: !0,
            value: r(e.borderRadius).mul(2).equal()
          },
          borderEndStartRadius: 0,
          borderEndEndRadius: 0,
          [`${n}-title`]: {
            flex: "auto"
          }
        },
        // ======================= Content ========================
        "&-content": {
          padding: e.padding
        },
        // ======================== Motion ========================
        "&-motion": {
          transition: ["height", "border"].map((u) => `${u} ${e.motionDurationSlow}`).join(","),
          overflow: "hidden",
          "&-enter-start, &-leave-active": {
            borderBottomColor: "transparent"
          },
          "&-hidden": {
            display: "none"
          }
        }
      }
    }
  };
}, Gb = (e) => {
  const {
    componentCls: t,
    padding: r,
    paddingSM: n,
    paddingXS: u,
    paddingXXS: a,
    lineWidth: o,
    lineWidthBold: i,
    calc: s
  } = e;
  return {
    [t]: {
      position: "relative",
      width: "100%",
      boxSizing: "border-box",
      boxShadow: `${e.boxShadowTertiary}`,
      transition: `background ${e.motionDurationSlow}`,
      // Border
      borderRadius: {
        _skip_check_: !0,
        value: s(e.borderRadius).mul(2).equal()
      },
      borderColor: e.colorBorder,
      borderWidth: 0,
      borderStyle: "solid",
      // Border
      "&:after": {
        content: '""',
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        transition: `border-color ${e.motionDurationSlow}`,
        borderRadius: {
          _skip_check_: !0,
          value: "inherit"
        },
        borderStyle: "inherit",
        borderColor: "inherit",
        borderWidth: o
      },
      // Focus
      "&:focus-within": {
        boxShadow: `${e.boxShadowSecondary}`,
        borderColor: e.colorPrimary,
        "&:after": {
          borderWidth: i
        }
      },
      "&-disabled": {
        background: e.colorBgContainerDisabled
      },
      // ============================== RTL ==============================
      [`&${t}-rtl`]: {
        direction: "rtl"
      },
      // ============================ Content ============================
      [`${t}-content`]: {
        display: "flex",
        gap: u,
        width: "100%",
        paddingBlock: n,
        paddingInlineStart: r,
        paddingInlineEnd: n,
        boxSizing: "border-box",
        alignItems: "flex-end"
      },
      // ============================ Prefix =============================
      [`${t}-prefix`]: {
        flex: "none"
      },
      // ============================= Input =============================
      [`${t}-input`]: {
        padding: 0,
        borderRadius: 0,
        flex: "auto",
        alignSelf: "center",
        minHeight: "auto"
      },
      // ============================ Actions ============================
      [`${t}-actions-list`]: {
        flex: "none",
        display: "flex",
        "&-presets": {
          gap: e.paddingXS
        }
      },
      [`${t}-actions-btn`]: {
        "&-disabled": {
          opacity: 0.45
        },
        "&-loading-button": {
          padding: 0,
          border: 0
        },
        "&-loading-icon": {
          height: e.controlHeight,
          width: e.controlHeight,
          verticalAlign: "top"
        },
        "&-recording-icon": {
          height: "1.2em",
          width: "1.2em",
          verticalAlign: "top"
        }
      },
      // ============================ Footer =============================
      [`${t}-footer`]: {
        paddingInlineStart: r,
        paddingInlineEnd: n,
        paddingBlockEnd: n,
        paddingBlockStart: a,
        boxSizing: "border-box"
      }
    }
  };
}, Kb = () => ({}), Xb = wi("Sender", (e) => {
  const {
    paddingXS: t,
    calc: r
  } = e, n = It(e, {
    SenderContentMaxWidth: `calc(100% - ${Se(r(t).add(32).equal())})`
  });
  return [Gb(n), Yb(n)];
}, Kb);
let Su;
!Su && typeof window < "u" && (Su = window.SpeechRecognition || window.webkitSpeechRecognition);
function Zb(e, t) {
  const r = Vt(e), [n, u, a] = O.useMemo(() => typeof t == "object" ? [t.recording, t.onRecordingChange, typeof t.recording == "boolean"] : [void 0, void 0, !1], [t]), [o, i] = O.useState(null);
  O.useEffect(() => {
    if (typeof navigator < "u" && "permissions" in navigator) {
      let g = null;
      return navigator.permissions.query({
        name: "microphone"
      }).then((p) => {
        i(p.state), p.onchange = function() {
          i(this.state);
        }, g = p;
      }), () => {
        g && (g.onchange = null);
      };
    }
  }, []);
  const s = Su && o !== "denied", c = O.useRef(null), [l, d] = Nr(!1, {
    value: n
  }), f = O.useRef(!1), v = () => {
    if (s && !c.current) {
      const g = new Su();
      g.onstart = () => {
        d(!0);
      }, g.onend = () => {
        d(!1);
      }, g.onresult = (p) => {
        var C, m, y;
        if (!f.current) {
          const E = (y = (m = (C = p.results) == null ? void 0 : C[0]) == null ? void 0 : m[0]) == null ? void 0 : y.transcript;
          r(E);
        }
        f.current = !1;
      }, c.current = g;
    }
  }, h = Vt((g) => {
    g && !l || (f.current = g, a ? u == null || u(!l) : (v(), c.current && (l ? (c.current.stop(), u == null || u(!1)) : (c.current.start(), u == null || u(!0)))));
  });
  return [s, h, l];
}
function Jb(e, t, r) {
  return St(e, t) || r;
}
const uc = {
  SendButton: Gd,
  ClearButton: Bb,
  LoadingButton: Yd,
  SpeechButton: Kd
}, Qb = /* @__PURE__ */ O.forwardRef((e, t) => {
  const {
    prefixCls: r,
    styles: n = {},
    classNames: u = {},
    className: a,
    rootClassName: o,
    style: i,
    defaultValue: s,
    value: c,
    readOnly: l,
    submitType: d = "enter",
    onSubmit: f,
    loading: v,
    components: h,
    onCancel: g,
    onChange: p,
    actions: C,
    onKeyPress: m,
    onKeyDown: y,
    disabled: E,
    allowSpeech: b,
    prefix: w,
    footer: S,
    header: R,
    onPaste: k,
    onPasteFile: T,
    autoSize: I = {
      maxRows: 8
    },
    ...j
  } = e, {
    direction: P,
    getPrefixCls: M
  } = Or(), L = M("sender", r), $ = O.useRef(null), A = O.useRef(null);
  Nb(t, () => {
    var he, xe;
    return {
      nativeElement: $.current,
      focus: (he = A.current) == null ? void 0 : he.focus,
      blur: (xe = A.current) == null ? void 0 : xe.blur
    };
  });
  const D = Si("sender"), B = `${L}-input`, [V, H, q] = Xb(L), Y = ee(L, D.className, a, o, H, q, {
    [`${L}-rtl`]: P === "rtl",
    [`${L}-disabled`]: E
  }), G = `${L}-actions-btn`, K = `${L}-actions-list`, [X, te] = Nr(s || "", {
    value: c
  }), ue = (he, xe) => {
    te(he), p && p(he, xe);
  }, [pe, le, ke] = Zb((he) => {
    ue(`${X} ${he}`);
  }, b), Ae = Jb(h, ["input"], Wf.TextArea), U = {
    ...da(j, {
      attr: !0,
      aria: !0,
      data: !0
    }),
    ref: A
  }, ye = () => {
    X && f && !v && f(X);
  }, J = () => {
    ue("");
  }, ie = O.useRef(!1), Pe = () => {
    ie.current = !0;
  }, fe = () => {
    ie.current = !1;
  }, Be = (he) => {
    const xe = he.key === "Enter" && !ie.current;
    switch (d) {
      case "enter":
        xe && !he.shiftKey && (he.preventDefault(), ye());
        break;
      case "shiftEnter":
        xe && he.shiftKey && (he.preventDefault(), ye());
        break;
    }
    m == null || m(he);
  }, Re = (he) => {
    var Ue;
    const xe = (Ue = he.clipboardData) == null ? void 0 : Ue.files;
    xe != null && xe.length && T && (T(xe[0], xe), he.preventDefault()), k == null || k(he);
  }, we = (he) => {
    var xe, Ue;
    he.target !== ((xe = $.current) == null ? void 0 : xe.querySelector(`.${B}`)) && he.preventDefault(), (Ue = A.current) == null || Ue.focus();
  };
  let ae = /* @__PURE__ */ O.createElement(Uf, {
    className: `${K}-presets`
  }, b && /* @__PURE__ */ O.createElement(Kd, null), v ? /* @__PURE__ */ O.createElement(Yd, null) : /* @__PURE__ */ O.createElement(Gd, null));
  typeof C == "function" ? ae = C(ae, {
    components: uc
  }) : (C || C === !1) && (ae = C);
  const oe = {
    prefixCls: G,
    onSend: ye,
    onSendDisabled: !X,
    onClear: J,
    onClearDisabled: !X,
    onCancel: g,
    onCancelDisabled: !v,
    onSpeech: () => le(!1),
    onSpeechDisabled: !pe,
    speechRecording: ke,
    disabled: E
  }, ge = typeof S == "function" ? S({
    components: uc
  }) : S || null;
  return V(/* @__PURE__ */ O.createElement("div", {
    ref: $,
    className: Y,
    style: {
      ...D.style,
      ...i
    }
  }, R && /* @__PURE__ */ O.createElement(Ud.Provider, {
    value: {
      prefixCls: L
    }
  }, R), /* @__PURE__ */ O.createElement(fa.Provider, {
    value: oe
  }, /* @__PURE__ */ O.createElement("div", {
    className: ee(`${L}-content`, D.classNames.content, u.content),
    style: {
      ...D.styles.content,
      ...n.content
    },
    onMouseDown: we
  }, w && /* @__PURE__ */ O.createElement("div", {
    className: ee(`${L}-prefix`, D.classNames.prefix, u.prefix),
    style: {
      ...D.styles.prefix,
      ...n.prefix
    }
  }, w), /* @__PURE__ */ O.createElement(Ae, De({}, U, {
    disabled: E,
    style: {
      ...D.styles.input,
      ...n.input
    },
    className: ee(B, D.classNames.input, u.input),
    autoSize: I,
    value: X,
    onChange: (he) => {
      ue(he.target.value, he), le(!0);
    },
    onPressEnter: Be,
    onCompositionStart: Pe,
    onCompositionEnd: fe,
    onKeyDown: y,
    onPaste: Re,
    variant: "borderless",
    readOnly: l
  })), ae && /* @__PURE__ */ O.createElement("div", {
    className: ee(K, D.classNames.actions, u.actions),
    style: {
      ...D.styles.actions,
      ...n.actions
    }
  }, ae)), ge && /* @__PURE__ */ O.createElement("div", {
    className: ee(`${L}-footer`, D.classNames.footer, u.footer),
    style: {
      ...D.styles.footer,
      ...n.footer
    }
  }, ge))));
}), Xd = Qb;
process.env.NODE_ENV !== "production" && (Xd.displayName = "Sender");
Xd.Header = jb;
function au(e) {
  return typeof e == "string";
}
function e2(e, t) {
  let r = 0;
  const n = Math.min(e.length, t.length);
  for (; r < n && e[r] === t[r]; )
    r++;
  return r;
}
const t2 = (e, t, r, n) => {
  const u = _.useRef(""), [a, o] = _.useState(1), i = t && au(e);
  return on(() => {
    if (!i && au(e))
      o(e.length);
    else if (au(e) && au(u.current) && e.indexOf(u.current) !== 0) {
      if (!e || !u.current) {
        o(1);
        return;
      }
      const c = e2(e, u.current);
      o(c === 0 ? 1 : c + 1);
    }
    u.current = e;
  }, [e]), _.useEffect(() => {
    if (i && a < e.length) {
      const c = setTimeout(() => {
        o((l) => l + r);
      }, n);
      return () => {
        clearTimeout(c);
      };
    }
  }, [a, t, e]), [i ? e.slice(0, a) : e, i && a < e.length];
};
function r2(e) {
  return _.useMemo(() => {
    if (!e)
      return [!1, 0, 0, null];
    let t = {
      step: 1,
      interval: 50,
      // set default suffix is empty
      suffix: null
    };
    return typeof e == "object" && (t = {
      ...t,
      ...e
    }), [!0, t.step, t.interval, t.suffix];
  }, [e]);
}
const n2 = ({
  prefixCls: e
}) => /* @__PURE__ */ O.createElement("span", {
  className: `${e}-dot`
}, /* @__PURE__ */ O.createElement("i", {
  className: `${e}-dot-item`,
  key: "item-1"
}), /* @__PURE__ */ O.createElement("i", {
  className: `${e}-dot-item`,
  key: "item-2"
}), /* @__PURE__ */ O.createElement("i", {
  className: `${e}-dot-item`,
  key: "item-3"
})), u2 = (e) => {
  const {
    componentCls: t,
    paddingSM: r,
    padding: n
  } = e;
  return {
    [t]: {
      [`${t}-content`]: {
        // Shared: filled, outlined, shadow
        "&-filled,&-outlined,&-shadow": {
          padding: `${Se(r)} ${Se(n)}`,
          borderRadius: e.borderRadiusLG
        },
        // Filled:
        "&-filled": {
          backgroundColor: e.colorFillContent
        },
        // Outlined:
        "&-outlined": {
          border: `1px solid ${e.colorBorderSecondary}`
        },
        // Shadow:
        "&-shadow": {
          boxShadow: e.boxShadowTertiary
        }
      }
    }
  };
}, a2 = (e) => {
  const {
    componentCls: t,
    fontSize: r,
    lineHeight: n,
    paddingSM: u,
    padding: a,
    calc: o
  } = e, i = o(r).mul(n).div(2).add(u).equal(), s = `${t}-content`;
  return {
    [t]: {
      [s]: {
        // round:
        "&-round": {
          borderRadius: {
            _skip_check_: !0,
            value: i
          },
          paddingInline: o(a).mul(1.25).equal()
        }
      },
      // corner:
      [`&-start ${s}-corner`]: {
        borderStartStartRadius: e.borderRadiusXS
      },
      [`&-end ${s}-corner`]: {
        borderStartEndRadius: e.borderRadiusXS
      }
    }
  };
}, o2 = (e) => {
  const {
    componentCls: t,
    padding: r
  } = e;
  return {
    [`${t}-list`]: {
      display: "flex",
      flexDirection: "column",
      gap: r,
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: 8,
        backgroundColor: "transparent"
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: e.colorTextTertiary,
        borderRadius: e.borderRadiusSM
      },
      // For Firefox
      "&": {
        scrollbarWidth: "thin",
        scrollbarColor: `${e.colorTextTertiary} transparent`
      }
    }
  };
}, i2 = new Zl("loadingMove", {
  "0%": {
    transform: "translateY(0)"
  },
  "10%": {
    transform: "translateY(4px)"
  },
  "20%": {
    transform: "translateY(0)"
  },
  "30%": {
    transform: "translateY(-4px)"
  },
  "40%": {
    transform: "translateY(0)"
  }
}), s2 = new Zl("cursorBlink", {
  "0%": {
    opacity: 1
  },
  "50%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
}), c2 = (e) => {
  const {
    componentCls: t,
    fontSize: r,
    lineHeight: n,
    paddingSM: u,
    colorText: a,
    calc: o
  } = e;
  return {
    [t]: {
      display: "flex",
      columnGap: u,
      [`&${t}-end`]: {
        justifyContent: "end",
        flexDirection: "row-reverse",
        [`& ${t}-content-wrapper`]: {
          alignItems: "flex-end"
        }
      },
      [`&${t}-rtl`]: {
        direction: "rtl"
      },
      [`&${t}-typing ${t}-content:last-child::after`]: {
        content: '"|"',
        fontWeight: 900,
        userSelect: "none",
        opacity: 1,
        marginInlineStart: "0.1em",
        animationName: s2,
        animationDuration: "0.8s",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear"
      },
      // ============================ Avatar =============================
      [`& ${t}-avatar`]: {
        display: "inline-flex",
        justifyContent: "center",
        alignSelf: "flex-start"
      },
      // ======================== Header & Footer ========================
      [`& ${t}-header, & ${t}-footer`]: {
        fontSize: r,
        lineHeight: n,
        color: e.colorText
      },
      [`& ${t}-header`]: {
        marginBottom: e.paddingXXS
      },
      [`& ${t}-footer`]: {
        marginTop: u
      },
      // =========================== Content =============================
      [`& ${t}-content-wrapper`]: {
        flex: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: 0,
        maxWidth: "100%"
      },
      [`& ${t}-content`]: {
        position: "relative",
        boxSizing: "border-box",
        minWidth: 0,
        maxWidth: "100%",
        color: a,
        fontSize: e.fontSize,
        lineHeight: e.lineHeight,
        minHeight: o(u).mul(2).add(o(n).mul(r)).equal(),
        wordBreak: "break-word",
        [`& ${t}-dot`]: {
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          columnGap: e.marginXS,
          padding: `0 ${Se(e.paddingXXS)}`,
          "&-item": {
            backgroundColor: e.colorPrimary,
            borderRadius: "100%",
            width: 4,
            height: 4,
            animationName: i2,
            animationDuration: "2s",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
            "&:nth-child(1)": {
              animationDelay: "0s"
            },
            "&:nth-child(2)": {
              animationDelay: "0.2s"
            },
            "&:nth-child(3)": {
              animationDelay: "0.4s"
            }
          }
        }
      }
    }
  };
}, l2 = () => ({}), Zd = wi("Bubble", (e) => {
  const t = It(e, {});
  return [c2(t), o2(t), u2(t), a2(t)];
}, l2), Jd = /* @__PURE__ */ O.createContext({}), d2 = (e, t) => {
  const {
    prefixCls: r,
    className: n,
    rootClassName: u,
    style: a,
    classNames: o = {},
    styles: i = {},
    avatar: s,
    placement: c = "start",
    loading: l = !1,
    loadingRender: d,
    typing: f,
    content: v = "",
    messageRender: h,
    variant: g = "filled",
    shape: p,
    onTypingComplete: C,
    header: m,
    footer: y,
    _key: E,
    ...b
  } = e, {
    onUpdate: w
  } = O.useContext(Jd), S = O.useRef(null);
  O.useImperativeHandle(t, () => ({
    nativeElement: S.current
  }));
  const {
    direction: R,
    getPrefixCls: k
  } = Or(), T = k("bubble", r), I = Si("bubble"), [j, P, M, L] = r2(f), [$, A] = t2(v, j, P, M);
  O.useEffect(() => {
    w == null || w();
  }, [$]);
  const D = O.useRef(!1);
  O.useEffect(() => {
    !A && !l ? D.current || (D.current = !0, C == null || C()) : D.current = !1;
  }, [A, l]);
  const [B, V, H] = Zd(T), q = ee(T, u, I.className, n, V, H, `${T}-${c}`, {
    [`${T}-rtl`]: R === "rtl",
    [`${T}-typing`]: A && !l && !h && !L
  }), Y = O.useMemo(() => /* @__PURE__ */ O.isValidElement(s) ? s : /* @__PURE__ */ O.createElement(Yf, s), [s]), G = O.useMemo(() => h ? h($) : $, [$, h]), K = (ue) => typeof ue == "function" ? ue($, {
    key: E
  }) : ue;
  let X;
  l ? X = d ? d() : /* @__PURE__ */ O.createElement(n2, {
    prefixCls: T
  }) : X = /* @__PURE__ */ O.createElement(O.Fragment, null, G, A && L);
  let te = /* @__PURE__ */ O.createElement("div", {
    style: {
      ...I.styles.content,
      ...i.content
    },
    className: ee(`${T}-content`, `${T}-content-${g}`, p && `${T}-content-${p}`, I.classNames.content, o.content)
  }, X);
  return (m || y) && (te = /* @__PURE__ */ O.createElement("div", {
    className: `${T}-content-wrapper`
  }, m && /* @__PURE__ */ O.createElement("div", {
    className: ee(`${T}-header`, I.classNames.header, o.header),
    style: {
      ...I.styles.header,
      ...i.header
    }
  }, K(m)), te, y && /* @__PURE__ */ O.createElement("div", {
    className: ee(`${T}-footer`, I.classNames.footer, o.footer),
    style: {
      ...I.styles.footer,
      ...i.footer
    }
  }, K(y)))), B(/* @__PURE__ */ O.createElement("div", De({
    style: {
      ...I.style,
      ...a
    },
    className: q
  }, b, {
    ref: S
  }), s && /* @__PURE__ */ O.createElement("div", {
    style: {
      ...I.styles.avatar,
      ...i.avatar
    },
    className: ee(`${T}-avatar`, I.classNames.avatar, o.avatar)
  }, Y), te));
}, $i = /* @__PURE__ */ O.forwardRef(d2);
process.env.NODE_ENV !== "production" && ($i.displayName = "Bubble");
function f2(e, t) {
  const r = _.useCallback((n, u) => typeof t == "function" ? t(n, u) : t ? t[n.role] || {} : {}, [t]);
  return _.useMemo(() => (e || []).map((n, u) => {
    const a = n.key ?? `preset_${u}`;
    return {
      ...r(n, u),
      ...n,
      key: a
    };
  }), [e, r]);
}
const h2 = ({
  _key: e,
  ...t
}, r) => /* @__PURE__ */ _.createElement($i, De({}, t, {
  _key: e,
  ref: (n) => {
    var u;
    n ? r.current[e] = n : (u = r.current) == null || delete u[e];
  }
})), p2 = /* @__PURE__ */ _.memo(/* @__PURE__ */ _.forwardRef(h2)), m2 = 1, g2 = (e, t) => {
  const {
    prefixCls: r,
    rootClassName: n,
    className: u,
    items: a,
    autoScroll: o = !0,
    roles: i,
    onScroll: s,
    ...c
  } = e, l = da(c, {
    attr: !0,
    aria: !0
  }), d = _.useRef(null), f = _.useRef({}), {
    getPrefixCls: v
  } = Or(), h = v("bubble", r), g = `${h}-list`, [p, C, m] = Zd(h), [y, E] = _.useState(!1);
  _.useEffect(() => (E(!0), () => {
    E(!1);
  }), []);
  const b = f2(a, i), [w, S] = _.useState(!0), [R, k] = _.useState(0), T = (P) => {
    const M = P.target;
    S(M.scrollHeight - Math.abs(M.scrollTop) - M.clientHeight <= m2), s == null || s(P);
  };
  _.useEffect(() => {
    o && d.current && w && d.current.scrollTo({
      top: d.current.scrollHeight
    });
  }, [R]), _.useEffect(() => {
    var P;
    if (o) {
      const M = (P = b[b.length - 2]) == null ? void 0 : P.key, L = f.current[M];
      if (L) {
        const {
          nativeElement: $
        } = L, {
          top: A,
          bottom: D
        } = $.getBoundingClientRect(), {
          top: B,
          bottom: V
        } = d.current.getBoundingClientRect();
        A < V && D > B && (k((q) => q + 1), S(!0));
      }
    }
  }, [b.length]), _.useImperativeHandle(t, () => ({
    nativeElement: d.current,
    scrollTo: ({
      key: P,
      offset: M,
      behavior: L = "smooth",
      block: $
    }) => {
      if (typeof M == "number")
        d.current.scrollTo({
          top: M,
          behavior: L
        });
      else if (P !== void 0) {
        const A = f.current[P];
        if (A) {
          const D = b.findIndex((B) => B.key === P);
          S(D === b.length - 1), A.nativeElement.scrollIntoView({
            behavior: L,
            block: $
          });
        }
      }
    }
  }));
  const I = Vt(() => {
    o && k((P) => P + 1);
  }), j = _.useMemo(() => ({
    onUpdate: I
  }), []);
  return p(/* @__PURE__ */ _.createElement(Jd.Provider, {
    value: j
  }, /* @__PURE__ */ _.createElement("div", De({}, l, {
    className: ee(g, n, u, C, m, {
      [`${g}-reach-end`]: w
    }),
    ref: d,
    onScroll: T
  }), b.map(({
    key: P,
    ...M
  }) => /* @__PURE__ */ _.createElement(p2, De({}, M, {
    key: P,
    _key: P,
    ref: f,
    typing: y ? M.typing : !1
  }))))));
}, Qd = /* @__PURE__ */ _.forwardRef(g2);
process.env.NODE_ENV !== "production" && (Qd.displayName = "BubbleList");
$i.List = Qd;
const ef = /* @__PURE__ */ O.createContext(null), ac = ({
  children: e
}) => {
  const {
    prefixCls: t
  } = O.useContext(ef);
  return /* @__PURE__ */ O.createElement("div", {
    className: ee(`${t}-group-title`)
  }, e && /* @__PURE__ */ O.createElement(Ac.Text, null, e));
}, oc = (e) => {
  e.stopPropagation();
}, v2 = (e) => {
  const {
    prefixCls: t,
    info: r,
    className: n,
    direction: u,
    onClick: a,
    active: o,
    menu: i,
    ...s
  } = e, c = da(s, {
    aria: !0,
    data: !0,
    attr: !0
  }), {
    disabled: l
  } = r, d = ee(n, `${t}-item`, {
    [`${t}-item-active`]: o && !l
  }, {
    [`${t}-item-disabled`]: l
  }), f = () => {
    !l && a && a(r);
  }, {
    trigger: v,
    ...h
  } = i || {}, g = h == null ? void 0 : h.getPopupContainer, p = (C) => {
    const m = /* @__PURE__ */ O.createElement(Hf, {
      onClick: oc,
      className: `${t}-menu-icon`
    });
    return v ? typeof v == "function" ? v(C, {
      originNode: m
    }) : v : m;
  };
  return /* @__PURE__ */ O.createElement("li", De({
    title: typeof r.label == "object" ? void 0 : `${r.label}`
  }, c, {
    className: d,
    onClick: f
  }), r.icon && /* @__PURE__ */ O.createElement("div", {
    className: `${t}-icon`
  }, r.icon), /* @__PURE__ */ O.createElement(Ac.Text, {
    className: `${t}-label`
  }, r.label), !l && i && /* @__PURE__ */ O.createElement("div", {
    onClick: oc
  }, /* @__PURE__ */ O.createElement(Gf, {
    menu: h,
    placement: u === "rtl" ? "bottomLeft" : "bottomRight",
    trigger: ["click"],
    disabled: l,
    getPopupContainer: g
  }, p(r))));
}, La = "__ungrouped", b2 = (e, t = []) => {
  const [r, n, u] = O.useMemo(() => {
    if (!e)
      return [!1, void 0, void 0];
    let a = {
      sort: void 0,
      title: void 0
    };
    return typeof e == "object" && (a = {
      ...a,
      ...e
    }), [!0, a.sort, a.title];
  }, [e]);
  return O.useMemo(() => {
    if (!r)
      return [[{
        name: La,
        data: t,
        title: void 0
      }], r];
    const a = t.reduce((s, c) => {
      const l = c.group || La;
      return s[l] || (s[l] = []), s[l].push(c), s;
    }, {});
    return [(n ? Object.keys(a).sort(n) : Object.keys(a)).map((s) => ({
      name: s === La ? void 0 : s,
      title: u,
      data: a[s]
    })), r];
  }, [t, e]);
}, y2 = (e) => {
  const {
    componentCls: t
  } = e;
  return {
    [t]: {
      display: "flex",
      flexDirection: "column",
      gap: e.paddingXXS,
      overflowY: "auto",
      padding: e.paddingSM,
      margin: 0,
      listStyle: "none",
      "ul, ol": {
        margin: 0,
        padding: 0,
        listStyle: "none"
      },
      [`&${t}-rtl`]: {
        direction: "rtl"
      },
      // 会话列表
      [`& ${t}-list`]: {
        display: "flex",
        gap: e.paddingXXS,
        flexDirection: "column",
        [`& ${t}-item`]: {
          paddingInlineStart: e.paddingXL
        },
        [`& ${t}-label`]: {
          color: e.colorTextDescription,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      },
      // 会话列表项
      [`& ${t}-item`]: {
        display: "flex",
        height: e.controlHeightLG,
        minHeight: e.controlHeightLG,
        gap: e.paddingXS,
        padding: `0 ${Se(e.paddingXS)}`,
        alignItems: "center",
        borderRadius: e.borderRadiusLG,
        cursor: "pointer",
        transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
        // 悬浮样式
        "&:hover": {
          backgroundColor: e.colorBgTextHover
        },
        // 选中样式
        "&-active": {
          backgroundColor: e.colorBgTextHover,
          [`& ${t}-label, ${t}-menu-icon`]: {
            color: e.colorText
          }
        },
        // 禁用样式
        "&-disabled": {
          cursor: "not-allowed",
          [`& ${t}-label`]: {
            color: e.colorTextDisabled
          }
        },
        // 悬浮、选中时激活操作菜单
        "&:hover, &-active": {
          [`& ${t}-menu-icon`]: {
            opacity: 0.6
          }
        },
        [`${t}-menu-icon:hover`]: {
          opacity: 1
        }
      },
      // 会话名
      [`& ${t}-label`]: {
        flex: 1,
        color: e.colorText,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      },
      // 会话操作菜单
      [`& ${t}-menu-icon`]: {
        opacity: 0,
        fontSize: e.fontSizeXL
      },
      // 会话图标
      [`& ${t}-group-title`]: {
        display: "flex",
        alignItems: "center",
        height: e.controlHeightLG,
        minHeight: e.controlHeightLG,
        padding: `0 ${Se(e.paddingXS)}`
      }
    }
  };
}, x2 = () => ({}), _2 = wi("Conversations", (e) => {
  const t = It(e, {});
  return y2(t);
}, x2), C2 = (e) => {
  const {
    prefixCls: t,
    rootClassName: r,
    items: n,
    activeKey: u,
    defaultActiveKey: a,
    onActiveChange: o,
    menu: i,
    styles: s = {},
    classNames: c = {},
    groupable: l,
    className: d,
    style: f,
    ...v
  } = e, h = da(v, {
    attr: !0,
    aria: !0,
    data: !0
  }), [g, p] = Nr(a, {
    value: u
  }), [C, m] = b2(l, n), {
    getPrefixCls: y,
    direction: E
  } = Or(), b = y("conversations", t), w = Si("conversations"), [S, R, k] = _2(b), T = ee(b, w.className, d, r, R, k, {
    [`${b}-rtl`]: E === "rtl"
  }), I = (j) => {
    p(j.key), o && o(j.key);
  };
  return S(/* @__PURE__ */ O.createElement("ul", De({}, h, {
    style: {
      ...w.style,
      ...f
    },
    className: T
  }), C.map((j, P) => {
    var L;
    const M = j.data.map(($, A) => {
      const {
        label: D,
        disabled: B,
        icon: V,
        ...H
      } = $;
      return /* @__PURE__ */ O.createElement(v2, De({}, H, {
        key: $.key || `key-${A}`,
        info: $,
        prefixCls: b,
        direction: E,
        className: ee(c.item, w.classNames.item, $.className),
        style: {
          ...w.styles.item,
          ...s.item,
          ...$.style
        },
        menu: typeof i == "function" ? i($) : i,
        active: g === $.key,
        onClick: I
      }));
    });
    return m ? /* @__PURE__ */ O.createElement("li", {
      key: j.name || `key-${P}`
    }, /* @__PURE__ */ O.createElement(ef.Provider, {
      value: {
        prefixCls: b
      }
    }, ((L = j.title) == null ? void 0 : L.call(j, j.name, {
      components: {
        GroupTitle: ac
      }
    })) || /* @__PURE__ */ O.createElement(ac, {
      key: j.name
    }, j.name)), /* @__PURE__ */ O.createElement("ul", {
      className: `${b}-list`
    }, M)) : M;
  })));
};
process.env.NODE_ENV !== "production" && (C2.displayName = "Conversations");
function E2(e) {
  const [, t] = O.useState(0), r = O.useRef(typeof e == "function" ? e() : e), n = O.useCallback((a) => {
    r.current = typeof a == "function" ? a(r.current) : a, t((o) => o + 1);
  }, []), u = O.useCallback(() => r.current, []);
  return [r.current, n, u];
}
function S2(e) {
  return Array.isArray(e) ? e : [e];
}
function F3(e) {
  const {
    defaultMessages: t,
    agent: r,
    requestFallback: n,
    requestPlaceholder: u,
    parser: a,
    transformMessage: o,
    transformStream: i,
    resolveAbortController: s
  } = e, c = O.useRef(0), [l, d, f] = E2(() => (t || []).map((y, E) => ({
    id: `default_${E}`,
    status: "local",
    ...y
  }))), v = (y, E) => {
    const b = {
      id: `msg_${c.current}`,
      message: y,
      status: E
    };
    return c.current += 1, b;
  }, h = O.useMemo(() => {
    const y = [];
    return l.forEach((E) => {
      const b = a ? a(E.message) : E.message, w = S2(b);
      w.forEach((S, R) => {
        let k = E.id;
        w.length > 1 && (k = `${k}_${R}`), y.push({
          id: k,
          message: S,
          status: E.status
        });
      });
    }), y;
  }, [l]), g = (y) => y.filter((E) => E.status !== "loading" && E.status !== "error").map((E) => E.message), p = () => g(f()), C = (y) => {
    const {
      chunk: E,
      chunks: b,
      originMessage: w
    } = y;
    if (typeof o == "function")
      return o(y);
    if (E)
      return E;
    if (Array.isArray(b)) {
      const S = (b == null ? void 0 : b.length) > 0 ? b == null ? void 0 : b[(b == null ? void 0 : b.length) - 1] : void 0;
      return w || S;
    }
    return b;
  };
  return {
    onRequest: Vt((y) => {
      if (!r) throw new Error("The agent parameter is required when using the onRequest method in an agent generated by useXAgent.");
      let E = null, b, w = {};
      if (y && typeof y == "object" && "message" in y) {
        const {
          message: k,
          ...T
        } = y;
        b = k, w = T;
      } else
        b = y;
      d((k) => {
        let T = [...k, v(b, "local")], I = "";
        u && (typeof u == "function" ? I = u(b, {
          messages: g(T)
        }) : I = u);
        const j = v(I, "loading");
        return E = j.id, T = [...T, j], T;
      });
      let S = null;
      const R = (k, T, I) => {
        let j = f().find((P) => P.id === S);
        if (j)
          d((P) => P.map((M) => {
            if (M.id === S) {
              const L = C({
                originMessage: M.message,
                chunk: T,
                chunks: I,
                status: k
              });
              return {
                ...M,
                message: L,
                status: k
              };
            }
            return M;
          }));
        else {
          const P = C({
            chunk: T,
            status: k,
            chunks: I
          });
          j = v(P, k), d((M) => [...M.filter(($) => $.id !== E), j]), S = j.id;
        }
        return j;
      };
      r.request({
        message: b,
        messages: p(),
        ...w
      }, {
        onUpdate: (k) => {
          R("updating", k, []);
        },
        onSuccess: (k) => {
          R("success", void 0, k);
        },
        onError: async (k) => {
          if (n) {
            let T;
            typeof n == "function" ? T = await n(b, {
              error: k,
              messages: p()
            }) : T = n, d((I) => [...I.filter((j) => j.id !== E && j.id !== S), v(T, "error")]);
          } else
            d((T) => T.filter((I) => I.id !== E && I.id !== S));
        },
        onStream: (k) => {
          s == null || s(k);
        }
      }, i);
    }),
    messages: l,
    parsedMessages: h,
    setMessages: d
  };
}
const w2 = `

`, $2 = `
`, ic = ":", Ho = (e) => (e ?? "").trim() !== "";
function F2() {
  let e = "";
  return new TransformStream({
    transform(t, r) {
      e += t;
      const n = e.split(w2);
      n.slice(0, -1).forEach((u) => {
        Ho(u) && r.enqueue(u);
      }), e = n[n.length - 1];
    },
    flush(t) {
      Ho(e) && t.enqueue(e);
    }
  });
}
function k2() {
  return new TransformStream({
    transform(e, t) {
      const n = e.split($2).reduce((u, a) => {
        const o = a.indexOf(ic);
        if (o === -1)
          throw new Error(`The key-value separator "${ic}" is not found in the sse line chunk!`);
        const i = a.slice(0, o);
        if (!Ho(i)) return u;
        const s = a.slice(o + 1);
        return {
          ...u,
          [i]: s
        };
      }, {});
      Object.keys(n).length !== 0 && t.enqueue(n);
    }
  });
}
function sc(e) {
  const {
    readableStream: t,
    transformStream: r
  } = e;
  if (!(t instanceof ReadableStream))
    throw new Error("The options.readableStream must be an instance of ReadableStream.");
  const n = new TextDecoderStream(), u = r ? (
    /**
     * Uint8Array binary -> string -> Output
     */
    t.pipeThrough(n).pipeThrough(r)
  ) : (
    /**
     * Uint8Array binary -> string -> SSE part string -> Default Output {@link SSEOutput}
     */
    t.pipeThrough(n).pipeThrough(F2()).pipeThrough(k2())
  );
  return u[Symbol.asyncIterator] = async function* () {
    const a = this.getReader();
    for (; ; ) {
      const {
        done: o,
        value: i
      } = await a.read();
      if (o) break;
      i && (yield i);
    }
  }, u;
}
const A2 = async (e, t = {}) => {
  const {
    fetch: r = globalThis.fetch,
    middlewares: n = {},
    ...u
  } = t;
  if (typeof r != "function")
    throw new Error("The options.fetch must be a typeof fetch function!");
  let a = [e, u];
  typeof n.onRequest == "function" && (a = await n.onRequest(...a));
  let o = await r(...a);
  if (typeof n.onResponse == "function") {
    const i = await n.onResponse(o);
    if (!(i instanceof Response))
      throw new Error("The options.onResponse must return a Response instance!");
    o = i;
  }
  if (!o.ok)
    throw new Error(`Fetch failed with status ${o.status}`);
  if (!o.body)
    throw new Error("The response body is empty.");
  return o;
};
class Fi {
  constructor(t) {
    vt(this, "baseURL");
    vt(this, "model");
    vt(this, "defaultHeaders");
    vt(this, "customOptions");
    vt(this, "create", async (t, r, n) => {
      var o, i;
      const u = new AbortController(), a = {
        method: "POST",
        body: JSON.stringify({
          model: this.model,
          ...t
        }),
        headers: this.defaultHeaders,
        signal: u.signal
      };
      (o = r == null ? void 0 : r.onStream) == null || o.call(r, u);
      try {
        const s = await A2(this.baseURL, {
          fetch: this.customOptions.fetch,
          ...a
        });
        if (n) {
          await this.customResponseHandler(s, r, n);
          return;
        }
        const c = s.headers.get("content-type") || "";
        switch (c.split(";")[0].trim()) {
          case "text/event-stream":
            await this.sseResponseHandler(s, r);
            break;
          case "application/json":
            await this.jsonResponseHandler(s, r);
            break;
          default:
            throw new Error(`The response content-type: ${c} is not support!`);
        }
      } catch (s) {
        const c = s instanceof Error ? s : new Error("Unknown error!");
        throw (i = r == null ? void 0 : r.onError) == null || i.call(r, c), c;
      }
    });
    vt(this, "customResponseHandler", async (t, r, n) => {
      var a, o;
      const u = [];
      for await (const i of sc({
        readableStream: t.body,
        transformStream: n
      }))
        u.push(i), (a = r == null ? void 0 : r.onUpdate) == null || a.call(r, i);
      (o = r == null ? void 0 : r.onSuccess) == null || o.call(r, u);
    });
    vt(this, "sseResponseHandler", async (t, r) => {
      var a, o;
      const n = [], u = sc({
        readableStream: t.body
      });
      for await (const i of u)
        n.push(i), (a = r == null ? void 0 : r.onUpdate) == null || a.call(r, i);
      (o = r == null ? void 0 : r.onSuccess) == null || o.call(r, n);
    });
    vt(this, "jsonResponseHandler", async (t, r) => {
      var u, a;
      const n = await t.json();
      (u = r == null ? void 0 : r.onUpdate) == null || u.call(r, n), (a = r == null ? void 0 : r.onSuccess) == null || a.call(r, [n]);
    });
    const {
      baseURL: r,
      model: n,
      dangerouslyApiKey: u,
      ...a
    } = t;
    this.baseURL = t.baseURL, this.model = t.model, this.defaultHeaders = {
      "Content-Type": "application/json",
      ...t.dangerouslyApiKey && {
        Authorization: t.dangerouslyApiKey
      }
    }, this.customOptions = a;
  }
  static init(t) {
    if (!t.baseURL || typeof t.baseURL != "string") throw new Error("The baseURL is not valid!");
    return new Fi(t);
  }
}
const D2 = Fi.init;
let cc = 0;
class T2 {
  constructor(t) {
    vt(this, "config");
    vt(this, "requestingMap", {});
    vt(this, "request", (t, r, n) => {
      const {
        request: u
      } = this.config, {
        onUpdate: a,
        onSuccess: o,
        onError: i,
        onStream: s
      } = r, c = cc;
      cc += 1, this.requestingMap[c] = !0, u == null || u(t, {
        onStream: (l) => {
          this.requestingMap[c] && (s == null || s(l));
        },
        // Status should be unique.
        // One get success or error should not get more message
        onUpdate: (l) => {
          this.requestingMap[c] && a(l);
        },
        onSuccess: (l) => {
          this.requestingMap[c] && (o(l), this.finishRequest(c));
        },
        onError: (l) => {
          this.requestingMap[c] && (i(l), this.finishRequest(c));
        }
      }, n);
    });
    this.config = t;
  }
  finishRequest(t) {
    delete this.requestingMap[t];
  }
  isRequesting() {
    return Object.keys(this.requestingMap).length > 0;
  }
}
function k3(e) {
  const {
    request: t,
    ...r
  } = e;
  return O.useMemo(() => [new T2({
    request: t || D2({
      baseURL: r.baseURL,
      model: r.model,
      dangerouslyApiKey: r.dangerouslyApiKey
    }).create,
    ...r
  })], [e == null ? void 0 : e.baseURL, e == null ? void 0 : e.dangerouslyApiKey, e == null ? void 0 : e.model]);
}
const lc = {};
function R2(e) {
  let t = lc[e];
  if (t)
    return t;
  t = lc[e] = [];
  for (let r = 0; r < 128; r++) {
    const n = String.fromCharCode(r);
    t.push(n);
  }
  for (let r = 0; r < e.length; r++) {
    const n = e.charCodeAt(r);
    t[n] = "%" + ("0" + n.toString(16).toUpperCase()).slice(-2);
  }
  return t;
}
function Mr(e, t) {
  typeof t != "string" && (t = Mr.defaultChars);
  const r = R2(t);
  return e.replace(/(%[a-f0-9]{2})+/gi, function(n) {
    let u = "";
    for (let a = 0, o = n.length; a < o; a += 3) {
      const i = parseInt(n.slice(a + 1, a + 3), 16);
      if (i < 128) {
        u += r[i];
        continue;
      }
      if ((i & 224) === 192 && a + 3 < o) {
        const s = parseInt(n.slice(a + 4, a + 6), 16);
        if ((s & 192) === 128) {
          const c = i << 6 & 1984 | s & 63;
          c < 128 ? u += "��" : u += String.fromCharCode(c), a += 3;
          continue;
        }
      }
      if ((i & 240) === 224 && a + 6 < o) {
        const s = parseInt(n.slice(a + 4, a + 6), 16), c = parseInt(n.slice(a + 7, a + 9), 16);
        if ((s & 192) === 128 && (c & 192) === 128) {
          const l = i << 12 & 61440 | s << 6 & 4032 | c & 63;
          l < 2048 || l >= 55296 && l <= 57343 ? u += "���" : u += String.fromCharCode(l), a += 6;
          continue;
        }
      }
      if ((i & 248) === 240 && a + 9 < o) {
        const s = parseInt(n.slice(a + 4, a + 6), 16), c = parseInt(n.slice(a + 7, a + 9), 16), l = parseInt(n.slice(a + 10, a + 12), 16);
        if ((s & 192) === 128 && (c & 192) === 128 && (l & 192) === 128) {
          let d = i << 18 & 1835008 | s << 12 & 258048 | c << 6 & 4032 | l & 63;
          d < 65536 || d > 1114111 ? u += "����" : (d -= 65536, u += String.fromCharCode(55296 + (d >> 10), 56320 + (d & 1023))), a += 9;
          continue;
        }
      }
      u += "�";
    }
    return u;
  });
}
Mr.defaultChars = ";/?:@&=+$,#";
Mr.componentChars = "";
const dc = {};
function P2(e) {
  let t = dc[e];
  if (t)
    return t;
  t = dc[e] = [];
  for (let r = 0; r < 128; r++) {
    const n = String.fromCharCode(r);
    /^[0-9a-z]$/i.test(n) ? t.push(n) : t.push("%" + ("0" + r.toString(16).toUpperCase()).slice(-2));
  }
  for (let r = 0; r < e.length; r++)
    t[e.charCodeAt(r)] = e[r];
  return t;
}
function zn(e, t, r) {
  typeof t != "string" && (r = t, t = zn.defaultChars), typeof r > "u" && (r = !0);
  const n = P2(t);
  let u = "";
  for (let a = 0, o = e.length; a < o; a++) {
    const i = e.charCodeAt(a);
    if (r && i === 37 && a + 2 < o && /^[0-9a-f]{2}$/i.test(e.slice(a + 1, a + 3))) {
      u += e.slice(a, a + 3), a += 2;
      continue;
    }
    if (i < 128) {
      u += n[i];
      continue;
    }
    if (i >= 55296 && i <= 57343) {
      if (i >= 55296 && i <= 56319 && a + 1 < o) {
        const s = e.charCodeAt(a + 1);
        if (s >= 56320 && s <= 57343) {
          u += encodeURIComponent(e[a] + e[a + 1]), a++;
          continue;
        }
      }
      u += "%EF%BF%BD";
      continue;
    }
    u += encodeURIComponent(e[a]);
  }
  return u;
}
zn.defaultChars = ";/?:@&=+$,-_.!~*'()#";
zn.componentChars = "-_.!~*'()";
function ki(e) {
  let t = "";
  return t += e.protocol || "", t += e.slashes ? "//" : "", t += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? t += "[" + e.hostname + "]" : t += e.hostname || "", t += e.port ? ":" + e.port : "", t += e.pathname || "", t += e.search || "", t += e.hash || "", t;
}
function wu() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
const O2 = /^([a-z0-9.+-]+:)/i, M2 = /:[0-9]*$/, I2 = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, N2 = ["<", ">", '"', "`", " ", "\r", `
`, "	"], j2 = ["{", "}", "|", "\\", "^", "`"].concat(N2), L2 = ["'"].concat(j2), fc = ["%", "/", "?", ";", "#"].concat(L2), hc = ["/", "?", "#"], z2 = 255, pc = /^[+a-z0-9A-Z_-]{0,63}$/, B2 = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, mc = {
  javascript: !0,
  "javascript:": !0
}, gc = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
};
function Ai(e, t) {
  if (e && e instanceof wu) return e;
  const r = new wu();
  return r.parse(e, t), r;
}
wu.prototype.parse = function(e, t) {
  let r, n, u, a = e;
  if (a = a.trim(), !t && e.split("#").length === 1) {
    const c = I2.exec(a);
    if (c)
      return this.pathname = c[1], c[2] && (this.search = c[2]), this;
  }
  let o = O2.exec(a);
  if (o && (o = o[0], r = o.toLowerCase(), this.protocol = o, a = a.substr(o.length)), (t || o || a.match(/^\/\/[^@\/]+@[^@\/]+/)) && (u = a.substr(0, 2) === "//", u && !(o && mc[o]) && (a = a.substr(2), this.slashes = !0)), !mc[o] && (u || o && !gc[o])) {
    let c = -1;
    for (let h = 0; h < hc.length; h++)
      n = a.indexOf(hc[h]), n !== -1 && (c === -1 || n < c) && (c = n);
    let l, d;
    c === -1 ? d = a.lastIndexOf("@") : d = a.lastIndexOf("@", c), d !== -1 && (l = a.slice(0, d), a = a.slice(d + 1), this.auth = l), c = -1;
    for (let h = 0; h < fc.length; h++)
      n = a.indexOf(fc[h]), n !== -1 && (c === -1 || n < c) && (c = n);
    c === -1 && (c = a.length), a[c - 1] === ":" && c--;
    const f = a.slice(0, c);
    a = a.slice(c), this.parseHost(f), this.hostname = this.hostname || "";
    const v = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!v) {
      const h = this.hostname.split(/\./);
      for (let g = 0, p = h.length; g < p; g++) {
        const C = h[g];
        if (C && !C.match(pc)) {
          let m = "";
          for (let y = 0, E = C.length; y < E; y++)
            C.charCodeAt(y) > 127 ? m += "x" : m += C[y];
          if (!m.match(pc)) {
            const y = h.slice(0, g), E = h.slice(g + 1), b = C.match(B2);
            b && (y.push(b[1]), E.unshift(b[2])), E.length && (a = E.join(".") + a), this.hostname = y.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > z2 && (this.hostname = ""), v && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  const i = a.indexOf("#");
  i !== -1 && (this.hash = a.substr(i), a = a.slice(0, i));
  const s = a.indexOf("?");
  return s !== -1 && (this.search = a.substr(s), a = a.slice(0, s)), a && (this.pathname = a), gc[r] && this.hostname && !this.pathname && (this.pathname = ""), this;
};
wu.prototype.parseHost = function(e) {
  let t = M2.exec(e);
  t && (t = t[0], t !== ":" && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
};
const V2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Mr,
  encode: zn,
  format: ki,
  parse: Ai
}, Symbol.toStringTag, { value: "Module" })), tf = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, rf = /[\0-\x1F\x7F-\x9F]/, H2 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/, Di = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, nf = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/, uf = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/, q2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: tf,
  Cc: rf,
  Cf: H2,
  P: Di,
  S: nf,
  Z: uf
}, Symbol.toStringTag, { value: "Module" })), W2 = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), U2 = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((e) => e.charCodeAt(0))
);
var za;
const Y2 = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), G2 = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (za = String.fromCodePoint) !== null && za !== void 0 ? za : function(e) {
    let t = "";
    return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
  }
);
function K2(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = Y2.get(e)) !== null && t !== void 0 ? t : e;
}
var Ze;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(Ze || (Ze = {}));
const X2 = 32;
var Qt;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(Qt || (Qt = {}));
function qo(e) {
  return e >= Ze.ZERO && e <= Ze.NINE;
}
function Z2(e) {
  return e >= Ze.UPPER_A && e <= Ze.UPPER_F || e >= Ze.LOWER_A && e <= Ze.LOWER_F;
}
function J2(e) {
  return e >= Ze.UPPER_A && e <= Ze.UPPER_Z || e >= Ze.LOWER_A && e <= Ze.LOWER_Z || qo(e);
}
function Q2(e) {
  return e === Ze.EQUALS || J2(e);
}
var Xe;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(Xe || (Xe = {}));
var Xt;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(Xt || (Xt = {}));
class ey {
  constructor(t, r, n) {
    this.decodeTree = t, this.emitCodePoint = r, this.errors = n, this.state = Xe.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = Xt.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = Xe.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(t, r) {
    switch (this.state) {
      case Xe.EntityStart:
        return t.charCodeAt(r) === Ze.NUM ? (this.state = Xe.NumericStart, this.consumed += 1, this.stateNumericStart(t, r + 1)) : (this.state = Xe.NamedEntity, this.stateNamedEntity(t, r));
      case Xe.NumericStart:
        return this.stateNumericStart(t, r);
      case Xe.NumericDecimal:
        return this.stateNumericDecimal(t, r);
      case Xe.NumericHex:
        return this.stateNumericHex(t, r);
      case Xe.NamedEntity:
        return this.stateNamedEntity(t, r);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(t, r) {
    return r >= t.length ? -1 : (t.charCodeAt(r) | X2) === Ze.LOWER_X ? (this.state = Xe.NumericHex, this.consumed += 1, this.stateNumericHex(t, r + 1)) : (this.state = Xe.NumericDecimal, this.stateNumericDecimal(t, r));
  }
  addToNumericResult(t, r, n, u) {
    if (r !== n) {
      const a = n - r;
      this.result = this.result * Math.pow(u, a) + parseInt(t.substr(r, a), u), this.consumed += a;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(t, r) {
    const n = r;
    for (; r < t.length; ) {
      const u = t.charCodeAt(r);
      if (qo(u) || Z2(u))
        r += 1;
      else
        return this.addToNumericResult(t, n, r, 16), this.emitNumericEntity(u, 3);
    }
    return this.addToNumericResult(t, n, r, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(t, r) {
    const n = r;
    for (; r < t.length; ) {
      const u = t.charCodeAt(r);
      if (qo(u))
        r += 1;
      else
        return this.addToNumericResult(t, n, r, 10), this.emitNumericEntity(u, 2);
    }
    return this.addToNumericResult(t, n, r, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(t, r) {
    var n;
    if (this.consumed <= r)
      return (n = this.errors) === null || n === void 0 || n.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === Ze.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === Xt.Strict)
      return 0;
    return this.emitCodePoint(K2(this.result), this.consumed), this.errors && (t !== Ze.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(t, r) {
    const { decodeTree: n } = this;
    let u = n[this.treeIndex], a = (u & Qt.VALUE_LENGTH) >> 14;
    for (; r < t.length; r++, this.excess++) {
      const o = t.charCodeAt(r);
      if (this.treeIndex = ty(n, u, this.treeIndex + Math.max(1, a), o), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === Xt.Attribute && // We shouldn't have consumed any characters after the entity,
        (a === 0 || // And there should be no invalid characters.
        Q2(o)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (u = n[this.treeIndex], a = (u & Qt.VALUE_LENGTH) >> 14, a !== 0) {
        if (o === Ze.SEMI)
          return this.emitNamedEntityData(this.treeIndex, a, this.consumed + this.excess);
        this.decodeMode !== Xt.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var t;
    const { result: r, decodeTree: n } = this, u = (n[r] & Qt.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(r, u, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(t, r, n) {
    const { decodeTree: u } = this;
    return this.emitCodePoint(r === 1 ? u[t] & ~Qt.VALUE_LENGTH : u[t + 1], n), r === 3 && this.emitCodePoint(u[t + 2], n), n;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var t;
    switch (this.state) {
      case Xe.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== Xt.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      case Xe.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case Xe.NumericHex:
        return this.emitNumericEntity(0, 3);
      case Xe.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case Xe.EntityStart:
        return 0;
    }
  }
}
function af(e) {
  let t = "";
  const r = new ey(e, (n) => t += G2(n));
  return function(u, a) {
    let o = 0, i = 0;
    for (; (i = u.indexOf("&", i)) >= 0; ) {
      t += u.slice(o, i), r.startEntity(a);
      const c = r.write(
        u,
        // Skip the "&"
        i + 1
      );
      if (c < 0) {
        o = i + r.end();
        break;
      }
      o = i + c, i = c === 0 ? o + 1 : o;
    }
    const s = t + u.slice(o);
    return t = "", s;
  };
}
function ty(e, t, r, n) {
  const u = (t & Qt.BRANCH_LENGTH) >> 7, a = t & Qt.JUMP_TABLE;
  if (u === 0)
    return a !== 0 && n === a ? r : -1;
  if (a) {
    const s = n - a;
    return s < 0 || s >= u ? -1 : e[r + s] - 1;
  }
  let o = r, i = o + u - 1;
  for (; o <= i; ) {
    const s = o + i >>> 1, c = e[s];
    if (c < n)
      o = s + 1;
    else if (c > n)
      i = s - 1;
    else
      return e[s + u];
  }
  return -1;
}
const ry = af(W2);
af(U2);
function of(e, t = Xt.Legacy) {
  return ry(e, t);
}
function ny(e) {
  return Object.prototype.toString.call(e);
}
function Ti(e) {
  return ny(e) === "[object String]";
}
const uy = Object.prototype.hasOwnProperty;
function ay(e, t) {
  return uy.call(e, t);
}
function pa(e) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(r) {
    if (r) {
      if (typeof r != "object")
        throw new TypeError(r + "must be object");
      Object.keys(r).forEach(function(n) {
        e[n] = r[n];
      });
    }
  }), e;
}
function sf(e, t, r) {
  return [].concat(e.slice(0, t), r, e.slice(t + 1));
}
function Ri(e) {
  return !(e >= 55296 && e <= 57343 || e >= 64976 && e <= 65007 || (e & 65535) === 65535 || (e & 65535) === 65534 || e >= 0 && e <= 8 || e === 11 || e >= 14 && e <= 31 || e >= 127 && e <= 159 || e > 1114111);
}
function $u(e) {
  if (e > 65535) {
    e -= 65536;
    const t = 55296 + (e >> 10), r = 56320 + (e & 1023);
    return String.fromCharCode(t, r);
  }
  return String.fromCharCode(e);
}
const cf = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, oy = /&([a-z#][a-z0-9]{1,31});/gi, iy = new RegExp(cf.source + "|" + oy.source, "gi"), sy = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function cy(e, t) {
  if (t.charCodeAt(0) === 35 && sy.test(t)) {
    const n = t[1].toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
    return Ri(n) ? $u(n) : e;
  }
  const r = of(e);
  return r !== e ? r : e;
}
function ly(e) {
  return e.indexOf("\\") < 0 ? e : e.replace(cf, "$1");
}
function Ir(e) {
  return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(iy, function(t, r, n) {
    return r || cy(t, n);
  });
}
const dy = /[&<>"]/, fy = /[&<>"]/g, hy = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function py(e) {
  return hy[e];
}
function tr(e) {
  return dy.test(e) ? e.replace(fy, py) : e;
}
const my = /[.?*+^$[\]\\(){}|-]/g;
function gy(e) {
  return e.replace(my, "\\$&");
}
function Te(e) {
  switch (e) {
    case 9:
    case 32:
      return !0;
  }
  return !1;
}
function bn(e) {
  if (e >= 8192 && e <= 8202)
    return !0;
  switch (e) {
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 32:
    case 160:
    case 5760:
    case 8239:
    case 8287:
    case 12288:
      return !0;
  }
  return !1;
}
function yn(e) {
  return Di.test(e) || nf.test(e);
}
function xn(e) {
  switch (e) {
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 124:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function ma(e) {
  return e = e.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (e = e.replace(/ẞ/g, "ß")), e.toLowerCase().toUpperCase();
}
const vy = { mdurl: V2, ucmicro: q2 }, by = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  arrayReplaceAt: sf,
  assign: pa,
  escapeHtml: tr,
  escapeRE: gy,
  fromCodePoint: $u,
  has: ay,
  isMdAsciiPunct: xn,
  isPunctChar: yn,
  isSpace: Te,
  isString: Ti,
  isValidEntityCode: Ri,
  isWhiteSpace: bn,
  lib: vy,
  normalizeReference: ma,
  unescapeAll: Ir,
  unescapeMd: ly
}, Symbol.toStringTag, { value: "Module" }));
function yy(e, t, r) {
  let n, u, a, o;
  const i = e.posMax, s = e.pos;
  for (e.pos = t + 1, n = 1; e.pos < i; ) {
    if (a = e.src.charCodeAt(e.pos), a === 93 && (n--, n === 0)) {
      u = !0;
      break;
    }
    if (o = e.pos, e.md.inline.skipToken(e), a === 91) {
      if (o === e.pos - 1)
        n++;
      else if (r)
        return e.pos = s, -1;
    }
  }
  let c = -1;
  return u && (c = e.pos), e.pos = s, c;
}
function xy(e, t, r) {
  let n, u = t;
  const a = {
    ok: !1,
    pos: 0,
    str: ""
  };
  if (e.charCodeAt(u) === 60) {
    for (u++; u < r; ) {
      if (n = e.charCodeAt(u), n === 10 || n === 60)
        return a;
      if (n === 62)
        return a.pos = u + 1, a.str = Ir(e.slice(t + 1, u)), a.ok = !0, a;
      if (n === 92 && u + 1 < r) {
        u += 2;
        continue;
      }
      u++;
    }
    return a;
  }
  let o = 0;
  for (; u < r && (n = e.charCodeAt(u), !(n === 32 || n < 32 || n === 127)); ) {
    if (n === 92 && u + 1 < r) {
      if (e.charCodeAt(u + 1) === 32)
        break;
      u += 2;
      continue;
    }
    if (n === 40 && (o++, o > 32))
      return a;
    if (n === 41) {
      if (o === 0)
        break;
      o--;
    }
    u++;
  }
  return t === u || o !== 0 || (a.str = Ir(e.slice(t, u)), a.pos = u, a.ok = !0), a;
}
function _y(e, t, r, n) {
  let u, a = t;
  const o = {
    // if `true`, this is a valid link title
    ok: !1,
    // if `true`, this link can be continued on the next line
    can_continue: !1,
    // if `ok`, it's the position of the first character after the closing marker
    pos: 0,
    // if `ok`, it's the unescaped title
    str: "",
    // expected closing marker character code
    marker: 0
  };
  if (n)
    o.str = n.str, o.marker = n.marker;
  else {
    if (a >= r)
      return o;
    let i = e.charCodeAt(a);
    if (i !== 34 && i !== 39 && i !== 40)
      return o;
    t++, a++, i === 40 && (i = 41), o.marker = i;
  }
  for (; a < r; ) {
    if (u = e.charCodeAt(a), u === o.marker)
      return o.pos = a + 1, o.str += Ir(e.slice(t, a)), o.ok = !0, o;
    if (u === 40 && o.marker === 41)
      return o;
    u === 92 && a + 1 < r && a++, a++;
  }
  return o.can_continue = !0, o.str += Ir(e.slice(t, a)), o;
}
const Cy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseLinkDestination: xy,
  parseLinkLabel: yy,
  parseLinkTitle: _y
}, Symbol.toStringTag, { value: "Module" })), Nt = {};
Nt.code_inline = function(e, t, r, n, u) {
  const a = e[t];
  return "<code" + u.renderAttrs(a) + ">" + tr(a.content) + "</code>";
};
Nt.code_block = function(e, t, r, n, u) {
  const a = e[t];
  return "<pre" + u.renderAttrs(a) + "><code>" + tr(e[t].content) + `</code></pre>
`;
};
Nt.fence = function(e, t, r, n, u) {
  const a = e[t], o = a.info ? Ir(a.info).trim() : "";
  let i = "", s = "";
  if (o) {
    const l = o.split(/(\s+)/g);
    i = l[0], s = l.slice(2).join("");
  }
  let c;
  if (r.highlight ? c = r.highlight(a.content, i, s) || tr(a.content) : c = tr(a.content), c.indexOf("<pre") === 0)
    return c + `
`;
  if (o) {
    const l = a.attrIndex("class"), d = a.attrs ? a.attrs.slice() : [];
    l < 0 ? d.push(["class", r.langPrefix + i]) : (d[l] = d[l].slice(), d[l][1] += " " + r.langPrefix + i);
    const f = {
      attrs: d
    };
    return `<pre><code${u.renderAttrs(f)}>${c}</code></pre>
`;
  }
  return `<pre><code${u.renderAttrs(a)}>${c}</code></pre>
`;
};
Nt.image = function(e, t, r, n, u) {
  const a = e[t];
  return a.attrs[a.attrIndex("alt")][1] = u.renderInlineAsText(a.children, r, n), u.renderToken(e, t, r);
};
Nt.hardbreak = function(e, t, r) {
  return r.xhtmlOut ? `<br />
` : `<br>
`;
};
Nt.softbreak = function(e, t, r) {
  return r.breaks ? r.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
Nt.text = function(e, t) {
  return tr(e[t].content);
};
Nt.html_block = function(e, t) {
  return e[t].content;
};
Nt.html_inline = function(e, t) {
  return e[t].content;
};
function Br() {
  this.rules = pa({}, Nt);
}
Br.prototype.renderAttrs = function(t) {
  let r, n, u;
  if (!t.attrs)
    return "";
  for (u = "", r = 0, n = t.attrs.length; r < n; r++)
    u += " " + tr(t.attrs[r][0]) + '="' + tr(t.attrs[r][1]) + '"';
  return u;
};
Br.prototype.renderToken = function(t, r, n) {
  const u = t[r];
  let a = "";
  if (u.hidden)
    return "";
  u.block && u.nesting !== -1 && r && t[r - 1].hidden && (a += `
`), a += (u.nesting === -1 ? "</" : "<") + u.tag, a += this.renderAttrs(u), u.nesting === 0 && n.xhtmlOut && (a += " /");
  let o = !1;
  if (u.block && (o = !0, u.nesting === 1 && r + 1 < t.length)) {
    const i = t[r + 1];
    (i.type === "inline" || i.hidden || i.nesting === -1 && i.tag === u.tag) && (o = !1);
  }
  return a += o ? `>
` : ">", a;
};
Br.prototype.renderInline = function(e, t, r) {
  let n = "";
  const u = this.rules;
  for (let a = 0, o = e.length; a < o; a++) {
    const i = e[a].type;
    typeof u[i] < "u" ? n += u[i](e, a, t, r, this) : n += this.renderToken(e, a, t);
  }
  return n;
};
Br.prototype.renderInlineAsText = function(e, t, r) {
  let n = "";
  for (let u = 0, a = e.length; u < a; u++)
    switch (e[u].type) {
      case "text":
        n += e[u].content;
        break;
      case "image":
        n += this.renderInlineAsText(e[u].children, t, r);
        break;
      case "html_inline":
      case "html_block":
        n += e[u].content;
        break;
      case "softbreak":
      case "hardbreak":
        n += `
`;
        break;
    }
  return n;
};
Br.prototype.render = function(e, t, r) {
  let n = "";
  const u = this.rules;
  for (let a = 0, o = e.length; a < o; a++) {
    const i = e[a].type;
    i === "inline" ? n += this.renderInline(e[a].children, t, r) : typeof u[i] < "u" ? n += u[i](e, a, t, r, this) : n += this.renderToken(e, a, t, r);
  }
  return n;
};
function rt() {
  this.__rules__ = [], this.__cache__ = null;
}
rt.prototype.__find__ = function(e) {
  for (let t = 0; t < this.__rules__.length; t++)
    if (this.__rules__[t].name === e)
      return t;
  return -1;
};
rt.prototype.__compile__ = function() {
  const e = this, t = [""];
  e.__rules__.forEach(function(r) {
    r.enabled && r.alt.forEach(function(n) {
      t.indexOf(n) < 0 && t.push(n);
    });
  }), e.__cache__ = {}, t.forEach(function(r) {
    e.__cache__[r] = [], e.__rules__.forEach(function(n) {
      n.enabled && (r && n.alt.indexOf(r) < 0 || e.__cache__[r].push(n.fn));
    });
  });
};
rt.prototype.at = function(e, t, r) {
  const n = this.__find__(e), u = r || {};
  if (n === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__[n].fn = t, this.__rules__[n].alt = u.alt || [], this.__cache__ = null;
};
rt.prototype.before = function(e, t, r, n) {
  const u = this.__find__(e), a = n || {};
  if (u === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__.splice(u, 0, {
    name: t,
    enabled: !0,
    fn: r,
    alt: a.alt || []
  }), this.__cache__ = null;
};
rt.prototype.after = function(e, t, r, n) {
  const u = this.__find__(e), a = n || {};
  if (u === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__.splice(u + 1, 0, {
    name: t,
    enabled: !0,
    fn: r,
    alt: a.alt || []
  }), this.__cache__ = null;
};
rt.prototype.push = function(e, t, r) {
  const n = r || {};
  this.__rules__.push({
    name: e,
    enabled: !0,
    fn: t,
    alt: n.alt || []
  }), this.__cache__ = null;
};
rt.prototype.enable = function(e, t) {
  Array.isArray(e) || (e = [e]);
  const r = [];
  return e.forEach(function(n) {
    const u = this.__find__(n);
    if (u < 0) {
      if (t)
        return;
      throw new Error("Rules manager: invalid rule name " + n);
    }
    this.__rules__[u].enabled = !0, r.push(n);
  }, this), this.__cache__ = null, r;
};
rt.prototype.enableOnly = function(e, t) {
  Array.isArray(e) || (e = [e]), this.__rules__.forEach(function(r) {
    r.enabled = !1;
  }), this.enable(e, t);
};
rt.prototype.disable = function(e, t) {
  Array.isArray(e) || (e = [e]);
  const r = [];
  return e.forEach(function(n) {
    const u = this.__find__(n);
    if (u < 0) {
      if (t)
        return;
      throw new Error("Rules manager: invalid rule name " + n);
    }
    this.__rules__[u].enabled = !1, r.push(n);
  }, this), this.__cache__ = null, r;
};
rt.prototype.getRules = function(e) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[e] || [];
};
function Dt(e, t, r) {
  this.type = e, this.tag = t, this.attrs = null, this.map = null, this.nesting = r, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
Dt.prototype.attrIndex = function(t) {
  if (!this.attrs)
    return -1;
  const r = this.attrs;
  for (let n = 0, u = r.length; n < u; n++)
    if (r[n][0] === t)
      return n;
  return -1;
};
Dt.prototype.attrPush = function(t) {
  this.attrs ? this.attrs.push(t) : this.attrs = [t];
};
Dt.prototype.attrSet = function(t, r) {
  const n = this.attrIndex(t), u = [t, r];
  n < 0 ? this.attrPush(u) : this.attrs[n] = u;
};
Dt.prototype.attrGet = function(t) {
  const r = this.attrIndex(t);
  let n = null;
  return r >= 0 && (n = this.attrs[r][1]), n;
};
Dt.prototype.attrJoin = function(t, r) {
  const n = this.attrIndex(t);
  n < 0 ? this.attrPush([t, r]) : this.attrs[n][1] = this.attrs[n][1] + " " + r;
};
function lf(e, t, r) {
  this.src = e, this.env = r, this.tokens = [], this.inlineMode = !1, this.md = t;
}
lf.prototype.Token = Dt;
const Ey = /\r\n?|\n/g, Sy = /\0/g;
function wy(e) {
  let t;
  t = e.src.replace(Ey, `
`), t = t.replace(Sy, "�"), e.src = t;
}
function $y(e) {
  let t;
  e.inlineMode ? (t = new e.Token("inline", "", 0), t.content = e.src, t.map = [0, 1], t.children = [], e.tokens.push(t)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}
function Fy(e) {
  const t = e.tokens;
  for (let r = 0, n = t.length; r < n; r++) {
    const u = t[r];
    u.type === "inline" && e.md.inline.parse(u.content, e.md, e.env, u.children);
  }
}
function ky(e) {
  return /^<a[>\s]/i.test(e);
}
function Ay(e) {
  return /^<\/a\s*>/i.test(e);
}
function Dy(e) {
  const t = e.tokens;
  if (e.md.options.linkify)
    for (let r = 0, n = t.length; r < n; r++) {
      if (t[r].type !== "inline" || !e.md.linkify.pretest(t[r].content))
        continue;
      let u = t[r].children, a = 0;
      for (let o = u.length - 1; o >= 0; o--) {
        const i = u[o];
        if (i.type === "link_close") {
          for (o--; u[o].level !== i.level && u[o].type !== "link_open"; )
            o--;
          continue;
        }
        if (i.type === "html_inline" && (ky(i.content) && a > 0 && a--, Ay(i.content) && a++), !(a > 0) && i.type === "text" && e.md.linkify.test(i.content)) {
          const s = i.content;
          let c = e.md.linkify.match(s);
          const l = [];
          let d = i.level, f = 0;
          c.length > 0 && c[0].index === 0 && o > 0 && u[o - 1].type === "text_special" && (c = c.slice(1));
          for (let v = 0; v < c.length; v++) {
            const h = c[v].url, g = e.md.normalizeLink(h);
            if (!e.md.validateLink(g))
              continue;
            let p = c[v].text;
            c[v].schema ? c[v].schema === "mailto:" && !/^mailto:/i.test(p) ? p = e.md.normalizeLinkText("mailto:" + p).replace(/^mailto:/, "") : p = e.md.normalizeLinkText(p) : p = e.md.normalizeLinkText("http://" + p).replace(/^http:\/\//, "");
            const C = c[v].index;
            if (C > f) {
              const b = new e.Token("text", "", 0);
              b.content = s.slice(f, C), b.level = d, l.push(b);
            }
            const m = new e.Token("link_open", "a", 1);
            m.attrs = [["href", g]], m.level = d++, m.markup = "linkify", m.info = "auto", l.push(m);
            const y = new e.Token("text", "", 0);
            y.content = p, y.level = d, l.push(y);
            const E = new e.Token("link_close", "a", -1);
            E.level = --d, E.markup = "linkify", E.info = "auto", l.push(E), f = c[v].lastIndex;
          }
          if (f < s.length) {
            const v = new e.Token("text", "", 0);
            v.content = s.slice(f), v.level = d, l.push(v);
          }
          t[r].children = u = sf(u, o, l);
        }
      }
    }
}
const df = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, Ty = /\((c|tm|r)\)/i, Ry = /\((c|tm|r)\)/ig, Py = {
  c: "©",
  r: "®",
  tm: "™"
};
function Oy(e, t) {
  return Py[t.toLowerCase()];
}
function My(e) {
  let t = 0;
  for (let r = e.length - 1; r >= 0; r--) {
    const n = e[r];
    n.type === "text" && !t && (n.content = n.content.replace(Ry, Oy)), n.type === "link_open" && n.info === "auto" && t--, n.type === "link_close" && n.info === "auto" && t++;
  }
}
function Iy(e) {
  let t = 0;
  for (let r = e.length - 1; r >= 0; r--) {
    const n = e[r];
    n.type === "text" && !t && df.test(n.content) && (n.content = n.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), n.type === "link_open" && n.info === "auto" && t--, n.type === "link_close" && n.info === "auto" && t++;
  }
}
function Ny(e) {
  let t;
  if (e.md.options.typographer)
    for (t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type === "inline" && (Ty.test(e.tokens[t].content) && My(e.tokens[t].children), df.test(e.tokens[t].content) && Iy(e.tokens[t].children));
}
const jy = /['"]/, vc = /['"]/g, bc = "’";
function ou(e, t, r) {
  return e.slice(0, t) + r + e.slice(t + 1);
}
function Ly(e, t) {
  let r;
  const n = [];
  for (let u = 0; u < e.length; u++) {
    const a = e[u], o = e[u].level;
    for (r = n.length - 1; r >= 0 && !(n[r].level <= o); r--)
      ;
    if (n.length = r + 1, a.type !== "text")
      continue;
    let i = a.content, s = 0, c = i.length;
    e:
      for (; s < c; ) {
        vc.lastIndex = s;
        const l = vc.exec(i);
        if (!l)
          break;
        let d = !0, f = !0;
        s = l.index + 1;
        const v = l[0] === "'";
        let h = 32;
        if (l.index - 1 >= 0)
          h = i.charCodeAt(l.index - 1);
        else
          for (r = u - 1; r >= 0 && !(e[r].type === "softbreak" || e[r].type === "hardbreak"); r--)
            if (e[r].content) {
              h = e[r].content.charCodeAt(e[r].content.length - 1);
              break;
            }
        let g = 32;
        if (s < c)
          g = i.charCodeAt(s);
        else
          for (r = u + 1; r < e.length && !(e[r].type === "softbreak" || e[r].type === "hardbreak"); r++)
            if (e[r].content) {
              g = e[r].content.charCodeAt(0);
              break;
            }
        const p = xn(h) || yn(String.fromCharCode(h)), C = xn(g) || yn(String.fromCharCode(g)), m = bn(h), y = bn(g);
        if (y ? d = !1 : C && (m || p || (d = !1)), m ? f = !1 : p && (y || C || (f = !1)), g === 34 && l[0] === '"' && h >= 48 && h <= 57 && (f = d = !1), d && f && (d = p, f = C), !d && !f) {
          v && (a.content = ou(a.content, l.index, bc));
          continue;
        }
        if (f)
          for (r = n.length - 1; r >= 0; r--) {
            let E = n[r];
            if (n[r].level < o)
              break;
            if (E.single === v && n[r].level === o) {
              E = n[r];
              let b, w;
              v ? (b = t.md.options.quotes[2], w = t.md.options.quotes[3]) : (b = t.md.options.quotes[0], w = t.md.options.quotes[1]), a.content = ou(a.content, l.index, w), e[E.token].content = ou(
                e[E.token].content,
                E.pos,
                b
              ), s += w.length - 1, E.token === u && (s += b.length - 1), i = a.content, c = i.length, n.length = r;
              continue e;
            }
          }
        d ? n.push({
          token: u,
          pos: l.index,
          single: v,
          level: o
        }) : f && v && (a.content = ou(a.content, l.index, bc));
      }
  }
}
function zy(e) {
  if (e.md.options.typographer)
    for (let t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type !== "inline" || !jy.test(e.tokens[t].content) || Ly(e.tokens[t].children, e);
}
function By(e) {
  let t, r;
  const n = e.tokens, u = n.length;
  for (let a = 0; a < u; a++) {
    if (n[a].type !== "inline") continue;
    const o = n[a].children, i = o.length;
    for (t = 0; t < i; t++)
      o[t].type === "text_special" && (o[t].type = "text");
    for (t = r = 0; t < i; t++)
      o[t].type === "text" && t + 1 < i && o[t + 1].type === "text" ? o[t + 1].content = o[t].content + o[t + 1].content : (t !== r && (o[r] = o[t]), r++);
    t !== r && (o.length = r);
  }
}
const Ba = [
  ["normalize", wy],
  ["block", $y],
  ["inline", Fy],
  ["linkify", Dy],
  ["replacements", Ny],
  ["smartquotes", zy],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ["text_join", By]
];
function Pi() {
  this.ruler = new rt();
  for (let e = 0; e < Ba.length; e++)
    this.ruler.push(Ba[e][0], Ba[e][1]);
}
Pi.prototype.process = function(e) {
  const t = this.ruler.getRules("");
  for (let r = 0, n = t.length; r < n; r++)
    t[r](e);
};
Pi.prototype.State = lf;
function jt(e, t, r, n) {
  this.src = e, this.md = t, this.env = r, this.tokens = n, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0;
  const u = this.src;
  for (let a = 0, o = 0, i = 0, s = 0, c = u.length, l = !1; o < c; o++) {
    const d = u.charCodeAt(o);
    if (!l)
      if (Te(d)) {
        i++, d === 9 ? s += 4 - s % 4 : s++;
        continue;
      } else
        l = !0;
    (d === 10 || o === c - 1) && (d !== 10 && o++, this.bMarks.push(a), this.eMarks.push(o), this.tShift.push(i), this.sCount.push(s), this.bsCount.push(0), l = !1, i = 0, s = 0, a = o + 1);
  }
  this.bMarks.push(u.length), this.eMarks.push(u.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
jt.prototype.push = function(e, t, r) {
  const n = new Dt(e, t, r);
  return n.block = !0, r < 0 && this.level--, n.level = this.level, r > 0 && this.level++, this.tokens.push(n), n;
};
jt.prototype.isEmpty = function(t) {
  return this.bMarks[t] + this.tShift[t] >= this.eMarks[t];
};
jt.prototype.skipEmptyLines = function(t) {
  for (let r = this.lineMax; t < r && !(this.bMarks[t] + this.tShift[t] < this.eMarks[t]); t++)
    ;
  return t;
};
jt.prototype.skipSpaces = function(t) {
  for (let r = this.src.length; t < r; t++) {
    const n = this.src.charCodeAt(t);
    if (!Te(n))
      break;
  }
  return t;
};
jt.prototype.skipSpacesBack = function(t, r) {
  if (t <= r)
    return t;
  for (; t > r; )
    if (!Te(this.src.charCodeAt(--t)))
      return t + 1;
  return t;
};
jt.prototype.skipChars = function(t, r) {
  for (let n = this.src.length; t < n && this.src.charCodeAt(t) === r; t++)
    ;
  return t;
};
jt.prototype.skipCharsBack = function(t, r, n) {
  if (t <= n)
    return t;
  for (; t > n; )
    if (r !== this.src.charCodeAt(--t))
      return t + 1;
  return t;
};
jt.prototype.getLines = function(t, r, n, u) {
  if (t >= r)
    return "";
  const a = new Array(r - t);
  for (let o = 0, i = t; i < r; i++, o++) {
    let s = 0;
    const c = this.bMarks[i];
    let l = c, d;
    for (i + 1 < r || u ? d = this.eMarks[i] + 1 : d = this.eMarks[i]; l < d && s < n; ) {
      const f = this.src.charCodeAt(l);
      if (Te(f))
        f === 9 ? s += 4 - (s + this.bsCount[i]) % 4 : s++;
      else if (l - c < this.tShift[i])
        s++;
      else
        break;
      l++;
    }
    s > n ? a[o] = new Array(s - n + 1).join(" ") + this.src.slice(l, d) : a[o] = this.src.slice(l, d);
  }
  return a.join("");
};
jt.prototype.Token = Dt;
const Vy = 65536;
function Va(e, t) {
  const r = e.bMarks[t] + e.tShift[t], n = e.eMarks[t];
  return e.src.slice(r, n);
}
function yc(e) {
  const t = [], r = e.length;
  let n = 0, u = e.charCodeAt(n), a = !1, o = 0, i = "";
  for (; n < r; )
    u === 124 && (a ? (i += e.substring(o, n - 1), o = n) : (t.push(i + e.substring(o, n)), i = "", o = n + 1)), a = u === 92, n++, u = e.charCodeAt(n);
  return t.push(i + e.substring(o)), t;
}
function Hy(e, t, r, n) {
  if (t + 2 > r)
    return !1;
  let u = t + 1;
  if (e.sCount[u] < e.blkIndent || e.sCount[u] - e.blkIndent >= 4)
    return !1;
  let a = e.bMarks[u] + e.tShift[u];
  if (a >= e.eMarks[u])
    return !1;
  const o = e.src.charCodeAt(a++);
  if (o !== 124 && o !== 45 && o !== 58 || a >= e.eMarks[u])
    return !1;
  const i = e.src.charCodeAt(a++);
  if (i !== 124 && i !== 45 && i !== 58 && !Te(i) || o === 45 && Te(i))
    return !1;
  for (; a < e.eMarks[u]; ) {
    const E = e.src.charCodeAt(a);
    if (E !== 124 && E !== 45 && E !== 58 && !Te(E))
      return !1;
    a++;
  }
  let s = Va(e, t + 1), c = s.split("|");
  const l = [];
  for (let E = 0; E < c.length; E++) {
    const b = c[E].trim();
    if (!b) {
      if (E === 0 || E === c.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(b))
      return !1;
    b.charCodeAt(b.length - 1) === 58 ? l.push(b.charCodeAt(0) === 58 ? "center" : "right") : b.charCodeAt(0) === 58 ? l.push("left") : l.push("");
  }
  if (s = Va(e, t).trim(), s.indexOf("|") === -1 || e.sCount[t] - e.blkIndent >= 4)
    return !1;
  c = yc(s), c.length && c[0] === "" && c.shift(), c.length && c[c.length - 1] === "" && c.pop();
  const d = c.length;
  if (d === 0 || d !== l.length)
    return !1;
  if (n)
    return !0;
  const f = e.parentType;
  e.parentType = "table";
  const v = e.md.block.ruler.getRules("blockquote"), h = e.push("table_open", "table", 1), g = [t, 0];
  h.map = g;
  const p = e.push("thead_open", "thead", 1);
  p.map = [t, t + 1];
  const C = e.push("tr_open", "tr", 1);
  C.map = [t, t + 1];
  for (let E = 0; E < c.length; E++) {
    const b = e.push("th_open", "th", 1);
    l[E] && (b.attrs = [["style", "text-align:" + l[E]]]);
    const w = e.push("inline", "", 0);
    w.content = c[E].trim(), w.children = [], e.push("th_close", "th", -1);
  }
  e.push("tr_close", "tr", -1), e.push("thead_close", "thead", -1);
  let m, y = 0;
  for (u = t + 2; u < r && !(e.sCount[u] < e.blkIndent); u++) {
    let E = !1;
    for (let w = 0, S = v.length; w < S; w++)
      if (v[w](e, u, r, !0)) {
        E = !0;
        break;
      }
    if (E || (s = Va(e, u).trim(), !s) || e.sCount[u] - e.blkIndent >= 4 || (c = yc(s), c.length && c[0] === "" && c.shift(), c.length && c[c.length - 1] === "" && c.pop(), y += d - c.length, y > Vy))
      break;
    if (u === t + 2) {
      const w = e.push("tbody_open", "tbody", 1);
      w.map = m = [t + 2, 0];
    }
    const b = e.push("tr_open", "tr", 1);
    b.map = [u, u + 1];
    for (let w = 0; w < d; w++) {
      const S = e.push("td_open", "td", 1);
      l[w] && (S.attrs = [["style", "text-align:" + l[w]]]);
      const R = e.push("inline", "", 0);
      R.content = c[w] ? c[w].trim() : "", R.children = [], e.push("td_close", "td", -1);
    }
    e.push("tr_close", "tr", -1);
  }
  return m && (e.push("tbody_close", "tbody", -1), m[1] = u), e.push("table_close", "table", -1), g[1] = u, e.parentType = f, e.line = u, !0;
}
function qy(e, t, r) {
  if (e.sCount[t] - e.blkIndent < 4)
    return !1;
  let n = t + 1, u = n;
  for (; n < r; ) {
    if (e.isEmpty(n)) {
      n++;
      continue;
    }
    if (e.sCount[n] - e.blkIndent >= 4) {
      n++, u = n;
      continue;
    }
    break;
  }
  e.line = u;
  const a = e.push("code_block", "code", 0);
  return a.content = e.getLines(t, u, 4 + e.blkIndent, !1) + `
`, a.map = [t, e.line], !0;
}
function Wy(e, t, r, n) {
  let u = e.bMarks[t] + e.tShift[t], a = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || u + 3 > a)
    return !1;
  const o = e.src.charCodeAt(u);
  if (o !== 126 && o !== 96)
    return !1;
  let i = u;
  u = e.skipChars(u, o);
  let s = u - i;
  if (s < 3)
    return !1;
  const c = e.src.slice(i, u), l = e.src.slice(u, a);
  if (o === 96 && l.indexOf(String.fromCharCode(o)) >= 0)
    return !1;
  if (n)
    return !0;
  let d = t, f = !1;
  for (; d++, !(d >= r || (u = i = e.bMarks[d] + e.tShift[d], a = e.eMarks[d], u < a && e.sCount[d] < e.blkIndent)); )
    if (e.src.charCodeAt(u) === o && !(e.sCount[d] - e.blkIndent >= 4) && (u = e.skipChars(u, o), !(u - i < s) && (u = e.skipSpaces(u), !(u < a)))) {
      f = !0;
      break;
    }
  s = e.sCount[t], e.line = d + (f ? 1 : 0);
  const v = e.push("fence", "code", 0);
  return v.info = l, v.content = e.getLines(t + 1, d, s, !0), v.markup = c, v.map = [t, e.line], !0;
}
function Uy(e, t, r, n) {
  let u = e.bMarks[t] + e.tShift[t], a = e.eMarks[t];
  const o = e.lineMax;
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(u) !== 62)
    return !1;
  if (n)
    return !0;
  const i = [], s = [], c = [], l = [], d = e.md.block.ruler.getRules("blockquote"), f = e.parentType;
  e.parentType = "blockquote";
  let v = !1, h;
  for (h = t; h < r; h++) {
    const y = e.sCount[h] < e.blkIndent;
    if (u = e.bMarks[h] + e.tShift[h], a = e.eMarks[h], u >= a)
      break;
    if (e.src.charCodeAt(u++) === 62 && !y) {
      let b = e.sCount[h] + 1, w, S;
      e.src.charCodeAt(u) === 32 ? (u++, b++, S = !1, w = !0) : e.src.charCodeAt(u) === 9 ? (w = !0, (e.bsCount[h] + b) % 4 === 3 ? (u++, b++, S = !1) : S = !0) : w = !1;
      let R = b;
      for (i.push(e.bMarks[h]), e.bMarks[h] = u; u < a; ) {
        const k = e.src.charCodeAt(u);
        if (Te(k))
          k === 9 ? R += 4 - (R + e.bsCount[h] + (S ? 1 : 0)) % 4 : R++;
        else
          break;
        u++;
      }
      v = u >= a, s.push(e.bsCount[h]), e.bsCount[h] = e.sCount[h] + 1 + (w ? 1 : 0), c.push(e.sCount[h]), e.sCount[h] = R - b, l.push(e.tShift[h]), e.tShift[h] = u - e.bMarks[h];
      continue;
    }
    if (v)
      break;
    let E = !1;
    for (let b = 0, w = d.length; b < w; b++)
      if (d[b](e, h, r, !0)) {
        E = !0;
        break;
      }
    if (E) {
      e.lineMax = h, e.blkIndent !== 0 && (i.push(e.bMarks[h]), s.push(e.bsCount[h]), l.push(e.tShift[h]), c.push(e.sCount[h]), e.sCount[h] -= e.blkIndent);
      break;
    }
    i.push(e.bMarks[h]), s.push(e.bsCount[h]), l.push(e.tShift[h]), c.push(e.sCount[h]), e.sCount[h] = -1;
  }
  const g = e.blkIndent;
  e.blkIndent = 0;
  const p = e.push("blockquote_open", "blockquote", 1);
  p.markup = ">";
  const C = [t, 0];
  p.map = C, e.md.block.tokenize(e, t, h);
  const m = e.push("blockquote_close", "blockquote", -1);
  m.markup = ">", e.lineMax = o, e.parentType = f, C[1] = e.line;
  for (let y = 0; y < l.length; y++)
    e.bMarks[y + t] = i[y], e.tShift[y + t] = l[y], e.sCount[y + t] = c[y], e.bsCount[y + t] = s[y];
  return e.blkIndent = g, !0;
}
function Yy(e, t, r, n) {
  const u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  let a = e.bMarks[t] + e.tShift[t];
  const o = e.src.charCodeAt(a++);
  if (o !== 42 && o !== 45 && o !== 95)
    return !1;
  let i = 1;
  for (; a < u; ) {
    const c = e.src.charCodeAt(a++);
    if (c !== o && !Te(c))
      return !1;
    c === o && i++;
  }
  if (i < 3)
    return !1;
  if (n)
    return !0;
  e.line = t + 1;
  const s = e.push("hr", "hr", 0);
  return s.map = [t, e.line], s.markup = Array(i + 1).join(String.fromCharCode(o)), !0;
}
function xc(e, t) {
  const r = e.eMarks[t];
  let n = e.bMarks[t] + e.tShift[t];
  const u = e.src.charCodeAt(n++);
  if (u !== 42 && u !== 45 && u !== 43)
    return -1;
  if (n < r) {
    const a = e.src.charCodeAt(n);
    if (!Te(a))
      return -1;
  }
  return n;
}
function _c(e, t) {
  const r = e.bMarks[t] + e.tShift[t], n = e.eMarks[t];
  let u = r;
  if (u + 1 >= n)
    return -1;
  let a = e.src.charCodeAt(u++);
  if (a < 48 || a > 57)
    return -1;
  for (; ; ) {
    if (u >= n)
      return -1;
    if (a = e.src.charCodeAt(u++), a >= 48 && a <= 57) {
      if (u - r >= 10)
        return -1;
      continue;
    }
    if (a === 41 || a === 46)
      break;
    return -1;
  }
  return u < n && (a = e.src.charCodeAt(u), !Te(a)) ? -1 : u;
}
function Gy(e, t) {
  const r = e.level + 2;
  for (let n = t + 2, u = e.tokens.length - 2; n < u; n++)
    e.tokens[n].level === r && e.tokens[n].type === "paragraph_open" && (e.tokens[n + 2].hidden = !0, e.tokens[n].hidden = !0, n += 2);
}
function Ky(e, t, r, n) {
  let u, a, o, i, s = t, c = !0;
  if (e.sCount[s] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[s] - e.listIndent >= 4 && e.sCount[s] < e.blkIndent)
    return !1;
  let l = !1;
  n && e.parentType === "paragraph" && e.sCount[s] >= e.blkIndent && (l = !0);
  let d, f, v;
  if ((v = _c(e, s)) >= 0) {
    if (d = !0, o = e.bMarks[s] + e.tShift[s], f = Number(e.src.slice(o, v - 1)), l && f !== 1) return !1;
  } else if ((v = xc(e, s)) >= 0)
    d = !1;
  else
    return !1;
  if (l && e.skipSpaces(v) >= e.eMarks[s])
    return !1;
  if (n)
    return !0;
  const h = e.src.charCodeAt(v - 1), g = e.tokens.length;
  d ? (i = e.push("ordered_list_open", "ol", 1), f !== 1 && (i.attrs = [["start", f]])) : i = e.push("bullet_list_open", "ul", 1);
  const p = [s, 0];
  i.map = p, i.markup = String.fromCharCode(h);
  let C = !1;
  const m = e.md.block.ruler.getRules("list"), y = e.parentType;
  for (e.parentType = "list"; s < r; ) {
    a = v, u = e.eMarks[s];
    const E = e.sCount[s] + v - (e.bMarks[s] + e.tShift[s]);
    let b = E;
    for (; a < u; ) {
      const L = e.src.charCodeAt(a);
      if (L === 9)
        b += 4 - (b + e.bsCount[s]) % 4;
      else if (L === 32)
        b++;
      else
        break;
      a++;
    }
    const w = a;
    let S;
    w >= u ? S = 1 : S = b - E, S > 4 && (S = 1);
    const R = E + S;
    i = e.push("list_item_open", "li", 1), i.markup = String.fromCharCode(h);
    const k = [s, 0];
    i.map = k, d && (i.info = e.src.slice(o, v - 1));
    const T = e.tight, I = e.tShift[s], j = e.sCount[s], P = e.listIndent;
    if (e.listIndent = e.blkIndent, e.blkIndent = R, e.tight = !0, e.tShift[s] = w - e.bMarks[s], e.sCount[s] = b, w >= u && e.isEmpty(s + 1) ? e.line = Math.min(e.line + 2, r) : e.md.block.tokenize(e, s, r, !0), (!e.tight || C) && (c = !1), C = e.line - s > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = P, e.tShift[s] = I, e.sCount[s] = j, e.tight = T, i = e.push("list_item_close", "li", -1), i.markup = String.fromCharCode(h), s = e.line, k[1] = s, s >= r || e.sCount[s] < e.blkIndent || e.sCount[s] - e.blkIndent >= 4)
      break;
    let M = !1;
    for (let L = 0, $ = m.length; L < $; L++)
      if (m[L](e, s, r, !0)) {
        M = !0;
        break;
      }
    if (M)
      break;
    if (d) {
      if (v = _c(e, s), v < 0)
        break;
      o = e.bMarks[s] + e.tShift[s];
    } else if (v = xc(e, s), v < 0)
      break;
    if (h !== e.src.charCodeAt(v - 1))
      break;
  }
  return d ? i = e.push("ordered_list_close", "ol", -1) : i = e.push("bullet_list_close", "ul", -1), i.markup = String.fromCharCode(h), p[1] = s, e.line = s, e.parentType = y, c && Gy(e, g), !0;
}
function Xy(e, t, r, n) {
  let u = e.bMarks[t] + e.tShift[t], a = e.eMarks[t], o = t + 1;
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(u) !== 91)
    return !1;
  function i(m) {
    const y = e.lineMax;
    if (m >= y || e.isEmpty(m))
      return null;
    let E = !1;
    if (e.sCount[m] - e.blkIndent > 3 && (E = !0), e.sCount[m] < 0 && (E = !0), !E) {
      const S = e.md.block.ruler.getRules("reference"), R = e.parentType;
      e.parentType = "reference";
      let k = !1;
      for (let T = 0, I = S.length; T < I; T++)
        if (S[T](e, m, y, !0)) {
          k = !0;
          break;
        }
      if (e.parentType = R, k)
        return null;
    }
    const b = e.bMarks[m] + e.tShift[m], w = e.eMarks[m];
    return e.src.slice(b, w + 1);
  }
  let s = e.src.slice(u, a + 1);
  a = s.length;
  let c = -1;
  for (u = 1; u < a; u++) {
    const m = s.charCodeAt(u);
    if (m === 91)
      return !1;
    if (m === 93) {
      c = u;
      break;
    } else if (m === 10) {
      const y = i(o);
      y !== null && (s += y, a = s.length, o++);
    } else if (m === 92 && (u++, u < a && s.charCodeAt(u) === 10)) {
      const y = i(o);
      y !== null && (s += y, a = s.length, o++);
    }
  }
  if (c < 0 || s.charCodeAt(c + 1) !== 58)
    return !1;
  for (u = c + 2; u < a; u++) {
    const m = s.charCodeAt(u);
    if (m === 10) {
      const y = i(o);
      y !== null && (s += y, a = s.length, o++);
    } else if (!Te(m)) break;
  }
  const l = e.md.helpers.parseLinkDestination(s, u, a);
  if (!l.ok)
    return !1;
  const d = e.md.normalizeLink(l.str);
  if (!e.md.validateLink(d))
    return !1;
  u = l.pos;
  const f = u, v = o, h = u;
  for (; u < a; u++) {
    const m = s.charCodeAt(u);
    if (m === 10) {
      const y = i(o);
      y !== null && (s += y, a = s.length, o++);
    } else if (!Te(m)) break;
  }
  let g = e.md.helpers.parseLinkTitle(s, u, a);
  for (; g.can_continue; ) {
    const m = i(o);
    if (m === null) break;
    s += m, u = a, a = s.length, o++, g = e.md.helpers.parseLinkTitle(s, u, a, g);
  }
  let p;
  for (u < a && h !== u && g.ok ? (p = g.str, u = g.pos) : (p = "", u = f, o = v); u < a; ) {
    const m = s.charCodeAt(u);
    if (!Te(m))
      break;
    u++;
  }
  if (u < a && s.charCodeAt(u) !== 10 && p)
    for (p = "", u = f, o = v; u < a; ) {
      const m = s.charCodeAt(u);
      if (!Te(m))
        break;
      u++;
    }
  if (u < a && s.charCodeAt(u) !== 10)
    return !1;
  const C = ma(s.slice(1, c));
  return C ? (n || (typeof e.env.references > "u" && (e.env.references = {}), typeof e.env.references[C] > "u" && (e.env.references[C] = { title: p, href: d }), e.line = o), !0) : !1;
}
const Zy = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Jy = "[a-zA-Z_:][a-zA-Z0-9:._-]*", Qy = "[^\"'=<>`\\x00-\\x20]+", ex = "'[^']*'", tx = '"[^"]*"', rx = "(?:" + Qy + "|" + ex + "|" + tx + ")", nx = "(?:\\s+" + Jy + "(?:\\s*=\\s*" + rx + ")?)", ff = "<[A-Za-z][A-Za-z0-9\\-]*" + nx + "*\\s*\\/?>", hf = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", ux = "<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->", ax = "<[?][\\s\\S]*?[?]>", ox = "<![A-Za-z][^>]*>", ix = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", sx = new RegExp("^(?:" + ff + "|" + hf + "|" + ux + "|" + ax + "|" + ox + "|" + ix + ")"), cx = new RegExp("^(?:" + ff + "|" + hf + ")"), yr = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
  [/^<!--/, /-->/, !0],
  [/^<\?/, /\?>/, !0],
  [/^<![A-Z]/, />/, !0],
  [/^<!\[CDATA\[/, /\]\]>/, !0],
  [new RegExp("^</?(" + Zy.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
  [new RegExp(cx.source + "\\s*$"), /^$/, !1]
];
function lx(e, t, r, n) {
  let u = e.bMarks[t] + e.tShift[t], a = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(u) !== 60)
    return !1;
  let o = e.src.slice(u, a), i = 0;
  for (; i < yr.length && !yr[i][0].test(o); i++)
    ;
  if (i === yr.length)
    return !1;
  if (n)
    return yr[i][2];
  let s = t + 1;
  if (!yr[i][1].test(o)) {
    for (; s < r && !(e.sCount[s] < e.blkIndent); s++)
      if (u = e.bMarks[s] + e.tShift[s], a = e.eMarks[s], o = e.src.slice(u, a), yr[i][1].test(o)) {
        o.length !== 0 && s++;
        break;
      }
  }
  e.line = s;
  const c = e.push("html_block", "", 0);
  return c.map = [t, s], c.content = e.getLines(t, s, e.blkIndent, !0), !0;
}
function dx(e, t, r, n) {
  let u = e.bMarks[t] + e.tShift[t], a = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  let o = e.src.charCodeAt(u);
  if (o !== 35 || u >= a)
    return !1;
  let i = 1;
  for (o = e.src.charCodeAt(++u); o === 35 && u < a && i <= 6; )
    i++, o = e.src.charCodeAt(++u);
  if (i > 6 || u < a && !Te(o))
    return !1;
  if (n)
    return !0;
  a = e.skipSpacesBack(a, u);
  const s = e.skipCharsBack(a, 35, u);
  s > u && Te(e.src.charCodeAt(s - 1)) && (a = s), e.line = t + 1;
  const c = e.push("heading_open", "h" + String(i), 1);
  c.markup = "########".slice(0, i), c.map = [t, e.line];
  const l = e.push("inline", "", 0);
  l.content = e.src.slice(u, a).trim(), l.map = [t, e.line], l.children = [];
  const d = e.push("heading_close", "h" + String(i), -1);
  return d.markup = "########".slice(0, i), !0;
}
function fx(e, t, r) {
  const n = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  const u = e.parentType;
  e.parentType = "paragraph";
  let a = 0, o, i = t + 1;
  for (; i < r && !e.isEmpty(i); i++) {
    if (e.sCount[i] - e.blkIndent > 3)
      continue;
    if (e.sCount[i] >= e.blkIndent) {
      let v = e.bMarks[i] + e.tShift[i];
      const h = e.eMarks[i];
      if (v < h && (o = e.src.charCodeAt(v), (o === 45 || o === 61) && (v = e.skipChars(v, o), v = e.skipSpaces(v), v >= h))) {
        a = o === 61 ? 1 : 2;
        break;
      }
    }
    if (e.sCount[i] < 0)
      continue;
    let f = !1;
    for (let v = 0, h = n.length; v < h; v++)
      if (n[v](e, i, r, !0)) {
        f = !0;
        break;
      }
    if (f)
      break;
  }
  if (!a)
    return !1;
  const s = e.getLines(t, i, e.blkIndent, !1).trim();
  e.line = i + 1;
  const c = e.push("heading_open", "h" + String(a), 1);
  c.markup = String.fromCharCode(o), c.map = [t, e.line];
  const l = e.push("inline", "", 0);
  l.content = s, l.map = [t, e.line - 1], l.children = [];
  const d = e.push("heading_close", "h" + String(a), -1);
  return d.markup = String.fromCharCode(o), e.parentType = u, !0;
}
function hx(e, t, r) {
  const n = e.md.block.ruler.getRules("paragraph"), u = e.parentType;
  let a = t + 1;
  for (e.parentType = "paragraph"; a < r && !e.isEmpty(a); a++) {
    if (e.sCount[a] - e.blkIndent > 3 || e.sCount[a] < 0)
      continue;
    let c = !1;
    for (let l = 0, d = n.length; l < d; l++)
      if (n[l](e, a, r, !0)) {
        c = !0;
        break;
      }
    if (c)
      break;
  }
  const o = e.getLines(t, a, e.blkIndent, !1).trim();
  e.line = a;
  const i = e.push("paragraph_open", "p", 1);
  i.map = [t, e.line];
  const s = e.push("inline", "", 0);
  return s.content = o, s.map = [t, e.line], s.children = [], e.push("paragraph_close", "p", -1), e.parentType = u, !0;
}
const iu = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", Hy, ["paragraph", "reference"]],
  ["code", qy],
  ["fence", Wy, ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", Uy, ["paragraph", "reference", "blockquote", "list"]],
  ["hr", Yy, ["paragraph", "reference", "blockquote", "list"]],
  ["list", Ky, ["paragraph", "reference", "blockquote"]],
  ["reference", Xy],
  ["html_block", lx, ["paragraph", "reference", "blockquote"]],
  ["heading", dx, ["paragraph", "reference", "blockquote"]],
  ["lheading", fx],
  ["paragraph", hx]
];
function ga() {
  this.ruler = new rt();
  for (let e = 0; e < iu.length; e++)
    this.ruler.push(iu[e][0], iu[e][1], { alt: (iu[e][2] || []).slice() });
}
ga.prototype.tokenize = function(e, t, r) {
  const n = this.ruler.getRules(""), u = n.length, a = e.md.options.maxNesting;
  let o = t, i = !1;
  for (; o < r && (e.line = o = e.skipEmptyLines(o), !(o >= r || e.sCount[o] < e.blkIndent)); ) {
    if (e.level >= a) {
      e.line = r;
      break;
    }
    const s = e.line;
    let c = !1;
    for (let l = 0; l < u; l++)
      if (c = n[l](e, o, r, !1), c) {
        if (s >= e.line)
          throw new Error("block rule didn't increment state.line");
        break;
      }
    if (!c) throw new Error("none of the block rules matched");
    e.tight = !i, e.isEmpty(e.line - 1) && (i = !0), o = e.line, o < r && e.isEmpty(o) && (i = !0, o++, e.line = o);
  }
};
ga.prototype.parse = function(e, t, r, n) {
  if (!e)
    return;
  const u = new this.State(e, t, r, n);
  this.tokenize(u, u.line, u.lineMax);
};
ga.prototype.State = jt;
function Bn(e, t, r, n) {
  this.src = e, this.env = r, this.md = t, this.tokens = n, this.tokens_meta = Array(n.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
}
Bn.prototype.pushPending = function() {
  const e = new Dt("text", "", 0);
  return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), this.pending = "", e;
};
Bn.prototype.push = function(e, t, r) {
  this.pending && this.pushPending();
  const n = new Dt(e, t, r);
  let u = null;
  return r < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), n.level = this.level, r > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], u = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(n), this.tokens_meta.push(u), n;
};
Bn.prototype.scanDelims = function(e, t) {
  const r = this.posMax, n = this.src.charCodeAt(e), u = e > 0 ? this.src.charCodeAt(e - 1) : 32;
  let a = e;
  for (; a < r && this.src.charCodeAt(a) === n; )
    a++;
  const o = a - e, i = a < r ? this.src.charCodeAt(a) : 32, s = xn(u) || yn(String.fromCharCode(u)), c = xn(i) || yn(String.fromCharCode(i)), l = bn(u), d = bn(i), f = !d && (!c || l || s), v = !l && (!s || d || c);
  return { can_open: f && (t || !v || s), can_close: v && (t || !f || c), length: o };
};
Bn.prototype.Token = Dt;
function px(e) {
  switch (e) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function mx(e, t) {
  let r = e.pos;
  for (; r < e.posMax && !px(e.src.charCodeAt(r)); )
    r++;
  return r === e.pos ? !1 : (t || (e.pending += e.src.slice(e.pos, r)), e.pos = r, !0);
}
const gx = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
function vx(e, t) {
  if (!e.md.options.linkify || e.linkLevel > 0) return !1;
  const r = e.pos, n = e.posMax;
  if (r + 3 > n || e.src.charCodeAt(r) !== 58 || e.src.charCodeAt(r + 1) !== 47 || e.src.charCodeAt(r + 2) !== 47) return !1;
  const u = e.pending.match(gx);
  if (!u) return !1;
  const a = u[1], o = e.md.linkify.matchAtStart(e.src.slice(r - a.length));
  if (!o) return !1;
  let i = o.url;
  if (i.length <= a.length) return !1;
  i = i.replace(/\*+$/, "");
  const s = e.md.normalizeLink(i);
  if (!e.md.validateLink(s)) return !1;
  if (!t) {
    e.pending = e.pending.slice(0, -a.length);
    const c = e.push("link_open", "a", 1);
    c.attrs = [["href", s]], c.markup = "linkify", c.info = "auto";
    const l = e.push("text", "", 0);
    l.content = e.md.normalizeLinkText(i);
    const d = e.push("link_close", "a", -1);
    d.markup = "linkify", d.info = "auto";
  }
  return e.pos += i.length - a.length, !0;
}
function bx(e, t) {
  let r = e.pos;
  if (e.src.charCodeAt(r) !== 10)
    return !1;
  const n = e.pending.length - 1, u = e.posMax;
  if (!t)
    if (n >= 0 && e.pending.charCodeAt(n) === 32)
      if (n >= 1 && e.pending.charCodeAt(n - 1) === 32) {
        let a = n - 1;
        for (; a >= 1 && e.pending.charCodeAt(a - 1) === 32; ) a--;
        e.pending = e.pending.slice(0, a), e.push("hardbreak", "br", 0);
      } else
        e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
    else
      e.push("softbreak", "br", 0);
  for (r++; r < u && Te(e.src.charCodeAt(r)); )
    r++;
  return e.pos = r, !0;
}
const Oi = [];
for (let e = 0; e < 256; e++)
  Oi.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
  Oi[e.charCodeAt(0)] = 1;
});
function yx(e, t) {
  let r = e.pos;
  const n = e.posMax;
  if (e.src.charCodeAt(r) !== 92 || (r++, r >= n)) return !1;
  let u = e.src.charCodeAt(r);
  if (u === 10) {
    for (t || e.push("hardbreak", "br", 0), r++; r < n && (u = e.src.charCodeAt(r), !!Te(u)); )
      r++;
    return e.pos = r, !0;
  }
  let a = e.src[r];
  if (u >= 55296 && u <= 56319 && r + 1 < n) {
    const i = e.src.charCodeAt(r + 1);
    i >= 56320 && i <= 57343 && (a += e.src[r + 1], r++);
  }
  const o = "\\" + a;
  if (!t) {
    const i = e.push("text_special", "", 0);
    u < 256 && Oi[u] !== 0 ? i.content = a : i.content = o, i.markup = o, i.info = "escape";
  }
  return e.pos = r + 1, !0;
}
function xx(e, t) {
  let r = e.pos;
  if (e.src.charCodeAt(r) !== 96)
    return !1;
  const u = r;
  r++;
  const a = e.posMax;
  for (; r < a && e.src.charCodeAt(r) === 96; )
    r++;
  const o = e.src.slice(u, r), i = o.length;
  if (e.backticksScanned && (e.backticks[i] || 0) <= u)
    return t || (e.pending += o), e.pos += i, !0;
  let s = r, c;
  for (; (c = e.src.indexOf("`", s)) !== -1; ) {
    for (s = c + 1; s < a && e.src.charCodeAt(s) === 96; )
      s++;
    const l = s - c;
    if (l === i) {
      if (!t) {
        const d = e.push("code_inline", "code", 0);
        d.markup = o, d.content = e.src.slice(r, c).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
      }
      return e.pos = s, !0;
    }
    e.backticks[l] = c;
  }
  return e.backticksScanned = !0, t || (e.pending += o), e.pos += i, !0;
}
function _x(e, t) {
  const r = e.pos, n = e.src.charCodeAt(r);
  if (t || n !== 126)
    return !1;
  const u = e.scanDelims(e.pos, !0);
  let a = u.length;
  const o = String.fromCharCode(n);
  if (a < 2)
    return !1;
  let i;
  a % 2 && (i = e.push("text", "", 0), i.content = o, a--);
  for (let s = 0; s < a; s += 2)
    i = e.push("text", "", 0), i.content = o + o, e.delimiters.push({
      marker: n,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: e.tokens.length - 1,
      end: -1,
      open: u.can_open,
      close: u.can_close
    });
  return e.pos += u.length, !0;
}
function Cc(e, t) {
  let r;
  const n = [], u = t.length;
  for (let a = 0; a < u; a++) {
    const o = t[a];
    if (o.marker !== 126 || o.end === -1)
      continue;
    const i = t[o.end];
    r = e.tokens[o.token], r.type = "s_open", r.tag = "s", r.nesting = 1, r.markup = "~~", r.content = "", r = e.tokens[i.token], r.type = "s_close", r.tag = "s", r.nesting = -1, r.markup = "~~", r.content = "", e.tokens[i.token - 1].type === "text" && e.tokens[i.token - 1].content === "~" && n.push(i.token - 1);
  }
  for (; n.length; ) {
    const a = n.pop();
    let o = a + 1;
    for (; o < e.tokens.length && e.tokens[o].type === "s_close"; )
      o++;
    o--, a !== o && (r = e.tokens[o], e.tokens[o] = e.tokens[a], e.tokens[a] = r);
  }
}
function Cx(e) {
  const t = e.tokens_meta, r = e.tokens_meta.length;
  Cc(e, e.delimiters);
  for (let n = 0; n < r; n++)
    t[n] && t[n].delimiters && Cc(e, t[n].delimiters);
}
const pf = {
  tokenize: _x,
  postProcess: Cx
};
function Ex(e, t) {
  const r = e.pos, n = e.src.charCodeAt(r);
  if (t || n !== 95 && n !== 42)
    return !1;
  const u = e.scanDelims(e.pos, n === 42);
  for (let a = 0; a < u.length; a++) {
    const o = e.push("text", "", 0);
    o.content = String.fromCharCode(n), e.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: n,
      // Total length of these series of delimiters.
      //
      length: u.length,
      // A position of the token this delimiter corresponds to.
      //
      token: e.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: u.can_open,
      close: u.can_close
    });
  }
  return e.pos += u.length, !0;
}
function Ec(e, t) {
  const r = t.length;
  for (let n = r - 1; n >= 0; n--) {
    const u = t[n];
    if (u.marker !== 95 && u.marker !== 42 || u.end === -1)
      continue;
    const a = t[u.end], o = n > 0 && t[n - 1].end === u.end + 1 && // check that first two markers match and adjacent
    t[n - 1].marker === u.marker && t[n - 1].token === u.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    t[u.end + 1].token === a.token + 1, i = String.fromCharCode(u.marker), s = e.tokens[u.token];
    s.type = o ? "strong_open" : "em_open", s.tag = o ? "strong" : "em", s.nesting = 1, s.markup = o ? i + i : i, s.content = "";
    const c = e.tokens[a.token];
    c.type = o ? "strong_close" : "em_close", c.tag = o ? "strong" : "em", c.nesting = -1, c.markup = o ? i + i : i, c.content = "", o && (e.tokens[t[n - 1].token].content = "", e.tokens[t[u.end + 1].token].content = "", n--);
  }
}
function Sx(e) {
  const t = e.tokens_meta, r = e.tokens_meta.length;
  Ec(e, e.delimiters);
  for (let n = 0; n < r; n++)
    t[n] && t[n].delimiters && Ec(e, t[n].delimiters);
}
const mf = {
  tokenize: Ex,
  postProcess: Sx
};
function wx(e, t) {
  let r, n, u, a, o = "", i = "", s = e.pos, c = !0;
  if (e.src.charCodeAt(e.pos) !== 91)
    return !1;
  const l = e.pos, d = e.posMax, f = e.pos + 1, v = e.md.helpers.parseLinkLabel(e, e.pos, !0);
  if (v < 0)
    return !1;
  let h = v + 1;
  if (h < d && e.src.charCodeAt(h) === 40) {
    for (c = !1, h++; h < d && (r = e.src.charCodeAt(h), !(!Te(r) && r !== 10)); h++)
      ;
    if (h >= d)
      return !1;
    if (s = h, u = e.md.helpers.parseLinkDestination(e.src, h, e.posMax), u.ok) {
      for (o = e.md.normalizeLink(u.str), e.md.validateLink(o) ? h = u.pos : o = "", s = h; h < d && (r = e.src.charCodeAt(h), !(!Te(r) && r !== 10)); h++)
        ;
      if (u = e.md.helpers.parseLinkTitle(e.src, h, e.posMax), h < d && s !== h && u.ok)
        for (i = u.str, h = u.pos; h < d && (r = e.src.charCodeAt(h), !(!Te(r) && r !== 10)); h++)
          ;
    }
    (h >= d || e.src.charCodeAt(h) !== 41) && (c = !0), h++;
  }
  if (c) {
    if (typeof e.env.references > "u")
      return !1;
    if (h < d && e.src.charCodeAt(h) === 91 ? (s = h + 1, h = e.md.helpers.parseLinkLabel(e, h), h >= 0 ? n = e.src.slice(s, h++) : h = v + 1) : h = v + 1, n || (n = e.src.slice(f, v)), a = e.env.references[ma(n)], !a)
      return e.pos = l, !1;
    o = a.href, i = a.title;
  }
  if (!t) {
    e.pos = f, e.posMax = v;
    const g = e.push("link_open", "a", 1), p = [["href", o]];
    g.attrs = p, i && p.push(["title", i]), e.linkLevel++, e.md.inline.tokenize(e), e.linkLevel--, e.push("link_close", "a", -1);
  }
  return e.pos = h, e.posMax = d, !0;
}
function $x(e, t) {
  let r, n, u, a, o, i, s, c, l = "";
  const d = e.pos, f = e.posMax;
  if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91)
    return !1;
  const v = e.pos + 2, h = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1);
  if (h < 0)
    return !1;
  if (a = h + 1, a < f && e.src.charCodeAt(a) === 40) {
    for (a++; a < f && (r = e.src.charCodeAt(a), !(!Te(r) && r !== 10)); a++)
      ;
    if (a >= f)
      return !1;
    for (c = a, i = e.md.helpers.parseLinkDestination(e.src, a, e.posMax), i.ok && (l = e.md.normalizeLink(i.str), e.md.validateLink(l) ? a = i.pos : l = ""), c = a; a < f && (r = e.src.charCodeAt(a), !(!Te(r) && r !== 10)); a++)
      ;
    if (i = e.md.helpers.parseLinkTitle(e.src, a, e.posMax), a < f && c !== a && i.ok)
      for (s = i.str, a = i.pos; a < f && (r = e.src.charCodeAt(a), !(!Te(r) && r !== 10)); a++)
        ;
    else
      s = "";
    if (a >= f || e.src.charCodeAt(a) !== 41)
      return e.pos = d, !1;
    a++;
  } else {
    if (typeof e.env.references > "u")
      return !1;
    if (a < f && e.src.charCodeAt(a) === 91 ? (c = a + 1, a = e.md.helpers.parseLinkLabel(e, a), a >= 0 ? u = e.src.slice(c, a++) : a = h + 1) : a = h + 1, u || (u = e.src.slice(v, h)), o = e.env.references[ma(u)], !o)
      return e.pos = d, !1;
    l = o.href, s = o.title;
  }
  if (!t) {
    n = e.src.slice(v, h);
    const g = [];
    e.md.inline.parse(
      n,
      e.md,
      e.env,
      g
    );
    const p = e.push("image", "img", 0), C = [["src", l], ["alt", ""]];
    p.attrs = C, p.children = g, p.content = n, s && C.push(["title", s]);
  }
  return e.pos = a, e.posMax = f, !0;
}
const Fx = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, kx = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function Ax(e, t) {
  let r = e.pos;
  if (e.src.charCodeAt(r) !== 60)
    return !1;
  const n = e.pos, u = e.posMax;
  for (; ; ) {
    if (++r >= u) return !1;
    const o = e.src.charCodeAt(r);
    if (o === 60) return !1;
    if (o === 62) break;
  }
  const a = e.src.slice(n + 1, r);
  if (kx.test(a)) {
    const o = e.md.normalizeLink(a);
    if (!e.md.validateLink(o))
      return !1;
    if (!t) {
      const i = e.push("link_open", "a", 1);
      i.attrs = [["href", o]], i.markup = "autolink", i.info = "auto";
      const s = e.push("text", "", 0);
      s.content = e.md.normalizeLinkText(a);
      const c = e.push("link_close", "a", -1);
      c.markup = "autolink", c.info = "auto";
    }
    return e.pos += a.length + 2, !0;
  }
  if (Fx.test(a)) {
    const o = e.md.normalizeLink("mailto:" + a);
    if (!e.md.validateLink(o))
      return !1;
    if (!t) {
      const i = e.push("link_open", "a", 1);
      i.attrs = [["href", o]], i.markup = "autolink", i.info = "auto";
      const s = e.push("text", "", 0);
      s.content = e.md.normalizeLinkText(a);
      const c = e.push("link_close", "a", -1);
      c.markup = "autolink", c.info = "auto";
    }
    return e.pos += a.length + 2, !0;
  }
  return !1;
}
function Dx(e) {
  return /^<a[>\s]/i.test(e);
}
function Tx(e) {
  return /^<\/a\s*>/i.test(e);
}
function Rx(e) {
  const t = e | 32;
  return t >= 97 && t <= 122;
}
function Px(e, t) {
  if (!e.md.options.html)
    return !1;
  const r = e.posMax, n = e.pos;
  if (e.src.charCodeAt(n) !== 60 || n + 2 >= r)
    return !1;
  const u = e.src.charCodeAt(n + 1);
  if (u !== 33 && u !== 63 && u !== 47 && !Rx(u))
    return !1;
  const a = e.src.slice(n).match(sx);
  if (!a)
    return !1;
  if (!t) {
    const o = e.push("html_inline", "", 0);
    o.content = a[0], Dx(o.content) && e.linkLevel++, Tx(o.content) && e.linkLevel--;
  }
  return e.pos += a[0].length, !0;
}
const Ox = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, Mx = /^&([a-z][a-z0-9]{1,31});/i;
function Ix(e, t) {
  const r = e.pos, n = e.posMax;
  if (e.src.charCodeAt(r) !== 38 || r + 1 >= n) return !1;
  if (e.src.charCodeAt(r + 1) === 35) {
    const a = e.src.slice(r).match(Ox);
    if (a) {
      if (!t) {
        const o = a[1][0].toLowerCase() === "x" ? parseInt(a[1].slice(1), 16) : parseInt(a[1], 10), i = e.push("text_special", "", 0);
        i.content = Ri(o) ? $u(o) : $u(65533), i.markup = a[0], i.info = "entity";
      }
      return e.pos += a[0].length, !0;
    }
  } else {
    const a = e.src.slice(r).match(Mx);
    if (a) {
      const o = of(a[0]);
      if (o !== a[0]) {
        if (!t) {
          const i = e.push("text_special", "", 0);
          i.content = o, i.markup = a[0], i.info = "entity";
        }
        return e.pos += a[0].length, !0;
      }
    }
  }
  return !1;
}
function Sc(e) {
  const t = {}, r = e.length;
  if (!r) return;
  let n = 0, u = -2;
  const a = [];
  for (let o = 0; o < r; o++) {
    const i = e[o];
    if (a.push(0), (e[n].marker !== i.marker || u !== i.token - 1) && (n = o), u = i.token, i.length = i.length || 0, !i.close) continue;
    t.hasOwnProperty(i.marker) || (t[i.marker] = [-1, -1, -1, -1, -1, -1]);
    const s = t[i.marker][(i.open ? 3 : 0) + i.length % 3];
    let c = n - a[n] - 1, l = c;
    for (; c > s; c -= a[c] + 1) {
      const d = e[c];
      if (d.marker === i.marker && d.open && d.end < 0) {
        let f = !1;
        if ((d.close || i.open) && (d.length + i.length) % 3 === 0 && (d.length % 3 !== 0 || i.length % 3 !== 0) && (f = !0), !f) {
          const v = c > 0 && !e[c - 1].open ? a[c - 1] + 1 : 0;
          a[o] = o - c + v, a[c] = v, i.open = !1, d.end = o, d.close = !1, l = -1, u = -2;
          break;
        }
      }
    }
    l !== -1 && (t[i.marker][(i.open ? 3 : 0) + (i.length || 0) % 3] = l);
  }
}
function Nx(e) {
  const t = e.tokens_meta, r = e.tokens_meta.length;
  Sc(e.delimiters);
  for (let n = 0; n < r; n++)
    t[n] && t[n].delimiters && Sc(t[n].delimiters);
}
function jx(e) {
  let t, r, n = 0;
  const u = e.tokens, a = e.tokens.length;
  for (t = r = 0; t < a; t++)
    u[t].nesting < 0 && n--, u[t].level = n, u[t].nesting > 0 && n++, u[t].type === "text" && t + 1 < a && u[t + 1].type === "text" ? u[t + 1].content = u[t].content + u[t + 1].content : (t !== r && (u[r] = u[t]), r++);
  t !== r && (u.length = r);
}
const Ha = [
  ["text", mx],
  ["linkify", vx],
  ["newline", bx],
  ["escape", yx],
  ["backticks", xx],
  ["strikethrough", pf.tokenize],
  ["emphasis", mf.tokenize],
  ["link", wx],
  ["image", $x],
  ["autolink", Ax],
  ["html_inline", Px],
  ["entity", Ix]
], qa = [
  ["balance_pairs", Nx],
  ["strikethrough", pf.postProcess],
  ["emphasis", mf.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ["fragments_join", jx]
];
function Vn() {
  this.ruler = new rt();
  for (let e = 0; e < Ha.length; e++)
    this.ruler.push(Ha[e][0], Ha[e][1]);
  this.ruler2 = new rt();
  for (let e = 0; e < qa.length; e++)
    this.ruler2.push(qa[e][0], qa[e][1]);
}
Vn.prototype.skipToken = function(e) {
  const t = e.pos, r = this.ruler.getRules(""), n = r.length, u = e.md.options.maxNesting, a = e.cache;
  if (typeof a[t] < "u") {
    e.pos = a[t];
    return;
  }
  let o = !1;
  if (e.level < u) {
    for (let i = 0; i < n; i++)
      if (e.level++, o = r[i](e, !0), e.level--, o) {
        if (t >= e.pos)
          throw new Error("inline rule didn't increment state.pos");
        break;
      }
  } else
    e.pos = e.posMax;
  o || e.pos++, a[t] = e.pos;
};
Vn.prototype.tokenize = function(e) {
  const t = this.ruler.getRules(""), r = t.length, n = e.posMax, u = e.md.options.maxNesting;
  for (; e.pos < n; ) {
    const a = e.pos;
    let o = !1;
    if (e.level < u) {
      for (let i = 0; i < r; i++)
        if (o = t[i](e, !1), o) {
          if (a >= e.pos)
            throw new Error("inline rule didn't increment state.pos");
          break;
        }
    }
    if (o) {
      if (e.pos >= n)
        break;
      continue;
    }
    e.pending += e.src[e.pos++];
  }
  e.pending && e.pushPending();
};
Vn.prototype.parse = function(e, t, r, n) {
  const u = new this.State(e, t, r, n);
  this.tokenize(u);
  const a = this.ruler2.getRules(""), o = a.length;
  for (let i = 0; i < o; i++)
    a[i](u);
};
Vn.prototype.State = Bn;
function Lx(e) {
  const t = {};
  e = e || {}, t.src_Any = tf.source, t.src_Cc = rf.source, t.src_Z = uf.source, t.src_P = Di.source, t.src_ZPCc = [t.src_Z, t.src_P, t.src_Cc].join("|"), t.src_ZCc = [t.src_Z, t.src_Cc].join("|");
  const r = "[><｜]";
  return t.src_pseudo_letter = "(?:(?!" + r + "|" + t.src_ZPCc + ")" + t.src_Any + ")", t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", t.src_auth = "(?:(?:(?!" + t.src_ZCc + "|[@/\\[\\]()]).)+@)?", t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", t.src_host_terminator = "(?=$|" + r + "|" + t.src_ZPCc + ")(?!" + (e["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + t.src_ZPCc + "))", t.src_path = "(?:[/?#](?:(?!" + t.src_ZCc + "|" + r + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + t.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + t.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + t.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + t.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + t.src_ZCc + "|[']).)+\\'|\\'(?=" + t.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + t.src_ZCc + "|[.]|$)|" + (e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + // allow `,,,` in paths
  ",(?!" + t.src_ZCc + "|$)|;(?!" + t.src_ZCc + "|$)|\\!+(?!" + t.src_ZCc + "|[!]|$)|\\?(?!" + t.src_ZCc + "|[?]|$))+|\\/)?", t.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', t.src_xn = "xn--[a-z0-9\\-]{1,59}", t.src_domain_root = // Allow letters & digits (http://test1)
  "(?:" + t.src_xn + "|" + t.src_pseudo_letter + "{1,63})", t.src_domain = "(?:" + t.src_xn + "|(?:" + t.src_pseudo_letter + ")|(?:" + t.src_pseudo_letter + "(?:-|" + t.src_pseudo_letter + "){0,61}" + t.src_pseudo_letter + "))", t.src_host = "(?:(?:(?:(?:" + t.src_domain + ")\\.)*" + t.src_domain + "))", t.tpl_host_fuzzy = "(?:" + t.src_ip4 + "|(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%)))", t.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%))", t.src_host_strict = t.src_host + t.src_host_terminator, t.tpl_host_fuzzy_strict = t.tpl_host_fuzzy + t.src_host_terminator, t.src_host_port_strict = t.src_host + t.src_port + t.src_host_terminator, t.tpl_host_port_fuzzy_strict = t.tpl_host_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_port_no_ip_fuzzy_strict = t.tpl_host_no_ip_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + t.src_ZPCc + "|>|$))", t.tpl_email_fuzzy = "(^|" + r + '|"|\\(|' + t.src_ZCc + ")(" + t.src_email_name + "@" + t.tpl_host_fuzzy_strict + ")", t.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_fuzzy_strict + t.src_path + ")", t.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_no_ip_fuzzy_strict + t.src_path + ")", t;
}
function Wo(e) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(r) {
    r && Object.keys(r).forEach(function(n) {
      e[n] = r[n];
    });
  }), e;
}
function va(e) {
  return Object.prototype.toString.call(e);
}
function zx(e) {
  return va(e) === "[object String]";
}
function Bx(e) {
  return va(e) === "[object Object]";
}
function Vx(e) {
  return va(e) === "[object RegExp]";
}
function wc(e) {
  return va(e) === "[object Function]";
}
function Hx(e) {
  return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
const gf = {
  fuzzyLink: !0,
  fuzzyEmail: !0,
  fuzzyIP: !1
};
function qx(e) {
  return Object.keys(e || {}).reduce(function(t, r) {
    return t || gf.hasOwnProperty(r);
  }, !1);
}
const Wx = {
  "http:": {
    validate: function(e, t, r) {
      const n = e.slice(t);
      return r.re.http || (r.re.http = new RegExp(
        "^\\/\\/" + r.re.src_auth + r.re.src_host_port_strict + r.re.src_path,
        "i"
      )), r.re.http.test(n) ? n.match(r.re.http)[0].length : 0;
    }
  },
  "https:": "http:",
  "ftp:": "http:",
  "//": {
    validate: function(e, t, r) {
      const n = e.slice(t);
      return r.re.no_http || (r.re.no_http = new RegExp(
        "^" + r.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
        // with code comments
        "(?:localhost|(?:(?:" + r.re.src_domain + ")\\.)+" + r.re.src_domain_root + ")" + r.re.src_port + r.re.src_host_terminator + r.re.src_path,
        "i"
      )), r.re.no_http.test(n) ? t >= 3 && e[t - 3] === ":" || t >= 3 && e[t - 3] === "/" ? 0 : n.match(r.re.no_http)[0].length : 0;
    }
  },
  "mailto:": {
    validate: function(e, t, r) {
      const n = e.slice(t);
      return r.re.mailto || (r.re.mailto = new RegExp(
        "^" + r.re.src_email_name + "@" + r.re.src_host_strict,
        "i"
      )), r.re.mailto.test(n) ? n.match(r.re.mailto)[0].length : 0;
    }
  }
}, Ux = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", Yx = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function Gx(e) {
  e.__index__ = -1, e.__text_cache__ = "";
}
function Kx(e) {
  return function(t, r) {
    const n = t.slice(r);
    return e.test(n) ? n.match(e)[0].length : 0;
  };
}
function $c() {
  return function(e, t) {
    t.normalize(e);
  };
}
function Fu(e) {
  const t = e.re = Lx(e.__opts__), r = e.__tlds__.slice();
  e.onCompile(), e.__tlds_replaced__ || r.push(Ux), r.push(t.src_xn), t.src_tlds = r.join("|");
  function n(i) {
    return i.replace("%TLDS%", t.src_tlds);
  }
  t.email_fuzzy = RegExp(n(t.tpl_email_fuzzy), "i"), t.link_fuzzy = RegExp(n(t.tpl_link_fuzzy), "i"), t.link_no_ip_fuzzy = RegExp(n(t.tpl_link_no_ip_fuzzy), "i"), t.host_fuzzy_test = RegExp(n(t.tpl_host_fuzzy_test), "i");
  const u = [];
  e.__compiled__ = {};
  function a(i, s) {
    throw new Error('(LinkifyIt) Invalid schema "' + i + '": ' + s);
  }
  Object.keys(e.__schemas__).forEach(function(i) {
    const s = e.__schemas__[i];
    if (s === null)
      return;
    const c = { validate: null, link: null };
    if (e.__compiled__[i] = c, Bx(s)) {
      Vx(s.validate) ? c.validate = Kx(s.validate) : wc(s.validate) ? c.validate = s.validate : a(i, s), wc(s.normalize) ? c.normalize = s.normalize : s.normalize ? a(i, s) : c.normalize = $c();
      return;
    }
    if (zx(s)) {
      u.push(i);
      return;
    }
    a(i, s);
  }), u.forEach(function(i) {
    e.__compiled__[e.__schemas__[i]] && (e.__compiled__[i].validate = e.__compiled__[e.__schemas__[i]].validate, e.__compiled__[i].normalize = e.__compiled__[e.__schemas__[i]].normalize);
  }), e.__compiled__[""] = { validate: null, normalize: $c() };
  const o = Object.keys(e.__compiled__).filter(function(i) {
    return i.length > 0 && e.__compiled__[i];
  }).map(Hx).join("|");
  e.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + t.src_ZPCc + "))(" + o + ")", "i"), e.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + t.src_ZPCc + "))(" + o + ")", "ig"), e.re.schema_at_start = RegExp("^" + e.re.schema_search.source, "i"), e.re.pretest = RegExp(
    "(" + e.re.schema_test.source + ")|(" + e.re.host_fuzzy_test.source + ")|@",
    "i"
  ), Gx(e);
}
function Xx(e, t) {
  const r = e.__index__, n = e.__last_index__, u = e.__text_cache__.slice(r, n);
  this.schema = e.__schema__.toLowerCase(), this.index = r + t, this.lastIndex = n + t, this.raw = u, this.text = u, this.url = u;
}
function Uo(e, t) {
  const r = new Xx(e, t);
  return e.__compiled__[r.schema].normalize(r, e), r;
}
function pt(e, t) {
  if (!(this instanceof pt))
    return new pt(e, t);
  t || qx(e) && (t = e, e = {}), this.__opts__ = Wo({}, gf, t), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = Wo({}, Wx, e), this.__compiled__ = {}, this.__tlds__ = Yx, this.__tlds_replaced__ = !1, this.re = {}, Fu(this);
}
pt.prototype.add = function(t, r) {
  return this.__schemas__[t] = r, Fu(this), this;
};
pt.prototype.set = function(t) {
  return this.__opts__ = Wo(this.__opts__, t), this;
};
pt.prototype.test = function(t) {
  if (this.__text_cache__ = t, this.__index__ = -1, !t.length)
    return !1;
  let r, n, u, a, o, i, s, c, l;
  if (this.re.schema_test.test(t)) {
    for (s = this.re.schema_search, s.lastIndex = 0; (r = s.exec(t)) !== null; )
      if (a = this.testSchemaAt(t, r[2], s.lastIndex), a) {
        this.__schema__ = r[2], this.__index__ = r.index + r[1].length, this.__last_index__ = r.index + r[0].length + a;
        break;
      }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (c = t.search(this.re.host_fuzzy_test), c >= 0 && (this.__index__ < 0 || c < this.__index__) && (n = t.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (o = n.index + n[1].length, (this.__index__ < 0 || o < this.__index__) && (this.__schema__ = "", this.__index__ = o, this.__last_index__ = n.index + n[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (l = t.indexOf("@"), l >= 0 && (u = t.match(this.re.email_fuzzy)) !== null && (o = u.index + u[1].length, i = u.index + u[0].length, (this.__index__ < 0 || o < this.__index__ || o === this.__index__ && i > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = o, this.__last_index__ = i))), this.__index__ >= 0;
};
pt.prototype.pretest = function(t) {
  return this.re.pretest.test(t);
};
pt.prototype.testSchemaAt = function(t, r, n) {
  return this.__compiled__[r.toLowerCase()] ? this.__compiled__[r.toLowerCase()].validate(t, n, this) : 0;
};
pt.prototype.match = function(t) {
  const r = [];
  let n = 0;
  this.__index__ >= 0 && this.__text_cache__ === t && (r.push(Uo(this, n)), n = this.__last_index__);
  let u = n ? t.slice(n) : t;
  for (; this.test(u); )
    r.push(Uo(this, n)), u = u.slice(this.__last_index__), n += this.__last_index__;
  return r.length ? r : null;
};
pt.prototype.matchAtStart = function(t) {
  if (this.__text_cache__ = t, this.__index__ = -1, !t.length) return null;
  const r = this.re.schema_at_start.exec(t);
  if (!r) return null;
  const n = this.testSchemaAt(t, r[2], r[0].length);
  return n ? (this.__schema__ = r[2], this.__index__ = r.index + r[1].length, this.__last_index__ = r.index + r[0].length + n, Uo(this, 0)) : null;
};
pt.prototype.tlds = function(t, r) {
  return t = Array.isArray(t) ? t : [t], r ? (this.__tlds__ = this.__tlds__.concat(t).sort().filter(function(n, u, a) {
    return n !== a[u - 1];
  }).reverse(), Fu(this), this) : (this.__tlds__ = t.slice(), this.__tlds_replaced__ = !0, Fu(this), this);
};
pt.prototype.normalize = function(t) {
  t.schema || (t.url = "http://" + t.url), t.schema === "mailto:" && !/^mailto:/i.test(t.url) && (t.url = "mailto:" + t.url);
};
pt.prototype.onCompile = function() {
};
const $r = 2147483647, Pt = 36, Mi = 1, _n = 26, Zx = 38, Jx = 700, vf = 72, bf = 128, yf = "-", Qx = /^xn--/, e3 = /[^\0-\x7F]/, t3 = /[\x2E\u3002\uFF0E\uFF61]/g, r3 = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, Wa = Pt - Mi, Ot = Math.floor, Ua = String.fromCharCode;
function Kt(e) {
  throw new RangeError(r3[e]);
}
function n3(e, t) {
  const r = [];
  let n = e.length;
  for (; n--; )
    r[n] = t(e[n]);
  return r;
}
function xf(e, t) {
  const r = e.split("@");
  let n = "";
  r.length > 1 && (n = r[0] + "@", e = r[1]), e = e.replace(t3, ".");
  const u = e.split("."), a = n3(u, t).join(".");
  return n + a;
}
function _f(e) {
  const t = [];
  let r = 0;
  const n = e.length;
  for (; r < n; ) {
    const u = e.charCodeAt(r++);
    if (u >= 55296 && u <= 56319 && r < n) {
      const a = e.charCodeAt(r++);
      (a & 64512) == 56320 ? t.push(((u & 1023) << 10) + (a & 1023) + 65536) : (t.push(u), r--);
    } else
      t.push(u);
  }
  return t;
}
const u3 = (e) => String.fromCodePoint(...e), a3 = function(e) {
  return e >= 48 && e < 58 ? 26 + (e - 48) : e >= 65 && e < 91 ? e - 65 : e >= 97 && e < 123 ? e - 97 : Pt;
}, Fc = function(e, t) {
  return e + 22 + 75 * (e < 26) - ((t != 0) << 5);
}, Cf = function(e, t, r) {
  let n = 0;
  for (e = r ? Ot(e / Jx) : e >> 1, e += Ot(e / t); e > Wa * _n >> 1; n += Pt)
    e = Ot(e / Wa);
  return Ot(n + (Wa + 1) * e / (e + Zx));
}, Ef = function(e) {
  const t = [], r = e.length;
  let n = 0, u = bf, a = vf, o = e.lastIndexOf(yf);
  o < 0 && (o = 0);
  for (let i = 0; i < o; ++i)
    e.charCodeAt(i) >= 128 && Kt("not-basic"), t.push(e.charCodeAt(i));
  for (let i = o > 0 ? o + 1 : 0; i < r; ) {
    const s = n;
    for (let l = 1, d = Pt; ; d += Pt) {
      i >= r && Kt("invalid-input");
      const f = a3(e.charCodeAt(i++));
      f >= Pt && Kt("invalid-input"), f > Ot(($r - n) / l) && Kt("overflow"), n += f * l;
      const v = d <= a ? Mi : d >= a + _n ? _n : d - a;
      if (f < v)
        break;
      const h = Pt - v;
      l > Ot($r / h) && Kt("overflow"), l *= h;
    }
    const c = t.length + 1;
    a = Cf(n - s, c, s == 0), Ot(n / c) > $r - u && Kt("overflow"), u += Ot(n / c), n %= c, t.splice(n++, 0, u);
  }
  return String.fromCodePoint(...t);
}, Sf = function(e) {
  const t = [];
  e = _f(e);
  const r = e.length;
  let n = bf, u = 0, a = vf;
  for (const s of e)
    s < 128 && t.push(Ua(s));
  const o = t.length;
  let i = o;
  for (o && t.push(yf); i < r; ) {
    let s = $r;
    for (const l of e)
      l >= n && l < s && (s = l);
    const c = i + 1;
    s - n > Ot(($r - u) / c) && Kt("overflow"), u += (s - n) * c, n = s;
    for (const l of e)
      if (l < n && ++u > $r && Kt("overflow"), l === n) {
        let d = u;
        for (let f = Pt; ; f += Pt) {
          const v = f <= a ? Mi : f >= a + _n ? _n : f - a;
          if (d < v)
            break;
          const h = d - v, g = Pt - v;
          t.push(
            Ua(Fc(v + h % g, 0))
          ), d = Ot(h / g);
        }
        t.push(Ua(Fc(d, 0))), a = Cf(u, c, i === o), u = 0, ++i;
      }
    ++u, ++n;
  }
  return t.join("");
}, o3 = function(e) {
  return xf(e, function(t) {
    return Qx.test(t) ? Ef(t.slice(4).toLowerCase()) : t;
  });
}, i3 = function(e) {
  return xf(e, function(t) {
    return e3.test(t) ? "xn--" + Sf(t) : t;
  });
}, wf = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  version: "2.3.1",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  ucs2: {
    decode: _f,
    encode: u3
  },
  decode: Ef,
  encode: Sf,
  toASCII: i3,
  toUnicode: o3
}, s3 = {
  options: {
    // Enable HTML tags in source
    html: !1,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !1,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 100
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
}, c3 = {
  options: {
    // Enable HTML tags in source
    html: !1,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !1,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "fragments_join"
      ]
    }
  }
}, l3 = {
  options: {
    // Enable HTML tags in source
    html: !0,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !0,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "fragments_join"
      ]
    }
  }
}, d3 = {
  default: s3,
  zero: c3,
  commonmark: l3
}, f3 = /^(vbscript|javascript|file|data):/, h3 = /^data:image\/(gif|png|jpeg|webp);/;
function p3(e) {
  const t = e.trim().toLowerCase();
  return f3.test(t) ? h3.test(t) : !0;
}
const $f = ["http:", "https:", "mailto:"];
function m3(e) {
  const t = Ai(e, !0);
  if (t.hostname && (!t.protocol || $f.indexOf(t.protocol) >= 0))
    try {
      t.hostname = wf.toASCII(t.hostname);
    } catch {
    }
  return zn(ki(t));
}
function g3(e) {
  const t = Ai(e, !0);
  if (t.hostname && (!t.protocol || $f.indexOf(t.protocol) >= 0))
    try {
      t.hostname = wf.toUnicode(t.hostname);
    } catch {
    }
  return Mr(ki(t), Mr.defaultChars + "%");
}
function At(e, t) {
  if (!(this instanceof At))
    return new At(e, t);
  t || Ti(e) || (t = e || {}, e = "default"), this.inline = new Vn(), this.block = new ga(), this.core = new Pi(), this.renderer = new Br(), this.linkify = new pt(), this.validateLink = p3, this.normalizeLink = m3, this.normalizeLinkText = g3, this.utils = by, this.helpers = pa({}, Cy), this.options = {}, this.configure(e), t && this.set(t);
}
At.prototype.set = function(e) {
  return pa(this.options, e), this;
};
At.prototype.configure = function(e) {
  const t = this;
  if (Ti(e)) {
    const r = e;
    if (e = d3[r], !e)
      throw new Error('Wrong `markdown-it` preset "' + r + '", check name');
  }
  if (!e)
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  return e.options && t.set(e.options), e.components && Object.keys(e.components).forEach(function(r) {
    e.components[r].rules && t[r].ruler.enableOnly(e.components[r].rules), e.components[r].rules2 && t[r].ruler2.enableOnly(e.components[r].rules2);
  }), this;
};
At.prototype.enable = function(e, t) {
  let r = [];
  Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function(u) {
    r = r.concat(this[u].ruler.enable(e, !0));
  }, this), r = r.concat(this.inline.ruler2.enable(e, !0));
  const n = e.filter(function(u) {
    return r.indexOf(u) < 0;
  });
  if (n.length && !t)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + n);
  return this;
};
At.prototype.disable = function(e, t) {
  let r = [];
  Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function(u) {
    r = r.concat(this[u].ruler.disable(e, !0));
  }, this), r = r.concat(this.inline.ruler2.disable(e, !0));
  const n = e.filter(function(u) {
    return r.indexOf(u) < 0;
  });
  if (n.length && !t)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + n);
  return this;
};
At.prototype.use = function(e) {
  const t = [this].concat(Array.prototype.slice.call(arguments, 1));
  return e.apply(e, t), this;
};
At.prototype.parse = function(e, t) {
  if (typeof e != "string")
    throw new Error("Input data should be a String");
  const r = new this.core.State(e, this, t);
  return this.core.process(r), r.tokens;
};
At.prototype.render = function(e, t) {
  return t = t || {}, this.renderer.render(this.parse(e, t), this.options, t);
};
At.prototype.parseInline = function(e, t) {
  const r = new this.core.State(e, this, t);
  return r.inlineMode = !0, this.core.process(r), r.tokens;
};
At.prototype.renderInline = function(e, t) {
  return t = t || {}, this.renderer.render(this.parseInline(e, t), this.options, t);
};
export {
  C2 as C,
  $i as F,
  S3 as I,
  At as M,
  Xd as S,
  $3 as T,
  sc as X,
  F3 as a,
  Mh as b,
  yh as c,
  Zh as d,
  nh as e,
  B0 as f,
  w0 as g,
  c0 as h,
  E3 as j,
  k3 as u
};
