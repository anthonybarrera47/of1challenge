import { Page, expect } from '@playwright/test';
import { Utils } from '../utils/Utils';

export class CheckoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    private async waitForShippingForm() {
        await this.page.waitForSelector('#shipping', { state: 'visible' });
    }

    private async fillAddress(firstName: string, lastName: string, streetAddress: string, city: string, state: string, postalCode: string, country: string, phoneNumber: string) {
        await this.page.fill('input[name="firstname"]', firstName);
        await this.page.fill('input[name="lastname"]', lastName);
        await this.page.fill('input[name="street[0]"]', streetAddress);
        await this.page.fill('input[name="city"]', city);
        await this.page.selectOption('select[name="region_id"]', state);
        await this.page.fill('input[name="postcode"]', postalCode);
        await this.page.selectOption('select[name="country_id"]', country);
        await this.page.fill('input[name="telephone"]', phoneNumber);
    }
    async selectShippingMethod(methodValue: string) {
        await this.page.waitForSelector('.checkout-shipping-method', { state: 'visible' });
        await this.page.click(`input[value="${methodValue}"]`);
    }
    async fillShippingDetails(firstName: string, lastName: string, streetAddress: string, city: string, state: string, postalCode: string, country: string, phoneNumber: string) {
        await this.waitForShippingForm();
        await this.page.waitForTimeout(1000);
        const email = Utils.generateRandomEmail();
        await this.page.fill('#customer-email', email);
        await this.fillAddress(firstName, lastName, streetAddress, city, state, postalCode, country, phoneNumber);
    }

    async proceedToNext() {
        // Esperar a que el botón de Next sea visible
        await this.page.waitForSelector('button[data-role="opc-continue"]', { state: 'visible' });
        // Hacer clic en el botón de Next
        await this.page.click('button[data-role="opc-continue"]');
    }
    async validateBillingAddress(firstName: string, lastName: string, streetAddress: string, city: string, state: string, postalCode: string, country: string, phoneNumber: string) {
        await this.page.waitForSelector('.billing-address-details', { state: 'visible' });

        const billingAddress = await this.page.locator('.billing-address-details');

        await expect(billingAddress.locator('text=' + firstName)).toBeVisible();
        await expect(billingAddress.locator('text=' + lastName)).toBeVisible();
        await expect(billingAddress.locator('text=' + streetAddress)).toBeVisible();
        await expect(billingAddress.locator('text=' + city)).toBeVisible();
        await expect(billingAddress.locator('text=' + state)).toBeVisible();
        await expect(billingAddress.locator('text=' + postalCode)).toBeVisible();
        await expect(billingAddress.locator('text=' + country)).toBeVisible();
        await expect(billingAddress.locator(`a[href="tel:${phoneNumber}"]`)).toBeVisible();

        await expect(billingAddress).toContainText(firstName);
        await expect(billingAddress).toContainText(lastName);
        await expect(billingAddress).toContainText(streetAddress);
        await expect(billingAddress).toContainText(city);
        await expect(billingAddress).toContainText(state);
        await expect(billingAddress).toContainText(postalCode);
        await expect(billingAddress).toContainText(country);
    }

    async placeOrder() {
        const placeOrderButton = this.page.locator('button.action.primary.checkout[title="Place Order"]');
        await placeOrderButton.waitFor({ state: 'visible' });
        await placeOrderButton.click();
    }

    async validateOrderCompletionMessage() {
        await this.page.waitForSelector('.page-title-wrapper', { state: 'visible' });

        const orderCompletionMessage = await this.page.locator('.page-title-wrapper .page-title .base');
        await expect(orderCompletionMessage).toBeVisible();
        await expect(orderCompletionMessage).toContainText('Thank you for your purchase!');
    }
}
