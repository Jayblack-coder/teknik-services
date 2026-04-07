import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import API from "../Utils/api";
import ProviderCard from "../components/ProviderCard";

export default function Dashboard() {
  const [providers, setProviders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/providers")
      .then(res => setProviders(res.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Providers
      </Typography>

      {providers.map(p => (
        <ProviderCard key={p._id} provider={p} user={user} />
      ))}
    </Container>
  );
}