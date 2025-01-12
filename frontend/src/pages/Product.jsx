import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLibraryProductsInCategory,
  addLibraryProductToCategory,
  updateLibraryProductInCategory,
  removeLibraryProductFromCategory,
} from "../api/services";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

const Product = () => {
  const { categoryId } = useParams(); // Ensure categoryId is passed in route
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For error messages
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productPricePerKg: "",
  });

  useEffect(() => {
    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLibraryProductsInCategory(categoryId);
      setProducts(data || []); // Set data or fallback to empty array
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateLibraryProductInCategory(
          categoryId,
          editingProduct.id,
          productData
        );
      } else {
        await addLibraryProductToCategory(categoryId, productData);
      }
      fetchProducts();
      closeModal();
    } catch (err) {
      console.error("Error saving product:", err);
      setError("Failed to save product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await removeLibraryProductFromCategory(categoryId, id);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product.");
    }
  };

  const openModal = (product = null) => {
    setEditingProduct(product);
    setProductData(
      product || {
        productName: "",
        productDescription: "",
        productPricePerKg: "",
      }
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setProductData({
      productName: "",
      productDescription: "",
      productPricePerKg: "",
    });
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Library Products</h1>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add New
          </button>
        </div>

        {loading ? (
          <div className="text-center mt-6">Loading...</div>
        ) : error ? (
          <div className="text-center mt-6 text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center mt-6 text-gray-500">
            No products available.
          </div>
        ) : (
          <table className="table-auto w-full mt-6 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Price Per Kg
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.productName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.productDescription}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.productPricePerKg}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/library-categories/${categoryId}/library-products/${product.id}/product-components`
                        )
                      }
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                    >
                      View Components
                    </button>
                    <button
                      onClick={() => openModal(product)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
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
          title={editingProduct ? "Edit Product" : "Add New Product"}
          onClose={closeModal}
        >
          <form onSubmit={handleAddOrUpdateProduct}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={productData.productName}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    productName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Product Description
              </label>
              <textarea
                value={productData.productDescription}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    productDescription: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Price Per Kg
              </label>
              <input
                type="number"
                value={productData.productPricePerKg}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    productPricePerKg: parseFloat(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
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
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}
      <Footer />
    </div>
  );
};

export default Product;
