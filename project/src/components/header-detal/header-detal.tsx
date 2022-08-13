import {AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks/index';
import {getFavoritesOffers} from '../../store/data-process/selectors';


type HeaderProps = {
    status: string;
  };


export function HeaderDetal(props: HeaderProps): JSX.Element{
  const {status} = props;
  const favoritesOffers = useAppSelector(getFavoritesOffers);
  const quantityFavoritesOffers = favoritesOffers ? String(favoritesOffers.length) : '0';

  return (

    <span className="header__favorite-count">{status === AuthorizationStatus.Auth ? quantityFavoritesOffers : '0'}</span>

  );
}
