import ownOrdersReducer, { initialState } from './slice';
import store from '../store';
import { TNewOrderResponse } from '@api';
import { fetchOwnOrders, makeOrder } from './actions';
import { TOrder } from '@utils-types';
describe('Тестирование редьюсера собственных заказов', () => {
  const createdOrder: string[] = [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093e'
  ];
  const expectedMakeOrderResponse: TNewOrderResponse = {
    name: 'Флюоресцентный люминесцентный бургер',
    order: {
      _id: '66110c5997ede0001d064808',
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-04-06T08:48:25.992Z',
      updatedAt: '2024-04-06T08:48:26.616Z',
      number: 37742,
      ingredients: createdOrder
    },
    success: true
  };
  const expectedOwnOrdersResponse: TOrder[] = [
    {
      _id: '660fc0e297ede0001d064612',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский люминесцентный бургер',
      createdAt: '2024-04-05T09:14:10.466Z',
      updatedAt: '2024-04-05T09:14:11.085Z',
      number: 37677
    },
    {
      _id: '660fad8797ede0001d0645e7',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный флюоресцентный люминесцентный бургер',
      createdAt: '2024-04-05T07:51:35.153Z',
      updatedAt: '2024-04-05T07:51:37.263Z',
      number: 37676
    }
  ];
  it('Инициализация редьюсера', () => {
    expect(store.getState().ownOrders).toEqual(
      ownOrdersReducer(undefined, { type: '@@INIT' })
    );
  });
  describe('Тестирование создания заказа', () => {
    it('makeOrder pending', () => {
      const action = makeOrder.pending('', createdOrder);
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: true,
          error: undefined
        }
      };
      const newState = ownOrdersReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('makeOrder fulfilled', () => {
      const action = makeOrder.fulfilled(
        expectedMakeOrderResponse,
        '',
        createdOrder
      );
      const expectedState = {
        ...initialState,
        lastOrder: expectedMakeOrderResponse.order,
        name: expectedMakeOrderResponse.name,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          error: undefined
        }
      };
      const newState = ownOrdersReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('makeOrder rejected', () => {
      const error = Error('Error');
      const action = makeOrder.rejected(error, '', createdOrder);
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          error: error.message
        }
      };
      const newState = ownOrdersReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });
  describe('Тестирование получения собственных заказов', () => {
    it('fetchOwnOrders pending', () => {
      const action = fetchOwnOrders.pending('');
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: true,
          error: undefined
        }
      };
      const newState = ownOrdersReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('fetchOwnOrders fulfilled', () => {
      const action = fetchOwnOrders.fulfilled(expectedOwnOrdersResponse, '');
      const expectedState = {
        ...initialState,
        allOrders: expectedOwnOrdersResponse,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          error: undefined
        }
      };
      const newState = ownOrdersReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('fetchOwnOrders rejected', () => {
      const error = Error('Error');
      const action = fetchOwnOrders.rejected(error, '');
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          error: error.message
        }
      };
      const newState = ownOrdersReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });
});
