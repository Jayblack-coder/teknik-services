import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  Box
} from "@mui/material";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [role, setRole] = useState("subscriber");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    location: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) setRole(newRole);
  };

  // const handleSubmit = async () => {
  //   try {
  //     // 🔐 Register user
  //     const res = await API.post("/auth/register", {
  //       name: form.name,
  //       email: form.email,
  //       password: form.password,
  //       role
  //     });

  //     const token = res.data.token;

  //     // 👷 If provider → create provider profile
  //     if (role === "provider") {
  //       await API.post("/providers", {
  //         profession: form.profession,
  //         location: form.location,
  //         phone: form.phone,
  //         description: `${form.profession} based in ${form.location}`
  //       });
  //     }

  //     alert("Registration successful!");
  //     window.location.href = "/login";

  //   } catch (err) {
  //     console.log(err);
  //     alert("Registration failed");
  //   }
  // };

//   const handleSubmit = async () => {
//   try {
//     const res = await API.post("/auth/register", {
//       ...form,
//       role
//     });

//     // ✅ Save auth data
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));

//     alert("Registration successful!");

//     // 🔁 Redirect
//    navigate("/");

//   } catch (err) {
//     console.log(err.response?.data || err.message);
//     alert("Registration failed");
//   }
// };

const handleSubmit = async () => {
  try {
    const res = await API.post("/auth/register", {
      ...form,
      role
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/"); // ✅ AUTO REDIRECT

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Registration failed");
  }
};

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          mt: 6,
          p: 2,
          borderRadius: 4,
          boxShadow: 3
        }}
      >
        <CardContent>

          {/* TITLE */}
          <Typography variant="h4" align="center" gutterBottom>
            Create Account
          </Typography>

          {/* ROLE SELECT */}
          <Box display="flex" justifyContent="center" mb={3}>
            <ToggleButtonGroup
              value={role}
              exclusive
              onChange={handleRoleChange}
              color="primary"
            >
              <ToggleButton value="subscriber">
                Subscriber
              </ToggleButton>
              <ToggleButton value="provider">
                Provider
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* BASIC FIELDS */}
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            margin="normal"
            onChange={handleChange}
          />

          {/* PROVIDER ONLY FIELDS */}
          {role === "provider" && (
            <>
              <TextField
                fullWidth
                label="Profession"
                name="profession"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Location"
                name="location"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                margin="normal"
                onChange={handleChange}
              />
            </>
          )}

          {/* SUBMIT */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5 }}
            onClick={handleSubmit}
          >
            Register
          </Button>

          {/* FOOTER */}
          <Typography align="center" mt={2}>
            Already have an account?{" "}
            <a href="/login">Login</a>
          </Typography>

        </CardContent>
      </Card>
    </Container>
  );
}