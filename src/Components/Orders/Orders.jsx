import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import { removeFromDb } from "../FakeDB/FakeDB";

const Orders = () => {
  const addToCart = useLoaderData();
  const [carts, setCarts] = useState(addToCart);
  const handleDeleteProduct = (id) => {
    const remaining = carts.filter((pd) => pd.id != id);
    setCarts(remaining);
    removeFromDb(id);
  };
  // console.log(products);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 container mx-auto gap-8">
      <div className="md:col-span-2 lg:col-span-4 flex flex-col gap-6 py-10 lg:w-3/4 mx-auto">
        {carts.map((product) => (
          <ReviewItem
            product={product}
            key={product.id}
            handleDeleteProduct={handleDeleteProduct}
          ></ReviewItem>
        ))}
      </div>
      <div className="py-10 bg-[#FFE0B3] max-h-screen sticky top-0">
        <Cart addToCart={addToCart}></Cart>
      </div>
    </div>
  );
};

export default Orders;
