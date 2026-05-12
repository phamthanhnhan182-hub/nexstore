import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ComparePage() {
  return (
    <div className="container py-12 space-y-8">
      <Link href="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Rendering Strategy Demo</h1>
        <p className="text-muted-foreground mt-2">
          This page demonstrates the difference between Server-Side Rendering (SSR) and Client-Side Rendering (CSR).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 h-[600px]">
        {/* Next.js SSR/ISR Implementation */}
        <div className="border rounded-xl p-6 flex flex-col bg-muted/20">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-green-500">Next.js SSR / ISR</h2>
            <p className="text-sm text-muted-foreground mt-1">HTML is pre-rendered on the server.</p>
          </div>
          <div className="flex-1 bg-background border rounded-lg p-4 flex flex-col items-center justify-center">
             <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                   <span className="text-green-500 font-bold text-xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold">Instantly Visible</h3>
                <p className="text-sm text-muted-foreground max-w-[250px]">
                  Open Network Tab and reload. Notice the document response contains full HTML immediately. TTFB is under 50ms.
                </p>
             </div>
          </div>
        </div>

        {/* CSR Implementation (Simulated) */}
        <div className="border rounded-xl p-6 flex flex-col bg-muted/20">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-orange-500">Traditional SPA (CSR)</h2>
            <p className="text-sm text-muted-foreground mt-1">Browser downloads blank HTML, then fetches JS to render.</p>
          </div>
          <div className="flex-1 bg-background border rounded-lg p-4 flex flex-col items-center justify-center">
             <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-t-orange-500 border-orange-200 rounded-full animate-spin mx-auto"></div>
                <h3 className="text-xl font-bold">Loading state...</h3>
                <p className="text-sm text-muted-foreground max-w-[250px]">
                  User stares at a blank screen or spinner while downloading heavy JS bundles before seeing content.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
