import axios from "axios";
export default class PatientService {
  addPatient(patientData, token) {
    return axios.post(
      "http://localhost:3000/api/patients/add-patient",
      patientData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
