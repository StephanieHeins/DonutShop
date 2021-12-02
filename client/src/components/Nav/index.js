import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {

    if (Auth.loggedIn()) {
      return (
      <div>
        <div className="navbar is-primary mb-5">
          <div className="navbar-item is-size-4 ml-3 has-text-weight-bold">
            HomeTown Donuts
          </div>

          <Link to="/" className="navbar-item ml-5">
            Home 
          </Link>

          <Link to="/orderHistory" className="navbar-item ml-2">
            Orders 
          </Link>

          <a href="/" className="navbar-item ml-2" onClick={() => Auth.logout()}>
            Logout
          </a>

        </div>
      </div>
      );
    } else {
      return (
      <div>
        <div className="navbar is-primary mb-5">
        <div className="navbar-item is-size-4 ml-3 has-text-weight-bold">
            HomeTown Donuts 
        </div>

        <Link to="/" className="navbar-item ml-5">
          Home 
        </Link>
        
        <Link to="/signup" className="navbar-item ml-2">
          Signup
        </Link>

        <Link to="/login" className="navbar-item ml-2">
          Login
        </Link>
        </div>
      </div>
      );
    }
  }

  return (

      <nav>
        {showNavigation()}
      </nav>
  );
}

export default Nav;
