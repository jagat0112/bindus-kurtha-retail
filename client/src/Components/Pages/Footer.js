import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="container-big">
          <div className="footer__box">
            <div className="footer__ul-box">
              <h2 className="footer__title">About Bindus</h2>
              <ul className="footer__ul">
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    About Bindu's
                  </Link>
                </li>
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    Business Enquiry
                  </Link>
                </li>
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    Career
                  </Link>
                </li>
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    Sitemap
                  </Link>
                </li>
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__ul-box">
              <h2 className="footer__title">Customer's Services</h2>
              <ul className="footer__ul">
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    Help/FAQ
                  </Link>
                </li>
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    Find Link Store
                  </Link>
                </li>
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    Shipping
                  </Link>
                </li>
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    Delivery & Returns Payments & Refunds
                  </Link>
                </li>
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__ul-box">
              <h2 className="footer__title">Top Categories</h2>
              <ul className="footer__ul">
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    Collections
                  </Link>
                </li>
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    Brands
                  </Link>
                </li>
                <li className="footer__list">
                  <Link href="#" className="footer__link">
                    Flyers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__ul-box">
              <h2 className="footer__title text-center">Card Accepted</h2>
              <figure>
                <img src="./../assets/img/card.png" alt="card" />
              </figure>
            </div>
          </div>
          p.footer
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
