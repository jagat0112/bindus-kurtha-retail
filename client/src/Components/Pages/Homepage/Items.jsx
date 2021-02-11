import React, { useContext, useEffect, useState } from "react";
import ProductContext from "../../context/Product/ProductContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Items = () => {
  const [products, setProducts] = useState([]);
  const productContext = useContext(ProductContext);
  useEffect(() => {
    productContext.loadProducts();
    setProducts(JSON.parse(localStorage.products));
    console.log(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1204,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div style={{ margin: "20px 40px" }}>
      <div className="showcase">
        <div className="container">
          <h2 className="heading-primary">
            <span>KURTHA</span>
          </h2>
        </div>
      </div>
      <div className="sliders">
        <Slider {...settings}>
          {products &&
            products.map((product, i) => {
              return (
                <div key={i}>
                  <Link to={`/product/${product._id}`}>
                    <img
                      className="product-img"
                      src={`/uploads/${product.photo}`}
                      height="340px"
                      alt=""
                    ></img>
                  </Link>
                  <p className="product-name">{product.name}</p>
                  {!product.discount && <p>¥{product.price}</p>}
                  <div className="product-prices">
                    {product.finalPrice && (
                      <p className="final-price">
                        <strong>¥{product.finalPrice}</strong>
                      </p>
                    )}{" "}
                    {product.discount && (
                      <p className="product-initial-price">¥{product.price}</p>
                    )}
                    {product.discount && (
                      <p>
                        (<strong>{product.discount}%</strong> off)
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
      <div className="products-md">
        {products &&
          products.map((product, i) => {
            return (
              <Card className="my-3" key={i}>
                <div className="products-box">
                  <Link to={`/product/${product._id}`}>
                    <Card.Img
                      className="product-img2"
                      src={`/uploads/${product.photo}`}
                      alt=""
                    ></Card.Img>
                  </Link>
                  <div className="product-price">
                    <div className="product-name">{product.name}</div>
                    {!product.discount && <p>¥{product.price}</p>}
                    <div className="product-prices-details">
                      {product.finalPrice && (
                        <Card.Text className="final-price">
                          <strong>¥{product.finalPrice}</strong>
                        </Card.Text>
                      )}{" "}
                      {product.discount && (
                        <p className="product-initial-price">
                          ¥{product.price}
                        </p>
                      )}
                      {product.discount && (
                        <p className="discount">
                          (<strong>{product.discount}%</strong> off)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Items;
