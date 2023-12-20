import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";

const NewCompany = ({ open, columns, onClose, onSubmit, rowData, isEdit }) => {
  const theme = useTheme();

  const initState = () =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {});

  const [errors, setErrors] = useState({});

  const [values, setValues] = useState(initState);

  const handleSubmit = () => {
    //put your validation logic here
    validateForm();
    if (Object.values(errors).every((x) => !!x)) {
      return;
    }

    onSubmit(values);
    onClose();
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!values.CompanyName.trim()) {
      validationErrors.CompanyName = "Company Name is required";
    }

    if (!values.Address.trim()) {
      validationErrors.Address = "Adress is required";
    }

    if (!values.TelNo.trim()) {
      validationErrors.TelNo = "Telphone no is required";
    }

    if (!values.EmailAddress.trim()) {
      validationErrors.EmailAddress = "Email address is required";
    } else if (
      !values.EmailAddress.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      validationErrors.EmailAddress = "Invalid email address";
    }

    if (!values.CompanyTypeId) {
      validationErrors.CompanyTypeId = "Company Type is required";
    }

    // if (!formData.registerDate.trim()) {
    //     validationErrors.registerDate = 'Register date is required';
    //   } else if (new Date(formData.registerDate) > new Date()) {
    //     validationErrors.registerDate = 'Register date cannot be a future date';
    //   }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Company</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns
              .filter((col) => col.enableEditing !== false)
              .map((column) => (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  //  value={isEdit && rowData[column.accessorKey]}
                  select={column.select}
                  error={!!errors[column.accessorKey]}
                  helperText={errors[column.accessorKey]}
                  onChange={(e) => {
                    setValues({ ...values, [e.target.name]: e.target.value });
                    setErrors({ ...errors, [e.target.name]: "" }); // Clear the error for the field when it changes
                  }}
                >
                  {column.select &&
                    column.items.map((comtype) => (
                      <MenuItem key={comtype.value} value={comtype.value}>
                        {comtype.type}
                      </MenuItem>
                    ))}
                </TextField>
              ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          sx={{
            backgroundColor: theme.palette.grey[300],
            color: theme.palette.grey[700],
          }}
          onClick={() => {
            onClose();
            setErrors({});
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: theme.palette.secondary[500],
            color: theme.palette.grey[0],
          }}
          onClick={handleSubmit}
          variant="contained"
        >
          Create New Company
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCompany;
