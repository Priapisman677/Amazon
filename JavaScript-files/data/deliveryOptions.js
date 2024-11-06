import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions = [
{
id: '1',
deliveryDays: 7,
priceCents: 0,
},
{
  id: '2',
  deliveryDays: 3,
  priceCents: 499,
},
{
  id: '3',
  deliveryDays: 1,
  priceCents: 999,
}
];

//*Exporting this function to get the deliveryOption based on the cart deliveryOptionId
export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryOptions.forEach((option) =>{
   if(option.id === deliveryOptionId){
     deliveryOption = option;
   }
  })
  return deliveryOption || deliveryOptions[0];
}

//*Exporting this function to get the delivery date based on a delivery option
export function getDateString(deliveryOption){
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  //1.- Date:
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}