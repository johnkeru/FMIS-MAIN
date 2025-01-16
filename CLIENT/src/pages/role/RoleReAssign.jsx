import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardContent, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import api from '../../config/api';
import { useUser } from '../../context/UserContext';
import CustomButton from '../../global/components/CustomButton';
import TableLoading from '../../global/components/TableLoading';

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

const RolesComponent = ({ roles, currentUser, data, setLoading: setParentLoading, handleClose }) => {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false);

    // Initialize default values for roles and other fields
    const defaultValues = {
        fullName: data.fullName || '', // Default value for fullName
        sixDigitInput: data.user || '', // Default value for the 6-digit input
    };

    const [savePrefixs, setSavePrefixs] = useState([]);

    // Set checkedRoles based on the current user's roles
    const initialCheckedRoles = {};
    data.roles.forEach(role => {
        initialCheckedRoles[role._id] = true; // Mark roles as checked
    });

    useEffect(() => {
        data.roles.forEach(role => {
            setSavePrefixs(prev => [...prev, { id: role._id, name: role.name.split(' ')[0] }])
        });
    }, [])

    const { handleSubmit, control, setError, watch, reset, formState: { errors, isDirty, isValid } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ...defaultValues,
            ...roles.reduce((acc, role) => {
                acc[`role_${role._id}`] = initialCheckedRoles[role._id] || false; // Set role checkbox based on current user
                return acc;
            }, {})
        },
    });

    const [checkedRoles, setCheckedRoles] = useState(initialCheckedRoles);

    const groupedRoles = roles.reduce((acc, role) => {
        const prefix = role.name.split(' ')[0].toUpperCase();
        if (!acc[prefix]) {
            acc[prefix] = [];
        }
        acc[prefix].push(role);
        return acc;
    }, {});

    const handleCheckboxChange = (id, name, prefix) => {
        const isAdmin = name.endsWith('ADMIN')
        const getPrefix = name.split(' ')[0].toUpperCase();
        setError('roles', { message: '', type: 'required' });
        setCheckedRoles(prev => {
            const updated = { ...prev };

            if (updated[id]) {
                setSavePrefixs(prev => prev.filter(role => role.id !== id))
                delete updated[id]; // Remove the role ID if it was checked
            } else {
                setSavePrefixs(prev => [...prev, { name: getPrefix, id }])
                updated[id] = true; // Add the role ID if it is checked
            }

            // If the role is an admin, uncheck or check all roles in that group
            if (isAdmin) {
                groupedRoles[prefix].forEach(role => {
                    if (role._id !== id) {
                        // Remove or add based on the admin's state
                        if (updated[id]) {
                            updated[role._id] = true;
                            setSavePrefixs(prev => [...prev, { name: getPrefix, id }])
                        } else {
                            setSavePrefixs([])
                            delete updated[role._id];
                        }
                    }
                });
            }

            return updated;
        });
    };

    const handleCheckIfEmptyInput = () => {
        if (!watch('sixDigitInput')) {
            toast.error('6-digit input cannot be empty', { position: 'top-right' });
        }
        else if (!watch('fullName')) {
            toast.error('Full Name cannot be empty', { position: 'top-right' });
        }
    };

    const handleResetAfter = () => {
        reset();
        setCheckedRoles({});
    };

    const onSubmit = (data) => {
        const selectedIds = Object.keys(checkedRoles).filter(roleId => checkedRoles[roleId]);

        // Check if at least one role is selected
        // UPDATED as of: 1/16/25. uncomment this if you want to prevent submission if no roles are selected
        // if (selectedIds.length === 0) {
        //     setError('roles', { message: "At least one role must be selected.", type: 'required' });
        //     toast.error('You must select at least one role', { position: 'top-right' });
        //     return; // Prevent submission if no roles are selected
        // }
        setParentLoading(true)
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
                handleResetAfter();
                queryClient.invalidateQueries(['roles_assigned'])
            })
            .catch(err => toast.error(err.response.data.error, { duration: 4000 }))
            .finally(() => {
                setLoading(false)
                setParentLoading(false)
                handleClose()
            });
    };


    return (
        <>
            <Box position='relative' component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" alignItems="center">
                <Box sx={{ width: '100%', py: 2, px: 3 }}>
                    <Card sx={{ p: { xs: 1, sm: 2 }, boxShadow: 1, mb: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom fontWeight={600} color={grey[800]}>User Details*</Typography>
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
                        </CardContent>
                    </Card>

                    <Card sx={{ p: 1, boxShadow: 1, mb: 1 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom fontWeight={600} color={grey[800]}>Roles*</Typography>

                            {/* Error for roles */}
                            {errors?.roles && (
                                <Typography color="error" variant="subtitle2" sx={{ mt: 2 }}>
                                    {errors.roles.message}
                                </Typography>
                            )}

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
                                                            <Box width='100%' display='flex' alignItems='center' sx={{ cursor: savePrefixs.length === 0 ? false : !savePrefixs.some(rle => role.name.toUpperCase().includes(rle.name)) ? 'not-allowed' : 'pointer' }}>
                                                                <Checkbox
                                                                    disabled={savePrefixs.length === 0 ? false : !savePrefixs.some(rle => role.name.toUpperCase().includes(rle.name))}
                                                                    color='secondary'
                                                                    {...field}
                                                                    checked={checkedRoles[role._id] || false} // Bind checkbox state to checkedRoles
                                                                    onChange={() => {
                                                                        handleCheckboxChange(role._id, role.name, prefix);
                                                                        field.onChange(!checkedRoles[role._id]); // Toggle the checkbox value
                                                                    }}
                                                                />
                                                                <Box
                                                                    width='100%'
                                                                    display='flex'
                                                                    alignItems='center'
                                                                    justifyContent='space-between'
                                                                    color={savePrefixs.length === 0 ? false : !savePrefixs.some(rle => role.name.toUpperCase().includes(rle.name)) ? grey[500] : 'inherit'}
                                                                >
                                                                    {role.name} <Typography sx={{ display: { xs: 'none', md: 'block' } }}>{role.permission}</Typography>
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
                        </CardContent>
                    </Card>


                </Box>
                <Box
                    sx={{
                        position: 'sticky',
                        width: '100%',
                        zIndex: 10,
                        bottom: -1.5,
                        left: 0,
                        p: 2,
                        pb: 3,
                        mt: 5,
                        bgcolor: 'rgba(255, 255, 255)', // Semi-transparent background
                        borderTop: 2,
                        borderColor: '#c0c0c0',
                        borderRadius: 2, // Optional: rounded corners for a polished look
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: subtle shadow for depth
                    }}
                >
                    <CustomButton allow={!isDirty} sx={{ py: 1.4 }} onClick={handleCheckIfEmptyInput} fullWidth type='submit' loading={loading} size='large'>
                        Assign Roles
                    </CustomButton>
                </Box>
            </Box>
        </>
    );
};



export default function RoleReAssign({ data, setLoading, handleClose }) {
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
    return <RolesComponent roles={roles} currentUser={currentUser} data={data} setLoading={setLoading} handleClose={handleClose} />

}