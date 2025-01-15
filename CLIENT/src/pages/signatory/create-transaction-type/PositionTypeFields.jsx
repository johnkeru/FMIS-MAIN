import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { FaMinus } from "react-icons/fa6";
import { MdOutlineAdd } from "react-icons/md";
import api from "../../../config/api";
import BoxFields from "./BoxFields";
import { POSITION_TYPES } from "../../../utils/lists";

const fetchPositionTitles = async () => {
  const response = await api.get("get-position-titles");
  return response.data;
};

const PositionTypeFields = ({ errors, watch, control, register, rcIndex }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["position-titles"],
    queryFn: fetchPositionTitles,
  });

  const {
    fields: positionTypes,
    append: addPositionType,
    remove: removePositionType,
  } = useFieldArray({
    control,
    name: `responsibilityCenters.${rcIndex}.positionTypes`,
  });

  if (isLoading) return <div>Loading...</div>;
  // console.log(data);

  return (
    <Box border={1} borderColor="#d4d4d4" bgcolor="background.default">
      <Box sx={{ p: 3 }}>
        {positionTypes.map((pt, ptIndex) => (
          <Box key={pt.id} borderBottom={2} borderColor="#d4d4d4">
            {/* start */}

            <Controller
              name={`responsibilityCenters.${rcIndex}.positionTypes.${ptIndex}.positionType`}
              control={control}
              rules={{
                required: "This field is required",
                validate: (value) =>
                  value !== null || "Please select an option",
              }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={POSITION_TYPES || []}
                  getOptionLabel={(option) => option || ""}
                  value={field.value || null} // Ensure controlled input
                  onChange={(_, value) => {
                    field.onChange(value); // Update the value when selection changes
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Position Type"
                      error={
                        !!errors?.responsibilityCenters?.[rcIndex]
                          ?.positionTypes?.[ptIndex]?.positionType
                      }
                      helperText={
                        errors?.responsibilityCenters?.[rcIndex]
                          ?.positionTypes?.[ptIndex]?.positionType?.message ||
                        ""
                      }
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      sx={{ mb: { xs: 1, sm: 2 } }}
                      size="small"
                    />
                  )}
                />
              )}
            />

            {/* end */}

            <Typography variant="h6" gutterBottom>
              Signatories:
            </Typography>
            <BoxFields
              watch={watch}
              control={control}
              register={register}
              rcIndex={rcIndex}
              ptIndex={ptIndex}
              errors={errors}
              data={data}
            />
            {positionTypes.length > 1 ? (
              <Box textAlign="right" mt={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removePositionType(ptIndex)}
                  startIcon={<FaMinus />}
                >
                  Remove Position Type
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
          Add Position Type
        </Button>
      </Box>
    </Box>
  );
};

export default PositionTypeFields;
