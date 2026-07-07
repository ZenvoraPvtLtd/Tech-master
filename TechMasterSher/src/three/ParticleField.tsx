import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  scrollProgress: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ scrollProgress }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 55;

  // Generate particle coordinates randomly scattered in space
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const whiteColor = new THREE.Color("#ffffff");
    const blueColor = new THREE.Color("#00E5FF");
    const purpleColor = new THREE.Color("#aa3bff");

    for (let i = 0; i < count; i++) {
      // Coordinates in a sphere boundary
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 8; // Spread radius up to 8 units

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Distribute particle colors between White, Blue, and Purple
      let col = whiteColor;
      const rand = Math.random();
      if (rand > 0.66) {
        col = blueColor;
      } else if (rand > 0.33) {
        col = purpleColor;
      }

      cols[i * 3] = col.r;
      cols[i * 3 + 1] = col.g;
      cols[i * 3 + 2] = col.b;
    }

    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Slow atmospheric rotation
    pointsRef.current.rotation.y = time * 0.03;
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;

    // Scroll parallax shift
    pointsRef.current.position.y = -scrollProgress * 2.0;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
