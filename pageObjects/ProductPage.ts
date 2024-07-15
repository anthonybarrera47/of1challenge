import { Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addToCart() {
        // Seleccionar el primer producto de la lista
        const productElements = await this.page.$$('.products.list.items.product-items .item.product.product-item');

        // Verificar que haya productos en la lista
        if (productElements.length > 0) {
            const firstProductElement = productElements[0];
            // Hacer hover sobre el primer producto
            await firstProductElement.hover();
            // Seleccionar el primer tamaño
            const firstSizeOption = await firstProductElement.$('.swatch-attribute.size .swatch-option');
            if (firstSizeOption) {
                await firstSizeOption.click();
            } else {
                throw new Error('No size options found for the first product');
            }
            // Seleccionar el primer color
            const firstColorOption = await firstProductElement.$('.swatch-attribute.color .swatch-option');
            if (firstColorOption) {
                await firstColorOption.click();
            } else {
                throw new Error('No color options found for the first product');
            }
            // Buscar el botón "Add to Cart" dentro del primer producto
            const addToCartButton = await firstProductElement.$('text=Add to Cart');

            // Verificar que el botón "Add to Cart" exista y sea visible
            if (addToCartButton) {
                await addToCartButton.click();
            } else {
                throw new Error('Add to Cart button not found for the first product');
            }
        } else {
            throw new Error('No products found');
        }
    }
}
