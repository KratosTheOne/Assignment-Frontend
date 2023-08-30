import PropTypes from "prop-types";
import icon from "../assets/Frame 1000006931icon.png";

const FeatureCards = ({ title, description }) => {
  return (
    <div className="w-72 h-64 mb-10">
      <div>
        <img src={icon} alt="icon" className="" />
      </div>
      <div className="mt-6">
        <text className="flex text-left text-xl font-semibold">{title}</text>
      </div>
      <div className="mt-4">
        <text className="flex text-left flex-wrap">{description}</text>
      </div>
    </div>
  );
};

FeatureCards.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureCards;
