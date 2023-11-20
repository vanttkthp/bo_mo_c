import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";

function Header() {
  const userName = localStorage.getItem("userName");
  const adminRole = localStorage.getItem("adminRole");

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isUser");
    localStorage.removeItem("userName");
    localStorage.removeItem("adminRole");
    window.location.reload();
    window.location.href = "/";
  };

  const handleDropdownToggle = (e) => {
    e.currentTarget.parentElement
      .querySelector(".dropdown-menu")
      .classList.toggle("show");
  };

  const handleDropdownItemClick = (e) => {
    e.currentTarget.closest(".dropdown-menu").classList.remove("show");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            E-Commerce
          </Link>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <div>
                {localStorage.getItem("isAdmin") ||
                localStorage.getItem("isUser") ? (
                  <a className="nav-link">
                    Hello {adminRole} {userName} !
                  </a>
                ) : null}
              </div>
              {/* <div>
                {localStorage.getItem("isAdmin") ? (
                  <Link to="/books" className="nav-link">
                    Product
                  </Link>
                ) : null}
              </div> */}
              <div className="dropdown">
                <Link className="nav-link" onClick={handleDropdownToggle}>
                  Product
                </Link>

                <div className="dropdown-menu">
                  <Link
                    to="/books"
                    className="dropdown-item"
                    href="#"
                    onClick={handleDropdownItemClick}
                  >
                    Book
                  </Link>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={handleDropdownItemClick}
                  >
                    Mobile
                  </Link>
                  <Link
                    className="dropdown-item"
                    href="#"
                    onClick={handleDropdownItemClick}
                  >
                    Clothes
                  </Link>
                </div>
              </div>
            </ul>
            <ul className="navbar-nav">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {localStorage.getItem("isAdmin") ||
                localStorage.getItem("isUser") ? null : (
                  <>
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                    <Link to="/signup" className="nav-link">
                      SignUp
                    </Link>
                  </>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {localStorage.getItem("isUser") ? (
                  <>
                    <Link to="/user/cart" className="nav-link">
                      Cart
                    </Link>
                    <Link to="/user/profile/99" className="nav-link">
                      Profile
                    </Link>
                  </>
                ) : null}
              </div>
              <div>
                {localStorage.getItem("isAdmin") ||
                localStorage.getItem("isUser") ? (
                  <Link className="nav-link" onClick={handleLogout}>
                    Logout
                  </Link>
                ) : null}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
