 import { cart, removeFromCart } from '../data/cart.js';
 import { products } from '../data/products.js';
 import formatCurrency from './utils/money.js'
 import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
 import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
 import { deliveryOptions } from '../data/deliveryOptions.js';

 
// const today = dayjs()
// const deliveryDate = today.add(10, 'years');


//We will be saving all of the HTML in the next variable:
  let cartSummaryHTML =''

 //Down here we loop through all the items in the cart (right now 2 by default.) Because we want to create the check out tab. Next... ... ..
 cart.forEach((cartItem) =>{
  //... ... ... Next, We save the ID of the cart item in order for us to match it with an ID of the products list and get the information from it.
  const productId = cartItem.productId
  
   let matchingProduct;
  //... ... ... Next, We loop through the products list. It is a list of objects containing all the necessary information given an ID: Then, when a match IS MET, we save that information (full object) in the currently empty variable "matchingProduct"
  // "matchingProduct" Will contain all the information of the product.
  products.forEach((product) =>{
    if (product.id === productId){
      matchingProduct = product;
      //! be careful and see how the list 'products' items have a property called '.id' while the  list 'cart' items have a property called ".productId"
    }
  })

   //! Here I totally skipped a part of the video that puts the delivery date for each item on the checkout page. the part of the video was at 14:41:00

   cartSummaryHTML+= `
          <div class="cart-item-container 
            js-cart-item-container-${matchingProduct.id}">
             <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
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
                ${deliveryOptionsHTML(matchingProduct)}
              </div>
            </div>
          </div>
          `
  //*Creating the HTML for each delivery option of ALL CHHECKOUT ITEMS (based on current date)To then insert it in the main HTML for the checkout:
 });
function deliveryOptionsHTML(matchingProduct){
  let html = ''
  deliveryOptions.forEach((deliveryOption) =>{
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D')
    // Below we use a ternary operator where if the condition is true we use the question mark value and if the condition is false we use the colon value:
    const priceString = deliveryOption.priceCents 
    === 0
    ? 'Free'
    : `$${formatCurrency(deliveryOption.priceCents)} -`;
      html +=
    `                <div class="delivery-option">
                  <input type="radio"
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
                </div>`
  })
  return html
}

 //*We need to update the HTML just once and it has to be outside of the loop if we don't want to create a lot of duplicates
 document.querySelector('.js-order-summary').innerHTML += cartSummaryHTML;

//* Giving delete buttons functionality to remove items from the cart:
 document.querySelectorAll('.delete-quantity-link')
    .forEach((link) =>{
      link.addEventListener('click', ()=>{
        let productId = link.dataset.productId;
        //* function from cart.js (Creating a new cart with the item filtered out):
        removeFromCart(productId)
        updateCheckOutquantity()
        //  *Removing the item from the page:
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        
        
      }
    );
    }
  );




//*Updating check out quantity (2- in checkout tab now)
  function updateCheckOutquantity(){
    let quantity = 0;
    cart.forEach((cartItem) =>{

      quantity += cartItem.quantity
      
    })
    document.querySelector('.return-to-home-link').innerHTML = quantity
  }
 
 updateCheckOutquantity()