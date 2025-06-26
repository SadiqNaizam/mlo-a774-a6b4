import React, { useState, useMemo } from 'react';

// Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

// Shadcn UI Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';

// Mock Data
const customers = [
  {
    id: 'cust_001',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    joinDate: '2023-01-15',
    avatar: {
      src: 'https://ui.shadcn.com/avatars/02.png',
      fallback: 'AJ',
    },
  },
  {
    id: 'cust_002',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    joinDate: '2023-02-20',
    avatar: {
      src: 'https://ui.shadcn.com/avatars/03.png',
      fallback: 'BW',
    },
  },
  {
    id: 'cust_003',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    joinDate: '2023-03-10',
    avatar: {
      src: '',
      fallback: 'CB',
    },
  },
  {
    id: 'cust_004',
    name: 'Diana Miller',
    email: 'diana.m@example.com',
    joinDate: '2023-04-05',
    avatar: {
      src: 'https://ui.shadcn.com/avatars/04.png',
      fallback: 'DM',
    },
  },
  {
    id: 'cust_005',
    name: 'Ethan Davis',
    email: 'ethan.d@example.com',
    joinDate: '2023-05-22',
    avatar: {
      src: 'https://ui.shadcn.com/avatars/05.png',
      fallback: 'ED',
    },
  },
  {
    id: 'cust_006',
    name: 'Fiona Garcia',
    email: 'fiona.g@example.com',
    joinDate: '2023-06-30',
    avatar: {
      src: '',
      fallback: 'FG',
    },
  },
];

const CustomersList = () => {
  console.log('CustomersList page loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) {
      return customers;
    }
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Customers</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search customers..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of your store's customers.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[350px]">Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={customer.avatar.src} alt={customer.name} />
                              <AvatarFallback>{customer.avatar.fallback}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{customer.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.joinDate}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No customers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CustomersList;