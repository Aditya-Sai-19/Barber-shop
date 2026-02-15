'use client';

import { Button } from '@/components/ui/Button';
import { Product } from '@/lib/products';
import { useCartStore } from '@/store/useCart';


export default function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCartStore();

    return (
        <Button
            size="lg"
            className="flex-1 h-14 text-base tracking-widest font-bold uppercase rounded-full bg-white text-black hover:bg-gray-200"
            onClick={() => addItem(product)}
        >
            Add to Cart - ${(product.price).toFixed(2)}
        </Button>
    );
}
