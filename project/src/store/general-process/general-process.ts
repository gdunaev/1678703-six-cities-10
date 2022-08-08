import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, DEFAULT_CITY, SortingType} from '../../const';
import { GeneralProcess } from '../../types/state';

const initialState: GeneralProcess = {
  city: DEFAULT_CITY,
  sorting: SortingType.Popular,
  selectedOfferId: -1,
  isCommentLoading: false,
  isLoadedFavoritesOffers: false,
};

export const generalProcess = createSlice({
  name: NameSpace.General,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    },
    selectOfferId: (state, action) => {
      state.selectedOfferId = action.payload;
    },
    offersSorting: (state, action) => {
      state.sorting = action.payload;
    },
    setCommentLoadingStatus: (state, action) => {
      state.isCommentLoading = action.payload;
    },
    setFavoritesOffersStatus: (state, action) => {
      // eslint-disable-next-line no-console
      console.log('22', action.payload);
      state.isLoadedFavoritesOffers = action.payload;
    },
  },
});

export const {changeCity, selectOfferId, offersSorting, setCommentLoadingStatus, setFavoritesOffersStatus} = generalProcess.actions;
