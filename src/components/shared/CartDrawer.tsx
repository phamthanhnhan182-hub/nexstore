"use client";

import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CheckoutModal } from "./CheckoutModal";
import { useState, useEffect } from "react";

export function CartDrawer() {
  const cart = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          }
        />

        <SheetContent className="flex w-full flex-col sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Your Cart ({itemCount} items)</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {cart.items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-2">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                <span className="text-lg font-medium text-muted-foreground">
                  Your cart is empty
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="h-16 w-16 overflow-hidden rounded-md border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <span className="line-clamp-1 font-medium">
                        {item.name}
                      </span>
                      <span className="text-muted-foreground">
                        ${item.price}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          item.quantity > 1
                            ? cart.updateQuantity(item.id, item.quantity - 1)
                            : cart.removeItem(item.id)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-4 text-center">{item.quantity}</span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          cart.updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="icon"
                        className="ml-2 h-8 w-8"
                        onClick={() => cart.removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between text-lg font-medium">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>

            <Button
              className="w-full rounded-xl py-6 text-base font-semibold"
              disabled={cart.items.length === 0}
              onClick={() => setCheckoutOpen(true)}
            >
              Proceed to Checkout
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
}