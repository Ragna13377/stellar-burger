import ordersReducer, { initialState } from './slice';
import store from '../store';
import { fetchOrderById, fetchOrders } from './actions';
import { TFeedsResponse, TOrderResponse } from '@api';
describe('Тестирование редьюсера заказов', () => {
  const expectedOrdersResponse: TFeedsResponse = {
    orders: [
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
    ],
    total: 37303,
    totalToday: 87,
    success: true
  };
  const expectedOrderByIdResponse: TOrderResponse = {
    success: true,
    orders: [
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
      }
    ]
  };
  it('Инициализация редьюсера', () => {
    expect(store.getState().orders).toEqual(
      ordersReducer(undefined, { type: '@@INIT' })
    );
  });
  describe('Тестирование получения всех заказов', () => {
    it('fetchOrders pending', () => {
      const action = fetchOrders.pending('');
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: true,
          error: undefined
        }
      };
      const newState = ordersReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('fetchOrders fulfilled', () => {
      const action = fetchOrders.fulfilled(expectedOrdersResponse, '');
      const expectedState = {
        ...initialState,
        orders: expectedOrdersResponse.orders,
        totals: {
          total: expectedOrdersResponse.total,
          totalToday: expectedOrdersResponse.totalToday
        },
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          error: undefined
        }
      };
      const newState = ordersReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('fetchOrders rejected', () => {
      const error = Error('Error');
      const action = fetchOrders.rejected(error, '');
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          error: error.message
        }
      };
      const newState = ordersReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });
  describe('Тестирование получения заказа по id', () => {
    const orderId = 37677;
    it('fetchOrderById pending', () => {
      const action = fetchOrderById.pending('', orderId);
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: true,
          error: undefined
        }
      };
      const newState = ordersReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('fetchOrderById fulfilled', () => {
      const action = fetchOrderById.fulfilled(
        expectedOrderByIdResponse,
        '',
        orderId
      );
      const expectedState = {
        ...initialState,
        searchedOrder: expectedOrderByIdResponse.orders[0],
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          error: undefined
        }
      };
      const newState = ordersReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('fetchOrderById rejected', () => {
      const error = Error('Error');
      const action = fetchOrderById.rejected(error, '', orderId);
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          error: error.message
        }
      };
      const newState = ordersReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });
});
