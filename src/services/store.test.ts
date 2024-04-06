import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/slice';
import burgerConstructorReducer from './burgerConstructor/slice';
import ordersReducer from './orders/slice';
import profileReducer from './profile/slice';
import ownOrderReducer from './ownOrders/slice';
import store from './store';

describe('Тест store', () => {
  it('Тест инициализации корневого редьюсера', () => {
    const testRootReducer = combineReducers({
      ingredients: ingredientsReducer,
      burgerConstructor: burgerConstructorReducer,
      orders: ordersReducer,
      profile: profileReducer,
      ownOrders: ownOrderReducer
    });
    const testState = testRootReducer(undefined, { type: '@@INIT' });
    expect(store.getState()).toEqual(testState);
  });
});
