import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Truck, Shield } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { AddToCartButton } from "@/components/customer/AddToCartButton";

export const revalidate = 30; // ISR

// Generate static params for all known products
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: product.seoMeta.title,
    description: product.seoMeta.description,
    openGraph: {
      images: [product.image],
    },
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-12">
      <Link href="/products">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square relative rounded-2xl overflow-hidden border bg-muted">
          <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
        </div>

        <div className="space-y-8">
          <div>
            <Badge className="mb-4">{product.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-3xl font-bold mt-4">${product.price.toLocaleString()}</p>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-4">
            <AddToCartButton product={product} />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8 border-t">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-secondary rounded-full">
                <Truck className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-secondary rounded-full">
                <Shield className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-medium">2 Year Warranty</p>
                <p className="text-sm text-muted-foreground">Full coverage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
