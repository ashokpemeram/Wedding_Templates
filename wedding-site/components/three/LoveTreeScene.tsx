"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useIsMobile } from "@/lib/useIsMobile";

type Branch = {
  position: [number, number, number];
  rotation: [number, number, number];
  length: number;
  radius: number;
  revealAt: number; // 0..1 progress threshold at which this branch appears
};

const BRANCHES: Branch[] = [
  { position: [0, 1.6, 0], rotation: [0, 0, 0.55], length: 1.4, radius: 0.05, revealAt: 0.25 },
  { position: [0, 1.9, 0], rotation: [0, 0, -0.5], length: 1.3, radius: 0.05, revealAt: 0.3 },
  { position: [0, 2.3, 0], rotation: [0.3, 0, 0.3], length: 1.1, radius: 0.04, revealAt: 0.45 },
  { position: [0, 2.5, 0], rotation: [-0.3, 0, -0.35], length: 1.15, radius: 0.04, revealAt: 0.5 },
  { position: [0, 2.9, 0], rotation: [0.15, 0.3, 0.15], length: 0.95, radius: 0.035, revealAt: 0.65 },
  { position: [0, 3.0, 0], rotation: [-0.1, -0.3, -0.2], length: 0.9, radius: 0.035, revealAt: 0.7 },
];

/**
 * Seed → stem → branches → leaves → flowers, driven entirely by
 * `progress` (0 → 1) from scroll. Each major branch corresponds to a
 * relationship memory revealed alongside the tree in the section copy.
 */
export function LoveTreeScene({ progress }: { progress: number }) {
  const isMobile = useIsMobile();
  const trunkRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const trunkHeight = THREE.MathUtils.lerp(0.15, 3.2, Math.min(1, progress * 1.3));

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.15;
    }
  });

  const flowerPositions = useMemo(() => {
    return BRANCHES.map((b) => {
      const [x, y, z] = b.position;
      const dx = Math.sin(b.rotation[2]) * b.length;
      const dy = Math.cos(b.rotation[2]) * b.length * Math.cos(b.rotation[0]);
      return new THREE.Vector3(x + dx, y + dy, z + Math.sin(b.rotation[0]) * b.length);
    });
  }, []);

  return (
    <group ref={groupRef} position={[0, -1.6, 0]}>
      {/* Seed / trunk base */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial
          color="#E8C877"
          emissive="#E8C877"
          emissiveIntensity={progress < 0.1 ? 1.4 : 0.2}
          transparent
          opacity={progress < 0.08 ? 1 : 0.4}
        />
      </mesh>

      {/* Trunk grows upward with progress */}
      <mesh ref={trunkRef} position={[0, trunkHeight / 2, 0]}>
        <cylinderGeometry args={[0.07, 0.12, trunkHeight, 8]} />
        <meshStandardMaterial color="#7A5230" roughness={0.85} />
      </mesh>

      {/* Branches reveal progressively */}
      {BRANCHES.map((b, i) => {
        const visible = progress >= b.revealAt;
        const scale = visible ? THREE.MathUtils.clamp((progress - b.revealAt) * 4, 0, 1) : 0;
        return (
          <group key={i} position={b.position} rotation={b.rotation}>
            <mesh position={[0, (b.length * scale) / 2, 0]} scale={[1, scale, 1]}>
              <cylinderGeometry args={[b.radius * 0.6, b.radius, b.length, 6]} />
              <meshStandardMaterial color="#8A5C36" roughness={0.8} />
            </mesh>
          </group>
        );
      })}

      {/* Leaves / flowers: sparkles clustered near branch tips, fading in late */}
      {progress > 0.55 &&
        flowerPositions.map((p, i) => (
          <Sparkles
            key={i}
            position={p}
            count={isMobile ? 8 : 18}
            scale={[0.6, 0.6, 0.6]}
            size={3}
            speed={0.2}
            color={progress > 0.85 ? "#D9662E" : "#8FBF7A"}
            opacity={THREE.MathUtils.clamp((progress - 0.55) * 2.5, 0, 1)}
          />
        ))}

      {/* Final stage: heart-toned glowing particles around the whole tree */}
      {progress > 0.85 && (
        <Sparkles
          position={[0, 2, 0]}
          count={isMobile ? 20 : 50}
          scale={[2.6, 3, 2.6]}
          size={2.5}
          speed={0.3}
          color="#D9662E"
          opacity={THREE.MathUtils.clamp((progress - 0.85) * 6, 0, 1)}
        />
      )}
    </group>
  );
}
