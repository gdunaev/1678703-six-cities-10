import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserProcessType} from '../../types/state';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';

const initialState: UserProcessType = {
  authorizationStatus: {
    status: AuthorizationStatus.Unknown,
    email: '',
  },
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus.status = AuthorizationStatus.Auth;
        state.authorizationStatus.email = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus.status = AuthorizationStatus.NoAuth;
        state.authorizationStatus.email = '';
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus.status = AuthorizationStatus.Auth;
        state.authorizationStatus.email = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus.status = AuthorizationStatus.NoAuth;
        state.authorizationStatus.email = '';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus.status = AuthorizationStatus.NoAuth;
      });
  }
});
