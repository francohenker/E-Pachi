import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TiendaEnLinea from "./components/tienda-en-linea";
import GestionarProductos from "./components/gestionarProductos"; // Import the new component
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<TiendaEnLinea />} />
        <Route path="/gestionar-productos" element={<GestionarProductos />} /> {/* Add this line */}
      </Routes>
    </Router>
  </React.StrictMode>
);