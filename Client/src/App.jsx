// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import AdminDashboard from "../pages/Register"
// import AdminRoute from "../components/AdminRoute"

// function App() {
//   return (
//     <BrowserRouter>
//     <Register/>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//   path="/admin"
//   element={
//     <AdminRoute>
//       <AdminDashboard />
//     </AdminRoute>
//   }
// />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Admin from "../pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;