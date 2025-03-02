import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Request Interceptor: Tüm isteklerde token'ı otomatik ekler
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); //LocalStorage'den toke'ı aldık.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Token süresi dolarsa kullanıcıyı çıkış yaptırabiliriz
axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/individual-login"; 
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;