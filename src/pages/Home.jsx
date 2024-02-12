//import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import MapView from "../components/MapView";
import properties from "../utils/props_new.json";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <div className="h-full overflow-hidden bg-[#F9F9FA]">
        <MapView properties={properties} />
      </div>
      <div className="h-full overflow-hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Home;

/**
 *<div className="h-full overflow-hidden">
        <ContactUs />
      </div>
 */
