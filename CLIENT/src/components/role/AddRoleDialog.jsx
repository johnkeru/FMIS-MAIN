import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import api from '../../config/api';
import { IoMdAdd } from "react-icons/io";
import CustomButton from '../../global/components/CustomButton';


// Validation schema using Yup
const schema = yup.object().shape({
    name: yup.string().required('Role Name is required'),
    permission: yup.string().required('Permissions are required'),
});

const AddRoleDialog = () => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data) => {
            setLoading(true);
            try {
                const res = await api.post('/create-role', data);
                return res.data.message;
            } catch (e) {
                toast.error(e.response.data.error, { duration: 4000 });
                throw e;
            } finally {
                setLoading(false);
            }
        }
    });

    // Initialize the form with react-hook-form
    const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => {
        setIsOpen(!isOpen);
        if (isOpen) reset(); // Reset the form when closing
    }

    const onSubmit = async (data) => {
        try {
            mutation.mutate(data, {
                onSuccess: (message) => {
                    queryClient.invalidateQueries(['roles']);
                    toast.success(message, { duration: 4000 });
                    handleClose();
                }
            });
        } catch (e) {
            console.log(e);
            toast.error("Something went wrong!", { duration: 4000 });
        }
    };

    return (
        <div>
            <Button
                variant="contained"
                size='large'
                onClick={handleOpen}
                aria-label="Create new role"
                startIcon={<IoMdAdd />}
            >
                Create Role
            </Button>

            <Dialog open={isOpen} onClose={!isValid ? handleClose : handleOpen}>
                <DialogTitle>Add New Role</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body2" gutterBottom mb={2}>
                        Provide the details below to create a new role within FMIS.
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
                    <CustomButton loading={loading} allow={!isValid} onClick={handleSubmit(onSubmit)}>
                        Create
                    </CustomButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddRoleDialog;
