import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchOrderById, fetchOrders } from './actions';
import { TLoadingState, TOrder } from '@utils-types';
import { TFeedsResponse } from '@api';

type TOrders = TLoadingState & {
  searchedOrder: TOrder | null;
  orders: TOrder[] | null;
  totals: Pick<TFeedsResponse, 'total' | 'totalToday'>;
};
export const initialState: TOrders = {
  searchedOrder: null,
  orders: null,
  totals: {
    total: 0,
    totalToday: 0
  },
  loadingState: {
    isLoading: false,
    error: undefined
  }
};
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    getSearchedOrder: (state) => state.searchedOrder,
    getOrdersTotal: (state) => state.totals,
    getOrdersLoadingState: (state) => state.loadingState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.totals.total = action.payload.total;
      state.totals.totalToday = action.payload.totalToday;
      state.loadingState.isLoading = false;
      state.loadingState.error = undefined;
    }),
      builder.addCase(fetchOrderById.fulfilled, (state, action) => {
        state.searchedOrder = action.payload.orders[0];
        state.loadingState.isLoading = false;
        state.loadingState.error = undefined;
      }),
      builder.addMatcher(
        isAnyOf(fetchOrderById.pending, fetchOrders.pending),
        (state) => {
          state.loadingState.isLoading = true;
          state.loadingState.error = undefined;
        }
      ),
      builder.addMatcher(
        isAnyOf(fetchOrderById.rejected, fetchOrders.rejected),
        (state, action) => {
          state.loadingState.isLoading = false;
          const errorMessage = action.error.message;
          state.loadingState.error = errorMessage
            ? errorMessage
            : 'Something went wrong';
        }
      );
  }
});
export default ordersSlice.reducer;
export const {
  getOrders,
  getSearchedOrder,
  getOrdersTotal,
  getOrdersLoadingState
} = ordersSlice.selectors;
