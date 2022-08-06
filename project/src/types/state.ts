import {store} from '../store/index';

type authorizationStatus = {
  status: string;
  email: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: authorizationStatus
};

