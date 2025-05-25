import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import PatientService from "../../services/doctorServices/patientService";
import Headeer from "../../components/Headeer";
import { DataGrid } from "@mui/x-data-grid";

export default function PatientProfile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const patientService = new PatientService();
  const [patientInfo, setPatientInfo] = useState([]);
  const [dialogState, setDialogState] = useState(false);
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await patientService.getPatientInfo(id);
        console.log("Hasta bilgileri başarıyla geldi: ", response);
        setPatientInfo(response);
      } catch (err) {
        console.error("Form oluşturulurken hata: ", err);
        alert("Form oluşturulurken bir hata oluştu!");
      }
    };
    fetchPatientInfo();
  }, []);

  const handleDeletePatient = async () => {
    try {
      const response = await patientService.deletePatient(id);
      console.log("Patient Deleted: ", response.data);
      navigate("/patients");
    } catch (error) {
      console.error("Hasta Silinirken hata oluştu: ", error);
    }
  };
  const columns = [
    {
      field: "name",
      headerName: "File Name",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      cellClassName: "name-column--cell",
      flex: 1,
      valueFormatter: (params) => {
        return params.value?.split("T")[0]; // "2025-05-13T14:34:13.071Z" → "2025-05-13"
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleRemoveFile(params.row.id)}
        >
          Remove Patient From File
        </Button>
      ),
    },
  ];

  const handleRemoveFile = async (fileIdToRemove) => {
  try {
    const currentFiles = patientInfo?.patient?.Files || [];
    const currentFileIds = patientInfo?.patient?.fileIds || [];

    const updatedFiles = currentFiles.filter(file => file.id !== fileIdToRemove);
    const updatedFileIds = currentFileIds.filter(id => id !== fileIdToRemove);

    const updatedPatientData = {
      ...patientInfo.patient,
      Files: updatedFiles,
      fileIds: updatedFileIds,
    };debugger

    await patientService.updatePatient(id, updatedPatientData);

    // Yeni veriyi setState ile direkt yerleştir
    setPatientInfo(prev => ({
      ...prev,
      patient: updatedPatientData,
    }));

    alert("Dosya başarıyla hastadan kaldırıldı.");
  } catch (error) {
    console.error("Dosya kaldırılırken hata oluştu:", error);
    alert("Dosya kaldırılırken bir hata oluştu.");
  }
};


  return (
    <Box>
      <Headeer
        title={"Patient Informaiton"}
        subtitle={"Display Patient Information"}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
            backgroundColor: colors.primary[400],
            borderRadius: 3,
            boxShadow: 10,
            p: 3,
          }}
        >
          <img
            alt="profile-user"
            width="100px"
            height="100px"
            src={
              patientInfo?.patient?.gender === "Male"
                ? `../../assets/avatarPhoto.jpg`
                : `../../../assets/womenAvatarPhoto.png`
            }
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              marginBottom: "1rem",
              objectFit: "cover",
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", width: "80%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: "30%" }}>Name: </Typography>
              <TextField
                sx={{ width: "80%" }}
                value={patientInfo?.patient?.firstName || ""}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: "30%" }}>Surname: </Typography>
              <TextField
                sx={{ width: "80%" }}
                value={patientInfo?.patient?.lastName || ""}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: "30%" }}>Email: </Typography>
              <TextField
                sx={{ width: "80%" }}
                value={patientInfo?.patient?.email || ""}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: "30%" }}>Primary Phone: </Typography>
              <TextField
                sx={{ width: "80%" }}
                value={patientInfo?.patient?.primaryPhone || ""}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: "30%" }}>Secondary Phone: </Typography>
              <TextField
                sx={{ width: "80%" }}
                value={patientInfo?.patient?.secondaryPhone || ""}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: "30%" }}>Gender: </Typography>
              <TextField
                sx={{ width: "80%" }}
                value={patientInfo?.patient?.gender || ""}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: "30%" }}>Doctor: </Typography>
              <TextField
                sx={{ width: "80%" }}
                value={
                  patientInfo?.patient?.Doctor?.name +
                    " " +
                    patientInfo?.patient?.Doctor?.surname || ""
                }
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "95%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            ml: 2,
            mb: 3,
            mt: 5,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            🗂️ Files Associated with This Patient
          </Typography>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "95%",
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none", //column başlığı için ayarları yapmamı sağlayan sınıf
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              }, //Sanal kaydırıcı için ayarları yapmamı sağlayan sınıf
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700], //Tablonun alt footar kısmından sorumlu sınıf
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              }, //Tablodaki checkbox kutularından sorumlu sınıf.
            }}
          >
            <DataGrid
              rows={patientInfo?.patient?.Files ?? []}
              columns={columns}
              autoHeight
              pagination
              paginationModel={paginationModel}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "95%",
            m: 2,
            mt: 5,
          }}
        >
          <Button
            onClick={() => {
              setDialogState(true);
            }}
            sx={{ color: "white", backgroundColor: colors.redAccent[500] }}
          >
            Delete Patient
          </Button>
        </Box>
        <Dialog
          open={dialogState}
          onClose={() => {
            setDialogState(false);
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: colors.grey[500],
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Do You Want To Delete Patient
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
            <Box sx={{ mt: 2 }}>
              If you click yes you will not be able to undo this action.
            </Box>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                setDialogState(false);
              }}
              sx={{ backgroundColor: colors.primary[200], color: "white" }}
            >
              No
            </Button>
            <Button
              onClick={handleDeletePatient}
              sx={{ backgroundColor: colors.greenAccent[400] }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
