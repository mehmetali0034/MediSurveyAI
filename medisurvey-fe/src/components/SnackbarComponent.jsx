import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function WarningSnackbar({
    open,
    autoHideDuration,
    onClose,
    message,
    severity
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ color:"white",width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
