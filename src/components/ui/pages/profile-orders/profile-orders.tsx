import { FC } from 'react';

import styles from './profile-orders.module.css';
import Error from '../../../../components/ui/error/error';
import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';
import { Preloader } from '@ui';
import { useSelector } from '../../../../services/store';
import { getOwnOrdersLoadingState } from '../../../../services/ownOrders/slice';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => {
  const { isLoading, error } = useSelector(getOwnOrdersLoadingState);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : error ? (
        <Error />
      ) : (
        orders && (
          <main className={`${styles.main}`}>
            <div className={`mt-30 mr-15 ${styles.menu}`}>
              <ProfileMenu />
            </div>
            <div className={`mt-10 ${styles.orders}`}>
              <OrdersList orders={orders} />
            </div>
          </main>
        )
      )}
    </>
  );
};
