import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getProductComponentsInLibraryProduct,
  addProductComponentToLibraryProduct,
  updateProductComponentInLibraryProduct,
  removeProductComponentFromLibraryProduct,
} from "../api/services";
import { getRawMaterials } from "../api/services";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

const Component = () => {
  const { categoryId, productId } = useParams();
  const [components, setComponents] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  useEffect(() => {
    if (categoryId && productId) {
      fetchComponents();
    }
    fetchRawMaterials();
  }, [categoryId, productId]);

  const fetchComponents = async () => {
    setLoading(true);
    try {
      const data = await getProductComponentsInLibraryProduct(
        categoryId,
        productId
      );
      setComponents(data || []);
    } catch (err) {
      console.error("Error fetching components:", err);
      setError("Failed to load product components.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRawMaterials = async () => {
    try {
      const data = await getRawMaterials();
      setRawMaterials(data || []);
      const uniqueCategories = [
        ...new Set(data.map((item) => item.rawMaterialCategoryName)),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching raw materials:", err);
      setError("Failed to load raw materials.");
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filteredProducts = rawMaterials.filter(
      (item) => item.rawMaterialCategoryName === category
    );
    setProducts(filteredProducts);
    setSelectedProduct(""); // Reset product selection
  };

  const handleAddOrUpdateComponent = async (e) => {
    e.preventDefault();
    if (!productQuantity) {
      alert("Please fill out all fields.");
      return;
    }

    const componentPayload = {
      productComponentName: selectedProduct,
      productComponentQuantity: parseFloat(productQuantity),
      productComponentPricePerKg: rawMaterials.find(
        (item) => item.rawMaterialProductName === selectedProduct
      ).rawMaterialProductPricePerKg,
      productComponentNetPrice:
        parseFloat(productQuantity) *
        rawMaterials.find(
          (item) => item.rawMaterialProductName === selectedProduct
        ).rawMaterialProductPricePerKg,
    };

    try {
      if (isEditing) {
        await updateProductComponentInLibraryProduct(
          categoryId,
          productId,
          selectedComponent.id,
          componentPayload
        );
      } else {
        await addProductComponentToLibraryProduct(
          categoryId,
          productId,
          componentPayload
        );
      }
      fetchComponents();
      closeModal();
    } catch (err) {
      console.error("Error saving component:", err);
      setError("Failed to save product component.");
    }
  };

  const handleDeleteComponent = async (id) => {
    try {
      await removeProductComponentFromLibraryProduct(categoryId, productId, id);
      fetchComponents();
    } catch (err) {
      console.error("Error deleting component:", err);
      setError("Failed to delete product component.");
    }
  };

  const openEditModal = (component) => {
    setIsEditing(true);
    setSelectedComponent(component);
    setSelectedCategory("");
    setSelectedProduct(component.productComponentName);
    setProductQuantity(component.productComponentQuantity);
    setShowModal(true);
  };

  const openAddModal = () => {
    setIsEditing(false);
    setSelectedComponent(null);
    setSelectedCategory("");
    setSelectedProduct("");
    setProductQuantity("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setSelectedComponent(null);
    setSelectedCategory("");
    setSelectedProduct("");
    setProductQuantity("");
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Components</h1>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add New Component
          </button>
        </div>

        {loading ? (
          <div className="text-center mt-6">Loading...</div>
        ) : error ? (
          <div className="text-center mt-6 text-red-500">{error}</div>
        ) : components.length === 0 ? (
          <div className="text-center mt-6 text-gray-500">
            No components available.
          </div>
        ) : (
          <table className="table-auto w-full mt-6 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">
                  Component Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">
                  Price Per Kg
                </th>
                <th className="border border-gray-300 px-4 py-2">Net Price</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {components.map((component) => (
                <tr key={component.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {component.productComponentName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {component.productComponentQuantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {component.productComponentPricePerKg}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {component.productComponentNetPrice}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => openEditModal(component)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComponent(component.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      {showModal && (
        <Modal
          title={isEditing ? "Edit Component" : "Add New Component"}
          onClose={closeModal}
        >
          <form onSubmit={handleAddOrUpdateComponent}>
            {!isEditing && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {!isEditing && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Product
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                  disabled={!selectedCategory}
                >
                  <option value="">Select Product</option>
                  {products.map((product, index) => (
                    <option key={index} value={product.rawMaterialProductName}>
                      {product.rawMaterialProductName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 mr-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {isEditing ? "Update Component" : "Add Component"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      <Footer />
    </div>
  );
};

export default Component;
