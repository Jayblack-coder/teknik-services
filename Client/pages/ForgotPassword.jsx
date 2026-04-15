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
import API from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await API.post("/auth/forgot-password", { email });

      setMessage(res.data.msg);

      // 🔍 optional (for dev testing)
      console.log("Reset Link:", res.data.resetUrl);

    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
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
            Forgot Password 🔐
          </Typography>

          <Typography align="center" color="text.secondary" mb={2}>
            Enter your email to receive a reset link
          </Typography>

          {/* EMAIL */}
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* ERROR MESSAGE */}
          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}

          {/* SUCCESS MESSAGE */}
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
            disabled={!email || loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              "Send Reset Link"
            )}
          </Button>

          {/* FOOTER */}
          <Typography align="center" mt={2}>
            Remember your password?{" "}
            <a href="/login">Login</a>
          </Typography>

        </CardContent>
      </Card>
    </Container>
  );
}