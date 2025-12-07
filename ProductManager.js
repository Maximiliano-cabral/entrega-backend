import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    // Leer productos del archivo
    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // Obtener producto por ID
    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id);
    }

    // Agregar producto
    async addProduct(product) {
        const products = await this.getProducts();
        
        // Generar ID automático
        const newId = products.length > 0 
            ? Math.max(...products.map(p => p.id)) + 1 
            : 1;

        const newProduct = {
            id: newId,
            nombre: product.nombre,
            precio: product.precio,
            categoria: product.categoria
        };

        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    // Actualizar producto
    async updateProduct(id, updates) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);

        if (index === -1) return null;

        // No permitir actualizar el ID
        delete updates.id;

        products[index] = { ...products[index], ...updates };
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    // Eliminar producto
    async deleteProduct(id) {
        const products = await this.getProducts();
        const filteredProducts = products.filter(p => p.id !== id);

        if (products.length === filteredProducts.length) return false;

        await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
        return true;
    }
}

export default ProductManager;