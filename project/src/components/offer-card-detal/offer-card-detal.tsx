import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {getRating} from '../../utils';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks/index';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {changeFavoriteStatusAction} from '../../store/api-actions';
import { getOffers, getFavoritesOffers } from '../../store/data-process/selectors';
import {updateOffersAndFavoritesOffers} from '../../store/data-process/update-data';
import {updateOffers, updateFavoritesOffers} from '../../store/data-process/data-process';


type OfferCardDetalProps = {
  offer: Offer;
  fromOfferPage: boolean;
  fromFavoritePage: boolean;
}


export function OfferCardDetal(props: OfferCardDetalProps): JSX.Element{
  const { offer, fromOfferPage, fromFavoritePage} = props;

  const [isNavigationOffer, setNavigationOffer] = useState(false);
  const [isNavigationLogin_, setNavigationLogin_] = useState(false);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offers = useAppSelector(getOffers);
  const favoritesOffers = useAppSelector(getFavoritesOffers);
  const dispatch = useAppDispatch();

  const {
    id,
    price,
    isFavorite,
    title,
    type,
    rating,
  } = offer;

  const ratingStyle = getRating(rating);


  if (isNavigationOffer) {
    return <Navigate to={AppRoute.Offer + String(id)} />;
  }

  if (isNavigationLogin_ && authorizationStatus.status !== AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Login} />;
  }

  const updateData = (update: Offer) => {
    const result = updateOffersAndFavoritesOffers(id, update, offers, favoritesOffers);
    if(result.offers) {
      dispatch(updateOffers(result.offers));
    }
    if(result.favoritesOffers) {
      dispatch(updateFavoritesOffers(result.favoritesOffers));
    }
    return '';
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

  const handleCardClick = () => {
    setNavigationOffer(true);
  };


  return (
    <div className={`${fromFavoritePage && 'favorites__card-info'} place-card__info`} >
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
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
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={ratingStyle}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name" onClick={handleCardClick}>
        <Link to="#">{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  );
}
