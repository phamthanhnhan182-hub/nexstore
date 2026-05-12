"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { analyticsData } from "@/lib/data";

type OrderItem = {
  id: string;
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

type Insight = {
  icon: typeof TrendingUp;
  title: string;
  text: string;
};

export default function AdminDashboard() {
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [chartData, setChartData] = useState(analyticsData);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  const [dashboardStats, setDashboardStats] = useState({
    revenue: 0,
    activeOrders: 0,
    visitors: 12234,
    conversionRate: 0,
  });

  const refreshDashboardData = () => {
    const storedOrders: Order[] = JSON.parse(
      localStorage.getItem("nexstore-orders") || "[]"
    );

    const totalRevenue = storedOrders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    const activeOrders = storedOrders.filter(
      (order) => order.status === "PENDING" || order.status === "PROCESSING"
    ).length;

    const visitors = 12234 + storedOrders.length * 3;

    const conversionRate =
      storedOrders.length > 0
        ? Number(((storedOrders.length / visitors) * 100).toFixed(1))
        : 0;

    setDashboardStats({
      revenue: totalRevenue,
      activeOrders,
      visitors,
      conversionRate,
    });

    setRecentOrders(storedOrders.slice(0, 5));

setChartData([
  { name: "Mon", revenue: Math.round(totalRevenue * 0.2), visitors: 1200 },
  { name: "Tue", revenue: Math.round(totalRevenue * 0.35), visitors: 1600 },
  { name: "Wed", revenue: Math.round(totalRevenue * 0.5), visitors: 2100 },
  { name: "Thu", revenue: Math.round(totalRevenue * 0.65), visitors: 2400 },
  { name: "Fri", revenue: Math.round(totalRevenue * 0.8), visitors: 2800 },
  { name: "Sat", revenue: Math.round(totalRevenue), visitors: 3400 },
  { name: "Sun", revenue: Math.round(totalRevenue * 0.9), visitors: 3100 },
]);
  };

  useEffect(() => {
    refreshDashboardData();

    const interval = setInterval(() => {
      refreshDashboardData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateInsights = () => {
    setLoading(true);

    setTimeout(() => {
      const storedOrders: Order[] = JSON.parse(
        localStorage.getItem("nexstore-orders") || "[]"
      );

      const storedProducts = JSON.parse(
        localStorage.getItem("nexstore-products") || "[]"
      );

      const totalRevenue = storedOrders.reduce(
        (sum, order) => sum + order.total,
        0
      );

      const pendingOrders = storedOrders.filter(
        (order) => order.status === "PENDING"
      ).length;

      const processingOrders = storedOrders.filter(
        (order) => order.status === "PROCESSING"
      ).length;

      const lowStockProducts = storedProducts.filter(
        (product: { stock: number }) => product.stock <= 10
      );

      const productSales = new Map<string, number>();

      storedOrders.forEach((order) => {
        order.items?.forEach((item) => {
          productSales.set(
            item.name,
            (productSales.get(item.name) || 0) + item.quantity
          );
        });
      });

      const topProduct =
        [...productSales.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ||
        "No product yet";

      setInsights([
        {
          icon: TrendingUp,
          title: "Revenue Movement",
          text:
            storedOrders.length > 0
              ? `Current tracked revenue is $${totalRevenue.toLocaleString()}. AI detects ${topProduct} as the strongest demand signal.`
              : "No checkout activity detected yet. AI needs customer orders to generate accurate revenue predictions.",
        },
        {
          icon: AlertTriangle,
          title: "Fulfillment Risk",
          text:
            pendingOrders + processingOrders > 0
              ? `${pendingOrders + processingOrders} order(s) are not shipped yet. AI recommends prioritizing fulfillment before running another promotion.`
              : "All tracked orders are shipped. Fulfillment risk is currently low.",
        },
        {
          icon: Lightbulb,
          title: "Inventory & Pricing Action",
          text:
            lowStockProducts.length > 0
              ? `${lowStockProducts.length} product(s) are low in stock. AI recommends restocking or increasing price slightly before demand spikes.`
              : "Inventory is healthy. AI recommends promoting high-margin products to improve conversion.",
        },
      ]);

      refreshDashboardData();
      setGenerated(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 text-zinc-950 dark:text-zinc-50">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dark:border-zinc-800 dark:bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${dashboardStats.revenue.toLocaleString()}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Synced from checkout orders
            </p>
          </CardContent>
        </Card>

        <Card className="dark:border-zinc-800 dark:bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.activeOrders}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Pending + processing orders
            </p>
          </CardContent>
        </Card>

        <Card className="dark:border-zinc-800 dark:bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visitors</CardTitle>
            <Users className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.visitors.toLocaleString()}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Simulated traffic signal
            </p>
          </CardContent>
        </Card>

        <Card className="dark:border-zinc-800 dark:bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Activity className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.conversionRate}%
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Based on tracked orders
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="dark:border-zinc-800 dark:bg-zinc-950">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Business Insights
          </CardTitle>

          <button
            onClick={generateInsights}
            className="rounded-xl bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black"
          >
            {loading ? "Analyzing..." : "Generate AI Insights"}
          </button>
        </CardHeader>

        <CardContent>
          {!generated && !loading && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              AI reads checkout orders, delivery status, stock levels, and
              product demand to generate live business recommendations.
            </p>
          )}

          {loading && (
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-28 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900"
                />
              ))}
            </div>
          )}

          {generated && (
            <div className="grid gap-4 md:grid-cols-3">
              {insights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <Icon className="mb-3 h-5 w-5" />
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 dark:border-zinc-800 dark:bg-zinc-950">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="currentColor"
                    opacity={0.1}
                    vertical={false}
                  />

                  <XAxis dataKey="name" stroke="currentColor" opacity={0.6} />

                  <YAxis
                    stroke="currentColor"
                    opacity={0.6}
                    tickFormatter={(value) => `$${value}`}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:border-zinc-800 dark:bg-zinc-950">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 font-bold dark:bg-zinc-900">
                    {order.customerName.charAt(0)}
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {order.customerName}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {order.customerEmail}
                    </p>
                  </div>

                  <div className="ml-auto font-semibold text-emerald-500">
                    +${order.total.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No customer orders yet. Complete a checkout to populate live
                sales.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}