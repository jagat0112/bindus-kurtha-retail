import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import ProductContext from "../../context/Product/ProductContext";

import { Link } from "react-router-dom";

const Admin = () => {
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  useEffect(() => {
    authContext.loadUser();
    productContext.loadProducts();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container py-5">
      <p className="admin-dashboard-text">Admin Dashboard</p>
      {authContext.role !== "admin" ? (
        <div>Only Authorize for Admin</div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex" }}>
            <Link
              to={"/admin/edit-products"}
              className="admin-db-btn admin-db-btn-edit"
            >
              Edit Products
            </Link>
          </div>
          <Link
            to={"/admin/add-product"}
            className="admin-db-btn admin-db-btn-add"
          >
            Add Product
          </Link>
          <p className="admin-db-btn admin-db-btn-count">
            No of Items {productContext.count}
          </p>
        </div>
      )}
    </div>
  );
};

export default Admin;
