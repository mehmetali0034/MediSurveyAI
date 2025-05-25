import axios from "axios";

export default class TenantService {
  tenantRegister(tenantData) {
    return axios.post(
      "http://localhost:3000/api/auth/tenant/register",
      tenantData
    );
  }
  tenantLogin(tenantData) {
    return axios.post(
      "http://localhost:3000/api/auth/tenant/login",
      tenantData
    );
  }
  doctorRegister(doctorData, token) {
    return axios.post(
      "http://localhost:3000/api/auth/tenant/register-doctor",
      doctorData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token'ı Authorization header'ında gönderiyoruz
        },
      }
    );
  }
  getAllDoctor = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/doctors/tenant/all",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer token'ı Authorization header'ında gönderiyoruz
          },
        }
      );
      return response.data; // Veriyi döndürüyoruz
    } catch (error) {
      console.error("Doktorları çekerken hata oluştu:", error);
      throw error; // Hata fırlatarak çağıran fonksiyonun yakalamasını sağlıyoruz
    }
  };
  getTenantInfo = async (tenantId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/tenants/${tenantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // token doğru şekilde header'a eklenmeli
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Bilgiler yüklenirken bir hata oluştu.");
      throw error;
    }
  };
  updateTenant = async (data, tenantId, token) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/tenants/${tenantId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Bilgi değiştirme işlemi yapılırken bir hata oluştu.");
      throw error;
    }
  };
  getAllPatients = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/patients/tenant/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error");
    }
  };
  getDoctorInfo = async (doctorID, token) => {
    debugger;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/doctors/tenant/${doctorID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Sorun oluştu (getDoctorInfo)");
    }
  };
  getPatinetInfo = async (patientID,token)=>{
    try{
      const response = await axios.get(`http://localhost:3000/api/patients/tenant/`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      return response.data
    }catch(error){
      console.log("Sorun oluştu")
    }
  }
  deleteDoctor = async (data,token)=>{
    try{
      const response = await axios.delete( `http://localhost:3000/api/doctors/tenant/${data}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

    }catch(error){

    }
  }
}
