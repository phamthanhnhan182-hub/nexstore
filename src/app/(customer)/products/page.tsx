import { products } from "@/lib/data";
import { ProductCard } from "@/components/customer/ProductCard";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export const metadata = {
  title: "Products | NexStore",
  description: "Browse our premium selection of electronics and accessories.",
};

export default function ProductsPage() {
  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">All Products</h1>
        <p className="text-muted-foreground mt-2">
          Discover the best deals on premium tech.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
