import * as S from "react";
import H, { isValidElement as cu, version as uu, useContext as Rt, createContext as Bi, useRef as De, useLayoutEffect as du, useEffect as St, cloneElement as fu, forwardRef as Wi, useState as Ya, useImperativeHandle as Hs, useMemo as vu } from "react";
import So from "react-dom";
import Se from "classnames";
var Ga = { exports: {} }, _r = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xo;
function pu() {
  if (xo) return _r;
  xo = 1;
  var e = H, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(s, l, c) {
    var u, d = {}, v = null, b = null;
    c !== void 0 && (v = "" + c), l.key !== void 0 && (v = "" + l.key), l.ref !== void 0 && (b = l.ref);
    for (u in l) n.call(l, u) && !i.hasOwnProperty(u) && (d[u] = l[u]);
    if (s && s.defaultProps) for (u in l = s.defaultProps, l) d[u] === void 0 && (d[u] = l[u]);
    return { $$typeof: t, type: s, key: v, ref: b, props: d, _owner: a.current };
  }
  return _r.Fragment = r, _r.jsx = o, _r.jsxs = o, _r;
}
var wr = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Co;
function hu() {
  return Co || (Co = 1, process.env.NODE_ENV !== "production" && function() {
    var e = H, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), g = Symbol.iterator, m = "@@iterator";
    function f(p) {
      if (p === null || typeof p != "object")
        return null;
      var A = g && p[g] || p[m];
      return typeof A == "function" ? A : null;
    }
    var x = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(p) {
      {
        for (var A = arguments.length, D = new Array(A > 1 ? A - 1 : 0), G = 1; G < A; G++)
          D[G - 1] = arguments[G];
        $("error", p, D);
      }
    }
    function $(p, A, D) {
      {
        var G = x.ReactDebugCurrentFrame, he = G.getStackAddendum();
        he !== "" && (A += "%s", D = D.concat([he]));
        var me = D.map(function(ae) {
          return String(ae);
        });
        me.unshift("Warning: " + A), Function.prototype.apply.call(console[p], console, me);
      }
    }
    var P = !1, C = !1, _ = !1, y = !1, w = !1, O;
    O = Symbol.for("react.module.reference");
    function T(p) {
      return !!(typeof p == "string" || typeof p == "function" || p === n || p === i || w || p === a || p === c || p === u || y || p === b || P || C || _ || typeof p == "object" && p !== null && (p.$$typeof === v || p.$$typeof === d || p.$$typeof === o || p.$$typeof === s || p.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      p.$$typeof === O || p.getModuleId !== void 0));
    }
    function j(p, A, D) {
      var G = p.displayName;
      if (G)
        return G;
      var he = A.displayName || A.name || "";
      return he !== "" ? D + "(" + he + ")" : D;
    }
    function k(p) {
      return p.displayName || "Context";
    }
    function F(p) {
      if (p == null)
        return null;
      if (typeof p.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof p == "function")
        return p.displayName || p.name || null;
      if (typeof p == "string")
        return p;
      switch (p) {
        case n:
          return "Fragment";
        case r:
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
      if (typeof p == "object")
        switch (p.$$typeof) {
          case s:
            var A = p;
            return k(A) + ".Consumer";
          case o:
            var D = p;
            return k(D._context) + ".Provider";
          case l:
            return j(p, p.render, "ForwardRef");
          case d:
            var G = p.displayName || null;
            return G !== null ? G : F(p.type) || "Memo";
          case v: {
            var he = p, me = he._payload, ae = he._init;
            try {
              return F(ae(me));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var M = Object.assign, I = 0, N, V, z, Q, X, Z, q;
    function W() {
    }
    W.__reactDisabledLog = !0;
    function U() {
      {
        if (I === 0) {
          N = console.log, V = console.info, z = console.warn, Q = console.error, X = console.group, Z = console.groupCollapsed, q = console.groupEnd;
          var p = {
            configurable: !0,
            enumerable: !0,
            value: W,
            writable: !0
          };
          Object.defineProperties(console, {
            info: p,
            log: p,
            warn: p,
            error: p,
            group: p,
            groupCollapsed: p,
            groupEnd: p
          });
        }
        I++;
      }
    }
    function de() {
      {
        if (I--, I === 0) {
          var p = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: M({}, p, {
              value: N
            }),
            info: M({}, p, {
              value: V
            }),
            warn: M({}, p, {
              value: z
            }),
            error: M({}, p, {
              value: Q
            }),
            group: M({}, p, {
              value: X
            }),
            groupCollapsed: M({}, p, {
              value: Z
            }),
            groupEnd: M({}, p, {
              value: q
            })
          });
        }
        I < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ie = x.ReactCurrentDispatcher, ve;
    function le(p, A, D) {
      {
        if (ve === void 0)
          try {
            throw Error();
          } catch (he) {
            var G = he.stack.trim().match(/\n( *(at )?)/);
            ve = G && G[1] || "";
          }
        return `
` + ve + p;
      }
    }
    var fe = !1, ce;
    {
      var we = typeof WeakMap == "function" ? WeakMap : Map;
      ce = new we();
    }
    function Pe(p, A) {
      if (!p || fe)
        return "";
      {
        var D = ce.get(p);
        if (D !== void 0)
          return D;
      }
      var G;
      fe = !0;
      var he = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var me;
      me = ie.current, ie.current = null, U();
      try {
        if (A) {
          var ae = function() {
            throw Error();
          };
          if (Object.defineProperty(ae.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ae, []);
            } catch (Ge) {
              G = Ge;
            }
            Reflect.construct(p, [], ae);
          } else {
            try {
              ae.call();
            } catch (Ge) {
              G = Ge;
            }
            p.call(ae.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ge) {
            G = Ge;
          }
          p();
        }
      } catch (Ge) {
        if (Ge && G && typeof Ge.stack == "string") {
          for (var re = Ge.stack.split(`
`), We = G.stack.split(`
`), Fe = re.length - 1, ge = We.length - 1; Fe >= 1 && ge >= 0 && re[Fe] !== We[ge]; )
            ge--;
          for (; Fe >= 1 && ge >= 0; Fe--, ge--)
            if (re[Fe] !== We[ge]) {
              if (Fe !== 1 || ge !== 1)
                do
                  if (Fe--, ge--, ge < 0 || re[Fe] !== We[ge]) {
                    var ft = `
` + re[Fe].replace(" at new ", " at ");
                    return p.displayName && ft.includes("<anonymous>") && (ft = ft.replace("<anonymous>", p.displayName)), typeof p == "function" && ce.set(p, ft), ft;
                  }
                while (Fe >= 1 && ge >= 0);
              break;
            }
        }
      } finally {
        fe = !1, ie.current = me, de(), Error.prepareStackTrace = he;
      }
      var Zt = p ? p.displayName || p.name : "", zt = Zt ? le(Zt) : "";
      return typeof p == "function" && ce.set(p, zt), zt;
    }
    function Ie(p, A, D) {
      return Pe(p, !1);
    }
    function L(p) {
      var A = p.prototype;
      return !!(A && A.isReactComponent);
    }
    function $e(p, A, D) {
      if (p == null)
        return "";
      if (typeof p == "function")
        return Pe(p, L(p));
      if (typeof p == "string")
        return le(p);
      switch (p) {
        case c:
          return le("Suspense");
        case u:
          return le("SuspenseList");
      }
      if (typeof p == "object")
        switch (p.$$typeof) {
          case l:
            return Ie(p.render);
          case d:
            return $e(p.type, A, D);
          case v: {
            var G = p, he = G._payload, me = G._init;
            try {
              return $e(me(he), A, D);
            } catch {
            }
          }
        }
      return "";
    }
    var Y = Object.prototype.hasOwnProperty, oe = {}, Ae = x.ReactDebugCurrentFrame;
    function ue(p) {
      if (p) {
        var A = p._owner, D = $e(p.type, p._source, A ? A.type : null);
        Ae.setExtraStackFrame(D);
      } else
        Ae.setExtraStackFrame(null);
    }
    function Le(p, A, D, G, he) {
      {
        var me = Function.call.bind(Y);
        for (var ae in p)
          if (me(p, ae)) {
            var re = void 0;
            try {
              if (typeof p[ae] != "function") {
                var We = Error((G || "React class") + ": " + D + " type `" + ae + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof p[ae] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw We.name = "Invariant Violation", We;
              }
              re = p[ae](A, ae, G, D, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Fe) {
              re = Fe;
            }
            re && !(re instanceof Error) && (ue(he), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", G || "React class", D, ae, typeof re), ue(null)), re instanceof Error && !(re.message in oe) && (oe[re.message] = !0, ue(he), h("Failed %s type: %s", D, re.message), ue(null));
          }
      }
    }
    var Re = Array.isArray;
    function _e(p) {
      return Re(p);
    }
    function te(p) {
      {
        var A = typeof Symbol == "function" && Symbol.toStringTag, D = A && p[Symbol.toStringTag] || p.constructor.name || "Object";
        return D;
      }
    }
    function ee(p) {
      try {
        return xe(p), !1;
      } catch {
        return !0;
      }
    }
    function xe(p) {
      return "" + p;
    }
    function ct(p) {
      if (ee(p))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", te(p)), xe(p);
    }
    var Xe = x.ReactCurrentOwner, Je = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ut, Et;
    function yr(p) {
      if (Y.call(p, "ref")) {
        var A = Object.getOwnPropertyDescriptor(p, "ref").get;
        if (A && A.isReactWarning)
          return !1;
      }
      return p.ref !== void 0;
    }
    function Sr(p) {
      if (Y.call(p, "key")) {
        var A = Object.getOwnPropertyDescriptor(p, "key").get;
        if (A && A.isReactWarning)
          return !1;
      }
      return p.key !== void 0;
    }
    function Te(p, A) {
      typeof p.ref == "string" && Xe.current;
    }
    function pe(p, A) {
      {
        var D = function() {
          ut || (ut = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", A));
        };
        D.isReactWarning = !0, Object.defineProperty(p, "key", {
          get: D,
          configurable: !0
        });
      }
    }
    function dt(p, A) {
      {
        var D = function() {
          Et || (Et = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", A));
        };
        D.isReactWarning = !0, Object.defineProperty(p, "ref", {
          get: D,
          configurable: !0
        });
      }
    }
    var Ft = function(p, A, D, G, he, me, ae) {
      var re = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: p,
        key: A,
        ref: D,
        props: ae,
        // Record the component responsible for creating this element.
        _owner: me
      };
      return re._store = {}, Object.defineProperty(re._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(re, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: G
      }), Object.defineProperty(re, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: he
      }), Object.freeze && (Object.freeze(re.props), Object.freeze(re)), re;
    };
    function wa(p, A, D, G, he) {
      {
        var me, ae = {}, re = null, We = null;
        D !== void 0 && (ct(D), re = "" + D), Sr(A) && (ct(A.key), re = "" + A.key), yr(A) && (We = A.ref, Te(A, he));
        for (me in A)
          Y.call(A, me) && !Je.hasOwnProperty(me) && (ae[me] = A[me]);
        if (p && p.defaultProps) {
          var Fe = p.defaultProps;
          for (me in Fe)
            ae[me] === void 0 && (ae[me] = Fe[me]);
        }
        if (re || We) {
          var ge = typeof p == "function" ? p.displayName || p.name || "Unknown" : p;
          re && pe(ae, ge), We && dt(ae, ge);
        }
        return Ft(p, re, We, he, G, Xe.current, ae);
      }
    }
    var xr = x.ReactCurrentOwner, cn = x.ReactDebugCurrentFrame;
    function Mt(p) {
      if (p) {
        var A = p._owner, D = $e(p.type, p._source, A ? A.type : null);
        cn.setExtraStackFrame(D);
      } else
        cn.setExtraStackFrame(null);
    }
    var Cr;
    Cr = !1;
    function Er(p) {
      return typeof p == "object" && p !== null && p.$$typeof === t;
    }
    function un() {
      {
        if (xr.current) {
          var p = F(xr.current.type);
          if (p)
            return `

Check the render method of \`` + p + "`.";
        }
        return "";
      }
    }
    function dn(p) {
      return "";
    }
    var Vt = {};
    function Jt(p) {
      {
        var A = un();
        if (!A) {
          var D = typeof p == "string" ? p : p.displayName || p.name;
          D && (A = `

Check the top-level render call using <` + D + ">.");
        }
        return A;
      }
    }
    function Lt(p, A) {
      {
        if (!p._store || p._store.validated || p.key != null)
          return;
        p._store.validated = !0;
        var D = Jt(A);
        if (Vt[D])
          return;
        Vt[D] = !0;
        var G = "";
        p && p._owner && p._owner !== xr.current && (G = " It was passed a child from " + F(p._owner.type) + "."), Mt(p), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', D, G), Mt(null);
      }
    }
    function Qt(p, A) {
      {
        if (typeof p != "object")
          return;
        if (_e(p))
          for (var D = 0; D < p.length; D++) {
            var G = p[D];
            Er(G) && Lt(G, A);
          }
        else if (Er(p))
          p._store && (p._store.validated = !0);
        else if (p) {
          var he = f(p);
          if (typeof he == "function" && he !== p.entries)
            for (var me = he.call(p), ae; !(ae = me.next()).done; )
              Er(ae.value) && Lt(ae.value, A);
        }
      }
    }
    function At(p) {
      {
        var A = p.type;
        if (A == null || typeof A == "string")
          return;
        var D;
        if (typeof A == "function")
          D = A.propTypes;
        else if (typeof A == "object" && (A.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        A.$$typeof === d))
          D = A.propTypes;
        else
          return;
        if (D) {
          var G = F(A);
          Le(D, p.props, "prop", G, p);
        } else if (A.PropTypes !== void 0 && !Cr) {
          Cr = !0;
          var he = F(A);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", he || "Unknown");
        }
        typeof A.getDefaultProps == "function" && !A.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function jt(p) {
      {
        for (var A = Object.keys(p.props), D = 0; D < A.length; D++) {
          var G = A[D];
          if (G !== "children" && G !== "key") {
            Mt(p), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", G), Mt(null);
            break;
          }
        }
        p.ref !== null && (Mt(p), h("Invalid attribute `ref` supplied to `React.Fragment`."), Mt(null));
      }
    }
    var $r = {};
    function fn(p, A, D, G, he, me) {
      {
        var ae = T(p);
        if (!ae) {
          var re = "";
          (p === void 0 || typeof p == "object" && p !== null && Object.keys(p).length === 0) && (re += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var We = dn();
          We ? re += We : re += un();
          var Fe;
          p === null ? Fe = "null" : _e(p) ? Fe = "array" : p !== void 0 && p.$$typeof === t ? (Fe = "<" + (F(p.type) || "Unknown") + " />", re = " Did you accidentally export a JSX literal instead of a component?") : Fe = typeof p, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Fe, re);
        }
        var ge = wa(p, A, D, he, me);
        if (ge == null)
          return ge;
        if (ae) {
          var ft = A.children;
          if (ft !== void 0)
            if (G)
              if (_e(ft)) {
                for (var Zt = 0; Zt < ft.length; Zt++)
                  Qt(ft[Zt], p);
                Object.freeze && Object.freeze(ft);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Qt(ft, p);
        }
        if (Y.call(A, "key")) {
          var zt = F(p), Ge = Object.keys(A).filter(function(lu) {
            return lu !== "key";
          }), Oa = Ge.length > 0 ? "{key: someKey, " + Ge.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!$r[zt + Oa]) {
            var su = Ge.length > 0 ? "{" + Ge.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Oa, zt, su, zt), $r[zt + Oa] = !0;
          }
        }
        return p === n ? jt(ge) : At(ge), ge;
      }
    }
    function ze(p, A, D) {
      return fn(p, A, D, !0);
    }
    function vn(p, A, D) {
      return fn(p, A, D, !1);
    }
    var Pa = vn, je = ze;
    wr.Fragment = n, wr.jsx = Pa, wr.jsxs = je;
  }()), wr;
}
process.env.NODE_ENV === "production" ? Ga.exports = pu() : Ga.exports = hu();
var fb = Ga.exports, qi = {}, Bs = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Bs);
var Ee = Bs.exports, Bn = {};
Object.defineProperty(Bn, "__esModule", {
  value: !0
});
Bn.default = void 0;
var mu = {
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
Bn.default = mu;
var Wn = {}, Wr = {}, qn = {}, Ws = { exports: {} }, qs = { exports: {} }, Us = { exports: {} }, Ys = { exports: {} };
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
})(Ys);
var Gs = Ys.exports, Ks = { exports: {} };
(function(e) {
  var t = Gs.default;
  function r(n, a) {
    if (t(n) != "object" || !n) return n;
    var i = n[Symbol.toPrimitive];
    if (i !== void 0) {
      var o = i.call(n, a || "default");
      if (t(o) != "object") return o;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (a === "string" ? String : Number)(n);
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ks);
var gu = Ks.exports;
(function(e) {
  var t = Gs.default, r = gu;
  function n(a) {
    var i = r(a, "string");
    return t(i) == "symbol" ? i : i + "";
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Us);
var bu = Us.exports;
(function(e) {
  var t = bu;
  function r(n, a, i) {
    return (a = t(a)) in n ? Object.defineProperty(n, a, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : n[a] = i, n;
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(qs);
var yu = qs.exports;
(function(e) {
  var t = yu;
  function r(a, i) {
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
      i % 2 ? r(Object(o), !0).forEach(function(s) {
        t(a, s, o[s]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(o)) : r(Object(o)).forEach(function(s) {
        Object.defineProperty(a, s, Object.getOwnPropertyDescriptor(o, s));
      });
    }
    return a;
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ws);
var Yt = Ws.exports, wt = {};
Object.defineProperty(wt, "__esModule", {
  value: !0
});
wt.commonLocale = void 0;
wt.commonLocale = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: !0
};
var Su = Ee.default;
Object.defineProperty(qn, "__esModule", {
  value: !0
});
qn.default = void 0;
var Eo = Su(Yt), xu = wt, Cu = (0, Eo.default)((0, Eo.default)({}, xu.commonLocale), {}, {
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
qn.default = Cu;
var qr = {};
Object.defineProperty(qr, "__esModule", {
  value: !0
});
qr.default = void 0;
const Eu = {
  placeholder: "请选择时间",
  rangePlaceholder: ["开始时间", "结束时间"]
};
qr.default = Eu;
var Xs = Ee.default;
Object.defineProperty(Wr, "__esModule", {
  value: !0
});
Wr.default = void 0;
var $u = Xs(qn), _u = Xs(qr);
const Js = {
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
  }, $u.default),
  timePickerLocale: Object.assign({}, _u.default)
};
Js.lang.ok = "确定";
Wr.default = Js;
var wu = Ee.default;
Object.defineProperty(Wn, "__esModule", {
  value: !0
});
Wn.default = void 0;
var Pu = wu(Wr);
Wn.default = Pu.default;
var Un = Ee.default;
Object.defineProperty(qi, "__esModule", {
  value: !0
});
var Ou = qi.default = void 0, Ru = Un(Bn), Tu = Un(Wn), Fu = Un(Wr), Mu = Un(qr);
const Qe = "${label}不是一个有效的${type}", Au = {
  locale: "zh-cn",
  Pagination: Ru.default,
  DatePicker: Fu.default,
  TimePicker: Mu.default,
  Calendar: Tu.default,
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
        string: Qe,
        method: Qe,
        array: Qe,
        object: Qe,
        number: Qe,
        date: Qe,
        boolean: Qe,
        integer: Qe,
        float: Qe,
        regexp: Qe,
        email: Qe,
        url: Qe,
        hex: Qe
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
Ou = qi.default = Au;
var Ui = {}, Yn = {};
Object.defineProperty(Yn, "__esModule", {
  value: !0
});
Yn.default = void 0;
var ju = {
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
Yn.default = ju;
var Gn = {}, Ur = {}, Kn = {}, ku = Ee.default;
Object.defineProperty(Kn, "__esModule", {
  value: !0
});
Kn.default = void 0;
var $o = ku(Yt), Iu = wt, Nu = (0, $o.default)((0, $o.default)({}, Iu.commonLocale), {}, {
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
Kn.default = Nu;
var Yr = {};
Object.defineProperty(Yr, "__esModule", {
  value: !0
});
Yr.default = void 0;
const Du = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
Yr.default = Du;
var Qs = Ee.default;
Object.defineProperty(Ur, "__esModule", {
  value: !0
});
Ur.default = void 0;
var Vu = Qs(Kn), Lu = Qs(Yr);
const zu = {
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
  }, Vu.default),
  timePickerLocale: Object.assign({}, Lu.default)
};
Ur.default = zu;
var Hu = Ee.default;
Object.defineProperty(Gn, "__esModule", {
  value: !0
});
Gn.default = void 0;
var Bu = Hu(Ur);
Gn.default = Bu.default;
var Xn = Ee.default;
Object.defineProperty(Ui, "__esModule", {
  value: !0
});
var Wu = Ui.default = void 0, qu = Xn(Yn), Uu = Xn(Gn), Yu = Xn(Ur), Gu = Xn(Yr);
const Ze = "${label} is not a valid ${type}", Ku = {
  locale: "en",
  Pagination: qu.default,
  DatePicker: Yu.default,
  TimePicker: Gu.default,
  Calendar: Uu.default,
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
        string: Ze,
        method: Ze,
        array: Ze,
        object: Ze,
        number: Ze,
        date: Ze,
        boolean: Ze,
        integer: Ze,
        float: Ze,
        regexp: Ze,
        email: Ze,
        url: Ze,
        hex: Ze
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
Wu = Ui.default = Ku;
var Yi = {}, Jn = {};
Object.defineProperty(Jn, "__esModule", {
  value: !0
});
Jn.default = void 0;
var Xu = {
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
Jn.default = Xu;
var Qn = {}, Gr = {}, Zn = {}, Ju = Ee.default;
Object.defineProperty(Zn, "__esModule", {
  value: !0
});
Zn.default = void 0;
var _o = Ju(Yt), Qu = wt, Zu = (0, _o.default)((0, _o.default)({}, Qu.commonLocale), {}, {
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
Zn.default = Zu;
var Kr = {};
Object.defineProperty(Kr, "__esModule", {
  value: !0
});
Kr.default = void 0;
const ed = {
  placeholder: "Zeit auswählen",
  rangePlaceholder: ["Startzeit", "Endzeit"]
};
Kr.default = ed;
var Zs = Ee.default;
Object.defineProperty(Gr, "__esModule", {
  value: !0
});
Gr.default = void 0;
var td = Zs(Zn), rd = Zs(Kr);
const nd = {
  lang: Object.assign({
    placeholder: "Datum auswählen",
    rangePlaceholder: ["Startdatum", "Enddatum"],
    shortWeekDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    shortMonths: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
  }, td.default),
  timePickerLocale: Object.assign({}, rd.default)
};
Gr.default = nd;
var ad = Ee.default;
Object.defineProperty(Qn, "__esModule", {
  value: !0
});
Qn.default = void 0;
var id = ad(Gr);
Qn.default = id.default;
var ea = Ee.default;
Object.defineProperty(Yi, "__esModule", {
  value: !0
});
var od = Yi.default = void 0, sd = ea(Jn), ld = ea(Qn), cd = ea(Gr), ud = ea(Kr);
const et = "${label} ist nicht gültig. ${type} erwartet", dd = {
  locale: "de",
  Pagination: sd.default,
  DatePicker: cd.default,
  TimePicker: ud.default,
  Calendar: ld.default,
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
        string: et,
        method: et,
        array: et,
        object: et,
        number: et,
        date: et,
        boolean: et,
        integer: et,
        float: et,
        regexp: et,
        email: et,
        url: et,
        hex: et
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
od = Yi.default = dd;
var Gi = {}, ta = {};
Object.defineProperty(ta, "__esModule", {
  value: !0
});
ta.default = void 0;
var fd = {
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
ta.default = fd;
var ra = {}, Xr = {}, na = {}, vd = Ee.default;
Object.defineProperty(na, "__esModule", {
  value: !0
});
na.default = void 0;
var wo = vd(Yt), pd = wt, hd = (0, wo.default)((0, wo.default)({}, pd.commonLocale), {}, {
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
na.default = hd;
var Jr = {};
Object.defineProperty(Jr, "__esModule", {
  value: !0
});
Jr.default = void 0;
const md = {
  placeholder: "Seleccionar hora"
};
Jr.default = md;
var el = Ee.default;
Object.defineProperty(Xr, "__esModule", {
  value: !0
});
Xr.default = void 0;
var gd = el(na), bd = el(Jr);
const yd = {
  lang: Object.assign({
    placeholder: "Seleccionar fecha",
    rangePlaceholder: ["Fecha inicial", "Fecha final"],
    shortWeekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    shortMonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  }, gd.default),
  timePickerLocale: Object.assign({}, bd.default)
};
Xr.default = yd;
var Sd = Ee.default;
Object.defineProperty(ra, "__esModule", {
  value: !0
});
ra.default = void 0;
var xd = Sd(Xr);
ra.default = xd.default;
var aa = Ee.default;
Object.defineProperty(Gi, "__esModule", {
  value: !0
});
var Cd = Gi.default = void 0, Ed = aa(ta), $d = aa(ra), _d = aa(Xr), wd = aa(Jr);
const tt = "${label} no es un ${type} válido", Pd = {
  locale: "es",
  Pagination: Ed.default,
  DatePicker: _d.default,
  TimePicker: wd.default,
  Calendar: $d.default,
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
        string: tt,
        method: tt,
        array: tt,
        object: tt,
        number: tt,
        date: tt,
        boolean: tt,
        integer: tt,
        float: tt,
        regexp: tt,
        email: tt,
        url: tt,
        hex: tt
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
Cd = Gi.default = Pd;
var Ki = {}, ia = {};
Object.defineProperty(ia, "__esModule", {
  value: !0
});
ia.default = void 0;
var Od = {
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
ia.default = Od;
var oa = {}, Qr = {}, sa = {}, Rd = Ee.default;
Object.defineProperty(sa, "__esModule", {
  value: !0
});
sa.default = void 0;
var Po = Rd(Yt), Td = wt, Fd = (0, Po.default)((0, Po.default)({}, Td.commonLocale), {}, {
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
sa.default = Fd;
var Zr = {};
Object.defineProperty(Zr, "__esModule", {
  value: !0
});
Zr.default = void 0;
const Md = {
  placeholder: "Sélectionner l'heure",
  rangePlaceholder: ["Heure de début", "Heure de fin"]
};
Zr.default = Md;
var tl = Ee.default;
Object.defineProperty(Qr, "__esModule", {
  value: !0
});
Qr.default = void 0;
var Ad = tl(sa), jd = tl(Zr);
const kd = {
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
  }, Ad.default),
  timePickerLocale: Object.assign({}, jd.default)
};
Qr.default = kd;
var Id = Ee.default;
Object.defineProperty(oa, "__esModule", {
  value: !0
});
oa.default = void 0;
var Nd = Id(Qr);
oa.default = Nd.default;
var la = Ee.default;
Object.defineProperty(Ki, "__esModule", {
  value: !0
});
var Dd = Ki.default = void 0, Vd = la(ia), Ld = la(oa), zd = la(Qr), Hd = la(Zr);
const rt = "La valeur du champ ${label} n'est pas valide pour le type ${type}", Bd = {
  locale: "fr",
  Pagination: Vd.default,
  DatePicker: zd.default,
  TimePicker: Hd.default,
  Calendar: Ld.default,
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
        string: rt,
        method: rt,
        array: rt,
        object: rt,
        number: rt,
        date: rt,
        boolean: rt,
        integer: rt,
        float: rt,
        regexp: rt,
        email: rt,
        url: rt,
        hex: rt
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
Dd = Ki.default = Bd;
var Xi = {}, ca = {};
Object.defineProperty(ca, "__esModule", {
  value: !0
});
ca.default = void 0;
var Wd = {
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
ca.default = Wd;
var ua = {}, en = {}, da = {}, qd = Ee.default;
Object.defineProperty(da, "__esModule", {
  value: !0
});
da.default = void 0;
var Oo = qd(Yt), Ud = wt, Yd = (0, Oo.default)((0, Oo.default)({}, Ud.commonLocale), {}, {
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
da.default = Yd;
var tn = {};
Object.defineProperty(tn, "__esModule", {
  value: !0
});
tn.default = void 0;
const Gd = {
  placeholder: "اختيار الوقت"
};
tn.default = Gd;
var rl = Ee.default;
Object.defineProperty(en, "__esModule", {
  value: !0
});
en.default = void 0;
var Kd = rl(da), Xd = rl(tn);
const Jd = {
  lang: Object.assign({
    placeholder: "اختيار التاريخ",
    rangePlaceholder: ["البداية", "النهاية"],
    yearFormat: "YYYY",
    monthFormat: "MMMM",
    monthBeforeYear: !0,
    shortWeekDays: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    shortMonths: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
  }, Kd.default),
  timePickerLocale: Object.assign({}, Xd.default)
};
en.default = Jd;
var Qd = Ee.default;
Object.defineProperty(ua, "__esModule", {
  value: !0
});
ua.default = void 0;
var Zd = Qd(en);
ua.default = Zd.default;
var fa = Ee.default;
Object.defineProperty(Xi, "__esModule", {
  value: !0
});
var ef = Xi.default = void 0, tf = fa(ca), rf = fa(ua), nf = fa(en), af = fa(tn);
const nt = "ليس ${label} من نوع ${type} صالحًا", of = {
  locale: "ar",
  Pagination: tf.default,
  DatePicker: nf.default,
  TimePicker: af.default,
  Calendar: rf.default,
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
ef = Xi.default = of;
var Ji = {}, va = {};
Object.defineProperty(va, "__esModule", {
  value: !0
});
va.default = void 0;
var sf = {
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
va.default = sf;
var pa = {}, rn = {}, ha = {}, lf = Ee.default;
Object.defineProperty(ha, "__esModule", {
  value: !0
});
ha.default = void 0;
var Ro = lf(Yt), cf = wt, uf = (0, Ro.default)((0, Ro.default)({}, cf.commonLocale), {}, {
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
ha.default = uf;
var nn = {};
Object.defineProperty(nn, "__esModule", {
  value: !0
});
nn.default = void 0;
const df = {
  placeholder: "Välj tid"
};
nn.default = df;
var nl = Ee.default;
Object.defineProperty(rn, "__esModule", {
  value: !0
});
rn.default = void 0;
var ff = nl(ha), vf = nl(nn);
const pf = {
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
  }, ff.default),
  timePickerLocale: Object.assign({}, vf.default)
};
rn.default = pf;
var hf = Ee.default;
Object.defineProperty(pa, "__esModule", {
  value: !0
});
pa.default = void 0;
var mf = hf(rn);
pa.default = mf.default;
var ma = Ee.default;
Object.defineProperty(Ji, "__esModule", {
  value: !0
});
var gf = Ji.default = void 0, bf = ma(va), yf = ma(pa), Sf = ma(rn), xf = ma(nn);
const at = "${label} är inte en giltig ${type}", Cf = {
  locale: "sv",
  Pagination: bf.default,
  DatePicker: Sf.default,
  TimePicker: xf.default,
  Calendar: yf.default,
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
gf = Ji.default = Cf;
var al = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, To = H.createContext && /* @__PURE__ */ H.createContext(al), Ef = ["attr", "size", "title"];
function $f(e, t) {
  if (e == null) return {};
  var r, n, a = _f(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (a[r] = e[r]);
  }
  return a;
}
function _f(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Mn() {
  return Mn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Mn.apply(null, arguments);
}
function Fo(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function An(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fo(Object(r), !0).forEach(function(n) {
      wf(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fo(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function wf(e, t, r) {
  return (t = Pf(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Pf(e) {
  var t = Of(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Of(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function il(e) {
  return e && e.map((t, r) => /* @__PURE__ */ H.createElement(t.tag, An({
    key: r
  }, t.attr), il(t.child)));
}
function hr(e) {
  return (t) => /* @__PURE__ */ H.createElement(Rf, Mn({
    attr: An({}, e.attr)
  }, t), il(e.child));
}
function Rf(e) {
  var t = (r) => {
    var {
      attr: n,
      size: a,
      title: i
    } = e, o = $f(e, Ef), s = a || r.size || "1em", l;
    return r.className && (l = r.className), e.className && (l = (l ? l + " " : "") + e.className), /* @__PURE__ */ H.createElement("svg", Mn({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, r.attr, n, o, {
      className: l,
      style: An(An({
        color: e.color || r.color
      }, r.style), e.style),
      height: s,
      width: s,
      xmlns: "http://www.w3.org/2000/svg"
    }), i && /* @__PURE__ */ H.createElement("title", null, i), e.children);
  };
  return To !== void 0 ? /* @__PURE__ */ H.createElement(To.Consumer, null, (r) => t(r)) : t(al);
}
function vb(e) {
  return hr({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "path", attr: { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }, child: [] }, { tag: "circle", attr: { cx: "12", cy: "7", r: "4" }, child: [] }] })(e);
}
function pb(e) {
  return hr({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "circle", attr: { cx: "18", cy: "15", r: "3" }, child: [] }, { tag: "circle", attr: { cx: "9", cy: "7", r: "4" }, child: [] }, { tag: "path", attr: { d: "M10 15H6a4 4 0 0 0-4 4v2" }, child: [] }, { tag: "path", attr: { d: "m21.7 16.4-.9-.3" }, child: [] }, { tag: "path", attr: { d: "m15.2 13.9-.9-.3" }, child: [] }, { tag: "path", attr: { d: "m16.6 18.7.3-.9" }, child: [] }, { tag: "path", attr: { d: "m19.1 12.2.3-.9" }, child: [] }, { tag: "path", attr: { d: "m19.6 18.7-.4-1" }, child: [] }, { tag: "path", attr: { d: "m16.8 12.3-.4-1" }, child: [] }, { tag: "path", attr: { d: "m14.3 16.6 1-.4" }, child: [] }, { tag: "path", attr: { d: "m20.7 13.8 1-.4" }, child: [] }] })(e);
}
function hb(e) {
  return hr({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "rect", attr: { width: "18", height: "18", x: "3", y: "3", rx: "2" }, child: [] }, { tag: "path", attr: { d: "M15 3v18" }, child: [] }] })(e);
}
function mb(e) {
  return hr({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "rect", attr: { width: "18", height: "18", x: "3", y: "3", rx: "2" }, child: [] }, { tag: "path", attr: { d: "M15 14v1" }, child: [] }, { tag: "path", attr: { d: "M15 19v2" }, child: [] }, { tag: "path", attr: { d: "M15 3v2" }, child: [] }, { tag: "path", attr: { d: "M15 9v1" }, child: [] }] })(e);
}
function gb(e) {
  return hr({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "path", attr: { d: "M15 3h6v6" }, child: [] }, { tag: "path", attr: { d: "M10 14 21 3" }, child: [] }, { tag: "path", attr: { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }, child: [] }] })(e);
}
function bb(e) {
  return hr({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "path", attr: { d: "M12 7v14" }, child: [] }, { tag: "path", attr: { d: "M16 12h2" }, child: [] }, { tag: "path", attr: { d: "M16 8h2" }, child: [] }, { tag: "path", attr: { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" }, child: [] }, { tag: "path", attr: { d: "M6 12h2" }, child: [] }, { tag: "path", attr: { d: "M6 8h2" }, child: [] }] })(e);
}
function Tf(e, t) {
  var r = Object.assign({}, e);
  return Array.isArray(t) && t.forEach(function(n) {
    delete r[n];
  }), r;
}
function J(e) {
  "@babel/helpers - typeof";
  return J = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, J(e);
}
var Ka = { exports: {} }, be = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mo;
function Ff() {
  if (Mo) return be;
  Mo = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), g;
  g = Symbol.for("react.module.reference");
  function m(f) {
    if (typeof f == "object" && f !== null) {
      var x = f.$$typeof;
      switch (x) {
        case e:
          switch (f = f.type, f) {
            case r:
            case a:
            case n:
            case c:
            case u:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case s:
                case o:
                case l:
                case v:
                case d:
                case i:
                  return f;
                default:
                  return x;
              }
          }
        case t:
          return x;
      }
    }
  }
  return be.ContextConsumer = o, be.ContextProvider = i, be.Element = e, be.ForwardRef = l, be.Fragment = r, be.Lazy = v, be.Memo = d, be.Portal = t, be.Profiler = a, be.StrictMode = n, be.Suspense = c, be.SuspenseList = u, be.isAsyncMode = function() {
    return !1;
  }, be.isConcurrentMode = function() {
    return !1;
  }, be.isContextConsumer = function(f) {
    return m(f) === o;
  }, be.isContextProvider = function(f) {
    return m(f) === i;
  }, be.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === e;
  }, be.isForwardRef = function(f) {
    return m(f) === l;
  }, be.isFragment = function(f) {
    return m(f) === r;
  }, be.isLazy = function(f) {
    return m(f) === v;
  }, be.isMemo = function(f) {
    return m(f) === d;
  }, be.isPortal = function(f) {
    return m(f) === t;
  }, be.isProfiler = function(f) {
    return m(f) === a;
  }, be.isStrictMode = function(f) {
    return m(f) === n;
  }, be.isSuspense = function(f) {
    return m(f) === c;
  }, be.isSuspenseList = function(f) {
    return m(f) === u;
  }, be.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === r || f === a || f === n || f === c || f === u || f === b || typeof f == "object" && f !== null && (f.$$typeof === v || f.$$typeof === d || f.$$typeof === i || f.$$typeof === o || f.$$typeof === l || f.$$typeof === g || f.getModuleId !== void 0);
  }, be.typeOf = m, be;
}
var ye = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ao;
function Mf() {
  return Ao || (Ao = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), g = !1, m = !1, f = !1, x = !1, h = !1, $;
    $ = Symbol.for("react.module.reference");
    function P(L) {
      return !!(typeof L == "string" || typeof L == "function" || L === r || L === a || h || L === n || L === c || L === u || x || L === b || g || m || f || typeof L == "object" && L !== null && (L.$$typeof === v || L.$$typeof === d || L.$$typeof === i || L.$$typeof === o || L.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      L.$$typeof === $ || L.getModuleId !== void 0));
    }
    function C(L) {
      if (typeof L == "object" && L !== null) {
        var $e = L.$$typeof;
        switch ($e) {
          case e:
            var Y = L.type;
            switch (Y) {
              case r:
              case a:
              case n:
              case c:
              case u:
                return Y;
              default:
                var oe = Y && Y.$$typeof;
                switch (oe) {
                  case s:
                  case o:
                  case l:
                  case v:
                  case d:
                  case i:
                    return oe;
                  default:
                    return $e;
                }
            }
          case t:
            return $e;
        }
      }
    }
    var _ = o, y = i, w = e, O = l, T = r, j = v, k = d, F = t, M = a, I = n, N = c, V = u, z = !1, Q = !1;
    function X(L) {
      return z || (z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function Z(L) {
      return Q || (Q = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function q(L) {
      return C(L) === o;
    }
    function W(L) {
      return C(L) === i;
    }
    function U(L) {
      return typeof L == "object" && L !== null && L.$$typeof === e;
    }
    function de(L) {
      return C(L) === l;
    }
    function ie(L) {
      return C(L) === r;
    }
    function ve(L) {
      return C(L) === v;
    }
    function le(L) {
      return C(L) === d;
    }
    function fe(L) {
      return C(L) === t;
    }
    function ce(L) {
      return C(L) === a;
    }
    function we(L) {
      return C(L) === n;
    }
    function Pe(L) {
      return C(L) === c;
    }
    function Ie(L) {
      return C(L) === u;
    }
    ye.ContextConsumer = _, ye.ContextProvider = y, ye.Element = w, ye.ForwardRef = O, ye.Fragment = T, ye.Lazy = j, ye.Memo = k, ye.Portal = F, ye.Profiler = M, ye.StrictMode = I, ye.Suspense = N, ye.SuspenseList = V, ye.isAsyncMode = X, ye.isConcurrentMode = Z, ye.isContextConsumer = q, ye.isContextProvider = W, ye.isElement = U, ye.isForwardRef = de, ye.isFragment = ie, ye.isLazy = ve, ye.isMemo = le, ye.isPortal = fe, ye.isProfiler = ce, ye.isStrictMode = we, ye.isSuspense = Pe, ye.isSuspenseList = Ie, ye.isValidElementType = P, ye.typeOf = C;
  }()), ye;
}
process.env.NODE_ENV === "production" ? Ka.exports = Ff() : Ka.exports = Mf();
var Ra = Ka.exports;
function Qi(e, t, r) {
  var n = S.useRef({});
  return (!("value" in n.current) || r(n.current.condition, t)) && (n.current.value = e(), n.current.condition = t), n.current.value;
}
var Af = Symbol.for("react.element"), jf = Symbol.for("react.transitional.element"), kf = Symbol.for("react.fragment");
function ol(e) {
  return (
    // Base object type
    e && J(e) === "object" && // React Element type
    (e.$$typeof === Af || e.$$typeof === jf) && // React Fragment type
    e.type === kf
  );
}
var If = Number(uu.split(".")[0]), sl = function(t, r) {
  typeof t == "function" ? t(r) : J(t) === "object" && t && "current" in t && (t.current = r);
}, ll = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var a = r.filter(Boolean);
  return a.length <= 1 ? a[0] : function(i) {
    r.forEach(function(o) {
      sl(o, i);
    });
  };
}, Nf = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  return Qi(function() {
    return ll.apply(void 0, r);
  }, r, function(a, i) {
    return a.length !== i.length || a.every(function(o, s) {
      return o !== i[s];
    });
  });
}, cl = function(t) {
  var r, n;
  if (!t)
    return !1;
  if (ul(t) && If >= 19)
    return !0;
  var a = Ra.isMemo(t) ? t.type.type : t.type;
  return !(typeof a == "function" && !((r = a.prototype) !== null && r !== void 0 && r.render) && a.$$typeof !== Ra.ForwardRef || typeof t == "function" && !((n = t.prototype) !== null && n !== void 0 && n.render) && t.$$typeof !== Ra.ForwardRef);
};
function ul(e) {
  return /* @__PURE__ */ cu(e) && !ol(e);
}
var dl = function(t) {
  if (t && ul(t)) {
    var r = t;
    return r.props.propertyIsEnumerable("ref") ? r.props.ref : r.ref;
  }
  return null;
}, Xa = {}, Zi = [], Df = function(t) {
  Zi.push(t);
};
function jr(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = Zi.reduce(function(n, a) {
      return a(n ?? "", "warning");
    }, t);
    r && console.error("Warning: ".concat(r));
  }
}
function Vf(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = Zi.reduce(function(n, a) {
      return a(n ?? "", "note");
    }, t);
    r && console.warn("Note: ".concat(r));
  }
}
function fl() {
  Xa = {};
}
function vl(e, t, r) {
  !t && !Xa[r] && (e(!1, r), Xa[r] = !0);
}
function Me(e, t) {
  vl(jr, e, t);
}
function Lf(e, t) {
  vl(Vf, e, t);
}
Me.preMessage = Df;
Me.resetWarned = fl;
Me.noteOnce = Lf;
function pl() {
}
let Pt = null;
function zf() {
  Pt = null, fl();
}
let eo = pl;
process.env.NODE_ENV !== "production" && (eo = (e, t, r) => {
  Me(e, `[antd: ${t}] ${r}`), process.env.NODE_ENV === "test" && zf();
});
const hl = /* @__PURE__ */ S.createContext({}), Ut = process.env.NODE_ENV !== "production" ? (e) => {
  const {
    strict: t
  } = S.useContext(hl), r = (n, a, i) => {
    if (!n)
      if (t === !1 && a === "deprecated") {
        const o = Pt;
        Pt || (Pt = {}), Pt[e] = Pt[e] || [], Pt[e].includes(i || "") || Pt[e].push(i || ""), o || console.warn("[antd] There exists deprecated usage in your code:", Pt);
      } else
        process.env.NODE_ENV !== "production" && eo(n, e, i);
  };
  return r.deprecated = (n, a, i, o) => {
    r(n, "deprecated", `\`${a}\` is deprecated. Please use \`${i}\` instead.${o ? ` ${o}` : ""}`);
  }, r;
} : () => {
  const e = () => {
  };
  return e.deprecated = pl, e;
}, ga = eo;
function ml(e) {
  if (Array.isArray(e)) return e;
}
function Hf(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, s = [], l = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        l = !1;
      } else for (; !(l = (n = i.call(r)).done) && (s.push(n.value), s.length !== t); l = !0) ;
    } catch (u) {
      c = !0, a = u;
    } finally {
      try {
        if (!l && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return s;
  }
}
function Ja(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function to(e, t) {
  if (e) {
    if (typeof e == "string") return Ja(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Ja(e, t) : void 0;
  }
}
function gl() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function B(e, t) {
  return ml(e) || Hf(e, t) || to(e, t) || gl();
}
function Bf(e, t) {
  if (J(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (J(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function bl(e) {
  var t = Bf(e, "string");
  return J(t) == "symbol" ? t : t + "";
}
function E(e, t, r) {
  return (t = bl(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function Wf(e) {
  if (Array.isArray(e)) return Ja(e);
}
function yl(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function qf() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function K(e) {
  return Wf(e) || yl(e) || to(e) || qf();
}
function jo(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function R(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jo(Object(r), !0).forEach(function(n) {
      E(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : jo(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function kr(e) {
  for (var t = 0, r, n = 0, a = e.length; a >= 4; ++n, a -= 4)
    r = e.charCodeAt(n) & 255 | (e.charCodeAt(++n) & 255) << 8 | (e.charCodeAt(++n) & 255) << 16 | (e.charCodeAt(++n) & 255) << 24, r = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), r ^= /* k >>> r: */
    r >>> 24, t = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (a) {
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
function Tt() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function Uf(e, t) {
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
var ko = "data-rc-order", Io = "data-rc-priority", Yf = "rc-util-key", Qa = /* @__PURE__ */ new Map();
function Sl() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.mark;
  return t ? t.startsWith("data-") ? t : "data-".concat(t) : Yf;
}
function ba(e) {
  if (e.attachTo)
    return e.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function Gf(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function ro(e) {
  return Array.from((Qa.get(e) || e).children).filter(function(t) {
    return t.tagName === "STYLE";
  });
}
function xl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Tt())
    return null;
  var r = t.csp, n = t.prepend, a = t.priority, i = a === void 0 ? 0 : a, o = Gf(n), s = o === "prependQueue", l = document.createElement("style");
  l.setAttribute(ko, o), s && i && l.setAttribute(Io, "".concat(i)), r != null && r.nonce && (l.nonce = r == null ? void 0 : r.nonce), l.innerHTML = e;
  var c = ba(t), u = c.firstChild;
  if (n) {
    if (s) {
      var d = (t.styles || ro(c)).filter(function(v) {
        if (!["prepend", "prependQueue"].includes(v.getAttribute(ko)))
          return !1;
        var b = Number(v.getAttribute(Io) || 0);
        return i >= b;
      });
      if (d.length)
        return c.insertBefore(l, d[d.length - 1].nextSibling), l;
    }
    c.insertBefore(l, u);
  } else
    c.appendChild(l);
  return l;
}
function Cl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = ba(t);
  return (t.styles || ro(r)).find(function(n) {
    return n.getAttribute(Sl(t)) === e;
  });
}
function El(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = Cl(e, t);
  if (r) {
    var n = ba(t);
    n.removeChild(r);
  }
}
function Kf(e, t) {
  var r = Qa.get(e);
  if (!r || !Uf(document, r)) {
    var n = xl("", t), a = n.parentNode;
    Qa.set(e, a), e.removeChild(n);
  }
}
function Wt(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = ba(r), a = ro(n), i = R(R({}, r), {}, {
    styles: a
  });
  Kf(n, i);
  var o = Cl(t, i);
  if (o) {
    var s, l;
    if ((s = i.csp) !== null && s !== void 0 && s.nonce && o.nonce !== ((l = i.csp) === null || l === void 0 ? void 0 : l.nonce)) {
      var c;
      o.nonce = (c = i.csp) === null || c === void 0 ? void 0 : c.nonce;
    }
    return o.innerHTML !== e && (o.innerHTML = e), o;
  }
  var u = xl(e, i);
  return u.setAttribute(Sl(i), t), u;
}
function Xf(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function ht(e, t) {
  if (e == null) return {};
  var r, n, a = Xf(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (a[r] = e[r]);
  }
  return a;
}
function Za(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = /* @__PURE__ */ new Set();
  function a(i, o) {
    var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, l = n.has(i);
    if (Me(!l, "Warning: There may be circular references"), l)
      return !1;
    if (i === o)
      return !0;
    if (r && s > 1)
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
    if (i && o && J(i) === "object" && J(o) === "object") {
      var d = Object.keys(i);
      return d.length !== Object.keys(o).length ? !1 : d.every(function(v) {
        return a(i[v], o[v], c);
      });
    }
    return !1;
  }
  return a(e, t);
}
function Ue(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function No(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, bl(n.key), n);
  }
}
function Ye(e, t, r) {
  return t && No(e.prototype, t), r && No(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
var Jf = "%";
function ei(e) {
  return e.join(Jf);
}
var Qf = /* @__PURE__ */ function() {
  function e(t) {
    Ue(this, e), E(this, "instanceId", void 0), E(this, "cache", /* @__PURE__ */ new Map()), this.instanceId = t;
  }
  return Ye(e, [{
    key: "get",
    value: function(r) {
      return this.opGet(ei(r));
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
      return this.opUpdate(ei(r), n);
    }
    /** A fast get cache with `get` concat. */
  }, {
    key: "opUpdate",
    value: function(r, n) {
      var a = this.cache.get(r), i = n(a);
      i === null ? this.cache.delete(r) : this.cache.set(r, i);
    }
  }]), e;
}(), lr = "data-token-hash", xt = "data-css-hash", Zf = "data-cache-path", It = "__cssinjs_instance__";
function ev() {
  var e = Math.random().toString(12).slice(2);
  if (typeof document < "u" && document.head && document.body) {
    var t = document.body.querySelectorAll("style[".concat(xt, "]")) || [], r = document.head.firstChild;
    Array.from(t).forEach(function(a) {
      a[It] = a[It] || e, a[It] === e && document.head.insertBefore(a, r);
    });
    var n = {};
    Array.from(document.querySelectorAll("style[".concat(xt, "]"))).forEach(function(a) {
      var i = a.getAttribute(xt);
      if (n[i]) {
        if (a[It] === e) {
          var o;
          (o = a.parentNode) === null || o === void 0 || o.removeChild(a);
        }
      } else
        n[i] = !0;
    });
  }
  return new Qf(e);
}
var an = /* @__PURE__ */ S.createContext({
  hashPriority: "low",
  cache: ev(),
  defaultCache: !0
});
function ne(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ir(e, t) {
  return Ir = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, Ir(e, t);
}
function Gt(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Ir(e, t);
}
function Nr(e) {
  return Nr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Nr(e);
}
function no() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (no = function() {
    return !!e;
  })();
}
function tv(e, t) {
  if (t && (J(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return ne(e);
}
function Kt(e) {
  var t = no();
  return function() {
    var r, n = Nr(e);
    if (t) {
      var a = Nr(this).constructor;
      r = Reflect.construct(n, arguments, a);
    } else r = n.apply(this, arguments);
    return tv(this, r);
  };
}
function rv(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
var ao = /* @__PURE__ */ function() {
  function e() {
    Ue(this, e), E(this, "cache", void 0), E(this, "keys", void 0), E(this, "cacheCallTimes", void 0), this.cache = /* @__PURE__ */ new Map(), this.keys = [], this.cacheCallTimes = 0;
  }
  return Ye(e, [{
    key: "size",
    value: function() {
      return this.keys.length;
    }
  }, {
    key: "internalGet",
    value: function(r) {
      var n, a, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, o = {
        map: this.cache
      };
      return r.forEach(function(s) {
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
      var a = this;
      if (!this.has(r)) {
        if (this.size() + 1 > e.MAX_CACHE_SIZE + e.MAX_CACHE_OFFSET) {
          var i = this.keys.reduce(function(c, u) {
            var d = B(c, 2), v = d[1];
            return a.internalGet(u)[1] < v ? [u, a.internalGet(u)[1]] : c;
          }, [this.keys[0], this.cacheCallTimes]), o = B(i, 1), s = o[0];
          this.delete(s);
        }
        this.keys.push(r);
      }
      var l = this.cache;
      r.forEach(function(c, u) {
        if (u === r.length - 1)
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
    value: function(r, n) {
      var a = r.get(n[0]);
      if (n.length === 1) {
        var i;
        return a.map ? r.set(n[0], {
          map: a.map
        }) : r.delete(n[0]), (i = a.value) === null || i === void 0 ? void 0 : i[0];
      }
      var o = this.deleteByPath(a.map, n.slice(1));
      return (!a.map || a.map.size === 0) && !a.value && r.delete(n[0]), o;
    }
  }, {
    key: "delete",
    value: function(r) {
      if (this.has(r))
        return this.keys = this.keys.filter(function(n) {
          return !rv(n, r);
        }), this.deleteByPath(this.cache, r);
    }
  }]), e;
}();
E(ao, "MAX_CACHE_SIZE", 20);
E(ao, "MAX_CACHE_OFFSET", 5);
var Do = 0, $l = /* @__PURE__ */ function() {
  function e(t) {
    Ue(this, e), E(this, "derivatives", void 0), E(this, "id", void 0), this.derivatives = Array.isArray(t) ? t : [t], this.id = Do, t.length === 0 && jr(t.length > 0, "[Ant Design CSS-in-JS] Theme should have at least one derivative function."), Do += 1;
  }
  return Ye(e, [{
    key: "getDerivativeToken",
    value: function(r) {
      return this.derivatives.reduce(function(n, a) {
        return a(r, n);
      }, void 0);
    }
  }]), e;
}(), Ta = new ao();
function ti(e) {
  var t = Array.isArray(e) ? e : [e];
  return Ta.has(t) || Ta.set(t, new $l(t)), Ta.get(t);
}
var nv = /* @__PURE__ */ new WeakMap(), Fa = {};
function av(e, t) {
  for (var r = nv, n = 0; n < t.length; n += 1) {
    var a = t[n];
    r.has(a) || r.set(a, /* @__PURE__ */ new WeakMap()), r = r.get(a);
  }
  return r.has(Fa) || r.set(Fa, e()), r.get(Fa);
}
var Vo = /* @__PURE__ */ new WeakMap();
function Fr(e) {
  var t = Vo.get(e) || "";
  return t || (Object.keys(e).forEach(function(r) {
    var n = e[r];
    t += r, n instanceof $l ? t += n.id : n && J(n) === "object" ? t += Fr(n) : t += n;
  }), t = kr(t), Vo.set(e, t)), t;
}
function Lo(e, t) {
  return kr("".concat(t, "_").concat(Fr(e)));
}
var ri = Tt();
function ke(e) {
  return typeof e == "number" ? "".concat(e, "px") : e;
}
function jn(e, t, r) {
  var n, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
  if (i)
    return e;
  var o = R(R({}, a), {}, (n = {}, E(n, lr, t), E(n, xt, r), n)), s = Object.keys(o).map(function(l) {
    var c = o[l];
    return c ? "".concat(l, '="').concat(c, '"') : null;
  }).filter(function(l) {
    return l;
  }).join(" ");
  return "<style ".concat(s, ">").concat(e, "</style>");
}
var _n = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return "--".concat(r ? "".concat(r, "-") : "").concat(t).replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
}, iv = function(t, r, n) {
  return Object.keys(t).length ? ".".concat(r).concat(n != null && n.scope ? ".".concat(n.scope) : "", "{").concat(Object.entries(t).map(function(a) {
    var i = B(a, 2), o = i[0], s = i[1];
    return "".concat(o, ":").concat(s, ";");
  }).join(""), "}") : "";
}, _l = function(t, r, n) {
  var a = {}, i = {};
  return Object.entries(t).forEach(function(o) {
    var s, l, c = B(o, 2), u = c[0], d = c[1];
    if (n != null && (s = n.preserve) !== null && s !== void 0 && s[u])
      i[u] = d;
    else if ((typeof d == "string" || typeof d == "number") && !(n != null && (l = n.ignore) !== null && l !== void 0 && l[u])) {
      var v, b = _n(u, n == null ? void 0 : n.prefix);
      a[b] = typeof d == "number" && !(n != null && (v = n.unitless) !== null && v !== void 0 && v[u]) ? "".concat(d, "px") : String(d), i[u] = "var(".concat(b, ")");
    }
  }), [i, iv(a, r, {
    scope: n == null ? void 0 : n.scope
  })];
}, zo = process.env.NODE_ENV !== "test" && Tt() ? S.useLayoutEffect : S.useEffect, kn = function(t, r) {
  var n = S.useRef(!0);
  zo(function() {
    return t(n.current);
  }, r), zo(function() {
    return n.current = !1, function() {
      n.current = !0;
    };
  }, []);
}, Ho = function(t, r) {
  kn(function(n) {
    if (!n)
      return t();
  }, r);
}, ov = R({}, S), Bo = ov.useInsertionEffect, sv = function(t, r, n) {
  S.useMemo(t, n), kn(function() {
    return r(!0);
  }, n);
}, lv = Bo ? function(e, t, r) {
  return Bo(function() {
    return e(), t();
  }, r);
} : sv, cv = R({}, S), uv = cv.useInsertionEffect, dv = function(t) {
  var r = [], n = !1;
  function a(i) {
    if (n) {
      process.env.NODE_ENV !== "production" && jr(!1, "[Ant Design CSS-in-JS] You are registering a cleanup function after unmount, which will not have any effect.");
      return;
    }
    r.push(i);
  }
  return S.useEffect(function() {
    return n = !1, function() {
      n = !0, r.length && r.forEach(function(i) {
        return i();
      });
    };
  }, t), a;
}, fv = function() {
  return function(t) {
    t();
  };
}, vv = typeof uv < "u" ? dv : fv;
function pv() {
  return !1;
}
var ni = !1;
function hv() {
  return ni;
}
const mv = process.env.NODE_ENV === "production" ? pv : hv;
if (process.env.NODE_ENV !== "production" && typeof module < "u" && module && module.hot && typeof window < "u") {
  var pn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : null;
  if (pn && typeof pn.webpackHotUpdate == "function") {
    var gv = pn.webpackHotUpdate;
    pn.webpackHotUpdate = function() {
      return ni = !0, setTimeout(function() {
        ni = !1;
      }, 0), gv.apply(void 0, arguments);
    };
  }
}
function io(e, t, r, n, a) {
  var i = S.useContext(an), o = i.cache, s = [e].concat(K(t)), l = ei(s), c = vv([l]), u = mv(), d = function(m) {
    o.opUpdate(l, function(f) {
      var x = f || [void 0, void 0], h = B(x, 2), $ = h[0], P = $ === void 0 ? 0 : $, C = h[1], _ = C;
      process.env.NODE_ENV !== "production" && C && u && (n == null || n(_, u), _ = null);
      var y = _ || r(), w = [P, y];
      return m ? m(w) : w;
    });
  };
  S.useMemo(
    function() {
      d();
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [l]
    /* eslint-enable */
  );
  var v = o.opGet(l);
  process.env.NODE_ENV !== "production" && !v && (d(), v = o.opGet(l));
  var b = v[1];
  return lv(function() {
    a == null || a(b);
  }, function(g) {
    return d(function(m) {
      var f = B(m, 2), x = f[0], h = f[1];
      return g && x === 0 && (a == null || a(b)), [x + 1, h];
    }), function() {
      o.opUpdate(l, function(m) {
        var f = m || [], x = B(f, 2), h = x[0], $ = h === void 0 ? 0 : h, P = x[1], C = $ - 1;
        return C === 0 ? (c(function() {
          (g || !o.opGet(l)) && (n == null || n(P, !1));
        }), null) : [$ - 1, P];
      });
    };
  }, [l]), b;
}
var bv = {}, yv = process.env.NODE_ENV !== "production" ? "css-dev-only-do-not-override" : "css", Ht = /* @__PURE__ */ new Map();
function Sv(e) {
  Ht.set(e, (Ht.get(e) || 0) + 1);
}
function xv(e, t) {
  if (typeof document < "u") {
    var r = document.querySelectorAll("style[".concat(lr, '="').concat(e, '"]'));
    r.forEach(function(n) {
      if (n[It] === t) {
        var a;
        (a = n.parentNode) === null || a === void 0 || a.removeChild(n);
      }
    });
  }
}
var Cv = 0;
function Ev(e, t) {
  Ht.set(e, (Ht.get(e) || 0) - 1);
  var r = Array.from(Ht.keys()), n = r.filter(function(a) {
    var i = Ht.get(a) || 0;
    return i <= 0;
  });
  r.length - n.length > Cv && n.forEach(function(a) {
    xv(a, t), Ht.delete(a);
  });
}
var $v = function(t, r, n, a) {
  var i = n.getDerivativeToken(t), o = R(R({}, i), r);
  return a && (o = a(o)), o;
}, wl = "token";
function _v(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = Rt(an), a = n.cache.instanceId, i = n.container, o = r.salt, s = o === void 0 ? "" : o, l = r.override, c = l === void 0 ? bv : l, u = r.formatToken, d = r.getComputedToken, v = r.cssVar, b = av(function() {
    return Object.assign.apply(Object, [{}].concat(K(t)));
  }, t), g = Fr(b), m = Fr(c), f = v ? Fr(v) : "", x = io(wl, [s, e.id, g, m, f], function() {
    var h, $ = d ? d(b, c, e) : $v(b, c, e, u), P = R({}, $), C = "";
    if (v) {
      var _ = _l($, v.key, {
        prefix: v.prefix,
        ignore: v.ignore,
        unitless: v.unitless,
        preserve: v.preserve
      }), y = B(_, 2);
      $ = y[0], C = y[1];
    }
    var w = Lo($, s);
    $._tokenKey = w, P._tokenKey = Lo(P, s);
    var O = (h = v == null ? void 0 : v.key) !== null && h !== void 0 ? h : w;
    $._themeKey = O, Sv(O);
    var T = "".concat(yv, "-").concat(kr(w));
    return $._hashId = T, [$, T, P, C, (v == null ? void 0 : v.key) || ""];
  }, function(h) {
    Ev(h[0]._themeKey, a);
  }, function(h) {
    var $ = B(h, 4), P = $[0], C = $[3];
    if (v && C) {
      var _ = Wt(C, kr("css-variables-".concat(P._themeKey)), {
        mark: xt,
        prepend: "queue",
        attachTo: i,
        priority: -999
      });
      _[It] = a, _.setAttribute(lr, P._themeKey);
    }
  });
  return x;
}
var wv = function(t, r, n) {
  var a = B(t, 5), i = a[2], o = a[3], s = a[4], l = n || {}, c = l.plain;
  if (!o)
    return null;
  var u = i._tokenKey, d = -999, v = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(d)
  }, b = jn(o, s, u, v, c);
  return [d, u, b];
};
function Ke() {
  return Ke = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ke.apply(null, arguments);
}
var Pv = {
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
}, Pl = "comm", Ol = "rule", Rl = "decl", Ov = "@import", Rv = "@namespace", Tv = "@keyframes", Fv = "@layer", Tl = Math.abs, oo = String.fromCharCode;
function Fl(e) {
  return e.trim();
}
function wn(e, t, r) {
  return e.replace(t, r);
}
function Mv(e, t, r) {
  return e.indexOf(t, r);
}
function or(e, t) {
  return e.charCodeAt(t) | 0;
}
function cr(e, t, r) {
  return e.slice(t, r);
}
function $t(e) {
  return e.length;
}
function Av(e) {
  return e.length;
}
function hn(e, t) {
  return t.push(e), e;
}
var ya = 1, ur = 1, Ml = 0, mt = 0, Ve = 0, mr = "";
function so(e, t, r, n, a, i, o, s) {
  return { value: e, root: t, parent: r, type: n, props: a, children: i, line: ya, column: ur, length: o, return: "", siblings: s };
}
function jv() {
  return Ve;
}
function kv() {
  return Ve = mt > 0 ? or(mr, --mt) : 0, ur--, Ve === 10 && (ur = 1, ya--), Ve;
}
function Ct() {
  return Ve = mt < Ml ? or(mr, mt++) : 0, ur++, Ve === 10 && (ur = 1, ya++), Ve;
}
function Nt() {
  return or(mr, mt);
}
function Pn() {
  return mt;
}
function Sa(e, t) {
  return cr(mr, e, t);
}
function Dr(e) {
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
function Iv(e) {
  return ya = ur = 1, Ml = $t(mr = e), mt = 0, [];
}
function Nv(e) {
  return mr = "", e;
}
function Ma(e) {
  return Fl(Sa(mt - 1, ai(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Dv(e) {
  for (; (Ve = Nt()) && Ve < 33; )
    Ct();
  return Dr(e) > 2 || Dr(Ve) > 3 ? "" : " ";
}
function Vv(e, t) {
  for (; --t && Ct() && !(Ve < 48 || Ve > 102 || Ve > 57 && Ve < 65 || Ve > 70 && Ve < 97); )
    ;
  return Sa(e, Pn() + (t < 6 && Nt() == 32 && Ct() == 32));
}
function ai(e) {
  for (; Ct(); )
    switch (Ve) {
      case e:
        return mt;
      case 34:
      case 39:
        e !== 34 && e !== 39 && ai(Ve);
        break;
      case 40:
        e === 41 && ai(e);
        break;
      case 92:
        Ct();
        break;
    }
  return mt;
}
function Lv(e, t) {
  for (; Ct() && e + Ve !== 57; )
    if (e + Ve === 84 && Nt() === 47)
      break;
  return "/*" + Sa(t, mt - 1) + "*" + oo(e === 47 ? e : Ct());
}
function zv(e) {
  for (; !Dr(Nt()); )
    Ct();
  return Sa(e, mt);
}
function Hv(e) {
  return Nv(On("", null, null, null, [""], e = Iv(e), 0, [0], e));
}
function On(e, t, r, n, a, i, o, s, l) {
  for (var c = 0, u = 0, d = o, v = 0, b = 0, g = 0, m = 1, f = 1, x = 1, h = 0, $ = "", P = a, C = i, _ = n, y = $; f; )
    switch (g = h, h = Ct()) {
      case 40:
        if (g != 108 && or(y, d - 1) == 58) {
          Mv(y += wn(Ma(h), "&", "&\f"), "&\f", Tl(c ? s[c - 1] : 0)) != -1 && (x = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        y += Ma(h);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        y += Dv(g);
        break;
      case 92:
        y += Vv(Pn() - 1, 7);
        continue;
      case 47:
        switch (Nt()) {
          case 42:
          case 47:
            hn(Bv(Lv(Ct(), Pn()), t, r, l), l), (Dr(g || 1) == 5 || Dr(Nt() || 1) == 5) && $t(y) && cr(y, -1, void 0) !== " " && (y += " ");
            break;
          default:
            y += "/";
        }
        break;
      case 123 * m:
        s[c++] = $t(y) * x;
      case 125 * m:
      case 59:
      case 0:
        switch (h) {
          case 0:
          case 125:
            f = 0;
          case 59 + u:
            x == -1 && (y = wn(y, /\f/g, "")), b > 0 && ($t(y) - d || m === 0 && g === 47) && hn(b > 32 ? qo(y + ";", n, r, d - 1, l) : qo(wn(y, " ", "") + ";", n, r, d - 2, l), l);
            break;
          case 59:
            y += ";";
          default:
            if (hn(_ = Wo(y, t, r, c, u, a, s, $, P = [], C = [], d, i), i), h === 123)
              if (u === 0)
                On(y, t, _, _, P, i, d, s, C);
              else {
                switch (v) {
                  case 99:
                    if (or(y, 3) === 110) break;
                  case 108:
                    if (or(y, 2) === 97) break;
                  default:
                    u = 0;
                  case 100:
                  case 109:
                  case 115:
                }
                u ? On(e, _, _, n && hn(Wo(e, _, _, 0, 0, a, s, $, a, P = [], d, C), C), a, C, d, s, n ? P : C) : On(y, _, _, _, [""], C, 0, s, C);
              }
        }
        c = u = b = 0, m = x = 1, $ = y = "", d = o;
        break;
      case 58:
        d = 1 + $t(y), b = g;
      default:
        if (m < 1) {
          if (h == 123)
            --m;
          else if (h == 125 && m++ == 0 && kv() == 125)
            continue;
        }
        switch (y += oo(h), h * m) {
          case 38:
            x = u > 0 ? 1 : (y += "\f", -1);
            break;
          case 44:
            s[c++] = ($t(y) - 1) * x, x = 1;
            break;
          case 64:
            Nt() === 45 && (y += Ma(Ct())), v = Nt(), u = d = $t($ = y += zv(Pn())), h++;
            break;
          case 45:
            g === 45 && $t(y) == 2 && (m = 0);
        }
    }
  return i;
}
function Wo(e, t, r, n, a, i, o, s, l, c, u, d) {
  for (var v = a - 1, b = a === 0 ? i : [""], g = Av(b), m = 0, f = 0, x = 0; m < n; ++m)
    for (var h = 0, $ = cr(e, v + 1, v = Tl(f = o[m])), P = e; h < g; ++h)
      (P = Fl(f > 0 ? b[h] + " " + $ : wn($, /&\f/g, b[h]))) && (l[x++] = P);
  return so(e, t, r, a === 0 ? Ol : s, l, c, u, d);
}
function Bv(e, t, r, n) {
  return so(e, t, r, Pl, oo(jv()), cr(e, 2, -2), 0, n);
}
function qo(e, t, r, n, a) {
  return so(e, t, r, Rl, cr(e, 0, n), cr(e, n + 1, -1), n, a);
}
function ii(e, t) {
  for (var r = "", n = 0; n < e.length; n++)
    r += t(e[n], n, e, t) || "";
  return r;
}
function Wv(e, t, r, n) {
  switch (e.type) {
    case Fv:
      if (e.children.length) break;
    case Ov:
    case Rv:
    case Rl:
      return e.return = e.return || e.value;
    case Pl:
      return "";
    case Tv:
      return e.return = e.value + "{" + ii(e.children, n) + "}";
    case Ol:
      if (!$t(e.value = e.props.join(","))) return "";
  }
  return $t(r = ii(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function Al(e, t) {
  var r = t.path, n = t.parentSelectors;
  Me(!1, "[Ant Design CSS-in-JS] ".concat(r ? "Error in ".concat(r, ": ") : "").concat(e).concat(n.length ? " Selector: ".concat(n.join(" | ")) : ""));
}
var qv = function(t, r, n) {
  if (t === "content") {
    var a = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, i = ["normal", "none", "initial", "inherit", "unset"];
    (typeof r != "string" || i.indexOf(r) === -1 && !a.test(r) && (r.charAt(0) !== r.charAt(r.length - 1) || r.charAt(0) !== '"' && r.charAt(0) !== "'")) && Al("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"".concat(r, "\"'`."), n);
  }
}, Uv = function(t, r, n) {
  t === "animation" && n.hashId && r !== "none" && Al("You seem to be using hashed animation '".concat(r, "', in which case 'animationName' with Keyframe as value is recommended."), n);
}, Uo = "data-ant-cssinjs-cache-path", jl = "_FILE_STYLE__", qt, kl = !0;
function Yv() {
  if (!qt && (qt = {}, Tt())) {
    var e = document.createElement("div");
    e.className = Uo, e.style.position = "fixed", e.style.visibility = "hidden", e.style.top = "-9999px", document.body.appendChild(e);
    var t = getComputedStyle(e).content || "";
    t = t.replace(/^"/, "").replace(/"$/, ""), t.split(";").forEach(function(a) {
      var i = a.split(":"), o = B(i, 2), s = o[0], l = o[1];
      qt[s] = l;
    });
    var r = document.querySelector("style[".concat(Uo, "]"));
    if (r) {
      var n;
      kl = !1, (n = r.parentNode) === null || n === void 0 || n.removeChild(r);
    }
    document.body.removeChild(e);
  }
}
function Gv(e) {
  return Yv(), !!qt[e];
}
function Kv(e) {
  var t = qt[e], r = null;
  if (t && Tt())
    if (kl)
      r = jl;
    else {
      var n = document.querySelector("style[".concat(xt, '="').concat(qt[e], '"]'));
      n ? r = n.innerHTML : delete qt[e];
    }
  return [r, t];
}
var Il = "_skip_check_", Nl = "_multi_value_";
function Rn(e) {
  var t = ii(Hv(e), Wv);
  return t.replace(/\{%%%\:[^;];}/g, ";");
}
function Xv(e) {
  return J(e) === "object" && e && (Il in e || Nl in e);
}
function Yo(e, t, r) {
  if (!t)
    return e;
  var n = ".".concat(t), a = r === "low" ? ":where(".concat(n, ")") : n, i = e.split(",").map(function(o) {
    var s, l = o.trim().split(/\s+/), c = l[0] || "", u = ((s = c.match(/^\w+/)) === null || s === void 0 ? void 0 : s[0]) || "";
    return c = "".concat(u).concat(a).concat(c.slice(u.length)), [c].concat(K(l.slice(1))).join(" ");
  });
  return i.join(",");
}
var Jv = function e(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    root: !0,
    parentSelectors: []
  }, a = n.root, i = n.injectHash, o = n.parentSelectors, s = r.hashId, l = r.layer, c = r.path, u = r.hashPriority, d = r.transformers, v = d === void 0 ? [] : d, b = r.linters, g = b === void 0 ? [] : b, m = "", f = {};
  function x(P) {
    var C = P.getName(s);
    if (!f[C]) {
      var _ = e(P.style, r, {
        root: !1,
        parentSelectors: o
      }), y = B(_, 1), w = y[0];
      f[C] = "@keyframes ".concat(P.getName(s)).concat(w);
    }
  }
  function h(P) {
    var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    return P.forEach(function(_) {
      Array.isArray(_) ? h(_, C) : _ && C.push(_);
    }), C;
  }
  var $ = h(Array.isArray(t) ? t : [t]);
  return $.forEach(function(P) {
    var C = typeof P == "string" && !a ? {} : P;
    if (typeof C == "string")
      m += "".concat(C, `
`);
    else if (C._keyframe)
      x(C);
    else {
      var _ = v.reduce(function(y, w) {
        var O;
        return (w == null || (O = w.visit) === null || O === void 0 ? void 0 : O.call(w, y)) || y;
      }, C);
      Object.keys(_).forEach(function(y) {
        var w = _[y];
        if (J(w) === "object" && w && (y !== "animationName" || !w._keyframe) && !Xv(w)) {
          var O = !1, T = y.trim(), j = !1;
          (a || i) && s ? T.startsWith("@") ? O = !0 : T === "&" ? T = Yo("", s, u) : T = Yo(y, s, u) : a && !s && (T === "&" || T === "") && (T = "", j = !0);
          var k = e(w, r, {
            root: j,
            injectHash: O,
            parentSelectors: [].concat(K(o), [T])
          }), F = B(k, 2), M = F[0], I = F[1];
          f = R(R({}, f), I), m += "".concat(T).concat(M);
        } else {
          let z = function(Q, X) {
            process.env.NODE_ENV !== "production" && (J(w) !== "object" || !(w != null && w[Il])) && [qv, Uv].concat(K(g)).forEach(function(W) {
              return W(Q, X, {
                path: c,
                hashId: s,
                parentSelectors: o
              });
            });
            var Z = Q.replace(/[A-Z]/g, function(W) {
              return "-".concat(W.toLowerCase());
            }), q = X;
            !Pv[Q] && typeof q == "number" && q !== 0 && (q = "".concat(q, "px")), Q === "animationName" && X !== null && X !== void 0 && X._keyframe && (x(X), q = X.getName(s)), m += "".concat(Z, ":").concat(q, ";");
          };
          var N, V = (N = w == null ? void 0 : w.value) !== null && N !== void 0 ? N : w;
          J(w) === "object" && w !== null && w !== void 0 && w[Nl] && Array.isArray(V) ? V.forEach(function(Q) {
            z(y, Q);
          }) : z(y, V);
        }
      });
    }
  }), a ? l && (m && (m = "@layer ".concat(l.name, " {").concat(m, "}")), l.dependencies && (f["@layer ".concat(l.name)] = l.dependencies.map(function(P) {
    return "@layer ".concat(P, ", ").concat(l.name, ";");
  }).join(`
`))) : m = "{".concat(m, "}"), [m, f];
};
function Dl(e, t) {
  return kr("".concat(e.join("%")).concat(t));
}
function Qv() {
  return null;
}
var Vl = "style";
function oi(e, t) {
  var r = e.token, n = e.path, a = e.hashId, i = e.layer, o = e.nonce, s = e.clientOnly, l = e.order, c = l === void 0 ? 0 : l, u = S.useContext(an), d = u.autoClear, v = u.mock, b = u.defaultCache, g = u.hashPriority, m = u.container, f = u.ssrInline, x = u.transformers, h = u.linters, $ = u.cache, P = u.layer, C = r._tokenKey, _ = [C];
  P && _.push("layer"), _.push.apply(_, K(n));
  var y = ri;
  process.env.NODE_ENV !== "production" && v !== void 0 && (y = v === "client");
  var w = io(
    Vl,
    _,
    // Create cache if needed
    function() {
      var F = _.join("|");
      if (Gv(F)) {
        var M = Kv(F), I = B(M, 2), N = I[0], V = I[1];
        if (N)
          return [N, C, V, {}, s, c];
      }
      var z = t(), Q = Jv(z, {
        hashId: a,
        hashPriority: g,
        layer: P ? i : void 0,
        path: n.join("-"),
        transformers: x,
        linters: h
      }), X = B(Q, 2), Z = X[0], q = X[1], W = Rn(Z), U = Dl(_, W);
      return [W, C, U, q, s, c];
    },
    // Remove cache if no need
    function(F, M) {
      var I = B(F, 3), N = I[2];
      (M || d) && ri && El(N, {
        mark: xt
      });
    },
    // Effect: Inject style here
    function(F) {
      var M = B(F, 4), I = M[0];
      M[1];
      var N = M[2], V = M[3];
      if (y && I !== jl) {
        var z = {
          mark: xt,
          prepend: P ? !1 : "queue",
          attachTo: m,
          priority: c
        }, Q = typeof o == "function" ? o() : o;
        Q && (z.csp = {
          nonce: Q
        });
        var X = [], Z = [];
        Object.keys(V).forEach(function(W) {
          W.startsWith("@layer") ? X.push(W) : Z.push(W);
        }), X.forEach(function(W) {
          Wt(Rn(V[W]), "_layer-".concat(W), R(R({}, z), {}, {
            prepend: !0
          }));
        });
        var q = Wt(I, N, z);
        q[It] = $.instanceId, q.setAttribute(lr, C), process.env.NODE_ENV !== "production" && q.setAttribute(Zf, _.join("|")), Z.forEach(function(W) {
          Wt(Rn(V[W]), "_effect-".concat(W), z);
        });
      }
    }
  ), O = B(w, 3), T = O[0], j = O[1], k = O[2];
  return function(F) {
    var M;
    if (!f || y || !b)
      M = /* @__PURE__ */ S.createElement(Qv, null);
    else {
      var I;
      M = /* @__PURE__ */ S.createElement("style", Ke({}, (I = {}, E(I, lr, j), E(I, xt, k), I), {
        dangerouslySetInnerHTML: {
          __html: T
        }
      }));
    }
    return /* @__PURE__ */ S.createElement(S.Fragment, null, M, F);
  };
}
var Zv = function(t, r, n) {
  var a = B(t, 6), i = a[0], o = a[1], s = a[2], l = a[3], c = a[4], u = a[5], d = n || {}, v = d.plain;
  if (c)
    return null;
  var b = i, g = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(u)
  };
  return b = jn(i, o, s, g, v), l && Object.keys(l).forEach(function(m) {
    if (!r[m]) {
      r[m] = !0;
      var f = Rn(l[m]), x = jn(f, o, "_effect-".concat(m), g, v);
      m.startsWith("@layer") ? b = x + b : b += x;
    }
  }), [u, s, b];
}, Ll = "cssVar", ep = function(t, r) {
  var n = t.key, a = t.prefix, i = t.unitless, o = t.ignore, s = t.token, l = t.scope, c = l === void 0 ? "" : l, u = Rt(an), d = u.cache.instanceId, v = u.container, b = s._tokenKey, g = [].concat(K(t.path), [n, c, b]), m = io(Ll, g, function() {
    var f = r(), x = _l(f, n, {
      prefix: a,
      unitless: i,
      ignore: o,
      scope: c
    }), h = B(x, 2), $ = h[0], P = h[1], C = Dl(g, P);
    return [$, P, C, n];
  }, function(f) {
    var x = B(f, 3), h = x[2];
    ri && El(h, {
      mark: xt
    });
  }, function(f) {
    var x = B(f, 3), h = x[1], $ = x[2];
    if (h) {
      var P = Wt(h, $, {
        mark: xt,
        prepend: "queue",
        attachTo: v,
        priority: -999
      });
      P[It] = d, P.setAttribute(lr, n);
    }
  });
  return m;
}, tp = function(t, r, n) {
  var a = B(t, 4), i = a[1], o = a[2], s = a[3], l = n || {}, c = l.plain;
  if (!i)
    return null;
  var u = -999, d = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(u)
  }, v = jn(i, s, o, d, c);
  return [u, o, v];
}, Pr;
Pr = {}, E(Pr, Vl, Zv), E(Pr, wl, wv), E(Pr, Ll, tp);
function er(e) {
  return e.notSplit = !0, e;
}
er(["borderTop", "borderBottom"]), er(["borderTop"]), er(["borderBottom"]), er(["borderLeft", "borderRight"]), er(["borderLeft"]), er(["borderRight"]);
var lo = /* @__PURE__ */ Bi({});
function rp(e) {
  return ml(e) || yl(e) || to(e) || gl();
}
function _t(e, t) {
  for (var r = e, n = 0; n < t.length; n += 1) {
    if (r == null)
      return;
    r = r[t[n]];
  }
  return r;
}
function zl(e, t, r, n) {
  if (!t.length)
    return r;
  var a = rp(t), i = a[0], o = a.slice(1), s;
  return !e && typeof i == "number" ? s = [] : Array.isArray(e) ? s = K(e) : s = R({}, e), n && r === void 0 && o.length === 1 ? delete s[i][o[0]] : s[i] = zl(s[i], o, r, n), s;
}
function bt(e, t, r) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && n && r === void 0 && !_t(e, t.slice(0, -1)) ? e : zl(e, t, r, n);
}
function np(e) {
  return J(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function Go(e) {
  return Array.isArray(e) ? [] : {};
}
var ap = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function nr() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = Go(t[0]);
  return t.forEach(function(a) {
    function i(o, s) {
      var l = new Set(s), c = _t(a, o), u = Array.isArray(c);
      if (u || np(c)) {
        if (!l.has(c)) {
          l.add(c);
          var d = _t(n, o);
          u ? n = bt(n, o, []) : (!d || J(d) !== "object") && (n = bt(n, o, Go(c))), ap(c).forEach(function(v) {
            i([].concat(K(o), [v]), l);
          });
        }
      } else
        n = bt(n, o, c);
    }
    i([]);
  }), n;
}
const ip = /* @__PURE__ */ Bi(void 0);
var op = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: !0
}, sp = R(R({}, op), {}, {
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
const lp = {
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
}, sp), Object.assign({}, lp);
const it = "${label} is not a valid ${type}", xa = {
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
Object.assign({}, xa.Modal);
let Tn = [];
const Ko = () => Tn.reduce((e, t) => Object.assign(Object.assign({}, e), t), xa.Modal);
function cp(e) {
  if (e) {
    const t = Object.assign({}, e);
    return Tn.push(t), Ko(), () => {
      Tn = Tn.filter((r) => r !== t), Ko();
    };
  }
  Object.assign({}, xa.Modal);
}
const Hl = /* @__PURE__ */ Bi(void 0), Bl = "internalMark", Wl = (e) => {
  const {
    locale: t = {},
    children: r,
    _ANT_MARK__: n
  } = e;
  if (process.env.NODE_ENV !== "production") {
    const i = Ut("LocaleProvider");
    process.env.NODE_ENV !== "production" && i(n === Bl, "deprecated", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale");
  }
  S.useEffect(() => cp(t == null ? void 0 : t.Modal), [t]);
  const a = S.useMemo(() => Object.assign(Object.assign({}, t), {
    exist: !0
  }), [t]);
  return /* @__PURE__ */ S.createElement(Hl.Provider, {
    value: a
  }, r);
};
process.env.NODE_ENV !== "production" && (Wl.displayName = "LocaleProvider");
const ql = {
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
}, Vr = Object.assign(Object.assign({}, ql), {
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
}), Be = Math.round;
function Aa(e, t) {
  const r = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], n = r.map((a) => parseFloat(a));
  for (let a = 0; a < 3; a += 1)
    n[a] = t(n[a] || 0, r[a] || "", a);
  return r[3] ? n[3] = r[3].includes("%") ? n[3] / 100 : n[3] : n[3] = 1, n;
}
const Xo = (e, t, r) => r === 0 ? e : e / 100;
function Or(e, t) {
  const r = t || 255;
  return e > r ? r : e < 0 ? 0 : e;
}
class Oe {
  constructor(t) {
    E(this, "isValid", !0), E(this, "r", 0), E(this, "g", 0), E(this, "b", 0), E(this, "a", 1), E(this, "_h", void 0), E(this, "_s", void 0), E(this, "_l", void 0), E(this, "_v", void 0), E(this, "_max", void 0), E(this, "_min", void 0), E(this, "_brightness", void 0);
    function r(n) {
      return n[0] in t && n[1] in t && n[2] in t;
    }
    if (t) if (typeof t == "string") {
      let a = function(i) {
        return n.startsWith(i);
      };
      const n = t.trim();
      /^#?[A-F\d]{3,8}$/i.test(n) ? this.fromHexString(n) : a("rgb") ? this.fromRgbString(n) : a("hsl") ? this.fromHslString(n) : (a("hsv") || a("hsb")) && this.fromHsvString(n);
    } else if (t instanceof Oe)
      this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this._h = t._h, this._s = t._s, this._l = t._l, this._v = t._v;
    else if (r("rgb"))
      this.r = Or(t.r), this.g = Or(t.g), this.b = Or(t.b), this.a = typeof t.a == "number" ? Or(t.a, 1) : 1;
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
    function t(i) {
      const o = i / 255;
      return o <= 0.03928 ? o / 12.92 : Math.pow((o + 0.055) / 1.055, 2.4);
    }
    const r = t(this.r), n = t(this.g), a = t(this.b);
    return 0.2126 * r + 0.7152 * n + 0.0722 * a;
  }
  getHue() {
    if (typeof this._h > "u") {
      const t = this.getMax() - this.getMin();
      t === 0 ? this._h = 0 : this._h = Be(60 * (this.r === this.getMax() ? (this.g - this.b) / t + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / t + 2 : (this.r - this.g) / t + 4));
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
    let a = this.getLightness() - t / 100;
    return a < 0 && (a = 0), this._c({
      h: r,
      s: n,
      l: a,
      a: this.a
    });
  }
  lighten(t = 10) {
    const r = this.getHue(), n = this.getSaturation();
    let a = this.getLightness() + t / 100;
    return a > 1 && (a = 1), this._c({
      h: r,
      s: n,
      l: a,
      a: this.a
    });
  }
  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */
  mix(t, r = 50) {
    const n = this._c(t), a = r / 100, i = (s) => (n[s] - this[s]) * a + this[s], o = {
      r: Be(i("r")),
      g: Be(i("g")),
      b: Be(i("b")),
      a: Be(i("a") * 100) / 100
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
    const r = this._c(t), n = this.a + r.a * (1 - this.a), a = (i) => Be((this[i] * this.a + r[i] * r.a * (1 - this.a)) / n);
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
    const a = (this.b || 0).toString(16);
    if (t += a.length === 2 ? a : "0" + a, typeof this.a == "number" && this.a >= 0 && this.a < 1) {
      const i = Be(this.a * 255).toString(16);
      t += i.length === 2 ? i : "0" + i;
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
    const t = this.getHue(), r = Be(this.getSaturation() * 100), n = Be(this.getLightness() * 100);
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
    const a = this.clone();
    return a[t] = Or(r, n), a;
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
    function n(a, i) {
      return parseInt(r[a] + r[i || a], 16);
    }
    r.length < 6 ? (this.r = n(0), this.g = n(1), this.b = n(2), this.a = r[3] ? n(3) / 255 : 1) : (this.r = n(0, 1), this.g = n(2, 3), this.b = n(4, 5), this.a = r[6] ? n(6, 7) / 255 : 1);
  }
  fromHsl({
    h: t,
    s: r,
    l: n,
    a
  }) {
    if (this._h = t % 360, this._s = r, this._l = n, this.a = typeof a == "number" ? a : 1, r <= 0) {
      const v = Be(n * 255);
      this.r = v, this.g = v, this.b = v;
    }
    let i = 0, o = 0, s = 0;
    const l = t / 60, c = (1 - Math.abs(2 * n - 1)) * r, u = c * (1 - Math.abs(l % 2 - 1));
    l >= 0 && l < 1 ? (i = c, o = u) : l >= 1 && l < 2 ? (i = u, o = c) : l >= 2 && l < 3 ? (o = c, s = u) : l >= 3 && l < 4 ? (o = u, s = c) : l >= 4 && l < 5 ? (i = u, s = c) : l >= 5 && l < 6 && (i = c, s = u);
    const d = n - c / 2;
    this.r = Be((i + d) * 255), this.g = Be((o + d) * 255), this.b = Be((s + d) * 255);
  }
  fromHsv({
    h: t,
    s: r,
    v: n,
    a
  }) {
    this._h = t % 360, this._s = r, this._v = n, this.a = typeof a == "number" ? a : 1;
    const i = Be(n * 255);
    if (this.r = i, this.g = i, this.b = i, r <= 0)
      return;
    const o = t / 60, s = Math.floor(o), l = o - s, c = Be(n * (1 - r) * 255), u = Be(n * (1 - r * l) * 255), d = Be(n * (1 - r * (1 - l)) * 255);
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
  fromHsvString(t) {
    const r = Aa(t, Xo);
    this.fromHsv({
      h: r[0],
      s: r[1],
      v: r[2],
      a: r[3]
    });
  }
  fromHslString(t) {
    const r = Aa(t, Xo);
    this.fromHsl({
      h: r[0],
      s: r[1],
      l: r[2],
      a: r[3]
    });
  }
  fromRgbString(t) {
    const r = Aa(t, (n, a) => (
      // Convert percentage to number. e.g. 50% -> 128
      a.includes("%") ? Be(n / 100 * 255) : n
    ));
    this.r = r[0], this.g = r[1], this.b = r[2], this.a = r[3];
  }
}
var mn = 2, Jo = 0.16, up = 0.05, dp = 0.05, fp = 0.15, Ul = 5, Yl = 4, vp = [{
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
function Qo(e, t, r) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = r ? Math.round(e.h) - mn * t : Math.round(e.h) + mn * t : n = r ? Math.round(e.h) + mn * t : Math.round(e.h) - mn * t, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function Zo(e, t, r) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return r ? n = e.s - Jo * t : t === Yl ? n = e.s + Jo : n = e.s + up * t, n > 1 && (n = 1), r && t === Ul && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Math.round(n * 100) / 100;
}
function es(e, t, r) {
  var n;
  return r ? n = e.v + dp * t : n = e.v - fp * t, n = Math.max(0, Math.min(1, n)), Math.round(n * 100) / 100;
}
function In(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [], n = new Oe(e), a = n.toHsv(), i = Ul; i > 0; i -= 1) {
    var o = new Oe({
      h: Qo(a, i, !0),
      s: Zo(a, i, !0),
      v: es(a, i, !0)
    });
    r.push(o);
  }
  r.push(n);
  for (var s = 1; s <= Yl; s += 1) {
    var l = new Oe({
      h: Qo(a, s),
      s: Zo(a, s),
      v: es(a, s)
    });
    r.push(l);
  }
  return t.theme === "dark" ? vp.map(function(c) {
    var u = c.index, d = c.amount;
    return new Oe(t.backgroundColor || "#141414").mix(r[u], d).toHexString();
  }) : r.map(function(c) {
    return c.toHexString();
  });
}
var ja = {
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
}, si = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
si.primary = si[5];
var li = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
li.primary = li[5];
var ci = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
ci.primary = ci[5];
var ui = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
ui.primary = ui[5];
var di = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
di.primary = di[5];
var fi = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
fi.primary = fi[5];
var vi = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
vi.primary = vi[5];
var pi = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
pi.primary = pi[5];
var hi = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
hi.primary = hi[5];
var mi = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
mi.primary = mi[5];
var gi = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
gi.primary = gi[5];
var bi = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
bi.primary = bi[5];
var yi = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
yi.primary = yi[5];
var ka = {
  red: si,
  volcano: li,
  orange: ci,
  gold: ui,
  yellow: di,
  lime: fi,
  green: vi,
  cyan: pi,
  blue: hi,
  geekblue: mi,
  purple: gi,
  magenta: bi,
  grey: yi
};
function pp(e, {
  generateColorPalettes: t,
  generateNeutralColorPalettes: r
}) {
  const {
    colorSuccess: n,
    colorWarning: a,
    colorError: i,
    colorInfo: o,
    colorPrimary: s,
    colorBgBase: l,
    colorTextBase: c
  } = e, u = t(s), d = t(n), v = t(a), b = t(i), g = t(o), m = r(l, c), f = e.colorLink || e.colorInfo, x = t(f), h = new Oe(b[1]).mix(new Oe(b[3]), 50).toHexString();
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
    colorErrorBg: b[1],
    colorErrorBgHover: b[2],
    colorErrorBgFilledHover: h,
    colorErrorBgActive: b[3],
    colorErrorBorder: b[3],
    colorErrorBorderHover: b[4],
    colorErrorHover: b[5],
    colorError: b[6],
    colorErrorActive: b[7],
    colorErrorTextHover: b[8],
    colorErrorText: b[9],
    colorErrorTextActive: b[10],
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
    colorLinkHover: x[4],
    colorLink: x[6],
    colorLinkActive: x[7],
    colorBgMask: new Oe("#000").setA(0.45).toRgbString(),
    colorWhite: "#fff"
  });
}
const hp = (e) => {
  let t = e, r = e, n = e, a = e;
  return e < 6 && e >= 5 ? t = e + 1 : e < 16 && e >= 6 ? t = e + 2 : e >= 16 && (t = 16), e < 7 && e >= 5 ? r = 4 : e < 8 && e >= 7 ? r = 5 : e < 14 && e >= 8 ? r = 6 : e < 16 && e >= 14 ? r = 7 : e >= 16 && (r = 8), e < 6 && e >= 2 ? n = 1 : e >= 6 && (n = 2), e > 4 && e < 8 ? a = 4 : e >= 8 && (a = 6), {
    borderRadius: e,
    borderRadiusXS: n,
    borderRadiusSM: r,
    borderRadiusLG: t,
    borderRadiusOuter: a
  };
};
function mp(e) {
  const {
    motionUnit: t,
    motionBase: r,
    borderRadius: n,
    lineWidth: a
  } = e;
  return Object.assign({
    // motion
    motionDurationFast: `${(r + t).toFixed(1)}s`,
    motionDurationMid: `${(r + t * 2).toFixed(1)}s`,
    motionDurationSlow: `${(r + t * 3).toFixed(1)}s`,
    // line
    lineWidthBold: a + 1
  }, hp(n));
}
const gp = (e) => {
  const {
    controlHeight: t
  } = e;
  return {
    controlHeightSM: t * 0.75,
    controlHeightXS: t * 0.5,
    controlHeightLG: t * 1.25
  };
};
function bp(e) {
  return (e + 8) / e;
}
function yp(e) {
  const t = Array.from({
    length: 10
  }).map((r, n) => {
    const a = n - 1, i = e * Math.pow(Math.E, a / 5), o = n > 1 ? Math.floor(i) : Math.ceil(i);
    return Math.floor(o / 2) * 2;
  });
  return t[1] = e, t.map((r) => ({
    size: r,
    lineHeight: bp(r)
  }));
}
const Sp = (e) => {
  const t = yp(e), r = t.map((u) => u.size), n = t.map((u) => u.lineHeight), a = r[1], i = r[0], o = r[2], s = n[1], l = n[0], c = n[2];
  return {
    fontSizeSM: i,
    fontSize: a,
    fontSizeLG: o,
    fontSizeXL: r[3],
    fontSizeHeading1: r[6],
    fontSizeHeading2: r[5],
    fontSizeHeading3: r[4],
    fontSizeHeading4: r[3],
    fontSizeHeading5: r[2],
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
function xp(e) {
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
const vt = (e, t) => new Oe(e).setA(t).toRgbString(), Rr = (e, t) => new Oe(e).darken(t).toHexString(), Cp = (e) => {
  const t = In(e);
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
}, Ep = (e, t) => {
  const r = e || "#fff", n = t || "#000";
  return {
    colorBgBase: r,
    colorTextBase: n,
    colorText: vt(n, 0.88),
    colorTextSecondary: vt(n, 0.65),
    colorTextTertiary: vt(n, 0.45),
    colorTextQuaternary: vt(n, 0.25),
    colorFill: vt(n, 0.15),
    colorFillSecondary: vt(n, 0.06),
    colorFillTertiary: vt(n, 0.04),
    colorFillQuaternary: vt(n, 0.02),
    colorBgSolid: vt(n, 1),
    colorBgSolidHover: vt(n, 0.75),
    colorBgSolidActive: vt(n, 0.95),
    colorBgLayout: Rr(r, 4),
    colorBgContainer: Rr(r, 0),
    colorBgElevated: Rr(r, 0),
    colorBgSpotlight: vt(n, 0.85),
    colorBgBlur: "transparent",
    colorBorder: Rr(r, 15),
    colorBorderSecondary: Rr(r, 6)
  };
};
function $p(e) {
  ja.pink = ja.magenta, ka.pink = ka.magenta;
  const t = Object.keys(ql).map((r) => {
    const n = e[r] === ja[r] ? ka[r] : In(e[r]);
    return Array.from({
      length: 10
    }, () => 1).reduce((a, i, o) => (a[`${r}-${o + 1}`] = n[o], a[`${r}${o + 1}`] = n[o], a), {});
  }).reduce((r, n) => (r = Object.assign(Object.assign({}, r), n), r), {});
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e), t), pp(e, {
    generateColorPalettes: Cp,
    generateNeutralColorPalettes: Ep
  })), Sp(e.fontSize)), xp(e)), gp(e)), mp(e));
}
const Gl = ti($p), Si = {
  token: Vr,
  override: {
    override: Vr
  },
  hashed: !0
}, Kl = /* @__PURE__ */ H.createContext(Si), xi = "ant", co = "anticon", _p = ["outlined", "borderless", "filled", "underlined"], wp = (e, t) => t || (e ? `${xi}-${e}` : xi), Dt = /* @__PURE__ */ S.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: wp,
  iconPrefixCls: co
}), {
  Consumer: yb
} = Dt, ts = {};
function Xl(e) {
  const t = S.useContext(Dt), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: a
  } = t, i = t[e];
  return Object.assign(Object.assign({
    classNames: ts,
    styles: ts
  }, i), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: a
  });
}
const Pp = `-ant-${Date.now()}-${Math.random()}`;
function Op(e, t) {
  const r = {}, n = (o, s) => {
    let l = o.clone();
    return l = (s == null ? void 0 : s(l)) || l, l.toRgbString();
  }, a = (o, s) => {
    const l = new Oe(o), c = In(l.toRgbString());
    r[`${s}-color`] = n(l), r[`${s}-color-disabled`] = c[1], r[`${s}-color-hover`] = c[4], r[`${s}-color-active`] = c[6], r[`${s}-color-outline`] = l.clone().setA(0.2).toRgbString(), r[`${s}-color-deprecated-bg`] = c[0], r[`${s}-color-deprecated-border`] = c[2];
  };
  if (t.primaryColor) {
    a(t.primaryColor, "primary");
    const o = new Oe(t.primaryColor), s = In(o.toRgbString());
    s.forEach((c, u) => {
      r[`primary-${u + 1}`] = c;
    }), r["primary-color-deprecated-l-35"] = n(o, (c) => c.lighten(35)), r["primary-color-deprecated-l-20"] = n(o, (c) => c.lighten(20)), r["primary-color-deprecated-t-20"] = n(o, (c) => c.tint(20)), r["primary-color-deprecated-t-50"] = n(o, (c) => c.tint(50)), r["primary-color-deprecated-f-12"] = n(o, (c) => c.setA(c.a * 0.12));
    const l = new Oe(s[0]);
    r["primary-color-active-deprecated-f-30"] = n(l, (c) => c.setA(c.a * 0.3)), r["primary-color-active-deprecated-d-02"] = n(l, (c) => c.darken(2));
  }
  return t.successColor && a(t.successColor, "success"), t.warningColor && a(t.warningColor, "warning"), t.errorColor && a(t.errorColor, "error"), t.infoColor && a(t.infoColor, "info"), `
  :root {
    ${Object.keys(r).map((o) => `--${e}-${o}: ${r[o]};`).join(`
`)}
  }
  `.trim();
}
function Rp(e, t) {
  const r = Op(e, t);
  Tt() ? Wt(r, `${Pp}-dynamic-theme`) : process.env.NODE_ENV !== "production" && ga(!1, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
}
const Lr = /* @__PURE__ */ S.createContext(!1), Tp = ({
  children: e,
  disabled: t
}) => {
  const r = S.useContext(Lr);
  return /* @__PURE__ */ S.createElement(Lr.Provider, {
    value: t ?? r
  }, e);
}, dr = /* @__PURE__ */ S.createContext(void 0), Fp = ({
  children: e,
  size: t
}) => {
  const r = S.useContext(dr);
  return /* @__PURE__ */ S.createElement(dr.Provider, {
    value: t || r
  }, e);
};
function Mp() {
  const e = Rt(Lr), t = Rt(dr);
  return {
    componentDisabled: e,
    componentSize: t
  };
}
var Jl = /* @__PURE__ */ Ye(function e() {
  Ue(this, e);
}), Ql = "CALC_UNIT", Ap = new RegExp(Ql, "g");
function Ia(e) {
  return typeof e == "number" ? "".concat(e).concat(Ql) : e;
}
var jp = /* @__PURE__ */ function(e) {
  Gt(r, e);
  var t = Kt(r);
  function r(n, a) {
    var i;
    Ue(this, r), i = t.call(this), E(ne(i), "result", ""), E(ne(i), "unitlessCssVar", void 0), E(ne(i), "lowPriority", void 0);
    var o = J(n);
    return i.unitlessCssVar = a, n instanceof r ? i.result = "(".concat(n.result, ")") : o === "number" ? i.result = Ia(n) : o === "string" && (i.result = n), i;
  }
  return Ye(r, [{
    key: "add",
    value: function(a) {
      return a instanceof r ? this.result = "".concat(this.result, " + ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " + ").concat(Ia(a))), this.lowPriority = !0, this;
    }
  }, {
    key: "sub",
    value: function(a) {
      return a instanceof r ? this.result = "".concat(this.result, " - ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " - ").concat(Ia(a))), this.lowPriority = !0, this;
    }
  }, {
    key: "mul",
    value: function(a) {
      return this.lowPriority && (this.result = "(".concat(this.result, ")")), a instanceof r ? this.result = "".concat(this.result, " * ").concat(a.getResult(!0)) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " * ").concat(a)), this.lowPriority = !1, this;
    }
  }, {
    key: "div",
    value: function(a) {
      return this.lowPriority && (this.result = "(".concat(this.result, ")")), a instanceof r ? this.result = "".concat(this.result, " / ").concat(a.getResult(!0)) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " / ").concat(a)), this.lowPriority = !1, this;
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
      }) && (l = !1), this.result = this.result.replace(Ap, l ? "px" : ""), typeof this.lowPriority < "u" ? "calc(".concat(this.result, ")") : this.result;
    }
  }]), r;
}(Jl), kp = /* @__PURE__ */ function(e) {
  Gt(r, e);
  var t = Kt(r);
  function r(n) {
    var a;
    return Ue(this, r), a = t.call(this), E(ne(a), "result", 0), n instanceof r ? a.result = n.result : typeof n == "number" && (a.result = n), a;
  }
  return Ye(r, [{
    key: "add",
    value: function(a) {
      return a instanceof r ? this.result += a.result : typeof a == "number" && (this.result += a), this;
    }
  }, {
    key: "sub",
    value: function(a) {
      return a instanceof r ? this.result -= a.result : typeof a == "number" && (this.result -= a), this;
    }
  }, {
    key: "mul",
    value: function(a) {
      return a instanceof r ? this.result *= a.result : typeof a == "number" && (this.result *= a), this;
    }
  }, {
    key: "div",
    value: function(a) {
      return a instanceof r ? this.result /= a.result : typeof a == "number" && (this.result /= a), this;
    }
  }, {
    key: "equal",
    value: function() {
      return this.result;
    }
  }]), r;
}(Jl), Ip = function(t, r) {
  var n = t === "css" ? jp : kp;
  return function(a) {
    return new n(a, r);
  };
}, rs = function(t, r) {
  return "".concat([r, t.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-"));
};
function zr(e) {
  var t = S.useRef();
  t.current = e;
  var r = S.useCallback(function() {
    for (var n, a = arguments.length, i = new Array(a), o = 0; o < a; o++)
      i[o] = arguments[o];
    return (n = t.current) === null || n === void 0 ? void 0 : n.call.apply(n, [t].concat(i));
  }, []);
  return r;
}
function Hr(e) {
  var t = S.useRef(!1), r = S.useState(e), n = B(r, 2), a = n[0], i = n[1];
  S.useEffect(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function o(s, l) {
    l && t.current || i(s);
  }
  return [a, o];
}
function Na(e) {
  return e !== void 0;
}
function uo(e, t) {
  var r = t || {}, n = r.defaultValue, a = r.value, i = r.onChange, o = r.postState, s = Hr(function() {
    return Na(a) ? a : Na(n) ? typeof n == "function" ? n() : n : typeof e == "function" ? e() : e;
  }), l = B(s, 2), c = l[0], u = l[1], d = a !== void 0 ? a : c, v = o ? o(d) : d, b = zr(i), g = Hr([d]), m = B(g, 2), f = m[0], x = m[1];
  Ho(function() {
    var $ = f[0];
    c !== $ && b(c, $);
  }, [f]), Ho(function() {
    Na(a) || u(a);
  }, [a]);
  var h = zr(function($, P) {
    u($, P), x([d], P);
  });
  return [v, h];
}
function ns(e, t, r, n) {
  var a = R({}, t[e]);
  if (n != null && n.deprecatedTokens) {
    var i = n.deprecatedTokens;
    i.forEach(function(s) {
      var l = B(s, 2), c = l[0], u = l[1];
      if (process.env.NODE_ENV !== "production" && Me(!(a != null && a[c]), "Component Token `".concat(String(c), "` of ").concat(String(e), " is deprecated. Please use `").concat(String(u), "` instead.")), a != null && a[c] || a != null && a[u]) {
        var d;
        (d = a[u]) !== null && d !== void 0 || (a[u] = a == null ? void 0 : a[c]);
      }
    });
  }
  var o = R(R({}, r), a);
  return Object.keys(o).forEach(function(s) {
    o[s] === t[s] && delete o[s];
  }), o;
}
var Zl = process.env.NODE_ENV !== "production" || typeof CSSINJS_STATISTIC < "u", Ci = !0;
function Xt() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  if (!Zl)
    return Object.assign.apply(Object, [{}].concat(t));
  Ci = !1;
  var n = {};
  return t.forEach(function(a) {
    if (J(a) === "object") {
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
  }), Ci = !0, n;
}
var as = {};
function Np() {
}
var Dp = function(t) {
  var r, n = t, a = Np;
  return Zl && typeof Proxy < "u" && (r = /* @__PURE__ */ new Set(), n = new Proxy(t, {
    get: function(o, s) {
      if (Ci) {
        var l;
        (l = r) === null || l === void 0 || l.add(s);
      }
      return o[s];
    }
  }), a = function(o, s) {
    var l;
    as[o] = {
      global: Array.from(r),
      component: R(R({}, (l = as[o]) === null || l === void 0 ? void 0 : l.component), s)
    };
  }), {
    token: n,
    keys: r,
    flush: a
  };
};
function is(e, t, r) {
  if (typeof r == "function") {
    var n;
    return r(Xt(t, (n = t[e]) !== null && n !== void 0 ? n : {}));
  }
  return r ?? {};
}
function Vp(e) {
  return e === "js" ? {
    max: Math.max,
    min: Math.min
  } : {
    max: function() {
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      return "max(".concat(n.map(function(i) {
        return ke(i);
      }).join(","), ")");
    },
    min: function() {
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      return "min(".concat(n.map(function(i) {
        return ke(i);
      }).join(","), ")");
    }
  };
}
var Lp = 1e3 * 60 * 10, zp = /* @__PURE__ */ function() {
  function e() {
    Ue(this, e), E(this, "map", /* @__PURE__ */ new Map()), E(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), E(this, "nextID", 0), E(this, "lastAccessBeat", /* @__PURE__ */ new Map()), E(this, "accessBeat", 0);
  }
  return Ye(e, [{
    key: "set",
    value: function(r, n) {
      this.clear();
      var a = this.getCompositeKey(r);
      this.map.set(a, n), this.lastAccessBeat.set(a, Date.now());
    }
  }, {
    key: "get",
    value: function(r) {
      var n = this.getCompositeKey(r), a = this.map.get(n);
      return this.lastAccessBeat.set(n, Date.now()), this.accessBeat += 1, a;
    }
  }, {
    key: "getCompositeKey",
    value: function(r) {
      var n = this, a = r.map(function(i) {
        return i && J(i) === "object" ? "obj_".concat(n.getObjectID(i)) : "".concat(J(i), "_").concat(i);
      });
      return a.join("|");
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
        this.lastAccessBeat.forEach(function(a, i) {
          n - a > Lp && (r.map.delete(i), r.lastAccessBeat.delete(i));
        }), this.accessBeat = 0;
      }
    }
  }]), e;
}(), os = new zp();
function Hp(e, t) {
  return H.useMemo(function() {
    var r = os.get(t);
    if (r)
      return r;
    var n = e();
    return os.set(t, n), n;
  }, t);
}
var Bp = function() {
  return {};
};
function Wp(e) {
  var t = e.useCSP, r = t === void 0 ? Bp : t, n = e.useToken, a = e.usePrefix, i = e.getResetStyles, o = e.getCommonStyle, s = e.getCompUnitless;
  function l(v, b, g, m) {
    var f = Array.isArray(v) ? v[0] : v;
    function x(w) {
      return "".concat(String(f)).concat(w.slice(0, 1).toUpperCase()).concat(w.slice(1));
    }
    var h = (m == null ? void 0 : m.unitless) || {}, $ = typeof s == "function" ? s(v) : {}, P = R(R({}, $), {}, E({}, x("zIndexPopup"), !0));
    Object.keys(h).forEach(function(w) {
      P[x(w)] = h[w];
    });
    var C = R(R({}, m), {}, {
      unitless: P,
      prefixToken: x
    }), _ = u(v, b, g, C), y = c(f, g, C);
    return function(w) {
      var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : w, T = _(w, O), j = B(T, 2), k = j[1], F = y(O), M = B(F, 2), I = M[0], N = M[1];
      return [I, k, N];
    };
  }
  function c(v, b, g) {
    var m = g.unitless, f = g.injectStyle, x = f === void 0 ? !0 : f, h = g.prefixToken, $ = g.ignore, P = function(y) {
      var w = y.rootCls, O = y.cssVar, T = O === void 0 ? {} : O, j = n(), k = j.realToken;
      return ep({
        path: [v],
        prefix: T.prefix,
        key: T.key,
        unitless: m,
        ignore: $,
        token: k,
        scope: w
      }, function() {
        var F = is(v, k, b), M = ns(v, k, F, {
          deprecatedTokens: g == null ? void 0 : g.deprecatedTokens
        });
        return Object.keys(F).forEach(function(I) {
          M[h(I)] = M[I], delete M[I];
        }), M;
      }), null;
    }, C = function(y) {
      var w = n(), O = w.cssVar;
      return [function(T) {
        return x && O ? /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement(P, {
          rootCls: y,
          cssVar: O,
          component: v
        }), T) : T;
      }, O == null ? void 0 : O.key];
    };
    return C;
  }
  function u(v, b, g) {
    var m = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, f = Array.isArray(v) ? v : [v, v], x = B(f, 1), h = x[0], $ = f.join("-"), P = e.layer || {
      name: "antd"
    };
    return function(C) {
      var _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : C, y = n(), w = y.theme, O = y.realToken, T = y.hashId, j = y.token, k = y.cssVar, F = a(), M = F.rootPrefixCls, I = F.iconPrefixCls, N = r(), V = k ? "css" : "js", z = Hp(function() {
        var U = /* @__PURE__ */ new Set();
        return k && Object.keys(m.unitless || {}).forEach(function(de) {
          U.add(_n(de, k.prefix)), U.add(_n(de, rs(h, k.prefix)));
        }), Ip(V, U);
      }, [V, h, k == null ? void 0 : k.prefix]), Q = Vp(V), X = Q.max, Z = Q.min, q = {
        theme: w,
        token: j,
        hashId: T,
        nonce: function() {
          return N.nonce;
        },
        clientOnly: m.clientOnly,
        layer: P,
        // antd is always at top of styles
        order: m.order || -999
      };
      typeof i == "function" && oi(R(R({}, q), {}, {
        clientOnly: !1,
        path: ["Shared", M]
      }), function() {
        return i(j, {
          prefix: {
            rootPrefixCls: M,
            iconPrefixCls: I
          },
          csp: N
        });
      });
      var W = oi(R(R({}, q), {}, {
        path: [$, C, I]
      }), function() {
        if (m.injectStyle === !1)
          return [];
        var U = Dp(j), de = U.token, ie = U.flush, ve = is(h, O, g), le = ".".concat(C), fe = ns(h, O, ve, {
          deprecatedTokens: m.deprecatedTokens
        });
        k && ve && J(ve) === "object" && Object.keys(ve).forEach(function(Ie) {
          ve[Ie] = "var(".concat(_n(Ie, rs(h, k.prefix)), ")");
        });
        var ce = Xt(de, {
          componentCls: le,
          prefixCls: C,
          iconCls: ".".concat(I),
          antCls: ".".concat(M),
          calc: z,
          // @ts-ignore
          max: X,
          // @ts-ignore
          min: Z
        }, k ? ve : fe), we = b(ce, {
          hashId: T,
          prefixCls: C,
          rootPrefixCls: M,
          iconPrefixCls: I
        });
        ie(h, fe);
        var Pe = typeof o == "function" ? o(ce, C, _, m.resetFont) : null;
        return [m.resetStyle === !1 ? null : Pe, we];
      });
      return [W, T];
    };
  }
  function d(v, b, g) {
    var m = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, f = u(v, b, g, R({
      resetStyle: !1,
      // Sub Style should default after root one
      order: -998
    }, m)), x = function($) {
      var P = $.prefixCls, C = $.rootCls, _ = C === void 0 ? P : C;
      return f(P, _), null;
    };
    return process.env.NODE_ENV !== "production" && (x.displayName = "SubStyle_".concat(String(Array.isArray(v) ? v.join(".") : v))), x;
  }
  return {
    genStyleHooks: l,
    genSubStyleComponent: d,
    genComponentStyleHook: u
  };
}
const qp = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"], Up = "5.25.4";
function Da(e) {
  return e >= 0 && e <= 255;
}
function gn(e, t) {
  const {
    r,
    g: n,
    b: a,
    a: i
  } = new Oe(e).toRgb();
  if (i < 1)
    return e;
  const {
    r: o,
    g: s,
    b: l
  } = new Oe(t).toRgb();
  for (let c = 0.01; c <= 1; c += 0.01) {
    const u = Math.round((r - o * (1 - c)) / c), d = Math.round((n - s * (1 - c)) / c), v = Math.round((a - l * (1 - c)) / c);
    if (Da(u) && Da(d) && Da(v))
      return new Oe({
        r: u,
        g: d,
        b: v,
        a: Math.round(c * 100) / 100
      }).toRgbString();
  }
  return new Oe({
    r,
    g: n,
    b: a,
    a: 1
  }).toRgbString();
}
var Yp = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
function ec(e) {
  const {
    override: t
  } = e, r = Yp(e, ["override"]), n = Object.assign({}, t);
  Object.keys(Vr).forEach((v) => {
    delete n[v];
  });
  const a = Object.assign(Object.assign({}, r), n), i = 480, o = 576, s = 768, l = 992, c = 1200, u = 1600;
  if (a.motion === !1) {
    const v = "0s";
    a.motionDurationFast = v, a.motionDurationMid = v, a.motionDurationSlow = v;
  }
  return Object.assign(Object.assign(Object.assign({}, a), {
    // ============== Background ============== //
    colorFillContent: a.colorFillSecondary,
    colorFillContentHover: a.colorFill,
    colorFillAlter: a.colorFillQuaternary,
    colorBgContainerDisabled: a.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: a.colorBgContainer,
    colorSplit: gn(a.colorBorderSecondary, a.colorBgContainer),
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
    colorErrorOutline: gn(a.colorErrorBg, a.colorBgContainer),
    colorWarningOutline: gn(a.colorWarningBg, a.colorBgContainer),
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
    controlOutline: gn(a.colorPrimaryBg, a.colorBgContainer),
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
      0 1px 2px -2px ${new Oe("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new Oe("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new Oe("rgba(0, 0, 0, 0.09)").toRgbString()}
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
var ss = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const tc = {
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
}, Gp = {
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
}, Kp = {
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
}, rc = (e, t, r) => {
  const n = r.getDerivativeToken(e), {
    override: a
  } = t, i = ss(t, ["override"]);
  let o = Object.assign(Object.assign({}, n), {
    override: a
  });
  return o = ec(o), i && Object.entries(i).forEach(([s, l]) => {
    const {
      theme: c
    } = l, u = ss(l, ["theme"]);
    let d = u;
    c && (d = rc(Object.assign(Object.assign({}, o), u), {
      override: u
    }, c)), o[s] = d;
  }), o;
};
function Ca() {
  const {
    token: e,
    hashed: t,
    theme: r,
    override: n,
    cssVar: a
  } = H.useContext(Kl), i = `${Up}-${t || ""}`, o = r || Gl, [s, l, c] = _v(o, [Vr, e], {
    salt: i,
    override: n,
    getComputedToken: rc,
    // formatToken will not be consumed after 1.15.0 with getComputedToken.
    // But token will break if @ant-design/cssinjs is under 1.15.0 without it
    formatToken: ec,
    cssVar: a && {
      prefix: a.prefix,
      key: a.key,
      unitless: tc,
      ignore: Gp,
      preserve: Kp
    }
  });
  return [o, c, t ? l : "", s, a];
}
const nc = (e, t = !1) => ({
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
}), Xp = () => ({
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
}), Jp = () => ({
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
}), Qp = (e) => ({
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
}), Zp = (e, t, r, n) => {
  const a = `[class^="${t}"], [class*=" ${t}"]`, i = r ? `.${r}` : a, o = {
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
}, ac = (e) => ({
  [`.${e}`]: Object.assign(Object.assign({}, Xp()), {
    [`.${e} .${e}-icon`]: {
      display: "block"
    }
  })
}), {
  genStyleHooks: fo
} = Wp({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: t
    } = Rt(Dt);
    return {
      rootPrefixCls: e(),
      iconPrefixCls: t
    };
  },
  useToken: () => {
    const [e, t, r, n, a] = Ca();
    return {
      theme: e,
      realToken: t,
      hashId: r,
      token: n,
      cssVar: a
    };
  },
  useCSP: () => {
    const {
      csp: e
    } = Rt(Dt);
    return e ?? {};
  },
  getResetStyles: (e, t) => {
    var r;
    const n = Qp(e);
    return [n, {
      "&": n
    }, ac((r = t == null ? void 0 : t.prefix.iconPrefixCls) !== null && r !== void 0 ? r : co)];
  },
  getCommonStyle: Zp,
  getCompUnitless: () => tc
}), eh = (e, t) => {
  const [r, n] = Ca();
  return oi({
    token: n,
    hashId: "",
    path: ["ant-design-icons", e],
    nonce: () => t == null ? void 0 : t.nonce,
    layer: {
      name: "antd"
    }
  }, () => [ac(e)]);
}, th = Object.assign({}, S), {
  useId: ls
} = th, rh = () => "", nh = typeof ls > "u" ? rh : ls;
function ah(e, t, r) {
  var n, a;
  const i = Ut("ConfigProvider"), o = e || {}, s = o.inherit === !1 || !t ? Object.assign(Object.assign({}, Si), {
    hashed: (n = t == null ? void 0 : t.hashed) !== null && n !== void 0 ? n : Si.hashed,
    cssVar: t == null ? void 0 : t.cssVar
  }) : t, l = nh();
  if (process.env.NODE_ENV !== "production") {
    const c = o.cssVar || s.cssVar, u = !!(typeof o.cssVar == "object" && (!((a = o.cssVar) === null || a === void 0) && a.key) || l);
    process.env.NODE_ENV !== "production" && i(!c || u, "breaking", "Missing key in `cssVar` config. Please upgrade to React 18 or set `cssVar.key` manually in each ConfigProvider inside `cssVar` enabled ConfigProvider.");
  }
  return Qi(() => {
    var c, u;
    if (!e)
      return t;
    const d = Object.assign({}, s.components);
    Object.keys(e.components || {}).forEach((g) => {
      d[g] = Object.assign(Object.assign({}, d[g]), e.components[g]);
    });
    const v = `css-var-${l.replace(/:/g, "")}`, b = ((c = o.cssVar) !== null && c !== void 0 ? c : s.cssVar) && Object.assign(Object.assign(Object.assign({
      prefix: r == null ? void 0 : r.prefixCls
    }, typeof s.cssVar == "object" ? s.cssVar : {}), typeof o.cssVar == "object" ? o.cssVar : {}), {
      key: typeof o.cssVar == "object" && ((u = o.cssVar) === null || u === void 0 ? void 0 : u.key) || v
    });
    return Object.assign(Object.assign(Object.assign({}, s), o), {
      token: Object.assign(Object.assign({}, s.token), o.token),
      components: d,
      cssVar: b
    });
  }, [o, s], (c, u) => c.some((d, v) => {
    const b = u[v];
    return !Za(d, b, !0);
  }));
}
function cs(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}
function ih(e) {
  return e && J(e) === "object" && cs(e.nativeElement) ? e.nativeElement : cs(e) ? e : null;
}
function Fn(e) {
  var t = ih(e);
  if (t)
    return t;
  if (e instanceof H.Component) {
    var r;
    return (r = So.findDOMNode) === null || r === void 0 ? void 0 : r.call(So, e);
  }
  return null;
}
var oh = ["children"], ic = /* @__PURE__ */ S.createContext({});
function sh(e) {
  var t = e.children, r = ht(e, oh);
  return /* @__PURE__ */ S.createElement(ic.Provider, {
    value: r
  }, t);
}
var lh = /* @__PURE__ */ function(e) {
  Gt(r, e);
  var t = Kt(r);
  function r() {
    return Ue(this, r), t.apply(this, arguments);
  }
  return Ye(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
}(S.Component);
function ch(e) {
  var t = S.useReducer(function(s) {
    return s + 1;
  }, 0), r = B(t, 2), n = r[1], a = S.useRef(e), i = zr(function() {
    return a.current;
  }), o = zr(function(s) {
    a.current = typeof s == "function" ? s(a.current) : s, n();
  });
  return [i, o];
}
var kt = "none", bn = "appear", yn = "enter", Sn = "leave", us = "none", yt = "prepare", ar = "start", ir = "active", vo = "end", oc = "prepared";
function ds(e, t) {
  var r = {};
  return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit".concat(e)] = "webkit".concat(t), r["Moz".concat(e)] = "moz".concat(t), r["ms".concat(e)] = "MS".concat(t), r["O".concat(e)] = "o".concat(t.toLowerCase()), r;
}
function uh(e, t) {
  var r = {
    animationend: ds("Animation", "AnimationEnd"),
    transitionend: ds("Transition", "TransitionEnd")
  };
  return e && ("AnimationEvent" in t || delete r.animationend.animation, "TransitionEvent" in t || delete r.transitionend.transition), r;
}
var dh = uh(Tt(), typeof window < "u" ? window : {}), sc = {};
if (Tt()) {
  var fh = document.createElement("div");
  sc = fh.style;
}
var xn = {};
function lc(e) {
  if (xn[e])
    return xn[e];
  var t = dh[e];
  if (t)
    for (var r = Object.keys(t), n = r.length, a = 0; a < n; a += 1) {
      var i = r[a];
      if (Object.prototype.hasOwnProperty.call(t, i) && i in sc)
        return xn[e] = t[i], xn[e];
    }
  return "";
}
var cc = lc("animationend"), uc = lc("transitionend"), dc = !!(cc && uc), fs = cc || "animationend", vs = uc || "transitionend";
function ps(e, t) {
  if (!e) return null;
  if (J(e) === "object") {
    var r = t.replace(/-\w/g, function(n) {
      return n[1].toUpperCase();
    });
    return e[r];
  }
  return "".concat(e, "-").concat(t);
}
const vh = function(e) {
  var t = De();
  function r(a) {
    a && (a.removeEventListener(vs, e), a.removeEventListener(fs, e));
  }
  function n(a) {
    t.current && t.current !== a && r(t.current), a && a !== t.current && (a.addEventListener(vs, e), a.addEventListener(fs, e), t.current = a);
  }
  return S.useEffect(function() {
    return function() {
      r(t.current);
    };
  }, []), [n, r];
};
var fc = Tt() ? du : St, vc = function(t) {
  return +setTimeout(t, 16);
}, pc = function(t) {
  return clearTimeout(t);
};
typeof window < "u" && "requestAnimationFrame" in window && (vc = function(t) {
  return window.requestAnimationFrame(t);
}, pc = function(t) {
  return window.cancelAnimationFrame(t);
});
var hs = 0, Ea = /* @__PURE__ */ new Map();
function hc(e) {
  Ea.delete(e);
}
var fr = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  hs += 1;
  var n = hs;
  function a(i) {
    if (i === 0)
      hc(n), t();
    else {
      var o = vc(function() {
        a(i - 1);
      });
      Ea.set(n, o);
    }
  }
  return a(r), n;
};
fr.cancel = function(e) {
  var t = Ea.get(e);
  return hc(e), pc(t);
};
process.env.NODE_ENV !== "production" && (fr.ids = function() {
  return Ea;
});
const ph = function() {
  var e = S.useRef(null);
  function t() {
    fr.cancel(e.current);
  }
  function r(n) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    t();
    var i = fr(function() {
      a <= 1 ? n({
        isCanceled: function() {
          return i !== e.current;
        }
      }) : r(n, a - 1);
    });
    e.current = i;
  }
  return S.useEffect(function() {
    return function() {
      t();
    };
  }, []), [r, t];
};
var hh = [yt, ar, ir, vo], mh = [yt, oc], mc = !1, gh = !0;
function gc(e) {
  return e === ir || e === vo;
}
const bh = function(e, t, r) {
  var n = Hr(us), a = B(n, 2), i = a[0], o = a[1], s = ph(), l = B(s, 2), c = l[0], u = l[1];
  function d() {
    o(yt, !0);
  }
  var v = t ? mh : hh;
  return fc(function() {
    if (i !== us && i !== vo) {
      var b = v.indexOf(i), g = v[b + 1], m = r(i);
      m === mc ? o(g, !0) : g && c(function(f) {
        function x() {
          f.isCanceled() || o(g, !0);
        }
        m === !0 ? x() : Promise.resolve(m).then(x);
      });
    }
  }, [e, i]), S.useEffect(function() {
    return function() {
      u();
    };
  }, []), [d, i];
};
function yh(e, t, r, n) {
  var a = n.motionEnter, i = a === void 0 ? !0 : a, o = n.motionAppear, s = o === void 0 ? !0 : o, l = n.motionLeave, c = l === void 0 ? !0 : l, u = n.motionDeadline, d = n.motionLeaveImmediately, v = n.onAppearPrepare, b = n.onEnterPrepare, g = n.onLeavePrepare, m = n.onAppearStart, f = n.onEnterStart, x = n.onLeaveStart, h = n.onAppearActive, $ = n.onEnterActive, P = n.onLeaveActive, C = n.onAppearEnd, _ = n.onEnterEnd, y = n.onLeaveEnd, w = n.onVisibleChanged, O = Hr(), T = B(O, 2), j = T[0], k = T[1], F = ch(kt), M = B(F, 2), I = M[0], N = M[1], V = Hr(null), z = B(V, 2), Q = z[0], X = z[1], Z = I(), q = De(!1), W = De(null);
  function U() {
    return r();
  }
  var de = De(!1);
  function ie() {
    N(kt), X(null, !0);
  }
  var ve = zr(function(Re) {
    var _e = I();
    if (_e !== kt) {
      var te = U();
      if (!(Re && !Re.deadline && Re.target !== te)) {
        var ee = de.current, xe;
        _e === bn && ee ? xe = C == null ? void 0 : C(te, Re) : _e === yn && ee ? xe = _ == null ? void 0 : _(te, Re) : _e === Sn && ee && (xe = y == null ? void 0 : y(te, Re)), ee && xe !== !1 && ie();
      }
    }
  }), le = vh(ve), fe = B(le, 1), ce = fe[0], we = function(_e) {
    switch (_e) {
      case bn:
        return E(E(E({}, yt, v), ar, m), ir, h);
      case yn:
        return E(E(E({}, yt, b), ar, f), ir, $);
      case Sn:
        return E(E(E({}, yt, g), ar, x), ir, P);
      default:
        return {};
    }
  }, Pe = S.useMemo(function() {
    return we(Z);
  }, [Z]), Ie = bh(Z, !e, function(Re) {
    if (Re === yt) {
      var _e = Pe[yt];
      return _e ? _e(U()) : mc;
    }
    if (Y in Pe) {
      var te;
      X(((te = Pe[Y]) === null || te === void 0 ? void 0 : te.call(Pe, U(), null)) || null);
    }
    return Y === ir && Z !== kt && (ce(U()), u > 0 && (clearTimeout(W.current), W.current = setTimeout(function() {
      ve({
        deadline: !0
      });
    }, u))), Y === oc && ie(), gh;
  }), L = B(Ie, 2), $e = L[0], Y = L[1], oe = gc(Y);
  de.current = oe;
  var Ae = De(null);
  fc(function() {
    if (!(q.current && Ae.current === t)) {
      k(t);
      var Re = q.current;
      q.current = !0;
      var _e;
      !Re && t && s && (_e = bn), Re && t && i && (_e = yn), (Re && !t && c || !Re && d && !t && c) && (_e = Sn);
      var te = we(_e);
      _e && (e || te[yt]) ? (N(_e), $e()) : N(kt), Ae.current = t;
    }
  }, [t]), St(function() {
    // Cancel appear
    (Z === bn && !s || // Cancel enter
    Z === yn && !i || // Cancel leave
    Z === Sn && !c) && N(kt);
  }, [s, i, c]), St(function() {
    return function() {
      q.current = !1, clearTimeout(W.current);
    };
  }, []);
  var ue = S.useRef(!1);
  St(function() {
    j && (ue.current = !0), j !== void 0 && Z === kt && ((ue.current || j) && (w == null || w(j)), ue.current = !0);
  }, [j, Z]);
  var Le = Q;
  return Pe[yt] && Y === ar && (Le = R({
    transition: "none"
  }, Le)), [Z, Y, Le, j ?? t];
}
function Sh(e) {
  var t = e;
  J(e) === "object" && (t = e.transitionSupport);
  function r(a, i) {
    return !!(a.motionName && t && i !== !1);
  }
  var n = /* @__PURE__ */ S.forwardRef(function(a, i) {
    var o = a.visible, s = o === void 0 ? !0 : o, l = a.removeOnLeave, c = l === void 0 ? !0 : l, u = a.forceRender, d = a.children, v = a.motionName, b = a.leavedClassName, g = a.eventProps, m = S.useContext(ic), f = m.motion, x = r(a, f), h = De(), $ = De();
    function P() {
      try {
        return h.current instanceof HTMLElement ? h.current : Fn($.current);
      } catch {
        return null;
      }
    }
    var C = yh(x, s, P, a), _ = B(C, 4), y = _[0], w = _[1], O = _[2], T = _[3], j = S.useRef(T);
    T && (j.current = !0);
    var k = S.useCallback(function(z) {
      h.current = z, sl(i, z);
    }, [i]), F, M = R(R({}, g), {}, {
      visible: s
    });
    if (!d)
      F = null;
    else if (y === kt)
      T ? F = d(R({}, M), k) : !c && j.current && b ? F = d(R(R({}, M), {}, {
        className: b
      }), k) : u || !c && !b ? F = d(R(R({}, M), {}, {
        style: {
          display: "none"
        }
      }), k) : F = null;
    else {
      var I;
      w === yt ? I = "prepare" : gc(w) ? I = "active" : w === ar && (I = "start");
      var N = ps(v, "".concat(y, "-").concat(I));
      F = d(R(R({}, M), {}, {
        className: Se(ps(v, y), E(E({}, N, N && I), v, typeof v == "string")),
        style: O
      }), k);
    }
    if (/* @__PURE__ */ S.isValidElement(F) && cl(F)) {
      var V = dl(F);
      V || (F = /* @__PURE__ */ S.cloneElement(F, {
        ref: k
      }));
    }
    return /* @__PURE__ */ S.createElement(lh, {
      ref: $
    }, F);
  });
  return n.displayName = "CSSMotion", n;
}
const xh = Sh(dc);
var Ei = "add", $i = "keep", _i = "remove", Va = "removed";
function Ch(e) {
  var t;
  return e && J(e) === "object" && "key" in e ? t = e : t = {
    key: e
  }, R(R({}, t), {}, {
    key: String(t.key)
  });
}
function wi() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  return e.map(Ch);
}
function Eh() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = [], n = 0, a = t.length, i = wi(e), o = wi(t);
  i.forEach(function(c) {
    for (var u = !1, d = n; d < a; d += 1) {
      var v = o[d];
      if (v.key === c.key) {
        n < d && (r = r.concat(o.slice(n, d).map(function(b) {
          return R(R({}, b), {}, {
            status: Ei
          });
        })), n = d), r.push(R(R({}, v), {}, {
          status: $i
        })), n += 1, u = !0;
        break;
      }
    }
    u || r.push(R(R({}, c), {}, {
      status: _i
    }));
  }), n < a && (r = r.concat(o.slice(n).map(function(c) {
    return R(R({}, c), {}, {
      status: Ei
    });
  })));
  var s = {};
  r.forEach(function(c) {
    var u = c.key;
    s[u] = (s[u] || 0) + 1;
  });
  var l = Object.keys(s).filter(function(c) {
    return s[c] > 1;
  });
  return l.forEach(function(c) {
    r = r.filter(function(u) {
      var d = u.key, v = u.status;
      return d !== c || v !== _i;
    }), r.forEach(function(u) {
      u.key === c && (u.status = $i);
    });
  }), r;
}
var $h = ["component", "children", "onVisibleChanged", "onAllRemoved"], _h = ["status"], wh = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearPrepare", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function Ph(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : xh, r = /* @__PURE__ */ function(n) {
    Gt(i, n);
    var a = Kt(i);
    function i() {
      var o;
      Ue(this, i);
      for (var s = arguments.length, l = new Array(s), c = 0; c < s; c++)
        l[c] = arguments[c];
      return o = a.call.apply(a, [this].concat(l)), E(ne(o), "state", {
        keyEntities: []
      }), E(ne(o), "removeKey", function(u) {
        o.setState(function(d) {
          var v = d.keyEntities.map(function(b) {
            return b.key !== u ? b : R(R({}, b), {}, {
              status: Va
            });
          });
          return {
            keyEntities: v
          };
        }, function() {
          var d = o.state.keyEntities, v = d.filter(function(b) {
            var g = b.status;
            return g !== Va;
          }).length;
          v === 0 && o.props.onAllRemoved && o.props.onAllRemoved();
        });
      }), o;
    }
    return Ye(i, [{
      key: "render",
      value: function() {
        var s = this, l = this.state.keyEntities, c = this.props, u = c.component, d = c.children, v = c.onVisibleChanged;
        c.onAllRemoved;
        var b = ht(c, $h), g = u || S.Fragment, m = {};
        return wh.forEach(function(f) {
          m[f] = b[f], delete b[f];
        }), delete b.keys, /* @__PURE__ */ S.createElement(g, b, l.map(function(f, x) {
          var h = f.status, $ = ht(f, _h), P = h === Ei || h === $i;
          return /* @__PURE__ */ S.createElement(t, Ke({}, m, {
            key: $.key,
            visible: P,
            eventProps: $,
            onVisibleChanged: function(_) {
              v == null || v(_, {
                key: $.key
              }), _ || s.removeKey($.key);
            }
          }), function(C, _) {
            return d(R(R({}, C), {}, {
              index: x
            }), _);
          });
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function(s, l) {
        var c = s.keys, u = l.keyEntities, d = wi(c), v = Eh(u, d);
        return {
          keyEntities: v.filter(function(b) {
            var g = u.find(function(m) {
              var f = m.key;
              return b.key === f;
            });
            return !(g && g.status === Va && b.status === _i);
          })
        };
      }
    }]), i;
  }(S.Component);
  return E(r, "defaultProps", {
    component: "div"
  }), r;
}
Ph(dc);
function Oh(e) {
  const {
    children: t
  } = e, [, r] = Ca(), {
    motion: n
  } = r, a = S.useRef(!1);
  return a.current = a.current || n === !1, a.current ? /* @__PURE__ */ S.createElement(sh, {
    motion: n
  }, t) : t;
}
const bc = /* @__PURE__ */ S.memo(({
  dropdownMatchSelectWidth: e
}) => (Ut("ConfigProvider").deprecated(e === void 0, "dropdownMatchSelectWidth", "popupMatchSelectWidth"), null));
process.env.NODE_ENV !== "production" && (bc.displayName = "PropWarning");
const Rh = process.env.NODE_ENV !== "production" ? bc : () => null;
var Th = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
let Pi = !1;
process.env.NODE_ENV;
const Fh = ["getTargetContainer", "getPopupContainer", "renderEmpty", "input", "pagination", "form", "select", "button"];
let yc;
function Mh() {
  return yc || xi;
}
function Ah(e) {
  return Object.keys(e).some((t) => t.endsWith("Color"));
}
const jh = (e) => {
  const {
    prefixCls: t,
    iconPrefixCls: r,
    theme: n,
    holderRender: a
  } = e;
  t !== void 0 && (yc = t), n && Ah(n) && (process.env.NODE_ENV !== "production" && ga(!1, "ConfigProvider", "`config` of css variable theme is not work in v5. Please use new `theme` config instead."), Rp(Mh(), n));
}, kh = (e) => {
  const {
    children: t,
    csp: r,
    autoInsertSpaceInButton: n,
    alert: a,
    anchor: i,
    form: o,
    locale: s,
    componentSize: l,
    direction: c,
    space: u,
    splitter: d,
    virtual: v,
    dropdownMatchSelectWidth: b,
    popupMatchSelectWidth: g,
    popupOverflow: m,
    legacyLocale: f,
    parentContext: x,
    iconPrefixCls: h,
    theme: $,
    componentDisabled: P,
    segmented: C,
    statistic: _,
    spin: y,
    calendar: w,
    carousel: O,
    cascader: T,
    collapse: j,
    typography: k,
    checkbox: F,
    descriptions: M,
    divider: I,
    drawer: N,
    skeleton: V,
    steps: z,
    image: Q,
    layout: X,
    list: Z,
    mentions: q,
    modal: W,
    progress: U,
    result: de,
    slider: ie,
    breadcrumb: ve,
    menu: le,
    pagination: fe,
    input: ce,
    textArea: we,
    empty: Pe,
    badge: Ie,
    radio: L,
    rate: $e,
    switch: Y,
    transfer: oe,
    avatar: Ae,
    message: ue,
    tag: Le,
    table: Re,
    card: _e,
    tabs: te,
    timeline: ee,
    timePicker: xe,
    upload: ct,
    notification: Xe,
    tree: Je,
    colorPicker: ut,
    datePicker: Et,
    rangePicker: yr,
    flex: Sr,
    wave: Te,
    dropdown: pe,
    warning: dt,
    tour: Ft,
    tooltip: wa,
    popover: xr,
    popconfirm: cn,
    floatButtonGroup: Mt,
    variant: Cr,
    inputNumber: Er,
    treeSelect: un
  } = e, dn = S.useCallback((je, p) => {
    const {
      prefixCls: A
    } = e;
    if (p)
      return p;
    const D = A || x.getPrefixCls("");
    return je ? `${D}-${je}` : D;
  }, [x.getPrefixCls, e.prefixCls]), Vt = h || x.iconPrefixCls || co, Jt = r || x.csp;
  eh(Vt, Jt);
  const Lt = ah($, x.theme, {
    prefixCls: dn("")
  });
  process.env.NODE_ENV !== "production" && (Pi = Pi || !!Lt);
  const Qt = {
    csp: Jt,
    autoInsertSpaceInButton: n,
    alert: a,
    anchor: i,
    locale: s || f,
    direction: c,
    space: u,
    splitter: d,
    virtual: v,
    popupMatchSelectWidth: g ?? b,
    popupOverflow: m,
    getPrefixCls: dn,
    iconPrefixCls: Vt,
    theme: Lt,
    segmented: C,
    statistic: _,
    spin: y,
    calendar: w,
    carousel: O,
    cascader: T,
    collapse: j,
    typography: k,
    checkbox: F,
    descriptions: M,
    divider: I,
    drawer: N,
    skeleton: V,
    steps: z,
    image: Q,
    input: ce,
    textArea: we,
    layout: X,
    list: Z,
    mentions: q,
    modal: W,
    progress: U,
    result: de,
    slider: ie,
    breadcrumb: ve,
    menu: le,
    pagination: fe,
    empty: Pe,
    badge: Ie,
    radio: L,
    rate: $e,
    switch: Y,
    transfer: oe,
    avatar: Ae,
    message: ue,
    tag: Le,
    table: Re,
    card: _e,
    tabs: te,
    timeline: ee,
    timePicker: xe,
    upload: ct,
    notification: Xe,
    tree: Je,
    colorPicker: ut,
    datePicker: Et,
    rangePicker: yr,
    flex: Sr,
    wave: Te,
    dropdown: pe,
    warning: dt,
    tour: Ft,
    tooltip: wa,
    popover: xr,
    popconfirm: cn,
    floatButtonGroup: Mt,
    variant: Cr,
    inputNumber: Er,
    treeSelect: un
  };
  process.env.NODE_ENV !== "production" && Ut("ConfigProvider")(!("autoInsertSpaceInButton" in e), "deprecated", "`autoInsertSpaceInButton` is deprecated. Please use `{ button: { autoInsertSpace: boolean }}` instead.");
  const At = Object.assign({}, x);
  Object.keys(Qt).forEach((je) => {
    Qt[je] !== void 0 && (At[je] = Qt[je]);
  }), Fh.forEach((je) => {
    const p = e[je];
    p && (At[je] = p);
  }), typeof n < "u" && (At.button = Object.assign({
    autoInsertSpace: n
  }, At.button));
  const jt = Qi(() => At, At, (je, p) => {
    const A = Object.keys(je), D = Object.keys(p);
    return A.length !== D.length || A.some((G) => je[G] !== p[G]);
  }), {
    layer: $r
  } = S.useContext(an), fn = S.useMemo(() => ({
    prefixCls: Vt,
    csp: Jt,
    layer: $r ? "antd" : void 0
  }), [Vt, Jt, $r]);
  let ze = /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(Rh, {
    dropdownMatchSelectWidth: b
  }), t);
  const vn = S.useMemo(() => {
    var je, p, A, D;
    return nr(((je = xa.Form) === null || je === void 0 ? void 0 : je.defaultValidateMessages) || {}, ((A = (p = jt.locale) === null || p === void 0 ? void 0 : p.Form) === null || A === void 0 ? void 0 : A.defaultValidateMessages) || {}, ((D = jt.form) === null || D === void 0 ? void 0 : D.validateMessages) || {}, (o == null ? void 0 : o.validateMessages) || {});
  }, [jt, o == null ? void 0 : o.validateMessages]);
  Object.keys(vn).length > 0 && (ze = /* @__PURE__ */ S.createElement(ip.Provider, {
    value: vn
  }, ze)), s && (ze = /* @__PURE__ */ S.createElement(Wl, {
    locale: s,
    _ANT_MARK__: Bl
  }, ze)), ze = /* @__PURE__ */ S.createElement(lo.Provider, {
    value: fn
  }, ze), l && (ze = /* @__PURE__ */ S.createElement(Fp, {
    size: l
  }, ze)), ze = /* @__PURE__ */ S.createElement(Oh, null, ze);
  const Pa = S.useMemo(() => {
    const je = Lt || {}, {
      algorithm: p,
      token: A,
      components: D,
      cssVar: G
    } = je, he = Th(je, ["algorithm", "token", "components", "cssVar"]), me = p && (!Array.isArray(p) || p.length > 0) ? ti(p) : Gl, ae = {};
    Object.entries(D || {}).forEach(([We, Fe]) => {
      const ge = Object.assign({}, Fe);
      "algorithm" in ge && (ge.algorithm === !0 ? ge.theme = me : (Array.isArray(ge.algorithm) || typeof ge.algorithm == "function") && (ge.theme = ti(ge.algorithm)), delete ge.algorithm), ae[We] = ge;
    });
    const re = Object.assign(Object.assign({}, Vr), A);
    return Object.assign(Object.assign({}, he), {
      theme: me,
      token: re,
      components: ae,
      override: Object.assign({
        override: re
      }, ae),
      cssVar: G
    });
  }, [Lt]);
  return $ && (ze = /* @__PURE__ */ S.createElement(Kl.Provider, {
    value: Pa
  }, ze)), jt.warning && (ze = /* @__PURE__ */ S.createElement(hl.Provider, {
    value: jt.warning
  }, ze)), P !== void 0 && (ze = /* @__PURE__ */ S.createElement(Tp, {
    disabled: P
  }, ze)), /* @__PURE__ */ S.createElement(Dt.Provider, {
    value: jt
  }, ze);
}, gr = (e) => {
  const t = S.useContext(Dt), r = S.useContext(Hl);
  return /* @__PURE__ */ S.createElement(kh, Object.assign({
    parentContext: t,
    legacyLocale: r
  }, e));
};
gr.ConfigContext = Dt;
gr.SizeContext = dr;
gr.config = jh;
gr.useConfig = Mp;
Object.defineProperty(gr, "SizeContext", {
  get: () => (process.env.NODE_ENV !== "production" && ga(!1, "ConfigProvider", "ConfigProvider.SizeContext is deprecated. Please use `ConfigProvider.useConfig().componentSize` instead."), dr)
});
process.env.NODE_ENV !== "production" && (gr.displayName = "ConfigProvider");
function Sc(e, t) {
  this.v = e, this.k = t;
}
function qe(e, t, r, n) {
  var a = Object.defineProperty;
  try {
    a({}, "", {});
  } catch {
    a = 0;
  }
  qe = function(o, s, l, c) {
    function u(d, v) {
      qe(o, d, function(b) {
        return this._invoke(d, v, b);
      });
    }
    s ? a ? a(o, s, {
      value: l,
      enumerable: !c,
      configurable: !c,
      writable: !c
    }) : o[s] = l : (u("next", 0), u("throw", 1), u("return", 2));
  }, qe(e, t, r, n);
}
function po() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e, t, r = typeof Symbol == "function" ? Symbol : {}, n = r.iterator || "@@iterator", a = r.toStringTag || "@@toStringTag";
  function i(b, g, m, f) {
    var x = g && g.prototype instanceof s ? g : s, h = Object.create(x.prototype);
    return qe(h, "_invoke", function($, P, C) {
      var _, y, w, O = 0, T = C || [], j = !1, k = {
        p: 0,
        n: 0,
        v: e,
        a: F,
        f: F.bind(e, 4),
        d: function(I, N) {
          return _ = I, y = 0, w = e, k.n = N, o;
        }
      };
      function F(M, I) {
        for (y = M, w = I, t = 0; !j && O && !N && t < T.length; t++) {
          var N, V = T[t], z = k.p, Q = V[2];
          M > 3 ? (N = Q === I) && (w = V[(y = V[4]) ? 5 : (y = 3, 3)], V[4] = V[5] = e) : V[0] <= z && ((N = M < 2 && z < V[1]) ? (y = 0, k.v = I, k.n = V[1]) : z < Q && (N = M < 3 || V[0] > I || I > Q) && (V[4] = M, V[5] = I, k.n = Q, y = 0));
        }
        if (N || M > 1) return o;
        throw j = !0, I;
      }
      return function(M, I, N) {
        if (O > 1) throw TypeError("Generator is already running");
        for (j && I === 1 && F(I, N), y = I, w = N; (t = y < 2 ? e : w) || !j; ) {
          _ || (y ? y < 3 ? (y > 1 && (k.n = -1), F(y, w)) : k.n = w : k.v = w);
          try {
            if (O = 2, _) {
              if (y || (M = "next"), t = _[M]) {
                if (!(t = t.call(_, w))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                w = t.value, y < 2 && (y = 0);
              } else y === 1 && (t = _.return) && t.call(_), y < 2 && (w = TypeError("The iterator does not provide a '" + M + "' method"), y = 1);
              _ = e;
            } else if ((t = (j = k.n < 0) ? w : $.call(P, k)) !== o) break;
          } catch (V) {
            _ = e, y = 1, w = V;
          } finally {
            O = 1;
          }
        }
        return {
          value: t,
          done: j
        };
      };
    }(b, m, f), !0), h;
  }
  var o = {};
  function s() {
  }
  function l() {
  }
  function c() {
  }
  t = Object.getPrototypeOf;
  var u = [][n] ? t(t([][n]())) : (qe(t = {}, n, function() {
    return this;
  }), t), d = c.prototype = s.prototype = Object.create(u);
  function v(b) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(b, c) : (b.__proto__ = c, qe(b, a, "GeneratorFunction")), b.prototype = Object.create(d), b;
  }
  return l.prototype = c, qe(d, "constructor", c), qe(c, "constructor", l), l.displayName = "GeneratorFunction", qe(c, a, "GeneratorFunction"), qe(d), qe(d, a, "Generator"), qe(d, n, function() {
    return this;
  }), qe(d, "toString", function() {
    return "[object Generator]";
  }), (po = function() {
    return {
      w: i,
      m: v
    };
  })();
}
function Nn(e, t) {
  function r(a, i, o, s) {
    try {
      var l = e[a](i), c = l.value;
      return c instanceof Sc ? t.resolve(c.v).then(function(u) {
        r("next", u, o, s);
      }, function(u) {
        r("throw", u, o, s);
      }) : t.resolve(c).then(function(u) {
        l.value = u, o(l);
      }, function(u) {
        return r("throw", u, o, s);
      });
    } catch (u) {
      s(u);
    }
  }
  var n;
  this.next || (qe(Nn.prototype), qe(Nn.prototype, typeof Symbol == "function" && Symbol.asyncIterator || "@asyncIterator", function() {
    return this;
  })), qe(this, "_invoke", function(a, i, o) {
    function s() {
      return new t(function(l, c) {
        r(a, o, l, c);
      });
    }
    return n = n ? n.then(s, s) : s();
  }, !0);
}
function xc(e, t, r, n, a) {
  return new Nn(po().w(e, t, r, n), a || Promise);
}
function Ih(e, t, r, n, a) {
  var i = xc(e, t, r, n, a);
  return i.next().then(function(o) {
    return o.done ? o.value : i.next();
  });
}
function Nh(e) {
  var t = Object(e), r = [];
  for (var n in t) r.unshift(n);
  return function a() {
    for (; r.length; ) if ((n = r.pop()) in t) return a.value = n, a.done = !1, a;
    return a.done = !0, a;
  };
}
function ms(e) {
  if (e != null) {
    var t = e[typeof Symbol == "function" && Symbol.iterator || "@@iterator"], r = 0;
    if (t) return t.call(e);
    if (typeof e.next == "function") return e;
    if (!isNaN(e.length)) return {
      next: function() {
        return e && r >= e.length && (e = void 0), {
          value: e && e[r++],
          done: !e
        };
      }
    };
  }
  throw new TypeError(J(e) + " is not iterable");
}
function gt() {
  var e = po(), t = e.m(gt), r = (Object.getPrototypeOf ? Object.getPrototypeOf(t) : t.__proto__).constructor;
  function n(o) {
    var s = typeof o == "function" && o.constructor;
    return !!s && (s === r || (s.displayName || s.name) === "GeneratorFunction");
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
        abrupt: function(d, v) {
          return l(c.a, a[d], v);
        },
        delegateYield: function(d, v, b) {
          return s.resultName = v, l(c.d, ms(d), b);
        },
        finish: function(d) {
          return l(c.f, d);
        }
      }, l = function(d, v, b) {
        c.p = s.prev, c.n = s.next;
        try {
          return d(v, b);
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
  return (gt = function() {
    return {
      wrap: function(l, c, u, d) {
        return e.w(i(l), c, u, d && d.reverse());
      },
      isGeneratorFunction: n,
      mark: e.m,
      awrap: function(l, c) {
        return new Sc(l, c);
      },
      AsyncIterator: Nn,
      async: function(l, c, u, d, v) {
        return (n(c) ? xc : Ih)(i(l), c, u, d, v);
      },
      keys: Nh,
      values: ms
    };
  })();
}
function gs(e, t, r, n, a, i, o) {
  try {
    var s = e[i](o), l = s.value;
  } catch (c) {
    return void r(c);
  }
  s.done ? t(l) : Promise.resolve(l).then(n, a);
}
function on(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(n, a) {
      var i = e.apply(t, r);
      function o(l) {
        gs(i, n, a, o, s, "next", l);
      }
      function s(l) {
        gs(i, n, a, o, s, "throw", l);
      }
      o(void 0);
    });
  };
}
const Cc = (e) => {
  const t = H.useContext(dr);
  return H.useMemo(() => e ? typeof e == "string" ? e ?? t : typeof e == "function" ? e(t) : t : t, [e, t]);
};
function Dn(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [];
  return H.Children.forEach(e, function(n) {
    n == null && !t.keepEmpty || (Array.isArray(n) ? r = r.concat(Dn(n)) : ol(n) && n.props ? r = r.concat(Dn(n.props.children, t)) : r.push(n));
  }), r;
}
const Ec = /* @__PURE__ */ S.createContext(null), $c = (e, t) => {
  const r = S.useContext(Ec), n = S.useMemo(() => {
    if (!r)
      return "";
    const {
      compactDirection: a,
      isFirstItem: i,
      isLastItem: o
    } = r, s = a === "vertical" ? "-vertical-" : "-";
    return Se(`${e}-compact${s}item`, {
      [`${e}-compact${s}first-item`]: i,
      [`${e}-compact${s}last-item`]: o,
      [`${e}-compact${s}item-rtl`]: t === "rtl"
    });
  }, [e, t, r]);
  return {
    compactSize: r == null ? void 0 : r.compactSize,
    compactDirection: r == null ? void 0 : r.compactDirection,
    compactItemClassnames: n
  };
}, Dh = (e) => {
  const {
    children: t
  } = e;
  return /* @__PURE__ */ S.createElement(Ec.Provider, {
    value: null
  }, t);
}, bs = /^[\u4E00-\u9FA5]{2}$/;
bs.test.bind(bs);
function Sb(e) {
  return typeof e == "string";
}
["default", "primary", "danger"].concat(K(qp));
var Cn = 2, ys = 0.16, Vh = 0.05, Lh = 0.05, zh = 0.15, _c = 5, wc = 4, Hh = [{
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
function Ss(e, t, r) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = r ? Math.round(e.h) - Cn * t : Math.round(e.h) + Cn * t : n = r ? Math.round(e.h) + Cn * t : Math.round(e.h) - Cn * t, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function xs(e, t, r) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return r ? n = e.s - ys * t : t === wc ? n = e.s + ys : n = e.s + Vh * t, n > 1 && (n = 1), r && t === _c && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Math.round(n * 100) / 100;
}
function Cs(e, t, r) {
  var n;
  return r ? n = e.v + Lh * t : n = e.v - zh * t, n = Math.max(0, Math.min(1, n)), Math.round(n * 100) / 100;
}
function Bh(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [], n = new Oe(e), a = n.toHsv(), i = _c; i > 0; i -= 1) {
    var o = new Oe({
      h: Ss(a, i, !0),
      s: xs(a, i, !0),
      v: Cs(a, i, !0)
    });
    r.push(o);
  }
  r.push(n);
  for (var s = 1; s <= wc; s += 1) {
    var l = new Oe({
      h: Ss(a, s),
      s: xs(a, s),
      v: Cs(a, s)
    });
    r.push(l);
  }
  return t.theme === "dark" ? Hh.map(function(c) {
    var u = c.index, d = c.amount;
    return new Oe(t.backgroundColor || "#141414").mix(r[u], d).toHexString();
  }) : r.map(function(c) {
    return c.toHexString();
  });
}
var Oi = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
Oi.primary = Oi[5];
function Pc(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e);
}
function Wh(e) {
  return Pc(e) instanceof ShadowRoot;
}
function qh(e) {
  return Wh(e) ? Pc(e) : null;
}
function Uh(e) {
  return e.replace(/-(.)/g, function(t, r) {
    return r.toUpperCase();
  });
}
function Yh(e, t) {
  Me(e, "[@ant-design/icons] ".concat(t));
}
function Es(e) {
  return J(e) === "object" && typeof e.name == "string" && typeof e.theme == "string" && (J(e.icon) === "object" || typeof e.icon == "function");
}
function $s() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(e).reduce(function(t, r) {
    var n = e[r];
    switch (r) {
      case "class":
        t.className = n, delete t.class;
        break;
      default:
        delete t[r], t[Uh(r)] = n;
    }
    return t;
  }, {});
}
function Ri(e, t, r) {
  return r ? /* @__PURE__ */ H.createElement(e.tag, R(R({
    key: t
  }, $s(e.attrs)), r), (e.children || []).map(function(n, a) {
    return Ri(n, "".concat(t, "-").concat(e.tag, "-").concat(a));
  })) : /* @__PURE__ */ H.createElement(e.tag, R({
    key: t
  }, $s(e.attrs)), (e.children || []).map(function(n, a) {
    return Ri(n, "".concat(t, "-").concat(e.tag, "-").concat(a));
  }));
}
function Oc(e) {
  return Bh(e)[0];
}
function Rc(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
var Gh = `
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
`, Kh = function(t) {
  var r = Rt(lo), n = r.csp, a = r.prefixCls, i = r.layer, o = Gh;
  a && (o = o.replace(/anticon/g, a)), i && (o = "@layer ".concat(i, ` {
`).concat(o, `
}`)), St(function() {
    var s = t.current, l = qh(s);
    Wt(o, "@ant-design-icons", {
      prepend: !i,
      csp: n,
      attachTo: l
    });
  }, []);
}, Xh = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"], Mr = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function Jh(e) {
  var t = e.primaryColor, r = e.secondaryColor;
  Mr.primaryColor = t, Mr.secondaryColor = r || Oc(t), Mr.calculated = !!r;
}
function Qh() {
  return R({}, Mr);
}
var br = function(t) {
  var r = t.icon, n = t.className, a = t.onClick, i = t.style, o = t.primaryColor, s = t.secondaryColor, l = ht(t, Xh), c = S.useRef(), u = Mr;
  if (o && (u = {
    primaryColor: o,
    secondaryColor: s || Oc(o)
  }), Kh(c), Yh(Es(r), "icon should be icon definiton, but got ".concat(r)), !Es(r))
    return null;
  var d = r;
  return d && typeof d.icon == "function" && (d = R(R({}, d), {}, {
    icon: d.icon(u.primaryColor, u.secondaryColor)
  })), Ri(d.icon, "svg-".concat(d.name), R(R({
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
br.displayName = "IconReact";
br.getTwoToneColors = Qh;
br.setTwoToneColors = Jh;
function Tc(e) {
  var t = Rc(e), r = B(t, 2), n = r[0], a = r[1];
  return br.setTwoToneColors({
    primaryColor: n,
    secondaryColor: a
  });
}
function Zh() {
  var e = br.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var em = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
Tc(Oi.primary);
var $a = /* @__PURE__ */ S.forwardRef(function(e, t) {
  var r = e.className, n = e.icon, a = e.spin, i = e.rotate, o = e.tabIndex, s = e.onClick, l = e.twoToneColor, c = ht(e, em), u = S.useContext(lo), d = u.prefixCls, v = d === void 0 ? "anticon" : d, b = u.rootClassName, g = Se(b, v, E(E({}, "".concat(v, "-").concat(n.name), !!n.name), "".concat(v, "-spin"), !!a || n.name === "loading"), r), m = o;
  m === void 0 && s && (m = -1);
  var f = i ? {
    msTransform: "rotate(".concat(i, "deg)"),
    transform: "rotate(".concat(i, "deg)")
  } : void 0, x = Rc(l), h = B(x, 2), $ = h[0], P = h[1];
  return /* @__PURE__ */ S.createElement("span", Ke({
    role: "img",
    "aria-label": n.name
  }, c, {
    ref: t,
    tabIndex: m,
    onClick: s,
    className: g
  }), /* @__PURE__ */ S.createElement(br, {
    icon: n,
    primaryColor: $,
    secondaryColor: P,
    style: f
  }));
});
$a.displayName = "AntdIcon";
$a.getTwoToneColor = Zh;
$a.setTwoToneColor = Tc;
function tm(e, t, r) {
  const {
    focusElCls: n,
    focus: a,
    borderElCls: i
  } = r, o = i ? "> *" : "", s = ["hover", a ? "focus" : null, "active"].filter(Boolean).map((l) => `&:${l} ${o}`).join(",");
  return {
    [`&-item:not(${t}-last-item)`]: {
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
function rm(e, t, r) {
  const {
    borderElCls: n
  } = r, a = n ? `> ${n}` : "";
  return {
    [`&-item:not(${t}-first-item):not(${t}-last-item) ${a}`]: {
      borderRadius: 0
    },
    [`&-item:not(${t}-last-item)${t}-first-item`]: {
      [`& ${a}, &${e}-sm ${a}, &${e}-lg ${a}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`&-item:not(${t}-first-item)${t}-last-item`]: {
      [`& ${a}, &${e}-sm ${a}, &${e}-lg ${a}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    }
  };
}
function nm(e, t = {
  focus: !0
}) {
  const {
    componentCls: r
  } = e, n = `${r}-compact`;
  return {
    [n]: Object.assign(Object.assign({}, tm(e, n, t)), rm(r, n, t))
  };
}
function am(e) {
  return !!(e.addonBefore || e.addonAfter);
}
function im(e) {
  return !!(e.prefix || e.suffix || e.allowClear);
}
function _s(e, t, r) {
  var n = t.cloneNode(!0), a = Object.create(e, {
    target: {
      value: n
    },
    currentTarget: {
      value: n
    }
  });
  return n.value = r, typeof t.selectionStart == "number" && typeof t.selectionEnd == "number" && (n.selectionStart = t.selectionStart, n.selectionEnd = t.selectionEnd), n.setSelectionRange = function() {
    t.setSelectionRange.apply(t, arguments);
  }, a;
}
function Vn(e, t, r, n) {
  if (r) {
    var a = t;
    if (t.type === "click") {
      a = _s(t, e, ""), r(a);
      return;
    }
    if (e.type !== "file" && n !== void 0) {
      a = _s(t, e, n), r(a);
      return;
    }
    r(a);
  }
}
function Fc(e, t) {
  if (e) {
    e.focus(t);
    var r = t || {}, n = r.cursor;
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
var Mc = /* @__PURE__ */ H.forwardRef(function(e, t) {
  var r, n, a, i = e.inputElement, o = e.children, s = e.prefixCls, l = e.prefix, c = e.suffix, u = e.addonBefore, d = e.addonAfter, v = e.className, b = e.style, g = e.disabled, m = e.readOnly, f = e.focused, x = e.triggerFocus, h = e.allowClear, $ = e.value, P = e.handleReset, C = e.hidden, _ = e.classes, y = e.classNames, w = e.dataAttrs, O = e.styles, T = e.components, j = e.onClear, k = o ?? i, F = (T == null ? void 0 : T.affixWrapper) || "span", M = (T == null ? void 0 : T.groupWrapper) || "span", I = (T == null ? void 0 : T.wrapper) || "span", N = (T == null ? void 0 : T.groupAddon) || "span", V = De(null), z = function($e) {
    var Y;
    (Y = V.current) !== null && Y !== void 0 && Y.contains($e.target) && (x == null || x());
  }, Q = im(e), X = /* @__PURE__ */ fu(k, {
    value: $,
    className: Se((r = k.props) === null || r === void 0 ? void 0 : r.className, !Q && (y == null ? void 0 : y.variant)) || null
  }), Z = De(null);
  if (H.useImperativeHandle(t, function() {
    return {
      nativeElement: Z.current || V.current
    };
  }), Q) {
    var q = null;
    if (h) {
      var W = !g && !m && $, U = "".concat(s, "-clear-icon"), de = J(h) === "object" && h !== null && h !== void 0 && h.clearIcon ? h.clearIcon : "✖";
      q = /* @__PURE__ */ H.createElement("button", {
        type: "button",
        tabIndex: -1,
        onClick: function($e) {
          P == null || P($e), j == null || j();
        },
        onMouseDown: function($e) {
          return $e.preventDefault();
        },
        className: Se(U, E(E({}, "".concat(U, "-hidden"), !W), "".concat(U, "-has-suffix"), !!c))
      }, de);
    }
    var ie = "".concat(s, "-affix-wrapper"), ve = Se(ie, E(E(E(E(E({}, "".concat(s, "-disabled"), g), "".concat(ie, "-disabled"), g), "".concat(ie, "-focused"), f), "".concat(ie, "-readonly"), m), "".concat(ie, "-input-with-clear-btn"), c && h && $), _ == null ? void 0 : _.affixWrapper, y == null ? void 0 : y.affixWrapper, y == null ? void 0 : y.variant), le = (c || h) && /* @__PURE__ */ H.createElement("span", {
      className: Se("".concat(s, "-suffix"), y == null ? void 0 : y.suffix),
      style: O == null ? void 0 : O.suffix
    }, q, c);
    X = /* @__PURE__ */ H.createElement(F, Ke({
      className: ve,
      style: O == null ? void 0 : O.affixWrapper,
      onClick: z
    }, w == null ? void 0 : w.affixWrapper, {
      ref: V
    }), l && /* @__PURE__ */ H.createElement("span", {
      className: Se("".concat(s, "-prefix"), y == null ? void 0 : y.prefix),
      style: O == null ? void 0 : O.prefix
    }, l), X, le);
  }
  if (am(e)) {
    var fe = "".concat(s, "-group"), ce = "".concat(fe, "-addon"), we = "".concat(fe, "-wrapper"), Pe = Se("".concat(s, "-wrapper"), fe, _ == null ? void 0 : _.wrapper, y == null ? void 0 : y.wrapper), Ie = Se(we, E({}, "".concat(we, "-disabled"), g), _ == null ? void 0 : _.group, y == null ? void 0 : y.groupWrapper);
    X = /* @__PURE__ */ H.createElement(M, {
      className: Ie,
      ref: Z
    }, /* @__PURE__ */ H.createElement(I, {
      className: Pe
    }, u && /* @__PURE__ */ H.createElement(N, {
      className: ce
    }, u), X, d && /* @__PURE__ */ H.createElement(N, {
      className: ce
    }, d)));
  }
  return /* @__PURE__ */ H.cloneElement(X, {
    className: Se((n = X.props) === null || n === void 0 ? void 0 : n.className, v) || null,
    style: R(R({}, (a = X.props) === null || a === void 0 ? void 0 : a.style), b),
    hidden: C
  });
}), om = ["show"];
function Ac(e, t) {
  return S.useMemo(function() {
    var r = {};
    t && (r.show = J(t) === "object" && t.formatter ? t.formatter : !!t), r = R(R({}, r), e);
    var n = r, a = n.show, i = ht(n, om);
    return R(R({}, i), {}, {
      show: !!a,
      showFormatter: typeof a == "function" ? a : void 0,
      strategy: i.strategy || function(o) {
        return o.length;
      }
    });
  }, [e, t]);
}
var sm = ["autoComplete", "onChange", "onFocus", "onBlur", "onPressEnter", "onKeyDown", "onKeyUp", "prefixCls", "disabled", "htmlSize", "className", "maxLength", "suffix", "showCount", "count", "type", "classes", "classNames", "styles", "onCompositionStart", "onCompositionEnd"], lm = /* @__PURE__ */ Wi(function(e, t) {
  var r = e.autoComplete, n = e.onChange, a = e.onFocus, i = e.onBlur, o = e.onPressEnter, s = e.onKeyDown, l = e.onKeyUp, c = e.prefixCls, u = c === void 0 ? "rc-input" : c, d = e.disabled, v = e.htmlSize, b = e.className, g = e.maxLength, m = e.suffix, f = e.showCount, x = e.count, h = e.type, $ = h === void 0 ? "text" : h, P = e.classes, C = e.classNames, _ = e.styles, y = e.onCompositionStart, w = e.onCompositionEnd, O = ht(e, sm), T = Ya(!1), j = B(T, 2), k = j[0], F = j[1], M = De(!1), I = De(!1), N = De(null), V = De(null), z = function(ee) {
    N.current && Fc(N.current, ee);
  }, Q = uo(e.defaultValue, {
    value: e.value
  }), X = B(Q, 2), Z = X[0], q = X[1], W = Z == null ? "" : String(Z), U = Ya(null), de = B(U, 2), ie = de[0], ve = de[1], le = Ac(x, f), fe = le.max || g, ce = le.strategy(W), we = !!fe && ce > fe;
  Hs(t, function() {
    var te;
    return {
      focus: z,
      blur: function() {
        var xe;
        (xe = N.current) === null || xe === void 0 || xe.blur();
      },
      setSelectionRange: function(xe, ct, Xe) {
        var Je;
        (Je = N.current) === null || Je === void 0 || Je.setSelectionRange(xe, ct, Xe);
      },
      select: function() {
        var xe;
        (xe = N.current) === null || xe === void 0 || xe.select();
      },
      input: N.current,
      nativeElement: ((te = V.current) === null || te === void 0 ? void 0 : te.nativeElement) || N.current
    };
  }), St(function() {
    I.current && (I.current = !1), F(function(te) {
      return te && d ? !1 : te;
    });
  }, [d]);
  var Pe = function(ee, xe, ct) {
    var Xe = xe;
    if (!M.current && le.exceedFormatter && le.max && le.strategy(xe) > le.max) {
      if (Xe = le.exceedFormatter(xe, {
        max: le.max
      }), xe !== Xe) {
        var Je, ut;
        ve([((Je = N.current) === null || Je === void 0 ? void 0 : Je.selectionStart) || 0, ((ut = N.current) === null || ut === void 0 ? void 0 : ut.selectionEnd) || 0]);
      }
    } else if (ct.source === "compositionEnd")
      return;
    q(Xe), N.current && Vn(N.current, ee, n, Xe);
  };
  St(function() {
    if (ie) {
      var te;
      (te = N.current) === null || te === void 0 || te.setSelectionRange.apply(te, K(ie));
    }
  }, [ie]);
  var Ie = function(ee) {
    Pe(ee, ee.target.value, {
      source: "change"
    });
  }, L = function(ee) {
    M.current = !1, Pe(ee, ee.currentTarget.value, {
      source: "compositionEnd"
    }), w == null || w(ee);
  }, $e = function(ee) {
    o && ee.key === "Enter" && !I.current && (I.current = !0, o(ee)), s == null || s(ee);
  }, Y = function(ee) {
    ee.key === "Enter" && (I.current = !1), l == null || l(ee);
  }, oe = function(ee) {
    F(!0), a == null || a(ee);
  }, Ae = function(ee) {
    I.current && (I.current = !1), F(!1), i == null || i(ee);
  }, ue = function(ee) {
    q(""), z(), N.current && Vn(N.current, ee, n);
  }, Le = we && "".concat(u, "-out-of-range"), Re = function() {
    var ee = Tf(e, [
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
    return /* @__PURE__ */ H.createElement("input", Ke({
      autoComplete: r
    }, ee, {
      onChange: Ie,
      onFocus: oe,
      onBlur: Ae,
      onKeyDown: $e,
      onKeyUp: Y,
      className: Se(u, E({}, "".concat(u, "-disabled"), d), C == null ? void 0 : C.input),
      style: _ == null ? void 0 : _.input,
      ref: N,
      size: v,
      type: $,
      onCompositionStart: function(ct) {
        M.current = !0, y == null || y(ct);
      },
      onCompositionEnd: L
    }));
  }, _e = function() {
    var ee = Number(fe) > 0;
    if (m || le.show) {
      var xe = le.showFormatter ? le.showFormatter({
        value: W,
        count: ce,
        maxLength: fe
      }) : "".concat(ce).concat(ee ? " / ".concat(fe) : "");
      return /* @__PURE__ */ H.createElement(H.Fragment, null, le.show && /* @__PURE__ */ H.createElement("span", {
        className: Se("".concat(u, "-show-count-suffix"), E({}, "".concat(u, "-show-count-has-suffix"), !!m), C == null ? void 0 : C.count),
        style: R({}, _ == null ? void 0 : _.count)
      }, xe), m);
    }
    return null;
  };
  return /* @__PURE__ */ H.createElement(Mc, Ke({}, O, {
    prefixCls: u,
    className: Se(b, Le),
    handleReset: ue,
    value: W,
    focused: k,
    triggerFocus: z,
    suffix: _e(),
    disabled: d,
    classes: P,
    classNames: C,
    styles: _,
    ref: V
  }), Re());
}), Ti = /* @__PURE__ */ S.createContext(null);
function cm(e) {
  var t = e.children, r = e.onBatchResize, n = S.useRef(0), a = S.useRef([]), i = S.useContext(Ti), o = S.useCallback(function(s, l, c) {
    n.current += 1;
    var u = n.current;
    a.current.push({
      size: s,
      element: l,
      data: c
    }), Promise.resolve().then(function() {
      u === n.current && (r == null || r(a.current), a.current = []);
    }), i == null || i(s, l, c);
  }, [r, i]);
  return /* @__PURE__ */ S.createElement(Ti.Provider, {
    value: o
  }, t);
}
var jc = function() {
  if (typeof Map < "u")
    return Map;
  function e(t, r) {
    var n = -1;
    return t.some(function(a, i) {
      return a[0] === r ? (n = i, !0) : !1;
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
        var n = e(this.__entries__, r), a = this.__entries__[n];
        return a && a[1];
      }, t.prototype.set = function(r, n) {
        var a = e(this.__entries__, r);
        ~a ? this.__entries__[a][1] = n : this.__entries__.push([r, n]);
      }, t.prototype.delete = function(r) {
        var n = this.__entries__, a = e(n, r);
        ~a && n.splice(a, 1);
      }, t.prototype.has = function(r) {
        return !!~e(this.__entries__, r);
      }, t.prototype.clear = function() {
        this.__entries__.splice(0);
      }, t.prototype.forEach = function(r, n) {
        n === void 0 && (n = null);
        for (var a = 0, i = this.__entries__; a < i.length; a++) {
          var o = i[a];
          r.call(n, o[1], o[0]);
        }
      }, t;
    }()
  );
}(), Fi = typeof window < "u" && typeof document < "u" && window.document === document, Ln = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), um = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(Ln) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), dm = 2;
function fm(e, t) {
  var r = !1, n = !1, a = 0;
  function i() {
    r && (r = !1, e()), n && s();
  }
  function o() {
    um(i);
  }
  function s() {
    var l = Date.now();
    if (r) {
      if (l - a < dm)
        return;
      n = !0;
    } else
      r = !0, n = !1, setTimeout(o, t);
    a = l;
  }
  return s;
}
var vm = 20, pm = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], hm = typeof MutationObserver < "u", mm = (
  /** @class */
  function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = fm(this.refresh.bind(this), vm);
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
      !Fi || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), hm ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !Fi || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var r = t.propertyName, n = r === void 0 ? "" : r, a = pm.some(function(i) {
        return !!~n.indexOf(i);
      });
      a && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  }()
), kc = function(e, t) {
  for (var r = 0, n = Object.keys(t); r < n.length; r++) {
    var a = n[r];
    Object.defineProperty(e, a, {
      value: t[a],
      enumerable: !1,
      writable: !1,
      configurable: !0
    });
  }
  return e;
}, vr = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || Ln;
}, Ic = _a(0, 0, 0, 0);
function zn(e) {
  return parseFloat(e) || 0;
}
function ws(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return t.reduce(function(n, a) {
    var i = e["border-" + a + "-width"];
    return n + zn(i);
  }, 0);
}
function gm(e) {
  for (var t = ["top", "right", "bottom", "left"], r = {}, n = 0, a = t; n < a.length; n++) {
    var i = a[n], o = e["padding-" + i];
    r[i] = zn(o);
  }
  return r;
}
function bm(e) {
  var t = e.getBBox();
  return _a(0, 0, t.width, t.height);
}
function ym(e) {
  var t = e.clientWidth, r = e.clientHeight;
  if (!t && !r)
    return Ic;
  var n = vr(e).getComputedStyle(e), a = gm(n), i = a.left + a.right, o = a.top + a.bottom, s = zn(n.width), l = zn(n.height);
  if (n.boxSizing === "border-box" && (Math.round(s + i) !== t && (s -= ws(n, "left", "right") + i), Math.round(l + o) !== r && (l -= ws(n, "top", "bottom") + o)), !xm(e)) {
    var c = Math.round(s + i) - t, u = Math.round(l + o) - r;
    Math.abs(c) !== 1 && (s -= c), Math.abs(u) !== 1 && (l -= u);
  }
  return _a(a.left, a.top, s, l);
}
var Sm = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof vr(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof vr(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function xm(e) {
  return e === vr(e).document.documentElement;
}
function Cm(e) {
  return Fi ? Sm(e) ? bm(e) : ym(e) : Ic;
}
function Em(e) {
  var t = e.x, r = e.y, n = e.width, a = e.height, i = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(i.prototype);
  return kc(o, {
    x: t,
    y: r,
    width: n,
    height: a,
    top: r,
    right: t + n,
    bottom: a + r,
    left: t
  }), o;
}
function _a(e, t, r, n) {
  return { x: e, y: t, width: r, height: n };
}
var $m = (
  /** @class */
  function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = _a(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = Cm(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  }()
), _m = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, r) {
      var n = Em(r);
      kc(this, { target: t, contentRect: n });
    }
    return e;
  }()
), wm = (
  /** @class */
  function() {
    function e(t, r, n) {
      if (this.activeObservations_ = [], this.observations_ = new jc(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = r, this.callbackCtx_ = n;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof vr(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var r = this.observations_;
        r.has(t) || (r.set(t, new $m(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof vr(t).Element))
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
          return new _m(n.target, n.broadcastRect());
        });
        this.callback_.call(t, r, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  }()
), Nc = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new jc(), Dc = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var r = mm.getInstance(), n = new wm(t, r, this);
      Nc.set(this, n);
    }
    return e;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  Dc.prototype[e] = function() {
    var t;
    return (t = Nc.get(this))[e].apply(t, arguments);
  };
});
var Pm = function() {
  return typeof Ln.ResizeObserver < "u" ? Ln.ResizeObserver : Dc;
}(), Ot = /* @__PURE__ */ new Map();
function Vc(e) {
  e.forEach(function(t) {
    var r, n = t.target;
    (r = Ot.get(n)) === null || r === void 0 || r.forEach(function(a) {
      return a(n);
    });
  });
}
var Lc = new Pm(Vc);
process.env.NODE_ENV;
process.env.NODE_ENV;
function Om(e, t) {
  Ot.has(e) || (Ot.set(e, /* @__PURE__ */ new Set()), Lc.observe(e)), Ot.get(e).add(t);
}
function Rm(e, t) {
  Ot.has(e) && (Ot.get(e).delete(t), Ot.get(e).size || (Lc.unobserve(e), Ot.delete(e)));
}
var Tm = /* @__PURE__ */ function(e) {
  Gt(r, e);
  var t = Kt(r);
  function r() {
    return Ue(this, r), t.apply(this, arguments);
  }
  return Ye(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
}(S.Component);
function Fm(e, t) {
  var r = e.children, n = e.disabled, a = S.useRef(null), i = S.useRef(null), o = S.useContext(Ti), s = typeof r == "function", l = s ? r(a) : r, c = S.useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  }), u = !s && /* @__PURE__ */ S.isValidElement(l) && cl(l), d = u ? dl(l) : null, v = Nf(d, a), b = function() {
    var x;
    return Fn(a.current) || // Support `nativeElement` format
    (a.current && J(a.current) === "object" ? Fn((x = a.current) === null || x === void 0 ? void 0 : x.nativeElement) : null) || Fn(i.current);
  };
  S.useImperativeHandle(t, function() {
    return b();
  });
  var g = S.useRef(e);
  g.current = e;
  var m = S.useCallback(function(f) {
    var x = g.current, h = x.onResize, $ = x.data, P = f.getBoundingClientRect(), C = P.width, _ = P.height, y = f.offsetWidth, w = f.offsetHeight, O = Math.floor(C), T = Math.floor(_);
    if (c.current.width !== O || c.current.height !== T || c.current.offsetWidth !== y || c.current.offsetHeight !== w) {
      var j = {
        width: O,
        height: T,
        offsetWidth: y,
        offsetHeight: w
      };
      c.current = j;
      var k = y === Math.round(C) ? C : y, F = w === Math.round(_) ? _ : w, M = R(R({}, j), {}, {
        offsetWidth: k,
        offsetHeight: F
      });
      o == null || o(M, f, $), h && Promise.resolve().then(function() {
        h(M, f);
      });
    }
  }, []);
  return S.useEffect(function() {
    var f = b();
    return f && !n && Om(f, m), function() {
      return Rm(f, m);
    };
  }, [a.current, n]), /* @__PURE__ */ S.createElement(Tm, {
    ref: i
  }, u ? /* @__PURE__ */ S.cloneElement(l, {
    ref: v
  }) : l);
}
var zc = /* @__PURE__ */ S.forwardRef(Fm);
process.env.NODE_ENV !== "production" && (zc.displayName = "SingleObserver");
var Mm = "rc-observer-key";
function Am(e, t) {
  var r = e.children, n = typeof r == "function" ? [r] : Dn(r);
  return process.env.NODE_ENV !== "production" && (n.length > 1 ? jr(!1, "Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.") : n.length === 0 && jr(!1, "`children` of ResizeObserver is empty. Nothing is in observe.")), n.map(function(a, i) {
    var o = (a == null ? void 0 : a.key) || "".concat(Mm, "-").concat(i);
    return /* @__PURE__ */ S.createElement(zc, Ke({}, e, {
      key: o,
      ref: i === 0 ? t : void 0
    }), a);
  });
}
var ho = /* @__PURE__ */ S.forwardRef(Am);
process.env.NODE_ENV !== "production" && (ho.displayName = "ResizeObserver");
ho.Collection = cm;
var jm = `
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
`, km = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "font-variant", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing", "word-break", "white-space"], La = {}, ot;
function Im(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = e.getAttribute("id") || e.getAttribute("data-reactid") || e.getAttribute("name");
  if (t && La[r])
    return La[r];
  var n = window.getComputedStyle(e), a = n.getPropertyValue("box-sizing") || n.getPropertyValue("-moz-box-sizing") || n.getPropertyValue("-webkit-box-sizing"), i = parseFloat(n.getPropertyValue("padding-bottom")) + parseFloat(n.getPropertyValue("padding-top")), o = parseFloat(n.getPropertyValue("border-bottom-width")) + parseFloat(n.getPropertyValue("border-top-width")), s = km.map(function(c) {
    return "".concat(c, ":").concat(n.getPropertyValue(c));
  }).join(";"), l = {
    sizingStyle: s,
    paddingSize: i,
    borderSize: o,
    boxSizing: a
  };
  return t && r && (La[r] = l), l;
}
function Nm(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  ot || (ot = document.createElement("textarea"), ot.setAttribute("tab-index", "-1"), ot.setAttribute("aria-hidden", "true"), ot.setAttribute("name", "hiddenTextarea"), document.body.appendChild(ot)), e.getAttribute("wrap") ? ot.setAttribute("wrap", e.getAttribute("wrap")) : ot.removeAttribute("wrap");
  var a = Im(e, t), i = a.paddingSize, o = a.borderSize, s = a.boxSizing, l = a.sizingStyle;
  ot.setAttribute("style", "".concat(l, ";").concat(jm)), ot.value = e.value || e.placeholder || "";
  var c = void 0, u = void 0, d, v = ot.scrollHeight;
  if (s === "border-box" ? v += o : s === "content-box" && (v -= i), r !== null || n !== null) {
    ot.value = " ";
    var b = ot.scrollHeight - i;
    r !== null && (c = b * r, s === "border-box" && (c = c + i + o), v = Math.max(c, v)), n !== null && (u = b * n, s === "border-box" && (u = u + i + o), d = v > u ? "" : "hidden", v = Math.min(u, v));
  }
  var g = {
    height: v,
    overflowY: d,
    resize: "none"
  };
  return c && (g.minHeight = c), u && (g.maxHeight = u), g;
}
var Dm = ["prefixCls", "defaultValue", "value", "autoSize", "onResize", "className", "style", "disabled", "onChange", "onInternalAutoSize"], za = 0, Ha = 1, Ba = 2, Vm = /* @__PURE__ */ S.forwardRef(function(e, t) {
  var r = e, n = r.prefixCls, a = r.defaultValue, i = r.value, o = r.autoSize, s = r.onResize, l = r.className, c = r.style, u = r.disabled, d = r.onChange, v = r.onInternalAutoSize, b = ht(r, Dm), g = uo(a, {
    value: i,
    postState: function(U) {
      return U ?? "";
    }
  }), m = B(g, 2), f = m[0], x = m[1], h = function(U) {
    x(U.target.value), d == null || d(U);
  }, $ = S.useRef();
  S.useImperativeHandle(t, function() {
    return {
      textArea: $.current
    };
  });
  var P = S.useMemo(function() {
    return o && J(o) === "object" ? [o.minRows, o.maxRows] : [];
  }, [o]), C = B(P, 2), _ = C[0], y = C[1], w = !!o, O = S.useState(Ba), T = B(O, 2), j = T[0], k = T[1], F = S.useState(), M = B(F, 2), I = M[0], N = M[1], V = function() {
    k(za), process.env.NODE_ENV === "test" && (v == null || v());
  };
  kn(function() {
    w && V();
  }, [i, _, y, w]), kn(function() {
    if (j === za)
      k(Ha);
    else if (j === Ha) {
      var W = Nm($.current, !1, _, y);
      k(Ba), N(W);
    }
  }, [j]);
  var z = S.useRef(), Q = function() {
    fr.cancel(z.current);
  }, X = function(U) {
    j === Ba && (s == null || s(U), o && (Q(), z.current = fr(function() {
      V();
    })));
  };
  S.useEffect(function() {
    return Q;
  }, []);
  var Z = w ? I : null, q = R(R({}, c), Z);
  return (j === za || j === Ha) && (q.overflowY = "hidden", q.overflowX = "hidden"), /* @__PURE__ */ S.createElement(ho, {
    onResize: X,
    disabled: !(o || s)
  }, /* @__PURE__ */ S.createElement("textarea", Ke({}, b, {
    ref: $,
    style: q,
    className: Se(n, l, E({}, "".concat(n, "-disabled"), u)),
    disabled: u,
    value: f,
    onChange: h
  })));
}), Lm = ["defaultValue", "value", "onFocus", "onBlur", "onChange", "allowClear", "maxLength", "onCompositionStart", "onCompositionEnd", "suffix", "prefixCls", "showCount", "count", "className", "style", "disabled", "hidden", "classNames", "styles", "onResize", "onClear", "onPressEnter", "readOnly", "autoSize", "onKeyDown"], zm = /* @__PURE__ */ H.forwardRef(function(e, t) {
  var r, n = e.defaultValue, a = e.value, i = e.onFocus, o = e.onBlur, s = e.onChange, l = e.allowClear, c = e.maxLength, u = e.onCompositionStart, d = e.onCompositionEnd, v = e.suffix, b = e.prefixCls, g = b === void 0 ? "rc-textarea" : b, m = e.showCount, f = e.count, x = e.className, h = e.style, $ = e.disabled, P = e.hidden, C = e.classNames, _ = e.styles, y = e.onResize, w = e.onClear, O = e.onPressEnter, T = e.readOnly, j = e.autoSize, k = e.onKeyDown, F = ht(e, Lm), M = uo(n, {
    value: a,
    defaultValue: n
  }), I = B(M, 2), N = I[0], V = I[1], z = N == null ? "" : String(N), Q = H.useState(!1), X = B(Q, 2), Z = X[0], q = X[1], W = H.useRef(!1), U = H.useState(null), de = B(U, 2), ie = de[0], ve = de[1], le = De(null), fe = De(null), ce = function() {
    var pe;
    return (pe = fe.current) === null || pe === void 0 ? void 0 : pe.textArea;
  }, we = function() {
    ce().focus();
  };
  Hs(t, function() {
    var Te;
    return {
      resizableTextArea: fe.current,
      focus: we,
      blur: function() {
        ce().blur();
      },
      nativeElement: ((Te = le.current) === null || Te === void 0 ? void 0 : Te.nativeElement) || ce()
    };
  }), St(function() {
    q(function(Te) {
      return !$ && Te;
    });
  }, [$]);
  var Pe = H.useState(null), Ie = B(Pe, 2), L = Ie[0], $e = Ie[1];
  H.useEffect(function() {
    if (L) {
      var Te;
      (Te = ce()).setSelectionRange.apply(Te, K(L));
    }
  }, [L]);
  var Y = Ac(f, m), oe = (r = Y.max) !== null && r !== void 0 ? r : c, Ae = Number(oe) > 0, ue = Y.strategy(z), Le = !!oe && ue > oe, Re = function(pe, dt) {
    var Ft = dt;
    !W.current && Y.exceedFormatter && Y.max && Y.strategy(dt) > Y.max && (Ft = Y.exceedFormatter(dt, {
      max: Y.max
    }), dt !== Ft && $e([ce().selectionStart || 0, ce().selectionEnd || 0])), V(Ft), Vn(pe.currentTarget, pe, s, Ft);
  }, _e = function(pe) {
    W.current = !0, u == null || u(pe);
  }, te = function(pe) {
    W.current = !1, Re(pe, pe.currentTarget.value), d == null || d(pe);
  }, ee = function(pe) {
    Re(pe, pe.target.value);
  }, xe = function(pe) {
    pe.key === "Enter" && O && O(pe), k == null || k(pe);
  }, ct = function(pe) {
    q(!0), i == null || i(pe);
  }, Xe = function(pe) {
    q(!1), o == null || o(pe);
  }, Je = function(pe) {
    V(""), we(), Vn(ce(), pe, s);
  }, ut = v, Et;
  Y.show && (Y.showFormatter ? Et = Y.showFormatter({
    value: z,
    count: ue,
    maxLength: oe
  }) : Et = "".concat(ue).concat(Ae ? " / ".concat(oe) : ""), ut = /* @__PURE__ */ H.createElement(H.Fragment, null, ut, /* @__PURE__ */ H.createElement("span", {
    className: Se("".concat(g, "-data-count"), C == null ? void 0 : C.count),
    style: _ == null ? void 0 : _.count
  }, Et)));
  var yr = function(pe) {
    var dt;
    y == null || y(pe), (dt = ce()) !== null && dt !== void 0 && dt.style.height && ve(!0);
  }, Sr = !j && !m && !l;
  return /* @__PURE__ */ H.createElement(Mc, {
    ref: le,
    value: z,
    allowClear: l,
    handleReset: Je,
    suffix: ut,
    prefixCls: g,
    classNames: R(R({}, C), {}, {
      affixWrapper: Se(C == null ? void 0 : C.affixWrapper, E(E({}, "".concat(g, "-show-count"), m), "".concat(g, "-textarea-allow-clear"), l))
    }),
    disabled: $,
    focused: Z,
    className: Se(x, Le && "".concat(g, "-out-of-range")),
    style: R(R({}, h), ie && !Sr ? {
      height: "auto"
    } : {}),
    dataAttrs: {
      affixWrapper: {
        "data-count": typeof Et == "string" ? Et : void 0
      }
    },
    hidden: P,
    readOnly: T,
    onClear: w
  }, /* @__PURE__ */ H.createElement(Vm, Ke({}, F, {
    autoSize: j,
    maxLength: c,
    onKeyDown: xe,
    onChange: ee,
    onFocus: ct,
    onBlur: Xe,
    onCompositionStart: _e,
    onCompositionEnd: te,
    className: Se(C == null ? void 0 : C.textarea),
    style: R(R({}, _ == null ? void 0 : _.textarea), {}, {
      resize: h == null ? void 0 : h.resize
    }),
    disabled: $,
    prefixCls: g,
    onResize: yr,
    ref: fe,
    readOnly: T
  })));
}), Hm = { icon: { tag: "svg", attrs: { "fill-rule": "evenodd", viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" } }] }, name: "close-circle", theme: "filled" }, Bm = function(t, r) {
  return /* @__PURE__ */ S.createElement($a, Ke({}, t, {
    ref: r,
    icon: Hm
  }));
}, Hc = /* @__PURE__ */ S.forwardRef(Bm);
process.env.NODE_ENV !== "production" && (Hc.displayName = "CloseCircleFilled");
const Bc = (e) => {
  let t;
  return typeof e == "object" && (e != null && e.clearIcon) ? t = e : e && (t = {
    clearIcon: /* @__PURE__ */ H.createElement(Hc, null)
  }), t;
};
function Mi(e, t, r) {
  return Se({
    [`${e}-status-success`]: t === "success",
    [`${e}-status-warning`]: t === "warning",
    [`${e}-status-error`]: t === "error",
    [`${e}-status-validating`]: t === "validating",
    [`${e}-has-feedback`]: r
  });
}
const Wc = (e, t) => t || e, qc = (e) => {
  const [, , , , t] = Ca();
  return t ? `${e}-css-var` : "";
};
var Bt = "RC_FORM_INTERNAL_HOOKS", Ce = function() {
  Me(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, pr = /* @__PURE__ */ S.createContext({
  getFieldValue: Ce,
  getFieldsValue: Ce,
  getFieldError: Ce,
  getFieldWarning: Ce,
  getFieldsError: Ce,
  isFieldsTouched: Ce,
  isFieldTouched: Ce,
  isFieldValidating: Ce,
  isFieldsValidating: Ce,
  resetFields: Ce,
  setFields: Ce,
  setFieldValue: Ce,
  setFieldsValue: Ce,
  validateFields: Ce,
  submit: Ce,
  getInternalHooks: function() {
    return Ce(), {
      dispatch: Ce,
      initEntityValue: Ce,
      registerField: Ce,
      useSubscribe: Ce,
      setInitialValues: Ce,
      destroyForm: Ce,
      setCallbacks: Ce,
      registerWatch: Ce,
      getFields: Ce,
      setValidateMessages: Ce,
      setPreserve: Ce,
      getInitialValue: Ce
    };
  }
}), Hn = /* @__PURE__ */ S.createContext(null);
function Ai(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Wm(e) {
  return e && !!e._init;
}
function ji() {
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
      var t = JSON.parse(JSON.stringify(this));
      return t.clone = this.clone, t;
    }
  };
}
var ki = ji();
function qm(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
function Um(e, t, r) {
  if (no()) return Reflect.construct.apply(null, arguments);
  var n = [null];
  n.push.apply(n, t);
  var a = new (e.bind.apply(e, n))();
  return r && Ir(a, r.prototype), a;
}
function Ii(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Ii = function(n) {
    if (n === null || !qm(n)) return n;
    if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
    if (t !== void 0) {
      if (t.has(n)) return t.get(n);
      t.set(n, a);
    }
    function a() {
      return Um(n, arguments, Nr(this).constructor);
    }
    return a.prototype = Object.create(n.prototype, {
      constructor: {
        value: a,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), Ir(a, n);
  }, Ii(e);
}
var Ym = /%[sdj%]/g, Uc = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (Uc = function(t, r) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && r.every(function(n) {
    return typeof n == "string";
  }) && console.warn(t, r);
});
function Ni(e) {
  if (!e || !e.length) return null;
  var t = {};
  return e.forEach(function(r) {
    var n = r.field;
    t[n] = t[n] || [], t[n].push(r);
  }), t;
}
function lt(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  var a = 0, i = r.length;
  if (typeof e == "function")
    return e.apply(null, r);
  if (typeof e == "string") {
    var o = e.replace(Ym, function(s) {
      if (s === "%%")
        return "%";
      if (a >= i)
        return s;
      switch (s) {
        case "%s":
          return String(r[a++]);
        case "%d":
          return Number(r[a++]);
        case "%j":
          try {
            return JSON.stringify(r[a++]);
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
function Gm(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern" || e === "tel";
}
function He(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || Gm(t) && typeof e == "string" && !e);
}
function Km(e, t, r) {
  var n = [], a = 0, i = e.length;
  function o(s) {
    n.push.apply(n, K(s || [])), a++, a === i && r(n);
  }
  e.forEach(function(s) {
    t(s, o);
  });
}
function Ps(e, t, r) {
  var n = 0, a = e.length;
  function i(o) {
    if (o && o.length) {
      r(o);
      return;
    }
    var s = n;
    n = n + 1, s < a ? t(e[s], i) : r([]);
  }
  i([]);
}
function Xm(e) {
  var t = [];
  return Object.keys(e).forEach(function(r) {
    t.push.apply(t, K(e[r] || []));
  }), t;
}
var Os = /* @__PURE__ */ function(e) {
  Gt(r, e);
  var t = Kt(r);
  function r(n, a) {
    var i;
    return Ue(this, r), i = t.call(this, "Async Validation Error"), E(ne(i), "errors", void 0), E(ne(i), "fields", void 0), i.errors = n, i.fields = a, i;
  }
  return Ye(r);
}(/* @__PURE__ */ Ii(Error));
function Jm(e, t, r, n, a) {
  if (t.first) {
    var i = new Promise(function(v, b) {
      var g = function(x) {
        return n(x), x.length ? b(new Os(x, Ni(x))) : v(a);
      }, m = Xm(e);
      Ps(m, r, g);
    });
    return i.catch(function(v) {
      return v;
    }), i;
  }
  var o = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], s = Object.keys(e), l = s.length, c = 0, u = [], d = new Promise(function(v, b) {
    var g = function(f) {
      if (u.push.apply(u, f), c++, c === l)
        return n(u), u.length ? b(new Os(u, Ni(u))) : v(a);
    };
    s.length || (n(u), v(a)), s.forEach(function(m) {
      var f = e[m];
      o.indexOf(m) !== -1 ? Ps(f, r, g) : Km(f, r, g);
    });
  });
  return d.catch(function(v) {
    return v;
  }), d;
}
function Qm(e) {
  return !!(e && e.message !== void 0);
}
function Zm(e, t) {
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
    return e.fullFields ? n = Zm(t, e.fullFields) : n = t[r.field || e.fullField], Qm(r) ? (r.field = r.field || e.fullField, r.fieldValue = n, r) : {
      message: typeof r == "function" ? r() : r,
      fieldValue: n,
      field: r.field || e.fullField
    };
  };
}
function Ts(e, t) {
  if (t) {
    for (var r in t)
      if (t.hasOwnProperty(r)) {
        var n = t[r];
        J(n) === "object" && J(e[r]) === "object" ? e[r] = R(R({}, e[r]), n) : e[r] = n;
      }
  }
  return e;
}
var tr = "enum", eg = function(t, r, n, a, i) {
  t[tr] = Array.isArray(t[tr]) ? t[tr] : [], t[tr].indexOf(r) === -1 && a.push(lt(i.messages[tr], t.fullField, t[tr].join(", ")));
}, tg = function(t, r, n, a, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(r) || a.push(lt(i.messages.pattern.mismatch, t.fullField, r, t.pattern));
    else if (typeof t.pattern == "string") {
      var o = new RegExp(t.pattern);
      o.test(r) || a.push(lt(i.messages.pattern.mismatch, t.fullField, r, t.pattern));
    }
  }
}, rg = function(t, r, n, a, i) {
  var o = typeof t.len == "number", s = typeof t.min == "number", l = typeof t.max == "number", c = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, u = r, d = null, v = typeof r == "number", b = typeof r == "string", g = Array.isArray(r);
  if (v ? d = "number" : b ? d = "string" : g && (d = "array"), !d)
    return !1;
  g && (u = r.length), b && (u = r.replace(c, "_").length), o ? u !== t.len && a.push(lt(i.messages[d].len, t.fullField, t.len)) : s && !l && u < t.min ? a.push(lt(i.messages[d].min, t.fullField, t.min)) : l && !s && u > t.max ? a.push(lt(i.messages[d].max, t.fullField, t.max)) : s && l && (u < t.min || u > t.max) && a.push(lt(i.messages[d].range, t.fullField, t.min, t.max));
}, Yc = function(t, r, n, a, i, o) {
  t.required && (!n.hasOwnProperty(t.field) || He(r, o || t.type)) && a.push(lt(i.messages.required, t.fullField));
}, En;
const ng = function() {
  if (En)
    return En;
  var e = "[a-fA-F\\d:]", t = function(_) {
    return _ && _.includeBoundaries ? "(?:(?<=\\s|^)(?=".concat(e, ")|(?<=").concat(e, ")(?=\\s|$))") : "";
  }, r = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", n = "[a-fA-F\\d]{1,4}", a = [
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
  ], i = "(?:%[0-9a-zA-Z]{1,})?", o = "(?:".concat(a.join("|"), ")").concat(i), s = new RegExp("(?:^".concat(r, "$)|(?:^").concat(o, "$)")), l = new RegExp("^".concat(r, "$")), c = new RegExp("^".concat(o, "$")), u = function(_) {
    return _ && _.exact ? s : new RegExp("(?:".concat(t(_)).concat(r).concat(t(_), ")|(?:").concat(t(_)).concat(o).concat(t(_), ")"), "g");
  };
  u.v4 = function(C) {
    return C && C.exact ? l : new RegExp("".concat(t(C)).concat(r).concat(t(C)), "g");
  }, u.v6 = function(C) {
    return C && C.exact ? c : new RegExp("".concat(t(C)).concat(o).concat(t(C)), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", v = "(?:\\S+(?::\\S*)?@)?", b = u.v4().source, g = u.v6().source, m = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", f = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", x = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", h = "(?::\\d{2,5})?", $ = '(?:[/?#][^\\s"]*)?', P = "(?:".concat(d, "|www\\.)").concat(v, "(?:localhost|").concat(b, "|").concat(g, "|").concat(m).concat(f).concat(x, ")").concat(h).concat($);
  return En = new RegExp("(?:^".concat(P, "$)"), "i"), En;
};
var Wa = {
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
}, Tr = {
  integer: function(t) {
    return Tr.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return Tr.number(t) && !Tr.integer(t);
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
    return J(t) === "object" && !Tr.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(Wa.email);
  },
  tel: function(t) {
    return typeof t == "string" && t.length <= 32 && !!t.match(Wa.tel);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(ng());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(Wa.hex);
  }
}, ag = function(t, r, n, a, i) {
  if (t.required && r === void 0) {
    Yc(t, r, n, a, i);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "tel", "number", "date", "url", "hex"], s = t.type;
  o.indexOf(s) > -1 ? Tr[s](r) || a.push(lt(i.messages.types[s], t.fullField, t.type)) : s && J(r) !== t.type && a.push(lt(i.messages.types[s], t.fullField, t.type));
}, ig = function(t, r, n, a, i) {
  (/^\s+$/.test(r) || r === "") && a.push(lt(i.messages.whitespace, t.fullField));
};
const se = {
  required: Yc,
  whitespace: ig,
  type: ag,
  range: rg,
  enum: eg,
  pattern: tg
};
var og = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i);
  }
  n(o);
}, sg = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (r == null && !t.required)
      return n();
    se.required(t, r, a, o, i, "array"), r != null && (se.type(t, r, a, o, i), se.range(t, r, a, o, i));
  }
  n(o);
}, lg = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && se.type(t, r, a, o, i);
  }
  n(o);
}, cg = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r, "date") && !t.required)
      return n();
    if (se.required(t, r, a, o, i), !He(r, "date")) {
      var l;
      r instanceof Date ? l = r : l = new Date(r), se.type(t, l, a, o, i), l && se.range(t, l.getTime(), a, o, i);
    }
  }
  n(o);
}, ug = "enum", dg = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && se[ug](t, r, a, o, i);
  }
  n(o);
}, fg = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && (se.type(t, r, a, o, i), se.range(t, r, a, o, i));
  }
  n(o);
}, vg = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && (se.type(t, r, a, o, i), se.range(t, r, a, o, i));
  }
  n(o);
}, pg = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && se.type(t, r, a, o, i);
  }
  n(o);
}, hg = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (r === "" && (r = void 0), He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && (se.type(t, r, a, o, i), se.range(t, r, a, o, i));
  }
  n(o);
}, mg = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && se.type(t, r, a, o, i);
  }
  n(o);
}, gg = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r, "string") && !t.required)
      return n();
    se.required(t, r, a, o, i), He(r, "string") || se.pattern(t, r, a, o, i);
  }
  n(o);
}, bg = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), He(r) || se.type(t, r, a, o, i);
  }
  n(o);
}, yg = function(t, r, n, a, i) {
  var o = [], s = Array.isArray(r) ? "array" : J(r);
  se.required(t, r, a, o, i, s), n(o);
}, Sg = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r, "string") && !t.required)
      return n();
    se.required(t, r, a, o, i, "string"), He(r, "string") || (se.type(t, r, a, o, i), se.range(t, r, a, o, i), se.pattern(t, r, a, o, i), t.whitespace === !0 && se.whitespace(t, r, a, o, i));
  }
  n(o);
}, $n = function(t, r, n, a, i) {
  var o = t.type, s = [], l = t.required || !t.required && a.hasOwnProperty(t.field);
  if (l) {
    if (He(r, o) && !t.required)
      return n();
    se.required(t, r, a, s, i, o), He(r, o) || se.type(t, r, a, s, i);
  }
  n(s);
};
const Ar = {
  string: Sg,
  method: pg,
  number: hg,
  boolean: lg,
  regexp: bg,
  integer: vg,
  float: fg,
  array: sg,
  object: mg,
  enum: dg,
  pattern: gg,
  date: cg,
  url: $n,
  hex: $n,
  email: $n,
  tel: $n,
  required: yg,
  any: og
};
var sn = /* @__PURE__ */ function() {
  function e(t) {
    Ue(this, e), E(this, "rules", null), E(this, "_messages", ki), this.define(t);
  }
  return Ye(e, [{
    key: "define",
    value: function(r) {
      var n = this;
      if (!r)
        throw new Error("Cannot configure a schema with no rules");
      if (J(r) !== "object" || Array.isArray(r))
        throw new Error("Rules must be an object");
      this.rules = {}, Object.keys(r).forEach(function(a) {
        var i = r[a];
        n.rules[a] = Array.isArray(i) ? i : [i];
      });
    }
  }, {
    key: "messages",
    value: function(r) {
      return r && (this._messages = Ts(ji(), r)), this._messages;
    }
  }, {
    key: "validate",
    value: function(r) {
      var n = this, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
      }, o = r, s = a, l = i;
      if (typeof s == "function" && (l = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
        return l && l(null, o), Promise.resolve(o);
      function c(g) {
        var m = [], f = {};
        function x($) {
          if (Array.isArray($)) {
            var P;
            m = (P = m).concat.apply(P, K($));
          } else
            m.push($);
        }
        for (var h = 0; h < g.length; h++)
          x(g[h]);
        m.length ? (f = Ni(m), l(m, f)) : l(null, o);
      }
      if (s.messages) {
        var u = this.messages();
        u === ki && (u = ji()), Ts(u, s.messages), s.messages = u;
      } else
        s.messages = this.messages();
      var d = {}, v = s.keys || Object.keys(this.rules);
      v.forEach(function(g) {
        var m = n.rules[g], f = o[g];
        m.forEach(function(x) {
          var h = x;
          typeof h.transform == "function" && (o === r && (o = R({}, o)), f = o[g] = h.transform(f), f != null && (h.type = h.type || (Array.isArray(f) ? "array" : J(f)))), typeof h == "function" ? h = {
            validator: h
          } : h = R({}, h), h.validator = n.getValidationMethod(h), h.validator && (h.field = g, h.fullField = h.fullField || g, h.type = n.getType(h), d[g] = d[g] || [], d[g].push({
            rule: h,
            value: f,
            source: o,
            field: g
          }));
        });
      });
      var b = {};
      return Jm(d, s, function(g, m) {
        var f = g.rule, x = (f.type === "object" || f.type === "array") && (J(f.fields) === "object" || J(f.defaultField) === "object");
        x = x && (f.required || !f.required && g.value), f.field = g.field;
        function h(y, w) {
          return R(R({}, w), {}, {
            fullField: "".concat(f.fullField, ".").concat(y),
            fullFields: f.fullFields ? [].concat(K(f.fullFields), [y]) : [y]
          });
        }
        function $() {
          var y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], w = Array.isArray(y) ? y : [y];
          !s.suppressWarning && w.length && e.warning("async-validator:", w), w.length && f.message !== void 0 && f.message !== null && (w = [].concat(f.message));
          var O = w.map(Rs(f, o));
          if (s.first && O.length)
            return b[f.field] = 1, m(O);
          if (!x)
            m(O);
          else {
            if (f.required && !g.value)
              return f.message !== void 0 ? O = [].concat(f.message).map(Rs(f, o)) : s.error && (O = [s.error(f, lt(s.messages.required, f.field))]), m(O);
            var T = {};
            f.defaultField && Object.keys(g.value).map(function(F) {
              T[F] = f.defaultField;
            }), T = R(R({}, T), g.rule.fields);
            var j = {};
            Object.keys(T).forEach(function(F) {
              var M = T[F], I = Array.isArray(M) ? M : [M];
              j[F] = I.map(h.bind(null, F));
            });
            var k = new e(j);
            k.messages(s.messages), g.rule.options && (g.rule.options.messages = s.messages, g.rule.options.error = s.error), k.validate(g.value, g.rule.options || s, function(F) {
              var M = [];
              O && O.length && M.push.apply(M, K(O)), F && F.length && M.push.apply(M, K(F)), m(M.length ? M : null);
            });
          }
        }
        var P;
        if (f.asyncValidator)
          P = f.asyncValidator(f, g.value, $, g.source, s);
        else if (f.validator) {
          try {
            P = f.validator(f, g.value, $, g.source, s);
          } catch (y) {
            var C, _;
            (C = (_ = console).error) === null || C === void 0 || C.call(_, y), s.suppressValidatorError || setTimeout(function() {
              throw y;
            }, 0), $(y.message);
          }
          P === !0 ? $() : P === !1 ? $(typeof f.message == "function" ? f.message(f.fullField || f.field) : f.message || "".concat(f.fullField || f.field, " fails")) : P instanceof Array ? $(P) : P instanceof Error && $(P.message);
        }
        P && P.then && P.then(function() {
          return $();
        }, function(y) {
          return $(y);
        });
      }, function(g) {
        c(g);
      }, o);
    }
  }, {
    key: "getType",
    value: function(r) {
      if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !Ar.hasOwnProperty(r.type))
        throw new Error(lt("Unknown rule type %s", r.type));
      return r.type || "string";
    }
  }, {
    key: "getValidationMethod",
    value: function(r) {
      if (typeof r.validator == "function")
        return r.validator;
      var n = Object.keys(r), a = n.indexOf("message");
      return a !== -1 && n.splice(a, 1), n.length === 1 && n[0] === "required" ? Ar.required : Ar[this.getType(r)] || void 0;
    }
  }]), e;
}();
E(sn, "register", function(t, r) {
  if (typeof r != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  Ar[t] = r;
});
E(sn, "warning", Uc);
E(sn, "messages", ki);
E(sn, "validators", Ar);
var st = "'${name}' is not a valid ${type}", Gc = {
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
}, Fs = sn;
function xg(e, t) {
  return e.replace(/\\?\$\{\w+\}/g, function(r) {
    if (r.startsWith("\\"))
      return r.slice(1);
    var n = r.slice(2, -1);
    return t[n];
  });
}
var Ms = "CODE_LOGIC_ERROR";
function Di(e, t, r, n, a) {
  return Vi.apply(this, arguments);
}
function Vi() {
  return Vi = on(/* @__PURE__ */ gt().mark(function e(t, r, n, a, i) {
    var o, s, l, c, u, d, v, b, g;
    return gt().wrap(function(f) {
      for (; ; ) switch (f.prev = f.next) {
        case 0:
          return o = R({}, n), delete o.ruleIndex, Fs.warning = function() {
          }, o.validator && (s = o.validator, o.validator = function() {
            try {
              return s.apply(void 0, arguments);
            } catch (x) {
              return console.error(x), Promise.reject(Ms);
            }
          }), l = null, o && o.type === "array" && o.defaultField && (l = o.defaultField, delete o.defaultField), c = new Fs(E({}, t, [o])), u = nr(Gc, a.validateMessages), c.messages(u), d = [], f.prev = 10, f.next = 13, Promise.resolve(c.validate(E({}, t, r), R({}, a)));
        case 13:
          f.next = 18;
          break;
        case 15:
          f.prev = 15, f.t0 = f.catch(10), f.t0.errors && (d = f.t0.errors.map(function(x, h) {
            var $ = x.message, P = $ === Ms ? u.default : $;
            return /* @__PURE__ */ S.isValidElement(P) ? (
              // Wrap ReactNode with `key`
              /* @__PURE__ */ S.cloneElement(P, {
                key: "error_".concat(h)
              })
            ) : P;
          }));
        case 18:
          if (!(!d.length && l && Array.isArray(r) && r.length > 0)) {
            f.next = 23;
            break;
          }
          return f.next = 21, Promise.all(r.map(function(x, h) {
            return Di("".concat(t, ".").concat(h), x, l, a, i);
          }));
        case 21:
          return v = f.sent, f.abrupt("return", v.reduce(function(x, h) {
            return [].concat(K(x), K(h));
          }, []));
        case 23:
          return b = R(R({}, n), {}, {
            name: t,
            enum: (n.enum || []).join(", ")
          }, i), g = d.map(function(x) {
            return typeof x == "string" ? xg(x, b) : x;
          }), f.abrupt("return", g);
        case 26:
        case "end":
          return f.stop();
      }
    }, e, null, [[10, 15]]);
  })), Vi.apply(this, arguments);
}
function Cg(e, t, r, n, a, i) {
  var o = e.join("."), s = r.map(function(u, d) {
    var v = u.validator, b = R(R({}, u), {}, {
      ruleIndex: d
    });
    return v && (b.validator = function(g, m, f) {
      var x = !1, h = function() {
        for (var C = arguments.length, _ = new Array(C), y = 0; y < C; y++)
          _[y] = arguments[y];
        Promise.resolve().then(function() {
          Me(!x, "Your validator function has already return a promise. `callback` will be ignored."), x || f.apply(void 0, _);
        });
      }, $ = v(g, m, h);
      x = $ && typeof $.then == "function" && typeof $.catch == "function", Me(x, "`callback` is deprecated. Please return a promise instead."), x && $.then(function() {
        f();
      }).catch(function(P) {
        f(P || " ");
      });
    }), b;
  }).sort(function(u, d) {
    var v = u.warningOnly, b = u.ruleIndex, g = d.warningOnly, m = d.ruleIndex;
    return !!v == !!g ? b - m : v ? 1 : -1;
  }), l;
  if (a === !0)
    l = new Promise(/* @__PURE__ */ function() {
      var u = on(/* @__PURE__ */ gt().mark(function d(v, b) {
        var g, m, f;
        return gt().wrap(function(h) {
          for (; ; ) switch (h.prev = h.next) {
            case 0:
              g = 0;
            case 1:
              if (!(g < s.length)) {
                h.next = 12;
                break;
              }
              return m = s[g], h.next = 5, Di(o, t, m, n, i);
            case 5:
              if (f = h.sent, !f.length) {
                h.next = 9;
                break;
              }
              return b([{
                errors: f,
                rule: m
              }]), h.abrupt("return");
            case 9:
              g += 1, h.next = 1;
              break;
            case 12:
              v([]);
            case 13:
            case "end":
              return h.stop();
          }
        }, d);
      }));
      return function(d, v) {
        return u.apply(this, arguments);
      };
    }());
  else {
    var c = s.map(function(u) {
      return Di(o, t, u, n, i).then(function(d) {
        return {
          errors: d,
          rule: u
        };
      });
    });
    l = (a ? $g(c) : Eg(c)).then(function(u) {
      return Promise.reject(u);
    });
  }
  return l.catch(function(u) {
    return u;
  }), l;
}
function Eg(e) {
  return Li.apply(this, arguments);
}
function Li() {
  return Li = on(/* @__PURE__ */ gt().mark(function e(t) {
    return gt().wrap(function(n) {
      for (; ; ) switch (n.prev = n.next) {
        case 0:
          return n.abrupt("return", Promise.all(t).then(function(a) {
            var i, o = (i = []).concat.apply(i, K(a));
            return o;
          }));
        case 1:
        case "end":
          return n.stop();
      }
    }, e);
  })), Li.apply(this, arguments);
}
function $g(e) {
  return zi.apply(this, arguments);
}
function zi() {
  return zi = on(/* @__PURE__ */ gt().mark(function e(t) {
    var r;
    return gt().wrap(function(a) {
      for (; ; ) switch (a.prev = a.next) {
        case 0:
          return r = 0, a.abrupt("return", new Promise(function(i) {
            t.forEach(function(o) {
              o.then(function(s) {
                s.errors.length && i([s]), r += 1, r === t.length && i([]);
              });
            });
          }));
        case 2:
        case "end":
          return a.stop();
      }
    }, e);
  })), zi.apply(this, arguments);
}
function Ne(e) {
  return Ai(e);
}
function As(e, t) {
  var r = {};
  return t.forEach(function(n) {
    var a = _t(e, n);
    r = bt(r, n, a);
  }), r;
}
function sr(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return e && e.some(function(n) {
    return Kc(t, n, r);
  });
}
function Kc(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return !e || !t || !r && e.length !== t.length ? !1 : t.every(function(n, a) {
    return e[a] === n;
  });
}
function _g(e, t) {
  if (e === t)
    return !0;
  if (!e && t || e && !t || !e || !t || J(e) !== "object" || J(t) !== "object")
    return !1;
  var r = Object.keys(e), n = Object.keys(t), a = new Set([].concat(r, n));
  return K(a).every(function(i) {
    var o = e[i], s = t[i];
    return typeof o == "function" && typeof s == "function" ? !0 : o === s;
  });
}
function wg(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && J(t.target) === "object" && e in t.target ? t.target[e] : t;
}
function js(e, t, r) {
  var n = e.length;
  if (t < 0 || t >= n || r < 0 || r >= n)
    return e;
  var a = e[t], i = t - r;
  return i > 0 ? [].concat(K(e.slice(0, r)), [a], K(e.slice(r, t)), K(e.slice(t + 1, n))) : i < 0 ? [].concat(K(e.slice(0, t)), K(e.slice(t + 1, r + 1)), [a], K(e.slice(r + 1, n))) : e;
}
var Pg = ["name"], pt = [];
function qa(e, t, r, n, a, i) {
  return typeof e == "function" ? e(t, r, "source" in i ? {
    source: i.source
  } : {}) : n !== a;
}
var mo = /* @__PURE__ */ function(e) {
  Gt(r, e);
  var t = Kt(r);
  function r(n) {
    var a;
    if (Ue(this, r), a = t.call(this, n), E(ne(a), "state", {
      resetCount: 0
    }), E(ne(a), "cancelRegisterFunc", null), E(ne(a), "mounted", !1), E(ne(a), "touched", !1), E(ne(a), "dirty", !1), E(ne(a), "validatePromise", void 0), E(ne(a), "prevValidating", void 0), E(ne(a), "errors", pt), E(ne(a), "warnings", pt), E(ne(a), "cancelRegister", function() {
      var l = a.props, c = l.preserve, u = l.isListField, d = l.name;
      a.cancelRegisterFunc && a.cancelRegisterFunc(u, c, Ne(d)), a.cancelRegisterFunc = null;
    }), E(ne(a), "getNamePath", function() {
      var l = a.props, c = l.name, u = l.fieldContext, d = u.prefixName, v = d === void 0 ? [] : d;
      return c !== void 0 ? [].concat(K(v), K(c)) : [];
    }), E(ne(a), "getRules", function() {
      var l = a.props, c = l.rules, u = c === void 0 ? [] : c, d = l.fieldContext;
      return u.map(function(v) {
        return typeof v == "function" ? v(d) : v;
      });
    }), E(ne(a), "refresh", function() {
      a.mounted && a.setState(function(l) {
        var c = l.resetCount;
        return {
          resetCount: c + 1
        };
      });
    }), E(ne(a), "metaCache", null), E(ne(a), "triggerMetaEvent", function(l) {
      var c = a.props.onMetaChange;
      if (c) {
        var u = R(R({}, a.getMeta()), {}, {
          destroy: l
        });
        Za(a.metaCache, u) || c(u), a.metaCache = u;
      } else
        a.metaCache = null;
    }), E(ne(a), "onStoreChange", function(l, c, u) {
      var d = a.props, v = d.shouldUpdate, b = d.dependencies, g = b === void 0 ? [] : b, m = d.onReset, f = u.store, x = a.getNamePath(), h = a.getValue(l), $ = a.getValue(f), P = c && sr(c, x);
      switch (u.type === "valueUpdate" && u.source === "external" && !Za(h, $) && (a.touched = !0, a.dirty = !0, a.validatePromise = null, a.errors = pt, a.warnings = pt, a.triggerMetaEvent()), u.type) {
        case "reset":
          if (!c || P) {
            a.touched = !1, a.dirty = !1, a.validatePromise = void 0, a.errors = pt, a.warnings = pt, a.triggerMetaEvent(), m == null || m(), a.refresh();
            return;
          }
          break;
        case "remove": {
          if (v && qa(v, l, f, h, $, u)) {
            a.reRender();
            return;
          }
          break;
        }
        case "setField": {
          var C = u.data;
          if (P) {
            "touched" in C && (a.touched = C.touched), "validating" in C && !("originRCField" in C) && (a.validatePromise = C.validating ? Promise.resolve([]) : null), "errors" in C && (a.errors = C.errors || pt), "warnings" in C && (a.warnings = C.warnings || pt), a.dirty = !0, a.triggerMetaEvent(), a.reRender();
            return;
          } else if ("value" in C && sr(c, x, !0)) {
            a.reRender();
            return;
          }
          if (v && !x.length && qa(v, l, f, h, $, u)) {
            a.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var _ = g.map(Ne);
          if (_.some(function(y) {
            return sr(u.relatedFields, y);
          })) {
            a.reRender();
            return;
          }
          break;
        }
        default:
          if (P || (!g.length || x.length || v) && qa(v, l, f, h, $, u)) {
            a.reRender();
            return;
          }
          break;
      }
      v === !0 && a.reRender();
    }), E(ne(a), "validateRules", function(l) {
      var c = a.getNamePath(), u = a.getValue(), d = l || {}, v = d.triggerName, b = d.validateOnly, g = b === void 0 ? !1 : b, m = Promise.resolve().then(/* @__PURE__ */ on(/* @__PURE__ */ gt().mark(function f() {
        var x, h, $, P, C, _, y;
        return gt().wrap(function(O) {
          for (; ; ) switch (O.prev = O.next) {
            case 0:
              if (a.mounted) {
                O.next = 2;
                break;
              }
              return O.abrupt("return", []);
            case 2:
              if (x = a.props, h = x.validateFirst, $ = h === void 0 ? !1 : h, P = x.messageVariables, C = x.validateDebounce, _ = a.getRules(), v && (_ = _.filter(function(T) {
                return T;
              }).filter(function(T) {
                var j = T.validateTrigger;
                if (!j)
                  return !0;
                var k = Ai(j);
                return k.includes(v);
              })), !(C && v)) {
                O.next = 10;
                break;
              }
              return O.next = 8, new Promise(function(T) {
                setTimeout(T, C);
              });
            case 8:
              if (a.validatePromise === m) {
                O.next = 10;
                break;
              }
              return O.abrupt("return", []);
            case 10:
              return y = Cg(c, u, _, l, $, P), y.catch(function(T) {
                return T;
              }).then(function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : pt;
                if (a.validatePromise === m) {
                  var j;
                  a.validatePromise = null;
                  var k = [], F = [];
                  (j = T.forEach) === null || j === void 0 || j.call(T, function(M) {
                    var I = M.rule.warningOnly, N = M.errors, V = N === void 0 ? pt : N;
                    I ? F.push.apply(F, K(V)) : k.push.apply(k, K(V));
                  }), a.errors = k, a.warnings = F, a.triggerMetaEvent(), a.reRender();
                }
              }), O.abrupt("return", y);
            case 13:
            case "end":
              return O.stop();
          }
        }, f);
      })));
      return g || (a.validatePromise = m, a.dirty = !0, a.errors = pt, a.warnings = pt, a.triggerMetaEvent(), a.reRender()), m;
    }), E(ne(a), "isFieldValidating", function() {
      return !!a.validatePromise;
    }), E(ne(a), "isFieldTouched", function() {
      return a.touched;
    }), E(ne(a), "isFieldDirty", function() {
      if (a.dirty || a.props.initialValue !== void 0)
        return !0;
      var l = a.props.fieldContext, c = l.getInternalHooks(Bt), u = c.getInitialValue;
      return u(a.getNamePath()) !== void 0;
    }), E(ne(a), "getErrors", function() {
      return a.errors;
    }), E(ne(a), "getWarnings", function() {
      return a.warnings;
    }), E(ne(a), "isListField", function() {
      return a.props.isListField;
    }), E(ne(a), "isList", function() {
      return a.props.isList;
    }), E(ne(a), "isPreserve", function() {
      return a.props.preserve;
    }), E(ne(a), "getMeta", function() {
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
    }), E(ne(a), "getOnlyChild", function(l) {
      if (typeof l == "function") {
        var c = a.getMeta();
        return R(R({}, a.getOnlyChild(l(a.getControlled(), c, a.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var u = Dn(l);
      return u.length !== 1 || !/* @__PURE__ */ S.isValidElement(u[0]) ? {
        child: u,
        isFunction: !1
      } : {
        child: u[0],
        isFunction: !1
      };
    }), E(ne(a), "getValue", function(l) {
      var c = a.props.fieldContext.getFieldsValue, u = a.getNamePath();
      return _t(l || c(!0), u);
    }), E(ne(a), "getControlled", function() {
      var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, c = a.props, u = c.name, d = c.trigger, v = c.validateTrigger, b = c.getValueFromEvent, g = c.normalize, m = c.valuePropName, f = c.getValueProps, x = c.fieldContext, h = v !== void 0 ? v : x.validateTrigger, $ = a.getNamePath(), P = x.getInternalHooks, C = x.getFieldsValue, _ = P(Bt), y = _.dispatch, w = a.getValue(), O = f || function(M) {
        return E({}, m, M);
      }, T = l[d], j = u !== void 0 ? O(w) : {};
      process.env.NODE_ENV !== "production" && j && Object.keys(j).forEach(function(M) {
        Me(typeof j[M] != "function", "It's not recommended to generate dynamic function prop by `getValueProps`. Please pass it to child component directly (prop: ".concat(M, ")"));
      });
      var k = R(R({}, l), j);
      k[d] = function() {
        a.touched = !0, a.dirty = !0, a.triggerMetaEvent();
        for (var M, I = arguments.length, N = new Array(I), V = 0; V < I; V++)
          N[V] = arguments[V];
        b ? M = b.apply(void 0, N) : M = wg.apply(void 0, [m].concat(N)), g && (M = g(M, w, C(!0))), M !== w && y({
          type: "updateValue",
          namePath: $,
          value: M
        }), T && T.apply(void 0, N);
      };
      var F = Ai(h || []);
      return F.forEach(function(M) {
        var I = k[M];
        k[M] = function() {
          I && I.apply(void 0, arguments);
          var N = a.props.rules;
          N && N.length && y({
            type: "validateField",
            namePath: $,
            triggerName: M
          });
        };
      }), k;
    }), n.fieldContext) {
      var i = n.fieldContext.getInternalHooks, o = i(Bt), s = o.initEntityValue;
      s(ne(a));
    }
    return a;
  }
  return Ye(r, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props, i = a.shouldUpdate, o = a.fieldContext;
      if (this.mounted = !0, o) {
        var s = o.getInternalHooks, l = s(Bt), c = l.registerField;
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
      return l ? c = s : /* @__PURE__ */ S.isValidElement(s) ? c = /* @__PURE__ */ S.cloneElement(s, this.getControlled(s.props)) : (Me(!s, "`children` of Field is not validate ReactElement."), c = s), /* @__PURE__ */ S.createElement(S.Fragment, {
        key: a
      }, c);
    }
  }]), r;
}(S.Component);
E(mo, "contextType", pr);
E(mo, "defaultProps", {
  trigger: "onChange",
  valuePropName: "value"
});
function Xc(e) {
  var t, r = e.name, n = ht(e, Pg), a = S.useContext(pr), i = S.useContext(Hn), o = r !== void 0 ? Ne(r) : void 0, s = (t = n.isListField) !== null && t !== void 0 ? t : !!i, l = "keep";
  return s || (l = "_".concat((o || []).join("_"))), process.env.NODE_ENV !== "production" && n.preserve === !1 && s && o.length <= 1 && Me(!1, "`preserve` should not apply on Form.List fields."), /* @__PURE__ */ S.createElement(mo, Ke({
    key: l,
    name: o,
    isListField: s
  }, n, {
    fieldContext: a
  }));
}
function Og(e) {
  var t = e.name, r = e.initialValue, n = e.children, a = e.rules, i = e.validateTrigger, o = e.isListField, s = S.useContext(pr), l = S.useContext(Hn), c = S.useRef({
    keys: [],
    id: 0
  }), u = c.current, d = S.useMemo(function() {
    var m = Ne(s.prefixName) || [];
    return [].concat(K(m), K(Ne(t)));
  }, [s.prefixName, t]), v = S.useMemo(function() {
    return R(R({}, s), {}, {
      prefixName: d
    });
  }, [s, d]), b = S.useMemo(function() {
    return {
      getKey: function(f) {
        var x = d.length, h = f[x];
        return [u.keys[h], f.slice(x + 1)];
      }
    };
  }, [d]);
  if (typeof n != "function")
    return Me(!1, "Form.List only accepts function as children."), null;
  var g = function(f, x, h) {
    var $ = h.source;
    return $ === "internal" ? !1 : f !== x;
  };
  return /* @__PURE__ */ S.createElement(Hn.Provider, {
    value: b
  }, /* @__PURE__ */ S.createElement(pr.Provider, {
    value: v
  }, /* @__PURE__ */ S.createElement(Xc, {
    name: [],
    shouldUpdate: g,
    rules: a,
    validateTrigger: i,
    initialValue: r,
    isList: !0,
    isListField: o ?? !!l
  }, function(m, f) {
    var x = m.value, h = x === void 0 ? [] : x, $ = m.onChange, P = s.getFieldValue, C = function() {
      var O = P(d || []);
      return O || [];
    }, _ = {
      add: function(O, T) {
        var j = C();
        T >= 0 && T <= j.length ? (u.keys = [].concat(K(u.keys.slice(0, T)), [u.id], K(u.keys.slice(T))), $([].concat(K(j.slice(0, T)), [O], K(j.slice(T))))) : (process.env.NODE_ENV !== "production" && (T < 0 || T > j.length) && Me(!1, "The second parameter of the add function should be a valid positive number."), u.keys = [].concat(K(u.keys), [u.id]), $([].concat(K(j), [O]))), u.id += 1;
      },
      remove: function(O) {
        var T = C(), j = new Set(Array.isArray(O) ? O : [O]);
        j.size <= 0 || (u.keys = u.keys.filter(function(k, F) {
          return !j.has(F);
        }), $(T.filter(function(k, F) {
          return !j.has(F);
        })));
      },
      move: function(O, T) {
        if (O !== T) {
          var j = C();
          O < 0 || O >= j.length || T < 0 || T >= j.length || (u.keys = js(u.keys, O, T), $(js(j, O, T)));
        }
      }
    }, y = h || [];
    return Array.isArray(y) || (y = [], process.env.NODE_ENV !== "production" && Me(!1, "Current value of '".concat(d.join(" > "), "' is not an array type."))), n(y.map(function(w, O) {
      var T = u.keys[O];
      return T === void 0 && (u.keys[O] = u.id, T = u.keys[O], u.id += 1), {
        name: O,
        key: T,
        isListField: !0
      };
    }), _, f);
  })));
}
function Rg(e) {
  var t = !1, r = e.length, n = [];
  return e.length ? new Promise(function(a, i) {
    e.forEach(function(o, s) {
      o.catch(function(l) {
        return t = !0, l;
      }).then(function(l) {
        r -= 1, n[s] = l, !(r > 0) && (t && i(n), a(n));
      });
    });
  }) : Promise.resolve([]);
}
var Jc = "__@field_split__";
function Ua(e) {
  return e.map(function(t) {
    return "".concat(J(t), ":").concat(t);
  }).join(Jc);
}
var rr = /* @__PURE__ */ function() {
  function e() {
    Ue(this, e), E(this, "kvs", /* @__PURE__ */ new Map());
  }
  return Ye(e, [{
    key: "set",
    value: function(r, n) {
      this.kvs.set(Ua(r), n);
    }
  }, {
    key: "get",
    value: function(r) {
      return this.kvs.get(Ua(r));
    }
  }, {
    key: "update",
    value: function(r, n) {
      var a = this.get(r), i = n(a);
      i ? this.set(r, i) : this.delete(r);
    }
  }, {
    key: "delete",
    value: function(r) {
      this.kvs.delete(Ua(r));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(r) {
      return K(this.kvs.entries()).map(function(n) {
        var a = B(n, 2), i = a[0], o = a[1], s = i.split(Jc);
        return r({
          key: s.map(function(l) {
            var c = l.match(/^([^:]*):(.*)$/), u = B(c, 3), d = u[1], v = u[2];
            return d === "number" ? Number(v) : v;
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
        var a = n.key, i = n.value;
        return r[a.join(".")] = i, null;
      }), r;
    }
  }]), e;
}(), Tg = ["name"], Fg = /* @__PURE__ */ Ye(function e(t) {
  var r = this;
  Ue(this, e), E(this, "formHooked", !1), E(this, "forceRootUpdate", void 0), E(this, "subscribable", !0), E(this, "store", {}), E(this, "fieldEntities", []), E(this, "initialValues", {}), E(this, "callbacks", {}), E(this, "validateMessages", null), E(this, "preserve", null), E(this, "lastValidatePromise", null), E(this, "getForm", function() {
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
  }), E(this, "getInternalHooks", function(n) {
    return n === Bt ? (r.formHooked = !0, {
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
    }) : (Me(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }), E(this, "useSubscribe", function(n) {
    r.subscribable = n;
  }), E(this, "prevWithoutPreserves", null), E(this, "setInitialValues", function(n, a) {
    if (r.initialValues = n || {}, a) {
      var i, o = nr(n, r.store);
      (i = r.prevWithoutPreserves) === null || i === void 0 || i.map(function(s) {
        var l = s.key;
        o = bt(o, l, _t(n, l));
      }), r.prevWithoutPreserves = null, r.updateStore(o);
    }
  }), E(this, "destroyForm", function(n) {
    if (n)
      r.updateStore({});
    else {
      var a = new rr();
      r.getFieldEntities(!0).forEach(function(i) {
        r.isMergedPreserve(i.isPreserve()) || a.set(i.getNamePath(), !0);
      }), r.prevWithoutPreserves = a;
    }
  }), E(this, "getInitialValue", function(n) {
    var a = _t(r.initialValues, n);
    return n.length ? nr(a) : a;
  }), E(this, "setCallbacks", function(n) {
    r.callbacks = n;
  }), E(this, "setValidateMessages", function(n) {
    r.validateMessages = n;
  }), E(this, "setPreserve", function(n) {
    r.preserve = n;
  }), E(this, "watchList", []), E(this, "registerWatch", function(n) {
    return r.watchList.push(n), function() {
      r.watchList = r.watchList.filter(function(a) {
        return a !== n;
      });
    };
  }), E(this, "notifyWatch", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (r.watchList.length) {
      var a = r.getFieldsValue(), i = r.getFieldsValue(!0);
      r.watchList.forEach(function(o) {
        o(a, i, n);
      });
    }
  }), E(this, "timeoutId", null), E(this, "warningUnhooked", function() {
    process.env.NODE_ENV !== "production" && !r.timeoutId && typeof window < "u" && (r.timeoutId = setTimeout(function() {
      r.timeoutId = null, r.formHooked || Me(!1, "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?");
    }));
  }), E(this, "updateStore", function(n) {
    r.store = n;
  }), E(this, "getFieldEntities", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    return n ? r.fieldEntities.filter(function(a) {
      return a.getNamePath().length;
    }) : r.fieldEntities;
  }), E(this, "getFieldsMap", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, a = new rr();
    return r.getFieldEntities(n).forEach(function(i) {
      var o = i.getNamePath();
      a.set(o, i);
    }), a;
  }), E(this, "getFieldEntitiesForNamePathList", function(n) {
    if (!n)
      return r.getFieldEntities(!0);
    var a = r.getFieldsMap(!0);
    return n.map(function(i) {
      var o = Ne(i);
      return a.get(o) || {
        INVALIDATE_NAME_PATH: Ne(i)
      };
    });
  }), E(this, "getFieldsValue", function(n, a) {
    r.warningUnhooked();
    var i, o, s;
    if (n === !0 || Array.isArray(n) ? (i = n, o = a) : n && J(n) === "object" && (s = n.strict, o = n.filter), i === !0 && !o)
      return r.store;
    var l = r.getFieldEntitiesForNamePathList(Array.isArray(i) ? i : null), c = [];
    return l.forEach(function(u) {
      var d, v, b = "INVALIDATE_NAME_PATH" in u ? u.INVALIDATE_NAME_PATH : u.getNamePath();
      if (s) {
        var g, m;
        if ((g = (m = u).isList) !== null && g !== void 0 && g.call(m))
          return;
      } else if (!i && (d = (v = u).isListField) !== null && d !== void 0 && d.call(v))
        return;
      if (!o)
        c.push(b);
      else {
        var f = "getMeta" in u ? u.getMeta() : null;
        o(f) && c.push(b);
      }
    }), As(r.store, c.map(Ne));
  }), E(this, "getFieldValue", function(n) {
    r.warningUnhooked();
    var a = Ne(n);
    return _t(r.store, a);
  }), E(this, "getFieldsError", function(n) {
    r.warningUnhooked();
    var a = r.getFieldEntitiesForNamePathList(n);
    return a.map(function(i, o) {
      return i && !("INVALIDATE_NAME_PATH" in i) ? {
        name: i.getNamePath(),
        errors: i.getErrors(),
        warnings: i.getWarnings()
      } : {
        name: Ne(n[o]),
        errors: [],
        warnings: []
      };
    });
  }), E(this, "getFieldError", function(n) {
    r.warningUnhooked();
    var a = Ne(n), i = r.getFieldsError([a])[0];
    return i.errors;
  }), E(this, "getFieldWarning", function(n) {
    r.warningUnhooked();
    var a = Ne(n), i = r.getFieldsError([a])[0];
    return i.warnings;
  }), E(this, "isFieldsTouched", function() {
    r.warningUnhooked();
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a[0], s = a[1], l, c = !1;
    a.length === 0 ? l = null : a.length === 1 ? Array.isArray(o) ? (l = o.map(Ne), c = !1) : (l = null, c = o) : (l = o.map(Ne), c = s);
    var u = r.getFieldEntities(!0), d = function(f) {
      return f.isFieldTouched();
    };
    if (!l)
      return c ? u.every(function(m) {
        return d(m) || m.isList();
      }) : u.some(d);
    var v = new rr();
    l.forEach(function(m) {
      v.set(m, []);
    }), u.forEach(function(m) {
      var f = m.getNamePath();
      l.forEach(function(x) {
        x.every(function(h, $) {
          return f[$] === h;
        }) && v.update(x, function(h) {
          return [].concat(K(h), [m]);
        });
      });
    });
    var b = function(f) {
      return f.some(d);
    }, g = v.map(function(m) {
      var f = m.value;
      return f;
    });
    return c ? g.every(b) : g.some(b);
  }), E(this, "isFieldTouched", function(n) {
    return r.warningUnhooked(), r.isFieldsTouched([n]);
  }), E(this, "isFieldsValidating", function(n) {
    r.warningUnhooked();
    var a = r.getFieldEntities();
    if (!n)
      return a.some(function(o) {
        return o.isFieldValidating();
      });
    var i = n.map(Ne);
    return a.some(function(o) {
      var s = o.getNamePath();
      return sr(i, s) && o.isFieldValidating();
    });
  }), E(this, "isFieldValidating", function(n) {
    return r.warningUnhooked(), r.isFieldsValidating([n]);
  }), E(this, "resetWithFieldInitialValue", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = new rr(), i = r.getFieldEntities(!0);
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
          var v = u.getNamePath(), b = r.getInitialValue(v);
          if (b !== void 0)
            Me(!1, "Form already set 'initialValues' with path '".concat(v.join("."), "'. Field can not overwrite it."));
          else {
            var g = a.get(v);
            if (g && g.size > 1)
              Me(!1, "Multiple Field with path '".concat(v.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (g) {
              var m = r.getFieldValue(v), f = u.isListField();
              !f && (!n.skipExist || m === void 0) && r.updateStore(bt(r.store, v, K(g)[0].value));
            }
          }
        }
      });
    }, s;
    n.entities ? s = n.entities : n.namePathList ? (s = [], n.namePathList.forEach(function(l) {
      var c = a.get(l);
      if (c) {
        var u;
        (u = s).push.apply(u, K(K(c).map(function(d) {
          return d.entity;
        })));
      }
    })) : s = i, o(s);
  }), E(this, "resetFields", function(n) {
    r.warningUnhooked();
    var a = r.store;
    if (!n) {
      r.updateStore(nr(r.initialValues)), r.resetWithFieldInitialValue(), r.notifyObservers(a, null, {
        type: "reset"
      }), r.notifyWatch();
      return;
    }
    var i = n.map(Ne);
    i.forEach(function(o) {
      var s = r.getInitialValue(o);
      r.updateStore(bt(r.store, o, s));
    }), r.resetWithFieldInitialValue({
      namePathList: i
    }), r.notifyObservers(a, i, {
      type: "reset"
    }), r.notifyWatch(i);
  }), E(this, "setFields", function(n) {
    r.warningUnhooked();
    var a = r.store, i = [];
    n.forEach(function(o) {
      var s = o.name, l = ht(o, Tg), c = Ne(s);
      i.push(c), "value" in l && r.updateStore(bt(r.store, c, l.value)), r.notifyObservers(a, [c], {
        type: "setField",
        data: o
      });
    }), r.notifyWatch(i);
  }), E(this, "getFields", function() {
    var n = r.getFieldEntities(!0), a = n.map(function(i) {
      var o = i.getNamePath(), s = i.getMeta(), l = R(R({}, s), {}, {
        name: o,
        value: r.getFieldValue(o)
      });
      return Object.defineProperty(l, "originRCField", {
        value: !0
      }), l;
    });
    return a;
  }), E(this, "initEntityValue", function(n) {
    var a = n.props.initialValue;
    if (a !== void 0) {
      var i = n.getNamePath(), o = _t(r.store, i);
      o === void 0 && r.updateStore(bt(r.store, i, a));
    }
  }), E(this, "isMergedPreserve", function(n) {
    var a = n !== void 0 ? n : r.preserve;
    return a ?? !0;
  }), E(this, "registerField", function(n) {
    r.fieldEntities.push(n);
    var a = n.getNamePath();
    if (r.notifyWatch([a]), n.props.initialValue !== void 0) {
      var i = r.store;
      r.resetWithFieldInitialValue({
        entities: [n],
        skipExist: !0
      }), r.notifyObservers(i, [n.getNamePath()], {
        type: "valueUpdate",
        source: "internal"
      });
    }
    return function(o, s) {
      var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      if (r.fieldEntities = r.fieldEntities.filter(function(d) {
        return d !== n;
      }), !r.isMergedPreserve(s) && (!o || l.length > 1)) {
        var c = o ? void 0 : r.getInitialValue(a);
        if (a.length && r.getFieldValue(a) !== c && r.fieldEntities.every(function(d) {
          return (
            // Only reset when no namePath exist
            !Kc(d.getNamePath(), a)
          );
        })) {
          var u = r.store;
          r.updateStore(bt(u, a, c, !0)), r.notifyObservers(u, [a], {
            type: "remove"
          }), r.triggerDependenciesUpdate(u, a);
        }
      }
      r.notifyWatch([a]);
    };
  }), E(this, "dispatch", function(n) {
    switch (n.type) {
      case "updateValue": {
        var a = n.namePath, i = n.value;
        r.updateValue(a, i);
        break;
      }
      case "validateField": {
        var o = n.namePath, s = n.triggerName;
        r.validateFields([o], {
          triggerName: s
        });
        break;
      }
    }
  }), E(this, "notifyObservers", function(n, a, i) {
    if (r.subscribable) {
      var o = R(R({}, i), {}, {
        store: r.getFieldsValue(!0)
      });
      r.getFieldEntities().forEach(function(s) {
        var l = s.onStoreChange;
        l(n, a, o);
      });
    } else
      r.forceRootUpdate();
  }), E(this, "triggerDependenciesUpdate", function(n, a) {
    var i = r.getDependencyChildrenFields(a);
    return i.length && r.validateFields(i), r.notifyObservers(n, i, {
      type: "dependenciesUpdate",
      relatedFields: [a].concat(K(i))
    }), i;
  }), E(this, "updateValue", function(n, a) {
    var i = Ne(n), o = r.store;
    r.updateStore(bt(r.store, i, a)), r.notifyObservers(o, [i], {
      type: "valueUpdate",
      source: "internal"
    }), r.notifyWatch([i]);
    var s = r.triggerDependenciesUpdate(o, i), l = r.callbacks.onValuesChange;
    if (l) {
      var c = As(r.store, [i]);
      l(c, r.getFieldsValue());
    }
    r.triggerOnFieldsChange([i].concat(K(s)));
  }), E(this, "setFieldsValue", function(n) {
    r.warningUnhooked();
    var a = r.store;
    if (n) {
      var i = nr(r.store, n);
      r.updateStore(i);
    }
    r.notifyObservers(a, null, {
      type: "valueUpdate",
      source: "external"
    }), r.notifyWatch();
  }), E(this, "setFieldValue", function(n, a) {
    r.setFields([{
      name: n,
      value: a,
      errors: [],
      warnings: []
    }]);
  }), E(this, "getDependencyChildrenFields", function(n) {
    var a = /* @__PURE__ */ new Set(), i = [], o = new rr();
    r.getFieldEntities().forEach(function(l) {
      var c = l.props.dependencies;
      (c || []).forEach(function(u) {
        var d = Ne(u);
        o.update(d, function() {
          var v = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          return v.add(l), v;
        });
      });
    });
    var s = function l(c) {
      var u = o.get(c) || /* @__PURE__ */ new Set();
      u.forEach(function(d) {
        if (!a.has(d)) {
          a.add(d);
          var v = d.getNamePath();
          d.isFieldDirty() && v.length && (i.push(v), l(v));
        }
      });
    };
    return s(n), i;
  }), E(this, "triggerOnFieldsChange", function(n, a) {
    var i = r.callbacks.onFieldsChange;
    if (i) {
      var o = r.getFields();
      if (a) {
        var s = new rr();
        a.forEach(function(c) {
          var u = c.name, d = c.errors;
          s.set(u, d);
        }), o.forEach(function(c) {
          c.errors = s.get(c.name) || c.errors;
        });
      }
      var l = o.filter(function(c) {
        var u = c.name;
        return sr(n, u);
      });
      l.length && i(l, o);
    }
  }), E(this, "validateFields", function(n, a) {
    r.warningUnhooked();
    var i, o;
    Array.isArray(n) || typeof n == "string" || typeof a == "string" ? (i = n, o = a) : o = n;
    var s = !!i, l = s ? i.map(Ne) : [], c = [], u = String(Date.now()), d = /* @__PURE__ */ new Set(), v = o || {}, b = v.recursive, g = v.dirty;
    r.getFieldEntities(!0).forEach(function(h) {
      if (s || l.push(h.getNamePath()), !(!h.props.rules || !h.props.rules.length) && !(g && !h.isFieldDirty())) {
        var $ = h.getNamePath();
        if (d.add($.join(u)), !s || sr(l, $, b)) {
          var P = h.validateRules(R({
            validateMessages: R(R({}, Gc), r.validateMessages)
          }, o));
          c.push(P.then(function() {
            return {
              name: $,
              errors: [],
              warnings: []
            };
          }).catch(function(C) {
            var _, y = [], w = [];
            return (_ = C.forEach) === null || _ === void 0 || _.call(C, function(O) {
              var T = O.rule.warningOnly, j = O.errors;
              T ? w.push.apply(w, K(j)) : y.push.apply(y, K(j));
            }), y.length ? Promise.reject({
              name: $,
              errors: y,
              warnings: w
            }) : {
              name: $,
              errors: y,
              warnings: w
            };
          }));
        }
      }
    });
    var m = Rg(c);
    r.lastValidatePromise = m, m.catch(function(h) {
      return h;
    }).then(function(h) {
      var $ = h.map(function(P) {
        var C = P.name;
        return C;
      });
      r.notifyObservers(r.store, $, {
        type: "validateFinish"
      }), r.triggerOnFieldsChange($, h);
    });
    var f = m.then(function() {
      return r.lastValidatePromise === m ? Promise.resolve(r.getFieldsValue(l)) : Promise.reject([]);
    }).catch(function(h) {
      var $ = h.filter(function(P) {
        return P && P.errors.length;
      });
      return Promise.reject({
        values: r.getFieldsValue(l),
        errorFields: $,
        outOfDate: r.lastValidatePromise !== m
      });
    });
    f.catch(function(h) {
      return h;
    });
    var x = l.filter(function(h) {
      return d.has(h.join(u));
    });
    return r.triggerOnFieldsChange(x), f;
  }), E(this, "submit", function() {
    r.warningUnhooked(), r.validateFields().then(function(n) {
      var a = r.callbacks.onFinish;
      if (a)
        try {
          a(n);
        } catch (i) {
          console.error(i);
        }
    }).catch(function(n) {
      var a = r.callbacks.onFinishFailed;
      a && a(n);
    });
  }), this.forceRootUpdate = t;
});
function Qc(e) {
  var t = S.useRef(), r = S.useState({}), n = B(r, 2), a = n[1];
  if (!t.current)
    if (e)
      t.current = e;
    else {
      var i = function() {
        a({});
      }, o = new Fg(i);
      t.current = o.getForm();
    }
  return [t.current];
}
var Hi = /* @__PURE__ */ S.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), Mg = function(t) {
  var r = t.validateMessages, n = t.onFormChange, a = t.onFormFinish, i = t.children, o = S.useContext(Hi), s = S.useRef({});
  return /* @__PURE__ */ S.createElement(Hi.Provider, {
    value: R(R({}, o), {}, {
      validateMessages: R(R({}, o.validateMessages), r),
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
        c && (s.current = R(R({}, s.current), {}, E({}, c, u))), o.registerForm(c, u);
      },
      unregisterForm: function(c) {
        var u = R({}, s.current);
        delete u[c], s.current = u, o.unregisterForm(c);
      }
    })
  }, i);
}, Ag = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed", "clearOnDestroy"], jg = function(t, r) {
  var n = t.name, a = t.initialValues, i = t.fields, o = t.form, s = t.preserve, l = t.children, c = t.component, u = c === void 0 ? "form" : c, d = t.validateMessages, v = t.validateTrigger, b = v === void 0 ? "onChange" : v, g = t.onValuesChange, m = t.onFieldsChange, f = t.onFinish, x = t.onFinishFailed, h = t.clearOnDestroy, $ = ht(t, Ag), P = S.useRef(null), C = S.useContext(Hi), _ = Qc(o), y = B(_, 1), w = y[0], O = w.getInternalHooks(Bt), T = O.useSubscribe, j = O.setInitialValues, k = O.setCallbacks, F = O.setValidateMessages, M = O.setPreserve, I = O.destroyForm;
  S.useImperativeHandle(r, function() {
    return R(R({}, w), {}, {
      nativeElement: P.current
    });
  }), S.useEffect(function() {
    return C.registerForm(n, w), function() {
      C.unregisterForm(n);
    };
  }, [C, w, n]), F(R(R({}, C.validateMessages), d)), k({
    onValuesChange: g,
    onFieldsChange: function(U) {
      if (C.triggerFormChange(n, U), m) {
        for (var de = arguments.length, ie = new Array(de > 1 ? de - 1 : 0), ve = 1; ve < de; ve++)
          ie[ve - 1] = arguments[ve];
        m.apply(void 0, [U].concat(ie));
      }
    },
    onFinish: function(U) {
      C.triggerFormFinish(n, U), f && f(U);
    },
    onFinishFailed: x
  }), M(s);
  var N = S.useRef(null);
  j(a, !N.current), N.current || (N.current = !0), S.useEffect(
    function() {
      return function() {
        return I(h);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var V, z = typeof l == "function";
  if (z) {
    var Q = w.getFieldsValue(!0);
    V = l(Q, w);
  } else
    V = l;
  T(!z);
  var X = S.useRef();
  S.useEffect(function() {
    _g(X.current || [], i || []) || w.setFields(i || []), X.current = i;
  }, [i, w]);
  var Z = S.useMemo(function() {
    return R(R({}, w), {}, {
      validateTrigger: b
    });
  }, [w, b]), q = /* @__PURE__ */ S.createElement(Hn.Provider, {
    value: null
  }, /* @__PURE__ */ S.createElement(pr.Provider, {
    value: Z
  }, V));
  return u === !1 ? q : /* @__PURE__ */ S.createElement(u, Ke({}, $, {
    ref: P,
    onSubmit: function(U) {
      U.preventDefault(), U.stopPropagation(), w.submit();
    },
    onReset: function(U) {
      var de;
      U.preventDefault(), w.resetFields(), (de = $.onReset) === null || de === void 0 || de.call($, U);
    }
  }), q);
};
function ks(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
var kg = process.env.NODE_ENV !== "production" ? function(e) {
  var t = e.join("__RC_FIELD_FORM_SPLIT__"), r = De(t);
  Me(r.current === t, "`useWatch` is not support dynamic `namePath`. Please provide static instead.");
} : function() {
};
function Ig() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = t[0], a = t[1], i = a === void 0 ? {} : a, o = Wm(i) ? {
    form: i
  } : i, s = o.form, l = Ya(), c = B(l, 2), u = c[0], d = c[1], v = vu(function() {
    return ks(u);
  }, [u]), b = De(v);
  b.current = v;
  var g = Rt(pr), m = s || g, f = m && m._init;
  process.env.NODE_ENV !== "production" && Me(t.length === 2 ? s ? f : !0 : f, "useWatch requires a form instance since it can not auto detect from context.");
  var x = Ne(n), h = De(x);
  return h.current = x, kg(x), St(
    function() {
      if (f) {
        var $ = m.getFieldsValue, P = m.getInternalHooks, C = P(Bt), _ = C.registerWatch, y = function(j, k) {
          var F = o.preserve ? k : j;
          return typeof n == "function" ? n(F) : _t(F, h.current);
        }, w = _(function(T, j) {
          var k = y(T, j), F = ks(k);
          b.current !== F && (b.current = F, d(k));
        }), O = y($(), $(!0));
        return u !== O && d(O), w;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f]
  ), u;
}
var Ng = /* @__PURE__ */ S.forwardRef(jg), ln = Ng;
ln.FormProvider = Mg;
ln.Field = Xc;
ln.List = Og;
ln.useForm = Qc;
ln.useWatch = Ig;
const Br = /* @__PURE__ */ S.createContext({});
process.env.NODE_ENV !== "production" && (Br.displayName = "FormItemInputContext");
const Dg = ({
  children: e,
  status: t,
  override: r
}) => {
  const n = S.useContext(Br), a = S.useMemo(() => {
    const i = Object.assign({}, n);
    return r && delete i.isFormItemInput, t && (delete i.status, delete i.hasFeedback, delete i.feedbackIcon), i;
  }, [t, r, n]);
  return /* @__PURE__ */ S.createElement(Br.Provider, {
    value: a
  }, e);
}, Vg = /* @__PURE__ */ S.createContext(void 0), Zc = (e, t, r = void 0) => {
  var n, a;
  const {
    variant: i,
    [e]: o
  } = S.useContext(Dt), s = S.useContext(Vg), l = o == null ? void 0 : o.variant;
  let c;
  typeof t < "u" ? c = t : r === !1 ? c = "borderless" : c = (a = (n = s ?? l) !== null && n !== void 0 ? n : i) !== null && a !== void 0 ? a : "outlined";
  const u = _p.includes(c);
  return [c, u];
}, Is = (e) => {
  const {
    space: t,
    form: r,
    children: n
  } = e;
  if (n == null)
    return null;
  let a = n;
  return r && (a = /* @__PURE__ */ H.createElement(Dg, {
    override: !0,
    status: !0
  }, a)), t && (a = /* @__PURE__ */ H.createElement(Dh, null, a)), a;
};
function Lg(e, t) {
  const r = De([]), n = () => {
    r.current.push(setTimeout(() => {
      var a, i, o, s;
      !((a = e.current) === null || a === void 0) && a.input && ((i = e.current) === null || i === void 0 ? void 0 : i.input.getAttribute("type")) === "password" && (!((o = e.current) === null || o === void 0) && o.input.hasAttribute("value")) && ((s = e.current) === null || s === void 0 || s.input.removeAttribute("value"));
    }));
  };
  return St(() => (n(), () => r.current.forEach((a) => {
    a && clearTimeout(a);
  })), []), n;
}
function go(e) {
  return Xt(e, {
    inputAffixPadding: e.paddingXXS
  });
}
const bo = (e) => {
  const {
    controlHeight: t,
    fontSize: r,
    lineHeight: n,
    lineWidth: a,
    controlHeightSM: i,
    controlHeightLG: o,
    fontSizeLG: s,
    lineHeightLG: l,
    paddingSM: c,
    controlPaddingHorizontalSM: u,
    controlPaddingHorizontal: d,
    colorFillAlter: v,
    colorPrimaryHover: b,
    colorPrimary: g,
    controlOutlineWidth: m,
    controlOutline: f,
    colorErrorOutline: x,
    colorWarningOutline: h,
    colorBgContainer: $,
    inputFontSize: P,
    inputFontSizeLG: C,
    inputFontSizeSM: _
  } = e, y = P || r, w = _ || y, O = C || s, T = Math.round((t - y * n) / 2 * 10) / 10 - a, j = Math.round((i - w * n) / 2 * 10) / 10 - a, k = Math.ceil((o - O * l) / 2 * 10) / 10 - a;
  return {
    paddingBlock: Math.max(T, 0),
    paddingBlockSM: Math.max(j, 0),
    paddingBlockLG: Math.max(k, 0),
    paddingInline: c - a,
    paddingInlineSM: u - a,
    paddingInlineLG: d - a,
    addonBg: v,
    activeBorderColor: g,
    hoverBorderColor: b,
    activeShadow: `0 0 0 ${m}px ${f}`,
    errorActiveShadow: `0 0 0 ${m}px ${x}`,
    warningActiveShadow: `0 0 0 ${m}px ${h}`,
    hoverBg: $,
    activeBg: $,
    inputFontSize: y,
    inputFontSizeLG: O,
    inputFontSizeSM: w
  };
}, zg = (e) => ({
  borderColor: e.hoverBorderColor,
  backgroundColor: e.hoverBg
}), yo = (e) => ({
  color: e.colorTextDisabled,
  backgroundColor: e.colorBgContainerDisabled,
  borderColor: e.colorBorder,
  boxShadow: "none",
  cursor: "not-allowed",
  opacity: 1,
  "input[disabled], textarea[disabled]": {
    cursor: "not-allowed"
  },
  "&:hover:not([disabled])": Object.assign({}, zg(Xt(e, {
    hoverBorderColor: e.colorBorder,
    hoverBg: e.colorBgContainerDisabled
  })))
}), eu = (e, t) => ({
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
}), Ns = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, eu(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  }),
  [`&${e.componentCls}-status-${t.status}${e.componentCls}-disabled`]: {
    borderColor: t.borderColor
  }
}), Hg = (e, t) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, eu(e, {
    borderColor: e.colorBorder,
    hoverBorderColor: e.hoverBorderColor,
    activeBorderColor: e.activeBorderColor,
    activeShadow: e.activeShadow
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, yo(e))
  }), Ns(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), Ns(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), t)
}), Ds = (e, t) => ({
  [`&${e.componentCls}-group-wrapper-status-${t.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      borderColor: t.addonBorderColor,
      color: t.addonColor
    }
  }
}), Bg = (e) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group`]: {
      "&-addon": {
        background: e.addonBg,
        border: `${ke(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
      },
      "&-addon:first-child": {
        borderInlineEnd: 0
      },
      "&-addon:last-child": {
        borderInlineStart: 0
      }
    }
  }, Ds(e, {
    status: "error",
    addonBorderColor: e.colorError,
    addonColor: e.colorErrorText
  })), Ds(e, {
    status: "warning",
    addonBorderColor: e.colorWarning,
    addonColor: e.colorWarningText
  })), {
    [`&${e.componentCls}-group-wrapper-disabled`]: {
      [`${e.componentCls}-group-addon`]: Object.assign({}, yo(e))
    }
  })
}), Wg = (e, t) => {
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
}, tu = (e, t) => {
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
}, Vs = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, tu(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  })
}), qg = (e, t) => ({
  "&-filled": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, tu(e, {
    bg: e.colorFillTertiary,
    hoverBg: e.colorFillSecondary,
    activeBorderColor: e.activeBorderColor
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, yo(e))
  }), Vs(e, {
    status: "error",
    bg: e.colorErrorBg,
    hoverBg: e.colorErrorBgHover,
    activeBorderColor: e.colorError,
    inputColor: e.colorErrorText,
    affixColor: e.colorError
  })), Vs(e, {
    status: "warning",
    bg: e.colorWarningBg,
    hoverBg: e.colorWarningBgHover,
    activeBorderColor: e.colorWarning,
    inputColor: e.colorWarningText,
    affixColor: e.colorWarning
  })), t)
}), Ls = (e, t) => ({
  [`&${e.componentCls}-group-wrapper-status-${t.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      background: t.addonBg,
      color: t.addonColor
    }
  }
}), Ug = (e) => ({
  "&-filled": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group-addon`]: {
      background: e.colorFillTertiary,
      "&:last-child": {
        position: "static"
      }
    }
  }, Ls(e, {
    status: "error",
    addonBg: e.colorErrorBg,
    addonColor: e.colorErrorText
  })), Ls(e, {
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
          borderInlineStart: `${ke(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${ke(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${ke(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        },
        "&-addon:last-child": {
          borderInlineEnd: `${ke(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${ke(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${ke(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        }
      }
    }
  })
}), ru = (e, t) => ({
  background: e.colorBgContainer,
  borderWidth: `${ke(e.lineWidth)} 0`,
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
}), zs = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, ru(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  }),
  [`&${e.componentCls}-status-${t.status}${e.componentCls}-disabled`]: {
    borderColor: `transparent transparent ${t.borderColor} transparent`
  }
}), Yg = (e, t) => ({
  "&-underlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ru(e, {
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
  }), zs(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), zs(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), t)
}), Gg = (e) => ({
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
}), nu = (e) => {
  const {
    paddingBlockLG: t,
    lineHeightLG: r,
    borderRadiusLG: n,
    paddingInlineLG: a
  } = e;
  return {
    padding: `${ke(t)} ${ke(a)}`,
    fontSize: e.inputFontSizeLG,
    lineHeight: r,
    borderRadius: n
  };
}, au = (e) => ({
  padding: `${ke(e.paddingBlockSM)} ${ke(e.paddingInlineSM)}`,
  fontSize: e.inputFontSizeSM,
  borderRadius: e.borderRadiusSM
}), iu = (e) => Object.assign(Object.assign({
  position: "relative",
  display: "inline-block",
  width: "100%",
  minWidth: 0,
  padding: `${ke(e.paddingBlock)} ${ke(e.paddingInline)}`,
  color: e.colorText,
  fontSize: e.inputFontSize,
  lineHeight: e.lineHeight,
  borderRadius: e.borderRadius,
  transition: `all ${e.motionDurationMid}`
}, Gg(e.colorTextPlaceholder)), {
  // Size
  "&-lg": Object.assign({}, nu(e)),
  "&-sm": Object.assign({}, au(e)),
  // RTL
  "&-rtl, &-textarea-rtl": {
    direction: "rtl"
  }
}), Kg = (e) => {
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
    [`&-lg ${t}, &-lg > ${t}-group-addon`]: Object.assign({}, nu(e)),
    [`&-sm ${t}, &-sm > ${t}-group-addon`]: Object.assign({}, au(e)),
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
        padding: `0 ${ke(e.paddingInline)}`,
        color: e.colorText,
        fontWeight: "normal",
        fontSize: e.inputFontSize,
        textAlign: "center",
        borderRadius: e.borderRadius,
        transition: `all ${e.motionDurationSlow}`,
        lineHeight: 1,
        // Reset Select's style in addon
        [`${r}-select`]: {
          margin: `${ke(e.calc(e.paddingBlock).add(1).mul(-1).equal())} ${ke(e.calc(e.paddingInline).mul(-1).equal())}`,
          [`&${r}-select-single:not(${r}-select-customize-input):not(${r}-pagination-size-changer)`]: {
            [`${r}-select-selector`]: {
              backgroundColor: "inherit",
              border: `${ke(e.lineWidth)} ${e.lineType} transparent`,
              boxShadow: "none"
            }
          }
        },
        // https://github.com/ant-design/ant-design/issues/31333
        [`${r}-cascader-picker`]: {
          margin: `-9px ${ke(e.calc(e.paddingInline).mul(-1).equal())}`,
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
    }, Jp()), {
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
}, Xg = (e) => {
  const {
    componentCls: t,
    controlHeightSM: r,
    lineWidth: n,
    calc: a
  } = e, o = a(r).sub(a(n).mul(2)).sub(16).div(2).equal();
  return {
    [t]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, nc(e)), iu(e)), Hg(e)), qg(e)), Wg(e)), Yg(e)), {
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
}, Jg = (e) => {
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
        color: e.colorIcon
      },
      "&:active": {
        color: e.colorText
      },
      "&-hidden": {
        visibility: "hidden"
      },
      "&-has-suffix": {
        margin: `0 ${ke(e.inputAffixPadding)}`
      }
    }
  };
}, Qg = (e) => {
  const {
    componentCls: t,
    inputAffixPadding: r,
    colorTextDescription: n,
    motionDurationSlow: a,
    colorIcon: i,
    colorIconHover: o,
    iconCls: s
  } = e, l = `${t}-affix-wrapper`, c = `${t}-affix-wrapper-disabled`;
  return {
    [l]: Object.assign(Object.assign(Object.assign(Object.assign({}, iu(e)), {
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
          color: n,
          direction: "ltr"
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
    }), Jg(e)), {
      // password
      [`${s}${t}-password-icon`]: {
        color: i,
        cursor: "pointer",
        transition: `all ${a}`,
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
      [`${s}${t}-password-icon`]: {
        color: i,
        cursor: "not-allowed",
        "&:hover": {
          color: i
        }
      }
    }
  };
}, Zg = (e) => {
  const {
    componentCls: t,
    borderRadiusLG: r,
    borderRadiusSM: n
  } = e;
  return {
    [`${t}-group`]: Object.assign(Object.assign(Object.assign({}, nc(e)), Kg(e)), {
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
      }, Bg(e)), Ug(e)), {
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
}, eb = (e) => {
  const {
    componentCls: t,
    antCls: r
  } = e, n = `${t}-search`;
  return {
    [n]: {
      [t]: {
        "&:hover, &:focus": {
          [`+ ${t}-group-addon ${n}-button:not(${r}-btn-color-primary):not(${r}-btn-variant-text)`]: {
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
          [`${n}-button:not(${r}-btn-color-primary)`]: {
            color: e.colorTextDescription,
            "&:hover": {
              color: e.colorPrimaryHover
            },
            "&:active": {
              color: e.colorPrimaryActive
            },
            [`&${r}-btn-loading::before`]: {
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
}, tb = (e) => {
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
}, ou = fo(["Input", "Shared"], (e) => {
  const t = Xt(e, go(e));
  return [Xg(t), Qg(t)];
}, bo, {
  resetFont: !1
}), rb = fo(["Input", "Component"], (e) => {
  const t = Xt(e, go(e));
  return [
    Zg(t),
    eb(t),
    tb(t),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    nm(t)
  ];
}, bo, {
  resetFont: !1
});
function nb(e) {
  return !!(e.prefix || e.suffix || e.allowClear || e.showCount);
}
var ab = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const ib = /* @__PURE__ */ Wi((e, t) => {
  const {
    prefixCls: r,
    bordered: n = !0,
    status: a,
    size: i,
    disabled: o,
    onBlur: s,
    onFocus: l,
    suffix: c,
    allowClear: u,
    addonAfter: d,
    addonBefore: v,
    className: b,
    style: g,
    styles: m,
    rootClassName: f,
    onChange: x,
    classNames: h,
    variant: $
  } = e, P = ab(e, ["prefixCls", "bordered", "status", "size", "disabled", "onBlur", "onFocus", "suffix", "allowClear", "addonAfter", "addonBefore", "className", "style", "styles", "rootClassName", "onChange", "classNames", "variant"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: ue
    } = Ut("Input");
    ue(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: C,
    direction: _,
    allowClear: y,
    autoComplete: w,
    className: O,
    style: T,
    classNames: j,
    styles: k
  } = Xl("input"), F = C("input", r), M = De(null), I = qc(F), [N, V, z] = ou(F, f), [Q] = rb(F, I), {
    compactSize: X,
    compactItemClassnames: Z
  } = $c(F, _), q = Cc((ue) => {
    var Le;
    return (Le = i ?? X) !== null && Le !== void 0 ? Le : ue;
  }), W = H.useContext(Lr), U = o ?? W, {
    status: de,
    hasFeedback: ie,
    feedbackIcon: ve
  } = Rt(Br), le = Wc(de, a), fe = nb(e) || !!ie, ce = De(fe);
  if (process.env.NODE_ENV !== "production") {
    const ue = Ut("Input");
    St(() => {
      var Le;
      fe && !ce.current && process.env.NODE_ENV !== "production" && ue(document.activeElement === ((Le = M.current) === null || Le === void 0 ? void 0 : Le.input), "usage", "When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ"), ce.current = fe;
    }, [fe]);
  }
  const we = Lg(M), Pe = (ue) => {
    we(), s == null || s(ue);
  }, Ie = (ue) => {
    we(), l == null || l(ue);
  }, L = (ue) => {
    we(), x == null || x(ue);
  }, $e = (ie || c) && /* @__PURE__ */ H.createElement(H.Fragment, null, c, ie && ve), Y = Bc(u ?? y), [oe, Ae] = Zc("input", $, n);
  return N(Q(/* @__PURE__ */ H.createElement(lm, Object.assign({
    ref: ll(t, M),
    prefixCls: F,
    autoComplete: w
  }, P, {
    disabled: U,
    onBlur: Pe,
    onFocus: Ie,
    style: Object.assign(Object.assign({}, T), g),
    styles: Object.assign(Object.assign({}, k), m),
    suffix: $e,
    allowClear: Y,
    className: Se(b, f, z, I, Z, O),
    onChange: L,
    addonBefore: v && /* @__PURE__ */ H.createElement(Is, {
      form: !0,
      space: !0
    }, v),
    addonAfter: d && /* @__PURE__ */ H.createElement(Is, {
      form: !0,
      space: !0
    }, d),
    classNames: Object.assign(Object.assign(Object.assign({}, h), j), {
      input: Se({
        [`${F}-sm`]: q === "small",
        [`${F}-lg`]: q === "large",
        [`${F}-rtl`]: _ === "rtl"
      }, h == null ? void 0 : h.input, j.input, V),
      variant: Se({
        [`${F}-${oe}`]: Ae
      }, Mi(F, le)),
      affixWrapper: Se({
        [`${F}-affix-wrapper-sm`]: q === "small",
        [`${F}-affix-wrapper-lg`]: q === "large",
        [`${F}-affix-wrapper-rtl`]: _ === "rtl"
      }, V),
      wrapper: Se({
        [`${F}-group-rtl`]: _ === "rtl"
      }, V),
      groupWrapper: Se({
        [`${F}-group-wrapper-sm`]: q === "small",
        [`${F}-group-wrapper-lg`]: q === "large",
        [`${F}-group-wrapper-rtl`]: _ === "rtl",
        [`${F}-group-wrapper-${oe}`]: Ae
      }, Mi(`${F}-group-wrapper`, le, ie), V)
    })
  }))));
});
process.env.NODE_ENV !== "production" && (ib.displayName = "Input");
const ob = (e) => {
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
      [`&-affix-wrapper${t}-affix-wrapper-rtl`]: {
        [`${t}-suffix`]: {
          [`${t}-data-count`]: {
            direction: "ltr",
            insetInlineStart: 0
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
}, sb = fo(["Input", "TextArea"], (e) => {
  const t = Xt(e, go(e));
  return [ob(t)];
}, bo, {
  resetFont: !1
});
var lb = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const xb = /* @__PURE__ */ Wi((e, t) => {
  var r;
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
    style: v,
    styles: b,
    variant: g,
    showCount: m,
    onMouseDown: f,
    onResize: x
  } = e, h = lb(e, ["prefixCls", "bordered", "size", "disabled", "status", "allowClear", "classNames", "rootClassName", "className", "style", "styles", "variant", "showCount", "onMouseDown", "onResize"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: Y
    } = Ut("TextArea");
    Y(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: $,
    direction: P,
    allowClear: C,
    autoComplete: _,
    className: y,
    style: w,
    classNames: O,
    styles: T
  } = Xl("textArea"), j = S.useContext(Lr), k = o ?? j, {
    status: F,
    hasFeedback: M,
    feedbackIcon: I
  } = S.useContext(Br), N = Wc(F, s), V = S.useRef(null);
  S.useImperativeHandle(t, () => {
    var Y;
    return {
      resizableTextArea: (Y = V.current) === null || Y === void 0 ? void 0 : Y.resizableTextArea,
      focus: (oe) => {
        var Ae, ue;
        Fc((ue = (Ae = V.current) === null || Ae === void 0 ? void 0 : Ae.resizableTextArea) === null || ue === void 0 ? void 0 : ue.textArea, oe);
      },
      blur: () => {
        var oe;
        return (oe = V.current) === null || oe === void 0 ? void 0 : oe.blur();
      }
    };
  });
  const z = $("input", n), Q = qc(z), [X, Z, q] = ou(z, u), [W] = sb(z, Q), {
    compactSize: U,
    compactItemClassnames: de
  } = $c(z, P), ie = Cc((Y) => {
    var oe;
    return (oe = i ?? U) !== null && oe !== void 0 ? oe : Y;
  }), [ve, le] = Zc("textArea", g, a), fe = Bc(l ?? C), [ce, we] = S.useState(!1), [Pe, Ie] = S.useState(!1), L = (Y) => {
    we(!0), f == null || f(Y);
    const oe = () => {
      we(!1), document.removeEventListener("mouseup", oe);
    };
    document.addEventListener("mouseup", oe);
  }, $e = (Y) => {
    var oe, Ae;
    if (x == null || x(Y), ce && typeof getComputedStyle == "function") {
      const ue = (Ae = (oe = V.current) === null || oe === void 0 ? void 0 : oe.nativeElement) === null || Ae === void 0 ? void 0 : Ae.querySelector("textarea");
      ue && getComputedStyle(ue).resize === "both" && Ie(!0);
    }
  };
  return X(W(/* @__PURE__ */ S.createElement(zm, Object.assign({
    autoComplete: _
  }, h, {
    style: Object.assign(Object.assign({}, w), v),
    styles: Object.assign(Object.assign({}, T), b),
    disabled: k,
    allowClear: fe,
    className: Se(
      q,
      Q,
      d,
      u,
      de,
      y,
      // Only for wrapper
      Pe && `${z}-textarea-affix-wrapper-resize-dirty`
    ),
    classNames: Object.assign(Object.assign(Object.assign({}, c), O), {
      textarea: Se({
        [`${z}-sm`]: ie === "small",
        [`${z}-lg`]: ie === "large"
      }, Z, c == null ? void 0 : c.textarea, O.textarea, ce && `${z}-mouse-active`),
      variant: Se({
        [`${z}-${ve}`]: le
      }, Mi(z, N)),
      affixWrapper: Se(`${z}-textarea-affix-wrapper`, {
        [`${z}-affix-wrapper-rtl`]: P === "rtl",
        [`${z}-affix-wrapper-sm`]: ie === "small",
        [`${z}-affix-wrapper-lg`]: ie === "large",
        [`${z}-textarea-show-count`]: m || ((r = e.count) === null || r === void 0 ? void 0 : r.show)
      }, Z)
    }),
    prefixCls: z,
    suffix: M && /* @__PURE__ */ S.createElement("span", {
      className: `${z}-textarea-suffix`
    }, I),
    showCount: m,
    ref: V,
    onResize: $e,
    onMouseDown: L
  }))));
});
export {
  bb as L,
  xb as T,
  gb as a,
  mb as b,
  hb as c,
  vb as d,
  pb as e,
  gf as f,
  ef as g,
  Dd as h,
  Sb as i,
  fb as j,
  Cd as k,
  od as l,
  Wu as m,
  Ou as n
};
