import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../Assests/search-icon.png";
import AuthContext from "../context/Auth/AuthContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const [searchBox, setsearchBox] = useState(false);

  const openSearch = () => {
    setsearchBox(searchBox ? false : true);
  };
  return (
    <div>
      <header className="header" id="header">
        <div className="header__container">
          <Link to={"/"} className="header__logo">
            <img
              src="./assets/img/logo.png"
              alt="logo"
              className="img-fluid"
            ></img>
          </Link>
          <form className="header__search">
            <input type="text" placeholder="Search.." name="search" />
          </form>
          <div onClick={openSearch}>
            <img width="40px" src={SearchIcon} alt=""></img>
            <br />
            {searchBox && (
              <form>
                <input type="text" placeholder="Search.." name="search" />
              </form>
            )}
          </div>

          <div>
            {localStorage.token ? (
              <div className="header__btn-box">
                {" "}
                <p>
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
                <div class="nav-icon" id="js-navIcon">
                  <span></span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="container">
          <nav className="nav" id="js-nav">
            <ul className="nav__list">
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
