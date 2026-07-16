import { NavLink } from "react-router-dom";
import img from "../../assets/logo.svg";
import "./NavBar.css";
import { useState, useEffect, useRef } from "react";
const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const nav = useRef(null);
  const navBtn = useRef(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleClickOutside = (event) => {
    if (
      nav.current &&
      !nav.current.contains(event.target) &&
      !navBtn.current.contains(event.target)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="destination">
        <header className="primary-header flex">
          <div>
            <img src={img} alt="space tourism logo" className="logo" />
          </div>
          <button
            className="mobile-nav-toggle"
            aria-controls="primary-navigation"
            aria-expanded={isVisible}
            onClick={() => {
              toggleVisibility();
            }}
            ref={navBtn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={34}
              height={34}
              viewBox="0 0 24 24"
              style={{
                fill: "rgba(255, 255, 255, 1)",
                transform: "",
              }}
            >
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
            </svg>
          </button>
          <nav>
            <ul
              id="primary-navigation"
              className="primary-navigation underline-indicators flex"
              data-visible={isVisible}
              ref={nav}
            >
              <NavLink
                to="/"
                className="ff-sans-cond uppercase text-white letter-spacing-2"
              >
                Home
              </NavLink>
              <NavLink
                to="/gallery"
                className="ff-sans-cond uppercase text-white letter-spacing-2"
              >
                Gallery
              </NavLink>
              <NavLink
                to="/about"
                className="ff-sans-cond uppercase text-white letter-spacing-2"
              >
                About
              </NavLink>
              <NavLink
                to="/events"
                className="ff-sans-cond uppercase text-white letter-spacing-2"
              >
                Events
              </NavLink>
              <NavLink
                to="/contact"
                className="ff-sans-cond uppercase text-white letter-spacing-2"
                style={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                Contact <div>Us</div>
              </NavLink>
              <NavLink
                to="/team"
                className="ff-sans-cond uppercase text-white letter-spacing-2"
              >
                Team
              </NavLink>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default NavBar;
