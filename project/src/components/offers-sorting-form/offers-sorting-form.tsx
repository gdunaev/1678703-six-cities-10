import { useState } from 'react';
import { OffersSorting } from '../offers-sorting/offers-sorting';
import {useAppSelector} from '../../hooks/index';
import {getSorting} from '../../store/general-process/selectors';


export function OffersSortingForm(): JSX.Element {
  const [showOffersSorting, setShowingOffersSorting] = useState(false);

  const sorting = useAppSelector(getSorting);

  const handleSelectSortingClick = () => {
    setShowingOffersSorting(true);
  };

  const handleSortingClick = () => {
    setShowingOffersSorting(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSelectSortingClick}
      >
        {sorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      {showOffersSorting && <OffersSorting onSortingClick={handleSortingClick}/>}
    </form>
  );
}
