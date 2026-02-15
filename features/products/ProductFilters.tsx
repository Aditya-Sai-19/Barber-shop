'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ["Pro Tools", "Styling", "Cosmetics", "Essentials"];

export default function ProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCat = searchParams.get('cat');
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 500;

    const handleCategoryClick = (cat: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentCat === cat) {
            params.delete('cat');
        } else {
            params.set('cat', cat);
        }
        router.push(`?${params.toString()}`);
    };

    const clearFilters = () => {
        router.push('/shop');
    };

    return (
        <div className="w-full lg:w-64 flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="lg:sticky lg:top-24 space-y-8 bg-[#0B0B0D] border border-white/5 p-6 rounded-xl">

                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <h3 className="font-bold text-white tracking-widest uppercase text-sm flex items-center gap-2">
                        <Filter className="w-4 h-4 text-accent-red" />
                        Filters
                    </h3>
                    {(currentCat || minPrice > 0 || maxPrice < 500) && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-accent-red h-8 px-2 text-xs hover:bg-accent-red/10">
                            Clear <X className="w-3 h-3 ml-1" />
                        </Button>
                    )}
                </div>

                {/* Categories */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">Categories</h4>
                    <div className="flex flex-col gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className={`
                                    flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all duration-200
                                    ${currentCat === cat
                                        ? 'bg-accent-red/10 text-accent-red font-medium border border-accent-red/20'
                                        : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'}
                                `}
                            >
                                {cat}
                                {currentCat === cat && <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-accent-red" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range - Placeholder for Slider Component */}
                <div className="space-y-4 pt-4 border-t border-white/5 opacity-50 pointer-events-none">
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">Price Range</h4>
                    <div className="text-xs text-white/40 italic">Not implemented yet (Slider needed)</div>
                    {/* <Slider defaultValue={[0, 500]} max={500} step={10} onValueChange={(val) => {}} /> */}
                </div>
            </div>
        </div>
    );
}
