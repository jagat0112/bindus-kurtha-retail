import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";
import ProductContext from "../../context/Product/ProductContext";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { id } = useParams();
  const productContext = useContext(ProductContext);
  useEffect(() => {
    productContext.showCart(id);
    setCart(productContext.cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="cart">
      <div>
        <p>Item</p>
        {cart &&
          cart.map((item) => {
            return (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ margin: "0 20px" }}>{item.product.name}</div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {item.product.discount && (
                    <p className="price">¥{item.product.price}</p>
                  )}
                  {item.product.discount && <p>{item.product.discount}% OFF</p>}
                  <p>¥{item.product.finalPrice || item.product.price}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div>Order Summary</div>
    </div>
  );
};

export default Cart;
