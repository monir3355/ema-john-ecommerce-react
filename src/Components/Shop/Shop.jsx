import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect( ()=>{
    const productsLoad = async()=>{
      const res = await fetch('products.json');
      const data = await res.json();
      setProducts(data);
    }
    productsLoad();
  }, [])
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 container mx-auto gap-8'>
      <div className='md:col-span-2 lg:col-span-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-8 py-10'>
      {
        products.slice(0, 6).map(product=> <Product
        key={product.id}
        product={product}
        ></Product>)
      }
      </div>
      <div className='py-10 bg-[#FFE0B3] max-h-screen'>
        <h2 className='text-xl font-semibold underline text-center'>Order Summary</h2>
      </div>
    </div>
  );
};

export default Shop;