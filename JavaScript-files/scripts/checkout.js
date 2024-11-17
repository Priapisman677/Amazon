import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadproducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

//*import '../data/cart-class.js'





Promise.all([

      new Promise((resolve1) => {
        loadproducts(() => {
          resolve1('Hello');
        });
      }),
      new Promise((resolve2)=>{
        loadCart(() => {
          resolve2('Hello 2 '); 
          });
        })

]).then((values)=>{
  console.log(values)
  renderOrderSummary();
  renderPaymentSummary();
})









//* Using promises 1 by 1 without using an array of Promise.all([]):
// new Promise((resolve1) => {
//   loadproducts(() => {
//     resolve1('Hello');
//   });
// }).then((value) => {
//   // console.log(value);
//   return new Promise((resolve2)=>{
//   loadCart(() => {
//     resolve2(); 
//     });
//   })
  
// }).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });


//* Using master code to handle asynchronous code:
// loadproducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//   renderPaymentSummary();
//   });

// });
