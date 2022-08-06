import {createAction} from '@reduxjs/toolkit';
import { ActionType } from '../const';


export const changeCity = createAction(ActionType.CHANGE_CITY, (value) => ({
  payload: value,
}));

// export const loadOffers = createAction(ActionType.LOAD_OFFERS, (value) => ({
//   payload: value,
// }));

export const offersSorting = createAction(ActionType.OFFERS_SORTING, (value) => ({
  payload: value,
}));

// export const requireAuthorization = createAction(ActionType.REQUIRE_AUTHORIZATION, (value) => ({
//   payload: value,
// }));

export const selectOfferId = createAction(ActionType.SELECT_OFFER_ID, (value) => ({
  payload: value,
}));

// export const loadFavoritesOffers = createAction(ActionType.LOAD_FAVORITES_OFFERS, (value) => ({
//   payload: value,
// }));

// export const setDataLoadedStatus = createAction(ActionType.SET_DATA_LOADED_STATUS, (value) => ({
//   payload: value,
// }));

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (value) => ({
  payload: value,
}));

// export const loadOffer = createAction(ActionType.LOAD_OFFER, (value) => ({
//   payload: value,
// }));

// export const errorLoading = createAction(ActionType.ERROR_LOADING, (value) => ({
//   payload: value,
// }));

// export const loadOffersNearby = createAction(ActionType.LOAD_OFFERS_NEARBY, (value) => ({
//   payload: value,
// }));

// export const loadComments = createAction(ActionType.LOAD_COMMENTS, (value) => ({
//   payload: value,
// }));

// export const setCommentLoadingStatus = createAction(ActionType.SET_COMMENT_LOADING_STATUS, (value) => ({
//   payload: value,
// }));
