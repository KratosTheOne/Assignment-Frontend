import call_orange from "../assets/Icon/call_orange.svg";

const ContactUs = () => {
  const phoneNumber = "+91-8420566770";

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
  return (
    <div className="bottom-10 z-50 sticky h-14">
      <div>
        <a
          href={`tel:${phoneNumber}`}
          className="text-sm font-bold cursor-pointer items-center justify-center hidden sm:hidden lg:flex"
          onClick={handlePhoneClick}
        >
          <div className="lg:hidden">
            <div className="flex items-center border border-[#F54C1E] rounded-md px-3 py-2">
              <div
                className="h-4 w-4 mr-2 cursor-pointer"
                onClick={handlePhoneClick}
              >
                <img src={call_orange} alt="call" className="h-full w-full" />
              </div>
              <span className="text-sm font-semibold cursor-pointer text-[#F54C1E]">
                Call Us
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
