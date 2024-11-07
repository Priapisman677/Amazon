function Cart(localStorageKey) {
  const cart = {
    cartItems: JSON.parse(localStorage.getItem(localStorageKey)) || [
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
    ],
    //Below will use the shorthand method syntax, it would be a shortcut for: "saveToStorage: function(){}"
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    //Below will also the shorthand method syntax isntead of "addToCart: function(button){ "
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
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((cartItem) => {
        return cartItem.productId !== productId;
      });
      this.saveToStorage();
    },
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },
  };
  return cart;
}
const cart1 = Cart("cart-oop");

cart1.addToCart("5968897c-4d27-4872-89f6-5bcb052746d7");
// adds a new product to cart1's cartItems.
console.log("cart1 at index 2: ", cart1.cartItems[2]);
//we check the cartItems array at index 2 to see if
// the new product was added.

const cart2 = Cart("cart-2");
console.log("cart2 at index 1: ", cart2.cartItems[1]);
console.log("cart2 at index 2: ", cart2.cartItems[2]);
// console.log(BuninessCart);
