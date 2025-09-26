// Configuración de constantes de la aplicación
export const API_BASE_URL = 'https://fakestoreapi.com';
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_ID: '/products/'
};

export const COMMAND_TYPES = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE'
};

export const ERROR_MESSAGES = {
  INVALID_COMMAND: 'Comando inválido. Usa: GET, POST o DELETE',
  MISSING_PARAMETERS: 'Faltan parámetros requeridos',
  PRODUCT_NOT_FOUND: 'Producto no encontrado',
  API_ERROR: 'Error al conectar con la API'
};

export const SUCCESS_MESSAGES = {
  PRODUCT_CREATED: 'Producto creado exitosamente',
  PRODUCT_DELETED: 'Producto eliminado exitosamente'
};