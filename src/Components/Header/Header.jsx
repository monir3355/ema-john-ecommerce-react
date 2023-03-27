import React from 'react';

const Header = () => {
  return (
    <header className='bg-[#1C2B35]'>
      <nav className="navbar container mx-auto">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl"><img src="/src/images/Logo.svg" alt="" /></a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a className='text-white'>Order</a></li>
            <li><a className='text-white'>Order Review</a></li>
            <li><a className='text-white'>Manage Inventory</a></li>
            <li><a className='text-white'>Login</a></li>
            {/* <li className='text-white'><Link to='/order'>Order</Link></li>
            <li className='text-white'><Link to='/order review'>Order Review</Link></li>
            <li className='text-white'><Link to='/Manage Inventory'>Manage Inventory</Link></li>
            <li className='text-white'><Link to='/login'>Login</Link></li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;