import React from 'react';
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
} from 'lucide-react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

// Custom Page-Specific Components
import StatsCard from '@/components/StatsCard';
import SalesChart from '@/components/SalesChart';
import RecentOrdersTable from '@/components/RecentOrdersTable';

const Dashboard = () => {
  console.log('Dashboard page loaded');

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* Stats Cards Section */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatsCard
              title="Total Revenue"
              value="$45,231.89"
              percentageChange={20.1}
              changeLabel="from last month"
              icon={DollarSign}
            />
            <StatsCard
              title="Subscriptions"
              value="+2350"
              percentageChange={180.1}
              changeLabel="from last month"
              icon={Users}
            />
            <StatsCard
              title="Sales"
              value="+12,234"
              percentageChange={19}
              changeLabel="from last month"
              icon={CreditCard}
            />
            <StatsCard
              title="Active Now"
              value="+573"
              percentageChange={-2.1}
              changeLabel="since last hour"
              icon={Activity}
            />
          </section>

          {/* Main Content Section with Chart and Table */}
          <section className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <SalesChart />
            </div>
            <div className="xl:col-span-1">
              <RecentOrdersTable />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;