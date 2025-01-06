import React from 'react'
import { Box } from '@mui/material'
import { DataGrid ,GridToolbar  } from '@mui/x-data-grid';
import {mockDataContacts} from "../../data/mockData"
import Headeer from '../../components/Headeer';
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';
import Buttonn from '../../components/Buttonn';
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Patients() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("Musa")
  console.log(colors.blueAccent[400])

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'registrarId',
      headerName: 'Registrar Id',
      flex:1
    },
    {
      field: 'name',
      headerName: 'Name',
      cellClassName: "name-column--cell",
      flex:1
     
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left', // Sütun başlığının sola hizalanması
      align: 'left', 
    },
    {
      field: 'email',
      headerName: 'Email',
      flex:1
      
      
    },
  
    {
      field: 'phone',
      headerName: 'Phone',
      description: 'This column was created for users phone number',
      flex:1
    },
    {
      field: 'address',
      headerName: 'Address',
      flex:1
    },
    {
      field: 'city',
      headerName: 'City',
      flex:1
        },
    {
      field: 'zipCode',
      headerName: 'Zip Code',
      flex:1
    },
  ];
  return (
    <Box sx={{ marginLeft:2 , marginRight:2 }} >
      <Box sx={{display:"flex", justifyContent:"space-between",alignItems: "center"}}>
      <Headeer title="PATIENTS" subtitle="List of Contacts for Future Reference"/>
      <Buttonn >
          Add Patients
          <AddCircleIcon sx={{ marginLeft: "8px" }} />
        </Buttonn>
      </Box>
  
      <Box
      height="120vh"
      sx={{
        "& .MuiDataGrid-columnHeaders":{
          backgroundColor: colors.blueAccent[700],
          borderBottom:"none"
        },
        "& .MuiDataGrid-footerContainer":{
          backgroundColor: colors.blueAccent[700],
          borderTop:"none"
        },
        "& .MuiCheckbox-root" : {
          color: colors.greenAccent[200],
        },
        "& .name-column--cell" : {
          color: colors.greenAccent[400]
        },
        "& .MuiButtonBase-root" : {
          color: colors.greenAccent[200]
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },//tablonun arka plan rengimni değiştirdim
        "& .MuiDataGrid-root" : {
          border : "none" //Tablo kenarı çizgelrin kaırılmaısnı sağlar
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",//Her satırın altındaki çizgilerin kaldırılmasını sağlar
        },

      }}>
        <DataGrid checkboxSelection rows={mockDataContacts}
        columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  )
}
