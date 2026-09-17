"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useIsMobile } from "@/lib/useIsMobile";

/**
 * Two small lights emerge from darkness and slowly move toward one
 * another as `progress` advances, culminating in a golden burst once
 * they meet. This is the site's strongest single visual beat.
 */
export function ChosenLightsScene({ progress }: { progress: number }) {
  const isMobile = useIsMobile();
  const leftRef = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);

  const approach = THREE.MathUtils.clamp(progress / 0.75, 0, 1);
  const merged = progress > 0.78;
  const burst = THREE.MathUtils.clamp((progress - 0.78) / 0.22, 0, 1);

  const offset = THREE.MathUtils.lerp(3.4, 0.05, easeOutCubic(approach));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flicker = 1 + Math.sin(t * 2.2) * 0.15;
    if (leftRef.current) leftRef.current.position.x = -offset;
    if (rightRef.current) rightRef.current.position.x = offset;
    if (leftRef.current) leftRef.current.scale.setScalar(flicker);
    if (rightRef.current) rightRef.current.scale.setScalar(flicker);
  });

  return (
    <group>
      <group ref={leftRef} position={[-offset, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshBasicMaterial color="#E8C877" transparent opacity={0.5 + approach * 0.4} />
        </mesh>
        <pointLight color="#E8C877" intensity={0.8 + approach * 1.4} distance={5} />
      </group>

      <group ref={rightRef} position={[offset, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshBasicMaterial color="#D9662E" transparent opacity={0.5 + approach * 0.4} />
        </mesh>
        <pointLight color="#D9662E" intensity={0.8 + approach * 1.4} distance={5} />
      </group>

      {merged && (
        <>
          <mesh>
            <sphereGeometry args={[0.15 + burst * 0.5, 24, 24]} />
            <meshBasicMaterial color="#F4D896" transparent opacity={0.9 * burst} />
          </mesh>
          <pointLight color="#F4D896" intensity={burst * 4} distance={10} />
          <Sparkles
            count={isMobile ? 60 : 180}
            scale={[5 * burst + 0.3, 5 * burst + 0.3, 5 * burst + 0.3]}
            size={3}
            speed={0.6}
            color="#E8C877"
            opacity={burst}
          />
        </>
      )}
    </group>
  );
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
