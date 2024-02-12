import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import leftArrow from "../assets/Icon/SvgOfCard/Left.svg";
import rightArrow from "../assets/Icon/SvgOfCard/Right.svg";
import logo from "../assets/logo.png";
import brochure from "../assets/Icon/SvgOfCard/Download.svg";
import left from "../assets/Icon/left1.svg";
import share from "../assets/Icon/share.svg";
import whatsappIcon from "../assets/Icon/whatsapp.svg";

const IndividualListing = ({ properties }) => {
  const { id } = useParams();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const property = properties.find((p) => p.id.toString() === id);
    setSelectedProperty(property);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [id, properties]);

  const url = window.location.href;
  const whatsappMessage = `Check out this property: ${url}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  const shareOnWhatsApp = () => {
    const whatsappShareLink = `https://wa.me/?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappShareLink, "_blank");
  };

  if (!selectedProperty) {
    return <div>Loading...</div>;
  }

  const {
    popUp,
    asset_type,
    availability,
    area,
    micromarket,
    price_Sq,
    price_cr,
    land_area,
    total_units,
    stage,
    handover_year,
    developer,
    property_images,
    brochure_link,
  } = selectedProperty;

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
        (prevIndex - 1 + property_images.length) % property_images.length
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay overflow-hidden"
      onClick={() => window.history.back()} // Go back to the previous page when the overlay is clicked
    >
      <div
        className="bg-white rounded-lg overflow-auto lg:w-[40%] h-[100%] sm:w-[85%] pr:w-[80%] ld:w-[80%]"
        onClick={(e) => e.stopPropagation()} // Prevent click inside the modal from closing it
      >
        <div className="flex justify-between items-center text-center p-4 lg:mb-4 sm:mb-2 pr:mb-4">
          <div>
            <img
              src={left}
              alt="left"
              className="w-5 cursor-pointer"
              onClick={handleBackClick}
            />
          </div>
          <div>
            <img
              src={logo}
              alt="logo"
              onClick={() => navigate("/")}
              className="cursor-pointer"
            />
          </div>
          <div className="flex cursor-pointer">
            <img
              src={share}
              alt="share"
              className="w-6"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
        <div className="px-4 flex-col">
          {/* Display property details */}
          <div>
            <span className="text-2xl font-bold w-auto flex justify-start">
              {popUp}
            </span>
          </div>
          <div className="mt-1 text-gray-600 text-xs font-bold">
            by {developer}
          </div>
          <div
            className="Carousel mt-4 relative w-full h-[20rem]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Carousel */}
            <img
              src={property_images[currentImageIndex]}
              alt="Property"
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
          <div className="flex itxems-center space-x-3 mt-4">
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                availability === "Available"
                  ? "bg-green-700 text-white"
                  : "bg-red-700 text-white"
              }`}
            >
              {availability}
            </span>
            <div className="border-[1px] border-gray-300 h-6 rounded-full"></div>
            <span className="text-sm font-semibold text-gray-500">
              {asset_type}
            </span>
            <div className="border-[1px] border-gray-300 h-5 rounded-full"></div>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                stage === "Ongoing"
                  ? "bg-orange-600 text-white"
                  : "bg-purple-600 text-white"
              }`}
            >
              {stage}
            </span>
          </div>
          <div className="flex justify-between mt-4 content-center text-center">
            <span className="text-lg font-bold flex pt-1">
              Rs. {price_Sq}/sqft
            </span>
            {brochure_link && brochure_link !== "N/A" ? (
              <div
                className="bg-[#F54C1E] flex rounded-md px-4 py-1 justify-between space-x-3 cursor-pointer"
                onClick={() => window.open(brochure_link, "_blank")}
              >
                <img src={brochure} alt="brochure" className="w-6" />
                <span className="text-white text-lg">Brochure</span>
              </div>
            ) : (
              <div
                className="bg-[#F54C1E] flex rounded-md px-4 py-1 justify-between space-x-3 cursor-not-allowed opacity-50"
                title="Link currently not available"
              >
                <img src={brochure} alt="brochure" className="w-6" />
                <span className="text-white text-lg">Brochure</span>
              </div>
            )}
          </div>
          <div className="flex-col">
            <div className="mt-4 font-medium flex justify-between w-full">
              <div className="text-gray-600 text-sm lg:w-[8.5rem] sm:w-[6rem] pr:w-[7rem] ld:w-[8.5rem]">
                Total Price <br />
                <span className="text-base font-bold text-black">
                  {price_cr} Cr
                </span>
              </div>
              <div className="text-gray-600 text-sm lg:w-[12rem] sm:w-[8rem] pr:w-[10rem] ld:w-[12rem]">
                Micromarket <br />
                <span className="text-base font-bold text-black">
                  {micromarket}
                </span>
              </div>
              <div className="text-gray-600 text-sm lg:w-[8.5rem] sm:w-[6rem] pr:w-[7rem] ld:w-[8.5rem]">
                Area <br />
                <span className="text-base font-bold text-black">{area}</span>
              </div>
            </div>
            <div className="mt-4 font-medium flex justify-between w-full">
              <div className="text-gray-600 text-sm lg:w-[8.5rem] sm:w-[6rem] pr:w-[7rem] ld:w-[8.5rem]">
                Total Units <br />
                <span className="text-base font-bold text-black">
                  {total_units}
                </span>
              </div>
              <div className="text-gray-600 text-sm lg:w-[12rem] sm:w-[8rem] pr:w-[10rem] ld:w-[12rem]">
                Land Area <br />
                <span className="text-base font-bold text-black">
                  {land_area} Acres
                </span>
              </div>
              <div className="text-gray-600 text-sm lg:w-[8.5rem] sm:w-[6rem] pr:w-[7rem] ld:w-[8.5rem]">
                Handover Year <br />
                <span className="text-base font-bold text-black">
                  {handover_year}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Share modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <p className="text-lg mb-4">
              Love this property? Share it with your friends and family.
            </p>
            <div className="flex mb-4">
              <input
                type="text"
                value={url}
                className="flex-1 border p-2 mr-2"
                readOnly
              />
              <button
                onClick={copyToClipboard}
                className="bg-blue-500 text-white px-4 py-2"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center mb-4">
              <img
                src={whatsappIcon}
                alt="whatsapp"
                className="h-6 w-6 mr-2 cursor-pointer"
                onClick={shareOnWhatsApp}
              />
              <span
                className="cursor-pointer text-blue-500"
                onClick={shareOnWhatsApp}
              >
                Share on WhatsApp
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 text-gray-700 px-[149px] py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

IndividualListing.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      popUp: PropTypes.string,
      asset_type: PropTypes.string,
      availability: PropTypes.string,
      area: PropTypes.string,
      micromarket: PropTypes.string,
      price_Sq: PropTypes.string,
      price_k: PropTypes.string,
      stage: PropTypes.string,
      handover_year: PropTypes.string,
      developer: PropTypes.string,
    })
  ).isRequired,
};

export default IndividualListing;
