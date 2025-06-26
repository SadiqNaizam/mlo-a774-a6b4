import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from 'react-router-dom';

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

interface RecentOrder {
  id: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  amount: number;
}

const mockOrders: RecentOrder[] = [
  { id: 'ORD001', customerName: 'Liam Johnson', date: '2023-06-23', status: 'Delivered', amount: 250.00 },
  { id: 'ORD002', customerName: 'Olivia Smith', date: '2023-06-24', status: 'Shipped', amount: 150.75 },
  { id: 'ORD003', customerName: 'Noah Williams', date: '2023-06-25', status: 'Processing', amount: 75.50 },
  { id: 'ORD004', customerName: 'Emma Brown', date: '2023-06-26', status: 'Cancelled', amount: 300.00 },
  { id: 'ORD005', customerName: 'Ava Jones', date: '2023-06-27', status: 'Shipped', amount: 45.99 },
];

const getStatusBadgeVariant = (status: OrderStatus): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Shipped':
    case 'Delivered':
      return 'default'; // Blue/Primary
    case 'Processing':
      return 'secondary'; // Gray
    case 'Cancelled':
      return 'destructive'; // Red
    default:
      return 'outline';
  }
};

const RecentOrdersTable: React.FC = () => {
  console.log('RecentOrdersTable loaded');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>An overview of your 5 most recent orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild size="sm" variant="outline">
          <Link to="/orders-management">
            View All Orders
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentOrdersTable;