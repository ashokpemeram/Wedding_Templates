"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CinematicCamera } from "./three/CinematicCamera";
import { ParticleField } from "./three/ParticleField";

const gold = "#d7a74b";
const brass = "#9d641e";

function GoldMaterial({ glow = 0.05 }: { glow?: number }) {
  return <meshStandardMaterial color={gold} metalness={0.91} roughness={0.22} emissive="#6f3e0b" emissiveIntensity={glow} />;
}

function Diya({ progress }: { progress: number }) {
  const flame = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const lit = THREE.MathUtils.smoothstep(progress, 0.008, 0.12);
    if (flame.current) {
      flame.current.scale.y = 0.8 + Math.sin(clock.getElapsedTime() * 8) * 0.12 + lit * 0.48;
      flame.current.rotation.z = Math.sin(clock.getElapsedTime() * 3) * 0.11;
    }
    if (light.current) light.current.intensity = 10 * lit;
  });
  return (
    <group position={[0, -0.2, 0]}>
      <mesh rotation={[0, 0, Math.PI]} scale={[1.65, 0.68, 1.65]}>
        <sphereGeometry args={[1, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color={brass} metalness={0.98} roughness={0.23} clearcoat={0.8} />
      </mesh>
      <mesh position={[0, 0.09, 0]} scale={[1.08, 0.13, 0.68]}><cylinderGeometry args={[1, 0.88, 1, 48]} /><GoldMaterial /></mesh>
      <mesh position={[0, -0.58, 0]} scale={[0.63, 0.55, 0.63]}><cylinderGeometry args={[0.58, 0.9, 0.7, 36]} /><GoldMaterial /></mesh>
      <mesh position={[0, 0.42, 0]} rotation={[0, 0, Math.PI / 4]}><coneGeometry args={[0.24, 1.2, 32]} /><meshStandardMaterial color="#ffd678" emissive="#ff6b19" emissiveIntensity={3.8} transparent opacity={0.94} /></mesh>
      <pointLight ref={light} color="#ffae4b" distance={12} decay={1.9} />
    </group>
  );
}

function Mandala({ position = [0, 1, -0.8] as [number, number, number], scale = 1, opacity = 1 }: { position?: [number, number, number]; scale?: number; opacity?: number }) {
  const group = useRef<THREE.Group>(null);
  const petals = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  useFrame(({ clock }) => { if (group.current) group.current.rotation.z = clock.getElapsedTime() * 0.065; });
  return (
    <group ref={group} position={position} scale={scale}>
      {[1.3, 2.05, 2.8].map((radius) => <mesh key={radius}><torusGeometry args={[radius, 0.018, 8, 96]} /><meshBasicMaterial color={gold} transparent opacity={opacity * 0.75} /></mesh>)}
      {petals.map((i) => {
        const a = (i / petals.length) * Math.PI * 2;
        return <mesh key={i} position={[Math.cos(a) * 2.38, Math.sin(a) * 2.38, 0]} rotation={[0, 0, a]}><circleGeometry args={[0.34, 20, 0, Math.PI]} /><meshBasicMaterial color={gold} transparent opacity={opacity * 0.65} side={THREE.DoubleSide} /></mesh>;
      })}
      <mesh><circleGeometry args={[0.55, 48]} /><meshBasicMaterial color="#f7d784" transparent opacity={opacity * 0.65} /></mesh>
    </group>
  );
}

function LifePaths({ progress }: { progress: number }) {
  const merge = THREE.MathUtils.smoothstep(progress, 0.34, 0.52);
  const path = (side: number) => new THREE.CatmullRomCurve3([
    new THREE.Vector3(side * 2.3, -1, 2), new THREE.Vector3(side * 2.2, -0.3, -2.3), new THREE.Vector3(side * (1.9 - merge * 1.5), 0.2, -5.4), new THREE.Vector3(side * (1 - merge), 0.5, -7.4), new THREE.Vector3(0, 0.9, -8.8),
  ]);
  return <group>
    {[-1, 1].map((side) => <group key={side}>
      <mesh><tubeGeometry args={[path(side), 96, 0.055, 12, false]} /><meshBasicMaterial color={gold} /></mesh>
      {[0, 1, 2].map((i) => <mesh key={i} position={[side * (2.1 - i * 0.23), -0.1 + i * 0.3, -1.2 - i * 2.1]}><octahedronGeometry args={[0.18, 0]} /><meshStandardMaterial color="#ffe29b" emissive="#c88124" emissiveIntensity={1.3} /></mesh>)}
    </group>)}
  </group>;
}

function Lotus({ progress }: { progress: number }) {
  const open = THREE.MathUtils.smoothstep(progress, 0.42, 0.57);
  const petals = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);
  return <group position={[0, 0.1, -5.5]}>
    {petals.map((i) => {
      const angle = (i / 12) * Math.PI * 2;
      return <mesh key={i} position={[Math.cos(angle) * (0.25 + open * 1.4), 0.15 + open * 0.12, Math.sin(angle) * (0.25 + open * 1.4)]} rotation={[0.4 + open * 0.8, -angle, 0]} scale={[0.48, 1.45, 0.13]}><sphereGeometry args={[1, 24, 12]} /><meshPhysicalMaterial color="#e3b451" metalness={0.65} roughness={0.25} emissive="#794210" emissiveIntensity={0.25} /></mesh>;
    })}
    <mesh position={[0, 0.17, 0]}><sphereGeometry args={[0.38, 24, 16]} /><meshStandardMaterial color="#ffdc70" emissive="#a86217" emissiveIntensity={1} /></mesh>
  </group>;
}

function DecisionRings({ progress }: { progress: number }) {
  const together = THREE.MathUtils.smoothstep(progress, 0.54, 0.68);
  return <group position={[0, 1, -7.2]} rotation={[Math.PI / 2.5, 0, 0]}>
    {[-1, 1].map((side) => <mesh key={side} position={[side * (1.15 - together * 1.12), 0, 0]} rotation={[0, 0, side * (0.45 - together * 0.45)]}><torusGeometry args={[0.95, 0.115, 18, 80]} /><meshPhysicalMaterial color="#e4b451" metalness={1} roughness={0.12} clearcoat={1} /></mesh>)}
  </group>;
}

function Mandapam({ progress }: { progress: number }) {
  const reveal = THREE.MathUtils.smoothstep(progress, 0.64, 0.83);
  const pillars = [[-3.3, -10], [3.3, -10], [-3.3, -13], [3.3, -13]];
  return <group position={[0, -1, 0]} scale={0.15 + reveal * 0.85}>
    <mesh position={[0, 3.5, -11.5]} scale={[4.5, 0.25, 3.2]}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#5a251c" metalness={0.2} roughness={0.52} /></mesh>
    <mesh position={[0, 4.25, -11.5]} scale={[4.7, 0.5, 3.4]}><coneGeometry args={[1, 1, 4]} /><meshStandardMaterial color="#9b6325" metalness={0.6} roughness={0.3} /></mesh>
    {pillars.map(([x, z], i) => <group key={i} position={[x, 1.1, z]}>
      <mesh scale={[0.34, 2.5, 0.34]}><cylinderGeometry args={[1, 1, 1, 16]} /><meshPhysicalMaterial color="#9a5b20" metalness={0.72} roughness={0.28} /></mesh>
      <mesh position={[0, 2.6, 0]} scale={[0.62, 0.14, 0.62]}><cylinderGeometry args={[1, 1, 1, 20]} /><GoldMaterial /></mesh>
    </group>)}
    {Array.from({ length: 16 }, (_, i) => <mesh key={i} position={[-3.7 + i * 0.5, 3.1 + Math.sin(i) * 0.15, -9.8]}><sphereGeometry args={[0.12, 12, 8]} /><meshStandardMaterial color={i % 3 ? "#e39c2c" : "#f6e6b7"} /></mesh>)}
    <Diya progress={1} />
  </group>;
}

function World({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const haze = THREE.MathUtils.smoothstep(progress, 0.55, 1);
  return <>
    <color attach="background" args={["#160a0a"]} />
    <fog attach="fog" args={["#160a0a", 7, 31]} />
    <ambientLight intensity={0.28 + haze * 0.35} color="#ffddaa" />
    <directionalLight position={[4, 8, 6]} intensity={1.25} color="#ffd588" castShadow />
    <spotLight position={[-4, 6, 4]} intensity={3.6} angle={0.46} penumbra={0.8} color="#c87b35" />
    <ParticleField count={reducedMotion ? 80 : 380} radius={17} />
    <Diya progress={progress} />
    <Mandala scale={0.35 + THREE.MathUtils.smoothstep(progress, 0.08, 0.25) * 1.1} opacity={THREE.MathUtils.smoothstep(progress, 0.06, 0.19)} />
    <LifePaths progress={progress} />
    <Lotus progress={progress} />
    <DecisionRings progress={progress} />
    <Mandala position={[-4.1, 1.8, -8]} scale={0.65} opacity={THREE.MathUtils.smoothstep(progress, 0.59, 0.73)} />
    <Mandala position={[4.1, 1.8, -8]} scale={0.65} opacity={THREE.MathUtils.smoothstep(progress, 0.59, 0.73)} />
    <Mandapam progress={progress} />
    <ContactShadows position={[0, -1.05, 0]} opacity={0.32} scale={12} blur={2.5} far={8} />
    <CinematicCamera progress={progress} reducedMotion={reducedMotion} />
  </>;
}

export default function CinematicWorld({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  return (
    <div className="world-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.75]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }} shadows>
        <PerspectiveCamera makeDefault fov={38} position={[0, 1.2, 10]} />
        <World progress={progress} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
