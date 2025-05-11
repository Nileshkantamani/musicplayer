import React, { ReactNode } from 'react';
import { Card } from '../ui/Card';

interface DashboardMetricCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
}

export const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  color 
}) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{value.toLocaleString()}</p>
          </div>
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${color} text-white`}>
            {icon}
          </div>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${color}`}></div>
    </Card>
  );
}; 