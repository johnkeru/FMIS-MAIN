import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
    Box,
    Button,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel,
    Divider,
} from '@mui/material';
import { MdOutlineAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import DashboardHeader from '../../global/components/DashboardHeader';

const CreateTransactionType = () => {
    const { control, register, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: {
            transactionType: '',
            responsibilityCenters: [
                {
                    particular: '', // Example particular
                    payeeTypes: [
                        {
                            payeeType: '', boxes: [
                                { name: 'BOX A CERTIFIED', },
                                { name: 'BOX C CERTIFIED', },
                                { name: 'BOX D APPROVED FOR PAYMENT', },
                            ]
                        }, // Default payee type
                    ],
                },
            ],
        },
    });

    const { fields: responsibilityCenters, append: addResponsibilityCenter, remove: removeResponsibilityCenter } = useFieldArray({
        control,
        name: 'responsibilityCenters',
    });

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        // reset();
    };

    return (
        <>
            <DashboardHeader
                title='Create New Transaction Type'
                description='Add a new transaction type'
            />

            <Box sx={{ m: 2, p: 2, position: 'relative' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                        Transaction Type:
                    </Typography>
                    <Box sx={{ mb: 3, bgcolor: 'white', }}>
                        <TextField
                            {...register('transactionType')}
                            label="Transaction Type"
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                            Responsibility Centers:
                        </Typography>
                        {responsibilityCenters.map((rc, rcIndex) => (
                            <Box key={rc.id} sx={{ p: 3, mb: 3, border: 1, borderColor: '#d4d4d4', bgcolor: '#fff' }}>
                                <TextField
                                    {...register(`responsibilityCenters.${rcIndex}.particular`)}
                                    label="Particular"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 3 }}
                                />
                                <Typography variant="h6" gutterBottom fontWeight={600}>
                                    Payee Types:
                                </Typography>
                                <PayeeTypeFields watch={watch} control={control} register={register} rcIndex={rcIndex} />
                                {responsibilityCenters.length > 1 ? <Box textAlign="right" mt={2}>
                                    <Button variant='outlined' color='error' onClick={() => removeResponsibilityCenter(rcIndex)} startIcon={<FaMinus />}>
                                        Remove Responsibilit Center
                                    </Button>
                                </Box> : undefined}
                            </Box>
                        ))}
                        <Button
                            startIcon={<MdOutlineAdd />}
                            onClick={() => {
                                // Add responsibility center with one default payee type
                                addResponsibilityCenter({ particular: '', payeeTypes: [{ payeeType: '', boxes: [] }] });
                            }}
                            variant="contained"
                            color="secondary"
                        >
                            Add Responsibility Center
                        </Button>
                    </Box>
                    <Divider sx={{ my: 3 }} />
                    <Button type="submit" variant="contained" color="primary" fullWidth size='large'>
                        Submit
                    </Button>
                </form>
            </Box>
        </>
    );
};

const PayeeTypeFields = ({ watch, control, register, rcIndex }) => {
    const { fields: payeeTypes, append: addPayeeType, remove: removePayeeType } = useFieldArray({
        control,
        name: `responsibilityCenters.${rcIndex}.payeeTypes`,
    });

    return (
        <Box border={1} borderColor='#d4d4d4' bgcolor='background.default'>
            <Box sx={{ p: 3, }}>
                {payeeTypes.map((pt, ptIndex) => (
                    <Box key={pt.id} py={3} borderBottom={2} borderColor='#d4d4d4'>
                        <Box sx={{ mb: 3, bgcolor: 'white', }}>
                            <TextField
                                {...register(`responsibilityCenters.${rcIndex}.payeeTypes.${ptIndex}.payeeType`)}
                                label="Payee Type"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            Boxes:
                        </Typography>
                        <BoxFields watch={watch} control={control} register={register} rcIndex={rcIndex} ptIndex={ptIndex} />
                        {payeeTypes.length > 1 ? <Box textAlign="right" mt={2}>
                            <Button variant='outlined' color='error' onClick={() => removePayeeType(ptIndex)} startIcon={<FaMinus />}>
                                Remove Payee Type
                            </Button>
                        </Box> : undefined}
                    </Box>
                ))}
                <Button
                    startIcon={<MdOutlineAdd />}
                    onClick={() => addPayeeType({ payeeType: '', boxes: [] })}
                    variant="outlined"
                    sx={{ mt: 2 }}
                >
                    Add Payee Type
                </Button>
            </Box>
        </Box>
    );
};

const BoxFields = ({ control, watch, register, rcIndex, ptIndex }) => {
    const predefinedBoxes = ['BOX A CERTIFIED', 'BOX C CERTIFIED', 'BOX D APPROVED FOR PAYMENT'];

    return (
        <Box display={{ xs: 'grid', md: 'flex' }} flexWrap="wrap" gap={2}>
            {predefinedBoxes.map((box, boxIndex) => {

                let disableDepartment = false
                let disableDivision = false
                const currentBox = watch(`responsibilityCenters.${rcIndex}.payeeTypes.${ptIndex}.boxes[${boxIndex}]`);
                if (currentBox && currentBox.isPayeeDepartmentDependent) disableDepartment = true
                if (currentBox && currentBox.isPayeeDivisionDependent) disableDivision = true

                return <Box key={boxIndex} sx={{ p: 2, pt: 3, boxShadow: 1, bgcolor: 'white', flex: '1 0 30%', }}>
                    <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
                        {box}
                    </Typography>

                    <TextField
                        {...register(`responsibilityCenters.${rcIndex}.payeeTypes.${ptIndex}.boxes.${boxIndex}.displayPosition`)}
                        label="Display Position"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Department
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                        <TextField
                            {...register(`responsibilityCenters.${rcIndex}.payeeTypes.${ptIndex}.boxes.${boxIndex}.department`)}
                            label="Department"
                            variant="outlined"
                            fullWidth
                            disabled={disableDepartment}
                            sx={{ width: 'auto' }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    {...register(
                                        `responsibilityCenters.${rcIndex}.payeeTypes.${ptIndex}.boxes.${boxIndex}.isPayeeDepartmentDependent`
                                    )}
                                />
                            }
                            label="Payee's Department"
                            sx={{ width: 'auto' }}
                        />
                    </Box>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Division
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                        <TextField
                            {...register(`responsibilityCenters.${rcIndex}.payeeTypes.${ptIndex}.boxes.${boxIndex}.division`)}
                            label="Division"
                            variant="outlined"
                            fullWidth
                            disabled={disableDivision}
                            sx={{ width: 'auto' }}
                        />
                        <FormControlLabel
                            sx={{ width: 'auto' }}
                            control={
                                <Checkbox
                                    {...register(
                                        `responsibilityCenters.${rcIndex}.payeeTypes.${ptIndex}.boxes.${boxIndex}.isPayeeDivisionDependent`
                                    )}
                                />
                            }
                            label="Payee's Division"
                        />
                    </Box>
                </Box>
            })}
        </Box>
    );
};

export default CreateTransactionType;
