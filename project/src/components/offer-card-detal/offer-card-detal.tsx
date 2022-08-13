import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {getRating} from '../../utils';
import {AppRoute} from '../../const';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';
// import {useAppSelector} from '../../hooks/index';
// import {getAuthorizationStatus} from '../../store/user-process/selectors';
// import {changeFavoriteStatusAction} from '../../store/api-actions';
// import { getOffers, getFavoritesOffers, getOffersNearby } from '../../store/data-process/selectors';
// import {updateOffersAndFavoritesOffers} from '../../store/data-process/update-data';
// import {updateOffers, updateFavoritesOffers, updateOffersNearby} from '../../store/data-process/data-process';
import {OfferCardDetalButton} from '../offer-card-detal-button/offer-card-detal-button';


type OfferCardDetalProps = {
  offer: Offer;
  fromOfferPage: boolean;
  fromFavoritePage: boolean;
}


export function OfferCardDetal(props: OfferCardDetalProps): JSX.Element{
  const { offer, fromOfferPage, fromFavoritePage} = props;

  const [isNavigationOffer, setNavigationOffer] = useState(false);
  // const [isNavigationLogin_, setNavigationLogin_] = useState(false);

  // const authorizationStatus = useAppSelector(getAuthorizationStatus);
  // const offers = useAppSelector(getOffers);
  // const favoritesOffers = useAppSelector(getFavoritesOffers);
  // const offersNearby = useAppSelector(getOffersNearby);
  // const dispatch = useAppDispatch();

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

  // if (isNavigationLogin_ && authorizationStatus.status !== AuthorizationStatus.Auth) {
  //   return <Navigate to={AppRoute.Login} />;
  // }

  // const updateData = (update: Offer) => {
  //   const result = updateOffersAndFavoritesOffers(id, update, offers, favoritesOffers, offersNearby);
  //   if(result.offers) {
  //     dispatch(updateOffers(result.offers));
  //   }
  //   if(result.favoritesOffers) {
  //     dispatch(updateFavoritesOffers(result.favoritesOffers));
  //   }
  //   if(result.offersNearby) {
  //     dispatch(updateOffersNearby(result.offersNearby));
  //   }
  // };

  // const handleFavoriteStatusClick = () => {
  //   setNavigationLogin_(true);
  //   if(authorizationStatus.status === AuthorizationStatus.Auth) {
  //     const statusId = {
  //       id: String(id),
  //       status: isFavorite ? '0' : '1',
  //       updateData,
  //     };
  //     dispatch(changeFavoriteStatusAction(statusId));
  //   }
  // };

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

        <OfferCardDetalButton isFavorite={isFavorite} fromOfferPage={fromOfferPage} id={id}/>

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
