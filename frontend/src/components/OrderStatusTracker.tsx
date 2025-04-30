
import React from 'react';
import { OrderStatus } from '@/types';
import { Check } from 'lucide-react';

interface OrderStatusTrackerProps {
  currentStatus: OrderStatus;
}

const statuses: { label: string; value: OrderStatus }[] = [
  { label: 'Order Placed', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Preparing', value: 'preparing' },
  { label: 'Ready for Pickup', value: 'ready_for_pickup' },
  { label: 'Picked up', value: 'picked_up' },
  { label: 'On the Way', value: 'on_the_way' },
  { label: 'Delivered', value: 'delivered' }
];

const getStatusIndex = (status: OrderStatus): number => {
  const index = statuses.findIndex(s => s.value === status);
  return index === -1 ? 0 : index;
};

export const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ currentStatus }) => {
  const currentStatusIndex = getStatusIndex(currentStatus);
  
  return (
    <div className="mt-6">
      <div className="relative">
        {/* Progress bar */}
        <div className="overflow-hidden h-2 mb-6 text-xs flex bg-gray-200 rounded-full">
          <div
            style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-purple transition-all duration-500"
          ></div>
        </div>
        
        {/* Status points */}
        <div className="flex justify-between">
          {statuses.map((status, index) => {
            const isCompleted = index <= currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            
            return (
              <div key={status.value} className="text-center flex flex-col items-center">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center mb-2
                    ${isCompleted ? 'bg-brand-purple text-white' : 'bg-gray-200 text-gray-400'}
                    ${isCurrent ? 'ring-4 ring-brand-purple/30 animated-pulse' : ''}
                  `}
                >
                  {isCompleted && <Check className="w-5 h-5" />}
                </div>
                <span className={`text-xs ${isCurrent ? 'font-bold text-brand-purple' : isCompleted ? 'text-gray-700' : 'text-gray-400'}`}>
                  {status.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
