import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  loadOffers,
  offersSorting,
  requireAuthorization,
  selectOfferId,
  loadFavoritesOffers,
  setDataLoadedStatus,
  loadOffer,
} from './action';
import { DEFAULT_CITY, SortingType, AuthorizationStatus } from '../const';
import { Offers, Offer} from '../types/offer';

type authorizationStatus = {
  status: string;
  email: string;
};
type InitalState = {
  offers: Offers | undefined;
  city: string;
  sorting: string;
  authorizationStatus: authorizationStatus;
  selectedOfferId: number;
  favoritesOffers: Offers | undefined;
  isDataLoaded: boolean;
  detailedOffer: Offer | undefined;
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
  detailedOffer: undefined,
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

      // eslint-disable-next-line no-console
      // console.log('11', action.payload);
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
    .addCase(loadOffer, (state, action) => {
      state.detailedOffer = action.payload;
    })
    .addCase(offersSorting, (state, action) => {
      state.sorting = action.payload;
    });
});
