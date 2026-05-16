import React from "react";
import "../nav.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="nav-bar">
      <p>Vibely</p>
      <button
        onClick={() => {
          navigate("/create-post");
        }}
        className="button"
      >
        New post
      </button>
    </nav>
  );
};

export default Navbar;
