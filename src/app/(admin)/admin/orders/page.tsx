"use client";

import { useEffect, useState } from "react";
import { orders as initialOrders } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type OrderItem = {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  total: number;
  status: string;
  items?: OrderItem[];
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedOrders = JSON.parse(
      localStorage.getItem("nexstore-orders") || "[]"
    );

    if (storedOrders.length > 0) {
      setOrders([...storedOrders, ...initialOrders]);
    }
  }, []);

  const updateOrderStatus = (id: string, status: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );

    setOrders(updatedOrders);

    const demoOrdersOnly = updatedOrders.filter((order) =>
      order.id.startsWith("NX-")
    );

    localStorage.setItem("nexstore-orders", JSON.stringify(demoOrdersOnly));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground">
          Admin can inspect purchased items and update delivery status based on
          order details.
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>

                <TableCell>
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.customerEmail}
                  </div>
                </TableCell>

                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="font-bold">
                  ${order.total.toLocaleString()}
                </TableCell>

                <TableCell>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                    className="w-[160px] rounded-md border bg-background px-3 py-2 text-sm"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                  </select>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[560px] rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-950">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">Order Details</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedOrder.id} • {selectedOrder.customerEmail}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full px-3 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 rounded-xl border p-4">
              <div className="flex justify-between text-sm">
                <span>Status</span>
                <span className="font-semibold">{selectedOrder.status}</span>
              </div>

              <div className="mt-2 flex justify-between text-sm">
                <span>Total</span>
                <span className="font-semibold">
                  ${selectedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            <h3 className="mt-6 font-semibold">Purchased Items</h3>

            <div className="mt-3 space-y-3">
              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                selectedOrder.items.map((item, index) => (
                  <div
                    key={`${item.id ?? item.name}-${index}`}
                    className="flex items-center justify-between rounded-xl border p-3"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      )}

                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ${item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="font-semibold">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-xl bg-zinc-100 p-4 text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                  This seeded order does not contain item-level detail. New
                  checkout orders will show purchased items here.
                </p>
              )}
            </div>

            <div className="mt-6 rounded-xl bg-zinc-100 p-4 text-sm dark:bg-zinc-900">
              <strong>AI Fulfillment Hint:</strong>{" "}
              {selectedOrder.items && selectedOrder.items.length > 0
                ? "This order contains item-level data. Admin can verify stock and update status confidently."
                : "This is a seeded historical order, so item-level data is not available."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}