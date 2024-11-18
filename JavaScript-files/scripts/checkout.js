import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { 
  loadproducts, loadProductsFetch

 } from "../data/products.js";
import { loadCart } from "../data/cart.js";

//*import '../data/cart-class.js'




//* Using promises 1 by 1 using an array of Promise.all([]):
Promise.all([

      // new Promise((resolve1) => {
      //   loadproducts(() => {
      //     resolve1();
      //   });
      // }),
      
      loadProductsFetch(),
      new Promise((resolve2)=>{
        loadCart(() => {
          resolve2(); 
          });
        })

]).then(()=>{

  renderOrderSummary();
  renderPaymentSummary();
})



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
