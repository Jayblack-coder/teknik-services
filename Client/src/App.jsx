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
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Admin from "../pages/Admin";
import ProviderProfile from "../pages/ProviderProfile";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Home from "../pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
     {/* <Dashboard />  */}
     {/* <Register/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/provider/:id" element={<ProviderProfile />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
           {/* 🔐 PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
<Route
          path="/provider/:id"
          element={
            <ProtectedRoute>
              <ProviderProfile />
            </ProtectedRoute>
          }
        />
        {/* 🔐 ADMIN ONLY */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;