import {store} from '../store/index';
import {Offers, Offer} from '../types/offer';
import {FetchingCommentType} from '../types/comments';

export type AuthorizationType = {
  status: string;
  email: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationType
};

export type DataProcess = {
  offers: Offers | undefined;
  isDataLoaded: boolean;
  favoritesOffers: Offers | undefined;
  isCommentLoading: boolean;
  detailedOffer: Offer | undefined;
  isErrorLoading: boolean;
  offersNearby: Offers | undefined;
  comments: FetchingCommentType | undefined;
};

export type GeneralProcess = {
  city: string;
  sorting: string;
  selectedOfferId: number;
  isCommentLoading: boolean;
  isLoadedFavoritesOffers: boolean;
};
