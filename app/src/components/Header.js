import React from "react";
import { NavLink } from "react-router-dom";
import { GiShipWheel } from "react-icons/gi";

/**
 * Header that allows moving between following pages:
 * Home, Add, History and About
 */
function Header({ name }) {
  return (
    <div className="menuBar">
      <div className="logoName">
        <GiShipWheel size={50} />
        <div className="mainName">
          <strong> {name} </strong>
        </div>
      </div>
      <nav>
        <NavLink className="navLink headerT" to="/">
          HOME
        </NavLink>
        <NavLink className="navLink headerT" to="/add">
          ADD
        </NavLink>
        <NavLink className="navLink headerT" to="/history">
          HISTORY
        </NavLink>
        <NavLink className="navLink headerT" to="/about">
          ABOUT
        </NavLink>
      </nav>
    </div>
  );
}
export default Header;
