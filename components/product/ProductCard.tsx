'use client';

import { useCartStore } from '@/store/useCart';
import { Product } from '@/lib/products'; // Assuming we will check this
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Eye } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    const { addItem } = useCartStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative flex flex-col bg-[#0B0B0D] border border-white/5 hover:border-accent-red/30 transition-all duration-300 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-black/50"
        >
            {/* Badges/Category */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] uppercase tracking-widest text-white/70 font-mono border border-white/5">
                    {product.category}
                </span>
                {/* Simulated Stock Low Badge for "Pro" feel */}
                {(product.price > 200) && (
                    <span className="px-2 py-1 bg-accent-red/20 backdrop-blur-md rounded text-[10px] uppercase tracking-widest text-accent-red font-mono border border-accent-red/20">
                        Low Stock
                    </span>
                )}
            </div>

            {/* Image Area */}
            <div className="relative w-full aspect-[4/5] bg-[#111] overflow-hidden group">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority={priority}
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-white text-black hover:bg-white/90 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                        onClick={(e) => {
                            e.preventDefault();
                            addItem(product);
                        }}
                        aria-label="Add to cart"
                    >
                        <ShoppingBag className="w-4 h-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100"
                        asChild
                    >
                        <Link href={`/product/${product.id}`} aria-label="View Product">
                            <Eye className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="flex justify-between items-start gap-2">
                    <Link href={`/product/${product.id}`} className="group-hover:text-accent-red transition-colors duration-300">
                        <h3 className="text-lg font-bold text-white tracking-wide leading-tight line-clamp-2">{product.name}</h3>
                    </Link>
                    <div className="flex flex-col items-end">
                        <p className="text-white font-mono font-bold">${product.price.toFixed(2)}</p>
                    </div>
                </div>

                <p className="text-sm text-white/40 line-clamp-2 mt-auto pt-2">{product.description || "Professional grade tool designed for precision and durability."}</p>

                <div className="pt-4 mt-2 border-t border-white/5 lg:hidden">
                    <Button
                        className="w-full bg-white/5 hover:bg-accent-red hover:text-white transition-colors"
                        onClick={() => addItem(product)}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
