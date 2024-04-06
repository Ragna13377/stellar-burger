import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchOwnOrders, makeOrder } from './actions';
import { TLoadingState, TOrder } from '@utils-types';

type TOwnOrders = TLoadingState & {
  lastOrder: TOrder | null;
  allOrders: TOrder[] | null;
  name: string;
};
export const initialState: TOwnOrders = {
  lastOrder: null,
  allOrders: null,
  name: '',
  loadingState: {
    isLoading: false,
    error: undefined
  }
};
const ownOrderSlice = createSlice({
  name: 'ownOrders',
  initialState,
  reducers: {
    clearOwnOrder: (state) => {
      state.lastOrder = null;
      state.name = '';
    }
  },
  selectors: {
    getOwnOrdersLoadingState: (state) => state.loadingState,
    getOwnOrder: (state) => state.lastOrder,
    getAllOwnOrders: (state) => state.allOrders
  },
  extraReducers: (builder) => {
    builder.addCase(makeOrder.fulfilled, (state, action) => {
      state.loadingState.isLoading = false;
      state.loadingState.error = undefined;
      state.lastOrder = action.payload.order;
      state.name = action.payload.name;
    }),
      builder.addCase(fetchOwnOrders.fulfilled, (state, action) => {
        state.loadingState.isLoading = false;
        state.loadingState.error = undefined;
        state.allOrders = action.payload;
      });
    builder.addMatcher(
      isAnyOf(makeOrder.pending, fetchOwnOrders.pending),
      (state) => {
        state.loadingState.isLoading = true;
        state.loadingState.error = undefined;
      }
    ),
      builder.addMatcher(
        isAnyOf(makeOrder.rejected, fetchOwnOrders.rejected),
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
export default ownOrderSlice.reducer;
export const { clearOwnOrder } = ownOrderSlice.actions;
export const { getOwnOrdersLoadingState, getOwnOrder, getAllOwnOrders } =
  ownOrderSlice.selectors;
