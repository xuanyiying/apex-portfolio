'use client';

import { useState, useEffect, useRef, ElementType, useCallback } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: ElementType;
    delay?: number;
}

export default function GlitchText({ text, className = '', as: Component = 'span', delay = 0 }: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startGlitch = useCallback(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
    }, []);

    useEffect(() => {
        const appearTimer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(appearTimer);
    }, [delay]);

    useEffect(() => {
        if (!isVisible) return;

        const scheduleGlitch = () => {
            const glitchDelay = Math.random() * 5000 + 3000;
            intervalRef.current = setTimeout(() => {
                startGlitch();
                scheduleGlitch();
            }, glitchDelay);
        };

        const initialDelay = setTimeout(() => {
            scheduleGlitch();
        }, 2000);

        return () => {
            if (intervalRef.current) clearTimeout(intervalRef.current);
            clearTimeout(initialDelay);
        };
    }, [isVisible, startGlitch]);

    return (
        <span className={`relative inline-block group ${isVisible ? 'animate-in fade-in zoom-in' : 'opacity-0'}`} onMouseEnter={startGlitch} style={{ animationDelay: `${delay}ms` }}>
            <Component
                className={`relative z-10 ${className} ${isGlitching ? 'glitch-effect' : ''}`}
                data-text={text}
            >
                {text}
            </Component>
            <Component
                className={`absolute inset-0 z-0 ${className} opacity-50 blur-[1px] ${isGlitching ? 'glitch-layer' : ''}`}
                data-text={text}
                aria-hidden="true"
            >
                {text}
            </Component>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes zoomIn {
                    from { transform: scale(0.95); }
                    to { transform: scale(1); }
                }
                .animate-in {
                    animation: fadeIn 0.6s ease-out forwards, zoomIn 0.6s ease-out forwards;
                }
                .glitch-effect {
                    position: relative;
                }
                .glitch-effect::before,
                .glitch-effect::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.1s;
                }
                .glitch-effect::before {
                    color: rgb(var(--cyber-cyan));
                    z-index: -1;
                    clip-path: inset(10% 0 60% 0);
                    transform: translateX(-2px);
                }
                .glitch-effect::after {
                    color: rgb(var(--cyber-pink));
                    z-index: -2;
                    clip-path: inset(50% 0 10% 0);
                    transform: translateX(2px);
                }
                .glitch-layer {
                    clip-path: inset(20% 0 30% 0);
                    transform: translateX(-3px);
                    color: rgb(var(--cyber-cyan));
                    opacity: 0.5;
                    animation: glitch-shimmer 0.15s ease-out;
                }
                @keyframes glitch-shimmer {
                    0% { transform: translateX(-3px); opacity: 0; }
                    50% { opacity: 0.8; }
                    100% { transform: translateX(3px); opacity: 0.5; }
                }
            `}</style>
        </span>
    );
}
