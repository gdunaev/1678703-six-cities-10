import {Link} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeCity } from '../../store/general-process/general-process';
import { ArrayCities } from '../../const';
import { getCity } from '../../store/general-process/selectors';
import { CityType } from '../../types/city';


export function City (): JSX.Element {
  const cityName = useAppSelector(getCity);
  const dispatch = useAppDispatch();


  const getCityComponent = (element: CityType) => {
    const activClassName = element.name === cityName ? 'tabs__item--active' : '';

    const handleChangeCity = () => {
      dispatch(changeCity(element.name));
    };

    return (
      <li className="locations__item" onClick={handleChangeCity} key={element.name}>
        <Link className={`locations__item-link tabs__item ${activClassName}`} to="#" >
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
