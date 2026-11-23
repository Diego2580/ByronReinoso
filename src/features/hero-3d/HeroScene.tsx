"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import {
  type Group,
  type Mesh,
  MathUtils,
  TorusGeometry,
} from "three";
export type SceneState = {
  progress: number;
  visualWidth: number;
  visualHeight: number;
  invalidate: () => void;
};
type Props = {
  state: MutableRefObject<SceneState>;
  mobile: boolean;
  tablet: boolean;
  active: boolean;
  paused: boolean;
  onReady: (invalidate: () => void) => void;
};
const rings = [
  { radius: 1.62, rotation: [0.18, 0.72, -0.32] },
  { radius: 1.42, rotation: [1.12, -0.3, 0.42] },
  { radius: 1.78, rotation: [0.74, 0.28, 1.18] },
  { radius: 1.24, rotation: [1.42, 0.82, -0.66] },
] as const;
function Sculpture({
  state,
  mobile,
  tablet,
  paused,
}: Pick<Props, "state" | "mobile" | "tablet" | "paused">) {
  const geometry = useMemo(
    () =>
      rings.map(
        ({ radius }) =>
          new TorusGeometry(
            radius,
            mobile ? 0.075 : 0.095,
            mobile ? 16 : 24,
            mobile ? 64 : 96,
          ),
      ),
    [mobile],
  );
  const pieces = useRef<(Mesh | null)[]>([]),
    group = useRef<Group>(null),
    time = useRef(0);
  const { size, viewport } = useThree();
  useEffect(() => () => geometry.forEach((g) => g.dispose()), [geometry]);
  useFrame((_, delta) => {
    const p = state.current.progress;
    if (!paused) time.current += Math.min(delta, 0.05);
    pieces.current.forEach((piece, i) => {
      if (!piece) return;
      const a = MathUtils.smoothstep(p, 0.03 + i * 0.035, 0.8 + i * 0.025),
        angle = (i / rings.length) * Math.PI * 2;
      piece.position.set(
        Math.cos(angle) * a * 3.8,
        -a * (3.2 + i * 0.42) + Math.sin(angle) * a * 0.8,
        Math.sin(angle) * a * 1.8,
      );
      piece.rotation.set(
        rings[i].rotation[0] + Math.sin(i * 1.7) * a * 1.5,
        rings[i].rotation[1] + Math.cos(i * 1.3) * a * 1.7,
        rings[i].rotation[2] + (i % 2 ? 1 : -1) * a * 1.35,
      );
      piece.scale.setScalar(1 - a * 0.16);
    });
    if (group.current) {
      const responsiveScale =
        (Math.min(state.current.visualWidth, state.current.visualHeight) *
          0.9 *
          (viewport.width / size.width)) /
        3.8;
      group.current.rotation.set(
        0.02 + Math.sin(time.current * 0.22) * 0.035,
        -0.18 + time.current * 0.055,
        -0.12 + Math.sin(time.current * 0.3) * 0.04,
      );
      group.current.position.set(
        0,
        (mobile || tablet
          ? (0.5 - state.current.visualHeight / 2 / size.height) *
            viewport.height
          : 0) + Math.sin(time.current * 0.4) * 0.04,
        0,
      );
      group.current.scale.setScalar(
        mobile || tablet ? responsiveScale : 1,
      );
    }
  });
  return (
    <group ref={group}>
      {geometry.map((g, i) => (
        <mesh
          key={i}
          geometry={g}
          ref={(mesh) => {
            pieces.current[i] = mesh;
          }}
        >
          <meshPhysicalMaterial
            color={i % 2 === 0 ? "#b08d57" : "#242321"}
            metalness={0.98}
            roughness={i % 2 === 0 ? 0.2 : 0.27}
            clearcoat={0.65}
            envMapIntensity={1.15}
          />
        </mesh>
      ))}
    </group>
  );
}
export default function HeroScene({
  state,
  mobile,
  tablet,
  active,
  paused,
  onReady,
}: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.7], fov: 38 }}
      dpr={[1, mobile ? 1 : 1.5]}
      frameloop={active && !paused ? "always" : "demand"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={({ invalidate, gl }) => {
        onReady(invalidate);
        gl.setClearColor("#111111", 0);
      }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={3} color="#f7e7cf" />
      <Environment resolution={128} frames={1}>
        <Lightformer
          intensity={5}
          position={[0, 4, 2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[8, 2, 1]}
        />
        <Lightformer
          intensity={4}
          color="#d1d8c0"
          position={[-4, 0, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[2, 7, 1]}
        />
        <Lightformer
          intensity={5}
          color="#b08d57"
          position={[4, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[2, 6, 1]}
        />
      </Environment>
      <Sculpture
        state={state}
        mobile={mobile}
        tablet={tablet}
        paused={paused}
      />
    </Canvas>
  );
}
