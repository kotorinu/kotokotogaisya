// app.jsx — router + tweaks
const { useState: useStateA, useEffect: useEffectA } = React;

const ACCENTS = {
  "ネイビー": { accent: "oklch(0.40 0.058 255)", ink: "oklch(0.34 0.060 255)", wash: "oklch(0.96 0.013 255)" },
  "深緑":     { accent: "oklch(0.41 0.058 162)", ink: "oklch(0.34 0.060 162)", wash: "oklch(0.96 0.013 162)" },
  "ワイン":   { accent: "oklch(0.41 0.070 18)",  ink: "oklch(0.34 0.072 18)",  wash: "oklch(0.96 0.014 18)" },
  "スレート": { accent: "oklch(0.42 0.040 232)", ink: "oklch(0.35 0.042 232)", wash: "oklch(0.96 0.010 232)" },
};
const HEAD_FONTS = {
  "游明朝": '"Yu Mincho", "Hiragino Mincho ProN", serif',
  "明朝": '"Hiragino Mincho ProN", "Yu Mincho", serif',
  "ゴシック": '"Yu Gothic", "Meiryo", sans-serif',
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "ネイビー",
  "headFont": "游明朝",
  "density": "regular"
}/*EDITMODE-END*/;

function App() {
  const [route, setRoute] = useStateA({ name: "home", params: {} });
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cars, setCars] = useStateA(window.CARS || []);

  useEffectA(() => {
    if (window.location.protocol === "file:") {
      setCars(window.CARS || []);
      return;
    }
    fetch("data/cars.json", { cache: "no-store" })
      .then((res) => res.ok ? res.json() : Promise.reject(new Error("cars.json not found")))
      .then((rows) => setCars(Array.isArray(rows) ? rows : []))
      .catch(() => setCars(window.CARS || []));
  }, []);

  function go(name, params = {}) {
    setRoute({ name, params });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  // apply tweaks to CSS variables
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
  const publishedCars = cars.filter((c) => c.published !== false);
  window.PUBLIC_CARS = publishedCars;

  let page;
  switch (route.name) {
    case "cars": page = <CarsPage go={go} />; break;
    case "car": page = <CarDetail go={go} id={route.params.id} />; break;
    case "dx": page = <DXPage go={go} />; break;
    case "company": page = <CompanyPage go={go} />; break;
    case "contact": page = <ContactPage go={go} />; break;
    default: page = <HomePage go={go} />;
  }

  return (
    <React.Fragment>
      <Header route={route} go={go} />
      <main>{page}</main>
      <Footer go={go} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="アクセントカラー" />
        <TweakColor
          label="アクセント"
          value={(ACCENTS[t.accent] || ACCENTS["ネイビー"]).accent}
          options={Object.values(ACCENTS).map((a) => a.accent)}
          onChange={(v) => {
            const key = Object.keys(ACCENTS).find((k) => ACCENTS[k].accent === v) || "ネイビー";
            setTweak("accent", key);
          }}
        />
        <TweakSection label="タイポグラフィ" />
        <TweakSelect label="見出しフォント（明朝）" value={t.headFont}
          options={Object.keys(HEAD_FONTS)} onChange={(v) => setTweak("headFont", v)} />
        <TweakSection label="レイアウト" />
        <TweakRadio label="余白" value={t.density}
          options={["compact", "regular", "comfy"]} onChange={(v) => setTweak("density", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
