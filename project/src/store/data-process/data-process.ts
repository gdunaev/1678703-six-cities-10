import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {changeFavoriteStatusAction, fetchOffersAction, fetchFavoritesOffersAction, fetchOffersNearbyAction, fetchCommentsAction, fetchDetailedOfferAction, addCommentAction} from '../api-actions';
import { DataProcessType } from '../../types/state';


const initialState: DataProcessType = {
  offers: undefined,
  favoritesOffers: undefined,
  isDataLoaded: true,
  isCommentLoading: false,
  detailedOffer: undefined,
  isErrorLoading: false,
  offersNearby: undefined,
  comments: undefined,
  favoriteOffer: undefined,
  isFavoritesOffersLoaded: true,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    updateOffers: (state, action) => {
      state.offers = action.payload;
    },
    updateFavoritesOffers: (state, action) => {
      state.favoritesOffers = action.payload;
    },
    updateDetailedOffer: (state, action) => {
      state.detailedOffer = action.payload;
    },
    updateOffersNearby: (state, action) => {
      state.offersNearby = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        state.favoriteOffer = action.payload;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(fetchOffersAction.rejected, (state, ) => {
        state.offers = undefined;
        state.isDataLoaded = true;
      })
      .addCase(fetchFavoritesOffersAction.pending, (state, action) => {
        state.isFavoritesOffersLoaded = false;
      })
      .addCase(fetchFavoritesOffersAction.fulfilled, (state, action) => {
        state.favoritesOffers = action.payload;
        state.isFavoritesOffersLoaded = true;
      })
      .addCase(fetchFavoritesOffersAction.rejected, (state, ) => {
        state.isFavoritesOffersLoaded = true;
        state.favoritesOffers = undefined;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchDetailedOfferAction.pending, (state,) => {
        state.isErrorLoading = false;
      })
      .addCase(fetchDetailedOfferAction.fulfilled, (state, action) => {
        state.detailedOffer = action.payload;
      })
      .addCase(fetchDetailedOfferAction.rejected, (state) => {
        state.isErrorLoading = true;
        state.detailedOffer = undefined;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentLoading = false;
      });
  }
});

export const {updateOffers, updateFavoritesOffers, updateDetailedOffer, updateOffersNearby, } = dataProcess.actions;
