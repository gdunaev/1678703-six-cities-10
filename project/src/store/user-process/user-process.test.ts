import {UserProcessType} from '../../types/state';
import {userProcess} from './user-process';
import {AuthorizationStatus} from '../../const';
import {checkAuthAction, } from '../api-actions';//loginAction, logoutAction

describe('Reducer: user', () => {
  let state: UserProcessType;

  beforeEach(() => {
    state = {
      authorizationStatus: {
        status: AuthorizationStatus.Unknown,
        email: ''
      }
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: {status: AuthorizationStatus.Unknown, email: ''}});
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: 'test email' }))
        .toEqual({authorizationStatus: {status: AuthorizationStatus.Auth, email: 'test email'}});
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type, payload: ''}))
        .toEqual({authorizationStatus: {status: AuthorizationStatus.NoAuth, email: ''}});
    });
  });

  // describe('loginAction test', () => {
  //   it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
  //     expect(userProcess.reducer(state, { type: loginAction.fulfilled.type }))
  //       .toEqual({authorizationStatus: AuthorizationStatus.Auth});
  //   });
  //   it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
  //     expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
  //       .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  //   });
  // });

  // describe('logoutAction test', () => {
  //   it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
  //     expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
  //       .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  //   });
  // });
});
