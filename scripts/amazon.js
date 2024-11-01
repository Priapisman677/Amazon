const products = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: {stars: 4.5, count: 87},
  //Price is calculated with cents instead of dollars (10.90$ => 1090c):
  priceCents: 1095
}, {
  image: 'images/products/intermediate-composite-basketball.jpg',
  name: 'Intermediate Size Basketball',
  rating: {stars: 4, count: 127},
  //Price is calculated with cents instead of dollars (10.90$ => 1090c):
  priceCents: 2095,
}, {
  image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name: 'Adults Plain Cotton T-Shirt - 2 Pack',
  rating: {stars: 4.5, count: 56},
  //Price is calculated with cents instead of dollars (10.90$ => 1090c):
  priceCents: 799,
}
]


let productsHTML = ''
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

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>
  `
})

document.querySelector('.products-grid').innerHTML = productsHTML;