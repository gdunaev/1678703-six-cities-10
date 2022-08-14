import {generalProcess} from './general-process';
import {changeCity, selectOfferId, offersSorting, setCommentLoadingStatus} from './general-process';
import { GeneralProcessType } from '../../types/state';
import {makeFakeInitialState} from '../../utils/mocks';

describe('Reducer: generalProcess', () => {

  let state: GeneralProcessType;

  beforeEach(() => {
    state = makeFakeInitialState();
  });

  it('without additional parameters should return initial state', () => {
    expect(generalProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(makeFakeInitialState);
  });
  it('should update the name of the city by change the city', () => {
    expect(generalProcess.reducer(state, changeCity(makeFakeInitialState().city)))
      .toEqual(makeFakeInitialState());
  });

  it('should update id selected offer by select offer', () => {
    expect(generalProcess.reducer(state, selectOfferId(makeFakeInitialState().selectedOfferId)))
      .toEqual(makeFakeInitialState());
  });

  it('should update sorting name by change type sorting', () => {
    expect(generalProcess.reducer(state, offersSorting(makeFakeInitialState().sorting)))
      .toEqual(makeFakeInitialState());
  });

  it('should update comment loading status by load comment', () => {
    expect(generalProcess.reducer(state, setCommentLoadingStatus(makeFakeInitialState().isCommentLoading)))
      .toEqual(makeFakeInitialState());
  });
});
