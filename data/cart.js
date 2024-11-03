export let cart = [
  {
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
},
{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
}
];

export function addToCart(button_param){ 
  const productId = button_param.dataset.productId;
  //*Down here "matchingItem" and "existingItem" could be the same variable and use ONLY "existingItem" to become trueTHY or falsY. I will leave it as is for a moment since it could get confusing.
  let matchingItem
  let existingItem
  //*In the following loop we will check if the item already exists, If the cart is empty it will not enter the loop.
  cart.forEach((cartItem) =>{
    if (productId === cartItem.productId){
      matchingItem = true;
      //* "cartItem" will be of the type object ( R E F E R E N C E  ^-^ ) and is the one that we pushed on commented code 'B'. "existingItem" will be a reference to the same object as "cartItem" and we will be able to update the quantity of the object outside of the loop.
      existingItem = cartItem;
    }
  })
  if(matchingItem){
    //*Down here we update the property of the object REFERENCE
                existingItem.quantity += 1;
    //* we couldn't put this^ inside of the forEach loop because we would be updating the quantity of the object every time we loop through the cart.
  }
  
    else{
       //* B
      cart.push({
        productId: productId,
        quantity: 1,
      }); 
  } 
}

export function removeFromCart(productId){
  // *One way to go through this function is by creating a new cart like in the commented code below (SSD-13:37:40).
  // const newCart = []
  // cart.forEach((cartItem) =>{
  //   if( cartItem.productId !== productId){
  //     newCart.push(cartItem)
  //   }
  // });
  // cart = newCart;
  //*However, we can also use the filter method to create a new array with the elements that pass the condition. Remember to type "cart = "
  cart = cart.filter((cartItem) =>{
    return cartItem.productId !== productId;
  })

}