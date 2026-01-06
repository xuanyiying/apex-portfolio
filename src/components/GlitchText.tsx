'use client';

import { useState, useEffect, useRef, ElementType } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: ElementType;
}

export default function GlitchText({ text, className = '', as: Component = 'span' }: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startGlitch = () => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
    };

    useEffect(() => {
        // Random glitch effect every 3-8 seconds
        const scheduleGlitch = () => {
            const delay = Math.random() * 5000 + 3000;
            intervalRef.current = setTimeout(() => {
                startGlitch();
                scheduleGlitch();
            }, delay);
        };

        scheduleGlitch();

        return () => {
            if (intervalRef.current) clearTimeout(intervalRef.current);
        };
    }, []);

    return (
        <div className="relative inline-block group" onMouseEnter={startGlitch}>
            <Component className={`relative z-10 ${className}`}>{text}</Component>

            {/* Glitch Layer 1 - Cyan Shift */}
            {isGlitching && (
                <Component
                    className="absolute top-0 left-0 -ml-[2px] text-cyber-cyan opacity-70 z-0 animate-pulse"
                    style={{ clipPath: 'inset(10% 0 60% 0)' }}
                >
                    {text}
                </Component>
            )}

            {/* Glitch Layer 2 - Pink Shift */}
            {isGlitching && (
                <Component
                    className="absolute top-0 left-0 ml-[2px] text-cyber-pink opacity-70 z-0 animate-pulse"
                    style={{ clipPath: 'inset(50% 0 10% 0)' }}
                >
                    {text}
                </Component>
            )}
        </div>
    );
}