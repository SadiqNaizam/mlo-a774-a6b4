import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import CustomersList from "./pages/CustomersList";
import Dashboard from "./pages/Dashboard";
import OrdersManagement from "./pages/OrdersManagement";
import ProductsManagement from "./pages/ProductsManagement";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Dashboard />} />
          <Route path="/customers-list" element={<CustomersList />} />
          <Route path="/orders-management" element={<OrdersManagement />} />
          <Route path="/products-management" element={<ProductsManagement />} />
          <Route path="/settings" element={<Settings />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
