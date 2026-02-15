'use client';

import { useCartStore } from '@/store/useCart';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { CheckCircle2, Truck, ShieldCheck, MapPin } from 'lucide-react';

export default function CheckoutPage() {
    const { items, clearCart } = useCartStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 15.00;
    const finalTotal = subtotal + shipping;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsProcessing(false);
        setStep('success');
        clearCart();
        toast.success("Order placed successfully!");
    };

    if (items.length === 0 && step !== 'success') {
        return (
            <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-white/20" />
                </div>
                <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Your Cart is Empty</h1>
                <Button asChild>
                    <Link href="/shop">Start Shopping</Link>
                </Button>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-white uppercase tracking-widest mb-4">Order Confirmed</h1>
                    <p className="text-white/60 text-lg">Thank you for your purchase. Your tools are on the way.</p>
                </div>
                <div className="bg-[#0B0B0D] p-6 rounded-xl border border-white/5 max-w-sm w-full space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-white/50">Order Number</span>
                        <span className="text-white font-mono">#PRO-8821</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-white/50">Estimated Delivery</span>
                        <span className="text-white">3-5 Business Days</span>
                    </div>
                </div>
                <Button size="lg" className="px-12 rounded-full" asChild>
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8">
            <h1 className="text-3xl font-bold text-white uppercase tracking-widest mb-12 flex items-center gap-4">
                Checkout <span className="text-base font-normal text-white/30 lowercase normal-case tracking-normal">/ Secure Encrypted</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Form Section */}
                <div className="lg:col-span-7 bg-[#0B0B0D] p-8 rounded-2xl border border-white/5">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Steps Indicator */}
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/30 mb-8">
                            <span className={step === 'shipping' ? 'text-accent-red' : 'text-white/30'}>01. Shipping</span>
                            <span className="w-8 h-[1px] bg-white/10"></span>
                            <span className={step === 'payment' ? 'text-accent-red' : 'text-white/30'}>02. Payment</span>
                        </div>

                        {step === 'shipping' && (
                            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-accent-red" /> Shipping Details
                                </h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" placeholder="John" required className="bg-white/5 border-white/10" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" placeholder="Doe" required className="bg-white/5 border-white/10" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" placeholder="123 Barber St" required className="bg-white/5 border-white/10" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" placeholder="New York" required className="bg-white/5 border-white/10" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="postalCode">Zip Code</Label>
                                        <Input id="postalCode" placeholder="10001" required className="bg-white/5 border-white/10" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="john@example.com" required className="bg-white/5 border-white/10" />
                                </div>

                                <Button type="button" onClick={() => setStep('payment')} className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold uppercase tracking-widest">
                                    Continue to Payment
                                </Button>
                            </div>
                        )}

                        {step === 'payment' && (
                            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-accent-red" /> Payment Method
                                </h2>

                                <div className="p-4 bg-accent-red/10 border border-accent-red/20 rounded-lg text-sm text-accent-red">
                                    This is a secure connection. Your payment details are encrypted.
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber">Card Number</Label>
                                    <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="bg-white/5 border-white/10 font-mono" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry">Expiry</Label>
                                        <Input id="expiry" placeholder="MM/YY" className="bg-white/5 border-white/10 font-mono" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" className="bg-white/5 border-white/10 font-mono" />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setStep('shipping')} className="flex-1 h-12 bg-transparent text-white border-white/20 hover:bg-white/5">
                                        Back
                                    </Button>
                                    <Button type="submit" disabled={isProcessing} className="flex-[2] h-12 bg-accent-red text-white hover:bg-accent-highlight font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(177,18,38,0.4)]">
                                        {isProcessing ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
                                    </Button>
                                </div>
                            </div>
                        )}

                    </form>
                </div>

                {/* Summary Section */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-[#111] p-6 rounded-2xl border border-white/5 sticky top-24">
                        <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Order Summary</h3>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6 custom-scrollbar">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-16 h-16 bg-black/50 rounded-lg overflow-hidden border border-white/5 flex-shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        <div className="absolute top-0 right-0 bg-accent-red text-white text-[10px] w-5 h-5 flex items-center justify-center font-bold">
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                                        <p className="text-xs text-white/50 mb-1">{item.category}</p>
                                        <p className="text-sm font-mono text-accent-red">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/5">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Subtotal</span>
                                <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Shipping</span>
                                <span className="text-white font-mono">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg pt-4 border-t border-white/5 font-bold">
                                <span className="text-white">Total</span>
                                <span className="text-accent-red font-mono">${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-3 text-xs text-white/30 bg-white/5 p-3 rounded-lg">
                            <Truck className="w-4 h-4" />
                            <span>Free shipping on orders over $1,000</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
