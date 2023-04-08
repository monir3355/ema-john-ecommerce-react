import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../FakeDB/FakeDB";
import Product from "../Product/Product";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [addToCart, setAddToCart] = useState([]);

  const handleClearCart = () => {
    setAddToCart([]);
    deleteShoppingCart();
  };

  const handleAddToCart = (product) => {
    let newProducts = [];
    const findProduct = addToCart.find((pd) => pd.id === product.id);
    if (!findProduct) {
      product.quantity = 1;
      newProducts = [...addToCart, product];
    } else {
      findProduct.quantity += 1;
      const remaining = addToCart.filter((pd) => pd.id != product.id);
      newProducts = [...remaining, findProduct];
    }
    setAddToCart(newProducts);
    addToDb(product.id);
  };
  useEffect(() => {
    const productsLoad = async () => {
      const res = await fetch("products.json");
      const data = await res.json();
      setProducts(data);
    };
    productsLoad();
  }, []);
  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // console.log(storedCart);
    for (let id in storedCart) {
      const addedProduct = products.find((product) => product.id == id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
      setAddToCart(savedCart);
    }
  }, [products]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 container mx-auto gap-8">
      <div className="md:col-span-2 lg:col-span-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-8 py-10">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="py-10 bg-[#FFE0B3] max-h-screen sticky top-0">
        <Cart addToCart={addToCart} handleClearCart={handleClearCart}>
          <Link to="/orders">
            <button className="btn bg-red-500 hover:bg-red-600 border-none w-full">
              Review Order
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
