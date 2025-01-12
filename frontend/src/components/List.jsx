import PropTypes from "prop-types";

const List = ({ items, onDelete, renderItem }) => {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="flex justify-between items-center">
          <div>{renderItem(item)}</div>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default List;
