import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, DEFAULT_CITY, SortingType} from '../../const';
import { GeneralProcess } from '../../types/state';

const initialState: GeneralProcess = {
  city: DEFAULT_CITY,
  sorting: SortingType.Popular,
  selectedOfferId: -1,
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
  },
});

export const {changeCity, selectOfferId, offersSorting} = generalProcess.actions;
