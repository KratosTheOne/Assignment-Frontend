import headerImg from "../assets/Rectangle 1img1.png";
import dotted1 from "../assets/Dotteddotted1.png";

const Hero = () => {
  return (
    <div className="flex max-w-[84rem] mx-auto text-center justify-between p-3 mt-6">
      <div className="mt-20">
        <div className="flex flex-col text-left space-y-2">
          <text className="text-6xl font-bold">
            Unlock Your <span className="text-[#F54C1E]">Dream Home</span>
          </text>
          <text className="text-6xl font-bold">With Us</text>
        </div>
        <div className="flex text-left mt-4">
          <text className="text-lg font-medium">
            TruState simplifies home buying like never before
          </text>
        </div>
        <div className="flex text-left mt-8 flex-col text-2xl font-semibold">
          <text>Want to find the best upcoming residential</text>
          <text>projects in Bengaluru?</text>
        </div>
        <div className="flex items-start mt-6">
          <button
            type="button"
            className="bg-[#F54C1E] px-6 py-3 rounded-md text-white text-sm"
          >
            Its free Talk to us
          </button>
        </div>
      </div>
      <div className="flex">
        <img className="h-[480px] relative" alt="headerImg" src={headerImg} />
        <img
          className="absolute top-[330px] right-[55px]"
          src={dotted1}
          alt="dotted1"
        />
      </div>
    </div>
  );
};

export default Hero;
