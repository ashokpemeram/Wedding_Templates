"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ParticleFieldProps = {
  count?: number;
  radius?: number;
  speed?: number;
  color?: string;
};

export function ParticleField({ count = 240, radius = 15, speed = 0.18, color = "#e6bd63" }: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const spread = Math.pow(Math.random(), 0.55) * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      values[i * 3] = spread * Math.sin(phi) * Math.cos(theta);
      values[i * 3 + 1] = (spread * Math.cos(phi)) * 0.62;
      values[i * 3 + 2] = spread * Math.sin(phi) * Math.sin(theta);
    }
    return values;
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.getElapsedTime() * speed;
    points.current.rotation.x = Math.sin(clock.getElapsedTime() * speed * 0.4) * 0.08;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.035} sizeAttenuation transparent opacity={0.78} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
