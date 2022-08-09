import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offers, Offer} from '../../types/offer';
import {FetchingCommentType} from '../../types/comments';
import { createSelector } from '@reduxjs/toolkit';
import {getCity} from '../general-process/selectors';

export const getOffers = (state: State): Offers | undefined => state[NameSpace.Data].offers;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getFavoritesOffers = (state: State): Offers | undefined => state[NameSpace.Data].favoritesOffers;

export const getCommentLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCommentLoading;
export const getComments = (state: State): FetchingCommentType | undefined => state[NameSpace.Data].comments;

export const getErrorLoadingStatus = (state: State): boolean => state[NameSpace.Data].isErrorLoading;
export const getDetailedOffer = (state: State): Offer | undefined => state[NameSpace.Data].detailedOffer;
export const getOffersNearby = (state: State): Offers | undefined => state[NameSpace.Data].offersNearby;

export const getFavoriteOffer = (state: State): Offer | undefined => state[NameSpace.Data].favoriteOffer;

export const filterOffers = createSelector(
  [getOffers, getCity],
  (offers, cityName) => {
    if(offers) {
      return offers.filter((offer) => offer.city.name === cityName);
    }
    return [];
  }
);
