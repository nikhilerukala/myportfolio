"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      const { x: px, y: py } = posRef.current;
      ringRef.current = {
        x: ringRef.current.x + (px - ringRef.current.x) * 0.15,
        y: ringRef.current.y + (py - ringRef.current.y) * 0.15,
      };
      setRingPosition({ ...ringRef.current });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const hoverables = "a, button, [role='button'], .card-hover";
    const handleOver = () => setIsHovering(true);
    const handleOut = () => setIsHovering(false);

    const attach = () => {
      document.querySelectorAll(hoverables).forEach((el) => {
        el.addEventListener("mouseenter", handleOver);
        el.addEventListener("mouseleave", handleOut);
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      document.querySelectorAll(hoverables).forEach((el) => {
        el.removeEventListener("mouseenter", handleOver);
        el.removeEventListener("mouseleave", handleOut);
      });
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        }}
      />
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-cyan-400/70 pointer-events-none z-[9998] transition-all duration-300"
        style={{
          transform: `translate(${ringPosition.x}px, ${ringPosition.y}px) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          opacity: isHovering ? 0.6 : 0.4,
        }}
      />
    </>
  );
}
