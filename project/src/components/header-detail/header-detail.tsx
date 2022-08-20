import {useAppSelector} from '../../hooks/index';
import {getFavoritesOffers} from '../../store/data-process/selectors';


export function HeaderDetail(): JSX.Element{
  const favoritesOffers = useAppSelector(getFavoritesOffers);
  const quantityFavoritesOffers = favoritesOffers ? String(favoritesOffers.length) : '0';

  return (
    <span className="header__favorite-count">{quantityFavoritesOffers}</span>
  );
}
