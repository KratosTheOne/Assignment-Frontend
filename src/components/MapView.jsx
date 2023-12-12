/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import PropTypes from "prop-types";
import markerImage from "../assets/marker.png";
import MultipleSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const customIcon = new Icon({
  iconUrl: markerImage,
  iconSize: [30, 30],
});

const typeOptions = [
  { value: "All", label: "All" },
  { value: "Apartment", label: "Apartment" },
  { value: "Villa", label: "Villa" },
  { value: "Land", label: "Land" },
  { value: "Rowhouse", label: "Rowhouse" },
];

const availabilityOptions = [
  { value: "All", label: "All" },
  { value: "Available", label: "Available" },
  { value: "Sold Out", label: "Sold Out" },
  { value: "Pre-Launch", label: "Pre-Launch" },
];

const areaOptions = [
  { value: "All", label: "All" },
  { value: "Central", label: "Central" },
  { value: "North", label: "North" },
  { value: "South", label: "South" },
  { value: "East", label: "East" },
  { value: "West", label: "West" },
];

const micromarketOptions = [
  "Anekal",
  "Attibele",
  "Bagaluru",
  "Banashankari",
  "Banaswadi",
  "Bannerghatta Road",
  "Begur Road",
  "Bellahalli",
  "Bellary Road",
  "Bommasandra",
  "Budigere Cross",
  "Byatarayanapura",
  "Chandapura",
  "Channasandra",
  "Chikkavaderapura",
  "Chikka Tirupati",
  "Chokkanahalli",
  "Choodasandra",
  "Cunningham Rd",
  "Devanahalli",
  "Doddabanahalli",
  "Electronic City",
  "Electronic City Phase 2",
  "Geddalahalli",
  "Gopasandra",
  "Gunjur",
  "Gudnahalli",
  "Harlur",
  "Hebbal",
  "Hennur Main Rd",
  "Hosa Road",
  "Hosahalli",
  "Hoskote",
  "Hosur Road",
  "HSR Layout",
  "Hulimavu",
  "Indiranagar",
  "ITPL",
  "Itangur",
  "J P Nagar",
  "Jakkur Road",
  "Jalahalli",
  "Jigala",
  "K R Puram",
  "Kadugodi",
  "Kaggalipur",
  "Kanakapura Road",
  "Kengeri",
  "Kithiganur",
  "Kodigehalli",
  "Kommasandra",
  "Koramangala",
  "Kogilu",
  "Lal Bagh Road",
  "Magadi Main Rd",
  "Malur",
  "Marathahalli Road",
  "Medihalli",
  "M G Road",
  "Muthsandra",
  "Mysore Road",
  "New Int Airport Road",
  "Panathur Main Road",
  "Padmanabhanagara",
  "Rajaji Nagar",
  "Rajanukunte",
  "Rajarajeshwari Nagar",
  "RMV 2nd Stage",
  "RMV Extension",
  "Sathanur",
  "Sarjapur",
  "Sarjapur Road",
  "Sheshadripuram",
  "Shettigere",
  "Sompura",
  "South",
  "Thanisandra Rd",
  "Thambu Chetty Palya",
  "Thirumenahalli",
  "Thirupalaya",
  "Tumkur Road",
  "Tyayakana Halli",
  "Uttarahalli",
  "Vajarahalli",
  "Varthur",
  "Vijaynagar",
  "Whitefield",
  "Yelahanka",
  "Yelahanka New Town",
  "Yashwantpur",
  "Yamare",
];

const MapView = ({ properties }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const [selectedTypes, setSelectedTypes] = useState(["All"]);
  const [selectedAvailability, setSelectedAvailability] = useState(["All"]);
  const [selectedAreas, setSelectedAreas] = useState(["All"]);

  const handleSearchAndFilter = () => {
    const filtered = properties.filter((property) => {
      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes("All") ||
        selectedTypes.includes(property.asset_type);
      const matchesAvailability =
        selectedAvailability.length === 0 ||
        selectedAvailability.includes("All") ||
        selectedAvailability.includes(property.availability);
      const matchesArea =
        selectedAreas.length === 0 ||
        selectedAreas.includes("All") ||
        selectedAreas.includes(property.area);
      const matchesSearch =
        searchQuery === "" ||
        property.popUp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        micromarketOptions.some(
          (micromarket) =>
            micromarket.toLowerCase() === searchQuery.toLowerCase() &&
            micromarket.toLowerCase() === property.micromarket.toLowerCase()
        );

      return matchesType && matchesAvailability && matchesArea && matchesSearch;
    });
    setFilteredProperties(filtered);
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchQuery, selectedTypes, selectedAvailability, selectedAreas]);

  return (
    <div className="flex flex-col justify-between max-w-[84rem] mx-auto text-center px-6 py-3 mt-2">
      <div className="flex sm:flex-col pr:flex-col lg:space-x-10 ld:space-x-8 mb-6 w-full sm:space-y-4 pr:space-y-4">
        <div className="lg:w-[36%] ld:w-[40%] pr:w-full sm:w-full">
          <input
            type="text"
            placeholder="Search by property name or micromarket"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-black rounded-2xl w-full h-full lg:px-4 ld:px-4 pr:px-4 pr:py-4 sm:px-4 sm:py-4"
          />
        </div>
        <div className="flex lg:w-full ld:w-[60%] pr:w-full sm:w-full lg:space-x-20 ld:space-x-6 pr:space-x-10 sm:space-x-6 lg:justify-between ld:justify-between pr:justify-between sm:justify-between">
          <FormControl
            variant="standard"
            className="mb-2 lg:w-[22%] ld:w-[28%] pr:w-[30%] sm:w-40"
          >
            <InputLabel>Type</InputLabel>
            <MultipleSelect
              multiple
              value={selectedTypes}
              onChange={(e) => setSelectedTypes(e.target.value)}
              renderValue={(selected) =>
                selected.length === 0 ? "All" : selected.join(", ")
              }
            >
              {typeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MultipleSelect>
          </FormControl>

          <FormControl
            variant="standard"
            className="mb-2 lg:w-[22%] ld:w-[28%] pr:w-[30%] sm:w-40"
          >
            <InputLabel>Availability</InputLabel>
            <MultipleSelect
              multiple
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              renderValue={(selected) =>
                selected.length === 0 ? "All" : selected.join(", ")
              }
            >
              {availabilityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MultipleSelect>
          </FormControl>

          <FormControl
            variant="standard"
            className="mb-2 lg:w-[22%] ld:w-[28%] pr:w-[30%] sm:w-40"
          >
            <InputLabel>Area</InputLabel>
            <MultipleSelect
              multiple
              value={selectedAreas}
              onChange={(e) => setSelectedAreas(e.target.value)}
              renderValue={(selected) =>
                selected.length === 0 ? "All" : selected.join(", ")
              }
            >
              {areaOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MultipleSelect>
          </FormControl>
          <button
            className="bg-red-700 hover:bg-red-900 text-white lg:text-sm ld:text-sm pr:text-sm sm:text-sm lg:font-bold ld:font-bold pr:font-bold sm:font-bold lg:px-8 ld:px-4 pr:px-6 sm:px-4 rounded-full"
            onClick={() => {
              setSearchQuery("");
              setSelectedTypes(["All"]);
              setSelectedAvailability(["All"]);
              setSelectedAreas(["All"]);
            }}
          >
            Clear
          </button>
        </div>
      </div>

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
            <Popup className="w-auto">
              <div>
                <strong>Name:- {property.popUp}</strong>
              </div>
              <div>
                <strong>Rera Id:- </strong>
                {property.rera_id}
              </div>
              <div>
                <strong>Type:- </strong>
                {property.asset_type}
              </div>
              <div>
                <strong>Availability:- </strong>
                {property.availability}
              </div>
              <div>
                <strong>Price in Sq/feet:- </strong>
                {property.price_Sq}
              </div>
              <div>
                <strong>Area:- </strong>
                {property.area}
              </div>
              <div>
                <strong>Micromarket:- </strong>
                {property.micromarket}
              </div>
              <div>
                <strong>Developer:- </strong>
                {property.developer}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

MapView.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      geocode: PropTypes.arrayOf(PropTypes.number),
      popUp: PropTypes.string,
      asset_type: PropTypes.string,
      availability: PropTypes.string,
      area: PropTypes.string,
      micromarket: PropTypes.string,
    })
  ).isRequired,
};

export default MapView;
