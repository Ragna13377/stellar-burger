import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getAllOwnOrders,
  getOwnOrdersLoadingState
} from '../../services/ownOrders/slice';
import { fetchOwnOrders } from '../../services/ownOrders/actions';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getAllOwnOrders);
  useEffect(() => {
    dispatch(fetchOwnOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
