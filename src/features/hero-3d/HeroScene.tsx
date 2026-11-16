"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import {
  BufferGeometry,
  Float32BufferAttribute,
  type Group,
  type Mesh,
  MathUtils,
} from "three";
export type SceneState = { progress: number; invalidate: () => void };
type Props = {
  state: MutableRefObject<SceneState>;
  mobile: boolean;
  active: boolean;
  paused: boolean;
  onReady: (invalidate: () => void) => void;
};
function ribbon(index: number, mobile: boolean) {
  const rows = mobile ? 20 : 40,
    cols = mobile ? 4 : 8;
  const vertices: number[] = [],
    indices: number[] = [];
  for (let side = 0; side < 2; side++)
    for (let row = 0; row <= rows; row++)
      for (let col = 0; col <= cols; col++) {
        const u = row / rows,
          v = (col / cols) * 2 - 1,
          theta = (index / 7) * Math.PI * 2 + (u - 0.5) * 2.7;
        const radius =
          0.35 + Math.sin(u * Math.PI) * 1.08 + (side === 0 ? 0.035 : -0.035);
        const edge = v * (0.23 + 0.1 * Math.sin(u * Math.PI));
        vertices.push(
          radius * Math.cos(theta) - edge * Math.sin(theta),
          (u - 0.5) * 3.65,
          radius * Math.sin(theta) + edge * Math.cos(theta),
        );
      }
  const stride = cols + 1,
    skin = (rows + 1) * stride;
  for (let side = 0; side < 2; side++)
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++) {
        const a = side * skin + row * stride + col,
          b = a + stride;
        if (side === 0) indices.push(a, a + 1, b, a + 1, b + 1, b);
        else indices.push(a, b, a + 1, a + 1, b, b + 1);
      }
  const seal = (a: number, b: number) =>
    indices.push(a, b, a + skin, b, b + skin, a + skin);
  for (let row = 0; row < rows; row++) {
    seal(row * stride, (row + 1) * stride);
    seal(row * stride + cols, (row + 1) * stride + cols);
  }
  for (let col = 0; col < cols; col++) {
    seal(col, col + 1);
    seal(rows * stride + col, rows * stride + col + 1);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
function Sculpture({
  state,
  mobile,
  paused,
}: Pick<Props, "state" | "mobile" | "paused">) {
  const geometry = useMemo(
    () => Array.from({ length: 7 }, (_, i) => ribbon(i, mobile)),
    [mobile],
  );
  const pieces = useRef<(Mesh | null)[]>([]),
    group = useRef<Group>(null),
    time = useRef(0);
  useEffect(() => () => geometry.forEach((g) => g.dispose()), [geometry]);
  useFrame((_, delta) => {
    const p = state.current.progress;
    if (!paused) time.current += Math.min(delta, 0.05);
    pieces.current.forEach((piece, i) => {
      if (!piece) return;
      const a = MathUtils.smoothstep(p, 0.025 + i * 0.018, 0.82 + i * 0.018),
        angle = (i / 7) * Math.PI * 2;
      piece.position.set(
        Math.cos(angle) * a * 5.5,
        Math.sin(angle) * a * 4.2 - a * 0.45,
        Math.sin(i * 2.4) * a * 2,
      );
      piece.rotation.set(
        Math.sin(i * 1.7) * a * 1.3,
        Math.cos(i * 1.3) * a * 1.5,
        (i % 2 ? 1 : -1) * a * 1.2,
      );
    });
    if (group.current) {
      group.current.rotation.set(
        0.13,
        -0.38,
        -0.28 + Math.sin(time.current * 0.35) * 0.025,
      );
      group.current.position.y = Math.sin(time.current * 0.5) * 0.045;
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
            color={i % 3 === 0 ? "#b9a17d" : "#d3cedb"}
            metalness={0.98}
            roughness={0.22}
            clearcoat={1}
            iridescence={1}
            iridescenceIOR={1.35}
            iridescenceThicknessRange={[180, 420]}
            envMapIntensity={1.35}
          />
        </mesh>
      ))}
    </group>
  );
}
export default function HeroScene({
  state,
  mobile,
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
          color="#c8c2d9"
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
      <Sculpture state={state} mobile={mobile} paused={paused} />
    </Canvas>
  );
}
