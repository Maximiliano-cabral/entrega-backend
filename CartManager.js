import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    // Leer carritos del archivo
    async getCarts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // Obtener carrito por ID
    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(c => c.id === id);
    }

    // Crear carrito
    async createCart() {
        const carts = await this.getCarts();
        
        const newId = carts.length > 0 
            ? Math.max(...carts.map(c => c.id)) + 1 
            : 1;

        const newCart = {
            id: newId,
            products: []
        };

        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    // Agregar producto al carrito
    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(c => c.id === cartId);

        if (cartIndex === -1) return null;

        const productIndex = carts[cartIndex].products.findIndex(
            p => p.product === productId
        );

        if (productIndex === -1) {
            // Producto no existe en el carrito, agregarlo
            carts[cartIndex].products.push({
                product: productId,
                quantity: 1
            });
        } else {
            // Producto ya existe, incrementar cantidad
            carts[cartIndex].products[productIndex].quantity++;
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return carts[cartIndex];
    }
}

export default CartManager;