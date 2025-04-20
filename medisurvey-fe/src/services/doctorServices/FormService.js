import axiosInstance from "../../scenes/utils/axiosInstance";

export default class FormService {
  createForm = async (data) => {
    try {
      const response = await axiosInstance.post("http://localhost:3000/api/forms", data);
      return response.data;
    } catch (error) {
      console.error("Bir sorun oluştu:", error.response?.data || error.message);
      throw error; // Yukarıda da try/catch varsa, orada yakalanır
    }
  };
}
