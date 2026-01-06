'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleWave from './ParticleWave';

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 10, 30], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ParticleWave />
          <fog attach="fog" args={['#050505', 0.002, 1000]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
