 import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
 import { products } from '../data/products.js';
 import formatCurrency from './utils/money.js'
 import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
 import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
 import { deliveryOptions } from '../data/deliveryOptions.js';

 


//We will be saving all of the HTML in the next variable:
  let cartSummaryHTML =''

 //*Down here we loop through all the items in the cart (right now 2 by default.) Because we want to create the check out tab. Next... ... ..
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
    }})

   //Nov 3 10:30p.m: Putting the delivery date for each item on the checkout page. The part of the video was at 14:41:00:
   const deliveryOptionId = cartItem.deliveryOptionId;
   let deliveryOption;
   deliveryOptions.forEach((option) =>{
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
   })
// Nov 3: copy-pasted code to get the date:
      const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        //*1.- Date:
        const dateString = deliveryDate.format('dddd, MMMM D')

   cartSummaryHTML+= `
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
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
          `
});
//We need to update the HTML just once and it has to be outside of the loop if we don't want to create a lot of duplicates
document.querySelector('.js-order-summary').innerHTML += cartSummaryHTML;


//*Creating the HTML for each delivery option PRICE AND DATE of ALL CHECKOUT ITEMS (based on current date) To then insert it in the main HTML for the checkout:
//$ Nov 4 note: Normally we wouldn't have to make a function for this but we make it a function because we want to call it when we are creating the main HTML and we also need to pass parameters for the radio selector.
function deliveryOptionsHTML(matchingProduct, cartItem){
  let html = ''
  deliveryOptions.forEach((deliveryOption) =>{
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'
    );
    //1.- Date:
    const dateString = deliveryDate.format('dddd, MMMM D')
    // Below we use a ternary operator where if the condition is true we use the question mark value and if the condition is false we use the colon value:
    // 2.- Price:
    const priceString = deliveryOption.priceCents === 0 ? 'Free' : `$${formatCurrency(deliveryOption.priceCents)} -`;

    // NOV 3 9:47p.m: Figuring out which delivery option should be checked (this is the only thing that is unique from the three iterations, the other three are the same for ALL PRODUCTS, you can confirm it): 
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId

      html +=
    `           <div class="delivery-option js-delivery-option"
                  data-product-id="${matchingProduct.id}"
                  data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                  ${isChecked ? 'checked' :''}
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



//*Giving delete buttons functionality to remove items from the cart:
 document.querySelectorAll('.delete-quantity-link').forEach((link) =>{
      link.addEventListener('click', ()=>{
        let productId = link.dataset.productId;
        //function from cart.js (Creating a new cart with the item filtered out):
        removeFromCart(productId)
        updateCheckOutquantity()
        //Removing the item from the page:
        //!Maybe we could put the following inside of the removeFromCart(productId) function:
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        });});

//* Giving "delivery options's grid" functionality To modify the delivery option in your cart items.
// Here we are targeting the three "delivery grids" that each product on the checkout has.
  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click', ()=>{
      //Down here we use the shorthand property for practice and it would be equal to:
      // const productId = element.dataset.productId
      // const deliveryOptionId = element.dataset.deliveryOptionId
      const {productId, deliveryOptionId} = element.dataset
      updateDeliveryOption(productId, deliveryOptionId)
    });

  });

//* Updating check out quantity (2- in checkout tab now)
  function updateCheckOutquantity(){
    let quantity = 0;
    cart.forEach((cartItem) =>{

      quantity += cartItem.quantity
      
    })
    document.querySelector('.return-to-home-link').innerHTML = quantity
  }
 
 updateCheckOutquantity()