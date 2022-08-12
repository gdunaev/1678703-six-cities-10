import {Offer, Offers} from '../../types/offer';


export const updateOffersAndFavoritesOffers = (id: number, update: Offer, offers: Offers | undefined, favoritesOffers: Offers | undefined) => {

  const updatedOffersAll = {
    offers,
    favoritesOffers
  };

  if(offers){
    const index = offers.findIndex((item) => item.id === id);
    const updatedOffers = [
      ...offers.slice(0, index),
      update,
      ...offers.slice(index + 1),
    ];
    updatedOffersAll.offers = updatedOffers;
  }

  let updatedFavoritesOffers = [];

  if(favoritesOffers){
    updatedFavoritesOffers = favoritesOffers.slice();
    const index = updatedFavoritesOffers.findIndex((item) => item.id === id);
    if(index === -1) {
      updatedFavoritesOffers.push(update);
    } else {
      updatedFavoritesOffers.splice(index, 1);
    }
  } else {
    updatedFavoritesOffers.push(update);
  }
  updatedOffersAll.favoritesOffers = updatedFavoritesOffers;

  return updatedOffersAll;
};
