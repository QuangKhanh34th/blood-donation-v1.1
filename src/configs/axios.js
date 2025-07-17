import axios from "axios";

const api = axios.create({
  baseURL: "https://ougon-no-chi-abbd71acd669.herokuapp.com/api/",
});

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    console.log("Token gửi đi:", token);
    if (
      token &&
      !config.url.includes("login") &&
      !config.url.includes("register")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
