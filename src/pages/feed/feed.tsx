import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/orders/actions';
import Error from '../../components/ui/error/error';
import { getOrders, getOrdersLoadingState } from '../../services/orders/slice';

export const Feed: FC = () => {
  const orders = useSelector(getOrders);
  const { isLoading, error } = useSelector(getOrdersLoadingState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : error ? (
        <Error />
      ) : (
        orders && (
          <FeedUI
            orders={orders}
            handleGetFeeds={() => {
              dispatch(fetchOrders());
            }}
          />
        )
      )}
    </>
  );
};
