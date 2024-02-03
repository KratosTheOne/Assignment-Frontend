import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import whatsapp from "../assets/Icon/whatsapp.png";
import calendlyIcon from "../assets/Icon/calendly_icon.png";

const Header = () => {
  const navigate = useNavigate();

  const openCalendly = () => {
    window.open("https://calendly.com/contact-truestate/30min", "_blank");
  };

  const openWhatsapp = () => {
    window.open("https://chat.whatsapp.com/IYP5nSFGfAT6rLDXRKTNnY", "_blank");
  };

  return (
    <div className="bg-white shadow-md h-14 top-0 z-50 sticky">
      <div className="flex max-w-[89rem] mx-auto text-center justify-between h-full px-3">
        <div className="flex justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className="cursor-pointer"
            onClick={() => navigate("/")}
            width="126"
            height="22"
          />
        </div>
        <div className="flex text-center items-center justify-between space-x-4 sm:space-x-3">
          <div className="flex items-center border border-[#006BFF] rounded-md pr-3 pl-2 py-2 sm:px-2 sm:py-2">
            <img
              src={calendlyIcon}
              alt="calendly"
              className="h-5 w-6 mr-2 sm:mr-0 sm:h-5 cursor-pointer"
              onClick={openCalendly}
            />
            <span
              className="text-sm font-semibold cursor-pointer text-[#006BFF] sm:hidden"
              onClick={openCalendly}
            >
              Book a meet
            </span>
          </div>
          <div className="flex items-center border border-[#39AE41] rounded-md px-3 py-2 sm:px-2 sm:py-2">
            <img
              src={whatsapp}
              alt="whatsapp"
              className="h-4 w-4 mr-2 sm:mr-0 sm:h-5 sm:w-5 cursor-pointer"
              onClick={openWhatsapp}
            />
            <span
              className="text-sm font-semibold cursor-pointer text-[#39AE41] sm:hidden"
              onClick={openWhatsapp}
            >
              Join Us
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
