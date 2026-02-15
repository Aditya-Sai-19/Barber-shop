import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import CartDrawer from '@/components/cart/CartDrawer';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'PRO TOOLS | Cinematic E-Commerce',
  description: 'Precision tools for professional barbers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased selection:bg-accent-red selection:text-white`}>
        <Navbar />
        <CartDrawer />
        <Toaster position="bottom-right" theme="dark" />
        <main className="relative z-0 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
