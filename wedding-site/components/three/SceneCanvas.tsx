"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { useIsMobile } from "@/lib/useIsMobile";

/**
 * Shared Canvas wrapper for every 3D scene on the site.
 * Caps device-pixel-ratio and disables antialiasing on mobile to keep
 * things smooth on mid-range Android hardware, per the performance brief.
 */
export function SceneCanvas({
  children,
  camera = { position: [0, 0, 10], fov: 45 },
  className,
}: {
  children: ReactNode;
  camera?: { position: [number, number, number]; fov?: number };
  className?: string;
}) {
  const isMobile = useIsMobile();

  return (
    <Canvas
      className={className}
      dpr={isMobile ? [1, 1.3] : [1, 2]}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      camera={camera}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        {children}
      </Suspense>
    </Canvas>
  );
}
