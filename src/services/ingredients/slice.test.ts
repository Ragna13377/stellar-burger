import ingredientsReducer, { initialState } from './slice';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from './actions';
import store from '../store';

describe('Тест редьюсера ингредиентов', () => {
  const expectedResult: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    }
  ];
  it('Инициализация редьюсера', () => {
    expect(store.getState().ingredients).toEqual(
      ingredientsReducer(undefined, { type: '@@INIT' })
    );
  });
  it('fetchIngredients pending', () => {
    const action = fetchIngredients.pending('');
    const expectedState = {
      ...initialState,
      loadingState: {
        ...initialState.loadingState,
        isLoading: true,
        error: undefined
      }
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('fetchIngredients fulfilled', () => {
    const action = fetchIngredients.fulfilled(expectedResult, '');
    const expectedState = {
      ...initialState,
      items: expectedResult,
      loadingState: { ...initialState.loadingState, isLoading: false }
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('fetchIngredients rejected', () => {
    const error = Error('Error');
    const action = fetchIngredients.rejected(error, '');
    const expectedState = {
      ...initialState,
      loadingState: {
        ...initialState.loadingState,
        isLoading: false,
        error: error.message
      }
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
