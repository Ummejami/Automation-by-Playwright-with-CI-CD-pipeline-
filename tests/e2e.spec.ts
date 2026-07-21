import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { randomString, randomPostalCode } from '../pages/utils';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const TARGET_PRICE = 15.99;

test.describe('SauceDemo E2E purchase flow', () => {
  test('standard_user can log in, buy the $15.99 item, and complete checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // ----------  Login ----------
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);

    // ---------assertion 1----------------
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(productsPage.pageTitle).toHaveText('Products');

    // ---------- Find $15.99 item ----------
    const targetItem = await productsPage.findItemByPrice(TARGET_PRICE);
    const itemName = await productsPage.getItemName(targetItem);
    const addToCartButton = productsPage.getAddToCartButton(targetItem);
    // --------------asserttion 2---------------
    await expect(addToCartButton).toHaveText('Add to cart');
    await addToCartButton.click();

    // --------------------assertion 3-----------
    await expect(addToCartButton).toHaveText('Remove');
    await expect(productsPage.cartBadge).toHaveText('1');

    // ---------- Cart validation ----------
    await productsPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(1);

    const priceText = await cartPage.getFirstItemPriceText();
    expect(priceText).toBe('$15.99');

    const cartItemName = await cartPage.cartItemName.first().innerText();
    expect(cartItemName).toBe(itemName);

    // ---------- Step 4: Complete purchase ----------
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    await checkoutPage.fillShippingInfo(
      randomString(8),
      randomString(8),
      randomPostalCode(5)
    );
    await checkoutPage.continueToOverview();

    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    await checkoutPage.finishOrder();

    await expect(page).toHaveURL(/.*checkout-complete\.html/);

  // -------------assertion 4-------------------
    await expect(checkoutPage.completeHeader).toBeVisible();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});
