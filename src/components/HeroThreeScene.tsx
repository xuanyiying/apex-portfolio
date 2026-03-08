'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';


function HeroParticles() {
    const pointsRef = useRef<THREE.Points>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const positions = useRef(new Float32Array(2000 * 3));

    useEffect(() => {
        for (let i = 0; i < 2000 * 3; i += 3) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 6 + Math.random() * 6;
            positions.current[i] = r * Math.sin(phi) * Math.cos(theta);
            positions.current[i + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions.current[i + 2] = r * Math.cos(phi);
        }
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const time = state.clock.getElapsedTime();
        pointsRef.current.rotation.y = time * 0.15;
        pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.15;
        pointsRef.current.rotation.z = Math.cos(time * 0.08) * 0.1;
        if (ringRef.current) {
            ringRef.current.rotation.x = time * 0.3;
            ringRef.current.rotation.y = time * 0.2;
        }
    });

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2000}
                        array={positions.current}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.06}
                    color="#00F0FF"
                    transparent
                    opacity={0.9}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
            <mesh ref={ringRef}>
                <torusGeometry args={[5, 0.02, 16, 100]} />
                <meshBasicMaterial color="#B400FF" transparent opacity={0.6} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[4, 0.015, 16, 100]} />
                <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} />
            </mesh>
            <mesh>
                <torusGeometry args={[6, 0.01, 16, 100]} />
                <meshBasicMaterial color="#FF0080" transparent opacity={0.4} />
            </mesh>
        </>
    );
}

export default function HeroThreeScene() {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-cyber-cyan/30 border-t-cyber-cyan rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 50 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 2]}
            >
                <HeroParticles />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
            </Canvas>
        </div>
    );
}
