'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCarouselProps {
    images: string[];
    alt: string;
}

export default function ProjectCarousel({ images, alt }: ProjectCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // If there's only one image or none, just render the first one without carousel controls
    if (!images || images.length === 0) {
        return <div className="w-full h-full bg-muted/20" />;
    }

    if (images.length === 1) {
        return (
            <img
                src={images[0]}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
        );
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex >= images.length) nextIndex = 0;
            if (nextIndex < 0) nextIndex = images.length - 1;
            return nextIndex;
        });
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-full overflow-hidden group/carousel">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`${alt} showcase ${currentIndex + 1}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                    className="absolute inset-0 w-full h-full object-cover origin-center transition-transform duration-700 group-hover:scale-105"
                />
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute inset-0 z-40 flex items-center justify-between p-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button
                    className="p-1 rounded-full bg-black/50 border border-white/20 text-white backdrop-blur hover:bg-cyber-cyan hover:text-black hover:border-cyber-cyan transition-all pointer-events-auto shadow-lg"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); paginate(-1); }}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    className="p-1 rounded-full bg-black/50 border border-white/20 text-white backdrop-blur hover:bg-cyber-cyan hover:text-black hover:border-cyber-cyan transition-all pointer-events-auto shadow-lg"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); paginate(1); }}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-0 right-0 z-40 flex justify-center gap-1.5 pointer-events-auto">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        className={`transition-all duration-300 rounded-full ${idx === currentIndex
                            ? 'w-4 h-1.5 bg-cyber-cyan shadow-[0_0_8px_rgba(var(--cyber-cyan),0.8)]'
                            : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
