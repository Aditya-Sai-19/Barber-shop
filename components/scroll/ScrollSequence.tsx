'use client';

import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { getFramePath, FRAME_COUNT } from '@/lib/scroll-config';
import { cn } from '@/lib/utils';
import NextImage from 'next/image';

// Preload priority
const PRELOAD_COUNT = 30; // First phase, slightly increased

interface ScrollSequenceProps {
    className?: string;
    mobileFallbackImage?: string;
}

export default function ScrollSequence({ className, mobileFallbackImage = '/Frames/ezgif-frame-001.png' }: ScrollSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
    const [isReady, setIsReady] = useState(false);
    const [progress, setProgress] = useState(0); // Loading progress
    const [isMobile, setIsMobile] = useState(false);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const { scrollYProgress } = useScroll();
    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Mobile/Reduced Motion Check
    useEffect(() => {
        const checkMobile = () => {
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmall = window.matchMedia('(max-width: 768px)').matches;
            const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            setIsMobile(isTouch || isSmall || isReduced);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Render logic
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;

        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        }

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#060606';
        ctx.fillRect(0, 0, width, height);

        const frameIndex = Math.max(0, Math.min(Math.round(index), FRAME_COUNT - 1));
        const img = imagesRef.current[frameIndex];

        if (img && img.complete) {
            const imgAspect = img.width / img.height;
            const canvasAspect = width / height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasAspect > imgAspect) {
                drawWidth = width;
                drawHeight = width / imgAspect;
                offsetX = 0;
                // Shifted slightly up for 45% visual center
                offsetY = (height - drawHeight) / 2 - (height * 0.05);
            } else {
                drawHeight = height;
                drawWidth = height * imgAspect;
                offsetX = (width - drawWidth) / 2;
                offsetY = 0;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    }, [width, height]);

    // Scroll to Render
    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (!isMobile) {
            requestAnimationFrame(() => renderFrame(latest));
        }
    });

    // Resize Observer
    useEffect(() => {
        if (!canvasRef.current) return;

        const observer = new ResizeObserver((entries) => {
            // Debounce could be added here if resize is heavy
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
                setHeight(entry.contentRect.height);
                requestAnimationFrame(() => renderFrame(currentIndex.get()));
            }
        });

        observer.observe(canvasRef.current);
        // Backup
        const handleResize = () => {
            if (canvasRef.current) {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
                requestAnimationFrame(() => renderFrame(currentIndex.get()));
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
        }
    }, [renderFrame, currentIndex]);

    // Preloader
    useEffect(() => {
        if (isMobile) {
            setIsReady(true);
            return;
        }

        let loaded = 0;

        // Initial priority batch
        const loadBatch = async () => {
            // 1. Load Priority
            const priorityPromises = [];
            for (let i = 0; i < PRELOAD_COUNT; i++) {
                if (!imagesRef.current[i]) {
                    priorityPromises.push(new Promise<void>((resolve) => {
                        const img = new Image();
                        img.src = getFramePath(i);
                        img.onload = () => {
                            imagesRef.current[i] = img;
                            loaded++;
                            setProgress((loaded / PRELOAD_COUNT) * 100); // Progress for first batch
                            resolve();
                        };
                        img.onerror = () => resolve();
                    }));
                }
            }
            await Promise.all(priorityPromises);
            setIsReady(true);
            renderFrame(0); // Initial draw

            // 2. Lazy load rest
            let current = PRELOAD_COUNT;
            const loadRest = () => {
                if (current >= FRAME_COUNT) return;
                // Chunking
                const nextEnd = Math.min(current + 5, FRAME_COUNT);
                for (let i = current; i < nextEnd; i++) {
                    if (!imagesRef.current[i]) {
                        const img = new Image();
                        img.src = getFramePath(i);
                        img.onload = () => { imagesRef.current[i] = img; };
                    }
                }
                current = nextEnd;
                setTimeout(loadRest, 100); // Gentle background loading
            };
            loadRest();
        };

        loadBatch();

    }, [renderFrame, isMobile]);

    // Cursor hiding style
    useEffect(() => {
        if (!isReady || isMobile) return;
        // Only hide if we are in the "active" scroll zone? 
        // For now, if we are viewing the sequence, let's hide it.
        // We can check scrollY, but simply adding the class to the container is easier.
    }, [isReady, isMobile]);


    if (isMobile) {
        return (
            <div className={cn("fixed inset-0 z-0 h-screen w-full bg-[#060606]", className)}>
                <div className="relative w-full h-full">
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
                    <NextImage
                        src={mobileFallbackImage}
                        alt="Hero"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={cn("fixed inset-0 z-0 h-screen w-full bg-[#060606] cursor-none", className)}>
            <canvas
                ref={canvasRef}
                className="block h-full w-full touch-none"
            />

            {/* Loading Overlay */}
            {!isReady && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#060606] text-white">
                    <div className="w-64 space-y-2">
                        <div className="h-0.5 w-full bg-white/10 overflow-hidden">
                            <motion.div
                                className="h-full bg-white"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "linear" }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] items-center font-mono text-white/40 uppercase tracking-widest">
                            <span>Loading Experience</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
