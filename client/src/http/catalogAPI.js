import { guestInstance, authInstance } from "./index.js";

/*
 * Создание, обновление и удаление категории, получение списка всех категорий
 */
export const createCategory = async (category) => {
  const { data } = await authInstance.post("api/category/create", category);
  return data;
};

export const updateCategory = async (id, category) => {
  const { data } = await authInstance.put(
    `api/category/update/${id}`,
    category
  );
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await authInstance.delete(`api/category/delete/${id}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await guestInstance.get("api/category/getall");
  return data;
};

export const fetchCategory = async (id) => {
  const { data } = await guestInstance.get(`api/category/getone/${id}`);
  return data;
};

/*
 * Создание, обновление и удаление товара, получение списка всех товаров
 */
export const createProduct = async (product) => {
  const { data } = await authInstance.post("api/product/create/", product, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await authInstance.put(`api/product/update/${id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await authInstance.delete(`api/product/delete/${id}`);
  return data;
};

export const fetchAllProducts = async (
  categoryId = null,
  page = 1,
  limit = 10
) => {
  let url = "api/product/getall/";
  // фильтрация товаров по категории и/или бренду
  if (categoryId) url = url + "categoryId/" + categoryId;

  const { data } = await guestInstance.get(url, {
    params: {
      // GET-параметры для постраничной навигации
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneProduct = async (id) => {
  const { data } = await guestInstance.get(`api/product/getone/${id}`);
  return data;
};

export const fetchAllReviews = async (id) => {
  const { data } = await guestInstance.get(`api/reviews/product/${id}`);
  return data;
};
export const createReviews = async (id, reviews) => {
  const { data } = await guestInstance.post(
    `api/product/${id}/reviews/create`,
    reviews
  );
  return data;
};
export const deleteReviews = async (productId, id) => {
  const { data } = await guestInstance.delete(
    `api/reviews/product/${productId}/delete/${id}`
  );
  return data;
};

export const fetchProdRating = async (id) => {
  const { data } = await guestInstance.get(`api/rating/product/${id}`);
  return data;
};
export const createProdRating = async (productId, rating, comment) => {
  const { data } = await guestInstance.post(
    `api/rating/product/${productId}/create`,
    rating,
    comment
  );
  return data;
};
// export const deleteProdRating = async (id) => {
//   const { data } = await guestInstance.delete(
//     `api/rating/product/${id}/delete/${id}`
//   );
//   return data;
// };

/*
 * Создание, обновление и удаление характеристик товара
 */
export const createProperty = async (productId, property) => {
  const { data } = await authInstance.post(
    `api/product/${productId}/property/create`,
    property
  );
  return data;
};

export const updateProperty = async (productId, id, property) => {
  const { data } = await authInstance.put(
    `api/product/${productId}/property/update/${id}`,
    property
  );
  return data;
};

export const deleteProperty = async (productId, id) => {
  const { data } = await authInstance.delete(
    `api/product/${productId}/property/delete/${id}`
  );
  return data;
};
