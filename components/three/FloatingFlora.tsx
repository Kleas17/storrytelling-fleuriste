"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PETALES_SAISON, FLEUR_SAISON, getSaisonActuelle } from "@/lib/saison-actuelle";
import { mulberry32 } from "@/lib/utils";

/** Pétale en goutte, légèrement creusé. */
function makePetalGeometry(): THREE.ShapeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.5, 0.15, 0.58, 0.85, 0, 1.25);
  shape.bezierCurveTo(-0.58, 0.85, -0.5, 0.15, 0, 0);
  const geo = new THREE.ShapeGeometry(shape, 16);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    pos.setZ(i, Math.sin((y / 1.25) * Math.PI) * 0.2 - Math.abs(x) * 0.2);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

const wrap = (v: number, min: number, max: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface FloraItem {
  baseX: number;
  baseY: number;
  z: number;
  scale: number;
  petales: number;
  speed: number; // facteur de parallaxe scroll — décorrélé par profondeur
  rotSpeed: THREE.Vector3;
  bobPhase: number;
  opacity: number;
  color: string;
  coeur: string;
}

function Flora() {
  const groupRef = useRef<THREE.Group>(null);
  const itemRefs = useRef<(THREE.Group | null)[]>([]);
  const petalGeo = useMemo(() => makePetalGeometry(), []);
  const saison = getSaisonActuelle();

  const items = useMemo<FloraItem[]>(() => {
    const rand = mulberry32(20260612);
    const colors = PETALES_SAISON[saison];
    const fleur = FLEUR_SAISON[saison];
    const list: FloraItem[] = [];

    // Fleurs complètes, réparties sur 3 plans de profondeur, près des bords.
    for (let i = 0; i < 7; i++) {
      const depth = i % 3; // 0 = loin, 1 = milieu, 2 = proche
      const z = [-5, -2, 2][depth] + (rand() - 0.5) * 1.2;
      const side = i % 2 === 0 ? -1 : 1;
      list.push({
        baseX: side * (4.6 + rand() * 3.4) * (1 + depth * 0.35),
        baseY: -6 + rand() * 12,
        z,
        scale: [0.45, 0.8, 1.5][depth] * (0.8 + rand() * 0.4),
        petales: 6 + Math.floor(rand() * 3),
        speed: [0.35, 0.8, 1.6][depth] * (0.9 + rand() * 0.2),
        rotSpeed: new THREE.Vector3(
          (rand() - 0.5) * 0.2,
          0.08 + rand() * 0.18,
          (rand() - 0.5) * 0.12
        ),
        bobPhase: rand() * Math.PI * 2,
        opacity: [0.22, 0.32, 0.42][depth],
        color: fleur.petale,
        coeur: fleur.coeur,
      });
    }

    // Pétales « bokeh » : très proches caméra, immenses, quasi transparents.
    // Ils filent plus vite que le scroll → illusion de profondeur de champ.
    for (let i = 0; i < 6; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      list.push({
        baseX: side * (3 + rand() * 5),
        baseY: -7 + rand() * 14,
        z: 6.5 + rand() * 2,
        scale: 2.4 + rand() * 2.6,
        petales: 1,
        speed: 2.6 + rand() * 1.2,
        rotSpeed: new THREE.Vector3((rand() - 0.5) * 0.25, (rand() - 0.5) * 0.25, 0.06 + rand() * 0.1),
        bobPhase: rand() * Math.PI * 2,
        opacity: 0.07 + rand() * 0.06,
        color: colors[Math.floor(rand() * colors.length)],
        coeur: colors[0],
      });
    }

    // Pétales isolés de demi-fond.
    for (let i = 0; i < 14; i++) {
      const side = rand() > 0.5 ? -1 : 1;
      list.push({
        baseX: side * (2.5 + rand() * 6),
        baseY: -7 + rand() * 14,
        z: -3 + rand() * 5,
        scale: 0.16 + rand() * 0.3,
        petales: 1,
        speed: 0.5 + rand() * 1.1,
        rotSpeed: new THREE.Vector3((rand() - 0.5) * 0.6, (rand() - 0.5) * 0.6, (rand() - 0.5) * 0.6),
        bobPhase: rand() * Math.PI * 2,
        opacity: 0.18 + rand() * 0.14,
        color: colors[Math.floor(rand() * colors.length)],
        coeur: colors[0],
      });
    }

    return list;
  }, [saison]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scrollY = window.scrollY;

    // Parallaxe souris très douce sur l'ensemble.
    if (groupRef.current) {
      groupRef.current.rotation.y += (state.pointer.x * 0.05 - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (-state.pointer.y * 0.035 - groupRef.current.rotation.x) * 0.03;
    }

    items.forEach((item, i) => {
      const g = itemRefs.current[i];
      if (!g) return;
      // Chaque objet remonte à sa propre vitesse pendant le scroll (décorrélation),
      // et boucle verticalement pour réapparaître sans fin.
      const y = wrap(item.baseY + scrollY * 0.0022 * item.speed, -8.5, 8.5);
      g.position.set(
        item.baseX + Math.sin(t * 0.3 + item.bobPhase) * 0.35,
        y + Math.sin(t * 0.5 + item.bobPhase) * 0.18,
        item.z
      );
      g.rotation.x += item.rotSpeed.x * 0.004;
      g.rotation.y += item.rotSpeed.y * 0.004;
      g.rotation.z += item.rotSpeed.z * 0.004;
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <group
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          scale={item.scale}
        >
          {item.petales > 1 ? (
            <>
              {Array.from({ length: item.petales }, (_, p) => (
                <group key={p} rotation={[0, (Math.PI * 2 * p) / item.petales, 0]}>
                  <mesh geometry={petalGeo} rotation={[1.15, 0, 0]}>
                    <meshStandardMaterial
                      color={item.color}
                      transparent
                      opacity={item.opacity}
                      roughness={0.6}
                      side={THREE.DoubleSide}
                      depthWrite={false}
                    />
                  </mesh>
                </group>
              ))}
              <mesh>
                <sphereGeometry args={[0.18, 12, 12]} />
                <meshStandardMaterial
                  color={item.coeur}
                  transparent
                  opacity={item.opacity + 0.1}
                  roughness={0.8}
                  depthWrite={false}
                />
              </mesh>
            </>
          ) : (
            <mesh geometry={petalGeo}>
              <meshStandardMaterial
                color={item.color}
                transparent
                opacity={item.opacity}
                roughness={0.7}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

/**
 * Flore flottante : couche 3D fixe en superposition du site, indépendante
 * des sections. Trois plans de profondeur à vitesses de parallaxe distinctes
 * + pétales « bokeh » au premier plan = profondeur de champ optique.
 */
export default function FloatingFlora() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#FFF4E0" />
      <Flora />
    </Canvas>
  );
}
