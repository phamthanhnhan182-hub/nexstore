import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Rocket } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/customer/ProductCard";

// SSG: This page will be statically generated at build time
export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-background to-muted">
        <div className="container flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
            ✨ Introducing NexStore AI
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter max-w-3xl">
            The Future of Commerce is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Intelligent</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Experience lightning-fast shopping with our headless architecture, powered by Next.js and Vercel Edge Network.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/products">
              <Button size="lg" className="h-12 px-8">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/compare">
              <Button size="lg" variant="outline" className="h-12 px-8">
                View Tech Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-20">
        <div className="container grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/50">
            <div className="p-3 rounded-full bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Lightning Fast</h3>
            <p className="text-muted-foreground">Built with Next.js App Router and SSG/ISR for sub-50ms TTFB.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/50">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Secure Architecture</h3>
            <p className="text-muted-foreground">Server Actions and robust authentication guard your data.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/50">
            <div className="p-3 rounded-full bg-primary/10">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">AI Assistant</h3>
            <p className="text-muted-foreground">Generative UI shopping assistant contextually suggests products.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-20 border-t">
        <div className="container space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <Link href="/products">
              <Button variant="ghost">View all <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
