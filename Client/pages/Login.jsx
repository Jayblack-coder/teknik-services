import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    // 
    localStorage.setItem("user", JSON.stringify(decodedUser));
    alert("Logged in!");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}