import {Link} from 'react-router-dom';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ImagesOffer from '../../components/images-offer/images-offer';
import { getRating } from '../../utils';
import {HousingType, AppRoute, QUANTITY_IMAGES} from '../../const';
import { Offer } from '../../types/offer';
import {useRef} from 'react';
import NotFoundPage from '../not-found-page/not-found-page';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import {useParams} from 'react-router-dom';
import OfferCard from '../../components/offer-card/offer-card';
import { Navigate } from 'react-router-dom';


const getImagesSection = (images) => {
  if (images.length !== 0) {
    const currentImages = images.length >= QUANTITY_IMAGES ? images.slice(0, QUANTITY_IMAGES) : images.slice();
    return (
      <div className="property__gallery">
        {currentImages.map((image) => (
          <ImagesOffer key={image} image={image} />
        ))}
      </div>
    );
  }
  return (
    <div className="property__gallery">
    </div>
  );
};


type OfferPageProps = {
  offer: Offer;
};


function OfferPage(props: OfferPageProps): JSX.Element{

  const {offer} = props;
  const commentRef = useRef();

  const {id} = useParams();
  const currentId = Number(id);

  // console.log(`000`, otherOffersId);

  // // два эффекта, на оффер и на офферы поблизости
  // useEffect(() => {
  //   if (loadedOffer.id !== currentId) {
  //     onLoadOffer(currentId);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (otherOffersId !== currentId) {
  //     onLoadOtherOffers(currentId);
  //   }
  // }, []);


  // по умолчанию true, false ставит диспатч в случае ошибки при загрузке оффера
  const isLoadedOffer = true;
  if (!isLoadedOffer) {
    return (
      <NotFoundPage />
    );
  }

  // надпись при загрузке
  if (offer.id !== currentId) {
    return (
      <LoadingScreen />
    );
  }

  // вывод разметки для офферов поблизости
  const getOtherOffersComponent = () => {
    if (otherOffers.length === 0) {
      return '';
    }
    return otherOffers.map((currentOffer) => (
      <OfferCard
      onMouseOver={handleMouseOver}
      />
    ));
  };

  const {
    isPremium,
    price,
    maxAdults,
    bedrooms,
    title,
    type,
    ratingOffer,
    images,
  } = offer;

  const count = 0;

  const handleRatingClick = (evt) => {
    evt.preventDefault();
  };

  const handleFieldChange = (evt) => {
    evt.preventDefault();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const ratingStyle = getRating(ratingOffer);

  // офферы для карты, 3 (поблизости, otherOffers) + 1 (основной, loadedOffer)
  let otherOffersMap = [];
  if (otherOffers.length !== 0) {
    otherOffersMap = otherOffers.slice();
    otherOffersMap.push(loadedOffer);
  }

  // выводим емайл пользователя в шапке, и переход к страницам Избранное/Логин по клику на аватарке
  const emailUserText = emailUser ? emailUser : 'Sign in';
  const isUser = !!emailUser;

  // обработка клика по аватарке
  const handleAvatarClick = (evt) => {
    evt.preventDefault();
// emailUser
    // ? return <Navigate to={AppRoute.FAVORITES} />;
    // : return <Navigate to={AppRoute.LOGIN} />;
  }



  const handleMouseOver = (evt) => {
    evt.preventDefault();
  };


  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to="#">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user" onClick={handleAvatarClick}>
                    <Link className="header__nav-link header__nav-link--profile" to="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{emailUserText}</span>
                      <span className="header__favorite-count">{count}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="#">
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">

              {getImagesSection(images)}

            </div>
            <div className="property__container container">
              <div className="property__wrapper">

                {isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}

                <div className="property__name-wrapper">
                  <h1 className="property__name">

                    {title}

                  </h1>
                  <button className="property__bookmark-button button" type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={ratingStyle}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {HousingType[type]}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    <li className="property__inside-item">
                    Wi-Fi
                    </li>
                    <li className="property__inside-item">
                    Washing machine
                    </li>
                    <li className="property__inside-item">
                    Towels
                    </li>
                    <li className="property__inside-item">
                    Heating
                    </li>
                    <li className="property__inside-item">
                    Coffee machine
                    </li>
                    <li className="property__inside-item">
                    Baby seat
                    </li>
                    <li className="property__inside-item">
                    Kitchen
                    </li>
                    <li className="property__inside-item">
                    Dishwasher
                    </li>
                    <li className="property__inside-item">
                    Cabel TV
                    </li>
                    <li className="property__inside-item">
                    Fridge
                    </li>
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                    Angelina
                    </span>
                    <span className="property__user-status">
                    Pro
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                    </p>
                    <p className="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">

                  <ReviewsList id={currentId}/>


                  {isUser && <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
                    <label className="reviews__label form__label" htmlFor="review">Your review</label>
                    <div className="reviews__rating-form form__rating">
                      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"

                        defaultChecked={rating === 5}
                        onClick={handleRatingClick}
                      />
                      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
                        defaultChecked={rating === 4}
                        onClick={handleRatingClick}
                      />
                      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
                        defaultChecked={rating === 3}
                        onClick={handleRatingClick}
                      />
                      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
                        defaultChecked={rating === 2}
                        onClick={handleRatingClick}
                      />
                      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
                        defaultChecked={rating === 1}
                        onClick={handleRatingClick}
                      />
                      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>
                    </div>
                    <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
                      onChange={handleFieldChange}
                      ref={commentRef}
                    >
                    </textarea>
                    <div className="reviews__button-wrapper">
                      <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                      </p>
                      <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
                    </div>
                             </form>}


                </section>
              </div>
            </div>
            <section className="property__map map"></section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">

                {getOtherOffersComponent()}

              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default OfferPage;
