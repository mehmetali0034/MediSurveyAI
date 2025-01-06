import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Headeer from "../../components/Headeer";

export default function AddPatient() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    phoneOne: "",
    phoneTwo: "",
    email: "",
    file: "",
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
      .matches(/^\+?[1-9]\d{1,14}$/, "Geçerli bir telefon numarası giriniz."),
    phoneTwo: Yup.string()
      .required("This field is required")
      .matches(/^\+?[1-9]\d{1,14}$/, "Geçerli bir telefon numarası giriniz."),
    file: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Veriler: ", values);
    resetForm();
  };

  return (
    <Box marginLeft={2} marginRight={2}>
      <Headeer title="ADD PATIENTS" subtitle="Add a New Patient Profile" />
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
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

              {/* Date of Birth */}
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
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
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
                <InputLabel>File</InputLabel>
                <Select
                  name="file"
                  value={values.file}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.file && errors.file)}
                >
                  <MenuItem value="Tendon Yırtılması">Tendon Yırtılması</MenuItem>
                  <MenuItem value="Ön Çarpraz Bağ">Ön Çarpraz Bağ</MenuItem>
                </Select>
                {touched.file && errors.file && (
                  <Box sx={{ color: colors.redAccent[500] }}>{errors.file}</Box>
                )}
              </FormControl>

              {/* Phone One */}
              <Box sx={{ gridColumn: "span 1" }}>
                <PhoneInput
                  international
                  defaultCountry="TR"
                  value={values.phoneOne}
                  onChange={(value) => setFieldValue("phoneOne", value)}
                  error={touched.phoneOne && errors.phoneOne ? true : undefined} // Burada `false` yerine `undefined` kullanıyoruz
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
                  <Box sx={{ color: colors.redAccent[500] }}>{errors.file}</Box>
                )}
              </Box>
              {/* Phone Two */}
              <Box sx={{ gridColumn: "span 1" }}>
                <PhoneInput
                  international
                  defaultCountry="TR"
                  value={values.phoneTwo}
                  onChange={(value) => setFieldValue("phoneTwo", value)}
                  error={touched.phoneTwo && errors.phoneTwo ? true : undefined} // Burada `false` yerine `undefined` kullanıyoruz
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
                  <Box sx={{ color: colors.redAccent[500] }}>{errors.file}</Box>
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
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
