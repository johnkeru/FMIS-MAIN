import { yupResolver } from "@hookform/resolvers/yup";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import api from "../config/api";
import { useUser } from "../context/UserContext";
import CustomButton from "../global/components/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import env from "../utils/env";
import { toast } from "react-hot-toast";

// Validation schema
// Validation schema
const schema = yup.object().shape({
  username: yup
    .string()
    .test(
      "is-username-or-email",
      "Username must be a 6-digit number or a valid email address",
      (value) =>
        /^\d{6}$/.test(value) || // Check for 6-digit username
        yup.string().email().isValidSync(value) // Check if it's a valid email
    )
    .required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const nav = useNavigate();
  const theme = useTheme(); // Access the MUI theme
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check for screen size
  const { setCurrentUser } = useUser();
  const [nextLink, setNextLink] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/login", data);
      // await setCurrentUser();
      if (nextLink) return (location.href = nextLink);
      else {
        nav("/dashboard");
        toast.success("Logged in successfully", { duration: 3000 });
      }
    } catch (e) {
      console.log(e);
      setSubmitError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlObj = new URL(location.href);
    const next = urlObj.searchParams.get("next");
    setNextLink(next);
  }, []);

  return (
    <>
      <AppBar
        color="primary"
        sx={{
          py: 1,
          px: { xs: 2, sm: 4, md: 10, lg: 30 }, // Responsive padding
        }}
      >
        <Toolbar>
          <img
            src="/2020-nia-logo.svg" // Ensure the logo is available in the public folder
            alt="NIA Logo"
            style={{ height: 50, marginRight: 16 }}
          />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {env("APP_TITLE")}
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, #0c1f0b)`,
        }}
      >
        <Box
          display="flex"
          flexDirection={isSmallScreen ? "column" : "row"} // Stack vertically on small screens
          alignItems="center"
          sx={{
            borderRadius: isSmallScreen ? 2 : 0,
            background: theme.palette.primary.main,
            boxShadow: 1,
            m: 2,
            maxWidth: "800px",
            width: "100%", // Ensure the box takes full width on small screens
            overflow: "hidden",
          }}
        >
          {/* Left side: Logo */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: isSmallScreen ? "100%" : "50%", // Full width on small screens
              p: isSmallScreen ? 4 : "0",
            }}
          >
            <img
              src="/2020-nia-logo.svg"
              alt="FMIS Logo"
              style={{
                height: isSmallScreen ? "150px" : "224px", // Smaller logo on small screens
                width: "auto",
              }}
            />
          </Box>

          {/* Right side: Form */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            p={3}
            m={0.5}
            bgcolor="white"
            width={isSmallScreen ? "100%" : "50%"} // Full width on small screens
          >
            <Box px={{ xs: 2, sm: 2 }}>
              <Typography
                variant="h5"
                color={theme.palette.secondary.main}
                fontWeight={600}
                mb={2}
              >
                FMIS
              </Typography>

              {(submitError || errors.password || errors.username) && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{
                    backgroundColor: "#f8d7da",
                    p: 1,
                    border: "1px solid #f5c6cb",
                    mb: 2,
                  }}
                >
                  Invalid Credentials
                </Typography>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  {...register("username")}
                  label="Enter 6-digit username or email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={!!errors.username}
                  sx={{ mb: 2 }}
                />

                <TextField
                  {...register("password")}
                  label="Enter your password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={!!errors.password}
                  sx={{ mb: 1 }}
                />

                <FormControlLabel
                  control={
                    <Checkbox {...register("rememberMe")} color="primary" />
                  }
                  label="Remember me"
                />

                <CustomButton
                  loading={loading}
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 3,
                  }}
                  size="large"
                >
                  Log In
                </CustomButton>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
