import { useEffect, useState } from "react";
import API from "../Utils/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    API.get("/admin/users").then(res => setUsers(res.data));
    API.get("/admin/providers").then(res => setProviders(res.data));
    API.get("/admin/payments").then(res => setPayments(res.data));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Users</h2>
      {users.map(u => (
        <div key={u._id}>
          <p>{u.name} - {u.email} ({u.plan})</p>
        </div>
      ))}

      <h2>Providers</h2>
      {providers.map(p => (
        <div key={p._id}>
          <p>{p.profession} - {p.location}</p>
        </div>
      ))}

      <h2>Payments</h2>
      {payments.map(p => (
        <div key={p._id}>
          <p>{p.email} - ₦{p.amount} ({p.status})</p>
        </div>
      ))}
    </div>
  );
}