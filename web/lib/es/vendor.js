import * as b from "react";
import X, { Component as Yc, useRef as ke, cloneElement as Uc, forwardRef as ki, useState as Ba, useImperativeHandle as Fs, useEffect as bt, isValidElement as Gc, version as Kc, createContext as Vi, useContext as Ot, useMemo as Xc, useLayoutEffect as Jc } from "react";
import ye from "classnames";
import po from "react-dom";
var Wa = { exports: {} }, _r = {};
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
function Qc() {
  if (ho) return _r;
  ho = 1;
  var e = X, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(s, l, c) {
    var u, d = {}, v = null, S = null;
    c !== void 0 && (v = "" + c), l.key !== void 0 && (v = "" + l.key), l.ref !== void 0 && (S = l.ref);
    for (u in l) n.call(l, u) && !i.hasOwnProperty(u) && (d[u] = l[u]);
    if (s && s.defaultProps) for (u in l = s.defaultProps, l) d[u] === void 0 && (d[u] = l[u]);
    return { $$typeof: t, type: s, key: v, ref: S, props: d, _owner: a.current };
  }
  return _r.Fragment = r, _r.jsx = o, _r.jsxs = o, _r;
}
var $r = {};
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
function Zc() {
  return mo || (mo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = X, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), g = Symbol.iterator, h = "@@iterator";
    function f(p) {
      if (p === null || typeof p != "object")
        return null;
      var I = g && p[g] || p[h];
      return typeof I == "function" ? I : null;
    }
    var y = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function m(p) {
      {
        for (var I = arguments.length, B = new Array(I > 1 ? I - 1 : 0), Q = 1; Q < I; Q++)
          B[Q - 1] = arguments[Q];
        C("error", p, B);
      }
    }
    function C(p, I, B) {
      {
        var Q = y.ReactDebugCurrentFrame, he = Q.getStackAddendum();
        he !== "" && (I += "%s", B = B.concat([he]));
        var me = B.map(function(se) {
          return String(se);
        });
        me.unshift("Warning: " + I), Function.prototype.apply.call(console[p], console, me);
      }
    }
    var T = !1, E = !1, w = !1, x = !1, R = !1, F;
    F = Symbol.for("react.module.reference");
    function M(p) {
      return !!(typeof p == "string" || typeof p == "function" || p === n || p === i || R || p === a || p === c || p === u || x || p === S || T || E || w || typeof p == "object" && p !== null && (p.$$typeof === v || p.$$typeof === d || p.$$typeof === o || p.$$typeof === s || p.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      p.$$typeof === F || p.getModuleId !== void 0));
    }
    function N(p, I, B) {
      var Q = p.displayName;
      if (Q)
        return Q;
      var he = I.displayName || I.name || "";
      return he !== "" ? B + "(" + he + ")" : B;
    }
    function z(p) {
      return p.displayName || "Context";
    }
    function j(p) {
      if (p == null)
        return null;
      if (typeof p.tag == "number" && m("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof p == "function")
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
            var I = p;
            return z(I) + ".Consumer";
          case o:
            var B = p;
            return z(B._context) + ".Provider";
          case l:
            return N(p, p.render, "ForwardRef");
          case d:
            var Q = p.displayName || null;
            return Q !== null ? Q : j(p.type) || "Memo";
          case v: {
            var he = p, me = he._payload, se = he._init;
            try {
              return j(se(me));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, H = 0, P, $, O, L, k, V, W;
    function Y() {
    }
    Y.__reactDisabledLog = !0;
    function U() {
      {
        if (H === 0) {
          P = console.log, $ = console.info, O = console.warn, L = console.error, k = console.group, V = console.groupCollapsed, W = console.groupEnd;
          var p = {
            configurable: !0,
            enumerable: !0,
            value: Y,
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
        H++;
      }
    }
    function K() {
      {
        if (H--, H === 0) {
          var p = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: D({}, p, {
              value: P
            }),
            info: D({}, p, {
              value: $
            }),
            warn: D({}, p, {
              value: O
            }),
            error: D({}, p, {
              value: L
            }),
            group: D({}, p, {
              value: k
            }),
            groupCollapsed: D({}, p, {
              value: V
            }),
            groupEnd: D({}, p, {
              value: W
            })
          });
        }
        H < 0 && m("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Z = y.ReactCurrentDispatcher, re;
    function le(p, I, B) {
      {
        if (re === void 0)
          try {
            throw Error();
          } catch (he) {
            var Q = he.stack.trim().match(/\n( *(at )?)/);
            re = Q && Q[1] || "";
          }
        return `
` + re + p;
      }
    }
    var ve = !1, de;
    {
      var $e = typeof WeakMap == "function" ? WeakMap : Map;
      de = new $e();
    }
    function we(p, I) {
      if (!p || ve)
        return "";
      {
        var B = de.get(p);
        if (B !== void 0)
          return B;
      }
      var Q;
      ve = !0;
      var he = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var me;
      me = Z.current, Z.current = null, U();
      try {
        if (I) {
          var se = function() {
            throw Error();
          };
          if (Object.defineProperty(se.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(se, []);
            } catch (Ge) {
              Q = Ge;
            }
            Reflect.construct(p, [], se);
          } else {
            try {
              se.call();
            } catch (Ge) {
              Q = Ge;
            }
            p.call(se.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ge) {
            Q = Ge;
          }
          p();
        }
      } catch (Ge) {
        if (Ge && Q && typeof Ge.stack == "string") {
          for (var ie = Ge.stack.split(`
`), qe = Q.stack.split(`
`), Re = ie.length - 1, je = qe.length - 1; Re >= 1 && je >= 0 && ie[Re] !== qe[je]; )
            je--;
          for (; Re >= 1 && je >= 0; Re--, je--)
            if (ie[Re] !== qe[je]) {
              if (Re !== 1 || je !== 1)
                do
                  if (Re--, je--, je < 0 || ie[Re] !== qe[je]) {
                    var Ie = `
` + ie[Re].replace(" at new ", " at ");
                    return p.displayName && Ie.includes("<anonymous>") && (Ie = Ie.replace("<anonymous>", p.displayName)), typeof p == "function" && de.set(p, Ie), Ie;
                  }
                while (Re >= 1 && je >= 0);
              break;
            }
        }
      } finally {
        ve = !1, Z.current = me, K(), Error.prepareStackTrace = he;
      }
      var Qt = p ? p.displayName || p.name : "", Lt = Qt ? le(Qt) : "";
      return typeof p == "function" && de.set(p, Lt), Lt;
    }
    function De(p, I, B) {
      return we(p, !1);
    }
    function q(p) {
      var I = p.prototype;
      return !!(I && I.isReactComponent);
    }
    function Ce(p, I, B) {
      if (p == null)
        return "";
      if (typeof p == "function")
        return we(p, q(p));
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
            return De(p.render);
          case d:
            return Ce(p.type, I, B);
          case v: {
            var Q = p, he = Q._payload, me = Q._init;
            try {
              return Ce(me(he), I, B);
            } catch {
            }
          }
        }
      return "";
    }
    var J = Object.prototype.hasOwnProperty, ce = {}, Ae = y.ReactDebugCurrentFrame;
    function fe(p) {
      if (p) {
        var I = p._owner, B = Ce(p.type, p._source, I ? I.type : null);
        Ae.setExtraStackFrame(B);
      } else
        Ae.setExtraStackFrame(null);
    }
    function ze(p, I, B, Q, he) {
      {
        var me = Function.call.bind(J);
        for (var se in p)
          if (me(p, se)) {
            var ie = void 0;
            try {
              if (typeof p[se] != "function") {
                var qe = Error((Q || "React class") + ": " + B + " type `" + se + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof p[se] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw qe.name = "Invariant Violation", qe;
              }
              ie = p[se](I, se, Q, B, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Re) {
              ie = Re;
            }
            ie && !(ie instanceof Error) && (fe(he), m("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Q || "React class", B, se, typeof ie), fe(null)), ie instanceof Error && !(ie.message in ce) && (ce[ie.message] = !0, fe(he), m("Failed %s type: %s", B, ie.message), fe(null));
          }
      }
    }
    var Oe = Array.isArray;
    function _e(p) {
      return Oe(p);
    }
    function ae(p) {
      {
        var I = typeof Symbol == "function" && Symbol.toStringTag, B = I && p[Symbol.toStringTag] || p.constructor.name || "Object";
        return B;
      }
    }
    function ne(p) {
      try {
        return Se(p), !1;
      } catch {
        return !0;
      }
    }
    function Se(p) {
      return "" + p;
    }
    function ct(p) {
      if (ne(p))
        return m("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ae(p)), Se(p);
    }
    var Xe = y.ReactCurrentOwner, Je = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ut, Et;
    function br(p) {
      if (J.call(p, "ref")) {
        var I = Object.getOwnPropertyDescriptor(p, "ref").get;
        if (I && I.isReactWarning)
          return !1;
      }
      return p.ref !== void 0;
    }
    function yr(p) {
      if (J.call(p, "key")) {
        var I = Object.getOwnPropertyDescriptor(p, "key").get;
        if (I && I.isReactWarning)
          return !1;
      }
      return p.key !== void 0;
    }
    function Te(p, I) {
      typeof p.ref == "string" && Xe.current;
    }
    function pe(p, I) {
      {
        var B = function() {
          ut || (ut = !0, m("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", I));
        };
        B.isReactWarning = !0, Object.defineProperty(p, "key", {
          get: B,
          configurable: !0
        });
      }
    }
    function dt(p, I) {
      {
        var B = function() {
          Et || (Et = !0, m("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", I));
        };
        B.isReactWarning = !0, Object.defineProperty(p, "ref", {
          get: B,
          configurable: !0
        });
      }
    }
    var Rt = function(p, I, B, Q, he, me, se) {
      var ie = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: p,
        key: I,
        ref: B,
        props: se,
        // Record the component responsible for creating this element.
        _owner: me
      };
      return ie._store = {}, Object.defineProperty(ie._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(ie, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Q
      }), Object.defineProperty(ie, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: he
      }), Object.freeze && (Object.freeze(ie.props), Object.freeze(ie)), ie;
    };
    function Ea(p, I, B, Q, he) {
      {
        var me, se = {}, ie = null, qe = null;
        B !== void 0 && (ct(B), ie = "" + B), yr(I) && (ct(I.key), ie = "" + I.key), br(I) && (qe = I.ref, Te(I, he));
        for (me in I)
          J.call(I, me) && !Je.hasOwnProperty(me) && (se[me] = I[me]);
        if (p && p.defaultProps) {
          var Re = p.defaultProps;
          for (me in Re)
            se[me] === void 0 && (se[me] = Re[me]);
        }
        if (ie || qe) {
          var je = typeof p == "function" ? p.displayName || p.name || "Unknown" : p;
          ie && pe(se, je), qe && dt(se, je);
        }
        return Rt(p, ie, qe, he, Q, Xe.current, se);
      }
    }
    var Sr = y.ReactCurrentOwner, un = y.ReactDebugCurrentFrame;
    function Ft(p) {
      if (p) {
        var I = p._owner, B = Ce(p.type, p._source, I ? I.type : null);
        un.setExtraStackFrame(B);
      } else
        un.setExtraStackFrame(null);
    }
    var xr;
    xr = !1;
    function Er(p) {
      return typeof p == "object" && p !== null && p.$$typeof === t;
    }
    function dn() {
      {
        if (Sr.current) {
          var p = j(Sr.current.type);
          if (p)
            return `

Check the render method of \`` + p + "`.";
        }
        return "";
      }
    }
    function fn(p) {
      return "";
    }
    var kt = {};
    function Xt(p) {
      {
        var I = dn();
        if (!I) {
          var B = typeof p == "string" ? p : p.displayName || p.name;
          B && (I = `

Check the top-level render call using <` + B + ">.");
        }
        return I;
      }
    }
    function Vt(p, I) {
      {
        if (!p._store || p._store.validated || p.key != null)
          return;
        p._store.validated = !0;
        var B = Xt(I);
        if (kt[B])
          return;
        kt[B] = !0;
        var Q = "";
        p && p._owner && p._owner !== Sr.current && (Q = " It was passed a child from " + j(p._owner.type) + "."), Ft(p), m('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', B, Q), Ft(null);
      }
    }
    function Jt(p, I) {
      {
        if (typeof p != "object")
          return;
        if (_e(p))
          for (var B = 0; B < p.length; B++) {
            var Q = p[B];
            Er(Q) && Vt(Q, I);
          }
        else if (Er(p))
          p._store && (p._store.validated = !0);
        else if (p) {
          var he = f(p);
          if (typeof he == "function" && he !== p.entries)
            for (var me = he.call(p), se; !(se = me.next()).done; )
              Er(se.value) && Vt(se.value, I);
        }
      }
    }
    function At(p) {
      {
        var I = p.type;
        if (I == null || typeof I == "string")
          return;
        var B;
        if (typeof I == "function")
          B = I.propTypes;
        else if (typeof I == "object" && (I.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        I.$$typeof === d))
          B = I.propTypes;
        else
          return;
        if (B) {
          var Q = j(I);
          ze(B, p.props, "prop", Q, p);
        } else if (I.PropTypes !== void 0 && !xr) {
          xr = !0;
          var he = j(I);
          m("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", he || "Unknown");
        }
        typeof I.getDefaultProps == "function" && !I.getDefaultProps.isReactClassApproved && m("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Mt(p) {
      {
        for (var I = Object.keys(p.props), B = 0; B < I.length; B++) {
          var Q = I[B];
          if (Q !== "children" && Q !== "key") {
            Ft(p), m("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Q), Ft(null);
            break;
          }
        }
        p.ref !== null && (Ft(p), m("Invalid attribute `ref` supplied to `React.Fragment`."), Ft(null));
      }
    }
    var Cr = {};
    function vn(p, I, B, Q, he, me) {
      {
        var se = M(p);
        if (!se) {
          var ie = "";
          (p === void 0 || typeof p == "object" && p !== null && Object.keys(p).length === 0) && (ie += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var qe = fn();
          qe ? ie += qe : ie += dn();
          var Re;
          p === null ? Re = "null" : _e(p) ? Re = "array" : p !== void 0 && p.$$typeof === t ? (Re = "<" + (j(p.type) || "Unknown") + " />", ie = " Did you accidentally export a JSX literal instead of a component?") : Re = typeof p, m("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Re, ie);
        }
        var je = Ea(p, I, B, he, me);
        if (je == null)
          return je;
        if (se) {
          var Ie = I.children;
          if (Ie !== void 0)
            if (Q)
              if (_e(Ie)) {
                for (var Qt = 0; Qt < Ie.length; Qt++)
                  Jt(Ie[Qt], p);
                Object.freeze && Object.freeze(Ie);
              } else
                m("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Jt(Ie, p);
        }
        if (J.call(I, "key")) {
          var Lt = j(p), Ge = Object.keys(I).filter(function(qc) {
            return qc !== "key";
          }), _a = Ge.length > 0 ? "{key: someKey, " + Ge.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Cr[Lt + _a]) {
            var Wc = Ge.length > 0 ? "{" + Ge.join(": ..., ") + ": ...}" : "{}";
            m(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, _a, Lt, Wc, Lt), Cr[Lt + _a] = !0;
          }
        }
        return p === n ? Mt(je) : At(je), je;
      }
    }
    function He(p, I, B) {
      return vn(p, I, B, !0);
    }
    function pn(p, I, B) {
      return vn(p, I, B, !1);
    }
    var Ca = pn, Me = He;
    $r.Fragment = n, $r.jsx = Ca, $r.jsxs = Me;
  }()), $r;
}
process.env.NODE_ENV === "production" ? Wa.exports = Qc() : Wa.exports = Zc();
var Ng = Wa.exports, Li = {}, As = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(As);
var Ee = As.exports, Vn = {};
Object.defineProperty(Vn, "__esModule", {
  value: !0
});
Vn.default = void 0;
var eu = {
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
Vn.default = eu;
var Ln = {}, qr = {}, zn = {}, Ms = { exports: {} }, js = { exports: {} }, Is = { exports: {} }, Ds = { exports: {} };
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
})(Ds);
var Ns = Ds.exports, ks = { exports: {} };
(function(e) {
  var t = Ns.default;
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
})(ks);
var tu = ks.exports;
(function(e) {
  var t = Ns.default, r = tu;
  function n(a) {
    var i = r(a, "string");
    return t(i) == "symbol" ? i : i + "";
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Is);
var ru = Is.exports;
(function(e) {
  var t = ru;
  function r(n, a, i) {
    return (a = t(a)) in n ? Object.defineProperty(n, a, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : n[a] = i, n;
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(js);
var nu = js.exports;
(function(e) {
  var t = nu;
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
})(Ms);
var Yt = Ms.exports, $t = {};
Object.defineProperty($t, "__esModule", {
  value: !0
});
$t.commonLocale = void 0;
$t.commonLocale = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: !0
};
var au = Ee.default;
Object.defineProperty(zn, "__esModule", {
  value: !0
});
zn.default = void 0;
var go = au(Yt), iu = $t, ou = (0, go.default)((0, go.default)({}, iu.commonLocale), {}, {
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
zn.default = ou;
var Yr = {};
Object.defineProperty(Yr, "__esModule", {
  value: !0
});
Yr.default = void 0;
const su = {
  placeholder: "请选择时间",
  rangePlaceholder: ["开始时间", "结束时间"]
};
Yr.default = su;
var Vs = Ee.default;
Object.defineProperty(qr, "__esModule", {
  value: !0
});
qr.default = void 0;
var lu = Vs(zn), cu = Vs(Yr);
const Ls = {
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
  }, lu.default),
  timePickerLocale: Object.assign({}, cu.default)
};
Ls.lang.ok = "确定";
qr.default = Ls;
var uu = Ee.default;
Object.defineProperty(Ln, "__esModule", {
  value: !0
});
Ln.default = void 0;
var du = uu(qr);
Ln.default = du.default;
var Hn = Ee.default;
Object.defineProperty(Li, "__esModule", {
  value: !0
});
var fu = Li.default = void 0, vu = Hn(Vn), pu = Hn(Ln), hu = Hn(qr), mu = Hn(Yr);
const Qe = "${label}不是一个有效的${type}", gu = {
  locale: "zh-cn",
  Pagination: vu.default,
  DatePicker: hu.default,
  TimePicker: mu.default,
  Calendar: pu.default,
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
fu = Li.default = gu;
var zi = {}, Bn = {};
Object.defineProperty(Bn, "__esModule", {
  value: !0
});
Bn.default = void 0;
var bu = {
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
Bn.default = bu;
var Wn = {}, Ur = {}, qn = {}, yu = Ee.default;
Object.defineProperty(qn, "__esModule", {
  value: !0
});
qn.default = void 0;
var bo = yu(Yt), Su = $t, xu = (0, bo.default)((0, bo.default)({}, Su.commonLocale), {}, {
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
qn.default = xu;
var Gr = {};
Object.defineProperty(Gr, "__esModule", {
  value: !0
});
Gr.default = void 0;
const Eu = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
Gr.default = Eu;
var zs = Ee.default;
Object.defineProperty(Ur, "__esModule", {
  value: !0
});
Ur.default = void 0;
var Cu = zs(qn), _u = zs(Gr);
const $u = {
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
  }, Cu.default),
  timePickerLocale: Object.assign({}, _u.default)
};
Ur.default = $u;
var wu = Ee.default;
Object.defineProperty(Wn, "__esModule", {
  value: !0
});
Wn.default = void 0;
var Pu = wu(Ur);
Wn.default = Pu.default;
var Yn = Ee.default;
Object.defineProperty(zi, "__esModule", {
  value: !0
});
var Ou = zi.default = void 0, Tu = Yn(Bn), Ru = Yn(Wn), Fu = Yn(Ur), Au = Yn(Gr);
const Ze = "${label} is not a valid ${type}", Mu = {
  locale: "en",
  Pagination: Tu.default,
  DatePicker: Fu.default,
  TimePicker: Au.default,
  Calendar: Ru.default,
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
Ou = zi.default = Mu;
var Hi = {}, Un = {};
Object.defineProperty(Un, "__esModule", {
  value: !0
});
Un.default = void 0;
var ju = {
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
Un.default = ju;
var Gn = {}, Kr = {}, Kn = {}, Iu = Ee.default;
Object.defineProperty(Kn, "__esModule", {
  value: !0
});
Kn.default = void 0;
var yo = Iu(Yt), Du = $t, Nu = (0, yo.default)((0, yo.default)({}, Du.commonLocale), {}, {
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
Kn.default = Nu;
var Xr = {};
Object.defineProperty(Xr, "__esModule", {
  value: !0
});
Xr.default = void 0;
const ku = {
  placeholder: "Zeit auswählen",
  rangePlaceholder: ["Startzeit", "Endzeit"]
};
Xr.default = ku;
var Hs = Ee.default;
Object.defineProperty(Kr, "__esModule", {
  value: !0
});
Kr.default = void 0;
var Vu = Hs(Kn), Lu = Hs(Xr);
const zu = {
  lang: Object.assign({
    placeholder: "Datum auswählen",
    rangePlaceholder: ["Startdatum", "Enddatum"],
    shortWeekDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    shortMonths: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
  }, Vu.default),
  timePickerLocale: Object.assign({}, Lu.default)
};
Kr.default = zu;
var Hu = Ee.default;
Object.defineProperty(Gn, "__esModule", {
  value: !0
});
Gn.default = void 0;
var Bu = Hu(Kr);
Gn.default = Bu.default;
var Xn = Ee.default;
Object.defineProperty(Hi, "__esModule", {
  value: !0
});
var Wu = Hi.default = void 0, qu = Xn(Un), Yu = Xn(Gn), Uu = Xn(Kr), Gu = Xn(Xr);
const et = "${label} ist nicht gültig. ${type} erwartet", Ku = {
  locale: "de",
  Pagination: qu.default,
  DatePicker: Uu.default,
  TimePicker: Gu.default,
  Calendar: Yu.default,
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
Wu = Hi.default = Ku;
var Bi = {}, Jn = {};
Object.defineProperty(Jn, "__esModule", {
  value: !0
});
Jn.default = void 0;
var Xu = {
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
Jn.default = Xu;
var Qn = {}, Jr = {}, Zn = {}, Ju = Ee.default;
Object.defineProperty(Zn, "__esModule", {
  value: !0
});
Zn.default = void 0;
var So = Ju(Yt), Qu = $t, Zu = (0, So.default)((0, So.default)({}, Qu.commonLocale), {}, {
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
Zn.default = Zu;
var Qr = {};
Object.defineProperty(Qr, "__esModule", {
  value: !0
});
Qr.default = void 0;
const ed = {
  placeholder: "Seleccionar hora"
};
Qr.default = ed;
var Bs = Ee.default;
Object.defineProperty(Jr, "__esModule", {
  value: !0
});
Jr.default = void 0;
var td = Bs(Zn), rd = Bs(Qr);
const nd = {
  lang: Object.assign({
    placeholder: "Seleccionar fecha",
    rangePlaceholder: ["Fecha inicial", "Fecha final"],
    shortWeekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    shortMonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  }, td.default),
  timePickerLocale: Object.assign({}, rd.default)
};
Jr.default = nd;
var ad = Ee.default;
Object.defineProperty(Qn, "__esModule", {
  value: !0
});
Qn.default = void 0;
var id = ad(Jr);
Qn.default = id.default;
var ea = Ee.default;
Object.defineProperty(Bi, "__esModule", {
  value: !0
});
var od = Bi.default = void 0, sd = ea(Jn), ld = ea(Qn), cd = ea(Jr), ud = ea(Qr);
const tt = "${label} no es un ${type} válido", dd = {
  locale: "es",
  Pagination: sd.default,
  DatePicker: cd.default,
  TimePicker: ud.default,
  Calendar: ld.default,
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
od = Bi.default = dd;
var Wi = {}, ta = {};
Object.defineProperty(ta, "__esModule", {
  value: !0
});
ta.default = void 0;
var fd = {
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
ta.default = fd;
var ra = {}, Zr = {}, na = {}, vd = Ee.default;
Object.defineProperty(na, "__esModule", {
  value: !0
});
na.default = void 0;
var xo = vd(Yt), pd = $t, hd = (0, xo.default)((0, xo.default)({}, pd.commonLocale), {}, {
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
na.default = hd;
var en = {};
Object.defineProperty(en, "__esModule", {
  value: !0
});
en.default = void 0;
const md = {
  placeholder: "Sélectionner l'heure",
  rangePlaceholder: ["Heure de début", "Heure de fin"]
};
en.default = md;
var Ws = Ee.default;
Object.defineProperty(Zr, "__esModule", {
  value: !0
});
Zr.default = void 0;
var gd = Ws(na), bd = Ws(en);
const yd = {
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
  }, gd.default),
  timePickerLocale: Object.assign({}, bd.default)
};
Zr.default = yd;
var Sd = Ee.default;
Object.defineProperty(ra, "__esModule", {
  value: !0
});
ra.default = void 0;
var xd = Sd(Zr);
ra.default = xd.default;
var aa = Ee.default;
Object.defineProperty(Wi, "__esModule", {
  value: !0
});
var Ed = Wi.default = void 0, Cd = aa(ta), _d = aa(ra), $d = aa(Zr), wd = aa(en);
const rt = "La valeur du champ ${label} n'est pas valide pour le type ${type}", Pd = {
  locale: "fr",
  Pagination: Cd.default,
  DatePicker: $d.default,
  TimePicker: wd.default,
  Calendar: _d.default,
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
Ed = Wi.default = Pd;
var qi = {}, ia = {};
Object.defineProperty(ia, "__esModule", {
  value: !0
});
ia.default = void 0;
var Od = {
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
ia.default = Od;
var oa = {}, tn = {}, sa = {}, Td = Ee.default;
Object.defineProperty(sa, "__esModule", {
  value: !0
});
sa.default = void 0;
var Eo = Td(Yt), Rd = $t, Fd = (0, Eo.default)((0, Eo.default)({}, Rd.commonLocale), {}, {
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
sa.default = Fd;
var rn = {};
Object.defineProperty(rn, "__esModule", {
  value: !0
});
rn.default = void 0;
const Ad = {
  placeholder: "اختيار الوقت"
};
rn.default = Ad;
var qs = Ee.default;
Object.defineProperty(tn, "__esModule", {
  value: !0
});
tn.default = void 0;
var Md = qs(sa), jd = qs(rn);
const Id = {
  lang: Object.assign({
    placeholder: "اختيار التاريخ",
    rangePlaceholder: ["البداية", "النهاية"],
    yearFormat: "YYYY",
    monthFormat: "MMMM",
    monthBeforeYear: !0,
    shortWeekDays: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    shortMonths: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
  }, Md.default),
  timePickerLocale: Object.assign({}, jd.default)
};
tn.default = Id;
var Dd = Ee.default;
Object.defineProperty(oa, "__esModule", {
  value: !0
});
oa.default = void 0;
var Nd = Dd(tn);
oa.default = Nd.default;
var la = Ee.default;
Object.defineProperty(qi, "__esModule", {
  value: !0
});
var kd = qi.default = void 0, Vd = la(ia), Ld = la(oa), zd = la(tn), Hd = la(rn);
const nt = "ليس ${label} من نوع ${type} صالحًا", Bd = {
  locale: "ar",
  Pagination: Vd.default,
  DatePicker: zd.default,
  TimePicker: Hd.default,
  Calendar: Ld.default,
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
kd = qi.default = Bd;
var Yi = {}, ca = {};
Object.defineProperty(ca, "__esModule", {
  value: !0
});
ca.default = void 0;
var Wd = {
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
ca.default = Wd;
var ua = {}, nn = {}, da = {}, qd = Ee.default;
Object.defineProperty(da, "__esModule", {
  value: !0
});
da.default = void 0;
var Co = qd(Yt), Yd = $t, Ud = (0, Co.default)((0, Co.default)({}, Yd.commonLocale), {}, {
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
da.default = Ud;
var an = {};
Object.defineProperty(an, "__esModule", {
  value: !0
});
an.default = void 0;
const Gd = {
  placeholder: "Välj tid"
};
an.default = Gd;
var Ys = Ee.default;
Object.defineProperty(nn, "__esModule", {
  value: !0
});
nn.default = void 0;
var Kd = Ys(da), Xd = Ys(an);
const Jd = {
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
  }, Kd.default),
  timePickerLocale: Object.assign({}, Xd.default)
};
nn.default = Jd;
var Qd = Ee.default;
Object.defineProperty(ua, "__esModule", {
  value: !0
});
ua.default = void 0;
var Zd = Qd(nn);
ua.default = Zd.default;
var fa = Ee.default;
Object.defineProperty(Yi, "__esModule", {
  value: !0
});
var ef = Yi.default = void 0, tf = fa(ca), rf = fa(ua), nf = fa(nn), af = fa(an);
const at = "${label} är inte en giltig ${type}", of = {
  locale: "sv",
  Pagination: tf.default,
  DatePicker: nf.default,
  TimePicker: af.default,
  Calendar: rf.default,
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
ef = Yi.default = of;
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
var qa = function(e, t) {
  return qa = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var a in n) n.hasOwnProperty(a) && (r[a] = n[a]);
  }, qa(e, t);
};
function sf(e, t) {
  qa(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var Rr = function() {
  return Rr = Object.assign || function(t) {
    for (var r, n = 1, a = arguments.length; n < a; n++) {
      r = arguments[n];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }, Rr.apply(this, arguments);
};
function lf(e, t, r, n) {
  var a, i = !1, o = 0;
  function s() {
    a && clearTimeout(a);
  }
  function l() {
    s(), i = !0;
  }
  typeof t != "boolean" && (n = r, r = t, t = void 0);
  function c() {
    var u = this, d = Date.now() - o, v = arguments;
    if (i)
      return;
    function S() {
      o = Date.now(), r.apply(u, v);
    }
    function g() {
      a = void 0;
    }
    n && !a && S(), s(), n === void 0 && d > e ? S() : t !== !0 && (a = setTimeout(n ? g : S, n === void 0 ? e - d : e));
  }
  return c.cancel = l, c;
}
var ir = {
  Pixel: "Pixel",
  Percent: "Percent"
}, _o = {
  unit: ir.Percent,
  value: 0.8
};
function $o(e) {
  return typeof e == "number" ? {
    unit: ir.Percent,
    value: e * 100
  } : typeof e == "string" ? e.match(/^(\d*(\.\d+)?)px$/) ? {
    unit: ir.Pixel,
    value: parseFloat(e)
  } : e.match(/^(\d*(\.\d+)?)%$/) ? {
    unit: ir.Percent,
    value: parseFloat(e)
  } : (console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'), _o) : (console.warn("scrollThreshold should be string or number"), _o);
}
var kg = (
  /** @class */
  function(e) {
    sf(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return n.lastScrollTop = 0, n.actionTriggered = !1, n.startY = 0, n.currentY = 0, n.dragging = !1, n.maxPullDownDistance = 0, n.getScrollableTarget = function() {
        return n.props.scrollableTarget instanceof HTMLElement ? n.props.scrollableTarget : typeof n.props.scrollableTarget == "string" ? document.getElementById(n.props.scrollableTarget) : (n.props.scrollableTarget === null && console.warn(`You are trying to pass scrollableTarget but it is null. This might
        happen because the element may not have been added to DOM yet.
        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.
      `), null);
      }, n.onStart = function(a) {
        n.lastScrollTop || (n.dragging = !0, a instanceof MouseEvent ? n.startY = a.pageY : a instanceof TouchEvent && (n.startY = a.touches[0].pageY), n.currentY = n.startY, n._infScroll && (n._infScroll.style.willChange = "transform", n._infScroll.style.transition = "transform 0.2s cubic-bezier(0,0,0.31,1)"));
      }, n.onMove = function(a) {
        n.dragging && (a instanceof MouseEvent ? n.currentY = a.pageY : a instanceof TouchEvent && (n.currentY = a.touches[0].pageY), !(n.currentY < n.startY) && (n.currentY - n.startY >= Number(n.props.pullDownToRefreshThreshold) && n.setState({
          pullToRefreshThresholdBreached: !0
        }), !(n.currentY - n.startY > n.maxPullDownDistance * 1.5) && n._infScroll && (n._infScroll.style.overflow = "visible", n._infScroll.style.transform = "translate3d(0px, " + (n.currentY - n.startY) + "px, 0px)")));
      }, n.onEnd = function() {
        n.startY = 0, n.currentY = 0, n.dragging = !1, n.state.pullToRefreshThresholdBreached && (n.props.refreshFunction && n.props.refreshFunction(), n.setState({
          pullToRefreshThresholdBreached: !1
        })), requestAnimationFrame(function() {
          n._infScroll && (n._infScroll.style.overflow = "auto", n._infScroll.style.transform = "none", n._infScroll.style.willChange = "unset");
        });
      }, n.onScrollListener = function(a) {
        typeof n.props.onScroll == "function" && setTimeout(function() {
          return n.props.onScroll && n.props.onScroll(a);
        }, 0);
        var i = n.props.height || n._scrollableNode ? a.target : document.documentElement.scrollTop ? document.documentElement : document.body;
        if (!n.actionTriggered) {
          var o = n.props.inverse ? n.isElementAtTop(i, n.props.scrollThreshold) : n.isElementAtBottom(i, n.props.scrollThreshold);
          o && n.props.hasMore && (n.actionTriggered = !0, n.setState({ showLoader: !0 }), n.props.next && n.props.next()), n.lastScrollTop = i.scrollTop;
        }
      }, n.state = {
        showLoader: !1,
        pullToRefreshThresholdBreached: !1,
        prevDataLength: r.dataLength
      }, n.throttledOnScrollListener = lf(150, n.onScrollListener).bind(n), n.onStart = n.onStart.bind(n), n.onMove = n.onMove.bind(n), n.onEnd = n.onEnd.bind(n), n;
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
      var a = r.dataLength !== n.prevDataLength;
      return a ? Rr(Rr({}, n), { prevDataLength: r.dataLength }) : null;
    }, t.prototype.isElementAtTop = function(r, n) {
      n === void 0 && (n = 0.8);
      var a = r === document.body || r === document.documentElement ? window.screen.availHeight : r.clientHeight, i = $o(n);
      return i.unit === ir.Pixel ? r.scrollTop <= i.value + a - r.scrollHeight + 1 : r.scrollTop <= i.value / 100 + a - r.scrollHeight + 1;
    }, t.prototype.isElementAtBottom = function(r, n) {
      n === void 0 && (n = 0.8);
      var a = r === document.body || r === document.documentElement ? window.screen.availHeight : r.clientHeight, i = $o(n);
      return i.unit === ir.Pixel ? r.scrollTop + a >= r.scrollHeight - i.value : r.scrollTop + a >= i.value / 100 * r.scrollHeight;
    }, t.prototype.render = function() {
      var r = this, n = Rr({ height: this.props.height || "auto", overflow: "auto", WebkitOverflowScrolling: "touch" }, this.props.style), a = this.props.hasChildren || !!(this.props.children && this.props.children instanceof Array && this.props.children.length), i = this.props.pullDownToRefresh && this.props.height ? { overflow: "auto" } : {};
      return X.createElement(
        "div",
        { style: i, className: "infinite-scroll-component__outerdiv" },
        X.createElement(
          "div",
          { className: "infinite-scroll-component " + (this.props.className || ""), ref: function(o) {
            return r._infScroll = o;
          }, style: n },
          this.props.pullDownToRefresh && X.createElement(
            "div",
            { style: { position: "relative" }, ref: function(o) {
              return r._pullDown = o;
            } },
            X.createElement("div", { style: {
              position: "absolute",
              left: 0,
              right: 0,
              top: -1 * this.maxPullDownDistance
            } }, this.state.pullToRefreshThresholdBreached ? this.props.releaseToRefreshContent : this.props.pullDownToRefreshContent)
          ),
          this.props.children,
          !this.state.showLoader && !a && this.props.hasMore && this.props.loader,
          this.state.showLoader && this.props.hasMore && this.props.loader,
          !this.props.hasMore && this.props.endMessage
        )
      );
    }, t;
  }(Yc)
);
function Ke() {
  return Ke = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ke.apply(null, arguments);
}
function te(e) {
  "@babel/helpers - typeof";
  return te = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, te(e);
}
function cf(e, t) {
  if (te(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (te(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Us(e) {
  var t = cf(e, "string");
  return te(t) == "symbol" ? t : t + "";
}
function _(e, t, r) {
  return (t = Us(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function wo(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function A(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wo(Object(r), !0).forEach(function(n) {
      _(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wo(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ya(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function uf(e) {
  if (Array.isArray(e)) return Ya(e);
}
function Gs(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Ui(e, t) {
  if (e) {
    if (typeof e == "string") return Ya(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Ya(e, t) : void 0;
  }
}
function df() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ee(e) {
  return uf(e) || Gs(e) || Ui(e) || df();
}
function Ks(e) {
  if (Array.isArray(e)) return e;
}
function ff(e, t) {
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
function Xs() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function G(e, t) {
  return Ks(e) || ff(e, t) || Ui(e, t) || Xs();
}
function vf(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function pt(e, t) {
  if (e == null) return {};
  var r, n, a = vf(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (a[r] = e[r]);
  }
  return a;
}
function pf(e) {
  return !!(e.addonBefore || e.addonAfter);
}
function hf(e) {
  return !!(e.prefix || e.suffix || e.allowClear);
}
function Po(e, t, r) {
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
function Fn(e, t, r, n) {
  if (r) {
    var a = t;
    if (t.type === "click") {
      a = Po(t, e, ""), r(a);
      return;
    }
    if (e.type !== "file" && n !== void 0) {
      a = Po(t, e, n), r(a);
      return;
    }
    r(a);
  }
}
function Js(e, t) {
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
var Qs = /* @__PURE__ */ X.forwardRef(function(e, t) {
  var r, n, a, i = e.inputElement, o = e.children, s = e.prefixCls, l = e.prefix, c = e.suffix, u = e.addonBefore, d = e.addonAfter, v = e.className, S = e.style, g = e.disabled, h = e.readOnly, f = e.focused, y = e.triggerFocus, m = e.allowClear, C = e.value, T = e.handleReset, E = e.hidden, w = e.classes, x = e.classNames, R = e.dataAttrs, F = e.styles, M = e.components, N = e.onClear, z = o ?? i, j = (M == null ? void 0 : M.affixWrapper) || "span", D = (M == null ? void 0 : M.groupWrapper) || "span", H = (M == null ? void 0 : M.wrapper) || "span", P = (M == null ? void 0 : M.groupAddon) || "span", $ = ke(null), O = function(Ce) {
    var J;
    (J = $.current) !== null && J !== void 0 && J.contains(Ce.target) && (y == null || y());
  }, L = hf(e), k = /* @__PURE__ */ Uc(z, {
    value: C,
    className: ye((r = z.props) === null || r === void 0 ? void 0 : r.className, !L && (x == null ? void 0 : x.variant)) || null
  }), V = ke(null);
  if (X.useImperativeHandle(t, function() {
    return {
      nativeElement: V.current || $.current
    };
  }), L) {
    var W = null;
    if (m) {
      var Y = !g && !h && C, U = "".concat(s, "-clear-icon"), K = te(m) === "object" && m !== null && m !== void 0 && m.clearIcon ? m.clearIcon : "✖";
      W = /* @__PURE__ */ X.createElement("button", {
        type: "button",
        tabIndex: -1,
        onClick: function(Ce) {
          T == null || T(Ce), N == null || N();
        },
        onMouseDown: function(Ce) {
          return Ce.preventDefault();
        },
        className: ye(U, _(_({}, "".concat(U, "-hidden"), !Y), "".concat(U, "-has-suffix"), !!c))
      }, K);
    }
    var Z = "".concat(s, "-affix-wrapper"), re = ye(Z, _(_(_(_(_({}, "".concat(s, "-disabled"), g), "".concat(Z, "-disabled"), g), "".concat(Z, "-focused"), f), "".concat(Z, "-readonly"), h), "".concat(Z, "-input-with-clear-btn"), c && m && C), w == null ? void 0 : w.affixWrapper, x == null ? void 0 : x.affixWrapper, x == null ? void 0 : x.variant), le = (c || m) && /* @__PURE__ */ X.createElement("span", {
      className: ye("".concat(s, "-suffix"), x == null ? void 0 : x.suffix),
      style: F == null ? void 0 : F.suffix
    }, W, c);
    k = /* @__PURE__ */ X.createElement(j, Ke({
      className: re,
      style: F == null ? void 0 : F.affixWrapper,
      onClick: O
    }, R == null ? void 0 : R.affixWrapper, {
      ref: $
    }), l && /* @__PURE__ */ X.createElement("span", {
      className: ye("".concat(s, "-prefix"), x == null ? void 0 : x.prefix),
      style: F == null ? void 0 : F.prefix
    }, l), k, le);
  }
  if (pf(e)) {
    var ve = "".concat(s, "-group"), de = "".concat(ve, "-addon"), $e = "".concat(ve, "-wrapper"), we = ye("".concat(s, "-wrapper"), ve, w == null ? void 0 : w.wrapper, x == null ? void 0 : x.wrapper), De = ye($e, _({}, "".concat($e, "-disabled"), g), w == null ? void 0 : w.group, x == null ? void 0 : x.groupWrapper);
    k = /* @__PURE__ */ X.createElement(D, {
      className: De,
      ref: V
    }, /* @__PURE__ */ X.createElement(H, {
      className: we
    }, u && /* @__PURE__ */ X.createElement(P, {
      className: de
    }, u), k, d && /* @__PURE__ */ X.createElement(P, {
      className: de
    }, d)));
  }
  return /* @__PURE__ */ X.cloneElement(k, {
    className: ye((n = k.props) === null || n === void 0 ? void 0 : n.className, v) || null,
    style: A(A({}, (a = k.props) === null || a === void 0 ? void 0 : a.style), S),
    hidden: E
  });
});
function jr(e) {
  var t = b.useRef();
  t.current = e;
  var r = b.useCallback(function() {
    for (var n, a = arguments.length, i = new Array(a), o = 0; o < a; o++)
      i[o] = arguments[o];
    return (n = t.current) === null || n === void 0 ? void 0 : n.call.apply(n, [t].concat(i));
  }, []);
  return r;
}
function Tt() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var Oo = process.env.NODE_ENV !== "test" && Tt() ? b.useLayoutEffect : b.useEffect, An = function(t, r) {
  var n = b.useRef(!0);
  Oo(function() {
    return t(n.current);
  }, r), Oo(function() {
    return n.current = !1, function() {
      n.current = !0;
    };
  }, []);
}, To = function(t, r) {
  An(function(n) {
    if (!n)
      return t();
  }, r);
};
function Ir(e) {
  var t = b.useRef(!1), r = b.useState(e), n = G(r, 2), a = n[0], i = n[1];
  b.useEffect(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function o(s, l) {
    l && t.current || i(s);
  }
  return [a, o];
}
function $a(e) {
  return e !== void 0;
}
function Gi(e, t) {
  var r = t || {}, n = r.defaultValue, a = r.value, i = r.onChange, o = r.postState, s = Ir(function() {
    return $a(a) ? a : $a(n) ? typeof n == "function" ? n() : n : typeof e == "function" ? e() : e;
  }), l = G(s, 2), c = l[0], u = l[1], d = a !== void 0 ? a : c, v = o ? o(d) : d, S = jr(i), g = Ir([d]), h = G(g, 2), f = h[0], y = h[1];
  To(function() {
    var C = f[0];
    c !== C && S(c, C);
  }, [f]), To(function() {
    $a(a) || u(a);
  }, [a]);
  var m = jr(function(C, T) {
    u(C, T), y([d], T);
  });
  return [v, m];
}
function mf(e, t) {
  var r = Object.assign({}, e);
  return Array.isArray(t) && t.forEach(function(n) {
    delete r[n];
  }), r;
}
var gf = ["show"];
function Zs(e, t) {
  return b.useMemo(function() {
    var r = {};
    t && (r.show = te(t) === "object" && t.formatter ? t.formatter : !!t), r = A(A({}, r), e);
    var n = r, a = n.show, i = pt(n, gf);
    return A(A({}, i), {}, {
      show: !!a,
      showFormatter: typeof a == "function" ? a : void 0,
      strategy: i.strategy || function(o) {
        return o.length;
      }
    });
  }, [e, t]);
}
var bf = ["autoComplete", "onChange", "onFocus", "onBlur", "onPressEnter", "onKeyDown", "onKeyUp", "prefixCls", "disabled", "htmlSize", "className", "maxLength", "suffix", "showCount", "count", "type", "classes", "classNames", "styles", "onCompositionStart", "onCompositionEnd"], yf = /* @__PURE__ */ ki(function(e, t) {
  var r = e.autoComplete, n = e.onChange, a = e.onFocus, i = e.onBlur, o = e.onPressEnter, s = e.onKeyDown, l = e.onKeyUp, c = e.prefixCls, u = c === void 0 ? "rc-input" : c, d = e.disabled, v = e.htmlSize, S = e.className, g = e.maxLength, h = e.suffix, f = e.showCount, y = e.count, m = e.type, C = m === void 0 ? "text" : m, T = e.classes, E = e.classNames, w = e.styles, x = e.onCompositionStart, R = e.onCompositionEnd, F = pt(e, bf), M = Ba(!1), N = G(M, 2), z = N[0], j = N[1], D = ke(!1), H = ke(!1), P = ke(null), $ = ke(null), O = function(ne) {
    P.current && Js(P.current, ne);
  }, L = Gi(e.defaultValue, {
    value: e.value
  }), k = G(L, 2), V = k[0], W = k[1], Y = V == null ? "" : String(V), U = Ba(null), K = G(U, 2), Z = K[0], re = K[1], le = Zs(y, f), ve = le.max || g, de = le.strategy(Y), $e = !!ve && de > ve;
  Fs(t, function() {
    var ae;
    return {
      focus: O,
      blur: function() {
        var Se;
        (Se = P.current) === null || Se === void 0 || Se.blur();
      },
      setSelectionRange: function(Se, ct, Xe) {
        var Je;
        (Je = P.current) === null || Je === void 0 || Je.setSelectionRange(Se, ct, Xe);
      },
      select: function() {
        var Se;
        (Se = P.current) === null || Se === void 0 || Se.select();
      },
      input: P.current,
      nativeElement: ((ae = $.current) === null || ae === void 0 ? void 0 : ae.nativeElement) || P.current
    };
  }), bt(function() {
    H.current && (H.current = !1), j(function(ae) {
      return ae && d ? !1 : ae;
    });
  }, [d]);
  var we = function(ne, Se, ct) {
    var Xe = Se;
    if (!D.current && le.exceedFormatter && le.max && le.strategy(Se) > le.max) {
      if (Xe = le.exceedFormatter(Se, {
        max: le.max
      }), Se !== Xe) {
        var Je, ut;
        re([((Je = P.current) === null || Je === void 0 ? void 0 : Je.selectionStart) || 0, ((ut = P.current) === null || ut === void 0 ? void 0 : ut.selectionEnd) || 0]);
      }
    } else if (ct.source === "compositionEnd")
      return;
    W(Xe), P.current && Fn(P.current, ne, n, Xe);
  };
  bt(function() {
    if (Z) {
      var ae;
      (ae = P.current) === null || ae === void 0 || ae.setSelectionRange.apply(ae, ee(Z));
    }
  }, [Z]);
  var De = function(ne) {
    we(ne, ne.target.value, {
      source: "change"
    });
  }, q = function(ne) {
    D.current = !1, we(ne, ne.currentTarget.value, {
      source: "compositionEnd"
    }), R == null || R(ne);
  }, Ce = function(ne) {
    o && ne.key === "Enter" && !H.current && (H.current = !0, o(ne)), s == null || s(ne);
  }, J = function(ne) {
    ne.key === "Enter" && (H.current = !1), l == null || l(ne);
  }, ce = function(ne) {
    j(!0), a == null || a(ne);
  }, Ae = function(ne) {
    H.current && (H.current = !1), j(!1), i == null || i(ne);
  }, fe = function(ne) {
    W(""), O(), P.current && Fn(P.current, ne, n);
  }, ze = $e && "".concat(u, "-out-of-range"), Oe = function() {
    var ne = mf(e, [
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
    return /* @__PURE__ */ X.createElement("input", Ke({
      autoComplete: r
    }, ne, {
      onChange: De,
      onFocus: ce,
      onBlur: Ae,
      onKeyDown: Ce,
      onKeyUp: J,
      className: ye(u, _({}, "".concat(u, "-disabled"), d), E == null ? void 0 : E.input),
      style: w == null ? void 0 : w.input,
      ref: P,
      size: v,
      type: C,
      onCompositionStart: function(ct) {
        D.current = !0, x == null || x(ct);
      },
      onCompositionEnd: q
    }));
  }, _e = function() {
    var ne = Number(ve) > 0;
    if (h || le.show) {
      var Se = le.showFormatter ? le.showFormatter({
        value: Y,
        count: de,
        maxLength: ve
      }) : "".concat(de).concat(ne ? " / ".concat(ve) : "");
      return /* @__PURE__ */ X.createElement(X.Fragment, null, le.show && /* @__PURE__ */ X.createElement("span", {
        className: ye("".concat(u, "-show-count-suffix"), _({}, "".concat(u, "-show-count-has-suffix"), !!h), E == null ? void 0 : E.count),
        style: A({}, w == null ? void 0 : w.count)
      }, Se), h);
    }
    return null;
  };
  return /* @__PURE__ */ X.createElement(Qs, Ke({}, F, {
    prefixCls: u,
    className: ye(S, ze),
    handleReset: fe,
    value: Y,
    focused: z,
    triggerFocus: O,
    suffix: _e(),
    disabled: d,
    classes: T,
    classNames: E,
    styles: w
  }), Oe());
}), Sf = Symbol.for("react.element"), xf = Symbol.for("react.transitional.element"), Ef = Symbol.for("react.fragment");
function el(e) {
  return (
    // Base object type
    e && te(e) === "object" && // React Element type
    (e.$$typeof === Sf || e.$$typeof === xf) && // React Fragment type
    e.type === Ef
  );
}
function Mn(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [];
  return X.Children.forEach(e, function(n) {
    n == null && !t.keepEmpty || (Array.isArray(n) ? r = r.concat(Mn(n)) : el(n) && n.props ? r = r.concat(Mn(n.props.children, t)) : r.push(n));
  }), r;
}
var Ua = {}, Ki = [], Cf = function(t) {
  Ki.push(t);
};
function Dr(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = Ki.reduce(function(n, a) {
      return a(n ?? "", "warning");
    }, t);
    r && console.error("Warning: ".concat(r));
  }
}
function _f(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = Ki.reduce(function(n, a) {
      return a(n ?? "", "note");
    }, t);
    r && console.warn("Note: ".concat(r));
  }
}
function tl() {
  Ua = {};
}
function rl(e, t, r) {
  !t && !Ua[r] && (e(!1, r), Ua[r] = !0);
}
function Fe(e, t) {
  rl(Dr, e, t);
}
function $f(e, t) {
  rl(_f, e, t);
}
Fe.preMessage = Cf;
Fe.resetWarned = tl;
Fe.noteOnce = $f;
function Ro(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}
function wf(e) {
  return e && te(e) === "object" && Ro(e.nativeElement) ? e.nativeElement : Ro(e) ? e : null;
}
function _n(e) {
  var t = wf(e);
  if (t)
    return t;
  if (e instanceof X.Component) {
    var r;
    return (r = po.findDOMNode) === null || r === void 0 ? void 0 : r.call(po, e);
  }
  return null;
}
var Ga = { exports: {} }, ge = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fo;
function Pf() {
  if (Fo) return ge;
  Fo = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), g;
  g = Symbol.for("react.module.reference");
  function h(f) {
    if (typeof f == "object" && f !== null) {
      var y = f.$$typeof;
      switch (y) {
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
                  return y;
              }
          }
        case t:
          return y;
      }
    }
  }
  return ge.ContextConsumer = o, ge.ContextProvider = i, ge.Element = e, ge.ForwardRef = l, ge.Fragment = r, ge.Lazy = v, ge.Memo = d, ge.Portal = t, ge.Profiler = a, ge.StrictMode = n, ge.Suspense = c, ge.SuspenseList = u, ge.isAsyncMode = function() {
    return !1;
  }, ge.isConcurrentMode = function() {
    return !1;
  }, ge.isContextConsumer = function(f) {
    return h(f) === o;
  }, ge.isContextProvider = function(f) {
    return h(f) === i;
  }, ge.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === e;
  }, ge.isForwardRef = function(f) {
    return h(f) === l;
  }, ge.isFragment = function(f) {
    return h(f) === r;
  }, ge.isLazy = function(f) {
    return h(f) === v;
  }, ge.isMemo = function(f) {
    return h(f) === d;
  }, ge.isPortal = function(f) {
    return h(f) === t;
  }, ge.isProfiler = function(f) {
    return h(f) === a;
  }, ge.isStrictMode = function(f) {
    return h(f) === n;
  }, ge.isSuspense = function(f) {
    return h(f) === c;
  }, ge.isSuspenseList = function(f) {
    return h(f) === u;
  }, ge.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === r || f === a || f === n || f === c || f === u || f === S || typeof f == "object" && f !== null && (f.$$typeof === v || f.$$typeof === d || f.$$typeof === i || f.$$typeof === o || f.$$typeof === l || f.$$typeof === g || f.getModuleId !== void 0);
  }, ge.typeOf = h, ge;
}
var be = {};
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
function Of() {
  return Ao || (Ao = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), g = !1, h = !1, f = !1, y = !1, m = !1, C;
    C = Symbol.for("react.module.reference");
    function T(q) {
      return !!(typeof q == "string" || typeof q == "function" || q === r || q === a || m || q === n || q === c || q === u || y || q === S || g || h || f || typeof q == "object" && q !== null && (q.$$typeof === v || q.$$typeof === d || q.$$typeof === i || q.$$typeof === o || q.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      q.$$typeof === C || q.getModuleId !== void 0));
    }
    function E(q) {
      if (typeof q == "object" && q !== null) {
        var Ce = q.$$typeof;
        switch (Ce) {
          case e:
            var J = q.type;
            switch (J) {
              case r:
              case a:
              case n:
              case c:
              case u:
                return J;
              default:
                var ce = J && J.$$typeof;
                switch (ce) {
                  case s:
                  case o:
                  case l:
                  case v:
                  case d:
                  case i:
                    return ce;
                  default:
                    return Ce;
                }
            }
          case t:
            return Ce;
        }
      }
    }
    var w = o, x = i, R = e, F = l, M = r, N = v, z = d, j = t, D = a, H = n, P = c, $ = u, O = !1, L = !1;
    function k(q) {
      return O || (O = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function V(q) {
      return L || (L = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(q) {
      return E(q) === o;
    }
    function Y(q) {
      return E(q) === i;
    }
    function U(q) {
      return typeof q == "object" && q !== null && q.$$typeof === e;
    }
    function K(q) {
      return E(q) === l;
    }
    function Z(q) {
      return E(q) === r;
    }
    function re(q) {
      return E(q) === v;
    }
    function le(q) {
      return E(q) === d;
    }
    function ve(q) {
      return E(q) === t;
    }
    function de(q) {
      return E(q) === a;
    }
    function $e(q) {
      return E(q) === n;
    }
    function we(q) {
      return E(q) === c;
    }
    function De(q) {
      return E(q) === u;
    }
    be.ContextConsumer = w, be.ContextProvider = x, be.Element = R, be.ForwardRef = F, be.Fragment = M, be.Lazy = N, be.Memo = z, be.Portal = j, be.Profiler = D, be.StrictMode = H, be.Suspense = P, be.SuspenseList = $, be.isAsyncMode = k, be.isConcurrentMode = V, be.isContextConsumer = W, be.isContextProvider = Y, be.isElement = U, be.isForwardRef = K, be.isFragment = Z, be.isLazy = re, be.isMemo = le, be.isPortal = ve, be.isProfiler = de, be.isStrictMode = $e, be.isSuspense = we, be.isSuspenseList = De, be.isValidElementType = T, be.typeOf = E;
  }()), be;
}
process.env.NODE_ENV === "production" ? Ga.exports = Pf() : Ga.exports = Of();
var wa = Ga.exports;
function Xi(e, t, r) {
  var n = b.useRef({});
  return (!("value" in n.current) || r(n.current.condition, t)) && (n.current.value = e(), n.current.condition = t), n.current.value;
}
var Tf = Number(Kc.split(".")[0]), nl = function(t, r) {
  typeof t == "function" ? t(r) : te(t) === "object" && t && "current" in t && (t.current = r);
}, al = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var a = r.filter(Boolean);
  return a.length <= 1 ? a[0] : function(i) {
    r.forEach(function(o) {
      nl(o, i);
    });
  };
}, Rf = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  return Xi(function() {
    return al.apply(void 0, r);
  }, r, function(a, i) {
    return a.length !== i.length || a.every(function(o, s) {
      return o !== i[s];
    });
  });
}, il = function(t) {
  var r, n;
  if (!t)
    return !1;
  if (ol(t) && Tf >= 19)
    return !0;
  var a = wa.isMemo(t) ? t.type.type : t.type;
  return !(typeof a == "function" && !((r = a.prototype) !== null && r !== void 0 && r.render) && a.$$typeof !== wa.ForwardRef || typeof t == "function" && !((n = t.prototype) !== null && n !== void 0 && n.render) && t.$$typeof !== wa.ForwardRef);
};
function ol(e) {
  return /* @__PURE__ */ Gc(e) && !el(e);
}
var sl = function(t) {
  if (t && ol(t)) {
    var r = t;
    return r.props.propertyIsEnumerable("ref") ? r.props.ref : r.ref;
  }
  return null;
}, Ka = /* @__PURE__ */ b.createContext(null);
function Ff(e) {
  var t = e.children, r = e.onBatchResize, n = b.useRef(0), a = b.useRef([]), i = b.useContext(Ka), o = b.useCallback(function(s, l, c) {
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
  return /* @__PURE__ */ b.createElement(Ka.Provider, {
    value: o
  }, t);
}
var ll = function() {
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
}(), Xa = typeof window < "u" && typeof document < "u" && window.document === document, jn = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), Af = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(jn) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), Mf = 2;
function jf(e, t) {
  var r = !1, n = !1, a = 0;
  function i() {
    r && (r = !1, e()), n && s();
  }
  function o() {
    Af(i);
  }
  function s() {
    var l = Date.now();
    if (r) {
      if (l - a < Mf)
        return;
      n = !0;
    } else
      r = !0, n = !1, setTimeout(o, t);
    a = l;
  }
  return s;
}
var If = 20, Df = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], Nf = typeof MutationObserver < "u", kf = (
  /** @class */
  function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = jf(this.refresh.bind(this), If);
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
      !Xa || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), Nf ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !Xa || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var r = t.propertyName, n = r === void 0 ? "" : r, a = Df.some(function(i) {
        return !!~n.indexOf(i);
      });
      a && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  }()
), cl = function(e, t) {
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
}, lr = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || jn;
}, ul = va(0, 0, 0, 0);
function In(e) {
  return parseFloat(e) || 0;
}
function Mo(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return t.reduce(function(n, a) {
    var i = e["border-" + a + "-width"];
    return n + In(i);
  }, 0);
}
function Vf(e) {
  for (var t = ["top", "right", "bottom", "left"], r = {}, n = 0, a = t; n < a.length; n++) {
    var i = a[n], o = e["padding-" + i];
    r[i] = In(o);
  }
  return r;
}
function Lf(e) {
  var t = e.getBBox();
  return va(0, 0, t.width, t.height);
}
function zf(e) {
  var t = e.clientWidth, r = e.clientHeight;
  if (!t && !r)
    return ul;
  var n = lr(e).getComputedStyle(e), a = Vf(n), i = a.left + a.right, o = a.top + a.bottom, s = In(n.width), l = In(n.height);
  if (n.boxSizing === "border-box" && (Math.round(s + i) !== t && (s -= Mo(n, "left", "right") + i), Math.round(l + o) !== r && (l -= Mo(n, "top", "bottom") + o)), !Bf(e)) {
    var c = Math.round(s + i) - t, u = Math.round(l + o) - r;
    Math.abs(c) !== 1 && (s -= c), Math.abs(u) !== 1 && (l -= u);
  }
  return va(a.left, a.top, s, l);
}
var Hf = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof lr(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof lr(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function Bf(e) {
  return e === lr(e).document.documentElement;
}
function Wf(e) {
  return Xa ? Hf(e) ? Lf(e) : zf(e) : ul;
}
function qf(e) {
  var t = e.x, r = e.y, n = e.width, a = e.height, i = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(i.prototype);
  return cl(o, {
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
function va(e, t, r, n) {
  return { x: e, y: t, width: r, height: n };
}
var Yf = (
  /** @class */
  function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = va(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = Wf(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  }()
), Uf = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, r) {
      var n = qf(r);
      cl(this, { target: t, contentRect: n });
    }
    return e;
  }()
), Gf = (
  /** @class */
  function() {
    function e(t, r, n) {
      if (this.activeObservations_ = [], this.observations_ = new ll(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = r, this.callbackCtx_ = n;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof lr(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var r = this.observations_;
        r.has(t) || (r.set(t, new Yf(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof lr(t).Element))
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
          return new Uf(n.target, n.broadcastRect());
        });
        this.callback_.call(t, r, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  }()
), dl = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new ll(), fl = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var r = kf.getInstance(), n = new Gf(t, r, this);
      dl.set(this, n);
    }
    return e;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  fl.prototype[e] = function() {
    var t;
    return (t = dl.get(this))[e].apply(t, arguments);
  };
});
var Kf = function() {
  return typeof jn.ResizeObserver < "u" ? jn.ResizeObserver : fl;
}(), Pt = /* @__PURE__ */ new Map();
function vl(e) {
  e.forEach(function(t) {
    var r, n = t.target;
    (r = Pt.get(n)) === null || r === void 0 || r.forEach(function(a) {
      return a(n);
    });
  });
}
var pl = new Kf(vl);
process.env.NODE_ENV;
process.env.NODE_ENV;
function Xf(e, t) {
  Pt.has(e) || (Pt.set(e, /* @__PURE__ */ new Set()), pl.observe(e)), Pt.get(e).add(t);
}
function Jf(e, t) {
  Pt.has(e) && (Pt.get(e).delete(t), Pt.get(e).size || (pl.unobserve(e), Pt.delete(e)));
}
function Ye(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function jo(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Us(n.key), n);
  }
}
function Ue(e, t, r) {
  return t && jo(e.prototype, t), r && jo(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function Nr(e, t) {
  return Nr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, Nr(e, t);
}
function Ut(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Nr(e, t);
}
function kr(e) {
  return kr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, kr(e);
}
function Ji() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Ji = function() {
    return !!e;
  })();
}
function oe(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Qf(e, t) {
  if (t && (te(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return oe(e);
}
function Gt(e) {
  var t = Ji();
  return function() {
    var r, n = kr(e);
    if (t) {
      var a = kr(this).constructor;
      r = Reflect.construct(n, arguments, a);
    } else r = n.apply(this, arguments);
    return Qf(this, r);
  };
}
var Zf = /* @__PURE__ */ function(e) {
  Ut(r, e);
  var t = Gt(r);
  function r() {
    return Ye(this, r), t.apply(this, arguments);
  }
  return Ue(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
}(b.Component);
function ev(e, t) {
  var r = e.children, n = e.disabled, a = b.useRef(null), i = b.useRef(null), o = b.useContext(Ka), s = typeof r == "function", l = s ? r(a) : r, c = b.useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  }), u = !s && /* @__PURE__ */ b.isValidElement(l) && il(l), d = u ? sl(l) : null, v = Rf(d, a), S = function() {
    var y;
    return _n(a.current) || // Support `nativeElement` format
    (a.current && te(a.current) === "object" ? _n((y = a.current) === null || y === void 0 ? void 0 : y.nativeElement) : null) || _n(i.current);
  };
  b.useImperativeHandle(t, function() {
    return S();
  });
  var g = b.useRef(e);
  g.current = e;
  var h = b.useCallback(function(f) {
    var y = g.current, m = y.onResize, C = y.data, T = f.getBoundingClientRect(), E = T.width, w = T.height, x = f.offsetWidth, R = f.offsetHeight, F = Math.floor(E), M = Math.floor(w);
    if (c.current.width !== F || c.current.height !== M || c.current.offsetWidth !== x || c.current.offsetHeight !== R) {
      var N = {
        width: F,
        height: M,
        offsetWidth: x,
        offsetHeight: R
      };
      c.current = N;
      var z = x === Math.round(E) ? E : x, j = R === Math.round(w) ? w : R, D = A(A({}, N), {}, {
        offsetWidth: z,
        offsetHeight: j
      });
      o == null || o(D, f, C), m && Promise.resolve().then(function() {
        m(D, f);
      });
    }
  }, []);
  return b.useEffect(function() {
    var f = S();
    return f && !n && Xf(f, h), function() {
      return Jf(f, h);
    };
  }, [a.current, n]), /* @__PURE__ */ b.createElement(Zf, {
    ref: i
  }, u ? /* @__PURE__ */ b.cloneElement(l, {
    ref: v
  }) : l);
}
var hl = /* @__PURE__ */ b.forwardRef(ev);
process.env.NODE_ENV !== "production" && (hl.displayName = "SingleObserver");
var tv = "rc-observer-key";
function rv(e, t) {
  var r = e.children, n = typeof r == "function" ? [r] : Mn(r);
  return process.env.NODE_ENV !== "production" && (n.length > 1 ? Dr(!1, "Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.") : n.length === 0 && Dr(!1, "`children` of ResizeObserver is empty. Nothing is in observe.")), n.map(function(a, i) {
    var o = (a == null ? void 0 : a.key) || "".concat(tv, "-").concat(i);
    return /* @__PURE__ */ b.createElement(hl, Ke({}, e, {
      key: o,
      ref: i === 0 ? t : void 0
    }), a);
  });
}
var Qi = /* @__PURE__ */ b.forwardRef(rv);
process.env.NODE_ENV !== "production" && (Qi.displayName = "ResizeObserver");
Qi.Collection = Ff;
var ml = function(t) {
  return +setTimeout(t, 16);
}, gl = function(t) {
  return clearTimeout(t);
};
typeof window < "u" && "requestAnimationFrame" in window && (ml = function(t) {
  return window.requestAnimationFrame(t);
}, gl = function(t) {
  return window.cancelAnimationFrame(t);
});
var Io = 0, pa = /* @__PURE__ */ new Map();
function bl(e) {
  pa.delete(e);
}
var cr = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  Io += 1;
  var n = Io;
  function a(i) {
    if (i === 0)
      bl(n), t();
    else {
      var o = ml(function() {
        a(i - 1);
      });
      pa.set(n, o);
    }
  }
  return a(r), n;
};
cr.cancel = function(e) {
  var t = pa.get(e);
  return bl(e), gl(t);
};
process.env.NODE_ENV !== "production" && (cr.ids = function() {
  return pa;
});
var nv = `
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
`, av = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "font-variant", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing", "word-break", "white-space"], Pa = {}, it;
function iv(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = e.getAttribute("id") || e.getAttribute("data-reactid") || e.getAttribute("name");
  if (t && Pa[r])
    return Pa[r];
  var n = window.getComputedStyle(e), a = n.getPropertyValue("box-sizing") || n.getPropertyValue("-moz-box-sizing") || n.getPropertyValue("-webkit-box-sizing"), i = parseFloat(n.getPropertyValue("padding-bottom")) + parseFloat(n.getPropertyValue("padding-top")), o = parseFloat(n.getPropertyValue("border-bottom-width")) + parseFloat(n.getPropertyValue("border-top-width")), s = av.map(function(c) {
    return "".concat(c, ":").concat(n.getPropertyValue(c));
  }).join(";"), l = {
    sizingStyle: s,
    paddingSize: i,
    borderSize: o,
    boxSizing: a
  };
  return t && r && (Pa[r] = l), l;
}
function ov(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  it || (it = document.createElement("textarea"), it.setAttribute("tab-index", "-1"), it.setAttribute("aria-hidden", "true"), it.setAttribute("name", "hiddenTextarea"), document.body.appendChild(it)), e.getAttribute("wrap") ? it.setAttribute("wrap", e.getAttribute("wrap")) : it.removeAttribute("wrap");
  var a = iv(e, t), i = a.paddingSize, o = a.borderSize, s = a.boxSizing, l = a.sizingStyle;
  it.setAttribute("style", "".concat(l, ";").concat(nv)), it.value = e.value || e.placeholder || "";
  var c = void 0, u = void 0, d, v = it.scrollHeight;
  if (s === "border-box" ? v += o : s === "content-box" && (v -= i), r !== null || n !== null) {
    it.value = " ";
    var S = it.scrollHeight - i;
    r !== null && (c = S * r, s === "border-box" && (c = c + i + o), v = Math.max(c, v)), n !== null && (u = S * n, s === "border-box" && (u = u + i + o), d = v > u ? "" : "hidden", v = Math.min(u, v));
  }
  var g = {
    height: v,
    overflowY: d,
    resize: "none"
  };
  return c && (g.minHeight = c), u && (g.maxHeight = u), g;
}
var sv = ["prefixCls", "defaultValue", "value", "autoSize", "onResize", "className", "style", "disabled", "onChange", "onInternalAutoSize"], Oa = 0, Ta = 1, Ra = 2, lv = /* @__PURE__ */ b.forwardRef(function(e, t) {
  var r = e, n = r.prefixCls, a = r.defaultValue, i = r.value, o = r.autoSize, s = r.onResize, l = r.className, c = r.style, u = r.disabled, d = r.onChange, v = r.onInternalAutoSize, S = pt(r, sv), g = Gi(a, {
    value: i,
    postState: function(K) {
      return K ?? "";
    }
  }), h = G(g, 2), f = h[0], y = h[1], m = function(K) {
    y(K.target.value), d == null || d(K);
  }, C = b.useRef();
  b.useImperativeHandle(t, function() {
    return {
      textArea: C.current
    };
  });
  var T = b.useMemo(function() {
    return o && te(o) === "object" ? [o.minRows, o.maxRows] : [];
  }, [o]), E = G(T, 2), w = E[0], x = E[1], R = !!o, F = function() {
    try {
      if (document.activeElement === C.current) {
        var K = C.current, Z = K.selectionStart, re = K.selectionEnd, le = K.scrollTop;
        C.current.setSelectionRange(Z, re), C.current.scrollTop = le;
      }
    } catch {
    }
  }, M = b.useState(Ra), N = G(M, 2), z = N[0], j = N[1], D = b.useState(), H = G(D, 2), P = H[0], $ = H[1], O = function() {
    j(Oa), process.env.NODE_ENV === "test" && (v == null || v());
  };
  An(function() {
    R && O();
  }, [i, w, x, R]), An(function() {
    if (z === Oa)
      j(Ta);
    else if (z === Ta) {
      var U = ov(C.current, !1, w, x);
      j(Ra), $(U);
    } else
      F();
  }, [z]);
  var L = b.useRef(), k = function() {
    cr.cancel(L.current);
  }, V = function(K) {
    z === Ra && (s == null || s(K), o && (k(), L.current = cr(function() {
      O();
    })));
  };
  b.useEffect(function() {
    return k;
  }, []);
  var W = R ? P : null, Y = A(A({}, c), W);
  return (z === Oa || z === Ta) && (Y.overflowY = "hidden", Y.overflowX = "hidden"), /* @__PURE__ */ b.createElement(Qi, {
    onResize: V,
    disabled: !(o || s)
  }, /* @__PURE__ */ b.createElement("textarea", Ke({}, S, {
    ref: C,
    style: Y,
    className: ye(n, l, _({}, "".concat(n, "-disabled"), u)),
    disabled: u,
    value: f,
    onChange: m
  })));
}), cv = ["defaultValue", "value", "onFocus", "onBlur", "onChange", "allowClear", "maxLength", "onCompositionStart", "onCompositionEnd", "suffix", "prefixCls", "showCount", "count", "className", "style", "disabled", "hidden", "classNames", "styles", "onResize", "onClear", "onPressEnter", "readOnly", "autoSize", "onKeyDown"], uv = /* @__PURE__ */ X.forwardRef(function(e, t) {
  var r, n = e.defaultValue, a = e.value, i = e.onFocus, o = e.onBlur, s = e.onChange, l = e.allowClear, c = e.maxLength, u = e.onCompositionStart, d = e.onCompositionEnd, v = e.suffix, S = e.prefixCls, g = S === void 0 ? "rc-textarea" : S, h = e.showCount, f = e.count, y = e.className, m = e.style, C = e.disabled, T = e.hidden, E = e.classNames, w = e.styles, x = e.onResize, R = e.onClear, F = e.onPressEnter, M = e.readOnly, N = e.autoSize, z = e.onKeyDown, j = pt(e, cv), D = Gi(n, {
    value: a,
    defaultValue: n
  }), H = G(D, 2), P = H[0], $ = H[1], O = P == null ? "" : String(P), L = X.useState(!1), k = G(L, 2), V = k[0], W = k[1], Y = X.useRef(!1), U = X.useState(null), K = G(U, 2), Z = K[0], re = K[1], le = ke(null), ve = ke(null), de = function() {
    var pe;
    return (pe = ve.current) === null || pe === void 0 ? void 0 : pe.textArea;
  }, $e = function() {
    de().focus();
  };
  Fs(t, function() {
    var Te;
    return {
      resizableTextArea: ve.current,
      focus: $e,
      blur: function() {
        de().blur();
      },
      nativeElement: ((Te = le.current) === null || Te === void 0 ? void 0 : Te.nativeElement) || de()
    };
  }), bt(function() {
    W(function(Te) {
      return !C && Te;
    });
  }, [C]);
  var we = X.useState(null), De = G(we, 2), q = De[0], Ce = De[1];
  X.useEffect(function() {
    if (q) {
      var Te;
      (Te = de()).setSelectionRange.apply(Te, ee(q));
    }
  }, [q]);
  var J = Zs(f, h), ce = (r = J.max) !== null && r !== void 0 ? r : c, Ae = Number(ce) > 0, fe = J.strategy(O), ze = !!ce && fe > ce, Oe = function(pe, dt) {
    var Rt = dt;
    !Y.current && J.exceedFormatter && J.max && J.strategy(dt) > J.max && (Rt = J.exceedFormatter(dt, {
      max: J.max
    }), dt !== Rt && Ce([de().selectionStart || 0, de().selectionEnd || 0])), $(Rt), Fn(pe.currentTarget, pe, s, Rt);
  }, _e = function(pe) {
    Y.current = !0, u == null || u(pe);
  }, ae = function(pe) {
    Y.current = !1, Oe(pe, pe.currentTarget.value), d == null || d(pe);
  }, ne = function(pe) {
    Oe(pe, pe.target.value);
  }, Se = function(pe) {
    pe.key === "Enter" && F && F(pe), z == null || z(pe);
  }, ct = function(pe) {
    W(!0), i == null || i(pe);
  }, Xe = function(pe) {
    W(!1), o == null || o(pe);
  }, Je = function(pe) {
    $(""), $e(), Fn(de(), pe, s);
  }, ut = v, Et;
  J.show && (J.showFormatter ? Et = J.showFormatter({
    value: O,
    count: fe,
    maxLength: ce
  }) : Et = "".concat(fe).concat(Ae ? " / ".concat(ce) : ""), ut = /* @__PURE__ */ X.createElement(X.Fragment, null, ut, /* @__PURE__ */ X.createElement("span", {
    className: ye("".concat(g, "-data-count"), E == null ? void 0 : E.count),
    style: w == null ? void 0 : w.count
  }, Et)));
  var br = function(pe) {
    var dt;
    x == null || x(pe), (dt = de()) !== null && dt !== void 0 && dt.style.height && re(!0);
  }, yr = !N && !h && !l;
  return /* @__PURE__ */ X.createElement(Qs, {
    ref: le,
    value: O,
    allowClear: l,
    handleReset: Je,
    suffix: ut,
    prefixCls: g,
    classNames: A(A({}, E), {}, {
      affixWrapper: ye(E == null ? void 0 : E.affixWrapper, _(_({}, "".concat(g, "-show-count"), h), "".concat(g, "-textarea-allow-clear"), l))
    }),
    disabled: C,
    focused: V,
    className: ye(y, ze && "".concat(g, "-out-of-range")),
    style: A(A({}, m), Z && !yr ? {
      height: "auto"
    } : {}),
    dataAttrs: {
      affixWrapper: {
        "data-count": typeof Et == "string" ? Et : void 0
      }
    },
    hidden: T,
    readOnly: M,
    onClear: R
  }, /* @__PURE__ */ X.createElement(lv, Ke({}, j, {
    autoSize: N,
    maxLength: c,
    onKeyDown: Se,
    onChange: ne,
    onFocus: ct,
    onBlur: Xe,
    onCompositionStart: _e,
    onCompositionEnd: ae,
    className: ye(E == null ? void 0 : E.textarea),
    style: A(A({}, w == null ? void 0 : w.textarea), {}, {
      resize: m == null ? void 0 : m.resize
    }),
    disabled: C,
    prefixCls: g,
    onResize: br,
    ref: ve,
    readOnly: M
  })));
}), dv = { icon: { tag: "svg", attrs: { "fill-rule": "evenodd", viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" } }] }, name: "close-circle", theme: "filled" };
const We = Math.round;
function Fa(e, t) {
  const r = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], n = r.map((a) => parseFloat(a));
  for (let a = 0; a < 3; a += 1)
    n[a] = t(n[a] || 0, r[a] || "", a);
  return r[3] ? n[3] = r[3].includes("%") ? n[3] / 100 : n[3] : n[3] = 1, n;
}
const Do = (e, t, r) => r === 0 ? e : e / 100;
function wr(e, t) {
  const r = t || 255;
  return e > r ? r : e < 0 ? 0 : e;
}
class Ve {
  constructor(t) {
    _(this, "isValid", !0), _(this, "r", 0), _(this, "g", 0), _(this, "b", 0), _(this, "a", 1), _(this, "_h", void 0), _(this, "_s", void 0), _(this, "_l", void 0), _(this, "_v", void 0), _(this, "_max", void 0), _(this, "_min", void 0), _(this, "_brightness", void 0);
    function r(n) {
      return n[0] in t && n[1] in t && n[2] in t;
    }
    if (t) if (typeof t == "string") {
      let a = function(i) {
        return n.startsWith(i);
      };
      const n = t.trim();
      /^#?[A-F\d]{3,8}$/i.test(n) ? this.fromHexString(n) : a("rgb") ? this.fromRgbString(n) : a("hsl") ? this.fromHslString(n) : (a("hsv") || a("hsb")) && this.fromHsvString(n);
    } else if (t instanceof Ve)
      this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this._h = t._h, this._s = t._s, this._l = t._l, this._v = t._v;
    else if (r("rgb"))
      this.r = wr(t.r), this.g = wr(t.g), this.b = wr(t.b), this.a = typeof t.a == "number" ? wr(t.a, 1) : 1;
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
      t === 0 ? this._h = 0 : this._h = We(60 * (this.r === this.getMax() ? (this.g - this.b) / t + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / t + 2 : (this.r - this.g) / t + 4));
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
      r: We(i("r")),
      g: We(i("g")),
      b: We(i("b")),
      a: We(i("a") * 100) / 100
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
    const r = this._c(t), n = this.a + r.a * (1 - this.a), a = (i) => We((this[i] * this.a + r[i] * r.a * (1 - this.a)) / n);
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
      const i = We(this.a * 255).toString(16);
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
    const t = this.getHue(), r = We(this.getSaturation() * 100), n = We(this.getLightness() * 100);
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
    return a[t] = wr(r, n), a;
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
      const v = We(n * 255);
      this.r = v, this.g = v, this.b = v;
    }
    let i = 0, o = 0, s = 0;
    const l = t / 60, c = (1 - Math.abs(2 * n - 1)) * r, u = c * (1 - Math.abs(l % 2 - 1));
    l >= 0 && l < 1 ? (i = c, o = u) : l >= 1 && l < 2 ? (i = u, o = c) : l >= 2 && l < 3 ? (o = c, s = u) : l >= 3 && l < 4 ? (o = u, s = c) : l >= 4 && l < 5 ? (i = u, s = c) : l >= 5 && l < 6 && (i = c, s = u);
    const d = n - c / 2;
    this.r = We((i + d) * 255), this.g = We((o + d) * 255), this.b = We((s + d) * 255);
  }
  fromHsv({
    h: t,
    s: r,
    v: n,
    a
  }) {
    this._h = t % 360, this._s = r, this._v = n, this.a = typeof a == "number" ? a : 1;
    const i = We(n * 255);
    if (this.r = i, this.g = i, this.b = i, r <= 0)
      return;
    const o = t / 60, s = Math.floor(o), l = o - s, c = We(n * (1 - r) * 255), u = We(n * (1 - r * l) * 255), d = We(n * (1 - r * (1 - l)) * 255);
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
    const r = Fa(t, Do);
    this.fromHsv({
      h: r[0],
      s: r[1],
      v: r[2],
      a: r[3]
    });
  }
  fromHslString(t) {
    const r = Fa(t, Do);
    this.fromHsl({
      h: r[0],
      s: r[1],
      l: r[2],
      a: r[3]
    });
  }
  fromRgbString(t) {
    const r = Fa(t, (n, a) => (
      // Convert percentage to number. e.g. 50% -> 128
      a.includes("%") ? We(n / 100 * 255) : n
    ));
    this.r = r[0], this.g = r[1], this.b = r[2], this.a = r[3];
  }
}
var hn = 2, No = 0.16, fv = 0.05, vv = 0.05, pv = 0.15, yl = 5, Sl = 4, hv = [{
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
function ko(e, t, r) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = r ? Math.round(e.h) - hn * t : Math.round(e.h) + hn * t : n = r ? Math.round(e.h) + hn * t : Math.round(e.h) - hn * t, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function Vo(e, t, r) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return r ? n = e.s - No * t : t === Sl ? n = e.s + No : n = e.s + fv * t, n > 1 && (n = 1), r && t === yl && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Math.round(n * 100) / 100;
}
function Lo(e, t, r) {
  var n;
  return r ? n = e.v + vv * t : n = e.v - pv * t, n = Math.max(0, Math.min(1, n)), Math.round(n * 100) / 100;
}
function Vr(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [], n = new Ve(e), a = n.toHsv(), i = yl; i > 0; i -= 1) {
    var o = new Ve({
      h: ko(a, i, !0),
      s: Vo(a, i, !0),
      v: Lo(a, i, !0)
    });
    r.push(o);
  }
  r.push(n);
  for (var s = 1; s <= Sl; s += 1) {
    var l = new Ve({
      h: ko(a, s),
      s: Vo(a, s),
      v: Lo(a, s)
    });
    r.push(l);
  }
  return t.theme === "dark" ? hv.map(function(c) {
    var u = c.index, d = c.amount;
    return new Ve(t.backgroundColor || "#141414").mix(r[u], d).toHexString();
  }) : r.map(function(c) {
    return c.toHexString();
  });
}
var Aa = {
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
}, Ja = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
Ja.primary = Ja[5];
var Qa = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
Qa.primary = Qa[5];
var Za = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
Za.primary = Za[5];
var ei = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
ei.primary = ei[5];
var ti = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
ti.primary = ti[5];
var ri = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
ri.primary = ri[5];
var ni = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
ni.primary = ni[5];
var ai = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
ai.primary = ai[5];
var Dn = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
Dn.primary = Dn[5];
var ii = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
ii.primary = ii[5];
var oi = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
oi.primary = oi[5];
var si = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
si.primary = si[5];
var li = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
li.primary = li[5];
var Ma = {
  red: Ja,
  volcano: Qa,
  orange: Za,
  gold: ei,
  yellow: ti,
  lime: ri,
  green: ni,
  cyan: ai,
  blue: Dn,
  geekblue: ii,
  purple: oi,
  magenta: si,
  grey: li
}, Zi = /* @__PURE__ */ Vi({});
function mv(e, t) {
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
var zo = "data-rc-order", Ho = "data-rc-priority", gv = "rc-util-key", ci = /* @__PURE__ */ new Map();
function xl() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.mark;
  return t ? t.startsWith("data-") ? t : "data-".concat(t) : gv;
}
function ha(e) {
  if (e.attachTo)
    return e.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function bv(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function eo(e) {
  return Array.from((ci.get(e) || e).children).filter(function(t) {
    return t.tagName === "STYLE";
  });
}
function El(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Tt())
    return null;
  var r = t.csp, n = t.prepend, a = t.priority, i = a === void 0 ? 0 : a, o = bv(n), s = o === "prependQueue", l = document.createElement("style");
  l.setAttribute(zo, o), s && i && l.setAttribute(Ho, "".concat(i)), r != null && r.nonce && (l.nonce = r == null ? void 0 : r.nonce), l.innerHTML = e;
  var c = ha(t), u = c.firstChild;
  if (n) {
    if (s) {
      var d = (t.styles || eo(c)).filter(function(v) {
        if (!["prepend", "prependQueue"].includes(v.getAttribute(zo)))
          return !1;
        var S = Number(v.getAttribute(Ho) || 0);
        return i >= S;
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
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = ha(t);
  return (t.styles || eo(r)).find(function(n) {
    return n.getAttribute(xl(t)) === e;
  });
}
function _l(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = Cl(e, t);
  if (r) {
    var n = ha(t);
    n.removeChild(r);
  }
}
function yv(e, t) {
  var r = ci.get(e);
  if (!r || !mv(document, r)) {
    var n = El("", t), a = n.parentNode;
    ci.set(e, a), e.removeChild(n);
  }
}
function Bt(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = ha(r), a = eo(n), i = A(A({}, r), {}, {
    styles: a
  });
  yv(n, i);
  var o = Cl(t, i);
  if (o) {
    var s, l;
    if ((s = i.csp) !== null && s !== void 0 && s.nonce && o.nonce !== ((l = i.csp) === null || l === void 0 ? void 0 : l.nonce)) {
      var c;
      o.nonce = (c = i.csp) === null || c === void 0 ? void 0 : c.nonce;
    }
    return o.innerHTML !== e && (o.innerHTML = e), o;
  }
  var u = El(e, i);
  return u.setAttribute(xl(i), t), u;
}
function $l(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e);
}
function Sv(e) {
  return $l(e) instanceof ShadowRoot;
}
function xv(e) {
  return Sv(e) ? $l(e) : null;
}
function Ev(e) {
  return e.replace(/-(.)/g, function(t, r) {
    return r.toUpperCase();
  });
}
function Cv(e, t) {
  Fe(e, "[@ant-design/icons] ".concat(t));
}
function Bo(e) {
  return te(e) === "object" && typeof e.name == "string" && typeof e.theme == "string" && (te(e.icon) === "object" || typeof e.icon == "function");
}
function Wo() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(e).reduce(function(t, r) {
    var n = e[r];
    switch (r) {
      case "class":
        t.className = n, delete t.class;
        break;
      default:
        delete t[r], t[Ev(r)] = n;
    }
    return t;
  }, {});
}
function ui(e, t, r) {
  return r ? /* @__PURE__ */ X.createElement(e.tag, A(A({
    key: t
  }, Wo(e.attrs)), r), (e.children || []).map(function(n, a) {
    return ui(n, "".concat(t, "-").concat(e.tag, "-").concat(a));
  })) : /* @__PURE__ */ X.createElement(e.tag, A({
    key: t
  }, Wo(e.attrs)), (e.children || []).map(function(n, a) {
    return ui(n, "".concat(t, "-").concat(e.tag, "-").concat(a));
  }));
}
function wl(e) {
  return Vr(e)[0];
}
function Pl(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
var _v = `
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
`, $v = function(t) {
  var r = Ot(Zi), n = r.csp, a = r.prefixCls, i = r.layer, o = _v;
  a && (o = o.replace(/anticon/g, a)), i && (o = "@layer ".concat(i, ` {
`).concat(o, `
}`)), bt(function() {
    var s = t.current, l = xv(s);
    Bt(o, "@ant-design-icons", {
      prepend: !i,
      csp: n,
      attachTo: l
    });
  }, []);
}, wv = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"], Fr = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function Pv(e) {
  var t = e.primaryColor, r = e.secondaryColor;
  Fr.primaryColor = t, Fr.secondaryColor = r || wl(t), Fr.calculated = !!r;
}
function Ov() {
  return A({}, Fr);
}
var hr = function(t) {
  var r = t.icon, n = t.className, a = t.onClick, i = t.style, o = t.primaryColor, s = t.secondaryColor, l = pt(t, wv), c = b.useRef(), u = Fr;
  if (o && (u = {
    primaryColor: o,
    secondaryColor: s || wl(o)
  }), $v(c), Cv(Bo(r), "icon should be icon definiton, but got ".concat(r)), !Bo(r))
    return null;
  var d = r;
  return d && typeof d.icon == "function" && (d = A(A({}, d), {}, {
    icon: d.icon(u.primaryColor, u.secondaryColor)
  })), ui(d.icon, "svg-".concat(d.name), A(A({
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
hr.displayName = "IconReact";
hr.getTwoToneColors = Ov;
hr.setTwoToneColors = Pv;
function Ol(e) {
  var t = Pl(e), r = G(t, 2), n = r[0], a = r[1];
  return hr.setTwoToneColors({
    primaryColor: n,
    secondaryColor: a
  });
}
function Tv() {
  var e = hr.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var Rv = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
Ol(Dn.primary);
var ma = /* @__PURE__ */ b.forwardRef(function(e, t) {
  var r = e.className, n = e.icon, a = e.spin, i = e.rotate, o = e.tabIndex, s = e.onClick, l = e.twoToneColor, c = pt(e, Rv), u = b.useContext(Zi), d = u.prefixCls, v = d === void 0 ? "anticon" : d, S = u.rootClassName, g = ye(S, v, _(_({}, "".concat(v, "-").concat(n.name), !!n.name), "".concat(v, "-spin"), !!a || n.name === "loading"), r), h = o;
  h === void 0 && s && (h = -1);
  var f = i ? {
    msTransform: "rotate(".concat(i, "deg)"),
    transform: "rotate(".concat(i, "deg)")
  } : void 0, y = Pl(l), m = G(y, 2), C = m[0], T = m[1];
  return /* @__PURE__ */ b.createElement("span", Ke({
    role: "img",
    "aria-label": n.name
  }, c, {
    ref: t,
    tabIndex: h,
    onClick: s,
    className: g
  }), /* @__PURE__ */ b.createElement(hr, {
    icon: n,
    primaryColor: C,
    secondaryColor: T,
    style: f
  }));
});
ma.displayName = "AntdIcon";
ma.getTwoToneColor = Tv;
ma.setTwoToneColor = Ol;
var Fv = function(t, r) {
  return /* @__PURE__ */ b.createElement(ma, Ke({}, t, {
    ref: r,
    icon: dv
  }));
}, Tl = /* @__PURE__ */ b.forwardRef(Fv);
process.env.NODE_ENV !== "production" && (Tl.displayName = "CloseCircleFilled");
const Rl = (e) => {
  let t;
  return typeof e == "object" && (e != null && e.clearIcon) ? t = e : e && (t = {
    clearIcon: /* @__PURE__ */ X.createElement(Tl, null)
  }), t;
};
function di(e, t, r) {
  return ye({
    [`${e}-status-success`]: t === "success",
    [`${e}-status-warning`]: t === "warning",
    [`${e}-status-error`]: t === "error",
    [`${e}-status-validating`]: t === "validating",
    [`${e}-has-feedback`]: r
  });
}
const Fl = (e, t) => t || e;
function Al() {
}
let wt = null;
function Av() {
  wt = null, tl();
}
let to = Al;
process.env.NODE_ENV !== "production" && (to = (e, t, r) => {
  Fe(e, `[antd: ${t}] ${r}`), process.env.NODE_ENV === "test" && Av();
});
const Ml = /* @__PURE__ */ b.createContext({}), qt = process.env.NODE_ENV !== "production" ? (e) => {
  const {
    strict: t
  } = b.useContext(Ml), r = (n, a, i) => {
    if (!n)
      if (t === !1 && a === "deprecated") {
        const o = wt;
        wt || (wt = {}), wt[e] = wt[e] || [], wt[e].includes(i || "") || wt[e].push(i || ""), o || console.warn("[antd] There exists deprecated usage in your code:", wt);
      } else
        process.env.NODE_ENV !== "production" && to(n, e, i);
  };
  return r.deprecated = (n, a, i, o) => {
    r(n, "deprecated", `\`${a}\` is deprecated. Please use \`${i}\` instead.${o ? ` ${o}` : ""}`);
  }, r;
} : () => {
  const e = () => {
  };
  return e.deprecated = Al, e;
}, ga = to, fi = "ant", ro = "anticon", Mv = ["outlined", "borderless", "filled", "underlined"], jv = (e, t) => t || (e ? `${fi}-${e}` : fi), Nt = /* @__PURE__ */ b.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: jv,
  iconPrefixCls: ro
}), {
  Consumer: Vg
} = Nt, qo = {};
function jl(e) {
  const t = b.useContext(Nt), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: a
  } = t, i = t[e];
  return Object.assign(Object.assign({
    classNames: qo,
    styles: qo
  }, i), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: a
  });
}
const Lr = /* @__PURE__ */ b.createContext(!1), Iv = (e) => {
  let {
    children: t,
    disabled: r
  } = e;
  const n = b.useContext(Lr);
  return /* @__PURE__ */ b.createElement(Lr.Provider, {
    value: r ?? n
  }, t);
};
function zr(e) {
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
function vi(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = /* @__PURE__ */ new Set();
  function a(i, o) {
    var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, l = n.has(i);
    if (Fe(!l, "Warning: There may be circular references"), l)
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
    if (i && o && te(i) === "object" && te(o) === "object") {
      var d = Object.keys(i);
      return d.length !== Object.keys(o).length ? !1 : d.every(function(v) {
        return a(i[v], o[v], c);
      });
    }
    return !1;
  }
  return a(e, t);
}
var Dv = "%";
function pi(e) {
  return e.join(Dv);
}
var Nv = /* @__PURE__ */ function() {
  function e(t) {
    Ye(this, e), _(this, "instanceId", void 0), _(this, "cache", /* @__PURE__ */ new Map()), this.instanceId = t;
  }
  return Ue(e, [{
    key: "get",
    value: function(r) {
      return this.opGet(pi(r));
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
      return this.opUpdate(pi(r), n);
    }
    /** A fast get cache with `get` concat. */
  }, {
    key: "opUpdate",
    value: function(r, n) {
      var a = this.cache.get(r), i = n(a);
      i === null ? this.cache.delete(r) : this.cache.set(r, i);
    }
  }]), e;
}(), ur = "data-token-hash", yt = "data-css-hash", kv = "data-cache-path", It = "__cssinjs_instance__";
function Vv() {
  var e = Math.random().toString(12).slice(2);
  if (typeof document < "u" && document.head && document.body) {
    var t = document.body.querySelectorAll("style[".concat(yt, "]")) || [], r = document.head.firstChild;
    Array.from(t).forEach(function(a) {
      a[It] = a[It] || e, a[It] === e && document.head.insertBefore(a, r);
    });
    var n = {};
    Array.from(document.querySelectorAll("style[".concat(yt, "]"))).forEach(function(a) {
      var i = a.getAttribute(yt);
      if (n[i]) {
        if (a[It] === e) {
          var o;
          (o = a.parentNode) === null || o === void 0 || o.removeChild(a);
        }
      } else
        n[i] = !0;
    });
  }
  return new Nv(e);
}
var on = /* @__PURE__ */ b.createContext({
  hashPriority: "low",
  cache: Vv(),
  defaultCache: !0
});
function Lv(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
var no = /* @__PURE__ */ function() {
  function e() {
    Ye(this, e), _(this, "cache", void 0), _(this, "keys", void 0), _(this, "cacheCallTimes", void 0), this.cache = /* @__PURE__ */ new Map(), this.keys = [], this.cacheCallTimes = 0;
  }
  return Ue(e, [{
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
            var d = G(c, 2), v = d[1];
            return a.internalGet(u)[1] < v ? [u, a.internalGet(u)[1]] : c;
          }, [this.keys[0], this.cacheCallTimes]), o = G(i, 1), s = o[0];
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
          return !Lv(n, r);
        }), this.deleteByPath(this.cache, r);
    }
  }]), e;
}();
_(no, "MAX_CACHE_SIZE", 20);
_(no, "MAX_CACHE_OFFSET", 5);
var Yo = 0, Il = /* @__PURE__ */ function() {
  function e(t) {
    Ye(this, e), _(this, "derivatives", void 0), _(this, "id", void 0), this.derivatives = Array.isArray(t) ? t : [t], this.id = Yo, t.length === 0 && Dr(t.length > 0, "[Ant Design CSS-in-JS] Theme should have at least one derivative function."), Yo += 1;
  }
  return Ue(e, [{
    key: "getDerivativeToken",
    value: function(r) {
      return this.derivatives.reduce(function(n, a) {
        return a(r, n);
      }, void 0);
    }
  }]), e;
}(), ja = new no();
function hi(e) {
  var t = Array.isArray(e) ? e : [e];
  return ja.has(t) || ja.set(t, new Il(t)), ja.get(t);
}
var zv = /* @__PURE__ */ new WeakMap(), Ia = {};
function Hv(e, t) {
  for (var r = zv, n = 0; n < t.length; n += 1) {
    var a = t[n];
    r.has(a) || r.set(a, /* @__PURE__ */ new WeakMap()), r = r.get(a);
  }
  return r.has(Ia) || r.set(Ia, e()), r.get(Ia);
}
var Uo = /* @__PURE__ */ new WeakMap();
function Ar(e) {
  var t = Uo.get(e) || "";
  return t || (Object.keys(e).forEach(function(r) {
    var n = e[r];
    t += r, n instanceof Il ? t += n.id : n && te(n) === "object" ? t += Ar(n) : t += n;
  }), t = zr(t), Uo.set(e, t)), t;
}
function Go(e, t) {
  return zr("".concat(t, "_").concat(Ar(e)));
}
var mi = Tt();
function Pe(e) {
  return typeof e == "number" ? "".concat(e, "px") : e;
}
function Nn(e, t, r) {
  var n, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
  if (i)
    return e;
  var o = A(A({}, a), {}, (n = {}, _(n, ur, t), _(n, yt, r), n)), s = Object.keys(o).map(function(l) {
    var c = o[l];
    return c ? "".concat(l, '="').concat(c, '"') : null;
  }).filter(function(l) {
    return l;
  }).join(" ");
  return "<style ".concat(s, ">").concat(e, "</style>");
}
var $n = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return "--".concat(r ? "".concat(r, "-") : "").concat(t).replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
}, Bv = function(t, r, n) {
  return Object.keys(t).length ? ".".concat(r).concat(n != null && n.scope ? ".".concat(n.scope) : "", "{").concat(Object.entries(t).map(function(a) {
    var i = G(a, 2), o = i[0], s = i[1];
    return "".concat(o, ":").concat(s, ";");
  }).join(""), "}") : "";
}, Dl = function(t, r, n) {
  var a = {}, i = {};
  return Object.entries(t).forEach(function(o) {
    var s, l, c = G(o, 2), u = c[0], d = c[1];
    if (n != null && (s = n.preserve) !== null && s !== void 0 && s[u])
      i[u] = d;
    else if ((typeof d == "string" || typeof d == "number") && !(n != null && (l = n.ignore) !== null && l !== void 0 && l[u])) {
      var v, S = $n(u, n == null ? void 0 : n.prefix);
      a[S] = typeof d == "number" && !(n != null && (v = n.unitless) !== null && v !== void 0 && v[u]) ? "".concat(d, "px") : String(d), i[u] = "var(".concat(S, ")");
    }
  }), [i, Bv(a, r, {
    scope: n == null ? void 0 : n.scope
  })];
}, Wv = A({}, b), Ko = Wv.useInsertionEffect, qv = function(t, r, n) {
  b.useMemo(t, n), An(function() {
    return r(!0);
  }, n);
}, Yv = Ko ? function(e, t, r) {
  return Ko(function() {
    return e(), t();
  }, r);
} : qv, Uv = A({}, b), Gv = Uv.useInsertionEffect, Kv = function(t) {
  var r = [], n = !1;
  function a(i) {
    if (n) {
      process.env.NODE_ENV !== "production" && Dr(!1, "[Ant Design CSS-in-JS] You are registering a cleanup function after unmount, which will not have any effect.");
      return;
    }
    r.push(i);
  }
  return b.useEffect(function() {
    return n = !1, function() {
      n = !0, r.length && r.forEach(function(i) {
        return i();
      });
    };
  }, t), a;
}, Xv = function() {
  return function(t) {
    t();
  };
}, Jv = typeof Gv < "u" ? Kv : Xv;
function Qv() {
  return !1;
}
var gi = !1;
function Zv() {
  return gi;
}
const ep = process.env.NODE_ENV === "production" ? Qv : Zv;
if (process.env.NODE_ENV !== "production" && typeof module < "u" && module && module.hot && typeof window < "u") {
  var mn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : null;
  if (mn && typeof mn.webpackHotUpdate == "function") {
    var tp = mn.webpackHotUpdate;
    mn.webpackHotUpdate = function() {
      return gi = !0, setTimeout(function() {
        gi = !1;
      }, 0), tp.apply(void 0, arguments);
    };
  }
}
function ao(e, t, r, n, a) {
  var i = b.useContext(on), o = i.cache, s = [e].concat(ee(t)), l = pi(s), c = Jv([l]), u = ep(), d = function(h) {
    o.opUpdate(l, function(f) {
      var y = f || [void 0, void 0], m = G(y, 2), C = m[0], T = C === void 0 ? 0 : C, E = m[1], w = E;
      process.env.NODE_ENV !== "production" && E && u && (n == null || n(w, u), w = null);
      var x = w || r(), R = [T, x];
      return h ? h(R) : R;
    });
  };
  b.useMemo(
    function() {
      d();
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [l]
    /* eslint-enable */
  );
  var v = o.opGet(l);
  process.env.NODE_ENV !== "production" && !v && (d(), v = o.opGet(l));
  var S = v[1];
  return Yv(function() {
    a == null || a(S);
  }, function(g) {
    return d(function(h) {
      var f = G(h, 2), y = f[0], m = f[1];
      return g && y === 0 && (a == null || a(S)), [y + 1, m];
    }), function() {
      o.opUpdate(l, function(h) {
        var f = h || [], y = G(f, 2), m = y[0], C = m === void 0 ? 0 : m, T = y[1], E = C - 1;
        return E === 0 ? (c(function() {
          (g || !o.opGet(l)) && (n == null || n(T, !1));
        }), null) : [C - 1, T];
      });
    };
  }, [l]), S;
}
var rp = {}, np = process.env.NODE_ENV !== "production" ? "css-dev-only-do-not-override" : "css", zt = /* @__PURE__ */ new Map();
function ap(e) {
  zt.set(e, (zt.get(e) || 0) + 1);
}
function ip(e, t) {
  if (typeof document < "u") {
    var r = document.querySelectorAll("style[".concat(ur, '="').concat(e, '"]'));
    r.forEach(function(n) {
      if (n[It] === t) {
        var a;
        (a = n.parentNode) === null || a === void 0 || a.removeChild(n);
      }
    });
  }
}
var op = 0;
function sp(e, t) {
  zt.set(e, (zt.get(e) || 0) - 1);
  var r = Array.from(zt.keys()), n = r.filter(function(a) {
    var i = zt.get(a) || 0;
    return i <= 0;
  });
  r.length - n.length > op && n.forEach(function(a) {
    ip(a, t), zt.delete(a);
  });
}
var lp = function(t, r, n, a) {
  var i = n.getDerivativeToken(t), o = A(A({}, i), r);
  return a && (o = a(o)), o;
}, Nl = "token";
function cp(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = Ot(on), a = n.cache.instanceId, i = n.container, o = r.salt, s = o === void 0 ? "" : o, l = r.override, c = l === void 0 ? rp : l, u = r.formatToken, d = r.getComputedToken, v = r.cssVar, S = Hv(function() {
    return Object.assign.apply(Object, [{}].concat(ee(t)));
  }, t), g = Ar(S), h = Ar(c), f = v ? Ar(v) : "", y = ao(Nl, [s, e.id, g, h, f], function() {
    var m, C = d ? d(S, c, e) : lp(S, c, e, u), T = A({}, C), E = "";
    if (v) {
      var w = Dl(C, v.key, {
        prefix: v.prefix,
        ignore: v.ignore,
        unitless: v.unitless,
        preserve: v.preserve
      }), x = G(w, 2);
      C = x[0], E = x[1];
    }
    var R = Go(C, s);
    C._tokenKey = R, T._tokenKey = Go(T, s);
    var F = (m = v == null ? void 0 : v.key) !== null && m !== void 0 ? m : R;
    C._themeKey = F, ap(F);
    var M = "".concat(np, "-").concat(zr(R));
    return C._hashId = M, [C, M, T, E, (v == null ? void 0 : v.key) || ""];
  }, function(m) {
    sp(m[0]._themeKey, a);
  }, function(m) {
    var C = G(m, 4), T = C[0], E = C[3];
    if (v && E) {
      var w = Bt(E, zr("css-variables-".concat(T._themeKey)), {
        mark: yt,
        prepend: "queue",
        attachTo: i,
        priority: -999
      });
      w[It] = a, w.setAttribute(ur, T._themeKey);
    }
  });
  return y;
}
var up = function(t, r, n) {
  var a = G(t, 5), i = a[2], o = a[3], s = a[4], l = n || {}, c = l.plain;
  if (!o)
    return null;
  var u = i._tokenKey, d = -999, v = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(d)
  }, S = Nn(o, s, u, v, c);
  return [d, u, S];
}, dp = {
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
}, kl = "comm", Vl = "rule", Ll = "decl", fp = "@import", vp = "@namespace", pp = "@keyframes", hp = "@layer", zl = Math.abs, io = String.fromCharCode;
function Hl(e) {
  return e.trim();
}
function wn(e, t, r) {
  return e.replace(t, r);
}
function mp(e, t, r) {
  return e.indexOf(t, r);
}
function or(e, t) {
  return e.charCodeAt(t) | 0;
}
function dr(e, t, r) {
  return e.slice(t, r);
}
function Ct(e) {
  return e.length;
}
function gp(e) {
  return e.length;
}
function gn(e, t) {
  return t.push(e), e;
}
var ba = 1, fr = 1, Bl = 0, ht = 0, Le = 0, mr = "";
function oo(e, t, r, n, a, i, o, s) {
  return { value: e, root: t, parent: r, type: n, props: a, children: i, line: ba, column: fr, length: o, return: "", siblings: s };
}
function bp() {
  return Le;
}
function yp() {
  return Le = ht > 0 ? or(mr, --ht) : 0, fr--, Le === 10 && (fr = 1, ba--), Le;
}
function St() {
  return Le = ht < Bl ? or(mr, ht++) : 0, fr++, Le === 10 && (fr = 1, ba++), Le;
}
function Dt() {
  return or(mr, ht);
}
function Pn() {
  return ht;
}
function ya(e, t) {
  return dr(mr, e, t);
}
function Hr(e) {
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
function Sp(e) {
  return ba = fr = 1, Bl = Ct(mr = e), ht = 0, [];
}
function xp(e) {
  return mr = "", e;
}
function Da(e) {
  return Hl(ya(ht - 1, bi(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Ep(e) {
  for (; (Le = Dt()) && Le < 33; )
    St();
  return Hr(e) > 2 || Hr(Le) > 3 ? "" : " ";
}
function Cp(e, t) {
  for (; --t && St() && !(Le < 48 || Le > 102 || Le > 57 && Le < 65 || Le > 70 && Le < 97); )
    ;
  return ya(e, Pn() + (t < 6 && Dt() == 32 && St() == 32));
}
function bi(e) {
  for (; St(); )
    switch (Le) {
      case e:
        return ht;
      case 34:
      case 39:
        e !== 34 && e !== 39 && bi(Le);
        break;
      case 40:
        e === 41 && bi(e);
        break;
      case 92:
        St();
        break;
    }
  return ht;
}
function _p(e, t) {
  for (; St() && e + Le !== 57; )
    if (e + Le === 84 && Dt() === 47)
      break;
  return "/*" + ya(t, ht - 1) + "*" + io(e === 47 ? e : St());
}
function $p(e) {
  for (; !Hr(Dt()); )
    St();
  return ya(e, ht);
}
function wp(e) {
  return xp(On("", null, null, null, [""], e = Sp(e), 0, [0], e));
}
function On(e, t, r, n, a, i, o, s, l) {
  for (var c = 0, u = 0, d = o, v = 0, S = 0, g = 0, h = 1, f = 1, y = 1, m = 0, C = "", T = a, E = i, w = n, x = C; f; )
    switch (g = m, m = St()) {
      case 40:
        if (g != 108 && or(x, d - 1) == 58) {
          mp(x += wn(Da(m), "&", "&\f"), "&\f", zl(c ? s[c - 1] : 0)) != -1 && (y = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        x += Da(m);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        x += Ep(g);
        break;
      case 92:
        x += Cp(Pn() - 1, 7);
        continue;
      case 47:
        switch (Dt()) {
          case 42:
          case 47:
            gn(Pp(_p(St(), Pn()), t, r, l), l), (Hr(g || 1) == 5 || Hr(Dt() || 1) == 5) && Ct(x) && dr(x, -1, void 0) !== " " && (x += " ");
            break;
          default:
            x += "/";
        }
        break;
      case 123 * h:
        s[c++] = Ct(x) * y;
      case 125 * h:
      case 59:
      case 0:
        switch (m) {
          case 0:
          case 125:
            f = 0;
          case 59 + u:
            y == -1 && (x = wn(x, /\f/g, "")), S > 0 && (Ct(x) - d || h === 0 && g === 47) && gn(S > 32 ? Jo(x + ";", n, r, d - 1, l) : Jo(wn(x, " ", "") + ";", n, r, d - 2, l), l);
            break;
          case 59:
            x += ";";
          default:
            if (gn(w = Xo(x, t, r, c, u, a, s, C, T = [], E = [], d, i), i), m === 123)
              if (u === 0)
                On(x, t, w, w, T, i, d, s, E);
              else {
                switch (v) {
                  case 99:
                    if (or(x, 3) === 110) break;
                  case 108:
                    if (or(x, 2) === 97) break;
                  default:
                    u = 0;
                  case 100:
                  case 109:
                  case 115:
                }
                u ? On(e, w, w, n && gn(Xo(e, w, w, 0, 0, a, s, C, a, T = [], d, E), E), a, E, d, s, n ? T : E) : On(x, w, w, w, [""], E, 0, s, E);
              }
        }
        c = u = S = 0, h = y = 1, C = x = "", d = o;
        break;
      case 58:
        d = 1 + Ct(x), S = g;
      default:
        if (h < 1) {
          if (m == 123)
            --h;
          else if (m == 125 && h++ == 0 && yp() == 125)
            continue;
        }
        switch (x += io(m), m * h) {
          case 38:
            y = u > 0 ? 1 : (x += "\f", -1);
            break;
          case 44:
            s[c++] = (Ct(x) - 1) * y, y = 1;
            break;
          case 64:
            Dt() === 45 && (x += Da(St())), v = Dt(), u = d = Ct(C = x += $p(Pn())), m++;
            break;
          case 45:
            g === 45 && Ct(x) == 2 && (h = 0);
        }
    }
  return i;
}
function Xo(e, t, r, n, a, i, o, s, l, c, u, d) {
  for (var v = a - 1, S = a === 0 ? i : [""], g = gp(S), h = 0, f = 0, y = 0; h < n; ++h)
    for (var m = 0, C = dr(e, v + 1, v = zl(f = o[h])), T = e; m < g; ++m)
      (T = Hl(f > 0 ? S[m] + " " + C : wn(C, /&\f/g, S[m]))) && (l[y++] = T);
  return oo(e, t, r, a === 0 ? Vl : s, l, c, u, d);
}
function Pp(e, t, r, n) {
  return oo(e, t, r, kl, io(bp()), dr(e, 2, -2), 0, n);
}
function Jo(e, t, r, n, a) {
  return oo(e, t, r, Ll, dr(e, 0, n), dr(e, n + 1, -1), n, a);
}
function yi(e, t) {
  for (var r = "", n = 0; n < e.length; n++)
    r += t(e[n], n, e, t) || "";
  return r;
}
function Op(e, t, r, n) {
  switch (e.type) {
    case hp:
      if (e.children.length) break;
    case fp:
    case vp:
    case Ll:
      return e.return = e.return || e.value;
    case kl:
      return "";
    case pp:
      return e.return = e.value + "{" + yi(e.children, n) + "}";
    case Vl:
      if (!Ct(e.value = e.props.join(","))) return "";
  }
  return Ct(r = yi(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function Wl(e, t) {
  var r = t.path, n = t.parentSelectors;
  Fe(!1, "[Ant Design CSS-in-JS] ".concat(r ? "Error in ".concat(r, ": ") : "").concat(e).concat(n.length ? " Selector: ".concat(n.join(" | ")) : ""));
}
var Tp = function(t, r, n) {
  if (t === "content") {
    var a = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, i = ["normal", "none", "initial", "inherit", "unset"];
    (typeof r != "string" || i.indexOf(r) === -1 && !a.test(r) && (r.charAt(0) !== r.charAt(r.length - 1) || r.charAt(0) !== '"' && r.charAt(0) !== "'")) && Wl("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"".concat(r, "\"'`."), n);
  }
}, Rp = function(t, r, n) {
  t === "animation" && n.hashId && r !== "none" && Wl("You seem to be using hashed animation '".concat(r, "', in which case 'animationName' with Keyframe as value is recommended."), n);
}, Qo = "data-ant-cssinjs-cache-path", ql = "_FILE_STYLE__", Wt, Yl = !0;
function Fp() {
  if (!Wt && (Wt = {}, Tt())) {
    var e = document.createElement("div");
    e.className = Qo, e.style.position = "fixed", e.style.visibility = "hidden", e.style.top = "-9999px", document.body.appendChild(e);
    var t = getComputedStyle(e).content || "";
    t = t.replace(/^"/, "").replace(/"$/, ""), t.split(";").forEach(function(a) {
      var i = a.split(":"), o = G(i, 2), s = o[0], l = o[1];
      Wt[s] = l;
    });
    var r = document.querySelector("style[".concat(Qo, "]"));
    if (r) {
      var n;
      Yl = !1, (n = r.parentNode) === null || n === void 0 || n.removeChild(r);
    }
    document.body.removeChild(e);
  }
}
function Ap(e) {
  return Fp(), !!Wt[e];
}
function Mp(e) {
  var t = Wt[e], r = null;
  if (t && Tt())
    if (Yl)
      r = ql;
    else {
      var n = document.querySelector("style[".concat(yt, '="').concat(Wt[e], '"]'));
      n ? r = n.innerHTML : delete Wt[e];
    }
  return [r, t];
}
var Ul = "_skip_check_", Gl = "_multi_value_";
function Tn(e) {
  var t = yi(wp(e), Op);
  return t.replace(/\{%%%\:[^;];}/g, ";");
}
function jp(e) {
  return te(e) === "object" && e && (Ul in e || Gl in e);
}
function Zo(e, t, r) {
  if (!t)
    return e;
  var n = ".".concat(t), a = r === "low" ? ":where(".concat(n, ")") : n, i = e.split(",").map(function(o) {
    var s, l = o.trim().split(/\s+/), c = l[0] || "", u = ((s = c.match(/^\w+/)) === null || s === void 0 ? void 0 : s[0]) || "";
    return c = "".concat(u).concat(a).concat(c.slice(u.length)), [c].concat(ee(l.slice(1))).join(" ");
  });
  return i.join(",");
}
var Ip = function e(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    root: !0,
    parentSelectors: []
  }, a = n.root, i = n.injectHash, o = n.parentSelectors, s = r.hashId, l = r.layer, c = r.path, u = r.hashPriority, d = r.transformers, v = d === void 0 ? [] : d, S = r.linters, g = S === void 0 ? [] : S, h = "", f = {};
  function y(T) {
    var E = T.getName(s);
    if (!f[E]) {
      var w = e(T.style, r, {
        root: !1,
        parentSelectors: o
      }), x = G(w, 1), R = x[0];
      f[E] = "@keyframes ".concat(T.getName(s)).concat(R);
    }
  }
  function m(T) {
    var E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    return T.forEach(function(w) {
      Array.isArray(w) ? m(w, E) : w && E.push(w);
    }), E;
  }
  var C = m(Array.isArray(t) ? t : [t]);
  return C.forEach(function(T) {
    var E = typeof T == "string" && !a ? {} : T;
    if (typeof E == "string")
      h += "".concat(E, `
`);
    else if (E._keyframe)
      y(E);
    else {
      var w = v.reduce(function(x, R) {
        var F;
        return (R == null || (F = R.visit) === null || F === void 0 ? void 0 : F.call(R, x)) || x;
      }, E);
      Object.keys(w).forEach(function(x) {
        var R = w[x];
        if (te(R) === "object" && R && (x !== "animationName" || !R._keyframe) && !jp(R)) {
          var F = !1, M = x.trim(), N = !1;
          (a || i) && s ? M.startsWith("@") ? F = !0 : M === "&" ? M = Zo("", s, u) : M = Zo(x, s, u) : a && !s && (M === "&" || M === "") && (M = "", N = !0);
          var z = e(R, r, {
            root: N,
            injectHash: F,
            parentSelectors: [].concat(ee(o), [M])
          }), j = G(z, 2), D = j[0], H = j[1];
          f = A(A({}, f), H), h += "".concat(M).concat(D);
        } else {
          let O = function(L, k) {
            process.env.NODE_ENV !== "production" && (te(R) !== "object" || !(R != null && R[Ul])) && [Tp, Rp].concat(ee(g)).forEach(function(Y) {
              return Y(L, k, {
                path: c,
                hashId: s,
                parentSelectors: o
              });
            });
            var V = L.replace(/[A-Z]/g, function(Y) {
              return "-".concat(Y.toLowerCase());
            }), W = k;
            !dp[L] && typeof W == "number" && W !== 0 && (W = "".concat(W, "px")), L === "animationName" && k !== null && k !== void 0 && k._keyframe && (y(k), W = k.getName(s)), h += "".concat(V, ":").concat(W, ";");
          };
          var P, $ = (P = R == null ? void 0 : R.value) !== null && P !== void 0 ? P : R;
          te(R) === "object" && R !== null && R !== void 0 && R[Gl] && Array.isArray($) ? $.forEach(function(L) {
            O(x, L);
          }) : O(x, $);
        }
      });
    }
  }), a ? l && (h && (h = "@layer ".concat(l.name, " {").concat(h, "}")), l.dependencies && (f["@layer ".concat(l.name)] = l.dependencies.map(function(T) {
    return "@layer ".concat(T, ", ").concat(l.name, ";");
  }).join(`
`))) : h = "{".concat(h, "}"), [h, f];
};
function Kl(e, t) {
  return zr("".concat(e.join("%")).concat(t));
}
function Dp() {
  return null;
}
var Xl = "style";
function Si(e, t) {
  var r = e.token, n = e.path, a = e.hashId, i = e.layer, o = e.nonce, s = e.clientOnly, l = e.order, c = l === void 0 ? 0 : l, u = b.useContext(on), d = u.autoClear, v = u.mock, S = u.defaultCache, g = u.hashPriority, h = u.container, f = u.ssrInline, y = u.transformers, m = u.linters, C = u.cache, T = u.layer, E = r._tokenKey, w = [E];
  T && w.push("layer"), w.push.apply(w, ee(n));
  var x = mi;
  process.env.NODE_ENV !== "production" && v !== void 0 && (x = v === "client");
  var R = ao(
    Xl,
    w,
    // Create cache if needed
    function() {
      var j = w.join("|");
      if (Ap(j)) {
        var D = Mp(j), H = G(D, 2), P = H[0], $ = H[1];
        if (P)
          return [P, E, $, {}, s, c];
      }
      var O = t(), L = Ip(O, {
        hashId: a,
        hashPriority: g,
        layer: T ? i : void 0,
        path: n.join("-"),
        transformers: y,
        linters: m
      }), k = G(L, 2), V = k[0], W = k[1], Y = Tn(V), U = Kl(w, Y);
      return [Y, E, U, W, s, c];
    },
    // Remove cache if no need
    function(j, D) {
      var H = G(j, 3), P = H[2];
      (D || d) && mi && _l(P, {
        mark: yt
      });
    },
    // Effect: Inject style here
    function(j) {
      var D = G(j, 4), H = D[0];
      D[1];
      var P = D[2], $ = D[3];
      if (x && H !== ql) {
        var O = {
          mark: yt,
          prepend: T ? !1 : "queue",
          attachTo: h,
          priority: c
        }, L = typeof o == "function" ? o() : o;
        L && (O.csp = {
          nonce: L
        });
        var k = [], V = [];
        Object.keys($).forEach(function(Y) {
          Y.startsWith("@layer") ? k.push(Y) : V.push(Y);
        }), k.forEach(function(Y) {
          Bt(Tn($[Y]), "_layer-".concat(Y), A(A({}, O), {}, {
            prepend: !0
          }));
        });
        var W = Bt(H, P, O);
        W[It] = C.instanceId, W.setAttribute(ur, E), process.env.NODE_ENV !== "production" && W.setAttribute(kv, w.join("|")), V.forEach(function(Y) {
          Bt(Tn($[Y]), "_effect-".concat(Y), O);
        });
      }
    }
  ), F = G(R, 3), M = F[0], N = F[1], z = F[2];
  return function(j) {
    var D;
    if (!f || x || !S)
      D = /* @__PURE__ */ b.createElement(Dp, null);
    else {
      var H;
      D = /* @__PURE__ */ b.createElement("style", Ke({}, (H = {}, _(H, ur, N), _(H, yt, z), H), {
        dangerouslySetInnerHTML: {
          __html: M
        }
      }));
    }
    return /* @__PURE__ */ b.createElement(b.Fragment, null, D, j);
  };
}
var Np = function(t, r, n) {
  var a = G(t, 6), i = a[0], o = a[1], s = a[2], l = a[3], c = a[4], u = a[5], d = n || {}, v = d.plain;
  if (c)
    return null;
  var S = i, g = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(u)
  };
  return S = Nn(i, o, s, g, v), l && Object.keys(l).forEach(function(h) {
    if (!r[h]) {
      r[h] = !0;
      var f = Tn(l[h]), y = Nn(f, o, "_effect-".concat(h), g, v);
      h.startsWith("@layer") ? S = y + S : S += y;
    }
  }), [u, s, S];
}, Jl = "cssVar", kp = function(t, r) {
  var n = t.key, a = t.prefix, i = t.unitless, o = t.ignore, s = t.token, l = t.scope, c = l === void 0 ? "" : l, u = Ot(on), d = u.cache.instanceId, v = u.container, S = s._tokenKey, g = [].concat(ee(t.path), [n, c, S]), h = ao(Jl, g, function() {
    var f = r(), y = Dl(f, n, {
      prefix: a,
      unitless: i,
      ignore: o,
      scope: c
    }), m = G(y, 2), C = m[0], T = m[1], E = Kl(g, T);
    return [C, T, E, n];
  }, function(f) {
    var y = G(f, 3), m = y[2];
    mi && _l(m, {
      mark: yt
    });
  }, function(f) {
    var y = G(f, 3), m = y[1], C = y[2];
    if (m) {
      var T = Bt(m, C, {
        mark: yt,
        prepend: "queue",
        attachTo: v,
        priority: -999
      });
      T[It] = d, T.setAttribute(ur, n);
    }
  });
  return h;
}, Vp = function(t, r, n) {
  var a = G(t, 4), i = a[1], o = a[2], s = a[3], l = n || {}, c = l.plain;
  if (!i)
    return null;
  var u = -999, d = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(u)
  }, v = Nn(i, s, o, d, c);
  return [u, o, v];
}, Pr;
Pr = {}, _(Pr, Xl, Np), _(Pr, Nl, up), _(Pr, Jl, Vp);
function Zt(e) {
  return e.notSplit = !0, e;
}
Zt(["borderTop", "borderBottom"]), Zt(["borderTop"]), Zt(["borderBottom"]), Zt(["borderLeft", "borderRight"]), Zt(["borderLeft"]), Zt(["borderRight"]);
var Ql = /* @__PURE__ */ Ue(function e() {
  Ye(this, e);
}), Zl = "CALC_UNIT", Lp = new RegExp(Zl, "g");
function Na(e) {
  return typeof e == "number" ? "".concat(e).concat(Zl) : e;
}
var zp = /* @__PURE__ */ function(e) {
  Ut(r, e);
  var t = Gt(r);
  function r(n, a) {
    var i;
    Ye(this, r), i = t.call(this), _(oe(i), "result", ""), _(oe(i), "unitlessCssVar", void 0), _(oe(i), "lowPriority", void 0);
    var o = te(n);
    return i.unitlessCssVar = a, n instanceof r ? i.result = "(".concat(n.result, ")") : o === "number" ? i.result = Na(n) : o === "string" && (i.result = n), i;
  }
  return Ue(r, [{
    key: "add",
    value: function(a) {
      return a instanceof r ? this.result = "".concat(this.result, " + ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " + ").concat(Na(a))), this.lowPriority = !0, this;
    }
  }, {
    key: "sub",
    value: function(a) {
      return a instanceof r ? this.result = "".concat(this.result, " - ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " - ").concat(Na(a))), this.lowPriority = !0, this;
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
      }) && (l = !1), this.result = this.result.replace(Lp, l ? "px" : ""), typeof this.lowPriority < "u" ? "calc(".concat(this.result, ")") : this.result;
    }
  }]), r;
}(Ql), Hp = /* @__PURE__ */ function(e) {
  Ut(r, e);
  var t = Gt(r);
  function r(n) {
    var a;
    return Ye(this, r), a = t.call(this), _(oe(a), "result", 0), n instanceof r ? a.result = n.result : typeof n == "number" && (a.result = n), a;
  }
  return Ue(r, [{
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
}(Ql), Bp = function(t, r) {
  var n = t === "css" ? zp : Hp;
  return function(a) {
    return new n(a, r);
  };
}, es = function(t, r) {
  return "".concat([r, t.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-"));
};
function _t(e, t) {
  for (var r = e, n = 0; n < t.length; n += 1) {
    if (r == null)
      return;
    r = r[t[n]];
  }
  return r;
}
function Wp(e) {
  return Ks(e) || Gs(e) || Ui(e) || Xs();
}
function ec(e, t, r, n) {
  if (!t.length)
    return r;
  var a = Wp(t), i = a[0], o = a.slice(1), s;
  return !e && typeof i == "number" ? s = [] : Array.isArray(e) ? s = ee(e) : s = A({}, e), n && r === void 0 && o.length === 1 ? delete s[i][o[0]] : s[i] = ec(s[i], o, r, n), s;
}
function mt(e, t, r) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && n && r === void 0 && !_t(e, t.slice(0, -1)) ? e : ec(e, t, r, n);
}
function qp(e) {
  return te(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function ts(e) {
  return Array.isArray(e) ? [] : {};
}
var Yp = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function rr() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = ts(t[0]);
  return t.forEach(function(a) {
    function i(o, s) {
      var l = new Set(s), c = _t(a, o), u = Array.isArray(c);
      if (u || qp(c)) {
        if (!l.has(c)) {
          l.add(c);
          var d = _t(n, o);
          u ? n = mt(n, o, []) : (!d || te(d) !== "object") && (n = mt(n, o, ts(c))), Yp(c).forEach(function(v) {
            i([].concat(ee(o), [v]), l);
          });
        }
      } else
        n = mt(n, o, c);
    }
    i([]);
  }), n;
}
function rs(e, t, r, n) {
  var a = A({}, t[e]);
  if (n != null && n.deprecatedTokens) {
    var i = n.deprecatedTokens;
    i.forEach(function(s) {
      var l = G(s, 2), c = l[0], u = l[1];
      if (process.env.NODE_ENV !== "production" && Fe(!(a != null && a[c]), "Component Token `".concat(String(c), "` of ").concat(String(e), " is deprecated. Please use `").concat(String(u), "` instead.")), a != null && a[c] || a != null && a[u]) {
        var d;
        (d = a[u]) !== null && d !== void 0 || (a[u] = a == null ? void 0 : a[c]);
      }
    });
  }
  var o = A(A({}, r), a);
  return Object.keys(o).forEach(function(s) {
    o[s] === t[s] && delete o[s];
  }), o;
}
var tc = process.env.NODE_ENV !== "production" || typeof CSSINJS_STATISTIC < "u", xi = !0;
function Kt() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  if (!tc)
    return Object.assign.apply(Object, [{}].concat(t));
  xi = !1;
  var n = {};
  return t.forEach(function(a) {
    if (te(a) === "object") {
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
  }), xi = !0, n;
}
var ns = {};
function Up() {
}
var Gp = function(t) {
  var r, n = t, a = Up;
  return tc && typeof Proxy < "u" && (r = /* @__PURE__ */ new Set(), n = new Proxy(t, {
    get: function(o, s) {
      if (xi) {
        var l;
        (l = r) === null || l === void 0 || l.add(s);
      }
      return o[s];
    }
  }), a = function(o, s) {
    var l;
    ns[o] = {
      global: Array.from(r),
      component: A(A({}, (l = ns[o]) === null || l === void 0 ? void 0 : l.component), s)
    };
  }), {
    token: n,
    keys: r,
    flush: a
  };
};
function as(e, t, r) {
  if (typeof r == "function") {
    var n;
    return r(Kt(t, (n = t[e]) !== null && n !== void 0 ? n : {}));
  }
  return r ?? {};
}
function Kp(e) {
  return e === "js" ? {
    max: Math.max,
    min: Math.min
  } : {
    max: function() {
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      return "max(".concat(n.map(function(i) {
        return Pe(i);
      }).join(","), ")");
    },
    min: function() {
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      return "min(".concat(n.map(function(i) {
        return Pe(i);
      }).join(","), ")");
    }
  };
}
var Xp = 1e3 * 60 * 10, Jp = /* @__PURE__ */ function() {
  function e() {
    Ye(this, e), _(this, "map", /* @__PURE__ */ new Map()), _(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), _(this, "nextID", 0), _(this, "lastAccessBeat", /* @__PURE__ */ new Map()), _(this, "accessBeat", 0);
  }
  return Ue(e, [{
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
        return i && te(i) === "object" ? "obj_".concat(n.getObjectID(i)) : "".concat(te(i), "_").concat(i);
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
          n - a > Xp && (r.map.delete(i), r.lastAccessBeat.delete(i));
        }), this.accessBeat = 0;
      }
    }
  }]), e;
}(), is = new Jp();
function Qp(e, t) {
  return X.useMemo(function() {
    var r = is.get(t);
    if (r)
      return r;
    var n = e();
    return is.set(t, n), n;
  }, t);
}
var Zp = function() {
  return {};
};
function eh(e) {
  var t = e.useCSP, r = t === void 0 ? Zp : t, n = e.useToken, a = e.usePrefix, i = e.getResetStyles, o = e.getCommonStyle, s = e.getCompUnitless;
  function l(v, S, g, h) {
    var f = Array.isArray(v) ? v[0] : v;
    function y(R) {
      return "".concat(String(f)).concat(R.slice(0, 1).toUpperCase()).concat(R.slice(1));
    }
    var m = (h == null ? void 0 : h.unitless) || {}, C = typeof s == "function" ? s(v) : {}, T = A(A({}, C), {}, _({}, y("zIndexPopup"), !0));
    Object.keys(m).forEach(function(R) {
      T[y(R)] = m[R];
    });
    var E = A(A({}, h), {}, {
      unitless: T,
      prefixToken: y
    }), w = u(v, S, g, E), x = c(f, g, E);
    return function(R) {
      var F = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : R, M = w(R, F), N = G(M, 2), z = N[1], j = x(F), D = G(j, 2), H = D[0], P = D[1];
      return [H, z, P];
    };
  }
  function c(v, S, g) {
    var h = g.unitless, f = g.injectStyle, y = f === void 0 ? !0 : f, m = g.prefixToken, C = g.ignore, T = function(x) {
      var R = x.rootCls, F = x.cssVar, M = F === void 0 ? {} : F, N = n(), z = N.realToken;
      return kp({
        path: [v],
        prefix: M.prefix,
        key: M.key,
        unitless: h,
        ignore: C,
        token: z,
        scope: R
      }, function() {
        var j = as(v, z, S), D = rs(v, z, j, {
          deprecatedTokens: g == null ? void 0 : g.deprecatedTokens
        });
        return Object.keys(j).forEach(function(H) {
          D[m(H)] = D[H], delete D[H];
        }), D;
      }), null;
    }, E = function(x) {
      var R = n(), F = R.cssVar;
      return [function(M) {
        return y && F ? /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement(T, {
          rootCls: x,
          cssVar: F,
          component: v
        }), M) : M;
      }, F == null ? void 0 : F.key];
    };
    return E;
  }
  function u(v, S, g) {
    var h = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, f = Array.isArray(v) ? v : [v, v], y = G(f, 1), m = y[0], C = f.join("-"), T = e.layer || {
      name: "antd"
    };
    return function(E) {
      var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : E, x = n(), R = x.theme, F = x.realToken, M = x.hashId, N = x.token, z = x.cssVar, j = a(), D = j.rootPrefixCls, H = j.iconPrefixCls, P = r(), $ = z ? "css" : "js", O = Qp(function() {
        var U = /* @__PURE__ */ new Set();
        return z && Object.keys(h.unitless || {}).forEach(function(K) {
          U.add($n(K, z.prefix)), U.add($n(K, es(m, z.prefix)));
        }), Bp($, U);
      }, [$, m, z == null ? void 0 : z.prefix]), L = Kp($), k = L.max, V = L.min, W = {
        theme: R,
        token: N,
        hashId: M,
        nonce: function() {
          return P.nonce;
        },
        clientOnly: h.clientOnly,
        layer: T,
        // antd is always at top of styles
        order: h.order || -999
      };
      typeof i == "function" && Si(A(A({}, W), {}, {
        clientOnly: !1,
        path: ["Shared", D]
      }), function() {
        return i(N, {
          prefix: {
            rootPrefixCls: D,
            iconPrefixCls: H
          },
          csp: P
        });
      });
      var Y = Si(A(A({}, W), {}, {
        path: [C, E, H]
      }), function() {
        if (h.injectStyle === !1)
          return [];
        var U = Gp(N), K = U.token, Z = U.flush, re = as(m, F, g), le = ".".concat(E), ve = rs(m, F, re, {
          deprecatedTokens: h.deprecatedTokens
        });
        z && re && te(re) === "object" && Object.keys(re).forEach(function(De) {
          re[De] = "var(".concat($n(De, es(m, z.prefix)), ")");
        });
        var de = Kt(K, {
          componentCls: le,
          prefixCls: E,
          iconCls: ".".concat(H),
          antCls: ".".concat(D),
          calc: O,
          // @ts-ignore
          max: k,
          // @ts-ignore
          min: V
        }, z ? re : ve), $e = S(de, {
          hashId: M,
          prefixCls: E,
          rootPrefixCls: D,
          iconPrefixCls: H
        });
        Z(m, ve);
        var we = typeof o == "function" ? o(de, E, w, h.resetFont) : null;
        return [h.resetStyle === !1 ? null : we, $e];
      });
      return [Y, M];
    };
  }
  function d(v, S, g) {
    var h = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, f = u(v, S, g, A({
      resetStyle: !1,
      // Sub Style should default after root one
      order: -998
    }, h)), y = function(C) {
      var T = C.prefixCls, E = C.rootCls, w = E === void 0 ? T : E;
      return f(T, w), null;
    };
    return process.env.NODE_ENV !== "production" && (y.displayName = "SubStyle_".concat(String(Array.isArray(v) ? v.join(".") : v))), y;
  }
  return {
    genStyleHooks: l,
    genSubStyleComponent: d,
    genComponentStyleHook: u
  };
}
function th(e) {
  return (e + 8) / e;
}
function rh(e) {
  const t = Array.from({
    length: 10
  }).map((r, n) => {
    const a = n - 1, i = e * Math.pow(Math.E, a / 5), o = n > 1 ? Math.floor(i) : Math.ceil(i);
    return Math.floor(o / 2) * 2;
  });
  return t[1] = e, t.map((r) => ({
    size: r,
    lineHeight: th(r)
  }));
}
const nh = "5.24.5", rc = {
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
}, Br = Object.assign(Object.assign({}, rc), {
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
function ah(e, t) {
  let {
    generateColorPalettes: r,
    generateNeutralColorPalettes: n
  } = t;
  const {
    colorSuccess: a,
    colorWarning: i,
    colorError: o,
    colorInfo: s,
    colorPrimary: l,
    colorBgBase: c,
    colorTextBase: u
  } = e, d = r(l), v = r(a), S = r(i), g = r(o), h = r(s), f = n(c, u), y = e.colorLink || e.colorInfo, m = r(y), C = new Ve(g[1]).mix(new Ve(g[3]), 50).toHexString();
  return Object.assign(Object.assign({}, f), {
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
    colorSuccessBg: v[1],
    colorSuccessBgHover: v[2],
    colorSuccessBorder: v[3],
    colorSuccessBorderHover: v[4],
    colorSuccessHover: v[4],
    colorSuccess: v[6],
    colorSuccessActive: v[7],
    colorSuccessTextHover: v[8],
    colorSuccessText: v[9],
    colorSuccessTextActive: v[10],
    colorErrorBg: g[1],
    colorErrorBgHover: g[2],
    colorErrorBgFilledHover: C,
    colorErrorBgActive: g[3],
    colorErrorBorder: g[3],
    colorErrorBorderHover: g[4],
    colorErrorHover: g[5],
    colorError: g[6],
    colorErrorActive: g[7],
    colorErrorTextHover: g[8],
    colorErrorText: g[9],
    colorErrorTextActive: g[10],
    colorWarningBg: S[1],
    colorWarningBgHover: S[2],
    colorWarningBorder: S[3],
    colorWarningBorderHover: S[4],
    colorWarningHover: S[4],
    colorWarning: S[6],
    colorWarningActive: S[7],
    colorWarningTextHover: S[8],
    colorWarningText: S[9],
    colorWarningTextActive: S[10],
    colorInfoBg: h[1],
    colorInfoBgHover: h[2],
    colorInfoBorder: h[3],
    colorInfoBorderHover: h[4],
    colorInfoHover: h[4],
    colorInfo: h[6],
    colorInfoActive: h[7],
    colorInfoTextHover: h[8],
    colorInfoText: h[9],
    colorInfoTextActive: h[10],
    colorLinkHover: m[4],
    colorLink: m[6],
    colorLinkActive: m[7],
    colorBgMask: new Ve("#000").setA(0.45).toRgbString(),
    colorWhite: "#fff"
  });
}
const ih = (e) => {
  let t = e, r = e, n = e, a = e;
  return e < 6 && e >= 5 ? t = e + 1 : e < 16 && e >= 6 ? t = e + 2 : e >= 16 && (t = 16), e < 7 && e >= 5 ? r = 4 : e < 8 && e >= 7 ? r = 5 : e < 14 && e >= 8 ? r = 6 : e < 16 && e >= 14 ? r = 7 : e >= 16 && (r = 8), e < 6 && e >= 2 ? n = 1 : e >= 6 && (n = 2), e > 4 && e < 8 ? a = 4 : e >= 8 && (a = 6), {
    borderRadius: e,
    borderRadiusXS: n,
    borderRadiusSM: r,
    borderRadiusLG: t,
    borderRadiusOuter: a
  };
};
function oh(e) {
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
  }, ih(n));
}
const sh = (e) => {
  const {
    controlHeight: t
  } = e;
  return {
    controlHeightSM: t * 0.75,
    controlHeightXS: t * 0.5,
    controlHeightLG: t * 1.25
  };
}, lh = (e) => {
  const t = rh(e), r = t.map((u) => u.size), n = t.map((u) => u.lineHeight), a = r[1], i = r[0], o = r[2], s = n[1], l = n[0], c = n[2];
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
function ch(e) {
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
const ft = (e, t) => new Ve(e).setA(t).toRgbString(), Or = (e, t) => new Ve(e).darken(t).toHexString(), uh = (e) => {
  const t = Vr(e);
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
}, dh = (e, t) => {
  const r = e || "#fff", n = t || "#000";
  return {
    colorBgBase: r,
    colorTextBase: n,
    colorText: ft(n, 0.88),
    colorTextSecondary: ft(n, 0.65),
    colorTextTertiary: ft(n, 0.45),
    colorTextQuaternary: ft(n, 0.25),
    colorFill: ft(n, 0.15),
    colorFillSecondary: ft(n, 0.06),
    colorFillTertiary: ft(n, 0.04),
    colorFillQuaternary: ft(n, 0.02),
    colorBgSolid: ft(n, 1),
    colorBgSolidHover: ft(n, 0.75),
    colorBgSolidActive: ft(n, 0.95),
    colorBgLayout: Or(r, 4),
    colorBgContainer: Or(r, 0),
    colorBgElevated: Or(r, 0),
    colorBgSpotlight: ft(n, 0.85),
    colorBgBlur: "transparent",
    colorBorder: Or(r, 15),
    colorBorderSecondary: Or(r, 6)
  };
};
function fh(e) {
  Aa.pink = Aa.magenta, Ma.pink = Ma.magenta;
  const t = Object.keys(rc).map((r) => {
    const n = e[r] === Aa[r] ? Ma[r] : Vr(e[r]);
    return Array.from({
      length: 10
    }, () => 1).reduce((a, i, o) => (a[`${r}-${o + 1}`] = n[o], a[`${r}${o + 1}`] = n[o], a), {});
  }).reduce((r, n) => (r = Object.assign(Object.assign({}, r), n), r), {});
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e), t), ah(e, {
    generateColorPalettes: uh,
    generateNeutralColorPalettes: dh
  })), lh(e.fontSize)), ch(e)), sh(e)), oh(e));
}
const nc = hi(fh), Ei = {
  token: Br,
  override: {
    override: Br
  },
  hashed: !0
}, ac = /* @__PURE__ */ X.createContext(Ei);
function ka(e) {
  return e >= 0 && e <= 255;
}
function bn(e, t) {
  const {
    r,
    g: n,
    b: a,
    a: i
  } = new Ve(e).toRgb();
  if (i < 1)
    return e;
  const {
    r: o,
    g: s,
    b: l
  } = new Ve(t).toRgb();
  for (let c = 0.01; c <= 1; c += 0.01) {
    const u = Math.round((r - o * (1 - c)) / c), d = Math.round((n - s * (1 - c)) / c), v = Math.round((a - l * (1 - c)) / c);
    if (ka(u) && ka(d) && ka(v))
      return new Ve({
        r: u,
        g: d,
        b: v,
        a: Math.round(c * 100) / 100
      }).toRgbString();
  }
  return new Ve({
    r,
    g: n,
    b: a,
    a: 1
  }).toRgbString();
}
var vh = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
function ic(e) {
  const {
    override: t
  } = e, r = vh(e, ["override"]), n = Object.assign({}, t);
  Object.keys(Br).forEach((v) => {
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
    colorSplit: bn(a.colorBorderSecondary, a.colorBgContainer),
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
    colorErrorOutline: bn(a.colorErrorBg, a.colorBgContainer),
    colorWarningOutline: bn(a.colorWarningBg, a.colorBgContainer),
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
    controlOutline: bn(a.colorPrimaryBg, a.colorBgContainer),
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
      0 1px 2px -2px ${new Ve("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new Ve("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new Ve("rgba(0, 0, 0, 0.09)").toRgbString()}
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
var os = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const oc = {
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
}, ph = {
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
}, hh = {
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
}, sc = (e, t, r) => {
  const n = r.getDerivativeToken(e), {
    override: a
  } = t, i = os(t, ["override"]);
  let o = Object.assign(Object.assign({}, n), {
    override: a
  });
  return o = ic(o), i && Object.entries(i).forEach((s) => {
    let [l, c] = s;
    const {
      theme: u
    } = c, d = os(c, ["theme"]);
    let v = d;
    u && (v = sc(Object.assign(Object.assign({}, o), d), {
      override: d
    }, u)), o[l] = v;
  }), o;
};
function Sa() {
  const {
    token: e,
    hashed: t,
    theme: r,
    override: n,
    cssVar: a
  } = X.useContext(ac), i = `${nh}-${t || ""}`, o = r || nc, [s, l, c] = cp(o, [Br, e], {
    salt: i,
    override: n,
    getComputedToken: sc,
    // formatToken will not be consumed after 1.15.0 with getComputedToken.
    // But token will break if @ant-design/cssinjs is under 1.15.0 without it
    formatToken: ic,
    cssVar: a && {
      prefix: a.prefix,
      key: a.key,
      unitless: oc,
      ignore: ph,
      preserve: hh
    }
  });
  return [o, c, t ? l : "", s, a];
}
const lc = function(e) {
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
}, mh = () => ({
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
}), gh = () => ({
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
}), bh = (e) => ({
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
}), yh = (e, t, r, n) => {
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
}, cc = (e) => ({
  [`.${e}`]: Object.assign(Object.assign({}, mh()), {
    [`.${e} .${e}-icon`]: {
      display: "block"
    }
  })
}), {
  genStyleHooks: so
} = eh({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: t
    } = Ot(Nt);
    return {
      rootPrefixCls: e(),
      iconPrefixCls: t
    };
  },
  useToken: () => {
    const [e, t, r, n, a] = Sa();
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
    } = Ot(Nt);
    return e ?? {};
  },
  getResetStyles: (e, t) => {
    var r;
    const n = bh(e);
    return [n, {
      "&": n
    }, cc((r = t == null ? void 0 : t.prefix.iconPrefixCls) !== null && r !== void 0 ? r : ro)];
  },
  getCommonStyle: yh,
  getCompUnitless: () => oc
}), Sh = (e, t) => {
  const [r, n] = Sa();
  return Si({
    token: n,
    hashId: "",
    path: ["ant-design-icons", e],
    nonce: () => t == null ? void 0 : t.nonce,
    layer: {
      name: "antd"
    }
  }, () => [cc(e)]);
}, uc = (e) => {
  const [, , , , t] = Sa();
  return t ? `${e}-css-var` : "";
}, vr = /* @__PURE__ */ b.createContext(void 0), xh = (e) => {
  let {
    children: t,
    size: r
  } = e;
  const n = b.useContext(vr);
  return /* @__PURE__ */ b.createElement(vr.Provider, {
    value: r || n
  }, t);
}, dc = (e) => {
  const t = X.useContext(vr);
  return X.useMemo(() => e ? typeof e == "string" ? e ?? t : typeof e == "function" ? e(t) : t : t, [e, t]);
};
function xt() {
  xt = function() {
    return t;
  };
  var e, t = {}, r = Object.prototype, n = r.hasOwnProperty, a = Object.defineProperty || function(P, $, O) {
    P[$] = O.value;
  }, i = typeof Symbol == "function" ? Symbol : {}, o = i.iterator || "@@iterator", s = i.asyncIterator || "@@asyncIterator", l = i.toStringTag || "@@toStringTag";
  function c(P, $, O) {
    return Object.defineProperty(P, $, {
      value: O,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), P[$];
  }
  try {
    c({}, "");
  } catch {
    c = function(O, L, k) {
      return O[L] = k;
    };
  }
  function u(P, $, O, L) {
    var k = $ && $.prototype instanceof y ? $ : y, V = Object.create(k.prototype), W = new D(L || []);
    return a(V, "_invoke", {
      value: M(P, O, W)
    }), V;
  }
  function d(P, $, O) {
    try {
      return {
        type: "normal",
        arg: P.call($, O)
      };
    } catch (L) {
      return {
        type: "throw",
        arg: L
      };
    }
  }
  t.wrap = u;
  var v = "suspendedStart", S = "suspendedYield", g = "executing", h = "completed", f = {};
  function y() {
  }
  function m() {
  }
  function C() {
  }
  var T = {};
  c(T, o, function() {
    return this;
  });
  var E = Object.getPrototypeOf, w = E && E(E(H([])));
  w && w !== r && n.call(w, o) && (T = w);
  var x = C.prototype = y.prototype = Object.create(T);
  function R(P) {
    ["next", "throw", "return"].forEach(function($) {
      c(P, $, function(O) {
        return this._invoke($, O);
      });
    });
  }
  function F(P, $) {
    function O(k, V, W, Y) {
      var U = d(P[k], P, V);
      if (U.type !== "throw") {
        var K = U.arg, Z = K.value;
        return Z && te(Z) == "object" && n.call(Z, "__await") ? $.resolve(Z.__await).then(function(re) {
          O("next", re, W, Y);
        }, function(re) {
          O("throw", re, W, Y);
        }) : $.resolve(Z).then(function(re) {
          K.value = re, W(K);
        }, function(re) {
          return O("throw", re, W, Y);
        });
      }
      Y(U.arg);
    }
    var L;
    a(this, "_invoke", {
      value: function(V, W) {
        function Y() {
          return new $(function(U, K) {
            O(V, W, U, K);
          });
        }
        return L = L ? L.then(Y, Y) : Y();
      }
    });
  }
  function M(P, $, O) {
    var L = v;
    return function(k, V) {
      if (L === g) throw Error("Generator is already running");
      if (L === h) {
        if (k === "throw") throw V;
        return {
          value: e,
          done: !0
        };
      }
      for (O.method = k, O.arg = V; ; ) {
        var W = O.delegate;
        if (W) {
          var Y = N(W, O);
          if (Y) {
            if (Y === f) continue;
            return Y;
          }
        }
        if (O.method === "next") O.sent = O._sent = O.arg;
        else if (O.method === "throw") {
          if (L === v) throw L = h, O.arg;
          O.dispatchException(O.arg);
        } else O.method === "return" && O.abrupt("return", O.arg);
        L = g;
        var U = d(P, $, O);
        if (U.type === "normal") {
          if (L = O.done ? h : S, U.arg === f) continue;
          return {
            value: U.arg,
            done: O.done
          };
        }
        U.type === "throw" && (L = h, O.method = "throw", O.arg = U.arg);
      }
    };
  }
  function N(P, $) {
    var O = $.method, L = P.iterator[O];
    if (L === e) return $.delegate = null, O === "throw" && P.iterator.return && ($.method = "return", $.arg = e, N(P, $), $.method === "throw") || O !== "return" && ($.method = "throw", $.arg = new TypeError("The iterator does not provide a '" + O + "' method")), f;
    var k = d(L, P.iterator, $.arg);
    if (k.type === "throw") return $.method = "throw", $.arg = k.arg, $.delegate = null, f;
    var V = k.arg;
    return V ? V.done ? ($[P.resultName] = V.value, $.next = P.nextLoc, $.method !== "return" && ($.method = "next", $.arg = e), $.delegate = null, f) : V : ($.method = "throw", $.arg = new TypeError("iterator result is not an object"), $.delegate = null, f);
  }
  function z(P) {
    var $ = {
      tryLoc: P[0]
    };
    1 in P && ($.catchLoc = P[1]), 2 in P && ($.finallyLoc = P[2], $.afterLoc = P[3]), this.tryEntries.push($);
  }
  function j(P) {
    var $ = P.completion || {};
    $.type = "normal", delete $.arg, P.completion = $;
  }
  function D(P) {
    this.tryEntries = [{
      tryLoc: "root"
    }], P.forEach(z, this), this.reset(!0);
  }
  function H(P) {
    if (P || P === "") {
      var $ = P[o];
      if ($) return $.call(P);
      if (typeof P.next == "function") return P;
      if (!isNaN(P.length)) {
        var O = -1, L = function k() {
          for (; ++O < P.length; ) if (n.call(P, O)) return k.value = P[O], k.done = !1, k;
          return k.value = e, k.done = !0, k;
        };
        return L.next = L;
      }
    }
    throw new TypeError(te(P) + " is not iterable");
  }
  return m.prototype = C, a(x, "constructor", {
    value: C,
    configurable: !0
  }), a(C, "constructor", {
    value: m,
    configurable: !0
  }), m.displayName = c(C, l, "GeneratorFunction"), t.isGeneratorFunction = function(P) {
    var $ = typeof P == "function" && P.constructor;
    return !!$ && ($ === m || ($.displayName || $.name) === "GeneratorFunction");
  }, t.mark = function(P) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(P, C) : (P.__proto__ = C, c(P, l, "GeneratorFunction")), P.prototype = Object.create(x), P;
  }, t.awrap = function(P) {
    return {
      __await: P
    };
  }, R(F.prototype), c(F.prototype, s, function() {
    return this;
  }), t.AsyncIterator = F, t.async = function(P, $, O, L, k) {
    k === void 0 && (k = Promise);
    var V = new F(u(P, $, O, L), k);
    return t.isGeneratorFunction($) ? V : V.next().then(function(W) {
      return W.done ? W.value : V.next();
    });
  }, R(x), c(x, l, "Generator"), c(x, o, function() {
    return this;
  }), c(x, "toString", function() {
    return "[object Generator]";
  }), t.keys = function(P) {
    var $ = Object(P), O = [];
    for (var L in $) O.push(L);
    return O.reverse(), function k() {
      for (; O.length; ) {
        var V = O.pop();
        if (V in $) return k.value = V, k.done = !1, k;
      }
      return k.done = !0, k;
    };
  }, t.values = H, D.prototype = {
    constructor: D,
    reset: function($) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(j), !$) for (var O in this) O.charAt(0) === "t" && n.call(this, O) && !isNaN(+O.slice(1)) && (this[O] = e);
    },
    stop: function() {
      this.done = !0;
      var $ = this.tryEntries[0].completion;
      if ($.type === "throw") throw $.arg;
      return this.rval;
    },
    dispatchException: function($) {
      if (this.done) throw $;
      var O = this;
      function L(K, Z) {
        return W.type = "throw", W.arg = $, O.next = K, Z && (O.method = "next", O.arg = e), !!Z;
      }
      for (var k = this.tryEntries.length - 1; k >= 0; --k) {
        var V = this.tryEntries[k], W = V.completion;
        if (V.tryLoc === "root") return L("end");
        if (V.tryLoc <= this.prev) {
          var Y = n.call(V, "catchLoc"), U = n.call(V, "finallyLoc");
          if (Y && U) {
            if (this.prev < V.catchLoc) return L(V.catchLoc, !0);
            if (this.prev < V.finallyLoc) return L(V.finallyLoc);
          } else if (Y) {
            if (this.prev < V.catchLoc) return L(V.catchLoc, !0);
          } else {
            if (!U) throw Error("try statement without catch or finally");
            if (this.prev < V.finallyLoc) return L(V.finallyLoc);
          }
        }
      }
    },
    abrupt: function($, O) {
      for (var L = this.tryEntries.length - 1; L >= 0; --L) {
        var k = this.tryEntries[L];
        if (k.tryLoc <= this.prev && n.call(k, "finallyLoc") && this.prev < k.finallyLoc) {
          var V = k;
          break;
        }
      }
      V && ($ === "break" || $ === "continue") && V.tryLoc <= O && O <= V.finallyLoc && (V = null);
      var W = V ? V.completion : {};
      return W.type = $, W.arg = O, V ? (this.method = "next", this.next = V.finallyLoc, f) : this.complete(W);
    },
    complete: function($, O) {
      if ($.type === "throw") throw $.arg;
      return $.type === "break" || $.type === "continue" ? this.next = $.arg : $.type === "return" ? (this.rval = this.arg = $.arg, this.method = "return", this.next = "end") : $.type === "normal" && O && (this.next = O), f;
    },
    finish: function($) {
      for (var O = this.tryEntries.length - 1; O >= 0; --O) {
        var L = this.tryEntries[O];
        if (L.finallyLoc === $) return this.complete(L.completion, L.afterLoc), j(L), f;
      }
    },
    catch: function($) {
      for (var O = this.tryEntries.length - 1; O >= 0; --O) {
        var L = this.tryEntries[O];
        if (L.tryLoc === $) {
          var k = L.completion;
          if (k.type === "throw") {
            var V = k.arg;
            j(L);
          }
          return V;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function($, O, L) {
      return this.delegate = {
        iterator: H($),
        resultName: O,
        nextLoc: L
      }, this.method === "next" && (this.arg = e), f;
    }
  }, t;
}
function ss(e, t, r, n, a, i, o) {
  try {
    var s = e[i](o), l = s.value;
  } catch (c) {
    return void r(c);
  }
  s.done ? t(l) : Promise.resolve(l).then(n, a);
}
function sn(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(n, a) {
      var i = e.apply(t, r);
      function o(l) {
        ss(i, n, a, o, s, "next", l);
      }
      function s(l) {
        ss(i, n, a, o, s, "throw", l);
      }
      o(void 0);
    });
  };
}
var Ht = "RC_FORM_INTERNAL_HOOKS", xe = function() {
  Fe(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, pr = /* @__PURE__ */ b.createContext({
  getFieldValue: xe,
  getFieldsValue: xe,
  getFieldError: xe,
  getFieldWarning: xe,
  getFieldsError: xe,
  isFieldsTouched: xe,
  isFieldTouched: xe,
  isFieldValidating: xe,
  isFieldsValidating: xe,
  resetFields: xe,
  setFields: xe,
  setFieldValue: xe,
  setFieldsValue: xe,
  validateFields: xe,
  submit: xe,
  getInternalHooks: function() {
    return xe(), {
      dispatch: xe,
      initEntityValue: xe,
      registerField: xe,
      useSubscribe: xe,
      setInitialValues: xe,
      destroyForm: xe,
      setCallbacks: xe,
      registerWatch: xe,
      getFields: xe,
      setValidateMessages: xe,
      setPreserve: xe,
      getInitialValue: xe
    };
  }
}), kn = /* @__PURE__ */ b.createContext(null);
function Ci(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Eh(e) {
  return e && !!e._init;
}
function _i() {
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
var $i = _i();
function Ch(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
function _h(e, t, r) {
  if (Ji()) return Reflect.construct.apply(null, arguments);
  var n = [null];
  n.push.apply(n, t);
  var a = new (e.bind.apply(e, n))();
  return r && Nr(a, r.prototype), a;
}
function wi(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return wi = function(n) {
    if (n === null || !Ch(n)) return n;
    if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
    if (t !== void 0) {
      if (t.has(n)) return t.get(n);
      t.set(n, a);
    }
    function a() {
      return _h(n, arguments, kr(this).constructor);
    }
    return a.prototype = Object.create(n.prototype, {
      constructor: {
        value: a,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), Nr(a, n);
  }, wi(e);
}
var $h = /%[sdj%]/g, fc = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (fc = function(t, r) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && r.every(function(n) {
    return typeof n == "string";
  }) && console.warn(t, r);
});
function Pi(e) {
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
    var o = e.replace($h, function(s) {
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
function wh(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function Be(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || wh(t) && typeof e == "string" && !e);
}
function Ph(e, t, r) {
  var n = [], a = 0, i = e.length;
  function o(s) {
    n.push.apply(n, ee(s || [])), a++, a === i && r(n);
  }
  e.forEach(function(s) {
    t(s, o);
  });
}
function ls(e, t, r) {
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
function Oh(e) {
  var t = [];
  return Object.keys(e).forEach(function(r) {
    t.push.apply(t, ee(e[r] || []));
  }), t;
}
var cs = /* @__PURE__ */ function(e) {
  Ut(r, e);
  var t = Gt(r);
  function r(n, a) {
    var i;
    return Ye(this, r), i = t.call(this, "Async Validation Error"), _(oe(i), "errors", void 0), _(oe(i), "fields", void 0), i.errors = n, i.fields = a, i;
  }
  return Ue(r);
}(/* @__PURE__ */ wi(Error));
function Th(e, t, r, n, a) {
  if (t.first) {
    var i = new Promise(function(v, S) {
      var g = function(y) {
        return n(y), y.length ? S(new cs(y, Pi(y))) : v(a);
      }, h = Oh(e);
      ls(h, r, g);
    });
    return i.catch(function(v) {
      return v;
    }), i;
  }
  var o = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], s = Object.keys(e), l = s.length, c = 0, u = [], d = new Promise(function(v, S) {
    var g = function(f) {
      if (u.push.apply(u, f), c++, c === l)
        return n(u), u.length ? S(new cs(u, Pi(u))) : v(a);
    };
    s.length || (n(u), v(a)), s.forEach(function(h) {
      var f = e[h];
      o.indexOf(h) !== -1 ? ls(f, r, g) : Ph(f, r, g);
    });
  });
  return d.catch(function(v) {
    return v;
  }), d;
}
function Rh(e) {
  return !!(e && e.message !== void 0);
}
function Fh(e, t) {
  for (var r = e, n = 0; n < t.length; n++) {
    if (r == null)
      return r;
    r = r[t[n]];
  }
  return r;
}
function us(e, t) {
  return function(r) {
    var n;
    return e.fullFields ? n = Fh(t, e.fullFields) : n = t[r.field || e.fullField], Rh(r) ? (r.field = r.field || e.fullField, r.fieldValue = n, r) : {
      message: typeof r == "function" ? r() : r,
      fieldValue: n,
      field: r.field || e.fullField
    };
  };
}
function ds(e, t) {
  if (t) {
    for (var r in t)
      if (t.hasOwnProperty(r)) {
        var n = t[r];
        te(n) === "object" && te(e[r]) === "object" ? e[r] = A(A({}, e[r]), n) : e[r] = n;
      }
  }
  return e;
}
var er = "enum", Ah = function(t, r, n, a, i) {
  t[er] = Array.isArray(t[er]) ? t[er] : [], t[er].indexOf(r) === -1 && a.push(lt(i.messages[er], t.fullField, t[er].join(", ")));
}, Mh = function(t, r, n, a, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(r) || a.push(lt(i.messages.pattern.mismatch, t.fullField, r, t.pattern));
    else if (typeof t.pattern == "string") {
      var o = new RegExp(t.pattern);
      o.test(r) || a.push(lt(i.messages.pattern.mismatch, t.fullField, r, t.pattern));
    }
  }
}, jh = function(t, r, n, a, i) {
  var o = typeof t.len == "number", s = typeof t.min == "number", l = typeof t.max == "number", c = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, u = r, d = null, v = typeof r == "number", S = typeof r == "string", g = Array.isArray(r);
  if (v ? d = "number" : S ? d = "string" : g && (d = "array"), !d)
    return !1;
  g && (u = r.length), S && (u = r.replace(c, "_").length), o ? u !== t.len && a.push(lt(i.messages[d].len, t.fullField, t.len)) : s && !l && u < t.min ? a.push(lt(i.messages[d].min, t.fullField, t.min)) : l && !s && u > t.max ? a.push(lt(i.messages[d].max, t.fullField, t.max)) : s && l && (u < t.min || u > t.max) && a.push(lt(i.messages[d].range, t.fullField, t.min, t.max));
}, vc = function(t, r, n, a, i, o) {
  t.required && (!n.hasOwnProperty(t.field) || Be(r, o || t.type)) && a.push(lt(i.messages.required, t.fullField));
}, yn;
const Ih = function() {
  if (yn)
    return yn;
  var e = "[a-fA-F\\d:]", t = function(w) {
    return w && w.includeBoundaries ? "(?:(?<=\\s|^)(?=".concat(e, ")|(?<=").concat(e, ")(?=\\s|$))") : "";
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
  ], i = "(?:%[0-9a-zA-Z]{1,})?", o = "(?:".concat(a.join("|"), ")").concat(i), s = new RegExp("(?:^".concat(r, "$)|(?:^").concat(o, "$)")), l = new RegExp("^".concat(r, "$")), c = new RegExp("^".concat(o, "$")), u = function(w) {
    return w && w.exact ? s : new RegExp("(?:".concat(t(w)).concat(r).concat(t(w), ")|(?:").concat(t(w)).concat(o).concat(t(w), ")"), "g");
  };
  u.v4 = function(E) {
    return E && E.exact ? l : new RegExp("".concat(t(E)).concat(r).concat(t(E)), "g");
  }, u.v6 = function(E) {
    return E && E.exact ? c : new RegExp("".concat(t(E)).concat(o).concat(t(E)), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", v = "(?:\\S+(?::\\S*)?@)?", S = u.v4().source, g = u.v6().source, h = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", f = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", y = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", m = "(?::\\d{2,5})?", C = '(?:[/?#][^\\s"]*)?', T = "(?:".concat(d, "|www\\.)").concat(v, "(?:localhost|").concat(S, "|").concat(g, "|").concat(h).concat(f).concat(y, ")").concat(m).concat(C);
  return yn = new RegExp("(?:^".concat(T, "$)"), "i"), yn;
};
var fs = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
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
    return te(t) === "object" && !Tr.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(fs.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(Ih());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(fs.hex);
  }
}, Dh = function(t, r, n, a, i) {
  if (t.required && r === void 0) {
    vc(t, r, n, a, i);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = t.type;
  o.indexOf(s) > -1 ? Tr[s](r) || a.push(lt(i.messages.types[s], t.fullField, t.type)) : s && te(r) !== t.type && a.push(lt(i.messages.types[s], t.fullField, t.type));
}, Nh = function(t, r, n, a, i) {
  (/^\s+$/.test(r) || r === "") && a.push(lt(i.messages.whitespace, t.fullField));
};
const ue = {
  required: vc,
  whitespace: Nh,
  type: Dh,
  range: jh,
  enum: Ah,
  pattern: Mh
};
var kh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Be(r) && !t.required)
      return n();
    ue.required(t, r, a, o, i);
  }
  n(o);
}, Vh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (r == null && !t.required)
      return n();
    ue.required(t, r, a, o, i, "array"), r != null && (ue.type(t, r, a, o, i), ue.range(t, r, a, o, i));
  }
  n(o);
}, Lh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Be(r) && !t.required)
      return n();
    ue.required(t, r, a, o, i), r !== void 0 && ue.type(t, r, a, o, i);
  }
  n(o);
}, zh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Be(r, "date") && !t.required)
      return n();
    if (ue.required(t, r, a, o, i), !Be(r, "date")) {
      var l;
      r instanceof Date ? l = r : l = new Date(r), ue.type(t, l, a, o, i), l && ue.range(t, l.getTime(), a, o, i);
    }
  }
  n(o);
}, Hh = "enum", Bh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Be(r) && !t.required)
      return n();
    ue.required(t, r, a, o, i), r !== void 0 && ue[Hh](t, r, a, o, i);
  }
  n(o);
}, Wh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Be(r) && !t.required)
      return n();
    ue.required(t, r, a, o, i), r !== void 0 && (ue.type(t, r, a, o, i), ue.range(t, r, a, o, i));
  }
  n(o);
}, qh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Be(r) && !t.required)
      return n();
    ue.required(t, r, a, o, i), r !== void 0 && (ue.type(t, r, a, o, i), ue.range(t, r, a, o, i));
  }
  n(o);
}, Yh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Be(r) && !t.required)
      return n();
    ue.required(t, r, a, o, i), r !== void 0 && ue.type(t, r, a, o, i);
  }
  n(o);
}, Uh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (r === "" && (r = void 0), Be(r) && !t.required)
      return n();
    ue.required(t, r, a, o, i), r !== void 0 && (ue.type(t, r, a, o, i), ue.range(t, r, a, o, i));
  }
  n(o);
}, Gh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Be(r) && !t.required)
      return n();
    ue.required(t, r, a, o, i), r !== void 0 && ue.type(t, r, a, o, i);
  }
  n(o);
}, Kh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Be(r, "string") && !t.required)
      return n();
    ue.required(t, r, a, o, i), Be(r, "string") || ue.pattern(t, r, a, o, i);
  }
  n(o);
}, Xh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Be(r) && !t.required)
      return n();
    ue.required(t, r, a, o, i), Be(r) || ue.type(t, r, a, o, i);
  }
  n(o);
}, Jh = function(t, r, n, a, i) {
  var o = [], s = Array.isArray(r) ? "array" : te(r);
  ue.required(t, r, a, o, i, s), n(o);
}, Qh = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Be(r, "string") && !t.required)
      return n();
    ue.required(t, r, a, o, i, "string"), Be(r, "string") || (ue.type(t, r, a, o, i), ue.range(t, r, a, o, i), ue.pattern(t, r, a, o, i), t.whitespace === !0 && ue.whitespace(t, r, a, o, i));
  }
  n(o);
}, Va = function(t, r, n, a, i) {
  var o = t.type, s = [], l = t.required || !t.required && a.hasOwnProperty(t.field);
  if (l) {
    if (Be(r, o) && !t.required)
      return n();
    ue.required(t, r, a, s, i, o), Be(r, o) || ue.type(t, r, a, s, i);
  }
  n(s);
};
const Mr = {
  string: Qh,
  method: Yh,
  number: Uh,
  boolean: Lh,
  regexp: Xh,
  integer: qh,
  float: Wh,
  array: Vh,
  object: Gh,
  enum: Bh,
  pattern: Kh,
  date: zh,
  url: Va,
  hex: Va,
  email: Va,
  required: Jh,
  any: kh
};
var ln = /* @__PURE__ */ function() {
  function e(t) {
    Ye(this, e), _(this, "rules", null), _(this, "_messages", $i), this.define(t);
  }
  return Ue(e, [{
    key: "define",
    value: function(r) {
      var n = this;
      if (!r)
        throw new Error("Cannot configure a schema with no rules");
      if (te(r) !== "object" || Array.isArray(r))
        throw new Error("Rules must be an object");
      this.rules = {}, Object.keys(r).forEach(function(a) {
        var i = r[a];
        n.rules[a] = Array.isArray(i) ? i : [i];
      });
    }
  }, {
    key: "messages",
    value: function(r) {
      return r && (this._messages = ds(_i(), r)), this._messages;
    }
  }, {
    key: "validate",
    value: function(r) {
      var n = this, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
      }, o = r, s = a, l = i;
      if (typeof s == "function" && (l = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
        return l && l(null, o), Promise.resolve(o);
      function c(g) {
        var h = [], f = {};
        function y(C) {
          if (Array.isArray(C)) {
            var T;
            h = (T = h).concat.apply(T, ee(C));
          } else
            h.push(C);
        }
        for (var m = 0; m < g.length; m++)
          y(g[m]);
        h.length ? (f = Pi(h), l(h, f)) : l(null, o);
      }
      if (s.messages) {
        var u = this.messages();
        u === $i && (u = _i()), ds(u, s.messages), s.messages = u;
      } else
        s.messages = this.messages();
      var d = {}, v = s.keys || Object.keys(this.rules);
      v.forEach(function(g) {
        var h = n.rules[g], f = o[g];
        h.forEach(function(y) {
          var m = y;
          typeof m.transform == "function" && (o === r && (o = A({}, o)), f = o[g] = m.transform(f), f != null && (m.type = m.type || (Array.isArray(f) ? "array" : te(f)))), typeof m == "function" ? m = {
            validator: m
          } : m = A({}, m), m.validator = n.getValidationMethod(m), m.validator && (m.field = g, m.fullField = m.fullField || g, m.type = n.getType(m), d[g] = d[g] || [], d[g].push({
            rule: m,
            value: f,
            source: o,
            field: g
          }));
        });
      });
      var S = {};
      return Th(d, s, function(g, h) {
        var f = g.rule, y = (f.type === "object" || f.type === "array") && (te(f.fields) === "object" || te(f.defaultField) === "object");
        y = y && (f.required || !f.required && g.value), f.field = g.field;
        function m(x, R) {
          return A(A({}, R), {}, {
            fullField: "".concat(f.fullField, ".").concat(x),
            fullFields: f.fullFields ? [].concat(ee(f.fullFields), [x]) : [x]
          });
        }
        function C() {
          var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], R = Array.isArray(x) ? x : [x];
          !s.suppressWarning && R.length && e.warning("async-validator:", R), R.length && f.message !== void 0 && (R = [].concat(f.message));
          var F = R.map(us(f, o));
          if (s.first && F.length)
            return S[f.field] = 1, h(F);
          if (!y)
            h(F);
          else {
            if (f.required && !g.value)
              return f.message !== void 0 ? F = [].concat(f.message).map(us(f, o)) : s.error && (F = [s.error(f, lt(s.messages.required, f.field))]), h(F);
            var M = {};
            f.defaultField && Object.keys(g.value).map(function(j) {
              M[j] = f.defaultField;
            }), M = A(A({}, M), g.rule.fields);
            var N = {};
            Object.keys(M).forEach(function(j) {
              var D = M[j], H = Array.isArray(D) ? D : [D];
              N[j] = H.map(m.bind(null, j));
            });
            var z = new e(N);
            z.messages(s.messages), g.rule.options && (g.rule.options.messages = s.messages, g.rule.options.error = s.error), z.validate(g.value, g.rule.options || s, function(j) {
              var D = [];
              F && F.length && D.push.apply(D, ee(F)), j && j.length && D.push.apply(D, ee(j)), h(D.length ? D : null);
            });
          }
        }
        var T;
        if (f.asyncValidator)
          T = f.asyncValidator(f, g.value, C, g.source, s);
        else if (f.validator) {
          try {
            T = f.validator(f, g.value, C, g.source, s);
          } catch (x) {
            var E, w;
            (E = (w = console).error) === null || E === void 0 || E.call(w, x), s.suppressValidatorError || setTimeout(function() {
              throw x;
            }, 0), C(x.message);
          }
          T === !0 ? C() : T === !1 ? C(typeof f.message == "function" ? f.message(f.fullField || f.field) : f.message || "".concat(f.fullField || f.field, " fails")) : T instanceof Array ? C(T) : T instanceof Error && C(T.message);
        }
        T && T.then && T.then(function() {
          return C();
        }, function(x) {
          return C(x);
        });
      }, function(g) {
        c(g);
      }, o);
    }
  }, {
    key: "getType",
    value: function(r) {
      if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !Mr.hasOwnProperty(r.type))
        throw new Error(lt("Unknown rule type %s", r.type));
      return r.type || "string";
    }
  }, {
    key: "getValidationMethod",
    value: function(r) {
      if (typeof r.validator == "function")
        return r.validator;
      var n = Object.keys(r), a = n.indexOf("message");
      return a !== -1 && n.splice(a, 1), n.length === 1 && n[0] === "required" ? Mr.required : Mr[this.getType(r)] || void 0;
    }
  }]), e;
}();
_(ln, "register", function(t, r) {
  if (typeof r != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  Mr[t] = r;
});
_(ln, "warning", fc);
_(ln, "messages", $i);
_(ln, "validators", Mr);
var ot = "'${name}' is not a valid ${type}", pc = {
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
}, vs = ln;
function Zh(e, t) {
  return e.replace(/\\?\$\{\w+\}/g, function(r) {
    if (r.startsWith("\\"))
      return r.slice(1);
    var n = r.slice(2, -1);
    return t[n];
  });
}
var ps = "CODE_LOGIC_ERROR";
function Oi(e, t, r, n, a) {
  return Ti.apply(this, arguments);
}
function Ti() {
  return Ti = sn(/* @__PURE__ */ xt().mark(function e(t, r, n, a, i) {
    var o, s, l, c, u, d, v, S, g;
    return xt().wrap(function(f) {
      for (; ; ) switch (f.prev = f.next) {
        case 0:
          return o = A({}, n), delete o.ruleIndex, vs.warning = function() {
          }, o.validator && (s = o.validator, o.validator = function() {
            try {
              return s.apply(void 0, arguments);
            } catch (y) {
              return console.error(y), Promise.reject(ps);
            }
          }), l = null, o && o.type === "array" && o.defaultField && (l = o.defaultField, delete o.defaultField), c = new vs(_({}, t, [o])), u = rr(pc, a.validateMessages), c.messages(u), d = [], f.prev = 10, f.next = 13, Promise.resolve(c.validate(_({}, t, r), A({}, a)));
        case 13:
          f.next = 18;
          break;
        case 15:
          f.prev = 15, f.t0 = f.catch(10), f.t0.errors && (d = f.t0.errors.map(function(y, m) {
            var C = y.message, T = C === ps ? u.default : C;
            return /* @__PURE__ */ b.isValidElement(T) ? (
              // Wrap ReactNode with `key`
              /* @__PURE__ */ b.cloneElement(T, {
                key: "error_".concat(m)
              })
            ) : T;
          }));
        case 18:
          if (!(!d.length && l)) {
            f.next = 23;
            break;
          }
          return f.next = 21, Promise.all(r.map(function(y, m) {
            return Oi("".concat(t, ".").concat(m), y, l, a, i);
          }));
        case 21:
          return v = f.sent, f.abrupt("return", v.reduce(function(y, m) {
            return [].concat(ee(y), ee(m));
          }, []));
        case 23:
          return S = A(A({}, n), {}, {
            name: t,
            enum: (n.enum || []).join(", ")
          }, i), g = d.map(function(y) {
            return typeof y == "string" ? Zh(y, S) : y;
          }), f.abrupt("return", g);
        case 26:
        case "end":
          return f.stop();
      }
    }, e, null, [[10, 15]]);
  })), Ti.apply(this, arguments);
}
function em(e, t, r, n, a, i) {
  var o = e.join("."), s = r.map(function(u, d) {
    var v = u.validator, S = A(A({}, u), {}, {
      ruleIndex: d
    });
    return v && (S.validator = function(g, h, f) {
      var y = !1, m = function() {
        for (var E = arguments.length, w = new Array(E), x = 0; x < E; x++)
          w[x] = arguments[x];
        Promise.resolve().then(function() {
          Fe(!y, "Your validator function has already return a promise. `callback` will be ignored."), y || f.apply(void 0, w);
        });
      }, C = v(g, h, m);
      y = C && typeof C.then == "function" && typeof C.catch == "function", Fe(y, "`callback` is deprecated. Please return a promise instead."), y && C.then(function() {
        f();
      }).catch(function(T) {
        f(T || " ");
      });
    }), S;
  }).sort(function(u, d) {
    var v = u.warningOnly, S = u.ruleIndex, g = d.warningOnly, h = d.ruleIndex;
    return !!v == !!g ? S - h : v ? 1 : -1;
  }), l;
  if (a === !0)
    l = new Promise(/* @__PURE__ */ function() {
      var u = sn(/* @__PURE__ */ xt().mark(function d(v, S) {
        var g, h, f;
        return xt().wrap(function(m) {
          for (; ; ) switch (m.prev = m.next) {
            case 0:
              g = 0;
            case 1:
              if (!(g < s.length)) {
                m.next = 12;
                break;
              }
              return h = s[g], m.next = 5, Oi(o, t, h, n, i);
            case 5:
              if (f = m.sent, !f.length) {
                m.next = 9;
                break;
              }
              return S([{
                errors: f,
                rule: h
              }]), m.abrupt("return");
            case 9:
              g += 1, m.next = 1;
              break;
            case 12:
              v([]);
            case 13:
            case "end":
              return m.stop();
          }
        }, d);
      }));
      return function(d, v) {
        return u.apply(this, arguments);
      };
    }());
  else {
    var c = s.map(function(u) {
      return Oi(o, t, u, n, i).then(function(d) {
        return {
          errors: d,
          rule: u
        };
      });
    });
    l = (a ? rm(c) : tm(c)).then(function(u) {
      return Promise.reject(u);
    });
  }
  return l.catch(function(u) {
    return u;
  }), l;
}
function tm(e) {
  return Ri.apply(this, arguments);
}
function Ri() {
  return Ri = sn(/* @__PURE__ */ xt().mark(function e(t) {
    return xt().wrap(function(n) {
      for (; ; ) switch (n.prev = n.next) {
        case 0:
          return n.abrupt("return", Promise.all(t).then(function(a) {
            var i, o = (i = []).concat.apply(i, ee(a));
            return o;
          }));
        case 1:
        case "end":
          return n.stop();
      }
    }, e);
  })), Ri.apply(this, arguments);
}
function rm(e) {
  return Fi.apply(this, arguments);
}
function Fi() {
  return Fi = sn(/* @__PURE__ */ xt().mark(function e(t) {
    var r;
    return xt().wrap(function(a) {
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
  })), Fi.apply(this, arguments);
}
function Ne(e) {
  return Ci(e);
}
function hs(e, t) {
  var r = {};
  return t.forEach(function(n) {
    var a = _t(e, n);
    r = mt(r, n, a);
  }), r;
}
function sr(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return e && e.some(function(n) {
    return hc(t, n, r);
  });
}
function hc(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return !e || !t || !r && e.length !== t.length ? !1 : t.every(function(n, a) {
    return e[a] === n;
  });
}
function nm(e, t) {
  if (e === t)
    return !0;
  if (!e && t || e && !t || !e || !t || te(e) !== "object" || te(t) !== "object")
    return !1;
  var r = Object.keys(e), n = Object.keys(t), a = new Set([].concat(r, n));
  return ee(a).every(function(i) {
    var o = e[i], s = t[i];
    return typeof o == "function" && typeof s == "function" ? !0 : o === s;
  });
}
function am(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && te(t.target) === "object" && e in t.target ? t.target[e] : t;
}
function ms(e, t, r) {
  var n = e.length;
  if (t < 0 || t >= n || r < 0 || r >= n)
    return e;
  var a = e[t], i = t - r;
  return i > 0 ? [].concat(ee(e.slice(0, r)), [a], ee(e.slice(r, t)), ee(e.slice(t + 1, n))) : i < 0 ? [].concat(ee(e.slice(0, t)), ee(e.slice(t + 1, r + 1)), [a], ee(e.slice(r + 1, n))) : e;
}
var im = ["name"], vt = [];
function La(e, t, r, n, a, i) {
  return typeof e == "function" ? e(t, r, "source" in i ? {
    source: i.source
  } : {}) : n !== a;
}
var lo = /* @__PURE__ */ function(e) {
  Ut(r, e);
  var t = Gt(r);
  function r(n) {
    var a;
    if (Ye(this, r), a = t.call(this, n), _(oe(a), "state", {
      resetCount: 0
    }), _(oe(a), "cancelRegisterFunc", null), _(oe(a), "mounted", !1), _(oe(a), "touched", !1), _(oe(a), "dirty", !1), _(oe(a), "validatePromise", void 0), _(oe(a), "prevValidating", void 0), _(oe(a), "errors", vt), _(oe(a), "warnings", vt), _(oe(a), "cancelRegister", function() {
      var l = a.props, c = l.preserve, u = l.isListField, d = l.name;
      a.cancelRegisterFunc && a.cancelRegisterFunc(u, c, Ne(d)), a.cancelRegisterFunc = null;
    }), _(oe(a), "getNamePath", function() {
      var l = a.props, c = l.name, u = l.fieldContext, d = u.prefixName, v = d === void 0 ? [] : d;
      return c !== void 0 ? [].concat(ee(v), ee(c)) : [];
    }), _(oe(a), "getRules", function() {
      var l = a.props, c = l.rules, u = c === void 0 ? [] : c, d = l.fieldContext;
      return u.map(function(v) {
        return typeof v == "function" ? v(d) : v;
      });
    }), _(oe(a), "refresh", function() {
      a.mounted && a.setState(function(l) {
        var c = l.resetCount;
        return {
          resetCount: c + 1
        };
      });
    }), _(oe(a), "metaCache", null), _(oe(a), "triggerMetaEvent", function(l) {
      var c = a.props.onMetaChange;
      if (c) {
        var u = A(A({}, a.getMeta()), {}, {
          destroy: l
        });
        vi(a.metaCache, u) || c(u), a.metaCache = u;
      } else
        a.metaCache = null;
    }), _(oe(a), "onStoreChange", function(l, c, u) {
      var d = a.props, v = d.shouldUpdate, S = d.dependencies, g = S === void 0 ? [] : S, h = d.onReset, f = u.store, y = a.getNamePath(), m = a.getValue(l), C = a.getValue(f), T = c && sr(c, y);
      switch (u.type === "valueUpdate" && u.source === "external" && !vi(m, C) && (a.touched = !0, a.dirty = !0, a.validatePromise = null, a.errors = vt, a.warnings = vt, a.triggerMetaEvent()), u.type) {
        case "reset":
          if (!c || T) {
            a.touched = !1, a.dirty = !1, a.validatePromise = void 0, a.errors = vt, a.warnings = vt, a.triggerMetaEvent(), h == null || h(), a.refresh();
            return;
          }
          break;
        case "remove": {
          if (v && La(v, l, f, m, C, u)) {
            a.reRender();
            return;
          }
          break;
        }
        case "setField": {
          var E = u.data;
          if (T) {
            "touched" in E && (a.touched = E.touched), "validating" in E && !("originRCField" in E) && (a.validatePromise = E.validating ? Promise.resolve([]) : null), "errors" in E && (a.errors = E.errors || vt), "warnings" in E && (a.warnings = E.warnings || vt), a.dirty = !0, a.triggerMetaEvent(), a.reRender();
            return;
          } else if ("value" in E && sr(c, y, !0)) {
            a.reRender();
            return;
          }
          if (v && !y.length && La(v, l, f, m, C, u)) {
            a.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var w = g.map(Ne);
          if (w.some(function(x) {
            return sr(u.relatedFields, x);
          })) {
            a.reRender();
            return;
          }
          break;
        }
        default:
          if (T || (!g.length || y.length || v) && La(v, l, f, m, C, u)) {
            a.reRender();
            return;
          }
          break;
      }
      v === !0 && a.reRender();
    }), _(oe(a), "validateRules", function(l) {
      var c = a.getNamePath(), u = a.getValue(), d = l || {}, v = d.triggerName, S = d.validateOnly, g = S === void 0 ? !1 : S, h = Promise.resolve().then(/* @__PURE__ */ sn(/* @__PURE__ */ xt().mark(function f() {
        var y, m, C, T, E, w, x;
        return xt().wrap(function(F) {
          for (; ; ) switch (F.prev = F.next) {
            case 0:
              if (a.mounted) {
                F.next = 2;
                break;
              }
              return F.abrupt("return", []);
            case 2:
              if (y = a.props, m = y.validateFirst, C = m === void 0 ? !1 : m, T = y.messageVariables, E = y.validateDebounce, w = a.getRules(), v && (w = w.filter(function(M) {
                return M;
              }).filter(function(M) {
                var N = M.validateTrigger;
                if (!N)
                  return !0;
                var z = Ci(N);
                return z.includes(v);
              })), !(E && v)) {
                F.next = 10;
                break;
              }
              return F.next = 8, new Promise(function(M) {
                setTimeout(M, E);
              });
            case 8:
              if (a.validatePromise === h) {
                F.next = 10;
                break;
              }
              return F.abrupt("return", []);
            case 10:
              return x = em(c, u, w, l, C, T), x.catch(function(M) {
                return M;
              }).then(function() {
                var M = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vt;
                if (a.validatePromise === h) {
                  var N;
                  a.validatePromise = null;
                  var z = [], j = [];
                  (N = M.forEach) === null || N === void 0 || N.call(M, function(D) {
                    var H = D.rule.warningOnly, P = D.errors, $ = P === void 0 ? vt : P;
                    H ? j.push.apply(j, ee($)) : z.push.apply(z, ee($));
                  }), a.errors = z, a.warnings = j, a.triggerMetaEvent(), a.reRender();
                }
              }), F.abrupt("return", x);
            case 13:
            case "end":
              return F.stop();
          }
        }, f);
      })));
      return g || (a.validatePromise = h, a.dirty = !0, a.errors = vt, a.warnings = vt, a.triggerMetaEvent(), a.reRender()), h;
    }), _(oe(a), "isFieldValidating", function() {
      return !!a.validatePromise;
    }), _(oe(a), "isFieldTouched", function() {
      return a.touched;
    }), _(oe(a), "isFieldDirty", function() {
      if (a.dirty || a.props.initialValue !== void 0)
        return !0;
      var l = a.props.fieldContext, c = l.getInternalHooks(Ht), u = c.getInitialValue;
      return u(a.getNamePath()) !== void 0;
    }), _(oe(a), "getErrors", function() {
      return a.errors;
    }), _(oe(a), "getWarnings", function() {
      return a.warnings;
    }), _(oe(a), "isListField", function() {
      return a.props.isListField;
    }), _(oe(a), "isList", function() {
      return a.props.isList;
    }), _(oe(a), "isPreserve", function() {
      return a.props.preserve;
    }), _(oe(a), "getMeta", function() {
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
    }), _(oe(a), "getOnlyChild", function(l) {
      if (typeof l == "function") {
        var c = a.getMeta();
        return A(A({}, a.getOnlyChild(l(a.getControlled(), c, a.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var u = Mn(l);
      return u.length !== 1 || !/* @__PURE__ */ b.isValidElement(u[0]) ? {
        child: u,
        isFunction: !1
      } : {
        child: u[0],
        isFunction: !1
      };
    }), _(oe(a), "getValue", function(l) {
      var c = a.props.fieldContext.getFieldsValue, u = a.getNamePath();
      return _t(l || c(!0), u);
    }), _(oe(a), "getControlled", function() {
      var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, c = a.props, u = c.name, d = c.trigger, v = c.validateTrigger, S = c.getValueFromEvent, g = c.normalize, h = c.valuePropName, f = c.getValueProps, y = c.fieldContext, m = v !== void 0 ? v : y.validateTrigger, C = a.getNamePath(), T = y.getInternalHooks, E = y.getFieldsValue, w = T(Ht), x = w.dispatch, R = a.getValue(), F = f || function(D) {
        return _({}, h, D);
      }, M = l[d], N = u !== void 0 ? F(R) : {};
      process.env.NODE_ENV !== "production" && N && Object.keys(N).forEach(function(D) {
        Fe(typeof N[D] != "function", "It's not recommended to generate dynamic function prop by `getValueProps`. Please pass it to child component directly (prop: ".concat(D, ")"));
      });
      var z = A(A({}, l), N);
      z[d] = function() {
        a.touched = !0, a.dirty = !0, a.triggerMetaEvent();
        for (var D, H = arguments.length, P = new Array(H), $ = 0; $ < H; $++)
          P[$] = arguments[$];
        S ? D = S.apply(void 0, P) : D = am.apply(void 0, [h].concat(P)), g && (D = g(D, R, E(!0))), D !== R && x({
          type: "updateValue",
          namePath: C,
          value: D
        }), M && M.apply(void 0, P);
      };
      var j = Ci(m || []);
      return j.forEach(function(D) {
        var H = z[D];
        z[D] = function() {
          H && H.apply(void 0, arguments);
          var P = a.props.rules;
          P && P.length && x({
            type: "validateField",
            namePath: C,
            triggerName: D
          });
        };
      }), z;
    }), n.fieldContext) {
      var i = n.fieldContext.getInternalHooks, o = i(Ht), s = o.initEntityValue;
      s(oe(a));
    }
    return a;
  }
  return Ue(r, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props, i = a.shouldUpdate, o = a.fieldContext;
      if (this.mounted = !0, o) {
        var s = o.getInternalHooks, l = s(Ht), c = l.registerField;
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
      return l ? c = s : /* @__PURE__ */ b.isValidElement(s) ? c = /* @__PURE__ */ b.cloneElement(s, this.getControlled(s.props)) : (Fe(!s, "`children` of Field is not validate ReactElement."), c = s), /* @__PURE__ */ b.createElement(b.Fragment, {
        key: a
      }, c);
    }
  }]), r;
}(b.Component);
_(lo, "contextType", pr);
_(lo, "defaultProps", {
  trigger: "onChange",
  valuePropName: "value"
});
function mc(e) {
  var t, r = e.name, n = pt(e, im), a = b.useContext(pr), i = b.useContext(kn), o = r !== void 0 ? Ne(r) : void 0, s = (t = n.isListField) !== null && t !== void 0 ? t : !!i, l = "keep";
  return s || (l = "_".concat((o || []).join("_"))), process.env.NODE_ENV !== "production" && n.preserve === !1 && s && o.length <= 1 && Fe(!1, "`preserve` should not apply on Form.List fields."), /* @__PURE__ */ b.createElement(lo, Ke({
    key: l,
    name: o,
    isListField: s
  }, n, {
    fieldContext: a
  }));
}
function om(e) {
  var t = e.name, r = e.initialValue, n = e.children, a = e.rules, i = e.validateTrigger, o = e.isListField, s = b.useContext(pr), l = b.useContext(kn), c = b.useRef({
    keys: [],
    id: 0
  }), u = c.current, d = b.useMemo(function() {
    var h = Ne(s.prefixName) || [];
    return [].concat(ee(h), ee(Ne(t)));
  }, [s.prefixName, t]), v = b.useMemo(function() {
    return A(A({}, s), {}, {
      prefixName: d
    });
  }, [s, d]), S = b.useMemo(function() {
    return {
      getKey: function(f) {
        var y = d.length, m = f[y];
        return [u.keys[m], f.slice(y + 1)];
      }
    };
  }, [d]);
  if (typeof n != "function")
    return Fe(!1, "Form.List only accepts function as children."), null;
  var g = function(f, y, m) {
    var C = m.source;
    return C === "internal" ? !1 : f !== y;
  };
  return /* @__PURE__ */ b.createElement(kn.Provider, {
    value: S
  }, /* @__PURE__ */ b.createElement(pr.Provider, {
    value: v
  }, /* @__PURE__ */ b.createElement(mc, {
    name: [],
    shouldUpdate: g,
    rules: a,
    validateTrigger: i,
    initialValue: r,
    isList: !0,
    isListField: o ?? !!l
  }, function(h, f) {
    var y = h.value, m = y === void 0 ? [] : y, C = h.onChange, T = s.getFieldValue, E = function() {
      var F = T(d || []);
      return F || [];
    }, w = {
      add: function(F, M) {
        var N = E();
        M >= 0 && M <= N.length ? (u.keys = [].concat(ee(u.keys.slice(0, M)), [u.id], ee(u.keys.slice(M))), C([].concat(ee(N.slice(0, M)), [F], ee(N.slice(M))))) : (process.env.NODE_ENV !== "production" && (M < 0 || M > N.length) && Fe(!1, "The second parameter of the add function should be a valid positive number."), u.keys = [].concat(ee(u.keys), [u.id]), C([].concat(ee(N), [F]))), u.id += 1;
      },
      remove: function(F) {
        var M = E(), N = new Set(Array.isArray(F) ? F : [F]);
        N.size <= 0 || (u.keys = u.keys.filter(function(z, j) {
          return !N.has(j);
        }), C(M.filter(function(z, j) {
          return !N.has(j);
        })));
      },
      move: function(F, M) {
        if (F !== M) {
          var N = E();
          F < 0 || F >= N.length || M < 0 || M >= N.length || (u.keys = ms(u.keys, F, M), C(ms(N, F, M)));
        }
      }
    }, x = m || [];
    return Array.isArray(x) || (x = [], process.env.NODE_ENV !== "production" && Fe(!1, "Current value of '".concat(d.join(" > "), "' is not an array type."))), n(x.map(function(R, F) {
      var M = u.keys[F];
      return M === void 0 && (u.keys[F] = u.id, M = u.keys[F], u.id += 1), {
        name: F,
        key: M,
        isListField: !0
      };
    }), w, f);
  })));
}
function sm(e) {
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
var gc = "__@field_split__";
function za(e) {
  return e.map(function(t) {
    return "".concat(te(t), ":").concat(t);
  }).join(gc);
}
var tr = /* @__PURE__ */ function() {
  function e() {
    Ye(this, e), _(this, "kvs", /* @__PURE__ */ new Map());
  }
  return Ue(e, [{
    key: "set",
    value: function(r, n) {
      this.kvs.set(za(r), n);
    }
  }, {
    key: "get",
    value: function(r) {
      return this.kvs.get(za(r));
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
      this.kvs.delete(za(r));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(r) {
      return ee(this.kvs.entries()).map(function(n) {
        var a = G(n, 2), i = a[0], o = a[1], s = i.split(gc);
        return r({
          key: s.map(function(l) {
            var c = l.match(/^([^:]*):(.*)$/), u = G(c, 3), d = u[1], v = u[2];
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
}(), lm = ["name"], cm = /* @__PURE__ */ Ue(function e(t) {
  var r = this;
  Ye(this, e), _(this, "formHooked", !1), _(this, "forceRootUpdate", void 0), _(this, "subscribable", !0), _(this, "store", {}), _(this, "fieldEntities", []), _(this, "initialValues", {}), _(this, "callbacks", {}), _(this, "validateMessages", null), _(this, "preserve", null), _(this, "lastValidatePromise", null), _(this, "getForm", function() {
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
  }), _(this, "getInternalHooks", function(n) {
    return n === Ht ? (r.formHooked = !0, {
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
    }) : (Fe(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }), _(this, "useSubscribe", function(n) {
    r.subscribable = n;
  }), _(this, "prevWithoutPreserves", null), _(this, "setInitialValues", function(n, a) {
    if (r.initialValues = n || {}, a) {
      var i, o = rr(n, r.store);
      (i = r.prevWithoutPreserves) === null || i === void 0 || i.map(function(s) {
        var l = s.key;
        o = mt(o, l, _t(n, l));
      }), r.prevWithoutPreserves = null, r.updateStore(o);
    }
  }), _(this, "destroyForm", function(n) {
    if (n)
      r.updateStore({});
    else {
      var a = new tr();
      r.getFieldEntities(!0).forEach(function(i) {
        r.isMergedPreserve(i.isPreserve()) || a.set(i.getNamePath(), !0);
      }), r.prevWithoutPreserves = a;
    }
  }), _(this, "getInitialValue", function(n) {
    var a = _t(r.initialValues, n);
    return n.length ? rr(a) : a;
  }), _(this, "setCallbacks", function(n) {
    r.callbacks = n;
  }), _(this, "setValidateMessages", function(n) {
    r.validateMessages = n;
  }), _(this, "setPreserve", function(n) {
    r.preserve = n;
  }), _(this, "watchList", []), _(this, "registerWatch", function(n) {
    return r.watchList.push(n), function() {
      r.watchList = r.watchList.filter(function(a) {
        return a !== n;
      });
    };
  }), _(this, "notifyWatch", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (r.watchList.length) {
      var a = r.getFieldsValue(), i = r.getFieldsValue(!0);
      r.watchList.forEach(function(o) {
        o(a, i, n);
      });
    }
  }), _(this, "timeoutId", null), _(this, "warningUnhooked", function() {
    process.env.NODE_ENV !== "production" && !r.timeoutId && typeof window < "u" && (r.timeoutId = setTimeout(function() {
      r.timeoutId = null, r.formHooked || Fe(!1, "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?");
    }));
  }), _(this, "updateStore", function(n) {
    r.store = n;
  }), _(this, "getFieldEntities", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    return n ? r.fieldEntities.filter(function(a) {
      return a.getNamePath().length;
    }) : r.fieldEntities;
  }), _(this, "getFieldsMap", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, a = new tr();
    return r.getFieldEntities(n).forEach(function(i) {
      var o = i.getNamePath();
      a.set(o, i);
    }), a;
  }), _(this, "getFieldEntitiesForNamePathList", function(n) {
    if (!n)
      return r.getFieldEntities(!0);
    var a = r.getFieldsMap(!0);
    return n.map(function(i) {
      var o = Ne(i);
      return a.get(o) || {
        INVALIDATE_NAME_PATH: Ne(i)
      };
    });
  }), _(this, "getFieldsValue", function(n, a) {
    r.warningUnhooked();
    var i, o, s;
    if (n === !0 || Array.isArray(n) ? (i = n, o = a) : n && te(n) === "object" && (s = n.strict, o = n.filter), i === !0 && !o)
      return r.store;
    var l = r.getFieldEntitiesForNamePathList(Array.isArray(i) ? i : null), c = [];
    return l.forEach(function(u) {
      var d, v, S = "INVALIDATE_NAME_PATH" in u ? u.INVALIDATE_NAME_PATH : u.getNamePath();
      if (s) {
        var g, h;
        if ((g = (h = u).isList) !== null && g !== void 0 && g.call(h))
          return;
      } else if (!i && (d = (v = u).isListField) !== null && d !== void 0 && d.call(v))
        return;
      if (!o)
        c.push(S);
      else {
        var f = "getMeta" in u ? u.getMeta() : null;
        o(f) && c.push(S);
      }
    }), hs(r.store, c.map(Ne));
  }), _(this, "getFieldValue", function(n) {
    r.warningUnhooked();
    var a = Ne(n);
    return _t(r.store, a);
  }), _(this, "getFieldsError", function(n) {
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
  }), _(this, "getFieldError", function(n) {
    r.warningUnhooked();
    var a = Ne(n), i = r.getFieldsError([a])[0];
    return i.errors;
  }), _(this, "getFieldWarning", function(n) {
    r.warningUnhooked();
    var a = Ne(n), i = r.getFieldsError([a])[0];
    return i.warnings;
  }), _(this, "isFieldsTouched", function() {
    r.warningUnhooked();
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a[0], s = a[1], l, c = !1;
    a.length === 0 ? l = null : a.length === 1 ? Array.isArray(o) ? (l = o.map(Ne), c = !1) : (l = null, c = o) : (l = o.map(Ne), c = s);
    var u = r.getFieldEntities(!0), d = function(f) {
      return f.isFieldTouched();
    };
    if (!l)
      return c ? u.every(function(h) {
        return d(h) || h.isList();
      }) : u.some(d);
    var v = new tr();
    l.forEach(function(h) {
      v.set(h, []);
    }), u.forEach(function(h) {
      var f = h.getNamePath();
      l.forEach(function(y) {
        y.every(function(m, C) {
          return f[C] === m;
        }) && v.update(y, function(m) {
          return [].concat(ee(m), [h]);
        });
      });
    });
    var S = function(f) {
      return f.some(d);
    }, g = v.map(function(h) {
      var f = h.value;
      return f;
    });
    return c ? g.every(S) : g.some(S);
  }), _(this, "isFieldTouched", function(n) {
    return r.warningUnhooked(), r.isFieldsTouched([n]);
  }), _(this, "isFieldsValidating", function(n) {
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
  }), _(this, "isFieldValidating", function(n) {
    return r.warningUnhooked(), r.isFieldsValidating([n]);
  }), _(this, "resetWithFieldInitialValue", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = new tr(), i = r.getFieldEntities(!0);
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
          var v = u.getNamePath(), S = r.getInitialValue(v);
          if (S !== void 0)
            Fe(!1, "Form already set 'initialValues' with path '".concat(v.join("."), "'. Field can not overwrite it."));
          else {
            var g = a.get(v);
            if (g && g.size > 1)
              Fe(!1, "Multiple Field with path '".concat(v.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (g) {
              var h = r.getFieldValue(v), f = u.isListField();
              !f && (!n.skipExist || h === void 0) && r.updateStore(mt(r.store, v, ee(g)[0].value));
            }
          }
        }
      });
    }, s;
    n.entities ? s = n.entities : n.namePathList ? (s = [], n.namePathList.forEach(function(l) {
      var c = a.get(l);
      if (c) {
        var u;
        (u = s).push.apply(u, ee(ee(c).map(function(d) {
          return d.entity;
        })));
      }
    })) : s = i, o(s);
  }), _(this, "resetFields", function(n) {
    r.warningUnhooked();
    var a = r.store;
    if (!n) {
      r.updateStore(rr(r.initialValues)), r.resetWithFieldInitialValue(), r.notifyObservers(a, null, {
        type: "reset"
      }), r.notifyWatch();
      return;
    }
    var i = n.map(Ne);
    i.forEach(function(o) {
      var s = r.getInitialValue(o);
      r.updateStore(mt(r.store, o, s));
    }), r.resetWithFieldInitialValue({
      namePathList: i
    }), r.notifyObservers(a, i, {
      type: "reset"
    }), r.notifyWatch(i);
  }), _(this, "setFields", function(n) {
    r.warningUnhooked();
    var a = r.store, i = [];
    n.forEach(function(o) {
      var s = o.name, l = pt(o, lm), c = Ne(s);
      i.push(c), "value" in l && r.updateStore(mt(r.store, c, l.value)), r.notifyObservers(a, [c], {
        type: "setField",
        data: o
      });
    }), r.notifyWatch(i);
  }), _(this, "getFields", function() {
    var n = r.getFieldEntities(!0), a = n.map(function(i) {
      var o = i.getNamePath(), s = i.getMeta(), l = A(A({}, s), {}, {
        name: o,
        value: r.getFieldValue(o)
      });
      return Object.defineProperty(l, "originRCField", {
        value: !0
      }), l;
    });
    return a;
  }), _(this, "initEntityValue", function(n) {
    var a = n.props.initialValue;
    if (a !== void 0) {
      var i = n.getNamePath(), o = _t(r.store, i);
      o === void 0 && r.updateStore(mt(r.store, i, a));
    }
  }), _(this, "isMergedPreserve", function(n) {
    var a = n !== void 0 ? n : r.preserve;
    return a ?? !0;
  }), _(this, "registerField", function(n) {
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
            !hc(d.getNamePath(), a)
          );
        })) {
          var u = r.store;
          r.updateStore(mt(u, a, c, !0)), r.notifyObservers(u, [a], {
            type: "remove"
          }), r.triggerDependenciesUpdate(u, a);
        }
      }
      r.notifyWatch([a]);
    };
  }), _(this, "dispatch", function(n) {
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
  }), _(this, "notifyObservers", function(n, a, i) {
    if (r.subscribable) {
      var o = A(A({}, i), {}, {
        store: r.getFieldsValue(!0)
      });
      r.getFieldEntities().forEach(function(s) {
        var l = s.onStoreChange;
        l(n, a, o);
      });
    } else
      r.forceRootUpdate();
  }), _(this, "triggerDependenciesUpdate", function(n, a) {
    var i = r.getDependencyChildrenFields(a);
    return i.length && r.validateFields(i), r.notifyObservers(n, i, {
      type: "dependenciesUpdate",
      relatedFields: [a].concat(ee(i))
    }), i;
  }), _(this, "updateValue", function(n, a) {
    var i = Ne(n), o = r.store;
    r.updateStore(mt(r.store, i, a)), r.notifyObservers(o, [i], {
      type: "valueUpdate",
      source: "internal"
    }), r.notifyWatch([i]);
    var s = r.triggerDependenciesUpdate(o, i), l = r.callbacks.onValuesChange;
    if (l) {
      var c = hs(r.store, [i]);
      l(c, r.getFieldsValue());
    }
    r.triggerOnFieldsChange([i].concat(ee(s)));
  }), _(this, "setFieldsValue", function(n) {
    r.warningUnhooked();
    var a = r.store;
    if (n) {
      var i = rr(r.store, n);
      r.updateStore(i);
    }
    r.notifyObservers(a, null, {
      type: "valueUpdate",
      source: "external"
    }), r.notifyWatch();
  }), _(this, "setFieldValue", function(n, a) {
    r.setFields([{
      name: n,
      value: a,
      errors: [],
      warnings: []
    }]);
  }), _(this, "getDependencyChildrenFields", function(n) {
    var a = /* @__PURE__ */ new Set(), i = [], o = new tr();
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
  }), _(this, "triggerOnFieldsChange", function(n, a) {
    var i = r.callbacks.onFieldsChange;
    if (i) {
      var o = r.getFields();
      if (a) {
        var s = new tr();
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
  }), _(this, "validateFields", function(n, a) {
    r.warningUnhooked();
    var i, o;
    Array.isArray(n) || typeof n == "string" || typeof a == "string" ? (i = n, o = a) : o = n;
    var s = !!i, l = s ? i.map(Ne) : [], c = [], u = String(Date.now()), d = /* @__PURE__ */ new Set(), v = o || {}, S = v.recursive, g = v.dirty;
    r.getFieldEntities(!0).forEach(function(m) {
      if (s || l.push(m.getNamePath()), !(!m.props.rules || !m.props.rules.length) && !(g && !m.isFieldDirty())) {
        var C = m.getNamePath();
        if (d.add(C.join(u)), !s || sr(l, C, S)) {
          var T = m.validateRules(A({
            validateMessages: A(A({}, pc), r.validateMessages)
          }, o));
          c.push(T.then(function() {
            return {
              name: C,
              errors: [],
              warnings: []
            };
          }).catch(function(E) {
            var w, x = [], R = [];
            return (w = E.forEach) === null || w === void 0 || w.call(E, function(F) {
              var M = F.rule.warningOnly, N = F.errors;
              M ? R.push.apply(R, ee(N)) : x.push.apply(x, ee(N));
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
    var h = sm(c);
    r.lastValidatePromise = h, h.catch(function(m) {
      return m;
    }).then(function(m) {
      var C = m.map(function(T) {
        var E = T.name;
        return E;
      });
      r.notifyObservers(r.store, C, {
        type: "validateFinish"
      }), r.triggerOnFieldsChange(C, m);
    });
    var f = h.then(function() {
      return r.lastValidatePromise === h ? Promise.resolve(r.getFieldsValue(l)) : Promise.reject([]);
    }).catch(function(m) {
      var C = m.filter(function(T) {
        return T && T.errors.length;
      });
      return Promise.reject({
        values: r.getFieldsValue(l),
        errorFields: C,
        outOfDate: r.lastValidatePromise !== h
      });
    });
    f.catch(function(m) {
      return m;
    });
    var y = l.filter(function(m) {
      return d.has(m.join(u));
    });
    return r.triggerOnFieldsChange(y), f;
  }), _(this, "submit", function() {
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
function bc(e) {
  var t = b.useRef(), r = b.useState({}), n = G(r, 2), a = n[1];
  if (!t.current)
    if (e)
      t.current = e;
    else {
      var i = function() {
        a({});
      }, o = new cm(i);
      t.current = o.getForm();
    }
  return [t.current];
}
var Ai = /* @__PURE__ */ b.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), um = function(t) {
  var r = t.validateMessages, n = t.onFormChange, a = t.onFormFinish, i = t.children, o = b.useContext(Ai), s = b.useRef({});
  return /* @__PURE__ */ b.createElement(Ai.Provider, {
    value: A(A({}, o), {}, {
      validateMessages: A(A({}, o.validateMessages), r),
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
        c && (s.current = A(A({}, s.current), {}, _({}, c, u))), o.registerForm(c, u);
      },
      unregisterForm: function(c) {
        var u = A({}, s.current);
        delete u[c], s.current = u, o.unregisterForm(c);
      }
    })
  }, i);
}, dm = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed", "clearOnDestroy"], fm = function(t, r) {
  var n = t.name, a = t.initialValues, i = t.fields, o = t.form, s = t.preserve, l = t.children, c = t.component, u = c === void 0 ? "form" : c, d = t.validateMessages, v = t.validateTrigger, S = v === void 0 ? "onChange" : v, g = t.onValuesChange, h = t.onFieldsChange, f = t.onFinish, y = t.onFinishFailed, m = t.clearOnDestroy, C = pt(t, dm), T = b.useRef(null), E = b.useContext(Ai), w = bc(o), x = G(w, 1), R = x[0], F = R.getInternalHooks(Ht), M = F.useSubscribe, N = F.setInitialValues, z = F.setCallbacks, j = F.setValidateMessages, D = F.setPreserve, H = F.destroyForm;
  b.useImperativeHandle(r, function() {
    return A(A({}, R), {}, {
      nativeElement: T.current
    });
  }), b.useEffect(function() {
    return E.registerForm(n, R), function() {
      E.unregisterForm(n);
    };
  }, [E, R, n]), j(A(A({}, E.validateMessages), d)), z({
    onValuesChange: g,
    onFieldsChange: function(U) {
      if (E.triggerFormChange(n, U), h) {
        for (var K = arguments.length, Z = new Array(K > 1 ? K - 1 : 0), re = 1; re < K; re++)
          Z[re - 1] = arguments[re];
        h.apply(void 0, [U].concat(Z));
      }
    },
    onFinish: function(U) {
      E.triggerFormFinish(n, U), f && f(U);
    },
    onFinishFailed: y
  }), D(s);
  var P = b.useRef(null);
  N(a, !P.current), P.current || (P.current = !0), b.useEffect(
    function() {
      return function() {
        return H(m);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var $, O = typeof l == "function";
  if (O) {
    var L = R.getFieldsValue(!0);
    $ = l(L, R);
  } else
    $ = l;
  M(!O);
  var k = b.useRef();
  b.useEffect(function() {
    nm(k.current || [], i || []) || R.setFields(i || []), k.current = i;
  }, [i, R]);
  var V = b.useMemo(function() {
    return A(A({}, R), {}, {
      validateTrigger: S
    });
  }, [R, S]), W = /* @__PURE__ */ b.createElement(kn.Provider, {
    value: null
  }, /* @__PURE__ */ b.createElement(pr.Provider, {
    value: V
  }, $));
  return u === !1 ? W : /* @__PURE__ */ b.createElement(u, Ke({}, C, {
    ref: T,
    onSubmit: function(U) {
      U.preventDefault(), U.stopPropagation(), R.submit();
    },
    onReset: function(U) {
      var K;
      U.preventDefault(), R.resetFields(), (K = C.onReset) === null || K === void 0 || K.call(C, U);
    }
  }), W);
};
function gs(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
var vm = process.env.NODE_ENV !== "production" ? function(e) {
  var t = e.join("__RC_FIELD_FORM_SPLIT__"), r = ke(t);
  Fe(r.current === t, "`useWatch` is not support dynamic `namePath`. Please provide static instead.");
} : function() {
};
function pm() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = t[0], a = t[1], i = a === void 0 ? {} : a, o = Eh(i) ? {
    form: i
  } : i, s = o.form, l = Ba(), c = G(l, 2), u = c[0], d = c[1], v = Xc(function() {
    return gs(u);
  }, [u]), S = ke(v);
  S.current = v;
  var g = Ot(pr), h = s || g, f = h && h._init;
  process.env.NODE_ENV !== "production" && Fe(t.length === 2 ? s ? f : !0 : f, "useWatch requires a form instance since it can not auto detect from context.");
  var y = Ne(n), m = ke(y);
  return m.current = y, vm(y), bt(
    function() {
      if (f) {
        var C = h.getFieldsValue, T = h.getInternalHooks, E = T(Ht), w = E.registerWatch, x = function(N, z) {
          var j = o.preserve ? z : N;
          return typeof n == "function" ? n(j) : _t(j, m.current);
        }, R = w(function(M, N) {
          var z = x(M, N), j = gs(z);
          S.current !== j && (S.current = j, d(z));
        }), F = x(C(), C(!0));
        return u !== F && d(F), R;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f]
  ), u;
}
var hm = /* @__PURE__ */ b.forwardRef(fm), cn = hm;
cn.FormProvider = um;
cn.Field = mc;
cn.List = om;
cn.useForm = bc;
cn.useWatch = pm;
const Wr = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== "production" && (Wr.displayName = "FormItemInputContext");
const mm = (e) => {
  let {
    children: t,
    status: r,
    override: n
  } = e;
  const a = b.useContext(Wr), i = b.useMemo(() => {
    const o = Object.assign({}, a);
    return n && delete o.isFormItemInput, r && (delete o.status, delete o.hasFeedback, delete o.feedbackIcon), o;
  }, [r, n, a]);
  return /* @__PURE__ */ b.createElement(Wr.Provider, {
    value: i
  }, t);
}, gm = /* @__PURE__ */ b.createContext(void 0), bm = /* @__PURE__ */ Vi(void 0);
var ym = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: !0
}, Sm = A(A({}, ym), {}, {
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
const xm = {
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
}, Sm), Object.assign({}, xm);
const st = "${label} is not a valid ${type}", xa = {
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
let Rn = [];
const bs = () => Rn.reduce((e, t) => Object.assign(Object.assign({}, e), t), xa.Modal);
function Em(e) {
  if (e) {
    const t = Object.assign({}, e);
    return Rn.push(t), bs(), () => {
      Rn = Rn.filter((r) => r !== t), bs();
    };
  }
  Object.assign({}, xa.Modal);
}
const yc = /* @__PURE__ */ Vi(void 0), Sc = "internalMark", xc = (e) => {
  const {
    locale: t = {},
    children: r,
    _ANT_MARK__: n
  } = e;
  if (process.env.NODE_ENV !== "production") {
    const i = qt("LocaleProvider");
    process.env.NODE_ENV !== "production" && i(n === Sc, "deprecated", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale");
  }
  b.useEffect(() => Em(t == null ? void 0 : t.Modal), [t]);
  const a = b.useMemo(() => Object.assign(Object.assign({}, t), {
    exist: !0
  }), [t]);
  return /* @__PURE__ */ b.createElement(yc.Provider, {
    value: a
  }, r);
};
process.env.NODE_ENV !== "production" && (xc.displayName = "LocaleProvider");
const Cm = `-ant-${Date.now()}-${Math.random()}`;
function _m(e, t) {
  const r = {}, n = (o, s) => {
    let l = o.clone();
    return l = (s == null ? void 0 : s(l)) || l, l.toRgbString();
  }, a = (o, s) => {
    const l = new Ve(o), c = Vr(l.toRgbString());
    r[`${s}-color`] = n(l), r[`${s}-color-disabled`] = c[1], r[`${s}-color-hover`] = c[4], r[`${s}-color-active`] = c[6], r[`${s}-color-outline`] = l.clone().setA(0.2).toRgbString(), r[`${s}-color-deprecated-bg`] = c[0], r[`${s}-color-deprecated-border`] = c[2];
  };
  if (t.primaryColor) {
    a(t.primaryColor, "primary");
    const o = new Ve(t.primaryColor), s = Vr(o.toRgbString());
    s.forEach((c, u) => {
      r[`primary-${u + 1}`] = c;
    }), r["primary-color-deprecated-l-35"] = n(o, (c) => c.lighten(35)), r["primary-color-deprecated-l-20"] = n(o, (c) => c.lighten(20)), r["primary-color-deprecated-t-20"] = n(o, (c) => c.tint(20)), r["primary-color-deprecated-t-50"] = n(o, (c) => c.tint(50)), r["primary-color-deprecated-f-12"] = n(o, (c) => c.setA(c.a * 0.12));
    const l = new Ve(s[0]);
    r["primary-color-active-deprecated-f-30"] = n(l, (c) => c.setA(c.a * 0.3)), r["primary-color-active-deprecated-d-02"] = n(l, (c) => c.darken(2));
  }
  return t.successColor && a(t.successColor, "success"), t.warningColor && a(t.warningColor, "warning"), t.errorColor && a(t.errorColor, "error"), t.infoColor && a(t.infoColor, "info"), `
  :root {
    ${Object.keys(r).map((o) => `--${e}-${o}: ${r[o]};`).join(`
`)}
  }
  `.trim();
}
function $m(e, t) {
  const r = _m(e, t);
  Tt() ? Bt(r, `${Cm}-dynamic-theme`) : process.env.NODE_ENV !== "production" && ga(!1, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
}
function wm() {
  const e = Ot(Lr), t = Ot(vr);
  return {
    componentDisabled: e,
    componentSize: t
  };
}
const Pm = Object.assign({}, b), {
  useId: ys
} = Pm, Om = () => "", Tm = typeof ys > "u" ? Om : ys;
function Rm(e, t, r) {
  var n, a;
  const i = qt("ConfigProvider"), o = e || {}, s = o.inherit === !1 || !t ? Object.assign(Object.assign({}, Ei), {
    hashed: (n = t == null ? void 0 : t.hashed) !== null && n !== void 0 ? n : Ei.hashed,
    cssVar: t == null ? void 0 : t.cssVar
  }) : t, l = Tm();
  if (process.env.NODE_ENV !== "production") {
    const c = o.cssVar || s.cssVar, u = !!(typeof o.cssVar == "object" && (!((a = o.cssVar) === null || a === void 0) && a.key) || l);
    process.env.NODE_ENV !== "production" && i(!c || u, "breaking", "Missing key in `cssVar` config. Please upgrade to React 18 or set `cssVar.key` manually in each ConfigProvider inside `cssVar` enabled ConfigProvider.");
  }
  return Xi(() => {
    var c, u;
    if (!e)
      return t;
    const d = Object.assign({}, s.components);
    Object.keys(e.components || {}).forEach((g) => {
      d[g] = Object.assign(Object.assign({}, d[g]), e.components[g]);
    });
    const v = `css-var-${l.replace(/:/g, "")}`, S = ((c = o.cssVar) !== null && c !== void 0 ? c : s.cssVar) && Object.assign(Object.assign(Object.assign({
      prefix: r == null ? void 0 : r.prefixCls
    }, typeof s.cssVar == "object" ? s.cssVar : {}), typeof o.cssVar == "object" ? o.cssVar : {}), {
      key: typeof o.cssVar == "object" && ((u = o.cssVar) === null || u === void 0 ? void 0 : u.key) || v
    });
    return Object.assign(Object.assign(Object.assign({}, s), o), {
      token: Object.assign(Object.assign({}, s.token), o.token),
      components: d,
      cssVar: S
    });
  }, [o, s], (c, u) => c.some((d, v) => {
    const S = u[v];
    return !vi(d, S, !0);
  }));
}
var Fm = ["children"], Ec = /* @__PURE__ */ b.createContext({});
function Am(e) {
  var t = e.children, r = pt(e, Fm);
  return /* @__PURE__ */ b.createElement(Ec.Provider, {
    value: r
  }, t);
}
var Mm = /* @__PURE__ */ function(e) {
  Ut(r, e);
  var t = Gt(r);
  function r() {
    return Ye(this, r), t.apply(this, arguments);
  }
  return Ue(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
}(b.Component);
function jm(e) {
  var t = b.useReducer(function(s) {
    return s + 1;
  }, 0), r = G(t, 2), n = r[1], a = b.useRef(e), i = jr(function() {
    return a.current;
  }), o = jr(function(s) {
    a.current = typeof s == "function" ? s(a.current) : s, n();
  });
  return [i, o];
}
var jt = "none", Sn = "appear", xn = "enter", En = "leave", Ss = "none", gt = "prepare", nr = "start", ar = "active", co = "end", Cc = "prepared";
function xs(e, t) {
  var r = {};
  return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit".concat(e)] = "webkit".concat(t), r["Moz".concat(e)] = "moz".concat(t), r["ms".concat(e)] = "MS".concat(t), r["O".concat(e)] = "o".concat(t.toLowerCase()), r;
}
function Im(e, t) {
  var r = {
    animationend: xs("Animation", "AnimationEnd"),
    transitionend: xs("Transition", "TransitionEnd")
  };
  return e && ("AnimationEvent" in t || delete r.animationend.animation, "TransitionEvent" in t || delete r.transitionend.transition), r;
}
var Dm = Im(Tt(), typeof window < "u" ? window : {}), _c = {};
if (Tt()) {
  var Nm = document.createElement("div");
  _c = Nm.style;
}
var Cn = {};
function $c(e) {
  if (Cn[e])
    return Cn[e];
  var t = Dm[e];
  if (t)
    for (var r = Object.keys(t), n = r.length, a = 0; a < n; a += 1) {
      var i = r[a];
      if (Object.prototype.hasOwnProperty.call(t, i) && i in _c)
        return Cn[e] = t[i], Cn[e];
    }
  return "";
}
var wc = $c("animationend"), Pc = $c("transitionend"), Oc = !!(wc && Pc), Es = wc || "animationend", Cs = Pc || "transitionend";
function _s(e, t) {
  if (!e) return null;
  if (te(e) === "object") {
    var r = t.replace(/-\w/g, function(n) {
      return n[1].toUpperCase();
    });
    return e[r];
  }
  return "".concat(e, "-").concat(t);
}
const km = function(e) {
  var t = ke();
  function r(a) {
    a && (a.removeEventListener(Cs, e), a.removeEventListener(Es, e));
  }
  function n(a) {
    t.current && t.current !== a && r(t.current), a && a !== t.current && (a.addEventListener(Cs, e), a.addEventListener(Es, e), t.current = a);
  }
  return b.useEffect(function() {
    return function() {
      r(t.current);
    };
  }, []), [n, r];
};
var Tc = Tt() ? Jc : bt;
const Vm = function() {
  var e = b.useRef(null);
  function t() {
    cr.cancel(e.current);
  }
  function r(n) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    t();
    var i = cr(function() {
      a <= 1 ? n({
        isCanceled: function() {
          return i !== e.current;
        }
      }) : r(n, a - 1);
    });
    e.current = i;
  }
  return b.useEffect(function() {
    return function() {
      t();
    };
  }, []), [r, t];
};
var Lm = [gt, nr, ar, co], zm = [gt, Cc], Rc = !1, Hm = !0;
function Fc(e) {
  return e === ar || e === co;
}
const Bm = function(e, t, r) {
  var n = Ir(Ss), a = G(n, 2), i = a[0], o = a[1], s = Vm(), l = G(s, 2), c = l[0], u = l[1];
  function d() {
    o(gt, !0);
  }
  var v = t ? zm : Lm;
  return Tc(function() {
    if (i !== Ss && i !== co) {
      var S = v.indexOf(i), g = v[S + 1], h = r(i);
      h === Rc ? o(g, !0) : g && c(function(f) {
        function y() {
          f.isCanceled() || o(g, !0);
        }
        h === !0 ? y() : Promise.resolve(h).then(y);
      });
    }
  }, [e, i]), b.useEffect(function() {
    return function() {
      u();
    };
  }, []), [d, i];
};
function Wm(e, t, r, n) {
  var a = n.motionEnter, i = a === void 0 ? !0 : a, o = n.motionAppear, s = o === void 0 ? !0 : o, l = n.motionLeave, c = l === void 0 ? !0 : l, u = n.motionDeadline, d = n.motionLeaveImmediately, v = n.onAppearPrepare, S = n.onEnterPrepare, g = n.onLeavePrepare, h = n.onAppearStart, f = n.onEnterStart, y = n.onLeaveStart, m = n.onAppearActive, C = n.onEnterActive, T = n.onLeaveActive, E = n.onAppearEnd, w = n.onEnterEnd, x = n.onLeaveEnd, R = n.onVisibleChanged, F = Ir(), M = G(F, 2), N = M[0], z = M[1], j = jm(jt), D = G(j, 2), H = D[0], P = D[1], $ = Ir(null), O = G($, 2), L = O[0], k = O[1], V = H(), W = ke(!1), Y = ke(null);
  function U() {
    return r();
  }
  var K = ke(!1);
  function Z() {
    P(jt), k(null, !0);
  }
  var re = jr(function(Oe) {
    var _e = H();
    if (_e !== jt) {
      var ae = U();
      if (!(Oe && !Oe.deadline && Oe.target !== ae)) {
        var ne = K.current, Se;
        _e === Sn && ne ? Se = E == null ? void 0 : E(ae, Oe) : _e === xn && ne ? Se = w == null ? void 0 : w(ae, Oe) : _e === En && ne && (Se = x == null ? void 0 : x(ae, Oe)), ne && Se !== !1 && Z();
      }
    }
  }), le = km(re), ve = G(le, 1), de = ve[0], $e = function(_e) {
    switch (_e) {
      case Sn:
        return _(_(_({}, gt, v), nr, h), ar, m);
      case xn:
        return _(_(_({}, gt, S), nr, f), ar, C);
      case En:
        return _(_(_({}, gt, g), nr, y), ar, T);
      default:
        return {};
    }
  }, we = b.useMemo(function() {
    return $e(V);
  }, [V]), De = Bm(V, !e, function(Oe) {
    if (Oe === gt) {
      var _e = we[gt];
      return _e ? _e(U()) : Rc;
    }
    if (J in we) {
      var ae;
      k(((ae = we[J]) === null || ae === void 0 ? void 0 : ae.call(we, U(), null)) || null);
    }
    return J === ar && V !== jt && (de(U()), u > 0 && (clearTimeout(Y.current), Y.current = setTimeout(function() {
      re({
        deadline: !0
      });
    }, u))), J === Cc && Z(), Hm;
  }), q = G(De, 2), Ce = q[0], J = q[1], ce = Fc(J);
  K.current = ce;
  var Ae = ke(null);
  Tc(function() {
    if (!(W.current && Ae.current === t)) {
      z(t);
      var Oe = W.current;
      W.current = !0;
      var _e;
      !Oe && t && s && (_e = Sn), Oe && t && i && (_e = xn), (Oe && !t && c || !Oe && d && !t && c) && (_e = En);
      var ae = $e(_e);
      _e && (e || ae[gt]) ? (P(_e), Ce()) : P(jt), Ae.current = t;
    }
  }, [t]), bt(function() {
    // Cancel appear
    (V === Sn && !s || // Cancel enter
    V === xn && !i || // Cancel leave
    V === En && !c) && P(jt);
  }, [s, i, c]), bt(function() {
    return function() {
      W.current = !1, clearTimeout(Y.current);
    };
  }, []);
  var fe = b.useRef(!1);
  bt(function() {
    N && (fe.current = !0), N !== void 0 && V === jt && ((fe.current || N) && (R == null || R(N)), fe.current = !0);
  }, [N, V]);
  var ze = L;
  return we[gt] && J === nr && (ze = A({
    transition: "none"
  }, ze)), [V, J, ze, N ?? t];
}
function qm(e) {
  var t = e;
  te(e) === "object" && (t = e.transitionSupport);
  function r(a, i) {
    return !!(a.motionName && t && i !== !1);
  }
  var n = /* @__PURE__ */ b.forwardRef(function(a, i) {
    var o = a.visible, s = o === void 0 ? !0 : o, l = a.removeOnLeave, c = l === void 0 ? !0 : l, u = a.forceRender, d = a.children, v = a.motionName, S = a.leavedClassName, g = a.eventProps, h = b.useContext(Ec), f = h.motion, y = r(a, f), m = ke(), C = ke();
    function T() {
      try {
        return m.current instanceof HTMLElement ? m.current : _n(C.current);
      } catch {
        return null;
      }
    }
    var E = Wm(y, s, T, a), w = G(E, 4), x = w[0], R = w[1], F = w[2], M = w[3], N = b.useRef(M);
    M && (N.current = !0);
    var z = b.useCallback(function(O) {
      m.current = O, nl(i, O);
    }, [i]), j, D = A(A({}, g), {}, {
      visible: s
    });
    if (!d)
      j = null;
    else if (x === jt)
      M ? j = d(A({}, D), z) : !c && N.current && S ? j = d(A(A({}, D), {}, {
        className: S
      }), z) : u || !c && !S ? j = d(A(A({}, D), {}, {
        style: {
          display: "none"
        }
      }), z) : j = null;
    else {
      var H;
      R === gt ? H = "prepare" : Fc(R) ? H = "active" : R === nr && (H = "start");
      var P = _s(v, "".concat(x, "-").concat(H));
      j = d(A(A({}, D), {}, {
        className: ye(_s(v, x), _(_({}, P, P && H), v, typeof v == "string")),
        style: F
      }), z);
    }
    if (/* @__PURE__ */ b.isValidElement(j) && il(j)) {
      var $ = sl(j);
      $ || (j = /* @__PURE__ */ b.cloneElement(j, {
        ref: z
      }));
    }
    return /* @__PURE__ */ b.createElement(Mm, {
      ref: C
    }, j);
  });
  return n.displayName = "CSSMotion", n;
}
const Ym = qm(Oc);
var Mi = "add", ji = "keep", Ii = "remove", Ha = "removed";
function Um(e) {
  var t;
  return e && te(e) === "object" && "key" in e ? t = e : t = {
    key: e
  }, A(A({}, t), {}, {
    key: String(t.key)
  });
}
function Di() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  return e.map(Um);
}
function Gm() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = [], n = 0, a = t.length, i = Di(e), o = Di(t);
  i.forEach(function(c) {
    for (var u = !1, d = n; d < a; d += 1) {
      var v = o[d];
      if (v.key === c.key) {
        n < d && (r = r.concat(o.slice(n, d).map(function(S) {
          return A(A({}, S), {}, {
            status: Mi
          });
        })), n = d), r.push(A(A({}, v), {}, {
          status: ji
        })), n += 1, u = !0;
        break;
      }
    }
    u || r.push(A(A({}, c), {}, {
      status: Ii
    }));
  }), n < a && (r = r.concat(o.slice(n).map(function(c) {
    return A(A({}, c), {}, {
      status: Mi
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
      return d !== c || v !== Ii;
    }), r.forEach(function(u) {
      u.key === c && (u.status = ji);
    });
  }), r;
}
var Km = ["component", "children", "onVisibleChanged", "onAllRemoved"], Xm = ["status"], Jm = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearPrepare", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function Qm(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ym, r = /* @__PURE__ */ function(n) {
    Ut(i, n);
    var a = Gt(i);
    function i() {
      var o;
      Ye(this, i);
      for (var s = arguments.length, l = new Array(s), c = 0; c < s; c++)
        l[c] = arguments[c];
      return o = a.call.apply(a, [this].concat(l)), _(oe(o), "state", {
        keyEntities: []
      }), _(oe(o), "removeKey", function(u) {
        o.setState(function(d) {
          var v = d.keyEntities.map(function(S) {
            return S.key !== u ? S : A(A({}, S), {}, {
              status: Ha
            });
          });
          return {
            keyEntities: v
          };
        }, function() {
          var d = o.state.keyEntities, v = d.filter(function(S) {
            var g = S.status;
            return g !== Ha;
          }).length;
          v === 0 && o.props.onAllRemoved && o.props.onAllRemoved();
        });
      }), o;
    }
    return Ue(i, [{
      key: "render",
      value: function() {
        var s = this, l = this.state.keyEntities, c = this.props, u = c.component, d = c.children, v = c.onVisibleChanged;
        c.onAllRemoved;
        var S = pt(c, Km), g = u || b.Fragment, h = {};
        return Jm.forEach(function(f) {
          h[f] = S[f], delete S[f];
        }), delete S.keys, /* @__PURE__ */ b.createElement(g, S, l.map(function(f, y) {
          var m = f.status, C = pt(f, Xm), T = m === Mi || m === ji;
          return /* @__PURE__ */ b.createElement(t, Ke({}, h, {
            key: C.key,
            visible: T,
            eventProps: C,
            onVisibleChanged: function(w) {
              v == null || v(w, {
                key: C.key
              }), w || s.removeKey(C.key);
            }
          }), function(E, w) {
            return d(A(A({}, E), {}, {
              index: y
            }), w);
          });
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function(s, l) {
        var c = s.keys, u = l.keyEntities, d = Di(c), v = Gm(u, d);
        return {
          keyEntities: v.filter(function(S) {
            var g = u.find(function(h) {
              var f = h.key;
              return S.key === f;
            });
            return !(g && g.status === Ha && S.status === Ii);
          })
        };
      }
    }]), i;
  }(b.Component);
  return _(r, "defaultProps", {
    component: "div"
  }), r;
}
Qm(Oc);
function Zm(e) {
  const {
    children: t
  } = e, [, r] = Sa(), {
    motion: n
  } = r, a = b.useRef(!1);
  return a.current = a.current || n === !1, a.current ? /* @__PURE__ */ b.createElement(Am, {
    motion: n
  }, t) : t;
}
const Ac = /* @__PURE__ */ b.memo((e) => {
  let {
    dropdownMatchSelectWidth: t
  } = e;
  return qt("ConfigProvider").deprecated(t === void 0, "dropdownMatchSelectWidth", "popupMatchSelectWidth"), null;
});
process.env.NODE_ENV !== "production" && (Ac.displayName = "PropWarning");
const eg = process.env.NODE_ENV !== "production" ? Ac : () => null;
var tg = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
let Ni = !1;
process.env.NODE_ENV;
const rg = ["getTargetContainer", "getPopupContainer", "renderEmpty", "input", "pagination", "form", "select", "button"];
let Mc;
function ng() {
  return Mc || fi;
}
function ag(e) {
  return Object.keys(e).some((t) => t.endsWith("Color"));
}
const ig = (e) => {
  const {
    prefixCls: t,
    iconPrefixCls: r,
    theme: n,
    holderRender: a
  } = e;
  t !== void 0 && (Mc = t), n && ag(n) && (process.env.NODE_ENV !== "production" && ga(!1, "ConfigProvider", "`config` of css variable theme is not work in v5. Please use new `theme` config instead."), $m(ng(), n));
}, og = (e) => {
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
    dropdownMatchSelectWidth: S,
    popupMatchSelectWidth: g,
    popupOverflow: h,
    legacyLocale: f,
    parentContext: y,
    iconPrefixCls: m,
    theme: C,
    componentDisabled: T,
    segmented: E,
    statistic: w,
    spin: x,
    calendar: R,
    carousel: F,
    cascader: M,
    collapse: N,
    typography: z,
    checkbox: j,
    descriptions: D,
    divider: H,
    drawer: P,
    skeleton: $,
    steps: O,
    image: L,
    layout: k,
    list: V,
    mentions: W,
    modal: Y,
    progress: U,
    result: K,
    slider: Z,
    breadcrumb: re,
    menu: le,
    pagination: ve,
    input: de,
    textArea: $e,
    empty: we,
    badge: De,
    radio: q,
    rate: Ce,
    switch: J,
    transfer: ce,
    avatar: Ae,
    message: fe,
    tag: ze,
    table: Oe,
    card: _e,
    tabs: ae,
    timeline: ne,
    timePicker: Se,
    upload: ct,
    notification: Xe,
    tree: Je,
    colorPicker: ut,
    datePicker: Et,
    rangePicker: br,
    flex: yr,
    wave: Te,
    dropdown: pe,
    warning: dt,
    tour: Rt,
    tooltip: Ea,
    popover: Sr,
    popconfirm: un,
    floatButtonGroup: Ft,
    variant: xr,
    inputNumber: Er,
    treeSelect: dn
  } = e, fn = b.useCallback((Me, p) => {
    const {
      prefixCls: I
    } = e;
    if (p)
      return p;
    const B = I || y.getPrefixCls("");
    return Me ? `${B}-${Me}` : B;
  }, [y.getPrefixCls, e.prefixCls]), kt = m || y.iconPrefixCls || ro, Xt = r || y.csp;
  Sh(kt, Xt);
  const Vt = Rm(C, y.theme, {
    prefixCls: fn("")
  });
  process.env.NODE_ENV !== "production" && (Ni = Ni || !!Vt);
  const Jt = {
    csp: Xt,
    autoInsertSpaceInButton: n,
    alert: a,
    anchor: i,
    locale: s || f,
    direction: c,
    space: u,
    splitter: d,
    virtual: v,
    popupMatchSelectWidth: g ?? S,
    popupOverflow: h,
    getPrefixCls: fn,
    iconPrefixCls: kt,
    theme: Vt,
    segmented: E,
    statistic: w,
    spin: x,
    calendar: R,
    carousel: F,
    cascader: M,
    collapse: N,
    typography: z,
    checkbox: j,
    descriptions: D,
    divider: H,
    drawer: P,
    skeleton: $,
    steps: O,
    image: L,
    input: de,
    textArea: $e,
    layout: k,
    list: V,
    mentions: W,
    modal: Y,
    progress: U,
    result: K,
    slider: Z,
    breadcrumb: re,
    menu: le,
    pagination: ve,
    empty: we,
    badge: De,
    radio: q,
    rate: Ce,
    switch: J,
    transfer: ce,
    avatar: Ae,
    message: fe,
    tag: ze,
    table: Oe,
    card: _e,
    tabs: ae,
    timeline: ne,
    timePicker: Se,
    upload: ct,
    notification: Xe,
    tree: Je,
    colorPicker: ut,
    datePicker: Et,
    rangePicker: br,
    flex: yr,
    wave: Te,
    dropdown: pe,
    warning: dt,
    tour: Rt,
    tooltip: Ea,
    popover: Sr,
    popconfirm: un,
    floatButtonGroup: Ft,
    variant: xr,
    inputNumber: Er,
    treeSelect: dn
  };
  process.env.NODE_ENV !== "production" && qt("ConfigProvider")(!("autoInsertSpaceInButton" in e), "deprecated", "`autoInsertSpaceInButton` is deprecated. Please use `{ button: { autoInsertSpace: boolean }}` instead.");
  const At = Object.assign({}, y);
  Object.keys(Jt).forEach((Me) => {
    Jt[Me] !== void 0 && (At[Me] = Jt[Me]);
  }), rg.forEach((Me) => {
    const p = e[Me];
    p && (At[Me] = p);
  }), typeof n < "u" && (At.button = Object.assign({
    autoInsertSpace: n
  }, At.button));
  const Mt = Xi(() => At, At, (Me, p) => {
    const I = Object.keys(Me), B = Object.keys(p);
    return I.length !== B.length || I.some((Q) => Me[Q] !== p[Q]);
  }), {
    layer: Cr
  } = b.useContext(on), vn = b.useMemo(() => ({
    prefixCls: kt,
    csp: Xt,
    layer: Cr ? "antd" : void 0
  }), [kt, Xt, Cr]);
  let He = /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement(eg, {
    dropdownMatchSelectWidth: S
  }), t);
  const pn = b.useMemo(() => {
    var Me, p, I, B;
    return rr(((Me = xa.Form) === null || Me === void 0 ? void 0 : Me.defaultValidateMessages) || {}, ((I = (p = Mt.locale) === null || p === void 0 ? void 0 : p.Form) === null || I === void 0 ? void 0 : I.defaultValidateMessages) || {}, ((B = Mt.form) === null || B === void 0 ? void 0 : B.validateMessages) || {}, (o == null ? void 0 : o.validateMessages) || {});
  }, [Mt, o == null ? void 0 : o.validateMessages]);
  Object.keys(pn).length > 0 && (He = /* @__PURE__ */ b.createElement(bm.Provider, {
    value: pn
  }, He)), s && (He = /* @__PURE__ */ b.createElement(xc, {
    locale: s,
    _ANT_MARK__: Sc
  }, He)), He = /* @__PURE__ */ b.createElement(Zi.Provider, {
    value: vn
  }, He), l && (He = /* @__PURE__ */ b.createElement(xh, {
    size: l
  }, He)), He = /* @__PURE__ */ b.createElement(Zm, null, He);
  const Ca = b.useMemo(() => {
    const Me = Vt || {}, {
      algorithm: p,
      token: I,
      components: B,
      cssVar: Q
    } = Me, he = tg(Me, ["algorithm", "token", "components", "cssVar"]), me = p && (!Array.isArray(p) || p.length > 0) ? hi(p) : nc, se = {};
    Object.entries(B || {}).forEach((qe) => {
      let [Re, je] = qe;
      const Ie = Object.assign({}, je);
      "algorithm" in Ie && (Ie.algorithm === !0 ? Ie.theme = me : (Array.isArray(Ie.algorithm) || typeof Ie.algorithm == "function") && (Ie.theme = hi(Ie.algorithm)), delete Ie.algorithm), se[Re] = Ie;
    });
    const ie = Object.assign(Object.assign({}, Br), I);
    return Object.assign(Object.assign({}, he), {
      theme: me,
      token: ie,
      components: se,
      override: Object.assign({
        override: ie
      }, se),
      cssVar: Q
    });
  }, [Vt]);
  return C && (He = /* @__PURE__ */ b.createElement(ac.Provider, {
    value: Ca
  }, He)), Mt.warning && (He = /* @__PURE__ */ b.createElement(Ml.Provider, {
    value: Mt.warning
  }, He)), T !== void 0 && (He = /* @__PURE__ */ b.createElement(Iv, {
    disabled: T
  }, He)), /* @__PURE__ */ b.createElement(Nt.Provider, {
    value: Mt
  }, He);
}, gr = (e) => {
  const t = b.useContext(Nt), r = b.useContext(yc);
  return /* @__PURE__ */ b.createElement(og, Object.assign({
    parentContext: t,
    legacyLocale: r
  }, e));
};
gr.ConfigContext = Nt;
gr.SizeContext = vr;
gr.config = ig;
gr.useConfig = wm;
Object.defineProperty(gr, "SizeContext", {
  get: () => (process.env.NODE_ENV !== "production" && ga(!1, "ConfigProvider", "ConfigProvider.SizeContext is deprecated. Please use `ConfigProvider.useConfig().componentSize` instead."), vr)
});
process.env.NODE_ENV !== "production" && (gr.displayName = "ConfigProvider");
const jc = function(e, t) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
  var n, a;
  const {
    variant: i,
    [e]: o
  } = b.useContext(Nt), s = b.useContext(gm), l = o == null ? void 0 : o.variant;
  let c;
  typeof t < "u" ? c = t : r === !1 ? c = "borderless" : c = (a = (n = s ?? l) !== null && n !== void 0 ? n : i) !== null && a !== void 0 ? a : "outlined";
  const u = Mv.includes(c);
  return [c, u];
}, Ic = /* @__PURE__ */ b.createContext(null), Dc = (e, t) => {
  const r = b.useContext(Ic), n = b.useMemo(() => {
    if (!r)
      return "";
    const {
      compactDirection: a,
      isFirstItem: i,
      isLastItem: o
    } = r, s = a === "vertical" ? "-vertical-" : "-";
    return ye(`${e}-compact${s}item`, {
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
}, sg = (e) => {
  const {
    children: t
  } = e;
  return /* @__PURE__ */ b.createElement(Ic.Provider, {
    value: null
  }, t);
}, $s = (e) => {
  const {
    space: t,
    form: r,
    children: n
  } = e;
  if (n == null)
    return null;
  let a = n;
  return r && (a = /* @__PURE__ */ X.createElement(mm, {
    override: !0,
    status: !0
  }, a)), t && (a = /* @__PURE__ */ X.createElement(sg, null, a)), a;
};
function lg(e, t) {
  const r = ke([]), n = () => {
    r.current.push(setTimeout(() => {
      var a, i, o, s;
      !((a = e.current) === null || a === void 0) && a.input && ((i = e.current) === null || i === void 0 ? void 0 : i.input.getAttribute("type")) === "password" && (!((o = e.current) === null || o === void 0) && o.input.hasAttribute("value")) && ((s = e.current) === null || s === void 0 || s.input.removeAttribute("value"));
    }));
  };
  return bt(() => (n(), () => r.current.forEach((a) => {
    a && clearTimeout(a);
  })), []), n;
}
function cg(e, t, r) {
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
function ug(e, t, r) {
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
function dg(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    focus: !0
  };
  const {
    componentCls: r
  } = e, n = `${r}-compact`;
  return {
    [n]: Object.assign(Object.assign({}, cg(e, n, t)), ug(r, n, t))
  };
}
function uo(e) {
  return Kt(e, {
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
    paddingSM: c,
    controlPaddingHorizontalSM: u,
    controlPaddingHorizontal: d,
    colorFillAlter: v,
    colorPrimaryHover: S,
    colorPrimary: g,
    controlOutlineWidth: h,
    controlOutline: f,
    colorErrorOutline: y,
    colorWarningOutline: m,
    colorBgContainer: C,
    inputFontSize: T,
    inputFontSizeLG: E,
    inputFontSizeSM: w
  } = e, x = T || r, R = w || x, F = E || s, M = Math.round((t - x * n) / 2 * 10) / 10 - a, N = Math.round((i - R * n) / 2 * 10) / 10 - a, z = Math.ceil((o - F * l) / 2 * 10) / 10 - a;
  return {
    paddingBlock: Math.max(M, 0),
    paddingBlockSM: Math.max(N, 0),
    paddingBlockLG: Math.max(z, 0),
    paddingInline: c - a,
    paddingInlineSM: u - a,
    paddingInlineLG: d - a,
    addonBg: v,
    activeBorderColor: g,
    hoverBorderColor: S,
    activeShadow: `0 0 0 ${h}px ${f}`,
    errorActiveShadow: `0 0 0 ${h}px ${y}`,
    warningActiveShadow: `0 0 0 ${h}px ${m}`,
    hoverBg: C,
    activeBg: C,
    inputFontSize: x,
    inputFontSizeLG: F,
    inputFontSizeSM: R
  };
}, fg = (e) => ({
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
  "&:hover:not([disabled])": Object.assign({}, fg(Kt(e, {
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
}), ws = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, Nc(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  }),
  [`&${e.componentCls}-status-${t.status}${e.componentCls}-disabled`]: {
    borderColor: t.borderColor
  }
}), vg = (e, t) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Nc(e, {
    borderColor: e.colorBorder,
    hoverBorderColor: e.hoverBorderColor,
    activeBorderColor: e.activeBorderColor,
    activeShadow: e.activeShadow
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, vo(e))
  }), ws(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), ws(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), t)
}), Ps = (e, t) => ({
  [`&${e.componentCls}-group-wrapper-status-${t.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      borderColor: t.addonBorderColor,
      color: t.addonColor
    }
  }
}), pg = (e) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group`]: {
      "&-addon": {
        background: e.addonBg,
        border: `${Pe(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
      },
      "&-addon:first-child": {
        borderInlineEnd: 0
      },
      "&-addon:last-child": {
        borderInlineStart: 0
      }
    }
  }, Ps(e, {
    status: "error",
    addonBorderColor: e.colorError,
    addonColor: e.colorErrorText
  })), Ps(e, {
    status: "warning",
    addonBorderColor: e.colorWarning,
    addonColor: e.colorWarningText
  })), {
    [`&${e.componentCls}-group-wrapper-disabled`]: {
      [`${e.componentCls}-group-addon`]: Object.assign({}, vo(e))
    }
  })
}), hg = (e, t) => {
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
}, kc = (e, t) => {
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
}, Os = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, kc(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  })
}), mg = (e, t) => ({
  "&-filled": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, kc(e, {
    bg: e.colorFillTertiary,
    hoverBg: e.colorFillSecondary,
    activeBorderColor: e.activeBorderColor
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, vo(e))
  }), Os(e, {
    status: "error",
    bg: e.colorErrorBg,
    hoverBg: e.colorErrorBgHover,
    activeBorderColor: e.colorError,
    inputColor: e.colorErrorText,
    affixColor: e.colorError
  })), Os(e, {
    status: "warning",
    bg: e.colorWarningBg,
    hoverBg: e.colorWarningBgHover,
    activeBorderColor: e.colorWarning,
    inputColor: e.colorWarningText,
    affixColor: e.colorWarning
  })), t)
}), Ts = (e, t) => ({
  [`&${e.componentCls}-group-wrapper-status-${t.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      background: t.addonBg,
      color: t.addonColor
    }
  }
}), gg = (e) => ({
  "&-filled": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group`]: {
      "&-addon": {
        background: e.colorFillTertiary
      },
      [`${e.componentCls}-filled:not(:focus):not(:focus-within)`]: {
        "&:not(:first-child)": {
          borderInlineStart: `${Pe(e.lineWidth)} ${e.lineType} ${e.colorSplit}`
        },
        "&:not(:last-child)": {
          borderInlineEnd: `${Pe(e.lineWidth)} ${e.lineType} ${e.colorSplit}`
        }
      }
    }
  }, Ts(e, {
    status: "error",
    addonBg: e.colorErrorBg,
    addonColor: e.colorErrorText
  })), Ts(e, {
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
          borderInlineStart: `${Pe(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${Pe(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${Pe(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        },
        "&-addon:last-child": {
          borderInlineEnd: `${Pe(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${Pe(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${Pe(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        }
      }
    }
  })
}), Vc = (e, t) => ({
  background: e.colorBgContainer,
  borderWidth: `${Pe(e.lineWidth)} 0`,
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
}), Rs = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, Vc(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  }),
  [`&${e.componentCls}-status-${t.status}${e.componentCls}-disabled`]: {
    borderColor: `transparent transparent ${t.borderColor} transparent`
  }
}), bg = (e, t) => ({
  "&-underlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Vc(e, {
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
  }), Rs(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), Rs(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), t)
}), yg = (e) => ({
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
}), Lc = (e) => {
  const {
    paddingBlockLG: t,
    lineHeightLG: r,
    borderRadiusLG: n,
    paddingInlineLG: a
  } = e;
  return {
    padding: `${Pe(t)} ${Pe(a)}`,
    fontSize: e.inputFontSizeLG,
    lineHeight: r,
    borderRadius: n
  };
}, zc = (e) => ({
  padding: `${Pe(e.paddingBlockSM)} ${Pe(e.paddingInlineSM)}`,
  fontSize: e.inputFontSizeSM,
  borderRadius: e.borderRadiusSM
}), Hc = (e) => Object.assign(Object.assign({
  position: "relative",
  display: "inline-block",
  width: "100%",
  minWidth: 0,
  padding: `${Pe(e.paddingBlock)} ${Pe(e.paddingInline)}`,
  color: e.colorText,
  fontSize: e.inputFontSize,
  lineHeight: e.lineHeight,
  borderRadius: e.borderRadius,
  transition: `all ${e.motionDurationMid}`
}, yg(e.colorTextPlaceholder)), {
  // Size
  "&-lg": Object.assign({}, Lc(e)),
  "&-sm": Object.assign({}, zc(e)),
  // RTL
  "&-rtl, &-textarea-rtl": {
    direction: "rtl"
  }
}), Sg = (e) => {
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
    [`&-lg ${t}, &-lg > ${t}-group-addon`]: Object.assign({}, Lc(e)),
    [`&-sm ${t}, &-sm > ${t}-group-addon`]: Object.assign({}, zc(e)),
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
        padding: `0 ${Pe(e.paddingInline)}`,
        color: e.colorText,
        fontWeight: "normal",
        fontSize: e.inputFontSize,
        textAlign: "center",
        borderRadius: e.borderRadius,
        transition: `all ${e.motionDurationSlow}`,
        lineHeight: 1,
        // Reset Select's style in addon
        [`${r}-select`]: {
          margin: `${Pe(e.calc(e.paddingBlock).add(1).mul(-1).equal())} ${Pe(e.calc(e.paddingInline).mul(-1).equal())}`,
          [`&${r}-select-single:not(${r}-select-customize-input):not(${r}-pagination-size-changer)`]: {
            [`${r}-select-selector`]: {
              backgroundColor: "inherit",
              border: `${Pe(e.lineWidth)} ${e.lineType} transparent`,
              boxShadow: "none"
            }
          }
        },
        // https://github.com/ant-design/ant-design/issues/31333
        [`${r}-cascader-picker`]: {
          margin: `-9px ${Pe(e.calc(e.paddingInline).mul(-1).equal())}`,
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
    }, gh()), {
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
}, xg = (e) => {
  const {
    componentCls: t,
    controlHeightSM: r,
    lineWidth: n,
    calc: a
  } = e, o = a(r).sub(a(n).mul(2)).sub(16).div(2).equal();
  return {
    [t]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, lc(e)), Hc(e)), vg(e)), mg(e)), hg(e)), bg(e)), {
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
}, Eg = (e) => {
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
        margin: `0 ${Pe(e.inputAffixPadding)}`
      }
    }
  };
}, Cg = (e) => {
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
    [l]: Object.assign(Object.assign(Object.assign(Object.assign({}, Hc(e)), {
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
    }), Eg(e)), {
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
}, _g = (e) => {
  const {
    componentCls: t,
    borderRadiusLG: r,
    borderRadiusSM: n
  } = e;
  return {
    [`${t}-group`]: Object.assign(Object.assign(Object.assign({}, lc(e)), Sg(e)), {
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
      }, pg(e)), gg(e)), {
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
}, $g = (e) => {
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
}, wg = (e) => {
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
}, Bc = so(["Input", "Shared"], (e) => {
  const t = Kt(e, uo(e));
  return [xg(t), Cg(t)];
}, fo, {
  resetFont: !1
}), Pg = so(["Input", "Component"], (e) => {
  const t = Kt(e, uo(e));
  return [
    _g(t),
    $g(t),
    wg(t),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    dg(t)
  ];
}, fo, {
  resetFont: !1
});
function Og(e) {
  return !!(e.prefix || e.suffix || e.allowClear || e.showCount);
}
var Tg = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const Rg = /* @__PURE__ */ ki((e, t) => {
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
    className: S,
    style: g,
    styles: h,
    rootClassName: f,
    onChange: y,
    classNames: m,
    variant: C
  } = e, T = Tg(e, ["prefixCls", "bordered", "status", "size", "disabled", "onBlur", "onFocus", "suffix", "allowClear", "addonAfter", "addonBefore", "className", "style", "styles", "rootClassName", "onChange", "classNames", "variant"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: fe
    } = qt("Input");
    fe(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: E,
    direction: w,
    allowClear: x,
    autoComplete: R,
    className: F,
    style: M,
    classNames: N,
    styles: z
  } = jl("input"), j = E("input", r), D = ke(null), H = uc(j), [P, $, O] = Bc(j, f), [L] = Pg(j, H), {
    compactSize: k,
    compactItemClassnames: V
  } = Dc(j, w), W = dc((fe) => {
    var ze;
    return (ze = i ?? k) !== null && ze !== void 0 ? ze : fe;
  }), Y = X.useContext(Lr), U = o ?? Y, {
    status: K,
    hasFeedback: Z,
    feedbackIcon: re
  } = Ot(Wr), le = Fl(K, a), ve = Og(e) || !!Z, de = ke(ve);
  if (process.env.NODE_ENV !== "production") {
    const fe = qt("Input");
    bt(() => {
      var ze;
      ve && !de.current && process.env.NODE_ENV !== "production" && fe(document.activeElement === ((ze = D.current) === null || ze === void 0 ? void 0 : ze.input), "usage", "When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ"), de.current = ve;
    }, [ve]);
  }
  const $e = lg(D), we = (fe) => {
    $e(), s == null || s(fe);
  }, De = (fe) => {
    $e(), l == null || l(fe);
  }, q = (fe) => {
    $e(), y == null || y(fe);
  }, Ce = (Z || c) && /* @__PURE__ */ X.createElement(X.Fragment, null, c, Z && re), J = Rl(u ?? x), [ce, Ae] = jc("input", C, n);
  return P(L(/* @__PURE__ */ X.createElement(yf, Object.assign({
    ref: al(t, D),
    prefixCls: j,
    autoComplete: R
  }, T, {
    disabled: U,
    onBlur: we,
    onFocus: De,
    style: Object.assign(Object.assign({}, M), g),
    styles: Object.assign(Object.assign({}, z), h),
    suffix: Ce,
    allowClear: J,
    className: ye(S, f, O, H, V, F),
    onChange: q,
    addonBefore: v && /* @__PURE__ */ X.createElement($s, {
      form: !0,
      space: !0
    }, v),
    addonAfter: d && /* @__PURE__ */ X.createElement($s, {
      form: !0,
      space: !0
    }, d),
    classNames: Object.assign(Object.assign(Object.assign({}, m), N), {
      input: ye({
        [`${j}-sm`]: W === "small",
        [`${j}-lg`]: W === "large",
        [`${j}-rtl`]: w === "rtl"
      }, m == null ? void 0 : m.input, N.input, $),
      variant: ye({
        [`${j}-${ce}`]: Ae
      }, di(j, le)),
      affixWrapper: ye({
        [`${j}-affix-wrapper-sm`]: W === "small",
        [`${j}-affix-wrapper-lg`]: W === "large",
        [`${j}-affix-wrapper-rtl`]: w === "rtl"
      }, $),
      wrapper: ye({
        [`${j}-group-rtl`]: w === "rtl"
      }, $),
      groupWrapper: ye({
        [`${j}-group-wrapper-sm`]: W === "small",
        [`${j}-group-wrapper-lg`]: W === "large",
        [`${j}-group-wrapper-rtl`]: w === "rtl",
        [`${j}-group-wrapper-${ce}`]: Ae
      }, di(`${j}-group-wrapper`, le, Z), $)
    })
  }))));
});
process.env.NODE_ENV !== "production" && (Rg.displayName = "Input");
const Fg = (e) => {
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
}, Ag = so(["Input", "TextArea"], (e) => {
  const t = Kt(e, uo(e));
  return [Fg(t)];
}, fo, {
  resetFont: !1
});
var Mg = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const Lg = /* @__PURE__ */ ki((e, t) => {
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
    styles: S,
    variant: g,
    showCount: h,
    onMouseDown: f,
    onResize: y
  } = e, m = Mg(e, ["prefixCls", "bordered", "size", "disabled", "status", "allowClear", "classNames", "rootClassName", "className", "style", "styles", "variant", "showCount", "onMouseDown", "onResize"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: J
    } = qt("TextArea");
    J(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: C,
    direction: T,
    allowClear: E,
    autoComplete: w,
    className: x,
    style: R,
    classNames: F,
    styles: M
  } = jl("textArea"), N = b.useContext(Lr), z = o ?? N, {
    status: j,
    hasFeedback: D,
    feedbackIcon: H
  } = b.useContext(Wr), P = Fl(j, s), $ = b.useRef(null);
  b.useImperativeHandle(t, () => {
    var J;
    return {
      resizableTextArea: (J = $.current) === null || J === void 0 ? void 0 : J.resizableTextArea,
      focus: (ce) => {
        var Ae, fe;
        Js((fe = (Ae = $.current) === null || Ae === void 0 ? void 0 : Ae.resizableTextArea) === null || fe === void 0 ? void 0 : fe.textArea, ce);
      },
      blur: () => {
        var ce;
        return (ce = $.current) === null || ce === void 0 ? void 0 : ce.blur();
      }
    };
  });
  const O = C("input", n), L = uc(O), [k, V, W] = Bc(O, u), [Y] = Ag(O, L), {
    compactSize: U,
    compactItemClassnames: K
  } = Dc(O, T), Z = dc((J) => {
    var ce;
    return (ce = i ?? U) !== null && ce !== void 0 ? ce : J;
  }), [re, le] = jc("textArea", g, a), ve = Rl(l ?? E), [de, $e] = b.useState(!1), [we, De] = b.useState(!1), q = (J) => {
    $e(!0), f == null || f(J);
    const ce = () => {
      $e(!1), document.removeEventListener("mouseup", ce);
    };
    document.addEventListener("mouseup", ce);
  }, Ce = (J) => {
    var ce, Ae;
    if (y == null || y(J), de && typeof getComputedStyle == "function") {
      const fe = (Ae = (ce = $.current) === null || ce === void 0 ? void 0 : ce.nativeElement) === null || Ae === void 0 ? void 0 : Ae.querySelector("textarea");
      fe && getComputedStyle(fe).resize === "both" && De(!0);
    }
  };
  return k(Y(/* @__PURE__ */ b.createElement(uv, Object.assign({
    autoComplete: w
  }, m, {
    style: Object.assign(Object.assign({}, R), v),
    styles: Object.assign(Object.assign({}, M), S),
    disabled: z,
    allowClear: ve,
    className: ye(
      W,
      L,
      d,
      u,
      K,
      x,
      // Only for wrapper
      we && `${O}-textarea-affix-wrapper-resize-dirty`
    ),
    classNames: Object.assign(Object.assign(Object.assign({}, c), F), {
      textarea: ye({
        [`${O}-sm`]: Z === "small",
        [`${O}-lg`]: Z === "large"
      }, V, c == null ? void 0 : c.textarea, F.textarea, de && `${O}-mouse-active`),
      variant: ye({
        [`${O}-${re}`]: le
      }, di(O, P)),
      affixWrapper: ye(`${O}-textarea-affix-wrapper`, {
        [`${O}-affix-wrapper-rtl`]: T === "rtl",
        [`${O}-affix-wrapper-sm`]: Z === "small",
        [`${O}-affix-wrapper-lg`]: Z === "large",
        [`${O}-textarea-show-count`]: h || ((r = e.count) === null || r === void 0 ? void 0 : r.show)
      }, V)
    }),
    prefixCls: O,
    suffix: D && /* @__PURE__ */ b.createElement("span", {
      className: `${O}-textarea-suffix`
    }, H),
    showCount: h,
    ref: $,
    onResize: Ce,
    onMouseDown: q
  }))));
});
export {
  kg as I,
  Lg as T,
  kd as a,
  Ed as b,
  od as c,
  ef as d,
  Wu as e,
  Ou as f,
  fu as g,
  Ng as j
};
