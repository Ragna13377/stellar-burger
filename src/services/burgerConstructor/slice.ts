import { TConstructorIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';

export type TBurgerConstructor = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};
export const initialState: TBurgerConstructor = {
  bun: null,
  ingredients: []
};
const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action) {
      if (action.payload.type === 'bun') state.bun = action.payload;
      else state.ingredients.push(action.payload);
    },
    deleteIngredient(state, action) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    clearConstructor(state) {
      state.ingredients = [];
      state.bun = null;
    },
    changePositionIngredients(state, action) {
      const { id, step } = action.payload;
      const index = state.ingredients.findIndex((item) => item.id === id);
      const newIndex = index + step;
      [state.ingredients[index], state.ingredients[newIndex]] = [
        state.ingredients[newIndex],
        state.ingredients[index]
      ];
    }
  },
  selectors: {
    getConstructorBurger: (state) => state
  }
});

export default burgerConstructorSlice.reducer;
export const {
  addIngredient,
  deleteIngredient,
  clearConstructor,
  changePositionIngredients
} = burgerConstructorSlice.actions;
export const { getConstructorBurger } = burgerConstructorSlice.selectors;
