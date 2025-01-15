import axios from "axios";
export default class DoctorService{
    doctorRegister(doctorData,token){
        return axios.post("http://localhost:3000/api/auth/tenant/register-doctor",doctorData,
            {
                headers: {
                  Authorization: `Bearer ${token}`, // Bearer token'ı Authorization header'ında gönderiyoruz
                },
              }
        )
    }

}