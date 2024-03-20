import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchUser,
  loginUser,
  logOutUser,
  registerUser,
  updateUser
} from './actions';
import { TLoadingState, TUser } from '@utils-types';

type TUserLoading = TLoadingState & {
  loadingState: {
    isAuthenticated: boolean;
    isRequestOver: boolean;
  };
};
type TProfile = TUserLoading & {
  user: TUser | null;
};
const initialState: TProfile = {
  user: null,
  loadingState: {
    isLoading: false,
    error: undefined,
    isRequestOver: false,
    isAuthenticated: false
  }
};
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  selectors: {
    getUser: (state) => state.user,
    getUserLoadingState: (state) => state.loadingState,
    getUserError: (state) => state.loadingState.error
  },
  extraReducers: (builder) => {
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.user = null;
    }),
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.loadingState.isAuthenticated = true;
      }),
      builder.addMatcher(
        isAnyOf(
          fetchUser.pending,
          loginUser.pending,
          registerUser.pending,
          updateUser.pending,
          logOutUser.pending
        ),
        (state) => {
          state.loadingState.isLoading = true;
          state.loadingState.isRequestOver = false;
          state.loadingState.error = undefined;
        }
      ),
      builder.addMatcher(
        isAnyOf(
          fetchUser.fulfilled,
          loginUser.fulfilled,
          registerUser.fulfilled,
          updateUser.fulfilled
        ),
        (state, action) => {
          state.user = action.payload;
        }
      );
    builder.addMatcher(
      isAnyOf(
        fetchUser.fulfilled,
        loginUser.fulfilled,
        registerUser.fulfilled,
        updateUser.fulfilled,
        logOutUser.fulfilled
      ),
      (state) => {
        state.loadingState.isLoading = false;
        state.loadingState.isRequestOver = true;
        state.loadingState.error = undefined;
      }
    ),
      builder.addMatcher(
        isAnyOf(
          fetchUser.rejected,
          loginUser.rejected,
          registerUser.rejected,
          updateUser.rejected,
          logOutUser.rejected
        ),
        (state, action) => {
          state.loadingState.isLoading = false;
          state.loadingState.isRequestOver = true;
          const errorMessage = action.error.message;
          state.loadingState.error = errorMessage
            ? errorMessage
            : 'Something went wrong';
        }
      );
  }
});
export const { getUser, getUserLoadingState, getUserError } =
  profileSlice.selectors;
export default profileSlice.reducer;
