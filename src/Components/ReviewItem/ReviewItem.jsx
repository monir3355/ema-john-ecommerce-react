import React from "react";
import { BeakerIcon, TrashIcon } from "@heroicons/react/24/solid";

const ReviewItem = ({ product, handleDeleteProduct }) => {
  // console.log(product);
  const { name, price, quantity, shipping, img, _id } = product;
  return (
    <div className="border px-6 rounded-md flex justify-between items-center">
      <div className="card card-side">
        <figure>
          <img className="h-32" src={img} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>Price : ${price}</p>
          <p>Quantity : {quantity}</p>
        </div>
      </div>
      <div
        onClick={() => handleDeleteProduct(_id)}
        className="bg-red-400 p-3 rounded-full cursor-pointer"
      >
        <TrashIcon className="text-white h-8 w-8" />
      </div>
    </div>
  );
};

export default ReviewItem;
