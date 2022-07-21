import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';
import {Offers, Offer} from '../../types/offer';

type MapProps = {
  city: City;
  offers: Offers;
  selectedPoint: Offer | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {city, offers, selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && offer.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedPoint]);

  return <div style={{height: '500px'}} ref={mapRef}></div>;
}

export default Map;



// import leaflet from 'leaflet';
// import 'leaflet/dist/leaflet.css';
//
// import {ArrayCities} from '../../const';
// import {useParams} from 'react-router-dom';
// import {useRef, useEffect, } from 'react';

// type MapProps = {
//   main: boolean;
//   offers: Offers;
//   city: string;
// }

// export function Map(props: MapProps): JSX.Element{

//   const {id} = useParams();

//   const mapRef = useRef();

//   const {city, offers, main} = props;
//   // console.log('55', Cities)
//   const cityMap = ArrayCities.find((currentCity) => currentCity.name === city);

//   if(!cityMap) {
//     return (
//       <>
//       </>
//     );
//   }
//   const cityLocation = cityMap.location;

//   const activeOfferId = 0;


//   // eslint-disable-next-line no-console
//   console.log('55', id);
//   // if(activeOfferId === 0) {
//   //   setActiveOffer(Number(id));
//   // }


//   useEffect(() => {

//     const {latitude, longitude, zoom} = cityLocation;
//     mapRef.current = leaflet.map('map', {
//       center: {
//         lat: latitude,
//         lng: longitude
//       },
//       zoom
//     });


//     leaflet
//       .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
//       })
//       .addTo(mapRef.current);

//     offers.forEach((offer) => {
//       const locationOffer = offer.location;
//       const customIcon = leaflet.icon({
//         iconUrl: offer.id !== activeOfferId ? './img/pin.svg' : './img/pin-active.svg',
//         iconSize: [30, 30]
//       });
//       // console.log(`55`, customIcon);
//       leaflet.marker({
//         lat: locationOffer.latitude,
//         lng: locationOffer.longitude
//       },
//       {
//         icon: customIcon
//       })
//         .addTo(mapRef.current)
//         .bindPopup(offer.id);

//     });


//     return () => {
//       // console.log('11', mapRef)
//       mapRef.current.remove();
//     };
//   }, [city, offers, activeOfferId]); // перечень пропсов которые влияют на перерисовку карты

//   const getStyleMap = () => main ? {width: '100%'} : {width: '1144px', height: '579px', margin: 'auto'};

//   return (
//     <div id="map" style={getStyleMap()} ref={mapRef}></div>
//   );
// }