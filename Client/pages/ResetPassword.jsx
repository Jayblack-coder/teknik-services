import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
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
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
  fullWidth
  label="Confirm Password"
  type="password"
  margin="normal"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
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