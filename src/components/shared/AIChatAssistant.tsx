"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/customer/ProductCard";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  isTyping?: boolean;
  productPayload?: any;
};

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "ai",
      content: "Hello! I'm your NexStore AI assistant. What are you looking for today?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: userMsg },
      { id: "typing", role: "ai", content: "Thinking...", isTyping: true },
    ]);

    // Mock AI Response latency
    setTimeout(() => {
      let aiResponse = "I can help you find products.";
      let productPayload = null;

      const lowerInput = userMsg.toLowerCase();
      if (lowerInput.includes("macbook") || lowerInput.includes("laptop")) {
        aiResponse = "Based on your request, I highly recommend the new MacBook Pro. Here it is:";
        productPayload = products[0];
      } else if (lowerInput.includes("headphone") || lowerInput.includes("audio")) {
        aiResponse = "For premium audio, the Sony WH-1000XM5 is currently our best seller:";
        productPayload = products[1];
      } else {
        aiResponse = "I'm not sure about that specific item, but you can browse our catalog. Would you like me to show you our best sellers?";
      }

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== "typing");
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
    }, 1500);
  };

  return (
    <>
      {/* Toggle Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 transition-transform hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </Button>

      {/* Chat Box */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] flex flex-col shadow-2xl z-50 border-primary/20 overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-primary p-4 text-primary-foreground flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/20 rounded-full">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">NexStore AI</h3>
              <p className="text-xs text-primary-foreground/80">Always here to help</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-background border rounded-tl-sm shadow-sm"
                    } ${msg.isTyping ? "animate-pulse" : ""}`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  {msg.productPayload && (
                    <div className="w-full max-w-[240px] mt-2 animate-in fade-in zoom-in duration-300">
                      <ProductCard product={msg.productPayload} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-background border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Ask for recommendations..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="rounded-full bg-muted/50 focus-visible:ring-primary/20"
              />
              <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
}
