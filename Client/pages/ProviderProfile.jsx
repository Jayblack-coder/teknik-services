import { useEffect, useState } from "react";
import axios from "axios";
import { canViewContact } from "../Utils/checkAccess";
// import API from "../Utils/api";

export default function ProviderProfile() {
  const [provider, setProvider] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
  axios.get("http://localhost:3000/api/auth/providers")
    .then(res => setProvider(res.data));
}, []);

  return (
    <div>
      <h2>{provider.profession}</h2>
      <p>{provider.description}</p>

      {/* 🔐 PUT IT RIGHT HERE */}
      {canViewContact(user) ? (
        <p>📞 {provider.phone}</p>
      ) : (
        <p style={{ color: "red" }}>
          Upgrade to view contact
        </p>
      )}
    </div>
  );
}