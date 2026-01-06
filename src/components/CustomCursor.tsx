'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-pointer')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
            {/* Main cursor dot */}
            <motion.div
                className="absolute w-3 h-3 bg-cyber-cyan rounded-full mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovering ? 0 : 1,
                }}
            />

            {/* Outer ring / target sight */}
            <motion.div
                className="absolute w-8 h-8 border border-cyber-cyan rounded-full mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 1 : 0.5,
                    borderColor: isHovering ? 'var(--cyber-pink)' : 'var(--cyber-cyan)',
                }}
                transition={{ duration: 0.15 }}
            >
                {/* Crosshair lines when hovering */}
                <motion.div
                    className="absolute top-1/2 left-[-4px] w-[calc(100%+8px)] h-[1px] bg-cyber-pink"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovering ? 1 : 0 }}
                />
                <motion.div
                    className="absolute left-1/2 top-[-4px] h-[calc(100%+8px)] w-[1px] bg-cyber-pink"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovering ? 1 : 0 }}
                />
            </motion.div>
        </div>
    );
}
