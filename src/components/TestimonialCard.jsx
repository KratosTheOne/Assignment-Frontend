import dp from "../assets/Ellipse 2661.png";

const TestimonialCard = () => {
  return (
    <div className="shadow-xl w-[26rem] h-[18rem] flex flex-col px-12 py-3 space-y-6">
      <div className="flex flex-row space-x-5 justify-center mt-8">
        <img src={dp} alt="displayPicture" />
        <div className="flex flex-col">
          <text className="text-lg font-medium">Ajay Nagar</text>
          <text className="text-xs font-medium text-gray-600">Torest</text>
        </div>
      </div>
      <div className="flex justify-center text-justify">
        <text className="text-sm font-medium text-gray-500 leading-loose">
          Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis
        </text>
      </div>
    </div>
  );
};

export default TestimonialCard;
