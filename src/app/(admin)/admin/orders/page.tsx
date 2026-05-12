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

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  total: number;
  status: string;
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

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
          Admin can update delivery status. AI analytics can use this order
          status data to detect fulfillment risk and revenue movement.
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
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}