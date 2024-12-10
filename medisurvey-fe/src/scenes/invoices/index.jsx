import React from "react";
import { Box } from "@mui/material";
import { mockDataInvoices } from "../../data/mockData";
import Headeer from "../../components/Headeer";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';
export default function Incovies() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("Ali")
  console.log(colors.blueAccent[400])
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

  return (
    <Box marginLeft={2} marginRight={2}>
      <Headeer title="INVOICES" subtitle="List of Invoices Balances" />
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
    </Box>
  );
}
