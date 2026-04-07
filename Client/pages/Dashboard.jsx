import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import API from "../utils/api";
import ProviderCard from "../components/ProviderCard";
import SearchFilter from "../components/SearchFilter";

export default function Dashboard() {
  const [providers, setProviders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProviders = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();

    const res = await API.get(`/providers?${query}`);
    setProviders(res.data);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Service Marketplace
      </Typography>

      {/* 🔍 FILTER UI */}
      <SearchFilter onSearch={fetchProviders} />

      {/* RESULTS */}
      {providers.map(p => (
        <ProviderCard key={p._id} provider={p} user={user} />
      ))}
    </Container>
  );
}