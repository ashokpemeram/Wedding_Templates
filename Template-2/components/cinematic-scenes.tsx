"use client";

import { Line, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type SceneKind = "paths" | "meeting" | "tree" | "storm" | "choice" | "journey" | "memories" | "ring" | "mandapam" | "forever";

function Embers({ count = 70, colour = "#f7c96c" }: { count?: number; colour?: string }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 11;
      data[i * 3 + 1] = (Math.random() - 0.5) * 7;
      data[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return data;
  }, [count]);
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.035;
      points.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.12;
    }
  });
  return <points ref={points}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color={colour} size={0.035} sizeAttenuation transparent opacity={0.75} /></points>;
}

function Paths({ joined = false }: { joined?: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => { if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.14; });
  const left: [number, number, number][] = [[-3.9,-1.8,0],[-2.8,-0.7,0.2],[-2.5,0.8,-0.3],[-1.2,1.5,0],[joined ? 0 : -1.4,2.2,0.1],[joined ? 1.9 : -2.6,2.9,0]];
  const right: [number, number, number][] = [[3.9,-1.8,0],[2.8,-0.7,-0.2],[2.5,0.8,0.3],[1.2,1.5,0],[joined ? 0 : 1.4,2.2,-0.1],[joined ? 1.9 : 2.6,2.9,0]];
  return <group ref={group}><Line points={left} color="#c99442" lineWidth={1.15} transparent opacity={0.9} /><Line points={right} color="#f1d49a" lineWidth={1.15} transparent opacity={0.9} />{joined && <pointLight position={[0,2.15,1]} color="#ffd782" intensity={18} distance={5} />}<Embers /></group>;
}

function LoveTree() {
  const tree = useRef<THREE.Group>(null);
  useFrame((state) => { if (tree.current) tree.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.18; });
  const branches = Array.from({ length: 12 }, (_, i) => i);
  return <group ref={tree} position={[0,-1.7,0]}><mesh><cylinderGeometry args={[0.18, 0.33, 3.6, 10]} /><meshStandardMaterial color="#6d3c26" roughness={0.85} /></mesh>{branches.map((i) => { const a = (i / branches.length) * Math.PI * 2; const y = 0.3 + (i % 4) * 0.65; return <group key={i} position={[0,y,0]} rotation={[0,-a,Math.PI / 3.5]}><mesh position={[0,0.75,0]}><cylinderGeometry args={[0.065,0.12,1.65,7]} /><meshStandardMaterial color="#76452b" /></mesh><mesh position={[0,1.6,0]}><sphereGeometry args={[0.42,12,12]} /><meshStandardMaterial color={i % 2 ? "#c99442" : "#8f9b55"} emissive="#6d5223" emissiveIntensity={0.35} /></mesh></group>; })}<Embers count={45} colour="#efc86d" /></group>;
}

function Rain() {
  const rain = useRef<THREE.Points>(null);
  const drops = useMemo(() => {
    const data = new Float32Array(240 * 3);
    for (let i = 0; i < 240; i += 1) { data[i*3]=(Math.random()-.5)*11; data[i*3+1]=Math.random()*8-3; data[i*3+2]=(Math.random()-.5)*4; }
    return data;
  }, []);
  useFrame((_, delta) => { if (rain.current) { rain.current.position.y -= delta * 1.6; if (rain.current.position.y < -2) rain.current.position.y = 1.8; } });
  return <points ref={rain}><bufferGeometry><bufferAttribute attach="attributes-position" args={[drops,3]} /></bufferGeometry><pointsMaterial color="#a3b7d1" size={0.026} transparent opacity={0.75} /></points>;
}

function Choice() {
  const lights = useRef<THREE.Group>(null);
  useFrame((state) => { if (lights.current) { const t=Math.sin(state.clock.elapsedTime*.5); lights.current.children[0].position.x=-1.6+t*.75; lights.current.children[1].position.x=1.6-t*.75; lights.current.rotation.z=Math.sin(state.clock.elapsedTime*.25)*.08; } });
  return <group ref={lights}><pointLight position={[-1.2,0,1]} color="#fdc86a" intensity={22} distance={5} /><pointLight position={[1.2,0,1]} color="#ffe5ad" intensity={22} distance={5} /><mesh position={[-1.5,0,0]}><sphereGeometry args={[0.13,24,24]} /><meshBasicMaterial color="#f8c968" /></mesh><mesh position={[1.5,0,0]}><sphereGeometry args={[0.13,24,24]} /><meshBasicMaterial color="#ffe2a3" /></mesh><Embers count={130} colour="#ffd476" /></group>;
}

function Globe() {
  const globe = useRef<THREE.Group>(null);
  useFrame((state) => { if (globe.current) globe.current.rotation.y = state.clock.elapsedTime * 0.08; });
  return <group ref={globe}><mesh><sphereGeometry args={[1.8,36,36]} /><meshStandardMaterial color="#142323" metalness={0.7} roughness={0.28} emissive="#0d1718" /></mesh><mesh scale={1.013}><sphereGeometry args={[1.8,36,36]} /><meshBasicMaterial color="#d4aa56" wireframe transparent opacity={0.22} /></mesh>{[[1.32,.55,1.05],[-.6,.9,1.55],[-1.35,-.55,.95]].map((p,i)=><group key={i} position={p as [number,number,number]}><mesh><sphereGeometry args={[0.07,16,16]} /><meshBasicMaterial color="#ffdf8b" /></mesh><pointLight color="#f9c95d" intensity={5} distance={1.5} /></group>)}<Embers count={30} colour="#bd9a55" /></group>;
}

function MemoryField() {
  const field = useRef<THREE.Group>(null);
  useFrame((state) => { if (field.current) field.current.rotation.y = Math.sin(state.clock.elapsedTime*.15)*.16; });
  return <group ref={field}>{Array.from({length:8},(_,i)=>{ const a=(i/8)*Math.PI*2; return <mesh key={i} position={[Math.cos(a)*2.7, Math.sin(i*2.1)*1.15, Math.sin(a)*1.2]} rotation={[0,-a,0]}><planeGeometry args={[1.25,.9]} /><meshStandardMaterial color={i%2?"#b7825d":"#d6b77a"} emissive="#442e23" emissiveIntensity={0.45} /></mesh>; })}<Embers count={55} /></group>;
}

function Ring() {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state) => { if (ring.current) { ring.current.rotation.x = state.clock.elapsedTime * 0.18; ring.current.rotation.y = state.clock.elapsedTime * 0.26; } });
  return <group><mesh ref={ring} rotation={[0.8,0.1,0]}><torusGeometry args={[1.35,.105,18,90]} /><meshStandardMaterial color="#d9ad52" metalness={0.95} roughness={0.15} emissive="#725223" emissiveIntensity={0.55} /></mesh><pointLight position={[1.8,1.8,2]} color="#ffe5a7" intensity={28} distance={6} /><Embers count={28} /></group>;
}

function Mandapam() {
  return <group position={[0,-1.35,0]}>{[-2.1,2.1].map(x=><mesh key={x} position={[x,1,0]}><cylinderGeometry args={[.11,.18,2.5,8]} /><meshStandardMaterial color="#c9953e" metalness={.5} /></mesh>)}<mesh position={[0,2.25,0]}><boxGeometry args={[5,.18,.25]} /><meshStandardMaterial color="#d5ad5e" metalness={.5} /></mesh>{[-1.45,-.72,0,.72,1.45].map(x=><mesh key={x} position={[x,2.62,0]}><coneGeometry args={[.4,.85,12]} /><meshStandardMaterial color="#a54432" /></mesh>)}<Embers count={55} /></group>;
}

function SceneContents({ kind, compact }: { kind: SceneKind; compact: boolean }) {
  const count = compact ? 350 : 900;
  return <><ambientLight intensity={kind === "storm" ? 0.25 : 0.65} /><Stars radius={22} depth={12} count={count} factor={2} saturation={0} fade speed={0.25} />
    {kind === "paths" && <Paths />}{kind === "meeting" && <><Paths joined /><Choice /></>}{kind === "tree" && <LoveTree />}{kind === "storm" && <Rain />}{kind === "choice" && <Choice />}{kind === "journey" && <Globe />}{kind === "memories" && <MemoryField />}{kind === "ring" && <Ring />}{kind === "mandapam" && <Mandapam />}{kind === "forever" && <Paths joined />}
  </>;
}

export function CinematicScene({ kind, label }: { kind: SceneKind; label: string }) {
  const [compact, setCompact] = useState(false);
  useEffect(() => { const query=window.matchMedia("(max-width: 720px), (prefers-reduced-motion: reduce)"); const sync=()=>setCompact(query.matches); sync(); query.addEventListener("change",sync); return ()=>query.removeEventListener("change",sync); }, []);
  return <div className={`scene scene-${kind}`} role="img" aria-label={label}><Canvas dpr={compact ? 1 : [1,1.5]} camera={{ position:[0,0,6.6], fov:45 }} gl={{ antialias: !compact, alpha: true, powerPreference:"high-performance" }}><Suspense fallback={null}><SceneContents kind={kind} compact={compact} /></Suspense></Canvas></div>;
}
