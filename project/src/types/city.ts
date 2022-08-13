import {Location} from './offer';

export type CityType = {
  name: string;
  location: Location;
  id: number;
};

export type CitiesType = CityType[];
