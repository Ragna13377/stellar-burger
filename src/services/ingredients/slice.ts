import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from './actions';
import { TIngredient, TLoadingState } from '@utils-types';

type TIngredients = TLoadingState & {
  items: TIngredient[] | null;
};
const initialState: TIngredients = {
  items: null,
  loadingState: {
    isLoading: false,
    error: undefined
  }
};
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.items,
    getIngredientsLoadingState: (state) => state.loadingState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loadingState.isLoading = true;
      state.loadingState.error = undefined;
    }),
      builder.addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loadingState.isLoading = false;
        state.items = action.payload;
      }),
      builder.addCase(fetchIngredients.rejected, (state, action) => {
        state.loadingState.isLoading = false;
        const errorMessage = action.error.message;
        state.loadingState.error = errorMessage
          ? errorMessage
          : 'Something went wrong';
      });
  }
});

export default ingredientsSlice.reducer;
export const { getIngredients, getIngredientsLoadingState } =
  ingredientsSlice.selectors;
