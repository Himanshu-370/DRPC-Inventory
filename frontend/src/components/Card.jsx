import PropTypes from "prop-types";

const Card = ({ title, description, actions }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="flex justify-end space-x-2 mt-4">{actions}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actions: PropTypes.node.isRequired,
};

export default Card;
