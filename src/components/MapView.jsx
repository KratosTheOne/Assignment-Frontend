/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import markerImage from "../assets/marker.png"; // Import the marker image

const customIcon = new Icon({
  iconUrl: markerImage,
  iconSize: [30, 30],
});

const MapView = ({ properties }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleSearch = () => {
    const filtered = properties.filter((property) => {
      return (
        property.popUp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredProperties(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <div className="flex flex-col justify-center max-w-[84rem] mx-auto text-center px-6 py-3 mt-2">
      <h1 className="text-2xl font-bold mb-6 underline">
        Map View of the Properties
      </h1>
      <input
        type="text"
        placeholder="Search by property name or type"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-black rounded-2xl mb-2 py-1 px-3 w-[35%] border-solid"
      />
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={10}
        style={{ height: "500px" }}
      >
        <TileLayer
          attribution="Google Maps"
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
        {filteredProperties.map((property) => (
          <Marker
            key={property.id}
            position={property.geocode}
            icon={customIcon}
          >
            <Popup>
              <div>
                <strong>{property.popUp}</strong>
              </div>
              <div>{property.type}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Prop validation for the 'properties' prop
MapView.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      geocode: PropTypes.arrayOf(PropTypes.number),
      popUp: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
};

export default MapView;
