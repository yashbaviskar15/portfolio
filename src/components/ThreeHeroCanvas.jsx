import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';

function FloatingNodes() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central subtle node */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.9, 2]} />
          <meshStandardMaterial
            color="#6366F1"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </Float>
    </group>
  );
}

function AmbientParticles({ count = 60 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const colorArr = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#6366F1'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#3B82F6'),
    ];

    for (let i = 0; i < count; i++) {
      posArr[i * 3] = (Math.random() - 0.5) * 4;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 3;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colorArr[i * 3] = color.r;
      colorArr[i * 3 + 1] = color.g;
      colorArr[i * 3 + 2] = color.b;
    }

    return [posArr, colorArr];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export default function ThreeHeroCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile || hasError) {
    return null;
  }

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          onError={() => setHasError(true)}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 5, 5]} intensity={1.0} color="#FFFFFF" />

          <FloatingNodes />
          <AmbientParticles count={70} />

          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
        </Canvas>
      </Suspense>
    </div>
  );
}
