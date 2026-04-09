import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress
} from "@mui/material";
import API from "../utils/api";

export default function ProviderProfile() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    API.get(`/providers/${id}`)
      .then(res => setProvider(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!provider) return <p>Provider not found</p>;

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4 }}>
        <CardContent>

          <Typography variant="h4">
            {provider.profession}
          </Typography>

          <Typography color="text.secondary">
            {provider.location}
          </Typography>

          <Typography mt={2}>
            {provider.description}
          </Typography>

          {/* 🔐 CONTACT LOCK */}
          {user?.plan === "premium" ? (
            <Typography mt={2}>
              📞 {provider.phone}
            </Typography>
          ) : (
            <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
              Upgrade to view contact
            </Button>
          )}

        </CardContent>
      </Card>
    </Container>
  );
}