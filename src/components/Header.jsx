import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import call_orange from "../assets/Icon/call_orange.svg";
import whatsapp from "../assets/Icon/whatsapp.png";

const Header = () => {
  const navigate = useNavigate();
  const phoneNumber = "+91-8420566770";

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const OpenWhatsapp = () => {
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
            onClick={() => {
              navigate("/");
            }}
            width="126"
            height="22"
          />
        </div>
        <a
          href={`tel:${phoneNumber}`}
          className="text-sm font-bold cursor-pointer flex items-center justify-center"
          onClick={handlePhoneClick}
        >
          <div className="flex text-center items-center justify-between space-x-2">
            <div className="">
              <div className="flex items-center border border-[#F54C1E] rounded-md px-3 py-2 sm:px-2 sm:py-2">
                <div
                  className="h-4 w-4 mr-2 sm:mr-0 sm:h-5 sm:w-5 cursor-pointer"
                  onClick={handlePhoneClick}
                >
                  <img src={call_orange} alt="call" className="h-full w-full" />
                </div>
                <span className="text-sm font-semibold cursor-pointer text-[#F54C1E] sm:hidden ">
                  Call Us
                </span>
              </div>
            </div>
            <div className="">
              <div className="flex items-center border border-[#39AE41] rounded-md px-3 py-2 sm:px-2 sm:py-2">
                <div
                  className="h-4 w-4 mr-2 sm:mr-0 sm:h-5 sm:w-5 cursor-pointer"
                  onClick={OpenWhatsapp}
                >
                  <img
                    src={whatsapp}
                    alt="whatsapp"
                    className="h-full w-full"
                  />
                </div>
                <span
                  className="text-sm font-semibold cursor-pointer text-[#39AE41] sm:hidden"
                  onClick={OpenWhatsapp}
                >
                  Join Us
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Header;
