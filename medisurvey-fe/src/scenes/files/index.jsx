import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { mockDataInvoices } from "../../data/mockData";
import Headeer from "../../components/Headeer";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import Buttonn from "../../components/Buttonn";
import CreateNewFile from "../../components/CreateNewFile";
import FileService from "../../services/doctorServices/FileService";
import { useNavigate } from "react-router-dom";
export default function Files() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fileService = new FileService();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [files, setFiles] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 5,
    });
  const columns = [
    {
      field: "name",
      headerName: "Name",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "created_by",
      headerName: "Created By",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{backgroundColor:colors.greenAccent[600]}}
          onClick={(event) => {
            event.stopPropagation(); // Row click eventini durdurur
            handleAddFormClick(params);
          }}
        >
          Add Form
        </Button>
      ),
    },
  ];

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchAllFiles = async () => {
      try {
        const response = await fileService.getAllFiles();
        setFiles(response);
        console.log(response);
      } catch (error) {
        console.log("Bir Sorun Oluştu");
      }
    };
    fetchAllFiles();
  }, [files]);

  const handleRowClick = (params) => {
    navigate(`/files/${params.id}`);
  };

  const handleAddFormClick  =(params)=>{
    navigate(`/Create-NewForm/${params.id}`)
  }

  return (
    <Box marginRight={2}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Headeer title="FILES" subtitle="List of Invoices Balances" />

        <Buttonn
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Create File
        </Buttonn>
      </Box>

      <Box
        height="90vh"
        sx={{
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
          "& .cost-column--cell": {
            color: colors.greenAccent[400],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-root": {
            border: "none", //Tablo kenarı çizgelrin kaırılmaısnı sağlar
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none", //Her satırın altındaki çizgilerin kaldırılmasını sağlar
          },
        }}
      >
        <DataGrid onRowClick={handleRowClick} rows={files} columns={columns} autoHeight
         pagination
         paginationModel={paginationModel}
         onPaginationModelChange={setPaginationModel}
         rowsPerPageOptions={[5]}
         localeText={{
          noRowsLabel:(
            <Typography>You haven't created any forms yet</Typography>
          )
         }}
         />
      </Box>
      <CreateNewFile
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleClose={handleClose}
      />
    </Box>
  );
}
