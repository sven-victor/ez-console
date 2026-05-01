import * as E from "react";
import J, { isValidElement as Jd, version as Xd, useContext as Ue, createContext as Ze, useRef as Ae, useLayoutEffect as Qd, useEffect as Je, useReducer as Rt, Fragment as gr, useState as Yt, useMemo as ul, forwardRef as on, cloneElement as Zd, useImperativeHandle as dl } from "react";
import Wo from "react-dom";
import Ee from "classnames";
var li = { exports: {} }, It = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uo;
function ef() {
  if (Uo) return It;
  Uo = 1;
  var e = J, r = Symbol.for("react.element"), t = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(s, l, c) {
    var u, d = {}, f = null, p = null;
    c !== void 0 && (f = "" + c), l.key !== void 0 && (f = "" + l.key), l.ref !== void 0 && (p = l.ref);
    for (u in l) n.call(l, u) && !i.hasOwnProperty(u) && (d[u] = l[u]);
    if (s && s.defaultProps) for (u in l = s.defaultProps, l) d[u] === void 0 && (d[u] = l[u]);
    return { $$typeof: r, type: s, key: f, ref: p, props: d, _owner: a.current };
  }
  return It.Fragment = t, It.jsx = o, It.jsxs = o, It;
}
var Dt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qo;
function rf() {
  return qo || (qo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = J, r = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), y = Symbol.iterator, m = "@@iterator";
    function v(g) {
      if (g === null || typeof g != "object")
        return null;
      var k = y && g[y] || g[m];
      return typeof k == "function" ? k : null;
    }
    var b = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(g) {
      {
        for (var k = arguments.length, L = new Array(k > 1 ? k - 1 : 0), G = 1; G < k; G++)
          L[G - 1] = arguments[G];
        C("error", g, L);
      }
    }
    function C(g, k, L) {
      {
        var G = b.ReactDebugCurrentFrame, ye = G.getStackAddendum();
        ye !== "" && (k += "%s", L = L.concat([ye]));
        var be = L.map(function(oe) {
          return String(oe);
        });
        be.unshift("Warning: " + k), Function.prototype.apply.call(console[g], console, be);
      }
    }
    var _ = !1, S = !1, $ = !1, x = !1, R = !1, T;
    T = Symbol.for("react.module.reference");
    function O(g) {
      return !!(typeof g == "string" || typeof g == "function" || g === n || g === i || R || g === a || g === c || g === u || x || g === p || _ || S || $ || typeof g == "object" && g !== null && (g.$$typeof === f || g.$$typeof === d || g.$$typeof === o || g.$$typeof === s || g.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      g.$$typeof === T || g.getModuleId !== void 0));
    }
    function M(g, k, L) {
      var G = g.displayName;
      if (G)
        return G;
      var ye = k.displayName || k.name || "";
      return ye !== "" ? L + "(" + ye + ")" : L;
    }
    function I(g) {
      return g.displayName || "Context";
    }
    function F(g) {
      if (g == null)
        return null;
      if (typeof g.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof g == "function")
        return g.displayName || g.name || null;
      if (typeof g == "string")
        return g;
      switch (g) {
        case n:
          return "Fragment";
        case t:
          return "Portal";
        case i:
          return "Profiler";
        case a:
          return "StrictMode";
        case c:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof g == "object")
        switch (g.$$typeof) {
          case s:
            var k = g;
            return I(k) + ".Consumer";
          case o:
            var L = g;
            return I(L._context) + ".Provider";
          case l:
            return M(g, g.render, "ForwardRef");
          case d:
            var G = g.displayName || null;
            return G !== null ? G : F(g.type) || "Memo";
          case f: {
            var ye = g, be = ye._payload, oe = ye._init;
            try {
              return F(oe(be));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var A = Object.assign, V = 0, D, z, H, ee, Q, re, q;
    function U() {
    }
    U.__reactDisabledLog = !0;
    function Y() {
      {
        if (V === 0) {
          D = console.log, z = console.info, H = console.warn, ee = console.error, Q = console.group, re = console.groupCollapsed, q = console.groupEnd;
          var g = {
            configurable: !0,
            enumerable: !0,
            value: U,
            writable: !0
          };
          Object.defineProperties(console, {
            info: g,
            log: g,
            warn: g,
            error: g,
            group: g,
            groupCollapsed: g,
            groupEnd: g
          });
        }
        V++;
      }
    }
    function pe() {
      {
        if (V--, V === 0) {
          var g = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: A({}, g, {
              value: D
            }),
            info: A({}, g, {
              value: z
            }),
            warn: A({}, g, {
              value: H
            }),
            error: A({}, g, {
              value: ee
            }),
            group: A({}, g, {
              value: Q
            }),
            groupCollapsed: A({}, g, {
              value: re
            }),
            groupEnd: A({}, g, {
              value: q
            })
          });
        }
        V < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var se = b.ReactCurrentDispatcher, he;
    function de(g, k, L) {
      {
        if (he === void 0)
          try {
            throw Error();
          } catch (ye) {
            var G = ye.stack.trim().match(/\n( *(at )?)/);
            he = G && G[1] || "";
          }
        return `
` + he + g;
      }
    }
    var me = !1, fe;
    {
      var je = typeof WeakMap == "function" ? WeakMap : Map;
      fe = new je();
    }
    function Fe(g, k) {
      if (!g || me)
        return "";
      {
        var L = fe.get(g);
        if (L !== void 0)
          return L;
      }
      var G;
      me = !0;
      var ye = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var be;
      be = se.current, se.current = null, Y();
      try {
        if (k) {
          var oe = function() {
            throw Error();
          };
          if (Object.defineProperty(oe.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(oe, []);
            } catch (tr) {
              G = tr;
            }
            Reflect.construct(g, [], oe);
          } else {
            try {
              oe.call();
            } catch (tr) {
              G = tr;
            }
            g.call(oe.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (tr) {
            G = tr;
          }
          g();
        }
      } catch (tr) {
        if (tr && G && typeof tr.stack == "string") {
          for (var ae = tr.stack.split(`
`), Xe = G.stack.split(`
`), Ve = ae.length - 1, xe = Xe.length - 1; Ve >= 1 && xe >= 0 && ae[Ve] !== Xe[xe]; )
            xe--;
          for (; Ve >= 1 && xe >= 0; Ve--, xe--)
            if (ae[Ve] !== Xe[xe]) {
              if (Ve !== 1 || xe !== 1)
                do
                  if (Ve--, xe--, xe < 0 || ae[Ve] !== Xe[xe]) {
                    var Cr = `
` + ae[Ve].replace(" at new ", " at ");
                    return g.displayName && Cr.includes("<anonymous>") && (Cr = Cr.replace("<anonymous>", g.displayName)), typeof g == "function" && fe.set(g, Cr), Cr;
                  }
                while (Ve >= 1 && xe >= 0);
              break;
            }
        }
      } finally {
        me = !1, se.current = be, pe(), Error.prepareStackTrace = ye;
      }
      var dt = g ? g.displayName || g.name : "", Qr = dt ? de(dt) : "";
      return typeof g == "function" && fe.set(g, Qr), Qr;
    }
    function Be(g, k, L) {
      return Fe(g, !1);
    }
    function B(g) {
      var k = g.prototype;
      return !!(k && k.isReactComponent);
    }
    function Pe(g, k, L) {
      if (g == null)
        return "";
      if (typeof g == "function")
        return Fe(g, B(g));
      if (typeof g == "string")
        return de(g);
      switch (g) {
        case c:
          return de("Suspense");
        case u:
          return de("SuspenseList");
      }
      if (typeof g == "object")
        switch (g.$$typeof) {
          case l:
            return Be(g.render);
          case d:
            return Pe(g.type, k, L);
          case f: {
            var G = g, ye = G._payload, be = G._init;
            try {
              return Pe(be(ye), k, L);
            } catch {
            }
          }
        }
      return "";
    }
    var K = Object.prototype.hasOwnProperty, le = {}, De = b.ReactDebugCurrentFrame;
    function ve(g) {
      if (g) {
        var k = g._owner, L = Pe(g.type, g._source, k ? k.type : null);
        De.setExtraStackFrame(L);
      } else
        De.setExtraStackFrame(null);
    }
    function qe(g, k, L, G, ye) {
      {
        var be = Function.call.bind(K);
        for (var oe in g)
          if (be(g, oe)) {
            var ae = void 0;
            try {
              if (typeof g[oe] != "function") {
                var Xe = Error((G || "React class") + ": " + L + " type `" + oe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof g[oe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Xe.name = "Invariant Violation", Xe;
              }
              ae = g[oe](k, oe, G, L, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Ve) {
              ae = Ve;
            }
            ae && !(ae instanceof Error) && (ve(ye), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", G || "React class", L, oe, typeof ae), ve(null)), ae instanceof Error && !(ae.message in le) && (le[ae.message] = !0, ve(ye), h("Failed %s type: %s", L, ae.message), ve(null));
          }
      }
    }
    var Me = Array.isArray;
    function Te(g) {
      return Me(g);
    }
    function ne(g) {
      {
        var k = typeof Symbol == "function" && Symbol.toStringTag, L = k && g[Symbol.toStringTag] || g.constructor.name || "Object";
        return L;
      }
    }
    function te(g) {
      try {
        return we(g), !1;
      } catch {
        return !0;
      }
    }
    function we(g) {
      return "" + g;
    }
    function br(g) {
      if (te(g))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ne(g)), we(g);
    }
    var ar = b.ReactCurrentOwner, ir = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, xr, Ar;
    function Ft(g) {
      if (K.call(g, "ref")) {
        var k = Object.getOwnPropertyDescriptor(g, "ref").get;
        if (k && k.isReactWarning)
          return !1;
      }
      return g.ref !== void 0;
    }
    function Nt(g) {
      if (K.call(g, "key")) {
        var k = Object.getOwnPropertyDescriptor(g, "key").get;
        if (k && k.isReactWarning)
          return !1;
      }
      return g.key !== void 0;
    }
    function ke(g, k) {
      typeof g.ref == "string" && ar.current;
    }
    function ge(g, k) {
      {
        var L = function() {
          xr || (xr = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", k));
        };
        L.isReactWarning = !0, Object.defineProperty(g, "key", {
          get: L,
          configurable: !0
        });
      }
    }
    function Sr(g, k) {
      {
        var L = function() {
          Ar || (Ar = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", k));
        };
        L.isReactWarning = !0, Object.defineProperty(g, "ref", {
          get: L,
          configurable: !0
        });
      }
    }
    var zr = function(g, k, L, G, ye, be, oe) {
      var ae = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: g,
        key: k,
        ref: L,
        props: oe,
        // Record the component responsible for creating this element.
        _owner: be
      };
      return ae._store = {}, Object.defineProperty(ae._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(ae, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: G
      }), Object.defineProperty(ae, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ye
      }), Object.freeze && (Object.freeze(ae.props), Object.freeze(ae)), ae;
    };
    function za(g, k, L, G, ye) {
      {
        var be, oe = {}, ae = null, Xe = null;
        L !== void 0 && (br(L), ae = "" + L), Nt(k) && (br(k.key), ae = "" + k.key), Ft(k) && (Xe = k.ref, ke(k, ye));
        for (be in k)
          K.call(k, be) && !ir.hasOwnProperty(be) && (oe[be] = k[be]);
        if (g && g.defaultProps) {
          var Ve = g.defaultProps;
          for (be in Ve)
            oe[be] === void 0 && (oe[be] = Ve[be]);
        }
        if (ae || Xe) {
          var xe = typeof g == "function" ? g.displayName || g.name || "Unknown" : g;
          ae && ge(oe, xe), Xe && Sr(oe, xe);
        }
        return zr(g, ae, Xe, ye, G, ar.current, oe);
      }
    }
    var At = b.ReactCurrentOwner, $n = b.ReactDebugCurrentFrame;
    function Br(g) {
      if (g) {
        var k = g._owner, L = Pe(g.type, g._source, k ? k.type : null);
        $n.setExtraStackFrame(L);
      } else
        $n.setExtraStackFrame(null);
    }
    var Mt;
    Mt = !1;
    function kt(g) {
      return typeof g == "object" && g !== null && g.$$typeof === r;
    }
    function _n() {
      {
        if (At.current) {
          var g = F(At.current.type);
          if (g)
            return `

Check the render method of \`` + g + "`.";
        }
        return "";
      }
    }
    function Rn(g) {
      return "";
    }
    var Jr = {};
    function ct(g) {
      {
        var k = _n();
        if (!k) {
          var L = typeof g == "string" ? g : g.displayName || g.name;
          L && (k = `

Check the top-level render call using <` + L + ">.");
        }
        return k;
      }
    }
    function Xr(g, k) {
      {
        if (!g._store || g._store.validated || g.key != null)
          return;
        g._store.validated = !0;
        var L = ct(k);
        if (Jr[L])
          return;
        Jr[L] = !0;
        var G = "";
        g && g._owner && g._owner !== At.current && (G = " It was passed a child from " + F(g._owner.type) + "."), Br(g), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', L, G), Br(null);
      }
    }
    function ut(g, k) {
      {
        if (typeof g != "object")
          return;
        if (Te(g))
          for (var L = 0; L < g.length; L++) {
            var G = g[L];
            kt(G) && Xr(G, k);
          }
        else if (kt(g))
          g._store && (g._store.validated = !0);
        else if (g) {
          var ye = v(g);
          if (typeof ye == "function" && ye !== g.entries)
            for (var be = ye.call(g), oe; !(oe = be.next()).done; )
              kt(oe.value) && Xr(oe.value, k);
        }
      }
    }
    function Hr(g) {
      {
        var k = g.type;
        if (k == null || typeof k == "string")
          return;
        var L;
        if (typeof k == "function")
          L = k.propTypes;
        else if (typeof k == "object" && (k.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        k.$$typeof === d))
          L = k.propTypes;
        else
          return;
        if (L) {
          var G = F(k);
          qe(L, g.props, "prop", G, g);
        } else if (k.PropTypes !== void 0 && !Mt) {
          Mt = !0;
          var ye = F(k);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ye || "Unknown");
        }
        typeof k.getDefaultProps == "function" && !k.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Wr(g) {
      {
        for (var k = Object.keys(g.props), L = 0; L < k.length; L++) {
          var G = k[L];
          if (G !== "children" && G !== "key") {
            Br(g), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", G), Br(null);
            break;
          }
        }
        g.ref !== null && (Br(g), h("Invalid attribute `ref` supplied to `React.Fragment`."), Br(null));
      }
    }
    var Vt = {};
    function Pn(g, k, L, G, ye, be) {
      {
        var oe = O(g);
        if (!oe) {
          var ae = "";
          (g === void 0 || typeof g == "object" && g !== null && Object.keys(g).length === 0) && (ae += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Xe = Rn();
          Xe ? ae += Xe : ae += _n();
          var Ve;
          g === null ? Ve = "null" : Te(g) ? Ve = "array" : g !== void 0 && g.$$typeof === r ? (Ve = "<" + (F(g.type) || "Unknown") + " />", ae = " Did you accidentally export a JSX literal instead of a component?") : Ve = typeof g, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Ve, ae);
        }
        var xe = za(g, k, L, ye, be);
        if (xe == null)
          return xe;
        if (oe) {
          var Cr = k.children;
          if (Cr !== void 0)
            if (G)
              if (Te(Cr)) {
                for (var dt = 0; dt < Cr.length; dt++)
                  ut(Cr[dt], g);
                Object.freeze && Object.freeze(Cr);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ut(Cr, g);
        }
        if (K.call(k, "key")) {
          var Qr = F(g), tr = Object.keys(k).filter(function(Gd) {
            return Gd !== "key";
          }), Ha = tr.length > 0 ? "{key: someKey, " + tr.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Vt[Qr + Ha]) {
            var Kd = tr.length > 0 ? "{" + tr.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ha, Qr, Kd, Qr), Vt[Qr + Ha] = !0;
          }
        }
        return g === n ? Wr(xe) : Hr(xe), xe;
      }
    }
    function Ye(g, k, L) {
      return Pn(g, k, L, !0);
    }
    function Tn(g, k, L) {
      return Pn(g, k, L, !1);
    }
    var Ba = Tn, Le = Ye;
    Dt.Fragment = n, Dt.jsx = Ba, Dt.jsxs = Le;
  }()), Dt;
}
process.env.NODE_ENV === "production" ? li.exports = ef() : li.exports = rf();
var N = li.exports, io = {}, fl = { exports: {} };
(function(e) {
  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(fl);
var _e = fl.exports, na = {};
Object.defineProperty(na, "__esModule", {
  value: !0
});
na.default = void 0;
var tf = {
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
na.default = tf;
var aa = {}, sn = {}, ia = {}, vl = { exports: {} }, pl = { exports: {} }, ml = { exports: {} }, hl = { exports: {} };
(function(e) {
  function r(t) {
    "@babel/helpers - typeof";
    return e.exports = r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
      return typeof n;
    } : function(n) {
      return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, r(t);
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(hl);
var gl = hl.exports, yl = { exports: {} };
(function(e) {
  var r = gl.default;
  function t(n, a) {
    if (r(n) != "object" || !n) return n;
    var i = n[Symbol.toPrimitive];
    if (i !== void 0) {
      var o = i.call(n, a || "default");
      if (r(o) != "object") return o;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (a === "string" ? String : Number)(n);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(yl);
var nf = yl.exports;
(function(e) {
  var r = gl.default, t = nf;
  function n(a) {
    var i = t(a, "string");
    return r(i) == "symbol" ? i : i + "";
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ml);
var af = ml.exports;
(function(e) {
  var r = af;
  function t(n, a, i) {
    return (a = r(a)) in n ? Object.defineProperty(n, a, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : n[a] = i, n;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(pl);
var of = pl.exports;
(function(e) {
  var r = of;
  function t(a, i) {
    var o = Object.keys(a);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(a);
      i && (s = s.filter(function(l) {
        return Object.getOwnPropertyDescriptor(a, l).enumerable;
      })), o.push.apply(o, s);
    }
    return o;
  }
  function n(a) {
    for (var i = 1; i < arguments.length; i++) {
      var o = arguments[i] != null ? arguments[i] : {};
      i % 2 ? t(Object(o), !0).forEach(function(s) {
        r(a, s, o[s]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(o)) : t(Object(o)).forEach(function(s) {
        Object.defineProperty(a, s, Object.getOwnPropertyDescriptor(o, s));
      });
    }
    return a;
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(vl);
var at = vl.exports, Vr = {};
Object.defineProperty(Vr, "__esModule", {
  value: !0
});
Vr.commonLocale = void 0;
Vr.commonLocale = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: !0
};
var sf = _e.default;
Object.defineProperty(ia, "__esModule", {
  value: !0
});
ia.default = void 0;
var Yo = sf(at), lf = Vr, cf = (0, Yo.default)((0, Yo.default)({}, lf.commonLocale), {}, {
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
ia.default = cf;
var ln = {};
Object.defineProperty(ln, "__esModule", {
  value: !0
});
ln.default = void 0;
const uf = {
  placeholder: "请选择时间",
  rangePlaceholder: ["开始时间", "结束时间"]
};
ln.default = uf;
var bl = _e.default;
Object.defineProperty(sn, "__esModule", {
  value: !0
});
sn.default = void 0;
var df = bl(ia), ff = bl(ln);
const xl = {
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
  }, df.default),
  timePickerLocale: Object.assign({}, ff.default)
};
xl.lang.ok = "确定";
sn.default = xl;
var vf = _e.default;
Object.defineProperty(aa, "__esModule", {
  value: !0
});
aa.default = void 0;
var pf = vf(sn);
aa.default = pf.default;
var oa = _e.default;
Object.defineProperty(io, "__esModule", {
  value: !0
});
var mf = io.default = void 0, hf = oa(na), gf = oa(aa), yf = oa(sn), bf = oa(ln);
const or = "${label}不是一个有效的${type}", xf = {
  locale: "zh-cn",
  Pagination: hf.default,
  DatePicker: yf.default,
  TimePicker: bf.default,
  Calendar: gf.default,
  // locales for all components
  global: {
    placeholder: "请选择",
    close: "关闭"
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
        string: or,
        method: or,
        array: or,
        object: or,
        number: or,
        date: or,
        boolean: or,
        integer: or,
        float: or,
        regexp: or,
        email: or,
        url: or,
        hex: or
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
mf = io.default = xf;
var oo = {}, sa = {};
Object.defineProperty(sa, "__esModule", {
  value: !0
});
sa.default = void 0;
var Sf = {
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
sa.default = Sf;
var la = {}, cn = {}, ca = {}, Cf = _e.default;
Object.defineProperty(ca, "__esModule", {
  value: !0
});
ca.default = void 0;
var Ko = Cf(at), Ef = Vr, wf = (0, Ko.default)((0, Ko.default)({}, Ef.commonLocale), {}, {
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
ca.default = wf;
var un = {};
Object.defineProperty(un, "__esModule", {
  value: !0
});
un.default = void 0;
const $f = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
un.default = $f;
var Sl = _e.default;
Object.defineProperty(cn, "__esModule", {
  value: !0
});
cn.default = void 0;
var _f = Sl(ca), Rf = Sl(un);
const Pf = {
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
  }, _f.default),
  timePickerLocale: Object.assign({}, Rf.default)
};
cn.default = Pf;
var Tf = _e.default;
Object.defineProperty(la, "__esModule", {
  value: !0
});
la.default = void 0;
var Of = Tf(cn);
la.default = Of.default;
var ua = _e.default;
Object.defineProperty(oo, "__esModule", {
  value: !0
});
var jf = oo.default = void 0, Ff = ua(sa), Nf = ua(la), Af = ua(cn), Mf = ua(un);
const sr = "${label} is not a valid ${type}", kf = {
  locale: "en",
  Pagination: Ff.default,
  DatePicker: Af.default,
  TimePicker: Mf.default,
  Calendar: Nf.default,
  global: {
    placeholder: "Please select",
    close: "Close"
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
        string: sr,
        method: sr,
        array: sr,
        object: sr,
        number: sr,
        date: sr,
        boolean: sr,
        integer: sr,
        float: sr,
        regexp: sr,
        email: sr,
        url: sr,
        hex: sr
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
jf = oo.default = kf;
var so = {}, da = {};
Object.defineProperty(da, "__esModule", {
  value: !0
});
da.default = void 0;
var Vf = {
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
da.default = Vf;
var fa = {}, dn = {}, va = {}, If = _e.default;
Object.defineProperty(va, "__esModule", {
  value: !0
});
va.default = void 0;
var Go = If(at), Df = Vr, Lf = (0, Go.default)((0, Go.default)({}, Df.commonLocale), {}, {
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
va.default = Lf;
var fn = {};
Object.defineProperty(fn, "__esModule", {
  value: !0
});
fn.default = void 0;
const zf = {
  placeholder: "Zeit auswählen",
  rangePlaceholder: ["Startzeit", "Endzeit"]
};
fn.default = zf;
var Cl = _e.default;
Object.defineProperty(dn, "__esModule", {
  value: !0
});
dn.default = void 0;
var Bf = Cl(va), Hf = Cl(fn);
const Wf = {
  lang: Object.assign({
    placeholder: "Datum auswählen",
    rangePlaceholder: ["Startdatum", "Enddatum"],
    shortWeekDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    shortMonths: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
  }, Bf.default),
  timePickerLocale: Object.assign({}, Hf.default)
};
dn.default = Wf;
var Uf = _e.default;
Object.defineProperty(fa, "__esModule", {
  value: !0
});
fa.default = void 0;
var qf = Uf(dn);
fa.default = qf.default;
var pa = _e.default;
Object.defineProperty(so, "__esModule", {
  value: !0
});
var Yf = so.default = void 0, Kf = pa(da), Gf = pa(fa), Jf = pa(dn), Xf = pa(fn);
const lr = "${label} ist nicht gültig. ${type} erwartet", Qf = {
  locale: "de",
  Pagination: Kf.default,
  DatePicker: Jf.default,
  TimePicker: Xf.default,
  Calendar: Gf.default,
  global: {
    placeholder: "Bitte auswählen",
    close: "Schließen"
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
        string: lr,
        method: lr,
        array: lr,
        object: lr,
        number: lr,
        date: lr,
        boolean: lr,
        integer: lr,
        float: lr,
        regexp: lr,
        email: lr,
        url: lr,
        hex: lr
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
Yf = so.default = Qf;
var lo = {}, ma = {};
Object.defineProperty(ma, "__esModule", {
  value: !0
});
ma.default = void 0;
var Zf = {
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
ma.default = Zf;
var ha = {}, vn = {}, ga = {}, ev = _e.default;
Object.defineProperty(ga, "__esModule", {
  value: !0
});
ga.default = void 0;
var Jo = ev(at), rv = Vr, tv = (0, Jo.default)((0, Jo.default)({}, rv.commonLocale), {}, {
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
ga.default = tv;
var pn = {};
Object.defineProperty(pn, "__esModule", {
  value: !0
});
pn.default = void 0;
const nv = {
  placeholder: "Seleccionar hora"
};
pn.default = nv;
var El = _e.default;
Object.defineProperty(vn, "__esModule", {
  value: !0
});
vn.default = void 0;
var av = El(ga), iv = El(pn);
const ov = {
  lang: Object.assign({
    placeholder: "Seleccionar fecha",
    rangePlaceholder: ["Fecha inicial", "Fecha final"],
    shortWeekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    shortMonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  }, av.default),
  timePickerLocale: Object.assign({}, iv.default)
};
vn.default = ov;
var sv = _e.default;
Object.defineProperty(ha, "__esModule", {
  value: !0
});
ha.default = void 0;
var lv = sv(vn);
ha.default = lv.default;
var ya = _e.default;
Object.defineProperty(lo, "__esModule", {
  value: !0
});
var cv = lo.default = void 0, uv = ya(ma), dv = ya(ha), fv = ya(vn), vv = ya(pn);
const cr = "${label} no es un ${type} válido", pv = {
  locale: "es",
  Pagination: uv.default,
  DatePicker: fv.default,
  TimePicker: vv.default,
  Calendar: dv.default,
  global: {
    placeholder: "Seleccione",
    close: "Cerrar"
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
        string: cr,
        method: cr,
        array: cr,
        object: cr,
        number: cr,
        date: cr,
        boolean: cr,
        integer: cr,
        float: cr,
        regexp: cr,
        email: cr,
        url: cr,
        hex: cr
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
cv = lo.default = pv;
var co = {}, ba = {};
Object.defineProperty(ba, "__esModule", {
  value: !0
});
ba.default = void 0;
var mv = {
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
ba.default = mv;
var xa = {}, mn = {}, Sa = {}, hv = _e.default;
Object.defineProperty(Sa, "__esModule", {
  value: !0
});
Sa.default = void 0;
var Xo = hv(at), gv = Vr, yv = (0, Xo.default)((0, Xo.default)({}, gv.commonLocale), {}, {
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
Sa.default = yv;
var hn = {};
Object.defineProperty(hn, "__esModule", {
  value: !0
});
hn.default = void 0;
const bv = {
  placeholder: "Sélectionner l'heure",
  rangePlaceholder: ["Heure de début", "Heure de fin"]
};
hn.default = bv;
var wl = _e.default;
Object.defineProperty(mn, "__esModule", {
  value: !0
});
mn.default = void 0;
var xv = wl(Sa), Sv = wl(hn);
const Cv = {
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
  }, xv.default),
  timePickerLocale: Object.assign({}, Sv.default)
};
mn.default = Cv;
var Ev = _e.default;
Object.defineProperty(xa, "__esModule", {
  value: !0
});
xa.default = void 0;
var wv = Ev(mn);
xa.default = wv.default;
var Ca = _e.default;
Object.defineProperty(co, "__esModule", {
  value: !0
});
var $v = co.default = void 0, _v = Ca(ba), Rv = Ca(xa), Pv = Ca(mn), Tv = Ca(hn);
const ur = "La valeur du champ ${label} n'est pas valide pour le type ${type}", Ov = {
  locale: "fr",
  Pagination: _v.default,
  DatePicker: Pv.default,
  TimePicker: Tv.default,
  Calendar: Rv.default,
  global: {
    close: "Fermer"
  },
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
        string: ur,
        method: ur,
        array: ur,
        object: ur,
        number: ur,
        date: ur,
        boolean: ur,
        integer: ur,
        float: ur,
        regexp: ur,
        email: ur,
        url: ur,
        hex: ur
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
$v = co.default = Ov;
var uo = {}, Ea = {};
Object.defineProperty(Ea, "__esModule", {
  value: !0
});
Ea.default = void 0;
var jv = {
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
Ea.default = jv;
var wa = {}, gn = {}, $a = {}, Fv = _e.default;
Object.defineProperty($a, "__esModule", {
  value: !0
});
$a.default = void 0;
var Qo = Fv(at), Nv = Vr, Av = (0, Qo.default)((0, Qo.default)({}, Nv.commonLocale), {}, {
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
$a.default = Av;
var yn = {};
Object.defineProperty(yn, "__esModule", {
  value: !0
});
yn.default = void 0;
const Mv = {
  placeholder: "اختيار الوقت"
};
yn.default = Mv;
var $l = _e.default;
Object.defineProperty(gn, "__esModule", {
  value: !0
});
gn.default = void 0;
var kv = $l($a), Vv = $l(yn);
const Iv = {
  lang: Object.assign({
    placeholder: "اختيار التاريخ",
    rangePlaceholder: ["البداية", "النهاية"],
    yearFormat: "YYYY",
    monthFormat: "MMMM",
    monthBeforeYear: !0,
    shortWeekDays: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    shortMonths: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
  }, kv.default),
  timePickerLocale: Object.assign({}, Vv.default)
};
gn.default = Iv;
var Dv = _e.default;
Object.defineProperty(wa, "__esModule", {
  value: !0
});
wa.default = void 0;
var Lv = Dv(gn);
wa.default = Lv.default;
var _a = _e.default;
Object.defineProperty(uo, "__esModule", {
  value: !0
});
var zv = uo.default = void 0, Bv = _a(Ea), Hv = _a(wa), Wv = _a(gn), Uv = _a(yn);
const dr = "ليس ${label} من نوع ${type} صالحًا", qv = {
  locale: "ar",
  Pagination: Bv.default,
  DatePicker: Wv.default,
  TimePicker: Uv.default,
  Calendar: Hv.default,
  global: {
    placeholder: "يرجى التحديد",
    close: "إغلاق"
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
        string: dr,
        method: dr,
        array: dr,
        object: dr,
        number: dr,
        date: dr,
        boolean: dr,
        integer: dr,
        float: dr,
        regexp: dr,
        email: dr,
        url: dr,
        hex: dr
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
zv = uo.default = qv;
var fo = {}, Ra = {};
Object.defineProperty(Ra, "__esModule", {
  value: !0
});
Ra.default = void 0;
var Yv = {
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
Ra.default = Yv;
var Pa = {}, bn = {}, Ta = {}, Kv = _e.default;
Object.defineProperty(Ta, "__esModule", {
  value: !0
});
Ta.default = void 0;
var Zo = Kv(at), Gv = Vr, Jv = (0, Zo.default)((0, Zo.default)({}, Gv.commonLocale), {}, {
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
Ta.default = Jv;
var xn = {};
Object.defineProperty(xn, "__esModule", {
  value: !0
});
xn.default = void 0;
const Xv = {
  placeholder: "Välj tid"
};
xn.default = Xv;
var _l = _e.default;
Object.defineProperty(bn, "__esModule", {
  value: !0
});
bn.default = void 0;
var Qv = _l(Ta), Zv = _l(xn);
const ep = {
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
  }, Qv.default),
  timePickerLocale: Object.assign({}, Zv.default)
};
bn.default = ep;
var rp = _e.default;
Object.defineProperty(Pa, "__esModule", {
  value: !0
});
Pa.default = void 0;
var tp = rp(bn);
Pa.default = tp.default;
var Oa = _e.default;
Object.defineProperty(fo, "__esModule", {
  value: !0
});
var np = fo.default = void 0, ap = Oa(Ra), ip = Oa(Pa), op = Oa(bn), sp = Oa(xn);
const fr = "${label} är inte en giltig ${type}", lp = {
  locale: "sv",
  Pagination: ap.default,
  DatePicker: op.default,
  TimePicker: sp.default,
  Calendar: ip.default,
  global: {
    placeholder: "Vänligen välj",
    close: "Stäng"
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
        string: fr,
        method: fr,
        array: fr,
        object: fr,
        number: fr,
        date: fr,
        boolean: fr,
        integer: fr,
        float: fr,
        regexp: fr,
        email: fr,
        url: fr,
        hex: fr
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
np = fo.default = lp;
function cp(e, r) {
  var t = Object.assign({}, e);
  return Array.isArray(r) && r.forEach(function(n) {
    delete t[n];
  }), t;
}
function Z(e) {
  "@babel/helpers - typeof";
  return Z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
    return typeof r;
  } : function(r) {
    return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
  }, Z(e);
}
var ci = { exports: {} }, Se = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var es;
function up() {
  if (es) return Se;
  es = 1;
  var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function m(v) {
    if (typeof v == "object" && v !== null) {
      var b = v.$$typeof;
      switch (b) {
        case e:
          switch (v = v.type, v) {
            case t:
            case a:
            case n:
            case c:
            case u:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case s:
                case o:
                case l:
                case f:
                case d:
                case i:
                  return v;
                default:
                  return b;
              }
          }
        case r:
          return b;
      }
    }
  }
  return Se.ContextConsumer = o, Se.ContextProvider = i, Se.Element = e, Se.ForwardRef = l, Se.Fragment = t, Se.Lazy = f, Se.Memo = d, Se.Portal = r, Se.Profiler = a, Se.StrictMode = n, Se.Suspense = c, Se.SuspenseList = u, Se.isAsyncMode = function() {
    return !1;
  }, Se.isConcurrentMode = function() {
    return !1;
  }, Se.isContextConsumer = function(v) {
    return m(v) === o;
  }, Se.isContextProvider = function(v) {
    return m(v) === i;
  }, Se.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, Se.isForwardRef = function(v) {
    return m(v) === l;
  }, Se.isFragment = function(v) {
    return m(v) === t;
  }, Se.isLazy = function(v) {
    return m(v) === f;
  }, Se.isMemo = function(v) {
    return m(v) === d;
  }, Se.isPortal = function(v) {
    return m(v) === r;
  }, Se.isProfiler = function(v) {
    return m(v) === a;
  }, Se.isStrictMode = function(v) {
    return m(v) === n;
  }, Se.isSuspense = function(v) {
    return m(v) === c;
  }, Se.isSuspenseList = function(v) {
    return m(v) === u;
  }, Se.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === t || v === a || v === n || v === c || v === u || v === p || typeof v == "object" && v !== null && (v.$$typeof === f || v.$$typeof === d || v.$$typeof === i || v.$$typeof === o || v.$$typeof === l || v.$$typeof === y || v.getModuleId !== void 0);
  }, Se.typeOf = m, Se;
}
var Ce = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rs;
function dp() {
  return rs || (rs = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), y = !1, m = !1, v = !1, b = !1, h = !1, C;
    C = Symbol.for("react.module.reference");
    function _(B) {
      return !!(typeof B == "string" || typeof B == "function" || B === t || B === a || h || B === n || B === c || B === u || b || B === p || y || m || v || typeof B == "object" && B !== null && (B.$$typeof === f || B.$$typeof === d || B.$$typeof === i || B.$$typeof === o || B.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      B.$$typeof === C || B.getModuleId !== void 0));
    }
    function S(B) {
      if (typeof B == "object" && B !== null) {
        var Pe = B.$$typeof;
        switch (Pe) {
          case e:
            var K = B.type;
            switch (K) {
              case t:
              case a:
              case n:
              case c:
              case u:
                return K;
              default:
                var le = K && K.$$typeof;
                switch (le) {
                  case s:
                  case o:
                  case l:
                  case f:
                  case d:
                  case i:
                    return le;
                  default:
                    return Pe;
                }
            }
          case r:
            return Pe;
        }
      }
    }
    var $ = o, x = i, R = e, T = l, O = t, M = f, I = d, F = r, A = a, V = n, D = c, z = u, H = !1, ee = !1;
    function Q(B) {
      return H || (H = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function re(B) {
      return ee || (ee = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function q(B) {
      return S(B) === o;
    }
    function U(B) {
      return S(B) === i;
    }
    function Y(B) {
      return typeof B == "object" && B !== null && B.$$typeof === e;
    }
    function pe(B) {
      return S(B) === l;
    }
    function se(B) {
      return S(B) === t;
    }
    function he(B) {
      return S(B) === f;
    }
    function de(B) {
      return S(B) === d;
    }
    function me(B) {
      return S(B) === r;
    }
    function fe(B) {
      return S(B) === a;
    }
    function je(B) {
      return S(B) === n;
    }
    function Fe(B) {
      return S(B) === c;
    }
    function Be(B) {
      return S(B) === u;
    }
    Ce.ContextConsumer = $, Ce.ContextProvider = x, Ce.Element = R, Ce.ForwardRef = T, Ce.Fragment = O, Ce.Lazy = M, Ce.Memo = I, Ce.Portal = F, Ce.Profiler = A, Ce.StrictMode = V, Ce.Suspense = D, Ce.SuspenseList = z, Ce.isAsyncMode = Q, Ce.isConcurrentMode = re, Ce.isContextConsumer = q, Ce.isContextProvider = U, Ce.isElement = Y, Ce.isForwardRef = pe, Ce.isFragment = se, Ce.isLazy = he, Ce.isMemo = de, Ce.isPortal = me, Ce.isProfiler = fe, Ce.isStrictMode = je, Ce.isSuspense = Fe, Ce.isSuspenseList = Be, Ce.isValidElementType = _, Ce.typeOf = S;
  }()), Ce;
}
process.env.NODE_ENV === "production" ? ci.exports = up() : ci.exports = dp();
var Wa = ci.exports;
function vo(e, r, t) {
  var n = E.useRef({});
  return (!("value" in n.current) || t(n.current.condition, r)) && (n.current.value = e(), n.current.condition = r), n.current.value;
}
var fp = Symbol.for("react.element"), vp = Symbol.for("react.transitional.element"), pp = Symbol.for("react.fragment");
function Rl(e) {
  return (
    // Base object type
    e && Z(e) === "object" && // React Element type
    (e.$$typeof === fp || e.$$typeof === vp) && // React Fragment type
    e.type === pp
  );
}
var mp = Number(Xd.split(".")[0]), Pl = function(r, t) {
  typeof r == "function" ? r(t) : Z(r) === "object" && r && "current" in r && (r.current = t);
}, Tl = function() {
  for (var r = arguments.length, t = new Array(r), n = 0; n < r; n++)
    t[n] = arguments[n];
  var a = t.filter(Boolean);
  return a.length <= 1 ? a[0] : function(i) {
    t.forEach(function(o) {
      Pl(o, i);
    });
  };
}, hp = function() {
  for (var r = arguments.length, t = new Array(r), n = 0; n < r; n++)
    t[n] = arguments[n];
  return vo(function() {
    return Tl.apply(void 0, t);
  }, t, function(a, i) {
    return a.length !== i.length || a.every(function(o, s) {
      return o !== i[s];
    });
  });
}, Ol = function(r) {
  var t, n;
  if (!r)
    return !1;
  if (jl(r) && mp >= 19)
    return !0;
  var a = Wa.isMemo(r) ? r.type.type : r.type;
  return !(typeof a == "function" && !((t = a.prototype) !== null && t !== void 0 && t.render) && a.$$typeof !== Wa.ForwardRef || typeof r == "function" && !((n = r.prototype) !== null && n !== void 0 && n.render) && r.$$typeof !== Wa.ForwardRef);
};
function jl(e) {
  return /* @__PURE__ */ Jd(e) && !Rl(e);
}
var Fl = function(r) {
  if (r && jl(r)) {
    var t = r;
    return t.props.propertyIsEnumerable("ref") ? t.props.ref : t.ref;
  }
  return null;
}, ui = {}, po = [], gp = function(r) {
  po.push(r);
};
function Kt(e, r) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var t = po.reduce(function(n, a) {
      return a(n ?? "", "warning");
    }, r);
    t && console.error("Warning: ".concat(t));
  }
}
function yp(e, r) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var t = po.reduce(function(n, a) {
      return a(n ?? "", "note");
    }, r);
    t && console.warn("Note: ".concat(t));
  }
}
function Nl() {
  ui = {};
}
function Al(e, r, t) {
  !r && !ui[t] && (e(!1, t), ui[t] = !0);
}
function Ie(e, r) {
  Al(Kt, e, r);
}
function bp(e, r) {
  Al(yp, e, r);
}
Ie.preMessage = gp;
Ie.resetWarned = Nl;
Ie.noteOnce = bp;
function Ml() {
}
let Ir = null;
function xp() {
  Ir = null, Nl();
}
let mo = Ml;
process.env.NODE_ENV !== "production" && (mo = (e, r, t) => {
  Ie(e, `[antd: ${r}] ${t}`), process.env.NODE_ENV === "test" && xp();
});
const kl = /* @__PURE__ */ E.createContext({}), nt = process.env.NODE_ENV !== "production" ? (e) => {
  const {
    strict: r
  } = E.useContext(kl), t = (n, a, i) => {
    if (!n)
      if (r === !1 && a === "deprecated") {
        const o = Ir;
        Ir || (Ir = {}), Ir[e] = Ir[e] || [], Ir[e].includes(i || "") || Ir[e].push(i || ""), o || console.warn("[antd] There exists deprecated usage in your code:", Ir);
      } else
        process.env.NODE_ENV !== "production" && mo(n, e, i);
  };
  return t.deprecated = (n, a, i, o) => {
    t(n, "deprecated", `\`${a}\` is deprecated. Please use \`${i}\` instead.${o ? ` ${o}` : ""}`);
  }, t;
} : () => {
  const e = () => {
  };
  return e.deprecated = Ml, e;
}, ja = mo;
function Vl(e) {
  if (Array.isArray(e)) return e;
}
function Sp(e, r) {
  var t = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (t != null) {
    var n, a, i, o, s = [], l = !0, c = !1;
    try {
      if (i = (t = t.call(e)).next, r === 0) {
        if (Object(t) !== t) return;
        l = !1;
      } else for (; !(l = (n = i.call(t)).done) && (s.push(n.value), s.length !== r); l = !0) ;
    } catch (u) {
      c = !0, a = u;
    } finally {
      try {
        if (!l && t.return != null && (o = t.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return s;
  }
}
function di(e, r) {
  (r == null || r > e.length) && (r = e.length);
  for (var t = 0, n = Array(r); t < r; t++) n[t] = e[t];
  return n;
}
function ho(e, r) {
  if (e) {
    if (typeof e == "string") return di(e, r);
    var t = {}.toString.call(e).slice(8, -1);
    return t === "Object" && e.constructor && (t = e.constructor.name), t === "Map" || t === "Set" ? Array.from(e) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? di(e, r) : void 0;
  }
}
function Il() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function W(e, r) {
  return Vl(e) || Sp(e, r) || ho(e, r) || Il();
}
function Cp(e, r) {
  if (Z(e) != "object" || !e) return e;
  var t = e[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(e, r);
    if (Z(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(e);
}
function Dl(e) {
  var r = Cp(e, "string");
  return Z(r) == "symbol" ? r : r + "";
}
function w(e, r, t) {
  return (r = Dl(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function Ep(e) {
  if (Array.isArray(e)) return di(e);
}
function Ll(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function wp() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function X(e) {
  return Ep(e) || Ll(e) || ho(e) || wp();
}
function ts(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    r && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function j(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ts(Object(t), !0).forEach(function(n) {
      w(e, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ts(Object(t)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return e;
}
function Gt(e) {
  for (var r = 0, t, n = 0, a = e.length; a >= 4; ++n, a -= 4)
    t = e.charCodeAt(n) & 255 | (e.charCodeAt(++n) & 255) << 8 | (e.charCodeAt(++n) & 255) << 16 | (e.charCodeAt(++n) & 255) << 24, t = /* Math.imul(k, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), t ^= /* k >>> r: */
    t >>> 24, r = /* Math.imul(k, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
  switch (a) {
    case 3:
      r ^= (e.charCodeAt(n + 2) & 255) << 16;
    case 2:
      r ^= (e.charCodeAt(n + 1) & 255) << 8;
    case 1:
      r ^= e.charCodeAt(n) & 255, r = /* Math.imul(h, m): */
      (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
  }
  return r ^= r >>> 13, r = /* Math.imul(h, m): */
  (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), ((r ^ r >>> 15) >>> 0).toString(36);
}
function Lr() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function $p(e, r) {
  if (!e)
    return !1;
  if (e.contains)
    return e.contains(r);
  for (var t = r; t; ) {
    if (t === e)
      return !0;
    t = t.parentNode;
  }
  return !1;
}
var ns = "data-rc-order", as = "data-rc-priority", _p = "rc-util-key", fi = /* @__PURE__ */ new Map();
function zl() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = e.mark;
  return r ? r.startsWith("data-") ? r : "data-".concat(r) : _p;
}
function Fa(e) {
  if (e.attachTo)
    return e.attachTo;
  var r = document.querySelector("head");
  return r || document.body;
}
function Rp(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function go(e) {
  return Array.from((fi.get(e) || e).children).filter(function(r) {
    return r.tagName === "STYLE";
  });
}
function Bl(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Lr())
    return null;
  var t = r.csp, n = r.prepend, a = r.priority, i = a === void 0 ? 0 : a, o = Rp(n), s = o === "prependQueue", l = document.createElement("style");
  l.setAttribute(ns, o), s && i && l.setAttribute(as, "".concat(i)), t != null && t.nonce && (l.nonce = t == null ? void 0 : t.nonce), l.innerHTML = e;
  var c = Fa(r), u = c.firstChild;
  if (n) {
    if (s) {
      var d = (r.styles || go(c)).filter(function(f) {
        if (!["prepend", "prependQueue"].includes(f.getAttribute(ns)))
          return !1;
        var p = Number(f.getAttribute(as) || 0);
        return i >= p;
      });
      if (d.length)
        return c.insertBefore(l, d[d.length - 1].nextSibling), l;
    }
    c.insertBefore(l, u);
  } else
    c.appendChild(l);
  return l;
}
function Hl(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = Fa(r);
  return (r.styles || go(t)).find(function(n) {
    return n.getAttribute(zl(r)) === e;
  });
}
function Wl(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = Hl(e, r);
  if (t) {
    var n = Fa(r);
    n.removeChild(t);
  }
}
function Pp(e, r) {
  var t = fi.get(e);
  if (!t || !$p(document, t)) {
    var n = Bl("", r), a = n.parentNode;
    fi.set(e, a), e.removeChild(n);
  }
}
function rt(e, r) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = Fa(t), a = go(n), i = j(j({}, t), {}, {
    styles: a
  });
  Pp(n, i);
  var o = Hl(r, i);
  if (o) {
    var s, l;
    if ((s = i.csp) !== null && s !== void 0 && s.nonce && o.nonce !== ((l = i.csp) === null || l === void 0 ? void 0 : l.nonce)) {
      var c;
      o.nonce = (c = i.csp) === null || c === void 0 ? void 0 : c.nonce;
    }
    return o.innerHTML !== e && (o.innerHTML = e), o;
  }
  var u = Bl(e, i);
  return u.setAttribute(zl(i), r), u;
}
function ue(e, r) {
  if (e == null) return {};
  var t = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (r.indexOf(n) !== -1) continue;
    t[n] = e[n];
  }
  return t;
}
function $r(e, r) {
  if (e == null) return {};
  var t, n, a = ue(e, r);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) t = i[n], r.indexOf(t) === -1 && {}.propertyIsEnumerable.call(e, t) && (a[t] = e[t]);
  }
  return a;
}
function vi(e, r) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = /* @__PURE__ */ new Set();
  function a(i, o) {
    var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, l = n.has(i);
    if (Ie(!l, "Warning: There may be circular references"), l)
      return !1;
    if (i === o)
      return !0;
    if (t && s > 1)
      return !1;
    n.add(i);
    var c = s + 1;
    if (Array.isArray(i)) {
      if (!Array.isArray(o) || i.length !== o.length)
        return !1;
      for (var u = 0; u < i.length; u++)
        if (!a(i[u], o[u], c))
          return !1;
      return !0;
    }
    if (i && o && Z(i) === "object" && Z(o) === "object") {
      var d = Object.keys(i);
      return d.length !== Object.keys(o).length ? !1 : d.every(function(f) {
        return a(i[f], o[f], c);
      });
    }
    return !1;
  }
  return a(e, r);
}
function er(e, r) {
  if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}
function is(e, r) {
  for (var t = 0; t < r.length; t++) {
    var n = r[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Dl(n.key), n);
  }
}
function rr(e, r, t) {
  return r && is(e.prototype, r), t && is(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
var Tp = "%";
function pi(e) {
  return e.join(Tp);
}
var Op = /* @__PURE__ */ function() {
  function e(r) {
    er(this, e), w(this, "instanceId", void 0), w(this, "cache", /* @__PURE__ */ new Map()), this.instanceId = r;
  }
  return rr(e, [{
    key: "get",
    value: function(t) {
      return this.opGet(pi(t));
    }
    /** A fast get cache with `get` concat. */
  }, {
    key: "opGet",
    value: function(t) {
      return this.cache.get(t) || null;
    }
  }, {
    key: "update",
    value: function(t, n) {
      return this.opUpdate(pi(t), n);
    }
    /** A fast get cache with `get` concat. */
  }, {
    key: "opUpdate",
    value: function(t, n) {
      var a = this.cache.get(t), i = n(a);
      i === null ? this.cache.delete(t) : this.cache.set(t, i);
    }
  }]), e;
}(), xt = "data-token-hash", jr = "data-css-hash", jp = "data-cache-path", qr = "__cssinjs_instance__";
function Fp() {
  var e = Math.random().toString(12).slice(2);
  if (typeof document < "u" && document.head && document.body) {
    var r = document.body.querySelectorAll("style[".concat(jr, "]")) || [], t = document.head.firstChild;
    Array.from(r).forEach(function(a) {
      a[qr] = a[qr] || e, a[qr] === e && document.head.insertBefore(a, t);
    });
    var n = {};
    Array.from(document.querySelectorAll("style[".concat(jr, "]"))).forEach(function(a) {
      var i = a.getAttribute(jr);
      if (n[i]) {
        if (a[qr] === e) {
          var o;
          (o = a.parentNode) === null || o === void 0 || o.removeChild(a);
        }
      } else
        n[i] = !0;
    });
  }
  return new Op(e);
}
var Sn = /* @__PURE__ */ E.createContext({
  hashPriority: "low",
  cache: Fp(),
  defaultCache: !0
});
function ie(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Jt(e, r) {
  return Jt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, n) {
    return t.__proto__ = n, t;
  }, Jt(e, r);
}
function it(e, r) {
  if (typeof r != "function" && r !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(r && r.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), r && Jt(e, r);
}
function Xt(e) {
  return Xt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Xt(e);
}
function yo() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (yo = function() {
    return !!e;
  })();
}
function Np(e, r) {
  if (r && (Z(r) == "object" || typeof r == "function")) return r;
  if (r !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return ie(e);
}
function ot(e) {
  var r = yo();
  return function() {
    var t, n = Xt(e);
    if (r) {
      var a = Xt(this).constructor;
      t = Reflect.construct(n, arguments, a);
    } else t = n.apply(this, arguments);
    return Np(this, t);
  };
}
function Ap(e, r) {
  if (e.length !== r.length)
    return !1;
  for (var t = 0; t < e.length; t++)
    if (e[t] !== r[t])
      return !1;
  return !0;
}
var bo = /* @__PURE__ */ function() {
  function e() {
    er(this, e), w(this, "cache", void 0), w(this, "keys", void 0), w(this, "cacheCallTimes", void 0), this.cache = /* @__PURE__ */ new Map(), this.keys = [], this.cacheCallTimes = 0;
  }
  return rr(e, [{
    key: "size",
    value: function() {
      return this.keys.length;
    }
  }, {
    key: "internalGet",
    value: function(t) {
      var n, a, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, o = {
        map: this.cache
      };
      return t.forEach(function(s) {
        if (!o)
          o = void 0;
        else {
          var l;
          o = (l = o) === null || l === void 0 || (l = l.map) === null || l === void 0 ? void 0 : l.get(s);
        }
      }), (n = o) !== null && n !== void 0 && n.value && i && (o.value[1] = this.cacheCallTimes++), (a = o) === null || a === void 0 ? void 0 : a.value;
    }
  }, {
    key: "get",
    value: function(t) {
      var n;
      return (n = this.internalGet(t, !0)) === null || n === void 0 ? void 0 : n[0];
    }
  }, {
    key: "has",
    value: function(t) {
      return !!this.internalGet(t);
    }
  }, {
    key: "set",
    value: function(t, n) {
      var a = this;
      if (!this.has(t)) {
        if (this.size() + 1 > e.MAX_CACHE_SIZE + e.MAX_CACHE_OFFSET) {
          var i = this.keys.reduce(function(c, u) {
            var d = W(c, 2), f = d[1];
            return a.internalGet(u)[1] < f ? [u, a.internalGet(u)[1]] : c;
          }, [this.keys[0], this.cacheCallTimes]), o = W(i, 1), s = o[0];
          this.delete(s);
        }
        this.keys.push(t);
      }
      var l = this.cache;
      t.forEach(function(c, u) {
        if (u === t.length - 1)
          l.set(c, {
            value: [n, a.cacheCallTimes++]
          });
        else {
          var d = l.get(c);
          d ? d.map || (d.map = /* @__PURE__ */ new Map()) : l.set(c, {
            map: /* @__PURE__ */ new Map()
          }), l = l.get(c).map;
        }
      });
    }
  }, {
    key: "deleteByPath",
    value: function(t, n) {
      var a = t.get(n[0]);
      if (n.length === 1) {
        var i;
        return a.map ? t.set(n[0], {
          map: a.map
        }) : t.delete(n[0]), (i = a.value) === null || i === void 0 ? void 0 : i[0];
      }
      var o = this.deleteByPath(a.map, n.slice(1));
      return (!a.map || a.map.size === 0) && !a.value && t.delete(n[0]), o;
    }
  }, {
    key: "delete",
    value: function(t) {
      if (this.has(t))
        return this.keys = this.keys.filter(function(n) {
          return !Ap(n, t);
        }), this.deleteByPath(this.cache, t);
    }
  }]), e;
}();
w(bo, "MAX_CACHE_SIZE", 20);
w(bo, "MAX_CACHE_OFFSET", 5);
var os = 0, Ul = /* @__PURE__ */ function() {
  function e(r) {
    er(this, e), w(this, "derivatives", void 0), w(this, "id", void 0), this.derivatives = Array.isArray(r) ? r : [r], this.id = os, r.length === 0 && Kt(r.length > 0, "[Ant Design CSS-in-JS] Theme should have at least one derivative function."), os += 1;
  }
  return rr(e, [{
    key: "getDerivativeToken",
    value: function(t) {
      return this.derivatives.reduce(function(n, a) {
        return a(t, n);
      }, void 0);
    }
  }]), e;
}(), Ua = new bo();
function mi(e) {
  var r = Array.isArray(e) ? e : [e];
  return Ua.has(r) || Ua.set(r, new Ul(r)), Ua.get(r);
}
var Mp = /* @__PURE__ */ new WeakMap(), qa = {};
function kp(e, r) {
  for (var t = Mp, n = 0; n < r.length; n += 1) {
    var a = r[n];
    t.has(a) || t.set(a, /* @__PURE__ */ new WeakMap()), t = t.get(a);
  }
  return t.has(qa) || t.set(qa, e()), t.get(qa);
}
var ss = /* @__PURE__ */ new WeakMap();
function Wt(e) {
  var r = ss.get(e) || "";
  return r || (Object.keys(e).forEach(function(t) {
    var n = e[t];
    r += t, n instanceof Ul ? r += n.id : n && Z(n) === "object" ? r += Wt(n) : r += n;
  }), r = Gt(r), ss.set(e, r)), r;
}
function ls(e, r) {
  return Gt("".concat(r, "_").concat(Wt(e)));
}
var hi = Lr();
function ze(e) {
  return typeof e == "number" ? "".concat(e, "px") : e;
}
function Kn(e, r, t) {
  var n, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
  if (i)
    return e;
  var o = j(j({}, a), {}, (n = {}, w(n, xt, r), w(n, jr, t), n)), s = Object.keys(o).map(function(l) {
    var c = o[l];
    return c ? "".concat(l, '="').concat(c, '"') : null;
  }).filter(function(l) {
    return l;
  }).join(" ");
  return "<style ".concat(s, ">").concat(e, "</style>");
}
var zn = function(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return "--".concat(t ? "".concat(t, "-") : "").concat(r).replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
}, Vp = function(r, t, n) {
  return Object.keys(r).length ? ".".concat(t).concat(n != null && n.scope ? ".".concat(n.scope) : "", "{").concat(Object.entries(r).map(function(a) {
    var i = W(a, 2), o = i[0], s = i[1];
    return "".concat(o, ":").concat(s, ";");
  }).join(""), "}") : "";
}, ql = function(r, t, n) {
  var a = {}, i = {};
  return Object.entries(r).forEach(function(o) {
    var s, l, c = W(o, 2), u = c[0], d = c[1];
    if (n != null && (s = n.preserve) !== null && s !== void 0 && s[u])
      i[u] = d;
    else if ((typeof d == "string" || typeof d == "number") && !(n != null && (l = n.ignore) !== null && l !== void 0 && l[u])) {
      var f, p = zn(u, n == null ? void 0 : n.prefix);
      a[p] = typeof d == "number" && !(n != null && (f = n.unitless) !== null && f !== void 0 && f[u]) ? "".concat(d, "px") : String(d), i[u] = "var(".concat(p, ")");
    }
  }), [i, Vp(a, t, {
    scope: n == null ? void 0 : n.scope
  })];
}, cs = process.env.NODE_ENV !== "test" && Lr() ? E.useLayoutEffect : E.useEffect, Gn = function(r, t) {
  var n = E.useRef(!0);
  cs(function() {
    return r(n.current);
  }, t), cs(function() {
    return n.current = !1, function() {
      n.current = !0;
    };
  }, []);
}, us = function(r, t) {
  Gn(function(n) {
    if (!n)
      return r();
  }, t);
}, Ip = j({}, E), ds = Ip.useInsertionEffect, Dp = function(r, t, n) {
  E.useMemo(r, n), Gn(function() {
    return t(!0);
  }, n);
}, Lp = ds ? function(e, r, t) {
  return ds(function() {
    return e(), r();
  }, t);
} : Dp, zp = j({}, E), Bp = zp.useInsertionEffect, Hp = function(r) {
  var t = [], n = !1;
  function a(i) {
    if (n) {
      process.env.NODE_ENV !== "production" && Kt(!1, "[Ant Design CSS-in-JS] You are registering a cleanup function after unmount, which will not have any effect.");
      return;
    }
    t.push(i);
  }
  return E.useEffect(function() {
    return n = !1, function() {
      n = !0, t.length && t.forEach(function(i) {
        return i();
      });
    };
  }, r), a;
}, Wp = function() {
  return function(r) {
    r();
  };
}, Up = typeof Bp < "u" ? Hp : Wp;
function qp() {
  return !1;
}
var gi = !1;
function Yp() {
  return gi;
}
const Kp = process.env.NODE_ENV === "production" ? qp : Yp;
if (process.env.NODE_ENV !== "production" && typeof module < "u" && module && module.hot && typeof window < "u") {
  var On = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : null;
  if (On && typeof On.webpackHotUpdate == "function") {
    var Gp = On.webpackHotUpdate;
    On.webpackHotUpdate = function() {
      return gi = !0, setTimeout(function() {
        gi = !1;
      }, 0), Gp.apply(void 0, arguments);
    };
  }
}
function xo(e, r, t, n, a) {
  var i = E.useContext(Sn), o = i.cache, s = [e].concat(X(r)), l = pi(s), c = Up([l]), u = Kp(), d = function(m) {
    o.opUpdate(l, function(v) {
      var b = v || [void 0, void 0], h = W(b, 2), C = h[0], _ = C === void 0 ? 0 : C, S = h[1], $ = S;
      process.env.NODE_ENV !== "production" && S && u && (n == null || n($, u), $ = null);
      var x = $ || t(), R = [_, x];
      return m ? m(R) : R;
    });
  };
  E.useMemo(
    function() {
      d();
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [l]
    /* eslint-enable */
  );
  var f = o.opGet(l);
  process.env.NODE_ENV !== "production" && !f && (d(), f = o.opGet(l));
  var p = f[1];
  return Lp(function() {
    a == null || a(p);
  }, function(y) {
    return d(function(m) {
      var v = W(m, 2), b = v[0], h = v[1];
      return y && b === 0 && (a == null || a(p)), [b + 1, h];
    }), function() {
      o.opUpdate(l, function(m) {
        var v = m || [], b = W(v, 2), h = b[0], C = h === void 0 ? 0 : h, _ = b[1], S = C - 1;
        return S === 0 ? (c(function() {
          (y || !o.opGet(l)) && (n == null || n(_, !1));
        }), null) : [C - 1, _];
      });
    };
  }, [l]), p;
}
var Jp = {}, Xp = process.env.NODE_ENV !== "production" ? "css-dev-only-do-not-override" : "css", Zr = /* @__PURE__ */ new Map();
function Qp(e) {
  Zr.set(e, (Zr.get(e) || 0) + 1);
}
function Zp(e, r) {
  if (typeof document < "u") {
    var t = document.querySelectorAll("style[".concat(xt, '="').concat(e, '"]'));
    t.forEach(function(n) {
      if (n[qr] === r) {
        var a;
        (a = n.parentNode) === null || a === void 0 || a.removeChild(n);
      }
    });
  }
}
var em = 0;
function rm(e, r) {
  Zr.set(e, (Zr.get(e) || 0) - 1);
  var t = Array.from(Zr.keys()), n = t.filter(function(a) {
    var i = Zr.get(a) || 0;
    return i <= 0;
  });
  t.length - n.length > em && n.forEach(function(a) {
    Zp(a, r), Zr.delete(a);
  });
}
var tm = function(r, t, n, a) {
  var i = n.getDerivativeToken(r), o = j(j({}, i), t);
  return a && (o = a(o)), o;
}, Yl = "token";
function nm(e, r) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = Ue(Sn), a = n.cache.instanceId, i = n.container, o = t.salt, s = o === void 0 ? "" : o, l = t.override, c = l === void 0 ? Jp : l, u = t.formatToken, d = t.getComputedToken, f = t.cssVar, p = kp(function() {
    return Object.assign.apply(Object, [{}].concat(X(r)));
  }, r), y = Wt(p), m = Wt(c), v = f ? Wt(f) : "", b = xo(Yl, [s, e.id, y, m, v], function() {
    var h, C = d ? d(p, c, e) : tm(p, c, e, u), _ = j({}, C), S = "";
    if (f) {
      var $ = ql(C, f.key, {
        prefix: f.prefix,
        ignore: f.ignore,
        unitless: f.unitless,
        preserve: f.preserve
      }), x = W($, 2);
      C = x[0], S = x[1];
    }
    var R = ls(C, s);
    C._tokenKey = R, _._tokenKey = ls(_, s);
    var T = (h = f == null ? void 0 : f.key) !== null && h !== void 0 ? h : R;
    C._themeKey = T, Qp(T);
    var O = "".concat(Xp, "-").concat(Gt(R));
    return C._hashId = O, [C, O, _, S, (f == null ? void 0 : f.key) || ""];
  }, function(h) {
    rm(h[0]._themeKey, a);
  }, function(h) {
    var C = W(h, 4), _ = C[0], S = C[3];
    if (f && S) {
      var $ = rt(S, Gt("css-variables-".concat(_._themeKey)), {
        mark: jr,
        prepend: "queue",
        attachTo: i,
        priority: -999
      });
      $[qr] = a, $.setAttribute(xt, _._themeKey);
    }
  });
  return b;
}
var am = function(r, t, n) {
  var a = W(r, 5), i = a[2], o = a[3], s = a[4], l = n || {}, c = l.plain;
  if (!o)
    return null;
  var u = i._tokenKey, d = -999, f = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(d)
  }, p = Kn(o, s, u, f, c);
  return [d, u, p];
};
function P() {
  return P = Object.assign ? Object.assign.bind() : function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = arguments[r];
      for (var n in t) ({}).hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }, P.apply(null, arguments);
}
var im = {
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
}, Kl = "comm", Gl = "rule", Jl = "decl", om = "@import", sm = "@namespace", lm = "@keyframes", cm = "@layer", Xl = Math.abs, So = String.fromCharCode;
function Ql(e) {
  return e.trim();
}
function Bn(e, r, t) {
  return e.replace(r, t);
}
function um(e, r, t) {
  return e.indexOf(r, t);
}
function yt(e, r) {
  return e.charCodeAt(r) | 0;
}
function St(e, r, t) {
  return e.slice(r, t);
}
function Mr(e) {
  return e.length;
}
function dm(e) {
  return e.length;
}
function jn(e, r) {
  return r.push(e), e;
}
var Na = 1, Ct = 1, Zl = 0, _r = 0, We = 0, Pt = "";
function Co(e, r, t, n, a, i, o, s) {
  return { value: e, root: r, parent: t, type: n, props: a, children: i, line: Na, column: Ct, length: o, return: "", siblings: s };
}
function fm() {
  return We;
}
function vm() {
  return We = _r > 0 ? yt(Pt, --_r) : 0, Ct--, We === 10 && (Ct = 1, Na--), We;
}
function Fr() {
  return We = _r < Zl ? yt(Pt, _r++) : 0, Ct++, We === 10 && (Ct = 1, Na++), We;
}
function Yr() {
  return yt(Pt, _r);
}
function Hn() {
  return _r;
}
function Aa(e, r) {
  return St(Pt, e, r);
}
function Qt(e) {
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
function pm(e) {
  return Na = Ct = 1, Zl = Mr(Pt = e), _r = 0, [];
}
function mm(e) {
  return Pt = "", e;
}
function Ya(e) {
  return Ql(Aa(_r - 1, yi(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function hm(e) {
  for (; (We = Yr()) && We < 33; )
    Fr();
  return Qt(e) > 2 || Qt(We) > 3 ? "" : " ";
}
function gm(e, r) {
  for (; --r && Fr() && !(We < 48 || We > 102 || We > 57 && We < 65 || We > 70 && We < 97); )
    ;
  return Aa(e, Hn() + (r < 6 && Yr() == 32 && Fr() == 32));
}
function yi(e) {
  for (; Fr(); )
    switch (We) {
      case e:
        return _r;
      case 34:
      case 39:
        e !== 34 && e !== 39 && yi(We);
        break;
      case 40:
        e === 41 && yi(e);
        break;
      case 92:
        Fr();
        break;
    }
  return _r;
}
function ym(e, r) {
  for (; Fr() && e + We !== 57; )
    if (e + We === 84 && Yr() === 47)
      break;
  return "/*" + Aa(r, _r - 1) + "*" + So(e === 47 ? e : Fr());
}
function bm(e) {
  for (; !Qt(Yr()); )
    Fr();
  return Aa(e, _r);
}
function xm(e) {
  return mm(Wn("", null, null, null, [""], e = pm(e), 0, [0], e));
}
function Wn(e, r, t, n, a, i, o, s, l) {
  for (var c = 0, u = 0, d = o, f = 0, p = 0, y = 0, m = 1, v = 1, b = 1, h = 0, C = "", _ = a, S = i, $ = n, x = C; v; )
    switch (y = h, h = Fr()) {
      case 40:
        if (y != 108 && yt(x, d - 1) == 58) {
          um(x += Bn(Ya(h), "&", "&\f"), "&\f", Xl(c ? s[c - 1] : 0)) != -1 && (b = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        x += Ya(h);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        x += hm(y);
        break;
      case 92:
        x += gm(Hn() - 1, 7);
        continue;
      case 47:
        switch (Yr()) {
          case 42:
          case 47:
            jn(Sm(ym(Fr(), Hn()), r, t, l), l), (Qt(y || 1) == 5 || Qt(Yr() || 1) == 5) && Mr(x) && St(x, -1, void 0) !== " " && (x += " ");
            break;
          default:
            x += "/";
        }
        break;
      case 123 * m:
        s[c++] = Mr(x) * b;
      case 125 * m:
      case 59:
      case 0:
        switch (h) {
          case 0:
          case 125:
            v = 0;
          case 59 + u:
            b == -1 && (x = Bn(x, /\f/g, "")), p > 0 && (Mr(x) - d || m === 0 && y === 47) && jn(p > 32 ? vs(x + ";", n, t, d - 1, l) : vs(Bn(x, " ", "") + ";", n, t, d - 2, l), l);
            break;
          case 59:
            x += ";";
          default:
            if (jn($ = fs(x, r, t, c, u, a, s, C, _ = [], S = [], d, i), i), h === 123)
              if (u === 0)
                Wn(x, r, $, $, _, i, d, s, S);
              else {
                switch (f) {
                  case 99:
                    if (yt(x, 3) === 110) break;
                  case 108:
                    if (yt(x, 2) === 97) break;
                  default:
                    u = 0;
                  case 100:
                  case 109:
                  case 115:
                }
                u ? Wn(e, $, $, n && jn(fs(e, $, $, 0, 0, a, s, C, a, _ = [], d, S), S), a, S, d, s, n ? _ : S) : Wn(x, $, $, $, [""], S, 0, s, S);
              }
        }
        c = u = p = 0, m = b = 1, C = x = "", d = o;
        break;
      case 58:
        d = 1 + Mr(x), p = y;
      default:
        if (m < 1) {
          if (h == 123)
            --m;
          else if (h == 125 && m++ == 0 && vm() == 125)
            continue;
        }
        switch (x += So(h), h * m) {
          case 38:
            b = u > 0 ? 1 : (x += "\f", -1);
            break;
          case 44:
            s[c++] = (Mr(x) - 1) * b, b = 1;
            break;
          case 64:
            Yr() === 45 && (x += Ya(Fr())), f = Yr(), u = d = Mr(C = x += bm(Hn())), h++;
            break;
          case 45:
            y === 45 && Mr(x) == 2 && (m = 0);
        }
    }
  return i;
}
function fs(e, r, t, n, a, i, o, s, l, c, u, d) {
  for (var f = a - 1, p = a === 0 ? i : [""], y = dm(p), m = 0, v = 0, b = 0; m < n; ++m)
    for (var h = 0, C = St(e, f + 1, f = Xl(v = o[m])), _ = e; h < y; ++h)
      (_ = Ql(v > 0 ? p[h] + " " + C : Bn(C, /&\f/g, p[h]))) && (l[b++] = _);
  return Co(e, r, t, a === 0 ? Gl : s, l, c, u, d);
}
function Sm(e, r, t, n) {
  return Co(e, r, t, Kl, So(fm()), St(e, 2, -2), 0, n);
}
function vs(e, r, t, n, a) {
  return Co(e, r, t, Jl, St(e, 0, n), St(e, n + 1, -1), n, a);
}
function bi(e, r) {
  for (var t = "", n = 0; n < e.length; n++)
    t += r(e[n], n, e, r) || "";
  return t;
}
function Cm(e, r, t, n) {
  switch (e.type) {
    case cm:
      if (e.children.length) break;
    case om:
    case sm:
    case Jl:
      return e.return = e.return || e.value;
    case Kl:
      return "";
    case lm:
      return e.return = e.value + "{" + bi(e.children, n) + "}";
    case Gl:
      if (!Mr(e.value = e.props.join(","))) return "";
  }
  return Mr(t = bi(e.children, n)) ? e.return = e.value + "{" + t + "}" : "";
}
function ec(e, r) {
  var t = r.path, n = r.parentSelectors;
  Ie(!1, "[Ant Design CSS-in-JS] ".concat(t ? "Error in ".concat(t, ": ") : "").concat(e).concat(n.length ? " Selector: ".concat(n.join(" | ")) : ""));
}
var Em = function(r, t, n) {
  if (r === "content") {
    var a = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, i = ["normal", "none", "initial", "inherit", "unset"];
    (typeof t != "string" || i.indexOf(t) === -1 && !a.test(t) && (t.charAt(0) !== t.charAt(t.length - 1) || t.charAt(0) !== '"' && t.charAt(0) !== "'")) && ec("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"".concat(t, "\"'`."), n);
  }
}, wm = function(r, t, n) {
  r === "animation" && n.hashId && t !== "none" && ec("You seem to be using hashed animation '".concat(t, "', in which case 'animationName' with Keyframe as value is recommended."), n);
}, ps = "data-ant-cssinjs-cache-path", rc = "_FILE_STYLE__", tt, tc = !0;
function $m() {
  if (!tt && (tt = {}, Lr())) {
    var e = document.createElement("div");
    e.className = ps, e.style.position = "fixed", e.style.visibility = "hidden", e.style.top = "-9999px", document.body.appendChild(e);
    var r = getComputedStyle(e).content || "";
    r = r.replace(/^"/, "").replace(/"$/, ""), r.split(";").forEach(function(a) {
      var i = a.split(":"), o = W(i, 2), s = o[0], l = o[1];
      tt[s] = l;
    });
    var t = document.querySelector("style[".concat(ps, "]"));
    if (t) {
      var n;
      tc = !1, (n = t.parentNode) === null || n === void 0 || n.removeChild(t);
    }
    document.body.removeChild(e);
  }
}
function _m(e) {
  return $m(), !!tt[e];
}
function Rm(e) {
  var r = tt[e], t = null;
  if (r && Lr())
    if (tc)
      t = rc;
    else {
      var n = document.querySelector("style[".concat(jr, '="').concat(tt[e], '"]'));
      n ? t = n.innerHTML : delete tt[e];
    }
  return [t, r];
}
var nc = "_skip_check_", ac = "_multi_value_";
function Un(e) {
  var r = bi(xm(e), Cm);
  return r.replace(/\{%%%\:[^;];}/g, ";");
}
function Pm(e) {
  return Z(e) === "object" && e && (nc in e || ac in e);
}
function ms(e, r, t) {
  if (!r)
    return e;
  var n = ".".concat(r), a = t === "low" ? ":where(".concat(n, ")") : n, i = e.split(",").map(function(o) {
    var s, l = o.trim().split(/\s+/), c = l[0] || "", u = ((s = c.match(/^\w+/)) === null || s === void 0 ? void 0 : s[0]) || "";
    return c = "".concat(u).concat(a).concat(c.slice(u.length)), [c].concat(X(l.slice(1))).join(" ");
  });
  return i.join(",");
}
var Tm = function e(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    root: !0,
    parentSelectors: []
  }, a = n.root, i = n.injectHash, o = n.parentSelectors, s = t.hashId, l = t.layer, c = t.path, u = t.hashPriority, d = t.transformers, f = d === void 0 ? [] : d, p = t.linters, y = p === void 0 ? [] : p, m = "", v = {};
  function b(_) {
    var S = _.getName(s);
    if (!v[S]) {
      var $ = e(_.style, t, {
        root: !1,
        parentSelectors: o
      }), x = W($, 1), R = x[0];
      v[S] = "@keyframes ".concat(_.getName(s)).concat(R);
    }
  }
  function h(_) {
    var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    return _.forEach(function($) {
      Array.isArray($) ? h($, S) : $ && S.push($);
    }), S;
  }
  var C = h(Array.isArray(r) ? r : [r]);
  return C.forEach(function(_) {
    var S = typeof _ == "string" && !a ? {} : _;
    if (typeof S == "string")
      m += "".concat(S, `
`);
    else if (S._keyframe)
      b(S);
    else {
      var $ = f.reduce(function(x, R) {
        var T;
        return (R == null || (T = R.visit) === null || T === void 0 ? void 0 : T.call(R, x)) || x;
      }, S);
      Object.keys($).forEach(function(x) {
        var R = $[x];
        if (Z(R) === "object" && R && (x !== "animationName" || !R._keyframe) && !Pm(R)) {
          var T = !1, O = x.trim(), M = !1;
          (a || i) && s ? O.startsWith("@") ? T = !0 : O === "&" ? O = ms("", s, u) : O = ms(x, s, u) : a && !s && (O === "&" || O === "") && (O = "", M = !0);
          var I = e(R, t, {
            root: M,
            injectHash: T,
            parentSelectors: [].concat(X(o), [O])
          }), F = W(I, 2), A = F[0], V = F[1];
          v = j(j({}, v), V), m += "".concat(O).concat(A);
        } else {
          let H = function(ee, Q) {
            process.env.NODE_ENV !== "production" && (Z(R) !== "object" || !(R != null && R[nc])) && [Em, wm].concat(X(y)).forEach(function(U) {
              return U(ee, Q, {
                path: c,
                hashId: s,
                parentSelectors: o
              });
            });
            var re = ee.replace(/[A-Z]/g, function(U) {
              return "-".concat(U.toLowerCase());
            }), q = Q;
            !im[ee] && typeof q == "number" && q !== 0 && (q = "".concat(q, "px")), ee === "animationName" && Q !== null && Q !== void 0 && Q._keyframe && (b(Q), q = Q.getName(s)), m += "".concat(re, ":").concat(q, ";");
          };
          var D, z = (D = R == null ? void 0 : R.value) !== null && D !== void 0 ? D : R;
          Z(R) === "object" && R !== null && R !== void 0 && R[ac] && Array.isArray(z) ? z.forEach(function(ee) {
            H(x, ee);
          }) : H(x, z);
        }
      });
    }
  }), a ? l && (m && (m = "@layer ".concat(l.name, " {").concat(m, "}")), l.dependencies && (v["@layer ".concat(l.name)] = l.dependencies.map(function(_) {
    return "@layer ".concat(_, ", ").concat(l.name, ";");
  }).join(`
`))) : m = "{".concat(m, "}"), [m, v];
};
function ic(e, r) {
  return Gt("".concat(e.join("%")).concat(r));
}
function Om() {
  return null;
}
var oc = "style";
function xi(e, r) {
  var t = e.token, n = e.path, a = e.hashId, i = e.layer, o = e.nonce, s = e.clientOnly, l = e.order, c = l === void 0 ? 0 : l, u = E.useContext(Sn), d = u.autoClear, f = u.mock, p = u.defaultCache, y = u.hashPriority, m = u.container, v = u.ssrInline, b = u.transformers, h = u.linters, C = u.cache, _ = u.layer, S = t._tokenKey, $ = [S];
  _ && $.push("layer"), $.push.apply($, X(n));
  var x = hi;
  process.env.NODE_ENV !== "production" && f !== void 0 && (x = f === "client");
  var R = xo(
    oc,
    $,
    // Create cache if needed
    function() {
      var F = $.join("|");
      if (_m(F)) {
        var A = Rm(F), V = W(A, 2), D = V[0], z = V[1];
        if (D)
          return [D, S, z, {}, s, c];
      }
      var H = r(), ee = Tm(H, {
        hashId: a,
        hashPriority: y,
        layer: _ ? i : void 0,
        path: n.join("-"),
        transformers: b,
        linters: h
      }), Q = W(ee, 2), re = Q[0], q = Q[1], U = Un(re), Y = ic($, U);
      return [U, S, Y, q, s, c];
    },
    // Remove cache if no need
    function(F, A) {
      var V = W(F, 3), D = V[2];
      (A || d) && hi && Wl(D, {
        mark: jr
      });
    },
    // Effect: Inject style here
    function(F) {
      var A = W(F, 4), V = A[0];
      A[1];
      var D = A[2], z = A[3];
      if (x && V !== rc) {
        var H = {
          mark: jr,
          prepend: _ ? !1 : "queue",
          attachTo: m,
          priority: c
        }, ee = typeof o == "function" ? o() : o;
        ee && (H.csp = {
          nonce: ee
        });
        var Q = [], re = [];
        Object.keys(z).forEach(function(U) {
          U.startsWith("@layer") ? Q.push(U) : re.push(U);
        }), Q.forEach(function(U) {
          rt(Un(z[U]), "_layer-".concat(U), j(j({}, H), {}, {
            prepend: !0
          }));
        });
        var q = rt(V, D, H);
        q[qr] = C.instanceId, q.setAttribute(xt, S), process.env.NODE_ENV !== "production" && q.setAttribute(jp, $.join("|")), re.forEach(function(U) {
          rt(Un(z[U]), "_effect-".concat(U), H);
        });
      }
    }
  ), T = W(R, 3), O = T[0], M = T[1], I = T[2];
  return function(F) {
    var A;
    if (!v || x || !p)
      A = /* @__PURE__ */ E.createElement(Om, null);
    else {
      var V;
      A = /* @__PURE__ */ E.createElement("style", P({}, (V = {}, w(V, xt, M), w(V, jr, I), V), {
        dangerouslySetInnerHTML: {
          __html: O
        }
      }));
    }
    return /* @__PURE__ */ E.createElement(E.Fragment, null, A, F);
  };
}
var jm = function(r, t, n) {
  var a = W(r, 6), i = a[0], o = a[1], s = a[2], l = a[3], c = a[4], u = a[5], d = n || {}, f = d.plain;
  if (c)
    return null;
  var p = i, y = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(u)
  };
  return p = Kn(i, o, s, y, f), l && Object.keys(l).forEach(function(m) {
    if (!t[m]) {
      t[m] = !0;
      var v = Un(l[m]), b = Kn(v, o, "_effect-".concat(m), y, f);
      m.startsWith("@layer") ? p = b + p : p += b;
    }
  }), [u, s, p];
}, sc = "cssVar", Fm = function(r, t) {
  var n = r.key, a = r.prefix, i = r.unitless, o = r.ignore, s = r.token, l = r.scope, c = l === void 0 ? "" : l, u = Ue(Sn), d = u.cache.instanceId, f = u.container, p = s._tokenKey, y = [].concat(X(r.path), [n, c, p]), m = xo(sc, y, function() {
    var v = t(), b = ql(v, n, {
      prefix: a,
      unitless: i,
      ignore: o,
      scope: c
    }), h = W(b, 2), C = h[0], _ = h[1], S = ic(y, _);
    return [C, _, S, n];
  }, function(v) {
    var b = W(v, 3), h = b[2];
    hi && Wl(h, {
      mark: jr
    });
  }, function(v) {
    var b = W(v, 3), h = b[1], C = b[2];
    if (h) {
      var _ = rt(h, C, {
        mark: jr,
        prepend: "queue",
        attachTo: f,
        priority: -999
      });
      _[qr] = d, _.setAttribute(xt, n);
    }
  });
  return m;
}, Nm = function(r, t, n) {
  var a = W(r, 4), i = a[1], o = a[2], s = a[3], l = n || {}, c = l.plain;
  if (!i)
    return null;
  var u = -999, d = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(u)
  }, f = Kn(i, s, o, d, c);
  return [u, o, f];
}, Lt;
Lt = {}, w(Lt, oc, jm), w(Lt, Yl, am), w(Lt, sc, Nm);
function ft(e) {
  return e.notSplit = !0, e;
}
ft(["borderTop", "borderBottom"]), ft(["borderTop"]), ft(["borderBottom"]), ft(["borderLeft", "borderRight"]), ft(["borderLeft"]), ft(["borderRight"]);
var Eo = /* @__PURE__ */ Ze({});
function Am(e) {
  return Vl(e) || Ll(e) || ho(e) || Il();
}
function kr(e, r) {
  for (var t = e, n = 0; n < r.length; n += 1) {
    if (t == null)
      return;
    t = t[r[n]];
  }
  return t;
}
function lc(e, r, t, n) {
  if (!r.length)
    return t;
  var a = Am(r), i = a[0], o = a.slice(1), s;
  return !e && typeof i == "number" ? s = [] : Array.isArray(e) ? s = X(e) : s = j({}, e), n && t === void 0 && o.length === 1 ? delete s[i][o[0]] : s[i] = lc(s[i], o, t, n), s;
}
function Tr(e, r, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return r.length && n && t === void 0 && !kr(e, r.slice(0, -1)) ? e : lc(e, r, t, n);
}
function Mm(e) {
  return Z(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function hs(e) {
  return Array.isArray(e) ? [] : {};
}
var km = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function mt() {
  for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
    r[t] = arguments[t];
  var n = hs(r[0]);
  return r.forEach(function(a) {
    function i(o, s) {
      var l = new Set(s), c = kr(a, o), u = Array.isArray(c);
      if (u || Mm(c)) {
        if (!l.has(c)) {
          l.add(c);
          var d = kr(n, o);
          u ? n = Tr(n, o, []) : (!d || Z(d) !== "object") && (n = Tr(n, o, hs(c))), km(c).forEach(function(f) {
            i([].concat(X(o), [f]), l);
          });
        }
      } else
        n = Tr(n, o, c);
    }
    i([]);
  }), n;
}
const Vm = /* @__PURE__ */ Ze(void 0);
var Im = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: !0
}, Dm = j(j({}, Im), {}, {
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
const Lm = {
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
}, Dm), Object.assign({}, Lm);
const vr = "${label} is not a valid ${type}", Ma = {
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
        string: vr,
        method: vr,
        array: vr,
        object: vr,
        number: vr,
        date: vr,
        boolean: vr,
        integer: vr,
        float: vr,
        regexp: vr,
        email: vr,
        url: vr,
        hex: vr
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
Object.assign({}, Ma.Modal);
let qn = [];
const gs = () => qn.reduce((e, r) => Object.assign(Object.assign({}, e), r), Ma.Modal);
function zm(e) {
  if (e) {
    const r = Object.assign({}, e);
    return qn.push(r), gs(), () => {
      qn = qn.filter((t) => t !== r), gs();
    };
  }
  Object.assign({}, Ma.Modal);
}
const cc = /* @__PURE__ */ Ze(void 0), uc = "internalMark", dc = (e) => {
  const {
    locale: r = {},
    children: t,
    _ANT_MARK__: n
  } = e;
  if (process.env.NODE_ENV !== "production") {
    const i = nt("LocaleProvider");
    process.env.NODE_ENV !== "production" && i(n === uc, "deprecated", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale");
  }
  E.useEffect(() => zm(r == null ? void 0 : r.Modal), [r]);
  const a = E.useMemo(() => Object.assign(Object.assign({}, r), {
    exist: !0
  }), [r]);
  return /* @__PURE__ */ E.createElement(cc.Provider, {
    value: a
  }, t);
};
process.env.NODE_ENV !== "production" && (dc.displayName = "LocaleProvider");
const fc = {
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
}, Zt = Object.assign(Object.assign({}, fc), {
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
}), Ge = Math.round;
function Ka(e, r) {
  const t = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], n = t.map((a) => parseFloat(a));
  for (let a = 0; a < 3; a += 1)
    n[a] = r(n[a] || 0, t[a] || "", a);
  return t[3] ? n[3] = t[3].includes("%") ? n[3] / 100 : n[3] : n[3] = 1, n;
}
const ys = (e, r, t) => t === 0 ? e : e / 100;
function zt(e, r) {
  const t = r || 255;
  return e > t ? t : e < 0 ? 0 : e;
}
class Ne {
  constructor(r) {
    w(this, "isValid", !0), w(this, "r", 0), w(this, "g", 0), w(this, "b", 0), w(this, "a", 1), w(this, "_h", void 0), w(this, "_s", void 0), w(this, "_l", void 0), w(this, "_v", void 0), w(this, "_max", void 0), w(this, "_min", void 0), w(this, "_brightness", void 0);
    function t(n) {
      return n[0] in r && n[1] in r && n[2] in r;
    }
    if (r) if (typeof r == "string") {
      let a = function(i) {
        return n.startsWith(i);
      };
      const n = r.trim();
      /^#?[A-F\d]{3,8}$/i.test(n) ? this.fromHexString(n) : a("rgb") ? this.fromRgbString(n) : a("hsl") ? this.fromHslString(n) : (a("hsv") || a("hsb")) && this.fromHsvString(n);
    } else if (r instanceof Ne)
      this.r = r.r, this.g = r.g, this.b = r.b, this.a = r.a, this._h = r._h, this._s = r._s, this._l = r._l, this._v = r._v;
    else if (t("rgb"))
      this.r = zt(r.r), this.g = zt(r.g), this.b = zt(r.b), this.a = typeof r.a == "number" ? zt(r.a, 1) : 1;
    else if (t("hsl"))
      this.fromHsl(r);
    else if (t("hsv"))
      this.fromHsv(r);
    else
      throw new Error("@ant-design/fast-color: unsupported input " + JSON.stringify(r));
  }
  // ======================= Setter =======================
  setR(r) {
    return this._sc("r", r);
  }
  setG(r) {
    return this._sc("g", r);
  }
  setB(r) {
    return this._sc("b", r);
  }
  setA(r) {
    return this._sc("a", r, 1);
  }
  setHue(r) {
    const t = this.toHsv();
    return t.h = r, this._c(t);
  }
  // ======================= Getter =======================
  /**
   * Returns the perceived luminance of a color, from 0-1.
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  getLuminance() {
    function r(i) {
      const o = i / 255;
      return o <= 0.03928 ? o / 12.92 : Math.pow((o + 0.055) / 1.055, 2.4);
    }
    const t = r(this.r), n = r(this.g), a = r(this.b);
    return 0.2126 * t + 0.7152 * n + 0.0722 * a;
  }
  getHue() {
    if (typeof this._h > "u") {
      const r = this.getMax() - this.getMin();
      r === 0 ? this._h = 0 : this._h = Ge(60 * (this.r === this.getMax() ? (this.g - this.b) / r + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / r + 2 : (this.r - this.g) / r + 4));
    }
    return this._h;
  }
  getSaturation() {
    if (typeof this._s > "u") {
      const r = this.getMax() - this.getMin();
      r === 0 ? this._s = 0 : this._s = r / this.getMax();
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
  darken(r = 10) {
    const t = this.getHue(), n = this.getSaturation();
    let a = this.getLightness() - r / 100;
    return a < 0 && (a = 0), this._c({
      h: t,
      s: n,
      l: a,
      a: this.a
    });
  }
  lighten(r = 10) {
    const t = this.getHue(), n = this.getSaturation();
    let a = this.getLightness() + r / 100;
    return a > 1 && (a = 1), this._c({
      h: t,
      s: n,
      l: a,
      a: this.a
    });
  }
  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */
  mix(r, t = 50) {
    const n = this._c(r), a = t / 100, i = (s) => (n[s] - this[s]) * a + this[s], o = {
      r: Ge(i("r")),
      g: Ge(i("g")),
      b: Ge(i("b")),
      a: Ge(i("a") * 100) / 100
    };
    return this._c(o);
  }
  /**
   * Mix the color with pure white, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return white.
   */
  tint(r = 10) {
    return this.mix({
      r: 255,
      g: 255,
      b: 255,
      a: 1
    }, r);
  }
  /**
   * Mix the color with pure black, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return black.
   */
  shade(r = 10) {
    return this.mix({
      r: 0,
      g: 0,
      b: 0,
      a: 1
    }, r);
  }
  onBackground(r) {
    const t = this._c(r), n = this.a + t.a * (1 - this.a), a = (i) => Ge((this[i] * this.a + t[i] * t.a * (1 - this.a)) / n);
    return this._c({
      r: a("r"),
      g: a("g"),
      b: a("b"),
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
  equals(r) {
    return this.r === r.r && this.g === r.g && this.b === r.b && this.a === r.a;
  }
  clone() {
    return this._c(this);
  }
  // ======================= Format =======================
  toHexString() {
    let r = "#";
    const t = (this.r || 0).toString(16);
    r += t.length === 2 ? t : "0" + t;
    const n = (this.g || 0).toString(16);
    r += n.length === 2 ? n : "0" + n;
    const a = (this.b || 0).toString(16);
    if (r += a.length === 2 ? a : "0" + a, typeof this.a == "number" && this.a >= 0 && this.a < 1) {
      const i = Ge(this.a * 255).toString(16);
      r += i.length === 2 ? i : "0" + i;
    }
    return r;
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
    const r = this.getHue(), t = Ge(this.getSaturation() * 100), n = Ge(this.getLightness() * 100);
    return this.a !== 1 ? `hsla(${r},${t}%,${n}%,${this.a})` : `hsl(${r},${t}%,${n}%)`;
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
  _sc(r, t, n) {
    const a = this.clone();
    return a[r] = zt(t, n), a;
  }
  _c(r) {
    return new this.constructor(r);
  }
  getMax() {
    return typeof this._max > "u" && (this._max = Math.max(this.r, this.g, this.b)), this._max;
  }
  getMin() {
    return typeof this._min > "u" && (this._min = Math.min(this.r, this.g, this.b)), this._min;
  }
  fromHexString(r) {
    const t = r.replace("#", "");
    function n(a, i) {
      return parseInt(t[a] + t[i || a], 16);
    }
    t.length < 6 ? (this.r = n(0), this.g = n(1), this.b = n(2), this.a = t[3] ? n(3) / 255 : 1) : (this.r = n(0, 1), this.g = n(2, 3), this.b = n(4, 5), this.a = t[6] ? n(6, 7) / 255 : 1);
  }
  fromHsl({
    h: r,
    s: t,
    l: n,
    a
  }) {
    if (this._h = r % 360, this._s = t, this._l = n, this.a = typeof a == "number" ? a : 1, t <= 0) {
      const f = Ge(n * 255);
      this.r = f, this.g = f, this.b = f;
    }
    let i = 0, o = 0, s = 0;
    const l = r / 60, c = (1 - Math.abs(2 * n - 1)) * t, u = c * (1 - Math.abs(l % 2 - 1));
    l >= 0 && l < 1 ? (i = c, o = u) : l >= 1 && l < 2 ? (i = u, o = c) : l >= 2 && l < 3 ? (o = c, s = u) : l >= 3 && l < 4 ? (o = u, s = c) : l >= 4 && l < 5 ? (i = u, s = c) : l >= 5 && l < 6 && (i = c, s = u);
    const d = n - c / 2;
    this.r = Ge((i + d) * 255), this.g = Ge((o + d) * 255), this.b = Ge((s + d) * 255);
  }
  fromHsv({
    h: r,
    s: t,
    v: n,
    a
  }) {
    this._h = r % 360, this._s = t, this._v = n, this.a = typeof a == "number" ? a : 1;
    const i = Ge(n * 255);
    if (this.r = i, this.g = i, this.b = i, t <= 0)
      return;
    const o = r / 60, s = Math.floor(o), l = o - s, c = Ge(n * (1 - t) * 255), u = Ge(n * (1 - t * l) * 255), d = Ge(n * (1 - t * (1 - l)) * 255);
    switch (s) {
      case 0:
        this.g = d, this.b = c;
        break;
      case 1:
        this.r = u, this.b = c;
        break;
      case 2:
        this.r = c, this.b = d;
        break;
      case 3:
        this.r = c, this.g = u;
        break;
      case 4:
        this.r = d, this.g = c;
        break;
      case 5:
      default:
        this.g = c, this.b = u;
        break;
    }
  }
  fromHsvString(r) {
    const t = Ka(r, ys);
    this.fromHsv({
      h: t[0],
      s: t[1],
      v: t[2],
      a: t[3]
    });
  }
  fromHslString(r) {
    const t = Ka(r, ys);
    this.fromHsl({
      h: t[0],
      s: t[1],
      l: t[2],
      a: t[3]
    });
  }
  fromRgbString(r) {
    const t = Ka(r, (n, a) => (
      // Convert percentage to number. e.g. 50% -> 128
      a.includes("%") ? Ge(n / 100 * 255) : n
    ));
    this.r = t[0], this.g = t[1], this.b = t[2], this.a = t[3];
  }
}
var Fn = 2, bs = 0.16, Bm = 0.05, Hm = 0.05, Wm = 0.15, vc = 5, pc = 4, Um = [{
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
function xs(e, r, t) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = t ? Math.round(e.h) - Fn * r : Math.round(e.h) + Fn * r : n = t ? Math.round(e.h) + Fn * r : Math.round(e.h) - Fn * r, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function Ss(e, r, t) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return t ? n = e.s - bs * r : r === pc ? n = e.s + bs : n = e.s + Bm * r, n > 1 && (n = 1), t && r === vc && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Math.round(n * 100) / 100;
}
function Cs(e, r, t) {
  var n;
  return t ? n = e.v + Hm * r : n = e.v - Wm * r, n = Math.max(0, Math.min(1, n)), Math.round(n * 100) / 100;
}
function Jn(e) {
  for (var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = [], n = new Ne(e), a = n.toHsv(), i = vc; i > 0; i -= 1) {
    var o = new Ne({
      h: xs(a, i, !0),
      s: Ss(a, i, !0),
      v: Cs(a, i, !0)
    });
    t.push(o);
  }
  t.push(n);
  for (var s = 1; s <= pc; s += 1) {
    var l = new Ne({
      h: xs(a, s),
      s: Ss(a, s),
      v: Cs(a, s)
    });
    t.push(l);
  }
  return r.theme === "dark" ? Um.map(function(c) {
    var u = c.index, d = c.amount;
    return new Ne(r.backgroundColor || "#141414").mix(t[u], d).toHexString();
  }) : t.map(function(c) {
    return c.toHexString();
  });
}
var Ga = {
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
}, Si = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
Si.primary = Si[5];
var Ci = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
Ci.primary = Ci[5];
var Ei = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
Ei.primary = Ei[5];
var wi = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
wi.primary = wi[5];
var $i = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
$i.primary = $i[5];
var _i = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
_i.primary = _i[5];
var Ri = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
Ri.primary = Ri[5];
var Pi = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
Pi.primary = Pi[5];
var Ti = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
Ti.primary = Ti[5];
var Oi = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
Oi.primary = Oi[5];
var ji = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
ji.primary = ji[5];
var Fi = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
Fi.primary = Fi[5];
var Ni = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
Ni.primary = Ni[5];
var Ja = {
  red: Si,
  volcano: Ci,
  orange: Ei,
  gold: wi,
  yellow: $i,
  lime: _i,
  green: Ri,
  cyan: Pi,
  blue: Ti,
  geekblue: Oi,
  purple: ji,
  magenta: Fi,
  grey: Ni
};
function qm(e, {
  generateColorPalettes: r,
  generateNeutralColorPalettes: t
}) {
  const {
    colorSuccess: n,
    colorWarning: a,
    colorError: i,
    colorInfo: o,
    colorPrimary: s,
    colorBgBase: l,
    colorTextBase: c
  } = e, u = r(s), d = r(n), f = r(a), p = r(i), y = r(o), m = t(l, c), v = e.colorLink || e.colorInfo, b = r(v), h = new Ne(p[1]).mix(new Ne(p[3]), 50).toHexString();
  return Object.assign(Object.assign({}, m), {
    colorPrimaryBg: u[1],
    colorPrimaryBgHover: u[2],
    colorPrimaryBorder: u[3],
    colorPrimaryBorderHover: u[4],
    colorPrimaryHover: u[5],
    colorPrimary: u[6],
    colorPrimaryActive: u[7],
    colorPrimaryTextHover: u[8],
    colorPrimaryText: u[9],
    colorPrimaryTextActive: u[10],
    colorSuccessBg: d[1],
    colorSuccessBgHover: d[2],
    colorSuccessBorder: d[3],
    colorSuccessBorderHover: d[4],
    colorSuccessHover: d[4],
    colorSuccess: d[6],
    colorSuccessActive: d[7],
    colorSuccessTextHover: d[8],
    colorSuccessText: d[9],
    colorSuccessTextActive: d[10],
    colorErrorBg: p[1],
    colorErrorBgHover: p[2],
    colorErrorBgFilledHover: h,
    colorErrorBgActive: p[3],
    colorErrorBorder: p[3],
    colorErrorBorderHover: p[4],
    colorErrorHover: p[5],
    colorError: p[6],
    colorErrorActive: p[7],
    colorErrorTextHover: p[8],
    colorErrorText: p[9],
    colorErrorTextActive: p[10],
    colorWarningBg: f[1],
    colorWarningBgHover: f[2],
    colorWarningBorder: f[3],
    colorWarningBorderHover: f[4],
    colorWarningHover: f[4],
    colorWarning: f[6],
    colorWarningActive: f[7],
    colorWarningTextHover: f[8],
    colorWarningText: f[9],
    colorWarningTextActive: f[10],
    colorInfoBg: y[1],
    colorInfoBgHover: y[2],
    colorInfoBorder: y[3],
    colorInfoBorderHover: y[4],
    colorInfoHover: y[4],
    colorInfo: y[6],
    colorInfoActive: y[7],
    colorInfoTextHover: y[8],
    colorInfoText: y[9],
    colorInfoTextActive: y[10],
    colorLinkHover: b[4],
    colorLink: b[6],
    colorLinkActive: b[7],
    colorBgMask: new Ne("#000").setA(0.45).toRgbString(),
    colorWhite: "#fff"
  });
}
const Ym = (e) => {
  let r = e, t = e, n = e, a = e;
  return e < 6 && e >= 5 ? r = e + 1 : e < 16 && e >= 6 ? r = e + 2 : e >= 16 && (r = 16), e < 7 && e >= 5 ? t = 4 : e < 8 && e >= 7 ? t = 5 : e < 14 && e >= 8 ? t = 6 : e < 16 && e >= 14 ? t = 7 : e >= 16 && (t = 8), e < 6 && e >= 2 ? n = 1 : e >= 6 && (n = 2), e > 4 && e < 8 ? a = 4 : e >= 8 && (a = 6), {
    borderRadius: e,
    borderRadiusXS: n,
    borderRadiusSM: t,
    borderRadiusLG: r,
    borderRadiusOuter: a
  };
};
function Km(e) {
  const {
    motionUnit: r,
    motionBase: t,
    borderRadius: n,
    lineWidth: a
  } = e;
  return Object.assign({
    // motion
    motionDurationFast: `${(t + r).toFixed(1)}s`,
    motionDurationMid: `${(t + r * 2).toFixed(1)}s`,
    motionDurationSlow: `${(t + r * 3).toFixed(1)}s`,
    // line
    lineWidthBold: a + 1
  }, Ym(n));
}
const Gm = (e) => {
  const {
    controlHeight: r
  } = e;
  return {
    controlHeightSM: r * 0.75,
    controlHeightXS: r * 0.5,
    controlHeightLG: r * 1.25
  };
};
function Jm(e) {
  return (e + 8) / e;
}
function Xm(e) {
  const r = Array.from({
    length: 10
  }).map((t, n) => {
    const a = n - 1, i = e * Math.pow(Math.E, a / 5), o = n > 1 ? Math.floor(i) : Math.ceil(i);
    return Math.floor(o / 2) * 2;
  });
  return r[1] = e, r.map((t) => ({
    size: t,
    lineHeight: Jm(t)
  }));
}
const Qm = (e) => {
  const r = Xm(e), t = r.map((u) => u.size), n = r.map((u) => u.lineHeight), a = t[1], i = t[0], o = t[2], s = n[1], l = n[0], c = n[2];
  return {
    fontSizeSM: i,
    fontSize: a,
    fontSizeLG: o,
    fontSizeXL: t[3],
    fontSizeHeading1: t[6],
    fontSizeHeading2: t[5],
    fontSizeHeading3: t[4],
    fontSizeHeading4: t[3],
    fontSizeHeading5: t[2],
    lineHeight: s,
    lineHeightLG: c,
    lineHeightSM: l,
    fontHeight: Math.round(s * a),
    fontHeightLG: Math.round(c * o),
    fontHeightSM: Math.round(l * i),
    lineHeightHeading1: n[6],
    lineHeightHeading2: n[5],
    lineHeightHeading3: n[4],
    lineHeightHeading4: n[3],
    lineHeightHeading5: n[2]
  };
};
function Zm(e) {
  const {
    sizeUnit: r,
    sizeStep: t
  } = e;
  return {
    sizeXXL: r * (t + 8),
    // 48
    sizeXL: r * (t + 4),
    // 32
    sizeLG: r * (t + 2),
    // 24
    sizeMD: r * (t + 1),
    // 20
    sizeMS: r * t,
    // 16
    size: r * t,
    // 16
    sizeSM: r * (t - 1),
    // 12
    sizeXS: r * (t - 2),
    // 8
    sizeXXS: r * (t - 3)
    // 4
  };
}
const Er = (e, r) => new Ne(e).setA(r).toRgbString(), Bt = (e, r) => new Ne(e).darken(r).toHexString(), eh = (e) => {
  const r = Jn(e);
  return {
    1: r[0],
    2: r[1],
    3: r[2],
    4: r[3],
    5: r[4],
    6: r[5],
    7: r[6],
    8: r[4],
    9: r[5],
    10: r[6]
    // 8: colors[7],
    // 9: colors[8],
    // 10: colors[9],
  };
}, rh = (e, r) => {
  const t = e || "#fff", n = r || "#000";
  return {
    colorBgBase: t,
    colorTextBase: n,
    colorText: Er(n, 0.88),
    colorTextSecondary: Er(n, 0.65),
    colorTextTertiary: Er(n, 0.45),
    colorTextQuaternary: Er(n, 0.25),
    colorFill: Er(n, 0.15),
    colorFillSecondary: Er(n, 0.06),
    colorFillTertiary: Er(n, 0.04),
    colorFillQuaternary: Er(n, 0.02),
    colorBgSolid: Er(n, 1),
    colorBgSolidHover: Er(n, 0.75),
    colorBgSolidActive: Er(n, 0.95),
    colorBgLayout: Bt(t, 4),
    colorBgContainer: Bt(t, 0),
    colorBgElevated: Bt(t, 0),
    colorBgSpotlight: Er(n, 0.85),
    colorBgBlur: "transparent",
    colorBorder: Bt(t, 15),
    colorBorderSecondary: Bt(t, 6)
  };
};
function th(e) {
  Ga.pink = Ga.magenta, Ja.pink = Ja.magenta;
  const r = Object.keys(fc).map((t) => {
    const n = e[t] === Ga[t] ? Ja[t] : Jn(e[t]);
    return Array.from({
      length: 10
    }, () => 1).reduce((a, i, o) => (a[`${t}-${o + 1}`] = n[o], a[`${t}${o + 1}`] = n[o], a), {});
  }).reduce((t, n) => (t = Object.assign(Object.assign({}, t), n), t), {});
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e), r), qm(e, {
    generateColorPalettes: eh,
    generateNeutralColorPalettes: rh
  })), Qm(e.fontSize)), Zm(e)), Gm(e)), Km(e));
}
const mc = mi(th), Ai = {
  token: Zt,
  override: {
    override: Zt
  },
  hashed: !0
}, hc = /* @__PURE__ */ J.createContext(Ai), Mi = "ant", wo = "anticon", nh = ["outlined", "borderless", "filled", "underlined"], ah = (e, r) => r || (e ? `${Mi}-${e}` : Mi), Kr = /* @__PURE__ */ E.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: ah,
  iconPrefixCls: wo
}), {
  Consumer: U0
} = Kr, Es = {};
function gc(e) {
  const r = E.useContext(Kr), {
    getPrefixCls: t,
    direction: n,
    getPopupContainer: a
  } = r, i = r[e];
  return Object.assign(Object.assign({
    classNames: Es,
    styles: Es
  }, i), {
    getPrefixCls: t,
    direction: n,
    getPopupContainer: a
  });
}
const ih = `-ant-${Date.now()}-${Math.random()}`;
function oh(e, r) {
  const t = {}, n = (o, s) => {
    let l = o.clone();
    return l = (s == null ? void 0 : s(l)) || l, l.toRgbString();
  }, a = (o, s) => {
    const l = new Ne(o), c = Jn(l.toRgbString());
    t[`${s}-color`] = n(l), t[`${s}-color-disabled`] = c[1], t[`${s}-color-hover`] = c[4], t[`${s}-color-active`] = c[6], t[`${s}-color-outline`] = l.clone().setA(0.2).toRgbString(), t[`${s}-color-deprecated-bg`] = c[0], t[`${s}-color-deprecated-border`] = c[2];
  };
  if (r.primaryColor) {
    a(r.primaryColor, "primary");
    const o = new Ne(r.primaryColor), s = Jn(o.toRgbString());
    s.forEach((c, u) => {
      t[`primary-${u + 1}`] = c;
    }), t["primary-color-deprecated-l-35"] = n(o, (c) => c.lighten(35)), t["primary-color-deprecated-l-20"] = n(o, (c) => c.lighten(20)), t["primary-color-deprecated-t-20"] = n(o, (c) => c.tint(20)), t["primary-color-deprecated-t-50"] = n(o, (c) => c.tint(50)), t["primary-color-deprecated-f-12"] = n(o, (c) => c.setA(c.a * 0.12));
    const l = new Ne(s[0]);
    t["primary-color-active-deprecated-f-30"] = n(l, (c) => c.setA(c.a * 0.3)), t["primary-color-active-deprecated-d-02"] = n(l, (c) => c.darken(2));
  }
  return r.successColor && a(r.successColor, "success"), r.warningColor && a(r.warningColor, "warning"), r.errorColor && a(r.errorColor, "error"), r.infoColor && a(r.infoColor, "info"), `
  :root {
    ${Object.keys(t).map((o) => `--${e}-${o}: ${t[o]};`).join(`
`)}
  }
  `.trim();
}
function sh(e, r) {
  const t = oh(e, r);
  Lr() ? rt(t, `${ih}-dynamic-theme`) : process.env.NODE_ENV !== "production" && ja(!1, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
}
const en = /* @__PURE__ */ E.createContext(!1), lh = ({
  children: e,
  disabled: r
}) => {
  const t = E.useContext(en);
  return /* @__PURE__ */ E.createElement(en.Provider, {
    value: r ?? t
  }, e);
}, Et = /* @__PURE__ */ E.createContext(void 0), ch = ({
  children: e,
  size: r
}) => {
  const t = E.useContext(Et);
  return /* @__PURE__ */ E.createElement(Et.Provider, {
    value: r || t
  }, e);
};
function uh() {
  const e = Ue(en), r = Ue(Et);
  return {
    componentDisabled: e,
    componentSize: r
  };
}
var yc = /* @__PURE__ */ rr(function e() {
  er(this, e);
}), bc = "CALC_UNIT", dh = new RegExp(bc, "g");
function Xa(e) {
  return typeof e == "number" ? "".concat(e).concat(bc) : e;
}
var fh = /* @__PURE__ */ function(e) {
  it(t, e);
  var r = ot(t);
  function t(n, a) {
    var i;
    er(this, t), i = r.call(this), w(ie(i), "result", ""), w(ie(i), "unitlessCssVar", void 0), w(ie(i), "lowPriority", void 0);
    var o = Z(n);
    return i.unitlessCssVar = a, n instanceof t ? i.result = "(".concat(n.result, ")") : o === "number" ? i.result = Xa(n) : o === "string" && (i.result = n), i;
  }
  return rr(t, [{
    key: "add",
    value: function(a) {
      return a instanceof t ? this.result = "".concat(this.result, " + ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " + ").concat(Xa(a))), this.lowPriority = !0, this;
    }
  }, {
    key: "sub",
    value: function(a) {
      return a instanceof t ? this.result = "".concat(this.result, " - ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " - ").concat(Xa(a))), this.lowPriority = !0, this;
    }
  }, {
    key: "mul",
    value: function(a) {
      return this.lowPriority && (this.result = "(".concat(this.result, ")")), a instanceof t ? this.result = "".concat(this.result, " * ").concat(a.getResult(!0)) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " * ").concat(a)), this.lowPriority = !1, this;
    }
  }, {
    key: "div",
    value: function(a) {
      return this.lowPriority && (this.result = "(".concat(this.result, ")")), a instanceof t ? this.result = "".concat(this.result, " / ").concat(a.getResult(!0)) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " / ").concat(a)), this.lowPriority = !1, this;
    }
  }, {
    key: "getResult",
    value: function(a) {
      return this.lowPriority || a ? "(".concat(this.result, ")") : this.result;
    }
  }, {
    key: "equal",
    value: function(a) {
      var i = this, o = a || {}, s = o.unit, l = !0;
      return typeof s == "boolean" ? l = s : Array.from(this.unitlessCssVar).some(function(c) {
        return i.result.includes(c);
      }) && (l = !1), this.result = this.result.replace(dh, l ? "px" : ""), typeof this.lowPriority < "u" ? "calc(".concat(this.result, ")") : this.result;
    }
  }]), t;
}(yc), vh = /* @__PURE__ */ function(e) {
  it(t, e);
  var r = ot(t);
  function t(n) {
    var a;
    return er(this, t), a = r.call(this), w(ie(a), "result", 0), n instanceof t ? a.result = n.result : typeof n == "number" && (a.result = n), a;
  }
  return rr(t, [{
    key: "add",
    value: function(a) {
      return a instanceof t ? this.result += a.result : typeof a == "number" && (this.result += a), this;
    }
  }, {
    key: "sub",
    value: function(a) {
      return a instanceof t ? this.result -= a.result : typeof a == "number" && (this.result -= a), this;
    }
  }, {
    key: "mul",
    value: function(a) {
      return a instanceof t ? this.result *= a.result : typeof a == "number" && (this.result *= a), this;
    }
  }, {
    key: "div",
    value: function(a) {
      return a instanceof t ? this.result /= a.result : typeof a == "number" && (this.result /= a), this;
    }
  }, {
    key: "equal",
    value: function() {
      return this.result;
    }
  }]), t;
}(yc), ph = function(r, t) {
  var n = r === "css" ? fh : vh;
  return function(a) {
    return new n(a, t);
  };
}, ws = function(r, t) {
  return "".concat([t, r.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-"));
};
function rn(e) {
  var r = E.useRef();
  r.current = e;
  var t = E.useCallback(function() {
    for (var n, a = arguments.length, i = new Array(a), o = 0; o < a; o++)
      i[o] = arguments[o];
    return (n = r.current) === null || n === void 0 ? void 0 : n.call.apply(n, [r].concat(i));
  }, []);
  return t;
}
function tn(e) {
  var r = E.useRef(!1), t = E.useState(e), n = W(t, 2), a = n[0], i = n[1];
  E.useEffect(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
  function o(s, l) {
    l && r.current || i(s);
  }
  return [a, o];
}
function Qa(e) {
  return e !== void 0;
}
function $o(e, r) {
  var t = r || {}, n = t.defaultValue, a = t.value, i = t.onChange, o = t.postState, s = tn(function() {
    return Qa(a) ? a : Qa(n) ? typeof n == "function" ? n() : n : typeof e == "function" ? e() : e;
  }), l = W(s, 2), c = l[0], u = l[1], d = a !== void 0 ? a : c, f = o ? o(d) : d, p = rn(i), y = tn([d]), m = W(y, 2), v = m[0], b = m[1];
  us(function() {
    var C = v[0];
    c !== C && p(c, C);
  }, [v]), us(function() {
    Qa(a) || u(a);
  }, [a]);
  var h = rn(function(C, _) {
    u(C, _), b([d], _);
  });
  return [f, h];
}
function $s(e, r, t, n) {
  var a = j({}, r[e]);
  if (n != null && n.deprecatedTokens) {
    var i = n.deprecatedTokens;
    i.forEach(function(s) {
      var l = W(s, 2), c = l[0], u = l[1];
      if (process.env.NODE_ENV !== "production" && Ie(!(a != null && a[c]), "Component Token `".concat(String(c), "` of ").concat(String(e), " is deprecated. Please use `").concat(String(u), "` instead.")), a != null && a[c] || a != null && a[u]) {
        var d;
        (d = a[u]) !== null && d !== void 0 || (a[u] = a == null ? void 0 : a[c]);
      }
    });
  }
  var o = j(j({}, t), a);
  return Object.keys(o).forEach(function(s) {
    o[s] === r[s] && delete o[s];
  }), o;
}
var xc = process.env.NODE_ENV !== "production" || typeof CSSINJS_STATISTIC < "u", ki = !0;
function st() {
  for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
    r[t] = arguments[t];
  if (!xc)
    return Object.assign.apply(Object, [{}].concat(r));
  ki = !1;
  var n = {};
  return r.forEach(function(a) {
    if (Z(a) === "object") {
      var i = Object.keys(a);
      i.forEach(function(o) {
        Object.defineProperty(n, o, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return a[o];
          }
        });
      });
    }
  }), ki = !0, n;
}
var _s = {};
function mh() {
}
var hh = function(r) {
  var t, n = r, a = mh;
  return xc && typeof Proxy < "u" && (t = /* @__PURE__ */ new Set(), n = new Proxy(r, {
    get: function(o, s) {
      if (ki) {
        var l;
        (l = t) === null || l === void 0 || l.add(s);
      }
      return o[s];
    }
  }), a = function(o, s) {
    var l;
    _s[o] = {
      global: Array.from(t),
      component: j(j({}, (l = _s[o]) === null || l === void 0 ? void 0 : l.component), s)
    };
  }), {
    token: n,
    keys: t,
    flush: a
  };
};
function Rs(e, r, t) {
  if (typeof t == "function") {
    var n;
    return t(st(r, (n = r[e]) !== null && n !== void 0 ? n : {}));
  }
  return t ?? {};
}
function gh(e) {
  return e === "js" ? {
    max: Math.max,
    min: Math.min
  } : {
    max: function() {
      for (var t = arguments.length, n = new Array(t), a = 0; a < t; a++)
        n[a] = arguments[a];
      return "max(".concat(n.map(function(i) {
        return ze(i);
      }).join(","), ")");
    },
    min: function() {
      for (var t = arguments.length, n = new Array(t), a = 0; a < t; a++)
        n[a] = arguments[a];
      return "min(".concat(n.map(function(i) {
        return ze(i);
      }).join(","), ")");
    }
  };
}
var yh = 1e3 * 60 * 10, bh = /* @__PURE__ */ function() {
  function e() {
    er(this, e), w(this, "map", /* @__PURE__ */ new Map()), w(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), w(this, "nextID", 0), w(this, "lastAccessBeat", /* @__PURE__ */ new Map()), w(this, "accessBeat", 0);
  }
  return rr(e, [{
    key: "set",
    value: function(t, n) {
      this.clear();
      var a = this.getCompositeKey(t);
      this.map.set(a, n), this.lastAccessBeat.set(a, Date.now());
    }
  }, {
    key: "get",
    value: function(t) {
      var n = this.getCompositeKey(t), a = this.map.get(n);
      return this.lastAccessBeat.set(n, Date.now()), this.accessBeat += 1, a;
    }
  }, {
    key: "getCompositeKey",
    value: function(t) {
      var n = this, a = t.map(function(i) {
        return i && Z(i) === "object" ? "obj_".concat(n.getObjectID(i)) : "".concat(Z(i), "_").concat(i);
      });
      return a.join("|");
    }
  }, {
    key: "getObjectID",
    value: function(t) {
      if (this.objectIDMap.has(t))
        return this.objectIDMap.get(t);
      var n = this.nextID;
      return this.objectIDMap.set(t, n), this.nextID += 1, n;
    }
  }, {
    key: "clear",
    value: function() {
      var t = this;
      if (this.accessBeat > 1e4) {
        var n = Date.now();
        this.lastAccessBeat.forEach(function(a, i) {
          n - a > yh && (t.map.delete(i), t.lastAccessBeat.delete(i));
        }), this.accessBeat = 0;
      }
    }
  }]), e;
}(), Ps = new bh();
function xh(e, r) {
  return J.useMemo(function() {
    var t = Ps.get(r);
    if (t)
      return t;
    var n = e();
    return Ps.set(r, n), n;
  }, r);
}
var Sh = function() {
  return {};
};
function Ch(e) {
  var r = e.useCSP, t = r === void 0 ? Sh : r, n = e.useToken, a = e.usePrefix, i = e.getResetStyles, o = e.getCommonStyle, s = e.getCompUnitless;
  function l(f, p, y, m) {
    var v = Array.isArray(f) ? f[0] : f;
    function b(R) {
      return "".concat(String(v)).concat(R.slice(0, 1).toUpperCase()).concat(R.slice(1));
    }
    var h = (m == null ? void 0 : m.unitless) || {}, C = typeof s == "function" ? s(f) : {}, _ = j(j({}, C), {}, w({}, b("zIndexPopup"), !0));
    Object.keys(h).forEach(function(R) {
      _[b(R)] = h[R];
    });
    var S = j(j({}, m), {}, {
      unitless: _,
      prefixToken: b
    }), $ = u(f, p, y, S), x = c(v, y, S);
    return function(R) {
      var T = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : R, O = $(R, T), M = W(O, 2), I = M[1], F = x(T), A = W(F, 2), V = A[0], D = A[1];
      return [V, I, D];
    };
  }
  function c(f, p, y) {
    var m = y.unitless, v = y.injectStyle, b = v === void 0 ? !0 : v, h = y.prefixToken, C = y.ignore, _ = function(x) {
      var R = x.rootCls, T = x.cssVar, O = T === void 0 ? {} : T, M = n(), I = M.realToken;
      return Fm({
        path: [f],
        prefix: O.prefix,
        key: O.key,
        unitless: m,
        ignore: C,
        token: I,
        scope: R
      }, function() {
        var F = Rs(f, I, p), A = $s(f, I, F, {
          deprecatedTokens: y == null ? void 0 : y.deprecatedTokens
        });
        return Object.keys(F).forEach(function(V) {
          A[h(V)] = A[V], delete A[V];
        }), A;
      }), null;
    }, S = function(x) {
      var R = n(), T = R.cssVar;
      return [function(O) {
        return b && T ? /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement(_, {
          rootCls: x,
          cssVar: T,
          component: f
        }), O) : O;
      }, T == null ? void 0 : T.key];
    };
    return S;
  }
  function u(f, p, y) {
    var m = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, v = Array.isArray(f) ? f : [f, f], b = W(v, 1), h = b[0], C = v.join("-"), _ = e.layer || {
      name: "antd"
    };
    return function(S) {
      var $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : S, x = n(), R = x.theme, T = x.realToken, O = x.hashId, M = x.token, I = x.cssVar, F = a(), A = F.rootPrefixCls, V = F.iconPrefixCls, D = t(), z = I ? "css" : "js", H = xh(function() {
        var Y = /* @__PURE__ */ new Set();
        return I && Object.keys(m.unitless || {}).forEach(function(pe) {
          Y.add(zn(pe, I.prefix)), Y.add(zn(pe, ws(h, I.prefix)));
        }), ph(z, Y);
      }, [z, h, I == null ? void 0 : I.prefix]), ee = gh(z), Q = ee.max, re = ee.min, q = {
        theme: R,
        token: M,
        hashId: O,
        nonce: function() {
          return D.nonce;
        },
        clientOnly: m.clientOnly,
        layer: _,
        // antd is always at top of styles
        order: m.order || -999
      };
      typeof i == "function" && xi(j(j({}, q), {}, {
        clientOnly: !1,
        path: ["Shared", A]
      }), function() {
        return i(M, {
          prefix: {
            rootPrefixCls: A,
            iconPrefixCls: V
          },
          csp: D
        });
      });
      var U = xi(j(j({}, q), {}, {
        path: [C, S, V]
      }), function() {
        if (m.injectStyle === !1)
          return [];
        var Y = hh(M), pe = Y.token, se = Y.flush, he = Rs(h, T, y), de = ".".concat(S), me = $s(h, T, he, {
          deprecatedTokens: m.deprecatedTokens
        });
        I && he && Z(he) === "object" && Object.keys(he).forEach(function(Be) {
          he[Be] = "var(".concat(zn(Be, ws(h, I.prefix)), ")");
        });
        var fe = st(pe, {
          componentCls: de,
          prefixCls: S,
          iconCls: ".".concat(V),
          antCls: ".".concat(A),
          calc: H,
          // @ts-ignore
          max: Q,
          // @ts-ignore
          min: re
        }, I ? he : me), je = p(fe, {
          hashId: O,
          prefixCls: S,
          rootPrefixCls: A,
          iconPrefixCls: V
        });
        se(h, me);
        var Fe = typeof o == "function" ? o(fe, S, $, m.resetFont) : null;
        return [m.resetStyle === !1 ? null : Fe, je];
      });
      return [U, O];
    };
  }
  function d(f, p, y) {
    var m = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, v = u(f, p, y, j({
      resetStyle: !1,
      // Sub Style should default after root one
      order: -998
    }, m)), b = function(C) {
      var _ = C.prefixCls, S = C.rootCls, $ = S === void 0 ? _ : S;
      return v(_, $), null;
    };
    return process.env.NODE_ENV !== "production" && (b.displayName = "SubStyle_".concat(String(Array.isArray(f) ? f.join(".") : f))), b;
  }
  return {
    genStyleHooks: l,
    genSubStyleComponent: d,
    genComponentStyleHook: u
  };
}
const Eh = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"], wh = "5.25.4";
function Za(e) {
  return e >= 0 && e <= 255;
}
function Nn(e, r) {
  const {
    r: t,
    g: n,
    b: a,
    a: i
  } = new Ne(e).toRgb();
  if (i < 1)
    return e;
  const {
    r: o,
    g: s,
    b: l
  } = new Ne(r).toRgb();
  for (let c = 0.01; c <= 1; c += 0.01) {
    const u = Math.round((t - o * (1 - c)) / c), d = Math.round((n - s * (1 - c)) / c), f = Math.round((a - l * (1 - c)) / c);
    if (Za(u) && Za(d) && Za(f))
      return new Ne({
        r: u,
        g: d,
        b: f,
        a: Math.round(c * 100) / 100
      }).toRgbString();
  }
  return new Ne({
    r: t,
    g: n,
    b: a,
    a: 1
  }).toRgbString();
}
var $h = function(e, r) {
  var t = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && r.indexOf(n) < 0 && (t[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (t[n[a]] = e[n[a]]);
  return t;
};
function Sc(e) {
  const {
    override: r
  } = e, t = $h(e, ["override"]), n = Object.assign({}, r);
  Object.keys(Zt).forEach((f) => {
    delete n[f];
  });
  const a = Object.assign(Object.assign({}, t), n), i = 480, o = 576, s = 768, l = 992, c = 1200, u = 1600;
  if (a.motion === !1) {
    const f = "0s";
    a.motionDurationFast = f, a.motionDurationMid = f, a.motionDurationSlow = f;
  }
  return Object.assign(Object.assign(Object.assign({}, a), {
    // ============== Background ============== //
    colorFillContent: a.colorFillSecondary,
    colorFillContentHover: a.colorFill,
    colorFillAlter: a.colorFillQuaternary,
    colorBgContainerDisabled: a.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: a.colorBgContainer,
    colorSplit: Nn(a.colorBorderSecondary, a.colorBgContainer),
    // ============== Text ============== //
    colorTextPlaceholder: a.colorTextQuaternary,
    colorTextDisabled: a.colorTextQuaternary,
    colorTextHeading: a.colorText,
    colorTextLabel: a.colorTextSecondary,
    colorTextDescription: a.colorTextTertiary,
    colorTextLightSolid: a.colorWhite,
    colorHighlight: a.colorError,
    colorBgTextHover: a.colorFillSecondary,
    colorBgTextActive: a.colorFill,
    colorIcon: a.colorTextTertiary,
    colorIconHover: a.colorText,
    colorErrorOutline: Nn(a.colorErrorBg, a.colorBgContainer),
    colorWarningOutline: Nn(a.colorWarningBg, a.colorBgContainer),
    // Font
    fontSizeIcon: a.fontSizeSM,
    // Line
    lineWidthFocus: a.lineWidth * 3,
    // Control
    lineWidth: a.lineWidth,
    controlOutlineWidth: a.lineWidth * 2,
    // Checkbox size and expand icon size
    controlInteractiveSize: a.controlHeight / 2,
    controlItemBgHover: a.colorFillTertiary,
    controlItemBgActive: a.colorPrimaryBg,
    controlItemBgActiveHover: a.colorPrimaryBgHover,
    controlItemBgActiveDisabled: a.colorFill,
    controlTmpOutline: a.colorFillQuaternary,
    controlOutline: Nn(a.colorPrimaryBg, a.colorBgContainer),
    lineType: a.lineType,
    borderRadius: a.borderRadius,
    borderRadiusXS: a.borderRadiusXS,
    borderRadiusSM: a.borderRadiusSM,
    borderRadiusLG: a.borderRadiusLG,
    fontWeightStrong: 600,
    opacityLoading: 0.65,
    linkDecoration: "none",
    linkHoverDecoration: "none",
    linkFocusDecoration: "none",
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    paddingXXS: a.sizeXXS,
    paddingXS: a.sizeXS,
    paddingSM: a.sizeSM,
    padding: a.size,
    paddingMD: a.sizeMD,
    paddingLG: a.sizeLG,
    paddingXL: a.sizeXL,
    paddingContentHorizontalLG: a.sizeLG,
    paddingContentVerticalLG: a.sizeMS,
    paddingContentHorizontal: a.sizeMS,
    paddingContentVertical: a.sizeSM,
    paddingContentHorizontalSM: a.size,
    paddingContentVerticalSM: a.sizeXS,
    marginXXS: a.sizeXXS,
    marginXS: a.sizeXS,
    marginSM: a.sizeSM,
    margin: a.size,
    marginMD: a.sizeMD,
    marginLG: a.sizeLG,
    marginXL: a.sizeXL,
    marginXXL: a.sizeXXL,
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
    screenXS: i,
    screenXSMin: i,
    screenXSMax: o - 1,
    screenSM: o,
    screenSMMin: o,
    screenSMMax: s - 1,
    screenMD: s,
    screenMDMin: s,
    screenMDMax: l - 1,
    screenLG: l,
    screenLGMin: l,
    screenLGMax: c - 1,
    screenXL: c,
    screenXLMin: c,
    screenXLMax: u - 1,
    screenXXL: u,
    screenXXLMin: u,
    boxShadowPopoverArrow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
    boxShadowCard: `
      0 1px 2px -2px ${new Ne("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new Ne("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new Ne("rgba(0, 0, 0, 0.09)").toRgbString()}
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
var Ts = function(e, r) {
  var t = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && r.indexOf(n) < 0 && (t[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (t[n[a]] = e[n[a]]);
  return t;
};
const Cc = {
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
}, _h = {
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
}, Rh = {
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
}, Ec = (e, r, t) => {
  const n = t.getDerivativeToken(e), {
    override: a
  } = r, i = Ts(r, ["override"]);
  let o = Object.assign(Object.assign({}, n), {
    override: a
  });
  return o = Sc(o), i && Object.entries(i).forEach(([s, l]) => {
    const {
      theme: c
    } = l, u = Ts(l, ["theme"]);
    let d = u;
    c && (d = Ec(Object.assign(Object.assign({}, o), u), {
      override: u
    }, c)), o[s] = d;
  }), o;
};
function ka() {
  const {
    token: e,
    hashed: r,
    theme: t,
    override: n,
    cssVar: a
  } = J.useContext(hc), i = `${wh}-${r || ""}`, o = t || mc, [s, l, c] = nm(o, [Zt, e], {
    salt: i,
    override: n,
    getComputedToken: Ec,
    // formatToken will not be consumed after 1.15.0 with getComputedToken.
    // But token will break if @ant-design/cssinjs is under 1.15.0 without it
    formatToken: Sc,
    cssVar: a && {
      prefix: a.prefix,
      key: a.key,
      unitless: Cc,
      ignore: _h,
      preserve: Rh
    }
  });
  return [o, c, r ? l : "", s, a];
}
const wc = (e, r = !1) => ({
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  color: e.colorText,
  fontSize: e.fontSize,
  // font-variant: @font-variant-base;
  lineHeight: e.lineHeight,
  listStyle: "none",
  // font-feature-settings: @font-feature-settings-base;
  fontFamily: r ? "inherit" : e.fontFamily
}), Ph = () => ({
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
}), Th = () => ({
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
}), Oh = (e) => ({
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
}), jh = (e, r, t, n) => {
  const a = `[class^="${r}"], [class*=" ${r}"]`, i = t ? `.${t}` : a, o = {
    boxSizing: "border-box",
    "&::before, &::after": {
      boxSizing: "border-box"
    }
  };
  let s = {};
  return n !== !1 && (s = {
    fontFamily: e.fontFamily,
    fontSize: e.fontSize
  }), {
    [i]: Object.assign(Object.assign(Object.assign({}, s), o), {
      [a]: o
    })
  };
}, $c = (e) => ({
  [`.${e}`]: Object.assign(Object.assign({}, Ph()), {
    [`.${e} .${e}-icon`]: {
      display: "block"
    }
  })
}), {
  genStyleHooks: _o
} = Ch({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: r
    } = Ue(Kr);
    return {
      rootPrefixCls: e(),
      iconPrefixCls: r
    };
  },
  useToken: () => {
    const [e, r, t, n, a] = ka();
    return {
      theme: e,
      realToken: r,
      hashId: t,
      token: n,
      cssVar: a
    };
  },
  useCSP: () => {
    const {
      csp: e
    } = Ue(Kr);
    return e ?? {};
  },
  getResetStyles: (e, r) => {
    var t;
    const n = Oh(e);
    return [n, {
      "&": n
    }, $c((t = r == null ? void 0 : r.prefix.iconPrefixCls) !== null && t !== void 0 ? t : wo)];
  },
  getCommonStyle: jh,
  getCompUnitless: () => Cc
}), Fh = (e, r) => {
  const [t, n] = ka();
  return xi({
    token: n,
    hashId: "",
    path: ["ant-design-icons", e],
    nonce: () => r == null ? void 0 : r.nonce,
    layer: {
      name: "antd"
    }
  }, () => [$c(e)]);
}, Nh = Object.assign({}, E), {
  useId: Os
} = Nh, Ah = () => "", Mh = typeof Os > "u" ? Ah : Os;
function kh(e, r, t) {
  var n, a;
  const i = nt("ConfigProvider"), o = e || {}, s = o.inherit === !1 || !r ? Object.assign(Object.assign({}, Ai), {
    hashed: (n = r == null ? void 0 : r.hashed) !== null && n !== void 0 ? n : Ai.hashed,
    cssVar: r == null ? void 0 : r.cssVar
  }) : r, l = Mh();
  if (process.env.NODE_ENV !== "production") {
    const c = o.cssVar || s.cssVar, u = !!(typeof o.cssVar == "object" && (!((a = o.cssVar) === null || a === void 0) && a.key) || l);
    process.env.NODE_ENV !== "production" && i(!c || u, "breaking", "Missing key in `cssVar` config. Please upgrade to React 18 or set `cssVar.key` manually in each ConfigProvider inside `cssVar` enabled ConfigProvider.");
  }
  return vo(() => {
    var c, u;
    if (!e)
      return r;
    const d = Object.assign({}, s.components);
    Object.keys(e.components || {}).forEach((y) => {
      d[y] = Object.assign(Object.assign({}, d[y]), e.components[y]);
    });
    const f = `css-var-${l.replace(/:/g, "")}`, p = ((c = o.cssVar) !== null && c !== void 0 ? c : s.cssVar) && Object.assign(Object.assign(Object.assign({
      prefix: t == null ? void 0 : t.prefixCls
    }, typeof s.cssVar == "object" ? s.cssVar : {}), typeof o.cssVar == "object" ? o.cssVar : {}), {
      key: typeof o.cssVar == "object" && ((u = o.cssVar) === null || u === void 0 ? void 0 : u.key) || f
    });
    return Object.assign(Object.assign(Object.assign({}, s), o), {
      token: Object.assign(Object.assign({}, s.token), o.token),
      components: d,
      cssVar: p
    });
  }, [o, s], (c, u) => c.some((d, f) => {
    const p = u[f];
    return !vi(d, p, !0);
  }));
}
function js(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}
function Vh(e) {
  return e && Z(e) === "object" && js(e.nativeElement) ? e.nativeElement : js(e) ? e : null;
}
function Yn(e) {
  var r = Vh(e);
  if (r)
    return r;
  if (e instanceof J.Component) {
    var t;
    return (t = Wo.findDOMNode) === null || t === void 0 ? void 0 : t.call(Wo, e);
  }
  return null;
}
var Ih = ["children"], _c = /* @__PURE__ */ E.createContext({});
function Dh(e) {
  var r = e.children, t = $r(e, Ih);
  return /* @__PURE__ */ E.createElement(_c.Provider, {
    value: t
  }, r);
}
var Lh = /* @__PURE__ */ function(e) {
  it(t, e);
  var r = ot(t);
  function t() {
    return er(this, t), r.apply(this, arguments);
  }
  return rr(t, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), t;
}(E.Component);
function zh(e) {
  var r = E.useReducer(function(s) {
    return s + 1;
  }, 0), t = W(r, 2), n = t[1], a = E.useRef(e), i = rn(function() {
    return a.current;
  }), o = rn(function(s) {
    a.current = typeof s == "function" ? s(a.current) : s, n();
  });
  return [i, o];
}
var Ur = "none", An = "appear", Mn = "enter", kn = "leave", Fs = "none", Or = "prepare", ht = "start", gt = "active", Ro = "end", Rc = "prepared";
function Ns(e, r) {
  var t = {};
  return t[e.toLowerCase()] = r.toLowerCase(), t["Webkit".concat(e)] = "webkit".concat(r), t["Moz".concat(e)] = "moz".concat(r), t["ms".concat(e)] = "MS".concat(r), t["O".concat(e)] = "o".concat(r.toLowerCase()), t;
}
function Bh(e, r) {
  var t = {
    animationend: Ns("Animation", "AnimationEnd"),
    transitionend: Ns("Transition", "TransitionEnd")
  };
  return e && ("AnimationEvent" in r || delete t.animationend.animation, "TransitionEvent" in r || delete t.transitionend.transition), t;
}
var Hh = Bh(Lr(), typeof window < "u" ? window : {}), Pc = {};
if (Lr()) {
  var Wh = document.createElement("div");
  Pc = Wh.style;
}
var Vn = {};
function Tc(e) {
  if (Vn[e])
    return Vn[e];
  var r = Hh[e];
  if (r)
    for (var t = Object.keys(r), n = t.length, a = 0; a < n; a += 1) {
      var i = t[a];
      if (Object.prototype.hasOwnProperty.call(r, i) && i in Pc)
        return Vn[e] = r[i], Vn[e];
    }
  return "";
}
var Oc = Tc("animationend"), jc = Tc("transitionend"), Fc = !!(Oc && jc), As = Oc || "animationend", Ms = jc || "transitionend";
function ks(e, r) {
  if (!e) return null;
  if (Z(e) === "object") {
    var t = r.replace(/-\w/g, function(n) {
      return n[1].toUpperCase();
    });
    return e[t];
  }
  return "".concat(e, "-").concat(r);
}
const Uh = function(e) {
  var r = Ae();
  function t(a) {
    a && (a.removeEventListener(Ms, e), a.removeEventListener(As, e));
  }
  function n(a) {
    r.current && r.current !== a && t(r.current), a && a !== r.current && (a.addEventListener(Ms, e), a.addEventListener(As, e), r.current = a);
  }
  return E.useEffect(function() {
    return function() {
      t(r.current);
    };
  }, []), [n, t];
};
var Nc = Lr() ? Qd : Je, Ac = function(r) {
  return +setTimeout(r, 16);
}, Mc = function(r) {
  return clearTimeout(r);
};
typeof window < "u" && "requestAnimationFrame" in window && (Ac = function(r) {
  return window.requestAnimationFrame(r);
}, Mc = function(r) {
  return window.cancelAnimationFrame(r);
});
var Vs = 0, Va = /* @__PURE__ */ new Map();
function kc(e) {
  Va.delete(e);
}
var wt = function(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  Vs += 1;
  var n = Vs;
  function a(i) {
    if (i === 0)
      kc(n), r();
    else {
      var o = Ac(function() {
        a(i - 1);
      });
      Va.set(n, o);
    }
  }
  return a(t), n;
};
wt.cancel = function(e) {
  var r = Va.get(e);
  return kc(e), Mc(r);
};
process.env.NODE_ENV !== "production" && (wt.ids = function() {
  return Va;
});
const qh = function() {
  var e = E.useRef(null);
  function r() {
    wt.cancel(e.current);
  }
  function t(n) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    r();
    var i = wt(function() {
      a <= 1 ? n({
        isCanceled: function() {
          return i !== e.current;
        }
      }) : t(n, a - 1);
    });
    e.current = i;
  }
  return E.useEffect(function() {
    return function() {
      r();
    };
  }, []), [t, r];
};
var Yh = [Or, ht, gt, Ro], Kh = [Or, Rc], Vc = !1, Gh = !0;
function Ic(e) {
  return e === gt || e === Ro;
}
const Jh = function(e, r, t) {
  var n = tn(Fs), a = W(n, 2), i = a[0], o = a[1], s = qh(), l = W(s, 2), c = l[0], u = l[1];
  function d() {
    o(Or, !0);
  }
  var f = r ? Kh : Yh;
  return Nc(function() {
    if (i !== Fs && i !== Ro) {
      var p = f.indexOf(i), y = f[p + 1], m = t(i);
      m === Vc ? o(y, !0) : y && c(function(v) {
        function b() {
          v.isCanceled() || o(y, !0);
        }
        m === !0 ? b() : Promise.resolve(m).then(b);
      });
    }
  }, [e, i]), E.useEffect(function() {
    return function() {
      u();
    };
  }, []), [d, i];
};
function Xh(e, r, t, n) {
  var a = n.motionEnter, i = a === void 0 ? !0 : a, o = n.motionAppear, s = o === void 0 ? !0 : o, l = n.motionLeave, c = l === void 0 ? !0 : l, u = n.motionDeadline, d = n.motionLeaveImmediately, f = n.onAppearPrepare, p = n.onEnterPrepare, y = n.onLeavePrepare, m = n.onAppearStart, v = n.onEnterStart, b = n.onLeaveStart, h = n.onAppearActive, C = n.onEnterActive, _ = n.onLeaveActive, S = n.onAppearEnd, $ = n.onEnterEnd, x = n.onLeaveEnd, R = n.onVisibleChanged, T = tn(), O = W(T, 2), M = O[0], I = O[1], F = zh(Ur), A = W(F, 2), V = A[0], D = A[1], z = tn(null), H = W(z, 2), ee = H[0], Q = H[1], re = V(), q = Ae(!1), U = Ae(null);
  function Y() {
    return t();
  }
  var pe = Ae(!1);
  function se() {
    D(Ur), Q(null, !0);
  }
  var he = rn(function(Me) {
    var Te = V();
    if (Te !== Ur) {
      var ne = Y();
      if (!(Me && !Me.deadline && Me.target !== ne)) {
        var te = pe.current, we;
        Te === An && te ? we = S == null ? void 0 : S(ne, Me) : Te === Mn && te ? we = $ == null ? void 0 : $(ne, Me) : Te === kn && te && (we = x == null ? void 0 : x(ne, Me)), te && we !== !1 && se();
      }
    }
  }), de = Uh(he), me = W(de, 1), fe = me[0], je = function(Te) {
    switch (Te) {
      case An:
        return w(w(w({}, Or, f), ht, m), gt, h);
      case Mn:
        return w(w(w({}, Or, p), ht, v), gt, C);
      case kn:
        return w(w(w({}, Or, y), ht, b), gt, _);
      default:
        return {};
    }
  }, Fe = E.useMemo(function() {
    return je(re);
  }, [re]), Be = Jh(re, !e, function(Me) {
    if (Me === Or) {
      var Te = Fe[Or];
      return Te ? Te(Y()) : Vc;
    }
    if (K in Fe) {
      var ne;
      Q(((ne = Fe[K]) === null || ne === void 0 ? void 0 : ne.call(Fe, Y(), null)) || null);
    }
    return K === gt && re !== Ur && (fe(Y()), u > 0 && (clearTimeout(U.current), U.current = setTimeout(function() {
      he({
        deadline: !0
      });
    }, u))), K === Rc && se(), Gh;
  }), B = W(Be, 2), Pe = B[0], K = B[1], le = Ic(K);
  pe.current = le;
  var De = Ae(null);
  Nc(function() {
    if (!(q.current && De.current === r)) {
      I(r);
      var Me = q.current;
      q.current = !0;
      var Te;
      !Me && r && s && (Te = An), Me && r && i && (Te = Mn), (Me && !r && c || !Me && d && !r && c) && (Te = kn);
      var ne = je(Te);
      Te && (e || ne[Or]) ? (D(Te), Pe()) : D(Ur), De.current = r;
    }
  }, [r]), Je(function() {
    // Cancel appear
    (re === An && !s || // Cancel enter
    re === Mn && !i || // Cancel leave
    re === kn && !c) && D(Ur);
  }, [s, i, c]), Je(function() {
    return function() {
      q.current = !1, clearTimeout(U.current);
    };
  }, []);
  var ve = E.useRef(!1);
  Je(function() {
    M && (ve.current = !0), M !== void 0 && re === Ur && ((ve.current || M) && (R == null || R(M)), ve.current = !0);
  }, [M, re]);
  var qe = ee;
  return Fe[Or] && K === ht && (qe = j({
    transition: "none"
  }, qe)), [re, K, qe, M ?? r];
}
function Qh(e) {
  var r = e;
  Z(e) === "object" && (r = e.transitionSupport);
  function t(a, i) {
    return !!(a.motionName && r && i !== !1);
  }
  var n = /* @__PURE__ */ E.forwardRef(function(a, i) {
    var o = a.visible, s = o === void 0 ? !0 : o, l = a.removeOnLeave, c = l === void 0 ? !0 : l, u = a.forceRender, d = a.children, f = a.motionName, p = a.leavedClassName, y = a.eventProps, m = E.useContext(_c), v = m.motion, b = t(a, v), h = Ae(), C = Ae();
    function _() {
      try {
        return h.current instanceof HTMLElement ? h.current : Yn(C.current);
      } catch {
        return null;
      }
    }
    var S = Xh(b, s, _, a), $ = W(S, 4), x = $[0], R = $[1], T = $[2], O = $[3], M = E.useRef(O);
    O && (M.current = !0);
    var I = E.useCallback(function(H) {
      h.current = H, Pl(i, H);
    }, [i]), F, A = j(j({}, y), {}, {
      visible: s
    });
    if (!d)
      F = null;
    else if (x === Ur)
      O ? F = d(j({}, A), I) : !c && M.current && p ? F = d(j(j({}, A), {}, {
        className: p
      }), I) : u || !c && !p ? F = d(j(j({}, A), {}, {
        style: {
          display: "none"
        }
      }), I) : F = null;
    else {
      var V;
      R === Or ? V = "prepare" : Ic(R) ? V = "active" : R === ht && (V = "start");
      var D = ks(f, "".concat(x, "-").concat(V));
      F = d(j(j({}, A), {}, {
        className: Ee(ks(f, x), w(w({}, D, D && V), f, typeof f == "string")),
        style: T
      }), I);
    }
    if (/* @__PURE__ */ E.isValidElement(F) && Ol(F)) {
      var z = Fl(F);
      z || (F = /* @__PURE__ */ E.cloneElement(F, {
        ref: I
      }));
    }
    return /* @__PURE__ */ E.createElement(Lh, {
      ref: C
    }, F);
  });
  return n.displayName = "CSSMotion", n;
}
const Zh = Qh(Fc);
var Vi = "add", Ii = "keep", Di = "remove", ei = "removed";
function eg(e) {
  var r;
  return e && Z(e) === "object" && "key" in e ? r = e : r = {
    key: e
  }, j(j({}, r), {}, {
    key: String(r.key)
  });
}
function Li() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  return e.map(eg);
}
function rg() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], t = [], n = 0, a = r.length, i = Li(e), o = Li(r);
  i.forEach(function(c) {
    for (var u = !1, d = n; d < a; d += 1) {
      var f = o[d];
      if (f.key === c.key) {
        n < d && (t = t.concat(o.slice(n, d).map(function(p) {
          return j(j({}, p), {}, {
            status: Vi
          });
        })), n = d), t.push(j(j({}, f), {}, {
          status: Ii
        })), n += 1, u = !0;
        break;
      }
    }
    u || t.push(j(j({}, c), {}, {
      status: Di
    }));
  }), n < a && (t = t.concat(o.slice(n).map(function(c) {
    return j(j({}, c), {}, {
      status: Vi
    });
  })));
  var s = {};
  t.forEach(function(c) {
    var u = c.key;
    s[u] = (s[u] || 0) + 1;
  });
  var l = Object.keys(s).filter(function(c) {
    return s[c] > 1;
  });
  return l.forEach(function(c) {
    t = t.filter(function(u) {
      var d = u.key, f = u.status;
      return d !== c || f !== Di;
    }), t.forEach(function(u) {
      u.key === c && (u.status = Ii);
    });
  }), t;
}
var tg = ["component", "children", "onVisibleChanged", "onAllRemoved"], ng = ["status"], ag = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearPrepare", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function ig(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Zh, t = /* @__PURE__ */ function(n) {
    it(i, n);
    var a = ot(i);
    function i() {
      var o;
      er(this, i);
      for (var s = arguments.length, l = new Array(s), c = 0; c < s; c++)
        l[c] = arguments[c];
      return o = a.call.apply(a, [this].concat(l)), w(ie(o), "state", {
        keyEntities: []
      }), w(ie(o), "removeKey", function(u) {
        o.setState(function(d) {
          var f = d.keyEntities.map(function(p) {
            return p.key !== u ? p : j(j({}, p), {}, {
              status: ei
            });
          });
          return {
            keyEntities: f
          };
        }, function() {
          var d = o.state.keyEntities, f = d.filter(function(p) {
            var y = p.status;
            return y !== ei;
          }).length;
          f === 0 && o.props.onAllRemoved && o.props.onAllRemoved();
        });
      }), o;
    }
    return rr(i, [{
      key: "render",
      value: function() {
        var s = this, l = this.state.keyEntities, c = this.props, u = c.component, d = c.children, f = c.onVisibleChanged;
        c.onAllRemoved;
        var p = $r(c, tg), y = u || E.Fragment, m = {};
        return ag.forEach(function(v) {
          m[v] = p[v], delete p[v];
        }), delete p.keys, /* @__PURE__ */ E.createElement(y, p, l.map(function(v, b) {
          var h = v.status, C = $r(v, ng), _ = h === Vi || h === Ii;
          return /* @__PURE__ */ E.createElement(r, P({}, m, {
            key: C.key,
            visible: _,
            eventProps: C,
            onVisibleChanged: function($) {
              f == null || f($, {
                key: C.key
              }), $ || s.removeKey(C.key);
            }
          }), function(S, $) {
            return d(j(j({}, S), {}, {
              index: b
            }), $);
          });
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function(s, l) {
        var c = s.keys, u = l.keyEntities, d = Li(c), f = rg(u, d);
        return {
          keyEntities: f.filter(function(p) {
            var y = u.find(function(m) {
              var v = m.key;
              return p.key === v;
            });
            return !(y && y.status === ei && p.status === Di);
          })
        };
      }
    }]), i;
  }(E.Component);
  return w(t, "defaultProps", {
    component: "div"
  }), t;
}
ig(Fc);
function og(e) {
  const {
    children: r
  } = e, [, t] = ka(), {
    motion: n
  } = t, a = E.useRef(!1);
  return a.current = a.current || n === !1, a.current ? /* @__PURE__ */ E.createElement(Dh, {
    motion: n
  }, r) : r;
}
const Dc = /* @__PURE__ */ E.memo(({
  dropdownMatchSelectWidth: e
}) => (nt("ConfigProvider").deprecated(e === void 0, "dropdownMatchSelectWidth", "popupMatchSelectWidth"), null));
process.env.NODE_ENV !== "production" && (Dc.displayName = "PropWarning");
const sg = process.env.NODE_ENV !== "production" ? Dc : () => null;
var lg = function(e, r) {
  var t = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && r.indexOf(n) < 0 && (t[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (t[n[a]] = e[n[a]]);
  return t;
};
let zi = !1;
process.env.NODE_ENV;
const cg = ["getTargetContainer", "getPopupContainer", "renderEmpty", "input", "pagination", "form", "select", "button"];
let Lc;
function ug() {
  return Lc || Mi;
}
function dg(e) {
  return Object.keys(e).some((r) => r.endsWith("Color"));
}
const fg = (e) => {
  const {
    prefixCls: r,
    iconPrefixCls: t,
    theme: n,
    holderRender: a
  } = e;
  r !== void 0 && (Lc = r), n && dg(n) && (process.env.NODE_ENV !== "production" && ja(!1, "ConfigProvider", "`config` of css variable theme is not work in v5. Please use new `theme` config instead."), sh(ug(), n));
}, vg = (e) => {
  const {
    children: r,
    csp: t,
    autoInsertSpaceInButton: n,
    alert: a,
    anchor: i,
    form: o,
    locale: s,
    componentSize: l,
    direction: c,
    space: u,
    splitter: d,
    virtual: f,
    dropdownMatchSelectWidth: p,
    popupMatchSelectWidth: y,
    popupOverflow: m,
    legacyLocale: v,
    parentContext: b,
    iconPrefixCls: h,
    theme: C,
    componentDisabled: _,
    segmented: S,
    statistic: $,
    spin: x,
    calendar: R,
    carousel: T,
    cascader: O,
    collapse: M,
    typography: I,
    checkbox: F,
    descriptions: A,
    divider: V,
    drawer: D,
    skeleton: z,
    steps: H,
    image: ee,
    layout: Q,
    list: re,
    mentions: q,
    modal: U,
    progress: Y,
    result: pe,
    slider: se,
    breadcrumb: he,
    menu: de,
    pagination: me,
    input: fe,
    textArea: je,
    empty: Fe,
    badge: Be,
    radio: B,
    rate: Pe,
    switch: K,
    transfer: le,
    avatar: De,
    message: ve,
    tag: qe,
    table: Me,
    card: Te,
    tabs: ne,
    timeline: te,
    timePicker: we,
    upload: br,
    notification: ar,
    tree: ir,
    colorPicker: xr,
    datePicker: Ar,
    rangePicker: Ft,
    flex: Nt,
    wave: ke,
    dropdown: ge,
    warning: Sr,
    tour: zr,
    tooltip: za,
    popover: At,
    popconfirm: $n,
    floatButtonGroup: Br,
    variant: Mt,
    inputNumber: kt,
    treeSelect: _n
  } = e, Rn = E.useCallback((Le, g) => {
    const {
      prefixCls: k
    } = e;
    if (g)
      return g;
    const L = k || b.getPrefixCls("");
    return Le ? `${L}-${Le}` : L;
  }, [b.getPrefixCls, e.prefixCls]), Jr = h || b.iconPrefixCls || wo, ct = t || b.csp;
  Fh(Jr, ct);
  const Xr = kh(C, b.theme, {
    prefixCls: Rn("")
  });
  process.env.NODE_ENV !== "production" && (zi = zi || !!Xr);
  const ut = {
    csp: ct,
    autoInsertSpaceInButton: n,
    alert: a,
    anchor: i,
    locale: s || v,
    direction: c,
    space: u,
    splitter: d,
    virtual: f,
    popupMatchSelectWidth: y ?? p,
    popupOverflow: m,
    getPrefixCls: Rn,
    iconPrefixCls: Jr,
    theme: Xr,
    segmented: S,
    statistic: $,
    spin: x,
    calendar: R,
    carousel: T,
    cascader: O,
    collapse: M,
    typography: I,
    checkbox: F,
    descriptions: A,
    divider: V,
    drawer: D,
    skeleton: z,
    steps: H,
    image: ee,
    input: fe,
    textArea: je,
    layout: Q,
    list: re,
    mentions: q,
    modal: U,
    progress: Y,
    result: pe,
    slider: se,
    breadcrumb: he,
    menu: de,
    pagination: me,
    empty: Fe,
    badge: Be,
    radio: B,
    rate: Pe,
    switch: K,
    transfer: le,
    avatar: De,
    message: ve,
    tag: qe,
    table: Me,
    card: Te,
    tabs: ne,
    timeline: te,
    timePicker: we,
    upload: br,
    notification: ar,
    tree: ir,
    colorPicker: xr,
    datePicker: Ar,
    rangePicker: Ft,
    flex: Nt,
    wave: ke,
    dropdown: ge,
    warning: Sr,
    tour: zr,
    tooltip: za,
    popover: At,
    popconfirm: $n,
    floatButtonGroup: Br,
    variant: Mt,
    inputNumber: kt,
    treeSelect: _n
  };
  process.env.NODE_ENV !== "production" && nt("ConfigProvider")(!("autoInsertSpaceInButton" in e), "deprecated", "`autoInsertSpaceInButton` is deprecated. Please use `{ button: { autoInsertSpace: boolean }}` instead.");
  const Hr = Object.assign({}, b);
  Object.keys(ut).forEach((Le) => {
    ut[Le] !== void 0 && (Hr[Le] = ut[Le]);
  }), cg.forEach((Le) => {
    const g = e[Le];
    g && (Hr[Le] = g);
  }), typeof n < "u" && (Hr.button = Object.assign({
    autoInsertSpace: n
  }, Hr.button));
  const Wr = vo(() => Hr, Hr, (Le, g) => {
    const k = Object.keys(Le), L = Object.keys(g);
    return k.length !== L.length || k.some((G) => Le[G] !== g[G]);
  }), {
    layer: Vt
  } = E.useContext(Sn), Pn = E.useMemo(() => ({
    prefixCls: Jr,
    csp: ct,
    layer: Vt ? "antd" : void 0
  }), [Jr, ct, Vt]);
  let Ye = /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement(sg, {
    dropdownMatchSelectWidth: p
  }), r);
  const Tn = E.useMemo(() => {
    var Le, g, k, L;
    return mt(((Le = Ma.Form) === null || Le === void 0 ? void 0 : Le.defaultValidateMessages) || {}, ((k = (g = Wr.locale) === null || g === void 0 ? void 0 : g.Form) === null || k === void 0 ? void 0 : k.defaultValidateMessages) || {}, ((L = Wr.form) === null || L === void 0 ? void 0 : L.validateMessages) || {}, (o == null ? void 0 : o.validateMessages) || {});
  }, [Wr, o == null ? void 0 : o.validateMessages]);
  Object.keys(Tn).length > 0 && (Ye = /* @__PURE__ */ E.createElement(Vm.Provider, {
    value: Tn
  }, Ye)), s && (Ye = /* @__PURE__ */ E.createElement(dc, {
    locale: s,
    _ANT_MARK__: uc
  }, Ye)), Ye = /* @__PURE__ */ E.createElement(Eo.Provider, {
    value: Pn
  }, Ye), l && (Ye = /* @__PURE__ */ E.createElement(ch, {
    size: l
  }, Ye)), Ye = /* @__PURE__ */ E.createElement(og, null, Ye);
  const Ba = E.useMemo(() => {
    const Le = Xr || {}, {
      algorithm: g,
      token: k,
      components: L,
      cssVar: G
    } = Le, ye = lg(Le, ["algorithm", "token", "components", "cssVar"]), be = g && (!Array.isArray(g) || g.length > 0) ? mi(g) : mc, oe = {};
    Object.entries(L || {}).forEach(([Xe, Ve]) => {
      const xe = Object.assign({}, Ve);
      "algorithm" in xe && (xe.algorithm === !0 ? xe.theme = be : (Array.isArray(xe.algorithm) || typeof xe.algorithm == "function") && (xe.theme = mi(xe.algorithm)), delete xe.algorithm), oe[Xe] = xe;
    });
    const ae = Object.assign(Object.assign({}, Zt), k);
    return Object.assign(Object.assign({}, ye), {
      theme: be,
      token: ae,
      components: oe,
      override: Object.assign({
        override: ae
      }, oe),
      cssVar: G
    });
  }, [Xr]);
  return C && (Ye = /* @__PURE__ */ E.createElement(hc.Provider, {
    value: Ba
  }, Ye)), Wr.warning && (Ye = /* @__PURE__ */ E.createElement(kl.Provider, {
    value: Wr.warning
  }, Ye)), _ !== void 0 && (Ye = /* @__PURE__ */ E.createElement(lh, {
    disabled: _
  }, Ye)), /* @__PURE__ */ E.createElement(Kr.Provider, {
    value: Wr
  }, Ye);
}, Tt = (e) => {
  const r = E.useContext(Kr), t = E.useContext(cc);
  return /* @__PURE__ */ E.createElement(vg, Object.assign({
    parentContext: r,
    legacyLocale: t
  }, e));
};
Tt.ConfigContext = Kr;
Tt.SizeContext = Et;
Tt.config = fg;
Tt.useConfig = uh;
Object.defineProperty(Tt, "SizeContext", {
  get: () => (process.env.NODE_ENV !== "production" && ja(!1, "ConfigProvider", "ConfigProvider.SizeContext is deprecated. Please use `ConfigProvider.useConfig().componentSize` instead."), Et)
});
process.env.NODE_ENV !== "production" && (Tt.displayName = "ConfigProvider");
function zc(e, r) {
  this.v = e, this.k = r;
}
function Qe(e, r, t, n) {
  var a = Object.defineProperty;
  try {
    a({}, "", {});
  } catch {
    a = 0;
  }
  Qe = function(o, s, l, c) {
    function u(d, f) {
      Qe(o, d, function(p) {
        return this._invoke(d, f, p);
      });
    }
    s ? a ? a(o, s, {
      value: l,
      enumerable: !c,
      configurable: !c,
      writable: !c
    }) : o[s] = l : (u("next", 0), u("throw", 1), u("return", 2));
  }, Qe(e, r, t, n);
}
function Po() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e, r, t = typeof Symbol == "function" ? Symbol : {}, n = t.iterator || "@@iterator", a = t.toStringTag || "@@toStringTag";
  function i(p, y, m, v) {
    var b = y && y.prototype instanceof s ? y : s, h = Object.create(b.prototype);
    return Qe(h, "_invoke", function(C, _, S) {
      var $, x, R, T = 0, O = S || [], M = !1, I = {
        p: 0,
        n: 0,
        v: e,
        a: F,
        f: F.bind(e, 4),
        d: function(V, D) {
          return $ = V, x = 0, R = e, I.n = D, o;
        }
      };
      function F(A, V) {
        for (x = A, R = V, r = 0; !M && T && !D && r < O.length; r++) {
          var D, z = O[r], H = I.p, ee = z[2];
          A > 3 ? (D = ee === V) && (R = z[(x = z[4]) ? 5 : (x = 3, 3)], z[4] = z[5] = e) : z[0] <= H && ((D = A < 2 && H < z[1]) ? (x = 0, I.v = V, I.n = z[1]) : H < ee && (D = A < 3 || z[0] > V || V > ee) && (z[4] = A, z[5] = V, I.n = ee, x = 0));
        }
        if (D || A > 1) return o;
        throw M = !0, V;
      }
      return function(A, V, D) {
        if (T > 1) throw TypeError("Generator is already running");
        for (M && V === 1 && F(V, D), x = V, R = D; (r = x < 2 ? e : R) || !M; ) {
          $ || (x ? x < 3 ? (x > 1 && (I.n = -1), F(x, R)) : I.n = R : I.v = R);
          try {
            if (T = 2, $) {
              if (x || (A = "next"), r = $[A]) {
                if (!(r = r.call($, R))) throw TypeError("iterator result is not an object");
                if (!r.done) return r;
                R = r.value, x < 2 && (x = 0);
              } else x === 1 && (r = $.return) && r.call($), x < 2 && (R = TypeError("The iterator does not provide a '" + A + "' method"), x = 1);
              $ = e;
            } else if ((r = (M = I.n < 0) ? R : C.call(_, I)) !== o) break;
          } catch (z) {
            $ = e, x = 1, R = z;
          } finally {
            T = 1;
          }
        }
        return {
          value: r,
          done: M
        };
      };
    }(p, m, v), !0), h;
  }
  var o = {};
  function s() {
  }
  function l() {
  }
  function c() {
  }
  r = Object.getPrototypeOf;
  var u = [][n] ? r(r([][n]())) : (Qe(r = {}, n, function() {
    return this;
  }), r), d = c.prototype = s.prototype = Object.create(u);
  function f(p) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(p, c) : (p.__proto__ = c, Qe(p, a, "GeneratorFunction")), p.prototype = Object.create(d), p;
  }
  return l.prototype = c, Qe(d, "constructor", c), Qe(c, "constructor", l), l.displayName = "GeneratorFunction", Qe(c, a, "GeneratorFunction"), Qe(d), Qe(d, a, "Generator"), Qe(d, n, function() {
    return this;
  }), Qe(d, "toString", function() {
    return "[object Generator]";
  }), (Po = function() {
    return {
      w: i,
      m: f
    };
  })();
}
function Xn(e, r) {
  function t(a, i, o, s) {
    try {
      var l = e[a](i), c = l.value;
      return c instanceof zc ? r.resolve(c.v).then(function(u) {
        t("next", u, o, s);
      }, function(u) {
        t("throw", u, o, s);
      }) : r.resolve(c).then(function(u) {
        l.value = u, o(l);
      }, function(u) {
        return t("throw", u, o, s);
      });
    } catch (u) {
      s(u);
    }
  }
  var n;
  this.next || (Qe(Xn.prototype), Qe(Xn.prototype, typeof Symbol == "function" && Symbol.asyncIterator || "@asyncIterator", function() {
    return this;
  })), Qe(this, "_invoke", function(a, i, o) {
    function s() {
      return new r(function(l, c) {
        t(a, o, l, c);
      });
    }
    return n = n ? n.then(s, s) : s();
  }, !0);
}
function Bc(e, r, t, n, a) {
  return new Xn(Po().w(e, r, t, n), a || Promise);
}
function pg(e, r, t, n, a) {
  var i = Bc(e, r, t, n, a);
  return i.next().then(function(o) {
    return o.done ? o.value : i.next();
  });
}
function mg(e) {
  var r = Object(e), t = [];
  for (var n in r) t.unshift(n);
  return function a() {
    for (; t.length; ) if ((n = t.pop()) in r) return a.value = n, a.done = !1, a;
    return a.done = !0, a;
  };
}
function Is(e) {
  if (e != null) {
    var r = e[typeof Symbol == "function" && Symbol.iterator || "@@iterator"], t = 0;
    if (r) return r.call(e);
    if (typeof e.next == "function") return e;
    if (!isNaN(e.length)) return {
      next: function() {
        return e && t >= e.length && (e = void 0), {
          value: e && e[t++],
          done: !e
        };
      }
    };
  }
  throw new TypeError(Z(e) + " is not iterable");
}
function Rr() {
  var e = Po(), r = e.m(Rr), t = (Object.getPrototypeOf ? Object.getPrototypeOf(r) : r.__proto__).constructor;
  function n(o) {
    var s = typeof o == "function" && o.constructor;
    return !!s && (s === t || (s.displayName || s.name) === "GeneratorFunction");
  }
  var a = {
    throw: 1,
    return: 2,
    break: 3,
    continue: 3
  };
  function i(o) {
    var s, l;
    return function(c) {
      s || (s = {
        stop: function() {
          return l(c.a, 2);
        },
        catch: function() {
          return c.v;
        },
        abrupt: function(d, f) {
          return l(c.a, a[d], f);
        },
        delegateYield: function(d, f, p) {
          return s.resultName = f, l(c.d, Is(d), p);
        },
        finish: function(d) {
          return l(c.f, d);
        }
      }, l = function(d, f, p) {
        c.p = s.prev, c.n = s.next;
        try {
          return d(f, p);
        } finally {
          s.next = c.n;
        }
      }), s.resultName && (s[s.resultName] = c.v, s.resultName = void 0), s.sent = c.v, s.next = c.n;
      try {
        return o.call(this, s);
      } finally {
        c.p = s.prev, c.n = s.next;
      }
    };
  }
  return (Rr = function() {
    return {
      wrap: function(l, c, u, d) {
        return e.w(i(l), c, u, d && d.reverse());
      },
      isGeneratorFunction: n,
      mark: e.m,
      awrap: function(l, c) {
        return new zc(l, c);
      },
      AsyncIterator: Xn,
      async: function(l, c, u, d, f) {
        return (n(c) ? Bc : pg)(i(l), c, u, d, f);
      },
      keys: mg,
      values: Is
    };
  })();
}
function Ds(e, r, t, n, a, i, o) {
  try {
    var s = e[i](o), l = s.value;
  } catch (c) {
    return void t(c);
  }
  s.done ? r(l) : Promise.resolve(l).then(n, a);
}
function Cn(e) {
  return function() {
    var r = this, t = arguments;
    return new Promise(function(n, a) {
      var i = e.apply(r, t);
      function o(l) {
        Ds(i, n, a, o, s, "next", l);
      }
      function s(l) {
        Ds(i, n, a, o, s, "throw", l);
      }
      o(void 0);
    });
  };
}
const Hc = (e) => {
  const r = J.useContext(Et);
  return J.useMemo(() => e ? typeof e == "string" ? e ?? r : typeof e == "function" ? e(r) : r : r, [e, r]);
};
function Qn(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = [];
  return J.Children.forEach(e, function(n) {
    n == null && !r.keepEmpty || (Array.isArray(n) ? t = t.concat(Qn(n)) : Rl(n) && n.props ? t = t.concat(Qn(n.props.children, r)) : t.push(n));
  }), t;
}
const Wc = /* @__PURE__ */ E.createContext(null), Uc = (e, r) => {
  const t = E.useContext(Wc), n = E.useMemo(() => {
    if (!t)
      return "";
    const {
      compactDirection: a,
      isFirstItem: i,
      isLastItem: o
    } = t, s = a === "vertical" ? "-vertical-" : "-";
    return Ee(`${e}-compact${s}item`, {
      [`${e}-compact${s}first-item`]: i,
      [`${e}-compact${s}last-item`]: o,
      [`${e}-compact${s}item-rtl`]: r === "rtl"
    });
  }, [e, r, t]);
  return {
    compactSize: t == null ? void 0 : t.compactSize,
    compactDirection: t == null ? void 0 : t.compactDirection,
    compactItemClassnames: n
  };
}, hg = (e) => {
  const {
    children: r
  } = e;
  return /* @__PURE__ */ E.createElement(Wc.Provider, {
    value: null
  }, r);
}, Ls = /^[\u4E00-\u9FA5]{2}$/;
Ls.test.bind(Ls);
function q0(e) {
  return typeof e == "string";
}
["default", "primary", "danger"].concat(X(Eh));
var In = 2, zs = 0.16, gg = 0.05, yg = 0.05, bg = 0.15, qc = 5, Yc = 4, xg = [{
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
function Bs(e, r, t) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = t ? Math.round(e.h) - In * r : Math.round(e.h) + In * r : n = t ? Math.round(e.h) + In * r : Math.round(e.h) - In * r, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function Hs(e, r, t) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return t ? n = e.s - zs * r : r === Yc ? n = e.s + zs : n = e.s + gg * r, n > 1 && (n = 1), t && r === qc && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Math.round(n * 100) / 100;
}
function Ws(e, r, t) {
  var n;
  return t ? n = e.v + yg * r : n = e.v - bg * r, n = Math.max(0, Math.min(1, n)), Math.round(n * 100) / 100;
}
function Sg(e) {
  for (var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = [], n = new Ne(e), a = n.toHsv(), i = qc; i > 0; i -= 1) {
    var o = new Ne({
      h: Bs(a, i, !0),
      s: Hs(a, i, !0),
      v: Ws(a, i, !0)
    });
    t.push(o);
  }
  t.push(n);
  for (var s = 1; s <= Yc; s += 1) {
    var l = new Ne({
      h: Bs(a, s),
      s: Hs(a, s),
      v: Ws(a, s)
    });
    t.push(l);
  }
  return r.theme === "dark" ? xg.map(function(c) {
    var u = c.index, d = c.amount;
    return new Ne(r.backgroundColor || "#141414").mix(t[u], d).toHexString();
  }) : t.map(function(c) {
    return c.toHexString();
  });
}
var Bi = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
Bi.primary = Bi[5];
function Kc(e) {
  var r;
  return e == null || (r = e.getRootNode) === null || r === void 0 ? void 0 : r.call(e);
}
function Cg(e) {
  return Kc(e) instanceof ShadowRoot;
}
function Eg(e) {
  return Cg(e) ? Kc(e) : null;
}
function wg(e) {
  return e.replace(/-(.)/g, function(r, t) {
    return t.toUpperCase();
  });
}
function $g(e, r) {
  Ie(e, "[@ant-design/icons] ".concat(r));
}
function Us(e) {
  return Z(e) === "object" && typeof e.name == "string" && typeof e.theme == "string" && (Z(e.icon) === "object" || typeof e.icon == "function");
}
function qs() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(e).reduce(function(r, t) {
    var n = e[t];
    switch (t) {
      case "class":
        r.className = n, delete r.class;
        break;
      default:
        delete r[t], r[wg(t)] = n;
    }
    return r;
  }, {});
}
function Hi(e, r, t) {
  return t ? /* @__PURE__ */ J.createElement(e.tag, j(j({
    key: r
  }, qs(e.attrs)), t), (e.children || []).map(function(n, a) {
    return Hi(n, "".concat(r, "-").concat(e.tag, "-").concat(a));
  })) : /* @__PURE__ */ J.createElement(e.tag, j({
    key: r
  }, qs(e.attrs)), (e.children || []).map(function(n, a) {
    return Hi(n, "".concat(r, "-").concat(e.tag, "-").concat(a));
  }));
}
function Gc(e) {
  return Sg(e)[0];
}
function Jc(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
var _g = `
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
`, Rg = function(r) {
  var t = Ue(Eo), n = t.csp, a = t.prefixCls, i = t.layer, o = _g;
  a && (o = o.replace(/anticon/g, a)), i && (o = "@layer ".concat(i, ` {
`).concat(o, `
}`)), Je(function() {
    var s = r.current, l = Eg(s);
    rt(o, "@ant-design-icons", {
      prepend: !i,
      csp: n,
      attachTo: l
    });
  }, []);
}, Pg = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"], Ut = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function Tg(e) {
  var r = e.primaryColor, t = e.secondaryColor;
  Ut.primaryColor = r, Ut.secondaryColor = t || Gc(r), Ut.calculated = !!t;
}
function Og() {
  return j({}, Ut);
}
var Ot = function(r) {
  var t = r.icon, n = r.className, a = r.onClick, i = r.style, o = r.primaryColor, s = r.secondaryColor, l = $r(r, Pg), c = E.useRef(), u = Ut;
  if (o && (u = {
    primaryColor: o,
    secondaryColor: s || Gc(o)
  }), Rg(c), $g(Us(t), "icon should be icon definiton, but got ".concat(t)), !Us(t))
    return null;
  var d = t;
  return d && typeof d.icon == "function" && (d = j(j({}, d), {}, {
    icon: d.icon(u.primaryColor, u.secondaryColor)
  })), Hi(d.icon, "svg-".concat(d.name), j(j({
    className: n,
    onClick: a,
    style: i,
    "data-icon": d.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }, l), {}, {
    ref: c
  }));
};
Ot.displayName = "IconReact";
Ot.getTwoToneColors = Og;
Ot.setTwoToneColors = Tg;
function Xc(e) {
  var r = Jc(e), t = W(r, 2), n = t[0], a = t[1];
  return Ot.setTwoToneColors({
    primaryColor: n,
    secondaryColor: a
  });
}
function jg() {
  var e = Ot.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var Fg = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
Xc(Bi.primary);
var Ia = /* @__PURE__ */ E.forwardRef(function(e, r) {
  var t = e.className, n = e.icon, a = e.spin, i = e.rotate, o = e.tabIndex, s = e.onClick, l = e.twoToneColor, c = $r(e, Fg), u = E.useContext(Eo), d = u.prefixCls, f = d === void 0 ? "anticon" : d, p = u.rootClassName, y = Ee(p, f, w(w({}, "".concat(f, "-").concat(n.name), !!n.name), "".concat(f, "-spin"), !!a || n.name === "loading"), t), m = o;
  m === void 0 && s && (m = -1);
  var v = i ? {
    msTransform: "rotate(".concat(i, "deg)"),
    transform: "rotate(".concat(i, "deg)")
  } : void 0, b = Jc(l), h = W(b, 2), C = h[0], _ = h[1];
  return /* @__PURE__ */ E.createElement("span", P({
    role: "img",
    "aria-label": n.name
  }, c, {
    ref: r,
    tabIndex: m,
    onClick: s,
    className: y
  }), /* @__PURE__ */ E.createElement(Ot, {
    icon: n,
    primaryColor: C,
    secondaryColor: _,
    style: v
  }));
});
Ia.displayName = "AntdIcon";
Ia.getTwoToneColor = jg;
Ia.setTwoToneColor = Xc;
function Ng(e, r, t) {
  const {
    focusElCls: n,
    focus: a,
    borderElCls: i
  } = t, o = i ? "> *" : "", s = ["hover", a ? "focus" : null, "active"].filter(Boolean).map((l) => `&:${l} ${o}`).join(",");
  return {
    [`&-item:not(${r}-last-item)`]: {
      marginInlineEnd: e.calc(e.lineWidth).mul(-1).equal()
    },
    "&-item": Object.assign(Object.assign({
      [s]: {
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
function Ag(e, r, t) {
  const {
    borderElCls: n
  } = t, a = n ? `> ${n}` : "";
  return {
    [`&-item:not(${r}-first-item):not(${r}-last-item) ${a}`]: {
      borderRadius: 0
    },
    [`&-item:not(${r}-last-item)${r}-first-item`]: {
      [`& ${a}, &${e}-sm ${a}, &${e}-lg ${a}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`&-item:not(${r}-first-item)${r}-last-item`]: {
      [`& ${a}, &${e}-sm ${a}, &${e}-lg ${a}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    }
  };
}
function Mg(e, r = {
  focus: !0
}) {
  const {
    componentCls: t
  } = e, n = `${t}-compact`;
  return {
    [n]: Object.assign(Object.assign({}, Ng(e, n, r)), Ag(t, n, r))
  };
}
var Qc = {}, Zc = /* @__PURE__ */ Ze(Qc), kg = (e, r) => P({}, e, r), Vg = () => Ue(Zc), To = /* @__PURE__ */ Ze(() => {
});
To.displayName = "JVR.DispatchShowTools";
function Ig() {
  return Rt(kg, Qc);
}
function eu() {
  return Ue(To);
}
var ru = (e) => {
  var {
    initial: r,
    dispatch: t,
    children: n
  } = e;
  return /* @__PURE__ */ N.jsx(Zc.Provider, {
    value: r,
    children: /* @__PURE__ */ N.jsx(To.Provider, {
      value: t,
      children: n
    })
  });
};
ru.displayName = "JVR.ShowTools";
var tu = {}, nu = /* @__PURE__ */ Ze(tu), Dg = (e, r) => P({}, e, r), Da = () => Ue(nu), Oo = /* @__PURE__ */ Ze(() => {
});
Oo.displayName = "JVR.DispatchExpands";
function Lg() {
  return Rt(Dg, tu);
}
function zg() {
  return Ue(Oo);
}
var au = (e) => {
  var {
    initial: r,
    dispatch: t,
    children: n
  } = e;
  return /* @__PURE__ */ N.jsx(nu.Provider, {
    value: r,
    children: /* @__PURE__ */ N.jsx(Oo.Provider, {
      value: t,
      children: n
    })
  });
};
au.displayName = "JVR.Expands";
var iu = {
  Str: {
    as: "span",
    "data-type": "string",
    style: {
      color: "var(--w-rjv-type-string-color, #cb4b16)"
    },
    className: "w-rjv-type",
    children: "string"
  },
  Url: {
    as: "a",
    style: {
      color: "var(--w-rjv-type-url-color, #0969da)"
    },
    "data-type": "url",
    className: "w-rjv-type",
    children: "url"
  },
  Undefined: {
    style: {
      color: "var(--w-rjv-type-undefined-color, #586e75)"
    },
    as: "span",
    "data-type": "undefined",
    className: "w-rjv-type",
    children: "undefined"
  },
  Null: {
    style: {
      color: "var(--w-rjv-type-null-color, #d33682)"
    },
    as: "span",
    "data-type": "null",
    className: "w-rjv-type",
    children: "null"
  },
  Map: {
    style: {
      color: "var(--w-rjv-type-map-color, #268bd2)",
      marginRight: 3
    },
    as: "span",
    "data-type": "map",
    className: "w-rjv-type",
    children: "Map"
  },
  Nan: {
    style: {
      color: "var(--w-rjv-type-nan-color, #859900)"
    },
    as: "span",
    "data-type": "nan",
    className: "w-rjv-type",
    children: "NaN"
  },
  Bigint: {
    style: {
      color: "var(--w-rjv-type-bigint-color, #268bd2)"
    },
    as: "span",
    "data-type": "bigint",
    className: "w-rjv-type",
    children: "bigint"
  },
  Int: {
    style: {
      color: "var(--w-rjv-type-int-color, #268bd2)"
    },
    as: "span",
    "data-type": "int",
    className: "w-rjv-type",
    children: "int"
  },
  Set: {
    style: {
      color: "var(--w-rjv-type-set-color, #268bd2)",
      marginRight: 3
    },
    as: "span",
    "data-type": "set",
    className: "w-rjv-type",
    children: "Set"
  },
  Float: {
    style: {
      color: "var(--w-rjv-type-float-color, #859900)"
    },
    as: "span",
    "data-type": "float",
    className: "w-rjv-type",
    children: "float"
  },
  True: {
    style: {
      color: "var(--w-rjv-type-boolean-color, #2aa198)"
    },
    as: "span",
    "data-type": "bool",
    className: "w-rjv-type",
    children: "bool"
  },
  False: {
    style: {
      color: "var(--w-rjv-type-boolean-color, #2aa198)"
    },
    as: "span",
    "data-type": "bool",
    className: "w-rjv-type",
    children: "bool"
  },
  Date: {
    style: {
      color: "var(--w-rjv-type-date-color, #268bd2)"
    },
    as: "span",
    "data-type": "date",
    className: "w-rjv-type",
    children: "date"
  }
}, ou = /* @__PURE__ */ Ze(iu), Bg = (e, r) => P({}, e, r), Oe = () => Ue(ou), jo = /* @__PURE__ */ Ze(() => {
});
jo.displayName = "JVR.DispatchTypes";
function Hg() {
  return Rt(Bg, iu);
}
function Wg() {
  return Ue(jo);
}
function su(e) {
  var {
    initial: r,
    dispatch: t,
    children: n
  } = e;
  return /* @__PURE__ */ N.jsx(ou.Provider, {
    value: r,
    children: /* @__PURE__ */ N.jsx(jo.Provider, {
      value: t,
      children: n
    })
  });
}
su.displayName = "JVR.Types";
var Ug = ["style"];
function lu(e) {
  var {
    style: r
  } = e, t = ue(e, Ug), n = P({
    cursor: "pointer",
    height: "1em",
    width: "1em",
    userSelect: "none",
    display: "inline-flex"
  }, r);
  return /* @__PURE__ */ N.jsx("svg", P({
    viewBox: "0 0 24 24",
    fill: "var(--w-rjv-arrow-color, currentColor)",
    style: n
  }, t, {
    children: /* @__PURE__ */ N.jsx("path", {
      d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
    })
  }));
}
lu.displayName = "JVR.TriangleArrow";
var cu = {
  Arrow: {
    as: "span",
    className: "w-rjv-arrow",
    style: {
      transform: "rotate(0deg)",
      transition: "all 0.3s"
    },
    children: /* @__PURE__ */ N.jsx(lu, {})
  },
  Colon: {
    as: "span",
    style: {
      color: "var(--w-rjv-colon-color, var(--w-rjv-color))",
      marginLeft: 0,
      marginRight: 2
    },
    className: "w-rjv-colon",
    children: ":"
  },
  Quote: {
    as: "span",
    style: {
      color: "var(--w-rjv-quotes-color, #236a7c)"
    },
    className: "w-rjv-quotes",
    children: '"'
  },
  ValueQuote: {
    as: "span",
    style: {
      color: "var(--w-rjv-quotes-string-color, #cb4b16)"
    },
    className: "w-rjv-quotes",
    children: '"'
  },
  BracketsLeft: {
    as: "span",
    style: {
      color: "var(--w-rjv-brackets-color, #236a7c)"
    },
    className: "w-rjv-brackets-start",
    children: "["
  },
  BracketsRight: {
    as: "span",
    style: {
      color: "var(--w-rjv-brackets-color, #236a7c)"
    },
    className: "w-rjv-brackets-end",
    children: "]"
  },
  BraceLeft: {
    as: "span",
    style: {
      color: "var(--w-rjv-curlybraces-color, #236a7c)"
    },
    className: "w-rjv-curlybraces-start",
    children: "{"
  },
  BraceRight: {
    as: "span",
    style: {
      color: "var(--w-rjv-curlybraces-color, #236a7c)"
    },
    className: "w-rjv-curlybraces-end",
    children: "}"
  }
}, uu = /* @__PURE__ */ Ze(cu), qg = (e, r) => P({}, e, r), nr = () => Ue(uu), Fo = /* @__PURE__ */ Ze(() => {
});
Fo.displayName = "JVR.DispatchSymbols";
function Yg() {
  return Rt(qg, cu);
}
function Kg() {
  return Ue(Fo);
}
var du = (e) => {
  var {
    initial: r,
    dispatch: t,
    children: n
  } = e;
  return /* @__PURE__ */ N.jsx(uu.Provider, {
    value: r,
    children: /* @__PURE__ */ N.jsx(Fo.Provider, {
      value: t,
      children: n
    })
  });
};
du.displayName = "JVR.Symbols";
var fu = {
  Copied: {
    className: "w-rjv-copied",
    style: {
      height: "1em",
      width: "1em",
      cursor: "pointer",
      verticalAlign: "middle",
      marginLeft: 5
    }
  },
  CountInfo: {
    as: "span",
    className: "w-rjv-object-size",
    style: {
      color: "var(--w-rjv-info-color, #0000004d)",
      paddingLeft: 8,
      fontStyle: "italic"
    }
  },
  CountInfoExtra: {
    as: "span",
    className: "w-rjv-object-extra",
    style: {
      paddingLeft: 8
    }
  },
  Ellipsis: {
    as: "span",
    style: {
      cursor: "pointer",
      color: "var(--w-rjv-ellipsis-color, #cb4b16)",
      userSelect: "none"
    },
    className: "w-rjv-ellipsis",
    children: "..."
  },
  Row: {
    as: "div",
    className: "w-rjv-line"
  },
  KeyName: {
    as: "span",
    className: "w-rjv-object-key"
  }
}, vu = /* @__PURE__ */ Ze(fu), Gg = (e, r) => P({}, e, r), Pr = () => Ue(vu), No = /* @__PURE__ */ Ze(() => {
});
No.displayName = "JVR.DispatchSection";
function Jg() {
  return Rt(Gg, fu);
}
function Xg() {
  return Ue(No);
}
var pu = (e) => {
  var {
    initial: r,
    dispatch: t,
    children: n
  } = e;
  return /* @__PURE__ */ N.jsx(vu.Provider, {
    value: r,
    children: /* @__PURE__ */ N.jsx(No.Provider, {
      value: t,
      children: n
    })
  });
};
pu.displayName = "JVR.Section";
var mu = {
  objectSortKeys: !1,
  indentWidth: 15
}, Ao = /* @__PURE__ */ Ze(mu);
Ao.displayName = "JVR.Context";
var hu = /* @__PURE__ */ Ze(() => {
});
hu.displayName = "JVR.DispatchContext";
function Qg(e, r) {
  return P({}, e, r);
}
var lt = () => Ue(Ao), gu = (e) => {
  var {
    children: r,
    initialState: t,
    initialTypes: n
  } = e, [a, i] = Rt(Qg, Object.assign({}, mu, t)), [o, s] = Ig(), [l, c] = Lg(), [u, d] = Hg(), [f, p] = Yg(), [y, m] = Jg();
  return Je(() => i(P({}, t)), [t]), /* @__PURE__ */ N.jsx(Ao.Provider, {
    value: a,
    children: /* @__PURE__ */ N.jsx(hu.Provider, {
      value: i,
      children: /* @__PURE__ */ N.jsx(ru, {
        initial: o,
        dispatch: s,
        children: /* @__PURE__ */ N.jsx(au, {
          initial: l,
          dispatch: c,
          children: /* @__PURE__ */ N.jsx(su, {
            initial: P({}, u, n),
            dispatch: d,
            children: /* @__PURE__ */ N.jsx(du, {
              initial: f,
              dispatch: p,
              children: /* @__PURE__ */ N.jsx(pu, {
                initial: y,
                dispatch: m,
                children: r
              })
            })
          })
        })
      })
    })
  });
};
gu.displayName = "JVR.Provider";
function Zg(e) {
  if (e == null) throw new TypeError("Cannot destructure " + e);
}
var ey = ["isNumber", "value", "parentValue", "keyName", "keys"], ry = ["as", "render"], ty = ["as", "render"], ny = ["as", "render"], ay = ["as", "style", "render"], iy = ["as", "render"], oy = ["as", "render"], sy = ["as", "render"], ly = ["as", "render"], Wi = (e) => {
  var {
    Quote: r = {}
  } = nr(), {
    isNumber: t,
    value: n,
    parentValue: a,
    keyName: i,
    keys: o
  } = e, s = ue(e, ey);
  if (t) return null;
  var {
    as: l,
    render: c
  } = r, u = ue(r, ry), d = l || "span", f = P({}, s, u);
  if (typeof f.children == "string") {
    var p = f.children.trim();
    f.children = p || void 0;
  }
  var y = {
    value: n,
    parentValue: a,
    keyName: i,
    keys: o || (i ? [i] : [])
  }, m = c && typeof c == "function" && c(f, y);
  return m || /* @__PURE__ */ N.jsx(d, P({}, f));
};
Wi.displayName = "JVR.Quote";
var nn = (e) => {
  var {
    ValueQuote: r = {}
  } = nr(), t = P({}, (Zg(e), e)), {
    as: n,
    render: a
  } = r, i = ue(r, ty), o = n || "span", s = P({}, t, i), l = a && typeof a == "function" && a(s, {});
  return l || /* @__PURE__ */ N.jsx(o, P({}, s));
};
nn.displayName = "JVR.ValueQuote";
var yu = (e) => {
  var {
    value: r,
    parentValue: t,
    keyName: n,
    keys: a
  } = e, {
    Colon: i = {}
  } = nr(), {
    as: o,
    render: s
  } = i, l = ue(i, ny), c = o || "span", u = s && typeof s == "function" && s(l, {
    value: r,
    parentValue: t,
    keyName: n,
    keys: a || (n ? [n] : [])
  });
  return u || /* @__PURE__ */ N.jsx(c, P({}, l));
};
yu.displayName = "JVR.Colon";
var bu = (e) => {
  var {
    Arrow: r = {}
  } = nr(), t = Da(), {
    expandKey: n,
    style: a,
    value: i,
    parentValue: o,
    keyName: s,
    keys: l
  } = e, c = !!t[n], {
    as: u,
    style: d,
    render: f
  } = r, p = ue(r, ay), y = u || "span", m = f && typeof f == "function", v = P({}, p, {
    "data-expanded": c,
    style: P({}, d, a)
  }), b = {
    value: i,
    parentValue: o,
    keyName: s,
    keys: l || (s ? [s] : [])
  }, h = m && f(v, b);
  return h || /* @__PURE__ */ N.jsx(y, P({}, p, {
    style: P({}, d, a)
  }));
};
bu.displayName = "JVR.Arrow";
var xu = (e) => {
  var {
    isBrackets: r,
    value: t,
    parentValue: n,
    keyName: a,
    keys: i
  } = e, {
    BracketsLeft: o = {},
    BraceLeft: s = {}
  } = nr(), l = {
    value: t,
    parentValue: n,
    keyName: a,
    keys: i || (a ? [a] : [])
  };
  if (r) {
    var {
      as: c,
      render: u
    } = o, d = ue(o, iy), f = c || "span", p = u && typeof u == "function" && u(d, l);
    return p || /* @__PURE__ */ N.jsx(f, P({}, d));
  }
  var {
    as: y,
    render: m
  } = s, v = ue(s, oy), b = y || "span", h = m && typeof m == "function" && m(v, l);
  return h || /* @__PURE__ */ N.jsx(b, P({}, v));
};
xu.displayName = "JVR.BracketsOpen";
var Mo = (e) => {
  var {
    isBrackets: r,
    isVisiable: t,
    value: n,
    parentValue: a,
    keyName: i,
    keys: o
  } = e, s = {
    value: n,
    parentValue: a,
    keyName: i,
    keys: o || (i ? [i] : [])
  };
  if (!t) return null;
  var {
    BracketsRight: l = {},
    BraceRight: c = {}
  } = nr();
  if (r) {
    var {
      as: u,
      render: d
    } = l, f = ue(l, sy), p = u || "span", y = d && typeof d == "function" && d(f, s);
    return y || /* @__PURE__ */ N.jsx(p, P({}, f));
  }
  var {
    as: m,
    render: v
  } = c, b = ue(c, ly), h = m || "span", C = v && typeof v == "function" && v(b, s);
  return C || /* @__PURE__ */ N.jsx(h, P({}, b));
};
Mo.displayName = "JVR.BracketsClose";
var Su = (e) => {
  var r, {
    keyName: t,
    value: n,
    expandKey: a,
    parentValue: i,
    level: o,
    keys: s = []
  } = e, l = Da(), {
    collapsed: c,
    shouldExpandNodeInitially: u
  } = lt(), d = typeof c == "boolean" ? c : typeof c == "number" ? o > c : !1, f = (r = l[a]) != null ? r : u ? !1 : d, p = u && u(!f, {
    value: n,
    keys: s,
    level: o,
    keyName: t,
    parentValue: i
  });
  if (u && c === !1) {
    if (l[a] === void 0 && !p)
      return null;
  } else if (l[a] === void 0 && p)
    return null;
  var y = Object.keys(n).length;
  if (f || y === 0)
    return null;
  var m = {
    paddingLeft: 4
  }, v = {
    keyName: t,
    value: n,
    keys: s,
    parentValue: i
  }, b = Array.isArray(n), h = n instanceof Set;
  return /* @__PURE__ */ N.jsx("div", {
    style: m,
    children: /* @__PURE__ */ N.jsx(Mo, P({
      isBrackets: b || h
    }, v, {
      isVisiable: !0
    }))
  });
};
Su.displayName = "JVR.NestedClose";
var cy = ["as", "render"], uy = ["as", "render"], dy = ["as", "render"], fy = ["as", "render"], vy = ["as", "render"], py = ["as", "render"], my = ["as", "render"], hy = ["as", "render"], gy = ["as", "render"], yy = ["as", "render"], by = ["as", "render"], xy = ["as", "render"], Sy = ["as", "render"], Ui = (e) => {
  if (e === void 0)
    return "0n";
  if (typeof e == "string")
    try {
      e = BigInt(e);
    } catch {
      return "0n";
    }
  return e ? e.toString() + "n" : "0n";
}, Cu = (e) => {
  var {
    value: r,
    keyName: t
  } = e, {
    Set: n = {},
    displayDataTypes: a
  } = Oe(), i = r instanceof Set;
  if (!i || !a) return null;
  var {
    as: o,
    render: s
  } = n, l = ue(n, cy), c = s && typeof s == "function", u = c && s(l, {
    type: "type",
    value: r,
    keyName: t
  });
  if (u) return u;
  var d = o || "span";
  return /* @__PURE__ */ N.jsx(d, P({}, l));
};
Cu.displayName = "JVR.SetComp";
var Eu = (e) => {
  var {
    value: r,
    keyName: t
  } = e, {
    Map: n = {},
    displayDataTypes: a
  } = Oe(), i = r instanceof Map;
  if (!i || !a) return null;
  var {
    as: o,
    render: s
  } = n, l = ue(n, uy), c = s && typeof s == "function", u = c && s(l, {
    type: "type",
    value: r,
    keyName: t
  });
  if (u) return u;
  var d = o || "span";
  return /* @__PURE__ */ N.jsx(d, P({}, l));
};
Eu.displayName = "JVR.MapComp";
var Nr = {
  opacity: 0.75,
  paddingRight: 4
}, wu = (e) => {
  var {
    children: r = "",
    keyName: t,
    keys: n
  } = e, {
    Str: a = {},
    displayDataTypes: i
  } = Oe(), {
    shortenTextAfterLength: o = 30,
    stringEllipsis: s = "..."
  } = lt(), {
    as: l,
    render: c
  } = a, u = ue(a, dy), d = r, [f, p] = Yt(o && d.length > o);
  Je(() => p(o && d.length > o), [o]);
  var y = l || "span", m = P({}, Nr, a.style || {});
  o > 0 && (u.style = P({}, u.style, {
    cursor: d.length <= o ? "initial" : "pointer"
  }), d.length > o && (u.onClick = () => {
    p(!f);
  }));
  var v = f ? "" + d.slice(0, o) + s : d, b = c && typeof c == "function", h = b && c(P({}, u, {
    style: m
  }), {
    type: "type",
    value: r,
    keyName: t,
    keys: n
  }), C = f ? "w-rjv-value w-rjv-value-short" : "w-rjv-value", _ = b && c(P({}, u, {
    children: v,
    className: C
  }), {
    type: "value",
    value: r,
    keyName: t,
    keys: n
  });
  return /* @__PURE__ */ N.jsxs(gr, {
    children: [i && (h || /* @__PURE__ */ N.jsx(y, P({}, u, {
      style: m
    }))), _ || /* @__PURE__ */ N.jsxs(gr, {
      children: [/* @__PURE__ */ N.jsx(nn, {}), /* @__PURE__ */ N.jsx(y, P({}, u, {
        className: C,
        children: v
      })), /* @__PURE__ */ N.jsx(nn, {})]
    })]
  });
};
wu.displayName = "JVR.TypeString";
var $u = (e) => {
  var {
    children: r,
    keyName: t,
    keys: n
  } = e, {
    True: a = {},
    displayDataTypes: i
  } = Oe(), {
    as: o,
    render: s
  } = a, l = ue(a, fy), c = o || "span", u = P({}, Nr, a.style || {}), d = s && typeof s == "function", f = d && s(P({}, l, {
    style: u
  }), {
    type: "type",
    value: r,
    keyName: t,
    keys: n
  }), p = d && s(P({}, l, {
    children: r,
    className: "w-rjv-value"
  }), {
    type: "value",
    value: r,
    keyName: t,
    keys: n
  });
  return /* @__PURE__ */ N.jsxs(gr, {
    children: [i && (f || /* @__PURE__ */ N.jsx(c, P({}, l, {
      style: u
    }))), p || /* @__PURE__ */ N.jsx(c, P({}, l, {
      className: "w-rjv-value",
      children: r == null ? void 0 : r.toString()
    }))]
  });
};
$u.displayName = "JVR.TypeTrue";
var _u = (e) => {
  var {
    children: r,
    keyName: t,
    keys: n
  } = e, {
    False: a = {},
    displayDataTypes: i
  } = Oe(), {
    as: o,
    render: s
  } = a, l = ue(a, vy), c = o || "span", u = P({}, Nr, a.style || {}), d = s && typeof s == "function", f = d && s(P({}, l, {
    style: u
  }), {
    type: "type",
    value: r,
    keyName: t,
    keys: n
  }), p = d && s(P({}, l, {
    children: r,
    className: "w-rjv-value"
  }), {
    type: "value",
    value: r,
    keyName: t,
    keys: n
  });
  return /* @__PURE__ */ N.jsxs(gr, {
    children: [i && (f || /* @__PURE__ */ N.jsx(c, P({}, l, {
      style: u
    }))), p || /* @__PURE__ */ N.jsx(c, P({}, l, {
      className: "w-rjv-value",
      children: r == null ? void 0 : r.toString()
    }))]
  });
};
_u.displayName = "JVR.TypeFalse";
var Ru = (e) => {
  var {
    children: r,
    keyName: t,
    keys: n
  } = e, {
    Float: a = {},
    displayDataTypes: i
  } = Oe(), {
    as: o,
    render: s
  } = a, l = ue(a, py), c = o || "span", u = P({}, Nr, a.style || {}), d = s && typeof s == "function", f = d && s(P({}, l, {
    style: u
  }), {
    type: "type",
    value: r,
    keyName: t,
    keys: n
  }), p = d && s(P({}, l, {
    children: r,
    className: "w-rjv-value"
  }), {
    type: "value",
    value: r,
    keyName: t,
    keys: n
  });
  return /* @__PURE__ */ N.jsxs(gr, {
    children: [i && (f || /* @__PURE__ */ N.jsx(c, P({}, l, {
      style: u
    }))), p || /* @__PURE__ */ N.jsx(c, P({}, l, {
      className: "w-rjv-value",
      children: r == null ? void 0 : r.toString()
    }))]
  });
};
Ru.displayName = "JVR.TypeFloat";
var Pu = (e) => {
  var {
    children: r,
    keyName: t,
    keys: n
  } = e, {
    Int: a = {},
    displayDataTypes: i
  } = Oe(), {
    as: o,
    render: s
  } = a, l = ue(a, my), c = o || "span", u = P({}, Nr, a.style || {}), d = s && typeof s == "function", f = d && s(P({}, l, {
    style: u
  }), {
    type: "type",
    value: r,
    keyName: t,
    keys: n
  }), p = d && s(P({}, l, {
    children: r,
    className: "w-rjv-value"
  }), {
    type: "value",
    value: r,
    keyName: t,
    keys: n
  });
  return /* @__PURE__ */ N.jsxs(gr, {
    children: [i && (f || /* @__PURE__ */ N.jsx(c, P({}, l, {
      style: u
    }))), p || /* @__PURE__ */ N.jsx(c, P({}, l, {
      className: "w-rjv-value",
      children: r == null ? void 0 : r.toString()
    }))]
  });
};
Pu.displayName = "JVR.TypeInt";
var Tu = (e) => {
  var {
    children: r,
    keyName: t,
    keys: n
  } = e, {
    Bigint: a = {},
    displayDataTypes: i
  } = Oe(), {
    as: o,
    render: s
  } = a, l = ue(a, hy), c = o || "span", u = P({}, Nr, a.style || {}), d = s && typeof s == "function", f = d && s(P({}, l, {
    style: u
  }), {
    type: "type",
    value: r,
    keyName: t,
    keys: n
  }), p = d && s(P({}, l, {
    children: r,
    className: "w-rjv-value"
  }), {
    type: "value",
    value: r,
    keyName: t,
    keys: n
  });
  return /* @__PURE__ */ N.jsxs(gr, {
    children: [i && (f || /* @__PURE__ */ N.jsx(c, P({}, l, {
      style: u
    }))), p || /* @__PURE__ */ N.jsx(c, P({}, l, {
      className: "w-rjv-value",
      children: Ui(r == null ? void 0 : r.toString())
    }))]
  });
};
Tu.displayName = "JVR.TypeFloat";
var Ou = (e) => {
  var {
    children: r,
    keyName: t,
    keys: n
  } = e, {
    Url: a = {},
    displayDataTypes: i
  } = Oe(), {
    as: o,
    render: s
  } = a, l = ue(a, gy), c = o || "span", u = P({}, Nr, a.style), d = s && typeof s == "function", f = d && s(P({}, l, {
    style: u
  }), {
    type: "type",
    value: r,
    keyName: t,
    keys: n
  }), p = d && s(P({}, l, {
    children: r == null ? void 0 : r.href,
    className: "w-rjv-value"
  }), {
    type: "value",
    value: r,
    keyName: t,
    keys: n
  });
  return /* @__PURE__ */ N.jsxs(gr, {
    children: [i && (f || /* @__PURE__ */ N.jsx(c, P({}, l, {
      style: u
    }))), p || /* @__PURE__ */ N.jsxs("a", P({
      href: r == null ? void 0 : r.href,
      target: "_blank"
    }, l, {
      className: "w-rjv-value",
      children: [/* @__PURE__ */ N.jsx(nn, {}), r == null ? void 0 : r.href, /* @__PURE__ */ N.jsx(nn, {})]
    }))]
  });
};
Ou.displayName = "JVR.TypeUrl";
var ju = (e) => {
  var {
    children: r,
    keyName: t,
    keys: n
  } = e, {
    Date: a = {},
    displayDataTypes: i
  } = Oe(), {
    as: o,
    render: s
  } = a, l = ue(a, yy), c = o || "span", u = P({}, Nr, a.style || {}), d = s && typeof s == "function", f = d && s(P({}, l, {
    style: u
  }), {
    type: "type",
    value: r,
    keyName: t,
    keys: n
  }), p = r instanceof Date ? r.toLocaleString() : r, y = d && s(P({}, l, {
    children: p,
    className: "w-rjv-value"
  }), {
    type: "value",
    value: r,
    keyName: t,
    keys: n
  });
  return /* @__PURE__ */ N.jsxs(gr, {
    children: [i && (f || /* @__PURE__ */ N.jsx(c, P({}, l, {
      style: u
    }))), y || /* @__PURE__ */ N.jsx(c, P({}, l, {
      className: "w-rjv-value",
      children: p
    }))]
  });
};
ju.displayName = "JVR.TypeDate";
var Fu = (e) => {
  var {
    children: r,
    keyName: t,
    keys: n
  } = e, {
    Undefined: a = {},
    displayDataTypes: i
  } = Oe(), {
    as: o,
    render: s
  } = a, l = ue(a, by), c = o || "span", u = P({}, Nr, a.style || {}), d = s && typeof s == "function", f = d && s(P({}, l, {
    style: u
  }), {
    type: "type",
    value: r,
    keyName: t,
    keys: n
  }), p = d && s(P({}, l, {
    children: r,
    className: "w-rjv-value"
  }), {
    type: "value",
    value: r,
    keyName: t,
    keys: n
  });
  return /* @__PURE__ */ N.jsxs(gr, {
    children: [i && (f || /* @__PURE__ */ N.jsx(c, P({}, l, {
      style: u
    }))), p || /* @__PURE__ */ N.jsx(c, P({}, l, {
      className: "w-rjv-value",
      children: "undefined"
    }))]
  });
};
Fu.displayName = "JVR.TypeUndefined";
var Nu = (e) => {
  var {
    children: r,
    keyName: t,
    keys: n
  } = e, {
    Null: a = {},
    displayDataTypes: i
  } = Oe(), {
    as: o,
    render: s
  } = a, l = ue(a, xy), c = o || "span", u = P({}, Nr, a.style || {}), d = s && typeof s == "function", f = d && s(P({}, l, {
    style: u
  }), {
    type: "type",
    value: r,
    keyName: t,
    keys: n
  }), p = d && s(P({}, l, {
    children: r,
    className: "w-rjv-value"
  }), {
    type: "value",
    value: r,
    keyName: t,
    keys: n
  });
  return /* @__PURE__ */ N.jsxs(gr, {
    children: [i && (f || /* @__PURE__ */ N.jsx(c, P({}, l, {
      style: u
    }))), p || /* @__PURE__ */ N.jsx(c, P({}, l, {
      className: "w-rjv-value",
      children: "null"
    }))]
  });
};
Nu.displayName = "JVR.TypeNull";
var Au = (e) => {
  var {
    children: r,
    keyName: t,
    keys: n
  } = e, {
    Nan: a = {},
    displayDataTypes: i
  } = Oe(), {
    as: o,
    render: s
  } = a, l = ue(a, Sy), c = o || "span", u = P({}, Nr, a.style || {}), d = s && typeof s == "function", f = d && s(P({}, l, {
    style: u
  }), {
    type: "type",
    value: r,
    keyName: t,
    keys: n
  }), p = d && s(P({}, l, {
    children: r == null ? void 0 : r.toString(),
    className: "w-rjv-value"
  }), {
    type: "value",
    value: r,
    keyName: t,
    keys: n
  });
  return /* @__PURE__ */ N.jsxs(gr, {
    children: [i && (f || /* @__PURE__ */ N.jsx(c, P({}, l, {
      style: u
    }))), p || /* @__PURE__ */ N.jsx(c, P({}, l, {
      className: "w-rjv-value",
      children: "NaN"
    }))]
  });
};
Au.displayName = "JVR.TypeNan";
var Cy = (e) => Number(e) === e && e % 1 !== 0 || isNaN(e), Mu = (e) => {
  var {
    value: r,
    keyName: t,
    keys: n
  } = e, a = {
    keyName: t,
    keys: n
  };
  return r instanceof URL ? /* @__PURE__ */ N.jsx(Ou, P({}, a, {
    children: r
  })) : typeof r == "string" ? /* @__PURE__ */ N.jsx(wu, P({}, a, {
    children: r
  })) : r === !0 ? /* @__PURE__ */ N.jsx($u, P({}, a, {
    children: r
  })) : r === !1 ? /* @__PURE__ */ N.jsx(_u, P({}, a, {
    children: r
  })) : r === null ? /* @__PURE__ */ N.jsx(Nu, P({}, a, {
    children: r
  })) : r === void 0 ? /* @__PURE__ */ N.jsx(Fu, P({}, a, {
    children: r
  })) : r instanceof Date ? /* @__PURE__ */ N.jsx(ju, P({}, a, {
    children: r
  })) : typeof r == "number" && isNaN(r) ? /* @__PURE__ */ N.jsx(Au, P({}, a, {
    children: r
  })) : typeof r == "number" && Cy(r) ? /* @__PURE__ */ N.jsx(Ru, P({}, a, {
    children: r
  })) : typeof r == "bigint" ? /* @__PURE__ */ N.jsx(Tu, P({}, a, {
    children: r
  })) : typeof r == "number" ? /* @__PURE__ */ N.jsx(Pu, P({}, a, {
    children: r
  })) : null;
};
Mu.displayName = "JVR.Value";
function Gr(e, r, t) {
  var n = Kg(), a = [e.className, r.className].filter(Boolean).join(" "), i = P({}, e, r, {
    className: a,
    style: P({}, e.style, r.style),
    children: r.children || e.children
  });
  Je(() => n({
    [t]: i
  }), [r]);
}
function yr(e, r, t) {
  var n = Wg(), a = [e.className, r.className].filter(Boolean).join(" "), i = P({}, e, r, {
    className: a,
    style: P({}, e.style, r.style),
    children: r.children || e.children
  });
  Je(() => n({
    [t]: i
  }), [r]);
}
function jt(e, r, t) {
  var n = Xg(), a = [e.className, r.className].filter(Boolean).join(" "), i = P({}, e, r, {
    className: a,
    style: P({}, e.style, r.style),
    children: r.children || e.children
  });
  Je(() => n({
    [t]: i
  }), [r]);
}
var Ey = ["as", "render"], ku = (e) => {
  var {
    KeyName: r = {}
  } = Pr();
  return jt(r, e, "KeyName"), null;
};
ku.displayName = "JVR.KeyName";
var Vu = (e) => {
  var {
    children: r,
    value: t,
    parentValue: n,
    keyName: a,
    keys: i
  } = e, o = typeof r == "number", s = {
    color: o ? "var(--w-rjv-key-number, #268bd2)" : "var(--w-rjv-key-string, #002b36)"
  }, {
    KeyName: l = {}
  } = Pr(), {
    as: c,
    render: u
  } = l, d = ue(l, Ey);
  d.style = P({}, d.style, s);
  var f = c || "span", p = u && typeof u == "function" && u(P({}, d, {
    children: r
  }), {
    value: t,
    parentValue: n,
    keyName: a,
    keys: i || (a ? [a] : [])
  });
  return p || /* @__PURE__ */ N.jsx(f, P({}, d, {
    children: r
  }));
};
Vu.displayName = "JVR.KeyNameComp";
var wy = ["children", "value", "parentValue", "keyName", "keys"], $y = ["as", "render", "children"], Iu = (e) => {
  var {
    Row: r = {}
  } = Pr();
  return jt(r, e, "Row"), null;
};
Iu.displayName = "JVR.Row";
var Du = (e) => {
  var {
    children: r,
    value: t,
    parentValue: n,
    keyName: a,
    keys: i
  } = e, o = ue(e, wy), {
    Row: s = {}
  } = Pr(), {
    as: l,
    render: c
  } = s, u = ue(s, $y), d = l || "div", f = c && typeof c == "function" && c(P({}, o, u, {
    children: r
  }), {
    value: t,
    keyName: a,
    parentValue: n,
    keys: i
  });
  return f || /* @__PURE__ */ N.jsx(d, P({}, o, u, {
    children: r
  }));
};
Du.displayName = "JVR.RowComp";
function _y(e) {
  var r = Ae();
  return Je(() => {
    r.current = e;
  }), r.current;
}
function Ry(e) {
  var {
    value: r,
    highlightUpdates: t,
    highlightContainer: n
  } = e, a = _y(r), i = ul(() => {
    if (!t || a === void 0) return !1;
    if (typeof r != typeof a)
      return !0;
    if (typeof r == "number")
      return isNaN(r) && isNaN(a) ? !1 : r !== a;
    if (Array.isArray(r) !== Array.isArray(a))
      return !0;
    if (typeof r == "object" || typeof r == "function")
      return !1;
    if (r !== a)
      return !0;
  }, [t, r]);
  Je(() => {
    n && n.current && i && "animate" in n.current && n.current.animate([{
      backgroundColor: "var(--w-rjv-update-color, #ebcb8b)"
    }, {
      backgroundColor: ""
    }], {
      duration: 1e3,
      easing: "ease-in"
    });
  }, [i, r, n]);
}
var Py = ["keyName", "value", "parentValue", "expandKey", "keys", "beforeCopy"], Ty = ["as", "render"], ko = (e) => {
  var {
    keyName: r,
    value: t,
    parentValue: n,
    expandKey: a,
    keys: i,
    beforeCopy: o
  } = e, s = ue(e, Py), {
    onCopied: l,
    enableClipboard: c,
    beforeCopy: u
  } = lt(), d = Vg(), f = d[a], [p, y] = Yt(!1), {
    Copied: m = {}
  } = Pr(), v = m == null ? void 0 : m.beforeCopy;
  if (c === !1 || !f) return null;
  var b = (R) => {
    R.stopPropagation();
    var T = "";
    typeof t == "number" && t === 1 / 0 ? T = "Infinity" : typeof t == "number" && isNaN(t) ? T = "NaN" : typeof t == "bigint" ? T = Ui(t) : t instanceof Date ? T = t.toLocaleString() : T = JSON.stringify(t, (I, F) => typeof F == "bigint" ? Ui(F) : F, 2);
    var O = o || v || u;
    O && typeof O == "function" && (T = O(T, r, t, n, a, i)), l && l(T, t), y(!0);
    var M = navigator.clipboard || {
      writeText(I) {
        return new Promise((F, A) => {
          var V = document.createElement("textarea");
          V.style.position = "absolute", V.style.opacity = "0", V.style.left = "-99999999px", V.value = I, document.body.appendChild(V), V.select(), document.execCommand("copy") ? F() : A(), V.remove();
        });
      }
    };
    M.writeText(T).then(() => {
      var I = setTimeout(() => {
        y(!1), clearTimeout(I);
      }, 3e3);
    }).catch((I) => {
    });
  }, h = {
    style: {
      display: "inline-flex"
    },
    fill: p ? "var(--w-rjv-copied-success-color, #28a745)" : "var(--w-rjv-copied-color, currentColor)",
    onClick: b
  }, {
    render: C
  } = m, _ = ue(m, Ty), S = P({}, _, s, h, {
    style: P({}, _.style, s.style, h.style)
  }), $ = C && typeof C == "function", x = $ && C(P({}, S, {
    "data-copied": p
  }), {
    value: t,
    keyName: r,
    keys: i,
    parentValue: n
  });
  return x || (p ? /* @__PURE__ */ N.jsx("svg", P({
    viewBox: "0 0 32 36"
  }, S, {
    children: /* @__PURE__ */ N.jsx("path", {
      d: "M27.5,33 L2.5,33 L2.5,12.5 L27.5,12.5 L27.5,15.2249049 C29.1403264,13.8627542 29.9736597,13.1778155 30,13.1700887 C30,11.9705278 30,10.0804982 30,7.5 C30,6.1 28.9,5 27.5,5 L20,5 C20,2.2 17.8,0 15,0 C12.2,0 10,2.2 10,5 L2.5,5 C1.1,5 0,6.1 0,7.5 L0,33 C0,34.4 1.1,36 2.5,36 L27.5,36 C28.9,36 30,34.4 30,33 L30,26.1114493 L27.5,28.4926435 L27.5,33 Z M7.5,7.5 L10,7.5 C10,7.5 12.5,6.4 12.5,5 C12.5,3.6 13.6,2.5 15,2.5 C16.4,2.5 17.5,3.6 17.5,5 C17.5,6.4 18.8,7.5 20,7.5 L22.5,7.5 C22.5,7.5 25,8.6 25,10 L5,10 C5,8.5 6.1,7.5 7.5,7.5 Z M5,27.5 L10,27.5 L10,25 L5,25 L5,27.5 Z M28.5589286,16 L32,19.6 L21.0160714,30.5382252 L13.5303571,24.2571429 L17.1303571,20.6571429 L21.0160714,24.5428571 L28.5589286,16 Z M17.5,15 L5,15 L5,17.5 L17.5,17.5 L17.5,15 Z M10,20 L5,20 L5,22.5 L10,22.5 L10,20 Z"
    })
  })) : /* @__PURE__ */ N.jsx("svg", P({
    viewBox: "0 0 32 36"
  }, S, {
    children: /* @__PURE__ */ N.jsx("path", {
      d: "M27.5,33 L2.5,33 L2.5,12.5 L27.5,12.5 L27.5,20 L30,20 L30,7.5 C30,6.1 28.9,5 27.5,5 L20,5 C20,2.2 17.8,0 15,0 C12.2,0 10,2.2 10,5 L2.5,5 C1.1,5 0,6.1 0,7.5 L0,33 C0,34.4 1.1,36 2.5,36 L27.5,36 C28.9,36 30,34.4 30,33 L30,29 L27.5,29 L27.5,33 Z M7.5,7.5 L10,7.5 C10,7.5 12.5,6.4 12.5,5 C12.5,3.6 13.6,2.5 15,2.5 C16.4,2.5 17.5,3.6 17.5,5 C17.5,6.4 18.8,7.5 20,7.5 L22.5,7.5 C22.5,7.5 25,8.6 25,10 L5,10 C5,8.5 6.1,7.5 7.5,7.5 Z M5,27.5 L10,27.5 L10,25 L5,25 L5,27.5 Z M22.5,21.5 L22.5,16.5 L12.5,24 L22.5,31.5 L22.5,26.5 L32,26.5 L32,21.5 L22.5,21.5 Z M17.5,15 L5,15 L5,17.5 L17.5,17.5 L17.5,15 Z M10,20 L5,20 L5,22.5 L10,22.5 L10,20 Z"
    })
  })));
};
ko.displayName = "JVR.Copied";
function Lu() {
  var e = Ae(null);
  return e.current === null && (e.current = "custom-id-" + Math.random().toString(36).substr(2, 9)), e.current;
}
var zu = (e) => {
  var r, {
    keyName: t,
    value: n,
    expandKey: a = "",
    level: i,
    keys: o = [],
    parentValue: s
  } = e, l = Da(), {
    objectSortKeys: c,
    indentWidth: u,
    collapsed: d,
    shouldExpandNodeInitially: f
  } = lt(), p = typeof d == "boolean" ? d : typeof d == "number" ? i > d : !1, y = (r = l[a]) != null ? r : f ? !1 : p, m = f && f(!y, {
    value: n,
    keys: o,
    level: i,
    keyName: t,
    parentValue: s
  });
  if (f && d === !1) {
    if (l[a] === void 0 && !m)
      return null;
  } else if (l[a] === void 0 && m)
    return null;
  if (y)
    return null;
  var v = Array.isArray(n), b = v ? Object.entries(n).map((C) => [Number(C[0]), C[1]]) : Object.entries(n);
  c && (b = c === !0 ? b.sort((C, _) => {
    var [S] = C, [$] = _;
    return typeof S == "string" && typeof $ == "string" ? S.localeCompare($) : 0;
  }) : b.sort((C, _) => {
    var [S, $] = C, [x, R] = _;
    return typeof S == "string" && typeof x == "string" ? c(S, x, $, R) : 0;
  }));
  var h = {
    borderLeft: "var(--w-rjv-border-left-width, 1px) var(--w-rjv-line-style, solid) var(--w-rjv-line-color, #ebebeb)",
    paddingLeft: u,
    marginLeft: 6
  };
  return /* @__PURE__ */ N.jsx("div", {
    className: "w-rjv-wrap",
    style: h,
    children: b.map((C, _) => {
      var [S, $] = C;
      return /* @__PURE__ */ N.jsx(Bu, {
        parentValue: n,
        keyName: S,
        keys: [...o, S],
        value: $,
        level: i
      }, _);
    })
  });
};
zu.displayName = "JVR.KeyValues";
var Vo = (e) => {
  var {
    keyName: r,
    parentValue: t,
    keys: n,
    value: a
  } = e, {
    highlightUpdates: i
  } = lt(), o = typeof r == "number", s = Ae(null);
  Ry({
    value: a,
    highlightUpdates: i,
    highlightContainer: s
  });
  var l = {
    keyName: r,
    value: a,
    keys: n,
    parentValue: t
  };
  return /* @__PURE__ */ N.jsxs(gr, {
    children: [/* @__PURE__ */ N.jsxs("span", {
      ref: s,
      children: [/* @__PURE__ */ N.jsx(Wi, P({
        isNumber: o,
        "data-placement": "left"
      }, l)), /* @__PURE__ */ N.jsx(Vu, P({}, l, {
        children: r
      })), /* @__PURE__ */ N.jsx(Wi, P({
        isNumber: o,
        "data-placement": "right"
      }, l))]
    }), /* @__PURE__ */ N.jsx(yu, P({}, l))]
  });
};
Vo.displayName = "JVR.KayName";
var Bu = (e) => {
  var {
    keyName: r,
    value: t,
    parentValue: n,
    level: a = 0,
    keys: i = []
  } = e, o = eu(), s = Lu(), l = Array.isArray(t), c = t instanceof Set, u = t instanceof Map, d = t instanceof Date, f = t instanceof URL, p = t && typeof t == "object" && !l && !c && !u && !d && !f, y = p || l || c || u;
  if (y) {
    var m = c ? Array.from(t) : u ? Object.fromEntries(t) : t;
    return /* @__PURE__ */ N.jsx(Io, {
      keyName: r,
      value: m,
      parentValue: n,
      initialValue: t,
      keys: i,
      level: a + 1
    });
  }
  var v = {
    onMouseEnter: () => o({
      [s]: !0
    }),
    onMouseLeave: () => o({
      [s]: !1
    })
  };
  return /* @__PURE__ */ N.jsxs(Du, P({
    className: "w-rjv-line",
    value: t,
    keyName: r,
    keys: i,
    parentValue: n
  }, v, {
    children: [/* @__PURE__ */ N.jsx(Vo, {
      keyName: r,
      value: t,
      keys: i,
      parentValue: n
    }), /* @__PURE__ */ N.jsx(Mu, {
      keyName: r,
      value: t,
      keys: i
    }), /* @__PURE__ */ N.jsx(ko, {
      keyName: r,
      value: t,
      keys: i,
      parentValue: n,
      expandKey: s
    })]
  }));
};
Bu.displayName = "JVR.KeyValuesItem";
var Oy = ["value", "keyName"], jy = ["as", "render"], Hu = (e) => {
  var {
    CountInfoExtra: r = {}
  } = Pr();
  return jt(r, e, "CountInfoExtra"), null;
};
Hu.displayName = "JVR.CountInfoExtra";
var Wu = (e) => {
  var {
    value: r = {},
    keyName: t
  } = e, n = ue(e, Oy), {
    CountInfoExtra: a = {}
  } = Pr(), {
    as: i,
    render: o
  } = a, s = ue(a, jy);
  if (!o && !s.children) return null;
  var l = i || "span", c = o && typeof o == "function", u = P({}, s, n), d = c && o(u, {
    value: r,
    keyName: t
  });
  return d || /* @__PURE__ */ N.jsx(l, P({}, u));
};
Wu.displayName = "JVR.CountInfoExtraComps";
var Fy = ["value", "keyName"], Ny = ["as", "render"], Uu = (e) => {
  var {
    CountInfo: r = {}
  } = Pr();
  return jt(r, e, "CountInfo"), null;
};
Uu.displayName = "JVR.CountInfo";
var qu = (e) => {
  var {
    value: r = {},
    keyName: t
  } = e, n = ue(e, Fy), {
    displayObjectSize: a
  } = lt(), {
    CountInfo: i = {}
  } = Pr();
  if (!a) return null;
  var {
    as: o,
    render: s
  } = i, l = ue(i, Ny), c = o || "span";
  l.style = P({}, l.style, e.style);
  var u = Object.keys(r).length;
  l.children || (l.children = u + " item" + (u === 1 ? "" : "s"));
  var d = P({}, l, n), f = s && typeof s == "function", p = f && s(P({}, d, {
    "data-length": u
  }), {
    value: r,
    keyName: t
  });
  return p || /* @__PURE__ */ N.jsx(c, P({}, d));
};
qu.displayName = "JVR.CountInfoComp";
var Ay = ["as", "render"], Yu = (e) => {
  var {
    Ellipsis: r = {}
  } = Pr();
  return jt(r, e, "Ellipsis"), null;
};
Yu.displayName = "JVR.Ellipsis";
var Ku = (e) => {
  var {
    isExpanded: r,
    value: t,
    keyName: n
  } = e, {
    Ellipsis: a = {}
  } = Pr(), {
    as: i,
    render: o
  } = a, s = ue(a, Ay), l = i || "span", c = o && typeof o == "function" && o(P({}, s, {
    "data-expanded": r
  }), {
    value: t,
    keyName: n
  });
  return c || (!r || typeof t == "object" && Object.keys(t).length == 0 ? null : /* @__PURE__ */ N.jsx(l, P({}, s)));
};
Ku.displayName = "JVR.EllipsisComp";
var Gu = (e) => {
  var r, {
    keyName: t,
    expandKey: n,
    keys: a = [],
    initialValue: i,
    value: o,
    parentValue: s,
    level: l
  } = e, c = Da(), u = zg(), {
    onExpand: d,
    collapsed: f,
    shouldExpandNodeInitially: p
  } = lt(), y = typeof f == "boolean" ? f : typeof f == "number" ? l > f : !1, m = (r = c[n]) != null ? r : p ? !1 : y, v = p && p(!m, {
    value: o,
    keys: a,
    level: l,
    keyName: t,
    parentValue: s
  });
  c[n] === void 0 && p && (m = !v);
  var b = () => {
    var M = {
      expand: !m,
      value: o,
      keyid: n,
      keyName: t
    };
    d && d(M), u({
      [n]: M.expand
    });
  }, h = {
    display: "inline-flex",
    alignItems: "center"
  }, C = {
    transform: "rotate(" + (m ? "-90" : "0") + "deg)",
    transition: "all 0.3s"
  }, _ = Object.keys(o).length, S = typeof o == "object", $ = Array.isArray(o), x = o instanceof Set, R = _ !== 0 && ($ || x || S), T = {
    style: h
  };
  R && (T.onClick = b);
  var O = {
    keyName: t,
    value: o,
    keys: a,
    parentValue: s
  };
  return /* @__PURE__ */ N.jsxs("span", P({}, T, {
    children: [R && /* @__PURE__ */ N.jsx(bu, P({
      style: C,
      expandKey: n
    }, O)), (t || typeof t == "number") && /* @__PURE__ */ N.jsx(Vo, P({}, O)), /* @__PURE__ */ N.jsx(Cu, {
      value: i,
      keyName: t
    }), /* @__PURE__ */ N.jsx(Eu, {
      value: i,
      keyName: t
    }), /* @__PURE__ */ N.jsx(xu, P({
      isBrackets: $ || x
    }, O)), /* @__PURE__ */ N.jsx(Ku, {
      keyName: t,
      value: o,
      isExpanded: m
    }), /* @__PURE__ */ N.jsx(Mo, P({
      isVisiable: m || !R,
      isBrackets: $ || x
    }, O)), /* @__PURE__ */ N.jsx(qu, {
      value: o,
      keyName: t
    }), /* @__PURE__ */ N.jsx(Wu, {
      value: o,
      keyName: t
    }), /* @__PURE__ */ N.jsx(ko, {
      keyName: t,
      value: o,
      expandKey: n,
      parentValue: s,
      keys: a
    })]
  }));
};
Gu.displayName = "JVR.NestedOpen";
var My = ["className", "children", "parentValue", "keyid", "level", "value", "initialValue", "keys", "keyName"], Io = /* @__PURE__ */ on((e, r) => {
  var {
    className: t = "",
    parentValue: n,
    level: a = 1,
    value: i,
    initialValue: o,
    keys: s,
    keyName: l
  } = e, c = ue(e, My), u = eu(), d = Lu(), f = [t, "w-rjv-inner"].filter(Boolean).join(" "), p = {
    onMouseEnter: () => u({
      [d]: !0
    }),
    onMouseLeave: () => u({
      [d]: !1
    })
  };
  return /* @__PURE__ */ N.jsxs("div", P({
    className: f,
    ref: r
  }, c, p, {
    children: [/* @__PURE__ */ N.jsx(Gu, {
      expandKey: d,
      value: i,
      level: a,
      keys: s,
      parentValue: n,
      keyName: l,
      initialValue: o
    }), /* @__PURE__ */ N.jsx(zu, {
      expandKey: d,
      value: i,
      level: a,
      keys: s,
      parentValue: n,
      keyName: l
    }), /* @__PURE__ */ N.jsx(Su, {
      expandKey: d,
      value: i,
      level: a,
      keys: s,
      parentValue: n,
      keyName: l
    })]
  }));
});
Io.displayName = "JVR.Container";
var Ju = (e) => {
  var {
    BraceLeft: r = {}
  } = nr();
  return Gr(r, e, "BraceLeft"), null;
};
Ju.displayName = "JVR.BraceLeft";
var Xu = (e) => {
  var {
    BraceRight: r = {}
  } = nr();
  return Gr(r, e, "BraceRight"), null;
};
Xu.displayName = "JVR.BraceRight";
var Qu = (e) => {
  var {
    BracketsLeft: r = {}
  } = nr();
  return Gr(r, e, "BracketsLeft"), null;
};
Qu.displayName = "JVR.BracketsLeft";
var Zu = (e) => {
  var {
    BracketsRight: r = {}
  } = nr();
  return Gr(r, e, "BracketsRight"), null;
};
Zu.displayName = "JVR.BracketsRight";
var ed = (e) => {
  var {
    Arrow: r = {}
  } = nr();
  return Gr(r, e, "Arrow"), null;
};
ed.displayName = "JVR.Arrow";
var rd = (e) => {
  var {
    Colon: r = {}
  } = nr();
  return Gr(r, e, "Colon"), null;
};
rd.displayName = "JVR.Colon";
var td = (e) => {
  var {
    Quote: r = {}
  } = nr();
  return Gr(r, e, "Quote"), null;
};
td.displayName = "JVR.Quote";
var nd = (e) => {
  var {
    ValueQuote: r = {}
  } = nr();
  return Gr(r, e, "ValueQuote"), null;
};
nd.displayName = "JVR.ValueQuote";
var ad = (e) => {
  var {
    Bigint: r = {}
  } = Oe();
  return yr(r, e, "Bigint"), null;
};
ad.displayName = "JVR.Bigint";
var id = (e) => {
  var {
    Date: r = {}
  } = Oe();
  return yr(r, e, "Date"), null;
};
id.displayName = "JVR.Date";
var od = (e) => {
  var {
    False: r = {}
  } = Oe();
  return yr(r, e, "False"), null;
};
od.displayName = "JVR.False";
var sd = (e) => {
  var {
    Float: r = {}
  } = Oe();
  return yr(r, e, "Float"), null;
};
sd.displayName = "JVR.Float";
var ld = (e) => {
  var {
    Int: r = {}
  } = Oe();
  return yr(r, e, "Int"), null;
};
ld.displayName = "JVR.Int";
var cd = (e) => {
  var {
    Map: r = {}
  } = Oe();
  return yr(r, e, "Map"), null;
};
cd.displayName = "JVR.Map";
var ud = (e) => {
  var {
    Nan: r = {}
  } = Oe();
  return yr(r, e, "Nan"), null;
};
ud.displayName = "JVR.Nan";
var dd = (e) => {
  var {
    Null: r = {}
  } = Oe();
  return yr(r, e, "Null"), null;
};
dd.displayName = "JVR.Null";
var fd = (e) => {
  var {
    Set: r = {}
  } = Oe();
  return yr(r, e, "Set"), null;
};
fd.displayName = "JVR.Set";
var vd = (e) => {
  var {
    Str: r = {}
  } = Oe();
  return yr(r, e, "Str"), null;
};
vd.displayName = "JVR.StringText";
var pd = (e) => {
  var {
    True: r = {}
  } = Oe();
  return yr(r, e, "True"), null;
};
pd.displayName = "JVR.True";
var md = (e) => {
  var {
    Undefined: r = {}
  } = Oe();
  return yr(r, e, "Undefined"), null;
};
md.displayName = "JVR.Undefined";
var hd = (e) => {
  var {
    Url: r = {}
  } = Oe();
  return yr(r, e, "Url"), null;
};
hd.displayName = "JVR.Url";
var gd = (e) => {
  var {
    Copied: r = {}
  } = Pr();
  return jt(r, e, "Copied"), null;
};
gd.displayName = "JVR.Copied";
var ky = ["className", "style", "value", "children", "collapsed", "shouldExpandNodeInitially", "indentWidth", "displayObjectSize", "shortenTextAfterLength", "stringEllipsis", "highlightUpdates", "enableClipboard", "displayDataTypes", "objectSortKeys", "onExpand", "onCopied", "beforeCopy"], Re = /* @__PURE__ */ on((e, r) => {
  var {
    className: t = "",
    style: n,
    value: a,
    children: i,
    collapsed: o = !1,
    shouldExpandNodeInitially: s,
    indentWidth: l = 15,
    displayObjectSize: c = !0,
    shortenTextAfterLength: u = 30,
    stringEllipsis: d,
    highlightUpdates: f = !0,
    enableClipboard: p = !0,
    displayDataTypes: y = !0,
    objectSortKeys: m = !1,
    onExpand: v,
    onCopied: b,
    beforeCopy: h
  } = e, C = ue(e, ky), _ = P({
    lineHeight: 1.4,
    fontFamily: "var(--w-rjv-font-family, Menlo, monospace)",
    color: "var(--w-rjv-color, #002b36)",
    backgroundColor: "var(--w-rjv-background-color, #00000000)",
    fontSize: 13
  }, n), S = ["w-json-view-container", "w-rjv", t].filter(Boolean).join(" ");
  return /* @__PURE__ */ N.jsxs(gu, {
    initialState: {
      value: a,
      objectSortKeys: m,
      indentWidth: l,
      shouldExpandNodeInitially: o === !1 ? s : void 0,
      displayObjectSize: c,
      collapsed: o,
      enableClipboard: p,
      shortenTextAfterLength: u,
      stringEllipsis: d,
      highlightUpdates: f,
      onCopied: b,
      onExpand: v,
      beforeCopy: h
    },
    initialTypes: {
      displayDataTypes: y
    },
    children: [/* @__PURE__ */ N.jsx(Io, P({
      value: a
    }, C, {
      ref: r,
      className: S,
      style: _
    })), i]
  });
});
Re.Bigint = ad;
Re.Date = id;
Re.False = od;
Re.Float = sd;
Re.Int = ld;
Re.Map = cd;
Re.Nan = ud;
Re.Null = dd;
Re.Set = fd;
Re.String = vd;
Re.True = pd;
Re.Undefined = md;
Re.Url = hd;
Re.ValueQuote = nd;
Re.Arrow = ed;
Re.Colon = rd;
Re.Quote = td;
Re.Ellipsis = Yu;
Re.BraceLeft = Ju;
Re.BraceRight = Xu;
Re.BracketsLeft = Qu;
Re.BracketsRight = Zu;
Re.Copied = gd;
Re.CountInfo = Uu;
Re.CountInfoExtra = Hu;
Re.KeyName = ku;
Re.Row = Iu;
Re.displayName = "JVR.JsonView";
function Vy(e) {
  return !!(e.addonBefore || e.addonAfter);
}
function Iy(e) {
  return !!(e.prefix || e.suffix || e.allowClear);
}
function Ys(e, r, t) {
  var n = r.cloneNode(!0), a = Object.create(e, {
    target: {
      value: n
    },
    currentTarget: {
      value: n
    }
  });
  return n.value = t, typeof r.selectionStart == "number" && typeof r.selectionEnd == "number" && (n.selectionStart = r.selectionStart, n.selectionEnd = r.selectionEnd), n.setSelectionRange = function() {
    r.setSelectionRange.apply(r, arguments);
  }, a;
}
function Zn(e, r, t, n) {
  if (t) {
    var a = r;
    if (r.type === "click") {
      a = Ys(r, e, ""), t(a);
      return;
    }
    if (e.type !== "file" && n !== void 0) {
      a = Ys(r, e, n), t(a);
      return;
    }
    t(a);
  }
}
function yd(e, r) {
  if (e) {
    e.focus(r);
    var t = r || {}, n = t.cursor;
    if (n) {
      var a = e.value.length;
      switch (n) {
        case "start":
          e.setSelectionRange(0, 0);
          break;
        case "end":
          e.setSelectionRange(a, a);
          break;
        default:
          e.setSelectionRange(0, a);
      }
    }
  }
}
var bd = /* @__PURE__ */ J.forwardRef(function(e, r) {
  var t, n, a, i = e.inputElement, o = e.children, s = e.prefixCls, l = e.prefix, c = e.suffix, u = e.addonBefore, d = e.addonAfter, f = e.className, p = e.style, y = e.disabled, m = e.readOnly, v = e.focused, b = e.triggerFocus, h = e.allowClear, C = e.value, _ = e.handleReset, S = e.hidden, $ = e.classes, x = e.classNames, R = e.dataAttrs, T = e.styles, O = e.components, M = e.onClear, I = o ?? i, F = (O == null ? void 0 : O.affixWrapper) || "span", A = (O == null ? void 0 : O.groupWrapper) || "span", V = (O == null ? void 0 : O.wrapper) || "span", D = (O == null ? void 0 : O.groupAddon) || "span", z = Ae(null), H = function(Pe) {
    var K;
    (K = z.current) !== null && K !== void 0 && K.contains(Pe.target) && (b == null || b());
  }, ee = Iy(e), Q = /* @__PURE__ */ Zd(I, {
    value: C,
    className: Ee((t = I.props) === null || t === void 0 ? void 0 : t.className, !ee && (x == null ? void 0 : x.variant)) || null
  }), re = Ae(null);
  if (J.useImperativeHandle(r, function() {
    return {
      nativeElement: re.current || z.current
    };
  }), ee) {
    var q = null;
    if (h) {
      var U = !y && !m && C, Y = "".concat(s, "-clear-icon"), pe = Z(h) === "object" && h !== null && h !== void 0 && h.clearIcon ? h.clearIcon : "✖";
      q = /* @__PURE__ */ J.createElement("button", {
        type: "button",
        tabIndex: -1,
        onClick: function(Pe) {
          _ == null || _(Pe), M == null || M();
        },
        onMouseDown: function(Pe) {
          return Pe.preventDefault();
        },
        className: Ee(Y, w(w({}, "".concat(Y, "-hidden"), !U), "".concat(Y, "-has-suffix"), !!c))
      }, pe);
    }
    var se = "".concat(s, "-affix-wrapper"), he = Ee(se, w(w(w(w(w({}, "".concat(s, "-disabled"), y), "".concat(se, "-disabled"), y), "".concat(se, "-focused"), v), "".concat(se, "-readonly"), m), "".concat(se, "-input-with-clear-btn"), c && h && C), $ == null ? void 0 : $.affixWrapper, x == null ? void 0 : x.affixWrapper, x == null ? void 0 : x.variant), de = (c || h) && /* @__PURE__ */ J.createElement("span", {
      className: Ee("".concat(s, "-suffix"), x == null ? void 0 : x.suffix),
      style: T == null ? void 0 : T.suffix
    }, q, c);
    Q = /* @__PURE__ */ J.createElement(F, P({
      className: he,
      style: T == null ? void 0 : T.affixWrapper,
      onClick: H
    }, R == null ? void 0 : R.affixWrapper, {
      ref: z
    }), l && /* @__PURE__ */ J.createElement("span", {
      className: Ee("".concat(s, "-prefix"), x == null ? void 0 : x.prefix),
      style: T == null ? void 0 : T.prefix
    }, l), Q, de);
  }
  if (Vy(e)) {
    var me = "".concat(s, "-group"), fe = "".concat(me, "-addon"), je = "".concat(me, "-wrapper"), Fe = Ee("".concat(s, "-wrapper"), me, $ == null ? void 0 : $.wrapper, x == null ? void 0 : x.wrapper), Be = Ee(je, w({}, "".concat(je, "-disabled"), y), $ == null ? void 0 : $.group, x == null ? void 0 : x.groupWrapper);
    Q = /* @__PURE__ */ J.createElement(A, {
      className: Be,
      ref: re
    }, /* @__PURE__ */ J.createElement(V, {
      className: Fe
    }, u && /* @__PURE__ */ J.createElement(D, {
      className: fe
    }, u), Q, d && /* @__PURE__ */ J.createElement(D, {
      className: fe
    }, d)));
  }
  return /* @__PURE__ */ J.cloneElement(Q, {
    className: Ee((n = Q.props) === null || n === void 0 ? void 0 : n.className, f) || null,
    style: j(j({}, (a = Q.props) === null || a === void 0 ? void 0 : a.style), p),
    hidden: S
  });
}), Dy = ["show"];
function xd(e, r) {
  return E.useMemo(function() {
    var t = {};
    r && (t.show = Z(r) === "object" && r.formatter ? r.formatter : !!r), t = j(j({}, t), e);
    var n = t, a = n.show, i = $r(n, Dy);
    return j(j({}, i), {}, {
      show: !!a,
      showFormatter: typeof a == "function" ? a : void 0,
      strategy: i.strategy || function(o) {
        return o.length;
      }
    });
  }, [e, r]);
}
var Ly = ["autoComplete", "onChange", "onFocus", "onBlur", "onPressEnter", "onKeyDown", "onKeyUp", "prefixCls", "disabled", "htmlSize", "className", "maxLength", "suffix", "showCount", "count", "type", "classes", "classNames", "styles", "onCompositionStart", "onCompositionEnd"], zy = /* @__PURE__ */ on(function(e, r) {
  var t = e.autoComplete, n = e.onChange, a = e.onFocus, i = e.onBlur, o = e.onPressEnter, s = e.onKeyDown, l = e.onKeyUp, c = e.prefixCls, u = c === void 0 ? "rc-input" : c, d = e.disabled, f = e.htmlSize, p = e.className, y = e.maxLength, m = e.suffix, v = e.showCount, b = e.count, h = e.type, C = h === void 0 ? "text" : h, _ = e.classes, S = e.classNames, $ = e.styles, x = e.onCompositionStart, R = e.onCompositionEnd, T = $r(e, Ly), O = Yt(!1), M = W(O, 2), I = M[0], F = M[1], A = Ae(!1), V = Ae(!1), D = Ae(null), z = Ae(null), H = function(te) {
    D.current && yd(D.current, te);
  }, ee = $o(e.defaultValue, {
    value: e.value
  }), Q = W(ee, 2), re = Q[0], q = Q[1], U = re == null ? "" : String(re), Y = Yt(null), pe = W(Y, 2), se = pe[0], he = pe[1], de = xd(b, v), me = de.max || y, fe = de.strategy(U), je = !!me && fe > me;
  dl(r, function() {
    var ne;
    return {
      focus: H,
      blur: function() {
        var we;
        (we = D.current) === null || we === void 0 || we.blur();
      },
      setSelectionRange: function(we, br, ar) {
        var ir;
        (ir = D.current) === null || ir === void 0 || ir.setSelectionRange(we, br, ar);
      },
      select: function() {
        var we;
        (we = D.current) === null || we === void 0 || we.select();
      },
      input: D.current,
      nativeElement: ((ne = z.current) === null || ne === void 0 ? void 0 : ne.nativeElement) || D.current
    };
  }), Je(function() {
    V.current && (V.current = !1), F(function(ne) {
      return ne && d ? !1 : ne;
    });
  }, [d]);
  var Fe = function(te, we, br) {
    var ar = we;
    if (!A.current && de.exceedFormatter && de.max && de.strategy(we) > de.max) {
      if (ar = de.exceedFormatter(we, {
        max: de.max
      }), we !== ar) {
        var ir, xr;
        he([((ir = D.current) === null || ir === void 0 ? void 0 : ir.selectionStart) || 0, ((xr = D.current) === null || xr === void 0 ? void 0 : xr.selectionEnd) || 0]);
      }
    } else if (br.source === "compositionEnd")
      return;
    q(ar), D.current && Zn(D.current, te, n, ar);
  };
  Je(function() {
    if (se) {
      var ne;
      (ne = D.current) === null || ne === void 0 || ne.setSelectionRange.apply(ne, X(se));
    }
  }, [se]);
  var Be = function(te) {
    Fe(te, te.target.value, {
      source: "change"
    });
  }, B = function(te) {
    A.current = !1, Fe(te, te.currentTarget.value, {
      source: "compositionEnd"
    }), R == null || R(te);
  }, Pe = function(te) {
    o && te.key === "Enter" && !V.current && (V.current = !0, o(te)), s == null || s(te);
  }, K = function(te) {
    te.key === "Enter" && (V.current = !1), l == null || l(te);
  }, le = function(te) {
    F(!0), a == null || a(te);
  }, De = function(te) {
    V.current && (V.current = !1), F(!1), i == null || i(te);
  }, ve = function(te) {
    q(""), H(), D.current && Zn(D.current, te, n);
  }, qe = je && "".concat(u, "-out-of-range"), Me = function() {
    var te = cp(e, [
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
    return /* @__PURE__ */ J.createElement("input", P({
      autoComplete: t
    }, te, {
      onChange: Be,
      onFocus: le,
      onBlur: De,
      onKeyDown: Pe,
      onKeyUp: K,
      className: Ee(u, w({}, "".concat(u, "-disabled"), d), S == null ? void 0 : S.input),
      style: $ == null ? void 0 : $.input,
      ref: D,
      size: f,
      type: C,
      onCompositionStart: function(br) {
        A.current = !0, x == null || x(br);
      },
      onCompositionEnd: B
    }));
  }, Te = function() {
    var te = Number(me) > 0;
    if (m || de.show) {
      var we = de.showFormatter ? de.showFormatter({
        value: U,
        count: fe,
        maxLength: me
      }) : "".concat(fe).concat(te ? " / ".concat(me) : "");
      return /* @__PURE__ */ J.createElement(J.Fragment, null, de.show && /* @__PURE__ */ J.createElement("span", {
        className: Ee("".concat(u, "-show-count-suffix"), w({}, "".concat(u, "-show-count-has-suffix"), !!m), S == null ? void 0 : S.count),
        style: j({}, $ == null ? void 0 : $.count)
      }, we), m);
    }
    return null;
  };
  return /* @__PURE__ */ J.createElement(bd, P({}, T, {
    prefixCls: u,
    className: Ee(p, qe),
    handleReset: ve,
    value: U,
    focused: I,
    triggerFocus: H,
    suffix: Te(),
    disabled: d,
    classes: _,
    classNames: S,
    styles: $,
    ref: z
  }), Me());
}), qi = /* @__PURE__ */ E.createContext(null);
function By(e) {
  var r = e.children, t = e.onBatchResize, n = E.useRef(0), a = E.useRef([]), i = E.useContext(qi), o = E.useCallback(function(s, l, c) {
    n.current += 1;
    var u = n.current;
    a.current.push({
      size: s,
      element: l,
      data: c
    }), Promise.resolve().then(function() {
      u === n.current && (t == null || t(a.current), a.current = []);
    }), i == null || i(s, l, c);
  }, [t, i]);
  return /* @__PURE__ */ E.createElement(qi.Provider, {
    value: o
  }, r);
}
var Sd = function() {
  if (typeof Map < "u")
    return Map;
  function e(r, t) {
    var n = -1;
    return r.some(function(a, i) {
      return a[0] === t ? (n = i, !0) : !1;
    }), n;
  }
  return (
    /** @class */
    function() {
      function r() {
        this.__entries__ = [];
      }
      return Object.defineProperty(r.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: !0,
        configurable: !0
      }), r.prototype.get = function(t) {
        var n = e(this.__entries__, t), a = this.__entries__[n];
        return a && a[1];
      }, r.prototype.set = function(t, n) {
        var a = e(this.__entries__, t);
        ~a ? this.__entries__[a][1] = n : this.__entries__.push([t, n]);
      }, r.prototype.delete = function(t) {
        var n = this.__entries__, a = e(n, t);
        ~a && n.splice(a, 1);
      }, r.prototype.has = function(t) {
        return !!~e(this.__entries__, t);
      }, r.prototype.clear = function() {
        this.__entries__.splice(0);
      }, r.prototype.forEach = function(t, n) {
        n === void 0 && (n = null);
        for (var a = 0, i = this.__entries__; a < i.length; a++) {
          var o = i[a];
          t.call(n, o[1], o[0]);
        }
      }, r;
    }()
  );
}(), Yi = typeof window < "u" && typeof document < "u" && window.document === document, ea = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), Hy = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(ea) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), Wy = 2;
function Uy(e, r) {
  var t = !1, n = !1, a = 0;
  function i() {
    t && (t = !1, e()), n && s();
  }
  function o() {
    Hy(i);
  }
  function s() {
    var l = Date.now();
    if (t) {
      if (l - a < Wy)
        return;
      n = !0;
    } else
      t = !0, n = !1, setTimeout(o, r);
    a = l;
  }
  return s;
}
var qy = 20, Yy = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], Ky = typeof MutationObserver < "u", Gy = (
  /** @class */
  function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = Uy(this.refresh.bind(this), qy);
    }
    return e.prototype.addObserver = function(r) {
      ~this.observers_.indexOf(r) || this.observers_.push(r), this.connected_ || this.connect_();
    }, e.prototype.removeObserver = function(r) {
      var t = this.observers_, n = t.indexOf(r);
      ~n && t.splice(n, 1), !t.length && this.connected_ && this.disconnect_();
    }, e.prototype.refresh = function() {
      var r = this.updateObservers_();
      r && this.refresh();
    }, e.prototype.updateObservers_ = function() {
      var r = this.observers_.filter(function(t) {
        return t.gatherActive(), t.hasActive();
      });
      return r.forEach(function(t) {
        return t.broadcastActive();
      }), r.length > 0;
    }, e.prototype.connect_ = function() {
      !Yi || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), Ky ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !Yi || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(r) {
      var t = r.propertyName, n = t === void 0 ? "" : t, a = Yy.some(function(i) {
        return !!~n.indexOf(i);
      });
      a && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  }()
), Cd = function(e, r) {
  for (var t = 0, n = Object.keys(r); t < n.length; t++) {
    var a = n[t];
    Object.defineProperty(e, a, {
      value: r[a],
      enumerable: !1,
      writable: !1,
      configurable: !0
    });
  }
  return e;
}, $t = function(e) {
  var r = e && e.ownerDocument && e.ownerDocument.defaultView;
  return r || ea;
}, Ed = La(0, 0, 0, 0);
function ra(e) {
  return parseFloat(e) || 0;
}
function Ks(e) {
  for (var r = [], t = 1; t < arguments.length; t++)
    r[t - 1] = arguments[t];
  return r.reduce(function(n, a) {
    var i = e["border-" + a + "-width"];
    return n + ra(i);
  }, 0);
}
function Jy(e) {
  for (var r = ["top", "right", "bottom", "left"], t = {}, n = 0, a = r; n < a.length; n++) {
    var i = a[n], o = e["padding-" + i];
    t[i] = ra(o);
  }
  return t;
}
function Xy(e) {
  var r = e.getBBox();
  return La(0, 0, r.width, r.height);
}
function Qy(e) {
  var r = e.clientWidth, t = e.clientHeight;
  if (!r && !t)
    return Ed;
  var n = $t(e).getComputedStyle(e), a = Jy(n), i = a.left + a.right, o = a.top + a.bottom, s = ra(n.width), l = ra(n.height);
  if (n.boxSizing === "border-box" && (Math.round(s + i) !== r && (s -= Ks(n, "left", "right") + i), Math.round(l + o) !== t && (l -= Ks(n, "top", "bottom") + o)), !eb(e)) {
    var c = Math.round(s + i) - r, u = Math.round(l + o) - t;
    Math.abs(c) !== 1 && (s -= c), Math.abs(u) !== 1 && (l -= u);
  }
  return La(a.left, a.top, s, l);
}
var Zy = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof $t(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof $t(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function eb(e) {
  return e === $t(e).document.documentElement;
}
function rb(e) {
  return Yi ? Zy(e) ? Xy(e) : Qy(e) : Ed;
}
function tb(e) {
  var r = e.x, t = e.y, n = e.width, a = e.height, i = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(i.prototype);
  return Cd(o, {
    x: r,
    y: t,
    width: n,
    height: a,
    top: t,
    right: r + n,
    bottom: a + t,
    left: r
  }), o;
}
function La(e, r, t, n) {
  return { x: e, y: r, width: t, height: n };
}
var nb = (
  /** @class */
  function() {
    function e(r) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = La(0, 0, 0, 0), this.target = r;
    }
    return e.prototype.isActive = function() {
      var r = rb(this.target);
      return this.contentRect_ = r, r.width !== this.broadcastWidth || r.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var r = this.contentRect_;
      return this.broadcastWidth = r.width, this.broadcastHeight = r.height, r;
    }, e;
  }()
), ab = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(r, t) {
      var n = tb(t);
      Cd(this, { target: r, contentRect: n });
    }
    return e;
  }()
), ib = (
  /** @class */
  function() {
    function e(r, t, n) {
      if (this.activeObservations_ = [], this.observations_ = new Sd(), typeof r != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = r, this.controller_ = t, this.callbackCtx_ = n;
    }
    return e.prototype.observe = function(r) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(r instanceof $t(r).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var t = this.observations_;
        t.has(r) || (t.set(r, new nb(r)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(r) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(r instanceof $t(r).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var t = this.observations_;
        t.has(r) && (t.delete(r), t.size || this.controller_.removeObserver(this));
      }
    }, e.prototype.disconnect = function() {
      this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
    }, e.prototype.gatherActive = function() {
      var r = this;
      this.clearActive(), this.observations_.forEach(function(t) {
        t.isActive() && r.activeObservations_.push(t);
      });
    }, e.prototype.broadcastActive = function() {
      if (this.hasActive()) {
        var r = this.callbackCtx_, t = this.activeObservations_.map(function(n) {
          return new ab(n.target, n.broadcastRect());
        });
        this.callback_.call(r, t, r), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  }()
), wd = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new Sd(), $d = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(r) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var t = Gy.getInstance(), n = new ib(r, t, this);
      wd.set(this, n);
    }
    return e;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  $d.prototype[e] = function() {
    var r;
    return (r = wd.get(this))[e].apply(r, arguments);
  };
});
var ob = function() {
  return typeof ea.ResizeObserver < "u" ? ea.ResizeObserver : $d;
}(), Dr = /* @__PURE__ */ new Map();
function _d(e) {
  e.forEach(function(r) {
    var t, n = r.target;
    (t = Dr.get(n)) === null || t === void 0 || t.forEach(function(a) {
      return a(n);
    });
  });
}
var Rd = new ob(_d);
process.env.NODE_ENV;
process.env.NODE_ENV;
function sb(e, r) {
  Dr.has(e) || (Dr.set(e, /* @__PURE__ */ new Set()), Rd.observe(e)), Dr.get(e).add(r);
}
function lb(e, r) {
  Dr.has(e) && (Dr.get(e).delete(r), Dr.get(e).size || (Rd.unobserve(e), Dr.delete(e)));
}
var cb = /* @__PURE__ */ function(e) {
  it(t, e);
  var r = ot(t);
  function t() {
    return er(this, t), r.apply(this, arguments);
  }
  return rr(t, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), t;
}(E.Component);
function ub(e, r) {
  var t = e.children, n = e.disabled, a = E.useRef(null), i = E.useRef(null), o = E.useContext(qi), s = typeof t == "function", l = s ? t(a) : t, c = E.useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  }), u = !s && /* @__PURE__ */ E.isValidElement(l) && Ol(l), d = u ? Fl(l) : null, f = hp(d, a), p = function() {
    var b;
    return Yn(a.current) || // Support `nativeElement` format
    (a.current && Z(a.current) === "object" ? Yn((b = a.current) === null || b === void 0 ? void 0 : b.nativeElement) : null) || Yn(i.current);
  };
  E.useImperativeHandle(r, function() {
    return p();
  });
  var y = E.useRef(e);
  y.current = e;
  var m = E.useCallback(function(v) {
    var b = y.current, h = b.onResize, C = b.data, _ = v.getBoundingClientRect(), S = _.width, $ = _.height, x = v.offsetWidth, R = v.offsetHeight, T = Math.floor(S), O = Math.floor($);
    if (c.current.width !== T || c.current.height !== O || c.current.offsetWidth !== x || c.current.offsetHeight !== R) {
      var M = {
        width: T,
        height: O,
        offsetWidth: x,
        offsetHeight: R
      };
      c.current = M;
      var I = x === Math.round(S) ? S : x, F = R === Math.round($) ? $ : R, A = j(j({}, M), {}, {
        offsetWidth: I,
        offsetHeight: F
      });
      o == null || o(A, v, C), h && Promise.resolve().then(function() {
        h(A, v);
      });
    }
  }, []);
  return E.useEffect(function() {
    var v = p();
    return v && !n && sb(v, m), function() {
      return lb(v, m);
    };
  }, [a.current, n]), /* @__PURE__ */ E.createElement(cb, {
    ref: i
  }, u ? /* @__PURE__ */ E.cloneElement(l, {
    ref: f
  }) : l);
}
var Pd = /* @__PURE__ */ E.forwardRef(ub);
process.env.NODE_ENV !== "production" && (Pd.displayName = "SingleObserver");
var db = "rc-observer-key";
function fb(e, r) {
  var t = e.children, n = typeof t == "function" ? [t] : Qn(t);
  return process.env.NODE_ENV !== "production" && (n.length > 1 ? Kt(!1, "Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.") : n.length === 0 && Kt(!1, "`children` of ResizeObserver is empty. Nothing is in observe.")), n.map(function(a, i) {
    var o = (a == null ? void 0 : a.key) || "".concat(db, "-").concat(i);
    return /* @__PURE__ */ E.createElement(Pd, P({}, e, {
      key: o,
      ref: i === 0 ? r : void 0
    }), a);
  });
}
var Do = /* @__PURE__ */ E.forwardRef(fb);
process.env.NODE_ENV !== "production" && (Do.displayName = "ResizeObserver");
Do.Collection = By;
var vb = `
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
`, pb = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "font-variant", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing", "word-break", "white-space"], ri = {}, pr;
function mb(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, t = e.getAttribute("id") || e.getAttribute("data-reactid") || e.getAttribute("name");
  if (r && ri[t])
    return ri[t];
  var n = window.getComputedStyle(e), a = n.getPropertyValue("box-sizing") || n.getPropertyValue("-moz-box-sizing") || n.getPropertyValue("-webkit-box-sizing"), i = parseFloat(n.getPropertyValue("padding-bottom")) + parseFloat(n.getPropertyValue("padding-top")), o = parseFloat(n.getPropertyValue("border-bottom-width")) + parseFloat(n.getPropertyValue("border-top-width")), s = pb.map(function(c) {
    return "".concat(c, ":").concat(n.getPropertyValue(c));
  }).join(";"), l = {
    sizingStyle: s,
    paddingSize: i,
    borderSize: o,
    boxSizing: a
  };
  return r && t && (ri[t] = l), l;
}
function hb(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  pr || (pr = document.createElement("textarea"), pr.setAttribute("tab-index", "-1"), pr.setAttribute("aria-hidden", "true"), pr.setAttribute("name", "hiddenTextarea"), document.body.appendChild(pr)), e.getAttribute("wrap") ? pr.setAttribute("wrap", e.getAttribute("wrap")) : pr.removeAttribute("wrap");
  var a = mb(e, r), i = a.paddingSize, o = a.borderSize, s = a.boxSizing, l = a.sizingStyle;
  pr.setAttribute("style", "".concat(l, ";").concat(vb)), pr.value = e.value || e.placeholder || "";
  var c = void 0, u = void 0, d, f = pr.scrollHeight;
  if (s === "border-box" ? f += o : s === "content-box" && (f -= i), t !== null || n !== null) {
    pr.value = " ";
    var p = pr.scrollHeight - i;
    t !== null && (c = p * t, s === "border-box" && (c = c + i + o), f = Math.max(c, f)), n !== null && (u = p * n, s === "border-box" && (u = u + i + o), d = f > u ? "" : "hidden", f = Math.min(u, f));
  }
  var y = {
    height: f,
    overflowY: d,
    resize: "none"
  };
  return c && (y.minHeight = c), u && (y.maxHeight = u), y;
}
var gb = ["prefixCls", "defaultValue", "value", "autoSize", "onResize", "className", "style", "disabled", "onChange", "onInternalAutoSize"], ti = 0, ni = 1, ai = 2, yb = /* @__PURE__ */ E.forwardRef(function(e, r) {
  var t = e, n = t.prefixCls, a = t.defaultValue, i = t.value, o = t.autoSize, s = t.onResize, l = t.className, c = t.style, u = t.disabled, d = t.onChange, f = t.onInternalAutoSize, p = $r(t, gb), y = $o(a, {
    value: i,
    postState: function(Y) {
      return Y ?? "";
    }
  }), m = W(y, 2), v = m[0], b = m[1], h = function(Y) {
    b(Y.target.value), d == null || d(Y);
  }, C = E.useRef();
  E.useImperativeHandle(r, function() {
    return {
      textArea: C.current
    };
  });
  var _ = E.useMemo(function() {
    return o && Z(o) === "object" ? [o.minRows, o.maxRows] : [];
  }, [o]), S = W(_, 2), $ = S[0], x = S[1], R = !!o, T = E.useState(ai), O = W(T, 2), M = O[0], I = O[1], F = E.useState(), A = W(F, 2), V = A[0], D = A[1], z = function() {
    I(ti), process.env.NODE_ENV === "test" && (f == null || f());
  };
  Gn(function() {
    R && z();
  }, [i, $, x, R]), Gn(function() {
    if (M === ti)
      I(ni);
    else if (M === ni) {
      var U = hb(C.current, !1, $, x);
      I(ai), D(U);
    }
  }, [M]);
  var H = E.useRef(), ee = function() {
    wt.cancel(H.current);
  }, Q = function(Y) {
    M === ai && (s == null || s(Y), o && (ee(), H.current = wt(function() {
      z();
    })));
  };
  E.useEffect(function() {
    return ee;
  }, []);
  var re = R ? V : null, q = j(j({}, c), re);
  return (M === ti || M === ni) && (q.overflowY = "hidden", q.overflowX = "hidden"), /* @__PURE__ */ E.createElement(Do, {
    onResize: Q,
    disabled: !(o || s)
  }, /* @__PURE__ */ E.createElement("textarea", P({}, p, {
    ref: C,
    style: q,
    className: Ee(n, l, w({}, "".concat(n, "-disabled"), u)),
    disabled: u,
    value: v,
    onChange: h
  })));
}), bb = ["defaultValue", "value", "onFocus", "onBlur", "onChange", "allowClear", "maxLength", "onCompositionStart", "onCompositionEnd", "suffix", "prefixCls", "showCount", "count", "className", "style", "disabled", "hidden", "classNames", "styles", "onResize", "onClear", "onPressEnter", "readOnly", "autoSize", "onKeyDown"], xb = /* @__PURE__ */ J.forwardRef(function(e, r) {
  var t, n = e.defaultValue, a = e.value, i = e.onFocus, o = e.onBlur, s = e.onChange, l = e.allowClear, c = e.maxLength, u = e.onCompositionStart, d = e.onCompositionEnd, f = e.suffix, p = e.prefixCls, y = p === void 0 ? "rc-textarea" : p, m = e.showCount, v = e.count, b = e.className, h = e.style, C = e.disabled, _ = e.hidden, S = e.classNames, $ = e.styles, x = e.onResize, R = e.onClear, T = e.onPressEnter, O = e.readOnly, M = e.autoSize, I = e.onKeyDown, F = $r(e, bb), A = $o(n, {
    value: a,
    defaultValue: n
  }), V = W(A, 2), D = V[0], z = V[1], H = D == null ? "" : String(D), ee = J.useState(!1), Q = W(ee, 2), re = Q[0], q = Q[1], U = J.useRef(!1), Y = J.useState(null), pe = W(Y, 2), se = pe[0], he = pe[1], de = Ae(null), me = Ae(null), fe = function() {
    var ge;
    return (ge = me.current) === null || ge === void 0 ? void 0 : ge.textArea;
  }, je = function() {
    fe().focus();
  };
  dl(r, function() {
    var ke;
    return {
      resizableTextArea: me.current,
      focus: je,
      blur: function() {
        fe().blur();
      },
      nativeElement: ((ke = de.current) === null || ke === void 0 ? void 0 : ke.nativeElement) || fe()
    };
  }), Je(function() {
    q(function(ke) {
      return !C && ke;
    });
  }, [C]);
  var Fe = J.useState(null), Be = W(Fe, 2), B = Be[0], Pe = Be[1];
  J.useEffect(function() {
    if (B) {
      var ke;
      (ke = fe()).setSelectionRange.apply(ke, X(B));
    }
  }, [B]);
  var K = xd(v, m), le = (t = K.max) !== null && t !== void 0 ? t : c, De = Number(le) > 0, ve = K.strategy(H), qe = !!le && ve > le, Me = function(ge, Sr) {
    var zr = Sr;
    !U.current && K.exceedFormatter && K.max && K.strategy(Sr) > K.max && (zr = K.exceedFormatter(Sr, {
      max: K.max
    }), Sr !== zr && Pe([fe().selectionStart || 0, fe().selectionEnd || 0])), z(zr), Zn(ge.currentTarget, ge, s, zr);
  }, Te = function(ge) {
    U.current = !0, u == null || u(ge);
  }, ne = function(ge) {
    U.current = !1, Me(ge, ge.currentTarget.value), d == null || d(ge);
  }, te = function(ge) {
    Me(ge, ge.target.value);
  }, we = function(ge) {
    ge.key === "Enter" && T && T(ge), I == null || I(ge);
  }, br = function(ge) {
    q(!0), i == null || i(ge);
  }, ar = function(ge) {
    q(!1), o == null || o(ge);
  }, ir = function(ge) {
    z(""), je(), Zn(fe(), ge, s);
  }, xr = f, Ar;
  K.show && (K.showFormatter ? Ar = K.showFormatter({
    value: H,
    count: ve,
    maxLength: le
  }) : Ar = "".concat(ve).concat(De ? " / ".concat(le) : ""), xr = /* @__PURE__ */ J.createElement(J.Fragment, null, xr, /* @__PURE__ */ J.createElement("span", {
    className: Ee("".concat(y, "-data-count"), S == null ? void 0 : S.count),
    style: $ == null ? void 0 : $.count
  }, Ar)));
  var Ft = function(ge) {
    var Sr;
    x == null || x(ge), (Sr = fe()) !== null && Sr !== void 0 && Sr.style.height && he(!0);
  }, Nt = !M && !m && !l;
  return /* @__PURE__ */ J.createElement(bd, {
    ref: de,
    value: H,
    allowClear: l,
    handleReset: ir,
    suffix: xr,
    prefixCls: y,
    classNames: j(j({}, S), {}, {
      affixWrapper: Ee(S == null ? void 0 : S.affixWrapper, w(w({}, "".concat(y, "-show-count"), m), "".concat(y, "-textarea-allow-clear"), l))
    }),
    disabled: C,
    focused: re,
    className: Ee(b, qe && "".concat(y, "-out-of-range")),
    style: j(j({}, h), se && !Nt ? {
      height: "auto"
    } : {}),
    dataAttrs: {
      affixWrapper: {
        "data-count": typeof Ar == "string" ? Ar : void 0
      }
    },
    hidden: _,
    readOnly: O,
    onClear: R
  }, /* @__PURE__ */ J.createElement(yb, P({}, F, {
    autoSize: M,
    maxLength: c,
    onKeyDown: we,
    onChange: te,
    onFocus: br,
    onBlur: ar,
    onCompositionStart: Te,
    onCompositionEnd: ne,
    className: Ee(S == null ? void 0 : S.textarea),
    style: j(j({}, $ == null ? void 0 : $.textarea), {}, {
      resize: h == null ? void 0 : h.resize
    }),
    disabled: C,
    prefixCls: y,
    onResize: Ft,
    ref: me,
    readOnly: O
  })));
}), Sb = { icon: { tag: "svg", attrs: { "fill-rule": "evenodd", viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" } }] }, name: "close-circle", theme: "filled" }, Cb = function(r, t) {
  return /* @__PURE__ */ E.createElement(Ia, P({}, r, {
    ref: t,
    icon: Sb
  }));
}, Td = /* @__PURE__ */ E.forwardRef(Cb);
process.env.NODE_ENV !== "production" && (Td.displayName = "CloseCircleFilled");
const Od = (e) => {
  let r;
  return typeof e == "object" && (e != null && e.clearIcon) ? r = e : e && (r = {
    clearIcon: /* @__PURE__ */ J.createElement(Td, null)
  }), r;
};
function Ki(e, r, t) {
  return Ee({
    [`${e}-status-success`]: r === "success",
    [`${e}-status-warning`]: r === "warning",
    [`${e}-status-error`]: r === "error",
    [`${e}-status-validating`]: r === "validating",
    [`${e}-has-feedback`]: t
  });
}
const jd = (e, r) => r || e, Fd = (e) => {
  const [, , , , r] = ka();
  return r ? `${e}-css-var` : "";
};
var et = "RC_FORM_INTERNAL_HOOKS", $e = function() {
  Ie(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, _t = /* @__PURE__ */ E.createContext({
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
}), ta = /* @__PURE__ */ E.createContext(null);
function Gi(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Eb(e) {
  return e && !!e._init;
}
function Ji() {
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
      tel: "%s is not a valid %s",
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
      var r = JSON.parse(JSON.stringify(this));
      return r.clone = this.clone, r;
    }
  };
}
var Xi = Ji();
function wb(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
function $b(e, r, t) {
  if (yo()) return Reflect.construct.apply(null, arguments);
  var n = [null];
  n.push.apply(n, r);
  var a = new (e.bind.apply(e, n))();
  return t && Jt(a, t.prototype), a;
}
function Qi(e) {
  var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Qi = function(n) {
    if (n === null || !wb(n)) return n;
    if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
    if (r !== void 0) {
      if (r.has(n)) return r.get(n);
      r.set(n, a);
    }
    function a() {
      return $b(n, arguments, Xt(this).constructor);
    }
    return a.prototype = Object.create(n.prototype, {
      constructor: {
        value: a,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), Jt(a, n);
  }, Qi(e);
}
var _b = /%[sdj%]/g, Nd = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (Nd = function(r, t) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && t.every(function(n) {
    return typeof n == "string";
  }) && console.warn(r, t);
});
function Zi(e) {
  if (!e || !e.length) return null;
  var r = {};
  return e.forEach(function(t) {
    var n = t.field;
    r[n] = r[n] || [], r[n].push(t);
  }), r;
}
function hr(e) {
  for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
    t[n - 1] = arguments[n];
  var a = 0, i = t.length;
  if (typeof e == "function")
    return e.apply(null, t);
  if (typeof e == "string") {
    var o = e.replace(_b, function(s) {
      if (s === "%%")
        return "%";
      if (a >= i)
        return s;
      switch (s) {
        case "%s":
          return String(t[a++]);
        case "%d":
          return Number(t[a++]);
        case "%j":
          try {
            return JSON.stringify(t[a++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return s;
      }
    });
    return o;
  }
  return e;
}
function Rb(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern" || e === "tel";
}
function Ke(e, r) {
  return !!(e == null || r === "array" && Array.isArray(e) && !e.length || Rb(r) && typeof e == "string" && !e);
}
function Pb(e, r, t) {
  var n = [], a = 0, i = e.length;
  function o(s) {
    n.push.apply(n, X(s || [])), a++, a === i && t(n);
  }
  e.forEach(function(s) {
    r(s, o);
  });
}
function Gs(e, r, t) {
  var n = 0, a = e.length;
  function i(o) {
    if (o && o.length) {
      t(o);
      return;
    }
    var s = n;
    n = n + 1, s < a ? r(e[s], i) : t([]);
  }
  i([]);
}
function Tb(e) {
  var r = [];
  return Object.keys(e).forEach(function(t) {
    r.push.apply(r, X(e[t] || []));
  }), r;
}
var Js = /* @__PURE__ */ function(e) {
  it(t, e);
  var r = ot(t);
  function t(n, a) {
    var i;
    return er(this, t), i = r.call(this, "Async Validation Error"), w(ie(i), "errors", void 0), w(ie(i), "fields", void 0), i.errors = n, i.fields = a, i;
  }
  return rr(t);
}(/* @__PURE__ */ Qi(Error));
function Ob(e, r, t, n, a) {
  if (r.first) {
    var i = new Promise(function(f, p) {
      var y = function(b) {
        return n(b), b.length ? p(new Js(b, Zi(b))) : f(a);
      }, m = Tb(e);
      Gs(m, t, y);
    });
    return i.catch(function(f) {
      return f;
    }), i;
  }
  var o = r.firstFields === !0 ? Object.keys(e) : r.firstFields || [], s = Object.keys(e), l = s.length, c = 0, u = [], d = new Promise(function(f, p) {
    var y = function(v) {
      if (u.push.apply(u, v), c++, c === l)
        return n(u), u.length ? p(new Js(u, Zi(u))) : f(a);
    };
    s.length || (n(u), f(a)), s.forEach(function(m) {
      var v = e[m];
      o.indexOf(m) !== -1 ? Gs(v, t, y) : Pb(v, t, y);
    });
  });
  return d.catch(function(f) {
    return f;
  }), d;
}
function jb(e) {
  return !!(e && e.message !== void 0);
}
function Fb(e, r) {
  for (var t = e, n = 0; n < r.length; n++) {
    if (t == null)
      return t;
    t = t[r[n]];
  }
  return t;
}
function Xs(e, r) {
  return function(t) {
    var n;
    return e.fullFields ? n = Fb(r, e.fullFields) : n = r[t.field || e.fullField], jb(t) ? (t.field = t.field || e.fullField, t.fieldValue = n, t) : {
      message: typeof t == "function" ? t() : t,
      fieldValue: n,
      field: t.field || e.fullField
    };
  };
}
function Qs(e, r) {
  if (r) {
    for (var t in r)
      if (r.hasOwnProperty(t)) {
        var n = r[t];
        Z(n) === "object" && Z(e[t]) === "object" ? e[t] = j(j({}, e[t]), n) : e[t] = n;
      }
  }
  return e;
}
var vt = "enum", Nb = function(r, t, n, a, i) {
  r[vt] = Array.isArray(r[vt]) ? r[vt] : [], r[vt].indexOf(t) === -1 && a.push(hr(i.messages[vt], r.fullField, r[vt].join(", ")));
}, Ab = function(r, t, n, a, i) {
  if (r.pattern) {
    if (r.pattern instanceof RegExp)
      r.pattern.lastIndex = 0, r.pattern.test(t) || a.push(hr(i.messages.pattern.mismatch, r.fullField, t, r.pattern));
    else if (typeof r.pattern == "string") {
      var o = new RegExp(r.pattern);
      o.test(t) || a.push(hr(i.messages.pattern.mismatch, r.fullField, t, r.pattern));
    }
  }
}, Mb = function(r, t, n, a, i) {
  var o = typeof r.len == "number", s = typeof r.min == "number", l = typeof r.max == "number", c = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, u = t, d = null, f = typeof t == "number", p = typeof t == "string", y = Array.isArray(t);
  if (f ? d = "number" : p ? d = "string" : y && (d = "array"), !d)
    return !1;
  y && (u = t.length), p && (u = t.replace(c, "_").length), o ? u !== r.len && a.push(hr(i.messages[d].len, r.fullField, r.len)) : s && !l && u < r.min ? a.push(hr(i.messages[d].min, r.fullField, r.min)) : l && !s && u > r.max ? a.push(hr(i.messages[d].max, r.fullField, r.max)) : s && l && (u < r.min || u > r.max) && a.push(hr(i.messages[d].range, r.fullField, r.min, r.max));
}, Ad = function(r, t, n, a, i, o) {
  r.required && (!n.hasOwnProperty(r.field) || Ke(t, o || r.type)) && a.push(hr(i.messages.required, r.fullField));
}, Dn;
const kb = function() {
  if (Dn)
    return Dn;
  var e = "[a-fA-F\\d:]", r = function($) {
    return $ && $.includeBoundaries ? "(?:(?<=\\s|^)(?=".concat(e, ")|(?<=").concat(e, ")(?=\\s|$))") : "";
  }, t = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", n = "[a-fA-F\\d]{1,4}", a = [
    "(?:".concat(n, ":){7}(?:").concat(n, "|:)"),
    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
    "(?:".concat(n, ":){6}(?:").concat(t, "|:").concat(n, "|:)"),
    // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::
    "(?:".concat(n, ":){5}(?::").concat(t, "|(?::").concat(n, "){1,2}|:)"),
    // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::
    "(?:".concat(n, ":){4}(?:(?::").concat(n, "){0,1}:").concat(t, "|(?::").concat(n, "){1,3}|:)"),
    // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::
    "(?:".concat(n, ":){3}(?:(?::").concat(n, "){0,2}:").concat(t, "|(?::").concat(n, "){1,4}|:)"),
    // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::
    "(?:".concat(n, ":){2}(?:(?::").concat(n, "){0,3}:").concat(t, "|(?::").concat(n, "){1,5}|:)"),
    // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::
    "(?:".concat(n, ":){1}(?:(?::").concat(n, "){0,4}:").concat(t, "|(?::").concat(n, "){1,6}|:)"),
    // 1::              1::3:4:5:6:7:8   1::8            1::
    "(?::(?:(?::".concat(n, "){0,5}:").concat(t, "|(?::").concat(n, "){1,7}|:))")
    // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::
  ], i = "(?:%[0-9a-zA-Z]{1,})?", o = "(?:".concat(a.join("|"), ")").concat(i), s = new RegExp("(?:^".concat(t, "$)|(?:^").concat(o, "$)")), l = new RegExp("^".concat(t, "$")), c = new RegExp("^".concat(o, "$")), u = function($) {
    return $ && $.exact ? s : new RegExp("(?:".concat(r($)).concat(t).concat(r($), ")|(?:").concat(r($)).concat(o).concat(r($), ")"), "g");
  };
  u.v4 = function(S) {
    return S && S.exact ? l : new RegExp("".concat(r(S)).concat(t).concat(r(S)), "g");
  }, u.v6 = function(S) {
    return S && S.exact ? c : new RegExp("".concat(r(S)).concat(o).concat(r(S)), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", p = u.v4().source, y = u.v6().source, m = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", v = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", b = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", h = "(?::\\d{2,5})?", C = '(?:[/?#][^\\s"]*)?', _ = "(?:".concat(d, "|www\\.)").concat(f, "(?:localhost|").concat(p, "|").concat(y, "|").concat(m).concat(v).concat(b, ")").concat(h).concat(C);
  return Dn = new RegExp("(?:^".concat(_, "$)"), "i"), Dn;
};
var ii = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  /**
   * Phone number regex, support country code, brackets, spaces, and dashes (or non-breaking hyphen \u2011).
   * @see https://regexr.com/3c53v
   * @see https://ihateregex.io/expr/phone/
   * @see https://developers.google.com/style/phone-numbers using non-breaking hyphen \u2011
   */
  tel: /^(\+[0-9]{1,3}[-\s\u2011]?)?(\([0-9]{1,4}\)[-\s\u2011]?)?([0-9]+[-\s\u2011]?)*[0-9]+$/,
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, Ht = {
  integer: function(r) {
    return Ht.number(r) && parseInt(r, 10) === r;
  },
  float: function(r) {
    return Ht.number(r) && !Ht.integer(r);
  },
  array: function(r) {
    return Array.isArray(r);
  },
  regexp: function(r) {
    if (r instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(r);
    } catch {
      return !1;
    }
  },
  date: function(r) {
    return typeof r.getTime == "function" && typeof r.getMonth == "function" && typeof r.getYear == "function" && !isNaN(r.getTime());
  },
  number: function(r) {
    return isNaN(r) ? !1 : typeof r == "number";
  },
  object: function(r) {
    return Z(r) === "object" && !Ht.array(r);
  },
  method: function(r) {
    return typeof r == "function";
  },
  email: function(r) {
    return typeof r == "string" && r.length <= 320 && !!r.match(ii.email);
  },
  tel: function(r) {
    return typeof r == "string" && r.length <= 32 && !!r.match(ii.tel);
  },
  url: function(r) {
    return typeof r == "string" && r.length <= 2048 && !!r.match(kb());
  },
  hex: function(r) {
    return typeof r == "string" && !!r.match(ii.hex);
  }
}, Vb = function(r, t, n, a, i) {
  if (r.required && t === void 0) {
    Ad(r, t, n, a, i);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "tel", "number", "date", "url", "hex"], s = r.type;
  o.indexOf(s) > -1 ? Ht[s](t) || a.push(hr(i.messages.types[s], r.fullField, r.type)) : s && Z(t) !== r.type && a.push(hr(i.messages.types[s], r.fullField, r.type));
}, Ib = function(r, t, n, a, i) {
  (/^\s+$/.test(t) || t === "") && a.push(hr(i.messages.whitespace, r.fullField));
};
const ce = {
  required: Ad,
  whitespace: Ib,
  type: Vb,
  range: Mb,
  enum: Nb,
  pattern: Ab
};
var Db = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (Ke(t) && !r.required)
      return n();
    ce.required(r, t, a, o, i);
  }
  n(o);
}, Lb = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (t == null && !r.required)
      return n();
    ce.required(r, t, a, o, i, "array"), t != null && (ce.type(r, t, a, o, i), ce.range(r, t, a, o, i));
  }
  n(o);
}, zb = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (Ke(t) && !r.required)
      return n();
    ce.required(r, t, a, o, i), t !== void 0 && ce.type(r, t, a, o, i);
  }
  n(o);
}, Bb = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (Ke(t, "date") && !r.required)
      return n();
    if (ce.required(r, t, a, o, i), !Ke(t, "date")) {
      var l;
      t instanceof Date ? l = t : l = new Date(t), ce.type(r, l, a, o, i), l && ce.range(r, l.getTime(), a, o, i);
    }
  }
  n(o);
}, Hb = "enum", Wb = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (Ke(t) && !r.required)
      return n();
    ce.required(r, t, a, o, i), t !== void 0 && ce[Hb](r, t, a, o, i);
  }
  n(o);
}, Ub = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (Ke(t) && !r.required)
      return n();
    ce.required(r, t, a, o, i), t !== void 0 && (ce.type(r, t, a, o, i), ce.range(r, t, a, o, i));
  }
  n(o);
}, qb = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (Ke(t) && !r.required)
      return n();
    ce.required(r, t, a, o, i), t !== void 0 && (ce.type(r, t, a, o, i), ce.range(r, t, a, o, i));
  }
  n(o);
}, Yb = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (Ke(t) && !r.required)
      return n();
    ce.required(r, t, a, o, i), t !== void 0 && ce.type(r, t, a, o, i);
  }
  n(o);
}, Kb = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (t === "" && (t = void 0), Ke(t) && !r.required)
      return n();
    ce.required(r, t, a, o, i), t !== void 0 && (ce.type(r, t, a, o, i), ce.range(r, t, a, o, i));
  }
  n(o);
}, Gb = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (Ke(t) && !r.required)
      return n();
    ce.required(r, t, a, o, i), t !== void 0 && ce.type(r, t, a, o, i);
  }
  n(o);
}, Jb = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (Ke(t, "string") && !r.required)
      return n();
    ce.required(r, t, a, o, i), Ke(t, "string") || ce.pattern(r, t, a, o, i);
  }
  n(o);
}, Xb = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (Ke(t) && !r.required)
      return n();
    ce.required(r, t, a, o, i), Ke(t) || ce.type(r, t, a, o, i);
  }
  n(o);
}, Qb = function(r, t, n, a, i) {
  var o = [], s = Array.isArray(t) ? "array" : Z(t);
  ce.required(r, t, a, o, i, s), n(o);
}, Zb = function(r, t, n, a, i) {
  var o = [], s = r.required || !r.required && a.hasOwnProperty(r.field);
  if (s) {
    if (Ke(t, "string") && !r.required)
      return n();
    ce.required(r, t, a, o, i, "string"), Ke(t, "string") || (ce.type(r, t, a, o, i), ce.range(r, t, a, o, i), ce.pattern(r, t, a, o, i), r.whitespace === !0 && ce.whitespace(r, t, a, o, i));
  }
  n(o);
}, Ln = function(r, t, n, a, i) {
  var o = r.type, s = [], l = r.required || !r.required && a.hasOwnProperty(r.field);
  if (l) {
    if (Ke(t, o) && !r.required)
      return n();
    ce.required(r, t, a, s, i, o), Ke(t, o) || ce.type(r, t, a, s, i);
  }
  n(s);
};
const qt = {
  string: Zb,
  method: Yb,
  number: Kb,
  boolean: zb,
  regexp: Xb,
  integer: qb,
  float: Ub,
  array: Lb,
  object: Gb,
  enum: Wb,
  pattern: Jb,
  date: Bb,
  url: Ln,
  hex: Ln,
  email: Ln,
  tel: Ln,
  required: Qb,
  any: Db
};
var En = /* @__PURE__ */ function() {
  function e(r) {
    er(this, e), w(this, "rules", null), w(this, "_messages", Xi), this.define(r);
  }
  return rr(e, [{
    key: "define",
    value: function(t) {
      var n = this;
      if (!t)
        throw new Error("Cannot configure a schema with no rules");
      if (Z(t) !== "object" || Array.isArray(t))
        throw new Error("Rules must be an object");
      this.rules = {}, Object.keys(t).forEach(function(a) {
        var i = t[a];
        n.rules[a] = Array.isArray(i) ? i : [i];
      });
    }
  }, {
    key: "messages",
    value: function(t) {
      return t && (this._messages = Qs(Ji(), t)), this._messages;
    }
  }, {
    key: "validate",
    value: function(t) {
      var n = this, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
      }, o = t, s = a, l = i;
      if (typeof s == "function" && (l = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
        return l && l(null, o), Promise.resolve(o);
      function c(y) {
        var m = [], v = {};
        function b(C) {
          if (Array.isArray(C)) {
            var _;
            m = (_ = m).concat.apply(_, X(C));
          } else
            m.push(C);
        }
        for (var h = 0; h < y.length; h++)
          b(y[h]);
        m.length ? (v = Zi(m), l(m, v)) : l(null, o);
      }
      if (s.messages) {
        var u = this.messages();
        u === Xi && (u = Ji()), Qs(u, s.messages), s.messages = u;
      } else
        s.messages = this.messages();
      var d = {}, f = s.keys || Object.keys(this.rules);
      f.forEach(function(y) {
        var m = n.rules[y], v = o[y];
        m.forEach(function(b) {
          var h = b;
          typeof h.transform == "function" && (o === t && (o = j({}, o)), v = o[y] = h.transform(v), v != null && (h.type = h.type || (Array.isArray(v) ? "array" : Z(v)))), typeof h == "function" ? h = {
            validator: h
          } : h = j({}, h), h.validator = n.getValidationMethod(h), h.validator && (h.field = y, h.fullField = h.fullField || y, h.type = n.getType(h), d[y] = d[y] || [], d[y].push({
            rule: h,
            value: v,
            source: o,
            field: y
          }));
        });
      });
      var p = {};
      return Ob(d, s, function(y, m) {
        var v = y.rule, b = (v.type === "object" || v.type === "array") && (Z(v.fields) === "object" || Z(v.defaultField) === "object");
        b = b && (v.required || !v.required && y.value), v.field = y.field;
        function h(x, R) {
          return j(j({}, R), {}, {
            fullField: "".concat(v.fullField, ".").concat(x),
            fullFields: v.fullFields ? [].concat(X(v.fullFields), [x]) : [x]
          });
        }
        function C() {
          var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], R = Array.isArray(x) ? x : [x];
          !s.suppressWarning && R.length && e.warning("async-validator:", R), R.length && v.message !== void 0 && v.message !== null && (R = [].concat(v.message));
          var T = R.map(Xs(v, o));
          if (s.first && T.length)
            return p[v.field] = 1, m(T);
          if (!b)
            m(T);
          else {
            if (v.required && !y.value)
              return v.message !== void 0 ? T = [].concat(v.message).map(Xs(v, o)) : s.error && (T = [s.error(v, hr(s.messages.required, v.field))]), m(T);
            var O = {};
            v.defaultField && Object.keys(y.value).map(function(F) {
              O[F] = v.defaultField;
            }), O = j(j({}, O), y.rule.fields);
            var M = {};
            Object.keys(O).forEach(function(F) {
              var A = O[F], V = Array.isArray(A) ? A : [A];
              M[F] = V.map(h.bind(null, F));
            });
            var I = new e(M);
            I.messages(s.messages), y.rule.options && (y.rule.options.messages = s.messages, y.rule.options.error = s.error), I.validate(y.value, y.rule.options || s, function(F) {
              var A = [];
              T && T.length && A.push.apply(A, X(T)), F && F.length && A.push.apply(A, X(F)), m(A.length ? A : null);
            });
          }
        }
        var _;
        if (v.asyncValidator)
          _ = v.asyncValidator(v, y.value, C, y.source, s);
        else if (v.validator) {
          try {
            _ = v.validator(v, y.value, C, y.source, s);
          } catch (x) {
            var S, $;
            (S = ($ = console).error) === null || S === void 0 || S.call($, x), s.suppressValidatorError || setTimeout(function() {
              throw x;
            }, 0), C(x.message);
          }
          _ === !0 ? C() : _ === !1 ? C(typeof v.message == "function" ? v.message(v.fullField || v.field) : v.message || "".concat(v.fullField || v.field, " fails")) : _ instanceof Array ? C(_) : _ instanceof Error && C(_.message);
        }
        _ && _.then && _.then(function() {
          return C();
        }, function(x) {
          return C(x);
        });
      }, function(y) {
        c(y);
      }, o);
    }
  }, {
    key: "getType",
    value: function(t) {
      if (t.type === void 0 && t.pattern instanceof RegExp && (t.type = "pattern"), typeof t.validator != "function" && t.type && !qt.hasOwnProperty(t.type))
        throw new Error(hr("Unknown rule type %s", t.type));
      return t.type || "string";
    }
  }, {
    key: "getValidationMethod",
    value: function(t) {
      if (typeof t.validator == "function")
        return t.validator;
      var n = Object.keys(t), a = n.indexOf("message");
      return a !== -1 && n.splice(a, 1), n.length === 1 && n[0] === "required" ? qt.required : qt[this.getType(t)] || void 0;
    }
  }]), e;
}();
w(En, "register", function(r, t) {
  if (typeof t != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  qt[r] = t;
});
w(En, "warning", Nd);
w(En, "messages", Xi);
w(En, "validators", qt);
var mr = "'${name}' is not a valid ${type}", Md = {
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
    string: mr,
    method: mr,
    array: mr,
    object: mr,
    number: mr,
    date: mr,
    boolean: mr,
    integer: mr,
    float: mr,
    regexp: mr,
    email: mr,
    url: mr,
    hex: mr
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
}, Zs = En;
function e0(e, r) {
  return e.replace(/\\?\$\{\w+\}/g, function(t) {
    if (t.startsWith("\\"))
      return t.slice(1);
    var n = t.slice(2, -1);
    return r[n];
  });
}
var el = "CODE_LOGIC_ERROR";
function eo(e, r, t, n, a) {
  return ro.apply(this, arguments);
}
function ro() {
  return ro = Cn(/* @__PURE__ */ Rr().mark(function e(r, t, n, a, i) {
    var o, s, l, c, u, d, f, p, y;
    return Rr().wrap(function(v) {
      for (; ; ) switch (v.prev = v.next) {
        case 0:
          return o = j({}, n), delete o.ruleIndex, Zs.warning = function() {
          }, o.validator && (s = o.validator, o.validator = function() {
            try {
              return s.apply(void 0, arguments);
            } catch (b) {
              return console.error(b), Promise.reject(el);
            }
          }), l = null, o && o.type === "array" && o.defaultField && (l = o.defaultField, delete o.defaultField), c = new Zs(w({}, r, [o])), u = mt(Md, a.validateMessages), c.messages(u), d = [], v.prev = 10, v.next = 13, Promise.resolve(c.validate(w({}, r, t), j({}, a)));
        case 13:
          v.next = 18;
          break;
        case 15:
          v.prev = 15, v.t0 = v.catch(10), v.t0.errors && (d = v.t0.errors.map(function(b, h) {
            var C = b.message, _ = C === el ? u.default : C;
            return /* @__PURE__ */ E.isValidElement(_) ? (
              // Wrap ReactNode with `key`
              /* @__PURE__ */ E.cloneElement(_, {
                key: "error_".concat(h)
              })
            ) : _;
          }));
        case 18:
          if (!(!d.length && l && Array.isArray(t) && t.length > 0)) {
            v.next = 23;
            break;
          }
          return v.next = 21, Promise.all(t.map(function(b, h) {
            return eo("".concat(r, ".").concat(h), b, l, a, i);
          }));
        case 21:
          return f = v.sent, v.abrupt("return", f.reduce(function(b, h) {
            return [].concat(X(b), X(h));
          }, []));
        case 23:
          return p = j(j({}, n), {}, {
            name: r,
            enum: (n.enum || []).join(", ")
          }, i), y = d.map(function(b) {
            return typeof b == "string" ? e0(b, p) : b;
          }), v.abrupt("return", y);
        case 26:
        case "end":
          return v.stop();
      }
    }, e, null, [[10, 15]]);
  })), ro.apply(this, arguments);
}
function r0(e, r, t, n, a, i) {
  var o = e.join("."), s = t.map(function(u, d) {
    var f = u.validator, p = j(j({}, u), {}, {
      ruleIndex: d
    });
    return f && (p.validator = function(y, m, v) {
      var b = !1, h = function() {
        for (var S = arguments.length, $ = new Array(S), x = 0; x < S; x++)
          $[x] = arguments[x];
        Promise.resolve().then(function() {
          Ie(!b, "Your validator function has already return a promise. `callback` will be ignored."), b || v.apply(void 0, $);
        });
      }, C = f(y, m, h);
      b = C && typeof C.then == "function" && typeof C.catch == "function", Ie(b, "`callback` is deprecated. Please return a promise instead."), b && C.then(function() {
        v();
      }).catch(function(_) {
        v(_ || " ");
      });
    }), p;
  }).sort(function(u, d) {
    var f = u.warningOnly, p = u.ruleIndex, y = d.warningOnly, m = d.ruleIndex;
    return !!f == !!y ? p - m : f ? 1 : -1;
  }), l;
  if (a === !0)
    l = new Promise(/* @__PURE__ */ function() {
      var u = Cn(/* @__PURE__ */ Rr().mark(function d(f, p) {
        var y, m, v;
        return Rr().wrap(function(h) {
          for (; ; ) switch (h.prev = h.next) {
            case 0:
              y = 0;
            case 1:
              if (!(y < s.length)) {
                h.next = 12;
                break;
              }
              return m = s[y], h.next = 5, eo(o, r, m, n, i);
            case 5:
              if (v = h.sent, !v.length) {
                h.next = 9;
                break;
              }
              return p([{
                errors: v,
                rule: m
              }]), h.abrupt("return");
            case 9:
              y += 1, h.next = 1;
              break;
            case 12:
              f([]);
            case 13:
            case "end":
              return h.stop();
          }
        }, d);
      }));
      return function(d, f) {
        return u.apply(this, arguments);
      };
    }());
  else {
    var c = s.map(function(u) {
      return eo(o, r, u, n, i).then(function(d) {
        return {
          errors: d,
          rule: u
        };
      });
    });
    l = (a ? n0(c) : t0(c)).then(function(u) {
      return Promise.reject(u);
    });
  }
  return l.catch(function(u) {
    return u;
  }), l;
}
function t0(e) {
  return to.apply(this, arguments);
}
function to() {
  return to = Cn(/* @__PURE__ */ Rr().mark(function e(r) {
    return Rr().wrap(function(n) {
      for (; ; ) switch (n.prev = n.next) {
        case 0:
          return n.abrupt("return", Promise.all(r).then(function(a) {
            var i, o = (i = []).concat.apply(i, X(a));
            return o;
          }));
        case 1:
        case "end":
          return n.stop();
      }
    }, e);
  })), to.apply(this, arguments);
}
function n0(e) {
  return no.apply(this, arguments);
}
function no() {
  return no = Cn(/* @__PURE__ */ Rr().mark(function e(r) {
    var t;
    return Rr().wrap(function(a) {
      for (; ; ) switch (a.prev = a.next) {
        case 0:
          return t = 0, a.abrupt("return", new Promise(function(i) {
            r.forEach(function(o) {
              o.then(function(s) {
                s.errors.length && i([s]), t += 1, t === r.length && i([]);
              });
            });
          }));
        case 2:
        case "end":
          return a.stop();
      }
    }, e);
  })), no.apply(this, arguments);
}
function He(e) {
  return Gi(e);
}
function rl(e, r) {
  var t = {};
  return r.forEach(function(n) {
    var a = kr(e, n);
    t = Tr(t, n, a);
  }), t;
}
function bt(e, r) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return e && e.some(function(n) {
    return kd(r, n, t);
  });
}
function kd(e, r) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return !e || !r || !t && e.length !== r.length ? !1 : r.every(function(n, a) {
    return e[a] === n;
  });
}
function a0(e, r) {
  if (e === r)
    return !0;
  if (!e && r || e && !r || !e || !r || Z(e) !== "object" || Z(r) !== "object")
    return !1;
  var t = Object.keys(e), n = Object.keys(r), a = new Set([].concat(t, n));
  return X(a).every(function(i) {
    var o = e[i], s = r[i];
    return typeof o == "function" && typeof s == "function" ? !0 : o === s;
  });
}
function i0(e) {
  var r = arguments.length <= 1 ? void 0 : arguments[1];
  return r && r.target && Z(r.target) === "object" && e in r.target ? r.target[e] : r;
}
function tl(e, r, t) {
  var n = e.length;
  if (r < 0 || r >= n || t < 0 || t >= n)
    return e;
  var a = e[r], i = r - t;
  return i > 0 ? [].concat(X(e.slice(0, t)), [a], X(e.slice(t, r)), X(e.slice(r + 1, n))) : i < 0 ? [].concat(X(e.slice(0, r)), X(e.slice(r + 1, t + 1)), [a], X(e.slice(t + 1, n))) : e;
}
var o0 = ["name"], wr = [];
function oi(e, r, t, n, a, i) {
  return typeof e == "function" ? e(r, t, "source" in i ? {
    source: i.source
  } : {}) : n !== a;
}
var Lo = /* @__PURE__ */ function(e) {
  it(t, e);
  var r = ot(t);
  function t(n) {
    var a;
    if (er(this, t), a = r.call(this, n), w(ie(a), "state", {
      resetCount: 0
    }), w(ie(a), "cancelRegisterFunc", null), w(ie(a), "mounted", !1), w(ie(a), "touched", !1), w(ie(a), "dirty", !1), w(ie(a), "validatePromise", void 0), w(ie(a), "prevValidating", void 0), w(ie(a), "errors", wr), w(ie(a), "warnings", wr), w(ie(a), "cancelRegister", function() {
      var l = a.props, c = l.preserve, u = l.isListField, d = l.name;
      a.cancelRegisterFunc && a.cancelRegisterFunc(u, c, He(d)), a.cancelRegisterFunc = null;
    }), w(ie(a), "getNamePath", function() {
      var l = a.props, c = l.name, u = l.fieldContext, d = u.prefixName, f = d === void 0 ? [] : d;
      return c !== void 0 ? [].concat(X(f), X(c)) : [];
    }), w(ie(a), "getRules", function() {
      var l = a.props, c = l.rules, u = c === void 0 ? [] : c, d = l.fieldContext;
      return u.map(function(f) {
        return typeof f == "function" ? f(d) : f;
      });
    }), w(ie(a), "refresh", function() {
      a.mounted && a.setState(function(l) {
        var c = l.resetCount;
        return {
          resetCount: c + 1
        };
      });
    }), w(ie(a), "metaCache", null), w(ie(a), "triggerMetaEvent", function(l) {
      var c = a.props.onMetaChange;
      if (c) {
        var u = j(j({}, a.getMeta()), {}, {
          destroy: l
        });
        vi(a.metaCache, u) || c(u), a.metaCache = u;
      } else
        a.metaCache = null;
    }), w(ie(a), "onStoreChange", function(l, c, u) {
      var d = a.props, f = d.shouldUpdate, p = d.dependencies, y = p === void 0 ? [] : p, m = d.onReset, v = u.store, b = a.getNamePath(), h = a.getValue(l), C = a.getValue(v), _ = c && bt(c, b);
      switch (u.type === "valueUpdate" && u.source === "external" && !vi(h, C) && (a.touched = !0, a.dirty = !0, a.validatePromise = null, a.errors = wr, a.warnings = wr, a.triggerMetaEvent()), u.type) {
        case "reset":
          if (!c || _) {
            a.touched = !1, a.dirty = !1, a.validatePromise = void 0, a.errors = wr, a.warnings = wr, a.triggerMetaEvent(), m == null || m(), a.refresh();
            return;
          }
          break;
        case "remove": {
          if (f && oi(f, l, v, h, C, u)) {
            a.reRender();
            return;
          }
          break;
        }
        case "setField": {
          var S = u.data;
          if (_) {
            "touched" in S && (a.touched = S.touched), "validating" in S && !("originRCField" in S) && (a.validatePromise = S.validating ? Promise.resolve([]) : null), "errors" in S && (a.errors = S.errors || wr), "warnings" in S && (a.warnings = S.warnings || wr), a.dirty = !0, a.triggerMetaEvent(), a.reRender();
            return;
          } else if ("value" in S && bt(c, b, !0)) {
            a.reRender();
            return;
          }
          if (f && !b.length && oi(f, l, v, h, C, u)) {
            a.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var $ = y.map(He);
          if ($.some(function(x) {
            return bt(u.relatedFields, x);
          })) {
            a.reRender();
            return;
          }
          break;
        }
        default:
          if (_ || (!y.length || b.length || f) && oi(f, l, v, h, C, u)) {
            a.reRender();
            return;
          }
          break;
      }
      f === !0 && a.reRender();
    }), w(ie(a), "validateRules", function(l) {
      var c = a.getNamePath(), u = a.getValue(), d = l || {}, f = d.triggerName, p = d.validateOnly, y = p === void 0 ? !1 : p, m = Promise.resolve().then(/* @__PURE__ */ Cn(/* @__PURE__ */ Rr().mark(function v() {
        var b, h, C, _, S, $, x;
        return Rr().wrap(function(T) {
          for (; ; ) switch (T.prev = T.next) {
            case 0:
              if (a.mounted) {
                T.next = 2;
                break;
              }
              return T.abrupt("return", []);
            case 2:
              if (b = a.props, h = b.validateFirst, C = h === void 0 ? !1 : h, _ = b.messageVariables, S = b.validateDebounce, $ = a.getRules(), f && ($ = $.filter(function(O) {
                return O;
              }).filter(function(O) {
                var M = O.validateTrigger;
                if (!M)
                  return !0;
                var I = Gi(M);
                return I.includes(f);
              })), !(S && f)) {
                T.next = 10;
                break;
              }
              return T.next = 8, new Promise(function(O) {
                setTimeout(O, S);
              });
            case 8:
              if (a.validatePromise === m) {
                T.next = 10;
                break;
              }
              return T.abrupt("return", []);
            case 10:
              return x = r0(c, u, $, l, C, _), x.catch(function(O) {
                return O;
              }).then(function() {
                var O = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : wr;
                if (a.validatePromise === m) {
                  var M;
                  a.validatePromise = null;
                  var I = [], F = [];
                  (M = O.forEach) === null || M === void 0 || M.call(O, function(A) {
                    var V = A.rule.warningOnly, D = A.errors, z = D === void 0 ? wr : D;
                    V ? F.push.apply(F, X(z)) : I.push.apply(I, X(z));
                  }), a.errors = I, a.warnings = F, a.triggerMetaEvent(), a.reRender();
                }
              }), T.abrupt("return", x);
            case 13:
            case "end":
              return T.stop();
          }
        }, v);
      })));
      return y || (a.validatePromise = m, a.dirty = !0, a.errors = wr, a.warnings = wr, a.triggerMetaEvent(), a.reRender()), m;
    }), w(ie(a), "isFieldValidating", function() {
      return !!a.validatePromise;
    }), w(ie(a), "isFieldTouched", function() {
      return a.touched;
    }), w(ie(a), "isFieldDirty", function() {
      if (a.dirty || a.props.initialValue !== void 0)
        return !0;
      var l = a.props.fieldContext, c = l.getInternalHooks(et), u = c.getInitialValue;
      return u(a.getNamePath()) !== void 0;
    }), w(ie(a), "getErrors", function() {
      return a.errors;
    }), w(ie(a), "getWarnings", function() {
      return a.warnings;
    }), w(ie(a), "isListField", function() {
      return a.props.isListField;
    }), w(ie(a), "isList", function() {
      return a.props.isList;
    }), w(ie(a), "isPreserve", function() {
      return a.props.preserve;
    }), w(ie(a), "getMeta", function() {
      a.prevValidating = a.isFieldValidating();
      var l = {
        touched: a.isFieldTouched(),
        validating: a.prevValidating,
        errors: a.errors,
        warnings: a.warnings,
        name: a.getNamePath(),
        validated: a.validatePromise === null
      };
      return l;
    }), w(ie(a), "getOnlyChild", function(l) {
      if (typeof l == "function") {
        var c = a.getMeta();
        return j(j({}, a.getOnlyChild(l(a.getControlled(), c, a.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var u = Qn(l);
      return u.length !== 1 || !/* @__PURE__ */ E.isValidElement(u[0]) ? {
        child: u,
        isFunction: !1
      } : {
        child: u[0],
        isFunction: !1
      };
    }), w(ie(a), "getValue", function(l) {
      var c = a.props.fieldContext.getFieldsValue, u = a.getNamePath();
      return kr(l || c(!0), u);
    }), w(ie(a), "getControlled", function() {
      var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, c = a.props, u = c.name, d = c.trigger, f = c.validateTrigger, p = c.getValueFromEvent, y = c.normalize, m = c.valuePropName, v = c.getValueProps, b = c.fieldContext, h = f !== void 0 ? f : b.validateTrigger, C = a.getNamePath(), _ = b.getInternalHooks, S = b.getFieldsValue, $ = _(et), x = $.dispatch, R = a.getValue(), T = v || function(A) {
        return w({}, m, A);
      }, O = l[d], M = u !== void 0 ? T(R) : {};
      process.env.NODE_ENV !== "production" && M && Object.keys(M).forEach(function(A) {
        Ie(typeof M[A] != "function", "It's not recommended to generate dynamic function prop by `getValueProps`. Please pass it to child component directly (prop: ".concat(A, ")"));
      });
      var I = j(j({}, l), M);
      I[d] = function() {
        a.touched = !0, a.dirty = !0, a.triggerMetaEvent();
        for (var A, V = arguments.length, D = new Array(V), z = 0; z < V; z++)
          D[z] = arguments[z];
        p ? A = p.apply(void 0, D) : A = i0.apply(void 0, [m].concat(D)), y && (A = y(A, R, S(!0))), A !== R && x({
          type: "updateValue",
          namePath: C,
          value: A
        }), O && O.apply(void 0, D);
      };
      var F = Gi(h || []);
      return F.forEach(function(A) {
        var V = I[A];
        I[A] = function() {
          V && V.apply(void 0, arguments);
          var D = a.props.rules;
          D && D.length && x({
            type: "validateField",
            namePath: C,
            triggerName: A
          });
        };
      }), I;
    }), n.fieldContext) {
      var i = n.fieldContext.getInternalHooks, o = i(et), s = o.initEntityValue;
      s(ie(a));
    }
    return a;
  }
  return rr(t, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props, i = a.shouldUpdate, o = a.fieldContext;
      if (this.mounted = !0, o) {
        var s = o.getInternalHooks, l = s(et), c = l.registerField;
        this.cancelRegisterFunc = c(this);
      }
      i === !0 && this.reRender();
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
      var a = this.state.resetCount, i = this.props.children, o = this.getOnlyChild(i), s = o.child, l = o.isFunction, c;
      return l ? c = s : /* @__PURE__ */ E.isValidElement(s) ? c = /* @__PURE__ */ E.cloneElement(s, this.getControlled(s.props)) : (Ie(!s, "`children` of Field is not validate ReactElement."), c = s), /* @__PURE__ */ E.createElement(E.Fragment, {
        key: a
      }, c);
    }
  }]), t;
}(E.Component);
w(Lo, "contextType", _t);
w(Lo, "defaultProps", {
  trigger: "onChange",
  valuePropName: "value"
});
function Vd(e) {
  var r, t = e.name, n = $r(e, o0), a = E.useContext(_t), i = E.useContext(ta), o = t !== void 0 ? He(t) : void 0, s = (r = n.isListField) !== null && r !== void 0 ? r : !!i, l = "keep";
  return s || (l = "_".concat((o || []).join("_"))), process.env.NODE_ENV !== "production" && n.preserve === !1 && s && o.length <= 1 && Ie(!1, "`preserve` should not apply on Form.List fields."), /* @__PURE__ */ E.createElement(Lo, P({
    key: l,
    name: o,
    isListField: s
  }, n, {
    fieldContext: a
  }));
}
function s0(e) {
  var r = e.name, t = e.initialValue, n = e.children, a = e.rules, i = e.validateTrigger, o = e.isListField, s = E.useContext(_t), l = E.useContext(ta), c = E.useRef({
    keys: [],
    id: 0
  }), u = c.current, d = E.useMemo(function() {
    var m = He(s.prefixName) || [];
    return [].concat(X(m), X(He(r)));
  }, [s.prefixName, r]), f = E.useMemo(function() {
    return j(j({}, s), {}, {
      prefixName: d
    });
  }, [s, d]), p = E.useMemo(function() {
    return {
      getKey: function(v) {
        var b = d.length, h = v[b];
        return [u.keys[h], v.slice(b + 1)];
      }
    };
  }, [d]);
  if (typeof n != "function")
    return Ie(!1, "Form.List only accepts function as children."), null;
  var y = function(v, b, h) {
    var C = h.source;
    return C === "internal" ? !1 : v !== b;
  };
  return /* @__PURE__ */ E.createElement(ta.Provider, {
    value: p
  }, /* @__PURE__ */ E.createElement(_t.Provider, {
    value: f
  }, /* @__PURE__ */ E.createElement(Vd, {
    name: [],
    shouldUpdate: y,
    rules: a,
    validateTrigger: i,
    initialValue: t,
    isList: !0,
    isListField: o ?? !!l
  }, function(m, v) {
    var b = m.value, h = b === void 0 ? [] : b, C = m.onChange, _ = s.getFieldValue, S = function() {
      var T = _(d || []);
      return T || [];
    }, $ = {
      add: function(T, O) {
        var M = S();
        O >= 0 && O <= M.length ? (u.keys = [].concat(X(u.keys.slice(0, O)), [u.id], X(u.keys.slice(O))), C([].concat(X(M.slice(0, O)), [T], X(M.slice(O))))) : (process.env.NODE_ENV !== "production" && (O < 0 || O > M.length) && Ie(!1, "The second parameter of the add function should be a valid positive number."), u.keys = [].concat(X(u.keys), [u.id]), C([].concat(X(M), [T]))), u.id += 1;
      },
      remove: function(T) {
        var O = S(), M = new Set(Array.isArray(T) ? T : [T]);
        M.size <= 0 || (u.keys = u.keys.filter(function(I, F) {
          return !M.has(F);
        }), C(O.filter(function(I, F) {
          return !M.has(F);
        })));
      },
      move: function(T, O) {
        if (T !== O) {
          var M = S();
          T < 0 || T >= M.length || O < 0 || O >= M.length || (u.keys = tl(u.keys, T, O), C(tl(M, T, O)));
        }
      }
    }, x = h || [];
    return Array.isArray(x) || (x = [], process.env.NODE_ENV !== "production" && Ie(!1, "Current value of '".concat(d.join(" > "), "' is not an array type."))), n(x.map(function(R, T) {
      var O = u.keys[T];
      return O === void 0 && (u.keys[T] = u.id, O = u.keys[T], u.id += 1), {
        name: T,
        key: O,
        isListField: !0
      };
    }), $, v);
  })));
}
function l0(e) {
  var r = !1, t = e.length, n = [];
  return e.length ? new Promise(function(a, i) {
    e.forEach(function(o, s) {
      o.catch(function(l) {
        return r = !0, l;
      }).then(function(l) {
        t -= 1, n[s] = l, !(t > 0) && (r && i(n), a(n));
      });
    });
  }) : Promise.resolve([]);
}
var Id = "__@field_split__";
function si(e) {
  return e.map(function(r) {
    return "".concat(Z(r), ":").concat(r);
  }).join(Id);
}
var pt = /* @__PURE__ */ function() {
  function e() {
    er(this, e), w(this, "kvs", /* @__PURE__ */ new Map());
  }
  return rr(e, [{
    key: "set",
    value: function(t, n) {
      this.kvs.set(si(t), n);
    }
  }, {
    key: "get",
    value: function(t) {
      return this.kvs.get(si(t));
    }
  }, {
    key: "update",
    value: function(t, n) {
      var a = this.get(t), i = n(a);
      i ? this.set(t, i) : this.delete(t);
    }
  }, {
    key: "delete",
    value: function(t) {
      this.kvs.delete(si(t));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(t) {
      return X(this.kvs.entries()).map(function(n) {
        var a = W(n, 2), i = a[0], o = a[1], s = i.split(Id);
        return t({
          key: s.map(function(l) {
            var c = l.match(/^([^:]*):(.*)$/), u = W(c, 3), d = u[1], f = u[2];
            return d === "number" ? Number(f) : f;
          }),
          value: o
        });
      });
    }
  }, {
    key: "toJSON",
    value: function() {
      var t = {};
      return this.map(function(n) {
        var a = n.key, i = n.value;
        return t[a.join(".")] = i, null;
      }), t;
    }
  }]), e;
}(), c0 = ["name"], u0 = /* @__PURE__ */ rr(function e(r) {
  var t = this;
  er(this, e), w(this, "formHooked", !1), w(this, "forceRootUpdate", void 0), w(this, "subscribable", !0), w(this, "store", {}), w(this, "fieldEntities", []), w(this, "initialValues", {}), w(this, "callbacks", {}), w(this, "validateMessages", null), w(this, "preserve", null), w(this, "lastValidatePromise", null), w(this, "getForm", function() {
    return {
      getFieldValue: t.getFieldValue,
      getFieldsValue: t.getFieldsValue,
      getFieldError: t.getFieldError,
      getFieldWarning: t.getFieldWarning,
      getFieldsError: t.getFieldsError,
      isFieldsTouched: t.isFieldsTouched,
      isFieldTouched: t.isFieldTouched,
      isFieldValidating: t.isFieldValidating,
      isFieldsValidating: t.isFieldsValidating,
      resetFields: t.resetFields,
      setFields: t.setFields,
      setFieldValue: t.setFieldValue,
      setFieldsValue: t.setFieldsValue,
      validateFields: t.validateFields,
      submit: t.submit,
      _init: !0,
      getInternalHooks: t.getInternalHooks
    };
  }), w(this, "getInternalHooks", function(n) {
    return n === et ? (t.formHooked = !0, {
      dispatch: t.dispatch,
      initEntityValue: t.initEntityValue,
      registerField: t.registerField,
      useSubscribe: t.useSubscribe,
      setInitialValues: t.setInitialValues,
      destroyForm: t.destroyForm,
      setCallbacks: t.setCallbacks,
      setValidateMessages: t.setValidateMessages,
      getFields: t.getFields,
      setPreserve: t.setPreserve,
      getInitialValue: t.getInitialValue,
      registerWatch: t.registerWatch
    }) : (Ie(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }), w(this, "useSubscribe", function(n) {
    t.subscribable = n;
  }), w(this, "prevWithoutPreserves", null), w(this, "setInitialValues", function(n, a) {
    if (t.initialValues = n || {}, a) {
      var i, o = mt(n, t.store);
      (i = t.prevWithoutPreserves) === null || i === void 0 || i.map(function(s) {
        var l = s.key;
        o = Tr(o, l, kr(n, l));
      }), t.prevWithoutPreserves = null, t.updateStore(o);
    }
  }), w(this, "destroyForm", function(n) {
    if (n)
      t.updateStore({});
    else {
      var a = new pt();
      t.getFieldEntities(!0).forEach(function(i) {
        t.isMergedPreserve(i.isPreserve()) || a.set(i.getNamePath(), !0);
      }), t.prevWithoutPreserves = a;
    }
  }), w(this, "getInitialValue", function(n) {
    var a = kr(t.initialValues, n);
    return n.length ? mt(a) : a;
  }), w(this, "setCallbacks", function(n) {
    t.callbacks = n;
  }), w(this, "setValidateMessages", function(n) {
    t.validateMessages = n;
  }), w(this, "setPreserve", function(n) {
    t.preserve = n;
  }), w(this, "watchList", []), w(this, "registerWatch", function(n) {
    return t.watchList.push(n), function() {
      t.watchList = t.watchList.filter(function(a) {
        return a !== n;
      });
    };
  }), w(this, "notifyWatch", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (t.watchList.length) {
      var a = t.getFieldsValue(), i = t.getFieldsValue(!0);
      t.watchList.forEach(function(o) {
        o(a, i, n);
      });
    }
  }), w(this, "timeoutId", null), w(this, "warningUnhooked", function() {
    process.env.NODE_ENV !== "production" && !t.timeoutId && typeof window < "u" && (t.timeoutId = setTimeout(function() {
      t.timeoutId = null, t.formHooked || Ie(!1, "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?");
    }));
  }), w(this, "updateStore", function(n) {
    t.store = n;
  }), w(this, "getFieldEntities", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    return n ? t.fieldEntities.filter(function(a) {
      return a.getNamePath().length;
    }) : t.fieldEntities;
  }), w(this, "getFieldsMap", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, a = new pt();
    return t.getFieldEntities(n).forEach(function(i) {
      var o = i.getNamePath();
      a.set(o, i);
    }), a;
  }), w(this, "getFieldEntitiesForNamePathList", function(n) {
    if (!n)
      return t.getFieldEntities(!0);
    var a = t.getFieldsMap(!0);
    return n.map(function(i) {
      var o = He(i);
      return a.get(o) || {
        INVALIDATE_NAME_PATH: He(i)
      };
    });
  }), w(this, "getFieldsValue", function(n, a) {
    t.warningUnhooked();
    var i, o, s;
    if (n === !0 || Array.isArray(n) ? (i = n, o = a) : n && Z(n) === "object" && (s = n.strict, o = n.filter), i === !0 && !o)
      return t.store;
    var l = t.getFieldEntitiesForNamePathList(Array.isArray(i) ? i : null), c = [];
    return l.forEach(function(u) {
      var d, f, p = "INVALIDATE_NAME_PATH" in u ? u.INVALIDATE_NAME_PATH : u.getNamePath();
      if (s) {
        var y, m;
        if ((y = (m = u).isList) !== null && y !== void 0 && y.call(m))
          return;
      } else if (!i && (d = (f = u).isListField) !== null && d !== void 0 && d.call(f))
        return;
      if (!o)
        c.push(p);
      else {
        var v = "getMeta" in u ? u.getMeta() : null;
        o(v) && c.push(p);
      }
    }), rl(t.store, c.map(He));
  }), w(this, "getFieldValue", function(n) {
    t.warningUnhooked();
    var a = He(n);
    return kr(t.store, a);
  }), w(this, "getFieldsError", function(n) {
    t.warningUnhooked();
    var a = t.getFieldEntitiesForNamePathList(n);
    return a.map(function(i, o) {
      return i && !("INVALIDATE_NAME_PATH" in i) ? {
        name: i.getNamePath(),
        errors: i.getErrors(),
        warnings: i.getWarnings()
      } : {
        name: He(n[o]),
        errors: [],
        warnings: []
      };
    });
  }), w(this, "getFieldError", function(n) {
    t.warningUnhooked();
    var a = He(n), i = t.getFieldsError([a])[0];
    return i.errors;
  }), w(this, "getFieldWarning", function(n) {
    t.warningUnhooked();
    var a = He(n), i = t.getFieldsError([a])[0];
    return i.warnings;
  }), w(this, "isFieldsTouched", function() {
    t.warningUnhooked();
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a[0], s = a[1], l, c = !1;
    a.length === 0 ? l = null : a.length === 1 ? Array.isArray(o) ? (l = o.map(He), c = !1) : (l = null, c = o) : (l = o.map(He), c = s);
    var u = t.getFieldEntities(!0), d = function(v) {
      return v.isFieldTouched();
    };
    if (!l)
      return c ? u.every(function(m) {
        return d(m) || m.isList();
      }) : u.some(d);
    var f = new pt();
    l.forEach(function(m) {
      f.set(m, []);
    }), u.forEach(function(m) {
      var v = m.getNamePath();
      l.forEach(function(b) {
        b.every(function(h, C) {
          return v[C] === h;
        }) && f.update(b, function(h) {
          return [].concat(X(h), [m]);
        });
      });
    });
    var p = function(v) {
      return v.some(d);
    }, y = f.map(function(m) {
      var v = m.value;
      return v;
    });
    return c ? y.every(p) : y.some(p);
  }), w(this, "isFieldTouched", function(n) {
    return t.warningUnhooked(), t.isFieldsTouched([n]);
  }), w(this, "isFieldsValidating", function(n) {
    t.warningUnhooked();
    var a = t.getFieldEntities();
    if (!n)
      return a.some(function(o) {
        return o.isFieldValidating();
      });
    var i = n.map(He);
    return a.some(function(o) {
      var s = o.getNamePath();
      return bt(i, s) && o.isFieldValidating();
    });
  }), w(this, "isFieldValidating", function(n) {
    return t.warningUnhooked(), t.isFieldsValidating([n]);
  }), w(this, "resetWithFieldInitialValue", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = new pt(), i = t.getFieldEntities(!0);
    i.forEach(function(l) {
      var c = l.props.initialValue, u = l.getNamePath();
      if (c !== void 0) {
        var d = a.get(u) || /* @__PURE__ */ new Set();
        d.add({
          entity: l,
          value: c
        }), a.set(u, d);
      }
    });
    var o = function(c) {
      c.forEach(function(u) {
        var d = u.props.initialValue;
        if (d !== void 0) {
          var f = u.getNamePath(), p = t.getInitialValue(f);
          if (p !== void 0)
            Ie(!1, "Form already set 'initialValues' with path '".concat(f.join("."), "'. Field can not overwrite it."));
          else {
            var y = a.get(f);
            if (y && y.size > 1)
              Ie(!1, "Multiple Field with path '".concat(f.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (y) {
              var m = t.getFieldValue(f), v = u.isListField();
              !v && (!n.skipExist || m === void 0) && t.updateStore(Tr(t.store, f, X(y)[0].value));
            }
          }
        }
      });
    }, s;
    n.entities ? s = n.entities : n.namePathList ? (s = [], n.namePathList.forEach(function(l) {
      var c = a.get(l);
      if (c) {
        var u;
        (u = s).push.apply(u, X(X(c).map(function(d) {
          return d.entity;
        })));
      }
    })) : s = i, o(s);
  }), w(this, "resetFields", function(n) {
    t.warningUnhooked();
    var a = t.store;
    if (!n) {
      t.updateStore(mt(t.initialValues)), t.resetWithFieldInitialValue(), t.notifyObservers(a, null, {
        type: "reset"
      }), t.notifyWatch();
      return;
    }
    var i = n.map(He);
    i.forEach(function(o) {
      var s = t.getInitialValue(o);
      t.updateStore(Tr(t.store, o, s));
    }), t.resetWithFieldInitialValue({
      namePathList: i
    }), t.notifyObservers(a, i, {
      type: "reset"
    }), t.notifyWatch(i);
  }), w(this, "setFields", function(n) {
    t.warningUnhooked();
    var a = t.store, i = [];
    n.forEach(function(o) {
      var s = o.name, l = $r(o, c0), c = He(s);
      i.push(c), "value" in l && t.updateStore(Tr(t.store, c, l.value)), t.notifyObservers(a, [c], {
        type: "setField",
        data: o
      });
    }), t.notifyWatch(i);
  }), w(this, "getFields", function() {
    var n = t.getFieldEntities(!0), a = n.map(function(i) {
      var o = i.getNamePath(), s = i.getMeta(), l = j(j({}, s), {}, {
        name: o,
        value: t.getFieldValue(o)
      });
      return Object.defineProperty(l, "originRCField", {
        value: !0
      }), l;
    });
    return a;
  }), w(this, "initEntityValue", function(n) {
    var a = n.props.initialValue;
    if (a !== void 0) {
      var i = n.getNamePath(), o = kr(t.store, i);
      o === void 0 && t.updateStore(Tr(t.store, i, a));
    }
  }), w(this, "isMergedPreserve", function(n) {
    var a = n !== void 0 ? n : t.preserve;
    return a ?? !0;
  }), w(this, "registerField", function(n) {
    t.fieldEntities.push(n);
    var a = n.getNamePath();
    if (t.notifyWatch([a]), n.props.initialValue !== void 0) {
      var i = t.store;
      t.resetWithFieldInitialValue({
        entities: [n],
        skipExist: !0
      }), t.notifyObservers(i, [n.getNamePath()], {
        type: "valueUpdate",
        source: "internal"
      });
    }
    return function(o, s) {
      var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      if (t.fieldEntities = t.fieldEntities.filter(function(d) {
        return d !== n;
      }), !t.isMergedPreserve(s) && (!o || l.length > 1)) {
        var c = o ? void 0 : t.getInitialValue(a);
        if (a.length && t.getFieldValue(a) !== c && t.fieldEntities.every(function(d) {
          return (
            // Only reset when no namePath exist
            !kd(d.getNamePath(), a)
          );
        })) {
          var u = t.store;
          t.updateStore(Tr(u, a, c, !0)), t.notifyObservers(u, [a], {
            type: "remove"
          }), t.triggerDependenciesUpdate(u, a);
        }
      }
      t.notifyWatch([a]);
    };
  }), w(this, "dispatch", function(n) {
    switch (n.type) {
      case "updateValue": {
        var a = n.namePath, i = n.value;
        t.updateValue(a, i);
        break;
      }
      case "validateField": {
        var o = n.namePath, s = n.triggerName;
        t.validateFields([o], {
          triggerName: s
        });
        break;
      }
    }
  }), w(this, "notifyObservers", function(n, a, i) {
    if (t.subscribable) {
      var o = j(j({}, i), {}, {
        store: t.getFieldsValue(!0)
      });
      t.getFieldEntities().forEach(function(s) {
        var l = s.onStoreChange;
        l(n, a, o);
      });
    } else
      t.forceRootUpdate();
  }), w(this, "triggerDependenciesUpdate", function(n, a) {
    var i = t.getDependencyChildrenFields(a);
    return i.length && t.validateFields(i), t.notifyObservers(n, i, {
      type: "dependenciesUpdate",
      relatedFields: [a].concat(X(i))
    }), i;
  }), w(this, "updateValue", function(n, a) {
    var i = He(n), o = t.store;
    t.updateStore(Tr(t.store, i, a)), t.notifyObservers(o, [i], {
      type: "valueUpdate",
      source: "internal"
    }), t.notifyWatch([i]);
    var s = t.triggerDependenciesUpdate(o, i), l = t.callbacks.onValuesChange;
    if (l) {
      var c = rl(t.store, [i]);
      l(c, t.getFieldsValue());
    }
    t.triggerOnFieldsChange([i].concat(X(s)));
  }), w(this, "setFieldsValue", function(n) {
    t.warningUnhooked();
    var a = t.store;
    if (n) {
      var i = mt(t.store, n);
      t.updateStore(i);
    }
    t.notifyObservers(a, null, {
      type: "valueUpdate",
      source: "external"
    }), t.notifyWatch();
  }), w(this, "setFieldValue", function(n, a) {
    t.setFields([{
      name: n,
      value: a,
      errors: [],
      warnings: []
    }]);
  }), w(this, "getDependencyChildrenFields", function(n) {
    var a = /* @__PURE__ */ new Set(), i = [], o = new pt();
    t.getFieldEntities().forEach(function(l) {
      var c = l.props.dependencies;
      (c || []).forEach(function(u) {
        var d = He(u);
        o.update(d, function() {
          var f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          return f.add(l), f;
        });
      });
    });
    var s = function l(c) {
      var u = o.get(c) || /* @__PURE__ */ new Set();
      u.forEach(function(d) {
        if (!a.has(d)) {
          a.add(d);
          var f = d.getNamePath();
          d.isFieldDirty() && f.length && (i.push(f), l(f));
        }
      });
    };
    return s(n), i;
  }), w(this, "triggerOnFieldsChange", function(n, a) {
    var i = t.callbacks.onFieldsChange;
    if (i) {
      var o = t.getFields();
      if (a) {
        var s = new pt();
        a.forEach(function(c) {
          var u = c.name, d = c.errors;
          s.set(u, d);
        }), o.forEach(function(c) {
          c.errors = s.get(c.name) || c.errors;
        });
      }
      var l = o.filter(function(c) {
        var u = c.name;
        return bt(n, u);
      });
      l.length && i(l, o);
    }
  }), w(this, "validateFields", function(n, a) {
    t.warningUnhooked();
    var i, o;
    Array.isArray(n) || typeof n == "string" || typeof a == "string" ? (i = n, o = a) : o = n;
    var s = !!i, l = s ? i.map(He) : [], c = [], u = String(Date.now()), d = /* @__PURE__ */ new Set(), f = o || {}, p = f.recursive, y = f.dirty;
    t.getFieldEntities(!0).forEach(function(h) {
      if (s || l.push(h.getNamePath()), !(!h.props.rules || !h.props.rules.length) && !(y && !h.isFieldDirty())) {
        var C = h.getNamePath();
        if (d.add(C.join(u)), !s || bt(l, C, p)) {
          var _ = h.validateRules(j({
            validateMessages: j(j({}, Md), t.validateMessages)
          }, o));
          c.push(_.then(function() {
            return {
              name: C,
              errors: [],
              warnings: []
            };
          }).catch(function(S) {
            var $, x = [], R = [];
            return ($ = S.forEach) === null || $ === void 0 || $.call(S, function(T) {
              var O = T.rule.warningOnly, M = T.errors;
              O ? R.push.apply(R, X(M)) : x.push.apply(x, X(M));
            }), x.length ? Promise.reject({
              name: C,
              errors: x,
              warnings: R
            }) : {
              name: C,
              errors: x,
              warnings: R
            };
          }));
        }
      }
    });
    var m = l0(c);
    t.lastValidatePromise = m, m.catch(function(h) {
      return h;
    }).then(function(h) {
      var C = h.map(function(_) {
        var S = _.name;
        return S;
      });
      t.notifyObservers(t.store, C, {
        type: "validateFinish"
      }), t.triggerOnFieldsChange(C, h);
    });
    var v = m.then(function() {
      return t.lastValidatePromise === m ? Promise.resolve(t.getFieldsValue(l)) : Promise.reject([]);
    }).catch(function(h) {
      var C = h.filter(function(_) {
        return _ && _.errors.length;
      });
      return Promise.reject({
        values: t.getFieldsValue(l),
        errorFields: C,
        outOfDate: t.lastValidatePromise !== m
      });
    });
    v.catch(function(h) {
      return h;
    });
    var b = l.filter(function(h) {
      return d.has(h.join(u));
    });
    return t.triggerOnFieldsChange(b), v;
  }), w(this, "submit", function() {
    t.warningUnhooked(), t.validateFields().then(function(n) {
      var a = t.callbacks.onFinish;
      if (a)
        try {
          a(n);
        } catch (i) {
          console.error(i);
        }
    }).catch(function(n) {
      var a = t.callbacks.onFinishFailed;
      a && a(n);
    });
  }), this.forceRootUpdate = r;
});
function Dd(e) {
  var r = E.useRef(), t = E.useState({}), n = W(t, 2), a = n[1];
  if (!r.current)
    if (e)
      r.current = e;
    else {
      var i = function() {
        a({});
      }, o = new u0(i);
      r.current = o.getForm();
    }
  return [r.current];
}
var ao = /* @__PURE__ */ E.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), d0 = function(r) {
  var t = r.validateMessages, n = r.onFormChange, a = r.onFormFinish, i = r.children, o = E.useContext(ao), s = E.useRef({});
  return /* @__PURE__ */ E.createElement(ao.Provider, {
    value: j(j({}, o), {}, {
      validateMessages: j(j({}, o.validateMessages), t),
      // =========================================================
      // =                  Global Form Control                  =
      // =========================================================
      triggerFormChange: function(c, u) {
        n && n(c, {
          changedFields: u,
          forms: s.current
        }), o.triggerFormChange(c, u);
      },
      triggerFormFinish: function(c, u) {
        a && a(c, {
          values: u,
          forms: s.current
        }), o.triggerFormFinish(c, u);
      },
      registerForm: function(c, u) {
        c && (s.current = j(j({}, s.current), {}, w({}, c, u))), o.registerForm(c, u);
      },
      unregisterForm: function(c) {
        var u = j({}, s.current);
        delete u[c], s.current = u, o.unregisterForm(c);
      }
    })
  }, i);
}, f0 = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed", "clearOnDestroy"], v0 = function(r, t) {
  var n = r.name, a = r.initialValues, i = r.fields, o = r.form, s = r.preserve, l = r.children, c = r.component, u = c === void 0 ? "form" : c, d = r.validateMessages, f = r.validateTrigger, p = f === void 0 ? "onChange" : f, y = r.onValuesChange, m = r.onFieldsChange, v = r.onFinish, b = r.onFinishFailed, h = r.clearOnDestroy, C = $r(r, f0), _ = E.useRef(null), S = E.useContext(ao), $ = Dd(o), x = W($, 1), R = x[0], T = R.getInternalHooks(et), O = T.useSubscribe, M = T.setInitialValues, I = T.setCallbacks, F = T.setValidateMessages, A = T.setPreserve, V = T.destroyForm;
  E.useImperativeHandle(t, function() {
    return j(j({}, R), {}, {
      nativeElement: _.current
    });
  }), E.useEffect(function() {
    return S.registerForm(n, R), function() {
      S.unregisterForm(n);
    };
  }, [S, R, n]), F(j(j({}, S.validateMessages), d)), I({
    onValuesChange: y,
    onFieldsChange: function(Y) {
      if (S.triggerFormChange(n, Y), m) {
        for (var pe = arguments.length, se = new Array(pe > 1 ? pe - 1 : 0), he = 1; he < pe; he++)
          se[he - 1] = arguments[he];
        m.apply(void 0, [Y].concat(se));
      }
    },
    onFinish: function(Y) {
      S.triggerFormFinish(n, Y), v && v(Y);
    },
    onFinishFailed: b
  }), A(s);
  var D = E.useRef(null);
  M(a, !D.current), D.current || (D.current = !0), E.useEffect(
    function() {
      return function() {
        return V(h);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var z, H = typeof l == "function";
  if (H) {
    var ee = R.getFieldsValue(!0);
    z = l(ee, R);
  } else
    z = l;
  O(!H);
  var Q = E.useRef();
  E.useEffect(function() {
    a0(Q.current || [], i || []) || R.setFields(i || []), Q.current = i;
  }, [i, R]);
  var re = E.useMemo(function() {
    return j(j({}, R), {}, {
      validateTrigger: p
    });
  }, [R, p]), q = /* @__PURE__ */ E.createElement(ta.Provider, {
    value: null
  }, /* @__PURE__ */ E.createElement(_t.Provider, {
    value: re
  }, z));
  return u === !1 ? q : /* @__PURE__ */ E.createElement(u, P({}, C, {
    ref: _,
    onSubmit: function(Y) {
      Y.preventDefault(), Y.stopPropagation(), R.submit();
    },
    onReset: function(Y) {
      var pe;
      Y.preventDefault(), R.resetFields(), (pe = C.onReset) === null || pe === void 0 || pe.call(C, Y);
    }
  }), q);
};
function nl(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
var p0 = process.env.NODE_ENV !== "production" ? function(e) {
  var r = e.join("__RC_FIELD_FORM_SPLIT__"), t = Ae(r);
  Ie(t.current === r, "`useWatch` is not support dynamic `namePath`. Please provide static instead.");
} : function() {
};
function m0() {
  for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
    r[t] = arguments[t];
  var n = r[0], a = r[1], i = a === void 0 ? {} : a, o = Eb(i) ? {
    form: i
  } : i, s = o.form, l = Yt(), c = W(l, 2), u = c[0], d = c[1], f = ul(function() {
    return nl(u);
  }, [u]), p = Ae(f);
  p.current = f;
  var y = Ue(_t), m = s || y, v = m && m._init;
  process.env.NODE_ENV !== "production" && Ie(r.length === 2 ? s ? v : !0 : v, "useWatch requires a form instance since it can not auto detect from context.");
  var b = He(n), h = Ae(b);
  return h.current = b, p0(b), Je(
    function() {
      if (v) {
        var C = m.getFieldsValue, _ = m.getInternalHooks, S = _(et), $ = S.registerWatch, x = function(M, I) {
          var F = o.preserve ? I : M;
          return typeof n == "function" ? n(F) : kr(F, h.current);
        }, R = $(function(O, M) {
          var I = x(O, M), F = nl(I);
          p.current !== F && (p.current = F, d(I));
        }), T = x(C(), C(!0));
        return u !== T && d(T), R;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [v]
  ), u;
}
var h0 = /* @__PURE__ */ E.forwardRef(v0), wn = h0;
wn.FormProvider = d0;
wn.Field = Vd;
wn.List = s0;
wn.useForm = Dd;
wn.useWatch = m0;
const an = /* @__PURE__ */ E.createContext({});
process.env.NODE_ENV !== "production" && (an.displayName = "FormItemInputContext");
const g0 = ({
  children: e,
  status: r,
  override: t
}) => {
  const n = E.useContext(an), a = E.useMemo(() => {
    const i = Object.assign({}, n);
    return t && delete i.isFormItemInput, r && (delete i.status, delete i.hasFeedback, delete i.feedbackIcon), i;
  }, [r, t, n]);
  return /* @__PURE__ */ E.createElement(an.Provider, {
    value: a
  }, e);
}, y0 = /* @__PURE__ */ E.createContext(void 0), Ld = (e, r, t = void 0) => {
  var n, a;
  const {
    variant: i,
    [e]: o
  } = E.useContext(Kr), s = E.useContext(y0), l = o == null ? void 0 : o.variant;
  let c;
  typeof r < "u" ? c = r : t === !1 ? c = "borderless" : c = (a = (n = s ?? l) !== null && n !== void 0 ? n : i) !== null && a !== void 0 ? a : "outlined";
  const u = nh.includes(c);
  return [c, u];
}, al = (e) => {
  const {
    space: r,
    form: t,
    children: n
  } = e;
  if (n == null)
    return null;
  let a = n;
  return t && (a = /* @__PURE__ */ J.createElement(g0, {
    override: !0,
    status: !0
  }, a)), r && (a = /* @__PURE__ */ J.createElement(hg, null, a)), a;
};
function b0(e, r) {
  const t = Ae([]), n = () => {
    t.current.push(setTimeout(() => {
      var a, i, o, s;
      !((a = e.current) === null || a === void 0) && a.input && ((i = e.current) === null || i === void 0 ? void 0 : i.input.getAttribute("type")) === "password" && (!((o = e.current) === null || o === void 0) && o.input.hasAttribute("value")) && ((s = e.current) === null || s === void 0 || s.input.removeAttribute("value"));
    }));
  };
  return Je(() => (n(), () => t.current.forEach((a) => {
    a && clearTimeout(a);
  })), []), n;
}
function zo(e) {
  return st(e, {
    inputAffixPadding: e.paddingXXS
  });
}
const Bo = (e) => {
  const {
    controlHeight: r,
    fontSize: t,
    lineHeight: n,
    lineWidth: a,
    controlHeightSM: i,
    controlHeightLG: o,
    fontSizeLG: s,
    lineHeightLG: l,
    paddingSM: c,
    controlPaddingHorizontalSM: u,
    controlPaddingHorizontal: d,
    colorFillAlter: f,
    colorPrimaryHover: p,
    colorPrimary: y,
    controlOutlineWidth: m,
    controlOutline: v,
    colorErrorOutline: b,
    colorWarningOutline: h,
    colorBgContainer: C,
    inputFontSize: _,
    inputFontSizeLG: S,
    inputFontSizeSM: $
  } = e, x = _ || t, R = $ || x, T = S || s, O = Math.round((r - x * n) / 2 * 10) / 10 - a, M = Math.round((i - R * n) / 2 * 10) / 10 - a, I = Math.ceil((o - T * l) / 2 * 10) / 10 - a;
  return {
    paddingBlock: Math.max(O, 0),
    paddingBlockSM: Math.max(M, 0),
    paddingBlockLG: Math.max(I, 0),
    paddingInline: c - a,
    paddingInlineSM: u - a,
    paddingInlineLG: d - a,
    addonBg: f,
    activeBorderColor: y,
    hoverBorderColor: p,
    activeShadow: `0 0 0 ${m}px ${v}`,
    errorActiveShadow: `0 0 0 ${m}px ${b}`,
    warningActiveShadow: `0 0 0 ${m}px ${h}`,
    hoverBg: C,
    activeBg: C,
    inputFontSize: x,
    inputFontSizeLG: T,
    inputFontSizeSM: R
  };
}, x0 = (e) => ({
  borderColor: e.hoverBorderColor,
  backgroundColor: e.hoverBg
}), Ho = (e) => ({
  color: e.colorTextDisabled,
  backgroundColor: e.colorBgContainerDisabled,
  borderColor: e.colorBorder,
  boxShadow: "none",
  cursor: "not-allowed",
  opacity: 1,
  "input[disabled], textarea[disabled]": {
    cursor: "not-allowed"
  },
  "&:hover:not([disabled])": Object.assign({}, x0(st(e, {
    hoverBorderColor: e.colorBorder,
    hoverBg: e.colorBgContainerDisabled
  })))
}), zd = (e, r) => ({
  background: e.colorBgContainer,
  borderWidth: e.lineWidth,
  borderStyle: e.lineType,
  borderColor: r.borderColor,
  "&:hover": {
    borderColor: r.hoverBorderColor,
    backgroundColor: e.hoverBg
  },
  "&:focus, &:focus-within": {
    borderColor: r.activeBorderColor,
    boxShadow: r.activeShadow,
    outline: 0,
    backgroundColor: e.activeBg
  }
}), il = (e, r) => ({
  [`&${e.componentCls}-status-${r.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, zd(e, r)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: r.affixColor
    }
  }),
  [`&${e.componentCls}-status-${r.status}${e.componentCls}-disabled`]: {
    borderColor: r.borderColor
  }
}), S0 = (e, r) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, zd(e, {
    borderColor: e.colorBorder,
    hoverBorderColor: e.hoverBorderColor,
    activeBorderColor: e.activeBorderColor,
    activeShadow: e.activeShadow
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, Ho(e))
  }), il(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), il(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), r)
}), ol = (e, r) => ({
  [`&${e.componentCls}-group-wrapper-status-${r.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      borderColor: r.addonBorderColor,
      color: r.addonColor
    }
  }
}), C0 = (e) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group`]: {
      "&-addon": {
        background: e.addonBg,
        border: `${ze(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
      },
      "&-addon:first-child": {
        borderInlineEnd: 0
      },
      "&-addon:last-child": {
        borderInlineStart: 0
      }
    }
  }, ol(e, {
    status: "error",
    addonBorderColor: e.colorError,
    addonColor: e.colorErrorText
  })), ol(e, {
    status: "warning",
    addonBorderColor: e.colorWarning,
    addonColor: e.colorWarningText
  })), {
    [`&${e.componentCls}-group-wrapper-disabled`]: {
      [`${e.componentCls}-group-addon`]: Object.assign({}, Ho(e))
    }
  })
}), E0 = (e, r) => {
  const {
    componentCls: t
  } = e;
  return {
    "&-borderless": Object.assign({
      background: "transparent",
      border: "none",
      "&:focus, &:focus-within": {
        outline: "none"
      },
      // >>>>> Disabled
      [`&${t}-disabled, &[disabled]`]: {
        color: e.colorTextDisabled,
        cursor: "not-allowed"
      },
      // >>>>> Status
      [`&${t}-status-error`]: {
        "&, & input, & textarea": {
          color: e.colorError
        }
      },
      [`&${t}-status-warning`]: {
        "&, & input, & textarea": {
          color: e.colorWarning
        }
      }
    }, r)
  };
}, Bd = (e, r) => {
  var t;
  return {
    background: r.bg,
    borderWidth: e.lineWidth,
    borderStyle: e.lineType,
    borderColor: "transparent",
    "input&, & input, textarea&, & textarea": {
      color: (t = r == null ? void 0 : r.inputColor) !== null && t !== void 0 ? t : "unset"
    },
    "&:hover": {
      background: r.hoverBg
    },
    "&:focus, &:focus-within": {
      outline: 0,
      borderColor: r.activeBorderColor,
      backgroundColor: e.activeBg
    }
  };
}, sl = (e, r) => ({
  [`&${e.componentCls}-status-${r.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, Bd(e, r)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: r.affixColor
    }
  })
}), w0 = (e, r) => ({
  "&-filled": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Bd(e, {
    bg: e.colorFillTertiary,
    hoverBg: e.colorFillSecondary,
    activeBorderColor: e.activeBorderColor
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, Ho(e))
  }), sl(e, {
    status: "error",
    bg: e.colorErrorBg,
    hoverBg: e.colorErrorBgHover,
    activeBorderColor: e.colorError,
    inputColor: e.colorErrorText,
    affixColor: e.colorError
  })), sl(e, {
    status: "warning",
    bg: e.colorWarningBg,
    hoverBg: e.colorWarningBgHover,
    activeBorderColor: e.colorWarning,
    inputColor: e.colorWarningText,
    affixColor: e.colorWarning
  })), r)
}), ll = (e, r) => ({
  [`&${e.componentCls}-group-wrapper-status-${r.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      background: r.addonBg,
      color: r.addonColor
    }
  }
}), $0 = (e) => ({
  "&-filled": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group-addon`]: {
      background: e.colorFillTertiary,
      "&:last-child": {
        position: "static"
      }
    }
  }, ll(e, {
    status: "error",
    addonBg: e.colorErrorBg,
    addonColor: e.colorErrorText
  })), ll(e, {
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
          borderInlineStart: `${ze(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${ze(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${ze(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        },
        "&-addon:last-child": {
          borderInlineEnd: `${ze(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${ze(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${ze(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        }
      }
    }
  })
}), Hd = (e, r) => ({
  background: e.colorBgContainer,
  borderWidth: `${ze(e.lineWidth)} 0`,
  borderStyle: `${e.lineType} none`,
  borderColor: `transparent transparent ${r.borderColor} transparent`,
  borderRadius: 0,
  "&:hover": {
    borderColor: `transparent transparent ${r.borderColor} transparent`,
    backgroundColor: e.hoverBg
  },
  "&:focus, &:focus-within": {
    borderColor: `transparent transparent ${r.borderColor} transparent`,
    outline: 0,
    backgroundColor: e.activeBg
  }
}), cl = (e, r) => ({
  [`&${e.componentCls}-status-${r.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, Hd(e, r)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: r.affixColor
    }
  }),
  [`&${e.componentCls}-status-${r.status}${e.componentCls}-disabled`]: {
    borderColor: `transparent transparent ${r.borderColor} transparent`
  }
}), _0 = (e, r) => ({
  "&-underlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Hd(e, {
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
  }), cl(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), cl(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), r)
}), R0 = (e) => ({
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
}), Wd = (e) => {
  const {
    paddingBlockLG: r,
    lineHeightLG: t,
    borderRadiusLG: n,
    paddingInlineLG: a
  } = e;
  return {
    padding: `${ze(r)} ${ze(a)}`,
    fontSize: e.inputFontSizeLG,
    lineHeight: t,
    borderRadius: n
  };
}, Ud = (e) => ({
  padding: `${ze(e.paddingBlockSM)} ${ze(e.paddingInlineSM)}`,
  fontSize: e.inputFontSizeSM,
  borderRadius: e.borderRadiusSM
}), qd = (e) => Object.assign(Object.assign({
  position: "relative",
  display: "inline-block",
  width: "100%",
  minWidth: 0,
  padding: `${ze(e.paddingBlock)} ${ze(e.paddingInline)}`,
  color: e.colorText,
  fontSize: e.inputFontSize,
  lineHeight: e.lineHeight,
  borderRadius: e.borderRadius,
  transition: `all ${e.motionDurationMid}`
}, R0(e.colorTextPlaceholder)), {
  // Size
  "&-lg": Object.assign({}, Wd(e)),
  "&-sm": Object.assign({}, Ud(e)),
  // RTL
  "&-rtl, &-textarea-rtl": {
    direction: "rtl"
  }
}), P0 = (e) => {
  const {
    componentCls: r,
    antCls: t
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
    [`&-lg ${r}, &-lg > ${r}-group-addon`]: Object.assign({}, Wd(e)),
    [`&-sm ${r}, &-sm > ${r}-group-addon`]: Object.assign({}, Ud(e)),
    // Fix https://github.com/ant-design/ant-design/issues/5754
    [`&-lg ${t}-select-single ${t}-select-selector`]: {
      height: e.controlHeightLG
    },
    [`&-sm ${t}-select-single ${t}-select-selector`]: {
      height: e.controlHeightSM
    },
    [`> ${r}`]: {
      display: "table-cell",
      "&:not(:first-child):not(:last-child)": {
        borderRadius: 0
      }
    },
    [`${r}-group`]: {
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
        padding: `0 ${ze(e.paddingInline)}`,
        color: e.colorText,
        fontWeight: "normal",
        fontSize: e.inputFontSize,
        textAlign: "center",
        borderRadius: e.borderRadius,
        transition: `all ${e.motionDurationSlow}`,
        lineHeight: 1,
        // Reset Select's style in addon
        [`${t}-select`]: {
          margin: `${ze(e.calc(e.paddingBlock).add(1).mul(-1).equal())} ${ze(e.calc(e.paddingInline).mul(-1).equal())}`,
          [`&${t}-select-single:not(${t}-select-customize-input):not(${t}-pagination-size-changer)`]: {
            [`${t}-select-selector`]: {
              backgroundColor: "inherit",
              border: `${ze(e.lineWidth)} ${e.lineType} transparent`,
              boxShadow: "none"
            }
          }
        },
        // https://github.com/ant-design/ant-design/issues/31333
        [`${t}-cascader-picker`]: {
          margin: `-9px ${ze(e.calc(e.paddingInline).mul(-1).equal())}`,
          backgroundColor: "transparent",
          [`${t}-cascader-input`]: {
            textAlign: "start",
            border: 0,
            boxShadow: "none"
          }
        }
      }
    },
    [r]: {
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
        [`${r}-search-with-button &`]: {
          zIndex: 0
        }
      }
    },
    // Reset rounded corners
    [`> ${r}:first-child, ${r}-group-addon:first-child`]: {
      borderStartEndRadius: 0,
      borderEndEndRadius: 0,
      // Reset Select's style in addon
      [`${t}-select ${t}-select-selector`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`> ${r}-affix-wrapper`]: {
      [`&:not(:first-child) ${r}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      },
      [`&:not(:last-child) ${r}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`> ${r}:last-child, ${r}-group-addon:last-child`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
      // Reset Select's style in addon
      [`${t}-select ${t}-select-selector`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`${r}-affix-wrapper`]: {
      "&:not(:last-child)": {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
        [`${r}-search &`]: {
          borderStartStartRadius: e.borderRadius,
          borderEndStartRadius: e.borderRadius
        }
      },
      [`&:not(:first-child), ${r}-search &:not(:first-child)`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`&${r}-group-compact`]: Object.assign(Object.assign({
      display: "block"
    }, Th()), {
      [`${r}-group-addon, ${r}-group-wrap, > ${r}`]: {
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
        & > ${r}-affix-wrapper,
        & > ${r}-number-affix-wrapper,
        & > ${t}-picker-range
      `]: {
        display: "inline-flex"
      },
      "& > *:not(:last-child)": {
        marginInlineEnd: e.calc(e.lineWidth).mul(-1).equal(),
        borderInlineEndWidth: e.lineWidth
      },
      // Undo float for .ant-input-group .ant-input
      [r]: {
        float: "none"
      },
      // reset border for Select, DatePicker, AutoComplete, Cascader, Mention, TimePicker, Input
      [`& > ${t}-select > ${t}-select-selector,
      & > ${t}-select-auto-complete ${r},
      & > ${t}-cascader-picker ${r},
      & > ${r}-group-wrapper ${r}`]: {
        borderInlineEndWidth: e.lineWidth,
        borderRadius: 0,
        "&:hover, &:focus": {
          zIndex: 1
        }
      },
      [`& > ${t}-select-focused`]: {
        zIndex: 1
      },
      // update z-index for arrow icon
      [`& > ${t}-select > ${t}-select-arrow`]: {
        zIndex: 1
        // https://github.com/ant-design/ant-design/issues/20371
      },
      [`& > *:first-child,
      & > ${t}-select:first-child > ${t}-select-selector,
      & > ${t}-select-auto-complete:first-child ${r},
      & > ${t}-cascader-picker:first-child ${r}`]: {
        borderStartStartRadius: e.borderRadius,
        borderEndStartRadius: e.borderRadius
      },
      [`& > *:last-child,
      & > ${t}-select:last-child > ${t}-select-selector,
      & > ${t}-cascader-picker:last-child ${r},
      & > ${t}-cascader-picker-focused:last-child ${r}`]: {
        borderInlineEndWidth: e.lineWidth,
        borderStartEndRadius: e.borderRadius,
        borderEndEndRadius: e.borderRadius
      },
      // https://github.com/ant-design/ant-design/issues/12493
      [`& > ${t}-select-auto-complete ${r}`]: {
        verticalAlign: "top"
      },
      [`${r}-group-wrapper + ${r}-group-wrapper`]: {
        marginInlineStart: e.calc(e.lineWidth).mul(-1).equal(),
        [`${r}-affix-wrapper`]: {
          borderRadius: 0
        }
      },
      [`${r}-group-wrapper:not(:last-child)`]: {
        [`&${r}-search > ${r}-group`]: {
          [`& > ${r}-group-addon > ${r}-search-button`]: {
            borderRadius: 0
          },
          [`& > ${r}`]: {
            borderStartStartRadius: e.borderRadius,
            borderStartEndRadius: 0,
            borderEndEndRadius: 0,
            borderEndStartRadius: e.borderRadius
          }
        }
      }
    })
  };
}, T0 = (e) => {
  const {
    componentCls: r,
    controlHeightSM: t,
    lineWidth: n,
    calc: a
  } = e, o = a(t).sub(a(n).mul(2)).sub(16).div(2).equal();
  return {
    [r]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, wc(e)), qd(e)), S0(e)), w0(e)), E0(e)), _0(e)), {
      '&[type="color"]': {
        height: e.controlHeight,
        [`&${r}-lg`]: {
          height: e.controlHeightLG
        },
        [`&${r}-sm`]: {
          height: t,
          paddingTop: o,
          paddingBottom: o
        }
      },
      '&[type="search"]::-webkit-search-cancel-button, &[type="search"]::-webkit-search-decoration': {
        appearance: "none"
      }
    })
  };
}, O0 = (e) => {
  const {
    componentCls: r
  } = e;
  return {
    // ========================= Input =========================
    [`${r}-clear-icon`]: {
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
        color: e.colorIcon
      },
      "&:active": {
        color: e.colorText
      },
      "&-hidden": {
        visibility: "hidden"
      },
      "&-has-suffix": {
        margin: `0 ${ze(e.inputAffixPadding)}`
      }
    }
  };
}, j0 = (e) => {
  const {
    componentCls: r,
    inputAffixPadding: t,
    colorTextDescription: n,
    motionDurationSlow: a,
    colorIcon: i,
    colorIconHover: o,
    iconCls: s
  } = e, l = `${r}-affix-wrapper`, c = `${r}-affix-wrapper-disabled`;
  return {
    [l]: Object.assign(Object.assign(Object.assign(Object.assign({}, qd(e)), {
      display: "inline-flex",
      [`&:not(${r}-disabled):hover`]: {
        zIndex: 1,
        [`${r}-search-with-button &`]: {
          zIndex: 0
        }
      },
      "&-focused, &:focus": {
        zIndex: 1
      },
      [`> input${r}`]: {
        padding: 0
      },
      [`> input${r}, > textarea${r}`]: {
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
      [r]: {
        "&-prefix, &-suffix": {
          display: "flex",
          flex: "none",
          alignItems: "center",
          "> *:not(:last-child)": {
            marginInlineEnd: e.paddingXS
          }
        },
        "&-show-count-suffix": {
          color: n,
          direction: "ltr"
        },
        "&-show-count-has-suffix": {
          marginInlineEnd: e.paddingXXS
        },
        "&-prefix": {
          marginInlineEnd: t
        },
        "&-suffix": {
          marginInlineStart: t
        }
      }
    }), O0(e)), {
      // password
      [`${s}${r}-password-icon`]: {
        color: i,
        cursor: "pointer",
        transition: `all ${a}`,
        "&:hover": {
          color: o
        }
      }
    }),
    // 覆盖 affix-wrapper borderRadius！
    [`${r}-underlined`]: {
      borderRadius: 0
    },
    [c]: {
      // password disabled
      [`${s}${r}-password-icon`]: {
        color: i,
        cursor: "not-allowed",
        "&:hover": {
          color: i
        }
      }
    }
  };
}, F0 = (e) => {
  const {
    componentCls: r,
    borderRadiusLG: t,
    borderRadiusSM: n
  } = e;
  return {
    [`${r}-group`]: Object.assign(Object.assign(Object.assign({}, wc(e)), P0(e)), {
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
          [`${r}-group-addon`]: {
            borderRadius: t,
            fontSize: e.inputFontSizeLG
          }
        },
        "&-sm": {
          [`${r}-group-addon`]: {
            borderRadius: n
          }
        }
      }, C0(e)), $0(e)), {
        // '&-disabled': {
        //   [`${componentCls}-group-addon`]: {
        //     ...genDisabledStyle(token),
        //   },
        // },
        // Fix the issue of using icons in Space Compact mode
        // https://github.com/ant-design/ant-design/issues/42122
        [`&:not(${r}-compact-first-item):not(${r}-compact-last-item)${r}-compact-item`]: {
          [`${r}, ${r}-group-addon`]: {
            borderRadius: 0
          }
        },
        [`&:not(${r}-compact-last-item)${r}-compact-first-item`]: {
          [`${r}, ${r}-group-addon`]: {
            borderStartEndRadius: 0,
            borderEndEndRadius: 0
          }
        },
        [`&:not(${r}-compact-first-item)${r}-compact-last-item`]: {
          [`${r}, ${r}-group-addon`]: {
            borderStartStartRadius: 0,
            borderEndStartRadius: 0
          }
        },
        // Fix the issue of input use show-count param in space compact mode
        // https://github.com/ant-design/ant-design/issues/46872
        [`&:not(${r}-compact-last-item)${r}-compact-item`]: {
          [`${r}-affix-wrapper`]: {
            borderStartEndRadius: 0,
            borderEndEndRadius: 0
          }
        },
        // Fix the issue of input use `addonAfter` param in space compact mode
        // https://github.com/ant-design/ant-design/issues/52483
        [`&:not(${r}-compact-first-item)${r}-compact-item`]: {
          [`${r}-affix-wrapper`]: {
            borderStartStartRadius: 0,
            borderEndStartRadius: 0
          }
        }
      })
    })
  };
}, N0 = (e) => {
  const {
    componentCls: r,
    antCls: t
  } = e, n = `${r}-search`;
  return {
    [n]: {
      [r]: {
        "&:hover, &:focus": {
          [`+ ${r}-group-addon ${n}-button:not(${t}-btn-color-primary):not(${t}-btn-variant-text)`]: {
            borderInlineStartColor: e.colorPrimaryHover
          }
        }
      },
      [`${r}-affix-wrapper`]: {
        height: e.controlHeight,
        borderRadius: 0
      },
      // fix slight height diff in Firefox:
      // https://ant.design/components/auto-complete-cn/#auto-complete-demo-certain-category
      [`${r}-lg`]: {
        lineHeight: e.calc(e.lineHeightLG).sub(2e-4).equal()
      },
      [`> ${r}-group`]: {
        [`> ${r}-group-addon:last-child`]: {
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
          [`${n}-button:not(${t}-btn-color-primary)`]: {
            color: e.colorTextDescription,
            "&:hover": {
              color: e.colorPrimaryHover
            },
            "&:active": {
              color: e.colorPrimaryActive
            },
            [`&${t}-btn-loading::before`]: {
              inset: 0
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
        [`${r}-affix-wrapper, ${n}-button`]: {
          height: e.controlHeightLG
        }
      },
      "&-small": {
        [`${r}-affix-wrapper, ${n}-button`]: {
          height: e.controlHeightSM
        }
      },
      "&-rtl": {
        direction: "rtl"
      },
      // ===================== Compact Item Customized Styles =====================
      [`&${r}-compact-item`]: {
        [`&:not(${r}-compact-last-item)`]: {
          [`${r}-group-addon`]: {
            [`${r}-search-button`]: {
              marginInlineEnd: e.calc(e.lineWidth).mul(-1).equal(),
              borderRadius: 0
            }
          }
        },
        [`&:not(${r}-compact-first-item)`]: {
          [`${r},${r}-affix-wrapper`]: {
            borderRadius: 0
          }
        },
        [`> ${r}-group-addon ${r}-search-button,
        > ${r},
        ${r}-affix-wrapper`]: {
          "&:hover, &:focus, &:active": {
            zIndex: 2
          }
        },
        [`> ${r}-affix-wrapper-focused`]: {
          zIndex: 2
        }
      }
    }
  };
}, A0 = (e) => {
  const {
    componentCls: r
  } = e;
  return {
    [`${r}-out-of-range`]: {
      [`&, & input, & textarea, ${r}-show-count-suffix, ${r}-data-count`]: {
        color: e.colorError
      }
    }
  };
}, Yd = _o(["Input", "Shared"], (e) => {
  const r = st(e, zo(e));
  return [T0(r), j0(r)];
}, Bo, {
  resetFont: !1
}), M0 = _o(["Input", "Component"], (e) => {
  const r = st(e, zo(e));
  return [
    F0(r),
    N0(r),
    A0(r),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    Mg(r)
  ];
}, Bo, {
  resetFont: !1
});
function k0(e) {
  return !!(e.prefix || e.suffix || e.allowClear || e.showCount);
}
var V0 = function(e, r) {
  var t = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && r.indexOf(n) < 0 && (t[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (t[n[a]] = e[n[a]]);
  return t;
};
const I0 = /* @__PURE__ */ on((e, r) => {
  const {
    prefixCls: t,
    bordered: n = !0,
    status: a,
    size: i,
    disabled: o,
    onBlur: s,
    onFocus: l,
    suffix: c,
    allowClear: u,
    addonAfter: d,
    addonBefore: f,
    className: p,
    style: y,
    styles: m,
    rootClassName: v,
    onChange: b,
    classNames: h,
    variant: C
  } = e, _ = V0(e, ["prefixCls", "bordered", "status", "size", "disabled", "onBlur", "onFocus", "suffix", "allowClear", "addonAfter", "addonBefore", "className", "style", "styles", "rootClassName", "onChange", "classNames", "variant"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: ve
    } = nt("Input");
    ve(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: S,
    direction: $,
    allowClear: x,
    autoComplete: R,
    className: T,
    style: O,
    classNames: M,
    styles: I
  } = gc("input"), F = S("input", t), A = Ae(null), V = Fd(F), [D, z, H] = Yd(F, v), [ee] = M0(F, V), {
    compactSize: Q,
    compactItemClassnames: re
  } = Uc(F, $), q = Hc((ve) => {
    var qe;
    return (qe = i ?? Q) !== null && qe !== void 0 ? qe : ve;
  }), U = J.useContext(en), Y = o ?? U, {
    status: pe,
    hasFeedback: se,
    feedbackIcon: he
  } = Ue(an), de = jd(pe, a), me = k0(e) || !!se, fe = Ae(me);
  if (process.env.NODE_ENV !== "production") {
    const ve = nt("Input");
    Je(() => {
      var qe;
      me && !fe.current && process.env.NODE_ENV !== "production" && ve(document.activeElement === ((qe = A.current) === null || qe === void 0 ? void 0 : qe.input), "usage", "When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ"), fe.current = me;
    }, [me]);
  }
  const je = b0(A), Fe = (ve) => {
    je(), s == null || s(ve);
  }, Be = (ve) => {
    je(), l == null || l(ve);
  }, B = (ve) => {
    je(), b == null || b(ve);
  }, Pe = (se || c) && /* @__PURE__ */ J.createElement(J.Fragment, null, c, se && he), K = Od(u ?? x), [le, De] = Ld("input", C, n);
  return D(ee(/* @__PURE__ */ J.createElement(zy, Object.assign({
    ref: Tl(r, A),
    prefixCls: F,
    autoComplete: R
  }, _, {
    disabled: Y,
    onBlur: Fe,
    onFocus: Be,
    style: Object.assign(Object.assign({}, O), y),
    styles: Object.assign(Object.assign({}, I), m),
    suffix: Pe,
    allowClear: K,
    className: Ee(p, v, H, V, re, T),
    onChange: B,
    addonBefore: f && /* @__PURE__ */ J.createElement(al, {
      form: !0,
      space: !0
    }, f),
    addonAfter: d && /* @__PURE__ */ J.createElement(al, {
      form: !0,
      space: !0
    }, d),
    classNames: Object.assign(Object.assign(Object.assign({}, h), M), {
      input: Ee({
        [`${F}-sm`]: q === "small",
        [`${F}-lg`]: q === "large",
        [`${F}-rtl`]: $ === "rtl"
      }, h == null ? void 0 : h.input, M.input, z),
      variant: Ee({
        [`${F}-${le}`]: De
      }, Ki(F, de)),
      affixWrapper: Ee({
        [`${F}-affix-wrapper-sm`]: q === "small",
        [`${F}-affix-wrapper-lg`]: q === "large",
        [`${F}-affix-wrapper-rtl`]: $ === "rtl"
      }, z),
      wrapper: Ee({
        [`${F}-group-rtl`]: $ === "rtl"
      }, z),
      groupWrapper: Ee({
        [`${F}-group-wrapper-sm`]: q === "small",
        [`${F}-group-wrapper-lg`]: q === "large",
        [`${F}-group-wrapper-rtl`]: $ === "rtl",
        [`${F}-group-wrapper-${le}`]: De
      }, Ki(`${F}-group-wrapper`, de, se), z)
    })
  }))));
});
process.env.NODE_ENV !== "production" && (I0.displayName = "Input");
const D0 = (e) => {
  const {
    componentCls: r,
    paddingLG: t
  } = e, n = `${r}-textarea`;
  return {
    // Raw Textarea
    [`textarea${r}`]: {
      maxWidth: "100%",
      // prevent textarea resize from coming out of its container
      height: "auto",
      minHeight: e.controlHeight,
      lineHeight: e.lineHeight,
      verticalAlign: "bottom",
      transition: `all ${e.motionDurationSlow}`,
      resize: "vertical",
      [`&${r}-mouse-active`]: {
        transition: `all ${e.motionDurationSlow}, height 0s, width 0s`
      }
    },
    // Wrapper for resize
    [`${r}-textarea-affix-wrapper-resize-dirty`]: {
      width: "auto"
    },
    [n]: {
      position: "relative",
      "&-show-count": {
        [`${r}-data-count`]: {
          position: "absolute",
          bottom: e.calc(e.fontSize).mul(e.lineHeight).mul(-1).equal(),
          insetInlineEnd: 0,
          color: e.colorTextDescription,
          whiteSpace: "nowrap",
          pointerEvents: "none"
        }
      },
      [`
        &-allow-clear > ${r},
        &-affix-wrapper${n}-has-feedback ${r}
      `]: {
        paddingInlineEnd: t
      },
      [`&-affix-wrapper${r}-affix-wrapper`]: {
        padding: 0,
        [`> textarea${r}`]: {
          fontSize: "inherit",
          border: "none",
          outline: "none",
          background: "transparent",
          minHeight: e.calc(e.controlHeight).sub(e.calc(e.lineWidth).mul(2)).equal(),
          "&:focus": {
            boxShadow: "none !important"
          }
        },
        [`${r}-suffix`]: {
          margin: 0,
          "> *:not(:last-child)": {
            marginInline: 0
          },
          // Clear Icon
          [`${r}-clear-icon`]: {
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
      [`&-affix-wrapper${r}-affix-wrapper-rtl`]: {
        [`${r}-suffix`]: {
          [`${r}-data-count`]: {
            direction: "ltr",
            insetInlineStart: 0
          }
        }
      },
      [`&-affix-wrapper${r}-affix-wrapper-sm`]: {
        [`${r}-suffix`]: {
          [`${r}-clear-icon`]: {
            insetInlineEnd: e.paddingInlineSM
          }
        }
      }
    }
  };
}, L0 = _o(["Input", "TextArea"], (e) => {
  const r = st(e, zo(e));
  return [D0(r)];
}, Bo, {
  resetFont: !1
});
var z0 = function(e, r) {
  var t = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && r.indexOf(n) < 0 && (t[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (t[n[a]] = e[n[a]]);
  return t;
};
const Y0 = /* @__PURE__ */ on((e, r) => {
  var t;
  const {
    prefixCls: n,
    bordered: a = !0,
    size: i,
    disabled: o,
    status: s,
    allowClear: l,
    classNames: c,
    rootClassName: u,
    className: d,
    style: f,
    styles: p,
    variant: y,
    showCount: m,
    onMouseDown: v,
    onResize: b
  } = e, h = z0(e, ["prefixCls", "bordered", "size", "disabled", "status", "allowClear", "classNames", "rootClassName", "className", "style", "styles", "variant", "showCount", "onMouseDown", "onResize"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: K
    } = nt("TextArea");
    K(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: C,
    direction: _,
    allowClear: S,
    autoComplete: $,
    className: x,
    style: R,
    classNames: T,
    styles: O
  } = gc("textArea"), M = E.useContext(en), I = o ?? M, {
    status: F,
    hasFeedback: A,
    feedbackIcon: V
  } = E.useContext(an), D = jd(F, s), z = E.useRef(null);
  E.useImperativeHandle(r, () => {
    var K;
    return {
      resizableTextArea: (K = z.current) === null || K === void 0 ? void 0 : K.resizableTextArea,
      focus: (le) => {
        var De, ve;
        yd((ve = (De = z.current) === null || De === void 0 ? void 0 : De.resizableTextArea) === null || ve === void 0 ? void 0 : ve.textArea, le);
      },
      blur: () => {
        var le;
        return (le = z.current) === null || le === void 0 ? void 0 : le.blur();
      }
    };
  });
  const H = C("input", n), ee = Fd(H), [Q, re, q] = Yd(H, u), [U] = L0(H, ee), {
    compactSize: Y,
    compactItemClassnames: pe
  } = Uc(H, _), se = Hc((K) => {
    var le;
    return (le = i ?? Y) !== null && le !== void 0 ? le : K;
  }), [he, de] = Ld("textArea", y, a), me = Od(l ?? S), [fe, je] = E.useState(!1), [Fe, Be] = E.useState(!1), B = (K) => {
    je(!0), v == null || v(K);
    const le = () => {
      je(!1), document.removeEventListener("mouseup", le);
    };
    document.addEventListener("mouseup", le);
  }, Pe = (K) => {
    var le, De;
    if (b == null || b(K), fe && typeof getComputedStyle == "function") {
      const ve = (De = (le = z.current) === null || le === void 0 ? void 0 : le.nativeElement) === null || De === void 0 ? void 0 : De.querySelector("textarea");
      ve && getComputedStyle(ve).resize === "both" && Be(!0);
    }
  };
  return Q(U(/* @__PURE__ */ E.createElement(xb, Object.assign({
    autoComplete: $
  }, h, {
    style: Object.assign(Object.assign({}, R), f),
    styles: Object.assign(Object.assign({}, O), p),
    disabled: I,
    allowClear: me,
    className: Ee(
      q,
      ee,
      d,
      u,
      pe,
      x,
      // Only for wrapper
      Fe && `${H}-textarea-affix-wrapper-resize-dirty`
    ),
    classNames: Object.assign(Object.assign(Object.assign({}, c), T), {
      textarea: Ee({
        [`${H}-sm`]: se === "small",
        [`${H}-lg`]: se === "large"
      }, re, c == null ? void 0 : c.textarea, T.textarea, fe && `${H}-mouse-active`),
      variant: Ee({
        [`${H}-${he}`]: de
      }, Ki(H, D)),
      affixWrapper: Ee(`${H}-textarea-affix-wrapper`, {
        [`${H}-affix-wrapper-rtl`]: _ === "rtl",
        [`${H}-affix-wrapper-sm`]: se === "small",
        [`${H}-affix-wrapper-lg`]: se === "large",
        [`${H}-textarea-show-count`]: m || ((t = e.count) === null || t === void 0 ? void 0 : t.show)
      }, re)
    }),
    prefixCls: H,
    suffix: A && /* @__PURE__ */ E.createElement("span", {
      className: `${H}-textarea-suffix`
    }, V),
    showCount: m,
    ref: z,
    onResize: Pe,
    onMouseDown: B
  }))));
});
export {
  Re as J,
  Y0 as T,
  zv as a,
  $v as b,
  cv as c,
  np as d,
  Yf as e,
  jf as f,
  mf as g,
  q0 as i,
  N as j
};
