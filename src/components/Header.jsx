import logo from "../assets/logo.png";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md h-14 top-0 z-20 sticky">
      <div className="flex max-w-[84rem] mx-auto text-center justify-between p-3">
        <div className="flex justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className="h-4 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="flex text-center items-center justify-between space-x-6">
          <text className="text-xs font-medium">About Us</text>
          <text className="text-xs font-medium">Our Blogs</text>
          <button
            type="button"
            className="text-xs font-medium bg-[#F54C1E] text-white px-4 py-[6px] rounded-md"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
