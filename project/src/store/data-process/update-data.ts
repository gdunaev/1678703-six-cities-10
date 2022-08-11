import {Offer, Offers} from '../../types/offer';


export const _updateData = (id: number, update: Offer, offers: Offers | undefined, favoritesOffers: Offers | undefined) => {

  const test = {
    offers,
  };
  // eslint-disable-next-line no-console
  console.log('333', id);

  if(offers){
    const index = offers.findIndex((item) => item.id === id);
    const updatedOffers = [
      ...offers.slice(0, index),
      update,
      ...offers.slice(index + 1),
    ];
    // eslint-disable-next-line no-console
    console.log('111', updatedOffers);
    test.offers = updatedOffers;
  }
  if(favoritesOffers){
    const index = favoritesOffers.findIndex((item) => item.id === id);
    const updatedFavoritesOffers = favoritesOffers.slice();
    if(index === -1) {
      updatedFavoritesOffers.push(update);
    } else {
      updatedFavoritesOffers.splice(index, 1);
    }
    // eslint-disable-next-line no-console
    console.log('222', index, updatedFavoritesOffers);
    // dispatch(updateFavoritesOffers(updatedFavoritesOffers));
  }
  return test;
};
