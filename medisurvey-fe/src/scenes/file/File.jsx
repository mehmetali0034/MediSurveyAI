import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { useNavigate, useParams } from "react-router-dom";
import FileService from "../../services/doctorServices/FileService";
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
import Headeer from "../../components/Headeer";
import { DataGrid } from "@mui/x-data-grid";

export default function File() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const fileService = new FileService();
  const [fileInfo, setFileInfo] = useState([]);
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [dialogState, setDialogState] = useState(false)

  useEffect(() => {
    const fetchFileInfo = async () => {
      try {
        const response = await fileService.getFileInfo(id);
        setFileInfo(response);
        console.log("fileInfo", response);
      } catch (e) {
        console.log("Sorun oluştu.fetchFileInfo");
      }
    };
    fetchFileInfo();
  }, []);

  const createdAt = fileInfo?.createdAt?.split("T")[0] ?? "";

  const columns = [
    {
      field: "name",
      headerName: "Form Name",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      cellClassName: "name-column--cell",
      flex: 1,
    },
  ];

  const handleCellClick = (params) => {
    if (params.field === "name") {
      navigate(`/files/${id}/${params.id}`);
    }
  };

  const handleDeleteFile =async()=>{
    try{
      const response = await fileService.deleteFile(id)
      console.log("File Başarıyla Silindi",response.data)
      navigate("/files")
    }catch(error){
      console.log("File silinirken bir hata oluştu: ",error)
    }
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Headeer title="File Detail" subtitle={`Display File Detail`} />
      </Box>
      <Box
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 5,
          boxShadow: 15,
          backgroundColor: colors.primary[400],
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              m: 2,
              width: "45%",
            }}
          >
            <Typography sx={{ width: "25%" }}>File Name :</Typography>

            <TextField value={fileInfo?.name || " "} sx={{ width: "80%" }} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              m: 2,
              width: "45%",
            }}
          >
            <Typography sx={{ width: "25%" }}>Created At :</Typography>

            <TextField value={createdAt} sx={{ width: "80%" }} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              m: 2,
              width: "45%",
            }}
          >
            <Typography sx={{ width: "25%" }}>Number Of Forms :</Typography>

            <TextField
              value={fileInfo?.Forms ? fileInfo.Forms.length : ""}
              sx={{ width: "80%" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              m: 2,
              width: "45%",
            }}
          >
            <Typography sx={{ width: "25%" }}>File Name :</Typography>

            <TextField sx={{ width: "80%" }} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
          width: "100%",
        }}
      >
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
            rows={fileInfo?.Forms ?? []}
            columns={columns}
            autoHeight
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            localeText={{
              noRowsLabel: (
                <div style={{ textAlign: "center" }}>
                  <Typography variant="body1" color="textSecondary">
                    You haven't added any forms yet
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mt: 1, backgroundColor: colors.greenAccent[600] }}
                    onClick={() => navigate("/files")}
                  >
                    Add Form
                  </Button>
                </div>
              ),
            }}
            rowsPerPageOptions={[5]}
            onCellClick={handleCellClick}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            mt: 5,
            justifyContent: "flex-end",
            width: "95%",
          }}
        >
          <Button onClick={()=>{setDialogState(true)}} sx={{ backgroundColor: colors.redAccent[400] }}>
            Delete File
          </Button>
        </Box>
        <Box>
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
              Do You Want To Delete File
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
                onClick={handleDeleteFile}
                sx={{ backgroundColor: colors.greenAccent[400] }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}
