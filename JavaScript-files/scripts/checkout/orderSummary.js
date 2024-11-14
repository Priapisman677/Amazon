import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";

import {
  deliveryOptions,
  getDeliveryOption,
  getDateString,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";



//! 11/11 I now need to add the find method instead of the functions getProduct(cartItemProductId) and getDeliveryOption(deliveryOptionId).




//*Down here is the MAIN FUNCTION. We loop through all the items in the cart (right now 2 by default.) Because we want to create the check out tab.
export function renderOrderSummary() {
  //We will be saving all of the HTML in the next variable:
  let cartSummaryHTML = "";
  cart.forEach((cartItem) => {
    //... ... ... Next, We save the ID of the cart item in order for us to match it with an ID of the products list and get the information from it.
    const cartItemProductId = cartItem.productId;
    // Nov 4: Now we import the function from products.js so we can also use it in other places such as paymentSummary:
    const matchingProduct = getProduct(cartItemProductId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = getDateString(deliveryOption);

    cartSummaryHTML += `
      <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
            <!-- //*formatCurrency() is imported from a module -->
            ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${
                  cartItem.quantity
                }</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary"
                    data-product-id="${matchingProduct.id}"
              >
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
      `;
  });
  //We need to update the HTML just once and it has to be outside of the loop if we don't want to create a lot of duplicates
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  //*Creating the HTML for each delivery option PRICE AND DATE of ALL CHECKOUT ITEMS (based on current date) To then insert it in the main HTML for the checkout:
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = getDateString(deliveryOption);
      // Below we use a ternary operator where if the condition is true we use the question mark value and if the condition is false we use the colon value:
      // 2.- Price:
      const priceString =
        deliveryOption.priceCents === 0
          ? "Free"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      // NOV 3 9:47p.m: Figuring out which delivery option should be checked (this is the only thing that is unique from the three iterations, the other three are the same for ALL PRODUCTS, you can confirm it):
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `           
      <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? "checked" : ""}
                      class="delivery-option-input"
                      name="${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString}  Shipping
                      </div>
                    </div>
                  </div>`;
    });
    return html;
  }

  //* Giving "delivery options's grid" event listeners To modify the delivery option in your cart items.
  // Here we are targeting the three "delivery grids" that each product on the checkout has.
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      //Down here we use the shorthand property for practice and it would be equal to:
      // const productId = element.dataset.productId
      // const deliveryOptionId = element.dataset.deliveryOptionId
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  //*Giving delete buttons functionality to remove items from the cart:
  document.querySelectorAll(".delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      let productId = link.dataset.productId;
      //function from cart.js (Creating a new cart with the item filtered out):
      removeFromCart(productId);
      updateCheckOutquantity();
      renderPaymentSummary();
      renderOrderSummary();
    });
  });

  //* Updating check out quantity (2- in checkout tab now)
  function updateCheckOutquantity() {
    let quantity = 0;
    cart.forEach((cartItem) => {
      quantity += cartItem.quantity;
    });
    document.querySelector(".return-to-home-link").innerHTML = quantity;
  }

  updateCheckOutquantity();
}
