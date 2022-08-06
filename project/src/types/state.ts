import {store} from '../store/index';
import {Offers, Offer} from '../types/offer';
import {FetchingCommentType} from '../types/comments';

type authorizationStatus = {
  status: string;
  email: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: authorizationStatus
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

export type GameProcess = {
  mistakes: number,
  step: number,
};
