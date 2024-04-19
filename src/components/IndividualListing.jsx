import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import brochure from "../assets/Icon/SvgOfCard/Download.svg";
import left from "../assets/Icon/left1.svg";
import share from "../assets/Icon/share.svg";
import whatsappIcon from "../assets/Icon/whatsapp.svg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import sampleImg from "../assets/Images/sampleImg.jpeg";

const IndividualListing = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { id, pop_up } = useParams();
  const decodedPopUp = decodeURIComponent(pop_up);

  const handleBackClick = () => {
    navigate(-1);
  };
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      const docRef = doc(db, "properties", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSelectedProperty({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError(true);
        console.log("No such document!");
      }
    };

    fetchProperty().catch((err) => {
      setError(true);
      console.error("Error fetching document:", err);
    });
  }, [id]);

  if (error) {
    return <div>No property details available. Please try again later.</div>;
  }

  if (!selectedProperty) {
    return <div>Loading...</div>;
  }

  const url = window.location.href;
  const whatsappMessage = `Check out this property on TruEstate: ${url}`;

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
    price_sq,
    price_cr,
    land_area,
    total_units,
    stage,
    handover_date,
    developer,
    brochure_link,
  } = selectedProperty;

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
            <img
              src={sampleImg}
              alt="Property"
              className="rounded-xl object-cover w-full h-full"
            />
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
              Rs. {price_sq}/sqft
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
                  {handover_date}
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

export default IndividualListing;
