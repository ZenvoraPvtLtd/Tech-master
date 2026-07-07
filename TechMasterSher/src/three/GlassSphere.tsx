import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const LionShaderMaterial = shaderMaterial(
  { uTexture: null, uOpacity: 0.35 },
  // vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment shader
  `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Distance to pure white
    float distToWhite = distance(texColor.rgb, vec3(1.0, 1.0, 1.0));
    
    // Stronger filter to remove off-white compression artifacts
    float mask = smoothstep(0.25, 0.6, distToWhite);
    
    // Fade out the extreme edges to completely remove the square boundary line
    float edgeMaskX = smoothstep(0.02, 0.05, vUv.x) * (1.0 - smoothstep(0.95, 0.98, vUv.x));
    float edgeMaskY = smoothstep(0.02, 0.05, vUv.y) * (1.0 - smoothstep(0.95, 0.98, vUv.y));
    float finalMask = mask * edgeMaskX * edgeMaskY;
    
    // Output color with lowered opacity
    gl_FragColor = vec4(texColor.rgb, finalMask * uOpacity);
  }
  `
);

extend({ LionShaderMaterial });

interface GlassSphereProps {
  scrollProgress: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

export const GlassSphere: React.FC<GlassSphereProps> = ({ scrollProgress, mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    new THREE.TextureLoader().load("/Tech MAster Logo.png", (loadedTexture) => {
      // Ensure the texture uses nice filtering
      loadedTexture.minFilter = THREE.LinearFilter;
      loadedTexture.magFilter = THREE.LinearFilter;
      setTexture(loadedTexture);
    });
  }, []);

  // Keep tracking refs for smooth lerping
  const currentScaleRef = useRef(1);
  const currentScrollProgressRef = useRef(0);

  // Memoize geometry
  const geometry = useMemo(() => new THREE.PlaneGeometry(3.5, 3.5), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    currentScrollProgressRef.current = THREE.MathUtils.lerp(
      currentScrollProgressRef.current,
      scrollProgress,
      0.15
    );
    const smoothScroll = currentScrollProgressRef.current;

    // Gentle wobble rotation instead of full orbit so the logo stays facing the camera
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
    meshRef.current.rotation.x = Math.cos(time * 0.3) * 0.1;

    // React to mouse movement (lerped for smoothness)
    const targetX = mouse.current.x * 0.35;
    const targetY = mouse.current.y * 0.35;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);

    // Scroll-based parallax and scale adjustments
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    const responsiveFactor = isMobile ? 0.6 : (isTablet ? 0.8 : 1.0);

    let targetScale = (1 - Math.min(smoothScroll * 0.3, 0.5)) * responsiveFactor;
    if (smoothScroll > 0.65) {
      const fadeFactor = Math.max(0, 1 - (smoothScroll - 0.65) / 0.25);
      targetScale *= fadeFactor;
    }

    currentScaleRef.current = THREE.MathUtils.lerp(currentScaleRef.current, targetScale, 0.1);
    meshRef.current.scale.setScalar(currentScaleRef.current);

    // Very gentle floating bounce
    const bounce = Math.sin(time * 0.3) * 0.04;
    meshRef.current.position.y += bounce * 0.01;
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]} castShadow receiveShadow>
      {/* @ts-ignore */}
      <lionShaderMaterial 
        uTexture={texture} 
        uOpacity={0.35} 
        transparent={true} 
        side={THREE.DoubleSide} 
        depthWrite={false}
      />
    </mesh>
  );
};
