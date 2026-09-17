"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import type { GalleryPhoto } from "@/data/wedding";

const LAYOUT: Array<[number, number, number]> = [
  [-2.6, 1.2, -1],
  [2.4, 0.6, -2.4],
  [-1.4, -1.1, -0.6],
  [1.8, -1.6, -1.8],
  [-3.2, -0.4, -3],
  [0.2, 1.8, -3.2],
  [3, 1.9, -0.8],
  [-0.6, -2.1, -2.2],
];

function FloatingPhoto({
  photo,
  position,
  index,
  onSelect,
}: {
  photo: GalleryPhoto;
  position: [number, number, number];
  index: number;
  onSelect: (i: number) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let cancelled = false;
    loader.load(
      photo.src,
      (tex) => {
        if (!cancelled) {
          tex.colorSpace = THREE.SRGBColorSpace;
          setTexture(tex);
        }
      },
      undefined,
      () => !cancelled && setFailed(true)
    );
    return () => {
      cancelled = true;
    };
  }, [photo.src]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 0.4 + index) * 0.15;
    meshRef.current.rotation.y = Math.sin(t * 0.2 + index) * 0.1;
    const targetScale = hovered ? 1.12 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <planeGeometry args={[1.5, 1.9]} />
      {texture && !failed ? (
        <meshBasicMaterial map={texture} toneMapped={false} />
      ) : (
        <meshBasicMaterial color="#4A1420" />
      )}
    </mesh>
  );
}

export function MemoryUniverseScene({
  photos,
  onSelect,
}: {
  photos: GalleryPhoto[];
  onSelect: (i: number) => void;
}) {
  const { camera } = useThree();
  const positions = useMemo(
    () => photos.map((_, i) => LAYOUT[i % LAYOUT.length]),
    [photos]
  );

  useFrame(({ clock }) => {
    camera.position.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.6;
    camera.position.y = Math.cos(clock.getElapsedTime() * 0.06) * 0.3;
    camera.lookAt(0, 0, -1.5);
  });

  return (
    <group>
      {photos.map((photo, i) => (
        <FloatingPhoto key={photo.src} photo={photo} position={positions[i]} index={i} onSelect={onSelect} />
      ))}
    </group>
  );
}
