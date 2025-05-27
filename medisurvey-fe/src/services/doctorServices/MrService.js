import axiosInstance from "../../scenes/utils/axiosInstance";

export default class MrService {
  addMr = async (data) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/api/mr/upload",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Bir sorun oluştu:", error.response?.data || error.message);
      throw error;
    }
  };
  getPatientMr = async (patientId) => {
    try {
      const response = await axiosInstance(
        `http://localhost:3000/api/mr/patient/${patientId}`
      );
      return response.data;
    } catch (error) {
      console.error("Bir sorun oluştu:", error.response?.data || error.message);
      throw error;
    }
  };
  segmentMerged = async (mrID)=>{
    try{
      const response = await axiosInstance.post(`http://localhost:3000/api/mr/${mrID}/analyze?segmentType=merged`);
      return response.data
    } catch (error) {
      console.error("Bir sorun oluştu:", error.response?.data || error.message);
      throw error;
    }
  }
  
  segmentFemur = async (mrID)=>{
    try{
      const response = await axiosInstance.post(`http://localhost:3000/api/mr/${mrID}/analyze?segmentType=femur`);
      return response.data
    } catch (error) {
      console.error("Bir sorun oluştu:", error.response?.data || error.message);
      throw error;
    }
  }

  segmentFibula = async (mrID)=>{
    try{
      const response = await axiosInstance.post(`http://localhost:3000/api/mr/${mrID}/analyze?segmentType=fibula`);
      return response.data
    } catch (error) {
      console.error("Bir sorun oluştu:", error.response?.data || error.message);
      throw error;
    }
  }

  segmentTibia = async (mrID)=>{
    try{
      const response = await axiosInstance.post(`http://localhost:3000/api/mr/${mrID}/analyze?segmentType=tibia`);
      return response.data
    } catch (error) {
      console.error("Bir sorun oluştu:", error.response?.data || error.message);
      throw error;
    }
  }
}
