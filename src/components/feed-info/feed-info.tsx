import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
  getOrdersTotal,
  getOrders as getAllOrders
} from '../../services/orders/slice';

const getOrders = (orders: TOrder[] | null, status: string): number[] => {
  if (!orders) return [];
  return orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);
};

export const FeedInfo: FC = () => {
  const orders = useSelector(getAllOrders);
  const feed = useSelector(getOrdersTotal);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
