var Jm = Object.defineProperty;
var ev = (e, t, r) => t in e ? Jm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var X = (e, t, r) => ev(e, typeof t != "symbol" ? t + "" : t, r);
import * as C from "react";
import T, { Component as tv, isValidElement as rv, version as Qf, useRef as Ue, useLayoutEffect as nv, useEffect as Ct, useImperativeHandle as qo, createContext as Go, useInsertionEffect as av, useContext as pr, useMemo as Hr, useState as hr, memo as ov, useCallback as ko, useSyncExternalStore as Ds, cloneElement as iv, forwardRef as rc } from "react";
import { PlusOutlined as sv, RightOutlined as lv, EllipsisOutlined as cv, ClearOutlined as uv, ArrowUpOutlined as dv, AudioMutedOutlined as fv, AudioOutlined as pv, CloseOutlined as hv, CaretDownFilled as gv } from "@ant-design/icons";
import { ConfigProvider as nc, theme as Fs, Flex as Jf, Button as ba, Divider as ep, Typography as mv, Dropdown as tp, Input as rp } from "antd";
import se from "classnames";
import Cu, { createPortal as vv } from "react-dom";
import { g as np, c as mt } from "./vite.js";
var Ls = { exports: {} }, Bn = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _u;
function yv() {
  if (_u) return Bn;
  _u = 1;
  var e = T, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(s, l, c) {
    var u, d = {}, f = null, v = null;
    c !== void 0 && (f = "" + c), l.key !== void 0 && (f = "" + l.key), l.ref !== void 0 && (v = l.ref);
    for (u in l) n.call(l, u) && !o.hasOwnProperty(u) && (d[u] = l[u]);
    if (s && s.defaultProps) for (u in l = s.defaultProps, l) d[u] === void 0 && (d[u] = l[u]);
    return { $$typeof: t, type: s, key: f, ref: v, props: d, _owner: a.current };
  }
  return Bn.Fragment = r, Bn.jsx = i, Bn.jsxs = i, Bn;
}
var Un = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wu;
function bv() {
  return wu || (wu = 1, process.env.NODE_ENV !== "production" && function() {
    var e = T, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), g = Symbol.iterator, h = "@@iterator";
    function p(_) {
      if (_ === null || typeof _ != "object")
        return null;
      var G = g && _[g] || _[h];
      return typeof G == "function" ? G : null;
    }
    var y = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function m(_) {
      {
        for (var G = arguments.length, ne = new Array(G > 1 ? G - 1 : 0), pe = 1; pe < G; pe++)
          ne[pe - 1] = arguments[pe];
        S("error", _, ne);
      }
    }
    function S(_, G, ne) {
      {
        var pe = y.ReactDebugCurrentFrame, ze = pe.getStackAddendum();
        ze !== "" && (G += "%s", ne = ne.concat([ze]));
        var Be = ne.map(function(Pe) {
          return String(Pe);
        });
        Be.unshift("Warning: " + G), Function.prototype.apply.call(console[_], console, Be);
      }
    }
    var E = !1, x = !1, w = !1, b = !1, P = !1, k;
    k = Symbol.for("react.module.reference");
    function M(_) {
      return !!(typeof _ == "string" || typeof _ == "function" || _ === n || _ === o || P || _ === a || _ === c || _ === u || b || _ === v || E || x || w || typeof _ == "object" && _ !== null && (_.$$typeof === f || _.$$typeof === d || _.$$typeof === i || _.$$typeof === s || _.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      _.$$typeof === k || _.getModuleId !== void 0));
    }
    function I(_, G, ne) {
      var pe = _.displayName;
      if (pe)
        return pe;
      var ze = G.displayName || G.name || "";
      return ze !== "" ? ne + "(" + ze + ")" : ne;
    }
    function D(_) {
      return _.displayName || "Context";
    }
    function F(_) {
      if (_ == null)
        return null;
      if (typeof _.tag == "number" && m("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof _ == "function")
        return _.displayName || _.name || null;
      if (typeof _ == "string")
        return _;
      switch (_) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case o:
          return "Profiler";
        case a:
          return "StrictMode";
        case c:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof _ == "object")
        switch (_.$$typeof) {
          case s:
            var G = _;
            return D(G) + ".Consumer";
          case i:
            var ne = _;
            return D(ne._context) + ".Provider";
          case l:
            return I(_, _.render, "ForwardRef");
          case d:
            var pe = _.displayName || null;
            return pe !== null ? pe : F(_.type) || "Memo";
          case f: {
            var ze = _, Be = ze._payload, Pe = ze._init;
            try {
              return F(Pe(Be));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var B = Object.assign, L = 0, A, O, R, H, z, j, W;
    function K() {
    }
    K.__reactDisabledLog = !0;
    function Z() {
      {
        if (L === 0) {
          A = console.log, O = console.info, R = console.warn, H = console.error, z = console.group, j = console.groupCollapsed, W = console.groupEnd;
          var _ = {
            configurable: !0,
            enumerable: !0,
            value: K,
            writable: !0
          };
          Object.defineProperties(console, {
            info: _,
            log: _,
            warn: _,
            error: _,
            group: _,
            groupCollapsed: _,
            groupEnd: _
          });
        }
        L++;
      }
    }
    function Y() {
      {
        if (L--, L === 0) {
          var _ = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: B({}, _, {
              value: A
            }),
            info: B({}, _, {
              value: O
            }),
            warn: B({}, _, {
              value: R
            }),
            error: B({}, _, {
              value: H
            }),
            group: B({}, _, {
              value: z
            }),
            groupCollapsed: B({}, _, {
              value: j
            }),
            groupEnd: B({}, _, {
              value: W
            })
          });
        }
        L < 0 && m("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Q = y.ReactCurrentDispatcher, le;
    function de(_, G, ne) {
      {
        if (le === void 0)
          try {
            throw Error();
          } catch (ze) {
            var pe = ze.stack.trim().match(/\n( *(at )?)/);
            le = pe && pe[1] || "";
          }
        return `
` + le + _;
      }
    }
    var fe = !1, ge;
    {
      var Se = typeof WeakMap == "function" ? WeakMap : Map;
      ge = new Se();
    }
    function $e(_, G) {
      if (!_ || fe)
        return "";
      {
        var ne = ge.get(_);
        if (ne !== void 0)
          return ne;
      }
      var pe;
      fe = !0;
      var ze = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Be;
      Be = Q.current, Q.current = null, Z();
      try {
        if (G) {
          var Pe = function() {
            throw Error();
          };
          if (Object.defineProperty(Pe.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Pe, []);
            } catch (Ye) {
              pe = Ye;
            }
            Reflect.construct(_, [], Pe);
          } else {
            try {
              Pe.call();
            } catch (Ye) {
              pe = Ye;
            }
            _.call(Pe.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ye) {
            pe = Ye;
          }
          _();
        }
      } catch (Ye) {
        if (Ye && pe && typeof Ye.stack == "string") {
          for (var Te = Ye.stack.split(`
`), yt = pe.stack.split(`
`), oe = Te.length - 1, $ = yt.length - 1; oe >= 1 && $ >= 0 && Te[oe] !== yt[$]; )
            $--;
          for (; oe >= 1 && $ >= 0; oe--, $--)
            if (Te[oe] !== yt[$]) {
              if (oe !== 1 || $ !== 1)
                do
                  if (oe--, $--, $ < 0 || Te[oe] !== yt[$]) {
                    var q = `
` + Te[oe].replace(" at new ", " at ");
                    return _.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", _.displayName)), typeof _ == "function" && ge.set(_, q), q;
                  }
                while (oe >= 1 && $ >= 0);
              break;
            }
        }
      } finally {
        fe = !1, Q.current = Be, Y(), Error.prepareStackTrace = ze;
      }
      var ue = _ ? _.displayName || _.name : "", Ge = ue ? de(ue) : "";
      return typeof _ == "function" && ge.set(_, Ge), Ge;
    }
    function Me(_, G, ne) {
      return $e(_, !1);
    }
    function ee(_) {
      var G = _.prototype;
      return !!(G && G.isReactComponent);
    }
    function Ae(_, G, ne) {
      if (_ == null)
        return "";
      if (typeof _ == "function")
        return $e(_, ee(_));
      if (typeof _ == "string")
        return de(_);
      switch (_) {
        case c:
          return de("Suspense");
        case u:
          return de("SuspenseList");
      }
      if (typeof _ == "object")
        switch (_.$$typeof) {
          case l:
            return Me(_.render);
          case d:
            return Ae(_.type, G, ne);
          case f: {
            var pe = _, ze = pe._payload, Be = pe._init;
            try {
              return Ae(Be(ze), G, ne);
            } catch {
            }
          }
        }
      return "";
    }
    var ie = Object.prototype.hasOwnProperty, ye = {}, Ve = y.ReactDebugCurrentFrame;
    function we(_) {
      if (_) {
        var G = _._owner, ne = Ae(_.type, _._source, G ? G.type : null);
        Ve.setExtraStackFrame(ne);
      } else
        Ve.setExtraStackFrame(null);
    }
    function We(_, G, ne, pe, ze) {
      {
        var Be = Function.call.bind(ie);
        for (var Pe in _)
          if (Be(_, Pe)) {
            var Te = void 0;
            try {
              if (typeof _[Pe] != "function") {
                var yt = Error((pe || "React class") + ": " + ne + " type `" + Pe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof _[Pe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw yt.name = "Invariant Violation", yt;
              }
              Te = _[Pe](G, Pe, pe, ne, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (oe) {
              Te = oe;
            }
            Te && !(Te instanceof Error) && (we(ze), m("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", pe || "React class", ne, Pe, typeof Te), we(null)), Te instanceof Error && !(Te.message in ye) && (ye[Te.message] = !0, we(ze), m("Failed %s type: %s", ne, Te.message), we(null));
          }
      }
    }
    var Le = Array.isArray;
    function je(_) {
      return Le(_);
    }
    function Ce(_) {
      {
        var G = typeof Symbol == "function" && Symbol.toStringTag, ne = G && _[Symbol.toStringTag] || _.constructor.name || "Object";
        return ne;
      }
    }
    function ve(_) {
      try {
        return Oe(_), !1;
      } catch {
        return !0;
      }
    }
    function Oe(_) {
      return "" + _;
    }
    function U(_) {
      if (ve(_))
        return m("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ce(_)), Oe(_);
    }
    var te = y.ReactCurrentOwner, J = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, re, ae;
    function He(_) {
      if (ie.call(_, "ref")) {
        var G = Object.getOwnPropertyDescriptor(_, "ref").get;
        if (G && G.isReactWarning)
          return !1;
      }
      return _.ref !== void 0;
    }
    function _e(_) {
      if (ie.call(_, "key")) {
        var G = Object.getOwnPropertyDescriptor(_, "key").get;
        if (G && G.isReactWarning)
          return !1;
      }
      return _.key !== void 0;
    }
    function Ee(_, G) {
      typeof _.ref == "string" && te.current;
    }
    function ce(_, G) {
      {
        var ne = function() {
          re || (re = !0, m("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
        };
        ne.isReactWarning = !0, Object.defineProperty(_, "key", {
          get: ne,
          configurable: !0
        });
      }
    }
    function qe(_, G) {
      {
        var ne = function() {
          ae || (ae = !0, m("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
        };
        ne.isReactWarning = !0, Object.defineProperty(_, "ref", {
          get: ne,
          configurable: !0
        });
      }
    }
    var ct = function(_, G, ne, pe, ze, Be, Pe) {
      var Te = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: _,
        key: G,
        ref: ne,
        props: Pe,
        // Record the component responsible for creating this element.
        _owner: Be
      };
      return Te._store = {}, Object.defineProperty(Te._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Te, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: pe
      }), Object.defineProperty(Te, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ze
      }), Object.freeze && (Object.freeze(Te.props), Object.freeze(Te)), Te;
    };
    function vt(_, G, ne, pe, ze) {
      {
        var Be, Pe = {}, Te = null, yt = null;
        ne !== void 0 && (U(ne), Te = "" + ne), _e(G) && (U(G.key), Te = "" + G.key), He(G) && (yt = G.ref, Ee(G, ze));
        for (Be in G)
          ie.call(G, Be) && !J.hasOwnProperty(Be) && (Pe[Be] = G[Be]);
        if (_ && _.defaultProps) {
          var oe = _.defaultProps;
          for (Be in oe)
            Pe[Be] === void 0 && (Pe[Be] = oe[Be]);
        }
        if (Te || yt) {
          var $ = typeof _ == "function" ? _.displayName || _.name || "Unknown" : _;
          Te && ce(Pe, $), yt && qe(Pe, $);
        }
        return ct(_, Te, yt, ze, pe, te.current, Pe);
      }
    }
    var It = y.ReactCurrentOwner, _r = y.ReactDebugCurrentFrame;
    function ut(_) {
      if (_) {
        var G = _._owner, ne = Ae(_.type, _._source, G ? G.type : null);
        _r.setExtraStackFrame(ne);
      } else
        _r.setExtraStackFrame(null);
    }
    var Lt;
    Lt = !1;
    function Dr(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === t;
    }
    function br() {
      {
        if (It.current) {
          var _ = F(It.current.type);
          if (_)
            return `

Check the render method of \`` + _ + "`.";
        }
        return "";
      }
    }
    function bn(_) {
      return "";
    }
    var wr = {};
    function rt(_) {
      {
        var G = br();
        if (!G) {
          var ne = typeof _ == "string" ? _ : _.displayName || _.name;
          ne && (G = `

Check the top-level render call using <` + ne + ">.");
        }
        return G;
      }
    }
    function Dt(_, G) {
      {
        if (!_._store || _._store.validated || _.key != null)
          return;
        _._store.validated = !0;
        var ne = rt(G);
        if (wr[ne])
          return;
        wr[ne] = !0;
        var pe = "";
        _ && _._owner && _._owner !== It.current && (pe = " It was passed a child from " + F(_._owner.type) + "."), ut(_), m('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ne, pe), ut(null);
      }
    }
    function Fr(_, G) {
      {
        if (typeof _ != "object")
          return;
        if (je(_))
          for (var ne = 0; ne < _.length; ne++) {
            var pe = _[ne];
            Dr(pe) && Dt(pe, G);
          }
        else if (Dr(_))
          _._store && (_._store.validated = !0);
        else if (_) {
          var ze = p(_);
          if (typeof ze == "function" && ze !== _.entries)
            for (var Be = ze.call(_), Pe; !(Pe = Be.next()).done; )
              Dr(Pe.value) && Dt(Pe.value, G);
        }
      }
    }
    function nr(_) {
      {
        var G = _.type;
        if (G == null || typeof G == "string")
          return;
        var ne;
        if (typeof G == "function")
          ne = G.propTypes;
        else if (typeof G == "object" && (G.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        G.$$typeof === d))
          ne = G.propTypes;
        else
          return;
        if (ne) {
          var pe = F(G);
          We(ne, _.props, "prop", pe, _);
        } else if (G.PropTypes !== void 0 && !Lt) {
          Lt = !0;
          var ze = F(G);
          m("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ze || "Unknown");
        }
        typeof G.getDefaultProps == "function" && !G.getDefaultProps.isReactClassApproved && m("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Xt(_) {
      {
        for (var G = Object.keys(_.props), ne = 0; ne < G.length; ne++) {
          var pe = G[ne];
          if (pe !== "children" && pe !== "key") {
            ut(_), m("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", pe), ut(null);
            break;
          }
        }
        _.ref !== null && (ut(_), m("Invalid attribute `ref` supplied to `React.Fragment`."), ut(null));
      }
    }
    var Lr = {};
    function en(_, G, ne, pe, ze, Be) {
      {
        var Pe = M(_);
        if (!Pe) {
          var Te = "";
          (_ === void 0 || typeof _ == "object" && _ !== null && Object.keys(_).length === 0) && (Te += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var yt = bn();
          yt ? Te += yt : Te += br();
          var oe;
          _ === null ? oe = "null" : je(_) ? oe = "array" : _ !== void 0 && _.$$typeof === t ? (oe = "<" + (F(_.type) || "Unknown") + " />", Te = " Did you accidentally export a JSX literal instead of a component?") : oe = typeof _, m("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", oe, Te);
        }
        var $ = vt(_, G, ne, ze, Be);
        if ($ == null)
          return $;
        if (Pe) {
          var q = G.children;
          if (q !== void 0)
            if (pe)
              if (je(q)) {
                for (var ue = 0; ue < q.length; ue++)
                  Fr(q[ue], _);
                Object.freeze && Object.freeze(q);
              } else
                m("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Fr(q, _);
        }
        if (ie.call(G, "key")) {
          var Ge = F(_), Ye = Object.keys(G).filter(function(or) {
            return or !== "key";
          }), ot = Ye.length > 0 ? "{key: someKey, " + Ye.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Lr[Ge + ot]) {
            var Rt = Ye.length > 0 ? "{" + Ye.join(": ..., ") + ": ...}" : "{}";
            m(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ot, Ge, Rt, Ge), Lr[Ge + ot] = !0;
          }
        }
        return _ === n ? Xt($) : nr($), $;
      }
    }
    function dt(_, G, ne) {
      return en(_, G, ne, !0);
    }
    function At(_, G, ne) {
      return en(_, G, ne, !1);
    }
    var ar = At, nt = dt;
    Un.Fragment = n, Un.jsx = ar, Un.jsxs = nt;
  }()), Un;
}
process.env.NODE_ENV === "production" ? Ls.exports = yv() : Ls.exports = bv();
var DR = Ls.exports, ac = {}, ap = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ap);
var Ke = ap.exports, Ko = {};
Object.defineProperty(Ko, "__esModule", {
  value: !0
});
Ko.default = void 0;
var Sv = {
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
Ko.default = Sv;
var Yo = {}, Oa = {}, Xo = {}, op = { exports: {} }, ip = { exports: {} }, sp = { exports: {} }, lp = { exports: {} };
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
})(lp);
var oc = lp.exports, cp = { exports: {} };
(function(e) {
  var t = oc.default;
  function r(n, a) {
    if (t(n) != "object" || !n) return n;
    var o = n[Symbol.toPrimitive];
    if (o !== void 0) {
      var i = o.call(n, a || "default");
      if (t(i) != "object") return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (a === "string" ? String : Number)(n);
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(cp);
var Ev = cp.exports;
(function(e) {
  var t = oc.default, r = Ev;
  function n(a) {
    var o = r(a, "string");
    return t(o) == "symbol" ? o : o + "";
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(sp);
var xv = sp.exports;
(function(e) {
  var t = xv;
  function r(n, a, o) {
    return (a = t(a)) in n ? Object.defineProperty(n, a, {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : n[a] = o, n;
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ip);
var Cv = ip.exports;
(function(e) {
  var t = Cv;
  function r(a, o) {
    var i = Object.keys(a);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(a);
      o && (s = s.filter(function(l) {
        return Object.getOwnPropertyDescriptor(a, l).enumerable;
      })), i.push.apply(i, s);
    }
    return i;
  }
  function n(a) {
    for (var o = 1; o < arguments.length; o++) {
      var i = arguments[o] != null ? arguments[o] : {};
      o % 2 ? r(Object(i), !0).forEach(function(s) {
        t(a, s, i[s]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(i)) : r(Object(i)).forEach(function(s) {
        Object.defineProperty(a, s, Object.getOwnPropertyDescriptor(i, s));
      });
    }
    return a;
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(op);
var Kr = op.exports, Cr = {};
Object.defineProperty(Cr, "__esModule", {
  value: !0
});
Cr.commonLocale = void 0;
Cr.commonLocale = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: !0
};
var _v = Ke.default;
Object.defineProperty(Xo, "__esModule", {
  value: !0
});
Xo.default = void 0;
var $u = _v(Kr), wv = Cr, $v = (0, $u.default)((0, $u.default)({}, wv.commonLocale), {}, {
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
Xo.default = $v;
var ka = {};
Object.defineProperty(ka, "__esModule", {
  value: !0
});
ka.default = void 0;
const Tv = {
  placeholder: "请选择时间",
  rangePlaceholder: ["开始时间", "结束时间"]
};
ka.default = Tv;
var up = Ke.default;
Object.defineProperty(Oa, "__esModule", {
  value: !0
});
Oa.default = void 0;
var Rv = up(Xo), Av = up(ka);
const dp = {
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
  }, Rv.default),
  timePickerLocale: Object.assign({}, Av.default)
};
dp.lang.ok = "确定";
Oa.default = dp;
var Pv = Ke.default;
Object.defineProperty(Yo, "__esModule", {
  value: !0
});
Yo.default = void 0;
var Ov = Pv(Oa);
Yo.default = Ov.default;
var Zo = Ke.default;
Object.defineProperty(ac, "__esModule", {
  value: !0
});
var kv = ac.default = void 0, Mv = Zo(Ko), Nv = Zo(Yo), Iv = Zo(Oa), Dv = Zo(ka);
const jt = "${label}不是一个有效的${type}", Fv = {
  locale: "zh-cn",
  Pagination: Mv.default,
  DatePicker: Iv.default,
  TimePicker: Dv.default,
  Calendar: Nv.default,
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
        string: jt,
        method: jt,
        array: jt,
        object: jt,
        number: jt,
        date: jt,
        boolean: jt,
        integer: jt,
        float: jt,
        regexp: jt,
        email: jt,
        url: jt,
        hex: jt
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
kv = ac.default = Fv;
var Qo = {}, Jo = {};
Object.defineProperty(Jo, "__esModule", {
  value: !0
});
Jo.default = void 0;
var Lv = {
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
Jo.default = Lv;
var ei = {}, Ma = {}, ti = {}, jv = Ke.default;
Object.defineProperty(ti, "__esModule", {
  value: !0
});
ti.default = void 0;
var Tu = jv(Kr), zv = Cr, Hv = (0, Tu.default)((0, Tu.default)({}, zv.commonLocale), {}, {
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
ti.default = Hv;
var Na = {};
Object.defineProperty(Na, "__esModule", {
  value: !0
});
Na.default = void 0;
const Vv = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
Na.default = Vv;
var fp = Ke.default;
Object.defineProperty(Ma, "__esModule", {
  value: !0
});
Ma.default = void 0;
var Bv = fp(ti), Uv = fp(Na);
const Wv = {
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
  }, Bv.default),
  timePickerLocale: Object.assign({}, Uv.default)
};
Ma.default = Wv;
var qv = Ke.default;
Object.defineProperty(ei, "__esModule", {
  value: !0
});
ei.default = void 0;
var Gv = qv(Ma);
ei.default = Gv.default;
var ri = Ke.default;
Object.defineProperty(Qo, "__esModule", {
  value: !0
});
var Kv = Qo.default = void 0, Yv = ri(Jo), Xv = ri(ei), Zv = ri(Ma), Qv = ri(Na);
const zt = "${label} is not a valid ${type}", Jv = {
  locale: "en",
  Pagination: Yv.default,
  DatePicker: Zv.default,
  TimePicker: Qv.default,
  Calendar: Xv.default,
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
        string: zt,
        method: zt,
        array: zt,
        object: zt,
        number: zt,
        date: zt,
        boolean: zt,
        integer: zt,
        float: zt,
        regexp: zt,
        email: zt,
        url: zt,
        hex: zt
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
Kv = Qo.default = Jv;
var ic = {}, ni = {};
Object.defineProperty(ni, "__esModule", {
  value: !0
});
ni.default = void 0;
var ey = {
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
ni.default = ey;
var ai = {}, Ia = {}, oi = {}, ty = Ke.default;
Object.defineProperty(oi, "__esModule", {
  value: !0
});
oi.default = void 0;
var Ru = ty(Kr), ry = Cr, ny = (0, Ru.default)((0, Ru.default)({}, ry.commonLocale), {}, {
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
oi.default = ny;
var Da = {};
Object.defineProperty(Da, "__esModule", {
  value: !0
});
Da.default = void 0;
const ay = {
  placeholder: "Zeit auswählen",
  rangePlaceholder: ["Startzeit", "Endzeit"]
};
Da.default = ay;
var pp = Ke.default;
Object.defineProperty(Ia, "__esModule", {
  value: !0
});
Ia.default = void 0;
var oy = pp(oi), iy = pp(Da);
const sy = {
  lang: Object.assign({
    placeholder: "Datum auswählen",
    rangePlaceholder: ["Startdatum", "Enddatum"],
    shortWeekDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    shortMonths: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
  }, oy.default),
  timePickerLocale: Object.assign({}, iy.default)
};
Ia.default = sy;
var ly = Ke.default;
Object.defineProperty(ai, "__esModule", {
  value: !0
});
ai.default = void 0;
var cy = ly(Ia);
ai.default = cy.default;
var ii = Ke.default;
Object.defineProperty(ic, "__esModule", {
  value: !0
});
var uy = ic.default = void 0, dy = ii(ni), fy = ii(ai), py = ii(Ia), hy = ii(Da);
const Ht = "${label} ist nicht gültig. ${type} erwartet", gy = {
  locale: "de",
  Pagination: dy.default,
  DatePicker: py.default,
  TimePicker: hy.default,
  Calendar: fy.default,
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
        string: Ht,
        method: Ht,
        array: Ht,
        object: Ht,
        number: Ht,
        date: Ht,
        boolean: Ht,
        integer: Ht,
        float: Ht,
        regexp: Ht,
        email: Ht,
        url: Ht,
        hex: Ht
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
uy = ic.default = gy;
var sc = {}, si = {};
Object.defineProperty(si, "__esModule", {
  value: !0
});
si.default = void 0;
var my = {
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
si.default = my;
var li = {}, Fa = {}, ci = {}, vy = Ke.default;
Object.defineProperty(ci, "__esModule", {
  value: !0
});
ci.default = void 0;
var Au = vy(Kr), yy = Cr, by = (0, Au.default)((0, Au.default)({}, yy.commonLocale), {}, {
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
ci.default = by;
var La = {};
Object.defineProperty(La, "__esModule", {
  value: !0
});
La.default = void 0;
const Sy = {
  placeholder: "Seleccionar hora"
};
La.default = Sy;
var hp = Ke.default;
Object.defineProperty(Fa, "__esModule", {
  value: !0
});
Fa.default = void 0;
var Ey = hp(ci), xy = hp(La);
const Cy = {
  lang: Object.assign({
    placeholder: "Seleccionar fecha",
    rangePlaceholder: ["Fecha inicial", "Fecha final"],
    shortWeekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    shortMonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  }, Ey.default),
  timePickerLocale: Object.assign({}, xy.default)
};
Fa.default = Cy;
var _y = Ke.default;
Object.defineProperty(li, "__esModule", {
  value: !0
});
li.default = void 0;
var wy = _y(Fa);
li.default = wy.default;
var ui = Ke.default;
Object.defineProperty(sc, "__esModule", {
  value: !0
});
var $y = sc.default = void 0, Ty = ui(si), Ry = ui(li), Ay = ui(Fa), Py = ui(La);
const Vt = "${label} no es un ${type} válido", Oy = {
  locale: "es",
  Pagination: Ty.default,
  DatePicker: Ay.default,
  TimePicker: Py.default,
  Calendar: Ry.default,
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
        string: Vt,
        method: Vt,
        array: Vt,
        object: Vt,
        number: Vt,
        date: Vt,
        boolean: Vt,
        integer: Vt,
        float: Vt,
        regexp: Vt,
        email: Vt,
        url: Vt,
        hex: Vt
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
$y = sc.default = Oy;
var lc = {}, di = {};
Object.defineProperty(di, "__esModule", {
  value: !0
});
di.default = void 0;
var ky = {
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
di.default = ky;
var fi = {}, ja = {}, pi = {}, My = Ke.default;
Object.defineProperty(pi, "__esModule", {
  value: !0
});
pi.default = void 0;
var Pu = My(Kr), Ny = Cr, Iy = (0, Pu.default)((0, Pu.default)({}, Ny.commonLocale), {}, {
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
pi.default = Iy;
var za = {};
Object.defineProperty(za, "__esModule", {
  value: !0
});
za.default = void 0;
const Dy = {
  placeholder: "Sélectionner l'heure",
  rangePlaceholder: ["Heure de début", "Heure de fin"]
};
za.default = Dy;
var gp = Ke.default;
Object.defineProperty(ja, "__esModule", {
  value: !0
});
ja.default = void 0;
var Fy = gp(pi), Ly = gp(za);
const jy = {
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
  }, Fy.default),
  timePickerLocale: Object.assign({}, Ly.default)
};
ja.default = jy;
var zy = Ke.default;
Object.defineProperty(fi, "__esModule", {
  value: !0
});
fi.default = void 0;
var Hy = zy(ja);
fi.default = Hy.default;
var hi = Ke.default;
Object.defineProperty(lc, "__esModule", {
  value: !0
});
var Vy = lc.default = void 0, By = hi(di), Uy = hi(fi), Wy = hi(ja), qy = hi(za);
const Bt = "La valeur du champ ${label} n'est pas valide pour le type ${type}", Gy = {
  locale: "fr",
  Pagination: By.default,
  DatePicker: Wy.default,
  TimePicker: qy.default,
  Calendar: Uy.default,
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
        string: Bt,
        method: Bt,
        array: Bt,
        object: Bt,
        number: Bt,
        date: Bt,
        boolean: Bt,
        integer: Bt,
        float: Bt,
        regexp: Bt,
        email: Bt,
        url: Bt,
        hex: Bt
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
Vy = lc.default = Gy;
var cc = {}, gi = {};
Object.defineProperty(gi, "__esModule", {
  value: !0
});
gi.default = void 0;
var Ky = {
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
gi.default = Ky;
var mi = {}, Ha = {}, vi = {}, Yy = Ke.default;
Object.defineProperty(vi, "__esModule", {
  value: !0
});
vi.default = void 0;
var Ou = Yy(Kr), Xy = Cr, Zy = (0, Ou.default)((0, Ou.default)({}, Xy.commonLocale), {}, {
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
vi.default = Zy;
var Va = {};
Object.defineProperty(Va, "__esModule", {
  value: !0
});
Va.default = void 0;
const Qy = {
  placeholder: "اختيار الوقت"
};
Va.default = Qy;
var mp = Ke.default;
Object.defineProperty(Ha, "__esModule", {
  value: !0
});
Ha.default = void 0;
var Jy = mp(vi), eb = mp(Va);
const tb = {
  lang: Object.assign({
    placeholder: "اختيار التاريخ",
    rangePlaceholder: ["البداية", "النهاية"],
    yearFormat: "YYYY",
    monthFormat: "MMMM",
    monthBeforeYear: !0,
    shortWeekDays: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    shortMonths: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
  }, Jy.default),
  timePickerLocale: Object.assign({}, eb.default)
};
Ha.default = tb;
var rb = Ke.default;
Object.defineProperty(mi, "__esModule", {
  value: !0
});
mi.default = void 0;
var nb = rb(Ha);
mi.default = nb.default;
var yi = Ke.default;
Object.defineProperty(cc, "__esModule", {
  value: !0
});
var ab = cc.default = void 0, ob = yi(gi), ib = yi(mi), sb = yi(Ha), lb = yi(Va);
const Ut = "ليس ${label} من نوع ${type} صالحًا", cb = {
  locale: "ar",
  Pagination: ob.default,
  DatePicker: sb.default,
  TimePicker: lb.default,
  Calendar: ib.default,
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
        string: Ut,
        method: Ut,
        array: Ut,
        object: Ut,
        number: Ut,
        date: Ut,
        boolean: Ut,
        integer: Ut,
        float: Ut,
        regexp: Ut,
        email: Ut,
        url: Ut,
        hex: Ut
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
ab = cc.default = cb;
var uc = {}, bi = {};
Object.defineProperty(bi, "__esModule", {
  value: !0
});
bi.default = void 0;
var ub = {
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
bi.default = ub;
var Si = {}, Ba = {}, Ei = {}, db = Ke.default;
Object.defineProperty(Ei, "__esModule", {
  value: !0
});
Ei.default = void 0;
var ku = db(Kr), fb = Cr, pb = (0, ku.default)((0, ku.default)({}, fb.commonLocale), {}, {
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
Ei.default = pb;
var Ua = {};
Object.defineProperty(Ua, "__esModule", {
  value: !0
});
Ua.default = void 0;
const hb = {
  placeholder: "Välj tid"
};
Ua.default = hb;
var vp = Ke.default;
Object.defineProperty(Ba, "__esModule", {
  value: !0
});
Ba.default = void 0;
var gb = vp(Ei), mb = vp(Ua);
const vb = {
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
  }, gb.default),
  timePickerLocale: Object.assign({}, mb.default)
};
Ba.default = vb;
var yb = Ke.default;
Object.defineProperty(Si, "__esModule", {
  value: !0
});
Si.default = void 0;
var bb = yb(Ba);
Si.default = bb.default;
var xi = Ke.default;
Object.defineProperty(uc, "__esModule", {
  value: !0
});
var Sb = uc.default = void 0, Eb = xi(bi), xb = xi(Si), Cb = xi(Ba), _b = xi(Ua);
const Wt = "${label} är inte en giltig ${type}", wb = {
  locale: "sv",
  Pagination: Eb.default,
  DatePicker: Cb.default,
  TimePicker: _b.default,
  Calendar: xb.default,
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
        string: Wt,
        method: Wt,
        array: Wt,
        object: Wt,
        number: Wt,
        date: Wt,
        boolean: Wt,
        integer: Wt,
        float: Wt,
        regexp: Wt,
        email: Wt,
        url: Wt,
        hex: Wt
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
Sb = uc.default = wb;
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
var js = function(e, t) {
  return js = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var a in n) n.hasOwnProperty(a) && (r[a] = n[a]);
  }, js(e, t);
};
function $b(e, t) {
  js(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var la = function() {
  return la = Object.assign || function(t) {
    for (var r, n = 1, a = arguments.length; n < a; n++) {
      r = arguments[n];
      for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
    }
    return t;
  }, la.apply(this, arguments);
};
function Tb(e, t, r, n) {
  var a, o = !1, i = 0;
  function s() {
    a && clearTimeout(a);
  }
  function l() {
    s(), o = !0;
  }
  typeof t != "boolean" && (n = r, r = t, t = void 0);
  function c() {
    var u = this, d = Date.now() - i, f = arguments;
    if (o)
      return;
    function v() {
      i = Date.now(), r.apply(u, f);
    }
    function g() {
      a = void 0;
    }
    n && !a && v(), s(), n === void 0 && d > e ? v() : t !== !0 && (a = setTimeout(n ? g : v, n === void 0 ? e - d : e));
  }
  return c.cancel = l, c;
}
var Pn = {
  Pixel: "Pixel",
  Percent: "Percent"
}, Mu = {
  unit: Pn.Percent,
  value: 0.8
};
function Nu(e) {
  return typeof e == "number" ? {
    unit: Pn.Percent,
    value: e * 100
  } : typeof e == "string" ? e.match(/^(\d*(\.\d+)?)px$/) ? {
    unit: Pn.Pixel,
    value: parseFloat(e)
  } : e.match(/^(\d*(\.\d+)?)%$/) ? {
    unit: Pn.Percent,
    value: parseFloat(e)
  } : (console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'), Mu) : (console.warn("scrollThreshold should be string or number"), Mu);
}
var FR = (
  /** @class */
  function(e) {
    $b(t, e);
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
        var o = n.props.height || n._scrollableNode ? a.target : document.documentElement.scrollTop ? document.documentElement : document.body;
        if (!n.actionTriggered) {
          var i = n.props.inverse ? n.isElementAtTop(o, n.props.scrollThreshold) : n.isElementAtBottom(o, n.props.scrollThreshold);
          i && n.props.hasMore && (n.actionTriggered = !0, n.setState({ showLoader: !0 }), n.props.next && n.props.next()), n.lastScrollTop = o.scrollTop;
        }
      }, n.state = {
        showLoader: !1,
        pullToRefreshThresholdBreached: !1,
        prevDataLength: r.dataLength
      }, n.throttledOnScrollListener = Tb(150, n.onScrollListener).bind(n), n.onStart = n.onStart.bind(n), n.onMove = n.onMove.bind(n), n.onEnd = n.onEnd.bind(n), n;
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
      return a ? la(la({}, n), { prevDataLength: r.dataLength }) : null;
    }, t.prototype.isElementAtTop = function(r, n) {
      n === void 0 && (n = 0.8);
      var a = r === document.body || r === document.documentElement ? window.screen.availHeight : r.clientHeight, o = Nu(n);
      return o.unit === Pn.Pixel ? r.scrollTop <= o.value + a - r.scrollHeight + 1 : r.scrollTop <= o.value / 100 + a - r.scrollHeight + 1;
    }, t.prototype.isElementAtBottom = function(r, n) {
      n === void 0 && (n = 0.8);
      var a = r === document.body || r === document.documentElement ? window.screen.availHeight : r.clientHeight, o = Nu(n);
      return o.unit === Pn.Pixel ? r.scrollTop + a >= r.scrollHeight - o.value : r.scrollTop + a >= o.value / 100 * r.scrollHeight;
    }, t.prototype.render = function() {
      var r = this, n = la({ height: this.props.height || "auto", overflow: "auto", WebkitOverflowScrolling: "touch" }, this.props.style), a = this.props.hasChildren || !!(this.props.children && this.props.children instanceof Array && this.props.children.length), o = this.props.pullDownToRefresh && this.props.height ? { overflow: "auto" } : {};
      return T.createElement(
        "div",
        { style: o, className: "infinite-scroll-component__outerdiv" },
        T.createElement(
          "div",
          { className: "infinite-scroll-component " + (this.props.className || ""), ref: function(i) {
            return r._infScroll = i;
          }, style: n },
          this.props.pullDownToRefresh && T.createElement(
            "div",
            { style: { position: "relative" }, ref: function(i) {
              return r._pullDown = i;
            } },
            T.createElement("div", { style: {
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
  }(tv)
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
function me(e) {
  "@babel/helpers - typeof";
  return me = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, me(e);
}
function Rb(e, t) {
  if (me(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (me(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function yp(e) {
  var t = Rb(e, "string");
  return me(t) == "symbol" ? t : t + "";
}
function N(e, t, r) {
  return (t = yp(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function Iu(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function V(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Iu(Object(r), !0).forEach(function(n) {
      N(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Iu(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function bp(e) {
  if (Array.isArray(e)) return e;
}
function Ab(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, o, i, s = [], l = !0, c = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        l = !1;
      } else for (; !(l = (n = o.call(r)).done) && (s.push(n.value), s.length !== t); l = !0) ;
    } catch (u) {
      c = !0, a = u;
    } finally {
      try {
        if (!l && r.return != null && (i = r.return(), Object(i) !== i)) return;
      } finally {
        if (c) throw a;
      }
    }
    return s;
  }
}
function zs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function dc(e, t) {
  if (e) {
    if (typeof e == "string") return zs(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? zs(e, t) : void 0;
  }
}
function Sp() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function he(e, t) {
  return bp(e) || Ab(e, t) || dc(e, t) || Sp();
}
function Du(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}
function Pb(e) {
  return e && me(e) === "object" && Du(e.nativeElement) ? e.nativeElement : Du(e) ? e : null;
}
function Eo(e) {
  var t = Pb(e);
  if (t)
    return t;
  if (e instanceof T.Component) {
    var r;
    return (r = Cu.findDOMNode) === null || r === void 0 ? void 0 : r.call(Cu, e);
  }
  return null;
}
var Hs = { exports: {} }, Ze = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fu;
function Ob() {
  if (Fu) return Ze;
  Fu = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), i = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), g;
  g = Symbol.for("react.module.reference");
  function h(p) {
    if (typeof p == "object" && p !== null) {
      var y = p.$$typeof;
      switch (y) {
        case e:
          switch (p = p.type, p) {
            case r:
            case a:
            case n:
            case c:
            case u:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case s:
                case i:
                case l:
                case f:
                case d:
                case o:
                  return p;
                default:
                  return y;
              }
          }
        case t:
          return y;
      }
    }
  }
  return Ze.ContextConsumer = i, Ze.ContextProvider = o, Ze.Element = e, Ze.ForwardRef = l, Ze.Fragment = r, Ze.Lazy = f, Ze.Memo = d, Ze.Portal = t, Ze.Profiler = a, Ze.StrictMode = n, Ze.Suspense = c, Ze.SuspenseList = u, Ze.isAsyncMode = function() {
    return !1;
  }, Ze.isConcurrentMode = function() {
    return !1;
  }, Ze.isContextConsumer = function(p) {
    return h(p) === i;
  }, Ze.isContextProvider = function(p) {
    return h(p) === o;
  }, Ze.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === e;
  }, Ze.isForwardRef = function(p) {
    return h(p) === l;
  }, Ze.isFragment = function(p) {
    return h(p) === r;
  }, Ze.isLazy = function(p) {
    return h(p) === f;
  }, Ze.isMemo = function(p) {
    return h(p) === d;
  }, Ze.isPortal = function(p) {
    return h(p) === t;
  }, Ze.isProfiler = function(p) {
    return h(p) === a;
  }, Ze.isStrictMode = function(p) {
    return h(p) === n;
  }, Ze.isSuspense = function(p) {
    return h(p) === c;
  }, Ze.isSuspenseList = function(p) {
    return h(p) === u;
  }, Ze.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === r || p === a || p === n || p === c || p === u || p === v || typeof p == "object" && p !== null && (p.$$typeof === f || p.$$typeof === d || p.$$typeof === o || p.$$typeof === i || p.$$typeof === l || p.$$typeof === g || p.getModuleId !== void 0);
  }, Ze.typeOf = h, Ze;
}
var Qe = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lu;
function kb() {
  return Lu || (Lu = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), i = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), g = !1, h = !1, p = !1, y = !1, m = !1, S;
    S = Symbol.for("react.module.reference");
    function E(ee) {
      return !!(typeof ee == "string" || typeof ee == "function" || ee === r || ee === a || m || ee === n || ee === c || ee === u || y || ee === v || g || h || p || typeof ee == "object" && ee !== null && (ee.$$typeof === f || ee.$$typeof === d || ee.$$typeof === o || ee.$$typeof === i || ee.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      ee.$$typeof === S || ee.getModuleId !== void 0));
    }
    function x(ee) {
      if (typeof ee == "object" && ee !== null) {
        var Ae = ee.$$typeof;
        switch (Ae) {
          case e:
            var ie = ee.type;
            switch (ie) {
              case r:
              case a:
              case n:
              case c:
              case u:
                return ie;
              default:
                var ye = ie && ie.$$typeof;
                switch (ye) {
                  case s:
                  case i:
                  case l:
                  case f:
                  case d:
                  case o:
                    return ye;
                  default:
                    return Ae;
                }
            }
          case t:
            return Ae;
        }
      }
    }
    var w = i, b = o, P = e, k = l, M = r, I = f, D = d, F = t, B = a, L = n, A = c, O = u, R = !1, H = !1;
    function z(ee) {
      return R || (R = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function j(ee) {
      return H || (H = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(ee) {
      return x(ee) === i;
    }
    function K(ee) {
      return x(ee) === o;
    }
    function Z(ee) {
      return typeof ee == "object" && ee !== null && ee.$$typeof === e;
    }
    function Y(ee) {
      return x(ee) === l;
    }
    function Q(ee) {
      return x(ee) === r;
    }
    function le(ee) {
      return x(ee) === f;
    }
    function de(ee) {
      return x(ee) === d;
    }
    function fe(ee) {
      return x(ee) === t;
    }
    function ge(ee) {
      return x(ee) === a;
    }
    function Se(ee) {
      return x(ee) === n;
    }
    function $e(ee) {
      return x(ee) === c;
    }
    function Me(ee) {
      return x(ee) === u;
    }
    Qe.ContextConsumer = w, Qe.ContextProvider = b, Qe.Element = P, Qe.ForwardRef = k, Qe.Fragment = M, Qe.Lazy = I, Qe.Memo = D, Qe.Portal = F, Qe.Profiler = B, Qe.StrictMode = L, Qe.Suspense = A, Qe.SuspenseList = O, Qe.isAsyncMode = z, Qe.isConcurrentMode = j, Qe.isContextConsumer = W, Qe.isContextProvider = K, Qe.isElement = Z, Qe.isForwardRef = Y, Qe.isFragment = Q, Qe.isLazy = le, Qe.isMemo = de, Qe.isPortal = fe, Qe.isProfiler = ge, Qe.isStrictMode = Se, Qe.isSuspense = $e, Qe.isSuspenseList = Me, Qe.isValidElementType = E, Qe.typeOf = x;
  }()), Qe;
}
process.env.NODE_ENV === "production" ? Hs.exports = Ob() : Hs.exports = kb();
var Qi = Hs.exports;
function fc(e, t, r) {
  var n = C.useRef({});
  return (!("value" in n.current) || r(n.current.condition, t)) && (n.current.value = e(), n.current.condition = t), n.current.value;
}
var Mb = Symbol.for("react.element"), Nb = Symbol.for("react.transitional.element"), Ib = Symbol.for("react.fragment");
function Ep(e) {
  return (
    // Base object type
    e && me(e) === "object" && // React Element type
    (e.$$typeof === Mb || e.$$typeof === Nb) && // React Fragment type
    e.type === Ib
  );
}
var Db = Number(Qf.split(".")[0]), xp = function(t, r) {
  typeof t == "function" ? t(r) : me(t) === "object" && t && "current" in t && (t.current = r);
}, Cp = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var a = r.filter(Boolean);
  return a.length <= 1 ? a[0] : function(o) {
    r.forEach(function(i) {
      xp(i, o);
    });
  };
}, Fb = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  return fc(function() {
    return Cp.apply(void 0, r);
  }, r, function(a, o) {
    return a.length !== o.length || a.every(function(i, s) {
      return i !== o[s];
    });
  });
}, _p = function(t) {
  var r, n;
  if (!t)
    return !1;
  if (wp(t) && Db >= 19)
    return !0;
  var a = Qi.isMemo(t) ? t.type.type : t.type;
  return !(typeof a == "function" && !((r = a.prototype) !== null && r !== void 0 && r.render) && a.$$typeof !== Qi.ForwardRef || typeof t == "function" && !((n = t.prototype) !== null && n !== void 0 && n.render) && t.$$typeof !== Qi.ForwardRef);
};
function wp(e) {
  return /* @__PURE__ */ rv(e) && !Ep(e);
}
var $p = function(t) {
  if (t && wp(t)) {
    var r = t;
    return r.props.propertyIsEnumerable("ref") ? r.props.ref : r.ref;
  }
  return null;
};
function Lb(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function er(e, t) {
  if (e == null) return {};
  var r, n, a = Lb(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (n = 0; n < o.length; n++) r = o[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (a[r] = e[r]);
  }
  return a;
}
var jb = ["children"], Tp = /* @__PURE__ */ C.createContext({});
function zb(e) {
  var t = e.children, r = er(e, jb);
  return /* @__PURE__ */ C.createElement(Tp.Provider, {
    value: r
  }, t);
}
function _t(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function ju(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, yp(n.key), n);
  }
}
function wt(e, t, r) {
  return t && ju(e.prototype, t), r && ju(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function Sa(e, t) {
  return Sa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, Sa(e, t);
}
function Yr(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Sa(e, t);
}
function Ea(e) {
  return Ea = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Ea(e);
}
function pc() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (pc = function() {
    return !!e;
  })();
}
function Re(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Hb(e, t) {
  if (t && (me(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Re(e);
}
function Xr(e) {
  var t = pc();
  return function() {
    var r, n = Ea(e);
    if (t) {
      var a = Ea(this).constructor;
      r = Reflect.construct(n, arguments, a);
    } else r = n.apply(this, arguments);
    return Hb(this, r);
  };
}
var Vb = /* @__PURE__ */ function(e) {
  Yr(r, e);
  var t = Xr(r);
  function r() {
    return _t(this, r), t.apply(this, arguments);
  }
  return wt(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
}(C.Component);
function xr(e) {
  var t = C.useRef();
  t.current = e;
  var r = C.useCallback(function() {
    for (var n, a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return (n = t.current) === null || n === void 0 ? void 0 : n.call.apply(n, [t].concat(o));
  }, []);
  return r;
}
function Ir() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var zu = process.env.NODE_ENV !== "test" && Ir() ? C.useLayoutEffect : C.useEffect, xa = function(t, r) {
  var n = C.useRef(!0);
  zu(function() {
    return t(n.current);
  }, r), zu(function() {
    return n.current = !1, function() {
      n.current = !0;
    };
  }, []);
}, Hu = function(t, r) {
  xa(function(n) {
    if (!n)
      return t();
  }, r);
};
function Ca(e) {
  var t = C.useRef(!1), r = C.useState(e), n = he(r, 2), a = n[0], o = n[1];
  C.useEffect(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function i(s, l) {
    l && t.current || o(s);
  }
  return [a, i];
}
function Ji(e) {
  return e !== void 0;
}
function Wa(e, t) {
  var r = t || {}, n = r.defaultValue, a = r.value, o = r.onChange, i = r.postState, s = Ca(function() {
    return Ji(a) ? a : Ji(n) ? typeof n == "function" ? n() : n : typeof e == "function" ? e() : e;
  }), l = he(s, 2), c = l[0], u = l[1], d = a !== void 0 ? a : c, f = i ? i(d) : d, v = xr(o), g = Ca([d]), h = he(g, 2), p = h[0], y = h[1];
  Hu(function() {
    var S = p[0];
    c !== S && v(c, S);
  }, [p]), Hu(function() {
    Ji(a) || u(a);
  }, [a]);
  var m = xr(function(S, E) {
    u(S, E), y([d], E);
  });
  return [f, m];
}
function Er(e, t) {
  for (var r = e, n = 0; n < t.length; n += 1) {
    if (r == null)
      return;
    r = r[t[n]];
  }
  return r;
}
function Bb(e) {
  if (Array.isArray(e)) return zs(e);
}
function Rp(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Ub() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xe(e) {
  return Bb(e) || Rp(e) || dc(e) || Ub();
}
function Wb(e) {
  return bp(e) || Rp(e) || dc(e) || Sp();
}
function Ap(e, t, r, n) {
  if (!t.length)
    return r;
  var a = Wb(t), o = a[0], i = a.slice(1), s;
  return !e && typeof o == "number" ? s = [] : Array.isArray(e) ? s = xe(e) : s = V({}, e), n && r === void 0 && i.length === 1 ? delete s[o][i[0]] : s[o] = Ap(s[o], i, r, n), s;
}
function sr(e, t, r) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && n && r === void 0 && !Er(e, t.slice(0, -1)) ? e : Ap(e, t, r, n);
}
function qb(e) {
  return me(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function Vu(e) {
  return Array.isArray(e) ? [] : {};
}
var Gb = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function Tn() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = Vu(t[0]);
  return t.forEach(function(a) {
    function o(i, s) {
      var l = new Set(s), c = Er(a, i), u = Array.isArray(c);
      if (u || qb(c)) {
        if (!l.has(c)) {
          l.add(c);
          var d = Er(n, i);
          u ? n = sr(n, i, []) : (!d || me(d) !== "object") && (n = sr(n, i, Vu(c))), Gb(c).forEach(function(f) {
            o([].concat(xe(i), [f]), l);
          });
        }
      } else
        n = sr(n, i, c);
    }
    o([]);
  }), n;
}
var Vs = {}, hc = [], Kb = function(t) {
  hc.push(t);
};
function _a(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = hc.reduce(function(n, a) {
      return a(n ?? "", "warning");
    }, t);
    r && console.error("Warning: ".concat(r));
  }
}
function Yb(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = hc.reduce(function(n, a) {
      return a(n ?? "", "note");
    }, t);
    r && console.warn("Note: ".concat(r));
  }
}
function Pp() {
  Vs = {};
}
function Op(e, t, r) {
  !t && !Vs[r] && (e(!1, r), Vs[r] = !0);
}
function lt(e, t) {
  Op(_a, e, t);
}
function Xb(e, t) {
  Op(Yb, e, t);
}
lt.preMessage = Kb;
lt.resetWarned = Pp;
lt.noteOnce = Xb;
function Zb(e) {
  var t = C.useReducer(function(s) {
    return s + 1;
  }, 0), r = he(t, 2), n = r[1], a = C.useRef(e), o = xr(function() {
    return a.current;
  }), i = xr(function(s) {
    a.current = typeof s == "function" ? s(a.current) : s, n();
  });
  return [o, i];
}
var jr = "none", to = "appear", ro = "enter", no = "leave", Bu = "none", lr = "prepare", Rn = "start", An = "active", gc = "end", kp = "prepared";
function Uu(e, t) {
  var r = {};
  return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit".concat(e)] = "webkit".concat(t), r["Moz".concat(e)] = "moz".concat(t), r["ms".concat(e)] = "MS".concat(t), r["O".concat(e)] = "o".concat(t.toLowerCase()), r;
}
function Qb(e, t) {
  var r = {
    animationend: Uu("Animation", "AnimationEnd"),
    transitionend: Uu("Transition", "TransitionEnd")
  };
  return e && ("AnimationEvent" in t || delete r.animationend.animation, "TransitionEvent" in t || delete r.transitionend.transition), r;
}
var Jb = Qb(Ir(), typeof window < "u" ? window : {}), Mp = {};
if (Ir()) {
  var e0 = document.createElement("div");
  Mp = e0.style;
}
var ao = {};
function Np(e) {
  if (ao[e])
    return ao[e];
  var t = Jb[e];
  if (t)
    for (var r = Object.keys(t), n = r.length, a = 0; a < n; a += 1) {
      var o = r[a];
      if (Object.prototype.hasOwnProperty.call(t, o) && o in Mp)
        return ao[e] = t[o], ao[e];
    }
  return "";
}
var Ip = Np("animationend"), Dp = Np("transitionend"), Fp = !!(Ip && Dp), Wu = Ip || "animationend", qu = Dp || "transitionend";
function Gu(e, t) {
  if (!e) return null;
  if (me(e) === "object") {
    var r = t.replace(/-\w/g, function(n) {
      return n[1].toUpperCase();
    });
    return e[r];
  }
  return "".concat(e, "-").concat(t);
}
const t0 = function(e) {
  var t = Ue();
  function r(a) {
    a && (a.removeEventListener(qu, e), a.removeEventListener(Wu, e));
  }
  function n(a) {
    t.current && t.current !== a && r(t.current), a && a !== t.current && (a.addEventListener(qu, e), a.addEventListener(Wu, e), t.current = a);
  }
  return C.useEffect(function() {
    return function() {
      r(t.current);
    };
  }, []), [n, r];
};
var Lp = Ir() ? nv : Ct, jp = function(t) {
  return +setTimeout(t, 16);
}, zp = function(t) {
  return clearTimeout(t);
};
typeof window < "u" && "requestAnimationFrame" in window && (jp = function(t) {
  return window.requestAnimationFrame(t);
}, zp = function(t) {
  return window.cancelAnimationFrame(t);
});
var Ku = 0, Ci = /* @__PURE__ */ new Map();
function Hp(e) {
  Ci.delete(e);
}
var kn = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  Ku += 1;
  var n = Ku;
  function a(o) {
    if (o === 0)
      Hp(n), t();
    else {
      var i = jp(function() {
        a(o - 1);
      });
      Ci.set(n, i);
    }
  }
  return a(r), n;
};
kn.cancel = function(e) {
  var t = Ci.get(e);
  return Hp(e), zp(t);
};
process.env.NODE_ENV !== "production" && (kn.ids = function() {
  return Ci;
});
const r0 = function() {
  var e = C.useRef(null);
  function t() {
    kn.cancel(e.current);
  }
  function r(n) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    t();
    var o = kn(function() {
      a <= 1 ? n({
        isCanceled: function() {
          return o !== e.current;
        }
      }) : r(n, a - 1);
    });
    e.current = o;
  }
  return C.useEffect(function() {
    return function() {
      t();
    };
  }, []), [r, t];
};
var n0 = [lr, Rn, An, gc], a0 = [lr, kp], Vp = !1, o0 = !0;
function Bp(e) {
  return e === An || e === gc;
}
const i0 = function(e, t, r) {
  var n = Ca(Bu), a = he(n, 2), o = a[0], i = a[1], s = r0(), l = he(s, 2), c = l[0], u = l[1];
  function d() {
    i(lr, !0);
  }
  var f = t ? a0 : n0;
  return Lp(function() {
    if (o !== Bu && o !== gc) {
      var v = f.indexOf(o), g = f[v + 1], h = r(o);
      h === Vp ? i(g, !0) : g && c(function(p) {
        function y() {
          p.isCanceled() || i(g, !0);
        }
        h === !0 ? y() : Promise.resolve(h).then(y);
      });
    }
  }, [e, o]), C.useEffect(function() {
    return function() {
      u();
    };
  }, []), [d, o];
};
function s0(e, t, r, n) {
  var a = n.motionEnter, o = a === void 0 ? !0 : a, i = n.motionAppear, s = i === void 0 ? !0 : i, l = n.motionLeave, c = l === void 0 ? !0 : l, u = n.motionDeadline, d = n.motionLeaveImmediately, f = n.onAppearPrepare, v = n.onEnterPrepare, g = n.onLeavePrepare, h = n.onAppearStart, p = n.onEnterStart, y = n.onLeaveStart, m = n.onAppearActive, S = n.onEnterActive, E = n.onLeaveActive, x = n.onAppearEnd, w = n.onEnterEnd, b = n.onLeaveEnd, P = n.onVisibleChanged, k = Ca(), M = he(k, 2), I = M[0], D = M[1], F = Zb(jr), B = he(F, 2), L = B[0], A = B[1], O = Ca(null), R = he(O, 2), H = R[0], z = R[1], j = L(), W = Ue(!1), K = Ue(null);
  function Z() {
    return r();
  }
  var Y = Ue(!1);
  function Q() {
    A(jr), z(null, !0);
  }
  var le = xr(function(Le) {
    var je = L();
    if (je !== jr) {
      var Ce = Z();
      if (!(Le && !Le.deadline && Le.target !== Ce)) {
        var ve = Y.current, Oe;
        je === to && ve ? Oe = x == null ? void 0 : x(Ce, Le) : je === ro && ve ? Oe = w == null ? void 0 : w(Ce, Le) : je === no && ve && (Oe = b == null ? void 0 : b(Ce, Le)), ve && Oe !== !1 && Q();
      }
    }
  }), de = t0(le), fe = he(de, 1), ge = fe[0], Se = function(je) {
    switch (je) {
      case to:
        return N(N(N({}, lr, f), Rn, h), An, m);
      case ro:
        return N(N(N({}, lr, v), Rn, p), An, S);
      case no:
        return N(N(N({}, lr, g), Rn, y), An, E);
      default:
        return {};
    }
  }, $e = C.useMemo(function() {
    return Se(j);
  }, [j]), Me = i0(j, !e, function(Le) {
    if (Le === lr) {
      var je = $e[lr];
      return je ? je(Z()) : Vp;
    }
    if (ie in $e) {
      var Ce;
      z(((Ce = $e[ie]) === null || Ce === void 0 ? void 0 : Ce.call($e, Z(), null)) || null);
    }
    return ie === An && j !== jr && (ge(Z()), u > 0 && (clearTimeout(K.current), K.current = setTimeout(function() {
      le({
        deadline: !0
      });
    }, u))), ie === kp && Q(), o0;
  }), ee = he(Me, 2), Ae = ee[0], ie = ee[1], ye = Bp(ie);
  Y.current = ye;
  var Ve = Ue(null);
  Lp(function() {
    if (!(W.current && Ve.current === t)) {
      D(t);
      var Le = W.current;
      W.current = !0;
      var je;
      !Le && t && s && (je = to), Le && t && o && (je = ro), (Le && !t && c || !Le && d && !t && c) && (je = no);
      var Ce = Se(je);
      je && (e || Ce[lr]) ? (A(je), Ae()) : A(jr), Ve.current = t;
    }
  }, [t]), Ct(function() {
    // Cancel appear
    (j === to && !s || // Cancel enter
    j === ro && !o || // Cancel leave
    j === no && !c) && A(jr);
  }, [s, o, c]), Ct(function() {
    return function() {
      W.current = !1, clearTimeout(K.current);
    };
  }, []);
  var we = C.useRef(!1);
  Ct(function() {
    I && (we.current = !0), I !== void 0 && j === jr && ((we.current || I) && (P == null || P(I)), we.current = !0);
  }, [I, j]);
  var We = H;
  return $e[lr] && ie === Rn && (We = V({
    transition: "none"
  }, We)), [j, ie, We, I ?? t];
}
function l0(e) {
  var t = e;
  me(e) === "object" && (t = e.transitionSupport);
  function r(a, o) {
    return !!(a.motionName && t && o !== !1);
  }
  var n = /* @__PURE__ */ C.forwardRef(function(a, o) {
    var i = a.visible, s = i === void 0 ? !0 : i, l = a.removeOnLeave, c = l === void 0 ? !0 : l, u = a.forceRender, d = a.children, f = a.motionName, v = a.leavedClassName, g = a.eventProps, h = C.useContext(Tp), p = h.motion, y = r(a, p), m = Ue(), S = Ue();
    function E() {
      try {
        return m.current instanceof HTMLElement ? m.current : Eo(S.current);
      } catch {
        return null;
      }
    }
    var x = s0(y, s, E, a), w = he(x, 4), b = w[0], P = w[1], k = w[2], M = w[3], I = C.useRef(M);
    M && (I.current = !0);
    var D = C.useCallback(function(R) {
      m.current = R, xp(o, R);
    }, [o]), F, B = V(V({}, g), {}, {
      visible: s
    });
    if (!d)
      F = null;
    else if (b === jr)
      M ? F = d(V({}, B), D) : !c && I.current && v ? F = d(V(V({}, B), {}, {
        className: v
      }), D) : u || !c && !v ? F = d(V(V({}, B), {}, {
        style: {
          display: "none"
        }
      }), D) : F = null;
    else {
      var L;
      P === lr ? L = "prepare" : Bp(P) ? L = "active" : P === Rn && (L = "start");
      var A = Gu(f, "".concat(b, "-").concat(L));
      F = d(V(V({}, B), {}, {
        className: se(Gu(f, b), N(N({}, A, A && L), f, typeof f == "string")),
        style: k
      }), D);
    }
    if (/* @__PURE__ */ C.isValidElement(F) && _p(F)) {
      var O = $p(F);
      O || (F = /* @__PURE__ */ C.cloneElement(F, {
        ref: D
      }));
    }
    return /* @__PURE__ */ C.createElement(Vb, {
      ref: S
    }, F);
  });
  return n.displayName = "CSSMotion", n;
}
const mc = l0(Fp);
var Bs = "add", Us = "keep", Ws = "remove", es = "removed";
function c0(e) {
  var t;
  return e && me(e) === "object" && "key" in e ? t = e : t = {
    key: e
  }, V(V({}, t), {}, {
    key: String(t.key)
  });
}
function qs() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  return e.map(c0);
}
function u0() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = [], n = 0, a = t.length, o = qs(e), i = qs(t);
  o.forEach(function(c) {
    for (var u = !1, d = n; d < a; d += 1) {
      var f = i[d];
      if (f.key === c.key) {
        n < d && (r = r.concat(i.slice(n, d).map(function(v) {
          return V(V({}, v), {}, {
            status: Bs
          });
        })), n = d), r.push(V(V({}, f), {}, {
          status: Us
        })), n += 1, u = !0;
        break;
      }
    }
    u || r.push(V(V({}, c), {}, {
      status: Ws
    }));
  }), n < a && (r = r.concat(i.slice(n).map(function(c) {
    return V(V({}, c), {}, {
      status: Bs
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
      var d = u.key, f = u.status;
      return d !== c || f !== Ws;
    }), r.forEach(function(u) {
      u.key === c && (u.status = Us);
    });
  }), r;
}
var d0 = ["component", "children", "onVisibleChanged", "onAllRemoved"], f0 = ["status"], p0 = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearPrepare", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function h0(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : mc, r = /* @__PURE__ */ function(n) {
    Yr(o, n);
    var a = Xr(o);
    function o() {
      var i;
      _t(this, o);
      for (var s = arguments.length, l = new Array(s), c = 0; c < s; c++)
        l[c] = arguments[c];
      return i = a.call.apply(a, [this].concat(l)), N(Re(i), "state", {
        keyEntities: []
      }), N(Re(i), "removeKey", function(u) {
        i.setState(function(d) {
          var f = d.keyEntities.map(function(v) {
            return v.key !== u ? v : V(V({}, v), {}, {
              status: es
            });
          });
          return {
            keyEntities: f
          };
        }, function() {
          var d = i.state.keyEntities, f = d.filter(function(v) {
            var g = v.status;
            return g !== es;
          }).length;
          f === 0 && i.props.onAllRemoved && i.props.onAllRemoved();
        });
      }), i;
    }
    return wt(o, [{
      key: "render",
      value: function() {
        var s = this, l = this.state.keyEntities, c = this.props, u = c.component, d = c.children, f = c.onVisibleChanged;
        c.onAllRemoved;
        var v = er(c, d0), g = u || C.Fragment, h = {};
        return p0.forEach(function(p) {
          h[p] = v[p], delete v[p];
        }), delete v.keys, /* @__PURE__ */ C.createElement(g, v, l.map(function(p, y) {
          var m = p.status, S = er(p, f0), E = m === Bs || m === Us;
          return /* @__PURE__ */ C.createElement(t, De({}, h, {
            key: S.key,
            visible: E,
            eventProps: S,
            onVisibleChanged: function(w) {
              f == null || f(w, {
                key: S.key
              }), w || s.removeKey(S.key);
            }
          }), function(x, w) {
            return d(V(V({}, x), {}, {
              index: y
            }), w);
          });
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function(s, l) {
        var c = s.keys, u = l.keyEntities, d = qs(c), f = u0(u, d);
        return {
          keyEntities: f.filter(function(v) {
            var g = u.find(function(h) {
              var p = h.key;
              return v.key === p;
            });
            return !(g && g.status === es && v.status === Ws);
          })
        };
      }
    }]), o;
  }(C.Component);
  return N(r, "defaultProps", {
    component: "div"
  }), r;
}
h0(Fp);
var Up = {}, g0 = Ke.default;
Object.defineProperty(Up, "__esModule", {
  value: !0
});
var hn = Up.default = x0, m0 = g0(Kr), v0 = `accept acceptCharset accessKey action allowFullScreen allowTransparency
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
    summary tabIndex target title type useMap value width wmode wrap`, y0 = `onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`, b0 = "".concat(v0, " ").concat(y0).split(/[\s\n]+/), S0 = "aria-", E0 = "data-";
function Yu(e, t) {
  return e.indexOf(t) === 0;
}
function x0(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r;
  t === !1 ? r = {
    aria: !0,
    data: !0,
    attr: !0
  } : t === !0 ? r = {
    aria: !0
  } : r = (0, m0.default)({}, t);
  var n = {};
  return Object.keys(e).forEach(function(a) {
    // Aria
    (r.aria && (a === "role" || Yu(a, S0)) || // Data
    r.data && Yu(a, E0) || // Attr
    r.attr && b0.includes(a)) && (n[a] = e[a]);
  }), n;
}
var Wp = { exports: {} };
(function(e) {
  var t = oc.default;
  function r(a) {
    if (typeof WeakMap != "function") return null;
    var o = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
    return (r = function(l) {
      return l ? i : o;
    })(a);
  }
  function n(a, o) {
    if (!o && a && a.__esModule) return a;
    if (a === null || t(a) != "object" && typeof a != "function") return {
      default: a
    };
    var i = r(o);
    if (i && i.has(a)) return i.get(a);
    var s = {
      __proto__: null
    }, l = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var c in a) if (c !== "default" && {}.hasOwnProperty.call(a, c)) {
      var u = l ? Object.getOwnPropertyDescriptor(a, c) : null;
      u && (u.get || u.set) ? Object.defineProperty(s, c, u) : s[c] = a[c];
    }
    return s.default = a, i && i.set(a, s), s;
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Wp);
var vc = Wp.exports;
function _i(e, t) {
  return qo(e, () => {
    const r = t(), {
      nativeElement: n
    } = r;
    return new Proxy(n, {
      get(a, o) {
        return r[o] ? r[o] : Reflect.get(a, o);
      }
    });
  });
}
const qp = /* @__PURE__ */ T.createContext({}), C0 = {
  classNames: {},
  styles: {},
  className: "",
  style: {},
  shortcutKeys: {}
}, Zr = (e) => {
  const t = T.useContext(qp);
  return T.useMemo(() => ({
    ...C0,
    ...t[e]
  }), [t[e]]);
};
var vr = {};
Object.defineProperty(vr, "__esModule", {
  value: !0
});
vr.call = bc;
var Gp = vr.default = void 0;
vr.note = Yp;
vr.noteOnce = Zp;
vr.preMessage = void 0;
var _0 = vr.resetWarned = Xp;
vr.warning = Kp;
vr.warningOnce = qa;
var Gs = {}, yc = [], w0 = vr.preMessage = function(t) {
  yc.push(t);
};
function Kp(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = yc.reduce(function(n, a) {
      return a(n ?? "", "warning");
    }, t);
    r && console.error("Warning: ".concat(r));
  }
}
function Yp(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = yc.reduce(function(n, a) {
      return a(n ?? "", "note");
    }, t);
    r && console.warn("Note: ".concat(r));
  }
}
function Xp() {
  Gs = {};
}
function bc(e, t, r) {
  !t && !Gs[r] && (e(!1, r), Gs[r] = !0);
}
function qa(e, t) {
  bc(Kp, e, t);
}
function Zp(e, t) {
  bc(Yp, e, t);
}
qa.preMessage = w0;
qa.resetWarned = Xp;
qa.noteOnce = Zp;
Gp = vr.default = qa;
function Qp() {
}
let $r = null;
function $0() {
  $r = null, _0();
}
let wi = Qp;
process.env.NODE_ENV !== "production" && (wi = (e, t, r) => {
  Gp(e, `[antdx: ${t}] ${r}`), process.env.NODE_ENV === "test" && $0();
});
const T0 = /* @__PURE__ */ C.createContext({}), R0 = process.env.NODE_ENV !== "production" ? (e) => {
  const {
    strict: t
  } = C.useContext(T0), r = (n, a, o) => {
    if (!n)
      if (t === !1 && a === "deprecated") {
        const i = $r;
        $r || ($r = {}), $r[e] = $r[e] || [], $r[e].includes(o || "") || $r[e].push(o || ""), i || console.warn("[antd] There exists deprecated usage in your code:", $r);
      } else
        wi(n, e, o);
  };
  return r.deprecated = (n, a, o, i) => {
    r(n, "deprecated", `\`${a}\` is deprecated. Please use \`${o}\` instead.${i ? ` ${i}` : ""}`);
  }, r;
} : () => {
  const e = () => {
  };
  return e.deprecated = Qp, e;
}, Jp = /* @__PURE__ */ Go(void 0);
var A0 = Qo;
const ts = /* @__PURE__ */ np(A0), Vr = {
  locale: "en",
  Conversations: {
    create: "New chat"
  },
  Sender: {
    stopLoading: "Stop loading",
    speechRecording: "Speech recording"
  },
  Actions: {
    feedbackLike: "Like",
    feedbackDislike: "Dislike",
    audio: "Play audio",
    audioRunning: "Audio playing",
    audioError: "Playback error",
    audioLoading: "Loading audio"
  },
  Bubble: {
    editableOk: "OK",
    editableCancel: "Cancel"
  },
  Mermaid: {
    copySuccess: "Copied",
    copy: "Copy code",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    zoomReset: "Reset",
    download: "Download",
    code: "Code",
    image: "Image"
  },
  HighlightCode: {
    copySuccess: "Copied",
    copy: "Copy code"
  }
}, $i = (e, t) => {
  const r = C.useContext(Jp), n = C.useMemo(() => {
    const o = t || (Vr == null ? void 0 : Vr[e]) || (ts == null ? void 0 : ts[e]), i = (r == null ? void 0 : r[e]) ?? {};
    return {
      ...typeof o == "function" ? o() : o,
      ...i || {}
    };
  }, [e, t, r]), a = C.useMemo(() => {
    const o = r == null ? void 0 : r.locale;
    return r != null && r.exist && !o ? Vr.locale : o;
  }, [r]);
  return [n, a];
}, eh = "internalMark", th = (e) => {
  const {
    locale: t = {},
    children: r,
    _ANT_MARK__: n
  } = e;
  process.env.NODE_ENV !== "production" && R0("LocaleProvider")(n === eh, "deprecated", "`LocaleProvider` is deprecated. Please use `locale` with `XProvider` instead: https://x.ant.design/components/x-provider-cn#x-provider-demo-locale");
  const a = C.useMemo(() => ({
    ...t,
    exist: !0
  }), [t]);
  return /* @__PURE__ */ C.createElement(Jp.Provider, {
    value: a
  }, r);
};
process.env.NODE_ENV !== "production" && (th.displayName = "LocaleProvider");
const P0 = "ant";
function gr() {
  const {
    getPrefixCls: e,
    direction: t,
    csp: r,
    iconPrefixCls: n,
    theme: a
  } = T.useContext(nc.ConfigContext);
  return {
    theme: a,
    getPrefixCls: e,
    direction: t,
    csp: r,
    iconPrefixCls: n
  };
}
const O0 = (e) => {
  const {
    actions: t,
    attachments: r,
    bubble: n,
    conversations: a,
    prompts: o,
    sender: i,
    suggestion: s,
    thoughtChain: l,
    welcome: c,
    fileCard: u,
    think: d,
    theme: f,
    locale: v,
    children: g,
    mermaid: h,
    highlightCode: p,
    ...y
  } = e, m = T.useMemo(() => ({
    actions: t,
    attachments: r,
    bubble: n,
    conversations: a,
    prompts: o,
    sender: i,
    suggestion: s,
    thoughtChain: l,
    fileCard: u,
    think: d,
    mermaid: h,
    highlightCode: p,
    welcome: c
  }), [t, r, n, a, o, i, s, l, c, h, d, u, p]);
  let S = g;
  return v && (S = /* @__PURE__ */ T.createElement(th, {
    locale: v,
    _ANT_MARK__: eh
  }, S)), /* @__PURE__ */ T.createElement(qp.Provider, {
    value: m
  }, /* @__PURE__ */ T.createElement(nc, De({}, y, {
    theme: f,
    locale: v
  }), S));
};
process.env.NODE_ENV !== "production" && (O0.displayName = "XProvider");
const Wn = 1e3, qn = 4, xo = 140, Xu = xo / 2, oo = 250, Zu = 500, io = 0.8;
function k0({
  className: e
}) {
  const [t] = $i("Sender", Vr.Sender);
  return /* @__PURE__ */ T.createElement("svg", {
    color: "currentColor",
    viewBox: `0 0 ${Wn} ${Wn}`,
    xmlns: "http://www.w3.org/2000/svg",
    className: e
  }, /* @__PURE__ */ T.createElement("title", null, t.speechRecording), Array.from({
    length: qn
  }).map((r, n) => {
    const a = (Wn - xo * qn) / (qn - 1), o = n * (a + xo), i = Wn / 2 - oo / 2, s = Wn / 2 - Zu / 2;
    return /* @__PURE__ */ T.createElement("rect", {
      fill: "currentColor",
      rx: Xu,
      ry: Xu,
      height: oo,
      width: xo,
      x: o,
      y: i,
      key: n
    }, /* @__PURE__ */ T.createElement("animate", {
      attributeName: "height",
      values: `${oo}; ${Zu}; ${oo}`,
      keyTimes: "0; 0.5; 1",
      dur: `${io}s`,
      begin: `${io / qn * n}s`,
      repeatCount: "indefinite"
    }), /* @__PURE__ */ T.createElement("animate", {
      attributeName: "y",
      values: `${i}; ${s}; ${i}`,
      keyTimes: "0; 0.5; 1",
      dur: `${io}s`,
      begin: `${io / qn * n}s`,
      repeatCount: "indefinite"
    }));
  }));
}
function ur(e) {
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
function Ga() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function M0(e, t) {
  if (!e)
    return !1;
  if (e.contains)
    return e.contains(t);
  let r = t;
  for (; r; ) {
    if (r === e)
      return !0;
    r = r.parentNode;
  }
  return !1;
}
const Qu = "data-rc-order", Ju = "data-rc-priority", N0 = "rc-util-key", Ks = /* @__PURE__ */ new Map();
function rh({
  mark: e
} = {}) {
  return e ? e.startsWith("data-") ? e : `data-${e}` : N0;
}
function Ti(e) {
  return e.attachTo ? e.attachTo : document.querySelector("head") || document.body;
}
function I0(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function Sc(e) {
  return Array.from((Ks.get(e) || e).children).filter((t) => t.tagName === "STYLE");
}
function nh(e, t = {}) {
  if (!Ga())
    return null;
  const {
    csp: r,
    prepend: n,
    priority: a = 0
  } = t, o = I0(n), i = o === "prependQueue", s = document.createElement("style");
  s.setAttribute(Qu, o), i && a && s.setAttribute(Ju, `${a}`), r != null && r.nonce && (s.nonce = r == null ? void 0 : r.nonce), s.innerHTML = e;
  const l = Ti(t), {
    firstChild: c
  } = l;
  if (n) {
    if (i) {
      const u = (t.styles || Sc(l)).filter((d) => {
        if (!["prepend", "prependQueue"].includes(d.getAttribute(Qu)))
          return !1;
        const f = Number(d.getAttribute(Ju) || 0);
        return a >= f;
      });
      if (u.length)
        return l.insertBefore(s, u[u.length - 1].nextSibling), s;
    }
    l.insertBefore(s, c);
  } else
    l.appendChild(s);
  return s;
}
function ah(e, t = {}) {
  let {
    styles: r
  } = t;
  return r || (r = Sc(Ti(t))), r.find((n) => n.getAttribute(rh(t)) === e);
}
function oh(e, t = {}) {
  const r = ah(e, t);
  r && Ti(t).removeChild(r);
}
function D0(e, t) {
  const r = Ks.get(e);
  if (!r || !M0(document, r)) {
    const n = nh("", t), {
      parentNode: a
    } = n;
    Ks.set(e, a), e.removeChild(n);
  }
}
function ca(e, t, r = {}) {
  var l, c, u;
  const n = Ti(r), a = Sc(n), o = {
    ...r,
    styles: a
  };
  D0(n, o);
  const i = ah(t, o);
  if (i)
    return (l = o.csp) != null && l.nonce && i.nonce !== ((c = o.csp) == null ? void 0 : c.nonce) && (i.nonce = (u = o.csp) == null ? void 0 : u.nonce), i.innerHTML !== e && (i.innerHTML = e), i;
  const s = nh(e, o);
  return s.setAttribute(rh(o), t), s;
}
let Ys = {};
const Ec = [], F0 = (e) => {
  Ec.push(e);
};
function ih(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    const r = Ec.reduce((n, a) => a(n ?? "", "warning"), t);
    r && console.error(`Warning: ${r}`);
  }
}
function L0(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    const r = Ec.reduce((n, a) => a(n ?? "", "note"), t);
    r && console.warn(`Note: ${r}`);
  }
}
function j0() {
  Ys = {};
}
function sh(e, t, r) {
  !t && !Ys[r] && (e(!1, r), Ys[r] = !0);
}
function Ka(e, t) {
  sh(ih, e, t);
}
function z0(e, t) {
  sh(L0, e, t);
}
Ka.preMessage = F0;
Ka.resetWarned = j0;
Ka.noteOnce = z0;
const H0 = "%";
function Xs(e) {
  return e.join(H0);
}
let ed = 0, V0 = class {
  constructor(t) {
    X(this, "instanceId");
    /** @private Internal cache map. Do not access this directly */
    X(this, "cache", /* @__PURE__ */ new Map());
    /** @private Record update times for each key */
    X(this, "updateTimes", /* @__PURE__ */ new Map());
    X(this, "extracted", /* @__PURE__ */ new Set());
    this.instanceId = t;
  }
  get(t) {
    return this.opGet(Xs(t));
  }
  /** A fast get cache with `get` concat. */
  opGet(t) {
    return this.cache.get(t) || null;
  }
  update(t, r) {
    return this.opUpdate(Xs(t), r);
  }
  /** A fast get cache with `get` concat. */
  opUpdate(t, r) {
    const n = this.cache.get(t), a = r(n);
    a === null ? (this.cache.delete(t), this.updateTimes.delete(t)) : (this.cache.set(t, a), this.updateTimes.set(t, ed), ed += 1);
  }
};
const xc = "data-token-hash", Nr = "data-css-hash", B0 = "data-cache-path", Br = "__cssinjs_instance__";
function U0() {
  const e = Math.random().toString(12).slice(2);
  if (typeof document < "u" && document.head && document.body) {
    const t = document.body.querySelectorAll(`style[${Nr}]`) || [], {
      firstChild: r
    } = document.head;
    Array.from(t).forEach((a) => {
      a[Br] = a[Br] || e, a[Br] === e && document.head.insertBefore(a, r);
    });
    const n = {};
    Array.from(document.querySelectorAll(`style[${Nr}]`)).forEach((a) => {
      var i;
      const o = a.getAttribute(Nr);
      n[o] ? a[Br] === e && ((i = a.parentNode) == null || i.removeChild(a)) : n[o] = !0;
    });
  }
  return new V0(e);
}
const Ri = /* @__PURE__ */ C.createContext({
  hashPriority: "low",
  cache: U0(),
  defaultCache: !0,
  autoPrefix: !1
});
function W0(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
var Pr;
let q0 = (Pr = class {
  constructor() {
    X(this, "cache");
    X(this, "keys");
    X(this, "cacheCallTimes");
    this.cache = /* @__PURE__ */ new Map(), this.keys = [], this.cacheCallTimes = 0;
  }
  size() {
    return this.keys.length;
  }
  internalGet(t, r = !1) {
    let n = {
      map: this.cache
    };
    return t.forEach((a) => {
      var o;
      n ? n = (o = n == null ? void 0 : n.map) == null ? void 0 : o.get(a) : n = void 0;
    }), n != null && n.value && r && (n.value[1] = this.cacheCallTimes++), n == null ? void 0 : n.value;
  }
  get(t) {
    var r;
    return (r = this.internalGet(t, !0)) == null ? void 0 : r[0];
  }
  has(t) {
    return !!this.internalGet(t);
  }
  set(t, r) {
    if (!this.has(t)) {
      if (this.size() + 1 > Pr.MAX_CACHE_SIZE + Pr.MAX_CACHE_OFFSET) {
        const [a] = this.keys.reduce((o, i) => {
          const [, s] = o;
          return this.internalGet(i)[1] < s ? [i, this.internalGet(i)[1]] : o;
        }, [this.keys[0], this.cacheCallTimes]);
        this.delete(a);
      }
      this.keys.push(t);
    }
    let n = this.cache;
    t.forEach((a, o) => {
      if (o === t.length - 1)
        n.set(a, {
          value: [r, this.cacheCallTimes++]
        });
      else {
        const i = n.get(a);
        i ? i.map || (i.map = /* @__PURE__ */ new Map()) : n.set(a, {
          map: /* @__PURE__ */ new Map()
        }), n = n.get(a).map;
      }
    });
  }
  deleteByPath(t, r) {
    var o;
    const n = t.get(r[0]);
    if (r.length === 1)
      return n.map ? t.set(r[0], {
        map: n.map
      }) : t.delete(r[0]), (o = n.value) == null ? void 0 : o[0];
    const a = this.deleteByPath(n.map, r.slice(1));
    return (!n.map || n.map.size === 0) && !n.value && t.delete(r[0]), a;
  }
  delete(t) {
    if (this.has(t))
      return this.keys = this.keys.filter((r) => !W0(r, t)), this.deleteByPath(this.cache, t);
  }
}, X(Pr, "MAX_CACHE_SIZE", 20), X(Pr, "MAX_CACHE_OFFSET", 5), Pr), td = 0, lh = class {
  constructor(t) {
    X(this, "derivatives");
    X(this, "id");
    this.derivatives = Array.isArray(t) ? t : [t], this.id = td, t.length === 0 && ih(t.length > 0, "[Ant Design CSS-in-JS] Theme should have at least one derivative function."), td += 1;
  }
  getDerivativeToken(t) {
    return this.derivatives.reduce((r, n) => n(t, r), void 0);
  }
};
const rs = new q0();
function G0(e) {
  const t = Array.isArray(e) ? e : [e];
  return rs.has(t) || rs.set(t, new lh(t)), rs.get(t);
}
const K0 = /* @__PURE__ */ new WeakMap(), ns = {};
function Y0(e, t) {
  let r = K0;
  for (let n = 0; n < t.length; n += 1) {
    const a = t[n];
    r.has(a) || r.set(a, /* @__PURE__ */ new WeakMap()), r = r.get(a);
  }
  return r.has(ns) || r.set(ns, e()), r.get(ns);
}
const rd = /* @__PURE__ */ new WeakMap();
function ua(e) {
  let t = rd.get(e) || "";
  return t || (Object.keys(e).forEach((r) => {
    const n = e[r];
    t += r, n instanceof lh ? t += n.id : n && typeof n == "object" ? t += ua(n) : t += n;
  }), t = ur(t), rd.set(e, t)), t;
}
function X0(e, t) {
  return ur(`${t}_${ua(e)}`);
}
const Zs = Ga();
function st(e) {
  return typeof e == "number" ? `${e}px` : e;
}
function Z0(e) {
  const {
    hashCls: t,
    hashPriority: r = "low"
  } = e || {};
  if (!t)
    return "";
  const n = `.${t}`;
  return r === "low" ? `:where(${n})` : n;
}
const Co = (e, t = "") => `--${t ? `${t}-` : ""}${e}`.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase(), Q0 = (e, t, r) => {
  const {
    hashCls: n,
    hashPriority: a = "low"
  } = r || {};
  return Object.keys(e).length ? `${Z0({
    hashCls: n,
    hashPriority: a
  })}.${t}${r != null && r.scope ? `.${r.scope}` : ""}{${Object.entries(e).map(([o, i]) => `${o}:${i};`).join("")}}` : "";
}, ch = (e, t, r) => {
  const {
    hashCls: n,
    hashPriority: a = "low",
    prefix: o,
    unitless: i,
    ignore: s,
    preserve: l
  } = r || {}, c = {}, u = {};
  return Object.entries(e).forEach(([d, f]) => {
    if (l != null && l[d])
      u[d] = f;
    else if ((typeof f == "string" || typeof f == "number") && !(s != null && s[d])) {
      const v = Co(d, o);
      c[v] = typeof f == "number" && !(i != null && i[d]) ? `${f}px` : String(f), u[d] = `var(${v})`;
    }
  }), [u, Q0(c, t, {
    scope: r == null ? void 0 : r.scope,
    hashCls: n,
    hashPriority: a
  })];
};
function J0() {
  return !1;
}
let Qs = !1;
function eS() {
  return Qs;
}
const tS = process.env.NODE_ENV === "production" ? J0 : eS;
if (process.env.NODE_ENV !== "production" && typeof module < "u" && module && module.hot && typeof window < "u") {
  const e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : null;
  if (e && typeof e.webpackHotUpdate == "function") {
    const t = e.webpackHotUpdate;
    e.webpackHotUpdate = (...r) => (Qs = !0, setTimeout(() => {
      Qs = !1;
    }, 0), t(...r));
  }
}
const so = /* @__PURE__ */ new Map();
function Cc(e, t, r, n, a) {
  const {
    cache: o
  } = C.useContext(Ri), i = [e, ...t], s = Xs(i), l = tS(), c = (f) => {
    o.opUpdate(s, (v) => {
      const [g = 0, h] = v || [void 0, void 0];
      let p = h;
      process.env.NODE_ENV !== "production" && h && l && (n == null || n(p, l), p = null);
      const y = p || r(), m = [g, y];
      return f ? f(m) : m;
    });
  };
  C.useMemo(
    () => {
      c();
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [s]
    /* eslint-enable */
  );
  let u = o.opGet(s);
  process.env.NODE_ENV !== "production" && !u && (c(), u = o.opGet(s));
  const d = u[1];
  return av(() => (c(([f, v]) => [f + 1, v]), so.has(s) || (a == null || a(d), so.set(s, !0), Promise.resolve().then(() => {
    so.delete(s);
  })), () => {
    o.opUpdate(s, (f) => {
      const [v = 0, g] = f || [];
      return v - 1 === 0 ? (n == null || n(g, !1), so.delete(s), null) : [v - 1, g];
    });
  }), [s]), d;
}
const rS = {}, nS = process.env.NODE_ENV !== "production" ? "css-dev-only-do-not-override" : "css", tn = /* @__PURE__ */ new Map();
function aS(e) {
  tn.set(e, (tn.get(e) || 0) + 1);
}
function oS(e, t) {
  typeof document < "u" && document.querySelectorAll(`style[${xc}="${e}"]`).forEach((n) => {
    var a;
    n[Br] === t && ((a = n.parentNode) == null || a.removeChild(n));
  });
}
const iS = -1;
function sS(e, t) {
  tn.set(e, (tn.get(e) || 0) - 1);
  const r = /* @__PURE__ */ new Set();
  tn.forEach((n, a) => {
    n <= 0 && r.add(a);
  }), tn.size - r.size > iS && r.forEach((n) => {
    oS(n, t), tn.delete(n);
  });
}
const lS = (e, t, r, n) => {
  let o = {
    ...r.getDerivativeToken(e),
    ...t
  };
  return n && (o = n(o)), o;
}, cS = "token";
function uS(e, t, r) {
  const {
    cache: {
      instanceId: n
    },
    container: a,
    hashPriority: o
  } = pr(Ri), {
    salt: i = "",
    override: s = rS,
    formatToken: l,
    getComputedToken: c,
    cssVar: u
  } = r, d = Y0(() => Object.assign({}, ...t), t), f = ua(d), v = ua(s), g = ua(u);
  return Cc(cS, [i, e.id, f, v, g], () => {
    const p = c ? c(d, s, e) : lS(d, s, e, l), y = {
      ...p
    }, m = `${i}_${u.prefix}`, S = ur(m), E = `${nS}-${ur(m)}`;
    y._tokenKey = X0(y, m);
    const [x, w] = ch(p, u.key, {
      prefix: u.prefix,
      ignore: u.ignore,
      unitless: u.unitless,
      preserve: u.preserve,
      hashPriority: o,
      hashCls: u.hashed ? E : void 0
    });
    return x._hashId = S, aS(u.key), [x, E, y, w, u.key];
  }, ([, , , , p]) => {
    sS(p, n);
  }, ([, , , p, y]) => {
    if (!p)
      return;
    const m = ca(p, ur(`css-var-${y}`), {
      mark: Nr,
      prepend: "queue",
      attachTo: a,
      priority: -999
    });
    m[Br] = n, m.setAttribute(xc, y);
  });
}
var uh = {
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
}, at = "-ms-", da = "-moz-", Xe = "-webkit-", dh = "comm", _c = "rule", wc = "decl", dS = "@import", fS = "@namespace", fh = "@keyframes", pS = "@layer", ph = Math.abs, $c = String.fromCharCode, Js = Object.assign;
function hS(e, t) {
  return bt(e, 0) ^ 45 ? (((t << 2 ^ bt(e, 0)) << 2 ^ bt(e, 1)) << 2 ^ bt(e, 2)) << 2 ^ bt(e, 3) : 0;
}
function hh(e) {
  return e.trim();
}
function Ar(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function ke(e, t, r) {
  return e.replace(t, r);
}
function _o(e, t, r) {
  return e.indexOf(t, r);
}
function bt(e, t) {
  return e.charCodeAt(t) | 0;
}
function dn(e, t, r) {
  return e.slice(t, r);
}
function cr(e) {
  return e.length;
}
function gh(e) {
  return e.length;
}
function oa(e, t) {
  return t.push(e), e;
}
function gS(e, t) {
  return e.map(t).join("");
}
function nd(e, t) {
  return e.filter(function(r) {
    return !Ar(r, t);
  });
}
var Ai = 1, Mn = 1, mh = 0, tr = 0, gt = 0, zn = "";
function Pi(e, t, r, n, a, o, i, s) {
  return { value: e, root: t, parent: r, type: n, props: a, children: o, line: Ai, column: Mn, length: i, return: "", siblings: s };
}
function zr(e, t) {
  return Js(Pi("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function En(e) {
  for (; e.root; )
    e = zr(e.root, { children: [e] });
  oa(e, e.siblings);
}
function mS() {
  return gt;
}
function vS() {
  return gt = tr > 0 ? bt(zn, --tr) : 0, Mn--, gt === 10 && (Mn = 1, Ai--), gt;
}
function dr() {
  return gt = tr < mh ? bt(zn, tr++) : 0, Mn++, gt === 10 && (Mn = 1, Ai++), gt;
}
function Ur() {
  return bt(zn, tr);
}
function wo() {
  return tr;
}
function Oi(e, t) {
  return dn(zn, e, t);
}
function wa(e) {
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
function yS(e) {
  return Ai = Mn = 1, mh = cr(zn = e), tr = 0, [];
}
function bS(e) {
  return zn = "", e;
}
function as(e) {
  return hh(Oi(tr - 1, el(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function SS(e) {
  for (; (gt = Ur()) && gt < 33; )
    dr();
  return wa(e) > 2 || wa(gt) > 3 ? "" : " ";
}
function ES(e, t) {
  for (; --t && dr() && !(gt < 48 || gt > 102 || gt > 57 && gt < 65 || gt > 70 && gt < 97); )
    ;
  return Oi(e, wo() + (t < 6 && Ur() == 32 && dr() == 32));
}
function el(e) {
  for (; dr(); )
    switch (gt) {
      case e:
        return tr;
      case 34:
      case 39:
        e !== 34 && e !== 39 && el(gt);
        break;
      case 40:
        e === 41 && el(e);
        break;
      case 92:
        dr();
        break;
    }
  return tr;
}
function xS(e, t) {
  for (; dr() && e + gt !== 57; )
    if (e + gt === 84 && Ur() === 47)
      break;
  return "/*" + Oi(t, tr - 1) + "*" + $c(e === 47 ? e : dr());
}
function CS(e) {
  for (; !wa(Ur()); )
    dr();
  return Oi(e, tr);
}
function tl(e) {
  return bS($o("", null, null, null, [""], e = yS(e), 0, [0], e));
}
function $o(e, t, r, n, a, o, i, s, l) {
  for (var c = 0, u = 0, d = i, f = 0, v = 0, g = 0, h = 1, p = 1, y = 1, m = 0, S = "", E = a, x = o, w = n, b = S; p; )
    switch (g = m, m = dr()) {
      case 40:
        if (g != 108 && bt(b, d - 1) == 58) {
          _o(b += ke(as(m), "&", "&\f"), "&\f", ph(c ? s[c - 1] : 0)) != -1 && (y = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        b += as(m);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        b += SS(g);
        break;
      case 92:
        b += ES(wo() - 1, 7);
        continue;
      case 47:
        switch (Ur()) {
          case 42:
          case 47:
            oa(_S(xS(dr(), wo()), t, r, l), l), (wa(g || 1) == 5 || wa(Ur() || 1) == 5) && cr(b) && dn(b, -1, void 0) !== " " && (b += " ");
            break;
          default:
            b += "/";
        }
        break;
      case 123 * h:
        s[c++] = cr(b) * y;
      case 125 * h:
      case 59:
      case 0:
        switch (m) {
          case 0:
          case 125:
            p = 0;
          case 59 + u:
            y == -1 && (b = ke(b, /\f/g, "")), v > 0 && (cr(b) - d || h === 0 && g === 47) && oa(v > 32 ? od(b + ";", n, r, d - 1, l) : od(ke(b, " ", "") + ";", n, r, d - 2, l), l);
            break;
          case 59:
            b += ";";
          default:
            if (oa(w = ad(b, t, r, c, u, a, s, S, E = [], x = [], d, o), o), m === 123)
              if (u === 0)
                $o(b, t, w, w, E, o, d, s, x);
              else {
                switch (f) {
                  case 99:
                    if (bt(b, 3) === 110) break;
                  case 108:
                    if (bt(b, 2) === 97) break;
                  default:
                    u = 0;
                  case 100:
                  case 109:
                  case 115:
                }
                u ? $o(e, w, w, n && oa(ad(e, w, w, 0, 0, a, s, S, a, E = [], d, x), x), a, x, d, s, n ? E : x) : $o(b, w, w, w, [""], x, 0, s, x);
              }
        }
        c = u = v = 0, h = y = 1, S = b = "", d = i;
        break;
      case 58:
        d = 1 + cr(b), v = g;
      default:
        if (h < 1) {
          if (m == 123)
            --h;
          else if (m == 125 && h++ == 0 && vS() == 125)
            continue;
        }
        switch (b += $c(m), m * h) {
          case 38:
            y = u > 0 ? 1 : (b += "\f", -1);
            break;
          case 44:
            s[c++] = (cr(b) - 1) * y, y = 1;
            break;
          case 64:
            Ur() === 45 && (b += as(dr())), f = Ur(), u = d = cr(S = b += CS(wo())), m++;
            break;
          case 45:
            g === 45 && cr(b) == 2 && (h = 0);
        }
    }
  return o;
}
function ad(e, t, r, n, a, o, i, s, l, c, u, d) {
  for (var f = a - 1, v = a === 0 ? o : [""], g = gh(v), h = 0, p = 0, y = 0; h < n; ++h)
    for (var m = 0, S = dn(e, f + 1, f = ph(p = i[h])), E = e; m < g; ++m)
      (E = hh(p > 0 ? v[m] + " " + S : ke(S, /&\f/g, v[m]))) && (l[y++] = E);
  return Pi(e, t, r, a === 0 ? _c : s, l, c, u, d);
}
function _S(e, t, r, n) {
  return Pi(e, t, r, dh, $c(mS()), dn(e, 2, -2), 0, n);
}
function od(e, t, r, n, a) {
  return Pi(e, t, r, wc, dn(e, 0, n), dn(e, n + 1, -1), n, a);
}
function vh(e, t, r) {
  switch (hS(e, t)) {
    case 5103:
      return Xe + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
      return Xe + e + e;
    case 4855:
      return Xe + e.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + e;
    case 4789:
      return da + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Xe + e + da + e + at + e + e;
    case 5936:
      switch (bt(e, t + 11)) {
        case 114:
          return Xe + e + at + ke(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return Xe + e + at + ke(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return Xe + e + at + ke(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
    case 6828:
    case 4268:
    case 2903:
      return Xe + e + at + e + e;
    case 6165:
      return Xe + e + at + "flex-" + e + e;
    case 5187:
      return Xe + e + ke(e, /(\w+).+(:[^]+)/, Xe + "box-$1$2" + at + "flex-$1$2") + e;
    case 5443:
      return Xe + e + at + "flex-item-" + ke(e, /flex-|-self/g, "") + (Ar(e, /flex-|baseline/) ? "" : at + "grid-row-" + ke(e, /flex-|-self/g, "")) + e;
    case 4675:
      return Xe + e + at + "flex-line-pack" + ke(e, /align-content|flex-|-self/g, "") + e;
    case 5548:
      return Xe + e + at + ke(e, "shrink", "negative") + e;
    case 5292:
      return Xe + e + at + ke(e, "basis", "preferred-size") + e;
    case 6060:
      return Xe + "box-" + ke(e, "-grow", "") + Xe + e + at + ke(e, "grow", "positive") + e;
    case 4554:
      return Xe + ke(e, /([^-])(transform)/g, "$1" + Xe + "$2") + e;
    case 6187:
      return ke(ke(ke(e, /(zoom-|grab)/, Xe + "$1"), /(image-set)/, Xe + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return ke(e, /(image-set\([^]*)/, Xe + "$1$`$1");
    case 4968:
      return ke(ke(e, /(.+:)(flex-)?(.*)/, Xe + "box-pack:$3" + at + "flex-pack:$3"), /space-between/, "justify") + Xe + e + e;
    case 4200:
      if (!Ar(e, /flex-|baseline/)) return at + "grid-column-align" + dn(e, t) + e;
      break;
    case 2592:
    case 3360:
      return at + ke(e, "template-", "") + e;
    case 4384:
    case 3616:
      return r && r.some(function(n, a) {
        return t = a, Ar(n.props, /grid-\w+-end/);
      }) ? ~_o(e + (r = r[t].value), "span", 0) ? e : at + ke(e, "-start", "") + e + at + "grid-row-span:" + (~_o(r, "span", 0) ? Ar(r, /\d+/) : +Ar(r, /\d+/) - +Ar(e, /\d+/)) + ";" : at + ke(e, "-start", "") + e;
    case 4896:
    case 4128:
      return r && r.some(function(n) {
        return Ar(n.props, /grid-\w+-start/);
      }) ? e : at + ke(ke(e, "-end", "-span"), "span ", "") + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return ke(e, /(.+)-inline(.+)/, Xe + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (cr(e) - 1 - t > 6)
        switch (bt(e, t + 1)) {
          case 109:
            if (bt(e, t + 4) !== 45)
              break;
          case 102:
            return ke(e, /(.+:)(.+)-([^]+)/, "$1" + Xe + "$2-$3$1" + da + (bt(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~_o(e, "stretch", 0) ? vh(ke(e, "stretch", "fill-available"), t, r) + e : e;
        }
      break;
    case 5152:
    case 5920:
      return ke(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(n, a, o, i, s, l, c) {
        return at + a + ":" + o + c + (i ? at + a + "-span:" + (s ? l : +l - +o) + c : "") + e;
      });
    case 4949:
      if (bt(e, t + 6) === 121)
        return ke(e, ":", ":" + Xe) + e;
      break;
    case 6444:
      switch (bt(e, bt(e, 14) === 45 ? 18 : 11)) {
        case 120:
          return ke(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + Xe + (bt(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Xe + "$2$3$1" + at + "$2box$3") + e;
        case 100:
          return ke(e, ":", ":" + at) + e;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return ke(e, "scroll-", "scroll-snap-") + e;
  }
  return e;
}
function Nn(e, t) {
  for (var r = "", n = 0; n < e.length; n++)
    r += t(e[n], n, e, t) || "";
  return r;
}
function rl(e, t, r, n) {
  switch (e.type) {
    case pS:
      if (e.children.length) break;
    case dS:
    case fS:
    case wc:
      return e.return = e.return || e.value;
    case dh:
      return "";
    case fh:
      return e.return = e.value + "{" + Nn(e.children, n) + "}";
    case _c:
      if (!cr(e.value = e.props.join(","))) return "";
  }
  return cr(r = Nn(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function wS(e) {
  var t = gh(e);
  return function(r, n, a, o) {
    for (var i = "", s = 0; s < t; s++)
      i += e[s](r, n, a, o) || "";
    return i;
  };
}
function $S(e, t, r, n) {
  if (e.length > -1 && !e.return)
    switch (e.type) {
      case wc:
        e.return = vh(e.value, e.length, r);
        return;
      case fh:
        return Nn([zr(e, { value: ke(e.value, "@", "@" + Xe) })], n);
      case _c:
        if (e.length)
          return gS(r = e.props, function(a) {
            switch (Ar(a, n = /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                En(zr(e, { props: [ke(a, /:(read-\w+)/, ":" + da + "$1")] })), En(zr(e, { props: [a] })), Js(e, { props: nd(r, n) });
                break;
              case "::placeholder":
                En(zr(e, { props: [ke(a, /:(plac\w+)/, ":" + Xe + "input-$1")] })), En(zr(e, { props: [ke(a, /:(plac\w+)/, ":" + da + "$1")] })), En(zr(e, { props: [ke(a, /:(plac\w+)/, at + "input-$1")] })), En(zr(e, { props: [a] })), Js(e, { props: nd(r, n) });
                break;
            }
            return "";
          });
    }
}
function yh(e, t) {
  const {
    path: r,
    parentSelectors: n
  } = t;
  Ka(!1, `[Ant Design CSS-in-JS] ${r ? `Error in ${r}: ` : ""}${e}${n.length ? ` Selector: ${n.join(" | ")}` : ""}`);
}
const TS = (e, t, r) => {
  if (e === "content") {
    const n = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
    (typeof t != "string" || ["normal", "none", "initial", "inherit", "unset"].indexOf(t) === -1 && !n.test(t) && !t.startsWith("var(") && (t.charAt(0) !== t.charAt(t.length - 1) || t.charAt(0) !== '"' && t.charAt(0) !== "'")) && yh(`You seem to be using a value for 'content' without quotes, try replacing it with \`content: '"${t}"'\`.`, r);
  }
}, RS = (e, t, r) => {
  e === "animation" && r.hashId && t !== "none" && yh(`You seem to be using hashed animation '${t}', in which case 'animationName' with Keyframe as value is recommended.`, r);
}, id = "data-ant-cssinjs-cache-path", bh = "_FILE_STYLE__";
let ln, Sh = !0;
function AS() {
  var e;
  if (!ln && (ln = {}, Ga())) {
    const t = document.createElement("div");
    t.className = id, t.style.position = "fixed", t.style.visibility = "hidden", t.style.top = "-9999px", document.body.appendChild(t);
    let r = getComputedStyle(t).content || "";
    r = r.replace(/^"/, "").replace(/"$/, ""), r.split(";").forEach((a) => {
      const [o, i] = a.split(":");
      ln[o] = i;
    });
    const n = document.querySelector(`style[${id}]`);
    n && (Sh = !1, (e = n.parentNode) == null || e.removeChild(n)), document.body.removeChild(t);
  }
}
function PS(e) {
  return AS(), !!ln[e];
}
function OS(e) {
  const t = ln[e];
  let r = null;
  if (t && Ga())
    if (Sh)
      r = bh;
    else {
      const n = document.querySelector(`style[${Nr}="${ln[e]}"]`);
      n ? r = n.innerHTML : delete ln[e];
    }
  return [r, t];
}
const Eh = "_skip_check_", xh = "_multi_value_";
function os(e, t) {
  return (t ? Nn(tl(e), wS([$S, rl])) : Nn(tl(e), rl)).replace(/\{%%%\:[^;];}/g, ";");
}
function kS(e) {
  return typeof e == "object" && e && (Eh in e || xh in e);
}
function sd(e, t, r) {
  if (!t)
    return e;
  const n = `.${t}`, a = r === "low" ? `:where(${n})` : n;
  return e.split(",").map((i) => {
    var u;
    const s = i.trim().split(/\s+/);
    let l = s[0] || "";
    const c = ((u = l.match(/^\w+/)) == null ? void 0 : u[0]) || "";
    return l = `${c}${a}${l.slice(c.length)}`, [l, ...s.slice(1)].join(" ");
  }).join(",");
}
const nl = (e, t = {}, {
  root: r,
  injectHash: n,
  parentSelectors: a
} = {
  root: !0,
  parentSelectors: []
}) => {
  const {
    hashId: o,
    layer: i,
    path: s,
    hashPriority: l,
    transformers: c = [],
    linters: u = []
  } = t;
  let d = "", f = {};
  function v(p) {
    const y = p.getName(o);
    if (!f[y]) {
      const [m] = nl(p.style, t, {
        root: !1,
        parentSelectors: a
      });
      f[y] = `@keyframes ${p.getName(o)}${m}`;
    }
  }
  function g(p, y = []) {
    return p.forEach((m) => {
      Array.isArray(m) ? g(m, y) : m && y.push(m);
    }), y;
  }
  return g(Array.isArray(e) ? e : [e]).forEach((p) => {
    const y = typeof p == "string" && !r ? {} : p;
    if (typeof y == "string")
      d += `${y}
`;
    else if (y._keyframe)
      v(y);
    else {
      const m = c.reduce((S, E) => {
        var x;
        return ((x = E == null ? void 0 : E.visit) == null ? void 0 : x.call(E, S)) || S;
      }, y);
      Object.keys(m).forEach((S) => {
        const E = m[S];
        if (typeof E == "object" && E && (S !== "animationName" || !E._keyframe) && !kS(E)) {
          let x = !1, w = S.trim(), b = !1;
          (r || n) && o ? w.startsWith("@") ? x = !0 : w === "&" ? w = sd("", o, l) : w = sd(S, o, l) : r && !o && (w === "&" || w === "") && (w = "", b = !0);
          const [P, k] = nl(E, t, {
            root: b,
            injectHash: x,
            parentSelectors: [...a, w]
          });
          f = {
            ...f,
            ...k
          }, d += `${w}${P}`;
        } else {
          let x = function(b, P) {
            process.env.NODE_ENV !== "production" && (typeof E != "object" || !(E != null && E[Eh])) && [TS, RS, ...u].forEach((I) => I(b, P, {
              path: s,
              hashId: o,
              parentSelectors: a
            }));
            const k = b.replace(/[A-Z]/g, (I) => `-${I.toLowerCase()}`);
            let M = P;
            !uh[b] && typeof M == "number" && M !== 0 && (M = `${M}px`), b === "animationName" && (P != null && P._keyframe) && (v(P), M = P.getName(o)), d += `${k}:${M};`;
          };
          const w = (E == null ? void 0 : E.value) ?? E;
          typeof E == "object" && (E != null && E[xh]) && Array.isArray(w) ? w.forEach((b) => {
            x(S, b);
          }) : x(S, w);
        }
      });
    }
  }), r ? i && (d && (d = `@layer ${i.name} {${d}}`), i.dependencies && (f[`@layer ${i.name}`] = i.dependencies.map((p) => `@layer ${p}, ${i.name};`).join(`
`))) : d = `{${d}}`, [d, f];
};
function Ch(e, t) {
  return ur(`${e.join("%")}${t}`);
}
const MS = "style";
function ld(e, t) {
  const {
    path: r,
    hashId: n,
    layer: a,
    nonce: o,
    clientOnly: i,
    order: s = 0
  } = e, {
    mock: l,
    hashPriority: c,
    container: u,
    transformers: d,
    linters: f,
    cache: v,
    layer: g,
    autoPrefix: h
  } = C.useContext(Ri), p = [n || ""];
  g && p.push("layer"), p.push(...r);
  let y = Zs;
  process.env.NODE_ENV !== "production" && l !== void 0 && (y = l === "client"), Cc(
    MS,
    p,
    // Create cache if needed
    () => {
      const m = p.join("|");
      if (PS(m)) {
        const [P, k] = OS(m);
        if (P)
          return [P, k, {}, i, s];
      }
      const S = t(), [E, x] = nl(S, {
        hashId: n,
        hashPriority: c,
        layer: g ? a : void 0,
        path: r.join("-"),
        transformers: d,
        linters: f
      }), w = os(E, h || !1), b = Ch(p, w);
      return [w, b, x, i, s];
    },
    // Remove cache if no need
    (m, S) => {
      const [, E] = m;
      S && Zs && oh(E, {
        mark: Nr,
        attachTo: u
      });
    },
    // Effect: Inject style here
    (m) => {
      const [S, E, x, , w] = m;
      if (y && S !== bh) {
        const b = {
          mark: Nr,
          prepend: g ? !1 : "queue",
          attachTo: u,
          priority: w
        }, P = typeof o == "function" ? o() : o;
        P && (b.csp = {
          nonce: P
        });
        const k = [], M = [];
        Object.keys(x).forEach((D) => {
          D.startsWith("@layer") ? k.push(D) : M.push(D);
        }), k.forEach((D) => {
          ca(os(x[D], h || !1), `_layer-${D}`, {
            ...b,
            prepend: !0
          });
        });
        const I = ca(S, E, b);
        I[Br] = v.instanceId, process.env.NODE_ENV !== "production" && I.setAttribute(B0, p.join("|")), M.forEach((D) => {
          ca(os(x[D], h || !1), `_effect-${D}`, b);
        });
      }
    }
  );
}
const NS = "cssVar", IS = (e, t) => {
  const {
    key: r,
    prefix: n,
    unitless: a,
    ignore: o,
    token: i,
    hashId: s,
    scope: l = ""
  } = e, {
    cache: {
      instanceId: c
    },
    container: u,
    hashPriority: d
  } = pr(Ri), {
    _tokenKey: f
  } = i, v = [...e.path, r, l, f];
  return Cc(NS, v, () => {
    const h = t(), [p, y] = ch(h, r, {
      prefix: n,
      unitless: a,
      ignore: o,
      scope: l,
      hashPriority: d,
      hashCls: s
    }), m = Ch(v, y);
    return [p, y, m, r];
  }, ([, , h]) => {
    Zs && oh(h, {
      mark: Nr,
      attachTo: u
    });
  }, ([, h, p]) => {
    if (!h)
      return;
    const y = ca(h, p, {
      mark: Nr,
      prepend: "queue",
      attachTo: u,
      priority: -999
    });
    y[Br] = c, y.setAttribute(xc, r);
  });
};
class Tc {
  constructor(t, r) {
    X(this, "name");
    X(this, "style");
    X(this, "_keyframe", !0);
    this.name = t, this.style = r;
  }
  getName(t = "") {
    return t ? `${t}-${this.name}` : this.name;
  }
}
function xn(e) {
  return e.notSplit = !0, e;
}
xn(["borderTop", "borderBottom"]), xn(["borderTop"]), xn(["borderBottom"]), xn(["borderLeft", "borderRight"]), xn(["borderLeft"]), xn(["borderRight"]);
var DS = /* @__PURE__ */ wt(function e() {
  _t(this, e);
}), _h = "CALC_UNIT", FS = new RegExp(_h, "g");
function is(e) {
  return typeof e == "number" ? "".concat(e).concat(_h) : e;
}
var LS = /* @__PURE__ */ function(e) {
  Yr(r, e);
  var t = Xr(r);
  function r(n, a) {
    var o;
    _t(this, r), o = t.call(this), N(Re(o), "result", ""), N(Re(o), "unitlessCssVar", void 0), N(Re(o), "lowPriority", void 0);
    var i = me(n);
    return o.unitlessCssVar = a, n instanceof r ? o.result = "(".concat(n.result, ")") : i === "number" ? o.result = is(n) : i === "string" && (o.result = n), o;
  }
  return wt(r, [{
    key: "add",
    value: function(a) {
      return a instanceof r ? this.result = "".concat(this.result, " + ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " + ").concat(is(a))), this.lowPriority = !0, this;
    }
  }, {
    key: "sub",
    value: function(a) {
      return a instanceof r ? this.result = "".concat(this.result, " - ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " - ").concat(is(a))), this.lowPriority = !0, this;
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
      var o = this, i = a || {}, s = i.unit, l = !0;
      return typeof s == "boolean" ? l = s : Array.from(this.unitlessCssVar).some(function(c) {
        return o.result.includes(c);
      }) && (l = !1), this.result = this.result.replace(FS, l ? "px" : ""), typeof this.lowPriority < "u" ? "calc(".concat(this.result, ")") : this.result;
    }
  }]), r;
}(DS), jS = function(t, r) {
  var n = LS;
  return function(a) {
    return new n(a, r);
  };
}, cd = function(t, r) {
  return "".concat([r, t.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-"));
};
process.env.NODE_ENV !== "test" && Ga() ? C.useLayoutEffect : C.useEffect;
Number(Qf.split(".")[0]);
function ud(e, t, r, n) {
  var a = V({}, t[e]);
  if (n != null && n.deprecatedTokens) {
    var o = n.deprecatedTokens;
    o.forEach(function(s) {
      var l = he(s, 2), c = l[0], u = l[1];
      if (process.env.NODE_ENV !== "production" && Ka(!(a != null && a[c]), "Component Token `".concat(String(c), "` of ").concat(String(e), " is deprecated. Please use `").concat(String(u), "` instead.")), a != null && a[c] || a != null && a[u]) {
        var d;
        (d = a[u]) !== null && d !== void 0 || (a[u] = a == null ? void 0 : a[c]);
      }
    });
  }
  var i = V(V({}, r), a);
  return Object.keys(i).forEach(function(s) {
    i[s] === t[s] && delete i[s];
  }), i;
}
var wh = process.env.NODE_ENV !== "production" || typeof CSSINJS_STATISTIC < "u", al = !0;
function Ya() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  if (!wh)
    return Object.assign.apply(Object, [{}].concat(t));
  al = !1;
  var n = {};
  return t.forEach(function(a) {
    if (me(a) === "object") {
      var o = Object.keys(a);
      o.forEach(function(i) {
        Object.defineProperty(n, i, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return a[i];
          }
        });
      });
    }
  }), al = !0, n;
}
var dd = {};
function zS() {
}
var HS = function(t) {
  var r, n = t, a = zS;
  return wh && typeof Proxy < "u" && (r = /* @__PURE__ */ new Set(), n = new Proxy(t, {
    get: function(i, s) {
      if (al) {
        var l;
        (l = r) === null || l === void 0 || l.add(s);
      }
      return i[s];
    }
  }), a = function(i, s) {
    var l;
    dd[i] = {
      global: Array.from(r),
      component: V(V({}, (l = dd[i]) === null || l === void 0 ? void 0 : l.component), s)
    };
  }), {
    token: n,
    keys: r,
    flush: a
  };
};
function fd(e, t, r) {
  if (typeof r == "function") {
    var n;
    return r(Ya(t, (n = t[e]) !== null && n !== void 0 ? n : {}));
  }
  return r ?? {};
}
function VS(e) {
  return {
    max: function() {
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      return "max(".concat(n.map(function(o) {
        return st(o);
      }).join(","), ")");
    },
    min: function() {
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      return "min(".concat(n.map(function(o) {
        return st(o);
      }).join(","), ")");
    }
  };
}
var BS = 1e3 * 60 * 10, US = /* @__PURE__ */ function() {
  function e() {
    _t(this, e), N(this, "map", /* @__PURE__ */ new Map()), N(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), N(this, "nextID", 0), N(this, "lastAccessBeat", /* @__PURE__ */ new Map()), N(this, "accessBeat", 0);
  }
  return wt(e, [{
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
      var n = this, a = r.map(function(o) {
        return o && me(o) === "object" ? "obj_".concat(n.getObjectID(o)) : "".concat(me(o), "_").concat(o);
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
        this.lastAccessBeat.forEach(function(a, o) {
          n - a > BS && (r.map.delete(o), r.lastAccessBeat.delete(o));
        }), this.accessBeat = 0;
      }
    }
  }]), e;
}(), pd = new US();
function WS(e, t) {
  return T.useMemo(function() {
    var r = pd.get(t);
    if (r)
      return r;
    var n = e();
    return pd.set(t, n), n;
  }, t);
}
var qS = function() {
  return {};
};
function GS(e) {
  var t = e.useCSP, r = t === void 0 ? qS : t, n = e.useToken, a = e.usePrefix, o = e.getResetStyles, i = e.getCommonStyle, s = e.getCompUnitless;
  function l(f, v, g, h) {
    var p = Array.isArray(f) ? f[0] : f;
    function y(P) {
      return "".concat(String(p)).concat(P.slice(0, 1).toUpperCase()).concat(P.slice(1));
    }
    var m = (h == null ? void 0 : h.unitless) || {}, S = typeof s == "function" ? s(f) : {}, E = V(V({}, S), {}, N({}, y("zIndexPopup"), !0));
    Object.keys(m).forEach(function(P) {
      E[y(P)] = m[P];
    });
    var x = V(V({}, h), {}, {
      unitless: E,
      prefixToken: y
    }), w = u(f, v, g, x), b = c(p, g, x);
    return function(P) {
      var k = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : P, M = w(P, k), I = b(k);
      return [M, I];
    };
  }
  function c(f, v, g) {
    var h = g.unitless, p = g.prefixToken, y = g.ignore;
    return function(m) {
      var S = n(), E = S.cssVar, x = S.realToken;
      return IS({
        path: [f],
        prefix: E.prefix,
        key: E.key,
        unitless: h,
        ignore: y,
        token: x,
        scope: m
      }, function() {
        var w = fd(f, x, v), b = ud(f, x, w, {
          deprecatedTokens: g == null ? void 0 : g.deprecatedTokens
        });
        return w && Object.keys(w).forEach(function(P) {
          b[p(P)] = b[P], delete b[P];
        }), b;
      }), E == null ? void 0 : E.key;
    };
  }
  function u(f, v, g) {
    var h = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, p = Array.isArray(f) ? f : [f, f], y = he(p, 1), m = y[0], S = p.join("-"), E = e.layer || {
      name: "antd"
    };
    return function(x) {
      var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : x, b = n(), P = b.theme, k = b.realToken, M = b.hashId, I = b.token, D = b.cssVar, F = b.zeroRuntime, B = Hr(function() {
        return F;
      }, []);
      if (B)
        return M;
      var L = a(), A = L.rootPrefixCls, O = L.iconPrefixCls, R = r(), H = "css", z = WS(function() {
        var Y = /* @__PURE__ */ new Set();
        return Object.keys(h.unitless || {}).forEach(function(Q) {
          Y.add(Co(Q, D.prefix)), Y.add(Co(Q, cd(m, D.prefix)));
        }), jS(H, Y);
      }, [H, m, D == null ? void 0 : D.prefix]), j = VS(), W = j.max, K = j.min, Z = {
        theme: P,
        token: I,
        hashId: M,
        nonce: function() {
          return R.nonce;
        },
        clientOnly: h.clientOnly,
        layer: E,
        // antd is always at top of styles
        order: h.order || -999
      };
      return typeof o == "function" && ld(V(V({}, Z), {}, {
        clientOnly: !1,
        path: ["Shared", A]
      }), function() {
        return o(I, {
          prefix: {
            rootPrefixCls: A,
            iconPrefixCls: O
          },
          csp: R
        });
      }), ld(V(V({}, Z), {}, {
        path: [S, x, O]
      }), function() {
        if (h.injectStyle === !1)
          return [];
        var Y = HS(I), Q = Y.token, le = Y.flush, de = fd(m, k, g), fe = ".".concat(x), ge = ud(m, k, de, {
          deprecatedTokens: h.deprecatedTokens
        });
        de && me(de) === "object" && Object.keys(de).forEach(function(ee) {
          de[ee] = "var(".concat(Co(ee, cd(m, D.prefix)), ")");
        });
        var Se = Ya(Q, {
          componentCls: fe,
          prefixCls: x,
          iconCls: ".".concat(O),
          antCls: ".".concat(A),
          calc: z,
          max: W,
          min: K
        }, de), $e = v(Se, {
          hashId: M,
          prefixCls: x,
          rootPrefixCls: A,
          iconPrefixCls: O
        });
        le(m, ge);
        var Me = typeof i == "function" ? i(Se, x, w, h.resetFont) : null;
        return [h.resetStyle === !1 ? null : Me, $e];
      }), M;
    };
  }
  function d(f, v, g) {
    var h = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, p = u(f, v, g, V({
      resetStyle: !1,
      // Sub Style should default after root one
      order: -998
    }, h)), y = function(S) {
      var E = S.prefixCls, x = S.rootCls, w = x === void 0 ? E : x;
      return p(E, w), null;
    };
    return process.env.NODE_ENV !== "production" && (y.displayName = "SubStyle_".concat(String(Array.isArray(f) ? f.join(".") : f))), y;
  }
  return {
    genStyleHooks: l,
    genSubStyleComponent: d,
    genComponentStyleHook: u
  };
}
const KS = (e) => ({
  [e.componentCls]: {
    [`${e.antCls}-motion-collapse-legacy`]: {
      overflow: "hidden",
      "&-active": {
        transition: `height ${e.motionDurationMid} ${e.motionEaseInOut},
        opacity ${e.motionDurationMid} ${e.motionEaseInOut} !important`
      }
    },
    [`${e.antCls}-motion-collapse`]: {
      overflow: "hidden",
      transition: `height ${e.motionDurationMid} ${e.motionEaseInOut},
        opacity ${e.motionDurationMid} ${e.motionEaseInOut} !important`
    }
  }
}), YS = {
  aliceblue: "9ehhb",
  antiquewhite: "9sgk7",
  aqua: "1ekf",
  aquamarine: "4zsno",
  azure: "9eiv3",
  beige: "9lhp8",
  bisque: "9zg04",
  black: "0",
  blanchedalmond: "9zhe5",
  blue: "73",
  blueviolet: "5e31e",
  brown: "6g016",
  burlywood: "8ouiv",
  cadetblue: "3qba8",
  chartreuse: "4zshs",
  chocolate: "87k0u",
  coral: "9yvyo",
  cornflowerblue: "3xael",
  cornsilk: "9zjz0",
  crimson: "8l4xo",
  cyan: "1ekf",
  darkblue: "3v",
  darkcyan: "rkb",
  darkgoldenrod: "776yz",
  darkgray: "6mbhl",
  darkgreen: "jr4",
  darkgrey: "6mbhl",
  darkkhaki: "7ehkb",
  darkmagenta: "5f91n",
  darkolivegreen: "3bzfz",
  darkorange: "9yygw",
  darkorchid: "5z6x8",
  darkred: "5f8xs",
  darksalmon: "9441m",
  darkseagreen: "5lwgf",
  darkslateblue: "2th1n",
  darkslategray: "1ugcv",
  darkslategrey: "1ugcv",
  darkturquoise: "14up",
  darkviolet: "5rw7n",
  deeppink: "9yavn",
  deepskyblue: "11xb",
  dimgray: "442g9",
  dimgrey: "442g9",
  dodgerblue: "16xof",
  firebrick: "6y7tu",
  floralwhite: "9zkds",
  forestgreen: "1cisi",
  fuchsia: "9y70f",
  gainsboro: "8m8kc",
  ghostwhite: "9pq0v",
  goldenrod: "8j4f4",
  gold: "9zda8",
  gray: "50i2o",
  green: "pa8",
  greenyellow: "6senj",
  grey: "50i2o",
  honeydew: "9eiuo",
  hotpink: "9yrp0",
  indianred: "80gnw",
  indigo: "2xcoy",
  ivory: "9zldc",
  khaki: "9edu4",
  lavenderblush: "9ziet",
  lavender: "90c8q",
  lawngreen: "4vk74",
  lemonchiffon: "9zkct",
  lightblue: "6s73a",
  lightcoral: "9dtog",
  lightcyan: "8s1rz",
  lightgoldenrodyellow: "9sjiq",
  lightgray: "89jo3",
  lightgreen: "5nkwg",
  lightgrey: "89jo3",
  lightpink: "9z6wx",
  lightsalmon: "9z2ii",
  lightseagreen: "19xgq",
  lightskyblue: "5arju",
  lightslategray: "4nwk9",
  lightslategrey: "4nwk9",
  lightsteelblue: "6wau6",
  lightyellow: "9zlcw",
  lime: "1edc",
  limegreen: "1zcxe",
  linen: "9shk6",
  magenta: "9y70f",
  maroon: "4zsow",
  mediumaquamarine: "40eju",
  mediumblue: "5p",
  mediumorchid: "79qkz",
  mediumpurple: "5r3rv",
  mediumseagreen: "2d9ip",
  mediumslateblue: "4tcku",
  mediumspringgreen: "1di2",
  mediumturquoise: "2uabw",
  mediumvioletred: "7rn9h",
  midnightblue: "z980",
  mintcream: "9ljp6",
  mistyrose: "9zg0x",
  moccasin: "9zfzp",
  navajowhite: "9zest",
  navy: "3k",
  oldlace: "9wq92",
  olive: "50hz4",
  olivedrab: "472ub",
  orange: "9z3eo",
  orangered: "9ykg0",
  orchid: "8iu3a",
  palegoldenrod: "9bl4a",
  palegreen: "5yw0o",
  paleturquoise: "6v4ku",
  palevioletred: "8k8lv",
  papayawhip: "9zi6t",
  peachpuff: "9ze0p",
  peru: "80oqn",
  pink: "9z8wb",
  plum: "8nba5",
  powderblue: "6wgdi",
  purple: "4zssg",
  rebeccapurple: "3zk49",
  red: "9y6tc",
  rosybrown: "7cv4f",
  royalblue: "2jvtt",
  saddlebrown: "5fmkz",
  salmon: "9rvci",
  sandybrown: "9jn1c",
  seagreen: "1tdnb",
  seashell: "9zje6",
  sienna: "6973h",
  silver: "7ir40",
  skyblue: "5arjf",
  slateblue: "45e4t",
  slategray: "4e100",
  slategrey: "4e100",
  snow: "9zke2",
  springgreen: "1egv",
  steelblue: "2r1kk",
  tan: "87yx8",
  teal: "pds",
  thistle: "8ggk8",
  tomato: "9yqfb",
  turquoise: "2j4r4",
  violet: "9b10u",
  wheat: "9ld4j",
  white: "9zldr",
  whitesmoke: "9lhpx",
  yellow: "9zl6o",
  yellowgreen: "61fzm"
}, Et = Math.round;
function ss(e, t) {
  const r = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], n = r.map((a) => parseFloat(a));
  for (let a = 0; a < 3; a += 1)
    n[a] = t(n[a] || 0, r[a] || "", a);
  return r[3] ? n[3] = r[3].includes("%") ? n[3] / 100 : n[3] : n[3] = 1, n;
}
const hd = (e, t, r) => r === 0 ? e : e / 100;
function Gn(e, t) {
  const r = t || 255;
  return e > r ? r : e < 0 ? 0 : e;
}
let Jt = class $h {
  constructor(t) {
    /**
     * All FastColor objects are valid. So isValid is always true. This property is kept to be compatible with TinyColor.
     */
    X(this, "isValid", !0);
    /**
     * Red, R in RGB
     */
    X(this, "r", 0);
    /**
     * Green, G in RGB
     */
    X(this, "g", 0);
    /**
     * Blue, B in RGB
     */
    X(this, "b", 0);
    /**
     * Alpha/Opacity, A in RGBA/HSLA
     */
    X(this, "a", 1);
    // HSV privates
    X(this, "_h");
    X(this, "_s");
    X(this, "_l");
    X(this, "_v");
    // intermediate variables to calculate HSL/HSV
    X(this, "_max");
    X(this, "_min");
    X(this, "_brightness");
    function r(n) {
      return n[0] in t && n[1] in t && n[2] in t;
    }
    if (t) if (typeof t == "string") {
      let a = function(o) {
        return n.startsWith(o);
      };
      const n = t.trim();
      if (/^#?[A-F\d]{3,8}$/i.test(n))
        this.fromHexString(n);
      else if (a("rgb"))
        this.fromRgbString(n);
      else if (a("hsl"))
        this.fromHslString(n);
      else if (a("hsv") || a("hsb"))
        this.fromHsvString(n);
      else {
        const o = YS[n.toLowerCase()];
        o && this.fromHexString(
          // Convert 36 hex to 16 hex
          parseInt(o, 36).toString(16).padStart(6, "0")
        );
      }
    } else if (t instanceof $h)
      this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this._h = t._h, this._s = t._s, this._l = t._l, this._v = t._v;
    else if (r("rgb"))
      this.r = Gn(t.r), this.g = Gn(t.g), this.b = Gn(t.b), this.a = typeof t.a == "number" ? Gn(t.a, 1) : 1;
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
    function t(o) {
      const i = o / 255;
      return i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
    }
    const r = t(this.r), n = t(this.g), a = t(this.b);
    return 0.2126 * r + 0.7152 * n + 0.0722 * a;
  }
  getHue() {
    if (typeof this._h > "u") {
      const t = this.getMax() - this.getMin();
      t === 0 ? this._h = 0 : this._h = Et(60 * (this.r === this.getMax() ? (this.g - this.b) / t + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / t + 2 : (this.r - this.g) / t + 4));
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
    const n = this._c(t), a = r / 100, o = (s) => (n[s] - this[s]) * a + this[s], i = {
      r: Et(o("r")),
      g: Et(o("g")),
      b: Et(o("b")),
      a: Et(o("a") * 100) / 100
    };
    return this._c(i);
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
    const r = this._c(t), n = this.a + r.a * (1 - this.a), a = (o) => Et((this[o] * this.a + r[o] * r.a * (1 - this.a)) / n);
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
      const o = Et(this.a * 255).toString(16);
      t += o.length === 2 ? o : "0" + o;
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
    const t = this.getHue(), r = Et(this.getSaturation() * 100), n = Et(this.getLightness() * 100);
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
    return a[t] = Gn(r, n), a;
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
    function n(a, o) {
      return parseInt(r[a] + r[o || a], 16);
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
      const f = Et(n * 255);
      this.r = f, this.g = f, this.b = f;
    }
    let o = 0, i = 0, s = 0;
    const l = t / 60, c = (1 - Math.abs(2 * n - 1)) * r, u = c * (1 - Math.abs(l % 2 - 1));
    l >= 0 && l < 1 ? (o = c, i = u) : l >= 1 && l < 2 ? (o = u, i = c) : l >= 2 && l < 3 ? (i = c, s = u) : l >= 3 && l < 4 ? (i = u, s = c) : l >= 4 && l < 5 ? (o = u, s = c) : l >= 5 && l < 6 && (o = c, s = u);
    const d = n - c / 2;
    this.r = Et((o + d) * 255), this.g = Et((i + d) * 255), this.b = Et((s + d) * 255);
  }
  fromHsv({
    h: t,
    s: r,
    v: n,
    a
  }) {
    this._h = t % 360, this._s = r, this._v = n, this.a = typeof a == "number" ? a : 1;
    const o = Et(n * 255);
    if (this.r = o, this.g = o, this.b = o, r <= 0)
      return;
    const i = t / 60, s = Math.floor(i), l = i - s, c = Et(n * (1 - r) * 255), u = Et(n * (1 - r * l) * 255), d = Et(n * (1 - r * (1 - l)) * 255);
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
    const r = ss(t, hd);
    this.fromHsv({
      h: r[0],
      s: r[1],
      v: r[2],
      a: r[3]
    });
  }
  fromHslString(t) {
    const r = ss(t, hd);
    this.fromHsl({
      h: r[0],
      s: r[1],
      l: r[2],
      a: r[3]
    });
  }
  fromRgbString(t) {
    const r = ss(t, (n, a) => (
      // Convert percentage to number. e.g. 50% -> 128
      a.includes("%") ? Et(n / 100 * 255) : n
    ));
    this.r = r[0], this.g = r[1], this.b = r[2], this.a = r[3];
  }
};
function XS(e, t) {
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
var gd = "data-rc-order", md = "data-rc-priority", ZS = "rc-util-key", ol = /* @__PURE__ */ new Map();
function Th() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.mark;
  return t ? t.startsWith("data-") ? t : "data-".concat(t) : ZS;
}
function ki(e) {
  if (e.attachTo)
    return e.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function QS(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function Rc(e) {
  return Array.from((ol.get(e) || e).children).filter(function(t) {
    return t.tagName === "STYLE";
  });
}
function Rh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Ir())
    return null;
  var r = t.csp, n = t.prepend, a = t.priority, o = a === void 0 ? 0 : a, i = QS(n), s = i === "prependQueue", l = document.createElement("style");
  l.setAttribute(gd, i), s && o && l.setAttribute(md, "".concat(o)), r != null && r.nonce && (l.nonce = r == null ? void 0 : r.nonce), l.innerHTML = e;
  var c = ki(t), u = c.firstChild;
  if (n) {
    if (s) {
      var d = (t.styles || Rc(c)).filter(function(f) {
        if (!["prepend", "prependQueue"].includes(f.getAttribute(gd)))
          return !1;
        var v = Number(f.getAttribute(md) || 0);
        return o >= v;
      });
      if (d.length)
        return c.insertBefore(l, d[d.length - 1].nextSibling), l;
    }
    c.insertBefore(l, u);
  } else
    c.appendChild(l);
  return l;
}
function Ah(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = ki(t);
  return (t.styles || Rc(r)).find(function(n) {
    return n.getAttribute(Th(t)) === e;
  });
}
function Ph(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = Ah(e, t);
  if (r) {
    var n = ki(t);
    n.removeChild(r);
  }
}
function JS(e, t) {
  var r = ol.get(e);
  if (!r || !XS(document, r)) {
    var n = Rh("", t), a = n.parentNode;
    ol.set(e, a), e.removeChild(n);
  }
}
function cn(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = ki(r), a = Rc(n), o = V(V({}, r), {}, {
    styles: a
  });
  JS(n, o);
  var i = Ah(t, o);
  if (i) {
    var s, l;
    if ((s = o.csp) !== null && s !== void 0 && s.nonce && i.nonce !== ((l = o.csp) === null || l === void 0 ? void 0 : l.nonce)) {
      var c;
      i.nonce = (c = o.csp) === null || c === void 0 ? void 0 : c.nonce;
    }
    return i.innerHTML !== e && (i.innerHTML = e), i;
  }
  var u = Rh(e, o);
  return u.setAttribute(Th(o), t), u;
}
function il(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = /* @__PURE__ */ new Set();
  function a(o, i) {
    var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, l = n.has(o);
    if (lt(!l, "Warning: There may be circular references"), l)
      return !1;
    if (o === i)
      return !0;
    if (r && s > 1)
      return !1;
    n.add(o);
    var c = s + 1;
    if (Array.isArray(o)) {
      if (!Array.isArray(i) || o.length !== i.length)
        return !1;
      for (var u = 0; u < o.length; u++)
        if (!a(o[u], i[u], c))
          return !1;
      return !0;
    }
    if (o && i && me(o) === "object" && me(i) === "object") {
      var d = Object.keys(o);
      return d.length !== Object.keys(i).length ? !1 : d.every(function(f) {
        return a(o[f], i[f], c);
      });
    }
    return !1;
  }
  return a(e, t);
}
var eE = "%";
function sl(e) {
  return e.join(eE);
}
var tE = /* @__PURE__ */ function() {
  function e(t) {
    _t(this, e), N(this, "instanceId", void 0), N(this, "cache", /* @__PURE__ */ new Map()), this.instanceId = t;
  }
  return wt(e, [{
    key: "get",
    value: function(r) {
      return this.opGet(sl(r));
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
      return this.opUpdate(sl(r), n);
    }
    /** A fast get cache with `get` concat. */
  }, {
    key: "opUpdate",
    value: function(r, n) {
      var a = this.cache.get(r), o = n(a);
      o === null ? this.cache.delete(r) : this.cache.set(r, o);
    }
  }]), e;
}(), In = "data-token-hash", fr = "data-css-hash", rE = "data-cache-path", Wr = "__cssinjs_instance__";
function nE() {
  var e = Math.random().toString(12).slice(2);
  if (typeof document < "u" && document.head && document.body) {
    var t = document.body.querySelectorAll("style[".concat(fr, "]")) || [], r = document.head.firstChild;
    Array.from(t).forEach(function(a) {
      a[Wr] = a[Wr] || e, a[Wr] === e && document.head.insertBefore(a, r);
    });
    var n = {};
    Array.from(document.querySelectorAll("style[".concat(fr, "]"))).forEach(function(a) {
      var o = a.getAttribute(fr);
      if (n[o]) {
        if (a[Wr] === e) {
          var i;
          (i = a.parentNode) === null || i === void 0 || i.removeChild(a);
        }
      } else
        n[o] = !0;
    });
  }
  return new tE(e);
}
var Xa = /* @__PURE__ */ C.createContext({
  hashPriority: "low",
  cache: nE(),
  defaultCache: !0
});
function aE(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
var Ac = /* @__PURE__ */ function() {
  function e() {
    _t(this, e), N(this, "cache", void 0), N(this, "keys", void 0), N(this, "cacheCallTimes", void 0), this.cache = /* @__PURE__ */ new Map(), this.keys = [], this.cacheCallTimes = 0;
  }
  return wt(e, [{
    key: "size",
    value: function() {
      return this.keys.length;
    }
  }, {
    key: "internalGet",
    value: function(r) {
      var n, a, o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, i = {
        map: this.cache
      };
      return r.forEach(function(s) {
        if (!i)
          i = void 0;
        else {
          var l;
          i = (l = i) === null || l === void 0 || (l = l.map) === null || l === void 0 ? void 0 : l.get(s);
        }
      }), (n = i) !== null && n !== void 0 && n.value && o && (i.value[1] = this.cacheCallTimes++), (a = i) === null || a === void 0 ? void 0 : a.value;
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
          var o = this.keys.reduce(function(c, u) {
            var d = he(c, 2), f = d[1];
            return a.internalGet(u)[1] < f ? [u, a.internalGet(u)[1]] : c;
          }, [this.keys[0], this.cacheCallTimes]), i = he(o, 1), s = i[0];
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
        var o;
        return a.map ? r.set(n[0], {
          map: a.map
        }) : r.delete(n[0]), (o = a.value) === null || o === void 0 ? void 0 : o[0];
      }
      var i = this.deleteByPath(a.map, n.slice(1));
      return (!a.map || a.map.size === 0) && !a.value && r.delete(n[0]), i;
    }
  }, {
    key: "delete",
    value: function(r) {
      if (this.has(r))
        return this.keys = this.keys.filter(function(n) {
          return !aE(n, r);
        }), this.deleteByPath(this.cache, r);
    }
  }]), e;
}();
N(Ac, "MAX_CACHE_SIZE", 20);
N(Ac, "MAX_CACHE_OFFSET", 5);
var vd = 0, Oh = /* @__PURE__ */ function() {
  function e(t) {
    _t(this, e), N(this, "derivatives", void 0), N(this, "id", void 0), this.derivatives = Array.isArray(t) ? t : [t], this.id = vd, t.length === 0 && _a(t.length > 0, "[Ant Design CSS-in-JS] Theme should have at least one derivative function."), vd += 1;
  }
  return wt(e, [{
    key: "getDerivativeToken",
    value: function(r) {
      return this.derivatives.reduce(function(n, a) {
        return a(r, n);
      }, void 0);
    }
  }]), e;
}(), ls = new Ac();
function ll(e) {
  var t = Array.isArray(e) ? e : [e];
  return ls.has(t) || ls.set(t, new Oh(t)), ls.get(t);
}
var oE = /* @__PURE__ */ new WeakMap(), cs = {};
function iE(e, t) {
  for (var r = oE, n = 0; n < t.length; n += 1) {
    var a = t[n];
    r.has(a) || r.set(a, /* @__PURE__ */ new WeakMap()), r = r.get(a);
  }
  return r.has(cs) || r.set(cs, e()), r.get(cs);
}
var yd = /* @__PURE__ */ new WeakMap();
function fa(e) {
  var t = yd.get(e) || "";
  return t || (Object.keys(e).forEach(function(r) {
    var n = e[r];
    t += r, n instanceof Oh ? t += n.id : n && me(n) === "object" ? t += fa(n) : t += n;
  }), t = ur(t), yd.set(e, t)), t;
}
function bd(e, t) {
  return ur("".concat(t, "_").concat(fa(e)));
}
var cl = Ir();
function it(e) {
  return typeof e == "number" ? "".concat(e, "px") : e;
}
function Mo(e, t, r) {
  var n, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
  if (o)
    return e;
  var i = V(V({}, a), {}, (n = {}, N(n, In, t), N(n, fr, r), n)), s = Object.keys(i).map(function(l) {
    var c = i[l];
    return c ? "".concat(l, '="').concat(c, '"') : null;
  }).filter(function(l) {
    return l;
  }).join(" ");
  return "<style ".concat(s, ">").concat(e, "</style>");
}
var To = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return "--".concat(r ? "".concat(r, "-") : "").concat(t).replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
}, sE = function(t, r, n) {
  return Object.keys(t).length ? ".".concat(r).concat(n != null && n.scope ? ".".concat(n.scope) : "", "{").concat(Object.entries(t).map(function(a) {
    var o = he(a, 2), i = o[0], s = o[1];
    return "".concat(i, ":").concat(s, ";");
  }).join(""), "}") : "";
}, kh = function(t, r, n) {
  var a = {}, o = {};
  return Object.entries(t).forEach(function(i) {
    var s, l, c = he(i, 2), u = c[0], d = c[1];
    if (n != null && (s = n.preserve) !== null && s !== void 0 && s[u])
      o[u] = d;
    else if ((typeof d == "string" || typeof d == "number") && !(n != null && (l = n.ignore) !== null && l !== void 0 && l[u])) {
      var f, v = To(u, n == null ? void 0 : n.prefix);
      a[v] = typeof d == "number" && !(n != null && (f = n.unitless) !== null && f !== void 0 && f[u]) ? "".concat(d, "px") : String(d), o[u] = "var(".concat(v, ")");
    }
  }), [o, sE(a, r, {
    scope: n == null ? void 0 : n.scope
  })];
}, lE = V({}, C), Sd = lE.useInsertionEffect, cE = function(t, r, n) {
  C.useMemo(t, n), xa(function() {
    return r(!0);
  }, n);
}, uE = Sd ? function(e, t, r) {
  return Sd(function() {
    return e(), t();
  }, r);
} : cE, dE = V({}, C), fE = dE.useInsertionEffect, pE = function(t) {
  var r = [], n = !1;
  function a(o) {
    if (n) {
      process.env.NODE_ENV !== "production" && _a(!1, "[Ant Design CSS-in-JS] You are registering a cleanup function after unmount, which will not have any effect.");
      return;
    }
    r.push(o);
  }
  return C.useEffect(function() {
    return n = !1, function() {
      n = !0, r.length && r.forEach(function(o) {
        return o();
      });
    };
  }, t), a;
}, hE = function() {
  return function(t) {
    t();
  };
}, gE = typeof fE < "u" ? pE : hE;
function mE() {
  return !1;
}
var ul = !1;
function vE() {
  return ul;
}
const yE = process.env.NODE_ENV === "production" ? mE : vE;
if (process.env.NODE_ENV !== "production" && typeof module < "u" && module && module.hot && typeof window < "u") {
  var lo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : null;
  if (lo && typeof lo.webpackHotUpdate == "function") {
    var bE = lo.webpackHotUpdate;
    lo.webpackHotUpdate = function() {
      return ul = !0, setTimeout(function() {
        ul = !1;
      }, 0), bE.apply(void 0, arguments);
    };
  }
}
function Pc(e, t, r, n, a) {
  var o = C.useContext(Xa), i = o.cache, s = [e].concat(xe(t)), l = sl(s), c = gE([l]), u = yE(), d = function(h) {
    i.opUpdate(l, function(p) {
      var y = p || [void 0, void 0], m = he(y, 2), S = m[0], E = S === void 0 ? 0 : S, x = m[1], w = x;
      process.env.NODE_ENV !== "production" && x && u && (n == null || n(w, u), w = null);
      var b = w || r(), P = [E, b];
      return h ? h(P) : P;
    });
  };
  C.useMemo(
    function() {
      d();
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [l]
    /* eslint-enable */
  );
  var f = i.opGet(l);
  process.env.NODE_ENV !== "production" && !f && (d(), f = i.opGet(l));
  var v = f[1];
  return uE(function() {
    a == null || a(v);
  }, function(g) {
    return d(function(h) {
      var p = he(h, 2), y = p[0], m = p[1];
      return g && y === 0 && (a == null || a(v)), [y + 1, m];
    }), function() {
      i.opUpdate(l, function(h) {
        var p = h || [], y = he(p, 2), m = y[0], S = m === void 0 ? 0 : m, E = y[1], x = S - 1;
        return x === 0 ? (c(function() {
          (g || !i.opGet(l)) && (n == null || n(E, !1));
        }), null) : [S - 1, E];
      });
    };
  }, [l]), v;
}
var SE = {}, EE = process.env.NODE_ENV !== "production" ? "css-dev-only-do-not-override" : "css", rn = /* @__PURE__ */ new Map();
function xE(e) {
  rn.set(e, (rn.get(e) || 0) + 1);
}
function CE(e, t) {
  if (typeof document < "u") {
    var r = document.querySelectorAll("style[".concat(In, '="').concat(e, '"]'));
    r.forEach(function(n) {
      if (n[Wr] === t) {
        var a;
        (a = n.parentNode) === null || a === void 0 || a.removeChild(n);
      }
    });
  }
}
var _E = 0;
function wE(e, t) {
  rn.set(e, (rn.get(e) || 0) - 1);
  var r = Array.from(rn.keys()), n = r.filter(function(a) {
    var o = rn.get(a) || 0;
    return o <= 0;
  });
  r.length - n.length > _E && n.forEach(function(a) {
    CE(a, t), rn.delete(a);
  });
}
var $E = function(t, r, n, a) {
  var o = n.getDerivativeToken(t), i = V(V({}, o), r);
  return a && (i = a(i)), i;
}, Mh = "token";
function TE(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = pr(Xa), a = n.cache.instanceId, o = n.container, i = r.salt, s = i === void 0 ? "" : i, l = r.override, c = l === void 0 ? SE : l, u = r.formatToken, d = r.getComputedToken, f = r.cssVar, v = iE(function() {
    return Object.assign.apply(Object, [{}].concat(xe(t)));
  }, t), g = fa(v), h = fa(c), p = f ? fa(f) : "", y = Pc(Mh, [s, e.id, g, h, p], function() {
    var m, S = d ? d(v, c, e) : $E(v, c, e, u), E = V({}, S), x = "";
    if (f) {
      var w = kh(S, f.key, {
        prefix: f.prefix,
        ignore: f.ignore,
        unitless: f.unitless,
        preserve: f.preserve
      }), b = he(w, 2);
      S = b[0], x = b[1];
    }
    var P = bd(S, s);
    S._tokenKey = P, E._tokenKey = bd(E, s);
    var k = (m = f == null ? void 0 : f.key) !== null && m !== void 0 ? m : P;
    S._themeKey = k, xE(k);
    var M = "".concat(EE, "-").concat(ur(P));
    return S._hashId = M, [S, M, E, x, (f == null ? void 0 : f.key) || ""];
  }, function(m) {
    wE(m[0]._themeKey, a);
  }, function(m) {
    var S = he(m, 4), E = S[0], x = S[3];
    if (f && x) {
      var w = cn(x, ur("css-variables-".concat(E._themeKey)), {
        mark: fr,
        prepend: "queue",
        attachTo: o,
        priority: -999
      });
      w[Wr] = a, w.setAttribute(In, E._themeKey);
    }
  });
  return y;
}
var RE = function(t, r, n) {
  var a = he(t, 5), o = a[2], i = a[3], s = a[4], l = n || {}, c = l.plain;
  if (!i)
    return null;
  var u = o._tokenKey, d = -999, f = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(d)
  }, v = Mo(i, s, u, f, c);
  return [d, u, v];
};
function Nh(e, t) {
  var r = t.path, n = t.parentSelectors;
  lt(!1, "[Ant Design CSS-in-JS] ".concat(r ? "Error in ".concat(r, ": ") : "").concat(e).concat(n.length ? " Selector: ".concat(n.join(" | ")) : ""));
}
var AE = function(t, r, n) {
  if (t === "content") {
    var a = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, o = ["normal", "none", "initial", "inherit", "unset"];
    (typeof r != "string" || o.indexOf(r) === -1 && !a.test(r) && (r.charAt(0) !== r.charAt(r.length - 1) || r.charAt(0) !== '"' && r.charAt(0) !== "'")) && Nh("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"".concat(r, "\"'`."), n);
  }
}, PE = function(t, r, n) {
  t === "animation" && n.hashId && r !== "none" && Nh("You seem to be using hashed animation '".concat(r, "', in which case 'animationName' with Keyframe as value is recommended."), n);
}, Ed = "data-ant-cssinjs-cache-path", Ih = "_FILE_STYLE__", un, Dh = !0;
function OE() {
  if (!un && (un = {}, Ir())) {
    var e = document.createElement("div");
    e.className = Ed, e.style.position = "fixed", e.style.visibility = "hidden", e.style.top = "-9999px", document.body.appendChild(e);
    var t = getComputedStyle(e).content || "";
    t = t.replace(/^"/, "").replace(/"$/, ""), t.split(";").forEach(function(a) {
      var o = a.split(":"), i = he(o, 2), s = i[0], l = i[1];
      un[s] = l;
    });
    var r = document.querySelector("style[".concat(Ed, "]"));
    if (r) {
      var n;
      Dh = !1, (n = r.parentNode) === null || n === void 0 || n.removeChild(r);
    }
    document.body.removeChild(e);
  }
}
function kE(e) {
  return OE(), !!un[e];
}
function ME(e) {
  var t = un[e], r = null;
  if (t && Ir())
    if (Dh)
      r = Ih;
    else {
      var n = document.querySelector("style[".concat(fr, '="').concat(un[e], '"]'));
      n ? r = n.innerHTML : delete un[e];
    }
  return [r, t];
}
var Fh = "_skip_check_", Lh = "_multi_value_";
function Ro(e) {
  var t = Nn(tl(e), rl);
  return t.replace(/\{%%%\:[^;];}/g, ";");
}
function NE(e) {
  return me(e) === "object" && e && (Fh in e || Lh in e);
}
function xd(e, t, r) {
  if (!t)
    return e;
  var n = ".".concat(t), a = r === "low" ? ":where(".concat(n, ")") : n, o = e.split(",").map(function(i) {
    var s, l = i.trim().split(/\s+/), c = l[0] || "", u = ((s = c.match(/^\w+/)) === null || s === void 0 ? void 0 : s[0]) || "";
    return c = "".concat(u).concat(a).concat(c.slice(u.length)), [c].concat(xe(l.slice(1))).join(" ");
  });
  return o.join(",");
}
var IE = function e(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    root: !0,
    parentSelectors: []
  }, a = n.root, o = n.injectHash, i = n.parentSelectors, s = r.hashId, l = r.layer, c = r.path, u = r.hashPriority, d = r.transformers, f = d === void 0 ? [] : d, v = r.linters, g = v === void 0 ? [] : v, h = "", p = {};
  function y(E) {
    var x = E.getName(s);
    if (!p[x]) {
      var w = e(E.style, r, {
        root: !1,
        parentSelectors: i
      }), b = he(w, 1), P = b[0];
      p[x] = "@keyframes ".concat(E.getName(s)).concat(P);
    }
  }
  function m(E) {
    var x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    return E.forEach(function(w) {
      Array.isArray(w) ? m(w, x) : w && x.push(w);
    }), x;
  }
  var S = m(Array.isArray(t) ? t : [t]);
  return S.forEach(function(E) {
    var x = typeof E == "string" && !a ? {} : E;
    if (typeof x == "string")
      h += "".concat(x, `
`);
    else if (x._keyframe)
      y(x);
    else {
      var w = f.reduce(function(b, P) {
        var k;
        return (P == null || (k = P.visit) === null || k === void 0 ? void 0 : k.call(P, b)) || b;
      }, x);
      Object.keys(w).forEach(function(b) {
        var P = w[b];
        if (me(P) === "object" && P && (b !== "animationName" || !P._keyframe) && !NE(P)) {
          var k = !1, M = b.trim(), I = !1;
          (a || o) && s ? M.startsWith("@") ? k = !0 : M === "&" ? M = xd("", s, u) : M = xd(b, s, u) : a && !s && (M === "&" || M === "") && (M = "", I = !0);
          var D = e(P, r, {
            root: I,
            injectHash: k,
            parentSelectors: [].concat(xe(i), [M])
          }), F = he(D, 2), B = F[0], L = F[1];
          p = V(V({}, p), L), h += "".concat(M).concat(B);
        } else {
          let R = function(H, z) {
            process.env.NODE_ENV !== "production" && (me(P) !== "object" || !(P != null && P[Fh])) && [AE, PE].concat(xe(g)).forEach(function(K) {
              return K(H, z, {
                path: c,
                hashId: s,
                parentSelectors: i
              });
            });
            var j = H.replace(/[A-Z]/g, function(K) {
              return "-".concat(K.toLowerCase());
            }), W = z;
            !uh[H] && typeof W == "number" && W !== 0 && (W = "".concat(W, "px")), H === "animationName" && z !== null && z !== void 0 && z._keyframe && (y(z), W = z.getName(s)), h += "".concat(j, ":").concat(W, ";");
          };
          var A, O = (A = P == null ? void 0 : P.value) !== null && A !== void 0 ? A : P;
          me(P) === "object" && P !== null && P !== void 0 && P[Lh] && Array.isArray(O) ? O.forEach(function(H) {
            R(b, H);
          }) : R(b, O);
        }
      });
    }
  }), a ? l && (h && (h = "@layer ".concat(l.name, " {").concat(h, "}")), l.dependencies && (p["@layer ".concat(l.name)] = l.dependencies.map(function(E) {
    return "@layer ".concat(E, ", ").concat(l.name, ";");
  }).join(`
`))) : h = "{".concat(h, "}"), [h, p];
};
function jh(e, t) {
  return ur("".concat(e.join("%")).concat(t));
}
function DE() {
  return null;
}
var zh = "style";
function dl(e, t) {
  var r = e.token, n = e.path, a = e.hashId, o = e.layer, i = e.nonce, s = e.clientOnly, l = e.order, c = l === void 0 ? 0 : l, u = C.useContext(Xa), d = u.autoClear, f = u.mock, v = u.defaultCache, g = u.hashPriority, h = u.container, p = u.ssrInline, y = u.transformers, m = u.linters, S = u.cache, E = u.layer, x = r._tokenKey, w = [x];
  E && w.push("layer"), w.push.apply(w, xe(n));
  var b = cl;
  process.env.NODE_ENV !== "production" && f !== void 0 && (b = f === "client");
  var P = Pc(
    zh,
    w,
    // Create cache if needed
    function() {
      var F = w.join("|");
      if (kE(F)) {
        var B = ME(F), L = he(B, 2), A = L[0], O = L[1];
        if (A)
          return [A, x, O, {}, s, c];
      }
      var R = t(), H = IE(R, {
        hashId: a,
        hashPriority: g,
        layer: E ? o : void 0,
        path: n.join("-"),
        transformers: y,
        linters: m
      }), z = he(H, 2), j = z[0], W = z[1], K = Ro(j), Z = jh(w, K);
      return [K, x, Z, W, s, c];
    },
    // Remove cache if no need
    function(F, B) {
      var L = he(F, 3), A = L[2];
      (B || d) && cl && Ph(A, {
        mark: fr
      });
    },
    // Effect: Inject style here
    function(F) {
      var B = he(F, 4), L = B[0];
      B[1];
      var A = B[2], O = B[3];
      if (b && L !== Ih) {
        var R = {
          mark: fr,
          prepend: E ? !1 : "queue",
          attachTo: h,
          priority: c
        }, H = typeof i == "function" ? i() : i;
        H && (R.csp = {
          nonce: H
        });
        var z = [], j = [];
        Object.keys(O).forEach(function(K) {
          K.startsWith("@layer") ? z.push(K) : j.push(K);
        }), z.forEach(function(K) {
          cn(Ro(O[K]), "_layer-".concat(K), V(V({}, R), {}, {
            prepend: !0
          }));
        });
        var W = cn(L, A, R);
        W[Wr] = S.instanceId, W.setAttribute(In, x), process.env.NODE_ENV !== "production" && W.setAttribute(rE, w.join("|")), j.forEach(function(K) {
          cn(Ro(O[K]), "_effect-".concat(K), R);
        });
      }
    }
  ), k = he(P, 3), M = k[0], I = k[1], D = k[2];
  return function(F) {
    var B;
    if (!p || b || !v)
      B = /* @__PURE__ */ C.createElement(DE, null);
    else {
      var L;
      B = /* @__PURE__ */ C.createElement("style", De({}, (L = {}, N(L, In, I), N(L, fr, D), L), {
        dangerouslySetInnerHTML: {
          __html: M
        }
      }));
    }
    return /* @__PURE__ */ C.createElement(C.Fragment, null, B, F);
  };
}
var FE = function(t, r, n) {
  var a = he(t, 6), o = a[0], i = a[1], s = a[2], l = a[3], c = a[4], u = a[5], d = n || {}, f = d.plain;
  if (c)
    return null;
  var v = o, g = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(u)
  };
  return v = Mo(o, i, s, g, f), l && Object.keys(l).forEach(function(h) {
    if (!r[h]) {
      r[h] = !0;
      var p = Ro(l[h]), y = Mo(p, i, "_effect-".concat(h), g, f);
      h.startsWith("@layer") ? v = y + v : v += y;
    }
  }), [u, s, v];
}, Hh = "cssVar", LE = function(t, r) {
  var n = t.key, a = t.prefix, o = t.unitless, i = t.ignore, s = t.token, l = t.scope, c = l === void 0 ? "" : l, u = pr(Xa), d = u.cache.instanceId, f = u.container, v = s._tokenKey, g = [].concat(xe(t.path), [n, c, v]), h = Pc(Hh, g, function() {
    var p = r(), y = kh(p, n, {
      prefix: a,
      unitless: o,
      ignore: i,
      scope: c
    }), m = he(y, 2), S = m[0], E = m[1], x = jh(g, E);
    return [S, E, x, n];
  }, function(p) {
    var y = he(p, 3), m = y[2];
    cl && Ph(m, {
      mark: fr
    });
  }, function(p) {
    var y = he(p, 3), m = y[1], S = y[2];
    if (m) {
      var E = cn(m, S, {
        mark: fr,
        prepend: "queue",
        attachTo: f,
        priority: -999
      });
      E[Wr] = d, E.setAttribute(In, n);
    }
  });
  return h;
}, jE = function(t, r, n) {
  var a = he(t, 4), o = a[1], i = a[2], s = a[3], l = n || {}, c = l.plain;
  if (!o)
    return null;
  var u = -999, d = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(u)
  }, f = Mo(o, s, i, d, c);
  return [u, i, f];
}, Kn;
Kn = {}, N(Kn, zh, FE), N(Kn, Mh, RE), N(Kn, Hh, jE);
function Cn(e) {
  return e.notSplit = !0, e;
}
Cn(["borderTop", "borderBottom"]), Cn(["borderTop"]), Cn(["borderBottom"]), Cn(["borderLeft", "borderRight"]), Cn(["borderLeft"]), Cn(["borderRight"]);
const zE = "5.24.5", Vh = {
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
}, $a = Object.assign(Object.assign({}, Vh), {
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
}), xt = Math.round;
function us(e, t) {
  const r = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], n = r.map((a) => parseFloat(a));
  for (let a = 0; a < 3; a += 1)
    n[a] = t(n[a] || 0, r[a] || "", a);
  return r[3] ? n[3] = r[3].includes("%") ? n[3] / 100 : n[3] : n[3] = 1, n;
}
const Cd = (e, t, r) => r === 0 ? e : e / 100;
function Yn(e, t) {
  const r = t || 255;
  return e > r ? r : e < 0 ? 0 : e;
}
class pt {
  constructor(t) {
    N(this, "isValid", !0), N(this, "r", 0), N(this, "g", 0), N(this, "b", 0), N(this, "a", 1), N(this, "_h", void 0), N(this, "_s", void 0), N(this, "_l", void 0), N(this, "_v", void 0), N(this, "_max", void 0), N(this, "_min", void 0), N(this, "_brightness", void 0);
    function r(n) {
      return n[0] in t && n[1] in t && n[2] in t;
    }
    if (t) if (typeof t == "string") {
      let a = function(o) {
        return n.startsWith(o);
      };
      const n = t.trim();
      /^#?[A-F\d]{3,8}$/i.test(n) ? this.fromHexString(n) : a("rgb") ? this.fromRgbString(n) : a("hsl") ? this.fromHslString(n) : (a("hsv") || a("hsb")) && this.fromHsvString(n);
    } else if (t instanceof pt)
      this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this._h = t._h, this._s = t._s, this._l = t._l, this._v = t._v;
    else if (r("rgb"))
      this.r = Yn(t.r), this.g = Yn(t.g), this.b = Yn(t.b), this.a = typeof t.a == "number" ? Yn(t.a, 1) : 1;
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
    function t(o) {
      const i = o / 255;
      return i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
    }
    const r = t(this.r), n = t(this.g), a = t(this.b);
    return 0.2126 * r + 0.7152 * n + 0.0722 * a;
  }
  getHue() {
    if (typeof this._h > "u") {
      const t = this.getMax() - this.getMin();
      t === 0 ? this._h = 0 : this._h = xt(60 * (this.r === this.getMax() ? (this.g - this.b) / t + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / t + 2 : (this.r - this.g) / t + 4));
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
    const n = this._c(t), a = r / 100, o = (s) => (n[s] - this[s]) * a + this[s], i = {
      r: xt(o("r")),
      g: xt(o("g")),
      b: xt(o("b")),
      a: xt(o("a") * 100) / 100
    };
    return this._c(i);
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
    const r = this._c(t), n = this.a + r.a * (1 - this.a), a = (o) => xt((this[o] * this.a + r[o] * r.a * (1 - this.a)) / n);
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
      const o = xt(this.a * 255).toString(16);
      t += o.length === 2 ? o : "0" + o;
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
    const t = this.getHue(), r = xt(this.getSaturation() * 100), n = xt(this.getLightness() * 100);
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
    return a[t] = Yn(r, n), a;
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
    function n(a, o) {
      return parseInt(r[a] + r[o || a], 16);
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
      const f = xt(n * 255);
      this.r = f, this.g = f, this.b = f;
    }
    let o = 0, i = 0, s = 0;
    const l = t / 60, c = (1 - Math.abs(2 * n - 1)) * r, u = c * (1 - Math.abs(l % 2 - 1));
    l >= 0 && l < 1 ? (o = c, i = u) : l >= 1 && l < 2 ? (o = u, i = c) : l >= 2 && l < 3 ? (i = c, s = u) : l >= 3 && l < 4 ? (i = u, s = c) : l >= 4 && l < 5 ? (o = u, s = c) : l >= 5 && l < 6 && (o = c, s = u);
    const d = n - c / 2;
    this.r = xt((o + d) * 255), this.g = xt((i + d) * 255), this.b = xt((s + d) * 255);
  }
  fromHsv({
    h: t,
    s: r,
    v: n,
    a
  }) {
    this._h = t % 360, this._s = r, this._v = n, this.a = typeof a == "number" ? a : 1;
    const o = xt(n * 255);
    if (this.r = o, this.g = o, this.b = o, r <= 0)
      return;
    const i = t / 60, s = Math.floor(i), l = i - s, c = xt(n * (1 - r) * 255), u = xt(n * (1 - r * l) * 255), d = xt(n * (1 - r * (1 - l)) * 255);
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
    const r = us(t, Cd);
    this.fromHsv({
      h: r[0],
      s: r[1],
      v: r[2],
      a: r[3]
    });
  }
  fromHslString(t) {
    const r = us(t, Cd);
    this.fromHsl({
      h: r[0],
      s: r[1],
      l: r[2],
      a: r[3]
    });
  }
  fromRgbString(t) {
    const r = us(t, (n, a) => (
      // Convert percentage to number. e.g. 50% -> 128
      a.includes("%") ? xt(n / 100 * 255) : n
    ));
    this.r = r[0], this.g = r[1], this.b = r[2], this.a = r[3];
  }
}
var co = 2, _d = 0.16, HE = 0.05, VE = 0.05, BE = 0.15, Bh = 5, Uh = 4, UE = [{
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
function wd(e, t, r) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = r ? Math.round(e.h) - co * t : Math.round(e.h) + co * t : n = r ? Math.round(e.h) + co * t : Math.round(e.h) - co * t, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function $d(e, t, r) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return r ? n = e.s - _d * t : t === Uh ? n = e.s + _d : n = e.s + HE * t, n > 1 && (n = 1), r && t === Bh && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Math.round(n * 100) / 100;
}
function Td(e, t, r) {
  var n;
  return r ? n = e.v + VE * t : n = e.v - BE * t, n = Math.max(0, Math.min(1, n)), Math.round(n * 100) / 100;
}
function Ta(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [], n = new pt(e), a = n.toHsv(), o = Bh; o > 0; o -= 1) {
    var i = new pt({
      h: wd(a, o, !0),
      s: $d(a, o, !0),
      v: Td(a, o, !0)
    });
    r.push(i);
  }
  r.push(n);
  for (var s = 1; s <= Uh; s += 1) {
    var l = new pt({
      h: wd(a, s),
      s: $d(a, s),
      v: Td(a, s)
    });
    r.push(l);
  }
  return t.theme === "dark" ? UE.map(function(c) {
    var u = c.index, d = c.amount;
    return new pt(t.backgroundColor || "#141414").mix(r[u], d).toHexString();
  }) : r.map(function(c) {
    return c.toHexString();
  });
}
var ds = {
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
}, fl = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
fl.primary = fl[5];
var pl = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
pl.primary = pl[5];
var hl = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
hl.primary = hl[5];
var gl = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
gl.primary = gl[5];
var ml = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
ml.primary = ml[5];
var vl = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
vl.primary = vl[5];
var yl = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
yl.primary = yl[5];
var bl = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
bl.primary = bl[5];
var No = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
No.primary = No[5];
var Sl = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
Sl.primary = Sl[5];
var El = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
El.primary = El[5];
var xl = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
xl.primary = xl[5];
var Cl = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
Cl.primary = Cl[5];
var fs = {
  red: fl,
  volcano: pl,
  orange: hl,
  gold: gl,
  yellow: ml,
  lime: vl,
  green: yl,
  cyan: bl,
  blue: No,
  geekblue: Sl,
  purple: El,
  magenta: xl,
  grey: Cl
};
function WE(e, t) {
  let {
    generateColorPalettes: r,
    generateNeutralColorPalettes: n
  } = t;
  const {
    colorSuccess: a,
    colorWarning: o,
    colorError: i,
    colorInfo: s,
    colorPrimary: l,
    colorBgBase: c,
    colorTextBase: u
  } = e, d = r(l), f = r(a), v = r(o), g = r(i), h = r(s), p = n(c, u), y = e.colorLink || e.colorInfo, m = r(y), S = new pt(g[1]).mix(new pt(g[3]), 50).toHexString();
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
    colorErrorBg: g[1],
    colorErrorBgHover: g[2],
    colorErrorBgFilledHover: S,
    colorErrorBgActive: g[3],
    colorErrorBorder: g[3],
    colorErrorBorderHover: g[4],
    colorErrorHover: g[5],
    colorError: g[6],
    colorErrorActive: g[7],
    colorErrorTextHover: g[8],
    colorErrorText: g[9],
    colorErrorTextActive: g[10],
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
    colorBgMask: new pt("#000").setA(0.45).toRgbString(),
    colorWhite: "#fff"
  });
}
const qE = (e) => {
  let t = e, r = e, n = e, a = e;
  return e < 6 && e >= 5 ? t = e + 1 : e < 16 && e >= 6 ? t = e + 2 : e >= 16 && (t = 16), e < 7 && e >= 5 ? r = 4 : e < 8 && e >= 7 ? r = 5 : e < 14 && e >= 8 ? r = 6 : e < 16 && e >= 14 ? r = 7 : e >= 16 && (r = 8), e < 6 && e >= 2 ? n = 1 : e >= 6 && (n = 2), e > 4 && e < 8 ? a = 4 : e >= 8 && (a = 6), {
    borderRadius: e,
    borderRadiusXS: n,
    borderRadiusSM: r,
    borderRadiusLG: t,
    borderRadiusOuter: a
  };
};
function GE(e) {
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
  }, qE(n));
}
const KE = (e) => {
  const {
    controlHeight: t
  } = e;
  return {
    controlHeightSM: t * 0.75,
    controlHeightXS: t * 0.5,
    controlHeightLG: t * 1.25
  };
};
function YE(e) {
  return (e + 8) / e;
}
function XE(e) {
  const t = Array.from({
    length: 10
  }).map((r, n) => {
    const a = n - 1, o = e * Math.pow(Math.E, a / 5), i = n > 1 ? Math.floor(o) : Math.ceil(o);
    return Math.floor(i / 2) * 2;
  });
  return t[1] = e, t.map((r) => ({
    size: r,
    lineHeight: YE(r)
  }));
}
const ZE = (e) => {
  const t = XE(e), r = t.map((u) => u.size), n = t.map((u) => u.lineHeight), a = r[1], o = r[0], i = r[2], s = n[1], l = n[0], c = n[2];
  return {
    fontSizeSM: o,
    fontSize: a,
    fontSizeLG: i,
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
    fontHeightLG: Math.round(c * i),
    fontHeightSM: Math.round(l * o),
    lineHeightHeading1: n[6],
    lineHeightHeading2: n[5],
    lineHeightHeading3: n[4],
    lineHeightHeading4: n[3],
    lineHeightHeading5: n[2]
  };
};
function QE(e) {
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
const Zt = (e, t) => new pt(e).setA(t).toRgbString(), Xn = (e, t) => new pt(e).darken(t).toHexString(), JE = (e) => {
  const t = Ta(e);
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
}, ex = (e, t) => {
  const r = e || "#fff", n = t || "#000";
  return {
    colorBgBase: r,
    colorTextBase: n,
    colorText: Zt(n, 0.88),
    colorTextSecondary: Zt(n, 0.65),
    colorTextTertiary: Zt(n, 0.45),
    colorTextQuaternary: Zt(n, 0.25),
    colorFill: Zt(n, 0.15),
    colorFillSecondary: Zt(n, 0.06),
    colorFillTertiary: Zt(n, 0.04),
    colorFillQuaternary: Zt(n, 0.02),
    colorBgSolid: Zt(n, 1),
    colorBgSolidHover: Zt(n, 0.75),
    colorBgSolidActive: Zt(n, 0.95),
    colorBgLayout: Xn(r, 4),
    colorBgContainer: Xn(r, 0),
    colorBgElevated: Xn(r, 0),
    colorBgSpotlight: Zt(n, 0.85),
    colorBgBlur: "transparent",
    colorBorder: Xn(r, 15),
    colorBorderSecondary: Xn(r, 6)
  };
};
function tx(e) {
  ds.pink = ds.magenta, fs.pink = fs.magenta;
  const t = Object.keys(Vh).map((r) => {
    const n = e[r] === ds[r] ? fs[r] : Ta(e[r]);
    return Array.from({
      length: 10
    }, () => 1).reduce((a, o, i) => (a[`${r}-${i + 1}`] = n[i], a[`${r}${i + 1}`] = n[i], a), {});
  }).reduce((r, n) => (r = Object.assign(Object.assign({}, r), n), r), {});
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e), t), WE(e, {
    generateColorPalettes: JE,
    generateNeutralColorPalettes: ex
  })), ZE(e.fontSize)), QE(e)), KE(e)), GE(e));
}
const Wh = ll(tx), _l = {
  token: $a,
  override: {
    override: $a
  },
  hashed: !0
}, qh = /* @__PURE__ */ T.createContext(_l);
function ps(e) {
  return e >= 0 && e <= 255;
}
function uo(e, t) {
  const {
    r,
    g: n,
    b: a,
    a: o
  } = new pt(e).toRgb();
  if (o < 1)
    return e;
  const {
    r: i,
    g: s,
    b: l
  } = new pt(t).toRgb();
  for (let c = 0.01; c <= 1; c += 0.01) {
    const u = Math.round((r - i * (1 - c)) / c), d = Math.round((n - s * (1 - c)) / c), f = Math.round((a - l * (1 - c)) / c);
    if (ps(u) && ps(d) && ps(f))
      return new pt({
        r: u,
        g: d,
        b: f,
        a: Math.round(c * 100) / 100
      }).toRgbString();
  }
  return new pt({
    r,
    g: n,
    b: a,
    a: 1
  }).toRgbString();
}
var rx = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
function Oc(e) {
  const {
    override: t
  } = e, r = rx(e, ["override"]), n = Object.assign({}, t);
  Object.keys($a).forEach((f) => {
    delete n[f];
  });
  const a = Object.assign(Object.assign({}, r), n), o = 480, i = 576, s = 768, l = 992, c = 1200, u = 1600;
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
    colorSplit: uo(a.colorBorderSecondary, a.colorBgContainer),
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
    colorErrorOutline: uo(a.colorErrorBg, a.colorBgContainer),
    colorWarningOutline: uo(a.colorWarningBg, a.colorBgContainer),
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
    controlOutline: uo(a.colorPrimaryBg, a.colorBgContainer),
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
    screenXS: o,
    screenXSMin: o,
    screenXSMax: i - 1,
    screenSM: i,
    screenSMMin: i,
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
      0 1px 2px -2px ${new pt("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new pt("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new pt("rgba(0, 0, 0, 0.09)").toRgbString()}
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
var Rd = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const kc = {
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
}, Gh = {
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
}, nx = {
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
}, Kh = (e, t, r) => {
  const n = r.getDerivativeToken(e), {
    override: a
  } = t, o = Rd(t, ["override"]);
  let i = Object.assign(Object.assign({}, n), {
    override: a
  });
  return i = Oc(i), o && Object.entries(o).forEach((s) => {
    let [l, c] = s;
    const {
      theme: u
    } = c, d = Rd(c, ["theme"]);
    let f = d;
    u && (f = Kh(Object.assign(Object.assign({}, i), d), {
      override: d
    }, u)), i[l] = f;
  }), i;
};
function Mi() {
  const {
    token: e,
    hashed: t,
    theme: r,
    override: n,
    cssVar: a
  } = T.useContext(qh), o = `${zE}-${t || ""}`, i = r || Wh, [s, l, c] = TE(i, [$a, e], {
    salt: o,
    override: n,
    getComputedToken: Kh,
    // formatToken will not be consumed after 1.15.0 with getComputedToken.
    // But token will break if @ant-design/cssinjs is under 1.15.0 without it
    formatToken: Oc,
    cssVar: a && {
      prefix: a.prefix,
      key: a.key,
      unitless: kc,
      ignore: Gh,
      preserve: nx
    }
  });
  return [i, c, t ? l : "", s, a];
}
const ax = "2.0.1", ox = G0(Fs.defaultAlgorithm), ix = {
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
}, Yh = (e, t, r) => {
  const n = r.getDerivativeToken(e), {
    override: a,
    ...o
  } = t;
  let i = {
    ...n,
    override: a
  };
  return i = Oc(i), o && Object.entries(o).forEach(([s, l]) => {
    const {
      theme: c,
      ...u
    } = l;
    let d = u;
    c && (d = Yh({
      ...i,
      ...u
    }, {
      override: u
    }, c)), i[s] = d;
  }), i;
};
function Xh() {
  const {
    token: e,
    hashed: t,
    theme: r,
    override: n,
    cssVar: a
  } = T.useContext(Fs._internalContext), o = {
    prefix: (a == null ? void 0 : a.prefix) || "ant",
    key: (a == null ? void 0 : a.key) || "css-var-root"
  }, i = r || ox, [s, l, c] = uS(i, [Fs.defaultSeed, e], {
    salt: `${ax}-${t || ""}`,
    override: n,
    getComputedToken: Yh,
    cssVar: {
      ...o,
      unitless: kc,
      ignore: Gh,
      preserve: ix
    }
  });
  return [i, c, t ? l : "", s, o];
}
function sx() {
  const [e, t, r] = Xh();
  return {
    theme: e,
    token: t,
    hashId: r
  };
}
const {
  genStyleHooks: Mc
} = GS({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: t
    } = gr();
    return {
      iconPrefixCls: t,
      rootPrefixCls: e()
    };
  },
  useToken: () => {
    const [e, t, r, n, a] = Xh();
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
    } = gr();
    return e ?? {};
  },
  layer: {
    name: "antdx",
    dependencies: ["antd"]
  }
}), Zh = /* @__PURE__ */ T.createContext({});
function lx(e) {
  const t = getComputedStyle(e).display;
  return t === "block" || t === "flex" || t === "list-item" || t === "table";
}
function cx(e) {
  var n;
  const t = [""], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  for (; r.nextNode(); ) {
    const a = r.currentNode;
    if (a.nodeType === Node.TEXT_NODE) {
      t[t.length - 1] += a.textContent;
      continue;
    }
    a.tagName === "BR" && ((n = a.parentNode) == null ? void 0 : n.childElementCount) === 1 || (a.tagName === "BR" || lx(a)) && t.push("");
  }
  return t.join(`
`);
}
const ux = ({
  content: e,
  prefixCls: t,
  okText: r,
  cancelText: n,
  onEditConfirm: a,
  onEditCancel: o
}) => {
  const i = T.useRef(null), [s] = $i("Bubble", Vr.Bubble), l = xr(() => {
    a == null || a(cx(i.current));
  }), c = xr(() => o == null ? void 0 : o());
  if (T.useEffect(() => {
    i.current.textContent = e, i.current.focus();
    const d = window.getSelection(), f = document.createRange();
    f.selectNodeContents(i.current), f.collapse(!1), d.removeAllRanges(), d.addRange(f);
  }, []), typeof e != "string") throw new Error("Content of editable Bubble should be string");
  const u = T.useMemo(() => (
    /**
     * 为什么使用 div
     * input、textarea 是固定行为、固定宽高的元素，无法对内容自适应，体验差
     * div.contentEditable 提供了编辑 innerHTML 的能力，同时具备内容自适应能力，体验好
     */
    /* @__PURE__ */ T.createElement("div", {
      ref: i,
      contentEditable: !0
    })
  ), []);
  return /* @__PURE__ */ T.createElement(T.Fragment, null, u, /* @__PURE__ */ T.createElement(Jf, {
    rootClassName: `${t}-editing-opts`,
    gap: 8
  }, /* @__PURE__ */ T.createElement(ba, {
    type: "primary",
    shape: "round",
    size: "small",
    onClick: l
  }, r || s.editableOk), /* @__PURE__ */ T.createElement(ba, {
    type: "text",
    shape: "round",
    size: "small",
    onClick: c
  }, n || s.editableCancel)));
}, dx = ({
  prefixCls: e
}) => /* @__PURE__ */ T.createElement("span", {
  className: `${e}-dot`
}, /* @__PURE__ */ T.createElement("i", {
  className: `${e}-dot-item`,
  key: "item-1"
}), /* @__PURE__ */ T.createElement("i", {
  className: `${e}-dot-item`,
  key: "item-2"
}), /* @__PURE__ */ T.createElement("i", {
  className: `${e}-dot-item`,
  key: "item-3"
})), fx = new Tc("loadingMove", {
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
}), px = new Tc("cursorBlink", {
  "0%": {
    opacity: 1
  },
  "50%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
}), hx = new Tc("fadeIn", {
  "0%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
}), gx = (e) => {
  const {
    componentCls: t,
    fontSize: r,
    typingAnimationDuration: n,
    typingAnimationName: a,
    lineHeight: o,
    paddingSM: i,
    colorText: s,
    calc: l
  } = e;
  return [{
    [t]: {
      display: "flex",
      columnGap: i,
      [`&${t}-rtl`]: {
        direction: "rtl"
      },
      [`&${t}-loading`]: {
        alignItems: "center"
      },
      [`& ${t}-body`]: {
        display: "flex",
        flexDirection: "column"
      },
      // =========================== Content =============================
      [`& ${t}-content`]: {
        position: "relative",
        boxSizing: "border-box",
        minWidth: 0,
        maxWidth: "100%",
        minHeight: l(i).mul(2).add(l(o).mul(r)).equal(),
        paddingInline: `${st(e.padding)}`,
        paddingBlock: `${st(i)}`,
        color: s,
        fontSize: e.fontSize,
        lineHeight: e.lineHeight,
        wordBreak: "break-word",
        "&-string": {
          whiteSpace: "pre-wrap"
        }
      },
      "&-typing:last-child::after": {
        content: '"|"',
        fontWeight: 900,
        userSelect: "none",
        opacity: 1,
        marginInlineStart: "0.1em",
        animationName: a,
        animationDuration: st(n),
        animationIterationCount: "infinite",
        animationTimingFunction: "linear"
      },
      "&-fade-in .fade-in": {
        display: "inline",
        animationName: hx,
        animationDuration: "1s",
        animationTimingFunction: "linear"
      },
      [`& ${t}-dot`]: {
        position: "relative",
        height: e.controlHeight,
        display: "flex",
        alignItems: "center",
        columnGap: e.marginXS,
        padding: `0 ${st(e.paddingXXS)}`,
        alignSelf: "center",
        "&-item": {
          backgroundColor: e.colorPrimary,
          borderRadius: "100%",
          width: 4,
          height: 4,
          animationName: fx,
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
      },
      // ======================== placement ============================
      "&-start": {
        flexDirection: "row",
        [`& ${t}-header`]: {
          flexDirection: "row"
        }
      },
      "&-end": {
        flexDirection: "row-reverse",
        justifySelf: "flex-end",
        [`& ${t}-header`]: {
          flexDirection: "row-reverse"
        },
        [`& ${t}-editing-opts`]: {
          flexDirection: "row-reverse"
        }
      }
    }
  }, px];
}, mx = (e) => {
  const {
    componentCls: t
  } = e;
  return {
    [t]: {
      [`${t}-content`]: {
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
        },
        "&-borderless": {
          backgroundColor: "transparent",
          padding: 0,
          minHeight: 0
        }
      }
    }
  };
}, vx = (e) => {
  const {
    componentCls: t,
    fontSize: r,
    lineHeight: n,
    paddingSM: a,
    borderRadius: o,
    calc: i
  } = e, s = i(r).mul(n).div(2).add(a).equal(), l = i(o).mul(2).equal(), c = `${t}-content`;
  return {
    [t]: {
      [c]: {
        "&-default": {
          borderRadius: {
            _skip_check_: !0,
            value: l
          }
        },
        "&-round": {
          borderRadius: {
            _skip_check_: !0,
            value: s
          }
        },
        "&-corner": {
          borderRadius: {
            _skip_check_: !0,
            value: l
          }
        },
        "&-editing": {
          "div:first-child": {
            outline: "none"
          },
          [`${t}-editing-opts`]: {
            marginBlockStart: e.marginSM,
            "button:last-child": {
              backgroundColor: e.colorBgContainer,
              "&:hover": {
                backgroundColor: e.colorBgLayout
              }
            }
          }
        }
      },
      [`&-start ${t}-content-corner`]: {
        borderStartStartRadius: e.borderRadiusXS
      },
      [`&-end ${t}-content-corner`]: {
        borderStartEndRadius: e.borderRadiusXS
      }
    }
  };
}, yx = (e) => {
  const {
    componentCls: t
  } = e;
  return {
    [t]: {
      "&-divider": {
        width: "100%",
        justifyContent: "center",
        [`& ${t}-body`]: {
          width: "100%"
        }
      }
    }
  };
}, bx = (e) => {
  const {
    componentCls: t,
    padding: r
  } = e;
  return {
    [`${t}-list`]: {
      gap: r,
      maxHeight: "100%",
      width: "100%",
      boxSizing: "border-box",
      [`& ${t}`]: {
        width: "100%",
        boxSizing: "border-box",
        paddingBlock: e.padding
      },
      [`& ${t}-start:not(${t}-divider):not(${t}-system)`]: {
        paddingInlineEnd: "15%"
      },
      [`& ${t}-end:not(${t}-divider):not(${t}-system)`]: {
        paddingInlineStart: "15%"
      },
      [`${t}-list-scroll-box`]: {
        overflowY: "auto",
        display: "flex",
        alignItems: "center",
        width: "100%",
        scrollbarWidth: "thin",
        maxHeight: "100%",
        flexDirection: "column",
        boxSizing: "border-box",
        paddingInline: e.paddingXS,
        scrollbarColor: `${e.colorTextTertiary} transparent`,
        "&::-webkit-scrollbar": {
          width: 8,
          backgroundColor: "transparent"
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: e.colorTextTertiary,
          borderRadius: e.borderRadiusSM
        }
      },
      [`${t}-list-autoscroll`]: {
        flexDirection: "column-reverse"
      }
    }
  };
}, Sx = (e) => {
  const {
    componentCls: t,
    fontSize: r,
    lineHeight: n,
    paddingXXS: a,
    margin: o,
    colorText: i,
    fontSizeLG: s,
    calc: l
  } = e;
  return {
    [t]: {
      // ======================== Header & Footer ========================
      [`& ${t}-header`]: {
        display: "flex",
        marginBottom: a,
        fontSize: r,
        lineHeight: n,
        color: i
      },
      [`& ${t}-footer`]: {
        display: "flex",
        marginBlockStart: o,
        fontSize: r,
        lineHeight: n,
        color: i,
        "&-start": {
          flexDirection: "row"
        },
        "&-end": {
          flexDirection: "row-reverse"
        }
      },
      // ======================== Sider ========================
      "&-avatar": {
        minWidth: l(s).mul(2).equal()
      },
      "&-extra": {}
    }
  };
}, Ex = (e) => {
  const {
    componentCls: t,
    paddingSM: r,
    paddingXS: n,
    lineHeight: a,
    fontSize: o,
    fontSizeSM: i,
    calc: s
  } = e;
  return {
    [t]: {
      "&-system": {
        width: "100%",
        justifyContent: "center",
        [`& ${t}-content`]: {
          display: "flex",
          gap: `${st(i)}`,
          alignItems: "center",
          minHeight: s(n).mul(2).add(s(a).mul(o)).equal(),
          fontSize: `${st(o)}`,
          paddingInline: `${st(r)}`,
          paddingBlock: `${st(n)}`
        },
        [`& ${t}-system-content`]: {},
        [`& ${t}-system-extra`]: {}
      }
    }
  };
}, xx = () => ({
  typingContent: "|",
  typingAnimationName: "cursorBlink",
  typingAnimationDuration: "0.8s"
}), Ni = Mc("Bubble", (e) => {
  const t = Ya(e, {});
  return [
    // 位置越靠后，样式优先级越高
    gx(t),
    mx(t),
    vx(t),
    Sx(t),
    bx(t),
    Ex(t),
    yx(t)
  ];
}, xx);
function Cx(e) {
  return !e || e.length === 0 ? "" : e.reduce((t, r) => {
    let n = 0;
    for (; n < t.length && n < r.length && t[n] === r[n]; )
      n++;
    return t.slice(0, n);
  });
}
function _x({
  streaming: e,
  content: t,
  typing: r,
  onTyping: n,
  onTypingComplete: a
}) {
  const [o, i] = T.useState([]), s = T.useRef(!1), l = T.useRef(""), c = T.useRef(1), u = T.useRef(-1), d = T.useRef(e);
  d.current = e;
  const f = T.useMemo(() => {
    const y = {
      effect: "fade-in",
      interval: 100,
      step: 6,
      keepPrefix: !0
    };
    if (r === !0) return y;
    const {
      step: m = 6,
      interval: S = 100
    } = r, E = (x) => typeof x == "number";
    if (!E(S) || S <= 0)
      throw "[Bubble] invalid prop typing.interval, expect positive number.";
    if (!E(m) && !Array.isArray(m))
      throw "[Bubble] invalid prop typing.step, expect positive number or positive number array";
    if (E(m) && m <= 0)
      throw "[Bubble] invalid prop typing.step, expect positive number";
    if (Array.isArray(m)) {
      if (!E(m[0]) || m[0] <= 0)
        throw "[Bubble] invalid prop typing.step[0], expect positive number";
      if (!E(m[1]) || m[1] <= 0)
        throw "[Bubble] invalid prop typing.step[1], expect positive number";
      if (m[0] > m[1])
        throw "[Bubble] invalid prop typing.step, step[0] should less than step[1]";
    }
    return {
      ...y,
      ...r
    };
  }, [r]), v = T.useRef({
    content: t,
    interval: f.interval,
    step: f.step
  });
  v.current = {
    content: t,
    interval: f.interval,
    step: f.step
  };
  const g = () => Math.random().toString().slice(2), h = T.useCallback((y) => {
    let m = 0;
    l.current = f.keepPrefix ? Cx([v.current.content, l.current]) : "", i(l.current ? [{
      text: l.current,
      id: g(),
      taskId: y,
      done: !0
    }] : []);
    const S = () => {
      if (y !== c.current) return;
      const E = performance.now(), {
        content: x,
        interval: w,
        step: b
      } = v.current;
      if (E - m < w) {
        u.current = requestAnimationFrame(S);
        return;
      }
      const P = l.current.length, k = typeof b == "number" ? b : Math.floor(Math.random() * (b[1] - b[0])) + b[0], M = x.slice(P, P + k);
      if (!M) {
        if (d.current) {
          u.current = requestAnimationFrame(S);
          return;
        }
        i((D) => [{
          text: D.map(({
            text: F
          }) => F).join(""),
          id: g(),
          taskId: y,
          done: !0
        }]), a == null || a(x), s.current = !1, c.current++;
        return;
      }
      l.current += M;
      const I = {
        id: g(),
        text: M,
        taskId: y,
        done: !1
      };
      i((D) => D.concat(I)), s.current || (s.current = !0), m = E, u.current = requestAnimationFrame(S), n == null || n(l.current, x);
    };
    S();
  }, [f.keepPrefix, n, a]), p = T.useCallback(() => {
    cancelAnimationFrame(u.current), i([]), l.current = "", s.current = !1;
  }, []);
  return xa(() => {
    if (!t) return p();
    t !== l.current && (s.current && !t.startsWith(l.current) ? (cancelAnimationFrame(u.current), s.current = !1, requestAnimationFrame(() => h(++c.current))) : s.current === !1 && h(c.current));
  }, [t, h]), {
    renderedData: o,
    animating: s.current,
    memoedAnimationCfg: f
  };
}
const wx = ({
  prefixCls: e,
  streaming: t,
  content: r,
  typing: n,
  onTyping: a,
  onTypingComplete: o
}) => {
  const {
    renderedData: i,
    animating: s,
    memoedAnimationCfg: l
  } = _x({
    streaming: t,
    content: r,
    typing: n,
    onTyping: a,
    onTypingComplete: o
  }), {
    effect: c
  } = l, u = i.map((f) => c === "fade-in" && !f.done ? /* @__PURE__ */ T.createElement("span", {
    key: f.id,
    className: "fade-in"
  }, f.text) : f.text), d = n === !0 ? !1 : c === "typing";
  return /* @__PURE__ */ T.createElement("div", {
    className: se({
      [`${e}-typing`]: d && s,
      [`${e}-fade-in`]: !d
    })
  }, u);
}, $x = ({
  prefixCls: e,
  rootClassName: t,
  style: r,
  className: n,
  styles: a = {},
  classNames: o = {},
  placement: i = "start",
  content: s,
  contentRender: l,
  editable: c = !1,
  typing: u,
  streaming: d = !1,
  variant: f = "filled",
  shape: v = "default",
  header: g,
  footer: h,
  avatar: p,
  extra: y,
  footerPlacement: m,
  loading: S,
  loadingRender: E,
  onTyping: x,
  onTypingComplete: w,
  onEditConfirm: b,
  onEditCancel: P,
  ...k
}, M) => {
  const I = T.useRef(null);
  T.useImperativeHandle(M, () => ({
    nativeElement: I.current
  }));
  const D = Zr("bubble"), {
    direction: F,
    getPrefixCls: B
  } = gr(), L = B("bubble", e), A = T.useContext(Zh), [O, R] = Ni(L), H = {
    ...D.style,
    ...D.styles.root,
    ...a.root,
    ...r
  }, z = se(L, D.className, D.classNames.root, o.root, t, n, O, R, `${L}-${i}`, {
    [`${L}-${A.status}`]: A.status,
    [`${L}-rtl`]: F === "rtl",
    [`${L}-loading`]: S
  }), j = hn(k, {
    attr: !0,
    aria: !0,
    data: !0
  }), W = {
    key: A == null ? void 0 : A.key,
    status: A == null ? void 0 : A.status,
    extraInfo: A == null ? void 0 : A.extraInfo
  }, K = T.useMemo(() => l ? l(s, W) : s, [s, l, W.key, W.status, W.extraInfo]), Z = typeof u == "function" ? u(s, W) : u, Y = !!Z && typeof K == "string";
  T.useEffect(() => {
    Y || d || s && (w == null || w(s));
  }, [K, Y, d]);
  const Q = m || (i === "start" ? "outer-start" : "outer-end"), le = typeof c == "boolean" ? c : c.editing, de = () => {
    if (S) return E ? E() : /* @__PURE__ */ T.createElement(dx, {
      prefixCls: L
    });
    const ie = /* @__PURE__ */ T.createElement(T.Fragment, null, Y ? /* @__PURE__ */ T.createElement(wx, {
      prefixCls: L,
      streaming: d,
      typing: Z,
      content: K,
      onTyping: x,
      onTypingComplete: w
    }) : K), ye = Q.includes("inner");
    return /* @__PURE__ */ T.createElement("div", {
      className: fe("body"),
      style: ge("body")
    }, ee(), /* @__PURE__ */ T.createElement("div", {
      style: {
        ...D.styles.content,
        ...a.content
      },
      className: se(`${L}-content`, `${L}-content-${f}`, D.classNames.content, o.content, {
        [`${L}-content-${A == null ? void 0 : A.status}`]: A == null ? void 0 : A.status,
        [`${L}-content-${v}`]: f !== "borderless",
        [`${L}-content-editing`]: le,
        [`${L}-content-string`]: typeof K == "string"
      })
    }, le ? /* @__PURE__ */ T.createElement(ux, {
      prefixCls: L,
      content: s,
      okText: c == null ? void 0 : c.okText,
      cancelText: c == null ? void 0 : c.cancelText,
      onEditConfirm: b,
      onEditCancel: P
    }) : /* @__PURE__ */ T.createElement(T.Fragment, null, ye ? /* @__PURE__ */ T.createElement("div", {
      className: se(`${L}-content-with-footer`)
    }, ie) : ie, ye && Ae())), !le && !ye && Ae());
  }, fe = (ie) => se(`${L}-${ie}`, D.classNames[ie], o[ie]), ge = (ie) => ({
    ...D.styles[ie],
    ...a[ie]
  }), Se = (ie) => typeof ie == "function" ? ie(s, W) : ie, $e = () => p ? /* @__PURE__ */ T.createElement("div", {
    className: fe("avatar"),
    style: ge("avatar")
  }, Se(p)) : null, Me = () => y ? /* @__PURE__ */ T.createElement("div", {
    className: fe("extra"),
    style: ge("extra")
  }, Se(y)) : null, ee = () => g ? /* @__PURE__ */ T.createElement("div", {
    className: fe("header"),
    style: ge("header")
  }, Se(g)) : null, Ae = () => {
    if (!h) return null;
    const ie = se(fe("footer"), {
      [`${L}-footer-start`]: Q.includes("start"),
      [`${L}-footer-end`]: Q.includes("end")
    });
    return /* @__PURE__ */ T.createElement("div", {
      className: ie,
      style: ge("footer")
    }, Se(h));
  };
  return /* @__PURE__ */ T.createElement("div", De({
    className: z,
    style: H
  }, k, j, {
    ref: I
  }), $e(), de(), !le && !S && Me());
}, gn = /* @__PURE__ */ T.forwardRef($x);
process.env.NODE_ENV !== "production" && (gn.displayName = "Bubble");
function Qh(e, t) {
  var r = Object.assign({}, e);
  return Array.isArray(t) && t.forEach(function(n) {
    delete r[n];
  }), r;
}
var Tx = `accept acceptCharset accessKey action allowFullScreen allowTransparency
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
    summary tabIndex target title type useMap value width wmode wrap`, Rx = `onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`, Ax = "".concat(Tx, " ").concat(Rx).split(/[\s\n]+/), Px = "aria-", Ox = "data-";
function Ad(e, t) {
  return e.indexOf(t) === 0;
}
function kx(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r;
  t === !1 ? r = {
    aria: !0,
    data: !0,
    attr: !0
  } : t === !0 ? r = {
    aria: !0
  } : r = V({}, t);
  var n = {};
  return Object.keys(e).forEach(function(a) {
    // Aria
    (r.aria && (a === "role" || Ad(a, Px)) || // Data
    r.data && Ad(a, Ox) || // Attr
    r.attr && Ax.includes(a)) && (n[a] = e[a]);
  }), n;
}
const Mx = ({
  prefixCls: e,
  content: t = "",
  rootClassName: r,
  style: n,
  className: a,
  styles: o = {},
  classNames: i = {},
  dividerProps: s,
  ...l
}, c) => {
  const {
    getPrefixCls: u
  } = gr(), d = Zr("bubble"), f = u("bubble", e), [v, g] = Ni(f), h = se(v, g, f, `${f}-divider`, d.className, d.classNames.root, a, i.root, r), p = (y) => /* @__PURE__ */ T.createElement(ep, s, y);
  return /* @__PURE__ */ T.createElement(gn, De({
    ref: c,
    style: n,
    styles: o,
    className: h,
    classNames: i,
    prefixCls: f,
    variant: "borderless",
    content: t,
    contentRender: p
  }, l));
}, Nc = /* @__PURE__ */ T.forwardRef(Mx);
process.env.NODE_ENV !== "production" && (Nc.displayName = "DividerBubble");
const Nx = ({
  prefixCls: e,
  content: t,
  variant: r = "shadow",
  shape: n,
  style: a,
  className: o,
  styles: i = {},
  classNames: s = {},
  rootClassName: l,
  ...c
}, u) => {
  const d = Zr("bubble"), {
    getPrefixCls: f
  } = gr(), v = f("bubble", e), [g, h] = Ni(v), p = `${v}-system`, y = se(g, h, p, v, d.className, d.classNames.root, s.root, o, l);
  return /* @__PURE__ */ T.createElement(gn, De({
    ref: u,
    style: a,
    className: y,
    styles: i,
    classNames: s,
    variant: r,
    shape: n,
    content: t
  }, c));
}, Ic = /* @__PURE__ */ T.forwardRef(Nx);
process.env.NODE_ENV !== "production" && (Ic.displayName = "SystemBubble");
function Ix(e) {
  return typeof e == "function" && e instanceof Function;
}
const Dx = /* @__PURE__ */ C.memo(gn), Fx = /* @__PURE__ */ C.memo(Nc), Lx = /* @__PURE__ */ C.memo(Ic), jx = (e) => {
  const {
    _key: t,
    bubblesRef: r,
    extraInfo: n,
    status: a,
    role: o,
    classNames: i = {},
    styles: s = {},
    ...l
  } = e, c = C.useCallback((S) => {
    S ? r.current[t] = S : delete r.current[t];
  }, [t]), {
    bubble: u,
    divider: d,
    system: f,
    ...v
  } = i, {
    bubble: g,
    divider: h,
    system: p,
    ...y
  } = s;
  let m = /* @__PURE__ */ C.createElement(Dx, De({
    ref: c,
    style: g,
    className: u,
    classNames: v,
    styles: y
  }, l));
  return o === "divider" ? m = /* @__PURE__ */ C.createElement(Fx, De({
    ref: c,
    style: h,
    className: d,
    classNames: v,
    styles: y
  }, l)) : o === "system" && (m = /* @__PURE__ */ C.createElement(Lx, De({
    ref: c,
    style: p,
    className: f,
    classNames: v,
    styles: y
  }, l))), /* @__PURE__ */ C.createElement(Zh.Provider, {
    value: {
      key: t,
      status: a,
      extraInfo: n
    }
  }, m);
}, zx = (e, t) => {
  var M;
  const {
    prefixCls: r,
    rootClassName: n,
    className: a,
    styles: o = {},
    classNames: i = {},
    style: s,
    items: l,
    autoScroll: c = !0,
    role: u,
    onScroll: d,
    ...f
  } = e, v = kx(f, {
    attr: !0,
    aria: !0
  }), g = C.useRef(null), h = C.useRef(null), p = C.useRef({}), {
    getPrefixCls: y
  } = gr(), m = y("bubble", r), S = `${m}-list`, [E, x] = Ni(m), w = se(S, n, a, i.root, E, x), b = {
    ...o.root,
    ...s
  }, P = ((M = l[l.length - 1]) == null ? void 0 : M.key) || l.length;
  C.useEffect(() => {
    var I;
    h.current && ((I = h.current) == null || I.scrollTo({
      top: c ? 0 : h.current.scrollHeight
    }));
  }, [P, c]), _i(t, () => ({
    nativeElement: g.current,
    scrollBoxNativeElement: h.current,
    scrollTo: ({
      key: I,
      top: D,
      behavior: F = "smooth",
      block: B
    }) => {
      var O, R, H;
      const {
        scrollHeight: L,
        clientHeight: A
      } = h.current;
      if (typeof D == "number")
        (O = h.current) == null || O.scrollTo({
          top: c ? -L + A + D : D,
          behavior: F
        });
      else if (D === "bottom") {
        const z = c ? 0 : L;
        (R = h.current) == null || R.scrollTo({
          top: z,
          behavior: F
        });
      } else if (D === "top") {
        const z = c ? -L : 0;
        (H = h.current) == null || H.scrollTo({
          top: z,
          behavior: F
        });
      } else I && p.current[I] && p.current[I].nativeElement.scrollIntoView({
        behavior: F,
        block: B
      });
    }
  }));
  const k = c ? [...l].reverse() : l;
  return /* @__PURE__ */ C.createElement("div", De({}, v, {
    className: w,
    style: b,
    ref: g
  }), /* @__PURE__ */ C.createElement("div", {
    className: se(`${S}-scroll-box`, i.scroll, {
      [`${S}-autoscroll`]: c
    }),
    style: o.scroll,
    ref: h,
    onScroll: d
  }, k.map((I) => {
    let D;
    if (I.role && u) {
      const F = u[I.role];
      D = {
        ...Ix(F) ? F(I) : F,
        ...I
      };
    } else
      D = I;
    return /* @__PURE__ */ C.createElement(jx, De({
      classNames: i,
      styles: o
    }, Qh(D, ["key"]), {
      key: I.key,
      _key: I.key,
      bubblesRef: p
    }));
  })));
}, Jh = /* @__PURE__ */ C.forwardRef(zx);
process.env.NODE_ENV !== "production" && (Jh.displayName = "BubbleList");
gn.List = Jh;
gn.System = Ic;
gn.Divider = Nc;
var eg = {}, tg = { exports: {} }, rg = { exports: {} };
(function(e) {
  function t(r) {
    if (Array.isArray(r)) return r;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(rg);
var Hx = rg.exports, ng = { exports: {} };
(function(e) {
  function t(r, n) {
    var a = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
    if (a != null) {
      var o, i, s, l, c = [], u = !0, d = !1;
      try {
        if (s = (a = a.call(r)).next, n === 0) {
          if (Object(a) !== a) return;
          u = !1;
        } else for (; !(u = (o = s.call(a)).done) && (c.push(o.value), c.length !== n); u = !0) ;
      } catch (f) {
        d = !0, i = f;
      } finally {
        try {
          if (!u && a.return != null && (l = a.return(), Object(l) !== l)) return;
        } finally {
          if (d) throw i;
        }
      }
      return c;
    }
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ng);
var Vx = ng.exports, ag = { exports: {} }, og = { exports: {} };
(function(e) {
  function t(r, n) {
    (n == null || n > r.length) && (n = r.length);
    for (var a = 0, o = Array(n); a < n; a++) o[a] = r[a];
    return o;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(og);
var Bx = og.exports;
(function(e) {
  var t = Bx;
  function r(n, a) {
    if (n) {
      if (typeof n == "string") return t(n, a);
      var o = {}.toString.call(n).slice(8, -1);
      return o === "Object" && n.constructor && (o = n.constructor.name), o === "Map" || o === "Set" ? Array.from(n) : o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? t(n, a) : void 0;
    }
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ag);
var Ux = ag.exports, ig = { exports: {} };
(function(e) {
  function t() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ig);
var Wx = ig.exports;
(function(e) {
  var t = Hx, r = Vx, n = Ux, a = Wx;
  function o(i, s) {
    return t(i) || r(i, s) || n(i, s) || a();
  }
  e.exports = o, e.exports.__esModule = !0, e.exports.default = e.exports;
})(tg);
var sg = tg.exports, Dc = {}, qx = vc.default;
Object.defineProperty(Dc, "__esModule", {
  value: !0
});
Dc.default = Gx;
var Pd = qx(T);
function Gx(e) {
  var t = Pd.useRef();
  t.current = e;
  var r = Pd.useCallback(function() {
    for (var n, a = arguments.length, o = new Array(a), i = 0; i < a; i++)
      o[i] = arguments[i];
    return (n = t.current) === null || n === void 0 ? void 0 : n.call.apply(n, [t].concat(o));
  }, []);
  return r;
}
var Dn = {}, Fc = {};
Object.defineProperty(Fc, "__esModule", {
  value: !0
});
Fc.default = Kx;
function Kx() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var Yx = Ke.default, Xx = vc.default;
Object.defineProperty(Dn, "__esModule", {
  value: !0
});
Dn.useLayoutUpdateEffect = Dn.default = void 0;
var wl = Xx(T), Zx = Yx(Fc), Od = process.env.NODE_ENV !== "test" && (0, Zx.default)() ? wl.useLayoutEffect : wl.useEffect, lg = function(t, r) {
  var n = wl.useRef(!0);
  Od(function() {
    return t(n.current);
  }, r), Od(function() {
    return n.current = !1, function() {
      n.current = !0;
    };
  }, []);
};
Dn.useLayoutUpdateEffect = function(t, r) {
  lg(function(n) {
    if (!n)
      return t();
  }, r);
};
Dn.default = lg;
var Lc = {}, Qx = vc.default, Jx = Ke.default;
Object.defineProperty(Lc, "__esModule", {
  value: !0
});
Lc.default = tC;
var eC = Jx(sg), hs = Qx(T);
function tC(e) {
  var t = hs.useRef(!1), r = hs.useState(e), n = (0, eC.default)(r, 2), a = n[0], o = n[1];
  hs.useEffect(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function i(s, l) {
    l && t.current || o(s);
  }
  return [a, i];
}
var jc = Ke.default;
Object.defineProperty(eg, "__esModule", {
  value: !0
});
var zc = eg.default = rC, kd = jc(sg), Md = jc(Dc), Nd = Dn, Id = jc(Lc);
function gs(e) {
  return e !== void 0;
}
function rC(e, t) {
  var r = t || {}, n = r.defaultValue, a = r.value, o = r.onChange, i = r.postState, s = (0, Id.default)(function() {
    return gs(a) ? a : gs(n) ? typeof n == "function" ? n() : n : typeof e == "function" ? e() : e;
  }), l = (0, kd.default)(s, 2), c = l[0], u = l[1], d = a !== void 0 ? a : c, f = i ? i(d) : d, v = (0, Md.default)(o), g = (0, Id.default)([d]), h = (0, kd.default)(g, 2), p = h[0], y = h[1];
  (0, Nd.useLayoutUpdateEffect)(function() {
    var S = p[0];
    c !== S && v(c, S);
  }, [p]), (0, Nd.useLayoutUpdateEffect)(function() {
    gs(a) || u(a);
  }, [a]);
  var m = (0, Md.default)(function(S, E) {
    u(S, E), y([d], E);
  });
  return [f, m];
}
const ms = () => ({
  height: 0,
  opacity: 0
}), Dd = (e) => {
  const {
    scrollHeight: t
  } = e;
  return {
    height: t,
    opacity: 1
  };
}, nC = (e) => ({
  height: e ? e.offsetHeight : 0
}), vs = (e, t) => (t == null ? void 0 : t.deadline) === !0 || t.propertyName === "height", aC = (e = P0) => ({
  motionName: `${e}-motion-collapse`,
  onAppearStart: ms,
  onEnterStart: ms,
  onAppearActive: Dd,
  onEnterActive: Dd,
  onLeaveStart: nC,
  onLeaveActive: ms,
  onAppearEnd: vs,
  onEnterEnd: vs,
  onLeaveEnd: vs,
  motionDeadline: 500
}), oC = (e, t, r) => {
  const n = typeof e == "boolean" || (e == null ? void 0 : e.expandedKeys) === void 0, [a, o, i, s] = T.useMemo(() => {
    let f = {
      expandedKeys: [],
      defaultExpandedKeys: [],
      onExpand: () => {
      }
    };
    return e ? (typeof e == "object" && (f = {
      ...f,
      ...e
    }), [!0, f.defaultExpandedKeys, f.expandedKeys, f.onExpand]) : [!1, f.defaultExpandedKeys, f.expandedKeys, f.onExpand];
  }, [e]), [l, c] = zc(o || [], {
    value: n ? void 0 : i,
    onChange: s
  }), u = (f) => {
    c((v) => {
      const g = n ? v : i, h = g.includes(f) ? g.filter((p) => p !== f) : [...g, f];
      return s == null || s(h), h;
    });
  }, d = T.useMemo(() => a ? {
    ...aC(r),
    motionAppear: !1,
    leavedClassName: `${t}-content-hidden`
  } : {}, [r, t, a]);
  return [a, l, a ? u : void 0, d];
};
var Hc = {};
Object.defineProperty(Hc, "__esModule", {
  value: !0
});
var Vc = Hc.default = void 0, be = {
  /**
   * MAC_ENTER
   */
  MAC_ENTER: 3,
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * TAB
   */
  TAB: 9,
  /**
   * NUMLOCK on FF/Safari Mac
   */
  NUM_CENTER: 12,
  // NUMLOCK on FF/Safari Mac
  /**
   * ENTER
   */
  ENTER: 13,
  /**
   * SHIFT
   */
  SHIFT: 16,
  /**
   * CTRL
   */
  CTRL: 17,
  /**
   * ALT
   */
  ALT: 18,
  /**
   * PAUSE
   */
  PAUSE: 19,
  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,
  /**
   * ESC
   */
  ESC: 27,
  /**
   * SPACE
   */
  SPACE: 32,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33,
  // also NUM_NORTH_EAST
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34,
  // also NUM_SOUTH_EAST
  /**
   * END
   */
  END: 35,
  // also NUM_SOUTH_WEST
  /**
   * HOME
   */
  HOME: 36,
  // also NUM_NORTH_WEST
  /**
   * LEFT
   */
  LEFT: 37,
  // also NUM_WEST
  /**
   * UP
   */
  UP: 38,
  // also NUM_NORTH
  /**
   * RIGHT
   */
  RIGHT: 39,
  // also NUM_EAST
  /**
   * DOWN
   */
  DOWN: 40,
  // also NUM_SOUTH
  /**
   * PRINT_SCREEN
   */
  PRINT_SCREEN: 44,
  /**
   * INSERT
   */
  INSERT: 45,
  // also NUM_INSERT
  /**
   * DELETE
   */
  DELETE: 46,
  // also NUM_DELETE
  /**
   * ZERO
   */
  ZERO: 48,
  /**
   * ONE
   */
  ONE: 49,
  /**
   * TWO
   */
  TWO: 50,
  /**
   * THREE
   */
  THREE: 51,
  /**
   * FOUR
   */
  FOUR: 52,
  /**
   * FIVE
   */
  FIVE: 53,
  /**
   * SIX
   */
  SIX: 54,
  /**
   * SEVEN
   */
  SEVEN: 55,
  /**
   * EIGHT
   */
  EIGHT: 56,
  /**
   * NINE
   */
  NINE: 57,
  /**
   * QUESTION_MARK
   */
  QUESTION_MARK: 63,
  // needs localization
  /**
   * A
   */
  A: 65,
  /**
   * B
   */
  B: 66,
  /**
   * C
   */
  C: 67,
  /**
   * D
   */
  D: 68,
  /**
   * E
   */
  E: 69,
  /**
   * F
   */
  F: 70,
  /**
   * G
   */
  G: 71,
  /**
   * H
   */
  H: 72,
  /**
   * I
   */
  I: 73,
  /**
   * J
   */
  J: 74,
  /**
   * K
   */
  K: 75,
  /**
   * L
   */
  L: 76,
  /**
   * M
   */
  M: 77,
  /**
   * N
   */
  N: 78,
  /**
   * O
   */
  O: 79,
  /**
   * P
   */
  P: 80,
  /**
   * Q
   */
  Q: 81,
  /**
   * R
   */
  R: 82,
  /**
   * S
   */
  S: 83,
  /**
   * T
   */
  T: 84,
  /**
   * U
   */
  U: 85,
  /**
   * V
   */
  V: 86,
  /**
   * W
   */
  W: 87,
  /**
   * X
   */
  X: 88,
  /**
   * Y
   */
  Y: 89,
  /**
   * Z
   */
  Z: 90,
  /**
   * META
   */
  META: 91,
  // WIN_KEY_LEFT
  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,
  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,
  /**
   * NUM_ZERO
   */
  NUM_ZERO: 96,
  /**
   * NUM_ONE
   */
  NUM_ONE: 97,
  /**
   * NUM_TWO
   */
  NUM_TWO: 98,
  /**
   * NUM_THREE
   */
  NUM_THREE: 99,
  /**
   * NUM_FOUR
   */
  NUM_FOUR: 100,
  /**
   * NUM_FIVE
   */
  NUM_FIVE: 101,
  /**
   * NUM_SIX
   */
  NUM_SIX: 102,
  /**
   * NUM_SEVEN
   */
  NUM_SEVEN: 103,
  /**
   * NUM_EIGHT
   */
  NUM_EIGHT: 104,
  /**
   * NUM_NINE
   */
  NUM_NINE: 105,
  /**
   * NUM_MULTIPLY
   */
  NUM_MULTIPLY: 106,
  /**
   * NUM_PLUS
   */
  NUM_PLUS: 107,
  /**
   * NUM_MINUS
   */
  NUM_MINUS: 109,
  /**
   * NUM_PERIOD
   */
  NUM_PERIOD: 110,
  /**
   * NUM_DIVISION
   */
  NUM_DIVISION: 111,
  /**
   * F1
   */
  F1: 112,
  /**
   * F2
   */
  F2: 113,
  /**
   * F3
   */
  F3: 114,
  /**
   * F4
   */
  F4: 115,
  /**
   * F5
   */
  F5: 116,
  /**
   * F6
   */
  F6: 117,
  /**
   * F7
   */
  F7: 118,
  /**
   * F8
   */
  F8: 119,
  /**
   * F9
   */
  F9: 120,
  /**
   * F10
   */
  F10: 121,
  /**
   * F11
   */
  F11: 122,
  /**
   * F12
   */
  F12: 123,
  /**
   * NUMLOCK
   */
  NUMLOCK: 144,
  /**
   * SEMICOLON
   */
  SEMICOLON: 186,
  // needs localization
  /**
   * DASH
   */
  DASH: 189,
  // needs localization
  /**
   * EQUALS
   */
  EQUALS: 187,
  // needs localization
  /**
   * COMMA
   */
  COMMA: 188,
  // needs localization
  /**
   * PERIOD
   */
  PERIOD: 190,
  // needs localization
  /**
   * SLASH
   */
  SLASH: 191,
  // needs localization
  /**
   * APOSTROPHE
   */
  APOSTROPHE: 192,
  // needs localization
  /**
   * SINGLE_QUOTE
   */
  SINGLE_QUOTE: 222,
  // needs localization
  /**
   * OPEN_SQUARE_BRACKET
   */
  OPEN_SQUARE_BRACKET: 219,
  // needs localization
  /**
   * BACKSLASH
   */
  BACKSLASH: 220,
  // needs localization
  /**
   * CLOSE_SQUARE_BRACKET
   */
  CLOSE_SQUARE_BRACKET: 221,
  // needs localization
  /**
   * WIN_KEY
   */
  WIN_KEY: 224,
  /**
   * MAC_FF_META
   */
  MAC_FF_META: 224,
  // Firefox (Gecko) fires this for the meta key instead of 91
  /**
   * WIN_IME
   */
  WIN_IME: 229,
  // ======================== Function ========================
  /**
   * whether text and modified key is entered at the same time.
   */
  isTextModifyingKeyEvent: function(t) {
    var r = t.keyCode;
    if (t.altKey && !t.ctrlKey || t.metaKey || // Function keys don't generate text
    r >= be.F1 && r <= be.F12)
      return !1;
    switch (r) {
      case be.ALT:
      case be.CAPS_LOCK:
      case be.CONTEXT_MENU:
      case be.CTRL:
      case be.DOWN:
      case be.END:
      case be.ESC:
      case be.HOME:
      case be.INSERT:
      case be.LEFT:
      case be.MAC_FF_META:
      case be.META:
      case be.NUMLOCK:
      case be.NUM_CENTER:
      case be.PAGE_DOWN:
      case be.PAGE_UP:
      case be.PAUSE:
      case be.PRINT_SCREEN:
      case be.RIGHT:
      case be.SHIFT:
      case be.UP:
      case be.WIN_KEY:
      case be.WIN_KEY_RIGHT:
        return !1;
      default:
        return !0;
    }
  },
  /**
   * whether character is entered.
   */
  isCharacterKey: function(t) {
    if (t >= be.ZERO && t <= be.NINE || t >= be.NUM_ZERO && t <= be.NUM_MULTIPLY || t >= be.A && t <= be.Z || window.navigator.userAgent.indexOf("WebKit") !== -1 && t === 0)
      return !0;
    switch (t) {
      case be.SPACE:
      case be.QUESTION_MARK:
      case be.NUM_PLUS:
      case be.NUM_MINUS:
      case be.NUM_PERIOD:
      case be.NUM_DIVISION:
      case be.SEMICOLON:
      case be.DASH:
      case be.EQUALS:
      case be.COMMA:
      case be.PERIOD:
      case be.SLASH:
      case be.APOSTROPHE:
      case be.SINGLE_QUOTE:
      case be.OPEN_SQUARE_BRACKET:
      case be.BACKSLASH:
      case be.CLOSE_SQUARE_BRACKET:
        return !0;
      default:
        return !1;
    }
  }
};
Vc = Hc.default = be;
const an = {
  Alt: ["altKey", "⌥", "Alt"],
  Ctrl: ["ctrlKey", "⌃", "Ctrl"],
  Meta: ["metaKey", "⌘", "Win"],
  Shift: ["shiftKey", "⇧", "Shift"]
}, $l = Array.from({
  length: 9
}, (e, t) => Vc.ONE + t), Fd = /(mac|iphone|ipod|ipad)/i.test(typeof navigator < "u" ? navigator == null ? void 0 : navigator.platform : ""), Ld = (e) => {
  var t, r, n;
  return e === "number" ? e : typeof e == "string" && ((t = an == null ? void 0 : an[e]) != null && t[Fd ? 1 : 2]) ? an[e][Fd ? 1 : 2] : ((n = (r = Object.entries(Vc || {})) == null ? void 0 : r.find(([a, o]) => o === e)) == null ? void 0 : n[0]) || "";
}, iC = (e, t) => {
  const r = [...e], n = r.pop();
  return r.reduce((i, s) => {
    var l;
    return i && (t[(l = an == null ? void 0 : an[s]) == null ? void 0 : l[0]] || !1);
  }, n === t.keyCode) ? {
    actionShortcutKey: e,
    actionKeyCodeNumber: $l.indexOf(t.keyCode) > -1 ? $l.indexOf(t.keyCode) : !1,
    actionKeyCode: t.keyCode,
    timeStamp: t.timeStamp
  } : !1;
}, sC = (e) => {
  const t = [...e], r = t.pop();
  return {
    keyCodeDict: r === "number" ? $l : [r],
    prefixKeys: t
  };
}, jd = (e, t, r) => {
  const n = !!e.find(({
    shortcutKey: a
  }) => a.toString() === t.toString());
  wi(!n, r, `Same shortcutKey ${t.toString()}`);
}, lC = (e, t, r) => {
  const n = Object.assign({}, t || {}, r);
  return Object.keys(n).reduce(({
    flattenShortcutKeys: a,
    shortcutKeysInfo: o
  }, i) => {
    const s = n[i];
    if (!Array.isArray(s))
      return {
        flattenShortcutKeys: a,
        shortcutKeysInfo: o
      };
    if (o = {
      ...o,
      [i]: {
        shortcutKeys: s,
        shortcutKeysIcon: []
      }
    }, s.every((l) => Array.isArray(l)))
      s.forEach((l, c) => {
        const u = l;
        jd(a, u, e), a.push({
          name: i,
          shortcutKey: u,
          index: c
        }), o[i].shortcutKeysIcon.push(u == null ? void 0 : u.map((d) => Ld(d)));
      });
    else {
      const {
        keyCodeDict: l,
        prefixKeys: c
      } = sC(s);
      l.forEach((u) => {
        jd(a, [...c, u], e), a.push({
          name: i,
          shortcutKey: [...c, u]
        });
      }), o[i].shortcutKeysIcon = s.map((u) => Ld(u));
    }
    return {
      flattenShortcutKeys: a,
      shortcutKeysInfo: o
    };
  }, {
    flattenShortcutKeys: [],
    shortcutKeysInfo: {}
  });
}, cC = () => {
  const e = Ue(void 0);
  return [e, (r) => {
    e.current = r;
  }];
}, uC = (e, t) => {
  const r = Zr(e), {
    flattenShortcutKeys: n,
    shortcutKeysInfo: a
  } = lC(e, r.shortcutKeys, t), [o, i] = hr(null), [s, l] = cC(), c = Ue(!1), u = (f) => {
    var v;
    for (const g of n) {
      const h = iC(g.shortcutKey, f);
      if (h) {
        const p = {
          ...h,
          name: g.name,
          index: g == null ? void 0 : g.index
        };
        if (c.current)
          return;
        c.current = !0, i(p), (v = s == null ? void 0 : s.current) == null || v.call(s, p);
      }
    }
  }, d = () => {
    c.current = !1;
  };
  return Ct(() => {
    if (n.length !== 0)
      return document.addEventListener("keydown", u), document.addEventListener("keyup", d), () => {
        document.removeEventListener("keydown", u), document.addEventListener("keyup", d);
      };
  }, [n.length, s]), [o, a, l];
}, zd = ({
  shortcutKeysIcon: e,
  prefixCls: t
}) => {
  const [r] = $i("Conversations", Vr.Conversations), n = !!(e != null && e.length);
  return /* @__PURE__ */ T.createElement("div", {
    className: se(t, {
      [`${t}-shortcut-keys-show`]: n
    })
  }, /* @__PURE__ */ T.createElement("span", null, r.create), n && /* @__PURE__ */ T.createElement("span", {
    className: se(`${t}-shortcut-keys`)
  }, e.map((a) => /* @__PURE__ */ T.createElement("span", {
    className: se(`${t}-shortcut-key`),
    key: a
  }, a))));
}, dC = ({
  icon: e,
  label: t,
  align: r,
  shortcutKeyInfo: n,
  prefixCls: a
}) => {
  const {
    shortcutKeysIcon: o
  } = n || {}, i = {
    label: /* @__PURE__ */ T.createElement(zd, {
      prefixCls: `${a}-label`,
      shortcutKeysIcon: o
    }),
    icon: /* @__PURE__ */ T.createElement(sv, {
      className: `${a}-icon`
    }),
    align: "center"
  };
  return t && (i.label = typeof t == "function" ? t({
    shortcutKeyInfo: n,
    components: {
      CreationLabel: zd
    }
  }) : t), e && (i.icon = typeof e == "function" ? e() : e), [i.icon, i.label, r || i.align];
}, cg = ({
  className: e,
  icon: t,
  label: r,
  align: n,
  style: a,
  disabled: o,
  onClick: i,
  prefixCls: s,
  shortcutKeyInfo: l
}) => {
  const [c, u, d] = dC({
    prefixCls: s,
    label: r,
    icon: t,
    align: n,
    shortcutKeyInfo: l
  });
  return /* @__PURE__ */ C.createElement("button", {
    type: "button",
    onClick: (f) => {
      o || i == null || i(f);
    },
    style: a,
    className: se(s, e, `${s}-${d}`, {
      [`${s}-disabled`]: o
    })
  }, c, u);
}, ug = /* @__PURE__ */ T.createContext(null), fC = ({
  className: e,
  children: t
}) => {
  var h;
  const {
    prefixCls: r,
    groupInfo: n,
    enableCollapse: a,
    expandedKeys: o,
    onItemExpand: i,
    collapseMotion: s
  } = T.useContext(ug) || {}, {
    label: l,
    name: c,
    collapsible: u
  } = n || {}, d = typeof l == "function" ? l(c, {
    groupInfo: n
  }) : l || c, f = u && a, v = () => {
    f && (i == null || i(n.name));
  }, g = f && !!((h = o == null ? void 0 : o.includes) != null && h.call(o, c));
  return /* @__PURE__ */ T.createElement("li", {
    className: e
  }, /* @__PURE__ */ T.createElement("div", {
    className: se(`${r}-group-title`, {
      [`${r}-group-title-collapsible`]: f
    }),
    onClick: v
  }, d && /* @__PURE__ */ T.createElement("div", {
    className: se(`${r}-group-label`)
  }, d), f && /* @__PURE__ */ T.createElement("div", {
    className: se(`${r}-group-collapse-trigger `, `${r}-group-collapse-trigger-${g ? "open" : "close"}`)
  }, /* @__PURE__ */ T.createElement(lv, null))), /* @__PURE__ */ T.createElement(mc, De({}, s, {
    visible: f ? g : !0
  }), ({
    className: p,
    style: y
  }, m) => /* @__PURE__ */ T.createElement("div", {
    className: se(p),
    ref: m,
    style: y
  }, t)));
}, pC = (e, t = []) => {
  const [r, n, a] = Hr(() => {
    let o = {
      label: "",
      collapsibleHandle: !1,
      collapsibleOptions: {}
    };
    if (!e)
      return ["", o.collapsibleHandle, o.collapsibleOptions];
    if (typeof e == "object") {
      const {
        collapsible: i,
        defaultExpandedKeys: s,
        expandedKeys: l,
        onExpand: c,
        ...u
      } = e;
      o = {
        ...o,
        ...u,
        collapsibleHandle: i,
        collapsibleOptions: {
          defaultExpandedKeys: s,
          expandedKeys: l,
          onExpand: c
        }
      };
    }
    return [o.label, o.collapsibleHandle, o.collapsibleOptions];
  }, [e]);
  return T.useMemo(() => {
    const o = t.reduce((s, l) => {
      if ((l == null ? void 0 : l.type) === "divider" || !l.group || !e)
        return s.push({
          data: [l],
          name: "",
          label: "",
          enableGroup: !1,
          collapsible: !1
        }), s;
      const c = l, u = s.some((f, v) => f.name === (c == null ? void 0 : c.group) ? (s[v].data.push(c), !0) : !1), d = typeof n == "function" ? n == null ? void 0 : n(c == null ? void 0 : c.group) : n;
      return u || s.push({
        data: [c],
        enableGroup: !0,
        name: c == null ? void 0 : c.group,
        label: r,
        collapsible: d
      }), s;
    }, []), i = o.reduce((s, l) => (l.data.forEach((c) => {
      c.type !== "divider" && s.push({
        key: c.key,
        disabled: c.disabled
      });
    }), s), []);
    return [o, a, i];
  }, [t, a]);
}, Hd = (e) => {
  e.stopPropagation();
}, hC = (e) => {
  const {
    prefixCls: t,
    info: r,
    className: n,
    direction: a,
    onClick: o,
    active: i,
    menu: s,
    ...l
  } = e, c = hn(l, {
    aria: !0,
    data: !0,
    attr: !0
  }), {
    disabled: u
  } = r, d = se(n, `${t}-item`, {
    [`${t}-item-active`]: i && !u
  }, {
    [`${t}-item-disabled`]: u
  }), f = () => {
    !u && o && o(r.key);
  }, {
    trigger: v,
    ...g
  } = s || {}, h = g == null ? void 0 : g.getPopupContainer, p = (y) => {
    const m = /* @__PURE__ */ T.createElement(cv, {
      onClick: Hd,
      className: `${t}-menu-icon`
    });
    return v ? typeof v == "function" ? v(y, {
      originNode: m
    }) : v : m;
  };
  return /* @__PURE__ */ T.createElement("li", De({
    title: typeof r.label == "object" ? void 0 : `${r.label}`
  }, c, {
    className: d,
    onClick: f
  }), r.icon && /* @__PURE__ */ T.createElement("div", {
    className: `${t}-icon`
  }, r.icon), /* @__PURE__ */ T.createElement(mv.Text, {
    className: `${t}-label`
  }, r.label), !u && s && /* @__PURE__ */ T.createElement("div", {
    onClick: Hd
  }, /* @__PURE__ */ T.createElement(tp, {
    menu: g,
    placement: a === "rtl" ? "bottomLeft" : "bottomRight",
    trigger: ["click"],
    disabled: u,
    getPopupContainer: h
  }, p(r))));
}, gC = (e) => {
  const {
    componentCls: t,
    calc: r
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
      [`${t}-creation`]: {
        backgroundColor: e.creationBgColor,
        color: e.colorPrimary,
        border: "none",
        fontWeight: 500,
        paddingBlock: e.paddingXS,
        paddingInline: e.paddingSM,
        fontSize: e.fontSize,
        cursor: "pointer",
        display: "flex",
        gap: e.paddingXS,
        marginBlockEnd: e.marginSM,
        lineHeight: e.lineHeight,
        borderRadius: e.borderRadiusLG,
        transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
        [`&:not(${t}-creation-disabled):hover`]: {
          color: e.colorPrimary,
          background: e.creationHoverColor
        },
        [`&:not(${t}-creation-disabled)`]: {
          border: `${st(e.lineWidth)} ${e.lineType}, ${e.creationBorderColor}`
        },
        "&-start": {
          justifyContent: "flex-start"
        },
        "&-center": {
          justifyContent: "center"
        },
        "&-end": {
          justifyContent: "flex-end"
        },
        "&-label": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        "&-label-shortcut-keys-show": {
          flex: 1
        },
        "&-label-shortcut-keys": {
          height: e.controlHeightXS,
          display: "flex",
          alignItems: "center",
          gap: st(4)
        },
        "&-label-shortcut-key": {
          borderRadius: e.borderRadiusSM,
          height: "100%",
          boxSizing: "border-box",
          fontSize: e.fontSizeIcon,
          paddingInline: `${st(r(e.paddingXXS).sub(1).equal())}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: e.shortcutKeyTextColor,
          border: `${st(e.lineWidth)} ${e.lineType}, ${e.creationBorderColor}`
        },
        "&-disabled": {
          cursor: "not-allowed",
          background: e.colorBgContainerDisabled,
          [`& ${t}-creation-label, ${t}-creation-icon`]: {
            color: e.colorTextDisabled
          },
          [`& ${t}-creation-label-shortcut-keys`]: {
            color: e.colorTextDisabled,
            border: `${st(e.lineWidth)} ${e.lineType}, ${e.colorBgContainerDisabled}`
          }
        }
      },
      [`& ${t}-rtl`]: {
        direction: "rtl"
      },
      [`& ${t}-divider`]: {
        marginBlock: e.marginXXS
      },
      [`& ${t}-item`]: {
        display: "flex",
        height: e.controlHeightLG,
        minHeight: e.controlHeightLG,
        gap: e.paddingXS,
        padding: `0 ${st(e.paddingXS)}`,
        alignItems: "center",
        borderRadius: e.borderRadiusLG,
        cursor: "pointer",
        transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
        [`&:not(${t}-item-disabled):hover`]: {
          backgroundColor: e.colorBgTextHover
        },
        "&-active": {
          backgroundColor: e.colorBgTextHover,
          [`& ${t}-label, ${t}-menu-icon`]: {
            color: e.colorText
          }
        },
        "&-disabled": {
          cursor: "not-allowed",
          [`& ${t}-label, ${t}-icon, ${t}-menu-icon`]: {
            color: e.colorTextDisabled
          }
        },
        "&:hover, &-active": {
          [`& ${t}-menu-icon`]: {
            opacity: 0.6
          }
        },
        [`${t}-menu-icon:hover`]: {
          opacity: 1
        }
      },
      [`& ${t}-content-hidden`]: {
        display: "none"
      },
      [`& ${t}-label`]: {
        flex: 1,
        color: e.colorText,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      },
      [`& ${t}-menu-icon`]: {
        opacity: 0,
        fontSize: e.fontSizeXL
      },
      [`& ${t}-list`]: {
        display: "flex",
        gap: e.paddingXXS,
        flexDirection: "column"
      },
      [`& ${t}-group-collapsible-list`]: {
        paddingBlockStart: e.paddingXXS,
        [`& ${t}-item`]: {
          paddingInlineStart: e.paddingXL
        }
      },
      [`& ${t}-group-title`]: {
        display: "flex",
        alignItems: "center",
        color: e.colorTextDescription,
        height: e.controlHeightLG,
        minHeight: e.controlHeightLG,
        padding: `0 ${st(e.paddingXS)}`
      },
      [`& ${t}-group-title-collapsible`]: {
        justifyContent: "space-between",
        cursor: "pointer",
        color: e.colorText,
        borderRadius: e.borderRadiusLG,
        transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
        "&:hover": {
          backgroundColor: e.colorBgTextHover
        }
      },
      [`& ${t}-group-collapse-trigger`]: {
        transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
        transform: "rotate(0deg)",
        transformOrigin: "center center"
      },
      [`& ${t}-group-collapse-trigger-open`]: {
        transform: "rotate(90deg)"
      },
      [`& ${t}-group-collapse-trigger-close`]: {
        transform: "rotate(0deg)"
      }
    }
  };
}, mC = (e) => {
  const t = new Jt(e.colorPrimary).setA(0.15), r = new Jt(e.colorPrimary).setA(0.22), n = new Jt(e.colorPrimary).setA(0.25), a = new Jt(e.colorPrimary).setA(0.65);
  return {
    creationBgColor: t.toRgbString(),
    creationBorderColor: r.toRgbString(),
    creationHoverColor: n.toRgbString(),
    shortcutKeyTextColor: a.toRgbString()
  };
}, vC = Mc("Conversations", (e) => {
  const t = Ya(e, {});
  return [gC(t), KS(t)];
}, mC), yC = /* @__PURE__ */ T.forwardRef((e, t) => {
  const {
    prefixCls: r,
    shortcutKeys: n,
    rootClassName: a,
    items: o,
    activeKey: i,
    defaultActiveKey: s,
    onActiveChange: l,
    menu: c,
    styles: u = {},
    classNames: d = {},
    groupable: f,
    className: v,
    style: g,
    creation: h,
    ...p
  } = e, y = hn(p, {
    attr: !0,
    aria: !0,
    data: !0
  }), m = T.useRef(null);
  _i(t, () => ({
    nativeElement: m.current
  }));
  const [S, E] = zc(s, {
    value: i,
    onChange: (Q) => {
      Q && (l == null || l(Q));
    }
  }), [x, w, b] = pC(f, o), {
    getPrefixCls: P,
    direction: k
  } = gr(), M = P("conversations", r), I = Zr("conversations"), [D, F] = vC(M), B = se(M, I.className, I.classNames.root, v, d.root, a, D, F, {
    [`${M}-rtl`]: k === "rtl"
  }), L = (Q) => {
    E(Q);
  }, [A, O, R] = uC("conversations", n);
  R((Q) => {
    var le, de, fe;
    switch (Q == null ? void 0 : Q.name) {
      case "items":
        {
          const ge = (Q == null ? void 0 : Q.actionKeyCodeNumber) ?? (Q == null ? void 0 : Q.index);
          typeof ge == "number" && !((le = b == null ? void 0 : b[ge]) != null && le.disabled) && ((de = b == null ? void 0 : b[ge]) != null && de.key) && E((fe = b == null ? void 0 : b[ge]) == null ? void 0 : fe.key);
        }
        break;
      case "creation":
        typeof (h == null ? void 0 : h.onClick) == "function" && !(h != null && h.disabled) && h.onClick();
        break;
    }
  });
  const z = (Q) => Q.map((le, de) => {
    if (le.type === "divider")
      return /* @__PURE__ */ T.createElement(ep, {
        key: `key-divider-${de}`,
        className: `${M}-divider`,
        dashed: le.dashed
      });
    const fe = le, {
      label: ge,
      disabled: Se,
      icon: $e,
      ...Me
    } = fe;
    return /* @__PURE__ */ T.createElement(hC, De({}, Me, {
      key: fe.key || `key-${de}`,
      info: fe,
      prefixCls: M,
      direction: k,
      className: se(d.item, I.classNames.item, fe.className),
      style: {
        ...I.styles.item,
        ...u.item,
        ...fe.style
      },
      menu: typeof c == "function" ? c(fe) : c,
      active: S === fe.key,
      onClick: L
    }));
  }), j = P(), [W, K, Z, Y] = oC(w, M, j);
  return /* @__PURE__ */ T.createElement("ul", De({}, y, {
    style: {
      ...I.style,
      ...g,
      ...I.styles.root,
      ...u.root
    },
    className: B,
    ref: m
  }), !!h && /* @__PURE__ */ T.createElement(cg, De({
    className: se(I.classNames.creation, d.creation),
    style: {
      ...I.styles.creation,
      ...u.creation
    },
    shortcutKeyInfo: O == null ? void 0 : O.creation,
    prefixCls: `${M}-creation`
  }, h)), x.map((Q, le) => {
    const de = z(Q.data);
    return Q.enableGroup ? /* @__PURE__ */ T.createElement(ug.Provider, {
      key: Q.name || `key-${le}`,
      value: {
        prefixCls: M,
        groupInfo: Q,
        enableCollapse: W,
        expandedKeys: K,
        onItemExpand: Z,
        collapseMotion: Y
      }
    }, /* @__PURE__ */ T.createElement(fC, {
      className: se(I.classNames.group, d.group)
    }, /* @__PURE__ */ T.createElement("ul", {
      className: se(`${M}-list`, {
        [`${M}-group-collapsible-list`]: Q.collapsible
      }),
      style: {
        ...I.styles.group,
        ...u.group
      }
    }, de))) : de;
  }));
}), dg = yC;
process.env.NODE_ENV !== "production" && (dg.displayName = "Conversations");
dg.Creation = cg;
const Ii = /* @__PURE__ */ C.createContext(null);
function bC(e, t) {
  const {
    className: r,
    action: n,
    onClick: a,
    ...o
  } = e, i = C.useContext(Ii), {
    prefixCls: s,
    disabled: l
  } = i, c = o.disabled ?? l ?? i[`${n}Disabled`];
  return /* @__PURE__ */ C.createElement(ba, De({
    type: "text"
  }, o, {
    ref: t,
    onClick: (u) => {
      var d;
      c || ((d = i[n]) == null || d.call(i), a == null || a(u));
    },
    disabled: c,
    className: se(s, r, {
      [`${s}-disabled`]: c
    })
  }));
}
const Di = /* @__PURE__ */ C.forwardRef(bC);
function SC(e, t) {
  return /* @__PURE__ */ C.createElement(Di, De({
    icon: /* @__PURE__ */ C.createElement(uv, null)
  }, e, {
    action: "onClear",
    ref: t
  }));
}
const EC = /* @__PURE__ */ C.forwardRef(SC), xC = /* @__PURE__ */ ov((e) => {
  const {
    className: t
  } = e, [r] = $i("Sender", Vr.Sender);
  return /* @__PURE__ */ T.createElement("svg", {
    color: "currentColor",
    viewBox: "0 0 1000 1000",
    xmlns: "http://www.w3.org/2000/svg",
    className: t
  }, /* @__PURE__ */ T.createElement("title", null, r.stopLoading), /* @__PURE__ */ T.createElement("rect", {
    fill: "currentColor",
    height: "250",
    rx: "24",
    ry: "24",
    width: "250",
    x: "375",
    y: "375"
  }), /* @__PURE__ */ T.createElement("circle", {
    cx: "500",
    cy: "500",
    fill: "none",
    r: "450",
    stroke: "currentColor",
    strokeWidth: "100",
    opacity: "0.45"
  }), /* @__PURE__ */ T.createElement("circle", {
    cx: "500",
    cy: "500",
    fill: "none",
    r: "450",
    stroke: "currentColor",
    strokeWidth: "100",
    strokeDasharray: "600 9999999"
  }, /* @__PURE__ */ T.createElement("animateTransform", {
    attributeName: "transform",
    dur: "1s",
    from: "0 500 500",
    repeatCount: "indefinite",
    to: "360 500 500",
    type: "rotate"
  })));
});
function CC(e, t) {
  const {
    prefixCls: r
  } = C.useContext(Ii), {
    className: n
  } = e;
  return /* @__PURE__ */ C.createElement(Di, De({
    icon: /* @__PURE__ */ C.createElement(xC, {
      className: `${r}-loading-icon`
    }),
    color: "primary",
    variant: "text",
    shape: "circle"
  }, e, {
    className: se(n, `${r}-loading-button`),
    action: "onCancel",
    ref: t
  }));
}
const fg = /* @__PURE__ */ C.forwardRef(CC);
function _C(e, t) {
  return /* @__PURE__ */ C.createElement(Di, De({
    icon: /* @__PURE__ */ C.createElement(dv, null),
    type: "primary",
    shape: "circle"
  }, e, {
    action: "onSend",
    ref: t
  }));
}
const pg = /* @__PURE__ */ C.forwardRef(_C);
function wC(e, t) {
  const {
    speechRecording: r,
    onSpeechDisabled: n,
    prefixCls: a
  } = C.useContext(Ii);
  let o = null;
  return r ? o = /* @__PURE__ */ C.createElement(k0, {
    className: `${a}-recording-icon`
  }) : n ? o = /* @__PURE__ */ C.createElement(fv, null) : o = /* @__PURE__ */ C.createElement(pv, null), /* @__PURE__ */ C.createElement(Di, De({
    icon: o,
    color: "primary",
    variant: "text"
  }, e, {
    action: "onSpeech",
    ref: t
  }));
}
const hg = /* @__PURE__ */ C.forwardRef(wC), Fi = /* @__PURE__ */ T.createContext({}), gg = /* @__PURE__ */ C.createContext({}), Vd = () => ({
  height: 0
}), Bd = (e) => ({
  height: e.scrollHeight
});
function $C(e) {
  const {
    title: t,
    onOpenChange: r,
    open: n,
    children: a,
    className: o,
    style: i,
    classNames: s = {},
    styles: l = {},
    prefixCls: c,
    closable: u,
    forceRender: d
  } = e, {
    prefixCls: f
  } = C.useContext(gg), {
    direction: v,
    getPrefixCls: g
  } = gr(), p = `${g("sender", c || f)}-header`, y = () => {
    r == null || r(!n);
  };
  return /* @__PURE__ */ C.createElement(mc, {
    motionEnter: !0,
    motionLeave: !0,
    motionName: `${p}-motion`,
    leavedClassName: `${p}-motion-hidden`,
    onEnterStart: Vd,
    onEnterActive: Bd,
    onLeaveStart: Bd,
    onLeaveActive: Vd,
    visible: n,
    forceRender: d
  }, ({
    className: m,
    style: S
  }) => /* @__PURE__ */ C.createElement("div", {
    className: se(p, m, o, {
      [`${p}-rtl`]: v === "rtl"
    }),
    style: {
      ...S,
      ...i
    }
  }, (u !== !1 || t) && /* @__PURE__ */ C.createElement("div", {
    className: (
      // We follow antd naming standard here.
      // So the header part is use `-header` suffix.
      // Though its little bit weird for double `-header`.
      se(`${p}-header`, s.header)
    ),
    style: {
      ...l.header
    }
  }, /* @__PURE__ */ C.createElement("div", {
    className: `${p}-title`
  }, t), u !== !1 && /* @__PURE__ */ C.createElement("div", {
    className: `${p}-close`
  }, /* @__PURE__ */ C.createElement(ba, {
    type: "text",
    icon: /* @__PURE__ */ C.createElement(hv, null),
    size: "small",
    onClick: y
  }))), a && /* @__PURE__ */ C.createElement("div", {
    className: se(`${p}-content`, s.content),
    style: {
      ...l.content
    }
  }, a)));
}
const TC = (e) => {
  const {
    componentCls: t,
    calc: r
  } = e, n = `${t}-header`;
  return {
    [t]: {
      [`&${n}-rtl`]: {
        direction: "rtl"
      },
      [n]: {
        borderBottomWidth: e.lineWidth,
        borderBottomStyle: "solid",
        borderBottomColor: e.colorBorderInput,
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
          transition: ["height", "border"].map((a) => `${a} ${e.motionDurationSlow}`).join(","),
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
}, RC = (e) => {
  const {
    componentCls: t,
    antCls: r,
    calc: n
  } = e, a = `${t}-slot`, o = `${r}-input`, i = `${r}-dropdown-trigger`, s = `${t}-slot-input`, l = `${t}-slot-select`, c = `${t}-slot-tag`;
  return {
    [t]: {
      [`${t}-input-slot`]: {
        outline: "none",
        cursor: "text",
        whiteSpace: "pre-wrap",
        width: "100%",
        caretColor: e.colorPrimary,
        fontSize: e.fontSize,
        lineHeight: e.lineHeight,
        "&:empty::before": {
          content: "attr(data-placeholder)",
          color: e.colorTextPlaceholder
        }
      },
      [a]: {
        display: "inline-flex",
        margin: `0 ${st(e.marginXXS)}`,
        verticalAlign: "bottom",
        alignItems: "center",
        marginBlock: st(n(e.marginXXS).div(2).equal()),
        minHeight: e.controlHeightSM,
        wordBreak: "break-all"
      },
      [`${o}${s}`]: {
        background: e.colorBgSlot,
        border: `1px solid ${e.colorBorderSlot}`,
        outline: "none",
        color: e.colorTextSlot,
        borderRadius: e.borderRadius,
        padding: `0 ${st(e.paddingXXS)}`,
        fontSize: e.fontSize,
        lineHeight: e.lineHeight,
        position: "relative",
        "&::placeholder": {
          color: e.colorTextSlotPlaceholder,
          fontSize: e.fontSize,
          lineHeight: e.lineHeight
        },
        "&:hover, &:focus": {
          borderColor: e.colorBorderSlotHover
        }
      },
      [`${l}`]: {
        fontSize: e.fontSize,
        lineHeight: e.lineHeight,
        padding: `0 ${st(e.paddingXXS)}`,
        transition: `border-color  ${e.motionDurationMid}`,
        position: "relative",
        display: "inline",
        cursor: "pointer",
        background: e.colorBgSlot,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: e.borderRadius,
        color: e.colorTextSlot,
        border: `1px solid ${e.colorBorderSlot}`,
        "&.placeholder": {
          color: e.colorTextSlotPlaceholder
        },
        [`&${i}-open`]: {
          borderColor: e.colorBorderSlotHover
        }
      },
      [`${l}-value`]: {
        flex: 1,
        fontSize: e.fontSize,
        lineHeight: e.lineHeight,
        "&:empty::before": {
          content: "attr(data-placeholder)"
        }
      },
      [`${l}-arrow`]: {
        marginInlineStart: e.marginXXS,
        fontSize: e.fontSize,
        lineHeight: e.lineHeight,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      },
      [`${c}`]: {
        background: e.colorBgSlot,
        border: `1px solid ${e.colorBorderSlot}`,
        outline: "none",
        color: e.colorTextSlot,
        borderRadius: e.borderRadius,
        padding: `0 ${st(e.paddingXXS)}`,
        fontSize: e.fontSize,
        lineHeight: e.lineHeight,
        position: "relative",
        cursor: "default"
      }
    }
  };
}, AC = (e) => {
  const {
    componentCls: t,
    antCls: r
  } = e, n = `${t}-switch`;
  return {
    [n]: {
      display: "inline-block",
      [`${r}-btn:not(:disabled):not(${r}-btn-disabled):hover`]: {
        background: e.switchUncheckedHoverBg,
        borderColor: e.colorBorder,
        color: e.colorText
      },
      "&-checked": {
        [`${r}-btn:not(:disabled):not(${r}-btn-disabled):hover`]: {
          background: e.switchCheckedHoverBg,
          borderColor: e.colorPrimary,
          color: e.colorPrimaryText
        },
        [`${n}-content`]: {
          background: e.switchCheckedBg
        }
      },
      // ============================== RTL ==============================
      [`&${t}-rtl`]: {
        direction: "rtl"
      }
    }
  };
}, PC = (e) => {
  const {
    componentCls: t,
    paddingSM: r,
    paddingXS: n,
    paddingXXS: a,
    lineWidth: o,
    calc: i
  } = e;
  return {
    [`${t}:not(${t}-switch):not(${t}-header)`]: {
      position: "relative",
      width: "100%",
      boxSizing: "border-box",
      boxShadow: `${e.boxShadowTertiary}`,
      // Border
      borderRadius: {
        _skip_check_: !0,
        value: i(e.borderRadius).mul(2).equal()
      },
      borderColor: e.colorBorderInput,
      borderWidth: o,
      borderStyle: "solid",
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
        gap: n,
        width: "100%",
        paddingBlock: r,
        paddingInlineStart: r,
        paddingInlineEnd: r,
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
        minHeight: "auto",
        caretColor: e.colorPrimary
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
          background: e.colorPrimary,
          opacity: 0.45,
          color: e.colorTextLightSolid
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
        paddingInlineEnd: r,
        paddingBlockEnd: r,
        paddingBlockStart: a,
        boxSizing: "border-box"
      }
    }
  };
}, OC = (e) => {
  const {
    colorPrimary: t,
    colorFillTertiary: r
  } = e, n = new Jt(t).setA(0.06).toRgbString(), a = t, o = new Jt(t).setA(0.25).toRgbString(), i = new Jt(t).setA(0.1).toRgbString(), s = n, l = new Jt(t).setA(0.08).toRgbString(), c = new Jt(r).setA(0.04).toRgbString(), u = new Jt(t).setA(0.1).toRgbString(), d = new Jt(r).setA(0.1).toRgbString(), f = `0 4px 12px 0 ${new Jt(t).setA(0.1).toRgbString()}`;
  return {
    colorBgSlot: n,
    colorTextSlot: a,
    colorTextSlotPlaceholder: o,
    colorBorderSlotHover: i,
    colorBorderSlot: s,
    switchCheckedBg: l,
    switchCheckedHoverBg: u,
    switchUncheckedHoverBg: c,
    colorBorderInput: d,
    boxShadowInput: f
  };
}, mg = Mc("Sender", (e) => {
  const {
    paddingXS: t,
    calc: r
  } = e, n = Ya(e, {
    SenderContentMaxWidth: `calc(100% - ${st(r(t).add(32).equal())})`
  });
  return [PC(n), TC(n), AC(n), RC(n)];
}, OC), kC = /* @__PURE__ */ C.forwardRef((e, t) => {
  const {
    children: r,
    className: n,
    classNames: a = {},
    styles: o = {},
    icon: i,
    style: s,
    onChange: l,
    rootClassName: c,
    loading: u,
    defaultValue: d,
    value: f,
    checkedChildren: v,
    unCheckedChildren: g,
    disabled: h,
    prefixCls: p,
    ...y
  } = e, {
    styles: m = {},
    classNames: S = {},
    prefixCls: E
  } = C.useContext(Fi), x = hn(y, {
    attr: !0,
    aria: !0,
    data: !0
  }), w = C.useId(), {
    direction: b,
    getPrefixCls: P
  } = gr(), k = P("sender", p || E), M = `${k}-switch`, [I, D] = mg(k), F = C.useRef(null);
  _i(t, () => ({
    nativeElement: F.current
  }));
  const [B, L] = zc(d, {
    value: f,
    onChange: (R) => {
      l == null || l(R || !1);
    }
  }), A = Zr("sender"), O = se(M, n, c, A.classNames.switch, S.switch, a.root, I, D, {
    [`${M}-checked`]: B,
    [`${k}-rtl`]: b === "rtl"
  });
  return /* @__PURE__ */ C.createElement("div", De({
    ref: F,
    className: O,
    key: w,
    style: {
      ...s,
      ...A.styles.switch,
      ...m.switch,
      ...o.root
    }
  }, x), /* @__PURE__ */ C.createElement(ba, {
    disabled: h,
    loading: u,
    styles: {
      icon: o.icon,
      root: o.content,
      content: o.title
    },
    classNames: {
      root: se(`${M}-content`, a.content),
      icon: a.icon,
      content: a.title
    },
    variant: "outlined",
    color: B ? "primary" : "default",
    icon: i,
    onClick: () => {
      L(!B);
    }
  }, B ? v : g, r));
}), MC = (e, t) => Array.isArray(e) ? e == null ? void 0 : e.reduce((r, n) => {
  var a;
  return n.key && (n.type === "input" || n.type === "select" || n.type === "custom" ? r[n.key] = ((a = n.props) == null ? void 0 : a.defaultValue) || "" : r[n.key] = "", t.current.set(n.key, n)), r;
}, {}) : {};
function NC(e) {
  const [t, r] = hr({}), n = Ue(t), a = Ue(/* @__PURE__ */ new Map());
  Ct(() => {
    const s = MC(e, a);
    r(s), n.current = s;
  }, [e]);
  const o = ko((s) => {
    const l = typeof s == "function" ? s(n.current) : s;
    n.current = l, r(l);
  }, []), i = ko(() => n.current, []);
  return [a.current, i, o];
}
const IC = (e, t) => {
  const {
    token: r
  } = sx(), n = parseFloat(`${e.lineHeight || r.lineHeight}`), a = parseFloat(`${e.fontSize || r.fontSize}`);
  return t === !1 || !t ? {} : t === !0 ? {
    height: "auto"
  } : {
    minHeight: t.minRows ? n * a * t.minRows : "auto",
    maxHeight: t.maxRows ? n * a * t.maxRows : "auto",
    overflowY: "auto"
  };
}, vg = /* @__PURE__ */ T.forwardRef((e, t) => {
  var Oe;
  const {
    onChange: r,
    onKeyUp: n,
    onKeyDown: a,
    onPaste: o,
    onPasteFile: i,
    disabled: s,
    readOnly: l,
    submitType: c = "enter",
    prefixCls: u,
    styles: d = {},
    classNames: f = {},
    autoSize: v,
    onSubmit: g,
    placeholder: h,
    onFocus: p,
    onBlur: y,
    slotConfig: m,
    ...S
  } = T.useContext(Fi), E = Ue([...m || []]), {
    direction: x,
    getPrefixCls: w
  } = gr(), b = `${w("sender", u)}`, P = Zr("sender"), k = `${b}-input`, M = {
    ...(Oe = P.styles) == null ? void 0 : Oe.input,
    ...d.input
  }, I = IC(M, v), D = Ue(null), F = Ue(/* @__PURE__ */ new Map()), B = Ue(!1), L = Ue(!1), A = Ue(null), R = {
    ...hn(S, {
      attr: !0,
      aria: !0,
      data: !0
    }),
    ref: D
  }, [H, z, j] = NC(E.current), [W, K] = hr(/* @__PURE__ */ new Map()), Z = (U) => {
    const te = document.createElement("span");
    return te.setAttribute("contenteditable", "false"), te.dataset.slotKey = U, te.className = `${b}-slot`, te;
  }, Y = (U, te) => {
    F.current.set(U, te);
  }, Q = (U) => F.current.get(U), le = (U, te, J) => {
    var He;
    const re = Q(U), ae = (He = E.current) == null ? void 0 : He.find((_e) => _e.key === U);
    if (j((_e) => ({
      ..._e,
      [U]: te
    })), re && ae) {
      const _e = de(ae, re);
      K((ce) => {
        const qe = new Map(ce);
        return qe.set(U, _e), qe;
      });
      const Ee = Se();
      r == null || r(Ee.value, J, Ee.config);
    }
  }, de = (U, te) => {
    if (!U.key) return null;
    const J = z()[U.key];
    return /* @__PURE__ */ vv((() => {
      var ae, He, _e, Ee, ce, qe, ct;
      switch (U.type) {
        case "input":
          return /* @__PURE__ */ T.createElement(rp, {
            readOnly: l,
            className: `${b}-slot-input`,
            placeholder: ((ae = U.props) == null ? void 0 : ae.placeholder) || "",
            "data-slot-input": U.key,
            size: "small",
            variant: "borderless",
            value: J || "",
            tabIndex: 0,
            onChange: (vt) => {
              le(U.key, vt.target.value, vt);
            },
            spellCheck: !1
          });
        case "select":
          return /* @__PURE__ */ T.createElement(tp, {
            disabled: l,
            menu: {
              items: (_e = (He = U.props) == null ? void 0 : He.options) == null ? void 0 : _e.map((vt) => ({
                label: vt,
                key: vt
              })),
              defaultSelectedKeys: (Ee = U.props) != null && Ee.defaultValue ? [U.props.defaultValue] : [],
              selectable: !0,
              onSelect: ({
                key: vt,
                domEvent: It
              }) => {
                le(U.key, vt, It);
              }
            },
            trigger: ["click"]
          }, /* @__PURE__ */ T.createElement("span", {
            className: se(`${b}-slot-select`, {
              placeholder: !J,
              [`${b}-slot-select-selector-value`]: J
            })
          }, /* @__PURE__ */ T.createElement("span", {
            "data-placeholder": (ce = U.props) == null ? void 0 : ce.placeholder,
            className: `${b}-slot-select-value`
          }, J || ""), /* @__PURE__ */ T.createElement("span", {
            className: `${b}-slot-select-arrow`
          }, /* @__PURE__ */ T.createElement(gv, null))));
        case "tag":
          return /* @__PURE__ */ T.createElement("div", {
            className: `${b}-slot-tag`
          }, ((qe = U.props) == null ? void 0 : qe.label) || "");
        case "custom":
          return (ct = U.customRender) == null ? void 0 : ct.call(U, J, (vt) => {
            le(U.key, vt);
          }, {
            disabled: s,
            readOnly: l
          }, U);
        default:
          return null;
      }
    })(), te);
  }, fe = (U) => U.reduce((te, J) => {
    if (J.type === "text" && te.push(document.createTextNode(J.value || "")), J.key) {
      const re = J.key;
      wi(!Q(re), "sender", `Duplicate slot key: ${re}`);
      const ae = Z(re);
      if (Y(J.key, ae), ae) {
        const He = de(J, ae);
        He && (K((_e) => (_e.set(re, He), _e)), te.push(ae));
      }
    }
    return te;
  }, []), ge = (U, te) => {
    var J, re;
    if (U.nodeType === Node.TEXT_NODE)
      return U.textContent || "";
    if (U.nodeType === Node.ELEMENT_NODE) {
      const ae = U, He = ae.getAttribute("data-slot-key");
      if (He) {
        const _e = H.get(He), Ee = te[He] || "", ce = (_e == null ? void 0 : _e.type) === "tag" && ((J = _e.props) != null && J.value) ? _e.props.value : null;
        return ((re = _e == null ? void 0 : _e.formatResult) == null ? void 0 : re.call(_e, Ee)) || ce || Ee;
      }
      return (ae == null ? void 0 : ae.innerText) || "";
    }
    return "";
  }, Se = () => {
    var J;
    const U = [], te = [];
    if ((J = D.current) == null || J.childNodes.forEach((re) => {
      const ae = ge(re, z());
      if (re.nodeType === Node.TEXT_NODE)
        U.push(ae), te.push({
          type: "text",
          value: ae
        });
      else if (re.nodeType === Node.ELEMENT_NODE) {
        const _e = re.getAttribute("data-slot-key");
        if (_e) {
          const Ee = H.get(_e);
          U.push(ae), Ee && te.push({
            ...Ee,
            value: ae
          });
        }
      }
    }), !U.length) {
      const re = D.current;
      re && (re.innerHTML = "");
    }
    return {
      value: U.join(""),
      config: te
    };
  }, $e = (U) => {
    var He, _e, Ee, ce;
    const te = (He = window == null ? void 0 : window.getSelection) == null ? void 0 : He.call(window), J = D.current;
    if (U === "end" || !te)
      return {
        type: "end"
      };
    if (U === "start")
      return {
        type: "start"
      };
    const re = (te == null ? void 0 : te.rangeCount) > 0 ? (_e = te == null ? void 0 : te.getRangeAt) == null ? void 0 : _e.call(te, 0) : null, ae = A.current || re;
    if (ae) {
      if ((ce = (Ee = ae.endContainer) == null ? void 0 : Ee.className) != null && ce.includes(`${b}-slot`))
        return {
          type: "slot",
          range: ae
        };
      if (ae.endContainer === J || ae.endContainer.parentElement === J)
        return {
          range: ae,
          type: "box"
        };
    }
    return {
      type: "end"
    };
  }, Me = () => {
    B.current = !0;
  }, ee = () => {
    B.current = !1, L.current = !1;
  }, Ae = (U) => {
    const te = U.key === "Enter";
    if (L.current || B.current || !te) {
      a == null || a(U);
      return;
    }
    switch (c) {
      case "enter":
        if (!U.shiftKey && !U.ctrlKey && !U.altKey && !U.metaKey) {
          L.current = !0, U.preventDefault();
          const J = Se();
          g == null || g(J.value, J.config);
        }
        break;
      case "shiftEnter":
        if (U.shiftKey && !U.ctrlKey && !U.altKey && !U.metaKey) {
          L.current = !0, U.preventDefault();
          const J = Se();
          g == null || g(J.value, J.config);
        }
        break;
    }
    a == null || a(U);
  }, ie = (U) => {
    U.key === "Enter" && (L.current = !1), n == null || n(U);
  }, ye = (U) => {
    var re, ae;
    U.preventDefault();
    const te = (re = U.clipboardData) == null ? void 0 : re.files, J = (ae = U.clipboardData) == null ? void 0 : ae.getData("text/plain");
    if (!J && (te != null && te.length) && i) {
      i(te);
      return;
    }
    J && je([{
      type: "text",
      value: J.replace(/\n/g, "")
    }]), o == null || o(U);
  }, Ve = (U) => {
    const te = window.getSelection();
    if (te) {
      const J = document.createRange();
      J.selectNodeContents(D.current), J.collapse(!0), te.removeAllRanges(), te.addRange(J);
    }
    p == null || p(U);
  }, we = (U) => {
    var re;
    L.current && (L.current = !1);
    const te = window.getSelection();
    te && (A.current = te.rangeCount ? (re = te == null ? void 0 : te.getRangeAt) == null ? void 0 : re.call(te, 0) : null);
    const J = setTimeout(() => {
      A.current = null, clearTimeout(J);
    }, 200);
    y == null || y(U);
  }, We = (U) => {
    if (c === "enter") {
      const te = U == null ? void 0 : U.querySelectorAll("br");
      te == null || te.forEach((J) => {
        J.remove();
      });
    }
  }, Le = (U) => {
    const te = Se();
    We(D == null ? void 0 : D.current), r == null || r(te.value, U, te.config);
  }, je = (U, te = "cursor", J) => {
    var It, _r;
    const re = D.current, ae = window.getSelection();
    if (!re || !ae) return;
    const He = fe(U), {
      type: _e,
      range: Ee
    } = $e(te);
    let ce = document.createRange();
    E.current = [...E.current, ...U], j(U), _e === "end" && (ae.removeAllRanges(), ae.addRange(ce), ce.setStart(re, re.childNodes.length)), _e === "start" && ce.setStart(re, 0), _e === "box" && (ce = Ee), _e === "slot" && (ce = (It = ae == null ? void 0 : ae.getRangeAt) == null ? void 0 : It.call(ae, 0), (_r = ae == null ? void 0 : ae.focusNode) != null && _r.nextSibling && ce.setStartBefore(ae.focusNode.nextSibling));
    const qe = ce.startOffset, ct = ce.startContainer;
    if (J != null && J.length) {
      const ut = ce.cloneRange();
      ut.selectNodeContents(re), ut.setEnd(ce.endContainer, ce.endOffset), ut.setStart(re, 0);
      const Lt = ut.toString();
      Lt.length >= J.length && Lt.endsWith(J) && (ce.setStart(ct, qe - J.length), ce.setEnd(ct, qe), ce.deleteContents());
    }
    He.forEach((ut) => {
      ce.insertNode(ut), ce.setStartAfter(ut), ce = ce.cloneRange();
    }), re.focus(), ae.removeAllRanges(), ae.addRange(ce), ce.collapse(!1);
    const vt = setTimeout(() => {
      Le(null), clearTimeout(vt);
    }, 0);
  }, Ce = (U) => {
    var J;
    if ((U == null ? void 0 : U.cursor) === "slot") {
      let re = null;
      if (U != null && U.key)
        F.current.has(U.key) && F.current.get(U.key).querySelector("input") && (re = F.current.get(U.key).querySelector("input"));
      else
        for (const ae of Array.from(((J = D.current) == null ? void 0 : J.childNodes) || []))
          if (ae.nodeType === Node.ELEMENT_NODE && ae.querySelector("input")) {
            re = ae.querySelector("input");
            break;
          }
      if (re) {
        re == null || re.focus();
        return;
      }
    }
    const te = D.current;
    if (U != null && U.cursor && te) {
      te.focus();
      const re = window.getSelection();
      if (!re) return;
      const ae = document.createRange();
      switch (ae.selectNodeContents(te), U == null ? void 0 : U.cursor) {
        case "start": {
          ae.collapse(!0);
          break;
        }
        case "all":
          break;
        default: {
          ae.collapse(!1);
          break;
        }
      }
      re.removeAllRanges(), re.addRange(ae);
    }
  }, ve = () => {
    const U = D.current;
    U && (U.innerHTML = "", j({}), Le(null));
  };
  return Ct(() => {
    var U;
    E.current = [...m || []], E.current.length !== 0 && D.current && E.current && (D.current.innerHTML = "", (U = F == null ? void 0 : F.current) == null || U.clear(), fe(E.current).forEach((J) => {
      var re;
      (re = D.current) == null || re.appendChild(J);
    }), r == null || r(Se().value, void 0, Se().config));
  }, [m]), qo(t, () => ({
    nativeElement: D.current,
    focus: Ce,
    blur: () => {
      var U;
      (U = D.current) == null || U.blur();
    },
    insert: je,
    clear: ve,
    getValue: () => Se()
  })), /* @__PURE__ */ T.createElement(T.Fragment, null, /* @__PURE__ */ T.createElement("div", De({}, R, {
    role: "textbox",
    tabIndex: 0,
    style: {
      ...M,
      ...I
    },
    className: se(k, `${k}-slot`, P.classNames.input, f.input, {
      [`${b}-rtl`]: x === "rtl"
    }),
    "data-placeholder": h,
    contentEditable: !l,
    suppressContentEditableWarning: !0,
    spellCheck: !1,
    onKeyDown: Ae,
    onKeyUp: ie,
    onPaste: ye,
    onCompositionStart: Me,
    onCompositionEnd: ee,
    onFocus: Ve,
    onBlur: we,
    onInput: Le
  }, S)), /* @__PURE__ */ T.createElement("div", {
    style: {
      display: "none"
    },
    id: `${b}-slot-placeholders`
  }, Array.from(W.values())));
});
process.env.NODE_ENV !== "production" && (vg.displayName = "SlotTextArea");
var yg = {};
Object.defineProperty(yg, "__esModule", {
  value: !0
});
var DC = yg.default = FC;
function FC(e, t) {
  for (var r = e, n = 0; n < t.length; n += 1) {
    if (r == null)
      return;
    r = r[t[n]];
  }
  return r;
}
function LC(e, t, r) {
  return DC(e, t) || r;
}
const bg = /* @__PURE__ */ T.forwardRef((e, t) => {
  const {
    value: r,
    onChange: n,
    onKeyUp: a,
    onKeyDown: o,
    onPaste: i,
    onPasteFile: s,
    disabled: l,
    readOnly: c,
    submitType: u = "enter",
    prefixCls: d,
    styles: f = {},
    classNames: v = {},
    autoSize: g,
    components: h,
    onSubmit: p,
    placeholder: y,
    onFocus: m,
    onBlur: S,
    ...E
  } = T.useContext(Fi), x = T.useRef(null), w = (R, H = "cursor") => {
    var Z, Y;
    const z = (Y = (Z = x.current) == null ? void 0 : Z.resizableTextArea) == null ? void 0 : Y.textArea, j = z.value;
    let W = j.length, K = j.length;
    H === "cursor" && (W = z == null ? void 0 : z.selectionStart, K = z == null ? void 0 : z.selectionEnd), H === "start" && (W = 0, K = 0), z.value = j.substring(0, W) + R + j.substring(K, j.length), z.selectionStart = W + R.length, z.selectionEnd = W + R.length, z.focus(), n == null || n(z.value);
  }, b = () => {
    n == null || n("");
  }, P = () => ({
    value: r || "",
    config: []
  });
  T.useImperativeHandle(t, () => {
    var R, H, z, j;
    return {
      nativeElement: (H = (R = x.current) == null ? void 0 : R.resizableTextArea) == null ? void 0 : H.textArea,
      focus: (z = x.current) == null ? void 0 : z.focus,
      blur: (j = x.current) == null ? void 0 : j.blur,
      insert: w,
      clear: b,
      getValue: P
    };
  });
  const k = T.useRef(!1), M = () => {
    k.current = !0;
  }, I = () => {
    k.current = !1;
  }, D = (R) => {
    const H = R.key === "Enter";
    if (k.current || !H) {
      o == null || o(R);
      return;
    }
    switch (u) {
      case "enter":
        !R.shiftKey && !R.ctrlKey && !R.altKey && !R.metaKey && (R.preventDefault(), p == null || p(r || ""));
        break;
      case "shiftEnter":
        R.shiftKey && !R.ctrlKey && !R.altKey && !R.metaKey && (R.preventDefault(), p == null || p(r || ""));
        break;
    }
    o == null || o(R);
  }, F = (R) => {
    var j, W;
    const H = (j = R.clipboardData) == null ? void 0 : j.files;
    !((W = R.clipboardData) == null ? void 0 : W.getData("text/plain")) && (H != null && H.length) && s && (s(H), R.preventDefault()), i == null || i(R);
  }, B = LC(h, ["input"], rp.TextArea), A = {
    ...hn(E, {
      attr: !0,
      aria: !0,
      data: !0
    }),
    ref: x
  }, O = (R) => {
    n == null || n(R.target.value, R);
  };
  return /* @__PURE__ */ T.createElement(B, De({}, A, {
    disabled: l,
    style: f.input,
    className: se(`${d}-input`, v.input),
    autoSize: g,
    value: r,
    onChange: O,
    onKeyUp: a,
    onCompositionStart: M,
    onCompositionEnd: I,
    onKeyDown: D,
    onPaste: F,
    variant: "borderless",
    readOnly: c,
    placeholder: y,
    onFocus: m,
    onBlur: S
  }));
});
process.env.NODE_ENV !== "production" && (bg.displayName = "TextArea");
let Io;
!Io && typeof window < "u" && (Io = window.SpeechRecognition || window.webkitSpeechRecognition);
function jC(e, t) {
  const r = xr(e), [n, a, o] = T.useMemo(() => typeof t == "object" ? [t.recording, t.onRecordingChange, typeof t.recording == "boolean"] : [void 0, void 0, !1], [t]), [i, s] = T.useState(null);
  T.useEffect(() => {
    if (!o && typeof navigator < "u" && "permissions" in navigator) {
      let h = null;
      return navigator.permissions.query({
        name: "microphone"
      }).then((p) => {
        s(p.state), p.onchange = function() {
          s(this.state);
        }, h = p;
      }), () => {
        h && (h.onchange = null);
      };
    }
  }, [o]);
  const l = o || Io && i !== "denied", c = T.useRef(null), [u, d] = Wa(!1, {
    value: n
  }), f = T.useRef(!1), v = () => {
    if (l && !c.current) {
      const h = new Io();
      h.onstart = () => {
        d(!0);
      }, h.onend = () => {
        d(!1);
      }, h.onresult = (p) => {
        var y, m, S;
        if (!f.current) {
          const E = (S = (m = (y = p.results) == null ? void 0 : y[0]) == null ? void 0 : m[0]) == null ? void 0 : S.transcript;
          r(E);
        }
        f.current = !1;
      }, c.current = h;
    }
  }, g = xr((h) => {
    h && !u || (f.current = h, o ? a == null || a(!u) : (v(), c.current && (u ? (c.current.stop(), a == null || a(!1)) : (c.current.start(), a == null || a(!0)))));
  });
  return [l, g, u];
}
const fo = {
  SendButton: pg,
  ClearButton: EC,
  LoadingButton: fg,
  SpeechButton: hg
}, zC = /* @__PURE__ */ T.forwardRef((e, t) => {
  const {
    prefixCls: r,
    styles: n = {},
    classNames: a = {},
    className: o,
    rootClassName: i,
    style: s,
    defaultValue: l,
    value: c,
    slotConfig: u,
    readOnly: d,
    submitType: f = "enter",
    onSubmit: v,
    loading: g,
    components: h,
    onCancel: p,
    onChange: y,
    suffix: m,
    onKeyUp: S,
    onKeyDown: E,
    disabled: x,
    allowSpeech: w,
    prefix: b,
    footer: P,
    header: k,
    onPaste: M,
    onPasteFile: I,
    autoSize: D = {
      maxRows: 8
    },
    placeholder: F,
    onFocus: B,
    onBlur: L,
    ...A
  } = e, O = hn(A, {
    attr: !0,
    aria: !0,
    data: !0
  }), R = T.useId(), H = Array.isArray(u), {
    direction: z,
    getPrefixCls: j
  } = gr(), W = j("sender", r), K = T.useRef(null), Z = T.useRef(null);
  _i(t, () => {
    var J, re, ae, He, _e, Ee;
    return {
      nativeElement: K.current,
      inputElement: (J = Z.current) == null ? void 0 : J.nativeElement,
      focus: (re = Z.current) == null ? void 0 : re.focus,
      blur: (ae = Z.current) == null ? void 0 : ae.blur,
      insert: (He = Z.current) == null ? void 0 : He.insert,
      clear: (_e = Z.current) == null ? void 0 : _e.clear,
      getValue: (Ee = Z.current) == null ? void 0 : Ee.getValue
    };
  });
  const Y = Zr("sender"), Q = `${W}-input`, [le, de] = mg(W), fe = se(W, Y.className, o, i, Y.classNames.root, a.root, le, de, {
    [`${W}-rtl`]: z === "rtl",
    [`${W}-disabled`]: x
  }), ge = `${W}-actions-btn`, Se = `${W}-actions-list`, [$e, Me] = Wa(l || "", {
    value: c
  }), ee = (J, re, ae) => {
    if (ae) {
      Me(J), y && y(J, re, ae);
      return;
    }
    Me(J), y && y(J, re);
  }, [Ae, ie, ye] = jC((J) => {
    var re, ae;
    H ? (ae = (re = Z.current) == null ? void 0 : re.insert) == null || ae.call(re, [{
      type: "text",
      value: J
    }]) : ee(`${$e} ${J}`);
  }, w), Ve = () => {
    $e && v && !g && v($e);
  }, we = () => {
    var J, re;
    ee(""), H && ((re = (J = Z.current) == null ? void 0 : J.clear) == null || re.call(J));
  }, We = /* @__PURE__ */ T.createElement(Jf, {
    className: `${Se}-presets`
  }, w && /* @__PURE__ */ T.createElement(hg, null), g ? /* @__PURE__ */ T.createElement(fg, null) : /* @__PURE__ */ T.createElement(pg, null));
  let Le = We;
  typeof m == "function" ? Le = m(We, {
    components: fo
  }) : (m || m === !1) && (Le = m);
  const je = typeof b == "function" ? b(We, {
    components: fo
  }) : b || null, Ce = typeof k == "function" ? k(We, {
    components: fo
  }) : k || null, ve = typeof P == "function" ? P(We, {
    components: fo
  }) : P || null, Oe = {
    prefixCls: ge,
    onSend: Ve,
    onSendDisabled: !$e,
    onClear: we,
    onClearDisabled: !$e,
    onCancel: p,
    onCancelDisabled: !g,
    onSpeech: () => ie(!1),
    onSpeechDisabled: !Ae,
    speechRecording: ye,
    disabled: x
  }, U = T.useMemo(() => ({
    value: $e,
    onChange: ee,
    slotConfig: u,
    onKeyUp: S,
    onKeyDown: E,
    onPaste: M,
    onPasteFile: I,
    disabled: x,
    readOnly: d,
    submitType: f,
    prefixCls: W,
    styles: n,
    classNames: a,
    autoSize: D,
    components: h,
    onSubmit: v,
    placeholder: F,
    onFocus: B,
    onBlur: L,
    ...A
  }), [$e, ee, u, S, E, M, I, x, d, f, W, n, a, D, h, v, F, B, L, A]), te = (J) => {
    var re, ae, He;
    !H && J.target !== ((re = K.current) == null ? void 0 : re.querySelector(`.${Q}`)) && J.preventDefault(), J.target === ((ae = K.current) == null ? void 0 : ae.querySelector(`.${Q}`)) && ((He = Z.current) == null || He.focus());
  };
  return /* @__PURE__ */ T.createElement("div", De({
    key: R,
    ref: K,
    className: fe,
    style: {
      ...Y.style,
      ...s,
      ...Y.styles.root,
      ...n.root
    }
  }, O), /* @__PURE__ */ T.createElement(Fi.Provider, {
    value: U
  }, /* @__PURE__ */ T.createElement(Ii.Provider, {
    value: Oe
  }, Ce && /* @__PURE__ */ T.createElement(gg.Provider, {
    value: {
      prefixCls: W
    }
  }, Ce), /* @__PURE__ */ T.createElement("div", {
    className: se(`${W}-content`, a.content),
    style: n.content,
    onMouseDown: te
  }, je && /* @__PURE__ */ T.createElement("div", {
    className: se(`${W}-prefix`, Y.classNames.prefix, a.prefix),
    style: {
      ...Y.styles.prefix,
      ...n.prefix
    }
  }, je), H ? /* @__PURE__ */ T.createElement(vg, {
    ref: Z
  }) : /* @__PURE__ */ T.createElement(bg, {
    ref: Z
  }), Le && /* @__PURE__ */ T.createElement("div", {
    className: se(Se, Y.classNames.suffix, a.suffix),
    style: {
      ...Y.styles.suffix,
      ...n.suffix
    }
  }, Le)), ve && /* @__PURE__ */ T.createElement("div", {
    className: se(`${W}-footer`, Y.classNames.footer, a.footer),
    style: {
      ...Y.styles.footer,
      ...n.footer
    }
  }, ve))));
}), Bc = zC;
process.env.NODE_ENV !== "production" && (Bc.displayName = "Sender");
Bc.Header = $C;
Bc.Switch = kC;
class zR {
  constructor(t) {
    X(this, "_request");
    X(this, "_getMessagesFn");
    X(this, "_originalCallbacks");
    var n;
    const r = typeof t.request == "function" ? t.request() : t.request;
    if (!r.manual)
      throw new Error("request must be manual");
    this._request = r, this._originalCallbacks = (n = this._request.options) == null ? void 0 : n.callbacks;
  }
  get request() {
    return this._request;
  }
  /**
   * 转换onRequest传入的参数，你可以和Provider实例化时request配置中的params进行合并或者额外处理
   * @param requestParams 请求参数
   * @param options 请求配置，从Provider实例化时request配置中来
   */
  /**
   * 将onRequest传入的参数转换为本地（用户发送）的ChatMessage，用于消息渲染
   * @param requestParams onRequest传入的参数
   */
  /**
   * 可在更新返回数据时对messages做转换，同时会更新到messages
   * @param info
   */
  getMessages() {
    return this == null ? void 0 : this._getMessagesFn();
  }
  injectGetMessages(t) {
    this._getMessagesFn = t;
  }
  injectRequest({
    onUpdate: t,
    onSuccess: r,
    onError: n
  }) {
    var s, l, c;
    const a = (s = this._originalCallbacks) == null ? void 0 : s.onUpdate, o = (l = this._originalCallbacks) == null ? void 0 : l.onSuccess, i = (c = this._originalCallbacks) == null ? void 0 : c.onError;
    this._request.options.callbacks = {
      onUpdate: (u, d) => {
        t(u, d), a && a(u, d);
      },
      onSuccess: (u, d) => {
        r(u, d), o && o(u, d);
      },
      onError: (u, d) => {
        n(u, d), i && i(u, d);
      }
    };
  }
}
const qr = {
  _chatMessagesStores: /* @__PURE__ */ new Map(),
  get: (e) => qr._chatMessagesStores.get(e),
  set: (e, t) => {
    qr._chatMessagesStores.set(e, t);
  },
  delete: (e) => {
    qr._chatMessagesStores.delete(e);
  },
  getMessages: (e) => {
    const t = qr._chatMessagesStores.get(e);
    return t == null ? void 0 : t.getMessages();
  }
};
class HC {
  constructor(t, r) {
    X(this, "messages", []);
    X(this, "listeners", []);
    X(this, "conversationKey");
    X(this, "setMessages", (t) => {
      let r;
      return typeof t == "function" ? r = t(this.messages) : r = t, this.messages = [...r], this.emitListeners(), !0;
    });
    X(this, "getMessages", () => this.messages);
    X(this, "getMessage", (t) => this.messages.find((r) => r.id === t));
    X(this, "addMessage", (t) => this.getMessage(t.id) ? !1 : (this.setMessages([...this.messages, t]), !0));
    X(this, "setMessage", (t, r) => {
      const n = this.getMessage(t);
      if (n) {
        const a = typeof r == "function" ? r(n) : r;
        return Object.assign(n, a), this.setMessages([...this.messages]), !0;
      }
      return !1;
    });
    X(this, "removeMessage", (t) => {
      const r = this.messages.findIndex((n) => n.id === t);
      return r !== -1 ? (this.messages.splice(r, 1), this.setMessages([...this.messages]), !0) : !1;
    });
    X(this, "getSnapshot", () => this.messages);
    X(this, "subscribe", (t) => (this.listeners.push(t), () => {
      this.listeners = this.listeners.filter((r) => r !== t);
    }));
    this.setMessages(t), r && (this.conversationKey = r, qr.set(this.conversationKey, this));
  }
  emitListeners() {
    this.listeners.forEach((t) => {
      t();
    });
  }
}
function VC(e, t) {
  const r = () => {
    if (t && qr.get(t))
      return qr.get(t);
    const i = typeof e == "function" ? e() : e;
    return new HC(i || [], t);
  }, [n, a] = hr(r);
  return Ct(() => {
    a(r());
  }, [t]), {
    messages: Ds(n.subscribe, n.getSnapshot, n.getSnapshot),
    addMessage: n.addMessage,
    removeMessage: n.removeMessage,
    setMessage: n.setMessage,
    getMessage: n.getMessage,
    setMessages: n.setMessages,
    getMessages: n.getMessages
  };
}
function BC(e) {
  return Array.isArray(e) ? e : [e];
}
const _n = /* @__PURE__ */ new Map();
function HR(e) {
  const {
    defaultMessages: t,
    requestFallback: r,
    requestPlaceholder: n,
    parser: a,
    provider: o,
    conversationKey: i
  } = e, s = T.useRef(0), l = T.useRef(void 0), [c, u] = hr(!1), {
    messages: d,
    setMessages: f,
    getMessages: v,
    setMessage: g
  } = VC(() => (t || []).map((w, b) => ({
    id: `default_${b}`,
    status: "local",
    ...w
  })), i), h = (w, b, P) => {
    const k = {
      id: `msg_${s.current}`,
      message: w,
      status: b
    };
    return P && (k.extraInfo = P), s.current += 1, k;
  }, p = T.useMemo(() => {
    const w = [];
    return d.forEach((b) => {
      const P = a ? a(b.message) : b.message, k = BC(P);
      k.forEach((M, I) => {
        let D = b.id;
        k.length > 1 && (D = `${D}_${I}`), w.push({
          id: D,
          message: M,
          status: b.status
        });
      });
    }), w;
  }, [d]), y = (w) => w.filter((b) => b.status !== "loading").map((b) => b.message);
  o == null || o.injectGetMessages(() => y(v())), l.current = o == null ? void 0 : o.request;
  const m = () => y(v()), S = (w, b) => {
    if (!o)
      return;
    const {
      updatingId: P,
      reload: k
    } = b || {};
    let M = null;
    const I = o.transformLocalMessage(w), D = (Array.isArray(I) ? I : [I]).map((L) => h(L, "local", b == null ? void 0 : b.extraInfo));
    k ? (M = P, f((L) => {
      const A = [...L];
      if (n) {
        let O;
        typeof n == "function" ? O = n(w, {
          messages: y(A)
        }) : O = n, A.forEach((R) => {
          R.id === P && (R.status = "loading", R.message = O, b != null && b.extraInfo && (R.extraInfo = b == null ? void 0 : b.extraInfo));
        });
      }
      return A;
    })) : f((L) => {
      let A = [...L, ...D];
      if (n) {
        let O;
        typeof n == "function" ? O = n(w, {
          messages: y(A)
        }) : O = n;
        const R = h(O, "loading");
        M = R.id, A = [...A, R];
      }
      return A;
    });
    let F = null;
    const B = (L, A, O, R) => {
      let H = v().find((z) => z.id === F);
      if (H)
        f((z) => z.map((j) => {
          if (j.id === F) {
            const W = o.transformMessage({
              originMessage: j.message,
              chunk: A,
              chunks: O,
              status: L,
              responseHeaders: R
            });
            return {
              ...j,
              message: W,
              status: L
            };
          }
          return j;
        }));
      else if (k && P)
        H = v().find((z) => z.id === P), H && (H.status = L, H.message = o.transformMessage({
          chunk: A,
          status: L,
          chunks: O,
          responseHeaders: R
        }), f((z) => [...z]), F = H.id);
      else {
        const z = o.transformMessage({
          chunk: A,
          status: L,
          chunks: O,
          responseHeaders: R
        });
        H = h(z, L), f((j) => [...j.filter((K) => K.id !== M), H]), F = H.id;
      }
      return H;
    };
    o.injectRequest({
      onUpdate: (L, A) => {
        B("updating", L, [], A);
      },
      onSuccess: (L, A) => {
        u(!1), i && _n.delete(i), B("success", void 0, L, A);
      },
      onError: async (L, A) => {
        if (u(!1), i && _n.delete(i), r) {
          let O;
          if (typeof r == "function") {
            const R = m(), H = v().find((z) => z.id === M || z.id === F);
            O = await r(w, {
              error: L,
              errorInfo: A,
              messageInfo: H,
              messages: R
            });
          } else
            O = r;
          f((R) => [...R.filter((H) => H.id !== M && H.id !== F), h(O, L.name === "AbortError" ? "abort" : "error")]);
        } else
          f((O) => O.map((R) => R.id === M || R.id === F ? {
            ...R,
            status: L.name === "AbortError" ? "abort" : "error"
          } : R));
      }
    }), u(!0), i && _n.set(i, !0), o.request.run(o.transformParams(w, o.request.options));
  }, E = xr((w, b) => {
    if (!o)
      throw new Error("provider is required");
    S(w, b);
  }), x = (w, b, P) => {
    if (!o)
      throw new Error("provider is required");
    if (!w || !v().find((k) => k.id === w))
      throw new Error(`message [${w}] is not found`);
    S(b, {
      updatingId: w,
      reload: !0,
      extraInfo: P == null ? void 0 : P.extraInfo
    });
  };
  return {
    onRequest: E,
    messages: d,
    parsedMessages: p,
    setMessages: f,
    setMessage: g,
    abort: () => {
      var w;
      if (!o)
        throw new Error("provider is required");
      (w = l.current) == null || w.abort();
    },
    isRequesting: i ? (_n == null ? void 0 : _n.get(i)) || !1 : c,
    onReload: x
  };
}
const pa = {
  _allConversationStores: /* @__PURE__ */ new Map(),
  set: (e, t) => {
    pa._allConversationStores.set(e, t);
  },
  delete: (e) => {
    pa._allConversationStores.delete(e);
  },
  getConversation: (e) => {
    for (const t of pa._allConversationStores.values())
      if (t) {
        const r = t.getConversation(e);
        if (r)
          return r;
      }
  }
};
class UC {
  constructor(t, r) {
    X(this, "conversations", []);
    X(this, "listeners", []);
    X(this, "storeKey");
    X(this, "activeConversationKey");
    X(this, "setActiveConversationKey", (t) => (this.activeConversationKey = t, this.emitListeners(), !0));
    X(this, "setConversations", (t) => (this.conversations = [...t], this.emitListeners(), !0));
    X(this, "getConversation", (t) => this.conversations.find((r) => r.key === t));
    X(this, "addConversation", (t, r) => this.getConversation(t.key) ? !1 : (this.setConversations(r === "prepend" ? [t, ...this.conversations] : [...this.conversations, t]), !0));
    X(this, "setConversation", (t, r) => {
      const n = this.getConversation(t);
      return n ? (Object.assign(n, r), this.setConversations([...this.conversations]), !0) : !1;
    });
    X(this, "removeConversation", (t) => {
      const r = this.conversations.findIndex((n) => n.key === t);
      return r !== -1 ? (this.conversations.splice(r, 1), this.setConversations([...this.conversations]), !0) : !1;
    });
    X(this, "getMessages", (t) => qr.getMessages(t));
    X(this, "getSnapshot", () => this.conversations);
    X(this, "getActiveConversationKey", () => this.activeConversationKey);
    X(this, "subscribe", (t) => (this.listeners.push(t), () => {
      this.listeners = this.listeners.filter((r) => r !== t);
    }));
    X(this, "destroy", () => {
      pa.delete(this.storeKey);
    });
    this.setConversations(t), this.storeKey = Math.random().toString(), pa.set(this.storeKey, this), this.activeConversationKey = r;
  }
  emitListeners() {
    this.listeners.forEach((t) => {
      t();
    });
  }
}
function VR(e) {
  const [t] = hr(() => new UC((e == null ? void 0 : e.defaultConversations) || [], (e == null ? void 0 : e.defaultActiveConversationKey) || ""));
  Ct(() => () => {
    t.destroy();
  }, []);
  const r = Ds(t.subscribe, t.getSnapshot, t.getSnapshot), n = Ds(t.subscribe, t.getActiveConversationKey, t.getActiveConversationKey);
  return {
    conversations: r,
    activeConversationKey: n,
    setActiveConversationKey: t.setActiveConversationKey,
    addConversation: t.addConversation,
    removeConversation: t.removeConversation,
    setConversation: t.setConversation,
    getConversation: t.getConversation,
    setConversations: t.setConversations,
    getMessages: t.getMessages
  };
}
const WC = `

`, qC = `
`, Ud = ":", Tl = (e) => (e ?? "").trim() !== "";
function GC() {
  let e = "";
  return new TransformStream({
    transform(t, r) {
      e += t;
      const n = e.split(WC);
      n.slice(0, -1).forEach((a) => {
        Tl(a) && r.enqueue(a);
      }), e = n[n.length - 1];
    },
    flush(t) {
      Tl(e) && t.enqueue(e);
    }
  });
}
function KC() {
  return new TransformStream({
    transform(e, t) {
      const n = e.split(qC).reduce((a, o) => {
        const i = o.indexOf(Ud);
        if (i === -1)
          throw new Error(`The key-value separator "${Ud}" is not found in the sse line chunk!`);
        const s = o.slice(0, i);
        if (!Tl(s)) return a;
        const l = o.slice(i + 1);
        return {
          ...a,
          [s]: l
        };
      }, {});
      Object.keys(n).length !== 0 && t.enqueue(n);
    }
  });
}
function Wd(e) {
  const {
    readableStream: t,
    transformStream: r
  } = e;
  if (!(t instanceof ReadableStream))
    throw new Error("The options.readableStream must be an instance of ReadableStream.");
  const n = new TextDecoderStream(), a = r ? (
    /**
     * Uint8Array binary -> string -> Output
     */
    t.pipeThrough(n).pipeThrough(r)
  ) : (
    /**
     * Uint8Array binary -> string -> SSE part string -> Default Output {@link SSEOutput}
     */
    t.pipeThrough(n).pipeThrough(GC()).pipeThrough(KC())
  );
  return a[Symbol.asyncIterator] = async function* () {
    const o = this.getReader();
    for (; ; ) {
      const {
        done: i,
        value: s
      } = await o.read();
      if (i) break;
      s && (yield s);
    }
  }, a;
}
const YC = async (e, t) => {
  const {
    fetch: r = globalThis.fetch,
    middlewares: n = {},
    ...a
  } = t;
  if (typeof r != "function")
    throw new Error("The options.fetch must be a typeof fetch function!");
  let o = [e, a];
  typeof n.onRequest == "function" && (o = await n.onRequest(...o));
  let i = await r(...o);
  if (typeof n.onResponse == "function") {
    const s = await n.onResponse(i);
    if (!(s instanceof Response))
      throw new Error("The options.onResponse must return a Response instance!");
    i = s;
  }
  if (!i.ok)
    throw new Error(`Fetch failed with status ${i.status}`);
  if (!i.body)
    throw new Error("The response body is empty.");
  return i;
}, XC = {
  headers: {
    "Content-Type": "application/json"
  }
};
class ZC {
  constructor(t, r) {
    X(this, "baseURL");
    X(this, "options");
    if (!t || typeof t != "string") throw new Error("The baseURL is not valid!");
    this.baseURL = t, this.options = r || {};
  }
}
class QC extends ZC {
  constructor(r, n) {
    super(r, n);
    X(this, "_asyncHandler");
    X(this, "timeoutHandler");
    X(this, "_isTimeout", !1);
    X(this, "streamTimeoutHandler");
    X(this, "_isStreamTimeout", !1);
    X(this, "abortController");
    X(this, "_isRequesting", !1);
    X(this, "_manual", !1);
    X(this, "customResponseHandler", async (r, n, a, o) => {
      const i = Wd({
        readableStream: r.body,
        transformStream: a
      });
      await this.processStream(i, r, n, o);
    });
    X(this, "sseResponseHandler", async (r, n, a) => {
      const o = Wd({
        readableStream: r.body
      });
      await this.processStream(o, r, n, a);
    });
    X(this, "jsonResponseHandler", async (r, n) => {
      var o, i, s;
      const a = await r.json();
      if ((a == null ? void 0 : a.success) === !1) {
        const l = new Error(a.message || "System error");
        l.name = a.name || "SystemError", (o = n == null ? void 0 : n.onError) == null || o.call(n, l, a);
      } else
        (i = n == null ? void 0 : n.onUpdate) == null || i.call(n, a, r.headers), this.finishRequest(), (s = n == null ? void 0 : n.onSuccess) == null || s.call(n, [a], r.headers);
    });
    this._manual = (n == null ? void 0 : n.manual) || !1, this.manual || this.init();
  }
  get asyncHandler() {
    return this._asyncHandler;
  }
  get isTimeout() {
    return this._isTimeout;
  }
  set isTimeout(r) {
    this._isTimeout = r;
  }
  get isStreamTimeout() {
    return this._isStreamTimeout;
  }
  set isStreamTimeout(r) {
    this._isStreamTimeout = r;
  }
  get isRequesting() {
    return this._isRequesting;
  }
  get manual() {
    return this._manual;
  }
  run(r) {
    this.manual ? this.init(r) : console.warn("The request is not manual, so it cannot be run!");
  }
  abort() {
    clearTimeout(this.timeoutHandler), clearTimeout(this.streamTimeoutHandler), this.abortController.abort();
  }
  init(r) {
    this.abortController = new AbortController();
    const {
      callbacks: n,
      params: a,
      headers: o = {},
      transformStream: i,
      fetch: s,
      timeout: l,
      streamTimeout: c,
      middlewares: u,
      ...d
    } = this.options, f = {
      ...d,
      method: "POST",
      body: JSON.stringify({
        ...a,
        ...r || {}
      }),
      params: {
        ...a,
        ...r
      },
      headers: Object.assign({}, XC.headers || {}, o),
      signal: this.abortController.signal,
      middlewares: u
    };
    l && l > 0 && (this.timeoutHandler = window.setTimeout(() => {
      var v;
      this.isTimeout = !0, this.finishRequest(), (v = n == null ? void 0 : n.onError) == null || v.call(n, new Error("TimeoutError"));
    }, l)), this.startRequest(), this._asyncHandler = YC(this.baseURL, {
      fetch: s,
      ...f
    }).then(async (v) => {
      if (clearTimeout(this.timeoutHandler), this.isTimeout) return;
      if (i) {
        let p = i;
        typeof i == "function" && (p = i(this.baseURL, v.headers)), await this.customResponseHandler(v, n, p, c);
        return;
      }
      const g = v.headers.get("content-type") || "";
      switch (g.split(";")[0].trim()) {
        case "text/event-stream":
          await this.sseResponseHandler(v, n, c);
          break;
        case "application/json":
          await this.jsonResponseHandler(v, n);
          break;
        default:
          throw new Error(`The response content-type: ${g} is not support!`);
      }
    }).catch((v) => {
      var h;
      clearTimeout(this.timeoutHandler), this.finishRequest();
      const g = v instanceof Error || v instanceof DOMException ? v : new Error("Unknown error!");
      (h = n == null ? void 0 : n.onError) == null || h.call(n, g);
    });
  }
  startRequest() {
    this._isRequesting = !0;
  }
  finishRequest() {
    this._isRequesting = !1;
  }
  async processStream(r, n, a, o) {
    var c, u;
    const i = [], s = r[Symbol.asyncIterator]();
    let l;
    do
      if (o && (this.streamTimeoutHandler = window.setTimeout(() => {
        var d;
        this.isStreamTimeout = !0, this.finishRequest(), (d = a == null ? void 0 : a.onError) == null || d.call(a, new Error("StreamTimeoutError"));
      }, o)), l = await s.next(), i.push(l.value), (c = a == null ? void 0 : a.onUpdate) == null || c.call(a, l.value, n.headers), clearTimeout(this.streamTimeoutHandler), this.isStreamTimeout)
        break;
    while (!l.done);
    if (o && (clearTimeout(this.streamTimeoutHandler), this.isStreamTimeout)) {
      this.finishRequest();
      return;
    }
    this.finishRequest(), (u = a == null ? void 0 : a.onSuccess) == null || u.call(a, i, n.headers);
  }
}
function BR(e, t) {
  return new QC(e, t);
}
function JC() {
  const {
    getPrefixCls: e,
    direction: t,
    csp: r,
    iconPrefixCls: n,
    theme: a
  } = T.useContext(nc.ConfigContext);
  return {
    theme: a,
    getPrefixCls: e,
    direction: t,
    csp: r,
    iconPrefixCls: n
  };
}
function Uc() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
var mn = Uc();
function Sg(e) {
  mn = e;
}
var ha = { exec: () => null };
function Je(e, t = "") {
  let r = typeof e == "string" ? e : e.source;
  const n = {
    replace: (a, o) => {
      let i = typeof o == "string" ? o : o.source;
      return i = i.replace(Ot.caret, "$1"), r = r.replace(a, i), n;
    },
    getRegex: () => new RegExp(r, t)
  };
  return n;
}
var Ot = {
  codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
  outputLinkReplace: /\\([\[\]])/g,
  indentCodeCompensation: /^(\s+)(?:```)/,
  beginningSpace: /^\s+/,
  endingHash: /#$/,
  startingSpaceChar: /^ /,
  endingSpaceChar: / $/,
  nonSpaceChar: /[^ ]/,
  newLineCharGlobal: /\n/g,
  tabCharGlobal: /\t/g,
  multipleSpaceGlobal: /\s+/g,
  blankLine: /^[ \t]*$/,
  doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
  blockquoteStart: /^ {0,3}>/,
  blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
  blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
  listReplaceTabs: /^\t+/,
  listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
  listIsTask: /^\[[ xX]\] /,
  listReplaceTask: /^\[[ xX]\] +/,
  anyLine: /\n.*\n/,
  hrefBrackets: /^<(.*)>$/,
  tableDelimiter: /[:|]/,
  tableAlignChars: /^\||\| *$/g,
  tableRowBlankLine: /\n[ \t]*$/,
  tableAlignRight: /^ *-+: *$/,
  tableAlignCenter: /^ *:-+: *$/,
  tableAlignLeft: /^ *:-+ *$/,
  startATag: /^<a /i,
  endATag: /^<\/a>/i,
  startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
  endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
  startAngleBracket: /^</,
  endAngleBracket: />$/,
  pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
  unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
  escapeTest: /[&<>"']/,
  escapeReplace: /[&<>"']/g,
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
  caret: /(^|[^\[])\^/g,
  percentDecode: /%25/g,
  findPipe: /\|/g,
  splitPipe: / \|/,
  slashPipe: /\\\|/g,
  carriageReturn: /\r\n|\r/g,
  spaceLine: /^ +$/gm,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
  hrRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  fencesBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`),
  headingBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`),
  htmlBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i")
}, e_ = /^(?:[ \t]*(?:\n|$))+/, t_ = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, r_ = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Za = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, n_ = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Wc = /(?:[*+-]|\d{1,9}[.)])/, Eg = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, xg = Je(Eg).replace(/bull/g, Wc).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), a_ = Je(Eg).replace(/bull/g, Wc).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), qc = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, o_ = /^[^\n]+/, Gc = /(?!\s*\])(?:\\.|[^\[\]\\])+/, i_ = Je(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Gc).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), s_ = Je(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Wc).getRegex(), Li = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Kc = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, l_ = Je(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", Kc).replace("tag", Li).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Cg = Je(qc).replace("hr", Za).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Li).getRegex(), c_ = Je(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Cg).getRegex(), Yc = {
  blockquote: c_,
  code: t_,
  def: i_,
  fences: r_,
  heading: n_,
  hr: Za,
  html: l_,
  lheading: xg,
  list: s_,
  newline: e_,
  paragraph: Cg,
  table: ha,
  text: o_
}, qd = Je(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", Za).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Li).getRegex(), u_ = {
  ...Yc,
  lheading: a_,
  table: qd,
  paragraph: Je(qc).replace("hr", Za).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", qd).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Li).getRegex()
}, d_ = {
  ...Yc,
  html: Je(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", Kc).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: ha,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: Je(qc).replace("hr", Za).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", xg).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, f_ = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, p_ = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, _g = /^( {2,}|\\)\n(?!\s*$)/, h_ = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, ji = /[\p{P}\p{S}]/u, Xc = /[\s\p{P}\p{S}]/u, wg = /[^\s\p{P}\p{S}]/u, g_ = Je(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Xc).getRegex(), $g = /(?!~)[\p{P}\p{S}]/u, m_ = /(?!~)[\s\p{P}\p{S}]/u, v_ = /(?:[^\s\p{P}\p{S}]|~)/u, y_ = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Tg = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, b_ = Je(Tg, "u").replace(/punct/g, ji).getRegex(), S_ = Je(Tg, "u").replace(/punct/g, $g).getRegex(), Rg = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", E_ = Je(Rg, "gu").replace(/notPunctSpace/g, wg).replace(/punctSpace/g, Xc).replace(/punct/g, ji).getRegex(), x_ = Je(Rg, "gu").replace(/notPunctSpace/g, v_).replace(/punctSpace/g, m_).replace(/punct/g, $g).getRegex(), C_ = Je(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, wg).replace(/punctSpace/g, Xc).replace(/punct/g, ji).getRegex(), __ = Je(/\\(punct)/, "gu").replace(/punct/g, ji).getRegex(), w_ = Je(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), $_ = Je(Kc).replace("(?:-->|$)", "-->").getRegex(), T_ = Je(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", $_).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Do = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, R_ = Je(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Do).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Ag = Je(/^!?\[(label)\]\[(ref)\]/).replace("label", Do).replace("ref", Gc).getRegex(), Pg = Je(/^!?\[(ref)\](?:\[\])?/).replace("ref", Gc).getRegex(), A_ = Je("reflink|nolink(?!\\()", "g").replace("reflink", Ag).replace("nolink", Pg).getRegex(), Zc = {
  _backpedal: ha,
  // only used for GFM url
  anyPunctuation: __,
  autolink: w_,
  blockSkip: y_,
  br: _g,
  code: p_,
  del: ha,
  emStrongLDelim: b_,
  emStrongRDelimAst: E_,
  emStrongRDelimUnd: C_,
  escape: f_,
  link: R_,
  nolink: Pg,
  punctuation: g_,
  reflink: Ag,
  reflinkSearch: A_,
  tag: T_,
  text: h_,
  url: ha
}, P_ = {
  ...Zc,
  link: Je(/^!?\[(label)\]\((.*?)\)/).replace("label", Do).getRegex(),
  reflink: Je(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Do).getRegex()
}, Rl = {
  ...Zc,
  emStrongRDelimAst: x_,
  emStrongLDelim: S_,
  url: Je(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, O_ = {
  ...Rl,
  br: Je(_g).replace("{2,}", "*").getRegex(),
  text: Je(Rl.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, po = {
  normal: Yc,
  gfm: u_,
  pedantic: d_
}, Zn = {
  normal: Zc,
  gfm: Rl,
  breaks: O_,
  pedantic: P_
}, k_ = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Gd = (e) => k_[e];
function Sr(e, t) {
  if (t) {
    if (Ot.escapeTest.test(e))
      return e.replace(Ot.escapeReplace, Gd);
  } else if (Ot.escapeTestNoEncode.test(e))
    return e.replace(Ot.escapeReplaceNoEncode, Gd);
  return e;
}
function Kd(e) {
  try {
    e = encodeURI(e).replace(Ot.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function Yd(e, t) {
  var o;
  const r = e.replace(Ot.findPipe, (i, s, l) => {
    let c = !1, u = s;
    for (; --u >= 0 && l[u] === "\\"; ) c = !c;
    return c ? "|" : " |";
  }), n = r.split(Ot.splitPipe);
  let a = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !((o = n.at(-1)) != null && o.trim()) && n.pop(), t)
    if (n.length > t)
      n.splice(t);
    else
      for (; n.length < t; ) n.push("");
  for (; a < n.length; a++)
    n[a] = n[a].trim().replace(Ot.slashPipe, "|");
  return n;
}
function Qn(e, t, r) {
  const n = e.length;
  if (n === 0)
    return "";
  let a = 0;
  for (; a < n && e.charAt(n - a - 1) === t; )
    a++;
  return e.slice(0, n - a);
}
function M_(e, t) {
  if (e.indexOf(t[1]) === -1)
    return -1;
  let r = 0;
  for (let n = 0; n < e.length; n++)
    if (e[n] === "\\")
      n++;
    else if (e[n] === t[0])
      r++;
    else if (e[n] === t[1] && (r--, r < 0))
      return n;
  return r > 0 ? -2 : -1;
}
function Xd(e, t, r, n, a) {
  const o = t.href, i = t.title || null, s = e[1].replace(a.other.outputLinkReplace, "$1");
  n.state.inLink = !0;
  const l = {
    type: e[0].charAt(0) === "!" ? "image" : "link",
    raw: r,
    href: o,
    title: i,
    text: s,
    tokens: n.inlineTokens(s)
  };
  return n.state.inLink = !1, l;
}
function N_(e, t, r) {
  const n = e.match(r.other.indentCodeCompensation);
  if (n === null)
    return t;
  const a = n[1];
  return t.split(`
`).map((o) => {
    const i = o.match(r.other.beginningSpace);
    if (i === null)
      return o;
    const [s] = i;
    return s.length >= a.length ? o.slice(a.length) : o;
  }).join(`
`);
}
var Fo = class {
  // set by the lexer
  constructor(e) {
    X(this, "options");
    X(this, "rules");
    // set by the lexer
    X(this, "lexer");
    this.options = e || mn;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0)
      return {
        type: "space",
        raw: t[0]
      };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const r = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? r : Qn(r, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const r = t[0], n = N_(r, t[3] || "", this.rules);
      return {
        type: "code",
        raw: r,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: n
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let r = t[2].trim();
      if (this.rules.other.endingHash.test(r)) {
        const n = Qn(r, "#");
        (this.options.pedantic || !n || this.rules.other.endingSpaceChar.test(n)) && (r = n.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: r,
        tokens: this.lexer.inline(r)
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: Qn(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let r = Qn(t[0], `
`).split(`
`), n = "", a = "";
      const o = [];
      for (; r.length > 0; ) {
        let i = !1;
        const s = [];
        let l;
        for (l = 0; l < r.length; l++)
          if (this.rules.other.blockquoteStart.test(r[l]))
            s.push(r[l]), i = !0;
          else if (!i)
            s.push(r[l]);
          else
            break;
        r = r.slice(l);
        const c = s.join(`
`), u = c.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        n = n ? `${n}
${c}` : c, a = a ? `${a}
${u}` : u;
        const d = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(u, o, !0), this.lexer.state.top = d, r.length === 0)
          break;
        const f = o.at(-1);
        if ((f == null ? void 0 : f.type) === "code")
          break;
        if ((f == null ? void 0 : f.type) === "blockquote") {
          const v = f, g = v.raw + `
` + r.join(`
`), h = this.blockquote(g);
          o[o.length - 1] = h, n = n.substring(0, n.length - v.raw.length) + h.raw, a = a.substring(0, a.length - v.text.length) + h.text;
          break;
        } else if ((f == null ? void 0 : f.type) === "list") {
          const v = f, g = v.raw + `
` + r.join(`
`), h = this.list(g);
          o[o.length - 1] = h, n = n.substring(0, n.length - f.raw.length) + h.raw, a = a.substring(0, a.length - v.raw.length) + h.raw, r = g.substring(o.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: n,
        tokens: o,
        text: a
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let r = t[1].trim();
      const n = r.length > 1, a = {
        type: "list",
        raw: "",
        ordered: n,
        start: n ? +r.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      r = n ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = n ? r : "[*+-]");
      const o = this.rules.other.listItemRegex(r);
      let i = !1;
      for (; e; ) {
        let l = !1, c = "", u = "";
        if (!(t = o.exec(e)) || this.rules.block.hr.test(e))
          break;
        c = t[0], e = e.substring(c.length);
        let d = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (y) => " ".repeat(3 * y.length)), f = e.split(`
`, 1)[0], v = !d.trim(), g = 0;
        if (this.options.pedantic ? (g = 2, u = d.trimStart()) : v ? g = t[1].length + 1 : (g = t[2].search(this.rules.other.nonSpaceChar), g = g > 4 ? 1 : g, u = d.slice(g), g += t[1].length), v && this.rules.other.blankLine.test(f) && (c += f + `
`, e = e.substring(f.length + 1), l = !0), !l) {
          const y = this.rules.other.nextBulletRegex(g), m = this.rules.other.hrRegex(g), S = this.rules.other.fencesBeginRegex(g), E = this.rules.other.headingBeginRegex(g), x = this.rules.other.htmlBeginRegex(g);
          for (; e; ) {
            const w = e.split(`
`, 1)[0];
            let b;
            if (f = w, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), b = f) : b = f.replace(this.rules.other.tabCharGlobal, "    "), S.test(f) || E.test(f) || x.test(f) || y.test(f) || m.test(f))
              break;
            if (b.search(this.rules.other.nonSpaceChar) >= g || !f.trim())
              u += `
` + b.slice(g);
            else {
              if (v || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || S.test(d) || E.test(d) || m.test(d))
                break;
              u += `
` + f;
            }
            !v && !f.trim() && (v = !0), c += w + `
`, e = e.substring(w.length + 1), d = b.slice(g);
          }
        }
        a.loose || (i ? a.loose = !0 : this.rules.other.doubleBlankLine.test(c) && (i = !0));
        let h = null, p;
        this.options.gfm && (h = this.rules.other.listIsTask.exec(u), h && (p = h[0] !== "[ ] ", u = u.replace(this.rules.other.listReplaceTask, ""))), a.items.push({
          type: "list_item",
          raw: c,
          task: !!h,
          checked: p,
          loose: !1,
          text: u,
          tokens: []
        }), a.raw += c;
      }
      const s = a.items.at(-1);
      if (s)
        s.raw = s.raw.trimEnd(), s.text = s.text.trimEnd();
      else
        return;
      a.raw = a.raw.trimEnd();
      for (let l = 0; l < a.items.length; l++)
        if (this.lexer.state.top = !1, a.items[l].tokens = this.lexer.blockTokens(a.items[l].text, []), !a.loose) {
          const c = a.items[l].tokens.filter((d) => d.type === "space"), u = c.length > 0 && c.some((d) => this.rules.other.anyLine.test(d.raw));
          a.loose = u;
        }
      if (a.loose)
        for (let l = 0; l < a.items.length; l++)
          a.items[l].loose = !0;
      return a;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0]
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const r = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", a = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: r,
        raw: t[0],
        href: n,
        title: a
      };
    }
  }
  table(e) {
    var i;
    const t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2]))
      return;
    const r = Yd(t[1]), n = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), a = (i = t[3]) != null && i.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], o = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (r.length === n.length) {
      for (const s of n)
        this.rules.other.tableAlignRight.test(s) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(s) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(s) ? o.align.push("left") : o.align.push(null);
      for (let s = 0; s < r.length; s++)
        o.header.push({
          text: r[s],
          tokens: this.lexer.inline(r[s]),
          header: !0,
          align: o.align[s]
        });
      for (const s of a)
        o.rows.push(Yd(s, o.header.length).map((l, c) => ({
          text: l,
          tokens: this.lexer.inline(l),
          header: !1,
          align: o.align[c]
        })));
      return o;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const r = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: r,
        tokens: this.lexer.inline(r)
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t)
      return {
        type: "escape",
        raw: t[0],
        text: t[1]
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: t[0]
      };
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const r = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(r)) {
        if (!this.rules.other.endAngleBracket.test(r))
          return;
        const o = Qn(r.slice(0, -1), "\\");
        if ((r.length - o.length) % 2 === 0)
          return;
      } else {
        const o = M_(t[2], "()");
        if (o === -2)
          return;
        if (o > -1) {
          const s = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + o;
          t[2] = t[2].substring(0, o), t[0] = t[0].substring(0, s).trim(), t[3] = "";
        }
      }
      let n = t[2], a = "";
      if (this.options.pedantic) {
        const o = this.rules.other.pedanticHrefTitle.exec(n);
        o && (n = o[1], a = o[3]);
      } else
        a = t[3] ? t[3].slice(1, -1) : "";
      return n = n.trim(), this.rules.other.startAngleBracket.test(n) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(r) ? n = n.slice(1) : n = n.slice(1, -1)), Xd(t, {
        href: n && n.replace(this.rules.inline.anyPunctuation, "$1"),
        title: a && a.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let r;
    if ((r = this.rules.inline.reflink.exec(e)) || (r = this.rules.inline.nolink.exec(e))) {
      const n = (r[2] || r[1]).replace(this.rules.other.multipleSpaceGlobal, " "), a = t[n.toLowerCase()];
      if (!a) {
        const o = r[0].charAt(0);
        return {
          type: "text",
          raw: o,
          text: o
        };
      }
      return Xd(r, a, r[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, r = "") {
    let n = this.rules.inline.emStrongLDelim.exec(e);
    if (!n || n[3] && r.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(n[1] || n[2] || "") || !r || this.rules.inline.punctuation.exec(r)) {
      const o = [...n[0]].length - 1;
      let i, s, l = o, c = 0;
      const u = n[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (u.lastIndex = 0, t = t.slice(-1 * e.length + o); (n = u.exec(t)) != null; ) {
        if (i = n[1] || n[2] || n[3] || n[4] || n[5] || n[6], !i) continue;
        if (s = [...i].length, n[3] || n[4]) {
          l += s;
          continue;
        } else if ((n[5] || n[6]) && o % 3 && !((o + s) % 3)) {
          c += s;
          continue;
        }
        if (l -= s, l > 0) continue;
        s = Math.min(s, s + l + c);
        const d = [...n[0]][0].length, f = e.slice(0, o + n.index + d + s);
        if (Math.min(o, s) % 2) {
          const g = f.slice(1, -1);
          return {
            type: "em",
            raw: f,
            text: g,
            tokens: this.lexer.inlineTokens(g)
          };
        }
        const v = f.slice(2, -2);
        return {
          type: "strong",
          raw: f,
          text: v,
          tokens: this.lexer.inlineTokens(v)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let r = t[2].replace(this.rules.other.newLineCharGlobal, " ");
      const n = this.rules.other.nonSpaceChar.test(r), a = this.rules.other.startingSpaceChar.test(r) && this.rules.other.endingSpaceChar.test(r);
      return n && a && (r = r.substring(1, r.length - 1)), {
        type: "codespan",
        raw: t[0],
        text: r
      };
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t)
      return {
        type: "br",
        raw: t[0]
      };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let r, n;
      return t[2] === "@" ? (r = t[1], n = "mailto:" + r) : (r = t[1], n = r), {
        type: "link",
        raw: t[0],
        text: r,
        href: n,
        tokens: [
          {
            type: "text",
            raw: r,
            text: r
          }
        ]
      };
    }
  }
  url(e) {
    var r;
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let n, a;
      if (t[2] === "@")
        n = t[0], a = "mailto:" + n;
      else {
        let o;
        do
          o = t[0], t[0] = ((r = this.rules.inline._backpedal.exec(t[0])) == null ? void 0 : r[0]) ?? "";
        while (o !== t[0]);
        n = t[0], t[1] === "www." ? a = "http://" + t[0] : a = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: n,
        href: a,
        tokens: [
          {
            type: "text",
            raw: n,
            text: n
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      const r = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        escaped: r
      };
    }
  }
}, Or = class Al {
  constructor(t) {
    X(this, "tokens");
    X(this, "options");
    X(this, "state");
    X(this, "tokenizer");
    X(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || mn, this.options.tokenizer = this.options.tokenizer || new Fo(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const r = {
      other: Ot,
      block: po.normal,
      inline: Zn.normal
    };
    this.options.pedantic ? (r.block = po.pedantic, r.inline = Zn.pedantic) : this.options.gfm && (r.block = po.gfm, this.options.breaks ? r.inline = Zn.breaks : r.inline = Zn.gfm), this.tokenizer.rules = r;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: po,
      inline: Zn
    };
  }
  /**
   * Static Lex Method
   */
  static lex(t, r) {
    return new Al(r).lex(t);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(t, r) {
    return new Al(r).inlineTokens(t);
  }
  /**
   * Preprocessing
   */
  lex(t) {
    t = t.replace(Ot.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let r = 0; r < this.inlineQueue.length; r++) {
      const n = this.inlineQueue[r];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, r = [], n = !1) {
    var a, o, i;
    for (this.options.pedantic && (t = t.replace(Ot.tabCharGlobal, "    ").replace(Ot.spaceLine, "")); t; ) {
      let s;
      if ((o = (a = this.options.extensions) == null ? void 0 : a.block) != null && o.some((c) => (s = c.call({ lexer: this }, t, r)) ? (t = t.substring(s.raw.length), r.push(s), !0) : !1))
        continue;
      if (s = this.tokenizer.space(t)) {
        t = t.substring(s.raw.length);
        const c = r.at(-1);
        s.raw.length === 1 && c !== void 0 ? c.raw += `
` : r.push(s);
        continue;
      }
      if (s = this.tokenizer.code(t)) {
        t = t.substring(s.raw.length);
        const c = r.at(-1);
        (c == null ? void 0 : c.type) === "paragraph" || (c == null ? void 0 : c.type) === "text" ? (c.raw += `
` + s.raw, c.text += `
` + s.text, this.inlineQueue.at(-1).src = c.text) : r.push(s);
        continue;
      }
      if (s = this.tokenizer.fences(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.heading(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.hr(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.blockquote(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.list(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.html(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.def(t)) {
        t = t.substring(s.raw.length);
        const c = r.at(-1);
        (c == null ? void 0 : c.type) === "paragraph" || (c == null ? void 0 : c.type) === "text" ? (c.raw += `
` + s.raw, c.text += `
` + s.raw, this.inlineQueue.at(-1).src = c.text) : this.tokens.links[s.tag] || (this.tokens.links[s.tag] = {
          href: s.href,
          title: s.title
        });
        continue;
      }
      if (s = this.tokenizer.table(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.lheading(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      let l = t;
      if ((i = this.options.extensions) != null && i.startBlock) {
        let c = 1 / 0;
        const u = t.slice(1);
        let d;
        this.options.extensions.startBlock.forEach((f) => {
          d = f.call({ lexer: this }, u), typeof d == "number" && d >= 0 && (c = Math.min(c, d));
        }), c < 1 / 0 && c >= 0 && (l = t.substring(0, c + 1));
      }
      if (this.state.top && (s = this.tokenizer.paragraph(l))) {
        const c = r.at(-1);
        n && (c == null ? void 0 : c.type) === "paragraph" ? (c.raw += `
` + s.raw, c.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = c.text) : r.push(s), n = l.length !== t.length, t = t.substring(s.raw.length);
        continue;
      }
      if (s = this.tokenizer.text(t)) {
        t = t.substring(s.raw.length);
        const c = r.at(-1);
        (c == null ? void 0 : c.type) === "text" ? (c.raw += `
` + s.raw, c.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = c.text) : r.push(s);
        continue;
      }
      if (t) {
        const c = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(c);
          break;
        } else
          throw new Error(c);
      }
    }
    return this.state.top = !0, r;
  }
  inline(t, r = []) {
    return this.inlineQueue.push({ src: t, tokens: r }), r;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(t, r = []) {
    var s, l, c;
    let n = t, a = null;
    if (this.tokens.links) {
      const u = Object.keys(this.tokens.links);
      if (u.length > 0)
        for (; (a = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null; )
          u.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (a = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; )
      n = n.slice(0, a.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (a = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; )
      n = n.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    let o = !1, i = "";
    for (; t; ) {
      o || (i = ""), o = !1;
      let u;
      if ((l = (s = this.options.extensions) == null ? void 0 : s.inline) != null && l.some((f) => (u = f.call({ lexer: this }, t, r)) ? (t = t.substring(u.raw.length), r.push(u), !0) : !1))
        continue;
      if (u = this.tokenizer.escape(t)) {
        t = t.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.tag(t)) {
        t = t.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.link(t)) {
        t = t.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.reflink(t, this.tokens.links)) {
        t = t.substring(u.raw.length);
        const f = r.at(-1);
        u.type === "text" && (f == null ? void 0 : f.type) === "text" ? (f.raw += u.raw, f.text += u.text) : r.push(u);
        continue;
      }
      if (u = this.tokenizer.emStrong(t, n, i)) {
        t = t.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.codespan(t)) {
        t = t.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.br(t)) {
        t = t.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.del(t)) {
        t = t.substring(u.raw.length), r.push(u);
        continue;
      }
      if (u = this.tokenizer.autolink(t)) {
        t = t.substring(u.raw.length), r.push(u);
        continue;
      }
      if (!this.state.inLink && (u = this.tokenizer.url(t))) {
        t = t.substring(u.raw.length), r.push(u);
        continue;
      }
      let d = t;
      if ((c = this.options.extensions) != null && c.startInline) {
        let f = 1 / 0;
        const v = t.slice(1);
        let g;
        this.options.extensions.startInline.forEach((h) => {
          g = h.call({ lexer: this }, v), typeof g == "number" && g >= 0 && (f = Math.min(f, g));
        }), f < 1 / 0 && f >= 0 && (d = t.substring(0, f + 1));
      }
      if (u = this.tokenizer.inlineText(d)) {
        t = t.substring(u.raw.length), u.raw.slice(-1) !== "_" && (i = u.raw.slice(-1)), o = !0;
        const f = r.at(-1);
        (f == null ? void 0 : f.type) === "text" ? (f.raw += u.raw, f.text += u.text) : r.push(u);
        continue;
      }
      if (t) {
        const f = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(f);
          break;
        } else
          throw new Error(f);
      }
    }
    return r;
  }
}, Lo = class {
  // set by the parser
  constructor(e) {
    X(this, "options");
    X(this, "parser");
    this.options = e || mn;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: r }) {
    var o;
    const n = (o = (t || "").match(Ot.notSpaceStart)) == null ? void 0 : o[0], a = e.replace(Ot.endingNewline, "") + `
`;
    return n ? '<pre><code class="language-' + Sr(n) + '">' + (r ? a : Sr(a, !0)) + `</code></pre>
` : "<pre><code>" + (r ? a : Sr(a, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    const t = e.ordered, r = e.start;
    let n = "";
    for (let i = 0; i < e.items.length; i++) {
      const s = e.items[i];
      n += this.listitem(s);
    }
    const a = t ? "ol" : "ul", o = t && r !== 1 ? ' start="' + r + '"' : "";
    return "<" + a + o + `>
` + n + "</" + a + `>
`;
  }
  listitem(e) {
    var r;
    let t = "";
    if (e.task) {
      const n = this.checkbox({ checked: !!e.checked });
      e.loose ? ((r = e.tokens[0]) == null ? void 0 : r.type) === "paragraph" ? (e.tokens[0].text = n + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = n + " " + Sr(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
        type: "text",
        raw: n + " ",
        text: n + " ",
        escaped: !0
      }) : t += n + " ";
    }
    return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", r = "";
    for (let a = 0; a < e.header.length; a++)
      r += this.tablecell(e.header[a]);
    t += this.tablerow({ text: r });
    let n = "";
    for (let a = 0; a < e.rows.length; a++) {
      const o = e.rows[a];
      r = "";
      for (let i = 0; i < o.length; i++)
        r += this.tablecell(o[i]);
      n += this.tablerow({ text: r });
    }
    return n && (n = `<tbody>${n}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + n + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    const t = this.parser.parseInline(e.tokens), r = e.header ? "th" : "td";
    return (e.align ? `<${r} align="${e.align}">` : `<${r}>`) + t + `</${r}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${Sr(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: r }) {
    const n = this.parser.parseInline(r), a = Kd(e);
    if (a === null)
      return n;
    e = a;
    let o = '<a href="' + e + '"';
    return t && (o += ' title="' + Sr(t) + '"'), o += ">" + n + "</a>", o;
  }
  image({ href: e, title: t, text: r, tokens: n }) {
    n && (r = this.parser.parseInline(n, this.parser.textRenderer));
    const a = Kd(e);
    if (a === null)
      return Sr(r);
    e = a;
    let o = `<img src="${e}" alt="${r}"`;
    return t && (o += ` title="${Sr(t)}"`), o += ">", o;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : Sr(e.text);
  }
}, Qc = class {
  // no need for block level renderers
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
}, kr = class Pl {
  constructor(t) {
    X(this, "options");
    X(this, "renderer");
    X(this, "textRenderer");
    this.options = t || mn, this.options.renderer = this.options.renderer || new Lo(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Qc();
  }
  /**
   * Static Parse Method
   */
  static parse(t, r) {
    return new Pl(r).parse(t);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(t, r) {
    return new Pl(r).parseInline(t);
  }
  /**
   * Parse Loop
   */
  parse(t, r = !0) {
    var a, o;
    let n = "";
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      if ((o = (a = this.options.extensions) == null ? void 0 : a.renderers) != null && o[s.type]) {
        const c = s, u = this.options.extensions.renderers[c.type].call({ parser: this }, c);
        if (u !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(c.type)) {
          n += u || "";
          continue;
        }
      }
      const l = s;
      switch (l.type) {
        case "space": {
          n += this.renderer.space(l);
          continue;
        }
        case "hr": {
          n += this.renderer.hr(l);
          continue;
        }
        case "heading": {
          n += this.renderer.heading(l);
          continue;
        }
        case "code": {
          n += this.renderer.code(l);
          continue;
        }
        case "table": {
          n += this.renderer.table(l);
          continue;
        }
        case "blockquote": {
          n += this.renderer.blockquote(l);
          continue;
        }
        case "list": {
          n += this.renderer.list(l);
          continue;
        }
        case "html": {
          n += this.renderer.html(l);
          continue;
        }
        case "paragraph": {
          n += this.renderer.paragraph(l);
          continue;
        }
        case "text": {
          let c = l, u = this.renderer.text(c);
          for (; i + 1 < t.length && t[i + 1].type === "text"; )
            c = t[++i], u += `
` + this.renderer.text(c);
          r ? n += this.renderer.paragraph({
            type: "paragraph",
            raw: u,
            text: u,
            tokens: [{ type: "text", raw: u, text: u, escaped: !0 }]
          }) : n += u;
          continue;
        }
        default: {
          const c = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent)
            return console.error(c), "";
          throw new Error(c);
        }
      }
    }
    return n;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(t, r = this.renderer) {
    var a, o;
    let n = "";
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      if ((o = (a = this.options.extensions) == null ? void 0 : a.renderers) != null && o[s.type]) {
        const c = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (c !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(s.type)) {
          n += c || "";
          continue;
        }
      }
      const l = s;
      switch (l.type) {
        case "escape": {
          n += r.text(l);
          break;
        }
        case "html": {
          n += r.html(l);
          break;
        }
        case "link": {
          n += r.link(l);
          break;
        }
        case "image": {
          n += r.image(l);
          break;
        }
        case "strong": {
          n += r.strong(l);
          break;
        }
        case "em": {
          n += r.em(l);
          break;
        }
        case "codespan": {
          n += r.codespan(l);
          break;
        }
        case "br": {
          n += r.br(l);
          break;
        }
        case "del": {
          n += r.del(l);
          break;
        }
        case "text": {
          n += r.text(l);
          break;
        }
        default: {
          const c = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent)
            return console.error(c), "";
          throw new Error(c);
        }
      }
    }
    return n;
  }
}, Is, Ao = (Is = class {
  constructor(e) {
    X(this, "options");
    X(this, "block");
    this.options = e || mn;
  }
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? Or.lex : Or.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? kr.parse : kr.parseInline;
  }
}, X(Is, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
])), Is), Og = class {
  constructor(...e) {
    X(this, "defaults", Uc());
    X(this, "options", this.setOptions);
    X(this, "parse", this.parseMarkdown(!0));
    X(this, "parseInline", this.parseMarkdown(!1));
    X(this, "Parser", kr);
    X(this, "Renderer", Lo);
    X(this, "TextRenderer", Qc);
    X(this, "Lexer", Or);
    X(this, "Tokenizer", Fo);
    X(this, "Hooks", Ao);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    var n, a;
    let r = [];
    for (const o of e)
      switch (r = r.concat(t.call(this, o)), o.type) {
        case "table": {
          const i = o;
          for (const s of i.header)
            r = r.concat(this.walkTokens(s.tokens, t));
          for (const s of i.rows)
            for (const l of s)
              r = r.concat(this.walkTokens(l.tokens, t));
          break;
        }
        case "list": {
          const i = o;
          r = r.concat(this.walkTokens(i.items, t));
          break;
        }
        default: {
          const i = o;
          (a = (n = this.defaults.extensions) == null ? void 0 : n.childTokens) != null && a[i.type] ? this.defaults.extensions.childTokens[i.type].forEach((s) => {
            const l = i[s].flat(1 / 0);
            r = r.concat(this.walkTokens(l, t));
          }) : i.tokens && (r = r.concat(this.walkTokens(i.tokens, t)));
        }
      }
    return r;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((r) => {
      const n = { ...r };
      if (n.async = this.defaults.async || n.async || !1, r.extensions && (r.extensions.forEach((a) => {
        if (!a.name)
          throw new Error("extension name required");
        if ("renderer" in a) {
          const o = t.renderers[a.name];
          o ? t.renderers[a.name] = function(...i) {
            let s = a.renderer.apply(this, i);
            return s === !1 && (s = o.apply(this, i)), s;
          } : t.renderers[a.name] = a.renderer;
        }
        if ("tokenizer" in a) {
          if (!a.level || a.level !== "block" && a.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const o = t[a.level];
          o ? o.unshift(a.tokenizer) : t[a.level] = [a.tokenizer], a.start && (a.level === "block" ? t.startBlock ? t.startBlock.push(a.start) : t.startBlock = [a.start] : a.level === "inline" && (t.startInline ? t.startInline.push(a.start) : t.startInline = [a.start]));
        }
        "childTokens" in a && a.childTokens && (t.childTokens[a.name] = a.childTokens);
      }), n.extensions = t), r.renderer) {
        const a = this.defaults.renderer || new Lo(this.defaults);
        for (const o in r.renderer) {
          if (!(o in a))
            throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o))
            continue;
          const i = o, s = r.renderer[i], l = a[i];
          a[i] = (...c) => {
            let u = s.apply(a, c);
            return u === !1 && (u = l.apply(a, c)), u || "";
          };
        }
        n.renderer = a;
      }
      if (r.tokenizer) {
        const a = this.defaults.tokenizer || new Fo(this.defaults);
        for (const o in r.tokenizer) {
          if (!(o in a))
            throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o))
            continue;
          const i = o, s = r.tokenizer[i], l = a[i];
          a[i] = (...c) => {
            let u = s.apply(a, c);
            return u === !1 && (u = l.apply(a, c)), u;
          };
        }
        n.tokenizer = a;
      }
      if (r.hooks) {
        const a = this.defaults.hooks || new Ao();
        for (const o in r.hooks) {
          if (!(o in a))
            throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o))
            continue;
          const i = o, s = r.hooks[i], l = a[i];
          Ao.passThroughHooks.has(o) ? a[i] = (c) => {
            if (this.defaults.async)
              return Promise.resolve(s.call(a, c)).then((d) => l.call(a, d));
            const u = s.call(a, c);
            return l.call(a, u);
          } : a[i] = (...c) => {
            let u = s.apply(a, c);
            return u === !1 && (u = l.apply(a, c)), u;
          };
        }
        n.hooks = a;
      }
      if (r.walkTokens) {
        const a = this.defaults.walkTokens, o = r.walkTokens;
        n.walkTokens = function(i) {
          let s = [];
          return s.push(o.call(this, i)), a && (s = s.concat(a.call(this, i))), s;
        };
      }
      this.defaults = { ...this.defaults, ...n };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return Or.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return kr.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (r, n) => {
      const a = { ...n }, o = { ...this.defaults, ...a }, i = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === !0 && a.async === !1)
        return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof r > "u" || r === null)
        return i(new Error("marked(): input parameter is undefined or null"));
      if (typeof r != "string")
        return i(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(r) + ", string expected"));
      o.hooks && (o.hooks.options = o, o.hooks.block = e);
      const s = o.hooks ? o.hooks.provideLexer() : e ? Or.lex : Or.lexInline, l = o.hooks ? o.hooks.provideParser() : e ? kr.parse : kr.parseInline;
      if (o.async)
        return Promise.resolve(o.hooks ? o.hooks.preprocess(r) : r).then((c) => s(c, o)).then((c) => o.hooks ? o.hooks.processAllTokens(c) : c).then((c) => o.walkTokens ? Promise.all(this.walkTokens(c, o.walkTokens)).then(() => c) : c).then((c) => l(c, o)).then((c) => o.hooks ? o.hooks.postprocess(c) : c).catch(i);
      try {
        o.hooks && (r = o.hooks.preprocess(r));
        let c = s(r, o);
        o.hooks && (c = o.hooks.processAllTokens(c)), o.walkTokens && this.walkTokens(c, o.walkTokens);
        let u = l(c, o);
        return o.hooks && (u = o.hooks.postprocess(u)), u;
      } catch (c) {
        return i(c);
      }
    };
  }
  onError(e, t) {
    return (r) => {
      if (r.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const n = "<p>An error occurred:</p><pre>" + Sr(r.message + "", !0) + "</pre>";
        return t ? Promise.resolve(n) : n;
      }
      if (t)
        return Promise.reject(r);
      throw r;
    };
  }
}, fn = new Og();
function tt(e, t) {
  return fn.parse(e, t);
}
tt.options = tt.setOptions = function(e) {
  return fn.setOptions(e), tt.defaults = fn.defaults, Sg(tt.defaults), tt;
};
tt.getDefaults = Uc;
tt.defaults = mn;
tt.use = function(...e) {
  return fn.use(...e), tt.defaults = fn.defaults, Sg(tt.defaults), tt;
};
tt.walkTokens = function(e, t) {
  return fn.walkTokens(e, t);
};
tt.parseInline = fn.parseInline;
tt.Parser = kr;
tt.parser = kr.parse;
tt.Renderer = Lo;
tt.TextRenderer = Qc;
tt.Lexer = Or;
tt.lexer = Or.lex;
tt.Tokenizer = Fo;
tt.Hooks = Ao;
tt.parse = tt;
tt.options;
tt.setOptions;
tt.use;
tt.walkTokens;
tt.parseInline;
kr.parse;
Or.lex;
const on = {
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeTest: /[&<>"']/,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  escapeReplace: /[&<>"']/g,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  completeFencedCode: /^ {0,3}(`{3,}|~{3,})([\s\S]*?)\n {0,3}\1[ \n\t]*$/
}, I_ = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Zd = (e) => I_[e];
function Qd(e, t) {
  if (t) {
    if (on.escapeTest.test(e))
      return e.replace(on.escapeReplace, Zd);
  } else if (on.escapeTestNoEncode.test(e))
    return e.replace(on.escapeReplaceNoEncode, Zd);
  return e;
}
class D_ {
  constructor(t = {}) {
    X(this, "options");
    X(this, "markdownInstance");
    const {
      markedConfig: r = {}
    } = t;
    this.options = t, this.markdownInstance = new Og(), this.configureLinkRenderer(), this.configureParagraphRenderer(), this.configureCodeRenderer(), this.markdownInstance.use(r);
  }
  configureLinkRenderer() {
    if (!this.options.openLinksInNewTab) return;
    const t = {
      link({
        href: r,
        title: n,
        tokens: a
      }) {
        const o = this.parser.parseInline(a), i = n ? ` title="${n}"` : "";
        return `<a href="${r}"${i} target="_blank" rel="noopener noreferrer">${o}</a>`;
      }
    };
    this.markdownInstance.use({
      renderer: t
    });
  }
  configureParagraphRenderer() {
    const {
      paragraphTag: t
    } = this.options;
    if (!t) return;
    const r = {
      paragraph({
        tokens: n
      }) {
        return `<${t}>${this.parser.parseInline(n)}</${t}>
`;
      }
    };
    this.markdownInstance.use({
      renderer: r
    });
  }
  configureCodeRenderer() {
    const t = {
      code({
        text: r,
        raw: n,
        lang: a,
        escaped: o,
        codeBlockStyle: i
      }) {
        var v;
        const s = (v = (a || "").match(on.notSpaceStart)) == null ? void 0 : v[0], l = `${r.replace(on.endingNewline, "")}
`, u = i === "indented" || on.completeFencedCode.test(n) ? "done" : "loading", d = o ? l : Qd(l, !0), f = s ? ` class="language-${Qd(s)}"` : "";
        return `<pre><code data-block="true" data-state="${u}"${f}>${d}</code></pre>
`;
      }
    };
    this.markdownInstance.use({
      renderer: t
    });
  }
  parse(t) {
    return this.markdownInstance.parse(t);
  }
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: kg,
  setPrototypeOf: Jd,
  isFrozen: F_,
  getPrototypeOf: L_,
  getOwnPropertyDescriptor: j_
} = Object;
let {
  freeze: kt,
  seal: rr,
  create: Ol
} = Object, {
  apply: kl,
  construct: Ml
} = typeof Reflect < "u" && Reflect;
kt || (kt = function(t) {
  return t;
});
rr || (rr = function(t) {
  return t;
});
kl || (kl = function(t, r) {
  for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++)
    a[o - 2] = arguments[o];
  return t.apply(r, a);
});
Ml || (Ml = function(t) {
  for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
    n[a - 1] = arguments[a];
  return new t(...n);
});
const ho = Mt(Array.prototype.forEach), z_ = Mt(Array.prototype.lastIndexOf), ef = Mt(Array.prototype.pop), Jn = Mt(Array.prototype.push), H_ = Mt(Array.prototype.splice), Po = Mt(String.prototype.toLowerCase), ys = Mt(String.prototype.toString), bs = Mt(String.prototype.match), ea = Mt(String.prototype.replace), V_ = Mt(String.prototype.indexOf), B_ = Mt(String.prototype.trim), ir = Mt(Object.prototype.hasOwnProperty), Pt = Mt(RegExp.prototype.test), ta = U_(TypeError);
function Mt(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
      n[a - 1] = arguments[a];
    return kl(e, t, n);
  };
}
function U_(e) {
  return function() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    return Ml(e, r);
  };
}
function Ne(e, t) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Po;
  Jd && Jd(e, null);
  let n = t.length;
  for (; n--; ) {
    let a = t[n];
    if (typeof a == "string") {
      const o = r(a);
      o !== a && (F_(t) || (t[n] = o), a = o);
    }
    e[a] = !0;
  }
  return e;
}
function W_(e) {
  for (let t = 0; t < e.length; t++)
    ir(e, t) || (e[t] = null);
  return e;
}
function Tr(e) {
  const t = Ol(null);
  for (const [r, n] of kg(e))
    ir(e, r) && (Array.isArray(n) ? t[r] = W_(n) : n && typeof n == "object" && n.constructor === Object ? t[r] = Tr(n) : t[r] = n);
  return t;
}
function ra(e, t) {
  for (; e !== null; ) {
    const n = j_(e, t);
    if (n) {
      if (n.get)
        return Mt(n.get);
      if (typeof n.value == "function")
        return Mt(n.value);
    }
    e = L_(e);
  }
  function r() {
    return null;
  }
  return r;
}
const tf = kt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Ss = kt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Es = kt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), q_ = kt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), xs = kt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), G_ = kt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), rf = kt(["#text"]), nf = kt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Cs = kt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), af = kt(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), go = kt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), K_ = rr(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Y_ = rr(/<%[\w\W]*|[\w\W]*%>/gm), X_ = rr(/\$\{[\w\W]*/gm), Z_ = rr(/^data-[\-\w.\u00B7-\uFFFF]+$/), Q_ = rr(/^aria-[\-\w]+$/), Mg = rr(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), J_ = rr(/^(?:\w+script|data):/i), ew = rr(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Ng = rr(/^html$/i), tw = rr(/^[a-z][.\w]*(-[.\w]+)+$/i);
var of = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Q_,
  ATTR_WHITESPACE: ew,
  CUSTOM_ELEMENT: tw,
  DATA_ATTR: Z_,
  DOCTYPE_NAME: Ng,
  ERB_EXPR: Y_,
  IS_ALLOWED_URI: Mg,
  IS_SCRIPT_OR_DATA: J_,
  MUSTACHE_EXPR: K_,
  TMPLIT_EXPR: X_
});
const na = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, rw = function() {
  return typeof window > "u" ? null : window;
}, nw = function(t, r) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let n = null;
  const a = "data-tt-policy-suffix";
  r && r.hasAttribute(a) && (n = r.getAttribute(a));
  const o = "dompurify" + (n ? "#" + n : "");
  try {
    return t.createPolicy(o, {
      createHTML(i) {
        return i;
      },
      createScriptURL(i) {
        return i;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + o + " could not be created."), null;
  }
}, sf = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function Ig() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : rw();
  const t = (oe) => Ig(oe);
  if (t.version = "3.3.0", t.removed = [], !e || !e.document || e.document.nodeType !== na.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: r
  } = e;
  const n = r, a = n.currentScript, {
    DocumentFragment: o,
    HTMLTemplateElement: i,
    Node: s,
    Element: l,
    NodeFilter: c,
    NamedNodeMap: u = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: f,
    trustedTypes: v
  } = e, g = l.prototype, h = ra(g, "cloneNode"), p = ra(g, "remove"), y = ra(g, "nextSibling"), m = ra(g, "childNodes"), S = ra(g, "parentNode");
  if (typeof i == "function") {
    const oe = r.createElement("template");
    oe.content && oe.content.ownerDocument && (r = oe.content.ownerDocument);
  }
  let E, x = "";
  const {
    implementation: w,
    createNodeIterator: b,
    createDocumentFragment: P,
    getElementsByTagName: k
  } = r, {
    importNode: M
  } = n;
  let I = sf();
  t.isSupported = typeof kg == "function" && typeof S == "function" && w && w.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: D,
    ERB_EXPR: F,
    TMPLIT_EXPR: B,
    DATA_ATTR: L,
    ARIA_ATTR: A,
    IS_SCRIPT_OR_DATA: O,
    ATTR_WHITESPACE: R,
    CUSTOM_ELEMENT: H
  } = of;
  let {
    IS_ALLOWED_URI: z
  } = of, j = null;
  const W = Ne({}, [...tf, ...Ss, ...Es, ...xs, ...rf]);
  let K = null;
  const Z = Ne({}, [...nf, ...Cs, ...af, ...go]);
  let Y = Object.seal(Ol(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), Q = null, le = null;
  const de = Object.seal(Ol(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let fe = !0, ge = !0, Se = !1, $e = !0, Me = !1, ee = !0, Ae = !1, ie = !1, ye = !1, Ve = !1, we = !1, We = !1, Le = !0, je = !1;
  const Ce = "user-content-";
  let ve = !0, Oe = !1, U = {}, te = null;
  const J = Ne({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let re = null;
  const ae = Ne({}, ["audio", "video", "img", "source", "image", "track"]);
  let He = null;
  const _e = Ne({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Ee = "http://www.w3.org/1998/Math/MathML", ce = "http://www.w3.org/2000/svg", qe = "http://www.w3.org/1999/xhtml";
  let ct = qe, vt = !1, It = null;
  const _r = Ne({}, [Ee, ce, qe], ys);
  let ut = Ne({}, ["mi", "mo", "mn", "ms", "mtext"]), Lt = Ne({}, ["annotation-xml"]);
  const Dr = Ne({}, ["title", "style", "font", "a", "script"]);
  let br = null;
  const bn = ["application/xhtml+xml", "text/html"], wr = "text/html";
  let rt = null, Dt = null;
  const Fr = r.createElement("form"), nr = function($) {
    return $ instanceof RegExp || $ instanceof Function;
  }, Xt = function() {
    let $ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Dt && Dt === $)) {
      if ((!$ || typeof $ != "object") && ($ = {}), $ = Tr($), br = // eslint-disable-next-line unicorn/prefer-includes
      bn.indexOf($.PARSER_MEDIA_TYPE) === -1 ? wr : $.PARSER_MEDIA_TYPE, rt = br === "application/xhtml+xml" ? ys : Po, j = ir($, "ALLOWED_TAGS") ? Ne({}, $.ALLOWED_TAGS, rt) : W, K = ir($, "ALLOWED_ATTR") ? Ne({}, $.ALLOWED_ATTR, rt) : Z, It = ir($, "ALLOWED_NAMESPACES") ? Ne({}, $.ALLOWED_NAMESPACES, ys) : _r, He = ir($, "ADD_URI_SAFE_ATTR") ? Ne(Tr(_e), $.ADD_URI_SAFE_ATTR, rt) : _e, re = ir($, "ADD_DATA_URI_TAGS") ? Ne(Tr(ae), $.ADD_DATA_URI_TAGS, rt) : ae, te = ir($, "FORBID_CONTENTS") ? Ne({}, $.FORBID_CONTENTS, rt) : J, Q = ir($, "FORBID_TAGS") ? Ne({}, $.FORBID_TAGS, rt) : Tr({}), le = ir($, "FORBID_ATTR") ? Ne({}, $.FORBID_ATTR, rt) : Tr({}), U = ir($, "USE_PROFILES") ? $.USE_PROFILES : !1, fe = $.ALLOW_ARIA_ATTR !== !1, ge = $.ALLOW_DATA_ATTR !== !1, Se = $.ALLOW_UNKNOWN_PROTOCOLS || !1, $e = $.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Me = $.SAFE_FOR_TEMPLATES || !1, ee = $.SAFE_FOR_XML !== !1, Ae = $.WHOLE_DOCUMENT || !1, Ve = $.RETURN_DOM || !1, we = $.RETURN_DOM_FRAGMENT || !1, We = $.RETURN_TRUSTED_TYPE || !1, ye = $.FORCE_BODY || !1, Le = $.SANITIZE_DOM !== !1, je = $.SANITIZE_NAMED_PROPS || !1, ve = $.KEEP_CONTENT !== !1, Oe = $.IN_PLACE || !1, z = $.ALLOWED_URI_REGEXP || Mg, ct = $.NAMESPACE || qe, ut = $.MATHML_TEXT_INTEGRATION_POINTS || ut, Lt = $.HTML_INTEGRATION_POINTS || Lt, Y = $.CUSTOM_ELEMENT_HANDLING || {}, $.CUSTOM_ELEMENT_HANDLING && nr($.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (Y.tagNameCheck = $.CUSTOM_ELEMENT_HANDLING.tagNameCheck), $.CUSTOM_ELEMENT_HANDLING && nr($.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (Y.attributeNameCheck = $.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), $.CUSTOM_ELEMENT_HANDLING && typeof $.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (Y.allowCustomizedBuiltInElements = $.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Me && (ge = !1), we && (Ve = !0), U && (j = Ne({}, rf), K = [], U.html === !0 && (Ne(j, tf), Ne(K, nf)), U.svg === !0 && (Ne(j, Ss), Ne(K, Cs), Ne(K, go)), U.svgFilters === !0 && (Ne(j, Es), Ne(K, Cs), Ne(K, go)), U.mathMl === !0 && (Ne(j, xs), Ne(K, af), Ne(K, go))), $.ADD_TAGS && (typeof $.ADD_TAGS == "function" ? de.tagCheck = $.ADD_TAGS : (j === W && (j = Tr(j)), Ne(j, $.ADD_TAGS, rt))), $.ADD_ATTR && (typeof $.ADD_ATTR == "function" ? de.attributeCheck = $.ADD_ATTR : (K === Z && (K = Tr(K)), Ne(K, $.ADD_ATTR, rt))), $.ADD_URI_SAFE_ATTR && Ne(He, $.ADD_URI_SAFE_ATTR, rt), $.FORBID_CONTENTS && (te === J && (te = Tr(te)), Ne(te, $.FORBID_CONTENTS, rt)), ve && (j["#text"] = !0), Ae && Ne(j, ["html", "head", "body"]), j.table && (Ne(j, ["tbody"]), delete Q.tbody), $.TRUSTED_TYPES_POLICY) {
        if (typeof $.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw ta('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof $.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw ta('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        E = $.TRUSTED_TYPES_POLICY, x = E.createHTML("");
      } else
        E === void 0 && (E = nw(v, a)), E !== null && typeof x == "string" && (x = E.createHTML(""));
      kt && kt($), Dt = $;
    }
  }, Lr = Ne({}, [...Ss, ...Es, ...q_]), en = Ne({}, [...xs, ...G_]), dt = function($) {
    let q = S($);
    (!q || !q.tagName) && (q = {
      namespaceURI: ct,
      tagName: "template"
    });
    const ue = Po($.tagName), Ge = Po(q.tagName);
    return It[$.namespaceURI] ? $.namespaceURI === ce ? q.namespaceURI === qe ? ue === "svg" : q.namespaceURI === Ee ? ue === "svg" && (Ge === "annotation-xml" || ut[Ge]) : !!Lr[ue] : $.namespaceURI === Ee ? q.namespaceURI === qe ? ue === "math" : q.namespaceURI === ce ? ue === "math" && Lt[Ge] : !!en[ue] : $.namespaceURI === qe ? q.namespaceURI === ce && !Lt[Ge] || q.namespaceURI === Ee && !ut[Ge] ? !1 : !en[ue] && (Dr[ue] || !Lr[ue]) : !!(br === "application/xhtml+xml" && It[$.namespaceURI]) : !1;
  }, At = function($) {
    Jn(t.removed, {
      element: $
    });
    try {
      S($).removeChild($);
    } catch {
      p($);
    }
  }, ar = function($, q) {
    try {
      Jn(t.removed, {
        attribute: q.getAttributeNode($),
        from: q
      });
    } catch {
      Jn(t.removed, {
        attribute: null,
        from: q
      });
    }
    if (q.removeAttribute($), $ === "is")
      if (Ve || we)
        try {
          At(q);
        } catch {
        }
      else
        try {
          q.setAttribute($, "");
        } catch {
        }
  }, nt = function($) {
    let q = null, ue = null;
    if (ye)
      $ = "<remove></remove>" + $;
    else {
      const ot = bs($, /^[\r\n\t ]+/);
      ue = ot && ot[0];
    }
    br === "application/xhtml+xml" && ct === qe && ($ = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + $ + "</body></html>");
    const Ge = E ? E.createHTML($) : $;
    if (ct === qe)
      try {
        q = new f().parseFromString(Ge, br);
      } catch {
      }
    if (!q || !q.documentElement) {
      q = w.createDocument(ct, "template", null);
      try {
        q.documentElement.innerHTML = vt ? x : Ge;
      } catch {
      }
    }
    const Ye = q.body || q.documentElement;
    return $ && ue && Ye.insertBefore(r.createTextNode(ue), Ye.childNodes[0] || null), ct === qe ? k.call(q, Ae ? "html" : "body")[0] : Ae ? q.documentElement : Ye;
  }, _ = function($) {
    return b.call(
      $.ownerDocument || $,
      $,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, G = function($) {
    return $ instanceof d && (typeof $.nodeName != "string" || typeof $.textContent != "string" || typeof $.removeChild != "function" || !($.attributes instanceof u) || typeof $.removeAttribute != "function" || typeof $.setAttribute != "function" || typeof $.namespaceURI != "string" || typeof $.insertBefore != "function" || typeof $.hasChildNodes != "function");
  }, ne = function($) {
    return typeof s == "function" && $ instanceof s;
  };
  function pe(oe, $, q) {
    ho(oe, (ue) => {
      ue.call(t, $, q, Dt);
    });
  }
  const ze = function($) {
    let q = null;
    if (pe(I.beforeSanitizeElements, $, null), G($))
      return At($), !0;
    const ue = rt($.nodeName);
    if (pe(I.uponSanitizeElement, $, {
      tagName: ue,
      allowedTags: j
    }), ee && $.hasChildNodes() && !ne($.firstElementChild) && Pt(/<[/\w!]/g, $.innerHTML) && Pt(/<[/\w!]/g, $.textContent) || $.nodeType === na.progressingInstruction || ee && $.nodeType === na.comment && Pt(/<[/\w]/g, $.data))
      return At($), !0;
    if (!(de.tagCheck instanceof Function && de.tagCheck(ue)) && (!j[ue] || Q[ue])) {
      if (!Q[ue] && Pe(ue) && (Y.tagNameCheck instanceof RegExp && Pt(Y.tagNameCheck, ue) || Y.tagNameCheck instanceof Function && Y.tagNameCheck(ue)))
        return !1;
      if (ve && !te[ue]) {
        const Ge = S($) || $.parentNode, Ye = m($) || $.childNodes;
        if (Ye && Ge) {
          const ot = Ye.length;
          for (let Rt = ot - 1; Rt >= 0; --Rt) {
            const or = h(Ye[Rt], !0);
            or.__removalCount = ($.__removalCount || 0) + 1, Ge.insertBefore(or, y($));
          }
        }
      }
      return At($), !0;
    }
    return $ instanceof l && !dt($) || (ue === "noscript" || ue === "noembed" || ue === "noframes") && Pt(/<\/no(script|embed|frames)/i, $.innerHTML) ? (At($), !0) : (Me && $.nodeType === na.text && (q = $.textContent, ho([D, F, B], (Ge) => {
      q = ea(q, Ge, " ");
    }), $.textContent !== q && (Jn(t.removed, {
      element: $.cloneNode()
    }), $.textContent = q)), pe(I.afterSanitizeElements, $, null), !1);
  }, Be = function($, q, ue) {
    if (Le && (q === "id" || q === "name") && (ue in r || ue in Fr))
      return !1;
    if (!(ge && !le[q] && Pt(L, q))) {
      if (!(fe && Pt(A, q))) {
        if (!(de.attributeCheck instanceof Function && de.attributeCheck(q, $))) {
          if (!K[q] || le[q]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Pe($) && (Y.tagNameCheck instanceof RegExp && Pt(Y.tagNameCheck, $) || Y.tagNameCheck instanceof Function && Y.tagNameCheck($)) && (Y.attributeNameCheck instanceof RegExp && Pt(Y.attributeNameCheck, q) || Y.attributeNameCheck instanceof Function && Y.attributeNameCheck(q, $)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              q === "is" && Y.allowCustomizedBuiltInElements && (Y.tagNameCheck instanceof RegExp && Pt(Y.tagNameCheck, ue) || Y.tagNameCheck instanceof Function && Y.tagNameCheck(ue)))
            ) return !1;
          } else if (!He[q]) {
            if (!Pt(z, ea(ue, R, ""))) {
              if (!((q === "src" || q === "xlink:href" || q === "href") && $ !== "script" && V_(ue, "data:") === 0 && re[$])) {
                if (!(Se && !Pt(O, ea(ue, R, "")))) {
                  if (ue)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Pe = function($) {
    return $ !== "annotation-xml" && bs($, H);
  }, Te = function($) {
    pe(I.beforeSanitizeAttributes, $, null);
    const {
      attributes: q
    } = $;
    if (!q || G($))
      return;
    const ue = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: K,
      forceKeepAttr: void 0
    };
    let Ge = q.length;
    for (; Ge--; ) {
      const Ye = q[Ge], {
        name: ot,
        namespaceURI: Rt,
        value: or
      } = Ye, Sn = rt(ot), Zi = or;
      let $t = ot === "value" ? Zi : B_(Zi);
      if (ue.attrName = Sn, ue.attrValue = $t, ue.keepAttr = !0, ue.forceKeepAttr = void 0, pe(I.uponSanitizeAttribute, $, ue), $t = ue.attrValue, je && (Sn === "id" || Sn === "name") && (ar(ot, $), $t = Ce + $t), ee && Pt(/((--!?|])>)|<\/(style|title|textarea)/i, $t)) {
        ar(ot, $);
        continue;
      }
      if (Sn === "attributename" && bs($t, "href")) {
        ar(ot, $);
        continue;
      }
      if (ue.forceKeepAttr)
        continue;
      if (!ue.keepAttr) {
        ar(ot, $);
        continue;
      }
      if (!$e && Pt(/\/>/i, $t)) {
        ar(ot, $);
        continue;
      }
      Me && ho([D, F, B], (xu) => {
        $t = ea($t, xu, " ");
      });
      const Eu = rt($.nodeName);
      if (!Be(Eu, Sn, $t)) {
        ar(ot, $);
        continue;
      }
      if (E && typeof v == "object" && typeof v.getAttributeType == "function" && !Rt)
        switch (v.getAttributeType(Eu, Sn)) {
          case "TrustedHTML": {
            $t = E.createHTML($t);
            break;
          }
          case "TrustedScriptURL": {
            $t = E.createScriptURL($t);
            break;
          }
        }
      if ($t !== Zi)
        try {
          Rt ? $.setAttributeNS(Rt, ot, $t) : $.setAttribute(ot, $t), G($) ? At($) : ef(t.removed);
        } catch {
          ar(ot, $);
        }
    }
    pe(I.afterSanitizeAttributes, $, null);
  }, yt = function oe($) {
    let q = null;
    const ue = _($);
    for (pe(I.beforeSanitizeShadowDOM, $, null); q = ue.nextNode(); )
      pe(I.uponSanitizeShadowNode, q, null), ze(q), Te(q), q.content instanceof o && oe(q.content);
    pe(I.afterSanitizeShadowDOM, $, null);
  };
  return t.sanitize = function(oe) {
    let $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, q = null, ue = null, Ge = null, Ye = null;
    if (vt = !oe, vt && (oe = "<!-->"), typeof oe != "string" && !ne(oe))
      if (typeof oe.toString == "function") {
        if (oe = oe.toString(), typeof oe != "string")
          throw ta("dirty is not a string, aborting");
      } else
        throw ta("toString is not a function");
    if (!t.isSupported)
      return oe;
    if (ie || Xt($), t.removed = [], typeof oe == "string" && (Oe = !1), Oe) {
      if (oe.nodeName) {
        const or = rt(oe.nodeName);
        if (!j[or] || Q[or])
          throw ta("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (oe instanceof s)
      q = nt("<!---->"), ue = q.ownerDocument.importNode(oe, !0), ue.nodeType === na.element && ue.nodeName === "BODY" || ue.nodeName === "HTML" ? q = ue : q.appendChild(ue);
    else {
      if (!Ve && !Me && !Ae && // eslint-disable-next-line unicorn/prefer-includes
      oe.indexOf("<") === -1)
        return E && We ? E.createHTML(oe) : oe;
      if (q = nt(oe), !q)
        return Ve ? null : We ? x : "";
    }
    q && ye && At(q.firstChild);
    const ot = _(Oe ? oe : q);
    for (; Ge = ot.nextNode(); )
      ze(Ge), Te(Ge), Ge.content instanceof o && yt(Ge.content);
    if (Oe)
      return oe;
    if (Ve) {
      if (we)
        for (Ye = P.call(q.ownerDocument); q.firstChild; )
          Ye.appendChild(q.firstChild);
      else
        Ye = q;
      return (K.shadowroot || K.shadowrootmode) && (Ye = M.call(n, Ye, !0)), Ye;
    }
    let Rt = Ae ? q.outerHTML : q.innerHTML;
    return Ae && j["!doctype"] && q.ownerDocument && q.ownerDocument.doctype && q.ownerDocument.doctype.name && Pt(Ng, q.ownerDocument.doctype.name) && (Rt = "<!DOCTYPE " + q.ownerDocument.doctype.name + `>
` + Rt), Me && ho([D, F, B], (or) => {
      Rt = ea(Rt, or, " ");
    }), E && We ? E.createHTML(Rt) : Rt;
  }, t.setConfig = function() {
    let oe = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Xt(oe), ie = !0;
  }, t.clearConfig = function() {
    Dt = null, ie = !1;
  }, t.isValidAttribute = function(oe, $, q) {
    Dt || Xt({});
    const ue = rt(oe), Ge = rt($);
    return Be(ue, Ge, q);
  }, t.addHook = function(oe, $) {
    typeof $ == "function" && Jn(I[oe], $);
  }, t.removeHook = function(oe, $) {
    if ($ !== void 0) {
      const q = z_(I[oe], $);
      return q === -1 ? void 0 : H_(I[oe], q, 1)[0];
    }
    return ef(I[oe]);
  }, t.removeHooks = function(oe) {
    I[oe] = [];
  }, t.removeAllHooks = function() {
    I = sf();
  }, t;
}
var aw = Ig(), Jc = {}, eu = {}, tu = {}, vn = {}, ru = {}, nu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.Doctype = e.CDATA = e.Tag = e.Style = e.Script = e.Comment = e.Directive = e.Text = e.Root = e.isTag = e.ElementType = void 0;
  var t;
  (function(n) {
    n.Root = "root", n.Text = "text", n.Directive = "directive", n.Comment = "comment", n.Script = "script", n.Style = "style", n.Tag = "tag", n.CDATA = "cdata", n.Doctype = "doctype";
  })(t = e.ElementType || (e.ElementType = {}));
  function r(n) {
    return n.type === t.Tag || n.type === t.Script || n.type === t.Style;
  }
  e.isTag = r, e.Root = t.Root, e.Text = t.Text, e.Directive = t.Directive, e.Comment = t.Comment, e.Script = t.Script, e.Style = t.Style, e.Tag = t.Tag, e.CDATA = t.CDATA, e.Doctype = t.Doctype;
})(nu);
var Ie = {}, Qr = mt && mt.__extends || /* @__PURE__ */ function() {
  var e = function(t, r) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (n[o] = a[o]);
    }, e(t, r);
  };
  return function(t, r) {
    if (typeof r != "function" && r !== null)
      throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
    e(t, r);
    function n() {
      this.constructor = t;
    }
    t.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n());
  };
}(), ga = mt && mt.__assign || function() {
  return ga = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
  }, ga.apply(this, arguments);
};
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.cloneNode = Ie.hasChildren = Ie.isDocument = Ie.isDirective = Ie.isComment = Ie.isText = Ie.isCDATA = Ie.isTag = Ie.Element = Ie.Document = Ie.CDATA = Ie.NodeWithChildren = Ie.ProcessingInstruction = Ie.Comment = Ie.Text = Ie.DataNode = Ie.Node = void 0;
var Ft = nu, au = (
  /** @class */
  function() {
    function e() {
      this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
    }
    return Object.defineProperty(e.prototype, "parentNode", {
      // Read-write aliases for properties
      /**
       * Same as {@link parent}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.parent;
      },
      set: function(t) {
        this.parent = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "previousSibling", {
      /**
       * Same as {@link prev}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.prev;
      },
      set: function(t) {
        this.prev = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "nextSibling", {
      /**
       * Same as {@link next}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.next;
      },
      set: function(t) {
        this.next = t;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.cloneNode = function(t) {
      return t === void 0 && (t = !1), ou(this, t);
    }, e;
  }()
);
Ie.Node = au;
var zi = (
  /** @class */
  function(e) {
    Qr(t, e);
    function t(r) {
      var n = e.call(this) || this;
      return n.data = r, n;
    }
    return Object.defineProperty(t.prototype, "nodeValue", {
      /**
       * Same as {@link data}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.data;
      },
      set: function(r) {
        this.data = r;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(au)
);
Ie.DataNode = zi;
var Dg = (
  /** @class */
  function(e) {
    Qr(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = Ft.ElementType.Text, r;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 3;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(zi)
);
Ie.Text = Dg;
var Fg = (
  /** @class */
  function(e) {
    Qr(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = Ft.ElementType.Comment, r;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 8;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(zi)
);
Ie.Comment = Fg;
var Lg = (
  /** @class */
  function(e) {
    Qr(t, e);
    function t(r, n) {
      var a = e.call(this, n) || this;
      return a.name = r, a.type = Ft.ElementType.Directive, a;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(zi)
);
Ie.ProcessingInstruction = Lg;
var Hi = (
  /** @class */
  function(e) {
    Qr(t, e);
    function t(r) {
      var n = e.call(this) || this;
      return n.children = r, n;
    }
    return Object.defineProperty(t.prototype, "firstChild", {
      // Aliases
      /** First child of the node. */
      get: function() {
        var r;
        return (r = this.children[0]) !== null && r !== void 0 ? r : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "lastChild", {
      /** Last child of the node. */
      get: function() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "childNodes", {
      /**
       * Same as {@link children}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.children;
      },
      set: function(r) {
        this.children = r;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(au)
);
Ie.NodeWithChildren = Hi;
var jg = (
  /** @class */
  function(e) {
    Qr(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = Ft.ElementType.CDATA, r;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 4;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(Hi)
);
Ie.CDATA = jg;
var zg = (
  /** @class */
  function(e) {
    Qr(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.type = Ft.ElementType.Root, r;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 9;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(Hi)
);
Ie.Document = zg;
var Hg = (
  /** @class */
  function(e) {
    Qr(t, e);
    function t(r, n, a, o) {
      a === void 0 && (a = []), o === void 0 && (o = r === "script" ? Ft.ElementType.Script : r === "style" ? Ft.ElementType.Style : Ft.ElementType.Tag);
      var i = e.call(this, a) || this;
      return i.name = r, i.attribs = n, i.type = o, i;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "tagName", {
      // DOM Level 1 aliases
      /**
       * Same as {@link name}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.name;
      },
      set: function(r) {
        this.name = r;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "attributes", {
      get: function() {
        var r = this;
        return Object.keys(this.attribs).map(function(n) {
          var a, o;
          return {
            name: n,
            value: r.attribs[n],
            namespace: (a = r["x-attribsNamespace"]) === null || a === void 0 ? void 0 : a[n],
            prefix: (o = r["x-attribsPrefix"]) === null || o === void 0 ? void 0 : o[n]
          };
        });
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(Hi)
);
Ie.Element = Hg;
function Vg(e) {
  return (0, Ft.isTag)(e);
}
Ie.isTag = Vg;
function Bg(e) {
  return e.type === Ft.ElementType.CDATA;
}
Ie.isCDATA = Bg;
function Ug(e) {
  return e.type === Ft.ElementType.Text;
}
Ie.isText = Ug;
function Wg(e) {
  return e.type === Ft.ElementType.Comment;
}
Ie.isComment = Wg;
function qg(e) {
  return e.type === Ft.ElementType.Directive;
}
Ie.isDirective = qg;
function Gg(e) {
  return e.type === Ft.ElementType.Root;
}
Ie.isDocument = Gg;
function ow(e) {
  return Object.prototype.hasOwnProperty.call(e, "children");
}
Ie.hasChildren = ow;
function ou(e, t) {
  t === void 0 && (t = !1);
  var r;
  if (Ug(e))
    r = new Dg(e.data);
  else if (Wg(e))
    r = new Fg(e.data);
  else if (Vg(e)) {
    var n = t ? _s(e.children) : [], a = new Hg(e.name, ga({}, e.attribs), n);
    n.forEach(function(l) {
      return l.parent = a;
    }), e.namespace != null && (a.namespace = e.namespace), e["x-attribsNamespace"] && (a["x-attribsNamespace"] = ga({}, e["x-attribsNamespace"])), e["x-attribsPrefix"] && (a["x-attribsPrefix"] = ga({}, e["x-attribsPrefix"])), r = a;
  } else if (Bg(e)) {
    var n = t ? _s(e.children) : [], o = new jg(n);
    n.forEach(function(c) {
      return c.parent = o;
    }), r = o;
  } else if (Gg(e)) {
    var n = t ? _s(e.children) : [], i = new zg(n);
    n.forEach(function(c) {
      return c.parent = i;
    }), e["x-mode"] && (i["x-mode"] = e["x-mode"]), r = i;
  } else if (qg(e)) {
    var s = new Lg(e.name, e.data);
    e["x-name"] != null && (s["x-name"] = e["x-name"], s["x-publicId"] = e["x-publicId"], s["x-systemId"] = e["x-systemId"]), r = s;
  } else
    throw new Error("Not implemented yet: ".concat(e.type));
  return r.startIndex = e.startIndex, r.endIndex = e.endIndex, e.sourceCodeLocation != null && (r.sourceCodeLocation = e.sourceCodeLocation), r;
}
Ie.cloneNode = ou;
function _s(e) {
  for (var t = e.map(function(n) {
    return ou(n, !0);
  }), r = 1; r < t.length; r++)
    t[r].prev = t[r - 1], t[r - 1].next = t[r];
  return t;
}
(function(e) {
  var t = mt && mt.__createBinding || (Object.create ? function(s, l, c, u) {
    u === void 0 && (u = c);
    var d = Object.getOwnPropertyDescriptor(l, c);
    (!d || ("get" in d ? !l.__esModule : d.writable || d.configurable)) && (d = { enumerable: !0, get: function() {
      return l[c];
    } }), Object.defineProperty(s, u, d);
  } : function(s, l, c, u) {
    u === void 0 && (u = c), s[u] = l[c];
  }), r = mt && mt.__exportStar || function(s, l) {
    for (var c in s) c !== "default" && !Object.prototype.hasOwnProperty.call(l, c) && t(l, s, c);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DomHandler = void 0;
  var n = nu, a = Ie;
  r(Ie, e);
  var o = {
    withStartIndices: !1,
    withEndIndices: !1,
    xmlMode: !1
  }, i = (
    /** @class */
    function() {
      function s(l, c, u) {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof c == "function" && (u = c, c = o), typeof l == "object" && (c = l, l = void 0), this.callback = l ?? null, this.options = c ?? o, this.elementCB = u ?? null;
      }
      return s.prototype.onparserinit = function(l) {
        this.parser = l;
      }, s.prototype.onreset = function() {
        this.dom = [], this.root = new a.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
      }, s.prototype.onend = function() {
        this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
      }, s.prototype.onerror = function(l) {
        this.handleCallback(l);
      }, s.prototype.onclosetag = function() {
        this.lastNode = null;
        var l = this.tagStack.pop();
        this.options.withEndIndices && (l.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(l);
      }, s.prototype.onopentag = function(l, c) {
        var u = this.options.xmlMode ? n.ElementType.Tag : void 0, d = new a.Element(l, c, void 0, u);
        this.addNode(d), this.tagStack.push(d);
      }, s.prototype.ontext = function(l) {
        var c = this.lastNode;
        if (c && c.type === n.ElementType.Text)
          c.data += l, this.options.withEndIndices && (c.endIndex = this.parser.endIndex);
        else {
          var u = new a.Text(l);
          this.addNode(u), this.lastNode = u;
        }
      }, s.prototype.oncomment = function(l) {
        if (this.lastNode && this.lastNode.type === n.ElementType.Comment) {
          this.lastNode.data += l;
          return;
        }
        var c = new a.Comment(l);
        this.addNode(c), this.lastNode = c;
      }, s.prototype.oncommentend = function() {
        this.lastNode = null;
      }, s.prototype.oncdatastart = function() {
        var l = new a.Text(""), c = new a.CDATA([l]);
        this.addNode(c), l.parent = c, this.lastNode = l;
      }, s.prototype.oncdataend = function() {
        this.lastNode = null;
      }, s.prototype.onprocessinginstruction = function(l, c) {
        var u = new a.ProcessingInstruction(l, c);
        this.addNode(u);
      }, s.prototype.handleCallback = function(l) {
        if (typeof this.callback == "function")
          this.callback(l, this.dom);
        else if (l)
          throw l;
      }, s.prototype.addNode = function(l) {
        var c = this.tagStack[this.tagStack.length - 1], u = c.children[c.children.length - 1];
        this.options.withStartIndices && (l.startIndex = this.parser.startIndex), this.options.withEndIndices && (l.endIndex = this.parser.endIndex), c.children.push(l), u && (l.prev = u, u.next = l), l.parent = c, this.lastNode = null;
      }, s;
    }()
  );
  e.DomHandler = i, e.default = i;
})(ru);
var Kg = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CARRIAGE_RETURN_PLACEHOLDER_REGEX = e.CARRIAGE_RETURN_PLACEHOLDER = e.CARRIAGE_RETURN_REGEX = e.CARRIAGE_RETURN = e.CASE_SENSITIVE_TAG_NAMES_MAP = e.CASE_SENSITIVE_TAG_NAMES = void 0, e.CASE_SENSITIVE_TAG_NAMES = [
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "linearGradient",
    "radialGradient",
    "textPath"
  ], e.CASE_SENSITIVE_TAG_NAMES_MAP = e.CASE_SENSITIVE_TAG_NAMES.reduce(function(t, r) {
    return t[r.toLowerCase()] = r, t;
  }, {}), e.CARRIAGE_RETURN = "\r", e.CARRIAGE_RETURN_REGEX = new RegExp(e.CARRIAGE_RETURN, "g"), e.CARRIAGE_RETURN_PLACEHOLDER = "__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_".concat(Date.now(), "__"), e.CARRIAGE_RETURN_PLACEHOLDER_REGEX = new RegExp(e.CARRIAGE_RETURN_PLACEHOLDER, "g");
})(Kg);
Object.defineProperty(vn, "__esModule", { value: !0 });
vn.formatAttributes = Yg;
vn.escapeSpecialCharacters = lw;
vn.revertEscapedCharacters = Xg;
vn.formatDOM = Zg;
var mo = ru, Ra = Kg;
function iw(e) {
  return Ra.CASE_SENSITIVE_TAG_NAMES_MAP[e];
}
function Yg(e) {
  for (var t = {}, r = 0, n = e.length; r < n; r++) {
    var a = e[r];
    t[a.name] = a.value;
  }
  return t;
}
function sw(e) {
  e = e.toLowerCase();
  var t = iw(e);
  return t || e;
}
function lw(e) {
  return e.replace(Ra.CARRIAGE_RETURN_REGEX, Ra.CARRIAGE_RETURN_PLACEHOLDER);
}
function Xg(e) {
  return e.replace(Ra.CARRIAGE_RETURN_PLACEHOLDER_REGEX, Ra.CARRIAGE_RETURN);
}
function Zg(e, t, r) {
  t === void 0 && (t = null);
  for (var n = [], a, o = 0, i = e.length; o < i; o++) {
    var s = e[o];
    switch (s.nodeType) {
      case 1: {
        var l = sw(s.nodeName);
        a = new mo.Element(l, Yg(s.attributes)), a.children = Zg(
          // template children are on content
          l === "template" ? s.content.childNodes : s.childNodes,
          a
        );
        break;
      }
      case 3:
        a = new mo.Text(Xg(s.nodeValue));
        break;
      case 8:
        a = new mo.Comment(s.nodeValue);
        break;
      default:
        continue;
    }
    var c = n[o - 1] || null;
    c && (c.next = a), a.parent = t, a.prev = c, a.next = null, n.push(a);
  }
  return r && (a = new mo.ProcessingInstruction(r.substring(0, r.indexOf(" ")).toLowerCase(), r), a.next = n[0] || null, a.parent = t, n.unshift(a), n[1] && (n[1].prev = n[0])), n;
}
Object.defineProperty(tu, "__esModule", { value: !0 });
tu.default = pw;
var cw = vn, lf = "html", cf = "head", vo = "body", uw = /<([a-zA-Z]+[0-9]?)/, uf = /<head[^]*>/i, df = /<body[^]*>/i, jo = function(e, t) {
  throw new Error("This browser does not support `document.implementation.createHTMLDocument`");
}, Nl = function(e, t) {
  throw new Error("This browser does not support `DOMParser.prototype.parseFromString`");
}, ff = typeof window == "object" && window.DOMParser;
if (typeof ff == "function") {
  var dw = new ff(), fw = "text/html";
  Nl = function(e, t) {
    return t && (e = "<".concat(t, ">").concat(e, "</").concat(t, ">")), dw.parseFromString(e, fw);
  }, jo = Nl;
}
if (typeof document == "object" && document.implementation) {
  var yo = document.implementation.createHTMLDocument();
  jo = function(e, t) {
    if (t) {
      var r = yo.documentElement.querySelector(t);
      return r && (r.innerHTML = e), yo;
    }
    return yo.documentElement.innerHTML = e, yo;
  };
}
var bo = typeof document == "object" && document.createElement("template"), Il;
bo && bo.content && (Il = function(e) {
  return bo.innerHTML = e, bo.content.childNodes;
});
function pw(e) {
  var t, r;
  e = (0, cw.escapeSpecialCharacters)(e);
  var n = e.match(uw), a = n && n[1] ? n[1].toLowerCase() : "";
  switch (a) {
    case lf: {
      var o = Nl(e);
      if (!uf.test(e)) {
        var i = o.querySelector(cf);
        (t = i == null ? void 0 : i.parentNode) === null || t === void 0 || t.removeChild(i);
      }
      if (!df.test(e)) {
        var i = o.querySelector(vo);
        (r = i == null ? void 0 : i.parentNode) === null || r === void 0 || r.removeChild(i);
      }
      return o.querySelectorAll(lf);
    }
    case cf:
    case vo: {
      var s = jo(e).querySelectorAll(a);
      return df.test(e) && uf.test(e) ? s[0].parentNode.childNodes : s;
    }
    default: {
      if (Il)
        return Il(e);
      var i = jo(e, vo).querySelector(vo);
      return i.childNodes;
    }
  }
}
var hw = mt && mt.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(eu, "__esModule", { value: !0 });
eu.default = yw;
var gw = hw(tu), mw = vn, vw = /<(![a-zA-Z\s]+)>/;
function yw(e) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e)
    return [];
  var t = e.match(vw), r = t ? t[1] : void 0;
  return (0, mw.formatDOM)((0, gw.default)(e), null, r);
}
var Vi = {}, yr = {}, Bi = {}, bw = 0;
Bi.SAME = bw;
var Sw = 1;
Bi.CAMELCASE = Sw;
Bi.possibleStandardNames = {
  accept: 0,
  acceptCharset: 1,
  "accept-charset": "acceptCharset",
  accessKey: 1,
  action: 0,
  allowFullScreen: 1,
  alt: 0,
  as: 0,
  async: 0,
  autoCapitalize: 1,
  autoComplete: 1,
  autoCorrect: 1,
  autoFocus: 1,
  autoPlay: 1,
  autoSave: 1,
  capture: 0,
  cellPadding: 1,
  cellSpacing: 1,
  challenge: 0,
  charSet: 1,
  checked: 0,
  children: 0,
  cite: 0,
  class: "className",
  classID: 1,
  className: 1,
  cols: 0,
  colSpan: 1,
  content: 0,
  contentEditable: 1,
  contextMenu: 1,
  controls: 0,
  controlsList: 1,
  coords: 0,
  crossOrigin: 1,
  dangerouslySetInnerHTML: 1,
  data: 0,
  dateTime: 1,
  default: 0,
  defaultChecked: 1,
  defaultValue: 1,
  defer: 0,
  dir: 0,
  disabled: 0,
  disablePictureInPicture: 1,
  disableRemotePlayback: 1,
  download: 0,
  draggable: 0,
  encType: 1,
  enterKeyHint: 1,
  for: "htmlFor",
  form: 0,
  formMethod: 1,
  formAction: 1,
  formEncType: 1,
  formNoValidate: 1,
  formTarget: 1,
  frameBorder: 1,
  headers: 0,
  height: 0,
  hidden: 0,
  high: 0,
  href: 0,
  hrefLang: 1,
  htmlFor: 1,
  httpEquiv: 1,
  "http-equiv": "httpEquiv",
  icon: 0,
  id: 0,
  innerHTML: 1,
  inputMode: 1,
  integrity: 0,
  is: 0,
  itemID: 1,
  itemProp: 1,
  itemRef: 1,
  itemScope: 1,
  itemType: 1,
  keyParams: 1,
  keyType: 1,
  kind: 0,
  label: 0,
  lang: 0,
  list: 0,
  loop: 0,
  low: 0,
  manifest: 0,
  marginWidth: 1,
  marginHeight: 1,
  max: 0,
  maxLength: 1,
  media: 0,
  mediaGroup: 1,
  method: 0,
  min: 0,
  minLength: 1,
  multiple: 0,
  muted: 0,
  name: 0,
  noModule: 1,
  nonce: 0,
  noValidate: 1,
  open: 0,
  optimum: 0,
  pattern: 0,
  placeholder: 0,
  playsInline: 1,
  poster: 0,
  preload: 0,
  profile: 0,
  radioGroup: 1,
  readOnly: 1,
  referrerPolicy: 1,
  rel: 0,
  required: 0,
  reversed: 0,
  role: 0,
  rows: 0,
  rowSpan: 1,
  sandbox: 0,
  scope: 0,
  scoped: 0,
  scrolling: 0,
  seamless: 0,
  selected: 0,
  shape: 0,
  size: 0,
  sizes: 0,
  span: 0,
  spellCheck: 1,
  src: 0,
  srcDoc: 1,
  srcLang: 1,
  srcSet: 1,
  start: 0,
  step: 0,
  style: 0,
  summary: 0,
  tabIndex: 1,
  target: 0,
  title: 0,
  type: 0,
  useMap: 1,
  value: 0,
  width: 0,
  wmode: 0,
  wrap: 0,
  about: 0,
  accentHeight: 1,
  "accent-height": "accentHeight",
  accumulate: 0,
  additive: 0,
  alignmentBaseline: 1,
  "alignment-baseline": "alignmentBaseline",
  allowReorder: 1,
  alphabetic: 0,
  amplitude: 0,
  arabicForm: 1,
  "arabic-form": "arabicForm",
  ascent: 0,
  attributeName: 1,
  attributeType: 1,
  autoReverse: 1,
  azimuth: 0,
  baseFrequency: 1,
  baselineShift: 1,
  "baseline-shift": "baselineShift",
  baseProfile: 1,
  bbox: 0,
  begin: 0,
  bias: 0,
  by: 0,
  calcMode: 1,
  capHeight: 1,
  "cap-height": "capHeight",
  clip: 0,
  clipPath: 1,
  "clip-path": "clipPath",
  clipPathUnits: 1,
  clipRule: 1,
  "clip-rule": "clipRule",
  color: 0,
  colorInterpolation: 1,
  "color-interpolation": "colorInterpolation",
  colorInterpolationFilters: 1,
  "color-interpolation-filters": "colorInterpolationFilters",
  colorProfile: 1,
  "color-profile": "colorProfile",
  colorRendering: 1,
  "color-rendering": "colorRendering",
  contentScriptType: 1,
  contentStyleType: 1,
  cursor: 0,
  cx: 0,
  cy: 0,
  d: 0,
  datatype: 0,
  decelerate: 0,
  descent: 0,
  diffuseConstant: 1,
  direction: 0,
  display: 0,
  divisor: 0,
  dominantBaseline: 1,
  "dominant-baseline": "dominantBaseline",
  dur: 0,
  dx: 0,
  dy: 0,
  edgeMode: 1,
  elevation: 0,
  enableBackground: 1,
  "enable-background": "enableBackground",
  end: 0,
  exponent: 0,
  externalResourcesRequired: 1,
  fill: 0,
  fillOpacity: 1,
  "fill-opacity": "fillOpacity",
  fillRule: 1,
  "fill-rule": "fillRule",
  filter: 0,
  filterRes: 1,
  filterUnits: 1,
  floodOpacity: 1,
  "flood-opacity": "floodOpacity",
  floodColor: 1,
  "flood-color": "floodColor",
  focusable: 0,
  fontFamily: 1,
  "font-family": "fontFamily",
  fontSize: 1,
  "font-size": "fontSize",
  fontSizeAdjust: 1,
  "font-size-adjust": "fontSizeAdjust",
  fontStretch: 1,
  "font-stretch": "fontStretch",
  fontStyle: 1,
  "font-style": "fontStyle",
  fontVariant: 1,
  "font-variant": "fontVariant",
  fontWeight: 1,
  "font-weight": "fontWeight",
  format: 0,
  from: 0,
  fx: 0,
  fy: 0,
  g1: 0,
  g2: 0,
  glyphName: 1,
  "glyph-name": "glyphName",
  glyphOrientationHorizontal: 1,
  "glyph-orientation-horizontal": "glyphOrientationHorizontal",
  glyphOrientationVertical: 1,
  "glyph-orientation-vertical": "glyphOrientationVertical",
  glyphRef: 1,
  gradientTransform: 1,
  gradientUnits: 1,
  hanging: 0,
  horizAdvX: 1,
  "horiz-adv-x": "horizAdvX",
  horizOriginX: 1,
  "horiz-origin-x": "horizOriginX",
  ideographic: 0,
  imageRendering: 1,
  "image-rendering": "imageRendering",
  in2: 0,
  in: 0,
  inlist: 0,
  intercept: 0,
  k1: 0,
  k2: 0,
  k3: 0,
  k4: 0,
  k: 0,
  kernelMatrix: 1,
  kernelUnitLength: 1,
  kerning: 0,
  keyPoints: 1,
  keySplines: 1,
  keyTimes: 1,
  lengthAdjust: 1,
  letterSpacing: 1,
  "letter-spacing": "letterSpacing",
  lightingColor: 1,
  "lighting-color": "lightingColor",
  limitingConeAngle: 1,
  local: 0,
  markerEnd: 1,
  "marker-end": "markerEnd",
  markerHeight: 1,
  markerMid: 1,
  "marker-mid": "markerMid",
  markerStart: 1,
  "marker-start": "markerStart",
  markerUnits: 1,
  markerWidth: 1,
  mask: 0,
  maskContentUnits: 1,
  maskUnits: 1,
  mathematical: 0,
  mode: 0,
  numOctaves: 1,
  offset: 0,
  opacity: 0,
  operator: 0,
  order: 0,
  orient: 0,
  orientation: 0,
  origin: 0,
  overflow: 0,
  overlinePosition: 1,
  "overline-position": "overlinePosition",
  overlineThickness: 1,
  "overline-thickness": "overlineThickness",
  paintOrder: 1,
  "paint-order": "paintOrder",
  panose1: 0,
  "panose-1": "panose1",
  pathLength: 1,
  patternContentUnits: 1,
  patternTransform: 1,
  patternUnits: 1,
  pointerEvents: 1,
  "pointer-events": "pointerEvents",
  points: 0,
  pointsAtX: 1,
  pointsAtY: 1,
  pointsAtZ: 1,
  prefix: 0,
  preserveAlpha: 1,
  preserveAspectRatio: 1,
  primitiveUnits: 1,
  property: 0,
  r: 0,
  radius: 0,
  refX: 1,
  refY: 1,
  renderingIntent: 1,
  "rendering-intent": "renderingIntent",
  repeatCount: 1,
  repeatDur: 1,
  requiredExtensions: 1,
  requiredFeatures: 1,
  resource: 0,
  restart: 0,
  result: 0,
  results: 0,
  rotate: 0,
  rx: 0,
  ry: 0,
  scale: 0,
  security: 0,
  seed: 0,
  shapeRendering: 1,
  "shape-rendering": "shapeRendering",
  slope: 0,
  spacing: 0,
  specularConstant: 1,
  specularExponent: 1,
  speed: 0,
  spreadMethod: 1,
  startOffset: 1,
  stdDeviation: 1,
  stemh: 0,
  stemv: 0,
  stitchTiles: 1,
  stopColor: 1,
  "stop-color": "stopColor",
  stopOpacity: 1,
  "stop-opacity": "stopOpacity",
  strikethroughPosition: 1,
  "strikethrough-position": "strikethroughPosition",
  strikethroughThickness: 1,
  "strikethrough-thickness": "strikethroughThickness",
  string: 0,
  stroke: 0,
  strokeDasharray: 1,
  "stroke-dasharray": "strokeDasharray",
  strokeDashoffset: 1,
  "stroke-dashoffset": "strokeDashoffset",
  strokeLinecap: 1,
  "stroke-linecap": "strokeLinecap",
  strokeLinejoin: 1,
  "stroke-linejoin": "strokeLinejoin",
  strokeMiterlimit: 1,
  "stroke-miterlimit": "strokeMiterlimit",
  strokeWidth: 1,
  "stroke-width": "strokeWidth",
  strokeOpacity: 1,
  "stroke-opacity": "strokeOpacity",
  suppressContentEditableWarning: 1,
  suppressHydrationWarning: 1,
  surfaceScale: 1,
  systemLanguage: 1,
  tableValues: 1,
  targetX: 1,
  targetY: 1,
  textAnchor: 1,
  "text-anchor": "textAnchor",
  textDecoration: 1,
  "text-decoration": "textDecoration",
  textLength: 1,
  textRendering: 1,
  "text-rendering": "textRendering",
  to: 0,
  transform: 0,
  typeof: 0,
  u1: 0,
  u2: 0,
  underlinePosition: 1,
  "underline-position": "underlinePosition",
  underlineThickness: 1,
  "underline-thickness": "underlineThickness",
  unicode: 0,
  unicodeBidi: 1,
  "unicode-bidi": "unicodeBidi",
  unicodeRange: 1,
  "unicode-range": "unicodeRange",
  unitsPerEm: 1,
  "units-per-em": "unitsPerEm",
  unselectable: 0,
  vAlphabetic: 1,
  "v-alphabetic": "vAlphabetic",
  values: 0,
  vectorEffect: 1,
  "vector-effect": "vectorEffect",
  version: 0,
  vertAdvY: 1,
  "vert-adv-y": "vertAdvY",
  vertOriginX: 1,
  "vert-origin-x": "vertOriginX",
  vertOriginY: 1,
  "vert-origin-y": "vertOriginY",
  vHanging: 1,
  "v-hanging": "vHanging",
  vIdeographic: 1,
  "v-ideographic": "vIdeographic",
  viewBox: 1,
  viewTarget: 1,
  visibility: 0,
  vMathematical: 1,
  "v-mathematical": "vMathematical",
  vocab: 0,
  widths: 0,
  wordSpacing: 1,
  "word-spacing": "wordSpacing",
  writingMode: 1,
  "writing-mode": "writingMode",
  x1: 0,
  x2: 0,
  x: 0,
  xChannelSelector: 1,
  xHeight: 1,
  "x-height": "xHeight",
  xlinkActuate: 1,
  "xlink:actuate": "xlinkActuate",
  xlinkArcrole: 1,
  "xlink:arcrole": "xlinkArcrole",
  xlinkHref: 1,
  "xlink:href": "xlinkHref",
  xlinkRole: 1,
  "xlink:role": "xlinkRole",
  xlinkShow: 1,
  "xlink:show": "xlinkShow",
  xlinkTitle: 1,
  "xlink:title": "xlinkTitle",
  xlinkType: 1,
  "xlink:type": "xlinkType",
  xmlBase: 1,
  "xml:base": "xmlBase",
  xmlLang: 1,
  "xml:lang": "xmlLang",
  xmlns: 0,
  "xml:space": "xmlSpace",
  xmlnsXlink: 1,
  "xmlns:xlink": "xmlnsXlink",
  xmlSpace: 1,
  y1: 0,
  y2: 0,
  y: 0,
  yChannelSelector: 1,
  z: 0,
  zoomAndPan: 1
};
const Qg = 0, Jr = 1, Ui = 2, Wi = 3, iu = 4, Jg = 5, em = 6;
function Ew(e) {
  return Tt.hasOwnProperty(e) ? Tt[e] : null;
}
function Nt(e, t, r, n, a, o, i) {
  this.acceptsBooleans = t === Ui || t === Wi || t === iu, this.attributeName = n, this.attributeNamespace = a, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
const Tt = {}, xw = [
  "children",
  "dangerouslySetInnerHTML",
  // TODO: This prevents the assignment of defaultValue to regular
  // elements (not just inputs). Now that ReactDOMInput assigns to the
  // defaultValue property -- do we need this?
  "defaultValue",
  "defaultChecked",
  "innerHTML",
  "suppressContentEditableWarning",
  "suppressHydrationWarning",
  "style"
];
xw.forEach((e) => {
  Tt[e] = new Nt(
    e,
    Qg,
    !1,
    // mustUseProperty
    e,
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"]
].forEach(([e, t]) => {
  Tt[e] = new Nt(
    e,
    Jr,
    !1,
    // mustUseProperty
    t,
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
["contentEditable", "draggable", "spellCheck", "value"].forEach((e) => {
  Tt[e] = new Nt(
    e,
    Ui,
    !1,
    // mustUseProperty
    e.toLowerCase(),
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha"
].forEach((e) => {
  Tt[e] = new Nt(
    e,
    Ui,
    !1,
    // mustUseProperty
    e,
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "allowFullScreen",
  "async",
  // Note: there is a special case that prevents it from being written to the DOM
  // on the client side because the browsers are inconsistent. Instead we call focus().
  "autoFocus",
  "autoPlay",
  "controls",
  "default",
  "defer",
  "disabled",
  "disablePictureInPicture",
  "disableRemotePlayback",
  "formNoValidate",
  "hidden",
  "loop",
  "noModule",
  "noValidate",
  "open",
  "playsInline",
  "readOnly",
  "required",
  "reversed",
  "scoped",
  "seamless",
  // Microdata
  "itemScope"
].forEach((e) => {
  Tt[e] = new Nt(
    e,
    Wi,
    !1,
    // mustUseProperty
    e.toLowerCase(),
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "checked",
  // Note: `option.selected` is not updated if `select.multiple` is
  // disabled with `removeAttribute`. We have special logic for handling this.
  "multiple",
  "muted",
  "selected"
  // NOTE: if you add a camelCased prop to this list,
  // you'll need to set attributeName to name.toLowerCase()
  // instead in the assignment below.
].forEach((e) => {
  Tt[e] = new Nt(
    e,
    Wi,
    !0,
    // mustUseProperty
    e,
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "capture",
  "download"
  // NOTE: if you add a camelCased prop to this list,
  // you'll need to set attributeName to name.toLowerCase()
  // instead in the assignment below.
].forEach((e) => {
  Tt[e] = new Nt(
    e,
    iu,
    !1,
    // mustUseProperty
    e,
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "cols",
  "rows",
  "size",
  "span"
  // NOTE: if you add a camelCased prop to this list,
  // you'll need to set attributeName to name.toLowerCase()
  // instead in the assignment below.
].forEach((e) => {
  Tt[e] = new Nt(
    e,
    em,
    !1,
    // mustUseProperty
    e,
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
["rowSpan", "start"].forEach((e) => {
  Tt[e] = new Nt(
    e,
    Jg,
    !1,
    // mustUseProperty
    e.toLowerCase(),
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
const su = /[\-\:]([a-z])/g, lu = (e) => e[1].toUpperCase();
[
  "accent-height",
  "alignment-baseline",
  "arabic-form",
  "baseline-shift",
  "cap-height",
  "clip-path",
  "clip-rule",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "dominant-baseline",
  "enable-background",
  "fill-opacity",
  "fill-rule",
  "flood-color",
  "flood-opacity",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "glyph-name",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "horiz-adv-x",
  "horiz-origin-x",
  "image-rendering",
  "letter-spacing",
  "lighting-color",
  "marker-end",
  "marker-mid",
  "marker-start",
  "overline-position",
  "overline-thickness",
  "paint-order",
  "panose-1",
  "pointer-events",
  "rendering-intent",
  "shape-rendering",
  "stop-color",
  "stop-opacity",
  "strikethrough-position",
  "strikethrough-thickness",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "text-anchor",
  "text-decoration",
  "text-rendering",
  "underline-position",
  "underline-thickness",
  "unicode-bidi",
  "unicode-range",
  "units-per-em",
  "v-alphabetic",
  "v-hanging",
  "v-ideographic",
  "v-mathematical",
  "vector-effect",
  "vert-adv-y",
  "vert-origin-x",
  "vert-origin-y",
  "word-spacing",
  "writing-mode",
  "xmlns:xlink",
  "x-height"
  // NOTE: if you add a camelCased prop to this list,
  // you'll need to set attributeName to name.toLowerCase()
  // instead in the assignment below.
].forEach((e) => {
  const t = e.replace(su, lu);
  Tt[t] = new Nt(
    t,
    Jr,
    !1,
    // mustUseProperty
    e,
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "xlink:actuate",
  "xlink:arcrole",
  "xlink:role",
  "xlink:show",
  "xlink:title",
  "xlink:type"
  // NOTE: if you add a camelCased prop to this list,
  // you'll need to set attributeName to name.toLowerCase()
  // instead in the assignment below.
].forEach((e) => {
  const t = e.replace(su, lu);
  Tt[t] = new Nt(
    t,
    Jr,
    !1,
    // mustUseProperty
    e,
    "http://www.w3.org/1999/xlink",
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "xml:base",
  "xml:lang",
  "xml:space"
  // NOTE: if you add a camelCased prop to this list,
  // you'll need to set attributeName to name.toLowerCase()
  // instead in the assignment below.
].forEach((e) => {
  const t = e.replace(su, lu);
  Tt[t] = new Nt(
    t,
    Jr,
    !1,
    // mustUseProperty
    e,
    "http://www.w3.org/XML/1998/namespace",
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
["tabIndex", "crossOrigin"].forEach((e) => {
  Tt[e] = new Nt(
    e,
    Jr,
    !1,
    // mustUseProperty
    e.toLowerCase(),
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
const Cw = "xlinkHref";
Tt[Cw] = new Nt(
  "xlinkHref",
  Jr,
  !1,
  // mustUseProperty
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  // sanitizeURL
  !1
  // removeEmptyString
);
["src", "href", "action", "formAction"].forEach((e) => {
  Tt[e] = new Nt(
    e,
    Jr,
    !1,
    // mustUseProperty
    e.toLowerCase(),
    // attributeName
    null,
    // attributeNamespace
    !0,
    // sanitizeURL
    !0
    // removeEmptyString
  );
});
const {
  CAMELCASE: _w,
  SAME: ww,
  possibleStandardNames: pf
} = Bi, $w = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Tw = $w + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Rw = RegExp.prototype.test.bind(
  // eslint-disable-next-line no-misleading-character-class
  new RegExp("^(data|aria)-[" + Tw + "]*$")
), Aw = Object.keys(
  pf
).reduce((e, t) => {
  const r = pf[t];
  return r === ww ? e[t] = t : r === _w ? e[t.toLowerCase()] = t : e[t] = r, e;
}, {});
yr.BOOLEAN = Wi;
yr.BOOLEANISH_STRING = Ui;
yr.NUMERIC = Jg;
yr.OVERLOADED_BOOLEAN = iu;
yr.POSITIVE_NUMERIC = em;
yr.RESERVED = Qg;
yr.STRING = Jr;
yr.getPropertyInfo = Ew;
yr.isCustomAttribute = Rw;
yr.possibleStandardNames = Aw;
var cu = {}, uu = {}, hf = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Pw = /\n/g, Ow = /^\s*/, kw = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Mw = /^:\s*/, Nw = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Iw = /^[;\s]*/, Dw = /^\s+|\s+$/g, Fw = `
`, gf = "/", mf = "*", nn = "", Lw = "comment", jw = "declaration";
function zw(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var r = 1, n = 1;
  function a(g) {
    var h = g.match(Pw);
    h && (r += h.length);
    var p = g.lastIndexOf(Fw);
    n = ~p ? g.length - p : n + g.length;
  }
  function o() {
    var g = { line: r, column: n };
    return function(h) {
      return h.position = new i(g), c(), h;
    };
  }
  function i(g) {
    this.start = g, this.end = { line: r, column: n }, this.source = t.source;
  }
  i.prototype.content = e;
  function s(g) {
    var h = new Error(
      t.source + ":" + r + ":" + n + ": " + g
    );
    if (h.reason = g, h.filename = t.source, h.line = r, h.column = n, h.source = e, !t.silent) throw h;
  }
  function l(g) {
    var h = g.exec(e);
    if (h) {
      var p = h[0];
      return a(p), e = e.slice(p.length), h;
    }
  }
  function c() {
    l(Ow);
  }
  function u(g) {
    var h;
    for (g = g || []; h = d(); )
      h !== !1 && g.push(h);
    return g;
  }
  function d() {
    var g = o();
    if (!(gf != e.charAt(0) || mf != e.charAt(1))) {
      for (var h = 2; nn != e.charAt(h) && (mf != e.charAt(h) || gf != e.charAt(h + 1)); )
        ++h;
      if (h += 2, nn === e.charAt(h - 1))
        return s("End of comment missing");
      var p = e.slice(2, h - 2);
      return n += 2, a(p), e = e.slice(h), n += 2, g({
        type: Lw,
        comment: p
      });
    }
  }
  function f() {
    var g = o(), h = l(kw);
    if (h) {
      if (d(), !l(Mw)) return s("property missing ':'");
      var p = l(Nw), y = g({
        type: jw,
        property: vf(h[0].replace(hf, nn)),
        value: p ? vf(p[0].replace(hf, nn)) : nn
      });
      return l(Iw), y;
    }
  }
  function v() {
    var g = [];
    u(g);
    for (var h; h = f(); )
      h !== !1 && (g.push(h), u(g));
    return g;
  }
  return c(), v();
}
function vf(e) {
  return e ? e.replace(Dw, nn) : nn;
}
var Hw = zw, Vw = mt && mt.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(uu, "__esModule", { value: !0 });
uu.default = Uw;
const Bw = Vw(Hw);
function Uw(e, t) {
  let r = null;
  if (!e || typeof e != "string")
    return r;
  const n = (0, Bw.default)(e), a = typeof t == "function";
  return n.forEach((o) => {
    if (o.type !== "declaration")
      return;
    const { property: i, value: s } = o;
    a ? t(i, s, o) : s && (r = r || {}, r[i] = s);
  }), r;
}
var qi = {};
Object.defineProperty(qi, "__esModule", { value: !0 });
qi.camelCase = void 0;
var Ww = /^--[a-zA-Z0-9_-]+$/, qw = /-([a-z])/g, Gw = /^[^-]+$/, Kw = /^-(webkit|moz|ms|o|khtml)-/, Yw = /^-(ms)-/, Xw = function(e) {
  return !e || Gw.test(e) || Ww.test(e);
}, Zw = function(e, t) {
  return t.toUpperCase();
}, yf = function(e, t) {
  return "".concat(t, "-");
}, Qw = function(e, t) {
  return t === void 0 && (t = {}), Xw(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Yw, yf) : e = e.replace(Kw, yf), e.replace(qw, Zw));
};
qi.camelCase = Qw;
var Jw = mt && mt.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, e$ = Jw(uu), t$ = qi;
function Dl(e, t) {
  var r = {};
  return !e || typeof e != "string" || (0, e$.default)(e, function(n, a) {
    n && a && (r[(0, t$.camelCase)(n, t)] = a);
  }), r;
}
Dl.default = Dl;
var r$ = Dl;
(function(e) {
  var t = mt && mt.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.returnFirstArg = e.canTextBeChildOfNode = e.ELEMENTS_WITH_NO_TEXT_CHILDREN = e.PRESERVE_CUSTOM_ATTRIBUTES = void 0, e.isCustomComponent = o, e.setStyleProp = s;
  var r = T, n = t(r$), a = /* @__PURE__ */ new Set([
    "annotation-xml",
    "color-profile",
    "font-face",
    "font-face-src",
    "font-face-uri",
    "font-face-format",
    "font-face-name",
    "missing-glyph"
  ]);
  function o(u, d) {
    return u.includes("-") ? !a.has(u) : !!(d && typeof d.is == "string");
  }
  var i = {
    reactCompat: !0
  };
  function s(u, d) {
    if (typeof u == "string") {
      if (!u.trim()) {
        d.style = {};
        return;
      }
      try {
        d.style = (0, n.default)(u, i);
      } catch {
        d.style = {};
      }
    }
  }
  e.PRESERVE_CUSTOM_ATTRIBUTES = Number(r.version.split(".")[0]) >= 16, e.ELEMENTS_WITH_NO_TEXT_CHILDREN = /* @__PURE__ */ new Set([
    "tr",
    "tbody",
    "thead",
    "tfoot",
    "colgroup",
    "table",
    "head",
    "html",
    "frameset"
  ]);
  var l = function(u) {
    return !e.ELEMENTS_WITH_NO_TEXT_CHILDREN.has(u.name);
  };
  e.canTextBeChildOfNode = l;
  var c = function(u) {
    return u;
  };
  e.returnFirstArg = c;
})(cu);
Object.defineProperty(Vi, "__esModule", { value: !0 });
Vi.default = i$;
var ia = yr, bf = cu, n$ = ["checked", "value"], a$ = ["input", "select", "textarea"], o$ = {
  reset: !0,
  submit: !0
};
function i$(e, t) {
  e === void 0 && (e = {});
  var r = {}, n = !!(e.type && o$[e.type]);
  for (var a in e) {
    var o = e[a];
    if ((0, ia.isCustomAttribute)(a)) {
      r[a] = o;
      continue;
    }
    var i = a.toLowerCase(), s = Sf(i);
    if (s) {
      var l = (0, ia.getPropertyInfo)(s);
      switch (n$.includes(s) && a$.includes(t) && !n && (s = Sf("default" + i)), r[s] = o, l && l.type) {
        case ia.BOOLEAN:
          r[s] = !0;
          break;
        case ia.OVERLOADED_BOOLEAN:
          o === "" && (r[s] = !0);
          break;
      }
      continue;
    }
    bf.PRESERVE_CUSTOM_ATTRIBUTES && (r[a] = o);
  }
  return (0, bf.setStyleProp)(e.style, r), r;
}
function Sf(e) {
  return ia.possibleStandardNames[e];
}
var du = {}, s$ = mt && mt.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(du, "__esModule", { value: !0 });
du.default = tm;
var ws = T, l$ = s$(Vi), ma = cu, c$ = {
  cloneElement: ws.cloneElement,
  createElement: ws.createElement,
  isValidElement: ws.isValidElement
};
function tm(e, t) {
  t === void 0 && (t = {});
  for (var r = [], n = typeof t.replace == "function", a = t.transform || ma.returnFirstArg, o = t.library || c$, i = o.cloneElement, s = o.createElement, l = o.isValidElement, c = e.length, u = 0; u < c; u++) {
    var d = e[u];
    if (n) {
      var f = t.replace(d, u);
      if (l(f)) {
        c > 1 && (f = i(f, {
          key: f.key || u
        })), r.push(a(f, d, u));
        continue;
      }
    }
    if (d.type === "text") {
      var v = !d.data.trim().length;
      if (v && d.parent && !(0, ma.canTextBeChildOfNode)(d.parent) || t.trim && v)
        continue;
      r.push(a(d.data, d, u));
      continue;
    }
    var g = d, h = {};
    u$(g) ? ((0, ma.setStyleProp)(g.attribs.style, g.attribs), h = g.attribs) : g.attribs && (h = (0, l$.default)(g.attribs, g.name));
    var p = void 0;
    switch (d.type) {
      case "script":
      case "style":
        d.children[0] && (h.dangerouslySetInnerHTML = {
          __html: d.children[0].data
        });
        break;
      case "tag":
        d.name === "textarea" && d.children[0] ? h.defaultValue = d.children[0].data : d.children && d.children.length && (p = tm(d.children, t));
        break;
      default:
        continue;
    }
    c > 1 && (h.key = u), r.push(a(s(d.name, h, p), d, u));
  }
  return r.length === 1 ? r[0] : r;
}
function u$(e) {
  return ma.PRESERVE_CUSTOM_ATTRIBUTES && e.type === "tag" && (0, ma.isCustomComponent)(e.name, e.attribs);
}
(function(e) {
  var t = mt && mt.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.htmlToDOM = e.domToReact = e.attributesToProps = e.Text = e.ProcessingInstruction = e.Element = e.Comment = void 0, e.default = s;
  var r = t(eu);
  e.htmlToDOM = r.default;
  var n = t(Vi);
  e.attributesToProps = n.default;
  var a = t(du);
  e.domToReact = a.default;
  var o = ru;
  Object.defineProperty(e, "Comment", { enumerable: !0, get: function() {
    return o.Comment;
  } }), Object.defineProperty(e, "Element", { enumerable: !0, get: function() {
    return o.Element;
  } }), Object.defineProperty(e, "ProcessingInstruction", { enumerable: !0, get: function() {
    return o.ProcessingInstruction;
  } }), Object.defineProperty(e, "Text", { enumerable: !0, get: function() {
    return o.Text;
  } });
  var i = { lowerCaseAttributeNames: !1 };
  function s(l, c) {
    if (typeof l != "string")
      throw new TypeError("First argument must be a string");
    return l ? (0, a.default)((0, r.default)(l, (c == null ? void 0 : c.htmlparser2) || i), c) : [];
  }
})(Jc);
const Ef = /* @__PURE__ */ np(Jc), d$ = Ef.default || Ef, f$ = /* @__PURE__ */ T.memo((e) => {
  const {
    text: t,
    animationConfig: r
  } = e, {
    fadeDuration: n = 200,
    easing: a = "ease-in-out"
  } = r || {}, [o, i] = hr([]), s = Ue("");
  Ct(() => {
    if (t === s.current) return;
    if (!(s.current && t.indexOf(s.current) === 0)) {
      i([t]), s.current = t;
      return;
    }
    const c = t.slice(s.current.length);
    c && (i((u) => [...u, c]), s.current = t);
  }, [t]);
  const l = Hr(() => ({
    animation: `x-markdown-fade-in ${n}ms ${a} forwards`
  }), [n, a]);
  return /* @__PURE__ */ T.createElement(T.Fragment, null, o.map((c, u) => /* @__PURE__ */ T.createElement("span", {
    style: l,
    key: `animation-text-${u}`
  }, c)));
}), Wo = class Wo {
  constructor(t) {
    X(this, "options");
    this.options = t;
  }
  /**
   * Detect unclosed tags using regular expressions
   */
  detectUnclosedTags(t) {
    var i;
    const r = /* @__PURE__ */ new Set(), n = [], a = /<\/?([a-zA-Z][a-zA-Z0-9-]*)(?:\s[^>]*)?>/g;
    let o = a.exec(t);
    for (; o !== null; ) {
      const [s, l] = o, c = s.startsWith("</"), u = s.endsWith("/>");
      if ((i = this.options.components) != null && i[l.toLowerCase()])
        if (c) {
          const d = n.lastIndexOf(l.toLowerCase());
          d !== -1 && n.splice(d, 1);
        } else u || n.push(l.toLowerCase());
      o = a.exec(t);
    }
    return n.forEach((s) => {
      r.add(s);
    }), r;
  }
  /**
   * Configure DOMPurify to preserve components and target attributes, filter everything else
   */
  configureDOMPurify() {
    const t = Object.keys(this.options.components || {}), r = this.options.dompurifyConfig || {}, n = Array.isArray(r.ADD_TAGS) ? r.ADD_TAGS : [], a = Array.isArray(r.ADD_ATTR) ? r.ADD_ATTR : [];
    return {
      ...r,
      ADD_TAGS: Array.from(/* @__PURE__ */ new Set([...t, ...n])),
      ADD_ATTR: Array.from(/* @__PURE__ */ new Set(["target", "rel", ...a]))
    };
  }
  createReplaceElement(t, r) {
    const {
      enableAnimation: n,
      animationConfig: a
    } = this.options.streaming || {};
    return (o) => {
      var h, p, y;
      const i = `x-markdown-component-${r.current++}`, s = o.type === "text" && o.data && Wo.NON_WHITESPACE_REGEX.test(o.data), l = (h = o.parent) == null ? void 0 : h.name, c = l && ((p = this.options.components) == null ? void 0 : p[l]);
      if (n && s && !c)
        return /* @__PURE__ */ T.createElement(f$, {
          text: o.data,
          key: i,
          animationConfig: a
        });
      if (!("name" in o)) return;
      const {
        name: d,
        attribs: f,
        children: v
      } = o, g = (y = this.options.components) == null ? void 0 : y[d];
      if (g) {
        const m = t != null && t.has(d) ? "loading" : "done", S = {
          domNode: o,
          streamStatus: m,
          key: i,
          ...f,
          ...f.disabled !== void 0 && {
            disabled: !0
          },
          ...f.checked !== void 0 && {
            checked: !0
          }
        }, E = [S.className, S.classname, S.class].filter(Boolean).join(" ").trim();
        if (S.className = E || "", d === "code") {
          const {
            "data-block": x = "false",
            "data-state": w = "done"
          } = f || {};
          S.block = x === "true", S.streamStatus = w === "loading" ? "loading" : "done";
        }
        return v && (S.children = this.processChildren(v, t, r)), /* @__PURE__ */ T.createElement(g, S);
      }
    };
  }
  processChildren(t, r, n) {
    return Jc.domToReact(t, {
      replace: this.createReplaceElement(r, n)
    });
  }
  processHtml(t) {
    const r = this.detectUnclosedTags(t), n = {
      current: 0
    }, a = this.configureDOMPurify(), o = aw.sanitize(t, a);
    return d$(o, {
      replace: this.createReplaceElement(r, n)
    });
  }
  render(t) {
    return this.processHtml(t);
  }
};
X(Wo, "NON_WHITESPACE_REGEX", /[^\r\n\s]+/);
let Fl = Wo, ht = /* @__PURE__ */ function(e) {
  return e.Text = "text", e.Link = "link", e.Image = "image", e.Html = "html", e.Emphasis = "emphasis", e.List = "list", e.Table = "table", e;
}({});
const p$ = /^(`{3,}|~{3,})/, aa = {
  image: [/^!\[[^\]\r\n]{0,1000}$/, /^!\[[^\r\n]{0,1000}\]\(*[^)\r\n]{0,1000}$/],
  link: [/^\[[^\]\r\n]{0,1000}$/, /^\[[^\r\n]{0,1000}\]\(*[^)\r\n]{0,1000}$/],
  html: [/^<\/$/, /^<\/?[a-zA-Z][a-zA-Z0-9-]{0,100}[^>\r\n]{0,1000}$/],
  commonEmphasis: [/^(\*{1,3}|_{1,3})(?!\s)(?!.*\1$)[^\r\n]{0,1000}$/],
  // regex2 matches cases like "- **"
  list: [/^[-+*]\s{0,3}$/, /^[-+*]\s{1,3}(\*{1,3}|_{1,3})(?!\s)(?!.*\1$)[^\r\n]{0,1000}$/]
}, h$ = (e) => {
  if (e.includes(`

`)) return !1;
  const t = e.split(`
`);
  if (t.length <= 1) return !0;
  const [r, n] = t, a = r.trim();
  if (!/^\|.*\|$/.test(a)) return !1;
  const i = n.trim().split("|").map((l) => l.trim()).filter(Boolean), s = /^:?-+:?$/;
  return i.every((l, c) => c === i.length - 1 && l === ":" || s.test(l));
}, rm = {
  [ht.Link]: {
    tokenType: ht.Link,
    isStartOfToken: (e) => e.startsWith("["),
    isStreamingValid: (e) => aa.link.some((t) => t.test(e))
  },
  [ht.Image]: {
    tokenType: ht.Image,
    isStartOfToken: (e) => e.startsWith("!"),
    isStreamingValid: (e) => aa.image.some((t) => t.test(e))
  },
  [ht.Html]: {
    tokenType: ht.Html,
    isStartOfToken: (e) => e.startsWith("<"),
    isStreamingValid: (e) => aa.html.some((t) => t.test(e))
  },
  [ht.Emphasis]: {
    tokenType: ht.Emphasis,
    isStartOfToken: (e) => e.startsWith("*") || e.startsWith("_"),
    isStreamingValid: (e) => aa.commonEmphasis.some((t) => t.test(e))
  },
  [ht.List]: {
    tokenType: ht.List,
    isStartOfToken: (e) => /^[-+*]/.test(e),
    isStreamingValid: (e) => aa.list.some((t) => t.test(e))
  },
  [ht.Table]: {
    tokenType: ht.Table,
    isStartOfToken: (e) => e.startsWith("|"),
    isStreamingValid: h$
  }
}, g$ = (e, t) => {
  const r = rm[t];
  if (!r) return;
  const {
    token: n,
    pending: a
  } = e;
  if (n === ht.Text && r.isStartOfToken(a)) {
    e.token = t;
    return;
  }
  n === t && !r.isStreamingValid(a) && Ll(e);
}, xf = Object.values(rm).map((e) => ({
  tokenType: e.tokenType,
  recognize: (t) => g$(t, e.tokenType)
})), $s = () => ({
  pending: "",
  token: ht.Text,
  processedLength: 0,
  completeMarkdown: ""
}), Ll = (e) => {
  e.pending && (e.completeMarkdown += e.pending, e.pending = ""), e.token = ht.Text;
}, m$ = (e) => {
  const t = e.split(`
`);
  let r = !1, n = "", a = 0;
  for (const o of t) {
    const s = (o.endsWith("\r") ? o.slice(0, -1) : o).match(p$);
    if (s) {
      const l = s[1], c = l[0], u = l.length;
      r ? c === n && u >= a && (r = !1, n = "", a = 0) : (r = !0, n = c, a = u);
    }
  }
  return r;
}, v$ = (e) => {
  try {
    return encodeURIComponent(e);
  } catch (t) {
    if (t instanceof URIError) {
      const r = e.replace(new RegExp("[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?<![\\uD800-\\uDBFF])[\\uDC00-\\uDFFF]", "g"), "");
      return encodeURIComponent(r);
    }
    return "";
  }
}, y$ = (e, t) => {
  const {
    streaming: r,
    components: n = {}
  } = t || {}, {
    hasNextChunk: a = !1,
    incompleteMarkdownComponentMap: o
  } = r || {}, [i, s] = hr(""), l = Ue($s()), c = ko((d) => {
    const {
      token: f,
      pending: v
    } = d;
    if (f === ht.Text || f === ht.Image && v === "!") return;
    if (f === ht.Table && v.split(`
`).length > 2)
      return v;
    const h = (o || {})[f] || `incomplete-${f}`, p = v$(v);
    return n != null && n[h] ? `<${h} data-raw="${p}" />` : void 0;
  }, [o, n]), u = ko((d) => {
    if (!d) {
      s(""), l.current = $s();
      return;
    }
    const f = l.current.completeMarkdown + l.current.pending;
    d.startsWith(f) || (l.current = $s());
    const v = l.current, g = d.slice(v.processedLength);
    if (!g) return;
    v.processedLength += g.length;
    const h = m$(d);
    for (const y of g) {
      if (v.pending += y, h) {
        Ll(v);
        continue;
      }
      if (v.token === ht.Text)
        for (const m of xf) m.recognize(v);
      else {
        const m = xf.find((S) => S.tokenType === v.token);
        m == null || m.recognize(v);
      }
      v.token === ht.Text && Ll(v);
    }
    const p = c(v);
    s(v.completeMarkdown + (p || ""));
  }, [c]);
  return Ct(() => {
    if (typeof e != "string") {
      console.error(`X-Markdown: input must be string, not ${typeof e}.`), s("");
      return;
    }
    a ? u(e) : s(e);
  }, [e, a, u]), i;
}, b$ = /* @__PURE__ */ T.memo((e) => {
  const {
    streaming: t,
    config: r,
    components: n,
    paragraphTag: a,
    content: o,
    children: i,
    rootClassName: s,
    prefixCls: l,
    className: c,
    style: u,
    openLinksInNewTab: d,
    dompurifyConfig: f
  } = e, {
    direction: v,
    getPrefixCls: g
  } = JC(), h = g("x-markdown", l), p = se(h, "x-markdown", s, c), y = Hr(() => ({
    direction: v === "rtl" ? "rtl" : "ltr",
    ...u
  }), [v, u]), m = y$(o || i || "", {
    streaming: t,
    components: n
  }), S = Hr(() => new D_({
    markedConfig: r,
    paragraphTag: a,
    openLinksInNewTab: d
  }), [r, a, d]), E = Hr(() => new Fl({
    components: n,
    dompurifyConfig: f,
    streaming: t
  }), [n, f, t]), x = Hr(() => m ? S.parse(m) : "", [m, S]);
  return m ? /* @__PURE__ */ T.createElement("div", {
    className: p,
    style: y
  }, E.render(x)) : null;
});
process.env.NODE_ENV !== "production" && (b$.displayName = "XMarkdown");
function S$(e) {
  return !!(e.addonBefore || e.addonAfter);
}
function E$(e) {
  return !!(e.prefix || e.suffix || e.allowClear);
}
function Cf(e, t, r) {
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
function zo(e, t, r, n) {
  if (r) {
    var a = t;
    if (t.type === "click") {
      a = Cf(t, e, ""), r(a);
      return;
    }
    if (e.type !== "file" && n !== void 0) {
      a = Cf(t, e, n), r(a);
      return;
    }
    r(a);
  }
}
function nm(e, t) {
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
var am = /* @__PURE__ */ T.forwardRef(function(e, t) {
  var r, n, a, o = e.inputElement, i = e.children, s = e.prefixCls, l = e.prefix, c = e.suffix, u = e.addonBefore, d = e.addonAfter, f = e.className, v = e.style, g = e.disabled, h = e.readOnly, p = e.focused, y = e.triggerFocus, m = e.allowClear, S = e.value, E = e.handleReset, x = e.hidden, w = e.classes, b = e.classNames, P = e.dataAttrs, k = e.styles, M = e.components, I = e.onClear, D = i ?? o, F = (M == null ? void 0 : M.affixWrapper) || "span", B = (M == null ? void 0 : M.groupWrapper) || "span", L = (M == null ? void 0 : M.wrapper) || "span", A = (M == null ? void 0 : M.groupAddon) || "span", O = Ue(null), R = function(Ae) {
    var ie;
    (ie = O.current) !== null && ie !== void 0 && ie.contains(Ae.target) && (y == null || y());
  }, H = E$(e), z = /* @__PURE__ */ iv(D, {
    value: S,
    className: se((r = D.props) === null || r === void 0 ? void 0 : r.className, !H && (b == null ? void 0 : b.variant)) || null
  }), j = Ue(null);
  if (T.useImperativeHandle(t, function() {
    return {
      nativeElement: j.current || O.current
    };
  }), H) {
    var W = null;
    if (m) {
      var K = !g && !h && S, Z = "".concat(s, "-clear-icon"), Y = me(m) === "object" && m !== null && m !== void 0 && m.clearIcon ? m.clearIcon : "✖";
      W = /* @__PURE__ */ T.createElement("button", {
        type: "button",
        tabIndex: -1,
        onClick: function(Ae) {
          E == null || E(Ae), I == null || I();
        },
        onMouseDown: function(Ae) {
          return Ae.preventDefault();
        },
        className: se(Z, N(N({}, "".concat(Z, "-hidden"), !K), "".concat(Z, "-has-suffix"), !!c))
      }, Y);
    }
    var Q = "".concat(s, "-affix-wrapper"), le = se(Q, N(N(N(N(N({}, "".concat(s, "-disabled"), g), "".concat(Q, "-disabled"), g), "".concat(Q, "-focused"), p), "".concat(Q, "-readonly"), h), "".concat(Q, "-input-with-clear-btn"), c && m && S), w == null ? void 0 : w.affixWrapper, b == null ? void 0 : b.affixWrapper, b == null ? void 0 : b.variant), de = (c || m) && /* @__PURE__ */ T.createElement("span", {
      className: se("".concat(s, "-suffix"), b == null ? void 0 : b.suffix),
      style: k == null ? void 0 : k.suffix
    }, W, c);
    z = /* @__PURE__ */ T.createElement(F, De({
      className: le,
      style: k == null ? void 0 : k.affixWrapper,
      onClick: R
    }, P == null ? void 0 : P.affixWrapper, {
      ref: O
    }), l && /* @__PURE__ */ T.createElement("span", {
      className: se("".concat(s, "-prefix"), b == null ? void 0 : b.prefix),
      style: k == null ? void 0 : k.prefix
    }, l), z, de);
  }
  if (S$(e)) {
    var fe = "".concat(s, "-group"), ge = "".concat(fe, "-addon"), Se = "".concat(fe, "-wrapper"), $e = se("".concat(s, "-wrapper"), fe, w == null ? void 0 : w.wrapper, b == null ? void 0 : b.wrapper), Me = se(Se, N({}, "".concat(Se, "-disabled"), g), w == null ? void 0 : w.group, b == null ? void 0 : b.groupWrapper);
    z = /* @__PURE__ */ T.createElement(B, {
      className: Me,
      ref: j
    }, /* @__PURE__ */ T.createElement(L, {
      className: $e
    }, u && /* @__PURE__ */ T.createElement(A, {
      className: ge
    }, u), z, d && /* @__PURE__ */ T.createElement(A, {
      className: ge
    }, d)));
  }
  return /* @__PURE__ */ T.cloneElement(z, {
    className: se((n = z.props) === null || n === void 0 ? void 0 : n.className, f) || null,
    style: V(V({}, (a = z.props) === null || a === void 0 ? void 0 : a.style), v),
    hidden: x
  });
}), x$ = ["show"];
function om(e, t) {
  return C.useMemo(function() {
    var r = {};
    t && (r.show = me(t) === "object" && t.formatter ? t.formatter : !!t), r = V(V({}, r), e);
    var n = r, a = n.show, o = er(n, x$);
    return V(V({}, o), {}, {
      show: !!a,
      showFormatter: typeof a == "function" ? a : void 0,
      strategy: o.strategy || function(i) {
        return i.length;
      }
    });
  }, [e, t]);
}
var C$ = ["autoComplete", "onChange", "onFocus", "onBlur", "onPressEnter", "onKeyDown", "onKeyUp", "prefixCls", "disabled", "htmlSize", "className", "maxLength", "suffix", "showCount", "count", "type", "classes", "classNames", "styles", "onCompositionStart", "onCompositionEnd"], _$ = /* @__PURE__ */ rc(function(e, t) {
  var r = e.autoComplete, n = e.onChange, a = e.onFocus, o = e.onBlur, i = e.onPressEnter, s = e.onKeyDown, l = e.onKeyUp, c = e.prefixCls, u = c === void 0 ? "rc-input" : c, d = e.disabled, f = e.htmlSize, v = e.className, g = e.maxLength, h = e.suffix, p = e.showCount, y = e.count, m = e.type, S = m === void 0 ? "text" : m, E = e.classes, x = e.classNames, w = e.styles, b = e.onCompositionStart, P = e.onCompositionEnd, k = er(e, C$), M = hr(!1), I = he(M, 2), D = I[0], F = I[1], B = Ue(!1), L = Ue(!1), A = Ue(null), O = Ue(null), R = function(ve) {
    A.current && nm(A.current, ve);
  }, H = Wa(e.defaultValue, {
    value: e.value
  }), z = he(H, 2), j = z[0], W = z[1], K = j == null ? "" : String(j), Z = hr(null), Y = he(Z, 2), Q = Y[0], le = Y[1], de = om(y, p), fe = de.max || g, ge = de.strategy(K), Se = !!fe && ge > fe;
  qo(t, function() {
    var Ce;
    return {
      focus: R,
      blur: function() {
        var Oe;
        (Oe = A.current) === null || Oe === void 0 || Oe.blur();
      },
      setSelectionRange: function(Oe, U, te) {
        var J;
        (J = A.current) === null || J === void 0 || J.setSelectionRange(Oe, U, te);
      },
      select: function() {
        var Oe;
        (Oe = A.current) === null || Oe === void 0 || Oe.select();
      },
      input: A.current,
      nativeElement: ((Ce = O.current) === null || Ce === void 0 ? void 0 : Ce.nativeElement) || A.current
    };
  }), Ct(function() {
    L.current && (L.current = !1), F(function(Ce) {
      return Ce && d ? !1 : Ce;
    });
  }, [d]);
  var $e = function(ve, Oe, U) {
    var te = Oe;
    if (!B.current && de.exceedFormatter && de.max && de.strategy(Oe) > de.max) {
      if (te = de.exceedFormatter(Oe, {
        max: de.max
      }), Oe !== te) {
        var J, re;
        le([((J = A.current) === null || J === void 0 ? void 0 : J.selectionStart) || 0, ((re = A.current) === null || re === void 0 ? void 0 : re.selectionEnd) || 0]);
      }
    } else if (U.source === "compositionEnd")
      return;
    W(te), A.current && zo(A.current, ve, n, te);
  };
  Ct(function() {
    if (Q) {
      var Ce;
      (Ce = A.current) === null || Ce === void 0 || Ce.setSelectionRange.apply(Ce, xe(Q));
    }
  }, [Q]);
  var Me = function(ve) {
    $e(ve, ve.target.value, {
      source: "change"
    });
  }, ee = function(ve) {
    B.current = !1, $e(ve, ve.currentTarget.value, {
      source: "compositionEnd"
    }), P == null || P(ve);
  }, Ae = function(ve) {
    i && ve.key === "Enter" && !L.current && (L.current = !0, i(ve)), s == null || s(ve);
  }, ie = function(ve) {
    ve.key === "Enter" && (L.current = !1), l == null || l(ve);
  }, ye = function(ve) {
    F(!0), a == null || a(ve);
  }, Ve = function(ve) {
    L.current && (L.current = !1), F(!1), o == null || o(ve);
  }, we = function(ve) {
    W(""), R(), A.current && zo(A.current, ve, n);
  }, We = Se && "".concat(u, "-out-of-range"), Le = function() {
    var ve = Qh(e, [
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
    return /* @__PURE__ */ T.createElement("input", De({
      autoComplete: r
    }, ve, {
      onChange: Me,
      onFocus: ye,
      onBlur: Ve,
      onKeyDown: Ae,
      onKeyUp: ie,
      className: se(u, N({}, "".concat(u, "-disabled"), d), x == null ? void 0 : x.input),
      style: w == null ? void 0 : w.input,
      ref: A,
      size: f,
      type: S,
      onCompositionStart: function(U) {
        B.current = !0, b == null || b(U);
      },
      onCompositionEnd: ee
    }));
  }, je = function() {
    var ve = Number(fe) > 0;
    if (h || de.show) {
      var Oe = de.showFormatter ? de.showFormatter({
        value: K,
        count: ge,
        maxLength: fe
      }) : "".concat(ge).concat(ve ? " / ".concat(fe) : "");
      return /* @__PURE__ */ T.createElement(T.Fragment, null, de.show && /* @__PURE__ */ T.createElement("span", {
        className: se("".concat(u, "-show-count-suffix"), N({}, "".concat(u, "-show-count-has-suffix"), !!h), x == null ? void 0 : x.count),
        style: V({}, w == null ? void 0 : w.count)
      }, Oe), h);
    }
    return null;
  };
  return /* @__PURE__ */ T.createElement(am, De({}, k, {
    prefixCls: u,
    className: se(v, We),
    handleReset: we,
    value: K,
    focused: D,
    triggerFocus: R,
    suffix: je(),
    disabled: d,
    classes: E,
    classNames: x,
    styles: w
  }), Le());
});
function Ho(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [];
  return T.Children.forEach(e, function(n) {
    n == null && !t.keepEmpty || (Array.isArray(n) ? r = r.concat(Ho(n)) : Ep(n) && n.props ? r = r.concat(Ho(n.props.children, t)) : r.push(n));
  }), r;
}
var jl = /* @__PURE__ */ C.createContext(null);
function w$(e) {
  var t = e.children, r = e.onBatchResize, n = C.useRef(0), a = C.useRef([]), o = C.useContext(jl), i = C.useCallback(function(s, l, c) {
    n.current += 1;
    var u = n.current;
    a.current.push({
      size: s,
      element: l,
      data: c
    }), Promise.resolve().then(function() {
      u === n.current && (r == null || r(a.current), a.current = []);
    }), o == null || o(s, l, c);
  }, [r, o]);
  return /* @__PURE__ */ C.createElement(jl.Provider, {
    value: i
  }, t);
}
var im = function() {
  if (typeof Map < "u")
    return Map;
  function e(t, r) {
    var n = -1;
    return t.some(function(a, o) {
      return a[0] === r ? (n = o, !0) : !1;
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
        for (var a = 0, o = this.__entries__; a < o.length; a++) {
          var i = o[a];
          r.call(n, i[1], i[0]);
        }
      }, t;
    }()
  );
}(), zl = typeof window < "u" && typeof document < "u" && window.document === document, Vo = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), $$ = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(Vo) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), T$ = 2;
function R$(e, t) {
  var r = !1, n = !1, a = 0;
  function o() {
    r && (r = !1, e()), n && s();
  }
  function i() {
    $$(o);
  }
  function s() {
    var l = Date.now();
    if (r) {
      if (l - a < T$)
        return;
      n = !0;
    } else
      r = !0, n = !1, setTimeout(i, t);
    a = l;
  }
  return s;
}
var A$ = 20, P$ = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], O$ = typeof MutationObserver < "u", k$ = (
  /** @class */
  function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = R$(this.refresh.bind(this), A$);
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
      !zl || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), O$ ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !zl || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var r = t.propertyName, n = r === void 0 ? "" : r, a = P$.some(function(o) {
        return !!~n.indexOf(o);
      });
      a && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  }()
), sm = function(e, t) {
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
}, Fn = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || Vo;
}, lm = Gi(0, 0, 0, 0);
function Bo(e) {
  return parseFloat(e) || 0;
}
function _f(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return t.reduce(function(n, a) {
    var o = e["border-" + a + "-width"];
    return n + Bo(o);
  }, 0);
}
function M$(e) {
  for (var t = ["top", "right", "bottom", "left"], r = {}, n = 0, a = t; n < a.length; n++) {
    var o = a[n], i = e["padding-" + o];
    r[o] = Bo(i);
  }
  return r;
}
function N$(e) {
  var t = e.getBBox();
  return Gi(0, 0, t.width, t.height);
}
function I$(e) {
  var t = e.clientWidth, r = e.clientHeight;
  if (!t && !r)
    return lm;
  var n = Fn(e).getComputedStyle(e), a = M$(n), o = a.left + a.right, i = a.top + a.bottom, s = Bo(n.width), l = Bo(n.height);
  if (n.boxSizing === "border-box" && (Math.round(s + o) !== t && (s -= _f(n, "left", "right") + o), Math.round(l + i) !== r && (l -= _f(n, "top", "bottom") + i)), !F$(e)) {
    var c = Math.round(s + o) - t, u = Math.round(l + i) - r;
    Math.abs(c) !== 1 && (s -= c), Math.abs(u) !== 1 && (l -= u);
  }
  return Gi(a.left, a.top, s, l);
}
var D$ = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof Fn(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof Fn(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function F$(e) {
  return e === Fn(e).document.documentElement;
}
function L$(e) {
  return zl ? D$(e) ? N$(e) : I$(e) : lm;
}
function j$(e) {
  var t = e.x, r = e.y, n = e.width, a = e.height, o = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, i = Object.create(o.prototype);
  return sm(i, {
    x: t,
    y: r,
    width: n,
    height: a,
    top: r,
    right: t + n,
    bottom: a + r,
    left: t
  }), i;
}
function Gi(e, t, r, n) {
  return { x: e, y: t, width: r, height: n };
}
var z$ = (
  /** @class */
  function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = Gi(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = L$(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  }()
), H$ = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, r) {
      var n = j$(r);
      sm(this, { target: t, contentRect: n });
    }
    return e;
  }()
), V$ = (
  /** @class */
  function() {
    function e(t, r, n) {
      if (this.activeObservations_ = [], this.observations_ = new im(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = r, this.callbackCtx_ = n;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof Fn(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var r = this.observations_;
        r.has(t) || (r.set(t, new z$(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof Fn(t).Element))
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
          return new H$(n.target, n.broadcastRect());
        });
        this.callback_.call(t, r, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  }()
), cm = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new im(), um = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var r = k$.getInstance(), n = new V$(t, r, this);
      cm.set(this, n);
    }
    return e;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  um.prototype[e] = function() {
    var t;
    return (t = cm.get(this))[e].apply(t, arguments);
  };
});
var B$ = function() {
  return typeof Vo.ResizeObserver < "u" ? Vo.ResizeObserver : um;
}(), Mr = /* @__PURE__ */ new Map();
function dm(e) {
  e.forEach(function(t) {
    var r, n = t.target;
    (r = Mr.get(n)) === null || r === void 0 || r.forEach(function(a) {
      return a(n);
    });
  });
}
var fm = new B$(dm);
process.env.NODE_ENV;
process.env.NODE_ENV;
function U$(e, t) {
  Mr.has(e) || (Mr.set(e, /* @__PURE__ */ new Set()), fm.observe(e)), Mr.get(e).add(t);
}
function W$(e, t) {
  Mr.has(e) && (Mr.get(e).delete(t), Mr.get(e).size || (fm.unobserve(e), Mr.delete(e)));
}
var q$ = /* @__PURE__ */ function(e) {
  Yr(r, e);
  var t = Xr(r);
  function r() {
    return _t(this, r), t.apply(this, arguments);
  }
  return wt(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
}(C.Component);
function G$(e, t) {
  var r = e.children, n = e.disabled, a = C.useRef(null), o = C.useRef(null), i = C.useContext(jl), s = typeof r == "function", l = s ? r(a) : r, c = C.useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  }), u = !s && /* @__PURE__ */ C.isValidElement(l) && _p(l), d = u ? $p(l) : null, f = Fb(d, a), v = function() {
    var y;
    return Eo(a.current) || // Support `nativeElement` format
    (a.current && me(a.current) === "object" ? Eo((y = a.current) === null || y === void 0 ? void 0 : y.nativeElement) : null) || Eo(o.current);
  };
  C.useImperativeHandle(t, function() {
    return v();
  });
  var g = C.useRef(e);
  g.current = e;
  var h = C.useCallback(function(p) {
    var y = g.current, m = y.onResize, S = y.data, E = p.getBoundingClientRect(), x = E.width, w = E.height, b = p.offsetWidth, P = p.offsetHeight, k = Math.floor(x), M = Math.floor(w);
    if (c.current.width !== k || c.current.height !== M || c.current.offsetWidth !== b || c.current.offsetHeight !== P) {
      var I = {
        width: k,
        height: M,
        offsetWidth: b,
        offsetHeight: P
      };
      c.current = I;
      var D = b === Math.round(x) ? x : b, F = P === Math.round(w) ? w : P, B = V(V({}, I), {}, {
        offsetWidth: D,
        offsetHeight: F
      });
      i == null || i(B, p, S), m && Promise.resolve().then(function() {
        m(B, p);
      });
    }
  }, []);
  return C.useEffect(function() {
    var p = v();
    return p && !n && U$(p, h), function() {
      return W$(p, h);
    };
  }, [a.current, n]), /* @__PURE__ */ C.createElement(q$, {
    ref: o
  }, u ? /* @__PURE__ */ C.cloneElement(l, {
    ref: f
  }) : l);
}
var pm = /* @__PURE__ */ C.forwardRef(G$);
process.env.NODE_ENV !== "production" && (pm.displayName = "SingleObserver");
var K$ = "rc-observer-key";
function Y$(e, t) {
  var r = e.children, n = typeof r == "function" ? [r] : Ho(r);
  return process.env.NODE_ENV !== "production" && (n.length > 1 ? _a(!1, "Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.") : n.length === 0 && _a(!1, "`children` of ResizeObserver is empty. Nothing is in observe.")), n.map(function(a, o) {
    var i = (a == null ? void 0 : a.key) || "".concat(K$, "-").concat(o);
    return /* @__PURE__ */ C.createElement(pm, De({}, e, {
      key: i,
      ref: o === 0 ? t : void 0
    }), a);
  });
}
var fu = /* @__PURE__ */ C.forwardRef(Y$);
process.env.NODE_ENV !== "production" && (fu.displayName = "ResizeObserver");
fu.Collection = w$;
var X$ = `
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
`, Z$ = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "font-variant", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing", "word-break", "white-space"], Ts = {}, qt;
function Q$(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = e.getAttribute("id") || e.getAttribute("data-reactid") || e.getAttribute("name");
  if (t && Ts[r])
    return Ts[r];
  var n = window.getComputedStyle(e), a = n.getPropertyValue("box-sizing") || n.getPropertyValue("-moz-box-sizing") || n.getPropertyValue("-webkit-box-sizing"), o = parseFloat(n.getPropertyValue("padding-bottom")) + parseFloat(n.getPropertyValue("padding-top")), i = parseFloat(n.getPropertyValue("border-bottom-width")) + parseFloat(n.getPropertyValue("border-top-width")), s = Z$.map(function(c) {
    return "".concat(c, ":").concat(n.getPropertyValue(c));
  }).join(";"), l = {
    sizingStyle: s,
    paddingSize: o,
    borderSize: i,
    boxSizing: a
  };
  return t && r && (Ts[r] = l), l;
}
function J$(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  qt || (qt = document.createElement("textarea"), qt.setAttribute("tab-index", "-1"), qt.setAttribute("aria-hidden", "true"), qt.setAttribute("name", "hiddenTextarea"), document.body.appendChild(qt)), e.getAttribute("wrap") ? qt.setAttribute("wrap", e.getAttribute("wrap")) : qt.removeAttribute("wrap");
  var a = Q$(e, t), o = a.paddingSize, i = a.borderSize, s = a.boxSizing, l = a.sizingStyle;
  qt.setAttribute("style", "".concat(l, ";").concat(X$)), qt.value = e.value || e.placeholder || "";
  var c = void 0, u = void 0, d, f = qt.scrollHeight;
  if (s === "border-box" ? f += i : s === "content-box" && (f -= o), r !== null || n !== null) {
    qt.value = " ";
    var v = qt.scrollHeight - o;
    r !== null && (c = v * r, s === "border-box" && (c = c + o + i), f = Math.max(c, f)), n !== null && (u = v * n, s === "border-box" && (u = u + o + i), d = f > u ? "" : "hidden", f = Math.min(u, f));
  }
  var g = {
    height: f,
    overflowY: d,
    resize: "none"
  };
  return c && (g.minHeight = c), u && (g.maxHeight = u), g;
}
var e1 = ["prefixCls", "defaultValue", "value", "autoSize", "onResize", "className", "style", "disabled", "onChange", "onInternalAutoSize"], Rs = 0, As = 1, Ps = 2, t1 = /* @__PURE__ */ C.forwardRef(function(e, t) {
  var r = e, n = r.prefixCls, a = r.defaultValue, o = r.value, i = r.autoSize, s = r.onResize, l = r.className, c = r.style, u = r.disabled, d = r.onChange, f = r.onInternalAutoSize, v = er(r, e1), g = Wa(a, {
    value: o,
    postState: function(Y) {
      return Y ?? "";
    }
  }), h = he(g, 2), p = h[0], y = h[1], m = function(Y) {
    y(Y.target.value), d == null || d(Y);
  }, S = C.useRef();
  C.useImperativeHandle(t, function() {
    return {
      textArea: S.current
    };
  });
  var E = C.useMemo(function() {
    return i && me(i) === "object" ? [i.minRows, i.maxRows] : [];
  }, [i]), x = he(E, 2), w = x[0], b = x[1], P = !!i, k = function() {
    try {
      if (document.activeElement === S.current) {
        var Y = S.current, Q = Y.selectionStart, le = Y.selectionEnd, de = Y.scrollTop;
        S.current.setSelectionRange(Q, le), S.current.scrollTop = de;
      }
    } catch {
    }
  }, M = C.useState(Ps), I = he(M, 2), D = I[0], F = I[1], B = C.useState(), L = he(B, 2), A = L[0], O = L[1], R = function() {
    F(Rs), process.env.NODE_ENV === "test" && (f == null || f());
  };
  xa(function() {
    P && R();
  }, [o, w, b, P]), xa(function() {
    if (D === Rs)
      F(As);
    else if (D === As) {
      var Z = J$(S.current, !1, w, b);
      F(Ps), O(Z);
    } else
      k();
  }, [D]);
  var H = C.useRef(), z = function() {
    kn.cancel(H.current);
  }, j = function(Y) {
    D === Ps && (s == null || s(Y), i && (z(), H.current = kn(function() {
      R();
    })));
  };
  C.useEffect(function() {
    return z;
  }, []);
  var W = P ? A : null, K = V(V({}, c), W);
  return (D === Rs || D === As) && (K.overflowY = "hidden", K.overflowX = "hidden"), /* @__PURE__ */ C.createElement(fu, {
    onResize: j,
    disabled: !(i || s)
  }, /* @__PURE__ */ C.createElement("textarea", De({}, v, {
    ref: S,
    style: K,
    className: se(n, l, N({}, "".concat(n, "-disabled"), u)),
    disabled: u,
    value: p,
    onChange: m
  })));
}), r1 = ["defaultValue", "value", "onFocus", "onBlur", "onChange", "allowClear", "maxLength", "onCompositionStart", "onCompositionEnd", "suffix", "prefixCls", "showCount", "count", "className", "style", "disabled", "hidden", "classNames", "styles", "onResize", "onClear", "onPressEnter", "readOnly", "autoSize", "onKeyDown"], n1 = /* @__PURE__ */ T.forwardRef(function(e, t) {
  var r, n = e.defaultValue, a = e.value, o = e.onFocus, i = e.onBlur, s = e.onChange, l = e.allowClear, c = e.maxLength, u = e.onCompositionStart, d = e.onCompositionEnd, f = e.suffix, v = e.prefixCls, g = v === void 0 ? "rc-textarea" : v, h = e.showCount, p = e.count, y = e.className, m = e.style, S = e.disabled, E = e.hidden, x = e.classNames, w = e.styles, b = e.onResize, P = e.onClear, k = e.onPressEnter, M = e.readOnly, I = e.autoSize, D = e.onKeyDown, F = er(e, r1), B = Wa(n, {
    value: a,
    defaultValue: n
  }), L = he(B, 2), A = L[0], O = L[1], R = A == null ? "" : String(A), H = T.useState(!1), z = he(H, 2), j = z[0], W = z[1], K = T.useRef(!1), Z = T.useState(null), Y = he(Z, 2), Q = Y[0], le = Y[1], de = Ue(null), fe = Ue(null), ge = function() {
    var ce;
    return (ce = fe.current) === null || ce === void 0 ? void 0 : ce.textArea;
  }, Se = function() {
    ge().focus();
  };
  qo(t, function() {
    var Ee;
    return {
      resizableTextArea: fe.current,
      focus: Se,
      blur: function() {
        ge().blur();
      },
      nativeElement: ((Ee = de.current) === null || Ee === void 0 ? void 0 : Ee.nativeElement) || ge()
    };
  }), Ct(function() {
    W(function(Ee) {
      return !S && Ee;
    });
  }, [S]);
  var $e = T.useState(null), Me = he($e, 2), ee = Me[0], Ae = Me[1];
  T.useEffect(function() {
    if (ee) {
      var Ee;
      (Ee = ge()).setSelectionRange.apply(Ee, xe(ee));
    }
  }, [ee]);
  var ie = om(p, h), ye = (r = ie.max) !== null && r !== void 0 ? r : c, Ve = Number(ye) > 0, we = ie.strategy(R), We = !!ye && we > ye, Le = function(ce, qe) {
    var ct = qe;
    !K.current && ie.exceedFormatter && ie.max && ie.strategy(qe) > ie.max && (ct = ie.exceedFormatter(qe, {
      max: ie.max
    }), qe !== ct && Ae([ge().selectionStart || 0, ge().selectionEnd || 0])), O(ct), zo(ce.currentTarget, ce, s, ct);
  }, je = function(ce) {
    K.current = !0, u == null || u(ce);
  }, Ce = function(ce) {
    K.current = !1, Le(ce, ce.currentTarget.value), d == null || d(ce);
  }, ve = function(ce) {
    Le(ce, ce.target.value);
  }, Oe = function(ce) {
    ce.key === "Enter" && k && k(ce), D == null || D(ce);
  }, U = function(ce) {
    W(!0), o == null || o(ce);
  }, te = function(ce) {
    W(!1), i == null || i(ce);
  }, J = function(ce) {
    O(""), Se(), zo(ge(), ce, s);
  }, re = f, ae;
  ie.show && (ie.showFormatter ? ae = ie.showFormatter({
    value: R,
    count: we,
    maxLength: ye
  }) : ae = "".concat(we).concat(Ve ? " / ".concat(ye) : ""), re = /* @__PURE__ */ T.createElement(T.Fragment, null, re, /* @__PURE__ */ T.createElement("span", {
    className: se("".concat(g, "-data-count"), x == null ? void 0 : x.count),
    style: w == null ? void 0 : w.count
  }, ae)));
  var He = function(ce) {
    var qe;
    b == null || b(ce), (qe = ge()) !== null && qe !== void 0 && qe.style.height && le(!0);
  }, _e = !I && !h && !l;
  return /* @__PURE__ */ T.createElement(am, {
    ref: de,
    value: R,
    allowClear: l,
    handleReset: J,
    suffix: re,
    prefixCls: g,
    classNames: V(V({}, x), {}, {
      affixWrapper: se(x == null ? void 0 : x.affixWrapper, N(N({}, "".concat(g, "-show-count"), h), "".concat(g, "-textarea-allow-clear"), l))
    }),
    disabled: S,
    focused: j,
    className: se(y, We && "".concat(g, "-out-of-range")),
    style: V(V({}, m), Q && !_e ? {
      height: "auto"
    } : {}),
    dataAttrs: {
      affixWrapper: {
        "data-count": typeof ae == "string" ? ae : void 0
      }
    },
    hidden: E,
    readOnly: M,
    onClear: P
  }, /* @__PURE__ */ T.createElement(t1, De({}, F, {
    autoSize: I,
    maxLength: c,
    onKeyDown: Oe,
    onChange: ve,
    onFocus: U,
    onBlur: te,
    onCompositionStart: je,
    onCompositionEnd: Ce,
    className: se(x == null ? void 0 : x.textarea),
    style: V(V({}, w == null ? void 0 : w.textarea), {}, {
      resize: m == null ? void 0 : m.resize
    }),
    disabled: S,
    prefixCls: g,
    onResize: He,
    ref: fe,
    readOnly: M
  })));
}), a1 = { icon: { tag: "svg", attrs: { "fill-rule": "evenodd", viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" } }] }, name: "close-circle", theme: "filled" }, pu = /* @__PURE__ */ Go({});
function hm(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e);
}
function o1(e) {
  return hm(e) instanceof ShadowRoot;
}
function i1(e) {
  return o1(e) ? hm(e) : null;
}
function s1(e) {
  return e.replace(/-(.)/g, function(t, r) {
    return r.toUpperCase();
  });
}
function l1(e, t) {
  lt(e, "[@ant-design/icons] ".concat(t));
}
function wf(e) {
  return me(e) === "object" && typeof e.name == "string" && typeof e.theme == "string" && (me(e.icon) === "object" || typeof e.icon == "function");
}
function $f() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(e).reduce(function(t, r) {
    var n = e[r];
    switch (r) {
      case "class":
        t.className = n, delete t.class;
        break;
      default:
        delete t[r], t[s1(r)] = n;
    }
    return t;
  }, {});
}
function Hl(e, t, r) {
  return r ? /* @__PURE__ */ T.createElement(e.tag, V(V({
    key: t
  }, $f(e.attrs)), r), (e.children || []).map(function(n, a) {
    return Hl(n, "".concat(t, "-").concat(e.tag, "-").concat(a));
  })) : /* @__PURE__ */ T.createElement(e.tag, V({
    key: t
  }, $f(e.attrs)), (e.children || []).map(function(n, a) {
    return Hl(n, "".concat(t, "-").concat(e.tag, "-").concat(a));
  }));
}
function gm(e) {
  return Ta(e)[0];
}
function mm(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
var c1 = `
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
`, u1 = function(t) {
  var r = pr(pu), n = r.csp, a = r.prefixCls, o = r.layer, i = c1;
  a && (i = i.replace(/anticon/g, a)), o && (i = "@layer ".concat(o, ` {
`).concat(i, `
}`)), Ct(function() {
    var s = t.current, l = i1(s);
    cn(i, "@ant-design-icons", {
      prepend: !o,
      csp: n,
      attachTo: l
    });
  }, []);
}, d1 = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"], va = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function f1(e) {
  var t = e.primaryColor, r = e.secondaryColor;
  va.primaryColor = t, va.secondaryColor = r || gm(t), va.calculated = !!r;
}
function p1() {
  return V({}, va);
}
var Hn = function(t) {
  var r = t.icon, n = t.className, a = t.onClick, o = t.style, i = t.primaryColor, s = t.secondaryColor, l = er(t, d1), c = C.useRef(), u = va;
  if (i && (u = {
    primaryColor: i,
    secondaryColor: s || gm(i)
  }), u1(c), l1(wf(r), "icon should be icon definiton, but got ".concat(r)), !wf(r))
    return null;
  var d = r;
  return d && typeof d.icon == "function" && (d = V(V({}, d), {}, {
    icon: d.icon(u.primaryColor, u.secondaryColor)
  })), Hl(d.icon, "svg-".concat(d.name), V(V({
    className: n,
    onClick: a,
    style: o,
    "data-icon": d.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }, l), {}, {
    ref: c
  }));
};
Hn.displayName = "IconReact";
Hn.getTwoToneColors = p1;
Hn.setTwoToneColors = f1;
function vm(e) {
  var t = mm(e), r = he(t, 2), n = r[0], a = r[1];
  return Hn.setTwoToneColors({
    primaryColor: n,
    secondaryColor: a
  });
}
function h1() {
  var e = Hn.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var g1 = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
vm(No.primary);
var Ki = /* @__PURE__ */ C.forwardRef(function(e, t) {
  var r = e.className, n = e.icon, a = e.spin, o = e.rotate, i = e.tabIndex, s = e.onClick, l = e.twoToneColor, c = er(e, g1), u = C.useContext(pu), d = u.prefixCls, f = d === void 0 ? "anticon" : d, v = u.rootClassName, g = se(v, f, N(N({}, "".concat(f, "-").concat(n.name), !!n.name), "".concat(f, "-spin"), !!a || n.name === "loading"), r), h = i;
  h === void 0 && s && (h = -1);
  var p = o ? {
    msTransform: "rotate(".concat(o, "deg)"),
    transform: "rotate(".concat(o, "deg)")
  } : void 0, y = mm(l), m = he(y, 2), S = m[0], E = m[1];
  return /* @__PURE__ */ C.createElement("span", De({
    role: "img",
    "aria-label": n.name
  }, c, {
    ref: t,
    tabIndex: h,
    onClick: s,
    className: g
  }), /* @__PURE__ */ C.createElement(Hn, {
    icon: n,
    primaryColor: S,
    secondaryColor: E,
    style: p
  }));
});
Ki.displayName = "AntdIcon";
Ki.getTwoToneColor = h1;
Ki.setTwoToneColor = vm;
var m1 = function(t, r) {
  return /* @__PURE__ */ C.createElement(Ki, De({}, t, {
    ref: r,
    icon: a1
  }));
}, ym = /* @__PURE__ */ C.forwardRef(m1);
process.env.NODE_ENV !== "production" && (ym.displayName = "CloseCircleFilled");
const bm = (e) => {
  let t;
  return typeof e == "object" && (e != null && e.clearIcon) ? t = e : e && (t = {
    clearIcon: /* @__PURE__ */ T.createElement(ym, null)
  }), t;
};
function Vl(e, t, r) {
  return se({
    [`${e}-status-success`]: t === "success",
    [`${e}-status-warning`]: t === "warning",
    [`${e}-status-error`]: t === "error",
    [`${e}-status-validating`]: t === "validating",
    [`${e}-has-feedback`]: r
  });
}
const Sm = (e, t) => t || e;
function Em() {
}
let Rr = null;
function v1() {
  Rr = null, Pp();
}
let hu = Em;
process.env.NODE_ENV !== "production" && (hu = (e, t, r) => {
  lt(e, `[antd: ${t}] ${r}`), process.env.NODE_ENV === "test" && v1();
});
const xm = /* @__PURE__ */ C.createContext({}), pn = process.env.NODE_ENV !== "production" ? (e) => {
  const {
    strict: t
  } = C.useContext(xm), r = (n, a, o) => {
    if (!n)
      if (t === !1 && a === "deprecated") {
        const i = Rr;
        Rr || (Rr = {}), Rr[e] = Rr[e] || [], Rr[e].includes(o || "") || Rr[e].push(o || ""), i || console.warn("[antd] There exists deprecated usage in your code:", Rr);
      } else
        process.env.NODE_ENV !== "production" && hu(n, e, o);
  };
  return r.deprecated = (n, a, o, i) => {
    r(n, "deprecated", `\`${a}\` is deprecated. Please use \`${o}\` instead.${i ? ` ${i}` : ""}`);
  }, r;
} : () => {
  const e = () => {
  };
  return e.deprecated = Em, e;
}, Yi = hu, Bl = "ant", gu = "anticon", y1 = ["outlined", "borderless", "filled", "underlined"], b1 = (e, t) => t || (e ? `${Bl}-${e}` : Bl), Gr = /* @__PURE__ */ C.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: b1,
  iconPrefixCls: gu
}), {
  Consumer: UR
} = Gr, Tf = {};
function Cm(e) {
  const t = C.useContext(Gr), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: a
  } = t, o = t[e];
  return Object.assign(Object.assign({
    classNames: Tf,
    styles: Tf
  }, o), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: a
  });
}
const Aa = /* @__PURE__ */ C.createContext(!1), S1 = (e) => {
  let {
    children: t,
    disabled: r
  } = e;
  const n = C.useContext(Aa);
  return /* @__PURE__ */ C.createElement(Aa.Provider, {
    value: r ?? n
  }, t);
};
var _m = /* @__PURE__ */ wt(function e() {
  _t(this, e);
}), wm = "CALC_UNIT", E1 = new RegExp(wm, "g");
function Os(e) {
  return typeof e == "number" ? "".concat(e).concat(wm) : e;
}
var x1 = /* @__PURE__ */ function(e) {
  Yr(r, e);
  var t = Xr(r);
  function r(n, a) {
    var o;
    _t(this, r), o = t.call(this), N(Re(o), "result", ""), N(Re(o), "unitlessCssVar", void 0), N(Re(o), "lowPriority", void 0);
    var i = me(n);
    return o.unitlessCssVar = a, n instanceof r ? o.result = "(".concat(n.result, ")") : i === "number" ? o.result = Os(n) : i === "string" && (o.result = n), o;
  }
  return wt(r, [{
    key: "add",
    value: function(a) {
      return a instanceof r ? this.result = "".concat(this.result, " + ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " + ").concat(Os(a))), this.lowPriority = !0, this;
    }
  }, {
    key: "sub",
    value: function(a) {
      return a instanceof r ? this.result = "".concat(this.result, " - ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " - ").concat(Os(a))), this.lowPriority = !0, this;
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
      var o = this, i = a || {}, s = i.unit, l = !0;
      return typeof s == "boolean" ? l = s : Array.from(this.unitlessCssVar).some(function(c) {
        return o.result.includes(c);
      }) && (l = !1), this.result = this.result.replace(E1, l ? "px" : ""), typeof this.lowPriority < "u" ? "calc(".concat(this.result, ")") : this.result;
    }
  }]), r;
}(_m), C1 = /* @__PURE__ */ function(e) {
  Yr(r, e);
  var t = Xr(r);
  function r(n) {
    var a;
    return _t(this, r), a = t.call(this), N(Re(a), "result", 0), n instanceof r ? a.result = n.result : typeof n == "number" && (a.result = n), a;
  }
  return wt(r, [{
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
}(_m), _1 = function(t, r) {
  var n = t === "css" ? x1 : C1;
  return function(a) {
    return new n(a, r);
  };
}, Rf = function(t, r) {
  return "".concat([r, t.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-"));
};
function Af(e, t, r, n) {
  var a = V({}, t[e]);
  if (n != null && n.deprecatedTokens) {
    var o = n.deprecatedTokens;
    o.forEach(function(s) {
      var l = he(s, 2), c = l[0], u = l[1];
      if (process.env.NODE_ENV !== "production" && lt(!(a != null && a[c]), "Component Token `".concat(String(c), "` of ").concat(String(e), " is deprecated. Please use `").concat(String(u), "` instead.")), a != null && a[c] || a != null && a[u]) {
        var d;
        (d = a[u]) !== null && d !== void 0 || (a[u] = a == null ? void 0 : a[c]);
      }
    });
  }
  var i = V(V({}, r), a);
  return Object.keys(i).forEach(function(s) {
    i[s] === t[s] && delete i[s];
  }), i;
}
var $m = process.env.NODE_ENV !== "production" || typeof CSSINJS_STATISTIC < "u", Ul = !0;
function yn() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  if (!$m)
    return Object.assign.apply(Object, [{}].concat(t));
  Ul = !1;
  var n = {};
  return t.forEach(function(a) {
    if (me(a) === "object") {
      var o = Object.keys(a);
      o.forEach(function(i) {
        Object.defineProperty(n, i, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return a[i];
          }
        });
      });
    }
  }), Ul = !0, n;
}
var Pf = {};
function w1() {
}
var $1 = function(t) {
  var r, n = t, a = w1;
  return $m && typeof Proxy < "u" && (r = /* @__PURE__ */ new Set(), n = new Proxy(t, {
    get: function(i, s) {
      if (Ul) {
        var l;
        (l = r) === null || l === void 0 || l.add(s);
      }
      return i[s];
    }
  }), a = function(i, s) {
    var l;
    Pf[i] = {
      global: Array.from(r),
      component: V(V({}, (l = Pf[i]) === null || l === void 0 ? void 0 : l.component), s)
    };
  }), {
    token: n,
    keys: r,
    flush: a
  };
};
function Of(e, t, r) {
  if (typeof r == "function") {
    var n;
    return r(yn(t, (n = t[e]) !== null && n !== void 0 ? n : {}));
  }
  return r ?? {};
}
function T1(e) {
  return e === "js" ? {
    max: Math.max,
    min: Math.min
  } : {
    max: function() {
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      return "max(".concat(n.map(function(o) {
        return it(o);
      }).join(","), ")");
    },
    min: function() {
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      return "min(".concat(n.map(function(o) {
        return it(o);
      }).join(","), ")");
    }
  };
}
var R1 = 1e3 * 60 * 10, A1 = /* @__PURE__ */ function() {
  function e() {
    _t(this, e), N(this, "map", /* @__PURE__ */ new Map()), N(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), N(this, "nextID", 0), N(this, "lastAccessBeat", /* @__PURE__ */ new Map()), N(this, "accessBeat", 0);
  }
  return wt(e, [{
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
      var n = this, a = r.map(function(o) {
        return o && me(o) === "object" ? "obj_".concat(n.getObjectID(o)) : "".concat(me(o), "_").concat(o);
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
        this.lastAccessBeat.forEach(function(a, o) {
          n - a > R1 && (r.map.delete(o), r.lastAccessBeat.delete(o));
        }), this.accessBeat = 0;
      }
    }
  }]), e;
}(), kf = new A1();
function P1(e, t) {
  return T.useMemo(function() {
    var r = kf.get(t);
    if (r)
      return r;
    var n = e();
    return kf.set(t, n), n;
  }, t);
}
var O1 = function() {
  return {};
};
function k1(e) {
  var t = e.useCSP, r = t === void 0 ? O1 : t, n = e.useToken, a = e.usePrefix, o = e.getResetStyles, i = e.getCommonStyle, s = e.getCompUnitless;
  function l(f, v, g, h) {
    var p = Array.isArray(f) ? f[0] : f;
    function y(P) {
      return "".concat(String(p)).concat(P.slice(0, 1).toUpperCase()).concat(P.slice(1));
    }
    var m = (h == null ? void 0 : h.unitless) || {}, S = typeof s == "function" ? s(f) : {}, E = V(V({}, S), {}, N({}, y("zIndexPopup"), !0));
    Object.keys(m).forEach(function(P) {
      E[y(P)] = m[P];
    });
    var x = V(V({}, h), {}, {
      unitless: E,
      prefixToken: y
    }), w = u(f, v, g, x), b = c(p, g, x);
    return function(P) {
      var k = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : P, M = w(P, k), I = he(M, 2), D = I[1], F = b(k), B = he(F, 2), L = B[0], A = B[1];
      return [L, D, A];
    };
  }
  function c(f, v, g) {
    var h = g.unitless, p = g.injectStyle, y = p === void 0 ? !0 : p, m = g.prefixToken, S = g.ignore, E = function(b) {
      var P = b.rootCls, k = b.cssVar, M = k === void 0 ? {} : k, I = n(), D = I.realToken;
      return LE({
        path: [f],
        prefix: M.prefix,
        key: M.key,
        unitless: h,
        ignore: S,
        token: D,
        scope: P
      }, function() {
        var F = Of(f, D, v), B = Af(f, D, F, {
          deprecatedTokens: g == null ? void 0 : g.deprecatedTokens
        });
        return Object.keys(F).forEach(function(L) {
          B[m(L)] = B[L], delete B[L];
        }), B;
      }), null;
    }, x = function(b) {
      var P = n(), k = P.cssVar;
      return [function(M) {
        return y && k ? /* @__PURE__ */ T.createElement(T.Fragment, null, /* @__PURE__ */ T.createElement(E, {
          rootCls: b,
          cssVar: k,
          component: f
        }), M) : M;
      }, k == null ? void 0 : k.key];
    };
    return x;
  }
  function u(f, v, g) {
    var h = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, p = Array.isArray(f) ? f : [f, f], y = he(p, 1), m = y[0], S = p.join("-"), E = e.layer || {
      name: "antd"
    };
    return function(x) {
      var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : x, b = n(), P = b.theme, k = b.realToken, M = b.hashId, I = b.token, D = b.cssVar, F = a(), B = F.rootPrefixCls, L = F.iconPrefixCls, A = r(), O = D ? "css" : "js", R = P1(function() {
        var Z = /* @__PURE__ */ new Set();
        return D && Object.keys(h.unitless || {}).forEach(function(Y) {
          Z.add(To(Y, D.prefix)), Z.add(To(Y, Rf(m, D.prefix)));
        }), _1(O, Z);
      }, [O, m, D == null ? void 0 : D.prefix]), H = T1(O), z = H.max, j = H.min, W = {
        theme: P,
        token: I,
        hashId: M,
        nonce: function() {
          return A.nonce;
        },
        clientOnly: h.clientOnly,
        layer: E,
        // antd is always at top of styles
        order: h.order || -999
      };
      typeof o == "function" && dl(V(V({}, W), {}, {
        clientOnly: !1,
        path: ["Shared", B]
      }), function() {
        return o(I, {
          prefix: {
            rootPrefixCls: B,
            iconPrefixCls: L
          },
          csp: A
        });
      });
      var K = dl(V(V({}, W), {}, {
        path: [S, x, L]
      }), function() {
        if (h.injectStyle === !1)
          return [];
        var Z = $1(I), Y = Z.token, Q = Z.flush, le = Of(m, k, g), de = ".".concat(x), fe = Af(m, k, le, {
          deprecatedTokens: h.deprecatedTokens
        });
        D && le && me(le) === "object" && Object.keys(le).forEach(function(Me) {
          le[Me] = "var(".concat(To(Me, Rf(m, D.prefix)), ")");
        });
        var ge = yn(Y, {
          componentCls: de,
          prefixCls: x,
          iconCls: ".".concat(L),
          antCls: ".".concat(B),
          calc: R,
          // @ts-ignore
          max: z,
          // @ts-ignore
          min: j
        }, D ? le : fe), Se = v(ge, {
          hashId: M,
          prefixCls: x,
          rootPrefixCls: B,
          iconPrefixCls: L
        });
        Q(m, fe);
        var $e = typeof i == "function" ? i(ge, x, w, h.resetFont) : null;
        return [h.resetStyle === !1 ? null : $e, Se];
      });
      return [K, M];
    };
  }
  function d(f, v, g) {
    var h = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, p = u(f, v, g, V({
      resetStyle: !1,
      // Sub Style should default after root one
      order: -998
    }, h)), y = function(S) {
      var E = S.prefixCls, x = S.rootCls, w = x === void 0 ? E : x;
      return p(E, w), null;
    };
    return process.env.NODE_ENV !== "production" && (y.displayName = "SubStyle_".concat(String(Array.isArray(f) ? f.join(".") : f))), y;
  }
  return {
    genStyleHooks: l,
    genSubStyleComponent: d,
    genComponentStyleHook: u
  };
}
const Tm = function(e) {
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
}, M1 = () => ({
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
}), N1 = () => ({
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
}), I1 = (e) => ({
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
}), D1 = (e, t, r, n) => {
  const a = `[class^="${t}"], [class*=" ${t}"]`, o = r ? `.${r}` : a, i = {
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
    [o]: Object.assign(Object.assign(Object.assign({}, s), i), {
      [a]: i
    })
  };
}, Rm = (e) => ({
  [`.${e}`]: Object.assign(Object.assign({}, M1()), {
    [`.${e} .${e}-icon`]: {
      display: "block"
    }
  })
}), {
  genStyleHooks: mu
} = k1({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: t
    } = pr(Gr);
    return {
      rootPrefixCls: e(),
      iconPrefixCls: t
    };
  },
  useToken: () => {
    const [e, t, r, n, a] = Mi();
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
    } = pr(Gr);
    return e ?? {};
  },
  getResetStyles: (e, t) => {
    var r;
    const n = I1(e);
    return [n, {
      "&": n
    }, Rm((r = t == null ? void 0 : t.prefix.iconPrefixCls) !== null && r !== void 0 ? r : gu)];
  },
  getCommonStyle: D1,
  getCompUnitless: () => kc
}), F1 = (e, t) => {
  const [r, n] = Mi();
  return dl({
    token: n,
    hashId: "",
    path: ["ant-design-icons", e],
    nonce: () => t == null ? void 0 : t.nonce,
    layer: {
      name: "antd"
    }
  }, () => [Rm(e)]);
}, Am = (e) => {
  const [, , , , t] = Mi();
  return t ? `${e}-css-var` : "";
}, Ln = /* @__PURE__ */ C.createContext(void 0), L1 = (e) => {
  let {
    children: t,
    size: r
  } = e;
  const n = C.useContext(Ln);
  return /* @__PURE__ */ C.createElement(Ln.Provider, {
    value: r || n
  }, t);
}, Pm = (e) => {
  const t = T.useContext(Ln);
  return T.useMemo(() => e ? typeof e == "string" ? e ?? t : typeof e == "function" ? e(t) : t : t, [e, t]);
};
function mr() {
  mr = function() {
    return t;
  };
  var e, t = {}, r = Object.prototype, n = r.hasOwnProperty, a = Object.defineProperty || function(A, O, R) {
    A[O] = R.value;
  }, o = typeof Symbol == "function" ? Symbol : {}, i = o.iterator || "@@iterator", s = o.asyncIterator || "@@asyncIterator", l = o.toStringTag || "@@toStringTag";
  function c(A, O, R) {
    return Object.defineProperty(A, O, {
      value: R,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), A[O];
  }
  try {
    c({}, "");
  } catch {
    c = function(R, H, z) {
      return R[H] = z;
    };
  }
  function u(A, O, R, H) {
    var z = O && O.prototype instanceof y ? O : y, j = Object.create(z.prototype), W = new B(H || []);
    return a(j, "_invoke", {
      value: M(A, R, W)
    }), j;
  }
  function d(A, O, R) {
    try {
      return {
        type: "normal",
        arg: A.call(O, R)
      };
    } catch (H) {
      return {
        type: "throw",
        arg: H
      };
    }
  }
  t.wrap = u;
  var f = "suspendedStart", v = "suspendedYield", g = "executing", h = "completed", p = {};
  function y() {
  }
  function m() {
  }
  function S() {
  }
  var E = {};
  c(E, i, function() {
    return this;
  });
  var x = Object.getPrototypeOf, w = x && x(x(L([])));
  w && w !== r && n.call(w, i) && (E = w);
  var b = S.prototype = y.prototype = Object.create(E);
  function P(A) {
    ["next", "throw", "return"].forEach(function(O) {
      c(A, O, function(R) {
        return this._invoke(O, R);
      });
    });
  }
  function k(A, O) {
    function R(z, j, W, K) {
      var Z = d(A[z], A, j);
      if (Z.type !== "throw") {
        var Y = Z.arg, Q = Y.value;
        return Q && me(Q) == "object" && n.call(Q, "__await") ? O.resolve(Q.__await).then(function(le) {
          R("next", le, W, K);
        }, function(le) {
          R("throw", le, W, K);
        }) : O.resolve(Q).then(function(le) {
          Y.value = le, W(Y);
        }, function(le) {
          return R("throw", le, W, K);
        });
      }
      K(Z.arg);
    }
    var H;
    a(this, "_invoke", {
      value: function(j, W) {
        function K() {
          return new O(function(Z, Y) {
            R(j, W, Z, Y);
          });
        }
        return H = H ? H.then(K, K) : K();
      }
    });
  }
  function M(A, O, R) {
    var H = f;
    return function(z, j) {
      if (H === g) throw Error("Generator is already running");
      if (H === h) {
        if (z === "throw") throw j;
        return {
          value: e,
          done: !0
        };
      }
      for (R.method = z, R.arg = j; ; ) {
        var W = R.delegate;
        if (W) {
          var K = I(W, R);
          if (K) {
            if (K === p) continue;
            return K;
          }
        }
        if (R.method === "next") R.sent = R._sent = R.arg;
        else if (R.method === "throw") {
          if (H === f) throw H = h, R.arg;
          R.dispatchException(R.arg);
        } else R.method === "return" && R.abrupt("return", R.arg);
        H = g;
        var Z = d(A, O, R);
        if (Z.type === "normal") {
          if (H = R.done ? h : v, Z.arg === p) continue;
          return {
            value: Z.arg,
            done: R.done
          };
        }
        Z.type === "throw" && (H = h, R.method = "throw", R.arg = Z.arg);
      }
    };
  }
  function I(A, O) {
    var R = O.method, H = A.iterator[R];
    if (H === e) return O.delegate = null, R === "throw" && A.iterator.return && (O.method = "return", O.arg = e, I(A, O), O.method === "throw") || R !== "return" && (O.method = "throw", O.arg = new TypeError("The iterator does not provide a '" + R + "' method")), p;
    var z = d(H, A.iterator, O.arg);
    if (z.type === "throw") return O.method = "throw", O.arg = z.arg, O.delegate = null, p;
    var j = z.arg;
    return j ? j.done ? (O[A.resultName] = j.value, O.next = A.nextLoc, O.method !== "return" && (O.method = "next", O.arg = e), O.delegate = null, p) : j : (O.method = "throw", O.arg = new TypeError("iterator result is not an object"), O.delegate = null, p);
  }
  function D(A) {
    var O = {
      tryLoc: A[0]
    };
    1 in A && (O.catchLoc = A[1]), 2 in A && (O.finallyLoc = A[2], O.afterLoc = A[3]), this.tryEntries.push(O);
  }
  function F(A) {
    var O = A.completion || {};
    O.type = "normal", delete O.arg, A.completion = O;
  }
  function B(A) {
    this.tryEntries = [{
      tryLoc: "root"
    }], A.forEach(D, this), this.reset(!0);
  }
  function L(A) {
    if (A || A === "") {
      var O = A[i];
      if (O) return O.call(A);
      if (typeof A.next == "function") return A;
      if (!isNaN(A.length)) {
        var R = -1, H = function z() {
          for (; ++R < A.length; ) if (n.call(A, R)) return z.value = A[R], z.done = !1, z;
          return z.value = e, z.done = !0, z;
        };
        return H.next = H;
      }
    }
    throw new TypeError(me(A) + " is not iterable");
  }
  return m.prototype = S, a(b, "constructor", {
    value: S,
    configurable: !0
  }), a(S, "constructor", {
    value: m,
    configurable: !0
  }), m.displayName = c(S, l, "GeneratorFunction"), t.isGeneratorFunction = function(A) {
    var O = typeof A == "function" && A.constructor;
    return !!O && (O === m || (O.displayName || O.name) === "GeneratorFunction");
  }, t.mark = function(A) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(A, S) : (A.__proto__ = S, c(A, l, "GeneratorFunction")), A.prototype = Object.create(b), A;
  }, t.awrap = function(A) {
    return {
      __await: A
    };
  }, P(k.prototype), c(k.prototype, s, function() {
    return this;
  }), t.AsyncIterator = k, t.async = function(A, O, R, H, z) {
    z === void 0 && (z = Promise);
    var j = new k(u(A, O, R, H), z);
    return t.isGeneratorFunction(O) ? j : j.next().then(function(W) {
      return W.done ? W.value : j.next();
    });
  }, P(b), c(b, l, "Generator"), c(b, i, function() {
    return this;
  }), c(b, "toString", function() {
    return "[object Generator]";
  }), t.keys = function(A) {
    var O = Object(A), R = [];
    for (var H in O) R.push(H);
    return R.reverse(), function z() {
      for (; R.length; ) {
        var j = R.pop();
        if (j in O) return z.value = j, z.done = !1, z;
      }
      return z.done = !0, z;
    };
  }, t.values = L, B.prototype = {
    constructor: B,
    reset: function(O) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(F), !O) for (var R in this) R.charAt(0) === "t" && n.call(this, R) && !isNaN(+R.slice(1)) && (this[R] = e);
    },
    stop: function() {
      this.done = !0;
      var O = this.tryEntries[0].completion;
      if (O.type === "throw") throw O.arg;
      return this.rval;
    },
    dispatchException: function(O) {
      if (this.done) throw O;
      var R = this;
      function H(Y, Q) {
        return W.type = "throw", W.arg = O, R.next = Y, Q && (R.method = "next", R.arg = e), !!Q;
      }
      for (var z = this.tryEntries.length - 1; z >= 0; --z) {
        var j = this.tryEntries[z], W = j.completion;
        if (j.tryLoc === "root") return H("end");
        if (j.tryLoc <= this.prev) {
          var K = n.call(j, "catchLoc"), Z = n.call(j, "finallyLoc");
          if (K && Z) {
            if (this.prev < j.catchLoc) return H(j.catchLoc, !0);
            if (this.prev < j.finallyLoc) return H(j.finallyLoc);
          } else if (K) {
            if (this.prev < j.catchLoc) return H(j.catchLoc, !0);
          } else {
            if (!Z) throw Error("try statement without catch or finally");
            if (this.prev < j.finallyLoc) return H(j.finallyLoc);
          }
        }
      }
    },
    abrupt: function(O, R) {
      for (var H = this.tryEntries.length - 1; H >= 0; --H) {
        var z = this.tryEntries[H];
        if (z.tryLoc <= this.prev && n.call(z, "finallyLoc") && this.prev < z.finallyLoc) {
          var j = z;
          break;
        }
      }
      j && (O === "break" || O === "continue") && j.tryLoc <= R && R <= j.finallyLoc && (j = null);
      var W = j ? j.completion : {};
      return W.type = O, W.arg = R, j ? (this.method = "next", this.next = j.finallyLoc, p) : this.complete(W);
    },
    complete: function(O, R) {
      if (O.type === "throw") throw O.arg;
      return O.type === "break" || O.type === "continue" ? this.next = O.arg : O.type === "return" ? (this.rval = this.arg = O.arg, this.method = "return", this.next = "end") : O.type === "normal" && R && (this.next = R), p;
    },
    finish: function(O) {
      for (var R = this.tryEntries.length - 1; R >= 0; --R) {
        var H = this.tryEntries[R];
        if (H.finallyLoc === O) return this.complete(H.completion, H.afterLoc), F(H), p;
      }
    },
    catch: function(O) {
      for (var R = this.tryEntries.length - 1; R >= 0; --R) {
        var H = this.tryEntries[R];
        if (H.tryLoc === O) {
          var z = H.completion;
          if (z.type === "throw") {
            var j = z.arg;
            F(H);
          }
          return j;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function(O, R, H) {
      return this.delegate = {
        iterator: L(O),
        resultName: R,
        nextLoc: H
      }, this.method === "next" && (this.arg = e), p;
    }
  }, t;
}
function Mf(e, t, r, n, a, o, i) {
  try {
    var s = e[o](i), l = s.value;
  } catch (c) {
    return void r(c);
  }
  s.done ? t(l) : Promise.resolve(l).then(n, a);
}
function Qa(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(n, a) {
      var o = e.apply(t, r);
      function i(l) {
        Mf(o, n, a, i, s, "next", l);
      }
      function s(l) {
        Mf(o, n, a, i, s, "throw", l);
      }
      i(void 0);
    });
  };
}
var sn = "RC_FORM_INTERNAL_HOOKS", et = function() {
  lt(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, jn = /* @__PURE__ */ C.createContext({
  getFieldValue: et,
  getFieldsValue: et,
  getFieldError: et,
  getFieldWarning: et,
  getFieldsError: et,
  isFieldsTouched: et,
  isFieldTouched: et,
  isFieldValidating: et,
  isFieldsValidating: et,
  resetFields: et,
  setFields: et,
  setFieldValue: et,
  setFieldsValue: et,
  validateFields: et,
  submit: et,
  getInternalHooks: function() {
    return et(), {
      dispatch: et,
      initEntityValue: et,
      registerField: et,
      useSubscribe: et,
      setInitialValues: et,
      destroyForm: et,
      setCallbacks: et,
      registerWatch: et,
      getFields: et,
      setValidateMessages: et,
      setPreserve: et,
      getInitialValue: et
    };
  }
}), Uo = /* @__PURE__ */ C.createContext(null);
function Wl(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function j1(e) {
  return e && !!e._init;
}
function ql() {
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
var Gl = ql();
function z1(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
function H1(e, t, r) {
  if (pc()) return Reflect.construct.apply(null, arguments);
  var n = [null];
  n.push.apply(n, t);
  var a = new (e.bind.apply(e, n))();
  return r && Sa(a, r.prototype), a;
}
function Kl(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Kl = function(n) {
    if (n === null || !z1(n)) return n;
    if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
    if (t !== void 0) {
      if (t.has(n)) return t.get(n);
      t.set(n, a);
    }
    function a() {
      return H1(n, arguments, Ea(this).constructor);
    }
    return a.prototype = Object.create(n.prototype, {
      constructor: {
        value: a,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), Sa(a, n);
  }, Kl(e);
}
var V1 = /%[sdj%]/g, Om = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (Om = function(t, r) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && r.every(function(n) {
    return typeof n == "string";
  }) && console.warn(t, r);
});
function Yl(e) {
  if (!e || !e.length) return null;
  var t = {};
  return e.forEach(function(r) {
    var n = r.field;
    t[n] = t[n] || [], t[n].push(r);
  }), t;
}
function Yt(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  var a = 0, o = r.length;
  if (typeof e == "function")
    return e.apply(null, r);
  if (typeof e == "string") {
    var i = e.replace(V1, function(s) {
      if (s === "%%")
        return "%";
      if (a >= o)
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
    return i;
  }
  return e;
}
function B1(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function St(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || B1(t) && typeof e == "string" && !e);
}
function U1(e, t, r) {
  var n = [], a = 0, o = e.length;
  function i(s) {
    n.push.apply(n, xe(s || [])), a++, a === o && r(n);
  }
  e.forEach(function(s) {
    t(s, i);
  });
}
function Nf(e, t, r) {
  var n = 0, a = e.length;
  function o(i) {
    if (i && i.length) {
      r(i);
      return;
    }
    var s = n;
    n = n + 1, s < a ? t(e[s], o) : r([]);
  }
  o([]);
}
function W1(e) {
  var t = [];
  return Object.keys(e).forEach(function(r) {
    t.push.apply(t, xe(e[r] || []));
  }), t;
}
var If = /* @__PURE__ */ function(e) {
  Yr(r, e);
  var t = Xr(r);
  function r(n, a) {
    var o;
    return _t(this, r), o = t.call(this, "Async Validation Error"), N(Re(o), "errors", void 0), N(Re(o), "fields", void 0), o.errors = n, o.fields = a, o;
  }
  return wt(r);
}(/* @__PURE__ */ Kl(Error));
function q1(e, t, r, n, a) {
  if (t.first) {
    var o = new Promise(function(f, v) {
      var g = function(y) {
        return n(y), y.length ? v(new If(y, Yl(y))) : f(a);
      }, h = W1(e);
      Nf(h, r, g);
    });
    return o.catch(function(f) {
      return f;
    }), o;
  }
  var i = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], s = Object.keys(e), l = s.length, c = 0, u = [], d = new Promise(function(f, v) {
    var g = function(p) {
      if (u.push.apply(u, p), c++, c === l)
        return n(u), u.length ? v(new If(u, Yl(u))) : f(a);
    };
    s.length || (n(u), f(a)), s.forEach(function(h) {
      var p = e[h];
      i.indexOf(h) !== -1 ? Nf(p, r, g) : U1(p, r, g);
    });
  });
  return d.catch(function(f) {
    return f;
  }), d;
}
function G1(e) {
  return !!(e && e.message !== void 0);
}
function K1(e, t) {
  for (var r = e, n = 0; n < t.length; n++) {
    if (r == null)
      return r;
    r = r[t[n]];
  }
  return r;
}
function Df(e, t) {
  return function(r) {
    var n;
    return e.fullFields ? n = K1(t, e.fullFields) : n = t[r.field || e.fullField], G1(r) ? (r.field = r.field || e.fullField, r.fieldValue = n, r) : {
      message: typeof r == "function" ? r() : r,
      fieldValue: n,
      field: r.field || e.fullField
    };
  };
}
function Ff(e, t) {
  if (t) {
    for (var r in t)
      if (t.hasOwnProperty(r)) {
        var n = t[r];
        me(n) === "object" && me(e[r]) === "object" ? e[r] = V(V({}, e[r]), n) : e[r] = n;
      }
  }
  return e;
}
var wn = "enum", Y1 = function(t, r, n, a, o) {
  t[wn] = Array.isArray(t[wn]) ? t[wn] : [], t[wn].indexOf(r) === -1 && a.push(Yt(o.messages[wn], t.fullField, t[wn].join(", ")));
}, X1 = function(t, r, n, a, o) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(r) || a.push(Yt(o.messages.pattern.mismatch, t.fullField, r, t.pattern));
    else if (typeof t.pattern == "string") {
      var i = new RegExp(t.pattern);
      i.test(r) || a.push(Yt(o.messages.pattern.mismatch, t.fullField, r, t.pattern));
    }
  }
}, Z1 = function(t, r, n, a, o) {
  var i = typeof t.len == "number", s = typeof t.min == "number", l = typeof t.max == "number", c = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, u = r, d = null, f = typeof r == "number", v = typeof r == "string", g = Array.isArray(r);
  if (f ? d = "number" : v ? d = "string" : g && (d = "array"), !d)
    return !1;
  g && (u = r.length), v && (u = r.replace(c, "_").length), i ? u !== t.len && a.push(Yt(o.messages[d].len, t.fullField, t.len)) : s && !l && u < t.min ? a.push(Yt(o.messages[d].min, t.fullField, t.min)) : l && !s && u > t.max ? a.push(Yt(o.messages[d].max, t.fullField, t.max)) : s && l && (u < t.min || u > t.max) && a.push(Yt(o.messages[d].range, t.fullField, t.min, t.max));
}, km = function(t, r, n, a, o, i) {
  t.required && (!n.hasOwnProperty(t.field) || St(r, i || t.type)) && a.push(Yt(o.messages.required, t.fullField));
}, So;
const Q1 = function() {
  if (So)
    return So;
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
  ], o = "(?:%[0-9a-zA-Z]{1,})?", i = "(?:".concat(a.join("|"), ")").concat(o), s = new RegExp("(?:^".concat(r, "$)|(?:^").concat(i, "$)")), l = new RegExp("^".concat(r, "$")), c = new RegExp("^".concat(i, "$")), u = function(w) {
    return w && w.exact ? s : new RegExp("(?:".concat(t(w)).concat(r).concat(t(w), ")|(?:").concat(t(w)).concat(i).concat(t(w), ")"), "g");
  };
  u.v4 = function(x) {
    return x && x.exact ? l : new RegExp("".concat(t(x)).concat(r).concat(t(x)), "g");
  }, u.v6 = function(x) {
    return x && x.exact ? c : new RegExp("".concat(t(x)).concat(i).concat(t(x)), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", v = u.v4().source, g = u.v6().source, h = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", p = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", y = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", m = "(?::\\d{2,5})?", S = '(?:[/?#][^\\s"]*)?', E = "(?:".concat(d, "|www\\.)").concat(f, "(?:localhost|").concat(v, "|").concat(g, "|").concat(h).concat(p).concat(y, ")").concat(m).concat(S);
  return So = new RegExp("(?:^".concat(E, "$)"), "i"), So;
};
var Lf = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, sa = {
  integer: function(t) {
    return sa.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return sa.number(t) && !sa.integer(t);
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
    return me(t) === "object" && !sa.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(Lf.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(Q1());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(Lf.hex);
  }
}, J1 = function(t, r, n, a, o) {
  if (t.required && r === void 0) {
    km(t, r, n, a, o);
    return;
  }
  var i = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = t.type;
  i.indexOf(s) > -1 ? sa[s](r) || a.push(Yt(o.messages.types[s], t.fullField, t.type)) : s && me(r) !== t.type && a.push(Yt(o.messages.types[s], t.fullField, t.type));
}, eT = function(t, r, n, a, o) {
  (/^\s+$/.test(r) || r === "") && a.push(Yt(o.messages.whitespace, t.fullField));
};
const Fe = {
  required: km,
  whitespace: eT,
  type: J1,
  range: Z1,
  enum: Y1,
  pattern: X1
};
var tT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (St(r) && !t.required)
      return n();
    Fe.required(t, r, a, i, o);
  }
  n(i);
}, rT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (r == null && !t.required)
      return n();
    Fe.required(t, r, a, i, o, "array"), r != null && (Fe.type(t, r, a, i, o), Fe.range(t, r, a, i, o));
  }
  n(i);
}, nT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (St(r) && !t.required)
      return n();
    Fe.required(t, r, a, i, o), r !== void 0 && Fe.type(t, r, a, i, o);
  }
  n(i);
}, aT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (St(r, "date") && !t.required)
      return n();
    if (Fe.required(t, r, a, i, o), !St(r, "date")) {
      var l;
      r instanceof Date ? l = r : l = new Date(r), Fe.type(t, l, a, i, o), l && Fe.range(t, l.getTime(), a, i, o);
    }
  }
  n(i);
}, oT = "enum", iT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (St(r) && !t.required)
      return n();
    Fe.required(t, r, a, i, o), r !== void 0 && Fe[oT](t, r, a, i, o);
  }
  n(i);
}, sT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (St(r) && !t.required)
      return n();
    Fe.required(t, r, a, i, o), r !== void 0 && (Fe.type(t, r, a, i, o), Fe.range(t, r, a, i, o));
  }
  n(i);
}, lT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (St(r) && !t.required)
      return n();
    Fe.required(t, r, a, i, o), r !== void 0 && (Fe.type(t, r, a, i, o), Fe.range(t, r, a, i, o));
  }
  n(i);
}, cT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (St(r) && !t.required)
      return n();
    Fe.required(t, r, a, i, o), r !== void 0 && Fe.type(t, r, a, i, o);
  }
  n(i);
}, uT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (r === "" && (r = void 0), St(r) && !t.required)
      return n();
    Fe.required(t, r, a, i, o), r !== void 0 && (Fe.type(t, r, a, i, o), Fe.range(t, r, a, i, o));
  }
  n(i);
}, dT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (St(r) && !t.required)
      return n();
    Fe.required(t, r, a, i, o), r !== void 0 && Fe.type(t, r, a, i, o);
  }
  n(i);
}, fT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (St(r, "string") && !t.required)
      return n();
    Fe.required(t, r, a, i, o), St(r, "string") || Fe.pattern(t, r, a, i, o);
  }
  n(i);
}, pT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (St(r) && !t.required)
      return n();
    Fe.required(t, r, a, i, o), St(r) || Fe.type(t, r, a, i, o);
  }
  n(i);
}, hT = function(t, r, n, a, o) {
  var i = [], s = Array.isArray(r) ? "array" : me(r);
  Fe.required(t, r, a, i, o, s), n(i);
}, gT = function(t, r, n, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (St(r, "string") && !t.required)
      return n();
    Fe.required(t, r, a, i, o, "string"), St(r, "string") || (Fe.type(t, r, a, i, o), Fe.range(t, r, a, i, o), Fe.pattern(t, r, a, i, o), t.whitespace === !0 && Fe.whitespace(t, r, a, i, o));
  }
  n(i);
}, ks = function(t, r, n, a, o) {
  var i = t.type, s = [], l = t.required || !t.required && a.hasOwnProperty(t.field);
  if (l) {
    if (St(r, i) && !t.required)
      return n();
    Fe.required(t, r, a, s, o, i), St(r, i) || Fe.type(t, r, a, s, o);
  }
  n(s);
};
const ya = {
  string: gT,
  method: cT,
  number: uT,
  boolean: nT,
  regexp: pT,
  integer: lT,
  float: sT,
  array: rT,
  object: dT,
  enum: iT,
  pattern: fT,
  date: aT,
  url: ks,
  hex: ks,
  email: ks,
  required: hT,
  any: tT
};
var Ja = /* @__PURE__ */ function() {
  function e(t) {
    _t(this, e), N(this, "rules", null), N(this, "_messages", Gl), this.define(t);
  }
  return wt(e, [{
    key: "define",
    value: function(r) {
      var n = this;
      if (!r)
        throw new Error("Cannot configure a schema with no rules");
      if (me(r) !== "object" || Array.isArray(r))
        throw new Error("Rules must be an object");
      this.rules = {}, Object.keys(r).forEach(function(a) {
        var o = r[a];
        n.rules[a] = Array.isArray(o) ? o : [o];
      });
    }
  }, {
    key: "messages",
    value: function(r) {
      return r && (this._messages = Ff(ql(), r)), this._messages;
    }
  }, {
    key: "validate",
    value: function(r) {
      var n = this, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
      }, i = r, s = a, l = o;
      if (typeof s == "function" && (l = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
        return l && l(null, i), Promise.resolve(i);
      function c(g) {
        var h = [], p = {};
        function y(S) {
          if (Array.isArray(S)) {
            var E;
            h = (E = h).concat.apply(E, xe(S));
          } else
            h.push(S);
        }
        for (var m = 0; m < g.length; m++)
          y(g[m]);
        h.length ? (p = Yl(h), l(h, p)) : l(null, i);
      }
      if (s.messages) {
        var u = this.messages();
        u === Gl && (u = ql()), Ff(u, s.messages), s.messages = u;
      } else
        s.messages = this.messages();
      var d = {}, f = s.keys || Object.keys(this.rules);
      f.forEach(function(g) {
        var h = n.rules[g], p = i[g];
        h.forEach(function(y) {
          var m = y;
          typeof m.transform == "function" && (i === r && (i = V({}, i)), p = i[g] = m.transform(p), p != null && (m.type = m.type || (Array.isArray(p) ? "array" : me(p)))), typeof m == "function" ? m = {
            validator: m
          } : m = V({}, m), m.validator = n.getValidationMethod(m), m.validator && (m.field = g, m.fullField = m.fullField || g, m.type = n.getType(m), d[g] = d[g] || [], d[g].push({
            rule: m,
            value: p,
            source: i,
            field: g
          }));
        });
      });
      var v = {};
      return q1(d, s, function(g, h) {
        var p = g.rule, y = (p.type === "object" || p.type === "array") && (me(p.fields) === "object" || me(p.defaultField) === "object");
        y = y && (p.required || !p.required && g.value), p.field = g.field;
        function m(b, P) {
          return V(V({}, P), {}, {
            fullField: "".concat(p.fullField, ".").concat(b),
            fullFields: p.fullFields ? [].concat(xe(p.fullFields), [b]) : [b]
          });
        }
        function S() {
          var b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], P = Array.isArray(b) ? b : [b];
          !s.suppressWarning && P.length && e.warning("async-validator:", P), P.length && p.message !== void 0 && (P = [].concat(p.message));
          var k = P.map(Df(p, i));
          if (s.first && k.length)
            return v[p.field] = 1, h(k);
          if (!y)
            h(k);
          else {
            if (p.required && !g.value)
              return p.message !== void 0 ? k = [].concat(p.message).map(Df(p, i)) : s.error && (k = [s.error(p, Yt(s.messages.required, p.field))]), h(k);
            var M = {};
            p.defaultField && Object.keys(g.value).map(function(F) {
              M[F] = p.defaultField;
            }), M = V(V({}, M), g.rule.fields);
            var I = {};
            Object.keys(M).forEach(function(F) {
              var B = M[F], L = Array.isArray(B) ? B : [B];
              I[F] = L.map(m.bind(null, F));
            });
            var D = new e(I);
            D.messages(s.messages), g.rule.options && (g.rule.options.messages = s.messages, g.rule.options.error = s.error), D.validate(g.value, g.rule.options || s, function(F) {
              var B = [];
              k && k.length && B.push.apply(B, xe(k)), F && F.length && B.push.apply(B, xe(F)), h(B.length ? B : null);
            });
          }
        }
        var E;
        if (p.asyncValidator)
          E = p.asyncValidator(p, g.value, S, g.source, s);
        else if (p.validator) {
          try {
            E = p.validator(p, g.value, S, g.source, s);
          } catch (b) {
            var x, w;
            (x = (w = console).error) === null || x === void 0 || x.call(w, b), s.suppressValidatorError || setTimeout(function() {
              throw b;
            }, 0), S(b.message);
          }
          E === !0 ? S() : E === !1 ? S(typeof p.message == "function" ? p.message(p.fullField || p.field) : p.message || "".concat(p.fullField || p.field, " fails")) : E instanceof Array ? S(E) : E instanceof Error && S(E.message);
        }
        E && E.then && E.then(function() {
          return S();
        }, function(b) {
          return S(b);
        });
      }, function(g) {
        c(g);
      }, i);
    }
  }, {
    key: "getType",
    value: function(r) {
      if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !ya.hasOwnProperty(r.type))
        throw new Error(Yt("Unknown rule type %s", r.type));
      return r.type || "string";
    }
  }, {
    key: "getValidationMethod",
    value: function(r) {
      if (typeof r.validator == "function")
        return r.validator;
      var n = Object.keys(r), a = n.indexOf("message");
      return a !== -1 && n.splice(a, 1), n.length === 1 && n[0] === "required" ? ya.required : ya[this.getType(r)] || void 0;
    }
  }]), e;
}();
N(Ja, "register", function(t, r) {
  if (typeof r != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  ya[t] = r;
});
N(Ja, "warning", Om);
N(Ja, "messages", Gl);
N(Ja, "validators", ya);
var Gt = "'${name}' is not a valid ${type}", Mm = {
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
    string: Gt,
    method: Gt,
    array: Gt,
    object: Gt,
    number: Gt,
    date: Gt,
    boolean: Gt,
    integer: Gt,
    float: Gt,
    regexp: Gt,
    email: Gt,
    url: Gt,
    hex: Gt
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
}, jf = Ja;
function mT(e, t) {
  return e.replace(/\\?\$\{\w+\}/g, function(r) {
    if (r.startsWith("\\"))
      return r.slice(1);
    var n = r.slice(2, -1);
    return t[n];
  });
}
var zf = "CODE_LOGIC_ERROR";
function Xl(e, t, r, n, a) {
  return Zl.apply(this, arguments);
}
function Zl() {
  return Zl = Qa(/* @__PURE__ */ mr().mark(function e(t, r, n, a, o) {
    var i, s, l, c, u, d, f, v, g;
    return mr().wrap(function(p) {
      for (; ; ) switch (p.prev = p.next) {
        case 0:
          return i = V({}, n), delete i.ruleIndex, jf.warning = function() {
          }, i.validator && (s = i.validator, i.validator = function() {
            try {
              return s.apply(void 0, arguments);
            } catch (y) {
              return console.error(y), Promise.reject(zf);
            }
          }), l = null, i && i.type === "array" && i.defaultField && (l = i.defaultField, delete i.defaultField), c = new jf(N({}, t, [i])), u = Tn(Mm, a.validateMessages), c.messages(u), d = [], p.prev = 10, p.next = 13, Promise.resolve(c.validate(N({}, t, r), V({}, a)));
        case 13:
          p.next = 18;
          break;
        case 15:
          p.prev = 15, p.t0 = p.catch(10), p.t0.errors && (d = p.t0.errors.map(function(y, m) {
            var S = y.message, E = S === zf ? u.default : S;
            return /* @__PURE__ */ C.isValidElement(E) ? (
              // Wrap ReactNode with `key`
              /* @__PURE__ */ C.cloneElement(E, {
                key: "error_".concat(m)
              })
            ) : E;
          }));
        case 18:
          if (!(!d.length && l)) {
            p.next = 23;
            break;
          }
          return p.next = 21, Promise.all(r.map(function(y, m) {
            return Xl("".concat(t, ".").concat(m), y, l, a, o);
          }));
        case 21:
          return f = p.sent, p.abrupt("return", f.reduce(function(y, m) {
            return [].concat(xe(y), xe(m));
          }, []));
        case 23:
          return v = V(V({}, n), {}, {
            name: t,
            enum: (n.enum || []).join(", ")
          }, o), g = d.map(function(y) {
            return typeof y == "string" ? mT(y, v) : y;
          }), p.abrupt("return", g);
        case 26:
        case "end":
          return p.stop();
      }
    }, e, null, [[10, 15]]);
  })), Zl.apply(this, arguments);
}
function vT(e, t, r, n, a, o) {
  var i = e.join("."), s = r.map(function(u, d) {
    var f = u.validator, v = V(V({}, u), {}, {
      ruleIndex: d
    });
    return f && (v.validator = function(g, h, p) {
      var y = !1, m = function() {
        for (var x = arguments.length, w = new Array(x), b = 0; b < x; b++)
          w[b] = arguments[b];
        Promise.resolve().then(function() {
          lt(!y, "Your validator function has already return a promise. `callback` will be ignored."), y || p.apply(void 0, w);
        });
      }, S = f(g, h, m);
      y = S && typeof S.then == "function" && typeof S.catch == "function", lt(y, "`callback` is deprecated. Please return a promise instead."), y && S.then(function() {
        p();
      }).catch(function(E) {
        p(E || " ");
      });
    }), v;
  }).sort(function(u, d) {
    var f = u.warningOnly, v = u.ruleIndex, g = d.warningOnly, h = d.ruleIndex;
    return !!f == !!g ? v - h : f ? 1 : -1;
  }), l;
  if (a === !0)
    l = new Promise(/* @__PURE__ */ function() {
      var u = Qa(/* @__PURE__ */ mr().mark(function d(f, v) {
        var g, h, p;
        return mr().wrap(function(m) {
          for (; ; ) switch (m.prev = m.next) {
            case 0:
              g = 0;
            case 1:
              if (!(g < s.length)) {
                m.next = 12;
                break;
              }
              return h = s[g], m.next = 5, Xl(i, t, h, n, o);
            case 5:
              if (p = m.sent, !p.length) {
                m.next = 9;
                break;
              }
              return v([{
                errors: p,
                rule: h
              }]), m.abrupt("return");
            case 9:
              g += 1, m.next = 1;
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
        return u.apply(this, arguments);
      };
    }());
  else {
    var c = s.map(function(u) {
      return Xl(i, t, u, n, o).then(function(d) {
        return {
          errors: d,
          rule: u
        };
      });
    });
    l = (a ? bT(c) : yT(c)).then(function(u) {
      return Promise.reject(u);
    });
  }
  return l.catch(function(u) {
    return u;
  }), l;
}
function yT(e) {
  return Ql.apply(this, arguments);
}
function Ql() {
  return Ql = Qa(/* @__PURE__ */ mr().mark(function e(t) {
    return mr().wrap(function(n) {
      for (; ; ) switch (n.prev = n.next) {
        case 0:
          return n.abrupt("return", Promise.all(t).then(function(a) {
            var o, i = (o = []).concat.apply(o, xe(a));
            return i;
          }));
        case 1:
        case "end":
          return n.stop();
      }
    }, e);
  })), Ql.apply(this, arguments);
}
function bT(e) {
  return Jl.apply(this, arguments);
}
function Jl() {
  return Jl = Qa(/* @__PURE__ */ mr().mark(function e(t) {
    var r;
    return mr().wrap(function(a) {
      for (; ; ) switch (a.prev = a.next) {
        case 0:
          return r = 0, a.abrupt("return", new Promise(function(o) {
            t.forEach(function(i) {
              i.then(function(s) {
                s.errors.length && o([s]), r += 1, r === t.length && o([]);
              });
            });
          }));
        case 2:
        case "end":
          return a.stop();
      }
    }, e);
  })), Jl.apply(this, arguments);
}
function ft(e) {
  return Wl(e);
}
function Hf(e, t) {
  var r = {};
  return t.forEach(function(n) {
    var a = Er(e, n);
    r = sr(r, n, a);
  }), r;
}
function On(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return e && e.some(function(n) {
    return Nm(t, n, r);
  });
}
function Nm(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return !e || !t || !r && e.length !== t.length ? !1 : t.every(function(n, a) {
    return e[a] === n;
  });
}
function ST(e, t) {
  if (e === t)
    return !0;
  if (!e && t || e && !t || !e || !t || me(e) !== "object" || me(t) !== "object")
    return !1;
  var r = Object.keys(e), n = Object.keys(t), a = new Set([].concat(r, n));
  return xe(a).every(function(o) {
    var i = e[o], s = t[o];
    return typeof i == "function" && typeof s == "function" ? !0 : i === s;
  });
}
function ET(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && me(t.target) === "object" && e in t.target ? t.target[e] : t;
}
function Vf(e, t, r) {
  var n = e.length;
  if (t < 0 || t >= n || r < 0 || r >= n)
    return e;
  var a = e[t], o = t - r;
  return o > 0 ? [].concat(xe(e.slice(0, r)), [a], xe(e.slice(r, t)), xe(e.slice(t + 1, n))) : o < 0 ? [].concat(xe(e.slice(0, t)), xe(e.slice(t + 1, r + 1)), [a], xe(e.slice(r + 1, n))) : e;
}
var xT = ["name"], Qt = [];
function Ms(e, t, r, n, a, o) {
  return typeof e == "function" ? e(t, r, "source" in o ? {
    source: o.source
  } : {}) : n !== a;
}
var vu = /* @__PURE__ */ function(e) {
  Yr(r, e);
  var t = Xr(r);
  function r(n) {
    var a;
    if (_t(this, r), a = t.call(this, n), N(Re(a), "state", {
      resetCount: 0
    }), N(Re(a), "cancelRegisterFunc", null), N(Re(a), "mounted", !1), N(Re(a), "touched", !1), N(Re(a), "dirty", !1), N(Re(a), "validatePromise", void 0), N(Re(a), "prevValidating", void 0), N(Re(a), "errors", Qt), N(Re(a), "warnings", Qt), N(Re(a), "cancelRegister", function() {
      var l = a.props, c = l.preserve, u = l.isListField, d = l.name;
      a.cancelRegisterFunc && a.cancelRegisterFunc(u, c, ft(d)), a.cancelRegisterFunc = null;
    }), N(Re(a), "getNamePath", function() {
      var l = a.props, c = l.name, u = l.fieldContext, d = u.prefixName, f = d === void 0 ? [] : d;
      return c !== void 0 ? [].concat(xe(f), xe(c)) : [];
    }), N(Re(a), "getRules", function() {
      var l = a.props, c = l.rules, u = c === void 0 ? [] : c, d = l.fieldContext;
      return u.map(function(f) {
        return typeof f == "function" ? f(d) : f;
      });
    }), N(Re(a), "refresh", function() {
      a.mounted && a.setState(function(l) {
        var c = l.resetCount;
        return {
          resetCount: c + 1
        };
      });
    }), N(Re(a), "metaCache", null), N(Re(a), "triggerMetaEvent", function(l) {
      var c = a.props.onMetaChange;
      if (c) {
        var u = V(V({}, a.getMeta()), {}, {
          destroy: l
        });
        il(a.metaCache, u) || c(u), a.metaCache = u;
      } else
        a.metaCache = null;
    }), N(Re(a), "onStoreChange", function(l, c, u) {
      var d = a.props, f = d.shouldUpdate, v = d.dependencies, g = v === void 0 ? [] : v, h = d.onReset, p = u.store, y = a.getNamePath(), m = a.getValue(l), S = a.getValue(p), E = c && On(c, y);
      switch (u.type === "valueUpdate" && u.source === "external" && !il(m, S) && (a.touched = !0, a.dirty = !0, a.validatePromise = null, a.errors = Qt, a.warnings = Qt, a.triggerMetaEvent()), u.type) {
        case "reset":
          if (!c || E) {
            a.touched = !1, a.dirty = !1, a.validatePromise = void 0, a.errors = Qt, a.warnings = Qt, a.triggerMetaEvent(), h == null || h(), a.refresh();
            return;
          }
          break;
        case "remove": {
          if (f && Ms(f, l, p, m, S, u)) {
            a.reRender();
            return;
          }
          break;
        }
        case "setField": {
          var x = u.data;
          if (E) {
            "touched" in x && (a.touched = x.touched), "validating" in x && !("originRCField" in x) && (a.validatePromise = x.validating ? Promise.resolve([]) : null), "errors" in x && (a.errors = x.errors || Qt), "warnings" in x && (a.warnings = x.warnings || Qt), a.dirty = !0, a.triggerMetaEvent(), a.reRender();
            return;
          } else if ("value" in x && On(c, y, !0)) {
            a.reRender();
            return;
          }
          if (f && !y.length && Ms(f, l, p, m, S, u)) {
            a.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var w = g.map(ft);
          if (w.some(function(b) {
            return On(u.relatedFields, b);
          })) {
            a.reRender();
            return;
          }
          break;
        }
        default:
          if (E || (!g.length || y.length || f) && Ms(f, l, p, m, S, u)) {
            a.reRender();
            return;
          }
          break;
      }
      f === !0 && a.reRender();
    }), N(Re(a), "validateRules", function(l) {
      var c = a.getNamePath(), u = a.getValue(), d = l || {}, f = d.triggerName, v = d.validateOnly, g = v === void 0 ? !1 : v, h = Promise.resolve().then(/* @__PURE__ */ Qa(/* @__PURE__ */ mr().mark(function p() {
        var y, m, S, E, x, w, b;
        return mr().wrap(function(k) {
          for (; ; ) switch (k.prev = k.next) {
            case 0:
              if (a.mounted) {
                k.next = 2;
                break;
              }
              return k.abrupt("return", []);
            case 2:
              if (y = a.props, m = y.validateFirst, S = m === void 0 ? !1 : m, E = y.messageVariables, x = y.validateDebounce, w = a.getRules(), f && (w = w.filter(function(M) {
                return M;
              }).filter(function(M) {
                var I = M.validateTrigger;
                if (!I)
                  return !0;
                var D = Wl(I);
                return D.includes(f);
              })), !(x && f)) {
                k.next = 10;
                break;
              }
              return k.next = 8, new Promise(function(M) {
                setTimeout(M, x);
              });
            case 8:
              if (a.validatePromise === h) {
                k.next = 10;
                break;
              }
              return k.abrupt("return", []);
            case 10:
              return b = vT(c, u, w, l, S, E), b.catch(function(M) {
                return M;
              }).then(function() {
                var M = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Qt;
                if (a.validatePromise === h) {
                  var I;
                  a.validatePromise = null;
                  var D = [], F = [];
                  (I = M.forEach) === null || I === void 0 || I.call(M, function(B) {
                    var L = B.rule.warningOnly, A = B.errors, O = A === void 0 ? Qt : A;
                    L ? F.push.apply(F, xe(O)) : D.push.apply(D, xe(O));
                  }), a.errors = D, a.warnings = F, a.triggerMetaEvent(), a.reRender();
                }
              }), k.abrupt("return", b);
            case 13:
            case "end":
              return k.stop();
          }
        }, p);
      })));
      return g || (a.validatePromise = h, a.dirty = !0, a.errors = Qt, a.warnings = Qt, a.triggerMetaEvent(), a.reRender()), h;
    }), N(Re(a), "isFieldValidating", function() {
      return !!a.validatePromise;
    }), N(Re(a), "isFieldTouched", function() {
      return a.touched;
    }), N(Re(a), "isFieldDirty", function() {
      if (a.dirty || a.props.initialValue !== void 0)
        return !0;
      var l = a.props.fieldContext, c = l.getInternalHooks(sn), u = c.getInitialValue;
      return u(a.getNamePath()) !== void 0;
    }), N(Re(a), "getErrors", function() {
      return a.errors;
    }), N(Re(a), "getWarnings", function() {
      return a.warnings;
    }), N(Re(a), "isListField", function() {
      return a.props.isListField;
    }), N(Re(a), "isList", function() {
      return a.props.isList;
    }), N(Re(a), "isPreserve", function() {
      return a.props.preserve;
    }), N(Re(a), "getMeta", function() {
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
    }), N(Re(a), "getOnlyChild", function(l) {
      if (typeof l == "function") {
        var c = a.getMeta();
        return V(V({}, a.getOnlyChild(l(a.getControlled(), c, a.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var u = Ho(l);
      return u.length !== 1 || !/* @__PURE__ */ C.isValidElement(u[0]) ? {
        child: u,
        isFunction: !1
      } : {
        child: u[0],
        isFunction: !1
      };
    }), N(Re(a), "getValue", function(l) {
      var c = a.props.fieldContext.getFieldsValue, u = a.getNamePath();
      return Er(l || c(!0), u);
    }), N(Re(a), "getControlled", function() {
      var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, c = a.props, u = c.name, d = c.trigger, f = c.validateTrigger, v = c.getValueFromEvent, g = c.normalize, h = c.valuePropName, p = c.getValueProps, y = c.fieldContext, m = f !== void 0 ? f : y.validateTrigger, S = a.getNamePath(), E = y.getInternalHooks, x = y.getFieldsValue, w = E(sn), b = w.dispatch, P = a.getValue(), k = p || function(B) {
        return N({}, h, B);
      }, M = l[d], I = u !== void 0 ? k(P) : {};
      process.env.NODE_ENV !== "production" && I && Object.keys(I).forEach(function(B) {
        lt(typeof I[B] != "function", "It's not recommended to generate dynamic function prop by `getValueProps`. Please pass it to child component directly (prop: ".concat(B, ")"));
      });
      var D = V(V({}, l), I);
      D[d] = function() {
        a.touched = !0, a.dirty = !0, a.triggerMetaEvent();
        for (var B, L = arguments.length, A = new Array(L), O = 0; O < L; O++)
          A[O] = arguments[O];
        v ? B = v.apply(void 0, A) : B = ET.apply(void 0, [h].concat(A)), g && (B = g(B, P, x(!0))), B !== P && b({
          type: "updateValue",
          namePath: S,
          value: B
        }), M && M.apply(void 0, A);
      };
      var F = Wl(m || []);
      return F.forEach(function(B) {
        var L = D[B];
        D[B] = function() {
          L && L.apply(void 0, arguments);
          var A = a.props.rules;
          A && A.length && b({
            type: "validateField",
            namePath: S,
            triggerName: B
          });
        };
      }), D;
    }), n.fieldContext) {
      var o = n.fieldContext.getInternalHooks, i = o(sn), s = i.initEntityValue;
      s(Re(a));
    }
    return a;
  }
  return wt(r, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props, o = a.shouldUpdate, i = a.fieldContext;
      if (this.mounted = !0, i) {
        var s = i.getInternalHooks, l = s(sn), c = l.registerField;
        this.cancelRegisterFunc = c(this);
      }
      o === !0 && this.reRender();
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
      var a = this.state.resetCount, o = this.props.children, i = this.getOnlyChild(o), s = i.child, l = i.isFunction, c;
      return l ? c = s : /* @__PURE__ */ C.isValidElement(s) ? c = /* @__PURE__ */ C.cloneElement(s, this.getControlled(s.props)) : (lt(!s, "`children` of Field is not validate ReactElement."), c = s), /* @__PURE__ */ C.createElement(C.Fragment, {
        key: a
      }, c);
    }
  }]), r;
}(C.Component);
N(vu, "contextType", jn);
N(vu, "defaultProps", {
  trigger: "onChange",
  valuePropName: "value"
});
function Im(e) {
  var t, r = e.name, n = er(e, xT), a = C.useContext(jn), o = C.useContext(Uo), i = r !== void 0 ? ft(r) : void 0, s = (t = n.isListField) !== null && t !== void 0 ? t : !!o, l = "keep";
  return s || (l = "_".concat((i || []).join("_"))), process.env.NODE_ENV !== "production" && n.preserve === !1 && s && i.length <= 1 && lt(!1, "`preserve` should not apply on Form.List fields."), /* @__PURE__ */ C.createElement(vu, De({
    key: l,
    name: i,
    isListField: s
  }, n, {
    fieldContext: a
  }));
}
function CT(e) {
  var t = e.name, r = e.initialValue, n = e.children, a = e.rules, o = e.validateTrigger, i = e.isListField, s = C.useContext(jn), l = C.useContext(Uo), c = C.useRef({
    keys: [],
    id: 0
  }), u = c.current, d = C.useMemo(function() {
    var h = ft(s.prefixName) || [];
    return [].concat(xe(h), xe(ft(t)));
  }, [s.prefixName, t]), f = C.useMemo(function() {
    return V(V({}, s), {}, {
      prefixName: d
    });
  }, [s, d]), v = C.useMemo(function() {
    return {
      getKey: function(p) {
        var y = d.length, m = p[y];
        return [u.keys[m], p.slice(y + 1)];
      }
    };
  }, [d]);
  if (typeof n != "function")
    return lt(!1, "Form.List only accepts function as children."), null;
  var g = function(p, y, m) {
    var S = m.source;
    return S === "internal" ? !1 : p !== y;
  };
  return /* @__PURE__ */ C.createElement(Uo.Provider, {
    value: v
  }, /* @__PURE__ */ C.createElement(jn.Provider, {
    value: f
  }, /* @__PURE__ */ C.createElement(Im, {
    name: [],
    shouldUpdate: g,
    rules: a,
    validateTrigger: o,
    initialValue: r,
    isList: !0,
    isListField: i ?? !!l
  }, function(h, p) {
    var y = h.value, m = y === void 0 ? [] : y, S = h.onChange, E = s.getFieldValue, x = function() {
      var k = E(d || []);
      return k || [];
    }, w = {
      add: function(k, M) {
        var I = x();
        M >= 0 && M <= I.length ? (u.keys = [].concat(xe(u.keys.slice(0, M)), [u.id], xe(u.keys.slice(M))), S([].concat(xe(I.slice(0, M)), [k], xe(I.slice(M))))) : (process.env.NODE_ENV !== "production" && (M < 0 || M > I.length) && lt(!1, "The second parameter of the add function should be a valid positive number."), u.keys = [].concat(xe(u.keys), [u.id]), S([].concat(xe(I), [k]))), u.id += 1;
      },
      remove: function(k) {
        var M = x(), I = new Set(Array.isArray(k) ? k : [k]);
        I.size <= 0 || (u.keys = u.keys.filter(function(D, F) {
          return !I.has(F);
        }), S(M.filter(function(D, F) {
          return !I.has(F);
        })));
      },
      move: function(k, M) {
        if (k !== M) {
          var I = x();
          k < 0 || k >= I.length || M < 0 || M >= I.length || (u.keys = Vf(u.keys, k, M), S(Vf(I, k, M)));
        }
      }
    }, b = m || [];
    return Array.isArray(b) || (b = [], process.env.NODE_ENV !== "production" && lt(!1, "Current value of '".concat(d.join(" > "), "' is not an array type."))), n(b.map(function(P, k) {
      var M = u.keys[k];
      return M === void 0 && (u.keys[k] = u.id, M = u.keys[k], u.id += 1), {
        name: k,
        key: M,
        isListField: !0
      };
    }), w, p);
  })));
}
function _T(e) {
  var t = !1, r = e.length, n = [];
  return e.length ? new Promise(function(a, o) {
    e.forEach(function(i, s) {
      i.catch(function(l) {
        return t = !0, l;
      }).then(function(l) {
        r -= 1, n[s] = l, !(r > 0) && (t && o(n), a(n));
      });
    });
  }) : Promise.resolve([]);
}
var Dm = "__@field_split__";
function Ns(e) {
  return e.map(function(t) {
    return "".concat(me(t), ":").concat(t);
  }).join(Dm);
}
var $n = /* @__PURE__ */ function() {
  function e() {
    _t(this, e), N(this, "kvs", /* @__PURE__ */ new Map());
  }
  return wt(e, [{
    key: "set",
    value: function(r, n) {
      this.kvs.set(Ns(r), n);
    }
  }, {
    key: "get",
    value: function(r) {
      return this.kvs.get(Ns(r));
    }
  }, {
    key: "update",
    value: function(r, n) {
      var a = this.get(r), o = n(a);
      o ? this.set(r, o) : this.delete(r);
    }
  }, {
    key: "delete",
    value: function(r) {
      this.kvs.delete(Ns(r));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(r) {
      return xe(this.kvs.entries()).map(function(n) {
        var a = he(n, 2), o = a[0], i = a[1], s = o.split(Dm);
        return r({
          key: s.map(function(l) {
            var c = l.match(/^([^:]*):(.*)$/), u = he(c, 3), d = u[1], f = u[2];
            return d === "number" ? Number(f) : f;
          }),
          value: i
        });
      });
    }
  }, {
    key: "toJSON",
    value: function() {
      var r = {};
      return this.map(function(n) {
        var a = n.key, o = n.value;
        return r[a.join(".")] = o, null;
      }), r;
    }
  }]), e;
}(), wT = ["name"], $T = /* @__PURE__ */ wt(function e(t) {
  var r = this;
  _t(this, e), N(this, "formHooked", !1), N(this, "forceRootUpdate", void 0), N(this, "subscribable", !0), N(this, "store", {}), N(this, "fieldEntities", []), N(this, "initialValues", {}), N(this, "callbacks", {}), N(this, "validateMessages", null), N(this, "preserve", null), N(this, "lastValidatePromise", null), N(this, "getForm", function() {
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
  }), N(this, "getInternalHooks", function(n) {
    return n === sn ? (r.formHooked = !0, {
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
    }) : (lt(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }), N(this, "useSubscribe", function(n) {
    r.subscribable = n;
  }), N(this, "prevWithoutPreserves", null), N(this, "setInitialValues", function(n, a) {
    if (r.initialValues = n || {}, a) {
      var o, i = Tn(n, r.store);
      (o = r.prevWithoutPreserves) === null || o === void 0 || o.map(function(s) {
        var l = s.key;
        i = sr(i, l, Er(n, l));
      }), r.prevWithoutPreserves = null, r.updateStore(i);
    }
  }), N(this, "destroyForm", function(n) {
    if (n)
      r.updateStore({});
    else {
      var a = new $n();
      r.getFieldEntities(!0).forEach(function(o) {
        r.isMergedPreserve(o.isPreserve()) || a.set(o.getNamePath(), !0);
      }), r.prevWithoutPreserves = a;
    }
  }), N(this, "getInitialValue", function(n) {
    var a = Er(r.initialValues, n);
    return n.length ? Tn(a) : a;
  }), N(this, "setCallbacks", function(n) {
    r.callbacks = n;
  }), N(this, "setValidateMessages", function(n) {
    r.validateMessages = n;
  }), N(this, "setPreserve", function(n) {
    r.preserve = n;
  }), N(this, "watchList", []), N(this, "registerWatch", function(n) {
    return r.watchList.push(n), function() {
      r.watchList = r.watchList.filter(function(a) {
        return a !== n;
      });
    };
  }), N(this, "notifyWatch", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (r.watchList.length) {
      var a = r.getFieldsValue(), o = r.getFieldsValue(!0);
      r.watchList.forEach(function(i) {
        i(a, o, n);
      });
    }
  }), N(this, "timeoutId", null), N(this, "warningUnhooked", function() {
    process.env.NODE_ENV !== "production" && !r.timeoutId && typeof window < "u" && (r.timeoutId = setTimeout(function() {
      r.timeoutId = null, r.formHooked || lt(!1, "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?");
    }));
  }), N(this, "updateStore", function(n) {
    r.store = n;
  }), N(this, "getFieldEntities", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    return n ? r.fieldEntities.filter(function(a) {
      return a.getNamePath().length;
    }) : r.fieldEntities;
  }), N(this, "getFieldsMap", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, a = new $n();
    return r.getFieldEntities(n).forEach(function(o) {
      var i = o.getNamePath();
      a.set(i, o);
    }), a;
  }), N(this, "getFieldEntitiesForNamePathList", function(n) {
    if (!n)
      return r.getFieldEntities(!0);
    var a = r.getFieldsMap(!0);
    return n.map(function(o) {
      var i = ft(o);
      return a.get(i) || {
        INVALIDATE_NAME_PATH: ft(o)
      };
    });
  }), N(this, "getFieldsValue", function(n, a) {
    r.warningUnhooked();
    var o, i, s;
    if (n === !0 || Array.isArray(n) ? (o = n, i = a) : n && me(n) === "object" && (s = n.strict, i = n.filter), o === !0 && !i)
      return r.store;
    var l = r.getFieldEntitiesForNamePathList(Array.isArray(o) ? o : null), c = [];
    return l.forEach(function(u) {
      var d, f, v = "INVALIDATE_NAME_PATH" in u ? u.INVALIDATE_NAME_PATH : u.getNamePath();
      if (s) {
        var g, h;
        if ((g = (h = u).isList) !== null && g !== void 0 && g.call(h))
          return;
      } else if (!o && (d = (f = u).isListField) !== null && d !== void 0 && d.call(f))
        return;
      if (!i)
        c.push(v);
      else {
        var p = "getMeta" in u ? u.getMeta() : null;
        i(p) && c.push(v);
      }
    }), Hf(r.store, c.map(ft));
  }), N(this, "getFieldValue", function(n) {
    r.warningUnhooked();
    var a = ft(n);
    return Er(r.store, a);
  }), N(this, "getFieldsError", function(n) {
    r.warningUnhooked();
    var a = r.getFieldEntitiesForNamePathList(n);
    return a.map(function(o, i) {
      return o && !("INVALIDATE_NAME_PATH" in o) ? {
        name: o.getNamePath(),
        errors: o.getErrors(),
        warnings: o.getWarnings()
      } : {
        name: ft(n[i]),
        errors: [],
        warnings: []
      };
    });
  }), N(this, "getFieldError", function(n) {
    r.warningUnhooked();
    var a = ft(n), o = r.getFieldsError([a])[0];
    return o.errors;
  }), N(this, "getFieldWarning", function(n) {
    r.warningUnhooked();
    var a = ft(n), o = r.getFieldsError([a])[0];
    return o.warnings;
  }), N(this, "isFieldsTouched", function() {
    r.warningUnhooked();
    for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
      a[o] = arguments[o];
    var i = a[0], s = a[1], l, c = !1;
    a.length === 0 ? l = null : a.length === 1 ? Array.isArray(i) ? (l = i.map(ft), c = !1) : (l = null, c = i) : (l = i.map(ft), c = s);
    var u = r.getFieldEntities(!0), d = function(p) {
      return p.isFieldTouched();
    };
    if (!l)
      return c ? u.every(function(h) {
        return d(h) || h.isList();
      }) : u.some(d);
    var f = new $n();
    l.forEach(function(h) {
      f.set(h, []);
    }), u.forEach(function(h) {
      var p = h.getNamePath();
      l.forEach(function(y) {
        y.every(function(m, S) {
          return p[S] === m;
        }) && f.update(y, function(m) {
          return [].concat(xe(m), [h]);
        });
      });
    });
    var v = function(p) {
      return p.some(d);
    }, g = f.map(function(h) {
      var p = h.value;
      return p;
    });
    return c ? g.every(v) : g.some(v);
  }), N(this, "isFieldTouched", function(n) {
    return r.warningUnhooked(), r.isFieldsTouched([n]);
  }), N(this, "isFieldsValidating", function(n) {
    r.warningUnhooked();
    var a = r.getFieldEntities();
    if (!n)
      return a.some(function(i) {
        return i.isFieldValidating();
      });
    var o = n.map(ft);
    return a.some(function(i) {
      var s = i.getNamePath();
      return On(o, s) && i.isFieldValidating();
    });
  }), N(this, "isFieldValidating", function(n) {
    return r.warningUnhooked(), r.isFieldsValidating([n]);
  }), N(this, "resetWithFieldInitialValue", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = new $n(), o = r.getFieldEntities(!0);
    o.forEach(function(l) {
      var c = l.props.initialValue, u = l.getNamePath();
      if (c !== void 0) {
        var d = a.get(u) || /* @__PURE__ */ new Set();
        d.add({
          entity: l,
          value: c
        }), a.set(u, d);
      }
    });
    var i = function(c) {
      c.forEach(function(u) {
        var d = u.props.initialValue;
        if (d !== void 0) {
          var f = u.getNamePath(), v = r.getInitialValue(f);
          if (v !== void 0)
            lt(!1, "Form already set 'initialValues' with path '".concat(f.join("."), "'. Field can not overwrite it."));
          else {
            var g = a.get(f);
            if (g && g.size > 1)
              lt(!1, "Multiple Field with path '".concat(f.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (g) {
              var h = r.getFieldValue(f), p = u.isListField();
              !p && (!n.skipExist || h === void 0) && r.updateStore(sr(r.store, f, xe(g)[0].value));
            }
          }
        }
      });
    }, s;
    n.entities ? s = n.entities : n.namePathList ? (s = [], n.namePathList.forEach(function(l) {
      var c = a.get(l);
      if (c) {
        var u;
        (u = s).push.apply(u, xe(xe(c).map(function(d) {
          return d.entity;
        })));
      }
    })) : s = o, i(s);
  }), N(this, "resetFields", function(n) {
    r.warningUnhooked();
    var a = r.store;
    if (!n) {
      r.updateStore(Tn(r.initialValues)), r.resetWithFieldInitialValue(), r.notifyObservers(a, null, {
        type: "reset"
      }), r.notifyWatch();
      return;
    }
    var o = n.map(ft);
    o.forEach(function(i) {
      var s = r.getInitialValue(i);
      r.updateStore(sr(r.store, i, s));
    }), r.resetWithFieldInitialValue({
      namePathList: o
    }), r.notifyObservers(a, o, {
      type: "reset"
    }), r.notifyWatch(o);
  }), N(this, "setFields", function(n) {
    r.warningUnhooked();
    var a = r.store, o = [];
    n.forEach(function(i) {
      var s = i.name, l = er(i, wT), c = ft(s);
      o.push(c), "value" in l && r.updateStore(sr(r.store, c, l.value)), r.notifyObservers(a, [c], {
        type: "setField",
        data: i
      });
    }), r.notifyWatch(o);
  }), N(this, "getFields", function() {
    var n = r.getFieldEntities(!0), a = n.map(function(o) {
      var i = o.getNamePath(), s = o.getMeta(), l = V(V({}, s), {}, {
        name: i,
        value: r.getFieldValue(i)
      });
      return Object.defineProperty(l, "originRCField", {
        value: !0
      }), l;
    });
    return a;
  }), N(this, "initEntityValue", function(n) {
    var a = n.props.initialValue;
    if (a !== void 0) {
      var o = n.getNamePath(), i = Er(r.store, o);
      i === void 0 && r.updateStore(sr(r.store, o, a));
    }
  }), N(this, "isMergedPreserve", function(n) {
    var a = n !== void 0 ? n : r.preserve;
    return a ?? !0;
  }), N(this, "registerField", function(n) {
    r.fieldEntities.push(n);
    var a = n.getNamePath();
    if (r.notifyWatch([a]), n.props.initialValue !== void 0) {
      var o = r.store;
      r.resetWithFieldInitialValue({
        entities: [n],
        skipExist: !0
      }), r.notifyObservers(o, [n.getNamePath()], {
        type: "valueUpdate",
        source: "internal"
      });
    }
    return function(i, s) {
      var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      if (r.fieldEntities = r.fieldEntities.filter(function(d) {
        return d !== n;
      }), !r.isMergedPreserve(s) && (!i || l.length > 1)) {
        var c = i ? void 0 : r.getInitialValue(a);
        if (a.length && r.getFieldValue(a) !== c && r.fieldEntities.every(function(d) {
          return (
            // Only reset when no namePath exist
            !Nm(d.getNamePath(), a)
          );
        })) {
          var u = r.store;
          r.updateStore(sr(u, a, c, !0)), r.notifyObservers(u, [a], {
            type: "remove"
          }), r.triggerDependenciesUpdate(u, a);
        }
      }
      r.notifyWatch([a]);
    };
  }), N(this, "dispatch", function(n) {
    switch (n.type) {
      case "updateValue": {
        var a = n.namePath, o = n.value;
        r.updateValue(a, o);
        break;
      }
      case "validateField": {
        var i = n.namePath, s = n.triggerName;
        r.validateFields([i], {
          triggerName: s
        });
        break;
      }
    }
  }), N(this, "notifyObservers", function(n, a, o) {
    if (r.subscribable) {
      var i = V(V({}, o), {}, {
        store: r.getFieldsValue(!0)
      });
      r.getFieldEntities().forEach(function(s) {
        var l = s.onStoreChange;
        l(n, a, i);
      });
    } else
      r.forceRootUpdate();
  }), N(this, "triggerDependenciesUpdate", function(n, a) {
    var o = r.getDependencyChildrenFields(a);
    return o.length && r.validateFields(o), r.notifyObservers(n, o, {
      type: "dependenciesUpdate",
      relatedFields: [a].concat(xe(o))
    }), o;
  }), N(this, "updateValue", function(n, a) {
    var o = ft(n), i = r.store;
    r.updateStore(sr(r.store, o, a)), r.notifyObservers(i, [o], {
      type: "valueUpdate",
      source: "internal"
    }), r.notifyWatch([o]);
    var s = r.triggerDependenciesUpdate(i, o), l = r.callbacks.onValuesChange;
    if (l) {
      var c = Hf(r.store, [o]);
      l(c, r.getFieldsValue());
    }
    r.triggerOnFieldsChange([o].concat(xe(s)));
  }), N(this, "setFieldsValue", function(n) {
    r.warningUnhooked();
    var a = r.store;
    if (n) {
      var o = Tn(r.store, n);
      r.updateStore(o);
    }
    r.notifyObservers(a, null, {
      type: "valueUpdate",
      source: "external"
    }), r.notifyWatch();
  }), N(this, "setFieldValue", function(n, a) {
    r.setFields([{
      name: n,
      value: a,
      errors: [],
      warnings: []
    }]);
  }), N(this, "getDependencyChildrenFields", function(n) {
    var a = /* @__PURE__ */ new Set(), o = [], i = new $n();
    r.getFieldEntities().forEach(function(l) {
      var c = l.props.dependencies;
      (c || []).forEach(function(u) {
        var d = ft(u);
        i.update(d, function() {
          var f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          return f.add(l), f;
        });
      });
    });
    var s = function l(c) {
      var u = i.get(c) || /* @__PURE__ */ new Set();
      u.forEach(function(d) {
        if (!a.has(d)) {
          a.add(d);
          var f = d.getNamePath();
          d.isFieldDirty() && f.length && (o.push(f), l(f));
        }
      });
    };
    return s(n), o;
  }), N(this, "triggerOnFieldsChange", function(n, a) {
    var o = r.callbacks.onFieldsChange;
    if (o) {
      var i = r.getFields();
      if (a) {
        var s = new $n();
        a.forEach(function(c) {
          var u = c.name, d = c.errors;
          s.set(u, d);
        }), i.forEach(function(c) {
          c.errors = s.get(c.name) || c.errors;
        });
      }
      var l = i.filter(function(c) {
        var u = c.name;
        return On(n, u);
      });
      l.length && o(l, i);
    }
  }), N(this, "validateFields", function(n, a) {
    r.warningUnhooked();
    var o, i;
    Array.isArray(n) || typeof n == "string" || typeof a == "string" ? (o = n, i = a) : i = n;
    var s = !!o, l = s ? o.map(ft) : [], c = [], u = String(Date.now()), d = /* @__PURE__ */ new Set(), f = i || {}, v = f.recursive, g = f.dirty;
    r.getFieldEntities(!0).forEach(function(m) {
      if (s || l.push(m.getNamePath()), !(!m.props.rules || !m.props.rules.length) && !(g && !m.isFieldDirty())) {
        var S = m.getNamePath();
        if (d.add(S.join(u)), !s || On(l, S, v)) {
          var E = m.validateRules(V({
            validateMessages: V(V({}, Mm), r.validateMessages)
          }, i));
          c.push(E.then(function() {
            return {
              name: S,
              errors: [],
              warnings: []
            };
          }).catch(function(x) {
            var w, b = [], P = [];
            return (w = x.forEach) === null || w === void 0 || w.call(x, function(k) {
              var M = k.rule.warningOnly, I = k.errors;
              M ? P.push.apply(P, xe(I)) : b.push.apply(b, xe(I));
            }), b.length ? Promise.reject({
              name: S,
              errors: b,
              warnings: P
            }) : {
              name: S,
              errors: b,
              warnings: P
            };
          }));
        }
      }
    });
    var h = _T(c);
    r.lastValidatePromise = h, h.catch(function(m) {
      return m;
    }).then(function(m) {
      var S = m.map(function(E) {
        var x = E.name;
        return x;
      });
      r.notifyObservers(r.store, S, {
        type: "validateFinish"
      }), r.triggerOnFieldsChange(S, m);
    });
    var p = h.then(function() {
      return r.lastValidatePromise === h ? Promise.resolve(r.getFieldsValue(l)) : Promise.reject([]);
    }).catch(function(m) {
      var S = m.filter(function(E) {
        return E && E.errors.length;
      });
      return Promise.reject({
        values: r.getFieldsValue(l),
        errorFields: S,
        outOfDate: r.lastValidatePromise !== h
      });
    });
    p.catch(function(m) {
      return m;
    });
    var y = l.filter(function(m) {
      return d.has(m.join(u));
    });
    return r.triggerOnFieldsChange(y), p;
  }), N(this, "submit", function() {
    r.warningUnhooked(), r.validateFields().then(function(n) {
      var a = r.callbacks.onFinish;
      if (a)
        try {
          a(n);
        } catch (o) {
          console.error(o);
        }
    }).catch(function(n) {
      var a = r.callbacks.onFinishFailed;
      a && a(n);
    });
  }), this.forceRootUpdate = t;
});
function Fm(e) {
  var t = C.useRef(), r = C.useState({}), n = he(r, 2), a = n[1];
  if (!t.current)
    if (e)
      t.current = e;
    else {
      var o = function() {
        a({});
      }, i = new $T(o);
      t.current = i.getForm();
    }
  return [t.current];
}
var ec = /* @__PURE__ */ C.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), TT = function(t) {
  var r = t.validateMessages, n = t.onFormChange, a = t.onFormFinish, o = t.children, i = C.useContext(ec), s = C.useRef({});
  return /* @__PURE__ */ C.createElement(ec.Provider, {
    value: V(V({}, i), {}, {
      validateMessages: V(V({}, i.validateMessages), r),
      // =========================================================
      // =                  Global Form Control                  =
      // =========================================================
      triggerFormChange: function(c, u) {
        n && n(c, {
          changedFields: u,
          forms: s.current
        }), i.triggerFormChange(c, u);
      },
      triggerFormFinish: function(c, u) {
        a && a(c, {
          values: u,
          forms: s.current
        }), i.triggerFormFinish(c, u);
      },
      registerForm: function(c, u) {
        c && (s.current = V(V({}, s.current), {}, N({}, c, u))), i.registerForm(c, u);
      },
      unregisterForm: function(c) {
        var u = V({}, s.current);
        delete u[c], s.current = u, i.unregisterForm(c);
      }
    })
  }, o);
}, RT = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed", "clearOnDestroy"], AT = function(t, r) {
  var n = t.name, a = t.initialValues, o = t.fields, i = t.form, s = t.preserve, l = t.children, c = t.component, u = c === void 0 ? "form" : c, d = t.validateMessages, f = t.validateTrigger, v = f === void 0 ? "onChange" : f, g = t.onValuesChange, h = t.onFieldsChange, p = t.onFinish, y = t.onFinishFailed, m = t.clearOnDestroy, S = er(t, RT), E = C.useRef(null), x = C.useContext(ec), w = Fm(i), b = he(w, 1), P = b[0], k = P.getInternalHooks(sn), M = k.useSubscribe, I = k.setInitialValues, D = k.setCallbacks, F = k.setValidateMessages, B = k.setPreserve, L = k.destroyForm;
  C.useImperativeHandle(r, function() {
    return V(V({}, P), {}, {
      nativeElement: E.current
    });
  }), C.useEffect(function() {
    return x.registerForm(n, P), function() {
      x.unregisterForm(n);
    };
  }, [x, P, n]), F(V(V({}, x.validateMessages), d)), D({
    onValuesChange: g,
    onFieldsChange: function(Z) {
      if (x.triggerFormChange(n, Z), h) {
        for (var Y = arguments.length, Q = new Array(Y > 1 ? Y - 1 : 0), le = 1; le < Y; le++)
          Q[le - 1] = arguments[le];
        h.apply(void 0, [Z].concat(Q));
      }
    },
    onFinish: function(Z) {
      x.triggerFormFinish(n, Z), p && p(Z);
    },
    onFinishFailed: y
  }), B(s);
  var A = C.useRef(null);
  I(a, !A.current), A.current || (A.current = !0), C.useEffect(
    function() {
      return function() {
        return L(m);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var O, R = typeof l == "function";
  if (R) {
    var H = P.getFieldsValue(!0);
    O = l(H, P);
  } else
    O = l;
  M(!R);
  var z = C.useRef();
  C.useEffect(function() {
    ST(z.current || [], o || []) || P.setFields(o || []), z.current = o;
  }, [o, P]);
  var j = C.useMemo(function() {
    return V(V({}, P), {}, {
      validateTrigger: v
    });
  }, [P, v]), W = /* @__PURE__ */ C.createElement(Uo.Provider, {
    value: null
  }, /* @__PURE__ */ C.createElement(jn.Provider, {
    value: j
  }, O));
  return u === !1 ? W : /* @__PURE__ */ C.createElement(u, De({}, S, {
    ref: E,
    onSubmit: function(Z) {
      Z.preventDefault(), Z.stopPropagation(), P.submit();
    },
    onReset: function(Z) {
      var Y;
      Z.preventDefault(), P.resetFields(), (Y = S.onReset) === null || Y === void 0 || Y.call(S, Z);
    }
  }), W);
};
function Bf(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
var PT = process.env.NODE_ENV !== "production" ? function(e) {
  var t = e.join("__RC_FIELD_FORM_SPLIT__"), r = Ue(t);
  lt(r.current === t, "`useWatch` is not support dynamic `namePath`. Please provide static instead.");
} : function() {
};
function OT() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = t[0], a = t[1], o = a === void 0 ? {} : a, i = j1(o) ? {
    form: o
  } : o, s = i.form, l = hr(), c = he(l, 2), u = c[0], d = c[1], f = Hr(function() {
    return Bf(u);
  }, [u]), v = Ue(f);
  v.current = f;
  var g = pr(jn), h = s || g, p = h && h._init;
  process.env.NODE_ENV !== "production" && lt(t.length === 2 ? s ? p : !0 : p, "useWatch requires a form instance since it can not auto detect from context.");
  var y = ft(n), m = Ue(y);
  return m.current = y, PT(y), Ct(
    function() {
      if (p) {
        var S = h.getFieldsValue, E = h.getInternalHooks, x = E(sn), w = x.registerWatch, b = function(I, D) {
          var F = i.preserve ? D : I;
          return typeof n == "function" ? n(F) : Er(F, m.current);
        }, P = w(function(M, I) {
          var D = b(M, I), F = Bf(D);
          v.current !== F && (v.current = F, d(D));
        }), k = b(S(), S(!0));
        return u !== k && d(k), P;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [p]
  ), u;
}
var kT = /* @__PURE__ */ C.forwardRef(AT), eo = kT;
eo.FormProvider = TT;
eo.Field = Im;
eo.List = CT;
eo.useForm = Fm;
eo.useWatch = OT;
const Pa = /* @__PURE__ */ C.createContext({});
process.env.NODE_ENV !== "production" && (Pa.displayName = "FormItemInputContext");
const MT = (e) => {
  let {
    children: t,
    status: r,
    override: n
  } = e;
  const a = C.useContext(Pa), o = C.useMemo(() => {
    const i = Object.assign({}, a);
    return n && delete i.isFormItemInput, r && (delete i.status, delete i.hasFeedback, delete i.feedbackIcon), i;
  }, [r, n, a]);
  return /* @__PURE__ */ C.createElement(Pa.Provider, {
    value: o
  }, t);
}, NT = /* @__PURE__ */ C.createContext(void 0), IT = /* @__PURE__ */ Go(void 0);
var DT = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: !0
}, FT = V(V({}, DT), {}, {
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
const LT = {
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
}, FT), Object.assign({}, LT);
const Kt = "${label} is not a valid ${type}", Xi = {
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
        string: Kt,
        method: Kt,
        array: Kt,
        object: Kt,
        number: Kt,
        date: Kt,
        boolean: Kt,
        integer: Kt,
        float: Kt,
        regexp: Kt,
        email: Kt,
        url: Kt,
        hex: Kt
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
Object.assign({}, Xi.Modal);
let Oo = [];
const Uf = () => Oo.reduce((e, t) => Object.assign(Object.assign({}, e), t), Xi.Modal);
function jT(e) {
  if (e) {
    const t = Object.assign({}, e);
    return Oo.push(t), Uf(), () => {
      Oo = Oo.filter((r) => r !== t), Uf();
    };
  }
  Object.assign({}, Xi.Modal);
}
const Lm = /* @__PURE__ */ Go(void 0), jm = "internalMark", zm = (e) => {
  const {
    locale: t = {},
    children: r,
    _ANT_MARK__: n
  } = e;
  if (process.env.NODE_ENV !== "production") {
    const o = pn("LocaleProvider");
    process.env.NODE_ENV !== "production" && o(n === jm, "deprecated", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale");
  }
  C.useEffect(() => jT(t == null ? void 0 : t.Modal), [t]);
  const a = C.useMemo(() => Object.assign(Object.assign({}, t), {
    exist: !0
  }), [t]);
  return /* @__PURE__ */ C.createElement(Lm.Provider, {
    value: a
  }, r);
};
process.env.NODE_ENV !== "production" && (zm.displayName = "LocaleProvider");
const zT = `-ant-${Date.now()}-${Math.random()}`;
function HT(e, t) {
  const r = {}, n = (i, s) => {
    let l = i.clone();
    return l = (s == null ? void 0 : s(l)) || l, l.toRgbString();
  }, a = (i, s) => {
    const l = new pt(i), c = Ta(l.toRgbString());
    r[`${s}-color`] = n(l), r[`${s}-color-disabled`] = c[1], r[`${s}-color-hover`] = c[4], r[`${s}-color-active`] = c[6], r[`${s}-color-outline`] = l.clone().setA(0.2).toRgbString(), r[`${s}-color-deprecated-bg`] = c[0], r[`${s}-color-deprecated-border`] = c[2];
  };
  if (t.primaryColor) {
    a(t.primaryColor, "primary");
    const i = new pt(t.primaryColor), s = Ta(i.toRgbString());
    s.forEach((c, u) => {
      r[`primary-${u + 1}`] = c;
    }), r["primary-color-deprecated-l-35"] = n(i, (c) => c.lighten(35)), r["primary-color-deprecated-l-20"] = n(i, (c) => c.lighten(20)), r["primary-color-deprecated-t-20"] = n(i, (c) => c.tint(20)), r["primary-color-deprecated-t-50"] = n(i, (c) => c.tint(50)), r["primary-color-deprecated-f-12"] = n(i, (c) => c.setA(c.a * 0.12));
    const l = new pt(s[0]);
    r["primary-color-active-deprecated-f-30"] = n(l, (c) => c.setA(c.a * 0.3)), r["primary-color-active-deprecated-d-02"] = n(l, (c) => c.darken(2));
  }
  return t.successColor && a(t.successColor, "success"), t.warningColor && a(t.warningColor, "warning"), t.errorColor && a(t.errorColor, "error"), t.infoColor && a(t.infoColor, "info"), `
  :root {
    ${Object.keys(r).map((i) => `--${e}-${i}: ${r[i]};`).join(`
`)}
  }
  `.trim();
}
function VT(e, t) {
  const r = HT(e, t);
  Ir() ? cn(r, `${zT}-dynamic-theme`) : process.env.NODE_ENV !== "production" && Yi(!1, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
}
function BT() {
  const e = pr(Aa), t = pr(Ln);
  return {
    componentDisabled: e,
    componentSize: t
  };
}
const UT = Object.assign({}, C), {
  useId: Wf
} = UT, WT = () => "", qT = typeof Wf > "u" ? WT : Wf;
function GT(e, t, r) {
  var n, a;
  const o = pn("ConfigProvider"), i = e || {}, s = i.inherit === !1 || !t ? Object.assign(Object.assign({}, _l), {
    hashed: (n = t == null ? void 0 : t.hashed) !== null && n !== void 0 ? n : _l.hashed,
    cssVar: t == null ? void 0 : t.cssVar
  }) : t, l = qT();
  if (process.env.NODE_ENV !== "production") {
    const c = i.cssVar || s.cssVar, u = !!(typeof i.cssVar == "object" && (!((a = i.cssVar) === null || a === void 0) && a.key) || l);
    process.env.NODE_ENV !== "production" && o(!c || u, "breaking", "Missing key in `cssVar` config. Please upgrade to React 18 or set `cssVar.key` manually in each ConfigProvider inside `cssVar` enabled ConfigProvider.");
  }
  return fc(() => {
    var c, u;
    if (!e)
      return t;
    const d = Object.assign({}, s.components);
    Object.keys(e.components || {}).forEach((g) => {
      d[g] = Object.assign(Object.assign({}, d[g]), e.components[g]);
    });
    const f = `css-var-${l.replace(/:/g, "")}`, v = ((c = i.cssVar) !== null && c !== void 0 ? c : s.cssVar) && Object.assign(Object.assign(Object.assign({
      prefix: r == null ? void 0 : r.prefixCls
    }, typeof s.cssVar == "object" ? s.cssVar : {}), typeof i.cssVar == "object" ? i.cssVar : {}), {
      key: typeof i.cssVar == "object" && ((u = i.cssVar) === null || u === void 0 ? void 0 : u.key) || f
    });
    return Object.assign(Object.assign(Object.assign({}, s), i), {
      token: Object.assign(Object.assign({}, s.token), i.token),
      components: d,
      cssVar: v
    });
  }, [i, s], (c, u) => c.some((d, f) => {
    const v = u[f];
    return !il(d, v, !0);
  }));
}
function KT(e) {
  const {
    children: t
  } = e, [, r] = Mi(), {
    motion: n
  } = r, a = C.useRef(!1);
  return a.current = a.current || n === !1, a.current ? /* @__PURE__ */ C.createElement(zb, {
    motion: n
  }, t) : t;
}
const Hm = /* @__PURE__ */ C.memo((e) => {
  let {
    dropdownMatchSelectWidth: t
  } = e;
  return pn("ConfigProvider").deprecated(t === void 0, "dropdownMatchSelectWidth", "popupMatchSelectWidth"), null;
});
process.env.NODE_ENV !== "production" && (Hm.displayName = "PropWarning");
const YT = process.env.NODE_ENV !== "production" ? Hm : () => null;
var XT = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
let tc = !1;
process.env.NODE_ENV;
const ZT = ["getTargetContainer", "getPopupContainer", "renderEmpty", "input", "pagination", "form", "select", "button"];
let Vm;
function QT() {
  return Vm || Bl;
}
function JT(e) {
  return Object.keys(e).some((t) => t.endsWith("Color"));
}
const eR = (e) => {
  const {
    prefixCls: t,
    iconPrefixCls: r,
    theme: n,
    holderRender: a
  } = e;
  t !== void 0 && (Vm = t), n && JT(n) && (process.env.NODE_ENV !== "production" && Yi(!1, "ConfigProvider", "`config` of css variable theme is not work in v5. Please use new `theme` config instead."), VT(QT(), n));
}, tR = (e) => {
  const {
    children: t,
    csp: r,
    autoInsertSpaceInButton: n,
    alert: a,
    anchor: o,
    form: i,
    locale: s,
    componentSize: l,
    direction: c,
    space: u,
    splitter: d,
    virtual: f,
    dropdownMatchSelectWidth: v,
    popupMatchSelectWidth: g,
    popupOverflow: h,
    legacyLocale: p,
    parentContext: y,
    iconPrefixCls: m,
    theme: S,
    componentDisabled: E,
    segmented: x,
    statistic: w,
    spin: b,
    calendar: P,
    carousel: k,
    cascader: M,
    collapse: I,
    typography: D,
    checkbox: F,
    descriptions: B,
    divider: L,
    drawer: A,
    skeleton: O,
    steps: R,
    image: H,
    layout: z,
    list: j,
    mentions: W,
    modal: K,
    progress: Z,
    result: Y,
    slider: Q,
    breadcrumb: le,
    menu: de,
    pagination: fe,
    input: ge,
    textArea: Se,
    empty: $e,
    badge: Me,
    radio: ee,
    rate: Ae,
    switch: ie,
    transfer: ye,
    avatar: Ve,
    message: we,
    tag: We,
    table: Le,
    card: je,
    tabs: Ce,
    timeline: ve,
    timePicker: Oe,
    upload: U,
    notification: te,
    tree: J,
    colorPicker: re,
    datePicker: ae,
    rangePicker: He,
    flex: _e,
    wave: Ee,
    dropdown: ce,
    warning: qe,
    tour: ct,
    tooltip: vt,
    popover: It,
    popconfirm: _r,
    floatButtonGroup: ut,
    variant: Lt,
    inputNumber: Dr,
    treeSelect: br
  } = e, bn = C.useCallback((nt, _) => {
    const {
      prefixCls: G
    } = e;
    if (_)
      return _;
    const ne = G || y.getPrefixCls("");
    return nt ? `${ne}-${nt}` : ne;
  }, [y.getPrefixCls, e.prefixCls]), wr = m || y.iconPrefixCls || gu, rt = r || y.csp;
  F1(wr, rt);
  const Dt = GT(S, y.theme, {
    prefixCls: bn("")
  });
  process.env.NODE_ENV !== "production" && (tc = tc || !!Dt);
  const Fr = {
    csp: rt,
    autoInsertSpaceInButton: n,
    alert: a,
    anchor: o,
    locale: s || p,
    direction: c,
    space: u,
    splitter: d,
    virtual: f,
    popupMatchSelectWidth: g ?? v,
    popupOverflow: h,
    getPrefixCls: bn,
    iconPrefixCls: wr,
    theme: Dt,
    segmented: x,
    statistic: w,
    spin: b,
    calendar: P,
    carousel: k,
    cascader: M,
    collapse: I,
    typography: D,
    checkbox: F,
    descriptions: B,
    divider: L,
    drawer: A,
    skeleton: O,
    steps: R,
    image: H,
    input: ge,
    textArea: Se,
    layout: z,
    list: j,
    mentions: W,
    modal: K,
    progress: Z,
    result: Y,
    slider: Q,
    breadcrumb: le,
    menu: de,
    pagination: fe,
    empty: $e,
    badge: Me,
    radio: ee,
    rate: Ae,
    switch: ie,
    transfer: ye,
    avatar: Ve,
    message: we,
    tag: We,
    table: Le,
    card: je,
    tabs: Ce,
    timeline: ve,
    timePicker: Oe,
    upload: U,
    notification: te,
    tree: J,
    colorPicker: re,
    datePicker: ae,
    rangePicker: He,
    flex: _e,
    wave: Ee,
    dropdown: ce,
    warning: qe,
    tour: ct,
    tooltip: vt,
    popover: It,
    popconfirm: _r,
    floatButtonGroup: ut,
    variant: Lt,
    inputNumber: Dr,
    treeSelect: br
  };
  process.env.NODE_ENV !== "production" && pn("ConfigProvider")(!("autoInsertSpaceInButton" in e), "deprecated", "`autoInsertSpaceInButton` is deprecated. Please use `{ button: { autoInsertSpace: boolean }}` instead.");
  const nr = Object.assign({}, y);
  Object.keys(Fr).forEach((nt) => {
    Fr[nt] !== void 0 && (nr[nt] = Fr[nt]);
  }), ZT.forEach((nt) => {
    const _ = e[nt];
    _ && (nr[nt] = _);
  }), typeof n < "u" && (nr.button = Object.assign({
    autoInsertSpace: n
  }, nr.button));
  const Xt = fc(() => nr, nr, (nt, _) => {
    const G = Object.keys(nt), ne = Object.keys(_);
    return G.length !== ne.length || G.some((pe) => nt[pe] !== _[pe]);
  }), {
    layer: Lr
  } = C.useContext(Xa), en = C.useMemo(() => ({
    prefixCls: wr,
    csp: rt,
    layer: Lr ? "antd" : void 0
  }), [wr, rt, Lr]);
  let dt = /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement(YT, {
    dropdownMatchSelectWidth: v
  }), t);
  const At = C.useMemo(() => {
    var nt, _, G, ne;
    return Tn(((nt = Xi.Form) === null || nt === void 0 ? void 0 : nt.defaultValidateMessages) || {}, ((G = (_ = Xt.locale) === null || _ === void 0 ? void 0 : _.Form) === null || G === void 0 ? void 0 : G.defaultValidateMessages) || {}, ((ne = Xt.form) === null || ne === void 0 ? void 0 : ne.validateMessages) || {}, (i == null ? void 0 : i.validateMessages) || {});
  }, [Xt, i == null ? void 0 : i.validateMessages]);
  Object.keys(At).length > 0 && (dt = /* @__PURE__ */ C.createElement(IT.Provider, {
    value: At
  }, dt)), s && (dt = /* @__PURE__ */ C.createElement(zm, {
    locale: s,
    _ANT_MARK__: jm
  }, dt)), dt = /* @__PURE__ */ C.createElement(pu.Provider, {
    value: en
  }, dt), l && (dt = /* @__PURE__ */ C.createElement(L1, {
    size: l
  }, dt)), dt = /* @__PURE__ */ C.createElement(KT, null, dt);
  const ar = C.useMemo(() => {
    const nt = Dt || {}, {
      algorithm: _,
      token: G,
      components: ne,
      cssVar: pe
    } = nt, ze = XT(nt, ["algorithm", "token", "components", "cssVar"]), Be = _ && (!Array.isArray(_) || _.length > 0) ? ll(_) : Wh, Pe = {};
    Object.entries(ne || {}).forEach((yt) => {
      let [oe, $] = yt;
      const q = Object.assign({}, $);
      "algorithm" in q && (q.algorithm === !0 ? q.theme = Be : (Array.isArray(q.algorithm) || typeof q.algorithm == "function") && (q.theme = ll(q.algorithm)), delete q.algorithm), Pe[oe] = q;
    });
    const Te = Object.assign(Object.assign({}, $a), G);
    return Object.assign(Object.assign({}, ze), {
      theme: Be,
      token: Te,
      components: Pe,
      override: Object.assign({
        override: Te
      }, Pe),
      cssVar: pe
    });
  }, [Dt]);
  return S && (dt = /* @__PURE__ */ C.createElement(qh.Provider, {
    value: ar
  }, dt)), Xt.warning && (dt = /* @__PURE__ */ C.createElement(xm.Provider, {
    value: Xt.warning
  }, dt)), E !== void 0 && (dt = /* @__PURE__ */ C.createElement(S1, {
    disabled: E
  }, dt)), /* @__PURE__ */ C.createElement(Gr.Provider, {
    value: Xt
  }, dt);
}, Vn = (e) => {
  const t = C.useContext(Gr), r = C.useContext(Lm);
  return /* @__PURE__ */ C.createElement(tR, Object.assign({
    parentContext: t,
    legacyLocale: r
  }, e));
};
Vn.ConfigContext = Gr;
Vn.SizeContext = Ln;
Vn.config = eR;
Vn.useConfig = BT;
Object.defineProperty(Vn, "SizeContext", {
  get: () => (process.env.NODE_ENV !== "production" && Yi(!1, "ConfigProvider", "ConfigProvider.SizeContext is deprecated. Please use `ConfigProvider.useConfig().componentSize` instead."), Ln)
});
process.env.NODE_ENV !== "production" && (Vn.displayName = "ConfigProvider");
const Bm = function(e, t) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
  var n, a;
  const {
    variant: o,
    [e]: i
  } = C.useContext(Gr), s = C.useContext(NT), l = i == null ? void 0 : i.variant;
  let c;
  typeof t < "u" ? c = t : r === !1 ? c = "borderless" : c = (a = (n = s ?? l) !== null && n !== void 0 ? n : o) !== null && a !== void 0 ? a : "outlined";
  const u = y1.includes(c);
  return [c, u];
}, Um = /* @__PURE__ */ C.createContext(null), Wm = (e, t) => {
  const r = C.useContext(Um), n = C.useMemo(() => {
    if (!r)
      return "";
    const {
      compactDirection: a,
      isFirstItem: o,
      isLastItem: i
    } = r, s = a === "vertical" ? "-vertical-" : "-";
    return se(`${e}-compact${s}item`, {
      [`${e}-compact${s}first-item`]: o,
      [`${e}-compact${s}last-item`]: i,
      [`${e}-compact${s}item-rtl`]: t === "rtl"
    });
  }, [e, t, r]);
  return {
    compactSize: r == null ? void 0 : r.compactSize,
    compactDirection: r == null ? void 0 : r.compactDirection,
    compactItemClassnames: n
  };
}, rR = (e) => {
  const {
    children: t
  } = e;
  return /* @__PURE__ */ C.createElement(Um.Provider, {
    value: null
  }, t);
}, qf = (e) => {
  const {
    space: t,
    form: r,
    children: n
  } = e;
  if (n == null)
    return null;
  let a = n;
  return r && (a = /* @__PURE__ */ T.createElement(MT, {
    override: !0,
    status: !0
  }, a)), t && (a = /* @__PURE__ */ T.createElement(rR, null, a)), a;
};
function nR(e, t) {
  const r = Ue([]), n = () => {
    r.current.push(setTimeout(() => {
      var a, o, i, s;
      !((a = e.current) === null || a === void 0) && a.input && ((o = e.current) === null || o === void 0 ? void 0 : o.input.getAttribute("type")) === "password" && (!((i = e.current) === null || i === void 0) && i.input.hasAttribute("value")) && ((s = e.current) === null || s === void 0 || s.input.removeAttribute("value"));
    }));
  };
  return Ct(() => (n(), () => r.current.forEach((a) => {
    a && clearTimeout(a);
  })), []), n;
}
function aR(e, t, r) {
  const {
    focusElCls: n,
    focus: a,
    borderElCls: o
  } = r, i = o ? "> *" : "", s = ["hover", a ? "focus" : null, "active"].filter(Boolean).map((l) => `&:${l} ${i}`).join(",");
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
      [`&[disabled] ${i}`]: {
        zIndex: 0
      }
    })
  };
}
function oR(e, t, r) {
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
function iR(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    focus: !0
  };
  const {
    componentCls: r
  } = e, n = `${r}-compact`;
  return {
    [n]: Object.assign(Object.assign({}, aR(e, n, t)), oR(r, n, t))
  };
}
function yu(e) {
  return yn(e, {
    inputAffixPadding: e.paddingXXS
  });
}
const bu = (e) => {
  const {
    controlHeight: t,
    fontSize: r,
    lineHeight: n,
    lineWidth: a,
    controlHeightSM: o,
    controlHeightLG: i,
    fontSizeLG: s,
    lineHeightLG: l,
    paddingSM: c,
    controlPaddingHorizontalSM: u,
    controlPaddingHorizontal: d,
    colorFillAlter: f,
    colorPrimaryHover: v,
    colorPrimary: g,
    controlOutlineWidth: h,
    controlOutline: p,
    colorErrorOutline: y,
    colorWarningOutline: m,
    colorBgContainer: S,
    inputFontSize: E,
    inputFontSizeLG: x,
    inputFontSizeSM: w
  } = e, b = E || r, P = w || b, k = x || s, M = Math.round((t - b * n) / 2 * 10) / 10 - a, I = Math.round((o - P * n) / 2 * 10) / 10 - a, D = Math.ceil((i - k * l) / 2 * 10) / 10 - a;
  return {
    paddingBlock: Math.max(M, 0),
    paddingBlockSM: Math.max(I, 0),
    paddingBlockLG: Math.max(D, 0),
    paddingInline: c - a,
    paddingInlineSM: u - a,
    paddingInlineLG: d - a,
    addonBg: f,
    activeBorderColor: g,
    hoverBorderColor: v,
    activeShadow: `0 0 0 ${h}px ${p}`,
    errorActiveShadow: `0 0 0 ${h}px ${y}`,
    warningActiveShadow: `0 0 0 ${h}px ${m}`,
    hoverBg: S,
    activeBg: S,
    inputFontSize: b,
    inputFontSizeLG: k,
    inputFontSizeSM: P
  };
}, sR = (e) => ({
  borderColor: e.hoverBorderColor,
  backgroundColor: e.hoverBg
}), Su = (e) => ({
  color: e.colorTextDisabled,
  backgroundColor: e.colorBgContainerDisabled,
  borderColor: e.colorBorder,
  boxShadow: "none",
  cursor: "not-allowed",
  opacity: 1,
  "input[disabled], textarea[disabled]": {
    cursor: "not-allowed"
  },
  "&:hover:not([disabled])": Object.assign({}, sR(yn(e, {
    hoverBorderColor: e.colorBorder,
    hoverBg: e.colorBgContainerDisabled
  })))
}), qm = (e, t) => ({
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
}), Gf = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, qm(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  }),
  [`&${e.componentCls}-status-${t.status}${e.componentCls}-disabled`]: {
    borderColor: t.borderColor
  }
}), lR = (e, t) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, qm(e, {
    borderColor: e.colorBorder,
    hoverBorderColor: e.hoverBorderColor,
    activeBorderColor: e.activeBorderColor,
    activeShadow: e.activeShadow
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, Su(e))
  }), Gf(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), Gf(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), t)
}), Kf = (e, t) => ({
  [`&${e.componentCls}-group-wrapper-status-${t.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      borderColor: t.addonBorderColor,
      color: t.addonColor
    }
  }
}), cR = (e) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group`]: {
      "&-addon": {
        background: e.addonBg,
        border: `${it(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
      },
      "&-addon:first-child": {
        borderInlineEnd: 0
      },
      "&-addon:last-child": {
        borderInlineStart: 0
      }
    }
  }, Kf(e, {
    status: "error",
    addonBorderColor: e.colorError,
    addonColor: e.colorErrorText
  })), Kf(e, {
    status: "warning",
    addonBorderColor: e.colorWarning,
    addonColor: e.colorWarningText
  })), {
    [`&${e.componentCls}-group-wrapper-disabled`]: {
      [`${e.componentCls}-group-addon`]: Object.assign({}, Su(e))
    }
  })
}), uR = (e, t) => {
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
}, Gm = (e, t) => {
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
}, Yf = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, Gm(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  })
}), dR = (e, t) => ({
  "&-filled": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Gm(e, {
    bg: e.colorFillTertiary,
    hoverBg: e.colorFillSecondary,
    activeBorderColor: e.activeBorderColor
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, Su(e))
  }), Yf(e, {
    status: "error",
    bg: e.colorErrorBg,
    hoverBg: e.colorErrorBgHover,
    activeBorderColor: e.colorError,
    inputColor: e.colorErrorText,
    affixColor: e.colorError
  })), Yf(e, {
    status: "warning",
    bg: e.colorWarningBg,
    hoverBg: e.colorWarningBgHover,
    activeBorderColor: e.colorWarning,
    inputColor: e.colorWarningText,
    affixColor: e.colorWarning
  })), t)
}), Xf = (e, t) => ({
  [`&${e.componentCls}-group-wrapper-status-${t.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      background: t.addonBg,
      color: t.addonColor
    }
  }
}), fR = (e) => ({
  "&-filled": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group`]: {
      "&-addon": {
        background: e.colorFillTertiary
      },
      [`${e.componentCls}-filled:not(:focus):not(:focus-within)`]: {
        "&:not(:first-child)": {
          borderInlineStart: `${it(e.lineWidth)} ${e.lineType} ${e.colorSplit}`
        },
        "&:not(:last-child)": {
          borderInlineEnd: `${it(e.lineWidth)} ${e.lineType} ${e.colorSplit}`
        }
      }
    }
  }, Xf(e, {
    status: "error",
    addonBg: e.colorErrorBg,
    addonColor: e.colorErrorText
  })), Xf(e, {
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
          borderInlineStart: `${it(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${it(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${it(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        },
        "&-addon:last-child": {
          borderInlineEnd: `${it(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${it(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${it(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        }
      }
    }
  })
}), Km = (e, t) => ({
  background: e.colorBgContainer,
  borderWidth: `${it(e.lineWidth)} 0`,
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
}), Zf = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, Km(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  }),
  [`&${e.componentCls}-status-${t.status}${e.componentCls}-disabled`]: {
    borderColor: `transparent transparent ${t.borderColor} transparent`
  }
}), pR = (e, t) => ({
  "&-underlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Km(e, {
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
  }), Zf(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), Zf(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), t)
}), hR = (e) => ({
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
}), Ym = (e) => {
  const {
    paddingBlockLG: t,
    lineHeightLG: r,
    borderRadiusLG: n,
    paddingInlineLG: a
  } = e;
  return {
    padding: `${it(t)} ${it(a)}`,
    fontSize: e.inputFontSizeLG,
    lineHeight: r,
    borderRadius: n
  };
}, Xm = (e) => ({
  padding: `${it(e.paddingBlockSM)} ${it(e.paddingInlineSM)}`,
  fontSize: e.inputFontSizeSM,
  borderRadius: e.borderRadiusSM
}), Zm = (e) => Object.assign(Object.assign({
  position: "relative",
  display: "inline-block",
  width: "100%",
  minWidth: 0,
  padding: `${it(e.paddingBlock)} ${it(e.paddingInline)}`,
  color: e.colorText,
  fontSize: e.inputFontSize,
  lineHeight: e.lineHeight,
  borderRadius: e.borderRadius,
  transition: `all ${e.motionDurationMid}`
}, hR(e.colorTextPlaceholder)), {
  // Size
  "&-lg": Object.assign({}, Ym(e)),
  "&-sm": Object.assign({}, Xm(e)),
  // RTL
  "&-rtl, &-textarea-rtl": {
    direction: "rtl"
  }
}), gR = (e) => {
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
    [`&-lg ${t}, &-lg > ${t}-group-addon`]: Object.assign({}, Ym(e)),
    [`&-sm ${t}, &-sm > ${t}-group-addon`]: Object.assign({}, Xm(e)),
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
        padding: `0 ${it(e.paddingInline)}`,
        color: e.colorText,
        fontWeight: "normal",
        fontSize: e.inputFontSize,
        textAlign: "center",
        borderRadius: e.borderRadius,
        transition: `all ${e.motionDurationSlow}`,
        lineHeight: 1,
        // Reset Select's style in addon
        [`${r}-select`]: {
          margin: `${it(e.calc(e.paddingBlock).add(1).mul(-1).equal())} ${it(e.calc(e.paddingInline).mul(-1).equal())}`,
          [`&${r}-select-single:not(${r}-select-customize-input):not(${r}-pagination-size-changer)`]: {
            [`${r}-select-selector`]: {
              backgroundColor: "inherit",
              border: `${it(e.lineWidth)} ${e.lineType} transparent`,
              boxShadow: "none"
            }
          }
        },
        // https://github.com/ant-design/ant-design/issues/31333
        [`${r}-cascader-picker`]: {
          margin: `-9px ${it(e.calc(e.paddingInline).mul(-1).equal())}`,
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
    }, N1()), {
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
}, mR = (e) => {
  const {
    componentCls: t,
    controlHeightSM: r,
    lineWidth: n,
    calc: a
  } = e, i = a(r).sub(a(n).mul(2)).sub(16).div(2).equal();
  return {
    [t]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Tm(e)), Zm(e)), lR(e)), dR(e)), uR(e)), pR(e)), {
      '&[type="color"]': {
        height: e.controlHeight,
        [`&${t}-lg`]: {
          height: e.controlHeightLG
        },
        [`&${t}-sm`]: {
          height: r,
          paddingTop: i,
          paddingBottom: i
        }
      },
      '&[type="search"]::-webkit-search-cancel-button, &[type="search"]::-webkit-search-decoration': {
        appearance: "none"
      }
    })
  };
}, vR = (e) => {
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
        margin: `0 ${it(e.inputAffixPadding)}`
      }
    }
  };
}, yR = (e) => {
  const {
    componentCls: t,
    inputAffixPadding: r,
    colorTextDescription: n,
    motionDurationSlow: a,
    colorIcon: o,
    colorIconHover: i,
    iconCls: s
  } = e, l = `${t}-affix-wrapper`, c = `${t}-affix-wrapper-disabled`;
  return {
    [l]: Object.assign(Object.assign(Object.assign(Object.assign({}, Zm(e)), {
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
    }), vR(e)), {
      // password
      [`${s}${t}-password-icon`]: {
        color: o,
        cursor: "pointer",
        transition: `all ${a}`,
        "&:hover": {
          color: i
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
        color: o,
        cursor: "not-allowed",
        "&:hover": {
          color: o
        }
      }
    }
  };
}, bR = (e) => {
  const {
    componentCls: t,
    borderRadiusLG: r,
    borderRadiusSM: n
  } = e;
  return {
    [`${t}-group`]: Object.assign(Object.assign(Object.assign({}, Tm(e)), gR(e)), {
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
      }, cR(e)), fR(e)), {
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
}, SR = (e) => {
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
}, ER = (e) => {
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
}, Qm = mu(["Input", "Shared"], (e) => {
  const t = yn(e, yu(e));
  return [mR(t), yR(t)];
}, bu, {
  resetFont: !1
}), xR = mu(["Input", "Component"], (e) => {
  const t = yn(e, yu(e));
  return [
    bR(t),
    SR(t),
    ER(t),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    iR(t)
  ];
}, bu, {
  resetFont: !1
});
function CR(e) {
  return !!(e.prefix || e.suffix || e.allowClear || e.showCount);
}
var _R = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const wR = /* @__PURE__ */ rc((e, t) => {
  const {
    prefixCls: r,
    bordered: n = !0,
    status: a,
    size: o,
    disabled: i,
    onBlur: s,
    onFocus: l,
    suffix: c,
    allowClear: u,
    addonAfter: d,
    addonBefore: f,
    className: v,
    style: g,
    styles: h,
    rootClassName: p,
    onChange: y,
    classNames: m,
    variant: S
  } = e, E = _R(e, ["prefixCls", "bordered", "status", "size", "disabled", "onBlur", "onFocus", "suffix", "allowClear", "addonAfter", "addonBefore", "className", "style", "styles", "rootClassName", "onChange", "classNames", "variant"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: we
    } = pn("Input");
    we(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: x,
    direction: w,
    allowClear: b,
    autoComplete: P,
    className: k,
    style: M,
    classNames: I,
    styles: D
  } = Cm("input"), F = x("input", r), B = Ue(null), L = Am(F), [A, O, R] = Qm(F, p), [H] = xR(F, L), {
    compactSize: z,
    compactItemClassnames: j
  } = Wm(F, w), W = Pm((we) => {
    var We;
    return (We = o ?? z) !== null && We !== void 0 ? We : we;
  }), K = T.useContext(Aa), Z = i ?? K, {
    status: Y,
    hasFeedback: Q,
    feedbackIcon: le
  } = pr(Pa), de = Sm(Y, a), fe = CR(e) || !!Q, ge = Ue(fe);
  if (process.env.NODE_ENV !== "production") {
    const we = pn("Input");
    Ct(() => {
      var We;
      fe && !ge.current && process.env.NODE_ENV !== "production" && we(document.activeElement === ((We = B.current) === null || We === void 0 ? void 0 : We.input), "usage", "When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ"), ge.current = fe;
    }, [fe]);
  }
  const Se = nR(B), $e = (we) => {
    Se(), s == null || s(we);
  }, Me = (we) => {
    Se(), l == null || l(we);
  }, ee = (we) => {
    Se(), y == null || y(we);
  }, Ae = (Q || c) && /* @__PURE__ */ T.createElement(T.Fragment, null, c, Q && le), ie = bm(u ?? b), [ye, Ve] = Bm("input", S, n);
  return A(H(/* @__PURE__ */ T.createElement(_$, Object.assign({
    ref: Cp(t, B),
    prefixCls: F,
    autoComplete: P
  }, E, {
    disabled: Z,
    onBlur: $e,
    onFocus: Me,
    style: Object.assign(Object.assign({}, M), g),
    styles: Object.assign(Object.assign({}, D), h),
    suffix: Ae,
    allowClear: ie,
    className: se(v, p, R, L, j, k),
    onChange: ee,
    addonBefore: f && /* @__PURE__ */ T.createElement(qf, {
      form: !0,
      space: !0
    }, f),
    addonAfter: d && /* @__PURE__ */ T.createElement(qf, {
      form: !0,
      space: !0
    }, d),
    classNames: Object.assign(Object.assign(Object.assign({}, m), I), {
      input: se({
        [`${F}-sm`]: W === "small",
        [`${F}-lg`]: W === "large",
        [`${F}-rtl`]: w === "rtl"
      }, m == null ? void 0 : m.input, I.input, O),
      variant: se({
        [`${F}-${ye}`]: Ve
      }, Vl(F, de)),
      affixWrapper: se({
        [`${F}-affix-wrapper-sm`]: W === "small",
        [`${F}-affix-wrapper-lg`]: W === "large",
        [`${F}-affix-wrapper-rtl`]: w === "rtl"
      }, O),
      wrapper: se({
        [`${F}-group-rtl`]: w === "rtl"
      }, O),
      groupWrapper: se({
        [`${F}-group-wrapper-sm`]: W === "small",
        [`${F}-group-wrapper-lg`]: W === "large",
        [`${F}-group-wrapper-rtl`]: w === "rtl",
        [`${F}-group-wrapper-${ye}`]: Ve
      }, Vl(`${F}-group-wrapper`, de, Q), O)
    })
  }))));
});
process.env.NODE_ENV !== "production" && (wR.displayName = "Input");
const $R = (e) => {
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
}, TR = mu(["Input", "TextArea"], (e) => {
  const t = yn(e, yu(e));
  return [$R(t)];
}, bu, {
  resetFont: !1
});
var RR = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const WR = /* @__PURE__ */ rc((e, t) => {
  var r;
  const {
    prefixCls: n,
    bordered: a = !0,
    size: o,
    disabled: i,
    status: s,
    allowClear: l,
    classNames: c,
    rootClassName: u,
    className: d,
    style: f,
    styles: v,
    variant: g,
    showCount: h,
    onMouseDown: p,
    onResize: y
  } = e, m = RR(e, ["prefixCls", "bordered", "size", "disabled", "status", "allowClear", "classNames", "rootClassName", "className", "style", "styles", "variant", "showCount", "onMouseDown", "onResize"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: ie
    } = pn("TextArea");
    ie(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: S,
    direction: E,
    allowClear: x,
    autoComplete: w,
    className: b,
    style: P,
    classNames: k,
    styles: M
  } = Cm("textArea"), I = C.useContext(Aa), D = i ?? I, {
    status: F,
    hasFeedback: B,
    feedbackIcon: L
  } = C.useContext(Pa), A = Sm(F, s), O = C.useRef(null);
  C.useImperativeHandle(t, () => {
    var ie;
    return {
      resizableTextArea: (ie = O.current) === null || ie === void 0 ? void 0 : ie.resizableTextArea,
      focus: (ye) => {
        var Ve, we;
        nm((we = (Ve = O.current) === null || Ve === void 0 ? void 0 : Ve.resizableTextArea) === null || we === void 0 ? void 0 : we.textArea, ye);
      },
      blur: () => {
        var ye;
        return (ye = O.current) === null || ye === void 0 ? void 0 : ye.blur();
      }
    };
  });
  const R = S("input", n), H = Am(R), [z, j, W] = Qm(R, u), [K] = TR(R, H), {
    compactSize: Z,
    compactItemClassnames: Y
  } = Wm(R, E), Q = Pm((ie) => {
    var ye;
    return (ye = o ?? Z) !== null && ye !== void 0 ? ye : ie;
  }), [le, de] = Bm("textArea", g, a), fe = bm(l ?? x), [ge, Se] = C.useState(!1), [$e, Me] = C.useState(!1), ee = (ie) => {
    Se(!0), p == null || p(ie);
    const ye = () => {
      Se(!1), document.removeEventListener("mouseup", ye);
    };
    document.addEventListener("mouseup", ye);
  }, Ae = (ie) => {
    var ye, Ve;
    if (y == null || y(ie), ge && typeof getComputedStyle == "function") {
      const we = (Ve = (ye = O.current) === null || ye === void 0 ? void 0 : ye.nativeElement) === null || Ve === void 0 ? void 0 : Ve.querySelector("textarea");
      we && getComputedStyle(we).resize === "both" && Me(!0);
    }
  };
  return z(K(/* @__PURE__ */ C.createElement(n1, Object.assign({
    autoComplete: w
  }, m, {
    style: Object.assign(Object.assign({}, P), f),
    styles: Object.assign(Object.assign({}, M), v),
    disabled: D,
    allowClear: fe,
    className: se(
      W,
      H,
      d,
      u,
      Y,
      b,
      // Only for wrapper
      $e && `${R}-textarea-affix-wrapper-resize-dirty`
    ),
    classNames: Object.assign(Object.assign(Object.assign({}, c), k), {
      textarea: se({
        [`${R}-sm`]: Q === "small",
        [`${R}-lg`]: Q === "large"
      }, j, c == null ? void 0 : c.textarea, k.textarea, ge && `${R}-mouse-active`),
      variant: se({
        [`${R}-${le}`]: de
      }, Vl(R, A)),
      affixWrapper: se(`${R}-textarea-affix-wrapper`, {
        [`${R}-affix-wrapper-rtl`]: E === "rtl",
        [`${R}-affix-wrapper-sm`]: Q === "small",
        [`${R}-affix-wrapper-lg`]: Q === "large",
        [`${R}-textarea-show-count`]: h || ((r = e.count) === null || r === void 0 ? void 0 : r.show)
      }, j)
    }),
    prefixCls: R,
    suffix: B && /* @__PURE__ */ C.createElement("span", {
      className: `${R}-textarea-suffix`
    }, L),
    showCount: h,
    ref: O,
    onResize: Ae,
    onMouseDown: ee
  }))));
});
export {
  zR as A,
  dg as C,
  gn as F,
  FR as I,
  Bc as S,
  WR as T,
  b$ as X,
  HR as a,
  O0 as b,
  BR as c,
  Sb as d,
  ab as e,
  Vy as f,
  $y as g,
  uy as h,
  Kv as i,
  DR as j,
  kv as k,
  VR as u
};
