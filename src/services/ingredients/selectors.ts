import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const getIngredientsByType = (type: string) =>
  createSelector(
    (state: RootState) => state.ingredients.items,
    (items) => (items ? items.filter((item) => item.type === type) : [])
  );

export const getIngredientsById = (_id: string) =>
  createSelector(
    (state: RootState) => state.ingredients.items,
    (items) => (items ? items.find((item) => item._id === _id) : null)
  );
