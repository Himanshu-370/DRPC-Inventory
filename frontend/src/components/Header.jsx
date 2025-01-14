import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-blue-500 text-white p-4">
    <div className="container mx-auto flex justify-between">
      <h1 className="text-lg font-bold">Inventory Management</h1>
      <nav>
        <Link to="/" className="px-2">
          Dashboard
        </Link>
        <Link to="/library-categories" className="px-2">
          Library
        </Link>
        <Link to="/raw-materials" className="px-2">
          Raw Materials
        </Link>
        <Link to="/price-history" className="px-2">
          Price History
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
