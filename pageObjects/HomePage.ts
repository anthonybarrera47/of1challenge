import { Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://magento.softwaretestingboard.com/');
    }

    async searchProduct(productName: string) {
        //await this.page.click('input[aria-expanded=\'true\']');
        await this.page.fill('input[name="q"]', productName);
        await this.page.press('input[name="q"]', 'Enter');
    }
}
