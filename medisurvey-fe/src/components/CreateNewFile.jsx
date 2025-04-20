import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../theme";
import FileService from "../services/doctorServices/FileService";

export default function CreateNewFile(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fileService = new FileService();
  const { openDialog, setOpenDialog, handleClose } = props;
  const [name, setName] = useState("");debugger;
  

  
  const handleClick = async() => {
    const data = {
      "name":name
    }
    try{
      const response = await fileService.createFile(data);
      console.log(response)
      setName("")
      setOpenDialog(false)
    }catch(error){
      console.log("Bir hata oluştu.")
    }
   
  };

  return (
    <Box>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: colors.grey[500] }}>
          Create New File
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            <TextField
              variant="filled"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button
              type="submit"
              sx={{ marginRight: 0, mt: 2 }}
              variant="contained"
              color="secondary"
              onClick={handleClick}
            >
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
