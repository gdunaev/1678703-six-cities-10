import {dataProcess} from './data-process';
import {updateOffers, updateFavoritesOffers, updateDetailedOffer, updateOffersNearby} from './data-process';
import { DataProcessType } from '../../types/state';
import {makeFakeInitialStateDataProcess, fakeOffers, fakeOffer} from '../../utils/mocks';


describe('Reducer: dataProcess', () => {

  let state: DataProcessType;

  const initialState: DataProcessType = {
    offers: undefined,
    favoritesOffers: undefined,
    isDataLoaded: true,
    isCommentLoading: false,
    detailedOffer: undefined,
    isErrorLoading: false,
    offersNearby: undefined,
    comments: undefined,
    favoriteOffer: undefined,
    isFavoritesOffersLoaded: true,
  };

  beforeEach(() => {
    state = makeFakeInitialStateDataProcess();
  });

  it('without additional parameters should return initial state', () => {
    expect(dataProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });
  it('should update offers by change status favorite', () => {
    state.offers = fakeOffers();
    expect(dataProcess.reducer(state, updateOffers(state.offers)))
      .toEqual(state);
  });
  it('should update favorites offers by change status favorite', () => {
    state.favoritesOffers = fakeOffers();
    expect(dataProcess.reducer(state, updateFavoritesOffers(state.favoritesOffers)))
      .toEqual(state);
  });
  it('should update detailed offer by change status favorite', () => {
    state.detailedOffer = fakeOffer;
    expect(dataProcess.reducer(state, updateDetailedOffer(state.detailedOffer)))
      .toEqual(state);
  });
  it('should update offers nearby by change status favorite', () => {
    state.offersNearby = fakeOffers();
    expect(dataProcess.reducer(state, updateOffersNearby(state.offersNearby)))
      .toEqual(state);
  });

});
