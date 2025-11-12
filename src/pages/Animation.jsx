import React, { useState, useEffect, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import field from "../assets/field.jpg";
import basketball from "../assets/basketball.png";
import football from "../assets/football.png";
import volleyball from "../assets/volleyball.png";
import human from "../assets/human.jpg";
import cartoon from "../assets/cartoon.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Animation() {
  // --- Constants ---
  const fieldWidth = 700;
  const fieldHeight = 400;
  const diameter = 80;
  const vx = 5;
  const vy = 5;
  const maxLeft = fieldWidth - diameter;
  const maxTop = fieldHeight - diameter;

  // --- State ---
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [ballType, setBallType] = useState("default");
  const ballRef = useRef();

  // --- Ball images ---
  const ballImages = {
    basketball,
    football,
    volleyball,
    human,
    cartoon,
    default: null,
  };

  // --- Move Ball ---
  const moveBall = useCallback(() => {
    setX((prevX) => {
      let newX = goRight ? prevX + vx : prevX - vx;
      if (newX >= maxLeft) {
        newX = maxLeft;
        setGoRight(false);
      } else if (newX <= 0) {
        newX = 0;
        setGoRight(true);
      }
      return newX;
    });

    setY((prevY) => {
      let newY = goDown ? prevY + vy : prevY - vy;
      if (newY >= maxTop) {
        newY = maxTop;
        setGoDown(false);
      } else if (newY <= 0) {
        newY = 0;
        setGoDown(true);
      }
      return newY;
    });
  }, [goRight, goDown, maxLeft, maxTop]);

  // --- Game Loop ---
  useEffect(() => {
    const loop = setInterval(() => {
      if (running) moveBall();
    }, 25);
    return () => clearInterval(loop);
  }, [running, moveBall]); 

  // --- Keyboard Shortcuts ---
  useEffect(() => {
    const handleKey = (e) => {
      // Only allow keys: "0", "1", "2", "3", "4", "5", " ", "Escape"
      if (!["0", "1", "2", "3", "4", "5", " ", "Escape"].includes(e.key)) return;
      switch (e.key) {
        case " ":
          e.preventDefault();
          setRunning((r) => !r);
          break;
        case "Escape":
          setX(0);
          setY(0);
          setGoRight(true);
          setGoDown(true);
          break;
        case "0":
          setBallType("default");
          break;
        case "1":
          setBallType("basketball");
          break;
        case "2":
          setBallType("football");
          break;
        case "3":
          setBallType("volleyball");
          break;
        case "4":
          setBallType("human");
          break;
        case "5":
          setBallType("cartoon");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // --- Change Ball ---
  const changeBall = (type) => {
    setBallType(type);
  };

  return (
    <div className="page-container animation-page text-center d-flex flex-column align-items-center gap-2">
      <div
        className="border border-dark rounded p-2 bg-light mx-auto"
        style={{ width: fieldWidth + 20 }}
      >
        {/* --- Field --- */}
        <div
          className="position-relative border border-danger rounded"
          style={{
            width: fieldWidth,
            height: fieldHeight,
            backgroundImage: `url(${field})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: "hidden",
          }}
        >
          {/* --- Ball --- */}
          <div
            ref={ballRef}
            className="rounded-circle border border-success"
            style={{
              position: "absolute",
              width: diameter,
              height: diameter,
              left: x,
              top: y,
              backgroundImage:
                ballType !== "default" ? `url(${ballImages[ballType]})` : "none",
              backgroundColor:
                ballType === "default" ? "aliceblue" : "transparent",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              transition: "left 0.02s linear, top 0.02s linear",
              animation: running ? "spin 1s linear infinite" : "none",
            }}
          ></div>
        </div>

        {/* --- Control Buttons --- */}
        <div className="mt-3 p-4">
          <div className="d-flex align-items-center justify-content-between" style={{ flexWrap: "nowrap", overflowX: "auto" }}>
            <button
              onClick={() => setRunning((r) => !r)}
              className={`btn ${running ? "btn-danger" : "btn-success"} fw-bold d-flex align-items-center gap-2`}
              style={{
                minWidth: "80px",
                width: "80px",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <span>{running ? "⏸" : "▶️"}</span>
              {running ? "Pause" : "Start"}
            </button>
            
            <div className="d-flex gap-2">
            <button
              className={`btn ${
                ballType === "default" ? "btn-dark" : "btn-outline-secondary"
              }`}
              onClick={() => changeBall("default")}
              style={{ 
                minWidth: "80px", 
                width: "80px", 
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              None
            </button>
            <button
              className={`btn ${
                ballType === "basketball"
                  ? "btn-warning"
                  : "btn-outline-warning"
              }`}
              onClick={() => changeBall("basketball")}
              style={{ 
                minWidth: "80px", 
                width: "80px", 
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              Basketball
            </button>
            <button
              className={`btn ${
                ballType === "football" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => changeBall("football")}
              style={{ 
                minWidth: "80px", 
                width: "80px", 
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              Football
            </button>
            <button
              className={`btn ${
                ballType === "volleyball" ? "btn-info" : "btn-outline-info"
              }`}
              onClick={() => changeBall("volleyball")}
              style={{ 
                minWidth: "80px", 
                width: "80px", 
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              Volleyball
            </button>
            <button
              className={`btn ${
                ballType === "human" ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => changeBall("human")}
              style={{ 
                minWidth: "80px", 
                width: "80px", 
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              Human
            </button>
            <button
              className={`btn ${
                ballType === "cartoon"
                  ? "btn-secondary"
                  : "btn-outline-secondary"
              }`}
              onClick={() => changeBall("cartoon")}
              style={{ 
                minWidth: "80px", 
                width: "80px", 
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              Cartoon
            </button>
            </div>
          </div>
        </div>
      </div>
      {/* --- Spin Animation CSS --- */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}