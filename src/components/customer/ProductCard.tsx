"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const [stock, setStock] = useState(product.stock);

  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("nexstore-products") || "[]"
    );

    const updatedProduct = storedProducts.find(
      (p: any) => p.id === product.id
    );

    if (updatedProduct) {
      setStock(updatedProduct.stock);
    }
  }, [product.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (stock <= 0) {
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
    <Link href={`/products/${product.slug}`}>
      <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-primary/5">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <Badge className="absolute right-2 top-2 bg-background/50 backdrop-blur-md">
            {product.category}
          </Badge>
        </div>

        <CardContent className="p-4">
          <h3 className="line-clamp-1 text-lg font-semibold">
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>

          <p className="mt-2 text-sm font-medium">
            Stock: {stock}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <span className="text-lg font-bold">
            ${product.price.toLocaleString()}
          </span>

          <Button
            onClick={handleAddToCart}
            size="sm"
            disabled={stock <= 0}
            className="rounded-full"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />

            {stock <= 0 ? "Out of Stock" : "Add"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}