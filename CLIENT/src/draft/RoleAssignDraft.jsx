import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import api from '../../config/api';
import { useUser } from '../../context/UserContext';
import CustomButton from '../../global/components/CustomButton';
import DashboardHeader from '../../global/components/DashboardHeader';
import TableLoading from '../../global/components/TableLoading';
import { useNavigate } from 'react-router-dom';

// Update schema to include fullName validation
const schema = yup.object().shape({
    fullName: yup.string().required('Full Name is required'), // Add validation for fullName
    sixDigitInput: yup.string()
        .length(6, 'Must be exactly 6 digits')
        .matches(/^\d{6}$/, 'Must be a number with exactly 6 digits')
        .required('This field is required'),
    roles: yup.array()
        .of(yup.string().required())
        .min(1, 'At least one role must be selected'), // Custom validation for roles
});

const RolesComponent = ({ roles, currentUser }) => {
    const queryClient = useQueryClient();
    const nav = useNavigate()
    const [loading, setLoading] = useState(false);
    const defaultValues = {}; // Initialize default values for roles
    roles.forEach(role => {
        defaultValues[`role_${role._id}`] = false; // Set all roles to false initially
    });

    const { handleSubmit, control, setError, watch, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ...defaultValues,
            fullName: '', // Default value for fullName
            sixDigitInput: '', // Default value for the 6-digit input
        },
    });

    const [checkedRoles, setCheckedRoles] = useState({});

    const groupedRoles = roles.reduce((acc, role) => {
        const prefix = role.name.split(' ')[0].toUpperCase();
        if (!acc[prefix]) {
            acc[prefix] = [];
        }
        acc[prefix].push(role);
        return acc;
    }, {});

    const handleCheckboxChange = (id, isAdmin, prefix) => {
        setError('roles', { message: '', type: 'required' });

        setCheckedRoles(prev => {
            const updated = { ...prev };

            if (updated[id]) {
                delete updated[id]; // Remove the role ID if it was checked
            } else {
                updated[id] = true; // Add the role ID if it is checked
            }

            // If the role is an admin, uncheck or check all roles in that group
            if (isAdmin) {
                groupedRoles[prefix].forEach(role => {
                    if (role._id !== id) {
                        // Remove or add based on the admin's state
                        if (updated[id]) {
                            updated[role._id] = true;
                        } else {
                            delete updated[role._id];
                        }
                    }
                });
            }

            return updated;
        });
    };

    console.log(checkedRoles)


    const handleCheckIfEmptyInput = () => {
        if (!watch('sixDigitInput'))
            toast.error('6-digit input cannot be empty', { position: 'top-right' });
        else if (!watch('fullName'))
            toast.error('Full Name cannot be empty', { position: 'top-right' });
    };

    const handleResetAfter = () => {
        reset();
        setCheckedRoles({});
        nav('/role-management/roles-assigned')
    };

    const onSubmit = (data) => {
        const selectedIds = Object.keys(checkedRoles).filter(roleId => checkedRoles[roleId]);

        // Check if at least one role is selected
        if (selectedIds.length === 0) {
            setError('roles', { message: "At least one role must be selected.", type: 'required' });
            toast.error('You must select at least one role', { position: 'top-right' });
            return; // Prevent submission if no roles are selected
        }

        setLoading(true);
        const payload = {
            fullName: data.fullName, // Include fullName in the payload
            user: data.sixDigitInput,
            roles: selectedIds,
            assignedBy: currentUser.Username[0],
        };

        api.post('/assign-role', payload)
            .then((res) => {
                toast.success(res.data.message, { duration: 4000 });
                queryClient.invalidateQueries(['roles_assigned'])
                handleResetAfter();
            })
            .catch(err => toast.error(err.response.data.error, { duration: 4000 }))
            .finally(() => setLoading(false));
    };

    return (
        <Box position='relative'>
            <DashboardHeader title="Assign Roles" description="Manage user roles" />

            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" alignItems="center">
                <Box sx={{ width: '100%', px: 3, py: 2 }}>
                    {/* Add fullName input */}
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Full Name"
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error ? fieldState.error.message : ''}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />

                    <Controller
                        name="sixDigitInput"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Enter 6 Digits"
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error ? fieldState.error.message : ''}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />

                    {Object.keys(groupedRoles).map(prefix => (
                        <Box key={prefix} sx={{ marginTop: 2 }}>
                            <Typography variant="h6" fontWeight={600} p={.5} px={1} color='white' sx={{ background: 'rgba(61, 128, 63, .85)' }}>{prefix} SYSTEM</Typography>
                            <FormGroup>
                                {groupedRoles[prefix].map(role => (
                                    <FormControlLabel
                                        sx={{
                                            ml: role.name.includes('ADMIN') ? 0 : 2.7,
                                            fontWeight: role.name.includes('ADMIN') ? 600 : 500,
                                            borderLeft: '1px solid rgba(55, 94, 56, .2)',
                                            borderBottom: '1px solid rgba(55, 94, 56, .2)',
                                            ":hover": { background: 'rgba(55, 94, 56, .2)' },
                                        }}
                                        key={role._id}
                                        control={
                                            <Controller
                                                name={`role_${role._id}`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Box width='100%' display='flex' alignItems='center'>
                                                        <Checkbox
                                                            color='secondary'
                                                            {...field}
                                                            checked={checkedRoles[role._id] || false} // Bind checkbox state to checkedRoles
                                                            onChange={() => {
                                                                handleCheckboxChange(role._id, role.name.endsWith('ADMIN'), prefix);
                                                                field.onChange(!checkedRoles[role._id]); // Toggle the checkbox value
                                                            }}
                                                        />
                                                        <Box
                                                            width='100%'
                                                            display='flex'
                                                            alignItems='center'
                                                            justifyContent='space-between'
                                                        >
                                                            {role.name} <span style={{ color: '#787878' }}>{role.permission}</span>
                                                        </Box>
                                                    </Box>
                                                )}
                                            />
                                        }
                                    />

                                ))}
                            </FormGroup>
                        </Box>
                    ))}

                    {/* Error for roles */}
                    {errors?.roles && (
                        <Typography color="error" variant="subtitle2" sx={{ marginTop: 1 }}>
                            {errors.roles.message}
                        </Typography>
                    )}
                </Box>

                <Box sx={{ position: 'sticky', width: '100%', bottom: 0, left: 0, py: 5, px: 3, mt: 5, bgcolor: 'background.default', borderTop: 2, borderColor: '#c0c0c0' }}>
                    <CustomButton sx={{ py: 1.5, }} onClick={handleCheckIfEmptyInput} fullWidth type='submit' loading={loading} size='large'>
                        Assign Roles
                    </CustomButton>
                </Box>
            </Box>
        </Box>
    );
};


export default function RoleAssign() {
    const { currentUser } = useUser()

    const { data: roles, isLoading } = useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const roleNames = currentUser.Roles;
            const queryParams = roleNames.map(role => `roles=${encodeURIComponent(role)}`).join('&');
            const res = await api.get(`roles?${queryParams}`);
            return res.data.roles;
        },
    });
    if (isLoading) return <TableLoading />;
    return <RolesComponent roles={roles} currentUser={currentUser} />

}