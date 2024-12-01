import { Alert, AlertTitle, Autocomplete, Box, Button, Card, CardContent, Fade, TextField, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { useUser } from '../../context/UserContext';
import CustomButton from '../../global/components/CustomButton';
import DashboardHeader from '../../global/components/DashboardHeader';
import TableLoading from '../../global/components/TableLoading';
import { boxConditions, filterEmployees } from './utils';

const fetchTransactionTypes = async () => {
    const response = await api.get('/signatories-options-values');
    return response.data;
};

const SignatoryCreate = () => {
    const nav = useNavigate()
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data) => {
            setLoading(true);
            try {
                const res = await api.post('/create-signatories', data);
                return res.data.message;
            } catch (e) {
                toast.error(e.response.data.error, { duration: 4000 });
                throw e;
            } finally {
                setLoading(false);
            }
        }
    });

    const { currentUser } = useUser()
    const { handleSubmit, control, formState: { errors }, watch, setValue, register } = useForm();
    const [boxes, setBoxes] = useState([]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['transactionTypes'],
        queryFn: fetchTransactionTypes,
    });

    const transactionTypeValue = watch('transactionType', null);
    const payeeValue = watch('payee', null);

    const onSubmit = (formData) => {
        try {
            const payload = {
                user: currentUser.Username[0],
                transactionType: transactionTypeValue.transactionType,
                payee: payeeValue.EmployeeFullName,
                boxA: { ...boxes[0], positionTitle: boxes[0].displayPosition },
                boxB: null,
                boxC: { ...boxes[2], positionTitle: boxes[2].displayPosition },
                boxD: { ...boxes[3], positionTitle: boxes[3].displayPosition },
            }
            mutation.mutate(payload, {
                onSuccess: (message) => {
                    queryClient.invalidateQueries(['signatories', 0]);
                    toast.success(message, { duration: 4000 });
                    nav('/signatories');
                }
            });
        } catch (e) {
            console.log(e);
            toast.error("Something went wrong!", { duration: 4000 });
        }
    };

    useEffect(() => {
        // POSITION
        if (payeeValue && transactionTypeValue && transactionTypeValue.responsibilityCenters[0].type === 'position') {
            const payeePosition = payeeValue.PositionTitle
            const payeeDepartment = payeeValue.Department
            const payeeDivision = payeeValue.Division

            const isDepartmentManager = /Department Manager/i.test(payeePosition) && payeeDepartment !== 'OFFICE OF THE ADMINISTRATOR';
            const isDivisionManager = /Division Manager/i.test(payeePosition)
            let isBelowDivisionManager = !isDepartmentManager && !isDivisionManager
            let isOther = payeeDepartment === 'OFFICE OF THE ADMINISTRATOR'; // Department Manager, under Office of the Administrator (including Top Management, IAS)

            let matchSignatories = null
            if (isDepartmentManager) matchSignatories = transactionTypeValue.responsibilityCenters[0].positions[0]
            else if (isDivisionManager) matchSignatories = transactionTypeValue.responsibilityCenters[0].positions[1]
            else if (isBelowDivisionManager) matchSignatories = transactionTypeValue.responsibilityCenters[0].positions[2]
            else if (isOther) matchSignatories = transactionTypeValue.responsibilityCenters[0].positions[3]
            if (!matchSignatories) return

            const boxes = matchSignatories.boxes

            const updatedBoxes = boxes.map((boxInfo) => {
                const signatory = data.employees.find(emp => boxConditions(boxInfo, emp, payeeDepartment, payeeDivision));
                return {
                    fullName: signatory ? signatory.EmployeeFullName : '',
                    findPosition: boxInfo.findPosition,
                    displayPosition: boxInfo.displayPosition,
                    boxName: boxInfo.name,
                }
            }).filter(Boolean);
            setBoxes(updatedBoxes);
        }
    }, [transactionTypeValue, payeeValue])

    // for alert message purpose
    const [showAlert, setShowAlert] = useState(true);
    const [showing, setShowing] = useState(true);
    const handleExited = () => setShowing(false); // Completely remove the alert from the DOM after fade-out
    useEffect(() => {
        if (boxes.length !== 0) {
            const timer = setTimeout(() => setShowAlert(false), 8000);
            return () => clearTimeout(timer);
        }
    }, [boxes]);

    if (isLoading) return <TableLoading />;

    return (
        <>
            <DashboardHeader
                title="Create Signatories"
                description="Add and manage authorized signatories for streamlined approvals."
            />

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: { xs: 2, sm: 3 } }}>
                {/* Transaction Types Autocomplete */}
                <Card sx={{ p: 2, boxShadow: 3, mb: 3 }}>
                    <CardContent>

                        {/* Payee Autocomplete */}
                        <Controller
                            name="payee"
                            control={control}
                            rules={{ required: 'This field is required' }}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    options={data.employees || []}
                                    getOptionLabel={(option) => option.EmployeeFullName || ''}
                                    getOptionKey={(option) => option.EmployeeID + option.Rate}
                                    value={payeeValue}
                                    onChange={(_, value) => {
                                        field.onChange(value)
                                        if (!value) setBoxes([])
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Payee Full Name"
                                            error={!!errors.payee}
                                            helperText={errors.payee ? errors.payee.message : ''}
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            sx={{ mb: { xs: 1, sm: 2 } }}
                                        />
                                    )}
                                    loading={isLoading}
                                    disabled={isLoading || error}
                                />
                            )}
                        />

                        <Controller
                            name="transactionType"
                            control={control}
                            rules={{ required: 'Transaction type is required' }}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    options={data.transactionTypes || []}
                                    getOptionLabel={(option) => option.transactionType || ''}
                                    value={transactionTypeValue}
                                    onChange={(_, value) => {
                                        field.onChange(value)
                                        if (!value) setBoxes([])
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Transaction Type"
                                            error={!!errors.transactionType}
                                            helperText={errors.transactionType ? errors.transactionType.message : ''}
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            sx={{ mb: { xs: 1, sm: 2 } }}
                                        />
                                    )}
                                    loading={isLoading}
                                    disabled={isLoading || error}
                                />
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Signatory Boxes Display */}
                <Box display={{ xs: 'grid', sm: 'flex' }} gap={2}>
                    {boxes.map((item, index) => (
                        !item.boxName.includes('Box B') ? (
                            <Box key={index} width='100%' display='grid'>
                                <Card sx={{ p: 2, boxShadow: 3, }}>
                                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                                        <Box>
                                            <Typography variant="h6" fontWeight={600} color="primary">{`${item.boxName.toUpperCase()}`}</Typography>
                                            <Autocomplete
                                                size='small'
                                                freeSolo
                                                options={data.positionTitles}
                                                getOptionLabel={(option) => (typeof option === 'string' ? option : option.displayPosition || '')}
                                                value={item.displayPosition || ''} // Reflect the value from the boxes
                                                inputValue={boxes[index]?.displayPosition || ''} // Sync inputValue with the boxes state
                                                onChange={(_, value) => {
                                                    setBoxes((prev) => prev.map((box, i) => i === index ? {
                                                        ...box, ...value, fullName: !value ? '' : filterEmployees({ employees: data.employees, positionTitle: value.findPosition })[0].EmployeeFullName
                                                    } : box))
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Position Title"
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                    />
                                                )}
                                            />

                                        </Box>

                                        <Autocomplete
                                            freeSolo
                                            options={filterEmployees({ employees: data.employees, positionTitle: item.findPosition }) || []}
                                            getOptionLabel={(option) => (typeof option === 'string' ? option : option.EmployeeFullName || '')}
                                            value={boxes[index]?.fullName || ''} // Reflect the value from the boxes
                                            inputValue={boxes[index]?.fullName || ''} // Sync inputValue with the boxes state
                                            onInputChange={(_, inputValue) => {
                                                setBoxes((prev) =>
                                                    prev.map((box, i) =>
                                                        i === index ? { ...box, fullName: inputValue } : box
                                                    )
                                                );
                                            }}
                                            onChange={(_, value) => {
                                                const fullName = typeof value === 'string' ? value : value?.EmployeeFullName || '';
                                                setBoxes((prev) =>
                                                    prev.map((box, i) =>
                                                        i === index ? { ...box, fullName: fullName } : box
                                                    )
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Full Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                />
                                            )}
                                        />


                                    </CardContent>
                                </Card>
                            </Box>
                        ) : undefined
                    ))}
                </Box>

                {boxes.length > 0 && showing && (
                    <Fade
                        in={showAlert}
                        timeout={{ enter: 500, exit: 500 }}
                        onExited={handleExited} // Once the animation ends, remove the alert
                    >
                        <Alert
                            severity="warning"
                            sx={{
                                mt: 4,
                                p: 2, // Add padding for a spacious feel
                                border: 1,
                                color: "warning.dark", // Darker text for contrast
                            }}
                            action={
                                <Button color="inherit" size="small" onClick={() => setShowAlert(false)}>
                                    DISMISS
                                </Button>
                            }
                        >
                            <AlertTitle sx={{ fontWeight: "bold", mb: 1 }}>Note</AlertTitle>
                            The system provides an initial recommendation for the appropriate signatories.
                            <strong>Please verify the details and ensure accuracy before submitting.</strong>
                        </Alert>
                    </Fade>
                )}


                <CustomButton
                    // allow={showing} 
                    loading={loading} type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 5, py: 1.7 }}>
                    Submit
                </CustomButton>

            </Box>
        </>
    );
};

export default SignatoryCreate;