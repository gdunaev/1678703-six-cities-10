
import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {OfferCardDetail} from '../offer-card-detail/offer-card-detail';

type FavoriteProps = {
  offer: Offer;
};

export function Favorite(props: FavoriteProps): JSX.Element {

  const {offer} = props;
  const {previewImage} = offer;

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="150"
            height="110"
            alt="Place"
          />
        </Link>
      </div>

      <OfferCardDetail offer={offer} fromOfferPage={false} fromFavoritePage/>

    </article>
  );
}

