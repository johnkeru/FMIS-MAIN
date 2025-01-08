import * as React from "react";
import { Box, IconButton, Collapse, List, ListItem } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useUser } from "../../context/UserContext";

const DisplayRoles = () => {
  const { currentUser } = useUser();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const isOneRole = currentUser.Roles.length === 1;

  return (
    <>
      <Box
        p={2}
        color="white"
        display="flex"
        gap={2}
        borderBottom={1}
        borderColor="secondary.main"
        alignItems="center"
        onClick={handleClick}
        sx={{ cursor: !isOneRole ? "pointer" : "default" }}
      >
        <Box
          display="flex"
          fontWeight={600}
          alignItems="center"
          justifyContent={!isOneRole ? "space-between" : "flex-start"}
          width="100%"
          gap={2}
        >
          <FaUserCircle size={25} />
          <span>{currentUser.Roles[0] || "User"}</span>
          {!isOneRole ? (
            <IconButton size="small" sx={{ color: "white" }}>
              {open ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </IconButton>
          ) : undefined}
        </Box>
      </Box>
      {!isOneRole ? (
        <Box color="white" mt={-0.7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="nav"
              sx={{ borderBottom: 1, borderColor: "secondary.main" }}
            >
              {currentUser.Roles.length > 0 ? (
                currentUser.Roles.map((role, index) => (
                  <ListItem key={index} sx={{ fontWeight: 600 }}>
                    {role}
                  </ListItem>
                ))
              ) : (
                <ListItem key={1}>User</ListItem>
              )}
            </List>
          </Collapse>
        </Box>
      ) : undefined}
    </>
  );
};
export default DisplayRoles;
