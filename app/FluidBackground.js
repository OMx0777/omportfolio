"use client";
import { useEffect, useRef } from "react";

export default function FluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Helper to safely start the animation
    const triggerFluid = () => {
      // Check if the global function exists
      if (window.startFluid && typeof window.startFluid === 'function') {
        window.startFluid();
      } else {
        // If not ready yet, retry in 100ms (fixes race conditions)
        setTimeout(triggerFluid, 100);
      }
    };

    // 1. Check if script is already in the DOM
    const existingScript = document.querySelector('script[src="/fluid_final.js"]');
    
    if (!existingScript) {
      // 2. Load the script afresh
      const script = document.createElement("script");
      script.src = "/fluid_final.js";
      script.async = true;
      
      // CRITICAL: Wait for the script to fully load before starting
      script.onload = () => {
        triggerFluid();
      };
      
      document.body.appendChild(script);
    } else {
      // 3. Script exists (navigation event), restart immediately
      triggerFluid();
    }
  }, []);

  return (
    <canvas
      id="fluid-canvas"
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "auto", 
      }}
    />
  );
}