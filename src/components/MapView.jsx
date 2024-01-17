/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
//import { Icon } from "leaflet";
import { divIcon } from "leaflet";
import PropTypes from "prop-types";
//import markerImage from "../assets/marker.png";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
//import villaPre from "../assets/Icon/Villa normal pre launch.svg";
//import villaNormal from "../assets/Icon/Villa normal.svg";
//import landPre from "../assets/Icon/Land Normal pre launch.svg";
//import landNormal from "../assets/Icon/Land Normal.svg";
//import apartmentPre from "../assets/Icon/Apartment Normal Pre launch.svg";
//import apartmentNormal from "../assets/Icon/Apartment Normal.svg";
import ReactGA from "react-ga4";

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

const getMarkerIcon = (asset_type, availability, price) => {
  const iconHtml = `
    <div class="bg-red-800 text-white rounded-full text-xs w-auto flex justify-center text-center px-4 py-1">
      ${price}
    </div>
  `;

  return divIcon({
    html: iconHtml,
    className: "custom-marker",
    iconSize: [30, 30],
  });
};

/*const getMarkerIcon = (typeOptions, availabilityOptions) => {
  switch (typeOptions) {
    case "Villa":
      return availabilityOptions === "Pre-Launch" ? villaPre : villaNormal;
    case "Land":
      return availabilityOptions === "Pre-Launch" ? landPre : landNormal;
    case "Apartment":
      return availabilityOptions === "Pre-Launch"
        ? apartmentPre
        : apartmentNormal;
    default:
      return markerImage;
  }
};
*/

const MapView = ({ properties }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedHandoverYear, setSelectedHandoverYear] = useState("All");
  const [isPreLaunchFilterActive, setIsPreLaunchFilterActive] = useState(false);

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
      const matchesPreLaunch =
        !isPreLaunchFilterActive || property.stage === "Pre-Launch";

      return (
        matchesType &&
        matchesAvailability &&
        matchesArea &&
        matchesHandoverYear &&
        matchesSearch &&
        matchesPreLaunch
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
    isPreLaunchFilterActive,
  ]);

  const trackPreLaunchClick = () => {
    ReactGA.event({
      category: "User",
      action: "Clicked Pre-Launch Button",
    });
  };

  return (
    <>
      <div className="flex flex-col justify-between text-left mt-4 items-center">
        <div className="flex items-start text-left w-full max-w-[89rem] mx-auto px-3 py-1">
          <h1 className="flex-wrap">
            Use our Interactive map feature to find the best properties in
            Bengaluru to invest in
          </h1>
        </div>
        <div className="flex sm:flex-col pr:flex-col lg:space-x-4 ld:space-x-3 w-full sm:space-y-4 pr:space-y-4 max-w-[89rem] mx-auto px-3 py-3 mb-4">
          <div className="flex lg:w-[60%] ld:w-[60%] pr:w-full sm:w-full justify-between space-x-3">
            <input
              type="text"
              placeholder="Search by property name or developer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-[#C4C4C4] rounded-md w-full h-full lg:px-4 ld:px-4 pr:px-4 pr:py-4 sm:px-4 sm:py-4"
            />
            <button
              className={`border border-[#C4C4C4] font-light lg:w-[26%] ld:w-[30%] pr:w-[20%] sm:w-[35%] rounded-md ${
                isPreLaunchFilterActive ? "bg-purple-600 text-white" : ""
              }`}
              onClick={() => {
                setIsPreLaunchFilterActive(!isPreLaunchFilterActive);
                trackPreLaunchClick();
              }}
            >
              Pre-Launch
            </button>
          </div>
          <div className="flex lg:w-full ld:w-full pr:w-full sm:w-full lg:space-x-4 ld:space-x-3 pr:space-x-3 sm:space-x-3 ld:justify-between pr:justify-between sm:justify-between">
            <FormControl className="mb-2 lg:w-[20%] ld:w-[28%] pr:w-[22%] sm:w-40">
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

            <FormControl className="mb-2 lg:w-[18%] ld:w-[28%] pr:w-[26%] sm:w-40">
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

            <FormControl className="mb-2 lg:w-[22%] ld:w-[28%] pr:w-[36%] sm:w-40">
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

            <FormControl className="mb-2 lg:w-[19%] ld:w-[28%] pr:w-[24%] sm:w-40">
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
                  setIsPreLaunchFilterActive(false);
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
            const {
              id,
              geocode,
              popUp,
              asset_type,
              availability,
              area,
              micromarket,
              price_Sq,
              price_k,
              stage,
              handover_year,
              developer,
            } = property;

            const markerIcon = getMarkerIcon(
              asset_type,
              availability,
              `${price_k}`
            );

            return (
              <Marker key={id} position={geocode} icon={markerIcon}>
                <Popup className="w-auto">
                  <div className="li-3 rounded-xl w-auto">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          availability === "Available"
                            ? "bg-green-700 text-white"
                            : "bg-red-700 text-white"
                        }`}
                      >
                        {availability}
                      </span>
                      <div className="border-[1px] border-gray-300 h-5 rounded-full"></div>
                      <span className="text-xs font-semibold text-gray-500">
                        {asset_type}
                      </span>
                      <div className="border-[1px] border-gray-300 h-5 rounded-full"></div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          stage === "Ongoing"
                            ? "bg-orange-600 text-white"
                            : "bg-purple-600 text-white"
                        }`}
                      >
                        {stage}
                      </span>
                    </div>
                    <div className="mt-2 flex">
                      <span className="text-sm font-bold w-[10rem] flex justify-start">
                        {popUp}
                      </span>
                      <span className="text-sm font-bold flex justify-end w-36">
                        Rs. {price_Sq}/sqft
                      </span>
                    </div>
                    <div className="mt-1 text-gray-600 text-xs font-semibold">
                      by {developer}
                    </div>
                    <div className="mt-3 font-medium flex justify-between space-x-5 w-auto">
                      <div className="text-gray-600 text-xs w-24">
                        Area <br />
                        <span className="text-sm font-black">{area}</span>
                      </div>
                      <div className="text-gray-600 text-xs w-36">
                        Handover Year <br />
                        <span className="text-sm font-black">
                          {handover_year}
                        </span>
                      </div>
                      <div className="text-gray-600 text-xs w-44">
                        Micromarket <br />
                        <span className="text-sm font-black">
                          {micromarket}
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

      <div className="flex-col justify-start mt-4 mb-8 max-w-[89rem] mx-auto px-3">
        <h6 className="font-bold flex justify-start text-base mb-1">Note</h6>
        <ul className="list-disc px-6 text-sm space-y-1 mb-2">
          <li>
            This tool is the result of extensive on-ground data collection
            efforts, and we strive to share the most accurate information with
            you. We are only covering Bengaluru for now.
          </li>
          <li>
            Feel free to use the above tool for your research on buying new
            properties or share it with someone who is in the process as well.
            You can compare prices in the same area across builders, check other
            developments, and compare across micromarkets as well.{" "}
          </li>
        </ul>
        <ul className="list-decimal px-5 text-sm space-y-1 mb">
          <li>
            Information will be updated on a weekly basis. Pre-launches will be
            updated as soon as their information is public.
          </li>
          <li>
            The information presented here is not exhaustive and is meant to be
            used for the first level of research. Reach out to us if you have
            any questions or need updated information.
          </li>
          <li>
            Price per square foot is represented based on{" "}
            <span className="font-bold italic">super built-up</span> area.
            However, it is essential to check the RERA carpet area before making
            a purchase.
          </li>
          <li>
            Location may be slightly off. We are working on improving accuracy.
          </li>
        </ul>
      </div>
    </>
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
