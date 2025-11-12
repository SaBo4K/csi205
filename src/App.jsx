import React from "react";
import { useState, useEffect } from "react";

// Global styles for the entire application
import "./App.css";

// React Router components for navigation and routing
import { BrowserRouter, Route, Routes } from "react-router-dom";

// All page components for different sections of the website
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Animation from "./pages/Animation";
import Components from "./pages/Components";
import Todos from "./pages/Todos";
import Products from "./pages/Products";
import Carts from "./pages/Carts";
import RedirectToHome from "./pages/RedirectToHome";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/Login/Login";

import { fetchProducts } from "./data/products";

function App() {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  const [products, setProducts] = React.useState([]);
  const [carts, setCarts] = React.useState([]);

  useEffect(() => setProducts(fetchProducts()), []);
  useEffect(() => console.log(products), [products]);

  if (token === '') {
    return <Login setToken={setToken} setRole={setRole} />;
  } else {
    return (
      // Set basename for GitHub Pages deployment
      <BrowserRouter basename="/csi205/">
        <Routes>
          {/* All routes use AppLayout wrapper for consistent header/footer */}
          <Route element={<AppLayout products={products} carts={carts} setToken={setToken}/>}>
            {/* Main pages of the website */}
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/components" element={<Components />} />
            <Route path="/todos" element={<Todos />} />
            <Route
              path="/products"
              element={
                <Products
                  products={products}
                  carts={carts}
                  setCarts={setCarts}
                />
              }
            />
            <Route
              path="/carts"
              element={<Carts carts={carts} setCarts={setCarts} />}
            />

            {/* Utility routes for redirection */}
            <Route path="/forward-to-home" element={<RedirectToHome />} />

            {/* Catch-all route for 404 errors - redirects to home */}
            <Route path="*" element={<RedirectToHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
