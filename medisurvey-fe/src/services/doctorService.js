import axios from "axios";
import axiosInstance from "../scenes/utils/axiosInstance";
export default class DoctorService {
  doctorLogin(doctorData) {
    return axios.post(
      "http://localhost:3000/api/auth/login-doctor",
      doctorData
    );
  }
  getDoctorInfo = async () => {
    const doctorId = localStorage.getItem("doctorId"); //LocalStorage'dan doctorId'yi getirdim.

    try {
      const response = await axiosInstance.get(
        `http://localhost:3000/api/doctors/${doctorId}` 
      ); debugger ;
      return response.data ; 
    } catch (error) {
      console.error("Error fetching doctor info:", error.message);
      alert("Failed to fetch doctor info.");
      return null; 
    }
  };

  registerDoctor = async (data)=>{
    try{
      const response = await axiosInstance.post("http://localhost:3000/api/auth/admin/register-doctor",data);
      return response.data;
    }catch(error){
      console.log("Ekleme Sırasında Hata Meydana Geldi.")
      alert("Failed to fetch doctor info.");
      return null; 
    }
  }

  getAllDoctor = async ()=>{
    try{
      const response = await axiosInstance.get(`http://localhost:3000/api/doctors/all`)
      return response.data
    }catch(error){
      console.log("Bir sorun oluştu.")
    }
  }
  addDoctor = async (data)=>{
    try{
      const response = await axiosInstance.post("http://localhost:3000/api/auth/admin/register-doctor",data)
      return response.data
    }catch(error){
      console.log("Bir sorun oluştu.")
    }
  }
}
