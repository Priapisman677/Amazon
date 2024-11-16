import { renderOrderSummary } from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import { loadproducts } from '../data/products.js';
import '../data/backend-practice.js'
//*import '../data/cart-class.js'

loadproducts( () => {
  renderOrderSummary();
  renderPaymentSummary();
});
