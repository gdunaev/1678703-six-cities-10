import { Offers } from '../types/offer';

export type FavoriteStatusType = {
    id: string;
    status: string;
    offers: Offers | undefined;
    favoritesOffers: Offers | undefined;
  };
