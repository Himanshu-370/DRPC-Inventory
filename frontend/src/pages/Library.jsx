import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLibraryCategories,
  createLibraryCategory,
  updateLibraryCategory,
  deleteLibraryCategory,
} from "../api/services";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

const Library = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For error messages
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLibraryCategories();
      setCategories(data || []); // Fallback to empty array
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateLibraryCategory(editingCategory.id, categoryData);
      } else {
        await createLibraryCategory(categoryData);
      }
      fetchCategories();
      closeModal();
    } catch (err) {
      console.error("Error saving category:", err);
      setError("Failed to save category.");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteLibraryCategory(id);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Failed to delete category.");
    }
  };

  const openModal = (category = null) => {
    setEditingCategory(category);
    setCategoryData(
      category || {
        categoryName: "",
        categoryDescription: "",
      }
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setCategoryData({
      categoryName: "",
      categoryDescription: "",
    });
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Library Categories</h1>
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
        ) : categories.length === 0 ? (
          <div className="text-center mt-6 text-gray-500">
            No categories available.
          </div>
        ) : (
          <table className="table-auto w-full mt-6 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">
                  Category Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.categoryName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.categoryDescription}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/library-categories/${category.id}/library-products`
                        )
                      }
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                    >
                      View Products
                    </button>
                    <button
                      onClick={() => openModal(category)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
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
          title={editingCategory ? "Edit Category" : "Add New Category"}
          onClose={closeModal}
        >
          <form onSubmit={handleAddOrUpdateCategory}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={categoryData.categoryName}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    categoryName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Category Description
              </label>
              <textarea
                value={categoryData.categoryDescription}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    categoryDescription: e.target.value,
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

export default Library;
