import { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import API from "../utils/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    const res = await API.post("/auth/login", form);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    window.location.href = "/";
  };

  return (
    <Container maxWidth="sm">
      <TextField
        fullWidth label="Email" margin="normal"
        onChange={(e) => setForm({...form, email: e.target.value})}
      />

      <TextField
        fullWidth label="Password" type="password" margin="normal"
        onChange={(e) => setForm({...form, password: e.target.value})}
      />

      <Button fullWidth variant="contained" onClick={handleSubmit}>
        Login
      </Button>
    </Container>
  );
}