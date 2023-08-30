import PropTypes from "prop-types";

const ProcessCards = ({ count, image, title, description }) => {
  return (
    <div className="w-72 h-[22rem] flex flex-col space-y-3 p-2">
      <p className="text-3xl font-bold text-gray-600">Step {count}</p>
      <img alt="img1" src={image} className="w-full" />
      <p className="text-white font-medium text-lg">{title}</p>
      <p className="text-white font-thin text-sm">{description}</p>
    </div>
  );
};

ProcessCards.propTypes = {
  count: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProcessCards;
