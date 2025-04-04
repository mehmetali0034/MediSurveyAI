import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopbarOfTenant from "../tenant-global/TopbarTenant";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import TenantService from "../../services/tenantService";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function TenantPatients() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tenantService = new TenantService();
  const navigate = useNavigate();
  const token = localStorage.getItem("tokenTenant");
  const [patients, setPatients] = useState([]);

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
    /* {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left', // Sütun başlığının sola hizalanması
      align: 'left', 
    }, */
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
      field: "file",
      headerName: "File",
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
    },
  ];

  const handleRowClick = (params) => {
    console.log("Seçilen Satır Params:", params);
    console.log("Seçilen Hasta ID:", params.id);
    navigate(`/tenant/patients/${params.id}`);
  };

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const response = await tenantService.getAllPatients(token);
        const formattedPatients = response.patients.map((patient) => ({
          ...patient,
          doctorName: patient.Doctor
            ? `${patient.Doctor.name} ${patient.Doctor.surname}`
            : "N/A",
        }));
        setPatients(formattedPatients);
      } catch (error) {
        console.log("Hata");
      }
    };
    fetchAllPatients();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <TopbarOfTenant />
      <Box
        height="100vh"
        sx={{
          m: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.blueAccent[700],
            borderTop: "none",
          },
          "& .MuiCheckbox-root": {
            color: colors.greenAccent[200],
          },
          "& .name-column--cell": {
            color: colors.greenAccent[400],
          },
          "& .MuiButtonBase-root": {
            color: colors.greenAccent[200],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          }, //tablonun arka plan rengimni değiştirdim
          "& .MuiDataGrid-root": {
            border: "none", //Tablo kenarı çizgelrin kaırılmaısnı sağlar
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none", //Her satırın altındaki çizgilerin kaldırılmasını sağlar
          },
        }}
      >
        <DataGrid
          sx={{
            color: "inherit",
            backgroundColor: colors.primary[400],
            width: "90%",
          }}
          checkboxSelection
          rows={patients}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </Box>
    </Box>
  );
}
