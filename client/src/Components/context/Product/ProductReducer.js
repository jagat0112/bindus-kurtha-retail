import {
  LOAD_PRODUCTS,
  LOAD_PRODUCT,
  UPDATE_PRODUCT,
  SHOW_EDIT,
  SET_LOADINGS,
  SHOW_CART,
} from "../type";

const ProductReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      localStorage.setItem('products',JSON.stringify(action.payload.data))
      return {
        ...state,
        products: action.payload.data,
        loadings: false,
        count: action.payload.count,
      };
    case LOAD_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loadings: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        showEdit: false,
      };
    case SHOW_EDIT:
      return {
        ...state,
        showEdit: action.payload,
      };
    case SET_LOADINGS:
      return {
        ...state,
        loadings: true,
      };
    case SHOW_CART:
      return {
        ...state,
        cart: action.payload.cart,
      };
    default:
      return state;
  }
};

export default ProductReducer;
