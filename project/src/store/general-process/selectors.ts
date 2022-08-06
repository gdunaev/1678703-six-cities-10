import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getCity = (state: State): string => state[NameSpace.General].city;
export const getSelectedOfferId = (state: State): number => state[NameSpace.General].selectedOfferId;
export const getSorting = (state: State): string => state[NameSpace.General].sorting;
