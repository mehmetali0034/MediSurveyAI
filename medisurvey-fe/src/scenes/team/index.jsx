import React, { useState } from "react";
import { mockDataTeam } from "../../data/mockData";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Headeer from "../../components/Headeer";
import Buttonn from "../../components/Buttonn";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
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
      ) : value == "user" ? (
        <LockOpenOutlinedIcon />
      ) : (
        <SecurityOutlinedIcon />
      )}
      <Typography>{value}</Typography>
    </Box>
  );
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      cellClassName: "name-column--cell",
      flex: 1,
    }, //name'lere özel sınıf tanımladım bu sayede onu özelleştirebileceğim.

    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left", // Sütun başlığının sola hizalanması
      align: "left", // Hücre içeriğinin sola hizalanması
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: (params) => <CustomAccessCell value={params.value} />,
    },
  ];

  const clickToAddDoktor = () => {
    navigate("/addDoctor");
  };
  return (
    <Box marginLeft={2} marginRight={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Headeer title="TEAM" subtitle="Managing Team Members" />
        <Buttonn onClick={clickToAddDoktor}>
          Add Doctor
          <AddCircleIcon sx={{ marginLeft: "8px" }} />
        </Buttonn>
      </Box>

      <Box
        height="100vh"
        sx={{
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
          }}
          checkboxSelection
          rows={mockDataTeam}
          columns={columns}
          onSelectionModelChange={handleSelectionChange}
        />
      </Box>
    </Box>
  );
}
