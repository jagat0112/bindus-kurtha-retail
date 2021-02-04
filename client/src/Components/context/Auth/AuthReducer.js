import {
  LOG_IN,
  LOGIN_FAIL,
  LOG_OUT,
  LOAD_USER,
  SET_ALERT,
  GET_ME,
  REGISTER,
} from "../type";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOG_IN:
      localStorage.setItem("token", action.payload.token);

      return {
        isAuth: true,
        token: action.payload.token,
        loading: false,
        role: action.payload.role,
      };
    case LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        isAuth: false,
        loading: false,
        error: null,
        role: null,
      };
    case SET_ALERT:
      return {
        error: null,
      };
    case LOAD_USER:
      return {
        ...state,
        role: action.payload.data.role,
        isAuth: true,
      };
    case GET_ME:
      return {
        ...state,
        isAuth: true,
        me: action.payload,
      };

    case REGISTER:
      localStorage.setItem("token", action.payload.token);

      return {
        isAuth: true,
        token: action.payload.token,
        loading: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
