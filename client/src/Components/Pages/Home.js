import React, { useEffect, useContext } from "react";
import Hero from "./Homepage/Hero";
import Showcase from "./Homepage/Showcase";
import Items from "./Homepage/Items";

import AuthContext from "../context/Auth/AuthContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.getMe();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {/* <img width="1500" src={Hero} alt=""></img>
      <div className="flex-container">
        {products.data &&
          products.data.map((product) => {
            return (
              product.publish && (
                <div key={product._id} className="item">
                  <Link
                    to={`/product/${product._id}`}
                    style={{
                      fontWeight: "bold",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <img
                      className="item-image"
                      src={`http://localhost:5000/uploads/${product.photo}`}
                      alt=""
                    />
                  </Link>
                  <p>{product.name}</p>
                  {!product.discount && <p>¥{product.price}</p>}
                  {product.discount && (
                    <p style={{ textDecoration: "line-through" }}>
                      ¥{product.price}
                    </p>
                  )}
                  {product.discount && <p>{product.discount}% off</p>}
                  {product.finalPrice && <p>¥{product.finalPrice}</p>}
                </div>
              )
            );
          })}
      </div> */}
      <Hero />
      <Showcase />
      <Items />
    </div>
  );
};

export default Home;
