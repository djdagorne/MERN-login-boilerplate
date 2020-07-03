import React from "react";
import { Link } from "react-router-dom";

import AuthOptions from "../Auth/AuthOptions";

export default function Header() {
  return (
    <header id="header">
      <Link to="/" className="title">
        <h1>MERN Auth App</h1>
      </Link>
      <AuthOptions />
    </header>
  );
}
