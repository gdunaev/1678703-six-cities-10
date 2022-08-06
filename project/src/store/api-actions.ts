import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offers, Offer} from '../types/offer';
import {loadOffers, setDataLoadedStatus, redirectToRoute, loadOffer, errorLoading, loadOffersNearby, loadComments, setCommentLoadingStatus} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import { CommentsType, SendingCommentType } from '../types/comments';


export const addCommentAction = createAsyncThunk<void, SendingCommentType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comment/setComment',
  async ({id, formData:{comment, rating}, resetFormData}, {dispatch, extra: api}) => {
    const {data} = await api.post<CommentsType>(APIRoute.CommentsOffer.replace('id', id), {comment, rating});
    const comments = {
      id,
      data
    };
    dispatch(loadComments(comments));
    dispatch(setCommentLoadingStatus(false));
    resetFormData();
  },
);

export const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comment/fetchComments',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<CommentsType>(APIRoute.CommentsOffer.replace('id', id));

    const comments = {
      id,
      data
    };
    dispatch(loadComments(comments));
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffersNearby',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.OffersNearby.replace('id', id));
    dispatch(loadOffersNearby(data));
  },
);

export const fetchDetailedOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchDetailedOffer',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer>(APIRoute.DetailOffer.replace('id', id));
      dispatch(loadOffer(data));
    } catch {
      dispatch(errorLoading(true));
    }
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Hotels);
    dispatch(setDataLoadedStatus(false));
    dispatch(loadOffers(data));
    dispatch(setDataLoadedStatus(true));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      // const {data: {email}} =
      await api.get(APIRoute.Login);
      // dispatch(requireAuthorization({status: AuthorizationStatus.Auth, email: email}));
    } catch {
      // dispatch(requireAuthorization({status: AuthorizationStatus.NoAuth, email: ''}));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    // dispatch(requireAuthorization({status: AuthorizationStatus.Auth, email: email}));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    // dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
