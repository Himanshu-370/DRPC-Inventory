import { useState, useEffect } from "react";
import {
  getRawMaterials,
  createRawMaterial,
  updateRawMaterial,
  deleteRawMaterial,
} from "../api/services";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

const RawMaterials = () => {
  const [materials, setMaterials] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For error messages
  const [showModal, setShowModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [materialData, setMaterialData] = useState({
    rawMaterialCategoryName: "",
    rawMaterialProductName: "",
    rawMaterialProductPricePerKg: "",
    rawMaterialProductDensity: "",
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRawMaterials();
      setMaterials(data || []); // Fallback to empty array
    } catch (err) {
      console.error("Error fetching raw materials:", err);
      setError("Failed to load raw materials.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateMaterial = async (e) => {
    e.preventDefault();
    try {
      if (editingMaterial) {
        await updateRawMaterial(editingMaterial.id, materialData);
      } else {
        await createRawMaterial(materialData);
      }
      fetchMaterials();
      closeModal();
    } catch (err) {
      console.error("Error saving raw material:", err);
      setError("Failed to save raw material.");
    }
  };

  const handleDeleteMaterial = async (id) => {
    try {
      await deleteRawMaterial(id);
      fetchMaterials();
    } catch (err) {
      console.error("Error deleting raw material:", err);
      setError("Failed to delete raw material.");
    }
  };

  const openModal = (material = null) => {
    setEditingMaterial(material);
    setMaterialData(
      material || {
        rawMaterialCategoryName: "",
        rawMaterialProductName: "",
        rawMaterialProductPricePerKg: "",
        rawMaterialProductDensity: "",
      }
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMaterial(null);
    setMaterialData({
      rawMaterialCategoryName: "",
      rawMaterialProductName: "",
      rawMaterialProductPricePerKg: "",
      rawMaterialProductDensity: "",
    });
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Raw Materials</h1>
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
        ) : materials.length === 0 ? (
          <div className="text-center mt-6 text-gray-500">
            No raw materials available.
          </div>
        ) : (
          <table className="table-auto w-full mt-6 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">
                  Category Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Price Per Kg
                </th>
                <th className="border border-gray-300 px-4 py-2">Density</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {material.rawMaterialCategoryName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {material.rawMaterialProductName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {material.rawMaterialProductPricePerKg}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {material.rawMaterialProductDensity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => openModal(material)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMaterial(material.id)}
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
          title={editingMaterial ? "Edit Material" : "Add New Material"}
          onClose={closeModal}
        >
          <form onSubmit={handleAddOrUpdateMaterial}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={materialData.rawMaterialCategoryName}
                onChange={(e) =>
                  setMaterialData({
                    ...materialData,
                    rawMaterialCategoryName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={materialData.rawMaterialProductName}
                onChange={(e) =>
                  setMaterialData({
                    ...materialData,
                    rawMaterialProductName: e.target.value,
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
                value={materialData.rawMaterialProductPricePerKg}
                onChange={(e) =>
                  setMaterialData({
                    ...materialData,
                    rawMaterialProductPricePerKg: parseFloat(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Density
              </label>
              <input
                type="number"
                value={materialData.rawMaterialProductDensity}
                onChange={(e) =>
                  setMaterialData({
                    ...materialData,
                    rawMaterialProductDensity: parseFloat(e.target.value),
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

export default RawMaterials;
