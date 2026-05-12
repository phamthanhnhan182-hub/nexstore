"use client";

import { useState } from "react";
import { products as initialProducts } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [isGenerating, setIsGenerating] = useState(false);
  const [seoDescription, setSeoDescription] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [name, setName] = useState("");

  const handleGenerateSEO = () => {
    if (!name) {
      toast.error("Please enter a product name first");
      return;
    }
    setIsGenerating(true);
    toast.info("AI is analyzing product context...");
    
    // Simulate AI Latency
    setTimeout(() => {
      setSeoTitle(`Buy ${name} | Best Price | NexStore`);
      setSeoDescription(`Looking for the best ${name}? Shop now at NexStore for premium quality, fast shipping, and excellent customer service. Elevate your experience today.`);
      setIsGenerating(false);
      toast.success("SEO Metadata generated successfully!");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Dialog>
          <DialogTrigger render={<Button><Plus className="mr-2 h-4 w-4" /> Add Product</Button>} />
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. iPhone 15 Pro" />
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-500" /> AI SEO Optimizer
                    </h4>
                    <p className="text-sm text-muted-foreground">Generate high-converting SEO tags automatically</p>
                  </div>
                  <Button onClick={handleGenerateSEO} disabled={isGenerating || !name} variant="secondary">
                    {isGenerating ? "Generating..." : "Generate AI SEO"}
                  </Button>
                </div>
                
                <div className="grid gap-2">
                  <Label>SEO Title</Label>
                  <Input value={seoTitle} readOnly placeholder="AI will generate this..." className="bg-background" />
                </div>
                <div className="grid gap-2">
                  <Label>SEO Description</Label>
                  <Textarea value={seoDescription} readOnly placeholder="AI will generate this..." className="bg-background" />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
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
                <TableCell className="font-medium flex items-center gap-3">
                  <div className="h-10 w-10 rounded overflow-hidden bg-muted">
                    <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
                  </div>
                  {product.name}
                </TableCell>
                <TableCell><Badge variant="secondary">{product.category}</Badge></TableCell>
                <TableCell>${product.price.toLocaleString()}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={product.stock > 10 ? "default" : "destructive"}>
                    {product.stock > 10 ? "In Stock" : "Low Stock"}
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
