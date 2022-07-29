
export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Host = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

export type City = {
  location: Location;
  name: string;
};

export type Offer = {
  images: string[];
  goods: string[];
  location: Location;
  host: Host;
  city: City;

  bedrooms: number;
  description: string;
  id: number;
  isFavorite: boolean;
  isPremium: boolean;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

export type ReviewType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
};

export type Offers = Offer[];
