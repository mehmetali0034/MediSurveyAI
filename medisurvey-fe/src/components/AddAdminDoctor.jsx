import { useTheme } from "@emotion/react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../theme";
import TenantService from "../services/tenantService";

export default function AddAdminDoctor(props) {
  const { openDialog, setOpenDialog } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const refreshFields =()=>{
    setName("")
    setEmail("")
    setSurname("")
    setEmail("")
    setPassword("")
    setConfirm_password("")
    setSpecialization("")
    setPhone_number("")
    setOpenSnackBar("")
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
    refreshFields();
  };
  const tenantService = new TenantService();
  
  const handleCloseSnackBar =()=>{
    setOpenSnackBar(false)
  }
  const handleAddDoctor = () => {
    // localStorage'dan token'ı aldım
    const token = localStorage.getItem("tokenTenant");

    // Eğer token yoksa, bir hata mesajı gösterebiliriz
    if (!token) {
      alert("Authentication token not found. Please log in again.");
      return;
    }

    tenantService
      .doctorRegister(
        {
          name: name,
          surname: surname,
          email: email,
          password: password,
          confirm_password: confirm_password,
          specialization: specialization,
          phone_number: phone_number,
        },
        token
      ) // Token'ı gönderiyoruz
      .then((response) => {
        setOpenSnackBar(true);debugger;
        console.log("Doctor successfully registered:", response.data);
        setOpenDialog(false);
        refreshFields();
      })
      .catch((error) => {
        console.error(
          "Error registering doctor:",
          error.response?.data || error.message
        );
        alert(
          `Error: ${
            error.response?.data?.message || "Failed to register doctor"
          }`
        );
      });
  };



  return (
    <Box>
    <Dialog
      maxWidth="lg" // Büyük genişlik seçeneği (sm, md, lg, xl seçenekleri mevcut)
      sx={{
        "& .MuiDialog-paper": {
          width: "50%", // Dialog genişliğini %80 olarak ayarlar
          maxWidth: "1000px", // Maksimum genişlik piksel olarak tanımlanabilir
          backgroundColor: colors.primary[700],
          alignItems: "center",
        },
      }}
      open={openDialog}
      onClose={handleCloseDialog}
    >
      <DialogTitle variant="h3">Add a New Doctor</DialogTitle>
      <DialogContent sx={{ width: "80%" }}>
        {/* Form Alanları */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white", // Arka plan beyaz
                color: "black", // Yazı rengi siyah
              },
              "& .MuiInputLabel-root": {
                color: "black", // Label yazı rengi siyah
              },
            }}
          />
          <TextField
            label="Surname"
            variant="outlined"
            fullWidth
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                color: "black",
              },
              "& .MuiInputLabel-root": {
                color: "black",
              },
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                color: "black",
              },
              "& .MuiInputLabel-root": {
                color: "black",
              },
            }}
          />
          <TextField
            label="Specialization"
            variant="outlined"
            fullWidth
            value={specialization}
            onChange={(e) => {
              setSpecialization(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                color: "black",
              },
              "& .MuiInputLabel-root": {
                color: "black",
              },
            }}
          />
          <TextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            value={phone_number}
            onChange={(e) => {
              setPhone_number(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                color: "black",
              },
              "& .MuiInputLabel-root": {
                color: "black",
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                color: "black",
              },
              "& .MuiInputLabel-root": {
                color: "black",
              },
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            value={confirm_password}
            onChange={(e) => {
              setConfirm_password(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                color: "black",
              },
              "& .MuiInputLabel-root": {
                color: "black",
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        {/* Kaydet ve İptal Butonları */}
        <Button
          onClick={handleCloseDialog}
          sx={{ backgroundColor: colors.redAccent[600] }}
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.greenAccent[600] }}
          onClick={() => {
            handleAddDoctor();
          }}
        >
          Save
        </Button>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="success"
            variant="filled"
            sx={{ width: "100%", fontSize: "0.8rem" }}
          >
            <Typography variant="h4" color="white">
              Doctor Added Successful!
            </Typography>
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
    </Box>
  );
}
