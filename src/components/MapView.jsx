/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import PropTypes from "prop-types";
import markerImage from "../assets/marker.png";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import villaPre from "../assets/Icon/Villa normal pre launch.svg";
import villaNormal from "../assets/Icon/Villa normal.svg";
import rowHousePre from "../assets/Icon/Row House Pre launch.svg";
import rowHouseNormal from "../assets/Icon/Row House Normal.svg";
import landPre from "../assets/Icon/Land Normal pre launch.svg";
import landNormal from "../assets/Icon/Land Normal.svg";
import apartmentPre from "../assets/Icon/Apartment Normal Pre launch.svg";
import apartmentNormal from "../assets/Icon/Apartment Normal.svg";

/*
const customIcon = new Icon({
  iconUrl: markerImage,
  iconSize: [30, 30],
});
*/

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
  { value: "Selling Fast", label: "Selling Fast" },
  { value: "Limited Available", label: "Limited Available" },
];

const areaOptions = [
  { value: "All", label: "All" },
  { value: "Central", label: "Central" },
  { value: "North", label: "North" },
  { value: "South", label: "South" },
  { value: "East", label: "East" },
  { value: "West", label: "West" },
];

const handoverYearOptions = [
  { value: "All", label: "All" },
  // Generate years from 2022 to 2033
  ...Array.from({ length: 12 }, (_, i) => ({
    value: (2022 + i).toString(),
    label: (2022 + i).toString(),
  })),
];

const getMarkerIcon = (typeOptions, availabilityOptions) => {
  switch (typeOptions) {
    case "Villa":
      return availabilityOptions === "Pre Launch" ? villaPre : villaNormal;
    case "Rowhouse":
      return availabilityOptions === "Pre Launch"
        ? rowHousePre
        : rowHouseNormal;
    case "Land":
      return availabilityOptions === "Pre Launch" ? landPre : landNormal;
    case "Apartment":
      return availabilityOptions === "Pre Launch"
        ? apartmentPre
        : apartmentNormal;
    default:
      return markerImage;
  }
};

const MapView = ({ properties }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedHandoverYear, setSelectedHandoverYear] = useState("All");

  const areFiltersApplied =
    selectedType !== "All" ||
    selectedAvailability !== "All" ||
    selectedArea !== "All" ||
    selectedHandoverYear !== "All" ||
    searchQuery !== "";

  const handleSearchAndFilter = () => {
    const filtered = properties.filter((property) => {
      const matchesType =
        selectedType === "All" || property.asset_type === selectedType;
      const matchesAvailability =
        selectedAvailability === "All" ||
        property.availability === selectedAvailability;
      const matchesArea =
        selectedArea === "All" || property.area === selectedArea;
      const matchesHandoverYear =
        selectedHandoverYear === "All" ||
        property.handover_year === selectedHandoverYear;
      const matchesSearch =
        searchQuery === "" ||
        property.popUp.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesType &&
        matchesAvailability &&
        matchesArea &&
        matchesHandoverYear &&
        matchesSearch
      );
    });
    setFilteredProperties(filtered);
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [
    searchQuery,
    selectedType,
    selectedAvailability,
    selectedArea,
    selectedHandoverYear,
  ]);

  return (
    <div className="flex flex-col justify-between text-center mt-2">
      <div className="flex sm:flex-col pr:flex-col lg:space-x-4 ld:space-x-8 mb-2 w-full sm:space-y-4 pr:space-y-4 max-w-[84rem] mx-auto px-3 py-3">
        <div className="lg:w-[50%] ld:w-[40%] pr:w-full sm:w-full">
          <input
            type="text"
            placeholder="Search by property name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-[#C4C4C4] rounded-md w-full h-full lg:px-4 ld:px-4 pr:px-4 pr:py-4 sm:px-4 sm:py-4"
          />
        </div>
        <div className="flex lg:w-full ld:w-[60%] pr:w-full sm:w-full lg:space-x-4 ld:space-x-6 pr:space-x-10 sm:space-x-6 ld:justify-between pr:justify-between sm:justify-between">
          <FormControl className="mb-2 lg:w-[22%] ld:w-[28%] pr:w-[30%] sm:w-40">
            <InputLabel>Handover Year</InputLabel>
            <Select
              value={selectedHandoverYear}
              onChange={(e) => setSelectedHandoverYear(e.target.value)}
              label="Handover Year"
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
            >
              {handoverYearOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="mb-2 lg:w-[22%] ld:w-[28%] pr:w-[30%] sm:w-40">
            <InputLabel>Type</InputLabel>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              label="Type"
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
            >
              {typeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="mb-2 lg:w-[22%] ld:w-[28%] pr:w-[30%] sm:w-40">
            <InputLabel>Availability</InputLabel>
            <Select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              label="Availability"
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
            >
              {availabilityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="mb-2 lg:w-[22%] ld:w-[28%] pr:w-[30%] sm:w-40">
            <InputLabel>Area</InputLabel>
            <Select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              label="Area"
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
            >
              {areaOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {areFiltersApplied && (
            <button
              className="text-[#F4744C] lg:text-sm ld:text-base pr:text-sm sm:text-sm lg:font-bold ld:font-bold pr:font-bold sm:font-bold lg:px-1 ld:px-4 pr:px-6 sm:px-4 rounded-full w-[6rem] justify-center"
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
                setSelectedAvailability("All");
                setSelectedArea("All");
                setSelectedHandoverYear("All");
              }}
            >
              Clear Filters
            </button>
          )}
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
        {filteredProperties.map((property) => {
          const markerIcon = new Icon({
            iconUrl: getMarkerIcon(property.asset_type, property.availability),
            iconSize: [30, 30],
          });

          return (
            <Marker
              key={property.id}
              position={property.geocode}
              icon={markerIcon}
            >
              <Popup className="w-auto">
                <div className="p-3 rounded-xl w-auto">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        property.availability === "Available"
                          ? "bg-green-700 text-white"
                          : "bg-red-700 text-white"
                      }`}
                    >
                      {property.availability}
                    </span>
                    <div className="border-[1px] border-gray-300 h-5 rounded-full"></div>
                    <span className="text-xs font-semibold text-gray-500">
                      {property.asset_type}
                    </span>
                  </div>
                  <div className="mt-2 flex space-x-12">
                    <span className="text-sm font-bold w-[8rem] flex justify-start">
                      {property.popUp}
                    </span>
                    <span className="text-sm font-bold flex justify-end">
                      Rs. {property.price_Sq}/sqft
                    </span>
                  </div>
                  <div className="mt-1 text-gray-600 text-xs font-semibold">
                    by {property.developer}
                  </div>
                  <div className="mt-3 font-medium flex justify-between">
                    <div className="text-gray-600 text-xs">
                      Area <br />
                      <span className="text-sm font-black">
                        {property.area}
                      </span>
                    </div>
                    <div className="text-gray-600 text-xs w-[5.5rem]">
                      Handover Year <br />
                      <span className="text-sm font-black">
                        {property.handover_year}
                      </span>
                    </div>
                    <div className="text-gray-600 text-xs">
                      Micromarket <br />
                      <span className="text-sm font-black">
                        {property.micromarket}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
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
