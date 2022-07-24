import {OffersList} from '../../components/offers-list/offers-list';
import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {City} from '../../components/city/city';
import {ArrayCities} from '../../const';
import {Map} from '../../components/map/map';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {changeCity} from '../../store/action';


export function MainPage(): JSX.Element{

  const cityName = useAppSelector((state) => state.city);

  // eslint-disable-next-line no-console
  // console.log('222', cityName);

  const offers = useAppSelector((state) => state.offers);
  const selectedOffers = offers.filter((offer) => offer.city.name === cityName);

  let quantityOffers = 0;
  if(selectedOffers) {
    quantityOffers = selectedOffers.length;
  }

  const dispatch = useAppDispatch();

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const handleOfferHover = (idOffer: string) => {
    const findedOffer = selectedOffers.find((currentOffer) => String(currentOffer.id) === idOffer);
    setSelectedOffer(findedOffer);
  };

  const handleChangeCity = (currentCity: string) => {
    dispatch(changeCity(currentCity));
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

      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link
                  className="header__logo-link header__logo-link--active"
                  to="#"
                >
                  <img
                    className="header__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width="81"
                    height="41"
                  />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to="#"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        Oliver.conner@gmail.com
                      </span>
                      <span className="header__favorite-count">3</span>
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

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul className="locations__list tabs__list">
                {ArrayCities.map((element) => (
                  <City
                    key={element.name}
                    city={element.name}
                    activ={element.name === cityName}
                    onChangeCity={handleChangeCity}
                  />
                ))}
              </ul>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <OffersList quantityOffers={quantityOffers} offers={selectedOffers} onOfferHover={handleOfferHover} cityName={cityName}/>

              <div className="cities__right-section">

                <Map offers={selectedOffers} cityName={cityName} selectedOffer={selectedOffer} main/>

              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
