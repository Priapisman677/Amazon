class Cart {
  //localStorageKey = undefined;
  #localStorageKey;
  constructor(LOCALStorageKey) {
    //Down here "LOCAL" doesn't have to be all caps but I will leave it like that for clarity:
    this.localStorageKey = LOCALStorageKey;
  }

  cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
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

// const cart = new Cart("cart-oop");

// cart.localStorageKey  = 'cart-oop'

// cart.addToCart("5968897c-4d27-4872-89f6-5bcb052746d7");
// adds a new product to cart1's cartItems.
// console.log("cart at index 2: ", cart.cartItems[2]);
//we check the cartItems array at index 2 to see if
// the new product was added.

// const cart2 = new Cart("cart-2");
// console.log("cart2 at index 1: ", cart2.cartItems[1]);
// console.log("cart2 at index 2: ", cart2.cartItems[2]);
// console.log("🚀 ~ cart2:", cart2);
// console.log(BuninessCart);

// console.log(cart2 instanceof Cart);

