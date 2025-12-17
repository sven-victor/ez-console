var cr = Object.defineProperty;
var dr = (e, t, r) => t in e ? cr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var _ = (e, t, r) => dr(e, typeof t != "symbol" ? t + "" : t, r);
import { d as ur, r as mr, a as fr, _ as re, F as xe, K as Qe, u as pr, i as gr, b as hr, c as yr, f as br, g as Cr, m as et, e as se, h as Me, C as Vt, k as Sr, l as dt, n as xr, p as $r, o as vr, q as Er, s as sn, t as Wt, v as vn, w as wr, x as Nr, y as En, z as Rr, M as Tr, A as Mr, B as Ir, D as Ar } from "./vendor.js";
import * as A from "react";
import i, { useImperativeHandle as wn, createContext as Dr, useRef as le, useEffect as ye, useCallback as ze, useState as Se, useMemo as Ye, useContext as Pr, memo as Br, useSyncExternalStore as kt } from "react";
import M from "classnames";
import { createPortal as on } from "react-dom";
import { CloseCircleOutlined as Hr, LoadingOutlined as _r, MutedOutlined as Or, LikeFilled as Lr, LikeOutlined as kr, DislikeFilled as zr, DislikeOutlined as Xr, EllipsisOutlined as Nn, PlusOutlined as Fr, RightOutlined as Kr, ZoomInOutlined as qr, ZoomOutOutlined as Vr, DownloadOutlined as Wr, ClearOutlined as jr, ArrowUpOutlined as Ur, AudioMutedOutlined as Gr, AudioOutlined as Yr, CloseOutlined as Rn, CaretDownFilled as Zr } from "@ant-design/icons";
import { ConfigProvider as Tn, theme as zt, Tooltip as Ze, Typography as Mn, Dropdown as jt, Flex as In, Button as Je, Divider as An, Segmented as Jr, Input as Dn } from "antd";
import { m as Ht } from "./mermaid.js";
function ut(e, t) {
  return wn(e, () => {
    const r = t(), {
      nativeElement: n
    } = r;
    return new Proxy(n, {
      get(s, o) {
        return r[o] ? r[o] : Reflect.get(s, o);
      }
    });
  });
}
const Pn = /* @__PURE__ */ i.createContext({}), Qr = {
  classNames: {},
  styles: {},
  className: "",
  style: {},
  shortcutKeys: {}
}, Ie = (e) => {
  const t = i.useContext(Pn);
  return i.useMemo(() => ({
    ...Qr,
    ...t[e]
  }), [t[e]]);
};
function Bn() {
}
let Be = null;
function es() {
  Be = null, mr();
}
let Nt = Bn;
process.env.NODE_ENV !== "production" && (Nt = (e, t, r) => {
  ur(e, `[antdx: ${t}] ${r}`), process.env.NODE_ENV === "test" && es();
});
const ts = /* @__PURE__ */ A.createContext({}), ns = process.env.NODE_ENV !== "production" ? (e) => {
  const {
    strict: t
  } = A.useContext(ts), r = (n, s, o) => {
    if (!n)
      if (t === !1 && s === "deprecated") {
        const a = Be;
        Be || (Be = {}), Be[e] = Be[e] || [], Be[e].includes(o || "") || Be[e].push(o || ""), a || console.warn("[antd] There exists deprecated usage in your code:", Be);
      } else
        Nt(n, e, o);
  };
  return r.deprecated = (n, s, o, a) => {
    r(n, "deprecated", `\`${s}\` is deprecated. Please use \`${o}\` instead.${a ? ` ${a}` : ""}`);
  }, r;
} : () => {
  const e = () => {
  };
  return e.deprecated = Bn, e;
}, Hn = /* @__PURE__ */ Dr(void 0), Te = {
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
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    zoomReset: "Reset",
    download: "Download",
    code: "Code",
    image: "Image"
  }
}, Ve = (e, t) => {
  const r = A.useContext(Hn), n = A.useMemo(() => {
    var l;
    const o = t || (Te == null ? void 0 : Te[e]) || ((l = fr) == null ? void 0 : l[e]), a = (r == null ? void 0 : r[e]) ?? {};
    return {
      ...typeof o == "function" ? o() : o,
      ...a || {}
    };
  }, [e, t, r]), s = A.useMemo(() => {
    const o = r == null ? void 0 : r.locale;
    return r != null && r.exist && !o ? Te.locale : o;
  }, [r]);
  return [n, s];
}, _n = "internalMark", On = (e) => {
  const {
    locale: t = {},
    children: r,
    _ANT_MARK__: n
  } = e;
  process.env.NODE_ENV !== "production" && ns("LocaleProvider")(n === _n, "deprecated", "`LocaleProvider` is deprecated. Please use `locale` with `XProvider` instead: https://x.ant.design/components/x-provider-cn#x-provider-demo-locale");
  const s = A.useMemo(() => ({
    ...t,
    exist: !0
  }), [t]);
  return /* @__PURE__ */ A.createElement(Hn.Provider, {
    value: s
  }, r);
};
process.env.NODE_ENV !== "production" && (On.displayName = "LocaleProvider");
const rs = "ant";
function pe() {
  const {
    getPrefixCls: e,
    direction: t,
    csp: r,
    iconPrefixCls: n,
    theme: s
  } = i.useContext(Tn.ConfigContext);
  return {
    theme: s,
    getPrefixCls: e,
    direction: t,
    csp: r,
    iconPrefixCls: n
  };
}
const ss = (e) => {
  const {
    actions: t,
    attachments: r,
    bubble: n,
    conversations: s,
    prompts: o,
    sender: a,
    suggestion: l,
    thoughtChain: c,
    welcome: d,
    fileCard: u,
    think: m,
    theme: p,
    locale: f,
    children: h,
    mermaid: y,
    codeHighlighter: C,
    ...S
  } = e, $ = i.useMemo(() => ({
    actions: t,
    attachments: r,
    bubble: n,
    conversations: s,
    prompts: o,
    sender: a,
    suggestion: l,
    thoughtChain: c,
    fileCard: u,
    think: m,
    mermaid: y,
    codeHighlighter: C,
    welcome: d
  }), [t, r, n, s, o, a, l, c, d, y, m, u, C]);
  let v = h;
  return f && (v = /* @__PURE__ */ i.createElement(On, {
    locale: f,
    _ANT_MARK__: _n
  }, v)), /* @__PURE__ */ i.createElement(Pn.Provider, {
    value: $
  }, /* @__PURE__ */ i.createElement(Tn, re({}, S, {
    theme: p,
    locale: f
  }), v));
};
process.env.NODE_ENV !== "production" && (ss.displayName = "XProvider");
const ot = 1e3, it = 4, Et = 140, an = Et / 2, xt = 250, ln = 500, $t = 0.8;
function Ln({
  className: e
}) {
  const [t] = Ve("Sender", Te.Sender);
  return /* @__PURE__ */ i.createElement("svg", {
    color: "currentColor",
    viewBox: `0 0 ${ot} ${ot}`,
    xmlns: "http://www.w3.org/2000/svg",
    className: e
  }, /* @__PURE__ */ i.createElement("title", null, t.speechRecording), Array.from({
    length: it
  }).map((r, n) => {
    const s = (ot - Et * it) / (it - 1), o = n * (s + Et), a = ot / 2 - xt / 2, l = ot / 2 - ln / 2;
    return /* @__PURE__ */ i.createElement("rect", {
      fill: "currentColor",
      rx: an,
      ry: an,
      height: xt,
      width: Et,
      x: o,
      y: a,
      key: n
    }, /* @__PURE__ */ i.createElement("animate", {
      attributeName: "height",
      values: `${xt}; ${ln}; ${xt}`,
      keyTimes: "0; 0.5; 1",
      dur: `${$t}s`,
      begin: `${$t / it * n}s`,
      repeatCount: "indefinite"
    }), /* @__PURE__ */ i.createElement("animate", {
      attributeName: "y",
      values: `${a}; ${l}; ${a}`,
      keyTimes: "0; 0.5; 1",
      dur: `${$t}s`,
      begin: `${$t / it * n}s`,
      repeatCount: "indefinite"
    }));
  }));
}
const os = (e) => ({
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
}), is = (e) => ({
  animationDuration: e,
  animationFillMode: "both"
}), as = (e) => ({
  animationDuration: e,
  animationFillMode: "both"
}), kn = (e, t, r, n, s = !1) => {
  const o = s ? "&" : "";
  return {
    [`
      ${o}${e}-enter,
      ${o}${e}-appear
    `]: {
      ...is(n),
      animationPlayState: "paused"
    },
    [`${o}${e}-leave`]: {
      ...as(n),
      animationPlayState: "paused"
    },
    [`
      ${o}${e}-enter${e}-enter-active,
      ${o}${e}-appear${e}-appear-active
    `]: {
      animationName: t,
      animationPlayState: "running"
    },
    [`${o}${e}-leave${e}-leave-active`]: {
      animationName: r,
      animationPlayState: "running",
      pointerEvents: "none"
    }
  };
}, ls = new Qe("antXFadeInLeft", {
  "0%": {
    maskPosition: "100% 0"
  },
  "100%": {
    maskPosition: "0% 0%"
  }
}), cs = new Qe("antXFadeIn", {
  "0%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
}), zn = new Qe("antFadeOut", {
  "0%": {
    opacity: 1
  },
  "100%": {
    opacity: 0
  }
}), ds = (e, t = !1) => {
  const {
    antCls: r
  } = e, n = `${r}-x-fade-left`, s = t ? "&" : "";
  return [{
    [e.componentCls]: {
      "&": kn(n, ls, zn, "1s", t),
      [`${s}${n}-enter,${s}${n}-appear`]: {
        transitionProperty: "mask-position",
        animationTimingFunction: "linear",
        maskImage: `linear-gradient(90deg, ${e.colorTextBase} 33%, ${new xe(e.colorTextBase).setA(0)} 66%)`,
        maskSize: "300% 100%",
        maskPosition: "100% 0%"
      },
      [`${s}${n}-leave`]: {
        animationTimingFunction: "linear"
      }
    }
  }];
}, us = (e, t = !1) => {
  const {
    antCls: r
  } = e, n = `${r}-x-fade`, s = t ? "&" : "";
  return [{
    [e.componentCls]: {
      "&": kn(n, cs, zn, "1.2s", t),
      [`${s}${n}-enter,${s}${n}-appear`]: {
        opacity: 0
      },
      [`${s}${n}-leave`]: {
        animationTimingFunction: "linear"
      }
    }
  }];
}, ms = "2.1.1", fs = yr(zt.defaultAlgorithm), ps = {
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
}, Xn = (e, t, r) => {
  const n = r.getDerivativeToken(e), {
    override: s,
    ...o
  } = t;
  let a = {
    ...n,
    override: s
  };
  return a = br(a), o && Object.entries(o).forEach(([l, c]) => {
    const {
      theme: d,
      ...u
    } = c;
    let m = u;
    d && (m = Xn({
      ...a,
      ...u
    }, {
      override: u
    }, d)), a[l] = m;
  }), a;
};
function Fn() {
  const {
    token: e,
    hashed: t,
    theme: r,
    override: n,
    cssVar: s
  } = i.useContext(zt._internalContext), o = {
    prefix: (s == null ? void 0 : s.prefix) || "ant",
    key: (s == null ? void 0 : s.key) || "css-var-root"
  }, a = r || fs, [l, c, d] = pr(a, [zt.defaultSeed, e], {
    salt: `${ms}-${t || ""}`,
    override: n,
    getComputedToken: Xn,
    cssVar: {
      ...o,
      unitless: hr,
      ignore: gr,
      preserve: ps
    }
  });
  return [a, d, t ? c : "", l, o];
}
function gs() {
  const [e, t, r] = Fn();
  return {
    theme: e,
    token: t,
    hashId: r
  };
}
const {
  genStyleHooks: tt
} = Cr({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: t
    } = pe();
    return {
      iconPrefixCls: t,
      rootPrefixCls: e()
    };
  },
  useToken: () => {
    const [e, t, r, n, s] = Fn();
    return {
      theme: e,
      realToken: t,
      hashId: r,
      token: n,
      cssVar: s
    };
  },
  useCSP: () => {
    const {
      csp: e
    } = pe();
    return e ?? {};
  },
  layer: {
    name: "antdx",
    dependencies: ["antd"]
  }
}), hs = (e) => {
  const {
    componentCls: t
  } = e, r = `${t}-audio`;
  return {
    [r]: {
      [`&${r}-rtl`]: {
        direction: "rtl"
      },
      [`${r}-recording-icon`]: {
        width: e.fontSize,
        height: e.fontSize
      }
    }
  };
}, ys = (e) => {
  const {
    componentCls: t
  } = e, r = `${t}-copy`;
  return {
    [t]: {
      [`&${r}-rtl`]: {
        direction: "rtl"
      },
      [`${r}-copy`]: {
        fontSize: "inherit",
        [`&:not(${t}-copy-success)`]: {
          color: "inherit!important"
        }
      }
    }
  };
}, bs = (e) => {
  const {
    componentCls: t
  } = e, r = `${t}-feedback`;
  return {
    [t]: {
      [`&${r}-rtl`]: {
        direction: "rtl"
      }
    }
  };
}, Cs = (e) => {
  const {
    componentCls: t,
    antCls: r,
    calc: n
  } = e;
  return {
    [t]: {
      [`&${t}-rtl`]: {
        direction: "rtl"
      },
      [`${r}-pagination-item-link`]: {
        width: e.controlHeightSM
      },
      [`${t}-variant-outlined`]: {
        paddingInline: se(n(e.paddingXXS).add(1).equal()),
        paddingBlock: e.paddingXXS,
        borderRadius: e.borderRadius,
        border: `${se(e.lineWidth)} ${e.lineType}, ${e.colorBorderSecondary}`
      },
      [`${t}-variant-filled`]: {
        paddingInline: se(n(e.paddingXXS).add(1).equal()),
        paddingBlock: e.paddingXXS,
        borderRadius: e.borderRadius,
        backgroundColor: e.colorBorderSecondary,
        [`${t}-item`]: {
          paddingInline: se(n(e.paddingXXS).add(1).equal()),
          paddingBlock: e.paddingXXS,
          "&:hover": {
            color: e.colorTextSecondary,
            background: "transparent"
          }
        }
      },
      [`${t}-list-danger`]: {
        color: e.colorError
      },
      [`&${t}-item,${t}-item`]: {
        cursor: "pointer",
        fontSize: e.fontSize,
        paddingInline: se(n(e.paddingXXS).add(1).equal()),
        paddingBlock: e.paddingXXS,
        borderRadius: e.borderRadiusSM,
        height: e.controlHeightSM,
        boxSizing: "border-box",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: e.lineHeight,
        transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
        [`${t}-icon`]: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: e.fontSize
        },
        "&:hover": {
          background: e.colorBgTextHover
        }
      },
      [`&${t}-list,${t}-list`]: {
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        color: e.colorText,
        gap: e.paddingXS
      }
    }
  };
}, Ss = () => ({}), mt = tt("Actions", (e) => {
  const t = et(e, {});
  return [Cs(t), ys(t), bs(t), hs(t), ds(t), us(t)];
}, Ss);
let He = /* @__PURE__ */ function(e) {
  return e.LOADING = "loading", e.ERROR = "error", e.RUNNING = "running", e.DEFAULT = "default", e;
}({});
const Kn = (e) => {
  const {
    status: t = "default",
    defaultIcon: r,
    runningIcon: n,
    label: s,
    className: o,
    classNames: a = {},
    styles: l = {},
    style: c,
    prefixCls: d,
    rootClassName: u,
    ...m
  } = e, p = Me(m, {
    attr: !0,
    aria: !0,
    data: !0
  }), {
    direction: f,
    getPrefixCls: h
  } = pe(), y = h("actions", d), [C, S] = mt(y), $ = `${y}-button-item`, v = M($, C, S, u, o, a.root, y, `${y}-item`, {
    [`${$}-rtl`]: f === "rtl",
    [`${a[t]}`]: a[t]
  }), B = {
    [He.LOADING]: /* @__PURE__ */ i.createElement(_r, null),
    [He.ERROR]: /* @__PURE__ */ i.createElement(Hr, null),
    [He.RUNNING]: n,
    [He.DEFAULT]: r
  }, W = t && B[t] ? B[t] : r;
  return /* @__PURE__ */ i.createElement(Ze, {
    title: s
  }, /* @__PURE__ */ i.createElement("div", re({}, p, {
    className: v,
    style: {
      ...c,
      ...l.root,
      ...l == null ? void 0 : l[t]
    }
  }), W));
}, xs = (e) => {
  const {
    status: t = He.DEFAULT,
    className: r,
    style: n,
    prefixCls: s,
    rootClassName: o,
    classNames: a = {},
    styles: l = {},
    ...c
  } = e, {
    direction: d,
    getPrefixCls: u
  } = pe(), m = u("actions", s), [p, f] = mt(m), h = `${m}-audio`, y = M(m, h, p, f, o, r, a.root, {
    [`${h}-rtl`]: d === "rtl",
    [`${h}-${t}`]: t
  }), [C] = Ve("Actions", Te.Actions), S = {
    [He.LOADING]: C.audioLoading,
    [He.ERROR]: C.audioError,
    [He.RUNNING]: C.audioRunning,
    [He.DEFAULT]: C.audio
  };
  return /* @__PURE__ */ i.createElement(Kn, re({
    label: t ? S[t] : "",
    style: n,
    styles: l,
    classNames: {
      ...a,
      root: y
    },
    status: t,
    defaultIcon: /* @__PURE__ */ i.createElement(Or, null),
    runningIcon: /* @__PURE__ */ i.createElement(Ln, {
      className: `${h}-recording-icon`
    })
  }, c));
}, {
  Text: $s
} = Mn, vs = (e) => {
  const {
    text: t = "",
    icon: r,
    className: n,
    style: s,
    prefixCls: o,
    rootClassName: a,
    classNames: l = {},
    styles: c = {},
    ...d
  } = e, u = Me(d, {
    attr: !0,
    aria: !0,
    data: !0
  }), {
    direction: m,
    getPrefixCls: p
  } = pe(), f = p("actions", o), [h, y] = mt(f), C = `${f}-copy`, S = M(f, `${f}-item`, h, y, a, n, l.root, {
    [`${C}-rtl`]: m === "rtl"
  });
  return /* @__PURE__ */ i.createElement($s, re({}, u, {
    className: S,
    style: {
      ...s,
      ...c.root
    },
    prefixCls: C,
    copyable: {
      text: t,
      icon: r
    }
  }));
};
var we = /* @__PURE__ */ function(e) {
  return e.like = "like", e.dislike = "dislike", e.default = "default", e;
}(we || {});
const Es = (e) => {
  const {
    value: t = "default",
    onChange: r,
    className: n,
    style: s,
    classNames: o = {},
    styles: a = {},
    prefixCls: l,
    rootClassName: c,
    ...d
  } = e, u = Me(d, {
    attr: !0,
    aria: !0,
    data: !0
  }), [m] = Ve("Actions", Te.Actions), {
    direction: p,
    getPrefixCls: f
  } = pe(), h = f("actions", l), [y, C] = mt(h), S = `${h}-feedback`, $ = M(h, S, y, C, c, o.root, `${h}-list`, n, {
    [`${S}-rtl`]: p === "rtl"
  }), v = () => r == null ? void 0 : r(t === we.dislike ? we.default : we.dislike);
  return /* @__PURE__ */ i.createElement("div", re({}, u, {
    className: $,
    style: {
      ...s,
      ...a.root
    }
  }), [we.default, we.like].includes(t) && /* @__PURE__ */ i.createElement(Ze, {
    title: m.feedbackLike
  }, /* @__PURE__ */ i.createElement("span", {
    onClick: () => r == null ? void 0 : r(t === we.like ? we.default : we.like),
    style: {
      ...a.like,
      ...t === "like" ? a.liked : {}
    },
    className: M(`${S}-item`, `${h}-item`, `${S}-item-like`, o.like, {
      [`${o.liked}`]: o.liked && t === "like",
      [`${S}-item-like-active`]: t === "like"
    })
  }, t === we.like ? /* @__PURE__ */ i.createElement(Lr, null) : /* @__PURE__ */ i.createElement(kr, null))), [we.default, we.dislike].includes(t) && /* @__PURE__ */ i.createElement(Ze, {
    title: m.feedbackDislike
  }, /* @__PURE__ */ i.createElement("span", {
    onClick: v,
    style: {
      ...a.dislike,
      ...t === "dislike" ? a.disliked : {}
    },
    className: M(`${S}-item`, `${h}-item`, `${S}-item-dislike`, o.dislike, {
      [`${o.disliked}`]: o.disliked && t === "like",
      [`${S}-item-dislike-active`]: t === "dislike"
    })
  }, t === we.dislike ? /* @__PURE__ */ i.createElement(zr, null) : /* @__PURE__ */ i.createElement(Xr, null))));
}, Ut = /* @__PURE__ */ i.createContext(null), lt = (e, t) => {
  const r = e[0];
  for (const n of t) {
    if (!n) return null;
    if (n.key === r) {
      if (e.length === 1) return n;
      if (n.subItems)
        return lt(e.slice(1), n == null ? void 0 : n.subItems);
    }
  }
  return null;
}, ws = (e) => {
  const {
    onClick: t,
    item: r,
    dropdownProps: n = {}
  } = e, {
    prefixCls: s,
    classNames: o = {},
    styles: a = {}
  } = i.useContext(Ut) || {}, {
    subItems: l = [],
    triggerSubMenuAction: c = "hover"
  } = r, d = (r == null ? void 0 : r.icon) ?? /* @__PURE__ */ i.createElement(Nn, null), u = {
    items: l,
    onClick: ({
      key: m,
      keyPath: p,
      domEvent: f
    }) => {
      var h, y, C;
      if ((h = lt(p, l)) != null && h.onItemClick) {
        (C = (y = lt(p, l)) == null ? void 0 : y.onItemClick) == null || C.call(y, lt(p, l));
        return;
      }
      t == null || t({
        key: m,
        keyPath: [...p, (r == null ? void 0 : r.key) || ""],
        domEvent: f,
        item: lt(p, l)
      });
    }
  };
  return /* @__PURE__ */ i.createElement(jt, re({
    menu: u,
    trigger: [c]
  }, n, {
    className: M(`${s}-dropdown`, o.itemDropdown, n == null ? void 0 : n.className),
    styles: {
      root: a.itemDropdown,
      ...n == null ? void 0 : n.styles
    }
  }), /* @__PURE__ */ i.createElement("div", {
    className: M(`${s}-item`, `${s}-sub-item`, o == null ? void 0 : o.item),
    style: a == null ? void 0 : a.item
  }, /* @__PURE__ */ i.createElement("div", {
    className: `${s}-icon`
  }, d)));
}, Ns = (e) => {
  const {
    item: t,
    onClick: r,
    dropdownProps: n = {}
  } = e, {
    prefixCls: s,
    classNames: o = {},
    styles: a = {}
  } = i.useContext(Ut) || {}, l = i.useId(), c = (t == null ? void 0 : t.key) || l;
  return t ? t.actionRender ? typeof t.actionRender == "function" ? t.actionRender(t) : t.actionRender : t.subItems ? /* @__PURE__ */ i.createElement(ws, {
    key: c,
    item: t,
    onClick: r,
    dropdownProps: n
  }) : /* @__PURE__ */ i.createElement("div", {
    className: M(`${s}-item`, o.item, {
      [`${s}-list-danger`]: t == null ? void 0 : t.danger
    }),
    style: a.item,
    onClick: (d) => {
      if (t != null && t.onItemClick) {
        t.onItemClick(t);
        return;
      }
      r == null || r({
        key: c,
        item: t,
        keyPath: [c],
        domEvent: d
      });
    },
    key: c
  }, /* @__PURE__ */ i.createElement(Ze, {
    title: t.label
  }, /* @__PURE__ */ i.createElement("div", {
    className: `${s}-icon`
  }, t == null ? void 0 : t.icon))) : null;
}, Rs = /* @__PURE__ */ i.forwardRef((e, t) => {
  const {
    items: r = [],
    onClick: n,
    dropdownProps: s = {},
    fadeIn: o,
    fadeInLeft: a,
    variant: l = "borderless",
    prefixCls: c,
    classNames: d = {},
    rootClassName: u = "",
    className: m = "",
    styles: p = {},
    style: f = {},
    ...h
  } = e, y = Me(h, {
    attr: !0,
    aria: !0,
    data: !0
  }), {
    getPrefixCls: C,
    direction: S
  } = pe(), $ = C("actions", c), v = Ie("actions"), [B, W] = mt($), V = C(), U = o || a ? `${V}-x-fade${a ? "-left" : ""}` : "", N = M($, v.className, v.classNames.root, u, m, d.root, W, B, {
    [`${$}-rtl`]: S === "rtl"
  }), I = {
    ...v.style,
    ...p.root,
    ...f
  }, D = i.useRef(null);
  return ut(t, () => ({
    nativeElement: D.current
  })), /* @__PURE__ */ i.createElement(Vt, {
    motionName: U
  }, ({
    className: T
  }, R) => /* @__PURE__ */ i.createElement("div", re({
    ref: Sr(D, R)
  }, y, {
    className: N,
    style: I
  }), /* @__PURE__ */ i.createElement(Ut.Provider, {
    value: {
      prefixCls: $,
      classNames: {
        item: M(v.classNames.item, d.item),
        itemDropdown: M(v.classNames.itemDropdown, d.itemDropdown)
      },
      styles: {
        item: {
          ...v.styles.item,
          ...p.item
        },
        itemDropdown: {
          ...v.styles.itemDropdown,
          ...p.itemDropdown
        }
      }
    }
  }, /* @__PURE__ */ i.createElement("div", {
    className: M(`${$}-list`, `${$}-variant-${l}`, T)
  }, r.map((G, j) => /* @__PURE__ */ i.createElement(Ns, {
    item: G,
    onClick: n,
    dropdownProps: s,
    key: G.key || j
  }))))));
}), Xe = Rs;
process.env.NODE_ENV !== "production" && (Xe.displayName = "Actions");
Xe.Feedback = Es;
Xe.Copy = vs;
Xe.Item = Kn;
Xe.Audio = xs;
const qn = /* @__PURE__ */ i.createContext({});
function Ts(e) {
  const t = getComputedStyle(e).display;
  return t === "block" || t === "flex" || t === "list-item" || t === "table";
}
function Ms(e) {
  var n;
  const t = [""], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  for (; r.nextNode(); ) {
    const s = r.currentNode;
    if (s.nodeType === Node.TEXT_NODE) {
      t[t.length - 1] += s.textContent;
      continue;
    }
    s.tagName === "BR" && ((n = s.parentNode) == null ? void 0 : n.childElementCount) === 1 || (s.tagName === "BR" || Ts(s)) && t.push("");
  }
  return t.join(`
`);
}
const Is = ({
  content: e,
  prefixCls: t,
  okText: r,
  cancelText: n,
  onEditConfirm: s,
  onEditCancel: o
}) => {
  const a = i.useRef(null), [l] = Ve("Bubble", Te.Bubble), c = dt(() => {
    s == null || s(Ms(a.current));
  }), d = dt(() => o == null ? void 0 : o());
  if (i.useEffect(() => {
    a.current.textContent = e, a.current.focus();
    const m = window.getSelection(), p = document.createRange();
    p.selectNodeContents(a.current), p.collapse(!1), m.removeAllRanges(), m.addRange(p);
  }, []), typeof e != "string") throw new Error("Content of editable Bubble should be string");
  const u = i.useMemo(() => (
    /**
     * 为什么使用 div
     * input、textarea 是固定行为、固定宽高的元素，无法对内容自适应，体验差
     * div.contentEditable 提供了编辑 innerHTML 的能力，同时具备内容自适应能力，体验好
     */
    /* @__PURE__ */ i.createElement("div", {
      ref: a,
      contentEditable: !0
    })
  ), []);
  return /* @__PURE__ */ i.createElement(i.Fragment, null, u, /* @__PURE__ */ i.createElement(In, {
    rootClassName: `${t}-editing-opts`,
    gap: 8
  }, /* @__PURE__ */ i.createElement(Je, {
    type: "primary",
    shape: "round",
    size: "small",
    onClick: c
  }, r || l.editableOk), /* @__PURE__ */ i.createElement(Je, {
    type: "text",
    shape: "round",
    size: "small",
    onClick: d
  }, n || l.editableCancel)));
}, As = ({
  prefixCls: e
}) => /* @__PURE__ */ i.createElement("span", {
  className: `${e}-dot`
}, /* @__PURE__ */ i.createElement("i", {
  className: `${e}-dot-item`,
  key: "item-1"
}), /* @__PURE__ */ i.createElement("i", {
  className: `${e}-dot-item`,
  key: "item-2"
}), /* @__PURE__ */ i.createElement("i", {
  className: `${e}-dot-item`,
  key: "item-3"
})), Ds = new Qe("loadingMove", {
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
}), Ps = new Qe("cursorBlink", {
  "0%": {
    opacity: 1
  },
  "50%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
}), Bs = new Qe("fadeIn", {
  "0%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
}), Hs = (e) => {
  const {
    componentCls: t,
    fontSize: r,
    typingContent: n,
    typingAnimationDuration: s,
    typingAnimationName: o,
    lineHeight: a,
    paddingSM: l,
    colorText: c,
    calc: d
  } = e;
  return [{
    [t]: {
      display: "flex",
      columnGap: l,
      [`&${t}-rtl`]: {
        direction: "rtl"
      },
      [`&${t}-loading`]: {
        alignItems: "center"
      },
      [`${t}-body`]: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%"
      },
      // =========================== Content =============================
      [`${t}-content`]: {
        position: "relative",
        boxSizing: "border-box",
        minWidth: 0,
        maxWidth: "100%",
        minHeight: d(l).mul(2).add(d(a).mul(r)).equal(),
        paddingInline: `${se(e.padding)}`,
        paddingBlock: `${se(l)}`,
        color: c,
        fontSize: e.fontSize,
        lineHeight: e.lineHeight,
        wordBreak: "break-word",
        "&-string": {
          whiteSpace: "pre-wrap"
        }
      },
      [`${t}-typing:last-child::after`]: {
        content: n,
        fontWeight: 900,
        userSelect: "none",
        opacity: 1,
        marginInlineStart: "0.1em",
        animationName: o,
        animationDuration: se(s),
        animationIterationCount: "infinite",
        animationTimingFunction: "linear"
      },
      [`${t}-fade-in .fade-in`]: {
        display: "inline",
        animationName: Bs,
        animationDuration: "1s",
        animationTimingFunction: "linear"
      },
      [`${t}-dot`]: {
        position: "relative",
        height: e.controlHeight,
        display: "flex",
        alignItems: "center",
        columnGap: e.marginXS,
        padding: `0 ${se(e.paddingXXS)}`,
        alignSelf: "center",
        "&-item": {
          backgroundColor: e.colorPrimary,
          borderRadius: "100%",
          width: 4,
          height: 4,
          animationName: Ds,
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
      [`&${t}-start`]: {
        flexDirection: "row",
        [`& ${t}-header`]: {
          flexDirection: "row"
        }
      },
      [`&${t}-end`]: {
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
  }, Ps];
}, _s = (e) => {
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
}, Os = (e) => {
  const {
    componentCls: t,
    fontSize: r,
    lineHeight: n,
    paddingSM: s,
    borderRadius: o,
    calc: a
  } = e, l = a(r).mul(n).div(2).add(s).equal(), c = a(o).mul(2).equal(), d = `${t}-content`;
  return {
    [t]: {
      [d]: {
        "&-default": {
          borderRadius: {
            _skip_check_: !0,
            value: c
          }
        },
        "&-round": {
          borderRadius: {
            _skip_check_: !0,
            value: l
          }
        },
        "&-corner": {
          borderRadius: {
            _skip_check_: !0,
            value: c
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
      [`&${t}-start ${t}-content-corner`]: {
        borderStartStartRadius: e.borderRadiusXS
      },
      [`&${t}-end ${t}-content-corner`]: {
        borderStartEndRadius: e.borderRadiusXS
      }
    }
  };
}, Ls = (e) => {
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
}, ks = (e) => {
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
}, zs = (e) => {
  const {
    componentCls: t,
    fontSize: r,
    lineHeight: n,
    paddingXXS: s,
    margin: o,
    colorText: a,
    fontSizeLG: l,
    calc: c
  } = e;
  return {
    [t]: {
      // ======================== Header & Footer ========================
      [`${t}-header`]: {
        display: "flex",
        marginBottom: s,
        fontSize: r,
        lineHeight: n,
        color: a
      },
      [`${t}-footer`]: {
        display: "flex",
        marginBlockStart: o,
        fontSize: r,
        lineHeight: n,
        color: a,
        "&-start": {
          flexDirection: "row"
        },
        "&-end": {
          flexDirection: "row-reverse"
        }
      },
      // ======================== Sider ========================
      [`${t}-avatar`]: {
        minWidth: c(l).mul(2).equal()
      }
    }
  };
}, Xs = (e) => {
  const {
    componentCls: t,
    paddingSM: r,
    paddingXS: n,
    lineHeight: s,
    fontSize: o,
    fontSizeSM: a,
    calc: l
  } = e;
  return {
    [t]: {
      [`&${t}-system`]: {
        width: "100%",
        justifyContent: "center",
        [`${t}-content`]: {
          display: "flex",
          gap: `${se(a)}`,
          alignItems: "center",
          minHeight: l(n).mul(2).add(l(s).mul(o)).equal(),
          fontSize: `${se(o)}`,
          paddingInline: `${se(r)}`,
          paddingBlock: `${se(n)}`
        },
        [`${t}-system-content`]: {},
        [`${t}-system-extra`]: {}
      }
    }
  };
}, Fs = () => ({
  typingContent: '"|"',
  typingAnimationName: "cursorBlink",
  typingAnimationDuration: "0.8s"
}), Rt = tt("Bubble", (e) => {
  const t = et(e, {});
  return [
    // 位置越靠后，样式优先级越高
    Hs(t),
    _s(t),
    Os(t),
    zs(t),
    ks(t),
    Xs(t),
    Ls(t)
  ];
}, Fs);
function Ks(e) {
  return !e || e.length === 0 ? "" : e.reduce((t, r) => {
    let n = 0;
    for (; n < t.length && n < r.length && t[n] === r[n]; )
      n++;
    return t.slice(0, n);
  });
}
function qs({
  streaming: e,
  content: t,
  typing: r,
  onTyping: n,
  onTypingComplete: s
}) {
  const [o, a] = i.useState([]), l = i.useRef(!1), c = i.useRef(""), d = i.useRef(1), u = i.useRef(-1), m = i.useRef(e);
  m.current = e;
  const p = i.useMemo(() => {
    const S = {
      effect: "fade-in",
      interval: 100,
      step: 6,
      keepPrefix: !0
    };
    if (r === !0) return S;
    const {
      step: $ = 6,
      interval: v = 100
    } = r, B = (W) => typeof W == "number";
    if (!B(v) || v <= 0)
      throw "[Bubble] invalid prop typing.interval, expect positive number.";
    if (!B($) && !Array.isArray($))
      throw "[Bubble] invalid prop typing.step, expect positive number or positive number array";
    if (B($) && $ <= 0)
      throw "[Bubble] invalid prop typing.step, expect positive number";
    if (Array.isArray($)) {
      if (!B($[0]) || $[0] <= 0)
        throw "[Bubble] invalid prop typing.step[0], expect positive number";
      if (!B($[1]) || $[1] <= 0)
        throw "[Bubble] invalid prop typing.step[1], expect positive number";
      if ($[0] > $[1])
        throw "[Bubble] invalid prop typing.step, step[0] should less than step[1]";
    }
    return {
      ...S,
      ...r
    };
  }, [r]), f = i.useRef({
    content: t,
    interval: p.interval,
    step: p.step
  });
  f.current = {
    content: t,
    interval: p.interval,
    step: p.step
  };
  const h = () => Math.random().toString().slice(2), y = i.useCallback((S) => {
    let $ = 0;
    c.current = p.keepPrefix ? Ks([f.current.content, c.current]) : "", a(c.current ? [{
      text: c.current,
      id: h(),
      taskId: S,
      done: !0
    }] : []);
    const v = () => {
      if (S !== d.current) return;
      const B = performance.now(), {
        content: W,
        interval: V,
        step: U
      } = f.current;
      if (B - $ < V) {
        u.current = requestAnimationFrame(v);
        return;
      }
      const N = c.current.length, I = typeof U == "number" ? U : Math.floor(Math.random() * (U[1] - U[0])) + U[0], D = W.slice(N, N + I);
      if (!D) {
        if (m.current) {
          u.current = requestAnimationFrame(v);
          return;
        }
        a((R) => [{
          text: R.map(({
            text: G
          }) => G).join(""),
          id: h(),
          taskId: S,
          done: !0
        }]), s == null || s(W), l.current = !1, d.current++;
        return;
      }
      c.current += D;
      const T = {
        id: h(),
        text: D,
        taskId: S,
        done: !1
      };
      a((R) => R.concat(T)), l.current || (l.current = !0), $ = B, u.current = requestAnimationFrame(v), n == null || n(c.current, W);
    };
    v();
  }, [p.keepPrefix, n, s]), C = i.useCallback(() => {
    cancelAnimationFrame(u.current), a([]), c.current = "", l.current = !1;
  }, []);
  return xr(() => {
    if (!t) return C();
    t !== c.current && (l.current && !t.startsWith(c.current) ? (cancelAnimationFrame(u.current), l.current = !1, requestAnimationFrame(() => y(++d.current))) : l.current === !1 && y(d.current));
  }, [t, y]), {
    renderedData: o,
    animating: l.current,
    memoedAnimationCfg: p
  };
}
const Vs = ({
  prefixCls: e,
  streaming: t,
  content: r,
  typing: n,
  onTyping: s,
  onTypingComplete: o
}) => {
  const {
    renderedData: a,
    animating: l,
    memoedAnimationCfg: c
  } = qs({
    streaming: t,
    content: r,
    typing: n,
    onTyping: s,
    onTypingComplete: o
  }), {
    effect: d
  } = c, u = a.map((p) => d === "fade-in" && !p.done ? /* @__PURE__ */ i.createElement("span", {
    key: p.id,
    className: "fade-in"
  }, p.text) : p.text), m = n === !0 ? !1 : d === "typing";
  return /* @__PURE__ */ i.createElement("div", {
    className: M({
      [`${e}-typing`]: m && l,
      [`${e}-fade-in`]: !m
    })
  }, u);
}, Ws = ({
  prefixCls: e,
  rootClassName: t,
  style: r,
  className: n,
  styles: s = {},
  classNames: o = {},
  placement: a = "start",
  content: l,
  contentRender: c,
  editable: d = !1,
  typing: u,
  streaming: m = !1,
  variant: p = "filled",
  shape: f = "default",
  header: h,
  footer: y,
  avatar: C,
  extra: S,
  footerPlacement: $,
  loading: v,
  loadingRender: B,
  onTyping: W,
  onTypingComplete: V,
  onEditConfirm: U,
  onEditCancel: N,
  ...I
}, D) => {
  const T = i.useRef(null);
  i.useImperativeHandle(D, () => ({
    nativeElement: T.current
  }));
  const R = Ie("bubble"), {
    direction: G,
    getPrefixCls: j
  } = pe(), K = j("bubble", e), P = i.useContext(qn), [F, J] = Rt(K), L = {
    ...R.style,
    ...R.styles.root,
    ...s.root,
    ...r
  }, k = M(K, R.className, R.classNames.root, o.root, t, n, F, J, `${K}-${a}`, {
    [`${K}-${P.status}`]: P.status,
    [`${K}-rtl`]: G === "rtl",
    [`${K}-loading`]: v
  }), z = Me(I, {
    attr: !0,
    aria: !0,
    data: !0
  }), q = {
    key: P == null ? void 0 : P.key,
    status: P == null ? void 0 : P.status,
    extraInfo: P == null ? void 0 : P.extraInfo
  }, X = i.useMemo(() => c ? c(l, q) : l, [l, c, q.key, q.status, q.extraInfo]), oe = typeof u == "function" ? u(l, q) : u, Q = !!oe && typeof X == "string";
  i.useEffect(() => {
    Q || m || l && (V == null || V(l));
  }, [X, Q, m]);
  const x = $ || (a === "start" ? "outer-start" : "outer-end"), ne = typeof d == "boolean" ? d : d.editing, ee = () => {
    if (v) return B ? B() : /* @__PURE__ */ i.createElement(As, {
      prefixCls: K
    });
    const ue = /* @__PURE__ */ i.createElement(i.Fragment, null, Q ? /* @__PURE__ */ i.createElement(Vs, {
      prefixCls: K,
      streaming: m,
      typing: oe,
      content: X,
      onTyping: W,
      onTypingComplete: V
    }) : X), Oe = x.includes("inner");
    return /* @__PURE__ */ i.createElement("div", {
      className: Y("body"),
      style: ae("body")
    }, _e(), /* @__PURE__ */ i.createElement("div", {
      style: {
        ...R.styles.content,
        ...s.content
      },
      className: M(`${K}-content`, `${K}-content-${p}`, R.classNames.content, o.content, {
        [`${K}-content-${P == null ? void 0 : P.status}`]: P == null ? void 0 : P.status,
        [`${K}-content-${f}`]: p !== "borderless",
        [`${K}-content-editing`]: ne,
        [`${K}-content-string`]: typeof X == "string"
      })
    }, ne ? /* @__PURE__ */ i.createElement(Is, {
      prefixCls: K,
      content: l,
      okText: d == null ? void 0 : d.okText,
      cancelText: d == null ? void 0 : d.cancelText,
      onEditConfirm: U,
      onEditCancel: N
    }) : /* @__PURE__ */ i.createElement(i.Fragment, null, Oe ? /* @__PURE__ */ i.createElement("div", {
      className: M(`${K}-content-with-footer`)
    }, ue) : ue, Oe && ve())), !ne && !Oe && ve());
  }, Y = (ue) => M(`${K}-${ue}`, R.classNames[ue], o[ue]), ae = (ue) => ({
    ...R.styles[ue],
    ...s[ue]
  }), ce = (ue) => typeof ue == "function" ? ue(l, q) : ue, $e = () => C ? /* @__PURE__ */ i.createElement("div", {
    className: Y("avatar"),
    style: ae("avatar")
  }, ce(C)) : null, be = () => S ? /* @__PURE__ */ i.createElement("div", {
    className: Y("extra"),
    style: ae("extra")
  }, ce(S)) : null, _e = () => h ? /* @__PURE__ */ i.createElement("div", {
    className: Y("header"),
    style: ae("header")
  }, ce(h)) : null, ve = () => {
    if (!y) return null;
    const ue = M(Y("footer"), {
      [`${K}-footer-start`]: x.includes("start"),
      [`${K}-footer-end`]: x.includes("end")
    });
    return /* @__PURE__ */ i.createElement("div", {
      className: ue,
      style: ae("footer")
    }, ce(y));
  };
  return /* @__PURE__ */ i.createElement("div", re({
    className: k,
    style: L
  }, I, z, {
    ref: T
  }), $e(), ee(), !ne && !v && be());
}, We = /* @__PURE__ */ i.forwardRef(Ws);
process.env.NODE_ENV !== "production" && (We.displayName = "Bubble");
const js = ({
  prefixCls: e,
  content: t = "",
  rootClassName: r,
  style: n,
  className: s,
  styles: o = {},
  classNames: a = {},
  dividerProps: l,
  ...c
}, d) => {
  const {
    getPrefixCls: u
  } = pe(), m = Ie("bubble"), p = u("bubble", e), [f, h] = Rt(p), y = M(f, h, p, `${p}-divider`, m.className, m.classNames.root, s, a.root, r), C = (S) => /* @__PURE__ */ i.createElement(An, l, S);
  return /* @__PURE__ */ i.createElement(We, re({
    ref: d,
    style: n,
    styles: o,
    className: y,
    classNames: a,
    prefixCls: p,
    variant: "borderless",
    content: t,
    contentRender: C
  }, c));
}, Gt = /* @__PURE__ */ i.forwardRef(js);
process.env.NODE_ENV !== "production" && (Gt.displayName = "DividerBubble");
function Us(e) {
  const t = le(null), r = le(!0), n = le(!1), s = le(0), o = le(void 0), a = le(!1), l = !e || getComputedStyle(e).flexDirection !== "column-reverse";
  ye(() => {
    if (l) return;
    if (!t.current) {
      const f = document.createElement("div");
      f.style.bottom = "0", f.style.flexShrink = "0", f.style.pointerEvents = "none", f.style.height = "10px", f.style.visibility = "hidden", e.insertBefore(f, e.firstChild), t.current = f;
    }
    const m = new IntersectionObserver(([f]) => {
      r.current = f.isIntersecting, n.current = !f.isIntersecting;
    }, {
      root: e,
      threshold: 0
    });
    m.observe(t.current);
    const p = new MutationObserver(() => {
      n.current && !l && d();
    });
    return p.observe(e, {
      childList: !0,
      subtree: !0,
      attributes: !1
    }), () => {
      m.disconnect(), p.disconnect(), clearTimeout(o.current), t.current && t.current.parentNode && (t.current.parentNode.removeChild(t.current), t.current = null);
    };
  }, [e, l]);
  const c = ze(() => {
    const {
      scrollTop: m,
      scrollHeight: p
    } = e;
    if (s.current = p + m, a.current) {
      a.current = !1;
      return;
    }
    o.current && clearTimeout(o.current), o.current = setTimeout(() => {
      clearTimeout(o.current), o.current = void 0;
    }, 50);
  }, [e]);
  ye(() => (l || e.addEventListener("scroll", c, {
    capture: !0
  }), () => e == null ? void 0 : e.removeEventListener("scroll", c, {
    capture: !0
  })), [e, l, c]);
  const d = ze(() => {
    if (o.current) return;
    const m = s.current - e.scrollHeight;
    e.scrollTop = m, a.current = !0;
  }, [e]);
  return {
    reset: ze(() => {
      l || (r.current = !0, n.current = !1, s.current = e.scrollHeight);
    }, [e, l])
  };
}
const Gs = ({
  prefixCls: e,
  content: t,
  variant: r = "shadow",
  shape: n,
  style: s,
  className: o,
  styles: a = {},
  classNames: l = {},
  rootClassName: c,
  ...d
}, u) => {
  const m = Ie("bubble"), {
    getPrefixCls: p
  } = pe(), f = p("bubble", e), [h, y] = Rt(f), C = `${f}-system`, S = M(h, y, C, f, m.className, m.classNames.root, l.root, o, c);
  return /* @__PURE__ */ i.createElement(We, re({
    ref: u,
    style: s,
    className: S,
    styles: a,
    classNames: l,
    variant: r,
    shape: n,
    content: t
  }, d));
}, Yt = /* @__PURE__ */ i.forwardRef(Gs);
process.env.NODE_ENV !== "production" && (Yt.displayName = "SystemBubble");
function Ys(e) {
  return typeof e == "function" && e instanceof Function;
}
const Zs = /* @__PURE__ */ A.memo(We), Js = /* @__PURE__ */ A.memo(Gt), Qs = /* @__PURE__ */ A.memo(Yt), eo = (e) => {
  const {
    _key: t,
    bubblesRef: r,
    extraInfo: n,
    status: s,
    role: o,
    classNames: a = {},
    styles: l = {},
    ...c
  } = e, d = A.useCallback((v) => {
    v ? r.current[t] = v : delete r.current[t];
  }, [t]), {
    bubble: u,
    divider: m,
    system: p,
    ...f
  } = a, {
    bubble: h,
    divider: y,
    system: C,
    ...S
  } = l;
  let $ = /* @__PURE__ */ A.createElement(Zs, re({
    ref: d,
    style: h,
    className: u,
    classNames: f,
    styles: S
  }, c));
  return o === "divider" ? $ = /* @__PURE__ */ A.createElement(Js, re({
    ref: d,
    style: y,
    className: m,
    classNames: f,
    styles: S
  }, c)) : o === "system" && ($ = /* @__PURE__ */ A.createElement(Qs, re({
    ref: d,
    style: C,
    className: p,
    classNames: f,
    styles: S
  }, c))), /* @__PURE__ */ A.createElement(qn.Provider, {
    value: {
      key: t,
      status: s,
      extraInfo: n
    }
  }, $);
}, to = (e, t) => {
  var T;
  const {
    prefixCls: r,
    rootClassName: n,
    className: s,
    styles: o = {},
    classNames: a = {},
    style: l,
    items: c,
    autoScroll: d = !0,
    role: u,
    onScroll: m,
    ...p
  } = e, f = $r(p, {
    attr: !0,
    aria: !0
  }), h = A.useRef(null), y = A.useRef(null), C = A.useRef({}), {
    reset: S
  } = Us(d ? y.current : null), {
    getPrefixCls: $
  } = pe(), v = $("bubble", r), B = `${v}-list`, [W, V] = Rt(v), U = M(B, n, s, a.root, W, V), N = {
    ...o.root,
    ...l
  }, I = ((T = c[c.length - 1]) == null ? void 0 : T.key) || c.length;
  A.useEffect(() => {
    var R;
    y.current && (S(), (R = y.current) == null || R.scrollTo({
      top: d ? 0 : y.current.scrollHeight
    }));
  }, [I, d, S]), ut(t, () => ({
    nativeElement: h.current,
    scrollBoxNativeElement: y.current,
    scrollTo: ({
      key: R,
      top: G,
      behavior: j = "smooth",
      block: K
    }) => {
      var J, L, k;
      const {
        scrollHeight: P,
        clientHeight: F
      } = y.current;
      if (typeof G == "number")
        (J = y.current) == null || J.scrollTo({
          top: d ? -P + F + G : G,
          behavior: j
        });
      else if (G === "bottom") {
        const z = d ? 0 : P;
        (L = y.current) == null || L.scrollTo({
          top: z,
          behavior: j
        });
      } else if (G === "top") {
        const z = d ? -P : 0;
        (k = y.current) == null || k.scrollTo({
          top: z,
          behavior: j
        });
      } else R && C.current[R] && C.current[R].nativeElement.scrollIntoView({
        behavior: j,
        block: K
      });
    }
  }));
  const D = d ? [...c].reverse() : c;
  return /* @__PURE__ */ A.createElement("div", re({}, f, {
    className: U,
    style: N,
    ref: h
  }), /* @__PURE__ */ A.createElement("div", {
    className: M(`${B}-scroll-box`, a.scroll, {
      [`${B}-autoscroll`]: d
    }),
    style: o.scroll,
    ref: y,
    onScroll: m
  }, D.map((R) => {
    let G;
    if (R.role && u) {
      const j = u[R.role];
      G = {
        ...Ys(j) ? j(R) : j,
        ...R
      };
    } else
      G = R;
    return /* @__PURE__ */ A.createElement(eo, re({
      classNames: a,
      styles: o
    }, vr(G, ["key"]), {
      key: R.key,
      _key: R.key,
      bubblesRef: C
    }));
  })));
}, Vn = /* @__PURE__ */ A.forwardRef(to);
process.env.NODE_ENV !== "production" && (Vn.displayName = "BubbleList");
We.List = Vn;
We.System = Yt;
We.Divider = Gt;
const no = (e) => {
  const {
    componentCls: t
  } = e;
  return {
    [t]: {
      [`${t}-header`]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: e.colorText,
        background: e.colorFillContent,
        padding: e.paddingSM,
        borderStartStartRadius: e.borderRadius,
        borderStartEndRadius: e.borderRadius
      },
      [`${t}-header-title`]: {
        fontSize: e.fontSize,
        fontWeight: e.fontWeightStrong
      },
      [`${t}-code`]: {
        borderEndEndRadius: e.borderRadius,
        borderEndStartRadius: e.borderRadius,
        borderStartStartRadius: 0,
        borderStartEndRadius: 0,
        background: e.colorBgContainer,
        border: `1px solid ${e.colorBorderSecondary}`,
        borderTop: "none",
        overflow: "hidden",
        "pre,code": {
          whiteSpace: "pre",
          fontSize: e.fontSize,
          fontFamily: e.fontFamilyCode,
          lineHeight: 2,
          borderRadius: 0,
          border: "none"
        },
        "code[class*='language-'],pre[class*='language-']": {
          background: "none"
        }
      },
      [`&${t}-rtl`]: {
        direction: "rtl"
      }
    }
  };
}, ro = (e) => ({
  colorBgTitle: e.colorFillContent,
  colorBorderCode: e.colorBorderSecondary,
  colorTextTitle: e.colorText
}), so = tt("CodeHighlighter", (e) => {
  const t = et(e, {});
  return [no(t)];
}, ro), oo = {
  ...sn,
  'pre[class*="language-"]': {
    ...sn['pre[class*="language-"]'],
    margin: 0
  }
}, io = /* @__PURE__ */ i.forwardRef((e, t) => {
  var W, V;
  const {
    lang: r,
    children: n,
    header: s,
    prefixCls: o,
    className: a,
    classNames: l = {},
    styles: c = {},
    style: d = {},
    highlightProps: u,
    ...m
  } = e, {
    getPrefixCls: p,
    direction: f
  } = pe(), h = p("codeHighlighter", o), [y, C] = so(h), S = Ie("codeHighlighter"), $ = M(h, S.className, a, (W = S.classNames) == null ? void 0 : W.root, l.root, y, C, {
    [`${h}-rtl`]: f === "rtl"
  }), v = {
    ...S.style,
    ...c == null ? void 0 : c.root,
    ...d
  }, B = () => {
    var U, N, I, D;
    return s === null ? null : s || /* @__PURE__ */ i.createElement("div", {
      className: M(`${h}-header`, (U = S.classNames) == null ? void 0 : U.header, l.header),
      style: {
        ...(N = S.styles) == null ? void 0 : N.header,
        ...c.header
      }
    }, /* @__PURE__ */ i.createElement("span", {
      className: M(`${h}-header-title`, l.headerTitle, (I = S.classNames) == null ? void 0 : I.headerTitle),
      style: {
        ...(D = S.styles) == null ? void 0 : D.headerTitle,
        ...c.headerTitle
      }
    }, r), /* @__PURE__ */ i.createElement(Xe.Copy, {
      text: n
    }));
  };
  return n ? r ? /* @__PURE__ */ i.createElement("div", re({
    ref: t,
    className: $,
    style: v
  }, m), B(), /* @__PURE__ */ i.createElement("div", {
    className: M(`${h}-code`, (V = S.classNames) == null ? void 0 : V.code, l.code),
    style: {
      ...S.styles.code,
      ...c.code
    }
  }, /* @__PURE__ */ i.createElement(Er, re({
    language: r,
    wrapLines: !0,
    style: oo
  }, u), n.replace(/\n$/, "")))) : /* @__PURE__ */ i.createElement("code", null, n) : null;
});
process.env.NODE_ENV !== "production" && (io.displayName = "CodeHighlighter");
const _t = () => ({
  height: 0,
  opacity: 0
}), cn = (e) => {
  const {
    scrollHeight: t
  } = e;
  return {
    height: t,
    opacity: 1
  };
}, ao = (e) => ({
  height: e ? e.offsetHeight : 0
}), Ot = (e, t) => (t == null ? void 0 : t.deadline) === !0 || t.propertyName === "height", lo = (e = rs) => ({
  motionName: `${e}-motion-collapse`,
  onAppearStart: _t,
  onEnterStart: _t,
  onAppearActive: cn,
  onEnterActive: cn,
  onLeaveStart: ao,
  onLeaveActive: _t,
  onAppearEnd: Ot,
  onEnterEnd: Ot,
  onLeaveEnd: Ot,
  motionDeadline: 500
}), co = (e, t, r) => {
  const n = typeof e == "boolean" || (e == null ? void 0 : e.expandedKeys) === void 0, [s, o, a, l] = i.useMemo(() => {
    let p = {
      expandedKeys: [],
      defaultExpandedKeys: [],
      onExpand: () => {
      }
    };
    return e ? (typeof e == "object" && (p = {
      ...p,
      ...e
    }), [!0, p.defaultExpandedKeys, p.expandedKeys, p.onExpand]) : [!1, p.defaultExpandedKeys, p.expandedKeys, p.onExpand];
  }, [e]), [c, d] = Wt(o || [], {
    value: n ? void 0 : a,
    onChange: l
  }), u = (p) => {
    d((f) => {
      const h = n ? f : a, y = h.includes(p) ? h.filter((C) => C !== p) : [...h, p];
      return l == null || l(y), y;
    });
  }, m = i.useMemo(() => s ? {
    ...lo(r),
    motionAppear: !1,
    leavedClassName: `${t}-content-hidden`
  } : {}, [r, t, s]);
  return [s, c, s ? u : void 0, m];
}, Ke = {
  Alt: ["altKey", "⌥", "Alt"],
  Ctrl: ["ctrlKey", "⌃", "Ctrl"],
  Meta: ["metaKey", "⌘", "Win"],
  Shift: ["shiftKey", "⇧", "Shift"]
}, Xt = Array.from({
  length: 9
}, (e, t) => vn.ONE + t), dn = /(mac|iphone|ipod|ipad)/i.test(typeof navigator < "u" ? navigator == null ? void 0 : navigator.platform : ""), un = (e) => {
  var t, r, n;
  return e === "number" ? e : typeof e == "string" && ((t = Ke == null ? void 0 : Ke[e]) != null && t[dn ? 1 : 2]) ? Ke[e][dn ? 1 : 2] : ((n = (r = Object.entries(vn || {})) == null ? void 0 : r.find(([s, o]) => o === e)) == null ? void 0 : n[0]) || "";
}, uo = (e, t) => {
  const r = [...e], n = r.pop();
  return r.reduce((a, l) => {
    var c;
    return a && (t[(c = Ke == null ? void 0 : Ke[l]) == null ? void 0 : c[0]] || !1);
  }, n === t.keyCode) ? {
    actionShortcutKey: e,
    actionKeyCodeNumber: Xt.indexOf(t.keyCode) > -1 ? Xt.indexOf(t.keyCode) : !1,
    actionKeyCode: t.keyCode,
    timeStamp: t.timeStamp
  } : !1;
}, mo = (e) => {
  const t = [...e], r = t.pop();
  return {
    keyCodeDict: r === "number" ? Xt : [r],
    prefixKeys: t
  };
}, mn = (e, t, r) => {
  const n = !!e.find(({
    shortcutKey: s
  }) => s.toString() === t.toString());
  Nt(!n, r, `Same shortcutKey ${t.toString()}`);
}, fo = (e, t, r) => {
  const n = Object.assign({}, t || {}, r);
  return Object.keys(n).reduce(({
    flattenShortcutKeys: s,
    shortcutKeysInfo: o
  }, a) => {
    const l = n[a];
    if (!Array.isArray(l))
      return {
        flattenShortcutKeys: s,
        shortcutKeysInfo: o
      };
    if (o = {
      ...o,
      [a]: {
        shortcutKeys: l,
        shortcutKeysIcon: []
      }
    }, l.every((c) => Array.isArray(c)))
      l.forEach((c, d) => {
        const u = c;
        mn(s, u, e), s.push({
          name: a,
          shortcutKey: u,
          index: d
        }), o[a].shortcutKeysIcon.push(u == null ? void 0 : u.map((m) => un(m)));
      });
    else {
      const {
        keyCodeDict: c,
        prefixKeys: d
      } = mo(l);
      c.forEach((u) => {
        mn(s, [...d, u], e), s.push({
          name: a,
          shortcutKey: [...d, u]
        });
      }), o[a].shortcutKeysIcon = l.map((u) => un(u));
    }
    return {
      flattenShortcutKeys: s,
      shortcutKeysInfo: o
    };
  }, {
    flattenShortcutKeys: [],
    shortcutKeysInfo: {}
  });
}, po = () => {
  const e = le(void 0);
  return [e, (r) => {
    e.current = r;
  }];
}, go = (e, t) => {
  const r = Ie(e), {
    flattenShortcutKeys: n,
    shortcutKeysInfo: s
  } = fo(e, r.shortcutKeys, t), [o, a] = Se(null), [l, c] = po(), d = le(!1), u = (p) => {
    var f;
    for (const h of n) {
      const y = uo(h.shortcutKey, p);
      if (y) {
        const C = {
          ...y,
          name: h.name,
          index: h == null ? void 0 : h.index
        };
        if (d.current)
          return;
        d.current = !0, a(C), (f = l == null ? void 0 : l.current) == null || f.call(l, C);
      }
    }
  }, m = () => {
    d.current = !1;
  };
  return ye(() => {
    if (n.length !== 0)
      return document.addEventListener("keydown", u), document.addEventListener("keyup", m), () => {
        document.removeEventListener("keydown", u), document.addEventListener("keyup", m);
      };
  }, [n.length, l]), [o, s, c];
}, fn = ({
  shortcutKeysIcon: e,
  prefixCls: t
}) => {
  const [r] = Ve("Conversations", Te.Conversations), n = !!(e != null && e.length);
  return /* @__PURE__ */ i.createElement("div", {
    className: M(t, {
      [`${t}-shortcut-keys-show`]: n
    })
  }, /* @__PURE__ */ i.createElement("span", null, r.create), n && /* @__PURE__ */ i.createElement("span", {
    className: M(`${t}-shortcut-keys`)
  }, e.map((s) => /* @__PURE__ */ i.createElement("span", {
    className: M(`${t}-shortcut-key`),
    key: s
  }, s))));
}, ho = ({
  icon: e,
  label: t,
  align: r,
  shortcutKeyInfo: n,
  prefixCls: s
}) => {
  const {
    shortcutKeysIcon: o
  } = n || {}, a = {
    label: /* @__PURE__ */ i.createElement(fn, {
      prefixCls: `${s}-label`,
      shortcutKeysIcon: o
    }),
    icon: /* @__PURE__ */ i.createElement(Fr, {
      className: `${s}-icon`
    }),
    align: "center"
  };
  return t && (a.label = typeof t == "function" ? t({
    shortcutKeyInfo: n,
    components: {
      CreationLabel: fn
    }
  }) : t), e && (a.icon = typeof e == "function" ? e() : e), [a.icon, a.label, r || a.align];
}, Wn = ({
  className: e,
  icon: t,
  label: r,
  align: n,
  style: s,
  disabled: o,
  onClick: a,
  prefixCls: l,
  shortcutKeyInfo: c
}) => {
  const [d, u, m] = ho({
    prefixCls: l,
    label: r,
    icon: t,
    align: n,
    shortcutKeyInfo: c
  });
  return /* @__PURE__ */ A.createElement("button", {
    type: "button",
    onClick: (p) => {
      o || a == null || a(p);
    },
    style: s,
    className: M(l, e, `${l}-${m}`, {
      [`${l}-disabled`]: o
    })
  }, d, u);
}, jn = /* @__PURE__ */ i.createContext(null), yo = ({
  className: e,
  children: t
}) => {
  var y;
  const {
    prefixCls: r,
    groupInfo: n,
    enableCollapse: s,
    expandedKeys: o,
    onItemExpand: a,
    collapseMotion: l
  } = i.useContext(jn) || {}, {
    label: c,
    name: d,
    collapsible: u
  } = n || {}, m = typeof c == "function" ? c(d, {
    groupInfo: n
  }) : c || d, p = u && s, f = () => {
    p && (a == null || a(n.name));
  }, h = p && !!((y = o == null ? void 0 : o.includes) != null && y.call(o, d));
  return /* @__PURE__ */ i.createElement("li", {
    className: e
  }, /* @__PURE__ */ i.createElement("div", {
    className: M(`${r}-group-title`, {
      [`${r}-group-title-collapsible`]: p
    }),
    onClick: f
  }, m && /* @__PURE__ */ i.createElement("div", {
    className: M(`${r}-group-label`)
  }, m), p && /* @__PURE__ */ i.createElement("div", {
    className: M(`${r}-group-collapse-trigger `, `${r}-group-collapse-trigger-${h ? "open" : "close"}`)
  }, /* @__PURE__ */ i.createElement(Kr, null))), /* @__PURE__ */ i.createElement(Vt, re({}, l, {
    visible: p ? h : !0
  }), ({
    className: C,
    style: S
  }, $) => /* @__PURE__ */ i.createElement("div", {
    className: M(C),
    ref: $,
    style: S
  }, t)));
}, bo = (e, t = []) => {
  const [r, n, s] = Ye(() => {
    let o = {
      label: "",
      collapsibleHandle: !1,
      collapsibleOptions: {}
    };
    if (!e)
      return ["", o.collapsibleHandle, o.collapsibleOptions];
    if (typeof e == "object") {
      const {
        collapsible: a,
        defaultExpandedKeys: l,
        expandedKeys: c,
        onExpand: d,
        ...u
      } = e;
      o = {
        ...o,
        ...u,
        collapsibleHandle: a,
        collapsibleOptions: {
          defaultExpandedKeys: l,
          expandedKeys: c,
          onExpand: d
        }
      };
    }
    return [o.label, o.collapsibleHandle, o.collapsibleOptions];
  }, [e]);
  return i.useMemo(() => {
    const o = t.reduce((l, c) => {
      if ((c == null ? void 0 : c.type) === "divider" || !c.group || !e)
        return l.push({
          data: [c],
          name: "",
          label: "",
          enableGroup: !1,
          collapsible: !1
        }), l;
      const d = c, u = l.some((p, f) => p.name === (d == null ? void 0 : d.group) ? (l[f].data.push(d), !0) : !1), m = typeof n == "function" ? n == null ? void 0 : n(d == null ? void 0 : d.group) : n;
      return u || l.push({
        data: [d],
        enableGroup: !0,
        name: d == null ? void 0 : d.group,
        label: r,
        collapsible: m
      }), l;
    }, []), a = o.reduce((l, c) => (c.data.forEach((d) => {
      d.type !== "divider" && l.push({
        key: d.key,
        disabled: d.disabled
      });
    }), l), []);
    return [o, s, a];
  }, [t, s]);
}, pn = (e) => {
  e.stopPropagation();
}, Co = (e) => {
  const {
    prefixCls: t,
    info: r,
    className: n,
    direction: s,
    onClick: o,
    active: a,
    menu: l,
    ...c
  } = e, d = Me(c, {
    aria: !0,
    data: !0,
    attr: !0
  }), {
    disabled: u
  } = r, m = M(n, `${t}-item`, {
    [`${t}-item-active`]: a && !u
  }, {
    [`${t}-item-disabled`]: u
  }), p = () => {
    !u && o && o(r.key);
  }, {
    trigger: f,
    ...h
  } = l || {}, y = h == null ? void 0 : h.getPopupContainer, C = (S) => {
    const $ = /* @__PURE__ */ i.createElement(Nn, {
      onClick: pn,
      className: `${t}-menu-icon`
    });
    return f ? typeof f == "function" ? f(S, {
      originNode: $
    }) : f : $;
  };
  return /* @__PURE__ */ i.createElement("li", re({
    title: typeof r.label == "object" ? void 0 : `${r.label}`
  }, d, {
    className: m,
    onClick: p
  }), r.icon && /* @__PURE__ */ i.createElement("div", {
    className: `${t}-icon`
  }, r.icon), /* @__PURE__ */ i.createElement(Mn.Text, {
    className: `${t}-label`
  }, r.label), !u && l && /* @__PURE__ */ i.createElement("div", {
    onClick: pn
  }, /* @__PURE__ */ i.createElement(jt, {
    menu: h,
    placement: s === "rtl" ? "bottomLeft" : "bottomRight",
    trigger: ["click"],
    disabled: u,
    getPopupContainer: y
  }, C(r))));
}, So = (e) => {
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
      [`&${t}-rtl`]: {
        direction: "rtl"
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
          border: `${se(e.lineWidth)} ${e.lineType}, ${e.creationBorderColor}`
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
          gap: se(4)
        },
        "&-label-shortcut-key": {
          borderRadius: e.borderRadiusSM,
          height: "100%",
          boxSizing: "border-box",
          fontSize: e.fontSizeIcon,
          paddingInline: `${se(r(e.paddingXXS).sub(1).equal())}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: e.shortcutKeyTextColor,
          border: `${se(e.lineWidth)} ${e.lineType}, ${e.creationBorderColor}`
        },
        "&-disabled": {
          cursor: "not-allowed",
          background: e.colorBgContainerDisabled,
          [`& ${t}-creation-label, ${t}-creation-icon`]: {
            color: e.colorTextDisabled
          },
          [`& ${t}-creation-label-shortcut-keys`]: {
            color: e.colorTextDisabled,
            border: `${se(e.lineWidth)} ${e.lineType}, ${e.colorBgContainerDisabled}`
          }
        }
      },
      [`${t}-divider`]: {
        marginBlock: e.marginXXS
      },
      [`${t}-item`]: {
        display: "flex",
        height: e.controlHeightLG,
        minHeight: e.controlHeightLG,
        gap: e.paddingXS,
        padding: `0 ${se(e.paddingXS)}`,
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
      [`${t}-content-hidden`]: {
        display: "none"
      },
      [`${t}-label`]: {
        flex: 1,
        color: e.colorText,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      },
      [`${t}-menu-icon`]: {
        opacity: 0,
        fontSize: e.fontSizeXL
      },
      [`${t}-list`]: {
        display: "flex",
        gap: e.paddingXXS,
        flexDirection: "column"
      },
      [`${t}-group-collapsible-list`]: {
        paddingBlockStart: e.paddingXXS,
        [`& ${t}-item`]: {
          paddingInlineStart: e.paddingXL
        }
      },
      [`${t}-group-title`]: {
        display: "flex",
        alignItems: "center",
        color: e.colorTextDescription,
        height: e.controlHeightLG,
        minHeight: e.controlHeightLG,
        padding: `0 ${se(e.paddingXS)}`
      },
      [`${t}-group-title-collapsible`]: {
        justifyContent: "space-between",
        cursor: "pointer",
        color: e.colorText,
        borderRadius: e.borderRadiusLG,
        transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
        "&:hover": {
          backgroundColor: e.colorBgTextHover
        }
      },
      [`${t}-group-collapse-trigger`]: {
        transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
        transform: "rotate(0deg)",
        transformOrigin: "center center"
      },
      [`${t}-group-collapse-trigger-open`]: {
        transform: "rotate(90deg)"
      },
      [`${t}-group-collapse-trigger-close`]: {
        transform: "rotate(0deg)"
      }
    }
  };
}, xo = (e) => {
  const t = new xe(e.colorPrimary).setA(0.15), r = new xe(e.colorPrimary).setA(0.22), n = new xe(e.colorPrimary).setA(0.25), s = new xe(e.colorPrimary).setA(0.65);
  return {
    creationBgColor: t.toRgbString(),
    creationBorderColor: r.toRgbString(),
    creationHoverColor: n.toRgbString(),
    shortcutKeyTextColor: s.toRgbString()
  };
}, $o = tt("Conversations", (e) => {
  const t = et(e, {});
  return [So(t), os(t)];
}, xo), vo = /* @__PURE__ */ i.forwardRef((e, t) => {
  const {
    prefixCls: r,
    shortcutKeys: n,
    rootClassName: s,
    items: o,
    activeKey: a,
    defaultActiveKey: l,
    onActiveChange: c,
    menu: d,
    styles: u = {},
    classNames: m = {},
    groupable: p,
    className: f,
    style: h,
    creation: y,
    ...C
  } = e, S = Me(C, {
    attr: !0,
    aria: !0,
    data: !0
  }), $ = i.useRef(null);
  ut(t, () => ({
    nativeElement: $.current
  }));
  const [v, B] = Wt(l, {
    value: a,
    onChange: (x) => {
      x && (c == null || c(x));
    }
  }), [W, V, U] = bo(p, o), {
    getPrefixCls: N,
    direction: I
  } = pe(), D = N("conversations", r), T = Ie("conversations"), [R, G] = $o(D), j = M(D, T.className, T.classNames.root, f, m.root, s, R, G, {
    [`${D}-rtl`]: I === "rtl"
  }), K = (x) => {
    B(x);
  }, [P, F, J] = go("conversations", n);
  J((x) => {
    var ne, ee, Y;
    switch (x == null ? void 0 : x.name) {
      case "items":
        {
          const ae = (x == null ? void 0 : x.actionKeyCodeNumber) ?? (x == null ? void 0 : x.index);
          typeof ae == "number" && !((ne = U == null ? void 0 : U[ae]) != null && ne.disabled) && ((ee = U == null ? void 0 : U[ae]) != null && ee.key) && B((Y = U == null ? void 0 : U[ae]) == null ? void 0 : Y.key);
        }
        break;
      case "creation":
        typeof (y == null ? void 0 : y.onClick) == "function" && !(y != null && y.disabled) && y.onClick();
        break;
    }
  });
  const k = (x) => x.map((ne, ee) => {
    if (ne.type === "divider")
      return /* @__PURE__ */ i.createElement(An, {
        key: `key-divider-${ee}`,
        className: `${D}-divider`,
        dashed: ne.dashed
      });
    const Y = ne, {
      label: ae,
      disabled: ce,
      icon: $e,
      ...be
    } = Y;
    return /* @__PURE__ */ i.createElement(Co, re({}, be, {
      key: Y.key || `key-${ee}`,
      info: Y,
      prefixCls: D,
      direction: I,
      className: M(m.item, T.classNames.item, Y.className),
      style: {
        ...T.styles.item,
        ...u.item,
        ...Y.style
      },
      menu: typeof d == "function" ? d(Y) : d,
      active: v === Y.key,
      onClick: K
    }));
  }), z = N(), [q, X, oe, Q] = co(V, D, z);
  return /* @__PURE__ */ i.createElement("ul", re({}, S, {
    style: {
      ...T.style,
      ...h,
      ...T.styles.root,
      ...u.root
    },
    className: j,
    ref: $
  }), !!y && /* @__PURE__ */ i.createElement(Wn, re({
    className: M(T.classNames.creation, m.creation),
    style: {
      ...T.styles.creation,
      ...u.creation
    },
    shortcutKeyInfo: F == null ? void 0 : F.creation,
    prefixCls: `${D}-creation`
  }, y)), W.map((x, ne) => {
    const ee = k(x.data);
    return x.enableGroup ? /* @__PURE__ */ i.createElement(jn.Provider, {
      key: x.name || `key-${ne}`,
      value: {
        prefixCls: D,
        groupInfo: x,
        enableCollapse: q,
        expandedKeys: X,
        onItemExpand: oe,
        collapseMotion: Q
      }
    }, /* @__PURE__ */ i.createElement(yo, {
      className: M(T.classNames.group, m.group)
    }, /* @__PURE__ */ i.createElement("ul", {
      className: M(`${D}-list`, {
        [`${D}-group-collapsible-list`]: x.collapsible
      }),
      style: {
        ...T.styles.group,
        ...u.group
      }
    }, ee))) : ee;
  }));
}), Un = vo;
process.env.NODE_ENV !== "production" && (Un.displayName = "Conversations");
Un.Creation = Wn;
const Eo = (e) => {
  const {
    componentCls: t
  } = e;
  return {
    [t]: {
      [`${t}-header`]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: e.colorBgTitle,
        color: e.colorTextTitle,
        padding: e.paddingSM,
        borderStartStartRadius: e.borderRadius,
        borderStartEndRadius: e.borderRadius
      },
      [`${t}-graph`]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${e.colorBgTitle}`,
        borderTop: "none",
        padding: e.paddingSM,
        background: e.colorBgContainer,
        overflow: "auto",
        borderEndEndRadius: e.borderRadius,
        borderEndStartRadius: e.borderRadius,
        height: "400px"
      },
      [`${t}-graph-hidden`]: {
        display: "none"
      },
      [`${t}-graph svg`]: {
        maxWidth: "100%",
        maxHeight: "100%",
        height: "auto",
        width: "auto"
      },
      [`${t}-code`]: {
        borderEndEndRadius: e.borderRadius,
        borderEndStartRadius: e.borderRadius,
        borderBottom: `1px solid ${e.colorBgTitle}`,
        borderInlineStart: `1px solid ${e.colorBgTitle}`,
        borderInlineEnd: `1px solid ${e.colorBgTitle}`,
        background: e.colorBgContainer,
        paddingInline: e.paddingSM,
        paddingBlock: e.paddingSM,
        overflow: "auto",
        height: "400px",
        "pre,code": {
          whiteSpace: "pre",
          fontSize: e.fontSize,
          fontFamily: e.fontFamilyCode,
          lineHeight: 2,
          borderRadius: 0,
          border: "none"
        },
        "code[class*='language-'],pre[class*='language-']": {
          background: "none"
        }
      },
      [`&${t}-rtl`]: {
        direction: "rtl"
      }
    }
  };
}, wo = (e) => ({
  colorBgTitle: e.colorFillContent,
  colorBorderCode: e.colorBorderSecondary,
  colorBorderGraph: e.colorBorderSecondary,
  colorTextTitle: e.colorText
}), No = tt("Mermaid", (e) => {
  const t = et(e, {});
  return [Eo(t)];
}, wo);
var Ne = /* @__PURE__ */ function(e) {
  return e.Code = "code", e.Image = "image", e;
}(Ne || {});
let Ro = 0;
const Ni = /* @__PURE__ */ i.memo((e) => {
  var oe, Q;
  const {
    prefixCls: t,
    className: r,
    style: n,
    classNames: s = {},
    styles: o = {},
    header: a,
    children: l,
    highlightProps: c,
    onRenderTypeChange: d
  } = e, [u, m] = Se(Ne.Image), [p, f] = Se(1), [h, y] = Se({
    x: 0,
    y: 0
  }), [C, S] = Se(!1), [$, v] = Se({
    x: 0,
    y: 0
  }), B = le(null), W = `mermaid-${Ro++}-${(l == null ? void 0 : l.length) || 0}`;
  ye(() => {
    Ht.initialize({
      startOnLoad: !1,
      securityLevel: "strict",
      theme: "default",
      fontFamily: "monospace"
    });
  }, []);
  const [V] = Ve("Mermaid", Te.Mermaid), {
    getPrefixCls: U,
    direction: N
  } = pe(), I = U("mermaid", t), [D, T] = No(I), R = Ie("mermaid"), G = M(I, R.className, (oe = R.classNames) == null ? void 0 : oe.root, r, s.root, D, T, {
    [`${I}-rtl`]: N === "rtl"
  }), j = wr(async () => {
    if (!(!l || !B.current || u === Ne.Code))
      try {
        if (!await Ht.parse(l, {
          suppressErrors: !0
        })) throw new Error("Invalid Mermaid syntax");
        const ne = l.replace(/[`\s]+$/g, ""), {
          svg: ee
        } = await Ht.render(W, ne, B.current);
        B.current.innerHTML = ee;
      } catch (x) {
        console.warn(`Mermaid render failed: ${x}`);
      }
  }, 100);
  ye(() => {
    u === Ne.Code && B.current ? B.current.innerHTML = "" : j();
  }, [l, u]), ye(() => {
    const x = B.current;
    if (!x || u !== Ne.Image) return;
    let ne = 0;
    const ee = (Y) => {
      Y.preventDefault(), Y.stopPropagation();
      const ae = Date.now();
      if (ae - ne < 16) return;
      ne = ae;
      const ce = Y.deltaY > 0 ? -0.1 : 0.1;
      f(($e) => Math.max(0.5, Math.min(3, $e + ce)));
    };
    return x.addEventListener("wheel", ee, {
      passive: !1
    }), () => {
      x.removeEventListener("wheel", ee);
    };
  }, [u]), ye(() => {
    if (B.current && u === Ne.Image) {
      const x = B.current.querySelector("svg");
      x && (x.style.transform = `scale(${p}) translate(${h.x}px, ${h.y}px)`, x.style.transformOrigin = "center", x.style.transition = C ? "none" : "transform 0.1s ease-out", x.style.cursor = C ? "grabbing" : "grab");
    }
  }, [p, h, u, C]);
  const K = (x) => {
    u === Ne.Image && (x.preventDefault(), S(!0), v({
      x: x.clientX,
      y: x.clientY
    }));
  }, P = (x) => {
    if (!C || u !== Ne.Image) return;
    x.preventDefault();
    const ne = x.clientX - $.x, ee = x.clientY - $.y;
    y((Y) => ({
      x: Y.x + ne / p,
      y: Y.y + ee / p
    })), v({
      x: x.clientX,
      y: x.clientY
    });
  }, F = () => {
    S(!1);
  }, J = () => {
    f(1), y({
      x: 0,
      y: 0
    });
  };
  if (!l)
    return null;
  const L = async () => {
    var _e;
    const x = (_e = B.current) == null ? void 0 : _e.querySelector("svg");
    if (!x) return;
    const ne = new XMLSerializer().serializeToString(x), ee = document.createElement("canvas"), Y = ee.getContext("2d");
    if (!Y) return;
    const {
      width: ae,
      height: ce
    } = x.getBoundingClientRect(), $e = window.devicePixelRatio || 1;
    ee.width = ae * $e, ee.height = ce * $e, ee.style.width = `${ae}px`, ee.style.height = `${ce}px`, Y.scale($e, $e);
    const be = new Image();
    be.onload = () => {
      Y.drawImage(be, 0, 0, ae, ce);
      const ve = document.createElement("a");
      ve.download = `${Date.now()}.png`, ve.href = ee.toDataURL("image/png", 1), ve.click();
    }, be.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(ne)}`;
  }, k = () => {
    f((x) => Math.min(x + 0.2, 3));
  }, z = () => {
    f((x) => Math.max(x - 0.2, 0.5));
  }, q = () => {
    var ne, ee;
    if (a === null) return null;
    if (a) return a;
    const x = u === Ne.Image ? [{
      key: "zoomIn",
      icon: /* @__PURE__ */ i.createElement(qr, null),
      label: V.zoomIn,
      onItemClick: k
    }, {
      key: "zoomOut",
      icon: /* @__PURE__ */ i.createElement(Vr, null),
      label: V.zoomOut,
      onItemClick: z
    }, {
      key: "zoomReset",
      actionRender: () => /* @__PURE__ */ i.createElement(Ze, {
        title: V.zoomReset
      }, /* @__PURE__ */ i.createElement(Je, {
        type: "text",
        size: "small",
        onClick: J
      }, V.zoomReset))
    }, {
      key: "download",
      icon: /* @__PURE__ */ i.createElement(Wr, null),
      label: V.download,
      onItemClick: L
    }] : [{
      key: "copy",
      actionRender: () => /* @__PURE__ */ i.createElement(Xe.Copy, {
        text: l
      })
    }];
    return /* @__PURE__ */ i.createElement("div", {
      className: M(`${I}-header`, (ne = R.classNames) == null ? void 0 : ne.header, s == null ? void 0 : s.header),
      style: {
        ...(ee = R.styles) == null ? void 0 : ee.header,
        ...o.header
      }
    }, /* @__PURE__ */ i.createElement(Jr, {
      options: [{
        label: V.image,
        value: Ne.Image
      }, {
        label: V.code,
        value: Ne.Code
      }],
      value: u,
      onChange: (Y) => {
        m(Y), d == null || d(Y);
      }
    }), /* @__PURE__ */ i.createElement(Xe, {
      items: x
    }));
  }, X = () => {
    var x, ne, ee, Y;
    return /* @__PURE__ */ i.createElement(i.Fragment, null, /* @__PURE__ */ i.createElement("div", {
      className: M(`${I}-graph`, (x = R.classNames) == null ? void 0 : x.graph, u === Ne.Code && `${I}-graph-hidden`, s == null ? void 0 : s.graph),
      style: {
        ...(ne = R.styles) == null ? void 0 : ne.graph,
        ...o.graph
      },
      ref: B,
      onMouseDown: K,
      onMouseMove: P,
      onMouseUp: F,
      onMouseLeave: F
    }), u === Ne.Code ? /* @__PURE__ */ i.createElement("div", {
      className: M(`${I}-code`, (ee = R.classNames) == null ? void 0 : ee.code, s == null ? void 0 : s.code),
      style: {
        ...(Y = R.styles) == null ? void 0 : Y.code,
        ...o.code
      }
    }, /* @__PURE__ */ i.createElement(Nr, re({
      customStyle: {
        padding: 0,
        background: "transparent"
      },
      language: "mermaid",
      wrapLines: !0
    }, c), l.replace(/\n$/, ""))) : null);
  };
  return /* @__PURE__ */ i.createElement("div", {
    className: G,
    style: {
      ...n,
      ...R.style,
      ...(Q = R.styles) == null ? void 0 : Q.root,
      ...o.root
    }
  }, q(), X());
}), Tt = /* @__PURE__ */ i.createContext(null);
function To(e, t) {
  const {
    className: r,
    action: n,
    onClick: s,
    ...o
  } = e, a = Pr(Tt), {
    prefixCls: l,
    disabled: c,
    setSubmitDisabled: d
  } = a, u = o.disabled ?? c ?? a[`${n}Disabled`];
  return ye(() => {
    n === "onSend" && (d == null || d(u));
  }, [u, n, d]), /* @__PURE__ */ i.createElement(Je, re({
    type: "text"
  }, o, {
    ref: t,
    onClick: (m) => {
      var p;
      u || ((p = a[n]) == null || p.call(a), s == null || s(m));
    },
    disabled: u,
    className: M(l, r, {
      [`${l}-disabled`]: u
    })
  }));
}
const Mt = /* @__PURE__ */ i.forwardRef(To);
function Mo(e, t) {
  return /* @__PURE__ */ A.createElement(Mt, re({
    icon: /* @__PURE__ */ A.createElement(jr, null)
  }, e, {
    action: "onClear",
    ref: t
  }));
}
const Io = /* @__PURE__ */ A.forwardRef(Mo), Ao = /* @__PURE__ */ Br((e) => {
  const {
    className: t
  } = e, [r] = Ve("Sender", Te.Sender);
  return /* @__PURE__ */ i.createElement("svg", {
    color: "currentColor",
    viewBox: "0 0 1000 1000",
    xmlns: "http://www.w3.org/2000/svg",
    className: t
  }, /* @__PURE__ */ i.createElement("title", null, r.stopLoading), /* @__PURE__ */ i.createElement("rect", {
    fill: "currentColor",
    height: "250",
    rx: "24",
    ry: "24",
    width: "250",
    x: "375",
    y: "375"
  }), /* @__PURE__ */ i.createElement("circle", {
    cx: "500",
    cy: "500",
    fill: "none",
    r: "450",
    stroke: "currentColor",
    strokeWidth: "100",
    opacity: "0.45"
  }), /* @__PURE__ */ i.createElement("circle", {
    cx: "500",
    cy: "500",
    fill: "none",
    r: "450",
    stroke: "currentColor",
    strokeWidth: "100",
    strokeDasharray: "600 9999999"
  }, /* @__PURE__ */ i.createElement("animateTransform", {
    attributeName: "transform",
    dur: "1s",
    from: "0 500 500",
    repeatCount: "indefinite",
    to: "360 500 500",
    type: "rotate"
  })));
});
function Do(e, t) {
  const {
    prefixCls: r
  } = A.useContext(Tt), {
    className: n
  } = e;
  return /* @__PURE__ */ A.createElement(Mt, re({
    icon: /* @__PURE__ */ A.createElement(Ao, {
      className: `${r}-loading-icon`
    }),
    color: "primary",
    variant: "text",
    shape: "circle"
  }, e, {
    className: M(n, `${r}-loading-button`),
    action: "onCancel",
    ref: t
  }));
}
const Gn = /* @__PURE__ */ A.forwardRef(Do);
function Po(e, t) {
  return /* @__PURE__ */ A.createElement(Mt, re({
    icon: /* @__PURE__ */ A.createElement(Ur, null),
    type: "primary",
    shape: "circle"
  }, e, {
    action: "onSend",
    ref: t
  }));
}
const Yn = /* @__PURE__ */ A.forwardRef(Po);
function Bo(e, t) {
  const {
    speechRecording: r,
    onSpeechDisabled: n,
    prefixCls: s
  } = A.useContext(Tt);
  let o = null;
  return r ? o = /* @__PURE__ */ A.createElement(Ln, {
    className: `${s}-recording-icon`
  }) : n ? o = /* @__PURE__ */ A.createElement(Gr, null) : o = /* @__PURE__ */ A.createElement(Yr, null), /* @__PURE__ */ A.createElement(Mt, re({
    icon: o,
    color: "primary",
    variant: "text"
  }, e, {
    action: "onSpeech",
    ref: t
  }));
}
const Zn = /* @__PURE__ */ A.forwardRef(Bo), It = /* @__PURE__ */ i.createContext({});
function Ho(e, t) {
  const r = dt(e), [n, s, o] = i.useMemo(() => typeof t == "object" ? [t.recording, t.onRecordingChange, typeof t.recording == "boolean"] : [void 0, void 0, !1], [t]), [a, l] = i.useState(null);
  i.useEffect(() => {
    if (!o && "permissions" in navigator) {
      let C = null;
      return navigator.permissions.query({
        name: "microphone"
      }).then((S) => {
        l(S.state), S.onchange = function() {
          l(this.state);
        }, C = S;
      }), () => {
        C && (C.onchange = null);
      };
    }
  }, [o]);
  let c;
  !c && typeof window < "u" && (c = window.SpeechRecognition || window.webkitSpeechRecognition);
  const d = !!(o || c && a !== "denied"), u = i.useRef(null), [m, p] = En(!1, {
    value: n
  }), f = i.useRef(!1), h = () => {
    if (d && !u.current) {
      const C = new c();
      C.onstart = () => {
        p(!0);
      }, C.onend = () => {
        p(!1);
      }, C.onresult = (S) => {
        var $, v, B;
        if (!f.current) {
          const W = (B = (v = ($ = S.results) == null ? void 0 : $[0]) == null ? void 0 : v[0]) == null ? void 0 : B.transcript;
          r(W);
        }
        f.current = !1;
      }, u.current = C;
    }
  }, y = dt((C) => {
    C && !m || (f.current = C, o ? s == null || s(!m) : (h(), u.current && (m ? (u.current.stop(), s == null || s(!1)) : (u.current.start(), s == null || s(!0)))));
  });
  return [d, y, m];
}
const Jn = /* @__PURE__ */ A.createContext({}), gn = () => ({
  height: 0
}), hn = (e) => ({
  height: e.scrollHeight
});
function _o(e) {
  const {
    title: t,
    onOpenChange: r,
    open: n,
    children: s,
    className: o,
    style: a,
    classNames: l = {},
    styles: c = {},
    prefixCls: d,
    closable: u,
    forceRender: m
  } = e, {
    prefixCls: p
  } = A.useContext(Jn), {
    direction: f,
    getPrefixCls: h
  } = pe(), y = h("sender", d || p), C = `${y}-header`, S = () => {
    r == null || r(!n);
  };
  return /* @__PURE__ */ A.createElement(Vt, {
    motionEnter: !0,
    motionLeave: !0,
    motionName: `${C}-motion`,
    leavedClassName: `${C}-motion-hidden`,
    onEnterStart: gn,
    onEnterActive: hn,
    onLeaveStart: hn,
    onLeaveActive: gn,
    visible: n,
    forceRender: m
  }, ({
    className: $,
    style: v
  }) => /* @__PURE__ */ A.createElement("div", {
    className: M(y, C, $, o, {
      [`${C}-rtl`]: f === "rtl"
    }),
    style: {
      ...v,
      ...a
    }
  }, (u !== !1 || t) && /* @__PURE__ */ A.createElement("div", {
    className: (
      // We follow antd naming standard here.
      // So the header part is use `-header` suffix.
      // Though its little bit weird for double `-header`.
      M(`${C}-header`, l.header)
    ),
    style: {
      ...c.header
    }
  }, /* @__PURE__ */ A.createElement("div", {
    className: `${C}-title`
  }, t), u !== !1 && /* @__PURE__ */ A.createElement("div", {
    className: `${C}-close`
  }, /* @__PURE__ */ A.createElement(Je, {
    type: "text",
    icon: /* @__PURE__ */ A.createElement(Rn, null),
    size: "small",
    onClick: S
  }))), s && /* @__PURE__ */ A.createElement("div", {
    className: M(`${C}-content`, l.content),
    style: {
      ...c.content
    }
  }, s)));
}
const Oo = (e) => {
  const {
    componentCls: t,
    calc: r
  } = e, n = `${t}-header`;
  return {
    [t]: {
      [`&${n}-rtl`]: {
        direction: "rtl"
      },
      [`${n}`]: {
        borderBottomWidth: e.lineWidth,
        borderBottomStyle: "solid",
        borderBottomColor: e.colorBorderInput,
        // ======================== Header ========================
        [`${n}-header`]: {
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
        [`${n}-content`]: {
          padding: e.padding
        }
      },
      // ======================== Motion ========================
      [`${n}-motion`]: {
        transition: ["height", "border"].map((s) => `${s} ${e.motionDurationSlow}`).join(","),
        overflow: "hidden",
        "&-enter-start, &-leave-active": {
          borderBottomColor: "transparent"
        },
        "&-hidden": {
          display: "none"
        }
      }
    }
  };
}, Lo = (e) => {
  const {
    componentCls: t,
    antCls: r,
    calc: n
  } = e, s = `${t}-slot`, o = `${r}-input`, a = `${r}-dropdown-trigger`, l = `${t}-slot-input`, c = `${t}-slot-select`, d = `${t}-slot-tag`, u = `${t}-slot-content`, m = `${t}-skill`;
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
      [`${s}:not(${u})`]: {
        display: "inline-block",
        verticalAlign: "middle",
        alignItems: "center",
        marginBlock: 1,
        height: n(e.fontSize).mul(e.lineHeight).add(2).equal(),
        wordBreak: "break-all",
        marginInline: e.marginXXS
      },
      [`${o}${l}`]: {
        height: "100%",
        background: e.colorBgSlot,
        outline: "none",
        color: e.colorTextSlot,
        borderRadius: e.borderRadius,
        paddingInline: e.paddingXXS,
        fontSize: "inherit",
        lineHeight: "inherit",
        position: "relative",
        "&::placeholder": {
          color: e.colorTextSlotPlaceholder,
          fontSize: "inherit",
          lineHeight: "inherit"
        },
        [s]: {
          display: "inline-flex",
          margin: `0 ${se(e.marginXXS)}`,
          verticalAlign: "bottom",
          alignItems: "center",
          marginBlock: se(n(e.marginXXS).div(2).equal()),
          minHeight: e.controlHeightSM,
          wordBreak: "break-all"
        }
      },
      [c]: {
        fontSize: e.fontSize,
        lineHeight: e.lineHeight,
        paddingInline: e.paddingXXS,
        transition: `border-color  ${e.motionDurationMid}`,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
        background: e.colorBgSlot,
        height: "100%",
        boxSizing: "border-box",
        borderRadius: e.borderRadius,
        color: e.colorTextSlot,
        border: `1px solid ${e.colorBorderSlot}`,
        "&.placeholder": {
          color: e.colorTextSlotPlaceholder
        },
        [`${c}`]: {
          fontSize: e.fontSize,
          lineHeight: e.lineHeight,
          padding: `0 ${se(e.paddingXXS)}`,
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
          [`&${a}-open`]: {
            borderColor: e.colorBorderSlotHover
          }
        },
        [`${c}-value`]: {
          flex: 1,
          fontSize: e.fontSize,
          lineHeight: e.lineHeight,
          "&:empty::before": {
            content: "attr(data-placeholder)"
          }
        },
        [`${c}-arrow`]: {
          marginInlineStart: e.marginXXS,
          fontSize: e.fontSize,
          lineHeight: e.lineHeight,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        },
        [`${d}`]: {
          background: e.colorBgSlot,
          border: `1px solid ${e.colorBorderSlot}`,
          outline: "none",
          color: e.colorTextSlot,
          borderRadius: e.borderRadius,
          padding: `0 ${se(e.paddingXXS)}`,
          fontSize: e.fontSize,
          lineHeight: e.lineHeight,
          position: "relative",
          cursor: "default"
        }
      },
      [`${c}-arrow`]: {
        marginInlineStart: e.marginXXS,
        fontSize: e.fontSize,
        lineHeight: e.lineHeight,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      },
      [d]: {
        background: e.colorBgSlot,
        border: `1px solid ${e.colorBorderSlot}`,
        outline: "none",
        color: e.colorTextSlot,
        borderRadius: e.borderRadius,
        padding: `0 ${se(e.paddingXXS)}`,
        fontSize: e.fontSize,
        lineHeight: e.lineHeight,
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        cursor: "default"
      },
      [u]: {
        height: n(e.fontSize).mul(e.lineHeight).add(2).equal(),
        caretColor: e.colorPrimary,
        background: e.colorBgSlot,
        outline: "none",
        color: e.colorTextSlot,
        borderRadius: e.borderRadius,
        paddingInline: e.paddingXXS,
        boxSizing: "border-box",
        verticalAlign: "middle",
        fontSize: e.fontSize,
        marginBlock: 1,
        lineHeight: e.lineHeight,
        display: "inline-block",
        position: "relative",
        cursor: "text",
        "&:empty": {
          width: "fit-content",
          "&::after": {
            display: "inline-block",
            height: "inherit",
            content: "attr(data-placeholder)",
            color: e.colorTextSlotPlaceholder
          }
        }
      },
      [`${s}-no-width`]: {
        userSelect: "none",
        width: "3px",
        display: "inline-block",
        lineHeight: "inherit"
      },
      [m]: {
        display: "inline-block",
        verticalAlign: "baseline",
        alignItems: "center",
        marginBlock: 1,
        height: n(e.fontSize).mul(e.lineHeight).add(2).equal(),
        wordBreak: "break-all",
        paddingInlineEnd: 0,
        paddingInlineStart: 0,
        marginInlineEnd: 0,
        marginInlineStart: -1,
        [`&${m}-empty`]: {
          "&::after": {
            display: "inline-block",
            pointerEvents: "none",
            height: "inherit",
            content: "attr(data-placeholder)",
            color: e.colorTextPlaceholder
          }
        }
      },
      [`${m}-wrapper`]: {
        height: "100%",
        display: "inline-flex"
      },
      [`${m}-tag`]: {
        paddingInline: e.paddingXS,
        height: "100%",
        backgroundColor: e.colorBgSkill,
        borderRadius: e.borderRadius,
        color: e.colorPrimary,
        alignItems: "center",
        fontWeight: 500,
        display: "inline-flex",
        cursor: "pointer",
        gap: e.marginXXS,
        transition: `background-color ${e.motionDurationMid}`,
        "&:hover": {
          backgroundColor: e.colorBgSkillHover,
          [`${m}-tag-close:not(${m}-tag-close-disabled)`]: {
            color: e.colorPrimaryHover
          }
        },
        "&-close": {
          fontSize: e.fontSizeSM,
          display: "inline-flex",
          transition: `color ${e.motionDurationMid}`,
          color: e.colorPrimary
        },
        "&-close-disabled": {
          cursor: "not-allowed",
          color: e.colorTextDisabled
        }
      },
      [`${m}-holder`]: {
        width: e.marginXS,
        height: "100%"
      }
    }
  };
}, ko = (e) => {
  const {
    componentCls: t,
    antCls: r
  } = e, n = `${t}-switch`;
  return {
    [t]: {
      [`&${n}-rtl`]: {
        direction: "rtl"
      },
      [`&${n}`]: {
        display: "inline-block",
        [`${r}-btn:not(:disabled):not(${r}-btn-disabled):hover`]: {
          background: e.switchUncheckedHoverBg,
          borderColor: e.colorBorder,
          color: e.colorText
        },
        [`&${n}-checked`]: {
          [`${r}-btn:not(:disabled):not(${r}-btn-disabled):hover`]: {
            background: e.switchCheckedHoverBg,
            borderColor: e.colorPrimary,
            color: e.colorPrimaryText
          },
          [`${n}-content`]: {
            background: e.switchCheckedBg
          }
        }
      }
    }
  };
}, zo = (e) => {
  const {
    componentCls: t,
    paddingSM: r,
    paddingXS: n,
    paddingXXS: s,
    lineWidth: o,
    calc: a
  } = e;
  return {
    [t]: {
      [`&${t}-main`]: {
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        boxShadow: `${e.boxShadowTertiary}`,
        borderRadius: {
          _skip_check_: !0,
          value: a(e.borderRadius).mul(2).equal()
        },
        borderColor: e.colorBorderInput,
        borderWidth: o,
        borderStyle: "solid"
      },
      [`&${t}-disabled`]: {
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
        paddingInline: 0,
        borderRadius: 0,
        flex: "auto",
        alignSelf: "center",
        caretColor: e.colorPrimary,
        fontSize: e.fontSize
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
        paddingBlockStart: s,
        boxSizing: "border-box"
      }
    }
  };
}, Xo = (e) => {
  const {
    colorPrimary: t,
    colorFillTertiary: r
  } = e, n = new xe(t).setA(0.06).toRgbString(), s = new xe(t).setA(0.08).toRgbString(), o = new xe(t).setA(0.15).toRgbString(), a = t, l = new xe(t).setA(0.25).toRgbString(), c = new xe(t).setA(0.1).toRgbString(), d = n, u = new xe(t).setA(0.08).toRgbString(), m = new xe(r).setA(0.04).toRgbString(), p = new xe(t).setA(0.1).toRgbString(), f = new xe(r).setA(0.1).toRgbString(), h = `0 4px 12px 0 ${new xe(t).setA(0.1).toRgbString()}`;
  return {
    colorBgSlot: n,
    colorBgSkill: s,
    colorBgSkillHover: o,
    colorTextSlot: a,
    colorTextSlotPlaceholder: l,
    colorBorderSlotHover: c,
    colorBorderSlot: d,
    switchCheckedBg: u,
    switchCheckedHoverBg: p,
    switchUncheckedHoverBg: m,
    colorBorderInput: f,
    boxShadowInput: h
  };
}, Qn = tt("Sender", (e) => {
  const {
    paddingXS: t,
    calc: r
  } = e, n = et(e, {
    SenderContentMaxWidth: `calc(100% - ${se(r(t).add(32).equal())})`
  });
  return [zo(n), Oo(n), ko(n), Lo(n)];
}, Xo), Fo = /* @__PURE__ */ A.forwardRef((e, t) => {
  const {
    children: r,
    className: n,
    classNames: s = {},
    styles: o = {},
    icon: a,
    style: l,
    onChange: c,
    rootClassName: d,
    loading: u,
    defaultValue: m,
    value: p,
    checkedChildren: f,
    unCheckedChildren: h,
    disabled: y,
    prefixCls: C,
    ...S
  } = e, {
    styles: $ = {},
    classNames: v = {},
    prefixCls: B
  } = A.useContext(It), W = Me(S, {
    attr: !0,
    aria: !0,
    data: !0
  }), V = A.useId(), {
    direction: U,
    getPrefixCls: N
  } = pe(), I = N("sender", C || B), D = `${I}-switch`, [T, R] = Qn(I), G = A.useRef(null);
  ut(t, () => ({
    nativeElement: G.current
  }));
  const [j, K] = Wt(m, {
    value: p,
    onChange: (J) => {
      c == null || c(J);
    }
  }), P = Ie("sender"), F = M(I, D, n, d, P.classNames.switch, v.switch, s.root, T, R, {
    [`${D}-checked`]: j,
    [`${D}-rtl`]: U === "rtl"
  });
  return /* @__PURE__ */ A.createElement("div", re({
    ref: G,
    className: F,
    key: V,
    style: {
      ...l,
      ...P.styles.switch,
      ...$.switch,
      ...o.root
    }
  }, W), /* @__PURE__ */ A.createElement(Je, {
    disabled: y,
    loading: u,
    className: M(`${D}-content`, s.content),
    style: o.content,
    styles: {
      icon: o.icon,
      content: o.title
    },
    classNames: {
      icon: s.icon,
      content: s.title
    },
    variant: "outlined",
    color: j ? "primary" : "default",
    icon: a,
    onClick: () => {
      K(!j);
    }
  }, j ? f : h, r));
}), er = ({
  removeSkill: e,
  prefixCls: t,
  toolTip: r,
  closable: n,
  title: s,
  value: o
}) => {
  const a = `${t}-skill`, l = Ye(() => {
    if (!n)
      return [null];
    const u = typeof n == "boolean" ? {} : n, m = (h) => {
      var y;
      u.disabled || (h.stopPropagation(), e(), (y = u.onClose) == null || y.call(u, h));
    }, p = u.closeIcon || /* @__PURE__ */ i.createElement(Rn, {
      className: `${a}-close-icon`
    });
    return /* @__PURE__ */ i.createElement("div", {
      className: M(`${a}-close`, {
        [`${a}-close-disabled`]: u.disabled
      }),
      onClick: m,
      role: "button",
      "aria-label": "Close skill",
      tabIndex: 0
    }, p);
  }, [n, e]), c = s || o, d = r ? /* @__PURE__ */ i.createElement(Ze, r, c) : c;
  return /* @__PURE__ */ i.createElement("div", {
    className: `${a}-wrapper`,
    contentEditable: !1
  }, /* @__PURE__ */ i.createElement("div", {
    className: `${a}-tag`,
    contentEditable: !1,
    role: "button",
    tabIndex: 0
  }, /* @__PURE__ */ i.createElement("span", {
    className: `${a}-tag-text`
  }, d), l), /* @__PURE__ */ i.createElement("div", {
    className: `${a}-holder`
  }));
};
er.displayName = "Skill";
const yn = 4.35, Ko = (e, t, r) => {
  const {
    token: n
  } = gs(), s = r.current ? window.getComputedStyle(r.current) : {}, o = parseFloat(`${e.lineHeight || n.lineHeight}`), a = parseFloat(`${(s == null ? void 0 : s.fontSize) || e.fontSize || n.fontSize}`), l = s != null && s.lineHeight ? parseFloat(`${s == null ? void 0 : s.lineHeight}`) : o * a;
  return t === !1 || !t ? {} : t === !0 ? {
    height: "auto"
  } : {
    minHeight: t.minRows ? (l + yn) * t.minRows : "auto",
    maxHeight: t.maxRows ? (l + yn) * t.maxRows : "auto",
    overflowY: "auto"
  };
}, qo = (e, t) => e == null ? void 0 : e.reduce((r, n) => {
  var s, o, a;
  return n.key && (n.type === "input" || n.type === "select" || n.type === "custom" || n.type === "content" ? r[n.key] = ((s = n.props) == null ? void 0 : s.defaultValue) || "" : n.type === "tag" && (r[n.key] = ((o = n.props) == null ? void 0 : o.value) || ((a = n.props) == null ? void 0 : a.label) || ""), t.current.set(n.key, n)), r;
}, {});
function Vo(e) {
  const [t, r] = Se({}), n = le(t), s = le(/* @__PURE__ */ new Map());
  ye(() => {
    if (!e) return;
    const c = qo(e, s);
    r(c), n.current = c;
  }, [e]);
  const o = ze((c) => {
    const d = typeof c == "function" ? c(n.current) : c;
    n.current = d, r(d);
  }, []), a = ze((c) => {
    c.forEach((d) => {
      d.key && s.current.set(d.key, d);
    });
  }, []), l = ze(() => n.current, []);
  return [s.current, l, o, a];
}
const tr = /* @__PURE__ */ i.forwardRef((e, t) => {
  var tn;
  const {
    onChange: r,
    onKeyUp: n,
    onKeyDown: s,
    onPaste: o,
    onPasteFile: a,
    disabled: l,
    readOnly: c,
    submitType: d = "enter",
    prefixCls: u,
    styles: m = {},
    classNames: p = {},
    autoSize: f,
    triggerSend: h,
    placeholder: y,
    onFocus: C,
    onBlur: S,
    slotConfig: $,
    skill: v,
    submitDisabled: B,
    ...W
  } = i.useContext(It), {
    direction: V,
    getPrefixCls: U
  } = pe(), N = `${U("sender", u)}`, I = Ie("sender"), D = `${N}-input`, T = le(null), R = le(/* @__PURE__ */ new Map()), G = le(!1), j = le(!1), K = le(null), P = le(null), F = le(null), J = le(!1), L = {
    ...(tn = I.styles) == null ? void 0 : tn.input,
    ...m.input
  }, k = Ko(L, f, T), q = {
    ...Me(W, {
      attr: !0,
      aria: !0,
      data: !0
    }),
    ref: T
  }, [X, oe, Q, x] = Vo($), [ne, ee] = Se(/* @__PURE__ */ new Map()), [Y, ae] = Se(null), ce = (g) => {
    const b = De();
    P.current && (!(b != null && b.value) && b.slotConfig.length === 0 ? (P.current.setAttribute("contenteditable", "true"), P.current.classList.add(`${N}-skill-empty`)) : (P.current.setAttribute("contenteditable", "false"), P.current.classList.remove(`${N}-skill-empty`))), r == null || r(b.value, g, b.slotConfig, b.skill);
  }, $e = (g) => {
    const b = document.createElement("span");
    return b.setAttribute("contenteditable", "false"), b.dataset.slotKey = g, b.className = `${N}-slot`, b;
  }, be = (g) => {
    const b = document.createElement("span");
    return b.setAttribute("contenteditable", "false"), b.dataset.skillKey = g, b.dataset.placeholder = y, b.className = `${N}-skill`, b;
  }, _e = (g) => {
    const b = document.createElement("span");
    return b.setAttribute("contenteditable", "true"), b.dataset.slotKey = g.key, b.className = M(`${N}-slot`, `${N}-slot-content`), b;
  }, ve = (g, b) => {
    const E = document.createElement("span");
    return E.setAttribute("contenteditable", "false"), E.dataset.slotKey = g, E.dataset.nodeType = "nbsp", E.className = M(`${N}-slot-${b}`, `${N}-slot-no-width`), E.innerHTML = "&nbsp;", E;
  }, ue = (g, b) => {
    R.current.set(g, b);
  }, Oe = (g) => R.current.get(g), nt = (g, b, E) => {
    const w = Oe(g), H = X.get(g);
    if (Q((te) => ({
      ...te,
      [g]: b
    })), w && H) {
      const te = je(H, w);
      ee((Z) => {
        const me = new Map(Z);
        return me.set(g, te), me;
      }), ce(E);
    }
  }, je = (g, b) => {
    if (!g.key) return null;
    const E = oe()[g.key];
    return /* @__PURE__ */ on((() => {
      var H, te, Z, me, O, fe, Ee, Ce, Le;
      switch (g.type) {
        case "content":
          return b.innerHTML = E || "", b.setAttribute("data-placeholder", ((H = g.props) == null ? void 0 : H.placeholder) || ""), null;
        case "input":
          return /* @__PURE__ */ i.createElement(Dn, {
            readOnly: c,
            className: `${N}-slot-input`,
            placeholder: ((te = g.props) == null ? void 0 : te.placeholder) || "",
            "data-slot-input": g.key,
            size: "small",
            variant: "borderless",
            value: E || "",
            tabIndex: 0,
            onKeyDown: Ae,
            onChange: (he) => {
              nt(g.key, he.target.value, he);
            },
            spellCheck: !1
          });
        case "select":
          return /* @__PURE__ */ i.createElement(jt, {
            disabled: c,
            menu: {
              items: (me = (Z = g.props) == null ? void 0 : Z.options) == null ? void 0 : me.map((he) => ({
                label: he,
                key: he
              })),
              defaultSelectedKeys: (O = g.props) != null && O.defaultValue ? [g.props.defaultValue] : [],
              selectable: !0,
              onSelect: ({
                key: he,
                domEvent: Pe
              }) => {
                nt(g.key, he, Pe);
              }
            },
            trigger: ["click"]
          }, /* @__PURE__ */ i.createElement("span", {
            className: M(`${N}-slot-select`, {
              placeholder: !E,
              [`${N}-slot-select-selector-value`]: E
            })
          }, /* @__PURE__ */ i.createElement("span", {
            "data-placeholder": (fe = g.props) == null ? void 0 : fe.placeholder,
            className: `${N}-slot-select-value`
          }, E || ""), /* @__PURE__ */ i.createElement("span", {
            className: `${N}-slot-select-arrow`
          }, /* @__PURE__ */ i.createElement(Zr, null))));
        case "tag":
          return /* @__PURE__ */ i.createElement("div", {
            className: `${N}-slot-tag`
          }, ((Ee = g.props) == null ? void 0 : Ee.label) || ((Ce = g.props) == null ? void 0 : Ce.value) || "");
        case "custom":
          return (Le = g.customRender) == null ? void 0 : Le.call(g, E, (he) => {
            nt(g.key, he);
          }, {
            disabled: l,
            readOnly: c
          }, g);
        default:
          return null;
      }
    })(), b);
  }, ft = (g) => g.reduce((b, E) => {
    if (E.type === "text")
      return b.push(document.createTextNode(E.value || "")), b;
    const w = E.key;
    if (Nt(!!w, "sender", `Slot key is missing: ${w}`), w) {
      let H, te;
      if (E.type === "content" ? (te = _e(E), H = [ve(w, "before"), te, ve(w, "after")]) : (te = $e(w), H = [te]), ue(w, te), te) {
        const Z = je(E, te);
        Z && (ee((me) => {
          const O = new Map(me);
          return O.set(w, Z), O;
        }), b.push(...H));
      }
    }
    return b;
  }, []), Fe = (g) => {
    if (g.nodeType === Node.TEXT_NODE)
      return g.textContent || "";
    if (g.nodeType !== Node.ELEMENT_NODE)
      return "";
    const b = g, {
      dataset: E
    } = b;
    if (E.slotKey) {
      if (E.nodeType === "nbsp")
        return " ";
      const w = X.get(E.slotKey);
      if (!w)
        return "";
      if (w.type === "content")
        return b.innerText || "";
      const H = oe()[E.slotKey] ?? "";
      return w.formatResult ? w.formatResult(H) : H;
    }
    if (E.skillKey) {
      const w = b.querySelector(`.${N}-skill-wrapper`), H = b.innerText || "";
      if (!w)
        return H;
      const te = w.innerText || "";
      return H.replace(te, "").replace(/\n/g, "");
    }
    return "";
  }, De = () => {
    var w;
    const g = [], b = [];
    let E;
    if ((w = T.current) == null || w.childNodes.forEach((H) => {
      const te = Fe(H);
      if (g.push(te), H.nodeType === Node.TEXT_NODE)
        b.push({
          type: "text",
          value: te
        });
      else if (H.nodeType === Node.ELEMENT_NODE) {
        const Z = H, me = Z.getAttribute("data-slot-key"), O = Z.getAttribute("data-node-type");
        if (Z.getAttribute("data-skill-key") && v && (E = v), me && O !== "nbsp") {
          const Ee = X.get(me);
          Ee && b.push({
            ...Ee,
            value: te
          });
        }
      }
    }), !g.length) {
      const H = T.current;
      H && (H.innerHTML = "");
    }
    return E || (P.current = null), {
      value: g.join(""),
      slotConfig: b,
      skill: E
    };
  }, pt = () => {
    var b;
    const g = T.current;
    g && (g.innerHTML = "", P.current = null, F.current = null, (b = R == null ? void 0 : R.current) == null || b.clear());
  }, gt = (g) => {
    var me, O, fe;
    if (g === "start")
      return {
        type: "start"
      };
    if (g === "end")
      return {
        type: "end"
      };
    const b = (me = window == null ? void 0 : window.getSelection) == null ? void 0 : me.call(window);
    if (!b)
      return {
        type: "end"
      };
    const E = b.rangeCount > 0 ? b.getRangeAt(0) : null, w = K.current || E;
    if (!w)
      return {
        type: "end"
      };
    const H = T.current;
    if (!H)
      return {
        type: "end"
      };
    const te = w.endContainer;
    return (O = te == null ? void 0 : te.className) != null && O.includes(`${N}-skill`) || (fe = te == null ? void 0 : te.className) != null && fe.includes(`${N}-slot`) ? {
      type: "slot",
      range: w
    } : w.endContainer === H || w.endContainer.parentElement === H ? {
      type: "box",
      range: w
    } : {
      type: "end"
    };
  }, ht = (g) => {
    g.forEach((b) => {
      var E;
      (E = T.current) == null || E.appendChild(b);
    });
  }, yt = (g, b) => {
    const E = T.current;
    E && (E.querySelectorAll(`[data-slot-key="${g}"]`).forEach((w) => {
      w.remove();
    }), R.current.delete(g), Q((w) => {
      const {
        [g]: H,
        ...te
      } = w;
      return te;
    }), ee((w) => {
      const H = new Map(w);
      return H.delete(g), H;
    }), ce(b));
  }, rt = () => {
    if (v && F.current !== v) {
      st(!1), F.current = v;
      const g = be(v.value), b = /* @__PURE__ */ on(/* @__PURE__ */ i.createElement(er, re({
        removeSkill: st
      }, v, {
        prefixCls: N
      })), g);
      ae(b);
      const E = document.createRange(), w = T.current;
      if (!w) return;
      E.setStart(w, 0), E.insertNode(g), P.current = g, ce();
    }
  }, st = (g = !0) => {
    var E;
    !T.current || !P.current || ((E = P.current) == null || E.remove(), P.current = null, F.current = null, g && ce());
  }, At = (g) => {
    d !== "enter" || !g || g.querySelectorAll("br").forEach((b) => {
      b.remove();
    });
  }, Dt = (g) => {
    const b = T.current;
    if (!b) return;
    const w = (() => {
      var H, te;
      if (g) {
        const Z = Oe(g);
        return (Z == null ? void 0 : Z.querySelector("input")) || null;
      }
      for (const Z of Array.from(b.childNodes)) {
        const me = ((H = Z == null ? void 0 : Z.getAttribute) == null ? void 0 : H.call(Z, "data-slot-key")) || "", O = ((te = Z == null ? void 0 : Z.getAttribute) == null ? void 0 : te.call(Z, "data-node-type")) || "", fe = X.get(me);
        if (Z.nodeType === Node.ELEMENT_NODE) {
          if ((fe == null ? void 0 : fe.type) === "input")
            return Z.querySelector("input");
          if ((fe == null ? void 0 : fe.type) === "content" && O !== "nbsp")
            return Z;
        }
      }
      return null;
    })();
    if (w && w.nodeName === "INPUT") {
      w.focus();
      return;
    }
    w && (b.focus(), Jt(w, 0));
  }, ie = () => {
    $ && $.length > 0 && T.current && (pt(), ht(ft($)));
  }, ge = () => {
    G.current = !0;
  }, Re = () => {
    G.current = !1, j.current = !1;
  }, Ae = (g) => {
    var fe, Ee, Ce, Le, he, Pe, Bt, nn, St, rn;
    const {
      key: b,
      target: E,
      shiftKey: w,
      ctrlKey: H,
      altKey: te,
      metaKey: Z
    } = g, me = s == null ? void 0 : s(g);
    if (j.current || G.current || me === !1) {
      s == null || s(g);
      return;
    }
    const O = window.getSelection();
    if (b === "Backspace" && E === T.current) {
      if ((O == null ? void 0 : O.focusOffset) === 1 && ((Ce = (Ee = (fe = O.anchorNode) == null ? void 0 : fe.parentNode) == null ? void 0 : Ee.getAttribute) == null ? void 0 : Ce.call(Ee, "data-slot-key")) && (Le = O.anchorNode) != null && Le.parentNode) {
        g.preventDefault(), O.anchorNode.parentNode.innerHTML = "";
        return;
      }
      if ((O == null ? void 0 : O.focusOffset) === 0) {
        const Ue = (Bt = (Pe = (he = O.anchorNode) == null ? void 0 : he.previousSibling) == null ? void 0 : Pe.getAttribute) == null ? void 0 : Bt.call(Pe, "data-slot-key");
        if (Ue) {
          g.preventDefault(), yt(Ue, g);
          return;
        }
        if ((rn = (St = (nn = O.anchorNode) == null ? void 0 : nn.previousSibling) == null ? void 0 : St.getAttribute) == null ? void 0 : rn.call(St, "data-skill-key")) {
          g.preventDefault(), st();
          return;
        }
      }
    }
    if (b === "Enter") {
      const Ue = H || te || Z;
      if (d === "enter" && !w && !Ue || d === "shiftEnter" && w && !Ue) {
        g.preventDefault(), J.current || (j.current = !0, h == null || h());
        return;
      }
    }
    P.current && (O != null && O.anchorNode) && P.current.contains(O.anchorNode) && (P.current.setAttribute("contenteditable", "false"), P.current.classList.remove(`${N}-skill-empty`), en({
      cursor: "end"
    }));
  }, bt = (g) => {
    const b = window.getSelection();
    if (b) {
      const E = document.createRange();
      E.selectNodeContents(T.current), E.collapse(!0), b.removeAllRanges(), b.addRange(E);
    }
    C == null || C(g);
  }, Ct = (g) => {
    var w;
    j.current && (j.current = !1);
    const b = window.getSelection();
    b && (K.current = b.rangeCount ? (w = b == null ? void 0 : b.getRangeAt) == null ? void 0 : w.call(b, 0) : null);
    const E = setTimeout(() => {
      K.current = null, clearTimeout(E);
    }, 200);
    S == null || S(g);
  }, Pt = (g) => {
    At(T == null ? void 0 : T.current), ce(g);
  }, sr = (g) => {
    var w, H;
    g.preventDefault();
    const b = (w = g.clipboardData) == null ? void 0 : w.files, E = (H = g.clipboardData) == null ? void 0 : H.getData("text/plain");
    if (!E && (b != null && b.length) && a) {
      a(b);
      return;
    }
    E && Qt([{
      type: "text",
      value: E.replace(/\n/g, "")
    }]), o == null || o(g);
  }, or = (g) => {
    g.key === "Enter" && (j.current = !1), n == null || n(g);
  }, Jt = (g, b) => {
    const E = document.createRange();
    E.setStart(g, b), E.setEnd(g, b);
    const w = window.getSelection();
    w && (w.removeAllRanges(), E.collapse(!1), w.addRange(E));
  }, ir = () => {
    const g = T.current, b = window.getSelection();
    g && (b == null ? void 0 : b.focusNode) === g && b.focusOffset === 0 && De().skill && Jt(g, 1);
  }, Qt = (g, b = "cursor", E) => {
    var Ee;
    const w = T.current, H = window.getSelection();
    if (!w || !H) return;
    const te = ft(g), {
      type: Z,
      range: me
    } = gt(b);
    let O = document.createRange();
    if (Q((Ce) => ({
      ...Ce,
      ...g
    })), x(g), Z === "end") {
      H.removeAllRanges(), H.addRange(O);
      const Ce = w.childNodes[w.childNodes.length - 1];
      Ce.nodeType === Node.TEXT_NODE && Ce.textContent === `
` ? O.setStart(w, w.childNodes.length - 1) : O.setStart(w, w.childNodes.length);
    }
    if (Z === "start" && O.setStart(w, De().skill ? 1 : 0), Z === "box" && (O = me), Z === "slot" && (O = (Ee = H == null ? void 0 : H.getRangeAt) == null ? void 0 : Ee.call(H, 0), H.focusNode && O.setStartAfter(H.focusNode)), E != null && E.length) {
      const Ce = O.startOffset, Le = O.startContainer, he = O.cloneRange();
      he.selectNodeContents(w), he.setEnd(O.endContainer, O.endOffset), he.setStart(w, 0);
      const Pe = he.toString();
      Pe.length >= E.length && Pe.endsWith(E) && (O.setStart(Le, Ce - E.length), O.setEnd(Le, Ce), O.deleteContents());
    }
    H.deleteFromDocument(), te.forEach((Ce) => {
      O.insertNode(Ce), O.setStartAfter(Ce), O = O.cloneRange();
    }), w.focus(), O.collapse(!1), H.removeAllRanges(), H.addRange(O);
    const fe = setTimeout(() => {
      Pt(null), clearTimeout(fe);
    }, 0);
  }, en = (g) => {
    const b = T.current;
    if (!b || (b.focus({
      preventScroll: (g == null ? void 0 : g.preventScroll) || !1
    }), !(g != null && g.cursor))) return;
    if ((g == null ? void 0 : g.cursor) === "slot")
      return Dt(g == null ? void 0 : g.key);
    const E = window.getSelection();
    if (!E) return;
    const w = document.createRange();
    switch (w.selectNodeContents(b), g.cursor) {
      case "start":
        w.collapse(!0);
        break;
      case "all":
        break;
      default:
        w.collapse(!1);
        break;
    }
    E.removeAllRanges(), E.addRange(w);
  }, ar = () => {
    var b;
    const g = T.current;
    g && (g.innerHTML = "", F.current = null, P.current = null, X.clear(), rt(), Q({}), (b = R == null ? void 0 : R.current) == null || b.clear(), Pt(null));
  };
  return ye(() => {
    J.current = B ?? !1;
  }, [B]), ye(() => {
    ie(), v ? rt() : ce();
  }, [$]), ye(() => {
    rt();
  }, [v]), wn(t, () => ({
    nativeElement: T.current,
    focus: en,
    blur: () => {
      var g;
      (g = T.current) == null || g.blur();
    },
    insert: Qt,
    clear: ar,
    getValue: De
  })), /* @__PURE__ */ i.createElement(i.Fragment, null, /* @__PURE__ */ i.createElement("div", re({}, q, {
    role: "textbox",
    tabIndex: 0,
    style: {
      ...L,
      ...k
    },
    className: M(D, `${D}-slot`, I.classNames.input, p.input, {
      [`${N}-rtl`]: V === "rtl"
    }),
    "data-placeholder": y,
    contentEditable: !c,
    suppressContentEditableWarning: !0,
    spellCheck: !1,
    onKeyDown: Ae,
    onKeyUp: or,
    onPaste: sr,
    onCompositionStart: ge,
    onCompositionEnd: Re,
    onFocus: bt,
    onBlur: Ct,
    onSelect: ir,
    onInput: Pt
  }, W)), /* @__PURE__ */ i.createElement("div", {
    style: {
      display: "none"
    },
    id: `${N}-slot-placeholders`
  }, Array.from(ne.values()), Y));
});
process.env.NODE_ENV !== "production" && (tr.displayName = "SlotTextArea");
function Wo(e, t, r) {
  return Rr(e, t) || r;
}
const nr = /* @__PURE__ */ i.forwardRef((e, t) => {
  const {
    value: r,
    onChange: n,
    onKeyUp: s,
    onKeyDown: o,
    onPaste: a,
    onPasteFile: l,
    disabled: c,
    readOnly: d,
    submitType: u = "enter",
    prefixCls: m,
    styles: p = {},
    classNames: f = {},
    autoSize: h,
    components: y,
    submitDisabled: C,
    triggerSend: S,
    placeholder: $,
    onFocus: v,
    onBlur: B,
    ...W
  } = i.useContext(It), V = i.useRef(null), U = (L, k = "cursor") => {
    var Q, x;
    const z = (x = (Q = V.current) == null ? void 0 : Q.resizableTextArea) == null ? void 0 : x.textArea, q = z.value;
    let X = q.length, oe = q.length;
    k === "cursor" && (X = z == null ? void 0 : z.selectionStart, oe = z == null ? void 0 : z.selectionEnd), k === "start" && (X = 0, oe = 0), z.value = q.substring(0, X) + L + q.substring(oe, q.length), z.selectionStart = X + L.length, z.selectionEnd = X + L.length, z.focus(), n == null || n(z.value);
  }, N = () => {
    n == null || n("");
  }, I = () => ({
    value: r || "",
    slotConfig: []
  });
  i.useImperativeHandle(t, () => {
    var L, k, z, q;
    return {
      nativeElement: (k = (L = V.current) == null ? void 0 : L.resizableTextArea) == null ? void 0 : k.textArea,
      focus: (z = V.current) == null ? void 0 : z.focus,
      blur: (q = V.current) == null ? void 0 : q.blur,
      insert: U,
      clear: N,
      getValue: I
    };
  });
  const D = i.useRef(!1), T = () => {
    D.current = !0;
  }, R = () => {
    D.current = !1;
  }, G = (L) => {
    const k = o == null ? void 0 : o(L), {
      key: z,
      shiftKey: q,
      ctrlKey: X,
      altKey: oe,
      metaKey: Q
    } = L;
    if (!(D.current || z !== "Enter" || k === !1) && z === "Enter") {
      const x = X || oe || Q;
      if (u === "enter" && !q && !x || u === "shiftEnter" && q && !x) {
        L.preventDefault(), C || S == null || S();
        return;
      }
    }
  }, j = (L) => {
    var q, X;
    const k = (q = L.clipboardData) == null ? void 0 : q.files;
    !((X = L.clipboardData) == null ? void 0 : X.getData("text/plain")) && (k != null && k.length) && l && (l(k), L.preventDefault()), a == null || a(L);
  }, K = Wo(y, ["input"], Dn.TextArea), F = {
    ...Me(W, {
      attr: !0,
      aria: !0,
      data: !0
    }),
    ref: V
  }, J = (L) => {
    n == null || n(L.target.value, L);
  };
  return /* @__PURE__ */ i.createElement(K, re({}, F, {
    disabled: c,
    style: p.input,
    className: M(`${m}-input`, f.input),
    autoSize: h,
    value: r,
    onChange: J,
    onKeyUp: s,
    onCompositionStart: T,
    onCompositionEnd: R,
    onKeyDown: G,
    onPaste: j,
    variant: "borderless",
    readOnly: d,
    placeholder: $,
    onFocus: v,
    onBlur: B
  }));
});
process.env.NODE_ENV !== "production" && (nr.displayName = "TextArea");
const vt = {
  SendButton: Yn,
  ClearButton: Io,
  LoadingButton: Gn,
  SpeechButton: Zn
}, jo = /* @__PURE__ */ i.forwardRef((e, t) => {
  const {
    prefixCls: r,
    styles: n = {},
    classNames: s = {},
    className: o,
    rootClassName: a,
    style: l,
    defaultValue: c,
    value: d,
    slotConfig: u,
    readOnly: m,
    submitType: p = "enter",
    onSubmit: f,
    loading: h,
    components: y,
    onCancel: C,
    onChange: S,
    suffix: $,
    onKeyUp: v,
    onKeyDown: B,
    disabled: W,
    allowSpeech: V,
    prefix: U,
    footer: N,
    header: I,
    onPaste: D,
    onPasteFile: T,
    autoSize: R = {
      maxRows: 8
    },
    placeholder: G,
    onFocus: j,
    onBlur: K,
    skill: P,
    ...F
  } = e, J = Me(F, {
    attr: !0,
    aria: !0,
    data: !0
  }), L = i.useId(), k = Array.isArray(u) || (P == null ? void 0 : P.value), {
    direction: z,
    getPrefixCls: q
  } = pe(), X = q("sender", r), oe = i.useRef(null), Q = i.useRef(null);
  ut(t, () => {
    var ie, ge, Re, Ae, bt, Ct;
    return {
      nativeElement: oe.current,
      inputElement: (ie = Q.current) == null ? void 0 : ie.nativeElement,
      focus: (ge = Q.current) == null ? void 0 : ge.focus,
      blur: (Re = Q.current) == null ? void 0 : Re.blur,
      insert: (Ae = Q.current) == null ? void 0 : Ae.insert,
      clear: (bt = Q.current) == null ? void 0 : bt.clear,
      getValue: (Ct = Q.current) == null ? void 0 : Ct.getValue
    };
  });
  const x = Ie("sender"), ne = `${X}-input`, [ee, Y] = Qn(X), ae = M(X, x.className, o, a, x.classNames.root, s.root, ee, Y, `${X}-main`, {
    [`${X}-rtl`]: z === "rtl",
    [`${X}-disabled`]: W
  }), ce = `${X}-actions-btn`, $e = `${X}-actions-list`, [be, _e] = En(c || "", {
    value: d
  }), ve = (ie, ge, Re, Ae) => {
    _e(ie), S == null || S(ie, ge, Re ?? [], Ae);
  }, [ue, Oe, nt] = Ho((ie) => {
    var ge, Re;
    k ? (Re = (ge = Q.current) == null ? void 0 : ge.insert) == null || Re.call(ge, [{
      type: "text",
      value: ie
    }]) : ve(`${be} ${ie}`);
  }, V), je = () => {
    if (Q != null && Q.current && f && !h) {
      const ie = Q.current.getValue();
      f(ie.value, ie.slotConfig, ie.skill);
    }
  }, ft = () => {
    var ie, ge;
    ve(""), k && ((ge = (ie = Q.current) == null ? void 0 : ie.clear) == null || ge.call(ie));
  }, Fe = /* @__PURE__ */ i.createElement(In, {
    className: `${$e}-presets`
  }, V && /* @__PURE__ */ i.createElement(Zn, null), h ? /* @__PURE__ */ i.createElement(Gn, null) : /* @__PURE__ */ i.createElement(Yn, null));
  let De = Fe;
  typeof $ == "function" ? De = $(Fe, {
    components: vt
  }) : ($ || $ === !1) && (De = $);
  const pt = typeof U == "function" ? U(Fe, {
    components: vt
  }) : U || null, gt = typeof I == "function" ? I(Fe, {
    components: vt
  }) : I || null, ht = typeof N == "function" ? N(Fe, {
    components: vt
  }) : N || null, [yt, rt] = Se(!be), st = {
    prefixCls: ce,
    onSend: je,
    onSendDisabled: !be,
    onClear: ft,
    onClearDisabled: !be,
    onCancel: C,
    onCancelDisabled: !h,
    onSpeech: () => Oe(!1),
    onSpeechDisabled: !ue,
    speechRecording: nt,
    disabled: W,
    setSubmitDisabled: rt
  }, At = i.useMemo(() => ({
    value: be,
    onChange: ve,
    slotConfig: u,
    onKeyUp: v,
    onKeyDown: B,
    onPaste: D,
    onPasteFile: T,
    disabled: W,
    readOnly: m,
    submitType: p,
    prefixCls: X,
    styles: n,
    classNames: s,
    autoSize: R,
    components: y,
    triggerSend: je,
    placeholder: G,
    onFocus: j,
    onBlur: K,
    skill: P,
    submitDisabled: yt,
    ...F
  }), [be, ve, u, v, B, D, T, W, m, p, X, n, s, R, y, je, G, j, K, P, yt, F]), Dt = (ie) => {
    var ge, Re, Ae;
    !k && ie.target !== ((ge = oe.current) == null ? void 0 : ge.querySelector(`.${ne}`)) && ie.preventDefault(), ie.target === ((Re = oe.current) == null ? void 0 : Re.querySelector(`.${ne}`)) && ((Ae = Q.current) == null || Ae.focus());
  };
  return /* @__PURE__ */ i.createElement("div", re({
    key: L,
    ref: oe,
    className: ae,
    style: {
      ...x.style,
      ...l,
      ...x.styles.root,
      ...n.root
    }
  }, J), /* @__PURE__ */ i.createElement(It.Provider, {
    value: At
  }, /* @__PURE__ */ i.createElement(Tt.Provider, {
    value: st
  }, gt && /* @__PURE__ */ i.createElement(Jn.Provider, {
    value: {
      prefixCls: X
    }
  }, gt), /* @__PURE__ */ i.createElement("div", {
    className: M(`${X}-content`, s.content),
    style: n.content,
    onMouseDown: Dt
  }, pt && /* @__PURE__ */ i.createElement("div", {
    className: M(`${X}-prefix`, x.classNames.prefix, s.prefix),
    style: {
      ...x.styles.prefix,
      ...n.prefix
    }
  }, pt), k ? /* @__PURE__ */ i.createElement(tr, {
    ref: Q
  }) : /* @__PURE__ */ i.createElement(nr, {
    ref: Q
  }), De && /* @__PURE__ */ i.createElement("div", {
    className: M($e, x.classNames.suffix, s.suffix),
    style: {
      ...x.styles.suffix,
      ...n.suffix
    }
  }, De)), ht && /* @__PURE__ */ i.createElement("div", {
    className: M(`${X}-footer`, x.classNames.footer, s.footer),
    style: {
      ...x.styles.footer,
      ...n.footer
    }
  }, ht))));
}), Zt = jo;
process.env.NODE_ENV !== "production" && (Zt.displayName = "Sender");
Zt.Header = _o;
Zt.Switch = Fo;
class Ri {
  constructor(t) {
    _(this, "_request");
    _(this, "_getMessagesFn");
    _(this, "_originalCallbacks");
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
    var l, c, d;
    const s = (l = this._originalCallbacks) == null ? void 0 : l.onUpdate, o = (c = this._originalCallbacks) == null ? void 0 : c.onSuccess, a = (d = this._originalCallbacks) == null ? void 0 : d.onError;
    this._request.options.callbacks = {
      onUpdate: (u, m) => {
        t(u, m), s && s(u, m);
      },
      onSuccess: (u, m) => {
        r(u, m), o && o(u, m);
      },
      onError: (u, m) => {
        n(u, m), a && a(u, m);
      }
    };
  }
}
const ke = {
  _chatMessagesStores: /* @__PURE__ */ new Map(),
  get: (e) => ke._chatMessagesStores.get(e),
  set: (e, t) => {
    ke._chatMessagesStores.set(e, t);
  },
  delete: (e) => {
    ke._chatMessagesStores.delete(e);
  },
  getMessages: (e) => {
    const t = ke._chatMessagesStores.get(e);
    return t == null ? void 0 : t.getMessages();
  }
};
class Uo {
  constructor(t, r) {
    _(this, "messages", []);
    _(this, "listeners", []);
    _(this, "conversationKey");
    // Throttle state for preventing "Maximum update depth exceeded" during streaming
    _(this, "throttleTimer", null);
    _(this, "pendingEmit", !1);
    _(this, "throttleInterval", 50);
    _(this, "setMessagesInternal", (t, r = !0) => {
      let n;
      return typeof t == "function" ? n = t(this.messages) : n = t, this.messages = [...n], r ? this.throttledEmitListeners() : this.emitListeners(), !0;
    });
    _(this, "setMessages", (t) => this.setMessagesInternal(t, !0));
    _(this, "getMessages", () => this.messages);
    _(this, "getMessage", (t) => this.messages.find((r) => r.id === t));
    _(this, "addMessage", (t) => this.getMessage(t.id) ? !1 : (this.setMessages([...this.messages, t]), !0));
    _(this, "setMessage", (t, r) => {
      const n = this.getMessage(t);
      if (n) {
        const s = typeof r == "function" ? r(n) : r;
        return Object.assign(n, s), this.setMessages([...this.messages]), !0;
      }
      return !1;
    });
    _(this, "removeMessage", (t) => {
      const r = this.messages.findIndex((n) => n.id === t);
      return r !== -1 ? (this.messages.splice(r, 1), this.setMessages([...this.messages]), !0) : !1;
    });
    _(this, "getSnapshot", () => this.messages);
    _(this, "subscribe", (t) => (this.listeners.push(t), () => {
      this.listeners = this.listeners.filter((r) => r !== t), this.listeners.length === 0 && (this.throttleTimer && (clearTimeout(this.throttleTimer), this.throttleTimer = null), this.pendingEmit = !1);
    }));
    /**
     * Clean up resources (throttle timer) when the store is no longer needed.
     * Should be called when the component unmounts or the store is disposed.
     */
    _(this, "destroy", () => {
      this.throttleTimer && (clearTimeout(this.throttleTimer), this.throttleTimer = null), this.pendingEmit = !1, this.listeners = [];
    });
    this.setMessagesInternal(t, !1), r && (this.conversationKey = r, ke.set(this.conversationKey, this));
  }
  emitListeners() {
    this.listeners.forEach((t) => {
      t();
    });
  }
  throttledEmitListeners() {
    this.throttleTimer ? this.pendingEmit = !0 : (this.emitListeners(), this.pendingEmit = !1, this.throttleTimer = setTimeout(() => {
      this.throttleTimer = null, this.pendingEmit && (this.emitListeners(), this.pendingEmit = !1);
    }, this.throttleInterval));
  }
}
function Go(e, t) {
  const r = () => {
    if (ke.get(t))
      return ke.get(t);
    const a = typeof e == "function" ? e() : e;
    return new Uo(a || [], t);
  }, [n, s] = Se(r);
  return ye(() => {
    s(r());
  }, [t]), {
    messages: kt(n.subscribe, n.getSnapshot, n.getSnapshot),
    addMessage: n.addMessage,
    removeMessage: n.removeMessage,
    setMessage: n.setMessage,
    getMessage: n.getMessage,
    setMessages: n.setMessages,
    getMessages: n.getMessages
  };
}
function Yo(e) {
  return Array.isArray(e) ? e : [e];
}
const Ge = /* @__PURE__ */ new Map(), Zo = () => Symbol("ConversationKey");
function Ti(e) {
  const {
    defaultMessages: t,
    requestFallback: r,
    requestPlaceholder: n,
    parser: s,
    provider: o,
    conversationKey: a
  } = e, l = i.useRef(0), c = i.useRef(void 0), [d, u] = Se(!1), [m, p] = Se(a || Zo());
  ye(() => {
    a && p(a);
  }, [a]);
  const {
    messages: f,
    setMessages: h,
    getMessages: y,
    setMessage: C
  } = Go(() => (t || []).map((N, I) => ({
    id: `default_${I}`,
    status: "local",
    ...N
  })), m), S = (N, I, D) => {
    const T = {
      id: `msg_${l.current}`,
      message: N,
      status: I
    };
    return D && (T.extraInfo = D), l.current += 1, T;
  }, $ = i.useMemo(() => {
    const N = [];
    return f.forEach((I) => {
      const D = s ? s(I.message) : I.message, T = Yo(D);
      T.forEach((R, G) => {
        let j = I.id;
        T.length > 1 && (j = `${j}_${G}`), N.push({
          id: j,
          message: R,
          status: I.status
        });
      });
    }), N;
  }, [f]), v = (N) => N.filter((I) => I.status !== "loading").map((I) => I.message);
  o == null || o.injectGetMessages(() => v(y())), c.current = o == null ? void 0 : o.request;
  const B = () => v(y()), W = (N, I) => {
    if (!o)
      return;
    const {
      updatingId: D,
      reload: T
    } = I || {};
    let R = null;
    const G = o.transformLocalMessage(N), j = (Array.isArray(G) ? G : [G]).map((F) => S(F, "local", I == null ? void 0 : I.extraInfo));
    T ? (R = D, h((F) => {
      const J = [...F];
      if (n) {
        let L;
        typeof n == "function" ? L = n(N, {
          messages: v(J)
        }) : L = n, J.forEach((k) => {
          k.id === D && (k.status = "loading", k.message = L, I != null && I.extraInfo && (k.extraInfo = I == null ? void 0 : I.extraInfo));
        });
      }
      return J;
    })) : h((F) => {
      let J = [...F, ...j];
      if (n) {
        let L;
        typeof n == "function" ? L = n(N, {
          messages: v(J)
        }) : L = n;
        const k = S(L, "loading");
        R = k.id, J = [...J, k];
      }
      return J;
    });
    let K = null;
    const P = (F, J, L, k) => {
      let z = y().find((q) => q.id === K);
      if (z)
        h((q) => q.map((X) => {
          if (X.id === K) {
            const oe = o.transformMessage({
              originMessage: X.message,
              chunk: J,
              chunks: L,
              status: F,
              responseHeaders: k
            });
            return {
              ...X,
              message: oe,
              status: F
            };
          }
          return X;
        }));
      else if (T && D)
        z = y().find((q) => q.id === D), z && (z.status = F, z.message = o.transformMessage({
          chunk: J,
          status: F,
          chunks: L,
          responseHeaders: k
        }), h((q) => [...q]), K = z.id);
      else {
        const q = o.transformMessage({
          chunk: J,
          status: F,
          chunks: L,
          responseHeaders: k
        });
        z = S(q, F), h((X) => [...X.filter((Q) => Q.id !== R), z]), K = z.id;
      }
      return z;
    };
    o.injectRequest({
      onUpdate: (F, J) => {
        P("updating", F, [], J);
      },
      onSuccess: (F, J) => {
        u(!1), m && Ge.delete(m), P("success", void 0, F, J);
      },
      onError: async (F, J) => {
        if (u(!1), m && Ge.delete(m), r) {
          let L;
          if (typeof r == "function") {
            const k = B(), z = y().find((q) => q.id === R || q.id === K);
            L = await r(N, {
              error: F,
              errorInfo: J,
              messageInfo: z,
              messages: k
            });
          } else
            L = r;
          h((k) => [...k.filter((z) => z.id !== R && z.id !== K), S(L, F.name === "AbortError" ? "abort" : "error")]);
        } else
          h((L) => L.map((k) => k.id === R || k.id === K ? {
            ...k,
            status: F.name === "AbortError" ? "abort" : "error"
          } : k));
      }
    }), u(!0), m && Ge.set(m, !0), o.request.run(o.transformParams(N, o.request.options));
  }, V = dt((N, I) => {
    if (!o)
      throw new Error("provider is required");
    W(N, I);
  }), U = (N, I, D) => {
    if (!o)
      throw new Error("provider is required");
    if (!N || !y().find((T) => T.id === N))
      throw new Error(`message [${N}] is not found`);
    W(I, {
      updatingId: N,
      reload: !0,
      extraInfo: D == null ? void 0 : D.extraInfo
    });
  };
  return {
    onRequest: V,
    messages: f,
    parsedMessages: $,
    setMessages: h,
    setMessage: C,
    abort: () => {
      var N;
      if (!o)
        throw new Error("provider is required");
      (N = c.current) == null || N.abort();
    },
    isRequesting: m ? (Ge == null ? void 0 : Ge.get(m)) || !1 : d,
    onReload: U
  };
}
const ct = {
  _allConversationStores: /* @__PURE__ */ new Map(),
  set: (e, t) => {
    ct._allConversationStores.set(e, t);
  },
  delete: (e) => {
    ct._allConversationStores.delete(e);
  },
  getConversation: (e) => {
    for (const t of ct._allConversationStores.values())
      if (t) {
        const r = t.getConversation(e);
        if (r)
          return r;
      }
  }
};
class Jo {
  constructor(t, r) {
    _(this, "conversations", []);
    _(this, "listeners", []);
    _(this, "storeKey");
    _(this, "activeConversationKey");
    _(this, "setActiveConversationKey", (t) => (this.activeConversationKey = t, this.emitListeners(), !0));
    _(this, "setConversations", (t) => (this.conversations = [...t], this.emitListeners(), !0));
    _(this, "getConversation", (t) => this.conversations.find((r) => r.key === t));
    _(this, "addConversation", (t, r) => this.getConversation(t.key) ? !1 : (this.setConversations(r === "prepend" ? [t, ...this.conversations] : [...this.conversations, t]), !0));
    _(this, "setConversation", (t, r) => {
      const n = this.getConversation(t);
      return n ? (Object.assign(n, r), this.setConversations([...this.conversations]), !0) : !1;
    });
    _(this, "removeConversation", (t) => {
      const r = this.conversations.findIndex((n) => n.key === t);
      return r !== -1 ? (this.conversations.splice(r, 1), this.setConversations([...this.conversations]), !0) : !1;
    });
    _(this, "getMessages", (t) => ke.getMessages(t));
    _(this, "getSnapshot", () => this.conversations);
    _(this, "getActiveConversationKey", () => this.activeConversationKey);
    _(this, "subscribe", (t) => (this.listeners.push(t), () => {
      this.listeners = this.listeners.filter((r) => r !== t);
    }));
    _(this, "destroy", () => {
      ct.delete(this.storeKey);
    });
    this.setConversations(t), this.storeKey = Math.random().toString(), ct.set(this.storeKey, this), this.activeConversationKey = r;
  }
  emitListeners() {
    this.listeners.forEach((t) => {
      t();
    });
  }
}
function Mi(e) {
  const [t] = Se(() => new Jo((e == null ? void 0 : e.defaultConversations) || [], (e == null ? void 0 : e.defaultActiveConversationKey) || ""));
  ye(() => () => {
    t.destroy();
  }, []);
  const r = kt(t.subscribe, t.getSnapshot, t.getSnapshot), n = kt(t.subscribe, t.getActiveConversationKey, t.getActiveConversationKey);
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
const Qo = `

`, ei = `
`, bn = ":", Ft = (e) => (e ?? "").trim() !== "";
function ti() {
  let e = "";
  return new TransformStream({
    transform(t, r) {
      e += t;
      const n = e.split(Qo);
      n.slice(0, -1).forEach((s) => {
        Ft(s) && r.enqueue(s);
      }), e = n[n.length - 1];
    },
    flush(t) {
      Ft(e) && t.enqueue(e);
    }
  });
}
function ni() {
  return new TransformStream({
    transform(e, t) {
      const n = e.split(ei).reduce((s, o) => {
        const a = o.indexOf(bn);
        if (a === -1)
          throw new Error(`The key-value separator "${bn}" is not found in the sse line chunk!`);
        const l = o.slice(0, a);
        if (!Ft(l)) return s;
        const c = o.slice(a + 1);
        return {
          ...s,
          [l]: c
        };
      }, {});
      Object.keys(n).length !== 0 && t.enqueue(n);
    }
  });
}
function Cn(e) {
  const {
    readableStream: t,
    transformStream: r
  } = e;
  if (!(t instanceof ReadableStream))
    throw new Error("The options.readableStream must be an instance of ReadableStream.");
  const n = new TextDecoderStream(), s = r ? (
    /**
     * Uint8Array binary -> string -> Output
     */
    t.pipeThrough(n).pipeThrough(r)
  ) : (
    /**
     * Uint8Array binary -> string -> SSE part string -> Default Output {@link SSEOutput}
     */
    t.pipeThrough(n).pipeThrough(ti()).pipeThrough(ni())
  );
  return s[Symbol.asyncIterator] = async function* () {
    const o = this.getReader();
    for (; ; ) {
      const {
        done: a,
        value: l
      } = await o.read();
      if (a) break;
      l && (yield l);
    }
  }, s;
}
const ri = async (e, t) => {
  const {
    fetch: r = globalThis.fetch,
    middlewares: n = {},
    ...s
  } = t;
  if (typeof r != "function")
    throw new Error("The options.fetch must be a typeof fetch function!");
  let o = [e, s];
  typeof n.onRequest == "function" && (o = await n.onRequest(...o));
  let a = await r(...o);
  if (typeof n.onResponse == "function") {
    const l = await n.onResponse(a);
    if (!(l instanceof Response))
      throw new Error("The options.onResponse must return a Response instance!");
    a = l;
  }
  if (!a.ok)
    throw new Error(`Fetch failed with status ${a.status}`);
  if (!a.body)
    throw new Error("The response body is empty.");
  return a;
}, si = {
  headers: {
    "Content-Type": "application/json"
  }
};
class oi {
  constructor(t, r) {
    _(this, "baseURL");
    _(this, "options");
    if (!t || typeof t != "string") throw new Error("The baseURL is not valid!");
    this.baseURL = t, this.options = r || {};
  }
}
class ii extends oi {
  constructor(r, n) {
    super(r, n);
    _(this, "_asyncHandler");
    _(this, "timeoutHandler");
    _(this, "_isTimeout", !1);
    _(this, "streamTimeoutHandler");
    _(this, "_isStreamTimeout", !1);
    _(this, "abortController");
    _(this, "_isRequesting", !1);
    _(this, "_manual", !1);
    _(this, "customResponseHandler", async (r, n, s, o) => {
      const a = Cn({
        readableStream: r.body,
        transformStream: s
      });
      await this.processStream(a, r, n, o);
    });
    _(this, "sseResponseHandler", async (r, n, s) => {
      const o = Cn({
        readableStream: r.body
      });
      await this.processStream(o, r, n, s);
    });
    _(this, "jsonResponseHandler", async (r, n) => {
      var o, a, l;
      const s = await r.json();
      if ((s == null ? void 0 : s.success) === !1) {
        const c = new Error(s.message || "System error");
        c.name = s.name || "SystemError", (o = n == null ? void 0 : n.onError) == null || o.call(n, c, s);
      } else
        (a = n == null ? void 0 : n.onUpdate) == null || a.call(n, s, r.headers), this.finishRequest(), (l = n == null ? void 0 : n.onSuccess) == null || l.call(n, [s], r.headers);
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
      params: s,
      headers: o = {},
      transformStream: a,
      fetch: l,
      timeout: c,
      streamTimeout: d,
      middlewares: u,
      ...m
    } = this.options, p = {
      ...m,
      method: "POST",
      body: JSON.stringify({
        ...s,
        ...r || {}
      }),
      params: {
        ...s,
        ...r
      },
      headers: Object.assign({}, si.headers || {}, o),
      signal: this.abortController.signal,
      middlewares: u
    };
    c && c > 0 && (this.timeoutHandler = window.setTimeout(() => {
      var f;
      this.isTimeout = !0, this.finishRequest(), (f = n == null ? void 0 : n.onError) == null || f.call(n, new Error("TimeoutError"));
    }, c)), this.startRequest(), this._asyncHandler = ri(this.baseURL, {
      fetch: l,
      ...p
    }).then(async (f) => {
      if (clearTimeout(this.timeoutHandler), this.isTimeout) return;
      if (a) {
        let C = a;
        typeof a == "function" && (C = a(this.baseURL, f.headers)), await this.customResponseHandler(f, n, C, d);
        return;
      }
      const h = f.headers.get("content-type") || "";
      switch (h.split(";")[0].trim()) {
        case "text/event-stream":
          await this.sseResponseHandler(f, n, d);
          break;
        case "application/json":
          await this.jsonResponseHandler(f, n);
          break;
        default:
          throw new Error(`The response content-type: ${h} is not support!`);
      }
    }).catch((f) => {
      var y;
      clearTimeout(this.timeoutHandler), this.finishRequest();
      const h = f instanceof Error || f instanceof DOMException ? f : new Error("Unknown error!");
      (y = n == null ? void 0 : n.onError) == null || y.call(n, h);
    });
  }
  startRequest() {
    this._isRequesting = !0;
  }
  finishRequest() {
    this._isRequesting = !1;
  }
  async processStream(r, n, s, o) {
    var d, u;
    const a = [], l = r[Symbol.asyncIterator]();
    let c;
    do
      if (o && (this.streamTimeoutHandler = window.setTimeout(() => {
        var m;
        this.isStreamTimeout = !0, this.finishRequest(), (m = s == null ? void 0 : s.onError) == null || m.call(s, new Error("StreamTimeoutError"));
      }, o)), c = await l.next(), a.push(c.value), (d = s == null ? void 0 : s.onUpdate) == null || d.call(s, c.value, n.headers), clearTimeout(this.streamTimeoutHandler), this.isStreamTimeout)
        break;
    while (!c.done);
    if (o && (clearTimeout(this.streamTimeoutHandler), this.isStreamTimeout)) {
      this.finishRequest();
      return;
    }
    this.finishRequest(), (u = s == null ? void 0 : s.onSuccess) == null || u.call(s, a, n.headers);
  }
}
function Ii(e, t) {
  return new ii(e, t);
}
const qe = {
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeTest: /[&<>"']/,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  escapeReplace: /[&<>"']/g,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  completeFencedCode: /^ {0,3}(`{3,}|~{3,})([\s\S]*?)\n {0,3}\1[ \n\t]*$/
}, ai = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Sn = (e) => ai[e];
function xn(e, t) {
  if (t) {
    if (qe.escapeTest.test(e))
      return e.replace(qe.escapeReplace, Sn);
  } else if (qe.escapeTestNoEncode.test(e))
    return e.replace(qe.escapeReplaceNoEncode, Sn);
  return e;
}
class li {
  constructor(t = {}) {
    _(this, "options");
    _(this, "markdownInstance");
    const {
      markedConfig: r = {}
    } = t;
    this.options = t, this.markdownInstance = new Tr(), this.configureLinkRenderer(), this.configureParagraphRenderer(), this.configureCodeRenderer(), this.markdownInstance.use(r);
  }
  configureLinkRenderer() {
    if (!this.options.openLinksInNewTab) return;
    const t = {
      link({
        href: r,
        title: n,
        tokens: s
      }) {
        const o = this.parser.parseInline(s), a = n ? ` title="${n}"` : "";
        return `<a href="${r}"${a} target="_blank" rel="noopener noreferrer">${o}</a>`;
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
        lang: s,
        escaped: o,
        codeBlockStyle: a
      }) {
        var f;
        const l = (f = (s || "").match(qe.notSpaceStart)) == null ? void 0 : f[0], c = `${r.replace(qe.endingNewline, "")}
`, u = a === "indented" || qe.completeFencedCode.test(n) ? "done" : "loading", m = o ? c : xn(c, !0), p = l ? ` class="language-${xn(l)}"` : "";
        return `<pre><code data-block="true" data-state="${u}"${p}>${m}</code></pre>
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
const ci = /* @__PURE__ */ i.memo((e) => {
  const {
    text: t,
    animationConfig: r
  } = e, {
    fadeDuration: n = 200,
    easing: s = "ease-in-out"
  } = r || {}, [o, a] = Se([]), l = le("");
  ye(() => {
    if (t === l.current) return;
    if (!(l.current && t.indexOf(l.current) === 0)) {
      a([t]), l.current = t;
      return;
    }
    const d = t.slice(l.current.length);
    d && (a((u) => [...u, d]), l.current = t);
  }, [t]);
  const c = Ye(() => ({
    animation: `x-markdown-fade-in ${n}ms ${s} forwards`
  }), [n, s]);
  return /* @__PURE__ */ i.createElement(i.Fragment, null, o.map((d, u) => /* @__PURE__ */ i.createElement("span", {
    style: c,
    key: `animation-text-${u}`
  }, d)));
}), wt = class wt {
  constructor(t) {
    _(this, "options");
    this.options = t;
  }
  /**
   * Detect unclosed tags using regular expressions
   */
  detectUnclosedTags(t) {
    var a;
    const r = /* @__PURE__ */ new Set(), n = [], s = /<\/?([a-zA-Z][a-zA-Z0-9-]*)(?:\s[^>]*)?>/g;
    let o = s.exec(t);
    for (; o !== null; ) {
      const [l, c] = o, d = l.startsWith("</"), u = l.endsWith("/>");
      if ((a = this.options.components) != null && a[c.toLowerCase()])
        if (d) {
          const m = n.lastIndexOf(c.toLowerCase());
          m !== -1 && n.splice(m, 1);
        } else u || n.push(c.toLowerCase());
      o = s.exec(t);
    }
    return n.forEach((l) => {
      r.add(l);
    }), r;
  }
  /**
   * Configure DOMPurify to preserve components and target attributes, filter everything else
   */
  configureDOMPurify() {
    const t = Object.keys(this.options.components || {}), r = this.options.dompurifyConfig || {}, n = Array.isArray(r.ADD_TAGS) ? r.ADD_TAGS : [], s = Array.isArray(r.ADD_ATTR) ? r.ADD_ATTR : [];
    return {
      ...r,
      ADD_TAGS: Array.from(/* @__PURE__ */ new Set([...t, ...n])),
      ADD_ATTR: Array.from(/* @__PURE__ */ new Set(["target", "rel", ...s]))
    };
  }
  createReplaceElement(t, r) {
    const {
      enableAnimation: n,
      animationConfig: s
    } = this.options.streaming || {};
    return (o) => {
      var y, C, S;
      const a = `x-markdown-component-${r.current++}`, l = o.type === "text" && o.data && wt.NON_WHITESPACE_REGEX.test(o.data), c = (y = o.parent) == null ? void 0 : y.name, d = c && ((C = this.options.components) == null ? void 0 : C[c]);
      if (n && l && !d)
        return /* @__PURE__ */ i.createElement(ci, {
          text: o.data,
          key: a,
          animationConfig: s
        });
      if (!("name" in o)) return;
      const {
        name: m,
        attribs: p,
        children: f
      } = o, h = (S = this.options.components) == null ? void 0 : S[m];
      if (h) {
        const $ = t != null && t.has(m) ? "loading" : "done", v = {
          domNode: o,
          streamStatus: $,
          key: a,
          ...p,
          ...p.disabled !== void 0 && {
            disabled: !0
          },
          ...p.checked !== void 0 && {
            checked: !0
          }
        }, B = [v.className, v.classname, v.class].filter(Boolean).join(" ").trim();
        if (v.className = B || "", m === "code") {
          const {
            "data-block": W = "false",
            "data-state": V = "done"
          } = p || {};
          v.block = W === "true", v.streamStatus = V === "loading" ? "loading" : "done";
        }
        return f && (v.children = this.processChildren(f, t, r)), /* @__PURE__ */ i.createElement(h, v);
      }
    };
  }
  processChildren(t, r, n) {
    return Mr.domToReact(t, {
      replace: this.createReplaceElement(r, n)
    });
  }
  processHtml(t) {
    const r = this.detectUnclosedTags(t), n = {
      current: 0
    }, s = this.configureDOMPurify(), o = Ir.sanitize(t, s);
    return Ar(o, {
      replace: this.createReplaceElement(r, n)
    });
  }
  render(t) {
    return this.processHtml(t);
  }
};
_(wt, "NON_WHITESPACE_REGEX", /[^\r\n\s]+/);
let Kt = wt, de = /* @__PURE__ */ function(e) {
  return e.Text = "text", e.Link = "link", e.Image = "image", e.Html = "html", e.Emphasis = "emphasis", e.List = "list", e.Table = "table", e;
}({});
const di = /^(`{3,}|~{3,})/, at = {
  image: [/^!\[[^\]\r\n]{0,1000}$/, /^!\[[^\r\n]{0,1000}\]\(*[^)\r\n]{0,1000}$/],
  link: [/^\[[^\]\r\n]{0,1000}$/, /^\[[^\r\n]{0,1000}\]\(*[^)\r\n]{0,1000}$/],
  html: [/^<\/$/, /^<\/?[a-zA-Z][a-zA-Z0-9-]{0,100}[^>\r\n]{0,1000}$/],
  commonEmphasis: [/^(\*{1,3}|_{1,3})(?!\s)(?!.*\1$)[^\r\n]{0,1000}$/],
  // regex2 matches cases like "- **"
  list: [/^[-+*]\s{0,3}$/, /^[-+*]\s{1,3}(\*{1,3}|_{1,3})(?!\s)(?!.*\1$)[^\r\n]{0,1000}$/]
}, ui = (e) => {
  if (e.includes(`

`)) return !1;
  const t = e.split(`
`);
  if (t.length <= 1) return !0;
  const [r, n] = t, s = r.trim();
  if (!/^\|.*\|$/.test(s)) return !1;
  const a = n.trim().split("|").map((c) => c.trim()).filter(Boolean), l = /^:?-+:?$/;
  return a.every((c, d) => d === a.length - 1 && c === ":" || l.test(c));
}, rr = {
  [de.Link]: {
    tokenType: de.Link,
    isStartOfToken: (e) => e.startsWith("["),
    isStreamingValid: (e) => at.link.some((t) => t.test(e))
  },
  [de.Image]: {
    tokenType: de.Image,
    isStartOfToken: (e) => e.startsWith("!"),
    isStreamingValid: (e) => at.image.some((t) => t.test(e))
  },
  [de.Html]: {
    tokenType: de.Html,
    isStartOfToken: (e) => e.startsWith("<"),
    isStreamingValid: (e) => at.html.some((t) => t.test(e))
  },
  [de.Emphasis]: {
    tokenType: de.Emphasis,
    isStartOfToken: (e) => e.startsWith("*") || e.startsWith("_"),
    isStreamingValid: (e) => at.commonEmphasis.some((t) => t.test(e))
  },
  [de.List]: {
    tokenType: de.List,
    isStartOfToken: (e) => /^[-+*]/.test(e),
    isStreamingValid: (e) => at.list.some((t) => t.test(e))
  },
  [de.Table]: {
    tokenType: de.Table,
    isStartOfToken: (e) => e.startsWith("|"),
    isStreamingValid: ui
  }
}, mi = (e, t) => {
  const r = rr[t];
  if (!r) return;
  const {
    token: n,
    pending: s
  } = e;
  if (n === de.Text && r.isStartOfToken(s)) {
    e.token = t;
    return;
  }
  n === t && !r.isStreamingValid(s) && qt(e);
}, $n = Object.values(rr).map((e) => ({
  tokenType: e.tokenType,
  recognize: (t) => mi(t, e.tokenType)
})), Lt = () => ({
  pending: "",
  token: de.Text,
  processedLength: 0,
  completeMarkdown: ""
}), qt = (e) => {
  e.pending && (e.completeMarkdown += e.pending, e.pending = ""), e.token = de.Text;
}, fi = (e) => {
  const t = e.split(`
`);
  let r = !1, n = "", s = 0;
  for (const o of t) {
    const l = (o.endsWith("\r") ? o.slice(0, -1) : o).match(di);
    if (l) {
      const c = l[1], d = c[0], u = c.length;
      r ? d === n && u >= s && (r = !1, n = "", s = 0) : (r = !0, n = d, s = u);
    }
  }
  return r;
}, pi = (e) => {
  let t = "";
  for (let r = 0; r < e.length; r++) {
    const n = e.charCodeAt(r);
    n >= 55296 && n <= 56319 ? r + 1 < e.length && e.charCodeAt(r + 1) >= 56320 && e.charCodeAt(r + 1) <= 57343 && (t += e[r] + e[r + 1], r++) : (n < 56320 || n > 57343) && (t += e[r]);
  }
  return t;
}, gi = (e) => {
  try {
    return encodeURIComponent(e);
  } catch (t) {
    return t instanceof URIError ? encodeURIComponent(pi(e)) : "";
  }
}, hi = (e, t) => {
  const {
    streaming: r,
    components: n = {}
  } = t || {}, {
    hasNextChunk: s = !1,
    incompleteMarkdownComponentMap: o
  } = r || {}, [a, l] = Se(""), c = le(Lt()), d = ze((m) => {
    const {
      token: p,
      pending: f
    } = m;
    if (p === de.Text || p === de.Image && f === "!") return;
    if (p === de.Table && f.split(`
`).length > 2)
      return f;
    const y = (o || {})[p] || `incomplete-${p}`, C = gi(f);
    return n != null && n[y] ? `<${y} data-raw="${C}" />` : void 0;
  }, [o, n]), u = ze((m) => {
    if (!m) {
      l(""), c.current = Lt();
      return;
    }
    const p = c.current.completeMarkdown + c.current.pending;
    m.startsWith(p) || (c.current = Lt());
    const f = c.current, h = m.slice(f.processedLength);
    if (!h) return;
    f.processedLength += h.length;
    const y = fi(m);
    for (const S of h) {
      if (f.pending += S, y) {
        qt(f);
        continue;
      }
      if (f.token === de.Text)
        for (const $ of $n) $.recognize(f);
      else {
        const $ = $n.find((v) => v.tokenType === f.token);
        $ == null || $.recognize(f);
      }
      f.token === de.Text && qt(f);
    }
    const C = d(f);
    l(f.completeMarkdown + (C || ""));
  }, [d]);
  return ye(() => {
    if (typeof e != "string") {
      console.error(`X-Markdown: input must be string, not ${typeof e}.`), l("");
      return;
    }
    s ? u(e) : l(e);
  }, [e, s, u]), a;
}, yi = /* @__PURE__ */ i.memo((e) => {
  const {
    streaming: t,
    config: r,
    components: n,
    paragraphTag: s,
    content: o,
    children: a,
    rootClassName: l,
    className: c,
    style: d,
    openLinksInNewTab: u,
    dompurifyConfig: m
  } = e, p = M("x-markdown", l, c), f = hi(o || a || "", {
    streaming: t,
    components: n
  }), h = Ye(() => new li({
    markedConfig: r,
    paragraphTag: s,
    openLinksInNewTab: u
  }), [r, s, u]), y = Ye(() => new Kt({
    components: n,
    dompurifyConfig: m,
    streaming: t
  }), [n, m, t]), C = Ye(() => f ? h.parse(f) : "", [f, h]);
  return f ? /* @__PURE__ */ i.createElement("div", {
    className: p,
    style: d
  }, y.render(C)) : null;
});
process.env.NODE_ENV !== "production" && (yi.displayName = "XMarkdown");
export {
  Ri as A,
  Un as C,
  We as F,
  Ni as M,
  Zt as S,
  yi as X,
  Ti as a,
  ss as b,
  Ii as c,
  io as d,
  Mi as u
};
