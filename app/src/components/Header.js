import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className='menuBar'>
      <nav>
        <NavLink className="navLink" exact activeClassName="active" to="/">
          HOME
        </NavLink>
        <NavLink className="navLink" activeClassName="active" to="/add">
          ADD
        </NavLink>
        <NavLink className="navLink" activeClassName="active" to="/history">
          HISTORY
        </NavLink>
        <NavLink className="navLink" activeClassName="active" to="/about">
          ABOUT
        </NavLink>
      </nav>
    </div>
  );
}
export default Header;