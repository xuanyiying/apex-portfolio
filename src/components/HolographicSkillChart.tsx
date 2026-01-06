'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float, MeshDistortMaterial, Billboard } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

interface Skill {
    name: string;
    level: number;
    color: string;
}

interface SkillCategory {
    titleKey: string;
    skills: Skill[];
}

interface HolographicSkillChartProps {
    activeCategory: SkillCategory;
}

// Generate a unique, vibrant HSL color for each skill
const getUniqueVibrantColor = (skillName: string, colorClass: string) => {
    let hue = 0;
    const lowerClass = colorClass.toLowerCase();

    // Determine Base Hue from Tailwind class hint
    if (lowerClass.includes('red')) hue = 0;
    else if (lowerClass.includes('orange')) hue = 30;
    else if (lowerClass.includes('yellow')) hue = 50;
    else if (lowerClass.includes('lime')) hue = 80;
    else if (lowerClass.includes('green')) hue = 120;
    else if (lowerClass.includes('emerald')) hue = 150;
    else if (lowerClass.includes('teal')) hue = 170;
    else if (lowerClass.includes('cyan')) hue = 190;
    else if (lowerClass.includes('sky')) hue = 210;
    else if (lowerClass.includes('blue')) hue = 240;
    else if (lowerClass.includes('indigo')) hue = 260;
    else if (lowerClass.includes('violet')) hue = 280;
    else if (lowerClass.includes('purple')) hue = 290;
    else if (lowerClass.includes('fuchsia')) hue = 300;
    else if (lowerClass.includes('pink')) hue = 330;
    else if (lowerClass.includes('rose')) hue = 350;
    else {
        // Fallback for gray/black -> Random vibrant hue
        let hash = 0;
        for (let i = 0; i < skillName.length; i++) {
            hash = skillName.charCodeAt(i) + ((hash << 5) - hash);
        }
        hue = Math.abs(hash % 360);
    }

    // Add deterministic variation based on name
    let nameHash = 0;
    for (let i = 0; i < skillName.length; i++) {
        nameHash = skillName.charCodeAt(i) + ((nameHash << 5) - nameHash);
    }
    const hueVariation = (nameHash % 40) - 20;
    const finalHue = (hue + hueVariation + 360) % 360;

    // Force High Saturation and High Lightness
    const saturation = 85 + (Math.abs(nameHash) % 15);
    const lightness = 65 + (Math.abs(nameHash) % 15);

    return `hsl(${finalHue}, ${saturation}%, ${lightness}%)`;
};

const GlowSphere = ({ color }: { color: string }) => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    const shaderArgs = useMemo(() => ({
        uniforms: {
            uColor: { value: new THREE.Color(color) },
            uTime: { value: 0 }
        },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vViewPosition = -mvPosition.xyz;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 uColor;
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDir = normalize(vViewPosition);
                float intensity = dot(normal, viewDir);
                intensity = pow(intensity, 1.5); // Adjust falloff
                gl_FragColor = vec4(uColor, intensity * 0.9);
            }
        `,
        transparent: true,
        depthWrite: false, // Important for inner glow look
    }), [color]);

    return (
        <mesh>
            <sphereGeometry args={[0.3, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                args={[shaderArgs]}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};

const SkillNode = ({ position, skill, onSelect, isSelected }: any) => {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    const color = useMemo(() => {
        return getUniqueVibrantColor(skill.name, skill.color);
    }, [skill.name, skill.color]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.2;

            const targetScale = hovered || isSelected ? 1.4 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group position={position}>
            <group ref={meshRef}>
                {/* Inner Glowing Gradient Sphere */}
                <GlowSphere color={color} />

                {/* Outer Wireframe Shell */}
                <mesh scale={[1.1, 1.1, 1.1]}>
                    <dodecahedronGeometry args={[0.4, 0]} />
                    <meshBasicMaterial
                        color={color}
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </group>

            {/* Floating Label */}
            <Html position={[0, 0.8, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
                <div className={`transition-all duration-300 ${hovered || isSelected ? 'opacity-100 scale-100' : 'opacity-60 scale-90'}`}>
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[100px]">
                        <span className="text-white text-xs font-bold whitespace-nowrap">{skill.name}</span>
                        <div className="w-full h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-white" style={{ width: `${skill.level}%`, backgroundColor: color }} />
                        </div>
                    </div>
                </div>
            </Html>
        </group>
    );
};
const SceneContent = ({ activeCategory }: HolographicSkillChartProps) => {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const groupRef = useRef<THREE.Group>(null);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    // Theme Colors
    const ambientIntensity = isDark ? 0.5 : 1.5; // Brighter in light mode
    const spotColor = isDark ? "#00F0FF" : "#3B82F6";
    const pointColor = isDark ? "#7000FF" : "#6366F1";
    const titleColor = isDark ? "text-white" : "text-slate-800";
    const subTitleColor = isDark ? "text-cyber-cyan" : "text-blue-600";

    useEffect(() => {
        setSelectedSkill(null);
    }, [activeCategory]);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
        }
    });

    const skills = activeCategory.skills;
    const radius = 3.5;

    return (
        <>
            <ambientLight intensity={ambientIntensity} />
            <pointLight position={[10, 10, 10]} intensity={1} color={spotColor} />
            <pointLight position={[-10, 5, -10]} intensity={0.5} color={pointColor} />

            <group ref={groupRef}>
                {skills.map((skill, index) => {
                    const angle = (index / skills.length) * Math.PI * 2;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    const y = Math.sin(angle * 2) * 1.5;

                    return (
                        <SkillNode
                            key={skill.name}
                            skill={skill}
                            index={index}
                            total={skills.length}
                            position={[x, y, z]}
                            isSelected={selectedSkill?.name === skill.name}
                            onSelect={setSelectedSkill}
                        />
                    );
                })}
            </group>

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <Billboard>
                    <Html position={[0, 0, 0]} transform center>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: -20 }}
                            transition={{
                                duration: 0.5,
                                ease: "backOut",
                                type: "spring",
                                stiffness: 200
                            }}
                            className="pointer-events-none text-center select-none"
                        >
                            <motion.div
                                animate={{
                                    textShadow: [
                                        "0 0 10px rgba(0,240,255,0.5)",
                                        "0 0 20px rgba(0,240,255,0.8)",
                                        "0 0 10px rgba(0,240,255,0.5)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className={`${titleColor} text-xl font-bold font-display tracking-widest drop-shadow-lg`}
                            >
                                {activeCategory.titleKey.replace('Skills.', '')}
                            </motion.div>
                        </motion.div>
                    </Html>
                </Billboard>
            </Float>

            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                autoRotate={!selectedSkill}
                autoRotateSpeed={0.5}
            />
        </>
    );
};

const HolographicSkillChart: React.FC<HolographicSkillChartProps> = (props) => {
    // Using Tailwind to handle Light/Dark UI text, but 3D needs internal logic
    return (
        <div className="w-full h-[600px] relative">
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cyber-cyan/50 dark:text-cyber-cyan/50 text-blue-500/50 text-[10px] uppercase tracking-widest pointer-events-none z-10 flex flex-col items-center gap-1">
                <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-current rounded-full animate-ping" />
                </div>
            </div>

            <Canvas camera={{ position: [0, 2, 8], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true }}>
                <SceneContent {...props} />
            </Canvas>
        </div>
    );
};

export default HolographicSkillChart;
