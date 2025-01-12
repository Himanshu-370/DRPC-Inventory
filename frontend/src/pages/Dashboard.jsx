import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Inventory Management
          </h1>
          <p className="text-lg">
            Streamline your inventory operations with a modern, intuitive
            platform designed for efficiency.
          </p>
          <p className="text-lg mt-2">
            Manage categories, products, components, and raw materials
            effortlessly.
          </p>
        </section>

        {/* Features Overview */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-bold mb-2">Library Categories</h3>
              <p className="text-gray-600">
                View and manage all your product categories with ease. Create,
                update, or delete categories as needed.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-bold mb-2">Library Products</h3>
              <p className="text-gray-600">
                Organize and track your products within their respective
                categories for better inventory control.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-bold mb-2">Product Components</h3>
              <p className="text-gray-600">
                Break down your products into components and manage their
                quantities, prices, and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-bold mb-2">Raw Materials</h3>
              <p className="text-gray-600">
                Maintain a directory of raw materials with detailed information,
                including price and density.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Manage Your Inventory?
          </h2>
          <p className="text-gray-700 mb-4">
            Start exploring your inventory and make smarter decisions today.
          </p>
          <Link
            to="/library-categories"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
