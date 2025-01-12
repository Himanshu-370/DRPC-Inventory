import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link to="/">Inventory Management</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/library-categories" className="hover:underline">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/raw-materials" className="hover:underline">
                Raw Materials
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
