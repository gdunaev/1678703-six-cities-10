import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {useAppDispatch} from '../../hooks/index';
import {selectOfferId} from '../../store/general-process/general-process';
import {OfferCardDetal} from '../offer-card-detal/offer-card-detal';


type OfferCardProps = {
  offer: Offer;
  fromOfferPage: boolean;
}


export function OfferCard(props: OfferCardProps): JSX.Element{
  const { offer, fromOfferPage, } = props;

  const {
    id,
    isPremium,
    previewImage,
  } = offer;

  const dispatch = useAppDispatch();

  const handleMouseOver = () => {
    if(!fromOfferPage) {
      dispatch(selectOfferId(id));
    }
  };

  const handleMouseOut = () => {
    if(!fromOfferPage) {
      dispatch(selectOfferId(id));
    }
  };


  return (
    <article className={`${fromOfferPage ? 'near-places__card' : 'cities__card'} ${'place-card'}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className={`place-card__mark ${!isPremium && 'visually-hidden'}`}>
        <span>Premium</span>
      </div>
      <div
        className={`${
          fromOfferPage ? 'near-places__image-wrapper' : 'cities__image-wrapper'
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

      <OfferCardDetal offer={offer} fromOfferPage={false} fromFavoritePage={false}/>

    </article>
  );
}
