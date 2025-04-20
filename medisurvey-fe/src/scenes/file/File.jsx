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
          subtitle={`Display File Detail`}
        />
       
      </Box>
    </Box>
  );
}
