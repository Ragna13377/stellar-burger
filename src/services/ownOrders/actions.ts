import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';

export const makeOrder = createAsyncThunk(
  'ownOrder/makeOrder',
  async (data: string[]) => await orderBurgerApi(data)
);
export const fetchOwnOrders = createAsyncThunk(
  'ownOrder/getOwnOrders',
  async () => await getOrdersApi()
);
