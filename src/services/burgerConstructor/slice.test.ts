import burgerConstructorReducer, {
  initialState,
  addIngredient,
  changePositionIngredients,
  clearConstructor,
  deleteIngredient
} from './slice';
import { TConstructorIngredient } from '@utils-types';
import store, { rootReducer } from '../store';
const testState = {
  ...initialState,
  bun: {
    id: '643d69a5c3f7b9001cfa093d',
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  ingredients: [
    {
      id: '643d69a5c3f7b9001cfa0944',
      _id: '643d69a5c3f7b9001cfa0944',
      name: 'Соус традиционный галактический',
      type: 'sauce',
      proteins: 42,
      fat: 24,
      carbohydrates: 42,
      calories: 99,
      price: 15,
      image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
    },
    {
      id: '643d69a5c3f7b9001cfa0945',
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    },
    {
      id: '643d69a5c3f7b9001cfa0946',
      _id: '643d69a5c3f7b9001cfa0946',
      name: 'Хрустящие минеральные кольца',
      type: 'main',
      proteins: 808,
      fat: 689,
      carbohydrates: 609,
      calories: 986,
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
      image_mobile:
        'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
      image_large:
        'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
    }
  ]
};
describe('Тест редьюсера конструктора ингредиентов', () => {
  it('Инициализация редьюсера', () => {
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorReducer(undefined, { type: '@@INIT' })
    );
  });
  describe('Добавление ингредиента', () => {
    const addedBun: TConstructorIngredient = {
      id: '643d69a5c3f7b9001cfa093c',
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
    };
    const addedingredient: TConstructorIngredient = {
      id: '643d69a5c3f7b9001cfa0947',
      _id: '643d69a5c3f7b9001cfa0947',
      name: 'Плоды Фалленианского дерева',
      type: 'main',
      proteins: 20,
      fat: 5,
      carbohydrates: 55,
      calories: 77,
      price: 874,
      image: 'https://code.s3.yandex.net/react/code/sp_1.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
    };
    it('Добавление булки', () => {
      const expectedState = { ...testState, bun: addedBun };
      const newState = burgerConstructorReducer(
        testState,
        addIngredient(addedBun)
      );
      expect(newState).toEqual(expectedState);
    });
    it('Добавление ингредиента', () => {
      const expectedState = {
        ...testState,
        ingredients: [...testState.ingredients, addedingredient]
      };
      const newState = burgerConstructorReducer(
        testState,
        addIngredient(addedingredient)
      );
      expect(newState).toEqual(expectedState);
    });
  });
  it('Изменение порядка ингредиентов', () => {
    const { ingredients: initIngredients } = testState;
    const expectedState = {
      ...testState,
      ingredients: [initIngredients[0], initIngredients[2], initIngredients[1]]
    };
    const newState = burgerConstructorReducer(
      testState,
      changePositionIngredients({ id: initIngredients[1].id, step: 1 })
    );
    expect(newState).toEqual(expectedState);
  });
  it('Удаление ингредиента', () => {
    const { id } = testState.ingredients[0];
    const expectedState = {
      ...testState,
      ingredients: [...testState.ingredients.filter((el) => el.id !== id)]
    };
    const newState = burgerConstructorReducer(
      testState,
      deleteIngredient({ id })
    );
    expect(newState).toEqual(expectedState);
  });
  it('Очистка конструктора', () => {
    const newState = burgerConstructorReducer(testState, clearConstructor());
    expect(newState).toEqual(initialState);
  });
});
