import React from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import env from "../utils/env";

export default function Home() {
  const theme = useTheme(); // Access the MUI theme
  return (
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
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage: "url('/background-image.jpg')", // Add a background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* AppBar Section */}
        <AppBar
          position="static"
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
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content Section */}
        <Container sx={{ flexGrow: 1, py: 4 }}>
          <Box
            sx={{
              textAlign: "center",
              color: "#fff",
              bgcolor: "primary.main",
              py: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Welcome to the FMIS Portal
            </Typography>
            <Typography variant="body1" gutterBottom>
              A centralized platform to manage and oversee all functionalities
              under the FMIS system.
            </Typography>
          </Box>

          {/* Features Overview */}
          <Grid container spacing={4} sx={{ mt: 4, px: 2 }}>
            {[
              {
                title: "Budget System",
                description:
                  "Plan, allocate, and monitor budgets effectively across departments.",
              },
              {
                title: "Disbursement Voucher System",
                description:
                  "Streamline the process of creating and approving disbursement vouchers.",
              },
              {
                title: "Cash System",
                description:
                  "Manage cash inflows and outflows efficiently to maintain financial stability.",
              },
              {
                title: "Billing & Collection System",
                description:
                  "Streamline billing and collection processes for efficient financial management.",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                        mb: 1,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
