import * as S from "react";
import H, { isValidElement as Yc, version as Gc, useContext as xt, createContext as Bi, useRef as Ne, useLayoutEffect as Kc, useEffect as vt, cloneElement as Xc, forwardRef as Wi, useState as Xa, useImperativeHandle as wl, useMemo as Zc } from "react";
import { g as Vt } from "./vite.js";
import po from "react-dom";
import Se from "classnames";
var In = { exports: {} }, yr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ho;
function Jc() {
  if (ho) return yr;
  ho = 1;
  var e = H, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(s, l, u) {
    var c, d = {}, v = null, b = null;
    u !== void 0 && (v = "" + u), l.key !== void 0 && (v = "" + l.key), l.ref !== void 0 && (b = l.ref);
    for (c in l) n.call(l, c) && !i.hasOwnProperty(c) && (d[c] = l[c]);
    if (s && s.defaultProps) for (c in l = s.defaultProps, l) d[c] === void 0 && (d[c] = l[c]);
    return { $$typeof: t, type: s, key: v, ref: b, props: d, _owner: a.current };
  }
  return yr.Fragment = r, yr.jsx = o, yr.jsxs = o, yr;
}
var Sr = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mo;
function Qc() {
  return mo || (mo = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = H, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), g = Symbol.iterator, m = "@@iterator";
    function f(p) {
      if (p === null || typeof p != "object")
        return null;
      var M = g && p[g] || p[m];
      return typeof M == "function" ? M : null;
    }
    var x = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(p) {
      {
        for (var M = arguments.length, N = new Array(M > 1 ? M - 1 : 0), G = 1; G < M; G++)
          N[G - 1] = arguments[G];
        _("error", p, N);
      }
    }
    function _(p, M, N) {
      {
        var G = x.ReactDebugCurrentFrame, he = G.getStackAddendum();
        he !== "" && (M += "%s", N = N.concat([he]));
        var me = N.map(function(ae) {
          return String(ae);
        });
        me.unshift("Warning: " + M), Function.prototype.apply.call(console[p], console, me);
      }
    }
    var R = !1, E = !1, $ = !1, y = !1, w = !1, P;
    P = Symbol.for("react.module.reference");
    function F(p) {
      return !!(typeof p == "string" || typeof p == "function" || p === n || p === i || w || p === a || p === u || p === c || y || p === b || R || E || $ || typeof p == "object" && p !== null && (p.$$typeof === v || p.$$typeof === d || p.$$typeof === o || p.$$typeof === s || p.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      p.$$typeof === P || p.getModuleId !== void 0));
    }
    function j(p, M, N) {
      var G = p.displayName;
      if (G)
        return G;
      var he = M.displayName || M.name || "";
      return he !== "" ? N + "(" + he + ")" : N;
    }
    function D(p) {
      return p.displayName || "Context";
    }
    function T(p) {
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
        case u:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof p == "object")
        switch (p.$$typeof) {
          case s:
            var M = p;
            return D(M) + ".Consumer";
          case o:
            var N = p;
            return D(N._context) + ".Provider";
          case l:
            return j(p, p.render, "ForwardRef");
          case d:
            var G = p.displayName || null;
            return G !== null ? G : T(p.type) || "Memo";
          case v: {
            var he = p, me = he._payload, ae = he._init;
            try {
              return T(ae(me));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var A = Object.assign, k = 0, I, V, z, J, X, Q, W;
    function B() {
    }
    B.__reactDisabledLog = !0;
    function U() {
      {
        if (k === 0) {
          I = console.log, V = console.info, z = console.warn, J = console.error, X = console.group, Q = console.groupCollapsed, W = console.groupEnd;
          var p = {
            configurable: !0,
            enumerable: !0,
            value: B,
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
        k++;
      }
    }
    function de() {
      {
        if (k--, k === 0) {
          var p = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: A({}, p, {
              value: I
            }),
            info: A({}, p, {
              value: V
            }),
            warn: A({}, p, {
              value: z
            }),
            error: A({}, p, {
              value: J
            }),
            group: A({}, p, {
              value: X
            }),
            groupCollapsed: A({}, p, {
              value: Q
            }),
            groupEnd: A({}, p, {
              value: W
            })
          });
        }
        k < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ie = x.ReactCurrentDispatcher, ve;
    function le(p, M, N) {
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
    var fe = !1, ue;
    {
      var we = typeof WeakMap == "function" ? WeakMap : Map;
      ue = new we();
    }
    function Re(p, M) {
      if (!p || fe)
        return "";
      {
        var N = ue.get(p);
        if (N !== void 0)
          return N;
      }
      var G;
      fe = !0;
      var he = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var me;
      me = ie.current, ie.current = null, U();
      try {
        if (M) {
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
`), Be = G.stack.split(`
`), Te = re.length - 1, ge = Be.length - 1; Te >= 1 && ge >= 0 && re[Te] !== Be[ge]; )
            ge--;
          for (; Te >= 1 && ge >= 0; Te--, ge--)
            if (re[Te] !== Be[ge]) {
              if (Te !== 1 || ge !== 1)
                do
                  if (Te--, ge--, ge < 0 || re[Te] !== Be[ge]) {
                    var it = `
` + re[Te].replace(" at new ", " at ");
                    return p.displayName && it.includes("<anonymous>") && (it = it.replace("<anonymous>", p.displayName)), typeof p == "function" && ue.set(p, it), it;
                  }
                while (Te >= 1 && ge >= 0);
              break;
            }
        }
      } finally {
        fe = !1, ie.current = me, de(), Error.prepareStackTrace = he;
      }
      var Yt = p ? p.displayName || p.name : "", Mt = Yt ? le(Yt) : "";
      return typeof p == "function" && ue.set(p, Mt), Mt;
    }
    function ke(p, M, N) {
      return Re(p, !1);
    }
    function L(p) {
      var M = p.prototype;
      return !!(M && M.isReactComponent);
    }
    function _e(p, M, N) {
      if (p == null)
        return "";
      if (typeof p == "function")
        return Re(p, L(p));
      if (typeof p == "string")
        return le(p);
      switch (p) {
        case u:
          return le("Suspense");
        case c:
          return le("SuspenseList");
      }
      if (typeof p == "object")
        switch (p.$$typeof) {
          case l:
            return ke(p.render);
          case d:
            return _e(p.type, M, N);
          case v: {
            var G = p, he = G._payload, me = G._init;
            try {
              return _e(me(he), M, N);
            } catch {
            }
          }
        }
      return "";
    }
    var Y = Object.prototype.hasOwnProperty, oe = {}, Me = x.ReactDebugCurrentFrame;
    function ce(p) {
      if (p) {
        var M = p._owner, N = _e(p.type, p._source, M ? M.type : null);
        Me.setExtraStackFrame(N);
      } else
        Me.setExtraStackFrame(null);
    }
    function Le(p, M, N, G, he) {
      {
        var me = Function.call.bind(Y);
        for (var ae in p)
          if (me(p, ae)) {
            var re = void 0;
            try {
              if (typeof p[ae] != "function") {
                var Be = Error((G || "React class") + ": " + N + " type `" + ae + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof p[ae] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Be.name = "Invariant Violation", Be;
              }
              re = p[ae](M, ae, G, N, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Te) {
              re = Te;
            }
            re && !(re instanceof Error) && (ce(he), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", G || "React class", N, ae, typeof re), ce(null)), re instanceof Error && !(re.message in oe) && (oe[re.message] = !0, ce(he), h("Failed %s type: %s", N, re.message), ce(null));
          }
      }
    }
    var Oe = Array.isArray;
    function $e(p) {
      return Oe(p);
    }
    function te(p) {
      {
        var M = typeof Symbol == "function" && Symbol.toStringTag, N = M && p[Symbol.toStringTag] || p.constructor.name || "Object";
        return N;
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
    function rt(p) {
      if (ee(p))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", te(p)), xe(p);
    }
    var Xe = x.ReactCurrentOwner, Ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, nt, mt;
    function vr(p) {
      if (Y.call(p, "ref")) {
        var M = Object.getOwnPropertyDescriptor(p, "ref").get;
        if (M && M.isReactWarning)
          return !1;
      }
      return p.ref !== void 0;
    }
    function pr(p) {
      if (Y.call(p, "key")) {
        var M = Object.getOwnPropertyDescriptor(p, "key").get;
        if (M && M.isReactWarning)
          return !1;
      }
      return p.key !== void 0;
    }
    function Fe(p, M) {
      typeof p.ref == "string" && Xe.current;
    }
    function pe(p, M) {
      {
        var N = function() {
          nt || (nt = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", M));
        };
        N.isReactWarning = !0, Object.defineProperty(p, "key", {
          get: N,
          configurable: !0
        });
      }
    }
    function at(p, M) {
      {
        var N = function() {
          mt || (mt = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", M));
        };
        N.isReactWarning = !0, Object.defineProperty(p, "ref", {
          get: N,
          configurable: !0
        });
      }
    }
    var Ct = function(p, M, N, G, he, me, ae) {
      var re = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: p,
        key: M,
        ref: N,
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
    function Ca(p, M, N, G, he) {
      {
        var me, ae = {}, re = null, Be = null;
        N !== void 0 && (rt(N), re = "" + N), pr(M) && (rt(M.key), re = "" + M.key), vr(M) && (Be = M.ref, Fe(M, he));
        for (me in M)
          Y.call(M, me) && !Ze.hasOwnProperty(me) && (ae[me] = M[me]);
        if (p && p.defaultProps) {
          var Te = p.defaultProps;
          for (me in Te)
            ae[me] === void 0 && (ae[me] = Te[me]);
        }
        if (re || Be) {
          var ge = typeof p == "function" ? p.displayName || p.name || "Unknown" : p;
          re && pe(ae, ge), Be && at(ae, ge);
        }
        return Ct(p, re, Be, he, G, Xe.current, ae);
      }
    }
    var hr = x.ReactCurrentOwner, An = x.ReactDebugCurrentFrame;
    function _t(p) {
      if (p) {
        var M = p._owner, N = _e(p.type, p._source, M ? M.type : null);
        An.setExtraStackFrame(N);
      } else
        An.setExtraStackFrame(null);
    }
    var mr;
    mr = !1;
    function gr(p) {
      return typeof p == "object" && p !== null && p.$$typeof === t;
    }
    function Mn() {
      {
        if (hr.current) {
          var p = T(hr.current.type);
          if (p)
            return `

Check the render method of \`` + p + "`.";
        }
        return "";
      }
    }
    function jn(p) {
      return "";
    }
    var Tt = {};
    function Wt(p) {
      {
        var M = Mn();
        if (!M) {
          var N = typeof p == "string" ? p : p.displayName || p.name;
          N && (M = `

Check the top-level render call using <` + N + ">.");
        }
        return M;
      }
    }
    function At(p, M) {
      {
        if (!p._store || p._store.validated || p.key != null)
          return;
        p._store.validated = !0;
        var N = Wt(M);
        if (Tt[N])
          return;
        Tt[N] = !0;
        var G = "";
        p && p._owner && p._owner !== hr.current && (G = " It was passed a child from " + T(p._owner.type) + "."), _t(p), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', N, G), _t(null);
      }
    }
    function Ut(p, M) {
      {
        if (typeof p != "object")
          return;
        if ($e(p))
          for (var N = 0; N < p.length; N++) {
            var G = p[N];
            gr(G) && At(G, M);
          }
        else if (gr(p))
          p._store && (p._store.validated = !0);
        else if (p) {
          var he = f(p);
          if (typeof he == "function" && he !== p.entries)
            for (var me = he.call(p), ae; !(ae = me.next()).done; )
              gr(ae.value) && At(ae.value, M);
        }
      }
    }
    function $t(p) {
      {
        var M = p.type;
        if (M == null || typeof M == "string")
          return;
        var N;
        if (typeof M == "function")
          N = M.propTypes;
        else if (typeof M == "object" && (M.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        M.$$typeof === d))
          N = M.propTypes;
        else
          return;
        if (N) {
          var G = T(M);
          Le(N, p.props, "prop", G, p);
        } else if (M.PropTypes !== void 0 && !mr) {
          mr = !0;
          var he = T(M);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", he || "Unknown");
        }
        typeof M.getDefaultProps == "function" && !M.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function wt(p) {
      {
        for (var M = Object.keys(p.props), N = 0; N < M.length; N++) {
          var G = M[N];
          if (G !== "children" && G !== "key") {
            _t(p), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", G), _t(null);
            break;
          }
        }
        p.ref !== null && (_t(p), h("Invalid attribute `ref` supplied to `React.Fragment`."), _t(null));
      }
    }
    var br = {};
    function Dn(p, M, N, G, he, me) {
      {
        var ae = F(p);
        if (!ae) {
          var re = "";
          (p === void 0 || typeof p == "object" && p !== null && Object.keys(p).length === 0) && (re += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Be = jn();
          Be ? re += Be : re += Mn();
          var Te;
          p === null ? Te = "null" : $e(p) ? Te = "array" : p !== void 0 && p.$$typeof === t ? (Te = "<" + (T(p.type) || "Unknown") + " />", re = " Did you accidentally export a JSX literal instead of a component?") : Te = typeof p, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Te, re);
        }
        var ge = Ca(p, M, N, he, me);
        if (ge == null)
          return ge;
        if (ae) {
          var it = M.children;
          if (it !== void 0)
            if (G)
              if ($e(it)) {
                for (var Yt = 0; Yt < it.length; Yt++)
                  Ut(it[Yt], p);
                Object.freeze && Object.freeze(it);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ut(it, p);
        }
        if (Y.call(M, "key")) {
          var Mt = T(p), Ge = Object.keys(M).filter(function(Uc) {
            return Uc !== "key";
          }), $a = Ge.length > 0 ? "{key: someKey, " + Ge.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!br[Mt + $a]) {
            var Wc = Ge.length > 0 ? "{" + Ge.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, $a, Mt, Wc, Mt), br[Mt + $a] = !0;
          }
        }
        return p === n ? wt(ge) : $t(ge), ge;
      }
    }
    function ze(p, M, N) {
      return Dn(p, M, N, !0);
    }
    function kn(p, M, N) {
      return Dn(p, M, N, !1);
    }
    var _a = kn, je = ze;
    Sr.Fragment = n, Sr.jsx = _a, Sr.jsxs = je;
  })()), Sr;
}
var go;
function ed() {
  return go || (go = 1, process.env.NODE_ENV === "production" ? In.exports = Jc() : In.exports = Qc()), In.exports;
}
var Tg = ed(), xr = {}, wa = { exports: {} }, bo;
function Ce() {
  return bo || (bo = 1, (function(e) {
    function t(r) {
      return r && r.__esModule ? r : {
        default: r
      };
    }
    e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
  })(wa)), wa.exports;
}
var Er = {}, yo;
function td() {
  if (yo) return Er;
  yo = 1, Object.defineProperty(Er, "__esModule", {
    value: !0
  }), Er.default = void 0;
  var e = {
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
  return Er.default = e, Er;
}
var Cr = {}, _r = {}, $r = {}, Ra = { exports: {} }, Pa = { exports: {} }, Oa = { exports: {} }, Fa = { exports: {} }, So;
function Rl() {
  return So || (So = 1, (function(e) {
    function t(r) {
      "@babel/helpers - typeof";
      return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
        return typeof n;
      } : function(n) {
        return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
      }, e.exports.__esModule = !0, e.exports.default = e.exports, t(r);
    }
    e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
  })(Fa)), Fa.exports;
}
var Ta = { exports: {} }, xo;
function rd() {
  return xo || (xo = 1, (function(e) {
    var t = Rl().default;
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
  })(Ta)), Ta.exports;
}
var Eo;
function nd() {
  return Eo || (Eo = 1, (function(e) {
    var t = Rl().default, r = rd();
    function n(a) {
      var i = r(a, "string");
      return t(i) == "symbol" ? i : i + "";
    }
    e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
  })(Oa)), Oa.exports;
}
var Co;
function ad() {
  return Co || (Co = 1, (function(e) {
    var t = nd();
    function r(n, a, i) {
      return (a = t(a)) in n ? Object.defineProperty(n, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : n[a] = i, n;
    }
    e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
  })(Pa)), Pa.exports;
}
var _o;
function Lt() {
  return _o || (_o = 1, (function(e) {
    var t = ad();
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
  })(Ra)), Ra.exports;
}
var wr = {}, $o;
function zt() {
  return $o || ($o = 1, Object.defineProperty(wr, "__esModule", {
    value: !0
  }), wr.commonLocale = void 0, wr.commonLocale = {
    yearFormat: "YYYY",
    dayFormat: "D",
    cellMeridiemFormat: "A",
    monthBeforeYear: !0
  }), wr;
}
var wo;
function id() {
  if (wo) return $r;
  wo = 1;
  var e = Ce().default;
  Object.defineProperty($r, "__esModule", {
    value: !0
  }), $r.default = void 0;
  var t = e(Lt()), r = zt(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return $r.default = n, $r;
}
var Rr = {}, Ro;
function Pl() {
  if (Ro) return Rr;
  Ro = 1, Object.defineProperty(Rr, "__esModule", {
    value: !0
  }), Rr.default = void 0;
  const e = {
    placeholder: "请选择时间",
    rangePlaceholder: ["开始时间", "结束时间"]
  };
  return Rr.default = e, Rr;
}
var Po;
function Ol() {
  if (Po) return _r;
  Po = 1;
  var e = Ce().default;
  Object.defineProperty(_r, "__esModule", {
    value: !0
  }), _r.default = void 0;
  var t = e(id()), r = e(/* @__PURE__ */ Pl());
  const n = {
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
    }, t.default),
    timePickerLocale: Object.assign({}, r.default)
  };
  return n.lang.ok = "确定", _r.default = n, _r;
}
var Oo;
function od() {
  if (Oo) return Cr;
  Oo = 1;
  var e = Ce().default;
  Object.defineProperty(Cr, "__esModule", {
    value: !0
  }), Cr.default = void 0;
  var t = e(/* @__PURE__ */ Ol());
  return Cr.default = t.default, Cr;
}
var Fo;
function sd() {
  if (Fo) return xr;
  Fo = 1;
  var e = Ce().default;
  Object.defineProperty(xr, "__esModule", {
    value: !0
  }), xr.default = void 0;
  var t = e(td()), r = e(/* @__PURE__ */ od()), n = e(/* @__PURE__ */ Ol()), a = e(/* @__PURE__ */ Pl());
  const i = "${label}不是一个有效的${type}", o = {
    locale: "zh-cn",
    Pagination: t.default,
    DatePicker: n.default,
    TimePicker: a.default,
    Calendar: r.default,
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
          string: i,
          method: i,
          array: i,
          object: i,
          number: i,
          date: i,
          boolean: i,
          integer: i,
          float: i,
          regexp: i,
          email: i,
          url: i,
          hex: i
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
  return xr.default = o, xr;
}
var ld = /* @__PURE__ */ sd();
const Ag = /* @__PURE__ */ Vt(ld);
var Pr = {}, Or = {}, To;
function ud() {
  if (To) return Or;
  To = 1, Object.defineProperty(Or, "__esModule", {
    value: !0
  }), Or.default = void 0;
  var e = {
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
  return Or.default = e, Or;
}
var Fr = {}, Tr = {}, Ar = {}, Ao;
function cd() {
  if (Ao) return Ar;
  Ao = 1;
  var e = Ce().default;
  Object.defineProperty(Ar, "__esModule", {
    value: !0
  }), Ar.default = void 0;
  var t = e(Lt()), r = zt(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return Ar.default = n, Ar;
}
var Mr = {}, Mo;
function Fl() {
  if (Mo) return Mr;
  Mo = 1, Object.defineProperty(Mr, "__esModule", {
    value: !0
  }), Mr.default = void 0;
  const e = {
    placeholder: "Select time",
    rangePlaceholder: ["Start time", "End time"]
  };
  return Mr.default = e, Mr;
}
var jo;
function Tl() {
  if (jo) return Tr;
  jo = 1;
  var e = Ce().default;
  Object.defineProperty(Tr, "__esModule", {
    value: !0
  }), Tr.default = void 0;
  var t = e(cd()), r = e(/* @__PURE__ */ Fl());
  const n = {
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
    }, t.default),
    timePickerLocale: Object.assign({}, r.default)
  };
  return Tr.default = n, Tr;
}
var Do;
function dd() {
  if (Do) return Fr;
  Do = 1;
  var e = Ce().default;
  Object.defineProperty(Fr, "__esModule", {
    value: !0
  }), Fr.default = void 0;
  var t = e(/* @__PURE__ */ Tl());
  return Fr.default = t.default, Fr;
}
var ko;
function fd() {
  if (ko) return Pr;
  ko = 1;
  var e = Ce().default;
  Object.defineProperty(Pr, "__esModule", {
    value: !0
  }), Pr.default = void 0;
  var t = e(ud()), r = e(/* @__PURE__ */ dd()), n = e(/* @__PURE__ */ Tl()), a = e(/* @__PURE__ */ Fl());
  const i = "${label} is not a valid ${type}", o = {
    locale: "en",
    Pagination: t.default,
    DatePicker: n.default,
    TimePicker: a.default,
    Calendar: r.default,
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
          string: i,
          method: i,
          array: i,
          object: i,
          number: i,
          date: i,
          boolean: i,
          integer: i,
          float: i,
          regexp: i,
          email: i,
          url: i,
          hex: i
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
  return Pr.default = o, Pr;
}
var vd = /* @__PURE__ */ fd();
const Mg = /* @__PURE__ */ Vt(vd);
var jr = {}, Dr = {}, Io;
function pd() {
  if (Io) return Dr;
  Io = 1, Object.defineProperty(Dr, "__esModule", {
    value: !0
  }), Dr.default = void 0;
  var e = {
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
  return Dr.default = e, Dr;
}
var kr = {}, Ir = {}, Nr = {}, No;
function hd() {
  if (No) return Nr;
  No = 1;
  var e = Ce().default;
  Object.defineProperty(Nr, "__esModule", {
    value: !0
  }), Nr.default = void 0;
  var t = e(Lt()), r = zt(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return Nr.default = n, Nr;
}
var Vr = {}, Vo;
function Al() {
  if (Vo) return Vr;
  Vo = 1, Object.defineProperty(Vr, "__esModule", {
    value: !0
  }), Vr.default = void 0;
  const e = {
    placeholder: "Zeit auswählen",
    rangePlaceholder: ["Startzeit", "Endzeit"]
  };
  return Vr.default = e, Vr;
}
var Lo;
function Ml() {
  if (Lo) return Ir;
  Lo = 1;
  var e = Ce().default;
  Object.defineProperty(Ir, "__esModule", {
    value: !0
  }), Ir.default = void 0;
  var t = e(hd()), r = e(/* @__PURE__ */ Al());
  const n = {
    lang: Object.assign({
      placeholder: "Datum auswählen",
      rangePlaceholder: ["Startdatum", "Enddatum"],
      shortWeekDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      shortMonths: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
    }, t.default),
    timePickerLocale: Object.assign({}, r.default)
  };
  return Ir.default = n, Ir;
}
var zo;
function md() {
  if (zo) return kr;
  zo = 1;
  var e = Ce().default;
  Object.defineProperty(kr, "__esModule", {
    value: !0
  }), kr.default = void 0;
  var t = e(/* @__PURE__ */ Ml());
  return kr.default = t.default, kr;
}
var Ho;
function gd() {
  if (Ho) return jr;
  Ho = 1;
  var e = Ce().default;
  Object.defineProperty(jr, "__esModule", {
    value: !0
  }), jr.default = void 0;
  var t = e(pd()), r = e(/* @__PURE__ */ md()), n = e(/* @__PURE__ */ Ml()), a = e(/* @__PURE__ */ Al());
  const i = "${label} ist nicht gültig. ${type} erwartet", o = {
    locale: "de",
    Pagination: t.default,
    DatePicker: n.default,
    TimePicker: a.default,
    Calendar: r.default,
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
          string: i,
          method: i,
          array: i,
          object: i,
          number: i,
          date: i,
          boolean: i,
          integer: i,
          float: i,
          regexp: i,
          email: i,
          url: i,
          hex: i
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
  return jr.default = o, jr;
}
var bd = /* @__PURE__ */ gd();
const jg = /* @__PURE__ */ Vt(bd);
var Lr = {}, zr = {}, qo;
function yd() {
  if (qo) return zr;
  qo = 1, Object.defineProperty(zr, "__esModule", {
    value: !0
  }), zr.default = void 0;
  var e = {
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
  return zr.default = e, zr;
}
var Hr = {}, qr = {}, Br = {}, Bo;
function Sd() {
  if (Bo) return Br;
  Bo = 1;
  var e = Ce().default;
  Object.defineProperty(Br, "__esModule", {
    value: !0
  }), Br.default = void 0;
  var t = e(Lt()), r = zt(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return Br.default = n, Br;
}
var Wr = {}, Wo;
function jl() {
  if (Wo) return Wr;
  Wo = 1, Object.defineProperty(Wr, "__esModule", {
    value: !0
  }), Wr.default = void 0;
  const e = {
    placeholder: "Seleccionar hora"
  };
  return Wr.default = e, Wr;
}
var Uo;
function Dl() {
  if (Uo) return qr;
  Uo = 1;
  var e = Ce().default;
  Object.defineProperty(qr, "__esModule", {
    value: !0
  }), qr.default = void 0;
  var t = e(Sd()), r = e(/* @__PURE__ */ jl());
  const n = {
    lang: Object.assign({
      placeholder: "Seleccionar fecha",
      rangePlaceholder: ["Fecha inicial", "Fecha final"],
      shortWeekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      shortMonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    }, t.default),
    timePickerLocale: Object.assign({}, r.default)
  };
  return qr.default = n, qr;
}
var Yo;
function xd() {
  if (Yo) return Hr;
  Yo = 1;
  var e = Ce().default;
  Object.defineProperty(Hr, "__esModule", {
    value: !0
  }), Hr.default = void 0;
  var t = e(/* @__PURE__ */ Dl());
  return Hr.default = t.default, Hr;
}
var Go;
function Ed() {
  if (Go) return Lr;
  Go = 1;
  var e = Ce().default;
  Object.defineProperty(Lr, "__esModule", {
    value: !0
  }), Lr.default = void 0;
  var t = e(yd()), r = e(/* @__PURE__ */ xd()), n = e(/* @__PURE__ */ Dl()), a = e(/* @__PURE__ */ jl());
  const i = "${label} no es un ${type} válido", o = {
    locale: "es",
    Pagination: t.default,
    DatePicker: n.default,
    TimePicker: a.default,
    Calendar: r.default,
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
          string: i,
          method: i,
          array: i,
          object: i,
          number: i,
          date: i,
          boolean: i,
          integer: i,
          float: i,
          regexp: i,
          email: i,
          url: i,
          hex: i
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
  return Lr.default = o, Lr;
}
var Cd = /* @__PURE__ */ Ed();
const Dg = /* @__PURE__ */ Vt(Cd);
var Ur = {}, Yr = {}, Ko;
function _d() {
  if (Ko) return Yr;
  Ko = 1, Object.defineProperty(Yr, "__esModule", {
    value: !0
  }), Yr.default = void 0;
  var e = {
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
  return Yr.default = e, Yr;
}
var Gr = {}, Kr = {}, Xr = {}, Xo;
function $d() {
  if (Xo) return Xr;
  Xo = 1;
  var e = Ce().default;
  Object.defineProperty(Xr, "__esModule", {
    value: !0
  }), Xr.default = void 0;
  var t = e(Lt()), r = zt(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return Xr.default = n, Xr;
}
var Zr = {}, Zo;
function kl() {
  if (Zo) return Zr;
  Zo = 1, Object.defineProperty(Zr, "__esModule", {
    value: !0
  }), Zr.default = void 0;
  const e = {
    placeholder: "Sélectionner l'heure",
    rangePlaceholder: ["Heure de début", "Heure de fin"]
  };
  return Zr.default = e, Zr;
}
var Jo;
function Il() {
  if (Jo) return Kr;
  Jo = 1;
  var e = Ce().default;
  Object.defineProperty(Kr, "__esModule", {
    value: !0
  }), Kr.default = void 0;
  var t = e($d()), r = e(/* @__PURE__ */ kl());
  const n = {
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
    }, t.default),
    timePickerLocale: Object.assign({}, r.default)
  };
  return Kr.default = n, Kr;
}
var Qo;
function wd() {
  if (Qo) return Gr;
  Qo = 1;
  var e = Ce().default;
  Object.defineProperty(Gr, "__esModule", {
    value: !0
  }), Gr.default = void 0;
  var t = e(/* @__PURE__ */ Il());
  return Gr.default = t.default, Gr;
}
var es;
function Rd() {
  if (es) return Ur;
  es = 1;
  var e = Ce().default;
  Object.defineProperty(Ur, "__esModule", {
    value: !0
  }), Ur.default = void 0;
  var t = e(_d()), r = e(/* @__PURE__ */ wd()), n = e(/* @__PURE__ */ Il()), a = e(/* @__PURE__ */ kl());
  const i = "La valeur du champ ${label} n'est pas valide pour le type ${type}", o = {
    locale: "fr",
    Pagination: t.default,
    DatePicker: n.default,
    TimePicker: a.default,
    Calendar: r.default,
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
          string: i,
          method: i,
          array: i,
          object: i,
          number: i,
          date: i,
          boolean: i,
          integer: i,
          float: i,
          regexp: i,
          email: i,
          url: i,
          hex: i
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
  return Ur.default = o, Ur;
}
var Pd = /* @__PURE__ */ Rd();
const kg = /* @__PURE__ */ Vt(Pd);
var Jr = {}, Qr = {}, ts;
function Od() {
  if (ts) return Qr;
  ts = 1, Object.defineProperty(Qr, "__esModule", {
    value: !0
  }), Qr.default = void 0;
  var e = {
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
  return Qr.default = e, Qr;
}
var en = {}, tn = {}, rn = {}, rs;
function Fd() {
  if (rs) return rn;
  rs = 1;
  var e = Ce().default;
  Object.defineProperty(rn, "__esModule", {
    value: !0
  }), rn.default = void 0;
  var t = e(Lt()), r = zt(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return rn.default = n, rn;
}
var nn = {}, ns;
function Nl() {
  if (ns) return nn;
  ns = 1, Object.defineProperty(nn, "__esModule", {
    value: !0
  }), nn.default = void 0;
  const e = {
    placeholder: "اختيار الوقت"
  };
  return nn.default = e, nn;
}
var as;
function Vl() {
  if (as) return tn;
  as = 1;
  var e = Ce().default;
  Object.defineProperty(tn, "__esModule", {
    value: !0
  }), tn.default = void 0;
  var t = e(Fd()), r = e(/* @__PURE__ */ Nl());
  const n = {
    lang: Object.assign({
      placeholder: "اختيار التاريخ",
      rangePlaceholder: ["البداية", "النهاية"],
      yearFormat: "YYYY",
      monthFormat: "MMMM",
      monthBeforeYear: !0,
      shortWeekDays: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      shortMonths: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
    }, t.default),
    timePickerLocale: Object.assign({}, r.default)
  };
  return tn.default = n, tn;
}
var is;
function Td() {
  if (is) return en;
  is = 1;
  var e = Ce().default;
  Object.defineProperty(en, "__esModule", {
    value: !0
  }), en.default = void 0;
  var t = e(/* @__PURE__ */ Vl());
  return en.default = t.default, en;
}
var os;
function Ad() {
  if (os) return Jr;
  os = 1;
  var e = Ce().default;
  Object.defineProperty(Jr, "__esModule", {
    value: !0
  }), Jr.default = void 0;
  var t = e(Od()), r = e(/* @__PURE__ */ Td()), n = e(/* @__PURE__ */ Vl()), a = e(/* @__PURE__ */ Nl());
  const i = "ليس ${label} من نوع ${type} صالحًا", o = {
    locale: "ar",
    Pagination: t.default,
    DatePicker: n.default,
    TimePicker: a.default,
    Calendar: r.default,
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
          string: i,
          method: i,
          array: i,
          object: i,
          number: i,
          date: i,
          boolean: i,
          integer: i,
          float: i,
          regexp: i,
          email: i,
          url: i,
          hex: i
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
  return Jr.default = o, Jr;
}
var Md = /* @__PURE__ */ Ad();
const Ig = /* @__PURE__ */ Vt(Md);
var an = {}, on = {}, ss;
function jd() {
  if (ss) return on;
  ss = 1, Object.defineProperty(on, "__esModule", {
    value: !0
  }), on.default = void 0;
  var e = {
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
  return on.default = e, on;
}
var sn = {}, ln = {}, un = {}, ls;
function Dd() {
  if (ls) return un;
  ls = 1;
  var e = Ce().default;
  Object.defineProperty(un, "__esModule", {
    value: !0
  }), un.default = void 0;
  var t = e(Lt()), r = zt(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return un.default = n, un;
}
var cn = {}, us;
function Ll() {
  if (us) return cn;
  us = 1, Object.defineProperty(cn, "__esModule", {
    value: !0
  }), cn.default = void 0;
  const e = {
    placeholder: "Välj tid"
  };
  return cn.default = e, cn;
}
var cs;
function zl() {
  if (cs) return ln;
  cs = 1;
  var e = Ce().default;
  Object.defineProperty(ln, "__esModule", {
    value: !0
  }), ln.default = void 0;
  var t = e(Dd()), r = e(/* @__PURE__ */ Ll());
  const n = {
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
    }, t.default),
    timePickerLocale: Object.assign({}, r.default)
  };
  return ln.default = n, ln;
}
var ds;
function kd() {
  if (ds) return sn;
  ds = 1;
  var e = Ce().default;
  Object.defineProperty(sn, "__esModule", {
    value: !0
  }), sn.default = void 0;
  var t = e(/* @__PURE__ */ zl());
  return sn.default = t.default, sn;
}
var fs;
function Id() {
  if (fs) return an;
  fs = 1;
  var e = Ce().default;
  Object.defineProperty(an, "__esModule", {
    value: !0
  }), an.default = void 0;
  var t = e(jd()), r = e(/* @__PURE__ */ kd()), n = e(/* @__PURE__ */ zl()), a = e(/* @__PURE__ */ Ll());
  const i = "${label} är inte en giltig ${type}", o = {
    locale: "sv",
    Pagination: t.default,
    DatePicker: n.default,
    TimePicker: a.default,
    Calendar: r.default,
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
          string: i,
          method: i,
          array: i,
          object: i,
          number: i,
          date: i,
          boolean: i,
          integer: i,
          float: i,
          regexp: i,
          email: i,
          url: i,
          hex: i
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
  return an.default = o, an;
}
var Nd = /* @__PURE__ */ Id();
const Ng = /* @__PURE__ */ Vt(Nd);
var Hl = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, vs = H.createContext && /* @__PURE__ */ H.createContext(Hl), Vd = ["attr", "size", "title"];
function Ld(e, t) {
  if (e == null) return {};
  var r, n, a = zd(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (a[r] = e[r]);
  }
  return a;
}
function zd(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function na() {
  return na = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, na.apply(null, arguments);
}
function ps(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function aa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ps(Object(r), !0).forEach(function(n) {
      Hd(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ps(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Hd(e, t, r) {
  return (t = qd(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function qd(e) {
  var t = Bd(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Bd(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ql(e) {
  return e && e.map((t, r) => /* @__PURE__ */ H.createElement(t.tag, aa({
    key: r
  }, t.attr), ql(t.child)));
}
function ur(e) {
  return (t) => /* @__PURE__ */ H.createElement(Wd, na({
    attr: aa({}, e.attr)
  }, t), ql(e.child));
}
function Wd(e) {
  var t = (r) => {
    var {
      attr: n,
      size: a,
      title: i
    } = e, o = Ld(e, Vd), s = a || r.size || "1em", l;
    return r.className && (l = r.className), e.className && (l = (l ? l + " " : "") + e.className), /* @__PURE__ */ H.createElement("svg", na({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, r.attr, n, o, {
      className: l,
      style: aa(aa({
        color: e.color || r.color
      }, r.style), e.style),
      height: s,
      width: s,
      xmlns: "http://www.w3.org/2000/svg"
    }), i && /* @__PURE__ */ H.createElement("title", null, i), e.children);
  };
  return vs !== void 0 ? /* @__PURE__ */ H.createElement(vs.Consumer, null, (r) => t(r)) : t(Hl);
}
function Vg(e) {
  return ur({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "path", attr: { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }, child: [] }, { tag: "circle", attr: { cx: "12", cy: "7", r: "4" }, child: [] }] })(e);
}
function Lg(e) {
  return ur({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "circle", attr: { cx: "18", cy: "15", r: "3" }, child: [] }, { tag: "circle", attr: { cx: "9", cy: "7", r: "4" }, child: [] }, { tag: "path", attr: { d: "M10 15H6a4 4 0 0 0-4 4v2" }, child: [] }, { tag: "path", attr: { d: "m21.7 16.4-.9-.3" }, child: [] }, { tag: "path", attr: { d: "m15.2 13.9-.9-.3" }, child: [] }, { tag: "path", attr: { d: "m16.6 18.7.3-.9" }, child: [] }, { tag: "path", attr: { d: "m19.1 12.2.3-.9" }, child: [] }, { tag: "path", attr: { d: "m19.6 18.7-.4-1" }, child: [] }, { tag: "path", attr: { d: "m16.8 12.3-.4-1" }, child: [] }, { tag: "path", attr: { d: "m14.3 16.6 1-.4" }, child: [] }, { tag: "path", attr: { d: "m20.7 13.8 1-.4" }, child: [] }] })(e);
}
function zg(e) {
  return ur({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "rect", attr: { width: "18", height: "18", x: "3", y: "3", rx: "2" }, child: [] }, { tag: "path", attr: { d: "M15 3v18" }, child: [] }] })(e);
}
function Hg(e) {
  return ur({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "rect", attr: { width: "18", height: "18", x: "3", y: "3", rx: "2" }, child: [] }, { tag: "path", attr: { d: "M15 14v1" }, child: [] }, { tag: "path", attr: { d: "M15 19v2" }, child: [] }, { tag: "path", attr: { d: "M15 3v2" }, child: [] }, { tag: "path", attr: { d: "M15 9v1" }, child: [] }] })(e);
}
function qg(e) {
  return ur({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "path", attr: { d: "M15 3h6v6" }, child: [] }, { tag: "path", attr: { d: "M10 14 21 3" }, child: [] }, { tag: "path", attr: { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }, child: [] }] })(e);
}
function Bg(e) {
  return ur({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "path", attr: { d: "M12 7v14" }, child: [] }, { tag: "path", attr: { d: "M16 12h2" }, child: [] }, { tag: "path", attr: { d: "M16 8h2" }, child: [] }, { tag: "path", attr: { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" }, child: [] }, { tag: "path", attr: { d: "M6 12h2" }, child: [] }, { tag: "path", attr: { d: "M6 8h2" }, child: [] }] })(e);
}
function Ud(e, t) {
  var r = Object.assign({}, e);
  return Array.isArray(t) && t.forEach(function(n) {
    delete r[n];
  }), r;
}
function Z(e) {
  "@babel/helpers - typeof";
  return Z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Z(e);
}
var Nn = { exports: {} }, be = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hs;
function Yd() {
  if (hs) return be;
  hs = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), g;
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
            case u:
            case c:
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
  return be.ContextConsumer = o, be.ContextProvider = i, be.Element = e, be.ForwardRef = l, be.Fragment = r, be.Lazy = v, be.Memo = d, be.Portal = t, be.Profiler = a, be.StrictMode = n, be.Suspense = u, be.SuspenseList = c, be.isAsyncMode = function() {
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
    return m(f) === u;
  }, be.isSuspenseList = function(f) {
    return m(f) === c;
  }, be.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === r || f === a || f === n || f === u || f === c || f === b || typeof f == "object" && f !== null && (f.$$typeof === v || f.$$typeof === d || f.$$typeof === i || f.$$typeof === o || f.$$typeof === l || f.$$typeof === g || f.getModuleId !== void 0);
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
var ms;
function Gd() {
  return ms || (ms = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), g = !1, m = !1, f = !1, x = !1, h = !1, _;
    _ = Symbol.for("react.module.reference");
    function R(L) {
      return !!(typeof L == "string" || typeof L == "function" || L === r || L === a || h || L === n || L === u || L === c || x || L === b || g || m || f || typeof L == "object" && L !== null && (L.$$typeof === v || L.$$typeof === d || L.$$typeof === i || L.$$typeof === o || L.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      L.$$typeof === _ || L.getModuleId !== void 0));
    }
    function E(L) {
      if (typeof L == "object" && L !== null) {
        var _e = L.$$typeof;
        switch (_e) {
          case e:
            var Y = L.type;
            switch (Y) {
              case r:
              case a:
              case n:
              case u:
              case c:
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
                    return _e;
                }
            }
          case t:
            return _e;
        }
      }
    }
    var $ = o, y = i, w = e, P = l, F = r, j = v, D = d, T = t, A = a, k = n, I = u, V = c, z = !1, J = !1;
    function X(L) {
      return z || (z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function Q(L) {
      return J || (J = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(L) {
      return E(L) === o;
    }
    function B(L) {
      return E(L) === i;
    }
    function U(L) {
      return typeof L == "object" && L !== null && L.$$typeof === e;
    }
    function de(L) {
      return E(L) === l;
    }
    function ie(L) {
      return E(L) === r;
    }
    function ve(L) {
      return E(L) === v;
    }
    function le(L) {
      return E(L) === d;
    }
    function fe(L) {
      return E(L) === t;
    }
    function ue(L) {
      return E(L) === a;
    }
    function we(L) {
      return E(L) === n;
    }
    function Re(L) {
      return E(L) === u;
    }
    function ke(L) {
      return E(L) === c;
    }
    ye.ContextConsumer = $, ye.ContextProvider = y, ye.Element = w, ye.ForwardRef = P, ye.Fragment = F, ye.Lazy = j, ye.Memo = D, ye.Portal = T, ye.Profiler = A, ye.StrictMode = k, ye.Suspense = I, ye.SuspenseList = V, ye.isAsyncMode = X, ye.isConcurrentMode = Q, ye.isContextConsumer = W, ye.isContextProvider = B, ye.isElement = U, ye.isForwardRef = de, ye.isFragment = ie, ye.isLazy = ve, ye.isMemo = le, ye.isPortal = fe, ye.isProfiler = ue, ye.isStrictMode = we, ye.isSuspense = Re, ye.isSuspenseList = ke, ye.isValidElementType = R, ye.typeOf = E;
  })()), ye;
}
var gs;
function Kd() {
  return gs || (gs = 1, process.env.NODE_ENV === "production" ? Nn.exports = Yd() : Nn.exports = Gd()), Nn.exports;
}
var Aa = Kd();
function Ui(e, t, r) {
  var n = S.useRef({});
  return (!("value" in n.current) || r(n.current.condition, t)) && (n.current.value = e(), n.current.condition = t), n.current.value;
}
var Xd = Symbol.for("react.element"), Zd = Symbol.for("react.transitional.element"), Jd = Symbol.for("react.fragment");
function Bl(e) {
  return (
    // Base object type
    e && Z(e) === "object" && // React Element type
    (e.$$typeof === Xd || e.$$typeof === Zd) && // React Fragment type
    e.type === Jd
  );
}
var Qd = Number(Gc.split(".")[0]), Wl = function(t, r) {
  typeof t == "function" ? t(r) : Z(t) === "object" && t && "current" in t && (t.current = r);
}, Ul = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var a = r.filter(Boolean);
  return a.length <= 1 ? a[0] : function(i) {
    r.forEach(function(o) {
      Wl(o, i);
    });
  };
}, ef = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  return Ui(function() {
    return Ul.apply(void 0, r);
  }, r, function(a, i) {
    return a.length !== i.length || a.every(function(o, s) {
      return o !== i[s];
    });
  });
}, Yl = function(t) {
  var r, n;
  if (!t)
    return !1;
  if (Gl(t) && Qd >= 19)
    return !0;
  var a = Aa.isMemo(t) ? t.type.type : t.type;
  return !(typeof a == "function" && !((r = a.prototype) !== null && r !== void 0 && r.render) && a.$$typeof !== Aa.ForwardRef || typeof t == "function" && !((n = t.prototype) !== null && n !== void 0 && n.render) && t.$$typeof !== Aa.ForwardRef);
};
function Gl(e) {
  return /* @__PURE__ */ Yc(e) && !Bl(e);
}
var Kl = function(t) {
  if (t && Gl(t)) {
    var r = t;
    return r.props.propertyIsEnumerable("ref") ? r.props.ref : r.ref;
  }
  return null;
}, Za = {}, Yi = [], tf = function(t) {
  Yi.push(t);
};
function bn(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = Yi.reduce(function(n, a) {
      return a(n ?? "", "warning");
    }, t);
    r && console.error("Warning: ".concat(r));
  }
}
function rf(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = Yi.reduce(function(n, a) {
      return a(n ?? "", "note");
    }, t);
    r && console.warn("Note: ".concat(r));
  }
}
function Xl() {
  Za = {};
}
function Zl(e, t, r) {
  !t && !Za[r] && (e(!1, r), Za[r] = !0);
}
function Ae(e, t) {
  Zl(bn, e, t);
}
function nf(e, t) {
  Zl(rf, e, t);
}
Ae.preMessage = tf;
Ae.resetWarned = Xl;
Ae.noteOnce = nf;
function Jl() {
}
let yt = null;
function af() {
  yt = null, Xl();
}
let Gi = Jl;
process.env.NODE_ENV !== "production" && (Gi = (e, t, r) => {
  Ae(e, `[antd: ${t}] ${r}`), process.env.NODE_ENV === "test" && af();
});
const Ql = /* @__PURE__ */ S.createContext({}), Nt = process.env.NODE_ENV !== "production" ? (e) => {
  const {
    strict: t
  } = S.useContext(Ql), r = (n, a, i) => {
    if (!n)
      if (t === !1 && a === "deprecated") {
        const o = yt;
        yt || (yt = {}), yt[e] = yt[e] || [], yt[e].includes(i || "") || yt[e].push(i || ""), o || console.warn("[antd] There exists deprecated usage in your code:", yt);
      } else
        process.env.NODE_ENV !== "production" && Gi(n, e, i);
  };
  return r.deprecated = (n, a, i, o) => {
    r(n, "deprecated", `\`${a}\` is deprecated. Please use \`${i}\` instead.${o ? ` ${o}` : ""}`);
  }, r;
} : () => {
  const e = () => {
  };
  return e.deprecated = Jl, e;
}, pa = Gi;
function eu(e) {
  if (Array.isArray(e)) return e;
}
function of(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, s = [], l = !0, u = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        l = !1;
      } else for (; !(l = (n = i.call(r)).done) && (s.push(n.value), s.length !== t); l = !0) ;
    } catch (c) {
      u = !0, a = c;
    } finally {
      try {
        if (!l && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (u) throw a;
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
function Ki(e, t) {
  if (e) {
    if (typeof e == "string") return Ja(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Ja(e, t) : void 0;
  }
}
function tu() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function q(e, t) {
  return eu(e) || of(e, t) || Ki(e, t) || tu();
}
function sf(e, t) {
  if (Z(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Z(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ru(e) {
  var t = sf(e, "string");
  return Z(t) == "symbol" ? t : t + "";
}
function C(e, t, r) {
  return (t = ru(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function lf(e) {
  if (Array.isArray(e)) return Ja(e);
}
function nu(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function uf() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function K(e) {
  return lf(e) || nu(e) || Ki(e) || uf();
}
function bs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function O(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bs(Object(r), !0).forEach(function(n) {
      C(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : bs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function yn(e) {
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
function Et() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function cf(e, t) {
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
var ys = "data-rc-order", Ss = "data-rc-priority", df = "rc-util-key", Qa = /* @__PURE__ */ new Map();
function au() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.mark;
  return t ? t.startsWith("data-") ? t : "data-".concat(t) : df;
}
function ha(e) {
  if (e.attachTo)
    return e.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function ff(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function Xi(e) {
  return Array.from((Qa.get(e) || e).children).filter(function(t) {
    return t.tagName === "STYLE";
  });
}
function iu(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Et())
    return null;
  var r = t.csp, n = t.prepend, a = t.priority, i = a === void 0 ? 0 : a, o = ff(n), s = o === "prependQueue", l = document.createElement("style");
  l.setAttribute(ys, o), s && i && l.setAttribute(Ss, "".concat(i)), r != null && r.nonce && (l.nonce = r == null ? void 0 : r.nonce), l.innerHTML = e;
  var u = ha(t), c = u.firstChild;
  if (n) {
    if (s) {
      var d = (t.styles || Xi(u)).filter(function(v) {
        if (!["prepend", "prependQueue"].includes(v.getAttribute(ys)))
          return !1;
        var b = Number(v.getAttribute(Ss) || 0);
        return i >= b;
      });
      if (d.length)
        return u.insertBefore(l, d[d.length - 1].nextSibling), l;
    }
    u.insertBefore(l, c);
  } else
    u.appendChild(l);
  return l;
}
function ou(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = ha(t);
  return (t.styles || Xi(r)).find(function(n) {
    return n.getAttribute(au(t)) === e;
  });
}
function su(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = ou(e, t);
  if (r) {
    var n = ha(t);
    n.removeChild(r);
  }
}
function vf(e, t) {
  var r = Qa.get(e);
  if (!r || !cf(document, r)) {
    var n = iu("", t), a = n.parentNode;
    Qa.set(e, a), e.removeChild(n);
  }
}
function kt(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = ha(r), a = Xi(n), i = O(O({}, r), {}, {
    styles: a
  });
  vf(n, i);
  var o = ou(t, i);
  if (o) {
    var s, l;
    if ((s = i.csp) !== null && s !== void 0 && s.nonce && o.nonce !== ((l = i.csp) === null || l === void 0 ? void 0 : l.nonce)) {
      var u;
      o.nonce = (u = i.csp) === null || u === void 0 ? void 0 : u.nonce;
    }
    return o.innerHTML !== e && (o.innerHTML = e), o;
  }
  var c = iu(e, i);
  return c.setAttribute(au(i), t), c;
}
function pf(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function lt(e, t) {
  if (e == null) return {};
  var r, n, a = pf(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (a[r] = e[r]);
  }
  return a;
}
function ei(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = /* @__PURE__ */ new Set();
  function a(i, o) {
    var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, l = n.has(i);
    if (Ae(!l, "Warning: There may be circular references"), l)
      return !1;
    if (i === o)
      return !0;
    if (r && s > 1)
      return !1;
    n.add(i);
    var u = s + 1;
    if (Array.isArray(i)) {
      if (!Array.isArray(o) || i.length !== o.length)
        return !1;
      for (var c = 0; c < i.length; c++)
        if (!a(i[c], o[c], u))
          return !1;
      return !0;
    }
    if (i && o && Z(i) === "object" && Z(o) === "object") {
      var d = Object.keys(i);
      return d.length !== Object.keys(o).length ? !1 : d.every(function(v) {
        return a(i[v], o[v], u);
      });
    }
    return !1;
  }
  return a(e, t);
}
function Ue(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function xs(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, ru(n.key), n);
  }
}
function Ye(e, t, r) {
  return t && xs(e.prototype, t), r && xs(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
var hf = "%";
function ti(e) {
  return e.join(hf);
}
var mf = /* @__PURE__ */ (function() {
  function e(t) {
    Ue(this, e), C(this, "instanceId", void 0), C(this, "cache", /* @__PURE__ */ new Map()), this.instanceId = t;
  }
  return Ye(e, [{
    key: "get",
    value: function(r) {
      return this.opGet(ti(r));
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
      return this.opUpdate(ti(r), n);
    }
    /** A fast get cache with `get` concat. */
  }, {
    key: "opUpdate",
    value: function(r, n) {
      var a = this.cache.get(r), i = n(a);
      i === null ? this.cache.delete(r) : this.cache.set(r, i);
    }
  }]), e;
})(), rr = "data-token-hash", pt = "data-css-hash", gf = "data-cache-path", Pt = "__cssinjs_instance__";
function bf() {
  var e = Math.random().toString(12).slice(2);
  if (typeof document < "u" && document.head && document.body) {
    var t = document.body.querySelectorAll("style[".concat(pt, "]")) || [], r = document.head.firstChild;
    Array.from(t).forEach(function(a) {
      a[Pt] = a[Pt] || e, a[Pt] === e && document.head.insertBefore(a, r);
    });
    var n = {};
    Array.from(document.querySelectorAll("style[".concat(pt, "]"))).forEach(function(a) {
      var i = a.getAttribute(pt);
      if (n[i]) {
        if (a[Pt] === e) {
          var o;
          (o = a.parentNode) === null || o === void 0 || o.removeChild(a);
        }
      } else
        n[i] = !0;
    });
  }
  return new mf(e);
}
var Pn = /* @__PURE__ */ S.createContext({
  hashPriority: "low",
  cache: bf(),
  defaultCache: !0
});
function ne(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Sn(e, t) {
  return Sn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, Sn(e, t);
}
function Ht(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Sn(e, t);
}
function xn(e) {
  return xn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, xn(e);
}
function Zi() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Zi = function() {
    return !!e;
  })();
}
function yf(e, t) {
  if (t && (Z(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return ne(e);
}
function qt(e) {
  var t = Zi();
  return function() {
    var r, n = xn(e);
    if (t) {
      var a = xn(this).constructor;
      r = Reflect.construct(n, arguments, a);
    } else r = n.apply(this, arguments);
    return yf(this, r);
  };
}
function Sf(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
var Ji = /* @__PURE__ */ (function() {
  function e() {
    Ue(this, e), C(this, "cache", void 0), C(this, "keys", void 0), C(this, "cacheCallTimes", void 0), this.cache = /* @__PURE__ */ new Map(), this.keys = [], this.cacheCallTimes = 0;
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
          var i = this.keys.reduce(function(u, c) {
            var d = q(u, 2), v = d[1];
            return a.internalGet(c)[1] < v ? [c, a.internalGet(c)[1]] : u;
          }, [this.keys[0], this.cacheCallTimes]), o = q(i, 1), s = o[0];
          this.delete(s);
        }
        this.keys.push(r);
      }
      var l = this.cache;
      r.forEach(function(u, c) {
        if (c === r.length - 1)
          l.set(u, {
            value: [n, a.cacheCallTimes++]
          });
        else {
          var d = l.get(u);
          d ? d.map || (d.map = /* @__PURE__ */ new Map()) : l.set(u, {
            map: /* @__PURE__ */ new Map()
          }), l = l.get(u).map;
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
          return !Sf(n, r);
        }), this.deleteByPath(this.cache, r);
    }
  }]), e;
})();
C(Ji, "MAX_CACHE_SIZE", 20);
C(Ji, "MAX_CACHE_OFFSET", 5);
var Es = 0, lu = /* @__PURE__ */ (function() {
  function e(t) {
    Ue(this, e), C(this, "derivatives", void 0), C(this, "id", void 0), this.derivatives = Array.isArray(t) ? t : [t], this.id = Es, t.length === 0 && bn(t.length > 0, "[Ant Design CSS-in-JS] Theme should have at least one derivative function."), Es += 1;
  }
  return Ye(e, [{
    key: "getDerivativeToken",
    value: function(r) {
      return this.derivatives.reduce(function(n, a) {
        return a(r, n);
      }, void 0);
    }
  }]), e;
})(), Ma = new Ji();
function ri(e) {
  var t = Array.isArray(e) ? e : [e];
  return Ma.has(t) || Ma.set(t, new lu(t)), Ma.get(t);
}
var xf = /* @__PURE__ */ new WeakMap(), ja = {};
function Ef(e, t) {
  for (var r = xf, n = 0; n < t.length; n += 1) {
    var a = t[n];
    r.has(a) || r.set(a, /* @__PURE__ */ new WeakMap()), r = r.get(a);
  }
  return r.has(ja) || r.set(ja, e()), r.get(ja);
}
var Cs = /* @__PURE__ */ new WeakMap();
function hn(e) {
  var t = Cs.get(e) || "";
  return t || (Object.keys(e).forEach(function(r) {
    var n = e[r];
    t += r, n instanceof lu ? t += n.id : n && Z(n) === "object" ? t += hn(n) : t += n;
  }), t = yn(t), Cs.set(e, t)), t;
}
function _s(e, t) {
  return yn("".concat(t, "_").concat(hn(e)));
}
var ni = Et();
function De(e) {
  return typeof e == "number" ? "".concat(e, "px") : e;
}
function ia(e, t, r) {
  var n, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
  if (i)
    return e;
  var o = O(O({}, a), {}, (n = {}, C(n, rr, t), C(n, pt, r), n)), s = Object.keys(o).map(function(l) {
    var u = o[l];
    return u ? "".concat(l, '="').concat(u, '"') : null;
  }).filter(function(l) {
    return l;
  }).join(" ");
  return "<style ".concat(s, ">").concat(e, "</style>");
}
var Xn = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return "--".concat(r ? "".concat(r, "-") : "").concat(t).replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
}, Cf = function(t, r, n) {
  return Object.keys(t).length ? ".".concat(r).concat(n != null && n.scope ? ".".concat(n.scope) : "", "{").concat(Object.entries(t).map(function(a) {
    var i = q(a, 2), o = i[0], s = i[1];
    return "".concat(o, ":").concat(s, ";");
  }).join(""), "}") : "";
}, uu = function(t, r, n) {
  var a = {}, i = {};
  return Object.entries(t).forEach(function(o) {
    var s, l, u = q(o, 2), c = u[0], d = u[1];
    if (n != null && (s = n.preserve) !== null && s !== void 0 && s[c])
      i[c] = d;
    else if ((typeof d == "string" || typeof d == "number") && !(n != null && (l = n.ignore) !== null && l !== void 0 && l[c])) {
      var v, b = Xn(c, n == null ? void 0 : n.prefix);
      a[b] = typeof d == "number" && !(n != null && (v = n.unitless) !== null && v !== void 0 && v[c]) ? "".concat(d, "px") : String(d), i[c] = "var(".concat(b, ")");
    }
  }), [i, Cf(a, r, {
    scope: n == null ? void 0 : n.scope
  })];
}, $s = process.env.NODE_ENV !== "test" && Et() ? S.useLayoutEffect : S.useEffect, oa = function(t, r) {
  var n = S.useRef(!0);
  $s(function() {
    return t(n.current);
  }, r), $s(function() {
    return n.current = !1, function() {
      n.current = !0;
    };
  }, []);
}, ws = function(t, r) {
  oa(function(n) {
    if (!n)
      return t();
  }, r);
}, _f = O({}, S), Rs = _f.useInsertionEffect, $f = function(t, r, n) {
  S.useMemo(t, n), oa(function() {
    return r(!0);
  }, n);
}, wf = Rs ? function(e, t, r) {
  return Rs(function() {
    return e(), t();
  }, r);
} : $f, Rf = O({}, S), Pf = Rf.useInsertionEffect, Of = function(t) {
  var r = [], n = !1;
  function a(i) {
    if (n) {
      process.env.NODE_ENV !== "production" && bn(!1, "[Ant Design CSS-in-JS] You are registering a cleanup function after unmount, which will not have any effect.");
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
}, Ff = function() {
  return function(t) {
    t();
  };
}, Tf = typeof Pf < "u" ? Of : Ff;
function Af() {
  return !1;
}
var ai = !1;
function Mf() {
  return ai;
}
const jf = process.env.NODE_ENV === "production" ? Af : Mf;
if (process.env.NODE_ENV !== "production" && typeof module < "u" && module && module.hot && typeof window < "u") {
  var Vn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : null;
  if (Vn && typeof Vn.webpackHotUpdate == "function") {
    var Df = Vn.webpackHotUpdate;
    Vn.webpackHotUpdate = function() {
      return ai = !0, setTimeout(function() {
        ai = !1;
      }, 0), Df.apply(void 0, arguments);
    };
  }
}
function Qi(e, t, r, n, a) {
  var i = S.useContext(Pn), o = i.cache, s = [e].concat(K(t)), l = ti(s), u = Tf([l]), c = jf(), d = function(m) {
    o.opUpdate(l, function(f) {
      var x = f || [void 0, void 0], h = q(x, 2), _ = h[0], R = _ === void 0 ? 0 : _, E = h[1], $ = E;
      process.env.NODE_ENV !== "production" && E && c && (n == null || n($, c), $ = null);
      var y = $ || r(), w = [R, y];
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
  return wf(function() {
    a == null || a(b);
  }, function(g) {
    return d(function(m) {
      var f = q(m, 2), x = f[0], h = f[1];
      return g && x === 0 && (a == null || a(b)), [x + 1, h];
    }), function() {
      o.opUpdate(l, function(m) {
        var f = m || [], x = q(f, 2), h = x[0], _ = h === void 0 ? 0 : h, R = x[1], E = _ - 1;
        return E === 0 ? (u(function() {
          (g || !o.opGet(l)) && (n == null || n(R, !1));
        }), null) : [_ - 1, R];
      });
    };
  }, [l]), b;
}
var kf = {}, If = process.env.NODE_ENV !== "production" ? "css-dev-only-do-not-override" : "css", jt = /* @__PURE__ */ new Map();
function Nf(e) {
  jt.set(e, (jt.get(e) || 0) + 1);
}
function Vf(e, t) {
  if (typeof document < "u") {
    var r = document.querySelectorAll("style[".concat(rr, '="').concat(e, '"]'));
    r.forEach(function(n) {
      if (n[Pt] === t) {
        var a;
        (a = n.parentNode) === null || a === void 0 || a.removeChild(n);
      }
    });
  }
}
var Lf = 0;
function zf(e, t) {
  jt.set(e, (jt.get(e) || 0) - 1);
  var r = Array.from(jt.keys()), n = r.filter(function(a) {
    var i = jt.get(a) || 0;
    return i <= 0;
  });
  r.length - n.length > Lf && n.forEach(function(a) {
    Vf(a, t), jt.delete(a);
  });
}
var Hf = function(t, r, n, a) {
  var i = n.getDerivativeToken(t), o = O(O({}, i), r);
  return a && (o = a(o)), o;
}, cu = "token";
function qf(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = xt(Pn), a = n.cache.instanceId, i = n.container, o = r.salt, s = o === void 0 ? "" : o, l = r.override, u = l === void 0 ? kf : l, c = r.formatToken, d = r.getComputedToken, v = r.cssVar, b = Ef(function() {
    return Object.assign.apply(Object, [{}].concat(K(t)));
  }, t), g = hn(b), m = hn(u), f = v ? hn(v) : "", x = Qi(cu, [s, e.id, g, m, f], function() {
    var h, _ = d ? d(b, u, e) : Hf(b, u, e, c), R = O({}, _), E = "";
    if (v) {
      var $ = uu(_, v.key, {
        prefix: v.prefix,
        ignore: v.ignore,
        unitless: v.unitless,
        preserve: v.preserve
      }), y = q($, 2);
      _ = y[0], E = y[1];
    }
    var w = _s(_, s);
    _._tokenKey = w, R._tokenKey = _s(R, s);
    var P = (h = v == null ? void 0 : v.key) !== null && h !== void 0 ? h : w;
    _._themeKey = P, Nf(P);
    var F = "".concat(If, "-").concat(yn(w));
    return _._hashId = F, [_, F, R, E, (v == null ? void 0 : v.key) || ""];
  }, function(h) {
    zf(h[0]._themeKey, a);
  }, function(h) {
    var _ = q(h, 4), R = _[0], E = _[3];
    if (v && E) {
      var $ = kt(E, yn("css-variables-".concat(R._themeKey)), {
        mark: pt,
        prepend: "queue",
        attachTo: i,
        priority: -999
      });
      $[Pt] = a, $.setAttribute(rr, R._themeKey);
    }
  });
  return x;
}
var Bf = function(t, r, n) {
  var a = q(t, 5), i = a[2], o = a[3], s = a[4], l = n || {}, u = l.plain;
  if (!o)
    return null;
  var c = i._tokenKey, d = -999, v = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(d)
  }, b = ia(o, s, c, v, u);
  return [d, c, b];
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
var Wf = {
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
}, du = "comm", fu = "rule", vu = "decl", Uf = "@import", Yf = "@namespace", Gf = "@keyframes", Kf = "@layer", pu = Math.abs, eo = String.fromCharCode;
function hu(e) {
  return e.trim();
}
function Zn(e, t, r) {
  return e.replace(t, r);
}
function Xf(e, t, r) {
  return e.indexOf(t, r);
}
function er(e, t) {
  return e.charCodeAt(t) | 0;
}
function nr(e, t, r) {
  return e.slice(t, r);
}
function gt(e) {
  return e.length;
}
function Zf(e) {
  return e.length;
}
function Ln(e, t) {
  return t.push(e), e;
}
var ma = 1, ar = 1, mu = 0, ut = 0, Ve = 0, cr = "";
function to(e, t, r, n, a, i, o, s) {
  return { value: e, root: t, parent: r, type: n, props: a, children: i, line: ma, column: ar, length: o, return: "", siblings: s };
}
function Jf() {
  return Ve;
}
function Qf() {
  return Ve = ut > 0 ? er(cr, --ut) : 0, ar--, Ve === 10 && (ar = 1, ma--), Ve;
}
function ht() {
  return Ve = ut < mu ? er(cr, ut++) : 0, ar++, Ve === 10 && (ar = 1, ma++), Ve;
}
function Ot() {
  return er(cr, ut);
}
function Jn() {
  return ut;
}
function ga(e, t) {
  return nr(cr, e, t);
}
function En(e) {
  switch (e) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function ev(e) {
  return ma = ar = 1, mu = gt(cr = e), ut = 0, [];
}
function tv(e) {
  return cr = "", e;
}
function Da(e) {
  return hu(ga(ut - 1, ii(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function rv(e) {
  for (; (Ve = Ot()) && Ve < 33; )
    ht();
  return En(e) > 2 || En(Ve) > 3 ? "" : " ";
}
function nv(e, t) {
  for (; --t && ht() && !(Ve < 48 || Ve > 102 || Ve > 57 && Ve < 65 || Ve > 70 && Ve < 97); )
    ;
  return ga(e, Jn() + (t < 6 && Ot() == 32 && ht() == 32));
}
function ii(e) {
  for (; ht(); )
    switch (Ve) {
      // ] ) " '
      case e:
        return ut;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && ii(Ve);
        break;
      // (
      case 40:
        e === 41 && ii(e);
        break;
      // \
      case 92:
        ht();
        break;
    }
  return ut;
}
function av(e, t) {
  for (; ht() && e + Ve !== 57; )
    if (e + Ve === 84 && Ot() === 47)
      break;
  return "/*" + ga(t, ut - 1) + "*" + eo(e === 47 ? e : ht());
}
function iv(e) {
  for (; !En(Ot()); )
    ht();
  return ga(e, ut);
}
function ov(e) {
  return tv(Qn("", null, null, null, [""], e = ev(e), 0, [0], e));
}
function Qn(e, t, r, n, a, i, o, s, l) {
  for (var u = 0, c = 0, d = o, v = 0, b = 0, g = 0, m = 1, f = 1, x = 1, h = 0, _ = "", R = a, E = i, $ = n, y = _; f; )
    switch (g = h, h = ht()) {
      // (
      case 40:
        if (g != 108 && er(y, d - 1) == 58) {
          Xf(y += Zn(Da(h), "&", "&\f"), "&\f", pu(u ? s[u - 1] : 0)) != -1 && (x = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        y += Da(h);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        y += rv(g);
        break;
      // \
      case 92:
        y += nv(Jn() - 1, 7);
        continue;
      // /
      case 47:
        switch (Ot()) {
          case 42:
          case 47:
            Ln(sv(av(ht(), Jn()), t, r, l), l), (En(g || 1) == 5 || En(Ot() || 1) == 5) && gt(y) && nr(y, -1, void 0) !== " " && (y += " ");
            break;
          default:
            y += "/";
        }
        break;
      // {
      case 123 * m:
        s[u++] = gt(y) * x;
      // } ; \0
      case 125 * m:
      case 59:
      case 0:
        switch (h) {
          // \0 }
          case 0:
          case 125:
            f = 0;
          // ;
          case 59 + c:
            x == -1 && (y = Zn(y, /\f/g, "")), b > 0 && (gt(y) - d || m === 0 && g === 47) && Ln(b > 32 ? Os(y + ";", n, r, d - 1, l) : Os(Zn(y, " ", "") + ";", n, r, d - 2, l), l);
            break;
          // @ ;
          case 59:
            y += ";";
          // { rule/at-rule
          default:
            if (Ln($ = Ps(y, t, r, u, c, a, s, _, R = [], E = [], d, i), i), h === 123)
              if (c === 0)
                Qn(y, t, $, $, R, i, d, s, E);
              else {
                switch (v) {
                  // c(ontainer)
                  case 99:
                    if (er(y, 3) === 110) break;
                  // l(ayer)
                  case 108:
                    if (er(y, 2) === 97) break;
                  default:
                    c = 0;
                  // d(ocument) m(edia) s(upports)
                  case 100:
                  case 109:
                  case 115:
                }
                c ? Qn(e, $, $, n && Ln(Ps(e, $, $, 0, 0, a, s, _, a, R = [], d, E), E), a, E, d, s, n ? R : E) : Qn(y, $, $, $, [""], E, 0, s, E);
              }
        }
        u = c = b = 0, m = x = 1, _ = y = "", d = o;
        break;
      // :
      case 58:
        d = 1 + gt(y), b = g;
      default:
        if (m < 1) {
          if (h == 123)
            --m;
          else if (h == 125 && m++ == 0 && Qf() == 125)
            continue;
        }
        switch (y += eo(h), h * m) {
          // &
          case 38:
            x = c > 0 ? 1 : (y += "\f", -1);
            break;
          // ,
          case 44:
            s[u++] = (gt(y) - 1) * x, x = 1;
            break;
          // @
          case 64:
            Ot() === 45 && (y += Da(ht())), v = Ot(), c = d = gt(_ = y += iv(Jn())), h++;
            break;
          // -
          case 45:
            g === 45 && gt(y) == 2 && (m = 0);
        }
    }
  return i;
}
function Ps(e, t, r, n, a, i, o, s, l, u, c, d) {
  for (var v = a - 1, b = a === 0 ? i : [""], g = Zf(b), m = 0, f = 0, x = 0; m < n; ++m)
    for (var h = 0, _ = nr(e, v + 1, v = pu(f = o[m])), R = e; h < g; ++h)
      (R = hu(f > 0 ? b[h] + " " + _ : Zn(_, /&\f/g, b[h]))) && (l[x++] = R);
  return to(e, t, r, a === 0 ? fu : s, l, u, c, d);
}
function sv(e, t, r, n) {
  return to(e, t, r, du, eo(Jf()), nr(e, 2, -2), 0, n);
}
function Os(e, t, r, n, a) {
  return to(e, t, r, vu, nr(e, 0, n), nr(e, n + 1, -1), n, a);
}
function oi(e, t) {
  for (var r = "", n = 0; n < e.length; n++)
    r += t(e[n], n, e, t) || "";
  return r;
}
function lv(e, t, r, n) {
  switch (e.type) {
    case Kf:
      if (e.children.length) break;
    case Uf:
    case Yf:
    case vu:
      return e.return = e.return || e.value;
    case du:
      return "";
    case Gf:
      return e.return = e.value + "{" + oi(e.children, n) + "}";
    case fu:
      if (!gt(e.value = e.props.join(","))) return "";
  }
  return gt(r = oi(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function gu(e, t) {
  var r = t.path, n = t.parentSelectors;
  Ae(!1, "[Ant Design CSS-in-JS] ".concat(r ? "Error in ".concat(r, ": ") : "").concat(e).concat(n.length ? " Selector: ".concat(n.join(" | ")) : ""));
}
var uv = function(t, r, n) {
  if (t === "content") {
    var a = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, i = ["normal", "none", "initial", "inherit", "unset"];
    (typeof r != "string" || i.indexOf(r) === -1 && !a.test(r) && (r.charAt(0) !== r.charAt(r.length - 1) || r.charAt(0) !== '"' && r.charAt(0) !== "'")) && gu("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"".concat(r, "\"'`."), n);
  }
}, cv = function(t, r, n) {
  t === "animation" && n.hashId && r !== "none" && gu("You seem to be using hashed animation '".concat(r, "', in which case 'animationName' with Keyframe as value is recommended."), n);
}, Fs = "data-ant-cssinjs-cache-path", bu = "_FILE_STYLE__", It, yu = !0;
function dv() {
  if (!It && (It = {}, Et())) {
    var e = document.createElement("div");
    e.className = Fs, e.style.position = "fixed", e.style.visibility = "hidden", e.style.top = "-9999px", document.body.appendChild(e);
    var t = getComputedStyle(e).content || "";
    t = t.replace(/^"/, "").replace(/"$/, ""), t.split(";").forEach(function(a) {
      var i = a.split(":"), o = q(i, 2), s = o[0], l = o[1];
      It[s] = l;
    });
    var r = document.querySelector("style[".concat(Fs, "]"));
    if (r) {
      var n;
      yu = !1, (n = r.parentNode) === null || n === void 0 || n.removeChild(r);
    }
    document.body.removeChild(e);
  }
}
function fv(e) {
  return dv(), !!It[e];
}
function vv(e) {
  var t = It[e], r = null;
  if (t && Et())
    if (yu)
      r = bu;
    else {
      var n = document.querySelector("style[".concat(pt, '="').concat(It[e], '"]'));
      n ? r = n.innerHTML : delete It[e];
    }
  return [r, t];
}
var Su = "_skip_check_", xu = "_multi_value_";
function ea(e) {
  var t = oi(ov(e), lv);
  return t.replace(/\{%%%\:[^;];}/g, ";");
}
function pv(e) {
  return Z(e) === "object" && e && (Su in e || xu in e);
}
function Ts(e, t, r) {
  if (!t)
    return e;
  var n = ".".concat(t), a = r === "low" ? ":where(".concat(n, ")") : n, i = e.split(",").map(function(o) {
    var s, l = o.trim().split(/\s+/), u = l[0] || "", c = ((s = u.match(/^\w+/)) === null || s === void 0 ? void 0 : s[0]) || "";
    return u = "".concat(c).concat(a).concat(u.slice(c.length)), [u].concat(K(l.slice(1))).join(" ");
  });
  return i.join(",");
}
var hv = function e(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    root: !0,
    parentSelectors: []
  }, a = n.root, i = n.injectHash, o = n.parentSelectors, s = r.hashId, l = r.layer, u = r.path, c = r.hashPriority, d = r.transformers, v = d === void 0 ? [] : d, b = r.linters, g = b === void 0 ? [] : b, m = "", f = {};
  function x(R) {
    var E = R.getName(s);
    if (!f[E]) {
      var $ = e(R.style, r, {
        root: !1,
        parentSelectors: o
      }), y = q($, 1), w = y[0];
      f[E] = "@keyframes ".concat(R.getName(s)).concat(w);
    }
  }
  function h(R) {
    var E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    return R.forEach(function($) {
      Array.isArray($) ? h($, E) : $ && E.push($);
    }), E;
  }
  var _ = h(Array.isArray(t) ? t : [t]);
  return _.forEach(function(R) {
    var E = typeof R == "string" && !a ? {} : R;
    if (typeof E == "string")
      m += "".concat(E, `
`);
    else if (E._keyframe)
      x(E);
    else {
      var $ = v.reduce(function(y, w) {
        var P;
        return (w == null || (P = w.visit) === null || P === void 0 ? void 0 : P.call(w, y)) || y;
      }, E);
      Object.keys($).forEach(function(y) {
        var w = $[y];
        if (Z(w) === "object" && w && (y !== "animationName" || !w._keyframe) && !pv(w)) {
          var P = !1, F = y.trim(), j = !1;
          (a || i) && s ? F.startsWith("@") ? P = !0 : F === "&" ? F = Ts("", s, c) : F = Ts(y, s, c) : a && !s && (F === "&" || F === "") && (F = "", j = !0);
          var D = e(w, r, {
            root: j,
            injectHash: P,
            parentSelectors: [].concat(K(o), [F])
          }), T = q(D, 2), A = T[0], k = T[1];
          f = O(O({}, f), k), m += "".concat(F).concat(A);
        } else {
          let z = function(J, X) {
            process.env.NODE_ENV !== "production" && (Z(w) !== "object" || !(w != null && w[Su])) && [uv, cv].concat(K(g)).forEach(function(B) {
              return B(J, X, {
                path: u,
                hashId: s,
                parentSelectors: o
              });
            });
            var Q = J.replace(/[A-Z]/g, function(B) {
              return "-".concat(B.toLowerCase());
            }), W = X;
            !Wf[J] && typeof W == "number" && W !== 0 && (W = "".concat(W, "px")), J === "animationName" && X !== null && X !== void 0 && X._keyframe && (x(X), W = X.getName(s)), m += "".concat(Q, ":").concat(W, ";");
          };
          var I, V = (I = w == null ? void 0 : w.value) !== null && I !== void 0 ? I : w;
          Z(w) === "object" && w !== null && w !== void 0 && w[xu] && Array.isArray(V) ? V.forEach(function(J) {
            z(y, J);
          }) : z(y, V);
        }
      });
    }
  }), a ? l && (m && (m = "@layer ".concat(l.name, " {").concat(m, "}")), l.dependencies && (f["@layer ".concat(l.name)] = l.dependencies.map(function(R) {
    return "@layer ".concat(R, ", ").concat(l.name, ";");
  }).join(`
`))) : m = "{".concat(m, "}"), [m, f];
};
function Eu(e, t) {
  return yn("".concat(e.join("%")).concat(t));
}
function mv() {
  return null;
}
var Cu = "style";
function si(e, t) {
  var r = e.token, n = e.path, a = e.hashId, i = e.layer, o = e.nonce, s = e.clientOnly, l = e.order, u = l === void 0 ? 0 : l, c = S.useContext(Pn), d = c.autoClear, v = c.mock, b = c.defaultCache, g = c.hashPriority, m = c.container, f = c.ssrInline, x = c.transformers, h = c.linters, _ = c.cache, R = c.layer, E = r._tokenKey, $ = [E];
  R && $.push("layer"), $.push.apply($, K(n));
  var y = ni;
  process.env.NODE_ENV !== "production" && v !== void 0 && (y = v === "client");
  var w = Qi(
    Cu,
    $,
    // Create cache if needed
    function() {
      var T = $.join("|");
      if (fv(T)) {
        var A = vv(T), k = q(A, 2), I = k[0], V = k[1];
        if (I)
          return [I, E, V, {}, s, u];
      }
      var z = t(), J = hv(z, {
        hashId: a,
        hashPriority: g,
        layer: R ? i : void 0,
        path: n.join("-"),
        transformers: x,
        linters: h
      }), X = q(J, 2), Q = X[0], W = X[1], B = ea(Q), U = Eu($, B);
      return [B, E, U, W, s, u];
    },
    // Remove cache if no need
    function(T, A) {
      var k = q(T, 3), I = k[2];
      (A || d) && ni && su(I, {
        mark: pt
      });
    },
    // Effect: Inject style here
    function(T) {
      var A = q(T, 4), k = A[0];
      A[1];
      var I = A[2], V = A[3];
      if (y && k !== bu) {
        var z = {
          mark: pt,
          prepend: R ? !1 : "queue",
          attachTo: m,
          priority: u
        }, J = typeof o == "function" ? o() : o;
        J && (z.csp = {
          nonce: J
        });
        var X = [], Q = [];
        Object.keys(V).forEach(function(B) {
          B.startsWith("@layer") ? X.push(B) : Q.push(B);
        }), X.forEach(function(B) {
          kt(ea(V[B]), "_layer-".concat(B), O(O({}, z), {}, {
            prepend: !0
          }));
        });
        var W = kt(k, I, z);
        W[Pt] = _.instanceId, W.setAttribute(rr, E), process.env.NODE_ENV !== "production" && W.setAttribute(gf, $.join("|")), Q.forEach(function(B) {
          kt(ea(V[B]), "_effect-".concat(B), z);
        });
      }
    }
  ), P = q(w, 3), F = P[0], j = P[1], D = P[2];
  return function(T) {
    var A;
    if (!f || y || !b)
      A = /* @__PURE__ */ S.createElement(mv, null);
    else {
      var k;
      A = /* @__PURE__ */ S.createElement("style", Ke({}, (k = {}, C(k, rr, j), C(k, pt, D), k), {
        dangerouslySetInnerHTML: {
          __html: F
        }
      }));
    }
    return /* @__PURE__ */ S.createElement(S.Fragment, null, A, T);
  };
}
var gv = function(t, r, n) {
  var a = q(t, 6), i = a[0], o = a[1], s = a[2], l = a[3], u = a[4], c = a[5], d = n || {}, v = d.plain;
  if (u)
    return null;
  var b = i, g = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(c)
  };
  return b = ia(i, o, s, g, v), l && Object.keys(l).forEach(function(m) {
    if (!r[m]) {
      r[m] = !0;
      var f = ea(l[m]), x = ia(f, o, "_effect-".concat(m), g, v);
      m.startsWith("@layer") ? b = x + b : b += x;
    }
  }), [c, s, b];
}, _u = "cssVar", bv = function(t, r) {
  var n = t.key, a = t.prefix, i = t.unitless, o = t.ignore, s = t.token, l = t.scope, u = l === void 0 ? "" : l, c = xt(Pn), d = c.cache.instanceId, v = c.container, b = s._tokenKey, g = [].concat(K(t.path), [n, u, b]), m = Qi(_u, g, function() {
    var f = r(), x = uu(f, n, {
      prefix: a,
      unitless: i,
      ignore: o,
      scope: u
    }), h = q(x, 2), _ = h[0], R = h[1], E = Eu(g, R);
    return [_, R, E, n];
  }, function(f) {
    var x = q(f, 3), h = x[2];
    ni && su(h, {
      mark: pt
    });
  }, function(f) {
    var x = q(f, 3), h = x[1], _ = x[2];
    if (h) {
      var R = kt(h, _, {
        mark: pt,
        prepend: "queue",
        attachTo: v,
        priority: -999
      });
      R[Pt] = d, R.setAttribute(rr, n);
    }
  });
  return m;
}, yv = function(t, r, n) {
  var a = q(t, 4), i = a[1], o = a[2], s = a[3], l = n || {}, u = l.plain;
  if (!i)
    return null;
  var c = -999, d = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(c)
  }, v = ia(i, s, o, d, u);
  return [c, o, v];
}, dn;
dn = {}, C(dn, Cu, gv), C(dn, cu, Bf), C(dn, _u, yv);
function Gt(e) {
  return e.notSplit = !0, e;
}
Gt(["borderTop", "borderBottom"]), Gt(["borderTop"]), Gt(["borderBottom"]), Gt(["borderLeft", "borderRight"]), Gt(["borderLeft"]), Gt(["borderRight"]);
var ro = /* @__PURE__ */ Bi({});
function Sv(e) {
  return eu(e) || nu(e) || Ki(e) || tu();
}
function bt(e, t) {
  for (var r = e, n = 0; n < t.length; n += 1) {
    if (r == null)
      return;
    r = r[t[n]];
  }
  return r;
}
function $u(e, t, r, n) {
  if (!t.length)
    return r;
  var a = Sv(t), i = a[0], o = a.slice(1), s;
  return !e && typeof i == "number" ? s = [] : Array.isArray(e) ? s = K(e) : s = O({}, e), n && r === void 0 && o.length === 1 ? delete s[i][o[0]] : s[i] = $u(s[i], o, r, n), s;
}
function dt(e, t, r) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && n && r === void 0 && !bt(e, t.slice(0, -1)) ? e : $u(e, t, r, n);
}
function xv(e) {
  return Z(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function As(e) {
  return Array.isArray(e) ? [] : {};
}
var Ev = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function Zt() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = As(t[0]);
  return t.forEach(function(a) {
    function i(o, s) {
      var l = new Set(s), u = bt(a, o), c = Array.isArray(u);
      if (c || xv(u)) {
        if (!l.has(u)) {
          l.add(u);
          var d = bt(n, o);
          c ? n = dt(n, o, []) : (!d || Z(d) !== "object") && (n = dt(n, o, As(u))), Ev(u).forEach(function(v) {
            i([].concat(K(o), [v]), l);
          });
        }
      } else
        n = dt(n, o, u);
    }
    i([]);
  }), n;
}
const Cv = /* @__PURE__ */ Bi(void 0);
var _v = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: !0
}, $v = O(O({}, _v), {}, {
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
const wv = {
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
}, $v), Object.assign({}, wv);
const Je = "${label} is not a valid ${type}", ba = {
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
        string: Je,
        method: Je,
        array: Je,
        object: Je,
        number: Je,
        date: Je,
        boolean: Je,
        integer: Je,
        float: Je,
        regexp: Je,
        email: Je,
        url: Je,
        hex: Je
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
Object.assign({}, ba.Modal);
let ta = [];
const Ms = () => ta.reduce((e, t) => Object.assign(Object.assign({}, e), t), ba.Modal);
function Rv(e) {
  if (e) {
    const t = Object.assign({}, e);
    return ta.push(t), Ms(), () => {
      ta = ta.filter((r) => r !== t), Ms();
    };
  }
  Object.assign({}, ba.Modal);
}
const wu = /* @__PURE__ */ Bi(void 0), Ru = "internalMark", Pu = (e) => {
  const {
    locale: t = {},
    children: r,
    _ANT_MARK__: n
  } = e;
  if (process.env.NODE_ENV !== "production") {
    const i = Nt("LocaleProvider");
    process.env.NODE_ENV !== "production" && i(n === Ru, "deprecated", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale");
  }
  S.useEffect(() => Rv(t == null ? void 0 : t.Modal), [t]);
  const a = S.useMemo(() => Object.assign(Object.assign({}, t), {
    exist: !0
  }), [t]);
  return /* @__PURE__ */ S.createElement(wu.Provider, {
    value: a
  }, r);
};
process.env.NODE_ENV !== "production" && (Pu.displayName = "LocaleProvider");
const Ou = {
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
}, Cn = Object.assign(Object.assign({}, Ou), {
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
}), qe = Math.round;
function ka(e, t) {
  const r = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], n = r.map((a) => parseFloat(a));
  for (let a = 0; a < 3; a += 1)
    n[a] = t(n[a] || 0, r[a] || "", a);
  return r[3] ? n[3] = r[3].includes("%") ? n[3] / 100 : n[3] : n[3] = 1, n;
}
const js = (e, t, r) => r === 0 ? e : e / 100;
function fn(e, t) {
  const r = t || 255;
  return e > r ? r : e < 0 ? 0 : e;
}
class Pe {
  constructor(t) {
    C(this, "isValid", !0), C(this, "r", 0), C(this, "g", 0), C(this, "b", 0), C(this, "a", 1), C(this, "_h", void 0), C(this, "_s", void 0), C(this, "_l", void 0), C(this, "_v", void 0), C(this, "_max", void 0), C(this, "_min", void 0), C(this, "_brightness", void 0);
    function r(n) {
      return n[0] in t && n[1] in t && n[2] in t;
    }
    if (t) if (typeof t == "string") {
      let a = function(i) {
        return n.startsWith(i);
      };
      const n = t.trim();
      /^#?[A-F\d]{3,8}$/i.test(n) ? this.fromHexString(n) : a("rgb") ? this.fromRgbString(n) : a("hsl") ? this.fromHslString(n) : (a("hsv") || a("hsb")) && this.fromHsvString(n);
    } else if (t instanceof Pe)
      this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this._h = t._h, this._s = t._s, this._l = t._l, this._v = t._v;
    else if (r("rgb"))
      this.r = fn(t.r), this.g = fn(t.g), this.b = fn(t.b), this.a = typeof t.a == "number" ? fn(t.a, 1) : 1;
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
      t === 0 ? this._h = 0 : this._h = qe(60 * (this.r === this.getMax() ? (this.g - this.b) / t + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / t + 2 : (this.r - this.g) / t + 4));
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
      r: qe(i("r")),
      g: qe(i("g")),
      b: qe(i("b")),
      a: qe(i("a") * 100) / 100
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
    const r = this._c(t), n = this.a + r.a * (1 - this.a), a = (i) => qe((this[i] * this.a + r[i] * r.a * (1 - this.a)) / n);
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
      const i = qe(this.a * 255).toString(16);
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
    const t = this.getHue(), r = qe(this.getSaturation() * 100), n = qe(this.getLightness() * 100);
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
    return a[t] = fn(r, n), a;
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
      const v = qe(n * 255);
      this.r = v, this.g = v, this.b = v;
    }
    let i = 0, o = 0, s = 0;
    const l = t / 60, u = (1 - Math.abs(2 * n - 1)) * r, c = u * (1 - Math.abs(l % 2 - 1));
    l >= 0 && l < 1 ? (i = u, o = c) : l >= 1 && l < 2 ? (i = c, o = u) : l >= 2 && l < 3 ? (o = u, s = c) : l >= 3 && l < 4 ? (o = c, s = u) : l >= 4 && l < 5 ? (i = c, s = u) : l >= 5 && l < 6 && (i = u, s = c);
    const d = n - u / 2;
    this.r = qe((i + d) * 255), this.g = qe((o + d) * 255), this.b = qe((s + d) * 255);
  }
  fromHsv({
    h: t,
    s: r,
    v: n,
    a
  }) {
    this._h = t % 360, this._s = r, this._v = n, this.a = typeof a == "number" ? a : 1;
    const i = qe(n * 255);
    if (this.r = i, this.g = i, this.b = i, r <= 0)
      return;
    const o = t / 60, s = Math.floor(o), l = o - s, u = qe(n * (1 - r) * 255), c = qe(n * (1 - r * l) * 255), d = qe(n * (1 - r * (1 - l)) * 255);
    switch (s) {
      case 0:
        this.g = d, this.b = u;
        break;
      case 1:
        this.r = c, this.b = u;
        break;
      case 2:
        this.r = u, this.b = d;
        break;
      case 3:
        this.r = u, this.g = c;
        break;
      case 4:
        this.r = d, this.g = u;
        break;
      case 5:
      default:
        this.g = u, this.b = c;
        break;
    }
  }
  fromHsvString(t) {
    const r = ka(t, js);
    this.fromHsv({
      h: r[0],
      s: r[1],
      v: r[2],
      a: r[3]
    });
  }
  fromHslString(t) {
    const r = ka(t, js);
    this.fromHsl({
      h: r[0],
      s: r[1],
      l: r[2],
      a: r[3]
    });
  }
  fromRgbString(t) {
    const r = ka(t, (n, a) => (
      // Convert percentage to number. e.g. 50% -> 128
      a.includes("%") ? qe(n / 100 * 255) : n
    ));
    this.r = r[0], this.g = r[1], this.b = r[2], this.a = r[3];
  }
}
var zn = 2, Ds = 0.16, Pv = 0.05, Ov = 0.05, Fv = 0.15, Fu = 5, Tu = 4, Tv = [{
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
function ks(e, t, r) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = r ? Math.round(e.h) - zn * t : Math.round(e.h) + zn * t : n = r ? Math.round(e.h) + zn * t : Math.round(e.h) - zn * t, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function Is(e, t, r) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return r ? n = e.s - Ds * t : t === Tu ? n = e.s + Ds : n = e.s + Pv * t, n > 1 && (n = 1), r && t === Fu && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Math.round(n * 100) / 100;
}
function Ns(e, t, r) {
  var n;
  return r ? n = e.v + Ov * t : n = e.v - Fv * t, n = Math.max(0, Math.min(1, n)), Math.round(n * 100) / 100;
}
function sa(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [], n = new Pe(e), a = n.toHsv(), i = Fu; i > 0; i -= 1) {
    var o = new Pe({
      h: ks(a, i, !0),
      s: Is(a, i, !0),
      v: Ns(a, i, !0)
    });
    r.push(o);
  }
  r.push(n);
  for (var s = 1; s <= Tu; s += 1) {
    var l = new Pe({
      h: ks(a, s),
      s: Is(a, s),
      v: Ns(a, s)
    });
    r.push(l);
  }
  return t.theme === "dark" ? Tv.map(function(u) {
    var c = u.index, d = u.amount;
    return new Pe(t.backgroundColor || "#141414").mix(r[c], d).toHexString();
  }) : r.map(function(u) {
    return u.toHexString();
  });
}
var Ia = {
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
}, li = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
li.primary = li[5];
var ui = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
ui.primary = ui[5];
var ci = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
ci.primary = ci[5];
var di = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
di.primary = di[5];
var fi = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
fi.primary = fi[5];
var vi = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
vi.primary = vi[5];
var pi = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
pi.primary = pi[5];
var hi = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
hi.primary = hi[5];
var mi = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
mi.primary = mi[5];
var gi = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
gi.primary = gi[5];
var bi = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
bi.primary = bi[5];
var yi = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
yi.primary = yi[5];
var Si = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
Si.primary = Si[5];
var Na = {
  red: li,
  volcano: ui,
  orange: ci,
  gold: di,
  yellow: fi,
  lime: vi,
  green: pi,
  cyan: hi,
  blue: mi,
  geekblue: gi,
  purple: bi,
  magenta: yi,
  grey: Si
};
function Av(e, {
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
    colorTextBase: u
  } = e, c = t(s), d = t(n), v = t(a), b = t(i), g = t(o), m = r(l, u), f = e.colorLink || e.colorInfo, x = t(f), h = new Pe(b[1]).mix(new Pe(b[3]), 50).toHexString();
  return Object.assign(Object.assign({}, m), {
    colorPrimaryBg: c[1],
    colorPrimaryBgHover: c[2],
    colorPrimaryBorder: c[3],
    colorPrimaryBorderHover: c[4],
    colorPrimaryHover: c[5],
    colorPrimary: c[6],
    colorPrimaryActive: c[7],
    colorPrimaryTextHover: c[8],
    colorPrimaryText: c[9],
    colorPrimaryTextActive: c[10],
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
    colorBgMask: new Pe("#000").setA(0.45).toRgbString(),
    colorWhite: "#fff"
  });
}
const Mv = (e) => {
  let t = e, r = e, n = e, a = e;
  return e < 6 && e >= 5 ? t = e + 1 : e < 16 && e >= 6 ? t = e + 2 : e >= 16 && (t = 16), e < 7 && e >= 5 ? r = 4 : e < 8 && e >= 7 ? r = 5 : e < 14 && e >= 8 ? r = 6 : e < 16 && e >= 14 ? r = 7 : e >= 16 && (r = 8), e < 6 && e >= 2 ? n = 1 : e >= 6 && (n = 2), e > 4 && e < 8 ? a = 4 : e >= 8 && (a = 6), {
    borderRadius: e,
    borderRadiusXS: n,
    borderRadiusSM: r,
    borderRadiusLG: t,
    borderRadiusOuter: a
  };
};
function jv(e) {
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
  }, Mv(n));
}
const Dv = (e) => {
  const {
    controlHeight: t
  } = e;
  return {
    controlHeightSM: t * 0.75,
    controlHeightXS: t * 0.5,
    controlHeightLG: t * 1.25
  };
};
function kv(e) {
  return (e + 8) / e;
}
function Iv(e) {
  const t = Array.from({
    length: 10
  }).map((r, n) => {
    const a = n - 1, i = e * Math.pow(Math.E, a / 5), o = n > 1 ? Math.floor(i) : Math.ceil(i);
    return Math.floor(o / 2) * 2;
  });
  return t[1] = e, t.map((r) => ({
    size: r,
    lineHeight: kv(r)
  }));
}
const Nv = (e) => {
  const t = Iv(e), r = t.map((c) => c.size), n = t.map((c) => c.lineHeight), a = r[1], i = r[0], o = r[2], s = n[1], l = n[0], u = n[2];
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
    lineHeightLG: u,
    lineHeightSM: l,
    fontHeight: Math.round(s * a),
    fontHeightLG: Math.round(u * o),
    fontHeightSM: Math.round(l * i),
    lineHeightHeading1: n[6],
    lineHeightHeading2: n[5],
    lineHeightHeading3: n[4],
    lineHeightHeading4: n[3],
    lineHeightHeading5: n[2]
  };
};
function Vv(e) {
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
const ot = (e, t) => new Pe(e).setA(t).toRgbString(), vn = (e, t) => new Pe(e).darken(t).toHexString(), Lv = (e) => {
  const t = sa(e);
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
}, zv = (e, t) => {
  const r = e || "#fff", n = t || "#000";
  return {
    colorBgBase: r,
    colorTextBase: n,
    colorText: ot(n, 0.88),
    colorTextSecondary: ot(n, 0.65),
    colorTextTertiary: ot(n, 0.45),
    colorTextQuaternary: ot(n, 0.25),
    colorFill: ot(n, 0.15),
    colorFillSecondary: ot(n, 0.06),
    colorFillTertiary: ot(n, 0.04),
    colorFillQuaternary: ot(n, 0.02),
    colorBgSolid: ot(n, 1),
    colorBgSolidHover: ot(n, 0.75),
    colorBgSolidActive: ot(n, 0.95),
    colorBgLayout: vn(r, 4),
    colorBgContainer: vn(r, 0),
    colorBgElevated: vn(r, 0),
    colorBgSpotlight: ot(n, 0.85),
    colorBgBlur: "transparent",
    colorBorder: vn(r, 15),
    colorBorderSecondary: vn(r, 6)
  };
};
function Hv(e) {
  Ia.pink = Ia.magenta, Na.pink = Na.magenta;
  const t = Object.keys(Ou).map((r) => {
    const n = e[r] === Ia[r] ? Na[r] : sa(e[r]);
    return Array.from({
      length: 10
    }, () => 1).reduce((a, i, o) => (a[`${r}-${o + 1}`] = n[o], a[`${r}${o + 1}`] = n[o], a), {});
  }).reduce((r, n) => (r = Object.assign(Object.assign({}, r), n), r), {});
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e), t), Av(e, {
    generateColorPalettes: Lv,
    generateNeutralColorPalettes: zv
  })), Nv(e.fontSize)), Vv(e)), Dv(e)), jv(e));
}
const Au = ri(Hv), xi = {
  token: Cn,
  override: {
    override: Cn
  },
  hashed: !0
}, Mu = /* @__PURE__ */ H.createContext(xi), Ei = "ant", no = "anticon", qv = ["outlined", "borderless", "filled", "underlined"], Bv = (e, t) => t || (e ? `${Ei}-${e}` : Ei), Ft = /* @__PURE__ */ S.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: Bv,
  iconPrefixCls: no
}), {
  Consumer: Wg
} = Ft, Vs = {};
function ju(e) {
  const t = S.useContext(Ft), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: a
  } = t, i = t[e];
  return Object.assign(Object.assign({
    classNames: Vs,
    styles: Vs
  }, i), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: a
  });
}
const Wv = `-ant-${Date.now()}-${Math.random()}`;
function Uv(e, t) {
  const r = {}, n = (o, s) => {
    let l = o.clone();
    return l = (s == null ? void 0 : s(l)) || l, l.toRgbString();
  }, a = (o, s) => {
    const l = new Pe(o), u = sa(l.toRgbString());
    r[`${s}-color`] = n(l), r[`${s}-color-disabled`] = u[1], r[`${s}-color-hover`] = u[4], r[`${s}-color-active`] = u[6], r[`${s}-color-outline`] = l.clone().setA(0.2).toRgbString(), r[`${s}-color-deprecated-bg`] = u[0], r[`${s}-color-deprecated-border`] = u[2];
  };
  if (t.primaryColor) {
    a(t.primaryColor, "primary");
    const o = new Pe(t.primaryColor), s = sa(o.toRgbString());
    s.forEach((u, c) => {
      r[`primary-${c + 1}`] = u;
    }), r["primary-color-deprecated-l-35"] = n(o, (u) => u.lighten(35)), r["primary-color-deprecated-l-20"] = n(o, (u) => u.lighten(20)), r["primary-color-deprecated-t-20"] = n(o, (u) => u.tint(20)), r["primary-color-deprecated-t-50"] = n(o, (u) => u.tint(50)), r["primary-color-deprecated-f-12"] = n(o, (u) => u.setA(u.a * 0.12));
    const l = new Pe(s[0]);
    r["primary-color-active-deprecated-f-30"] = n(l, (u) => u.setA(u.a * 0.3)), r["primary-color-active-deprecated-d-02"] = n(l, (u) => u.darken(2));
  }
  return t.successColor && a(t.successColor, "success"), t.warningColor && a(t.warningColor, "warning"), t.errorColor && a(t.errorColor, "error"), t.infoColor && a(t.infoColor, "info"), `
  :root {
    ${Object.keys(r).map((o) => `--${e}-${o}: ${r[o]};`).join(`
`)}
  }
  `.trim();
}
function Yv(e, t) {
  const r = Uv(e, t);
  Et() ? kt(r, `${Wv}-dynamic-theme`) : process.env.NODE_ENV !== "production" && pa(!1, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
}
const _n = /* @__PURE__ */ S.createContext(!1), Gv = ({
  children: e,
  disabled: t
}) => {
  const r = S.useContext(_n);
  return /* @__PURE__ */ S.createElement(_n.Provider, {
    value: t ?? r
  }, e);
}, ir = /* @__PURE__ */ S.createContext(void 0), Kv = ({
  children: e,
  size: t
}) => {
  const r = S.useContext(ir);
  return /* @__PURE__ */ S.createElement(ir.Provider, {
    value: t || r
  }, e);
};
function Xv() {
  const e = xt(_n), t = xt(ir);
  return {
    componentDisabled: e,
    componentSize: t
  };
}
var Du = /* @__PURE__ */ Ye(function e() {
  Ue(this, e);
}), ku = "CALC_UNIT", Zv = new RegExp(ku, "g");
function Va(e) {
  return typeof e == "number" ? "".concat(e).concat(ku) : e;
}
var Jv = /* @__PURE__ */ (function(e) {
  Ht(r, e);
  var t = qt(r);
  function r(n, a) {
    var i;
    Ue(this, r), i = t.call(this), C(ne(i), "result", ""), C(ne(i), "unitlessCssVar", void 0), C(ne(i), "lowPriority", void 0);
    var o = Z(n);
    return i.unitlessCssVar = a, n instanceof r ? i.result = "(".concat(n.result, ")") : o === "number" ? i.result = Va(n) : o === "string" && (i.result = n), i;
  }
  return Ye(r, [{
    key: "add",
    value: function(a) {
      return a instanceof r ? this.result = "".concat(this.result, " + ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " + ").concat(Va(a))), this.lowPriority = !0, this;
    }
  }, {
    key: "sub",
    value: function(a) {
      return a instanceof r ? this.result = "".concat(this.result, " - ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " - ").concat(Va(a))), this.lowPriority = !0, this;
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
      return typeof s == "boolean" ? l = s : Array.from(this.unitlessCssVar).some(function(u) {
        return i.result.includes(u);
      }) && (l = !1), this.result = this.result.replace(Zv, l ? "px" : ""), typeof this.lowPriority < "u" ? "calc(".concat(this.result, ")") : this.result;
    }
  }]), r;
})(Du), Qv = /* @__PURE__ */ (function(e) {
  Ht(r, e);
  var t = qt(r);
  function r(n) {
    var a;
    return Ue(this, r), a = t.call(this), C(ne(a), "result", 0), n instanceof r ? a.result = n.result : typeof n == "number" && (a.result = n), a;
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
})(Du), ep = function(t, r) {
  var n = t === "css" ? Jv : Qv;
  return function(a) {
    return new n(a, r);
  };
}, Ls = function(t, r) {
  return "".concat([r, t.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-"));
};
function $n(e) {
  var t = S.useRef();
  t.current = e;
  var r = S.useCallback(function() {
    for (var n, a = arguments.length, i = new Array(a), o = 0; o < a; o++)
      i[o] = arguments[o];
    return (n = t.current) === null || n === void 0 ? void 0 : n.call.apply(n, [t].concat(i));
  }, []);
  return r;
}
function wn(e) {
  var t = S.useRef(!1), r = S.useState(e), n = q(r, 2), a = n[0], i = n[1];
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
function La(e) {
  return e !== void 0;
}
function ao(e, t) {
  var r = t || {}, n = r.defaultValue, a = r.value, i = r.onChange, o = r.postState, s = wn(function() {
    return La(a) ? a : La(n) ? typeof n == "function" ? n() : n : typeof e == "function" ? e() : e;
  }), l = q(s, 2), u = l[0], c = l[1], d = a !== void 0 ? a : u, v = o ? o(d) : d, b = $n(i), g = wn([d]), m = q(g, 2), f = m[0], x = m[1];
  ws(function() {
    var _ = f[0];
    u !== _ && b(u, _);
  }, [f]), ws(function() {
    La(a) || c(a);
  }, [a]);
  var h = $n(function(_, R) {
    c(_, R), x([d], R);
  });
  return [v, h];
}
function zs(e, t, r, n) {
  var a = O({}, t[e]);
  if (n != null && n.deprecatedTokens) {
    var i = n.deprecatedTokens;
    i.forEach(function(s) {
      var l = q(s, 2), u = l[0], c = l[1];
      if (process.env.NODE_ENV !== "production" && Ae(!(a != null && a[u]), "Component Token `".concat(String(u), "` of ").concat(String(e), " is deprecated. Please use `").concat(String(c), "` instead.")), a != null && a[u] || a != null && a[c]) {
        var d;
        (d = a[c]) !== null && d !== void 0 || (a[c] = a == null ? void 0 : a[u]);
      }
    });
  }
  var o = O(O({}, r), a);
  return Object.keys(o).forEach(function(s) {
    o[s] === t[s] && delete o[s];
  }), o;
}
var Iu = process.env.NODE_ENV !== "production" || typeof CSSINJS_STATISTIC < "u", Ci = !0;
function Bt() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  if (!Iu)
    return Object.assign.apply(Object, [{}].concat(t));
  Ci = !1;
  var n = {};
  return t.forEach(function(a) {
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
  }), Ci = !0, n;
}
var Hs = {};
function tp() {
}
var rp = function(t) {
  var r, n = t, a = tp;
  return Iu && typeof Proxy < "u" && (r = /* @__PURE__ */ new Set(), n = new Proxy(t, {
    get: function(o, s) {
      if (Ci) {
        var l;
        (l = r) === null || l === void 0 || l.add(s);
      }
      return o[s];
    }
  }), a = function(o, s) {
    var l;
    Hs[o] = {
      global: Array.from(r),
      component: O(O({}, (l = Hs[o]) === null || l === void 0 ? void 0 : l.component), s)
    };
  }), {
    token: n,
    keys: r,
    flush: a
  };
};
function qs(e, t, r) {
  if (typeof r == "function") {
    var n;
    return r(Bt(t, (n = t[e]) !== null && n !== void 0 ? n : {}));
  }
  return r ?? {};
}
function np(e) {
  return e === "js" ? {
    max: Math.max,
    min: Math.min
  } : {
    max: function() {
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      return "max(".concat(n.map(function(i) {
        return De(i);
      }).join(","), ")");
    },
    min: function() {
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      return "min(".concat(n.map(function(i) {
        return De(i);
      }).join(","), ")");
    }
  };
}
var ap = 1e3 * 60 * 10, ip = /* @__PURE__ */ (function() {
  function e() {
    Ue(this, e), C(this, "map", /* @__PURE__ */ new Map()), C(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), C(this, "nextID", 0), C(this, "lastAccessBeat", /* @__PURE__ */ new Map()), C(this, "accessBeat", 0);
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
        return i && Z(i) === "object" ? "obj_".concat(n.getObjectID(i)) : "".concat(Z(i), "_").concat(i);
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
          n - a > ap && (r.map.delete(i), r.lastAccessBeat.delete(i));
        }), this.accessBeat = 0;
      }
    }
  }]), e;
})(), Bs = new ip();
function op(e, t) {
  return H.useMemo(function() {
    var r = Bs.get(t);
    if (r)
      return r;
    var n = e();
    return Bs.set(t, n), n;
  }, t);
}
var sp = function() {
  return {};
};
function lp(e) {
  var t = e.useCSP, r = t === void 0 ? sp : t, n = e.useToken, a = e.usePrefix, i = e.getResetStyles, o = e.getCommonStyle, s = e.getCompUnitless;
  function l(v, b, g, m) {
    var f = Array.isArray(v) ? v[0] : v;
    function x(w) {
      return "".concat(String(f)).concat(w.slice(0, 1).toUpperCase()).concat(w.slice(1));
    }
    var h = (m == null ? void 0 : m.unitless) || {}, _ = typeof s == "function" ? s(v) : {}, R = O(O({}, _), {}, C({}, x("zIndexPopup"), !0));
    Object.keys(h).forEach(function(w) {
      R[x(w)] = h[w];
    });
    var E = O(O({}, m), {}, {
      unitless: R,
      prefixToken: x
    }), $ = c(v, b, g, E), y = u(f, g, E);
    return function(w) {
      var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : w, F = $(w, P), j = q(F, 2), D = j[1], T = y(P), A = q(T, 2), k = A[0], I = A[1];
      return [k, D, I];
    };
  }
  function u(v, b, g) {
    var m = g.unitless, f = g.injectStyle, x = f === void 0 ? !0 : f, h = g.prefixToken, _ = g.ignore, R = function(y) {
      var w = y.rootCls, P = y.cssVar, F = P === void 0 ? {} : P, j = n(), D = j.realToken;
      return bv({
        path: [v],
        prefix: F.prefix,
        key: F.key,
        unitless: m,
        ignore: _,
        token: D,
        scope: w
      }, function() {
        var T = qs(v, D, b), A = zs(v, D, T, {
          deprecatedTokens: g == null ? void 0 : g.deprecatedTokens
        });
        return Object.keys(T).forEach(function(k) {
          A[h(k)] = A[k], delete A[k];
        }), A;
      }), null;
    }, E = function(y) {
      var w = n(), P = w.cssVar;
      return [function(F) {
        return x && P ? /* @__PURE__ */ H.createElement(H.Fragment, null, /* @__PURE__ */ H.createElement(R, {
          rootCls: y,
          cssVar: P,
          component: v
        }), F) : F;
      }, P == null ? void 0 : P.key];
    };
    return E;
  }
  function c(v, b, g) {
    var m = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, f = Array.isArray(v) ? v : [v, v], x = q(f, 1), h = x[0], _ = f.join("-"), R = e.layer || {
      name: "antd"
    };
    return function(E) {
      var $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : E, y = n(), w = y.theme, P = y.realToken, F = y.hashId, j = y.token, D = y.cssVar, T = a(), A = T.rootPrefixCls, k = T.iconPrefixCls, I = r(), V = D ? "css" : "js", z = op(function() {
        var U = /* @__PURE__ */ new Set();
        return D && Object.keys(m.unitless || {}).forEach(function(de) {
          U.add(Xn(de, D.prefix)), U.add(Xn(de, Ls(h, D.prefix)));
        }), ep(V, U);
      }, [V, h, D == null ? void 0 : D.prefix]), J = np(V), X = J.max, Q = J.min, W = {
        theme: w,
        token: j,
        hashId: F,
        nonce: function() {
          return I.nonce;
        },
        clientOnly: m.clientOnly,
        layer: R,
        // antd is always at top of styles
        order: m.order || -999
      };
      typeof i == "function" && si(O(O({}, W), {}, {
        clientOnly: !1,
        path: ["Shared", A]
      }), function() {
        return i(j, {
          prefix: {
            rootPrefixCls: A,
            iconPrefixCls: k
          },
          csp: I
        });
      });
      var B = si(O(O({}, W), {}, {
        path: [_, E, k]
      }), function() {
        if (m.injectStyle === !1)
          return [];
        var U = rp(j), de = U.token, ie = U.flush, ve = qs(h, P, g), le = ".".concat(E), fe = zs(h, P, ve, {
          deprecatedTokens: m.deprecatedTokens
        });
        D && ve && Z(ve) === "object" && Object.keys(ve).forEach(function(ke) {
          ve[ke] = "var(".concat(Xn(ke, Ls(h, D.prefix)), ")");
        });
        var ue = Bt(de, {
          componentCls: le,
          prefixCls: E,
          iconCls: ".".concat(k),
          antCls: ".".concat(A),
          calc: z,
          // @ts-ignore
          max: X,
          // @ts-ignore
          min: Q
        }, D ? ve : fe), we = b(ue, {
          hashId: F,
          prefixCls: E,
          rootPrefixCls: A,
          iconPrefixCls: k
        });
        ie(h, fe);
        var Re = typeof o == "function" ? o(ue, E, $, m.resetFont) : null;
        return [m.resetStyle === !1 ? null : Re, we];
      });
      return [B, F];
    };
  }
  function d(v, b, g) {
    var m = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, f = c(v, b, g, O({
      resetStyle: !1,
      // Sub Style should default after root one
      order: -998
    }, m)), x = function(_) {
      var R = _.prefixCls, E = _.rootCls, $ = E === void 0 ? R : E;
      return f(R, $), null;
    };
    return process.env.NODE_ENV !== "production" && (x.displayName = "SubStyle_".concat(String(Array.isArray(v) ? v.join(".") : v))), x;
  }
  return {
    genStyleHooks: l,
    genSubStyleComponent: d,
    genComponentStyleHook: c
  };
}
const up = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"], cp = "5.25.4";
function za(e) {
  return e >= 0 && e <= 255;
}
function Hn(e, t) {
  const {
    r,
    g: n,
    b: a,
    a: i
  } = new Pe(e).toRgb();
  if (i < 1)
    return e;
  const {
    r: o,
    g: s,
    b: l
  } = new Pe(t).toRgb();
  for (let u = 0.01; u <= 1; u += 0.01) {
    const c = Math.round((r - o * (1 - u)) / u), d = Math.round((n - s * (1 - u)) / u), v = Math.round((a - l * (1 - u)) / u);
    if (za(c) && za(d) && za(v))
      return new Pe({
        r: c,
        g: d,
        b: v,
        a: Math.round(u * 100) / 100
      }).toRgbString();
  }
  return new Pe({
    r,
    g: n,
    b: a,
    a: 1
  }).toRgbString();
}
var dp = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
function Nu(e) {
  const {
    override: t
  } = e, r = dp(e, ["override"]), n = Object.assign({}, t);
  Object.keys(Cn).forEach((v) => {
    delete n[v];
  });
  const a = Object.assign(Object.assign({}, r), n), i = 480, o = 576, s = 768, l = 992, u = 1200, c = 1600;
  return a.motion === !1 && (a.motionDurationFast = "0s", a.motionDurationMid = "0s", a.motionDurationSlow = "0s"), Object.assign(Object.assign(Object.assign({}, a), {
    // ============== Background ============== //
    colorFillContent: a.colorFillSecondary,
    colorFillContentHover: a.colorFill,
    colorFillAlter: a.colorFillQuaternary,
    colorBgContainerDisabled: a.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: a.colorBgContainer,
    colorSplit: Hn(a.colorBorderSecondary, a.colorBgContainer),
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
    colorErrorOutline: Hn(a.colorErrorBg, a.colorBgContainer),
    colorWarningOutline: Hn(a.colorWarningBg, a.colorBgContainer),
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
    controlOutline: Hn(a.colorPrimaryBg, a.colorBgContainer),
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
    screenLGMax: u - 1,
    screenXL: u,
    screenXLMin: u,
    screenXLMax: c - 1,
    screenXXL: c,
    screenXXLMin: c,
    boxShadowPopoverArrow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
    boxShadowCard: `
      0 1px 2px -2px ${new Pe("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new Pe("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new Pe("rgba(0, 0, 0, 0.09)").toRgbString()}
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
var Ws = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const Vu = {
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
}, fp = {
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
}, vp = {
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
}, Lu = (e, t, r) => {
  const n = r.getDerivativeToken(e), {
    override: a
  } = t, i = Ws(t, ["override"]);
  let o = Object.assign(Object.assign({}, n), {
    override: a
  });
  return o = Nu(o), i && Object.entries(i).forEach(([s, l]) => {
    const {
      theme: u
    } = l, c = Ws(l, ["theme"]);
    let d = c;
    u && (d = Lu(Object.assign(Object.assign({}, o), c), {
      override: c
    }, u)), o[s] = d;
  }), o;
};
function ya() {
  const {
    token: e,
    hashed: t,
    theme: r,
    override: n,
    cssVar: a
  } = H.useContext(Mu), i = `${cp}-${t || ""}`, o = r || Au, [s, l, u] = qf(o, [Cn, e], {
    salt: i,
    override: n,
    getComputedToken: Lu,
    // formatToken will not be consumed after 1.15.0 with getComputedToken.
    // But token will break if @ant-design/cssinjs is under 1.15.0 without it
    formatToken: Nu,
    cssVar: a && {
      prefix: a.prefix,
      key: a.key,
      unitless: Vu,
      ignore: fp,
      preserve: vp
    }
  });
  return [o, u, t ? l : "", s, a];
}
const zu = (e, t = !1) => ({
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
}), pp = () => ({
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
}), hp = () => ({
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
}), mp = (e) => ({
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
}), gp = (e, t, r, n) => {
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
}, Hu = (e) => ({
  [`.${e}`]: Object.assign(Object.assign({}, pp()), {
    [`.${e} .${e}-icon`]: {
      display: "block"
    }
  })
}), {
  genStyleHooks: io
} = lp({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: t
    } = xt(Ft);
    return {
      rootPrefixCls: e(),
      iconPrefixCls: t
    };
  },
  useToken: () => {
    const [e, t, r, n, a] = ya();
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
    } = xt(Ft);
    return e ?? {};
  },
  getResetStyles: (e, t) => {
    var r;
    const n = mp(e);
    return [n, {
      "&": n
    }, Hu((r = t == null ? void 0 : t.prefix.iconPrefixCls) !== null && r !== void 0 ? r : no)];
  },
  getCommonStyle: gp,
  getCompUnitless: () => Vu
}), bp = (e, t) => {
  const [r, n] = ya();
  return si({
    token: n,
    hashId: "",
    path: ["ant-design-icons", e],
    nonce: () => t == null ? void 0 : t.nonce,
    layer: {
      name: "antd"
    }
  }, () => [Hu(e)]);
}, yp = Object.assign({}, S), {
  useId: Us
} = yp, Sp = () => "", xp = typeof Us > "u" ? Sp : Us;
function Ep(e, t, r) {
  var n, a;
  const i = Nt("ConfigProvider"), o = e || {}, s = o.inherit === !1 || !t ? Object.assign(Object.assign({}, xi), {
    hashed: (n = t == null ? void 0 : t.hashed) !== null && n !== void 0 ? n : xi.hashed,
    cssVar: t == null ? void 0 : t.cssVar
  }) : t, l = xp();
  if (process.env.NODE_ENV !== "production") {
    const u = o.cssVar || s.cssVar, c = !!(typeof o.cssVar == "object" && (!((a = o.cssVar) === null || a === void 0) && a.key) || l);
    process.env.NODE_ENV !== "production" && i(!u || c, "breaking", "Missing key in `cssVar` config. Please upgrade to React 18 or set `cssVar.key` manually in each ConfigProvider inside `cssVar` enabled ConfigProvider.");
  }
  return Ui(() => {
    var u, c;
    if (!e)
      return t;
    const d = Object.assign({}, s.components);
    Object.keys(e.components || {}).forEach((g) => {
      d[g] = Object.assign(Object.assign({}, d[g]), e.components[g]);
    });
    const v = `css-var-${l.replace(/:/g, "")}`, b = ((u = o.cssVar) !== null && u !== void 0 ? u : s.cssVar) && Object.assign(Object.assign(Object.assign({
      prefix: r == null ? void 0 : r.prefixCls
    }, typeof s.cssVar == "object" ? s.cssVar : {}), typeof o.cssVar == "object" ? o.cssVar : {}), {
      key: typeof o.cssVar == "object" && ((c = o.cssVar) === null || c === void 0 ? void 0 : c.key) || v
    });
    return Object.assign(Object.assign(Object.assign({}, s), o), {
      token: Object.assign(Object.assign({}, s.token), o.token),
      components: d,
      cssVar: b
    });
  }, [o, s], (u, c) => u.some((d, v) => {
    const b = c[v];
    return !ei(d, b, !0);
  }));
}
function Ys(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}
function Cp(e) {
  return e && Z(e) === "object" && Ys(e.nativeElement) ? e.nativeElement : Ys(e) ? e : null;
}
function ra(e) {
  var t = Cp(e);
  if (t)
    return t;
  if (e instanceof H.Component) {
    var r;
    return (r = po.findDOMNode) === null || r === void 0 ? void 0 : r.call(po, e);
  }
  return null;
}
var _p = ["children"], qu = /* @__PURE__ */ S.createContext({});
function $p(e) {
  var t = e.children, r = lt(e, _p);
  return /* @__PURE__ */ S.createElement(qu.Provider, {
    value: r
  }, t);
}
var wp = /* @__PURE__ */ (function(e) {
  Ht(r, e);
  var t = qt(r);
  function r() {
    return Ue(this, r), t.apply(this, arguments);
  }
  return Ye(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
})(S.Component);
function Rp(e) {
  var t = S.useReducer(function(s) {
    return s + 1;
  }, 0), r = q(t, 2), n = r[1], a = S.useRef(e), i = $n(function() {
    return a.current;
  }), o = $n(function(s) {
    a.current = typeof s == "function" ? s(a.current) : s, n();
  });
  return [i, o];
}
var Rt = "none", qn = "appear", Bn = "enter", Wn = "leave", Gs = "none", ft = "prepare", Jt = "start", Qt = "active", oo = "end", Bu = "prepared";
function Ks(e, t) {
  var r = {};
  return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit".concat(e)] = "webkit".concat(t), r["Moz".concat(e)] = "moz".concat(t), r["ms".concat(e)] = "MS".concat(t), r["O".concat(e)] = "o".concat(t.toLowerCase()), r;
}
function Pp(e, t) {
  var r = {
    animationend: Ks("Animation", "AnimationEnd"),
    transitionend: Ks("Transition", "TransitionEnd")
  };
  return e && ("AnimationEvent" in t || delete r.animationend.animation, "TransitionEvent" in t || delete r.transitionend.transition), r;
}
var Op = Pp(Et(), typeof window < "u" ? window : {}), Wu = {};
if (Et()) {
  var Fp = document.createElement("div");
  Wu = Fp.style;
}
var Un = {};
function Uu(e) {
  if (Un[e])
    return Un[e];
  var t = Op[e];
  if (t)
    for (var r = Object.keys(t), n = r.length, a = 0; a < n; a += 1) {
      var i = r[a];
      if (Object.prototype.hasOwnProperty.call(t, i) && i in Wu)
        return Un[e] = t[i], Un[e];
    }
  return "";
}
var Yu = Uu("animationend"), Gu = Uu("transitionend"), Ku = !!(Yu && Gu), Xs = Yu || "animationend", Zs = Gu || "transitionend";
function Js(e, t) {
  if (!e) return null;
  if (Z(e) === "object") {
    var r = t.replace(/-\w/g, function(n) {
      return n[1].toUpperCase();
    });
    return e[r];
  }
  return "".concat(e, "-").concat(t);
}
const Tp = (function(e) {
  var t = Ne();
  function r(a) {
    a && (a.removeEventListener(Zs, e), a.removeEventListener(Xs, e));
  }
  function n(a) {
    t.current && t.current !== a && r(t.current), a && a !== t.current && (a.addEventListener(Zs, e), a.addEventListener(Xs, e), t.current = a);
  }
  return S.useEffect(function() {
    return function() {
      r(t.current);
    };
  }, []), [n, r];
});
var Xu = Et() ? Kc : vt, Zu = function(t) {
  return +setTimeout(t, 16);
}, Ju = function(t) {
  return clearTimeout(t);
};
typeof window < "u" && "requestAnimationFrame" in window && (Zu = function(t) {
  return window.requestAnimationFrame(t);
}, Ju = function(t) {
  return window.cancelAnimationFrame(t);
});
var Qs = 0, Sa = /* @__PURE__ */ new Map();
function Qu(e) {
  Sa.delete(e);
}
var or = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  Qs += 1;
  var n = Qs;
  function a(i) {
    if (i === 0)
      Qu(n), t();
    else {
      var o = Zu(function() {
        a(i - 1);
      });
      Sa.set(n, o);
    }
  }
  return a(r), n;
};
or.cancel = function(e) {
  var t = Sa.get(e);
  return Qu(e), Ju(t);
};
process.env.NODE_ENV !== "production" && (or.ids = function() {
  return Sa;
});
const Ap = (function() {
  var e = S.useRef(null);
  function t() {
    or.cancel(e.current);
  }
  function r(n) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    t();
    var i = or(function() {
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
});
var Mp = [ft, Jt, Qt, oo], jp = [ft, Bu], ec = !1, Dp = !0;
function tc(e) {
  return e === Qt || e === oo;
}
const kp = (function(e, t, r) {
  var n = wn(Gs), a = q(n, 2), i = a[0], o = a[1], s = Ap(), l = q(s, 2), u = l[0], c = l[1];
  function d() {
    o(ft, !0);
  }
  var v = t ? jp : Mp;
  return Xu(function() {
    if (i !== Gs && i !== oo) {
      var b = v.indexOf(i), g = v[b + 1], m = r(i);
      m === ec ? o(g, !0) : g && u(function(f) {
        function x() {
          f.isCanceled() || o(g, !0);
        }
        m === !0 ? x() : Promise.resolve(m).then(x);
      });
    }
  }, [e, i]), S.useEffect(function() {
    return function() {
      c();
    };
  }, []), [d, i];
});
function Ip(e, t, r, n) {
  var a = n.motionEnter, i = a === void 0 ? !0 : a, o = n.motionAppear, s = o === void 0 ? !0 : o, l = n.motionLeave, u = l === void 0 ? !0 : l, c = n.motionDeadline, d = n.motionLeaveImmediately, v = n.onAppearPrepare, b = n.onEnterPrepare, g = n.onLeavePrepare, m = n.onAppearStart, f = n.onEnterStart, x = n.onLeaveStart, h = n.onAppearActive, _ = n.onEnterActive, R = n.onLeaveActive, E = n.onAppearEnd, $ = n.onEnterEnd, y = n.onLeaveEnd, w = n.onVisibleChanged, P = wn(), F = q(P, 2), j = F[0], D = F[1], T = Rp(Rt), A = q(T, 2), k = A[0], I = A[1], V = wn(null), z = q(V, 2), J = z[0], X = z[1], Q = k(), W = Ne(!1), B = Ne(null);
  function U() {
    return r();
  }
  var de = Ne(!1);
  function ie() {
    I(Rt), X(null, !0);
  }
  var ve = $n(function(Oe) {
    var $e = k();
    if ($e !== Rt) {
      var te = U();
      if (!(Oe && !Oe.deadline && Oe.target !== te)) {
        var ee = de.current, xe;
        $e === qn && ee ? xe = E == null ? void 0 : E(te, Oe) : $e === Bn && ee ? xe = $ == null ? void 0 : $(te, Oe) : $e === Wn && ee && (xe = y == null ? void 0 : y(te, Oe)), ee && xe !== !1 && ie();
      }
    }
  }), le = Tp(ve), fe = q(le, 1), ue = fe[0], we = function($e) {
    switch ($e) {
      case qn:
        return C(C(C({}, ft, v), Jt, m), Qt, h);
      case Bn:
        return C(C(C({}, ft, b), Jt, f), Qt, _);
      case Wn:
        return C(C(C({}, ft, g), Jt, x), Qt, R);
      default:
        return {};
    }
  }, Re = S.useMemo(function() {
    return we(Q);
  }, [Q]), ke = kp(Q, !e, function(Oe) {
    if (Oe === ft) {
      var $e = Re[ft];
      return $e ? $e(U()) : ec;
    }
    if (Y in Re) {
      var te;
      X(((te = Re[Y]) === null || te === void 0 ? void 0 : te.call(Re, U(), null)) || null);
    }
    return Y === Qt && Q !== Rt && (ue(U()), c > 0 && (clearTimeout(B.current), B.current = setTimeout(function() {
      ve({
        deadline: !0
      });
    }, c))), Y === Bu && ie(), Dp;
  }), L = q(ke, 2), _e = L[0], Y = L[1], oe = tc(Y);
  de.current = oe;
  var Me = Ne(null);
  Xu(function() {
    if (!(W.current && Me.current === t)) {
      D(t);
      var Oe = W.current;
      W.current = !0;
      var $e;
      !Oe && t && s && ($e = qn), Oe && t && i && ($e = Bn), (Oe && !t && u || !Oe && d && !t && u) && ($e = Wn);
      var te = we($e);
      $e && (e || te[ft]) ? (I($e), _e()) : I(Rt), Me.current = t;
    }
  }, [t]), vt(function() {
    // Cancel appear
    (Q === qn && !s || // Cancel enter
    Q === Bn && !i || // Cancel leave
    Q === Wn && !u) && I(Rt);
  }, [s, i, u]), vt(function() {
    return function() {
      W.current = !1, clearTimeout(B.current);
    };
  }, []);
  var ce = S.useRef(!1);
  vt(function() {
    j && (ce.current = !0), j !== void 0 && Q === Rt && ((ce.current || j) && (w == null || w(j)), ce.current = !0);
  }, [j, Q]);
  var Le = J;
  return Re[ft] && Y === Jt && (Le = O({
    transition: "none"
  }, Le)), [Q, Y, Le, j ?? t];
}
function Np(e) {
  var t = e;
  Z(e) === "object" && (t = e.transitionSupport);
  function r(a, i) {
    return !!(a.motionName && t && i !== !1);
  }
  var n = /* @__PURE__ */ S.forwardRef(function(a, i) {
    var o = a.visible, s = o === void 0 ? !0 : o, l = a.removeOnLeave, u = l === void 0 ? !0 : l, c = a.forceRender, d = a.children, v = a.motionName, b = a.leavedClassName, g = a.eventProps, m = S.useContext(qu), f = m.motion, x = r(a, f), h = Ne(), _ = Ne();
    function R() {
      try {
        return h.current instanceof HTMLElement ? h.current : ra(_.current);
      } catch {
        return null;
      }
    }
    var E = Ip(x, s, R, a), $ = q(E, 4), y = $[0], w = $[1], P = $[2], F = $[3], j = S.useRef(F);
    F && (j.current = !0);
    var D = S.useCallback(function(z) {
      h.current = z, Wl(i, z);
    }, [i]), T, A = O(O({}, g), {}, {
      visible: s
    });
    if (!d)
      T = null;
    else if (y === Rt)
      F ? T = d(O({}, A), D) : !u && j.current && b ? T = d(O(O({}, A), {}, {
        className: b
      }), D) : c || !u && !b ? T = d(O(O({}, A), {}, {
        style: {
          display: "none"
        }
      }), D) : T = null;
    else {
      var k;
      w === ft ? k = "prepare" : tc(w) ? k = "active" : w === Jt && (k = "start");
      var I = Js(v, "".concat(y, "-").concat(k));
      T = d(O(O({}, A), {}, {
        className: Se(Js(v, y), C(C({}, I, I && k), v, typeof v == "string")),
        style: P
      }), D);
    }
    if (/* @__PURE__ */ S.isValidElement(T) && Yl(T)) {
      var V = Kl(T);
      V || (T = /* @__PURE__ */ S.cloneElement(T, {
        ref: D
      }));
    }
    return /* @__PURE__ */ S.createElement(wp, {
      ref: _
    }, T);
  });
  return n.displayName = "CSSMotion", n;
}
const Vp = Np(Ku);
var _i = "add", $i = "keep", wi = "remove", Ha = "removed";
function Lp(e) {
  var t;
  return e && Z(e) === "object" && "key" in e ? t = e : t = {
    key: e
  }, O(O({}, t), {}, {
    key: String(t.key)
  });
}
function Ri() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  return e.map(Lp);
}
function zp() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = [], n = 0, a = t.length, i = Ri(e), o = Ri(t);
  i.forEach(function(u) {
    for (var c = !1, d = n; d < a; d += 1) {
      var v = o[d];
      if (v.key === u.key) {
        n < d && (r = r.concat(o.slice(n, d).map(function(b) {
          return O(O({}, b), {}, {
            status: _i
          });
        })), n = d), r.push(O(O({}, v), {}, {
          status: $i
        })), n += 1, c = !0;
        break;
      }
    }
    c || r.push(O(O({}, u), {}, {
      status: wi
    }));
  }), n < a && (r = r.concat(o.slice(n).map(function(u) {
    return O(O({}, u), {}, {
      status: _i
    });
  })));
  var s = {};
  r.forEach(function(u) {
    var c = u.key;
    s[c] = (s[c] || 0) + 1;
  });
  var l = Object.keys(s).filter(function(u) {
    return s[u] > 1;
  });
  return l.forEach(function(u) {
    r = r.filter(function(c) {
      var d = c.key, v = c.status;
      return d !== u || v !== wi;
    }), r.forEach(function(c) {
      c.key === u && (c.status = $i);
    });
  }), r;
}
var Hp = ["component", "children", "onVisibleChanged", "onAllRemoved"], qp = ["status"], Bp = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearPrepare", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function Wp(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vp, r = /* @__PURE__ */ (function(n) {
    Ht(i, n);
    var a = qt(i);
    function i() {
      var o;
      Ue(this, i);
      for (var s = arguments.length, l = new Array(s), u = 0; u < s; u++)
        l[u] = arguments[u];
      return o = a.call.apply(a, [this].concat(l)), C(ne(o), "state", {
        keyEntities: []
      }), C(ne(o), "removeKey", function(c) {
        o.setState(function(d) {
          var v = d.keyEntities.map(function(b) {
            return b.key !== c ? b : O(O({}, b), {}, {
              status: Ha
            });
          });
          return {
            keyEntities: v
          };
        }, function() {
          var d = o.state.keyEntities, v = d.filter(function(b) {
            var g = b.status;
            return g !== Ha;
          }).length;
          v === 0 && o.props.onAllRemoved && o.props.onAllRemoved();
        });
      }), o;
    }
    return Ye(i, [{
      key: "render",
      value: function() {
        var s = this, l = this.state.keyEntities, u = this.props, c = u.component, d = u.children, v = u.onVisibleChanged;
        u.onAllRemoved;
        var b = lt(u, Hp), g = c || S.Fragment, m = {};
        return Bp.forEach(function(f) {
          m[f] = b[f], delete b[f];
        }), delete b.keys, /* @__PURE__ */ S.createElement(g, b, l.map(function(f, x) {
          var h = f.status, _ = lt(f, qp), R = h === _i || h === $i;
          return /* @__PURE__ */ S.createElement(t, Ke({}, m, {
            key: _.key,
            visible: R,
            eventProps: _,
            onVisibleChanged: function($) {
              v == null || v($, {
                key: _.key
              }), $ || s.removeKey(_.key);
            }
          }), function(E, $) {
            return d(O(O({}, E), {}, {
              index: x
            }), $);
          });
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function(s, l) {
        var u = s.keys, c = l.keyEntities, d = Ri(u), v = zp(c, d);
        return {
          keyEntities: v.filter(function(b) {
            var g = c.find(function(m) {
              var f = m.key;
              return b.key === f;
            });
            return !(g && g.status === Ha && b.status === wi);
          })
        };
      }
    }]), i;
  })(S.Component);
  return C(r, "defaultProps", {
    component: "div"
  }), r;
}
Wp(Ku);
function Up(e) {
  const {
    children: t
  } = e, [, r] = ya(), {
    motion: n
  } = r, a = S.useRef(!1);
  return a.current = a.current || n === !1, a.current ? /* @__PURE__ */ S.createElement($p, {
    motion: n
  }, t) : t;
}
const rc = /* @__PURE__ */ S.memo(({
  dropdownMatchSelectWidth: e
}) => (Nt("ConfigProvider").deprecated(e === void 0, "dropdownMatchSelectWidth", "popupMatchSelectWidth"), null));
process.env.NODE_ENV !== "production" && (rc.displayName = "PropWarning");
const Yp = process.env.NODE_ENV !== "production" ? rc : () => null;
var Gp = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
let Pi = !1;
process.env.NODE_ENV;
const Kp = ["getTargetContainer", "getPopupContainer", "renderEmpty", "input", "pagination", "form", "select", "button"];
let nc;
function Xp() {
  return nc || Ei;
}
function Zp(e) {
  return Object.keys(e).some((t) => t.endsWith("Color"));
}
const Jp = (e) => {
  const {
    prefixCls: t,
    iconPrefixCls: r,
    theme: n,
    holderRender: a
  } = e;
  t !== void 0 && (nc = t), n && Zp(n) && (process.env.NODE_ENV !== "production" && pa(!1, "ConfigProvider", "`config` of css variable theme is not work in v5. Please use new `theme` config instead."), Yv(Xp(), n));
}, Qp = (e) => {
  const {
    children: t,
    csp: r,
    autoInsertSpaceInButton: n,
    alert: a,
    anchor: i,
    form: o,
    locale: s,
    componentSize: l,
    direction: u,
    space: c,
    splitter: d,
    virtual: v,
    dropdownMatchSelectWidth: b,
    popupMatchSelectWidth: g,
    popupOverflow: m,
    legacyLocale: f,
    parentContext: x,
    iconPrefixCls: h,
    theme: _,
    componentDisabled: R,
    segmented: E,
    statistic: $,
    spin: y,
    calendar: w,
    carousel: P,
    cascader: F,
    collapse: j,
    typography: D,
    checkbox: T,
    descriptions: A,
    divider: k,
    drawer: I,
    skeleton: V,
    steps: z,
    image: J,
    layout: X,
    list: Q,
    mentions: W,
    modal: B,
    progress: U,
    result: de,
    slider: ie,
    breadcrumb: ve,
    menu: le,
    pagination: fe,
    input: ue,
    textArea: we,
    empty: Re,
    badge: ke,
    radio: L,
    rate: _e,
    switch: Y,
    transfer: oe,
    avatar: Me,
    message: ce,
    tag: Le,
    table: Oe,
    card: $e,
    tabs: te,
    timeline: ee,
    timePicker: xe,
    upload: rt,
    notification: Xe,
    tree: Ze,
    colorPicker: nt,
    datePicker: mt,
    rangePicker: vr,
    flex: pr,
    wave: Fe,
    dropdown: pe,
    warning: at,
    tour: Ct,
    tooltip: Ca,
    popover: hr,
    popconfirm: An,
    floatButtonGroup: _t,
    variant: mr,
    inputNumber: gr,
    treeSelect: Mn
  } = e, jn = S.useCallback((je, p) => {
    const {
      prefixCls: M
    } = e;
    if (p)
      return p;
    const N = M || x.getPrefixCls("");
    return je ? `${N}-${je}` : N;
  }, [x.getPrefixCls, e.prefixCls]), Tt = h || x.iconPrefixCls || no, Wt = r || x.csp;
  bp(Tt, Wt);
  const At = Ep(_, x.theme, {
    prefixCls: jn("")
  });
  process.env.NODE_ENV !== "production" && (Pi = Pi || !!At);
  const Ut = {
    csp: Wt,
    autoInsertSpaceInButton: n,
    alert: a,
    anchor: i,
    locale: s || f,
    direction: u,
    space: c,
    splitter: d,
    virtual: v,
    popupMatchSelectWidth: g ?? b,
    popupOverflow: m,
    getPrefixCls: jn,
    iconPrefixCls: Tt,
    theme: At,
    segmented: E,
    statistic: $,
    spin: y,
    calendar: w,
    carousel: P,
    cascader: F,
    collapse: j,
    typography: D,
    checkbox: T,
    descriptions: A,
    divider: k,
    drawer: I,
    skeleton: V,
    steps: z,
    image: J,
    input: ue,
    textArea: we,
    layout: X,
    list: Q,
    mentions: W,
    modal: B,
    progress: U,
    result: de,
    slider: ie,
    breadcrumb: ve,
    menu: le,
    pagination: fe,
    empty: Re,
    badge: ke,
    radio: L,
    rate: _e,
    switch: Y,
    transfer: oe,
    avatar: Me,
    message: ce,
    tag: Le,
    table: Oe,
    card: $e,
    tabs: te,
    timeline: ee,
    timePicker: xe,
    upload: rt,
    notification: Xe,
    tree: Ze,
    colorPicker: nt,
    datePicker: mt,
    rangePicker: vr,
    flex: pr,
    wave: Fe,
    dropdown: pe,
    warning: at,
    tour: Ct,
    tooltip: Ca,
    popover: hr,
    popconfirm: An,
    floatButtonGroup: _t,
    variant: mr,
    inputNumber: gr,
    treeSelect: Mn
  };
  process.env.NODE_ENV !== "production" && Nt("ConfigProvider")(!("autoInsertSpaceInButton" in e), "deprecated", "`autoInsertSpaceInButton` is deprecated. Please use `{ button: { autoInsertSpace: boolean }}` instead.");
  const $t = Object.assign({}, x);
  Object.keys(Ut).forEach((je) => {
    Ut[je] !== void 0 && ($t[je] = Ut[je]);
  }), Kp.forEach((je) => {
    const p = e[je];
    p && ($t[je] = p);
  }), typeof n < "u" && ($t.button = Object.assign({
    autoInsertSpace: n
  }, $t.button));
  const wt = Ui(() => $t, $t, (je, p) => {
    const M = Object.keys(je), N = Object.keys(p);
    return M.length !== N.length || M.some((G) => je[G] !== p[G]);
  }), {
    layer: br
  } = S.useContext(Pn), Dn = S.useMemo(() => ({
    prefixCls: Tt,
    csp: Wt,
    layer: br ? "antd" : void 0
  }), [Tt, Wt, br]);
  let ze = /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(Yp, {
    dropdownMatchSelectWidth: b
  }), t);
  const kn = S.useMemo(() => {
    var je, p, M, N;
    return Zt(((je = ba.Form) === null || je === void 0 ? void 0 : je.defaultValidateMessages) || {}, ((M = (p = wt.locale) === null || p === void 0 ? void 0 : p.Form) === null || M === void 0 ? void 0 : M.defaultValidateMessages) || {}, ((N = wt.form) === null || N === void 0 ? void 0 : N.validateMessages) || {}, (o == null ? void 0 : o.validateMessages) || {});
  }, [wt, o == null ? void 0 : o.validateMessages]);
  Object.keys(kn).length > 0 && (ze = /* @__PURE__ */ S.createElement(Cv.Provider, {
    value: kn
  }, ze)), s && (ze = /* @__PURE__ */ S.createElement(Pu, {
    locale: s,
    _ANT_MARK__: Ru
  }, ze)), ze = /* @__PURE__ */ S.createElement(ro.Provider, {
    value: Dn
  }, ze), l && (ze = /* @__PURE__ */ S.createElement(Kv, {
    size: l
  }, ze)), ze = /* @__PURE__ */ S.createElement(Up, null, ze);
  const _a = S.useMemo(() => {
    const je = At || {}, {
      algorithm: p,
      token: M,
      components: N,
      cssVar: G
    } = je, he = Gp(je, ["algorithm", "token", "components", "cssVar"]), me = p && (!Array.isArray(p) || p.length > 0) ? ri(p) : Au, ae = {};
    Object.entries(N || {}).forEach(([Be, Te]) => {
      const ge = Object.assign({}, Te);
      "algorithm" in ge && (ge.algorithm === !0 ? ge.theme = me : (Array.isArray(ge.algorithm) || typeof ge.algorithm == "function") && (ge.theme = ri(ge.algorithm)), delete ge.algorithm), ae[Be] = ge;
    });
    const re = Object.assign(Object.assign({}, Cn), M);
    return Object.assign(Object.assign({}, he), {
      theme: me,
      token: re,
      components: ae,
      override: Object.assign({
        override: re
      }, ae),
      cssVar: G
    });
  }, [At]);
  return _ && (ze = /* @__PURE__ */ S.createElement(Mu.Provider, {
    value: _a
  }, ze)), wt.warning && (ze = /* @__PURE__ */ S.createElement(Ql.Provider, {
    value: wt.warning
  }, ze)), R !== void 0 && (ze = /* @__PURE__ */ S.createElement(Gv, {
    disabled: R
  }, ze)), /* @__PURE__ */ S.createElement(Ft.Provider, {
    value: wt
  }, ze);
}, dr = (e) => {
  const t = S.useContext(Ft), r = S.useContext(wu);
  return /* @__PURE__ */ S.createElement(Qp, Object.assign({
    parentContext: t,
    legacyLocale: r
  }, e));
};
dr.ConfigContext = Ft;
dr.SizeContext = ir;
dr.config = Jp;
dr.useConfig = Xv;
Object.defineProperty(dr, "SizeContext", {
  get: () => (process.env.NODE_ENV !== "production" && pa(!1, "ConfigProvider", "ConfigProvider.SizeContext is deprecated. Please use `ConfigProvider.useConfig().componentSize` instead."), ir)
});
process.env.NODE_ENV !== "production" && (dr.displayName = "ConfigProvider");
function ac(e, t) {
  this.v = e, this.k = t;
}
function We(e, t, r, n) {
  var a = Object.defineProperty;
  try {
    a({}, "", {});
  } catch {
    a = 0;
  }
  We = function(o, s, l, u) {
    function c(d, v) {
      We(o, d, function(b) {
        return this._invoke(d, v, b);
      });
    }
    s ? a ? a(o, s, {
      value: l,
      enumerable: !u,
      configurable: !u,
      writable: !u
    }) : o[s] = l : (c("next", 0), c("throw", 1), c("return", 2));
  }, We(e, t, r, n);
}
function so() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e, t, r = typeof Symbol == "function" ? Symbol : {}, n = r.iterator || "@@iterator", a = r.toStringTag || "@@toStringTag";
  function i(b, g, m, f) {
    var x = g && g.prototype instanceof s ? g : s, h = Object.create(x.prototype);
    return We(h, "_invoke", (function(_, R, E) {
      var $, y, w, P = 0, F = E || [], j = !1, D = {
        p: 0,
        n: 0,
        v: e,
        a: T,
        f: T.bind(e, 4),
        d: function(k, I) {
          return $ = k, y = 0, w = e, D.n = I, o;
        }
      };
      function T(A, k) {
        for (y = A, w = k, t = 0; !j && P && !I && t < F.length; t++) {
          var I, V = F[t], z = D.p, J = V[2];
          A > 3 ? (I = J === k) && (w = V[(y = V[4]) ? 5 : (y = 3, 3)], V[4] = V[5] = e) : V[0] <= z && ((I = A < 2 && z < V[1]) ? (y = 0, D.v = k, D.n = V[1]) : z < J && (I = A < 3 || V[0] > k || k > J) && (V[4] = A, V[5] = k, D.n = J, y = 0));
        }
        if (I || A > 1) return o;
        throw j = !0, k;
      }
      return function(A, k, I) {
        if (P > 1) throw TypeError("Generator is already running");
        for (j && k === 1 && T(k, I), y = k, w = I; (t = y < 2 ? e : w) || !j; ) {
          $ || (y ? y < 3 ? (y > 1 && (D.n = -1), T(y, w)) : D.n = w : D.v = w);
          try {
            if (P = 2, $) {
              if (y || (A = "next"), t = $[A]) {
                if (!(t = t.call($, w))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                w = t.value, y < 2 && (y = 0);
              } else y === 1 && (t = $.return) && t.call($), y < 2 && (w = TypeError("The iterator does not provide a '" + A + "' method"), y = 1);
              $ = e;
            } else if ((t = (j = D.n < 0) ? w : _.call(R, D)) !== o) break;
          } catch (V) {
            $ = e, y = 1, w = V;
          } finally {
            P = 1;
          }
        }
        return {
          value: t,
          done: j
        };
      };
    })(b, m, f), !0), h;
  }
  var o = {};
  function s() {
  }
  function l() {
  }
  function u() {
  }
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (We(t = {}, n, function() {
    return this;
  }), t), d = u.prototype = s.prototype = Object.create(c);
  function v(b) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(b, u) : (b.__proto__ = u, We(b, a, "GeneratorFunction")), b.prototype = Object.create(d), b;
  }
  return l.prototype = u, We(d, "constructor", u), We(u, "constructor", l), l.displayName = "GeneratorFunction", We(u, a, "GeneratorFunction"), We(d), We(d, a, "Generator"), We(d, n, function() {
    return this;
  }), We(d, "toString", function() {
    return "[object Generator]";
  }), (so = function() {
    return {
      w: i,
      m: v
    };
  })();
}
function la(e, t) {
  function r(a, i, o, s) {
    try {
      var l = e[a](i), u = l.value;
      return u instanceof ac ? t.resolve(u.v).then(function(c) {
        r("next", c, o, s);
      }, function(c) {
        r("throw", c, o, s);
      }) : t.resolve(u).then(function(c) {
        l.value = c, o(l);
      }, function(c) {
        return r("throw", c, o, s);
      });
    } catch (c) {
      s(c);
    }
  }
  var n;
  this.next || (We(la.prototype), We(la.prototype, typeof Symbol == "function" && Symbol.asyncIterator || "@asyncIterator", function() {
    return this;
  })), We(this, "_invoke", function(a, i, o) {
    function s() {
      return new t(function(l, u) {
        r(a, o, l, u);
      });
    }
    return n = n ? n.then(s, s) : s();
  }, !0);
}
function ic(e, t, r, n, a) {
  return new la(so().w(e, t, r, n), a || Promise);
}
function eh(e, t, r, n, a) {
  var i = ic(e, t, r, n, a);
  return i.next().then(function(o) {
    return o.done ? o.value : i.next();
  });
}
function th(e) {
  var t = Object(e), r = [];
  for (var n in t) r.unshift(n);
  return function a() {
    for (; r.length; ) if ((n = r.pop()) in t) return a.value = n, a.done = !1, a;
    return a.done = !0, a;
  };
}
function el(e) {
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
  throw new TypeError(Z(e) + " is not iterable");
}
function ct() {
  var e = so(), t = e.m(ct), r = (Object.getPrototypeOf ? Object.getPrototypeOf(t) : t.__proto__).constructor;
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
    return function(u) {
      s || (s = {
        stop: function() {
          return l(u.a, 2);
        },
        catch: function() {
          return u.v;
        },
        abrupt: function(d, v) {
          return l(u.a, a[d], v);
        },
        delegateYield: function(d, v, b) {
          return s.resultName = v, l(u.d, el(d), b);
        },
        finish: function(d) {
          return l(u.f, d);
        }
      }, l = function(d, v, b) {
        u.p = s.prev, u.n = s.next;
        try {
          return d(v, b);
        } finally {
          s.next = u.n;
        }
      }), s.resultName && (s[s.resultName] = u.v, s.resultName = void 0), s.sent = u.v, s.next = u.n;
      try {
        return o.call(this, s);
      } finally {
        u.p = s.prev, u.n = s.next;
      }
    };
  }
  return (ct = function() {
    return {
      wrap: function(l, u, c, d) {
        return e.w(i(l), u, c, d && d.reverse());
      },
      isGeneratorFunction: n,
      mark: e.m,
      awrap: function(l, u) {
        return new ac(l, u);
      },
      AsyncIterator: la,
      async: function(l, u, c, d, v) {
        return (n(u) ? ic : eh)(i(l), u, c, d, v);
      },
      keys: th,
      values: el
    };
  })();
}
function tl(e, t, r, n, a, i, o) {
  try {
    var s = e[i](o), l = s.value;
  } catch (u) {
    return void r(u);
  }
  s.done ? t(l) : Promise.resolve(l).then(n, a);
}
function On(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(n, a) {
      var i = e.apply(t, r);
      function o(l) {
        tl(i, n, a, o, s, "next", l);
      }
      function s(l) {
        tl(i, n, a, o, s, "throw", l);
      }
      o(void 0);
    });
  };
}
const oc = (e) => {
  const t = H.useContext(ir);
  return H.useMemo(() => e ? typeof e == "string" ? e ?? t : typeof e == "function" ? e(t) : t : t, [e, t]);
};
function ua(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [];
  return H.Children.forEach(e, function(n) {
    n == null && !t.keepEmpty || (Array.isArray(n) ? r = r.concat(ua(n)) : Bl(n) && n.props ? r = r.concat(ua(n.props.children, t)) : r.push(n));
  }), r;
}
const sc = /* @__PURE__ */ S.createContext(null), lc = (e, t) => {
  const r = S.useContext(sc), n = S.useMemo(() => {
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
}, rh = (e) => {
  const {
    children: t
  } = e;
  return /* @__PURE__ */ S.createElement(sc.Provider, {
    value: null
  }, t);
}, rl = /^[\u4E00-\u9FA5]{2}$/;
rl.test.bind(rl);
function Ug(e) {
  return typeof e == "string";
}
["default", "primary", "danger"].concat(K(up));
var Yn = 2, nl = 0.16, nh = 0.05, ah = 0.05, ih = 0.15, uc = 5, cc = 4, oh = [{
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
function al(e, t, r) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = r ? Math.round(e.h) - Yn * t : Math.round(e.h) + Yn * t : n = r ? Math.round(e.h) + Yn * t : Math.round(e.h) - Yn * t, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function il(e, t, r) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return r ? n = e.s - nl * t : t === cc ? n = e.s + nl : n = e.s + nh * t, n > 1 && (n = 1), r && t === uc && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Math.round(n * 100) / 100;
}
function ol(e, t, r) {
  var n;
  return r ? n = e.v + ah * t : n = e.v - ih * t, n = Math.max(0, Math.min(1, n)), Math.round(n * 100) / 100;
}
function sh(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [], n = new Pe(e), a = n.toHsv(), i = uc; i > 0; i -= 1) {
    var o = new Pe({
      h: al(a, i, !0),
      s: il(a, i, !0),
      v: ol(a, i, !0)
    });
    r.push(o);
  }
  r.push(n);
  for (var s = 1; s <= cc; s += 1) {
    var l = new Pe({
      h: al(a, s),
      s: il(a, s),
      v: ol(a, s)
    });
    r.push(l);
  }
  return t.theme === "dark" ? oh.map(function(u) {
    var c = u.index, d = u.amount;
    return new Pe(t.backgroundColor || "#141414").mix(r[c], d).toHexString();
  }) : r.map(function(u) {
    return u.toHexString();
  });
}
var Oi = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
Oi.primary = Oi[5];
function dc(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e);
}
function lh(e) {
  return dc(e) instanceof ShadowRoot;
}
function uh(e) {
  return lh(e) ? dc(e) : null;
}
function ch(e) {
  return e.replace(/-(.)/g, function(t, r) {
    return r.toUpperCase();
  });
}
function dh(e, t) {
  Ae(e, "[@ant-design/icons] ".concat(t));
}
function sl(e) {
  return Z(e) === "object" && typeof e.name == "string" && typeof e.theme == "string" && (Z(e.icon) === "object" || typeof e.icon == "function");
}
function ll() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(e).reduce(function(t, r) {
    var n = e[r];
    switch (r) {
      case "class":
        t.className = n, delete t.class;
        break;
      default:
        delete t[r], t[ch(r)] = n;
    }
    return t;
  }, {});
}
function Fi(e, t, r) {
  return r ? /* @__PURE__ */ H.createElement(e.tag, O(O({
    key: t
  }, ll(e.attrs)), r), (e.children || []).map(function(n, a) {
    return Fi(n, "".concat(t, "-").concat(e.tag, "-").concat(a));
  })) : /* @__PURE__ */ H.createElement(e.tag, O({
    key: t
  }, ll(e.attrs)), (e.children || []).map(function(n, a) {
    return Fi(n, "".concat(t, "-").concat(e.tag, "-").concat(a));
  }));
}
function fc(e) {
  return sh(e)[0];
}
function vc(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
var fh = `
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
`, vh = function(t) {
  var r = xt(ro), n = r.csp, a = r.prefixCls, i = r.layer, o = fh;
  a && (o = o.replace(/anticon/g, a)), i && (o = "@layer ".concat(i, ` {
`).concat(o, `
}`)), vt(function() {
    var s = t.current, l = uh(s);
    kt(o, "@ant-design-icons", {
      prepend: !i,
      csp: n,
      attachTo: l
    });
  }, []);
}, ph = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"], mn = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function hh(e) {
  var t = e.primaryColor, r = e.secondaryColor;
  mn.primaryColor = t, mn.secondaryColor = r || fc(t), mn.calculated = !!r;
}
function mh() {
  return O({}, mn);
}
var fr = function(t) {
  var r = t.icon, n = t.className, a = t.onClick, i = t.style, o = t.primaryColor, s = t.secondaryColor, l = lt(t, ph), u = S.useRef(), c = mn;
  if (o && (c = {
    primaryColor: o,
    secondaryColor: s || fc(o)
  }), vh(u), dh(sl(r), "icon should be icon definiton, but got ".concat(r)), !sl(r))
    return null;
  var d = r;
  return d && typeof d.icon == "function" && (d = O(O({}, d), {}, {
    icon: d.icon(c.primaryColor, c.secondaryColor)
  })), Fi(d.icon, "svg-".concat(d.name), O(O({
    className: n,
    onClick: a,
    style: i,
    "data-icon": d.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }, l), {}, {
    ref: u
  }));
};
fr.displayName = "IconReact";
fr.getTwoToneColors = mh;
fr.setTwoToneColors = hh;
function pc(e) {
  var t = vc(e), r = q(t, 2), n = r[0], a = r[1];
  return fr.setTwoToneColors({
    primaryColor: n,
    secondaryColor: a
  });
}
function gh() {
  var e = fr.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var bh = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
pc(Oi.primary);
var xa = /* @__PURE__ */ S.forwardRef(function(e, t) {
  var r = e.className, n = e.icon, a = e.spin, i = e.rotate, o = e.tabIndex, s = e.onClick, l = e.twoToneColor, u = lt(e, bh), c = S.useContext(ro), d = c.prefixCls, v = d === void 0 ? "anticon" : d, b = c.rootClassName, g = Se(b, v, C(C({}, "".concat(v, "-").concat(n.name), !!n.name), "".concat(v, "-spin"), !!a || n.name === "loading"), r), m = o;
  m === void 0 && s && (m = -1);
  var f = i ? {
    msTransform: "rotate(".concat(i, "deg)"),
    transform: "rotate(".concat(i, "deg)")
  } : void 0, x = vc(l), h = q(x, 2), _ = h[0], R = h[1];
  return /* @__PURE__ */ S.createElement("span", Ke({
    role: "img",
    "aria-label": n.name
  }, u, {
    ref: t,
    tabIndex: m,
    onClick: s,
    className: g
  }), /* @__PURE__ */ S.createElement(fr, {
    icon: n,
    primaryColor: _,
    secondaryColor: R,
    style: f
  }));
});
xa.displayName = "AntdIcon";
xa.getTwoToneColor = gh;
xa.setTwoToneColor = pc;
function yh(e, t, r) {
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
function Sh(e, t, r) {
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
function xh(e, t = {
  focus: !0
}) {
  const {
    componentCls: r
  } = e, n = `${r}-compact`;
  return {
    [n]: Object.assign(Object.assign({}, yh(e, n, t)), Sh(r, n, t))
  };
}
function Eh(e) {
  return !!(e.addonBefore || e.addonAfter);
}
function Ch(e) {
  return !!(e.prefix || e.suffix || e.allowClear);
}
function ul(e, t, r) {
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
function ca(e, t, r, n) {
  if (r) {
    var a = t;
    if (t.type === "click") {
      a = ul(t, e, ""), r(a);
      return;
    }
    if (e.type !== "file" && n !== void 0) {
      a = ul(t, e, n), r(a);
      return;
    }
    r(a);
  }
}
function hc(e, t) {
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
var mc = /* @__PURE__ */ H.forwardRef(function(e, t) {
  var r, n, a, i = e.inputElement, o = e.children, s = e.prefixCls, l = e.prefix, u = e.suffix, c = e.addonBefore, d = e.addonAfter, v = e.className, b = e.style, g = e.disabled, m = e.readOnly, f = e.focused, x = e.triggerFocus, h = e.allowClear, _ = e.value, R = e.handleReset, E = e.hidden, $ = e.classes, y = e.classNames, w = e.dataAttrs, P = e.styles, F = e.components, j = e.onClear, D = o ?? i, T = (F == null ? void 0 : F.affixWrapper) || "span", A = (F == null ? void 0 : F.groupWrapper) || "span", k = (F == null ? void 0 : F.wrapper) || "span", I = (F == null ? void 0 : F.groupAddon) || "span", V = Ne(null), z = function(_e) {
    var Y;
    (Y = V.current) !== null && Y !== void 0 && Y.contains(_e.target) && (x == null || x());
  }, J = Ch(e), X = /* @__PURE__ */ Xc(D, {
    value: _,
    className: Se((r = D.props) === null || r === void 0 ? void 0 : r.className, !J && (y == null ? void 0 : y.variant)) || null
  }), Q = Ne(null);
  if (H.useImperativeHandle(t, function() {
    return {
      nativeElement: Q.current || V.current
    };
  }), J) {
    var W = null;
    if (h) {
      var B = !g && !m && _, U = "".concat(s, "-clear-icon"), de = Z(h) === "object" && h !== null && h !== void 0 && h.clearIcon ? h.clearIcon : "✖";
      W = /* @__PURE__ */ H.createElement("button", {
        type: "button",
        tabIndex: -1,
        onClick: function(_e) {
          R == null || R(_e), j == null || j();
        },
        onMouseDown: function(_e) {
          return _e.preventDefault();
        },
        className: Se(U, C(C({}, "".concat(U, "-hidden"), !B), "".concat(U, "-has-suffix"), !!u))
      }, de);
    }
    var ie = "".concat(s, "-affix-wrapper"), ve = Se(ie, C(C(C(C(C({}, "".concat(s, "-disabled"), g), "".concat(ie, "-disabled"), g), "".concat(ie, "-focused"), f), "".concat(ie, "-readonly"), m), "".concat(ie, "-input-with-clear-btn"), u && h && _), $ == null ? void 0 : $.affixWrapper, y == null ? void 0 : y.affixWrapper, y == null ? void 0 : y.variant), le = (u || h) && /* @__PURE__ */ H.createElement("span", {
      className: Se("".concat(s, "-suffix"), y == null ? void 0 : y.suffix),
      style: P == null ? void 0 : P.suffix
    }, W, u);
    X = /* @__PURE__ */ H.createElement(T, Ke({
      className: ve,
      style: P == null ? void 0 : P.affixWrapper,
      onClick: z
    }, w == null ? void 0 : w.affixWrapper, {
      ref: V
    }), l && /* @__PURE__ */ H.createElement("span", {
      className: Se("".concat(s, "-prefix"), y == null ? void 0 : y.prefix),
      style: P == null ? void 0 : P.prefix
    }, l), X, le);
  }
  if (Eh(e)) {
    var fe = "".concat(s, "-group"), ue = "".concat(fe, "-addon"), we = "".concat(fe, "-wrapper"), Re = Se("".concat(s, "-wrapper"), fe, $ == null ? void 0 : $.wrapper, y == null ? void 0 : y.wrapper), ke = Se(we, C({}, "".concat(we, "-disabled"), g), $ == null ? void 0 : $.group, y == null ? void 0 : y.groupWrapper);
    X = /* @__PURE__ */ H.createElement(A, {
      className: ke,
      ref: Q
    }, /* @__PURE__ */ H.createElement(k, {
      className: Re
    }, c && /* @__PURE__ */ H.createElement(I, {
      className: ue
    }, c), X, d && /* @__PURE__ */ H.createElement(I, {
      className: ue
    }, d)));
  }
  return /* @__PURE__ */ H.cloneElement(X, {
    className: Se((n = X.props) === null || n === void 0 ? void 0 : n.className, v) || null,
    style: O(O({}, (a = X.props) === null || a === void 0 ? void 0 : a.style), b),
    hidden: E
  });
}), _h = ["show"];
function gc(e, t) {
  return S.useMemo(function() {
    var r = {};
    t && (r.show = Z(t) === "object" && t.formatter ? t.formatter : !!t), r = O(O({}, r), e);
    var n = r, a = n.show, i = lt(n, _h);
    return O(O({}, i), {}, {
      show: !!a,
      showFormatter: typeof a == "function" ? a : void 0,
      strategy: i.strategy || function(o) {
        return o.length;
      }
    });
  }, [e, t]);
}
var $h = ["autoComplete", "onChange", "onFocus", "onBlur", "onPressEnter", "onKeyDown", "onKeyUp", "prefixCls", "disabled", "htmlSize", "className", "maxLength", "suffix", "showCount", "count", "type", "classes", "classNames", "styles", "onCompositionStart", "onCompositionEnd"], wh = /* @__PURE__ */ Wi(function(e, t) {
  var r = e.autoComplete, n = e.onChange, a = e.onFocus, i = e.onBlur, o = e.onPressEnter, s = e.onKeyDown, l = e.onKeyUp, u = e.prefixCls, c = u === void 0 ? "rc-input" : u, d = e.disabled, v = e.htmlSize, b = e.className, g = e.maxLength, m = e.suffix, f = e.showCount, x = e.count, h = e.type, _ = h === void 0 ? "text" : h, R = e.classes, E = e.classNames, $ = e.styles, y = e.onCompositionStart, w = e.onCompositionEnd, P = lt(e, $h), F = Xa(!1), j = q(F, 2), D = j[0], T = j[1], A = Ne(!1), k = Ne(!1), I = Ne(null), V = Ne(null), z = function(ee) {
    I.current && hc(I.current, ee);
  }, J = ao(e.defaultValue, {
    value: e.value
  }), X = q(J, 2), Q = X[0], W = X[1], B = Q == null ? "" : String(Q), U = Xa(null), de = q(U, 2), ie = de[0], ve = de[1], le = gc(x, f), fe = le.max || g, ue = le.strategy(B), we = !!fe && ue > fe;
  wl(t, function() {
    var te;
    return {
      focus: z,
      blur: function() {
        var xe;
        (xe = I.current) === null || xe === void 0 || xe.blur();
      },
      setSelectionRange: function(xe, rt, Xe) {
        var Ze;
        (Ze = I.current) === null || Ze === void 0 || Ze.setSelectionRange(xe, rt, Xe);
      },
      select: function() {
        var xe;
        (xe = I.current) === null || xe === void 0 || xe.select();
      },
      input: I.current,
      nativeElement: ((te = V.current) === null || te === void 0 ? void 0 : te.nativeElement) || I.current
    };
  }), vt(function() {
    k.current && (k.current = !1), T(function(te) {
      return te && d ? !1 : te;
    });
  }, [d]);
  var Re = function(ee, xe, rt) {
    var Xe = xe;
    if (!A.current && le.exceedFormatter && le.max && le.strategy(xe) > le.max) {
      if (Xe = le.exceedFormatter(xe, {
        max: le.max
      }), xe !== Xe) {
        var Ze, nt;
        ve([((Ze = I.current) === null || Ze === void 0 ? void 0 : Ze.selectionStart) || 0, ((nt = I.current) === null || nt === void 0 ? void 0 : nt.selectionEnd) || 0]);
      }
    } else if (rt.source === "compositionEnd")
      return;
    W(Xe), I.current && ca(I.current, ee, n, Xe);
  };
  vt(function() {
    if (ie) {
      var te;
      (te = I.current) === null || te === void 0 || te.setSelectionRange.apply(te, K(ie));
    }
  }, [ie]);
  var ke = function(ee) {
    Re(ee, ee.target.value, {
      source: "change"
    });
  }, L = function(ee) {
    A.current = !1, Re(ee, ee.currentTarget.value, {
      source: "compositionEnd"
    }), w == null || w(ee);
  }, _e = function(ee) {
    o && ee.key === "Enter" && !k.current && (k.current = !0, o(ee)), s == null || s(ee);
  }, Y = function(ee) {
    ee.key === "Enter" && (k.current = !1), l == null || l(ee);
  }, oe = function(ee) {
    T(!0), a == null || a(ee);
  }, Me = function(ee) {
    k.current && (k.current = !1), T(!1), i == null || i(ee);
  }, ce = function(ee) {
    W(""), z(), I.current && ca(I.current, ee, n);
  }, Le = we && "".concat(c, "-out-of-range"), Oe = function() {
    var ee = Ud(e, [
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
      onChange: ke,
      onFocus: oe,
      onBlur: Me,
      onKeyDown: _e,
      onKeyUp: Y,
      className: Se(c, C({}, "".concat(c, "-disabled"), d), E == null ? void 0 : E.input),
      style: $ == null ? void 0 : $.input,
      ref: I,
      size: v,
      type: _,
      onCompositionStart: function(rt) {
        A.current = !0, y == null || y(rt);
      },
      onCompositionEnd: L
    }));
  }, $e = function() {
    var ee = Number(fe) > 0;
    if (m || le.show) {
      var xe = le.showFormatter ? le.showFormatter({
        value: B,
        count: ue,
        maxLength: fe
      }) : "".concat(ue).concat(ee ? " / ".concat(fe) : "");
      return /* @__PURE__ */ H.createElement(H.Fragment, null, le.show && /* @__PURE__ */ H.createElement("span", {
        className: Se("".concat(c, "-show-count-suffix"), C({}, "".concat(c, "-show-count-has-suffix"), !!m), E == null ? void 0 : E.count),
        style: O({}, $ == null ? void 0 : $.count)
      }, xe), m);
    }
    return null;
  };
  return /* @__PURE__ */ H.createElement(mc, Ke({}, P, {
    prefixCls: c,
    className: Se(b, Le),
    handleReset: ce,
    value: B,
    focused: D,
    triggerFocus: z,
    suffix: $e(),
    disabled: d,
    classes: R,
    classNames: E,
    styles: $,
    ref: V
  }), Oe());
}), Ti = /* @__PURE__ */ S.createContext(null);
function Rh(e) {
  var t = e.children, r = e.onBatchResize, n = S.useRef(0), a = S.useRef([]), i = S.useContext(Ti), o = S.useCallback(function(s, l, u) {
    n.current += 1;
    var c = n.current;
    a.current.push({
      size: s,
      element: l,
      data: u
    }), Promise.resolve().then(function() {
      c === n.current && (r == null || r(a.current), a.current = []);
    }), i == null || i(s, l, u);
  }, [r, i]);
  return /* @__PURE__ */ S.createElement(Ti.Provider, {
    value: o
  }, t);
}
var bc = (function() {
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
    (function() {
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
    })()
  );
})(), Ai = typeof window < "u" && typeof document < "u" && window.document === document, da = (function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
})(), Ph = (function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(da) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
})(), Oh = 2;
function Fh(e, t) {
  var r = !1, n = !1, a = 0;
  function i() {
    r && (r = !1, e()), n && s();
  }
  function o() {
    Ph(i);
  }
  function s() {
    var l = Date.now();
    if (r) {
      if (l - a < Oh)
        return;
      n = !0;
    } else
      r = !0, n = !1, setTimeout(o, t);
    a = l;
  }
  return s;
}
var Th = 20, Ah = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], Mh = typeof MutationObserver < "u", jh = (
  /** @class */
  (function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = Fh(this.refresh.bind(this), Th);
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
      !Ai || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), Mh ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !Ai || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var r = t.propertyName, n = r === void 0 ? "" : r, a = Ah.some(function(i) {
        return !!~n.indexOf(i);
      });
      a && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  })()
), yc = (function(e, t) {
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
}), sr = (function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || da;
}), Sc = Ea(0, 0, 0, 0);
function fa(e) {
  return parseFloat(e) || 0;
}
function cl(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return t.reduce(function(n, a) {
    var i = e["border-" + a + "-width"];
    return n + fa(i);
  }, 0);
}
function Dh(e) {
  for (var t = ["top", "right", "bottom", "left"], r = {}, n = 0, a = t; n < a.length; n++) {
    var i = a[n], o = e["padding-" + i];
    r[i] = fa(o);
  }
  return r;
}
function kh(e) {
  var t = e.getBBox();
  return Ea(0, 0, t.width, t.height);
}
function Ih(e) {
  var t = e.clientWidth, r = e.clientHeight;
  if (!t && !r)
    return Sc;
  var n = sr(e).getComputedStyle(e), a = Dh(n), i = a.left + a.right, o = a.top + a.bottom, s = fa(n.width), l = fa(n.height);
  if (n.boxSizing === "border-box" && (Math.round(s + i) !== t && (s -= cl(n, "left", "right") + i), Math.round(l + o) !== r && (l -= cl(n, "top", "bottom") + o)), !Vh(e)) {
    var u = Math.round(s + i) - t, c = Math.round(l + o) - r;
    Math.abs(u) !== 1 && (s -= u), Math.abs(c) !== 1 && (l -= c);
  }
  return Ea(a.left, a.top, s, l);
}
var Nh = /* @__PURE__ */ (function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof sr(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof sr(e).SVGElement && typeof e.getBBox == "function";
  };
})();
function Vh(e) {
  return e === sr(e).document.documentElement;
}
function Lh(e) {
  return Ai ? Nh(e) ? kh(e) : Ih(e) : Sc;
}
function zh(e) {
  var t = e.x, r = e.y, n = e.width, a = e.height, i = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(i.prototype);
  return yc(o, {
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
function Ea(e, t, r, n) {
  return { x: e, y: t, width: r, height: n };
}
var Hh = (
  /** @class */
  (function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = Ea(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = Lh(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  })()
), qh = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t, r) {
      var n = zh(r);
      yc(this, { target: t, contentRect: n });
    }
    return e;
  })()
), Bh = (
  /** @class */
  (function() {
    function e(t, r, n) {
      if (this.activeObservations_ = [], this.observations_ = new bc(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = r, this.callbackCtx_ = n;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof sr(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var r = this.observations_;
        r.has(t) || (r.set(t, new Hh(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof sr(t).Element))
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
          return new qh(n.target, n.broadcastRect());
        });
        this.callback_.call(t, r, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  })()
), xc = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new bc(), Ec = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var r = jh.getInstance(), n = new Bh(t, r, this);
      xc.set(this, n);
    }
    return e;
  })()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  Ec.prototype[e] = function() {
    var t;
    return (t = xc.get(this))[e].apply(t, arguments);
  };
});
var Wh = (function() {
  return typeof da.ResizeObserver < "u" ? da.ResizeObserver : Ec;
})(), St = /* @__PURE__ */ new Map();
function Cc(e) {
  e.forEach(function(t) {
    var r, n = t.target;
    (r = St.get(n)) === null || r === void 0 || r.forEach(function(a) {
      return a(n);
    });
  });
}
var _c = new Wh(Cc);
process.env.NODE_ENV;
process.env.NODE_ENV;
function Uh(e, t) {
  St.has(e) || (St.set(e, /* @__PURE__ */ new Set()), _c.observe(e)), St.get(e).add(t);
}
function Yh(e, t) {
  St.has(e) && (St.get(e).delete(t), St.get(e).size || (_c.unobserve(e), St.delete(e)));
}
var Gh = /* @__PURE__ */ (function(e) {
  Ht(r, e);
  var t = qt(r);
  function r() {
    return Ue(this, r), t.apply(this, arguments);
  }
  return Ye(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
})(S.Component);
function Kh(e, t) {
  var r = e.children, n = e.disabled, a = S.useRef(null), i = S.useRef(null), o = S.useContext(Ti), s = typeof r == "function", l = s ? r(a) : r, u = S.useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  }), c = !s && /* @__PURE__ */ S.isValidElement(l) && Yl(l), d = c ? Kl(l) : null, v = ef(d, a), b = function() {
    var x;
    return ra(a.current) || // Support `nativeElement` format
    (a.current && Z(a.current) === "object" ? ra((x = a.current) === null || x === void 0 ? void 0 : x.nativeElement) : null) || ra(i.current);
  };
  S.useImperativeHandle(t, function() {
    return b();
  });
  var g = S.useRef(e);
  g.current = e;
  var m = S.useCallback(function(f) {
    var x = g.current, h = x.onResize, _ = x.data, R = f.getBoundingClientRect(), E = R.width, $ = R.height, y = f.offsetWidth, w = f.offsetHeight, P = Math.floor(E), F = Math.floor($);
    if (u.current.width !== P || u.current.height !== F || u.current.offsetWidth !== y || u.current.offsetHeight !== w) {
      var j = {
        width: P,
        height: F,
        offsetWidth: y,
        offsetHeight: w
      };
      u.current = j;
      var D = y === Math.round(E) ? E : y, T = w === Math.round($) ? $ : w, A = O(O({}, j), {}, {
        offsetWidth: D,
        offsetHeight: T
      });
      o == null || o(A, f, _), h && Promise.resolve().then(function() {
        h(A, f);
      });
    }
  }, []);
  return S.useEffect(function() {
    var f = b();
    return f && !n && Uh(f, m), function() {
      return Yh(f, m);
    };
  }, [a.current, n]), /* @__PURE__ */ S.createElement(Gh, {
    ref: i
  }, c ? /* @__PURE__ */ S.cloneElement(l, {
    ref: v
  }) : l);
}
var $c = /* @__PURE__ */ S.forwardRef(Kh);
process.env.NODE_ENV !== "production" && ($c.displayName = "SingleObserver");
var Xh = "rc-observer-key";
function Zh(e, t) {
  var r = e.children, n = typeof r == "function" ? [r] : ua(r);
  return process.env.NODE_ENV !== "production" && (n.length > 1 ? bn(!1, "Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.") : n.length === 0 && bn(!1, "`children` of ResizeObserver is empty. Nothing is in observe.")), n.map(function(a, i) {
    var o = (a == null ? void 0 : a.key) || "".concat(Xh, "-").concat(i);
    return /* @__PURE__ */ S.createElement($c, Ke({}, e, {
      key: o,
      ref: i === 0 ? t : void 0
    }), a);
  });
}
var lo = /* @__PURE__ */ S.forwardRef(Zh);
process.env.NODE_ENV !== "production" && (lo.displayName = "ResizeObserver");
lo.Collection = Rh;
var Jh = `
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
`, Qh = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "font-variant", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing", "word-break", "white-space"], qa = {}, Qe;
function em(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = e.getAttribute("id") || e.getAttribute("data-reactid") || e.getAttribute("name");
  if (t && qa[r])
    return qa[r];
  var n = window.getComputedStyle(e), a = n.getPropertyValue("box-sizing") || n.getPropertyValue("-moz-box-sizing") || n.getPropertyValue("-webkit-box-sizing"), i = parseFloat(n.getPropertyValue("padding-bottom")) + parseFloat(n.getPropertyValue("padding-top")), o = parseFloat(n.getPropertyValue("border-bottom-width")) + parseFloat(n.getPropertyValue("border-top-width")), s = Qh.map(function(u) {
    return "".concat(u, ":").concat(n.getPropertyValue(u));
  }).join(";"), l = {
    sizingStyle: s,
    paddingSize: i,
    borderSize: o,
    boxSizing: a
  };
  return t && r && (qa[r] = l), l;
}
function tm(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  Qe || (Qe = document.createElement("textarea"), Qe.setAttribute("tab-index", "-1"), Qe.setAttribute("aria-hidden", "true"), Qe.setAttribute("name", "hiddenTextarea"), document.body.appendChild(Qe)), e.getAttribute("wrap") ? Qe.setAttribute("wrap", e.getAttribute("wrap")) : Qe.removeAttribute("wrap");
  var a = em(e, t), i = a.paddingSize, o = a.borderSize, s = a.boxSizing, l = a.sizingStyle;
  Qe.setAttribute("style", "".concat(l, ";").concat(Jh)), Qe.value = e.value || e.placeholder || "";
  var u = void 0, c = void 0, d, v = Qe.scrollHeight;
  if (s === "border-box" ? v += o : s === "content-box" && (v -= i), r !== null || n !== null) {
    Qe.value = " ";
    var b = Qe.scrollHeight - i;
    r !== null && (u = b * r, s === "border-box" && (u = u + i + o), v = Math.max(u, v)), n !== null && (c = b * n, s === "border-box" && (c = c + i + o), d = v > c ? "" : "hidden", v = Math.min(c, v));
  }
  var g = {
    height: v,
    overflowY: d,
    resize: "none"
  };
  return u && (g.minHeight = u), c && (g.maxHeight = c), g;
}
var rm = ["prefixCls", "defaultValue", "value", "autoSize", "onResize", "className", "style", "disabled", "onChange", "onInternalAutoSize"], Ba = 0, Wa = 1, Ua = 2, nm = /* @__PURE__ */ S.forwardRef(function(e, t) {
  var r = e, n = r.prefixCls, a = r.defaultValue, i = r.value, o = r.autoSize, s = r.onResize, l = r.className, u = r.style, c = r.disabled, d = r.onChange, v = r.onInternalAutoSize, b = lt(r, rm), g = ao(a, {
    value: i,
    postState: function(U) {
      return U ?? "";
    }
  }), m = q(g, 2), f = m[0], x = m[1], h = function(U) {
    x(U.target.value), d == null || d(U);
  }, _ = S.useRef();
  S.useImperativeHandle(t, function() {
    return {
      textArea: _.current
    };
  });
  var R = S.useMemo(function() {
    return o && Z(o) === "object" ? [o.minRows, o.maxRows] : [];
  }, [o]), E = q(R, 2), $ = E[0], y = E[1], w = !!o, P = S.useState(Ua), F = q(P, 2), j = F[0], D = F[1], T = S.useState(), A = q(T, 2), k = A[0], I = A[1], V = function() {
    D(Ba), process.env.NODE_ENV === "test" && (v == null || v());
  };
  oa(function() {
    w && V();
  }, [i, $, y, w]), oa(function() {
    if (j === Ba)
      D(Wa);
    else if (j === Wa) {
      var B = tm(_.current, !1, $, y);
      D(Ua), I(B);
    }
  }, [j]);
  var z = S.useRef(), J = function() {
    or.cancel(z.current);
  }, X = function(U) {
    j === Ua && (s == null || s(U), o && (J(), z.current = or(function() {
      V();
    })));
  };
  S.useEffect(function() {
    return J;
  }, []);
  var Q = w ? k : null, W = O(O({}, u), Q);
  return (j === Ba || j === Wa) && (W.overflowY = "hidden", W.overflowX = "hidden"), /* @__PURE__ */ S.createElement(lo, {
    onResize: X,
    disabled: !(o || s)
  }, /* @__PURE__ */ S.createElement("textarea", Ke({}, b, {
    ref: _,
    style: W,
    className: Se(n, l, C({}, "".concat(n, "-disabled"), c)),
    disabled: c,
    value: f,
    onChange: h
  })));
}), am = ["defaultValue", "value", "onFocus", "onBlur", "onChange", "allowClear", "maxLength", "onCompositionStart", "onCompositionEnd", "suffix", "prefixCls", "showCount", "count", "className", "style", "disabled", "hidden", "classNames", "styles", "onResize", "onClear", "onPressEnter", "readOnly", "autoSize", "onKeyDown"], im = /* @__PURE__ */ H.forwardRef(function(e, t) {
  var r, n = e.defaultValue, a = e.value, i = e.onFocus, o = e.onBlur, s = e.onChange, l = e.allowClear, u = e.maxLength, c = e.onCompositionStart, d = e.onCompositionEnd, v = e.suffix, b = e.prefixCls, g = b === void 0 ? "rc-textarea" : b, m = e.showCount, f = e.count, x = e.className, h = e.style, _ = e.disabled, R = e.hidden, E = e.classNames, $ = e.styles, y = e.onResize, w = e.onClear, P = e.onPressEnter, F = e.readOnly, j = e.autoSize, D = e.onKeyDown, T = lt(e, am), A = ao(n, {
    value: a,
    defaultValue: n
  }), k = q(A, 2), I = k[0], V = k[1], z = I == null ? "" : String(I), J = H.useState(!1), X = q(J, 2), Q = X[0], W = X[1], B = H.useRef(!1), U = H.useState(null), de = q(U, 2), ie = de[0], ve = de[1], le = Ne(null), fe = Ne(null), ue = function() {
    var pe;
    return (pe = fe.current) === null || pe === void 0 ? void 0 : pe.textArea;
  }, we = function() {
    ue().focus();
  };
  wl(t, function() {
    var Fe;
    return {
      resizableTextArea: fe.current,
      focus: we,
      blur: function() {
        ue().blur();
      },
      nativeElement: ((Fe = le.current) === null || Fe === void 0 ? void 0 : Fe.nativeElement) || ue()
    };
  }), vt(function() {
    W(function(Fe) {
      return !_ && Fe;
    });
  }, [_]);
  var Re = H.useState(null), ke = q(Re, 2), L = ke[0], _e = ke[1];
  H.useEffect(function() {
    if (L) {
      var Fe;
      (Fe = ue()).setSelectionRange.apply(Fe, K(L));
    }
  }, [L]);
  var Y = gc(f, m), oe = (r = Y.max) !== null && r !== void 0 ? r : u, Me = Number(oe) > 0, ce = Y.strategy(z), Le = !!oe && ce > oe, Oe = function(pe, at) {
    var Ct = at;
    !B.current && Y.exceedFormatter && Y.max && Y.strategy(at) > Y.max && (Ct = Y.exceedFormatter(at, {
      max: Y.max
    }), at !== Ct && _e([ue().selectionStart || 0, ue().selectionEnd || 0])), V(Ct), ca(pe.currentTarget, pe, s, Ct);
  }, $e = function(pe) {
    B.current = !0, c == null || c(pe);
  }, te = function(pe) {
    B.current = !1, Oe(pe, pe.currentTarget.value), d == null || d(pe);
  }, ee = function(pe) {
    Oe(pe, pe.target.value);
  }, xe = function(pe) {
    pe.key === "Enter" && P && P(pe), D == null || D(pe);
  }, rt = function(pe) {
    W(!0), i == null || i(pe);
  }, Xe = function(pe) {
    W(!1), o == null || o(pe);
  }, Ze = function(pe) {
    V(""), we(), ca(ue(), pe, s);
  }, nt = v, mt;
  Y.show && (Y.showFormatter ? mt = Y.showFormatter({
    value: z,
    count: ce,
    maxLength: oe
  }) : mt = "".concat(ce).concat(Me ? " / ".concat(oe) : ""), nt = /* @__PURE__ */ H.createElement(H.Fragment, null, nt, /* @__PURE__ */ H.createElement("span", {
    className: Se("".concat(g, "-data-count"), E == null ? void 0 : E.count),
    style: $ == null ? void 0 : $.count
  }, mt)));
  var vr = function(pe) {
    var at;
    y == null || y(pe), (at = ue()) !== null && at !== void 0 && at.style.height && ve(!0);
  }, pr = !j && !m && !l;
  return /* @__PURE__ */ H.createElement(mc, {
    ref: le,
    value: z,
    allowClear: l,
    handleReset: Ze,
    suffix: nt,
    prefixCls: g,
    classNames: O(O({}, E), {}, {
      affixWrapper: Se(E == null ? void 0 : E.affixWrapper, C(C({}, "".concat(g, "-show-count"), m), "".concat(g, "-textarea-allow-clear"), l))
    }),
    disabled: _,
    focused: Q,
    className: Se(x, Le && "".concat(g, "-out-of-range")),
    style: O(O({}, h), ie && !pr ? {
      height: "auto"
    } : {}),
    dataAttrs: {
      affixWrapper: {
        "data-count": typeof mt == "string" ? mt : void 0
      }
    },
    hidden: R,
    readOnly: F,
    onClear: w
  }, /* @__PURE__ */ H.createElement(nm, Ke({}, T, {
    autoSize: j,
    maxLength: u,
    onKeyDown: xe,
    onChange: ee,
    onFocus: rt,
    onBlur: Xe,
    onCompositionStart: $e,
    onCompositionEnd: te,
    className: Se(E == null ? void 0 : E.textarea),
    style: O(O({}, $ == null ? void 0 : $.textarea), {}, {
      resize: h == null ? void 0 : h.resize
    }),
    disabled: _,
    prefixCls: g,
    onResize: vr,
    ref: fe,
    readOnly: F
  })));
}), om = { icon: { tag: "svg", attrs: { "fill-rule": "evenodd", viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" } }] }, name: "close-circle", theme: "filled" }, sm = function(t, r) {
  return /* @__PURE__ */ S.createElement(xa, Ke({}, t, {
    ref: r,
    icon: om
  }));
}, wc = /* @__PURE__ */ S.forwardRef(sm);
process.env.NODE_ENV !== "production" && (wc.displayName = "CloseCircleFilled");
const Rc = (e) => {
  let t;
  return typeof e == "object" && (e != null && e.clearIcon) ? t = e : e && (t = {
    clearIcon: /* @__PURE__ */ H.createElement(wc, null)
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
const Pc = (e, t) => t || e, Oc = (e) => {
  const [, , , , t] = ya();
  return t ? `${e}-css-var` : "";
};
var Dt = "RC_FORM_INTERNAL_HOOKS", Ee = function() {
  Ae(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, lr = /* @__PURE__ */ S.createContext({
  getFieldValue: Ee,
  getFieldsValue: Ee,
  getFieldError: Ee,
  getFieldWarning: Ee,
  getFieldsError: Ee,
  isFieldsTouched: Ee,
  isFieldTouched: Ee,
  isFieldValidating: Ee,
  isFieldsValidating: Ee,
  resetFields: Ee,
  setFields: Ee,
  setFieldValue: Ee,
  setFieldsValue: Ee,
  validateFields: Ee,
  submit: Ee,
  getInternalHooks: function() {
    return Ee(), {
      dispatch: Ee,
      initEntityValue: Ee,
      registerField: Ee,
      useSubscribe: Ee,
      setInitialValues: Ee,
      destroyForm: Ee,
      setCallbacks: Ee,
      registerWatch: Ee,
      getFields: Ee,
      setValidateMessages: Ee,
      setPreserve: Ee,
      getInitialValue: Ee
    };
  }
}), va = /* @__PURE__ */ S.createContext(null);
function ji(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function lm(e) {
  return e && !!e._init;
}
function Di() {
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
var ki = Di();
function um(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
function cm(e, t, r) {
  if (Zi()) return Reflect.construct.apply(null, arguments);
  var n = [null];
  n.push.apply(n, t);
  var a = new (e.bind.apply(e, n))();
  return r && Sn(a, r.prototype), a;
}
function Ii(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Ii = function(n) {
    if (n === null || !um(n)) return n;
    if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
    if (t !== void 0) {
      if (t.has(n)) return t.get(n);
      t.set(n, a);
    }
    function a() {
      return cm(n, arguments, xn(this).constructor);
    }
    return a.prototype = Object.create(n.prototype, {
      constructor: {
        value: a,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), Sn(a, n);
  }, Ii(e);
}
var dm = /%[sdj%]/g, Fc = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (Fc = function(t, r) {
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
function tt(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  var a = 0, i = r.length;
  if (typeof e == "function")
    return e.apply(null, r);
  if (typeof e == "string") {
    var o = e.replace(dm, function(s) {
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
function fm(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern" || e === "tel";
}
function He(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || fm(t) && typeof e == "string" && !e);
}
function vm(e, t, r) {
  var n = [], a = 0, i = e.length;
  function o(s) {
    n.push.apply(n, K(s || [])), a++, a === i && r(n);
  }
  e.forEach(function(s) {
    t(s, o);
  });
}
function dl(e, t, r) {
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
function pm(e) {
  var t = [];
  return Object.keys(e).forEach(function(r) {
    t.push.apply(t, K(e[r] || []));
  }), t;
}
var fl = /* @__PURE__ */ (function(e) {
  Ht(r, e);
  var t = qt(r);
  function r(n, a) {
    var i;
    return Ue(this, r), i = t.call(this, "Async Validation Error"), C(ne(i), "errors", void 0), C(ne(i), "fields", void 0), i.errors = n, i.fields = a, i;
  }
  return Ye(r);
})(/* @__PURE__ */ Ii(Error));
function hm(e, t, r, n, a) {
  if (t.first) {
    var i = new Promise(function(v, b) {
      var g = function(x) {
        return n(x), x.length ? b(new fl(x, Ni(x))) : v(a);
      }, m = pm(e);
      dl(m, r, g);
    });
    return i.catch(function(v) {
      return v;
    }), i;
  }
  var o = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], s = Object.keys(e), l = s.length, u = 0, c = [], d = new Promise(function(v, b) {
    var g = function(f) {
      if (c.push.apply(c, f), u++, u === l)
        return n(c), c.length ? b(new fl(c, Ni(c))) : v(a);
    };
    s.length || (n(c), v(a)), s.forEach(function(m) {
      var f = e[m];
      o.indexOf(m) !== -1 ? dl(f, r, g) : vm(f, r, g);
    });
  });
  return d.catch(function(v) {
    return v;
  }), d;
}
function mm(e) {
  return !!(e && e.message !== void 0);
}
function gm(e, t) {
  for (var r = e, n = 0; n < t.length; n++) {
    if (r == null)
      return r;
    r = r[t[n]];
  }
  return r;
}
function vl(e, t) {
  return function(r) {
    var n;
    return e.fullFields ? n = gm(t, e.fullFields) : n = t[r.field || e.fullField], mm(r) ? (r.field = r.field || e.fullField, r.fieldValue = n, r) : {
      message: typeof r == "function" ? r() : r,
      fieldValue: n,
      field: r.field || e.fullField
    };
  };
}
function pl(e, t) {
  if (t) {
    for (var r in t)
      if (t.hasOwnProperty(r)) {
        var n = t[r];
        Z(n) === "object" && Z(e[r]) === "object" ? e[r] = O(O({}, e[r]), n) : e[r] = n;
      }
  }
  return e;
}
var Kt = "enum", bm = function(t, r, n, a, i) {
  t[Kt] = Array.isArray(t[Kt]) ? t[Kt] : [], t[Kt].indexOf(r) === -1 && a.push(tt(i.messages[Kt], t.fullField, t[Kt].join(", ")));
}, ym = function(t, r, n, a, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(r) || a.push(tt(i.messages.pattern.mismatch, t.fullField, r, t.pattern));
    else if (typeof t.pattern == "string") {
      var o = new RegExp(t.pattern);
      o.test(r) || a.push(tt(i.messages.pattern.mismatch, t.fullField, r, t.pattern));
    }
  }
}, Sm = function(t, r, n, a, i) {
  var o = typeof t.len == "number", s = typeof t.min == "number", l = typeof t.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = r, d = null, v = typeof r == "number", b = typeof r == "string", g = Array.isArray(r);
  if (v ? d = "number" : b ? d = "string" : g && (d = "array"), !d)
    return !1;
  g && (c = r.length), b && (c = r.replace(u, "_").length), o ? c !== t.len && a.push(tt(i.messages[d].len, t.fullField, t.len)) : s && !l && c < t.min ? a.push(tt(i.messages[d].min, t.fullField, t.min)) : l && !s && c > t.max ? a.push(tt(i.messages[d].max, t.fullField, t.max)) : s && l && (c < t.min || c > t.max) && a.push(tt(i.messages[d].range, t.fullField, t.min, t.max));
}, Tc = function(t, r, n, a, i, o) {
  t.required && (!n.hasOwnProperty(t.field) || He(r, o || t.type)) && a.push(tt(i.messages.required, t.fullField));
}, Gn;
const xm = (function() {
  if (Gn)
    return Gn;
  var e = "[a-fA-F\\d:]", t = function($) {
    return $ && $.includeBoundaries ? "(?:(?<=\\s|^)(?=".concat(e, ")|(?<=").concat(e, ")(?=\\s|$))") : "";
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
  ], i = "(?:%[0-9a-zA-Z]{1,})?", o = "(?:".concat(a.join("|"), ")").concat(i), s = new RegExp("(?:^".concat(r, "$)|(?:^").concat(o, "$)")), l = new RegExp("^".concat(r, "$")), u = new RegExp("^".concat(o, "$")), c = function($) {
    return $ && $.exact ? s : new RegExp("(?:".concat(t($)).concat(r).concat(t($), ")|(?:").concat(t($)).concat(o).concat(t($), ")"), "g");
  };
  c.v4 = function(E) {
    return E && E.exact ? l : new RegExp("".concat(t(E)).concat(r).concat(t(E)), "g");
  }, c.v6 = function(E) {
    return E && E.exact ? u : new RegExp("".concat(t(E)).concat(o).concat(t(E)), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", v = "(?:\\S+(?::\\S*)?@)?", b = c.v4().source, g = c.v6().source, m = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", f = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", x = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", h = "(?::\\d{2,5})?", _ = '(?:[/?#][^\\s"]*)?', R = "(?:".concat(d, "|www\\.)").concat(v, "(?:localhost|").concat(b, "|").concat(g, "|").concat(m).concat(f).concat(x, ")").concat(h).concat(_);
  return Gn = new RegExp("(?:^".concat(R, "$)"), "i"), Gn;
});
var Ya = {
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
}, pn = {
  integer: function(t) {
    return pn.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return pn.number(t) && !pn.integer(t);
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
    return Z(t) === "object" && !pn.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(Ya.email);
  },
  tel: function(t) {
    return typeof t == "string" && t.length <= 32 && !!t.match(Ya.tel);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(xm());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(Ya.hex);
  }
}, Em = function(t, r, n, a, i) {
  if (t.required && r === void 0) {
    Tc(t, r, n, a, i);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "tel", "number", "date", "url", "hex"], s = t.type;
  o.indexOf(s) > -1 ? pn[s](r) || a.push(tt(i.messages.types[s], t.fullField, t.type)) : s && Z(r) !== t.type && a.push(tt(i.messages.types[s], t.fullField, t.type));
}, Cm = function(t, r, n, a, i) {
  (/^\s+$/.test(r) || r === "") && a.push(tt(i.messages.whitespace, t.fullField));
};
const se = {
  required: Tc,
  whitespace: Cm,
  type: Em,
  range: Sm,
  enum: bm,
  pattern: ym
};
var _m = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i);
  }
  n(o);
}, $m = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (r == null && !t.required)
      return n();
    se.required(t, r, a, o, i, "array"), r != null && (se.type(t, r, a, o, i), se.range(t, r, a, o, i));
  }
  n(o);
}, wm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && se.type(t, r, a, o, i);
  }
  n(o);
}, Rm = function(t, r, n, a, i) {
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
}, Pm = "enum", Om = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && se[Pm](t, r, a, o, i);
  }
  n(o);
}, Fm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && (se.type(t, r, a, o, i), se.range(t, r, a, o, i));
  }
  n(o);
}, Tm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && (se.type(t, r, a, o, i), se.range(t, r, a, o, i));
  }
  n(o);
}, Am = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && se.type(t, r, a, o, i);
  }
  n(o);
}, Mm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (r === "" && (r = void 0), He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && (se.type(t, r, a, o, i), se.range(t, r, a, o, i));
  }
  n(o);
}, jm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), r !== void 0 && se.type(t, r, a, o, i);
  }
  n(o);
}, Dm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r, "string") && !t.required)
      return n();
    se.required(t, r, a, o, i), He(r, "string") || se.pattern(t, r, a, o, i);
  }
  n(o);
}, km = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r) && !t.required)
      return n();
    se.required(t, r, a, o, i), He(r) || se.type(t, r, a, o, i);
  }
  n(o);
}, Im = function(t, r, n, a, i) {
  var o = [], s = Array.isArray(r) ? "array" : Z(r);
  se.required(t, r, a, o, i, s), n(o);
}, Nm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (He(r, "string") && !t.required)
      return n();
    se.required(t, r, a, o, i, "string"), He(r, "string") || (se.type(t, r, a, o, i), se.range(t, r, a, o, i), se.pattern(t, r, a, o, i), t.whitespace === !0 && se.whitespace(t, r, a, o, i));
  }
  n(o);
}, Kn = function(t, r, n, a, i) {
  var o = t.type, s = [], l = t.required || !t.required && a.hasOwnProperty(t.field);
  if (l) {
    if (He(r, o) && !t.required)
      return n();
    se.required(t, r, a, s, i, o), He(r, o) || se.type(t, r, a, s, i);
  }
  n(s);
};
const gn = {
  string: Nm,
  method: Am,
  number: Mm,
  boolean: wm,
  regexp: km,
  integer: Tm,
  float: Fm,
  array: $m,
  object: jm,
  enum: Om,
  pattern: Dm,
  date: Rm,
  url: Kn,
  hex: Kn,
  email: Kn,
  tel: Kn,
  required: Im,
  any: _m
};
var Fn = /* @__PURE__ */ (function() {
  function e(t) {
    Ue(this, e), C(this, "rules", null), C(this, "_messages", ki), this.define(t);
  }
  return Ye(e, [{
    key: "define",
    value: function(r) {
      var n = this;
      if (!r)
        throw new Error("Cannot configure a schema with no rules");
      if (Z(r) !== "object" || Array.isArray(r))
        throw new Error("Rules must be an object");
      this.rules = {}, Object.keys(r).forEach(function(a) {
        var i = r[a];
        n.rules[a] = Array.isArray(i) ? i : [i];
      });
    }
  }, {
    key: "messages",
    value: function(r) {
      return r && (this._messages = pl(Di(), r)), this._messages;
    }
  }, {
    key: "validate",
    value: function(r) {
      var n = this, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
      }, o = r, s = a, l = i;
      if (typeof s == "function" && (l = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
        return l && l(null, o), Promise.resolve(o);
      function u(g) {
        var m = [], f = {};
        function x(_) {
          if (Array.isArray(_)) {
            var R;
            m = (R = m).concat.apply(R, K(_));
          } else
            m.push(_);
        }
        for (var h = 0; h < g.length; h++)
          x(g[h]);
        m.length ? (f = Ni(m), l(m, f)) : l(null, o);
      }
      if (s.messages) {
        var c = this.messages();
        c === ki && (c = Di()), pl(c, s.messages), s.messages = c;
      } else
        s.messages = this.messages();
      var d = {}, v = s.keys || Object.keys(this.rules);
      v.forEach(function(g) {
        var m = n.rules[g], f = o[g];
        m.forEach(function(x) {
          var h = x;
          typeof h.transform == "function" && (o === r && (o = O({}, o)), f = o[g] = h.transform(f), f != null && (h.type = h.type || (Array.isArray(f) ? "array" : Z(f)))), typeof h == "function" ? h = {
            validator: h
          } : h = O({}, h), h.validator = n.getValidationMethod(h), h.validator && (h.field = g, h.fullField = h.fullField || g, h.type = n.getType(h), d[g] = d[g] || [], d[g].push({
            rule: h,
            value: f,
            source: o,
            field: g
          }));
        });
      });
      var b = {};
      return hm(d, s, function(g, m) {
        var f = g.rule, x = (f.type === "object" || f.type === "array") && (Z(f.fields) === "object" || Z(f.defaultField) === "object");
        x = x && (f.required || !f.required && g.value), f.field = g.field;
        function h(y, w) {
          return O(O({}, w), {}, {
            fullField: "".concat(f.fullField, ".").concat(y),
            fullFields: f.fullFields ? [].concat(K(f.fullFields), [y]) : [y]
          });
        }
        function _() {
          var y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], w = Array.isArray(y) ? y : [y];
          !s.suppressWarning && w.length && e.warning("async-validator:", w), w.length && f.message !== void 0 && f.message !== null && (w = [].concat(f.message));
          var P = w.map(vl(f, o));
          if (s.first && P.length)
            return b[f.field] = 1, m(P);
          if (!x)
            m(P);
          else {
            if (f.required && !g.value)
              return f.message !== void 0 ? P = [].concat(f.message).map(vl(f, o)) : s.error && (P = [s.error(f, tt(s.messages.required, f.field))]), m(P);
            var F = {};
            f.defaultField && Object.keys(g.value).map(function(T) {
              F[T] = f.defaultField;
            }), F = O(O({}, F), g.rule.fields);
            var j = {};
            Object.keys(F).forEach(function(T) {
              var A = F[T], k = Array.isArray(A) ? A : [A];
              j[T] = k.map(h.bind(null, T));
            });
            var D = new e(j);
            D.messages(s.messages), g.rule.options && (g.rule.options.messages = s.messages, g.rule.options.error = s.error), D.validate(g.value, g.rule.options || s, function(T) {
              var A = [];
              P && P.length && A.push.apply(A, K(P)), T && T.length && A.push.apply(A, K(T)), m(A.length ? A : null);
            });
          }
        }
        var R;
        if (f.asyncValidator)
          R = f.asyncValidator(f, g.value, _, g.source, s);
        else if (f.validator) {
          try {
            R = f.validator(f, g.value, _, g.source, s);
          } catch (y) {
            var E, $;
            (E = ($ = console).error) === null || E === void 0 || E.call($, y), s.suppressValidatorError || setTimeout(function() {
              throw y;
            }, 0), _(y.message);
          }
          R === !0 ? _() : R === !1 ? _(typeof f.message == "function" ? f.message(f.fullField || f.field) : f.message || "".concat(f.fullField || f.field, " fails")) : R instanceof Array ? _(R) : R instanceof Error && _(R.message);
        }
        R && R.then && R.then(function() {
          return _();
        }, function(y) {
          return _(y);
        });
      }, function(g) {
        u(g);
      }, o);
    }
  }, {
    key: "getType",
    value: function(r) {
      if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !gn.hasOwnProperty(r.type))
        throw new Error(tt("Unknown rule type %s", r.type));
      return r.type || "string";
    }
  }, {
    key: "getValidationMethod",
    value: function(r) {
      if (typeof r.validator == "function")
        return r.validator;
      var n = Object.keys(r), a = n.indexOf("message");
      return a !== -1 && n.splice(a, 1), n.length === 1 && n[0] === "required" ? gn.required : gn[this.getType(r)] || void 0;
    }
  }]), e;
})();
C(Fn, "register", function(t, r) {
  if (typeof r != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  gn[t] = r;
});
C(Fn, "warning", Fc);
C(Fn, "messages", ki);
C(Fn, "validators", gn);
var et = "'${name}' is not a valid ${type}", Ac = {
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
}, hl = Fn;
function Vm(e, t) {
  return e.replace(/\\?\$\{\w+\}/g, function(r) {
    if (r.startsWith("\\"))
      return r.slice(1);
    var n = r.slice(2, -1);
    return t[n];
  });
}
var ml = "CODE_LOGIC_ERROR";
function Vi(e, t, r, n, a) {
  return Li.apply(this, arguments);
}
function Li() {
  return Li = On(/* @__PURE__ */ ct().mark(function e(t, r, n, a, i) {
    var o, s, l, u, c, d, v, b, g;
    return ct().wrap(function(f) {
      for (; ; ) switch (f.prev = f.next) {
        case 0:
          return o = O({}, n), delete o.ruleIndex, hl.warning = function() {
          }, o.validator && (s = o.validator, o.validator = function() {
            try {
              return s.apply(void 0, arguments);
            } catch (x) {
              return console.error(x), Promise.reject(ml);
            }
          }), l = null, o && o.type === "array" && o.defaultField && (l = o.defaultField, delete o.defaultField), u = new hl(C({}, t, [o])), c = Zt(Ac, a.validateMessages), u.messages(c), d = [], f.prev = 10, f.next = 13, Promise.resolve(u.validate(C({}, t, r), O({}, a)));
        case 13:
          f.next = 18;
          break;
        case 15:
          f.prev = 15, f.t0 = f.catch(10), f.t0.errors && (d = f.t0.errors.map(function(x, h) {
            var _ = x.message, R = _ === ml ? c.default : _;
            return /* @__PURE__ */ S.isValidElement(R) ? (
              // Wrap ReactNode with `key`
              /* @__PURE__ */ S.cloneElement(R, {
                key: "error_".concat(h)
              })
            ) : R;
          }));
        case 18:
          if (!(!d.length && l && Array.isArray(r) && r.length > 0)) {
            f.next = 23;
            break;
          }
          return f.next = 21, Promise.all(r.map(function(x, h) {
            return Vi("".concat(t, ".").concat(h), x, l, a, i);
          }));
        case 21:
          return v = f.sent, f.abrupt("return", v.reduce(function(x, h) {
            return [].concat(K(x), K(h));
          }, []));
        case 23:
          return b = O(O({}, n), {}, {
            name: t,
            enum: (n.enum || []).join(", ")
          }, i), g = d.map(function(x) {
            return typeof x == "string" ? Vm(x, b) : x;
          }), f.abrupt("return", g);
        case 26:
        case "end":
          return f.stop();
      }
    }, e, null, [[10, 15]]);
  })), Li.apply(this, arguments);
}
function Lm(e, t, r, n, a, i) {
  var o = e.join("."), s = r.map(function(c, d) {
    var v = c.validator, b = O(O({}, c), {}, {
      ruleIndex: d
    });
    return v && (b.validator = function(g, m, f) {
      var x = !1, h = function() {
        for (var E = arguments.length, $ = new Array(E), y = 0; y < E; y++)
          $[y] = arguments[y];
        Promise.resolve().then(function() {
          Ae(!x, "Your validator function has already return a promise. `callback` will be ignored."), x || f.apply(void 0, $);
        });
      }, _ = v(g, m, h);
      x = _ && typeof _.then == "function" && typeof _.catch == "function", Ae(x, "`callback` is deprecated. Please return a promise instead."), x && _.then(function() {
        f();
      }).catch(function(R) {
        f(R || " ");
      });
    }), b;
  }).sort(function(c, d) {
    var v = c.warningOnly, b = c.ruleIndex, g = d.warningOnly, m = d.ruleIndex;
    return !!v == !!g ? b - m : v ? 1 : -1;
  }), l;
  if (a === !0)
    l = new Promise(/* @__PURE__ */ (function() {
      var c = On(/* @__PURE__ */ ct().mark(function d(v, b) {
        var g, m, f;
        return ct().wrap(function(h) {
          for (; ; ) switch (h.prev = h.next) {
            case 0:
              g = 0;
            case 1:
              if (!(g < s.length)) {
                h.next = 12;
                break;
              }
              return m = s[g], h.next = 5, Vi(o, t, m, n, i);
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
        return c.apply(this, arguments);
      };
    })());
  else {
    var u = s.map(function(c) {
      return Vi(o, t, c, n, i).then(function(d) {
        return {
          errors: d,
          rule: c
        };
      });
    });
    l = (a ? Hm(u) : zm(u)).then(function(c) {
      return Promise.reject(c);
    });
  }
  return l.catch(function(c) {
    return c;
  }), l;
}
function zm(e) {
  return zi.apply(this, arguments);
}
function zi() {
  return zi = On(/* @__PURE__ */ ct().mark(function e(t) {
    return ct().wrap(function(n) {
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
  })), zi.apply(this, arguments);
}
function Hm(e) {
  return Hi.apply(this, arguments);
}
function Hi() {
  return Hi = On(/* @__PURE__ */ ct().mark(function e(t) {
    var r;
    return ct().wrap(function(a) {
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
  })), Hi.apply(this, arguments);
}
function Ie(e) {
  return ji(e);
}
function gl(e, t) {
  var r = {};
  return t.forEach(function(n) {
    var a = bt(e, n);
    r = dt(r, n, a);
  }), r;
}
function tr(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return e && e.some(function(n) {
    return Mc(t, n, r);
  });
}
function Mc(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return !e || !t || !r && e.length !== t.length ? !1 : t.every(function(n, a) {
    return e[a] === n;
  });
}
function qm(e, t) {
  if (e === t)
    return !0;
  if (!e && t || e && !t || !e || !t || Z(e) !== "object" || Z(t) !== "object")
    return !1;
  var r = Object.keys(e), n = Object.keys(t), a = new Set([].concat(r, n));
  return K(a).every(function(i) {
    var o = e[i], s = t[i];
    return typeof o == "function" && typeof s == "function" ? !0 : o === s;
  });
}
function Bm(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && Z(t.target) === "object" && e in t.target ? t.target[e] : t;
}
function bl(e, t, r) {
  var n = e.length;
  if (t < 0 || t >= n || r < 0 || r >= n)
    return e;
  var a = e[t], i = t - r;
  return i > 0 ? [].concat(K(e.slice(0, r)), [a], K(e.slice(r, t)), K(e.slice(t + 1, n))) : i < 0 ? [].concat(K(e.slice(0, t)), K(e.slice(t + 1, r + 1)), [a], K(e.slice(r + 1, n))) : e;
}
var Wm = ["name"], st = [];
function Ga(e, t, r, n, a, i) {
  return typeof e == "function" ? e(t, r, "source" in i ? {
    source: i.source
  } : {}) : n !== a;
}
var uo = /* @__PURE__ */ (function(e) {
  Ht(r, e);
  var t = qt(r);
  function r(n) {
    var a;
    if (Ue(this, r), a = t.call(this, n), C(ne(a), "state", {
      resetCount: 0
    }), C(ne(a), "cancelRegisterFunc", null), C(ne(a), "mounted", !1), C(ne(a), "touched", !1), C(ne(a), "dirty", !1), C(ne(a), "validatePromise", void 0), C(ne(a), "prevValidating", void 0), C(ne(a), "errors", st), C(ne(a), "warnings", st), C(ne(a), "cancelRegister", function() {
      var l = a.props, u = l.preserve, c = l.isListField, d = l.name;
      a.cancelRegisterFunc && a.cancelRegisterFunc(c, u, Ie(d)), a.cancelRegisterFunc = null;
    }), C(ne(a), "getNamePath", function() {
      var l = a.props, u = l.name, c = l.fieldContext, d = c.prefixName, v = d === void 0 ? [] : d;
      return u !== void 0 ? [].concat(K(v), K(u)) : [];
    }), C(ne(a), "getRules", function() {
      var l = a.props, u = l.rules, c = u === void 0 ? [] : u, d = l.fieldContext;
      return c.map(function(v) {
        return typeof v == "function" ? v(d) : v;
      });
    }), C(ne(a), "refresh", function() {
      a.mounted && a.setState(function(l) {
        var u = l.resetCount;
        return {
          resetCount: u + 1
        };
      });
    }), C(ne(a), "metaCache", null), C(ne(a), "triggerMetaEvent", function(l) {
      var u = a.props.onMetaChange;
      if (u) {
        var c = O(O({}, a.getMeta()), {}, {
          destroy: l
        });
        ei(a.metaCache, c) || u(c), a.metaCache = c;
      } else
        a.metaCache = null;
    }), C(ne(a), "onStoreChange", function(l, u, c) {
      var d = a.props, v = d.shouldUpdate, b = d.dependencies, g = b === void 0 ? [] : b, m = d.onReset, f = c.store, x = a.getNamePath(), h = a.getValue(l), _ = a.getValue(f), R = u && tr(u, x);
      switch (c.type === "valueUpdate" && c.source === "external" && !ei(h, _) && (a.touched = !0, a.dirty = !0, a.validatePromise = null, a.errors = st, a.warnings = st, a.triggerMetaEvent()), c.type) {
        case "reset":
          if (!u || R) {
            a.touched = !1, a.dirty = !1, a.validatePromise = void 0, a.errors = st, a.warnings = st, a.triggerMetaEvent(), m == null || m(), a.refresh();
            return;
          }
          break;
        /**
         * In case field with `preserve = false` nest deps like:
         * - A = 1 => show B
         * - B = 1 => show C
         * - Reset A, need clean B, C
         */
        case "remove": {
          if (v && Ga(v, l, f, h, _, c)) {
            a.reRender();
            return;
          }
          break;
        }
        case "setField": {
          var E = c.data;
          if (R) {
            "touched" in E && (a.touched = E.touched), "validating" in E && !("originRCField" in E) && (a.validatePromise = E.validating ? Promise.resolve([]) : null), "errors" in E && (a.errors = E.errors || st), "warnings" in E && (a.warnings = E.warnings || st), a.dirty = !0, a.triggerMetaEvent(), a.reRender();
            return;
          } else if ("value" in E && tr(u, x, !0)) {
            a.reRender();
            return;
          }
          if (v && !x.length && Ga(v, l, f, h, _, c)) {
            a.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var $ = g.map(Ie);
          if ($.some(function(y) {
            return tr(c.relatedFields, y);
          })) {
            a.reRender();
            return;
          }
          break;
        }
        default:
          if (R || (!g.length || x.length || v) && Ga(v, l, f, h, _, c)) {
            a.reRender();
            return;
          }
          break;
      }
      v === !0 && a.reRender();
    }), C(ne(a), "validateRules", function(l) {
      var u = a.getNamePath(), c = a.getValue(), d = l || {}, v = d.triggerName, b = d.validateOnly, g = b === void 0 ? !1 : b, m = Promise.resolve().then(/* @__PURE__ */ On(/* @__PURE__ */ ct().mark(function f() {
        var x, h, _, R, E, $, y;
        return ct().wrap(function(P) {
          for (; ; ) switch (P.prev = P.next) {
            case 0:
              if (a.mounted) {
                P.next = 2;
                break;
              }
              return P.abrupt("return", []);
            case 2:
              if (x = a.props, h = x.validateFirst, _ = h === void 0 ? !1 : h, R = x.messageVariables, E = x.validateDebounce, $ = a.getRules(), v && ($ = $.filter(function(F) {
                return F;
              }).filter(function(F) {
                var j = F.validateTrigger;
                if (!j)
                  return !0;
                var D = ji(j);
                return D.includes(v);
              })), !(E && v)) {
                P.next = 10;
                break;
              }
              return P.next = 8, new Promise(function(F) {
                setTimeout(F, E);
              });
            case 8:
              if (a.validatePromise === m) {
                P.next = 10;
                break;
              }
              return P.abrupt("return", []);
            case 10:
              return y = Lm(u, c, $, l, _, R), y.catch(function(F) {
                return F;
              }).then(function() {
                var F = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : st;
                if (a.validatePromise === m) {
                  var j;
                  a.validatePromise = null;
                  var D = [], T = [];
                  (j = F.forEach) === null || j === void 0 || j.call(F, function(A) {
                    var k = A.rule.warningOnly, I = A.errors, V = I === void 0 ? st : I;
                    k ? T.push.apply(T, K(V)) : D.push.apply(D, K(V));
                  }), a.errors = D, a.warnings = T, a.triggerMetaEvent(), a.reRender();
                }
              }), P.abrupt("return", y);
            case 13:
            case "end":
              return P.stop();
          }
        }, f);
      })));
      return g || (a.validatePromise = m, a.dirty = !0, a.errors = st, a.warnings = st, a.triggerMetaEvent(), a.reRender()), m;
    }), C(ne(a), "isFieldValidating", function() {
      return !!a.validatePromise;
    }), C(ne(a), "isFieldTouched", function() {
      return a.touched;
    }), C(ne(a), "isFieldDirty", function() {
      if (a.dirty || a.props.initialValue !== void 0)
        return !0;
      var l = a.props.fieldContext, u = l.getInternalHooks(Dt), c = u.getInitialValue;
      return c(a.getNamePath()) !== void 0;
    }), C(ne(a), "getErrors", function() {
      return a.errors;
    }), C(ne(a), "getWarnings", function() {
      return a.warnings;
    }), C(ne(a), "isListField", function() {
      return a.props.isListField;
    }), C(ne(a), "isList", function() {
      return a.props.isList;
    }), C(ne(a), "isPreserve", function() {
      return a.props.preserve;
    }), C(ne(a), "getMeta", function() {
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
    }), C(ne(a), "getOnlyChild", function(l) {
      if (typeof l == "function") {
        var u = a.getMeta();
        return O(O({}, a.getOnlyChild(l(a.getControlled(), u, a.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var c = ua(l);
      return c.length !== 1 || !/* @__PURE__ */ S.isValidElement(c[0]) ? {
        child: c,
        isFunction: !1
      } : {
        child: c[0],
        isFunction: !1
      };
    }), C(ne(a), "getValue", function(l) {
      var u = a.props.fieldContext.getFieldsValue, c = a.getNamePath();
      return bt(l || u(!0), c);
    }), C(ne(a), "getControlled", function() {
      var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = a.props, c = u.name, d = u.trigger, v = u.validateTrigger, b = u.getValueFromEvent, g = u.normalize, m = u.valuePropName, f = u.getValueProps, x = u.fieldContext, h = v !== void 0 ? v : x.validateTrigger, _ = a.getNamePath(), R = x.getInternalHooks, E = x.getFieldsValue, $ = R(Dt), y = $.dispatch, w = a.getValue(), P = f || function(A) {
        return C({}, m, A);
      }, F = l[d], j = c !== void 0 ? P(w) : {};
      process.env.NODE_ENV !== "production" && j && Object.keys(j).forEach(function(A) {
        Ae(typeof j[A] != "function", "It's not recommended to generate dynamic function prop by `getValueProps`. Please pass it to child component directly (prop: ".concat(A, ")"));
      });
      var D = O(O({}, l), j);
      D[d] = function() {
        a.touched = !0, a.dirty = !0, a.triggerMetaEvent();
        for (var A, k = arguments.length, I = new Array(k), V = 0; V < k; V++)
          I[V] = arguments[V];
        b ? A = b.apply(void 0, I) : A = Bm.apply(void 0, [m].concat(I)), g && (A = g(A, w, E(!0))), A !== w && y({
          type: "updateValue",
          namePath: _,
          value: A
        }), F && F.apply(void 0, I);
      };
      var T = ji(h || []);
      return T.forEach(function(A) {
        var k = D[A];
        D[A] = function() {
          k && k.apply(void 0, arguments);
          var I = a.props.rules;
          I && I.length && y({
            type: "validateField",
            namePath: _,
            triggerName: A
          });
        };
      }), D;
    }), n.fieldContext) {
      var i = n.fieldContext.getInternalHooks, o = i(Dt), s = o.initEntityValue;
      s(ne(a));
    }
    return a;
  }
  return Ye(r, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props, i = a.shouldUpdate, o = a.fieldContext;
      if (this.mounted = !0, o) {
        var s = o.getInternalHooks, l = s(Dt), u = l.registerField;
        this.cancelRegisterFunc = u(this);
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
      var a = this.state.resetCount, i = this.props.children, o = this.getOnlyChild(i), s = o.child, l = o.isFunction, u;
      return l ? u = s : /* @__PURE__ */ S.isValidElement(s) ? u = /* @__PURE__ */ S.cloneElement(s, this.getControlled(s.props)) : (Ae(!s, "`children` of Field is not validate ReactElement."), u = s), /* @__PURE__ */ S.createElement(S.Fragment, {
        key: a
      }, u);
    }
  }]), r;
})(S.Component);
C(uo, "contextType", lr);
C(uo, "defaultProps", {
  trigger: "onChange",
  valuePropName: "value"
});
function jc(e) {
  var t, r = e.name, n = lt(e, Wm), a = S.useContext(lr), i = S.useContext(va), o = r !== void 0 ? Ie(r) : void 0, s = (t = n.isListField) !== null && t !== void 0 ? t : !!i, l = "keep";
  return s || (l = "_".concat((o || []).join("_"))), process.env.NODE_ENV !== "production" && n.preserve === !1 && s && o.length <= 1 && Ae(!1, "`preserve` should not apply on Form.List fields."), /* @__PURE__ */ S.createElement(uo, Ke({
    key: l,
    name: o,
    isListField: s
  }, n, {
    fieldContext: a
  }));
}
function Um(e) {
  var t = e.name, r = e.initialValue, n = e.children, a = e.rules, i = e.validateTrigger, o = e.isListField, s = S.useContext(lr), l = S.useContext(va), u = S.useRef({
    keys: [],
    id: 0
  }), c = u.current, d = S.useMemo(function() {
    var m = Ie(s.prefixName) || [];
    return [].concat(K(m), K(Ie(t)));
  }, [s.prefixName, t]), v = S.useMemo(function() {
    return O(O({}, s), {}, {
      prefixName: d
    });
  }, [s, d]), b = S.useMemo(function() {
    return {
      getKey: function(f) {
        var x = d.length, h = f[x];
        return [c.keys[h], f.slice(x + 1)];
      }
    };
  }, [d]);
  if (typeof n != "function")
    return Ae(!1, "Form.List only accepts function as children."), null;
  var g = function(f, x, h) {
    var _ = h.source;
    return _ === "internal" ? !1 : f !== x;
  };
  return /* @__PURE__ */ S.createElement(va.Provider, {
    value: b
  }, /* @__PURE__ */ S.createElement(lr.Provider, {
    value: v
  }, /* @__PURE__ */ S.createElement(jc, {
    name: [],
    shouldUpdate: g,
    rules: a,
    validateTrigger: i,
    initialValue: r,
    isList: !0,
    isListField: o ?? !!l
  }, function(m, f) {
    var x = m.value, h = x === void 0 ? [] : x, _ = m.onChange, R = s.getFieldValue, E = function() {
      var P = R(d || []);
      return P || [];
    }, $ = {
      add: function(P, F) {
        var j = E();
        F >= 0 && F <= j.length ? (c.keys = [].concat(K(c.keys.slice(0, F)), [c.id], K(c.keys.slice(F))), _([].concat(K(j.slice(0, F)), [P], K(j.slice(F))))) : (process.env.NODE_ENV !== "production" && (F < 0 || F > j.length) && Ae(!1, "The second parameter of the add function should be a valid positive number."), c.keys = [].concat(K(c.keys), [c.id]), _([].concat(K(j), [P]))), c.id += 1;
      },
      remove: function(P) {
        var F = E(), j = new Set(Array.isArray(P) ? P : [P]);
        j.size <= 0 || (c.keys = c.keys.filter(function(D, T) {
          return !j.has(T);
        }), _(F.filter(function(D, T) {
          return !j.has(T);
        })));
      },
      move: function(P, F) {
        if (P !== F) {
          var j = E();
          P < 0 || P >= j.length || F < 0 || F >= j.length || (c.keys = bl(c.keys, P, F), _(bl(j, P, F)));
        }
      }
    }, y = h || [];
    return Array.isArray(y) || (y = [], process.env.NODE_ENV !== "production" && Ae(!1, "Current value of '".concat(d.join(" > "), "' is not an array type."))), n(y.map(function(w, P) {
      var F = c.keys[P];
      return F === void 0 && (c.keys[P] = c.id, F = c.keys[P], c.id += 1), {
        name: P,
        key: F,
        isListField: !0
      };
    }), $, f);
  })));
}
function Ym(e) {
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
var Dc = "__@field_split__";
function Ka(e) {
  return e.map(function(t) {
    return "".concat(Z(t), ":").concat(t);
  }).join(Dc);
}
var Xt = /* @__PURE__ */ (function() {
  function e() {
    Ue(this, e), C(this, "kvs", /* @__PURE__ */ new Map());
  }
  return Ye(e, [{
    key: "set",
    value: function(r, n) {
      this.kvs.set(Ka(r), n);
    }
  }, {
    key: "get",
    value: function(r) {
      return this.kvs.get(Ka(r));
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
      this.kvs.delete(Ka(r));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(r) {
      return K(this.kvs.entries()).map(function(n) {
        var a = q(n, 2), i = a[0], o = a[1], s = i.split(Dc);
        return r({
          key: s.map(function(l) {
            var u = l.match(/^([^:]*):(.*)$/), c = q(u, 3), d = c[1], v = c[2];
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
})(), Gm = ["name"], Km = /* @__PURE__ */ Ye(function e(t) {
  var r = this;
  Ue(this, e), C(this, "formHooked", !1), C(this, "forceRootUpdate", void 0), C(this, "subscribable", !0), C(this, "store", {}), C(this, "fieldEntities", []), C(this, "initialValues", {}), C(this, "callbacks", {}), C(this, "validateMessages", null), C(this, "preserve", null), C(this, "lastValidatePromise", null), C(this, "getForm", function() {
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
  }), C(this, "getInternalHooks", function(n) {
    return n === Dt ? (r.formHooked = !0, {
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
    }) : (Ae(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }), C(this, "useSubscribe", function(n) {
    r.subscribable = n;
  }), C(this, "prevWithoutPreserves", null), C(this, "setInitialValues", function(n, a) {
    if (r.initialValues = n || {}, a) {
      var i, o = Zt(n, r.store);
      (i = r.prevWithoutPreserves) === null || i === void 0 || i.map(function(s) {
        var l = s.key;
        o = dt(o, l, bt(n, l));
      }), r.prevWithoutPreserves = null, r.updateStore(o);
    }
  }), C(this, "destroyForm", function(n) {
    if (n)
      r.updateStore({});
    else {
      var a = new Xt();
      r.getFieldEntities(!0).forEach(function(i) {
        r.isMergedPreserve(i.isPreserve()) || a.set(i.getNamePath(), !0);
      }), r.prevWithoutPreserves = a;
    }
  }), C(this, "getInitialValue", function(n) {
    var a = bt(r.initialValues, n);
    return n.length ? Zt(a) : a;
  }), C(this, "setCallbacks", function(n) {
    r.callbacks = n;
  }), C(this, "setValidateMessages", function(n) {
    r.validateMessages = n;
  }), C(this, "setPreserve", function(n) {
    r.preserve = n;
  }), C(this, "watchList", []), C(this, "registerWatch", function(n) {
    return r.watchList.push(n), function() {
      r.watchList = r.watchList.filter(function(a) {
        return a !== n;
      });
    };
  }), C(this, "notifyWatch", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (r.watchList.length) {
      var a = r.getFieldsValue(), i = r.getFieldsValue(!0);
      r.watchList.forEach(function(o) {
        o(a, i, n);
      });
    }
  }), C(this, "timeoutId", null), C(this, "warningUnhooked", function() {
    process.env.NODE_ENV !== "production" && !r.timeoutId && typeof window < "u" && (r.timeoutId = setTimeout(function() {
      r.timeoutId = null, r.formHooked || Ae(!1, "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?");
    }));
  }), C(this, "updateStore", function(n) {
    r.store = n;
  }), C(this, "getFieldEntities", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    return n ? r.fieldEntities.filter(function(a) {
      return a.getNamePath().length;
    }) : r.fieldEntities;
  }), C(this, "getFieldsMap", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, a = new Xt();
    return r.getFieldEntities(n).forEach(function(i) {
      var o = i.getNamePath();
      a.set(o, i);
    }), a;
  }), C(this, "getFieldEntitiesForNamePathList", function(n) {
    if (!n)
      return r.getFieldEntities(!0);
    var a = r.getFieldsMap(!0);
    return n.map(function(i) {
      var o = Ie(i);
      return a.get(o) || {
        INVALIDATE_NAME_PATH: Ie(i)
      };
    });
  }), C(this, "getFieldsValue", function(n, a) {
    r.warningUnhooked();
    var i, o, s;
    if (n === !0 || Array.isArray(n) ? (i = n, o = a) : n && Z(n) === "object" && (s = n.strict, o = n.filter), i === !0 && !o)
      return r.store;
    var l = r.getFieldEntitiesForNamePathList(Array.isArray(i) ? i : null), u = [];
    return l.forEach(function(c) {
      var d, v, b = "INVALIDATE_NAME_PATH" in c ? c.INVALIDATE_NAME_PATH : c.getNamePath();
      if (s) {
        var g, m;
        if ((g = (m = c).isList) !== null && g !== void 0 && g.call(m))
          return;
      } else if (!i && (d = (v = c).isListField) !== null && d !== void 0 && d.call(v))
        return;
      if (!o)
        u.push(b);
      else {
        var f = "getMeta" in c ? c.getMeta() : null;
        o(f) && u.push(b);
      }
    }), gl(r.store, u.map(Ie));
  }), C(this, "getFieldValue", function(n) {
    r.warningUnhooked();
    var a = Ie(n);
    return bt(r.store, a);
  }), C(this, "getFieldsError", function(n) {
    r.warningUnhooked();
    var a = r.getFieldEntitiesForNamePathList(n);
    return a.map(function(i, o) {
      return i && !("INVALIDATE_NAME_PATH" in i) ? {
        name: i.getNamePath(),
        errors: i.getErrors(),
        warnings: i.getWarnings()
      } : {
        name: Ie(n[o]),
        errors: [],
        warnings: []
      };
    });
  }), C(this, "getFieldError", function(n) {
    r.warningUnhooked();
    var a = Ie(n), i = r.getFieldsError([a])[0];
    return i.errors;
  }), C(this, "getFieldWarning", function(n) {
    r.warningUnhooked();
    var a = Ie(n), i = r.getFieldsError([a])[0];
    return i.warnings;
  }), C(this, "isFieldsTouched", function() {
    r.warningUnhooked();
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a[0], s = a[1], l, u = !1;
    a.length === 0 ? l = null : a.length === 1 ? Array.isArray(o) ? (l = o.map(Ie), u = !1) : (l = null, u = o) : (l = o.map(Ie), u = s);
    var c = r.getFieldEntities(!0), d = function(f) {
      return f.isFieldTouched();
    };
    if (!l)
      return u ? c.every(function(m) {
        return d(m) || m.isList();
      }) : c.some(d);
    var v = new Xt();
    l.forEach(function(m) {
      v.set(m, []);
    }), c.forEach(function(m) {
      var f = m.getNamePath();
      l.forEach(function(x) {
        x.every(function(h, _) {
          return f[_] === h;
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
    return u ? g.every(b) : g.some(b);
  }), C(this, "isFieldTouched", function(n) {
    return r.warningUnhooked(), r.isFieldsTouched([n]);
  }), C(this, "isFieldsValidating", function(n) {
    r.warningUnhooked();
    var a = r.getFieldEntities();
    if (!n)
      return a.some(function(o) {
        return o.isFieldValidating();
      });
    var i = n.map(Ie);
    return a.some(function(o) {
      var s = o.getNamePath();
      return tr(i, s) && o.isFieldValidating();
    });
  }), C(this, "isFieldValidating", function(n) {
    return r.warningUnhooked(), r.isFieldsValidating([n]);
  }), C(this, "resetWithFieldInitialValue", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = new Xt(), i = r.getFieldEntities(!0);
    i.forEach(function(l) {
      var u = l.props.initialValue, c = l.getNamePath();
      if (u !== void 0) {
        var d = a.get(c) || /* @__PURE__ */ new Set();
        d.add({
          entity: l,
          value: u
        }), a.set(c, d);
      }
    });
    var o = function(u) {
      u.forEach(function(c) {
        var d = c.props.initialValue;
        if (d !== void 0) {
          var v = c.getNamePath(), b = r.getInitialValue(v);
          if (b !== void 0)
            Ae(!1, "Form already set 'initialValues' with path '".concat(v.join("."), "'. Field can not overwrite it."));
          else {
            var g = a.get(v);
            if (g && g.size > 1)
              Ae(!1, "Multiple Field with path '".concat(v.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (g) {
              var m = r.getFieldValue(v), f = c.isListField();
              !f && (!n.skipExist || m === void 0) && r.updateStore(dt(r.store, v, K(g)[0].value));
            }
          }
        }
      });
    }, s;
    n.entities ? s = n.entities : n.namePathList ? (s = [], n.namePathList.forEach(function(l) {
      var u = a.get(l);
      if (u) {
        var c;
        (c = s).push.apply(c, K(K(u).map(function(d) {
          return d.entity;
        })));
      }
    })) : s = i, o(s);
  }), C(this, "resetFields", function(n) {
    r.warningUnhooked();
    var a = r.store;
    if (!n) {
      r.updateStore(Zt(r.initialValues)), r.resetWithFieldInitialValue(), r.notifyObservers(a, null, {
        type: "reset"
      }), r.notifyWatch();
      return;
    }
    var i = n.map(Ie);
    i.forEach(function(o) {
      var s = r.getInitialValue(o);
      r.updateStore(dt(r.store, o, s));
    }), r.resetWithFieldInitialValue({
      namePathList: i
    }), r.notifyObservers(a, i, {
      type: "reset"
    }), r.notifyWatch(i);
  }), C(this, "setFields", function(n) {
    r.warningUnhooked();
    var a = r.store, i = [];
    n.forEach(function(o) {
      var s = o.name, l = lt(o, Gm), u = Ie(s);
      i.push(u), "value" in l && r.updateStore(dt(r.store, u, l.value)), r.notifyObservers(a, [u], {
        type: "setField",
        data: o
      });
    }), r.notifyWatch(i);
  }), C(this, "getFields", function() {
    var n = r.getFieldEntities(!0), a = n.map(function(i) {
      var o = i.getNamePath(), s = i.getMeta(), l = O(O({}, s), {}, {
        name: o,
        value: r.getFieldValue(o)
      });
      return Object.defineProperty(l, "originRCField", {
        value: !0
      }), l;
    });
    return a;
  }), C(this, "initEntityValue", function(n) {
    var a = n.props.initialValue;
    if (a !== void 0) {
      var i = n.getNamePath(), o = bt(r.store, i);
      o === void 0 && r.updateStore(dt(r.store, i, a));
    }
  }), C(this, "isMergedPreserve", function(n) {
    var a = n !== void 0 ? n : r.preserve;
    return a ?? !0;
  }), C(this, "registerField", function(n) {
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
        var u = o ? void 0 : r.getInitialValue(a);
        if (a.length && r.getFieldValue(a) !== u && r.fieldEntities.every(function(d) {
          return (
            // Only reset when no namePath exist
            !Mc(d.getNamePath(), a)
          );
        })) {
          var c = r.store;
          r.updateStore(dt(c, a, u, !0)), r.notifyObservers(c, [a], {
            type: "remove"
          }), r.triggerDependenciesUpdate(c, a);
        }
      }
      r.notifyWatch([a]);
    };
  }), C(this, "dispatch", function(n) {
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
  }), C(this, "notifyObservers", function(n, a, i) {
    if (r.subscribable) {
      var o = O(O({}, i), {}, {
        store: r.getFieldsValue(!0)
      });
      r.getFieldEntities().forEach(function(s) {
        var l = s.onStoreChange;
        l(n, a, o);
      });
    } else
      r.forceRootUpdate();
  }), C(this, "triggerDependenciesUpdate", function(n, a) {
    var i = r.getDependencyChildrenFields(a);
    return i.length && r.validateFields(i), r.notifyObservers(n, i, {
      type: "dependenciesUpdate",
      relatedFields: [a].concat(K(i))
    }), i;
  }), C(this, "updateValue", function(n, a) {
    var i = Ie(n), o = r.store;
    r.updateStore(dt(r.store, i, a)), r.notifyObservers(o, [i], {
      type: "valueUpdate",
      source: "internal"
    }), r.notifyWatch([i]);
    var s = r.triggerDependenciesUpdate(o, i), l = r.callbacks.onValuesChange;
    if (l) {
      var u = gl(r.store, [i]);
      l(u, r.getFieldsValue());
    }
    r.triggerOnFieldsChange([i].concat(K(s)));
  }), C(this, "setFieldsValue", function(n) {
    r.warningUnhooked();
    var a = r.store;
    if (n) {
      var i = Zt(r.store, n);
      r.updateStore(i);
    }
    r.notifyObservers(a, null, {
      type: "valueUpdate",
      source: "external"
    }), r.notifyWatch();
  }), C(this, "setFieldValue", function(n, a) {
    r.setFields([{
      name: n,
      value: a,
      errors: [],
      warnings: []
    }]);
  }), C(this, "getDependencyChildrenFields", function(n) {
    var a = /* @__PURE__ */ new Set(), i = [], o = new Xt();
    r.getFieldEntities().forEach(function(l) {
      var u = l.props.dependencies;
      (u || []).forEach(function(c) {
        var d = Ie(c);
        o.update(d, function() {
          var v = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          return v.add(l), v;
        });
      });
    });
    var s = function l(u) {
      var c = o.get(u) || /* @__PURE__ */ new Set();
      c.forEach(function(d) {
        if (!a.has(d)) {
          a.add(d);
          var v = d.getNamePath();
          d.isFieldDirty() && v.length && (i.push(v), l(v));
        }
      });
    };
    return s(n), i;
  }), C(this, "triggerOnFieldsChange", function(n, a) {
    var i = r.callbacks.onFieldsChange;
    if (i) {
      var o = r.getFields();
      if (a) {
        var s = new Xt();
        a.forEach(function(u) {
          var c = u.name, d = u.errors;
          s.set(c, d);
        }), o.forEach(function(u) {
          u.errors = s.get(u.name) || u.errors;
        });
      }
      var l = o.filter(function(u) {
        var c = u.name;
        return tr(n, c);
      });
      l.length && i(l, o);
    }
  }), C(this, "validateFields", function(n, a) {
    r.warningUnhooked();
    var i, o;
    Array.isArray(n) || typeof n == "string" || typeof a == "string" ? (i = n, o = a) : o = n;
    var s = !!i, l = s ? i.map(Ie) : [], u = [], c = String(Date.now()), d = /* @__PURE__ */ new Set(), v = o || {}, b = v.recursive, g = v.dirty;
    r.getFieldEntities(!0).forEach(function(h) {
      if (s || l.push(h.getNamePath()), !(!h.props.rules || !h.props.rules.length) && !(g && !h.isFieldDirty())) {
        var _ = h.getNamePath();
        if (d.add(_.join(c)), !s || tr(l, _, b)) {
          var R = h.validateRules(O({
            validateMessages: O(O({}, Ac), r.validateMessages)
          }, o));
          u.push(R.then(function() {
            return {
              name: _,
              errors: [],
              warnings: []
            };
          }).catch(function(E) {
            var $, y = [], w = [];
            return ($ = E.forEach) === null || $ === void 0 || $.call(E, function(P) {
              var F = P.rule.warningOnly, j = P.errors;
              F ? w.push.apply(w, K(j)) : y.push.apply(y, K(j));
            }), y.length ? Promise.reject({
              name: _,
              errors: y,
              warnings: w
            }) : {
              name: _,
              errors: y,
              warnings: w
            };
          }));
        }
      }
    });
    var m = Ym(u);
    r.lastValidatePromise = m, m.catch(function(h) {
      return h;
    }).then(function(h) {
      var _ = h.map(function(R) {
        var E = R.name;
        return E;
      });
      r.notifyObservers(r.store, _, {
        type: "validateFinish"
      }), r.triggerOnFieldsChange(_, h);
    });
    var f = m.then(function() {
      return r.lastValidatePromise === m ? Promise.resolve(r.getFieldsValue(l)) : Promise.reject([]);
    }).catch(function(h) {
      var _ = h.filter(function(R) {
        return R && R.errors.length;
      });
      return Promise.reject({
        values: r.getFieldsValue(l),
        errorFields: _,
        outOfDate: r.lastValidatePromise !== m
      });
    });
    f.catch(function(h) {
      return h;
    });
    var x = l.filter(function(h) {
      return d.has(h.join(c));
    });
    return r.triggerOnFieldsChange(x), f;
  }), C(this, "submit", function() {
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
function kc(e) {
  var t = S.useRef(), r = S.useState({}), n = q(r, 2), a = n[1];
  if (!t.current)
    if (e)
      t.current = e;
    else {
      var i = function() {
        a({});
      }, o = new Km(i);
      t.current = o.getForm();
    }
  return [t.current];
}
var qi = /* @__PURE__ */ S.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), Xm = function(t) {
  var r = t.validateMessages, n = t.onFormChange, a = t.onFormFinish, i = t.children, o = S.useContext(qi), s = S.useRef({});
  return /* @__PURE__ */ S.createElement(qi.Provider, {
    value: O(O({}, o), {}, {
      validateMessages: O(O({}, o.validateMessages), r),
      // =========================================================
      // =                  Global Form Control                  =
      // =========================================================
      triggerFormChange: function(u, c) {
        n && n(u, {
          changedFields: c,
          forms: s.current
        }), o.triggerFormChange(u, c);
      },
      triggerFormFinish: function(u, c) {
        a && a(u, {
          values: c,
          forms: s.current
        }), o.triggerFormFinish(u, c);
      },
      registerForm: function(u, c) {
        u && (s.current = O(O({}, s.current), {}, C({}, u, c))), o.registerForm(u, c);
      },
      unregisterForm: function(u) {
        var c = O({}, s.current);
        delete c[u], s.current = c, o.unregisterForm(u);
      }
    })
  }, i);
}, Zm = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed", "clearOnDestroy"], Jm = function(t, r) {
  var n = t.name, a = t.initialValues, i = t.fields, o = t.form, s = t.preserve, l = t.children, u = t.component, c = u === void 0 ? "form" : u, d = t.validateMessages, v = t.validateTrigger, b = v === void 0 ? "onChange" : v, g = t.onValuesChange, m = t.onFieldsChange, f = t.onFinish, x = t.onFinishFailed, h = t.clearOnDestroy, _ = lt(t, Zm), R = S.useRef(null), E = S.useContext(qi), $ = kc(o), y = q($, 1), w = y[0], P = w.getInternalHooks(Dt), F = P.useSubscribe, j = P.setInitialValues, D = P.setCallbacks, T = P.setValidateMessages, A = P.setPreserve, k = P.destroyForm;
  S.useImperativeHandle(r, function() {
    return O(O({}, w), {}, {
      nativeElement: R.current
    });
  }), S.useEffect(function() {
    return E.registerForm(n, w), function() {
      E.unregisterForm(n);
    };
  }, [E, w, n]), T(O(O({}, E.validateMessages), d)), D({
    onValuesChange: g,
    onFieldsChange: function(U) {
      if (E.triggerFormChange(n, U), m) {
        for (var de = arguments.length, ie = new Array(de > 1 ? de - 1 : 0), ve = 1; ve < de; ve++)
          ie[ve - 1] = arguments[ve];
        m.apply(void 0, [U].concat(ie));
      }
    },
    onFinish: function(U) {
      E.triggerFormFinish(n, U), f && f(U);
    },
    onFinishFailed: x
  }), A(s);
  var I = S.useRef(null);
  j(a, !I.current), I.current || (I.current = !0), S.useEffect(
    function() {
      return function() {
        return k(h);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var V, z = typeof l == "function";
  if (z) {
    var J = w.getFieldsValue(!0);
    V = l(J, w);
  } else
    V = l;
  F(!z);
  var X = S.useRef();
  S.useEffect(function() {
    qm(X.current || [], i || []) || w.setFields(i || []), X.current = i;
  }, [i, w]);
  var Q = S.useMemo(function() {
    return O(O({}, w), {}, {
      validateTrigger: b
    });
  }, [w, b]), W = /* @__PURE__ */ S.createElement(va.Provider, {
    value: null
  }, /* @__PURE__ */ S.createElement(lr.Provider, {
    value: Q
  }, V));
  return c === !1 ? W : /* @__PURE__ */ S.createElement(c, Ke({}, _, {
    ref: R,
    onSubmit: function(U) {
      U.preventDefault(), U.stopPropagation(), w.submit();
    },
    onReset: function(U) {
      var de;
      U.preventDefault(), w.resetFields(), (de = _.onReset) === null || de === void 0 || de.call(_, U);
    }
  }), W);
};
function yl(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
var Qm = process.env.NODE_ENV !== "production" ? function(e) {
  var t = e.join("__RC_FIELD_FORM_SPLIT__"), r = Ne(t);
  Ae(r.current === t, "`useWatch` is not support dynamic `namePath`. Please provide static instead.");
} : function() {
};
function eg() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = t[0], a = t[1], i = a === void 0 ? {} : a, o = lm(i) ? {
    form: i
  } : i, s = o.form, l = Xa(), u = q(l, 2), c = u[0], d = u[1], v = Zc(function() {
    return yl(c);
  }, [c]), b = Ne(v);
  b.current = v;
  var g = xt(lr), m = s || g, f = m && m._init;
  process.env.NODE_ENV !== "production" && Ae(t.length === 2 ? s ? f : !0 : f, "useWatch requires a form instance since it can not auto detect from context.");
  var x = Ie(n), h = Ne(x);
  return h.current = x, Qm(x), vt(
    function() {
      if (f) {
        var _ = m.getFieldsValue, R = m.getInternalHooks, E = R(Dt), $ = E.registerWatch, y = function(j, D) {
          var T = o.preserve ? D : j;
          return typeof n == "function" ? n(T) : bt(T, h.current);
        }, w = $(function(F, j) {
          var D = y(F, j), T = yl(D);
          b.current !== T && (b.current = T, d(D));
        }), P = y(_(), _(!0));
        return c !== P && d(P), w;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f]
  ), c;
}
var tg = /* @__PURE__ */ S.forwardRef(Jm), Tn = tg;
Tn.FormProvider = Xm;
Tn.Field = jc;
Tn.List = Um;
Tn.useForm = kc;
Tn.useWatch = eg;
const Rn = /* @__PURE__ */ S.createContext({});
process.env.NODE_ENV !== "production" && (Rn.displayName = "FormItemInputContext");
const rg = ({
  children: e,
  status: t,
  override: r
}) => {
  const n = S.useContext(Rn), a = S.useMemo(() => {
    const i = Object.assign({}, n);
    return r && delete i.isFormItemInput, t && (delete i.status, delete i.hasFeedback, delete i.feedbackIcon), i;
  }, [t, r, n]);
  return /* @__PURE__ */ S.createElement(Rn.Provider, {
    value: a
  }, e);
}, ng = /* @__PURE__ */ S.createContext(void 0), Ic = (e, t, r = void 0) => {
  var n, a;
  const {
    variant: i,
    [e]: o
  } = S.useContext(Ft), s = S.useContext(ng), l = o == null ? void 0 : o.variant;
  let u;
  typeof t < "u" ? u = t : r === !1 ? u = "borderless" : u = (a = (n = s ?? l) !== null && n !== void 0 ? n : i) !== null && a !== void 0 ? a : "outlined";
  const c = qv.includes(u);
  return [u, c];
}, Sl = (e) => {
  const {
    space: t,
    form: r,
    children: n
  } = e;
  if (n == null)
    return null;
  let a = n;
  return r && (a = /* @__PURE__ */ H.createElement(rg, {
    override: !0,
    status: !0
  }, a)), t && (a = /* @__PURE__ */ H.createElement(rh, null, a)), a;
};
function ag(e, t) {
  const r = Ne([]), n = () => {
    r.current.push(setTimeout(() => {
      var a, i, o, s;
      !((a = e.current) === null || a === void 0) && a.input && ((i = e.current) === null || i === void 0 ? void 0 : i.input.getAttribute("type")) === "password" && (!((o = e.current) === null || o === void 0) && o.input.hasAttribute("value")) && ((s = e.current) === null || s === void 0 || s.input.removeAttribute("value"));
    }));
  };
  return vt(() => (n(), () => r.current.forEach((a) => {
    a && clearTimeout(a);
  })), []), n;
}
function co(e) {
  return Bt(e, {
    inputAffixPadding: e.paddingXXS
  });
}
const fo = (e) => {
  const {
    controlHeight: t,
    fontSize: r,
    lineHeight: n,
    lineWidth: a,
    controlHeightSM: i,
    controlHeightLG: o,
    fontSizeLG: s,
    lineHeightLG: l,
    paddingSM: u,
    controlPaddingHorizontalSM: c,
    controlPaddingHorizontal: d,
    colorFillAlter: v,
    colorPrimaryHover: b,
    colorPrimary: g,
    controlOutlineWidth: m,
    controlOutline: f,
    colorErrorOutline: x,
    colorWarningOutline: h,
    colorBgContainer: _,
    inputFontSize: R,
    inputFontSizeLG: E,
    inputFontSizeSM: $
  } = e, y = R || r, w = $ || y, P = E || s, F = Math.round((t - y * n) / 2 * 10) / 10 - a, j = Math.round((i - w * n) / 2 * 10) / 10 - a, D = Math.ceil((o - P * l) / 2 * 10) / 10 - a;
  return {
    paddingBlock: Math.max(F, 0),
    paddingBlockSM: Math.max(j, 0),
    paddingBlockLG: Math.max(D, 0),
    paddingInline: u - a,
    paddingInlineSM: c - a,
    paddingInlineLG: d - a,
    addonBg: v,
    activeBorderColor: g,
    hoverBorderColor: b,
    activeShadow: `0 0 0 ${m}px ${f}`,
    errorActiveShadow: `0 0 0 ${m}px ${x}`,
    warningActiveShadow: `0 0 0 ${m}px ${h}`,
    hoverBg: _,
    activeBg: _,
    inputFontSize: y,
    inputFontSizeLG: P,
    inputFontSizeSM: w
  };
}, ig = (e) => ({
  borderColor: e.hoverBorderColor,
  backgroundColor: e.hoverBg
}), vo = (e) => ({
  color: e.colorTextDisabled,
  backgroundColor: e.colorBgContainerDisabled,
  borderColor: e.colorBorder,
  boxShadow: "none",
  cursor: "not-allowed",
  opacity: 1,
  "input[disabled], textarea[disabled]": {
    cursor: "not-allowed"
  },
  "&:hover:not([disabled])": Object.assign({}, ig(Bt(e, {
    hoverBorderColor: e.colorBorder,
    hoverBg: e.colorBgContainerDisabled
  })))
}), Nc = (e, t) => ({
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
}), xl = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, Nc(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  }),
  [`&${e.componentCls}-status-${t.status}${e.componentCls}-disabled`]: {
    borderColor: t.borderColor
  }
}), og = (e, t) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Nc(e, {
    borderColor: e.colorBorder,
    hoverBorderColor: e.hoverBorderColor,
    activeBorderColor: e.activeBorderColor,
    activeShadow: e.activeShadow
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, vo(e))
  }), xl(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), xl(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), t)
}), El = (e, t) => ({
  [`&${e.componentCls}-group-wrapper-status-${t.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      borderColor: t.addonBorderColor,
      color: t.addonColor
    }
  }
}), sg = (e) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group`]: {
      "&-addon": {
        background: e.addonBg,
        border: `${De(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
      },
      "&-addon:first-child": {
        borderInlineEnd: 0
      },
      "&-addon:last-child": {
        borderInlineStart: 0
      }
    }
  }, El(e, {
    status: "error",
    addonBorderColor: e.colorError,
    addonColor: e.colorErrorText
  })), El(e, {
    status: "warning",
    addonBorderColor: e.colorWarning,
    addonColor: e.colorWarningText
  })), {
    [`&${e.componentCls}-group-wrapper-disabled`]: {
      [`${e.componentCls}-group-addon`]: Object.assign({}, vo(e))
    }
  })
}), lg = (e, t) => {
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
}, Vc = (e, t) => {
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
}, Cl = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, Vc(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  })
}), ug = (e, t) => ({
  "&-filled": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Vc(e, {
    bg: e.colorFillTertiary,
    hoverBg: e.colorFillSecondary,
    activeBorderColor: e.activeBorderColor
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, vo(e))
  }), Cl(e, {
    status: "error",
    bg: e.colorErrorBg,
    hoverBg: e.colorErrorBgHover,
    activeBorderColor: e.colorError,
    inputColor: e.colorErrorText,
    affixColor: e.colorError
  })), Cl(e, {
    status: "warning",
    bg: e.colorWarningBg,
    hoverBg: e.colorWarningBgHover,
    activeBorderColor: e.colorWarning,
    inputColor: e.colorWarningText,
    affixColor: e.colorWarning
  })), t)
}), _l = (e, t) => ({
  [`&${e.componentCls}-group-wrapper-status-${t.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      background: t.addonBg,
      color: t.addonColor
    }
  }
}), cg = (e) => ({
  "&-filled": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group-addon`]: {
      background: e.colorFillTertiary,
      "&:last-child": {
        position: "static"
      }
    }
  }, _l(e, {
    status: "error",
    addonBg: e.colorErrorBg,
    addonColor: e.colorErrorText
  })), _l(e, {
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
          borderInlineStart: `${De(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${De(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${De(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        },
        "&-addon:last-child": {
          borderInlineEnd: `${De(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${De(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${De(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        }
      }
    }
  })
}), Lc = (e, t) => ({
  background: e.colorBgContainer,
  borderWidth: `${De(e.lineWidth)} 0`,
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
}), $l = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, Lc(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  }),
  [`&${e.componentCls}-status-${t.status}${e.componentCls}-disabled`]: {
    borderColor: `transparent transparent ${t.borderColor} transparent`
  }
}), dg = (e, t) => ({
  "&-underlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Lc(e, {
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
  }), $l(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), $l(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), t)
}), fg = (e) => ({
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
}), zc = (e) => {
  const {
    paddingBlockLG: t,
    lineHeightLG: r,
    borderRadiusLG: n,
    paddingInlineLG: a
  } = e;
  return {
    padding: `${De(t)} ${De(a)}`,
    fontSize: e.inputFontSizeLG,
    lineHeight: r,
    borderRadius: n
  };
}, Hc = (e) => ({
  padding: `${De(e.paddingBlockSM)} ${De(e.paddingInlineSM)}`,
  fontSize: e.inputFontSizeSM,
  borderRadius: e.borderRadiusSM
}), qc = (e) => Object.assign(Object.assign({
  position: "relative",
  display: "inline-block",
  width: "100%",
  minWidth: 0,
  padding: `${De(e.paddingBlock)} ${De(e.paddingInline)}`,
  color: e.colorText,
  fontSize: e.inputFontSize,
  lineHeight: e.lineHeight,
  borderRadius: e.borderRadius,
  transition: `all ${e.motionDurationMid}`
}, fg(e.colorTextPlaceholder)), {
  // Size
  "&-lg": Object.assign({}, zc(e)),
  "&-sm": Object.assign({}, Hc(e)),
  // RTL
  "&-rtl, &-textarea-rtl": {
    direction: "rtl"
  }
}), vg = (e) => {
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
    [`&-lg ${t}, &-lg > ${t}-group-addon`]: Object.assign({}, zc(e)),
    [`&-sm ${t}, &-sm > ${t}-group-addon`]: Object.assign({}, Hc(e)),
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
        padding: `0 ${De(e.paddingInline)}`,
        color: e.colorText,
        fontWeight: "normal",
        fontSize: e.inputFontSize,
        textAlign: "center",
        borderRadius: e.borderRadius,
        transition: `all ${e.motionDurationSlow}`,
        lineHeight: 1,
        // Reset Select's style in addon
        [`${r}-select`]: {
          margin: `${De(e.calc(e.paddingBlock).add(1).mul(-1).equal())} ${De(e.calc(e.paddingInline).mul(-1).equal())}`,
          [`&${r}-select-single:not(${r}-select-customize-input):not(${r}-pagination-size-changer)`]: {
            [`${r}-select-selector`]: {
              backgroundColor: "inherit",
              border: `${De(e.lineWidth)} ${e.lineType} transparent`,
              boxShadow: "none"
            }
          }
        },
        // https://github.com/ant-design/ant-design/issues/31333
        [`${r}-cascader-picker`]: {
          margin: `-9px ${De(e.calc(e.paddingInline).mul(-1).equal())}`,
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
    }, hp()), {
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
}, pg = (e) => {
  const {
    componentCls: t,
    controlHeightSM: r,
    lineWidth: n,
    calc: a
  } = e, o = a(r).sub(a(n).mul(2)).sub(16).div(2).equal();
  return {
    [t]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, zu(e)), qc(e)), og(e)), ug(e)), lg(e)), dg(e)), {
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
}, hg = (e) => {
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
        margin: `0 ${De(e.inputAffixPadding)}`
      }
    }
  };
}, mg = (e) => {
  const {
    componentCls: t,
    inputAffixPadding: r,
    colorTextDescription: n,
    motionDurationSlow: a,
    colorIcon: i,
    colorIconHover: o,
    iconCls: s
  } = e, l = `${t}-affix-wrapper`, u = `${t}-affix-wrapper-disabled`;
  return {
    [l]: Object.assign(Object.assign(Object.assign(Object.assign({}, qc(e)), {
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
    }), hg(e)), {
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
    [u]: {
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
}, gg = (e) => {
  const {
    componentCls: t,
    borderRadiusLG: r,
    borderRadiusSM: n
  } = e;
  return {
    [`${t}-group`]: Object.assign(Object.assign(Object.assign({}, zu(e)), vg(e)), {
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
      }, sg(e)), cg(e)), {
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
}, bg = (e) => {
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
}, yg = (e) => {
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
}, Bc = io(["Input", "Shared"], (e) => {
  const t = Bt(e, co(e));
  return [pg(t), mg(t)];
}, fo, {
  resetFont: !1
}), Sg = io(["Input", "Component"], (e) => {
  const t = Bt(e, co(e));
  return [
    gg(t),
    bg(t),
    yg(t),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    xh(t)
  ];
}, fo, {
  resetFont: !1
});
function xg(e) {
  return !!(e.prefix || e.suffix || e.allowClear || e.showCount);
}
var Eg = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const Cg = /* @__PURE__ */ Wi((e, t) => {
  const {
    prefixCls: r,
    bordered: n = !0,
    status: a,
    size: i,
    disabled: o,
    onBlur: s,
    onFocus: l,
    suffix: u,
    allowClear: c,
    addonAfter: d,
    addonBefore: v,
    className: b,
    style: g,
    styles: m,
    rootClassName: f,
    onChange: x,
    classNames: h,
    variant: _
  } = e, R = Eg(e, ["prefixCls", "bordered", "status", "size", "disabled", "onBlur", "onFocus", "suffix", "allowClear", "addonAfter", "addonBefore", "className", "style", "styles", "rootClassName", "onChange", "classNames", "variant"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: ce
    } = Nt("Input");
    ce(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: E,
    direction: $,
    allowClear: y,
    autoComplete: w,
    className: P,
    style: F,
    classNames: j,
    styles: D
  } = ju("input"), T = E("input", r), A = Ne(null), k = Oc(T), [I, V, z] = Bc(T, f), [J] = Sg(T, k), {
    compactSize: X,
    compactItemClassnames: Q
  } = lc(T, $), W = oc((ce) => {
    var Le;
    return (Le = i ?? X) !== null && Le !== void 0 ? Le : ce;
  }), B = H.useContext(_n), U = o ?? B, {
    status: de,
    hasFeedback: ie,
    feedbackIcon: ve
  } = xt(Rn), le = Pc(de, a), fe = xg(e) || !!ie, ue = Ne(fe);
  if (process.env.NODE_ENV !== "production") {
    const ce = Nt("Input");
    vt(() => {
      var Le;
      fe && !ue.current && process.env.NODE_ENV !== "production" && ce(document.activeElement === ((Le = A.current) === null || Le === void 0 ? void 0 : Le.input), "usage", "When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ"), ue.current = fe;
    }, [fe]);
  }
  const we = ag(A), Re = (ce) => {
    we(), s == null || s(ce);
  }, ke = (ce) => {
    we(), l == null || l(ce);
  }, L = (ce) => {
    we(), x == null || x(ce);
  }, _e = (ie || u) && /* @__PURE__ */ H.createElement(H.Fragment, null, u, ie && ve), Y = Rc(c ?? y), [oe, Me] = Ic("input", _, n);
  return I(J(/* @__PURE__ */ H.createElement(wh, Object.assign({
    ref: Ul(t, A),
    prefixCls: T,
    autoComplete: w
  }, R, {
    disabled: U,
    onBlur: Re,
    onFocus: ke,
    style: Object.assign(Object.assign({}, F), g),
    styles: Object.assign(Object.assign({}, D), m),
    suffix: _e,
    allowClear: Y,
    className: Se(b, f, z, k, Q, P),
    onChange: L,
    addonBefore: v && /* @__PURE__ */ H.createElement(Sl, {
      form: !0,
      space: !0
    }, v),
    addonAfter: d && /* @__PURE__ */ H.createElement(Sl, {
      form: !0,
      space: !0
    }, d),
    classNames: Object.assign(Object.assign(Object.assign({}, h), j), {
      input: Se({
        [`${T}-sm`]: W === "small",
        [`${T}-lg`]: W === "large",
        [`${T}-rtl`]: $ === "rtl"
      }, h == null ? void 0 : h.input, j.input, V),
      variant: Se({
        [`${T}-${oe}`]: Me
      }, Mi(T, le)),
      affixWrapper: Se({
        [`${T}-affix-wrapper-sm`]: W === "small",
        [`${T}-affix-wrapper-lg`]: W === "large",
        [`${T}-affix-wrapper-rtl`]: $ === "rtl"
      }, V),
      wrapper: Se({
        [`${T}-group-rtl`]: $ === "rtl"
      }, V),
      groupWrapper: Se({
        [`${T}-group-wrapper-sm`]: W === "small",
        [`${T}-group-wrapper-lg`]: W === "large",
        [`${T}-group-wrapper-rtl`]: $ === "rtl",
        [`${T}-group-wrapper-${oe}`]: Me
      }, Mi(`${T}-group-wrapper`, le, ie), V)
    })
  }))));
});
process.env.NODE_ENV !== "production" && (Cg.displayName = "Input");
const _g = (e) => {
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
}, $g = io(["Input", "TextArea"], (e) => {
  const t = Bt(e, co(e));
  return [_g(t)];
}, fo, {
  resetFont: !1
});
var wg = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const Yg = /* @__PURE__ */ Wi((e, t) => {
  var r;
  const {
    prefixCls: n,
    bordered: a = !0,
    size: i,
    disabled: o,
    status: s,
    allowClear: l,
    classNames: u,
    rootClassName: c,
    className: d,
    style: v,
    styles: b,
    variant: g,
    showCount: m,
    onMouseDown: f,
    onResize: x
  } = e, h = wg(e, ["prefixCls", "bordered", "size", "disabled", "status", "allowClear", "classNames", "rootClassName", "className", "style", "styles", "variant", "showCount", "onMouseDown", "onResize"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: Y
    } = Nt("TextArea");
    Y(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: _,
    direction: R,
    allowClear: E,
    autoComplete: $,
    className: y,
    style: w,
    classNames: P,
    styles: F
  } = ju("textArea"), j = S.useContext(_n), D = o ?? j, {
    status: T,
    hasFeedback: A,
    feedbackIcon: k
  } = S.useContext(Rn), I = Pc(T, s), V = S.useRef(null);
  S.useImperativeHandle(t, () => {
    var Y;
    return {
      resizableTextArea: (Y = V.current) === null || Y === void 0 ? void 0 : Y.resizableTextArea,
      focus: (oe) => {
        var Me, ce;
        hc((ce = (Me = V.current) === null || Me === void 0 ? void 0 : Me.resizableTextArea) === null || ce === void 0 ? void 0 : ce.textArea, oe);
      },
      blur: () => {
        var oe;
        return (oe = V.current) === null || oe === void 0 ? void 0 : oe.blur();
      }
    };
  });
  const z = _("input", n), J = Oc(z), [X, Q, W] = Bc(z, c), [B] = $g(z, J), {
    compactSize: U,
    compactItemClassnames: de
  } = lc(z, R), ie = oc((Y) => {
    var oe;
    return (oe = i ?? U) !== null && oe !== void 0 ? oe : Y;
  }), [ve, le] = Ic("textArea", g, a), fe = Rc(l ?? E), [ue, we] = S.useState(!1), [Re, ke] = S.useState(!1), L = (Y) => {
    we(!0), f == null || f(Y);
    const oe = () => {
      we(!1), document.removeEventListener("mouseup", oe);
    };
    document.addEventListener("mouseup", oe);
  }, _e = (Y) => {
    var oe, Me;
    if (x == null || x(Y), ue && typeof getComputedStyle == "function") {
      const ce = (Me = (oe = V.current) === null || oe === void 0 ? void 0 : oe.nativeElement) === null || Me === void 0 ? void 0 : Me.querySelector("textarea");
      ce && getComputedStyle(ce).resize === "both" && ke(!0);
    }
  };
  return X(B(/* @__PURE__ */ S.createElement(im, Object.assign({
    autoComplete: $
  }, h, {
    style: Object.assign(Object.assign({}, w), v),
    styles: Object.assign(Object.assign({}, F), b),
    disabled: D,
    allowClear: fe,
    className: Se(
      W,
      J,
      d,
      c,
      de,
      y,
      // Only for wrapper
      Re && `${z}-textarea-affix-wrapper-resize-dirty`
    ),
    classNames: Object.assign(Object.assign(Object.assign({}, u), P), {
      textarea: Se({
        [`${z}-sm`]: ie === "small",
        [`${z}-lg`]: ie === "large"
      }, Q, u == null ? void 0 : u.textarea, P.textarea, ue && `${z}-mouse-active`),
      variant: Se({
        [`${z}-${ve}`]: le
      }, Mi(z, I)),
      affixWrapper: Se(`${z}-textarea-affix-wrapper`, {
        [`${z}-affix-wrapper-rtl`]: R === "rtl",
        [`${z}-affix-wrapper-sm`]: ie === "small",
        [`${z}-affix-wrapper-lg`]: ie === "large",
        [`${z}-textarea-show-count`]: m || ((r = e.count) === null || r === void 0 ? void 0 : r.show)
      }, Q)
    }),
    prefixCls: z,
    suffix: A && /* @__PURE__ */ S.createElement("span", {
      className: `${z}-textarea-suffix`
    }, k),
    showCount: m,
    ref: V,
    onResize: _e,
    onMouseDown: L
  }))));
});
export {
  Bg as L,
  Yg as T,
  qg as a,
  Hg as b,
  zg as c,
  Vg as d,
  Lg as e,
  Ig as f,
  kg as g,
  Dg as h,
  Ug as i,
  Tg as j,
  jg as k,
  Mg as l,
  Ng as s,
  Ag as z
};
