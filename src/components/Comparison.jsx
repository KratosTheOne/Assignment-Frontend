import comp from "../assets/Group 1000006948comp.png";
import dotted1 from "../assets/Dotteddotted1.png";

const Comparison = () => {
  return (
    <div className="mt-28 flex flex-col max-w-[84rem] mx-auto">
      <div className="flex flex-col space-y-3 text-center">
        <text className="text-lg text-[#F54C1E] font-medium">COMPARISON</text>
        <text className="text-4xl font-semibold">How We Are Different?</text>
      </div>
      <div className="mt-12 flex justify-center items-center max-w-[84rem]">
        <img src={comp} alt="comp" className="max-w-[84rem]" />
        <img src={dotted1} alt="dotted1" className=" absolute left-[-51px]" />
      </div>
    </div>
  );
};

export default Comparison;
