import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Upload } from 'lucide-react';

// Define the shape of product data used in the form
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageFile?: File | null;
}

// Define the props for the component
interface ProductFormProps {
  // Use a simplified version of product data for initial state
  initialData?: {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
  };
  onSubmit: (data: ProductFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, onCancel, isSubmitting = false }) => {
  console.log('ProductForm loaded');

  // State for form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price);
      setStock(initialData.stock);
      setImagePreview(initialData.imageUrl || null);
    }
  }, [initialData]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      price,
      stock,
      imageFile,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>{initialData ? 'Edit Product' : 'Add New Product'}</CardTitle>
          <CardDescription>
            {initialData ? 'Update the details of your product.' : 'Fill out the form to add a new product to your store.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="e.g. Modern Desk Chair"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of the product."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                step="0.01"
                min="0"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="stock">Stock Count</Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value, 10) || 0)}
                min="0"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="product-image">Product Image</Label>
            <Input
              id="product-image"
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/webp"
              disabled={isSubmitting}
            />
            <Button type="button" variant="outline" asChild disabled={isSubmitting}>
                <Label htmlFor="product-image" className="cursor-pointer flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span>{imagePreview ? 'Change Image' : 'Upload an Image'}</span>
                </Label>
            </Button>
            {imagePreview && (
              <div className="mt-2 p-2 border rounded-md w-32 h-32 flex items-center justify-center">
                 <img src={imagePreview} alt="Product Preview" className="max-w-full max-h-full object-contain rounded-md" />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-6">
          {onCancel && <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (initialData ? 'Save Changes' : 'Add Product')}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProductForm;