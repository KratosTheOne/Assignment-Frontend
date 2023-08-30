const Footer = () => {
  return (
    <div className="mt-24 bg-[#051E21]">
      <div className="flex justify-between content-center max-w-[84rem] mx-auto p=3">
        <div className="text-white flex flex-col mt-20 space-y-3">
          <text className="font-medium text-xl">TruState</text>
          <text className="font-light text-base">
            Real estate buying simplified
          </text>
        </div>
        <div className="flex flex-col mt-20 space-y-3">
          <text className="font-medium text-lg text-white">Newsletter</text>
          <input
            className="w-full bg-transparent border border-gray-500 rounded-md mb-6 py-2 px-3 pr-24"
            type="email"
            placeholder="Submit your email..."
            id="email"
          ></input>
        </div>
      </div>
      <hr className="h-[0.10rem] bg-gray-400 mt-20"></hr>
      <div className="flex justify-center text-center mt-8 text-sm">
        <text className="text-white mb-8 font-light">
          &copy; Copyright 2023, All Rights Reserved
        </text>
      </div>
    </div>
  );
};

export default Footer;
