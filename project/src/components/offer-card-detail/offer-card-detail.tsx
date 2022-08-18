import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {getRating} from '../../utils/utils';
import {AppRoute} from '../../const';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';
import {OfferCardButton} from '../offer-card-button/offer-card-button';


type OfferCardDetailProps = {
  offer: Offer;
  fromOfferPage: boolean;
  fromFavoritePage: boolean;
}


export function OfferCardDetail(props: OfferCardDetailProps): JSX.Element{
  const { offer, fromOfferPage, fromFavoritePage} = props;

  const [isNavigationOffer, setNavigationOffer] = useState(false);

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

        <OfferCardButton isFavorite={isFavorite} fromOfferPage={fromOfferPage} id={id}/>

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
