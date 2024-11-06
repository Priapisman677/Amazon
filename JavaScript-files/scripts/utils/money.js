export function formatCurrency(priceCents){
  return (priceCents/100).toFixed(2)
} 

//* We can type the following so that in the main file we don't need to enclose what we want to import inside of brackets:
export default formatCurrency;
//* like this: " import formatCurrency from './utils/money.js' "