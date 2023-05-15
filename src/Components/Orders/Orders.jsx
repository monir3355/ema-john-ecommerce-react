import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import { deleteShoppingCart, removeFromDb } from "../FakeDB/FakeDB";

const Orders = () => {
  const addToCart = useLoaderData();
  const [carts, setCarts] = useState(addToCart);
  const handleDeleteProduct = (id) => {
    const remaining = carts.filter((pd) => pd._id != id);
    setCarts(remaining);
    removeFromDb(id);
  };
  const handleClearCart = () => {
    setCarts([]);
    deleteShoppingCart();
  };
  // console.log(products);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 container mx-auto gap-8">
      <div className="md:col-span-2 lg:col-span-4 flex flex-col gap-6 py-10 lg:w-3/4 mx-auto">
        {carts.map((product) => (
          <ReviewItem
            product={product}
            key={product._id}
            handleDeleteProduct={handleDeleteProduct}
          ></ReviewItem>
        ))}
      </div>
      <div className="py-10 bg-[#FFE0B3] max-h-screen sticky top-0">
        <Cart addToCart={addToCart} handleClearCart={handleClearCart}>
          <Link to="/checkout">
            <button className="btn bg-red-500 hover:bg-red-600 border-none w-full">
              Proceed Checkout
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
