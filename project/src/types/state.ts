import {store} from '../store/index';
import {Offers, Offer} from '../types/offer';
import {FetchingCommentType} from '../types/comments';

export type AuthorizationType = {
  status: string;
  email: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcessType = {
  authorizationStatus: AuthorizationType
};

export type DataProcessType = {
  offers: Offers | undefined;
  isDataLoaded: boolean;
  favoritesOffers: Offers | undefined;
  isCommentLoading: boolean;
  detailedOffer: Offer | undefined;
  isErrorLoading: boolean;
  offersNearby: Offers | undefined;
  comments: FetchingCommentType | undefined;
  favoriteOffer: Offer | undefined;
};

export type GeneralProcessType = {
  city: string;
  sorting: string;
  selectedOfferId: number;
  isCommentLoading: boolean;
  isLoadedFavoritesOffers: boolean;
  offers: Offers | undefined;
};
