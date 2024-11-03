export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
},
{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
}];

export function addToCart(button_param){ 
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
}