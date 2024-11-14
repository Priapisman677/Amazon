import { cart, addToCart } from "../data/cart.js";
import { products} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

//*Generating the HTML for the main page based on number of products (we loop *for each product*).
let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
            //* Here we need to multiply the number of stars by 10 to match the name of images:
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
          ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option> 
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
                   // * What is down here is called data attribute. This way we can store any kind of data inside of an element and access it or change it without having to use document.querySelector('.').innerHTML.
          // *It is important that the attribute starts with "data-" Then we can name it whatever we want. However Please note that it needs to be converted to camel case when we use it in JavaScript (data-product-name :: productName). 
        // * Also notice that we removed the word data.
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
});

document.querySelector(".products-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});

function updateCartQuantity() {
  let carQuantity = 0;
  cart.forEach((cartItem) => {
    carQuantity += cartItem.quantity;
  });
  document.querySelector(".cart-quantity").innerHTML = carQuantity;
}
updateCartQuantity();
