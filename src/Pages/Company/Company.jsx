import {
  Box,
  Button,
  useTheme,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  IconButton,
  Paper,
} from "@mui/material";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Header from "../../components/Header";
import * as api from "../../api";
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import NewCompany from "./NewCompany";

const companyTypes = [
  { type: "GOVERNMENT", agreedRate: "600", value: 1 },
  { type: "PRIVATE", agreedRate: "800", value: 2 },
];

const Company = () => {
  const [data, setData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [rowData, setRowData] = useState({});
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getAllCompanies();
        setData(response.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleCreateNewRow = (values) => {
    data.push(values);
    setData([...data]);
  };

  const handleEditRow = (row) => {
    setCreateModalOpen(true);
    setIsEdit(true);
    setRowData(row.original);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      setData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setData([...data]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "CompanyId",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "CompanyName",
        header: "Company Name",
        size: 140,
      },
      {
        accessorKey: "Address",
        header: "Address",
        size: 140,
      },
      {
        accessorKey: "TelNo",
        header: "Telephone",
        size: 80,
      },
      {
        accessorKey: "DateRegistered",
        header: "DateRegistered",
        size: 80,
        enableEditing: false,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        //   type: 'number',
        // }),
      },
      {
        accessorKey: "EmailAddress",
        header: "Email",
        size: 80,
      },
      {
        accessorKey: "RegisteredBy",
        header: "Registered By",
        size: 80,
        enableEditing: false,
        // muiTableBodyCellEditTextFieldProps: {
        //   select: true, //change to select for a dropdown
        //   children: states.map((state) => (
        //     <MenuItem key={state} value={state}>
        //       {state}
        //     </MenuItem>
        //   )),
        // },
      },
      {
        accessorKey: "CompanyTypeId",
        header: "Company Type",
        size: 80,
        select: true,
        items: companyTypes,
        // muiTableBodyCellEditTextFieldProps: {
        //   select: true, //change to select for a dropdown
        //   children: companyTypes.map((comtype) => (
        //     <MenuItem key={comtype.value} value={comtype.value}>
        //       {comtype.type}
        //     </MenuItem>
        //   )),
        // },
      },
    ],
    []
  );

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  //  const csvExporter = new ExportToCsv(csvOptions);

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !alert(`Are you sure you want to delete ${row.getValue("firstName")}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      data.splice(row.index, 1);
      setData([...data]);
    },
    [data]
  );

  return (
    <Box m="0 2.5rem 1.5rem 2.5rem">
      <Header
        title="Company"
        subtitle="All the registered gully companies including government orgs."
      />
      <Box>
        <Box>
          <MaterialReactTable
            displayColumnDefOptions={{
              "mrt-row-actions": {
                muiTableHeadCellProps: {
                  align: "center",
                },
                size: 40,
              },
            }}
            columns={columns}
            data={data}
            editingMode="modal"
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            enableDensityToggle={false}
            initialState={{
              density: "compact",
              columnVisibility: { CompanyId: false, RegisteredBy: false },
            }}
            muiTableHeadCellProps={{
              sx: {
                fontSize: { md: "12px" },
                fontWeight: 500,
                color: theme.palette.secondary[200],
                fontFamily: "inherit",
              },
            }}
            renderTopToolbarCustomActions={({ table }) => (
              <Button
                sx={{
                  backgroundColor: "secondary",
                  color: "white",
                }}
                //     color={theme.palette.grey[0]}
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={() => setCreateModalOpen(true)}
                color="secondary"
                variant="contained"
              >
                Create New Company
              </Button>
            )}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => handleEditRow(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
        </Box>
        <NewCompany
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
          rowData={rowData}
          isEdit={isEdit}
        />
      </Box>
      ;
    </Box>
  );
};

export default Company;
