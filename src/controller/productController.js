import apiService from '../services/apiService.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants.js';

/**
 * Controlador para gestionar las operaciones de productos
 */
class ProductController {
  /**
   * Obtiene todos los productos
   */
  async getAllProducts() {
    try {
      console.log('Obteniendo todos los productos...\n');
      const products = await apiService.getAllProducts();
      
      this.displayProducts(products);
      return products;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Obtiene un producto específico
   */
  async getProductById(productId) {
    try {
      console.log(`Buscando producto con ID: ${productId}...\n`);
      const product = await apiService.getProductById(productId);
      
      this.displayProductDetail(product);
      return product;
    } catch (error) {
      this.handleError(error, productId);
    }
  }

  /**
   * Crea un nuevo producto
   */
  async createProduct(productData) {
    try {
      console.log('Creando nuevo producto...\n');
      
      // Validar datos requeridos
      if (!productData.title || !productData.price || !productData.category) {
        throw new Error('MISSING_PARAMETERS');
      }

      const newProduct = await apiService.createProduct({
        title: productData.title,
        price: productData.price,
        description: productData.description,
        category: productData.category,
        image: 'https://via.placeholder.com/300',
        rating: { rate: 0, count: 0 }
      });

      console.log(SUCCESS_MESSAGES.PRODUCT_CREATED);
      this.displayProductDetail(newProduct);
      return newProduct;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Elimina un producto
   */
  async deleteProduct(productId) {
    try {
      console.log(`Eliminando producto con ID: ${productId}...\n`);
      const result = await apiService.deleteProduct(productId);
      
      console.log(SUCCESS_MESSAGES.PRODUCT_DELETED);
      console.log('Producto eliminado:', result);
      return result;
    } catch (error) {
      this.handleError(error, productId);
    }
  }

  /**
   * Muestra la lista de productos formateada
   */
  displayProducts(products) {
    console.log('LISTA DE PRODUCTOS');
    console.log('='.repeat(80));
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title}`);
      console.log(`Precio: $${product.price} | Categoría: ${product.category}`);
      console.log(`ID: ${product.id} | Rating: ${product.rating?.rate || 'N/A'}`);
      console.log('-'.repeat(80));
    });
    
    console.log(`\nTotal de productos: ${products.length}\n`);
  }

  /**
   * Muestra el detalle de un producto
   */
  displayProductDetail(product) {
    console.log('DETALLE DEL PRODUCTO');
    console.log('='.repeat(80));
    console.log(`ID: ${product.id}`);
    console.log(`Título: ${product.title}`);
    console.log(`Precio: $${product.price}`);
    console.log(`Categoría: ${product.category}`);
    console.log(`Descripción: ${product.description}`);
    console.log(`Rating: ${product.rating?.rate || 'N/A'} (${product.rating?.count || 0} reviews)`);
    console.log('='.repeat(80));
  }

  /**
   * Maneja los errores de forma consistente
   */
  handleError(error, productId = null) {
    const errorMessage = ERROR_MESSAGES[error.message] || error.message;
    
    switch (error.message) {
      case 'INVALID_COMMAND':
        console.log(errorMessage);
        console.log('\nEJEMPLOS DE USO:');
        console.log('npm run start GET products');
        console.log('npm run start GET products/1');
        console.log('npm run start POST products "Camiseta" 25.99 "Ropa"');
        console.log('npm run start DELETE products/1');
        break;
      
      case 'MISSING_PARAMETERS':
        console.log(errorMessage);
        console.log('Para POST products necesitas: <title> <price> <category> [description]');
        break;
      
      case 'INVALID_PRODUCT_ID':
        console.log('ID de producto inválido. Debe ser un número.');
        break;
      
      case 'API_ERROR':
        console.log(`Error de API: ${error.cause || 'Problema de conexión'}`);
        break;
      
      default:
        if (error.message.includes('404') || error.message.includes('HTTP error! status: 404')) {
          console.log(`Producto con ID ${productId} no encontrado.`);
        } else {
          console.log(`Error: ${errorMessage}`);
        }
    }
    
    process.exit(1);
  }
}

export default new ProductController();