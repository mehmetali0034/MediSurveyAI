import axios from "axios";

export default class TenantService{
    tenantRegister(tenantData){
        return axios.post("http://localhost:3000/api/auth/tenant/register",tenantData)
    }
    tenantLogin(tenantData){
        return axios.post("http://localhost:3000/api/auth/tenant/login",tenantData)
    }
}