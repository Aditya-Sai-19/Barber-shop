'use client';

// Shop layout wrapping all shop routes
export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="pt-24 min-h-screen relative z-10 w-full bg-[#060606]">
            {children}
        </div>
    );
}
