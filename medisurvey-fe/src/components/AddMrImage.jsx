import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { tokens } from "../theme";
import MrService from "../services/doctorServices/MrService";

export default function AddMrImage({ open, onClose,patientId }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const [noteValue, setNoteValue] = useState("");
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const mrService = new MrService();
  

  const handleUpload = async () => {
  if (!selectedFile) {
    alert("Lütfen bir dosya seçin.");
    return;
  }

  const formData = new FormData();
  formData.append("patientId", patientId);
  formData.append("notes", noteValue);
  formData.append("mrImage", selectedFile); // Burada 'mrImage' backend'in beklediği alan adıyla eşleşmeli

  try {
    const response = await mrService.addMr(formData);
    console.log("MR başarıyla yüklendi:", response);
    onClose(); // Modal'ı kapat
  } catch (e) {
    console.error("MR yüklenirken bir hata oluştu:", e);
    alert("Yükleme başarısız!");
  }
};


  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: colors.blueAccent[600] }}>
        Add MR Image
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <Box sx={{ p: 3 }}>
          <Typography mb={2}>
            Lütfen MR görüntüsünü yüklemek için bir dosya seçin.
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Görünmez input */}
          <input
            type="file"
            accept="image/*, .dcm"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* Stil verilmiş button ile tetikleme */}
          <Button
            sx={{ backgroundColor: colors.greenAccent[400] }}
            variant="outlined"
            onClick={triggerFileSelect}
          >
            {selectedFile ? "Dosyayı Değiştir" : "Dosya Seç"}
          </Button>

          {/* Dosya adı */}
          {selectedFile && (
            <Box>
              <Typography variant="body2">
                Seçilen dosya: <strong>{selectedFile.name}</strong>
              </Typography>

              <TextField
                placeholder="Add Note About MR"
                variant="outlined"
                fullWidth
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: colors.primary[600], // Burada istediğin rengi kullan
                  },
                  mt:1
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: colors.blueAccent[600] }}>
        <Button
          sx={{ backgroundColor: colors.redAccent[600], color: "white" }}
          onClick={onClose}
        >
          İptal
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.greenAccent[400] }}
          onClick={handleUpload}
        >
          Yükle
        </Button>
      </DialogActions>
    </Dialog>
  );
}
