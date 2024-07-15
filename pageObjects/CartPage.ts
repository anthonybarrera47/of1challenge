import { Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async proceedToCheckout() {
        // Esperar hasta que el contador del carrito sea 1
        await this.page.waitForFunction(() => {
            const counter = document.querySelector('.counter-number');
            return counter && counter.textContent.trim() !== '';
        });
        await this.page.click('a.action.showcart');

        await this.page.waitForTimeout(1000);
        // Esperar a que el botón "Proceed to Checkout" sea visible y luego hacer clic en él
        await this.page.waitForSelector('.block-minicart.ui-dialog-content.ui-widget-content', { state: 'visible' });

        // Esperar a que el botón "Proceed to Checkout" sea visible y luego hacer clic en él
        const checkoutButton = this.page.locator('#top-cart-btn-checkout');
        await this.page.waitForSelector('#top-cart-btn-checkout', { state: 'visible' });
        await checkoutButton.click();
    }
}
