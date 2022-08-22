import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {OffersListMain} from './offers-list-main';
import { fakeOffers } from '../../utils/mocks';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, DEFAULT_CITY} from '../../const';
import {createMemoryHistory} from 'history';
import {HistoryRouter} from '../history-router/history-router';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {isDataLoaded: false},
  GENERAL: {city: DEFAULT_CITY},
});

describe('Component: OffersListMain', () => {
  it('should render correctly OffersListMain', () => {
    const history = createMemoryHistory();
    const quantityOffers = fakeOffers().length;
    const cityName = 'Test city name';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OffersListMain
            quantityOffers={quantityOffers}
            offers={fakeOffers()}
            cityName={cityName}
          />
        </HistoryRouter>
      </Provider>
    );

    const bElement = screen.getByText(`${quantityOffers} places to stay in ${cityName}`);

    expect(bElement).toBeInTheDocument();
  });
});
