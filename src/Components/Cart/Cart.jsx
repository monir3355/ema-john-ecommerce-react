import React from "react";
import { BeakerIcon, TrashIcon } from "@heroicons/react/24/solid";

const Cart = ({ addToCart, handleClearCart, children }) => {
  // console.log(addToCart);

  // const total = addToCart.reduce((prev, current)=> prev + current.price, 0)
  let total = 0;
  let shipping = 0;
  let quantity = 0;
  for (let product of addToCart) {
    // product.quantity = product.quantity || 1;
    if(product.quantity){
      product.quantity = 1;
    }
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping;
    quantity = quantity + product.quantity;
  }
  let tax = (total * .10);
  let grandTotal = (total + shipping + tax)

  return (
    <>
      <h2 className="text-xl font-semibold underline text-center">
        Order Summary
      </h2>
      <div className="px-3 py-4">
        <p>Products Items : {quantity}</p>
        <p>Total Prices : ${total}</p>
        <p>Total Shipping Charge : ${shipping.toFixed(2)}</p>
        <p>Tax : ${parseFloat(tax.toFixed(2))}</p>
        <p className="font-semibold">Grand Total : ${grandTotal.toFixed(2)}</p>
        <button onClick={handleClearCart} className="btn bg-red-500 hover:bg-red-600 border-none w-full my-4">Clear Cart <TrashIcon className="h-6 w-6 ml-auto"/> </button>
        {children}
      </div>
    </>
  );
};

export default Cart;
