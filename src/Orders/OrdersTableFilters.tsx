import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import { useOrdersTableFiltersStore } from "./OrdersTableFiltersStore";
import { red } from "@mui/material/colors";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import { MAX_INPUT_HEIGHT } from "../consts";

const OrdersTableFilters = () => {
  const {
    hideCalculatedOrders,
    dateFrom,
    dateTo,
    searchText,
    changeHideCalculatedOrders,
    setDateFrom,
    setDateTo,
    setSearchText,
    resetFilters,
  } = useOrdersTableFiltersStore();
  const [areInvalidDates, setAreInvalidDates] = useState<boolean>(false);

  useEffect(() => {
    if (dateFrom > dateTo) {
      setAreInvalidDates(true);
    } else {
      setAreInvalidDates(false);
    }
  }, [dateTo, dateFrom]);

  const datePickerStyle = {
    textField: {
      helperText: areInvalidDates ? "Invalid dates" : "",
      sx: {
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: areInvalidDates ? red[700] : "-moz-initial",
          },
          "&:hover fieldset": {
            borderColor: areInvalidDates ? red[700] : "-moz-initial",
          },
          "&.Mui-focused fieldset": {
            borderColor: areInvalidDates ? red[700] : "-moz-initial",
          },
          maxWidth: "10rem",
          maxHeight: MAX_INPUT_HEIGHT,
        },
      },
    },
  };

  return (
    <Paper sx={{ py: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {/* Existing ToggleButton for Calculated Orders */}
        <Tooltip
          title={
            hideCalculatedOrders
              ? "Show Calculated Orders"
              : "Hide Calculated Orders"
          }
        >
          <Tooltip
            title={
              hideCalculatedOrders
                ? "Show Calculated Orders"
                : "Hide Calculated Orders"
            }
          >
            <Switch
              checked={hideCalculatedOrders}
              onChange={changeHideCalculatedOrders}
              color="primary"
            />
          </Tooltip>
        </Tooltip>
        {/* Show a chip when orders are hidden */}
        {hideCalculatedOrders && (
          <Chip label="Calculated Orders Hidden" color="default" />
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* Date From Picker */}
          <DatePicker
            maxDate={dayjs(dateTo)}
            slotProps={datePickerStyle}
            disableFuture
            label="Date From"
            format="DD/MM/YYYY"
            value={dayjs(dateFrom)}
            onChange={(newDateFrom) => {
              if (newDateFrom && newDateFrom.isValid()) {
                const startOfDay = newDateFrom.startOf("day");
                if (
                  !dateTo ||
                  startOfDay.isBefore(dayjs(dateTo).endOf("day"))
                ) {
                  setAreInvalidDates(false);
                  setDateFrom(startOfDay.toDate());
                } else {
                  setAreInvalidDates(true);
                }
              } else {
                setAreInvalidDates(true);
              }
            }}
          />

          {/* Date To Picker */}
          <DatePicker
            minDate={dayjs(dateFrom)}
            slotProps={datePickerStyle}
            disableFuture
            format="DD/MM/YYYY"
            label="Date To"
            value={dayjs(dateTo)}
            onChange={(newDateTo) => {
              if (newDateTo && newDateTo.isValid()) {
                const endOfDay = newDateTo.endOf("day");
                if (
                  !dateFrom ||
                  endOfDay.isAfter(dayjs(dateFrom).startOf("day"))
                ) {
                  setAreInvalidDates(false);
                  setDateTo(endOfDay.toDate());
                } else {
                  setAreInvalidDates(true);
                }
              } else {
                setAreInvalidDates(true);
              }
            }}
          />
        </LocalizationProvider>

        {/* Text Search Field */}
        <TextField
          sx={{ maxHeight: MAX_INPUT_HEIGHT }}
          size="small"
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
        <Button
          variant="outlined"
          sx={{ maxHeight: MAX_INPUT_HEIGHT }}
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </Box>
    </Paper>
  );
};

export { OrdersTableFilters };
