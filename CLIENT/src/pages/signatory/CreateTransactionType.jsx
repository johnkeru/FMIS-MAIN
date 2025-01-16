import {
  Autocomplete,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaMinus } from "react-icons/fa6";
import { MdOutlineAdd } from "react-icons/md";
import DashboardHeader from "../../global/components/DashboardHeader";
import { REPORT_NAMES, RESPONSIBILITY_CENTERS } from "../../utils/lists";
import PositionTypeFields from "./create-transaction-type/PositionTypeFields";
import api from "../../config/api";
import toast from "react-hot-toast";

const CreateTransactionType = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    // setValue,
    watch,
    formState: { errors },
  } = useForm({
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

  const reportName = watch("reportName", null);

  const {
    fields: responsibilityCenters,
    append: addResponsibilityCenter,
    remove: removeResponsibilityCenter,
  } = useFieldArray({
    control,
    name: "responsibilityCenters",
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      responsibilityCenters: data.responsibilityCenters.map((rc) => ({
        ...rc,
        positionTypes: rc.positionTypes.map((pt) => ({
          ...pt,
          boxes: pt.boxes.map((box) => ({
            ...box,
            // the box.displayPosition is set as Object to contain both displayPosition and findPosition
            displayPosition: box.displayPosition.displayPosition,
            findPosition: box.displayPosition.findPosition,
          })),
        })),
      })),
    };
    api
      .post("/create-set-signatory", payload)
      .then((res) => {
        toast.success(res.data.message);
        reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.error);
      });
  };

  return (
    <>
      <DashboardHeader
        title="Create Transaction Type Signatories"
        description="Add a new transaction type"
      />

      <Box sx={{ m: 2, p: 2, position: "relative" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
            Report Name:
          </Typography>

          <Controller
            name="reportName"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={REPORT_NAMES || []}
                getOptionLabel={(option) => option || ""}
                value={reportName}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Report Name"
                    error={!!errors.reportName}
                    helperText={
                      errors.reportName ? errors.reportName.message : ""
                    }
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    sx={{ mb: { xs: 1, sm: 2 } }}
                    size="small"
                  />
                )}
                // loading={isLoading}
                // disabled={isLoading || error}
              />
            )}
          />

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
                <Controller
                  name={`responsibilityCenters.${rcIndex}.particular`}
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={RESPONSIBILITY_CENTERS || []} // Assuming REPORT_NAMES is an array of options
                      getOptionLabel={(option) => option || ""}
                      value={field.value || null} // Ensures controlled input
                      onChange={(_, value) => {
                        field.onChange(value); // Update the value when selection changes
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Particular"
                          error={
                            !!errors?.responsibilityCenters?.[rcIndex]
                              ?.particular
                          }
                          helperText={
                            errors?.responsibilityCenters?.[rcIndex]?.particular
                              ?.message || ""
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

                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Position Types:
                </Typography>

                <PositionTypeFields
                  watch={watch}
                  control={control}
                  register={register}
                  rcIndex={rcIndex}
                  errors={errors}
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

export default CreateTransactionType;
