import {CitiesType} from './types/city';

export enum NameSpace {
  Data = 'DATA',
  General = 'GENERAL',
  User = 'USER',
}

export enum AppRoute {
  Main = '/',
  OfferId = '/offer/:id',
  Offer = '/offer/',
  Favorites = '/favorites',
  Login = '/login',
  NotFoundPage = '/not_found',
  Lose = '/lose',
}

export enum SortingType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum APIRoute {
  Hotels = '/hotels',
  Login = '/login',
  Logout = '/logout',
  DetailOffer = '/hotels/id',
  OffersNearby = '/hotels/id/nearby',
  CommentsOffer = '/comments/id',
  Favorites = '/favorite',
  FavoritesStatus = '/favorite/id/status',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ArrayCities: CitiesType = [
  {name: 'Paris',
    id: 1,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 10,
    }},
  {name: 'Cologne',
    id: 2,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 10,
    }},
  {name: 'Brussels',
    id: 3,
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 10,
    }},
  {name: 'Amsterdam',
    id: 4,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 10,
    }},
  {name: 'Hamburg',
    id: 5,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 10,
    }},
  {name: 'Dusseldorf',
    id: 6,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 10,
    }}
];

export const ActionType = {
  REDIRECT_TO_ROUTE: 'redirectToRoute',
};

export enum LengthComment {
  Max = 300,
  Min = 50,
}

export enum UrlMarker {
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg',
}

export const PERCENT_RATING = 20;
export const QUANTITY_PLACES_NEARBY = 3;
export const DEFAULT_CITY = 'Paris';

export const QUANTITY_IMAGES = 6;
export const QUANTITY_COMMENTS = 10;

export const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;

