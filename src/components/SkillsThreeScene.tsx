'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { skills } from '@/data';

const categoryConfig: { [key: string]: { primary: string; secondary: string; accent: string } } = {
    'Frontend': { primary: '#00F0FF', secondary: '#3B82F6', accent: '#06B6D4' },
    'Backend': { primary: '#B400FF', secondary: '#8B5CF6', accent: '#A855F7' },
    'Database': { primary: '#00FF88', secondary: '#10B981', accent: '#34D399' },
    'AI ': { primary: '#FF0080', secondary: '#EC4899', accent: '#F472B6' },
    'DevOps': { primary: '#FF6B00', secondary: '#F97316', accent: '#FB923C' },
    'Cloud': { primary: '#6366F1', secondary: '#4F46E5', accent: '#818CF8' },
};

const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
};

function HolographicNode({ position, skill, color, delay }: {
    position: [number, number, number];
    skill: { name: string; level: number };
    color: string;
    delay: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y = position[1] + Math.sin(time * 2 + delay) * 0.1;
        meshRef.current.rotation.y = time * 0.5;
    });

    return (
        <group position={position}>
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <octahedronGeometry args={[0.4, 0]} />
                <meshBasicMaterial color={color} wireframe transparent opacity={hovered ? 1 : 0.7} />
            </mesh>
            {hovered && (
                <mesh position={[0, 0.8, 0]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshBasicMaterial color={color} transparent opacity={0.8} />
                </mesh>
            )}
        </group>
    );
}

function HolographicScene({ activeCategory }: { activeCategory: string }) {
    const categorySkills = getSkillsByCategory(activeCategory);
    const config = categoryConfig[activeCategory] || categoryConfig['Frontend'];

    const nodes = useMemo(() => {
        const radius = 3;
        return categorySkills.map((skill, i) => {
            const angle = (i / categorySkills.length) * Math.PI * 2;
            const seed = i * 1234.5678;
            return {
                skill,
                position: [
                    Math.cos(angle) * radius * (0.8 + (Math.sin(seed) * 0.4 + 0.5)),
                    Math.sin(i * 0.8) * 0.8,
                    Math.sin(angle) * radius * (0.8 + (Math.cos(seed) * 0.4 + 0.5))
                ] as [number, number, number],
                color: config.primary,
            };
        });
    }, [activeCategory, categorySkills, config.primary]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={config.primary} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={config.secondary} />

            <group rotation={[0, 0, 0]}>
                {nodes.map((node, i) => (
                    <HolographicNode
                        key={node.skill.name}
                        position={node.position}
                        skill={node.skill}
                        color={node.color}
                        delay={i * 0.5}
                    />
                ))}
            </group>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <ringGeometry args={[2.5, 3, 64]} />
                <meshBasicMaterial color={config.primary} transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <ringGeometry args={[3.5, 3.6, 64]} />
                <meshBasicMaterial color={config.secondary} transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>
        </>
    );
}

export default function SkillsThreeScene({ activeCategory }: { activeCategory: string }) {
    return (
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
            <HolographicScene activeCategory={activeCategory} />
        </Canvas>
    );
}
