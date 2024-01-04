import MapView from "../components/MapView";
import { properties } from "../utils/properties_data_object_literal_only_year";

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
