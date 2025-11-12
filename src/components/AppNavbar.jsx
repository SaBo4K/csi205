import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AppNavbar({ products, carts, setToken }) {
  const navigate = useNavigate();
  const navItems = [
    { to: "/", label: "Home", color: "primary", activeColor: "#0d6efd" },
    {
      to: "/calculator",
      label: "Calculator",
      color: "success",
      activeColor: "#198754",
    },
    {
      to: "/animation",
      label: "Animation",
      color: "warning",
      activeColor: "#fd7e14",
    },
    {
      to: "/components",
      label: "Components",
      color: "info",
      activeColor: "#0dcaf0",
    },
    { to: "/todos", label: "Todo", color: "danger", activeColor: "#dc3545" },
    {
      to: "/products",
      label: "Products",
      count: products.length,
      color: "secondary",
      activeColor: "#6c757d",
    },
    {
      to: "/carts",
      label: "Carts",
      count: carts.length,
      color: "dark",
      activeColor: "#212529",
      isCartButton: true,
    },
  ];

  return (
    <nav>
      <div className="container" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {navItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.to}
            className={({ isActive }) =>
              `btn fw-semibold px-3 d-flex align-items-center gap-2 text-decoration-none ${
                isActive ? `btn-${item.color}` : `btn-outline-${item.color}`
              }`
            }
            style={({ isActive }) => ({
              minWidth: "130px",
              maxWidth: "130px",
              width: "130px",
              height: "40px",
              padding: "8px 12px",
              transition:
                "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
              backgroundColor: isActive
                ? item.activeColor
                : "rgba(255, 255, 255, 0.9)",
              borderColor: item.activeColor,
              color: isActive ? "white" : item.activeColor,
              fontWeight: isActive ? "bold" : "600",
              textDecoration: "none !important",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: item.isCartButton ? "relative" : "static",
            })}
          >
            {({ isActive }) => (
              <>
                <span style={{ textDecoration: "none" }}>{item.label}</span>

                {item.count !== undefined &&
                  item.count > 0 &&
                  !item.isCartButton && (
                    <span
                      className="badge rounded-pill d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(255,255,255,0.3)"
                          : item.activeColor,
                        color: "white",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        minWidth: "22px",
                        height: "22px",
                        lineHeight: "1",
                        padding: "0",
                        textDecoration: "none",
                        border: "none",
                      }}
                    >
                      {item.count}
                    </span>
                  )}

                {item.isCartButton &&
                  item.count !== undefined &&
                  item.count > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        minWidth: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                      }}
                    >
                      {item.count > 9 ? '9+' : item.count}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
              </>
            )}
          </NavLink>
        ))}
        
        {/* Logout Button */}
        <button
          onClick={() => {
            navigate('/');
            setToken('');
          }}
          className="btn btn-outline-danger fw-semibold px-3 d-flex align-items-center gap-2 text-decoration-none"
          style={{
            minWidth: "130px",
            maxWidth: "130px",
            width: "130px",
            height: "40px",
            padding: "8px 12px",
            transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "#dc3545",
            color: "#dc3545",
            fontWeight: "600",
            textDecoration: "none !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "20px",
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#dc3545";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
            e.target.style.color = "#dc3545";
          }}
        >
          <span style={{ textDecoration: "none" }}>Logout</span>
        </button>
      </div>
    </nav>
  );
}
