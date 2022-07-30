import {Cities} from './types/city';
import { Offers } from './types/offer';

export enum AppRoute {
  Main = '/',
  OfferId = '/offer/:id',
  Offer = '/offer/',
  Favorites = '/favorites',
  Login = '/login',
  NotFoundPage = '/not_found'
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
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ArrayCities: Cities = [
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
  CHANGE_CITY: 'changeCity',
  LOAD_OFFERS: 'loadOffers',
  OFFERS_SORTING: 'offersSorting',
  REQUIRE_AUTHORIZATION: 'requireAuthorization',
  SELECT_OFFER_ID: 'selectOfferId',
  LOAD_FAVORITES_OFFERS: 'loadFavoritesOffers',
  SET_DATA_LOADED_STATUS: 'setDataLoadedStatus',
  REDIRECT_TO_ROUTE: 'redirectToRoute',
};

export const PERCENT_RATING = 20;
export const QUANTITY_OTHER_PLACES = 3;
export const DEFAULT_CITY = 'Paris';

export const QUANTITY_IMAGES = 6;
export const QUANTITY_COMMENTS = 3;
export const TEXT_SIGN_IN = 'Sign In';

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;

export const DefaultOffers: Offers = [
  {
    'bedrooms': 0,
    'city': {
      'location': {
        'latitude': 0,
        'longitude': 0,
        'zoom': 0
      },
      'name': ''
    },
    'description': '',
    'goods': [''],
    'host': {
      'avatarUrl': '',
      'id': 0,
      'isPro': true,
      'name': ''
    },
    'id': 0,
    'images': [''],
    'isFavorite': true,
    'isPremium': true,
    'location': {
      'latitude': 0,
      'longitude': 0,
      'zoom': 0
    },
    'maxAdults': 0,
    'previewImage': '',
    'price': 0,
    'rating': 0,
    'title': '',
    'type': ''
  },
];
