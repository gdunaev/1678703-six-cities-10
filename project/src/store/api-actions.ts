import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offers, Offer} from '../types/offer';
import {loadOffers, requireAuthorization, setDataLoadedStatus, redirectToRoute, loadOffer, loadFail, loadOtherOffers, loadComments, setCommentLoadedStatus} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute, LoadingCommentStatus} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import { CommentsType, SendingCommentType } from '../types/comments';


export const setCommentAction = createAsyncThunk<void, SendingCommentType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comment/setComment',
  async ({id, formData:{comment, rating}}, {dispatch, extra: api}) => {
    await api.post<CommentsType>(APIRoute.CommentsOffer.replace('id', id), {comment, rating});
    dispatch(fetchCommentsAction(id));
    dispatch(setCommentLoadedStatus(LoadingCommentStatus.Finish));
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

export const fetchOtherOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOtherOffers',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.OtherOffers.replace('id', id));
    dispatch(loadOtherOffers(data));
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
      dispatch(loadFail(true));
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
      const {data: {email}} = await api.get(APIRoute.Login);
      dispatch(requireAuthorization({status: AuthorizationStatus.Auth, email: email}));
    } catch {
      dispatch(requireAuthorization({status: AuthorizationStatus.NoAuth, email: ''}));
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
    dispatch(requireAuthorization({status: AuthorizationStatus.Auth, email: email}));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
