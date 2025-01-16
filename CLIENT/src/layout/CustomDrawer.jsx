import { Box, Divider, List, Toolbar, Typography } from "@mui/material";
import React from "react";
import { CiViewTable } from "react-icons/ci";
import {
  FaFileInvoiceDollar,
  FaFileSignature,
  FaMoneyBillTransfer,
  FaMoneyBillWave,
  FaPiggyBank,
  FaSignature,
  FaUserGear,
  FaUserPen,
} from "react-icons/fa6";
import { LuFileSignature } from "react-icons/lu";
import { MdOutlineAssignmentInd, MdSpaceDashboard } from "react-icons/md";
import { PiLinkSimpleBold } from "react-icons/pi";
import { useUser } from "../context/UserContext";
import DisplayRoles from "../global/components/DisplayRoles";
import LinkTo from "../global/components/LinkTo";
import {
  isAccountingAdmin,
  isAllowAdminsOnly,
  isSuperAdmin,
} from "../utils/checkRole";
import { IoMdAdd } from "react-icons/io";

const CustomDrawer = () => {
  const { currentUser } = useUser();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <Box>
        <Toolbar />
        <DisplayRoles />
        <Divider sx={{ borderColor: "secondary.light" }} />
        <List sx={{ py: 0 }}>
          <LinkTo
            icon={<MdSpaceDashboard />}
            name="Dashboard"
            link="/dashboard"
            isAllow
          />
          <LinkTo
            isAllow={isSuperAdmin(currentUser)}
            icon={<FaUserGear />}
            name="Roles Management"
            subLinks={[
              { name: "Roles", link: "/roles", icon: <CiViewTable /> },
              {
                name: "Roles Assign",
                link: "/roles/assign",
                icon: <FaUserPen />,
                isAllow: isAllowAdminsOnly(currentUser),
              },
              {
                name: "Roles Assigned",
                link: "/roles/roles-assigned",
                icon: <MdOutlineAssignmentInd />,
                isAllow: isAllowAdminsOnly(currentUser),
              },
            ]}
          />
          <LinkTo
            icon={<FaFileSignature />}
            name="Signatories Management"
            isAllow={isSuperAdmin(currentUser)}
            subLinks={[
              {
                name: "Signatories",
                link: "/signatories",
                icon: <CiViewTable />,
                isAllow: isAccountingAdmin(currentUser),
              },
              {
                name: "Create Transaction",
                link: "/signatories/create-transaction-type",
                icon: <IoMdAdd />,
              },
              {
                name: "Create Signatory",
                link: "/signatories/create",
                icon: <FaSignature />,
                isAllow: isAccountingAdmin(currentUser),
              },
              {
                name: "Test",
                link: "/signatories/test",
                icon: <LuFileSignature />,
              },
            ]}
          />
          <LinkTo
            icon={<PiLinkSimpleBold />}
            name="FMIS Systems"
            isAllow={true}
            subLinks={[
              {
                name: "Budget System",
                link: "https://budget.fmis.nia.gov.ph",
                icon: <FaPiggyBank />,
              },
              {
                name: "DV System",
                link: "https://dv.fmis.nia.gov.ph",
                icon: <FaFileInvoiceDollar />,
              },
              {
                name: "Cash System",
                link: "https://cash.fmis.nia.gov.ph",
                icon: <FaMoneyBillWave />,
              },
              {
                name: "B & C System",
                link: "https://bc.fmis.nia.gov.ph",
                icon: <FaMoneyBillTransfer />,
              },
            ]}
          />
        </List>
      </Box>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          background: "rgba(21, 41, 22,0.7996848739495799)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Divider sx={{ borderColor: "primary.light" }} />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "common.white", py: 2 }}
        >
          &copy; {new Date().getFullYear()} NIA - FMIS
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomDrawer;
