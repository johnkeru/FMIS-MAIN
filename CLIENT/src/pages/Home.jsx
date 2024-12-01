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
                    width: '100%',
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
                        px: { xs: 2, sm: 4, md: 10, lg: 30 } // Responsive padding
                    }}
                >
                    <Toolbar>
                        <img
                            src="/2020-nia-logo.svg" // Ensure the logo is available in the public folder
                            alt="NIA Logo"
                            style={{ height: 50, marginRight: 16 }}
                        />
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            {env('APP_TITLE')}
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
                            A centralized platform to manage and oversee all functionalities under the FMIS system.
                        </Typography>
                    </Box>

                    {/* Features Overview */}
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        {[
                            {
                                title: "Role Management",
                                description:
                                    "This module allows administrators to define and manage user roles and permissions within the FMIS.",
                            },
                            {
                                title: "Signatories",
                                description:
                                    "The Signatories module handles the assignment and management of document signatories across the system.",
                            },
                            {
                                title: "Other Systems",
                                description:
                                    "Explore and manage integrated FMIS subsystems for efficient operation.",
                            },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Card
                                    sx={{
                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                        backdropFilter: "blur(5px)",
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6">{item.title}</Typography>
                                        <Typography variant="body2">{item.description}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box></Box>
    );
}
