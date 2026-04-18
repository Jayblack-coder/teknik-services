import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate(); 
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) navigate("/");
}, []);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//   const handleLogin = async () => {
//     try {
//       setLoading(true);

//       const res = await API.post("/auth/login", form);

//       // ✅ Save auth
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       alert("Login successful!");

//       // 🔁 Redirect
//       navigate("/");

//     } catch (err) {
//   setError(err.response?.data?.msg || "Login failed");
// } finally {
//       setLoading(false);
//     }
//   };
const handleLogin = async () => {
  try {
    setLoading(true);

    const res = await API.post("/auth/login", form);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/"); 

  } catch (err) {
    setError(err.response?.data?.msg || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          mt: 8,
          p: 2,
          borderRadius: 4,
          boxShadow: 3
        }}
      >
        <CardContent>

          {/* TITLE */}
          <Typography variant="h4" align="center" gutterBottom>
            Welcome Back 👋
          </Typography>

          <Typography align="center" color="text.secondary" mb={2}>
            Login to access your account
          </Typography>

          {/* EMAIL */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            margin="normal"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {/* FORGOT PASSWORD */}
          <Typography
            align="right"
            sx={{ mt: 1, cursor: "pointer", fontSize: 14 }}
            onClick={() => (window.location.href = "/forgot-password")}
          >
            Forgot Password?
          </Typography>
{/* ERROR MESSAGE */}
{error && (
 <Typography color="error" mt={2} textAlign="center">
    {error}
  </Typography>
)}
          {/* LOGIN BUTTON */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5 }}
            onClick={handleLogin}
            disabled={!form.email || !form.password}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>

          {/* FOOTER */}
          <Typography align="center" mt={2}>
            Don’t have an account?{" "}
            <a href="/register">Register</a>
          </Typography>

        </CardContent>
      </Card>
    </Container>
  );
}