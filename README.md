# API de E-commerce - Primera Entrega

## Descripción
Servidor basado en Node.js y Express para gestionar productos y carritos de compra.

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/Maximiliano-cabral/entrega-backend.git
```

2. Instalar dependencias
```bash
npm install
```

3. Ejecutar el servidor
```bash
node expres.js
```

El servidor se levantará en `http://localhost:8080`

## Endpoints

### Productos (`/api/products`)
- **GET** `/api/products` - Obtener todos los productos
- **GET** `/api/products/:pid` - Obtener producto por ID
- **POST** `/api/products` - Crear nuevo producto
```json
  {
    "nombre": "Producto ejemplo",
    "precio": 100,
    "categoria": "Categoría"
  }
```
- **PUT** `/api/products/:pid` - Actualizar producto
- **DELETE** `/api/products/:pid` - Eliminar producto

### Carritos (`/api/carts`)
- **POST** `/api/carts` - Crear nuevo carrito
- **GET** `/api/carts/:cid` - Obtener carrito por ID
- **POST** `/api/carts/:cid/product/:pid` - Agregar producto al carrito

## Estructura del proyecto
```
├── CartManager.js       # Gestor de carritos
├── ProductManager.js    # Gestor de productos
├── expres.js           # Servidor principal
├── carts.json          # Persistencia de carritos
├── products.json       # Persistencia de productos
├── package.json
└── .gitignore
```

## Tecnologías utilizadas
- Node.js
- Express.js
- File System (fs) para persistencia

## Autor
Maximiliano Cabral