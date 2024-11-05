import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/money.js'

export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem)=>{
    //getProduct Is a reused function that we had in the main file (checkout) but we are sharing it by exporting it from products JS instead.
    const product = getProduct(cartItem.productId)
    productPriceCents += product.priceCents * cartItem.quantity

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents
  })
    // console.log("🚀 ~ cart.forEach ~ productPriceCents:", productPriceCents)
    // console.log("🚀 ~ cart.forEach ~ shippingPriceCents:", shippingPriceCents)
   const totalBeforeTaxCents = productPriceCents + shippingPriceCents
   const taxCents = totalBeforeTaxCents * 0.1;
   const totalCents = totalBeforeTaxCents + taxCents
  
   const paymentSummaryHTML = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
   `;

   document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}