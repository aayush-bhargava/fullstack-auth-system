import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// =========================
// CUSTOM CURSOR + TRAILS
// =========================
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor") as HTMLElement | null;
  if (cursor) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }

  const trail = document.createElement("div");
  trail.classList.add("cursor-trail");
  trail.style.left = e.clientX + "px";
  trail.style.top = e.clientY + "px";
  document.body.appendChild(trail);

  setTimeout(() => trail.remove(), 500);
});

// =========================
// CLICK RIPPLE EFFECT
// =========================
document.addEventListener("click", (e) => {
  const ripple = document.createElement("div");
  ripple.classList.add("click-ripple");
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";
  document.body.appendChild(ripple);

  setTimeout(() => ripple.remove(), 400);
});

// =========================
// ROOT RENDER
// =========================
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    {/* GLOWING CURSOR */}
    <div className="custom-cursor"></div>

    {/* FLOATING ORBS */}
    <div
      className="floating-orb"
      style={{ top: "5%", left: "10%", background: "#00eaff" }}
    ></div>
    <div
      className="floating-orb"
      style={{ bottom: "10%", right: "5%", background: "#ff00d4" }}
    ></div>

    {/* PARTICLE BACKGROUND */}
    <canvas id="particle-bg"></canvas>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>
);

// =========================
// PARTICLE BACKGROUND ENGINE (TypeScript SAFE)
// =========================
setTimeout(() => {
  const canvasElement = document.getElementById("particle-bg");

  if (!(canvasElement instanceof HTMLCanvasElement)) {
    console.warn("Particle canvas missing or wrong type");
    return;
  }

  const canvas: HTMLCanvasElement = canvasElement;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.warn("Canvas 2D context not available");
    return;
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  type Particle = {
    x: number;
    y: number;
    r: number;
    dx: number;
    dy: number;
  };

  const particles: Particle[] = [];
  const PARTICLE_COUNT = Math.max(40, Math.floor(window.innerWidth / 40));

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    });
  }
})