import {Offers} from '../../types/offer';
import {OffersList} from '../offers-list/offers-list';
import {OffersSortingForm} from '../offers-sorting-form/offers-sorting-form';


type OffersListMainProps = {
  quantityOffers: number;
  cityName: string;
  offers: Offers;
}


export function OffersListMain(props: OffersListMainProps): JSX.Element{

  const {quantityOffers, cityName, offers} = props;


  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {quantityOffers} places to stay in {cityName}
      </b>

      <OffersSortingForm/>

      <OffersList offers={offers}/>

    </section>
  );
}
