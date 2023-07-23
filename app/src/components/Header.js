import React from "react";
import { NavLink } from "react-router-dom";
import { GiShipWheel } from 'react-icons/gi';

function Header({name}) {
  return (
    <div className='menuBar'>
      <div className="logoName">
          <GiShipWheel size={50}/>
          <div className="mainName">
            <strong> {name} </strong>
          </div>
      </div>
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