import {Offer, Offers} from '../../types/offer';


export const updateOffersAndFavoritesOffers = (id: number, update: Offer, offers: Offers | undefined, favoritesOffers: Offers | undefined, offersNearby: Offers | undefined) => {

  const updatedOffersAll = {
    offers,
    favoritesOffers,
    offersNearby
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

  if(offersNearby){
    const index = offersNearby.findIndex((item) => item.id === id);
    const updatedOffersNearby = [
      ...offersNearby.slice(0, index),
      update,
      ...offersNearby.slice(index + 1),
    ];
    updatedOffersAll.offersNearby = updatedOffersNearby;
  }

  return updatedOffersAll;
};
