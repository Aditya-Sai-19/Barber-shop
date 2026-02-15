'use client';

import ScrollSequence from '@/components/scroll/ScrollSequence';
import HeroOverlay from '@/components/commerce/HeroOverlay';
import CategoryGrid from '@/features/products/CategoryGrid';
import { SCROLL_HEIGHT_VH } from '@/lib/scroll-config';

export default function MarketingPage() {
    return (
        <div className="relative w-full bg-[#060606]">
            {/* Scroll container height */}
            <div style={{ height: `${SCROLL_HEIGHT_VH}vh` }} className="relative w-full">

                {/* Fixed Background Layer */}
                <ScrollSequence mobileFallbackImage="/frames/ezgif-frame-001.png" />

                {/* Fixed Text Layer */}
                <HeroOverlay />

            </div>

            {/* Immediate Post-Hero Category Grid */}
            <div className="relative z-20 bg-[#060606]">
                <CategoryGrid />
            </div>

            {/* Footer */}
            <footer className="relative z-20 w-full text-center py-10 text-white/20 text-xs bg-[#060606] border-t border-white/5">
                <p>&copy; 2026 PRO TOOLS. Crafted for Excellence.</p>
            </footer>
        </div>
    );
}
