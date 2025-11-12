import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AppFooter() {
  return (
    <footer>
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Left side - Project info */}
          <div className="col-md-6 text-md-start text-center mb-2 mb-md-0">
            <h5 className="mb-1 fw-bold">Multipages</h5>
            <p className="mb-0 fs-6 opacity-75">
              Built with React + Vite + React Router DOM + Bootstrap 5
            </p>
          </div>
          
          {/* Right side - Social icons */}
          <div className="col-md-6 text-md-end text-center">
            <div className="d-flex justify-content-md-end justify-content-center gap-3 mb-2">
              <a
                href="https://www.facebook.com/nutchapon.w"
                target="_blank"
                rel="noreferrer"
                className="text-white fs-4 text-decoration-none"
                style={{ transition: "transform 0.2s" }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://github.com/SaBo4K"
                target="_blank"
                rel="noreferrer"
                className="text-white fs-4 text-decoration-none"
                style={{ transition: "transform 0.2s" }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://www.instagram.com/north_zzzz/"
                target="_blank"
                rel="noreferrer"
                className="text-white fs-4 text-decoration-none"
                style={{ transition: "transform 0.2s" }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="mailto:nutchapon.won@spumail.net"
                className="text-white fs-4 text-decoration-none"
                style={{ transition: "transform 0.2s" }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                <i className="bi bi-envelope"></i>
              </a>
            </div>
            <p className="mb-0 fs-6 opacity-75">
              © 2025 นาย ณัชพล วงศาจันทร์ — All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}