"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity: 1,
    });

    toast.success(`${product.name} added to cart`);
  };

  return (
    <Button
      size="lg"
      className="h-14 w-full text-lg"
      onClick={handleAddToCart}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}