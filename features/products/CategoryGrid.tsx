'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Scissors, Zap, Wind, Palette, Package } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
    { name: "Pro Clippers", icon: Zap, href: "/shop?cat=Pro%20Tools", color: "text-yellow-400" },
    { name: "Precision Shears", icon: Scissors, href: "/shop?cat=Pro%20Tools", color: "text-gray-300" },
    { name: "Styling & Finish", icon: Wind, href: "/shop?cat=Styling", color: "text-blue-300" },
    { name: "Cosmetics", icon: Palette, href: "/shop?cat=Cosmetics", color: "text-pink-300" },
    { name: "Essentials", icon: Package, href: "/shop?cat=Essentials", color: "text-white" },
];

export default function CategoryGrid() {
    return (
        <section className="relative z-10 bg-[#060606] py-24 px-6 md:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                >
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-white/40 max-w-md text-lg font-light">
                            Professional grade equipment curated for the modern barber.
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="group flex items-center gap-2 text-white/70 hover:text-accent-red transition-colors text-sm font-medium uppercase tracking-widest"
                    >
                        View All Collection
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {CATEGORIES.map((cat, i) => (
                        <Link key={cat.name} href={cat.href} className="block group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="h-64 relative bg-[#0B0B0D] border border-white/5 rounded-2xl p-6 flex flex-col justify-between overflow-hidden hover:border-accent-red/30 transition-colors group-hover:bg-white/[0.02]"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500 text-white" />
                                </div>

                                <cat.icon className={`w-10 h-10 ${cat.color} opacity-80 group-hover:scale-110 transition-transform duration-500`} />

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{cat.name}</h3>
                                    <p className="text-xs text-white/40 font-mono uppercase tracking-wider">Explore</p>
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-accent-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
