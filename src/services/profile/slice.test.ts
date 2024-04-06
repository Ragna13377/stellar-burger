import profileReducer, { initialState } from './slice';
import store from '../store';
import {
  fetchUser,
  loginUser,
  logOutUser,
  registerUser,
  updateUser
} from './actions';
import { TUser } from '@utils-types';
import { TLoginData, TRegisterData } from '@api';
describe('Тестирование редьюсера профиля', () => {
  it('Инициализация редьюсера', () => {
    expect(store.getState().profile).toEqual(
      profileReducer(undefined, { type: '@@INIT' })
    );
  });
  const expectedUserResponse: TUser = {
    email: 'a@a.ru',
    name: 'aa'
  };
  const fullUserData: TRegisterData = {
    email: 'a@a.ru',
    name: 'aa',
    password: '123456'
  };
  describe('Тестирование запроса пользователя', () => {
    it('fetchUser pending', () => {
      const action = fetchUser.pending('');
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: true,
          isRequestOver: false,
          error: undefined
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('fetchUser fulfilled', () => {
      const action = fetchUser.fulfilled(expectedUserResponse, '');
      const expectedState = {
        ...initialState,
        user: expectedUserResponse,
        loadingState: {
          ...initialState.loadingState,
          isAuthenticated: true,
          isLoading: false,
          isRequestOver: true,
          error: undefined
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('fetchUser rejected', () => {
      const error = Error('Error');
      const action = fetchUser.rejected(error, '');
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          isRequestOver: true,
          error: error.message
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });
  describe('Тестирование авторизации', () => {
    const loginUserData: TLoginData = {
      email: 'a@a.ru',
      password: '123456'
    };
    it('loginUser pending', () => {
      const action = loginUser.pending('', loginUserData);
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: true,
          isRequestOver: false,
          error: undefined
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('loginUser fulfilled', () => {
      const action = loginUser.fulfilled(
        expectedUserResponse,
        '',
        loginUserData
      );
      const expectedState = {
        ...initialState,
        user: expectedUserResponse,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          isRequestOver: true,
          error: undefined
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('loginUser rejected', () => {
      const error = Error('Error');
      const action = loginUser.rejected(error, '', loginUserData);
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          isRequestOver: true,
          error: error.message
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });
  describe('Тестирование регистрации', () => {
    it('registerUser pending', () => {
      const action = registerUser.pending('', fullUserData);
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: true,
          isRequestOver: false,
          error: undefined
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('registerUser fulfilled', () => {
      const action = registerUser.fulfilled(
        expectedUserResponse,
        '',
        fullUserData
      );
      const expectedState = {
        ...initialState,
        user: expectedUserResponse,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          isRequestOver: true,
          error: undefined
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('registerUser rejected', () => {
      const error = Error('Error');
      const action = registerUser.rejected(error, '', fullUserData);
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          isRequestOver: true,
          error: error.message
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });
  describe('Тестирование обновления данных пользователя', () => {
    it('updateUser pending', () => {
      const action = updateUser.pending('', fullUserData);
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: true,
          isRequestOver: false,
          error: undefined
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('updateUser fulfilled', () => {
      const action = registerUser.fulfilled(
        expectedUserResponse,
        '',
        fullUserData
      );
      const expectedState = {
        ...initialState,
        user: expectedUserResponse,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          isRequestOver: true,
          error: undefined
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('updateUser rejected', () => {
      const error = Error('Error');
      const action = updateUser.rejected(error, '', fullUserData);
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          isRequestOver: true,
          error: error.message
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });
  describe('Тестирование логаута', () => {
    it('logOutUser pending', () => {
      const action = logOutUser.pending('');
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: true,
          isRequestOver: false,
          error: undefined
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('logOutUser fulfilled', () => {
      const action = logOutUser.fulfilled(null,'');
      const expectedState = {
        ...initialState,
        user: null,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          isRequestOver: true,
          error: undefined
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    it('logOutUser rejected', () => {
      const error = Error('Error');
      const action = logOutUser.rejected(error, '');
      const expectedState = {
        ...initialState,
        loadingState: {
          ...initialState.loadingState,
          isLoading: false,
          isRequestOver: true,
          error: error.message
        }
      };
      const newState = profileReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });
});
