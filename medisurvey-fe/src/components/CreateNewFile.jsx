import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../theme";

export default function CreateNewFile(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { openDialog, setOpenDialog, handleClose } = props;
  const [name, setName] = useState("");

  const handleClick = () => {
    console.log("selam");
  };

  return (
    <Box>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: colors.grey[500] }}>
          Create New File
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            <TextField
              variant="filled"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button
              type="submit"
              sx={{ marginRight: 0, mt: 2 }}
              variant="contained"
              color="secondary"
              onClick={handleClick}
            >
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
