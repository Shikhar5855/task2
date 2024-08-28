import { NavLink } from "react-router-dom";
import { useAuth } from "../Store/auth";
import "./Navbar.css";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <header>
        <div className="container2">
          <div className="logo-brand">
            <a href="/">
            <img src="/images/logo_adroitkey.png" >
            </img></a>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/service">Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
             
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
              </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
