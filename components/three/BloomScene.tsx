"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Géométrie d'un pétale : forme en goutte, légèrement creusée (cupping). */
function makePetalGeometry(): THREE.ShapeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.5, 0.15, 0.58, 0.85, 0, 1.25);
  shape.bezierCurveTo(-0.58, 0.85, -0.5, 0.15, 0, 0);
  const geo = new THREE.ShapeGeometry(shape, 24);

  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    // Creuse le pétale : bombé au centre, relevé sur les bords et la pointe.
    const z = Math.sin((y / 1.25) * Math.PI) * 0.22 - Math.abs(x) * 0.25;
    pos.setZ(i, z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

interface LayerSpec {
  nb: number;
  scale: number;
  openAngle: number;
  delay: number;
  offset: number;
}

const LAYERS: LayerSpec[] = [
  { nb: 8, scale: 1.0, openAngle: 1.35, delay: 0.0, offset: 0 },
  { nb: 7, scale: 0.74, openAngle: 1.0, delay: 0.22, offset: 0.45 },
  { nb: 5, scale: 0.48, openAngle: 0.62, delay: 0.45, offset: 0.2 },
];

const CLOSED_ANGLE = 0.09;

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function Flower({
  progressRef,
  petale,
  coeur,
}: {
  progressRef: MutableRefObject<number>;
  petale: string;
  coeur: string;
}) {
  const flowerRef = useRef<THREE.Group>(null);
  const petalRefs = useRef<{ mesh: THREE.Mesh; layer: LayerSpec }[]>([]);
  petalRefs.current = [];

  const petalGeo = useMemo(() => makePetalGeometry(), []);

  const stemGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.25, -4.2, 0),
      new THREE.Vector3(-0.12, -2.8, 0.1),
      new THREE.Vector3(0.08, -1.4, -0.05),
      new THREE.Vector3(0, -0.05, 0),
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.05, 8, false);
  }, []);

  const registerPetal = (layer: LayerSpec) => (mesh: THREE.Mesh | null) => {
    if (mesh) petalRefs.current.push({ mesh, layer });
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const bloom = THREE.MathUtils.clamp(progressRef.current, 0, 1);

    for (const { mesh, layer } of petalRefs.current) {
      const lb = smoothstep(
        THREE.MathUtils.clamp((bloom - layer.delay) / (1 - layer.delay), 0, 1)
      );
      mesh.rotation.x = CLOSED_ANGLE + lb * (layer.openAngle - CLOSED_ANGLE);
    }

    if (flowerRef.current) {
      flowerRef.current.rotation.y = t * 0.18 + bloom * Math.PI * 0.5;
      flowerRef.current.rotation.z = Math.sin(t * 0.4) * 0.03;
      flowerRef.current.position.y = Math.sin(t * 0.6) * 0.06 + bloom * 0.4;
      const s = 0.85 + bloom * 0.35;
      flowerRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={[0, 0.4, 0]}>
      <group ref={flowerRef}>
        {LAYERS.map((layer, li) => (
          <group key={li}>
            {Array.from({ length: layer.nb }, (_, i) => (
              <group
                key={i}
                rotation={[0, (Math.PI * 2 * i) / layer.nb + layer.offset, 0]}
              >
                <mesh
                  ref={registerPetal(layer)}
                  geometry={petalGeo}
                  scale={layer.scale}
                  rotation={[CLOSED_ANGLE, 0, 0]}
                >
                  <meshStandardMaterial
                    color={petale}
                    roughness={0.55}
                    metalness={0}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              </group>
            ))}
          </group>
        ))}
        {/* Cœur de la fleur */}
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial color={coeur} roughness={0.8} />
        </mesh>
      </group>

      {/* Tige */}
      <mesh geometry={stemGeo}>
        <meshStandardMaterial color="#3D4A3E" roughness={0.7} />
      </mesh>
      {/* Feuilles */}
      <mesh
        geometry={petalGeo}
        position={[0.05, -2.2, 0]}
        rotation={[0.4, 0.6, 1.45]}
        scale={0.7}
      >
        <meshStandardMaterial color="#4d5e4e" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        geometry={petalGeo}
        position={[-0.02, -3.1, 0.05]}
        rotation={[-0.3, -0.8, -1.5]}
        scale={0.55}
      >
        <meshStandardMaterial color="#46553f" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/**
 * Travelling d'approche : la caméra part très loin (fleur noyée dans le
 * brouillard) et s'avance pendant que la section précédente défile —
 * la fleur « arrive du fond ».
 */
function CameraRig({ approachRef }: { approachRef: MutableRefObject<number> }) {
  useFrame(({ camera }) => {
    const a = smoothstep(THREE.MathUtils.clamp(approachRef.current, 0, 1));
    const targetZ = 24 - a * 17.8; // 24 → 6.2
    const targetY = 0.4 + (1 - a) * 2.2;
    camera.position.z += (targetZ - camera.position.z) * 0.09;
    camera.position.y += (targetY - camera.position.y) * 0.09;
    camera.lookAt(0, 0.4, 0);
  });
  return null;
}

/**
 * Scène « Éclosion » : fleur procédurale (3 couronnes de pétales) qui
 * s'ouvre pilotée par le scroll (progressRef ∈ [0, 1]), précédée d'un
 * travelling d'approche dans le brouillard (approachRef ∈ [0, 1]).
 */
export default function BloomScene({
  progressRef,
  approachRef,
  petale,
  coeur,
}: {
  progressRef: MutableRefObject<number>;
  approachRef: MutableRefObject<number>;
  petale: string;
  coeur: string;
}) {
  return (
    <Canvas
      camera={{ position: [0, 2.6, 24], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      {/* Brouillard accordé au fond de la section : la fleur en émerge. */}
      <fog attach="fog" args={["#131a14", 6, 19]} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} color="#FFF4E0" />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#B8814A" />
      <CameraRig approachRef={approachRef} />
      <Flower progressRef={progressRef} petale={petale} coeur={coeur} />
    </Canvas>
  );
}
