import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import api from '../../config/api';
import CustomButton from '../../global/components/CustomButton';
import { LuArchiveRestore } from "react-icons/lu";

const DeleteRoleDialog = ({ data: role, handleCloseMenu, currentTab }) => {
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()

    const mutate = useMutation({
        mutationFn: async (id) => {
            setLoading(true)
            try {
                const res = await api.delete(`/delete-role/${id}?tab=${currentTab}`)
                return res.data.message
            } catch (e) {
                throw e
            } finally {
                setLoading(false)
            }
        }
    })

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        handleCloseMenu();
    }
    const handleOpen = () => setIsOpen(true);

    const handleDelete = () => {
        mutate.mutate(role._id, {
            onSuccess: (message) => {
                queryClient.invalidateQueries(['roles'])
                toast.success(message)
                handleClose();
            },
            onError: () => toast.error('Failed to delete role', { duration: 4000 })
        })
        setIsOpen(false); // Close the modal after deletion
    };

    return (
        <div>
            <MenuItem onClick={handleOpen} sx={{ display: 'flex', gap: 2 }}>
                {currentTab == 'active' ? <MdDelete /> : <LuArchiveRestore />}
                {currentTab == 'active' ? 'Disable' : 'Enable'}
            </MenuItem>

            <Dialog open={isOpen} onClose={loading ? handleOpen : handleClose} maxWidth='xs'>
                <DialogTitle>
                    {currentTab == 'active' ? 'Confirm Disable' : 'Enable Role'}
                </DialogTitle>
                <DialogContent dividers>
                    {
                        currentTab == 'active' ?
                            <Typography variant="body2" gutterBottom>
                                Are you sure you want to disable the role <strong>{role.name}</strong>? All users assigned to this role will be set as <strong>USER</strong>.
                            </Typography> :
                            <Typography variant="body2" gutterBottom>
                                Are you sure you want to enable the role <strong>{role.name}</strong>?
                            </Typography>
                    }
                </DialogContent>
                <DialogActions>
                    <CustomButton loading={loading} plain color='error' onClick={handleClose}>
                        Cancel
                    </CustomButton>
                    <CustomButton loading={loading} color={currentTab == 'active' ? 'error' : 'success'} onClick={handleDelete}>
                        {
                            currentTab == 'active' ? 'Disable' : 'Enable'
                        }
                    </CustomButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteRoleDialog;
