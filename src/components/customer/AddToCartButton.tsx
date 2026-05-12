"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

const handleAddToCart = () => {
  const storedProducts = JSON.parse(
    localStorage.getItem("nexstore-products") || "[]"
  );

  const currentProduct = storedProducts.find(
    (p: any) => p.id === product.id
  );

  const currentStock = currentProduct
    ? currentProduct.stock
    : product.stock;

  if (currentStock <= 0) {
    toast.error("Out of stock");
    return;
  }

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