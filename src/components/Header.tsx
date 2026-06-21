import "./Header.css";
import logo from "../assets/imgLogo.svg"
import logoAndName from "../assets/imgLogoAndName.svg"
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <picture className="logo">
          <source media="(max-width: 480px)" srcSet={logo} />
          <source media="(max-width: 1024px)" srcSet={logoAndName} />
          <img src={logoAndName} />
        </picture>
      </Link>
    </header>
  );
}