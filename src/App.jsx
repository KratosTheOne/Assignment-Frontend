import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import ReactGA from "react-ga4";

const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID; // Use environment variable

const App = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(trackingId);
    const currentPath = location.pathname + location.search;
    ReactGA.send({ hitType: "pageview", page: currentPath });
  }, [location]);

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
