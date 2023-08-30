import FeatureCards from "./FeatureCards";
import dotted1 from "../assets/Dotteddotted1.png";

const Features = () => {
  return (
    <div className="flex max-w-[84rem] mx-auto text-center justify-between p-3 mt-32">
      <div className="w-[50%]">
        <div className="flex flex-col text-left space-y-2">
          <text className="text-[#F54C1E] font-medium text-2xl">
            UNIQUE FEATURES
          </text>
        </div>
        <div className="flex flex-col text-left space-y-3 font-bold text-4xl mt-8">
          <text>What Sets Us Apart</text>
          <text>And Makes Us Unique</text>
        </div>
        <div className="flex flex-col text-left text-lg mt-12">
          <text>We are unique due to innovation, quality commitment, and</text>
          <text>customer dedication.</text>
        </div>
      </div>
      <div className="flex flex-wrap text-center justify-between w-[50%]">
        <FeatureCards
          title="Property Data"
          description="Our in-house research team collects 100+ data points about every project to give you a 360° view."
        />
        <FeatureCards
          title="No Mis-selling"
          description="We take ZERO commission from builders to ensure you buy with 100% trust and confidence."
        />
        <FeatureCards
          title="24x7 Assistance"
          description="We take ZERO commission from builders to ensure you buy with 100% trust and confidence."
        />
        <FeatureCards
          title="Expert Advice"
          description="Our professionals guide you based on what YOU need, unlike brokers trying to sell their limited supply."
        />
      </div>
      <div>
        <img
          className="absolute right-[1450px] bottom-[-500px]"
          src={dotted1}
          alt="dotted1"
        />
      </div>
    </div>
  );
};

export default Features;
