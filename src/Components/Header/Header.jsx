import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("successful logout!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <header className="bg-[#1C2B35]">
      <nav className="navbar container mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <img src="/src/images/Logo.svg" alt="" />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li className="text-white">
              <Link to="/">Shop</Link>
            </li>
            <li className="text-white">
              <Link to="/orders">Order Review</Link>
            </li>
            <li className="text-white">
              <Link to="/inventory">Manage Inventory</Link>
            </li>
            <li className="text-white">
              <Link to="/login">Login</Link>
            </li>
            <li className="text-white">
              <Link to="/signup">Sign Up</Link>
            </li>
            {user ? (
              <>
                <button className="text-white mr-2">{user.email}</button>
                <button onClick={handleLogOut} className="text-white">
                  Sign Out
                </button>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
