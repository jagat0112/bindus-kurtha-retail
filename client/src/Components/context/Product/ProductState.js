import React, { useReducer } from "react";
import ProductReducer from "./ProductReducer";
import ProductContext from "./ProductContext";
import axios from "axios";
import {
  LOAD_PRODUCTS,
  LOAD_PRODUCT,
  UPDATE_PRODUCT,
  SHOW_CART,
  SHOW_EDIT,
  SET_LOADINGS,
} from "../type";

const ProductState = (props) => {
  const initialState = {
    products: null,
    product: null,
    loadings: false,
    showEdit: false,
    count: null,
    cart: null,
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  // Load Products
  const loadProducts = async () => {
    const res = await axios.get("/api/v1/clothings");
    console.log(res);
    dispatch({ type: LOAD_PRODUCTS, payload: res.data });
  };

  // SHow Product Edit Menu
  const showEdits = async () => {
    dispatch({ type: SHOW_EDIT });
  };

  // Load a single Product
  const loadProduct = async (id) => {
    setLoadings();
    const res = await axios.get(`/api/v1/clothings/${id}`);
    dispatch({ type: LOAD_PRODUCT, payload: res.data.data });
  };

  // Update a Product
  const updateProduct = async (data, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(`/api/v1/clothings/${id}`, data, config);
    dispatch({ type: UPDATE_PRODUCT });
    loadProducts();
  };

  const addReview = async (form, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post(`/api/v1/clothings/${id}/review`, form, config);
    loadProduct(id);
  };

  const updateReview = async (form, id, productId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(`/api/v1/reviews/${id}`, form, config);
    loadProduct(productId);
  };

  const deleteReview = async (id) => {
    await axios.delete(`/api/v1/reviews/${id}`);
  };
  // Set Loading
  const setLoadings = (boo) => {
    dispatch({ type: SET_LOADINGS, payload: boo });
  };

  // Cart State
  const showCart = async (id) => {
    const cart = await axios.get(`/api/v1/auth/${id}/cart`);
    console.log(cart);
    dispatch({ type: SHOW_CART, payload: cart.data });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        product: state.product,
        loadings: state.loadings,
        showEdit: state.showEdit,
        count: state.count,
        cart: state.cart,
        loadProducts,
        loadProduct,
        updateProduct,
        showEdits,
        addReview,
        setLoadings,
        updateReview,
        deleteReview,
        showCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
