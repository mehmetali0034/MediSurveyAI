import React, { useEffect, useState } from "react";
import TopbarOfTenant from "../tenant-global/TopbarTenant";
import { Box, Typography, TextField, useTheme, Button, Dialog, DialogTitle } from "@mui/material";
import TenantService from "../../services/tenantService";
import { tokens } from "../../theme";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EditTenantInfo from "../../components/EditTenantInfo";

export default function TenantProfile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tenantInfo, setTenantInfo] = useState({});
  const tenantService = new TenantService();
  const tenantId = localStorage.getItem("tenantId");
  const token = localStorage.getItem("tokenTenant");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);
  const [currentPassValue, setCurrentPassValue] = useState("");
  const [newPassValue, setNewPassValue] = useState("");
  const [confirmPassValue, setConfirmPassValue] = useState("");

  useEffect(() => {
    tenantService
      .getTenantInfo(tenantId, token)
      .then((data) => {
        setTenantInfo(data);
      })
      .catch((error) => {
        console.error("Doktor bilgileri çekilirken hata oluştu", error);
      });
  }, [tenantInfo]);

  const clickToEdit = () => {
    setIsEditing(true);
  };

  const changeEditState = (data) => {
    setIsEditing(data);
  };

  const handleCloseDialog = () => {
    setIsChangePass(false);
    setCurrentPassValue("")
    setNewPassValue("")
    setConfirmPassValue("")
  };

  const handleSavePassword = async () => {
    if (newPassValue === confirmPassValue) {
      const data = {
        oldPassword: currentPassValue,
        newPassword: newPassValue,
        confirmNewPassword: confirmPassValue,
      };

      try {
        await tenantService.updateTenant(data, tenantId, token);
        setIsChangePass(false); // Close the dialog on successful password change
      } catch (error) {
        console.error("Password update failed", error);
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <TopbarOfTenant />
      <Box
        sx={{
          width: "50%",
          backgroundColor: colors.grey[100],
          boxShadow: 3,
          borderRadius: 2,
          mt: 1,
          ml: 2,
          p: 2,
        }}
      >
        <Typography
          color={"black"}
          variant="h3"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
            color: "black",
            mb: 2,
          }}
        >
          <ContactPhoneIcon sx={{ mr: 1, color: colors.blueAccent[800] }} /> Account Information
        </Typography>
        {isEditing ? (
          <EditTenantInfo changeEditState={changeEditState} />
        ) : (
          <Box sx={{ display: "flex", mt: 2, flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="body1" sx={{ mr: 2, color: "black",width: "13%" }}>
                Institution Name:
              </Typography>
              <TextField
                sx={{
                  width: "80%",
                  backgroundColor: "white",
                  borderRadius: 3,
                  "& .MuiInputBase-input": {
                    color: "black",
                  },
                  "& .Mui-disabled": {
                    "-webkit-text-fill-color": "black !important",
                    opacity: 1,
                  },
                }}
                variant="outlined"
                size="small"
                value={tenantInfo.name || ""}
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="body1" sx={{ mr: 2, color: "black", width: "13%" }}>
                Email:
              </Typography>
              <TextField
                sx={{
                  width: "80%",
                  backgroundColor: "white",
                  borderRadius: 3,
                  "& .MuiInputBase-input": {
                    color: "black",
                  },
                  "& .Mui-disabled": {
                    "-webkit-text-fill-color": "black !important",
                    opacity: 1,
                  },
                }}
                variant="outlined"
                size="small"
                value={tenantInfo.email || ""}
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="body1" sx={{ mr: 2, color: "black", width: "13%" }}>
                Phone Number:
              </Typography>
              <TextField
                sx={{
                  width: "80%",
                  backgroundColor: "white",
                  borderRadius: 3,
                  "& .MuiInputBase-input": {
                    color: "black",
                  },
                  "& .Mui-disabled": {
                    "-webkit-text-fill-color": "black !important",
                    opacity: 1,
                  },
                }}
                variant="outlined"
                size="small"
                value={tenantInfo.phone_number || ""}
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="body1" sx={{ mr: 2, color: "black", width: "13%" }}>
                Plan Type:
              </Typography>
              <TextField
                sx={{
                  width: "80%",
                  backgroundColor: "white",
                  borderRadius: 3,
                  "& .MuiInputBase-input": {
                    color: "black",
                  },
                  "& .Mui-disabled": {
                    "-webkit-text-fill-color": "black !important",
                    opacity: 1,
                  },
                }}
                variant="outlined"
                size="small"
                value={tenantInfo.plan_type || ""}
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="body1" sx={{ mr: 2, color: "black", width: "13%" }}>
                Password:
              </Typography>
              <TextField
                sx={{
                  width: "80%",
                  backgroundColor: "white",
                  borderRadius: 3,
                  "& .MuiInputBase-input": {
                    color: "black",
                  },
                  "& .Mui-disabled": {
                    "-webkit-text-fill-color": "black !important",
                    opacity: 1,
                  },
                }}
                type="password"
                variant="outlined"
                size="small"
                value={tenantInfo.plan_type || ""}
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Box sx={{ ml: 17 }}>
                <Button
                  variant="contained"
                  sx={{ mr: 1, backgroundColor: colors.blueAccent[800] }}
                  onClick={clickToEdit}
                >
                  Edit Information
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setIsChangePass(true)}
                  sx={{ backgroundColor: colors.blueAccent[800] }}
                >
                  Change Password
                </Button>
              </Box>
            </Box>
            <Dialog 
            open={isChangePass} onClose={handleCloseDialog}
            sx={{
              "& .MuiDialog-paper": {
                backgroundColor: colors.grey[200], // Burada istediğiniz arka plan rengini ayarlayın
              },
            }}>
              <DialogTitle sx={{fontWeight:800,color:"black"}}>Change Password</DialogTitle>
              <Box sx={{ display: "flex", flexDirection: "column", p: 4,pt:1 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{color:"black"}} variant="body1">Current Password:</Typography>
                  <TextField
                    type="password"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={currentPassValue}
                    onChange={(e) => setCurrentPassValue(e.target.value)}
                    sx={{backgroundColor: "white",
                      borderRadius: 3,
                      "& .MuiInputBase-input": {
                        color: "black",
                      },
                      "& .Mui-disabled": {
                        "-webkit-text-fill-color": "black !important",
                        opacity: 1,
                      },}}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{color:"black"}} variant="body1">New Password:</Typography>
                  <TextField
                    type="password"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={newPassValue}
                    onChange={(e) => setNewPassValue(e.target.value)}
                    sx={{backgroundColor: "white",
                      borderRadius: 3,
                      "& .MuiInputBase-input": {
                        color: "black",
                      },
                      "& .Mui-disabled": {
                        "-webkit-text-fill-color": "black !important",
                        opacity: 1,
                      },}}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{color:"black"}} variant="body1">Confirm Password:</Typography>
                  <TextField
                    type="password"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={confirmPassValue}
                    onChange={(e) => setConfirmPassValue(e.target.value)}
                    sx={{backgroundColor: "white",
                      borderRadius: 3,
                      "& .MuiInputBase-input": {
                        color: "black",
                      },
                      "& .Mui-disabled": {
                        "-webkit-text-fill-color": "black !important",
                        opacity: 1,
                      },}}
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: colors.blueAccent[800] }}
                  onClick={handleSavePassword}
                >
                  Save
                </Button>
              </Box>
            </Dialog>
          </Box>
        )}
      </Box>
    </Box>
  );
}
