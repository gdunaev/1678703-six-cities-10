import { useParams, Navigate } from 'react-router-dom';
import { FormOffer } from '../../components/form-offer/form-offer';
import { getRating } from '../../utils';
import { ImagesOffer } from '../../components/images-offer/images-offer';
import { QUANTITY_IMAGES, AppRoute } from '../../const';
import {NotFoundPage} from '../not-found-page/not-found-page';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { OfferCard } from '../../components/offer-card/offer-card';
import { MapOffers } from '../../components/map/map-offers';
import Header from '../../components/header/header';
import { useAppSelector, } from '../../hooks/index';
import { useState, useEffect } from 'react';
import { fetchDetailedOfferAction, fetchOffersNearbyAction} from '../../store/api-actions';
import { store } from '../../store';
import { LoadingScreen } from '../../components/loading-screen/loading-screen';
import { AuthorizationStatus, QUANTITY_PLACES_NEARBY } from '../../const';
import { Offer } from '../../types/offer';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getErrorLoadingStatus } from '../../store/data-process/selectors';
import { getDetailedOffer } from '../../store/data-process/selectors';
import { getOffersNearby } from '../../store/data-process/selectors';

function getImagesSection(images: string[]): JSX.Element {
  if (images.length !== 0) {
    const currentImages =
      images.length >= QUANTITY_IMAGES
        ? images.slice(0, QUANTITY_IMAGES)
        : images.slice();
    return (
      <div className="property__gallery">
        {currentImages.map((image, imgId) => {
          const keyValue = `${imgId}-${image}`;
          return <ImagesOffer key={keyValue} image={image} />;
        })}
      </div>
    );
  }
  return <div className="property__gallery"></div>;
}

export function OfferPage(): JSX.Element {

  const { id } = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus).status;

  const isErrorLoading = useAppSelector(getErrorLoadingStatus);
  const detailedOffer = useAppSelector(getDetailedOffer);
  const offersNearby = useAppSelector(getOffersNearby);


  const [isNavigationLogin, setNavigationLogin] = useState(false);
  const currentId = Number(id);

  useEffect(() => {
    if (!detailedOffer || detailedOffer.id !== currentId) {
      store.dispatch(fetchDetailedOfferAction(id as string));
      store.dispatch(fetchOffersNearbyAction(id as string));
    }
  }, []);


  if (!detailedOffer && !isErrorLoading) {
    return <LoadingScreen />;
  }

  if (!detailedOffer && isErrorLoading) {
    return (
      <NotFoundPage />
    );
  }

  if (isNavigationLogin && !authorizationStatus) {
    return <Navigate to={AppRoute.Login} />;
  }

  const {isPremium,price,maxAdults,bedrooms,title,type,rating,images,goods,host,description,city} = detailedOffer as Offer;

  const cityName = city.name;
  const ratingStyle = getRating(rating);
  const housingType = type.charAt(0).toUpperCase() + type.slice(1);
  const isGoods = goods.length !== 0;
  const arrayOffersNearby = offersNearby ? offersNearby.slice(0, QUANTITY_PLACES_NEARBY) : [];
  const offersNearbyMap = arrayOffersNearby.slice();
  offersNearbyMap.push(detailedOffer as Offer);

  const getOffersNearbyComponent = () => {
    if (arrayOffersNearby.length === 0) {
      return '';
    }
    return arrayOffersNearby.map((offerNearby) => (
      <OfferCard key={offerNearby.id} offer={offerNearby} fromOfferPage />
    ));
  };


  const handleFavoriteStatusClick = () => {
    setNavigationLogin(true);
  };


  return (
    <>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            >
            </path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            >
            </path>
          </symbol>
        </svg>
      </div>

      <div className="page">
        <Header mainPage={false} favoritePage={false} />

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
                  <h1 className="property__name">{title}</h1>
                  <button
                    className="property__bookmark-button button"
                    type="button"
                    onClick={handleFavoriteStatusClick}
                  >
                    <svg
                      className="property__bookmark-icon"
                      width="31"
                      height="33"
                    >
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
                  <span className="property__rating-value rating__value">
                    {rating}
                  </span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {housingType}
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

                  {isGoods && (
                    <ul className="property__inside-list">
                      {goods.map((good, goodId) => {
                        const keyValue = `${goodId}-${good}`;
                        return (
                          <li key={keyValue} className="property__inside-item">
                            {good}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="property__avatar user__avatar"
                        src={host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">{host.name}</span>
                    <span className="property__user-status">
                      {host.isPro ? 'Pro' : ''}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">{description}</p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ReviewsList id={id} />

                  {authorizationStatus === AuthorizationStatus.Auth && (
                    <FormOffer id={id}/>
                  )}
                </section>
              </div>
            </div>

            <MapOffers
              offers={offersNearbyMap}
              cityName={cityName}
              currentOffer={detailedOffer}
              main={false}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {getOffersNearbyComponent()}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
