import React from "react";
import { BeakerIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

const Product = ({ product, handleAddToCart }) => {
  const { name, category, seller, price, ratings, img, quantity } = product;
  return (
    <>
      <div className="card card-compact w-full bg-base-100 shadow-xl relative pb-12">
        <figure>
          <img src={img} alt="Shoes" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{name}</h2>
          <h2 className="text-lg font-semibold">{category}</h2>
          <p className="pb-4">Price : ${price}</p>
          <p>Manufacturer : {seller}</p>
          <p>Ratings : {ratings}</p>
        </div>
        <button onClick={() =>handleAddToCart(product)} className="btn bg-[#FFE0B3] hover:bg-[#fdd59c] btn-block text-black absolute bottom-0 border-0">
          Add To Cart
          <ShoppingCartIcon className="h-6 w-6 ml-2" />
        </button>
      </div>
    </>
  );
};

export default Product;
