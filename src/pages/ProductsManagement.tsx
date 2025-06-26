import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import ProductForm, { ProductFormData } from '@/components/ProductForm';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Pencil, Trash2 } from 'lucide-react';

// Define the shape of a full product object for the table
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

// Sample data for products
const initialProducts: Product[] = [
  { id: 'prod-001', name: 'Ergonomic Office Chair', description: 'A comfortable chair for long hours.', price: 299.99, stock: 42, imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff54a3222?q=80&w=400' },
  { id: 'prod-002', name: 'Wireless Mechanical Keyboard', description: 'Clicky keys for a satisfying typing experience.', price: 120.00, stock: 15, imageUrl: 'https://images.unsplash.com/photo-1618384887924-3bde1b1a13e3?q=80&w=400' },
  { id: 'prod-003', name: '4K Ultra-Wide Monitor', description: 'Expansive screen real estate for productivity.', price: 799.50, stock: 8, imageUrl: 'https://images.unsplash.com/photo-1629895697779-6f5a709c313a?q=80&w=400' },
  { id: 'prod-004', name: 'Noise-Cancelling Headphones', description: 'Focus on your work with immersive sound.', price: 349.00, stock: 30, imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf4022?q=80&w=400' },
  { id: 'prod-005', name: 'Adjustable Standing Desk', description: 'Switch between sitting and standing with ease.', price: 599.00, stock: 0, imageUrl: 'https://images.unsplash.com/photo-1611252399249-552683b584d4?q=80&w=400' },
];


const ProductsManagement = () => {
  console.log('ProductsManagement page loaded');

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', variant: 'destructive' as const };
    if (stock < 10) return { label: 'Low Stock', variant: 'secondary' as const };
    return { label: 'In Stock', variant: 'default' as const };
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsDialogOpen(true);
  };
  
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    // In a real app, you would also show a toast notification here.
  };

  const handleFormSubmit = (data: ProductFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        if (selectedProduct) {
            // Update existing product
            setProducts(products.map(p => p.id === selectedProduct.id ? { ...p, ...data, price: Number(data.price), stock: Number(data.stock) } : p));
        } else {
            // Add new product
            const newProduct: Product = {
                id: `prod-${Date.now()}`,
                name: data.name,
                description: data.description,
                price: Number(data.price),
                stock: Number(data.stock),
                imageUrl: data.imageFile ? URL.createObjectURL(data.imageFile) : 'https://placehold.co/100x100?text=No+Image',
            };
            setProducts([newProduct, ...products]);
        }
        setIsSubmitting(false);
        setIsDialogOpen(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="flex items-center">
                <h1 className="text-2xl font-semibold">Manage Products</h1>
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" className="h-8 gap-1" onClick={handleAddNew}>
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Product
                        </span>
                    </Button>
                </div>
            </div>
            
            <div className="border rounded-lg shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="hidden md:table-cell text-right">Stock</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => {
                            const status = getStatus(product.stock);
                            return (
                                <TableRow key={product.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <img alt="Product image" className="aspect-square rounded-md object-cover" height="64" src={product.imageUrl} width="64" />
                                    </TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={status.variant}>{status.label}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                                    <TableCell className="hidden md:table-cell text-right">{product.stock}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleEdit(product)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(product.id)}>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </main>
        <Footer />
      </div>

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
              <ProductForm 
                key={selectedProduct?.id || 'new'}
                initialData={selectedProduct || undefined}
                onSubmit={handleFormSubmit}
                onCancel={() => setIsDialogOpen(false)}
                isSubmitting={isSubmitting}
              />
          </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsManagement;