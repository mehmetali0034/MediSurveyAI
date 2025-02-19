import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Axios default ayarları
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // İstek öncesi veriyi düzenle
    if (config.data) {
      // Veriyi string'e çevir ve tekrar parse et
      config.data = JSON.parse(JSON.stringify(config.data));
    }
    
    console.log('İstek gönderiliyor:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  error => {
    console.error('İstek hatası:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    console.log('Yanıt alındı:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('Yanıt hatası:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

class AuthService {
  // Kurumsal (Tenant) Kayıt
  async tenantRegister(tenantData) {
    try {
      // Model yapısına uygun veri formatı
      const formattedData = {
        name: tenantData.name || "",
        address: tenantData.address || "",
        phone_number: tenantData.phone_number || "",
        email: tenantData.email || "",
        plan_type: tenantData.plan_type || "basic",
        password: tenantData.password || "",
        password_confirmation: tenantData.password_confirmation || "",
        active: true
      };

      console.log('Tenant kayıt isteği:', formattedData);
      const response = await axiosInstance.post('/auth/tenant/register', formattedData);
      console.log('Tenant kayıt yanıtı:', response.data);
      return response.data;
    } catch (error) {
      console.error('Tenant kayıt hatası:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  }

  // Kurumsal (Tenant) Giriş
  async tenantLogin(credentials) {
    try {
      // Telefon numarasından boşlukları ve özel karakterleri temizle
      const formattedPhoneNumber = credentials.phone_number.replace(/\s+/g, '').replace(/[^0-9]/g, '');
      
      const formattedData = {
        phone_number: formattedPhoneNumber,
        password: credentials.password || ""
      };

      console.log('Tenant giriş isteği:', formattedData);
      const response = await axiosInstance.post('/auth/tenant/login', formattedData);
      console.log('Tenant giriş yanıtı:', response.data);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", "tenant");
        localStorage.setItem("user", JSON.stringify(response.data.tenant));
      }
      return response.data;
    } catch (error) {
      console.error('Tenant giriş hatası:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  }

  // Bireysel (Doktor) Girişi
  async doctorLogin(credentials) {
    try {
      const formattedData = {
        email: credentials.email || "",
        password: credentials.password || ""
      };

      console.log('Doktor giriş isteği:', formattedData);
      const response = await axiosInstance.post('/auth/login-doctor', formattedData);
      console.log('Doktor giriş yanıtı:', response.data);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", "doctor");
        localStorage.setItem("user", JSON.stringify(response.data.doctor));
      }
      return response.data;
    } catch (error) {
      console.error('Doktor giriş hatası:', error.response?.data || error);
      throw error;
    }
  }

  // Çıkış Yap
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("user");
  }

  // Token'ı al
  getToken() {
    return localStorage.getItem("token");
  }

  // Kullanıcı tipini al (doctor veya tenant)
  getUserType() {
    return localStorage.getItem("userType");
  }

  // Kullanıcı bilgilerini al
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  // Kullanıcının giriş yapmış olup olmadığını kontrol et
  isAuthenticated() {
    return this.getToken() !== null;
  }
}

export default new AuthService(); 