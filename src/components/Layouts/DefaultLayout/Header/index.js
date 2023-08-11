import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">products</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/profile">profile</Link>
        </li>
      </ul>
    </div>
  );
};
