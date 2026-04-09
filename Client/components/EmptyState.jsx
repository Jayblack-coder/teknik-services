import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function EmptyState({ onReset }) {
  return (
    <Box
      textAlign="center"
      mt={5}
      p={4}
      sx={{
        border: "1px dashed #ccc",
        borderRadius: 3,
        backgroundColor: "#fafafa"
      }}
    >
      <SearchOffIcon sx={{ fontSize: 60, color: "#999" }} />

      <Typography variant="h5" mt={2}>
        No providers found
      </Typography>

      <Typography color="text.secondary" mt={1}>
        Try adjusting your search or filters
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={onReset}
      >
        Reset Filters
      </Button>
    </Box>
  );
}