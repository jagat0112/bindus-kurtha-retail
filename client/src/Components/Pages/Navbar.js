import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import EmailIcon from "./Homepage/Assets/8807.png";
import Phone from "./Homepage/Assets/phone-512.png";
import FreeDelivery from "./Homepage/Assets/44279.png";
import SecurePayment from "./Homepage/Assets/81566.png";
import SearchIcon from "../Assests/search-icon.png";
import AuthContext from "../context/Auth/AuthContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const [searchBox, setsearchBox] = useState(false);
  const [nav, setNav] = useState(false);

  const openSearch = () => {
    setsearchBox(searchBox ? false : true);
  };

  const openNav = (e) => {
    setNav(nav ? false : true);
    openNav
      ? e.target.classList.toggle("is-opened")
      : e.target.classList.remove("is-opened");
  };
  return (
    <div>
      <header className="header" id="header">
        <div className="top-nav-icon">
          <div className="top-icon-wrapper">
            <div className="top-icon">
              <img width="25px" src={SecurePayment} alt=""></img>
              <p>SECURE PAYMENT</p>
            </div>
            <div className="top-icon">
              <img width="25px" src={FreeDelivery} alt=""></img>
              <p>FREE SHIPPING</p>
            </div>
          </div>
          <div className="top-icon-social">
            <a href="/#">
              <img width="25px" src={EmailIcon} alt=""></img>
            </a>

            <a href="/#">
              <img width="25px" src={Phone} alt=""></img>
            </a>
            <a href="/#">Store Locator</a>
          </div>
        </div>
        <div className="header__container">
          <Link to={"/"} className="header__logo">
            <img
              src="./assets/img/logo.png"
              alt="logo"
              className="img-fluid"
            ></img>
          </Link>
          <form
            className={searchBox ? "header__search" : "header__search is_shown"}
          >
            <input type="text" placeholder="Search.." name="search" />
          </form>
          <div onClick={openSearch}>
            <img width="40px" src={SearchIcon} alt=""></img>
            <br />
          </div>

          <div>
            {localStorage.token ? (
              <div className="header__btn-box">
                {" "}
                <p className="welcome-text">
                  Welcome{" "}
                  <strong>
                    {authContext.me && authContext.me.name.split(" ")[0]}
                  </strong>
                </p>
                <Link
                  to={"/"}
                  className="btn-primary"
                  onClick={() => {
                    authContext.logout();
                  }}
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="header__btn-box">
                <Link className="btn-primary" to={"/login"}>
                  Login
                </Link>
                <Link to={"/register"} className="btn-primary">
                  REGISTER
                </Link>
                <div className="nav-icon" onClick={openNav} id="js-navIcon">
                  <span></span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="container">
          <nav className={nav ? "nav is-open" : "nav"} id="js-nav">
            <ul className="nav__list">
              <li className="nav__item">
                <div class="nav__btn-box">
                  <a class="btn-primary" href="/login">
                    Login
                  </a>
                  <a class="btn-primary" href="/register">
                    REGISTER
                  </a>
                </div>
              </li>
              <li className="nav__item">
                <a href="#area-1" className="nav__link js-navLink">
                  NEW ARRIVAL
                </a>
              </li>
              <li className="nav__item">
                <a href="#area-2" className="nav__link js-navLink">
                  KURTHA
                </a>
              </li>
              <li className="nav__item">
                <a href="#area-4" className="nav__link js-navLink">
                  SARI
                </a>
              </li>
              <li className="nav__item">
                <a href="#area-5" className="nav__link js-navLink">
                  TRENDING
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* <div style={{ display: "flex" }}>
      <p style={{ fontSize: "50px" }}>Navbar</p>
      <div>
        {" "}
        {localStorage.token ? (
          <Link
            to={"/"}
            className="log-in-out"
            onClick={() => {
              authContext.logout();
            }}
          >
            Logout
          </Link>
        ) : (
          <Link className="log-in-out" to={"/login"}>
            Login
          </Link>
        )}
      </div> */}
      {/* </div> */}
    </div>
  );
};

export default Navbar;
