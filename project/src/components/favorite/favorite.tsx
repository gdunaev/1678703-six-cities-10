
import {Link} from 'react-router-dom';
import {getRating} from '../../utils';
import {Offer} from '../../types/offer';
import { store } from '../../store';
import {changeFavoriteStatusAction} from '../../store/api-actions';

type FavoriteProps = {
  offer: Offer;
};

export function Favorite(props: FavoriteProps): JSX.Element {

  const {offer} = props;
  const {previewImage, price, title, type, rating, id} = offer;
  const ratingStyle = getRating(rating);

  const handleFavoriteStatusClick = () => {
    const statusId = {
      id: String(id),
      status: '0',
      isNeedOffers: false,
    };
    store.dispatch(changeFavoriteStatusAction(statusId));
  };

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
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
            onClick={handleFavoriteStatusClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={ratingStyle}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to="#">{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

