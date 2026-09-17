"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type CanvasProps = { progress: number; reducedMotion: boolean };

const gold = new THREE.Color("#e5bb67");
const burgundy = new THREE.Color("#21080f");

function clamp(value: number) {
  return THREE.MathUtils.clamp(value, 0, 1);
}

function range(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start));
}

function visibility(progress: number, start: number, end: number, fade = 0.025) {
  return Math.min(range(progress, start - fade, start + fade), 1 - range(progress, end - fade, end + fade)) * 2;
}

function CameraDirector({ progress, reducedMotion }: CanvasProps) {
  const { camera } = useThree();

  useFrame((_state, delta) => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    const x = Math.sin(progress * Math.PI * 4) * 1.8;
    const y = 0.45 + Math.sin(progress * Math.PI * 2) * 0.55;
    const z = 12 - progress * 4;
    const smoothing = reducedMotion ? 1 : Math.min(1, delta * 1.45);
    perspectiveCamera.position.lerp(new THREE.Vector3(x, y, z), smoothing);
    perspectiveCamera.fov = THREE.MathUtils.lerp(perspectiveCamera.fov, 43 + Math.sin(progress * Math.PI) * 6, smoothing);
    perspectiveCamera.updateProjectionMatrix();
    perspectiveCamera.lookAt(0, 0.4, -1.6);
  });
  return null;
}

function GoldenDust({ progress, reducedMotion }: CanvasProps) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const points = new Float32Array(900 * 3);
    for (let i = 0; i < points.length; i += 3) {
      const radius = 3 + Math.random() * 13;
      const angle = Math.random() * Math.PI * 2;
      points[i] = Math.cos(angle) * radius;
      points[i + 1] = (Math.random() - 0.5) * 9;
      points[i + 2] = -Math.random() * 15;
    }
    return points;
  }, []);

  useFrame((_state, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.018;
    ref.current.rotation.z = Math.sin(progress * Math.PI * 3) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f7d889" size={0.027} transparent opacity={0.82} sizeAttenuation />
    </points>
  );
}

function Encounter({ progress }: { progress: number }) {
  const ref = useRef<THREE.Group>(null);
  const t = range(progress, 0, 0.13);
  const opening = visibility(progress, 0, 0.14);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(progress * 16) * 0.12;
  });
  return (
    <group ref={ref} visible={opening > 0.02} scale={opening}>
      <pointLight color="#f3be62" intensity={20 * opening} distance={8} />
      <mesh position={[-5 + t * 5, 0.3, -1]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color="#fff2b8" emissive="#e5a842" emissiveIntensity={4} />
      </mesh>
      <mesh position={[5 - t * 5, -0.3, -1]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color="#fff2b8" emissive="#e5a842" emissiveIntensity={4} />
      </mesh>
      <mesh position={[0, 0, -1]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.75 + t * 0.7, 0.018, 10, 90]} />
        <meshStandardMaterial color="#d9ab5e" emissive="#7c3c19" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

function Worlds({ progress }: { progress: number }) {
  const visible = visibility(progress, 0.10, 0.25);
  const paths = useMemo(() => {
    const a = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, -2.4, -3), new THREE.Vector3(-3, -0.6, -2), new THREE.Vector3(-1, 0, -3), new THREE.Vector3(0, 0, -4)
    ]);
    const b = new THREE.CatmullRomCurve3([
      new THREE.Vector3(6, 2.2, -3), new THREE.Vector3(3, 0.7, -2), new THREE.Vector3(1, 0, -3), new THREE.Vector3(0, 0, -4)
    ]);
    return [new THREE.TubeGeometry(a, 80, 0.025, 8, false), new THREE.TubeGeometry(b, 80, 0.025, 8, false)];
  }, []);
  return (
    <group scale={Math.max(0.001, visible)}>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 3.8, 0, -3]}>
          <mesh>
            <icosahedronGeometry args={[1.7, 2]} />
            <meshPhysicalMaterial color={side < 0 ? "#5f1830" : "#382022"} metalness={0.55} roughness={0.38} transmission={0.05} transparent opacity={0.82} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <torusGeometry args={[1.95, 0.018, 8, 90]} />
            <meshStandardMaterial color="#d9ad62" emissive="#95622b" emissiveIntensity={1} />
          </mesh>
          {[-0.8, 0.7].map((y) => (
            <mesh key={y} position={[0, y, 1.2]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color="#fae8a9" emissive="#e4a64c" emissiveIntensity={3} />
            </mesh>
          ))}
        </group>
      ))}
      {paths.map((path, index) => <mesh geometry={path} key={index}><meshStandardMaterial color="#eac06d" emissive="#8f531c" emissiveIntensity={1.7} /></mesh>)}
    </group>
  );
}

function FlowerAndHeart({ progress }: { progress: number }) {
  const flowerVisibility = visibility(progress, 0.20, 0.35);
  const heartVisibility = visibility(progress, 0.30, 0.46);
  const petals = Array.from({ length: 10 });
  const heart = useMemo(() => {
    const vertices: number[] = [];
    for (let i = 0; i < 190; i++) {
      const theta = (i / 190) * Math.PI * 2;
      const x = 0.15 * 16 * Math.pow(Math.sin(theta), 3);
      const y = 0.15 * (13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta));
      vertices.push(x, y, -2 + (Math.random() - 0.5) * 0.25);
    }
    return new Float32Array(vertices);
  }, []);
  return (
    <>
      <group scale={Math.max(0.001, flowerVisibility)} rotation={[0, 0, progress * 2]} position={[0, 0, -2]}>
        {petals.map((_, index) => {
          const angle = (index / petals.length) * Math.PI * 2;
          return <mesh key={index} position={[Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0]} rotation={[0, 0, angle]}><sphereGeometry args={[0.82, 24, 16]} /><meshPhysicalMaterial color="#a44755" metalness={0.18} roughness={0.38} /></mesh>;
        })}
        <mesh><sphereGeometry args={[0.72, 32, 32]} /><meshStandardMaterial color="#d7a04a" emissive="#714319" emissiveIntensity={1.5} /></mesh>
      </group>
      <group scale={Math.max(0.001, heartVisibility * (0.8 + Math.sin(progress * 42) * 0.05))} position={[0, 0.15, -2]}>
        <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[heart, 3]} /></bufferGeometry><pointsMaterial color="#ffd982" size={0.075} transparent opacity={0.95} /></points>
        <pointLight color="#eebb64" intensity={heartVisibility * 5} distance={6} />
      </group>
    </>
  );
}

function StormAndChoice({ progress }: { progress: number }) {
  const storm = visibility(progress, 0.42, 0.55);
  const choice = visibility(progress, 0.52, 0.63);
  const drops = useMemo(() => Array.from({ length: 55 }, (_, index) => [((index * 31) % 11) - 5.5, ((index * 17) % 8) - 4, -2 - (index % 5)]), []);
  return <>
    <group visible={storm > 0.02} scale={Math.max(0.001, storm)}>
      {drops.map(([x, y, z], index) => <mesh key={index} position={[x, y, z]} rotation={[0.6, 0.2, 0.2]}><capsuleGeometry args={[0.012, 0.32, 4, 8]} /><meshStandardMaterial color="#7c7b9a" emissive="#27283e" emissiveIntensity={1} /></mesh>)}
      <mesh position={[0, -0.1, -3]} rotation={[0.15, 0, 0]}><torusGeometry args={[2.1, 0.03, 10, 80, Math.PI * 1.4]} /><meshStandardMaterial color="#61263b" /></mesh>
    </group>
    <group scale={Math.max(0.001, choice)}>
      <mesh position={[-1.1, 0, -2]}><sphereGeometry args={[0.13, 24, 24]} /><meshStandardMaterial color="#fff0b4" emissive="#efb348" emissiveIntensity={5} /></mesh>
      <mesh position={[1.1, 0, -2]}><sphereGeometry args={[0.13, 24, 24]} /><meshStandardMaterial color="#fff0b4" emissive="#efb348" emissiveIntensity={5} /></mesh>
      <mesh position={[0, 0, -2]}><sphereGeometry args={[0.24, 24, 24]} /><meshStandardMaterial color="#fff3bb" emissive="#eab64e" emissiveIntensity={5} /></mesh>
      <pointLight color="#eab64e" intensity={choice * 13} distance={7} />
    </group>
  </>;
}

function Tree({ progress }: { progress: number }) {
  const shown = visibility(progress, 0.60, 0.72);
  const growth = range(progress, 0.60, 0.69);
  const branches = Array.from({ length: 11 });
  return <group scale={Math.max(0.001, shown)} position={[0, -2.2, -4]}>
    <mesh scale={[1, 1 + growth * 2.2, 1]} position={[0, growth * 1.1, 0]}><cylinderGeometry args={[0.13, 0.22, 2.6, 9]} /><meshStandardMaterial color="#412219" roughness={0.85} /></mesh>
    {branches.map((_, index) => {
      const angle = (index / branches.length) * Math.PI * 2;
      const y = 0.35 + (index % 4) * 0.48;
      return <group key={index} position={[0, y + growth * 1.1, 0]} rotation={[0, -angle, -0.8]} scale={growth}><mesh position={[0, 0.7, 0]}><cylinderGeometry args={[0.025, 0.075, 1.45, 7]} /><meshStandardMaterial color="#513123" /></mesh><mesh position={[0, 1.45, 0]}><sphereGeometry args={[0.38, 16, 16]} /><meshStandardMaterial color="#9b4050" emissive="#4d1a24" emissiveIntensity={0.4} /></mesh></group>;
    })}
    <pointLight color="#e6b85b" intensity={shown * 4} distance={8} />
  </group>;
}

function RingsAndRoad({ progress }: { progress: number }) {
  const rings = visibility(progress, 0.69, 0.79);
  const road = visibility(progress, 0.76, 0.91);
  return <>
    <group scale={Math.max(0.001, rings)} rotation={[0.35, progress * 8, 0]} position={[0, 0, -2.6]}>
      <mesh position={[-0.52, 0, 0]}><torusGeometry args={[0.92, 0.1, 24, 80]} /><meshPhysicalMaterial color="#d9aa54" metalness={0.96} roughness={0.19} /></mesh>
      <mesh position={[0.52, 0, 0]}><torusGeometry args={[0.92, 0.1, 24, 80]} /><meshPhysicalMaterial color="#e5bd78" metalness={0.96} roughness={0.19} /></mesh>
    </group>
    <group visible={road > 0.02} scale={[road, road, road]}>
      <mesh position={[0, -2.65, -8]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[4.2, 20]} /><meshStandardMaterial color="#4a231e" metalness={0.24} roughness={0.78} /></mesh>
      <mesh position={[0, -2.61, -8]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.06, 20]} /><meshStandardMaterial color="#e8b855" emissive="#9f611c" emissiveIntensity={1.6} /></mesh>
    </group>
  </>;
}

function Mandapam({ progress }: { progress: number }) {
  const visible = visibility(progress, 0.85, 1);
  return <group scale={Math.max(0.001, visible)} position={[0, -1.5, -5]}>
    {[-2.1, 2.1].flatMap((x) => [-1.3, 1.3].map((z) => <group key={`${x}-${z}`} position={[x, 0, z]}><mesh><cylinderGeometry args={[0.22, 0.28, 3.3, 12]} /><meshPhysicalMaterial color="#bd8a44" metalness={0.72} roughness={0.28} /></mesh><mesh position={[0, 1.7, 0]}><sphereGeometry args={[0.32, 18, 18]} /><meshStandardMaterial color="#f5cd78" emissive="#a26420" emissiveIntensity={1.5} /></mesh></group>))}
    <mesh position={[0, 1.65, 0]}><boxGeometry args={[5.4, 0.32, 3.9]} /><meshPhysicalMaterial color="#a8753c" metalness={0.62} roughness={0.28} /></mesh>
    <mesh position={[0, 1.98, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[3.25, 1.55, 4]} /><meshStandardMaterial color="#5c1727" metalness={0.22} roughness={0.52} /></mesh>
    {Array.from({ length: 8 }).map((_, index) => <mesh key={index} position={[-2.35 + index * 0.67, 1.18, 1.72]}><sphereGeometry args={[0.11, 12, 12]} /><meshStandardMaterial color={index % 2 ? "#f0b84f" : "#f3e5b5"} emissive="#8c421a" emissiveIntensity={1.3} /></mesh>)}
    <pointLight position={[0, 1, 1]} color="#ffca6a" intensity={visible * 18} distance={9} />
  </group>;
}

function StoryWorld(props: CanvasProps) {
  const background = burgundy.clone().lerp(new THREE.Color("#10080b"), Math.sin(props.progress * Math.PI) * 0.4);
  return <>
    <color attach="background" args={[background]} />
    <fog attach="fog" args={[background, 7, 24]} />
    <ambientLight intensity={0.6} color="#f4d6a1" />
    <directionalLight position={[-4, 6, 4]} intensity={2.2} color="#e9b45d" />
    <CameraDirector {...props} />
    <GoldenDust {...props} />
    <Stars radius={38} depth={25} count={900} factor={2} saturation={0} fade speed={props.reducedMotion ? 0 : 0.5} />
    <Sparkles count={props.reducedMotion ? 25 : 75} scale={10} size={2.1} speed={0.25} color="#edc878" />
    <Encounter progress={props.progress} />
    <Worlds progress={props.progress} />
    <FlowerAndHeart progress={props.progress} />
    <StormAndChoice progress={props.progress} />
    <Tree progress={props.progress} />
    <RingsAndRoad progress={props.progress} />
    <Mandapam progress={props.progress} />
    {!props.reducedMotion && <EffectComposer multisampling={0}><Bloom intensity={0.75} luminanceThreshold={0.6} mipmapBlur /><Vignette eskil={false} offset={0.18} darkness={0.82} /></EffectComposer>}
  </>;
}

export function CinematicCanvas(props: CanvasProps) {
  return <Canvas dpr={[1, props.reducedMotion ? 1 : 1.6]} gl={{ antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 0, 12], fov: 48 }}>
    <StoryWorld {...props} />
  </Canvas>;
}
