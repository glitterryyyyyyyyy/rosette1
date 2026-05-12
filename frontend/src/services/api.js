import axios from 'axios';

const api = axios.create({
  baseURL:
    import.meta.env
      .VITE_API_BASE_URL ||
    'https://rosette1-production.up.railway.app/api',

  headers: {
    'Content-Type':
      'application/json',
  },
});

// TOKEN INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        'rosette_admin_token'
      );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// PRODUCT API
export const productService = {
  getAll: () =>
    api.get('/products'),

  getById: (id) =>
    api.get(`/products/${id}`),

  getFeatured: () =>
    api.get(
      '/products/featured'
    ),

  search: (query) =>
    api.get(
      `/products/search?q=${query}`
    ),

  getByCategory: (
    category
  ) =>
    api.get(
      `/products/category/${category}`
    ),
};

// ADMIN API
export const adminService = {
  login: (credentials) =>
    api.post(
      '/auth/login',
      credentials
    ),

  createProduct: (
    product
  ) =>
    api.post(
      '/admin/products',
      product
    ),

  updateProduct: (
    id,
    product
  ) =>
    api.put(
      `/admin/products/${id}`,
      product
    ),

  deleteProduct: (id) =>
    api.delete(
      `/admin/products/${id}`
    ),

  toggleSoldOut: (
    id,
    soldOut
  ) =>
    api.patch(
      `/admin/products/${id}/soldout?soldOut=${soldOut}`
    ),

  toggleFeatured: (
    id,
    featured
  ) =>
    api.patch(
      `/admin/products/${id}/featured?featured=${featured}`
    ),

  uploadImages: (
    formData
  ) =>
    api.post(
      '/admin/upload-images',
      formData,
      {
        headers: {
          'Content-Type':
            'multipart/form-data',
        },
      }
    ),
};

export default api;