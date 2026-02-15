'use client';

import { useCartStore } from '@/store/useCart';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useEffect, useRef } from 'react';

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const drawerRef = useRef<HTMLDivElement>(null);

    // Focus trap and escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeCart();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // Lock scroll
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, closeCart]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeCart();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    onClick={handleBackdropClick}
                    className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cart-title"
                >
                    <motion.div
                        ref={drawerRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="w-full max-w-md bg-[#0B0B0D] h-full shadow-2xl border-l border-white/5 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0B0B0D]">
                            <h2 id="cart-title" className="text-lg font-bold text-white tracking-widest uppercase flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-accent-red" />
                                Your Cart
                                <span className="text-white/40 text-sm ml-2 font-normal lowercase">({items.length} items)</span>
                            </h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={closeCart}
                                className="text-white/50 hover:text-white hover:bg-white/5 rounded-full"
                                aria-label="Close cart"
                            >
                                <X size={20} />
                            </Button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-4">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBag size={32} className="opacity-20" />
                                    </div>
                                    <p className="text-sm font-mono tracking-wide">YOUR CART IS EMPTY</p>
                                    <Button variant="outline" onClick={closeCart} className="mt-4 border-white/10 text-white hover:bg-white/5">
                                        Start Shopping
                                    </Button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-start group animate-in slide-in-from-right-4 duration-500 fade-in">
                                        <div className="relative w-24 h-24 bg-black/50 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col h-24 justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="text-sm font-bold text-white truncate pr-4 leading-tight">{item.name}</h3>
                                                    <p className="text-accent-red text-sm font-mono font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="text-[10px] text-white/40 uppercase tracking-wider">{item.category}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border border-white/10 rounded-md overflow-hidden bg-black/20">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-2 py-1 text-white/50 hover:text-white hover:bg-white/5 text-xs transition-colors"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="px-2 text-xs font-mono text-white min-w-[20px] text-center select-none">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2 py-1 text-white/50 hover:text-white hover:bg-white/5 text-xs transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-white/20 hover:text-accent-red transition-colors p-1"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/5 bg-[#08080A]">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white/50">Subtotal</span>
                                        <span className="text-white font-mono">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white/50">Shipping</span>
                                        <span className="text-white/50 text-xs">Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-4 border-t border-white/5">
                                        <span className="text-white font-bold tracking-wide">TOTAL</span>
                                        <span className="text-2xl font-bold text-white tracking-widest font-mono text-accent-red">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button
                                    className="w-full bg-accent-red hover:bg-accent-highlight text-white font-bold h-12 text-sm uppercase tracking-widest shadow-[0_4px_20px_rgba(177,18,38,0.4)] hover:shadow-[0_6px_30px_rgba(255,42,61,0.5)] transition-all"
                                    onClick={closeCart}
                                    asChild
                                >
                                    <Link href="/checkout">
                                        Checkout Securely <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <p className="text-center mt-4 text-[10px] text-white/30">
                                    Secure Encypted Checkout
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
