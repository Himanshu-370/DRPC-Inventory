import axios from "axios";

// Base URL for API
const API_BASE_URL = import.meta.env.VITE_API_URL;
// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility function to handle API errors
const handleApiError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  throw error;
};

// --------------------- Library Categories ---------------------

export const getLibraryCategories = async () => {
  try {
    const response = await api.get("/library-categories");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createLibraryCategory = async (data) => {
  try {
    const response = await api.post("/library-categories", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateLibraryCategory = async (id, data) => {
  try {
    const response = await api.put(`/library-categories/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteLibraryCategory = async (id) => {
  try {
    await api.delete(`/library-categories/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};

// --------------------- Library Products ---------------------

export const getLibraryProductsInCategory = async (categoryId) => {
  try {
    const response = await api.get(
      `/library-categories/${categoryId}/library-products`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addLibraryProductToCategory = async (categoryId, data) => {
  try {
    const response = await api.post(
      `/library-categories/${categoryId}/library-products`,
      data
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateLibraryProductInCategory = async (
  categoryId,
  productId,
  data
) => {
  try {
    const response = await api.put(
      `/library-categories/${categoryId}/library-products/${productId}`,
      data
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const removeLibraryProductFromCategory = async (
  categoryId,
  productId
) => {
  try {
    await api.delete(
      `/library-categories/${categoryId}/library-products/${productId}`
    );
  } catch (error) {
    handleApiError(error);
  }
};

// --------------------- Product Components ---------------------

export const getProductComponentsInLibraryProduct = async (
  categoryId,
  productId
) => {
  try {
    const response = await api.get(
      `/library-categories/${categoryId}/library-products/${productId}/product-components`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addProductComponentToLibraryProduct = async (
  categoryId,
  productId,
  data
) => {
  try {
    const response = await api.post(
      `/library-categories/${categoryId}/library-products/${productId}/product-components`,
      data
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateProductComponentInLibraryProduct = async (
  categoryId,
  productId,
  componentId,
  data
) => {
  try {
    const response = await api.put(
      `/library-categories/${categoryId}/library-products/${productId}/product-components/${componentId}`,
      data
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const removeProductComponentFromLibraryProduct = async (
  categoryId,
  productId,
  componentId
) => {
  try {
    await api.delete(
      `/library-categories/${categoryId}/library-products/${productId}/product-components/${componentId}`
    );
  } catch (error) {
    handleApiError(error);
  }
};

// --------------------- Raw Materials ---------------------

export const getRawMaterials = async () => {
  try {
    const response = await api.get("/raw-materials");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createRawMaterial = async (data) => {
  try {
    const response = await api.post("/raw-materials", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateRawMaterial = async (id, data) => {
  try {
    const response = await api.put(`/raw-materials/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteRawMaterial = async (id) => {
  try {
    await api.delete(`/raw-materials/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};

export const getPriceHistory = async () => {
  try {
    const response = await api.get("/raw-materials/price-history");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
