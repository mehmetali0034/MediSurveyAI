import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Headeer from "../../components/Headeer";
import PatientService from "../../services/doctorServices/patientService";
import FileService from "../../services/doctorServices/FileService";

export default function AddPatient() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [files, setFiles] = useState([]);
  const fileService = new FileService();
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    phoneOne: "",
    phoneTwo: "",
    email: "",
    files: [],
  };

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    gender: Yup.string().required("This field is required"),
    dateOfBirth: Yup.date()
      .required("This field is required")
      .max(new Date(), "Date of Birth Can't Be in the Future")
      .nullable(),
    phoneOne: Yup.string()
      .required("This field is required")
      .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number."),
    phoneTwo: Yup.string()
      .required("This field is required")
      .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number."),
    files: Yup.array()
      .min(1, "At least one file must be selected")
      .required("This field is required"),
    email: Yup.string()
      .required("This field is required")
      .email("Invalid email format"),
  });

  const patientService = new PatientService();

  const clickToAddPatient = (values, { resetForm, setSubmitting }) => {
    const selectedFiles = files.filter((f) => values.files.includes(f.name));
    const fileIds = selectedFiles.map((f) => f.id);

    const patientData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      gender: values.gender,
      primaryPhone: values.phoneOne,
      secondaryPhone: values.phoneTwo,
      fileIds: fileIds,
      dateOfBirth: values.dateOfBirth,
    };
    debugger;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication token not found. Please log in again.");
      return;
    }

    patientService
      .addPatient(patientData, token)
      .then((response) => {
        setOpenSnackBar(true);
        console.log("Patient successfully registered:", response.data);
        debugger;
        resetForm(); // formu sıfırlıyoruz
      })
      .catch((error) => {
        console.error(
          "Error registering patient:",
          error.response?.data || error.message
        );
        alert(
          `Error: ${
            error.response?.data?.message || "Failed to register patient"
          }`
        );
      })
      .finally(() => {
        setSubmitting(false); // submitting durumunu false yapıyoruz
      });
  };

  useState(() => {
    const fetchAllPatients = async () => {
      try {
        const response = await fileService.getAllFiles();
        console.log("Files getirildi: ", response);
        setFiles(response);
        debugger;
      } catch (err) {
        console.error("Sorun oluştu:", err);
      }
    };
    fetchAllPatients();
  });
  return (
    <Box marginRight={2}>
      <Headeer title="ADD PATIENTS" subtitle="Add a New Patient Profile" />
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          clickToAddPatient(values, { resetForm, setSubmitting });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                label="First Name"
                variant="filled"
                name="firstName"
                value={values.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="filled"
                name="lastName"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="email"
                variant="filled"
                name="email"
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email"
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="date"
                variant="filled"
                name="dateOfBirth"
                value={values.dateOfBirth}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 1" }}
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={values.gender}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.gender && errors.gender)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
                {touched.gender && errors.gender && (
                  <Box sx={{ color: colors.redAccent[500] }}>
                    {errors.gender}
                  </Box>
                )}
              </FormControl>

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 1" }}
              >
                <InputLabel>Files</InputLabel>
                <Select
                  name="files"
                  multiple
                  value={values.files}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.files && errors.files)}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            backgroundColor: colors.blueAccent[600],
                            padding: "1px 8px",
                            borderRadius: "16px",
                            color: "white",
                            fontSize: "0.8rem",
                          }}
                        >
                          {value}
                        </Box>
                      ))}
                    </Box>
                  )}
                >
                  {files.map((file, index) => (
                    <MenuItem key={index} value={file?.name || ""}>
                      {file?.name || ""}
                    </MenuItem>
                  ))}
                </Select>
                {touched.files && errors.files && (
                  <Box sx={{ color: colors.redAccent[500] }}>
                    {errors.files}
                  </Box>
                )}
              </FormControl>

              <Box sx={{ gridColumn: "span 1" }}>
                <PhoneInput
                  international
                  defaultCountry="TR"
                  value={values.phoneOne}
                  onChange={(value) => setFieldValue("phoneOne", value)}
                  error={touched.phoneOne && errors.phoneOne ? true : undefined}
                  placeholder="Enter phone number"
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "8px",
                    border: `1px solid ${
                      touched.phoneOne && errors.phoneOne
                        ? colors.grey[400]
                        : colors.grey[300]
                    }`,
                    backgroundColor: colors.primary[400],
                  }}
                />
                {touched.phoneOne && errors.phoneOne && (
                  <Box sx={{ color: colors.redAccent[500] }}>
                    {errors.phoneOne}
                  </Box>
                )}
              </Box>

              <Box sx={{ gridColumn: "span 1" }}>
                <PhoneInput
                  international
                  defaultCountry="TR"
                  value={values.phoneTwo}
                  onChange={(value) => setFieldValue("phoneTwo", value)}
                  error={touched.phoneTwo && errors.phoneTwo ? true : undefined}
                  placeholder="Enter phone number"
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "8px",
                    border: `1px solid ${
                      touched.phoneTwo && errors.phoneTwo
                        ? colors.grey[400]
                        : colors.grey[300]
                    }`,
                    backgroundColor: colors.primary[400],
                  }}
                />
                {touched.phoneTwo && errors.phoneTwo && (
                  <Box sx={{ color: colors.redAccent[500] }}>
                    {errors.phoneTwo}
                  </Box>
                )}
              </Box>
            </Box>

            <Box marginTop={4} display="flex" justifyContent="end">
              <Button
                type="submit"
                sx={{ marginRight: 0 }}
                variant="contained"
                color="secondary"
              >
                ADD NEW PATIENT
              </Button>
              <Snackbar
                open={openSnackBar}
                autoHideDuration={3000}
                onClose={handleCloseSnackBar}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Alert
                  onClose={handleCloseSnackBar}
                  severity="success"
                  variant="filled"
                  sx={{ width: "100%", fontSize: "0.8rem" }}
                >
                  <Typography variant="h4" color="white">
                    Patient Added Successfully!
                  </Typography>
                </Alert>
              </Snackbar>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
