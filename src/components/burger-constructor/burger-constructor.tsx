import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import {
  clearConstructor,
  getConstructorBurger
} from '../../services/burgerConstructor/slice';
import {
  clearOwnOrder,
  getOwnOrder,
  getOwnOrdersLoadingState
} from '../../services/ownOrders/slice';
import { useDispatch } from '../../services/store';
import { makeOrder } from '../../services/ownOrders/actions';
import { combineOrder } from '../../utils/utils';
import { getUser } from '../../services/profile/slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getConstructorBurger);
  const { isLoading: orderRequest } = useSelector(getOwnOrdersLoadingState);
  const orderModalData = useSelector(getOwnOrder);
  const user = useSelector(getUser);

  const onOrderClick = () => {
    if (!user) navigate('/login');
    if (
      !user ||
      !constructorItems.bun ||
      constructorItems.ingredients.length === 0 ||
      orderRequest
    )
      return;
    dispatch(makeOrder(combineOrder(constructorItems)));
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOwnOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients.length > 0
        ? constructorItems.ingredients.reduce(
            (s: number, v: TConstructorIngredient) => s + v.price,
            0
          )
        : 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
