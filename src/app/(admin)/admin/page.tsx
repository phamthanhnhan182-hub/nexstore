"use client";

import { useState } from "react";
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

const recentSales = [
  {
    name: "Minh Anh Nguyen",
    email: "minhanh@nexstore.dev",
    amount: "$2,499.00",
  },
  {
    name: "Khoa Tran",
    email: "khoa.tran@nexstore.dev",
    amount: "$1,299.00",
  },
  {
    name: "Linh Pham",
    email: "linh.pham@nexstore.dev",
    amount: "$899.00",
  },
  {
    name: "Jason Lee",
    email: "jason.lee@nexstore.dev",
    amount: "$3,199.00",
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@nexstore.dev",
    amount: "$1,599.00",
  },
];

const aiInsights = [
  {
    icon: TrendingUp,
    title: "Revenue Momentum",
    text: "Revenue increased 20.1% compared with last month. Saturday is currently the strongest sales day.",
  },
  {
    icon: AlertTriangle,
    title: "Conversion Risk",
    text: "Visitors increased by 19%, but conversion remains low on mobile devices.",
  },
  {
    icon: Lightbulb,
    title: "Recommended Action",
    text: "Launch a weekend flash sale and promote best-selling products on the homepage.",
  },
];

export default function AdminDashboard() {
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateInsights = () => {
    setLoading(true);

    setTimeout(() => {
      setGenerated(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 text-zinc-950 dark:text-zinc-50">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dark:border-zinc-800 dark:bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="dark:border-zinc-800 dark:bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Orders
            </CardTitle>
            <CreditCard className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">+2350</div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="dark:border-zinc-800 dark:bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              +19% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="dark:border-zinc-800 dark:bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <Activity className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">4.3%</div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              +0.5% from last month
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
              Click the button to generate proactive business insights.
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
              {aiInsights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <Icon className="mb-3 h-5 w-5" />

                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

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
                <AreaChart data={analyticsData}>
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

                  <XAxis
                    dataKey="name"
                    stroke="currentColor"
                    opacity={0.6}
                  />

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
            {recentSales.map((sale) => (
              <div
                key={sale.email}
                className="flex items-center gap-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 font-bold dark:bg-zinc-900">
                  {sale.name.charAt(0)}
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {sale.name}
                  </p>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {sale.email}
                  </p>
                </div>

                <div className="ml-auto font-semibold text-emerald-500">
                  +{sale.amount}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}