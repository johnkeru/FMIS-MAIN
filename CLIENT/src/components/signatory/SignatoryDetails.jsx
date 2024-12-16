import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FiEye } from "react-icons/fi";

const SignatoryDetails = ({ signatory, handleCloseMenu }) => {
    const [open, setOpen] = useState(false);
    if (!signatory) return null;

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        handleCloseMenu();
    };

    // Format the createdAt date
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
    
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
    
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12; // Convert to 12-hour format
        hours = hours ? String(hours).padStart(2, "0") : '12'; // Handle midnight case (0 becomes 12)
    
        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    };
    

    return (
        <>
            <MenuItem
                onClick={handleOpen}
                disableRipple
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <FiEye />
                View
            </MenuItem>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    Signatory Details
                </DialogTitle>
                <DialogContent
                    dividers
                    sx={{
                        backgroundColor: "background.paper",
                        py: 3,
                        px: 4,
                    }}
                >
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Payee:</strong> {signatory.payee}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Payee 6 Digits:</strong> {signatory.payeeDigits}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Position Type:</strong> {signatory.positionType}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Date Submitted:</strong> {formatDate(signatory.createdAt)}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ fontWeight: "bold", mt: 2 }}
                    >
                        Signatories:
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        {["boxA", "boxB", "boxC", "boxD"].map((boxKey) => {
                            const box = signatory[boxKey];
                            return (
                                box && (
                                    <Box
                                        key={box._id}
                                        sx={{
                                            p: 2,
                                            border: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: 2,
                                            backgroundColor: "grey.50",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{ textTransform: "uppercase", mb: 1 }}
                                        >
                                            {box.boxName}
                                        </Typography>
                                        <Typography>
                                            <strong>Full Name:</strong> {box.fullName}
                                        </Typography>
                                        <Typography>
                                            <strong>Position Title:</strong> {box.positionTitle}
                                        </Typography>
                                    </Box>
                                )
                            );
                        })}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="error"
                        sx={{ px: 4 }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SignatoryDetails;
