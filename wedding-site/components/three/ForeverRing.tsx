"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useIsMobile } from "@/lib/useIsMobile";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * A slowly rotating golden ring. Used both as the emotional centrepiece
 * of the Proposal section (large, alone) and as a framing device around
 * the countdown numbers (smaller, with HTML overlay content).
 */
export function ForeverRing({ size = 1.4 }: { size?: number }) {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const ringRef = useRef<THREE.Group>(null);
  const stoneRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (reducedMotion) return;
    if (ringRef.current) ringRef.current.rotation.y += delta * 0.25;
    if (ringRef.current) ringRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.15;
    if (stoneRef.current) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.08;
      stoneRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={ringRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size, size * 0.09, 24, 96]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.25} emissive="#7A5D24" emissiveIntensity={0.2} />
      </mesh>
      <mesh ref={stoneRef} position={[0, size, 0]}>
        <octahedronGeometry args={[size * 0.22, 0]} />
        <meshStandardMaterial color="#F4D896" metalness={0.4} roughness={0.05} emissive="#F4D896" emissiveIntensity={0.6} />
      </mesh>
      <pointLight position={[0, size, 0]} color="#F4D896" intensity={1.2} distance={4} />
      <Sparkles count={isMobile ? 20 : 45} scale={[size * 3, size * 3, size * 3]} size={2} speed={0.2} color="#E8C877" opacity={0.5} />
    </group>
  );
}
