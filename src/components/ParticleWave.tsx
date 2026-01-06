'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

const ParticleWave = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();

  const count = 4000; // Increased count
  const columns = 60;
  const rows = 70;
  const spacing = 1.8;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3); // RGB for each point

    let i = 0;
    for (let ix = 0; ix < columns; ix++) {
      for (let iy = 0; iy < rows; iy++) {
        // Center the grid
        positions[i] = ix * spacing - (columns * spacing) / 2;
        positions[i + 1] = 0;
        positions[i + 2] = iy * spacing - (rows * spacing) / 2;

        // Initial colors - gradient from Cyan to Purple to Pink
        const color1 = new THREE.Color('#00F0FF'); // Cyan
        const color2 = new THREE.Color('#7000FF'); // Purple
        const color3 = new THREE.Color('#FF0080'); // Pink

        const mixedColor = new THREE.Color();
        const ratio = ix / columns;

        if (ratio < 0.5) {
          mixedColor.lerpColors(color1, color2, ratio * 2);
        } else {
          mixedColor.lerpColors(color2, color3, (ratio - 0.5) * 2);
        }

        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;

        i += 3;
      }
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    let i = 0;
    for (let ix = 0; ix < columns; ix++) {
      for (let iy = 0; iy < rows; iy++) {
        const x = ix * spacing - (columns * spacing) / 2;
        const z = iy * spacing - (rows * spacing) / 2;

        // Complex wave math for organic movement
        // Primary Swell
        const y1 = Math.sin((ix * 0.2) + (time * 0.8)) * 3;
        // Secondary Ripple
        const y2 = Math.cos((iy * 0.3) + (time * 1.2)) * 2;
        // Diagonal interference
        const y3 = Math.sin(((ix + iy) * 0.1) + (time * 0.5)) * 2;

        // Distance decay from center (optional, keeps edges cleaner)
        // const dist = Math.sqrt(x*x + z*z);
        // const decay = Math.max(0, 1 - dist / 50);

        positions[i + 1] = y1 + y2 + y3;
        i += 3;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Gentle rotation
    pointsRef.current.rotation.y = Math.sin(time * 0.05) * 0.1;
    pointsRef.current.rotation.z = Math.cos(time * 0.03) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleWave;
