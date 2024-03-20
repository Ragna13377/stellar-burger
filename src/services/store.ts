import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/slice';
import burgerConstructorReducer from './burgerConstructor/slice';
import ordersReducer from './orders/slice';
import profileReducer from './profile/slice';
import ownOrderReducer from './ownOrders/slice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orders: ordersReducer,
  profile: profileReducer,
  ownOrders: ownOrderReducer
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
