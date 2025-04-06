"use client";

import { useEffect, useRef } from "react";

type Heart = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  wiggleTime: number; // time left to wiggle (in frames)
};

const NUM_HEARTS = 30;
const HEART_CHAR = "♥️";

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    // Even distribution
    const hearts: Heart[] = [];
    const rows = Math.floor(Math.sqrt(NUM_HEARTS));
    const cols = Math.ceil(NUM_HEARTS / rows);
    const spacingX = width / cols;
    const spacingY = height / rows;

    for (let i = 0; i < NUM_HEARTS; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      hearts.push({
        x: col * spacingX + spacingX / 2 + (Math.random() - 0.5) * 40,
        y: row * spacingY + spacingY / 2 + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 38 + Math.random() * 10,
        wiggleTime: 0, // initially not wiggling
      });
    }

    // Handle clicks
    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      hearts.forEach((h) => {
        const half = h.size / 2;
        const isInside =
          clickX >= h.x - half &&
          clickX <= h.x + half &&
          clickY >= h.y - half &&
          clickY <= h.y + half;

        if (isInside) {
          h.wiggleTime = 60; // wiggle for 60 frames (~1s at 60fps)
        }
      });
    });

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.18;

      hearts.forEach((h, i) => {
        const halfSize = h.size / 2;
        h.x += h.vx;
        h.y += h.vy;

        // Bounce logic
        if (h.x - halfSize < 0 || h.x + halfSize > width) h.vx *= -1;
        if (h.y - halfSize < 0 || h.y + halfSize > height) h.vy *= -1;

        // Repel if boxes overlap
        for (let j = 0; j < hearts.length; j++) {
          if (i === j) continue;
          const h2 = hearts[j];
          const hs1 = h.size / 2;
          const hs2 = h2.size / 2;
          const overlapX = Math.abs(h.x - h2.x) < hs1 + hs2;
          const overlapY = Math.abs(h.y - h2.y) < hs1 + hs2;

          if (overlapX && overlapY) {
            const dx = h.x - h2.x;
            const dy = h.y - h2.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const repelX = dx / dist;
            const repelY = dy / dist;
            h.vx += repelX * 0.04;
            h.vy += repelY * 0.04;
          }
        }

        // Wiggle animation
        let drawX = h.x;
        let drawY = h.y;

        if (h.wiggleTime > 0) {
          const wiggleStrength = 3;
          drawX += Math.sin(frame * 0.3) * wiggleStrength;
          drawY += Math.cos(frame * 0.3) * wiggleStrength;
          h.wiggleTime--;
        }

        ctx.font = `${h.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(HEART_CHAR, drawX, drawY);
      });

      ctx.globalAlpha = 1;
      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto"
    />
  );
}
