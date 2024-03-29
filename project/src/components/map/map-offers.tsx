import {useRef, useEffect} from 'react';
import {Icon, Marker, LatLng} from 'leaflet';
import {useMap} from '../../hooks/useMap';
import {UrlMarker} from '../../const';
import 'leaflet/dist/leaflet.css';
import {Offers} from '../../types/offer';
import { ArrayCities } from '../../const';
import {useAppSelector} from '../../hooks/index';
import {Offer} from '../../types/offer';
import {getSelectedOfferId} from '../../store/general-process/selectors';

type MapProps = {
  cityName: string;
  offers: Offers;
  currentOffer: Offer | undefined;
  main: boolean;
};

const defaultCustomIcon = new Icon({
  iconUrl: UrlMarker.Default,
  iconSize: [30, 45],
  iconAnchor: [15, 45]
});

const currentCustomIcon = new Icon({
  iconUrl: UrlMarker.Current,
  iconSize: [30, 45],
  iconAnchor: [15, 45]
});

export function MapOffers(props: MapProps): JSX.Element {
  const {cityName, offers, main, currentOffer} = props;

  const selectedOfferId = useAppSelector(getSelectedOfferId);
  const selectedOffer = currentOffer ? currentOffer : offers.find((value) => value.id === selectedOfferId);

  const mapRef = useRef(null);

  const currentCity = ArrayCities.find((value) => value.name === cityName) || ArrayCities[0];

  const map = useMap(mapRef, currentCity);

  useEffect(() => {
    if (map) {
      map.setView(new LatLng(currentCity.location.latitude, currentCity.location.longitude), currentCity.location.zoom);

      map.eachLayer((layer) => {
        if (layer instanceof Marker){
          map.removeLayer(layer);
        }
      });

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


