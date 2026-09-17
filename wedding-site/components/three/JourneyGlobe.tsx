"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, QuadraticBezierLine, Html } from "@react-three/drei";
import { useIsMobile } from "@/lib/useIsMobile";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { JourneyStop } from "@/data/wedding";

const RADIUS = 2.4;

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export function JourneyGlobe({
  stops,
  activeIndex,
  onSelect,
}: {
  stops: JourneyStop[];
  activeIndex: number | null;
  onSelect: (i: number) => void;
}) {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const globeRef = useRef<THREE.Mesh>(null);

  const positions = useMemo(
    () => stops.map((s) => latLngToVector3(s.lat, s.lng, RADIUS)),
    [stops]
  );

  useFrame((_, delta) => {
    if (globeRef.current && activeIndex === null && !reducedMotion) {
      globeRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[RADIUS, isMobile ? 32 : 48, isMobile ? 32 : 48]} />
        <meshStandardMaterial
          color="#2A0B12"
          emissive="#4A1420"
          emissiveIntensity={0.4}
          roughness={0.9}
          wireframe={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS + 0.01, isMobile ? 24 : 32, isMobile ? 24 : 32]} />
        <meshBasicMaterial color="#C9A24B" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Arcs connecting each consecutive location */}
      {positions.slice(1).map((p, i) => {
        const start = positions[i];
        const end = p;
        const mid = start
          .clone()
          .add(end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(RADIUS + 0.9);
        return (
          <QuadraticBezierLine
            key={i}
            start={start}
            end={end}
            mid={mid}
            color="#E8C877"
            lineWidth={1.4}
            transparent
            opacity={0.55}
            dashed
            dashScale={12}
          />
        );
      })}

      {positions.map((p, i) => {
        const isActive = activeIndex === i;
        return (
          <group key={i} position={p}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelect(i);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => (document.body.style.cursor = "auto")}
            >
              <sphereGeometry args={[isActive ? 0.09 : 0.06, 16, 16]} />
              <meshBasicMaterial color={isActive ? "#F4D896" : "#D9662E"} />
            </mesh>
            <pointLight color="#F4D896" intensity={isActive ? 1.4 : 0.3} distance={1.5} />
            {isActive && (
              <Html distanceFactor={8} center style={{ pointerEvents: "none" }}>
                <div className="whitespace-nowrap rounded-full border border-gold/40 bg-ink/90 px-3 py-1 font-body text-[11px] tracking-wide text-jasmine">
                  {stops[i].location}
                </div>
              </Html>
            )}
          </group>
        );
      })}

      <OrbitControls
        enablePan={false}
        enableZoom={!isMobile}
        minDistance={4}
        maxDistance={9}
        autoRotate={false}
      />
    </group>
  );
}
