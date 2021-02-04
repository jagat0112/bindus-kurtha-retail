import axios from "axios";

const setAuthToken = (accessToken) => {
  axios.interceptors.request.use(
    function (config) {
      config.headers.authorization = `Bearer ${accessToken}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
};

export default setAuthToken;
