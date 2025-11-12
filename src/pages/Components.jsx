import React from "react";
// Import all React components to display on this page
import Counter from "../components/Counter";
import Adder from "../components/Adder";
import Timer from "../components/Timer";
import Temperatures from "../components/Temperatures";

/**
 * Components page showcasing various React components
 * Uses CSS Grid and Flexbox for responsive layout
 * Background image with glass morphism effect
 */
export default function Components() {
  // Dynamic background image path for Vite build
  const bgUrl = `${import.meta.env.BASE_URL}bg/components-bg.jpg`;
  
  return (
    <div className="components-bg" style={{"--components-bg-image": `url(${bgUrl})`}}>
      {/* Main grid container for component layout */}
      <div className="components-grid">
        
        {/* Page title header */}
        <div className="grid-header">
          <div className="px-4 py-2 fw-bold text-white rounded-pill shadow-lg fs-5" style={{background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(10px)'}}>
            REACT COMPONENTS
          </div>
        </div>

        {/* Left column: Counter and Timer stacked vertically */}
        <div className="grid-left-column">
          <div className="card-box p-3 rounded-4 shadow-lg d-flex align-items-center justify-content-center flex-fill">
            <Counter />
          </div>
          <div className="card-box p-3 rounded-4 shadow-lg d-flex align-items-center justify-content-center flex-fill">
            <Timer />
          </div>
        </div>

        {/* Right column: Adder component with nested boxes */}
        <div className="grid-adder">
          <Adder />
        </div>

        {/* Bottom row: Temperatures component spanning full width */}
        <div className="grid-temperatures card-box p-2 rounded-4 shadow-lg">
          <Temperatures />
        </div>
      </div>
    </div>
  );
}