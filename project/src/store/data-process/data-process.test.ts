import {dataProcess} from './data-process';
import {updateOffers, updateFavoritesOffers, updateDetailedOffer, updateOffersNearby, } from './data-process';
import { DataProcessType } from '../../types/state';
import {makeFakeInitialStateDataProcess, fakeOffers, fakeOffer, fakeComments} from '../../utils/mocks';
import {fetchOffersAction, fetchFavoritesOffersAction, changeFavoriteStatusAction, fetchOffersNearbyAction, fetchDetailedOfferAction, fetchCommentsAction} from '../api-actions';


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

  describe('Reducer', () => {
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

  describe('ExtraReducer', () => {

    describe('fetchOffersAction test', () => {
      it('should update offers if fetchOffersAction fulfilled', () => {
        state.offers = fakeOffers();
        state.isDataLoaded = true;
        expect(dataProcess.reducer(state, { type: fetchOffersAction.fulfilled.type, payload: state.offers }))
          .toEqual(state);
      });
      it('should update offers if fetchOffersAction rejected', () => {
        state.isDataLoaded = true;
        state.offers = undefined;
        expect(dataProcess.reducer(state, { type: fetchOffersAction.rejected.type, payload: state.offers}))
          .toEqual(state);
      });
    });

    describe('fetchFavoritesOffersAction test', () => {
      it('should update favorites offers if fetchFavoritesOffersAction fulfilled', () => {
        state.favoritesOffers = fakeOffers();
        state.isFavoritesOffersLoaded = true;
        expect(dataProcess.reducer(state, { type: fetchFavoritesOffersAction.fulfilled.type, payload: state.favoritesOffers }))
          .toEqual(state);
      });
      it('should update favorites offers if fetchFavoritesOffersAction rejected', () => {
        state.isFavoritesOffersLoaded = true;
        state.favoritesOffers = undefined;
        expect(dataProcess.reducer(state, { type: fetchFavoritesOffersAction.rejected.type, payload: state.favoritesOffers}))
          .toEqual(state);
      });
    });

    describe('changeFavoriteStatusAction test', () => {
      it('should update offers if changeFavoriteStatusAction fulfilled', () => {
        state.favoriteOffer = fakeOffer;
        expect(dataProcess.reducer(state, { type: changeFavoriteStatusAction.fulfilled.type, payload: state.favoriteOffer }))
          .toEqual(state);
      });
    });

    describe('fetchOffersNearbyAction test', () => {
      it('should update offers nearby if fetchOffersNearbyAction fulfilled', () => {
        state.offersNearby = fakeOffers();
        expect(dataProcess.reducer(state, { type: fetchOffersNearbyAction.fulfilled.type, payload: state.offersNearby }))
          .toEqual(state);
      });
    });


    describe('fetchDetailedOfferAction test', () => {
      it('should update detailed offer if fetchDetailedOfferAction fulfilled', () => {
        state.detailedOffer = fakeOffer;
        expect(dataProcess.reducer(state, { type: fetchDetailedOfferAction.fulfilled.type, payload: state.detailedOffer }))
          .toEqual(state);
      });
      it('should update detailed offer if fetchDetailedOfferAction rejected', () => {
        state.isErrorLoading = true;
        state.detailedOffer = undefined;
        expect(dataProcess.reducer(state, { type: fetchDetailedOfferAction.rejected.type, payload: state.detailedOffer}))
          .toEqual(state);
      });
    });

    describe('fetchCommentsAction test', () => {
      it('should update offers if fetchCommentsAction fulfilled', () => {
        state.comments = fakeComments();
        expect(dataProcess.reducer(state, { type: fetchCommentsAction.fulfilled.type, payload: state.comments }))
          .toEqual(state);
      });
    });

  });
});
