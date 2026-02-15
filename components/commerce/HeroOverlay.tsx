'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

// Helper to create opacity transform
const useSectionOpacity = (progress: MotionValue<number>, start: number, end: number) => {
    // Fade in during first 15% of window, hold, fade out last 15%
    const fadeInStart = start;
    const fadeInEnd = start + (end - start) * 0.15;
    const fadeOutStart = end - (end - start) * 0.15;
    const fadeOutEnd = end;

    return useTransform(progress, [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd], [0, 1, 1, 0]);
};

// Helper for Slide Y
const useSectionY = (progress: MotionValue<number>, start: number, end: number) => {
    return useTransform(progress, [start, end], [30, -30]);
};

export default function HeroOverlay() {
    const { scrollYProgress } = useScroll();
    const [hideScrollIndicator, setHideScrollIndicator] = useState(false);
    const [showGhostCTA, setShowGhostCTA] = useState(true);

    // Indicator logic
    useTransform(scrollYProgress, [0, 0.1], [1, 0]).on('change', (v) => {
        if (v < 0.1) setHideScrollIndicator(true);
        else setHideScrollIndicator(false);
    });

    useTransform(scrollYProgress, [0, 0.25], [1, 0]).on('change', (v) => {
        if (v < 0.1) setShowGhostCTA(false);
        else setShowGhostCTA(true);
    });

    // Using useEffect to handle visibility states based on scroll value directly to avoid flicker
    useEffect(() => {
        const handleScroll = () => {
            // const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            setHideScrollIndicator(window.scrollY > 100);
            setShowGhostCTA(window.scrollY < window.innerHeight * 0.5); // Hide ghost when scrolled past half first screen roughly or use progress
        };
        window.addEventListener('scroll', handleScroll);
        // Init
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-center items-center h-screen w-full">

            {/* ATMOSPHERE LAYER */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]" />
                {/* Dust/Grain - subtle noise overlay if we had an image, but css gradient works for haze */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            </div>

            {/* SECTION 1: HERO (0-12%) - UPDATED COPY */}
            <Section range={[0, 0.12]} progress={scrollYProgress} className="items-center text-center px-4 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <span className="block text-sm md:text-base font-bold tracking-[0.3em] text-white/60 mb-6 uppercase">
                        Pro Tools &bull; Est. 2026
                    </span>
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl mix-blend-overlay opacity-90">
                        EVERYTHING<br />A PRO NEEDS
                    </h1>
                    <p className="text-lg md:text-xl text-white/50 font-light tracking-widest uppercase max-w-xl mx-auto">
                        Tools. Precision. Performance.
                    </p>
                </motion.div>
            </Section>

            {/* SCROLL INDICATOR */}
            <motion.div
                className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${hideScrollIndicator ? 'opacity-0' : 'opacity-100'}`}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll to Explore</span>
                <ChevronDown className="w-4 h-4 text-accent-red" />
            </motion.div>

            {/* GHOST CTA - Bottom Right */}
            <motion.div
                className={`fixed bottom-12 right-12 z-50 pointer-events-auto transition-all duration-500 ${showGhostCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <Link
                    href="/shop"
                    className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all group"
                >
                    <span className="text-xs font-bold uppercase tracking-widest">Explore Tools</span>
                    <ArrowRight className="w-4 h-4 text-accent-red group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>

            {/* SECTION 2: EXPLOSION (15-35%) */}
            <Section range={[0.15, 0.35]} progress={scrollYProgress} className="items-start justify-center pl-6 md:pl-24 z-10">
                <div className="max-w-md text-left p-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Uncompromising<br />Quality</h2>
                    <ul className="space-y-4 text-lg text-white/60 font-light">
                        <FeatureItem text="Japanese Stainless Steel" />
                        <FeatureItem text="Perfect Balance" />
                        <FeatureItem text="Lifetime Durability" />
                    </ul>
                </div>
            </Section>

            {/* SECTION 3: CUTTING (35-55%) */}
            <Section range={[0.35, 0.55]} progress={scrollYProgress} className="items-end justify-center pr-6 md:pr-24 w-full text-right z-10">
                <div className="max-w-md ml-auto p-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Cut. Shape.<br />Define.</h2>
                    <ul className="space-y-4 text-lg text-white/60 font-light flex flex-col items-end">
                        <FeatureItem text="High-Torque Motors" align="right" />
                        <FeatureItem text="Micro-Serrated Blades" align="right" />
                        <FeatureItem text="Zero-Gap Adjustable" align="right" />
                    </ul>
                </div>
            </Section>

            {/* SECTION 4: STYLING (55-75%) */}
            <Section range={[0.55, 0.75]} progress={scrollYProgress} className="items-center justify-center -translate-x-0 md:-translate-x-1/4 z-10">
                <h2 className="text-6xl md:text-8xl font-bold text-white tracking-widest uppercase text-center drop-shadow-2xl opacity-10 leading-none">
                    CONTROL
                </h2>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-xl md:text-3xl font-light text-white tracking-widest uppercase">Style with Precision</p>
                </div>
            </Section>

            {/* SECTION 5: COSMETICS (75-90%) */}
            <Section range={[0.75, 0.90]} progress={scrollYProgress} className="items-center justify-center translate-y-0 md:translate-y-20 z-10">
                <h2 className="text-4xl md:text-6xl font-light text-white/80 italic text-center font-serif">
                    &quot;Finish with perfection&quot;
                </h2>
            </Section>

            {/* SECTION 6: CTA (90-100%) */}
            <Section range={[0.90, 1.0]} progress={scrollYProgress} className="items-center justify-center pb-20 z-10">
                <div className="text-center p-10">
                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-8">
                        READY FOR <span className="text-accent-red">WORK.</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto">
                        <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-12 text-sm font-bold tracking-widest uppercase h-14" asChild>
                            <Link href="/shop">Shop Collection</Link>
                        </Button>
                    </div>
                </div>
            </Section>

        </div>
    );
}

function Section({ range, progress, children, className }: { range: [number, number], progress: MotionValue<number>, children: React.ReactNode, className?: string }) {
    const opacity = useSectionOpacity(progress, range[0], range[1]);
    const y = useSectionY(progress, range[0], range[1]);

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute inset-0 flex flex-col ${className}`}
        >
            {children}
        </motion.div>
    );
}

function FeatureItem({ text, align = 'left' }: { text: string, align?: 'left' | 'right' }) {
    return (
        <li className={`flex items-center gap-4 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
            <div className="w-1.5 h-1.5 bg-accent-red rounded-full shadow-[0_0_8px_rgba(255,42,61,0.8)]" />
            <span>{text}</span>
        </li>
    )
}
