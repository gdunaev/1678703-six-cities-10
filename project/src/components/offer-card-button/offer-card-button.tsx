import {Offer} from '../../types/offer';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks/index';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {changeFavoriteStatusAction} from '../../store/api-actions';
import { getOffers, getFavoritesOffers, getOffersNearby } from '../../store/data-process/selectors';
import {updateOffersAndFavoritesOffers} from '../../store/data-process/update-data';
import {updateOffers, updateFavoritesOffers, updateOffersNearby} from '../../store/data-process/data-process';


type OfferCardButtonProps = {
  fromOfferPage: boolean;
  isFavorite: boolean;
  id: number;
}


export function OfferCardButton(props: OfferCardButtonProps): JSX.Element{
  const { isFavorite, fromOfferPage, id} = props;

  const [isNavigationLogin_, setNavigationLogin_] = useState(false);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offers = useAppSelector(getOffers);
  const favoritesOffers = useAppSelector(getFavoritesOffers);
  const offersNearby = useAppSelector(getOffersNearby);
  const dispatch = useAppDispatch();


  if (isNavigationLogin_ && authorizationStatus.status !== AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Login} />;
  }

  const updateData = (update: Offer) => {
    const result = updateOffersAndFavoritesOffers(id, update, offers, favoritesOffers, offersNearby);
    if(result.offers) {
      dispatch(updateOffers(result.offers));
    }
    if(result.favoritesOffers) {
      dispatch(updateFavoritesOffers(result.favoritesOffers));
    }
    if(result.offersNearby) {
      dispatch(updateOffersNearby(result.offersNearby));
    }
  };

  const handleFavoriteStatusClick = () => {
    setNavigationLogin_(true);
    if(authorizationStatus.status === AuthorizationStatus.Auth) {
      const statusId = {
        id: String(id),
        status: isFavorite ? '0' : '1',
        updateData,
      };
      dispatch(changeFavoriteStatusAction(statusId));
    }
  };


  return (
    <button
      className={`place-card__bookmark-button button ${
        isFavorite && 'place-card__bookmark-button--active'
      }`}
      type="button"
      onClick={handleFavoriteStatusClick}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
              `${fromOfferPage ? 'In' : 'To'} ${'bookmarks'}
      </span>
    </button>
  );
}
