import React from "react";
import "./style.css";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/user">Users</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
