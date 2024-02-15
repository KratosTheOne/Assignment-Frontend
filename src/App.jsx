import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import ReactGA from "react-ga4";
import IndividualListing from "./components/IndividualListing";
//import properties from "./utils/props_new.json";

const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;

const App = () => {
  useEffect(() => {
    ReactGA.initialize(trackingId);
    ReactGA.send({ hitType: "pageview", page: "/mapview" });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route
            path="/:id/:popUp/listingDetails"
            element={<IndividualListing />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
