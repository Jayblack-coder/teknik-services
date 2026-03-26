import { useEffect, useState } from "react";
import axios from "axios";
import API from "../Utils/api";

export default function Home() {
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
  API.get("/providers")
    .then(res => setProviders(res.data));
}, []);
  return (
    <div>
      <h1>Service Marketplace</h1>
      {services.map((s) => (
  <div key={s._id}>
    <h3>{s.title}</h3>

    {user?.plan === "premium" ? (
      <p>📞 {s.providerId.phone}</p>
    ) : (
      <p>🔒 Upgrade to view contact</p>
    )}
  </div>
))}
    </div>
  );
}