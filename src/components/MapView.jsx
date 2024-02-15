/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ReactGA from "react-ga4";
import leftArrow from "../assets/Icon/SvgOfCard/Left.svg";
import rightArrow from "../assets/Icon/SvgOfCard/Right.svg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
//import IndividualListing from "./IndividualListing";

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
    <div class="bg-red-700 text-white rounded-full text-xs w-auto flex justify-center text-center px-5 py-1">
      ${price}
    </div>
  `;

  return divIcon({
    html: iconHtml,
    className: "custom-marker",
    iconSize: [30, 30],
  });
};

const areaCoordinates = {
  Central: { center: [12.972442, 77.580643], zoom: 12 },
  North: { center: [13.023815, 77.589219], zoom: 12 },
  South: { center: [12.916576, 77.610116], zoom: 12 },
  East: { center: [12.978414, 77.664707], zoom: 12 },
  West: { center: [12.971891, 77.537956], zoom: 12 },
  All: { center: [12.9716, 77.5946], zoom: 11 },
};

const MapComponent = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);

  return null;
};

MapComponent.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};

const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedHandoverYear, setSelectedHandoverYear] = useState("All");
  const [isPreLaunchFilterActive, setIsPreLaunchFilterActive] = useState(false);
  const [mapCenter, setMapCenter] = useState(areaCoordinates["All"].center);
  const [zoomLevel, setZoomLevel] = useState(areaCoordinates["All"].zoom);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  //const [isModalOpen, setIsModalOpen] = useState(false);
  //const [selectedProperty, setSelectedProperty] = useState(null);

  //const navigate = useNavigate();

  const handlePopupClick = (property) => {
    //setSelectedProperty(property);
    //setIsModalOpen(true);
    window.location.href = `/${property.id}/${property.popUp}/listingDetails`;
  };

  const areFiltersApplied =
    selectedType !== "All" ||
    selectedAvailability !== "All" ||
    selectedArea !== "All" ||
    selectedHandoverYear !== "All" ||
    searchQuery !== "";

  useEffect(() => {
    // Adjust map center and zoom based on the selected area
    if (areaCoordinates[selectedArea]) {
      setMapCenter(areaCoordinates[selectedArea].center);
      setZoomLevel(areaCoordinates[selectedArea].zoom);
    }

    // Filter properties based on the current filter settings
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
        property.year === selectedHandoverYear;
      const matchesSearch =
        searchQuery === "" ||
        property.popUp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.micromarket.toLowerCase().includes(searchQuery.toLowerCase());
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

    // Update the filteredProperties state with the filtered results
    setFilteredProperties(filtered);
  }, [
    properties, // Ensure filtering is reapplied when properties are fetched or updated
    searchQuery,
    selectedType,
    selectedAvailability,
    selectedArea,
    selectedHandoverYear,
    isPreLaunchFilterActive,
  ]);

  /*
  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const propertiesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(propertiesArray);
    };

    fetchProperties().catch(console.error);

    if (areaCoordinates[selectedArea]) {
      setMapCenter(areaCoordinates[selectedArea].center);
      setZoomLevel(areaCoordinates[selectedArea].zoom);
    }
    handleSearchAndFilter();
  }, [
    searchQuery,
    selectedType,
    selectedAvailability,
    selectedArea,
    selectedHandoverYear,
    isPreLaunchFilterActive,
    selectedArea,
  ]);*/

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const propertiesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(propertiesArray);
      setFilteredProperties(propertiesArray);
    };

    fetchProperties().catch(console.error);
  }, []);

  const trackPreLaunchClick = () => {
    ReactGA.event({
      category: "User",
      action: "Clicked Pre-Launch Button",
    });
  };

  //console.log(setIsModalOpen);
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
              placeholder="Search by property name, developer or micromarket"
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
                  setMapCenter(areaCoordinates["All"].center);
                  setZoomLevel(areaCoordinates["All"].zoom);
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
        <MapContainer
          center={mapCenter}
          zoom={zoomLevel}
          style={{ height: "500px" }}
        >
          <MapComponent center={mapCenter} zoom={zoomLevel} />
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
              property_images,
            } = property;

            // Function to handle clicking the next image button
            const handleNextImage = () => {
              event.stopPropagation();
              setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % property_images.length
              );
            };

            // Function to handle clicking the previous image button
            const handlePrevImage = () => {
              event.stopPropagation();
              setCurrentImageIndex(
                (prevIndex) =>
                  (prevIndex - 1 + property_images.length) %
                  property_images.length
              );
            };

            const markerIcon = getMarkerIcon(
              asset_type,
              availability,
              `${price_k}`
            );

            return (
              <Marker
                key={id}
                position={[geocode[0], geocode[1]]}
                icon={markerIcon}
              >
                <Popup className="w-auto">
                  <div className="rounded-xl w-[280px] cursor-pointer">
                    <div
                      className="Carousel mb-2 relative w-full h-[10rem]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Image Carousel */}
                      <img
                        src={property_images[currentImageIndex]}
                        alt="Image not Available"
                        className="rounded-xl object-cover w-full h-full"
                      />
                      {/* Previous Button */}
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-0 top-1/2"
                      >
                        <img src={leftArrow} alt="Previous" />
                      </button>
                      {/* Next Button */}
                      <button
                        onClick={handleNextImage}
                        className="absolute right-0 top-1/2"
                      >
                        <img src={rightArrow} alt="Next" />
                      </button>
                    </div>
                    <div onClick={() => handlePopupClick(property)}>
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
                            stage !== "Ongoing"
                              ? "bg-[#F54C1E] text-white"
                              : "bg-purple-600 text-white"
                          }`}
                        >
                          {stage}
                        </span>
                      </div>
                      <div className="mt-2 flex">
                        <span className="text-sm font-bold w-48 flex justify-start">
                          {popUp}
                        </span>
                        <span className="text-sm font-bold flex pl-2 w-36">
                          Rs. {price_Sq}/sqft
                        </span>
                      </div>
                      <div className="text-gray-600 text-xs font-semibold">
                        by {developer}
                      </div>
                      <div className="mt-1 font-medium flex w-full justify-between">
                        <div className="text-gray-600 text-xs w-16">
                          Area <br />
                          <span className="text-sm font-black">{area}</span>
                        </div>
                        <div className="text-gray-600 text-xs w-[90px]">
                          Handover Year <br />
                          <span className="text-sm font-black">
                            {handover_year}
                          </span>
                        </div>
                        <div className="text-gray-600 text-xs w-28">
                          Micromarket <br />
                          <span className="text-sm font-black">
                            {micromarket}
                          </span>
                        </div>
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

MapView.propTypes = {};

export default MapView;
