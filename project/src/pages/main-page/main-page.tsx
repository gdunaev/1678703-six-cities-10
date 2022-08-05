import { OffersListMain } from '../../components/offers-list-main/offers-list-main';
import { City } from '../../components/city/city';
import { ArrayCities } from '../../const';
import { MapOffers } from '../../components/map/map-offers';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeCity } from '../../store/action';
import Header from '../../components/header/header';

export function MainPage(): JSX.Element {
  const cityName = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();

  const selectedOffers = offers
    ? offers.filter((offer) => offer.city.name === cityName)
    : [];

  let quantityOffers = 0;
  if (selectedOffers) {
    quantityOffers = selectedOffers.length;
  }

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
        <Header mainPage favoritePage={false} />

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
              <OffersListMain
                quantityOffers={quantityOffers}
                offers={selectedOffers}
                cityName={cityName}
              />

              <div className="cities__right-section">
                <MapOffers
                  offers={selectedOffers}
                  currentOffer={undefined}
                  cityName={cityName}
                  main
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
