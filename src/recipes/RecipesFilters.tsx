import { Box, Paper, TextField } from "@mui/material";
import { MAX_INPUT_HEIGHT } from "../consts";
import SearchIcon from "@mui/icons-material/Search";
import { useRecipesFiltersStore } from "./RecipesFiltersStore";
import TouchAppIcon from "@mui/icons-material/TouchApp";
const RecipesFilters = () => {
  const { searchText, setSearchText } = useRecipesFiltersStore();
  return (
    <Paper sx={{ py: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          pl: "1rem",
        }}
      >
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
          autoComplete={"false"}
        />
        <TouchAppIcon /> Click a row to edit or delete a recipe
      </Box>
    </Paper>
  );
};
export { RecipesFilters };
