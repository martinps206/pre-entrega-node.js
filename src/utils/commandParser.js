import { COMMAND_TYPES } from '../config/constants.js';

/**
 * Parsea y valida los comandos ingresados por terminal
 */
export function parseCommand(argv) {
  try {
    // Eliminamos los primeros dos elementos (node y ruta del archivo)
    const args = argv.slice(2);
    console.log('Argumentos a parsear:', args);
    
    if (args.length < 2) {
      throw new Error('INVALID_COMMAND');
    }

    const [method, path, ...params] = args;
    const validMethods = Object.values(COMMAND_TYPES);

    if (!validMethods.includes(method.toUpperCase())) {
      throw new Error('INVALID_COMMAND');
    }

    // Parsear el comando según el método
    switch (method.toUpperCase()) {
      case COMMAND_TYPES.GET:
        return parseGetCommand(method, path, params);
      
      case COMMAND_TYPES.POST:
        return parsePostCommand(method, path, params);
      
      case COMMAND_TYPES.DELETE:
        return parseDeleteCommand(method, path, params);
      
      default:
        throw new Error('INVALID_COMMAND');
    }
  } catch (error) {
    console.log('Error parseando comando:', error.message);
    throw error;
  }
}

/**
 * Parsea comandos GET
 */
function parseGetCommand(method, path, params) {
  const command = {
    method: method.toUpperCase(),
    type: 'products'
  };

  // Verificar si es para obtener un producto específico
  if (path.startsWith('products/')) {
    const productId = path.split('/')[1];
    if (!productId || isNaN(productId)) {
      throw new Error('INVALID_PRODUCT_ID');
    }
    command.productId = parseInt(productId);
    command.operation = 'getById';
  } else if (path === 'products') {
    command.operation = 'getAll';
  } else {
    throw new Error('INVALID_COMMAND');
  }

  return command;
}

/**
 * Parsea comandos POST
 */
function parsePostCommand(method, path, params) {
  if (path !== 'products' || params.length < 3) {
    throw new Error('MISSING_PARAMETERS');
  }

  const [title, price, category, ...descriptionParts] = params;
  
  if (isNaN(parseFloat(price))) {
    throw new Error('INVALID_PRICE');
  }

  return {
    method: method.toUpperCase(),
    type: 'products',
    operation: 'create',
    data: {
      title: title,
      price: parseFloat(price),
      category: category,
      description: descriptionParts.join(' ') || 'No description provided'
    }
  };
}

/**
 * Parsea comandos DELETE
 */
function parseDeleteCommand(method, path, params) {
  if (!path.startsWith('products/')) {
    throw new Error('INVALID_COMMAND');
  }

  const productId = path.split('/')[1];
  if (!productId || isNaN(productId)) {
    throw new Error('INVALID_PRODUCT_ID');
  }

  return {
    method: method.toUpperCase(),
    type: 'products',
    operation: 'delete',
    productId: parseInt(productId)
  };
}