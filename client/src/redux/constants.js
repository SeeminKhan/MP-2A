let baseUrl = "https://server-y9qa.onrender.com";

export const BASE_URL = baseUrl;

export const USERS_URL = `${baseUrl}/api/users`;
export const CATEGORY_URL = `${baseUrl}/api/category`;
export const PRODUCT_URL = `${baseUrl}/api/products`;
export const UPLOAD_URL = `${baseUrl}/api/upload`;
export const ORDERS_URL = `${baseUrl}/api/orders`;
export const PAYPAL_URL = `${baseUrl}/api/config/paypal`;

// Use this for constructing URLs to access uploaded files
export const getUploadUrl = (filename) => `${baseUrl}/uploads/${filename}`;
