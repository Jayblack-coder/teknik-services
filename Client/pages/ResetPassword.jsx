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
  CircularProgress,
  LinearProgress   
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

const getPasswordStrength = (password) => {
  let score = 0;

  if (password.length >= 6) score++;
  if (password.match(/[A-Z]/)) score++;
  if (password.match(/[0-9]/)) score++;
  if (password.match(/[^A-Za-z0-9]/)) score++;

  if (score <= 1) return { label: "Weak", color: "error" };
  if (score <= 3) return { label: "Medium", color: "warning" };

  return { label: "Strong", color: "success" };
};

// 📊 Progress value
const getStrengthValue = (password) => {
  let score = 0;

  if (password.length >= 6) score++;
  if (password.match(/[A-Z]/)) score++;
  if (password.match(/[0-9]/)) score++;
  if (password.match(/[^A-Za-z0-9]/)) score++;

  return (score / 4) * 100;
};

const strength = getPasswordStrength(password);
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
  setError("Passwords do not match");
  return;
}
if (strength.label === "Weak") {
  setError("Password is too weak");
  return;
}
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await API.post(`/auth/reset-password/${token}`, {
        password
      });

      setMessage(res.data.msg);

      // ⏳ Redirect after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.msg || "Reset failed");
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
            Reset Password 🔑
          </Typography>

          <Typography align="center" color="text.secondary" mb={2}>
            Enter your new password below
          </Typography>

          {/* PASSWORD */}
         <TextField
         
  fullWidth
  label="New Password"
  type={showPassword ? "text" : "password"}
  margin="normal"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>
{/* 🔥 PASSWORD STRENGTH */}
{password && (
  <>
    <LinearProgress
      variant="determinate"
      value={getStrengthValue(password)}
      sx={{ mt: 1, height: 8, borderRadius: 5 }}
    />
    <Typography color={strength.color} sx={{ mt: 1 }}>
      Strength: {strength.label}
    </Typography>
  </>
)}
          <TextField
  fullWidth
  label="Confirm Password"
  type={showPassword ? "text" : "password"}
  margin="normal"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>

          {/* ERROR */}
          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}

          {/* SUCCESS */}
          {message && (
            <Typography color="primary" mt={1}>
              {message}
            </Typography>
          )}

          {/* BUTTON */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5 }}
            onClick={handleSubmit}
            disabled={!password || loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              "Reset Password"
            )}
          </Button>

        </CardContent>
      </Card>
    </Container>
  );
}