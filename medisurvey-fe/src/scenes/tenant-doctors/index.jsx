import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopbarOfTenant from "../tenant-global/TopbarTenant";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import TenantService from "../../services/tenantService";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useNavigate } from "react-router-dom";

export default function TenantDoctors() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tenantService = new TenantService();
  const navigate = useNavigate();
  const token = localStorage.getItem("tokenTenant")
  const [adminDoctors, setAdminDoctors] = useState([])
  const [userDoctors, setUserDoctors] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const allDoctors =[...adminDoctors,...userDoctors]
  
  
  const handleSelectionChange = (selectionModel) => {
    setSelectedItems(selectionModel);
    console.log("Selected Items:", selectedItems);
  };

  const CustomAccessCell = ({ value }) => (
    <Box
      style={{
        backgroundColor: colors.greenAccent[700], // Arka plan rengini ayarlayın
        padding: "8px", // İstenilen dolguyu ayarlayın
        borderRadius: "4px", // İstenilen köşe yuvarlama miktarını ayarlayın
        width: 120,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {value == "admin" ? (
        <AdminPanelSettingsOutlinedIcon />
      ) : value == "doctor" ? (
        <LockOpenOutlinedIcon />
      ) : (
        <SecurityOutlinedIcon />
      )}
      <Typography>{value}</Typography>
    </Box>
  );

  const columns = [
    //{ field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      cellClassName: "name-column--cell",
      flex: 0.6,
    }, //name'lere özel sınıf tanımladım bu sayede onu özelleştirebileceğim.
    {
      field: "surname",
      headerName: "Surname",
      cellClassName: "name-column--cell",
      flex: 0.6,
    }, //name'lere özel sınıf tanımladım bu sayede onu özelleştirebileceğim.

    {
      field: "specialization",
      headerName: "Specialization",
      headerAlign: "left", // Sütun başlığının sola hizalanması
      align: "left", // Hücre içeriğinin sola hizalanması
      flex: 0.7,
    },
    { field: "phone_number", headerName: "Phone Number", flex: 0.7 },
    { field: "email", headerName: "Email", flex: 0.7 },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: (params) => <CustomAccessCell value={params.value} />,
    },
  ];

  const handleRowClick = (params) => {
    navigate(`/tenant/doctors/${params.id}`);
  }; 

  useEffect(()=>{
    const fetchAllDoctors = async ()=>{
        try{
            const response = await tenantService.getAllDoctor(token);
            setAdminDoctors(response.doctors.admins)
            const formattedDoctors = response.doctors.admins
            .flatMap(admin=> admin.normalDoctors)
            .filter(doctor=> doctor.role === "doctor");
            setUserDoctors(formattedDoctors)
        }catch(error){
            console.log("Doctorları şekerken bir sorun oluştu.")
        }
    }
    fetchAllDoctors();
  },[adminDoctors,userDoctors])
  return (
    <Box sx={{ width: "100%" }}>
      <TopbarOfTenant />
      <Box
        height="100vh"
        sx={{

            m:5,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection: "column",
            
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
          style={{
            color: "inherit",
            backgroundColor: colors.primary[400],
            width:"90%"
          }}
          
          rows={allDoctors}
          columns={columns}
          onSelectionModelChange={handleSelectionChange}
          onRowClick={handleRowClick} 
        />
      </Box>
    </Box>
  );
}
