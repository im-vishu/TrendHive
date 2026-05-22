import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const FloatingShape = ({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
    ref.current.rotation.y += 0.005 * speed;
  });
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} wireframe />
      </mesh>
    </Float>
  );
};

const ParticleRing = () => {
  const ref = useRef<THREE.Points>(null!);
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + Math.random() * 0.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#e8734a" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
};

const Scene = () => (
  <>
    <ambientLight intensity={0.4} />
    <pointLight position={[5, 5, 5]} intensity={0.8} color="#e8734a" />
    <pointLight position={[-5, -3, 3]} intensity={0.4} color="#c2185b" />
    <FloatingShape position={[-2.5, 1, -1]} color="#e8734a" speed={0.8} />
    <FloatingShape position={[2, -0.5, -2]} color="#c2185b" speed={1.2} />
    <FloatingShape position={[0, 1.5, -3]} color="#d4a017" speed={0.6} />
    <ParticleRing />
    <Sparkles count={80} scale={8} size={1.5} speed={0.3} opacity={0.4} color="#e8734a" />
  </>
);

const HeroScene = () => (
  <div className="absolute inset-0 opacity-40 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
      <Scene />
    </Canvas>
  </div>
);

export default HeroScene;
