"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartDrawer } from "./CartDrawer";
import { Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Package2 className="h-6 w-6" />
            <span className="inline-block font-bold">NexStore</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/products"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Catalog
            </Link>
            <Link
              href="/compare"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Rendering Demo
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <CartDrawer />
          <Link href="/login">
            <Button variant="secondary" size="sm">Admin</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
