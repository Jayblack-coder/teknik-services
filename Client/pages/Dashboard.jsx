import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import API from "../utils/api";
import ProviderCard from "../components/ProviderCard";
import SearchFilter from "../components/SearchFilter";
import { CircularProgress } from "@mui/material";

export default function Dashboard() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ ADD HERE

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ MAIN FETCH FUNCTION
  const fetchProviders = async (filters = {}) => {
    try {
      setLoading(true);

      // 🔥 THIS WAS MISSING
      const query = new URLSearchParams(filters).toString();

      const res = await API.get(`/providers?${query}`);

      setProviders(res.data);

    } catch (err) {
      console.error("Error fetching providers:", err);
    } finally {
      setLoading(false); // ✅ ALWAYS stop loading
    }
  };

  // ✅ INITIAL LOAD
  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Service Marketplace
      </Typography>

      {/* 🔍 SEARCH + FILTER */}
      <SearchFilter onSearch={fetchProviders} />

      {/* ⏳ LOADING STATE */}
     {loading ? (
  <CircularProgress />
) : (
        providers.map((p) => (
          <ProviderCard key={p._id} provider={p} user={user} />
        ))
      )}
    </Container>
  );
}