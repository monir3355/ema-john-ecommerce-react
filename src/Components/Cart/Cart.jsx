import React from "react";

const Cart = ({ addToCart }) => {
  // console.log(addToCart);

  // const total = addToCart.reduce((prev, current)=> prev + current.price, 0)
  let total = 0;
  let shipping = 0
  for (let product of addToCart) {
    total = total + product.price;
    shipping = shipping + product.shipping;
  }
  let tax = (total * .10);
  let grandTotal = (total + shipping + tax)

  return (
    <>
      <h2 className="text-xl font-semibold underline text-center">
        Order Summary
      </h2>
      <div className="px-3 py-4">
        <p>Products Items : {addToCart.length}</p>
        <p>Total Prices : ${total}</p>
        <p>Total Shipping Charge : ${shipping.toFixed(2)}</p>
        <p>Tax : ${parseFloat(tax.toFixed(2))}</p>
        <p className="font-semibold">Grand Total : ${grandTotal.toFixed(2)}</p>
      </div>
    </>
  );
};

export default Cart;
