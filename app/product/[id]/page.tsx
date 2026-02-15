import { PRODUCTS } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Star, Heart, Share2, Check } from 'lucide-react';

import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

// Generate static params for all products (optional but good for SSG)
export async function generateStaticParams() {
    return PRODUCTS.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = PRODUCTS.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <div className="pt-24 pb-20 container mx-auto px-4 lg:px-8">
            {/* Breadcrumb / Back */}
            <div className="mb-8">
                <Button variant="ghost" className="pl-0 hover:pl-2 transition-all text-white/50 hover:text-white" asChild>
                    <Link href="/shop">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Visuals */}
                <div className="relative aspect-square bg-[#0B0B0D] rounded-3xl overflow-hidden border border-white/5 group">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Badge */}
                    <div className="absolute top-6 left-6 flex gap-2">
                        <span className="px-3 py-1 bg-accent-red text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-accent-red/20">
                            Professional
                        </span>
                        {product.price > 100 && (
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white/80 text-xs font-bold uppercase tracking-widest rounded-full border border-white/10">
                                Best Seller
                            </span>
                        )}
                    </div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase leading-none">
                                {product.name}
                            </h1>
                            <Button variant="ghost" size="icon" className="text-white/30 hover:text-accent-red transition-colors">
                                <Heart className="w-6 h-6" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-4 mt-4 mb-6">
                            <span className="text-3xl font-mono text-accent-red font-bold">
                                ${product.price.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 fill-white/20 text-white/20" />
                                ))}
                                <span className="text-xs text-white/30 ml-2">(No reviews yet)</span>
                            </div>
                        </div>
                        <p className="text-lg text-white/70 leading-relaxed font-light">
                            {product.description}
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 py-6 border-y border-white/5">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Core Features</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {product.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                                    <span className="bg-accent-red/10 p-1 rounded-full text-accent-red">
                                        <Check className="w-3 h-3" />
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <AddToCartButton product={product} />
                            <Button variant="outline" size="lg" className="h-14 aspect-square rounded-full border-white/10 hover:bg-white/5" asChild>
                                <button aria-label="Share">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </Button>
                        </div>
                        <p className="text-center text-xs text-white/30 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> In Stock - Ready to Ship
                        </p>
                    </div>
                </div>
            </div>

            {/* Specs / Related Section could go here */}
        </div>
    );
}


