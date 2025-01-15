import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { POSITION_TYPES } from "../../../utils/lists";

const BoxFields = ({
  data,
  watch,
  register,
  rcIndex,
  ptIndex,
  control,
  errors,
}) => {
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

            <Controller
              name={`responsibilityCenters.${rcIndex}.positionTypes.${ptIndex}.boxes.${boxIndex}.displayPosition`}
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => {
                // Extract list of displayPosition strings from data.positionTitles
                const displayPositionOptions =
                  data.positionTitles?.map((item) => item.displayPosition) ||
                  [];

                return (
                  <Autocomplete
                    {...field}
                    size="small"
                    freeSolo
                    options={data.positionTitles} // Pass the list of objects
                    getOptionLabel={(option) => option.displayPosition || ""} // Extract the string
                    getOptionKey={(option) => option._id || ""} // Extract the key
                    value={field.value || ""} // Ensure the value is a string
                    onChangeCapture={(e) => {
                      field.onChange(e.target.value);
                    }}
                    onChange={(_, value) => {
                      field.onChange(value); // Update form state with selected string
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Display Position"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        size="small"
                        sx={{ mb: { xs: 1, sm: 2 } }}
                        required
                        error={
                          !!errors?.responsibilityCenters?.[rcIndex]
                            ?.positionTypes?.[ptIndex]?.boxes?.[boxIndex]
                            ?.displayPosition
                        }
                        helperText={
                          errors?.responsibilityCenters?.[rcIndex]
                            ?.positionTypes?.[ptIndex]?.boxes?.[boxIndex]
                            ?.displayPosition?.message || ""
                        }
                      />
                    )}
                  />
                );
              }}
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

export default BoxFields;
