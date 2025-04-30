
import React from 'react';
import { OrderStatus } from '@/types';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-blue-100 text-blue-800',
  ready_for_pickup: 'bg-purple-100 text-purple-800',
  picked_up: 'bg-brand-orange/20 text-brand-orange',
  on_the_way: 'bg-brand-orange/20 text-brand-orange',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready_for_pickup: 'Ready for Pickup',
  picked_up: 'Picked Up',
  on_the_way: 'On the Way',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className }) => {
  return (
    <span className={`inline-flex items-center justify-center rounded-full text-xs font-medium px-2 py-1 ${statusStyles[status]} ${className || ''}`}>
      {statusLabels[status]}
    </span>
  );
};
