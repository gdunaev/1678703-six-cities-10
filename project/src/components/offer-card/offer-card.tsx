import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {getRating} from '../../utils';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks/index';
import {selectOfferId} from '../../store/action';


type OfferCardProps = {
  offer: Offer;
  isOtherOffer: boolean;
}


export function OfferCard(props: OfferCardProps): JSX.Element{
  const { offer, isOtherOffer, } = props;
  const {
    id,
    price,
    isFavorite,
    isPremium,
    title,
    type,
    rating,
    previewImage,
  } = offer;

  const ratingStyle = getRating(rating);

  const [isNavigationOffer, setNavigationOffer] = useState(false);
  const [isNavigationLogin, setNavigationLogin] = useState(false);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus.status);
  const dispatch = useAppDispatch();

  const handleFavoriteStatusClick = () => {
    setNavigationLogin(true);
  };

  if (isNavigationOffer) {
    return <Navigate to={AppRoute.Offer + id} />;
  }

  if (isNavigationLogin && authorizationStatus !== AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Login} />;
  }

  const handleMouseOver = () => {
    dispatch(selectOfferId(id));
  };

  const handleMouseOut = () => {
    dispatch(selectOfferId(id));
  };

  const handleCardClick = () => {
    setNavigationOffer(true);
  };


  return (
    <article className={`${isOtherOffer ? 'near-places__card' : 'cities__card'} ${'place-card'}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className={`place-card__mark ${!isPremium && 'visually-hidden'}`}>
        <span>Premium</span>
      </div>
      <div
        className={`${
          isOtherOffer ? 'near-places__image-wrapper' : 'cities__image-wrapper'
        } ${'place-card__image-wrapper'}`}
      >
        <Link to="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place foto"
          />
        </Link>
      </div>
      <div className="place-card__info">
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
              `${isOtherOffer ? 'In' : 'To'} ${'bookmarks'}
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
    </article>
  );
}
