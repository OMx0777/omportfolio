"use client";
import { useEffect, useRef } from "react";

export default function FluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1. Check if script is already in the DOM
    // Note: We are looking for the NEW filename
    const existingScript = document.querySelector('script[src="/fluid_final.js"]');
    
    if (!existingScript) {
      // 2. If not, create it and append it
      const script = document.createElement("script");
      script.src = "/fluid_final.js"; // <--- IMPORTANT: NEW NAME
      script.async = true;
      document.body.appendChild(script);
    } else {
      // 3. If it IS there, force the fluid to restart
      // This fixes the issue where it stops when you navigate pages
      if (window.startFluid) {
        window.startFluid();
      }
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