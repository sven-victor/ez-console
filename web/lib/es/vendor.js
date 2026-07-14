import * as b from "react";
import B, { isValidElement as Tu, version as Fu, useContext as dt, createContext as Si, useRef as _e, useLayoutEffect as Au, useEffect as Ze, cloneElement as Mu, forwardRef as xi, useState as Pa, useImperativeHandle as rl, useMemo as ju } from "react";
import { g as Ct } from "./vite.js";
import Yi from "react-dom";
import de from "classnames";
var hn = { exports: {} }, Zt = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gi;
function Nu() {
  if (Gi) return Zt;
  Gi = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(n, a, i) {
    var o = null;
    if (i !== void 0 && (o = "" + i), a.key !== void 0 && (o = "" + a.key), "key" in a) {
      i = {};
      for (var s in a)
        s !== "key" && (i[s] = a[s]);
    } else i = a;
    return a = i.ref, {
      $$typeof: e,
      type: n,
      key: o,
      ref: a !== void 0 ? a : null,
      props: i
    };
  }
  return Zt.Fragment = t, Zt.jsx = r, Zt.jsxs = r, Zt;
}
var Jt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ki;
function ku() {
  return Ki || (Ki = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(w) {
      if (w == null) return null;
      if (typeof w == "function")
        return w.$$typeof === M ? null : w.displayName || w.name || null;
      if (typeof w == "string") return w;
      switch (w) {
        case f:
          return "Fragment";
        case m:
          return "Profiler";
        case S:
          return "StrictMode";
        case $:
          return "Suspense";
        case E:
          return "SuspenseList";
        case T:
          return "Activity";
      }
      if (typeof w == "object")
        switch (typeof w.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), w.$$typeof) {
          case p:
            return "Portal";
          case P:
            return w.displayName || "Context";
          case _:
            return (w._context.displayName || "Context") + ".Consumer";
          case C:
            var N = w.render;
            return w = w.displayName, w || (w = N.displayName || N.name || "", w = w !== "" ? "ForwardRef(" + w + ")" : "ForwardRef"), w;
          case y:
            return N = w.displayName || null, N !== null ? N : e(w.type) || "Memo";
          case R:
            N = w._payload, w = w._init;
            try {
              return e(w(N));
            } catch {
            }
        }
      return null;
    }
    function t(w) {
      return "" + w;
    }
    function r(w) {
      try {
        t(w);
        var N = !1;
      } catch {
        N = !0;
      }
      if (N) {
        N = console;
        var V = N.error, z = typeof Symbol == "function" && Symbol.toStringTag && w[Symbol.toStringTag] || w.constructor.name || "Object";
        return V.call(
          N,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          z
        ), t(w);
      }
    }
    function n(w) {
      if (w === f) return "<>";
      if (typeof w == "object" && w !== null && w.$$typeof === R)
        return "<...>";
      try {
        var N = e(w);
        return N ? "<" + N + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function a() {
      var w = j.A;
      return w === null ? null : w.getOwner();
    }
    function i() {
      return Error("react-stack-top-frame");
    }
    function o(w) {
      if (F.call(w, "key")) {
        var N = Object.getOwnPropertyDescriptor(w, "key").get;
        if (N && N.isReactWarning) return !1;
      }
      return w.key !== void 0;
    }
    function s(w, N) {
      function V() {
        k || (k = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          N
        ));
      }
      V.isReactWarning = !0, Object.defineProperty(w, "key", {
        get: V,
        configurable: !0
      });
    }
    function l() {
      var w = e(this.type);
      return D[w] || (D[w] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), w = this.props.ref, w !== void 0 ? w : null;
    }
    function c(w, N, V, z, re, Q) {
      var Y = V.ref;
      return w = {
        $$typeof: h,
        type: w,
        key: N,
        props: V,
        _owner: z
      }, (Y !== void 0 ? Y : null) !== null ? Object.defineProperty(w, "ref", {
        enumerable: !1,
        get: l
      }) : Object.defineProperty(w, "ref", { enumerable: !1, value: null }), w._store = {}, Object.defineProperty(w._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(w, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(w, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: re
      }), Object.defineProperty(w, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Q
      }), Object.freeze && (Object.freeze(w.props), Object.freeze(w)), w;
    }
    function u(w, N, V, z, re, Q) {
      var Y = N.children;
      if (Y !== void 0)
        if (z)
          if (A(Y)) {
            for (z = 0; z < Y.length; z++)
              d(Y[z]);
            Object.freeze && Object.freeze(Y);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else d(Y);
      if (F.call(N, "key")) {
        Y = e(w);
        var ee = Object.keys(N).filter(function(oe) {
          return oe !== "key";
        });
        z = 0 < ee.length ? "{key: someKey, " + ee.join(": ..., ") + ": ...}" : "{key: someKey}", U[Y + z] || (ee = 0 < ee.length ? "{" + ee.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          z,
          Y,
          ee,
          Y
        ), U[Y + z] = !0);
      }
      if (Y = null, V !== void 0 && (r(V), Y = "" + V), o(N) && (r(N.key), Y = "" + N.key), "key" in N) {
        V = {};
        for (var ie in N)
          ie !== "key" && (V[ie] = N[ie]);
      } else V = N;
      return Y && s(
        V,
        typeof w == "function" ? w.displayName || w.name || "Unknown" : w
      ), c(
        w,
        Y,
        V,
        a(),
        re,
        Q
      );
    }
    function d(w) {
      v(w) ? w._store && (w._store.validated = 1) : typeof w == "object" && w !== null && w.$$typeof === R && (w._payload.status === "fulfilled" ? v(w._payload.value) && w._payload.value._store && (w._payload.value._store.validated = 1) : w._store && (w._store.validated = 1));
    }
    function v(w) {
      return typeof w == "object" && w !== null && w.$$typeof === h;
    }
    var g = B, h = Symbol.for("react.transitional.element"), p = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), _ = Symbol.for("react.consumer"), P = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), T = Symbol.for("react.activity"), M = Symbol.for("react.client.reference"), j = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = Object.prototype.hasOwnProperty, A = Array.isArray, I = console.createTask ? console.createTask : function() {
      return null;
    };
    g = {
      react_stack_bottom_frame: function(w) {
        return w();
      }
    };
    var k, D = {}, H = g.react_stack_bottom_frame.bind(
      g,
      i
    )(), K = I(n(i)), U = {};
    Jt.Fragment = f, Jt.jsx = function(w, N, V) {
      var z = 1e4 > j.recentlyCreatedOwnerStacks++;
      return u(
        w,
        N,
        V,
        !1,
        z ? Error("react-stack-top-frame") : H,
        z ? I(n(w)) : K
      );
    }, Jt.jsxs = function(w, N, V) {
      var z = 1e4 > j.recentlyCreatedOwnerStacks++;
      return u(
        w,
        N,
        V,
        !0,
        z ? Error("react-stack-top-frame") : H,
        z ? I(n(w)) : K
      );
    };
  })()), Jt;
}
var Xi;
function Iu() {
  return Xi || (Xi = 1, process.env.NODE_ENV === "production" ? hn.exports = Nu() : hn.exports = ku()), hn.exports;
}
var cg = Iu(), Qt = {}, na = { exports: {} }, Zi;
function ve() {
  return Zi || (Zi = 1, (function(e) {
    function t(r) {
      return r && r.__esModule ? r : {
        default: r
      };
    }
    e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
  })(na)), na.exports;
}
var er = {}, Ji;
function Du() {
  if (Ji) return er;
  Ji = 1, Object.defineProperty(er, "__esModule", {
    value: !0
  }), er.default = void 0;
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
  return er.default = e, er;
}
var tr = {}, rr = {}, nr = {}, aa = { exports: {} }, ia = { exports: {} }, oa = { exports: {} }, sa = { exports: {} }, Qi;
function nl() {
  return Qi || (Qi = 1, (function(e) {
    function t(r) {
      "@babel/helpers - typeof";
      return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
        return typeof n;
      } : function(n) {
        return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
      }, e.exports.__esModule = !0, e.exports.default = e.exports, t(r);
    }
    e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
  })(sa)), sa.exports;
}
var la = { exports: {} }, eo;
function Vu() {
  return eo || (eo = 1, (function(e) {
    var t = nl().default;
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
  })(la)), la.exports;
}
var to;
function zu() {
  return to || (to = 1, (function(e) {
    var t = nl().default, r = Vu();
    function n(a) {
      var i = r(a, "string");
      return t(i) == "symbol" ? i : i + "";
    }
    e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
  })(oa)), oa.exports;
}
var ro;
function Lu() {
  return ro || (ro = 1, (function(e) {
    var t = zu();
    function r(n, a, i) {
      return (a = t(a)) in n ? Object.defineProperty(n, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : n[a] = i, n;
    }
    e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
  })(ia)), ia.exports;
}
var no;
function _t() {
  return no || (no = 1, (function(e) {
    var t = Lu();
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
  })(aa)), aa.exports;
}
var ar = {}, ao;
function $t() {
  return ao || (ao = 1, Object.defineProperty(ar, "__esModule", {
    value: !0
  }), ar.commonLocale = void 0, ar.commonLocale = {
    yearFormat: "YYYY",
    dayFormat: "D",
    cellMeridiemFormat: "A",
    monthBeforeYear: !0
  }), ar;
}
var io;
function Hu() {
  if (io) return nr;
  io = 1;
  var e = ve().default;
  Object.defineProperty(nr, "__esModule", {
    value: !0
  }), nr.default = void 0;
  var t = e(_t()), r = $t(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return nr.default = n, nr;
}
var ir = {}, oo;
function al() {
  if (oo) return ir;
  oo = 1, Object.defineProperty(ir, "__esModule", {
    value: !0
  }), ir.default = void 0;
  const e = {
    placeholder: "请选择时间",
    rangePlaceholder: ["开始时间", "结束时间"]
  };
  return ir.default = e, ir;
}
var so;
function il() {
  if (so) return rr;
  so = 1;
  var e = ve().default;
  Object.defineProperty(rr, "__esModule", {
    value: !0
  }), rr.default = void 0;
  var t = e(Hu()), r = e(/* @__PURE__ */ al());
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
  return n.lang.ok = "确定", rr.default = n, rr;
}
var lo;
function qu() {
  if (lo) return tr;
  lo = 1;
  var e = ve().default;
  Object.defineProperty(tr, "__esModule", {
    value: !0
  }), tr.default = void 0;
  var t = e(/* @__PURE__ */ il());
  return tr.default = t.default, tr;
}
var co;
function Bu() {
  if (co) return Qt;
  co = 1;
  var e = ve().default;
  Object.defineProperty(Qt, "__esModule", {
    value: !0
  }), Qt.default = void 0;
  var t = e(Du()), r = e(/* @__PURE__ */ qu()), n = e(/* @__PURE__ */ il()), a = e(/* @__PURE__ */ al());
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
  return Qt.default = o, Qt;
}
var Wu = /* @__PURE__ */ Bu();
const ug = /* @__PURE__ */ Ct(Wu);
var or = {}, sr = {}, uo;
function Uu() {
  if (uo) return sr;
  uo = 1, Object.defineProperty(sr, "__esModule", {
    value: !0
  }), sr.default = void 0;
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
  return sr.default = e, sr;
}
var lr = {}, cr = {}, ur = {}, fo;
function Yu() {
  if (fo) return ur;
  fo = 1;
  var e = ve().default;
  Object.defineProperty(ur, "__esModule", {
    value: !0
  }), ur.default = void 0;
  var t = e(_t()), r = $t(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return ur.default = n, ur;
}
var dr = {}, vo;
function ol() {
  if (vo) return dr;
  vo = 1, Object.defineProperty(dr, "__esModule", {
    value: !0
  }), dr.default = void 0;
  const e = {
    placeholder: "Select time",
    rangePlaceholder: ["Start time", "End time"]
  };
  return dr.default = e, dr;
}
var po;
function sl() {
  if (po) return cr;
  po = 1;
  var e = ve().default;
  Object.defineProperty(cr, "__esModule", {
    value: !0
  }), cr.default = void 0;
  var t = e(Yu()), r = e(/* @__PURE__ */ ol());
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
  return cr.default = n, cr;
}
var ho;
function Gu() {
  if (ho) return lr;
  ho = 1;
  var e = ve().default;
  Object.defineProperty(lr, "__esModule", {
    value: !0
  }), lr.default = void 0;
  var t = e(/* @__PURE__ */ sl());
  return lr.default = t.default, lr;
}
var mo;
function Ku() {
  if (mo) return or;
  mo = 1;
  var e = ve().default;
  Object.defineProperty(or, "__esModule", {
    value: !0
  }), or.default = void 0;
  var t = e(Uu()), r = e(/* @__PURE__ */ Gu()), n = e(/* @__PURE__ */ sl()), a = e(/* @__PURE__ */ ol());
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
  return or.default = o, or;
}
var Xu = /* @__PURE__ */ Ku();
const dg = /* @__PURE__ */ Ct(Xu);
var fr = {}, vr = {}, go;
function Zu() {
  if (go) return vr;
  go = 1, Object.defineProperty(vr, "__esModule", {
    value: !0
  }), vr.default = void 0;
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
  return vr.default = e, vr;
}
var pr = {}, hr = {}, mr = {}, bo;
function Ju() {
  if (bo) return mr;
  bo = 1;
  var e = ve().default;
  Object.defineProperty(mr, "__esModule", {
    value: !0
  }), mr.default = void 0;
  var t = e(_t()), r = $t(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return mr.default = n, mr;
}
var gr = {}, yo;
function ll() {
  if (yo) return gr;
  yo = 1, Object.defineProperty(gr, "__esModule", {
    value: !0
  }), gr.default = void 0;
  const e = {
    placeholder: "Zeit auswählen",
    rangePlaceholder: ["Startzeit", "Endzeit"]
  };
  return gr.default = e, gr;
}
var So;
function cl() {
  if (So) return hr;
  So = 1;
  var e = ve().default;
  Object.defineProperty(hr, "__esModule", {
    value: !0
  }), hr.default = void 0;
  var t = e(Ju()), r = e(/* @__PURE__ */ ll());
  const n = {
    lang: Object.assign({
      placeholder: "Datum auswählen",
      rangePlaceholder: ["Startdatum", "Enddatum"],
      shortWeekDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      shortMonths: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
    }, t.default),
    timePickerLocale: Object.assign({}, r.default)
  };
  return hr.default = n, hr;
}
var xo;
function Qu() {
  if (xo) return pr;
  xo = 1;
  var e = ve().default;
  Object.defineProperty(pr, "__esModule", {
    value: !0
  }), pr.default = void 0;
  var t = e(/* @__PURE__ */ cl());
  return pr.default = t.default, pr;
}
var Eo;
function ed() {
  if (Eo) return fr;
  Eo = 1;
  var e = ve().default;
  Object.defineProperty(fr, "__esModule", {
    value: !0
  }), fr.default = void 0;
  var t = e(Zu()), r = e(/* @__PURE__ */ Qu()), n = e(/* @__PURE__ */ cl()), a = e(/* @__PURE__ */ ll());
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
  return fr.default = o, fr;
}
var td = /* @__PURE__ */ ed();
const fg = /* @__PURE__ */ Ct(td);
var br = {}, yr = {}, Co;
function rd() {
  if (Co) return yr;
  Co = 1, Object.defineProperty(yr, "__esModule", {
    value: !0
  }), yr.default = void 0;
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
  return yr.default = e, yr;
}
var Sr = {}, xr = {}, Er = {}, _o;
function nd() {
  if (_o) return Er;
  _o = 1;
  var e = ve().default;
  Object.defineProperty(Er, "__esModule", {
    value: !0
  }), Er.default = void 0;
  var t = e(_t()), r = $t(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return Er.default = n, Er;
}
var Cr = {}, $o;
function ul() {
  if ($o) return Cr;
  $o = 1, Object.defineProperty(Cr, "__esModule", {
    value: !0
  }), Cr.default = void 0;
  const e = {
    placeholder: "Seleccionar hora"
  };
  return Cr.default = e, Cr;
}
var wo;
function dl() {
  if (wo) return xr;
  wo = 1;
  var e = ve().default;
  Object.defineProperty(xr, "__esModule", {
    value: !0
  }), xr.default = void 0;
  var t = e(nd()), r = e(/* @__PURE__ */ ul());
  const n = {
    lang: Object.assign({
      placeholder: "Seleccionar fecha",
      rangePlaceholder: ["Fecha inicial", "Fecha final"],
      shortWeekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      shortMonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    }, t.default),
    timePickerLocale: Object.assign({}, r.default)
  };
  return xr.default = n, xr;
}
var Po;
function ad() {
  if (Po) return Sr;
  Po = 1;
  var e = ve().default;
  Object.defineProperty(Sr, "__esModule", {
    value: !0
  }), Sr.default = void 0;
  var t = e(/* @__PURE__ */ dl());
  return Sr.default = t.default, Sr;
}
var Ro;
function id() {
  if (Ro) return br;
  Ro = 1;
  var e = ve().default;
  Object.defineProperty(br, "__esModule", {
    value: !0
  }), br.default = void 0;
  var t = e(rd()), r = e(/* @__PURE__ */ ad()), n = e(/* @__PURE__ */ dl()), a = e(/* @__PURE__ */ ul());
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
  return br.default = o, br;
}
var od = /* @__PURE__ */ id();
const vg = /* @__PURE__ */ Ct(od);
var _r = {}, $r = {}, Oo;
function sd() {
  if (Oo) return $r;
  Oo = 1, Object.defineProperty($r, "__esModule", {
    value: !0
  }), $r.default = void 0;
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
  return $r.default = e, $r;
}
var wr = {}, Pr = {}, Rr = {}, To;
function ld() {
  if (To) return Rr;
  To = 1;
  var e = ve().default;
  Object.defineProperty(Rr, "__esModule", {
    value: !0
  }), Rr.default = void 0;
  var t = e(_t()), r = $t(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return Rr.default = n, Rr;
}
var Or = {}, Fo;
function fl() {
  if (Fo) return Or;
  Fo = 1, Object.defineProperty(Or, "__esModule", {
    value: !0
  }), Or.default = void 0;
  const e = {
    placeholder: "Sélectionner l'heure",
    rangePlaceholder: ["Heure de début", "Heure de fin"]
  };
  return Or.default = e, Or;
}
var Ao;
function vl() {
  if (Ao) return Pr;
  Ao = 1;
  var e = ve().default;
  Object.defineProperty(Pr, "__esModule", {
    value: !0
  }), Pr.default = void 0;
  var t = e(ld()), r = e(/* @__PURE__ */ fl());
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
  return Pr.default = n, Pr;
}
var Mo;
function cd() {
  if (Mo) return wr;
  Mo = 1;
  var e = ve().default;
  Object.defineProperty(wr, "__esModule", {
    value: !0
  }), wr.default = void 0;
  var t = e(/* @__PURE__ */ vl());
  return wr.default = t.default, wr;
}
var jo;
function ud() {
  if (jo) return _r;
  jo = 1;
  var e = ve().default;
  Object.defineProperty(_r, "__esModule", {
    value: !0
  }), _r.default = void 0;
  var t = e(sd()), r = e(/* @__PURE__ */ cd()), n = e(/* @__PURE__ */ vl()), a = e(/* @__PURE__ */ fl());
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
  return _r.default = o, _r;
}
var dd = /* @__PURE__ */ ud();
const pg = /* @__PURE__ */ Ct(dd);
var Tr = {}, Fr = {}, No;
function fd() {
  if (No) return Fr;
  No = 1, Object.defineProperty(Fr, "__esModule", {
    value: !0
  }), Fr.default = void 0;
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
  return Fr.default = e, Fr;
}
var Ar = {}, Mr = {}, jr = {}, ko;
function vd() {
  if (ko) return jr;
  ko = 1;
  var e = ve().default;
  Object.defineProperty(jr, "__esModule", {
    value: !0
  }), jr.default = void 0;
  var t = e(_t()), r = $t(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return jr.default = n, jr;
}
var Nr = {}, Io;
function pl() {
  if (Io) return Nr;
  Io = 1, Object.defineProperty(Nr, "__esModule", {
    value: !0
  }), Nr.default = void 0;
  const e = {
    placeholder: "اختيار الوقت"
  };
  return Nr.default = e, Nr;
}
var Do;
function hl() {
  if (Do) return Mr;
  Do = 1;
  var e = ve().default;
  Object.defineProperty(Mr, "__esModule", {
    value: !0
  }), Mr.default = void 0;
  var t = e(vd()), r = e(/* @__PURE__ */ pl());
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
  return Mr.default = n, Mr;
}
var Vo;
function pd() {
  if (Vo) return Ar;
  Vo = 1;
  var e = ve().default;
  Object.defineProperty(Ar, "__esModule", {
    value: !0
  }), Ar.default = void 0;
  var t = e(/* @__PURE__ */ hl());
  return Ar.default = t.default, Ar;
}
var zo;
function hd() {
  if (zo) return Tr;
  zo = 1;
  var e = ve().default;
  Object.defineProperty(Tr, "__esModule", {
    value: !0
  }), Tr.default = void 0;
  var t = e(fd()), r = e(/* @__PURE__ */ pd()), n = e(/* @__PURE__ */ hl()), a = e(/* @__PURE__ */ pl());
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
  return Tr.default = o, Tr;
}
var md = /* @__PURE__ */ hd();
const hg = /* @__PURE__ */ Ct(md);
var kr = {}, Ir = {}, Lo;
function gd() {
  if (Lo) return Ir;
  Lo = 1, Object.defineProperty(Ir, "__esModule", {
    value: !0
  }), Ir.default = void 0;
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
  return Ir.default = e, Ir;
}
var Dr = {}, Vr = {}, zr = {}, Ho;
function bd() {
  if (Ho) return zr;
  Ho = 1;
  var e = ve().default;
  Object.defineProperty(zr, "__esModule", {
    value: !0
  }), zr.default = void 0;
  var t = e(_t()), r = $t(), n = (0, t.default)((0, t.default)({}, r.commonLocale), {}, {
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
  return zr.default = n, zr;
}
var Lr = {}, qo;
function ml() {
  if (qo) return Lr;
  qo = 1, Object.defineProperty(Lr, "__esModule", {
    value: !0
  }), Lr.default = void 0;
  const e = {
    placeholder: "Välj tid"
  };
  return Lr.default = e, Lr;
}
var Bo;
function gl() {
  if (Bo) return Vr;
  Bo = 1;
  var e = ve().default;
  Object.defineProperty(Vr, "__esModule", {
    value: !0
  }), Vr.default = void 0;
  var t = e(bd()), r = e(/* @__PURE__ */ ml());
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
  return Vr.default = n, Vr;
}
var Wo;
function yd() {
  if (Wo) return Dr;
  Wo = 1;
  var e = ve().default;
  Object.defineProperty(Dr, "__esModule", {
    value: !0
  }), Dr.default = void 0;
  var t = e(/* @__PURE__ */ gl());
  return Dr.default = t.default, Dr;
}
var Uo;
function Sd() {
  if (Uo) return kr;
  Uo = 1;
  var e = ve().default;
  Object.defineProperty(kr, "__esModule", {
    value: !0
  }), kr.default = void 0;
  var t = e(gd()), r = e(/* @__PURE__ */ yd()), n = e(/* @__PURE__ */ gl()), a = e(/* @__PURE__ */ ml());
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
  return kr.default = o, kr;
}
var xd = /* @__PURE__ */ Sd();
const mg = /* @__PURE__ */ Ct(xd);
var bl = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, Yo = B.createContext && /* @__PURE__ */ B.createContext(bl), Ed = ["attr", "size", "title"];
function Cd(e, t) {
  if (e == null) return {};
  var r, n, a = _d(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (a[r] = e[r]);
  }
  return a;
}
function _d(e, t) {
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
function Go(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function jn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Go(Object(r), !0).forEach(function(n) {
      $d(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Go(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $d(e, t, r) {
  return (t = wd(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wd(e) {
  var t = Pd(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Pd(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function yl(e) {
  return e && e.map((t, r) => /* @__PURE__ */ B.createElement(t.tag, jn({
    key: r
  }, t.attr), yl(t.child)));
}
function Yt(e) {
  return (t) => /* @__PURE__ */ B.createElement(Rd, Mn({
    attr: jn({}, e.attr)
  }, t), yl(e.child));
}
function Rd(e) {
  var t = (r) => {
    var n = e.attr, a = e.size, i = e.title, o = Cd(e, Ed), s = a || r.size || "1em", l;
    return r.className && (l = r.className), e.className && (l = (l ? l + " " : "") + e.className), /* @__PURE__ */ B.createElement("svg", Mn({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, r.attr, n, o, {
      className: l,
      style: jn(jn({
        color: e.color || r.color
      }, r.style), e.style),
      height: s,
      width: s,
      xmlns: "http://www.w3.org/2000/svg"
    }), i && /* @__PURE__ */ B.createElement("title", null, i), e.children);
  };
  return Yo !== void 0 ? /* @__PURE__ */ B.createElement(Yo.Consumer, null, (r) => t(r)) : t(bl);
}
function gg(e) {
  return Yt({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "path", attr: { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }, child: [] }, { tag: "circle", attr: { cx: "12", cy: "7", r: "4" }, child: [] }] })(e);
}
function bg(e) {
  return Yt({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "circle", attr: { cx: "18", cy: "15", r: "3" }, child: [] }, { tag: "circle", attr: { cx: "9", cy: "7", r: "4" }, child: [] }, { tag: "path", attr: { d: "M10 15H6a4 4 0 0 0-4 4v2" }, child: [] }, { tag: "path", attr: { d: "m21.7 16.4-.9-.3" }, child: [] }, { tag: "path", attr: { d: "m15.2 13.9-.9-.3" }, child: [] }, { tag: "path", attr: { d: "m16.6 18.7.3-.9" }, child: [] }, { tag: "path", attr: { d: "m19.1 12.2.3-.9" }, child: [] }, { tag: "path", attr: { d: "m19.6 18.7-.4-1" }, child: [] }, { tag: "path", attr: { d: "m16.8 12.3-.4-1" }, child: [] }, { tag: "path", attr: { d: "m14.3 16.6 1-.4" }, child: [] }, { tag: "path", attr: { d: "m20.7 13.8 1-.4" }, child: [] }] })(e);
}
function yg(e) {
  return Yt({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "rect", attr: { width: "18", height: "18", x: "3", y: "3", rx: "2" }, child: [] }, { tag: "path", attr: { d: "M15 3v18" }, child: [] }] })(e);
}
function Sg(e) {
  return Yt({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "rect", attr: { width: "18", height: "18", x: "3", y: "3", rx: "2" }, child: [] }, { tag: "path", attr: { d: "M15 14v1" }, child: [] }, { tag: "path", attr: { d: "M15 19v2" }, child: [] }, { tag: "path", attr: { d: "M15 3v2" }, child: [] }, { tag: "path", attr: { d: "M15 9v1" }, child: [] }] })(e);
}
function xg(e) {
  return Yt({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "path", attr: { d: "M15 3h6v6" }, child: [] }, { tag: "path", attr: { d: "M10 14 21 3" }, child: [] }, { tag: "path", attr: { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }, child: [] }] })(e);
}
function Eg(e) {
  return Yt({ attr: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, child: [{ tag: "path", attr: { d: "M12 7v14" }, child: [] }, { tag: "path", attr: { d: "M16 12h2" }, child: [] }, { tag: "path", attr: { d: "M16 8h2" }, child: [] }, { tag: "path", attr: { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" }, child: [] }, { tag: "path", attr: { d: "M6 12h2" }, child: [] }, { tag: "path", attr: { d: "M6 8h2" }, child: [] }] })(e);
}
function Od(e, t) {
  var r = Object.assign({}, e);
  return Array.isArray(t) && t.forEach(function(n) {
    delete r[n];
  }), r;
}
function G(e) {
  "@babel/helpers - typeof";
  return G = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, G(e);
}
var mn = { exports: {} }, ce = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ko;
function Td() {
  if (Ko) return ce;
  Ko = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function p(f) {
    if (typeof f == "object" && f !== null) {
      var S = f.$$typeof;
      switch (S) {
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
                  return S;
              }
          }
        case t:
          return S;
      }
    }
  }
  return ce.ContextConsumer = o, ce.ContextProvider = i, ce.Element = e, ce.ForwardRef = l, ce.Fragment = r, ce.Lazy = v, ce.Memo = d, ce.Portal = t, ce.Profiler = a, ce.StrictMode = n, ce.Suspense = c, ce.SuspenseList = u, ce.isAsyncMode = function() {
    return !1;
  }, ce.isConcurrentMode = function() {
    return !1;
  }, ce.isContextConsumer = function(f) {
    return p(f) === o;
  }, ce.isContextProvider = function(f) {
    return p(f) === i;
  }, ce.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === e;
  }, ce.isForwardRef = function(f) {
    return p(f) === l;
  }, ce.isFragment = function(f) {
    return p(f) === r;
  }, ce.isLazy = function(f) {
    return p(f) === v;
  }, ce.isMemo = function(f) {
    return p(f) === d;
  }, ce.isPortal = function(f) {
    return p(f) === t;
  }, ce.isProfiler = function(f) {
    return p(f) === a;
  }, ce.isStrictMode = function(f) {
    return p(f) === n;
  }, ce.isSuspense = function(f) {
    return p(f) === c;
  }, ce.isSuspenseList = function(f) {
    return p(f) === u;
  }, ce.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === r || f === a || f === n || f === c || f === u || f === g || typeof f == "object" && f !== null && (f.$$typeof === v || f.$$typeof === d || f.$$typeof === i || f.$$typeof === o || f.$$typeof === l || f.$$typeof === h || f.getModuleId !== void 0);
  }, ce.typeOf = p, ce;
}
var ue = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xo;
function Fd() {
  return Xo || (Xo = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), h = !1, p = !1, f = !1, S = !1, m = !1, _;
    _ = Symbol.for("react.module.reference");
    function P(L) {
      return !!(typeof L == "string" || typeof L == "function" || L === r || L === a || m || L === n || L === c || L === u || S || L === g || h || p || f || typeof L == "object" && L !== null && (L.$$typeof === v || L.$$typeof === d || L.$$typeof === i || L.$$typeof === o || L.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      L.$$typeof === _ || L.getModuleId !== void 0));
    }
    function C(L) {
      if (typeof L == "object" && L !== null) {
        var Se = L.$$typeof;
        switch (Se) {
          case e:
            var X = L.type;
            switch (X) {
              case r:
              case a:
              case n:
              case c:
              case u:
                return X;
              default:
                var ae = X && X.$$typeof;
                switch (ae) {
                  case s:
                  case o:
                  case l:
                  case v:
                  case d:
                  case i:
                    return ae;
                  default:
                    return Se;
                }
            }
          case t:
            return Se;
        }
      }
    }
    var $ = o, E = i, y = e, R = l, T = r, M = v, j = d, F = t, A = a, I = n, k = c, D = u, H = !1, K = !1;
    function U(L) {
      return H || (H = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function w(L) {
      return K || (K = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function N(L) {
      return C(L) === o;
    }
    function V(L) {
      return C(L) === i;
    }
    function z(L) {
      return typeof L == "object" && L !== null && L.$$typeof === e;
    }
    function re(L) {
      return C(L) === l;
    }
    function Q(L) {
      return C(L) === r;
    }
    function Y(L) {
      return C(L) === v;
    }
    function ee(L) {
      return C(L) === d;
    }
    function ie(L) {
      return C(L) === t;
    }
    function oe(L) {
      return C(L) === a;
    }
    function he(L) {
      return C(L) === n;
    }
    function ge(L) {
      return C(L) === c;
    }
    function Re(L) {
      return C(L) === u;
    }
    ue.ContextConsumer = $, ue.ContextProvider = E, ue.Element = y, ue.ForwardRef = R, ue.Fragment = T, ue.Lazy = M, ue.Memo = j, ue.Portal = F, ue.Profiler = A, ue.StrictMode = I, ue.Suspense = k, ue.SuspenseList = D, ue.isAsyncMode = U, ue.isConcurrentMode = w, ue.isContextConsumer = N, ue.isContextProvider = V, ue.isElement = z, ue.isForwardRef = re, ue.isFragment = Q, ue.isLazy = Y, ue.isMemo = ee, ue.isPortal = ie, ue.isProfiler = oe, ue.isStrictMode = he, ue.isSuspense = ge, ue.isSuspenseList = Re, ue.isValidElementType = P, ue.typeOf = C;
  })()), ue;
}
var Zo;
function Ad() {
  return Zo || (Zo = 1, process.env.NODE_ENV === "production" ? mn.exports = Td() : mn.exports = Fd()), mn.exports;
}
var ca = Ad();
function Ei(e, t, r) {
  var n = b.useRef({});
  return (!("value" in n.current) || r(n.current.condition, t)) && (n.current.value = e(), n.current.condition = t), n.current.value;
}
var Md = Symbol.for("react.element"), jd = Symbol.for("react.transitional.element"), Nd = Symbol.for("react.fragment");
function Sl(e) {
  return (
    // Base object type
    e && G(e) === "object" && // React Element type
    (e.$$typeof === Md || e.$$typeof === jd) && // React Fragment type
    e.type === Nd
  );
}
var kd = Number(Fu.split(".")[0]), xl = function(t, r) {
  typeof t == "function" ? t(r) : G(t) === "object" && t && "current" in t && (t.current = r);
}, El = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var a = r.filter(Boolean);
  return a.length <= 1 ? a[0] : function(i) {
    r.forEach(function(o) {
      xl(o, i);
    });
  };
}, Id = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  return Ei(function() {
    return El.apply(void 0, r);
  }, r, function(a, i) {
    return a.length !== i.length || a.every(function(o, s) {
      return o !== i[s];
    });
  });
}, Cl = function(t) {
  var r, n;
  if (!t)
    return !1;
  if (_l(t) && kd >= 19)
    return !0;
  var a = ca.isMemo(t) ? t.type.type : t.type;
  return !(typeof a == "function" && !((r = a.prototype) !== null && r !== void 0 && r.render) && a.$$typeof !== ca.ForwardRef || typeof t == "function" && !((n = t.prototype) !== null && n !== void 0 && n.render) && t.$$typeof !== ca.ForwardRef);
};
function _l(e) {
  return /* @__PURE__ */ Tu(e) && !Sl(e);
}
var $l = function(t) {
  if (t && _l(t)) {
    var r = t;
    return r.props.propertyIsEnumerable("ref") ? r.props.ref : r.ref;
  }
  return null;
}, Ra = {}, Ci = [], Dd = function(t) {
  Ci.push(t);
};
function Kr(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = Ci.reduce(function(n, a) {
      return a(n ?? "", "warning");
    }, t);
    r && console.error("Warning: ".concat(r));
  }
}
function Vd(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = Ci.reduce(function(n, a) {
      return a(n ?? "", "note");
    }, t);
    r && console.warn("Note: ".concat(r));
  }
}
function wl() {
  Ra = {};
}
function Pl(e, t, r) {
  !t && !Ra[r] && (e(!1, r), Ra[r] = !0);
}
function me(e, t) {
  Pl(Kr, e, t);
}
function zd(e, t) {
  Pl(Vd, e, t);
}
me.preMessage = Dd;
me.resetWarned = wl;
me.noteOnce = zd;
function Rl() {
}
let ct = null;
function Ld() {
  ct = null, wl();
}
let _i = Rl;
process.env.NODE_ENV !== "production" && (_i = (e, t, r) => {
  me(e, `[antd: ${t}] ${r}`), process.env.NODE_ENV === "test" && Ld();
});
const Ol = /* @__PURE__ */ b.createContext({}), Et = process.env.NODE_ENV !== "production" ? (e) => {
  const {
    strict: t
  } = b.useContext(Ol), r = (n, a, i) => {
    if (!n)
      if (t === !1 && a === "deprecated") {
        const o = ct;
        ct || (ct = {}), ct[e] = ct[e] || [], ct[e].includes(i || "") || ct[e].push(i || ""), o || console.warn("[antd] There exists deprecated usage in your code:", ct);
      } else
        process.env.NODE_ENV !== "production" && _i(n, e, i);
  };
  return r.deprecated = (n, a, i, o) => {
    r(n, "deprecated", `\`${a}\` is deprecated. Please use \`${i}\` instead.${o ? ` ${o}` : ""}`);
  }, r;
} : () => {
  const e = () => {
  };
  return e.deprecated = Rl, e;
}, Bn = _i;
function Tl(e) {
  if (Array.isArray(e)) return e;
}
function Hd(e, t) {
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
function Oa(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function $i(e, t) {
  if (e) {
    if (typeof e == "string") return Oa(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Oa(e, t) : void 0;
  }
}
function Fl() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function q(e, t) {
  return Tl(e) || Hd(e, t) || $i(e, t) || Fl();
}
function qd(e, t) {
  if (G(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (G(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Al(e) {
  var t = qd(e, "string");
  return G(t) == "symbol" ? t : t + "";
}
function x(e, t, r) {
  return (t = Al(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function Bd(e) {
  if (Array.isArray(e)) return Oa(e);
}
function Ml(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Wd() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function W(e) {
  return Bd(e) || Ml(e) || $i(e) || Wd();
}
function Jo(e, t) {
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
    t % 2 ? Jo(Object(r), !0).forEach(function(n) {
      x(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Jo(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Xr(e) {
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
function ft() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function Ud(e, t) {
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
var Qo = "data-rc-order", es = "data-rc-priority", Yd = "rc-util-key", Ta = /* @__PURE__ */ new Map();
function jl() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.mark;
  return t ? t.startsWith("data-") ? t : "data-".concat(t) : Yd;
}
function Wn(e) {
  if (e.attachTo)
    return e.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function Gd(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function wi(e) {
  return Array.from((Ta.get(e) || e).children).filter(function(t) {
    return t.tagName === "STYLE";
  });
}
function Nl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!ft())
    return null;
  var r = t.csp, n = t.prepend, a = t.priority, i = a === void 0 ? 0 : a, o = Gd(n), s = o === "prependQueue", l = document.createElement("style");
  l.setAttribute(Qo, o), s && i && l.setAttribute(es, "".concat(i)), r != null && r.nonce && (l.nonce = r == null ? void 0 : r.nonce), l.innerHTML = e;
  var c = Wn(t), u = c.firstChild;
  if (n) {
    if (s) {
      var d = (t.styles || wi(c)).filter(function(v) {
        if (!["prepend", "prependQueue"].includes(v.getAttribute(Qo)))
          return !1;
        var g = Number(v.getAttribute(es) || 0);
        return i >= g;
      });
      if (d.length)
        return c.insertBefore(l, d[d.length - 1].nextSibling), l;
    }
    c.insertBefore(l, u);
  } else
    c.appendChild(l);
  return l;
}
function kl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = Wn(t);
  return (t.styles || wi(r)).find(function(n) {
    return n.getAttribute(jl(t)) === e;
  });
}
function Il(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = kl(e, t);
  if (r) {
    var n = Wn(t);
    n.removeChild(r);
  }
}
function Kd(e, t) {
  var r = Ta.get(e);
  if (!r || !Ud(document, r)) {
    var n = Nl("", t), a = n.parentNode;
    Ta.set(e, a), e.removeChild(n);
  }
}
function St(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = Wn(r), a = wi(n), i = O(O({}, r), {}, {
    styles: a
  });
  Kd(n, i);
  var o = kl(t, i);
  if (o) {
    var s, l;
    if ((s = i.csp) !== null && s !== void 0 && s.nonce && o.nonce !== ((l = i.csp) === null || l === void 0 ? void 0 : l.nonce)) {
      var c;
      o.nonce = (c = i.csp) === null || c === void 0 ? void 0 : c.nonce;
    }
    return o.innerHTML !== e && (o.innerHTML = e), o;
  }
  var u = Nl(e, i);
  return u.setAttribute(jl(i), t), u;
}
function Xd(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function We(e, t) {
  if (e == null) return {};
  var r, n, a = Xd(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (a[r] = e[r]);
  }
  return a;
}
function Fa(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = /* @__PURE__ */ new Set();
  function a(i, o) {
    var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, l = n.has(i);
    if (me(!l, "Warning: There may be circular references"), l)
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
    if (i && o && G(i) === "object" && G(o) === "object") {
      var d = Object.keys(i);
      return d.length !== Object.keys(o).length ? !1 : d.every(function(v) {
        return a(i[v], o[v], c);
      });
    }
    return !1;
  }
  return a(e, t);
}
function ke(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function ts(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Al(n.key), n);
  }
}
function Ie(e, t, r) {
  return t && ts(e.prototype, t), r && ts(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
var Zd = "%";
function Aa(e) {
  return e.join(Zd);
}
var Jd = /* @__PURE__ */ (function() {
  function e(t) {
    ke(this, e), x(this, "instanceId", void 0), x(this, "cache", /* @__PURE__ */ new Map()), x(this, "extracted", /* @__PURE__ */ new Set()), this.instanceId = t;
  }
  return Ie(e, [{
    key: "get",
    value: function(r) {
      return this.opGet(Aa(r));
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
      return this.opUpdate(Aa(r), n);
    }
    /** A fast get cache with `get` concat. */
  }, {
    key: "opUpdate",
    value: function(r, n) {
      var a = this.cache.get(r), i = n(a);
      i === null ? this.cache.delete(r) : this.cache.set(r, i);
    }
  }]), e;
})(), zt = "data-token-hash", Je = "data-css-hash", Qd = "data-cache-path", pt = "__cssinjs_instance__";
function ef() {
  var e = Math.random().toString(12).slice(2);
  if (typeof document < "u" && document.head && document.body) {
    var t = document.body.querySelectorAll("style[".concat(Je, "]")) || [], r = document.head.firstChild;
    Array.from(t).forEach(function(a) {
      a[pt] = a[pt] || e, a[pt] === e && document.head.insertBefore(a, r);
    });
    var n = {};
    Array.from(document.querySelectorAll("style[".concat(Je, "]"))).forEach(function(a) {
      var i = a.getAttribute(Je);
      if (n[i]) {
        if (a[pt] === e) {
          var o;
          (o = a.parentNode) === null || o === void 0 || o.removeChild(a);
        }
      } else
        n[i] = !0;
    });
  }
  return new Jd(e);
}
var sn = /* @__PURE__ */ b.createContext({
  hashPriority: "low",
  cache: ef(),
  defaultCache: !0
});
function J(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Zr(e, t) {
  return Zr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, Zr(e, t);
}
function wt(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Zr(e, t);
}
function Jr(e) {
  return Jr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Jr(e);
}
function Pi() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Pi = function() {
    return !!e;
  })();
}
function tf(e, t) {
  if (t && (G(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return J(e);
}
function Pt(e) {
  var t = Pi();
  return function() {
    var r, n = Jr(e);
    if (t) {
      var a = Jr(this).constructor;
      r = Reflect.construct(n, arguments, a);
    } else r = n.apply(this, arguments);
    return tf(this, r);
  };
}
function rf(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
var Ri = /* @__PURE__ */ (function() {
  function e() {
    ke(this, e), x(this, "cache", void 0), x(this, "keys", void 0), x(this, "cacheCallTimes", void 0), this.cache = /* @__PURE__ */ new Map(), this.keys = [], this.cacheCallTimes = 0;
  }
  return Ie(e, [{
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
            var d = q(c, 2), v = d[1];
            return a.internalGet(u)[1] < v ? [u, a.internalGet(u)[1]] : c;
          }, [this.keys[0], this.cacheCallTimes]), o = q(i, 1), s = o[0];
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
          return !rf(n, r);
        }), this.deleteByPath(this.cache, r);
    }
  }]), e;
})();
x(Ri, "MAX_CACHE_SIZE", 20);
x(Ri, "MAX_CACHE_OFFSET", 5);
var rs = 0, Dl = /* @__PURE__ */ (function() {
  function e(t) {
    ke(this, e), x(this, "derivatives", void 0), x(this, "id", void 0), this.derivatives = Array.isArray(t) ? t : [t], this.id = rs, t.length === 0 && Kr(t.length > 0, "[Ant Design CSS-in-JS] Theme should have at least one derivative function."), rs += 1;
  }
  return Ie(e, [{
    key: "getDerivativeToken",
    value: function(r) {
      return this.derivatives.reduce(function(n, a) {
        return a(r, n);
      }, void 0);
    }
  }]), e;
})(), ua = new Ri();
function Ma(e) {
  var t = Array.isArray(e) ? e : [e];
  return ua.has(t) || ua.set(t, new Dl(t)), ua.get(t);
}
var nf = /* @__PURE__ */ new WeakMap(), da = {};
function af(e, t) {
  for (var r = nf, n = 0; n < t.length; n += 1) {
    var a = t[n];
    r.has(a) || r.set(a, /* @__PURE__ */ new WeakMap()), r = r.get(a);
  }
  return r.has(da) || r.set(da, e()), r.get(da);
}
var ns = /* @__PURE__ */ new WeakMap();
function Wr(e) {
  var t = ns.get(e) || "";
  return t || (Object.keys(e).forEach(function(r) {
    var n = e[r];
    t += r, n instanceof Dl ? t += n.id : n && G(n) === "object" ? t += Wr(n) : t += n;
  }), t = Xr(t), ns.set(e, t)), t;
}
function as(e, t) {
  return Xr("".concat(t, "_").concat(Wr(e)));
}
var ja = ft();
function ye(e) {
  return typeof e == "number" ? "".concat(e, "px") : e;
}
function Nn(e, t, r) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
  if (a)
    return e;
  var i = O(O({}, n), {}, x(x({}, zt, t), Je, r)), o = Object.keys(i).map(function(s) {
    var l = i[s];
    return l ? "".concat(s, '="').concat(l, '"') : null;
  }).filter(function(s) {
    return s;
  }).join(" ");
  return "<style ".concat(o, ">").concat(e, "</style>");
}
var Pn = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return "--".concat(r ? "".concat(r, "-") : "").concat(t).replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
}, of = function(t, r, n) {
  return Object.keys(t).length ? ".".concat(r).concat(n != null && n.scope ? ".".concat(n.scope) : "", "{").concat(Object.entries(t).map(function(a) {
    var i = q(a, 2), o = i[0], s = i[1];
    return "".concat(o, ":").concat(s, ";");
  }).join(""), "}") : "";
}, Vl = function(t, r, n) {
  var a = {}, i = {};
  return Object.entries(t).forEach(function(o) {
    var s, l, c = q(o, 2), u = c[0], d = c[1];
    if (n != null && (s = n.preserve) !== null && s !== void 0 && s[u])
      i[u] = d;
    else if ((typeof d == "string" || typeof d == "number") && !(n != null && (l = n.ignore) !== null && l !== void 0 && l[u])) {
      var v, g = Pn(u, n == null ? void 0 : n.prefix);
      a[g] = typeof d == "number" && !(n != null && (v = n.unitless) !== null && v !== void 0 && v[u]) ? "".concat(d, "px") : String(d), i[u] = "var(".concat(g, ")");
    }
  }), [i, of(a, r, {
    scope: n == null ? void 0 : n.scope
  })];
}, is = process.env.NODE_ENV !== "test" && ft() ? b.useLayoutEffect : b.useEffect, kn = function(t, r) {
  var n = b.useRef(!0);
  is(function() {
    return t(n.current);
  }, r), is(function() {
    return n.current = !1, function() {
      n.current = !0;
    };
  }, []);
}, os = function(t, r) {
  kn(function(n) {
    if (!n)
      return t();
  }, r);
}, sf = O({}, b), ss = sf.useInsertionEffect, lf = function(t, r, n) {
  b.useMemo(t, n), kn(function() {
    return r(!0);
  }, n);
}, cf = ss ? function(e, t, r) {
  return ss(function() {
    return e(), t();
  }, r);
} : lf, uf = O({}, b), df = uf.useInsertionEffect, ff = function(t) {
  var r = [], n = !1;
  function a(i) {
    if (n) {
      process.env.NODE_ENV !== "production" && Kr(!1, "[Ant Design CSS-in-JS] You are registering a cleanup function after unmount, which will not have any effect.");
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
}, vf = function() {
  return function(t) {
    t();
  };
}, pf = typeof df < "u" ? ff : vf;
function hf() {
  return !1;
}
var Na = !1;
function mf() {
  return Na;
}
const gf = process.env.NODE_ENV === "production" ? hf : mf;
if (process.env.NODE_ENV !== "production" && typeof module < "u" && module && module.hot && typeof window < "u") {
  var gn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : null;
  if (gn && typeof gn.webpackHotUpdate == "function") {
    var bf = gn.webpackHotUpdate;
    gn.webpackHotUpdate = function() {
      return Na = !0, setTimeout(function() {
        Na = !1;
      }, 0), bf.apply(void 0, arguments);
    };
  }
}
function Oi(e, t, r, n, a) {
  var i = b.useContext(sn), o = i.cache, s = [e].concat(W(t)), l = Aa(s), c = pf([l]), u = gf(), d = function(p) {
    o.opUpdate(l, function(f) {
      var S = f || [void 0, void 0], m = q(S, 2), _ = m[0], P = _ === void 0 ? 0 : _, C = m[1], $ = C;
      process.env.NODE_ENV !== "production" && C && u && (n == null || n($, u), $ = null);
      var E = $ || r(), y = [P, E];
      return p ? p(y) : y;
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
  var g = v[1];
  return cf(function() {
    a == null || a(g);
  }, function(h) {
    return d(function(p) {
      var f = q(p, 2), S = f[0], m = f[1];
      return h && S === 0 && (a == null || a(g)), [S + 1, m];
    }), function() {
      o.opUpdate(l, function(p) {
        var f = p || [], S = q(f, 2), m = S[0], _ = m === void 0 ? 0 : m, P = S[1], C = _ - 1;
        return C === 0 ? (c(function() {
          (h || !o.opGet(l)) && (n == null || n(P, !1));
        }), null) : [_ - 1, P];
      });
    };
  }, [l]), g;
}
var yf = {}, Sf = process.env.NODE_ENV !== "production" ? "css-dev-only-do-not-override" : "css", bt = /* @__PURE__ */ new Map();
function xf(e) {
  bt.set(e, (bt.get(e) || 0) + 1);
}
function Ef(e, t) {
  if (typeof document < "u") {
    var r = document.querySelectorAll("style[".concat(zt, '="').concat(e, '"]'));
    r.forEach(function(n) {
      if (n[pt] === t) {
        var a;
        (a = n.parentNode) === null || a === void 0 || a.removeChild(n);
      }
    });
  }
}
var Cf = 0;
function _f(e, t) {
  bt.set(e, (bt.get(e) || 0) - 1);
  var r = /* @__PURE__ */ new Set();
  bt.forEach(function(n, a) {
    n <= 0 && r.add(a);
  }), bt.size - r.size > Cf && r.forEach(function(n) {
    Ef(n, t), bt.delete(n);
  });
}
var $f = function(t, r, n, a) {
  var i = n.getDerivativeToken(t), o = O(O({}, i), r);
  return a && (o = a(o)), o;
}, zl = "token";
function wf(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = dt(sn), a = n.cache.instanceId, i = n.container, o = r.salt, s = o === void 0 ? "" : o, l = r.override, c = l === void 0 ? yf : l, u = r.formatToken, d = r.getComputedToken, v = r.cssVar, g = af(function() {
    return Object.assign.apply(Object, [{}].concat(W(t)));
  }, t), h = Wr(g), p = Wr(c), f = v ? Wr(v) : "", S = Oi(zl, [s, e.id, h, p, f], function() {
    var m, _ = d ? d(g, c, e) : $f(g, c, e, u), P = O({}, _), C = "";
    if (v) {
      var $ = Vl(_, v.key, {
        prefix: v.prefix,
        ignore: v.ignore,
        unitless: v.unitless,
        preserve: v.preserve
      }), E = q($, 2);
      _ = E[0], C = E[1];
    }
    var y = as(_, s);
    _._tokenKey = y, P._tokenKey = as(P, s);
    var R = (m = v == null ? void 0 : v.key) !== null && m !== void 0 ? m : y;
    _._themeKey = R, xf(R);
    var T = "".concat(Sf, "-").concat(Xr(y));
    return _._hashId = T, [_, T, P, C, (v == null ? void 0 : v.key) || ""];
  }, function(m) {
    _f(m[0]._themeKey, a);
  }, function(m) {
    var _ = q(m, 4), P = _[0], C = _[3];
    if (v && C) {
      var $ = St(C, Xr("css-variables-".concat(P._themeKey)), {
        mark: Je,
        prepend: "queue",
        attachTo: i,
        priority: -999
      });
      $[pt] = a, $.setAttribute(zt, P._themeKey);
    }
  });
  return S;
}
var Pf = function(t, r, n) {
  var a = q(t, 5), i = a[2], o = a[3], s = a[4], l = n || {}, c = l.plain;
  if (!o)
    return null;
  var u = i._tokenKey, d = -999, v = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(d)
  }, g = Nn(o, s, u, v, c);
  return [d, u, g];
};
function De() {
  return De = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, De.apply(null, arguments);
}
var Rf = {
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
}, Ll = "comm", Hl = "rule", ql = "decl", Of = "@import", Tf = "@namespace", Ff = "@keyframes", Af = "@layer", Mf = Math.abs, Ur = String.fromCharCode;
function Bl(e) {
  return e.trim();
}
function ka(e, t, r) {
  return e.replace(t, r);
}
function Dt(e, t) {
  return e.charCodeAt(t) | 0;
}
function Lt(e, t, r) {
  return e.slice(t, r);
}
function at(e) {
  return e.length;
}
function jf(e) {
  return e.length;
}
function bn(e, t) {
  return t.push(e), e;
}
var Un = 1, Ht = 1, Wl = 0, Ue = 0, Pe = 0, Gt = "";
function Ti(e, t, r, n, a, i, o, s) {
  return { value: e, root: t, parent: r, type: n, props: a, children: i, line: Un, column: Ht, length: o, return: "", siblings: s };
}
function Nf() {
  return Pe;
}
function kf() {
  return Pe = Ue > 0 ? Dt(Gt, --Ue) : 0, Ht--, Pe === 10 && (Ht = 1, Un--), Pe;
}
function Qe() {
  return Pe = Ue < Wl ? Dt(Gt, Ue++) : 0, Ht++, Pe === 10 && (Ht = 1, Un++), Pe;
}
function ht() {
  return Dt(Gt, Ue);
}
function Rn() {
  return Ue;
}
function Yn(e, t) {
  return Lt(Gt, e, t);
}
function Qr(e) {
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
function If(e) {
  return Un = Ht = 1, Wl = at(Gt = e), Ue = 0, [];
}
function Df(e) {
  return Gt = "", e;
}
function fa(e) {
  return Bl(Yn(Ue - 1, Ia(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Vf(e) {
  for (; (Pe = ht()) && Pe < 33; )
    Qe();
  return Qr(e) > 2 || Qr(Pe) > 3 ? "" : " ";
}
function zf(e, t) {
  for (; --t && Qe() && !(Pe < 48 || Pe > 102 || Pe > 57 && Pe < 65 || Pe > 70 && Pe < 97); )
    ;
  return Yn(e, Rn() + (t < 6 && ht() == 32 && Qe() == 32));
}
function Ia(e) {
  for (; Qe(); )
    switch (Pe) {
      // ] ) " '
      case e:
        return Ue;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && Ia(Pe);
        break;
      // (
      case 40:
        e === 41 && Ia(e);
        break;
      // \
      case 92:
        Qe();
        break;
    }
  return Ue;
}
function Lf(e, t) {
  for (; Qe() && e + Pe !== 57; )
    if (e + Pe === 84 && ht() === 47)
      break;
  return "/*" + Yn(t, Ue - 1) + "*" + Ur(e === 47 ? e : Qe());
}
function Hf(e) {
  for (; !Qr(ht()); )
    Qe();
  return Yn(e, Ue);
}
function qf(e) {
  return Df(On("", null, null, null, [""], e = If(e), 0, [0], e));
}
function On(e, t, r, n, a, i, o, s, l) {
  for (var c = 0, u = 0, d = o, v = 0, g = 0, h = 0, p = 1, f = 1, S = 1, m = 0, _ = 0, P = "", C = a, $ = i, E = n, y = P; f; )
    switch (h = _, _ = Qe()) {
      // (
      case 40:
        h != 108 && Dt(y, d - 1) == 58 ? (m++, y += "(") : y += fa(_);
        break;
      // )
      case 41:
        m--, y += ")";
        break;
      // " ' [
      case 34:
      case 39:
      case 91:
        y += fa(_);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        if (m > 0) {
          y += Ur(_);
          break;
        }
        y += Vf(h);
        break;
      // \
      case 92:
        y += zf(Rn() - 1, 7);
        continue;
      // /
      case 47:
        switch (ht()) {
          case 42:
          case 47:
            bn(Bf(Lf(Qe(), Rn()), t, r, l), l), (Qr(h || 1) == 5 || Qr(ht() || 1) == 5) && at(y) && Lt(y, -1, void 0) !== " " && (y += " ");
            break;
          default:
            y += "/";
        }
        break;
      // {
      case 123 * p:
        s[c++] = at(y) * S;
      // } ; \0
      case 125 * p:
      case 59:
      case 0:
        if (m > 0 && _) {
          y += Ur(_);
          break;
        }
        switch (_) {
          // \0 }
          case 0:
          case 125:
            f = 0;
          // ;
          case 59 + u:
            S == -1 && (y = ka(y, /\f/g, "")), g > 0 && (at(y) - d || p === 0) && bn(g > 32 ? cs(y + ";", n, r, d - 1, l) : cs(ka(y, " ", "") + ";", n, r, d - 2, l), l);
            break;
          // @ ;
          case 59:
            y += ";";
          // { rule/at-rule
          default:
            if (bn(E = ls(y, t, r, c, u, a, s, P, C = [], $ = [], d, i), i), _ === 123)
              if (u === 0)
                On(y, t, E, E, C, i, d, s, $);
              else {
                switch (v) {
                  // c(ontainer)
                  case 99:
                    if (Dt(y, 3) === 110) break;
                  // l(ayer)
                  case 108:
                    if (Dt(y, 2) === 97) break;
                  default:
                    u = 0;
                  // d(ocument) m(edia) s(upports)
                  case 100:
                  case 109:
                  case 115:
                }
                u ? On(e, E, E, n && bn(ls(e, E, E, 0, 0, a, s, P, a, C = [], d, $), $), a, $, d, s, n ? C : $) : On(y, E, E, E, [""], $, 0, s, $);
              }
        }
        c = u = g = 0, p = S = 1, P = y = "", d = o;
        break;
      // :
      case 58:
        d = 1 + at(y), g = h;
      default:
        if (p < 1) {
          if (_ == 123)
            --p;
          else if (_ == 125 && p++ == 0 && kf() == 125)
            continue;
        }
        switch (y += Ur(_), _ * p) {
          // &
          case 38:
            S = u > 0 ? 1 : (y += "\f", -1);
            break;
          // ,
          case 44:
            if (m > 0) break;
            s[c++] = (at(y) - 1) * S, S = 1;
            break;
          // @
          case 64:
            ht() === 45 && (y += fa(Qe())), v = ht(), u = d = at(P = y += Hf(Rn())), _++;
            break;
          // -
          case 45:
            h === 45 && at(y) == 2 && (p = 0);
        }
    }
  return i;
}
function ls(e, t, r, n, a, i, o, s, l, c, u, d) {
  for (var v = a - 1, g = a === 0 ? i : [""], h = jf(g), p = 0, f = 0, S = 0; p < n; ++p)
    for (var m = 0, _ = Lt(e, v + 1, v = Mf(f = o[p])), P = e; m < h; ++m)
      (P = Bl(f > 0 ? g[m] + " " + _ : ka(_, /&\f/g, g[m]))) && (l[S++] = P);
  return Ti(e, t, r, a === 0 ? Hl : s, l, c, u, d);
}
function Bf(e, t, r, n) {
  return Ti(e, t, r, Ll, Ur(Nf()), Lt(e, 2, -2), 0, n);
}
function cs(e, t, r, n, a) {
  return Ti(e, t, r, ql, Lt(e, 0, n), Lt(e, n + 1, -1), n, a);
}
function Da(e, t) {
  for (var r = "", n = 0; n < e.length; n++)
    r += t(e[n], n, e, t) || "";
  return r;
}
function Wf(e, t, r, n) {
  switch (e.type) {
    case Af:
      if (e.children.length) break;
    case Of:
    case Tf:
    case ql:
      return e.return = e.return || e.value;
    case Ll:
      return "";
    case Ff:
      return e.return = e.value + "{" + Da(e.children, n) + "}";
    case Hl:
      if (!at(e.value = e.props.join(","))) return "";
  }
  return at(r = Da(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function Ul(e, t) {
  var r = t.path, n = t.parentSelectors;
  me(!1, "[Ant Design CSS-in-JS] ".concat(r ? "Error in ".concat(r, ": ") : "").concat(e).concat(n.length ? " Selector: ".concat(n.join(" | ")) : ""));
}
var Uf = function(t, r, n) {
  if (t === "content") {
    var a = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, i = ["normal", "none", "initial", "inherit", "unset"];
    (typeof r != "string" || i.indexOf(r) === -1 && !a.test(r) && (r.charAt(0) !== r.charAt(r.length - 1) || r.charAt(0) !== '"' && r.charAt(0) !== "'")) && Ul("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"".concat(r, "\"'`."), n);
  }
}, Yf = function(t, r, n) {
  t === "animation" && n.hashId && r !== "none" && Ul("You seem to be using hashed animation '".concat(r, "', in which case 'animationName' with Keyframe as value is recommended."), n);
}, us = "data-ant-cssinjs-cache-path", Yl = "_FILE_STYLE__", xt, Gl = !0;
function Gf() {
  if (!xt && (xt = {}, ft())) {
    var e = document.createElement("div");
    e.className = us, e.style.position = "fixed", e.style.visibility = "hidden", e.style.top = "-9999px", document.body.appendChild(e);
    var t = getComputedStyle(e).content || "";
    t = t.replace(/^"/, "").replace(/"$/, ""), t.split(";").forEach(function(a) {
      var i = a.split(":"), o = q(i, 2), s = o[0], l = o[1];
      xt[s] = l;
    });
    var r = document.querySelector("style[".concat(us, "]"));
    if (r) {
      var n;
      Gl = !1, (n = r.parentNode) === null || n === void 0 || n.removeChild(r);
    }
    document.body.removeChild(e);
  }
}
function Kf(e) {
  return Gf(), !!xt[e];
}
function Xf(e) {
  var t = xt[e], r = null;
  if (t && ft())
    if (Gl)
      r = Yl;
    else {
      var n = document.querySelector("style[".concat(Je, '="').concat(xt[e], '"]'));
      n ? r = n.innerHTML : delete xt[e];
    }
  return [r, t];
}
var Kl = "_skip_check_", Xl = "_multi_value_";
function Tn(e) {
  var t = Da(qf(e), Wf);
  return t.replace(/\{%%%\:[^;];}/g, ";");
}
function Zf(e) {
  return G(e) === "object" && e && (Kl in e || Xl in e);
}
function ds(e, t, r) {
  if (!t)
    return e;
  var n = ".".concat(t), a = r === "low" ? ":where(".concat(n, ")") : n, i = e.split(",").map(function(o) {
    var s, l = o.trim().split(/\s+/), c = l[0] || "", u = ((s = c.match(/^\w+/)) === null || s === void 0 ? void 0 : s[0]) || "";
    return c = "".concat(u).concat(a).concat(c.slice(u.length)), [c].concat(W(l.slice(1))).join(" ");
  });
  return i.join(",");
}
var Jf = function e(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    root: !0,
    parentSelectors: []
  }, a = n.root, i = n.injectHash, o = n.parentSelectors, s = r.hashId, l = r.layer, c = r.path, u = r.hashPriority, d = r.transformers, v = d === void 0 ? [] : d, g = r.linters, h = g === void 0 ? [] : g, p = "", f = {};
  function S(P) {
    var C = P.getName(s);
    if (!f[C]) {
      var $ = e(P.style, r, {
        root: !1,
        parentSelectors: o
      }), E = q($, 1), y = E[0];
      f[C] = "@keyframes ".concat(P.getName(s)).concat(y);
    }
  }
  function m(P) {
    var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    return P.forEach(function($) {
      Array.isArray($) ? m($, C) : $ && C.push($);
    }), C;
  }
  var _ = m(Array.isArray(t) ? t : [t]);
  return _.forEach(function(P) {
    var C = typeof P == "string" && !a ? {} : P;
    if (typeof C == "string")
      p += "".concat(C, `
`);
    else if (C._keyframe)
      S(C);
    else {
      var $ = v.reduce(function(E, y) {
        var R;
        return (y == null || (R = y.visit) === null || R === void 0 ? void 0 : R.call(y, E)) || E;
      }, C);
      Object.keys($).forEach(function(E) {
        var y = $[E];
        if (G(y) === "object" && y && (E !== "animationName" || !y._keyframe) && !Zf(y)) {
          var R = !1, T = E.trim(), M = !1;
          (a || i) && s ? T.startsWith("@") ? R = !0 : T === "&" ? T = ds("", s, u) : T = ds(E, s, u) : a && !s && (T === "&" || T === "") && (T = "", M = !0);
          var j = e(y, r, {
            root: M,
            injectHash: R,
            parentSelectors: [].concat(W(o), [T])
          }), F = q(j, 2), A = F[0], I = F[1];
          f = O(O({}, f), I), p += "".concat(T).concat(A);
        } else {
          let H = function(K, U) {
            process.env.NODE_ENV !== "production" && (G(y) !== "object" || !(y != null && y[Kl])) && [Uf, Yf].concat(W(h)).forEach(function(V) {
              return V(K, U, {
                path: c,
                hashId: s,
                parentSelectors: o
              });
            });
            var w = K.replace(/[A-Z]/g, function(V) {
              return "-".concat(V.toLowerCase());
            }), N = U;
            !Rf[K] && typeof N == "number" && N !== 0 && (N = "".concat(N, "px")), K === "animationName" && U !== null && U !== void 0 && U._keyframe && (S(U), N = U.getName(s)), p += "".concat(w, ":").concat(N, ";");
          };
          var k, D = (k = y == null ? void 0 : y.value) !== null && k !== void 0 ? k : y;
          G(y) === "object" && y !== null && y !== void 0 && y[Xl] && Array.isArray(D) ? D.forEach(function(K) {
            H(E, K);
          }) : H(E, D);
        }
      });
    }
  }), a ? l && (p && (p = "@layer ".concat(l.name, " {").concat(p, "}")), l.dependencies && (f["@layer ".concat(l.name)] = l.dependencies.map(function(P) {
    return "@layer ".concat(P, ", ").concat(l.name, ";");
  }).join(`
`))) : p = "{".concat(p, "}"), [p, f];
};
function Zl(e, t) {
  return Xr("".concat(e.join("%")).concat(t));
}
function Qf() {
  return null;
}
var Jl = "style";
function Va(e, t) {
  var r = e.token, n = e.path, a = e.hashId, i = e.layer, o = e.nonce, s = e.clientOnly, l = e.order, c = l === void 0 ? 0 : l, u = b.useContext(sn), d = u.autoClear, v = u.mock, g = u.defaultCache, h = u.hashPriority, p = u.container, f = u.ssrInline, S = u.transformers, m = u.linters, _ = u.cache, P = u.layer, C = r._tokenKey, $ = [C];
  P && $.push("layer"), $.push.apply($, W(n));
  var E = ja;
  process.env.NODE_ENV !== "production" && v !== void 0 && (E = v === "client");
  var y = Oi(
    Jl,
    $,
    // Create cache if needed
    function() {
      var F = $.join("|");
      if (Kf(F)) {
        var A = Xf(F), I = q(A, 2), k = I[0], D = I[1];
        if (k)
          return [k, C, D, {}, s, c];
      }
      var H = t(), K = Jf(H, {
        hashId: a,
        hashPriority: h,
        layer: P ? i : void 0,
        path: n.join("-"),
        transformers: S,
        linters: m
      }), U = q(K, 2), w = U[0], N = U[1], V = Tn(w), z = Zl($, V);
      return [V, C, z, N, s, c];
    },
    // Remove cache if no need
    function(F, A) {
      var I = q(F, 3), k = I[2];
      (A || d) && ja && Il(k, {
        mark: Je,
        attachTo: p
      });
    },
    // Effect: Inject style here
    function(F) {
      var A = q(F, 4), I = A[0];
      A[1];
      var k = A[2], D = A[3];
      if (E && I !== Yl) {
        var H = {
          mark: Je,
          prepend: P ? !1 : "queue",
          attachTo: p,
          priority: c
        }, K = typeof o == "function" ? o() : o;
        K && (H.csp = {
          nonce: K
        });
        var U = [], w = [];
        Object.keys(D).forEach(function(V) {
          V.startsWith("@layer") ? U.push(V) : w.push(V);
        }), U.forEach(function(V) {
          St(Tn(D[V]), "_layer-".concat(V), O(O({}, H), {}, {
            prepend: !0
          }));
        });
        var N = St(I, k, H);
        N[pt] = _.instanceId, N.setAttribute(zt, C), process.env.NODE_ENV !== "production" && N.setAttribute(Qd, $.join("|")), w.forEach(function(V) {
          St(Tn(D[V]), "_effect-".concat(V), H);
        });
      }
    }
  ), R = q(y, 3), T = R[0], M = R[1], j = R[2];
  return function(F) {
    var A;
    return !f || E || !g ? A = /* @__PURE__ */ b.createElement(Qf, null) : A = /* @__PURE__ */ b.createElement("style", De({}, x(x({}, zt, M), Je, j), {
      dangerouslySetInnerHTML: {
        __html: T
      }
    })), /* @__PURE__ */ b.createElement(b.Fragment, null, A, F);
  };
}
var ev = function(t, r, n) {
  var a = q(t, 6), i = a[0], o = a[1], s = a[2], l = a[3], c = a[4], u = a[5], d = n || {}, v = d.plain;
  if (c)
    return null;
  var g = i, h = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(u)
  };
  return g = Nn(i, o, s, h, v), l && Object.keys(l).forEach(function(p) {
    if (!r[p]) {
      r[p] = !0;
      var f = Tn(l[p]), S = Nn(f, o, "_effect-".concat(p), h, v);
      p.startsWith("@layer") ? g = S + g : g += S;
    }
  }), [u, s, g];
}, Ql = "cssVar", tv = function(t, r) {
  var n = t.key, a = t.prefix, i = t.unitless, o = t.ignore, s = t.token, l = t.scope, c = l === void 0 ? "" : l, u = dt(sn), d = u.cache.instanceId, v = u.container, g = s._tokenKey, h = [].concat(W(t.path), [n, c, g]), p = Oi(Ql, h, function() {
    var f = r(), S = Vl(f, n, {
      prefix: a,
      unitless: i,
      ignore: o,
      scope: c
    }), m = q(S, 2), _ = m[0], P = m[1], C = Zl(h, P);
    return [_, P, C, n];
  }, function(f) {
    var S = q(f, 3), m = S[2];
    ja && Il(m, {
      mark: Je,
      attachTo: v
    });
  }, function(f) {
    var S = q(f, 3), m = S[1], _ = S[2];
    if (m) {
      var P = St(m, _, {
        mark: Je,
        prepend: "queue",
        attachTo: v,
        priority: -999
      });
      P[pt] = d, P.setAttribute(zt, n);
    }
  });
  return p;
}, rv = function(t, r, n) {
  var a = q(t, 4), i = a[1], o = a[2], s = a[3], l = n || {}, c = l.plain;
  if (!i)
    return null;
  var u = -999, d = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(u)
  }, v = Nn(i, s, o, d, c);
  return [u, o, v];
};
x(x(x({}, Jl, ev), zl, Pf), Ql, rv);
function At(e) {
  return e.notSplit = !0, e;
}
At(["borderTop", "borderBottom"]), At(["borderTop"]), At(["borderBottom"]), At(["borderLeft", "borderRight"]), At(["borderLeft"]), At(["borderRight"]);
var Fi = /* @__PURE__ */ Si({});
function nv(e) {
  return Tl(e) || Ml(e) || $i(e) || Fl();
}
function it(e, t) {
  for (var r = e, n = 0; n < t.length; n += 1) {
    if (r == null)
      return;
    r = r[t[n]];
  }
  return r;
}
function ec(e, t, r, n) {
  if (!t.length)
    return r;
  var a = nv(t), i = a[0], o = a.slice(1), s;
  return !e && typeof i == "number" ? s = [] : Array.isArray(e) ? s = W(e) : s = O({}, e), n && r === void 0 && o.length === 1 ? delete s[i][o[0]] : s[i] = ec(s[i], o, r, n), s;
}
function Ke(e, t, r) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && n && r === void 0 && !it(e, t.slice(0, -1)) ? e : ec(e, t, r, n);
}
function av(e) {
  return G(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function fs(e) {
  return Array.isArray(e) ? [] : {};
}
var iv = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function Nt() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = fs(t[0]);
  return t.forEach(function(a) {
    function i(o, s) {
      var l = new Set(s), c = it(a, o), u = Array.isArray(c);
      if (u || av(c)) {
        if (!l.has(c)) {
          l.add(c);
          var d = it(n, o);
          u ? n = Ke(n, o, []) : (!d || G(d) !== "object") && (n = Ke(n, o, fs(c))), iv(c).forEach(function(v) {
            i([].concat(W(o), [v]), l);
          });
        }
      } else
        n = Ke(n, o, c);
    }
    i([]);
  }), n;
}
const ov = /* @__PURE__ */ Si(void 0);
var sv = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: !0
}, lv = O(O({}, sv), {}, {
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
const cv = {
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
}, lv), Object.assign({}, cv);
const Ve = "${label} is not a valid ${type}", Gn = {
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
        string: Ve,
        method: Ve,
        array: Ve,
        object: Ve,
        number: Ve,
        date: Ve,
        boolean: Ve,
        integer: Ve,
        float: Ve,
        regexp: Ve,
        email: Ve,
        url: Ve,
        hex: Ve
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
Object.assign({}, Gn.Modal);
let Fn = [];
const vs = () => Fn.reduce((e, t) => Object.assign(Object.assign({}, e), t), Gn.Modal);
function uv(e) {
  if (e) {
    const t = Object.assign({}, e);
    return Fn.push(t), vs(), () => {
      Fn = Fn.filter((r) => r !== t), vs();
    };
  }
  Object.assign({}, Gn.Modal);
}
const tc = /* @__PURE__ */ Si(void 0), rc = "internalMark", nc = (e) => {
  const {
    locale: t = {},
    children: r,
    _ANT_MARK__: n
  } = e;
  if (process.env.NODE_ENV !== "production") {
    const i = Et("LocaleProvider");
    process.env.NODE_ENV !== "production" && i(n === rc, "deprecated", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale");
  }
  b.useEffect(() => uv(t == null ? void 0 : t.Modal), [t]);
  const a = b.useMemo(() => Object.assign(Object.assign({}, t), {
    exist: !0
  }), [t]);
  return /* @__PURE__ */ b.createElement(tc.Provider, {
    value: a
  }, r);
};
process.env.NODE_ENV !== "production" && (nc.displayName = "LocaleProvider");
const ac = {
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
}, en = Object.assign(Object.assign({}, ac), {
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
}), Fe = Math.round;
function va(e, t) {
  const r = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], n = r.map((a) => parseFloat(a));
  for (let a = 0; a < 3; a += 1)
    n[a] = t(n[a] || 0, r[a] || "", a);
  return r[3] ? n[3] = r[3].includes("%") ? n[3] / 100 : n[3] : n[3] = 1, n;
}
const ps = (e, t, r) => r === 0 ? e : e / 100;
function Hr(e, t) {
  const r = t || 255;
  return e > r ? r : e < 0 ? 0 : e;
}
class $e {
  constructor(t) {
    x(this, "isValid", !0), x(this, "r", 0), x(this, "g", 0), x(this, "b", 0), x(this, "a", 1), x(this, "_h", void 0), x(this, "_s", void 0), x(this, "_l", void 0), x(this, "_v", void 0), x(this, "_max", void 0), x(this, "_min", void 0), x(this, "_brightness", void 0);
    function r(n) {
      return n[0] in t && n[1] in t && n[2] in t;
    }
    if (t) if (typeof t == "string") {
      let a = function(i) {
        return n.startsWith(i);
      };
      const n = t.trim();
      /^#?[A-F\d]{3,8}$/i.test(n) ? this.fromHexString(n) : a("rgb") ? this.fromRgbString(n) : a("hsl") ? this.fromHslString(n) : (a("hsv") || a("hsb")) && this.fromHsvString(n);
    } else if (t instanceof $e)
      this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this._h = t._h, this._s = t._s, this._l = t._l, this._v = t._v;
    else if (r("rgb"))
      this.r = Hr(t.r), this.g = Hr(t.g), this.b = Hr(t.b), this.a = typeof t.a == "number" ? Hr(t.a, 1) : 1;
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
      t === 0 ? this._h = 0 : this._h = Fe(60 * (this.r === this.getMax() ? (this.g - this.b) / t + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / t + 2 : (this.r - this.g) / t + 4));
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
      r: Fe(i("r")),
      g: Fe(i("g")),
      b: Fe(i("b")),
      a: Fe(i("a") * 100) / 100
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
    const r = this._c(t), n = this.a + r.a * (1 - this.a), a = (i) => Fe((this[i] * this.a + r[i] * r.a * (1 - this.a)) / n);
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
      const i = Fe(this.a * 255).toString(16);
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
    const t = this.getHue(), r = Fe(this.getSaturation() * 100), n = Fe(this.getLightness() * 100);
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
    return a[t] = Hr(r, n), a;
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
      const v = Fe(n * 255);
      this.r = v, this.g = v, this.b = v;
    }
    let i = 0, o = 0, s = 0;
    const l = t / 60, c = (1 - Math.abs(2 * n - 1)) * r, u = c * (1 - Math.abs(l % 2 - 1));
    l >= 0 && l < 1 ? (i = c, o = u) : l >= 1 && l < 2 ? (i = u, o = c) : l >= 2 && l < 3 ? (o = c, s = u) : l >= 3 && l < 4 ? (o = u, s = c) : l >= 4 && l < 5 ? (i = u, s = c) : l >= 5 && l < 6 && (i = c, s = u);
    const d = n - c / 2;
    this.r = Fe((i + d) * 255), this.g = Fe((o + d) * 255), this.b = Fe((s + d) * 255);
  }
  fromHsv({
    h: t,
    s: r,
    v: n,
    a
  }) {
    this._h = t % 360, this._s = r, this._v = n, this.a = typeof a == "number" ? a : 1;
    const i = Fe(n * 255);
    if (this.r = i, this.g = i, this.b = i, r <= 0)
      return;
    const o = t / 60, s = Math.floor(o), l = o - s, c = Fe(n * (1 - r) * 255), u = Fe(n * (1 - r * l) * 255), d = Fe(n * (1 - r * (1 - l)) * 255);
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
    const r = va(t, ps);
    this.fromHsv({
      h: r[0],
      s: r[1],
      v: r[2],
      a: r[3]
    });
  }
  fromHslString(t) {
    const r = va(t, ps);
    this.fromHsl({
      h: r[0],
      s: r[1],
      l: r[2],
      a: r[3]
    });
  }
  fromRgbString(t) {
    const r = va(t, (n, a) => (
      // Convert percentage to number. e.g. 50% -> 128
      a.includes("%") ? Fe(n / 100 * 255) : n
    ));
    this.r = r[0], this.g = r[1], this.b = r[2], this.a = r[3];
  }
}
var yn = 2, hs = 0.16, dv = 0.05, fv = 0.05, vv = 0.15, ic = 5, oc = 4, pv = [{
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
function ms(e, t, r) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = r ? Math.round(e.h) - yn * t : Math.round(e.h) + yn * t : n = r ? Math.round(e.h) + yn * t : Math.round(e.h) - yn * t, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function gs(e, t, r) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return r ? n = e.s - hs * t : t === oc ? n = e.s + hs : n = e.s + dv * t, n > 1 && (n = 1), r && t === ic && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Math.round(n * 100) / 100;
}
function bs(e, t, r) {
  var n;
  return r ? n = e.v + fv * t : n = e.v - vv * t, n = Math.max(0, Math.min(1, n)), Math.round(n * 100) / 100;
}
function tn(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [], n = new $e(e), a = n.toHsv(), i = ic; i > 0; i -= 1) {
    var o = new $e({
      h: ms(a, i, !0),
      s: gs(a, i, !0),
      v: bs(a, i, !0)
    });
    r.push(o);
  }
  r.push(n);
  for (var s = 1; s <= oc; s += 1) {
    var l = new $e({
      h: ms(a, s),
      s: gs(a, s),
      v: bs(a, s)
    });
    r.push(l);
  }
  return t.theme === "dark" ? pv.map(function(c) {
    var u = c.index, d = c.amount;
    return new $e(t.backgroundColor || "#141414").mix(r[u], d).toHexString();
  }) : r.map(function(c) {
    return c.toHexString();
  });
}
var pa = {
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
}, za = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
za.primary = za[5];
var La = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
La.primary = La[5];
var Ha = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
Ha.primary = Ha[5];
var qa = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
qa.primary = qa[5];
var Ba = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
Ba.primary = Ba[5];
var Wa = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
Wa.primary = Wa[5];
var Ua = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
Ua.primary = Ua[5];
var Ya = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
Ya.primary = Ya[5];
var In = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
In.primary = In[5];
var Ga = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
Ga.primary = Ga[5];
var Ka = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
Ka.primary = Ka[5];
var Xa = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
Xa.primary = Xa[5];
var Za = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
Za.primary = Za[5];
var ha = {
  red: za,
  volcano: La,
  orange: Ha,
  gold: qa,
  yellow: Ba,
  lime: Wa,
  green: Ua,
  cyan: Ya,
  blue: In,
  geekblue: Ga,
  purple: Ka,
  magenta: Xa,
  grey: Za
};
function hv(e, {
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
  } = e, u = t(s), d = t(n), v = t(a), g = t(i), h = t(o), p = r(l, c), f = e.colorLink || e.colorInfo, S = t(f), m = new $e(g[1]).mix(new $e(g[3]), 50).toHexString();
  return Object.assign(Object.assign({}, p), {
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
    colorErrorBg: g[1],
    colorErrorBgHover: g[2],
    colorErrorBgFilledHover: m,
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
    colorLinkHover: S[4],
    colorLink: S[6],
    colorLinkActive: S[7],
    colorBgMask: new $e("#000").setA(0.45).toRgbString(),
    colorWhite: "#fff"
  });
}
const mv = (e) => {
  let t = e, r = e, n = e, a = e;
  return e < 6 && e >= 5 ? t = e + 1 : e < 16 && e >= 6 ? t = e + 2 : e >= 16 && (t = 16), e < 7 && e >= 5 ? r = 4 : e < 8 && e >= 7 ? r = 5 : e < 14 && e >= 8 ? r = 6 : e < 16 && e >= 14 ? r = 7 : e >= 16 && (r = 8), e < 6 && e >= 2 ? n = 1 : e >= 6 && (n = 2), e > 4 && e < 8 ? a = 4 : e >= 8 && (a = 6), {
    borderRadius: e,
    borderRadiusXS: n,
    borderRadiusSM: r,
    borderRadiusLG: t,
    borderRadiusOuter: a
  };
};
function gv(e) {
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
  }, mv(n));
}
const bv = (e) => {
  const {
    controlHeight: t
  } = e;
  return {
    controlHeightSM: t * 0.75,
    controlHeightXS: t * 0.5,
    controlHeightLG: t * 1.25
  };
};
function yv(e) {
  return (e + 8) / e;
}
function Sv(e) {
  const t = Array.from({
    length: 10
  }).map((r, n) => {
    const a = n - 1, i = e * Math.pow(Math.E, a / 5), o = n > 1 ? Math.floor(i) : Math.ceil(i);
    return Math.floor(o / 2) * 2;
  });
  return t[1] = e, t.map((r) => ({
    size: r,
    lineHeight: yv(r)
  }));
}
const xv = (e) => {
  const t = Sv(e), r = t.map((u) => u.size), n = t.map((u) => u.lineHeight), a = r[1], i = r[0], o = r[2], s = n[1], l = n[0], c = n[2];
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
function Ev(e) {
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
const qe = (e, t) => new $e(e).setA(t).toRgbString(), qr = (e, t) => new $e(e).darken(t).toHexString(), Cv = (e) => {
  const t = tn(e);
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
}, _v = (e, t) => {
  const r = e || "#fff", n = t || "#000";
  return {
    colorBgBase: r,
    colorTextBase: n,
    colorText: qe(n, 0.88),
    colorTextSecondary: qe(n, 0.65),
    colorTextTertiary: qe(n, 0.45),
    colorTextQuaternary: qe(n, 0.25),
    colorFill: qe(n, 0.15),
    colorFillSecondary: qe(n, 0.06),
    colorFillTertiary: qe(n, 0.04),
    colorFillQuaternary: qe(n, 0.02),
    colorBgSolid: qe(n, 1),
    colorBgSolidHover: qe(n, 0.75),
    colorBgSolidActive: qe(n, 0.95),
    colorBgLayout: qr(r, 4),
    colorBgContainer: qr(r, 0),
    colorBgElevated: qr(r, 0),
    colorBgSpotlight: qe(n, 0.85),
    colorBgBlur: "transparent",
    colorBorder: qr(r, 15),
    colorBorderSecondary: qr(r, 6)
  };
};
function $v(e) {
  pa.pink = pa.magenta, ha.pink = ha.magenta;
  const t = Object.keys(ac).map((r) => {
    const n = e[r] === pa[r] ? ha[r] : tn(e[r]);
    return Array.from({
      length: 10
    }, () => 1).reduce((a, i, o) => (a[`${r}-${o + 1}`] = n[o], a[`${r}${o + 1}`] = n[o], a), {});
  }).reduce((r, n) => (r = Object.assign(Object.assign({}, r), n), r), {});
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e), t), hv(e, {
    generateColorPalettes: Cv,
    generateNeutralColorPalettes: _v
  })), xv(e.fontSize)), Ev(e)), bv(e)), gv(e));
}
const sc = Ma($v), Ja = {
  token: en,
  override: {
    override: en
  },
  hashed: !0
}, lc = /* @__PURE__ */ B.createContext(Ja), Qa = "ant", Ai = "anticon", wv = ["outlined", "borderless", "filled", "underlined"], Pv = (e, t) => t || (e ? `${Qa}-${e}` : Qa), mt = /* @__PURE__ */ b.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: Pv,
  iconPrefixCls: Ai
}), {
  Consumer: Cg
} = mt, ys = {};
function cc(e) {
  const t = b.useContext(mt), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: a
  } = t, i = t[e];
  return Object.assign(Object.assign({
    classNames: ys,
    styles: ys
  }, i), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: a
  });
}
const Rv = `-ant-${Date.now()}-${Math.random()}`;
function Ov(e, t) {
  const r = {}, n = (o, s) => {
    let l = o.clone();
    return l = (s == null ? void 0 : s(l)) || l, l.toRgbString();
  }, a = (o, s) => {
    const l = new $e(o), c = tn(l.toRgbString());
    r[`${s}-color`] = n(l), r[`${s}-color-disabled`] = c[1], r[`${s}-color-hover`] = c[4], r[`${s}-color-active`] = c[6], r[`${s}-color-outline`] = l.clone().setA(0.2).toRgbString(), r[`${s}-color-deprecated-bg`] = c[0], r[`${s}-color-deprecated-border`] = c[2];
  };
  if (t.primaryColor) {
    a(t.primaryColor, "primary");
    const o = new $e(t.primaryColor), s = tn(o.toRgbString());
    s.forEach((c, u) => {
      r[`primary-${u + 1}`] = c;
    }), r["primary-color-deprecated-l-35"] = n(o, (c) => c.lighten(35)), r["primary-color-deprecated-l-20"] = n(o, (c) => c.lighten(20)), r["primary-color-deprecated-t-20"] = n(o, (c) => c.tint(20)), r["primary-color-deprecated-t-50"] = n(o, (c) => c.tint(50)), r["primary-color-deprecated-f-12"] = n(o, (c) => c.setA(c.a * 0.12));
    const l = new $e(s[0]);
    r["primary-color-active-deprecated-f-30"] = n(l, (c) => c.setA(c.a * 0.3)), r["primary-color-active-deprecated-d-02"] = n(l, (c) => c.darken(2));
  }
  return t.successColor && a(t.successColor, "success"), t.warningColor && a(t.warningColor, "warning"), t.errorColor && a(t.errorColor, "error"), t.infoColor && a(t.infoColor, "info"), `
  :root {
    ${Object.keys(r).map((o) => `--${e}-${o}: ${r[o]};`).join(`
`)}
  }
  `.trim();
}
function Tv(e, t) {
  const r = Ov(e, t);
  ft() ? St(r, `${Rv}-dynamic-theme`) : process.env.NODE_ENV !== "production" && Bn(!1, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
}
const rn = /* @__PURE__ */ b.createContext(!1), Fv = ({
  children: e,
  disabled: t
}) => {
  const r = b.useContext(rn);
  return /* @__PURE__ */ b.createElement(rn.Provider, {
    value: t ?? r
  }, e);
}, qt = /* @__PURE__ */ b.createContext(void 0), Av = ({
  children: e,
  size: t
}) => {
  const r = b.useContext(qt);
  return /* @__PURE__ */ b.createElement(qt.Provider, {
    value: t || r
  }, e);
};
function Mv() {
  const e = dt(rn), t = dt(qt);
  return {
    componentDisabled: e,
    componentSize: t
  };
}
var uc = /* @__PURE__ */ Ie(function e() {
  ke(this, e);
}), dc = "CALC_UNIT", jv = new RegExp(dc, "g");
function ma(e) {
  return typeof e == "number" ? "".concat(e).concat(dc) : e;
}
var Nv = /* @__PURE__ */ (function(e) {
  wt(r, e);
  var t = Pt(r);
  function r(n, a) {
    var i;
    ke(this, r), i = t.call(this), x(J(i), "result", ""), x(J(i), "unitlessCssVar", void 0), x(J(i), "lowPriority", void 0);
    var o = G(n);
    return i.unitlessCssVar = a, n instanceof r ? i.result = "(".concat(n.result, ")") : o === "number" ? i.result = ma(n) : o === "string" && (i.result = n), i;
  }
  return Ie(r, [{
    key: "add",
    value: function(a) {
      return a instanceof r ? this.result = "".concat(this.result, " + ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " + ").concat(ma(a))), this.lowPriority = !0, this;
    }
  }, {
    key: "sub",
    value: function(a) {
      return a instanceof r ? this.result = "".concat(this.result, " - ").concat(a.getResult()) : (typeof a == "number" || typeof a == "string") && (this.result = "".concat(this.result, " - ").concat(ma(a))), this.lowPriority = !0, this;
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
      }) && (l = !1), this.result = this.result.replace(jv, l ? "px" : ""), typeof this.lowPriority < "u" ? "calc(".concat(this.result, ")") : this.result;
    }
  }]), r;
})(uc), kv = /* @__PURE__ */ (function(e) {
  wt(r, e);
  var t = Pt(r);
  function r(n) {
    var a;
    return ke(this, r), a = t.call(this), x(J(a), "result", 0), n instanceof r ? a.result = n.result : typeof n == "number" && (a.result = n), a;
  }
  return Ie(r, [{
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
})(uc), Iv = function(t, r) {
  var n = t === "css" ? Nv : kv;
  return function(a) {
    return new n(a, r);
  };
}, Ss = function(t, r) {
  return "".concat([r, t.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-"));
};
function nn(e) {
  var t = b.useRef();
  t.current = e;
  var r = b.useCallback(function() {
    for (var n, a = arguments.length, i = new Array(a), o = 0; o < a; o++)
      i[o] = arguments[o];
    return (n = t.current) === null || n === void 0 ? void 0 : n.call.apply(n, [t].concat(i));
  }, []);
  return r;
}
function an(e) {
  var t = b.useRef(!1), r = b.useState(e), n = q(r, 2), a = n[0], i = n[1];
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
function ga(e) {
  return e !== void 0;
}
function Mi(e, t) {
  var r = t || {}, n = r.defaultValue, a = r.value, i = r.onChange, o = r.postState, s = an(function() {
    return ga(a) ? a : ga(n) ? typeof n == "function" ? n() : n : typeof e == "function" ? e() : e;
  }), l = q(s, 2), c = l[0], u = l[1], d = a !== void 0 ? a : c, v = o ? o(d) : d, g = nn(i), h = an([d]), p = q(h, 2), f = p[0], S = p[1];
  os(function() {
    var _ = f[0];
    c !== _ && g(c, _);
  }, [f]), os(function() {
    ga(a) || u(a);
  }, [a]);
  var m = nn(function(_, P) {
    u(_, P), S([d], P);
  });
  return [v, m];
}
function xs(e, t, r, n) {
  var a = O({}, t[e]);
  if (n != null && n.deprecatedTokens) {
    var i = n.deprecatedTokens;
    i.forEach(function(s) {
      var l = q(s, 2), c = l[0], u = l[1];
      if (process.env.NODE_ENV !== "production" && me(!(a != null && a[c]), "Component Token `".concat(String(c), "` of ").concat(String(e), " is deprecated. Please use `").concat(String(u), "` instead.")), a != null && a[c] || a != null && a[u]) {
        var d;
        (d = a[u]) !== null && d !== void 0 || (a[u] = a == null ? void 0 : a[c]);
      }
    });
  }
  var o = O(O({}, r), a);
  return Object.keys(o).forEach(function(s) {
    o[s] === t[s] && delete o[s];
  }), o;
}
var fc = process.env.NODE_ENV !== "production" || typeof CSSINJS_STATISTIC < "u", ei = !0;
function Rt() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  if (!fc)
    return Object.assign.apply(Object, [{}].concat(t));
  ei = !1;
  var n = {};
  return t.forEach(function(a) {
    if (G(a) === "object") {
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
  }), ei = !0, n;
}
var Es = {};
function Dv() {
}
var Vv = function(t) {
  var r, n = t, a = Dv;
  return fc && typeof Proxy < "u" && (r = /* @__PURE__ */ new Set(), n = new Proxy(t, {
    get: function(o, s) {
      if (ei) {
        var l;
        (l = r) === null || l === void 0 || l.add(s);
      }
      return o[s];
    }
  }), a = function(o, s) {
    var l;
    Es[o] = {
      global: Array.from(r),
      component: O(O({}, (l = Es[o]) === null || l === void 0 ? void 0 : l.component), s)
    };
  }), {
    token: n,
    keys: r,
    flush: a
  };
};
function Cs(e, t, r) {
  if (typeof r == "function") {
    var n;
    return r(Rt(t, (n = t[e]) !== null && n !== void 0 ? n : {}));
  }
  return r ?? {};
}
function zv(e) {
  return e === "js" ? {
    max: Math.max,
    min: Math.min
  } : {
    max: function() {
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      return "max(".concat(n.map(function(i) {
        return ye(i);
      }).join(","), ")");
    },
    min: function() {
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      return "min(".concat(n.map(function(i) {
        return ye(i);
      }).join(","), ")");
    }
  };
}
var Lv = 1e3 * 60 * 10, Hv = /* @__PURE__ */ (function() {
  function e() {
    ke(this, e), x(this, "map", /* @__PURE__ */ new Map()), x(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), x(this, "nextID", 0), x(this, "lastAccessBeat", /* @__PURE__ */ new Map()), x(this, "accessBeat", 0);
  }
  return Ie(e, [{
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
        return i && G(i) === "object" ? "obj_".concat(n.getObjectID(i)) : "".concat(G(i), "_").concat(i);
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
          n - a > Lv && (r.map.delete(i), r.lastAccessBeat.delete(i));
        }), this.accessBeat = 0;
      }
    }
  }]), e;
})(), _s = new Hv();
function qv(e, t) {
  return B.useMemo(function() {
    var r = _s.get(t);
    if (r)
      return r;
    var n = e();
    return _s.set(t, n), n;
  }, t);
}
var Bv = function() {
  return {};
};
function Wv(e) {
  var t = e.useCSP, r = t === void 0 ? Bv : t, n = e.useToken, a = e.usePrefix, i = e.getResetStyles, o = e.getCommonStyle, s = e.getCompUnitless;
  function l(v, g, h, p) {
    var f = Array.isArray(v) ? v[0] : v;
    function S(y) {
      return "".concat(String(f)).concat(y.slice(0, 1).toUpperCase()).concat(y.slice(1));
    }
    var m = (p == null ? void 0 : p.unitless) || {}, _ = typeof s == "function" ? s(v) : {}, P = O(O({}, _), {}, x({}, S("zIndexPopup"), !0));
    Object.keys(m).forEach(function(y) {
      P[S(y)] = m[y];
    });
    var C = O(O({}, p), {}, {
      unitless: P,
      prefixToken: S
    }), $ = u(v, g, h, C), E = c(f, h, C);
    return function(y) {
      var R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : y, T = $(y, R), M = q(T, 2), j = M[1], F = E(R), A = q(F, 2), I = A[0], k = A[1];
      return [I, j, k];
    };
  }
  function c(v, g, h) {
    var p = h.unitless, f = h.injectStyle, S = f === void 0 ? !0 : f, m = h.prefixToken, _ = h.ignore, P = function(E) {
      var y = E.rootCls, R = E.cssVar, T = R === void 0 ? {} : R, M = n(), j = M.realToken;
      return tv({
        path: [v],
        prefix: T.prefix,
        key: T.key,
        unitless: p,
        ignore: _,
        token: j,
        scope: y
      }, function() {
        var F = Cs(v, j, g), A = xs(v, j, F, {
          deprecatedTokens: h == null ? void 0 : h.deprecatedTokens
        });
        return Object.keys(F).forEach(function(I) {
          A[m(I)] = A[I], delete A[I];
        }), A;
      }), null;
    }, C = function(E) {
      var y = n(), R = y.cssVar;
      return [function(T) {
        return S && R ? /* @__PURE__ */ B.createElement(B.Fragment, null, /* @__PURE__ */ B.createElement(P, {
          rootCls: E,
          cssVar: R,
          component: v
        }), T) : T;
      }, R == null ? void 0 : R.key];
    };
    return C;
  }
  function u(v, g, h) {
    var p = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, f = Array.isArray(v) ? v : [v, v], S = q(f, 1), m = S[0], _ = f.join("-"), P = e.layer || {
      name: "antd"
    };
    return function(C) {
      var $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : C, E = n(), y = E.theme, R = E.realToken, T = E.hashId, M = E.token, j = E.cssVar, F = a(), A = F.rootPrefixCls, I = F.iconPrefixCls, k = r(), D = j ? "css" : "js", H = qv(function() {
        var z = /* @__PURE__ */ new Set();
        return j && Object.keys(p.unitless || {}).forEach(function(re) {
          z.add(Pn(re, j.prefix)), z.add(Pn(re, Ss(m, j.prefix)));
        }), Iv(D, z);
      }, [D, m, j == null ? void 0 : j.prefix]), K = zv(D), U = K.max, w = K.min, N = {
        theme: y,
        token: M,
        hashId: T,
        nonce: function() {
          return k.nonce;
        },
        clientOnly: p.clientOnly,
        layer: P,
        // antd is always at top of styles
        order: p.order || -999
      };
      typeof i == "function" && Va(O(O({}, N), {}, {
        clientOnly: !1,
        path: ["Shared", A]
      }), function() {
        return i(M, {
          prefix: {
            rootPrefixCls: A,
            iconPrefixCls: I
          },
          csp: k
        });
      });
      var V = Va(O(O({}, N), {}, {
        path: [_, C, I]
      }), function() {
        if (p.injectStyle === !1)
          return [];
        var z = Vv(M), re = z.token, Q = z.flush, Y = Cs(m, R, h), ee = ".".concat(C), ie = xs(m, R, Y, {
          deprecatedTokens: p.deprecatedTokens
        });
        j && Y && G(Y) === "object" && Object.keys(Y).forEach(function(Re) {
          Y[Re] = "var(".concat(Pn(Re, Ss(m, j.prefix)), ")");
        });
        var oe = Rt(re, {
          componentCls: ee,
          prefixCls: C,
          iconCls: ".".concat(I),
          antCls: ".".concat(A),
          calc: H,
          // @ts-ignore
          max: U,
          // @ts-ignore
          min: w
        }, j ? Y : ie), he = g(oe, {
          hashId: T,
          prefixCls: C,
          rootPrefixCls: A,
          iconPrefixCls: I
        });
        Q(m, ie);
        var ge = typeof o == "function" ? o(oe, C, $, p.resetFont) : null;
        return [p.resetStyle === !1 ? null : ge, he];
      });
      return [V, T];
    };
  }
  function d(v, g, h) {
    var p = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, f = u(v, g, h, O({
      resetStyle: !1,
      // Sub Style should default after root one
      order: -998
    }, p)), S = function(_) {
      var P = _.prefixCls, C = _.rootCls, $ = C === void 0 ? P : C;
      return f(P, $), null;
    };
    return process.env.NODE_ENV !== "production" && (S.displayName = "SubStyle_".concat(String(Array.isArray(v) ? v.join(".") : v))), S;
  }
  return {
    genStyleHooks: l,
    genSubStyleComponent: d,
    genComponentStyleHook: u
  };
}
const Uv = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"], Yv = "5.25.4";
function ba(e) {
  return e >= 0 && e <= 255;
}
function Sn(e, t) {
  const {
    r,
    g: n,
    b: a,
    a: i
  } = new $e(e).toRgb();
  if (i < 1)
    return e;
  const {
    r: o,
    g: s,
    b: l
  } = new $e(t).toRgb();
  for (let c = 0.01; c <= 1; c += 0.01) {
    const u = Math.round((r - o * (1 - c)) / c), d = Math.round((n - s * (1 - c)) / c), v = Math.round((a - l * (1 - c)) / c);
    if (ba(u) && ba(d) && ba(v))
      return new $e({
        r: u,
        g: d,
        b: v,
        a: Math.round(c * 100) / 100
      }).toRgbString();
  }
  return new $e({
    r,
    g: n,
    b: a,
    a: 1
  }).toRgbString();
}
var Gv = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
function vc(e) {
  const {
    override: t
  } = e, r = Gv(e, ["override"]), n = Object.assign({}, t);
  Object.keys(en).forEach((v) => {
    delete n[v];
  });
  const a = Object.assign(Object.assign({}, r), n), i = 480, o = 576, s = 768, l = 992, c = 1200, u = 1600;
  return a.motion === !1 && (a.motionDurationFast = "0s", a.motionDurationMid = "0s", a.motionDurationSlow = "0s"), Object.assign(Object.assign(Object.assign({}, a), {
    // ============== Background ============== //
    colorFillContent: a.colorFillSecondary,
    colorFillContentHover: a.colorFill,
    colorFillAlter: a.colorFillQuaternary,
    colorBgContainerDisabled: a.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: a.colorBgContainer,
    colorSplit: Sn(a.colorBorderSecondary, a.colorBgContainer),
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
    colorErrorOutline: Sn(a.colorErrorBg, a.colorBgContainer),
    colorWarningOutline: Sn(a.colorWarningBg, a.colorBgContainer),
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
    controlOutline: Sn(a.colorPrimaryBg, a.colorBgContainer),
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
      0 1px 2px -2px ${new $e("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new $e("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new $e("rgba(0, 0, 0, 0.09)").toRgbString()}
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
var $s = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const pc = {
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
}, Kv = {
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
}, Xv = {
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
}, hc = (e, t, r) => {
  const n = r.getDerivativeToken(e), {
    override: a
  } = t, i = $s(t, ["override"]);
  let o = Object.assign(Object.assign({}, n), {
    override: a
  });
  return o = vc(o), i && Object.entries(i).forEach(([s, l]) => {
    const {
      theme: c
    } = l, u = $s(l, ["theme"]);
    let d = u;
    c && (d = hc(Object.assign(Object.assign({}, o), u), {
      override: u
    }, c)), o[s] = d;
  }), o;
};
function Kn() {
  const {
    token: e,
    hashed: t,
    theme: r,
    override: n,
    cssVar: a
  } = B.useContext(lc), i = `${Yv}-${t || ""}`, o = r || sc, [s, l, c] = wf(o, [en, e], {
    salt: i,
    override: n,
    getComputedToken: hc,
    // formatToken will not be consumed after 1.15.0 with getComputedToken.
    // But token will break if @ant-design/cssinjs is under 1.15.0 without it
    formatToken: vc,
    cssVar: a && {
      prefix: a.prefix,
      key: a.key,
      unitless: pc,
      ignore: Kv,
      preserve: Xv
    }
  });
  return [o, c, t ? l : "", s, a];
}
const mc = (e, t = !1) => ({
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
}), Zv = () => ({
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
}), Jv = () => ({
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
}), Qv = (e) => ({
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
}), ep = (e, t, r, n) => {
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
}, gc = (e) => ({
  [`.${e}`]: Object.assign(Object.assign({}, Zv()), {
    [`.${e} .${e}-icon`]: {
      display: "block"
    }
  })
}), {
  genStyleHooks: ji
} = Wv({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: t
    } = dt(mt);
    return {
      rootPrefixCls: e(),
      iconPrefixCls: t
    };
  },
  useToken: () => {
    const [e, t, r, n, a] = Kn();
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
    } = dt(mt);
    return e ?? {};
  },
  getResetStyles: (e, t) => {
    var r;
    const n = Qv(e);
    return [n, {
      "&": n
    }, gc((r = t == null ? void 0 : t.prefix.iconPrefixCls) !== null && r !== void 0 ? r : Ai)];
  },
  getCommonStyle: ep,
  getCompUnitless: () => pc
}), tp = (e, t) => {
  const [r, n] = Kn();
  return Va({
    token: n,
    hashId: "",
    path: ["ant-design-icons", e],
    nonce: () => t == null ? void 0 : t.nonce,
    layer: {
      name: "antd"
    }
  }, () => [gc(e)]);
}, rp = Object.assign({}, b), {
  useId: ws
} = rp, np = () => "", ap = typeof ws > "u" ? np : ws;
function ip(e, t, r) {
  var n, a;
  const i = Et("ConfigProvider"), o = e || {}, s = o.inherit === !1 || !t ? Object.assign(Object.assign({}, Ja), {
    hashed: (n = t == null ? void 0 : t.hashed) !== null && n !== void 0 ? n : Ja.hashed,
    cssVar: t == null ? void 0 : t.cssVar
  }) : t, l = ap();
  if (process.env.NODE_ENV !== "production") {
    const c = o.cssVar || s.cssVar, u = !!(typeof o.cssVar == "object" && (!((a = o.cssVar) === null || a === void 0) && a.key) || l);
    process.env.NODE_ENV !== "production" && i(!c || u, "breaking", "Missing key in `cssVar` config. Please upgrade to React 18 or set `cssVar.key` manually in each ConfigProvider inside `cssVar` enabled ConfigProvider.");
  }
  return Ei(() => {
    var c, u;
    if (!e)
      return t;
    const d = Object.assign({}, s.components);
    Object.keys(e.components || {}).forEach((h) => {
      d[h] = Object.assign(Object.assign({}, d[h]), e.components[h]);
    });
    const v = `css-var-${l.replace(/:/g, "")}`, g = ((c = o.cssVar) !== null && c !== void 0 ? c : s.cssVar) && Object.assign(Object.assign(Object.assign({
      prefix: r == null ? void 0 : r.prefixCls
    }, typeof s.cssVar == "object" ? s.cssVar : {}), typeof o.cssVar == "object" ? o.cssVar : {}), {
      key: typeof o.cssVar == "object" && ((u = o.cssVar) === null || u === void 0 ? void 0 : u.key) || v
    });
    return Object.assign(Object.assign(Object.assign({}, s), o), {
      token: Object.assign(Object.assign({}, s.token), o.token),
      components: d,
      cssVar: g
    });
  }, [o, s], (c, u) => c.some((d, v) => {
    const g = u[v];
    return !Fa(d, g, !0);
  }));
}
function Ps(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}
function op(e) {
  return e && G(e) === "object" && Ps(e.nativeElement) ? e.nativeElement : Ps(e) ? e : null;
}
function An(e) {
  var t = op(e);
  if (t)
    return t;
  if (e instanceof B.Component) {
    var r;
    return (r = Yi.findDOMNode) === null || r === void 0 ? void 0 : r.call(Yi, e);
  }
  return null;
}
var sp = ["children"], bc = /* @__PURE__ */ b.createContext({});
function lp(e) {
  var t = e.children, r = We(e, sp);
  return /* @__PURE__ */ b.createElement(bc.Provider, {
    value: r
  }, t);
}
var cp = /* @__PURE__ */ (function(e) {
  wt(r, e);
  var t = Pt(r);
  function r() {
    return ke(this, r), t.apply(this, arguments);
  }
  return Ie(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
})(b.Component);
function up(e) {
  var t = b.useReducer(function(s) {
    return s + 1;
  }, 0), r = q(t, 2), n = r[1], a = b.useRef(e), i = nn(function() {
    return a.current;
  }), o = nn(function(s) {
    a.current = typeof s == "function" ? s(a.current) : s, n();
  });
  return [i, o];
}
var vt = "none", xn = "appear", En = "enter", Cn = "leave", Rs = "none", Xe = "prepare", kt = "start", It = "active", Ni = "end", yc = "prepared";
function Os(e, t) {
  var r = {};
  return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit".concat(e)] = "webkit".concat(t), r["Moz".concat(e)] = "moz".concat(t), r["ms".concat(e)] = "MS".concat(t), r["O".concat(e)] = "o".concat(t.toLowerCase()), r;
}
function dp(e, t) {
  var r = {
    animationend: Os("Animation", "AnimationEnd"),
    transitionend: Os("Transition", "TransitionEnd")
  };
  return e && ("AnimationEvent" in t || delete r.animationend.animation, "TransitionEvent" in t || delete r.transitionend.transition), r;
}
var fp = dp(ft(), typeof window < "u" ? window : {}), Sc = {};
if (ft()) {
  var vp = document.createElement("div");
  Sc = vp.style;
}
var _n = {};
function xc(e) {
  if (_n[e])
    return _n[e];
  var t = fp[e];
  if (t)
    for (var r = Object.keys(t), n = r.length, a = 0; a < n; a += 1) {
      var i = r[a];
      if (Object.prototype.hasOwnProperty.call(t, i) && i in Sc)
        return _n[e] = t[i], _n[e];
    }
  return "";
}
var Ec = xc("animationend"), Cc = xc("transitionend"), _c = !!(Ec && Cc), Ts = Ec || "animationend", Fs = Cc || "transitionend";
function As(e, t) {
  if (!e) return null;
  if (G(e) === "object") {
    var r = t.replace(/-\w/g, function(n) {
      return n[1].toUpperCase();
    });
    return e[r];
  }
  return "".concat(e, "-").concat(t);
}
const pp = (function(e) {
  var t = _e();
  function r(a) {
    a && (a.removeEventListener(Fs, e), a.removeEventListener(Ts, e));
  }
  function n(a) {
    t.current && t.current !== a && r(t.current), a && a !== t.current && (a.addEventListener(Fs, e), a.addEventListener(Ts, e), t.current = a);
  }
  return b.useEffect(function() {
    return function() {
      r(t.current);
    };
  }, []), [n, r];
});
var $c = ft() ? Au : Ze, wc = function(t) {
  return +setTimeout(t, 16);
}, Pc = function(t) {
  return clearTimeout(t);
};
typeof window < "u" && "requestAnimationFrame" in window && (wc = function(t) {
  return window.requestAnimationFrame(t);
}, Pc = function(t) {
  return window.cancelAnimationFrame(t);
});
var Ms = 0, Xn = /* @__PURE__ */ new Map();
function Rc(e) {
  Xn.delete(e);
}
var Bt = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  Ms += 1;
  var n = Ms;
  function a(i) {
    if (i === 0)
      Rc(n), t();
    else {
      var o = wc(function() {
        a(i - 1);
      });
      Xn.set(n, o);
    }
  }
  return a(r), n;
};
Bt.cancel = function(e) {
  var t = Xn.get(e);
  return Rc(e), Pc(t);
};
process.env.NODE_ENV !== "production" && (Bt.ids = function() {
  return Xn;
});
const hp = (function() {
  var e = b.useRef(null);
  function t() {
    Bt.cancel(e.current);
  }
  function r(n) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    t();
    var i = Bt(function() {
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
});
var mp = [Xe, kt, It, Ni], gp = [Xe, yc], Oc = !1, bp = !0;
function Tc(e) {
  return e === It || e === Ni;
}
const yp = (function(e, t, r) {
  var n = an(Rs), a = q(n, 2), i = a[0], o = a[1], s = hp(), l = q(s, 2), c = l[0], u = l[1];
  function d() {
    o(Xe, !0);
  }
  var v = t ? gp : mp;
  return $c(function() {
    if (i !== Rs && i !== Ni) {
      var g = v.indexOf(i), h = v[g + 1], p = r(i);
      p === Oc ? o(h, !0) : h && c(function(f) {
        function S() {
          f.isCanceled() || o(h, !0);
        }
        p === !0 ? S() : Promise.resolve(p).then(S);
      });
    }
  }, [e, i]), b.useEffect(function() {
    return function() {
      u();
    };
  }, []), [d, i];
});
function Sp(e, t, r, n) {
  var a = n.motionEnter, i = a === void 0 ? !0 : a, o = n.motionAppear, s = o === void 0 ? !0 : o, l = n.motionLeave, c = l === void 0 ? !0 : l, u = n.motionDeadline, d = n.motionLeaveImmediately, v = n.onAppearPrepare, g = n.onEnterPrepare, h = n.onLeavePrepare, p = n.onAppearStart, f = n.onEnterStart, S = n.onLeaveStart, m = n.onAppearActive, _ = n.onEnterActive, P = n.onLeaveActive, C = n.onAppearEnd, $ = n.onEnterEnd, E = n.onLeaveEnd, y = n.onVisibleChanged, R = an(), T = q(R, 2), M = T[0], j = T[1], F = up(vt), A = q(F, 2), I = A[0], k = A[1], D = an(null), H = q(D, 2), K = H[0], U = H[1], w = I(), N = _e(!1), V = _e(null);
  function z() {
    return r();
  }
  var re = _e(!1);
  function Q() {
    k(vt), U(null, !0);
  }
  var Y = nn(function(xe) {
    var be = I();
    if (be !== vt) {
      var te = z();
      if (!(xe && !xe.deadline && xe.target !== te)) {
        var Z = re.current, pe;
        be === xn && Z ? pe = C == null ? void 0 : C(te, xe) : be === En && Z ? pe = $ == null ? void 0 : $(te, xe) : be === Cn && Z && (pe = E == null ? void 0 : E(te, xe)), Z && pe !== !1 && Q();
      }
    }
  }), ee = pp(Y), ie = q(ee, 1), oe = ie[0], he = function(be) {
    switch (be) {
      case xn:
        return x(x(x({}, Xe, v), kt, p), It, m);
      case En:
        return x(x(x({}, Xe, g), kt, f), It, _);
      case Cn:
        return x(x(x({}, Xe, h), kt, S), It, P);
      default:
        return {};
    }
  }, ge = b.useMemo(function() {
    return he(w);
  }, [w]), Re = yp(w, !e, function(xe) {
    if (xe === Xe) {
      var be = ge[Xe];
      return be ? be(z()) : Oc;
    }
    if (X in ge) {
      var te;
      U(((te = ge[X]) === null || te === void 0 ? void 0 : te.call(ge, z(), null)) || null);
    }
    return X === It && w !== vt && (oe(z()), u > 0 && (clearTimeout(V.current), V.current = setTimeout(function() {
      Y({
        deadline: !0
      });
    }, u))), X === yc && Q(), bp;
  }), L = q(Re, 2), Se = L[0], X = L[1], ae = Tc(X);
  re.current = ae;
  var Oe = _e(null);
  $c(function() {
    if (!(N.current && Oe.current === t)) {
      j(t);
      var xe = N.current;
      N.current = !0;
      var be;
      !xe && t && s && (be = xn), xe && t && i && (be = En), (xe && !t && c || !xe && d && !t && c) && (be = Cn);
      var te = he(be);
      be && (e || te[Xe]) ? (k(be), Se()) : k(vt), Oe.current = t;
    }
  }, [t]), Ze(function() {
    // Cancel appear
    (w === xn && !s || // Cancel enter
    w === En && !i || // Cancel leave
    w === Cn && !c) && k(vt);
  }, [s, i, c]), Ze(function() {
    return function() {
      N.current = !1, clearTimeout(V.current);
    };
  }, []);
  var se = b.useRef(!1);
  Ze(function() {
    M && (se.current = !0), M !== void 0 && w === vt && ((se.current || M) && (y == null || y(M)), se.current = !0);
  }, [M, w]);
  var Ae = K;
  return ge[Xe] && X === kt && (Ae = O({
    transition: "none"
  }, Ae)), [w, X, Ae, M ?? t];
}
function xp(e) {
  var t = e;
  G(e) === "object" && (t = e.transitionSupport);
  function r(a, i) {
    return !!(a.motionName && t && i !== !1);
  }
  var n = /* @__PURE__ */ b.forwardRef(function(a, i) {
    var o = a.visible, s = o === void 0 ? !0 : o, l = a.removeOnLeave, c = l === void 0 ? !0 : l, u = a.forceRender, d = a.children, v = a.motionName, g = a.leavedClassName, h = a.eventProps, p = b.useContext(bc), f = p.motion, S = r(a, f), m = _e(), _ = _e();
    function P() {
      try {
        return m.current instanceof HTMLElement ? m.current : An(_.current);
      } catch {
        return null;
      }
    }
    var C = Sp(S, s, P, a), $ = q(C, 4), E = $[0], y = $[1], R = $[2], T = $[3], M = b.useRef(T);
    T && (M.current = !0);
    var j = b.useCallback(function(H) {
      m.current = H, xl(i, H);
    }, [i]), F, A = O(O({}, h), {}, {
      visible: s
    });
    if (!d)
      F = null;
    else if (E === vt)
      T ? F = d(O({}, A), j) : !c && M.current && g ? F = d(O(O({}, A), {}, {
        className: g
      }), j) : u || !c && !g ? F = d(O(O({}, A), {}, {
        style: {
          display: "none"
        }
      }), j) : F = null;
    else {
      var I;
      y === Xe ? I = "prepare" : Tc(y) ? I = "active" : y === kt && (I = "start");
      var k = As(v, "".concat(E, "-").concat(I));
      F = d(O(O({}, A), {}, {
        className: de(As(v, E), x(x({}, k, k && I), v, typeof v == "string")),
        style: R
      }), j);
    }
    if (/* @__PURE__ */ b.isValidElement(F) && Cl(F)) {
      var D = $l(F);
      D || (F = /* @__PURE__ */ b.cloneElement(F, {
        ref: j
      }));
    }
    return /* @__PURE__ */ b.createElement(cp, {
      ref: _
    }, F);
  });
  return n.displayName = "CSSMotion", n;
}
const Ep = xp(_c);
var ti = "add", ri = "keep", ni = "remove", ya = "removed";
function Cp(e) {
  var t;
  return e && G(e) === "object" && "key" in e ? t = e : t = {
    key: e
  }, O(O({}, t), {}, {
    key: String(t.key)
  });
}
function ai() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  return e.map(Cp);
}
function _p() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = [], n = 0, a = t.length, i = ai(e), o = ai(t);
  i.forEach(function(c) {
    for (var u = !1, d = n; d < a; d += 1) {
      var v = o[d];
      if (v.key === c.key) {
        n < d && (r = r.concat(o.slice(n, d).map(function(g) {
          return O(O({}, g), {}, {
            status: ti
          });
        })), n = d), r.push(O(O({}, v), {}, {
          status: ri
        })), n += 1, u = !0;
        break;
      }
    }
    u || r.push(O(O({}, c), {}, {
      status: ni
    }));
  }), n < a && (r = r.concat(o.slice(n).map(function(c) {
    return O(O({}, c), {}, {
      status: ti
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
      return d !== c || v !== ni;
    }), r.forEach(function(u) {
      u.key === c && (u.status = ri);
    });
  }), r;
}
var $p = ["component", "children", "onVisibleChanged", "onAllRemoved"], wp = ["status"], Pp = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearPrepare", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function Rp(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ep, r = /* @__PURE__ */ (function(n) {
    wt(i, n);
    var a = Pt(i);
    function i() {
      var o;
      ke(this, i);
      for (var s = arguments.length, l = new Array(s), c = 0; c < s; c++)
        l[c] = arguments[c];
      return o = a.call.apply(a, [this].concat(l)), x(J(o), "state", {
        keyEntities: []
      }), x(J(o), "removeKey", function(u) {
        o.setState(function(d) {
          var v = d.keyEntities.map(function(g) {
            return g.key !== u ? g : O(O({}, g), {}, {
              status: ya
            });
          });
          return {
            keyEntities: v
          };
        }, function() {
          var d = o.state.keyEntities, v = d.filter(function(g) {
            var h = g.status;
            return h !== ya;
          }).length;
          v === 0 && o.props.onAllRemoved && o.props.onAllRemoved();
        });
      }), o;
    }
    return Ie(i, [{
      key: "render",
      value: function() {
        var s = this, l = this.state.keyEntities, c = this.props, u = c.component, d = c.children, v = c.onVisibleChanged;
        c.onAllRemoved;
        var g = We(c, $p), h = u || b.Fragment, p = {};
        return Pp.forEach(function(f) {
          p[f] = g[f], delete g[f];
        }), delete g.keys, /* @__PURE__ */ b.createElement(h, g, l.map(function(f, S) {
          var m = f.status, _ = We(f, wp), P = m === ti || m === ri;
          return /* @__PURE__ */ b.createElement(t, De({}, p, {
            key: _.key,
            visible: P,
            eventProps: _,
            onVisibleChanged: function($) {
              v == null || v($, {
                key: _.key
              }), $ || s.removeKey(_.key);
            }
          }), function(C, $) {
            return d(O(O({}, C), {}, {
              index: S
            }), $);
          });
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function(s, l) {
        var c = s.keys, u = l.keyEntities, d = ai(c), v = _p(u, d);
        return {
          keyEntities: v.filter(function(g) {
            var h = u.find(function(p) {
              var f = p.key;
              return g.key === f;
            });
            return !(h && h.status === ya && g.status === ni);
          })
        };
      }
    }]), i;
  })(b.Component);
  return x(r, "defaultProps", {
    component: "div"
  }), r;
}
Rp(_c);
function Op(e) {
  const {
    children: t
  } = e, [, r] = Kn(), {
    motion: n
  } = r, a = b.useRef(!1);
  return a.current = a.current || n === !1, a.current ? /* @__PURE__ */ b.createElement(lp, {
    motion: n
  }, t) : t;
}
const Fc = /* @__PURE__ */ b.memo(({
  dropdownMatchSelectWidth: e
}) => (Et("ConfigProvider").deprecated(e === void 0, "dropdownMatchSelectWidth", "popupMatchSelectWidth"), null));
process.env.NODE_ENV !== "production" && (Fc.displayName = "PropWarning");
const Tp = process.env.NODE_ENV !== "production" ? Fc : () => null;
var Fp = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
let ii = !1;
process.env.NODE_ENV;
const Ap = ["getTargetContainer", "getPopupContainer", "renderEmpty", "input", "pagination", "form", "select", "button"];
let Ac;
function Mp() {
  return Ac || Qa;
}
function jp(e) {
  return Object.keys(e).some((t) => t.endsWith("Color"));
}
const Np = (e) => {
  const {
    prefixCls: t,
    iconPrefixCls: r,
    theme: n,
    holderRender: a
  } = e;
  t !== void 0 && (Ac = t), n && jp(n) && (process.env.NODE_ENV !== "production" && Bn(!1, "ConfigProvider", "`config` of css variable theme is not work in v5. Please use new `theme` config instead."), Tv(Mp(), n));
}, kp = (e) => {
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
    dropdownMatchSelectWidth: g,
    popupMatchSelectWidth: h,
    popupOverflow: p,
    legacyLocale: f,
    parentContext: S,
    iconPrefixCls: m,
    theme: _,
    componentDisabled: P,
    segmented: C,
    statistic: $,
    spin: E,
    calendar: y,
    carousel: R,
    cascader: T,
    collapse: M,
    typography: j,
    checkbox: F,
    descriptions: A,
    divider: I,
    drawer: k,
    skeleton: D,
    steps: H,
    image: K,
    layout: U,
    list: w,
    mentions: N,
    modal: V,
    progress: z,
    result: re,
    slider: Q,
    breadcrumb: Y,
    menu: ee,
    pagination: ie,
    input: oe,
    textArea: he,
    empty: ge,
    badge: Re,
    radio: L,
    rate: Se,
    switch: X,
    transfer: ae,
    avatar: Oe,
    message: se,
    tag: Ae,
    table: xe,
    card: be,
    tabs: te,
    timeline: Z,
    timePicker: pe,
    upload: ot,
    notification: et,
    tree: Ge,
    colorPicker: st,
    datePicker: gt,
    rangePicker: Qn,
    flex: ea,
    wave: Ee,
    dropdown: le,
    warning: tt,
    tour: Ot,
    tooltip: bu,
    popover: yu,
    popconfirm: Su,
    floatButtonGroup: xu,
    variant: Eu,
    inputNumber: Cu,
    treeSelect: _u
  } = e, Hi = b.useCallback((we, je) => {
    const {
      prefixCls: rt
    } = e;
    if (je)
      return je;
    const nt = rt || S.getPrefixCls("");
    return we ? `${nt}-${we}` : nt;
  }, [S.getPrefixCls, e.prefixCls]), dn = m || S.iconPrefixCls || Ai, fn = r || S.csp;
  tp(dn, fn);
  const vn = ip(_, S.theme, {
    prefixCls: Hi("")
  });
  process.env.NODE_ENV !== "production" && (ii = ii || !!vn);
  const ta = {
    csp: fn,
    autoInsertSpaceInButton: n,
    alert: a,
    anchor: i,
    locale: s || f,
    direction: c,
    space: u,
    splitter: d,
    virtual: v,
    popupMatchSelectWidth: h ?? g,
    popupOverflow: p,
    getPrefixCls: Hi,
    iconPrefixCls: dn,
    theme: vn,
    segmented: C,
    statistic: $,
    spin: E,
    calendar: y,
    carousel: R,
    cascader: T,
    collapse: M,
    typography: j,
    checkbox: F,
    descriptions: A,
    divider: I,
    drawer: k,
    skeleton: D,
    steps: H,
    image: K,
    input: oe,
    textArea: he,
    layout: U,
    list: w,
    mentions: N,
    modal: V,
    progress: z,
    result: re,
    slider: Q,
    breadcrumb: Y,
    menu: ee,
    pagination: ie,
    empty: ge,
    badge: Re,
    radio: L,
    rate: Se,
    switch: X,
    transfer: ae,
    avatar: Oe,
    message: se,
    tag: Ae,
    table: xe,
    card: be,
    tabs: te,
    timeline: Z,
    timePicker: pe,
    upload: ot,
    notification: et,
    tree: Ge,
    colorPicker: st,
    datePicker: gt,
    rangePicker: Qn,
    flex: ea,
    wave: Ee,
    dropdown: le,
    warning: tt,
    tour: Ot,
    tooltip: bu,
    popover: yu,
    popconfirm: Su,
    floatButtonGroup: xu,
    variant: Eu,
    inputNumber: Cu,
    treeSelect: _u
  };
  process.env.NODE_ENV !== "production" && Et("ConfigProvider")(!("autoInsertSpaceInButton" in e), "deprecated", "`autoInsertSpaceInButton` is deprecated. Please use `{ button: { autoInsertSpace: boolean }}` instead.");
  const Tt = Object.assign({}, S);
  Object.keys(ta).forEach((we) => {
    ta[we] !== void 0 && (Tt[we] = ta[we]);
  }), Ap.forEach((we) => {
    const je = e[we];
    je && (Tt[we] = je);
  }), typeof n < "u" && (Tt.button = Object.assign({
    autoInsertSpace: n
  }, Tt.button));
  const Ft = Ei(() => Tt, Tt, (we, je) => {
    const rt = Object.keys(we), nt = Object.keys(je);
    return rt.length !== nt.length || rt.some((pn) => we[pn] !== je[pn]);
  }), {
    layer: qi
  } = b.useContext(sn), $u = b.useMemo(() => ({
    prefixCls: dn,
    csp: fn,
    layer: qi ? "antd" : void 0
  }), [dn, fn, qi]);
  let Me = /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement(Tp, {
    dropdownMatchSelectWidth: g
  }), t);
  const Bi = b.useMemo(() => {
    var we, je, rt, nt;
    return Nt(((we = Gn.Form) === null || we === void 0 ? void 0 : we.defaultValidateMessages) || {}, ((rt = (je = Ft.locale) === null || je === void 0 ? void 0 : je.Form) === null || rt === void 0 ? void 0 : rt.defaultValidateMessages) || {}, ((nt = Ft.form) === null || nt === void 0 ? void 0 : nt.validateMessages) || {}, (o == null ? void 0 : o.validateMessages) || {});
  }, [Ft, o == null ? void 0 : o.validateMessages]);
  Object.keys(Bi).length > 0 && (Me = /* @__PURE__ */ b.createElement(ov.Provider, {
    value: Bi
  }, Me)), s && (Me = /* @__PURE__ */ b.createElement(nc, {
    locale: s,
    _ANT_MARK__: rc
  }, Me)), Me = /* @__PURE__ */ b.createElement(Fi.Provider, {
    value: $u
  }, Me), l && (Me = /* @__PURE__ */ b.createElement(Av, {
    size: l
  }, Me)), Me = /* @__PURE__ */ b.createElement(Op, null, Me);
  const wu = b.useMemo(() => {
    const we = vn || {}, {
      algorithm: je,
      token: rt,
      components: nt,
      cssVar: pn
    } = we, Pu = Fp(we, ["algorithm", "token", "components", "cssVar"]), Wi = je && (!Array.isArray(je) || je.length > 0) ? Ma(je) : sc, ra = {};
    Object.entries(nt || {}).forEach(([Ru, Ou]) => {
      const lt = Object.assign({}, Ou);
      "algorithm" in lt && (lt.algorithm === !0 ? lt.theme = Wi : (Array.isArray(lt.algorithm) || typeof lt.algorithm == "function") && (lt.theme = Ma(lt.algorithm)), delete lt.algorithm), ra[Ru] = lt;
    });
    const Ui = Object.assign(Object.assign({}, en), rt);
    return Object.assign(Object.assign({}, Pu), {
      theme: Wi,
      token: Ui,
      components: ra,
      override: Object.assign({
        override: Ui
      }, ra),
      cssVar: pn
    });
  }, [vn]);
  return _ && (Me = /* @__PURE__ */ b.createElement(lc.Provider, {
    value: wu
  }, Me)), Ft.warning && (Me = /* @__PURE__ */ b.createElement(Ol.Provider, {
    value: Ft.warning
  }, Me)), P !== void 0 && (Me = /* @__PURE__ */ b.createElement(Fv, {
    disabled: P
  }, Me)), /* @__PURE__ */ b.createElement(mt.Provider, {
    value: Ft
  }, Me);
}, Kt = (e) => {
  const t = b.useContext(mt), r = b.useContext(tc);
  return /* @__PURE__ */ b.createElement(kp, Object.assign({
    parentContext: t,
    legacyLocale: r
  }, e));
};
Kt.ConfigContext = mt;
Kt.SizeContext = qt;
Kt.config = Np;
Kt.useConfig = Mv;
Object.defineProperty(Kt, "SizeContext", {
  get: () => (process.env.NODE_ENV !== "production" && Bn(!1, "ConfigProvider", "ConfigProvider.SizeContext is deprecated. Please use `ConfigProvider.useConfig().componentSize` instead."), qt)
});
process.env.NODE_ENV !== "production" && (Kt.displayName = "ConfigProvider");
function Mc(e, t) {
  this.v = e, this.k = t;
}
function Ne(e, t, r, n) {
  var a = Object.defineProperty;
  try {
    a({}, "", {});
  } catch {
    a = 0;
  }
  Ne = function(o, s, l, c) {
    function u(d, v) {
      Ne(o, d, function(g) {
        return this._invoke(d, v, g);
      });
    }
    s ? a ? a(o, s, {
      value: l,
      enumerable: !c,
      configurable: !c,
      writable: !c
    }) : o[s] = l : (u("next", 0), u("throw", 1), u("return", 2));
  }, Ne(e, t, r, n);
}
function ki() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e, t, r = typeof Symbol == "function" ? Symbol : {}, n = r.iterator || "@@iterator", a = r.toStringTag || "@@toStringTag";
  function i(g, h, p, f) {
    var S = h && h.prototype instanceof s ? h : s, m = Object.create(S.prototype);
    return Ne(m, "_invoke", (function(_, P, C) {
      var $, E, y, R = 0, T = C || [], M = !1, j = {
        p: 0,
        n: 0,
        v: e,
        a: F,
        f: F.bind(e, 4),
        d: function(I, k) {
          return $ = I, E = 0, y = e, j.n = k, o;
        }
      };
      function F(A, I) {
        for (E = A, y = I, t = 0; !M && R && !k && t < T.length; t++) {
          var k, D = T[t], H = j.p, K = D[2];
          A > 3 ? (k = K === I) && (y = D[(E = D[4]) ? 5 : (E = 3, 3)], D[4] = D[5] = e) : D[0] <= H && ((k = A < 2 && H < D[1]) ? (E = 0, j.v = I, j.n = D[1]) : H < K && (k = A < 3 || D[0] > I || I > K) && (D[4] = A, D[5] = I, j.n = K, E = 0));
        }
        if (k || A > 1) return o;
        throw M = !0, I;
      }
      return function(A, I, k) {
        if (R > 1) throw TypeError("Generator is already running");
        for (M && I === 1 && F(I, k), E = I, y = k; (t = E < 2 ? e : y) || !M; ) {
          $ || (E ? E < 3 ? (E > 1 && (j.n = -1), F(E, y)) : j.n = y : j.v = y);
          try {
            if (R = 2, $) {
              if (E || (A = "next"), t = $[A]) {
                if (!(t = t.call($, y))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                y = t.value, E < 2 && (E = 0);
              } else E === 1 && (t = $.return) && t.call($), E < 2 && (y = TypeError("The iterator does not provide a '" + A + "' method"), E = 1);
              $ = e;
            } else if ((t = (M = j.n < 0) ? y : _.call(P, j)) !== o) break;
          } catch (D) {
            $ = e, E = 1, y = D;
          } finally {
            R = 1;
          }
        }
        return {
          value: t,
          done: M
        };
      };
    })(g, p, f), !0), m;
  }
  var o = {};
  function s() {
  }
  function l() {
  }
  function c() {
  }
  t = Object.getPrototypeOf;
  var u = [][n] ? t(t([][n]())) : (Ne(t = {}, n, function() {
    return this;
  }), t), d = c.prototype = s.prototype = Object.create(u);
  function v(g) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(g, c) : (g.__proto__ = c, Ne(g, a, "GeneratorFunction")), g.prototype = Object.create(d), g;
  }
  return l.prototype = c, Ne(d, "constructor", c), Ne(c, "constructor", l), l.displayName = "GeneratorFunction", Ne(c, a, "GeneratorFunction"), Ne(d), Ne(d, a, "Generator"), Ne(d, n, function() {
    return this;
  }), Ne(d, "toString", function() {
    return "[object Generator]";
  }), (ki = function() {
    return {
      w: i,
      m: v
    };
  })();
}
function Dn(e, t) {
  function r(a, i, o, s) {
    try {
      var l = e[a](i), c = l.value;
      return c instanceof Mc ? t.resolve(c.v).then(function(u) {
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
  this.next || (Ne(Dn.prototype), Ne(Dn.prototype, typeof Symbol == "function" && Symbol.asyncIterator || "@asyncIterator", function() {
    return this;
  })), Ne(this, "_invoke", function(a, i, o) {
    function s() {
      return new t(function(l, c) {
        r(a, o, l, c);
      });
    }
    return n = n ? n.then(s, s) : s();
  }, !0);
}
function jc(e, t, r, n, a) {
  return new Dn(ki().w(e, t, r, n), a || Promise);
}
function Ip(e, t, r, n, a) {
  var i = jc(e, t, r, n, a);
  return i.next().then(function(o) {
    return o.done ? o.value : i.next();
  });
}
function Dp(e) {
  var t = Object(e), r = [];
  for (var n in t) r.unshift(n);
  return function a() {
    for (; r.length; ) if ((n = r.pop()) in t) return a.value = n, a.done = !1, a;
    return a.done = !0, a;
  };
}
function js(e) {
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
  throw new TypeError(G(e) + " is not iterable");
}
function Ye() {
  var e = ki(), t = e.m(Ye), r = (Object.getPrototypeOf ? Object.getPrototypeOf(t) : t.__proto__).constructor;
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
        delegateYield: function(d, v, g) {
          return s.resultName = v, l(c.d, js(d), g);
        },
        finish: function(d) {
          return l(c.f, d);
        }
      }, l = function(d, v, g) {
        c.p = s.prev, c.n = s.next;
        try {
          return d(v, g);
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
  return (Ye = function() {
    return {
      wrap: function(l, c, u, d) {
        return e.w(i(l), c, u, d && d.reverse());
      },
      isGeneratorFunction: n,
      mark: e.m,
      awrap: function(l, c) {
        return new Mc(l, c);
      },
      AsyncIterator: Dn,
      async: function(l, c, u, d, v) {
        return (n(c) ? jc : Ip)(i(l), c, u, d, v);
      },
      keys: Dp,
      values: js
    };
  })();
}
function Ns(e, t, r, n, a, i, o) {
  try {
    var s = e[i](o), l = s.value;
  } catch (c) {
    return void r(c);
  }
  s.done ? t(l) : Promise.resolve(l).then(n, a);
}
function ln(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(n, a) {
      var i = e.apply(t, r);
      function o(l) {
        Ns(i, n, a, o, s, "next", l);
      }
      function s(l) {
        Ns(i, n, a, o, s, "throw", l);
      }
      o(void 0);
    });
  };
}
const Nc = (e) => {
  const t = B.useContext(qt);
  return B.useMemo(() => e ? typeof e == "string" ? e ?? t : typeof e == "function" ? e(t) : t : t, [e, t]);
};
function Vn(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [];
  return B.Children.forEach(e, function(n) {
    n == null && !t.keepEmpty || (Array.isArray(n) ? r = r.concat(Vn(n)) : Sl(n) && n.props ? r = r.concat(Vn(n.props.children, t)) : r.push(n));
  }), r;
}
const kc = /* @__PURE__ */ b.createContext(null), Ic = (e, t) => {
  const r = b.useContext(kc), n = b.useMemo(() => {
    if (!r)
      return "";
    const {
      compactDirection: a,
      isFirstItem: i,
      isLastItem: o
    } = r, s = a === "vertical" ? "-vertical-" : "-";
    return de(`${e}-compact${s}item`, {
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
}, Vp = (e) => {
  const {
    children: t
  } = e;
  return /* @__PURE__ */ b.createElement(kc.Provider, {
    value: null
  }, t);
}, ks = /^[\u4E00-\u9FA5]{2}$/;
ks.test.bind(ks);
function _g(e) {
  return typeof e == "string";
}
["default", "primary", "danger"].concat(W(Uv));
function Dc(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e);
}
function zp(e) {
  return Dc(e) instanceof ShadowRoot;
}
function Lp(e) {
  return zp(e) ? Dc(e) : null;
}
function Hp(e) {
  return e.replace(/-(.)/g, function(t, r) {
    return r.toUpperCase();
  });
}
function qp(e, t) {
  me(e, "[@ant-design/icons] ".concat(t));
}
function Is(e) {
  return G(e) === "object" && typeof e.name == "string" && typeof e.theme == "string" && (G(e.icon) === "object" || typeof e.icon == "function");
}
function Ds() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(e).reduce(function(t, r) {
    var n = e[r];
    switch (r) {
      case "class":
        t.className = n, delete t.class;
        break;
      default:
        delete t[r], t[Hp(r)] = n;
    }
    return t;
  }, {});
}
function oi(e, t, r) {
  return r ? /* @__PURE__ */ B.createElement(e.tag, O(O({
    key: t
  }, Ds(e.attrs)), r), (e.children || []).map(function(n, a) {
    return oi(n, "".concat(t, "-").concat(e.tag, "-").concat(a));
  })) : /* @__PURE__ */ B.createElement(e.tag, O({
    key: t
  }, Ds(e.attrs)), (e.children || []).map(function(n, a) {
    return oi(n, "".concat(t, "-").concat(e.tag, "-").concat(a));
  }));
}
function Vc(e) {
  return tn(e)[0];
}
function zc(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
var Bp = `
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
`, Wp = function(t) {
  var r = dt(Fi), n = r.csp, a = r.prefixCls, i = r.layer, o = Bp;
  a && (o = o.replace(/anticon/g, a)), i && (o = "@layer ".concat(i, ` {
`).concat(o, `
}`)), Ze(function() {
    var s = t.current, l = Lp(s);
    St(o, "@ant-design-icons", {
      prepend: !i,
      csp: n,
      attachTo: l
    });
  }, []);
}, Up = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"], Yr = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function Yp(e) {
  var t = e.primaryColor, r = e.secondaryColor;
  Yr.primaryColor = t, Yr.secondaryColor = r || Vc(t), Yr.calculated = !!r;
}
function Gp() {
  return O({}, Yr);
}
var Xt = function(t) {
  var r = t.icon, n = t.className, a = t.onClick, i = t.style, o = t.primaryColor, s = t.secondaryColor, l = We(t, Up), c = b.useRef(), u = Yr;
  if (o && (u = {
    primaryColor: o,
    secondaryColor: s || Vc(o)
  }), Wp(c), qp(Is(r), "icon should be icon definiton, but got ".concat(r)), !Is(r))
    return null;
  var d = r;
  return d && typeof d.icon == "function" && (d = O(O({}, d), {}, {
    icon: d.icon(u.primaryColor, u.secondaryColor)
  })), oi(d.icon, "svg-".concat(d.name), O(O({
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
Xt.displayName = "IconReact";
Xt.getTwoToneColors = Gp;
Xt.setTwoToneColors = Yp;
function Lc(e) {
  var t = zc(e), r = q(t, 2), n = r[0], a = r[1];
  return Xt.setTwoToneColors({
    primaryColor: n,
    secondaryColor: a
  });
}
function Kp() {
  var e = Xt.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var Xp = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
Lc(In.primary);
var Zn = /* @__PURE__ */ b.forwardRef(function(e, t) {
  var r = e.className, n = e.icon, a = e.spin, i = e.rotate, o = e.tabIndex, s = e.onClick, l = e.twoToneColor, c = We(e, Xp), u = b.useContext(Fi), d = u.prefixCls, v = d === void 0 ? "anticon" : d, g = u.rootClassName, h = de(g, v, x(x({}, "".concat(v, "-").concat(n.name), !!n.name), "".concat(v, "-spin"), !!a || n.name === "loading"), r), p = o;
  p === void 0 && s && (p = -1);
  var f = i ? {
    msTransform: "rotate(".concat(i, "deg)"),
    transform: "rotate(".concat(i, "deg)")
  } : void 0, S = zc(l), m = q(S, 2), _ = m[0], P = m[1];
  return /* @__PURE__ */ b.createElement("span", De({
    role: "img",
    "aria-label": n.name
  }, c, {
    ref: t,
    tabIndex: p,
    onClick: s,
    className: h
  }), /* @__PURE__ */ b.createElement(Xt, {
    icon: n,
    primaryColor: _,
    secondaryColor: P,
    style: f
  }));
});
Zn.displayName = "AntdIcon";
Zn.getTwoToneColor = Kp;
Zn.setTwoToneColor = Lc;
function Zp(e, t, r) {
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
function Jp(e, t, r) {
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
function Qp(e, t = {
  focus: !0
}) {
  const {
    componentCls: r
  } = e, n = `${r}-compact`;
  return {
    [n]: Object.assign(Object.assign({}, Zp(e, n, t)), Jp(r, n, t))
  };
}
function eh(e) {
  return !!(e.addonBefore || e.addonAfter);
}
function th(e) {
  return !!(e.prefix || e.suffix || e.allowClear);
}
function Vs(e, t, r) {
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
function zn(e, t, r, n) {
  if (r) {
    var a = t;
    if (t.type === "click") {
      a = Vs(t, e, ""), r(a);
      return;
    }
    if (e.type !== "file" && n !== void 0) {
      a = Vs(t, e, n), r(a);
      return;
    }
    r(a);
  }
}
function Hc(e, t) {
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
var qc = /* @__PURE__ */ B.forwardRef(function(e, t) {
  var r, n, a, i = e.inputElement, o = e.children, s = e.prefixCls, l = e.prefix, c = e.suffix, u = e.addonBefore, d = e.addonAfter, v = e.className, g = e.style, h = e.disabled, p = e.readOnly, f = e.focused, S = e.triggerFocus, m = e.allowClear, _ = e.value, P = e.handleReset, C = e.hidden, $ = e.classes, E = e.classNames, y = e.dataAttrs, R = e.styles, T = e.components, M = e.onClear, j = o ?? i, F = (T == null ? void 0 : T.affixWrapper) || "span", A = (T == null ? void 0 : T.groupWrapper) || "span", I = (T == null ? void 0 : T.wrapper) || "span", k = (T == null ? void 0 : T.groupAddon) || "span", D = _e(null), H = function(Se) {
    var X;
    (X = D.current) !== null && X !== void 0 && X.contains(Se.target) && (S == null || S());
  }, K = th(e), U = /* @__PURE__ */ Mu(j, {
    value: _,
    className: de((r = j.props) === null || r === void 0 ? void 0 : r.className, !K && (E == null ? void 0 : E.variant)) || null
  }), w = _e(null);
  if (B.useImperativeHandle(t, function() {
    return {
      nativeElement: w.current || D.current
    };
  }), K) {
    var N = null;
    if (m) {
      var V = !h && !p && _, z = "".concat(s, "-clear-icon"), re = G(m) === "object" && m !== null && m !== void 0 && m.clearIcon ? m.clearIcon : "✖";
      N = /* @__PURE__ */ B.createElement("button", {
        type: "button",
        tabIndex: -1,
        onClick: function(Se) {
          P == null || P(Se), M == null || M();
        },
        onMouseDown: function(Se) {
          return Se.preventDefault();
        },
        className: de(z, x(x({}, "".concat(z, "-hidden"), !V), "".concat(z, "-has-suffix"), !!c))
      }, re);
    }
    var Q = "".concat(s, "-affix-wrapper"), Y = de(Q, x(x(x(x(x({}, "".concat(s, "-disabled"), h), "".concat(Q, "-disabled"), h), "".concat(Q, "-focused"), f), "".concat(Q, "-readonly"), p), "".concat(Q, "-input-with-clear-btn"), c && m && _), $ == null ? void 0 : $.affixWrapper, E == null ? void 0 : E.affixWrapper, E == null ? void 0 : E.variant), ee = (c || m) && /* @__PURE__ */ B.createElement("span", {
      className: de("".concat(s, "-suffix"), E == null ? void 0 : E.suffix),
      style: R == null ? void 0 : R.suffix
    }, N, c);
    U = /* @__PURE__ */ B.createElement(F, De({
      className: Y,
      style: R == null ? void 0 : R.affixWrapper,
      onClick: H
    }, y == null ? void 0 : y.affixWrapper, {
      ref: D
    }), l && /* @__PURE__ */ B.createElement("span", {
      className: de("".concat(s, "-prefix"), E == null ? void 0 : E.prefix),
      style: R == null ? void 0 : R.prefix
    }, l), U, ee);
  }
  if (eh(e)) {
    var ie = "".concat(s, "-group"), oe = "".concat(ie, "-addon"), he = "".concat(ie, "-wrapper"), ge = de("".concat(s, "-wrapper"), ie, $ == null ? void 0 : $.wrapper, E == null ? void 0 : E.wrapper), Re = de(he, x({}, "".concat(he, "-disabled"), h), $ == null ? void 0 : $.group, E == null ? void 0 : E.groupWrapper);
    U = /* @__PURE__ */ B.createElement(A, {
      className: Re,
      ref: w
    }, /* @__PURE__ */ B.createElement(I, {
      className: ge
    }, u && /* @__PURE__ */ B.createElement(k, {
      className: oe
    }, u), U, d && /* @__PURE__ */ B.createElement(k, {
      className: oe
    }, d)));
  }
  return /* @__PURE__ */ B.cloneElement(U, {
    className: de((n = U.props) === null || n === void 0 ? void 0 : n.className, v) || null,
    style: O(O({}, (a = U.props) === null || a === void 0 ? void 0 : a.style), g),
    hidden: C
  });
}), rh = ["show"];
function Bc(e, t) {
  return b.useMemo(function() {
    var r = {};
    t && (r.show = G(t) === "object" && t.formatter ? t.formatter : !!t), r = O(O({}, r), e);
    var n = r, a = n.show, i = We(n, rh);
    return O(O({}, i), {}, {
      show: !!a,
      showFormatter: typeof a == "function" ? a : void 0,
      strategy: i.strategy || function(o) {
        return o.length;
      }
    });
  }, [e, t]);
}
var nh = ["autoComplete", "onChange", "onFocus", "onBlur", "onPressEnter", "onKeyDown", "onKeyUp", "prefixCls", "disabled", "htmlSize", "className", "maxLength", "suffix", "showCount", "count", "type", "classes", "classNames", "styles", "onCompositionStart", "onCompositionEnd"], ah = /* @__PURE__ */ xi(function(e, t) {
  var r = e.autoComplete, n = e.onChange, a = e.onFocus, i = e.onBlur, o = e.onPressEnter, s = e.onKeyDown, l = e.onKeyUp, c = e.prefixCls, u = c === void 0 ? "rc-input" : c, d = e.disabled, v = e.htmlSize, g = e.className, h = e.maxLength, p = e.suffix, f = e.showCount, S = e.count, m = e.type, _ = m === void 0 ? "text" : m, P = e.classes, C = e.classNames, $ = e.styles, E = e.onCompositionStart, y = e.onCompositionEnd, R = We(e, nh), T = Pa(!1), M = q(T, 2), j = M[0], F = M[1], A = _e(!1), I = _e(!1), k = _e(null), D = _e(null), H = function(Z) {
    k.current && Hc(k.current, Z);
  }, K = Mi(e.defaultValue, {
    value: e.value
  }), U = q(K, 2), w = U[0], N = U[1], V = w == null ? "" : String(w), z = Pa(null), re = q(z, 2), Q = re[0], Y = re[1], ee = Bc(S, f), ie = ee.max || h, oe = ee.strategy(V), he = !!ie && oe > ie;
  rl(t, function() {
    var te;
    return {
      focus: H,
      blur: function() {
        var pe;
        (pe = k.current) === null || pe === void 0 || pe.blur();
      },
      setSelectionRange: function(pe, ot, et) {
        var Ge;
        (Ge = k.current) === null || Ge === void 0 || Ge.setSelectionRange(pe, ot, et);
      },
      select: function() {
        var pe;
        (pe = k.current) === null || pe === void 0 || pe.select();
      },
      input: k.current,
      nativeElement: ((te = D.current) === null || te === void 0 ? void 0 : te.nativeElement) || k.current
    };
  }), Ze(function() {
    I.current && (I.current = !1), F(function(te) {
      return te && d ? !1 : te;
    });
  }, [d]);
  var ge = function(Z, pe, ot) {
    var et = pe;
    if (!A.current && ee.exceedFormatter && ee.max && ee.strategy(pe) > ee.max) {
      if (et = ee.exceedFormatter(pe, {
        max: ee.max
      }), pe !== et) {
        var Ge, st;
        Y([((Ge = k.current) === null || Ge === void 0 ? void 0 : Ge.selectionStart) || 0, ((st = k.current) === null || st === void 0 ? void 0 : st.selectionEnd) || 0]);
      }
    } else if (ot.source === "compositionEnd")
      return;
    N(et), k.current && zn(k.current, Z, n, et);
  };
  Ze(function() {
    if (Q) {
      var te;
      (te = k.current) === null || te === void 0 || te.setSelectionRange.apply(te, W(Q));
    }
  }, [Q]);
  var Re = function(Z) {
    ge(Z, Z.target.value, {
      source: "change"
    });
  }, L = function(Z) {
    A.current = !1, ge(Z, Z.currentTarget.value, {
      source: "compositionEnd"
    }), y == null || y(Z);
  }, Se = function(Z) {
    o && Z.key === "Enter" && !I.current && (I.current = !0, o(Z)), s == null || s(Z);
  }, X = function(Z) {
    Z.key === "Enter" && (I.current = !1), l == null || l(Z);
  }, ae = function(Z) {
    F(!0), a == null || a(Z);
  }, Oe = function(Z) {
    I.current && (I.current = !1), F(!1), i == null || i(Z);
  }, se = function(Z) {
    N(""), H(), k.current && zn(k.current, Z, n);
  }, Ae = he && "".concat(u, "-out-of-range"), xe = function() {
    var Z = Od(e, [
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
    return /* @__PURE__ */ B.createElement("input", De({
      autoComplete: r
    }, Z, {
      onChange: Re,
      onFocus: ae,
      onBlur: Oe,
      onKeyDown: Se,
      onKeyUp: X,
      className: de(u, x({}, "".concat(u, "-disabled"), d), C == null ? void 0 : C.input),
      style: $ == null ? void 0 : $.input,
      ref: k,
      size: v,
      type: _,
      onCompositionStart: function(ot) {
        A.current = !0, E == null || E(ot);
      },
      onCompositionEnd: L
    }));
  }, be = function() {
    var Z = Number(ie) > 0;
    if (p || ee.show) {
      var pe = ee.showFormatter ? ee.showFormatter({
        value: V,
        count: oe,
        maxLength: ie
      }) : "".concat(oe).concat(Z ? " / ".concat(ie) : "");
      return /* @__PURE__ */ B.createElement(B.Fragment, null, ee.show && /* @__PURE__ */ B.createElement("span", {
        className: de("".concat(u, "-show-count-suffix"), x({}, "".concat(u, "-show-count-has-suffix"), !!p), C == null ? void 0 : C.count),
        style: O({}, $ == null ? void 0 : $.count)
      }, pe), p);
    }
    return null;
  };
  return /* @__PURE__ */ B.createElement(qc, De({}, R, {
    prefixCls: u,
    className: de(g, Ae),
    handleReset: se,
    value: V,
    focused: j,
    triggerFocus: H,
    suffix: be(),
    disabled: d,
    classes: P,
    classNames: C,
    styles: $,
    ref: D
  }), xe());
}), si = /* @__PURE__ */ b.createContext(null);
function ih(e) {
  var t = e.children, r = e.onBatchResize, n = b.useRef(0), a = b.useRef([]), i = b.useContext(si), o = b.useCallback(function(s, l, c) {
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
  return /* @__PURE__ */ b.createElement(si.Provider, {
    value: o
  }, t);
}
var Wc = (function() {
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
})(), li = typeof window < "u" && typeof document < "u" && window.document === document, Ln = (function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
})(), oh = (function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(Ln) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
})(), sh = 2;
function lh(e, t) {
  var r = !1, n = !1, a = 0;
  function i() {
    r && (r = !1, e()), n && s();
  }
  function o() {
    oh(i);
  }
  function s() {
    var l = Date.now();
    if (r) {
      if (l - a < sh)
        return;
      n = !0;
    } else
      r = !0, n = !1, setTimeout(o, t);
    a = l;
  }
  return s;
}
var ch = 20, uh = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], dh = typeof MutationObserver < "u", fh = (
  /** @class */
  (function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = lh(this.refresh.bind(this), ch);
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
      !li || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), dh ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !li || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var r = t.propertyName, n = r === void 0 ? "" : r, a = uh.some(function(i) {
        return !!~n.indexOf(i);
      });
      a && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  })()
), Uc = (function(e, t) {
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
}), Wt = (function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || Ln;
}), Yc = Jn(0, 0, 0, 0);
function Hn(e) {
  return parseFloat(e) || 0;
}
function zs(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return t.reduce(function(n, a) {
    var i = e["border-" + a + "-width"];
    return n + Hn(i);
  }, 0);
}
function vh(e) {
  for (var t = ["top", "right", "bottom", "left"], r = {}, n = 0, a = t; n < a.length; n++) {
    var i = a[n], o = e["padding-" + i];
    r[i] = Hn(o);
  }
  return r;
}
function ph(e) {
  var t = e.getBBox();
  return Jn(0, 0, t.width, t.height);
}
function hh(e) {
  var t = e.clientWidth, r = e.clientHeight;
  if (!t && !r)
    return Yc;
  var n = Wt(e).getComputedStyle(e), a = vh(n), i = a.left + a.right, o = a.top + a.bottom, s = Hn(n.width), l = Hn(n.height);
  if (n.boxSizing === "border-box" && (Math.round(s + i) !== t && (s -= zs(n, "left", "right") + i), Math.round(l + o) !== r && (l -= zs(n, "top", "bottom") + o)), !gh(e)) {
    var c = Math.round(s + i) - t, u = Math.round(l + o) - r;
    Math.abs(c) !== 1 && (s -= c), Math.abs(u) !== 1 && (l -= u);
  }
  return Jn(a.left, a.top, s, l);
}
var mh = /* @__PURE__ */ (function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof Wt(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof Wt(e).SVGElement && typeof e.getBBox == "function";
  };
})();
function gh(e) {
  return e === Wt(e).document.documentElement;
}
function bh(e) {
  return li ? mh(e) ? ph(e) : hh(e) : Yc;
}
function yh(e) {
  var t = e.x, r = e.y, n = e.width, a = e.height, i = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(i.prototype);
  return Uc(o, {
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
function Jn(e, t, r, n) {
  return { x: e, y: t, width: r, height: n };
}
var Sh = (
  /** @class */
  (function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = Jn(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = bh(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  })()
), xh = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t, r) {
      var n = yh(r);
      Uc(this, { target: t, contentRect: n });
    }
    return e;
  })()
), Eh = (
  /** @class */
  (function() {
    function e(t, r, n) {
      if (this.activeObservations_ = [], this.observations_ = new Wc(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = r, this.callbackCtx_ = n;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof Wt(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var r = this.observations_;
        r.has(t) || (r.set(t, new Sh(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof Wt(t).Element))
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
          return new xh(n.target, n.broadcastRect());
        });
        this.callback_.call(t, r, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  })()
), Gc = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new Wc(), Kc = (
  /** @class */
  /* @__PURE__ */ (function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var r = fh.getInstance(), n = new Eh(t, r, this);
      Gc.set(this, n);
    }
    return e;
  })()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  Kc.prototype[e] = function() {
    var t;
    return (t = Gc.get(this))[e].apply(t, arguments);
  };
});
var Ch = (function() {
  return typeof Ln.ResizeObserver < "u" ? Ln.ResizeObserver : Kc;
})(), ut = /* @__PURE__ */ new Map();
function Xc(e) {
  e.forEach(function(t) {
    var r, n = t.target;
    (r = ut.get(n)) === null || r === void 0 || r.forEach(function(a) {
      return a(n);
    });
  });
}
var Zc = new Ch(Xc);
process.env.NODE_ENV;
process.env.NODE_ENV;
function _h(e, t) {
  ut.has(e) || (ut.set(e, /* @__PURE__ */ new Set()), Zc.observe(e)), ut.get(e).add(t);
}
function $h(e, t) {
  ut.has(e) && (ut.get(e).delete(t), ut.get(e).size || (Zc.unobserve(e), ut.delete(e)));
}
var wh = /* @__PURE__ */ (function(e) {
  wt(r, e);
  var t = Pt(r);
  function r() {
    return ke(this, r), t.apply(this, arguments);
  }
  return Ie(r, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), r;
})(b.Component);
function Ph(e, t) {
  var r = e.children, n = e.disabled, a = b.useRef(null), i = b.useRef(null), o = b.useContext(si), s = typeof r == "function", l = s ? r(a) : r, c = b.useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  }), u = !s && /* @__PURE__ */ b.isValidElement(l) && Cl(l), d = u ? $l(l) : null, v = Id(d, a), g = function() {
    var S;
    return An(a.current) || // Support `nativeElement` format
    (a.current && G(a.current) === "object" ? An((S = a.current) === null || S === void 0 ? void 0 : S.nativeElement) : null) || An(i.current);
  };
  b.useImperativeHandle(t, function() {
    return g();
  });
  var h = b.useRef(e);
  h.current = e;
  var p = b.useCallback(function(f) {
    var S = h.current, m = S.onResize, _ = S.data, P = f.getBoundingClientRect(), C = P.width, $ = P.height, E = f.offsetWidth, y = f.offsetHeight, R = Math.floor(C), T = Math.floor($);
    if (c.current.width !== R || c.current.height !== T || c.current.offsetWidth !== E || c.current.offsetHeight !== y) {
      var M = {
        width: R,
        height: T,
        offsetWidth: E,
        offsetHeight: y
      };
      c.current = M;
      var j = E === Math.round(C) ? C : E, F = y === Math.round($) ? $ : y, A = O(O({}, M), {}, {
        offsetWidth: j,
        offsetHeight: F
      });
      o == null || o(A, f, _), m && Promise.resolve().then(function() {
        m(A, f);
      });
    }
  }, []);
  return b.useEffect(function() {
    var f = g();
    return f && !n && _h(f, p), function() {
      return $h(f, p);
    };
  }, [a.current, n]), /* @__PURE__ */ b.createElement(wh, {
    ref: i
  }, u ? /* @__PURE__ */ b.cloneElement(l, {
    ref: v
  }) : l);
}
var Jc = /* @__PURE__ */ b.forwardRef(Ph);
process.env.NODE_ENV !== "production" && (Jc.displayName = "SingleObserver");
var Rh = "rc-observer-key";
function Oh(e, t) {
  var r = e.children, n = typeof r == "function" ? [r] : Vn(r);
  return process.env.NODE_ENV !== "production" && (n.length > 1 ? Kr(!1, "Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.") : n.length === 0 && Kr(!1, "`children` of ResizeObserver is empty. Nothing is in observe.")), n.map(function(a, i) {
    var o = (a == null ? void 0 : a.key) || "".concat(Rh, "-").concat(i);
    return /* @__PURE__ */ b.createElement(Jc, De({}, e, {
      key: o,
      ref: i === 0 ? t : void 0
    }), a);
  });
}
var Ii = /* @__PURE__ */ b.forwardRef(Oh);
process.env.NODE_ENV !== "production" && (Ii.displayName = "ResizeObserver");
Ii.Collection = ih;
var Th = `
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
`, Fh = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "font-variant", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing", "word-break", "white-space"], Sa = {}, ze;
function Ah(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = e.getAttribute("id") || e.getAttribute("data-reactid") || e.getAttribute("name");
  if (t && Sa[r])
    return Sa[r];
  var n = window.getComputedStyle(e), a = n.getPropertyValue("box-sizing") || n.getPropertyValue("-moz-box-sizing") || n.getPropertyValue("-webkit-box-sizing"), i = parseFloat(n.getPropertyValue("padding-bottom")) + parseFloat(n.getPropertyValue("padding-top")), o = parseFloat(n.getPropertyValue("border-bottom-width")) + parseFloat(n.getPropertyValue("border-top-width")), s = Fh.map(function(c) {
    return "".concat(c, ":").concat(n.getPropertyValue(c));
  }).join(";"), l = {
    sizingStyle: s,
    paddingSize: i,
    borderSize: o,
    boxSizing: a
  };
  return t && r && (Sa[r] = l), l;
}
function Mh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  ze || (ze = document.createElement("textarea"), ze.setAttribute("tab-index", "-1"), ze.setAttribute("aria-hidden", "true"), ze.setAttribute("name", "hiddenTextarea"), document.body.appendChild(ze)), e.getAttribute("wrap") ? ze.setAttribute("wrap", e.getAttribute("wrap")) : ze.removeAttribute("wrap");
  var a = Ah(e, t), i = a.paddingSize, o = a.borderSize, s = a.boxSizing, l = a.sizingStyle;
  ze.setAttribute("style", "".concat(l, ";").concat(Th)), ze.value = e.value || e.placeholder || "";
  var c = void 0, u = void 0, d, v = ze.scrollHeight;
  if (s === "border-box" ? v += o : s === "content-box" && (v -= i), r !== null || n !== null) {
    ze.value = " ";
    var g = ze.scrollHeight - i;
    r !== null && (c = g * r, s === "border-box" && (c = c + i + o), v = Math.max(c, v)), n !== null && (u = g * n, s === "border-box" && (u = u + i + o), d = v > u ? "" : "hidden", v = Math.min(u, v));
  }
  var h = {
    height: v,
    overflowY: d,
    resize: "none"
  };
  return c && (h.minHeight = c), u && (h.maxHeight = u), h;
}
var jh = ["prefixCls", "defaultValue", "value", "autoSize", "onResize", "className", "style", "disabled", "onChange", "onInternalAutoSize"], xa = 0, Ea = 1, Ca = 2, Nh = /* @__PURE__ */ b.forwardRef(function(e, t) {
  var r = e, n = r.prefixCls, a = r.defaultValue, i = r.value, o = r.autoSize, s = r.onResize, l = r.className, c = r.style, u = r.disabled, d = r.onChange, v = r.onInternalAutoSize, g = We(r, jh), h = Mi(a, {
    value: i,
    postState: function(z) {
      return z ?? "";
    }
  }), p = q(h, 2), f = p[0], S = p[1], m = function(z) {
    S(z.target.value), d == null || d(z);
  }, _ = b.useRef();
  b.useImperativeHandle(t, function() {
    return {
      textArea: _.current
    };
  });
  var P = b.useMemo(function() {
    return o && G(o) === "object" ? [o.minRows, o.maxRows] : [];
  }, [o]), C = q(P, 2), $ = C[0], E = C[1], y = !!o, R = b.useState(Ca), T = q(R, 2), M = T[0], j = T[1], F = b.useState(), A = q(F, 2), I = A[0], k = A[1], D = function() {
    j(xa), process.env.NODE_ENV === "test" && (v == null || v());
  };
  kn(function() {
    y && D();
  }, [i, $, E, y]), kn(function() {
    if (M === xa)
      j(Ea);
    else if (M === Ea) {
      var V = Mh(_.current, !1, $, E);
      j(Ca), k(V);
    }
  }, [M]);
  var H = b.useRef(), K = function() {
    Bt.cancel(H.current);
  }, U = function(z) {
    M === Ca && (s == null || s(z), o && (K(), H.current = Bt(function() {
      D();
    })));
  };
  b.useEffect(function() {
    return K;
  }, []);
  var w = y ? I : null, N = O(O({}, c), w);
  return (M === xa || M === Ea) && (N.overflowY = "hidden", N.overflowX = "hidden"), /* @__PURE__ */ b.createElement(Ii, {
    onResize: U,
    disabled: !(o || s)
  }, /* @__PURE__ */ b.createElement("textarea", De({}, g, {
    ref: _,
    style: N,
    className: de(n, l, x({}, "".concat(n, "-disabled"), u)),
    disabled: u,
    value: f,
    onChange: m
  })));
}), kh = ["defaultValue", "value", "onFocus", "onBlur", "onChange", "allowClear", "maxLength", "onCompositionStart", "onCompositionEnd", "suffix", "prefixCls", "showCount", "count", "className", "style", "disabled", "hidden", "classNames", "styles", "onResize", "onClear", "onPressEnter", "readOnly", "autoSize", "onKeyDown"], Ih = /* @__PURE__ */ B.forwardRef(function(e, t) {
  var r, n = e.defaultValue, a = e.value, i = e.onFocus, o = e.onBlur, s = e.onChange, l = e.allowClear, c = e.maxLength, u = e.onCompositionStart, d = e.onCompositionEnd, v = e.suffix, g = e.prefixCls, h = g === void 0 ? "rc-textarea" : g, p = e.showCount, f = e.count, S = e.className, m = e.style, _ = e.disabled, P = e.hidden, C = e.classNames, $ = e.styles, E = e.onResize, y = e.onClear, R = e.onPressEnter, T = e.readOnly, M = e.autoSize, j = e.onKeyDown, F = We(e, kh), A = Mi(n, {
    value: a,
    defaultValue: n
  }), I = q(A, 2), k = I[0], D = I[1], H = k == null ? "" : String(k), K = B.useState(!1), U = q(K, 2), w = U[0], N = U[1], V = B.useRef(!1), z = B.useState(null), re = q(z, 2), Q = re[0], Y = re[1], ee = _e(null), ie = _e(null), oe = function() {
    var le;
    return (le = ie.current) === null || le === void 0 ? void 0 : le.textArea;
  }, he = function() {
    oe().focus();
  };
  rl(t, function() {
    var Ee;
    return {
      resizableTextArea: ie.current,
      focus: he,
      blur: function() {
        oe().blur();
      },
      nativeElement: ((Ee = ee.current) === null || Ee === void 0 ? void 0 : Ee.nativeElement) || oe()
    };
  }), Ze(function() {
    N(function(Ee) {
      return !_ && Ee;
    });
  }, [_]);
  var ge = B.useState(null), Re = q(ge, 2), L = Re[0], Se = Re[1];
  B.useEffect(function() {
    if (L) {
      var Ee;
      (Ee = oe()).setSelectionRange.apply(Ee, W(L));
    }
  }, [L]);
  var X = Bc(f, p), ae = (r = X.max) !== null && r !== void 0 ? r : c, Oe = Number(ae) > 0, se = X.strategy(H), Ae = !!ae && se > ae, xe = function(le, tt) {
    var Ot = tt;
    !V.current && X.exceedFormatter && X.max && X.strategy(tt) > X.max && (Ot = X.exceedFormatter(tt, {
      max: X.max
    }), tt !== Ot && Se([oe().selectionStart || 0, oe().selectionEnd || 0])), D(Ot), zn(le.currentTarget, le, s, Ot);
  }, be = function(le) {
    V.current = !0, u == null || u(le);
  }, te = function(le) {
    V.current = !1, xe(le, le.currentTarget.value), d == null || d(le);
  }, Z = function(le) {
    xe(le, le.target.value);
  }, pe = function(le) {
    le.key === "Enter" && R && R(le), j == null || j(le);
  }, ot = function(le) {
    N(!0), i == null || i(le);
  }, et = function(le) {
    N(!1), o == null || o(le);
  }, Ge = function(le) {
    D(""), he(), zn(oe(), le, s);
  }, st = v, gt;
  X.show && (X.showFormatter ? gt = X.showFormatter({
    value: H,
    count: se,
    maxLength: ae
  }) : gt = "".concat(se).concat(Oe ? " / ".concat(ae) : ""), st = /* @__PURE__ */ B.createElement(B.Fragment, null, st, /* @__PURE__ */ B.createElement("span", {
    className: de("".concat(h, "-data-count"), C == null ? void 0 : C.count),
    style: $ == null ? void 0 : $.count
  }, gt)));
  var Qn = function(le) {
    var tt;
    E == null || E(le), (tt = oe()) !== null && tt !== void 0 && tt.style.height && Y(!0);
  }, ea = !M && !p && !l;
  return /* @__PURE__ */ B.createElement(qc, {
    ref: ee,
    value: H,
    allowClear: l,
    handleReset: Ge,
    suffix: st,
    prefixCls: h,
    classNames: O(O({}, C), {}, {
      affixWrapper: de(C == null ? void 0 : C.affixWrapper, x(x({}, "".concat(h, "-show-count"), p), "".concat(h, "-textarea-allow-clear"), l))
    }),
    disabled: _,
    focused: w,
    className: de(S, Ae && "".concat(h, "-out-of-range")),
    style: O(O({}, m), Q && !ea ? {
      height: "auto"
    } : {}),
    dataAttrs: {
      affixWrapper: {
        "data-count": typeof gt == "string" ? gt : void 0
      }
    },
    hidden: P,
    readOnly: T,
    onClear: y
  }, /* @__PURE__ */ B.createElement(Nh, De({}, F, {
    autoSize: M,
    maxLength: c,
    onKeyDown: pe,
    onChange: Z,
    onFocus: ot,
    onBlur: et,
    onCompositionStart: be,
    onCompositionEnd: te,
    className: de(C == null ? void 0 : C.textarea),
    style: O(O({}, $ == null ? void 0 : $.textarea), {}, {
      resize: m == null ? void 0 : m.resize
    }),
    disabled: _,
    prefixCls: h,
    onResize: Qn,
    ref: ie,
    readOnly: T
  })));
}), Dh = { icon: { tag: "svg", attrs: { "fill-rule": "evenodd", viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" } }] }, name: "close-circle", theme: "filled" }, Vh = function(t, r) {
  return /* @__PURE__ */ b.createElement(Zn, De({}, t, {
    ref: r,
    icon: Dh
  }));
}, Qc = /* @__PURE__ */ b.forwardRef(Vh);
process.env.NODE_ENV !== "production" && (Qc.displayName = "CloseCircleFilled");
const eu = (e) => {
  let t;
  return typeof e == "object" && (e != null && e.clearIcon) ? t = e : e && (t = {
    clearIcon: /* @__PURE__ */ B.createElement(Qc, null)
  }), t;
};
function ci(e, t, r) {
  return de({
    [`${e}-status-success`]: t === "success",
    [`${e}-status-warning`]: t === "warning",
    [`${e}-status-error`]: t === "error",
    [`${e}-status-validating`]: t === "validating",
    [`${e}-has-feedback`]: r
  });
}
const tu = (e, t) => t || e, ru = (e) => {
  const [, , , , t] = Kn();
  return t ? `${e}-css-var` : "";
};
var yt = "RC_FORM_INTERNAL_HOOKS", fe = function() {
  me(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Ut = /* @__PURE__ */ b.createContext({
  getFieldValue: fe,
  getFieldsValue: fe,
  getFieldError: fe,
  getFieldWarning: fe,
  getFieldsError: fe,
  isFieldsTouched: fe,
  isFieldTouched: fe,
  isFieldValidating: fe,
  isFieldsValidating: fe,
  resetFields: fe,
  setFields: fe,
  setFieldValue: fe,
  setFieldsValue: fe,
  validateFields: fe,
  submit: fe,
  getInternalHooks: function() {
    return fe(), {
      dispatch: fe,
      initEntityValue: fe,
      registerField: fe,
      useSubscribe: fe,
      setInitialValues: fe,
      destroyForm: fe,
      setCallbacks: fe,
      registerWatch: fe,
      getFields: fe,
      setValidateMessages: fe,
      setPreserve: fe,
      getInitialValue: fe
    };
  }
}), qn = /* @__PURE__ */ b.createContext(null);
function ui(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function zh(e) {
  return e && !!e._init;
}
function di() {
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
var fi = di();
function Lh(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
function Hh(e, t, r) {
  if (Pi()) return Reflect.construct.apply(null, arguments);
  var n = [null];
  n.push.apply(n, t);
  var a = new (e.bind.apply(e, n))();
  return r && Zr(a, r.prototype), a;
}
function vi(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return vi = function(n) {
    if (n === null || !Lh(n)) return n;
    if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
    if (t !== void 0) {
      if (t.has(n)) return t.get(n);
      t.set(n, a);
    }
    function a() {
      return Hh(n, arguments, Jr(this).constructor);
    }
    return a.prototype = Object.create(n.prototype, {
      constructor: {
        value: a,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), Zr(a, n);
  }, vi(e);
}
var qh = /%[sdj%]/g, nu = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (nu = function(t, r) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && r.every(function(n) {
    return typeof n == "string";
  }) && console.warn(t, r);
});
function pi(e) {
  if (!e || !e.length) return null;
  var t = {};
  return e.forEach(function(r) {
    var n = r.field;
    t[n] = t[n] || [], t[n].push(r);
  }), t;
}
function He(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  var a = 0, i = r.length;
  if (typeof e == "function")
    return e.apply(null, r);
  if (typeof e == "string") {
    var o = e.replace(qh, function(s) {
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
function Bh(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern" || e === "tel";
}
function Te(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || Bh(t) && typeof e == "string" && !e);
}
function Wh(e, t, r) {
  var n = [], a = 0, i = e.length;
  function o(s) {
    n.push.apply(n, W(s || [])), a++, a === i && r(n);
  }
  e.forEach(function(s) {
    t(s, o);
  });
}
function Ls(e, t, r) {
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
function Uh(e) {
  var t = [];
  return Object.keys(e).forEach(function(r) {
    t.push.apply(t, W(e[r] || []));
  }), t;
}
var Hs = /* @__PURE__ */ (function(e) {
  wt(r, e);
  var t = Pt(r);
  function r(n, a) {
    var i;
    return ke(this, r), i = t.call(this, "Async Validation Error"), x(J(i), "errors", void 0), x(J(i), "fields", void 0), i.errors = n, i.fields = a, i;
  }
  return Ie(r);
})(/* @__PURE__ */ vi(Error));
function Yh(e, t, r, n, a) {
  if (t.first) {
    var i = new Promise(function(v, g) {
      var h = function(S) {
        return n(S), S.length ? g(new Hs(S, pi(S))) : v(a);
      }, p = Uh(e);
      Ls(p, r, h);
    });
    return i.catch(function(v) {
      return v;
    }), i;
  }
  var o = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], s = Object.keys(e), l = s.length, c = 0, u = [], d = new Promise(function(v, g) {
    var h = function(f) {
      if (u.push.apply(u, f), c++, c === l)
        return n(u), u.length ? g(new Hs(u, pi(u))) : v(a);
    };
    s.length || (n(u), v(a)), s.forEach(function(p) {
      var f = e[p];
      o.indexOf(p) !== -1 ? Ls(f, r, h) : Wh(f, r, h);
    });
  });
  return d.catch(function(v) {
    return v;
  }), d;
}
function Gh(e) {
  return !!(e && e.message !== void 0);
}
function Kh(e, t) {
  for (var r = e, n = 0; n < t.length; n++) {
    if (r == null)
      return r;
    r = r[t[n]];
  }
  return r;
}
function qs(e, t) {
  return function(r) {
    var n;
    return e.fullFields ? n = Kh(t, e.fullFields) : n = t[r.field || e.fullField], Gh(r) ? (r.field = r.field || e.fullField, r.fieldValue = n, r) : {
      message: typeof r == "function" ? r() : r,
      fieldValue: n,
      field: r.field || e.fullField
    };
  };
}
function Bs(e, t) {
  if (t) {
    for (var r in t)
      if (t.hasOwnProperty(r)) {
        var n = t[r];
        G(n) === "object" && G(e[r]) === "object" ? e[r] = O(O({}, e[r]), n) : e[r] = n;
      }
  }
  return e;
}
var Mt = "enum", Xh = function(t, r, n, a, i) {
  t[Mt] = Array.isArray(t[Mt]) ? t[Mt] : [], t[Mt].indexOf(r) === -1 && a.push(He(i.messages[Mt], t.fullField, t[Mt].join(", ")));
}, Zh = function(t, r, n, a, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(r) || a.push(He(i.messages.pattern.mismatch, t.fullField, r, t.pattern));
    else if (typeof t.pattern == "string") {
      var o = new RegExp(t.pattern);
      o.test(r) || a.push(He(i.messages.pattern.mismatch, t.fullField, r, t.pattern));
    }
  }
}, Jh = function(t, r, n, a, i) {
  var o = typeof t.len == "number", s = typeof t.min == "number", l = typeof t.max == "number", c = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, u = r, d = null, v = typeof r == "number", g = typeof r == "string", h = Array.isArray(r);
  if (v ? d = "number" : g ? d = "string" : h && (d = "array"), !d)
    return !1;
  h && (u = r.length), g && (u = r.replace(c, "_").length), o ? u !== t.len && a.push(He(i.messages[d].len, t.fullField, t.len)) : s && !l && u < t.min ? a.push(He(i.messages[d].min, t.fullField, t.min)) : l && !s && u > t.max ? a.push(He(i.messages[d].max, t.fullField, t.max)) : s && l && (u < t.min || u > t.max) && a.push(He(i.messages[d].range, t.fullField, t.min, t.max));
}, au = function(t, r, n, a, i, o) {
  t.required && (!n.hasOwnProperty(t.field) || Te(r, o || t.type)) && a.push(He(i.messages.required, t.fullField));
}, $n;
const Qh = (function() {
  if ($n)
    return $n;
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
  ], i = "(?:%[0-9a-zA-Z]{1,})?", o = "(?:".concat(a.join("|"), ")").concat(i), s = new RegExp("(?:^".concat(r, "$)|(?:^").concat(o, "$)")), l = new RegExp("^".concat(r, "$")), c = new RegExp("^".concat(o, "$")), u = function($) {
    return $ && $.exact ? s : new RegExp("(?:".concat(t($)).concat(r).concat(t($), ")|(?:").concat(t($)).concat(o).concat(t($), ")"), "g");
  };
  u.v4 = function(C) {
    return C && C.exact ? l : new RegExp("".concat(t(C)).concat(r).concat(t(C)), "g");
  }, u.v6 = function(C) {
    return C && C.exact ? c : new RegExp("".concat(t(C)).concat(o).concat(t(C)), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", v = "(?:\\S+(?::\\S*)?@)?", g = u.v4().source, h = u.v6().source, p = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", f = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", S = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", m = "(?::\\d{2,5})?", _ = '(?:[/?#][^\\s"]*)?', P = "(?:".concat(d, "|www\\.)").concat(v, "(?:localhost|").concat(g, "|").concat(h, "|").concat(p).concat(f).concat(S, ")").concat(m).concat(_);
  return $n = new RegExp("(?:^".concat(P, "$)"), "i"), $n;
});
var _a = {
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
}, Br = {
  integer: function(t) {
    return Br.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return Br.number(t) && !Br.integer(t);
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
    return G(t) === "object" && !Br.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(_a.email);
  },
  tel: function(t) {
    return typeof t == "string" && t.length <= 32 && !!t.match(_a.tel);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(Qh());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(_a.hex);
  }
}, em = function(t, r, n, a, i) {
  if (t.required && r === void 0) {
    au(t, r, n, a, i);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "tel", "number", "date", "url", "hex"], s = t.type;
  o.indexOf(s) > -1 ? Br[s](r) || a.push(He(i.messages.types[s], t.fullField, t.type)) : s && G(r) !== t.type && a.push(He(i.messages.types[s], t.fullField, t.type));
}, tm = function(t, r, n, a, i) {
  (/^\s+$/.test(r) || r === "") && a.push(He(i.messages.whitespace, t.fullField));
};
const ne = {
  required: au,
  whitespace: tm,
  type: em,
  range: Jh,
  enum: Xh,
  pattern: Zh
};
var rm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Te(r) && !t.required)
      return n();
    ne.required(t, r, a, o, i);
  }
  n(o);
}, nm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (r == null && !t.required)
      return n();
    ne.required(t, r, a, o, i, "array"), r != null && (ne.type(t, r, a, o, i), ne.range(t, r, a, o, i));
  }
  n(o);
}, am = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Te(r) && !t.required)
      return n();
    ne.required(t, r, a, o, i), r !== void 0 && ne.type(t, r, a, o, i);
  }
  n(o);
}, im = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Te(r, "date") && !t.required)
      return n();
    if (ne.required(t, r, a, o, i), !Te(r, "date")) {
      var l;
      r instanceof Date ? l = r : l = new Date(r), ne.type(t, l, a, o, i), l && ne.range(t, l.getTime(), a, o, i);
    }
  }
  n(o);
}, om = "enum", sm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Te(r) && !t.required)
      return n();
    ne.required(t, r, a, o, i), r !== void 0 && ne[om](t, r, a, o, i);
  }
  n(o);
}, lm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Te(r) && !t.required)
      return n();
    ne.required(t, r, a, o, i), r !== void 0 && (ne.type(t, r, a, o, i), ne.range(t, r, a, o, i));
  }
  n(o);
}, cm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Te(r) && !t.required)
      return n();
    ne.required(t, r, a, o, i), r !== void 0 && (ne.type(t, r, a, o, i), ne.range(t, r, a, o, i));
  }
  n(o);
}, um = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Te(r) && !t.required)
      return n();
    ne.required(t, r, a, o, i), r !== void 0 && ne.type(t, r, a, o, i);
  }
  n(o);
}, dm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (r === "" && (r = void 0), Te(r) && !t.required)
      return n();
    ne.required(t, r, a, o, i), r !== void 0 && (ne.type(t, r, a, o, i), ne.range(t, r, a, o, i));
  }
  n(o);
}, fm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Te(r) && !t.required)
      return n();
    ne.required(t, r, a, o, i), r !== void 0 && ne.type(t, r, a, o, i);
  }
  n(o);
}, vm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Te(r, "string") && !t.required)
      return n();
    ne.required(t, r, a, o, i), Te(r, "string") || ne.pattern(t, r, a, o, i);
  }
  n(o);
}, pm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Te(r) && !t.required)
      return n();
    ne.required(t, r, a, o, i), Te(r) || ne.type(t, r, a, o, i);
  }
  n(o);
}, hm = function(t, r, n, a, i) {
  var o = [], s = Array.isArray(r) ? "array" : G(r);
  ne.required(t, r, a, o, i, s), n(o);
}, mm = function(t, r, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (Te(r, "string") && !t.required)
      return n();
    ne.required(t, r, a, o, i, "string"), Te(r, "string") || (ne.type(t, r, a, o, i), ne.range(t, r, a, o, i), ne.pattern(t, r, a, o, i), t.whitespace === !0 && ne.whitespace(t, r, a, o, i));
  }
  n(o);
}, wn = function(t, r, n, a, i) {
  var o = t.type, s = [], l = t.required || !t.required && a.hasOwnProperty(t.field);
  if (l) {
    if (Te(r, o) && !t.required)
      return n();
    ne.required(t, r, a, s, i, o), Te(r, o) || ne.type(t, r, a, s, i);
  }
  n(s);
};
const Gr = {
  string: mm,
  method: um,
  number: dm,
  boolean: am,
  regexp: pm,
  integer: cm,
  float: lm,
  array: nm,
  object: fm,
  enum: sm,
  pattern: vm,
  date: im,
  url: wn,
  hex: wn,
  email: wn,
  tel: wn,
  required: hm,
  any: rm
};
var cn = /* @__PURE__ */ (function() {
  function e(t) {
    ke(this, e), x(this, "rules", null), x(this, "_messages", fi), this.define(t);
  }
  return Ie(e, [{
    key: "define",
    value: function(r) {
      var n = this;
      if (!r)
        throw new Error("Cannot configure a schema with no rules");
      if (G(r) !== "object" || Array.isArray(r))
        throw new Error("Rules must be an object");
      this.rules = {}, Object.keys(r).forEach(function(a) {
        var i = r[a];
        n.rules[a] = Array.isArray(i) ? i : [i];
      });
    }
  }, {
    key: "messages",
    value: function(r) {
      return r && (this._messages = Bs(di(), r)), this._messages;
    }
  }, {
    key: "validate",
    value: function(r) {
      var n = this, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
      }, o = r, s = a, l = i;
      if (typeof s == "function" && (l = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
        return l && l(null, o), Promise.resolve(o);
      function c(h) {
        var p = [], f = {};
        function S(_) {
          if (Array.isArray(_)) {
            var P;
            p = (P = p).concat.apply(P, W(_));
          } else
            p.push(_);
        }
        for (var m = 0; m < h.length; m++)
          S(h[m]);
        p.length ? (f = pi(p), l(p, f)) : l(null, o);
      }
      if (s.messages) {
        var u = this.messages();
        u === fi && (u = di()), Bs(u, s.messages), s.messages = u;
      } else
        s.messages = this.messages();
      var d = {}, v = s.keys || Object.keys(this.rules);
      v.forEach(function(h) {
        var p = n.rules[h], f = o[h];
        p.forEach(function(S) {
          var m = S;
          typeof m.transform == "function" && (o === r && (o = O({}, o)), f = o[h] = m.transform(f), f != null && (m.type = m.type || (Array.isArray(f) ? "array" : G(f)))), typeof m == "function" ? m = {
            validator: m
          } : m = O({}, m), m.validator = n.getValidationMethod(m), m.validator && (m.field = h, m.fullField = m.fullField || h, m.type = n.getType(m), d[h] = d[h] || [], d[h].push({
            rule: m,
            value: f,
            source: o,
            field: h
          }));
        });
      });
      var g = {};
      return Yh(d, s, function(h, p) {
        var f = h.rule, S = (f.type === "object" || f.type === "array") && (G(f.fields) === "object" || G(f.defaultField) === "object");
        S = S && (f.required || !f.required && h.value), f.field = h.field;
        function m(E, y) {
          return O(O({}, y), {}, {
            fullField: "".concat(f.fullField, ".").concat(E),
            fullFields: f.fullFields ? [].concat(W(f.fullFields), [E]) : [E]
          });
        }
        function _() {
          var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], y = Array.isArray(E) ? E : [E];
          !s.suppressWarning && y.length && e.warning("async-validator:", y), y.length && f.message !== void 0 && f.message !== null && (y = [].concat(f.message));
          var R = y.map(qs(f, o));
          if (s.first && R.length)
            return g[f.field] = 1, p(R);
          if (!S)
            p(R);
          else {
            if (f.required && !h.value)
              return f.message !== void 0 ? R = [].concat(f.message).map(qs(f, o)) : s.error && (R = [s.error(f, He(s.messages.required, f.field))]), p(R);
            var T = {};
            f.defaultField && Object.keys(h.value).map(function(F) {
              T[F] = f.defaultField;
            }), T = O(O({}, T), h.rule.fields);
            var M = {};
            Object.keys(T).forEach(function(F) {
              var A = T[F], I = Array.isArray(A) ? A : [A];
              M[F] = I.map(m.bind(null, F));
            });
            var j = new e(M);
            j.messages(s.messages), h.rule.options && (h.rule.options.messages = s.messages, h.rule.options.error = s.error), j.validate(h.value, h.rule.options || s, function(F) {
              var A = [];
              R && R.length && A.push.apply(A, W(R)), F && F.length && A.push.apply(A, W(F)), p(A.length ? A : null);
            });
          }
        }
        var P;
        if (f.asyncValidator)
          P = f.asyncValidator(f, h.value, _, h.source, s);
        else if (f.validator) {
          try {
            P = f.validator(f, h.value, _, h.source, s);
          } catch (E) {
            var C, $;
            (C = ($ = console).error) === null || C === void 0 || C.call($, E), s.suppressValidatorError || setTimeout(function() {
              throw E;
            }, 0), _(E.message);
          }
          P === !0 ? _() : P === !1 ? _(typeof f.message == "function" ? f.message(f.fullField || f.field) : f.message || "".concat(f.fullField || f.field, " fails")) : P instanceof Array ? _(P) : P instanceof Error && _(P.message);
        }
        P && P.then && P.then(function() {
          return _();
        }, function(E) {
          return _(E);
        });
      }, function(h) {
        c(h);
      }, o);
    }
  }, {
    key: "getType",
    value: function(r) {
      if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !Gr.hasOwnProperty(r.type))
        throw new Error(He("Unknown rule type %s", r.type));
      return r.type || "string";
    }
  }, {
    key: "getValidationMethod",
    value: function(r) {
      if (typeof r.validator == "function")
        return r.validator;
      var n = Object.keys(r), a = n.indexOf("message");
      return a !== -1 && n.splice(a, 1), n.length === 1 && n[0] === "required" ? Gr.required : Gr[this.getType(r)] || void 0;
    }
  }]), e;
})();
x(cn, "register", function(t, r) {
  if (typeof r != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  Gr[t] = r;
});
x(cn, "warning", nu);
x(cn, "messages", fi);
x(cn, "validators", Gr);
var Le = "'${name}' is not a valid ${type}", iu = {
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
    string: Le,
    method: Le,
    array: Le,
    object: Le,
    number: Le,
    date: Le,
    boolean: Le,
    integer: Le,
    float: Le,
    regexp: Le,
    email: Le,
    url: Le,
    hex: Le
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
}, Ws = cn;
function gm(e, t) {
  return e.replace(/\\?\$\{\w+\}/g, function(r) {
    if (r.startsWith("\\"))
      return r.slice(1);
    var n = r.slice(2, -1);
    return t[n];
  });
}
var Us = "CODE_LOGIC_ERROR";
function hi(e, t, r, n, a) {
  return mi.apply(this, arguments);
}
function mi() {
  return mi = ln(/* @__PURE__ */ Ye().mark(function e(t, r, n, a, i) {
    var o, s, l, c, u, d, v, g, h;
    return Ye().wrap(function(f) {
      for (; ; ) switch (f.prev = f.next) {
        case 0:
          return o = O({}, n), delete o.ruleIndex, Ws.warning = function() {
          }, o.validator && (s = o.validator, o.validator = function() {
            try {
              return s.apply(void 0, arguments);
            } catch (S) {
              return console.error(S), Promise.reject(Us);
            }
          }), l = null, o && o.type === "array" && o.defaultField && (l = o.defaultField, delete o.defaultField), c = new Ws(x({}, t, [o])), u = Nt(iu, a.validateMessages), c.messages(u), d = [], f.prev = 10, f.next = 13, Promise.resolve(c.validate(x({}, t, r), O({}, a)));
        case 13:
          f.next = 18;
          break;
        case 15:
          f.prev = 15, f.t0 = f.catch(10), f.t0.errors && (d = f.t0.errors.map(function(S, m) {
            var _ = S.message, P = _ === Us ? u.default : _;
            return /* @__PURE__ */ b.isValidElement(P) ? (
              // Wrap ReactNode with `key`
              /* @__PURE__ */ b.cloneElement(P, {
                key: "error_".concat(m)
              })
            ) : P;
          }));
        case 18:
          if (!(!d.length && l && Array.isArray(r) && r.length > 0)) {
            f.next = 23;
            break;
          }
          return f.next = 21, Promise.all(r.map(function(S, m) {
            return hi("".concat(t, ".").concat(m), S, l, a, i);
          }));
        case 21:
          return v = f.sent, f.abrupt("return", v.reduce(function(S, m) {
            return [].concat(W(S), W(m));
          }, []));
        case 23:
          return g = O(O({}, n), {}, {
            name: t,
            enum: (n.enum || []).join(", ")
          }, i), h = d.map(function(S) {
            return typeof S == "string" ? gm(S, g) : S;
          }), f.abrupt("return", h);
        case 26:
        case "end":
          return f.stop();
      }
    }, e, null, [[10, 15]]);
  })), mi.apply(this, arguments);
}
function bm(e, t, r, n, a, i) {
  var o = e.join("."), s = r.map(function(u, d) {
    var v = u.validator, g = O(O({}, u), {}, {
      ruleIndex: d
    });
    return v && (g.validator = function(h, p, f) {
      var S = !1, m = function() {
        for (var C = arguments.length, $ = new Array(C), E = 0; E < C; E++)
          $[E] = arguments[E];
        Promise.resolve().then(function() {
          me(!S, "Your validator function has already return a promise. `callback` will be ignored."), S || f.apply(void 0, $);
        });
      }, _ = v(h, p, m);
      S = _ && typeof _.then == "function" && typeof _.catch == "function", me(S, "`callback` is deprecated. Please return a promise instead."), S && _.then(function() {
        f();
      }).catch(function(P) {
        f(P || " ");
      });
    }), g;
  }).sort(function(u, d) {
    var v = u.warningOnly, g = u.ruleIndex, h = d.warningOnly, p = d.ruleIndex;
    return !!v == !!h ? g - p : v ? 1 : -1;
  }), l;
  if (a === !0)
    l = new Promise(/* @__PURE__ */ (function() {
      var u = ln(/* @__PURE__ */ Ye().mark(function d(v, g) {
        var h, p, f;
        return Ye().wrap(function(m) {
          for (; ; ) switch (m.prev = m.next) {
            case 0:
              h = 0;
            case 1:
              if (!(h < s.length)) {
                m.next = 12;
                break;
              }
              return p = s[h], m.next = 5, hi(o, t, p, n, i);
            case 5:
              if (f = m.sent, !f.length) {
                m.next = 9;
                break;
              }
              return g([{
                errors: f,
                rule: p
              }]), m.abrupt("return");
            case 9:
              h += 1, m.next = 1;
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
    })());
  else {
    var c = s.map(function(u) {
      return hi(o, t, u, n, i).then(function(d) {
        return {
          errors: d,
          rule: u
        };
      });
    });
    l = (a ? Sm(c) : ym(c)).then(function(u) {
      return Promise.reject(u);
    });
  }
  return l.catch(function(u) {
    return u;
  }), l;
}
function ym(e) {
  return gi.apply(this, arguments);
}
function gi() {
  return gi = ln(/* @__PURE__ */ Ye().mark(function e(t) {
    return Ye().wrap(function(n) {
      for (; ; ) switch (n.prev = n.next) {
        case 0:
          return n.abrupt("return", Promise.all(t).then(function(a) {
            var i, o = (i = []).concat.apply(i, W(a));
            return o;
          }));
        case 1:
        case "end":
          return n.stop();
      }
    }, e);
  })), gi.apply(this, arguments);
}
function Sm(e) {
  return bi.apply(this, arguments);
}
function bi() {
  return bi = ln(/* @__PURE__ */ Ye().mark(function e(t) {
    var r;
    return Ye().wrap(function(a) {
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
  })), bi.apply(this, arguments);
}
function Ce(e) {
  return ui(e);
}
function Ys(e, t) {
  var r = {};
  return t.forEach(function(n) {
    var a = it(e, n);
    r = Ke(r, n, a);
  }), r;
}
function Vt(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return e && e.some(function(n) {
    return ou(t, n, r);
  });
}
function ou(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return !e || !t || !r && e.length !== t.length ? !1 : t.every(function(n, a) {
    return e[a] === n;
  });
}
function xm(e, t) {
  if (e === t)
    return !0;
  if (!e && t || e && !t || !e || !t || G(e) !== "object" || G(t) !== "object")
    return !1;
  var r = Object.keys(e), n = Object.keys(t), a = new Set([].concat(r, n));
  return W(a).every(function(i) {
    var o = e[i], s = t[i];
    return typeof o == "function" && typeof s == "function" ? !0 : o === s;
  });
}
function Em(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && G(t.target) === "object" && e in t.target ? t.target[e] : t;
}
function Gs(e, t, r) {
  var n = e.length;
  if (t < 0 || t >= n || r < 0 || r >= n)
    return e;
  var a = e[t], i = t - r;
  return i > 0 ? [].concat(W(e.slice(0, r)), [a], W(e.slice(r, t)), W(e.slice(t + 1, n))) : i < 0 ? [].concat(W(e.slice(0, t)), W(e.slice(t + 1, r + 1)), [a], W(e.slice(r + 1, n))) : e;
}
var Cm = ["name"], Be = [];
function $a(e, t, r, n, a, i) {
  return typeof e == "function" ? e(t, r, "source" in i ? {
    source: i.source
  } : {}) : n !== a;
}
var Di = /* @__PURE__ */ (function(e) {
  wt(r, e);
  var t = Pt(r);
  function r(n) {
    var a;
    if (ke(this, r), a = t.call(this, n), x(J(a), "state", {
      resetCount: 0
    }), x(J(a), "cancelRegisterFunc", null), x(J(a), "mounted", !1), x(J(a), "touched", !1), x(J(a), "dirty", !1), x(J(a), "validatePromise", void 0), x(J(a), "prevValidating", void 0), x(J(a), "errors", Be), x(J(a), "warnings", Be), x(J(a), "cancelRegister", function() {
      var l = a.props, c = l.preserve, u = l.isListField, d = l.name;
      a.cancelRegisterFunc && a.cancelRegisterFunc(u, c, Ce(d)), a.cancelRegisterFunc = null;
    }), x(J(a), "getNamePath", function() {
      var l = a.props, c = l.name, u = l.fieldContext, d = u.prefixName, v = d === void 0 ? [] : d;
      return c !== void 0 ? [].concat(W(v), W(c)) : [];
    }), x(J(a), "getRules", function() {
      var l = a.props, c = l.rules, u = c === void 0 ? [] : c, d = l.fieldContext;
      return u.map(function(v) {
        return typeof v == "function" ? v(d) : v;
      });
    }), x(J(a), "refresh", function() {
      a.mounted && a.setState(function(l) {
        var c = l.resetCount;
        return {
          resetCount: c + 1
        };
      });
    }), x(J(a), "metaCache", null), x(J(a), "triggerMetaEvent", function(l) {
      var c = a.props.onMetaChange;
      if (c) {
        var u = O(O({}, a.getMeta()), {}, {
          destroy: l
        });
        Fa(a.metaCache, u) || c(u), a.metaCache = u;
      } else
        a.metaCache = null;
    }), x(J(a), "onStoreChange", function(l, c, u) {
      var d = a.props, v = d.shouldUpdate, g = d.dependencies, h = g === void 0 ? [] : g, p = d.onReset, f = u.store, S = a.getNamePath(), m = a.getValue(l), _ = a.getValue(f), P = c && Vt(c, S);
      switch (u.type === "valueUpdate" && u.source === "external" && !Fa(m, _) && (a.touched = !0, a.dirty = !0, a.validatePromise = null, a.errors = Be, a.warnings = Be, a.triggerMetaEvent()), u.type) {
        case "reset":
          if (!c || P) {
            a.touched = !1, a.dirty = !1, a.validatePromise = void 0, a.errors = Be, a.warnings = Be, a.triggerMetaEvent(), p == null || p(), a.refresh();
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
          if (v && $a(v, l, f, m, _, u)) {
            a.reRender();
            return;
          }
          break;
        }
        case "setField": {
          var C = u.data;
          if (P) {
            "touched" in C && (a.touched = C.touched), "validating" in C && !("originRCField" in C) && (a.validatePromise = C.validating ? Promise.resolve([]) : null), "errors" in C && (a.errors = C.errors || Be), "warnings" in C && (a.warnings = C.warnings || Be), a.dirty = !0, a.triggerMetaEvent(), a.reRender();
            return;
          } else if ("value" in C && Vt(c, S, !0)) {
            a.reRender();
            return;
          }
          if (v && !S.length && $a(v, l, f, m, _, u)) {
            a.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var $ = h.map(Ce);
          if ($.some(function(E) {
            return Vt(u.relatedFields, E);
          })) {
            a.reRender();
            return;
          }
          break;
        }
        default:
          if (P || (!h.length || S.length || v) && $a(v, l, f, m, _, u)) {
            a.reRender();
            return;
          }
          break;
      }
      v === !0 && a.reRender();
    }), x(J(a), "validateRules", function(l) {
      var c = a.getNamePath(), u = a.getValue(), d = l || {}, v = d.triggerName, g = d.validateOnly, h = g === void 0 ? !1 : g, p = Promise.resolve().then(/* @__PURE__ */ ln(/* @__PURE__ */ Ye().mark(function f() {
        var S, m, _, P, C, $, E;
        return Ye().wrap(function(R) {
          for (; ; ) switch (R.prev = R.next) {
            case 0:
              if (a.mounted) {
                R.next = 2;
                break;
              }
              return R.abrupt("return", []);
            case 2:
              if (S = a.props, m = S.validateFirst, _ = m === void 0 ? !1 : m, P = S.messageVariables, C = S.validateDebounce, $ = a.getRules(), v && ($ = $.filter(function(T) {
                return T;
              }).filter(function(T) {
                var M = T.validateTrigger;
                if (!M)
                  return !0;
                var j = ui(M);
                return j.includes(v);
              })), !(C && v)) {
                R.next = 10;
                break;
              }
              return R.next = 8, new Promise(function(T) {
                setTimeout(T, C);
              });
            case 8:
              if (a.validatePromise === p) {
                R.next = 10;
                break;
              }
              return R.abrupt("return", []);
            case 10:
              return E = bm(c, u, $, l, _, P), E.catch(function(T) {
                return T;
              }).then(function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Be;
                if (a.validatePromise === p) {
                  var M;
                  a.validatePromise = null;
                  var j = [], F = [];
                  (M = T.forEach) === null || M === void 0 || M.call(T, function(A) {
                    var I = A.rule.warningOnly, k = A.errors, D = k === void 0 ? Be : k;
                    I ? F.push.apply(F, W(D)) : j.push.apply(j, W(D));
                  }), a.errors = j, a.warnings = F, a.triggerMetaEvent(), a.reRender();
                }
              }), R.abrupt("return", E);
            case 13:
            case "end":
              return R.stop();
          }
        }, f);
      })));
      return h || (a.validatePromise = p, a.dirty = !0, a.errors = Be, a.warnings = Be, a.triggerMetaEvent(), a.reRender()), p;
    }), x(J(a), "isFieldValidating", function() {
      return !!a.validatePromise;
    }), x(J(a), "isFieldTouched", function() {
      return a.touched;
    }), x(J(a), "isFieldDirty", function() {
      if (a.dirty || a.props.initialValue !== void 0)
        return !0;
      var l = a.props.fieldContext, c = l.getInternalHooks(yt), u = c.getInitialValue;
      return u(a.getNamePath()) !== void 0;
    }), x(J(a), "getErrors", function() {
      return a.errors;
    }), x(J(a), "getWarnings", function() {
      return a.warnings;
    }), x(J(a), "isListField", function() {
      return a.props.isListField;
    }), x(J(a), "isList", function() {
      return a.props.isList;
    }), x(J(a), "isPreserve", function() {
      return a.props.preserve;
    }), x(J(a), "getMeta", function() {
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
    }), x(J(a), "getOnlyChild", function(l) {
      if (typeof l == "function") {
        var c = a.getMeta();
        return O(O({}, a.getOnlyChild(l(a.getControlled(), c, a.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var u = Vn(l);
      return u.length !== 1 || !/* @__PURE__ */ b.isValidElement(u[0]) ? {
        child: u,
        isFunction: !1
      } : {
        child: u[0],
        isFunction: !1
      };
    }), x(J(a), "getValue", function(l) {
      var c = a.props.fieldContext.getFieldsValue, u = a.getNamePath();
      return it(l || c(!0), u);
    }), x(J(a), "getControlled", function() {
      var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, c = a.props, u = c.name, d = c.trigger, v = c.validateTrigger, g = c.getValueFromEvent, h = c.normalize, p = c.valuePropName, f = c.getValueProps, S = c.fieldContext, m = v !== void 0 ? v : S.validateTrigger, _ = a.getNamePath(), P = S.getInternalHooks, C = S.getFieldsValue, $ = P(yt), E = $.dispatch, y = a.getValue(), R = f || function(A) {
        return x({}, p, A);
      }, T = l[d], M = u !== void 0 ? R(y) : {};
      process.env.NODE_ENV !== "production" && M && Object.keys(M).forEach(function(A) {
        me(typeof M[A] != "function", "It's not recommended to generate dynamic function prop by `getValueProps`. Please pass it to child component directly (prop: ".concat(A, ")"));
      });
      var j = O(O({}, l), M);
      j[d] = function() {
        a.touched = !0, a.dirty = !0, a.triggerMetaEvent();
        for (var A, I = arguments.length, k = new Array(I), D = 0; D < I; D++)
          k[D] = arguments[D];
        g ? A = g.apply(void 0, k) : A = Em.apply(void 0, [p].concat(k)), h && (A = h(A, y, C(!0))), A !== y && E({
          type: "updateValue",
          namePath: _,
          value: A
        }), T && T.apply(void 0, k);
      };
      var F = ui(m || []);
      return F.forEach(function(A) {
        var I = j[A];
        j[A] = function() {
          I && I.apply(void 0, arguments);
          var k = a.props.rules;
          k && k.length && E({
            type: "validateField",
            namePath: _,
            triggerName: A
          });
        };
      }), j;
    }), n.fieldContext) {
      var i = n.fieldContext.getInternalHooks, o = i(yt), s = o.initEntityValue;
      s(J(a));
    }
    return a;
  }
  return Ie(r, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props, i = a.shouldUpdate, o = a.fieldContext;
      if (this.mounted = !0, o) {
        var s = o.getInternalHooks, l = s(yt), c = l.registerField;
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
      return l ? c = s : /* @__PURE__ */ b.isValidElement(s) ? c = /* @__PURE__ */ b.cloneElement(s, this.getControlled(s.props)) : (me(!s, "`children` of Field is not validate ReactElement."), c = s), /* @__PURE__ */ b.createElement(b.Fragment, {
        key: a
      }, c);
    }
  }]), r;
})(b.Component);
x(Di, "contextType", Ut);
x(Di, "defaultProps", {
  trigger: "onChange",
  valuePropName: "value"
});
function su(e) {
  var t, r = e.name, n = We(e, Cm), a = b.useContext(Ut), i = b.useContext(qn), o = r !== void 0 ? Ce(r) : void 0, s = (t = n.isListField) !== null && t !== void 0 ? t : !!i, l = "keep";
  return s || (l = "_".concat((o || []).join("_"))), process.env.NODE_ENV !== "production" && n.preserve === !1 && s && o.length <= 1 && me(!1, "`preserve` should not apply on Form.List fields."), /* @__PURE__ */ b.createElement(Di, De({
    key: l,
    name: o,
    isListField: s
  }, n, {
    fieldContext: a
  }));
}
function _m(e) {
  var t = e.name, r = e.initialValue, n = e.children, a = e.rules, i = e.validateTrigger, o = e.isListField, s = b.useContext(Ut), l = b.useContext(qn), c = b.useRef({
    keys: [],
    id: 0
  }), u = c.current, d = b.useMemo(function() {
    var p = Ce(s.prefixName) || [];
    return [].concat(W(p), W(Ce(t)));
  }, [s.prefixName, t]), v = b.useMemo(function() {
    return O(O({}, s), {}, {
      prefixName: d
    });
  }, [s, d]), g = b.useMemo(function() {
    return {
      getKey: function(f) {
        var S = d.length, m = f[S];
        return [u.keys[m], f.slice(S + 1)];
      }
    };
  }, [d]);
  if (typeof n != "function")
    return me(!1, "Form.List only accepts function as children."), null;
  var h = function(f, S, m) {
    var _ = m.source;
    return _ === "internal" ? !1 : f !== S;
  };
  return /* @__PURE__ */ b.createElement(qn.Provider, {
    value: g
  }, /* @__PURE__ */ b.createElement(Ut.Provider, {
    value: v
  }, /* @__PURE__ */ b.createElement(su, {
    name: [],
    shouldUpdate: h,
    rules: a,
    validateTrigger: i,
    initialValue: r,
    isList: !0,
    isListField: o ?? !!l
  }, function(p, f) {
    var S = p.value, m = S === void 0 ? [] : S, _ = p.onChange, P = s.getFieldValue, C = function() {
      var R = P(d || []);
      return R || [];
    }, $ = {
      add: function(R, T) {
        var M = C();
        T >= 0 && T <= M.length ? (u.keys = [].concat(W(u.keys.slice(0, T)), [u.id], W(u.keys.slice(T))), _([].concat(W(M.slice(0, T)), [R], W(M.slice(T))))) : (process.env.NODE_ENV !== "production" && (T < 0 || T > M.length) && me(!1, "The second parameter of the add function should be a valid positive number."), u.keys = [].concat(W(u.keys), [u.id]), _([].concat(W(M), [R]))), u.id += 1;
      },
      remove: function(R) {
        var T = C(), M = new Set(Array.isArray(R) ? R : [R]);
        M.size <= 0 || (u.keys = u.keys.filter(function(j, F) {
          return !M.has(F);
        }), _(T.filter(function(j, F) {
          return !M.has(F);
        })));
      },
      move: function(R, T) {
        if (R !== T) {
          var M = C();
          R < 0 || R >= M.length || T < 0 || T >= M.length || (u.keys = Gs(u.keys, R, T), _(Gs(M, R, T)));
        }
      }
    }, E = m || [];
    return Array.isArray(E) || (E = [], process.env.NODE_ENV !== "production" && me(!1, "Current value of '".concat(d.join(" > "), "' is not an array type."))), n(E.map(function(y, R) {
      var T = u.keys[R];
      return T === void 0 && (u.keys[R] = u.id, T = u.keys[R], u.id += 1), {
        name: R,
        key: T,
        isListField: !0
      };
    }), $, f);
  })));
}
function $m(e) {
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
var lu = "__@field_split__";
function wa(e) {
  return e.map(function(t) {
    return "".concat(G(t), ":").concat(t);
  }).join(lu);
}
var jt = /* @__PURE__ */ (function() {
  function e() {
    ke(this, e), x(this, "kvs", /* @__PURE__ */ new Map());
  }
  return Ie(e, [{
    key: "set",
    value: function(r, n) {
      this.kvs.set(wa(r), n);
    }
  }, {
    key: "get",
    value: function(r) {
      return this.kvs.get(wa(r));
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
      this.kvs.delete(wa(r));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(r) {
      return W(this.kvs.entries()).map(function(n) {
        var a = q(n, 2), i = a[0], o = a[1], s = i.split(lu);
        return r({
          key: s.map(function(l) {
            var c = l.match(/^([^:]*):(.*)$/), u = q(c, 3), d = u[1], v = u[2];
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
})(), wm = ["name"], Pm = /* @__PURE__ */ Ie(function e(t) {
  var r = this;
  ke(this, e), x(this, "formHooked", !1), x(this, "forceRootUpdate", void 0), x(this, "subscribable", !0), x(this, "store", {}), x(this, "fieldEntities", []), x(this, "initialValues", {}), x(this, "callbacks", {}), x(this, "validateMessages", null), x(this, "preserve", null), x(this, "lastValidatePromise", null), x(this, "getForm", function() {
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
  }), x(this, "getInternalHooks", function(n) {
    return n === yt ? (r.formHooked = !0, {
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
    }) : (me(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }), x(this, "useSubscribe", function(n) {
    r.subscribable = n;
  }), x(this, "prevWithoutPreserves", null), x(this, "setInitialValues", function(n, a) {
    if (r.initialValues = n || {}, a) {
      var i, o = Nt(n, r.store);
      (i = r.prevWithoutPreserves) === null || i === void 0 || i.map(function(s) {
        var l = s.key;
        o = Ke(o, l, it(n, l));
      }), r.prevWithoutPreserves = null, r.updateStore(o);
    }
  }), x(this, "destroyForm", function(n) {
    if (n)
      r.updateStore({});
    else {
      var a = new jt();
      r.getFieldEntities(!0).forEach(function(i) {
        r.isMergedPreserve(i.isPreserve()) || a.set(i.getNamePath(), !0);
      }), r.prevWithoutPreserves = a;
    }
  }), x(this, "getInitialValue", function(n) {
    var a = it(r.initialValues, n);
    return n.length ? Nt(a) : a;
  }), x(this, "setCallbacks", function(n) {
    r.callbacks = n;
  }), x(this, "setValidateMessages", function(n) {
    r.validateMessages = n;
  }), x(this, "setPreserve", function(n) {
    r.preserve = n;
  }), x(this, "watchList", []), x(this, "registerWatch", function(n) {
    return r.watchList.push(n), function() {
      r.watchList = r.watchList.filter(function(a) {
        return a !== n;
      });
    };
  }), x(this, "notifyWatch", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (r.watchList.length) {
      var a = r.getFieldsValue(), i = r.getFieldsValue(!0);
      r.watchList.forEach(function(o) {
        o(a, i, n);
      });
    }
  }), x(this, "timeoutId", null), x(this, "warningUnhooked", function() {
    process.env.NODE_ENV !== "production" && !r.timeoutId && typeof window < "u" && (r.timeoutId = setTimeout(function() {
      r.timeoutId = null, r.formHooked || me(!1, "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?");
    }));
  }), x(this, "updateStore", function(n) {
    r.store = n;
  }), x(this, "getFieldEntities", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    return n ? r.fieldEntities.filter(function(a) {
      return a.getNamePath().length;
    }) : r.fieldEntities;
  }), x(this, "getFieldsMap", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, a = new jt();
    return r.getFieldEntities(n).forEach(function(i) {
      var o = i.getNamePath();
      a.set(o, i);
    }), a;
  }), x(this, "getFieldEntitiesForNamePathList", function(n) {
    if (!n)
      return r.getFieldEntities(!0);
    var a = r.getFieldsMap(!0);
    return n.map(function(i) {
      var o = Ce(i);
      return a.get(o) || {
        INVALIDATE_NAME_PATH: Ce(i)
      };
    });
  }), x(this, "getFieldsValue", function(n, a) {
    r.warningUnhooked();
    var i, o, s;
    if (n === !0 || Array.isArray(n) ? (i = n, o = a) : n && G(n) === "object" && (s = n.strict, o = n.filter), i === !0 && !o)
      return r.store;
    var l = r.getFieldEntitiesForNamePathList(Array.isArray(i) ? i : null), c = [];
    return l.forEach(function(u) {
      var d, v, g = "INVALIDATE_NAME_PATH" in u ? u.INVALIDATE_NAME_PATH : u.getNamePath();
      if (s) {
        var h, p;
        if ((h = (p = u).isList) !== null && h !== void 0 && h.call(p))
          return;
      } else if (!i && (d = (v = u).isListField) !== null && d !== void 0 && d.call(v))
        return;
      if (!o)
        c.push(g);
      else {
        var f = "getMeta" in u ? u.getMeta() : null;
        o(f) && c.push(g);
      }
    }), Ys(r.store, c.map(Ce));
  }), x(this, "getFieldValue", function(n) {
    r.warningUnhooked();
    var a = Ce(n);
    return it(r.store, a);
  }), x(this, "getFieldsError", function(n) {
    r.warningUnhooked();
    var a = r.getFieldEntitiesForNamePathList(n);
    return a.map(function(i, o) {
      return i && !("INVALIDATE_NAME_PATH" in i) ? {
        name: i.getNamePath(),
        errors: i.getErrors(),
        warnings: i.getWarnings()
      } : {
        name: Ce(n[o]),
        errors: [],
        warnings: []
      };
    });
  }), x(this, "getFieldError", function(n) {
    r.warningUnhooked();
    var a = Ce(n), i = r.getFieldsError([a])[0];
    return i.errors;
  }), x(this, "getFieldWarning", function(n) {
    r.warningUnhooked();
    var a = Ce(n), i = r.getFieldsError([a])[0];
    return i.warnings;
  }), x(this, "isFieldsTouched", function() {
    r.warningUnhooked();
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a[0], s = a[1], l, c = !1;
    a.length === 0 ? l = null : a.length === 1 ? Array.isArray(o) ? (l = o.map(Ce), c = !1) : (l = null, c = o) : (l = o.map(Ce), c = s);
    var u = r.getFieldEntities(!0), d = function(f) {
      return f.isFieldTouched();
    };
    if (!l)
      return c ? u.every(function(p) {
        return d(p) || p.isList();
      }) : u.some(d);
    var v = new jt();
    l.forEach(function(p) {
      v.set(p, []);
    }), u.forEach(function(p) {
      var f = p.getNamePath();
      l.forEach(function(S) {
        S.every(function(m, _) {
          return f[_] === m;
        }) && v.update(S, function(m) {
          return [].concat(W(m), [p]);
        });
      });
    });
    var g = function(f) {
      return f.some(d);
    }, h = v.map(function(p) {
      var f = p.value;
      return f;
    });
    return c ? h.every(g) : h.some(g);
  }), x(this, "isFieldTouched", function(n) {
    return r.warningUnhooked(), r.isFieldsTouched([n]);
  }), x(this, "isFieldsValidating", function(n) {
    r.warningUnhooked();
    var a = r.getFieldEntities();
    if (!n)
      return a.some(function(o) {
        return o.isFieldValidating();
      });
    var i = n.map(Ce);
    return a.some(function(o) {
      var s = o.getNamePath();
      return Vt(i, s) && o.isFieldValidating();
    });
  }), x(this, "isFieldValidating", function(n) {
    return r.warningUnhooked(), r.isFieldsValidating([n]);
  }), x(this, "resetWithFieldInitialValue", function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = new jt(), i = r.getFieldEntities(!0);
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
          var v = u.getNamePath(), g = r.getInitialValue(v);
          if (g !== void 0)
            me(!1, "Form already set 'initialValues' with path '".concat(v.join("."), "'. Field can not overwrite it."));
          else {
            var h = a.get(v);
            if (h && h.size > 1)
              me(!1, "Multiple Field with path '".concat(v.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (h) {
              var p = r.getFieldValue(v), f = u.isListField();
              !f && (!n.skipExist || p === void 0) && r.updateStore(Ke(r.store, v, W(h)[0].value));
            }
          }
        }
      });
    }, s;
    n.entities ? s = n.entities : n.namePathList ? (s = [], n.namePathList.forEach(function(l) {
      var c = a.get(l);
      if (c) {
        var u;
        (u = s).push.apply(u, W(W(c).map(function(d) {
          return d.entity;
        })));
      }
    })) : s = i, o(s);
  }), x(this, "resetFields", function(n) {
    r.warningUnhooked();
    var a = r.store;
    if (!n) {
      r.updateStore(Nt(r.initialValues)), r.resetWithFieldInitialValue(), r.notifyObservers(a, null, {
        type: "reset"
      }), r.notifyWatch();
      return;
    }
    var i = n.map(Ce);
    i.forEach(function(o) {
      var s = r.getInitialValue(o);
      r.updateStore(Ke(r.store, o, s));
    }), r.resetWithFieldInitialValue({
      namePathList: i
    }), r.notifyObservers(a, i, {
      type: "reset"
    }), r.notifyWatch(i);
  }), x(this, "setFields", function(n) {
    r.warningUnhooked();
    var a = r.store, i = [];
    n.forEach(function(o) {
      var s = o.name, l = We(o, wm), c = Ce(s);
      i.push(c), "value" in l && r.updateStore(Ke(r.store, c, l.value)), r.notifyObservers(a, [c], {
        type: "setField",
        data: o
      });
    }), r.notifyWatch(i);
  }), x(this, "getFields", function() {
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
  }), x(this, "initEntityValue", function(n) {
    var a = n.props.initialValue;
    if (a !== void 0) {
      var i = n.getNamePath(), o = it(r.store, i);
      o === void 0 && r.updateStore(Ke(r.store, i, a));
    }
  }), x(this, "isMergedPreserve", function(n) {
    var a = n !== void 0 ? n : r.preserve;
    return a ?? !0;
  }), x(this, "registerField", function(n) {
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
            !ou(d.getNamePath(), a)
          );
        })) {
          var u = r.store;
          r.updateStore(Ke(u, a, c, !0)), r.notifyObservers(u, [a], {
            type: "remove"
          }), r.triggerDependenciesUpdate(u, a);
        }
      }
      r.notifyWatch([a]);
    };
  }), x(this, "dispatch", function(n) {
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
  }), x(this, "notifyObservers", function(n, a, i) {
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
  }), x(this, "triggerDependenciesUpdate", function(n, a) {
    var i = r.getDependencyChildrenFields(a);
    return i.length && r.validateFields(i), r.notifyObservers(n, i, {
      type: "dependenciesUpdate",
      relatedFields: [a].concat(W(i))
    }), i;
  }), x(this, "updateValue", function(n, a) {
    var i = Ce(n), o = r.store;
    r.updateStore(Ke(r.store, i, a)), r.notifyObservers(o, [i], {
      type: "valueUpdate",
      source: "internal"
    }), r.notifyWatch([i]);
    var s = r.triggerDependenciesUpdate(o, i), l = r.callbacks.onValuesChange;
    if (l) {
      var c = Ys(r.store, [i]);
      l(c, r.getFieldsValue());
    }
    r.triggerOnFieldsChange([i].concat(W(s)));
  }), x(this, "setFieldsValue", function(n) {
    r.warningUnhooked();
    var a = r.store;
    if (n) {
      var i = Nt(r.store, n);
      r.updateStore(i);
    }
    r.notifyObservers(a, null, {
      type: "valueUpdate",
      source: "external"
    }), r.notifyWatch();
  }), x(this, "setFieldValue", function(n, a) {
    r.setFields([{
      name: n,
      value: a,
      errors: [],
      warnings: []
    }]);
  }), x(this, "getDependencyChildrenFields", function(n) {
    var a = /* @__PURE__ */ new Set(), i = [], o = new jt();
    r.getFieldEntities().forEach(function(l) {
      var c = l.props.dependencies;
      (c || []).forEach(function(u) {
        var d = Ce(u);
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
  }), x(this, "triggerOnFieldsChange", function(n, a) {
    var i = r.callbacks.onFieldsChange;
    if (i) {
      var o = r.getFields();
      if (a) {
        var s = new jt();
        a.forEach(function(c) {
          var u = c.name, d = c.errors;
          s.set(u, d);
        }), o.forEach(function(c) {
          c.errors = s.get(c.name) || c.errors;
        });
      }
      var l = o.filter(function(c) {
        var u = c.name;
        return Vt(n, u);
      });
      l.length && i(l, o);
    }
  }), x(this, "validateFields", function(n, a) {
    r.warningUnhooked();
    var i, o;
    Array.isArray(n) || typeof n == "string" || typeof a == "string" ? (i = n, o = a) : o = n;
    var s = !!i, l = s ? i.map(Ce) : [], c = [], u = String(Date.now()), d = /* @__PURE__ */ new Set(), v = o || {}, g = v.recursive, h = v.dirty;
    r.getFieldEntities(!0).forEach(function(m) {
      if (s || l.push(m.getNamePath()), !(!m.props.rules || !m.props.rules.length) && !(h && !m.isFieldDirty())) {
        var _ = m.getNamePath();
        if (d.add(_.join(u)), !s || Vt(l, _, g)) {
          var P = m.validateRules(O({
            validateMessages: O(O({}, iu), r.validateMessages)
          }, o));
          c.push(P.then(function() {
            return {
              name: _,
              errors: [],
              warnings: []
            };
          }).catch(function(C) {
            var $, E = [], y = [];
            return ($ = C.forEach) === null || $ === void 0 || $.call(C, function(R) {
              var T = R.rule.warningOnly, M = R.errors;
              T ? y.push.apply(y, W(M)) : E.push.apply(E, W(M));
            }), E.length ? Promise.reject({
              name: _,
              errors: E,
              warnings: y
            }) : {
              name: _,
              errors: E,
              warnings: y
            };
          }));
        }
      }
    });
    var p = $m(c);
    r.lastValidatePromise = p, p.catch(function(m) {
      return m;
    }).then(function(m) {
      var _ = m.map(function(P) {
        var C = P.name;
        return C;
      });
      r.notifyObservers(r.store, _, {
        type: "validateFinish"
      }), r.triggerOnFieldsChange(_, m);
    });
    var f = p.then(function() {
      return r.lastValidatePromise === p ? Promise.resolve(r.getFieldsValue(l)) : Promise.reject([]);
    }).catch(function(m) {
      var _ = m.filter(function(P) {
        return P && P.errors.length;
      });
      return Promise.reject({
        values: r.getFieldsValue(l),
        errorFields: _,
        outOfDate: r.lastValidatePromise !== p
      });
    });
    f.catch(function(m) {
      return m;
    });
    var S = l.filter(function(m) {
      return d.has(m.join(u));
    });
    return r.triggerOnFieldsChange(S), f;
  }), x(this, "submit", function() {
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
function cu(e) {
  var t = b.useRef(), r = b.useState({}), n = q(r, 2), a = n[1];
  if (!t.current)
    if (e)
      t.current = e;
    else {
      var i = function() {
        a({});
      }, o = new Pm(i);
      t.current = o.getForm();
    }
  return [t.current];
}
var yi = /* @__PURE__ */ b.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), Rm = function(t) {
  var r = t.validateMessages, n = t.onFormChange, a = t.onFormFinish, i = t.children, o = b.useContext(yi), s = b.useRef({});
  return /* @__PURE__ */ b.createElement(yi.Provider, {
    value: O(O({}, o), {}, {
      validateMessages: O(O({}, o.validateMessages), r),
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
        c && (s.current = O(O({}, s.current), {}, x({}, c, u))), o.registerForm(c, u);
      },
      unregisterForm: function(c) {
        var u = O({}, s.current);
        delete u[c], s.current = u, o.unregisterForm(c);
      }
    })
  }, i);
}, Om = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed", "clearOnDestroy"], Tm = function(t, r) {
  var n = t.name, a = t.initialValues, i = t.fields, o = t.form, s = t.preserve, l = t.children, c = t.component, u = c === void 0 ? "form" : c, d = t.validateMessages, v = t.validateTrigger, g = v === void 0 ? "onChange" : v, h = t.onValuesChange, p = t.onFieldsChange, f = t.onFinish, S = t.onFinishFailed, m = t.clearOnDestroy, _ = We(t, Om), P = b.useRef(null), C = b.useContext(yi), $ = cu(o), E = q($, 1), y = E[0], R = y.getInternalHooks(yt), T = R.useSubscribe, M = R.setInitialValues, j = R.setCallbacks, F = R.setValidateMessages, A = R.setPreserve, I = R.destroyForm;
  b.useImperativeHandle(r, function() {
    return O(O({}, y), {}, {
      nativeElement: P.current
    });
  }), b.useEffect(function() {
    return C.registerForm(n, y), function() {
      C.unregisterForm(n);
    };
  }, [C, y, n]), F(O(O({}, C.validateMessages), d)), j({
    onValuesChange: h,
    onFieldsChange: function(z) {
      if (C.triggerFormChange(n, z), p) {
        for (var re = arguments.length, Q = new Array(re > 1 ? re - 1 : 0), Y = 1; Y < re; Y++)
          Q[Y - 1] = arguments[Y];
        p.apply(void 0, [z].concat(Q));
      }
    },
    onFinish: function(z) {
      C.triggerFormFinish(n, z), f && f(z);
    },
    onFinishFailed: S
  }), A(s);
  var k = b.useRef(null);
  M(a, !k.current), k.current || (k.current = !0), b.useEffect(
    function() {
      return function() {
        return I(m);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var D, H = typeof l == "function";
  if (H) {
    var K = y.getFieldsValue(!0);
    D = l(K, y);
  } else
    D = l;
  T(!H);
  var U = b.useRef();
  b.useEffect(function() {
    xm(U.current || [], i || []) || y.setFields(i || []), U.current = i;
  }, [i, y]);
  var w = b.useMemo(function() {
    return O(O({}, y), {}, {
      validateTrigger: g
    });
  }, [y, g]), N = /* @__PURE__ */ b.createElement(qn.Provider, {
    value: null
  }, /* @__PURE__ */ b.createElement(Ut.Provider, {
    value: w
  }, D));
  return u === !1 ? N : /* @__PURE__ */ b.createElement(u, De({}, _, {
    ref: P,
    onSubmit: function(z) {
      z.preventDefault(), z.stopPropagation(), y.submit();
    },
    onReset: function(z) {
      var re;
      z.preventDefault(), y.resetFields(), (re = _.onReset) === null || re === void 0 || re.call(_, z);
    }
  }), N);
};
function Ks(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
var Fm = process.env.NODE_ENV !== "production" ? function(e) {
  var t = e.join("__RC_FIELD_FORM_SPLIT__"), r = _e(t);
  me(r.current === t, "`useWatch` is not support dynamic `namePath`. Please provide static instead.");
} : function() {
};
function Am() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = t[0], a = t[1], i = a === void 0 ? {} : a, o = zh(i) ? {
    form: i
  } : i, s = o.form, l = Pa(), c = q(l, 2), u = c[0], d = c[1], v = ju(function() {
    return Ks(u);
  }, [u]), g = _e(v);
  g.current = v;
  var h = dt(Ut), p = s || h, f = p && p._init;
  process.env.NODE_ENV !== "production" && me(t.length === 2 ? s ? f : !0 : f, "useWatch requires a form instance since it can not auto detect from context.");
  var S = Ce(n), m = _e(S);
  return m.current = S, Fm(S), Ze(
    function() {
      if (f) {
        var _ = p.getFieldsValue, P = p.getInternalHooks, C = P(yt), $ = C.registerWatch, E = function(M, j) {
          var F = o.preserve ? j : M;
          return typeof n == "function" ? n(F) : it(F, m.current);
        }, y = $(function(T, M) {
          var j = E(T, M), F = Ks(j);
          g.current !== F && (g.current = F, d(j));
        }), R = E(_(), _(!0));
        return u !== R && d(R), y;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f]
  ), u;
}
var Mm = /* @__PURE__ */ b.forwardRef(Tm), un = Mm;
un.FormProvider = Rm;
un.Field = su;
un.List = _m;
un.useForm = cu;
un.useWatch = Am;
const on = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== "production" && (on.displayName = "FormItemInputContext");
const jm = ({
  children: e,
  status: t,
  override: r
}) => {
  const n = b.useContext(on), a = b.useMemo(() => {
    const i = Object.assign({}, n);
    return r && delete i.isFormItemInput, t && (delete i.status, delete i.hasFeedback, delete i.feedbackIcon), i;
  }, [t, r, n]);
  return /* @__PURE__ */ b.createElement(on.Provider, {
    value: a
  }, e);
}, Nm = /* @__PURE__ */ b.createContext(void 0), uu = (e, t, r = void 0) => {
  var n, a;
  const {
    variant: i,
    [e]: o
  } = b.useContext(mt), s = b.useContext(Nm), l = o == null ? void 0 : o.variant;
  let c;
  typeof t < "u" ? c = t : r === !1 ? c = "borderless" : c = (a = (n = s ?? l) !== null && n !== void 0 ? n : i) !== null && a !== void 0 ? a : "outlined";
  const u = wv.includes(c);
  return [c, u];
}, Xs = (e) => {
  const {
    space: t,
    form: r,
    children: n
  } = e;
  if (n == null)
    return null;
  let a = n;
  return r && (a = /* @__PURE__ */ B.createElement(jm, {
    override: !0,
    status: !0
  }, a)), t && (a = /* @__PURE__ */ B.createElement(Vp, null, a)), a;
};
function km(e, t) {
  const r = _e([]), n = () => {
    r.current.push(setTimeout(() => {
      var a, i, o, s;
      !((a = e.current) === null || a === void 0) && a.input && ((i = e.current) === null || i === void 0 ? void 0 : i.input.getAttribute("type")) === "password" && (!((o = e.current) === null || o === void 0) && o.input.hasAttribute("value")) && ((s = e.current) === null || s === void 0 || s.input.removeAttribute("value"));
    }));
  };
  return Ze(() => (n(), () => r.current.forEach((a) => {
    a && clearTimeout(a);
  })), []), n;
}
function Vi(e) {
  return Rt(e, {
    inputAffixPadding: e.paddingXXS
  });
}
const zi = (e) => {
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
    colorPrimaryHover: g,
    colorPrimary: h,
    controlOutlineWidth: p,
    controlOutline: f,
    colorErrorOutline: S,
    colorWarningOutline: m,
    colorBgContainer: _,
    inputFontSize: P,
    inputFontSizeLG: C,
    inputFontSizeSM: $
  } = e, E = P || r, y = $ || E, R = C || s, T = Math.round((t - E * n) / 2 * 10) / 10 - a, M = Math.round((i - y * n) / 2 * 10) / 10 - a, j = Math.ceil((o - R * l) / 2 * 10) / 10 - a;
  return {
    paddingBlock: Math.max(T, 0),
    paddingBlockSM: Math.max(M, 0),
    paddingBlockLG: Math.max(j, 0),
    paddingInline: c - a,
    paddingInlineSM: u - a,
    paddingInlineLG: d - a,
    addonBg: v,
    activeBorderColor: h,
    hoverBorderColor: g,
    activeShadow: `0 0 0 ${p}px ${f}`,
    errorActiveShadow: `0 0 0 ${p}px ${S}`,
    warningActiveShadow: `0 0 0 ${p}px ${m}`,
    hoverBg: _,
    activeBg: _,
    inputFontSize: E,
    inputFontSizeLG: R,
    inputFontSizeSM: y
  };
}, Im = (e) => ({
  borderColor: e.hoverBorderColor,
  backgroundColor: e.hoverBg
}), Li = (e) => ({
  color: e.colorTextDisabled,
  backgroundColor: e.colorBgContainerDisabled,
  borderColor: e.colorBorder,
  boxShadow: "none",
  cursor: "not-allowed",
  opacity: 1,
  "input[disabled], textarea[disabled]": {
    cursor: "not-allowed"
  },
  "&:hover:not([disabled])": Object.assign({}, Im(Rt(e, {
    hoverBorderColor: e.colorBorder,
    hoverBg: e.colorBgContainerDisabled
  })))
}), du = (e, t) => ({
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
}), Zs = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, du(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  }),
  [`&${e.componentCls}-status-${t.status}${e.componentCls}-disabled`]: {
    borderColor: t.borderColor
  }
}), Dm = (e, t) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, du(e, {
    borderColor: e.colorBorder,
    hoverBorderColor: e.hoverBorderColor,
    activeBorderColor: e.activeBorderColor,
    activeShadow: e.activeShadow
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, Li(e))
  }), Zs(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), Zs(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), t)
}), Js = (e, t) => ({
  [`&${e.componentCls}-group-wrapper-status-${t.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      borderColor: t.addonBorderColor,
      color: t.addonColor
    }
  }
}), Vm = (e) => ({
  "&-outlined": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group`]: {
      "&-addon": {
        background: e.addonBg,
        border: `${ye(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
      },
      "&-addon:first-child": {
        borderInlineEnd: 0
      },
      "&-addon:last-child": {
        borderInlineStart: 0
      }
    }
  }, Js(e, {
    status: "error",
    addonBorderColor: e.colorError,
    addonColor: e.colorErrorText
  })), Js(e, {
    status: "warning",
    addonBorderColor: e.colorWarning,
    addonColor: e.colorWarningText
  })), {
    [`&${e.componentCls}-group-wrapper-disabled`]: {
      [`${e.componentCls}-group-addon`]: Object.assign({}, Li(e))
    }
  })
}), zm = (e, t) => {
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
}, fu = (e, t) => {
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
}, Qs = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, fu(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  })
}), Lm = (e, t) => ({
  "&-filled": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, fu(e, {
    bg: e.colorFillTertiary,
    hoverBg: e.colorFillSecondary,
    activeBorderColor: e.activeBorderColor
  })), {
    [`&${e.componentCls}-disabled, &[disabled]`]: Object.assign({}, Li(e))
  }), Qs(e, {
    status: "error",
    bg: e.colorErrorBg,
    hoverBg: e.colorErrorBgHover,
    activeBorderColor: e.colorError,
    inputColor: e.colorErrorText,
    affixColor: e.colorError
  })), Qs(e, {
    status: "warning",
    bg: e.colorWarningBg,
    hoverBg: e.colorWarningBgHover,
    activeBorderColor: e.colorWarning,
    inputColor: e.colorWarningText,
    affixColor: e.colorWarning
  })), t)
}), el = (e, t) => ({
  [`&${e.componentCls}-group-wrapper-status-${t.status}`]: {
    [`${e.componentCls}-group-addon`]: {
      background: t.addonBg,
      color: t.addonColor
    }
  }
}), Hm = (e) => ({
  "&-filled": Object.assign(Object.assign(Object.assign({
    [`${e.componentCls}-group-addon`]: {
      background: e.colorFillTertiary,
      "&:last-child": {
        position: "static"
      }
    }
  }, el(e, {
    status: "error",
    addonBg: e.colorErrorBg,
    addonColor: e.colorErrorText
  })), el(e, {
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
          borderInlineStart: `${ye(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${ye(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${ye(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        },
        "&-addon:last-child": {
          borderInlineEnd: `${ye(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderTop: `${ye(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
          borderBottom: `${ye(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
        }
      }
    }
  })
}), vu = (e, t) => ({
  background: e.colorBgContainer,
  borderWidth: `${ye(e.lineWidth)} 0`,
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
}), tl = (e, t) => ({
  [`&${e.componentCls}-status-${t.status}:not(${e.componentCls}-disabled)`]: Object.assign(Object.assign({}, vu(e, t)), {
    [`${e.componentCls}-prefix, ${e.componentCls}-suffix`]: {
      color: t.affixColor
    }
  }),
  [`&${e.componentCls}-status-${t.status}${e.componentCls}-disabled`]: {
    borderColor: `transparent transparent ${t.borderColor} transparent`
  }
}), qm = (e, t) => ({
  "&-underlined": Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, vu(e, {
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
  }), tl(e, {
    status: "error",
    borderColor: e.colorError,
    hoverBorderColor: e.colorErrorBorderHover,
    activeBorderColor: e.colorError,
    activeShadow: e.errorActiveShadow,
    affixColor: e.colorError
  })), tl(e, {
    status: "warning",
    borderColor: e.colorWarning,
    hoverBorderColor: e.colorWarningBorderHover,
    activeBorderColor: e.colorWarning,
    activeShadow: e.warningActiveShadow,
    affixColor: e.colorWarning
  })), t)
}), Bm = (e) => ({
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
}), pu = (e) => {
  const {
    paddingBlockLG: t,
    lineHeightLG: r,
    borderRadiusLG: n,
    paddingInlineLG: a
  } = e;
  return {
    padding: `${ye(t)} ${ye(a)}`,
    fontSize: e.inputFontSizeLG,
    lineHeight: r,
    borderRadius: n
  };
}, hu = (e) => ({
  padding: `${ye(e.paddingBlockSM)} ${ye(e.paddingInlineSM)}`,
  fontSize: e.inputFontSizeSM,
  borderRadius: e.borderRadiusSM
}), mu = (e) => Object.assign(Object.assign({
  position: "relative",
  display: "inline-block",
  width: "100%",
  minWidth: 0,
  padding: `${ye(e.paddingBlock)} ${ye(e.paddingInline)}`,
  color: e.colorText,
  fontSize: e.inputFontSize,
  lineHeight: e.lineHeight,
  borderRadius: e.borderRadius,
  transition: `all ${e.motionDurationMid}`
}, Bm(e.colorTextPlaceholder)), {
  // Size
  "&-lg": Object.assign({}, pu(e)),
  "&-sm": Object.assign({}, hu(e)),
  // RTL
  "&-rtl, &-textarea-rtl": {
    direction: "rtl"
  }
}), Wm = (e) => {
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
    [`&-lg ${t}, &-lg > ${t}-group-addon`]: Object.assign({}, pu(e)),
    [`&-sm ${t}, &-sm > ${t}-group-addon`]: Object.assign({}, hu(e)),
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
        padding: `0 ${ye(e.paddingInline)}`,
        color: e.colorText,
        fontWeight: "normal",
        fontSize: e.inputFontSize,
        textAlign: "center",
        borderRadius: e.borderRadius,
        transition: `all ${e.motionDurationSlow}`,
        lineHeight: 1,
        // Reset Select's style in addon
        [`${r}-select`]: {
          margin: `${ye(e.calc(e.paddingBlock).add(1).mul(-1).equal())} ${ye(e.calc(e.paddingInline).mul(-1).equal())}`,
          [`&${r}-select-single:not(${r}-select-customize-input):not(${r}-pagination-size-changer)`]: {
            [`${r}-select-selector`]: {
              backgroundColor: "inherit",
              border: `${ye(e.lineWidth)} ${e.lineType} transparent`,
              boxShadow: "none"
            }
          }
        },
        // https://github.com/ant-design/ant-design/issues/31333
        [`${r}-cascader-picker`]: {
          margin: `-9px ${ye(e.calc(e.paddingInline).mul(-1).equal())}`,
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
    }, Jv()), {
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
}, Um = (e) => {
  const {
    componentCls: t,
    controlHeightSM: r,
    lineWidth: n,
    calc: a
  } = e, o = a(r).sub(a(n).mul(2)).sub(16).div(2).equal();
  return {
    [t]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, mc(e)), mu(e)), Dm(e)), Lm(e)), zm(e)), qm(e)), {
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
}, Ym = (e) => {
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
        margin: `0 ${ye(e.inputAffixPadding)}`
      }
    }
  };
}, Gm = (e) => {
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
    [l]: Object.assign(Object.assign(Object.assign(Object.assign({}, mu(e)), {
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
    }), Ym(e)), {
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
}, Km = (e) => {
  const {
    componentCls: t,
    borderRadiusLG: r,
    borderRadiusSM: n
  } = e;
  return {
    [`${t}-group`]: Object.assign(Object.assign(Object.assign({}, mc(e)), Wm(e)), {
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
      }, Vm(e)), Hm(e)), {
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
}, Xm = (e) => {
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
}, Zm = (e) => {
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
}, gu = ji(["Input", "Shared"], (e) => {
  const t = Rt(e, Vi(e));
  return [Um(t), Gm(t)];
}, zi, {
  resetFont: !1
}), Jm = ji(["Input", "Component"], (e) => {
  const t = Rt(e, Vi(e));
  return [
    Km(t),
    Xm(t),
    Zm(t),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    Qp(t)
  ];
}, zi, {
  resetFont: !1
});
function Qm(e) {
  return !!(e.prefix || e.suffix || e.allowClear || e.showCount);
}
var eg = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const tg = /* @__PURE__ */ xi((e, t) => {
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
    className: g,
    style: h,
    styles: p,
    rootClassName: f,
    onChange: S,
    classNames: m,
    variant: _
  } = e, P = eg(e, ["prefixCls", "bordered", "status", "size", "disabled", "onBlur", "onFocus", "suffix", "allowClear", "addonAfter", "addonBefore", "className", "style", "styles", "rootClassName", "onChange", "classNames", "variant"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: se
    } = Et("Input");
    se(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: C,
    direction: $,
    allowClear: E,
    autoComplete: y,
    className: R,
    style: T,
    classNames: M,
    styles: j
  } = cc("input"), F = C("input", r), A = _e(null), I = ru(F), [k, D, H] = gu(F, f), [K] = Jm(F, I), {
    compactSize: U,
    compactItemClassnames: w
  } = Ic(F, $), N = Nc((se) => {
    var Ae;
    return (Ae = i ?? U) !== null && Ae !== void 0 ? Ae : se;
  }), V = B.useContext(rn), z = o ?? V, {
    status: re,
    hasFeedback: Q,
    feedbackIcon: Y
  } = dt(on), ee = tu(re, a), ie = Qm(e) || !!Q, oe = _e(ie);
  if (process.env.NODE_ENV !== "production") {
    const se = Et("Input");
    Ze(() => {
      var Ae;
      ie && !oe.current && process.env.NODE_ENV !== "production" && se(document.activeElement === ((Ae = A.current) === null || Ae === void 0 ? void 0 : Ae.input), "usage", "When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ"), oe.current = ie;
    }, [ie]);
  }
  const he = km(A), ge = (se) => {
    he(), s == null || s(se);
  }, Re = (se) => {
    he(), l == null || l(se);
  }, L = (se) => {
    he(), S == null || S(se);
  }, Se = (Q || c) && /* @__PURE__ */ B.createElement(B.Fragment, null, c, Q && Y), X = eu(u ?? E), [ae, Oe] = uu("input", _, n);
  return k(K(/* @__PURE__ */ B.createElement(ah, Object.assign({
    ref: El(t, A),
    prefixCls: F,
    autoComplete: y
  }, P, {
    disabled: z,
    onBlur: ge,
    onFocus: Re,
    style: Object.assign(Object.assign({}, T), h),
    styles: Object.assign(Object.assign({}, j), p),
    suffix: Se,
    allowClear: X,
    className: de(g, f, H, I, w, R),
    onChange: L,
    addonBefore: v && /* @__PURE__ */ B.createElement(Xs, {
      form: !0,
      space: !0
    }, v),
    addonAfter: d && /* @__PURE__ */ B.createElement(Xs, {
      form: !0,
      space: !0
    }, d),
    classNames: Object.assign(Object.assign(Object.assign({}, m), M), {
      input: de({
        [`${F}-sm`]: N === "small",
        [`${F}-lg`]: N === "large",
        [`${F}-rtl`]: $ === "rtl"
      }, m == null ? void 0 : m.input, M.input, D),
      variant: de({
        [`${F}-${ae}`]: Oe
      }, ci(F, ee)),
      affixWrapper: de({
        [`${F}-affix-wrapper-sm`]: N === "small",
        [`${F}-affix-wrapper-lg`]: N === "large",
        [`${F}-affix-wrapper-rtl`]: $ === "rtl"
      }, D),
      wrapper: de({
        [`${F}-group-rtl`]: $ === "rtl"
      }, D),
      groupWrapper: de({
        [`${F}-group-wrapper-sm`]: N === "small",
        [`${F}-group-wrapper-lg`]: N === "large",
        [`${F}-group-wrapper-rtl`]: $ === "rtl",
        [`${F}-group-wrapper-${ae}`]: Oe
      }, ci(`${F}-group-wrapper`, ee, Q), D)
    })
  }))));
});
process.env.NODE_ENV !== "production" && (tg.displayName = "Input");
const rg = (e) => {
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
}, ng = ji(["Input", "TextArea"], (e) => {
  const t = Rt(e, Vi(e));
  return [rg(t)];
}, zi, {
  resetFont: !1
});
var ag = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
    t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
};
const $g = /* @__PURE__ */ xi((e, t) => {
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
    styles: g,
    variant: h,
    showCount: p,
    onMouseDown: f,
    onResize: S
  } = e, m = ag(e, ["prefixCls", "bordered", "size", "disabled", "status", "allowClear", "classNames", "rootClassName", "className", "style", "styles", "variant", "showCount", "onMouseDown", "onResize"]);
  if (process.env.NODE_ENV !== "production") {
    const {
      deprecated: X
    } = Et("TextArea");
    X(!("bordered" in e), "bordered", "variant");
  }
  const {
    getPrefixCls: _,
    direction: P,
    allowClear: C,
    autoComplete: $,
    className: E,
    style: y,
    classNames: R,
    styles: T
  } = cc("textArea"), M = b.useContext(rn), j = o ?? M, {
    status: F,
    hasFeedback: A,
    feedbackIcon: I
  } = b.useContext(on), k = tu(F, s), D = b.useRef(null);
  b.useImperativeHandle(t, () => {
    var X;
    return {
      resizableTextArea: (X = D.current) === null || X === void 0 ? void 0 : X.resizableTextArea,
      focus: (ae) => {
        var Oe, se;
        Hc((se = (Oe = D.current) === null || Oe === void 0 ? void 0 : Oe.resizableTextArea) === null || se === void 0 ? void 0 : se.textArea, ae);
      },
      blur: () => {
        var ae;
        return (ae = D.current) === null || ae === void 0 ? void 0 : ae.blur();
      }
    };
  });
  const H = _("input", n), K = ru(H), [U, w, N] = gu(H, u), [V] = ng(H, K), {
    compactSize: z,
    compactItemClassnames: re
  } = Ic(H, P), Q = Nc((X) => {
    var ae;
    return (ae = i ?? z) !== null && ae !== void 0 ? ae : X;
  }), [Y, ee] = uu("textArea", h, a), ie = eu(l ?? C), [oe, he] = b.useState(!1), [ge, Re] = b.useState(!1), L = (X) => {
    he(!0), f == null || f(X);
    const ae = () => {
      he(!1), document.removeEventListener("mouseup", ae);
    };
    document.addEventListener("mouseup", ae);
  }, Se = (X) => {
    var ae, Oe;
    if (S == null || S(X), oe && typeof getComputedStyle == "function") {
      const se = (Oe = (ae = D.current) === null || ae === void 0 ? void 0 : ae.nativeElement) === null || Oe === void 0 ? void 0 : Oe.querySelector("textarea");
      se && getComputedStyle(se).resize === "both" && Re(!0);
    }
  };
  return U(V(/* @__PURE__ */ b.createElement(Ih, Object.assign({
    autoComplete: $
  }, m, {
    style: Object.assign(Object.assign({}, y), v),
    styles: Object.assign(Object.assign({}, T), g),
    disabled: j,
    allowClear: ie,
    className: de(
      N,
      K,
      d,
      u,
      re,
      E,
      // Only for wrapper
      ge && `${H}-textarea-affix-wrapper-resize-dirty`
    ),
    classNames: Object.assign(Object.assign(Object.assign({}, c), R), {
      textarea: de({
        [`${H}-sm`]: Q === "small",
        [`${H}-lg`]: Q === "large"
      }, w, c == null ? void 0 : c.textarea, R.textarea, oe && `${H}-mouse-active`),
      variant: de({
        [`${H}-${Y}`]: ee
      }, ci(H, k)),
      affixWrapper: de(`${H}-textarea-affix-wrapper`, {
        [`${H}-affix-wrapper-rtl`]: P === "rtl",
        [`${H}-affix-wrapper-sm`]: Q === "small",
        [`${H}-affix-wrapper-lg`]: Q === "large",
        [`${H}-textarea-show-count`]: p || ((r = e.count) === null || r === void 0 ? void 0 : r.show)
      }, w)
    }),
    prefixCls: H,
    suffix: A && /* @__PURE__ */ b.createElement("span", {
      className: `${H}-textarea-suffix`
    }, I),
    showCount: p,
    ref: D,
    onResize: Se,
    onMouseDown: L
  }))));
});
export {
  gg as L,
  $g as T,
  bg as a,
  hg as b,
  dg as c,
  fg as d,
  vg as e,
  pg as f,
  Eg as g,
  xg as h,
  _g as i,
  cg as j,
  Sg as k,
  yg as l,
  mg as s,
  ug as z
};
