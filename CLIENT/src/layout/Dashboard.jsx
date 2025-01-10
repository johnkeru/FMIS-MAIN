import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { FaCaretLeft } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Outlet, useNavigate } from "react-router-dom";
import UserAvatarMenu from "../global/components/UserAvatarMenu";
import env from "../utils/env";
import CustomDrawer from "./CustomDrawer";

const drawerWidth = 280;

const Dashboard = () => {
  const nav = useNavigate();
  const [open, setOpen] = React.useState(false);

  // Detect if screen size is small (breakpoint of 600px)
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "primary.main",
          boxShadow: 0,
          borderBottom: 1,
          borderColor: "secondary.main",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <FaCaretLeft /> : <GiHamburgerMenu />}
          </IconButton>
          <img
            src="/2020-nia-logo.svg"
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
            onClick={() => nav("/")}
          />
          <Typography variant="h6" noWrap flexGrow={1}>
            {env("APP_TITLE")}
          </Typography>
          <UserAvatarMenu />
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background:
              "linear-gradient(169deg, rgba(55,94,56,1) 10%, rgba(0,0,0,0.8996848739495799) 100%)",
          },
        }}
        variant={isMdScreen ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        {/* CUSTOM DRAWER HERE! */}
        <CustomDrawer />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          transition: "margin 0.3s ease",
          marginLeft: open && !isMdScreen ? `${drawerWidth}px` : "0", // Apply margin only on larger screens
        }}
      >
        <Toolbar />
        <Outlet />

        <Typography
          variant="body2"
          align="center"
          sx={{ px: 1.5, py: 1, pb: 3, color: "text.secondary" }}
        >
          &copy; {new Date().getFullYear()} NIA - Financial Management
          Information System
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
