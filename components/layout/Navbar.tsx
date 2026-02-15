'use client';

import { useCartStore } from '@/store/useCart';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { scrollYProgress } = useScroll();
    const [hasScrolled, setHasScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    // Custom scroll listener
    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.05], [-20, 0]);

    const { items, openCart } = useCartStore();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    // If not home page, always show background
    const showBackground = hasScrolled || !isHomePage;

    return (
        <motion.nav
            style={{
                opacity: isHomePage ? (hasScrolled ? 1 : opacity) : 1,
                y: isHomePage ? (hasScrolled ? 0 : y) : 0
            }}
            className={cn(
                "fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 h-16 transition-all duration-300 pointer-events-auto",
                showBackground ? 'bg-[#060606]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent border-transparent'
            )}
        >
            {/* Brand */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md:hidden text-white/70 hover:text-white">
                    <Menu className="h-5 w-5" />
                </Button>
                <Link href="/" className="text-xl font-bold tracking-tighter text-white uppercase hover:text-accent-red transition-colors">
                    PRO TOOLS
                </Link>
            </div>

            {/* Center Links - Desktop */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                <NavLink href="/shop">Shop All</NavLink>
                <NavLink href="/shop?cat=Pro%20Tools">Pro Tools</NavLink>
                <NavLink href="/shop?cat=Styling">Styling</NavLink>
                <NavLink href="/shop?cat=Cosmetics">Cosmetics</NavLink>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/70 hover:text-white hidden sm:flex"
                    aria-label="Search"
                >
                    <Search className="h-5 w-5" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={openCart}
                    className="relative text-white/70 hover:text-white group"
                    aria-label="Open Cart"
                >
                    <ShoppingBag className="h-5 w-5" />
                    {cartCount > 0 && (
                        <span className="absolute top-1 right-1 w-3 h-3 bg-accent-red text-[8px] font-bold flex items-center justify-center rounded-full text-white ring-2 ring-[#060606]">
                            {cartCount}
                        </span>
                    )}
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex border-accent-red/50 text-white hover:bg-accent-red/10 rounded-full"
                    asChild
                >
                    <Link href="/shop">
                        Shop Now
                    </Link>
                </Button>
            </div>
        </motion.nav>
    );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link href={href} className="text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide relative group">
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-red transition-all group-hover:w-full" />
        </Link>
    )
}
