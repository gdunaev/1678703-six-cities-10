import {useRef, useEffect} from 'react';
import {Icon, Marker, LatLng} from 'leaflet';
import {useMap} from '../../hooks/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';
import {Offers} from '../../types/offer';
import { ArrayCities } from '../../const';
import {useAppSelector} from '../../hooks/index';
import {Offer} from '../../types/offer';

type MapProps = {
  cityName: string;
  offers: Offers;
  currentOffer: Offer | undefined;
  main: boolean;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [30, 45],
  iconAnchor: [15, 45]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [30, 45],
  iconAnchor: [15, 45]
});

export function MapOffers(props: MapProps): JSX.Element {
  const {cityName, offers, main, currentOffer} = props;

  const selectedOfferId = useAppSelector((state) => state.selectedOfferId);
  const selectedOffer = currentOffer ? currentOffer : offers.find((value) => value.id === selectedOfferId);


  const mapRef = useRef(null);

  const currentCity = ArrayCities.find((value) => value.name === cityName) || ArrayCities[0];

  const map = useMap(mapRef, currentCity);

  useEffect(() => {
    if (map) {
      map.setView(new LatLng(currentCity.location.latitude, currentCity.location.longitude), currentCity.location.zoom);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer, currentCity]);

  return <section className={main ? 'cities__map map' : 'property__map map'} ref={mapRef}></section>;
}


