import React, { useReducer } from "react";
import authReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import axios from "axios";
import {
  LOG_IN,
  LOGIN_FAIL,
  SET_LOADING,
  LOG_OUT,
  SET_ALERT,
  LOAD_USER,
  GET_ME,
  REGISTER,
} from "../type";

const AuthState = (props) => {
  const initialState = {
    token: null,
    isAuth: false,
    loading: false,
    error: null,
    role: null,
    me: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    const res = await axios.get("/api/v1/auth/me");
    dispatch({ type: LOAD_USER, payload: res.data });
  };

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });
  const setAlert = () => dispatch({ type: SET_ALERT });

  //   Login
  const login = async (formData) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/v1/auth/login", formData, config);
      dispatch({ type: LOG_IN, payload: res.data });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });

      setTimeout(function () {
        setAlert();
      }, 3000);
    }
  };

  const getMe = async () => {
    const me = await axios.get("/api/v1/auth/me");
    dispatch({ type: GET_ME, payload: me.data.data });
  };

  // Log out
  const logout = () => {
    dispatch({ type: LOG_OUT });
  };

  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const newUser = await axios.post(
        "/api/v1/auth/register",
        formData,
        config
      );
      dispatch({ type: REGISTER, payload: newUser.data });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuth: state.isAuth,
        loading: state.loading,
        error: state.error,
        role: state.role,
        me: state.me,
        login,
        register,
        setLoading,
        logout,
        getMe,
        setAlert,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
