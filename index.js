#!/usr/bin/env node

import { parseCommand } from './src/utils/commandParser.js';
import productController from './src/controller/productController.js';
import { ERROR_MESSAGES } from './src/config/constants.js';

/**
 * Función principal de la aplicación
 */
async function main() {
  try {
    console.log('SISTEMA DE GESTIÓN DE PRODUCTOS');
    console.log('='.repeat(50));
    
    // Debug: mostrar argumentos recibidos
    console.log('Argumentos recibidos:', process.argv.slice(2));
    
    // Verificar que se hayan pasado argumentos
    if (process.argv.length < 4) {
      throw new Error('INVALID_COMMAND');
    }
    
    // Parsear el comando ingresado
    const command = parseCommand(process.argv);
    console.log('Comando parseado:', command);
    
    // Ejecutar la operación correspondiente
    switch (command.operation) {
      case 'getAll':
        await productController.getAllProducts();
        break;
      
      case 'getById':
        await productController.getProductById(command.productId);
        break;
      
      case 'create':
        await productController.createProduct(command.data);
        break;
      
      case 'delete':
        await productController.deleteProduct(command.productId);
        break;
      
      default:
        throw new Error('INVALID_COMMAND');
    }
    
    console.log('\nOperación completada exitosamente.');
    
  } catch (error) {
    console.log('\nError detectado:');
    console.log('Mensaje:', error.message);
    
    // Manejo centralizado de errores
    if (ERROR_MESSAGES[error.message]) {
      console.log(ERROR_MESSAGES[error.message]);
    } else {
      console.log('Error inesperado:', error.message);
    }
    
    // Mostrar ayuda si hay error de comando
    if (error.message === 'INVALID_COMMAND' || process.argv.length < 4) {
      console.log('\nUSO CORRECTO:');
      console.log('  npm run start GET products');
      console.log('  npm run start GET products/<id>');
      console.log('  npm run start POST products "<title>" <price> "<category>"');
      console.log('  npm run start DELETE products/<id>');
    }
    
    process.exit(1);
  }
}

// Ejecutar la aplicación
main();