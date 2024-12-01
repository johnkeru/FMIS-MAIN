import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import { TbUserEdit } from "react-icons/tb";
import RoleReAssign from '../../pages/role/RoleReAssign';

const ReAssignRoleDialog = ({ data }) => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(!isOpen);

    return (
        <div>
            <Button
                variant="contained"
                size='large'
                onClick={handleOpen}
                aria-label="Create new role"
                startIcon={<TbUserEdit />}
            >
                Re-Assign
            </Button>

            <Dialog open={isOpen} maxWidth='xl' fullWidth onClose={handleOpen}>
                <DialogTitle>
                    Re-assign Roles
                </DialogTitle>
                <DialogContent dividers sx={{ p: 0, m: 0, bgcolor: 'background.default' }}>

                    <RoleReAssign data={data} setLoading={setLoading} handleClose={handleClose} />

                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ReAssignRoleDialog;
