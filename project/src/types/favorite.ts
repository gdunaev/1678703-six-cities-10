
import { Offer } from '../types/offer';

export type FavoriteStatusType = {
    id: string;
    status: string;
    updateData: (newOffer: Offer) => void;
  };

