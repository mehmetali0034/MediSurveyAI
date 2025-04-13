import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { mockDataInvoices } from "../../data/mockData";
import Headeer from "../../components/Headeer";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';
import Buttonn from "../../components/Buttonn";
import CreateNewFile from "../../components/CreateNewFile";
export default function Files() {
  const theme = useTheme();debugger;
  const colors = tokens(theme.palette.mode); 
  const [openDialog, setOpenDialog] = useState(false)
 
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex:1,
    },
    {
      field: "email",
      headerName: "Email",
      flex:1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex:1,
      renderCell: (params) => (
        <strong>{`$${params.value}`}</strong>
      ),
      cellClassName: "cost-column--cell",

    },
    {
      field: "date",
      headerName: "Date",
      flex:1,
    },
  ];

  const handleClose=()=>{
    setOpenDialog(false)
  }



  return (
    <Box marginRight={2}>
      <Box sx={{display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
      <Headeer title="FILES" subtitle="List of Invoices Balances" />

     <Buttonn onClick={()=>{setOpenDialog(true)}}>Create File</Buttonn>
      </Box>
     
      <Box
            height="90vh"
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
              "& .cost-column--cell" : {
                color: colors.greenAccent[400]
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-root" : {
                border : "none" //Tablo kenarı çizgelrin kaırılmaısnı sağlar
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",//Her satırın altındaki çizgilerin kaldırılmasını sağlar
              },
      
            }}>
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
      </Box>
      <CreateNewFile openDialog={openDialog} setOpenDialog={setOpenDialog} handleClose={handleClose} />
    </Box>
  );
}
