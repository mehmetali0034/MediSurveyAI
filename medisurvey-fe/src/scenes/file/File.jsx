import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { useParams } from "react-router-dom";
import FileService from "../../services/doctorServices/FileService";
import { Box, Button, TextField, Typography } from "@mui/material";
import Headeer from "../../components/Headeer";

export default function File() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const fileService = new FileService();
  const [fileInfo, setFileInfo] = useState([]);
  const [forPatient, setForPatient] = useState("");
  

  useEffect(() => {
    const fetchFileInfo = async () => {
      try {
        const response = await fileService.getFileInfo(id);
        setFileInfo(response);
        console.log("fileInfo", response);
      } catch (e) {
        console.log("Sorun oluştu.fetchFileInfo");
      }
    };
    fetchFileInfo();
  }, []);
  const clickToForDoctor =()=>{
    setForPatient("0")
    console.log(forPatient)
  }
  const clickToForPatient =()=>{
    setForPatient("1")
    console.log(forPatient)
  }
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt:2
        }}
      >
        <Headeer
          title="File Detail"
          subtitle={`Add Form at ${fileInfo.name}`}
        />
        <Box sx={{alignItems:"center"}}>
          <Button sx={{backgroundColor:colors.blueAccent[400],mr:2}} onClick={clickToForDoctor} variant="contained">
            Add Form to Doctor
          </Button>
          <Button  sx={{backgroundColor:colors.blueAccent[400],mr:2}} onClick={clickToForPatient}  variant="contained">
            Add Form to Patient
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
