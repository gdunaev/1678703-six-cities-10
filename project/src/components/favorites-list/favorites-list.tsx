
import {Link} from 'react-router-dom';
import {Favorite} from '../favorite/favorite';
import {Offers} from '../../types/offer';

type FavoritesListProps = {
  currentOffers: Offers | undefined;
  currentCity: string;
};

export function FavoritesList(props: FavoritesListProps): JSX.Element {

  const {currentCity, currentOffers} = props;

  const isOffers = !!currentOffers;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="#">
            <span>{currentCity}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">

        {isOffers && currentOffers.map((offer) => (
          <Favorite key={offer.id} offer={offer} />
        ))}

      </div>
    </li>
  );
}
