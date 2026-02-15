'use client';

import ProductGrid from '@/features/products/ProductGrid';
import ProductFilters from '@/features/products/ProductFilters';
import { PRODUCTS } from '@/lib/products';
import { useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';
import { useState, useMemo, Suspense } from 'react';

function ShopContent() {
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');

    const category = searchParams.get('cat');

    // Filter logic
    const filteredProducts = useMemo(() => {
        let items = PRODUCTS;

        if (category) {
            items = items.filter(p => p.category === category);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            items = items.filter(p =>
                p.name.toLowerCase().includes(term) ||
                p.description.toLowerCase().includes(term)
            );
        }

        return items;
    }, [category, searchTerm]);

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Sidebar */}
            <ProductFilters />

            {/* Main Content */}
            <div className="flex-1 w-full space-y-8">

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0B0B0D] p-4 rounded-xl border border-white/5">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input
                            placeholder="Search products..."
                            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent-red/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="text-sm text-white/50">
                        Showing <span className="text-white font-bold">{filteredProducts.length}</span> results
                    </div>
                </div>

                {/* Grid */}
                <ProductGrid products={filteredProducts} />
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <div className="container mx-auto px-4 lg:px-8 py-8 w-full">
            <Suspense fallback={<div className="text-white">Loading products...</div>}>
                <ShopContent />
            </Suspense>
        </div>
    );
}
