import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offers, Offer} from '../types/offer';
import {redirectToRoute} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import { CommentsType, SendingCommentType, FetchingCommentType } from '../types/comments';


export const addCommentAction = createAsyncThunk<FetchingCommentType, SendingCommentType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comment/setComment',
  async ({id, formData:{comment, rating}, resetFormData}, {extra: api}) => {
    const {data} = await api.post<CommentsType>(APIRoute.CommentsOffer.replace('id', id), {comment, rating});
    const comments = {
      id,
      data
    };
    resetFormData();
    return comments;
    // dispatch(loadComments(comments));
    // dispatch(setCommentLoadingStatus(false));
  },
);

export const fetchCommentsAction = createAsyncThunk<FetchingCommentType, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comment/fetchComments',
  async (id, {extra: api}) => {
    const {data} = await api.get<CommentsType>(APIRoute.CommentsOffer.replace('id', id));

    const comments = {
      id,
      data
    };
    // dispatch(loadComments(comments));
    return comments;
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<Offers, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffersNearby',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.OffersNearby.replace('id', id));
    return data;
    // dispatch(loadOffersNearby(data));
  },
);

export const fetchDetailedOfferAction = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchDetailedOffer',
  async (id, {extra: api}) => {
    // try {
    const {data} = await api.get<Offer>(APIRoute.DetailOffer.replace('id', id));
    return data;
    //   dispatch(loadOffer(data));
    // } catch {
    //   dispatch(errorLoading(true));
    // }
  },
);

export const fetchFavoritesOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoritesOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Favorites);
    return data;
    // dispatch(setDataLoadedStatus(false));
    // dispatch(loadOffers(data));
    // dispatch(setDataLoadedStatus(true));
  },
);

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Hotels);
    return data;
    // dispatch(setDataLoadedStatus(false));
    // dispatch(loadOffers(data));
    // dispatch(setDataLoadedStatus(true));
  },
);

export const checkAuthAction = createAsyncThunk<string, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    // try {
    const {data: {email}} = await api.get(APIRoute.Login);
    return email;
    // dispatch(requireAuthorization({status: AuthorizationStatus.Auth, email: email}));
    // } catch {
    // dispatch(requireAuthorization({status: AuthorizationStatus.NoAuth, email: ''}));
    // }
  },
);

export const loginAction = createAsyncThunk<string, AuthData, {
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
    return email;
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
