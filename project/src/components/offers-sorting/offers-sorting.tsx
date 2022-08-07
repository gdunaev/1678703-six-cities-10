
import {offersSorting} from '../../store/general-process/general-process';
import {useAppDispatch} from '../../hooks/index';
import { SortingType } from '../../const';
import {MouseEvent} from 'react';


type OffersSortingProps = {
  onSortingClick: () => void;
}


export function OffersSorting(props: OffersSortingProps): JSX.Element{

  const {onSortingClick} = props;

  const dispatch = useAppDispatch();

  const handleSortingClick = (evt: MouseEvent<HTMLUListElement>) => {
    const selectedSorting = evt.target as HTMLLIElement;

    if(selectedSorting) {
      dispatch(offersSorting(selectedSorting.id));

      onSortingClick();
    }
  };

  return (
    <ul className="places__options places__options--custom places__options--opened" onClick = {handleSortingClick}>
      <li className={'places__option '} tabIndex={0} id = {SortingType.Popular}>
        Popular
      </li>
      <li className={'places__option '} tabIndex={0} id = {SortingType.LowToHigh}>
        Price: low to high
      </li>
      <li className={'places__option '} tabIndex={0} id = {SortingType.HighToLow}>
        Price: high to low
      </li>
      <li className={'places__option '} tabIndex={0} id = {SortingType.TopRated}>
        Top rated first
      </li>
    </ul>
  );
}
