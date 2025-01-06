import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import {
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaPiggyBank,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { PiLinkSimpleBold } from "react-icons/pi";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const Dashboard = () => {
  const { currentUser } = useUser();
  // Application data
  const applications = [
    {
      title: "Budget System",
      description:
        "Plan, allocate, and monitor budgets effectively across departments.",
      icon: <FaPiggyBank size={50} color="#4caf50" />,
      link: "https://budget.fmis.nia.gov.ph",
    },
    {
      title: "Disbursement Voucher System",
      description:
        "Streamline the process of creating and approving disbursement vouchers.",
      icon: <FaFileInvoiceDollar size={50} color="#2196f3" />,
      link: "https://dv.fmis.nia.gov.ph",
    },
    {
      title: "Cash System",
      description:
        "Manage cash inflows and outflows efficiently to maintain financial stability.",
      icon: <FaMoneyBillWave size={50} color="#fbc02d" />,
      link: "https://cash.fmis.nia.gov.ph",
    },
    {
      title: "Billing & Collection System",
      description:
        "Streamline billing and collection processes for efficient financial management.",
      icon: <FaMoneyBillTransfer size={50} color="#f57c00" />,
      link: "https://bc.fmis.nia.gov.ph",
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5" }}>
      {/* Welcome Section */}
      <Paper
        sx={{ p: 3, mb: 3, bgcolor: "#ffffff", borderRadius: 2, boxShadow: 3 }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Welcome, {currentUser.FirstName} {currentUser.LastName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You are logged in as{" "}
          <strong>
            {currentUser.Roles.length > 0
              ? currentUser.Roles.join(",")
              : "USER"}
          </strong>{" "}
          in <strong>FMIS</strong> at the {currentUser.Region} branch.
        </Typography>
      </Paper>

      {/* Report Section */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          bgcolor: "secondary.main",
          color: "secondary.contrastText",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1">
          These are all the systems under FMIS, each serving a specific function
          within the organization.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mt: 2,
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "4", label: "Active Systems", color: "#1976d2" },
            { value: "8", label: "Pending Transactions", color: "#388e3c" },
            { value: "15", label: "Completed Transactions", color: "#f57c00" },
          ].map((item, index) => (
            <Paper
              key={index}
              elevation={4}
              sx={{
                flex: "1 1 calc(33.333% - 16px)",
                minWidth: "200px",
                p: 7,
                textAlign: "center",
                borderRadius: 2,
                bgcolor: item.color,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                color: "#fff",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography variant="h1" fontWeight="bold">
                {item.value}
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {item.label}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Paper>

      {/* Applications Section */}
      <Paper sx={{ p: 3, bgcolor: "#ffffff", borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 1.2, alignItems: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            FMIS - SYSTEMS
          </Typography>
          <PiLinkSimpleBold size="20px" />
        </Box>
        <Typography variant="body1" color="text.secondary">
          These are all the systems under FMIS, each serving a specific function
          within the organization.
        </Typography>
        <Box
          sx={{
            display: { xs: "grid", md: "flex" }, // Grid for small screens, flex for larger screens
            justifyContent: { xs: "center", md: "space-between" }, // Center-align on small screens
            gap: 2,
            mt: 2,
            flexWrap: "wrap", // Ensures wrapping on larger screens
          }}
        >
          {applications.map((app, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "100%", lg: "49%" },
                bgcolor: "rgba(55, 94, 56, .8)",
              }}
            >
              <Link
                to={app.link}
                style={{
                  textDecoration: "none",
                  marginBottom: "10px",
                  width: "100%", // Full width on small screens
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#ffffff",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    border: "3px solid",
                    borderColor: "rgba(55, 94, 56, .8)",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 5,
                    height: "100%",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  {app.icon}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary.main"
                    sx={{ mt: 2 }}
                  >
                    {app.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    textAlign="center"
                    sx={{ mt: 1 }}
                  >
                    {app.description}
                  </Typography>
                </Box>
              </Link>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
