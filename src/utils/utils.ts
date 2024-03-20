import { Location } from 'react-router-dom';
import { TBurgerConstructor } from '../services/burgerConstructor/slice';

export function isUnAuthLocation(location: Location) {
  return (
    !location.state ||
    location.state?.from === '/login' ||
    location.state?.from === '/register'
  );
}

export function combineOrder(data: TBurgerConstructor): string[] {
  const order: string[] = [];
  if (data.bun) order.push(data.bun._id);
  if (data.ingredients) data.ingredients.map((item) => order.push(item._id));
  return order;
}
