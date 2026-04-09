// import { ThemeProvider } from "@mui/material";
// import theme from "../theme";
// import App from "./App";

// <ThemeProvider theme={theme}>
//   <App />
// </ThemeProvider>

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { AuthProvider } from "./context/AuthContext.jsx";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
   
      <App />
       
  
  </StrictMode>,
)

