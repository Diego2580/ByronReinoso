"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type { Group } from "three";
function Panel({
  position,
  scale = 1,
  dark = false,
}: {
  position: [number, number, number];
  scale?: number;
  dark?: boolean;
}) {
  return (
    <group position={position} scale={scale}>
      <RoundedBox args={[3.4, 2.3, 0.09]} radius={0.08} smoothness={2}>
        <meshStandardMaterial
          color={dark ? "#292c29" : "#e6e0d4"}
          roughness={0.65}
        />
      </RoundedBox>
      <mesh position={[-1.3, 0.86, 0.07]}>
        <circleGeometry args={[0.065, 16]} />
        <meshBasicMaterial color="#b08d57" />
      </mesh>
      {[0, 1].map((i) => (
        <mesh key={i} position={[-0.44 + i * -0.21, 0.33 - i * 0.24, 0.07]}>
          <planeGeometry args={[1.9 - i * 0.42, 0.11]} />
          <meshBasicMaterial color={dark ? "#c5bca9" : "#343933"} />
        </mesh>
      ))}
      {[0, 1, 2].map((i) => (
        <RoundedBox
          key={i}
          args={[0.78, 0.54, 0.035]}
          radius={0.03}
          smoothness={2}
          position={[-1.02 + i * 1.02, -0.35, 0.08]}
        >
          <meshStandardMaterial
            color={i === 1 ? "#b08d57" : dark ? "#4c5147" : "#bfc4b5"}
          />
        </RoundedBox>
      ))}
      <mesh position={[-0.9, -0.85, 0.07]}>
        <planeGeometry args={[0.9, 0.15]} />
        <meshBasicMaterial color="#b08d57" />
      </mesh>
    </group>
  );
}
function Composition({ moving, mobile }: { moving: boolean; mobile: boolean }) {
  const group = useRef<Group>(null);
  const time = useRef(0);
  useFrame((_, delta) => {
    if (!group.current || !moving) return;
    time.current += Math.min(delta, 0.05);
    group.current.rotation.y = -0.24 + Math.sin(time.current * 0.35) * 0.12;
    group.current.position.y = Math.sin(time.current * 0.5) * 0.1;
  });
  return (
    <group
      ref={group}
      rotation={[0.16, -0.24, -0.09]}
      scale={mobile ? 0.75 : 1}
    >
      <Panel position={[-0.6, 0.32, -0.65]} dark />
      <Panel position={[0, 0, 0]} />
      {!mobile && <Panel position={[1.85, -0.65, 0.7]} scale={0.5} dark />}
    </group>
  );
}
export default function ExperienceScene({
  active,
  moving,
  mobile,
  onFailure,
}: {
  active: boolean;
  moving: boolean;
  mobile: boolean;
  onFailure: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.8], fov: 40 }}
      dpr={[1, mobile ? 1 : 1.5]}
      frameloop={active ? (moving ? "always" : "demand") : "never"}
      gl={{ antialias: !mobile, powerPreference: "low-power", alpha: true }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onFailure, {
          once: true,
        });
      }}
      aria-label="Paneles abstractos de interfaz web en tres dimensiones"
    >
      <ambientLight intensity={1.7} />
      <directionalLight position={[3, 5, 5]} intensity={2.5} />
      <Composition moving={active && moving} mobile={mobile} />
    </Canvas>
  );
}
