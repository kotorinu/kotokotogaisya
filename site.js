function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return React.createElement(React.Fragment, null, React.createElement("style", null, __TWEAKS_STYLE), React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, React.createElement("b", null, title), React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), React.createElement("div", {
    className: "twk-body"
  }, children)));
}
function TweakSection({
  label,
  children
}) {
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, React.createElement("div", {
    className: "twk-lbl"
  }, React.createElement("span", null, label), value != null && React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}
function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return React.createElement("div", {
    className: "twk-row twk-row-h"
  }, React.createElement("div", {
    className: "twk-lbl"
  }, React.createElement("span", null, label)), React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return React.createElement(TweakRow, {
    label: label
  }, React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return React.createElement(TweakRow, {
    label: label
  }, React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return React.createElement(TweakRow, {
    label: label
  }, React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return React.createElement("div", {
    className: "twk-num"
  }, React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return React.createElement("div", {
      className: "twk-row twk-row-h"
    }, React.createElement("div", {
      className: "twk-lbl"
    }, React.createElement("span", null, label)), React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return React.createElement(TweakRow, {
    label: label
  }, React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && React.createElement("span", null, sup.map((c, j) => React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
const CARS = [{
  id: "nx300h",
  maker: "レクサス",
  name: "NX300h",
  grade: "バージョンL",
  year: 2019,
  mileage: 2.7,
  price: 448,
  mission: "AT",
  fuel: "ハイブリッド",
  color: "ソニッククォーツ",
  displacement: "2500cc",
  inspection: "2027年11月",
  body: "SUV",
  seats: 5,
  tags: ["SUV", "ハイブリッド", "禁煙車"],
  features: ["純正ナビ", "フルセグTV", "バックモニター", "パワーバックドア", "ブラインドスポット", "プリクラッシュ", "レーダークルーズ", "パドルシフト", "ビルトインETC", "ドライブレコーダー", "ヘッドアップディスプレイ", "シートヒーター"],
  note: "後期モデル・ワンオーナー。記録簿完備で内外装ともに良好なコンディションです。"
}, {
  id: "alphard",
  maker: "トヨタ",
  name: "アルファード",
  grade: "2.5 S Cパッケージ",
  year: 2021,
  mileage: 3.4,
  price: 528,
  mission: "AT",
  fuel: "ガソリン",
  color: "ブラック",
  displacement: "2500cc",
  inspection: "2026年8月",
  body: "ミニバン",
  seats: 7,
  tags: ["ミニバン", "両側電動", "サンルーフ"],
  features: ["サンルーフ", "両側電動スライド", "デジタルインナーミラー", "10型ナビ", "後席モニター", "三眼LED", "パワーシート", "レーダークルーズ"],
  note: "人気のCパッケージ。家族での長距離移動も快適な一台です。"
}, {
  id: "cclass",
  maker: "メルセデス・ベンツ",
  name: "C200",
  grade: "アバンギャルド AMGライン",
  year: 2020,
  mileage: 4.1,
  price: 398,
  mission: "AT",
  fuel: "ガソリン",
  color: "ポーラーホワイト",
  displacement: "1500cc",
  inspection: "2026年4月",
  body: "セダン",
  seats: 5,
  tags: ["セダン", "AMGライン", "禁煙車"],
  features: ["レザーシート", "純正ナビ", "360°カメラ", "ヘッドアップディスプレイ", "アダプティブクルーズ", "パワーシート", "シートヒーター", "LEDヘッド"],
  note: "上質なインテリアと走り。日常から週末まで幅広く活躍します。"
}, {
  id: "aqua",
  maker: "トヨタ",
  name: "アクア",
  grade: "Z",
  year: 2022,
  mileage: 1.2,
  price: 198,
  mission: "AT",
  fuel: "ハイブリッド",
  color: "シアンメタリック",
  displacement: "1500cc",
  inspection: "2028年2月",
  body: "コンパクト",
  seats: 5,
  tags: ["コンパクト", "低燃費", "禁煙車"],
  features: ["ディスプレイオーディオ", "バックカメラ", "セーフティセンス", "LEDヘッド", "スマートキー", "ETC"],
  note: "低走行・低燃費。通勤やセカンドカーに最適なコンパクトハイブリッド。"
}, {
  id: "nbox",
  maker: "ホンダ",
  name: "N-BOX",
  grade: "カスタムL",
  year: 2021,
  mileage: 2.0,
  price: 168,
  mission: "AT",
  fuel: "ガソリン",
  color: "プレミアムサンライトホワイト",
  displacement: "660cc",
  inspection: "2027年6月",
  body: "軽自動車",
  seats: 4,
  tags: ["軽自動車", "両側電動", "禁煙車"],
  features: ["片側電動スライド", "ホンダセンシング", "純正ナビ", "バックカメラ", "LEDヘッド", "アダプティブクルーズ"],
  note: "視界も広く扱いやすい人気の軽。はじめの一台にもおすすめです。"
}, {
  id: "note",
  maker: "日産",
  name: "ノート",
  grade: "e-POWER X",
  year: 2021,
  mileage: 2.9,
  price: 184,
  mission: "AT",
  fuel: "ハイブリッド",
  color: "ガーネットレッド",
  displacement: "1200cc",
  inspection: "2026年12月",
  body: "コンパクト",
  seats: 5,
  tags: ["コンパクト", "e-POWER", "禁煙車"],
  features: ["プロパイロット", "アラウンドビューモニター", "純正ナビ", "ETC", "LEDヘッド", "インテリジェントキー"],
  note: "モーター駆動の静かで力強い走り。街乗りで扱いやすい一台。"
}, {
  id: "hiace",
  maker: "トヨタ",
  name: "ハイエースバン",
  grade: "スーパーGL",
  year: 2020,
  mileage: 6.8,
  price: 318,
  mission: "AT",
  fuel: "ディーゼル",
  color: "パールホワイト",
  displacement: "2800cc",
  inspection: "2026年9月",
  body: "商用バン",
  seats: 5,
  tags: ["商用", "ディーゼル", "事業用"],
  features: ["純正ナビ", "バックカメラ", "ETC", "両側スライド", "セーフティセンス", "ベッドキット"],
  note: "事業の相棒に。積載性と耐久性に優れた定番の商用バン。"
}, {
  id: "prius",
  maker: "トヨタ",
  name: "プリウス",
  grade: "A ツーリングセレクション",
  year: 2022,
  mileage: 1.6,
  price: 268,
  mission: "AT",
  fuel: "ハイブリッド",
  color: "アティチュードブラック",
  displacement: "1800cc",
  inspection: "2028年1月",
  body: "セダン",
  seats: 5,
  tags: ["低燃費", "ハイブリッド", "禁煙車"],
  features: ["純正ナビ", "ブラインドスポット", "パーキングアシスト", "LEDヘッド", "ETC2.0", "本革巻ステアリング"],
  note: "燃費・装備ともに充実したツーリングセレクション。長距離も安心。"
}];
const BODY_TYPES = ["すべて", "SUV", "ミニバン", "セダン", "コンパクト", "軽自動車", "商用バン"];
const SERVICES = [{
  id: "chatbot",
  no: "01",
  title: "AIチャットボット導入",
  en: "AI CHATBOT",
  lead: "問い合わせ対応を、24時間そのままに。",
  desc: "よくある質問への一次対応をAIが担い、人手をかけずに取りこぼしを減らします。自社の資料やFAQを学習させ、御社らしい受け答えに育てられます。",
  points: ["FAQ・社内資料の学習", "Web・LINE への設置", "有人対応への引き継ぎ"]
}, {
  id: "automation",
  no: "02",
  title: "業務自動化",
  en: "AUTOMATION",
  lead: "繰り返しの作業を、仕組みに任せる。",
  desc: "転記・集計・通知といった毎日の手作業を自動化し、本来の業務に時間を取り戻します。まず小さく始め、効果を見ながら広げていきます。",
  points: ["スプレッドシート連携", "定型メール・通知の自動化", "データ集計・レポート化"]
}, {
  id: "web",
  no: "03",
  title: "Webサイト・EC制作",
  en: "WEB & EC",
  lead: "売れる・伝わる、Webの入り口を。",
  desc: "コーポレートサイトからネットショップまで、目的に合わせて設計・制作します。公開後の更新・改善まで継続して伴走します。",
  points: ["要件整理・設計", "デザイン・実装", "公開後の運用・改善"]
}, {
  id: "lp",
  no: "04",
  title: "LP制作",
  en: "LANDING PAGE",
  lead: "ひとつの行動に、まっすぐ導く。",
  desc: "キャンペーンや商品訴求のための1枚ページを制作。訴求の優先順位を整理し、問い合わせ・購入につながる構成に仕上げます。",
  points: ["訴求設計・構成案", "デザイン・実装", "計測タグの設置"]
}, {
  id: "hp",
  no: "05",
  title: "ホームページ制作",
  en: "HOMEPAGE",
  lead: "小さく始めて、ていねいに育てる。",
  desc: "これから初めてサイトを持つ事業者の方へ。必要十分な構成で無理なく公開し、運用しながら少しずつ整えていきます。",
  points: ["スマホ対応デザイン", "お問い合わせフォーム", "更新しやすい構成"]
}];
const STEPS = [{
  no: "01",
  title: "ご相談・ヒアリング",
  desc: "現状の困りごとと目標をうかがい、対象範囲を一緒に決めます。"
}, {
  no: "02",
  title: "ご提案・お見積り",
  desc: "小さく始められる形で、優先順位と費用感をご提示します。"
}, {
  no: "03",
  title: "制作・導入",
  desc: "短いサイクルで形にし、確認をいただきながら進めます。"
}, {
  no: "04",
  title: "運用・改善",
  desc: "公開・導入後も数字を見ながら継続的に改善します。"
}];
const WORKS = [{
  tag: "ホームページ制作",
  title: "自社コーポレートサイト",
  desc: "車両販売とDX支援を統括するサイトを内製で構築。"
}, {
  tag: "業務自動化",
  title: "在庫情報の自動更新",
  desc: "車両フィードを取り込み、在庫ページを自動更新する仕組み。"
}, {
  tag: "AIチャットボット",
  title: "問い合わせ一次対応",
  desc: "FAQを学習したチャットで、夜間・休業日もカバー。"
}];
const SITE_ASSETS = {
  hero: "assets/images/hero-showroom-dx.png",
  businessVehicles: "assets/images/business-vehicles.png",
  businessDx: "assets/images/business-dx.png",
  dxHero: "assets/images/business-dx.png",
  workAutomation: "assets/images/work-automation.png",
  company: "assets/images/business-vehicles.png"
};
Object.assign(window, {
  CARS,
  BODY_TYPES,
  SERVICES,
  STEPS,
  WORKS,
  SITE_ASSETS
});
const {
  useState,
  useEffect,
  useRef
} = React;
function Ph({
  label,
  dark,
  className = "",
  style,
  src,
  alt
}) {
  if (src) {
    return React.createElement("figure", {
      className: "ph ph--image " + className,
      style: style
    }, React.createElement("img", {
      src: src,
      alt: alt || label || "",
      loading: "lazy"
    }));
  }
  return React.createElement("div", {
    className: "ph " + (dark ? "ph--dark " : "") + className,
    style: style
  }, React.createElement("span", {
    className: "tag"
  }, label));
}
const Icon = {
  arrow: p => React.createElement("svg", _extends({
    className: "arw",
    width: "15",
    height: "15",
    viewBox: "0 0 16 16",
    fill: "none"
  }, p), React.createElement("path", {
    d: "M2 8h11M9 4l4 4-4 4",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  car: p => React.createElement("svg", _extends({
    width: "34",
    height: "34",
    viewBox: "0 0 34 34",
    fill: "none"
  }, p), React.createElement("path", {
    d: "M5 20l2.4-7.2A3 3 0 0 1 10.2 11h13.6a3 3 0 0 1 2.8 1.8L29 20M5 20h24M5 20v4h3v-2M29 20v4h-3v-2",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React.createElement("circle", {
    cx: "10.5",
    cy: "20",
    r: "1.4",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), React.createElement("circle", {
    cx: "23.5",
    cy: "20",
    r: "1.4",
    stroke: "currentColor",
    strokeWidth: "1.4"
  })),
  chip: p => React.createElement("svg", _extends({
    width: "34",
    height: "34",
    viewBox: "0 0 34 34",
    fill: "none"
  }, p), React.createElement("rect", {
    x: "10",
    y: "10",
    width: "14",
    height: "14",
    rx: "1.5",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), React.createElement("rect", {
    x: "14.5",
    y: "14.5",
    width: "5",
    height: "5",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), React.createElement("path", {
    d: "M14 10V6M20 10V6M14 28v-4M20 28v-4M10 14H6M10 20H6M28 14h-4M28 20h-4",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  })),
  hands: p => React.createElement("svg", _extends({
    width: "34",
    height: "34",
    viewBox: "0 0 34 34",
    fill: "none"
  }, p), React.createElement("path", {
    d: "M6 22l5 4 9-2 8-6c1-1 0-2.6-1.5-2.2L20 19M6 22V13M6 22l-2 1M20 19l-5-1.5c-1.6-.5-2.4-1-4-1H8",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), React.createElement("path", {
    d: "M16 9c1.5-2 5-2 6 0",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  })),
  heart: p => React.createElement("svg", _extends({
    width: "15",
    height: "15",
    viewBox: "0 0 16 16",
    fill: "none"
  }, p), React.createElement("path", {
    d: "M8 13.5S2.5 10 2.5 6.2A2.7 2.7 0 0 1 8 5a2.7 2.7 0 0 1 5.5 1.2C13.5 10 8 13.5 8 13.5Z",
    stroke: "currentColor",
    strokeWidth: "1.3",
    strokeLinejoin: "round"
  }))
};
function Header({
  route,
  go
}) {
  const links = [{
    id: "home",
    ja: "ホーム",
    en: "HOME"
  }, {
    id: "cars",
    ja: "車両情報",
    en: "VEHICLES"
  }, {
    id: "dx",
    ja: "DX支援",
    en: "DX SUPPORT"
  }, {
    id: "company",
    ja: "会社概要",
    en: "COMPANY"
  }];
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "topbar"
  }, React.createElement("div", {
    className: "wrap"
  }, React.createElement("span", {
    className: "muted"
  }, "\u5927\u962A\u5E9C\u5BDD\u5C4B\u5DDD\u5E02\u9ED2\u539F\u6A58\u753A4-1"), React.createElement("span", null, React.createElement("b", null, "TEL 072-000-0000"), " ", React.createElement("span", {
    className: "muted"
  }, "\uFF0F \u53D7\u4ED8 9:00\u201318:00\uFF08\u65E5\u795D\u4F11\uFF09")))), React.createElement("header", {
    className: "site"
  }, React.createElement("div", {
    className: "wrap"
  }, React.createElement("div", {
    className: "brand",
    onClick: () => go("home")
  }, React.createElement("div", {
    className: "mark"
  }, React.createElement("span", null, "\u3053")), React.createElement("div", null, React.createElement("div", {
    className: "name"
  }, "\u3053\u3068\u3053\u3068\u682A\u5F0F\u4F1A\u793E"), React.createElement("div", {
    className: "en"
  }, "KOTOKOTO INC."))), React.createElement("nav", {
    className: "main"
  }, links.map(l => React.createElement("a", {
    key: l.id,
    className: route.name === l.id ? "active" : "",
    onClick: () => go(l.id)
  }, l.ja, React.createElement("span", {
    className: "en"
  }, l.en)))), React.createElement("div", {
    className: "nav-cta"
  }, React.createElement("a", {
    className: "btn btn--solid",
    onClick: () => go("contact")
  }, "\u304A\u554F\u3044\u5408\u308F\u305B", React.createElement(Icon.arrow, null))), React.createElement("button", {
    className: "menu-btn",
    onClick: () => go(route.name === "cars" ? "dx" : "cars"),
    "aria-label": "menu"
  }, React.createElement("svg", {
    width: "20",
    height: "14",
    viewBox: "0 0 20 14"
  }, React.createElement("path", {
    d: "M0 1h20M0 7h20M0 13h20",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }))))));
}
function Eyebrow({
  en,
  ja,
  light
}) {
  return React.createElement("div", {
    className: "eyebrow",
    style: light ? {
      color: "rgba(255,255,255,.7)"
    } : null
  }, en, ja ? React.createElement("span", {
    className: "ja"
  }, ja) : null);
}
function Band({
  go
}) {
  return React.createElement("section", {
    className: "band"
  }, React.createElement("div", {
    className: "wrap"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    en: "CONTACT",
    ja: "\u304A\u554F\u3044\u5408\u308F\u305B"
  }), React.createElement("h2", {
    style: {
      marginTop: 18
    }
  }, "\u307E\u305A\u306F\u3001\u304A\u6C17\u8EFD\u306B\u3054\u76F8\u8AC7\u3092\u3002"), React.createElement("p", null, "\u8ECA\u4E21\u306E\u3053\u3068\u3001\u696D\u52D9\u306EDX\u306E\u3053\u3068\u3002\u5C0F\u3055\u306A\u304A\u56F0\u308A\u3054\u3068\u304B\u3089\u3067\u69CB\u3044\u307E\u305B\u3093\u3002", React.createElement("br", null), "\u5FA1\u793E\u306B\u5408\u3063\u305F\u7121\u7406\u306E\u306A\u3044\u3054\u63D0\u6848\u3092\u3044\u305F\u3057\u307E\u3059\u3002")), React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      flexWrap: "wrap"
    }
  }, React.createElement("a", {
    className: "btn btn--solid",
    onClick: () => go("contact")
  }, "\u76F8\u8AC7\u3057\u3066\u307F\u308B", React.createElement(Icon.arrow, null)), React.createElement("a", {
    className: "btn btn--ghost",
    onClick: () => go("cars")
  }, "\u5728\u5EAB\u3092\u898B\u308B"))));
}
function Footer({
  go
}) {
  return React.createElement("footer", {
    className: "site"
  }, React.createElement("div", {
    className: "wrap"
  }, React.createElement("div", {
    className: "top"
  }, React.createElement("div", {
    className: "fbrand"
  }, React.createElement("div", {
    className: "name"
  }, "\u3053\u3068\u3053\u3068\u682A\u5F0F\u4F1A\u793E"), React.createElement("p", null, "\u307E\u3058\u3081\u306B\u3001\u30B3\u30C4\u30B3\u30C4\u3002\u826F\u8CEA\u306A\u8ECA\u4E21\u8CA9\u58F2\u3068\u3001\u4E2D\u5C0F\u4F01\u696D\u306E\u305F\u3081\u306EDX\u652F\u63F4\u3002\u5927\u962A\u30FB\u5BDD\u5C4B\u5DDD\u304B\u3089\u3001\u5730\u57DF\u306E\u4E8B\u696D\u306B\u5BC4\u308A\u6DFB\u3044\u307E\u3059\u3002")), React.createElement("div", {
    className: "fcol"
  }, React.createElement("h4", null, "\u4E8B\u696D"), React.createElement("a", {
    onClick: () => go("cars")
  }, "\u8ECA\u4E21\u60C5\u5831"), React.createElement("a", {
    onClick: () => go("dx")
  }, "DX\u652F\u63F4")), React.createElement("div", {
    className: "fcol"
  }, React.createElement("h4", null, "\u4F1A\u793E"), React.createElement("a", {
    onClick: () => go("company")
  }, "\u4F1A\u793E\u6982\u8981"), React.createElement("a", {
    onClick: () => go("contact")
  }, "\u304A\u554F\u3044\u5408\u308F\u305B")), React.createElement("div", {
    className: "fcol"
  }, React.createElement("h4", null, "\u6240\u5728\u5730"), React.createElement("a", null, "\u5927\u962A\u5E9C\u5BDD\u5C4B\u5DDD\u5E02", React.createElement("br", null), "\u9ED2\u539F\u6A58\u753A4-1"), React.createElement("a", null, "TEL 072-000-0000"))), React.createElement("div", {
    className: "legal"
  }, React.createElement("span", null, "\xA9 2025 Kotokoto Inc. All rights reserved."), React.createElement("span", {
    style: {
      display: "flex",
      gap: 20
    }
  }, React.createElement("a", null, "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC"), React.createElement("a", null, "\u7279\u5B9A\u5546\u53D6\u5F15\u6CD5\u306B\u57FA\u3065\u304F\u8868\u8A18")))));
}
function SHead({
  en,
  ja,
  title,
  lead,
  action
}) {
  return React.createElement("div", {
    className: "shead"
  }, React.createElement("div", {
    style: {
      maxWidth: "900px",
      width: "100%"
    }
  }, React.createElement(Eyebrow, {
    en: en,
    ja: ja
  }), React.createElement("h2", {
    style: {
      marginTop: 16
    }
  }, title), lead ? React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: "900px",
      width: "100%"
    }
  }, lead) : null), action);
}
function fmtMileage(m) {
  return m + "万km";
}
Object.assign(window, {
  Ph,
  Icon,
  Header,
  Footer,
  Eyebrow,
  Band,
  SHead,
  fmtMileage
});
function HomePage({
  go
}) {
  return React.createElement("div", {
    className: "fade"
  }, React.createElement("section", {
    className: "hero"
  }, React.createElement("div", {
    className: "wrap"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    en: "KOTOKOTO INC.",
    ja: "\u81EA\u52D5\u8ECA \xD7 DX"
  }), React.createElement("h1", {
    style: {
      marginTop: 24,
      fontWeight: "600",
      fontSize: "60px"
    }
  }, "\u307E\u3058\u3081\u306B\u3001 \u30B3\u30C4\u30B3\u30C4\u3002", React.createElement("br", null), React.createElement("span", {
    className: "em"
  }, "\u201C\u3053\u3068\u201D"), "\u3092\u3001", React.createElement("br", null), "\u3000\u3084\u3055\u3057\u304F\u524D\u3078\u3002"), React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: "500px",
      width: "100%"
    }
  }, "\u3053\u3068\u3053\u3068\u682A\u5F0F\u4F1A\u793E\u306F\u3001\u5927\u962A\u30FB\u5BDD\u5C4B\u5DDD\u3092\u62E0\u70B9\u306B", React.createElement("b", null, "\u300C\u826F\u8CEA\u306A\u8ECA\u4E21\u8CA9\u58F2\u300D"), "\u3068", React.createElement("b", null, "\u300C\u4E2D\u5C0F\u4F01\u696D\u306E\u305F\u3081\u306EDX\u652F\u63F4\u300D"), "\u306E \u4E8C\u3064\u306E\u4E8B\u696D\u3092\u5C55\u958B\u3057\u3066\u3044\u307E\u3059\u3002\u8AA0\u5B9F\u306A\u5BFE\u5FDC\u3068\u78BA\u304B\u306A\u6280\u8853\u3067\u3001 \u5730\u57DF\u306E\u4E8B\u696D\u306B\u5BC4\u308A\u6DFB\u3044\u307E\u3059\u3002"), React.createElement("div", {
    className: "cta-row"
  }, React.createElement("a", {
    className: "btn btn--solid",
    onClick: () => go("cars")
  }, "\u8ECA\u4E21\u3092\u63A2\u3059", React.createElement(Icon.arrow, null)), React.createElement("a", {
    className: "btn btn--ghost",
    onClick: () => go("dx")
  }, "DX\u652F\u63F4\u3092\u898B\u308B")), React.createElement("div", {
    className: "stats"
  }, React.createElement("div", null, React.createElement("div", {
    className: "n serif"
  }, "2", React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, "\u4E8B\u696D")), React.createElement("div", {
    className: "l"
  }, "\u8ECA\u4E21\u8CA9\u58F2\u30FBDX\u652F\u63F4")), React.createElement("div", null, React.createElement("div", {
    className: "n serif"
  }, "\u5BDD\u5C4B\u5DDD"), React.createElement("div", {
    className: "l"
  }, "\u5927\u962A\u30FB\u5317\u6CB3\u5185\u30A8\u30EA\u30A2")), React.createElement("div", null, React.createElement("div", {
    className: "n serif"
  }, "2025"), React.createElement("div", {
    className: "l"
  }, "Established")))), React.createElement("div", {
    className: "hero-visual"
  }, React.createElement(Ph, {
    src: SITE_ASSETS.hero,
    alt: "\u8ECA\u4E21\u8CA9\u58F2\u3068DX\u652F\u63F4\u3092\u8868\u3059\u30B7\u30E7\u30FC\u30EB\u30FC\u30E0\u306E\u30E1\u30A4\u30F3\u30D3\u30B8\u30E5\u30A2\u30EB",
    style: {
      width: "100%",
      height: "100%"
    }
  })))), React.createElement("section", {
    className: "section wrap"
  }, React.createElement(SHead, {
    en: "BUSINESS",
    ja: "\u4E8B\u696D\u5185\u5BB9",
    title: "\u4E8C\u3064\u306E\u8EF8\u3067\u3001\u4E8B\u696D\u3092\u524D\u3078\u3002",
    lead: "\u201C\u30E2\u30CE\u201D\u3068\u201C\u4ED5\u7D44\u307F\u201D\u306E\u4E21\u9762\u304B\u3089\u3002\u4E00\u53F0\u306E\u8ECA\u3082\u3001\u4E00\u3064\u306E\u696D\u52D9\u6539\u5584\u3082\u3001\u540C\u3058\u8AA0\u5B9F\u3055\u3067\u304A\u624B\u4F1D\u3044\u3057\u307E\u3059\u3002"
  }), React.createElement("div", {
    className: "biz-grid"
  }, React.createElement("div", {
    className: "biz",
    onClick: () => go("cars")
  }, React.createElement(Ph, {
    className: "pic",
    src: SITE_ASSETS.businessVehicles,
    alt: "\u6E05\u6F54\u306A\u8ECA\u4E21\u8CA9\u58F2\u30B9\u30DA\u30FC\u30B9"
  }), React.createElement("div", {
    className: "body"
  }, React.createElement("div", {
    className: "no serif"
  }, "01 \u2014 VEHICLES"), React.createElement("h3", null, "\u8ECA\u4E21\u8CA9\u58F2"), React.createElement("div", {
    className: "sub"
  }, "\u826F\u8CEA\u306A\u4E00\u53F0\u3092\u3001\u9069\u6B63\u4FA1\u683C\u3067\u3002"), React.createElement("p", null, "\u8EFD\u81EA\u52D5\u8ECA\u304B\u3089\u8F38\u5165\u8ECA\u307E\u3067\u3001\u72B6\u614B\u306E\u826F\u3044\u4E2D\u53E4\u8ECA\u3092\u53B3\u9078\u3057\u3066\u3054\u7528\u610F\u3002\u5728\u5EAB\u60C5\u5831\u306F\u8ECA\u4E21\u60C5\u5831\u30DA\u30FC\u30B8\u304B\u3089\u3054\u89A7\u3044\u305F\u3060\u3051\u307E\u3059\u3002"), React.createElement("div", {
    className: "go"
  }, "\u5728\u5EAB\u3092\u898B\u308B", React.createElement(Icon.arrow, null)))), React.createElement("div", {
    className: "biz",
    onClick: () => go("dx")
  }, React.createElement(Ph, {
    className: "pic",
    src: SITE_ASSETS.businessDx,
    alt: "DX\u652F\u63F4\u3092\u8868\u3059\u30C7\u30B9\u30AF\u3068\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9"
  }), React.createElement("div", {
    className: "body"
  }, React.createElement("div", {
    className: "no serif"
  }, "02 \u2014 DX SUPPORT"), React.createElement("h3", null, "DX\u652F\u63F4"), React.createElement("div", {
    className: "sub"
  }, "\u4E2D\u5C0F\u4F01\u696D\u306E\u696D\u52D9\u3092\u3001AI\u3067\u8EFD\u304F\u3002"), React.createElement("p", null, "AI\u30C1\u30E3\u30C3\u30C8\u30DC\u30C3\u30C8\u30FB\u696D\u52D9\u81EA\u52D5\u5316\u30FBWeb/EC\u30FBLP\u30FB\u30DB\u30FC\u30E0\u30DA\u30FC\u30B8\u5236\u4F5C\u307E\u3067\u3002\u5C0F\u3055\u304F\u59CB\u3081\u3066\u3001\u3066\u3044\u306D\u3044\u306B\u80B2\u3066\u307E\u3059\u3002"), React.createElement("div", {
    className: "go"
  }, "\u652F\u63F4\u5185\u5BB9\u3092\u898B\u308B", React.createElement(Icon.arrow, null)))))), React.createElement("section", {
    className: "section--tight wrap"
  }, React.createElement("div", {
    className: "values"
  }, React.createElement("div", {
    className: "value"
  }, React.createElement("div", {
    className: "ic"
  }, React.createElement(Icon.heart, null)), React.createElement("h3", null, "\u8AA0\u5B9F\u306A\u5BFE\u5FDC"), React.createElement("p", null, "\u5927\u3052\u3055\u306B\u58F2\u3089\u306A\u3044\u3001\u5FC5\u8981\u306A\u3053\u3068\u3092\u6B63\u76F4\u306B\u3002\u9577\u304F\u304A\u4ED8\u304D\u5408\u3044\u3044\u305F\u3060\u3051\u308B\u95A2\u4FC2\u3092\u7B2C\u4E00\u306B\u8003\u3048\u307E\u3059\u3002")), React.createElement("div", {
    className: "value"
  }, React.createElement("div", {
    className: "ic"
  }, React.createElement(Icon.car, null)), React.createElement("h3", null, "\u78BA\u304B\u306A\u76EE\u5229\u304D"), React.createElement("p", null, "\u72B6\u614B\u30FB\u8A18\u9332\u30FB\u76F8\u5834\u3092\u898B\u6975\u3081\u3001\u81EA\u4FE1\u3092\u6301\u3063\u3066\u304A\u3059\u3059\u3081\u3067\u304D\u308B\u8ECA\u4E21\u3060\u3051\u3092\u4ED5\u5165\u308C\u3066\u3044\u307E\u3059\u3002")), React.createElement("div", {
    className: "value"
  }, React.createElement("div", {
    className: "ic"
  }, React.createElement(Icon.chip, null)), React.createElement("h3", null, "\u7D9A\u304F\u4F34\u8D70"), React.createElement("p", null, "\u7D0D\u8ECA\u5F8C\u3082\u3001\u5C0E\u5165\u5F8C\u3082\u3002\u56F0\u3063\u305F\u3068\u304D\u306B\u76F8\u8AC7\u3067\u304D\u308B\u3001\u5730\u57DF\u306E\u8EAB\u8FD1\u306A\u5B58\u5728\u3067\u3042\u308A\u7D9A\u3051\u307E\u3059\u3002")))), React.createElement("section", {
    className: "section wrap",
    style: {
      paddingTop: 40
    }
  }, React.createElement(SHead, {
    en: "PICK UP",
    ja: "\u304A\u3059\u3059\u3081\u8ECA\u4E21",
    title: "\u4ECA\u6708\u306E\u304A\u3059\u3059\u3081\u8ECA\u4E21",
    action: React.createElement("a", {
      className: "btn btn--line",
      onClick: () => go("cars")
    }, "\u5728\u5EAB\u4E00\u89A7\u3078 ", React.createElement(Icon.arrow, null))
  }), React.createElement("div", {
    className: "cars"
  }, (window.PUBLIC_CARS || CARS).slice(0, 3).map(c => React.createElement(CarCard, {
    key: c.id,
    car: c,
    go: go
  }))), React.createElement("div", {
    className: "feed-note"
  }, React.createElement("span", {
    className: "dot"
  }), "\u5728\u5EAB\u60C5\u5831\u306F\u30AB\u30FC\u30BB\u30F3\u30B5\u30FC\uFF0F\u30B0\u30FC\u30CD\u30C3\u30C8\u9023\u643A\u3067\u968F\u6642\u66F4\u65B0\u3055\u308C\u307E\u3059\uFF08\u203B\u30C7\u30E2\u753B\u9762\u3067\u306F\u30B5\u30F3\u30D7\u30EB\u3092\u8868\u793A\u3057\u3066\u3044\u307E\u3059\uFF09")), React.createElement("section", {
    className: "band",
    style: {
      background: "var(--accent-ink)"
    }
  }, React.createElement("div", {
    className: "wrap",
    style: {
      padding: "84px 32px"
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 760,
      width: "100%"
    }
  }, React.createElement(Eyebrow, {
    en: "DX SUPPORT",
    ja: "DX\u652F\u63F4",
    light: true
  }), React.createElement("h2", {
    style: {
      marginTop: 18,
      color: "#fff",
      fontSize: "clamp(26px,3vw,38px)"
    }
  }, "\u300C\u4EBA\u624B\u304C\u8DB3\u308A\u306A\u3044\u300D \xA0 \u3092\u3001\u4ED5\u7D44\u307F\u3067\u88DC\u3046\u3002"), React.createElement("p", {
    style: {
      color: "rgba(255,255,255,.72)",
      marginTop: 16,
      fontSize: 15
    }
  }, "AI\u3068\u81EA\u52D5\u5316\u3067\u3001\u6BCE\u65E5\u306E\u624B\u9593\u3092\u6E1B\u3089\u3059\u3002 Web\u5236\u4F5C\u3067\u3001\u4F1D\u308F\u308B\u5165\u308A\u53E3\u3092\u3064\u304F\u308B\u3002", React.createElement("br", null), "\u5FA1\u793E\u306E\u201C\u3061\u3087\u3046\u3069\u3044\u3044DX\u201D\u3092\u3001\u7121\u7406\u306E\u306A\u3044\u4E00\u6B69\u304B\u3089\u3054\u63D0\u6848\u3057\u307E\u3059\u3002")), React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 30,
      height: "96px",
      flexFlow: "wrap"
    }
  }, SERVICES.map(s => React.createElement("span", {
    key: s.id,
    style: {
      fontSize: 13,
      color: "#fff",
      border: "1px solid rgba(255,255,255,.26)",
      padding: "9px 16px",
      borderRadius: 999,
      letterSpacing: ".02em"
    }
  }, s.title))), React.createElement("div", {
    style: {
      marginTop: 30
    }
  }, React.createElement("a", {
    className: "btn btn--solid",
    style: {
      background: "#fff",
      color: "var(--accent-ink)"
    },
    onClick: () => go("dx")
  }, "DX\u652F\u63F4\u306E\u8A73\u7D30\u3078", React.createElement(Icon.arrow, null))))), React.createElement(Band, {
    go: go
  }));
}
window.HomePage = HomePage;
const {
  useState: useStateC
} = React;
function CarCard({
  car,
  go
}) {
  const image = Array.isArray(car.images) && car.images.length ? car.images[0] : "";
  return React.createElement("div", {
    className: "car",
    onClick: () => go("car", {
      id: car.id
    })
  }, React.createElement("div", {
    className: "pic"
  }, React.createElement(Ph, {
    src: image,
    label: "\u753B\u50CF\u6E96\u5099\u4E2D",
    className: image ? "" : "ph--empty",
    style: {
      width: "100%",
      height: "100%"
    },
    alt: `${car.maker} ${car.name}`
  }), React.createElement("span", {
    className: "badge"
  }, car.year, "\u5E74\u5F0F"), React.createElement("span", {
    className: "heart"
  }, React.createElement(Icon.heart, null))), React.createElement("div", {
    className: "info"
  }, React.createElement("div", {
    className: "mk"
  }, car.maker), React.createElement("h3", null, car.name), React.createElement("div", {
    className: "grade"
  }, car.grade), React.createElement("div", {
    className: "specrow"
  }, React.createElement("div", null, React.createElement("span", null, "\u8D70\u884C"), fmtMileage(car.mileage)), React.createElement("div", null, React.createElement("span", null, "\u5E74\u5F0F"), car.year, "\u5E74"), React.createElement("div", null, React.createElement("span", null, "\u8ECA\u691C"), car.inspection.replace("年", ".").replace("月", ""))), React.createElement("div", {
    className: "price"
  }, React.createElement("div", null, React.createElement("span", {
    className: "n serif"
  }, car.price, React.createElement("span", {
    className: "u"
  }, "\u4E07\u5186"))), React.createElement("span", {
    className: "view"
  }, "\u8A73\u7D30\u3092\u898B\u308B \u203A"))));
}
function CarsPage({
  go
}) {
  const [filter, setFilter] = useStateC("すべて");
  const [sort, setSort] = useStateC("おすすめ");
  let list = (window.PUBLIC_CARS || CARS).filter(c => filter === "すべて" || c.body === filter);
  if (sort === "価格が安い") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "価格が高い") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "走行が少ない") list = [...list].sort((a, b) => a.mileage - b.mileage);
  if (sort === "年式が新しい") list = [...list].sort((a, b) => b.year - a.year);
  return React.createElement("div", {
    className: "fade"
  }, React.createElement("section", {
    className: "section--tight wrap",
    style: {
      paddingTop: 56,
      paddingBottom: 0
    }
  }, React.createElement(Eyebrow, {
    en: "VEHICLES",
    ja: "\u8ECA\u4E21\u60C5\u5831"
  }), React.createElement("h1", {
    className: "serif",
    style: {
      fontSize: "clamp(30px,3.6vw,46px)",
      marginTop: 18
    }
  }, "\u8ECA\u4E21\u60C5\u5831"), React.createElement("p", {
    className: "lead",
    style: {
      color: "var(--ink-soft)",
      marginTop: 14,
      maxWidth: "52ch"
    }
  }, "\u72B6\u614B\u306E\u826F\u3044\u53B3\u9078\u8ECA\u4E21\u3092\u3054\u7528\u610F\u3057\u3066\u3044\u307E\u3059\u3002\u6C17\u306B\u306A\u308B\u8ECA\u4E21\u306F\u304A\u6C17\u8EFD\u306B\u304A\u554F\u3044\u5408\u308F\u305B\u304F\u3060\u3055\u3044\u3002\u8A66\u4E57\u30FB\u73FE\u8ECA\u78BA\u8A8D\u3082\u6B53\u8FCE\u3067\u3059\u3002"), React.createElement("div", {
    className: "feed-note",
    style: {
      marginTop: 22,
      marginBottom: 8
    }
  }, React.createElement("span", {
    className: "dot"
  }), "\u30AB\u30FC\u30BB\u30F3\u30B5\u30FC\uFF0F\u30B0\u30FC\u30CD\u30C3\u30C8\u9023\u643A\u3067\u5728\u5EAB\u3092\u81EA\u52D5\u66F4\u65B0\uFF08\u203B\u30C7\u30E2\u753B\u9762\u3067\u306F\u30B5\u30F3\u30D7\u30EB\u8ECA\u4E21\u3092\u8868\u793A\uFF09")), React.createElement("section", {
    className: "section wrap",
    style: {
      paddingTop: 40
    }
  }, React.createElement("div", {
    className: "toolbar"
  }, React.createElement("div", {
    className: "chips"
  }, BODY_TYPES.map(b => React.createElement("button", {
    key: b,
    className: "chip" + (filter === b ? " on" : ""),
    onClick: () => setFilter(b)
  }, b))), React.createElement("div", {
    className: "select"
  }, React.createElement("span", null, "\u4E26\u3073\u66FF\u3048"), React.createElement("select", {
    value: sort,
    onChange: e => setSort(e.target.value)
  }, React.createElement("option", null, "\u304A\u3059\u3059\u3081"), React.createElement("option", null, "\u4FA1\u683C\u304C\u5B89\u3044"), React.createElement("option", null, "\u4FA1\u683C\u304C\u9AD8\u3044"), React.createElement("option", null, "\u8D70\u884C\u304C\u5C11\u306A\u3044"), React.createElement("option", null, "\u5E74\u5F0F\u304C\u65B0\u3057\u3044")))), React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--ink-faint)",
      marginBottom: 18,
      letterSpacing: ".03em"
    }
  }, list.length, "\u53F0\u306E\u8ECA\u4E21\u304C\u898B\u3064\u304B\u308A\u307E\u3057\u305F"), React.createElement("div", {
    className: "cars"
  }, list.map(c => React.createElement(CarCard, {
    key: c.id,
    car: c,
    go: go
  })))), React.createElement(Band, {
    go: go
  }));
}
function CarDetail({
  go,
  id
}) {
  const cars = window.PUBLIC_CARS || CARS;
  const car = cars.find(c => c.id === id) || cars[0] || CARS[0];
  const [active, setActive] = useStateC(0);
  const images = Array.isArray(car.images) ? car.images : [];
  const thumbs = images.length ? images : ["正面", "後方", "内装", "メーター", "エンジン"];
  const rows = [["メーカー", car.maker], ["車名 / グレード", car.name + "　" + car.grade], ["年式", car.year + "年"], ["走行距離", fmtMileage(car.mileage)], ["車検", car.inspection], ["ミッション", car.mission], ["燃料", car.fuel], ["排気量", car.displacement], ["乗車定員", car.seats + "名"], ["ボディタイプ", car.body], ["ボディカラー", car.color]];
  return React.createElement("div", {
    className: "fade"
  }, React.createElement("section", {
    className: "section wrap",
    style: {
      paddingTop: 40
    }
  }, React.createElement("div", {
    className: "crumb"
  }, React.createElement("a", {
    onClick: () => go("home")
  }, "\u30DB\u30FC\u30E0"), React.createElement("span", null, "\u203A"), React.createElement("a", {
    onClick: () => go("cars")
  }, "\u8ECA\u4E21\u60C5\u5831"), React.createElement("span", null, "\u203A"), React.createElement("span", {
    style: {
      color: "var(--ink-soft)"
    }
  }, car.maker, " ", car.name)), React.createElement("div", {
    className: "detail"
  }, React.createElement("div", {
    className: "gallery"
  }, React.createElement(Ph, {
    className: "main " + (images.length ? "" : "ph--empty"),
    src: images[active],
    label: images.length ? "" : "画像準備中 / " + thumbs[active],
    style: {
      width: "100%",
      height: "100%"
    },
    alt: `${car.maker} ${car.name} 車両写真`
  }), React.createElement("div", {
    className: "thumbs"
  }, thumbs.map((t, i) => React.createElement("div", {
    key: t,
    onClick: () => setActive(i),
    className: active === i ? "on" : ""
  }, React.createElement(Ph, {
    src: images[i],
    label: images.length ? "" : t,
    className: images.length ? "" : "ph--empty",
    style: {
      width: "100%",
      height: "100%"
    },
    alt: `${car.maker} ${car.name} サムネイル`
  })))), React.createElement("div", {
    style: {
      marginTop: 30
    }
  }, React.createElement("h3", {
    style: {
      fontSize: 19,
      marginBottom: 14
    }
  }, "\u3053\u306E\u8ECA\u4E21\u306B\u3064\u3044\u3066"), React.createElement("p", {
    style: {
      color: "var(--ink-soft)",
      fontSize: 14.5
    }
  }, car.note)), React.createElement("div", {
    style: {
      marginTop: 30
    }
  }, React.createElement("h3", {
    style: {
      fontSize: 19,
      marginBottom: 16
    }
  }, "\u4E3B\u306A\u88C5\u5099"), React.createElement("div", {
    className: "equip"
  }, car.features.map(f => React.createElement("span", {
    key: f
  }, f))))), React.createElement("div", {
    className: "dpanel"
  }, React.createElement("div", {
    className: "mk"
  }, car.maker), React.createElement("h1", null, car.name), React.createElement("div", {
    className: "grade"
  }, car.grade), React.createElement("div", {
    className: "tags"
  }, car.tags.map(t => React.createElement("span", {
    key: t
  }, t))), React.createElement("div", {
    className: "priceblock"
  }, React.createElement("div", null, React.createElement("div", {
    className: "lab"
  }, "\u652F\u6255\u7DCF\u984D\u306E\u76EE\u5B89"), React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--ink-faint)",
      marginTop: 2
    }
  }, "\u8ECA\u4E21\u672C\u4F53\u4FA1\u683C")), React.createElement("div", {
    className: "n serif"
  }, car.price, React.createElement("span", {
    className: "u"
  }, "\u4E07\u5186"))), React.createElement("table", {
    className: "spectable"
  }, React.createElement("tbody", null, rows.map(([k, v]) => React.createElement("tr", {
    key: k
  }, React.createElement("th", null, k), React.createElement("td", null, v))))), React.createElement("div", {
    className: "dcta"
  }, React.createElement("a", {
    className: "btn btn--solid",
    style: {
      flex: 1,
      justifyContent: "center"
    },
    onClick: () => go("contact")
  }, "\u3053\u306E\u8ECA\u4E21\u3092\u554F\u3044\u5408\u308F\u305B\u308B", React.createElement(Icon.arrow, null))), React.createElement("a", {
    className: "btn btn--ghost",
    style: {
      marginTop: 12,
      width: "100%",
      justifyContent: "center"
    },
    onClick: () => go("cars")
  }, "\u2039 \u4E00\u89A7\u306B\u623B\u308B")))), React.createElement("section", {
    className: "section--tight wrap"
  }, React.createElement(SHead, {
    en: "OTHER CARS",
    ja: "\u307B\u304B\u306E\u8ECA\u4E21",
    title: "\u307B\u304B\u306E\u5728\u5EAB\u8ECA\u4E21",
    action: React.createElement("a", {
      className: "btn btn--line",
      onClick: () => go("cars")
    }, "\u5728\u5EAB\u4E00\u89A7\u3078 ", React.createElement(Icon.arrow, null))
  }), React.createElement("div", {
    className: "cars"
  }, cars.filter(c => c.id !== car.id).slice(0, 3).map(c => React.createElement(CarCard, {
    key: c.id,
    car: c,
    go: go
  })))), React.createElement(Band, {
    go: go
  }));
}
Object.assign(window, {
  CarCard,
  CarsPage,
  CarDetail
});
function DXPage({
  go
}) {
  return React.createElement("div", {
    className: "fade"
  }, React.createElement("section", {
    className: "hero",
    style: {
      borderBottom: "1px solid var(--line-soft)"
    }
  }, React.createElement("div", {
    className: "wrap",
    style: {
      gridTemplateColumns: "1.05fr .95fr"
    }
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    en: "DX SUPPORT",
    ja: "DX\u652F\u63F4"
  }), React.createElement("h1", {
    style: {
      marginTop: 24,
      fontSize: "clamp(32px,4vw,52px)"
    }
  }, "\u201C\u3061\u3087\u3046\u3069\u3044\u3044DX\u201D\u3092\u3001", React.createElement("br", null), "\u7121\u7406\u306E\u306A\u3044\u4E00\u6B69\u304B\u3089\u3002"), React.createElement("p", {
    className: "lead"
  }, "AI\u3068\u81EA\u52D5\u5316\u3067\u6BCE\u65E5\u306E\u624B\u9593\u3092\u6E1B\u3089\u3057\u3001Web\u5236\u4F5C\u3067\u4F1D\u308F\u308B\u5165\u308A\u53E3\u3092\u3064\u304F\u308B\u3002 \u4E2D\u5C0F\u30FB\u5C0F\u898F\u6A21\u4E8B\u696D\u8005\u306E\u73FE\u5834\u306B\u5408\u308F\u305B\u3066\u3001", React.createElement("b", null, "\u5C0F\u3055\u304F\u59CB\u3081\u3066\u3001\u3066\u3044\u306D\u3044\u306B\u80B2\u3066\u308B"), "DX\u3092\u3054\u652F\u63F4\u3057\u307E\u3059\u3002"), React.createElement("div", {
    className: "cta-row"
  }, React.createElement("a", {
    className: "btn btn--solid",
    onClick: () => go("contact")
  }, "\u76F8\u8AC7\u3057\u3066\u307F\u308B", React.createElement(Icon.arrow, null)), React.createElement("a", {
    className: "btn btn--ghost",
    href: "#flow"
  }, "\u9032\u3081\u65B9\u3092\u898B\u308B"))), React.createElement("div", {
    className: "hero-visual",
    style: {
      aspectRatio: "4/5"
    }
  }, React.createElement(Ph, {
    src: SITE_ASSETS.dxHero,
    alt: "DX\u652F\u63F4\u3092\u8868\u3059\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9\u3068\u30C7\u30B9\u30AF",
    style: {
      width: "100%",
      height: "100%"
    }
  })))), React.createElement("section", {
    className: "section wrap"
  }, React.createElement(SHead, {
    en: "SERVICES",
    ja: "\u652F\u63F4\u5185\u5BB9",
    title: "\u3067\u304D\u308B\u3053\u3068",
    lead: "\u5FC5\u8981\u306A\u3082\u306E\u3092\u3001\u5FC5\u8981\u306A\u3060\u3051\u3002\u4E00\u3064\u304B\u3089\u3067\u3082\u3001\u7D44\u307F\u5408\u308F\u305B\u3067\u3082\u627F\u308A\u307E\u3059\u3002"
  }), React.createElement("div", {
    className: "svc-list"
  }, SERVICES.map(s => React.createElement("div", {
    className: "svc",
    key: s.id
  }, React.createElement("div", {
    className: "no serif"
  }, s.no), React.createElement("div", null, React.createElement("div", {
    className: "en"
  }, s.en), React.createElement("h3", null, s.title), React.createElement("div", {
    className: "lead"
  }, s.lead), React.createElement("p", null, s.desc)), React.createElement("div", {
    className: "pts"
  }, s.points.map(p => React.createElement("span", {
    key: p
  }, p))))))), React.createElement("section", {
    className: "section--tight wrap",
    id: "flow"
  }, React.createElement(SHead, {
    en: "FLOW",
    ja: "\u9032\u3081\u65B9",
    title: "\u3054\u76F8\u8AC7\u304B\u3089\u904B\u7528\u307E\u3067",
    lead: "\u3044\u304D\u306A\u308A\u5927\u304D\u304F\u4F5C\u308A\u307E\u305B\u3093\u3002\u52B9\u679C\u3092\u78BA\u304B\u3081\u306A\u304C\u3089\u3001\u6BB5\u968E\u7684\u306B\u5E83\u3052\u3066\u3044\u304D\u307E\u3059\u3002"
  }), React.createElement("div", {
    className: "steps"
  }, STEPS.map(s => React.createElement("div", {
    className: "step",
    key: s.no
  }, React.createElement("div", {
    className: "no serif"
  }, s.no), React.createElement("div", {
    className: "bar"
  }), React.createElement("h3", null, s.title), React.createElement("p", null, s.desc))))), React.createElement("section", {
    className: "section wrap"
  }, React.createElement(SHead, {
    en: "WORKS",
    ja: "\u53D6\u308A\u7D44\u307F\u4E8B\u4F8B",
    title: "\u5236\u4F5C\u30FB\u5C0E\u5165\u306E\u4E8B\u4F8B",
    lead: "\u81EA\u793E\u30B5\u30A4\u30C8\u306E\u5185\u88FD\u3084\u5728\u5EAB\u81EA\u52D5\u66F4\u65B0\u306A\u3069\u3001\u307E\u305A\u81EA\u5206\u305F\u3061\u3067\u8A66\u3057\u305F\u3053\u3068\u3092\u3001\u5FA1\u793E\u306B\u3082\u304A\u5C4A\u3051\u3057\u307E\u3059\u3002"
  }), React.createElement("div", {
    className: "works"
  }, WORKS.map(w => React.createElement("div", {
    className: "work",
    key: w.title
  }, React.createElement(Ph, {
    className: "pic",
    src: SITE_ASSETS.workAutomation,
    alt: w.title
  }), React.createElement("div", {
    className: "b"
  }, React.createElement("div", {
    className: "tag"
  }, w.tag), React.createElement("h3", null, w.title), React.createElement("p", null, w.desc))))), React.createElement("div", {
    className: "feed-note",
    style: {
      marginTop: 26
    }
  }, React.createElement("span", {
    className: "dot"
  }), "GitHub \u306E\u30DD\u30FC\u30C8\u30D5\u30A9\u30EA\u30AA\u3092\u9023\u643A\u3044\u305F\u3060\u3051\u308C\u3070\u3001\u5B9F\u7E3E\u3068\u3057\u3066\u63B2\u8F09\u3067\u304D\u307E\u3059")), React.createElement(Band, {
    go: go
  }));
}
window.DXPage = DXPage;
function CompanyPage({
  go
}) {
  const profile = [["商号", "ことこと株式会社（Kotokoto Inc.）"], ["所在地", "〒572-0000　大阪府寝屋川市黒原橘町4-1"], ["設立", "2025年"], ["事業内容", "中古自動車の販売／DX支援（AIチャットボット・業務自動化・Web・EC・LP・ホームページ制作）"], ["電話", "072-000-0000（受付 9:00–18:00／日祝休）"], ["対応エリア", "大阪府寝屋川市・北河内エリアを中心に対応"]];
  return React.createElement("div", {
    className: "fade"
  }, React.createElement("section", {
    className: "section wrap",
    style: {
      paddingTop: 56
    }
  }, React.createElement(Eyebrow, {
    en: "COMPANY",
    ja: "\u4F1A\u793E\u6982\u8981"
  }), React.createElement("h1", {
    className: "serif",
    style: {
      fontSize: "clamp(30px,3.6vw,46px)",
      marginTop: 18
    }
  }, "\u4F1A\u793E\u6982\u8981"), React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.2fr .8fr",
      gap: 56,
      marginTop: 48,
      alignItems: "start"
    },
    className: "company-split"
  }, React.createElement("div", null, React.createElement("h2", {
    style: {
      fontSize: 24,
      marginBottom: 8
    }
  }, "\u307E\u3058\u3081\u306B\u3001\u30B3\u30C4\u30B3\u30C4\u3002"), React.createElement("p", {
    style: {
      color: "var(--ink-soft)",
      fontSize: 15,
      maxWidth: "54ch"
    }
  }, "\u793E\u540D\u306E\u300C\u3053\u3068\u3053\u3068\u300D\u306B\u306F\u3001\u716E\u8FBC\u307F\u6599\u7406\u306E\u3088\u3046\u306B\u3001\u6642\u9593\u3092\u304B\u3051\u3066\u3066\u3044\u306D\u3044\u306B\u80B2\u3066\u308B\u3068\u3044\u3046\u601D\u3044\u3092\u8FBC\u3081\u3066\u3044\u307E\u3059\u3002 \u6D3E\u624B\u3055\u3088\u308A\u3082\u3001\u78BA\u304B\u3055\u3092\u3002\u4E00\u53F0\u306E\u8ECA\u3082\u3001\u4E00\u3064\u306E\u696D\u52D9\u6539\u5584\u3082\u3001\u304A\u5BA2\u69D8\u306E\u66AE\u3089\u3057\u3068\u4ED5\u4E8B\u3092\u3084\u3055\u3057\u304F\u524D\u3078\u9032\u3081\u308B\u201C\u3053\u3068\u201D\u3060\u3068\u8003\u3048\u3066\u3044\u307E\u3059\u3002"), React.createElement("table", {
    className: "cprofile",
    style: {
      marginTop: 34
    }
  }, React.createElement("tbody", null, profile.map(([k, v]) => React.createElement("tr", {
    key: k
  }, React.createElement("th", null, k), React.createElement("td", null, v)))))), React.createElement("div", null, React.createElement(Ph, {
    className: "access",
    src: SITE_ASSETS.company,
    alt: "\u3053\u3068\u3053\u3068\u682A\u5F0F\u4F1A\u793E\u306E\u5E97\u8217\u30A4\u30E1\u30FC\u30B8",
    style: {
      width: "100%"
    }
  }), React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 13,
      color: "var(--ink-soft)",
      lineHeight: 1.9
    }
  }, React.createElement("b", {
    style: {
      fontFamily: "var(--display)"
    }
  }, "\u30A2\u30AF\u30BB\u30B9"), React.createElement("br", null), "\u5927\u962A\u5E9C\u5BDD\u5C4B\u5DDD\u5E02\u9ED2\u539F\u6A58\u753A4-1", React.createElement("br", null), "\u304A\u8ECA\u3067\u304A\u8D8A\u3057\u306E\u969B\u306F\u4E8B\u524D\u306B\u3054\u9023\u7D61\u304F\u3060\u3055\u3044\u3002")))), React.createElement(Band, {
    go: go
  }));
}
function ContactPage({
  go
}) {
  const [type, setType] = React.useState("車両について");
  const [sent, setSent] = React.useState(false);
  return React.createElement("div", {
    className: "fade"
  }, React.createElement("section", {
    className: "section wrap",
    style: {
      paddingTop: 56
    }
  }, React.createElement(Eyebrow, {
    en: "CONTACT",
    ja: "\u304A\u554F\u3044\u5408\u308F\u305B"
  }), React.createElement("h1", {
    className: "serif",
    style: {
      fontSize: "clamp(30px,3.6vw,46px)",
      marginTop: 18
    }
  }, "\u304A\u554F\u3044\u5408\u308F\u305B"), React.createElement("p", {
    className: "lead",
    style: {
      color: "var(--ink-soft)",
      marginTop: 14,
      maxWidth: "52ch"
    }
  }, "\u8ECA\u4E21\u306E\u3054\u76F8\u8AC7\u3001DX\u652F\u63F4\u306E\u3054\u4F9D\u983C\u3001\u305D\u306E\u4ED6\u304A\u554F\u3044\u5408\u308F\u305B\u306F\u3053\u3061\u3089\u304B\u3089\u30022\u55B6\u696D\u65E5\u4EE5\u5185\u306B\u3054\u8FD4\u4FE1\u3044\u305F\u3057\u307E\u3059\u3002"), React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr .42fr",
      gap: 56,
      marginTop: 44,
      alignItems: "start"
    },
    className: "company-split"
  }, sent ? React.createElement("div", {
    style: {
      border: "1px solid var(--line)",
      background: "var(--paper)",
      padding: "56px 40px",
      textAlign: "center"
    }
  }, React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      margin: "0 auto 20px",
      borderRadius: 999,
      background: "var(--accent-wash)",
      display: "grid",
      placeItems: "center",
      color: "var(--accent-ink)"
    }
  }, React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none"
  }, React.createElement("path", {
    d: "M5 12l4.5 4.5L19 7",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), React.createElement("h2", {
    style: {
      fontSize: 24
    }
  }, "\u9001\u4FE1\u3057\u307E\u3057\u305F"), React.createElement("p", {
    style: {
      color: "var(--ink-soft)",
      marginTop: 12,
      fontSize: 14
    }
  }, "\u304A\u554F\u3044\u5408\u308F\u305B\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\u3002", React.createElement("br", null), "\u62C5\u5F53\u8005\u3088\u308A\u6298\u308A\u8FD4\u3057\u3054\u9023\u7D61\u3044\u305F\u3057\u307E\u3059\u3002"), React.createElement("a", {
    className: "btn btn--ghost",
    style: {
      marginTop: 26
    },
    onClick: () => go("home")
  }, "\u30DB\u30FC\u30E0\u306B\u623B\u308B")) : React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
      window.scrollTo(0, 0);
    }
  }, React.createElement("div", {
    className: "formgrid"
  }, React.createElement("div", {
    className: "field full"
  }, React.createElement("label", null, "\u304A\u554F\u3044\u5408\u308F\u305B\u7A2E\u5225"), React.createElement("div", {
    className: "chips"
  }, ["車両について", "DX支援について", "その他"].map(t => React.createElement("button", {
    type: "button",
    key: t,
    className: "chip" + (type === t ? " on" : ""),
    onClick: () => setType(t)
  }, t)))), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u304A\u540D\u524D ", React.createElement("span", {
    className: "req"
  }, "\u5FC5\u9808")), React.createElement("input", {
    required: true,
    placeholder: "\u5C71\u7530 \u592A\u90CE"
  })), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u4F1A\u793E\u540D"), React.createElement("input", {
    placeholder: "\u682A\u5F0F\u4F1A\u793E\u3007\u3007"
  })), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9 ", React.createElement("span", {
    className: "req"
  }, "\u5FC5\u9808")), React.createElement("input", {
    type: "email",
    required: true,
    placeholder: "example@mail.com"
  })), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u96FB\u8A71\u756A\u53F7"), React.createElement("input", {
    placeholder: "090-0000-0000"
  })), React.createElement("div", {
    className: "field full"
  }, React.createElement("label", null, "\u304A\u554F\u3044\u5408\u308F\u305B\u5185\u5BB9 ", React.createElement("span", {
    className: "req"
  }, "\u5FC5\u9808")), React.createElement("textarea", {
    required: true,
    placeholder: "\u3054\u76F8\u8AC7\u5185\u5BB9\u3092\u3054\u8A18\u5165\u304F\u3060\u3055\u3044\u3002"
  }))), React.createElement("button", {
    type: "submit",
    className: "btn btn--solid",
    style: {
      marginTop: 24
    }
  }, "\u9001\u4FE1\u3059\u308B", React.createElement(Icon.arrow, null))), React.createElement("aside", null, React.createElement("div", {
    style: {
      border: "1px solid var(--line)",
      background: "var(--paper)",
      padding: "28px 26px"
    }
  }, React.createElement("h3", {
    style: {
      fontSize: 18,
      marginBottom: 16
    }
  }, "\u304A\u96FB\u8A71\u3067\u306E\u3054\u76F8\u8AC7"), React.createElement("div", {
    className: "serif",
    style: {
      fontSize: 28,
      color: "var(--accent-ink)"
    }
  }, "072-000-0000"), React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: "var(--ink-soft)",
      marginTop: 8
    }
  }, "\u53D7\u4ED8 9:00\u201318:00\uFF08\u65E5\u795D\u4F11\uFF09"), React.createElement("hr", {
    className: "divider",
    style: {
      margin: "22px 0"
    }
  }), React.createElement("h4", {
    style: {
      fontSize: 12,
      letterSpacing: ".1em",
      color: "var(--ink-faint)",
      marginBottom: 10
    }
  }, "\u6240\u5728\u5730"), React.createElement("p", {
    style: {
      fontSize: 13.5,
      color: "var(--ink-soft)",
      lineHeight: 1.9
    }
  }, "\u5927\u962A\u5E9C\u5BDD\u5C4B\u5DDD\u5E02", React.createElement("br", null), "\u9ED2\u539F\u6A58\u753A4-1"))))));
}
Object.assign(window, {
  CompanyPage,
  ContactPage
});
const {
  useState: useStateA,
  useEffect: useEffectA
} = React;
const ACCENTS = {
  "ネイビー": {
    accent: "oklch(0.40 0.058 255)",
    ink: "oklch(0.34 0.060 255)",
    wash: "oklch(0.96 0.013 255)"
  },
  "深緑": {
    accent: "oklch(0.41 0.058 162)",
    ink: "oklch(0.34 0.060 162)",
    wash: "oklch(0.96 0.013 162)"
  },
  "ワイン": {
    accent: "oklch(0.41 0.070 18)",
    ink: "oklch(0.34 0.072 18)",
    wash: "oklch(0.96 0.014 18)"
  },
  "スレート": {
    accent: "oklch(0.42 0.040 232)",
    ink: "oklch(0.35 0.042 232)",
    wash: "oklch(0.96 0.010 232)"
  }
};
const HEAD_FONTS = {
  "游明朝": '"Yu Mincho", "Hiragino Mincho ProN", serif',
  "明朝": '"Hiragino Mincho ProN", "Yu Mincho", serif',
  "ゴシック": '"Yu Gothic", "Meiryo", sans-serif'
};
const TWEAK_DEFAULTS = {
  "accent": "ネイビー",
  "headFont": "游明朝",
  "density": "regular"
};
function App() {
  const [route, setRoute] = useStateA({
    name: "home",
    params: {}
  });
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cars, setCars] = useStateA(window.CARS || []);
  useEffectA(() => {
    fetch("data/cars.json", {
      cache: "no-store"
    }).then(res => res.ok ? res.json() : Promise.reject(new Error("cars.json not found"))).then(rows => setCars(Array.isArray(rows) ? rows : [])).catch(() => setCars(window.CARS || []));
  }, []);
  function go(name, params = {}) {
    setRoute({
      name,
      params
    });
    window.scrollTo({
      top: 0,
      behavior: "instant" in window ? "instant" : "auto"
    });
  }
  useEffectA(() => {
    const r = document.documentElement;
    const a = ACCENTS[t.accent] || ACCENTS["ネイビー"];
    r.style.setProperty("--accent", a.accent);
    r.style.setProperty("--accent-ink", a.ink);
    r.style.setProperty("--accent-wash", a.wash);
    r.style.setProperty("--display", HEAD_FONTS[t.headFont] || HEAD_FONTS["Zen Old Mincho"]);
    const pad = t.density === "compact" ? "84px" : t.density === "comfy" ? "128px" : "104px";
    r.style.setProperty("--sec-pad", pad);
  }, [t.accent, t.headFont, t.density]);
  window.CARS = cars;
  const publishedCars = cars.filter(c => c.published !== false);
  window.PUBLIC_CARS = publishedCars;
  let page;
  switch (route.name) {
    case "cars":
      page = React.createElement(CarsPage, {
        go: go
      });
      break;
    case "car":
      page = React.createElement(CarDetail, {
        go: go,
        id: route.params.id
      });
      break;
    case "dx":
      page = React.createElement(DXPage, {
        go: go
      });
      break;
    case "company":
      page = React.createElement(CompanyPage, {
        go: go
      });
      break;
    case "contact":
      page = React.createElement(ContactPage, {
        go: go
      });
      break;
    default:
      page = React.createElement(HomePage, {
        go: go
      });
  }
  return React.createElement(React.Fragment, null, React.createElement(Header, {
    route: route,
    go: go
  }), React.createElement("main", null, page), React.createElement(Footer, {
    go: go
  }), React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, React.createElement(TweakSection, {
    label: "\u30A2\u30AF\u30BB\u30F3\u30C8\u30AB\u30E9\u30FC"
  }), React.createElement(TweakColor, {
    label: "\u30A2\u30AF\u30BB\u30F3\u30C8",
    value: (ACCENTS[t.accent] || ACCENTS["ネイビー"]).accent,
    options: Object.values(ACCENTS).map(a => a.accent),
    onChange: v => {
      const key = Object.keys(ACCENTS).find(k => ACCENTS[k].accent === v) || "ネイビー";
      setTweak("accent", key);
    }
  }), React.createElement(TweakSection, {
    label: "\u30BF\u30A4\u30DD\u30B0\u30E9\u30D5\u30A3"
  }), React.createElement(TweakSelect, {
    label: "\u898B\u51FA\u3057\u30D5\u30A9\u30F3\u30C8\uFF08\u660E\u671D\uFF09",
    value: t.headFont,
    options: Object.keys(HEAD_FONTS),
    onChange: v => setTweak("headFont", v)
  }), React.createElement(TweakSection, {
    label: "\u30EC\u30A4\u30A2\u30A6\u30C8"
  }), React.createElement(TweakRadio, {
    label: "\u4F59\u767D",
    value: t.density,
    options: ["compact", "regular", "comfy"],
    onChange: v => setTweak("density", v)
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));