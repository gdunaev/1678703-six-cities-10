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
import { FavoriteStatusType } from '../types/favorite';
// import {test} from '../store/data-process/data-process';


export const addCommentAction = createAsyncThunk<FetchingCommentType, SendingCommentType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comment/addComment',
  async ({id, formData:{comment, rating}, resetFormData}, {extra: api}) => {
    const {data} = await api.post<CommentsType>(APIRoute.CommentsOffer.replace('id', id), {comment, rating});
    const comments = {
      id,
      data
    };
    resetFormData();
    return comments;
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
  },
);

export const fetchDetailedOfferAction = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchDetailedOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer>(APIRoute.DetailOffer.replace('id', id));
    return data;
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

    // eslint-disable-next-line no-console
    console.log('fav', data);
    return data;
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<Offer, FavoriteStatusType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/changeFavoriteStatus',
  async ({id, status, isNeedOffers}, {dispatch, extra: api}) => {
    const {data} = await api.post<Offer>(APIRoute.FavoritesStatus.replace('id', id).replace('status', status));
    if(isNeedOffers){
      dispatch(fetchOffersAction());
    }
    dispatch(fetchFavoritesOffersAction());
    return data;
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
  },
);

export const checkAuthAction = createAsyncThunk<string, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data: {email}} = await api.get(APIRoute.Login);
    return email;
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
  },
);
