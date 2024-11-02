import{ cart as myCart} from '../data/cart.js';
import{ products } from '../data/products.js';
console.log("🚀 ~ products[1]:", products[1])
const cart = [];

let productsHTML = ''
//*"Products" point to the products.js file:
products.forEach((product_param, index) =>{
  //* I will temporarily leave the parameter as "product_param" just to show how we access the properties using the name of the parameter not the name of the object itself.
  productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product_param.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product_param.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
            //* Here we need to multiply the number of stars by 10 to match the name of images:
              src="images/ratings/rating-${product_param.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${product_param.rating.count}
            </div>
          </div>

          <div class="product-price">
          ${(product_param.priceCents / 100).toFixed(2)}
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

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
                   // * What is down here is called data attribute. This way we can store any kind of data inside of an element and access it or change it without having to use document.querySelector('.').innerHTML.
          // *It is important that the attribute starts with "data-" Then we can name it whatever we want. However Please note that it needs to be converted to camel case when we use it in JavaScript (data-product-name :: productName). 
        // * Also notice that we removed the word data.
          data-product-id="${product_param.id}">
            Add to Cart
          </button>
        </div>
  `
})
document.querySelector('.products-grid').innerHTML = productsHTML;


// *What is belloww  is executed just once when we reload the page, Basically we added event listeners to all the buttons but just once:

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () =>{
      //* Super simple dot debt declared 'productId' here at 12:47:00
      addToCart(button)
      updateCartQuantity()
      // console.log('cart:', cart)
    });
  });

  

function addToCart(button_param){
    
    const productId = button_param.dataset.productId;
    //*Down here "matchingItem" and "existingItem" could be the same variable and use ONLY "existingItem" to become trueTHY or falsY. I will leave it as is for a moment since it could get confusing.
    let matchingItem
    let existingItem
    //*In the following loop we will check if the item already exists, If the cart is empty it will not enter the loop.
    cart.forEach((cartItem) =>{
      if (productId === cartItem.productId){
        matchingItem = true;
        //* "cartItem" will be of the type object ( R E F E R E N C E  ^-^ ) and is the one that we save on commented code 'B'. "existingItem" will be a reference to the same object as "item" and we will be able to update the quantity of the object.
        existingItem = cartItem;
      }
    })
    if(matchingItem){
      //*Down here we update the property of the object REFERENCE
                  existingItem.quantity += 1;
      //* we couldn't put this^ inside of the forEach loop because we would be updating the quantity of the object every time we loop through the cart.
    }
    
      if(!matchingItem){
         //* B
        cart.push({
          productId: productId,
          quantity: 1,
        }); 
    } 

    //*Updating the cart quantity

}

function updateCartQuantity(){
    let carQuantity = 0;
    cart.forEach((cartItem) => {
      carQuantity += cartItem.quantity
    });
    document.querySelector('.cart-quantity').innerHTML = carQuantity; 
}