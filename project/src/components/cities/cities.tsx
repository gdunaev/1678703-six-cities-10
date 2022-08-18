import {Link} from 'react-router-dom';
import { useAppDispatch } from '../../hooks/index';
import { changeCity } from '../../store/general-process/general-process';
import { ArrayCities } from '../../const';
import { CityType } from '../../types/city';
import {memo} from 'react';


type CityProps = {
  cityName: string;
};

function Cities (props: CityProps): JSX.Element {
  const {cityName} = props;
  const dispatch = useAppDispatch();


  const getCityComponent = (city: CityType) => {
    const activClassName = city.name === cityName ? 'tabs__item--active' : '';

    const handleChangeCity = () => {
      dispatch(changeCity(city.name));
    };

    return (
      <li className="locations__item" onClick={handleChangeCity} key={city.name}>
        <Link className={`locations__item-link tabs__item ${activClassName}`} to="" >
          <span>{city.name}</span>
        </Link>
      </li>
    );
  };

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {ArrayCities.map((city) => (

              getCityComponent(city)

            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default memo(Cities, (prevProps, nextProps) => prevProps.cityName === nextProps.cityName);
