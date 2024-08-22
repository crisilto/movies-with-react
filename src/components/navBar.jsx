import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <div className="d-flex">
          <NavLink className="nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-link" to="/rentals">
            Rentals
          </NavLink>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
