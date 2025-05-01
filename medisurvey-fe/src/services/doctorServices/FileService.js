import axios from "axios";
import axiosInstance from "../../scenes/utils/axiosInstance";
export default class FileService {
 createFile = async (data) =>{
    try{
        const response = await axiosInstance.post("http://localhost:3000/api/files",data);debugger;
        return response.data ;
    }
    catch(error){
        console.log("Bir hata oluştu.createFile")
    }
 }
 getAllFiles = async ()=>{
    try{
        const response = await axiosInstance.get("http://localhost:3000/api/files")
    return response.data
    }catch(error){
        console.log("Bir hata oluştu.getAllFiles")
    }
 }
 getFileInfo = async (fileID)=>{
    try{
        const response = await axiosInstance.get( `http://localhost:3000/api/files/${fileID}`)
        return response.data;
    }catch(error){
        console.log("Bir sorun oluştu.getFileInfo")
    }  
 }
 deleteFile = async (fileId)=>{
    try{
        const response = await axiosInstance.delete(`http://localhost:3000/api/files/${fileId}`);
        return response.data
    }catch (error) {
        console.error("Bir sorun oluştu:", error.response?.data || error.message);
        throw error;
    }

 }
}