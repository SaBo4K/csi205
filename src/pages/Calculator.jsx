import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [lastOp, setLastOp] = useState(null);
  const [lastNum, setLastNum] = useState(null);

  // Safe arithmetic evaluator to replace eval
  const safeCompute = (a, op, b) => {
    const x = Number(a);
    const y = Number(b);
    if (Number.isNaN(x) || Number.isNaN(y)) return NaN;
    switch (op) {
      case "+":
        return x + y;
      case "-":
        return x - y;
      case "*":
        return x * y;
      case "/":
        return x / y; // JS returns Infinity on divide-by-zero, matching previous behavior
      default:
        return NaN;
    }
  };

  // รองรับการพิมพ์จากคีย์บอร์ด
  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key;

      if (!isNaN(key)) {
        handleNumber(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperator(key);
      } else if (key === "Enter" || key === "=") {
        handleCalculate();
      } else if (key === "Escape") {
        handleClear();
      } else if (key === "Backspace") {
        handleBackspace();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const handleNumber = (digit) => {
    setDisplay((prev) =>
      prev === "0" || prev === "Error" ? digit : prev + digit
    );
  };

  const handleClear = () => {
    setDisplay("0");
    setLastOp(null);
    setLastNum(null);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const handleOperator = (op) => {
    if (display === "Error") return;

    if (!display.includes(" ")) {
      setDisplay(display + " " + op + " ");
      setLastOp(op);
      setLastNum(null);
      return;
    }

    const parts = display.trim().split(" ");
    if (parts.length >= 3) {
      const [a, currentOp, b] = parts;
      const result = safeCompute(a, currentOp, b);
      if (Number.isNaN(result)) {
        setDisplay("Error");
      } else {
        setDisplay(result + " " + op + " ");
        setLastOp(op);
        setLastNum(null);
      }
    }
  };

  const handleCalculate = () => {
    if (display === "Error") return;

    const parts = display.trim().split(" ");
    const [a, op, b] = parts;

    // Case 1: มี a, op, b ครบ เช่น 2 + 3 =
    if (parts.length === 3 && b !== "") {
      const result = safeCompute(a, op, b);
      if (Number.isNaN(result)) {
        setDisplay("Error");
      } else {
        setDisplay(result.toString());
        setLastOp(op);
        setLastNum(Number(b));
      }
    }

    // Case 2: มีแค่ a, op เช่น 1 +
    else if (parts.length === 2 && op) {
      const result = safeCompute(a, op, a);
      if (Number.isNaN(result)) {
        setDisplay("Error");
      } else {
        setDisplay(result.toString());
        setLastOp(op);
        setLastNum(Number(a));
      }
    }

    // Case 3: ไม่มี op แค่พิมพ์ตัวเลขแล้วกด "=" เช่น 1 =
    else if (parts.length === 1 && !lastOp) {
      try {
        const num = Number(a);
        const result = num + num; // บวกตัวมันเอง
        setDisplay(result.toString());
        setLastOp("+");
        setLastNum(num);
      } catch {
        setDisplay("Error");
      }
    }

    // Case 4: กด "=" ซ้ำ (ใช้ lastOp + lastNum)
    else if (lastOp && lastNum !== null) {
      const result = safeCompute(display, lastOp, lastNum);
      if (Number.isNaN(result)) {
        setDisplay("Error");
      } else {
        setDisplay(result.toString());
      }
    }
  };

  const handleSign = () => {
    if (display === "Error") return;
    const num = Number(display);
    setDisplay((num * -1).toString());
  };

  // Layout ปุ่ม
  const buttons = [
    { label: "MC", color: "secondary", disabled: true },
    { label: "MR", color: "secondary", disabled: true },
    { label: "M+", color: "secondary", disabled: true },
    { label: "M-", color: "secondary", disabled: true },
    { label: "CE", color: "danger", onClick: handleClear },

    { label: "7", color: "primary", onClick: () => handleNumber("7") },
    { label: "8", color: "primary", onClick: () => handleNumber("8") },
    { label: "9", color: "primary", onClick: () => handleNumber("9") },
    { label: "÷", color: "secondary", disabled: true },
    { label: "√", color: "secondary", disabled: true },

    { label: "4", color: "primary", onClick: () => handleNumber("4") },
    { label: "5", color: "primary", onClick: () => handleNumber("5") },
    { label: "6", color: "primary", onClick: () => handleNumber("6") },
    { label: "×", color: "secondary", disabled: true },
    { label: "%", color: "secondary", disabled: true },

    { label: "1", color: "primary", onClick: () => handleNumber("1") },
    { label: "2", color: "primary", onClick: () => handleNumber("2") },
    { label: "3", color: "primary", onClick: () => handleNumber("3") },
    { label: "-", color: "success", onClick: () => handleOperator("-") },
    { label: "1/x", color: "secondary", disabled: true },

    { label: "0", color: "primary", onClick: () => handleNumber("0") },
    { label: ".", color: "secondary", disabled: true },
    { label: "+/-", color: "secondary", onClick: handleSign },
    { label: "+", color: "success", onClick: () => handleOperator("+") },
    { label: "=", color: "warning", onClick: handleCalculate },
  ];

  return (
    <div className="page-container calculator-page text-center d-flex flex-column align-items-center gap-2">
      <div
        className="card mx-auto shadow border-0 rounded-3 p-4"
        style={{ maxWidth: "420px" }}
      >
        <div className="card-body">
          {/* Display */}
          <input
            type="text"
            value={display}
            readOnly
            className="form-control mb-3 text-end fw-bold bg-light"
            style={{ fontSize: "1.5rem", height: "60px" }}
          />

          {/* Buttons */}
          <div
            className="d-grid gap-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "8px",
            }}
          >
            {buttons.map((btn, i) => (
              <button
                key={i}
                className={`btn btn-${btn.color}`}
                onClick={btn.onClick}
                disabled={btn.disabled}
                style={{
                  height: "50px",
                  fontWeight: "bold",
                  opacity: btn.disabled ? 0.6 : 1,
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Tip */}
          <p
            className="text-nowrap mt-2 mb-0"
            style={{ 
              fontSize: "0.75rem", 
              whiteSpace: "nowrap",
              color: "#e2e8f0",
              textAlign: "center"
            }}
          >
            Tip: ใช้คีย์บอร์ดได้ → [0-9] [+ - * /] [Enter/=] [Esc] [← Backspace]
          </p>
        </div>
      </div>
    </div>
  );
}