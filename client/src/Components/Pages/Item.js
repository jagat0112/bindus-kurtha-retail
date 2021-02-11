import React, { useContext, useEffect } from "react";
import ProductContext from "../context/Product/ProductContext";
import Review from "./Review/Review";
import { useParams } from "react-router";

const Item = () => {
  const productContext = useContext(ProductContext);
  let { id } = useParams();
  useEffect(() => {
    productContext.loadProduct(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const product = productContext.product;

  return (
    productContext.product && (
      <div className="main">
        <div className="item-img">
          <img src={`/uploads/${product.photo}`} alt="" height="900px" />
        </div>
        <div className="item-detail">
          <p className="item-name">{product.name}</p>
          <p className="item-desc">{product.description}</p>
          <p className="item-code">
            <strong>PRODUCT CODE:</strong> {product._id.toUpperCase()}
          </p>
          <div className="item-price-wrapper">
            <p className="mrp">MRP</p>
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
            {product.size.map((siz, i) => {
              return (
                <div key={i} className="numberCircle">
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
