import {name} from 'faker';
import {GeneralProcessType} from '../types/state';

export const makeFakeInitialState = (): GeneralProcessType => ({
  city: name.title(),
  sorting: name.title(),
  selectedOfferId: -1,
  isCommentLoading: false,
});
