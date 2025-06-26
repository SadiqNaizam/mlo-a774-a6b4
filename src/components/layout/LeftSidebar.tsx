import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  Settings,
  Package2,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';

const LeftSidebar: React.FC = () => {
  console.log('LeftSidebar loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
      isActive
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground hover:text-foreground'
    }`;
    
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">ShopSmart</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink to="/" end className={navLinkClasses}>
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink to="/orders-management" className={navLinkClasses}>
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Orders</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Orders</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink to="/products-management" className={navLinkClasses}>
                <Package className="h-5 w-5" />
                <span className="sr-only">Products</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink to="/customers-list" className={navLinkClasses}>
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Customers</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink to="/settings" className={navLinkClasses}>
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default LeftSidebar;