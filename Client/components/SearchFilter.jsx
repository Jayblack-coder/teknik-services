import { TextField, MenuItem, Box, Button } from "@mui/material";
import { useState } from "react";

export default function SearchFilter({ onSearch }) {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: ""
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box display="flex" gap={2} mb={3} flexWrap="wrap">
      <TextField
        label="Search"
        name="search"
        onChange={handleChange}
      />

      <TextField
        label="Location"
        name="location"
        onChange={handleChange}
      />

      <TextField
        select
        label="Category"
        name="category"
        onChange={handleChange}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="cleaning">Cleaning</MenuItem>
        <MenuItem value="carpentry">Carpentry</MenuItem>
        <MenuItem value="health">Health</MenuItem>
        <MenuItem value="tech">Tech</MenuItem>
      </TextField>

      <Button
        variant="contained"
        onClick={() => onSearch(filters)}
      >
        Search
      </Button>
    </Box>
  );
}