import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import api from '../../config/api';
import { MdEdit } from 'react-icons/md';
import CustomButton from '../../global/components/CustomButton';

// Validation schema using Yup
const schema = yup.object().shape({
    name: yup.string().required('Role Name is required'),
    permission: yup.string().required('Permissions are required'),
});

const EditRoleDialog = ({ data: role, handleCloseMenu }) => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) => {
            setLoading(true);
            try {
                const res = await api.put(`/update-role/${role._id}`, data);  // Assuming the API takes the role ID in the URL
                return res.data.message;
            } catch (e) {
                toast.error(e.response.data.error, { duration: 4000 });
                throw e;
            } finally {
                setLoading(false);
            }
        },
    });

    // Initialize the form with react-hook-form
    const { control, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
        resolver: yupResolver(schema),
    });

    // Populate the form with the role's data when the modal is opened
    useEffect(() => {
        if (role) {
            reset({
                name: role.name || '',
                permission: role.permission || '',
            });
        }
    }, [role, reset]);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        reset()
        handleCloseMenu();
    }

    const onSubmit = async (data) => {
        try {
            mutation.mutate(data, {
                onSuccess: (message) => {
                    queryClient.invalidateQueries(['roles']);
                    toast.success(message, { duration: 4000 });
                    handleClose();
                },
            });
        } catch (e) {
            toast.error('Something went wrong!', { duration: 4000 });
        }
    };

    return (
        <Box>
            <MenuItem onClick={handleOpen} sx={{ display: 'flex', gap: 2 }}>
                <MdEdit />
                Edit
            </MenuItem>

            <Dialog open={isOpen} onClose={!isDirty ? handleClose : handleOpen}>
                <DialogTitle>Edit Role</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body2" gutterBottom mb={2}>
                        Update the details for the role <strong>{role.name}</strong>.
                    </Typography>

                    {/* Role Name Field */}
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Role Name"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                                variant="outlined"
                                required
                            />
                        )}
                    />

                    {/* Permissions Field */}
                    <Controller
                        name="permission"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Permissions"
                                fullWidth
                                multiline
                                rows={3}
                                error={!!errors.permission}
                                helperText={errors.permission ? errors.permission.message : ''}
                                margin="normal"
                                variant="outlined"
                                required
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <CustomButton loading={loading} plain color='error' onClick={handleClose}>
                        Cancel
                    </CustomButton>
                    <CustomButton loading={loading} color='info' allow={!isDirty} onClick={handleSubmit(onSubmit)}>
                        Update
                    </CustomButton>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default EditRoleDialog;



