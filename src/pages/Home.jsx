import MapView from "../components/MapView";
import { properties } from "../utils/properties_numeric_ids";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <div className="h-full overflow-hidden">
        <MapView properties={properties} />
      </div>
    </div>
  );
};

export default Home;
