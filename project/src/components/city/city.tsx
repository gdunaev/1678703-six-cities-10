import {Link} from 'react-router-dom';
import { useAppDispatch } from '../../hooks/index';
import { changeCity } from '../../store/general-process/general-process';
import { ArrayCities } from '../../const';
import { CityType } from '../../types/city';
import {memo} from 'react';


type CityProps = {
  cityName: string;
};

export function City (props: CityProps): JSX.Element {
  const {cityName} = props;

  // eslint-disable-next-line no-console
  // console.log('111', cityName);
  const dispatch = useAppDispatch();


  const getCityComponent = (element: CityType) => {
    const activClassName = element.name === cityName ? 'tabs__item--active' : '';

    const handleChangeCity = () => {
      dispatch(changeCity(element.name));
    };

    return (
      <li className="locations__item" onClick={handleChangeCity} key={element.name}>
        <Link className={`locations__item-link tabs__item ${activClassName}`} to="" >
          <span>{element.name}</span>
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
            {ArrayCities.map((element) => (

              getCityComponent(element)

            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default memo(City, (prevProps, nextProps) => prevProps.cityName === nextProps.cityName);
