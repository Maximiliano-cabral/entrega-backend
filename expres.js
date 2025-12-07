import express from 'express';
import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';

const app = express();
const puerto = 8080;

// Middleware para procesar JSON
app.use(express.json());

// Instancias de los managers
const productManager = new ProductManager('./products.json');
const cartManager = new CartManager('./carts.json');

//Obtener todos los productos
app.get('/api/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

//Obtener producto por ID
app.get('/api/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});

//Agregar nuevo producto
app.post('/api/products', async (req, res) => {
    try {
        const { nombre, precio, categoria } = req.body;

        // Validar campos obligatorios
        if (!nombre || !precio || !categoria) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const newProduct = await productManager.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el producto" });
    }
});

//Actualizar producto
app.put('/api/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedProduct = await productManager.updateProduct(productId, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
});

//Eliminar producto
app.delete('/api/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const deleted = await productManager.deleteProduct(productId);

        if (!deleted) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
});


//Crear nuevo carrito
app.post('/api/carts', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito" });
    }
});

//Obtener carrito por ID
app.get('/api/carts/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cartId);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
});

//Agregar producto al carrito
app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        const updatedCart = await cartManager.addProductToCart(cartId, productId);

        if (!updatedCart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar producto al carrito" });
    }
});

// Iniciar servidor
app.listen(puerto, () => {
    console.log(`Servidor levantado en puerto ${puerto}`);
});