import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-[#1C2B35]'>
      <nav className="navbar container mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl"><img src="/src/images/Logo.svg" alt="" /></Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li className='text-white'><Link to='/'>Shop</Link></li>
            <li className='text-white'><Link to='/orders'>Order Review</Link></li>
            <li className='text-white'><Link to='/inventory'>Manage Inventory</Link></li>
            <li className='text-white'><Link to='/login'>Login</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;