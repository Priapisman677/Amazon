class Cart {
  //localStorageKey = undefined;
  #localStorageKey;
  constructor(LocalStorageKey) {
    
    this.#localStorageKey = LocalStorageKey;
     this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
    {productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2,deliveryOptionId: "1",},
    {productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1, deliveryOptionId: "2",},
  ];
  }
  

 
  //!I'll make a temporary test function:

  saveToStorage() {
    // I believe the issue that I have been having all this night had to be with the following line. Every time I save an item to the cart list it gets set to undefined inside of local storage.
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    // However it seems like it also has to do with me not declaring card items inside of the constructor the way simple dev did it and the way ChatGPT tells me to do.
    //More probably it doesn't have to do with that...

    // New update I believe I am getting it I believe The class at this point will always always use "undefined" to create it's cartItems array. I will try to change it to a function and see if it works.
    //New update: I believe it is not always undefined Since saveToStorage() is called after addToCart() and removeFromCart() it will always be defined.
    //$ Final update: I was forgetting to add the # to the variable name at  this.localStorageKey = LocalStorageKey;
  }

  addToCart(productId) {
    let matchingItem;
    let existingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = true;
        existingItem = cartItem;
      }
    });

    if (matchingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: "2",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter((cartItem) => {
      return cartItem.productId !== productId;
    });
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

export const cart1 = new Cart('cart-unique-1');

