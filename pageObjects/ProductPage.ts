import { Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addToCart() {
        // Seleccionar el primer producto de la lista
        const productElements = await this.page.locator('.products.list.items.product-items .item.product.product-item').first();

        // Verificar que haya productos en la lista
        if (await productElements.isVisible()) {
            const firstProductElement = productElements;
            // Hacer hover sobre el primer producto
            await firstProductElement.hover();
            // Seleccionar el primer tamaño
            const firstSizeOption = await firstProductElement.locator('.swatch-attribute.size .swatch-option').first();
            if (firstSizeOption.isVisible()) {
                await firstSizeOption.click();
            } else {
                throw new Error('No size options found for the first product');
            }
            // Seleccionar el primer color
            const firstColorOption = await firstProductElement.locator('.swatch-attribute.color .swatch-option').first();
            if (firstColorOption.isVisible()) {
                await firstColorOption.click();
            } else {
                throw new Error('No color options found for the first product');
            }
            // Buscar el botón "Add to Cart" dentro del primer producto
            const addToCartButton = await firstProductElement.locator('text=Add to Cart').first();

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
