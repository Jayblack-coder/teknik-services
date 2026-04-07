import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          Teknik Marketplace
        </Typography>

        {user ? (
          <Button color="inherit">Logout</Button>
        ) : (
          <Button color="inherit">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}