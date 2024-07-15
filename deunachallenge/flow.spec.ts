import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import { ProductPage } from '../pageObjects/ProductPage';
import { CartPage } from '../pageObjects/CartPage';
import { CheckoutPage } from '../pageObjects/CheckoutPage';
import { UserDataLoader } from '../utils/UserDataLoader';

test('complete purchase flow', async ({ page }) => {
    const productName= "Yoga Mat";
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    // Cargar todos los datos de los usuarios desde JSON
    const users = UserDataLoader.loadAllUsersData();

    // Seleccionar un usuario (puede ser aleatorio o específico)
    const userData = users[0]; // Cambia el índice según el usuario que quieras utilizar


    await homePage.navigate();
    await homePage.searchProduct(productName);
    await productPage.addToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingDetails(
        userData.firstName,
        userData.lastName,
        userData.streetAddress,
        userData.city,
        userData.state,
        userData.postalCode,
        userData.country,
        userData.phoneNumber
    );

    // Seleccionar el método de envío (por ejemplo, 'flatrate_flatrate')
    await checkoutPage.selectShippingMethod('flatrate_flatrate');
    await checkoutPage.proceedToNext();
    // Validar la dirección de facturación
    await checkoutPage.validateBillingAddress(
        userData.firstName,
        userData.lastName,
        userData.streetAddress,
        userData.city,
        userData.state,
        userData.postalCode,
        userData.country,
        userData.phoneNumber
    );

    await checkoutPage.placeOrder();

});
