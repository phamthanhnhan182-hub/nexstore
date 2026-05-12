"use client";

import { useCartStore } from "@/store/useCartStore";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const cart = useCartStore();

  if (!open) return null;

  const orderId = `NX-${Math.floor(10000 + Math.random() * 89999)}`;
  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

const handleComplete = () => {
  const storedProducts = JSON.parse(
    localStorage.getItem("nexstore-products") || "[]"
  );

  const updatedProducts = storedProducts.map((product: any) => {
    const cartItem = cart.items.find((item) => item.id === product.id);

    if (!cartItem) return product;

    return {
      ...product,
      stock: Math.max(product.stock - cartItem.quantity, 0),
    };
  });

  localStorage.setItem(
    "nexstore-products",
    JSON.stringify(updatedProducts)
  );

  const newOrder = {
    id: orderId,
    customerName: "Demo Customer",
    customerEmail: "customer@nexstore.dev",
    createdAt: new Date().toISOString(),
    total,
    status: "PROCESSING",
    items: cart.items,
  };

  const existingOrders = JSON.parse(
    localStorage.getItem("nexstore-orders") || "[]"
  );

  localStorage.setItem(
    "nexstore-orders",
    JSON.stringify([newOrder, ...existingOrders])
  );

  cart.clearCart();
  onClose();

  window.location.reload();
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[420px] rounded-2xl bg-white p-6 dark:bg-zinc-950">
        <h2 className="text-2xl font-bold">Checkout Success</h2>

        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Your order has been placed successfully and synced to the admin order
          dashboard.
        </p>

        <div className="mt-4 rounded-xl bg-zinc-100 p-4 dark:bg-zinc-900">
          <p>Order ID: {orderId}</p>
          <p>Status: Processing</p>
          <p>Total: ${total.toLocaleString()}</p>
        </div>

        <button
          onClick={handleComplete}
          className="mt-6 w-full rounded-xl bg-black py-3 text-white dark:bg-white dark:text-black"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}