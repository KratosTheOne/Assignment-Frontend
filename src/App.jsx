import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import ReactGA from "react-ga4";

const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID; // Use environment variable

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
      </BrowserRouter>
    </div>
  );
};

export default App;
