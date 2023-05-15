import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../FakeDB/FakeDB";
import Product from "../Product/Product";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const { totalProducts } = useLoaderData();
  // console.log(totalProducts);
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()];

  const handleClearCart = () => {
    setAddToCart([]);
    deleteShoppingCart();
  };

  const handleAddToCart = (product) => {
    let newProducts = [];
    const findProduct = addToCart.find((pd) => pd._id === product._id);
    if (!findProduct) {
      product.quantity = 1;
      newProducts = [...addToCart, product];
    } else {
      findProduct.quantity += 1;
      const remaining = addToCart.filter((pd) => pd._id != product._id);
      newProducts = [...remaining, findProduct];
    }
    setAddToCart(newProducts);
    addToDb(product._id);
  };

  useEffect(() => {
    const productsLoad = async () => {
      const res = await fetch(
        `https://ema-jhon-server-two.vercel.app/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await res.json();
      setProducts(data);
    };
    productsLoad();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    const savedCart = [];
    fetch("https://ema-jhon-server-two.vercel.app/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        // console.log(storedCart);
        for (let id in storedCart) {
          const addedProduct = cartProducts.find(
            (product) => product._id == id
          );
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
          setAddToCart(savedCart);
        }
      });
  }, []);
  const options = [6, 9, 15, 18];
  const handleOptionChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 container mx-auto gap-8">
        <div className="md:col-span-2 lg:col-span-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-8 py-10">
          {products.map((product) => (
            <Product
              key={product._id}
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
      {/* pagination */}
      <div className="text-center py-4">
        <h2 className="mb-4">
          current Page : {currentPage} and Items Per Page : {itemsPerPage}
        </h2>
        {pageNumbers.map((number) => (
          <button
            onClick={() => setCurrentPage(number)}
            className={`${
              currentPage === number ? "bg-blue-500 text-white" : ""
            } py-2 px-4 rounded-lg`}
            key={number}
          >
            {number}
          </button>
        ))}
        <select
          id="perPageDropdown"
          className="border rounded-lg p-2 ml-2"
          value={itemsPerPage}
          onChange={handleOptionChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
