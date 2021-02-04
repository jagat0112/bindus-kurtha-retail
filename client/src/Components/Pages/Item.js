import React, { useContext, useEffect } from "react";
import ProductContext from "../context/Product/ProductContext";
import Review from "./Review/Review";
import { useParams } from "react-router";

const Item = () => {
  const productContext = useContext(ProductContext);
  let { id } = useParams();
  useEffect(() => {
    productContext.loadProduct(id);
  }, []);
  const product = productContext.product;

  return (
    productContext.product && (
      <div className="main">
        <div className="item-img">
          <img
            src={`http://localhost:5000/uploads/${product.photo}`}
            alt=""
            height="900px"
          />
        </div>
        <div className="item-detail">
          <p className="item-name">{product.name}</p>
          <p className="item-desc">{product.description}</p>
          <p className="item-code">
            <strong>PRODUCT CODE:</strong> {product._id.toUpperCase()}
          </p>
          <div className="item-price">
            <p className="mrp">MRP</p>
            <br />
            <div className="item-price">
              {product.discount ? (
                <p className="item-total-price">JPY {product.price}</p>
              ) : (
                <p>JPY {product.price}</p>
              )}
              <p className="item-selling-price">JPY {product.finalPrice}</p>
              {product.discount && (
                <p className="item-discount">( {product.discount}% OFF)</p>
              )}
            </div>
          </div>
          <p>
            <strong>SIZE</strong>
          </p>
          <div className="item-sizes">
            {product.size.map((siz) => {
              return (
                <div key={siz} className="numberCircle">
                  {siz}
                </div>
              );
            })}
          </div>
          <button className="cart-btn">Add to the Cart</button>
          <Review id={id} />
        </div>
      </div>
    )
  );
};

export default Item;
