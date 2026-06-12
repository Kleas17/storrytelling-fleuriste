"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PETAL_COLORS = ["#F5F0EB", "#D8C9B8", "#B8814A", "#7C9473", "#EDE8E1"];

function makePetalTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.55, "rgba(255,255,255,0.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  // Forme de pétale : ellipse allongée
  ctx.save();
  ctx.translate(size / 2, size / 2);
  ctx.scale(0.62, 1);
  ctx.beginPath();
  ctx.arc(0, 0, size / 2 - 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

interface PetalData {
  x: number;
  y: number;
  z: number;
  fallSpeed: number;
  swayAmp: number;
  swaySpeed: number;
  phase: number;
  rotSpeed: number;
  scale: number;
}

function Petals({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const texture = useMemo(() => makePetalTexture(), []);

  const petals = useMemo<PetalData[]>(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 18,
        y: (Math.random() - 0.5) * 14,
        z: (Math.random() - 0.5) * 8,
        fallSpeed: 0.12 + Math.random() * 0.3,
        swayAmp: 0.4 + Math.random() * 0.9,
        swaySpeed: 0.25 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 1.4,
        scale: 0.07 + Math.random() * 0.16,
      })),
    [count]
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    const group = groupRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;

    // Parallaxe 3D subtile pilotée par la souris.
    if (group) {
      group.rotation.y += (state.pointer.x * 0.12 - group.rotation.y) * 0.04;
      group.rotation.x += (-state.pointer.y * 0.08 - group.rotation.x) * 0.04;
    }

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      // Chute lente, bouclée verticalement
      const fall = (p.y - t * p.fallSpeed) % 14;
      const y = ((fall + 14) % 14) - 7;
      const x = p.x + Math.sin(t * p.swaySpeed + p.phase) * p.swayAmp;
      const z = p.z + Math.cos(t * p.swaySpeed * 0.7 + p.phase) * 0.5;
      dummy.position.set(x, y, z);
      dummy.rotation.set(t * p.rotSpeed + p.phase, t * p.rotSpeed * 0.8, p.phase);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  const setInstanceColors = (mesh: THREE.InstancedMesh | null) => {
    (meshRef as React.MutableRefObject<THREE.InstancedMesh | null>).current = mesh;
    if (!mesh) return;
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      c.set(PETAL_COLORS[i % PETAL_COLORS.length]);
      mesh.setColorAt(i, c);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  };

  return (
    <group ref={groupRef}>
      <instancedMesh ref={setInstanceColors} args={[undefined, undefined, count]} frustumCulled={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          opacity={0.85}
        />
      </instancedMesh>
    </group>
  );
}

/**
 * Scène hero : pétales en particules flottants (instanced mesh, 60 fps).
 * Le nombre de particules est réduit sur mobile.
 */
export default function PetalsScene({ count = 320 }: { count?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <Petals count={count} />
    </Canvas>
  );
}
