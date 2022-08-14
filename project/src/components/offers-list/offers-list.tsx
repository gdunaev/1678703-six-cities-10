import OfferCard from '../offer-card/offer-card';
import {Offers} from '../../types/offer';
import {useAppSelector} from '../../hooks/index';
import {getOffersSorting} from '../../utils';
import {getSorting} from '../../store/general-process/selectors';

type OffersListProps = {
  offers: Offers;
}


export function OffersList(props: OffersListProps): JSX.Element{

  const {offers} = props;
  const sorting = useAppSelector(getSorting);
  const sortedOffers = getOffersSorting(sorting, offers);

  // eslint-disable-next-line no-console
  // console.log('11',);

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          fromOfferPage={false}
        />
      ))}
    </div>
  );
}
