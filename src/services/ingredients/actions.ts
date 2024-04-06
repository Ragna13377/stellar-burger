import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/getData',
  async () => await getIngredientsApi()
);
