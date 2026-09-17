"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

const beats = [
  { p: 0, pos: [0, 1.2, 10], look: [0, 0.35, 0] },
  { p: 0.13, pos: [4.4, 2.3, 8.2], look: [0, 1.3, 0] },
  { p: 0.28, pos: [0, 2.6, 11.5], look: [0, 0.5, -2.6] },
  { p: 0.46, pos: [4.7, 2.8, 9.5], look: [0, 1, -4.4] },
  { p: 0.62, pos: [0, 3.5, 12], look: [0, 1.3, -7] },
  { p: 0.8, pos: [5, 3, 12], look: [0, 1.3, -9.2] },
  { p: 1, pos: [0, 7.2, 17.5], look: [0, 1.1, -12] },
] as const;

function valueBetween(progress: number, key: "pos" | "look") {
  const later = beats.find((beat) => beat.p >= progress) ?? beats[beats.length - 1];
  const earlier = [...beats].reverse().find((beat) => beat.p <= progress) ?? beats[0];
  const distance = Math.max(0.001, later.p - earlier.p);
  const local = THREE.MathUtils.smootherstep((progress - earlier.p) / distance, 0, 1);
  const a = earlier[key];
  const b = later[key];
  return new THREE.Vector3(
    THREE.MathUtils.lerp(a[0], b[0], local),
    THREE.MathUtils.lerp(a[1], b[1], local),
    THREE.MathUtils.lerp(a[2], b[2], local),
  );
}

export function CinematicCamera({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    desired.copy(valueBetween(progress, "pos"));
    target.copy(valueBetween(progress, "look"));
    const damping = reducedMotion ? 1 : 1 - Math.exp(-delta * 2.7);
    camera.position.lerp(desired, damping);
    camera.lookAt(target);
  });
  return null;
}
