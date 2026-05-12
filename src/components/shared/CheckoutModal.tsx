"use client";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export function CheckoutModal({
  open,
  onClose,
}: CheckoutModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[400px] rounded-2xl bg-white p-6 dark:bg-zinc-950">
        <h2 className="text-2xl font-bold">
          Checkout Success
        </h2>

        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Your order has been placed successfully.
        </p>

        <div className="mt-4 rounded-xl bg-zinc-100 p-4 dark:bg-zinc-900">
          <p>
            Order ID: NX-
            {Math.floor(Math.random() * 99999)}
          </p>

          <p>Status: Processing</p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-black py-3 text-white dark:bg-white dark:text-black"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}