export let cart =
JSON.parse(localStorage.getItem('cart')) ||
[{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, deliveryOptionId: '1'},
{productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, deliveryOptionId: '2'}];

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

//* Exporting function to add to cart at click:
export function addToCart(productId)
{ 
  //Down here "matchingItem" and "existingItem" could be the same variable and use ONLY "existingItem" to become trueTHY or falsY. I will leave it as is for a moment since it could get confusing.
  let matchingItem
  let existingItem
  //In the following loop we will check if the item already exists, If the cart is empty it will not enter the loop.
  cart.forEach((cartItem) =>{
    if (productId === cartItem.productId){
      matchingItem = true;
      // "cartItem" will be of the type object ( R E F E R E N C E  ^-^ ) and is the one that we pushed on commented code 'B'. "existingItem" will be a reference to the same object as "cartItem" and we will be able to update the quantity of the object outside of the loop.
      existingItem = cartItem;
    }
  })
  if(matchingItem){
    //Down here we update the property of the object REFERENCE
      existingItem.quantity += 1;
    // we couldn't put this^ inside of the forEach loop because we would be updating the quantity of the object every time we loop through the cart.
  }else{
       // B
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '2'
      }); 
  }
  //Since this function updates the cart we will call the following function here:
  //Next we will do it as well for commented code 'C' below since We also update the card there
  saveToStorage() 
}


export function removeFromCart(productId){
  cart = cart.filter((cartItem) =>{
    return cartItem.productId !== productId;
  })
  //C:
  saveToStorage();
}

  //* Exporting function to update the delivery option of a cart item:
  export function updateDeliveryOption(productId, deliveryOptionId ){
  let matchingItem;
  cart.forEach((cartItem)=> { 
    if(productId === cartItem.productId){
        matchingItem = cartItem
    } 
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage()
}




export function loadCart(funcParamResolve) {
  const xhr1 = new XMLHttpRequest();

  xhr1.addEventListener("load", () => {
    console.log(xhr1.response)

    funcParamResolve();
  });

  xhr1.open("GET", "https://supersimplebackend.dev/cart");
  xhr1.send();
}