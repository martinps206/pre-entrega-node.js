import fetch from 'node-fetch';
import { API_BASE_URL, API_ENDPOINTS } from '../config/constants.js';

/**
 * Servicio para interactuar con la API FakeStore
 */
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Realiza una petición HTTP genérica
   */
  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      console.log(`Realizando petición a: ${url}`);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      };

      // Si hay body, convertirlo a JSON
      if (options.body) {
        config.body = JSON.stringify(options.body);
        console.log('Body enviado:', config.body);
      }

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Respuesta recibida correctamente \n');
      return data;
    } catch (error) {
      console.log('Error en la petición:', error.message);
      throw new Error(`API_ERROR: ${error.message}`);
    }
  }

  /**
   * Obtiene todos los productos
   */
  async getAllProducts() {
    return this.request(API_ENDPOINTS.PRODUCTS);
  }

  /**
   * Obtiene un producto por ID
   */
  async getProductById(id) {
    return this.request(`${API_ENDPOINTS.PRODUCTS}${id}`);
  }

  /**
   * Crea un nuevo producto
   */
  async createProduct(productData) {
    return this.request(API_ENDPOINTS.PRODUCTS, {
      method: 'POST',
      body: productData
    });
  }

  /**
   * Elimina un producto
   */
  async deleteProduct(id) {
    return this.request(`${API_ENDPOINTS.PRODUCTS}${id}`, {
      method: 'DELETE'
    });
  }
}

export default new ApiService();