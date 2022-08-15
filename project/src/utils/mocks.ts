import {name, datatype} from 'faker';
import {GeneralProcessType} from '../types/state';

export const makeFakeInitialState = (): GeneralProcessType => ({
  city: name.title(),
  sorting: name.title(),
  selectedOfferId: datatype.number(),
  isCommentLoading: false,
});
