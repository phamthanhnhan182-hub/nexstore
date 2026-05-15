"use client";

import { useEffect, useState } from "react";
import { products as initialProducts } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Plus } from "lucide-react";
import { toast } from "sonner";

type Product = (typeof initialProducts)[number];

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isGenerating, setIsGenerating] = useState(false);
  const [seoDescription, setSeoDescription] = useState("");
  const [seoTitle, setSeoTitle] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Accessories");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  );

  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("nexstore-products") || "[]"
    );

    if (storedProducts.length > 0) {
      setProducts(storedProducts);
    } else {
      localStorage.setItem("nexstore-products", JSON.stringify(initialProducts));
      setProducts(initialProducts);
    }
  }, []);

  const syncProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem("nexstore-products", JSON.stringify(updatedProducts));
  };

  const updatePrice = (id: string, value: string) => {
    const nextPrice = Number(value);

    const updatedProducts = products.map((product) =>
      product.id === id
        ? {
            ...product,
            price: Number.isNaN(nextPrice) ? product.price : nextPrice,
          }
        : product
    );

    syncProducts(updatedProducts);
  };

  const updateStock = (id: string, value: string) => {
    const nextStock = Number(value);

    const updatedProducts = products.map((product) =>
      product.id === id
        ? {
            ...product,
            stock: Number.isNaN(nextStock)
              ? product.stock
              : Math.max(nextStock, 0),
          }
        : product
    );

    syncProducts(updatedProducts);
  };

  const resetInventory = () => {
    syncProducts(initialProducts);
    toast.success("Inventory reset to seeded dataset");
  };

  const handleGenerateSEO = () => {
    if (!name) {
      toast.error("Please enter a product name first");
      return;
    }

    setIsGenerating(true);
    toast.info("AI is analyzing product context...");

    setTimeout(() => {
      setSeoTitle(`Buy ${name} | Best Price | NexStore`);
      setSeoDescription(
        `Looking for the best ${name}? Shop now at NexStore for premium quality, fast shipping, and excellent customer service. Elevate your experience today.`
      );
      setIsGenerating(false);
      toast.success("SEO Metadata generated successfully!");
    }, 1500);
  };

  const handleAddProduct = () => {
    if (!name || !price || !stock) {
      toast.error("Please enter product name, price, and stock");
      return;
    }

    const newProduct = {
      id: `custom-${Date.now()}`,
      name,
      slug: createSlug(name),
      price: Number(price),
      category,
      stock: Number(stock),
      image,
      description:
        seoDescription ||
        `${name} is a newly added product in the NexStore catalog.`,
      seoMeta: {
        title: seoTitle || `Buy ${name} | NexStore`,
        description:
          seoDescription ||
          `${name} is available now at NexStore with competitive pricing and fast checkout.`,
      },
    } as Product;

    const updatedProducts = [newProduct, ...products];

    syncProducts(updatedProducts);

    setName("");
    setCategory("Accessories");
    setPrice("");
    setStock("");
    setImage("https://images.unsplash.com/photo-1523275335684-37898b6baf30");
    setSeoTitle("");
    setSeoDescription("");

    toast.success("Product added successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground">
            Admin can add products, update price, and update stock. Inventory
            changes are persisted in the replaceable demo data layer.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={resetInventory}>
            Reset Inventory
          </Button>

          <Dialog>
            <DialogTrigger
              render={
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              }
            />

            <DialogContent className="sm:max-w-[650px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Product Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. iPhone 15 Pro"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Category</Label>
                    <Input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Laptops"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 999"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Stock</Label>
                    <Input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="e.g. 20"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Image URL</Label>
                    <Input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-4 rounded-lg border bg-muted/20 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        AI SEO Optimizer
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Generate high-converting SEO tags automatically
                      </p>
                    </div>

                    <Button
                      onClick={handleGenerateSEO}
                      disabled={isGenerating || !name}
                      variant="secondary"
                    >
                      {isGenerating ? "Generating..." : "Generate AI SEO"}
                    </Button>
                  </div>

                  <div className="grid gap-2">
                    <Label>SEO Title</Label>
                    <Input
                      value={seoTitle}
                      readOnly
                      placeholder="AI will generate this..."
                      className="bg-background"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>SEO Description</Label>
                    <Textarea
                      value={seoDescription}
                      readOnly
                      placeholder="AI will generate this..."
                      className="bg-background"
                    />
                  </div>
                </div>

                <Button onClick={handleAddProduct} className="w-full">
                  Save Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="flex items-center gap-3 font-medium">
                  <div className="h-10 w-10 overflow-hidden rounded bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {product.name}
                </TableCell>

                <TableCell>
                  <Badge variant="secondary">{product.category}</Badge>
                </TableCell>

                <TableCell>
                  <Input
                    type="number"
                    value={product.price}
                    onChange={(e) => updatePrice(product.id, e.target.value)}
                    className="w-[130px]"
                  />
                </TableCell>

                <TableCell>
                  <Input
                    type="number"
                    value={product.stock}
                    onChange={(e) => updateStock(product.id, e.target.value)}
                    className="w-[100px]"
                  />
                </TableCell>

                <TableCell className="text-right">
                  <Badge
                    variant={
                      product.stock <= 0
                        ? "destructive"
                        : product.stock > 10
                          ? "default"
                          : "destructive"
                    }
                  >
                    {product.stock <= 0
                      ? "Out of Stock"
                      : product.stock > 10
                        ? "In Stock"
                        : "Low Stock"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}