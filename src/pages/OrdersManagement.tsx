import React from 'react';
import { MoreHorizontal, File, Search } from 'lucide-react';

import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: OrderStatus;
  total: number;
};

const sampleOrders: Order[] = [
    { id: 'ORD001', customerName: 'Liam Johnson', customerEmail: 'liam@example.com', date: '2023-07-15', status: 'Shipped', total: 250.00 },
    { id: 'ORD002', customerName: 'Olivia Smith', customerEmail: 'olivia@example.com', date: '2023-07-14', status: 'Delivered', total: 150.75 },
    { id: 'ORD003', customerName: 'Noah Williams', customerEmail: 'noah@example.com', date: '2023-07-16', status: 'Processing', total: 350.00 },
    { id: 'ORD004', customerName: 'Emma Brown', customerEmail: 'emma@example.com', date: '2023-07-13', status: 'Cancelled', total: 75.00 },
    { id: 'ORD005', customerName: 'Ava Jones', customerEmail: 'ava@example.com', date: '2023-07-12', status: 'Delivered', total: 450.50 },
];

const getStatusVariant = (status: OrderStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
        case 'Shipped':
            return 'default';
        case 'Processing':
            return 'secondary';
        case 'Delivered':
            return 'outline';
        case 'Cancelled':
            return 'destructive';
        default:
            return 'secondary';
    }
}

const OrdersManagement = () => {
    console.log('OrdersManagement page loaded');
    
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <LeftSidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header />
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="processing">Processing</TabsTrigger>
                                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                                <TabsTrigger value="delivered" className="hidden sm:flex">Delivered</TabsTrigger>
                                <TabsTrigger value="cancelled" className="hidden sm:flex">Cancelled</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <Button size="sm" variant="outline" className="h-8 gap-1">
                                    <File className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Export
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="all">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Orders</CardTitle>
                                    <CardDescription>
                                        Manage your orders and view their sales details.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Customer</TableHead>
                                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                                <TableHead>
                                                    <span className="sr-only">Actions</span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {sampleOrders.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell>
                                                        <div className="font-medium">{order.customerName}</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            {order.customerEmail}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge variant={getStatusVariant(order.status)}>
                                                            {order.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                                                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Toggle menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                                                <DropdownMenuItem>Customer History</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter>
                                    <div className="text-xs text-muted-foreground">
                                        Showing <strong>1-5</strong> of <strong>{sampleOrders.length}</strong> orders
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default OrdersManagement;