// app.jsx — router
const { useState: useStateA, useEffect: useEffectA } = React;

function App() {
  const [route, setRoute] = useStateA({ name: "home", params: {} });
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
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
