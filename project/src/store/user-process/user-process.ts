import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserProcess} from '../../types/state';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';

const initialState: UserProcess = {
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
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus.status = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus.status = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus.status = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus.status = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {

        // eslint-disable-next-line no-console
        console.log('11', action);
        state.authorizationStatus.status = AuthorizationStatus.NoAuth;
      });
  }
});
