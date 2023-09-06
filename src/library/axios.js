import axios from "axios";
import router from "@/router";

// axios.defaults.baseURL = "http://192.168.1.200/app";
axios.defaults.baseURL = "https://national-hospital.uz/app";
// axios.defaults.baseURL = "http://178.218.207.110:1515";
// axios.defaults.baseURL = "http://172.30.2.4:1515";
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;
axios.defaults.timeout = 30000;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      localStorage.removeItem("access_token");
      router.push("/auth/login");
    }
    if (error.response.status == 404) {
      router.push("/pages/notfound");
    }
    return error;
  }
);

export default axios;
