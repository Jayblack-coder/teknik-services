import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Home() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await API.get("/providers");
      setProviders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* TITLE */}
      <Typography variant="h4" gutterBottom>
        Find Service Providers 🔍
      </Typography>

      {/* LOADING */}
      {loading ? (
        <CircularProgress />
      ) : providers.length === 0 ? (
        /* EMPTY STATE */
        <Typography mt={3}>No providers found</Typography>
      ) : (
        /* GRID */
        <Grid container spacing={3} mt={1}>
          {providers.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">
                    {p.profession}
                  </Typography>

                  <Typography color="text.secondary">
                    {p.location}
                  </Typography>

                  <Chip
                    label={p.userId?.plan || "basic"}
                    size="small"
                    sx={{ mt: 1 }}
                  />

                  <Typography mt={2}>
                    {p.description}
                  </Typography>

                  {/* 🔐 PHONE VISIBILITY */}
                  {user?.plan === "premium" ? (
                    <Typography mt={2}>
                      📞 {p.phone || "N/A"}
                    </Typography>
                  ) : (
                    <Typography mt={2} color="error">
                      🔒 Upgrade to view contact
                    </Typography>
                  )}
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/provider/${p._id}`)}
                  >
                    View Profile
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}