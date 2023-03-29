import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../FakeDB/FakeDB';
import Product from '../Product/Product';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [addToCart, setAddToCart] = useState([])
  
  const handleAddToCart =(product)=>{
    const newProducts = [...addToCart, product]
    setAddToCart(newProducts);
    addToDb(product.id)
  }
  useEffect( ()=>{
    const productsLoad = async()=>{
      const res = await fetch('products.json');
      const data = await res.json();
      setProducts(data);
    }
    productsLoad();
  }, [])
  useEffect( ()=>{
    const storedCart = getShoppingCart();
    console.log(storedCart);
  }, [])
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 container mx-auto gap-8'>
      <div className='md:col-span-2 lg:col-span-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-8 py-10'>
      {
        products.map(product=> <Product
        key={product.id}
        product={product}
        handleAddToCart={handleAddToCart}
        ></Product>)
      }
      </div>
      <div className='py-10 bg-[#FFE0B3] max-h-screen sticky top-0'>
        <Cart addToCart={addToCart}></Cart>
      </div>
    </div>
  );
};

export default Shop;