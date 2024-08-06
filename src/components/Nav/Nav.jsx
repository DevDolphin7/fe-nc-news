// import * as React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/NcNewsLogo.png";
import Dropdown from "./Dropdown"
import "./Nav.css";

const navigateLookup = {
  Articles: "/",
};

export default function Nav() {
  return (
    <div className="NavBar">
      <Link to="/">
        <img src={logoImage} />
      </Link>
      <h1>Dolphin News</h1>
      <Dropdown navigateLookup={navigateLookup} />
    </div>
  );
}
