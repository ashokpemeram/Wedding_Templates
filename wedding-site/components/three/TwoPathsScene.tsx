"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line, Sparkles, Float } from "@react-three/drei";
import { useIsMobile } from "@/lib/useIsMobile";

/**
 * The recurring visual motif of the site: two glowing life-paths.
 *
 * `progress` (0 → 1) drives how close the two paths are:
 *   0   = fully separate (Two Separate Worlds)
 *   ~0.5 = crossing (First Meeting)
 *   1   = fully merged into a single golden path (Families / Final Ending)
 *
 * `showFamilies` adds two shorter outer paths joining the main two,
 * used in the "Two Families, One Future" section.
 */
export function TwoPathsScene({
  progress,
  showFamilies = false,
  color = "#C9A24B",
}: {
  progress: number;
  showFamilies?: boolean;
  color?: string;
}) {
  const isMobile = useIsMobile();
  const glowRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const separation = THREE.MathUtils.lerp(3.2, 0, progress);

  const groomPoints = useMemo(() => buildPath(-separation, 0), [separation]);
  const bridePoints = useMemo(() => buildPath(separation, 0.6), [separation]);
  const familyA = useMemo(() => buildPath(-separation * 1.8, 1.4, 0.7), [separation]);
  const familyB = useMemo(() => buildPath(separation * 1.8, -1.4, 0.7), [separation]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 1.6) * 0.12;
    if (glowRef.current) {
      glowRef.current.scale.setScalar(pulse * (0.4 + progress * 0.6));
    }
    if (lightRef.current) {
      lightRef.current.intensity = (0.6 + progress * 2.2) * pulse;
    }
  });

  return (
    <group>
      <Line points={groomPoints} color={color} lineWidth={2} transparent opacity={0.85} />
      <Line points={bridePoints} color="#E8C877" lineWidth={2} transparent opacity={0.85} />

      {showFamilies && (
        <>
          <Line points={familyA} color="#8A7768" lineWidth={1.3} transparent opacity={0.5 * progress} />
          <Line points={familyB} color="#8A7768" lineWidth={1.3} transparent opacity={0.5 * progress} />
        </>
      )}

      {/* Meeting-point glow, brightens as the paths converge */}
      <Float speed={1.4} floatIntensity={0.6} rotationIntensity={0.2}>
        <mesh ref={glowRef} position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.35, 24, 24]} />
          <meshBasicMaterial color="#F4D896" transparent opacity={0.9} />
        </mesh>
      </Float>
      <pointLight ref={lightRef} position={[0, 0.3, 0]} color="#E8C877" distance={8} />

      <Sparkles
        count={isMobile ? 60 : 160}
        scale={[9, 4, 4]}
        size={2.2}
        speed={0.25}
        opacity={0.5}
        color={color}
      />
    </group>
  );
}

/** Builds a gently undulating path offset from the centre line. */
function buildPath(xOffset: number, seed: number, scale = 1) {
  const points: THREE.Vector3[] = [];
  const segments = 40;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const z = THREE.MathUtils.lerp(-8, 8, t);
    const wobble = Math.sin(t * Math.PI * 2 + seed) * 0.5 * scale;
    const x = xOffset + wobble;
    const y = Math.sin(t * Math.PI * 3 + seed * 2) * 0.35 * scale;
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}
