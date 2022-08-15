import {name, datatype, internet, system} from 'faker';
import {GeneralProcessType, DataProcessType} from '../types/state';

export const makeFakeInitialStateGeneralProcess = (): GeneralProcessType => ({
  city: name.title(),
  sorting: name.title(),
  selectedOfferId: datatype.number(),
  isCommentLoading: false,
});

export const fakeOffers = () => [
  {
    'bedrooms': datatype.number(),
    'city': {
      'location': {
        'latitude': datatype.number(),
        'longitude': datatype.number(),
        'zoom': datatype.number()
      },
      'name': name.title(),
    },
    'description': name.title(),
    'goods': [name.title(), name.title(), name.title()],
    'host': {
      'avatarUrl': system.filePath(),
      'id': datatype.number(),
      'isPro': true,
      'name': name.title()
    },
    'id': datatype.number(),
    'images': [internet.avatar(), internet.avatar()],
    'isFavorite': true,
    'isPremium': true,
    'location': {
      'latitude': datatype.number(),
      'longitude': datatype.number(),
      'zoom': datatype.number()
    },
    'maxAdults': datatype.number(),
    'previewImage': internet.avatar(),
    'price': datatype.number(),
    'rating': datatype.number(),
    'title': name.title(),
    'type': name.title()
  },
  {
    'bedrooms': datatype.number(),
    'city': {
      'location': {
        'latitude': datatype.number(),
        'longitude': datatype.number(),
        'zoom': datatype.number()
      },
      'name': name.title()
    },
    'description': name.title(),
    'goods': [name.title(), name.title(), name.title()],
    'host': {
      'avatarUrl': system.filePath(),
      'id': datatype.number(),
      'isPro': true,
      'name': name.title()
    },
    'id': datatype.number(),
    'images': [internet.avatar(), internet.avatar()],
    'isFavorite': true,
    'isPremium': true,
    'location': {
      'latitude': datatype.number(),
      'longitude': datatype.number(),
      'zoom': datatype.number()
    },
    'maxAdults': datatype.number(),
    'previewImage': internet.avatar(),
    'price': datatype.number(),
    'rating': datatype.number(),
    'title': name.title(),
    'type': name.title()
  },
];

export const fakeOffer = {
  'bedrooms': datatype.number(),
  'city': {
    'location': {
      'latitude': datatype.number(),
      'longitude': datatype.number(),
      'zoom': datatype.number()
    },
    'name': name.title()
  },
  'description': name.title(),
  'goods': [name.title(), name.title(), name.title()],
  'host': {
    'avatarUrl': system.filePath(),
    'id': datatype.number(),
    'isPro': true,
    'name': name.title()
  },
  'id': datatype.number(),
  'images': [internet.avatar(), internet.avatar()],
  'isFavorite': true,
  'isPremium': true,
  'location': {
    'latitude': datatype.number(),
    'longitude': datatype.number(),
    'zoom': datatype.number()
  },
  'maxAdults': datatype.number(),
  'previewImage': internet.avatar(),
  'price': datatype.number(),
  'rating': datatype.number(),
  'title': name.title(),
  'type': name.title()
};

export const makeFakeInitialStateDataProcess = (): DataProcessType => ({
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
});
