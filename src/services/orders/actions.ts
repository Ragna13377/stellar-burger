import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk(
  'orders/getAll',
  async () => await getFeedsApi()
);
export const fetchOrderById = createAsyncThunk(
  'orders/getById',
  async (number: number) => await getOrderByNumberApi(number)
);
