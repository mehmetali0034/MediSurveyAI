import axios from "axios";
import axiosInstance from "../../scenes/utils/axiosInstance";

export default class PatientService {
  addPatient(patientData, token) {
    return axios.post("http://localhost:3000/api/patients/add", patientData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllPatients = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/api/patients/all"
      );
      return response.data;
    } catch (error) {
      console.log("Tüm hasta bilgilerni getirirken bir hata oluştu.");
    }
  };
  getPatientInfo = async (data) =>{
    try{
        const response = await axiosInstance.get(`http://localhost:3000/api/patients/${data}`)
        return response.data
    }catch(error){
        console.log("Bir sorun oluştu:", error.response?.data || error.message)
        throw error;
    }
  }
}
