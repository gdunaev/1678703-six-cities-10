import {createReducer} from '@reduxjs/toolkit';
import {changeCity, loadOffers, offersSorting, requireAuthorization, selectOfferId, loadFavoritesOffers, setError, setDataLoadedStatus} from './action';
import { DEFAULT_CITY, SortingType, AuthorizationStatus} from '../const';
import {Offers} from '../types/offer';

type authorizationStatus = {
  status: string;
  email: string;
}
type InitalState = {
  offers: Offers | undefined;
  city: string;
  sorting: string;
  authorizationStatus: authorizationStatus;
  selectedOfferId: number;
  favoritesOffers: Offers | undefined;
  error: string;
  isDataLoaded: boolean;
}

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
  error: '',
  isDataLoaded: false,
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(offersSorting, (state, action) => {
      state.sorting = action.payload;
    });
});
