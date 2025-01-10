import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { MdOutlineAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import DashboardHeader from "../../global/components/DashboardHeader";

const CreateTransactionType = () => {
  const { control, register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      reportName: "",
      transactionType: "",
      responsibilityCenters: [
        {
          particular: "", // Example particular
          positionTypes: [
            {
              positionType: "",
              boxes: [
                { name: "BOX A CERTIFIED" },
                { name: "BOX C CERTIFIED" },
                { name: "BOX D APPROVED FOR PAYMENT" },
              ],
            }, // Default payee type
          ],
        },
      ],
    },
  });

  const {
    fields: responsibilityCenters,
    append: addResponsibilityCenter,
    remove: removeResponsibilityCenter,
  } = useFieldArray({
    control,
    name: "responsibilityCenters",
  });

  const onSubmit = (data) => {
    console.log(data);
    // reset();
  };

  return (
    <>
      <DashboardHeader
        title="Create New Transaction Type"
        description="Add a new transaction type"
      />

      <Box sx={{ m: 2, p: 2, position: "relative" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
            Report Name:
          </Typography>
          <Box sx={{ mb: 3, bgcolor: "white" }}>
            <TextField
              {...register("reportName")}
              label="Report Name"
              variant="outlined"
              fullWidth
              size="small"
            />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
            Transaction Type:
          </Typography>
          <Box sx={{ mb: 3, bgcolor: "white" }}>
            <TextField
              {...register("transactionType")}
              label="Transaction Type"
              variant="outlined"
              fullWidth
              size="small"
            />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
              Responsibility Centers:
            </Typography>
            {responsibilityCenters.map((rc, rcIndex) => (
              <Box
                key={rc.id}
                sx={{
                  p: 3,
                  mb: 3,
                  border: 1,
                  borderColor: "#d4d4d4",
                  bgcolor: "#fff",
                }}
              >
                <TextField
                  {...register(`responsibilityCenters.${rcIndex}.particular`)}
                  label="Particular"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3 }}
                  size="small"
                />
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Position Types:
                </Typography>
                <PositionTypeFields
                  watch={watch}
                  control={control}
                  register={register}
                  rcIndex={rcIndex}
                />
                {responsibilityCenters.length > 1 ? (
                  <Box textAlign="right" mt={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeResponsibilityCenter(rcIndex)}
                      startIcon={<FaMinus />}
                    >
                      Remove Responsibilit Center
                    </Button>
                  </Box>
                ) : undefined}
              </Box>
            ))}
            <Button
              startIcon={<MdOutlineAdd />}
              onClick={() => {
                // Add responsibility center with one default payee type
                addResponsibilityCenter({
                  particular: "",
                  positionTypes: [{ positionType: "", boxes: [] }],
                });
              }}
              variant="contained"
              color="secondary"
            >
              Add Responsibility Center
            </Button>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

const PositionTypeFields = ({ watch, control, register, rcIndex }) => {
  const {
    fields: positionTypes,
    append: addPositionType,
    remove: removePositionType,
  } = useFieldArray({
    control,
    name: `responsibilityCenters.${rcIndex}.positionTypes`,
  });

  return (
    <Box border={1} borderColor="#d4d4d4" bgcolor="background.default">
      <Box sx={{ p: 3 }}>
        {positionTypes.map((pt, ptIndex) => (
          <Box key={pt.id} py={3} borderBottom={2} borderColor="#d4d4d4">
            <Box sx={{ mb: 3, bgcolor: "white" }}>
              <TextField
                {...register(
                  `responsibilityCenters.${rcIndex}.positionTypes.${ptIndex}.positionType`
                )}
                label="Payee Type"
                variant="outlined"
                fullWidth
                size="small"
              />
            </Box>
            <Typography variant="h6" gutterBottom>
              Boxes:
            </Typography>
            <BoxFields
              watch={watch}
              control={control}
              register={register}
              rcIndex={rcIndex}
              ptIndex={ptIndex}
            />
            {positionTypes.length > 1 ? (
              <Box textAlign="right" mt={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removePositionType(ptIndex)}
                  startIcon={<FaMinus />}
                >
                  Remove Payee Type
                </Button>
              </Box>
            ) : undefined}
          </Box>
        ))}
        <Button
          startIcon={<MdOutlineAdd />}
          onClick={() => addPositionType({ positionType: "", boxes: [] })}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Add Payee Type
        </Button>
      </Box>
    </Box>
  );
};

const BoxFields = ({ watch, register, rcIndex, ptIndex }) => {
  const predefinedBoxes = [
    "BOX A CERTIFIED",
    "BOX C CERTIFIED",
    "BOX D APPROVED FOR PAYMENT",
  ];

  return (
    <Box display={{ xs: "grid", md: "flex" }} flexWrap="wrap" gap={2}>
      {predefinedBoxes.map((box, boxIndex) => {
        // Watch the current box and its dependent values
        const departmentValue = watch(
          `responsibilityCenters.${rcIndex}.positionTypes.${ptIndex}.boxes.${boxIndex}.department`
        );
        const divisionValue = watch(
          `responsibilityCenters.${rcIndex}.positionTypes.${ptIndex}.boxes.${boxIndex}.division`
        );
        const isPayeeDepartmentDependent = watch(
          `responsibilityCenters.${rcIndex}.positionTypes.${ptIndex}.boxes.${boxIndex}.isPayeeDepartmentDependent`
        );
        const isPayeeDivisionDependent = watch(
          `responsibilityCenters.${rcIndex}.positionTypes.${ptIndex}.boxes.${boxIndex}.isPayeeDivisionDependent`
        );

        // Determine disabled states for department and division
        const disableDepartment = !!isPayeeDepartmentDependent;
        const disablePayeeDepartmentCheckbox = !!departmentValue;
        const disableDivision = !!isPayeeDivisionDependent;
        const disablePayeeDivisionCheckbox = !!divisionValue;

        return (
          <Box
            key={boxIndex}
            sx={{
              p: 2,
              pt: 3,
              boxShadow: 1,
              border: 3,
              borderColor: "rgba(55, 94, 56, .8)",
              bgcolor: "white",
              flex: "1 0 30%",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
              {box}
            </Typography>

            <TextField
              {...register(
                `responsibilityCenters.${rcIndex}.positionTypes.${ptIndex}.boxes.${boxIndex}.displayPosition`
              )}
              label="Display Position"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              size="small"
            />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Department
            </Typography>

            <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
              <TextField
                {...register(
                  `responsibilityCenters.${rcIndex}.positionTypes.${ptIndex}.boxes.${boxIndex}.department`
                )}
                label="Department"
                variant="outlined"
                fullWidth
                disabled={disableDepartment}
                sx={{ width: "auto" }}
                size="small"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...register(
                      `responsibilityCenters.${rcIndex}.positionTypes.${ptIndex}.boxes.${boxIndex}.isPayeeDepartmentDependent`
                    )}
                    disabled={disablePayeeDepartmentCheckbox}
                  />
                }
                label="Payee's Department"
                sx={{ width: "auto" }}
              />
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Division
            </Typography>
            <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
              <TextField
                {...register(
                  `responsibilityCenters.${rcIndex}.positionTypes.${ptIndex}.boxes.${boxIndex}.division`
                )}
                label="Division"
                variant="outlined"
                fullWidth
                disabled={disableDivision}
                sx={{ width: "auto" }}
                size="small"
              />
              <FormControlLabel
                sx={{ width: "auto" }}
                control={
                  <Checkbox
                    {...register(
                      `responsibilityCenters.${rcIndex}.positionTypes.${ptIndex}.boxes.${boxIndex}.isPayeeDivisionDependent`
                    )}
                    disabled={disablePayeeDivisionCheckbox}
                  />
                }
                label="Payee's Division"
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default CreateTransactionType;
