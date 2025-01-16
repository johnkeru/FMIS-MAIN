import React from "react";
import { Controller, useForm } from "react-hook-form";
import DashboardHeader from "../../global/components/DashboardHeader";
import { Box, TextField, Button, Typography } from "@mui/material";

const CreateSignatoriesForBudget = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      above50MSignatories: [{ name: "", position: "", initial: "" }],
      above10MupTo50MSignatories: [{ name: "", position: "", initial: "" }],
      upTo10MSignatories: [{ name: "", position: "", initial: "" }],
    },
  });

  const renderSignatoryFields = (fieldName, label) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <Box sx={{ display: "grid", gap: 2 }}>
            {field.value.map((_, index) => (
              <Box key={index} sx={{ display: "grid", gap: 2 }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors[fieldName]?.[index]?.name}
                  helperText={errors[fieldName]?.[index]?.name?.message}
                />
                <TextField
                  label="Position"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors[fieldName]?.[index]?.position}
                  helperText={errors[fieldName]?.[index]?.position?.message}
                />
                <TextField
                  label="Initial"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors[fieldName]?.[index]?.initial}
                  helperText={errors[fieldName]?.[index]?.initial?.message}
                />
              </Box>
            ))}
          </Box>
        )}
      />
    </Box>
  );

  return (
    <>
      <DashboardHeader
        title="Create Signatories for Budget"
        description="Define the signatories for various budget levels."
      />
      <Box sx={{ p: 3 }}>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          {renderSignatoryFields(
            "above50MSignatories",
            "Above 50M Signatories"
          )}
          {renderSignatoryFields(
            "above10MupTo50MSignatories",
            "Above 10M to 50M Signatories"
          )}
          {renderSignatoryFields("upTo10MSignatories", "Up to 10M Signatories")}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default CreateSignatoriesForBudget;
