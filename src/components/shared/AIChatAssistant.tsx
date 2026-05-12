"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { products as initialProducts } from "@/lib/data";
import { ProductCard } from "@/components/customer/ProductCard";

type Product = (typeof initialProducts)[number];

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  isTyping?: boolean;
  productPayload?: Product;
};

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "ai",
      content:
        "Hello! I'm your NexStore AI assistant. Ask me about laptops, headphones, monitors, stock availability, or best sellers.",
    },
  ]);

  const [input, setInput] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] =
    useState<Product[]>(initialProducts);

  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("nexstore-products") || "null"
    );

    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const getBestSeller = () => {
    return [...products].sort(
      (a, b) => b.stock - a.stock
    )[0];
  };

  const getLowStockProducts = () => {
    return products.filter((p) => p.stock <= 10);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: userMsg,
      },
      {
        id: "typing",
        role: "ai",
        content: "Thinking...",
        isTyping: true,
      },
    ]);

    setTimeout(() => {
      let aiResponse = "";
      let productPayload: Product | undefined;

      const lowerInput = userMsg.toLowerCase();

      // Laptop
      if (
        lowerInput.includes("macbook") ||
        lowerInput.includes("laptop")
      ) {
        const product = products.find((p) =>
          p.name.toLowerCase().includes("macbook")
        );

        if (product) {
          if (product.stock <= 0) {
            aiResponse =
              `${product.name} is currently out of stock. ` +
              `AI recommends checking again later or exploring similar laptops.`;
          } else {
            aiResponse =
              `${product.name} is available with ${product.stock} unit(s) left in stock.`;

            productPayload = product;
          }
        }
      }

      // Headphones
      else if (
        lowerInput.includes("headphone") ||
        lowerInput.includes("audio") ||
        lowerInput.includes("sony")
      ) {
        const product = products.find((p) =>
          p.name.toLowerCase().includes("sony")
        );

        if (product) {
          if (product.stock <= 0) {
            aiResponse =
              `${product.name} is currently sold out.`;
          } else {
            aiResponse =
              `${product.name} is one of our best-selling audio products with ${product.stock} remaining.`;

            productPayload = product;
          }
        }
      }

      // Best seller
      else if (
        lowerInput.includes("best seller") ||
        lowerInput.includes("popular")
      ) {
        const bestSeller = getBestSeller();

        aiResponse =
          `${bestSeller.name} is currently trending with high stock movement and strong customer demand.`;

        productPayload = bestSeller;
      }

      // Low stock
      else if (
        lowerInput.includes("low stock") ||
        lowerInput.includes("limited")
      ) {
        const lowStock = getLowStockProducts();

        if (lowStock.length > 0) {
          aiResponse =
            `AI detected ${lowStock.length} low-stock product(s). ` +
            `${lowStock[0].name} may sell out soon.`;

          productPayload = lowStock[0];
        } else {
          aiResponse =
            "All products currently have healthy stock levels.";
        }
      }

      // Default
      else {
        aiResponse =
          "I can help with product recommendations, stock availability, pricing, and best sellers.";
      }

      setMessages((prev) => {
        const filtered = prev.filter(
          (m) => m.id !== "typing"
        );

        return [
          ...filtered,
          {
            id: Date.now().toString() + "ai",
            role: "ai",
            content: aiResponse,
            productPayload,
          },
        ];
      });
    }, 1200);
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl"
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Sparkles className="h-6 w-6" />
        )}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 flex h-[650px] w-[420px] flex-col overflow-hidden border shadow-2xl">
          <div className="flex items-center gap-3 border-b p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
              <Bot className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-semibold">
                NexStore AI
              </h3>

              <p className="text-sm text-muted-foreground">
                Real-time shopping assistant
              </p>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto p-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="max-w-[85%]">
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-black text-white"
                        : "bg-zinc-100 dark:bg-zinc-900"
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.productPayload && (
                    <div className="mt-3">
                      <ProductCard
                        product={message.productPayload}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t p-4">
            <Input
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              placeholder="Ask AI about products..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />

            <Button
              size="icon"
              onClick={handleSend}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}