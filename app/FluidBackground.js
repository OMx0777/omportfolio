"use client";
import { useEffect, useRef } from "react";

export default function FluidBackground() {
  const canvasRef = useRef(null);
  const scriptLoaded = useRef(false);

  // Load the script only once
  useEffect(() => {
    if (scriptLoaded.current) return;

    const script = document.createElement("script");
    script.src = "/fluid.js"; // Loads from public/fluid.js
    script.async = true;
    document.body.appendChild(script);

    scriptLoaded.current = true;

    return () => {
      // Optional cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        // CRITICAL: changed from 'none' to 'auto' so the canvas can detect mouse movements
        pointerEvents: "auto", 
      }}
    />
  );
}