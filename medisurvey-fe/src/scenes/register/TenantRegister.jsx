import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import TopBarOfMarketing from "../../components/TopBarOfMarketing";
import { tokens } from "../../theme";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TenantService from "../../services/tenantService";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function TenantRegister() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const tenantService = new TenantService();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const initialValues = {
    name: "",
    email: "",
    phone_number: "",
    address: "",
    plan_type: "",
    password: "",
    password_confirmation:"",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone_number: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    plan_type: Yup.string().required("Plan Type is required"),
    password: Yup.string().required("Password is required"),
    password_confirmation: Yup.string().required(
      "Password Confirmation isrequired"
    ),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    tenantService
      .tenantRegister({
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        address: values.address,
        plan_type: values.plan_type,
        password: values.password,
        password_confirmation: values.password_confirmation,
      })
      .then((response) => {
        console.log("Tenant successfully registered:", response.data);
        resetForm();
        setOpenSnackBar(true);
      })
      .catch((error) => {
        console.error("Error registering tenant:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TopBarOfMarketing />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "80%",
            backgroundColor: colors.primary[600],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 80,
            boxShadow: 70,
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <Form style={{ width: "60%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <Typography sx={{ fontFamily: "serif" }} variant="h2">
                      MEDICAL Survey AI
                    </Typography>
                    <Typography sx={{ fontFamily: "serif", mt: 2 }} variant="h">
                      Fill Out the Form to Buy
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    variant="filled"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    variant="filled"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    fullWidth
                    name="phone_number"
                    label="Phone Number"
                    variant="filled"
                    value={values.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone_number && Boolean(errors.phone_number)}
                    helperText={touched.phone_number && errors.phone_number}
                  />

                  <TextField
                    fullWidth
                    name="address"
                    label="Address"
                    variant="filled"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />

                  <TextField
                    fullWidth
                    name="plan_type"
                    label="Plan Type"
                    variant="filled"
                    value={values.plan_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.plan_type && Boolean(errors.plan_type)}
                    helperText={touched.plan_type && errors.plan_type}
                  />
                  <TextField
                    fullWidth
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    variant="filled"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    label="Password Confirmation"
                    variant="filled"
                    value={values.password_confirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password_confirmation && Boolean(errors.password_confirmation)}
                    helperText={touched.password_confirmation && errors.password_confirmation}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: colors.greenAccent[400],
                      marginTop: 3,
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                  >
                    Buy
                  </Button>
                  <Typography sx={{ textAlign: "center" }} mt={2} variant="h5">
                    Already have an account?{" "}
                    <span
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => navigate("/corporate-login")}
                    >
                      Login
                    </span>
                  </Typography>

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
                        Purchase Successful!
                      </Typography>
                    </Alert>
                  </Snackbar>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}
