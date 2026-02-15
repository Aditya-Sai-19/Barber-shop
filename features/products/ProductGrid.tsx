'use client';

import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/lib/products';
import { AnimatePresence, motion } from 'framer-motion';

interface ProductGridProps {
    products: Product[];
    className?: string;
}

export default function ProductGrid({ products, className }: ProductGridProps) {


    return (
        <motion.div
            layout
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
        >
            <AnimatePresence>
                {products.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="col-span-full h-64 flex items-center justify-center text-white/40"
                    >
                        <p>No products found matching your criteria.</p>
                    </motion.div>
                ) : (
                    products.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))
                )}
            </AnimatePresence>
        </motion.div>
    );
}
