import {generalProcess} from './general-process';
import {changeCity, selectOfferId, offersSorting, setCommentLoadingStatus} from './general-process';
import { GeneralProcessType } from '../../types/state';
import {makeFakeInitialState} from '../../utils/mocks';
import {DEFAULT_CITY, SortingType} from '../../const';


describe('Reducer: generalProcess', () => {

  let state: GeneralProcessType;

  const initialState: GeneralProcessType = {
    city: DEFAULT_CITY,
    sorting: SortingType.Popular,
    selectedOfferId: -1,
    isCommentLoading: false,
  };

  beforeEach(() => {
    state = makeFakeInitialState();
  });

  it('without additional parameters should return initial state', () => {
    expect(generalProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });
  it('should update the name of the city by change the city', () => {
    state.city = 'some city';
    expect(generalProcess.reducer(state, changeCity(state.city)))
      .toEqual(state);
  });

  it('should update id selected offer by select offer', () => {
    state.selectedOfferId = 999;
    expect(generalProcess.reducer(state, selectOfferId(state.selectedOfferId)))
      .toEqual(state);
  });

  it('should update sorting name by change type sorting', () => {
    state.sorting = 'some sorting';
    expect(generalProcess.reducer(state, offersSorting(state.sorting)))
      .toEqual(state);
  });

  it('should update comment loading status by load comment', () => {
    state.isCommentLoading = true;
    expect(generalProcess.reducer(state, setCommentLoadingStatus(state.isCommentLoading)))
      .toEqual(state);
  });
});
