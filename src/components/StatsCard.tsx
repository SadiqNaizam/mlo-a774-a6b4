import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  percentageChange: number;
  changeLabel: string;
  icon: React.ElementType;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, percentageChange, changeLabel, icon: Icon }) => {
  console.log(`StatsCard loaded: ${title}`);

  const isPositive = percentageChange >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span className={cn(
            "flex items-center font-semibold",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            {isPositive ? 
              <ArrowUp className="h-4 w-4 mr-1" /> : 
              <ArrowDown className="h-4 w-4 mr-1" />
            }
            {Math.abs(percentageChange)}%
          </span>
          {changeLabel}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;