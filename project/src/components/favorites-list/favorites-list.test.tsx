import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter} from '../history-route/history-route';
import { fakeOffers } from '../../utils/mocks';
import {FavoritesList} from './favorites-list';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, DEFAULT_CITY} from '../../const';


const mockStore = configureMockStore();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {isDataLoaded: false},
  GENERAL: {city: DEFAULT_CITY,},
});

describe('Component: FavoritesList', () => {
  it('should render correctly FavoritesList', () => {
    const history = createMemoryHistory();
    const currentCity = 'Test city';
    const currentOffers = fakeOffers();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesList currentCity={currentCity} currentOffers={currentOffers}/>
        </HistoryRouter>
      </Provider>
    );

    const linkElement = screen.getByText(currentCity);

    expect(linkElement).toBeInTheDocument();
  });
});
