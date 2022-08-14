import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, DEFAULT_CITY, SortingType} from '../../const';
import { GeneralProcessType } from '../../types/state';

const initialState: GeneralProcessType = {
  city: DEFAULT_CITY,
  sorting: SortingType.Popular,
  selectedOfferId: -1,
  isCommentLoading: false,
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
  },
});

export const {changeCity, selectOfferId, offersSorting, setCommentLoadingStatus} = generalProcess.actions;
