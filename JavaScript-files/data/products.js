import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(cartItemProductId) {
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === cartItemProductId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

class Product {
  //*Actually, we don't need to declare and initialize the variables when the properties are not private:
  // id;
  // image;
  // name;
  // rating;
  // priceCents;
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }
  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }
  getPrice() {
    return `${formatCurrency(this.priceCents)}`;
  }
  extraInfoHTML() {
    return `hi`;
  }
}

class Clothing extends Product {
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return ` <a href="${this.sizeChartLink}" target="_blank">Size chart</a>`;
  }
}




//*Now we will try to get the same array of products but from the backend:


//* Using fetch (for CHECKOUT.JS):
export let products = [];

export function loadProductsFetch() {
  //$ If you trigger an error, use: "https://error.supersimplebackend.dev/products" .
  const promise = fetch("https://supersimplebackend.dev/products")
    .then((response) => {
      return response.json();
    })
    .then((productsData) => {

      console.log('loaded products');

      products = productsData.map((productDetails) => {
        if (productDetails.type === "clothing") {
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });
      return 'test2'
    }).catch((error)=>{
      console.log('Unexpected error :(')
      console.log('information about the error: ', error)
    });

  return promise;
}

/*
loadProductsFetch().then(() => {
  console.log("Next step");
  
});
*/


//* Using XMLHttpRequest  (for AMAZON.JS):
export function loadproducts(funcParamResolve) {
  
  const xhr1 = new XMLHttpRequest();

  xhr1.addEventListener("load", () => {
    products = JSON.parse(xhr1.response).map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    funcParamResolve();

  });

  xhr1.addEventListener('error', (error)=>{
    console.log('Unexpected error :(')
    console.log('information about the error: ', error)
  })
  //$ If you trigger an error, use: "https://error.supersimplebackend.dev/products" .
  xhr1.open("GET", "https://supersimplebackend.dev/products");
  xhr1.send();
}

