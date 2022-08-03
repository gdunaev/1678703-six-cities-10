import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  loadOffers,
  offersSorting,
  requireAuthorization,
  selectOfferId,
  loadFavoritesOffers,
  setDataLoadedStatus,
  setCommentLoadedStatus,
  loadOffer,
  loadFail,
  loadOtherOffers,
  loadComments,
} from './action';
import { DEFAULT_CITY, SortingType, AuthorizationStatus, LoadingCommentStatus} from '../const';
import { Offers, Offer} from '../types/offer';
import {CommentsType} from '../types/comments';

type authorizationStatus = {
  status: string;
  email: string;
};
type commentsType = {
  id: string;
  data: CommentsType;
};
type InitalState = {
  offers: Offers | undefined;
  city: string;
  sorting: string;
  authorizationStatus: authorizationStatus;
  selectedOfferId: number;
  favoritesOffers: Offers | undefined;
  isDataLoaded: boolean;
  loadingCommentStatus: string;
  detailedOffer: Offer | undefined;
  isLoadFail: boolean;
  otherOffers: Offers | undefined;
  comments: commentsType | undefined;
};

const initialState: InitalState = {
  offers: undefined,
  city: DEFAULT_CITY,
  sorting: SortingType.Popular,
  authorizationStatus: {
    status: AuthorizationStatus.Unknown,
    email: '',
  },
  selectedOfferId: -1,
  favoritesOffers: undefined,
  isDataLoaded: false,
  loadingCommentStatus: LoadingCommentStatus.Start,
  detailedOffer: undefined,
  isLoadFail: false,
  otherOffers: undefined,
  comments: undefined,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(selectOfferId, (state, action) => {
      state.selectedOfferId = action.payload;
    })
    .addCase(loadFavoritesOffers, (state, action) => {
      state.favoritesOffers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setCommentLoadedStatus, (state, action) => {
      state.loadingCommentStatus = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.detailedOffer = action.payload;
    })
    .addCase(loadFail, (state, action) => {
      state.isLoadFail = action.payload;
    })
    .addCase(loadOtherOffers, (state, action) => {
      state.otherOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(offersSorting, (state, action) => {
      state.sorting = action.payload;
    });
});
