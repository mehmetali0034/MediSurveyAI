import React from "react";
import {
    Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

export default function ConfirmationDialog({
  title,
  description,
  open,
  onClose,
  onConfirm,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          backgroundColor: colors.grey[500],
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{textAlign:"center", backgroundColor: colors.primary[400] }}>
      <Box sx={{ mt: 2 }}>
      {description}
      </Box>
        </DialogContent>
      <DialogActions
       
      >
        <Button sx={{ backgroundColor: colors.primary[400], color: "white" }} onClick={onClose}>No</Button>
        <Button sx={{ backgroundColor: colors.greenAccent[400] }} onClick={onConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
