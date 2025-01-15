import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { useUser } from "../../context/UserContext";
import CustomButton from "../../global/components/CustomButton";
import DashboardHeader from "../../global/components/DashboardHeader";
import TableLoading from "../../global/components/TableLoading";
import {
  isAccountingRoles,
  isBudgetRoles,
  isCashRoles,
} from "../../utils/checkRole";
import { boxConditions, filterEmployees } from "./utils";
import { REPORT_NAMES, POSITION_TYPES } from "../../utils/lists";

const fetchSetSignatories = async () => {
  const response = await api.get("/signatories-options-values");
  return response.data;
};

const SignatoryCreate = () => {
  // get the url's query params called transactionType
  const url = new URL(window.location.href);
  const transactionTypeDefaultValue = url.searchParams.get("transactionType");

  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      setLoading(true);
      try {
        const res = await api.post("/create-signatories", data);
        return res.data.message;
      } catch (e) {
        toast.error(e.response.data.error, { duration: 4000 });
        throw e;
      } finally {
        setLoading(false);
      }
    },
  });

  const { currentUser } = useUser();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      payee: currentUser.FirstName + " " + currentUser.LastName,
      payeeDigits: parseInt(currentUser.Username[0]),
      positionType: null,
      reportName: isAccountingRoles(currentUser)
        ? REPORT_NAMES[0]
        : isBudgetRoles(currentUser)
        ? REPORT_NAMES[1]
        : isCashRoles(currentUser)
        ? REPORT_NAMES[2]
        : null,
      transactionType: transactionTypeDefaultValue,
    },
  });
  const [boxes, setBoxes] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["setSignatories"],
    queryFn: fetchSetSignatories,
  });

  const [transactionTypes, setTransactionTypes] = useState([]);
  const [isPositionTypeModify, setIsPositionTypeModify] = useState(false);

  const payeeValue = watch("payee", null);
  const payeeDigits = watch("payeeDigits", "");
  const positionType = watch("positionType", null);
  const reportName = watch("reportName", null);
  const transactionType = watch("transactionType", null);

  const onSubmit = (formData) => {
    try {
      const payload = {
        preparedDigits: parseInt(currentUser.Username[0]),
        payee: formData.payee.EmployeeFullName || formData.payee,
        payeeDigits: formData.payeeDigits,
        positionType: formData.positionType,
        reportName: formData.reportName,
        transactionType:
          typeof formData.transactionType === "object"
            ? formData.transactionType.transactionType
            : formData.transactionType,
        boxA: { ...boxes[0], positionTitle: boxes[0].displayPosition },
        boxC: { ...boxes[1], positionTitle: boxes[1].displayPosition },
        boxD: { ...boxes[2], positionTitle: boxes[2].displayPosition },
      };

      mutation.mutate(payload, {
        onSuccess: (message) => {
          queryClient.invalidateQueries(["signatories", 0]);
          toast.success(message, { duration: 4000 });
          nav("/signatories");
        },
      });
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!", { duration: 4000 });
    }
  };

  // useEffect to get the transactionTypes based on reportName
  useEffect(() => {
    if (positionType && reportName) {
      api
        .get(
          `/get-transaction-types-by-report-name?reportName=${reportName}&positionType=${positionType}`
        )
        .then((res) => setTransactionTypes(res.data.transactionTypes));
    }
  }, [positionType, reportName]);

  useEffect(() => {
    // SHOWING BOXES
    if (payeeValue && positionType && reportName && transactionType) {
      // If payeeValue is an object, retrieve properties; otherwise, set defaults
      const payeeDepartment =
        typeof payeeValue === "object" ? payeeValue.Department : null;
      const payeeDivision =
        typeof payeeValue === "object" ? payeeValue.Division : null;
      // Automated payee type matching. (LATER)
      // if transactionType is string then return a default boxes for signatories. (LATER)
      if (typeof transactionType === "string") {
        // SINCE STRING DOES NOT HAVE OBJECT DATA, IT WILL BE HARDCODED!
        const positionTypeBoxes = [
          {
            name: "BOX A CERTIFIED",
            findPosition: "Division Manager A",
            displayPosition: "Manager, Division Concerned",
            isPayeeDepartmentDependent: false,
            isPayeeDivisionDependent: false,
            _id: "678071990aac8edd93978721",
          },
          {
            name: "BOX C CERTIFIED",
            findPosition: "Division Manager A",
            displayPosition: "Manager, Accounting Division",
            department: "FINANCIAL MANAGEMENT DEPARTMENT",
            division: "ACCOUNTING DIVISION",
            isPayeeDepartmentDependent: false,
            isPayeeDivisionDependent: false,
            _id: "678071990aac8edd93978722",
          },
          {
            name: "BOX D APPROVED FOR PAYMENT",
            findPosition: "Department Manager A",
            displayPosition: "Department/Project Manager Concerned",
            isPayeeDepartmentDependent: false,
            isPayeeDivisionDependent: false,
            _id: "678071990aac8edd93978723",
          },
        ];

        const updatedBoxes = positionTypeBoxes
          .map((boxInfo) => {
            const signatory = data.employees.find((emp) =>
              boxConditions(boxInfo, emp, payeeDepartment, payeeDivision)
            );
            return {
              fullName: signatory ? signatory.EmployeeFullName : "",
              findPosition: boxInfo.findPosition,
              displayPosition: boxInfo.displayPosition,
              boxName: boxInfo.name,
            };
          })
          .filter(Boolean);

        setBoxes(updatedBoxes);
      } else {
        const positionTypeBoxes =
          transactionType.responsibilityCenters[0].positionTypes.find(
            (pos) => pos.positionType === positionType
          );

        const updatedBoxes = positionTypeBoxes.boxes
          .map((boxInfo) => {
            const signatory = data.employees.find((emp) =>
              boxConditions(boxInfo, emp, payeeDepartment, payeeDivision)
            );
            return {
              fullName: signatory ? signatory.EmployeeFullName : "",
              findPosition: boxInfo.findPosition,
              displayPosition: boxInfo.displayPosition,
              boxName: boxInfo.name,
            };
          })
          .filter(Boolean);
        setBoxes(updatedBoxes);
      }
    }

    // Determine positionType based on payeeValue
    if (payeeValue && !isPositionTypeModify) {
      const payeePosition =
        typeof payeeValue === "object" ? payeeValue.PositionTitle : null;
      const payeeDepartment =
        typeof payeeValue === "object" ? payeeValue.Department : null;
      const departmentManager =
        /Department Manager/i.test(payeePosition) &&
        payeeDepartment !== "OFFICE OF THE ADMINISTRATOR"
          ? "Department Manager & Project Manager"
          : undefined;
      const divisionManager = /Division Manager/i.test(payeePosition)
        ? "Division Manager"
        : undefined;
      let otherEmp = undefined;
      if (payeeDepartment === "OFFICE OF THE ADMINISTRATOR")
        otherEmp =
          "Department Manager, under Office of the Administrator -Top Management -IAS -CORPLAN -PAIS -LEGAL";
      let belowDivisionManager = undefined;
      // Assign 'Below Division Manager' only if no higher categories apply and otherEmp is not set
      if (!departmentManager && !divisionManager && !otherEmp && payeePosition)
        belowDivisionManager = "Below Division Manager";
      setValue(
        "positionType",
        departmentManager ||
          divisionManager ||
          otherEmp ||
          belowDivisionManager ||
          ""
      );
    }
  }, [payeeValue, positionType, reportName, transactionType]);

  // for alert message purpose
  const [showAlert, setShowAlert] = useState(true);
  const [showing, setShowing] = useState(true);
  const handleExited = () => setShowing(false); // Completely remove the alert from the DOM after fade-out

  useEffect(() => {
    if (boxes.length !== 0) {
      const timer = setTimeout(() => setShowAlert(false), 20000000);
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

      <Box sx={{ p: 2 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ p: 2, boxShadow: 3, mb: 3 }}>
            <CardContent>
              {/* Payee Autocomplete */}
              <Controller
                name="payee"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={data.employees || []}
                    getOptionLabel={(option) =>
                      typeof option === "string"
                        ? option
                        : option.EmployeeFullName || ""
                    }
                    getOptionKey={(option) =>
                      typeof option === "string"
                        ? option
                        : option.EmployeeID + option.Rate
                    }
                    value={payeeValue}
                    onChange={(_, value) => {
                      setIsPositionTypeModify(false);
                      field.onChange(value);
                      setBoxes([]);
                      setValue("transactionType", null);
                      setValue("positionType", null);
                      if (value)
                        setValue("payeeDigits", parseInt(value.EmployeeID));
                      else setValue("payeeDigits", "");
                    }}
                    onInputChange={(_, value) => {
                      setIsPositionTypeModify(false);
                      setValue("payee", value);
                      setBoxes([]);
                      setValue("transactionType", null);
                      if (value.length <= 1) setValue("payeeDigits", "");
                    }}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Payee Full Name"
                        error={!!errors.payee}
                        helperText={errors.payee ? errors.payee.message : ""}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        sx={{ mb: { xs: 1, sm: 2 } }}
                        size="small"
                      />
                    )}
                    loading={isLoading}
                    disabled={isLoading || error}
                  />
                )}
              />

              {/* Payee 6 Digits */}
              <Controller
                name="payeeDigits"
                control={control}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^\d{6}$/, // Regex to allow exactly 6 digits
                    message: "Must be exactly 6 digits",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Payee 6 Digits"
                    error={!!errors.payeeDigits}
                    helperText={
                      errors.payeeDigits ? errors.payeeDigits.message : ""
                    }
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    sx={{ mb: { xs: 1, sm: 2 } }}
                    inputProps={{
                      maxLength: 6, // Restrict to 6 digits
                      inputMode: "numeric", // Mobile-friendly numeric input
                      pattern: "[0-9]*", // HTML5 pattern for numeric input
                    }}
                    onChange={(e) => {
                      // Filter out non-numeric characters
                      const filteredValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      field.onChange(filteredValue); // Update field value
                    }}
                    value={payeeDigits} // Ensure a controlled value
                    size="small"
                  />
                )}
              />

              {/* Payee Types Autocomplete */}
              <Controller
                name="positionType"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={POSITION_TYPES || []}
                    getOptionLabel={(option) => option || ""}
                    value={positionType}
                    onChange={(_, value) => {
                      setIsPositionTypeModify(true);
                      field.onChange(value);
                      setValue("transactionType", null);
                      setBoxes([]);
                    }}
                    renderInput={(params) => (
                      <Tooltip
                        title={!payeeValue ? "Fill out the payee first" : ""}
                        placement="top-start"
                      >
                        <TextField
                          required
                          {...params}
                          label="Position Type"
                          error={!!errors.positionType}
                          helperText={
                            errors.positionType
                              ? errors.positionType.message
                              : ""
                          }
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          sx={{ mb: { xs: 1, sm: 2 } }}
                          size="small"
                        />
                      </Tooltip>
                    )}
                    loading={isLoading}
                    // disabled={isLoading || error}
                    disabled={!payeeValue}
                  />
                )}
              />

              {/*  Report Name Autocomplete */}
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
                      setIsPositionTypeModify(true);
                      field.onChange(value);
                      setValue("transactionType", null);
                      setBoxes([]);
                    }}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Report Name"
                        error={!!errors.positionType}
                        helperText={
                          errors.positionType ? errors.positionType.message : ""
                        }
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        sx={{ mb: { xs: 1, sm: 2 } }}
                        size="small"
                      />
                    )}
                    loading={isLoading}
                    disabled={isLoading || error}
                  />
                )}
              />

              {/*  Transaction Types Autocomplete */}
              <Controller
                name="transactionType"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => {
                  const selectedValue = field.value || "";

                  return (
                    <Autocomplete
                      {...field}
                      options={transactionTypes}
                      freeSolo
                      getOptionLabel={(option) =>
                        typeof option === "string"
                          ? option
                          : option.transactionType || ""
                      }
                      value={selectedValue}
                      onChangeCapture={(e) => {
                        field.onChange(e.target.value);
                      }}
                      onChange={(_, value) => {
                        setIsPositionTypeModify(true);
                        field.onChange(value);
                        if (!value) setBoxes([]);
                      }}
                      renderInput={(params) => (
                        <Tooltip
                          title={
                            !payeeValue || !positionType || !reportName
                              ? "Fill out payee, position type, and report name first"
                              : ""
                          }
                          placement="top-start"
                        >
                          <TextField
                            required
                            {...params}
                            label="Transaction Type"
                            error={!!errors.transactionType}
                            helperText={
                              errors.transactionType
                                ? errors.transactionType.message
                                : ""
                            }
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            sx={{ mb: { xs: 1, sm: 2 } }}
                            size="small"
                          />
                        </Tooltip>
                      )}
                      loading={isLoading}
                      disabled={!payeeValue || !positionType || !reportName}
                    />
                  );
                }}
              />
            </CardContent>
          </Card>

          {/* Signatory Boxes Display */}
          <Box display={{ xs: "grid", sm: "flex" }} gap={2}>
            {boxes.map((item, index) => (
              <Box key={index} width="100%" display="grid">
                <Card sx={{ p: 2, boxShadow: 3 }}>
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color="primary"
                    >{`${item.boxName.toUpperCase()}`}</Typography>

                    <Autocomplete
                      size="small"
                      freeSolo
                      // position titles are used to filter employees by position title field inside the box
                      options={data.positionTitles}
                      getOptionLabel={(option) =>
                        typeof option === "string"
                          ? option
                          : option.displayPosition || ""
                      }
                      value={item.displayPosition || ""} // Reflect the value from the boxes
                      inputValue={boxes[index]?.displayPosition || ""} // Sync inputValue with the boxes state
                      onChange={(_, value) => {
                        setBoxes((prev) =>
                          prev.map((box, i) =>
                            i === index
                              ? {
                                  ...box,
                                  ...value,
                                  fullName: !value
                                    ? ""
                                    : filterEmployees({
                                        employees: data.employees,
                                        positionTitle: value.findPosition,
                                      })[0].EmployeeFullName,
                                }
                              : box
                          )
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label="Position Title"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          size="small"
                        />
                      )}
                    />

                    <Autocomplete
                      freeSolo
                      options={
                        filterEmployees({
                          employees: data.employees,
                          positionTitle: item.findPosition,
                        }) || []
                      }
                      getOptionLabel={(option) =>
                        typeof option === "string"
                          ? option
                          : option.EmployeeFullName || ""
                      }
                      getOptionKey={(option) => option.EmployeeID + option.Rate}
                      value={boxes[index]?.fullName || ""} // Reflect the value from the boxes
                      inputValue={boxes[index]?.fullName || ""} // Sync inputValue with the boxes state
                      onInputChange={(_, inputValue) => {
                        setBoxes((prev) =>
                          prev.map((box, i) =>
                            i === index ? { ...box, fullName: inputValue } : box
                          )
                        );
                      }}
                      onChange={(_, value) => {
                        const fullName =
                          typeof value === "string"
                            ? value
                            : value?.EmployeeFullName || "";
                        setBoxes((prev) =>
                          prev.map((box, i) =>
                            i === index ? { ...box, fullName: fullName } : box
                          )
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label="Full Name"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          size="small"
                        />
                      )}
                    />
                  </CardContent>
                </Card>
              </Box>
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
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => setShowAlert(false)}
                  >
                    DISMISS
                  </Button>
                }
              >
                <AlertTitle sx={{ fontWeight: "bold", mb: 1 }}>Note</AlertTitle>
                The system provides an initial recommendation for the
                appropriate signatories.
                <strong>
                  {" "}
                  Please verify the details and ensure accuracy before
                  submitting.
                </strong>
              </Alert>
            </Fade>
          )}

          <CustomButton
            // allow={showing}
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 5, py: 1.7 }}
          >
            Submit
          </CustomButton>
        </Box>
      </Box>
    </>
  );
};

export default SignatoryCreate;
