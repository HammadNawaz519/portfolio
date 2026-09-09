"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "@/lib/lenis";

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

// Expo-out easing for a natural, springy deceleration
const easeExpoOut = (t: number) => 1 - Math.pow(2, -10 * t);

function SmoothScroll({ children, isInsideModal = false }: LenisProps) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      lenis?.stop();
      lenis?.start();
    });
  }, []);

  if (isInsideModal) {
    return (
      <div data-lenis-prevent className="w-full">
        {children}
      </div>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: easeExpoOut,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        prevent: (node: HTMLElement) => {
          if (!node) return false;
          return Boolean(
            node.classList?.contains("modall") ||
            node.closest?.(".modall") ||
            node.closest?.("[data-lenis-prevent]") ||
            node.closest?.("[data-radix-scroll-area-viewport]")
          );
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
