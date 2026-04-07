import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users")
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>All Users</h2>

      {users.map(u => (
        <p key={u._id}>{u.email} - {u.plan}</p>
      ))}
    </div>
  );
}