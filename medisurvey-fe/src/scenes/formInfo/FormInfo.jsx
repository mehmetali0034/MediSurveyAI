import { useTheme } from "@emotion/react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  TextField as MuiTextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../theme";
import FormService from "../../services/doctorServices/FormService";
import Headeer from "../../components/Headeer";
import PatientService from "../../services/doctorServices/patientService";
import { DataGrid } from "@mui/x-data-grid";
import WarningSnackbar from "../../components/SnackbarComponent";

export default function FormInfo() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const formService = new FormService();
  const patientService = new PatientService();
  const { formId } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState({});
  const [patients, setPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFormInfo = async () => {
      try {
        const response = await formService.getFormInfo(formId);
        console.log("Form Bilgileri Başarıyla Getirildi: ", response);
        setFormInfo(response);
      } catch (error) {
        console.log("Form bilgileri alınırken bir sorun oluştu: ", error);
      }
    };

    const fetchAllPatient = async () => {
      try {
        const response = await patientService.getAllPatients();
        const filteredPatients = response?.patients?.filter((patient) =>
          patient.fileIds.includes(id)
        );
        setPatients(filteredPatients);
        console.log();
      } catch (error) {
        console.log("Hastalar getirilirken bir sorun oluştu: ", error);
      }
    };
    fetchFormInfo();
    fetchAllPatient();
  }, []);

  const createdAt = formInfo?.createdAt?.split("T")[0] ?? "";

  const columns = [
    {
      field: "firstName",
      headerName: "Name",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "primaryPhone",
      headerName: "Primary Phone",
      description: "This column was created for users phone number",
      flex: 1,
    },
    {
      field: "secondaryPhone",
      headerName: "Secondary Phone",
      description: "This column was created for users phone number",
      flex: 1,
    },
    {
      field: "dateOfBirth",
      headerName: "Date Of Birth",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "doctorName",
      headerName: "Doctor",
      flex: 1,
      valueGetter: (params) => {
        const doctor = params.row.Doctor;
        return doctor ? `${doctor.name} ${doctor.surname}` : "—";
      },
    },
  ];

  const handleFill = () => {
    if (selectedPatients.length === 0) {
      setAlertMessage("Please Select At Least 1 Patient");
      setShowAlert(true);
      return;
    }
  
    if (selectedPatients.length > 1) {
      setAlertMessage("You can Only Select 1 Patient");
      setShowAlert(true);
      return;
    }
  
    navigate(`/files/${id}/${formId}/fill-out`,{
      state: {selectedPatients}
    })
  };

  
  

  const handleSend = ()=>{
    if (selectedPatients.length === 0) {
      setAlertMessage("Please Select At Least 1 Patient");
      setShowAlert(true);
      return;
    }
  
    if (selectedPatients.length > 1) {
      setAlertMessage("You can Only Select 1 Patient");
      setShowAlert(true);
      return;
    }
  
    navigate(`/files/${id}/${formId}/fill-out`,{
      state: {selectedPatients}
    })
  }
  const handleEditForm =()=>{
    navigate(`/files/${id}/${formId}/edit`)
  }
  const handleCloseSnackbar =()=>{
    setShowAlert(false)
  }
  return (
    <Box>
      <Box>
        <Headeer
          title={"Form Detail"}
          subtitle={"Display Form Form Detail Page"}
        />
      </Box>
      <Box sx={{ width: "95%", ml: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 5,
            boxShadow: 15,
            backgroundColor: colors.primary[400],
            mx: "auto",
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              m: 2,
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "45%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                mr: 4,
              }}
            >
              <Typography sx={{ width: "20%" }}>File Name :</Typography>

              <TextField
                value={formInfo?.File?.name || " "}
                sx={{ width: "80%" }}
              />
            </Box>
            <Box
              sx={{
                width: "45%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: "20%" }}>Created At :</Typography>

              <TextField value={createdAt} sx={{ width: "80%" }} />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              m: 2,
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "45%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                mr: 4,
              }}
            >
              <Typography sx={{ width: "20%" }}>Type :</Typography>

              <TextField
                value={
                  formInfo?.type === "for me" ? "For Doctor" : "For Patient"
                }
                sx={{ width: "80%" }}
              />
            </Box>
            <Box
              sx={{
                width: "45%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ width: "20%" }}>Created At :</Typography>

              <TextField value={createdAt} sx={{ width: "80%" }} />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Hastalar Tablosu */}
      <Box
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          ml: 2,
          mb: 5,
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          🗂️ Patients Associated with This File
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3, color: colors.grey[300] }}
        >
          Select Patient To {formInfo.type === "for me" ? "Fill In" : "Send"}
        </Typography>

        <Box
          sx={{
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
            checkboxSelection
            rows={patients}
            autoHeight
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowsPerPageOptions={[5]}
            columns={columns}
            onRowSelectionModelChange={(selectedIds) => {
              const selectedData = patients.filter((row) =>
                selectedIds.includes(row.id)
              );
              setSelectedPatients(selectedData);
            }}
          />
        </Box>
      </Box>

      <Box sx={{ width: "90%", ml: 6 }}>
        <Box
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: `2px solid ${colors.primary[100]}`,
            borderTop: `4px solid ${colors.redAccent[300]}`,
            borderLeft: `4px solid ${colors.greenAccent[400]}`,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            value={formInfo?.name}
            InputProps={{
              style: { fontSize: "25px" },
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            variant="standard"
            value={formInfo?.description}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mt: 1 }}
          />
        </Box>
        <Box>
          {formInfo?.questions?.map((field, index) => (
            <Box key={index} sx={{ marginBottom: 3 }}>
              <Typography sx={{ mb: 1 }} variant="h6">
                Question {index + 1} :
              </Typography>
              <Box
                sx={{
                  borderRadius: 5,
                  boxShadow: 10,
                  border: `2px solid ${colors.primary[100]}`,
                  borderTop: `3px solid`,
                  borderLeft: `4px solid ${colors.greenAccent[400]}`,
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  sx={{ width: "80%", m: 2 }}
                  value={field.question}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                {field.type === "multiple_choice" && (
                  <Box sx={{ margin: 3 }}>
                    <FormControl fullWidth>
                      <RadioGroup>
                        {field.options.map((option, optionIdx) => (
                          <FormControlLabel
                            key={optionIdx}
                            value={option}
                            control={<Radio disabled />}
                            label={
                              <MuiTextField
                                value={option}
                                label={`Seçenek ${optionIdx + 1}`}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            }
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              size="large"
              sx={{ backgroundColor: colors.blueAccent[600], mr: 2 }}
              onClick={handleEditForm}
            >
              Edit
            </Button>
            {formInfo.type === "for me" ? (
              <Button
                size="large"
                sx={{ backgroundColor: colors.greenAccent[600] }}
                onClick={handleFill}
              >
                Fill In
              </Button>
            ) : (
              <Button
              onClick={handleSend}
                size="large"
                sx={{ backgroundColor: colors.greenAccent[600] }}
              >
                Fill In (For Patient)
              </Button>
            )}
          </Box>
          {showAlert && (
            <WarningSnackbar severity={"warning"} message={alertMessage} open={showAlert} autoHideDuration={3000} onClose={handleCloseSnackbar}/>
          )}
        </Box>
      </Box>
    </Box>
  );
}
