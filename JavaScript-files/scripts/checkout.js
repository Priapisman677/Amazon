import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadproducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

//*Using Async Await to load both the products and the cart:
// async function loadPage() {

//   const returnedValue1 = await loadProductsFetch();

//   const returnedValue2 = await new Promise((resolve2) => {
//     loadCart(() => {
//       resolve2('Test');
//     });
//   });

//   renderOrderSummary();
//   renderPaymentSummary();
//   console.log(returnedValue2);
// }
// loadPage()

//*Using Async Await to load both the products and the cart (using PROMISE ALL):
async function loadPage() {
  const returnedValue2 = await Promise.all([
    loadProductsFetch(),

    new Promise((resolve2) => {
      loadCart(() => {
        resolve2('67');
      });
    }),
  ]);

  renderOrderSummary();
  renderPaymentSummary();
  console.log(returnedValue2);
}
loadPage();

//* Using promises 1 by 1 using an array of Promise.all([]):
/*
Promise.all([

      // new Promise((resolve1) => {
      //   loadproducts(() => {
      //     resolve1('test1');
      //   });
      // }),
      
      loadProductsFetch(),


      new Promise((resolve2)=>{
        loadCart(() => {
          resolve2(); 
          });
        })

]).then((value)=>{
  
  renderOrderSummary();
  renderPaymentSummary();
})
  */

//* Using promises 1 by 1 without using an array of Promise.all([]):
// new Promise((resolve1) => {

//   loadproducts(() => {
//     resolve1();
//   });

// }).then(() => {

//   return new Promise((resolve2)=>{
//   loadCart(() => {
//     resolve2();
//     });
//   })

// }).then(() => {
//    renderOrderSummary();
//   renderPaymentSummary();
// });

//* Using nesting code to handle asynchronous code:
// loadproducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//   renderPaymentSummary();
//   });

// });
